// ==UserScript==
// @name       YOSPOS Enhancement Suite v0.01
// @description don't post
// @match      http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

var the_pos = $("body").attr("data-forum") == 219

if (the_pos) 
    $(".postbody").hide()
