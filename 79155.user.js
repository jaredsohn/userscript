// ==UserScript==
// @name           tulavideo.net download link
// @description    Get download link for video from tulavideo.net
// @namespace      http://nobodyzzz.dontexist.org/
// @include        http://tulavideo.net/*
// @version        0.0.1
// ==/UserScript==


s = document.querySelector("param[name='flashvars']").value;
mp = document.getElementById("mp");
link = document.createElement("a");
link.href = unescape(s.substring(s.indexOf("&file=") + 6, s.indexOf("&image")));;
link.appendChild(document.createTextNode("download"));
mp.appendChild(link);
