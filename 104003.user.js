// ==UserScript==
// @name          Google images-src replace
// @namespace     MVGM_soft (at) yahoo.com
// @author        MVGM (Mohammad Ali Varasteh)
// @version       0.0.2 (beta)
// @description	  replace blocked images src in google images search with unblock links
// @include       *.google.*/search*tbm=isch*
// @include       *images.google.*
// @exclude       
// ==/UserScript==



var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/^http:\/\/t1.gstatic.com\/(.*)/)) {
		image_element.src = image_element.src.replace("t1.gstatic.com","t2.gstatic.com");
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/t3.gstatic.com\/(.*)/)) {
		image_element.src = image_element.src.replace("t3.gstatic.com","t2.gstatic.com");
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/t0.gstatic.com\/(.*)/)) {
		image_element.src = image_element.src.replace("t0.gstatic.com","t2.gstatic.com");
	}
}
