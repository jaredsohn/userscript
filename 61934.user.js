// ==UserScript==
// @name          GoodFace
// @description   Displays the user's larger profile picture when you roll over the small one.
// @include       http://*.goodenough.ac.uk*
// ==/UserScript==
//


var allImages, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img[contains(@src, "s=s") or contains(@src, "s=t") or contains(@src, "s=m")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);

var i;	i=0;


while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	// Example of photo src     -->     03/31/2006
	// /siteimage.aspx?imageid=SzhzJl67uRc=&amp;s=s
	// want to change the 't' to an 'n' for large image
	var src = thisImage.src;
	var path = src.substring( 0, src.lastIndexOf('=') + 1 );
	var fileName = 'l';

	thisImage.alt = i;
	imgArray[i] = path + fileName;
	imgArray[i + allImages.snapshotLength] = src;

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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:0;visibility:hidden;position:absolute;z-index:100;top:20px;left:90px;background:none;}');
// addGlobalStyle('.tip img {border:2px solid white;}');


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