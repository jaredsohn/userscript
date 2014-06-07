// ==UserScript==
// @name           hidehugeheader4chan
// @namespace      http://test.com
// @description    hidehugeheader4chan
// @include        http://boards.4chan.org/*
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
        	$("#header .logo img").hide();
		$(".postarea").hide();
		
		var a = document.createElement("a");
		var logoDiv = document.getElementsByClassName("logo")[0];
		a.href = "javascript:toggleForm()";
		a.innerHTML = "<span>reply</span>";
		logoDiv.appendChild(a);
		

    }

unsafeWindow.toggleForm = function(){
	$('.postarea').toggle();
};

var oldFunction = unsafeWindow.quote;

unsafeWindow.quote = function(num){
	$('.postarea').show();
	oldFunction(num);
};
