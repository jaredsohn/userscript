// ==UserScript==
// @name        MediaFreak
// @namespace   mediafreakcity.com
// @description MediaFreak show direct cover and screen shot
// @include     *mediafreakcity.com/*
// @version     2
// ==/UserScript==

var links = document.getElementsByTagName('img');
for (var i = 0; i < links.length; i++) {
//	GM_log('Element Name: ' + links[i].nodeName);
//	GM_log('Element Value: ' + links[i].nodeValue);

	var e_src = links[i].getAttribute('src');
	if (e_src.match(/http.*(jacket_images|product_images).*jpg/)) {
//		GM_log('Element src ==========================: ' + e_src);
		var scrshot = e_src.replace(/(http.*)(jacket_images|product_images)(.*jpg)/,'$1screen_shot$3');
		var cover = e_src.replace(/(http.*)(jacket_images|product_images)(.*jpg)/,'$1bigcover$3');
		var e_parent = links[i].parentNode.parentNode;
//		GM_log('inner html = ' + e_parent.innerHTML);
    aElement = document.createElement('a');
    aElement.setAttribute('href', scrshot);
    aElement.setAttribute('class', 'button-links');
    aElement.innerHTML = 'Screen&nbsp;shot<br>';
    bElement = document.createElement('a');
    bElement.setAttribute('href', cover);
    bElement.setAttribute('class', 'button-links');
    bElement.innerHTML = 'Big&nbsp;cover ';
    e_parent.parentNode.insertBefore(aElement, e_parent.nextSibling);		
    e_parent.parentNode.insertBefore(bElement, e_parent.nextSibling);		
//    GM_log('inner parent' + e_parent.parentNode.innerHTML);
	}
}