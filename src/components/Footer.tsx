import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-gray-800 text-gray-400 py-16 mt-auto relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-red/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-white tracking-widest uppercase flex items-center gap-2">
                Fit<span className="text-brand-red">Pro</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              Ja ne samo da treniram druge; ja živim taj život. Pridružite se zajednici i transformišite svoje tijelo i um uz naučno dokazane metode i bezrezervnu posvećenost.
            </p>
            <div className="pt-2">
              <span className="text-white font-bold tracking-widest uppercase text-sm bg-gray-900 border border-gray-800 px-4 py-2 rounded-full shadow-inner">
                Sandro Gatarić
              </span>
            </div>
          </div>

          {/* Navigacija */}
          <div className="md:col-span-3 space-y-6 md:ml-auto">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-brand-red">
              Navigacija
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="text-brand-red/50 text-xs">▶</span> Početna</Link></li>
              <li><Link href="/programs" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="text-brand-red/50 text-xs">▶</span> Programi</Link></li>
              <li><Link href="/blog" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="text-brand-red/50 text-xs">▶</span> O Meni</Link></li>
              <li><Link href="/login" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="text-brand-red/50 text-xs">▶</span> Prijava</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-brand-red">
              Kontakt
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-4">
                <span className="bg-gray-900 p-2 rounded text-brand-red">📍</span>
                <span className="leading-relaxed">Trn, Laktaši<br />Bosna i Hercegovina</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-gray-900 p-2 rounded text-brand-red">✉️</span>
                <a href="mailto:info@fitpro.com" className="hover:text-white transition-colors mt-1">info@fitpro.com</a>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-gray-900 p-2 rounded text-brand-red">📸</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors mt-1">@sandrogataric</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Donji Coperight Dio */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Sandro Gatarić &bull; FitPro. Sva prava strogo zadržana.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">Politika Privatnosti</Link>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <Link href="/" className="hover:text-gray-300 transition-colors">Uslovi Korišćenja</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
