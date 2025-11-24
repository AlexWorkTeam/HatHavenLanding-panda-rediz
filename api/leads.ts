import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { randomUUID } from 'crypto';

// Lead schema (inline to avoid import issues)
const leadSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно"),
  last_name: z.string().min(1, "Фамилия обязательна"),
  phone: z.string()
    .min(1, "Телефон обязателен")
    .regex(/^1?\d{10}$/, "Введите корректный номер США (10 цифр)")
    .refine(val => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
    }, "Введите корректный номер США"),
  email: z.string().email("Некорректный email"),
  companyType: z.string(),
  fraudDate: z.string(),
  moneyStatus: z.string(),
  amount: z.string(),
  paymentMethod: z.string(),
  documentation: z.string(),
  dataConsent: z.boolean().refine(val => val === true, "Необходимо согласие"),
  ageConsent: z.boolean().refine(val => val === true, "Необходимо подтверждение возраста"),
});

// Simple storage (in-memory for serverless)
const leads: Array<any> = [];

function createLead(data: z.infer<typeof leadSchema>) {
  const id = randomUUID();
  const lead = { ...data, id, createdAt: new Date() };
  leads.push(lead);
  return lead;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received request:', JSON.stringify(req.body, null, 2));
    
    // Validate the request body
    const validatedData = leadSchema.parse(req.body);
    
    // Save lead
    const lead = createLead(validatedData);
    
    console.log('Lead created:', lead.id);
    
    // Send to webhook
    const webhookUrl = "https://n8n.srv989148.hstgr.cloud/webhook/push-lead";
    const webhookPayload = {
      email: lead.email,
      full_name: `${lead.first_name} ${lead.last_name}`,
      landing: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "hathaven-landing.vercel.app",
      country: "US",
      landing_name: "legal-refund-us-ru",
      user_id: 3,
      source: "Google",
      phone: lead.phone,
      ip: Array.isArray(req.headers['x-forwarded-for']) 
        ? req.headers['x-forwarded-for'][0] 
        : req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      description: `Company Type: ${lead.companyType}, Fraud Date: ${lead.fraudDate}, Money Status: ${lead.moneyStatus}, Amount: ${lead.amount}, Payment Method: ${lead.paymentMethod}, Documentation: ${lead.documentation}`,
    };
    
    console.log('Sending webhook to:', webhookUrl);
    console.log('Webhook payload:', JSON.stringify(webhookPayload, null, 2));
    
    // Send webhook with await to ensure it completes before function ends
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });
      
      const webhookText = await webhookResponse.text();
      console.log('Webhook response status:', webhookResponse.status);
      console.log('Webhook response:', webhookText);
      
      if (!webhookResponse.ok) {
        console.error('Webhook returned non-OK status:', webhookResponse.status, webhookText);
      }
    } catch (webhookError: any) {
      console.error("Webhook error:", webhookError);
      console.error("Webhook error message:", webhookError.message);
      console.error("Webhook error stack:", webhookError.stack);
      // Don't fail the request if webhook fails
    }
    
    return res.status(200).json({ success: true, lead });
  } catch (error: any) {
    console.error("Lead submission error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Return validation errors
    if (error.errors) {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.errors 
      });
    }
    
    return res.status(400).json({ 
      error: error.message || "Invalid lead data",
      details: error.toString()
    });
  }
}
