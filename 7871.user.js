// ==UserScript==
// @name           Chefkoch.de always show menu
// @namespace      http://manuelseeger.de
// @description    Shows the dropdown menu on the right side of the page
// @include        http://*chefkoch.de*
// ==/UserScript==
(function(){

var menudata = new Array();

menudata.push(new Array('Rezeptsuche', '/rezept.php'));
menudata.push(new Array('Rezeptbaum', '/kochrezept.php'));
menudata.push(new Array('Neue Rezepte', '/rezept-suche.php?o=3'));
menudata.push(new Array('Neue Rezeptbilder', '/rezeptbilder.php'));
menudata.push(new Array('Rezeptsammlungen', '/rezeptsammlung.php'));
menudata.push(new Array('Zufallsrezept', '/rezept-random.php'));
menudata.push(new Array('Rezept des Tages', '/rezept-des-tages.php'));
menudata.push(new Array('Zutatenverwertung', '/rezept-reste.php'));
menudata.push(new Array('Best of last 14', '/rezept-suche.php?Suchbegriff=&suche_erweitert=1&suche3=4&datum=14&o=2'));
menudata.push(new Array('Best of last 30', '/rezept-suche.php?Suchbegriff=&suche_erweitert=1&suche3=4&datum=30&o=2'));
menudata.push(new Array('Rezept eintragen', '/rezepteingabe/rezept-eingabe-kompakt.php'));
menudata.push(new Array('Rezept auf Ihrer Homepage', '/napping.php'));

var mymenu = document.createElement('ul');
var style = 'position:absolute; left: 810px; top: 2em;';
mymenu.setAttribute('style', style);
var li = null;
var a = null;
for(var i = 0; i < menudata.length; i++) {
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = 'http://www.chefkoch.de' + menudata[i][1];
	a.innerHTML = menudata[i][0];
	li.appendChild(a);
	mymenu.appendChild(li);
}
document.body.appendChild(mymenu);
})();

