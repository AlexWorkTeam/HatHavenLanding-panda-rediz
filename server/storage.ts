import { type User, type InsertUser, type Lead } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: Lead): Promise<Lead & { id: string; createdAt: Date }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead & { id: string; createdAt: Date }>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(lead: Lead): Promise<Lead & { id: string; createdAt: Date }> {
    const id = randomUUID();
    const leadWithMeta = { ...lead, id, createdAt: new Date() };
    this.leads.set(id, leadWithMeta);
    return leadWithMeta;
  }
}

export const storage = new MemStorage();
