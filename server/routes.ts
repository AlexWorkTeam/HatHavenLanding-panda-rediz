import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema } from "@shared/schema";
import { promises as fs } from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = leadSchema.parse(req.body);
      
      // Save lead using storage
      const lead = await storage.createLead(validatedData);
      
      // Append to leads_log.txt
      const logEntry = `
[${new Date().toISOString()}]
Name: ${lead.full_name}
Phone: ${lead.phone}
Email: ${lead.email}
Quiz Answers:
  - Company Type: ${lead.companyType}
  - Fraud Date: ${lead.fraudDate}
  - Money Status: ${lead.moneyStatus}
  - Amount: ${lead.amount}
  - Payment Method: ${lead.paymentMethod}
  - Documentation: ${lead.documentation}
-------------------
`;
      
      const logPath = path.join(process.cwd(), "leads_log.txt");
      await fs.appendFile(logPath, logEntry);
      
      // Send to webhook
      const webhookUrl = "https://hook.eu2.make.com/mjdxoefdh8c4itgjpirwchafiyhaqixk";
      const webhookPayload = {
        email: lead.email,
        full_name: lead.full_name,
        landing: "legal-refund.replit.app", // todo: get actual domain
        country: "US",
        landing_name: "legal-refund-us-ru",
        user_id: 3,
        source: "Google",
        phone: lead.phone,
        ip: req.ip || "unknown",
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
      
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Lead submission error:", error);
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
