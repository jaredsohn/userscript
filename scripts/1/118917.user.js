// ==UserScript==
// @name       Azpara
// @namespace  ghingis
// @version    1.0
// @description  Szerintem azért lájkoljunk egy oldalt, mert jó és ne azért, mert egyébként nem nézhetjük meg
// @include    http://*azpara.net/*
// @copyright  2011+, Ghingis
// ==/UserScript==

	if(typeof unsafeWindow.jQuery == 'undefined') { 
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	};

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        window.setTimeout(lets,300);
    }

    function lets() {
        document.getElementById('fblikebg').style.display = "none";
        document.getElementById('fblikepop').style.display = "none";
    }