// ==UserScript==
// @name        Ikariam
// @namespace   ikariam
// @description ikariam
// @include     http://*.dk.ikariam.com/*
// @version     1
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

if ( document.location.href.indexOf("ikariam") != -1 ) {
	$("#dropDown_js_citySelectContainer > div > ul > li").each(function(index, element) {
		$(element).find("a").attr("title", $(element).find("a").html());
	});

	$("#js_citySelectContainer > span > a").attr("title", $("#js_citySelectContainer > span > a").html());

	// #dropDown_js_citySelectContainer - City select
	jQuery(document).bind('keypress', function ( event ) {
		if ( event.shiftKey && ( event.which == 99 || event.which == 67 ) ) {
			window.counter = $('#dropDown_js_citySelectContainer > div > ul > li > a:contains("'+ $("#js_citySelectContainer > span > a").html() + '")').parent("li").index()+1;
			$(".dropDownButton").trigger("click");
		}
	});
	jQuery(document).bind('keydown', function ( event ) {
		if ( $("#js_citySelectContainer span").hasClass("active") ) {
			if ( event.which == 40 ) {
				if ( ($("#dropDown_js_citySelectContainer > div.bg > ul > li").length) == window.counter-1 ) {
					window.counter = 1;
				} else {
					window.counter = window.counter+1;
				}
			}

			if ( event.which == 38 ) {
				if ( window.counter == 1 ) {
					window.counter = $("#dropDown_js_citySelectContainer > div.bg > ul > li").length;
				} else {
					window.counter = window.counter-1;
				}
			}

			$("#dropDown_js_citySelectContainer > div.bg > ul > li").eq(window.counter-1).find("a").focus();
			$("#dropDown_js_citySelectContainer > div.bg > ul > li").eq(window.counter-1).find("a").parent("li").focus();

			if ( event.which == 13 ) {
				$("#dropDown_js_citySelectContainer > div.bg > ul > li").eq(window.counter-1).find("a").trigger("click");
				$("#dropDown_js_citySelectContainer > div.bg > ul > li").eq(window.counter-1).find("a").parent("li").trigger("click");
			}
		}

		if ( $('input[name="screen"]').length > 0 ) {
			if ( event.which == 69 ) {
				event.preventDefault();
				$("#inputWorkers").focus();
			}
		}
	});
}