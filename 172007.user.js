// ==UserScript==
// @name        Confluence Wiki Gallery Plugin Dark Background
// @namespace   mbussler
// @include     *
// @description Confluence Wiki comes with a gallery plugin that uses Fancybox to display image sequences. This script changes the background behind the box to black and also avoids flicker whenever the image changes
// @version     1
// @grant       none
// ==/UserScript==

var fancy_overlay = null;
var fancy_cont = null;
var fancy_wrap = null;

window.addEventListener ("load", run_script, false);

function run_script () {

    remove_element(document.getElementById("fancybox-bg-n"));
    remove_element(document.getElementById("fancybox-bg-ne"));
    remove_element(document.getElementById("fancybox-bg-e"));
    remove_element(document.getElementById("fancybox-bg-se"));
    remove_element(document.getElementById("fancybox-bg-s"));
    remove_element(document.getElementById("fancybox-bg-sw"));
    remove_element(document.getElementById("fancybox-bg-w"));
    remove_element(document.getElementById("fancybox-bg-nw"));
    remove_element(document.getElementById("fancybox-title"));

	fancy_overlay = document.getElementById("fancybox-overlay");
	if( fancy_overlay ) {
	  fancy_overlay.addEventListener('DOMAttrModified', function(e){
		if (e.attrName === 'style') {
		  fix_overlay();
		}
	  }, false);
	}

	fancy_cont = document.getElementById("fancybox-content");
	if( fancy_cont ) {
	  fancy_cont.addEventListener('DOMAttrModified', function(e){
		if (e.attrName === 'style') {
		  fix_content();
		}
	  }, false);
	}

	fancy_wrap = document.getElementById("fancybox-wrap");
	//alert_on_change(fancy_wrap);
}

function fix_overlay() {

    if( fancy_overlay.style.backgroundColor == "rgb(119, 119, 119)") {
        // make overlay background very dark
        fancy_overlay.style.backgroundColor = "rgb(0,0,0)";
    }
    if( fancy_overlay.style.opacity == "0.5") {
        // fix transparency of overlay background
        fancy_overlay.style.opacity = "0.95";
    }
}

function fix_content() {
    // suppress animation of opacity during image changes
    fancy_cont.style.opacity = "1.0";
    fancy_cont.style.backgroundColor = "rgb(12,12,12)";
}

function remove_element( elem ) {
    if(elem && elem.parentNode){
        elem.parentNode.removeChild(elem);
    }
}

function alert_on_change( element ) {
	if( element ) {
        element.addEventListener('DOMAttrModified', function(e){
            if ('attrChange' in e) {    // Firefox, Opera, Internet Explorer from version 9
                var message = "";
                message += "The element: " + e.target;
        	    message += "\nproperty: " + e.attrName;
                message += "\noriginal value: " + e.prevValue;
    	        message += "\n changed to: " + e.newValue;
        	    alert (message);
            }
        });
    }
}
