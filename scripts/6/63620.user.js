// ==UserScript==
// @name           google calendar path to en url
// @namespace      godblessyouamen@gmail.com
// @include        http://www.google.co.kr/
// ==/UserScript==

var gbi = document.getElementById("gbi").getElementsByTagName("a");

for(var i=0; i<gbi.length; i+=1)
{

	if(gbi[i].innerHTML == "캘린더")
	{
		console.log(gbi[i].innerHTML);
		gbi[i].href = "http://www.google.com/calendar/";
	}
}