// ==UserScript==
// @name            Google Calendar Quote Mod
// @description     This script adds a nice quote for every day
// @version         1.0
// @author          theNightFox
// @include         https://*.google.*/calendar/*
// @include         http://*.google.*/calendar/*
// ==/UserScript==	

window.onload = function()
{
	//adding the quote
	var currentDate = new Date();
	var day = (currentDate.getMonth()*30+currentDate.getDate())%100;
	var quote = quotes[day];
	
	var newdiv = document.createElement('div');
	
	newdiv.setAttribute('id','quote');
	newdiv.setAttribute('style','font-family:"Comic Sans MS",Palatino,Arial;font-size:20px;color:#555555;padding:3px 5px 7px 5px');	
	newdiv.innerHTML = quote;

	var gridContainer = document.getElementById('gridcontainer');
	var nextElement = document.getElementById('topcontainerwk');
	var insertedElement = gridContainer.insertBefore(newdiv, nextElement);	
}

var quotes = new Array();
quotes =
['',
'Oricât de frumoasa ar fi o melodie, vine o clipa când ea e acoperita de tacere. – O. Paler',
 'Un zâmbet este o curba care face totul drept. – Phillis Diller',
'Un zâmbet este o modalitate necostisitoare de a-ti schimba înfatisarea. – Charles Gordy',
'Zâmbetul e  fericirea care se afla chiar sub nasul tau.',
'Merita sa te lasi cuprins de iluzii, pentru a simti realitatea.',
'Da fiecarei zile sansa de a deveni cea mai frumoasa zi din viata ta.',
'Daca vei juca rolul unui geniu vei deveni unul.',
'Am vrut sa creez dreptul de a îndrazni totul.',
'Nu exista particula de viata care sa nu poarte în sine poezie.',
'Femeile stiu sa spuna o mie si o suta de nimicuri într-un mod mai interesant decât spun barbatii lucrurile cele mai serioase.',
'Orice inima are un marsupiu pentru copilul de altadata. – Ghica',
'Sa faci cu usurinta ceea ce pentru altii este greu înseamna talent; sa faci ce e imposibil pentru talent se numeste geniu. H.F. Amiel',
'O chirurgie a iluziilor ne-ar lasa cu privirile decolorate. – Ghica',
'Bunatatea este limbajul pe care surdul îl poate auzi, iar orbul îl poate vedea. Twain',
'Nu voi fi un om obisnuit, pentru ca am dreptul sa fiu extraordinar.',
'Tu esti singura persoana care-ti poate folosi abilita?ile. Aceasta este o responsabilitate enorma pentru ca, în calitate de administrator al talentului si aptitudinilor tale, nu ai de ales. Ai fost înzestrat cu ceva ce doar tu poti dezvolta. Z. Ziglar',
'Asteptati-va la ce-i mai bun. Pregatiti-va pentru ce-i mai rau. Profitati de ceea ce  vine !',
'To know what you want. To understand why you\'re doing it. To dedicate every breath in your body to achieve...if you feel you have something to give, if feel that your particular talent is worth developing, is worth paying for, then there is NOTHING you can\'t achieve. K. Spacey.',
'Peste douazeci de ani vei fi mult mai dezamagit de lucrurile pe care nu le-ai facut decât de cele pe care le-ai facut. Deci, ridica ancora. Navigheaza departe. Prinde vânturi in vele.  Exploreaza. Viseaza. Descopera.',
'Haideti sa -i inspiram pe ceilalti sa viseze, sa învete si sa faca mult mai mult.',
'Muzica este sufletul limbajului.',
'Muzica este vinul care umple cupa tacerii.',
'Muzica este cea mai puternica forma de magie.',
'Nimic, niciodata, nu va înlocui pe camaradul pierdut. Caci nu pot fi creati vechi camarazi. – Antoine de Saint Exupery',
'Prietenia este, în primul rând, pacea reciproca si zborul spiritului pe deasupra amanuntelor vulgare. – Antoine de Saint-Exupery',
'Inima are taine pe care nicio ratiune nu le patrunde. – Guy de Maupassant',
'Nu conteaza atât de mult ce faci, ci câta dragoste pui în ceea ce faci.',
'Dragostea consta în dorinta de a da ceea ce este al tau altuia si de a simti fericirea acestuia ca si cum ar fi a ta',
'Omul are nevoie de dragoste. Viata fara duiosie si fara iubire nu e decât un mecanism uscat, scârtâitor si sfâsietor.',
'Poate ca pentru lume esti o singura persona, dar pentru o anumita persoana, esti întreaga lume.',
'Adevarul este un fruct care nu trebuie cules decât atunci când este complet copt. – Voltaire',
'Cu cât o greseala ne orbeste mai mult si este mai ademenitoare, cu atât este mai mare triumful adevarului.',
'Viata este precum o melodie frumoasa, numai versurile sunt o încurcatura.',
'Ca o piesa de teatru, asa este viata: nu intereseaza cât de mult a tinut, ci cât de frumos s-a desfasurat.',
'Nu trai în trecut, nu visa la viitor, concentreaza-ti toate eforturile în prezent. – Buddha',
'Fericirea consta, în primul rând, în sanatate. - George William Curtis',
'Asculta tot, dar nu crede tot.',
'Viata este cautarea nimicului dupa ceva-Christian Morgnstern',
'Viata este ceea ce ti se întâmpla în timp ce esti ocupat sa faci alte planuri.',
'Daca iubesti viata, si viata te va iubi pe tine. Arthur Rubinstein',
'Nimeni nu poate sa se întoarca în timp si sa fabrice un nou început, dar oricine poate începe azi si sa fabrice un nou sfârsit.',
'Viata e plina de fumusete. Observ-o. Observa albinele, copiii, fetele zâmbitoare. Miroase ploaia si simte vântul. Traieste-ti viata la întregul ei potential,si lupta pentru visele tale.',
'Doare sa iubesti pe cineva care sa nu te iubeasca la rândul lui, dar cel mai dureros este sa iubesti pe cineva si sa nu gasesti niciodata curajul de a-i spune ce simti',
'Râde atâta timp cât respiri si iubeste atâta timp cât traiesti.',
'Existi doar în ceea ce faci -Federico Fellini',
'Pentru a reusi în viata, ai nevoie de doua lucruri: de ignoranta si de încredere.',
'Prietenia este una din mângâierile vietii.',
'A scoate prietenia din viata e ca si cum am scoate soarele din lume',
'Nu înceta niciodata sa zâmbesti, nici chiar atunci când esti trist, pentru ca nu se stie cine se poate îndragosti de zâmbetul tau.- Gabriel José García Márquez',
'Invinge durerea, razi cat se poate, caci tot la zi ajunge si cea mai lunga noapte...” William Shakespeare',
'În viaa nu conteaza unde te afli, ci pe cine ai alaturi.', 
'Nu-mi dati sfaturi! Stiu sa gresesc si singur!  Immanuel Kant',
'Gaseste curajul de a fi tu însuti, chiar daca înca nu stii cine esti! Paulo Coelho',
'Ceea ce nu traim la timp, nu mai traim niciodata." Octavian Paler',
'Rareori ne gândim la ceea ce avem, dar mereu la ceea ce ne lipseste. Schopenhauer',
'Daca lup?i po?i sa pierzi, daca nu lup?i ai pierdut deja.', 
'Fericirea este ca o minge: alergam dupa ea si cum am prins-o îi dam cu piciorul. Duisseux',
'Fericirea este ceva care nu se atinge niciodata, dar in cautarea ei merita sa alergi toata viata',  
'Spune lumii ce gândesti nu ce vor sa auda.  Cosmin Negoitescu',
'Cel mai rau fel in care simti absenta unei persoane este sa stai langa aceasta dar sa stii ca nu va fi niciodata a ta. Stanciu Valentin',
'Un copil poate oricând sa învete un adult trei lucruri: cum sa fie multumit fara motiv, cum sa nu stea locului niciodata ?i cum sa ceara cu insistenta ceea ce îsi doreste. Paulo Coelho', 
'Cand o usa se închide, o alta se deschide; dar deseori ne uitam atât de mult la usa închisa ca nu o mai vedem pe cea care s-a deschis pentru noi. Hellen Adams Keller',
'Suferinta apare atunci cand asteptam ca ceilalti sa ne iubeasca in felul dorit de noi" Paulo Coelho',
'Nu merita sa plângi pentru nimeni, iar cei care merita nu te vor face sa plângi. Gabriel José García Márquez',
'Gasesc televizorul foarte educational. De fiecare data când cineva da drumul la televizor, ma duc in cealalta camera si citesc o carte. Groucho Marx',
'Nu stiu ce e mai bun, raul care aduce folos, sau binele care dauneaza. Niccolo Machiavelli', 

'Nu suferim în urma socului provocat de traume ci îl folosim în interesul nostru. Alfred Adler', 
'Inima se ofera in intregime,nu in bucatele Buciac Ioan Gabriel',
'Daca ti-ai pierdut credinta in Dumnezeu nimic nu te mai poate salva - Cosmin Negoitescu', 
'Sufletul nu se cerceteaza,el se simte-Buciac Ioan Gabriel',
'Daca vrei sa fii fericit o clipa, razbuna-te, daca vrei sa fii fericit o viata, iarta!', 
'Nimeni nu-si va aduce aminte de tine pentru gândurile tale secrete - Gabriel Garcia Marquez',
'O zi în care nu ai râs, este o zi pierduta- Charlie Chaplin', 
'Prefer sa fiu criticat pentru ceea sunt decât iubit pentru ceea ce nu sunt - Kurt Kobain',
'Prietenia se naste in clipa in care o persoana ii spune alteia: “Ce, si tu?Credeam ca eu sunt singurul.” -C. S. Lewis',
 'Lucrurile nu sunt greu de facut. Greu este sa te pui în starea de a le face - Constantin Brâncusi',
'Daca privim în directia buna, tot ce mai trebuie sa facem este sa mergem înainte', 
'E în zadar sa vorbesti celui care nu vrea sa te asculte.-Mihai Eminescu',
'Când ti-e dor de cineva, sa nu închizi ochii. O sa-ti fie si mai dor - Tudor Musatescu',
'A avea curaj înseamna sa te ridici si sa vorbesti.Tot de curaj însa ai nevoie ca sa stai si sa asculti-Winston Churchill',
'Promoveaza lucrurile pe care le iubesti în loc sa le blamezi pe cele pe care le urasti', 
'Omul întelept nu spune tot ce gândeste, dar ce spune, gândeste..- Aristotel', 
'Nu plange pentru ca s-a terminat, zâmbeste pentru ca s-a petrecut. - Gabriel Jose Garcia Marquez', 
'Viseaza ca si când ai trai pentru totdeauna, traieste ca si când ai muri azi.- James Dean', 
'Cele mai importante doua zile din viata ta sunt ziua în care te-ai nascut si cea în care afli - Mark Twain', 
'Daca toti copiii ar ajunge ce doresc parintii lor, lumea ar fi plina de genii care nu muncesc- A.Poincelot',
'Stai un minut cu mana pe o soba incinsa si ti se va parea c-ai stat o ora. Stai o ora langa o fata frumoasa si ti se va parea c-ai stat un minut. Ei, asta-i relativitatea!- Albert Einstein',
'Nu ma gândesc la viitor, va veni el oricum.- Albert Einstein', 
'Sa nu cauti niciodata sa fi fericit cu pretul fericirii altuia. Este urat,inuman.', 
'Nu e nimic mai interesant decât sa te întorci într-un loc care a ramas neschimbat ca sa îti dai seama cât de mult te-ai schimbat tu. Nelson Mandela',
'Învinge durerea, fii vesel cât se poate, caci tot la zi ajunge ?i cea mai lunga noapte! William Shakespeare',
'Prietenia sfârseste acolo unde începe neîncrederea. -Seneca',
'Viata nu este despre cum supravietuiesti în furtuna, ci despre cum dansezi in ploaie.', 
'Cea mai buna medicina e sa plangi uneori! Mihai Dumitrescu', 
'Da sansa fiecarei zile sa fie cea mai frumoasa din viata ta - Mark Twain', 
'Nu întotdeauna trebuie sa întoarcem pagina, uneori trebuie s-o rupem.', 
'Prieten adevarat e cel care, chiar daca te cunoaste bine, continua sa te placa. - Elbert Hubbard',
'Sunt momente în viata când ti-e atât de dor de cineva, încât îti vine sa-l scoti din visele tale si sa-l îmbratisezi cu adevarat!', 
'Viata poate fi înteleasa numai privind înapoi, dar trebuie traita privind înainte. Soren Aabye Kierkegaard',
'Exista batalii pe care e bine sa le ocolesti; nu din teama ca le-ai putea pierde, ci pentru ca ai deveni ridicol câstigându-le - Gelu Negrea']
