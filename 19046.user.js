// ==UserScript==
// @name      Photo pop-up + gets rid of ads
// @version	1.0
// @author	Adam Booth
// @namespace   
// @description  Makes Facebook  photos pop up + and removes ads
// @include    *.facebook.com/*
// ==/UserScript==

/*
Copyright (C) 2007 by Alan Kelly. Modified by adam booth

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

You may distribute the program, with or without changes, as long
as the original creator (Alan Kelly) is credited and this notice
remains intact. You may not sell any portion of this script.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

/************************************************/


/************************************************/


var allImages, thisImage;
var globalTimer;

allImages = document.evaluate(
	'//img',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);




var i=0;

while (i < allImages.snapshotLength) {


	thisImage = allImages.snapshotItem(i);

	// Example of photo src     -->     03/31/2006
	// http://photos-420.facebook.com/images/profile/628/72/t9999999_99999.jpg
	// want to change the 't' to an 'n' for large image
	var src = thisImage.src;

	var path = src.substring( 0, src.lastIndexOf('/') + 1 );
	var fileName = 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );

	var fish = src.substring(src.lastIndexOf('/') + 1, src.length);
	if(fish.search('n') > -1) {
		i++;
		continue;
	}


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
			var z = 't' + this.alt;
			globalTimer = window.setTimeout(
				function() { popUp(z); },
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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:fixed;z-index:100;color:#FF3366;top:20px;left:90px;background-color:#FF3366;}');
addGlobalStyle('.tip img {border:2px solid white;}');

function popUp(oi) {
	objStyle = document.getElementById(oi).style;
	objStyle.visibility = "hidden";
	objStyle.left = '5px';
	objStyle.top = '5px';
	objStyle.visibility = "visible";

//color:#333333;top:20px;left:90px;background-color:#3B5998;}');

}

window.addEventListener(
    'load', 
    function() { var remove=null;
    remove = document.getElementById('ssponsor');
    if(remove) remove.parentNode.removeChild(remove);
},
    true);