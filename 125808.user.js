// ==UserScript==
// @name           Imgur Paste Handler
// @namespace      http://userscripts.org/users/pienkowb
// @description    Allows you to paste images from the clipboard; useful for uploading screenshots.
// @include        http://imgur.com/
// @include        http://imgur.com/?*
// ==/UserScript==

function generateFileName(length) {
	var fileName = "";

	for(var i = 0; i < length; i++) {
		var code = [65, 97][Math.floor(Math.random()*2)];
		fileName += String.fromCharCode(code + Math.floor(Math.random()*26));
	}
	return fileName + ".png";
}

function getImageAsFile(image) {
	var canvas = document.createElement("canvas");

	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas.mozGetAsFile(generateFileName(5));
}

function generateData(image) {
	try {
		return {files: [getImageAsFile(image)]};
	} catch(e) {
		return undefined;
	}
}

GM_addStyle("#drag * { display: none; }");
GM_addStyle("#drag br { display: inline; }");

var $ = unsafeWindow.$;
var pastebox = $("#drag");

$("body").prop("spellcheck", false);

pastebox.prop("contenteditable", true);
pastebox.css("maxHeight", "36px");
pastebox.css("overflow", "hidden");

var info = "drag and drop your images onto this page" + "<br>"
	+ "or paste them in this box";

pastebox.html(info);

pastebox.keypress(function(e) {
	if(!e.ctrlKey || e.which != 118)
		e.preventDefault();
});

pastebox.bind("paste", function(e) {
	setTimeout(function() {
		var count = $("#drag img").load(function() {
			var event = $.Event("drop");

			event.originalEvent = e;
			e.dataTransfer = generateData(this);

			$(document).trigger(event);
			$(this).remove();

			if(!--count && pastebox.html() != info)
				pastebox.html(info);
		}).length;

		if(!count && pastebox.html() != info)
			pastebox.html(info);
	}, 1);
});
