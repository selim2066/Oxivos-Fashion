"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && name.trim()) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="bg-surface text-on-surface min-h-screen pt-24 pb-16 md:pt-28 md:pb-24 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-16 md:gap-24">
        
        {/* ================= SECTION 1 — About ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col gap-8 md:gap-12"
        >
          {/* Header */}
          <div className="max-w-3xl">
            <span className="text-label-md uppercase tracking-widest text-secondary block mb-3 font-semibold">
              Our Story
            </span>
            <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg text-primary uppercase font-black leading-tight tracking-tight">
              Built for how you <br className="hidden sm:inline" />
              actually move.
            </h1>
          </div>

          {/* Editorial Image */}
          <div className="relative w-full aspect-[3/2] md:aspect-[16/9] overflow-hidden rounded">
            <Image
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1600&auto=format&fit=crop"
              alt="Aesthetic studio clothing rack with neutral minimalist garments"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center grayscale contrast-[1.08] brightness-95 dark:brightness-75 transition-all duration-300"
            />
          </div>

          {/* Story Paragraphs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter mt-2">
            <div className="md:col-span-8 flex flex-col gap-6 text-on-surface-variant text-body-md md:text-body-lg font-light leading-relaxed">
              <p>
                Oxivos Fashion was born out of a simple frustration: the realization that the clothing industry has chosen speed over substance. Most modern garments are constructed to be consumed, discarded, and replaced in a relentless cycle that disregards craft and longevity.
              </p>
              <p>
                We believe that the garments you wear every day should be silent companions — built with technical precision to move as you move, and designed with a restrained aesthetic that endures beyond seasonal trends. Every fabric, seam, and silhouette is engineered with a strict discipline of quiet elevation.
              </p>
              <p>
                From our base, we select premium fibers and partner with local artisans to craft pieces that honor both material integrity and functional performance. This isn&apos;t fast fashion. It is tailored discipline for the modern landscape.
              </p>
            </div>
          </div>

          {/* Mission / Vision split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-outline-variant/30 pt-8 mt-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase text-secondary font-bold">
                Mission
              </span>
              <p className="text-body-md text-on-surface-variant font-light leading-relaxed">
                To engineer everyday technical basics with architectural precision, prioritizing local craft, material longevity, and effortless natural movement.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase text-secondary font-bold">
                Vision
              </span>
              <p className="text-body-md text-on-surface-variant font-light leading-relaxed">
                To lead a shift toward minimalist wardrobes of high-performance garments that stand the test of time, reducing waste through uncompromising discipline.
              </p>
            </div>
          </div>

          {/* Values Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter border-t border-outline-variant/30 pt-8 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-label-md font-bold uppercase text-primary tracking-wider">
                Craft
              </span>
              <p className="text-body-md text-on-surface-variant font-light">
                Uncompromising construction and attention to every single stitch.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-md font-bold uppercase text-primary tracking-wider">
                Honesty
              </span>
              <p className="text-body-md text-on-surface-variant font-light">
                Transparent materials, fair pricing, and clear, authentic sizing.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-md font-bold uppercase text-primary tracking-wider">
                Longevity
              </span>
              <p className="text-body-md text-on-surface-variant font-light">
                Garments designed to resist wear, wash after wash, season after season.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <hr className="border-outline-variant/30 w-full" />

        {/* ================= SECTION 2 — Contact ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col gap-8 md:gap-12"
        >
          {/* Header */}
          <div>
            <span className="text-label-md uppercase tracking-widest text-secondary block mb-3 font-semibold">
              Get in Touch
            </span>
            <h2 className="font-heading text-headline-sm md:text-headline-md text-primary uppercase font-black tracking-tight">
              We&apos;d love to hear from you.
            </h2>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter items-start">
            
            {/* Form Left */}
            <div className="md:col-span-7 lg:col-span-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-widest uppercase text-on-surface-variant/70 font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-b border-dashed border-outline-variant/70 py-1.5 focus:border-solid focus:border-primary focus:outline-none transition-all text-primary font-sans text-body-md placeholder:text-on-surface-variant/30"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-widest uppercase text-on-surface-variant/70 font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-dashed border-outline-variant/70 py-1.5 focus:border-solid focus:border-primary focus:outline-none transition-all text-primary font-sans text-body-md placeholder:text-on-surface-variant/30"
                    placeholder="Your email address"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-widest uppercase text-on-surface-variant/70 font-bold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-transparent border-b border-dashed border-outline-variant/70 py-1.5 focus:border-solid focus:border-primary focus:outline-none transition-all text-primary font-sans text-body-md placeholder:text-on-surface-variant/30 resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                <div className="mt-2">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </div>

                {/* Floating Success Alert Toast */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 20, x: "-50%" }}
                      className="fixed bottom-8 left-1/2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full shadow-2xl z-50 uppercase tracking-widest text-[10px] text-center"
                    >
                      Message Sent Successfully
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Info Right */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-8 md:pl-4">
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold block mb-0.5">
                      Email Us
                    </span>
                    <a
                      href="mailto:hello@oxivosfashion.com"
                      className="text-body-md font-medium text-primary hover:underline"
                    >
                      hello@oxivosfashion.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold block mb-0.5">
                      WhatsApp / Phone
                    </span>
                    <p className="text-body-md text-primary font-medium">
                      +880 1700 000000
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold block mb-0.5">
                      Studio Address
                    </span>
                    <p className="text-body-md text-on-surface-variant font-light leading-relaxed">
                      Gulshan Avenue, Plot 42<br />
                      Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="border-t border-outline-variant/30 pt-6 flex flex-col gap-3">
                <span className="text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">
                  Connect with us
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
