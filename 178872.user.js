// ==UserScript==
// @name        Window Size
// @namespace   crystalstudio.me
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description Ruler for tracking window size for Responsive Development
// @grant       none
// @include     http://*
// @version     4
// ==/UserScript==

//In 3 version fixed .append() only in top document BODY
//In 4 version fixed show absolute width of device (with sidebar)
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
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
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
function letsJQuery() {
		var MEASUREMENTS_ID = 'little_ruler_thing';
			var bdy = $("html", top.document);
			bdy.find('body').append('<div id="'+MEASUREMENTS_ID+'"></div>');
			$("#"+MEASUREMENTS_ID).css({
				'position': 'fixed',
				'bottom': '0',
				'right': '0',
				'background-color': 'black',
				'color': 'white',
				'padding': '5px',
				'font-size': '12px',
				'opacity': '0.7',
				'z-index': '8040'
			});
	var sb = scw();
	getDimensions = function(){
		//scrollbar width
		var ww = document.body.clientWidth;
		var hh = document.body.clientHeight;
		var wws = ww+sb;
			return wws +' x '+ hh + '('+$(window).height()+')';
		}
	$("#"+MEASUREMENTS_ID).text(getDimensions());
	$(window).on("resize", function(){
		$("#"+MEASUREMENTS_ID).text(getDimensions());
	});
}

	function scw() {
		var s_html='<div id="wide_one" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div id="wide_two" style="height:100px;width:100%"></div></div>';
		$("html", top.document).find('body').append(s_html);
		var s_w1=$("#wide_one").width();
		var s_w2=$("#wide_two").innerWidth();
		var sbw=s_w1-s_w2;
		$("#wide_one").remove();
		return sbw;
	}