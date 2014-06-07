// ==UserScript==
// @name		OGame Argentinian Servers Translator
// @namespace	http://ar.ogame.org/
// @description	This script translate some text to anothers languages
// @include		http://uni*.ogame.com.ar/*
// @copyright   (C) Matsusoft Corporation
// @license     Freeware
// @version     0.2
// @attribution Attribution Name (Attribution Script Homepage)
// @author      Perberos
// @homepage    http://greasemonkey.matsusoft.com.ar/

(function ()
{

	var lang = {
		// textos de arriva
		"Cristal": 'Crystal',
		"Deuterio": 'Deuterium',
		"Materia Oscura": 'DarkWater',
		"Energía": 'Energy',
		// textos del menu o links
		"Visión general": 'Overview',
		"Edificios": 'Buildings',
		"Recursos": 'Resources',
		"Hangar": 'Hangar',
		"Flota": 'Fleet',
		"Investigación": 'Research',
		"Tecnología": 'Techtree',

		"Galaxia": 'Galaxy',
		"Defensa": 'Defense',

		"Alianzas": 'Alliance',
		"Foro": 'Forum',
		"Estadísticas": 'Stadistics',
		"Buscar": 'Search',
		"Ayuda": 'Help',

		"Mensajes": 'Messages',
		"Notas": 'Notes',
		"Lista de compañeros": 'Buddy list',
		"Opciones": 'Options',
		"Salir": 'Exit',
		"Reglas": 'Rules',
		"Contacto": 'Contact',

		// edificios, naves y tecnologias
		"Mina de metal": 'Metal Mine',
		"Mina de cristal": 'Crystal Mine',
		"Sintetizador de deuterio": 'Deuterium Synthesizer',
		"Planta de energía solar": 'Solar Plant',
		"Planta de fusión": 'Fusion Reactor',
		"Fábrica de Robots": 'Robotics Factory',
		"Fábrica de Nanobots": 'Nanite Factory',
		"Hangar": 'Shipyard',
		"Almacén de metal": 'Metal Storage',
		"Almacén de cristal": 'Crystal Storage',
		"Contenedor de deuterio": 'Deuterium Tank',
		"Laboratorio de investigación": 'Research Lab',
		"Depósito de la Alianza": 'Alliance Deploy',
		"Terraformer": 'Terraformer',
		"Silo": 'Missile Silo',

		// techs
		"Tecnología de espionaje": 'Espionage Technology',
		"Tecnología de computación": 'Computer Technology',
		"Tecnología militar": 'Weapons Technology',
		"Tecnología de defensa": 'Shielding Technology',
		"Tecnología de blindaje": 'Armour Technology',
		"Tecnología de energía": 'Energy Technology',
		"Tecnología de hiperespacio": 'Hyperspace Technology',
		"Motor de combustión": 'Combustion Drive',
		"Motor de impulso": 'Impulse Drive',
		"Propulsor hiperespacial": 'Hyperspace Drive',
		"Tecnología láser": 'Laser Technology',
		"Tecnología iónica": 'Ion Technology',
		"Tecnología de plasma": 'Plasma Technology',
		"Red de investigación intergaláctica": 'Intergalactic Research Network',
		"Tecnología de expedición": 'Expedition Technology',
		"Tecnología de gravitón": 'Graviton Technology',

		// naves
		"Nave pequeña de carga": 'Small Cargo',
		"Nave grande de carga": 'Large Cargo',
		"Cazador ligero": 'Light Fighter',
		"Cazador pesado": 'Heavy Fighter',
		"Crucero": 'Cruiser',
		"Nave de batalla": 'Battleship',
		"Colonizador": 'Colony Ship',
		"Reciclador": 'Recycler',
		"Sonda de espionaje": 'Espionage Probe',
		"Bombardero": 'Bomber',
		"Satélite solar": 'Solar Satellite',
		"Destructor": 'Destroyer',
		"Estrella de la muerte": 'Deathstar',
		"Acorazado": 'Battlecruiser',

		// defense
		"Lanzamisiles": 'Rocket Launcher',
		"Láser pequeño": 'Light Laser',
		"Láser grande": 'Heavy Laser',
		"Cañón Gauss": 'Gauss Cannon',
		"Cañón iónico": 'Ion Cannon',
		"Cañón de plasma": 'Plasma Turret',
		"Cúpula pequeña de protección": 'Small Shield Dome',
		"Cúpula grande de protección": 'Large Shield Dome',
		"Misil de intercepción": 'Anti-Ballistic Missiles',
		"Misil interplanetario": 'Interplanetary Missiles',

		// lunar
		"Base lunar": 'Lunar Base',
		"Sensor Phalanx": 'Sensor Phalanx',
		"Salto cuántico": 'Jump Gate',

		//"Crear alianza propia": 'Make alliance',
		//"Buscar alianzas": 'Search alliance',
		// algunas cosas de galaxia
		//"Espacio exterior": 'missinglang',
		//"Leyenda": 'missinglang',

		// from techtree
		'Construcción': 'Buildings',
		'Requisitos': 'Requirements',
		'Naves espaciales': 'Ships',
		'Sistemas de defensa': 'Defense',
		'Construcciones especiales': 'Lunar Buildings',

		// overview
		'Hora del servidor ': 'Hour',
		'Eventos': 'Events',
		'Diámetro': 'Diameter',
		'Cantidad': 'Amount',

		// fleets
		'Ninguna nave': 'None',
		'Todas las naves': 'All ships',
		'Nueva misión: elegir naves': 'New mission: Choose your fleet',

		'Num.': 'ID',
		'Misión': 'Mission',
		'Cantidad': 'Amount',
		'Comienzo': 'Start',
		'Salida': 'Arrival',
		'Objetivo': 'Objetive',
		'Llegada': 'Arrival',
		'Orden': 'Order',

		'Naves': 'Ships',
		'Disponibles': 'Available',


		'Aceptar': 'OK',
		'Mostrar': 'Show',
		'Buscar!': 'Search!',
		'Borrar': 'Delete',
		"dummy": 'dummy'
	};

	// elementos a revisar
	tagname = ['font', 'a', 'b', 'td', 'th', 'font', 'center', 'div', 'input'];
	// traducciones principales
	for (x = 0; x < tagname.length; x++)
	{
		var obj = document.getElementsByTagName(tagname[x]);

		for (var i = 0; i < obj.length; i++)
		{
			if (lang[obj[i].innerHTML])
				obj[i].innerHTML = lang[obj[i].innerHTML];
			else if (lang[obj[i].value])
				obj[i].value = lang[obj[i].value];
		}
	}

})();

// ==/UserScript==
