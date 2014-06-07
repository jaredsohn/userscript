// ==UserScript==
// @name          Travian Multi crop finder
// @description   Script shows villages, that have 9 or 15 crop fields. By remiusba@gmail.com
// @include       http://s*.travian.*/*kart*

// ==/UserScript==

/**
Changelog:
- 2007-08-22: version 1.1 - Repaired bug causing crash when found not occupied village
- 2007-08-22: version 1.0
*/

var counter = 0;

function processReqChange(req, mapIndex) {
	if (req.readyState == 4) {
		if (req.status == 200) {
			var reqTxt = req.responseText;
			myInfo('.');
			if (reqTxt.indexOf('div id="f6"') > -1 ||
				reqTxt.indexOf('div id="f1"') > -1){
		  	//this is multicrop!!!
				/**var re = new RegExp('<div class=\"dname\"><h1>(.*)<\/h1>', 'g'); *77
				var re = new RegExp('<div>.*</div><h1>(.*)<\/h1>', 'g');</h1>
				var myArray = re.exec(reqTxt);
				if (myArray && myArray[1]){
					myInfo('<br><a href="' + myAreas[mapIndex].href + '">' + myArray[1] + '</a><br>');
				} else {
					myInfo('<br><a href="' + myAreas[mapIndex].href + '">Site No.:' + counter + '</a><br>');
				}
			}
			if (counter <= (myAreas.length - 1)){
				if (myAreas[counter]){
					var ret = myAreas[counter].href;
					if (ret.indexOf('karte.php?d=') > -1) {
						loadXMLDoc(ret, counter);
					}
				}
			} else {
				myInfo('<br><b>Finished:</b>' + getDateString() + '<br>');
			}
			counter++;
		} else {
	    myInfo("There was a problem retrieving the XML data:\n" + req.statusText);
		}
	}
}

function loadXMLDoc(myUrl, mapIndex) {
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {processReqChange(req, mapIndex)};
		req.open("GET", myUrl, true);
		req.send(null);
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = processReqChange;
			req.open("GET", myUrl, true);
			req.send();
		}
	}
}

function myInfo(textInfo){
	infoDiv.innerHTML += textInfo;
}

function addInfoDiv(){
	infoDiv = document.createElement('div');
	infoDiv.style.margin = "2em 0em 0em";
	var sExpr = "//div[@id=\"map_content\"]"
	var xpath = document.evaluate(sExpr, document, null, XPathResult.ANY_TYPE, null);
	var item = xpath.iterateNext();
	item.appendChild(infoDiv);
}

function getDateString(){
	var datum = new Date();
	var ret = '';
	ret += datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds();
	return ret;
}

function mapClearEventsFromArrows() {
	var sXpathExpr = "//div[@id='map_content']//area[@title]";
	var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i) {
		var el = xpathRes.snapshotItem(i);
		// remove onclick because it calls Ajax preventing distance from displaying
		el.removeAttribute("onclick");
	}
}

function mapDoubleScroll() {
	var colAdds = [-801, 1, 801, -1];
	var sXpath = "//div[@id='map_content']//area[@title]";
	var xpathRes = document.evaluate(sXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i)	{
		var el = xpathRes.snapshotItem(i);
		var nIdx = el.href.indexOf("=") + 1;
		var nPos = el.href.substr(nIdx) - 0; // index of map field
		nPos += colAdds[i % 4] * (Math.floor(i / 4) + 6);
		el.href = el.href.substr(0, nIdx) + nPos;
	}
}


var myMap = document.getElementsByTagName('map')[1];
var infoDiv;

if (myMap) {
	// map enhancements, taken from http://camlost.wz.cz/greasemonkey/, bloody good code :-)/
	mapClearEventsFromArrows();
	mapDoubleScroll();

	//I am on the right page with map, so let's search :-)
	addInfoDiv();
	myInfo('<b>Start:</b>' + getDateString() + '<br>');
	var myAreas = myMap.getElementsByTagName('area')
	myContinue = true;
	do {
		if (myAreas[counter]){
			var ret = myAreas[counter].href;
			if (ret.indexOf('karte.php?d=') > -1) {
				loadXMLDoc(ret, counter);
				myContinue = false;
			}
			counter++;
		}
	} while (myContinue == true)
}
