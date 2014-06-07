// ==UserScript==
// @name           hidecomments
// @namespace      hidecomments
// @description    hide those stupid text comments on load
// @include        http://*youtube.*/watch?*
// ==/UserScript==
var node = document.getElementById('watch-comment-post-comment').parentNode;
var className = 'expanded';
node.className = node.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').replace(/^\s+/, '').replace(/\s+$/, '');
