import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export default async function ProgramDashboard({ params }: { params: { id: string } }) {
    const { id } = params;

    const cookieStore = await cookies();
    const authSession = cookieStore.get('auth_session');

    if (!authSession) {
        redirect('/login');
    }

    const sessionObj = JSON.parse(authSession.value);

    // Verify ownership
    const purchase = await prisma.purchase.findFirst({
        where: {
            userId: sessionObj.id,
            programId: id
        }
    });

    if (!purchase) {
        redirect('/programs'); // Not purchased
    }

    // Program Content Mapping (Simple Mock Content for the Dashboard)
    const programDetails: Record<string, any> = {
        'weight-loss': {
            title: "Protokol Mršavljenja",
            welcome: "Dobrodošli u vaš 12-nedeljni protokol mršavljenja!",
            materials: [
                { name: "Plan ishrane (PDF)", type: "pdf", link: "#" },
                { name: "Trening rutina - Mjesec 1", type: "pdf", link: "#" },
                { name: "Tabela praćenja napretka", type: "pdf", link: "#" },
            ],
            videos: [
                { title: "Kako započeti prvi dan", duration: "5:20" },
                { title: "Pravilna mehanika HIIT treninga", duration: "12:15" }
            ]
        },
        'muscle-growth': {
            title: "Plan za Hipertrofiju",
            welcome: "Dobrodošli u PPL program hipertrofije!",
            materials: [
                { name: "Kalorijski Suficit Vodič (PDF)", type: "pdf", link: "#" },
                { name: "Push/Pull/Legs Raspored", type: "pdf", link: "#" },
            ],
            videos: [
                { title: "Forma za Benč pres", duration: "8:45" },
                { title: "Mrtvo dizanje od nule", duration: "10:30" },
                { title: "Odmor i regeneracija", duration: "4:50" }
            ]
        },
        'conditioning': {
            title: "Elitna Kondicija",
            welcome: "Vrijeme je za ozbiljnu izdržljivost.",
            materials: [
                { name: "Pliometrijski vodič za početnike (PDF)", type: "pdf", link: "#" },
                { name: "Kreiranje poligona za sprint", type: "pdf", link: "#" }
            ],
            videos: [
                { title: "Vježbe agilnosti", duration: "15:00" }
            ]
        }
    };

    const currentProgram = programDetails[id];

    if (!currentProgram) {
        return <div className="text-white text-center mt-20 text-xl relative z-10">Program ne postoji.</div>;
    }

    return (
        <div className="flex-1 bg-transparent py-16 px-6 relative z-10 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-12">

                <header className="border-b border-gray-800 pb-8">
                    <div className="inline-block bg-brand-red/10 text-brand-red border border-brand-red/30 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                        Kupljeni Sadržaj
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                        {currentProgram.title}
                    </h1>
                    <p className="text-xl text-gray-400 font-light">
                        {currentProgram.welcome}
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Materijali */}
                    <div className="bg-brand-dark rounded-xl border border-gray-800 p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                            <span className="text-brand-red text-3xl">📥</span> Materijali
                        </h2>
                        <ul className="space-y-4">
                            {currentProgram.materials.map((mat: any, i: number) => (
                                <li key={i}>
                                    <a href={mat.link} className="flex items-center gap-4 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-brand-red p-4 rounded-lg transition-all text-gray-300 hover:text-white group">
                                        <div className="bg-brand-red/20 text-brand-red p-3 rounded-md group-hover:bg-brand-red group-hover:text-white transition-colors">
                                            📄
                                        </div>
                                        <span className="font-medium">{mat.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Video Tutorijali */}
                    <div className="bg-brand-dark rounded-xl border border-gray-800 p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                            <span className="text-brand-red text-3xl">▶️</span> Video Instrukcije
                        </h2>
                        <ul className="space-y-4">
                            {currentProgram.videos.map((vid: any, i: number) => (
                                <li key={i} className="flex items-center justify-between bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-500">
                                            {i + 1}
                                        </div>
                                        <span className="text-gray-300 font-medium">{vid.title}</span>
                                    </div>
                                    <span className="text-brand-red text-sm font-bold bg-brand-red/10 px-3 py-1 rounded-full">
                                        {vid.duration}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-brand-red/20 to-transparent border border-brand-red/30 rounded-xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Imate Pitanja?</h3>
                        <p className="text-gray-400">Naš tim Vam je dostupan 24/7 za podršku i praćenje vašeg napretka tokom ovog programa.</p>
                    </div>
                    <a href="mailto:support@fitpro.com" className="shrink-0 bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap">
                        Kontaktiraj Trenera
                    </a>
                </div>

            </div>
        </div>
    );
}
