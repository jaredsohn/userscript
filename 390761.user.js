// ==UserScript==
// @name       SimpleCD ads removal
// @namespace  http://www.onthewings.net/
// @version    0.1
// @description  Remove ads from SimpleCD.
// @match      http://simplecd.me/*
// @copyright  2014 Andy Li
// ==/UserScript==

var nodes = document.querySelectorAll('a[id*=__lgUnion_a__]');
for (var i = 0 ; i < nodes.length ; ++i) {
	var node = nodes[i];
	node.remove();
	console.log("Removed: " + node.id);
}

document.querySelector('#ETE').remove();

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var nodes = mutation.addedNodes;
		for (var i = 0 ; i < nodes.length ; ++i) {
			var node = nodes[i];
			if (node.id.indexOf("__lgUnion_a__") >= 0) {
				node.remove();
				console.log("Removed: " + node.id);
			}
			
			if (node.id == "ETE") {
				node.remove();
				console.log("Removed: " + node.id);
			}
		}
	});
});
observer.observe(document.querySelector('body'), { childList: true });