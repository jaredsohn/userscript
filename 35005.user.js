// ==UserScript==
// @name           ThinkBux
// @namespace      firebux
// @description    www.thinkbux.com AD auto click
// @include        http://www.thinkbux.com/surf_ads_think.php
// ==/UserScript==

function setTimers() 
{
	setInterval
	(	function () 
		{
			var timena = parseInt(document.getElementById("sec").textContent) - 1;
			document.getElementById("sec").textContent = timena.toString();
			if (timena == 0) location.href="http://www.thinkbux.com/surf_ads_think.php";
		} , 400
	);
}

function main() 
{
	var foundAd = false;

	var sec = document.createElement("span");
	sec.setAttribute("style", "background:grey; color:black; border:1px solid black; padding:5em; position:absolute; top:0px; left:0px;");
	sec.setAttribute("id", "sec");
	sec.appendChild(document.createTextNode("100"));
	document.body.appendChild(sec);

	if (document.URL.indexOf("http://www.thinkbux.com/surf_ads_think.php") != -1)
	{	
		var obj = document.getElementsByTagName("input");
		for (var i=0;i<obj.length;i++)
		{
			if (obj[i].type == "submit")
			{
				//alert("ready to go form:" + obj[i].value);
				obj[i].click();
				foundAd = true;
				break;
			}				
		}		
	}

	if(foundAd == false)
	{
		// remove timer
		document.body.removeChild(document.getElementById("sec"));
	}else 
		setTimers();	
}

if (document.addEventListener) 
{
	window.addEventListener("load", main, false);
}else 
{
	window.document.onLoad = main();
}
