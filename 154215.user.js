// ==UserScript==
// @name		Bildscript för FB
// @namespace           http://userstyles.org
// @author		epost72
// @homepage            http://userscripts.org/scripts/show/154215
// @description         Visar bilder i tråden
// @match		https://www.flashback.org/*
// @include	        http://www.flashback.org*
// @include	        http://flashback.org*
// @include	        https://www.flashback.org*
// @include	        https://flashback.org*
// ==/UserScript==


javascript: var x = $("a").each(function () {     var href = $(this).attr("href");   if(href) if(href.indexOf("leave.php") >= 0) { var u = decodeURIComponent(href.substring(href.indexOf("leave.php")+12)); var ul = u.toLowerCase();  if(ul.indexOf(".jpg") >= 0 || ul.indexOf(".png") >= 0 || ul.indexOf(".jpeg") >= 0 || ul.indexOf(".gif") >= 0) {  var img = $("<a href='" + u + "' target='blank' style='display:block'><img style='display:block;max-width:500px;' src='" + u + "' /></a>");  $(this).after(img); }  }  });