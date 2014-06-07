// ==UserScript==
// @name           TexAgs GM - Ad Remover
// @namespace      Texags
// @description    Remove ads from TexAgs.com
// @include        http://texags.com/main/*
// @include        http://www.texags.com/main/*
// @include		 http://mybcs.com/*
// @include		 http://www.mybcs.com/*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

if (window.location.href == 'http://www.texags.com/main/main.asp') {
	var theOtherAd = getElementsByClass("smallboxtitle",null,"div");
	if (theOtherAd.length>0){
		for (i=0; i<theOtherAd.length; i++){
			if (theOtherAd[i].childNodes[0].innerHTML == "TexAgs Sponsor" || theOtherAd[i].childNodes[0].innerHTML == "Aggieland Sponsor"){
				var AdTD = theOtherAd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				AdTD.parentNode.removeChild(AdTD);
			}
		}
	}
}

else {
	var theAd = getElementsByClass("SportsWarTopicAd",null,"span");
	if (theAd.length>0){
		theAd[0].parentNode.removeChild(theAd[0]);
	}

	var theOtherAd = getElementsByClass("smallboxtitle",null,"div");
	if (theOtherAd.length>0){
		for (i=0; i<theOtherAd.length; i++){
			if (theOtherAd[i].childNodes[0].innerHTML == "TexAgs Sponsor" || theOtherAd[i].childNodes[0].innerHTML == "Aggieland Sponsor"){
				var AdTD = theOtherAd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				AdTD.parentNode.removeChild(AdTD);
			}
		}
	}

	var myBCSAd = getElementsByClass("topbanner",null,"div");
	if (myBCSAd.length>0)
		for (i=0; i<myBCSAd.length; i++)
			myBCSAd[i].parentNode.removeChild(myBCSAd[i]);
}