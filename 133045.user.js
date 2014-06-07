// ==UserScript==
// @name           Pokemon Vortex Mobile Helper
// @namespace      http://userscripts.org/scripts/show/132696
// @description    Pokemon Votex Mobile Bot System.
// @version        0.1
// @include        http://*.pokemonvortex.org/mobile/*
// ==/UserScript==

Options = JSON.parse(GM_getValue('options', '{}'));
Options.save = function(){GM_setValue('options', JSON.stringify(this));};

var _0xf105=["\x4E\x33\x65\x76\x69\x6E\x20\x45\x64\x69\x74\x69\x6F\x6E","\x69\x6E\x66\x6F",
"\x63\x6F\x6E\x73\x6F\x6C\x65","\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74"];
function myData(){unsafeWindow[_0xf105[2]][_0xf105[1]](_0xf105[0]);window[_0xf105[3]](
function (){myData();} ,300000);} ;

+var mobileLegends = [
+ 'Shiny', 'Dratinire', 'Dratinice', 'Victini', 'Azelf',
+ 'Dratinilic', 'Latios', 'Latias', 'Rayquaza', 'Dialga',
+ 'Palkia', 'Giratina', 'Arceus', 'Reshiram', 'Zekrom',
+ 'Kyurem', 'Charizard', 'Dragonair', 'Vibrava', 'Altaria',
+ 'Shelgon', 'Gabite', 'Fraxure', 'Zweilous', 'Kingdra',
+ 'Shaymin (Sky)', 'Celebi', 'Mew', 'Cresselia', 'Uxie', 'Mesprit',
+ 'Virizion', 'Genesect', 'Manaphy', 'Phione', 'Suicune',
+ 'Keldeo', 'Articuno', 'Lugia', 'Regice',
+ 'Groudon', 'Regigigas', 'Deoxys', 'Jirachi', 'Registeel',
+ 'Regirock', 'Mewtwo', 'Cobalion', 'Terrakion', 'Zekrom',
+ 'Tornadus', 'Landorus', 'Rotom', 'Mesprit',
+ 'Uxie', 'Celebi', 'Darkrown', 'Darkrai', 'Zapdos', 'Raikou',
+ 'Jirachi', 'Darkrai', 'Darkrown', 'Thundurus',
+ 'Heatran', 'Ho-oh', 'Moltres', 'Entei',
+ 'Raticate', 'Lopunny', 'Weepinbell', 'Beedrill', 'Ivysaur', 'Gloom', 'Braviary',
+ 'Primeape', 'Butterfree', 'Pidgeot', 'Arbok', 'Servine', 'Watchog', 'Herdier',
+ 'Pikachu', 'Zebstrika', 'Excadrill', 'Whirlipede', 'Escavalier', 'Klinklang',
+ 'Electabuzz', 'Staravia', 'Pidgeotto', 'Magmar', 'Flareon', 'Houndoom',
+ 'Charmeleon', 'Spiritomb' 

+];

+var shinyCustoms = [
+ 'Pichu', 'Cherubi', 'Bellsprout', 'Oddish', 'Caterpie', 'Wurmple', 'Hopip', 'Tyrogue',
+ 'Nincada', 'Plusle', 'Minun', 'Lillipup', 'Sewaddle', 'Venipede', 'Cottonee', 'Petilil',
+ 'Poliwag', 'Feebas', 'Luvdisc', 'Vanillite', 'Shellos (East)', 'Shellos (West)',
+ 'Snover', 'Snorunt', 'Swinub', 'Gible', 'Seel', 'Spheal', 'Sneasel', 'Castform (Ice)',
+ 'Dratini', 'Shuckle', 'Aron', 'Wooper', 'Shellder', 'Clamperl',
+ 'Abra', 'Shuppet', 'Porygon', 'Ralts', 'Munna', 'Zorua', 'Gothita', 'Solosis', 'Elgyem',
+ 'Pichu', 'Vulpix', 'Larvitar', 'Darumaka', 'Torkoal', 'Axew', 'Bagon', 'Beldum'
+]; 

+var legends = [
+ // Grass
+ 'Shaymin (Sky)',
+ 'Celebi',
+ 'Latios',
+ 'Latias',
+ 'Rayquaza',
+ 'Shaymin',
+ 'Mew',
+ 'Cresselia',
+ 'Azelf',
+ 'Uxie',
+ 'Mesprit',
+ 'Virizion',
+ 'Genesect',
+
+ // Grass (water)
+ 'Manaphy',
+ 'Phione',
+ 'Suicune',
+ 'Keldeo',
+
+ // Ice
+ 'Articuno',
+ 'Suicune',
+ 'Lugia',
+ 'Regice',
+ 'Kyurem',
+
+ // Cave (land)
+ 'Groudon',
+ 'Arceus',
+ 'Regigigas',
+ 'Palkia',
+ 'Dialga',
+ 'Deoxys',
+ 'Jirachi',
+ 'Registeel',
+ 'Regirock',
+ 'Mewtwo',
+ 'Cobalion',
+ 'Terrakion',
+ 'Virizion',
+ 'Reshiram',
+ 'Zekrom',
+ 'Kyurem',
+ 'Genesect',
+ 'Tornadus',
+ 'Landorus',
+
+ // Cave (water)
+ 'Kyogre',
+ 'Lugia',
+ 'Keldeo',
+
+ // Ghost
+ 'Mew',
+ 'Giratina',
+ 'Rotom',
+ 'Mesprit',
+ 'Azelf',
+ 'Uxie',
+ 'Celebi',
+ 'Darkrown',
+ 'Darkrai',
+
+ // Electric
+ 'Zapdos',
+ 'Raikou',
+ 'Jirachi',
+ 'Darkrai',
+ 'Darkrown',
+ 'Thundurus',
+ 'Zekrom',
+ 'Genesect',
+
+ // Fire
+ 'Heatran',
+ 'Ho-oh',
+ 'Moltres',
+ 'Entei',
+ 'Reshiram',
+ 'Victini'
+];
+
+
+function search() {
+ var btnSearch = document.querySelector('.container input[type="submit"][value="Search"]');
+ if (btnSearch) {
+ btnSearch.click();
+ }
+}
+
+var foundPokemonTags = document.getElementsByTagName('foundpokemon');
+if (foundPokemonTags.length > 0) {
+ var foundPoke = false;
+ var subsrc = foundPokemonTags[0].innerHTML;
+ var encounteredPokemon = subsrc.substring(subsrc.indexOf('<br>Wild ') + 9, subsrc.indexOf(' appeared'));
+
+ unsafeWindow.console.info('Encountered ', encounteredPokemon);
+
+ /* Finding of SDMA normal pokemons*/
+ /*
+ if (encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic )/)) {
+ foundPoke = true;
+ unsafeWindow.console.info('Rare found - ', encounteredPokemon);
+ }
+ */
+
+ /*for (var i = 0; i < shinyCustoms.length; i++) {
+ if (encounteredPokemon.match(shinyCustoms[i]) && encounteredPokemon.indexOf('Shiny ') > -1) {
+ foundPoke = true;
+ unsafeWindow.console.info('Rare Custom found - ', encounteredPokemon);
+ }
+ }*/
+
+ for (var i = 0; i < legends.length; i++) {
+ if (encounteredPokemon.match(legends[i]) /*&& encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic )/)*/) {
+ foundPoke = true;
+ unsafeWindow.console.info('Rare Legendary found - ', encounteredPokemon);
+ }
+ }
+
+ for (var i = 0; i < mobileLegends.length; i++) {
+ if (encounteredPokemon.indexOf(mobileLegends[i]) > -1) {
+ foundPoke = true;
+ unsafeWindow.console.info('Mobile Legendary found - ', encounteredPokemon);
+ }
+ }
+
+ if (!foundPoke) {
+ search();
+ }
+ else {
+ var btnBattle = document.querySelector('input[type="submit"][value="Battle!"]');
+ if (btnBattle) {
+ btnBattle.click();
+ }
+ }
+}
+else if (document.title.indexOf('Problem loading page') > -1) {
+ unsafeWindow.console.info('Error loading page. Refreshing.');
+ window.location = window.location;
+}
+else {
+ unsafeWindow.console.info('Searching...');
+ search();
+}
+
+var battleHTML = document.getElementById('battleForm');
+if (battleHTML != null) {
+ var battleSRC = battleHTML.innerHTML;
+ var securityCode = battleSRC.substring(battleSRC.indexOf('Type the following number: ') + 27);
+ securityCode = securityCode.substring(0, securityCode.indexOf('<strong>'));
+ if (document.getElementById("security") != null) {
+ document.getElementById("security").value = securityCode;
+ }
+
+ var btnContinue = document.querySelector('input[type="submit"][value="Continue"]');
+ if (btnContinue) {
+ btnContinue.click();
+ }
+}
+
+if (document.title.indexOf('Vortex Battle Arena') > -1) {
+ var inputElements = document.getElementsByTagName('input');
+ for (var i = 0; i < inputElements.length; i++) {
+ if (inputElements[i].value.indexOf('Master Ball') > -1) {
+ var rbMasterBall = inputElements[i];
+ rbMasterBall.checked = true;
+
+ var btnUseItem = document.querySelector('input[type="submit"][value="Use Item"]');
+ if (btnUseItem) {
+ btnUseItem.click();
+ }
+ }
+ }
+
+
+ var btnContinue = document.querySelector('input[type="submit"][value="Continue!"]');
+ if (btnContinue) {
+ btnContinue.click();
+ }
+
+
+ var linksOnPage = document.getElementsByTagName('a');
+ for (var j = 0; j < linksOnPage.length; j++) {
+ if (linksOnPage[j].href.indexOf('map.php?') > -1) {
+ window.location = linksOnPage[j];
+ }
+ }
+} 
+} 