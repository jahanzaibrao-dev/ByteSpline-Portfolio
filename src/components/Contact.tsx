"use client";

import { useState, useTransition, useRef } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { submitContact } from "@/app/actions/contact";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";

const labelClass = "block text-sm font-medium text-muted-light mb-1.5";

export default function Contact() {
  const { contact } = siteContent;
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    const formData = new FormData(e.currentTarget);

    const res = await submitContact(formData);
    setResult(res);
    if (res.success) formRef.current?.reset();
  }

  return (
    <section
      id="contact"
      className="py-24 bg-surface/50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={contact.sectionHeader.badge}
          title={contact.sectionHeader.title}
          description={contact.sectionHeader.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Contact info ── */}
          <FadeUp delay={0.1} className="lg:col-span-2 space-y-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/35 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/18 transition-colors">
                <Mail className="text-primary" size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Email us</p>
                <p className="text-foreground font-semibold text-sm">
                  {contact.email}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Location</p>
                <p className="text-foreground font-semibold text-sm">
                  {contact.location}
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ── Form ── */}
          <FadeUp delay={0.2} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {result?.success ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center gap-5 p-10 rounded-2xl border border-primary/30 bg-primary/5 h-full min-h-[360px]"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <CheckCircle className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Message sent!
                    </h3>
                    <p className="text-muted-light text-sm leading-relaxed max-w-xs">
                      Thanks for reaching out. We&apos;ll get back to you at{" "}
                      <span className="text-primary font-medium">
                        {contact.email}
                      </span>{" "}
                      within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="text-sm text-muted hover:text-primary transition-colors underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* Form state */
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="John Smith"
                        disabled={isPending}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="john@company.com"
                        disabled={isPending}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-type" className={labelClass}>
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        name="projectType"
                        disabled={isPending}
                        className={inputClass}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select type...
                        </option>
                        {contact.projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className={labelClass}>
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        disabled={isPending}
                        className={inputClass}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select range...
                        </option>
                        {contact.budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={isPending}
                      placeholder="Tell us about your project, goals, or questions..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {result?.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/8 text-red-400 text-sm"
                        role="alert"
                      >
                        <AlertCircle
                          size={16}
                          className="shrink-0"
                          aria-hidden="true"
                        />
                        {result.error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
