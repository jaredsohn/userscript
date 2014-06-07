// ==UserScript==
// @name			H K G a l d e n flow stat
// @namespace		galdenson
// @version			0.0.1
// @description		Count stat
// @match			https://hkgalden.com/topics/TR
// @match			http://hkgalden.com/topics/TR

// ==/UserScript==
var $ = function (selector) {
	return document.querySelector(selector);
}

var str = $('.onlineuser').innerHTML;
var people = str.substr(10);

var URL = 'https://docs.google.com/forms/d/1OEe8W12oSWVsuX9IAEwtBiw9K8_bZTeYRPFIScTZfVU/formResponse?ifq&entry.332675829=' +people+ '&submit=Submit';
//window.open(URL);
//console.log(obj);

var request = new XMLHttpRequest();
request.open("GET", URL, true);
request.send(null);


setTimeout(function (t){window.location.reload()}, 298500);


