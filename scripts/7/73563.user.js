// ==UserScript==
// @name           liveinternet.ru: hide ads
// @namespace      LunaSeaIce@gmail.com
// @include        http://liveinternet.ru/*
// @include        http://*.liveinternet.ru/*
// @run-at         document-start
// ==/UserScript==
(function(){function a(b,i,j){b=k.getElementsByTagName(b);for(var e=b.length;e--;){var f=b[e];f[i]===j&&c.push(f)}}var k=document,c=[];a("span","id","bantop_span");a("div","className","ProTop-Bnr");a("span","id","banepg_span");a("div","id","banprofile_span");for(var g=c.length;g--;){var d=c[g],h=d.parentNode;d&&h&&h.removeChild(d)}})()
