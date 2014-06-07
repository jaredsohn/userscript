// ==UserScript==
// @name           Hide Reply
// @namespace      kupaka AKA Sheng Long
// @description    Places a link to show/hide the reply field.
// @include        http://boards.4chan.org/*
// @version        .0000001
// @copyright      2010 Arc Reactor
// @license        What's a license?
// ==/UserScript==

(function () {

//main
var postarea, newElement;
navtop = document.getElementById('navtop');
postarea = document.getElementsByClassName('postarea');
show = function(){
	postarea.style.display='inline'
	newElement.href ='javascript:hide();'
}
hide = function(){
	postarea.style.display ='none';
	newElement.href ='javascript:hide();';
}
if (postarea) {
	newElement = '[»]';
	postarea.innerHTML +=" "+newElement;
	
	hide();
}

})();
