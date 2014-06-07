// ==UserScript==
// @name           OpenPerved
// @namespace      Zenn
// @include        http://kitty-kats.com/forumdisplay.php?f=15
// ==/UserScript==
var domLoaded = function(callback){
	document.addEventListener('DOMContentLoaded', callback, false);
};
domLoaded(function(){
	var a = document.getElementsByTagName("a");
	var count = 0;
	for(var i = 0; i < a.length; i++){
		if(a[i].id.match("thread_title_")){
			var _open = function(href){
				window.open(href);
			}
			setTimeout(_open, count*45000, a[i].href);
			count++;
		}
	}
});