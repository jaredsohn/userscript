// ==UserScript==
// @name           BGG - Market Info
// @namespace      http://geekdo.com/boardgame
// @description    Adds a Market Info link to the BGG Marketplace module of a game
// @include        http://*boardgamegeek.com/game/*
// @include        http://*boardgamegeek.com/boardgame/*
// @include        http://*bgg.cc/game/*
// @include        http://*bgg.cc/boardgame/*
// @include        http://*boardgamegeeks.com/game/*
// @include        http://*boardgamegeeks.com/boardgame/*
// @include        http://*geekdo.com/boardgame/*
// ==/UserScript==

var containers = document.getElementsByTagName("td");
var numContainers = containers.length
var gameId = 0;
var pattern = /ObjectID:\s*(\d+)\s*/i;

for(var x = 0; x < numContainers; ++x) {
	if(matches = containers[x].innerHTML.match(pattern)) {
		gameId = matches[1];
		break;
	}
}

if(gameId == 0) {
	errorLoading();
	return false;
};

var results = document.evaluate(
    '//td[@class="module_title" and contains(., "BGG Marketplace")]/div[@class="modulecommands"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
if(results.snapshotLength != 1) {
	errorLoading();
	return false;
}

var infoLink = document.createElement("span");
infoLink.innerHTML="[<a onclick='ViewMarketInfo(\""+gameId+"\");' href='javascript://'>Market Info</a>]";

results.snapshotItem(0).appendChild(infoLink);