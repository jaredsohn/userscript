// ==UserScript==
// @name           Randomize gReader
// @namespace      net.theprophet
// @include        http://www.google.com/reader/view/*
// ==/UserScript==
listParent = document.getElementById("sub-tree-item-0-main");
existingList = listParent.lastChild;
lastFeedID = existingList.lastChild.id;
lastFeedIDArray = lastFeedID.split("-");
feedCount = lastFeedIDArray[3];
feedArray = [];
newList = listParent.appendChild(document.createElement("UL"));
existingList.style.display = "none";
for (var i = 0; i < feedCount; i++) {	feedArray[i] = i;}
feedArray.sort(function() {return 0.5 - Math.random()});
for (var i = 0; i < feedCount; i++) {
	try {
		thisItem = feedArray[i];
		fromChild = existingList.childNodes[thisItem].cloneNode(true);
		newList.appendChild(fromChild);
	} catch (e) {
		try {
			console.log(thisItem);
			console.log(existingList.childNodes[thisItem]);
		} catch (consoleE) {}
	}
}
existingList.parentNode.removeChild(existingList);