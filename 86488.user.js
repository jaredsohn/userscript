// ==UserScript==
// @name Hide Google Ads
// @namespace http://www.nedfinity.com
// @description Removes Google ads from top and right column.
// @include http://www.google.*/search?*
// @include http://www.google.*/webhp?*
// @include http://www.google.*/images?*
// @include http://www.google.*/imghp?*
// @include http://www.google.*/
// @include http://www.google.*/#*
// @include https://www.google.*/search?*
// @include https://www.google.*/webhp?*
// @include https://encrypted.google.*/search?*
// @include https://www.google.*/
// @include https://www.google.*/#*
// @version 0.04
// @date 2010-02-08
// @license MIT License
// ==/UserScript==

// quick inline style
document.getElementById('rhs').style.display = "none";
document.getElementById('tads').style.display = "none";

// add stylesheet 
(function () {   
    var code = "#rhs_block, #tads {display:none !important; visibility:hidden !important;} .s {max-width:none !important;} #center_col {margin-right:200px !important;}";
    if (typeof GM_addStyle=='function') {
        GM_addStyle(code);
    } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = code;
      var head = document.getElementsByTagName('head')[0];
      if (head) {
         head.appendChild(style);
      }
    }
})();