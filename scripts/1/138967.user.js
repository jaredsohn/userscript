// ==UserScript==
// @name        Lepsza zbrojownia
// @namespace   http://mega.szajb.us/juenizer/
// @description Kliknij w przedmiot by zaznaczyc (zamiast w checkboxa)
// @include     http://r*.bloodwars.*/?a=equip*
// @version     1
// ==/UserScript==


var items = document.getElementsByClassName('item');
for (var i=0; i<items.length; i++) {
	ta = items[i].getElementsByTagName('table');
	ta[0].addEventListener('click', function() {this.getElementsByClassName('checkbox')[0].click();}, false);
}
var items = document.getElementsByClassName('checkbox');
for (var i=0; i<items.length; i++) {
	items[i].style.display="none";
}
