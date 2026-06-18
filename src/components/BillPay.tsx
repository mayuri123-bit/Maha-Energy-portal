import { useState } from "react";
import { CreditCard, Search, ArrowRight, ShieldCheck, Calendar, Zap, RefreshCw, CheckCircle2, Receipt, AlertCircle } from "lucide-react";
import { ConsumerBill } from "../types";

export default function BillPay() {
  const [consumerNumber, setConsumerNumber] = useState<string>("123456789012");
  const [loading, setLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<ConsumerBill | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Payment states
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [upiId, setUpiId] = useState<string>("msedcl@okhdfcbank");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumerNumber || consumerNumber.trim().length < 8) {
      setError("Please key in a valid 8 to 12-digit MSEDCL Consumer Number.");
      return;
    }

    setLoading(true);
    setError(null);
    setBill(null);
    setPaymentSuccess(false);

    try {
      const response = await fetch("/api/billing/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consumerNumber }),
      });

      if (!response.ok) {
        throw new Error("Unable to retrieve account files. Confirm connection.");
      }

      const data: ConsumerBill = await response.json();
      setBill(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during profile lookup.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bill) return;

    setPaymentLoading(true);

    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);
      setTransactionId(`TXN-MH-${Math.floor(100000 + Math.random() * 900000)}-${consumerNumber.slice(-4)}`);
      
      // Update local state copy of history
      setBill({
        ...bill,
        amountDue: 0,
        history: [
          {
            month: "June 2026 (Current)",
            units: bill.unitsConsumed,
            amount: bill.amountDue,
            paid: true
          },
          ...bill.history
        ]
      });
    }, 2000);
  };

  return (
    <section id="billing" className="py-20 bg-slate-950 border-b border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold block mb-3">
            💡 direct utility clearance
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            MahaDirect Online Utilities Portal
          </h2>
          <p className="mt-4 text-slate-400 font-sans font-light">
            Inquire about MahaDiscom (MSEDCL) meters, view real-time electricity consumption cycles, and make instant paperless payments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Lookup Account Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Search className="h-5 w-5 text-emerald-400 animate-pulse" />
                Find Consumer Account
              </h3>

              <div className="mb-4 text-xs text-slate-400 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">💡 Citizen Demo suggestions:</span>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Pune: <code className="text-white font-mono bg-slate-950 px-1 py-0.5 rounded">123456789012</code></li>
                  <li>Mumbai Bandra: <code className="text-white font-mono bg-slate-950 px-1 py-0.5 rounded">987654321098</code></li>
                </ul>
              </div>

              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label htmlFor="input-consumer-no" className="block text-sm font-semibold text-slate-300 mb-2">
                    MSEDCL 12-Digit Consumer Number
                  </label>
                  <div className="relative">
                    <input
                      id="input-consumer-no"
                      type="text"
                      maxLength={12}
                      placeholder="Enter 12-digit number"
                      value={consumerNumber}
                      onChange={(e) => setConsumerNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-bold"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition-colors rounded-lg flex items-center justify-center disabled:opacity-50"
                      aria-label="Query Account"
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="mt-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-xs text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* General state message inside panel */}
            <div className="mt-12 pt-6 border-t border-slate-800 flex items-center gap-2 text-slate-500 text-xs font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>SSL SECURE CITIZEN CLEARANCE SYSTEM</span>
            </div>
          </div>

          {/* Bill Invoice Viewer / Checkout Area */}
          <div className="lg:col-span-7">
            {bill ? (
              <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl text-left h-full flex flex-col justify-between">
                
                {/* Invoice Content */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-5 mb-6 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">MSEDCL CUSTOMER IDENTIFIER</span>
                      <h4 className="text-xl font-extrabold text-white mt-1 leading-snug">{bill.name}</h4>
                      <p className="text-xs text-slate-400">{bill.address}</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase font-mono text-[11px] py-1.5 px-3 rounded-lg font-bold">
                      Account Registered
                    </div>
                  </div>

                  {/* Payment Success Receipt Card */}
                  {paymentSuccess ? (
                    <div className="mb-6 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <h4 className="text-base font-extrabold text-white">Utility Bill Payment Successful!</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-md">
                        Thank you for executing this Direct Energy payment. An e-receipt has been generated and filed with MahaDiscom database.
                      </p>

                      {/* Receipt values */}
                      <div className="w-full bg-slate-950 p-4 border border-slate-800 rounded-xl mt-4 space-y-2 text-xs font-mono text-left">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Transaction ID:</span>
                          <span className="text-white font-semibold">{transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Consumer code:</span>
                          <span className="text-white font-semibold">{consumerNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payment Channel:</span>
                          <span className="text-white font-semibold uppercase">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status:</span>
                          <span className="text-emerald-400 font-bold">● SETTLED (MOCK)</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setPaymentSuccess(false)}
                        className="mt-4 text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-1.5"
                      >
                        <Receipt className="h-4 w-4" />
                        Execute another remittance
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Active Unpaid Outstanding Bill Banner */}
                      {bill.amountDue > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8">
                          
                          {/* Left bill core info */}
                          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                            <div>
                              <span className="text-xs text-slate-500 font-mono">Current Billing Cycle</span>
                              <div className="text-2xl font-black text-rose-400 mt-1">
                                ₹{bill.amountDue.toLocaleString("en-IN")}
                              </div>
                              <span className="text-[10px] text-slate-400 uppercase font-mono">Due on {bill.dueDate}</span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-sans text-slate-400">
                              <span>Consumption:</span>
                              <span className="text-slate-300 font-bold">{bill.unitsConsumed} Units (MH)</span>
                            </div>
                          </div>

                          {/* Right Checkout Options */}
                          <form onSubmit={handlePayment} className="space-y-4 text-slate-300 text-xs">
                            <div>
                              <span className="text-slate-400 font-semibold block mb-2">Remittance Mode</span>
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => setPaymentMethod("upi")}
                                  className={`py-2 px-3 border rounded-xl text-center font-semibold ${
                                    paymentMethod === "upi"
                                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                  }`}
                                >
                                  UPI Payment
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentMethod("card")}
                                  className={`py-2 px-3 border rounded-xl text-center font-semibold ${
                                    paymentMethod === "card"
                                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                  }`}
                                >
                                  Debit/Credit
                                </button>
                              </div>
                            </div>

                            {paymentMethod === "upi" ? (
                              <div>
                                <label htmlFor="input-upi" className="block text-[10px] text-slate-400 mb-1">Enter UPI ID</label>
                                <input
                                  id="input-upi"
                                  type="text"
                                  placeholder="msedcl@okhdfcbank"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white font-mono text-xs focus:outline-none"
                                />
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">Card Number</label>
                                  <input
                                    type="text"
                                    placeholder="4111 2222 3333 4444"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white font-mono text-xs focus:outline-none"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white font-mono text-xs focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="CVV"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white font-mono text-xs focus:outline-none"
                                  />
                                </div>
                              </div>
                            )}

                            <button
                              type="submit"
                              disabled={paymentLoading}
                              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                              {paymentLoading ? (
                                <>
                                  <RefreshCw className="h-4 w-4 animate-spin-slow" />
                                  Clearing transactions...
                                </>
                              ) : (
                                <>
                                  <Zap className="h-4 w-4 fill-current" />
                                  Authorize Settlement Now
                                </>
                              )}
                            </button>
                          </form>

                        </div>
                      ) : (
                        <div className="p-6 text-center border border-slate-800 bg-slate-950 rounded-2xl mb-8 flex flex-col items-center">
                          <CheckCircle2 className="h-10 w-10 text-emerald-400 mb-2 animate-bounce" />
                          <div className="text-base font-bold text-white">Outstanding Status Settled!</div>
                          <p className="text-xs text-slate-400 max-w-sm mt-1">
                            Your billing profile has fully zeroed balances. This account is complete with no arrears pending.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Historical Bill Cycles */}
                  <div className="mt-2 text-left">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-3">CONSOLIDATED STATEMENT ARCHIVES</span>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {bill.history.map((cycle, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono font-bold">
                              {i + 1}
                            </span>
                            <div>
                              <div className="font-bold text-slate-200">{cycle.month}</div>
                              <span className="text-[10px] text-slate-400 font-mono">{cycle.units} Units Consumed</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-white">₹{cycle.amount}</div>
                            <span className="text-[10px] text-emerald-400 font-bold uppercase">Paid / Settled</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
                <CreditCard className="h-12 w-12 text-slate-700 mb-4 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-400">Arrears Document Generator</h4>
                <p className="text-sm text-slate-500 max-w-sm mt-2 font-sans font-light">
                  Query a valid Consumer Code (e.g. 12-digit demo suggestions on the left) to load billing periods, track units, and execute direct digital clearances.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
