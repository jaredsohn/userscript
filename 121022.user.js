// ==UserScript==
// @name          studivzZoomPics
// @description   Displays a larger version of all photos on studivz.net (also has a slide show mode now)
// @include       http://*.studivz.net/*
// @include       http://*.schuelervz.net/* 
// @include       http://*.meinvz.net/*
// ==/UserScript==
//
// By: Dorian Scholz
// Email: dorianscholz at gmx.de
// Last Update:  07/08/2008
//
// Example of photo src from 10/17/2006
// http://217.188.35.147/pics/members/1/225/99999-2323-m.jpg  // medium
// http://217.188.35.147/pics/members/1/225/99999-2323-w.jpg  // winzig
// http://217.188.35.147/pics/members/1/225/99999-2323-s.jpg  // small
// http://217.188.35.147/pics/members/1/225/99999-2323.jpg    // large

var maxZoomFactor = 2.5;
var popupDelayTime = 0; // [ms]

function addGlobalStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) { 
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}

function mouseMove(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
	var imgObj = divObj.firstChild;
	var x = 0, y = 0, maxWidth = 0, maxHeight = 0, zoomFaktor = 0; 
	// check which side of the cursor has more space left
	if(event.pageX < (window.innerWidth / 2)) {
	  x = event.pageX + 10;
	  maxWidth = window.innerWidth - (event.pageX + 50);
	} else {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	  maxWidth = event.pageX - 20;
	}
	// zoom image to max size, so it still fits in the window
  maxHeight = window.innerHeight - 20;
  zoomFaktor = Math.min(maxZoomFactor, maxHeight / imgObj.naturalHeight, maxWidth / imgObj.naturalWidth);
  imgObj.width = imgObj.naturalWidth * zoomFaktor;
  imgObj.height = imgObj.naturalHeight * zoomFaktor;
  // if the zoomed image still fits on the left side of the cursor, put it there
	if(event.pageX - (5 + divObj.offsetWidth) >= 0) {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	}
	y = event.pageY - (divObj.offsetHeight / 2); // show large image centered beside the cursor
	// don't let it slide out the top or bottom of the window
	y = Math.min(y, window.pageYOffset + window.innerHeight - divObj.offsetHeight - 5);
	y = Math.max(y, window.pageYOffset + 5);

  divObj.className = "divPopup";
	divObj.style.left = x + "px";
	divObj.style.top = y + "px";
//	divObj.style.visibility = "visible";
}

var delayedPopupObj;
var delayedPopupTimeout;

function showDelayedPopup() {
  delayedPopupObj.style.visibility = "visible";
}

function mouseOver(event) {
  delayedPopupObj = document.getElementById(this.getAttribute("largeDivId"));
	delayedPopupTimeout = window.setTimeout(showDelayedPopup, popupDelayTime);
}

function mouseOut(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
	window.clearTimeout(delayedPopupTimeout);
  divObj.style.visibility = "hidden";
}

function addImage(smallImgObj) {
	var smallSrc = smallImgObj.src;
	// do not re-add images that already have a 'largeDivId' attribute
	if(smallSrc[smallSrc.length - 6] == "-" && !smallImgObj.hasAttribute("largeDivId")) 
	{
	  // cut the '-m', '-w' or '-s' part out of the source name
	  var largeImgObj = document.createElement("img");
	  largeImgObj.src = smallSrc.substring(0, smallSrc.length - 6) + smallSrc.substring(smallSrc.length - 4, smallSrc.length);
	  largeImgObj.className = "m";

	  var largeDivObj = document.createElement("div");
	  largeDivObj.appendChild(largeImgObj);
	  largeDivObj.setAttribute("name", "largeDiv");
	  largeDivObj.id = "largeDiv:" + largeImgObj.src;
	  largeDivObj.className = "divPopup";
	  document.body.appendChild(largeDivObj);

	  smallImgObj.setAttribute("largeDivId", largeDivObj.id);
	  smallImgObj.addEventListener('mouseover',	mouseOver, true);
	  smallImgObj.addEventListener('mousemove',	mouseMove, true);
	  smallImgObj.addEventListener('mouseout', mouseOut, true);
	}
}

function addAllImages() {
  for (var i = 0; i < document.images.length; i++) {
    addImage(document.images[i]);
  }
}

function DOMAttrModified(event) {
  //console.log('DOMAttrModified: event: ' + event.target.id);
  if (event.target.id != '' && event.target.id.substring(0, 9) != "largeDiv:") { // don't reload on empty or self generated events
    addAllImages(); 
  }
}

function setupImageZoom() {
  addGlobalStyle('.divPopup {visibility: hidden; position: absolute; z-index: 100; padding: 3px; background-color: white;}');

  // check for new images after document has been changed by AJAX scripts
  document.addEventListener("DOMAttrModified", DOMAttrModified, false);

  // add a larger image for all images 
  addAllImages(); 
}

//
// slideshow code starts here
//

var currentImage = -1;
var imageDivs;
var divSlideShowBackground;

function showImage(index) {
  if (index >= 0 && index < imageDivs.length) {
    var divObj = imageDivs[index];
  	var imageObj = divObj.firstChild;
    var maxImageWidth = window.innerWidth - ((window.scrollMaxY > 0) * 15);
    var maxImageHeight = window.innerHeight - ((window.scrollMaxX > 0) * 15);
    var zoomFactor = Math.min(maxZoomFactor, maxImageHeight / imageObj.naturalHeight, maxImageWidth / imageObj.naturalWidth);
    imageObj.width = imageObj.naturalWidth * zoomFactor;
    imageObj.height = imageObj.naturalHeight * zoomFactor;
    divObj.className = "divSlideShow";
	  divObj.style.left = ((maxImageWidth - imageObj.width) / 2) + "px";
	  divObj.style.top = ((maxImageHeight - imageObj.height) / 2) + "px";
	  divObj.style.visibility = "visible";
	  return true;
	}
  return false;
}

function hideImage(index) {
  if (index >= 0 && index < imageDivs.length) {
	  imageDivs[index].style.visibility = "hidden";
	  return true;
	}
  return false;
}

function changeImage(delta) {
  hideImage(currentImage);
  currentImage += delta;
  if (!showImage(currentImage)) {
    endSlideShow();
  }
}

function keyHandler(event) {
  var keyChar = String.fromCharCode(event.which);
  var keyCode = event.keyCode;
  if (event.altKey || event.ctrlKey || event.shiftKey) {
    return true; // ignore key if modifier is used
  }
  if (keyCode == 39 || keyCode == 40 || keyChar == ' ') { // arrow right/down, space
    changeImage(+1);
  } else if (keyCode == 37 || keyCode == 38 || keyCode == 8 || keyChar == 'b') { // arrow left/up, backspace, 'b'
    changeImage(-1);
  } else if (keyCode == 27) { // ESC
    endSlideShow();
  } else {
    //console.log("char: " + keyChar);
    //console.log("code: " + keyCode);
    return true;
  }
  event.preventDefault();
  return false;
}

function clickDocument(event) {
  if (event.target.nodeName == "IMG") { // goto next image if we click on the image
    changeImage(+1);
  } else { // exit if we click anywhere else
    endSlideShow();
  }
}

function endSlideShow() {
  hideImage(currentImage);
  currentImage = -1;
  divSlideShowBackground.style.visibility = "hidden";
  document.removeEventListener('keypress', keyHandler, true);
  document.removeEventListener("click", clickDocument, true);
  return false;
}

function startSlideShow(event) {
  imageDivs = document.getElementsByName("largeDiv");
  document.addEventListener('keypress', keyHandler, true); // use key events to navigate the slide show
  document.addEventListener("click", clickDocument, true); // exit slide show when clicking on the background
  divSlideShowBackground.style.visibility = "visible";
  currentImage = 0;
  showImage(currentImage);
  return false;
}

function mouseOverAbout(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
  divObj.style.visibility = "visible";
}

function setupSlideShow() {
  var ulSlideShowNav = document.createElement("ul");
  ulSlideShowNav.className = "linkList";

  var linkSlideShow = document.createElement("a");
  linkSlideShow.href = "#";
  linkSlideShow.innerHTML = "SlideShow";
  linkSlideShow.title = "Start SlideShow: use arrow keys to navigate, press ESC to exit";
  var listSlideShow = document.createElement("li");
  listSlideShow.appendChild(linkSlideShow);
  ulSlideShowNav.appendChild(listSlideShow);

  var linkList = document.getElementById("leftSideBox").previousSibling.previousSibling;
  linkList.appendChild(ulSlideShowNav);

  addGlobalStyle('.divSlideShow {border:0;padding:0px;visibility:hidden;position:absolute;z-index:100;}');
  addGlobalStyle('.divSlideShow img {border:0px solid white;}');
  addGlobalStyle('#divSlideShowBackground {border:0;padding:0px;visibility:hidden;position:absolute;z-index:99;background-color:#000;width:100%;height:100%;top:0px;left:0px;}');
  
  divSlideShowBackground = document.createElement("div");
  divSlideShowBackground.id = "divSlideShowBackground";
  document.body.appendChild(divSlideShowBackground);

  linkSlideShow.addEventListener("click", startSlideShow, true);

  var aboutDivObj = document.createElement("div");
  aboutDivObj.id = "aboutPopup";
  aboutDivObj.className = "divPopup";
  aboutDivObj.innerHTML = "<h2>SlideShow</h2><p>Shows all images from the current page in a slide show.</p><strong>Keys</strong><dl><dt>next image</dt><dd>right/down arrow<br>space<br>click on image</dd><dt>previous image</dt><dd>left/up arrow<br>b<br>backspace</dd><dt>end slide show</dt><dd>escape<br>click on background</dd></dl><h2>by Dorian Scholz</h2>";
  document.body.appendChild(aboutDivObj);

  linkSlideShow.setAttribute("largeDivId", aboutDivObj.id);
  linkSlideShow.addEventListener('mouseover',	mouseOver, true);
	linkSlideShow.addEventListener('mousemove',	mouseMove, true);
  linkSlideShow.addEventListener('mouseout', mouseOut, true);
}

var nextImageLink;
function gotoNextImageLink(event) {
  var photoContainer = document.getElementById("PhotoContainer");
  // do not advance to next image, if in edit mode (editing links to people on the photo)
  if (photoContainer["className"].search("editMode") == -1) {
    window.location.href = nextImageLink.href;
  }
  return false;
}

function setupImageOnClick() {
  var photoContainer = document.getElementById("PhotoContainer");
  if (!photoContainer) {
    return;
  }
  
  var image = photoContainer.firstChild.nextSibling;

  nextImageLink = document.getElementById("photoButtons").previousSibling.previousSibling.lastChild.previousSibling;

  if (!image || !nextImageLink) {
    return;
  }
  
  image.addEventListener('click',	gotoNextImageLink, true);
}

function init(event) {
  setupImageZoom();
  setupSlideShow();
  setupImageOnClick();
}

//window.addEventListener("load", init, true); // this is delayed by half a second or so
init(); // this works without any delay

