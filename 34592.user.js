// ==UserScript==
// @name           UserScripts comment permalink giver
// @namespace      http://userscripts.org/scripts/show/34592
// @version        0.2.3
// @description    Displays a "permalink" to all comments, making linksharing on userscripts much easier
// @include        http://*userscripts.org/scripts/show/*
// @include        http://*userscripts.org/articles*
// @include        http://*userscripts.org/forums/*/topics/*
// ==/UserScript==
var f=/forums/i.test(document.URL);var z=document.evaluate(f ? "//td[@class='author vcard']" : "//div[@class='actions']",document,null,6,null);for(var i=0;i<z.snapshotLength;i++) {var r=z.snapshotItem(i);var link=location.pathname.replace(/\/?$/,"")+"#"+(f ? r.parentNode.id : r.parentNode.parentNode.id);r.innerHTML+= (f ? "<br/>" : "") + "<span style=\"padding-left:20px\" class=\"stico_default\"><a onclick=\"prompt('Here\\'s a pre-formatted link:','<a href=&#34;"+link+"&#34;>comment by "+(f ? r.childNodes[5].childNodes[0].textContent : r.nextSibling.nextSibling.childNodes[1].textContent)+"</a>');return false\" class=\"utility\" href=\""+link+"\">Permalink</a></span>"}