// ==UserScript==
// @name           SA Forums: Freeze animated avatars
// @namespace      meta.ironi.st
// @author         sethaurus
// @description    Freeze animated avatars on forums.somethingawful.com
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

function createCanvas(width, height) {
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
};

function reloadImage (img, callback) {
	img.onload = callback;
	img.src += '#';
};

function flattenImage (img) {
	reloadImage(img, function() {
		var canvas = createCanvas(img.width, img.height);
		canvas.getContext("2d").drawImage(img, 0, 0);
		img.parentNode.replaceChild(canvas, img);
	});
};

var avatars = document.querySelectorAll(".title img");
Array().forEach.call(avatars, flattenImage);