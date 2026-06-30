import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  address: z.string().min(2).optional(),
  phone: z.string().min(6).optional()
});

export const updateCompanySchema = createCompanySchema.partial();

export const createAdminSchema = z.object({
  companyId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2).optional()
});

export const updateAdminSchema = createAdminSchema.partial();

export const createUserSchema = z.object({
  companyId: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional()
});

export const updateUserSchema = createUserSchema.partial();

export const joinCompanySchema = z.object({
  companyName: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  address: z.string().min(2).optional(),
  companyPhone: z.string().min(6).optional(),
  ownerName: z.string().min(2),
  ownerEmail: z.string().email()
});
