// ==UserScript==
// @name           Filmweb Warez Search
// @description    Dodane przyciski do wyszukiwarek warezów.
// @version        1.1
// @include        http://filmweb.pl/*
// @include        http://*.filmweb.pl/* 
// ==/UserScript==

var ptIco = 'http://polishtracker.org:86/favicon.ico';
var hdBitsIco = 'http://www.hd-bits.ro/favicon.ico';
var dvdSeedIco = 'http://www.dvdseed.org/favicon.ico';
var thePirateBayIco = 'http://static.thepiratebay.org/img/tpblogo_sm_ny.gif';
var torrentzIco = 'http://www.torrentz.com/favicon.ico';
var demonoidIco = 'http://www.demonoid.com/favicon.ico';
var filesTubeIco = 'http://static.filestube.com/files/images/favicon.ico';
var title = document.getElementsByClassName('original-title')[0].innerHTML.trim().split('</span>')[1].split(',')[0].trim();
if ('' == title) {
    title = document.getElementsByClassName('pageTitle item')[0].getElementsByTagName('a')[0].innerHTML.split('</span>')[1].trim()
}
var titleObj = document.getElementsByClassName('original-title')[0];
titleObj.innerHTML = titleObj.innerHTML + ' | <strong>Szukaj na:</strong><a href="http://polishtracker.org:86/browse.php?c20=1&c33=1&c28=1&c26=1&c19=1&c34=1&c29=1&c31=1&c7=1&search='+title+'&namedesc=0&subtype=&movprod=&movlang=&polish=0&scene=0&fribi=0&submit=Szukaj!!"><img src="'+ptIco+'" alt="Szukaj na PolishTracker" width="16" height="16"/></a> | '
    +'<a href="http://www.hd-bits.ro/browse.php?search='+title+'"><img src="'+hdBitsIco+'" alt="Szukaj na HD-Bits.ro" width="16" height="16"/></a> | '
    +'<a href="http://www.dvdseed.org/browse.php?search='+title+'"><img src="'+dvdSeedIco+'" alt="Szukaj na DVDSeed" width="16" height="16"/></a> | '
    +'<a href="http://thepiratebay.org/search/'+title+'/0/99/200"><img src="'+thePirateBayIco+'" alt="Szukaj na ThePirateBay" width="16" height="16"/></a> |'
    +'<a href="http://www.torrentz.com/search?q='+title+'"><img src="'+torrentzIco+'" alt="Szukaj na Torrentz" width="16" height="16"/></a> | '    
    +'<a href="http://www.demonoid.com/files/?query='+title+'"><img src="'+demonoidIco+'" alt="Szukaj na Demonoid" width="16" height="16"/></a> | '
    +'<a href="http://www.filestube.com/search.html?q='+title+'"><img src="'+filesTubeIco+'" alt="Szukaj na FilesTube" width="16" height="16"/></a>';


