import { prisma } from "@/lib/db/prisma";
import { handleApiError, noContent, ok } from "@/lib/api/response";
import { updateCompanySchema } from "@/lib/api/schemas";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const company = await prisma.company.findUnique({
      where: { id },
      include: { admins: true, users: true }
    });
    if (!company) throw new Error("NOT_FOUND");
    return ok(company);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const payload = updateCompanySchema.parse(await request.json());
    const company = await prisma.company.update({ where: { id }, data: payload });
    return ok(company);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.company.delete({ where: { id } });
    return noContent();
  } catch (error) {
    return handleApiError(error);
  }
}
