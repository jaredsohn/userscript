// ==UserScript==
// @name           Google+ Notifications in Page Title
// @description    Adds Google+ Notification Count in the page title, like Facebook/Twitter
// @version        1.0.0
// @homepage       http://userscripts.org/users/83500/scripts
// @include        http://plus.google.*
// @include        https://plus.google.*
// ==/UserScript==

var lastTitle = lastModTitle = document.title;
var gbi1 = document.getElementById("gbi1");

gbi1.addEventListener("DOMSubtreeModified", omgachange, false);

// gotta use a timer here, since i didnt find any event related to the history object, which is used by Google+ to change the page url without reloading it
setInterval(function(){
	if(lastModTitle != document.title){
		lastTitle = lastModTitle = document.title;
		omgachange();
	}
}, 10000);

function omgachange(){
	var count = gbi1.innerHTML;
	if(!isNaN(count-0)){
		if(count == 0) document.title = lastModTitle = lastTitle;
			else document.title = lastModTitle = '('+ count +') '+ lastTitle;
	}
}