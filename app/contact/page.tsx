"use client";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_qp7pzbp",   
        "template_s9zsk6v",
        form.current,
        "s8UlR08KZl3FGIopc"   
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send. Try again later.");
        }
      );
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white px-6">
      <h2 className="text-4xl font-bold mb-8 text-indigo-500">Contact Me</h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-6 w-full max-w-md bg-gray-900/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-indigo-700/30"
      >
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-medium text-indigo-300">
            Your Name
          </label>
          <input
            type="text"
            name="from_name"
            placeholder="Enter your name"
            className="p-3 rounded-md bg-gray-800 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1 font-medium text-indigo-300">
            Email Address
          </label>
          <input
            type="email"
            name="from_email"
            placeholder="Enter your email"
            className="p-3 rounded-md bg-gray-800 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1 font-medium text-indigo-300">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Enter your message"
            className="p-3 rounded-md bg-gray-800 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition duration-300"
        >
          Send Message
        </button>

        {status && (
          <p className="mt-4 text-center text-indigo-400 font-medium">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
