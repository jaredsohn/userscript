// ==UserScript==
// @name         Kittens for FetLife
// @description  Replace all avatars and pictures with kittens until hovered over.
// @version      1.0
// @match        http://*.fetlife.com/*
// @match        https://*.fetlife.com/*
// ==/UserScript==

var images = {};
var kittens = {};
var over = {};
var out = {};

function mouseOver(src) {
	if (src in over) return over[src];

	return (over[src] = function() {
		images[src].forEach(function(img) {
			img.setAttribute("src", src);
		});
	});
}

function mouseOut(src) {
	if (src in out) return out[src];

	return (out[src] = function() {
		images[src].forEach(function(img) {
			img.setAttribute("src", kittens[src]);
		});
	});
}

var kittenIndex = 0;

function handleImage(img) {
	if (img.dataset.kittened) return;

	var src = img.getAttribute("src");
	var style = window.getComputedStyle(img);
	var width = parseInt(style.width, 10);
	var height = parseInt(style.height, 10);
	var kitten = kittens[src] = kittens[src] || "http://placekitten.com/" + width + "/" + height + "?image=" + (kittenIndex = kittenIndex % 16 + 1);

	if (!(src in over)) images[src] = [];

	images[src].push(img);

	img.setAttribute("src", kitten);
	img.setAttribute("width", width);
	img.setAttribute("height", height);

	img.addEventListener("mouseover", mouseOver(src));
	img.addEventListener("mouseout", mouseOut(src));

	img.dataset.kittened = true;
}

function findImages(node) {
	if (node.nodeType !== 1) return;

	if (node.tagName === "IMG" && / (?:avatar|picture) /.test(" " + node.className)) {
		handleImage(node);
	} else {
		Array.prototype.forEach.call(node.querySelectorAll("img.avatar, img.picture") || [], handleImage);
	}
}

var observer = new WebKitMutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes) Array.prototype.forEach.call(mutation.addedNodes, findImages);
	});
});

observer.observe(document.body, { childList: true, subtree: true });

findImages(document.body);
