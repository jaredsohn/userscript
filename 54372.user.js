// ==UserScript==
// @name           NZ Outbox tab
// @namespace      NZ
// @author           MJ
// @description    Creates an outbox tab
// @include        http://*nukezone.*
// @exclude        http://*nukezone.*/forum/*
// ==/UserScript==

//oh yeah opera handles textnodes differently!
function firstNode(node){
	var first = node.firstChild;
	while(first.nodeType != 1 && first.nextSibling) first = first.nextSibling;
	return first;
}
function lastNode(node){
	var last = node.lastChild;
	while(last.nodeType != 1 && last.previousSibling) last = last.previousSibling;
	return last;
}
function nextNode(node){
	var next = node.nextSibling;
	while(next.nodeType != 1 && next.nextSibling) next = next.nextSibling;
	return next;
}
function previousNode(node){
	var previous = node.previousSibling;
	while(previous.nodeType != 1 && previous.previousSibling) previous = previous.previousSibling;
	return previous;
}

var good = false;
var spans = document.getElementsByTagName("span");
for (var i = 0; i < spans.length; i++) {
	var span = spans[i];
	if(span.className == "BigText") {good = true; break;}
}

if(good){

	var tabsRow = firstNode(firstNode(firstNode(firstNode(nextNode(firstNode(firstNode(firstNode(nextNode(firstNode(firstNode(firstNode(firstNode(firstNode(document.body)))))))))))))); //did I mention table design sucks?
	var newTab = document.createElement("td");
	newTab.width = 73;
	var newLink = document.createElement("a");
	newLink.style.display = "block";
	newLink.style.width = "73px";
	newLink.style.height = "27px";
	
	newLink.title = "Go to the outbox";
	newLink.href = "/outbox.asp";
	
	function getBg(){
		//background data url
		return "url(data:image/gif;base64,R0lGODlhSQAbAMZFAAAAAIB/bHJxYFxbTZGQe4OCbzY2LVdWSZWUfmtqWmloWGdmVnp5Z5iXgQQEBDMyKm9uXomHdFtaTHd2ZFZVSD49NDg3Ln18aY6NeDw7MhISD3FwXzExKTw8MjExKHVzYzMzKmdmV3NyYTo6MFlYSj4+NDU1LDs7MTk5L1pZS3Z1ZDIyKj08MjQ0K0tKPn9+bHh3ZU9OQlVUR1BPQ4GAboeGcn18aomIdIGAbXl4ZnZ1Y4SDcJqZg3FwYGloWWFgUmVkVW1sXDAwKEVEOYuKdv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAH8ALAAAAABJABsAAAf+gH9/DgYVD0KIiYqLjI2Oj5CLDxUGDoKCGh0HHxFEnp+goaKjpKWmoREfBx0agg4ZDKeys7S1RAwZDgAGB7a+v74HBgAlKsDHyKQqJQAPncnQyREPAELR18hC1bQ83TwI0d7fydrWst03BRji7O3u4unr7zyz5bM3FEP6PzwC+gID9BHRRxBDQII/bvDAh5BHwBA88gmgJ8uerB/6ZvzzNwSgQIL7DhIcwAPjEI0d/c3AoK8AxVMWTxEsoG8AR49DiMA4KKHBQRsEecysSXNIEH3d6m2TNXSIzX8HPR3k4bNl0KYk9blw+hLmUplWnd6MSmRq1ZNDKMAQGpakyIn+tGKaIkhDn4QN+jZIEFhWX4MGe0FuaEDXLmCCg28o9XCjsePHjgm+sAtBH4TAjQ/+DcxAKwLJdj8P2SoBQQ3IqBt7AMChhuvXsF8TvKAvxVGjKfS51twg9xDa+gjMrg0cSHACsZO75gBgxY7n0KNDJ9h5CIkE+hKQ0Pec9/YhOgpS13d9dHUGGKSrf74CAAgc8OPLj39Qhj4FE/TF2OoC/kEMGBwA0mg31HefgAfccN8N8zUIHwgAtGDDhBRWSOEFKA2RwnMmjZbAhAc9lw9BLiSwA4YEbbjPDhpRsIOFME7YAgAm5GDjjTjeGEAAH0AAw447XgABBEAWaeSRPPqFiCSQOTZpowm76CDllFRWWWUPHzCgJQM9WKlDD2CGGeaWDMAg5pleWjmMBWe26eabcMYp55xgWgAACkHkqeeefPbp55+ABironigAMIIPiCaq6KKMNuroo5BGqugIAJwAxKWYZqrpppx26umnoGZ6AgAs/GDqqaimquqqrLbq6quosgBAIAA7)";
	}
	function getBgH(){
		//highlighted background data url
		return "url(data:image/gif;base64,R0lGODlhSQAbAMZDAKGfiIyKdmhnV7y6n6ekjcK/pH58aoKAbXp4ZsbDqAYGBXx6aMPBpU1NQaimjkhHPIWDcJmWgZ2ahFlYSo6MeJSRfV9eT2NiU4qIdGZlVXd1ZFhXSmFgUa6sk1VUSFZVR7Ctlaakjbe0mnp4ZxoaFmRjVGBeUE5NQWdmVlZUR4OBbq+slKGeiF5cT6eljpWTfZORe6Shi1dVSMLApb68obm3naWjjLOxmJ+dhq2rksrHq5aVf4B+a4+NeXl4ZoiGckVEOQAAAMbEqP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAABJABsAAAf+gH9/Cg0bD0CIiYqLjI2Oj5CLDxsNCoKCJB8LIQxCnp+goaKjpKWmoQwhCx8kggoeHaeys7S1Qh0eCkENC7a+v74LDUETDsDHyKQOE0EPncnQyQwPQUDR18hA1bU63djdOtDa1rLdOQA54Orr7O065+nu4bLjs+eJ6DmIOQKIQov8FAkIkCMgIgEBUUjop4FWPVkAEJ1ApEEfEIP/BPYTmIPDQYoagJyggEiFw230ECU4aBEjgI0TDEbch4/lRyAJTpI7lWglEIT7NnramCDBxpk4a/702a9FzlkPeaq0eVGoEKJGPw70CWSmgAQWuz6lh1Jq0p8trWLdmCgAV6/+CZACGMuz2oy7ePPi7UnV4N21iOAq/ao1gd7De6vRWMy4MWO+aIMiWgy4K2TLkYFkUOm48+NqNUKLHi0aMtCqiEJXRvrWpoCZI0jLLl3thu3buG/P9HrjYL8GtjcGXyRgRYubQGXwzs3c9riC0KNLlws9UQOEMl8KJGgwMwcI/bBLH6+vmo3z6NOjB4CuPfv38OPLjw9vPnv1+NGPw8G/v///APLHXoAEDkjggQiOs8OCDDbo4IMQRijhhBQ2OE4PGGao4YYcdujhhyCGqOE4P5Ro4okopqjiiiy26OKJ4/Ag44w01mjjjTjmqOOONI7jw49ABinkkEQWaeSRSAYDqU0gADs=)";
	}
	
	
	newLink.style.backgroundImage = getBg();
	newLink.addEventListener('mouseover', function () {this.style.backgroundImage = getBgH();}, false);
	newLink.addEventListener('mouseout', function () {this.style.backgroundImage = getBg();}, false);
	newTab.appendChild(newLink);
	tabsRow.insertBefore(newTab, firstNode(tabsRow));
}