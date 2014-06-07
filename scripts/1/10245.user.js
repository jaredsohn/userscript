// ==UserScript==
// @name           Bodybuilding.com+
// @namespace      mattyj
// @description    Bodybuilding.com Picture Gallery And Bodyspace Image Rollover: Adds a image roll-over on every members image.
// @include        http://*.bodybuilding.com/*
// @exclude        http://forum.bodybuilding.com/forumdisplay.php?*
// @exclude        http://forum.bodybuilding.com/showthread.php?*
// ==/UserScript==

var allImages, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img[contains(@src, "profilepic" | "photo" )]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

imgArray = new Array( allImages.snapshotLength * 2);

i=0;
while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	var src = thisImage.src;
	var fileName = src.replace("/thumbs/","/");
	fileName = fileName.replace("/medium/","/");
	fileName = fileName.replace(/\/profilepic\/(\d+)[at]?\.jpg$/, '/profilepic/$1orig.jpg');

	thisImage.alt = i;
	imgArray[i] = fileName;
	imgArray[i + allImages.snapshotLength] = src;

	var newDiv = document.createElement('div');
	var html = "<div id='t" + i + "' class='tip'><img src='" + fileName + "'></div>";
	newDiv.innerHTML = html;
	document.body.appendChild(newDiv);

	thisImage.addEventListener(
		'mouseover',
		function(event) {
			var x = event.pageX;
			var y = event.pageY;
			var z = 't' + this.alt;
			globalTimer = window.setTimeout(
				function() {
					popUp(0,pageYOffset,z);
				},
				500);
		},
		true);

	thisImage.addEventListener(
		'mouseout',
		function(event) {
			window.clearTimeout(globalTimer);
			document.getElementById('t' + this.alt).style.visibility = "hidden";
		},
		true);

	i++;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 3px 3px;visibility:hidden;position:absolute;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;}');
addGlobalStyle('.tip img {border:2px solid white;}');

function popUp(pgX,pgY,oi) {
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	objStyle = document.getElementById(oi).style;
	obj = document.getElementById(oi);
	objWidth = obj.offsetWidth;
	if (objStyle.visibility == "visible") {
		objStyle.visibility = "hidden";
	}
	else {
			var top = pgY + 20;

		var left = pgX - (objWidth/4);
		if (left < 2) left = 2;
		else if (left + objWidth > winWidth) left -= objWidth/2;

		left += 'px';
		top += 'px';

		objStyle.left = left;
		objStyle.top = top;
		objStyle.visibility = "visible";
	}
}