// ==UserScript==
// @name          prohardver.hu : site : hardverapro link
// @namespace     http://www.prohardver.hu/
// @include       http://mobilarena.hu/*
// @include       http://prohardver.hu/*
// ==/UserScript==

window.addEventListener(
	"load", 
	function() 
	{
		var menu = document.evaluate("//div[@id=\"navi\"]/ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (menu == null)
			return;
		
		var li = document.createElement("li");
		li.className = "qu";
		var a = document.createElement("a");
		if (document.location.hostname == "mobilarena.hu")
			a.href = "http://hardverapro.hu/aprok/mobil/listaz.php";
		else
			a.href = "http://hardverapro.hu";
			
		a.innerHTML = "Hardvera.";//pr\u00f3";
		li.appendChild(a);
		menu.appendChild(li);
	},
	false);
