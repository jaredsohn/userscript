// ==UserScript==
// @name           eImpero Romano
// @namespace      http://www.erepublik.com/
// @include        http://*.erepublik.com/*
// ==/UserScript==

var sostituzioni = {
//I partiti
        "Partito Comunista Eitaliano": "Partito della plebe",
	"Movimento" : "Panem et circenses",


	"Presidente": "Imperatore",
	"Congresso": "Senato",
 	"Congressman": "Senatore",
 	"Congressmen": "Senatori",

        //Militare
        "rifle" : "princeps",
        "artillery" : "velites",
        "tank" : "equites",
        "helicopter" : "sagittari",

	"Corpo d'Elite eitaliana": "Corpo pretoriano",
 	"Elite": "Corpo pretoriano",
 	"1a armata": "Armata palatina",
 	"2a armata": "Armata Comitense",
 	"3a armata": "Armata limitanea",
 	"4a armata": "Armata auxiliares",

"generale" : "Console",
"colonnello" : "tribuno",
"HQ" : "comites",
"CDSM" : "Dictator",
"Comandante elite" : "tribuno del pretorio",



	"Ministro": "Praefectus",
	"Ministri": "Praefecta",
	"lo Stato Italiano": "l'Impero Romano",
	"Stato Italiano": "Impero Romano",
	"Stato EItaliano": "Impero eRomano",

        //Usernames
	"Paolus Augustus": "Papa Paolus Augustus",
	"Dio Akira": "Akira Deus",
	"megalomaniac": "megalomaniacus",
	"bisiacco": "bisiaccus",
	"mappina": "mappina magna",
	"Simpatrick": "Simpatrizius Imperator",
	"Claudio.G53": "Claudius Senilis",
 };  
 
var regex = {}; 

for (key in sostituzioni)
{ 
    regex[key] = new RegExp(key, 'gi'); 
} 

var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++)
 { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in sostituzioni)
	{ 
        s = s.replace(regex[key], sostituzioni[key]); 
    } 
    node.data = s; 
}