// ==UserScript==
// @name        Steam Region Changer
// @namespace   SteamRegionChanger
// @author      Fedexx2
// @include     http://store.steampowered.com/*
// @version     1.6
// ==/UserScript==

var qry = new Array();
var qrystr = unescape(top.location.search.substring(1));
if(qrystr != "")
{
	var keys = qrystr.split("&");
	for (var i in keys) 
	{
		var k = keys[i].split("=");
		qry[k[0]] = k[1];
	}
}

if(qry.hasOwnProperty("SP"))
{
	window.scrollBy(0,qry.SP);
	delete qry.SP;
}
if(qry.hasOwnProperty("cc"))
	delete qry.cc;

	

var url = document.URL.split('?')[0];
url += "?";


for(var i in qry)
	url += i + "=" + qry[i] + "&";
 
var div = document.createElement("div");
div.style.position = "fixed";
div.style.top = "0px";
div.style.left = "0px";
div.style.zIndex = "99";


var btn1 = document.createElement("input");
btn1.type = "button";
btn1.value = "EU";
btn1.onclick = function(){window.location.href = url + "cc=no&SP=" + window.pageYOffset;};

var btn2 = document.createElement("input");
btn2.type = "button";
btn2.value = "US";
btn2.onclick = function(){window.location.href = url + "cc=us&SP=" + window.pageYOffset;};

var btn3 = document.createElement("input");
btn3.type = "button";
btn3.value = "RU";
btn3.onclick = function(){window.location.href = url + "cc=ru&SP=" + window.pageYOffset;};


div.appendChild(btn1);
div.appendChild(btn2);
div.appendChild(btn3);


document.body.appendChild(div);
