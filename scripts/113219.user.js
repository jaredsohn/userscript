// ==UserScript==
// @name           Politopia Frontpage Filter 
// @version	   2.0
// @namespace      KarlSRuher
// @description    Add Filter
// @include        http://www.politopia.de/index.php
// @match          http://*.politopia.de/index.php
// ==/UserScript==


var cookieName = "filter";
var delimiter= "@/@";

var filters = new Array();
if (isLocalStorageAvailable())
{
   if (typeof(localStorage[cookieName]) != "undefined" && localStorage[cookieName] != null)
   {
		filters = localStorage[cookieName].split(delimiter);
   }
}
else filters = getFilterFromCookie((getCookie(cookieName)));

threadtable = document.getElementById("module5");
dummy = threadtable.getElementsByClassName("vba_module");

threads = new Array();
l2c = new Array(); // Links to create;

for (var i = 0; i < dummy.length; i++)
{
   links = dummy[i].getElementsByTagName("a");
   for (var j = 0; j < links.length; j++)
   {
	l2c.push(links[j]);
   	if (filters.indexOf(links[j].href) >= 0)
	{
//		alert(links[j].href);
		removeTR(links[j]);
		links[j].parentNode.parentNode.style.display = "none";
	}
   }
}

for (var i = 0; i < l2c.length; i++)
   createLink(l2c[i]);

function removeTR(obj)
{
	while (obj.tagName.toLowerCase() != "tr")
		obj = obj.parentNode;
	obj.style.display = "none";
}



function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : ";expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function getFilterFromCookie(cookie_content)
{
	return cookie_content.split("@/@");
}

function insertAfter(node, referenceNode) {
  //alert(node, referenceNode);
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

function createLink(link)
{
//alert(link.firstChild);
if (link.hasChildNodes)
   if (link.firstChild.tagName)
   if (link.firstChild.tagName.toLowerCase()  == 'img') 
	return;

//alert (link.outerHTML);

var neuerLink = document.createElement("a");  
var oc = "confirmAddFilter('" + link.href + "');";
	neuerLink.href = "#";  
	neuerLink.addEventListener("click", function() {confirmAddFilter

(link.href);}, false);
	neuerLink.onclick = oc;
	neuerLink.innerHTML = "[x]";
	neuerLink.title = "Diskussion von der Hauptseite wegfiltern"
	neuerLink.style.color = "#800000";
	insertAfter(neuerLink, link);
     //link.outerHTML = "[...]"

//alert (neuerLink.outerHTML);

var space = document.createElement("span")
space.innerHTML = " ";
insertAfter(space, link);
}

function confirmAddFilter(link)
{
   if (confirm("Wollen Sie die Diskussion\n\n" + link + " \n\nwirklich wegfiltern?"))
   {
      if (isLocalStorageAvailable())
      {
         if (typeof(localStorage[cookieName]) != "undefined" && localStorage[cookieName] != null)
            filters = localStorage[cookieName].split(delimiter);
         else filters = new Array();
	 filters.push(link);
	 localStorage[cookieName] = filters.join(delimiter); 
      }
      else 
		{
			filters = getFilterFromCookie((getCookie("Test")));
			if (filters.indexOf(link) == -1)
			{
				filters.push(link);
				//alert(filters);
				setCookie(cookieName, filters.join

(delimitier), 1);
			}
		}	
	location.reload();
	}
}

function isLocalStorageAvailable()
{
   try {return 'localStorage' in window && window['localStorage'] !== null;} 
   catch(e) {return false;}
}

var td = document.getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
{
   if (td[i].className == "tcat") 
   {
      if (td[i].innerHTML.indexOf("Aktuelle Themen") > -1)
      {
      var aktuelle_themen_td = td[i];
      aktuelle_themen_td = aktuelle_themen_td.getElementsByTagName('span')[0];
      aktuelle_themen_td.innerHTML = aktuelle_themen_td.innerHTML + " <a id='showHiddenThreads' href='#' style='color:#800000;' title='Zeige versteckte Threads'>[+]</a>";
      document.getElementById('showHiddenThreads').addEventListener("click", toggleShoutboxHeight, true);
      break;
      }
   }
}
