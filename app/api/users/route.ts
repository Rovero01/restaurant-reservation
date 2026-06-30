import { prisma } from "@/lib/db/prisma";
import { created, handleApiError, ok } from "@/lib/api/response";
import { createUserSchema } from "@/lib/api/schemas";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId") ?? undefined;
    const users = await prisma.user.findMany({
      where: companyId ? { companyId } : undefined,
      orderBy: { createdAt: "desc" },
      include: { company: true }
    });
    return ok(users);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = createUserSchema.parse(await request.json());
    const user = await prisma.user.create({ data: payload, include: { company: true } });
    return created(user);
  } catch (error) {
    return handleApiError(error);
  }
}
