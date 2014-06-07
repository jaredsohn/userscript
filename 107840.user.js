// ==UserScript==
// @name Facebook Translator
// @description A simple script to translate facebook message in one click
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @namespace http://faurax.fr/greasemonkey
// @version 0.2
// ==/UserScript==

/*
BEWARE ! FB uses a lot of JS to update the page.
So, I decided to launch the process that adds links every 10s to ensure that links appear
*/

var mylang = 'fr'; // Translate to this language
var mylink = 'Traduire'; // Name of the link

//GM_log('LOG!');


var translatify = function() {

    var items = document.getElementsByClassName('pvm');
    //GM_log(items);

    for(i=0; i<items.length; i++)
    {
	//    GM_log('hop '+items[i]);
	//    items[i].style.border = '1px solid blue';
	
	var msg = items[i].getElementsByClassName('messageBody');
	//    GM_log(msg.length);

	if(msg.length < 1) continue;

	//    items[i].style.border = '1px solid red';

	msg = msg[0].textContent;

	//    GM_log(msg);

	var lien = items[i].getElementsByClassName('UIActionLinks_bottom');
	//    GM_log(lien.length);

	if(lien.length < 1) continue;

	// don't re-add the translate link if present
	var translate_links = items[i].getElementsByClassName('gm_script_fbtranslate');
	if(translate_links.length > 0) continue; 

	lien[0].appendChild(document.createTextNode(' · '));
	var l = document.createElement('a');
	l.setAttribute('href', 'http://translate.google.com/#auto|'+mylang+'|'+msg);
	l.setAttribute('class', 'gm_script_fbtranslate');
	l.innerHTML = mylink;
	lien[0].appendChild(l);

    }

    window.setTimeout(translatify, 10000);

}

window.setTimeout(translatify, 1000);
