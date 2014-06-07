// ==UserScript==
// @name           UD DSS Brain Map
// @namespace      Klexur
// @version        1.1
// @description    Displays the UDBrain data on the DSS map
// @updateURL      https://github.com/Klexur/UDScripts/raw/master/UD_DSS_Brain_Map.user.js
// @grant          GM_xmlhttpRequest
// @include        http://map.dssrzs.org/*
// @exclude        http://map.dssrzs.org/city
// ==/UserScript==

// Ben2's UDBrainMap script used as reference and some code borrowed.

window.addEventListener('load', getBlocks(), true);

function getBlocks() {
	var query = '//table[@class="map"]//td[contains(@class,loc)]';
	var blocks = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < blocks.snapshotLength; i++) {
		var currentBlock = blocks.snapshotItem(i).firstChild;
		// Non Free-running: carpark cemetary monument park street wasteland zoo
    	if ((currentBlock.className!='loc cprk')&&(currentBlock.className!='loc ceme')&&
			(currentBlock.className!='loc monu')&&(currentBlock.className!='loc park')&&
			(currentBlock.className!='loc opns')&&(currentBlock.className!='loc wast')&&
			(currentBlock.className!='loc zoox')) { 
			var coordinates = getCoords(blocks.snapshotItem(i).id);
			getData(coordinates, currentBlock);
		}
	}
}

function getCoords(id) {
	var a = id.substr(1).split('y');
	var x = a[0];
	if (a[0] <= 9) x = '0' + a[0];
	var y = a[1];
	if (a[1] <= 9) y = '0' + a[1];
	return (x + y);
} 

function getData(building, currentBlock) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.alloscomp.com/udbrain/api4ext.php?'+building,
		onload: function(response) {
			if(response.responseText != '') {
				var data = response.responseText;
				var arr = data.split(':');
				// arr[0] = coords, arr[1] = timestamp, arr[2] = report type, arr[3] = barricades
				addData(currentBlock, arr[1], arr[2], arr[3]);
			}
		}
	});
}

function addData(currentBlock, timestamp, rtype, barricades) {
	var cades = convertCadeLevelToShort(barricades);
	var description = currentBlock.firstChild.nextSibling;
	description.innerHTML = description.innerHTML + '<br>' + cades;
	description.title = getAge(timestamp);
}

function convertCadeLevelToShort(cl) {
	if(cl == 1) return "(Opn)";
	if(cl == 2) return "(Cls)";
	if(cl == 3) return "(LoB)";
	if(cl == 4) return "(LiB)";
	if(cl == 5) return "(QSB)";
	if(cl == 6) return "(VSB)";
	if(cl == 7) return "(HeB)";
	if(cl == 8) return "(VHB)";
	if(cl == 9) return "(EHB)";
}

function getAge(seconds) {
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);

	// Handle new time granularity
	var agestr = '';
	if(seconds == 3600) agestr = '<1h';
	else if(seconds == 14400) agestr = '<4h';
	else {							
		seconds %= 60;
		minutes %= 60;
		hours %= 24;
		if (days) agestr += days + 'd';
		if (hours) agestr += hours + 'h';
		if (minutes) agestr += minutes + 'm';
		if (seconds) agestr += seconds + 's';
	}
	return agestr;
}