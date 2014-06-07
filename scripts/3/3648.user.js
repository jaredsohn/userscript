// ==UserScript==
// @name          FlickrFavMagnifier
// @namespace     http://www.hiddenfault.net/
// @description   Shows small picture version when you "mouseover" a flickr favorite.
// @include       http://www.flickr.com/photos/*/favorites/*
// @include       http://flickr.com/photos/*/favorites/*
// ==/UserScript==

var thumbsBox = document.getElementById('favoriteThumbs');
var thumbsLinks = document.getElementById('favoriteThumbs').getElementsByTagName('a');
var thumbsImages = document.getElementById('favoriteThumbs').getElementsByTagName('img');
var altTemp = '';

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function modifyImgSrc(imgSrc) { return imgSrc.replace(/_s.jpg/, '_m.jpg'); }

function preloadSmallImages() {
  var imageArray = new Array();
  for (var i=0; i<thumbsImages.length; i++) {
    imageArray[i] = new Image();
    imageArray[i].src = modifyImgSrc(thumbsImages[i].getAttribute('src'));
  }
}

function createMagnifier() {
  if (thumbsBox) {
    var magnifier = document.createElement('div');
    magnifier.setAttribute('id', 'magnifier'); 
    magnifier.style.position = 'absolute';
    magnifier.style.border = '6px solid rgb(221, 221, 221)';
    magnifier.style.padding = '0px';
    magnifier.style.backgroundColor = 'rgb(221, 221, 221)';
    magnifier.style.display = 'none';
    thumbsBox.parentNode.insertBefore(magnifier, thumbsBox);
  }
  return true;
}

function clearLinkTitle() {
  for (var i=0; i<thumbsLinks.length; i++) {
    thumbsLinks[i].setAttribute('title', '');
  }
}

function showMagnifier(event) {
  var magnifier = document.getElementById('magnifier')
  if (magnifier) {
    var altTag = event.target.getAttribute('alt');
    addGlobalStyle('#magnifier > h5 {margin-top:0px !important; font-size:x-small !important}');
    addGlobalStyle('#magnifier {margin:0px; display:inline}');
    magnifier.innerHTML = '<h5>' + altTag + '</h5><img src="' + modifyImgSrc(event.target.getAttribute('src')); + '" border="0" />';
    magnifier.style.display = '';
    altTemp = altTag;
    event.target.setAttribute('alt', '');
    document.body.insertBefore(magnifier, document.body.firstChild);
  }
}

function moveMagnifier(event) {
  var sWidth = (window.innerWidth - event.pageX) - 20;
  var sHeight = (window.innerHeight - event.pageY) - 20;
  var magnifier = document.getElementById('magnifier');
  var magStyle = getComputedStyle(magnifier, '');
  if (magnifier) { 
    event.target.setAttribute('alt', altTemp);
    if (sWidth < parseInt(magStyle.width)) { magnifier.style.left = (event.pageX - parseInt(magStyle.width)) - 16; } 
    else { magnifier.style.left = event.pageX + 14; }
    if (sHeight < parseInt(magStyle.height)) { magnifier.style.top = (event.pageY - parseInt(magStyle.height)) - 7; }
    else { magnifier.style.top = event.pageY + 5; }
  }
}

function hideMagnifier(event) {
  var magnifier = document.getElementById('magnifier')
  if (magnifier) { magnifier.style.display = 'none'; }
}

function iterateThumbnails(event) {
  for (var i=0; i<thumbsImages.length; i++) {
    thumbsImages[i].addEventListener('mouseover', function(event) { showMagnifier(event); }, true);
    thumbsImages[i].addEventListener('mousemove', function(event) { moveMagnifier(event); }, true);
    thumbsImages[i].addEventListener('mouseout', function(event) { hideMagnifier(event); }, true);
  }
}

window.addEventListener('load', function(event) { 
  preloadSmallImages();
  if (createMagnifier()) { 
    clearLinkTitle();
    iterateThumbnails(event); 
  }
}, false);
