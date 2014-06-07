// ==UserScript==
// @name           tumblr replace permalink
// @revision       5
// @author         KID a.k.a. blueberrystream
// @description    Tumblrのpermalinkの位置を変更します。
// @namespace      http://kid0725.usamimi.info
// @include        http*://www.tumblr.com/dashboard*
// @include        http*://www.tumblr.com/tumblelog*
// ==/UserScript==

void(function() {
/* 定数定義 */
var CLASS_NAME = "permalink";

var lastLength = 0;

var REPLACE = function() {
  var elements = document.getElementsByClassName(CLASS_NAME);
  if (elements.length == lastLength) {
    return;
  }

  for (var i = lastLength; i < elements.length; i++, lastLength++) {
    elements[i].innerHTML = "Permalink";
    elements[i].target = "_blank";

    elements[i].style.fontSize = "x-small";
    elements[i].style.color = "#999999";
    elements[i].style.textDecoration = "none";
    elements[i].style.backgroundColor = "transparent";
    elements[i].style.backgroundImage = "none";
    elements[i].style.top = "auto";
    elements[i].style.bottom = "10px";
    elements[i].style.right = "15px";
    elements[i].style.width = "auto";
  }
}
setInterval(REPLACE, 1000);

})();