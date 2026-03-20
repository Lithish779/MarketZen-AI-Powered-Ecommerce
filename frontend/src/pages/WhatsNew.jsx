import { useEffect, useState } from "react";
import { API } from "./api.jsx";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatsNew() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/") // Assuming root returns all or the same as the raw fetch
      .then(res => setProducts(res.data.slice(0, 8))) // Take top 8 for "What's New"
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-light text-gray-400 capitalize tracking-widest italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          The collection is currently being curated.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
            <Sparkles size={14} className="text-[#C9A84C]" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Fresh Arrivals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            The <span className="italic">Latest</span> Selection
          </h2>
        </div>
        <p className="max-w-xs text-[10px] md:text-xs text-slate-400 uppercase tracking-widest leading-relaxed">
          Explore our most recent additions to the boutique collection. Pure, professional, and unparalleled.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product, idx) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group"
          >
            <Link to={`/product/${product._id}`} className="block space-y-4">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-1.5 px-2">
                <h3 className="text-xs md:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
