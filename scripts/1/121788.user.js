// ==UserScript==
// @name          Facebook Notifications hide    
// @description	  hide pop up windows Facebook Notifications
// @author        Facescript
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @homepage      http://userscripts.org/scripts/show/121788
// @version       0.0.2
// @date          December 29th, 2011
// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .notifAggroAutoFlyout #fbNotificationsFlyout.enableBeeper {display: none;)');
