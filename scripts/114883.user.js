// ==UserScript==
// @name   Hide OBA stop header
// @namespace  http://www.tacomatomorrow.com
// @description Hide stop numbers from onebusaway header
// @include  http://onebusaway.org/*
// ==/UserScript==

var h1s = document.getElementsByTagName('h1');

for (i=0; i<h1s.length; i++)

{
  h1s[i].innerHTML ='';
}

document.title = "OneBusAway Display Unit";

	//===[Settings]===\\
		var StRefTime = '10';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);