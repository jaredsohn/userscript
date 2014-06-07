// me2DAY profile image preview
// version 0.1
// 2008-09-18
// Copyright (c) 2008, Seungwon Jeong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          me2DAY profile image preview
// @namespace     http://jeongsw.textcube.com/
// @description   preview me2DAY profile image
// @include       http://me2day.net/*
// ==/UserScript==

// Inspired by http://steelheart.kr/tc/143

// Profile Image
var image = document.createElement('IMG');
image.width = '77';
image.height = '77';
image.style.position = 'absolute';
image.style.display = 'none';
document.body.appendChild(image);

var imageOffset = 15;

// mouseover event handler
function showImage(event) {
  var id;

  if (event.target.tagName !== 'A') {
    return;
  }

  id = event.target.href.substr('http://me2day.net/'.length);

  if (id && /^[\-0-9a-z_]{3,12}$/.test(id)) {
    image.src = 'http://me2day.net/images/user/' + id + '/profile.png';
    image.style.left = (event.pageX + imageOffset) + 'px';
    image.style.top = (event.pageY + imageOffset) + 'px';
    image.style.display = 'inline';
  }
}

// mousemove event handler
function moveImage(event) {
  if (image.style.display === 'none') {
    return;
  }

  image.style.left = (event.pageX + imageOffset) + 'px';
  image.style.top = (event.pageY + imageOffset) + 'px';
}

// mouseout event handler
function hideImage(event) {
  if (image.style.display === 'none' || event.target.tagName !== 'A') {
    return;
  }

  image.style.display = 'none';
}

var i;
var div, divs;
var link, links;

// Comment Author
divs = document.evaluate("//div[@class='entry_comment']",
			 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < divs.snapshotLength; ++i) {
  div = divs.snapshotItem(i);

  div.addEventListener('mouseover', showImage, false);
  div.addEventListener('mousemove', moveImage, false);
  div.addEventListener('mouseout', hideImage, false);
}

// Comments To Me, Comments By Me
links = document.evaluate("//ul[@class='your_metoo']/li/a[1]",
			  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < links.snapshotLength; ++i) {
  link = links.snapshotItem(i);

  link.addEventListener('mouseover', showImage, false);
  link.addEventListener('mousemove', moveImage, false);
  link.addEventListener('mouseout', hideImage, false);
}

// Nick Name
links = document.evaluate("//span[@class='crumb nick']/a",
			  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < links.snapshotLength; ++i) {
  link = links.snapshotItem(i);

  link.addEventListener('mouseover', showImage, false);
  link.addEventListener('mousemove', moveImage, false);
  link.addEventListener('mouseout', hideImage, false);
}
