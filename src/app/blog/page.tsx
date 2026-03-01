"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        {/* Slika Profila */}
                        <div className="md:col-span-5 relative">
                            <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full" />
                            <div className="relative rounded-3xl overflow-hidden border-2 border-brand-red/30 shadow-[0_0_40px_rgba(229,9,20,0.15)] aspect-[4/5] group">
                                <Image
                                    src="/sandro.png"
                                    alt="Sandro Gatarić"
                                    fill
                                    className="object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/40 to-transparent opacity-90" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg">Sandro Gatarić</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-brand-red font-bold text-lg uppercase tracking-widest bg-brand-red/10 px-3 py-1 rounded-full border border-brand-red/30">24 Godine</span>
                                        <span className="text-gray-300 font-medium text-sm border border-gray-600 px-3 py-1 rounded-full">Osnivač</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tekst Kolona */}
                        <div className="md:col-span-7 space-y-8">
                            <h2 className="text-4xl font-black text-white uppercase flex items-center gap-4">
                                <span className="w-12 h-1 bg-brand-red inline-block rounded-full"></span>
                                Moj Put i Iskustvo
                            </h2>
                            <div className="bg-brand-dark/50 p-8 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden group hover:border-brand-red/30 transition-colors backdrop-blur-sm">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-red/5 to-transparent blur-2xl rounded-full" />

                                <p className="text-lg text-gray-300 leading-relaxed relative z-10 font-light mb-6">
                                    Zovem se <strong className="text-white font-bold">Sandro Gatarić</strong> i strastveno treniram više od <strong className="text-base text-white font-bold bg-brand-red/20 px-2 py-0.5 rounded border border-brand-red/50">10+ godina</strong>. Počevši u teretani pa sve do različitih takmičarskih sportova, moje iskustvo predstavlja nemilosrdnu potragu za fizičkim savršenstvom, brzinom i snagom.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed relative z-10 font-light mb-8">
                                    Međutim, moj razvoj se ne zaustavlja na granicama teretane. Pored sporta, aktivno se bavim <strong className="text-white">Programiranjem</strong> i <strong className="text-white">Fotografijom</strong>. Ovaj spoj analitičkog razmišljanja i kreativnosti mi omogućava da drugačije pristupam rješavanju problema i dizajnu treninga.
                                </p>
                                <div className="border-l-4 border-brand-red pl-6 py-2">
                                    <p className="text-brand-red font-black text-xl md:text-2xl uppercase tracking-wide leading-tight">
                                        Ja ne samo da treniram druge;<br />ja živim taj život.
                                    </p>
                                </div>
                            </div>
                        </div>
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
