// ==UserScript==
// @name           Auto battle click on legendary
// @include        http://*pokemon-vortex.com*
// ==/UserScript==

var legends = [
	// Custom
        'Shiny Magikarp',

	// Grass
	'Shaymin (Sky)',
	'Celebi',
	'Latios',
	'Latias',
	'Rayquaza',
	'Shaymin',
	'Mew',
	'Cresselia',
	'Azelf',
	'Uxie',
	'Mesprit',
	'Virizion',
	'Genesect',

	// Grass (water)
	'Manaphy',
	'Phione',
	'Suicune',
	'Keldeo',
	
	// Ice
	'Articuno',
	'Suicune',
	'Lugia',
	'Regice',
	'Kyurem',
	
	// Cave (land)
	'Groudon',
	'Arceus',
	'Regigigas',
	'Palkia',
	'Dialga',
	'Deoxys',
	'Jirachi',
	'Registeel',
	'Regirock',
	'Mewtwo',
	'Cobalion',
	'Terrakion',
	'Virizion',
	'Reshiram',
	'Zekrom',
	'Kyurem',
	'Genesect',
	'Tornadus',
	'Landorus',

	// Cave (water)
	'Kyogre',
	'Lugia',
	'Keldeo',
	
	// Ghost
	'Mew',
	'Giratina',
	'Rotom',
	'Mesprit',
	'Azelf',
	'Uxie',
	'Celebi',
	'Darkrown',
	'Darkrai',
	
	// Electric
	'Zapdos',
	'Raikou',
	'Jirachi',
	'Darkrai',
	'Darkrown',
	'Thundurus',
	'Zekrom',
	'Genesect',
	
	// Fire
	'Heatran',
	'Ho-oh',
	'Moltres',
	'Entei',
	'Reshiram',
	'Victini'
];

function findLegendary() {
	var wildText = unsafeWindow.document.querySelector('#appear p');
	if (!wildText) {
		//do nothing since bot detection.
		return;
	}

	wildText = wildText.textContent.trim();
	for (var i = 0; i < legends.length; i++) {
		if (wildText.match(legends[i])) {
			var btnDo = unsafeWindow.document.querySelector('input[type="submit"][value="Battle!"]');
			if (btnDo) {
				btnDo.click();
				}
			return;
		}
	}

