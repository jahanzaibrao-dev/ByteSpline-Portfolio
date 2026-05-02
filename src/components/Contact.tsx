"use client";

import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/ui/Button";

export default function Contact() {
  const { contact } = siteContent;

  return (
    <section
      id="contact"
      className="py-24 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={contact.sectionHeader.badge}
          title={contact.sectionHeader.title}
          description={contact.sectionHeader.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="text-primary" size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-muted mb-0.5">Email us</div>
                <div className="text-foreground font-medium text-sm">
                  {contact.email}
                </div>
              </div>
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <MessageSquare
                  className="text-primary"
                  size={20}
                  aria-hidden="true"
                />
              </div>
              <div>
                <div className="text-xs text-muted mb-0.5">WhatsApp</div>
                <div className="text-foreground font-medium text-sm">
                  {contact.whatsapp}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-muted mb-0.5">Location</div>
                <div className="text-foreground font-medium text-sm">
                  {contact.location}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Contact form"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-muted mb-1.5"
                >
                  {contact.formLabels.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-muted mb-1.5"
                >
                  {contact.formLabels.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm text-muted mb-1.5"
              >
                {contact.formLabels.subject}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Website / Web App / SaaS"
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-muted mb-1.5"
              >
                {contact.formLabels.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              {contact.formLabels.submit}
              <Send size={16} aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
