// ==UserScript==
// @name           Google Maps - Abfahrtszeiten für Nahverkehr Magdeburg
// @description    Erweitert Google Maps um die Live Abfahrtszeiten der MVB. Einfach Haltestelle anklicken und die Infos erscheinen links in der Seiteneiste. 
// @namespace      http://valentinlaube.de/projects/greasemonkey/
// @include        http://maps.google.tld/
// ==/UserScript==

// from: http://stackoverflow.com/questions/111529/create-query-parameters-in-javascript
// Usage:
//   var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
//   var querystring = EncodeQueryData(data);
// 
function EncodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

// thanks to Robert Nyman for this one: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// my code starts here

function getStationName() {
	var xpath = "//div[@class='title']/span/span/span/text()";
	var result = document.evaluate(xpath, document, null, XPathResult.STRING_TYPE,null);
	return result.stringValue;
}

function getQueryData(stationName) {
	var now = new Date();
	var data = {
		'day': now.getDate(),
		'hour': now.getHours(),
		'min': now.getMinutes(),
		'month': now.getMonth()+1,
		'nextTime': 30, // for the next 30 minutes
		'send_request': 'yes',
		'station_name': stationName,
		'year': now.getFullYear()
	};
	return EncodeQueryData(data);
}

var oldStationName;
var oldStationNameTime;

function doit() {
	var stationName = getStationName();
	
	if(!stationName) {
		var container = document.getElementById('departure_time');
		if(container) {
			container.removeElement();
		}
		return;
	}
	
	// only update every minute if we have the same station as before
	if(stationName == oldStationName && oldStationNameTime < 600) {
		oldStationNameTime++;
		return;
	}
	
	oldStationName = stationName;
	oldStationNameTime = 0;
	
	GM_xmlhttpRequest({
		method: 'POST',
		data: getQueryData(stationName),
		url: 'http://www.movi.de/mvb/fgi2/index.php',
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
	onload: function(responseDetails) {
			// extract the table with departure times
			var table = responseDetails.responseText.match(/<table[\s\S]*table>/m);
			// put it in a container
			var container = document.getElementById('departure_time');
			if(!container) {
				container = document.createElement('div');
				container.id = 'departure_time';
			}
			var title = '<div id="dir_title" style="padding-bottom:5px">Live Abfahrtszeiten</div>';
			container.innerHTML = title+table;
			document.getElementById('spsizer').appendChild(container);
			container.scrollIntoView();
		}
	});
}

window.setInterval(doit, 100);

addGlobalStyle('#departure_time { margin-left: 10px; margin-top: 1.5em; }');
addGlobalStyle('#departure_time th, #departure_time td { padding:3px; }');
addGlobalStyle('#departure_time td.linie, #departure_time td.gleis, #departure_time td.abfahrtsoll { text-align: right; }');
