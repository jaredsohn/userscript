// ==UserScript==
// @name           Secondary testing
// @namespace      
// @description    This was taken from nq2guy -->  All credit goes to him
// @include        http://www.neopets.com/games/nq2/nq2*
// ==/UserScript==

//Copyright nq2guy 2008
//script licensed under, GNU GPL V3 , see http://www.gnu.org/licenses/gpl.txt for details

// Uncomment the below two lines to initialize your variables, but please edit them from about:config , filter:greasmonkey.scriptvals
//path = GM_setValue("Path","3");
//pathIndex = GM_setValue("pathIndex",0);

pathIndex = GM_getValue("pathIndex",0);

/*
Notes on coordinates

javascript: dosub(int)

1=north
2=south
3=west
4=east
5=northwest
6=southwest
7=northeast
8= southeast

*/
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
	document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
else
{
var elements = document.getElementsByTagName('img');
var i = 0;
for(i=0;i<elements.length;i++)
{
	switch(elements[i].src)
	{
	case "http://images.neopets.com/nq2/x/com_begin.gif":
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?start=1";
		break;
	case "http://images.neopets.com/nq2/x/com_atk.gif":
		document.location.href="javascript:setaction(4); document.ff.submit()";
		break;
	case "http://images.neopets.com/nq2/x/com_end.gif":
		document.location.href="javascript:setaction(2); document.ff.submit()";
		break;
	case "http://images.neopets.com/nq2/x/tomap.gif":
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
		break;
	case "http://images.neopets.com/nq2/x/com_next.gif":
		document.location.href="javascript:setaction(1); document.ff.submit();";
		break;
	case "http://images.neopets.com/nq2/x/nav.gif":
		if((GM_getValue("Path").length) != pathIndex)
		{
			//alert("javascript:dosub(" + GM_getValue("Path")[pathIndex] + ");");
			document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=move&dir=" + GM_getValue("Path")[pathIndex];
			GM_setValue("pathIndex",pathIndex+1);
		}
		else
		{
			alert("You have arrived at your destination. Please disable this script to take control.");
			GM_setValue("pathIndex",0)
		}
		break;
	}
}
}
//window.setTimeout(function() { document.location.href="http://www.neopets.com/games/nq2/nq2.phtml" }, 20000);