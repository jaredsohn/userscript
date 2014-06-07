// ==UserScript==

// @name           Altiris SD Keyboard Shortcuts

// @namespace      https://www.iki.fi/hw/gmscripts/

// @description    Keyboard support for Altiris SD

// @include        https://sd.helsinki.fi/AeXHD/firefox/*

// ==/UserScript==



var fz_sc;

var jQuery = null;



function init() {

	if (unsafeWindow.jQuery == null) {  

		if (fz_sc == null) {

			fz_sc = document.createElement("script");

			fz_sc.src = "http://code.jquery.com/jquery-latest.js";

			document.getElementsByTagName("head")[0].appendChild(fz_sc);

		}

		setTimeout(init, 500);

	} else {	

		eval("unsafeWindow.jQuery.noConflict()");

		jQuery = unsafeWindow.jQuery;

	}

}

init();



function suljettu(){

	jQuery('#_ctl0__ctl39__ctl0_ddlStatus').val('600');

}



function valmis(){

	jQuery('#_ctl0__ctl39__ctl0_ddlCloseCode').val('200');

}



GM_log('seuraavaks pitäis ladata');



function KeyCheck(event)

{

  if( event.keyCode == '106'){

	suljettu();

  }

  

  if( event.keyCode == '109'){

	valmis();

  }

}



window.addEventListener('keydown', KeyCheck, true);

