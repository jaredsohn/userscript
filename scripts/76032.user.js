// ==UserScript==
// @name		OGame 
// @namespace	
// @description	This script translate some text to anothers languages
// @include		*ae.ogame*
// @copyright   
// @license     Freeware
// @version     
// @attribution 
// @author      
// @homepage    

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
		"الترتيب": 'Stadistics',
		"Buscar": 'Search',
		"Ayuda": 'Help',

		"Mensajes": 'Messages',
		"Notas": 'Notes',
		"Lista de companeros": 'Buddy list',
		"Opciones": 'Options',
		"Salir": 'Exit',
		"Reglas": 'Rules',
		"Contacto": 'Contact',

		// edificios, naves y tecnologias
		"منجم المعدن": 'Metal Mine',
		"منجم البلور": 'Crystal Mine',
		"مصنع الديوتريوم": 'Deuterium Synthesizer',
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
		"تكنولوجيا التجسس": 'Espionage Technology',
		"التكنولوجيا الحاسوب": 'Computer Technology',
		"تكنولوجيا الأسلحة": 'Weapons Technology',
		"تكنولوجيا الدروع": 'Shielding Technology',
		"تكنولوجية حماية المركبات الفضائية": 'Armour Technology',
		"تكنولوجيا الطاقة": 'Energy Technology',
		"تكنولوجية الأبعاد التعددية": 'Hyperspace Technology',
		"محرك الاحتراق": 'Combustion Drive',
		"المفاعل النبضي": 'Impulse Drive',
		"قوة دفع أبعاد تعددية": 'Hyperspace Drive',
		"تكنولوجيا الليزر": 'Laser Technology',
		"تكنولوجية الإيونات": 'Ion Technology',
		"تكنولوجية البلازما": 'Plasma Technology',
		"شبكة أبحاث المجرات": 'Intergalactic Research Network',
		"Tecnología de expedición": 'Expedition Technology',
		"تكنولوجية الجرافيتون": 'Graviton Technology',
		"الفيزياء الفلكية": 'astrofizyka',

		// naves
		"الناقل الصغير": 'Small Cargo',
		"الناقل الكبير": 'Large Cargo',
		"مقاتلة خفيفة": 'Light Fighter',
		"مقاتلة ثقيلة": 'Heavy Fighter',
		"الطراد": 'Cruiser',
		"مركبة الحرب": 'Battleship',
		"مركبة الاستيطان": 'Colony Ship',
		"Reciclador": 'Recycler',
		"المسبار التجسسي": 'Espionage Probe',
		"Bombardero": 'Bomber',
		"أقمار الطاقة الشمسية": 'Solar Satellite',
		"Destructor": 'Destroyer',
		"Estrella de la muerte": 'Deathstar',
		"Acorazado": 'Battlecruiser',

		// defense
		"قاذف الصواريخ": 'Rocket Launcher',
		"مدفعية ليزر خفيفة": 'Light Laser',
		"مدفعية الليزر الثقيلة": 'Heavy Laser',
		"قاذف غاوس": 'Gauss Cannon',
		"مدفعية الايونات": 'Ion Cannon',
		"قاذف البلازما": 'Plasma Turret',
		"Cúpula pequena de protección": 'Small Shield Dome',
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