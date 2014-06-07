// ==UserScript==
// @name           Upper Refresh Bar 1.1
// @namespace      FTO
// @description    Adds a refresh bar to the top of the page.
// @include        http://www.faerytaleonline.com/main.php
// ==/UserScript==

var container = document.createElement("div");

container.style.position='absolute';

container.style.left='50%';
container.style.top='-2px'; // There was a little space at the top of the screen
container.style.marginLeft="-315px";

container.innerHTML='<input type="button" onclick="window.location=&quot;main.php&quot;;" class="btnrefresh" value="Refresh Page" style="width:630px;height:18px;-moz-border-radius:10px;-webkit-border-radius:10px;">'; // Copied directly from the other refresh button and some styles inlined to it. Dirty. I know. 

document.body.appendChild(container);