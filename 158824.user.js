// ==UserScript==
// @name		SSForder
// @version		3.0
// @namespace		ssforder
// @include		http://*.erepublik.com/*
// @require		http://code.jquery.com/jquery-1.7.1.min.js
// @downloadURL		http://userscripts.org/scripts/source/158824.user.js
// @updateURL		http://userscripts.org/scripts/source/158824.meta.js
// ==/UserScript==

function GM_wait(){if(typeof unsafeWindow.jQuery=="undefined"){window.setTimeout(GM_wait,100)}else{$=unsafeWindow.jQuery;letsJQuery()}}GM_wait();function letsJQuery(){GM_xmlhttpRequest({method:"GET",url:"https://docs.google.com/document/d/1y39n_TzCyhX2oAZiAFj1w4rU6uC3F4EeT3q9izt0t-4/pub",onload:function(g){var h=g.responseText;var i="<h1><center>"+$(h).find("span").first().text()+"</center></h1>";$("div.user_finances").after('<center><div id="SSForder"><marquee width="150" height="30" scrolldelay="1" scrollamount="2">'+i+"</marquee></div><center>")}});var c=location.href;var d=c.split("/");var f=d[5];var a="3.0";var e="http://userscripts.org/scripts/source/158824.user.js";var b="http://userscripts.org/scripts/source/158824.meta.js";if(f=="messages-alerts"){GM_xmlhttpRequest({method:"GET",url:b,onload:function(h){var m=h.responseText;var k=m.indexOf("@version")+8;var g=m.indexOf("\n",k);var j=m.substring(k,g).trim();j=j.replace(".","");j=j.replace(".","");var l=a.replace(".","");l=l.replace(".","");if(parseInt(l)<parseInt(j)){$("div#header").append("<div id='SSForderUpdate' style='text-align:center;'><h1>SSForder script is out of date. Update it <a href=\""+e+'">here</a>.</h1></div>')}}})}};