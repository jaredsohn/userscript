// ==UserScript==
// @id             ???
// @name           legends
// @version        4.0
// @namespace      
// @author         
// @description    
// @include        http://*.pokemonvortex.org/mobile/map.php?map=*
// @include	       http://*.pokemonvortex.org/mobile/wildbattle.php
// @run-at         document-end
// ==/UserScript==


var rareCustoms = [ 
    
    //Shiny
	'Shiny Dratinire', 'Shiny Dratinilic', 'Shiny Dratinice', 
    //Mystic
    'Mystic Dratinire', 'Mystic Dratinilic', 'Mystic Dratinice',
    //Dark
    'Dark Dratinire', 'Dark Dratinilic', 'Dark Dratinice',
    //Ancient
    'Ancient Dratinire', 'Ancient Dratinilic', 'Ancient Dratinice',
];

var legends = [	
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
    'Dratinice',
	
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
    'Dratinilic',
	
	// Fire
	'Heatran',
	'Ho-oh',
	'Moltres',
	'Entei',
	'Reshiram',
	'Victini',
    'Dratinire'
];


function search() {
	var btnSearch = document.querySelector('.container input[type="submit"][value="Search"]');
	if (btnSearch) {
		btnSearch.click();
	}
}

var foundPokemonTags = document.getElementsByTagName('foundpokemon');
if (foundPokemonTags.length > 0) {
	var foundPoke = false;
	var subsrc = foundPokemonTags[0].innerHTML;
	var encounteredPokemon = subsrc.substring(subsrc.indexOf('<br>Wild ') + 9, subsrc.indexOf(' appeared'));
    
	unsafeWindow.console.info('Encountered ', encounteredPokemon);
    
	/* Finding of SDMA normal pokemons*/
	/*
if (encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic )/)) {
foundPoke = true;
unsafeWindow.console.info('Rare found - ', encounteredPokemon);
}
*/
    
	/*for (var i = 0; i < shinyCustoms.length; i++) {
if (encounteredPokemon.match(shinyCustoms[i]) && encounteredPokemon.indexOf('Shiny ') > -1) {
foundPoke = true;
unsafeWindow.console.info('Rare Custom found - ', encounteredPokemon);
}
}*/
    
    	for (var i = 0; i < rareCustoms.length; i++) {
		if (encounteredPokemon.indexOf(rareCustoms[i]) > -1) {
			foundPoke = true;
			unsafeWindow.console.info('Rare Custom found - ', encounteredPokemon);
		}
	}
    
	for (var i = 0; i < legends.length; i++) {
		if (encounteredPokemon.match(legends[i]) /*&& encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic )/)*/) {
			foundPoke = true;
			unsafeWindow.console.info('Rare Legendary found - ', encounteredPokemon);
		}
	}
    

	if (!foundPoke) {
		search();	
	}
	else {
		var btnBattle = document.querySelector('input[type="submit"][value="Battle!"]');
		if (btnBattle) {
			btnBattle.click();
		}
	}
}
else if (document.title.indexOf('Problem loading page') > -1) {
	unsafeWindow.console.info('Error loading page. Refreshing.');
	window.location = window.location;
}
else {
	unsafeWindow.console.info('Searching...');
	search();
}

var battleHTML = document.getElementById('battleForm');
if (battleHTML != nice) {
	var battleSRC = battleHTML.innerHTML;
	var securityCode = battleSRC.substring(battleSRC.indexOf('Type the following number: ') + 27);
	securityCode = securityCode.substring(0, securityCode.indexOf('<strong>'));
	if (document.getElementById("security") != null) {
		document.getElementById("security").value = securityCode;
	}
    
	var btnContinue = document.querySelector('input[type="submit"][value="Continue"]');
	if (btnContinue) {
		btnContinue.click();
	}
}

if (document.title.indexOf('Vortex Battle Arena') > -1) {
	var inputElements = document.getElementsByTagName('input');
	for (var i = 0; i < inputElements.length; i++) {
		if (inputElements[i].value.indexOf('Master Ball') > -1) {
			var rbMasterBall = inputElements[i];
			rbMasterBall.checked = true;
            
			var btnUseItem = document.querySelector('input[type="submit"][value="Use Item"]');
			if (btnUseItem) {
				btnUseItem.click();
			}
		}
	}
    
    
	var btnContinue = document.querySelector('input[type="submit"][value="Continue!"]');
	if (btnContinue) {
		btnContinue.click();
	}
    
	
	var linksOnPage = document.getElementsByTagName('a');
	for (var j = 0; j < linksOnPage.length; j++) {
		if (linksOnPage[j].href.indexOf('map.php?') > -1) {
			window.location = linksOnPage[j];
		}
	}
}