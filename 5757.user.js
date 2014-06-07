// ==UserScript==
// @name          UMC Image Mouseover
// @description   Displays a larger thumbnail when you roll over the small one on the front page.  Based on "inYOfaceBook" by Justin Rosenthal.
// @include       http://*usemycomputer.com*
// @include       http://*.usemycomputer.com*
// ==/UserScript==
//
// Edited by Danny Pesses
// Based on "inYOfaceBook" by Justin Rosenthal
//

var allImages, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img[contains(@src, "/indeximages")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);

var i=1;

while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	// Example:
	// http://usemycomputer.com/indeximages/2006/September/th-MandyMooreYesPlease782.jpg
	// want to add '.thumbnails/' before image name for larger thumb
	var src = thisImage.src;
	var path = src.substring( 0, src.lastIndexOf('/') + 1 );
	var fileName = '.thumbnails/' + src.substring( src.lastIndexOf('/') + 1, src.length );

	thisImage.alt = i;
	imgArray[i] = path + fileName;
	imgArray[i + allImages.snapshotLength] = src;

	// if larger thumb isn't available, show text "img n/a"
	var newDiv = document.createElement('div');
	var html = "<div id='t" + i + "' class='tip'><img src='" + path + fileName + "' alt='img n/a'></div>";
	newDiv.innerHTML = html;
	document.body.appendChild(newDiv);


	thisImage.addEventListener(
		'mouseover',
		function(event) {
			var x = event.pageX;
			var y = event.pageY;
			var z = 't' + this.alt;
			globalTimer = window.setTimeout(
				function() { popUp(x,y,z); },
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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:absolute;z-index:100;color:#000;top:20px;left:90px;background-color:#666;}');
addGlobalStyle('.tip img {background-color:#fff;border:2px solid white;}');


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
		if ( (pgY + obj.offsetHeight) > winHeight )
			var top = pgY - obj.offsetHeight - 20;
		else
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
