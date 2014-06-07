// ==UserScript==
// @name CAPSMADNESS
// @description LOL U WANT CAPS? HERE YOU HAVE CAPS
// @include http://www.kongregate.com/games/*/*
// ==/UserScript==

var a = document.createElement('script');
a.innerHTML = 'ChatDialogue.prototype.displayMessage = function (a, b, c, d){var e = this;this._holodeck.filterIncomingMessage(b, function(i){e.displayUnsanitizedMessage(a,i.toUpperCase(),c,d)})}';
document.body.appendChild(a);