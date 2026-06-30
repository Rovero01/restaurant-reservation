import { prisma } from "@/lib/db/prisma";
import { handleApiError, noContent, ok } from "@/lib/api/response";
import { updateAdminSchema } from "@/lib/api/schemas";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const admin = await prisma.admin.findUnique({ where: { id }, include: { company: true } });
    if (!admin) throw new Error("NOT_FOUND");
    return ok(admin);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const payload = updateAdminSchema.parse(await request.json());
    const admin = await prisma.admin.update({ where: { id }, data: payload, include: { company: true } });
    return ok(admin);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.admin.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleApiError(error);
  }
}
