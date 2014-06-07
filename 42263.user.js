// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           No new tab for fullview
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Change links to open the fullview-page of an image in same tab/window, instead of a new tab/window
// @include        http://www.pixiv.net/member_illust.php?mode=medium&*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

a = document.getElementsByTagName('img');

for (i = 0; i < a.length; i++) {
   if (a[i].parentNode.getAttribute('href')) {
      if ((a[i].parentNode.getAttribute('href').search(/mode=big/) != -1)||(a[i].parentNode.getAttribute('href').search(/mode=manga/) != -1)) {
         a[i].parentNode.setAttribute('target','');
      }
   }
}