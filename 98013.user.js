// ==UserScript==
// @name           No Agenda Show BSFilter by PaulTheBookGuy.Com
// @namespace      No Agenda Show BSFilter PaulTheBookGuy.Com
// @description    A Website Filter For Listeners Of The No Agenda Podcast
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 1; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
{

s = node.data;

s = s.replace( /\badam curry\b/gi, "Former Soviet Spy Adam Curry");
s = s.replace( /\bal-Qaeda\b/gi, "al-CIAda");
s = s.replace( /\bal-Qaida\b/g, "al-CIAda");
s = s.replace( /\balcohol\b/gi, "the demon drink");
s = s.replace( /\bbeer\b/g, "The Demon Drink");
s = s.replace( /\bbenjamin netanyahu\b/gi, "Bibi Netanyahu");
s = s.replace( /\bwhiskey\b/g, "The Demon Drink");
s = s.replace( /\bBiodiversity\b/g, "Biodiversitée");
s = s.replace( /\bbogus\b/g, "B O G U S");
s = s.replace( /\bcarbon dioxide\b/g, "stuff that plants breathe");
s = s.replace( /\bHillary Clinton\b/g, "Lucifer Clinton");
s = s.replace( /\bAlassane Ouattara\b/g, "Audi Quattro");
s = s.replace( /\bHillary Rodham Clinton\b/g, "Lucifer Rodham Clinton");
s = s.replace( /\bHillary Rodham \b/g, "Lucifer Rodham");
s = s.replace( /\bdonald rumsfeld\b/gi, "Ted Rumsfeld");
s = s.replace( /\bdavid miller\b/gi, "David The Douchebag Miller");
s = s.replace( /\brobert gates\b/gi, "Ted Gates");
s = s.replace( /\bemployees\b/g, "slaves");
s = s.replace( /\beurope\b/gi, "Gitmo States Of Europe");
s = s.replace( /\beuro\b/gi, "doomed euro");
s = s.replace( /\bEU\b/g, "Starfleet Command");
s = s.replace( /\beuropean union\b/gi, "Starfleet Command");
s = s.replace( /\bmoammar gadhafi\b/gi, "douchebag Moammar Gadhafi");
s = s.replace( /\bG20\b/gi, "Starfleet Command");
s = s.replace( /\bgadhafi\b/gi, "Gadhafi (douchebag)");
s = s.replace( /\bmoammar gaddafi\b/gi, "douchebag Moammar Gaddafi");
s = s.replace( /\bmit romney\b/gi, "Willard Romney");
s = s.replace( /\bGaddafi\b/g, "Gaddafi (douchebag)");
s = s.replace( /\bgeorge clooney\b/gi, "CIA Agent George Clooney");
s = s.replace( /\bglobal warming\b/gi, "so-called global warming");
s = s.replace( /\bguido westerwelle\b/gi, "Guido Sarduchi Westerwelle");
s = s.replace( /\bclimate change\b/gi, "so-called climate change");
s = s.replace( /\bhomeland security\b/gi, "Hinterland Security");
s = s.replace( /\bmarijuana\b/gi, "Devil Weed");
s = s.replace( /\bmonsanto\b/gi, "MonSCAMtooo");
s = s.replace( /\bjanet napolitano\b/gi, "Lucy Napolitano");
s = s.replace( /\bjoe lieberman\b/gi, "Larry Lieberman");
s = s.replace( /\bkatie couric\b/gi, "Deborah Couric");
s = s.replace( /\bNPR\b/g, "NPR Our National Traysure");
s = s.replace( /\bPBS\b/g, "NPR Our National Traysure");
s = s.replace( /\bbarack obama\b/gi, "George W Obama");
s = s.replace( /\bpresident Obama\b/gi, "President George W Obama");
s = s.replace( /\bpersistent contrail\b/gi, "chemtrails");
s = s.replace( /\bpersistent contrails\b/gi, "Chemtrails");
s = s.replace( /\bplanes\b/g, "planes (bad)");
s = s.replace( /\bPlanes\b/g, "Planes (bad)");
s = s.replace( /\bPLANES\b/g, "PLANES (bad)");
s = s.replace( /\bQueen\b/g, " Unelected Queen");
s = s.replace( /\bspokesperson\b/gi, "spokeshole");
s = s.replace( /\bspokesman\b/gi, "spokeshole");
s = s.replace( /\bspokeswoman\b/gi, "spokeshole");
s = s.replace( /\bstudies show\b/g, "studies show (THE SCIENCE IS IN!)");
s = s.replace( /\bStudies show\b/g, "Studies show (THE SCIENCE IS IN!)");
s = s.replace( /\bstudy shows\b/gi, "study shows (THE SCIENCE IS IN!)");
s = s.replace( /\bresearch shows\b/gi, "research shows (THE SCIENCE IS IN!)");
s = s.replace( /\bTSA\b/gi, "TSA (Total Sexual Assualt)");
s = s.replace( /\btrains\b/g, "trains (good)");
s = s.replace( /\bTrains\b/g, "Trains (good)");
s = s.replace( /\bTRAINS\b/g, "TRAINS (good)");
s = s.replace( /\bUnited Nations\b/g, "Unelected United Nations");
s = s.replace( /\bUN\b/g, "Unelected UN");
s = s.replace( /\bUniversity\b/g, "Universitée");
s = s.replace( /\bunderwriters\b/g, "underwriters (advertisers)");
s = s.replace( /\bvoting public\b/g, "voting slaves");
s = s.replace( /\bwar on terror\b/g, "never ending war on terror");
s = s.replace( /\bWar on Terror\b/g, "Never Ending War on Terror");
s = s.replace( /\bwar on terrorism\b/g, "never ending war on terrorism");
s = s.replace( /\bWar on Terrorism\b/g, "Never Ending War on Terrorism");
s = s.replace( /\bWTC 7\b/g, "WTC 7 (Building what?)");
s = s.replace( /\bWorld Trade Center 7\b/g, "World Trade Center 7 (Building what?)");
s = s.replace( /\bNBC Universal\b/g, "The Ministry Of Truth(NBC Universal)");
s = s.replace( /\bNBC\b/g, "The Ministry Of Truth (NBC)");
s = s.replace( /\bABC\b/g, "The Ministry Of Truth (ABC)");
s = s.replace( /\bE Entertainment\b/g, "The Ministry Of Truth (E Entertainment)");
s = s.replace( /\bComcast\b/g, "The Ministry Of Truth (Comcast)");
s = s.replace( /\bGeneral Electric\b/g, "The Ministry Of Truth (General Electric)");
s = s.replace( /\bGE\b/g, "The Ministry Of Truth (GE)");
s = s.replace( /\bgolf channel\b/gi, "The Ministry Of Truth (Golf Channel)");
s = s.replace( /\b911 terrorist attacks\b/g, "911 false flag attacks");
s = s.replace( /\bUnited States\b/g, "Gitmo Nation West");
s = s.replace( /\bargentina\b/gi, "Gitmo Nation Poly Ponies");
s = s.replace( /\bargentinian\b/gi, "Gitmo Nation Poly Ponies");
s = s.replace( /\bamerican\b/gi, "Gitmo Nation West");
s = s.replace( /\bamericans\b/gi, "Gitmo Nation Westerners");
s = s.replace( /\baustralia\b/gi, "Gitmo Nation Down Under");
s = s.replace( /\baustralian\b/gi, "Gitmo Nation Down Under");
s = s.replace( /\baustria\b/gi, "Gitmo Nation Ahrnold");
s = s.replace( /\baustrian\b/gi, "Gitmo Nation Ahrnold");
s = s.replace( /\bbelgium\b/gi, "Gitmo Nation Brussel Sprouts");
s = s.replace( /\bbelgian\b/gi, "Gitmo Nation Brussel Sprouts");
s = s.replace( /\bcanada\b/gi, "Gitmo Nation Great White North");
s = s.replace( /\bCanadian\b/g, "Gitmo Nation Great White North");
s = s.replace( /\bChina\b/g, "Gitmo Nation Zai Shangwu");
s = s.replace( /\bChinese\b/g, "Gitmo Nation Zai Shangwu");
s = s.replace( /\bDenmark\b/g, "Gitmo Nation Brown Cheese");
s = s.replace( /\bDanish\b/g, "Gitmo Nation Brown Cheese");
s = s.replace( /\bFinland\b/g, "Gitmo Nation Reindeer");
s = s.replace( /\bFinnish\b/g, "Gitmo Nation Reindeer");
s = s.replace( /\bEngland\b/g, "Gitmo Nation East");
s = s.replace( /\bEnglish\b/g, "Gitmo Nation East");
s = s.replace( /\bUK\b/g, "Gitmo Nation East");
s = s.replace( /\bFrance\b/g, "Gitmo Nation Stinky Cheese");
s = s.replace( /\bFrench\b/g, "Gitmo Nation Stinky Cheese");
s = s.replace( /\bGreece\b/g, "Gitmo Nation Souvlaki");
s = s.replace( /\bGreek\b/g, "Gitmo Nation Souvlaki");
s = s.replace( /\bGermany\b/g, "Gitmo Nation Deutschland");
s = s.replace( /\bGermans\b/g, "Gitmo Nation Deutschland");
s = s.replace( /\bIceland\b/g, "Gitmo Nation Volcano");
s = s.replace( /\bIcelandic\b/g, "Gitmo Nation Volcano");
s = s.replace( /\bIraq\b/g, "Gitmo Nation No WMDs");
s = s.replace( /\bIraqi\b/g, "Gitmo Nation No WMDs");
s = s.replace( /\bItaly\b/g, "Gitmo Nation Pasta");
s = s.replace( /\bItalian\b/g, "Gitmo Nation Pasta");
s = s.replace( /\bIreland\b/g, "Gitmo Nation Leprecauhn");
s = s.replace( /\bIrish\b/g, "Gitmo Nation Leprecauhn");
s = s.replace( /\bIvory Coast\b/g, "Gitmo Nation Cocoa");
s = s.replace( /\bMexico\b/g, "Gitmo Nation Taco");
s = s.replace( /\bMexican\b/g, "Gitmo Nation Taco");
s = s.replace( /\bMongolia\b/g, "Gitmo Nation Genghis Khan");
s = s.replace( /\bNetherlands\b/g, "Gitmo Nation Lowlands");
s = s.replace( /\bDutch\b/g, "Gitmo Nation Lowlands)");
s = s.replace( /\bNew Zealand\b/g, "Gitmo Nation Kiwi");
s = s.replace( /\bNew Zealender\b/g, "Gitmo Nation Kiwi");
s = s.replace( /\bNorway\b/g, "Gitmo Nation Fjord");
s = s.replace( /\bNorwegian\b/g, "Gitmo Nation Fjord");
s = s.replace( /\bPortugal\b/g, "Gitmo Nation Fish");
s = s.replace( /\bPortuguese\b/g, "Gitmo Nation Fish");
s = s.replace( /\bRussia\b/g, "Gitmo Nation Vodka");
s = s.replace( /\bRussian\b/g, "Gitmo Nation Vodka");
s = s.replace( /\bScotland\b/g, "Gitmo Nation Haggis");
s = s.replace( /\bScottish\b/g, "Gitmo Nation Haggis");
s = s.replace( /\bsweden\b/gi, "Gitmo Nation ABBA");
s = s.replace( /\bPakistan\b/g, "Pakistank");
s = s.replace( /\bPakistanian\b/g, "Pakistanky");
s = s.replace( /\bAfghanistan\b/g, "Poppistan");
s = s.replace( /\bAfghani\b/g, "Poppistanian");
s = s.replace( /\bAfghan\b/g, "Poppistanian");


node.data = s;

}} })();
