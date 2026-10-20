import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import bg from '../assets/bg.png'
import cancel from '../assets/cancel.png'
import check from '../assets/check.png'

export default function RSVP({ weddingId, deadline  }) {
  const [form, setForm] = useState({
    name: "",
    attendance: "",
    guests: "1",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await addDoc(
        collection(db, "weddings", weddingId, "rsvps"),
        {
            name: form.name,
            attendance: form.attendance,
            guests: form.attendance === "yes" ? Number(form.guests) : 0,
            message: form.message,
            createdAt: serverTimestamp(),
        }
        );

        alert("Ձեր պատասխանը հաջողությամբ ուղարկվեց");

        setForm({
        name: "",
        attendance: "",
        guests: "1",
        message: "",
        });
    } catch (error) {
        console.error("RSVP error:", error);
        alert("Չհաջողվեց ուղարկել պատասխանը։ Խնդրում ենք կրկին փորձել։");
    }
    };

  return (
    <section className="px-8 pb-20 pt-10 sm:px-12 sm:py-20 bg-no-repeat bg-cover" 
           style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="mx-auto max-w-xl text-center">

        <h2 className="font-heading text-[32px] italic">
          Հրավերի պատասխան
        </h2>

        <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-[#77776c]">
          Խնդրում ենք տեղեկացնել մեզ Ձեր մասնակցության մասին մինչև {deadline}:
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-10 text-left"
        >

          {/* Name */}
          <div>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Գրեք Ձեր անունը"
              required
              className="w-full border-b border-[#aaa993]/60 bg-transparent px-1 py-3 text-xs text-[#555846] outline-none placeholder:text-[#aaa99d] placeholder:text-xs focus:border-[#555846]"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="mb-5 block text-sm uppercase -skew-x-15 tracking-[0.15em]">
              Կմասնակցե՞ք մեր հարսանիքին
            </label>

            <div className="grid grid-cols-2 gap-6 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, attendance: "yes" }))
                }
                className={`flex justify-center items-center gap-2 font-armenian rounded-xl border-2 px-5 py-3 text-xs transition-all duration-300 cursor-pointer ${
                  form.attendance === "yes"
                    ? "border-[#262626] bg-[#262626]/20 text-[#262626]"
                    : "border-[#262626]/40 bg-[#262626]/10 text-[#262626] hover:border-[#262626]"
                }`}
              >
                <img src={check} className="w-6" />
                <p className="-skew-x-15">Կմասնակցեմ</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, attendance: "no" }))
                }
                className={`flex items-center justify-center gap-2 font-armenian rounded-xl border-2 px-5 py-3 transition-all duration-300 cursor-pointer ${
                  form.attendance === "no"
                    ? "border-[#262626] bg-[#262626]/20 text-[#262626]"
                    : "border-[#262626]/40 bg-[#262626]/10 text-[#262626] hover:border-[#262626]"
                }`}
              >
                <img src={cancel} className="w-6" />
                <p className="-skew-x-15">Ցավոք ոչ</p>
              </button>
            </div>
          </div>

          {/* Guests */}
          {form.attendance === "yes" && (
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.15em] text-[#77776c]">
                Հյուրերի քանակը
              </label>

              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full border-b border-[#aaa993]/60 bg-transparent px-1 py-3 text-xs text-[#555846] outline-none focus:border-[#555846]"
              >
                <option value="1">1 հյուր</option>
                <option value="2">2 հյուր</option>
                <option value="3">3 հյուր</option>
                <option value="4">4 հյուր</option>
                <option value="5">5 հյուր</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Ցանկության դեպքում թողեք մեզ հաղորդագրություն"
              className="w-full h-[60px] resize-none border-b border-[#aaa993]/60 bg-transparent px-1 py-3 text-xs text-[#555846] outline-none placeholder:text-[#aaa99d] placeholder:text-xs focus:border-[#555846]"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-[#262626] font-armenian px-8 py-3 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#70735e]"
            >
              <p className="-skew-x-15">Ուղարկել</p>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}