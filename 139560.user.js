// ==UserScript==
// @id             compatibilicents
// @name           compatibilicents
// @version        1.0
// @namespace      tripflag
// @author         tripflag
// @description    
// @include        http://www.last.fm/user/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==

var ht = $('#tasteometer .bar').first().html();
if (ht)
{
	ht = ht.replace(/.*width: (.*)%;.*/, '$1');
	ht = Math.round(ht * 100) / 100.0;
	$('#tasteometer .reading').after(' ('+ht+'%)');
}
