
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function FuturisticLoader({ onFinish }: { onFinish?: () => void }) {
//   const barRef = useRef<HTMLDivElement>(null);
//   const dotRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1, yoyo: true });
//     tl.to(barRef.current, {
//       width: "80%",
//       duration: 1.2,
//       ease: "power2.inOut",
//     }).to(barRef.current, {
//       width: "40%",
//       duration: 1,
//       ease: "power2.inOut",
//     });

//     gsap.to(dotRef.current, {
//       x: 200,
//       repeat: -1,
//       duration: 1.2,
//       yoyo: true,
//       ease: "power1.inOut",
//     });

//     const timer = setTimeout(() => {
//       gsap.to(".loader-wrapper", {
//         opacity: 0,
//         duration: 0.8,
//         onComplete: onFinish,
//       });
//     }, 5000); 

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <section className="loader-wrapper fixed inset-0 flex flex-col items-center justify-center bg-black text-white overflow-hidden z-50">
//       <div className="relative w-72 h-2 bg-neutral-900 rounded-full overflow-hidden">
//         <div
//           ref={barRef}
//           className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-fuchsia-500 rounded-full blur-sm"
//         />
//         <div
//           ref={dotRef}
//           className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"
//         />
//       </div>
//       <h2 className="mt-6 text-lg tracking-wider text-purple-400 font-medium">
//         Loading...
//       </h2>
//     </section>
//   );
// }


"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import dynamic from "next/dynamic";
import robotImg from "@/public/robot.png";

const RobotScene = dynamic(() => import("../ThreeBackground"), { ssr: false });

export default function RobotLoading({ onFinish }: { onFinish?: () => void }) {
  const robotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(robotRef.current, {
      y: -20,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    gsap.to(robotRef.current, {
      rotate: 3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.7,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    const timer = setTimeout(() => {
      gsap.to(".loader-wrapper", {
        opacity: 0,
        duration: 0.8,
        onComplete: onFinish,
      });
    }, 5500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <section className="loader-wrapper fixed inset-0 flex flex-col items-center justify-center text-white overflow-hidden z-50">
      <div className="absolute inset-0 -z-10">
        <RobotScene />
      </div>

      <div
        ref={glowRef}
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-cyan-400 blur-3xl opacity-60"
      ></div>

      <div ref={robotRef} className="relative w-40 h-40">
        <Image
          src={robotImg}
          alt="Flying Robot Loader"
          fill
          className="object-contain drop-shadow-[0_0_25px_#8b5cf6]"
        />
      </div>

      <h2 className="mt-8 text-lg font-medium text-indigo-400 tracking-widest animate-pulse">
        Loading...
      </h2>
    </section>
  );
}
