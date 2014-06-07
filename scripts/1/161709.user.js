// ==UserScript==
// @name            Berbagi Klik
// @namespace       Berbagi Klik
// @author	        elBarkey
// @authorURL	    https://www.facebook.com
// @description     Auto klik khusus member "Berbagi Klik"
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include	        htt*://www.facebook.com/*
// @include         htt*://*.facebook.com/*/
// @include         htt*://*.keajaibanfacebook.com/*/*
// @include         htt*://keajaibanfacebook.com/*/*
// @version	        0.1
// ==/UserScript==

var url = document.URL;
if (url.indexOf('244796152323819') >= 0){
var myLinks = document.getElementById('fbDocument244796152323819').getElementsByTagName('a');
var sLinks = [];
for (j = 0; j < myLinks.length; j++) {
    var str = myLinks[j].toString();
    if (str.indexOf('l.php') >= 0 && str.indexOf('keajaibanfacebook') >= 0) {
        sLinks.push(myLinks[j]);
    }
}
var i = 0;
function myLoop() {
    setTimeout(function(){
        sLinks[i].click();
        i++;
        if (i < sLinks.length) {
            myLoop();
        }
    }, 4000);
}
myLoop();
}
else {
var l_button = document.getElementsByName('submit')[0];
var l_links = document.getElementsByTagName('a');
if (l_links.length <= 5){
l_button.click();
}
else {
setTimeout(function(){
window.close();},5000);
}
}