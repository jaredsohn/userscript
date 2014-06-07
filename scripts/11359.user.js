// ==UserScript==
// @name           Nudity Blocker
// @include        http://www.photo.net/photodb/photo?photo_id=*
// ==/UserScript==
if (document.getElementById("crumbs").innerHTML.match(/nude|nudity/i)) {
  divs = document.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++) if (divs[i].getAttribute("class") == "photo") divs[i].style.display = "none";
}