// ==UserScript==
// @name          DirectPics
// @namespace     http://www.userscripts.org
// @description   shows popups of images in-page
// @version       1.0
// @date          2010-11-15
// @include       *
// ==/UserScript==

var oStyle = document.createElement("style");
oStyle.setAttribute("type", "text/css");
var css = "a.autohover { float: left; color: orange; padding: 1px; }";
css += "a.autohover img.autohover { display: none; position: absolute; left: 1; max-width: 100%; z-index: 21; }";
css += "a.autohover:hover img.autohover { display: block; }";
css += "img.autohover { border: 2px dashed black; }"
oStyle.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(oStyle);

var links = document.getElementsByTagName("a");

for (i=0; i<links.length; i++) {
  var href = links[i].href
  if (href.match(/\.(jpg|jpeg|gif|png)$/) ||
      href.match(/imgur\.com\/[0-9a-zA-Z]*$/i)) {
    var oImg = document.createElement("img");
    if (null != href.match(/imgur\.com\/[0-9a-zA-Z]*$/i)) {
      href = href.replace("imgur", "i.imgur") + ".jpg";
    }
    oImg.setAttribute("src", href);
    oImg.setAttribute("class", "autohover");
    links[i].appendChild(oImg);
    links[i].setAttribute("class", "autohover");
  }
}

