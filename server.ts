import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent as instructed in the gemini-api skill
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Endpoint for the AI Solar Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    // Format chat history for GoogleGenAI's generateContent
    // The @google/genai expects contents structure with roles
    const contents: any[] = messages.map((msg: any) => {
      // Map standard roles like 'user' or 'assistant/model'
      const role = msg.role === "assistant" ? "model" : "user";
      return {
        role: role,
        parts: [{ text: msg.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: "You are 'Maha Energy Sahayak', an expert AI Solar Assistant on the Maha Energy Portal of Maharashtra. Your mission is to provide helpful, informative, friendly, and practical solar energy advice. Guide users about solar panels, state subsidies (such as PM Surya Ghar Muft Bijli Yojana which offers up to ₹78,000 subsidy for residential setups up to 3kW, and ₹18,000 per kW for larger systems up to 10kW), net metering policies, and the benefits of solar energy. Refer them to the portal's interactive tools: the Solar Cost Calculator, Pay Bill simulator, and Installer Locator, and invite them to ask any questions. Keep answers concise, nicely formatted with paragraphs/bullets, and easy to read. Note that Maha Energy is a mock state portal for clean living.",
        temperature: 0.7,
      },
    });

    const aiText = response.text || "I am processing your query. Could you please specify your requirement?";
    return res.json({ response: aiText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Failed to communicate with AI Assistant. Please check if your Gemini API key is configured.",
      details: error.message,
    });
  }
});

// Mock Bill lookup or payment endpoint for interactive Pay Bill simulator
app.post("/api/billing/lookup", (req, res) => {
  const { consumerNumber } = req.body;
  if (!consumerNumber) {
    return res.status(400).json({ error: "Consumer Number is required." });
  }

  // Create simulated deterministic user details based on consumer code
  const mockBills: Record<string, any> = {
    "123456789012": {
      name: "Ramesh Keshav Joshi",
      address: "Shivaji Nagar, Pune, Maharashtra",
      amountDue: 2450.00,
      dueDate: "2026-06-30",
      unitsConsumed: 220,
      history: [
        { month: "May 2026", units: 210, amount: 2320, paid: true },
        { month: "April 2026", units: 195, amount: 2050, paid: true },
        { month: "March 2026", units: 180, amount: 1850, paid: true }
      ]
    },
    "987654321098": {
      name: "Sunita G. Patil",
      address: "Bandra West, Mumbai, Maharashtra",
      amountDue: 5890.00,
      dueDate: "2026-07-02",
      unitsConsumed: 480,
      history: [
        { month: "May 2026", units: 450, amount: 5320, paid: true },
        { month: "April 2026", units: 420, amount: 4950, paid: true },
        { month: "March 2026", units: 390, amount: 4450, paid: true }
      ]
    }
  };

  const defaultBill = {
    name: "Maha Energy Consumer",
    address: "Deccan Gymkhana, Pune, MH",
    amountDue: 1850.00,
    dueDate: "2026-06-28",
    unitsConsumed: 175,
    history: [
      { month: "May 2026", units: 160, amount: 1650, paid: true },
      { month: "April 2026", units: 180, amount: 1900, paid: true }
    ]
  };

  const bill = mockBills[consumerNumber] || {
    ...defaultBill,
    // generate slightly random amount based on hash to make any ID fun
    amountDue: Math.abs((consumerNumber.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0) * 7) % 2500) + 750,
  };

  res.json(bill);
});

// Serve Vite application in development or static dist directory in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
