// ==UserScript==
// @name       Phisher Buster
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.3
// @description  Let's get em!
// @match      http://*/*
// @match      https://*/*
// @copyright  2014+, {FM} [Linux] PIKACHU
// ==/UserScript==

var steamregex = /(https?:\/\/|\/\/|[a-z0-9]\.)(steamcommunity|steampowered)\.com/;

function randChar() {
    var c = Math.floor(Math.random()*3);
	var a = c == 0 ? Math.random()*26+65 : c == 1 ?Math.random()*26+97 : Math.random()*10+48;
	return String.fromCharCode(Math.floor(a));
}


function uploadStuff() {
    if(document.getElementById('auth_details_entercode').style.display == "none") {
        setTimeout(uploadStuff, 10);
        return;
    }
    if(document.getElementsByName('filename')[0]) {
    	document.getElementsByName('filename')[0].type="input";
    	for(i=0;i<2048;i++) document.getElementsByName('filename')[0].value+=String.fromCharCode(Math.floor(Math.random()*256));
    } else {
    	document.getElementsByName('file')[0].type="input";
    	for(i=0;i<2048;i++) document.getElementsByName('file')[0].value+=String.fromCharCode(Math.floor(Math.random()*256));
    }
    document.getElementsByTagName('input')[document.getElementsByTagName('input').length-1].click();
}

function goGetEm() {
    for(i=0;i<Math.max(Math.random()*32,8); i++) document.getElementById('steamAccountName').value+=randChar();
    for(i=0;i<Math.max(Math.random()*32,8); i++) document.getElementById('steamPassword').value+=randChar();
    document.getElementById('SteamLogin').click();
    uploadStuff();
}

if(!document.location.href.match(steamregex) && document.getElementById('steamAccountName') && document.getElementById('steamPassword') && (document.getElementsByName('filename')[0] || document.getElementsByName('file')[0])) {
    goGetEm();
}