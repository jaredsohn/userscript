There are 9 previous versions of this script.

// ==UserScript==
// @name Hide Google's Sidebar
// @namespace http://googlesystem.blogspot.com/
// @description Hides Google's left sidebar because it's ugly!.
// @include http://www.google.*/search?*
// @include http://www.google.*/webhp?*
// @include http://www.google.*/images?*
// @include http://www.google.*/imghp?*
// @include http://www.google.*/
// @include http://www.google.*/#*
// @version 0.3
// @date 2010-05-08
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