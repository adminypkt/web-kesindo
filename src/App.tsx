import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, MessageCircle, ArrowUp, ArrowRight, ChevronLeft, ChevronRight, Users, BookOpen, Award, Globe, GraduationCap, Smartphone, HeartHandshake, Target, Quote, Phone, Mail, MapPin, Send, Shield, Eye, HandHelping, CreditCard, QrCode, AlertTriangle, Briefcase, Church, Building2, Crown, BookOpenCheck, BookHeart, UsersRound } from 'lucide-react';
import { useI18n } from './i18n';

function useScrollAnim(th=0.15){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el);}},{threshold:th});o.observe(el);return()=>o.disconnect();},[th]);return{ref,isVisible:v};}
function useCountUp(end:number,dur=2000,start=false){const[c,setC]=useState(0);useEffect(()=>{if(!start)return;let st:number,af:number;const step=(ts:number)=>{if(!st)st=ts;const p=Math.min((ts-st)/dur,1);setC(Math.floor(p*end));if(p<1)af=requestAnimationFrame(step);};af=requestAnimationFrame(step);return()=>cancelAnimationFrame(af);},[end,dur,start]);return c;}

function ScrollToTop(){const{pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0);},[pathname]);return null;}

function Lightbox({src,onClose}:{src:string;onClose:()=>void}){
  useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};document.addEventListener('keydown',fn);return()=>document.removeEventListener('keydown',fn);},[onClose]);
  return(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}><img src={src} alt="" className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain" onClick={e=>e.stopPropagation()}/><button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"><X className="w-6 h-6"/></button></div>);
}

const navKeys=['home','about','programs','projects','partners','testimonials','donate','contact'] as const;
const navPaths=['/','/about','/programs','/projects','/partners','/testimonials','/donate','/contact'];

function Header(){
  const{lang,setLang,t}=useI18n();
  const[scrolled,setScrolled]=useState(false);
  const[mob,setMob]=useState(false);
  const loc=useLocation();
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[]);
  useEffect(()=>setMob(false),[loc.pathname]);
  return(
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled||mob?'bg-primary-800/95 backdrop-blur-md shadow-lg':'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="KESINDO" className="h-12 md:h-14 w-auto group-hover:scale-105 transition-transform"/>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {navKeys.map((k,i)=><Link key={k} to={navPaths[i]} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${k==='donate'?'bg-accent-500 text-primary-800 hover:bg-accent-400 ml-2 font-semibold':loc.pathname===navPaths[i]?'text-accent-400':'text-white/80 hover:text-white hover:bg-white/10'}`}>{t(`nav.${k}`)}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={()=>setLang(lang==='id'?'en':'id')} className="text-xs font-semibold text-white/70 hover:text-white border border-white/20 rounded-full px-3 py-1 transition-colors">{lang==='id'?'EN':'ID'}</button>
          <button onClick={()=>setMob(!mob)} className="lg:hidden text-white p-1" aria-label="Menu">{mob?<X className="w-6 h-6"/>:<Menu className="w-6 h-6"/>}</button>
        </div>
      </div></div>
      {mob&&<div className="lg:hidden bg-primary-800/95 backdrop-blur-md border-t border-white/10"><nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
        {navKeys.map((k,i)=><Link key={k} to={navPaths[i]} className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${k==='donate'?'bg-accent-500 text-primary-800 text-center font-semibold mt-2':loc.pathname===navPaths[i]?'text-accent-400 bg-white/5':'text-white/80 hover:text-white hover:bg-white/10'}`}>{t(`nav.${k}`)}</Link>)}
      </nav></div>}
    </header>
  );
}

function Footer(){
  const{t,lang}=useI18n();const yr=new Date().getFullYear();
  return(
    <footer className="bg-primary-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-4"><img src="/logo.jpg" alt="KESINDO" className="h-14 w-auto"/></div>
            <p className="text-sm leading-relaxed mb-6">Yayasan Pengembangan Komunitas Terpadu - Membangun Komunitas Mandiri & Sejahtera.</p>
            <p className="text-white font-medium text-sm mb-2">{t('ft.nl')}</p>
            <div className="flex"><input type="email" placeholder={t('ft.nl.ph')} className="flex-1 bg-white/10 border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent-500"/><button className="bg-accent-500 text-primary-800 font-semibold text-sm px-4 rounded-r-lg hover:bg-accent-400 transition-colors">{t('ft.nl.btn')}</button></div>
          </div>
          <div><h4 className="text-white font-heading font-semibold mb-4">{t('ft.quick')}</h4><ul className="space-y-2 text-sm">{[{l:t('nav.home'),to:'/'},{l:t('nav.about'),to:'/about'},{l:t('nav.programs'),to:'/programs'},{l:t('nav.projects'),to:'/projects'},{l:t('nav.testimonials'),to:'/testimonials'}].map(x=><li key={x.to}><Link to={x.to} className="hover:text-accent-400 transition-colors">{x.l}</Link></li>)}</ul></div>
          <div><h4 className="text-white font-heading font-semibold mb-4">{t('ft.contact')}</h4><ul className="space-y-3 text-sm">{lang==='id'?<><li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>+62 888-0895-7173 (Farida)</span></li><li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>+62 812-9180-8260 (Melasari)</span></li><li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>yayasankesindo@gmail.com</span></li><li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>Taman Ubud Cempaka Selatan III No.15, Lippo Village, Binong, Curug, Kab. Tangerang, Banten 15810</span></li></>:<><li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>+62 813-1173-3430 (Rebecca)</span></li><li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>rkistap0211@gmail.com</span></li><li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent-500 shrink-0"/><span>Taman Ubud Cempaka Selatan III No.15, Lippo Village, Tangerang, Banten 15810</span></li></>}</ul></div>
          <div><h4 className="text-white font-heading font-semibold mb-4">{t('ft.don')}</h4><div className="space-y-3 text-sm"><div className="bg-white/5 rounded-lg p-3"><p className="text-white font-medium text-xs mb-1">CIMB Niaga</p><p className="text-accent-400 font-mono">800.08.2811.2.00</p><p className="text-[11px] mt-1">a.n. Yayasan Pengembangan Komunitas Terpadu</p></div><div className="bg-white/5 rounded-lg p-3"><p className="text-white font-medium text-xs mb-1">Bank Central Asia (BCA)</p><p className="text-accent-400 font-mono">8840339875</p><p className="text-[11px] mt-1">a.n. Sri Melasari Sadeli</p></div></div></div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs"><p>&copy; {yr} {lang==='id'?'YPKT KESINDO':'Holistic Community Development Foundation (HCDF)'}. {t('ft.rights')}.</p></div>
      </div>
    </footer>
  );
}

function Floating(){
  const[show,setShow]=useState(false);
  useEffect(()=>{const fn=()=>setShow(window.scrollY>500);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[]);
  return(
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {show&&<button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="w-12 h-12 bg-primary-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-all hover:scale-110" aria-label="Top"><ArrowUp className="w-5 h-5"/></button>}
      <a href="https://wa.me/6281291808260" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 animate-pulse-slow" aria-label="WhatsApp"><MessageCircle className="w-6 h-6"/></a>
    </div>
  );
}

function PageBanner({title,subtitle}:{title:string;subtitle:string}){
  const a=useScrollAnim(0.05);
  return(
    <section className="relative pt-32 pb-20 bg-primary-800">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"/>
      <div ref={a.ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${a.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">{title}</h1>
        <p className="text-white/60 max-w-xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}

const heroImgs=['https://i.imgur.com/S9cKy8v.jpeg','https://i.imgur.com/AA2qyQj.jpeg','https://i.imgur.com/4UbieJH.jpeg'];
const heroCaptions=[{id:'Pelatihan Pertanian di STT Samarinda, Kalimantan Timur',en:'Agriculture training at Samarinda Theological Seminary, East Kalimantan.'},{id:'Skill Training Kaum Ibu Komunitas Pemulung di Jakarta Utara',en:'Skill training for women at scavenger community, North Jakarta.'},{id:'Pelatihan Wiraswasta di Gereja Baptis Sragen',en:'Entrepreneurship training at Baptis Church, Saragen, Central Java.'}];
const slides=[{tk:'hero.s1.t',ck:'hero.s1.c',link:'/donate'},{tk:'hero.s2.t',ck:'hero.s2.c',link:'/programs'},{tk:'hero.s3.t',ck:'hero.s3.c',link:'/contact'}];
const pKeys=['tot','bel','cou','hol'];
const pIcons=[GraduationCap,Smartphone,HeartHandshake,Target];

const testData=[
  {name:'Simeon Soge',role:'Peserta BELAWA',text:{id:'Program BELAWA banyak membukakan pemikiran saya. Di pedalaman sangat dibutuhkan orang-orang yang mau berjuang untuk desanya. Kami bersyukur boleh menjadi salah satu diantaranya.',en:'The BELAWA program greatly opened my mind. The remote areas desperately need people willing to fight for their villages. We are grateful to be among them.'}},
  {name:'Ibu Monika Dorli Siagian',role:'Peserta Konseling',text:{id:'Saya bersyukur mengenal YPKT-KESINDO, yang selalu membuka seminar konseling, mulai Angkatan 1 di bulan Juli 2023 hingga saat ini. Materi yang diberikan sangat bermanfaat untuk membekali para konselor awam, orang tua, guru, hamba Tuhan, dll.',en:'I am grateful to know Holistic Community Development Foundation (HCDF), which has consistently held counseling seminars, starting with the first batch in July 2023 and continuing to this day. The material provided is very beneficial for lay counselors, parents, teachers, servants of God, and others.'}},
  {name:'Ibu Elsye',role:'Penerima Manfaat',text:{id:'Saya bersyukur dapat mengenal Yayasan Pengembangan Komunitas Terpadu - KESINDO. Tim YPKT KESINDO pernah datang mengunjungi kami dan memberikan pelatihan-pelatihan kepada komunitas pemuda dan ibu-ibu di Pulau Seram-Maluku.',en:'I am grateful to have met Holistic Community Development Foundation (HCDF). The team has visited us and provided training for the youth and women\'s communities on Seram Island, Moluccas.'}},
  {name:'Ibu Neneng Maria',role:'Donatur',text:{id:'Saya mengenal Pendiri dari YPKT KESINDO sudah cukup lama sekitar 40 Tahun. Saya tahu bagaimana perjuangan dalam pelayanan yang mereka lakukan. Sebagai ibu rumah tangga saya terus menopang dalam doa dan juga mendukung kegiatan yang dilakukan oleh YPKT KESINDO. Saya tidak ragu akan integritas dan kecintaan mereka dalam melayani pekerjaan Tuhan.',en:'I\'ve known the founders of Holistic Community Development Foundation (HCDF) for about 40 years. I know the struggles in the ministry they carry out. As a housewife, I continue to support them in prayer and also support the activities carried out by HCDF. I have no doubts about their integrity and love in serving God\'s work.'}},
];

const newsData=[
  {slug:'skill-training-jakarta-utara',img:'/berita1.jpg',title:{id:'Skill Training Kaum Ibu Komunitas Pemulung di Jakarta Utara',en:'Skill Training for Women in Scavenger Community, North Jakarta'},date:'2024-08-15',excerpt:{id:'YPKT KESINDO memberikan pelatihan keterampilan menjahit dan kerajinan tangan kepada kaum ibu di komunitas pemulung Jakarta Utara untuk meningkatkan kemandirian ekonomi keluarga.',en:'Holistic Community Development Foundation (HCDF) provided sewing and handicraft skill training to women in the scavenger community of North Jakarta to improve family economic independence.'},body:{id:'YPKT KESINDO mengadakan program Skill Training untuk kaum ibu di komunitas pemulung di Jakarta Utara. Pelatihan ini berfokus pada keterampilan menjahit dan kerajinan tangan yang dapat digunakan untuk meningkatkan pendapatan keluarga.\n\nProgram ini diikuti oleh puluhan ibu-ibu yang antusias belajar keterampilan baru. Para peserta diajarkan teknik dasar menjahit, membuat kerajinan tangan dari bahan daur ulang, dan strategi pemasaran produk.\n\nTujuan utama program ini adalah memberdayakan kaum ibu agar memiliki kemandirian ekonomi dan dapat berkontribusi pada kesejahteraan keluarga mereka. Dengan keterampilan yang diperoleh, mereka diharapkan dapat membuka usaha kecil atau menerima pesanan jahitan dari masyarakat sekitar.\n\nYPKT KESINDO berkomitmen untuk terus mendampingi peserta pelatihan hingga mereka mampu mandiri secara ekonomi.',en:'Holistic Community Development Foundation (HCDF) organized a Skill Training program for women in the scavenger community in North Jakarta. This training focused on sewing and handicraft skills that can be used to increase family income.\n\nThe program was attended by dozens of enthusiastic mothers learning new skills. Participants were taught basic sewing techniques, making handicrafts from recycled materials, and product marketing strategies.\n\nThe main goal of this program is to empower women to achieve economic independence and contribute to the welfare of their families. With the skills acquired, they are expected to open small businesses or receive sewing orders from the surrounding community.\n\nHCDF is committed to continuing to accompany training participants until they are economically independent.'}},
  {slug:'pengembangan-kesehatan-anak',img:'/berita2.jpg',title:{id:'Pengembangan Kesehatan Anak di Jakarta Utara',en:'CHE for Children in North Jakarta'},date:'2024-06-20',excerpt:{id:'Program pengembangan kesehatan anak yang dilaksanakan di komunitas Jakarta Utara melibatkan kegiatan edukatif dan pemeriksaan kesehatan bagi anak-anak.',en:'A child health development program conducted in the North Jakarta community involves educational activities and health check-ups for children.'},body:{id:'YPKT KESINDO melaksanakan program pengembangan kesehatan anak di komunitas Jakarta Utara. Program ini bertujuan untuk meningkatkan kesadaran akan pentingnya kesehatan anak sejak dini.\n\nKegiatan yang dilaksanakan meliputi pemeriksaan kesehatan dasar, penyuluhan gizi, dan kegiatan edukatif yang menyenangkan bagi anak-anak. Para relawan dan tenaga kesehatan bekerja sama untuk memberikan pelayanan terbaik.\n\nAnak-anak sangat antusias mengikuti berbagai kegiatan yang disediakan, mulai dari permainan edukatif hingga pemeriksaan kesehatan. Orang tua juga diberikan edukasi tentang pola makan sehat dan pentingnya imunisasi.\n\nProgram ini merupakan bagian dari komitmen YPKT KESINDO dalam membangun generasi yang sehat dan berdaya.',en:'Holistic Community Development Foundation (HCDF) carried out a child health development program in the North Jakarta community. This program aims to raise awareness of the importance of child health from an early age.\n\nActivities carried out include basic health check-ups, nutrition education, and fun educational activities for children. Volunteers and health workers collaborate to provide the best service.\n\nChildren were very enthusiastic about participating in various activities provided, from educational games to health check-ups. Parents were also given education about healthy eating patterns and the importance of immunization.\n\nThis program is part of HCDF\'s commitment to building a healthy and empowered generation.'}},
  {slug:'penyuluhan-komunitas-surabaya',img:'/berita3.jpg',title:{id:'Penyuluhan Komunitas di bawah Tol daerah Surabaya',en:'Community Outreach Under the Toll Road Area in Surabaya'},date:'2024-04-10',excerpt:{id:'YPKT KESINDO melakukan penyuluhan dan pendampingan bagi komunitas yang tinggal di bawah jalan tol daerah Surabaya untuk meningkatkan kualitas hidup mereka.',en:'Holistic Community Development Foundation (HCDF) conducted outreach and mentoring for communities living under the toll road area in Surabaya to improve their quality of life.'},body:{id:'YPKT KESINDO melakukan penyuluhan komunitas di bawah jalan tol daerah Surabaya. Kegiatan ini merupakan wujud kepedulian terhadap masyarakat marginal yang membutuhkan perhatian dan dukungan.\n\nPenyuluhan yang diberikan mencakup berbagai aspek kehidupan, mulai dari kesehatan, pendidikan, hingga pengembangan keterampilan. Tim YPKT KESINDO hadir langsung di lokasi untuk memberikan materi dan berdiskusi dengan warga.\n\nMasyarakat yang tinggal di bawah tol sangat antusias menyambut kehadiran tim. Mereka merasa tersentuh dengan perhatian yang diberikan dan berharap program ini dapat berlanjut.\n\nYPKT KESINDO berkomitmen untuk terus menjangkau komunitas-komunitas yang terpinggirkan dan memberikan dampak nyata bagi kehidupan mereka.',en:'Holistic Community Development Foundation (HCDF) conducted community outreach under the toll road area in Surabaya. This activity is a form of concern for marginalized communities that need attention and support.\n\nThe outreach provided covers various aspects of life, from health, education, to skill development. The HCDF team was present directly at the location to deliver material and discuss with residents.\n\nThe community living under the toll road was very enthusiastic in welcoming the team. They felt touched by the attention given and hope this program can continue.\n\nHCDF is committed to continuing to reach out to marginalized communities and making a real impact on their lives.'}},
];

function HomePage(){
  const{t,lang}=useI18n();
  const[cs,setCs]=useState(0);
  const[ti,setTi]=useState(0);
  const next=useCallback(()=>setCs(s=>(s+1)%3),[]);
  const prev=useCallback(()=>setCs(s=>(s-1+3)%3),[]);
  useEffect(()=>{const i=setInterval(next,6000);return()=>clearInterval(i);},[next]);
  useEffect(()=>{const i=setInterval(()=>setTi(x=>(x+1)%testData.length),5000);return()=>clearInterval(i);},[]);
  const aboutA=useScrollAnim();const impA=useScrollAnim();const progA=useScrollAnim();const testA=useScrollAnim();const donA=useScrollAnim();const newsA=useScrollAnim();
  const c1=useCountUp(4583,2500,impA.isVisible);const c2=useCountUp(41,2000,impA.isVisible);const c3=useCountUp(21,2000,impA.isVisible);
  return(
    <main>
      <section className="relative h-screen overflow-hidden">
        {heroImgs.map((img,i)=><div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i===cs?'opacity-100':'opacity-0'}`}><div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{backgroundImage:`url(${img})`}}/></div>)}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-800/50 to-primary-900/80"/>
        <div className="relative z-10 h-full flex items-center justify-center px-4"><div className="text-center max-w-4xl">
          {slides.map((s,i)=><div key={i} className={`transition-all duration-700 ${i===cs?'opacity-100 translate-y-0':'opacity-0 translate-y-8 absolute inset-0 flex items-center justify-center pointer-events-none'}`}>{i===cs&&<><h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8">{t(s.tk)}</h1><Link to={s.link} className="inline-flex items-center gap-2 bg-accent-500 text-primary-800 font-semibold px-8 py-4 rounded-full text-lg hover:bg-accent-400 transition-all hover:scale-105 shadow-xl">{t(s.ck)}<ArrowRight className="w-5 h-5"/></Link></>}</div>)}
          <div className="flex justify-center gap-3 mt-12">{slides.map((_,i)=><button key={i} onClick={()=>setCs(i)} className={`w-3 h-3 rounded-full transition-all ${i===cs?'bg-accent-500 w-8':'bg-white/40 hover:bg-white/60'}`} aria-label={`Slide ${i+1}`}/>)}</div>
        </div></div>
        <div className="absolute bottom-6 left-0 right-0 z-10 text-center"><p className="inline-block bg-black/50 backdrop-blur-sm text-white/90 text-xs sm:text-sm px-4 py-2 rounded-full transition-opacity duration-700">{heroCaptions[cs][lang]}</p></div>
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20" aria-label="Prev"><ChevronLeft className="w-6 h-6"/></button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20" aria-label="Next"><ChevronRight className="w-6 h-6"/></button>
      </section>

      <section ref={aboutA.ref} className="py-20 lg:py-28 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${aboutA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}><div className="grid lg:grid-cols-2 gap-12 items-center">
        <div><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('about.pre.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3 mb-6">{lang==='id'?'YPKT KESINDO':'Holistic Community Development Foundation (HCDF)'}</h2><p className="text-gray-600 leading-relaxed text-lg mb-8 text-justify">{t('about.pre.p')}</p><Link to="/about" className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group">{t('about.pre.c')}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></Link></div>
        <div className="relative"><img src="/about_us.jpg" alt="Tim YPKT KESINDO" className="rounded-2xl shadow-xl w-full h-80 lg:h-96 object-cover" loading="lazy"/><div className="absolute -bottom-6 -left-6 bg-accent-500 text-primary-800 rounded-xl p-5 shadow-lg"><p className="text-3xl font-heading font-bold">21+</p><p className="text-sm font-medium">{t('imp.year')}</p></div></div>
      </div></div></section>

      <section ref={impA.ref} className="relative py-20 bg-fixed bg-cover bg-center" style={{backgroundImage:'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920)'}}>
        <div className="absolute inset-0 bg-primary-900/85"/>
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${impA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}><div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[{icon:Users,count:`${c1.toLocaleString()}+`,label:t('imp.part')},{icon:BookOpen,count:`${c2}+`,label:t('imp.prog')},{icon:Award,count:`${c3}+`,label:t('imp.year')},{icon:Globe,count:lang==='id'?'33 Propinsi':'33 Provinces',label:t('imp.reach')}].map((it,i)=><div key={i} className="group"><it.icon className="w-10 h-10 text-accent-500 mx-auto mb-3 group-hover:scale-110 transition-transform"/><p className="text-3xl sm:text-4xl font-heading font-bold text-white mb-1">{it.count}</p><p className="text-white/60 text-sm">{it.label}</p></div>)}
        </div></div>
      </section>

      <section ref={progA.ref} className="py-20 lg:py-28 bg-gray-50"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${progA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('prog.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('prog.t')}</h2><p className="text-gray-500 mt-4 max-w-2xl mx-auto">{t('prog.sub')}</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{pKeys.map((k,i)=>{const Ic=pIcons[i];return(
          <Link key={k} to="/programs" className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-14 h-14 bg-accent-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent-500 transition-colors"><Ic className="w-7 h-7 text-accent-600 group-hover:text-primary-800 transition-colors"/></div>
            <h3 className="font-heading font-semibold text-primary-800 text-lg mb-3">{t(`prog.${k}.t`)}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{t(`prog.${k}.d`)}</p>
            <span className="text-accent-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">{t('prog.more')}<ArrowRight className="w-3.5 h-3.5"/></span>
          </Link>);})}</div>
      </div></section>

      <section ref={testA.ref} className="py-20 lg:py-28 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${testA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('test.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('test.t')}</h2><p className="text-gray-500 mt-4">{t('test.sub')}</p></div>
        <div className="max-w-3xl mx-auto relative"><Quote className="w-16 h-16 text-accent-500/20 absolute -top-4 -left-4"/>
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 min-h-[220px] flex flex-col justify-center">{testData.map((td,i)=><div key={i} className={`transition-all duration-500 ${i===ti?'opacity-100':'opacity-0 absolute'}`}>{i===ti&&<><p className="text-gray-700 text-lg leading-relaxed italic mb-6">"{td.text[lang]}"</p><div><p className="font-heading font-semibold text-primary-800">{td.name}</p><p className="text-gray-500 text-sm">{td.role}</p></div></>}</div>)}</div>
          <div className="flex justify-center gap-2 mt-6">{testData.map((_,i)=><button key={i} onClick={()=>setTi(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i===ti?'bg-accent-500 w-6':'bg-gray-300 hover:bg-gray-400'}`} aria-label={`T${i+1}`}/>)}</div>
        </div>
      </div></section>

      <section ref={donA.ref} className="relative py-24 bg-fixed bg-cover bg-center" style={{backgroundImage:'url(https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1920)'}}>
        <div className="absolute inset-0 bg-primary-900/80"/><div className={`relative z-10 max-w-3xl mx-auto px-4 text-center transition-all duration-700 ${donA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-6">{t('don.cta.t')}</h2><p className="text-white/70 text-lg mb-10">{t('don.cta.s')}</p>
          <Link to="/donate" className="inline-flex items-center gap-2 bg-accent-500 text-primary-800 font-bold px-10 py-4 rounded-full text-lg hover:bg-accent-400 transition-all hover:scale-105 shadow-xl">{t('don.cta.b')}<ArrowRight className="w-5 h-5"/></Link>
        </div>
      </section>

      <section ref={newsA.ref} className="py-20 lg:py-28 bg-gray-50"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${newsA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('news.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('news.t')}</h2><p className="text-gray-500 mt-4">{t('news.sub')}</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{newsData.map((n,i)=><article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full"><div className="overflow-hidden h-48"><img src={n.img} alt={n.title[lang]} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div><div className="p-6"><time className="text-xs text-gray-400">{n.date}</time><h3 className="font-heading font-semibold text-primary-800 mt-2 mb-2">{n.title[lang]}</h3><p className="text-gray-500 text-sm leading-relaxed">{n.excerpt[lang]}</p></div></article>)}</div>
      </div></section>
    </main>
  );
}

const timeline=[
  {year:'2005 – 2007',title:{id:'Kantor di Sawangan, Depok',en:'Office in Sawangan, Depok'},desc:{id:'Kesindo berkantor di Perumahan Reni Jaya Sawangan, Depok.',en:'KESINDO office at Reni Jaya Residence, Sawangan, Depok.'},imgs:[]},
  {year:'2007 – 2015',title:{id:'Kantor di Yogyakarta',en:'Office in Yogyakarta'},desc:{id:'Kesindo berkantor di Perum. Duta Wacana, Jalan Jambon No 1, Yogyakarta.',en:'KESINDO office at Duta Wacana Residence, Jalan Jambon No 1, Yogyakarta.'},imgs:['https://i.imgur.com/F8udmg2.jpeg','https://i.imgur.com/rr3KlmL.jpeg']},
  {year:'2016 – 2018',title:{id:'Kantor di Lippo Village',en:'Office in Lippo Village'},desc:{id:'Berkantor di Taman Ubud Cempaka Selatan III No.15, Lippo Village, Karawaci, Tangerang, Banten 15810.',en:'Office at Taman Ubud Cempaka Selatan III No.15, Lippo Village, Karawaci, Tangerang, Banten 15810.'},imgs:['https://i.imgur.com/xdoQT7K.jpeg','https://i.imgur.com/r2cgY4g.jpeg']},
  {year:'2019 – 2021',title:{id:'Kantor di Cikokol',en:'Office in Cikokol'},desc:{id:'Berkantor di Cikokol. Rukan Mahkota Mas Blok M 1/7, Tangerang.',en:'Office at Cikokol. Rukan Mahkota Mas Blok M 1/7, Tangerang.'},imgs:['https://i.imgur.com/nyNdq1w.jpeg']},
  {year:'2022 – Sekarang',title:{id:'Kantor di Lippo Village',en:'Office in Lippo Village'},desc:{id:'Berkantor di Taman Ubud Cempaka Selatan III No.15, Lippo Village, Karawaci, Tangerang, Banten 15810.',en:'Office at Taman Ubud Cempaka Selatan III No.15, Lippo Village, Karawaci, Tangerang, Banten 15810.'},imgs:['https://i.imgur.com/ZwcWRyO.jpeg','https://i.imgur.com/kii7OAs.jpeg','https://i.imgur.com/MJwF7h7.jpeg']},
];
const teamData=[
  {name:{id:'Sri Melasari, S.PAK., M.Th.',en:'Sri Melasari'},role:{id:'Pendiri dan Ketua Pengurus',en:'Founder & Chairperson'},img:'/01-bumela.jpg'},
  {name:{id:'Rebecca Kistap, S.Th., M.Th.',en:'Rebecca Kistap'},role:{id:'Pendiri, HRD dan Pelatih (Fasilitator)',en:'Founder, HRD & Trainer (Facilitator)'},img:'/02-burebecca.jpg'},
  {name:{id:'Awang Dwicahyo, S.T.',en:'Awang Dwicahyo'},role:{id:'Pengawas, Pelatih (Fasilitator)',en:'Supervisor & Trainer (Facilitator)'},img:'/03-awang.jpg'},
  {name:{id:'Farida Panjaitan, S.Pd.',en:'Farida Panjaitan'},role:{id:'Administrasi dan Keuangan',en:'Administration & Finance'},img:'/03-farida.jpg'},
];
const valuesData=[{icon:Heart,key:'love',color:'bg-rose-50 text-rose-500'},{icon:Shield,key:'int',color:'bg-blue-50 text-blue-500'},{icon:Eye,key:'trs',color:'bg-emerald-50 text-emerald-500'},{icon:HandHelping,key:'srv',color:'bg-amber-50 text-amber-600'}];

function AboutPage(){
  const{t,lang}=useI18n();const hA=useScrollAnim();const vA=useScrollAnim();const vaA=useScrollAnim();const tA=useScrollAnim();
  const[lbImg,setLbImg]=useState<string|null>(null);
  return(<main>
    {lbImg&&<Lightbox src={lbImg} onClose={()=>setLbImg(null)}/>}
    <PageBanner title={t('abt.page.t')} subtitle="Yayasan Pengembangan Komunitas Terpadu (YPKT) Keluarga Sejahtera Indonesia (KESINDO)"/>
    <section ref={hA.ref} className="py-20 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${hA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="max-w-4xl mx-auto mb-16"><div className="text-center mb-8"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('abt.hist.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('abt.hist.t')}</h2></div><div className="space-y-4">{t('abt.hist.p').split('|').map((p,i)=><p key={i} className="text-gray-600 leading-relaxed text-lg text-justify">{p}</p>)}</div></div>
      <div className="relative max-w-3xl mx-auto"><div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"/>
        {timeline.map((item,i)=><div key={i} className={`relative flex items-start gap-6 mb-10 md:mb-0 md:py-8 ${i%2===0?'md:flex-row':'md:flex-row-reverse'}`}><div className={`flex-1 ${i%2===0?'md:text-right':'md:text-left'}`}><div className="bg-gray-50 rounded-xl p-6 shadow-sm"><span className="text-accent-500 font-heading font-bold text-xl">{item.year}</span><h3 className="font-heading font-semibold text-primary-800 mt-1 mb-2">{item.title[lang]}</h3><p className="text-gray-500 text-sm">{item.desc[lang]}</p>{item.imgs&&item.imgs.length>0&&<div className="flex gap-2 mt-3 flex-wrap justify-start">{item.imgs.map((img,j)=><img key={j} src={img} alt="" className="w-32 h-24 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={()=>setLbImg(img)}/>)}</div>}</div></div><div className="hidden md:flex items-center justify-center w-4 h-4 bg-accent-500 rounded-full ring-4 ring-white shrink-0 mt-8"/><div className="flex-1 hidden md:block"/></div>)}
      </div>
    </div></section>
    <section ref={vA.ref} className="py-20 bg-gray-50"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${vA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}><div className="max-w-4xl mx-auto">
      <div className="text-center mb-12"><blockquote className="text-2xl sm:text-3xl font-heading font-bold text-primary-800 italic">"{t('abt.motto')}"</blockquote></div>
      <div className="space-y-8"><div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><h3 className="font-heading font-bold text-primary-800 text-xl mb-4">{t('abt.vis.t')}</h3><p className="text-gray-600 leading-relaxed text-lg">{t('abt.vis.p')}</p></div><div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><h3 className="font-heading font-bold text-primary-800 text-xl mb-5">{t('abt.mis.t')}</h3><ol className="text-gray-600 leading-relaxed space-y-4">{t('abt.mis.p').split('|').map((m,i)=><li key={i} className="flex items-start gap-3"><span className="w-7 h-7 bg-accent-500 text-primary-800 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{i+1}</span><span className="text-justify">{m}</span></li>)}</ol></div></div>
    </div></div></section>
    <section ref={vaA.ref} className="py-20 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${vaA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('abt.val.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('abt.val.t')}</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">{valuesData.map(({icon:Ic,key,color})=><div key={key} className="text-center group"><div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}><Ic className="w-8 h-8"/></div><h3 className="font-heading font-semibold text-primary-800 mb-2">{t(`abt.val.${key}`)}</h3><p className="text-gray-500 text-sm">{t(`abt.val.${key}.d`)}</p></div>)}</div>
    </div></section>
    <section ref={tA.ref} className="py-20 bg-gray-50"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${tA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('abt.team.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('abt.team.t')}</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">{teamData.map(m=><div key={m.name.en} className="text-center group"><div className="w-36 h-36 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md"><img src={m.img} alt={m.name[lang]} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"/></div><h3 className="font-heading font-semibold text-primary-800">{m.name[lang]}</h3><p className="text-gray-500 text-sm">{m.role[lang]}</p></div>)}</div>
    </div></section>
  </main>);
}

const progFull:{key:string;icon:any;color:string;imgs:string[];video?:string}[]=[
  {key:'tot',icon:GraduationCap,color:'bg-blue-50 text-blue-600',imgs:['https://i.imgur.com/1lFi0W3.png']},
  {key:'bel',icon:Smartphone,color:'bg-green-50 text-green-600',imgs:['https://i.imgur.com/OPYzr7v.jpeg','https://i.imgur.com/J6EyZfE.jpeg']},
  {key:'cou',icon:HeartHandshake,color:'bg-rose-50 text-rose-600',imgs:['https://i.imgur.com/uLIrVWz.jpeg']},
  {key:'hol',icon:Target,color:'bg-amber-50 text-amber-600',imgs:['https://i.imgur.com/DCy85we.jpeg','https://i.imgur.com/Lub8K70.jpeg']},
  {key:'pel',icon:Building2,color:'bg-slate-50 text-slate-600',imgs:['https://i.imgur.com/DtiDQA1.jpeg','https://i.imgur.com/zVVFDtI.png']},
  {key:'ser',icon:Crown,color:'bg-teal-50 text-teal-600',imgs:['https://i.imgur.com/2jmGy1o.jpeg']},
  {key:'s2',icon:BookOpenCheck,color:'bg-sky-50 text-sky-600',imgs:['https://i.imgur.com/nCKRmAo.jpeg','https://i.imgur.com/tdZN5pI.jpeg']},
  {key:'ric',icon:BookHeart,color:'bg-orange-50 text-orange-600',imgs:['https://i.imgur.com/w6jiaUz.jpeg']},
  {key:'pjk',icon:UsersRound,color:'bg-cyan-50 text-cyan-600',imgs:['https://i.imgur.com/ffPiJKo.jpeg'],video:'https://www.youtube.com/embed/FibGjLyXzXw'},
];

function ProgramsPage(){
  const{t}=useI18n();const[op,setOp]=useState<string|null>(null);const[lbImg,setLbImg]=useState<string|null>(null);
  return(<main>
    {lbImg&&<Lightbox src={lbImg} onClose={()=>setLbImg(null)}/>}
    <PageBanner title={t('prog.t')} subtitle={t('prog.sub')}/>
    <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="space-y-8">
      {progFull.map(p=>{const Ic=p.icon;const isO=op===p.key;return(<div key={p.key} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <button onClick={()=>setOp(isO?null:p.key)} className="w-full flex items-center gap-6 p-6 sm:p-8 text-left"><div className={`w-14 h-14 ${p.color} rounded-xl flex items-center justify-center shrink-0`}><Ic className="w-7 h-7"/></div><div className="flex-1 min-w-0"><h3 className="font-heading font-bold text-primary-800 text-xl">{t(`prog.${p.key}.t`)}</h3></div><ArrowRight className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isO?'rotate-90':''}`}/></button>
        {isO&&<div className="px-6 sm:px-8 pb-8 border-t border-gray-200"><p className="text-gray-600 leading-relaxed text-justify pt-6 mb-6">{t(`prog.${p.key}.d`)}</p><div className="grid sm:grid-cols-2 gap-4">{p.imgs.map((img,j)=><img key={j} src={img} alt={t(`prog.${p.key}.t`)} loading="lazy" className="w-full h-56 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity" onClick={()=>setLbImg(img)}/>)}</div>{p.video&&<div className="mt-4 aspect-video w-full overflow-hidden rounded-xl shadow-sm"><iframe src={p.video} title={t(`prog.${p.key}.t`)} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>}</div>}
      </div>);})}
    </div></div></section>
  </main>);
}

const projectsList:{title:{id:string;en:string};desc?:{id:string;en:string};icon:any;color:string;imgs?:string[]}[]=[
  {title:{id:'Guru PAK yang mengajar dan melayani secara holistik',en:'Christian Religious Education Teachers teaching and serving holistically'},desc:{id:'Mempersiapkan 30 guru pendidikan agama kristen yang mampu mengajar dan melayani secara holistik. Disamping mengajarkan pendidikan agama kristen, guru juga dapat menjadi agen perubahan dan Pengembang Masyarakat. Mereka bisa melayani anak didik dan keluarganya juga komunitas yang ada disekitarnya.',en:'Preparing 30 Christian Religious Education teachers who are able to teach and serve holistically. Besides teaching Christian Religious Education, the teachers can also become agents of change and Community Developers. They can serve their students and their families, as well as the surrounding community.'},icon:GraduationCap,color:'bg-blue-50 text-blue-600',imgs:['https://i.imgur.com/hKDiq9F.jpeg','https://i.imgur.com/CI1uAgT.jpeg']},
  {title:{id:'Modal awal untuk hamba-hamba Tuhan alumni program BELAWA',en:'Startup Capital for Alumni of Learning Through Whatsapp Program'},desc:{id:'YPKT Kesindo menerapkan tiga macam program untuk para peserta pembelajaran di program BELAWA yaitu Menggendong - Mendampingi - Mandiri.',en:'HCDF Kesindo implements three types of programs for Learning Through Whatsapp Participants, namely Carrying - Accompanying - Independent.'},icon:HandHelping,color:'bg-emerald-50 text-emerald-600',imgs:['https://i.imgur.com/ZRxfKtr.jpeg','https://i.imgur.com/Taoo9XP.jpeg']},
  {title:{id:'Pelatihan BELAWA untuk hamba Tuhan bekerjasama dengan Yayasan lain',en:'Learning Through Whatsapp training for servants of God in collaboration with other foundations'},desc:{id:'Pelatihan ini bekerjasama dengan Yayasan Kasih Inovasi Sejati dan Yayasan lain agar hamba-hamba Tuhan di desa dan pedalaman dapat mengikuti program ini.',en:'This training is conducted in collaboration with Yayasan Kasih Inovasi Sejati and other foundations so that servants of God in villages and remote areas can join this program.'},icon:Smartphone,color:'bg-green-50 text-green-600',imgs:['https://i.imgur.com/dRkJWhQ.jpeg']},
  {title:{id:'Penjualan produk UKM untuk penggalangan dana',en:'Micro Enterprise product sales for fundraising'},icon:Briefcase,color:'bg-amber-50 text-amber-600',imgs:['https://i.imgur.com/wkjdCqA.jpeg','https://i.imgur.com/dxTiqOG.jpeg']},
  {title:{id:'Pembangunan Gereja dan Rumah pastori',en:'Church and Pastorates Construction'},desc:{id:'YPKT Kesindo ingin membantu hamba-hamba Tuhan yang memiliki kebutuhan untuk membangun gereja atau rumah pastori.',en:'HCDF Kesindo wants to help Servants of God who has a need to build a church or Pastorates.'},icon:Church,color:'bg-teal-50 text-teal-600',imgs:['https://i.imgur.com/5F2KKG9.jpeg','https://i.imgur.com/dXCej9h.jpeg']},
];

function ProjectsPage(){
  const{t,lang}=useI18n();const anim=useScrollAnim();
  return(<main>
    <PageBanner title={t('prj.t')} subtitle={t('prj.sub')}/>
    <section className="py-20 bg-white"><div ref={anim.ref} className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-700 ${anim.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="space-y-6">{projectsList.map((p,i)=>{const Ic=p.icon;return(<div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="p-6 sm:p-8"><div className="flex items-center gap-5"><div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center shrink-0`}><Ic className="w-6 h-6"/></div><h3 className="font-heading font-bold text-primary-800 text-lg">{p.title[lang]}</h3></div>{p.desc&&<p className="text-gray-600 leading-relaxed text-justify mt-4">{p.desc[lang]}</p>}</div>
        {p.imgs&&<div className="px-6 sm:px-8 pb-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">{p.imgs.map((src,j)=><img key={j} src={src} alt={p.title[lang]} loading="lazy" className="w-full h-64 object-cover rounded-xl"/>)}</div>}
      </div>);})}</div>
      <div className="mt-12 bg-accent-50 border border-accent-200 rounded-2xl p-8 text-center">
        <p className="text-primary-800 text-lg leading-relaxed mb-6">{t('prj.cta')}</p>
        <Link to="/donate" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold px-8 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"><Heart className="w-5 h-5"/>{t('prj.cta.b')}</Link>
      </div>
    </div></section>
  </main>);
}

const partnersIntl:{id:string;en:string}[]=[
  {id:'Community Development Consultants International',en:'Community Development Consultants International'},
  {id:'Medical Ambassadors International',en:'Medical Ambassadors International'},
  {id:'Medical Ambassadors Canada',en:'Medical Ambassadors Canada'},
  {id:'Care Channels International',en:'Care Channels International'},
  {id:'PPH Brethren Church, Singapore',en:'PPH Brethren Church, Singapore'},
  {id:'Cedar Fund, Hongkong',en:'Cedar Fund, Hongkong'},
  {id:'ECC Hongkong',en:'ECC Hongkong'},
  {id:'Fusion International',en:'Fusion International'},
];
const partnersDomestic:{id:string;en:string}[]=[
  {id:'GKI Gading Serpong',en:'GKI Gading Serpong'},
  {id:'Fusion Indonesia',en:'Fusion Indonesia'},
  {id:'Yayasan Hati Melayani Indonesia',en:'Hati Melayani Indonesia Foundation'},
  {id:'Yayasan Rumah Pengharapan',en:'Rumah Pengharapan Foundation'},
  {id:'Sekolah Kanisius, Yogyakarta',en:'Sekolah Kanisius, Yogyakarta'},
  {id:'Yayasan Goniniwe',en:'Goniniwe Foundation'},
];
const partnersCurrent:{id:string;en:string}[]=[
  {id:'STT Permata Bangsa Barito',en:'Permata Bangsa Barito Theological Seminary'},
  {id:'Yayasan Parakletos, Maluku',en:'Parakletos Foundation, Maluku'},
  {id:'Yayasan Kainos',en:'Kainos Foundation'},
  {id:'Yayasan Busur Emas',en:'Busur Emas Foundation'},
  {id:'Yayasan Global Paradigma',en:'Global Paradigma Foundation'},
  {id:'Pastor Tim Huber, Japan',en:'Pastor Tim Huber, Japan'},
  {id:'Ekklesia Noborito, Japan',en:'Ekklesia Noborito, Japan'},
];

function PartnersPage(){
  const{t,lang}=useI18n();const anim=useScrollAnim();
  const renderList=(items:{id:string;en:string}[])=>(<div className="space-y-3">{items.map((p,i)=>(
    <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:border-primary-200">
      <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">{i+1}</div>
      <h3 className="font-heading font-semibold text-primary-800 text-sm sm:text-base">{p[lang]}</h3>
    </div>
  ))}</div>);
  return(<main>
    <PageBanner title={t('ptn.t')} subtitle={t('ptn.sub')}/>
    <section className="py-20 bg-white"><div ref={anim.ref} className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-700 ${anim.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <p className="text-center text-gray-600 text-lg mb-14">{lang==='id'?'Pernah bermitra dengan berbagai organisasi internasional dan nasional.':'Has partnered with various international and national organizations.'}</p>
      <div className="mb-12"><h3 className="text-xl font-heading font-bold text-primary-800 mb-6 flex items-center gap-3"><Globe className="w-6 h-6 text-accent-500"/>{lang==='id'?'Organisasi di Luar Negeri':'International Organizations'}</h3>{renderList(partnersIntl)}</div>
      <div className="mb-12"><h3 className="text-xl font-heading font-bold text-primary-800 mb-6 flex items-center gap-3"><MapPin className="w-6 h-6 text-accent-500"/>{lang==='id'?'Organisasi di Dalam Negeri':'National Organizations'}</h3>{renderList(partnersDomestic)}</div>
      <div><h3 className="text-xl font-heading font-bold text-primary-800 mb-6 flex items-center gap-3"><Users className="w-6 h-6 text-accent-500"/>{lang==='id'?'YPKT Kesindo saat ini sedang bermitra dengan':'Holistic Community Development Foundation (HCDF) is currently partnering with'}</h3>{renderList(partnersCurrent)}</div>
    </div></section>
  </main>);
}

const testFull=[
  {name:'Simeon Soge',role:{id:'Peserta BELAWA, Kabupaten Sikka-NTT',en:'BELAWA Participant, Sikka Regency, NTT'},text:{id:'Program BELAWA banyak membukakan pemikiran saya. Di pedalaman sangat dibutuhkan orang-orang yang mau berjuang untuk desanya. Kami bersyukur boleh menjadi salah satu diantaranya.',en:'The BELAWA program greatly opened my mind. The remote areas desperately need people willing to fight for their villages. We are grateful to be among them.'}},
  {name:'Ibu Monika Dorli Siagian',role:{id:'Peserta Seminar Konseling',en:'Counseling Seminar Participant'},text:{id:'Saya bersyukur mengenal YPKT-KESINDO, yang selalu membuka seminar konseling, mulai Angkatan 1 di bulan Juli 2023 hingga saat ini. Materi yang diberikan sangat bermanfaat untuk membekali para konselor awam, orang tua, guru, hamba Tuhan, dll. Saya baru bergabung di Angkatan yang ke-4 sampai sekarang sudah Angkatan ke 14. Saya melayani sebagai guru Bimbingan Penyuluhan (BP) selama 30 tahun, karena menyadari bahwa menjadi guru ternyata adalah passion saya. Tuhan yang menuntun dan memberikan kekuatan sampai pensiun tiba, di tahun 2025. Saya menyadari, menjadi guru itu suatu kehormatan bahkan terus harus belajar.',en:'I am grateful to know Holistic Community Development Foundation (HCDF), which has consistently held counseling seminars, starting with the first batch in July 2023 and continuing to this day. The material provided is very beneficial for lay counselors, parents, teachers, servants of God, and others. I only joined the fourth batch and am now in my 14th batch. I have worked and served as a Guidance and Counseling teacher for 30 years, realizing that teaching is my passion. God has guided and given me strength until my retirement in 2025. I realize that being a teacher is an honor and a constant learning experience.'}},
  {name:'Hanna Christien',role:{id:'Peserta Seminar Konseling',en:'Counseling Seminar Participant'},text:{id:'Saya merasa benar-benar tertolong dan mendapat banyak jawaban dari pencerahan yang dibagikan oleh empat narasumber dari Webinar Konseling 12 "Inner Freedom". Ada kekosongan yang dalam di hati saya. Perasaan merana itu menggeluti hati dan pikiran saya, walaupun kehidupan ini tetap harus dijalani semampu saya. Sampai akhirnya Tuhan menuntun saya, terkoneksi dengan webinar Inner Freedom ini. Sungguh, saya tidak menduga, pelajaran yang diberikan menjadi jawaban bagi kebutuhan dan permasalahan yang saya hadapi saat ini.',en:'I felt truly helped and received many answers from the enlightenment shared by the four speakers at the 12th "Inner Freedom" Counseling Webinar. There was a deep emptiness in my heart. This feeling of misery gripped my heart and mind, even though I still had to live life to the best of my ability. Until finally, God guided me, connecting me to this Inner Freedom webinar. Truly, I didn\'t expect the lessons provided to be the answer to the needs and problems I was currently facing.'}},
  {name:'Ibu Elsye',role:{id:'Penerima Manfaat, Pulau Seram-Maluku',en:'Beneficiary, Seram Island, Moluccas'},text:{id:'Saya bersyukur dapat mengenal Yayasan Pengembangan Komunitas Terpadu - KESINDO. Tim YPKT KESINDO pernah datang mengunjungi kami dan memberikan pelatihan-pelatihan kepada komunitas pemuda dan ibu-ibu di Pulau Seram-Maluku. Saya bersyukur walaupun kami sangat jauh sekali tetapi Tim YPKT KESINDO mau melayani di komunitas yang saya bina. Mohon doakan kami, dilokasi kami cocok sekali untuk pengembangan udang.',en:'I am grateful to have met Holistic Community Development Foundation (HCDF). The team has visited us and provided training for the youth and women\'s communities on Seram Island, Moluccas. I am grateful that, despite our distance, the Holistic Community Development Foundation (HCDF) team was willing to serve in the community I foster. Please pray, our location is a perfect place for shrimp development.'}},
  {name:'Pdt. Herman Rey & Pdt. Hana Supraningsih',role:{id:'Pendeta, GPdI Filadelfia, Kab. Oki, Sumatera Selatan',en:'Pastor, GPdI Filadelfia, Oki Regency, South Sumatra'},text:{id:'Kami melayani di GPdI Filadelfia, Kab. Oki, Sumatera Selatan sudah 24 tahun lamanya. YPKT Kesindo sangat bijaksana membuat program melalui WhatsApp sehingga bagi kami yang tinggal di pedalaman masih bisa dijangkau dan diperlengkapi. Saya pernah berada di "lubang" karena terjerat hutang untuk kebutuhan hidup. Melalui proses yang panjang akhirnya bisa dilunasi. Seorang fasilitator memotivasi saya dan mengirimkan 1 kg benih kangkung untuk ditanam di kebun. Saya dan istri ingin membantu meningkatkan perekonomian jemaat. Dan Tuhan memberikan hikmat agar kami bisa berkarya dan mandiri karena tidak mungkin bergantung pada orang lain. Saya bersama istri mengembangan ikan nila dan tanaman sawi serta kangkung.',en:'We have served at Pentecostal church, GPdI Filadelfia, Oki Regency, South Sumatra for 24 years. Holistic Community Development Foundation (HCDF) was very wise in creating Learning Through WhatsApp program so that those of us living in remote areas could still be reached and provided with supplies. I was once in a "hole" because of the debt I had for living expenses. After a long process, I was finally able to pay it off. A facilitator motivated me and sent 1 kg of kale seeds to plant on my garden. My wife and I wanted to help improve the congregation\'s economy. And God gave us wisdom to work and be independent because we couldn\'t depend on others. My wife and I grew tilapia, mustard greens, and kale.'}},
  {name:'Martinus Tison',role:{id:'Peserta BELAWA',en:'BELAWA Participant'},text:{id:'Saya sangat bersyukur atas kesempatan mengikuti pelatihan Program BELAWA yang diselenggarakan oleh YPKT KESINDO. Saya merasa sangat diberkati. Materi yang disampaikan membuka wawasan saya, dan saya bahkan mendapatkan perspektif baru yang berdampak positif. Usaha kami dimulai dari pembelian beberapa ekor bebek. Puji Tuhan, sekarang ternak bebek kami sudah berkembang.',en:'I am very grateful for the opportunity to participate in the BELAWA Program training organized by Holistic Community Development Foundation (HCDF). I feel truly blessed. The material presented broadened my horizons, and I even gained new perspectives that had a positive impact. Our business started with the purchase of a few ducks. Praise God, now our duck herd has flourished.'}},
  {name:'Ibu Neneng Maria',role:{id:'Donatur',en:'Donor'},text:{id:'Saya mengenal Pendiri dari YPKT KESINDO sudah cukup lama sekitar 40 Tahun. Saya tahu bagaimana perjuangan dalam pelayanan yang mereka lakukan. Sebagai ibu rumah tangga saya terus menopang dalam doa dan juga mendukung kegiatan yang dilakukan oleh YPKT KESINDO. Saya tidak ragu akan integritas dan kecintaan mereka dalam melayani pekerjaan Tuhan.',en:'I\'ve known the founders of Holistic Community Development Foundation (HCDF) for about 40 years. I know the struggles in the ministry they carry out. As a housewife, I continue to support them in prayer and also support the activities carried out by HCDF. I have no doubts about their integrity and love in serving God\'s work.'}},
];

function TestimonialsPage(){
  const{t,lang}=useI18n();
  return(<main>
    <PageBanner title={t('test.t')} subtitle={t('test.sub')}/>
    <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {testFull.map((td,i)=><div key={i} className="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><Quote className="w-8 h-8 text-accent-500/30 mb-3"/><p className="text-gray-600 leading-relaxed italic mb-5">"{td.text[lang]}"</p><div className="flex items-center gap-3 pt-4 border-t border-gray-100"><div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">{td.name.charAt(0)}</div><div><p className="font-heading font-semibold text-primary-800 text-sm">{td.name}</p><p className="text-gray-500 text-xs">{td.role[lang]}</p></div></div></div>)}
    </div></div></section>
  </main>);
}

const donProgs=[{icon:GraduationCap,key:'sch',color:'bg-blue-50 text-blue-600'},{icon:Briefcase,key:'bus',color:'bg-emerald-50 text-emerald-600'},{icon:Church,key:'chu',color:'bg-amber-50 text-amber-600'}];
const banks=[{bank:'CIMB Niaga',num:'800.08.2811.2.00',holder:'Yayasan Pengembangan Komunitas Terpadu'},{bank:'Bank Central Asia (BCA)',num:'8840339875',holder:'Sri Melasari Sadeli'}];

function DonatePage(){
  const{t,lang}=useI18n();const whyA=useScrollAnim();const metA=useScrollAnim();const prgA=useScrollAnim();const[sel,setSel]=useState<string|null>(null);
  return(<main>
    <PageBanner title={t('don.page.t')} subtitle={t('don.cta.s')}/>
    <section ref={whyA.ref} className="py-20 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${whyA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}><div className="grid lg:grid-cols-2 gap-12 items-center">
      <div><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('don.why.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3 mb-6">{t('don.why.t')}</h2><p className="text-gray-600 leading-relaxed text-lg mb-6">{t('don.why.p')}</p><div className="grid grid-cols-2 gap-4">{[{s:'4,583+',l:lang==='id'?'Peserta Terlatih':'Trained Participants'},{s:'41+',l:lang==='id'?'Program BELAWA':'BELAWA Programs'},{s:'21+',l:lang==='id'?'Tahun Berkarya':'Years of Service'},{s:'100%',l:lang==='id'?'Transparan':'Transparent'}].map((x,i)=><div key={i} className="bg-gray-50 rounded-xl p-4 text-center"><p className="text-2xl font-heading font-bold text-primary-800">{x.s}</p><p className="text-gray-500 text-xs mt-1">{x.l}</p></div>)}</div></div>
      <div><img src="/donasi.jpg" alt="Pelatihan YPKT KESINDO" loading="lazy" className="rounded-2xl shadow-xl w-full h-80 lg:h-96 object-cover"/></div>
    </div></div></section>
    <section ref={metA.ref} className="py-20 bg-gray-50"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${metA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('don.met.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('don.met.t')}</h2></div>
      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">{banks.map(a=><div key={a.bank} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"><CreditCard className="w-10 h-10 text-primary-800 mx-auto mb-4"/><h3 className="font-heading font-bold text-primary-800 text-lg mb-2">{a.bank}</h3><p className="text-2xl font-mono text-accent-600 font-bold mb-1">{a.num}</p><p className="text-gray-500 text-sm">a.n. {a.holder}</p></div>)}<div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center sm:col-span-2"><QrCode className="w-10 h-10 text-primary-800 mx-auto mb-4"/><h3 className="font-heading font-bold text-primary-800 text-lg mb-2">QRIS</h3><img src="/qris-kesindo.jpg" alt="QRIS YPKT KESINDO" className="w-48 h-auto rounded-xl mx-auto"/></div></div>
      <div className="max-w-3xl mx-auto mt-8 text-center"><a href="https://wa.me/6281291808260?text=Konfirmasi%20donasi%20YPKT%20KESINDO" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-all hover:scale-105"><MessageCircle className="w-5 h-5"/>{t('don.conf')}</a></div>
    </div></section>
    <section ref={prgA.ref} className="py-20 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${prgA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}>
      <div className="text-center mb-14"><span className="text-accent-500 font-semibold text-sm tracking-wider uppercase">{t('don.prg.t')}</span><h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-800 mt-3">{t('don.prg.t')}</h2></div>
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">{donProgs.map(({icon:Ic,key,color})=><button key={key} onClick={()=>setSel(sel===key?null:key)} className={`rounded-2xl p-8 text-center border-2 transition-all duration-300 ${sel===key?'border-accent-500 bg-accent-50 shadow-lg':'border-gray-100 bg-gray-50 hover:border-gray-200 hover:shadow-md'}`}><div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mx-auto mb-4`}><Ic className="w-7 h-7"/></div><h3 className="font-heading font-semibold text-primary-800 mb-2">{t(`don.prg.${key}`)}</h3><p className="text-gray-500 text-sm">{t(`don.prg.${key}.d`)}</p></button>)}</div>
      {sel&&<div className="text-center mt-8"><a href={`https://wa.me/6281291808260?text=Donasi%20${t(`don.prg.${sel}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent-500 text-primary-800 font-bold px-10 py-4 rounded-full text-lg hover:bg-accent-400 transition-all hover:scale-105 shadow-xl">{t('don.cta.b')}<ArrowRight className="w-5 h-5"/></a></div>}
    </div></section>
    <section className="py-8 bg-gray-50"><div className="max-w-3xl mx-auto px-4 sm:px-6"><div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4"><AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"/><p className="text-amber-800 text-sm">{lang==='id'?'Pastikan Anda mentransfer ke rekening resmi YPKT KESINDO. Untuk konfirmasi, hubungi kami melalui WhatsApp.':'Make sure you transfer to the official Holistic Community Development Foundation (HCDF) account. For confirmation, contact us via WhatsApp.'}</p></div></div></section>
    <section className="py-16 bg-white"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 sm:p-10">
        <Shield className="w-12 h-12 text-primary-800 mx-auto mb-4"/>
        <h3 className="font-heading font-bold text-primary-800 text-xl sm:text-2xl mb-3">{lang==='id'?'Audit Keuangan':'Financial Audit'}</h3>
        <p className="text-gray-600 leading-relaxed">{lang==='id'?'Keuangan YPKT KESINDO diaudit oleh':'Holistic Community Development Foundation (HCDF) finances are audited by'} <span className="font-semibold text-primary-800">PT Prathama Tax</span></p>
      </div>
    </div></section>
  </main>);
}

function ContactPage(){
  const{t,lang}=useI18n();const fA=useScrollAnim();const[fd,setFd]=useState({name:'',email:'',message:''});const[sent,setSent]=useState(false);
  const submit=(e:React.FormEvent)=>{e.preventDefault();setSent(true);setFd({name:'',email:'',message:''});setTimeout(()=>setSent(false),4000);};
  const info=lang==='id'?[{icon:Phone,label:t('con.i.wa'),value:'+62 888-0895-7173 (Farida)',href:'https://wa.me/628880895173'},{icon:Phone,label:t('con.i.wa'),value:'+62 812-9180-8260 (Melasari)',href:'https://wa.me/6281291808260'},{icon:Mail,label:t('con.i.email'),value:'yayasankesindo@gmail.com',href:'mailto:yayasankesindo@gmail.com'},{icon:MapPin,label:t('con.i.addr'),value:'Taman Ubud Cempaka Selatan III No.15, Lippo Village, Binong, Curug, Kab. Tangerang, Banten 15810',href:'#map'}]:[{icon:Phone,label:t('con.i.wa'),value:'+62 813-1173-3430 (Rebecca)',href:'https://wa.me/6281311733430'},{icon:Mail,label:t('con.i.email'),value:'rkistap0211@gmail.com',href:'mailto:rkistap0211@gmail.com'},{icon:MapPin,label:t('con.i.addr'),value:'Taman Ubud Cempaka Selatan III No.15, Lippo Village, Tangerang, Banten 15810',href:'#map'}];
  return(<main>
    <PageBanner title={t('con.t')} subtitle={t('con.sub')}/>
    <section ref={fA.ref} className="py-20 bg-white"><div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${fA.isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}><div className="grid lg:grid-cols-5 gap-12">
      <div className="lg:col-span-2"><h2 className="text-2xl font-heading font-bold text-primary-800 mb-6">{lang==='id'?'Informasi Kontak':'Contact Information'}</h2><div className="space-y-6">{info.map(it=><a key={it.label} href={it.href} target={it.href.startsWith('http')?'_blank':undefined} rel={it.href.startsWith('http')?'noopener noreferrer':undefined} className="flex items-start gap-4 group"><div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-500 transition-colors"><it.icon className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors"/></div><div><p className="text-sm text-gray-500">{it.label}</p><p className="text-primary-800 font-medium">{it.value}</p></div></a>)}</div></div>
      <div className="lg:col-span-3"><form onSubmit={submit} className="bg-gray-50 rounded-2xl p-8 border border-gray-100"><div className="space-y-5">
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">{t('con.f.name')}</label><input type="text" required value={fd.name} onChange={e=>setFd({...fd,name:e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"/></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">{t('con.f.email')}</label><input type="email" required value={fd.email} onChange={e=>setFd({...fd,email:e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"/></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">{t('con.f.msg')}</label><textarea required rows={5} value={fd.message} onChange={e=>setFd({...fd,message:e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all resize-none"/></div>
        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary-800 text-white font-semibold py-3.5 rounded-xl hover:bg-primary-700 transition-all hover:scale-[1.02] shadow-md"><Send className="w-4 h-4"/>{t('con.f.send')}</button>
        {sent&&<p className="text-green-600 text-sm text-center font-medium">{lang==='id'?'Pesan Anda telah terkirim!':'Your message has been sent!'}</p>}
      </div></form></div>
    </div></div></section>
    <section id="map" className="pb-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"><iframe src="https://www.google.com/maps?q=Taman+Ubud+Cempaka+Selatan+III+No+15+Lippo+Village+Binong+Curug+Kabupaten+Tangerang+Banten+15810&output=embed" width="100%" height="400" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location"/></div></div></section>
  </main>);
}


export default function App(){
  return(
    <div className="min-h-screen bg-white">
      <ScrollToTop/><Header/>
      <div className="animate-fade-in">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/programs" element={<ProgramsPage/>}/>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/partners" element={<PartnersPage/>}/>
          <Route path="/testimonials" element={<TestimonialsPage/>}/>
          <Route path="/donate" element={<DonatePage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      </div>
      <Footer/><Floating/>
    </div>
  );
}
