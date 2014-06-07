// ==UserScript==
// @name        WoW Better Remote AH
// @namespace   e404.eu
// @description World of Warcraft better Remote Auction House filter options project for Buy page. Will change URL before load to sort by Buyout Price Per Item (ascending) and display 40 items per page.
// @include     https://us.battle.net/wow/en/vault/character/auction/*/browse*
// @version     1.0
// @run-at      document-start
// @grant       none
// ==/UserScript==

//before: ...?n=cloth&filterId=-1&minLvl=-1&maxLvl=-1&qual=1&start=0&end=20&sort=bid&reverse=false
//after:  ...?n=cloth&filterId=-1&minLvl=-1&maxLvl=-1&qual=1&start=0&end=40&sort=unitBuyout&reverse=false

var WoWBetterRemoteAHBuyoutPPI40 = function () {
	var searchArr = location.search.slice(1).split("&");
	var searchObj = {};
	var i;

	for (i=0; i<searchArr.length; i++) {
		searchArr[i] = searchArr[i].split("=");
		searchObj[searchArr[i][0]] = searchArr[i][1];
	}

	searchObj["end"] = (searchObj["start"]) ? (parseInt(searchObj["start"], 10) + 40) : (40);
	searchObj["sort"] = "unitBuyout";
	searchObj["reverse"] = "false";

	var new_search = "?";
	for (key in searchObj) {
		new_search = new_search + key + "=" + searchObj[key] + "&";
	}

	new_search = new_search + "WoWBetterRemoteAH=true";

	var new_location = "https://" + location.host + location.pathname + new_search + location.hash;
	location.replace(new_location);
};

if (location.search.indexOf("WoWBetterRemoteAH") === -1) {
	WoWBetterRemoteAHBuyoutPPI40();
}