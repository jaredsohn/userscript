// ==UserScript==
// @name           Flickr Favs
// @namespace      mea
// @description    Expands Flickr Favorites
// @include        http://www.flickr.com/photos/*/favorites/*
// @match          http://www.flickr.com/photos/*/favorites/*
// @version        2.0
// ==/UserScript==

var faves = document.getElementById('faves-right');
if (faves) {
  // Replace links with pages:
  var html = faves.innerHTML;
  var reg = /\<a href=\"([^\"]*)\"\>(his|her|their) favorites\<\/a\> (.*)? ago/gi;
  var newhtml = html.replace(reg, "$2 favorites $3 ago:<br><iframe src=\"$1\" style=\"width:100%;height:600px\"></iframe>");
  faves.innerHTML = newhtml;
  faves.style.cssFloat = "left";
  faves.style.width = "100%";
  faves.style.minWidth = "1000px;";
  // Reposition the favorites box:
  var mainDiv = document.getElementById('main');
  var container = document.createElement('div');
  container.style = "margin:0;padding:0;clear:both";
  container.appendChild(faves);
  mainDiv.appendChild(container);
}
