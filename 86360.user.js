// ==UserScript==
// @name           myfigurecollection_preview_images
// @namespace      http://kebrantador.blogspot.com/
// @include        http://myfigurecollection.net/*
// @version       0.1
// @description	Add button to show larger images (the ones on the detail page)  on the listing pages.
// ==/UserScript==

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root || doc, null, null, null),
		result = [];
	while (next = got.iterateNext())
		result.push(next);
	return result;
}

function bigImages() {
	if(window.location.href.indexOf('top.php') > 0) {
		bigImagesTop();
	} else {
		bigImagesCollection();
	}
}
function bigImagesTop() {
	var imgs = $x("//img");
	imgs.forEach(function(img){
		if(img.src.indexOf('pics/figure') > 0) {
			img.src = img.src.replace(/figure\/32x32/gi,'figure/big');
		}
	});
}

function bigImagesCollection() {
	$x("//div[@id='content']")[0].id="";

	var pageLinks = $x("//div[@class='db_icons']/a");
	pageLinks.forEach(function(e){
		e.className = '';
		var img = e.childNodes[0];
		img.removeAttribute('height');
		img.removeAttribute('width');
		img.src = img.src.replace(/figure\//gi,'figure/big/');
	});
	
}

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
 var buttonElems = $x("//ul[@id='more']")[0];
 buttonElems.innerHTML = buttonElems.innerHTML + '<li><input type="button" id="greasemonkeyButton" value="VIEW BIG IMAGES"/></li>';
addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',bigImages,true);
}
