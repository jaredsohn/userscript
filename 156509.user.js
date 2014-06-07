// ==UserScript==
// @name        DOZ
// @namespace   D:\gb24_autocomplete.js
// @include     https://www.doz.pl/*
// @include     http://www.doz.pl/*
// @version     1
// ==/UserScript==

var l_popup = document.getElementById("popupAkcjaZaLogowanie");
if(l_popup != null)
	l_popup.style.visibility="hidden";


var l_images = document.getElementsByTagName("img");
for (var i = 0; i < l_images.length; i++) {
	if (l_images[i].getAttribute("src") == "/v2/layout/icons/niedostepny_koszyk.png"){
		var parentNode = l_images[i].parentNode;
		var kids = parentNode.childNodes;
		var prodId;
		for (var j = 0; j < kids.length; j++) {
			if(kids[j].nodeName == "A"){
				//alert("jest a");
				var href = kids[j].getAttribute("href");
				//alert(href);
				if(href.substring(0, 26) == "http://www.doz.pl/apteka/p"){
					//alert("OK");
					var stopIndex = href.indexOf("-");
					prodId = href.substring(26, stopIndex);
					//alert(stopIndex);
					//alert(prodId);
				}
			}
		}
		var newA = document.createElement("a");
		newA.setAttribute("href", "http://www.doz.pl/koszyk/a3_" + prodId + "-Dodaj_do_koszyka");
		newA.setAttribute("class", "dodaj_koszyk");
		newA.setAttribute("title", "Dodaj produkt do koszyka");
		parentNode.insertBefore(newA, l_images[i]);
	}
}

