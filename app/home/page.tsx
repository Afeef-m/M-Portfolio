"use client";
import React, { useRef, useState } from "react";
import Loading from "../components/loading/page";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default function MainHome() {
  const [isLoading, setLoading] = useState(true);
  const container = useRef(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(".intro-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    const message = ["Welcome to my portfolio", "I’m a Frontend Developer"];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    message.forEach((msg) => {
      tl.to(textRef.current, {
        x: 200,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          textRef.current!.textContent = msg;
        },
      }).fromTo(
        textRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    });
  }, { scope: container });

  if (isLoading) {
    return <Loading onFinish={() => setLoading(false)} />;
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <h3 className="text-5xl font-bold text-center intro-text">
        Hi, I’m <span className="text-indigo-600">Afeef M</span>
      </h3>

      <div ref={container} className="mt-4">
        <h3 ref={textRef} className="text-3xl font-semibold text-indigo-400 text-center"></h3>
      </div>

      <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md">
        <Link href="/contact">Let’s Talk</Link>
      </button>
    </main>
  );
}
