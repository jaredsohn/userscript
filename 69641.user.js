// ==UserScript==
// @name          4chan Expand All Images
// @description   Adds +/- buttons to top left of page to expand/shrink all images on a page.
// @include       http://boards.4chan.org/*
// @version       2.0
// ==/UserScript==


//set attributes
function setExpandImageAttributes(a) {
	if (a.getAttribute("expanded") == null) {
		a.setAttribute("expanded", "false");
		a.setAttribute("expandImage", a.href);
		a.setAttribute("expandOriginalHTML", a.innerHTML);
		a.setAttribute("onClick", "javascript:return false;");
		img = a.getElementsByTagName("img")[0];
		a.setAttribute("thumbSRC", img.getAttribute("src"));
		a.setAttribute("thumbWidth", img.getAttribute("width"));
		a.setAttribute("thumbHeight", img.getAttribute("height"));
		a.setAttribute("md5", img.getAttribute("md5"));
		a.target = "_self";
		a.addEventListener("click", shrink_expand, false);
	}
}

//toggle function
function shrink_expand(e){
	var work;
	if (e.href){
		work = e;
	} else {
		work = this;
	}
	if (work.getAttribute("expanded") != "true") {
		work.innerHTML = '<img md5="' + work.getAttribute("md5") + '" style="border: 1px dashed black;min-width: ' + work.getAttribute("thumbWidth") + 'px;min-height: ' + work.getAttribute("thumbHeight") + 'px;" src="' + work.getAttribute("expandImage") + '" border="0" align="left" hspace="20">';
		work.setAttribute("expanded", "true");
	} else {
		work.innerHTML = work.getAttribute("expandOriginalHTML")
		work.setAttribute("expanded", "false");
	}
}


//expandall function
function expandAll(){
	images = document.getElementsByTagName('img');
	for (i = 0; i < images.length; i++){
		if (images[i].getAttribute('md5') && images[i].parentNode.getAttribute("expanded") != "true"){
			shrink_expand(images[i].parentNode);
		}
	}
}

//shrinkall function
function shrinkAll(){
	images = document.getElementsByTagName('img');
	for (i = 0; i < images.length; i++){
		if (images[i].getAttribute('md5') && images[i].parentNode.getAttribute("expanded") == "true"){
			shrink_expand(images[i].parentNode);
		}
	}
}


function doExpandAllImages(){
	// create menu
	var myHaxMenu = document.createElement("div");
	myHaxMenu.innerHTML = ''
	+'<font size="4">'
	+'<br />'
	+'<a id="expand" href="javascript:void(0);">+</a>'
	+'<br />'
	+'<a id="shrink" href="javascript:void(0);">-</a>'
	+'</font>';

	// add menu
	document.body.insertBefore(myHaxMenu, document.body.firstChild);

	// set menu clicks
	document.all.expand.addEventListener("click", expandAll, false);
	document.all.shrink.addEventListener("click", shrinkAll, false);

	//working for expanding single images
	images = document.getElementsByTagName('img');
	for (i = 0; i < images.length; i++){
		if (images[i].getAttribute('md5')){
			setExpandImageAttributes(images[i].parentNode);
		}
	}
}

doExpandAllImages();
