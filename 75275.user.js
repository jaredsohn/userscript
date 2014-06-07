// ==UserScript==
// @name           NavBar for Numbered URLs
// @namespace      AmpliDude
// @include        *
// @description    Adds a floating div with button to easily change the numbers in URLs
// ==/UserScript==

(function(){

if (typeof GM_addStyle == "undefined") {
	GM_addStyle = function(text) {
		var head = document.getElementsByTagName("head")[0];
		var style = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.textContent = text;
		head.appendChild(style);
	}
}

var arrow_up = 'data:image/gif;base64,R0lGODlhDAAIAOUAAQAAABUSDxwZFSEeGTQuJ0tDOFFIPVtRRH9xX5SEcJmIcZqJdKOPc6SQdKyXebGYdLOhiLqnjM6xhdGygta2hd27iNq7jsSvk8m0l8+6nNK8n9S9oOPGldrEpdzFp+rOo+LKq+TNre7WqfDUqu3WtPDZtvbftvjeu/rhvQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQAGQD/ACwAAAAADAAIAAUGRECOaEQsjj6SiglVapKapY6CgjqBQBlC4ppBTKpXAyAAwXqrngNgHYh0v6fFQEAXFDDeUmij6fsvCBQWDg2Fhg0MDxUAADs=';
var arrow_down = 'data:image/gif;base64,R0lGODlhDAAIAOUpAQEBAAkIBx8cGCMfGlBIPXhrW3tuXX9xX4J0Yop7aJmIcaOPc6SQdKCQeayXeaiXf7GYdLShiM6xhdGygta2hd27iNq7jsSvk8axlsu2mc+6nNK8n9S9oOPGldrDpdrEperOo+LKq+TNre7WqfDUqvDZtvbftvjeu/rhvQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQAGQD/ACwAAAAADAAIAAUGRcDOiEQskkCSiglVajpLHwUFdYoYrtdE5jChYgaAMACh4VJDGEG4ECp3T6HQI0DwtLklEWezaWj4FwcUFg4MhocMCxAVAAA7';

// create a floating div
var navBarDiv = document.createElement('div');
	navBarDiv.id = "navBarContainer";
	GM_addStyle('#navBarContainer { width: 100% !important; border-bottom: solid 1px #dd9900 !important; position: fixed !important; top: 0px !important; left: 0px !important; z-index: 99999 !important; background-color: #ddbb88 !important; }');
	GM_addStyle('#navBarContainer input { border: solid 1px #ddaa77 !important; background-color: #eecc99 !important; }');
	GM_addStyle('#navBarContainer td { vertical-align: middle !important; border: 0px !important; } #navBarContainer td * { display: block !important; }');
	GM_addStyle('#navBarContainer, #navBarContainer * { padding: 0px !important; margin: 0px !important; font-family: monospace !important; font-size: 8pt !important; color: #000000 !important; }');
	GM_addStyle('body { margin-top: 35px !important; }');

// split the URL
var urlArr = document.location.href.split(/(\d)/).join("^").replace(/\^\^/g,"^").split("^");

// create table to display the URL
var navBarTable = document.createElement('table');
	navBarTable.style.width = "auto";
	navBarTable.setAttribute('cellpadding', 0);
	navBarTable.setAttribute('cellspacing', 0);
var navBarTableTr = document.createElement('tr');

for (i=0; i<urlArr.length; i++) {
	nbTd = document.createElement('td');
	if (/\d/.test(urlArr[i])) {
		nbTdImgU = document.createElement('img');
		nbTdImgU.src = arrow_up;
		nbTdImgU.id = "navBarImgU"+i;
		nbTdImgU.addEventListener("click", (function (x) {return function (e) {navBarGo(x, e);};})(nbTdImgU.id), false);
		
		nbTdInp = document.createElement('input');
		nbTdInp.setAttribute('size', 1);
		nbTdInp.setAttribute('value', urlArr[i]);
		nbTdInp.id = "navBarInp"+i;
		nbTdInp.addEventListener("keyup", (function (x) {return function (e) {navBarGo(x, e);};})(nbTdInp.id), false);
		
		nbTdImgL = document.createElement('img');
		nbTdImgL.src = arrow_down;
		nbTdImgL.id = "navBarImgL"+i;
		nbTdImgL.addEventListener("click", (function (x) {return function (e) {navBarGo(x, e);};})(nbTdImgL.id), false);
		
		nbTd.appendChild(nbTdImgU);
		nbTd.appendChild(nbTdInp);
		nbTd.appendChild(nbTdImgL);
	} else {
		nbTd.innerHTML = urlArr[i];
	}
	navBarTableTr.appendChild(nbTd);
}

navBarTable.appendChild(navBarTableTr);
navBarDiv.appendChild(navBarTable);
var unsafeWindow = this['unsafeWindow'] || window;
if (unsafeWindow.self == unsafeWindow.top) // use it only for top frame
	document.body.appendChild(navBarDiv);

	
function navBarGo(id, e) {
	if (e.keyCode != undefined && e.type != 'click') {
		urlArr[id.match(/\d+/)] = document.getElementById(id).value;
		if (e.keyCode != 13)
			return;
	}
	if (/U/.test(id)) {
		changeValue(id.match(/\d+/), 1);
	} else if (/L/.test(id)) {
		changeValue(id.match(/\d+/), -1);
	}
	tmp = "";
	for (i=0; i<urlArr.length; i++) {
		tmp += urlArr[i];
	}
	document.location.href = tmp;
}

function changeValue(_num, _val) {
	if (/\d/.test(urlArr[_num-1]) && urlArr[_num] == 9 && _val == 1) {
		urlArr[_num] = 0;
		changeValue(_num-1, 1);
	} else if (/\d/.test(urlArr[_num-1]) && urlArr[_num] == 0 && _val == -1) {
		urlArr[_num] = 9;
		changeValue(_num-1, -1);
	} else {
		urlArr[_num] = (parseInt(urlArr[_num]) + _val < 0) ? 9 : (parseInt(urlArr[_num]) + _val)%10;
	}
	document.getElementById('navBarInp'+_num).value = urlArr[_num];
}

})();