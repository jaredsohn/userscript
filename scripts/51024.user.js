// ==UserScript==
// @name           HLstatsX HLSW-to-Steam Link Rewriter
// @description    Lets you join servers from HLstatsX easily, without the need for HLSW
// @version        1.0
// @author         Crazed Geek
// @include        http://*.hlstatsx.com/*
// ==/UserScript==

var totalLinks = document.getElementsByTagName('a');

for(var i=0; i < totalLinks.length; i++) {
	totalLinks[i].href = totalLinks[i].href.replace("hlsw://","steam://connect/");
}