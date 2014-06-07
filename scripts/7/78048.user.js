// ==UserScript==
// @name          Light Avril Images Viewer
// @namespace     http://avril-images.net
// @description   Remove ad and banners of Avril Images Coppermine Gallery
// @include       http://avril-images.net/displayimage.php*
// @run-at document-end
// ==/UserScript==

(function () {
  
function getElementsByClass(node,searchClass,tag) {
var classElements = new Array();
var els = node.getElementsByTagName(tag); 
var elsLen = els.length;
var pattern = new RegExp("\\b"+searchClass+"\\b");
for (i = 0, j = 0; i < elsLen; i++) {
 if ( pattern.test(els[i].className) ) {
 classElements[j] = els[i];
 j++;
 }
}
return classElements;
}

	
var el = getElementsByClass(document,'maintable','*');

el[1].setAttribute("class", "");
el[2].setAttribute("class", "");

document.body.innerHTML = '<center>'+el[1].innerHTML+el[2].innerHTML+'</center>';

$(document.body).keyup(function(e) {
var pid = parseInt(js_vars['picture_id']);
  if (e.which == 37) {
      window.location="http://avril-images.net/displayimage.php?album=lastup&pid="+(pid+1)
  }
  else if (e.which == 39) {
      window.location="http://avril-images.net/displayimage.php?album=lastup&pid="+(pid-1)
  }
});

})();