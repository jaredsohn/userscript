// ==UserScript==
// @name Hide Google Sidebar
// @namespace http://googlesystem.blogspot.com/
// @description Hides Google's left sidebar.
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
// @version 0.41
// @date 2010-07-11
// @license MIT License
// ==/UserScript==

(function () {   
    var code = "#sfcnt {margin-left:10px;} #leftnav {display:none;} #center_col {margin-left:10px; margin-top:10px; border:0px;}";
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