// ==UserScript==
// @name           playpack
// @namespace      playpackplaypack
// @description    playpack auto vote
// @include        http://picture.playpark.vn/LT/UpShow/vote/Profile.aspx?SBD=0308
// @include        http://picture.playpark.vn/LT/UpShow/vote/Profile.aspx?SBD=0274
// ==/UserScript==

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
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
		
		setTimeout(function(){$('#ctl00_ContentPlaceHolder1_btn_Vote').click();},7200000);
    }