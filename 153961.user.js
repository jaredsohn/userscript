// ==UserScript==
// @name         Amazon Country Changer
// @namespace    http://userscripts.org/users/475424
// @description  Allow to reach quickly the same item on the Amazon of the other European countries.
// @include      *.amazon.*/*
// @version      0.3
// @grant        none
// @updateURL    https://userscripts.org/scripts/source/153961.meta.js
// @downloadURL  https://userscripts.org/scripts/source/153961.user.js
// ==/UserScript==

var europe = [ '.co.uk', '.de', '.es', '.fr', '.it' ];
var ext = location.host.split('.');
ext = (ext.length == 4) ?
    '.' + ext[2] + '.' + ext[3] :
    '.' + ext[2];

if(~europe.indexOf(ext))
    europe.splice(europe.indexOf(ext), 1);

function getURLs() {
  var urls = [];
  for(var i = 0, length = europe.length; i < length; ++i)
    urls.push(location.protocol + '//www.' + location.host.split('.')[1] + europe[i] + location.pathname + location.search);
  return urls;
}

function addLink(url, text) {  
  var label = document.createElement('a');
  label.setAttribute('class', 'nav_a');
  label.setAttribute('href', url);
  label.innerHTML = text;
  
  document.getElementById('nav-cross-shop-links').appendChild(label);
}

var urls = getURLs();
for(var i = 0, length = urls.length; i < length; ++i)
  addLink(urls[i], '[Amazon' + europe[i] + ']');