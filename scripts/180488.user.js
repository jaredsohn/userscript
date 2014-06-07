// ==UserScript==
// @name        MouseHunt Market Stats
// @author      Kevin Zhou
// @version     0.1.1
// @namespace   mhmarketstats
// @description Send data to database for stats about SUPER|brie+
// @include	    https://www.mousehuntgame.com/*
// @include     http://www.mousehuntgame.com/*
// ==/UserScript==
var itemNames = {
	superBrie: "super_brie_cheese"
};
function getStats(item) {
	var priceGet = new XMLHttpRequest();
	priceGet.open("POST", location.protocol + "//www.mousehuntgame.com/managers/ajax/trades/tradelist.php", false);
	priceGet.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	priceGet.send("hg_is_ajax=1&item_type=" + itemNames[item] + "&sort_by=cost&sort_order=asc&sn=Hitgrab");
	return JSON.parse(priceGet.response).trades;
}
function calculateStats(stats) {
	var msg = {};
	var items = 0;
	var total = 0;
	stats.forEach(function (ele) {total += ele.quantity * ele.unit_price; items += ele.quantity;});
	msg.marketItem = stats[0].item_name;
	msg.wAverage = total/items;
	total = 0;
	stats.forEach(function (ele) {total += ele.unit_price;});
	msg.uAverage = total/stats.length;
	msg.lowPrice = stats[0].unit_price;
	msg.highPrice = stats[stats.length - 1].unit_price;
	return msg;
}
/*function saveStats(stats, prefix) {
	if (!prefix) {
		localStorage["stats_" + (new Date()).valueOf()] = JSON.stringify(stats);
	} else {
		localStorage[prefix + (new Date()).valueOf()] = JSON.stringify(stats);
	}
}
function retrieveStats(list, index) {
	return JSON.parse(localStorage[list[index]]);
}
function getStatsList(prefix) {
	var lsKeys = Object.keys(localStorage);
	var ourKeys = [];
	if (!prefix) {
		lsKeys.forEach(function (ele) {
			if (ele.indexOf("stats_") == 0) {
				ourKeys.push(ele);
			}
		});
	} else {
		lsKeys.forEach(function (ele) {
			if (ele.indexOf(prefix) == 0) {
				ourKeys.push(ele);
			}
		});
	}
	return ourKeys;
}
function getItemStats(marketItem, prefix) {
	var thisItem = [];
	if (!prefix) {
		getStatsList().forEach(function(ele) {
			if (JSON.parse(localStorage[ele]).marketItem.toLowerCase() == marketItem.toLowerCase()) {
				thisItem.push(JSON.parse(localStorage[ele]));
			}
		});
	} else {
		getStatsList(prefix).forEach(function(ele) {
			if (JSON.parse(localStorage[ele]).marketItem.toLowerCase() == marketItem.toLowerCase()) {
				thisItem.push(JSON.parse(localStorage[ele]));
			}
		});
	}
	return thisItem;
}*/
var xhr;
function sendStats(stats) {
	console.log("sending stats");
	console.time("send");
	var data = "";
	Object.keys(stats).forEach(function (ele) {
		data += ele + "=" + stats[ele] + "&";
	});
	data += "timestamp=" + (new Date()).valueOf();
	xhr = new XMLHttpRequest();
	xhr.open("POST", "http://omniwarenetworks.com/projects/mhmarketstats/", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.timeEnd("send");
			console.log("Submission status: " + xhr.response);
		}
	}
	xhr.send(data);
}

function startStats() {
	sendStats(calculateStats(getStats("superBrie")));
}
document.getElementsByClassName("hornbutton")[0].getElementsByTagName("a")[0].addEventListener("click", function() {
	startStats();
}, false);