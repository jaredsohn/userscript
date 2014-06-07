// ==UserScript==
// @name        Tribal Wars Masters Czech
// @namespace   tribal-wars-masters-czech
// @description Translate tribalwarsmasters.net to the czech...
// @include     htt*://ts*.tribalwarsmasters.net/*
// @version     v0.1
// ==/UserScript==


// Main menu
document.body.innerHTML = document.body.innerHTML.replace(/Overviews/g, "Náhledy");
document.body.innerHTML = document.body.innerHTML.replace(/Reports/g, "Oznámení");
document.body.innerHTML = document.body.innerHTML.replace(/Mail/g, "Zprávy");
document.body.innerHTML = document.body.innerHTML.replace(/Tribe/g, "Kmen");
document.body.innerHTML = document.body.innerHTML.replace(/Settings/g, "Nastavení");
document.body.innerHTML = document.body.innerHTML.replace(/Premium/g, "Prémium");
document.body.innerHTML = document.body.innerHTML.replace(/Notebook/g, "Poznámky");
document.body.innerHTML = document.body.innerHTML.replace(/Log out/g, "Odhlásit");
document.body.innerHTML = document.body.innerHTML.replace(/Ranking/g, "Žebříček");
document.body.innerHTML = document.body.innerHTML.replace(/Farm Assistant/g, "Pomocník rabování");
document.body.innerHTML = document.body.innerHTML.replace(/Account Manager/g, "Správce účtu");
document.body.innerHTML = document.body.innerHTML.replace(/Farm_assistent.png/g, "farm_assistent.png");



// Description of buildings
document.body.innerHTML = document.body.innerHTML.replace(/In the village headquarters you can construct new buildings or upgrade existing ones. The higher the level of your headquarters, the faster the constructions will be finished. As soon as your Village Headquarters are upgraded to level 15, you will be able to demolish buildings in this village./g, "V hlavní budově zřídíš nové budovy nebo vylepšíš již ty stávající. Čím vyšší stupeň hlavní budova má, tím rychleji se budou jiné budovy stavět. Jakmile Hlavní budova dosáhne stupně 15, je možné budovy bourat.");
document.body.innerHTML = document.body.innerHTML.replace(/On the rally point your fighters meet. Here you can command your armies./g, "Na nádvoří se seskupují bojovníci. Zde můžeš zadávat jednotkám povely k útoku a přesunovat je.");
document.body.innerHTML = document.body.innerHTML.replace(/At the statue the villagers render homage to your paladin. If your paladin dies you can appoint one of your fighters new paladin./g, "Obyvatelé vesnice vzdávají úctu u sochy, patřící tvému Paladinu. Pokud tvůj Paladin padne, můžeš zde povýšit jednoho tvého bojovníka na Paladina.");
document.body.innerHTML = document.body.innerHTML.replace(/Outside of your village in the dark forests your lumberjacks cut massive trees to produce wood in the timber camp, which is needed for buildings and weapons. The higher its Stupeň the more wood is produced./g, "Tví dřevorubci kácejí v hustém lese masivní stromy. Dřevo je potřeba při výstavbě tvé vesnice, ale je důležité také pro výrobu zbraní. Čím vyšší stupeň dřevorubci mají, tím rychlejší je těžba dřeva.");
document.body.innerHTML = document.body.innerHTML.replace(/In the clay pit your workers extract clay, which is important for new buildings. The higher its Stupeň the more clay is produced./g, "Lom dodává pracovníkům důležitou hlínu, k výstavbě tvé vesnice. Čím vyšší stupeň vývoje lom má, tím rychlejší je těžba.");
document.body.innerHTML = document.body.innerHTML.replace(/In the iron mine your workers dig the war-crucial iron. The higher its Stupeň the more iron is produced./g, "V železném dolu kutají dělníci železo, které je rozhodující pro výrobu zbraní. Čím vyšší stupeň důl má, tím rychlejší je těžba železa.");
document.body.innerHTML = document.body.innerHTML.replace(/The farm supplies your workers and troops with food. Without extending your farm your village cannot grow. The higher its Stupeň the more villagers can be supplied./g, "Selský dvůr zásobuje tvé pracovníky a bojovníky stravou. Bez výstavby selského dvora na vyšší stupně, tvá vesnice neporoste. Čím vyšší stupeň selský dvůr má, tím více obyvatel je možné zaopatřit jídlem.");
document.body.innerHTML = document.body.innerHTML.replace(/The warehouse stores your resources. The higher its Stupeň the more resources can be stored./g, "Ve Skladišti můžeš ukládat všechny suroviny, které tvá vesnice vyprodukuje. Čím vyšší stupeň skladiště má, tím vyšší je kapacita.");
document.body.innerHTML = document.body.innerHTML.replace(/Resources in your hiding place cannot be plundered by your enemies. The bigger it is, the more it can hold. There is no place to hide your troops though. Even your enemies' scouts cannot spot the resources hidden in your hiding place./g, "Ve skrýši se dají schovat suroviny, aby je útočník nemohl vyrabovat. Ani nepřátelští zvědové neodhalí, kolik surovin se nachází ve skrýši. Špehové tvého nepřítele neuvidí suroviny ukryté ve skrýši.");
document.body.innerHTML = document.body.innerHTML.replace(/In the barracks you can recruit infantry. The higher its Stupeň the faster the recruitment of troops will be finished./g, "V Kasárnách můžeš zrekrutovat pěchotu. Čím vyšší je stupeň budovy, tím rychleji můžeš jednotky vycvičit.");
document.body.innerHTML = document.body.innerHTML.replace(/In the stables you can recruit cavalry. The higher its Stupeň the faster the recruitment of the troops will be finished./g, "Ve Stájích se zrekrutují jezdci. Čím vyšší je stupeň budovy stájí, tím rychleji můžeš své jezdce vycvičit.");
document.body.innerHTML = document.body.innerHTML.replace(/In the workshop you can produce rams and catapults. The higher its Stupeň the faster the recruitment will be finished./g, "V dílně se vyrábí zbraně pro obléhání. Čím vyšší stupeň dílna má, tím rychleji můžeš jednotky vycvičit.");
document.body.innerHTML = document.body.innerHTML.replace(/In the academy you can educate noblemen. Noblemen allow you to conquer other villages./g, "Na panském dvoře se vychovávají šlechtici, s jejichž pomocí můžeš dobývat a získávat vesnice jiných hráčů.");
document.body.innerHTML = document.body.innerHTML.replace(/In the smithy you can research and improve weapons. Upgrading the smithy allows the research of better weapons and decreases the research time./g, "V kovárně se zkoumají a vylepšují zbraně. Čím vyšší stupeň kovárna má, tím rychleji a o to lepší zbraně můžeš produkovat.");
document.body.innerHTML = document.body.innerHTML.replace(/On the market you can trade with other players./g, "Na tržišti můžeš obchodovat s jinými hráči, nebo jim odtud zasíláš suroviny.");



// Buildings
document.body.innerHTML = document.body.innerHTML.replace(/Village Headquarters/gi, "Hlavní budova");
document.body.innerHTML = document.body.innerHTML.replace(/Barracks/g, "Kasárna");
document.body.innerHTML = document.body.innerHTML.replace(/Stable/g, "Stáj");
document.body.innerHTML = document.body.innerHTML.replace(/Smithy/gi, "Kovárna");
document.body.innerHTML = document.body.innerHTML.replace(/Rally point/gi, "Nádvoří");
document.body.innerHTML = document.body.innerHTML.replace(/Statue/g, "Socha");
document.body.innerHTML = document.body.innerHTML.replace(/Market/g, "Tržiště");
document.body.innerHTML = document.body.innerHTML.replace(/Timber camp/gi, "Dřevorubec");
document.body.innerHTML = document.body.innerHTML.replace(/Clay pit/gi, "Lom na těžbu hlíny");
document.body.innerHTML = document.body.innerHTML.replace(/Iron mine/gi, "Železný důl");
document.body.innerHTML = document.body.innerHTML.replace(/Farm/g, "Selský dvůr");
document.body.innerHTML = document.body.innerHTML.replace(/Warehouse/gi, "Skladiště");
document.body.innerHTML = document.body.innerHTML.replace(/Hiding place/gi, "Skrýš");
document.body.innerHTML = document.body.innerHTML.replace(/Wall/g, "Opevnění");
document.body.innerHTML = document.body.innerHTML.replace(/Workshop/gi, "Dílna");
document.body.innerHTML = document.body.innerHTML.replace(/Academy/gi, "Panský dvůr");


document.body.innerHTML = document.body.innerHTML.replace(/Building fully constructed/g, "Budova je kompletně dostavěna");
document.body.innerHTML = document.body.innerHTML.replace(/Required:/g, "Zapotřebí:");
document.body.innerHTML = document.body.innerHTML.replace(/level/g, "stupeň");
document.body.innerHTML = document.body.innerHTML.replace(/Level/g, "Stupeň");
document.body.innerHTML = document.body.innerHTML.replace(/Show all buildings/g, "Zobrazit všechny stupně budovy");
document.body.innerHTML = document.body.innerHTML.replace(/Hide completed buildings/g, "Skrýt dokončené budovy");
document.body.innerHTML = document.body.innerHTML.replace(/Change village name/g, "Změnit jméno vesnice");
document.body.innerHTML = document.body.innerHTML.replace(/Change/g, "Změnit");
document.body.innerHTML = document.body.innerHTML.replace(/Help on buildings/g, "Nápověda k budovám");
document.body.innerHTML = document.body.innerHTML.replace(/not constructed/g, "není k dispozici");
document.body.innerHTML = document.body.innerHTML.replace(/Construct/g, "Postavit");
document.body.innerHTML = document.body.innerHTML.replace(/Budovy/g, "Buildings");
document.body.innerHTML = document.body.innerHTML.replace(/Requirements/g, "Potřeba");
document.body.innerHTML = document.body.innerHTML.replace(/Building time/g, "Doba stavby");
document.body.innerHTML = document.body.innerHTML.replace(/Construct/g, "Postavit");
document.body.innerHTML = document.body.innerHTML.replace(/Map/g, "Mapa");
document.body.innerHTML = document.body.innerHTML.replace(/Expansion to/g, "Rozšířit na");
document.body.innerHTML = document.body.innerHTML.replace(/20% reduced costs/g, "Zredukované náklady o 20%");
document.body.innerHTML = document.body.innerHTML.replace(/reduced/g, "redukce");


document.body.innerHTML = document.body.innerHTML.replace(/Resources available today at/g, "Suroviny jsou k dispozici dnes v");




