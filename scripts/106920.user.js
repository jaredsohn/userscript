// ==UserScript==
// @name           OGame Redesign: Efficiency Tool
// @namespace      RiV-efficiency
// @description    Provides some useful efficiency information
// @version        0.1
// @include        http://*.ogame.*/game/index.php?page=station*
// ==/UserScript==

var ratioM = 3;
var ratioC = 2;
var ratioD = 1;

// get an element via its class name | thx @ marshen for the code
function getElementsByClass (cName, domNode) {
	if (cName == undefined || cName.length == 0) return;
	if (domNode == undefined) domNode = document;

	if (domNode.getElementsByClassName)
		return domNode.getElementsByClassName(cName);

	// browser doesn't support getElementsByClassName
	cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
	var elements = domNode.getElementsByTagName('*');
	var res = new Array();
	for (var i = 0; i < elements.length; i++) {
		var className = " " + elements[i].className + " ";
		if (className.indexOf(cName) > -1) {
			res.push(elements[i]);
		}
	}

	return res;
}

function getBuildingLevel(id) {
	var res = getElementsByClass('station' + id)[0];
	res = getElementsByClass('level', res)[0].innerHTML;
	res = res.match(/\d+/);

	return parseInt(res);
}

function removeSeparator(str) {
	if (!str) return null;
	return parseInt(str.replace(/\./g, ''));
}

function getBuildingInfo() {
	var res = new Array();

	var costs = document.getElementById('costs');
	costs = getElementsByClass('metal', costs);

	for(var i = 0; i < costs.length; i++) {
		var resType = costs[i].innerHTML;
		resType = resType.match(/ressourcen_(.+)\S+gif/);
		resType = RegExp.$1;
		
		var resValue = costs[i].title;
		resValue = resValue.substring(1, resValue.indexOf(' '));
		resValue = removeSeparator(resValue);
		resValue = (resValue > 0) ? resValue : 0;

		if(resType == 'metall') res[0] = resValue;
		if(resType == 'kristal') res[1] = resValue;
		if(resType == 'deuterium') res[2] = resValue;
	}

	for(var i = 0; i < 3; i++)
		res[i] = (res[i] > 0) ? res[i] : 0;

	return res;
}

function oRound(value, dec) {
	var res = Math.round(value * Math.pow(10, dec)) / Math.pow(10, dec);

	return res;
}

function formatNumber(num) {
	var separator = '.';
	var res = '';
	num = ''+num;

	while(num.length > 3) {
		res = separator + num.slice(-3) + res;
		num = num.substr(0, num.length - 3);
	}

	res = num + res;
	return res;
}

function insertText(e) {
	if(e.target.id != 'content') return;

	var RLevel = getBuildingLevel(14);
	var RWLevel = getBuildingLevel(21);
	var NLevel = getBuildingLevel(15);

	var buildingId = getElementsByClass('detail_screen')[0];
	buildingId = buildingId.getElementsByTagName('input')[1].value;

	var timeReduction = '';
	if(buildingId == 14)
		timeReduction = (1 / (RLevel + 2)) / (1 / (RLevel + 1));
	
	if(buildingId == 15)
		timeReduction = 0.5;

	if(buildingId == 21)
		timeReduction = (1 / (RWLevel + 2)) / (1 / (RWLevel + 1));

	if(timeReduction != '') {
		timeReduction = oRound((1 - timeReduction) * 100, 2);

		var buildingInfo = getBuildingInfo();
		var percentMSE = [buildingInfo[0]/timeReduction, buildingInfo[1]/timeReduction, buildingInfo[2]/timeReduction];
		percentMSE = percentMSE[0] + percentMSE[1] * (ratioM / ratioC) + percentMSE[2] * (ratioM / ratioD);
		percentMSE = formatNumber(Math.floor(percentMSE));

		var productionText = document.getElementById('action').getElementsByTagName('ul')[0];
		var buildTimeEff = document.createElement('li');
		buildTimeEff.innerHTML = 'Reduction: <span class="time">' + timeReduction + '%</span><br>1% &#8793; ' + percentMSE + ' <span title="Metal Standart Units">MSU</span>';
		productionText.appendChild(buildTimeEff);
	}
}

document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);