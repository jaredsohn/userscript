// ==UserScript==
// @name        fragsim_hu_wargame
// @description	fragsim_magyarítás
// @namespace   *
// @include     http://wargame.fragsim.com/?*

// @version     2
// ==/UserScript==
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
"G.I" : "Amerikai katona",
"Sniper" : "Mesterlövész",
"Grenade Launcher":"Anti tank",
"MG 34 Position":"MG 34",
"SdKfz 7/1":"SdKfz 140",
"Barbed Wire":"Szögesdrót",
"Anti-Troop Mine":"Gyalogsági akna",
"Water Mine":"vizi akna",
"2-cm-Flak-Vierling 38":"Flak 38 légvédelmi gép",
"Tank Trap":"Tankcsapda",
"Anti-Tank Mine":"Tankelhárító akna",
"Firing Range":"Lőtér",
"Quantity":"Mennyiség",
"Order":"Sorrend",
"SUBMIT":"Mehet",
"Weather:":"Időjárás",
"Improvement":"Fejlesztés",
"Level":"Szint",



"Tank Simulator":"Tank laboratórium",
"Flight Simulator":"Repülő laboratórium",
"Ship Simulator":"Hajó laboratórium",
"Combat winner":"Csata nyertese",
"Attacker losses":"Támadó vesztesége",
"Defender losses":"Védő vesztesége",
"Firepower":"Tűzerő",
"Money":"Pénz",
"Unit":"Egység",
"Used":"Használt",
"Remaining":"Túlélte",
"Casualties":"Veszteség",
"Price":"Ár",
"Oil":"Nyersolaj",
"Conversion cost":"Konvertálás költsége",
"Kerosene":"Benzin",
"Diesel":"Dízel",
"Kerosene":"Benzin",
"Querosene":"Benzin",
"Fixed cost 10min":"Fix költség 10min",
"Fixed cost 1h":"Fix költség 1h",
"Fixed cost 24h":"Fix költség 24h",
"Ammunition":"Lőszer",
"Mine Sweeper Ship":"Aknakereső hajó",
"Destroyer 1936":"Romboló 1936",
"Attack":"Támadó erő",
"Defense":"Védelmi erő",
"Defender":"Védő",
"Attacker":"Támadó",
"loses":"veszteség",

"Time":"Idő",



}; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();
