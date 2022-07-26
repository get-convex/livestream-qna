import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  questions: defineTable({ text: s.string(), votes: s.number() }),
  stream: defineTable({ stopped: s.boolean() }),
});