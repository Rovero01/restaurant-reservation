import { prisma } from "@/lib/db/prisma";
import { created, handleApiError, ok } from "@/lib/api/response";
import { createAdminSchema } from "@/lib/api/schemas";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId") ?? undefined;
    const admins = await prisma.admin.findMany({
      where: companyId ? { companyId } : undefined,
      orderBy: { createdAt: "desc" },
      include: { company: true }
    });
    return ok(admins);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = createAdminSchema.parse(await request.json());
    const admin = await prisma.admin.create({ data: payload, include: { company: true } });
    return created(admin);
  } catch (error) {
    return handleApiError(error);
  }
}
