// ==UserScript==
// @name          Clien nick hider
// @namespace     http://
// @description   nick hiding
// @version       1.0
// @author        Peace
// @include       http://clien.net*
// @include       http://www.clien.net*
// ==/UserScript==

// remove right side nick
var uid = document.getElementsByClassName('uid');
console.debug(uid);

while(uid[0]){
	uid[0].parentNode.removeChild(uid[0]);	
}

// remove reply nick
var uid2 = document.getElementsByClassName('reply_write');
var uid3 = uid2[0].getElementsByClassName('user');
//var uid3 = uid2[0].getElementsByTagName('img');

while(uid3[0]){
	uid3[0].parentNode.removeChild(uid3[0]);	
}