import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TableOrder = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // ✅ Get current date-time in local timezone
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const minDateTime = getCurrentDateTime();

  const submit = (data) => {
    alert("Table booked successfully!");
    console.log(data);
    reset();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col items-center py-10 px-4 relative">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Heading */}
      <div className="text-center mb-8 mt-8">
        <p className="text-3xl md:text-4xl font-bold text-amber-900 tracking-wide">
          Reservation
        </p>
        <p className="text-xl md:text-2xl font-semibold mt-2 text-amber-800">
          BOOK A TABLE ONLINE
        </p>
      </div>

      {/* Form */}
      <form
        className="w-full max-w-3xl bg-white rounded-2xl p-6 md:p-10 shadow-lg border-2 border-amber-200"
        onSubmit={handleSubmit(submit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="USER NAME"
            required
            {...register("username")}
            className="w-full h-12 px-4 rounded-md bg-white text-black border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            type="email"
            placeholder="USER EMAIL"
            required
            {...register("email")}
            className="w-full h-12 px-4 rounded-md bg-white text-black border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            type="datetime-local"
            min={minDateTime}
            required
            {...register("dateTime")}
            className="w-full h-12 px-4 rounded-md bg-white text-black border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            list="browse"
            placeholder="NO OF PEOPLE"
            required
            {...register("noOfPeople")}
            className="w-full h-12 px-4 rounded-md bg-white text-black border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <datalist id="browse">
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="7" />
            <option value="8" />
            <option value="9" />
          </datalist>

          <textarea
            placeholder="SPECIAL ATTENTIONS"
            required
            {...register("specialAttention")}
            className="w-full h-28 px-4 py-3 rounded-md bg-white text-black border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none md:col-span-2 resize-none"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-40 h-12 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-black font-semibold rounded-xl shadow-md"
          >
            BOOK TABLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableOrder;