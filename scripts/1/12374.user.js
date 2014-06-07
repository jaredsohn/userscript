// ==UserScript==
// @name           bFAPILscript
// @namespace      http://lulz.net/
// @description    BLIND FurryArtPile Image Link script. Hijacks the FAP header on gallery index pages, replacing it with a list of direct links to fullsize images. Guesses links blindly, so may not be completely accurate.
// @include        http://www.furryartpile.com/user/*/gallery*
// @include        http://www.furryartpile.com/browse*
// ==/UserScript==

var images = document.images, imageURLs = new Array();
var artistName = window.location.href;
var viewingGallery = (artistName.indexOf("/gallery") > 0);
// If we're viewing a gallery page, we can get the artist's name from the URL
if (viewingGallery)
{
  artistName = artistName.substring(artistName.indexOf("user/") + 5, artistName.indexOf("/gallery"));
}

// loop through the images on the page, grabbing the thumbnails and turning them into direct links.
for (var i = 0; i < images.length; i++)
{
  // If the image URL has /thumbs in it, we can be sure it's a thumbnail.
  if (images[i].src.indexOf("/thumbs/") != -1)
  {
    // Isolate the part of the URL we want
    var url = images[i].src.replace(/.*\/thumbs\/(big|small)\//i, "");

    // Add the beginning of the full view URL
    url = "/works/" + url;

    // Next checks may depend on artist name. If we're in a gallery that's great, but
    // if not, we need to grab it from the image's alt text.
    if (!viewingGallery)
    {
      var tmp = images[i].alt.indexOf(" by ") + 5;
      artistName = images[i].alt.substring(tmp, images[i].alt.indexOf(" on ", tmp));
    }

    // In some cases, the thumbnail will be in the form <artistname><number> but the
    // fullview image will have the title of the submission in it. Simple fix: scan
    // the thumbnail's alt text for the title of the submission.
    var onlyNameNum = new RegExp("(" + artistName + ")([0-9]+\\....)$", "i");
    if (url.match(onlyNameNum) != null)
    {
      var title = images[i].alt.substring(0, images[i].alt.indexOf(" by "));
      // I tried to catch as many symbol translations as I could, but it would help
      // if the FAP people specified their naming convention somewhere...
      title = title.replace(/[ \.\?!\(\)\[\],:]|%20/g, "_");
      title = title.replace(/'/g, "__039_");
      url = url.replace(onlyNameNum, "$1_-_" + title + "_-_$2") + "?";
    }

    // Add the newfangled link to our list of URLs
    imageURLs.push(url);
  }
}

// Find the FAP header....
var header = document.getElementsByTagName("H1")[0];

// and hijack it, putting the link list in its place.
var ld = document.createElement("div");
ld.align = "left";
ld.innerHTML = "<h4>List of images thumbnailed on "+window.location+"</h4>";
for (var i = 0; i < imageURLs.length; i++) 
{
  ld.innerHTML += "<b>" + (i+1) + ":</b> <a href=\"" + imageURLs[i] + "\">" + imageURLs[i].substring(imageURLs[i].lastIndexOf("/") + 1, imageURLs[i].length) + "</a><br>";
}
ld.innerHTML += "</td></table>";

header.parentNode.replaceChild(ld, header);