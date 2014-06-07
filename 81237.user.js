// ==UserScript==
// @name          flickr disable menu
// @version       0.0.1
// @include 	  http://www.flickr.com/photos/*
// ==/UserScript==
//alert("start plugin")
var stylesheets, all, element;
//
// this disables all externally linked stylesheets
//stylesheets = document.styleSheets;
//for (var i = 0; i < stylesheets.length; i++) {
	//alert([i,stylesheets[i].id])
    //if (stylesheets[i].id == 'zoom-trigger'){
		//stylesheets[i].disabled = true;
	//}
//}


all = document.getElementById('photo-drag-proxy');
all.setAttribute('class', '');
all.setAttribute('style', '');
//for (var i = 0; i < all.length; i++) {
	//alert([i,all[i].id])
    //element = all;
    //if (element.nodeName == 'STYLE') {
	// this removes <style> elements defined in the page <head>
	//element.parentNode.removeChild(element);
    //} else {
	// this removes per-element styles and a variety of deprecated attributes
	//element.setAttribute('style', 'display:none;');
	//element.setAttribute('size', '');
	//element.setAttribute('face', '');
	//element.setAttribute('color', '');
	//element.setAttribute('bgcolor', '');
	//element.setAttribute('background', '');
    //}
//}

//document.getElementById('photo-drag-proxy').style.display = "none";
//