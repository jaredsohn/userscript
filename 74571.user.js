// ==UserScript==
// @name           Grepoils (lol) redirect killer
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Leitet direkt weiter by Boggler
// @include        http://*grepolis.com/start/redirect?url=*
// ==/UserScript==


var link = document.getElementById('content_main').innerHTML.split('<a href="')[1].split('">')[0];

document.location.href = link;