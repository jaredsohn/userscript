// ==UserScript==
// @name        "Kurzusaim" fix
// @namespace   http://userscripts.org/users/129738
// @include     https://elearning.uni-obuda.hu/*
// @version     1
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

$(".block_navigation .branch a").each(function(e,f){ if($(f).attr("title")!=undefined){$(f).text( $(f).attr("title").split(" - ")[1] ); }});