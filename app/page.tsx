'use client';

import { useState } from 'react';
import ReservationForm from '@/components/ReservationForm';
import ReservationList from '@/components/ReservationList';
import { Reservation } from '@/types/reservation';

export default function Home() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [reservation, ...prev]);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-2">
          予約受付フォーム
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          ご希望の日時をご入力ください
        </p>
        <ReservationForm onAdd={addReservation} />
        <ReservationList reservations={reservations} />
      </div>
    </main>
  );
}
