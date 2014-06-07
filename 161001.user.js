// ==UserScript==
// @name       		Evernote/Yin Xiang Ads Remover
// @namespace 		http://www.oriovo.com
// @description 	Remove Ads from Evernote Web and Yin Xiang Web in Chrome and Firefox.
// @version 		1.0
// @create 			2013-03-06
// @lastmodified 	2013-03-06
// @copyright 		2013+, micle.bu@gmail.com, http://www.oriovo.com

// @match      		https://www.evernote.com/Home.action*
// @match      		https://app.yinxiang.com/Home.action*
// @require 		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js
// @run-at 			document-end
// ==/UserScript==

var run;

function removeads() {
    if($("#gwt-debug-ad").length == 1) {
        $("#gwt-debug-ad").parent().hide();
        $("#gwt-debug-ad").remove();
        $("#gwt-debug-navigationScroller").parent().css("bottom", "2px");
        
        clearInterval(run);
    }
}

window.addEventListener("DOMContentLoaded", function () {
    run = setInterval(removeads, 1000);
}, true);
        
// For Greasemonkey
GM_addStyle( "#gwt-debug-ad{ display:none}");
