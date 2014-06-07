// ==UserScript==
// @name           GMail Chat Position
// @namespace      http://goo.gl/NBGv3
// @description    Add an option to set the gmail chat position.
// @include        https://mail.google.com/mail/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var jQuery;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
	    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	        GM_JQ = document.createElement('script');
	
	    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	    GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
    	jQuery = unsafeWindow.jQuery.noConflict(true);
        setchatpos();
        changeChat();
    }
}

// All your GM code must be inside this function
function setchatpos() {
	window.setTimeout(function() {
	    if(jQuery('body .no').length == 0)
	    {
	    	setchatpos();
	    }
	    else
	    {
	    	var gcp = GM_getValue('gtalkchatpos', 'left');
	    	jQuery('body .no').css('float', gcp);
	    }
	}, 1000);
}

function changeChat() {
	window.setTimeout(function() {
	    if(jQuery('#canvas_frame').contents().find('.dH').length == 0)
	    {
	    	changeChat();
	    }
	    else
	    {
	    	jQuery('#canvas_frame').contents().find('.dH').prepend('<div style="font-size:13px;margin-bottom:5px;"><h2 class="pw">Position:</h2> <a id="leftSideChat" style="color:red;cursor:pointer;">Left</a><span style="color:red;"> - </span><a id="rightSideChat" style="color:red;cursor:pointer;">Right</a><div>');
	    	jQuery('#canvas_frame').contents().find('#leftSideChat').click(function () {
	    		jQuery('body .no').css('float', 'left');
	    		setTimeout(function() {
	    			GM_setValue('gtalkchatpos', 'left');
	    		}, 0);
    	    });
	    	jQuery('#canvas_frame').contents().find('#rightSideChat').click(function () {
	    		jQuery('body .no').css('float', 'right');
	    		setTimeout(function() {
	    			GM_setValue('gtalkchatpos', 'right');
	    		}, 0);
    	    });

	    }
	}, 1000);
}