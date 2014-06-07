// ==UserScript==
// @name           Flickr Direct Image Link
// @include        *flickr*photos*
// @version                1.2
// ==/UserScript==
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
return true;
}
var newLabel = document.createElement("a");
newLabel.innerHTML = "<a href='"+document.getElementById("photo").childNodes[2].childNodes[1].getAttribute("src")+"' class='Butt ywa-track rapidnofollow'>Download</a>"
insertAfter(newLabel,document.getElementById("button-bar-fave"));