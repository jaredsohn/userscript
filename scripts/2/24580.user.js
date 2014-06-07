// ==UserScript==
// @name           Linkoder
// @namespace      vornstar.net
// @description    Displays image barcodes for links on a page
// @include        *
// @exclude        
// ==/UserScript==

/*** DISCLAIMER ***
This script is for PERSONAL USE ONLY, and is provided on an AS IS basis, to be used AT YOUR OWN RISK.
This script is subject to copyright and must be distributed with this disclaimer intact.
By using this script you agree to the terms and conditions of the service(s) provided by all relevant 3rd parties.

READ THIS FIRST before using the nokia encoder
http://mobilecodes.nokia.com/terms.htm
*******************/

// comments to vornstar at(@) gmail

// N.B. IE support untested (but _should_ work with v6+) - tested on firefox 3.0.10

// $Revision: 76 $ - or thereabouts... forget where the repository lives :)

/* 
TODO:
- avoid popup appearing off-screen
- integrate JS encoder (removing need for web based encoder)
- support encoding selected text snippet
- test/fix ie
*/

var linkoderInited = false;
var linkoderTimer = null;

function showBarcode(evt) {
	killTimer();
    var src = (evt.target ? evt.target : evt.srcElement);
    var el = document.getElementById('linkoderPopup');
    var img = document.getElementById('linkoderImg');
    var x = 10;
    var y = 10;
    if (evt.pageX) {
        x = evt.pageX;
        y = evt.pageY;
    } else if (evt.clientX) {
        x = evt.clientX;
        y = evt.clientY;
    }
    if (el && img && x && src.href) {
        el.style.visibility = '';
        var left = x;
       	var top = y + 10;
        el.style.left = left.toString() + 'px';
        el.style.top = top.toString() + 'px';
        el.style.zIndex = '9';

        /*
        Choose one of...
            DataMatrix:
            var dst = 'http://mobilecodes.nokia.com/dm?BARCODE=' + escape(src.href) + '&X=0.18&name=&type=link&MODE=TEXT&a=view';
            QR:
            var dst = 'http://mobilecodes.nokia.com/qr?DATA=' + escape(src.href) + '&MODULE_SIZE=4&name=&MARGIN=2&ENCODING=BYTE&type=link&MODE=TEXT&a=view';
            DIY:
            var dst = 'http://localhost/mycode?code=' + escape(src.href);
            Google Charts API:
        	var dst = 'http://chart.apis.google.com/chart?cht=qr&chl=' + escape(src.href)
        */
        
        var dst = 'http://chart.apis.google.com/chart?cht=qr&chl=' + escape(src.href) + '&choe=UTF-8&chs=150x150';
        
        img.src = dst;
    }
}

function hideBarcode() {
    var el = document.getElementById('linkoderPopup');
    var img = document.getElementById('linkoderImg');
    if (el) {
        el.style.visibility = 'hidden';
        el.style.zIndex = '-1';
        el.style.left = '-999px';
        if (img) { img.src = ''; }
    }
}

function evtMouseOut() {
	killTimer();
	linkoderTimer = window.setTimeout(hideBarcode,1000);
}

function killTimer() {
	if (linkoderTimer) {
		window.clearTimeout(linkoderTimer);
	}
}

function init() {
	if (!linkoderInited) {
	    for (var i = 0; i < document.links.length; i++ ) {
	        var el = document.links[i];
	        if (el.href && el.href.length) {
		        if (el.addEventListener){
		            el.addEventListener('mouseover', showBarcode, false);
		            el.addEventListener('mouseout', evtMouseOut, false);
		        } else if (el.attachEvent){
		            el.attachEvent('onmouseover', showBarcode);
		            el.attachEvent('onmouseout', evtMouseOut);
		        }
	        }
	    }
	    var pDiv = document.createElement('div');
	    pDiv.id = 'linkoderPopup';
	    pDiv.style.visibility = 'hidden';
	    pDiv.style.position = 'absolute';
	    pDiv.style.left = '-999px';
	    pDiv.style.zIndex = '-1';
	    pDiv.style.backgroundColor = '#ffffff';
	    pDiv.style.padding = '5px';
	    var img = document.createElement('img');
	    img.src = '';
	    img.id = 'linkoderImg';
	    pDiv.appendChild(img);
	    document.body.appendChild(pDiv);
		if (el.addEventListener){
		    pDiv.addEventListener('mouseover', killTimer, false);
		    pDiv.addEventListener('mouseout', evtMouseOut, false);
		} else if (el.attachEvent){
		    pDiv.attachEvent('onmouseover', killTimer);
		    pDiv.attachEvent('onmouseout', evtMouseOut);
		}
	    linkoderInited = true;
	}
}

GM_registerMenuCommand("Linkode this page", init);
