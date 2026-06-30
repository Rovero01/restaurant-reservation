import { prisma } from "@/lib/db/prisma";
import { created, handleApiError } from "@/lib/api/response";
import { joinCompanySchema } from "@/lib/api/schemas";

export async function POST(request: Request) {
  try {
    const payload = joinCompanySchema.parse(await request.json());

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: payload.companyName,
          slug: payload.slug,
          address: payload.address,
          phone: payload.companyPhone
        }
      });

      const admin = await tx.admin.create({
        data: {
          companyId: company.id,
          name: payload.ownerName,
          email: payload.ownerEmail,
          role: "owner"
        }
      });

      return { company, admin };
    });

    return created(result);
  } catch (error) {
    return handleApiError(error);
  }
}
