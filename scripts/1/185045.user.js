// ==UserScript==
// @name        Inventory Refresher
// @namespace   inventoryrefresher
// @description To gain stuff and make Drackonack eat Cheese for avatar
// @include     http://www.neopets.com/inventory.phtml
// @version     1
// @grant       none
// ==/UserScript==

function random(min, max) {
	return Math.floor((max - min) * Math.random()) + min;
}

var min = 2000; // in milliseconds
var max = 3000; // 1 second = 1000 milliseconds

setTimeout("location.reload(true);", random(min, max));

(function() {
if (document.body.innerHTML.indexOf("Something Has Happened!") > -1) {
alert("Avatar Found!");
}
else if (document.body.innerHTML.indexOf("---") > -1) {
alert("Do not delete this..");
}
});