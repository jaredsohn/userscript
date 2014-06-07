// ==UserScript==

// @name                Hitkeytosend v0,5
// @description		Deff auserhalb = Taste 'T' Angreifen = Taste'Y' Unterstuetzen = Taste'C' Bestaetigen = Taste'S' Ag senden = Taste'X'                                          naechster Bericht = Taste'E' voriger Bericht = Taste'Q' naechstes Dorf = Taste'D' voriges Dorf = Taste'A' Truppen im Dorf = 'F'
// @include		http://*/*
// @exclude		http://*/*&screen=mail*
// @exclude		http://*/*&screen=memo*
// @exclude		http://*/groups.php?*
// @exclude		http://*/*&screen=overview_villages*
// @exclude		http://*/*&screen=settings*
// @exclude		http://*/*&screen=report
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
		if (event.which == attack || event.which == submit || event.which == insert || event.which == nextb || event.which == beforeb || event.which == nextd || event.which == befored || event.which == troup || event.which == inread || event.which == inputing) {
			controlInputs[0] = getInputs();
		}
	}, true);
	document.addEventListener('keyup', function(event) {
		if (event.which == attack || event.which == submit || event.which == insert || event.which == nextb || event.which == beforeb || event.which == nextd || event.which == befored || event.which == troup || event.which == inread || event.which == inputing) {
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
					case troup:	var links = document.getElementById('menu_row2').getElementsByTagName('a')[0].href;
							if (links.match(/village=(\d+)/)) {var dorfid = RegExp.$1}
							var welt = document.URL.split('village')[0];
							window.location.href = welt + 'village=n' + dorfid + '&screen=place&mode=units';
							break;
					case attack:	if (document.getElementsByName('attack')[0] != undefined) {selectAllUnits(true);document.getElementsByName('attack')[0].click()}
							break;              
					case support:	if (document.getElementsByName('support')[0] != undefined) {document.getElementsByName('support')[0].click()}
							break;
					case submit:	var input = new Array();
							input = document.getElementsByTagName('input');
							for (a = 0; a < input.length; a++) {if (input[a].value.match('OK') == 'OK' && !input[a].parentNode.parentNode.innerHTML.match(/<span id="edit_\d+" style="display: none;">/)) {input[a].click(); break}}
							break;
					case insert:	if (document.getElementsByName('snob')[0] != undefined) {document.getElementsByName('spy')[0].value = '5'}
							if (document.getElementsByName('heavy')[0] != undefined) {document.getElementsByName('light')[0].value = '500'}
							if (document.getElementsByName('attack')[0] != undefined) {document.getElementsByName('attack')[0].click()}
							break;
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
							if (window.location.href.match(/screen=place.+mode=units/)) {
								var tables = document.getElementById('content_value').getElementsByTagName('table');
								for (a = 0; a < tables.length; a++) {
									if (tables[a].className == 'vis' && tables[a].getElementsByTagName('th')[0] != undefined && tables[a].getElementsByTagName('th')[0].innerHTML == 'Dorf') {var table = tables[a]; break}
								}
								if (table == undefined) {alert('Fehler beim Einlesen!')}
								else {
									var koordExec = /\((\d+\|\d+)\) K\d+/;
									var koords = koordExec.exec(table.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML)[1];
									GM_setValue('koordHitkey', koords);
								}
								window.location.href = window.location.href.replace(/&mode=units/, '');
							}
							break;
					case inputing:
							if (window.location.href.match('screen=place') && document.getElementsByName('attack')[0] != undefined && GM_getValue('koordHitkey') != undefined) {
								var truppen = new Array('Spear', 'Sword', 'Archer', 'Spy', 'Heavy');
								var maxExec = />\((\d+)\)<\/a>/;
								for (a = 0; a < truppen.length; a++) {
									var max = parseInt(maxExec.exec(document.getElementsByName(truppen[a].toLowerCase())[0].parentNode.innerHTML)[1]);
									document.getElementsByName(truppen[a].toLowerCase())[0].value = String(max);
								}
								document.getElementById('inputx').value = GM_getValue('koordHitkey').split('|')[0];
								document.getElementById('inputy').value = GM_getValue('koordHitkey').split('|')[1];
								GM_deleteValue('koordHitkey');
								document.getElementsByName('support')[0].click();
							}
							break;
				}
			}
		}
	}, true);
}