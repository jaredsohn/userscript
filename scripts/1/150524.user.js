// ==UserScript==
// @name        Giffy
// @namespace   http://loading.se
// @version     0.1.0
// @description Replaces selected avatars on www.loading.se with GIF avatars.
// @match       http://loading.se/*
// @copyright   vieekk
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$.ajax({type:"GET",url:"http://db.tt/r15xvHzp",dataType:"text",contentType:"text/plain; charset=utf-8",success:function(d){eval("var json = "+d+";");$("img.avatar, .avatar img").each(function(){var b=$(this),a=b.attr("src").split("/"),a=a[a.length-1].split(".")[0],c=b.width();json.hasOwnProperty(a)&&b.hide().width(c).height(c).attr("src",json[a]).show()})}});