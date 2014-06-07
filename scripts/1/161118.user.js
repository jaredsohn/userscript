// ==UserScript==
// @name       		Baidu FM Cleaner
// @namespace 		http://www.oriovo.com
// @description 	Make Baidu FM page clean
// @version 		1.0
// @create 			2013-03-06
// @lastmodified 	2013-03-06
// @copyright 		2013+, micle.bu@gmail.com, http://www.oriovo.com

// @match      		http://fm.baidu.com/*
// @require 		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js
// @run-at 		document-end
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function () {
    $("#qrcode").remove();
    $("#right-wrapper").remove();
    $("html").css("overflow-y", "hidden");
}, true);
