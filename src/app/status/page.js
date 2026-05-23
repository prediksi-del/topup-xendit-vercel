'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function StatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const isSuccess = status === 'success';

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-emerald-50 text-brand-success' : 'bg-rose-50 text-rose-500'}`}>
        {isSuccess ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        )}
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        {isSuccess ? 'Pembayaran Berhasil!' : 'Transaksi Gagal'}
      </h1>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8">
        {isSuccess 
          ? 'Sistem sedang memperbarui saldo akunmu secara real-time melalui webhook aman.' 
          : 'Gagal memproses pembayaran atau transaksi dibatalkan. Silakan coba kembali.'}
      </p>

      <Link 
        href="/" 
        className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all active:scale-[0.98]"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading status...</div>}>
      <StatusContent />
    </Suspense>
  );
    }
