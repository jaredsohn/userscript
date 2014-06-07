// ==UserScript==
// @name           Webaholics Anonymous
// @namespace      http://esmilde.com
// @include        *echochamber.me*
// ==/UserScript==


// Create cover element, modify the style & id of it
var cover = document.createElement('div');
cover.style.position = 'fixed';
cover.style.top = cover.style.left = 0;
cover.style.height = cover.style.width = '100%';
cover.style.margin = '1em';
cover.style.backgroundColor = 'white';
cover.setAttribute('id', 'webaholics-anonymous-cover');
// The text in the middle:
cover.innerHTML = 'You will be able to access this page in 30 seconds...';
// Display it
document.getElementsByTagName('body')[0].appendChild(cover);
// Declare function to hide it in main window's scope
unsafeWindow.hideCover = function() {
   document.getElementById('webaholics-anonymous-cover').style.display = 'none';
};
// Start the timer
setTimeout("hideCover();", 30000);