// ==UserScript==
// @name          MyFreeFarm Marktschreier-Archiv
// @namespace     http://myfreefarm.pytalhost.com/
// @description   Fügt einen Link zum Marktschreier-Archiv hinzu
// @include       http://s*.myfreefarm.de/main.php*
// ==/UserScript==

var reg = /http:\/\/s([\d]{1,2}).*/i;
var loc = reg.exec(document.location);
if(loc) {
    var server = loc[1];

    var newbutton = document.createElement('button');
    newbutton.appendChild(document.createTextNode('Marktschreier-Archiv'));
    newbutton.setAttribute('style', 'position: absolute; left: 15px; top: 145px; z-index: 37;');
    newbutton.setAttribute('class', 'link');
    newbutton.setAttribute('id', 'ms_archiv_marktschreierinner');
    newbutton.setAttribute('onclick', 'window.open("http://myfreefarm.pytalhost.com/?server='+server+'", "ms_archiv'+server+'")');
    document.getElementById('marktschreierinner').appendChild(newbutton);

    var newdiv = document.createElement('div');
    newdiv.appendChild(document.createTextNode('Marktschreier-Archiv'));
    newdiv.setAttribute('style', 'position: absolute; left: 35px; top: 400px; display: none;');
    newdiv.setAttribute('class', 'blackbox');
    newdiv.setAttribute('id', 'ms_archiv_buildingmain');
    document.getElementById('buildingmain').appendChild(newdiv);

    var newimg = document.createElement('img');
    newimg.setAttribute('src', 'http://mff.wavecdn.de/mff/city/marktschreier.gif');
    newimg.setAttribute('style', 'position: absolute; left: 35px; top: 430px; border: ridge #555555;');

    var newa = document.createElement('a');
    newa.setAttribute('href', 'http://myfreefarm.pytalhost.com/?server='+server);
    newa.setAttribute('target', 'ms_archiv'+server);
    newa.setAttribute('class', 'link');
    newa.setAttribute('onmouseover', 'showDiv("ms_archiv_buildingmain")');
    newa.setAttribute('onmouseout', 'hideDiv("ms_archiv_buildingmain")');

    newa.appendChild(newimg);
    document.getElementById('buildingmain').appendChild(newa);
}