// ==UserScript==
// @name        ComGateway Fixes
// @namespace   Seifer
// @include     http://www.comgateway.com/*
// @version     1.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant    	GM_info
// ==/UserScript==

function GM_main ($) {
	trackingnumbers = $('a[id^="trackingno"]');
	trackingnumbers.each(function( index ) {
		trackingnumberid = $(this).attr('id').replace('trackingno','trackingnotips');
		trackingnumber = $('div[id="'+trackingnumberid+'"]').text();
		$parent = $(this).parent();
		$parent.html($parent.html().replace(/Tracking No(.|[\n\r])*/gi,"Full Tracking No: "+trackingnumber));
	});

	addGlobalStyle('#noteinfo { position: fixed !important; margin-left:0px !important; margin-top: 0px !important; top: 10px; left: 10px; }');
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (typeof GM_info !== "undefined") {
    console.log ("Running with local copy of jQuery!");
    GM_main ($);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.9.0");
}
function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.9.0";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}