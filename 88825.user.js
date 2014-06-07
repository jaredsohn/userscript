// ==UserScript==
// @name           Charactercount Mafiosi
// @namespace      Charactercount Mafiosi
// @include        http://mafiosi.nl/forum_*
// @include        http://www.mafiosi.nl/forum_*
// ==/UserScript==

function tel(){
var invoer = document.getElementById('quote').value;
var aantal = invoer.length;
aantal = aantal + 1;

var teller = document.getElementById('teller')
teller.innerHTML = 'Aantal letters/cijfers: ' + aantal;

if(aantal > '4000'){
alert('Maximale grote van uw reactie mag 4000 tekens zijn\nUw reactie is ' + aantal + '\nKort uw bericht in Aub.');
}
}

var div = document.createElement("div");
div.id = 'teller';
var tekst = 'Aantal letters/cijfers: 0';
var tekst2 = document.createTextNode(tekst);
div.appendChild(tekst2);
var submit = document.getElementsByName('submit')[0];
submit.parentNode.insertBefore(div,submit);


var quote = document.getElementById('quote');
quote.addEventListener('keypress', tel, false);