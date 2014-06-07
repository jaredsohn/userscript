// ==UserScript==
// @name           Seesmic BG Color
// @namespace      http://zbowling.com/seesmic
// @description    Change the background of the new seesmic
// @include        http://new.seesmic.com/*
// @include        https://new.seesmic.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { background-image: url(/) ! important; background-color: #000000 ! important;} #headerContainer {background-color: #333333 ! important;}');

/*
 * alternative method 
 *
function confBackg() { 
	var gettag = document.getElementsByTagName("body");
	for(var j=0; astag = gettag[j]; j++) {
		 astag.style.background='#000000';
	}
}


document.addEventListener('load',confBackg(),false);
 *
 */