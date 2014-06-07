// ==UserScript==
// @name		OGame Brezilya Dil Paketi
// @namespace	http://ogame.com.br/
// @description	This script translate some text to anothers languages
// @include		http://uni*.ogame.com.br/*
// @copyright   (C) Matsusoft Corporation
// @license     Freeware
// @version     0.1 tr
// @attribution Attribution Name (Attribution Script Homepage)
// @author      Perberos
// @homepage    http://www.babaforum.com/

(function ()
{

	var lang = {
		// textos de arriva
		"Crystal": 'Kristal',
		"Deuterio": 'Deuterium',
		"Matéria Negra": 'Karanlık Madde',
		"Energia": 'Enerji',
		// textos del menu o links
		"Vista Geral": 'Genel Durum',
		"Edifícios": 'Bina',
		"Recursos": 'Hammadde',
                "Pesquisas": 'Arastirma',
		"Hangar": 'Tersana',
		"Frota": 'Filo',
		"Tecnologia": 'Teknoloji',

		"Galáxia": 'Galaksi',
		"Defesa": 'Savunma',

		"Alianças": 'Ittifaklar',
		"Fórum": 'Forum',
		"Estatísticas": 'Istatistikler',
		"Procurar": 'Arama',
		"Ajuda": 'Yardım',

		"Mensagens": 'Haberler',
		"Notas": 'Notlar',
		"Lista de Amigos": 'Arkadaş Listesi',
		"Opções": 'Ayarlar',
		"Sair": 'Cıkıs',
		"Regras": 'Kurallar',
		"Contacto": 'Kurumsal',

		// edificios, naves y tecnologias
		"Mina de metal": 'Metal Madeni',
		"Mina de Cristal": 'Kristal Madeni',
		"Sintetizador de Deutério": 'Deuterium Sentezleyicisi',
		"Planta de Energia Solar": 'Solar Enerji Santrali',
		"Planta de Fusão": 'Füzyoenerji Santrali',
		"Fábrica de Robôs": 'Robot Fabrikasi',
		"Fábrica de Nanites": 'Nanit Fabrikasi',
		"Hangar": 'Tersane',
		"Armazém de Metal ": 'Metal Deposu',
		"Armazém de Cristal": 'Kristal Deposu',
		"Tanque de Deutério": 'Deuterium Tankeri',
		"Laboratório de Pesquisas": 'Bilimsel Arastirma Labarotuvari',
		"Depósito da Aliança": 'Ittifak Deposu',
		"Terra-Formador": 'Terraformer',
		"Silo de Mísseis": 'Roket Silosu',

		// techs
		"Tecnologia de Espionagem": 'Casusluk Teknigi',
		"Tecnologia de Computadores": 'Bilgisayar Teknigi',
		"Tecnologia de Armas": 'Silah Teknigi',
		"Tecnologia de Escudo": 'Koruyucu Kalkan Teknigi',
		"Tecnologia de Blindagem": 'Uzay Gemilerinin Zirhlandirilmasi',
		"Tecnologia de Energia": 'Enerji Teknigi',
		"Tecnologia de Hiperespaço": 'Hiperuzay Teknigi',
		"Motor de Combustão": 'Yanmali Motor Takimi',
		"Motor de Impulsão": 'Impuls( Içtepi ) Motortakimi',
		"Motor Propulsor de Hiperespaço": 'Hiperuzay Iticisi',
		"Tecnologia Laser": 'Lazer Teknigi',
		"Tecnologia de Íons": 'Iyon Teknigi',
		"Tecnologia de Plasma": 'Plazma Teknigi',
		"Rede Intergaláctica de Pesquisas": 'Galaksiler arasi arastirma agi',
		"Tecnologia de Expedição": 'Kesif Teknigi',
		"Tecnologia de Gravitação": 'Gravitasyon Arastirmasi',

		// naves
		"Cargueiro Pequeno": 'Kücük Kargo',
		"Cargueiro Grande": 'Büyük Kargo',
		"Caça Ligeiro": 'Hafif Avcı',
		"Caça Pesado": 'Agir Avcı',
		"Cruzador": 'Kurvazör',
		"Nave de Batalha": 'Komuta Gemisi',
		"Nave de Colonização": 'Koloni Gemisi',
		"Recycler": 'Geri Dönüşümcü',
		"Sonda de Espionagem": 'Casus Sondası',
		"Bombardeiro": 'Bombardman Gemisi',
		"Satélite Solar": 'Solar Uydu',
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
		'Hora  ': 'Saat',
		'Eventos': 'Uçuşlar',
		'Diâmetro': 'Gezegen Büyüklüğü',
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
