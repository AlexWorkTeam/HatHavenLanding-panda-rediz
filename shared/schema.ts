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

export type Lead = z.infer<typeof leadSchema>;
