export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface BillHistory {
  month: string;
  units: number;
  amount: number;
  paid: boolean;
}

export interface ConsumerBill {
  name: string;
  address: string;
  amountDue: number;
  dueDate: string;
  unitsConsumed: number;
  history: BillHistory[];
}

export interface SolarCalculatorResult {
  monthlyBill: number;
  recommendedKw: number;
  panelsNeeded: number;
  requiredAreaSqFt: number;
  estimatedCost: number;
  stateSubsidy: number;
  netInvestment: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  lifetimeSavings: number;
  co2SavedTonnes: number;
  treesPlantedEquivalent: number;
}

export interface Installer {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  approvedPMYojana: boolean;
  contact: string;
  address: string;
  certifications: string[];
}

export interface SolarConsultationRequest {
  id: string;
  installerId: string;
  installerName: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  monthlyBillValue: number;
  requestDate: string;
  status: "Pending" | "Contacted" | "Completed";
}
