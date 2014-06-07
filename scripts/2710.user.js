// ==UserScript==
// @name          Fark Block 2 
// @namespace     http://www.calfinated.com/
// @description   Changes posts from obnoxious Farkers to "BALETED!"  Based on Fark Block by Kristian Thy
// @include       http://forums.fark.com/*
// ==/UserScript==
//
// Author: Daniel Otis		http://www.calfinated.com		eekmale@hotmail.com
// Version: 1.0
//

var farkers = new Array(
'Big Al',
'smoovement',
'the_gospel_of_thomas',
'Dancin_In_Anson',
'Weaver95',
'Major Thomb',
'Shut........UP',
'Colgate',
'A Midnight Bout of Frenzied Concupiscence');

function xpath(query, context)
{
	var cx = (arguments.length < 2) ? document : context;
	return document.evaluate(query, cx, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function inArray(needle, haystack)
{
	for (var i = 0; i < haystack.length; i++)
	{
		if (needle == haystack[i]) return true;
		if (needle < haystack[i]) return false;
	}
	return false;
}

farkers.sort();
var posts = xpath('//table[@class="ctable"]');
for (var i = 0; i < posts.snapshotLength; i++)
{
	var header = posts.snapshotItem(i);
	var uid = header.getElementsByTagName('a').item(0).innerHTML;
	if (inArray(uid, farkers))
	{
          header.nextSibling.nextSibling.nextSibling.innerHTML="<font color=\"red\"><b>BALETED!</b></font>";
	}
}

