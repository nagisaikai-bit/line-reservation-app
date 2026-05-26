'use client';

import { useState, useEffect } from 'react';
import ReservationForm from '@/components/ReservationForm';
import ReservationList from '@/components/ReservationList';
import { Reservation } from '@/types/reservation';

const LIFF_ID = '2010206549-oVdZczid';

export default function Home() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [liffReady, setLiffReady] = useState(false);

  useEffect(() => {
    import('@line/liff').then((liffModule) => {
      const liff = liffModule.default;
      liff.init({ liffId: LIFF_ID })
        .then(() => setLiffReady(true))
        .catch(() => setLiffReady(true)); // ブラウザでも動作するようフォールバック
    });
  }, []);

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
        {liffReady ? (
          <>
            <ReservationForm onAdd={addReservation} />
            <ReservationList reservations={reservations} />
          </>
        ) : (
          <div className="text-center text-gray-400 py-12">読み込み中...</div>
        )}
      </div>
    </main>
  );
}
