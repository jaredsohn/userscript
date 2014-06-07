// ==UserScript==
// @name           Youtube ZuneCaster box
// @namespace      http://www.zunecaster.co.cc/
// @description    adds a input that generates the ZuneCaster RSS URL
// @include        *youtube.*/watch?*
// ==/UserScript==
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
var url = document.location.href;
var embedbox = document.getElementById("watch-embed-div");
var customizer = document.createElement("div");
customizer.innerHTML = "<br><div id=\"watch-zc-div\"><form action=\"\" name=\"zcForm\" id=\"zcForm\"><label 

for=\"watch-zc-field\">ZuneCaster URL:</label><input id=\"watch-zc-field\" type=\"text\" name=\"video_link\" 

value=\"http://zunecaster.co.cc/rss.php?vidurl="+url+"\" onClick=\"this.select()\" readonly style=\"width:100%\"></form></div>";
insertAfter(customizer, embedbox);
