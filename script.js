
const LOW_POWER = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768;
if (LOW_POWER) document.body.classList.add('low-power');

function setViewportClass() {
  const w = window.innerWidth;
  const body = document.body;
  body.classList.remove('vp-desktop','vp-laptop','vp-tablet','vp-mobile','vp-compact');
  if (w <= 420) body.classList.add('vp-compact','vp-mobile');
  else if (w <= 768) body.classList.add('vp-mobile');
  else if (w <= 992) body.classList.add('vp-tablet');
  else if (w <= 1200) body.classList.add('vp-laptop');
  else body.classList.add('vp-desktop');
}
setViewportClass();
window.addEventListener('resize', setViewportClass);

// ===== Mobile sidebar =====
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');
function closeSidebar(){ document.body.classList.remove('sidebar-open'); sidebarToggle?.setAttribute('aria-expanded','false'); }
function openSidebar(){ document.body.classList.add('sidebar-open'); sidebarToggle?.setAttribute('aria-expanded','true'); }
sidebarToggle?.addEventListener('click',()=>document.body.classList.contains('sidebar-open')?closeSidebar():openSidebar());
sidebarOverlay?.addEventListener('click',closeSidebar);
document.querySelectorAll('.sidebar-link,.bottom-link').forEach(link=>link.addEventListener('click',()=>{ closeSidebar(); document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.toggle('active',l.getAttribute('href')===link.getAttribute('href'))); }));

// ===== Active link =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.sidebar-link');
const bottomLinks = document.querySelectorAll('.bottom-link');
function updateActive(){
  let current='hero';
  sections.forEach(sec=>{ if(window.scrollY >= sec.offsetTop - 150) current=sec.id; });
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
  bottomLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
}
window.addEventListener('scroll',updateActive,{passive:true}); updateActive();

// ===== Language + theme =====
const dict={
 en:{
  nav:{home:'home',about:'about',skills:'skills',projects:'projects',contact:'contact'},
  status:{online:'online'},
  theme:{toggle:'dark mode'}, language:{toggle:'عربي'},
  hero:{chip:'PeterElia.dev',badge:'Code-Driven UI',scroll:'scroll down'},
  section:{aboutKicker:' about me',skillsKicker:' my skills',projectsKicker:' my projects',contactKicker:' get in touch',aboutTitle:'About()',skillsTitle:'Skills[]',projectsTitle:'Projects{}',contactTitle:'Contact()'},
  stat:{0:'projects completed',1:'years experience',2:'commits this year',3:'cups of coffee'},
  skills:{frontend:'frontend/',backend:'backend/',database:'database/',systems:'systems/'},
  projects:{filters:{all:'all',stores:'stores',apps:'apps',systems:'systems'},details:'Details',live:'Live',code:'Code',liveBadge:'live',desktop:'desktop app',webapp:'web app'},
  form:{namePlaceholder:'Enter your name...',emailPlaceholder:'Enter your email...',subjectPlaceholder:'Enter subject...',messagePlaceholder:'Type your message...',send:'send_message → WhatsApp'},
  contact:{linkedinLabel:'LinkedIn Profile',name:'Peter Elia Nasseem Fanous',brand:'PeterElia.dev'},
  footer:{rights:' All rights reserved'},
  floating:{whatsapp:'WhatsApp'},
  modal:{overviewLabel:'Overview',stackLabel:'Stack',statusLabel:'Status',openLive:'Open Live',openCode:'Open Code',whatsapp:'Ask About This Project'}
 },
 ar:{
  nav:{home:'الرئيسية',about:'عني',skills:'المهارات',projects:'المشاريع',contact:'تواصل'},
  status:{online:'متصل'},
  theme:{toggle:'الوضع الليلي'}, language:{toggle:'English'},
  hero:{chip:'PeterElia.dev',badge:'واجهة مبنية بالكود',scroll:'انزل للأسفل'},
  section:{aboutKicker:' عني',skillsKicker:' مهاراتي',projectsKicker:' مشاريعي',contactKicker:' تواصل معي',aboutTitle:'About()',skillsTitle:'Skills[]',projectsTitle:'Projects{}',contactTitle:'Contact()'},
  stat:{0:'مشروع تم إنجازه',1:'سنوات خبرة',2:'عملية Commit هذا العام',3:'كوب قهوة'},
  skills:{frontend:'frontend/',backend:'backend/',database:'database/',systems:'systems/'},
  projects:{filters:{all:'الكل',stores:'المتاجر',apps:'التطبيقات',systems:'الأنظمة'},details:'التفاصيل',live:'مباشر',code:'الكود',liveBadge:'مباشر',desktop:'تطبيق Desktop',webapp:'تطبيق Web'},
  form:{namePlaceholder:'اكتب اسمك...',emailPlaceholder:'اكتب الإيميل...',subjectPlaceholder:'محتاج إيه؟',messagePlaceholder:'اكتب تفاصيل المشروع...',send:'إرسال → واتساب'},
  contact:{linkedinLabel:'حساب LinkedIn',name:'Peter Elia Nasseem Fanous',brand:'PeterElia.dev'},
  footer:{rights:' جميع الحقوق محفوظة'},
  floating:{whatsapp:'واتساب'},
  modal:{overviewLabel:'نظرة عامة',stackLabel:'التقنيات',statusLabel:'الحالة',openLive:'فتح المشروع',openCode:'فتح الكود',whatsapp:'اسأل عن المشروع'}
 }
};
const projects={
 'fakkerny':{title:'فَكّرني | Fakkerny',desc:{en:'Personal organizer for reminders, medication, money and habits, with offline-first use and optional cloud sync.',ar:'مساعد شخصي لتنظيم التذكيرات والأدوية والفلوس والعادات، مع إمكانية الاستخدام أوفلاين والمزامنة السحابية الاختيارية.'},overview:{en:'A practical personal productivity PWA that keeps everyday reminders and routines in one place, with optional account-based sync.',ar:'تطبيق إنتاجية شخصي يجمع التذكيرات والروتين اليومي في مكان واحد، مع مزامنة اختيارية عند تسجيل الدخول.'},stack:'PWA · JavaScript · Turso',cat:{en:'App',ar:'تطبيق'},status:{en:'Live',ar:'مباشر'},image:'assets/fakkerny-project.webp',live:'https://fakkerny-com.vercel.app/',code:'https://github.com/beterelea020-alt/fakkerny.com'},
 'eh-ya-am':{title:'إيه يا عم؟ | EH YA AM',desc:{en:'Egyptian Arabic party quiz with questions and challenges for two teams, designed to run from one host phone without accounts.',ar:'لعبة أسئلة وتحديات باللهجة المصرية لفريقين، مصممة للعب من موبايل المضيف من غير حسابات.'},overview:{en:'A mobile-first group game for trips and gatherings, with quiz categories, challenges and simple host-controlled scoring.',ar:'لعبة جماعية Mobile-first للرحلات واللمّات، فيها فئات أسئلة وتحديات ونظام نقاط بسيط يتحكم فيه المضيف.'},stack:'JavaScript · Mobile-first · Party Game',cat:{en:'App',ar:'لعبة جماعية'},status:{en:'Live',ar:'مباشر'},image:'assets/eh-ya-am-project.webp',live:'https://eh-ya-amcom.vercel.app/',code:'https://github.com/beterelea020-alt/eh-ya-am.com'},
 'watch-store':{title:'RAW Watches',desc:{en:'Watch store with product discovery, specifications, cart, checkout, customer accounts and an admin dashboard.',ar:'متجر ساعات مع اكتشاف المنتجات والمواصفات والسلة والـCheckout وحسابات العملاء ولوحة تحكم.'},overview:{en:'A complete e-commerce experience focused on product discovery, checkout and store management.',ar:'تجربة متجر إلكتروني متكاملة تركز على اكتشاف المنتج والطلب وإدارة المتجر.'},stack:'JavaScript · Supabase · Admin',cat:{en:'Store',ar:'متجر'},status:{en:'Live',ar:'مباشر'},image:'watch-store.svg',live:'https://watch-store-delta-red.vercel.app/',code:'https://github.com/beterelea020-alt/watch-store'},
 'coffee-store':{title:'RAW Coffee House',desc:{en:'Arabic RTL coffee store with product options, live cart, governorate checkout and WhatsApp-ready orders.',ar:'متجر قهوة عربي RTL بخيارات المنتجات وسلة مباشرة وCheckout للمحافظات وطلبات جاهزة على واتساب.'},overview:{en:'A practical RTL storefront designed around fast product selection and ordering.',ar:'واجهة متجر RTL عملية ومبنية حول اختيار المنتج والطلب بسرعة.'},stack:'JavaScript · RTL · WhatsApp',cat:{en:'Store',ar:'متجر'},status:{en:'Live',ar:'مباشر'},image:'coffee-store.svg',live:'https://coffee-store-zeta-nine.vercel.app/',code:'https://github.com/beterelea020-alt/coffee-store'},
 'safar-psalms':{title:'Safar Al-Mazameer',desc:{en:'Digital Psalms library for reading, listening, memorizing and review, with offline progress on the device.',ar:'مكتبة رقمية للمزامير للقراءة والاستماع والحفظ والمراجعة مع حفظ التقدم والعمل بدون اتصال.'},overview:{en:'A quiet, focused reading experience designed to keep the core content available offline.',ar:'تجربة قراءة هادئة ومركزة مع إبقاء المحتوى الأساسي متاحًا بدون إنترنت.'},stack:'PWA · Offline · JavaScript',cat:{en:'App',ar:'تطبيق'},status:{en:'Live',ar:'مباشر'},image:'safar-psalms.svg',live:'https://safar-psalms.vercel.app/',code:'https://github.com/beterelea020-alt/safar-psalms'},
 'maljaeii':{title:'Maljaei',desc:{en:'Daily personal app with streaks, checklists, mood-based messages, favorites and reminders.',ar:'تطبيق يومي شخصي فيه Streaks وChecklists ورسائل حسب الحالة والمفضلة والتذكيرات.'},overview:{en:'A personal daily experience built around routines, saved progress and lightweight interactions.',ar:'تجربة يومية شخصية مبنية حول الروتين والتقدم المحفوظ والتفاعل الخفيف.'},stack:'PWA · localStorage · Admin Panel',cat:{en:'App',ar:'تطبيق'},status:{en:'Live',ar:'مباشر'},image:'maljaeii.svg',live:'https://maljaeii.vercel.app/',code:'https://github.com/beterelea020-alt/Maljaei'},
 'george-maria-love':{title:'George & Maria',desc:{en:'A shareable digital invitation designed mobile-first and built to look good on every screen.',ar:'دعوة رقمية في رابط واحد، مصممة Mobile-first وتظهر بشكل جيد على كل الشاشات.'},overview:{en:'A focused single-link experience built around a strong mobile presentation.',ar:'تجربة مركزة في رابط واحد مع تركيز قوي على عرض الموبايل.'},stack:'HTML/CSS · JavaScript · Responsive',cat:{en:'App',ar:'تطبيق'},status:{en:'Live',ar:'مباشر'},image:'george-maria-love.svg',live:'https://george-maria-love.vercel.app/',code:'https://github.com/beterelea020-alt/george-maria-love'},
 'ps-shop-pro':{title:'PS Shop Pro',desc:{en:'PlayStation cafe management desktop app for timed sessions, licensing and sales.',ar:'نظام Desktop لإدارة كافيه PlayStation للجلسات المؤقتة والتراخيص والمبيعات.'},overview:{en:'Desktop workflow designed around the day-to-day operation of a PlayStation cafe.',ar:'Workflow مكتبي مبني حول التشغيل اليومي لكافيه PlayStation.'},stack:'JavaScript · Node.js · Windows',cat:{en:'System',ar:'نظام'},status:{en:'Desktop',ar:'Desktop'},image:'ps-shop-pro.svg',code:'https://github.com/beterelea020-alt'},
 'supplements-pos':{title:'Supplements POS',desc:{en:'Retail POS with inventory, invoices and reporting for product sales.',ar:'نظام POS للمبيعات مع المخزون والفواتير والتقارير لسيناريو Retail.'},overview:{en:'A retail-oriented POS workflow connecting sales, inventory and reports.',ar:'Workflow لنظام POS يربط المبيعات بالمخزون والتقارير.'},stack:'React · Node.js · MongoDB',cat:{en:'System',ar:'نظام'},status:{en:'Portfolio',ar:'بورتفوليو'},image:'supplements-pos.svg',code:'https://github.com/beterelea020-alt'},
 'gym-system':{title:'Gym System',desc:{en:'Gym management system for memberships, subscriptions, check-ins and daily operations.',ar:'نظام إدارة جيم للعضويات والاشتراكات والدخول والتشغيل اليومي.'},overview:{en:'A management workflow centered on memberships, subscriptions and front-desk operations.',ar:'نظام إدارة يتمحور حول العضويات والاشتراكات وتشغيل الاستقبال.'},stack:'Node.js · Express · MongoDB',cat:{en:'System',ar:'نظام'},status:{en:'Portfolio',ar:'بورتفوليو'},image:'gym-system.svg',code:'https://github.com/beterelea020-alt'},
 'coachpro':{title:'CoachPro',desc:{en:'Coaching platform with separate admin, coach and client views.',ar:'منصة Coaching بواجهات منفصلة للإدارة والمدرب والعميل.'},overview:{en:'A role-based coaching platform with separate workflows for each user type.',ar:'منصة Coaching بصلاحيات وتدفقات عمل مختلفة لكل نوع مستخدم.'},stack:'React · Node.js · Auth',cat:{en:'System',ar:'نظام'},status:{en:'Portfolio',ar:'بورتفوليو'},image:'coachpro.svg',code:'https://github.com/beterelea020-alt'}
};
const projectImages=Object.fromEntries(Object.entries(projects).map(([id,p])=>[id,p.image]));

const state={
 lang:localStorage.getItem('portfolio-language')==='ar'?'ar':'en',
 theme:localStorage.getItem('portfolio-theme')==='light'?'light':'dark'
};
function getByPath(obj,path){ return path.split('.').reduce((v,k)=>v?.[k],obj); }
function aboutCode(lang){
 if(lang==='ar') return `<span class="keyword">const</span> <span class="variable">developer</span> = {\n  <span class="property">name</span>: <span class="string">"Peter Elia Nasseem Fanous"</span>,\n  <span class="property">brand</span>: <span class="string">"PeterElia.dev"</span>,\n  <span class="property">title</span>: <span class="string">"Full Stack Developer"</span>,\n  <span class="property">location</span>: <span class="string">"Egypt / Remote"</span>,\n  <span class="property">focus</span>: <span class="string">"Stores, POS, dashboards & web apps"</span>,\n\n  <span class="function">describe</span>() {\n    <span class="keyword">return</span> <span class="string">"I care about clean interfaces and software that is useful."</span>;\n  }\n};`;
 return `<span class="keyword">const</span> <span class="variable">developer</span> = {\n  <span class="property">name</span>: <span class="string">"Peter Elia Nasseem Fanous"</span>,\n  <span class="property">brand</span>: <span class="string">"PeterElia.dev"</span>,\n  <span class="property">title</span>: <span class="string">"Full Stack Developer"</span>,\n  <span class="property">location</span>: <span class="string">"Egypt / Remote"</span>,\n  <span class="property">focus</span>: <span class="string">"Stores, POS, dashboards & web apps"</span>,\n\n  <span class="function">describe</span>() {\n    <span class="keyword">return</span> <span class="string">"I care about clean interfaces and software that is useful."</span>;\n  }\n};`;
}
function contactCode(){ return `<span class="keyword">const</span> <span class="variable">links</span> = {\n  <span class="property">name</span>: <span class="string">"Peter Elia Nasseem Fanous"</span>,\n  <span class="property">github</span>: <span class="string">"github.com/beterelea020-alt"</span>,\n  <span class="property">linkedin</span>: <span class="string">"linkedin.com/in/peter-elea-71689935a"</span>,\n  <span class="property">email</span>: <span class="string">"beterelea020@gmail.com"</span>,\n  <span class="property">whatsapp</span>: <span class="string">"01550870190"</span>\n};`; }
function applyLanguage(){
 const lang=state.lang, d=dict[lang];
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-i18n]').forEach(el=>{ if(el.classList.contains('comment')) return; const v=getByPath(d,el.dataset.i18n); if(v!==undefined) el.textContent=v; });
 document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ const v=getByPath(d,el.dataset.i18nPlaceholder); if(v!==undefined) el.placeholder=v; });
 // Section kicker comments include icons, so restore icon + translated text.
 const kickerMap={about:'section.aboutKicker',skills:'section.skillsKicker',projects:'section.projectsKicker',contact:'section.contactKicker'};
 document.querySelectorAll('.section-header .comment').forEach(el=>{ const sec=el.closest('.section')?.id, v=getByPath(d,kickerMap[sec]||''); if(v!==undefined){ const iconMap={about:'solar:user-id-bold',skills:'solar:cpu-bold',projects:'solar:case-round-bold',contact:'solar:letter-bold'}; el.textContent=v; const i=document.createElement('iconify-icon'); i.setAttribute('icon',iconMap[sec]||'solar:dot-line-bold'); el.prepend(i); }});
 document.querySelector('#about-code')?.replaceChildren();
 const ac=document.querySelector('#about-code'); if(ac) ac.innerHTML=aboutCode(lang);
 const cc=document.querySelector('#contact-code'); if(cc) cc.innerHTML=contactCode();
 Object.entries(projects).forEach(([id,p])=>{
   const title=document.querySelector(`.project-card[data-project="${id}"] h3`); if(title) title.textContent=p.title;
   const desc=document.querySelector(`.project-card[data-project="${id}"] .project-info p`); if(desc) desc.textContent=p.desc[lang];
   const detail=document.querySelector(`.project-card[data-project="${id}"] .detail-btn`); if(detail){ detail.lastChild.textContent=' '+d.projects.details; detail.setAttribute('aria-label',`${d.projects.details} ${p.title}`); }
 });
 const mobileLang=document.getElementById('mobile-language-toggle'); if(mobileLang) mobileLang.textContent=lang==='ar'?'EN':'عربي';
 const sidebarLang=document.querySelector('#language-toggle span[data-i18n]'); if(sidebarLang) sidebarLang.textContent=d.language.toggle;
 const themeText=document.querySelector('#theme-toggle span[data-i18n]'); if(themeText) themeText.textContent=lang==='ar'?(state.theme==='dark'?'الوضع الليلي':'الوضع النهاري'):(state.theme==='dark'?'dark mode':'light mode');
 document.title=lang==='ar'?'Peter Elia | مطور Full Stack':'Peter Elia | Full Stack Developer';
 document.querySelector('meta[name="description"]')?.setAttribute('content',lang==='ar'?'Peter Elia — مطور Full Stack. مواقع، متاجر إلكترونية، أنظمة POS وتطبيقات ويب.':'Peter Elia — Full Stack Developer. Websites, online stores, POS systems and web apps.');
}
function setTheme(theme){
 state.theme=theme==='light'?'light':'dark';
 document.documentElement.dataset.theme=state.theme; localStorage.setItem('portfolio-theme',state.theme);
 const desk=document.querySelector('#theme-toggle iconify-icon'); const mob=document.querySelector('#mobile-theme-icon');
 const icon=state.theme==='dark'?'solar:sun-2-bold':'solar:moon-bold'; if(desk) desk.setAttribute('icon',icon); if(mob) mob.setAttribute('icon',icon);
 applyLanguage();
}
document.getElementById('theme-toggle')?.addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
document.getElementById('mobile-theme-toggle')?.addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
document.getElementById('language-toggle')?.addEventListener('click',()=>{state.lang=state.lang==='ar'?'en':'ar';localStorage.setItem('portfolio-language',state.lang);applyLanguage();});
document.getElementById('mobile-language-toggle')?.addEventListener('click',()=>{state.lang=state.lang==='ar'?'en':'ar';localStorage.setItem('portfolio-language',state.lang);applyLanguage();});
setTheme(state.theme);

// ===== Typing effect =====
function typeText(el,text,speed=38){ if(!el) return Promise.resolve(); let i=0; return new Promise(resolve=>{ const timer=setInterval(()=>{el.textContent=text.slice(0,i+1);i++;if(i>=text.length){clearInterval(timer);resolve();}},speed);}); }
async function runTyping(){
 const e=state.lang==='ar';
 await typeText(document.getElementById('typing-name'),'peter_elia_nasseem_fanous');
 await typeText(document.getElementById('typing-role'),e?'Full Stack Developer — Stores, POS & Web Apps':'Full Stack Developer — Stores, POS & Web Apps');
 await typeText(document.getElementById('typing-passion'),e?'"clean UI, useful software"':'"clean UI, useful software"');
}
runTyping();

// ===== Skills reveal =====
const skillObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');skillObserver.unobserve(entry.target);}}),{threshold:.3});
document.querySelectorAll('.skill-item').forEach(item=>skillObserver.observe(item));

// ===== Stat counter =====
const statObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=parseInt(el.dataset.target||'0',10)||0;let current=0;const step=Math.max(1,Math.ceil(target/60));const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer);}el.textContent=current;},25);statObserver.unobserve(el);}),{threshold:.5});
document.querySelectorAll('.stat-number').forEach(el=>statObserver.observe(el));

// ===== Contact -> WhatsApp =====
const form=document.getElementById('contact-form'), formResponse=document.getElementById('form-response');
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.getElementById('name')?.value.trim()||'', email=document.getElementById('email')?.value.trim()||'', subject=document.getElementById('subject')?.value.trim()||'', message=document.getElementById('message')?.value.trim()||'';
 const ar=state.lang==='ar';
 const text= ar
  ? `مرحبًا Peter، أنا ${name}.%0Aالإيميل: ${email}%0Aالمطلوب: ${subject}%0Aتفاصيل المشروع: ${message}`
  : `Hello Peter, I'm ${name}.%0AEmail: ${email}%0AProject: ${subject}%0ADetails: ${message}`;
 window.open(`https://wa.me/201550870190?text=${encodeURIComponent(decodeURIComponent(text))}`,'_blank','noopener');
 if(formResponse){formResponse.textContent=ar?'> تم تجهيز الرسالة وفتح واتساب.':'> message prepared — opening WhatsApp.';formResponse.classList.add('show');}
 form.reset();
});

// ===== Custom cursor =====
const cursor=document.querySelector('.custom-cursor'), follower=document.querySelector('.cursor-follower');
if(window.matchMedia('(pointer:fine)').matches){if(cursor)cursor.style.display='block';if(follower)follower.style.display='block';window.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`;}if(follower){follower.style.left=`${e.clientX}px`;follower.style.top=`${e.clientY}px`;}});}

// ===== Matrix rain =====
const matrixCanvas=document.getElementById('matrix-canvas');
if(matrixCanvas && !LOW_POWER){
 const ctx=matrixCanvas.getContext('2d'); let columns=0,drops=[]; const chars='0123456789<>/{}[];=_+-*PETERELIA01';
 function resizeMatrix(){matrixCanvas.width=window.innerWidth;matrixCanvas.height=window.innerHeight;columns=Math.floor(matrixCanvas.width/18);drops=Array(columns).fill(1).map(()=>Math.random()*-30);}
 resizeMatrix(); window.addEventListener('resize',resizeMatrix);
 setInterval(()=>{ctx.fillStyle='rgba(10,10,10,.065)';ctx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);ctx.fillStyle='#00ff41';ctx.font='14px monospace';for(let i=0;i<drops.length;i++){const t=chars.charAt(Math.floor(Math.random()*chars.length));ctx.fillText(t,i*18,drops[i]*18);if(drops[i]*18>matrixCanvas.height&&Math.random()>.975)drops[i]=0;drops[i]++;}},50);
}

// ===== Ambient particles =====
const particlesCanvas=document.getElementById('particles-canvas');
if(particlesCanvas && !LOW_POWER){
 const pctx=particlesCanvas.getContext('2d');let particles=[];function resizeParticles(){particlesCanvas.width=window.innerWidth;particlesCanvas.height=window.innerHeight;}resizeParticles();window.addEventListener('resize',resizeParticles);
 const colors=['rgba(0,255,65,.5)','rgba(0,212,255,.42)','rgba(189,0,255,.34)'];const count=Math.min(50,Math.floor((window.innerWidth*window.innerHeight)/26000));for(let i=0;i<count;i++)particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.6+.4,dx:(Math.random()-.5)*.25,dy:(Math.random()-.5)*.25,color:colors[Math.floor(Math.random()*colors.length)]});
 function draw(){pctx.clearRect(0,0,particlesCanvas.width,particlesCanvas.height);particles.forEach(p=>{p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>particlesCanvas.width)p.dx*=-1;if(p.y<0||p.y>particlesCanvas.height)p.dy*=-1;pctx.beginPath();pctx.arc(p.x,p.y,p.r,0,Math.PI*2);pctx.fillStyle=p.color;pctx.fill();});requestAnimationFrame(draw);}draw();
}

// ===== Project images fallback + filtering =====
document.querySelectorAll('.project-preview img').forEach(img=>{const slug=img.dataset.slug;let stage=0;img.addEventListener('error',()=>{stage++;if(stage===1)img.src=`${slug}.svg`;else img.closest('.project-preview')?.classList.add('no-preview');});img.src=projectImages[slug]||`assets/${slug}.svg`;});
const chips=[...document.querySelectorAll('.filter-chip')],cards=[...document.querySelectorAll('#projects-grid .project-card')];
chips.forEach(chip=>{const f=chip.dataset.filter;const n=f==='all'?cards.length:cards.filter(c=>c.dataset.cat===f).length;const count=chip.querySelector('.count');if(count)count.textContent=n;chip.addEventListener('click',()=>{chips.forEach(c=>c.setAttribute('aria-pressed',String(c===chip)));cards.forEach(card=>{card.hidden=!(f==='all'||card.dataset.cat===f);});});});

// ===== Project modal =====
const modal=document.getElementById('project-modal'), modalImg=document.getElementById('modal-image'), modalTitle=document.getElementById('modal-title'), modalDesc=document.getElementById('modal-description'), modalCategory=document.getElementById('modal-category'), modalOverview=document.getElementById('modal-overview'), modalStack=document.getElementById('modal-stack'), modalStatus=document.getElementById('modal-status'), modalUrl=document.getElementById('modal-url'), modalTags=document.getElementById('modal-tags'), modalActions=document.getElementById('modal-actions');
let lastFocus=null;
function openProject(id){const p=projects[id];if(!p||!modal)return;lastFocus=document.activeElement;const lang=state.lang;modalImg.src=p.image;modalImg.alt=`${p.title} preview`;modalTitle.textContent=p.title;modalDesc.textContent=p.desc[lang];modalCategory.textContent=p.cat[lang];modalOverview.textContent=p.overview[lang];modalStack.textContent=p.stack;modalStatus.textContent=p.status[lang];modalUrl.textContent=p.live?new URL(p.live).host:'portfolio project';modalTags.innerHTML='';p.stack.split(' · ').forEach(t=>{const s=document.createElement('span');s.className='tag-item';s.textContent=t;modalTags.appendChild(s);});modalActions.innerHTML='';
 const d=dict[lang]; if(p.live){const a=document.createElement('a');a.href=p.live;a.target='_blank';a.rel='noopener noreferrer';a.className='primary';a.innerHTML=`<iconify-icon icon="solar:play-circle-bold"></iconify-icon>${d.modal.openLive}`;modalActions.appendChild(a);} if(p.code){const a=document.createElement('a');a.href=p.code;a.target='_blank';a.rel='noopener noreferrer';a.innerHTML=`<iconify-icon icon="mdi:github"></iconify-icon>${d.modal.openCode}`;modalActions.appendChild(a);} const wa=document.createElement('a');wa.href=`https://wa.me/201550870190?text=${encodeURIComponent((lang==='ar'?'مرحبًا Peter، أنا مهتم بمشروع ':'Hello Peter, I’m interested in ')+p.title)}`;wa.target='_blank';wa.rel='noopener noreferrer';wa.innerHTML=`<iconify-icon icon="logos:whatsapp-icon"></iconify-icon>${d.modal.whatsapp}`;modalActions.appendChild(wa);
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.modal-close')?.focus();}
function closeProject(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus();}
document.querySelectorAll('[data-preview]').forEach(el=>{el.addEventListener('click',e=>{if(el.tagName==='A' && !e.currentTarget.classList.contains('detail-btn')) return;openProject(el.dataset.preview);});if(el.getAttribute('role')==='button')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(el.dataset.preview);}});});
modal?.addEventListener('click',e=>{if(e.target.matches('[data-close-modal],.modal-backdrop'))closeProject();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('open'))closeProject();});

// ===== Project reveal =====
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('entered');revealObserver.unobserve(entry.target);}}),{threshold:.08});
cards.forEach(c=>revealObserver.observe(c));

// Apply current language/theme after all DOM mutations.
applyLanguage();

// ===== PeterElia.dev — premium intro, scroll reveal, and tactile 3D motion =====
// Kept inside script.js so no HTML/CSS file needs to be replaced.
(function initPeterPremiumMotion() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const premiumStyles = document.createElement('style');
  premiumStyles.id = 'peter-premium-motion-styles';
  premiumStyles.textContent = `
    /* Refresh intro: reuses this portfolio's existing neon palette. */
    .pe-intro {
      position: fixed; inset: 0; z-index: 20000; display: grid; place-items: center;
      overflow: hidden; isolation: isolate; color: var(--text-primary, #c9d1d9);
      background: var(--bg-primary, #0a0a0a); opacity: 1; visibility: visible;
      transition: opacity .58s ease, visibility .58s ease;
    }
    .pe-intro::before {
      content: ""; position: absolute; inset: -25%; z-index: -1; pointer-events: none;
      background: radial-gradient(circle at 50% 48%, rgba(0,255,65,.12), transparent 29%),
                  radial-gradient(circle at 52% 50%, rgba(0,212,255,.09), transparent 47%);
      animation: pe-intro-breathe 2.4s ease-in-out infinite alternate;
    }
    .pe-intro-circle {
      position: relative; display: grid; place-content: center; justify-items: center;
      width: min(72vw, 280px); aspect-ratio: 1; border-radius: 50%; text-align: center;
      border: 1px solid rgba(0,255,65,.36);
      background: radial-gradient(circle at 35% 24%, rgba(0,212,255,.10), rgba(13,17,23,.92) 65%);
      box-shadow: 0 0 26px rgba(0,255,65,.12), inset 0 0 34px rgba(0,212,255,.07);
      animation: pe-intro-arrive .82s cubic-bezier(.2,.8,.2,1) both;
    }
    .pe-intro-circle::before, .pe-intro-circle::after {
      content: ""; position: absolute; inset: -9px; border-radius: inherit; pointer-events: none;
    }
    .pe-intro-circle::before {
      border: 2px solid transparent;
      border-top-color: var(--neon-green, #00ff41); border-right-color: var(--neon-blue, #00d4ff);
      filter: drop-shadow(0 0 7px rgba(0,255,65,.38));
      animation: pe-intro-spin 1.65s linear infinite;
    }
    .pe-intro-circle::after {
      inset: -18px; border: 1px dashed rgba(189,0,255,.38);
      animation: pe-intro-spin 8s linear infinite reverse;
    }
    .pe-intro-kicker {
      font: 700 .72rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
      letter-spacing: .26em; color: var(--neon-blue, #00d4ff); text-transform: uppercase;
      margin-bottom: 9px; text-shadow: 0 0 16px rgba(0,212,255,.3);
    }
    .pe-intro-name {
      font: 900 clamp(2.15rem, 10vw, 3.2rem)/.95 Tajawal, sans-serif;
      letter-spacing: .03em; color: var(--neon-green, #00ff41);
      text-shadow: 0 0 12px rgba(0,255,65,.35), 0 0 32px rgba(0,255,65,.12);
    }
    .pe-intro-domain {
      margin-top: 11px; font: 600 .68rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
      letter-spacing: .2em; color: var(--text-secondary, #8b949e);
    }
    .pe-intro-progress {
      position: absolute; bottom: 25%; left: 25%; right: 25%; height: 2px; overflow: hidden;
      border-radius: 999px; background: rgba(139,148,158,.17);
    }
    .pe-intro-progress::after {
      content: ""; display: block; height: 100%; width: 100%; transform: scaleX(0);
      transform-origin: left; border-radius: inherit;
      background: linear-gradient(90deg, var(--neon-green, #00ff41), var(--neon-blue, #00d4ff), var(--neon-purple, #bd00ff));
      animation: pe-intro-progress 1.38s cubic-bezier(.65,0,.35,1) forwards;
    }
    .pe-intro.pe-intro-out { opacity: 0; visibility: hidden; pointer-events: none; }
    .pe-intro.pe-intro-out .pe-intro-circle { animation: pe-intro-exit .48s ease forwards; }

    /* Scroll reveal for the main content. */
    .pe-reveal {
      opacity: 0; transform: translate3d(0, 25px, 0); filter: blur(3px);
      transition: opacity .68s ease, transform .68s cubic-bezier(.2,.7,.2,1), filter .68s ease;
      transition-delay: var(--pe-reveal-delay, 0ms);
    }
    .pe-reveal.pe-revealed { opacity: 1; transform: translate3d(0,0,0); filter: blur(0); }

    /* Gentle perspective follows the mouse, or the finger while touching a card. */
    .pe-tilt-target {
      transform-style: preserve-3d; backface-visibility: hidden; touch-action: pan-y;
      transition: transform .36s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease, border-color .3s ease;
      will-change: transform;
    }
    .pe-tilt-target.pe-tilting { transition: transform .075s linear, box-shadow .2s ease, border-color .2s ease; }
    .pe-tilt-target.pe-tilting { border-color: var(--neon-blue, #00d4ff); }
    .stat-number.pe-count-complete { display: inline-block; animation: pe-number-finish .62s cubic-bezier(.2,.8,.2,1) both; }

    @keyframes pe-intro-spin { to { transform: rotate(360deg); } }
    @keyframes pe-intro-progress { to { transform: scaleX(1); } }
    @keyframes pe-intro-breathe { from { opacity: .55; transform: scale(.94); } to { opacity: 1; transform: scale(1.06); } }
    @keyframes pe-intro-arrive { from { opacity: 0; transform: scale(.72) rotate(-8deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
    @keyframes pe-intro-exit { to { opacity: 0; transform: scale(1.12) rotate(4deg); filter: blur(5px); } }
    @keyframes pe-number-finish { 0% { transform: scale(1); } 45% { transform: scale(1.17); text-shadow: 0 0 18px var(--neon-green, #00ff41); } 100% { transform: scale(1); } }

    @media (max-width: 768px) {
      .pe-intro-circle { width: min(65vw, 250px); }
      .pe-tilt-target.pe-tilting { border-color: var(--neon-green, #00ff41); }
    }
    @media (prefers-reduced-motion: reduce) {
      .pe-intro::before, .pe-intro-circle, .pe-intro-circle::before, .pe-intro-circle::after,
      .pe-intro-progress::after, .pe-intro.pe-intro-out .pe-intro-circle,
      .stat-number.pe-count-complete { animation: none !important; }
      .pe-reveal { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
      .pe-tilt-target, .pe-tilt-target.pe-tilting { transform: none !important; transition: none !important; }
    }
  `;
  document.head.appendChild(premiumStyles);

  // The intro is intentionally generated here so existing index.html stays unchanged.
  const intro = document.createElement('div');
  intro.className = 'pe-intro';
  intro.setAttribute('role', 'status');
  intro.setAttribute('aria-label', 'Portfolio Peter');
  intro.setAttribute('aria-live', 'polite');
  intro.innerHTML = `
    <div class="pe-intro-circle" aria-hidden="true">
      <span class="pe-intro-kicker">PORTFOLIO</span>
      <strong class="pe-intro-name">PETER</strong>
      <span class="pe-intro-domain">ELIA.DEV</span>
      <span class="pe-intro-progress"></span>
    </div>`;
  document.body.appendChild(intro);
  document.body.classList.add('pe-intro-lock');
  document.body.style.overflow = 'hidden';
  const introDelay = reducedMotion ? 420 : 1480;
  window.setTimeout(() => {
    intro.classList.add('pe-intro-out');
    window.setTimeout(() => {
      intro.remove();
      document.body.classList.remove('pe-intro-lock');
      document.body.style.overflow = '';
    }, 620);
  }, introDelay);

  // Reveal selected blocks as they enter the viewport, with a subtle stagger.
  const revealTargets = document.querySelectorAll(
    '.section-header, .stat-card, .skill-category, .project-card, .linkedin-card, .contact-terminal, .info-block'
  );
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('pe-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('pe-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -3% 0px' });

    revealTargets.forEach((el, index) => {
      el.classList.add('pe-reveal');
      el.style.setProperty('--pe-reveal-delay', `${(index % 5) * 65}ms`);
      revealObserver.observe(el);
    });
  }

  // 3D tilt supports both mouse movement and touch dragging without hijacking scroll.
  if (!reducedMotion) {
    const tiltTargets = document.querySelectorAll(
      '#hero-visual, .stat-card, .skill-category, .project-card, .linkedin-card, .terminal-window, .contact-terminal, .info-block'
    );
    tiltTargets.forEach(el => {
      el.classList.add('pe-tilt-target');
      let touchIsDown = false;
      let resetTimer = null;

      const resetTilt = () => {
        touchIsDown = false;
        el.classList.remove('pe-tilting');
        el.style.removeProperty('transform');
        el.style.removeProperty('box-shadow');
      };

      el.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch') touchIsDown = true;
        if (resetTimer) window.clearTimeout(resetTimer);
      }, { passive: true });

      el.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch' && !touchIsDown) return;
        if (event.pointerType === 'mouse' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        const strength = event.pointerType === 'touch' ? 5 : 8;
        const rotateY = (x - .5) * strength * 2;
        const rotateX = (.5 - y) * strength * 1.5;
        const scale = event.pointerType === 'touch' ? 1.006 : 1.012;

        el.classList.add('pe-tilting');
        el.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0) scale(${scale})`;
        if (event.pointerType === 'mouse') {
          el.style.boxShadow = '0 18px 46px rgba(0, 212, 255, .12), 0 0 24px rgba(0, 255, 65, .06)';
        }
      }, { passive: true });

      el.addEventListener('pointerup', () => {
        if (!touchIsDown) return;
        resetTimer = window.setTimeout(resetTilt, 260);
      }, { passive: true });
      el.addEventListener('pointercancel', resetTilt, { passive: true });
      el.addEventListener('pointerleave', resetTilt, { passive: true });
      el.addEventListener('blur', resetTilt, { passive: true });
    });
  }

  // Give each existing count-up number a small finish pulse once it reaches its target.
  const completedCounters = new WeakSet();
  const counterWatcher = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const el = mutation.target;
      if (!el.matches?.('.stat-number') || completedCounters.has(el)) return;
      const target = Number.parseInt(el.dataset.target || '0', 10) || 0;
      const current = Number.parseInt(el.textContent || '0', 10) || 0;
      if (current >= target) {
        completedCounters.add(el);
        el.classList.add('pe-count-complete');
      }
    });
  });
  document.querySelectorAll('.stat-number').forEach(el => counterWatcher.observe(el, { childList: true, characterData: true, subtree: true }));
})();
