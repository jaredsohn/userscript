// ==UserScript==
// @name           script name
// @namespace      helloint
// @version      201312122324
// @include        http://userscripts.org/scripts/edit/186017
// ==/UserScript==
var debugMode = true;
var testMode = false;
var GM_JQ = document.createElement('script');
GM_JQ.src = "http://code.jquery.com/jquery-1.10.2.min.js";
GM_JQ.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
var jQuery = null;
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
	    jQuery = unsafeWindow.jQuery;
        unsafeWindow.jQuery.noConflict();
        letsJQuery();
    }
}
GM_wait();

// *** put your code inside letsJQuery: ***
function letsJQuery() {
    initDebugPanel();
}

function initDebugPanel() {
	var panel = '<div id="hint_debug" style="position: fixed;top:0;right:0;width: 200px; height: 80px;text-align: right;"></div>';
	jQuery('body').append($(panel));
	jQuery('#hint_debug').mouseenter(function(){
		if (jQuery(this).css('right') == 0) {
			jQuery(this).css('right', 'auto');
			jQuery(this).css('left', 0);
			jQuery(this).css('text-align', 'left');
		} else {
			jQuery(this).css('left', 'auto');
			jQuery(this).css('right', 0);
			jQuery(this).css('text-align', 'right');
		}
	});
}

function refreshPage() {
    window.location.href = window.location.href;
}