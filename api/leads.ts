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
    
    // Extract landing URL from request body if provided (from client)
    const landingFromBody = (req.body as any)?.landing;
    
    // Validate the request body (without landing field)
    const { landing: _, ...bodyWithoutLanding } = req.body as any;
    const validatedData = leadSchema.parse(bodyWithoutLanding);
    
    // Save lead
    const lead = createLead(validatedData);
    
    console.log('Lead created:', lead.id);
    
    // Build full landing URL with UTM parameters
    // Priority: 1) Landing from request body (from client with full URL + UTM), 2) Referer header, 3) Request URL, 4) Fallback
    let landingUrl: string;
    
    if (landingFromBody && typeof landingFromBody === 'string') {
      // Use landing URL from client (contains full URL with UTM parameters)
      landingUrl = landingFromBody;
      console.log('Using landing URL from request body:', landingUrl);
    } else {
      // Fallback to referer or construct from headers
      const refererHeader = req.headers.referer || req.headers.referrer;
      const referer = Array.isArray(refererHeader) ? refererHeader[0] : refererHeader;
      
      if (referer) {
        // Referer contains the full URL of the page that made the request
        // This includes query parameters (UTM tags)
        try {
          const refererUrl = new URL(referer);
          // Keep origin, pathname, and search (query params)
          landingUrl = `${refererUrl.origin}${refererUrl.pathname}${refererUrl.search}`;
          console.log('Using referer URL:', landingUrl);
        } catch (e) {
          // If referer is not a valid URL, use it as-is
          landingUrl = referer;
          console.log('Using referer as-is:', landingUrl);
        }
      } else {
        // Fallback: construct from request headers and URL
        const protocol = Array.isArray(req.headers['x-forwarded-proto']) 
          ? req.headers['x-forwarded-proto'][0] 
          : req.headers['x-forwarded-proto'] || 'https';
        const hostHeader = req.headers['x-forwarded-host'] || req.headers.host;
        const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader || process.env.VERCEL_URL || 'hathaven-landing.vercel.app';
        const requestUrl = req.url || '/';
        const queryString = requestUrl.includes('?') ? requestUrl.substring(requestUrl.indexOf('?')) : '';
        landingUrl = `${protocol}://${host}${queryString}`;
        console.log('Constructed landing URL from request:', landingUrl);
      }
    }
    
    console.log('Final landing URL:', landingUrl);
    
    // Send to webhook
    const webhookUrl = "https://n8n.srv989148.hstgr.cloud/webhook/push-lead";
    const webhookPayload = {
      email: lead.email,
      full_name: `${lead.first_name} ${lead.last_name}`,
      landing: landingUrl,
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
