// ==UserScript==
// @name           Metafilter -- star moderators
// @author         mlerner
// @description    Adds different color stars to each moderator's name
// @include        http://*.metafilter.*
// @version        1.0
// @license        Do what you want, I don't care.
// ==/UserScript==

var getUserIDFromHref = function(str)
{
	var pos = str.lastIndexOf("/");
	var userID = str.substring(pos+1, str.length);
	return userID;

};

var addStars = function()
{
	var names = document.getElementsByTagName("a");
	var i=0;
	var userID;
	var nameColors = {
		1:"black",			//1 mathowie
		191:"E82C0C",		//191 pb
		292:"FF530D",		//292 jessamyn
		7418:"E80C79",		//7418 cortex
		10705:"FF0DFD",		//10705 vacapinta
		14421:"FF0000",		//14421 taz
		20191:"BA0DFA",		//20191 goodnewsfortheinsane
		28936:"FFAE0D",		//28936 restless_nomad
		36820:"6A00E8"		//36820 lobstermitten

	};

	for(i=0;i<names.length;i++)
	{
		userID = getUserIDFromHref(names[i].href);
		if(nameColors[userID])
		{
			names[i].innerHTML = "<font color='"+nameColors[userID]+"'>★</font> " + names[i].innerHTML;
		}
	}
};

addStars();

