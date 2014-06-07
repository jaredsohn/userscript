// ==UserScript==
// @name           Cyrpt reminder
// @namespace      http://userscripts.org/users/75549
// @description    Reminds you what to optimize in each cyrpt zone
// @include        http://127.0.0.1*crypt.php
// @include        *kingdomofloathing.com*crypt.php
// ==/UserScript==

places = document.getElementsByTagName('a');
for(i=0;i<places.length;i++)
{
	if(places[i].href.indexOf("264") != -1)
	{
		places[i].title = "+item";
	}
	if(places[i].href.indexOf("263") != -1)
	{
		places[i].title = "olfact dirty lihc";
	}
	if(places[i].href.indexOf("262") != -1)
	{
		places[i].title = "+NC, +ML";
	}
	if(places[i].href.indexOf("261") != -1)
	{
		places[i].title = "+init";
	}
}