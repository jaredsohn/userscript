// ==UserScript==
// @name			Legendary Pokémon: Search tweaks
// @namespace		uri:opaquepink@gmail.com,2007-11:LegendaryPokemon
// @description	Some changes to the Pokédex search, tweaks searching for specific types of Pokémon.
// @author		Opaque
// @version		Version 2.7: 01/05/2008
// @include		http*://*.legendarypokemon.net/pokedex*
// @include		http*://*.legendarypokemon.net/dp/pokedex*
// ==/UserScript==
if(document.getElementById('dexmenu').getElementsByTagName('li')[6].firstChild.getAttribute('class').split(' ')[0]==='dexactive'){
// Simple CSS adding function, shamelessly copied from Dive into Greasemonkey.
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
// Simple xpath function to remove an element.
function xpathRemove(query, context) {
	context = context ? context : document;
	obj = document.evaluate(query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (obj) return obj.parentNode.removeChild(obj);
}
// Delete ??? from the type selector.
xpathRemove("//select[@id='atype']/option[@value='9']");
// Delete Flying and ??? from first type selector.
xpathRemove("//select[@id='type']/option[@value='2']");
xpathRemove("//select[@id='type']/option[@value='9']");
// Delete Normal and ??? from second type selector.
xpathRemove("//select[@id='type2']/option[@value='0']");
xpathRemove("//select[@id='type2']/option[@value='9']");
// Delete Monster, Ditto and No Eggs from the second egg group selector.
xpathRemove("//select[@id='egggroup2']/option[@value='1']");
xpathRemove("//select[@id='egggroup2']/option[@value='13']");
xpathRemove("//select[@id='egggroup2']/option[@value='15']");
// New CSS to control what second types/egg groups are selectable.
var style = '#type2 option, #egggroup2 option { display: none; }'+
		  '#type2.normal option[value="2"],'+
		  '#type2.normal option[value="11"],'+
		  '#type2.normal option[value="14"],'+
		  '#type2.fighting option[value="8"],'+
		  '#type2.fighting option[value="14"],'+
		  '#type2.poison option[value="1"],'+
		  '#type2.poison option[value="2"],'+
		  '#type2.poison option[value="4"],'+
		  '#type2.poison option[value="6"],'+
		  '#type2.poison option[value="17"],'+
		  '#type2.ground option[value="2"],'+
		  '#type2.ground option[value="5"],'+
		  '#type2.ground option[value="14"],'+
		  '#type2.ground option[value="16"],'+
		  '#type2.rock option[value="2"],'+
		  '#type2.rock option[value="4"],'+
		  '#type2.rock option[value="6"],'+
		  '#type2.rock option[value="8"],'+
		  '#type2.rock option[value="11"],'+
		  '#type2.rock option[value="12"],'+
		  '#type2.rock option[value="14"],'+
		  '#type2.rock option[value="17"],'+
		  '#type2.bug option[value="1"],'+
		  '#type2.bug option[value="2"],'+
		  '#type2.bug option[value="3"],'+
		  '#type2.bug option[value="4"],'+
		  '#type2.bug option[value="5"],'+
		  '#type2.bug option[value="7"],'+
		  '#type2.bug option[value="8"],'+
		  '#type2.bug option[value="11"],'+
		  '#type2.bug option[value="12"],'+
		  '#type2.ghost option[value="2"],'+
		  '#type2.ghost option[value="3"],'+
		  '#type2.ghost option[value="16"],'+
		  '#type2.ghost option[value="17"],'+
		  '#type2.steel option[value="2"],'+
		  '#type2.steel option[value="4"],'+
		  '#type2.steel option[value="5"],'+
		  '#type2.steel option[value="14"],'+
		  '#type2.steel option[value="16"],'+
		  '#type2.fire option[value="1"],'+
		  '#type2.fire option[value="2"],'+
		  '#type2.fire option[value="4"],'+
		  '#type2.fire option[value="5"],'+
		  '#type2.fire option[value="8"],'+
		  '#type2.water option[value="1"],'+
		  '#type2.water option[value="2"],'+
		  '#type2.water option[value="3"],'+
		  '#type2.water option[value="4"],'+
		  '#type2.water option[value="5"],'+
		  '#type2.water option[value="8"],'+
		  '#type2.water option[value="12"],'+
		  '#type2.water option[value="13"],'+
		  '#type2.water option[value="14"],'+
		  '#type2.water option[value="15"],'+
		  '#type2.water option[value="16"],'+
		  '#type2.water option[value="17"],'+
		  '#type2.grass option[value="1"],'+
		  '#type2.grass option[value="2"],'+
		  '#type2.grass option[value="3"],'+
		  '#type2.grass option[value="4"],'+
		  '#type2.grass option[value="14"],'+
		  '#type2.grass option[value="17"],'+
		  '#type2.electric option[value="2"],'+
		  '#type2.electric option[value="7"],'+
		  '#type2.electric option[value="8"],'+
		  '#type2.psychic option[value="1"],'+
		  '#type2.psychic option[value="2"],'+
		  '#type2.psychic option[value="12"],'+
		  '#type2.ice option[value="2"],'+
		  '#type2.ice option[value="4"],'+
		  '#type2.ice option[value="7"],'+
		  '#type2.ice option[value="11"],'+
		  '#type2.ice option[value="12"],'+
		  '#type2.ice option[value="14"],'+
		  '#type2.dragon option[value="2"],'+
		  '#type2.dragon option[value="4"],'+
		  '#type2.dragon option[value="14"],'+
		  '#type2.dark option[value="2"],'+
		  '#type2.dark option[value="7"],'+
		  '#type2.dark option[value="10"],'+
		  '#type2.dark option[value="15"],'+
		  '#egggroup2.monster option[value="2"],'+
		  '#egggroup2.monster option[value="5"],'+
		  '#egggroup2.monster option[value="7"],'+
		  '#egggroup2.monster option[value="14"],'+
		  '#egggroup2.water1 option[value="3"],'+
		  '#egggroup2.water1 option[value="4"],'+
		  '#egggroup2.water1 option[value="5"],'+
		  '#egggroup2.water1 option[value="6"],'+
		  '#egggroup2.water1 option[value="7"],'+
		  '#egggroup2.water1 option[value="9"],'+
		  '#egggroup2.water1 option[value="11"],'+
		  '#egggroup2.water1 option[value="12"],'+
		  '#egggroup2.water1 option[value="14"],'+
		  '#egggroup2.bug option[value="7"],'+
		  '#egggroup2.bug option[value="8"],'+
		  '#egggroup2.bug option[value="9"],'+
		  '#egggroup2.flying option[value="5"],'+
		  '#egggroup2.flying option[value="6"],'+
		  '#egggroup2.flying option[value="14"],'+
		  '#egggroup2.ground option[value="6"],'+
		  '#egggroup2.ground option[value="7"],'+
		  '#egggroup2.ground option[value="8"],'+
		  '#egggroup2.ground option[value="12"],'+
		  '#egggroup2.ground option[value="14"],'+
		  '#egggroup2.fairy option[value="7"],'+
		  '#egggroup2.fairy option[value="10"],'+
		  '#egggroup2.fairy option[value="11"],'+
		  '#egggroup2.plant option[value="8"],'+
		  '#egggroup2.water2 option[value="14"]'+
		  '{ display: block; }'+
		  '#type2 option[value="18"], #type2 option[value="19"], #type2.any option,'+
		  '#egggroup2 option[value="0"], #egggroup2 option[value="16"], #egggroup2.any option { display: block; }'+
		  '#egggroup2.humanshape option[value="0"], #egggroup2.water3 option[value="0"], #egggroup2.mineral option[value="0"], #egggroup2.inteterminate option[value="0"], #egggroup2.ditto option[value="0"], #egggroup2.dragon option[value="0"], #egggroup2.noeggs option[value="0"]'+
		  '{ display: none; }';
addGlobalStyle(style);
// Set the right class for the second type selector and make sure it switches on change.
document.getElementById('type2').setAttribute('class',document.getElementById('type').options[document.getElementById('type').selectedIndex].innerHTML.toLowerCase());
document.getElementById('type').setAttribute('onchange','document.getElementById(\'type2\').setAttribute(\'class\',document.getElementById(\'type\').options[document.getElementById(\'type\').selectedIndex].innerHTML.toLowerCase())');
// Set the right class for the second egg group selector and make sure it switches on change.
document.getElementById('egggroup2').setAttribute('class',document.getElementById('egggroup').options[document.getElementById('egggroup').selectedIndex].innerHTML.toLowerCase().split(' ').join(''));
document.getElementById('egggroup').setAttribute('onchange','document.getElementById(\'egggroup2\').setAttribute(\'class\',document.getElementById(\'egggroup\').options[document.getElementById(\'egggroup\').selectedIndex].innerHTML.toLowerCase().split(\' \').join(\'\'))');
// Get some of the selections from the form.
var seltype1 = document.getElementById('type').options[document.getElementById('type').selectedIndex].innerHTML;
var seltype2 = document.getElementById('type2').options[document.getElementById('type2').selectedIndex].innerHTML;
var selegg1 = document.getElementById('egggroup').options[document.getElementById('egggroup').selectedIndex].innerHTML;
var selegg2 = document.getElementById('egggroup2').options[document.getElementById('egggroup2').selectedIndex].innerHTML;
// Searching for pokémon with a specific second egg group ( Any / Egg Group ) will no longer show pokémon that have the specified egg group as first egg group.
if(document.getElementById('results') && selegg1==='ANY' && selegg2!=='ANY' && document.getElementById('dexmode').value==='breeder'){
	var egg, segg;
	var d = 0;
	var check = '/ '+selegg2.substring(0,1)+selegg2.substring(1).toLowerCase();
	var tbody = document.getElementById('results').getElementsByTagName('tbody')[0];
	var hits = tbody.getElementsByTagName('tr');
	for(var i = 0; i<hits.length; i++){
		egg = hits[i].getElementsByTagName('td')[3].innerHTML;
		segg = egg.substring(egg.length-check.length, egg.length);
		if(segg!==check){
			hits[i].parentNode.removeChild(hits[i]);
			i--
			d++
		}
	}
	var foot = document.getElementById('results').getElementsByTagName('tfoot')[0].getElementsByTagName('td')[0];
	var total = foot.innerHTML;
	foot.innerHTML = (total.substring(0,total.indexOf(' '))-d)+total.substring(total.indexOf(' '));
}
// Searching for pokémon with a specific second type ( Any / Type ) will no longer show pokémon that have the specified type as first type.
if(document.getElementById('results') && seltype1==='ANY' && seltype2!=='ANY'){
	var type, stype;
	var d = 0;
	var check = '/ '+seltype2.substring(0,1)+seltype2.substring(1).toLowerCase();
	var tbody = document.getElementById('results').getElementsByTagName('tbody')[0];
	var hits = tbody.getElementsByTagName('tr');
	for(var i = 0; i<hits.length; i++){
		type = hits[i].getElementsByTagName('td')[2].innerHTML;
		stype = type.substring(type.length-check.length, type.length);
		if(stype!==check){
			hits[i].parentNode.removeChild(hits[i]);
			i--
			d++
		}
	}
	var foot = document.getElementById('results').getElementsByTagName('tfoot')[0].getElementsByTagName('td')[0];
	var total = foot.innerHTML;
	foot.innerHTML = (total.substring(0,total.indexOf(' '))-d)+total.substring(total.indexOf(' '));
}
}