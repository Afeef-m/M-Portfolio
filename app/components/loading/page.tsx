"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Loading({ onFinish }: { onFinish: () => void }) {
  const refLoad = useRef<HTMLHeadingElement>(null);
  const refCircle = useRef<HTMLDivElement>(null);
  const refBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = [
      "Welcome to my portfolio",
      "I'm a Frontend Developer",
      "I create modern web apps",
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to([refLoad.current, refCircle.current, refBox.current], {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onFinish,
        });
      },
    });

    messages.forEach((msg) => {
      tl.call(() => {
        if (refLoad.current) refLoad.current.textContent = msg;
      })
        .fromTo(
          refLoad.current,
          { scale: 0.8, y: 40, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .to(refLoad.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.8,
          delay: 1,
          ease: "power2.inOut",
        });
    });
  }, [onFinish]);

  useEffect(() => {
    const circle = refCircle.current;
    const box = refBox.current;

    if (circle) {
      gsap.to(circle, {
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center",
      });

      gsap.to(circle, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    if (box) {
      gsap.to(box, {
        rotation: -360,
        duration: 8,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center",
      });

      gsap.to(box, {
        scale: 1.2,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(box, {
        boxShadow: "0 0 30px rgba(100, 100, 255, 0.6)",
        repeat: -1,
        duration: 2,
        yoyo: true,
      });
    }
  }, []);

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 z-50 overflow-hidden">
      <div className="relative flex items-center justify-center mb-10">
        <div
          ref={refCircle}
          className="circle w-48 h-48 rounded-full border-[6px] absolute blur-sm"
          style={{
            borderImage:
              "conic-gradient(#4f46e5, #06b6d4, #8b5cf6, #f43f5e, #4f46e5) 1",
            borderStyle: "solid",
            borderWidth: "6px",
          }}
        />
        <div
          ref={refBox}
          className="box w-20 h-20 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl shadow-lg absolute"
        />
      </div>

      <h2
        ref={refLoad}
        className="text-center text-3xl font-semibold text-gray-700 tracking-wide"
      ></h2>
    </section>
  );
}



