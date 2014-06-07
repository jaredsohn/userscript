// ==UserScript==
// @name          Googlenlarge
// @description   Enlarges pictures when you roll over them
// @include       http://images.google.com/*
// ==/UserScript==
//
// By: Ian Williams
// Email: iamtotus@gmail.com
// Last Update:  3.9.2007

var allImages, thisImage;
var allLinks, thisLink;
var globalTimer;


allLinks = document.evaluate( '//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);





// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);

var i=0;
var Swidth;
var Sheight;
while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	// Get the image URL from the Google URL
	var src = thisImage.src;
	var fileName = src.substring(src.lastIndexOf('http:') , src.length );





	//Get the image width and length for possible resizing
	if(fileName.search(/http/) != -1 && fileName.search(/google.com/) == -1) {
		for(var j=0; j < allLinks.snapshotLength; j++) {
			thisLink = allLinks.snapshotItem(j);
			a = String(thisLink);
			var located = a.indexOf(fileName);
			if ( located != -1) {
				a = a.substring(a.lastIndexOf('&h='), a.length);
				Sheight = a.substring(3, a.indexOf('&w') );
				Swidth = a.substring(a.indexOf('&w') + 3, a.indexOf('&sz=') );
				j = allLinks.snapshotLength;
			}
		}
	}


	// Fix an error javascript has with handling spaces
	while (fileName.search(/%2520/) != -1) {
		fileName = fileName.replace(/%2520/, "%20");
	}
	
	


	var Zwidth = parseInt(Swidth);
	var Zheight = parseInt(Sheight);
	
	if(Zwidth > 0 && Zheight > 0) {
		if( Zwidth > window.innerWidth/2) {
			var ratio = ((window.innerWidth/2)/Zwidth) * .9;
			Zwidth *= ratio; Zwidth = parseInt(Zwidth);
			Zheight *= ratio; Zheight = parseInt(Zheight);
		}
		if( Zheight > window.innerHeight) {
			var ratio = (window.innerHeight/Zheight) * .9;
			Zwidth *= ratio; Zwidth = parseInt(Zwidth);
			Zheight *= ratio; Zheight = parseInt(Zheight);
		}
	}

	thisImage.alt = i;
	imgArray[i] = fileName;
	imgArray[i + allImages.snapshotLength] = src;

		

	var newDiv = document.createElement('div');
	var html = "<div id='t" + i + "' class='tip'><img src=' "+fileName+" '  width=' "+Zwidth+" '  height =' "+Zheight+" '></div>";
	newDiv.innerHTML = html;
	document.body.appendChild(newDiv);


	thisImage.addEventListener( 'mouseover', function(event) {var x = event.pageX; var y = event.pageY; var z = 't' + this.alt; globalTimer = window.setTimeout( function() { popUp(x,y,z); }, 500); }, true);


	thisImage.addEventListener( 'mouseout', function(event) {window.clearTimeout(globalTimer); document.getElementById('t' + this.alt).style.visibility = "hidden"; }, true);

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

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:fixed;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;}');
addGlobalStyle('.tip img {border:2px solid white;}');


function popUp(pgX,pgY,oi) {
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	objStyle = document.getElementById(oi).style;
	obj = document.getElementById(oi);
	objWidth = obj.offsetWidth;
	objHeight = obj.offsetHeight;

	objStyle.visibility = "hidden";

	objStyle.top = '5px';
	if (pgX < (winWidth/2) ) {
		var spacing = winWidth - objWidth - 30;
		spacing += 'px'
		objStyle.left = spacing;
	}
	else {
		objStyle.left = '5px';
	}

	if ( (5 + objHeight) < winHeight ) {
		objStyle.visibility = "visible";
	}

}