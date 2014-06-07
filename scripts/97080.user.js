// ==UserScript==
// @name          Google Images
// @description   Fix google images.
// @include       http://*.google.tld/imgres?*imgurl=*
// ==/UserScript==

document.body.style.display = "none";
var newLoc = decodeURIComponent(window.location.href.match(/imgurl=[^&]*/)[0].slice(7));
window.location.replace(newLoc);
