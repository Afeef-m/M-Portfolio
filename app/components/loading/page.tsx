"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Loading({ onFinish }: { onFinish: () => void }) {
  const refLoad = useRef(null);

  useEffect(() => {
    
    const messages = [
      "Welcome to my portfolio",
      "I'm a Frontend Developer",
      "I create modern web apps",
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(refLoad.current, { opacity: 0, duration: 0.5 });
        onFinish();
      },
    });

    messages.forEach((msg) => {
      tl.call(() => {
        if (refLoad.current) refLoad.current.textContent = msg;
      })
        .fromTo(
          refLoad.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        )
        .to(refLoad.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          delay: 1.2,
          ease: "power2.in",
        });
    });

    return () => tl.kill();
  }, [onFinish]);


  useEffect(()=>{

  },[])

  return (
    <section className="fixed inset-0 flex items-center justify-center flex-col gap-4 bg-white z-50">
      <h2
        ref={refLoad}
        className="text-3xl font-bold text-slate-500 text-center"
      ></h2>
      <div className="box w-40 h-40 border-4 border-b-gray-800 border-s-red-800 border-t-lime-700"></div>
    </section>
  );
}
