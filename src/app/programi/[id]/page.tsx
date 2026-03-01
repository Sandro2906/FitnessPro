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

    // Detaljan sadržaj programa baziran na korisničkim instrukcijama
    const programDetails: Record<string, any> = {
        'weight-loss': {
            title: "Protokol Mršavljenja",
            subtitle: "Fat Loss Program",
            welcome: "Naučno strukturiran program od 4 sedmice dizajniran da maksimizira sagorijevanje masti i poveća vašu kondiciju.",
            overview: {
                goals: ["Sagorijevanje masti", "Povećanje kondicije", "Početnici → Srednji nivo"],
                duration: "4 sedmice"
            },
            schedule: [
                { day: "Ponedjeljak", split: "Full Body" },
                { day: "Srijeda", split: "Cardio + Core" },
                { day: "Petak", split: "Full Body" },
                { day: "Subota", split: "Lagani cardio (šetnja)" }
            ],
            trainingExample: {
                name: "Primjer Trening Dana",
                warmup: ["Jumping jacks — 30s", "High knees — 30s", "Arm circles — 1 min", "Lagani čučnjevi"],
                mainTitle: "Glavni dio (3 kruga)",
                main: ["Squats — 15 ponavljanja", "Push ups — 10", "Mountain climbers — 30s", "Lunges — 12 po nozi", "Plank — 30s"],
                pause: "60s između krugova"
            },
            rules: ["Kalorijski deficit", "8k–10k koraka dnevno", "Voda: 2L+"],
            videoId: "pCETrXRdCEo"
        },
        'muscle-growth': {
            title: "Plan za Hipertrofiju",
            subtitle: "Muscle Growth",
            welcome: "Specijalizovan gym program koji kombinuje progresivno preopterećenje za drastično povećanje mišićne mase i snage.",
            overview: {
                goals: ["Rast mišića", "Snaga", "Gym program"],
                duration: "6 sedmica"
            },
            schedule: [
                { day: "Ponedjeljak", split: "Chest + Triceps" },
                { day: "Utorak", split: "Back + Biceps" },
                { day: "Četvrtak", split: "Legs" },
                { day: "Petak", split: "Shoulders + Core" }
            ],
            trainingExample: {
                name: "Primjer treninga (Chest Day)",
                warmup: [],
                mainTitle: "Glavni dio",
                main: ["Bench press — 4x8", "Incline dumbbell press — 3x10", "Chest fly — 3x12", "Triceps dips — 3x10", "Cable pushdown — 3x12"],
                pause: "60–90s pauza između serija"
            },
            rules: ["Protein: 1.6–2g/kg", "Progresivno povećavati težinu", "Spavanje 7–8h"],
            videoId: "K7jpo187U1I"
        },
        'conditioning': {
            title: "Elitna Kondicija",
            subtitle: "Elite Conditioning / HIIT",
            welcome: "Kratki i brutalni kardio treninzi visokog intenziteta za izgradnju stamine, atletske forme i neopisive eksplozivnosti.",
            overview: {
                goals: ["Eksplozivnost", "Stamina", "Atletska forma"],
                duration: "4 sedmice"
            },
            schedule: [
                { day: "Ponedjeljak", split: "HIIT" },
                { day: "Srijeda", split: "Core + Mobility" },
                { day: "Petak", split: "HIIT" },
                { day: "Nedjelja", split: "Aktivni oporavak" }
            ],
            trainingExample: {
                name: "HIIT Trening",
                warmup: [],
                mainTitle: "40s RAD / 20s ODMOR (4 runde)",
                main: ["Burpees", "Jump squats", "Push ups", "High knees", "Plank shoulder taps", "Bicycle crunch"],
                pause: "2 min pauza između rundi"
            },
            rules: ["Maksimalan intenzitet", "Ne više od 3 HIIT sedmično", "Istezanje obavezno"],
            videoId: "IbtcZQcswBE"
        }
    };

    const currentProgram = programDetails[id];

    if (!currentProgram) {
        return <div className="text-white text-center mt-20 text-xl relative z-10">Program ne postoji.</div>;
    }

    return (
        <div className="flex-1 bg-transparent py-16 px-6 relative z-10 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header sekcija */}
                <header className="border-b border-gray-800 pb-10 text-center md:text-left">
                    <div className="inline-block bg-brand-red/10 text-brand-red border border-brand-red/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                        ⭐ Ekskluzivni Sadržaj
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">
                        {currentProgram.title}
                    </h1>
                    <h2 className="text-2xl text-brand-red font-bold uppercase tracking-widest mb-6 opacity-80">
                        {currentProgram.subtitle}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
                        {currentProgram.welcome}
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Lijeva Kolona: Video i Trening (Zauzima 2 kolone) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* YouTube Video Premium Wrapper */}
                        <div className="bg-brand-dark rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                            <div className="absolute top-4 left-4 z-20 bg-brand-red text-white text-xs font-black px-4 py-2 rounded-md uppercase tracking-widest shadow-lg">
                                Video Instrukcije
                            </div>

                            {/* Proporcionalni YouTube Iframe Kontejner */}
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-[1.02]"
                                    src={`https://www.youtube.com/embed/${currentProgram.videoId}?rel=0&modestbranding=1&autohide=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Detalji o treningu */}
                        <div className="bg-gradient-to-br from-gray-900 to-brand-darker rounded-2xl border border-gray-800 p-8 md:p-10 shadow-xl overflow-hidden relative">
                            {/* Dekorativni bg element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                            <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-4 border-b border-gray-800 pb-4 relative z-10">
                                🏋️ {currentProgram.trainingExample.name}
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                {currentProgram.trainingExample.warmup.length > 0 && (
                                    <div className="bg-black/40 rounded-xl p-6 border border-gray-800/60">
                                        <h4 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">🔥 Zagrijavanje</h4>
                                        <ul className="space-y-3">
                                            {currentProgram.trainingExample.warmup.map((item: string, i: number) => (
                                                <li key={i} className="text-gray-300 font-medium flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-brand-red opacity-70"></span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className={`bg-black/40 rounded-xl p-6 border border-gray-800/60 ${currentProgram.trainingExample.warmup.length === 0 ? 'md:col-span-2' : ''}`}>
                                    <h4 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider flex items-center justify-between">
                                        <span>⚡ {currentProgram.trainingExample.mainTitle}</span>
                                        <span className="text-xs bg-brand-red/20 text-brand-red font-black px-3 py-1 rounded-full">{currentProgram.trainingExample.pause}</span>
                                    </h4>
                                    <ul className="space-y-4">
                                        {currentProgram.trainingExample.main.map((item: string, i: number) => {
                                            const [name, reps] = item.split('—');
                                            return (
                                                <li key={i} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800 hover:border-brand-red/50 transition-colors">
                                                    <span className="text-white font-bold">{name?.trim()}</span>
                                                    {reps && (
                                                        <span className="text-brand-red bg-brand-red/10 px-3 py-1 rounded text-sm font-bold">
                                                            {reps.trim()}
                                                        </span>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Desna Kolona: Informacije i Raspored (Zauzima 1 kolonu) */}
                    <div className="space-y-8">

                        {/* Pravila / Mentalitet */}
                        <div className="bg-brand-dark rounded-2xl border border-brand-red/30 p-8 shadow-xl relative overflow-hidden group hover:border-brand-red transition-colors duration-300">
                            <div className="absolute inset-0 bg-brand-red/[0.02] group-hover:bg-brand-red/[0.05] transition-colors" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3 relative z-10">
                                🧠 Zlatna Pravila
                            </h3>
                            <ul className="space-y-4 relative z-10">
                                {currentProgram.rules.map((rule: string, i: number) => (
                                    <li key={i} className="flex items-start text-gray-300 font-medium bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                                        <span className="text-brand-red text-xl mr-3 leading-none">✓</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sedmični Raspored */}
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-xl">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center justify-between">
                                <span>📆 Raspored</span>
                                <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">{currentProgram.overview.duration}</span>
                            </h3>
                            <div className="space-y-3">
                                {currentProgram.schedule.map((item: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                                        <span className="text-gray-400 font-medium text-sm">{item.day}</span>
                                        <span className="text-white font-bold text-right pl-4">{item.split}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ciljevi */}
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-xl">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                                🎯 Fokus Programa
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentProgram.overview.goals.map((goal: string, i: number) => (
                                    <span key={i} className="bg-brand-dark border border-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-full">
                                        {goal}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sekcija za Podršku */}
                <div className="bg-gradient-to-r from-brand-dark to-brand-darker border border-brand-red/20 rounded-2xl p-8 md:p-12 mt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/10 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">Spremni za transformaciju?</h3>
                        <p className="text-lg text-gray-400 font-medium">Ukoliko imate nedoumica tokom izvođenja vježbi, naš tim eksperata Vam stoji na raspolaganju.</p>
                    </div>
                    <a href="mailto:support@fitpro.com" className="relative z-10 shrink-0 bg-brand-red hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                        Zatraži Pomoć
                    </a>
                </div>

            </div>
        </div>
    );
}
