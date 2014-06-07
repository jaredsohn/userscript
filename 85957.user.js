// ==UserScript==
// @name           Travian Quick Fake
// @description    Auto fill in fake template
// @include        http://*.travian.com.vn/a2b.php?z=*

// ==/UserScript==
// Phalanx	Legionnaire		t1
// Swordsman	Praetorian		t2
// Pathfinder	Imperian		t3
// Theutates 	Equites Legati		t4
// Druidrider	Equites Imperatoris	t5
// Haeduan	Equites Caesaris	t6
// Ram		Battering Ram		t7
// Trebuchet	Fire Catapult		t8
// Chieftain	Senator			t9
// Settler	Settler			t10
// Merchant	Merchant		t11


// t1: leduong t2:thive t3:cbtn t7:ram t8:cata

var faketroop = "t1";

function updateText(textname, textvalue) {
	var result = document.evaluate("//input[@name='" + textname + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (result) { 
		result.value = textvalue;
	}

}
function checkRadio(radioname, radiovalue) {

	var result = document.evaluate("//input[@type='radio' and @value='" + radiovalue + "']",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
//	var result = document.evaluate("//input[@name='" + radioname + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (result) { 
		result.checked = true;
	}

}


function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

 
// market, offer
//if (document.URL.indexOf('build.php?id=33&t=2') > -1 ) {

if (document.URL.indexOf('a2b.php?z=') > -1 ) {
	updateText(faketroop,"1");
	checkRadio("c","3");
	setTimeout(document.getElementById("btn_ok").click(), 5000*Random());
}
