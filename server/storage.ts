import { messages, type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private messages: Message[];
  private currentId: number;

  constructor() {
    this.messages = [];
    this.currentId = 1;
    this.seed();
  }

  private seed() {
    const defaultMessages = [
      "This will be your best year yet!",
      "New beginnings await you.",
      "Dream big and make it happen.",
      "Wishing you success and happiness.",
      "Your journey to greatness starts now.",
      "Believe in yourself this year.",
      "Make every second count!",
      "Cheers to new adventures!",
      "Embrace the fresh start.",
      "You are capable of amazing things."
    ];
    
    defaultMessages.forEach(content => {
      this.messages.push({ id: this.currentId++, content });
    });
  }

  async getMessages(): Promise<Message[]> {
    return this.messages;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = { ...insertMessage, id: this.currentId++ };
    this.messages.push(message);
    return message;
  }
}

export const storage = new MemStorage();
