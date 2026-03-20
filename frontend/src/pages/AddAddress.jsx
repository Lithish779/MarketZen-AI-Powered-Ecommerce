// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../pages/api";
// import toast from "react-hot-toast";

// export default function AddAddress() {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");

//   const [isSaving, setIsSaving] = useState(false);

//   const [form, setForm] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     isDefault: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const validate = () => {
//     return (
//       form.fullName &&
//       form.phone &&
//       form.street &&
//       form.city &&
//       form.state &&
//       form.pincode
//     );
//   };

//   const saveAddress = async () => {
//     if (!userId) {
//       toast("Login required");
//       return;
//     }

//     if (!validate()) {
//       toast("Please fill all fields");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const res = await fetch(`${API}/user/addresses/${userId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast("Failed to save address");
//         return;
//       }

//       toast("Address saved successfully", {
//         style: { background: "#111", color: "#fff" },
//       });

//       navigate("/checkout");
//     } catch (err) {
//       toast("Failed to save address");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl px-6 py-12 mx-auto">
//       <h1 className="mb-8 text-3xl font-bold">Add New Address</h1>

//       <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//         <input
//           name="fullName"
//           placeholder="Full Name"
//           value={form.fullName}
//           onChange={handleChange}
//           className="p-3 border rounded-lg"
//         />

//         <input
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           className="p-3 border rounded-lg"
//         />

//         <input
//           name="street"
//           placeholder="Street Address"
//           value={form.street}
//           onChange={handleChange}
//           className="p-3 border rounded-lg md:col-span-2"
//         />

//         <input
//           name="city"
//           placeholder="City"
//           value={form.city}
//           onChange={handleChange}
//           className="p-3 border rounded-lg"
//         />

//         <input
//           name="state"
//           placeholder="State"
//           value={form.state}
//           onChange={handleChange}
//           className="p-3 border rounded-lg"
//         />

//         <input
//           name="pincode"
//           placeholder="Pincode"
//           value={form.pincode}
//           onChange={handleChange}
//           className="p-3 border rounded-lg"
//         />
//       </div>

//       <label className="flex items-center gap-3 mt-6">
//         <input
//           type="checkbox"
//           name="isDefault"
//           checked={form.isDefault}
//           onChange={handleChange}
//         />
//         <span className="text-sm text-gray-600">
//           Set as default delivery address
//         </span>
//       </label>

//       <button
//         onClick={saveAddress}
//         disabled={isSaving}
//         className="w-full py-3 mt-8 text-white bg-black rounded-full hover:bg-gray-800 disabled:opacity-50"
//       >
//         {isSaving ? "Saving..." : "Save Address"}
//       </button>

//       <button
//         onClick={() => navigate("/checkout")}
//         className="block w-full mt-4 text-sm text-center text-gray-500 hover:underline"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../pages/api";
import toast from "react-hot-toast";

export default function AddAddress() {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!form.fullName) return "Full name required";
    if (!form.phone || form.phone.length !== 10)
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
      await API.post("/api/address", form);

      toast("Address saved successfully", {
        style: { background: "#111", color: "#fff" },
      });

      navigate("/addresses");
    } catch (err) {
      console.error("Save address error:", err.response?.data || err.message);
      toast(err.response?.data?.message || "Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl px-6 py-10 md:py-16 mx-auto bg-white min-h-screen">
      <h1 className="mb-8 md:mb-12 text-3xl md:text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Append Destination</h1>
      <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Establish a new delivery map point</p>

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
        {isSaving ? "Mapping..." : "Secure Destination"}
      </button>

      <button
        onClick={() => navigate("/addresses")}
        className="block w-full mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center cursor-pointer hover:text-red-400 transition-colors"
      >
        Discard Entry
      </button>
    </div>
  );
}
