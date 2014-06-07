// ==UserScript==
// @name           Show the applet when running theSkyNet
// @description    Show the applet when running theSkyNet
// @include        http://www.theskynet.org/run*
// ==/UserScript==

var iframe = document.getElementsByTagName("iframe")[0];
iframe.style.width='640px';
iframe.style.height='480px';
