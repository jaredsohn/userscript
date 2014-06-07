// ==UserScript==
// @name Horizontal Cryptsy Chat Button
// @version    0.1
// @include https://*cryptsy.com*
// @description  Moves the Cryptsy Chat button so it is not in the way
// ==/UserScript==

(function () { this.style.removeProperty('left') ; this.style.position = 'fixed' ; this.style.top = '-3px' ; this.style.right = '35px' ; this.style.webkitTransform = 'rotate(90deg)' ;}).call(document.getElementsByClassName('handle')[0])