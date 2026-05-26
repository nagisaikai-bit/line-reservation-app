'use client';

import { useState } from 'react';
import { Reservation } from '@/types/reservation';

type Props = {
  onAdd: (reservation: Reservation) => void;
};

type FormData = {
  name: string;
  furigana: string;
  phone: string;
  birthDate: string;
  lineName: string;
  date: string;
  time: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormData | 'agree', string>>;

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
];

const DAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

function getAvailableDates(): { value: string; label: string }[] {
  const dates: { value: string; label: string }[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  for (let i = 0; i < 8; i++) {
    const baseMonth = now.getMonth() + i;
    const year = now.getFullYear() + Math.floor(baseMonth / 12);
    const month = baseMonth % 12;

    [2, 3].forEach((day) => {
      const date = new Date(year, month, day);
      if (date >= now) {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const dow = DAYS_JA[date.getDay()];
        const value = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const label = `${y}年${m}月${d}日（${dow}）`;
        dates.push({ value, label });
      }
    });
  }
  return dates;
}

const PRIVACY_POLICY = `【利用規約】（日本パーソナルコミュニケーション協会）

第１条（定義）
当協会は講座利用に関する規約を定め、利用者が参加した場合は承諾したものとみなします。

第２条（適用範囲）
本規約はウェブサイト・メール・電話など、あらゆる申込み手段に適用されます。反社会的勢力や違法行為を目的とした利用は禁止されています。

第３条（提供情報について）
当協会は情報の収集に際して十分な注意を払っておりますが、情報の正確性・有用性については保証しかねます。

第４条（利用上の注意）
講師は予告なく変更される場合があります。金融関係者および営業目的での参加は禁止します。迷惑行為があった場合は退席を求めることがあり、不適切と判断される場合は参加をお断りすることがあります。

第５条（個人情報取扱い）
姓名・生年月日・住所・メールアドレスなどの属性情報を取得します。利用目的はサービスの実施・商品のご案内・マーケティング・ご意見への回答等です。個人情報は法令に該当する場合を除き、第三者へ提供しません。

第７条（免責）
当協会は故意または重大なる過失に起因することが明らかな場合を除き、一切の責任を負いません。

第９条（準拠法）
本規約は日本法に準拠し、紛争は当協会本店所在地を管轄する地方裁判所にて解決します。

詳細はこちら：http://www.kosodates.jp/kiyaku/`;

export default function ReservationForm({ onAdd }: Props) {
  const [form, setForm] = useState<FormData>({
    name: '', furigana: '', phone: '', birthDate: '', lineName: '',
    date: '', time: '', notes: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableDates = getAvailableDates();

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = 'お名前を入力してください';
    if (!form.furigana.trim()) {
      newErrors.furigana = 'フリガナを入力してください';
    } else if (!/^[ァ-ヶーｦ-ﾟ\s　]+$/.test(form.furigana.trim())) {
      newErrors.furigana = 'カタカナで入力してください';
    }
    if (!form.phone.trim()) {
      newErrors.phone = '電話番号を入力してください';
    } else if (!/^[0-9\-+]{10,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = '正しい電話番号を入力してください';
    }
    if (!form.birthDate) newErrors.birthDate = '生年月日を入力してください';
    if (!form.lineName.trim()) newErrors.lineName = 'LINE名を入力してください';
    if (!form.date) newErrors.date = '日程を選択してください';
    if (!form.time) newErrors.time = '時間を選択してください';
    if (!agree) newErrors.agree = '利用規約に同意してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    });
    setForm({ name: '', furigana: '', phone: '', birthDate: '', lineName: '', date: '', time: '', notes: '' });
    setErrors({});
    setAgree(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const field = (label: string, required: boolean, children: React.ReactNode, error?: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 mb-6">
      {submitted && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
          予約を受け付けました。ありがとうございます。
        </div>
      )}

      {field('お名前', true,
        <input type="text" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="猪飼 渚" className={inputClass} />,
        errors.name
      )}

      {field('フリガナ', true,
        <input type="text" value={form.furigana}
          onChange={(e) => setForm({ ...form, furigana: e.target.value })}
          placeholder="イカイ ナギサ" className={inputClass} />,
        errors.furigana
      )}

      {field('電話番号', true,
        <input type="tel" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="090-0000-0000" className={inputClass} />,
        errors.phone
      )}

      {field('生年月日', true,
        <input type="date" value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          className={inputClass} />,
        errors.birthDate
      )}

      {field('LINE名', true,
        <input type="text" value={form.lineName}
          onChange={(e) => setForm({ ...form, lineName: e.target.value })}
          placeholder="LINE表示名を入力してください" className={inputClass} />,
        errors.lineName
      )}

      {field('希望日程', true,
        <select value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={`${inputClass} bg-white`}>
          <option value="">開催日を選択してください（毎月2日・3日）</option>
          {availableDates.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>,
        errors.date
      )}

      {field('希望時間', true,
        <select value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className={`${inputClass} bg-white`}>
          <option value="">時間を選択してください</option>
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>,
        errors.time
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">備考（任意）</label>
        <textarea value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="ご要望があればご記入ください"
          rows={3}
          className={`${inputClass} resize-none`} />
      </div>

      {/* 利用規約 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          個人情報の取り扱いについて <span className="text-red-500">*</span>
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed h-48 overflow-y-auto mb-3">
          {PRIVACY_POLICY}
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 w-5 h-5 accent-green-500 shrink-0"
          />
          <span className="text-sm text-gray-700">
            上記の個人情報の取り扱いについて同意します
          </span>
        </label>
        {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-base transition-colors"
      >
        予約する
      </button>
    </form>
  );
}
