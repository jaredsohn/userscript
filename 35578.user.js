// ==UserScript==
// @name           CCHidePhotos
// @namespace      gerv.net/extensions
// @description    Make profile photos on christiancafe.com hidden by default, with a "Show Picture" link to show them. Discourages making snap judgements
//                 about people based on their appearance. :-)
// @include        http://www.christiancafe.com/
// ==/UserScript==

var imgs = document.getElementsByTagName("img");

for (var i = 0; i < imgs.length; i++) {
  var img = imgs[i];
  if (img.src.match("image.christiancafe.com/servlet/MkImage")) {
    img.setAttribute("id", "image" + i);
    img.setAttribute("style", "visibility: hidden;");
    
    var a = document.createElement("a");
    a.setAttribute("style", "font-size: small; color: blue; text-decoration: underline; display: block");
    a.setAttribute("onclick", "document.getElementById('image" + i + "').removeAttribute('style')");
    a.innerHTML = "Show&nbsp;Picture";
    
    var up = img.parentNode;
    if (up.nodeName == "A") {
      up = up.parentNode;
    }
    
    up.insertBefore(a, up.firstChild);
  }
}

