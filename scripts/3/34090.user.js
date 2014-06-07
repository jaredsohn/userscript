// ==UserScript==
// @name           One click EndNote download @ Scopus
// @namespace      utoronto.ca
// @include        http://www.scopus.com*/scopus/results/results.url?*
// ==/UserScript==
function stopit(){
	document.getElementById(this.getAttribute("linkedBox")).checked=true; 
	GM_setValue("autoAdd", true);
	document.getElementsByName("SearchResultsForm")[0].target="_blank";
	document.getElementsByName("outputButton")[0].click(1,1);
}

function returnHome(){
	window.location.href=GM_getValue("startURL");
}
if (window.location.href.match(/results\.url\?/)){
	GM_setValue ("startURL", window.location.href);
	oI = document.getElementsByTagName("td");

	newSpan = Array();
	newA = Array();
	var thisLink;
	for (i=0; i<oI.length; i++){
		if (oI[i].width=="49%") {
			thisLink = /eid=([^&]+)/.exec(oI[i].childNodes[3].childNodes[1].href);
			newA[i] = document.createElement("a");
			newSpan[i] = document.createElement("span");
			newA[i].innerHTML = "[EndNote]";
			newA[i].addEventListener("click", stopit, true);
			newA[i].setAttribute("linkedBox",thisLink[1]);
			newSpan[i].appendChild(newA[i]);
			oI[i].insertBefore(newSpan[i], oI[i].childNodes[2]);
		}
		
	}
} else if (window.location.href.match(/output\.url\?/) && GM_getValue("autoAdd")) {
	GM_setValue("autoAdd", false);
	if (document.getElementsByName("exportFormat"))document.getElementsByName("exportFormat")[0].selectedIndex=2;
	if (document.getElementsByName("view")[0]) document.getElementsByName("view")[0].selectedIndex=3;
	document.getElementsByName("exportForm")[0].submit();
	setTimeout(returnHome, 5000);
}