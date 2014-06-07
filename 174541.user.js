// ==UserScript==
// @name        INGAccess
// @namespace   http://bramd.nl/
// @description Fix ING bankieren accessibility
// @include     https://bankieren.mijn.ing.nl/*
// @version     1
// ==/UserScript==

var addressBook = null;
var searchNode = null;

function hasClass (element, selector) {
	var className = " " + selector + " ";
	if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1 ) {
		return true;
	} else {
		return false;
	}
}

var addressBookCreatedObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function(mutation) {
		for (var i=0; i < mutation.addedNodes.length; i++) {
			var node = mutation.addedNodes[i];
			if (hasClass(node, "riaf-addressbook")) {
				addressBook = node;
				addressBookObserver.observe(addressBook, { childList: true, subtree: true, attributes: true});
				addressBookCreatedObserver.disconnect();
			}
		}
	})
});

var addressBookObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.addedNodes) {
			handleAddedNodes(mutation);
		}
	});
});

function handleAddedNodes (mutation) {
	for (var i=0; i < mutation.addedNodes.length; i++) {
		var node = mutation.addedNodes[i];
		if (node.tagName == "DIV") {
			var searchNode = node.querySelector("input#searchInput");
			var resultsNode = node.querySelector("div.riaf-listrenderer-address");
			if (searchNode) {
				handleSearchInput(searchNode);
			}
			if (resultsNode) {
				handleResultsList(resultsNode);
			}
		}
	}
}

function handleSearchInput(node) {
	node.setAttribute("aria-autocomplete", "list");
	node.setAttribute("aria-expanded", "true");
	node.setAttribute("aria-owns", "addressList");
	node.focus();
	searchNode = node;
}

var resultsListObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i=0; i < mutation.addedNodes.length; i++) {
			var node = mutation.addedNodes[i];
			node.setAttribute("id", "address-" + i);
		}
		if (mutation.attributeName) {
			if (hasClass(mutation.target, "riaf-listitem-selected")) {
				searchNode.setAttribute("aria-activedescendant", mutation.target.id);
			}
		}
	});
});

function handleResultsList (node) {
	node.setAttribute("role", "");
	node = node.children[1];
	node.setAttribute("aria-label", "Adresboek");
	node = node.children[1];
	setTimeout(function () {
		node.setAttribute("role", "listbox")
	}, 500);
	node.setAttribute("id", "addressList");
	resultsListObserver.observe(node, { childList: true, attributes: true, subtree: true});
}

addressBookCreatedObserver.observe(document.body, { childList: true });