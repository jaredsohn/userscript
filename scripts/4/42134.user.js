// ==UserScript==
// @name           WSJ Referrer Spoof
// @namespace      
// @author         apollo2011
// @description    Spoofs the referrer for Wall Street Journal articles to get access to locked articles. Uses digg.com as the referrer and requires the refspoof toolbar be installed in order to work.
// @include        http://*wsj.com/article*
// @exclude        *msn*
// @exclude        *doubleclick*
// ==/UserScript==

if (document.referrer != "http://digg.com/")
	{
	target = window.location.href;
	target=target.replace(/http:/, "spoof:");
	target = target + ';ref://digg.com';
	window.location.href = target;
	}