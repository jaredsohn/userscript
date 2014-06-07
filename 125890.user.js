// ==UserScript==
// @id             opensubtitles direct download
// @name           opensubtitles direct download
// @version        2.0
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://www.opensubtitles.org/*
// @match          http://www.opensubtitles.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

$("#bt-dwl").click(function(e){ 
 var u=window.location.href.split("/");
 var lang=u[3]; var id=u[5];
 var download="http://dl.opensubtitles.org/" + lang + "/download/sub/" + id;

 window.location.href=download;
 
 // dont redirect !
 e.preventDefault();
});