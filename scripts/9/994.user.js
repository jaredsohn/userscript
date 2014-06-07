// ==UserScript==
// @name          Slashdot recolor
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://*slashdot.org/*
// @exclude       http://politics.slashdot.org/*
// @description	  Recolors slashdot sections
// ==/UserScript==

(function() {
    //alert("slash recolor");
    if(document.slashreorg){
	alert("script called on reorged doc");
    }
    else{
	var xpath = '//*[@bgcolor]';
	var coloredBits = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thing;
	var i;
	document.body.setAttribute("link",  "#006666");
	for(i=0;(thing=coloredBits.snapshotItem(i));i++){
	    col = thing.getAttribute("bgcolor").toLowerCase();
	    if(col.substring(1,3) != col.substring(3,5) || ((col.substring(1,2) < 9) && (col.substring(1,2) > 0))){
		//	    if((col != "#cccccc") && (col != "#ffffff") && (col != "#000000")
		//	       && (col != "#e0e0e0") && (col != "#ebebe1")){
		//alert("color of "+thing+" is "+col+".  I'll fix that");
		thing.style.background = "#006666";
	    }
	    else if((col != "#cccccc") && (col != "#ffffff") && (col != "#000000")){
		thing.style.background = "#cccccc";
	    }
	}
	document.slashreorg = true;
    }
})();
