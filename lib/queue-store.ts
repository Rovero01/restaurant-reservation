import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Phone number is required"),
  partySize: z.coerce.number().min(1).max(16),
  seating: z.enum(["Indoor", "Outdoor", "Any"]),
  notes: z.string().max(160).optional()
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export type GuestStatus = "Waiting" | "Dine In" | "Done" | "Cancelled";

export type Guest = ReservationInput & {
  id: string;
  queueNumber: number;
  status: GuestStatus;
  quotedMinutes: number;
  joinedAt: string;
};

export type QueueState = {
  guests: Guest[];
  addGuest: (guest: ReservationInput) => Guest;
  updateStatus: (id: string, status: GuestStatus) => void;
  removeGuest: (id: string) => void;
};

const baseGuests = [
  ["WL-091", 1, "Aulia Rahman", "0812-0001-1101", 2, "Indoor", "", "Done", 0, "11:10"],
  ["WL-092", 2, "Dimas Pratama", "0812-0001-1102", 5, "Any", "High chair", "Done", 0, "11:35"],
  ["WL-093", 3, "Nadia Lestari", "0812-0001-1103", 3, "Outdoor", "", "Cancelled", 0, "12:05"],
  ["WL-094", 4, "Kevin Wijaya", "0812-0001-1104", 4, "Indoor", "Anniversary", "Done", 0, "12:20"],
  ["WL-095", 5, "Sari Dewi", "0812-0001-1105", 2, "Any", "", "Cancelled", 0, "13:15"],
  ["WL-096", 6, "Bima Santoso", "0812-0001-1106", 6, "Indoor", "Family table", "Done", 0, "14:10"],
  ["WL-097", 7, "Clara Tan", "0812-0001-1107", 2, "Outdoor", "", "Dine In", 0, "17:20"],
  ["WL-098", 8, "Fajar Nugroho", "0812-0001-1108", 4, "Indoor", "", "Dine In", 0, "17:35"],
  ["WL-099", 9, "Grace Melati", "0812-0001-1109", 3, "Any", "", "Dine In", 0, "17:42"],
  ["WL-100", 10, "Hendra Kusuma", "0812-0001-1110", 5, "Indoor", "Window if possible", "Dine In", 0, "17:55"],
  ["WL-101", 11, "Irene Natalia", "0812-0001-1111", 2, "Outdoor", "", "Dine In", 0, "18:02"],
  ["WL-102", 12, "Jonatan Lee", "0812-0001-1112", 4, "Any", "", "Dine In", 0, "18:08"],
  ["WL-103", 13, "Kirana Putri", "0812-0001-1113", 6, "Indoor", "Birthday dinner", "Dine In", 0, "18:14"],
  ["WL-104", 14, "Maya Putri", "0812-4400-1288", 4, "Indoor", "Birthday dinner", "Waiting", 25, "18:20"],
  ["WL-105", 15, "Raka Senjaya", "0857-9901-2255", 2, "Outdoor", "Near window if possible", "Waiting", 30, "18:25"],
  ["WL-106", 16, "Jessica Tan", "0819-1118-7722", 6, "Any", "", "Waiting", 40, "18:32"],
  ["WL-107", 17, "Leo Hartono", "0812-0001-1117", 3, "Indoor", "", "Waiting", 45, "18:39"],
  ["WL-108", 18, "Monica Santoso", "0812-0001-1118", 4, "Any", "", "Waiting", 52, "18:45"]
] as const;

export const initialGuests: Guest[] = baseGuests.map(
  ([id, queueNumber, name, phone, partySize, seating, notes, status, quotedMinutes, joinedAt]) => ({
    id,
    queueNumber,
    name,
    phone,
    partySize,
    seating,
    notes,
    status,
    quotedMinutes,
    joinedAt
  })
);

export function buildGuest(
  guest: ReservationInput,
  waitingCount: number,
  queueNumber: number
): Guest {
  return {
    ...guest,
    id: `WL-${Math.floor(200 + Math.random() * 700)}`,
    queueNumber,
    status: "Waiting",
    quotedMinutes: Math.max(10, (waitingCount + 1) * 12 + guest.partySize * 3),
    joinedAt: new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    })
  };
}
