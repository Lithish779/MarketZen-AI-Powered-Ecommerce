import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../pages/api";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await API.get(`/api/address/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load address details");
        navigate("/addresses");
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!form.fullName) return "Full name required";
    if (!form.phone || form.phone.toString().length !== 10)
      return "Valid 10-digit phone required";
    if (!form.street) return "Street required";
    if (!form.city) return "City required";
    if (!form.state) return "State required";
    if (!form.pincode) return "Pincode required";
    return null;
  };

  const saveAddress = async () => {
    const error = validate();
    if (error) {
      toast(error);
      return;
    }

    setIsSaving(true);
    try {
      await API.put(`/api/address/${id}`, form);
      toast.success("Address updated successfully");
      navigate("/addresses");
    } catch (err) {
      toast.error("Failed to update address");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl px-6 py-10 md:py-16 mx-auto bg-white min-h-screen">
      <button 
        onClick={() => navigate("/addresses")}
        className="flex items-center gap-2 text-gray-400 hover:text-black mb-8 font-bold text-[10px] uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={16} /> Retour
      </button>

      <h1 className="mb-8 md:mb-12 text-3xl md:text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Revise Destination</h1>
      <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Update your established map point</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Legal Identifier</label>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
          <input
            name="phone"
            placeholder="10-digit number"
            value={form.phone}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Street Address</label>
          <input
            name="street"
            placeholder="House, Area, Landmark"
            value={form.street}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">City</label>
          <input
            name="city"
            placeholder="City Name"
            value={form.city}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">State</label>
          <input
            name="state"
            placeholder="State / Region"
            value={form.state}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Pincode</label>
          <input
            name="pincode"
            placeholder="6-digit PIN"
            value={form.pincode}
            onChange={handleChange}
            className="boutique-input"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 mt-6">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        <span className="text-sm text-gray-600">
          Set as default delivery address
        </span>
      </label>

      <button
        onClick={saveAddress}
        disabled={isSaving}
        className="boutique-btn mt-8"
      >
        {isSaving ? "Updating..." : "Commit Changes"}
      </button>
    </div>
  );
}
