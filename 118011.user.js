// ==UserScript==
// @name         X
// @version      1.0
// @description  Special occasion
// @author       x
// @namespace    http://userscripts.org/scripts/show/118011
// @updateURL    http://userscripts.org/scripts/source/118011.user.js
// @website      http://127.0.0.1
// @include	http://*.the-west.*/game.php*
// ==/UserScript==

TWDBQIx_inject = function(){
	if(document.getElementById('TWDBQIx_js')) return;
	var TWDBQIxjs = document.createElement('script');
	TWDBQIxjs.setAttribute('type', 'text/javascript');
	TWDBQIxjs.setAttribute('language', 'javascript'); 
	TWDBQIxjs.setAttribute('id', 'TWDBQIx_js');
	TWDBQIxjs.innerHTML = "("+(function(){

/* injected script starts */
/**************************/

var d=new Date();
var time=d.getHours();

if (d.toLocaleDateString() == 'Thursday, November 17, 2011') {
	alert("Happy birthday, honey!!!");
	alert("Scroll all the way down please");
	AjaxWindow.show('profile',{char_id:248086},'248086');
}

/**************************/
/*  injected script ends  */

	}).toString()+")();";
	document.getElementsByTagName('body')[0].appendChild(TWDBQIxjs);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1) TWDBQIx_inject();