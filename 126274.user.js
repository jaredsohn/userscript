// ==UserScript==
// @name           Facebook - Stop header bar from scrolling with page
// @namespace      http://userscripts.org/users/436255
// @description    Stops the Facebook 'BlueBar' from following you down the page (disabled on "Full conversation" pages, as it breaks scrolling) 
// @version        1.1
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @exclude        http://www.facebook.com/messages/*
// @exclude        https://www.facebook.com/messages/*
// ==/UserScript==

// v1.1 exclude all messages pages

document.getElementById('blueBar').setAttribute('style', 'position:relative !important');