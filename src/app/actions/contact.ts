"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContact(
  formData: FormData,
): Promise<ContactResult> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const projectType = (formData.get("projectType") as string | null)?.trim();
  const budget = (formData.get("budget") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "ByteSpline Tech <noreply@bytespline.com>",
      // ⚠️  Resend restriction: until bytespline.com is verified in the Resend
      // dashboard, you can only send to the email you signed up with.
      // Replace this with your Resend account email for testing, or verify
      // the domain and change the `from` to e.g. noreply@bytespline.com.
      to: "hello@bytespline.com",
      replyTo: email,
      subject: `New inquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
          <div style="background:#050d1a;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="margin:0;font-size:22px;color:#22d3ee;font-weight:700">
              ByteSpline Tech
            </h1>
            <p style="margin:6px 0 0;font-size:13px;color:#94a3b8">New contact form submission</p>
          </div>

          <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#64748b;width:130px;vertical-align:top">Name</td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b;font-weight:600">${name}</td>
              </tr>
              <tr style="border-top:1px solid #f1f5f9">
                <td style="padding:10px 0;font-size:13px;color:#64748b;vertical-align:top">Email</td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b">
                  <a href="mailto:${email}" style="color:#0ea5e9;text-decoration:none">${email}</a>
                </td>
              </tr>
              ${
                projectType
                  ? `<tr style="border-top:1px solid #f1f5f9">
                <td style="padding:10px 0;font-size:13px;color:#64748b;vertical-align:top">Project Type</td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b">${projectType}</td>
              </tr>`
                  : ""
              }
              ${
                budget
                  ? `<tr style="border-top:1px solid #f1f5f9">
                <td style="padding:10px 0;font-size:13px;color:#64748b;vertical-align:top">Budget</td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b">${budget}</td>
              </tr>`
                  : ""
              }
              <tr style="border-top:1px solid #f1f5f9">
                <td style="padding:10px 0;font-size:13px;color:#64748b;vertical-align:top">Message</td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap">${message}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f1f5f9">
              <a
                href="mailto:${email}"
                style="display:inline-block;background:#22d3ee;color:#050d1a;font-weight:700;font-size:14px;padding:10px 20px;border-radius:8px;text-decoration:none"
              >
                Reply to ${name}
              </a>
            </div>
          </div>

          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;text-align:center">
            Sent via bytespline.com contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        success: false,
        error: "Something went wrong. Please try again or email us directly.",
      };
    }

    console.log("[contact] Email sent:", data?.id);
    return { success: true };
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or email us directly.",
    };
  }
}
