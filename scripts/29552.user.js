// ==UserScript==
// @name          Modification of "Cipher's Facebook Companion 1.41"
// @description   Removes Facebook ads/flyers, adds a "Ignore All Requests" button
// @author        Cipher (edited by Ben to not add the "+" on top of pictures)
// @version       1.41
// @include       http://*.facebook.com/*
// ==/UserScript==

//////////////// registering classes

var headTag = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';

styleCode=".shadow{ position:relative; display:block; color:#3B5998;}\n";
styleCode+=".shadow span{ position:absolute; display:block; top:0px;}\n";
styleCode+=".shadow:before{display:block; padding:1px; content: attr(for); color:#FFFFFF;}\n";

cssNode.innerHTML=styleCode;

headTag.appendChild(cssNode);




/////////////// Removing ads

var sidebar_ads=document.getElementById("sidebar_ads");
if(sidebar_ads!=null)
	sidebar_ads.parentNode.removeChild(sidebar_ads);
	
var footer_ads=document.getElementById("footer_ads");
if(footer_ads!=null)
	footer_ads.parentNode.removeChild(footer_ads);




/////////////// Adding "Ignore All Requests"

if(document.URL.indexOf("http://www.facebook.com/reqs.php")==0)
{
	var sideBar=document.getElementById("home_sidebar");
	
	var ignore=document.createElement("a");
	ignore.href="javascript:void(0)";
	ignore.addEventListener("click",function(){ ignoreRequests(); },false);
	ignore.innerHTML="Ignore All Requests";
	
	var center=document.createElement("center");
	center.appendChild(ignore);
	
	sideBar.appendChild(center);
}




function ignoreRequests()
{
	if(!confirm("Are you sure you want to ignore all requests?")) return;
	
	var pageButtons=document.getElementsByTagName("input");
	
	for(var i=0;i<pageButtons.length;i++)
	{
		if(pageButtons[i].type.toLowerCase()=="button" && pageButtons[i].value=="Ignore")
		{
			pageButtons[i].click();
		}
	}
}