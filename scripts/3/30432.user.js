// ==UserScript==
// @name           NeoQuest II Buddy
// @namespace      http://nq2guy.tz/
// @description    Stops the annoying page hiccups.
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// ==/UserScript==

//Copyright nq2guy 2008
//script licensed under, GNU GPL V3 , see http://www.gnu.org/licenses/gpl.txt for details

var i = 0;
var hiccup=1;
var divs = document.getElementsByTagName('div');
for(i=0;i<divs.length;i++)
{
	if (divs[i].className=="contentModuleHeader")
	{
		hiccup=0;
	}
}

if(hiccup)
{
	//document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
	document.location.href=document.location.href;
}
else
{
var elements = document.getElementsByTagName('img');
var i = 0;
for(i=0;i<elements.length;i++)
{
	switch(elements[i].src)
	{
	case "http://images.neopets.com/nq2/x/com_next.gif":
		document.location.href="javascript:setaction(1); document.ff.submit();";
		break;
	}
}
}