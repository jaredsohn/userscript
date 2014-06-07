// ==UserScript==
// @namespace     http://lulz.net
// @name          DAILscript
// @description   DeviantArt Image Link script. Hijacks the DA footer, using it to display a list of links to fullsize images on each gallery page. Sister to FAILscript (http://userscripts.org/scripts/show/11207)
// @include       http://*.deviantart.com/gallery/*
// ==/UserScript==

// If DAIL_useDoubleLinks == true, DAILscript will generate two links for each thumbnail in the user's gallery:
// one contains "/images/" after the host portion, one does not.
// This makes it easier for users to mass download DA galleries, since half the URLs will error, but (hopefully) the other half will download successfully
var DAIL_useDoubleLinks = false;

function refreshDSLinks()
{
 var images = document.images, imageURLs = new Array();
 // curfc keeps track of which "server" we're linking to - see below.
 var curfc = 0;

 // loop through the images on the page, grabbing the thumbnails and turning them into direct links.
 for (var i = 0; i < images.length; i++)
 {
    // Reference thumbnail URL: http://tn1-4.pv.deviantart.com/fs14/150/f/2007/002/e/1/North_Sky_by_hf_zilch.jpg
    // Reference fullview URL: http://fc03.deviantart.com/fs14/f/2007/002/e/1/North_Sky_by_hf_zilch.jpg

    // Weird cases...
    // thumb   http://tn1-5.pv.deviantart.com/150/images3.deviantart.com/i/2004/170/9/f/Kiddy_Pool.jpg
    // full    http://fc04.deviantart.com/images3/i/2004/170/9/f/Kiddy_Pool.jpg
    // 
    // thumb   http://tn1-2.pv.deviantart.com/150/i/2003/49/d/5/Happy_Girthday_Gyver.jpg
    // full    http://fc02.deviantart.com/images/i/2003/49/d/5/Happy_Girthday_Gyver.jpg
    // bad     http://fc04.deviantart.com/i/2003/49/d/5/Happy_Girthday_Gyver.jpg
    // -- I can't see a solution to this one...

    // If the image URL has tn#-#. at the beginning of its host portion, we can be sure it's a thumbnail.
    if (images[i].src.match(/http:\/\/tn[0-9]-[0-9]./) != null)
    {
      var url = images[i].src;

      // Remove the host portion of the URL (we're going to need to change it later, and tacking a new one on the beginning is
      // less demanding than running a replace())
      url = url.substring(url.indexOf(".deviantart.com/") + 15, url.length);

      // Remove the mysterious number (usually 150) from after the /fs##/ in the thumbnail URL
      // I became kind of irritated with trying to predict all the various places /150/ would appear, so now
      // I just have DAILscript remove the first /150/ it sees.
      // :cross fingers:
      url = url.replace("/150/", "/");

      // deal with things like /fs##.deviantart.com/ and /images#.deviantart.com/
      url = url.replace(/\/((fs|images)[0-9]+)\.deviantart.com/, "/$1");
  
      // Add the beginning of the full view URL
      // DeviantArt stores images on four different "servers": fc01.deviantart.com - fc04.deviantart.com
      // Apparently, it doesn't matter which one of these "servers" is chosen - all of them will yield the same image
      // Therefore, I'm going to distribute DAILscript's links among fc01-04. (Hopefully this helps DA somehow! :)
      curfc = (curfc + 1) % 4;
      url = "http://fc0" + (curfc + 1) + ".deviantart.com" + url;

      // Add the newfangled link to our list of URLs
      imageURLs.push(url);

      // Add the second link if we are using the "double link" method to guess the presence of /images/
      if (DAIL_useDoubleLinks == true)
      {
        imageURLs.push(url.replace(".deviantart.com/", ".deviantart.com/images/"));
      }
    }
  }
  
  // Find the DA footer....
  var ld = document.getElementById("depths-in");
  
  // and hijack it, putting the link list in its place.
  ld.innerHTML = "<h4>List of images thumbnailed on "+window.location+"</h4>";
  for (var i = 0; i < imageURLs.length; i++) 
  {
    ld.innerHTML += "<b>" + (i+1) + ":</b> <a href=\"" + imageURLs[i] + "\">" + imageURLs[i].substring(imageURLs[i].lastIndexOf("/") + 1, imageURLs[i].length) + "</a><br>";
  }
  ld.innerHTML += "</td></table>";
}


// Generate the initial link list. Unless the user changes the content of the gallery page in some way after page load,
// this should eliminate the need to click anything.
refreshDSLinks();


// Add the refreshLinks function to the document
var sdScript = document.createElement("script");
sdScript.type = "text/javascript";
sdScript.text = "var DAIL_useDoubleLinks = " + DAIL_useDoubleLinks + ";" + refreshDSLinks;
document.body.appendChild(sdScript);

// Make a button that calls refreshLinks() and put it in the DA browsebar
var browsebar = document.getElementById("browsebar1");
browsebar.innerHTML = "<b><a href=\"#\" onclick=\"refreshDSLinks();\">Refresh DAILscript Links</a></b>" + browsebar.innerHTML;