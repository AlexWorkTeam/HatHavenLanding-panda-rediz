import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Lead schema for quiz submissions
export const leadSchema = z.object({
  full_name: z.string().min(1, "Имя обязательно"),
  phone: z.string().min(1, "Телефон обязателен"),
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

export type Lead = z.infer<typeof leadSchema>;
