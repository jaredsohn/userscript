1.
// ==UserScript==
// @name Xwars EN to FR Translator
// @author LouderThanBoom
// @description A script translating the english xwars interface to french
// @license 
// @version alpha
// @include http://uni1.en.x-wars.net/* 
// @released 2009-05-13
// @updated 2009-05-13
// @compatible Greasemonkey
// ==/UserScript==
    
var words = {
// Syntax: 'Search word' : 'Replace word',
// Keywords
'Energie' : 'Energie',
'disponible' : 'disponible',
'Status des batiments:' : 'Status des batiments:',




// Trade Tab
'Buy shits' : 'Buy shits' ,
'Trades' : 'Trades' ,

// Ressource Tab
'Ressource' : 'Ressource' ,
'PojemnoÅ›Ä‡ magazynu' : 'capacite des depots' ,
'OpÅ‚ata' : 'Payback' ,
'Type de planete' : 'Type de planete' ,
'Production' : 'Production' ,
'Specialisations' : 'Specialisations',
'Impulsions' : 'Impulsions',
'Rayons' : 'Rayons' ,
'Missiles' : 'Missiles' ,
'Explosif' : 'Explosif' ,
'Biologique' : 'Biologique' ,
'Antimatiere' : 'Antimatiere' ,
'OsÅ‚ony' : 'bouclier' ,
'Carbone' : 'Carbone' ,
'Teleportation' : 'Teleportation' ,
'level de construction' : 'level de construction' ,
'Commerce' : 'echange' ,
'Finance' : 'Finance' ,
'fret' : 'fret' ,
'Espionnage' : 'Espionnage' ,
'Contre espionnage' : 'Contre espionnage' ,
'Sabotage (?)' : 'Sabotage (?)',
'Kontr-Sabotage (?)' : 'contre sabotage', 
'Race' : 'Race',
'plasma' : 'plasma',
'explosif' : 'explosif',
'Faction' : 'Faction',
'Planete' : 'Planete',
'Kwatera g?ówna' : 'Quartier general',
' Mines ?elaza' : 'Mine de metal',
'Construction' : 'Construction',
'Lancer' : 'Lancer',
'Mines' : 'Mines',
'Cristale?' : 'Cristale',
 
'Budynki gÅ‚Ã³wne' : 'Batiments Principaux',
'Kwatera gÅ‚Ã³wna' : 'Quartier general',
'Centrale de construction' : 'Centrale de construction',
'Laboratoire de recherche' : 'Laboratoire de recherche',
'Station Despionnage' : 'Station Despionnage',
'Production de ressource' : 'Production de ressource' ,
'Mines Å¼elaza' : 'Mine de metal',
'Mines CristaleÅ‚u' : 'Mine de cristale',
'Collecteur de frubin' : 'Collecteur de frubin',
'Mine Dorizin' : 'Mine Dorizin',
'Producteur de frurozin' : 'Producteur de frurozin',
'Mines zÅ‚ota' : 'Mine Dor',
'Batiments de depots' : 'Batiments de depots' ,
'Depot de metal' : 'Depot de metal',
'Magazyn CristaleÅ‚Ã³w' : 'Depot de cristale',
'Depot de frubin' : 'Depot de frubin' ,
'Depot Dorizin' : 'Depot Dorizin' ,
'Depot de frurozin' : 'Depot de frurozin' ,
'Magazyn zÅ‚ota' : 'Depot Dor' ,
'Batiments Denergie' : 'Batiments Denergie' ,
'Centrale Nucleaire' : 'Centrale Nucleaire' ,
'Centrale de fusion' : 'Centrale de fusion' ,
'Batiments Militaire' : 'Batiments Militaire' ,
'vaisseaux' : 'vaisseaux' ,
'Station de defense' : 'Station de defense' ,
'Centrala Contre espionnageu' : 'Centre de contre espionnage' ,
'Installation Dalerte anticipe' : 'Installation Dalerte anticipe' ,
'Centre des services secrets' : 'Centre des services secrets' ,
'Grande Academie' : 'Grande Academie' ,
'Hangar Dalliance' : 'Hangar Dalliance Dalliance' ,
'batiments de commerce' : 'batiments de commerce' ,
'Poste De commerce' : 'Poste De commerce' ,
'Centre De commerce' : 'Centre De commerce' ,
'Banque' : 'Banque',
// Which concludes buildings 
// Researches : 
'Recherche de base' : 'Recherche de base' ,
'Espionnage avance' : 'Espionnage avance' ,
'Espionnage' : 'Espionnage' ,
'Transmisja sygnaÅ‚u' : 'Transmission de signal' ,
'pre requis' : 'pre requis',
'Construction multiple' : 'Construction multiple' ,
'Commerce miÄ™dzygwiezdny' : 'Commerce interstellaire' ,
'construction de vaisseaux' : 'construction de vaisseaux' ,
'Tactiques de guerre' : 'Tactiques de guerre' ,
'Camou' : 'Camou' ,
'Recherche nad statkami i broniÄ…' : 'Armes et Blindages' ,
'Ionisation' : 'Ionisation' ,
'Combustion' : 'Combustion' ,
'Metalurgie' : 'Metalurgie' ,
'Rassemblement Denergie' : 'Rassemblement Denergie' ,
'Fret' : 'Fret' ,
'NanoTechnologie' : 'NanoTechnologie' ,
'Plasma' : 'Plasma' ,
'Substancje explosif' : 'Explosif' ,
'Recherche nad osÅ‚onami' : 'bouclier ' ,
'Metallurgie avancee' : 'Metallurgie avancee' ,
'BioTechnologie' : 'BioTechnologie' ,
'Rayonnement' : 'Rayonnement' ,
'Technologies avancees' : 'Technologies avancees' ,
'missile' : 'missile' ,
'Nanosynthese' : 'Nanosynthese' ,
'Antimatiere' : 'Antimatiere' ,
'Teleport' : 'Teleport' ,
'Recherche nad napÄ™dem' : 'Recherche propulsion' ,
'NapÄ™d nuklearny' : 'Propulseur nuk' ,
'NapÄ™d jonowy' : 'Propulseur Ion' ,
'NapÄ™d hiperkosmiczny' : 'Propulseur hyp' ,
'NapÄ™d grawitacyjny' : 'Gty' ,
'Recherches Administratives' : 'Recherches Administratives' ,
'Trade mi?dzygwiezdny' : 'commerce interstellaire',
'Administration des colonie?' : 'Administration des colonie' ,
'batiments' : 'batiments',
'batiments' : 'batiments',
'technologique' : 'technologique',
'equipement vso' : 'equipement vso',
'modele' : 'modele',
'Budynki g?ówne' : 'Batiments principaux',
'Batiments Mines' : 'Batiments Mines',
'Kwatera g?ówna' : 'Quartier General',
// Which concludes Researches


'Niveau' : 'Niveau' ,

// Ressource tab 
'Pig-Iron' : 'Metal' ,
'Crystals‚' : 'Cristal' ,
'Gold' : 'Or' ,
// Left Side Menu
'Overview' : 'General' ,
'Construction' : 'Construction' ,
'Research' : 'Recherche' ,
'Defense' : 'Defense' ,
//'Production' : 'Production' ,
'Fleets' : 'Flottes' ,
'Trade' : 'Commerce' ,
'Resources' : 'Ressource' ,
'Planets' : 'Planetes' ,
'Techs' : 'Technologie',
'Highscore' : 'Classement' ,
'Alliance' : 'Alliance' ,
'Messages' : 'Messages' ,
'Account' : 'Options' ,
'Board' : 'Forum' ,
'Logout' : 'byebye', 

// Ship Components
'KadÅ‚ub sondy' : 'sonde' ,
'KadÅ‚ub broni taktycznej' : 'Tactique' ,
'KadÅ‚ub statku (lekki)' : 'Leger' , 
'KadÅ‚ub statku (Å›redni)' : 'Moyens' ,
'KadÅ‚ub statku (ciÄ™Å¼ki)' : 'lourds' ,
'Booster Ionique' : 'Booster Ionique' ,
'Lekka powÅ‚oka metalowa M1' : 'Blindage leger metal' ,
'Alliage fort de titane' : 'Alliage fort de titane' ,
'Blindage de Thyracith' : 'Blindage de Thyracith',
'Isolation de carbone' : 'Isolation de carbone',
'Pow?oka Carboneowa' : 'Gaine de carbone',
'Carbon Plating' : 'Carbon Plating',
'PowÅ‚oka Carbonowa' : 'Gaine de carbone',
'PowÅ‚oka Diamentowa' : 'Blindage de diamant' ,
'Lekka osÅ‚ona energetyczna' : 'Bouclier leger',
'Åšrednia osÅ‚ona energetyczna' : 'Bouclier moyen',
'CiÄ™Å¼ka osÅ‚ona energetyczna' : 'Bouclier lourd',
'Teleporteur' : 'Teleporteur',
//weapons   	
'DziaÅ‚o impulsowe' : 'Canon a impulsion' ,
'Lekkie dziaÅ‚o promieniowe' : 'Canon a rayons leger' ,
'DziaÅ‚ko plazmowe' : 'Canon Plasma' ,
'Åšrednie dziaÅ‚o promieniowe' : 'Cannon a rayons moyen' ,
'HE-Missile' : 'HE-Missile' ,
'DziaÅ‚o plazmowe' : 'Plasma Cannon' ,
'Missile' : 'Missile' ,
'Fusee HE Spitfire' : 'Fusee HE Spitfire' ,
'Torpille "Spider"' : 'Torpille "Spider"',
'CiÄ™Å¼kie dziaÅ‚o promieniowe' : 'Canon a rayon lourd',
'Batterie de plasma' : 'Batterie de plasma' ,
'Torpeda z antymateriÄ…' : 'Torpille antimatiere' ,
'Arme tactique' : 'Arme tactique' ,
'Impulsionsi taktyczne' : 'Arme Tactique' ,
'Konwencjonalne Å‚adunki explosif' : 'Detonateur HE' ,
'Detonateur Plasma' : 'Detonateur Plasma' ,
'Detonateur Antimatiere' : 'Detonateur Antimatiere' ,
'ZwiÄ™kszenie Å‚adownoÅ›ci' : 'Chargeur de fret' ,
'Box Å‚adunkowy' : 'Box de charge',
'Dok Å‚adowniczy' : 'Dock de charge' ,
'Container de fret' : 'Container de fret' ,
'PokÅ‚ad frachtowy' : 'Pont de fret' ,
'PokÅ‚ad lotniskowca' : 'Pont de support' ,
'Module Despionnage' : 'Module Despionnage' ,
'ModuÅ‚ rozpoznawczy' : 'Decouverte de systeme' ,
'ModuÅ‚ skanujÄ…cy' : 'Scanneur de planete' ,
'ModuÅ‚ obserwacyjny' : 'Unite Dobservation' ,
 
'Camouflage' : 'Camouflage' ,
'UrzÄ…dzenie kamuflujÄ…ce' : 'Disposotif de camouflage' ,
  	
'options de colonisation' : 'options de colonisation',
'ModuÅ‚ kolonizacyjny' : 'Module de colonisation',
	
'Communications' : 'Communications' ,
  	
'ModuÅ‚ komunikacji dalekiego zasiÄ™gu' : 'Module L Com',
	
'pre requis batiments:' : 'Batiments requis' ,
'pre requis technologique:' : 'Technologies requises',


///////////////////////////////////////////////////////
'':''};

// Grab the text nodes
var this_text, text = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null);

for(var i=text.snapshotLength-1; i>=0; i--) {

// Create a shortcut for the text node
this_text = text.snapshotItem(i);

// Iterate the words array
	for(word in words) {
	
	// Turn the search term into a regular expression
	// allowing wildcards (*) to be used for any character
	var search_regexp = new RegExp(word.replace(/\*/g,'[^ ]*'), 'gi');
	
	// Exclude the blank option at the bottom of the array words
	// so every entry can have a comma after it for easy entry of blacklisted words
	// And if the text node contains the blacklisted word
	// And if the text isn't inside a link then add  && this_text.parentNode.tagName!='A'
		if(word!='' && search_regexp.test (this_text.textContent)) {
		// Replace the blacklisted word with the appropriate word
		this_text.textContent = this_text.textContent.replace(search_regexp, words[word]);
		
		}
		
	}
	
