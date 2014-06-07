// ==UserScript==
// @name          Facebook Picture Preview
// @description   Hover over facebook thumbnails to preview full size picture next to it, without having to open a new page
// @include       http://*facebook.com*
// ==/UserScript==
//
// By: Sam Dods
// Email: sd3782(at)bris.ac.uk
// Last Update:  22/06/2007
//

var allImages, thumbnails, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img[contains(@src, "/t")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

thumbnails = document.evaluate(
	'//img[contains(@src, "/s")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Holds paths of all the enlarged images
imgArray = new Array( (allImages.snapshotLength + thumbnails.snapshotLength) * 2);

var i = 0;

while (i < allImages.snapshotLength + thumbnails.snapshotLength) {

	if (i < allImages.snapshotLength) thisImage = allImages.snapshotItem(i);
	else thisImage = thumbnails.snapshotItem(i - allImages.snapshotLength);

	// Example of photo src     -->     03/31/2006
	// http://photos-420.facebook.com/images/profile/628/72/t9999999_99999.jpg
	// want to change the 't' to an 'n' for large image
	var src = thisImage.src;
	var path = src.substring( 0, src.lastIndexOf('/') + 1 );
	var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );

	thisImage.alt = i;
	imgArray[i] = path + fileName;
	imgArray[i + allImages.snapshotLength + thumbnails.snapshotLength] = src;

	var newDiv = document.createElement('div');
	var html = "<div id='t" + i + "' class='tip'><img src='" + path + fileName + "'></div>";
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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:absolute;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;}');
addGlobalStyle('.tip img {border:2px solid white;}');


function popUp(pgX,pgY,oi) {
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	obj = document.getElementById(oi);
	objStyle = obj.style;
	objWidth = obj.offsetWidth;
	objHeight = obj.offsetHeight;
	if (objStyle.visibility == "visible") {
		objStyle.visibility = "hidden";
	}
	else {
		var top = pgY - objHeight;
		if (top < window.pageYOffset) top = window.pageYOffset;

		var left = pgX + 50;
		if (pgX > winWidth / 2) left = pgX - objWidth - 50;
		if (left > winWidth - objWidth - 15) left = winWidth - objWidth - 15;
		if (left < window.pageXOffset) left = window.pageXOffset;

		left += 'px';
		top += 'px';

		objStyle.left = left;
		objStyle.top = top;
		objStyle.visibility = "visible";
	}

}
