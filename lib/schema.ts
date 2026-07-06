import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    name: text("name").notNull(),
    role: text("role").default("employee").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})

export const events = sqliteTable("events", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    date: integer("date", { mode: "timestamp" }).notNull(),
    location: text("location"),
    isPublic: integer("is_public", { mode: "boolean" }).default(true).notNull(),
    createdBy: text("created_by"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})

export const contactRequests = sqliteTable("contact_requests", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})

export const schedules = sqliteTable("schedules", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    date: integer("date", { mode: "timestamp" }).notNull(),
    shift: text("shift").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})

export const employeeRequests = sqliteTable("employee_requests", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    type: text("type").notNull(),
    description: text("description").notNull(),
    status: text("status").default("pending").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})

export const flaggedConversations = sqliteTable("flagged_conversations", {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id").notNull(),
    messages: text("messages").notNull(), // JSON string
    flaggedKeywords: text("flagged_keywords").notNull(), // JSON string
    reviewed: integer("reviewed", { mode: "boolean" }).default(false).notNull(),
    adminNotes: text("admin_notes"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
})