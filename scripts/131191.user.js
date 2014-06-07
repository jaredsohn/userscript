// ==UserScript==
// @name Hides People To Subscribe To and Find More Friends Sections on facebook (d1egoaz)
// @namespace d1egoaz
// @description Hides People To Subscribe To and Find More Friends Sections on facebook (d1egoaz)
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @version 0.4
// ==/UserScript==

function hide_fb_sections()
{
	var ego_sections = document.getElementsByClassName('ego_section');

	for(i=0; i<ego_sections.length; i++){
		ego_sections[i].style.visibility = 'hidden';
	}
}

hide_fb_sections();

document.addEventListener('DOMNodeInserted',
function(e) {
    hide_fb_sections();
    return true;
},
false);


