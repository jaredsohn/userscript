// ==UserScript==
// @name    iwiw image
// @description   Iwiwen felhasznalok kepehez linket rendel
// @namespace   http://ajnasz.hu/blog/20060622/greasemonkey-iwiw-pictures
// @include   http://www.iwiw.net/*
// @include   http://www.iwiw.hu/*
// @include   http://iwiw.net/*
// @include   http://iwiw.hu/*
// ==/UserScript==


var center = document.getElementById('center');
var elems = center.getElementsByTagName('td');
var containers = new Array();
for(var i=0; i<elems.length; i++) {
  if(elems[i].className == "image") {
    containers.push(elems[i]);
  }
}

for(var i=0; i<containers.length; i++) {
  var a = containers[i].getElementsByTagName('a')[0];
  var index = a.getAttribute('onclick').indexOf(',');
  var index2 = a.getAttribute('onclick').indexOf("'");
  a.href = a.getAttribute('onclick').substring(index2+1,index-1);
  a.removeAttribute('onclick');
}
