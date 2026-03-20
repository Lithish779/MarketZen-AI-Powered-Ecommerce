import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowRight, Package } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Aesthetic Background flare */}
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#FBCFE8]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, cubicBezier: "0.4, 0, 0.2, 1" }}
        className="max-w-xl w-full bg-white/50 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-gray-50 shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative z-10"
      >
        <div className="mb-10 relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-slate-900 text-[#C9A84C] rounded-full flex items-center justify-center shadow-2xl relative z-10"
          >
            <CheckCircle size={40} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-slate-900 rounded-full blur-2xl -z-0"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sovereignty <span className="italic">Secured</span>
        </h1>
        <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.4em] mb-10">Your Order has been Curated Successfully</p>

        <div className="bg-gray-50/50 rounded-3xl p-6 mb-10 border border-gray-100 space-y-4">
           <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-widest">Protocol ID</span>
              <span className="font-black text-slate-900">#{state?.orderId?.toUpperCase() || "ZEN-TRX-99B"}</span>
           </div>
           <div className="h-px bg-gray-100 w-full" />
           <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Investment Value</span>
              <span className="text-2xl font-black text-slate-900">₹{state?.total || "0.00"}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Link
            to="/orders"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-white border border-slate-900 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all group"
           >
            <Package size={16} />
            Track Order
           </Link>
           <Link
            to="/"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 group"
           >
            Continue Discovery
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
           </Link>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-4 text-gray-400">
         <div className="flex gap-4">
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <div className="w-1 h-1 rounded-full bg-gray-200" />
         </div>
         <p className="text-[9px] font-bold uppercase tracking-[0.3em]">MarketZen Signature Logistics System</p>
      </div>
    </div>
  );
}
