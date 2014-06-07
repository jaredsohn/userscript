Script shows all villages, that have 9 or 15 crop fields.

// ==UserScript==
// @name          Travian Extreme Multi Crop Finder
// @description   Script shows all villages, that have 9 or 15 crop fields.
// @include       *.travian.*/*kart*
// ==/UserScript==

// based on "Travian Multi crop finder" from RemiusBa

var infoDiv;
var results = 0;
var myList = new Array();

myList[0] = new Array(6);
myList[0][0] = '&lt;tr&gt;&lt;th&gt; ID &lt;/th&gt;';
myList[0][1] = '&lt;th&gt; Village &lt;/th&gt;';
myList[0][2] = '&lt;th&gt; Type &lt;/th&gt;';
myList[0][3] = '&lt;th&gt; Owner &lt;/th&gt;';
myList[0][4] = '&lt;th&gt; Alliance &lt;/th&gt;';
myList[0][5] = '&lt;th&gt; Population &lt;/th&gt;&lt;/tr&gt;';

function analyseMap(req2, xc, yc) {
// start: analyseMap
var counter = 0;

function processReqChange(req, mapIndex) {
if (req.readyState == 4) {
if (req.status == 200) {
var reqTxt = req.responseText;
myInfo('.');
var f6 = reqTxt.indexOf('div id="f6"') &gt; -1;
var f1 = reqTxt.indexOf('div id="f1"') &gt; -1;
if (f6 || f1){
//this is multicrop!!!
results++;
myList[results] = new Array(6);
// ID
myList[results][0] = '&lt;tr&gt;&lt;td&gt;' + results.toString() + '&lt;/td&gt;';
// name of village + coords
var re = new RegExp('&lt;div id="lmid2"&gt;.*&lt;h1&gt;(.*)&lt;/h1&gt;', 'g');
var myArray = re.exec(reqTxt);
myList[results][1] = '&lt;td&gt;&lt;a href="' + myAreas[mapIndex].href + '"&gt;' + myArray[1] + '&lt;/a&gt;&lt;/td&gt;';
// type
if (f6) {
myList[results][2] = '&lt;td&gt;15er&lt;/td&gt;';
} else if (f1) {
myList[results][2] = '&lt;td&gt;9er&lt;/td&gt;';
}
if (reqTxt.indexOf('Landverteilung') &gt; -1) {
myList[results][3] = '&lt;td&gt;&lt;/td&gt;';
myList[results][4] = '&lt;td&gt;&lt;/td&gt;';
myList[results][5] = '&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;';
} else {
// owner
re = new ReqExp('&lt;td&gt;Besitzer:&lt;/td&gt;&lt;td&gt;(.*)&lt;/td&gt;', 'g');
myArray = re.exec(reqTxt);
myList[results][3] = '&lt;td&gt;' + myArray[1] + '&lt;/td&gt;';
// alliance
re = new RegExp('&lt;td&gt;Allianz:&lt;/td&gt;&lt;td&gt;(.*)&lt;/td&gt;', 'g');
myArray = re.exec(reqTxt);
myList[results][4] = '&lt;td&gt;' + myArray[1] + '&lt;/td&gt;';
// population
re = new ReqExp('&lt;td&gt;Einwohner:&lt;/td&gt;&lt;td&gt;(.*)&lt;/td&gt;', 'g');
myArray = re.exec(reqTxt);
myList[results][5] = '&lt;td&gt;' + myArray[1] + '&lt;/td&gt;&lt;/tr&gt;';
}
}
if (counter &lt;= (myAreas.length - 1)){
if (myAreas[counter]){
var ret = myAreas[counter].href;
if (ret.indexOf('karte.php?d=') &gt; -1) {
loadXMLDoc(ret, counter);
}
}
} else {
myInfo('&lt;br&gt;'); // end
}
counter++;
} else {
myInfo("There was a problem retrieving the XML data:n" + req.statusText);
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

function mapClearEventsFromArrows() {
var sXpathExpr = "//div[@id='map_content']//area[@title]";
var xpathRes = req2Txt.evaluate(sXpathExpr, req2Txt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i &lt; xpathRes.snapshotLength; ++i) {
var el = xpathRes.snapshotItem(i);
// remove onclick because it calls Ajax preventing distance from displaying
el.removeAttribute("onclick");
}
}

function mapDoubleScroll() {
var colAdds = [-801, 1, 801, -1];
var sXpath = "//div[@id='map_content']//area[@title]";
var xpathRes = req2Txt.evaluate(sXpath, req2Txt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i &lt; xpathRes.snapshotLength; ++i)        {
var el = xpathRes.snapshotItem(i);
var nIdx = el.href.indexOf("=") + 1;
var nPos = el.href.substr(nIdx) - 0; // index of map field
nPos += colAdds[i % 4] * (Math.floor(i / 4) + 6);
el.href = el.href.substr(0, nIdx) + nPos;
}
}

if (req2.readyState == 4) {
if (req2.status == 200) {
var req2Txt = req2.responseText;

var myMap = req2Txt.getElementsByTagName('map')[1];

if (myMap) {
// map enhancements, taken from http://camlost.wz.cz/greasemonkey/, bloody good code :-)/
mapClearEventsFromArrows();
mapDoubleScroll();

//I am on the right page with map, so let's search :-)
var myAreas = myMap.getElementsByTagName('area')
myContinue = true;
do {
if (myAreas[counter]){
var ret = myAreas[counter].href;
if (ret.indexOf('karte.php?d=') &gt; -1) {
loadXMLDoc(ret, counter);
myContinue = false;
}
counter++;
}
} while (myContinue == true)
myInfo('(' + xc + ';' + yc + ')');
}
} else {
myInfo("There was a problem retrieving the XML data:n" + req.statusText);
}
}

// end: analyseMap
}

function getNextMap(myUrl, xc, yc) {
if (window.XMLHttpRequest) {
req2 = new XMLHttpRequest();
req2.onreadystatechange = function() {analyseMap(req2, xc, yc)};
req2.open("GET", myUrl, true);
req2.send(null);
} else if (window.ActiveXObject) {
req2 = new ActiveXObject("Microsoft.XMLHTTP");
if (req2) {
req2.onreadystatechange = analyseMap;
req2.open("GET", myUrl, true);
req2.send();
}
}
}

function myInfo(textInfo) {
infoDiv.innerHTML += textInfo;
}

function addInfoDiv(){
infoDiv = document.createElement('div');
infoDiv.style.margin = "2em 0em 0em";
var sExpr = "//div[@id="map_content"]"
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

// start
var x;
var y;
var d;
var url;

addInfoDiv();
var toptxt = '&lt;b&gt;Start:&lt;/b&gt;' + getDateString() + '&lt;br&gt;';
myInfo(toptxt);
for (var ycount = 0; ycount &lt;= 114; ycount++) {
for (var xcount = 0; xcount &lt;= 114; xcount++) {
x = -397 + 7 * xcount;
y = 397 - 7 * ycount;
// set the coords of the next 7x7-area
d = 320801 + x - 801 * y;
// calc the nr for the cart-link to the coords above
myUrl = 'karte.php?z=' + d.toString();
getNextMap(myUrl, xcount, ycount);
}
}
// output
infoDiv.innerHTML = toptxt;

var t = document.createElement('table');
t.border = '1';
infoDiv.appendChild(t);
var tb = document.createElement('tbody');
t.appendChild(tb);

for (var i = 0; i &lt; myList.length; i++) {
tb.innerHTML += myList[i].join('');
}
myInfo('&lt;br&gt;&lt;b&gt;Ende:&lt;/b&gt;' + getDateString());