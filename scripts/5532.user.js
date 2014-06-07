// ==UserScript==
// @name          PetFinder Corrector
// @namespace     http://youngpup.net/userscripts
// @description   Site-specific extension of PetFinder
// @include       http://petfinder.com/*
// @include       http://www.petfinder.com/*
// @include       http://search.petfinder.com/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { text-align: left; } div { margin-left: 0; text-align: left; } table { margin-left: 0; } a.hoverbox { cursor: pointer; display: inline; position: relative; } a.hoverbox img.preview { cursor: pointer; height: 50px; } a.hoverbox img.zoom { display: none; } a.hoverbox:hover img.zoom { display: block; position: absolute; left: 25px; top: 25px; z-index: 1; }');

// Replace annoying onclick links with HTML links, so you can open
// pet profile pages in a new window
var links = document.getElementsByTagName("a");
for (var i=0; i < links.length; i++) {
  var oc = links[i].getAttribute('onclick');
  if (oc) {
    var ms = oc.match(/return petNoteJs\((.*?)\)\;/);
    if (ms) {
      links[i].href = '/petnote/displaypet.cgi?petid=' + ms[1];
      links[i].setAttribute('onclick','');
      links[i].setAttribute('class','hoverbox');
      
      // Replace tiny, low-res thumbnails with medium-resolution
      // images that scale to full-size on hover
      var imgs = links[i].getElementsByTagName("img");
      for (var j=0; j < imgs.length; j++) {
        var src = imgs[j].getAttribute('src');
        if (src) {
          rExp = /\-t\.jpg/gi;
          var ms = src.match(rExp);
          if (ms) {
            results = src.replace(rExp, "-pn.jpg");
            imgs[j].setAttribute('src', results);
            imgs[j].setAttribute('class', 'preview');
            
            results = src.replace(rExp, "-x.jpg");
            imgzoom = document.createElement('img');
            imgzoom.setAttribute('src', results);
            imgzoom.setAttribute('class', 'zoom');
            links[i].appendChild(imgzoom);
          }
        }
      }
    }
  }
}

