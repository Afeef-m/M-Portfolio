"use client";
import React, { useRef, useState } from "react";
import Loading from "../components/loading/page";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const ThreeBackground = dynamic(() => 
  import("../components/ThreeBackground"), 
  {ssr: false,}
);

export default function MainHome() {
  const [isLoading, setLoading] = useState(true);
  const container = useRef(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(".intro-text", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      const messages = ["Welcome to my portfolio", "I’m a Frontend Developer"];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      const typingSpeed = 0.09;

      messages.forEach((msg) => {
        tl.call(() => {
          if (textRef.current) textRef.current.textContent = "";
        });

        for (let i = 0; i < msg.length; i++) {
          tl.call(
            () => {
              if (textRef.current) textRef.current.textContent += msg[i];
            },
            null,
            "+=" + typingSpeed
          );
        }
        tl.to({}, { duration: 1 });

        for (let i = msg.length; i >= 0; i--) {
          tl.call(
            () => {
              if (textRef.current)
                textRef.current.textContent = msg.substring(0, i);
            },
            null,
            "+=" + typingSpeed / 1.5
          );
        }
      });
    },
    { scope: container }
  );

  if (isLoading) {
    return <Loading onFinish={() => setLoading(false)} />;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <ThreeBackground />
      </div>

      <h3 className="text-5xl font-bold text-center intro-text">
        Hi, I’m <span className="text-indigo-600">Afeef M</span>
      </h3>

      <div ref={container} className="mt-4 flex justify-center items-center">
        <h3
          ref={textRef}
          className="text-3xl font-semibold text-indigo-400 text-center tracking-wide"
        ></h3>
        <span
          ref={cursorRef}
          className="animate-blink text-indigo-400 text-3xl font-semibold ml-1"
        >
          |
        </span>

        <style jsx>{`
          .animate-blink {
            animation: blink 0.8s infinite;
          }
          @keyframes blink {
            0%,
            50% {
              opacity: 1;
            }
            51%,
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        {[
          {
            href: "mailto:afeefmaliyekkal14@gmail.com",
            src: "/email.gif",
            alt: "email",
          },
          {
            href: "https://github.com/afeef-m",
            src: "/github.gif",
            alt: "github",
          },
          {
            href: "https://www.linkedin.com/in/afeef-m/",
            src: "/linkedin.gif",
            alt: "linkedin",
          },
          {
            href: "https://www.instagram.com/",
            src: "/instagram.gif",
            alt: "instagram",
          },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            className="hover:scale-110 transition-transform duration-300 "
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={50}
              height={50}
              className="drop-shadow-[0_0_15px_#6366f1]"
            />
          </Link>
        ))}
      </div>
      <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md">
        <Link href="/contact">Let’s Talk</Link>
      </button>
    </main>
  );
}

