// ==UserScript==
// @name           farmville-hide progress bar
// @description    Just hide the stupid Farmville Progress bar and zynga ad at the top of the page in farmville.
// @namespace      dbarrows
// @include        http://apps.facebook.com/onthefarm*
// @include        https://apps.facebook.com/onthefarm*
// ==/UserScript==

var divs=document.getElementsByTagName('div')
for (var i=0;i<divs.length;i++){
  if (divs[i].id.search("progress_bar_wrapper") > 0) {
    divs[i].style.display="none";
    }
  }
var divs=document.getElementsByTagName('iframe')
for (var i=0;i<divs.length;i++){
  if (divs[i].src.search("zbar.zynga") > 0) {
    divs[i].style.display="none";
    }
  }