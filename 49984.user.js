1.
// ==UserScript==
// @name Xwars PL to EN Translator
// @author Jacek 'Anderkent' Lach
// @description A script translating the polish xwars interface to english
// @license Creative Commons Attribution License
// @version 0.1
// @include http://uni1.pl.x-wars.net/*
// @include http://pl.x-wars.net/?topic=login
// @released 2009-05-13
// @updated 2009-05-13
// @compatible Greasemonkey
// ==/UserScript==
	  
	  var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
// Keywords
'Energia:' : 'Energy',
'dost&#2;pnych' : 'available',
'Status budowli:' : 'Building Status:',

//Error messages
'Potrzebny jest Instytut badawczy do prowadzenia badań nad nowymi technologiami.' : 'You need a Research Lab to research stuff, duuh',
'Musisz zbadać konstrukcję statków, żeby zarządzać flotą!. ' : 'You need to research Ship Construction to get here, baka!' ,
'Potrzebne są badania szpiegowskie do nawigacji. ' : 'No espionage, no galaxy view. L2P noob',
'Najpierw musisz zbudować Stację obronną!' : 'Get a Defence Station dude, cmon',
'Do produkcji statków potrzebna jest stocznia!' : 'Uhh you know what you need' ,


// Trade Tab
'Zakup Statkow' : 'Buy shits' ,
'Transakcje' : 'Trades' ,

// Ressource Tab
'Surowiec' : 'Ressource' ,
'Pojemność magazynu' : 'Depot Capacity' ,
'Opłata' : 'Payback' ,
'Klasa planety' : 'Planet Class' ,
'Obecne wydobycie' : 'Production' ,
'Poziomy technologii' : 'Specializations',
'Pocisk' : 'Impulze',
'Promieniowanie' : 'Rays' ,
'Rakiety' : 'Missiles' ,
'Wybuchose' : 'Explosives' ,
'Biologiczne' : 'Biological' ,
'Antymateria' : 'Antimatery' ,
'Osłony' : 'Shields' ,
'Karbon' : 'Carbon' ,
'Teleportacja' : 'Teleportation' ,
'Handel' : 'Trade' ,
'Finanse' : 'Finance' ,
'Ładunek' : 'Cargo' ,
'Szpiegostwo' : 'Espionage' ,
'Kontrwywiad' : 'Counterespionage' ,
'Sabotaż' : 'Sabbotauge (?)',
'Kontr-sabotaż' : 'Counter sabotauge', 
'Rasa' : 'Race',
'Frakcja' : 'Fraction',
'Planeta' : 'Planet',

'Budynki główne' : 'Main buildings',
'Kwatera główna' : 'Headquarter',
'Centrala budowlana' : 'Construction Center',
'Instytut badawczy' : 'Research Lab',
'Stacja szpiegowska' : 'Espionage Station',
'Wydobywanie surowców' : 'Ressource Production' ,
'Kopalnia żelaza' : 'Pig Iron Mine',
'Kopalnia kryształu' : 'Crystal Mine',
'Kolektor frubinu' : 'Frubin Collector',
'Syntetyzer orizinu' : 'Orizin Synthethiser',
'Wytwórnia frurozinu' : 'Frurozin Productor',
'Kopalnia złota' : 'Gold Mine',
'Magazyny i zbiorniki' : 'Depot Buildings' ,
'Magazyn żelaza' : 'Pig Iron Depot',
'Magazyn kryształów' : 'Crystal Depot',
'Magazyn frubinu' : 'Frubin Depot' ,
'Zbiornik orizinu' : 'Orizin Depot' ,
'Zbiornik frurozinu' : 'Frurozin Depot' ,
'Magazyn złota' : 'Gold Depot' ,
'Budynki energetyczne' : 'Energy Buildings' ,
'Elektrownia atomowa' : 'Nuklear Power Plant' ,
'Elektrownia fuzyjna' : 'Fission Power Plant' ,
'Budynki wojskowe' : 'Military Buildings' ,
'Stocznia' : 'Ship Factory' ,
'Stacja obronna' : 'Defence Station' ,
'Centrala kontrwywiadu' : 'CounterEspionage Central' ,
'System wczesnego ostrzegania' : 'Threat Detection Phalanx' ,
'Centrum Wywiadowcze' : 'Intelligence Centrum' ,
'Akademia Wojskowa' : 'High Academy' ,
'Hangar' : 'Alliance Hanger' ,
'Budynki handlowe' : 'Trade Buildings' ,
'Stanowiska handlowe' : 'Trade Post' ,
'Centrum handlowe' : 'Trade Center' ,
'Bank X-Wars' : 'X-wars Bank',
// Which concludes buildings 
// Researches : 
'Badania podstawowe' : 'Basic Researches' ,
'Zaawansowane szpiegostwo' : 'Advanced Espionage' ,
'Szpiegostwo' : 'Espionage' ,
'Transmisja sygnału' : 'Signal Transmission' ,
'Multibudowle' : 'Multiple Constructions' ,
'Handel międzygwiezdny' : 'Interstellar Trade' ,
'Konstrukcja statku' : 'Ship Construction' ,
'Taktyka wojenna' : 'Tactical Warfare' ,
'Technologia kamuflażu' : 'Camouflage Technology' ,
'Badania nad statkami i bronią' : 'Weaponry and protection' ,
'Jonizacja' : 'Jonization' ,
'Technologia spalania' : 'Combustion engine' ,
'Metalurgia' : 'Metalurgy' ,
'Ogniskowanie energii' : 'Energy Focusting' ,
'Doki towarowe' : 'Cargo Docks' ,
'Nanotechnologia' : 'Nanotechnology' ,
'Technologia plazmowa' : 'Plasma Technology' ,
'Substancje wybuchowe' : 'High Explosive ?' ,
'Badania nad osłonami' : 'Shield Research' ,
'Wzbogacone stopy metali' : 'Enhanced Metallurgy' ,
'Biotechnologia' : 'Biotechnology' ,
'Technologia promieniowania' : 'Ray Technology' ,
'Zaawansowane technologie' : 'High Technologies' ,
'Badania nad rakietami' : 'Rocket science!!' ,
'Nanosynteza' : 'Nanosynthesis' ,
'Technologia antymaterii' : 'Antimater Technology' ,
'Technologia teleportacji' : 'Teleport Technology' ,
'Badania nad napędem' : 'Engine Researches' ,
'Napęd nuklearny' : 'Nuclear Engine' ,
'Napęd jonowy' : 'Ion Engine' ,
'Napęd hiperkosmiczny' : 'Hyperspeed Engine' ,
'Napęd grawitacyjny' : 'Gravitational Engine' ,
'Badania administracyjne' : 'Administration Researches' ,
'Administracja koloni&#261;' : 'Colony Administration' ,
// Which concludes Researches

'Poziom' : 'level' ,

// Ressource tab 
'Żelazo' : 'Pig Iron' ,
'Kryształ' : 'Crystals' ,
'Złoto' : 'Gold' ,
// Left Side Menu
'Przegląd' : 'Overview' ,
'Konstrukcja' : 'Constructions' ,
'Badania' : 'Research' ,
'Obrona' : 'Defence' ,
//'Stocznia' : 'Production' ,
'Floty' : 'Fleets' ,
'Handel' : 'Trade' ,
'Surowce' : 'Ressource' ,
'Planety' : 'Planets' ,
'Technologie' : 'Techs',
'Statystyki' : 'Highscore' ,
'Sojusz' : 'Alliance' ,
'Wiadomości' : 'Messages' ,
'Ustawienia' : 'Settings' ,
'Forum' : 'Board' ,
'Wyloguj' : 'Logout? NO', 

// Ship Components
'Kadłub sondy' : 'Drone Frame' ,
'Kadłub broni taktycznej' : 'Tactical Weapon Fuseloge' ,
'Kadłub statku (lekki)' : 'Light Fuseloge' , 
'Kadłub statku (średni)' : 'Medium Fuseloge' ,
'Kadłub statku (ciężki)' : 'Heavy Fuseloge' ,
'Buster jonowy' : 'Ion Booster' ,
'Lekka powłoka metalowa M1' : 'Light Metal Plating' ,
'Specjalnie hartowany stop tytanu' : 'Hardened Titanium' ,
'Opancerzenie thryacitowe' : 'Thryacit Plating',
'Pancerz Karbonowy' : 'Carbon Plating',
'Powłoka Karbonowa' : 'Carbon Hull',
'Pancerz Carbonowy' : 'Carbon Plating',
'Powłoka Carbonowa' : 'Carbon Hull',
'Powłoka Diamentowa' : 'Diamond Plating' ,
'Lekka osłona energetyczna' : 'Light Energy Shield',
'Średnia osłona energetyczna' : 'Medium Energy Shield',
'Ciężka osłona energetyczna' : 'Heavy Energy Shield',
'Teleporter defensywny' : 'Teleporter',
//weapons   	
'Działo impulsowe' : 'Impulse Cannon' ,
'Lekkie działo promieniowe' : 'Light Ray Gun' ,
'Działko plazmowe' : 'Plasma Gun' ,
'Średnie działo promieniowe' : 'Medium Ray Cannon' ,
'Rakieta HE' : 'HE-Missile' ,
'Działo plazmowe' : 'Plasma Cannon' ,
'Rakieta precyzyjna' : 'Missile' ,
'Torpeda HE' : 'HE-Torpedo' ,
'Torpeda "Spider"' : 'Torpedo "Spider"',
'Ciężkie działo promieniowe' : 'Heavy Ray Cannon',
'Bateria plazmowa' : 'Plasma Battery' ,
'Torpeda z antymaterią' : 'Antimatter torpedo' ,
'Impulzei taktyczne' : 'Tactical weapons' ,
'Pociski taktyczne' : 'Tactical weapons' ,
'Konwencjonalne ładunki wybuchowe' : 'Conventional Explosive' ,
'Detonator plazmowy' : 'Plasma Detonator' ,
'Detonator antymaterii' : 'Antimatter Detonator' ,
'Zwiększenie ładowności' : 'Cargo Stuff' ,
'Box ładunkowy' : 'Cargo Box',
'Dok ładowniczy' : 'Cargo Dock' ,
'Kontener frachtowy' : 'Cargo Container' ,
'Pokład frachtowy' : 'Cargo Deck' ,
'Pokład lotniskowca' : 'Carrier Deck' ,
'Opcje szpiegostwa' : 'Espionage options' ,
'Moduł rozpoznawczy' : 'Discovery module' ,
'Moduł skanujący' : 'Espionage module' ,
'Moduł obserwacyjny' : 'Observation module' ,

'Kamuflaż' : 'Camouflage' ,
'Urządzenie kamuflujące' : 'Camouflage System' ,
  	
'Opcje kolonizacji' : 'Colonization Modules',
'Moduł kolonizacyjny' : 'Colonization Module',
	
'Komunikacja' : 'Communications' ,
  	
'Moduł komunikacji dalekiego zasięgu' : 'Long Rage Comm',
	
'Wymagania budowlane:' : 'Building Requirements' ,
'Wymagania technologiczne:' : 'Technology Requirements',


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
	
}