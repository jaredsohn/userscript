// ==UserScript==
// @name           fotocommunity nude pictures
// @namespace      http://www.fotocommunity.de/
// @description    shows nude pictures without registration
// @include        http://www.fotocommunity.com/*
// @include        http://www.fotocommunity.de/*
// @exclude        htto://www.fotocommunity.de/
// ==/UserScript==

images=document.getElementsByTagName("img");
for (i=0; i<images.length; i++) {
  var adresse=images[i].src;
  if (adresse.search(/thumbs/) != -1) {
    images[i].parentNode.href=images[i].src.replace("http://cdn.fotocommunity.com/thumbs/", "http://cdn.fotocommunity.com/photos/");
  } else {
    var position=adresse.search(/b\d{8}/);
    if (position != -1) {
      var zahl=adresse.slice(position+1, position+9);
      images[i].parentNode.href="http://cdn.fotocommunity.com/photos/"+zahl+".jpg";
    }
  }
}
				
