// ==UserScript==
// @name           NEPTUN
// @namespace      neptun
// @description    Eltűnteti a szemetet :D
// @include        https://frame.neptun.bme.hu/hallgatoi/*
// @exclude        https://frame.neptun.bme.hu/hallgatoi/login.aspx
// ==/UserScript==

// Add jQuery
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
	
		$(".main_table > tbody > tr").children().each(function(){
			$(this).hide();
		});	
		$("#Menu_neptun_topTable > tbody > tr").append($("#upTraining").parent());
		$("#upTraining_lblTrainingName").parent().attr("style","font-size: 6pt;");
		$("#topname").parent().attr("style","font-size: 6pt;");
		$("#Menu_neptun_topTable > tbody > tr").append($(".main_header_r_logout").first());
		$(".footer_table").each(function(){
			$(this).hide();
		});
	}
	
	