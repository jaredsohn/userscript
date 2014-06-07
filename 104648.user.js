// ==UserScript==
// @name           NZB Matrix - Highlight Recent Years
// @namespace      http://issues.jivesoftware.com/secure
// @include        http://nzbmatrix.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Simple script to hightlight recent years
// ==/UserScript==

$('span:visible[id*=ctitle]').each(function() {

	$currentTitle = $(this).html();

	$currentTitle = $currentTitle.replace('2009', '<span style="background-color:#FFF605;">2009</span>');
	$currentTitle = $currentTitle.replace('2010', '<span style="background-color:#FFF605;">2010</span>');
	$currentTitle = $currentTitle.replace('2011', '<span style="background-color:#FFF605;">2011</span>');
	$currentTitle = $currentTitle.replace('2012', '<span style="background-color:#FFF605;">2012</span>');
	$currentTitle = $currentTitle.replace('2013', '<span style="background-color:#FFF605;">2013</span>');
	
	$(this).html($currentTitle);

});