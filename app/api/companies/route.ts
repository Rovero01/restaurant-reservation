import { prisma } from "@/lib/db/prisma";
import { created, handleApiError, ok } from "@/lib/api/response";
import { createCompanySchema } from "@/lib/api/schemas";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { admins: true, users: true } } }
    });
    return ok(companies);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = createCompanySchema.parse(await request.json());
    const company = await prisma.company.create({ data: payload });
    return created(company);
  } catch (error) {
    return handleApiError(error);
  }
}
