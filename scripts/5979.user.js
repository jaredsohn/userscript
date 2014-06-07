// ==UserScript==
// @name          FlickrBigLinkr
// @description   Adds to Flickr photo page direct links to big and original images.
// @version       0.0.1
// @author        for_ptiz@mail.ru
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// ==/UserScript==

function createLink( imgSrc, text ) {

  a = document.createElement('A');
  linktxt = document.createTextNode( text );
  a.href = imgSrc;
  a.appendChild( linktxt )
  
  return a;
}

function getImageName() {

  var list = document.getElementsByTagName('img');
  for (var i = 0; i < list.length; i++) {
      var img = list[i];
      var href = img.getAttribute('src');
      // only images
      if (href.match(/static\.flickr\.com.+[0-9]+_[0-9a-f]{10}\.jpg\?v=0/)) {
          return href.replace(/\.jpg\?v=0/, '.jpg');
      }
  }  
  
  return "";
}

function decorate( img, decor) {
  return img.replace(/\.jpg/, decor + '.jpg');
}
 
var img = getImageName();    
var divs = document.getElementsByTagName('div');

for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    if (div.className == 'photoImgDiv') {
    
      var linkBar = document.createElement('div')
      linkBar.style.margin = "15px 15px 0 0";
      linkBar.appendChild( createLink( decorate(img, "_b"), "Big image" ) );
      linkBar.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
      linkBar.appendChild( createLink( decorate(img, "_o"), "Original image" ) );
      
      div.parentNode.insertBefore( linkBar, div.nextSibling );
    
      return;
    }
}



