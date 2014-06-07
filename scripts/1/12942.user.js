// ==UserScript==

// @name           SmugMug: Zoom Thumb 1x1

// @namespace      nimai

// @description    Sets the ratio to "1 x 1" when the zoom-thumb tool is used.

// @include        http://nimai.smugmug.com/photos/tools.mg?ImageID=*&Type=Album&tool=newthumb

// ==/UserScript==
window.setTimeout( "document.getElementsByName('ratio')[0].options[3].selected='selected'; changeRatio('1,1');", 1000 );
