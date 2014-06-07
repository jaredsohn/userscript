// ==UserScript==
// @name           isabelmarco
// @namespace      firebux
// @description    www.isabelmarco.com AD auto click
// @include        http://www.isabelmarco.com/index.php?p=surf
// ==/UserScript==

function setTimers() 
{
	setInterval
	(	function () 
		{
			var timena = parseInt(document.getElementById("sec").textContent) - 1;
			document.getElementById("sec").textContent = timena.toString();
			if (timena == 0) location.href="http://www.isabelmarco.com/index.php?p=surf";
		} , 1000
	);
}

function main() 
{
	var foundAd = false;

	var sec = document.createElement("span");
	sec.setAttribute("style", "background:grey; color:black; border:1px solid black; padding:5em; position:absolute; top:0px; left:0px;");
	sec.setAttribute("id", "sec");
	sec.appendChild(document.createTextNode("55"));
	document.body.appendChild(sec);

	if (document.URL.indexOf("http://www.isabelmarco.com/index.php?p=surf") != -1)
	{	
		var obj = document.getElementsByTagName("a");
		for (var i=0;i<obj.length;i++)
		{
			if(obj[i].href.indexOf("p=view&ad=") != -1)
			{	
				window.open(obj[i].href, "adWindow");
				foundAd = true;
				break;
			}
		}
	}

	if(foundAd == false)
	{
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
