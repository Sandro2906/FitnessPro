"use client";

import { motion } from "framer-motion";

export default function Blog() {
    const sports = [
        { name: "Košarka", duration: "10 godina", icon: "🏀", color: "from-orange-500 to-orange-700", delay: 0 },
        { name: "Teretana i Fitnes", duration: "10 godina", icon: "🏋️‍♂️", color: "from-brand-red to-red-900", delay: 0.1 },
        { name: "Kik-boks", duration: "2 godine", icon: "🥊", color: "from-yellow-500 to-yellow-700", delay: 0.2 },
        { name: "Fudbal", duration: "2 godine", icon: "⚽", color: "from-green-500 to-green-700", delay: 0.3 },
        { name: "Stoni tenis", duration: "1 godina", icon: "🏓", color: "from-blue-500 to-blue-700", delay: 0.4 },
        { name: "Tenis", duration: "1 godina", icon: "🎾", color: "from-lime-500 to-lime-700", delay: 0.5 }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <div className="flex-1 bg-brand-dark/50 py-20 px-6 relative z-10 overflow-hidden min-h-screen">

            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-block bg-brand-red/10 text-brand-red border border-brand-red/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
                        Biografija
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">
                        O <span className="text-brand-red">Meni</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                        Decenija discipline, znoja i nezaustavljivog napretka.
                    </p>
                </motion.header>

                {/* Moj Put Section */}
                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-black text-white uppercase mb-8 flex items-center gap-4">
                        <span className="w-12 h-1 bg-brand-red inline-block rounded-full"></span>
                        Moj Put i Iskustvo
                    </h2>
                    <div className="bg-brand-dark p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-brand-red/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-red/5 to-transparent blur-2xl rounded-full" />

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed relative z-10 font-light">
                            Strastveno treniram više od <strong className="text-white font-bold">10 godina</strong>, počevši u teretani pa sve do takmičarskih sportova.
                            Moje iskustvo predstavlja nemilosrdnu potragu za fizičkim savršenstvom, brzinom, agilnošću i sirovom snagom.
                            <span className="text-brand-red block mt-4 font-bold text-2xl">Ja ne samo da treniram druge; ja živim taj život.</span>
                        </p>
                    </div>
                </motion.section>

                {/* Sportska Pozadina - ANIMIRANI GRID */}
                <section className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl font-black text-center text-white uppercase mb-12 tracking-wide"
                    >
                        Sportska <span className="text-brand-red">Evolucija</span>
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {sports.map((sport, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-hidden group cursor-pointer shadow-xl hover:shadow-[0_10px_30px_rgba(229,9,20,0.15)] transition-all"
                            >
                                {/* Gradient Hover Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                                <div className="flex flex-col items-center justify-center text-center relative z-10">
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                        className="text-5xl mb-4 filter drop-shadow-md"
                                    >
                                        {sport.icon}
                                    </motion.div>
                                    <h3 className="text-white font-black text-xl mb-1 uppercase tracking-tight group-hover:text-brand-red transition-colors">
                                        {sport.name}
                                    </h3>
                                    <span className="bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider group-hover:bg-brand-red/20 group-hover:text-brand-red transition-colors">
                                        {sport.duration}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Način Života Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-transparent blur-xl rounded-3xl" />
                    <div className="bg-brand-dark/80 backdrop-blur-sm p-8 md:p-14 rounded-3xl border-l-8 border-brand-red shadow-2xl relative z-10">
                        <h2 className="text-4xl font-black text-white uppercase mb-8 tracking-tight">Način <span className="text-brand-red">Života</span></h2>
                        <div className="space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                            <p>
                                <strong className="text-white font-bold">Sport je život.</strong> Ali sam znoj neće izgraditi Rim. Prava transformacija dešava se na raskršću discipline u teretani i posvećenosti u kuhinji.
                            </p>
                            <p>
                                Kvalitetna osnova u ishrani daje vašem tijelu gorivo za izdržljivost tokom brutalnih treninga i oporavak potrganih mišićnih vlakana. Bez pravog goriva, i Ferrari je samo veoma skupa igračka.
                                Bilo da želite skinuti procenat masti ili dodati ozbiljnu mišićnu masu, vaši makro i mikro nutrijenti, kao i hidratacija, su ključevi uspjeha o kojima se često ne priča.
                            </p>

                            <motion.blockquote
                                whileHover={{ scale: 1.02, x: 10 }}
                                className="border-l-4 border-brand-red bg-brand-red/5 p-6 rounded-r-xl italic text-white font-medium text-xl shadow-inner my-8"
                            >
                                "Um odustaje mnogo prije tijela. Istreniraj svoj um, ispravno nahrani svoje tijelo, i postaćeš nezaustavljiv."
                            </motion.blockquote>

                            <p>
                                Prednosti pretvaranja ovog načina u vaš stil života daleko prevazilaze estetiku. To gradi mentalnu čvrstoću, reguliše vaš hormonski balans, poboljšava kognitivne funkcije i drastično smanjuje stres. To je investicija sa <strong className="text-brand-red font-bold">zagarantovanim povratom</strong>—sve dok plaćate cijenu u trudu i disciplini.
                            </p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
