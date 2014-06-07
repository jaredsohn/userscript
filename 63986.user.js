// ==UserScript==
// @name           p2pthank
// @namespace      http://www.p2p101.com
// @description    p2pthank
// @include        http://www.p2p101.com/forums/viewthread.php?tid=*
// ==/UserScript==

Main();

function Main()
{
	//alert(location.href);
	/*
	imgs = document.getElementsByTagName("a");
	for (i=0; i<imgs.length; i++)
	{
		if (imgs[i].href.indexOf("thankyou.php") != -1)
		{
			return;
		}
	}
	*/
	var IDx = location.href.indexOf("tid=");
	var ID = location.href.substr(IDx+4,7);
	document.getElementById("ad_text").innerHTML = "<a href='thankyou.php?tid="+ID+"'><img src='images/cgmvgrayno.1/thanks.gif' border=0></a>";
}
