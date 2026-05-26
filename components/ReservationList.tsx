import { Reservation } from '@/types/reservation';

type Props = {
  reservations: Reservation[];
};

export default function ReservationList({ reservations }: Props) {
  if (reservations.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700 mb-3">
        予約一覧（{reservations.length}件）
      </h2>
      <div className="flex flex-col gap-3">
        {reservations.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow p-4 border-l-4 border-green-400">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-bold text-gray-800">{r.name} 様</span>
                <span className="text-xs text-gray-500 ml-2">（{r.furigana}）</span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} 受付
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📅 {r.date}　🕐 {r.time}</p>
              <p>📞 {r.phone}</p>
              <p>🎂 {r.birthDate}</p>
              <p>💬 LINE: {r.lineName}</p>
              {r.notes && <p>📝 {r.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
