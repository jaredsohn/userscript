// ==UserScript==
// @name           Remove TeamCity Run
// @namespace      http://userscripts.org/users/231678
// @include        https://teamcity.quartalfs.com/*
// ==/UserScript==
    
var inputs = document.querySelectorAll("span.buttonWrapper input");
var imgs = document.querySelectorAll("span.buttonWrapper img");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('value', 'Custom build');
    inputs[i].setAttribute('onclick', imgs[i].getAttribute('onclick'));
    inputs[i].setAttribute('title', 'Run custom build');
    inputs[i].style.width = 'auto';
    imgs[i].parentNode.removeChild(imgs[i]);
}