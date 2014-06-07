// ==UserScript==
// @name          Storage Accordion
// @version       1.0.0
// @author        zeel
// @description	  Lets you hide sections of the inventory in SB and SP
// @include       *.spybattle.*inventory*
// @include       *.starpirates.*inventory*
// ==/UserScript==

var dotToggle = '.toggle { text-align: center; color: yellow !important; float: right; margin-right: 10px; border: 1px solid; font-size: 12px; margin-top: 3px; width: 14px; } ';
var toggleHover = '.toggle:hover { color: #FC6 !important; text-decoration: none; } ';

addGlobalStyle(dotToggle + toggleHover);
init();

function addGlobalStyle(css) { //Implants the style elemet:
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function expand(sect) {
	document.getElementById(sect + '_toggle').innerHTML = '-'
	document.getElementById(sect).style.display = 'table-row';
}
function crunch(sect) {
	document.getElementById(sect + '_toggle').innerHTML = '+'
	document.getElementById(sect).style.display = 'none';
}

function toggleIiS() {
	if (localStorage.accStateIiS == 'true') {
		localStorage.accStateIiS = 'false';
		crunch('IiS');
	}
	else {
		localStorage.accStateIiS = 'true';
		expand('IiS');
	}
}
function toggleCoN() {
	if (localStorage.accStateCoN == 'true') {
		localStorage.accStateCoN = 'false';
		crunch('CoN');
	}
	else {
		localStorage.accStateCoN = 'true';
		expand('CoN');
	}
}
function toggleUpG() {
	if (localStorage.accStateUpG == 'true') {
		localStorage.accStateUpG = 'false';
		crunch('UpG');
	}
	else {
		localStorage.accStateUpG = 'true';
		expand('UpG');
	}
}

function addButton(sect, i) {
	i.id = sect + '_header';
	i.innerHTML = i.innerHTML +  '\<a href="#' + sect + '_header" class="toggle" id="' + sect + '_toggle"\>\</a\>';
	i.parentNode.nextSibling.nextSibling.id = sect;
}

function init() {
	var isOpen = new Array();

	if (!localStorage.SaccIn) {
		alert('Welcome!\n\nStorage Accordion lets you hide sections of the inventory in SB and SP\n\nBy: zeel\n\n\nInitializing. . .')
		localStorage.SaccIn = 'true';
		localStorage.accStateIiS = 'true';
		localStorage.accStateCoN = 'true';
		localStorage.accStateUpG = 'true';
	}
	
	var row = document.getElementsByClassName('contenthead');
	
	for (var i in row) {
		if (row[i].innerHTML == 'Items in Storage') {
			addButton('IiS', row[i])
			document.getElementById('IiS_toggle').addEventListener('click', toggleIiS, false);
		}
		else if (row[i].innerHTML == 'Consumables') {
			addButton('CoN', row[i])
			document.getElementById('CoN_toggle').addEventListener('click', toggleCoN, false);
		}
		else if (row[i].innerHTML == 'Upgrades') {
			addButton('UpG', row[i])
			document.getElementById('UpG_toggle').addEventListener('click', toggleUpG, false);
		}
	}
	
	if (localStorage.accStateIiS == 'true') {
		expand('IiS');
	}
	else {
		crunch('IiS');
	}
	if (localStorage.accStateCoN == 'true') {
		expand('CoN');
	}
	else {
		crunch('CoN');
	}
	if (localStorage.accStateUpG == 'true') {
		expand('UpG');
	}
	else {
		crunch('UpG');
	}
}