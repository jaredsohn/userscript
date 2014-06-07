// ==UserScript==
// @name           Nothing for everything
// @author         Jackneill
// @version        1.0
// @include        http://*erepublik.com/*
// ==/UserScript==

unsafeWindow.addEventListener ("DOMContentLoaded", function () {document.getElementById("fundRW_btn").click()})

//handle = setInterval (ClicktoLink, 1000);
/*
function ClicktoLink()
{
document.getElementById("fundRW_btn").click();
}
*/
/*
function sleep(numberMillis)
{
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	
	while (true)
	{
		now = new Date();
		
		if (now.getTime() > exitTime) 
			return;
	}
};
*/
/*
function pausecomp(ms)
{
	ms += new Date().getTime();
	while (new Date() < ms) { }
}
*/

//sleep(200);
// pausecomp(200);



