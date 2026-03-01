"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Client-side validation
        if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.dateOfBirth) {
            setError('Sva polja osim broja telefona su obavezna.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Greška pri registraciji');

            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-950">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-black text-white text-center mb-2">Napravi Nalog</h1>
                <p className="text-gray-400 text-center mb-8">Pridruži se našoj zajednici</p>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Ime i Prezime <span className="text-brand-red">*</span></label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="Unesite vaše pravo ime" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Korisničko Ime <span className="text-brand-red">*</span></label>
                        <input type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="Unesite korisničko ime" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-brand-red">*</span></label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="vaš@email.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Lozinka <span className="text-brand-red">*</span></label>
                        <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="••••••••" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Datum Rođenja <span className="text-brand-red">*</span></label>
                            <input type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Broj Telefona</label>
                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="Opcionalno" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 mt-4 rounded-lg transition-colors">
                        {loading ? 'Registracija...' : 'Registruj se'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Već imate nalog? <Link href="/login" className="text-brand-red hover:text-red-400 hover:underline">Prijavite se</Link>
                </p>
            </div>
        </div>
    );
}
