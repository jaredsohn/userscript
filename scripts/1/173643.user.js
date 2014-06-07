// ==UserScript==
// @name        Redirect Photobucket HTML
// @namespace   com.tuggy.nathan
// @include     http://s909.photobucket.com/user/caffeineincluded/media/*.png.html
// @description Reloads image view pages on Photobucket to the direct image only
// @version     1.0.00
// @require     http://update.sizzlemctwizzle.com/173643.js
// ==/UserScript==

function redirect(count) {
  var img = document.getElementById("fullsizeMedia");
  if (img) {
    var src = img.src;
    window.location.assign(src);
  }
  else if (count < 10) {
    window.setTimeout(redirect, 500, count + 1);
  }
  else { window.location.reload(); }
}
redirect(0);
 