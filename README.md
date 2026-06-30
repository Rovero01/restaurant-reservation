# Restaurant Reservation

Simple waiting-list and reservation prototype for an all-you-can-eat restaurant.

## Current Focus

- Online reservation form
- Public wait estimate
- Anonymous customer-facing queue status
- Admin queue status management
- Public DineQ landing page with login modal and join CTA`r`n- Responsive dashboard/admin/user routes`r`n- Join flow that creates a company and owner admin
- Same-day admin queue filtering for active, waiting, dine in, done, and cancelled reservations

## Backend

This app uses Next.js route handlers for the backend and Prisma for PostgreSQL/Supabase.

### Models

- `Company`
- `Admin` belongs to one `Company`
- `User` belongs to one `Company`
- `Admin` and `User` are not related to each other

### CRUD Routes

- `POST /api/join` - creates a company plus owner admin`r`n- `GET /api/companies`
- `POST /api/companies`
- `GET /api/companies/:id`
- `PATCH /api/companies/:id`
- `DELETE /api/companies/:id`
- `GET /api/admins`
- `POST /api/admins`
- `GET /api/admins/:id`
- `PATCH /api/admins/:id`
- `DELETE /api/admins/:id`
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

### Prisma Commands

```bash
pnpm --filter waiting-list prisma:generate
pnpm --filter waiting-list prisma:migrate
pnpm --filter waiting-list prisma:studio
```
### Seed Data

Default seed data creates 2 companies, each with 2 admins and 2 users.

```bash
pnpm --filter waiting-list prisma:seed
```

Run this after setting `DATABASE_URL` and applying migrations.

Copy `.env.example` to `.env` and set `DATABASE_URL` with your Supabase PostgreSQL connection string before running migrations.

## Future Feature Notes

- Menu availability can be added later for AYCE operations, such as marking popular meat, fish, dessert, or drink items as Available, Limited, or Unavailable.
- Keep menu availability separate from the reservation MVP so the first version stays focused on waitlist flow and customer arrival timing.
- Historical queue views can be added later, such as yesterday, weekly, or monthly reservation history and reports.


