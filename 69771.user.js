// ==UserScript==
// @name           /B/ Post Id Revealer
// @namespace      http://userscripts.org/users/134194
// @description    Sup /b/ brothers. This is the solution for the stupid hidden post ids!
// @include        http://boards.4chan.org/b/*
// @version        1.0
// ==/UserScript==


var links = document.getElementsByTagName('a');
for(var i=0; i<links.length; i++)
{
    var idx = links[i].innerHTML.indexOf( 'XXX');
    if(idx && links[i].href.length > 3)
	{
		var ireal = '';
		if(links[i].href.indexOf( 'quote') == -1)
			ireal = links[i].href.substr( links[i].href.length - 3 );
		else
			ireal = links[i].href.substr( links[i].href.length - 5,3 );
		links[i].innerHTML = links[i].innerHTML.replace('XXX',ireal);
	}
}
