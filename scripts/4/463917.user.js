// ==UserScript==
// @name        faas
// @namespace   a
// @include     http://*.fourmizzz.fr/Armee.php?deplacement=3&t=*
// @include     http://*.fourmizzz.fr/Armee.php?Transferer&nbTroupes=*&ChoixUnite=unite1&LieuOrigine=3&LieuDestination=2&t=*
// @version     1.0
// ==/UserScript==

var jeton = $('#t').val();

if(document.location.search.substring(0, 14) == '?deplacement=3')
	var url = 'http://'+document.location.host+'/Armee.php?Transferer&nbTroupes=150000&ChoixUnite=unite1&LieuOrigine=3&LieuDestination=2&t='+jeton
else
	var url = 'http://'+document.location.host+'/Armee.php?Transferer&nbTroupes=10&ChoixUnite=unite1&LieuOrigine=3&LieuDestination=1&t='+jeton

$(location).attr('href',url);
