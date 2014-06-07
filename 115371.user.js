// ==UserScript==
// @name           Amazon Search
// @namespace      http://http://www.amazon.com/
// @include        http://*
// @include        https://*
// ==/UserScript==

aff = 'jmpm-20';
isAmazon = /^(www\.)?amazon\./i;

if (location.hostname.match(isAmazon))
{
	if (location.pathname == "/" && location.search == "")
		location.href = "http://" + location.hostname + "/gp/redirect.html?location=%2F%3Ftag%3D" + aff + "&tag=" + aff;
	return;
}	

for ( i=0; l=document.links[i]; i++ )
{
  if( l.hostname.match( isAmazon ) )
	  l.search = (l.search ? l.search + "&" : "?") + "tag=" + aff;
}
