import { prisma } from "@/lib/db/prisma";
import { handleApiError, noContent, ok } from "@/lib/api/response";
import { updateUserSchema } from "@/lib/api/schemas";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id }, include: { company: true } });
    if (!user) throw new Error("NOT_FOUND");
    return ok(user);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const payload = updateUserSchema.parse(await request.json());
    const user = await prisma.user.update({ where: { id }, data: payload, include: { company: true } });
    return ok(user);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleApiError(error);
  }
}
