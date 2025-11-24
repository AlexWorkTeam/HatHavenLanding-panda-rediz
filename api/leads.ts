import type { VercelRequest, VercelResponse } from '@vercel/node';
import { leadSchema } from '../shared/schema';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const validatedData = leadSchema.parse(req.body);
    
    // Save lead using storage
    const lead = await storage.createLead(validatedData);
    
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
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      description: `Company Type: ${lead.companyType}, Fraud Date: ${lead.fraudDate}, Money Status: ${lead.moneyStatus}, Amount: ${lead.amount}, Payment Method: ${lead.paymentMethod}, Documentation: ${lead.documentation}`,
    };
    
    // Send webhook (don't await to avoid blocking)
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    }).catch(err => {
      console.error("Webhook error:", err);
    });
    
    return res.status(200).json({ success: true, lead });
  } catch (error: any) {
    console.error("Lead submission error:", error);
    
    // Return validation errors
    if (error.errors) {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.errors 
      });
    }
    
    return res.status(400).json({ 
      error: error.message || "Invalid lead data" 
    });
  }
}

