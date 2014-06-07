// ==UserScript==
// @name           LockerzRedeemCheck
// @include        http://ptzplace.lockerz.com/
// @author         Freamer
// ==/UserScript==

// this checks every 6 seconds if the reedemption started.
// when it started, itself turns of and plays a sound so that you notice.
// likes my other script LockerzFullAutofill

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
		window.setTimeout("document.location.reload();", 6666);
	} else {
		GM_openInTab("http://www.musli.net/files/audio/snezhnoe/07.mp3")	
	}
}