// ==UserScript==
// @name           AmazonImageDirectLink
// @description    Adds direct image link on Amazon.
// @version        0.0.3
// @author         Shinya
// @namespace      http://www.code-404.net/
// @homepage       http://userscripts.org/scripts/show/50870
// @include        http://www.amazon.*/*
// @exclude        http://www.amazon.cn/*
// @note           
// ==/UserScript==

(function(){
	//========================================================================
	// see also: http://zerosp.com/mt/archives/amazon-images.php
	const SIZE = "SCLZZZZZZZ",
	      PARAM = [],
	      TARGET = "_blank";
	//========================================================================
	
	//------------------------------------------------------------------------
//	const URL = "http://images.amazon.com/images/P/",
//	      SEPARATOR = "_",
	//------------------------------------------------------------------------
	
	// get ASIN
	var asin = document.getElementById("ASIN") ? document.getElementById("ASIN").value : false;
	if(!asin) return; // not item page.
	
	// get place to add link
	var place = document.getElementById("PIAltImagesDiv");
	
	if(place && !document.getElementById("original_image")) return; // not have original image.
	if(document.getElementById("prodImage").getAttribute("src").match(/no\-image/)) return; // not have image.
	
	// localize
	var country = document.location.host.match(/\w{2}$/)[0];
	               // Japan
	var localize = country == "jp" ? ["09", "\u76f4\u63a5\u753b\u50cf\u3092\u8868\u793a"] :
	               // United Kingdom
	               country == "uk" ? ["02", "See direct image"] :
	               // Germany
	               country == "de" ? ["03", "See direct image"] :
	               // France
	               country == "fr" ? ["08", "See direct image"] :
	               // United States & Canada
	                                 ["01", "See direct image"];
	
	// create link
	var link = document.createElement("a");
	link.setAttribute("href", "http://images.amazon.com/images/P/" + asin + "." + localize[0] + "." + PARAM.join("_") + "_" + SIZE + "_" + ".jpg");
	if(TARGET) link.setAttribute("target", TARGET);
	
	// add link
	if(place){
		place.insertBefore(link, place.firstChild);
	} else {
		document.getElementById("prodImageCaption").appendChild(document.createElement("br")).parentNode.appendChild(link);
	}
	
	link.appendChild(document.createTextNode(localize[1]));
})();
