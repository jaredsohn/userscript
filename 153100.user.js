// ==UserScript==
// @name         disparition on facebook
// @namespace     http://www.webmonkey.com
// @description   e disparait d facbook
// @namespace     http://www.webmonkey.com
// @include       /https?:\/\/(.*?\.)?.*(facebook).*/
// ==/UserScript==


window.addEventListener('keypress',function(e){
	if(e.charCode==101)
		e.preventDefault();
});