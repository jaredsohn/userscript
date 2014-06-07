// ==UserScript==
// @name           Flickr — Display Short URL
// @namespace      http://userscripts.org/users/115242
// @description    Displays flic.kr short URL on a photo page if link is present
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// @version        1.1
// @copyright      2009, Scott Johnson (http://scottj.info/)
// ==/UserScript==

var rev = document.querySelector("link[rev='canonical']");
if (rev) {
  var newDiv = document.createElement('div');
  newDiv.id = 'short_url';
  newDiv.innerHTML = '<h4>Short URL</h4>' + rev.href;
  var sib = document.getElementsByClassName('PeopleTagList')[0];
  sib.parentNode.insertBefore(newDiv,sib);
  newDiv.addEventListener('click',selectLink,false);
}

function selectLink () {
  var p=document.getElementById("short_url");
  var el=p.childNodes[1];
  var s=window.getSelection();
  var r=document.createRange();
  r.selectNodeContents(el);
  s.removeAllRanges();
  s.addRange(r);
}
