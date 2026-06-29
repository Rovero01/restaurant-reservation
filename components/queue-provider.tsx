"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import {
  buildGuest,
  Guest,
  GuestStatus,
  initialGuests,
  QueueState,
  ReservationInput
} from "@/lib/queue-store";

const QueueContext = createContext<QueueState | null>(null);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);

  const value = useMemo<QueueState>(
    () => ({
      guests,
      addGuest: (guest: ReservationInput) => {
        const waitingCount = guests.filter((item) => item.status === "Waiting").length;
        const nextQueueNumber = Math.max(0, ...guests.map((item) => item.queueNumber)) + 1;
        const newGuest = buildGuest(guest, waitingCount, nextQueueNumber);
        setGuests((current) => [newGuest, ...current]);
        return newGuest;
      },
      updateStatus: (id: string, status: GuestStatus) => {
        setGuests((current) =>
          current.map((guest) => (guest.id === id ? { ...guest, status } : guest))
        );
      },
      removeGuest: (id: string) => {
        setGuests((current) => current.filter((guest) => guest.id !== id));
      }
    }),
    [guests]
  );

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used inside QueueProvider");
  }
  return context;
}
