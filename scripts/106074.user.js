// ==UserScript==
// @name           Keep google services in one tab
// @version        1.2
// @namespace      http://www.jfbonham.com
// @description    Stops all the google services in the dark bar opening in new tabs. By http://www.jfbonham.com.
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @include        https://mail.google.*/*
// ==/UserScript==
function fixGoogleTargets(){
    var baritems = document.getElementsByClassName('gbzt');
	for (var i = 0; i < baritems.length; i++) {
        baritems[i].setAttribute("target","_top");
	}
    if(baritems.length > 0) {
        var doneFixes = true;
    }
}

doneFixes = false;

if(doneFixes == false) {
    setTimeout(fixGoogleTargets,1000);
}