// ==UserScript==
// @name           ClassicFark
// @namespace      ClassicFark
// @include        http://*.fark.com/*
// @include 	http://*.totalfark.com/*
// ==/UserScript==

document.getElementById("siteContainer").style.width="100%";
document.getElementById("bodyContainer").style.width="100%";

document.getElementById("headerTop").style.marginLeft = "auto";
document.getElementById("headerTop").style.marginRight= "auto";
document.getElementById("topMenu").style.marginLeft = "auto";
document.getElementById("topMenu").style.marginRight= "auto";
document.getElementById("topMenu").style.width = document.getElementById("headerTop").offsetWidth + "px";

document.getElementById("mainLogo").style.position = "relative";

document.getElementById("topSearch").style.position = "relative";
document.getElementById("topSearch").style.left = "656px";
document.getElementById("topSearch").style.top = "-25px";
if(window.location.hostname.toLowerCase() == "www.fark.com")
{
	document.getElementById("bodyMainContainer").style.marginLeft="75px";
	document.getElementById("bodyMainContainer").style.marginRight="75px";
	document.getElementById("bodyMainContainer").style.width=window.innerWidth - 200 + "px";
	document.getElementById("bodyHeadlineContainer").style.width="100%";
	document.getElementById("bodyRightSideContainer").style.display="none";
	ShadeHeadlines();
}

if(window.location.hostname.toLowerCase() =="www.totalfark.com")
{
	//ShadeHeadlines();
}

if(window.location.hostname.toLowerCase() == "forums.fark.com" || window.location.hostname.toLowerCase() =="www.totalfark.com")
{
	var padding;
	
	padding = document.getElementById("TFbodyRightSideContainer").offsetWidth;
	document.getElementById("TFbodyMainContainer").style.paddingLeft = padding  + "px";
	document.getElementById("TFbodyMainContainer").style.width=window.innerWidth - (padding * 3) - 25 + "px";
	document.getElementById("TFbodyHeadlineContainer").style.width=document.getElementById("TFbodyMainContainer").offsetWidth+"px";
}

if(window.location.hostname.toLowerCase() == "forums.fark.com")
{
	var tableElements = document.getElementsByTagName("table");
	var divElements = document.getElementsByTagName("div");
	
	document.getElementById("commentsArea").style.width="100%";
	
	for(i=0;i<tableElements.length;i++)
	{
		if(tableElements[i].className=="ctableTF")
		{	
			tableElements[i].style.marginLeft="0px";
			tableElements[i].style.width=tableElements[i].offsetParent.clientWidth - 5 + "px";
			tableElements[i].nextSibling.nextSibling.style.display="none";
		}
	}
	for(i=0;i<divElements.length;i++)
	{
		if(divElements[i].className=="ctext")
		{
			if(i%2==1)
			{
				divElements[i].style.backgroundColor="#F0F0F0";
			}
			divElements[i].style.marginLeft="0px";
			divElements[i].style.width=divElements[i].offsetParent.clientWidth - 5 + "px";
			divElements[i].style.marginBottom="5px";
			divElements[i].nextSibling.nextSibling.style.display="none";
		}
	}
}

function ShadeHeadlines()
{
	var trElements = document.getElementsByTagName("tr");
	for(i=0;i<trElements.length;i++)
		if(trElements[i].className=="headlineRow")
			if(i%2==1)
				trElements[i].style.backgroundColor="#F0F0F0";
}