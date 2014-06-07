// ==UserScript==
// @name           LockerzRedeemCheck
// @include        http://ptzplace.lockerz.com/
// @author         Freamer (edited by ME)
// ==/UserScript==

// this checks every 6 seconds if the reedemption started.
// when it started, itself turns off and plays a sound alert!!

var timetoreload=6;
var sizeOld = 919;

// add jQuery function 
    var GM_JQ = document.createElement('script');
//  GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);



// test if its there
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// checking and notifying
function letsJQuery() {
	var sizeNew = $('body').html().length;
	if (sizeNew == sizeOld) {
		window.setTimeout("document.location.reload();", timetoreload*1111);
	} else {
		alert('Redemption started!!');	
	}
}