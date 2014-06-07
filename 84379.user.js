// ==UserScript==
// @name           CNN - Facebook posts nuke
// @namespace      bpk
// @description    Remove Facebook posts section on cnn.com homepage 
// @include        http://www.cnn.com
// @include        http://www.cnn.com/*
// ==/UserScript==

(function() {
var fbToggle = document.getElementById("pmFacebookToggle");
if (fbToggle) {
    fbToggle.parentNode.removeChild(fbToggle);
}
var fbPane = document.getElementById("pmFacebook");
if (fbPane) {
    fbPane.parentNode.removeChild(fbPane);
}
})();
