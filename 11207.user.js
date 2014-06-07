// ==UserScript==
// @name           FAILscript
// @namespace      http://lulz.net/
// @description    FurAffinity Image Link script. Hijacks the FurAffinity header on gallery pages, replacing it with a list of links to full-size images. Written by BAWW with assistance from berleberly. Sister to DAILscript (http://userscripts.org/scripts/show/11435)
// @include        http://www.furaffinity.net/gallery/*
// @include        http://www.furaffinity.net/msg/submissions/*
// @include        http://www.furaffinity.net/scraps/*
// @include        http://www.furaffinity.net/favorites/*
// ==/UserScript==

var images = document.images, imageURLs = new Array();

// loop through the images on the page, grabbing the thumbnails and turning them into direct links.
for (var i = 0; i < images.length; i++)
{
  // If the image URL has /art/ in it, we can be sure it's a thumbnail.
  if (images[i].src.indexOf("/art/") != -1)
  {
    // We only care about the part of the URL after /art/,
    // since the server for fullsize images is always data.furaffinity.net
    var url = images[i].src.split("/art/")[1];
    // Remove "thumbnail." or "half." if they are present
    url = url.replace(/(thumbnail|half)\./i, "");
    // Get the artist name from the thumbnail URL (we'll need it later)
    var an = url.substring(0, url.indexOf('/'));
    // Get the image filename
    var imn = url.substring(url.lastIndexOf('/'), url.length);
    // convert the filename and artist name to lowercase, because the next comparison must be case insensitive.
    imn = imn.toLowerCase();
    an = an.toLowerCase();
    // If the image name doesn't have the artist's name in it, insert the artist name in the middle
    // between the timestamp and the title.
    if (imn.indexOf(an) == -1)
    {
      // Added a check to fix image names that looked like [timestamp].[artist]. and had no extension.
      // turns out sometimes I need to add the artist name to the URL, and sometimes I don't
      // THANKS FOR YOUR STRAIGHTFORWARD NAMING CONVENTIONS, FURAFFINITY :)
      if (url.split('.')[1] != "")
      {
        url = url.split('.');
        url[1] = an + '.' + url[1];
        url = url.join('.');
      }
    }
    // Add the beginning of the full view URL
    url = "http://d.furaffinity.net/art/" + url;
    // Remove double extensions. (Rather, anything that LOOKS like a double extension.)
    url = url.replace(/(\....)\..../, "$1");
    // Add the newfangled link to our list of URLs
    imageURLs.push(url);
  }
}

// Find the FA header....
var ld = document.getElementById("fa_header");
ld=ld.parentNode.parentNode;
// and hijack it, putting the link list in its place.
ld.innerHTML = "<h4>List of images thumbnailed on "+window.location+"</h4>";
for (var i = 0; i < imageURLs.length; i++) 
{
  ld.innerHTML += "<b>" + (i+1) + ":</b> <a href=\"" + imageURLs[i] + "\">" + imageURLs[i].substring(imageURLs[i].lastIndexOf("/") + 1, imageURLs[i].length) + "</a><br>";
}
ld.innerHTML += "</td></table>";
ld.id = "not_fa_header";