"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetch('/api/user/profile')
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => {
                setUserData({
                    ...data,
                    password: '' // empty password field for updating
                });
                setLoading(false);
            })
            .catch(() => {
                router.push('/login');
            });
    }, [router]);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await fetch('/api/user/upload-avatar', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Greška pri uploadu slike');

            setUserData((prev: any) => ({ ...prev, avatarUrl: data.avatarUrl }));
            setMessage({ text: 'Slika uspješno ažurirana!', type: 'success' });
        } catch (err: any) {
            setMessage({ text: err.message, type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            // Don't send empty password
            const payload = { ...userData };
            if (!payload.password) delete payload.password;

            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setMessage({ text: 'Profil uspješno ažuriran!', type: 'success' });
            // Clear password field again
            setUserData((prev: any) => ({ ...prev, password: '' }));
        } catch (err: any) {
            setMessage({ text: err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/login', { method: 'DELETE' });
        window.location.href = '/login';
    };

    const handleDeleteAccount = async () => {
        if (!confirm('Da li ste sigurni da želite obrisati vaš nalog? Ova akcija je nepovratna i svi vaši podaci (uključujući sliku) će biti izbrisani.')) return;

        setSaving(true);
        try {
            const res = await fetch('/api/user/profile', { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Greška pri brisanju naloga');
            }
            window.location.href = '/register';
        } catch (err: any) {
            setMessage({ text: err.message, type: 'error' });
            setSaving(false);
        }
    };

    if (loading) return <div className="flex-1 flex items-center justify-center text-white relative z-10">Učitavanje...</div>;

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-transparent relative z-10">
            <div className="w-full max-w-2xl bg-black/60 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6">
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24 rounded-full border-2 border-brand-red overflow-hidden bg-gray-800 flex items-center justify-center shrink-0">
                            {userData?.avatarUrl ? (
                                <img src={userData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-500 font-bold text-2xl uppercase">
                                    {userData?.username?.substring(0, 2)}
                                </span>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-xs text-white">Slanje...</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h1 className="text-3xl font-black text-white">{userData?.name || userData?.username}</h1>
                            <p className="text-gray-400 mt-1">Uredi svoj profil</p>

                            <div className="mt-3 relative">
                                <label className="cursor-pointer text-xs md:text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 py-1.5 px-3 rounded-md transition-colors border border-gray-700 whitespace-nowrap inline-block">
                                    Promijeni Sliku
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 mt-2">
                        <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase">
                            Odjavi se
                        </button>
                        <button onClick={handleDeleteAccount} className="text-red-500/80 hover:text-red-500 transition-colors text-xs font-bold uppercase mt-1">
                            Obriši nalog
                        </button>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 text-center ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-green-500/10 text-green-500 border border-green-500/50'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Read Only Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Korisničko Ime (ne može se mijenjati)</label>
                            <input type="text" readOnly value={userData.username} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-500 cursor-not-allowed" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email (ne može se mijenjati)</label>
                            <input type="email" readOnly value={userData.email} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-500 cursor-not-allowed" />
                        </div>

                        {/* Editable Fields */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Ime i Prezime</label>
                            <input type="text" value={userData.name || ''} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Godine (računa se iz datuma rođenja)</label>
                            <input type="number" readOnly value={userData.age || ''} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-500 cursor-not-allowed" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Broj Telefona</label>
                            <input type="tel" value={userData.phone || ''} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nova Lozinka (ostavite prazno ako ne mijenjate)</label>
                            <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red" placeholder="Unesite novu lozinku" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={saving} className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            {saving ? 'Čuvanje...' : 'Sačuvaj Promjene'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
