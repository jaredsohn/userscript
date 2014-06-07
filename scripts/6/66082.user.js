// Contextmenu Unblocker
// version 0.1 BETA!
// 2010-01-09
// Copyright (c) 2010, Krzysztof Hryniewicki
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Contextmenu Unblocker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Contextmenu Unblocker
// @namespace     http://vash6p.org/download/
// @description   removes contextmenu lock
// @include       http://*sympatia.onet.pl/*
// ==/UserScript==


// Example from http://www.joanpiedra.com/jquery/greasemonkey/

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    //GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        alert($); // check if the dollar (jquery) function works
    }
	
	window.addEventListener(
	'load',
	function() {
//code start
		//cleaning contextmenu attribute hack
		var items = document.evaluate('//*[@oncontextmenu]', document, null, 7 , null);
		if (items) { 
			for ( i = 0; i < items.snapshotLength; i++){
				var val = items.snapshotItem(i).getAttribute('oncontextmenu');
				if ( val.search(/return false/i) != -1 ){
					items.snapshotItem(i).removeAttribute('oncontextmenu');		
				}
				//more cases can be added here
			}		
		}
//code end	
	},
	true);
