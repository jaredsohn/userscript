// ==UserScript==
// @name           Cookie Clicker

// @namespace      http://localhost
// @description    Upvote

// @include        http://orteil.dashnet.org/*

// ==/UserScript==
var $;

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

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    function letsJQuery() {
var div = document.getElementById("bigCookie");

var Timer = setInterval(function(){start()}, .05);
        console.log("v1.3"); 
        console.log($().jquery); // check jQuery version

	function check(vote) {
	var theEvent = document.createEvent("MouseEvent");
	theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	vote.dispatchEvent(theEvent);
	}

function start() {
for (var i=0; i <5; i++) {
check(div);
var golden = document.getElementById("goldenCookie");
if (golden != undefined) {
check(golden);
}
var clicker = document.getElementById("product0");
var grandma = document.getElementById("product1");
var farm = document.getElementById("product2");
var factory = document.getElementById("product3");
var mine = document.getElementById("product4");
var shipment = document.getElementById("product5");
var alch = document.getElementById("product6");
var portal = document.getElementById("product7");
var timetravel = document.getElementById("product8");
var anti = document.getElementById("product9");
check(clicker);
check(grandma);
check(farm);
check(factory);
check(mine);
check(shipment);
check(alch);
check(portal);
check(timetravel);
check(anti);

}
}
    }

