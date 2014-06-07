// ==UserScript==
// @name           Surf_Via_Anonymouse_Hidemyass
// @namespace      http://userscripts.org/users/veilchen2k
// @description    Anyonymous surfing via anonymouse.org and hidemyass.com 
// @description	   This user script removes the anonymouse.org - ad and the reduces the top of hidemyass.com
// @description	   Howto: go to anonymouse.org, from there anonymize to hidemyass.com - and hide your ass at the URL  e.g. www.google.com
// @author         veilchen2k 
// @include        *anonymouse.org/*
// @include	   *hidemyass.com/*
// ==/UserScript==

// removes anonymouse-ad (This part is taken from anh_surprised's script "Anonymouse Ads Remover"

var el = document.getElementById('mouselayer');
el.parentNode.removeChild(el);

// remove unnecessary hidemyass.com - elements and make a compact address bar

var hmadonkeyhead = document.getElementById('hmadonkeyhead');
hmadonkeyhead.parentNode.removeChild(hmadonkeyhead);

var hmatopheaderel = document.getElementById('hmatopheader');
hmatopheaderel.parentNode.removeChild(hmatopheaderel);

var hmamainheaderel = document.getElementById('hmamainheader');
hmamainheaderel.parentNode.removeChild(hmamainheaderel);

var hmalearnmoreel = document.getElementById('hmalearnmore');
hmalearnmoreel.parentNode.removeChild(hmalearnmoreel);

var containerel = document.getElementById('container');
containerel.style.height = 33 + 'px';