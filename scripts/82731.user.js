// ==UserScript==
// @name           xingbanger
// @namespace      http://userscripts.org/users/yalla
// @description    Removes the "invite contacts box" from Xing
// @include        https://www.xing.com/
// ==/UserScript==

var qi = document.getElementsByTagName('div');
// var qi = document.getElementsById('startpage-quickinvite');

if (qi) {
      for (i=0; i<qi.length; i++) {
            if (qi[i].id=='startpage-quickinvite')
                  qi[i].parentNode.removeChild(qi[i]);
      }
}