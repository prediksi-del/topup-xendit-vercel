import './globals.css';

export const metadata = {
  title: 'TopUpPintar - Gerbang Pembayaran Xendit',
  description: 'Sistem Pengisian Saldo Otomatis Terintegrasi Xendit dan Vercel',
};

function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-brand-primary">
          TopUp<span className="text-slate-800">Pintar</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">
            Saldo: <strong className="text-slate-800">Rp 250.000</strong>
          </span>
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} TopUpPintar. Hosted on Vercel Serverless.
        </footer>
      </body>
    </html>
  );
    }
