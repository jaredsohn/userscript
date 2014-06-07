// ==UserScript==
// @name           YouTubeBlocker
// @namespace      tag:OlafTheTroll@suicidegirls.com,2008-03-21
// @description    Replaces embedded YouTube videos by links.
// @include        http://*
// ==/UserScript==

window.addEventListener("load", function(e) {
  var objects = document.getElementsByTagName('object')
  var replacements = []

  for (var i = 0; i < objects.length; ++i) {
    var obj = objects[i];
    var embedded = obj.getElementsByTagName('embed');
    for (var j = 0; j < embedded.length; ++j) {
      var elm = embedded[j];
      var m = elm.src.match(/^http:\/\/www\.youtube\.com\/v\/([-_a-zA-Z0-9]+)/)
      if (m) {
        var par = document.createElement("p");
        var link = document.createElement("a");
        link.href = "http://www.youtube.com/watch?v=" + m[1]
        link.target = "_blank"
        var text = document.createTextNode(elm.src);
        par.appendChild(link);
        link.appendChild(text);
        par.style.padding = "2px;";
        par.style.background = "#666;";
        par.style.border ="2px solid black;";
        par.style.textAlign = "center";
        link.style.color = "white;";

	replacements.push([obj, par])
      }
    }
  }

  for (var k = 0; k < replacements.length; ++k) {
    obj = replacements[k][0];
    rep = replacements[k][1];
    obj.parentNode.replaceChild(rep, obj);
  }
}, false);
