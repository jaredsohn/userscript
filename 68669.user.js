// ==UserScript==
// @name           Tee Eff Too
// @namespace      Dark
// @description    makes sweet love to Dark
// @include        *endoftheinter.net*
// ==/UserScript==  



var allboards = true;

var dictionary = {
"Dark": "Dark (skulker)",
"SpyVsSpy": "SpyVsSpy (SpeeVsSpee)",
"Cockspider": "Cockspider (Dial M For Motherfucker)",
"JrMan": "JrMan (JrMan)",
"rudyangulo": "rudyangulo (calargo)",
"Word": "Word (Your buddy, Keith)",
"Gamerguy Zero": "Gamerguy Zero (Stupid_n00b)",
"Villainous Sephiroth": "Villainous Sephiroth (slyboots)",
"Slyboots": "Slyboots (slyboots)",
"stealth24": "stealth24 (diane rehm)",
"One Eyed Griff": "One Eyed Griff (Griff, The Fungineer)",
"steviestar3": "steviestar3 (steviestar)",
"bloodshadow323": "bloodshadow323 (monkeyscythe)",
"Multi Koopa": "Multi Koopa (MultiKoopa)",
"Rogue Skateboarder": "Rogue Skateboarder (brodeo)",
"BlastoiseMaster": "BlastoiseMaster (Blastoise!)",
"A_Mong00se": "A_Mong00se (Uh Shenanigans)",
"panther34": "panther34 (A Faggot Bird)",
"mega man is kool": "mega man is kool (mmik)",
"cheesebanana": "cheesebanana (cheesebanana)",
"eyebrow": "eyebrow (supereyebrow)",
"Da White Hegehog": "Da White Hegehog (Fat Pidgeon)",
"Teddy Roosevelt": "Teddy Roosevelt (Teddy)",
"Uber Nooblar": "Uber Nooblar (Uber Nooblar)",
"Cyberwolf": "Cyberwolf (Lynx the Shark)",
"Lucifer": "Lucifer (/A/ Potemkin Buster)",
"lightmass": "lightmass (du$q)",
"snorelax15o": "snorelax15o (DragonJTS)",
"electricpostman": "electricpostman (monkeyscythe)",
"Punk In Drublic 18": "Punk in Drublic 18 (JMRboosties)",
"HomeBurger": "HomeBurger (HomeBurger)",
"radioactivecubes": "radioactivecubes (radioactivebro)",
"LtK": "LtK (LtK)",
"electricpostman": "electricpostman (electric!)",
"exe": "exE (GoD FoRgIvE mE iF I BUsS mY 9)",
"drifterofhell": "drifterofhell (rockman, The Pybro)",
"Xeinok": "Xeinok (Xeinok)",
"DramaDramaLlama": "DramaDramaLlama (Milksplooge)",
"Knight Darkness": "Knight Darkness (Skeith)",
"ssj vegeta2002": "ssj vegeta2002 (williamthegoat)",
"thegreatsaiyaman": "thegreatsaiyaman (bobwhoops)",
"Genodice": "Genodice (Chicago Kawks)",
"Aurulieus": "Aurulieus (Ritz)",
"TormakSaber": "TormakSaber (TormakSaber)",
"SMETTBO": "SMETTBO (SMETTBO)",
"The Dark Unknown": "The Dark Unknown (Beako)",
"starwarsguy": "starwarsguy (Malkhuth)",
"KeithX": "KeithX (Code)",
"Yuor Faec": "Yuor Faec (yuor faec)",
"GreenRanger93": "GreenRanger93 (Compu\u03BBacker)",
"Miles Tails Prower": "Miles Tails Prower (Cup of n00bles)",
"Gillette Series": "Gillette Series (Gillette)",
"Tiddlywinks": "Tiddlywinks (Desu/Dickbutt/That Guy)",
"Person With GBA": "Person With GBA (Jabs McGillicutty)",
"Game And Watch": "Game And Watch (Dramalinks)",
"Rogue Skateboarder": "Rogue Skateboarder (brodeo)",
"Protomanexe21": "Protomanexe21 (smellyhairyhippie)",
"NoBullet": "NoBullet (NoBullet)",
"arbysovenmitt": "arbysovenmitt (Slowbro)",
"Inert": "Inert (I Love Dicks)",
"WatermelonBro": "WatermelonBro (Vaudeville Melon)",
"j10jep2": "j10jep2 (j10jep2)",
"vaheiscool": "vaheiscool (snorLax)",
"NSDS3HvLDjJd": "NSDS3HvLDjJd (EDEdDNEdDYFaN)",
"AeonX": "AeonX (aeon)",
"Used Pokeball": "Used Pokeball (Used Pokeball)",
"HungryJackt3hHamster": "HungryJackt3hHamster (Bradical)",
"Legalize It": "Legalize It (Legalize It)",
"AnarchicActivist": "anarchicactivist (USSR)",
"Dangerous Man": "Dangerous Man (Dr. Peter Venkman)",
"Smithy": "Smithy (Smithy)",
"Superloserboy": "Superloserboy (The Asylum)",
"Rubee": "Rubee (Crime)",
"Plaid Sausage": "Plaid Sausage (midgarmerc)",
"k4r1": "k4r1 (k4r1)",
"Megan Fox": "Megan Fox (ANGRYBARREL)",
"Dan": "Dan (Dan)",
"HHH546": "HHH546 (CygnusSyrinx)",
"Deadlocked": "Deadlocked (.:Deadlocked:.)",
"Bells": "Bells (mont)",
"CloudSK 2": "CloudSK 2 (CloudSephirothkiller)",
"Videogamemaster5": "Videogamemaster5 (Minorou)",
"ravens02": "ravens02 (aurens)",



};


function update() {
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
if (/profile\.php/.test(a[i].href)) {
if (dictionary[a[i].textContent]) {
a[i].textContent = dictionary[a[i].textContent];
}
}
}
}

if (allboards || /board=-8[456]/.test(document.location.search)) {
update();
document.addEventListener("DOMNodeInserted", update, false);
}