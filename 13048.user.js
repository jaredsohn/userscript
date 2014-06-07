// ==UserScript==
// @name          Zoom Vazaar pictures
// @description   Displays a larger version of all photos on vazaar.com
// @include       http://*.vazaar.com/*
// ==/UserScript==
//
// By: Markus Mayer
// Email: kontakt at defx dot de
// Last Update:  10/15/2007
//
// http://media.vazaar.com/images/source/ddfc030a4b7c691242b4ad6dc35683f1.jpg
// http://media.vazaar.com/images/cache/ddfc030a4b7c691242b4ad6dc35683f1-450x450.jpg => -12
// http://media.vazaar.com/images/cache/ddfc030a4b7c691242b4ad6dc35683f1-450x450.jpg => -12
// http://media.vazaar.com/images/cache/b8c8c4760cca5aa2870b6c241e42910d-65x65.jpg => -10


function addGlobalStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) { 
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}

addGlobalStyle('.tip {border:0;padding:1px;display:none;visibility:hidden;position:absolute;z-index:100;background-color:#f77;}');
addGlobalStyle('.tip img {border:5px solid white;}');

function mouseMove(event) {
	var divObj = document.getElementById(this.alt);
	var x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	// unless it doesn't fit on the screen and there is more space on the right side
	if(x < window.pageXOffset && event.pageX < (window.innerWidth / 2)) {
	  x = event.pageX + 5;
	}
	var y = event.pageY - (divObj.offsetHeight / 2); // show large image centered beside the cursor
	// don't let it slide out the top or bottom of the window
	y = Math.min(y, window.pageYOffset + window.innerHeight - divObj.offsetHeight - 5);
	y = Math.max(y, window.pageYOffset + 5);
	divObj.style.left = x + 'px';
	divObj.style.top = y + 'px';
	divObj.style.visibility = "visible";
	divObj.style.display = "block";
}

function mouseOut(event) {
	var divObj = document.getElementById(this.alt);
  divObj.style.visibility = "hidden";
  divObj.style.display = "none";
}

function addImage(smallImgObj, index) {
	var smallSrc = smallImgObj.src;
	// do not re-add images that already have a alt tag starting with 'largeDiv'
	var sepIndex = smallSrc.lastIndexOf("-");
	if(sepIndex >= (smallSrc.length - 12) && smallImgObj.alt.indexOf("largeDiv") != 0 && 
					smallImgObj.alt.indexOf("/source/") <= 0 &&
					smallImgObj.alt.indexOf("/cache/") != 0) 
	{
	  // cut the '-65x65', '-450x450' ... part out of the source name
	  var largeSrc = smallSrc.substring(0, sepIndex) + smallSrc.substring(smallSrc.length - 4, smallSrc.length);
	  largeSrc = largeSrc.replace('/images/cache/','/images/source/');
	  smallImgObj.alt = "largeDiv:" + largeSrc;

	  var largeDivObj = document.createElement('div');
	  largeDivObj.innerHTML = "<div id='largeDiv:" + largeSrc + "' class='tip'><img src='" + largeSrc + "'></div>";
	  document.body.appendChild(largeDivObj);

	  smallImgObj.addEventListener('mouseover',	mouseMove, true);
	  smallImgObj.addEventListener('mousemove',	mouseMove, true);
	  smallImgObj.addEventListener('mouseout', mouseOut, true);
	}
}

function addAllImages() {
  //GM_log('addAllImages');
  for (var i = 0; i < document.images.length; i++) {
    addImage(document.images[i], i);
  }
}

function DOMAttrModified(event) {
  //GM_log('DOMAttrModified: event: ' + event.target.id);
  if (event.target.id != '' && event.target.id.substring(0, 9) != "largeDiv:") { // don't reload on empty or self generated events
    addAllImages(); 
  }
}

// check for new images after document has been changed by AJAX scripts
document.addEventListener("DOMAttrModified", DOMAttrModified, false);

// add a larger image for all images 
addAllImages(); 

