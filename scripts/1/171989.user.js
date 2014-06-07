// ==UserScript==
// @name			BuyHelper
// @namespace		http://*.kapihospital.com/*
// @description		Automatically hide patients in buy window, which you can't heal
// @include			http://*.kapihospital.com/*
// @match			http://*.kapihospital.com/*
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       	GM_addStyle
// @grant       	GM_getValue
// @grant       	GM_setValue
//
// @author			muardin
// @copyright		muardin
// @version			0.0.1
// @created			2013-06-26
// @lastupdated		2013-06-26
// 
// @history        0.0.1 Initial release
//
// ==/UserScript==

waitForKeyElements("#ex_bubble > table", get_content);
function get_content(jNode) {
     
     var spanText   = $.trim(jNode.text () );
     var lastText   = jNode.data("lastText")  ||  "";

    if (spanText != lastText) {
       	$('#ex_bubble > table > tbody > tr').each(function() {
            if ($(this).html().toLowerCase().indexOf("nicht behandelbar") >= 0) {
                $(this).hide();
            }

        }); 
    }

     jNode.data("lastText", lastText);
     return false;
}