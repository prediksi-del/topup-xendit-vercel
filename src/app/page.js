'use client';
import { useState } from 'react';

export default function TopupPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const quickNominals = [10000, 25000, 50000, 100000, 250000, 500000];

  const handleTopup = async (e) => {
    e.preventDefault();
    if (Number(amount) < 10000) return alert('Minimal top up adalah Rp 10.000');
    
    setLoading(true);
    try {
      const response = await fetch('/api/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, userId: 'user_dev_github' }),
      });
      const data = await response.json();
      
      if (data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      } else {
        alert(data.error || 'Terjadi gangguan, coba lagi.');
      }
    } catch (err) {
      alert('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Isi Ulang Saldo</h1>
      <p className="text-sm text-slate-500 mb-6">Pilih atau masukkan nominal top up yang kamu inginkan.</p>

      <form onSubmit={handleTopup} className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">Pilihan Cepat</label>
          <div className="grid grid-cols-3 gap-2">
            {quickNominals.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className={`py-2.5 px-3 text-sm font-medium rounded-xl border transition-all duration-200 ${
                  amount === val.toString()
                    ? 'border-brand-primary bg-indigo-50/50 text-brand-primary ring-2 ring-indigo-600/10'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                Rp {val.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Nominal Kustom (Rp)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">IDR</span>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-indigo-600/10 font-semibold text-lg transition-all"
              required
            />
          </div>
          <span className="text-xs text-slate-400 mt-1.5 block">Minimal Rp 10.000</span>
        </div>

        <button
          type="submit"
          disabled={loading || !amount}
          className="w-full bg-brand-primary hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {loading ? 'Memproses...' : 'Lanjutkan Pembayaran'}
        </button>
      </form>
    </div>
  );
}
