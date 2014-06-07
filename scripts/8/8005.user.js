// ==UserScript==
// @name          Comic Art Community Gallery - Image Relinker
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.comicartcommunity.com/gallery/*
// @include       http://comicartcommunity.com/gallery/*
// @description	  Convert links at thumbnails to the original image links
// ==/UserScript==

var xpath = "//tr[starts-with(@class, 'imagerow')]" +
            "//a[@href]/img[contains(@src, 'data/thumbnails')]";

var thumbs = document.evaluate(xpath, document, null, 6, null);

if (!thumbs.snapshotLength) return;

var img, link, imgTitle, pageLink;
for (var i = 0; i < thumbs.snapshotLength; i++) {
  img = thumbs.snapshotItem(i);
  link = img.parentNode;
  imgTitle = link.nextSibling.nextSibling.nextSibling;
  pageLink = document.createElement("a");
  pageLink.href = link.href;
  pageLink.appendChild(imgTitle.firstChild);
  imgTitle.appendChild(pageLink);
  link.href = img.src.replace(/thumbnails/, "media");
}

