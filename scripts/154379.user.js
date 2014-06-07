// ==UserScript==
// @name        youtube.com : action buttons below action panel
// @namespace   tukkek
// @include     http*://www.youtube.com/watch?*
// @version     1
// ==/UserScript==
var buttons=document.getElementById('watch7-action-buttons');
var parent=buttons.parentNode;
parent.removeChild(buttons);
parent.appendChild(buttons);