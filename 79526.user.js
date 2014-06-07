// ==UserScript==
// @name           Craigslist Hide Posts
// @namespace      http://localhost
// @description    Hide posts you've seen before
// @include        http://*.craigslist.org*
// ==/UserScript==

function hide(){
	var allBoxes = document.evaluate("//input[@class='hide']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allBoxes.snapshotLength; i++) {
   		var thisBox = allBoxes.snapshotItem(i);
		if (thisBox.checked){
			thisBox.parentNode.className = "hidden";

		}
	}

}

function checkall(){
	var allBoxes = document.evaluate("//input[@class='hide']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allBoxes.snapshotLength; i++) {
   		var thisBox = allBoxes.snapshotItem(i);
		if (thisBox.checked != 1){
			thisBox.checked = "checked";

		}
	}
}

function show(){
	var allBoxes = document.evaluate("//input[@class='hide']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allBoxes.snapshotLength; i++) {
   		var thisBox = allBoxes.snapshotItem(i);
		if (thisBox.checked){
			thisBox.parentNode.className = "row";

		}
	}
}

GM_addStyle(".hidden {display: none;}");

var options = document.getElementById("ef");
var hidespan = document.createElement('span');
var spanelement = options.childNodes[1];
spanelement.parentNode.insertBefore(hidespan, spanelement);
hidespan.id = "hidePosts";
hidespan.innerHTML = '[ <a id="hide" href="#">hide checked posts</a> ] [ <a id="checkall" href="#">check all posts</a> ]';
document.getElementById("hide").addEventListener("click", hide, false);
document.getElementById("checkall").addEventListener("click", checkall, false);

var showspan = document.createElement('span');
var otherspanelement = options.childNodes[1];
otherspanelement.parentNode.insertBefore(showspan, otherspanelement);
showspan.id = "showPosts";
showspan.innerHTML = '[ <a href="#">show all posts</a> ] ';
showspan.addEventListener("click", show, false);


var allDivs = document.evaluate("//p[@class='row']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
   	var thisDiv = allDivs.snapshotItem(i);
	var beforethis = thisDiv.childNodes[1];
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.className = "hide";
	beforethis.parentNode.insertBefore(checkbox, beforethis);
	
}