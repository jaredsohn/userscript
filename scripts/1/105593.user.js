// ==UserScript==

// @name                Hitkeytosend
// @description		Deff auserhalb = Taste 'T' Angreifen = Taste'Y' Unterstuetzen = Taste'C' Bestaetigen = Taste'S' Ag senden = Taste'X'                                          naechster Bericht = Taste'E' voriger Bericht = Taste'Q' naechstes Dorf = Taste'D' voriges Dorf = Taste'A' Truppen im Dorf = 'F'
// @include		http://*/*
// @exclude		http://*/*&screen=mail*
// @exclude		http://*/*&screen=memo*
// @exclude		http://*/groups.php?*
// @exclude		http://*/*&screen=overview_villages*
// @exclude		http://*/*&screen=settings*
// @exclude		http://*/*&screen=report
// @exclude		http://*/*&screen=forum*
// ==/UserScript==


var angreifen = 'y';
var unterstuetzen = 'c';
var bestaetigen = 's';
var ag = 'x';
var naechsterbericht = 'q';
var vorigerbericht = 'e';
var naechstesdorf = 'd';
var vorigesdorf = 'a';
var naechstetruppen = 'f';
var einlesen = 'j';
var einfuegen = 'i';


var status = 'An';
if(GM_getValue('hitkeystatus')!=undefined) {status = GM_getValue('hitkeystatus')};

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
for(var x = 0; x < alphabet.length; x++) {
	var index = x + 65;
	if(alphabet[x] == angreifen) {var attack = index;}
	else if(alphabet[x] == unterstuetzen) {var support = index;}
	else if(alphabet[x] == bestaetigen) {var submit = index;}
	else if(alphabet[x] == ag) {var insert = index;}
	else if(alphabet[x] == naechsterbericht) {var nextb = index;}
	else if(alphabet[x] == vorigerbericht) {var beforeb = index;}
	else if(alphabet[x] == naechstesdorf) {var nextd = index;}
	else if(alphabet[x] == vorigesdorf) {var befored = index;}
	else if(alphabet[x] == naechstetruppen) {var troup = index;}
	else if(alphabet[x] == einlesen) {var inread = index;}
	else if(alphabet[x] == einfuegen) {var inputing = index;}
}
var einf = document.getElementById('menu_row2');
var link = document.createElement('a');
if (status == 'An') {link.innerHTML = 'An'}
else {link.innerHTML = 'Aus'}
link.href = '';
link.setAttribute('style', 'text-decoration:none; cursor:pointer');
link.addEventListener('click', function(){
	if (link.innerHTML == 'An') {
		status = 'Aus';
		link.innerHTML == 'Aus';
		GM_setValue('hitkeystatus', status);
	}
	else {
		status = 'An';
		link.innerHTML == 'An';
		GM_setValue('hitkeystatus', status);
	}
}, false);
var td = document.createElement('td');
td.appendChild(link);
einf.appendChild(td);
if (status == 'An') {addkey()}

function getInputs() {
	var inputs = document.getElementsByTagName('input');
	var arr = new Array();
	for (a = 0; a < inputs.length; a++) {
		if(inputs[a].type == 'text') {arr.push(inputs[a].value)}
	}
	return arr;
}

function addkey() {
	var controlInputs = new Array();
	document.addEventListener('keydown', function(event) {
		if (event.which == attack ||event.which == support || event.which == submit || event.which == insert || event.which == nextb || event.which == beforeb || event.which == nextd || event.which == befored || event.which == troup || event.which == inread || event.which == inputing) {
			controlInputs[0] = getInputs();
		}
	}, true);
	document.addEventListener('keyup', function(event) {
		if (event.which == attack ||event.which == support || event.which == submit || event.which == insert || event.which == nextb || event.which == beforeb || event.which == nextd || event.which == befored || event.which == troup || event.which == inread || event.which == inputing) {
			var bool = true;
			controlInputs[1] = getInputs();
			for (a = 0; a < controlInputs[1].length; a++) {
				if (controlInputs[0][a] != controlInputs[1][a]) {
					bool = false;
					break;
				}
			}
			if (window.location.href.match('screen=place')) {bool = true}
			if (bool) {
				switch(event.which) {
					case troup:	
					case attack:	{selectAllUnits(true);insertUnit($('#unit_input_snob'), 0);document.forms[0].attack.click()}
							break;
					case support:	{selectAllUnits(true);insertUnit($('#unit_input_ram'), 0);insertUnit($('#unit_input_catapult'), 0);insertUnit($('#unit_input_snob'), 0);document.forms[0].support.click()}
      							break;
					case submit:	var input = new Array();
							input = document.getElementsByTagName('input');
							for (a = 0; a < input.length; a++) {if (input[a].value.match('OK') == 'OK' && !input[a].parentNode.parentNode.innerHTML.match(/<span id="edit_\d+" style="display: none;">/)) {input[a].click(); break}}
							break;
					case insert:	break;
					case nextb:	var input = new Array();
							input = document.getElementsByTagName('a');
							for (a = 0; a < input.length; a++) {if (input[a].innerHTML == '&lt;&lt;') {window.location.href = input[a].href; break}}
							break;
					case beforeb:	var input = new Array();
							input = document.getElementsByTagName('a');
							for (a = 0; a < input.length; a++) {if (input[a].innerHTML == '&gt;&gt;') {window.location.href = input[a].href; break}}
							break;
					case nextd:	var input = new Array();
							input = document.getElementsByTagName('a');
							for (a = 0; a < input.length; a++) {if (input[a].href.match('village=n') == 'village=n') {window.location.href = input[a].href; break}}
							break;
					case befored:	var input = new Array();
							input = document.getElementsByTagName('a');
							for (a = 0; a < input.length; a++) {if (input[a].href.match('village=p') == 'village=p') {window.location.href = input[a].href; break}}
							break;
					case inread:	
					case inputing:	
				}
			}
		}
	}, true);
}