// ==UserScript==
// @name           Deezer Unlocker
// @namespace      deezer filter unlocker geoip suisse france fran?ais filtre protection 
// @description    Supprime la protection de Deezer qui grise la plupart des chansons et qui vide la page d'accueil de tous les Top (Top France, Top USA etc...) pour laisser un Top Deezer sans inter�t. Ce script a �t� r�alis� par Symen. Contact : Symen.b@gmail.com (cette adresse fait aussi office d'adresse MSN)
// @include        http://www.deezer.com/
// @include        http://www.deezer.com/*
// @include        http://*.deezer.com/*
// ==/UserScript==
document.getElementById('flash').innerHTML = '<embed type=\"application/x-shockwave-flash\" src=\"deezer.swf?Version=2.0.0.1\" name=\"dzflash\" bgcolor=\"#444444\" quality=\"true\" flashvars=\"urlIdSong=&amp;search=&amp;varemail=&amp;varuserid=&amp;lang=FR&amp;geoip=FR&amp;URL=0\" height=\"100%\" width=\"100%\">';
//<embed type="application/x-shockwave-flash" src="http://www.deezer.com/index4.swf?Version=2-1-0" id="blogmusikswf" name="blogmusikswf" bgcolor="#FFFFFF" quality="high" flashvars="urlIdSong=&amp;search=&amp;lang=FR&amp;varemail=&amp;varuserid=&amp;geoip=FR" height="100%" width="100%">
//<embed type="application/x-shockwave-flash" src="index4.swf?Version=2-1-0" id="blogmusikswf" name="blogmusikswf" bgcolor="#FFFFFF" quality="high" flashvars="lang=FR&amp;varuserid=&amp;geoip=FR" height="100%" width="100%">  