// ==UserScript==
// @namespace     http://geekmatters.com/greasemonkey/xkcd
// @name          XKCD Title Text
// @description   View the XKCD title text without having to hover the mouse. Appended after the image.
// @include      http://xkcd.com/*
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++)
{
  var title = images[i].title;
  if (title)
  {
    var cont = images[i].parentNode;
    var output = document.createElement("div");
    output.appendChild(document.createTextNode(title));
    output.style.border="1px solid black";
    output.style.backgroundColor="#7E8BA9";
    cont.insertBefore(output, images[i].nextSibling);
  }
}//.user.js