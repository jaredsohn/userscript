// ==UserScript==
// @name           Append Link for coComment
// @namespace      http://www.kuribo.info/
// @description    Append Link for coComment
// @include        http://www.blogger.com/comment.g?blogID=*&postID=*&isPopup=true
// ==/UserScript==

(function() {
  var p = document.getElementsByTagName("p");
  for (var i = 0; i < p.length; i++) {
    if (p[i].className == 'buttons') {
      var a = document.createElement("a");
      a.href = 'javascript:var win = window.open(location.href.replace("&isPopup=true", ""), "_blank", "menubar=yes,toolbar=yes,directories=yes,location=yes")';
      a.innerHTML = "Normal Window";
      p[i].appendChild(a);
      break;
    }
  }
})();
