// ==UserScript==
// @name          linkvz
// @namespace     http://fragp.com
// @description   provides the img-url on the single-photo-page of studivz/meinvz directly under the photo
// @include       htt*://*.*vz.net/*

// ==/UserScript==

var pc = document.getElementById('PhotoContainer');
if (typeof pc == 'undefined') {
  return;
}
var imglink = pc.getElementsByTagName('img')[0].src
if (typeof imglink == 'undefined') {
  return;
}

var div = document.createElement('div');
div.innerHTML = '<a href="' + imglink + '">' + imglink + '</a>';
pc.appendChild(div);
