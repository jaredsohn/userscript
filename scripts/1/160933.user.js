// ==UserScript==
// @name           AutoLike
// @namespace      www.faceboo.com/fsmimp
// @description    Automatically likes any video.
// @include        http://youtube.com/watch?v=*
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==
var evt = document.createEvent ("HTMLEvents");

if (/BdoubleO100|cubehamster|docm77|EthosLab|FVDisco|GenerikB|hillstache|JL2579|nebris88|numberphile|red3yz|sethbling|Vechz|xisumavoid|Zisteau/i.test (document.body.innerHTML) ) {
	evt.initEvent ("click", true, true);
	document.getElementById("watch-like").dispatchEvent (evt);
	alert('Like!');
}
else {
	alert('Hello world!');
} 
    