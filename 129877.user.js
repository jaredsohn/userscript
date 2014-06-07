// ==UserScript==
// @name           sanitize the int3rw3b
// @namespace      http://sanitazi.go-here.nl
// @description    Entertaining the most boring articles on the interweb so that you don't have to.
// @include        *
// @exclude        *google.com*
// @downloadURL   https://userscripts.org/scripts/source/129877.user.js
// @updateURL     https://userscripts.org/scripts/source/129877.meta.js
// ==/UserScript==

x = document.body.innerHTML;


// Retropropaganda

x = x.replace(/Social/g, "Communist");
x = x.replace(/social/g, "communist");

x = x.replace(/consumer/g, "proletariat");
x = x.replace(/Consumer/g, "Proletariat");

x = x.replace(/customer/g, "proletariat");
x = x.replace(/Customer/g, "Proletariat");

x = x.replace(/average person/g, "Proletariat");



// Orwellian self-lobotomy

x = x.replace(/America/g, "Oceania");
x = x.replace(/United States/g, "Oceania");
x = x.replace(/the US/g, "Oceania");
x = x.replace(/The US/g, "Oceania");
x = x.replace(/US\s/g, "Oceania ");
x = x.replace(/\sUS/g, " Oceania");
x = x.replace(/U\.S\.A\./g, "Oceania");
x = x.replace(/U\.S\./g, "Oceania");

x = x.replace(/Britain/g, "Landing Strip One");

x = x.replace(/England/g, "Landing Strip One");

x = x.replace(/British/g, "EngSoc");

x = x.replace(/English/g, "Engsoc");
x = x.replace(/Language/g, "Newspeak");

x = x.replace(/Russia/g, "Soviet russia");

x = x.replace(/Israeli/g, "Oceanian");
x = x.replace(/Israel/g, "Oceania");

x = x.replace(/Mexico/g, "Oceania");
x = x.replace(/Mexican/g, "Oceanian");

x = x.replace(/China/g, "Eastasia");
x = x.replace(/Chinese/g, "Eastasian");

x = x.replace(/Afghanistan/g, "Eastasia");
x = x.replace(/Afghani/g, "Eastasia");
x = x.replace(/Afghan/g, "Eastasia");

x = x.replace(/European union/g, "Department of Eurazia");

x = x.replace(/European Union/g, "Department of Eurazia");

x = x.replace(/Europe/g, "Eurazia");

x = x.replace(/Europa/g, "Eurazia");

x = x.replace(/The EU/g, "Eurazia");

x = x.replace(/ EU/g, " Eurazia");
x = x.replace(/EU /g, "Eurazia ");



// Politically correct section

x = x.replace(/Drugs/g, "Dope");
x = x.replace(/drugs/g, "dope");

x = x.replace(/worker/g, "Slave");
x = x.replace(/Worker/g, "Slave");

x = x.replace(/Employment/g, "Enslavement");
x = x.replace(/employment/g, "enslavement");

x = x.replace(/information/g, "data"); // When the interweb refers to "information" what they really mean is "data".
x = x.replace(/Information/g, "Data");

x = x.replace(/intelligence community/g, "unintelligence community"); // This is funny because it makes the unintelligence workers furuious.
x = x.replace(/Intelligence community/g, "Unintelligence community");
x = x.replace(/Intelligence Community/g, "Unintelligence Community");

x = x.replace(/Secrets/g, "SECRETS"); // CAPS LOCK IS CRUISE CONTROL FOR COOL1!!1
x = x.replace(/Secret/g, "SECRET");

x = x.replace(/(n|N)ational (s|S)ecurity purposes/g, "THE KING\'s purposes");

x = x.replace(/(n|N)ational (S|s)ecurity/g, "THE KING");

x = x.replace(/banking/g, "ponzi"); // "Ponzi sector", "ponzi crisis" etc

x = x.replace(/the oil industry/g, "big oil");

x = x.replace(/Washington/g, "Warsingtoon");

x = x.replace(/Hollywood/g, "Disney Land");

x = x.replace(/the government/g, "THE GOVERNMENT");

x = x.replace(/government/g, "GOVERNMENT");

x = x.replace(/Presidential/g, "Royal");
x = x.replace(/presidential/g, "royal");

x = x.replace(/the president/g, "mein Führer");
x = x.replace(/president/g, "Führer");
x = x.replace(/President/g, "Führer");
x = x.replace(/Govenor/g, "Overseer");
x = x.replace(/Manager/g, "Puppetmaster");
x = x.replace(/manager/g, "puppetmaster");

x = x.replace(/money/g, "monetardy coupons");
x = x.replace(/currency/g, "monetardy coupons");

x = x.replace(/dollar/g, "petrodollar");
x = x.replace(/Dollar/g, "petrodollar");
x = x.replace(/USD/g, "petrodollars");

x = x.replace(/military/g, "militardy");
x = x.replace(/Military/g, "Militardy");

x = x.replace(/mainstream media/g, "mainstream-media (bill o'reilly etc)");
x = x.replace(/news media/g, "news-media (bill o'reilly etc)");

x = x.replace(/Wikipedian/g, "Member of Jimbo Walles homepage");
x = x.replace(/Wikipedia/g, "Jimbo Walles homepage");

x = x.replace(/the free encyclopedia/g, "rehashing the lies from the mainstream media");

x = x.replace(/terror/g, "SCARY");
x = x.replace(/terrorist/g, "SCARY PPL");

x = x.replace(/conspiracy/g, "CONSPIRACY");
x = x.replace(/Conspiracy/g, "CONSPIRACY");

x = x.replace(/inside job/g, "CONSPIRACY");
x = x.replace(/INSIDE JOB/g, "CONSPIRACY");

x = x.replace(/people/g, "humans");
x = x.replace(/person/g, "human");

x = x.replace(/nuclear weapons/g, "nuclear reactors");

x = x.replace(/Iran/g, "Persia");

x = x.replace(/Internet/g, "Internets");
x = x.replace(/internet/g, "internets");

x = x.replace(/World Wide Web/g, "Tubes");
x = x.replace(/the web/g, "the tubes");

x = x.replace(/intelligence/g, '"intellignece"');
 
x = x.replace(/Politician/g, "Political trickster");
x = x.replace(/politician/g, "political trickster");

x = x.replace(/Willard Mitt Romney/g, "the Devil himself");
x = x.replace(/Mitt Romney/g, "the Devil");
x = x.replace(/Romney/g, "the Devil");

x = x.replace(/Mormon/g, "Satanist");



// Copyright trolling

x = x.replace(/Viacom/g, "VIACOM (nasdaq:TROLOLOOLO)");
x = x.replace(/RIAA/g, "Ministry of truth");

x = x.replace(/Entertainment/g, "Annoyance");
x = x.replace(/entertainment/g, "annoyance");
x = x.replace(/performance/g, "annoyance");

x = x.replace(/musician/g, "stage performer");
x = x.replace(/music/g, "sound");
x = x.replace(/Music/g, "Sound");

x = x.replace(/journalist/g, "blabbermouth");
x = x.replace(/Journalist/g, "Blabbermouth");

x = x.replace(/celebrity/g, "attention whore");
x = x.replace(/Celebrity/g, "Attention whore");

x = x.replace(/celebrities/g, "attention whores");
x = x.replace(/Celebrities/g, "Attention whores");



// accademic trolling

x = x.replace(/most scientists/g, "I personally");

x = x.replace(/journal/g, "weblog");
x = x.replace(/chemist/g, "alchemist");
x = x.replace(/chemistry/g, "alchemistry");
x = x.replace(/astronomy/g, "astrology");

x = x.replace(/(T|T)he (P|p)angaea (T|t)heory/g, "The knee jerk Pangaea t2heory");

x = x.replace(/theoretical/g, "imaginary");
x = x.replace(/Theoretical/g, "Imaginary");
x = x.replace(/theoretic/g, "imaginary");
x = x.replace(/theory/g, "fantasy");
x = x.replace(/t2heory/g, "theory");


x = x.replace(/docotor/g, "physican");
x = x.replace(/Docotor/g, "Physican");
x = x.replace(/Dr\./g, "Physican");

x = x.replace(/pseudoscience/g, "protoscience");
x = x.replace(/Pseudoscience/g, "Protoscience");

x = x.replace(/fringe/g, "cutting edge");

x = x.replace(/Einstein/g, "Einstein the nitwit, the plagiarist, and the liar");

x = x.replace(/law/g, "lie");

x = x.replace(/(n|N)oitrous (O|o)xide/g, "phlogisticated nitrous air");

x = x.replace(/Nitrogen/g, "Phlogisticated air");
x = x.replace(/nitrogen/g, "phlogisticated air");

x = x.replace(/photon/g, "phlogiston");
x = x.replace(/Photon/g, "Phlogiston");

x = x.replace(/(S|s)pace.time continuum/g, "Space");
x = x.replace(/(S|s)pacetime continuum/g, "Space");
x = x.replace(/(S|s)pace.time/g, "Æther");
x = x.replace(/(S|s)pacetime/g, "Æther");

x = x.replace(/zero point energy/g, "Æther");
x = x.replace(/Brownian motion/g, "Æther motion");

x = x.replace(/conservation of energy/g, "conversation of energy");

x = x.replace(/simplified/g, "stupified");
x = x.replace(/Euclidean /g, "Lucidian");



// Biblical intervention

x = x.replace(/investigator/g, "inquisitor");
x = x.replace(/Investigator/g, "Inquisitor");

x = x.replace(/prosecutor/g, "inquisitor");
x = x.replace(/Prosecutor/g, "Inquisitor");

x = x.replace(/investigate/g, "inquisit");
x = x.replace(/Investigate/g, "inquisit");
x = x.replace(/investigation/g, "Statutory inquisition");
x = x.replace(/Investigation/g, "Statutory inquisition");

x = x.replace(/Atheist/g, "Gawd fearing Atheist");

x = x.replace(/Jesus/g, "Jesus, our lord and our savior,");

x = x.replace(/Bible/g, "Biblical scriptures");


// General messing with reality (urban dict)

x = x.replace(/research/g, '"research"');

x = x.replace(/will/g, "might");

x = x.replace(/comment/g, "trolling");
x = x.replace(/COMMENTS/g, "TROLLINGS");

x = x.replace(/(\W)Miss(\W)/g, "$1babble-baby$2");

x = x.replace(/more/g, "moar");
x = x.replace(/evil/g, "evol");
x = x.replace(/(i|I)tem/g, "itam");

x = x.replace(/hacker/g, "hax0r");
x = x.replace(/late(\W)/g, "leet$1");

x = x.replace(/(g|G)od(\W)/g, "GAWD$1");

x = x.replace(/educated/g, "learned");
x = x.replace(/Educated/g, "Learned");


// fixes

x = x.replace(/Devol/g, "Devil");
 
// create special tab on userscripts.org

url=location.href
if(url.indexOf('http://userscripts.org') != -1){
x = x.replace(
'<li><a href="/guides">Guides</a></li>',
'<li><a href="/guides">Guides</a></li>'+
'<li><a href="/scripts/discuss/129877">Discuss Santizi</a></li>');
}

document.body.innerHTML = x;