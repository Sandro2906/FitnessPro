"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [purchasedPrograms, setPurchasedPrograms] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('/api/user/get-purchases')
                .then(res => res.json())
                .then(data => {
                    if (data.programs) setPurchasedPrograms(data.programs);
                })
                .catch(err => console.error("Failed to load programs", err));
        }
    }, [isLoggedIn]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        setDropdownOpen(false);
    };

    return (
        <nav className="w-full bg-brand-darker/70 backdrop-blur-md border-b border-brand-red/30 py-4 px-6 md:px-12 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                <Link href="/" onClick={closeMenu} className="text-2xl font-black text-white uppercase tracking-wider hover:text-brand-red transition-colors flex-shrink-0">
                    Fit<span className="text-brand-red">Pro</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium">
                    <li>
                        <Link href="/" className="text-gray-300 hover:text-brand-red transition-colors">Početna</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-gray-300 hover:text-brand-red transition-colors">O meni</Link>
                    </li>
                    <li>
                        <Link href="/programs" className="text-gray-300 hover:text-brand-red transition-colors">Programi</Link>
                    </li>
                </ul>

                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {purchasedPrograms.length > 0 && (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="text-gray-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                                    >
                                        Moji Programi
                                        <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-brand-darker border border-brand-red/30 rounded-lg shadow-xl overflow-hidden flex flex-col z-[110]">
                                            {purchasedPrograms.map(prog => (
                                                <Link
                                                    key={prog}
                                                    href={`/programi/${prog}`}
                                                    onClick={closeMenu}
                                                    className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand-red/20 transition-colors border-b border-gray-800 last:border-0"
                                                >
                                                    {prog === 'weight-loss' && 'Protokol Mršavljenja'}
                                                    {prog === 'muscle-growth' && 'Plan za Hipertrofiju'}
                                                    {prog === 'conditioning' && 'Elitna Kondicija'}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <Link href="/profile" className="bg-brand-red hover:bg-red-700 text-white px-5 py-2 rounded-md font-bold transition-colors ml-4">
                                Moj Profil
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
                                Prijava
                            </Link>
                            <Link href="/register" className="bg-brand-red hover:bg-red-700 text-white px-5 py-2 rounded-md font-bold transition-colors">
                                Pridruži se
                            </Link>
                        </>
                    )}
                </div>

                {/* Hamburger Button for Mobile */}
                <button
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 bg-brand-darker border border-brand-red/20 rounded-lg p-4 shadow-xl flex flex-col space-y-4 absolute left-6 right-6">
                    <Link href="/" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">Početna</Link>
                    <Link href="/blog" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">O meni</Link>
                    <Link href="/programs" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">Programi</Link>

                    <div className="border-t border-brand-red/20 pt-4 flex flex-col space-y-3">
                        {isLoggedIn ? (
                            <>
                                {purchasedPrograms.length > 0 && (
                                    <div className="flex flex-col space-y-2 mb-2 border border-gray-800 rounded-md p-3">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Moji Kupljeni Programi</span>
                                        {purchasedPrograms.map(prog => (
                                            <Link
                                                key={prog}
                                                href={`/programi/${prog}`}
                                                onClick={closeMenu}
                                                className="text-gray-300 hover:text-brand-red text-sm transition-colors py-1"
                                            >
                                                ➡️ {prog === 'weight-loss' && 'Protokol Mršavljenja'}
                                                {prog === 'muscle-growth' && 'Plan za Hipertrofiju'}
                                                {prog === 'conditioning' && 'Elitna Kondicija'}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                <Link href="/profile" onClick={closeMenu} className="text-center bg-brand-red hover:bg-red-700 text-white px-5 py-3 rounded-md font-bold transition-colors w-full">
                                    Moj Profil
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={closeMenu} className="text-center border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white transition-colors px-5 py-3 rounded-md font-medium w-full">
                                    Prijava
                                </Link>
                                <Link href="/register" onClick={closeMenu} className="text-center bg-brand-red hover:bg-red-700 text-white px-5 py-3 rounded-md font-bold transition-colors w-full">
                                    Pridruži se
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
