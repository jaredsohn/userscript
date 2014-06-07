// ==/UserScript==

// Freundliche Begruessung
//
// ==UserScript==
// @name          SVZ-Freundliche Begruessung 
// @author        Kevin K. | WoM.Seite.com
// @copyright     01.04.2010, Kevin K.
// @namespace     http://www.wom.seite.com
// @description   Begrüst dich je nach Tageszeit
// @include       http://www.schuelerVZ.net/*
// @include       http://www.studiVZ.net/*
// @include       http://www.meinVZ.net/*

// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}


function createBox() {
	datum = new Date();
	std = datum.getHours();
	var brg = document.getElementById('Feeds-Post-Form').previousSibling.previousSibling;
	var name = brg.textContent;
	name = name.substr(4);
	name = name.substr(0, name.length - 1);

	var text = 'Um diese Zeit online';
	var suffix = '???';
	if (std > 4) {
    	text = 'Guten Morgen';
    	suffix = '!';
	}
	if (std > 11) {
    	text = 'Guten Tag';
	}
	if (std > 12) {
    	text = 'Guten Mittag';
	}
	if (std > 14) {
    	text = 'Guten Nachmittag';
	}
	if (std > 18) {
    	text = 'Guten Abend';
	}
	if (std > 22) {
    	text = 'Gute Nacht';
	}

	brg.textContent = text + ' ' + name + suffix;

}

createBox();


