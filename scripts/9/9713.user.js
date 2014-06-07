// Flickr Blog This Code user script
// Copyright (c) 2007-2008, Simon Greig
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// Version 3.3 - 19 February 2008
// Added new @include as Flickr seems to have changed their urls.
// Moved the telltail font styles around a bit to try to stop blogger 
// losing the ".7em" when pasting.
//
// Version 3.2 - 26 January 2008
// Tidied up the code as it looked awful
// after pasting from Mac OS added in 
// loads of whitespace!
//
// Version 3.1 - 23 January 2008
// Fixed bug with photo link.
// Version 3 - 23 January 2008
// Total rewrite that now works with any photo with the 
// "all sizes" button rather than just your own photos
//
// Version 2 - 21 January 2008
// Fixed a bug that flickr.com URLs (as opposed to www.flickr.com)
// don't work
// Fixed a bug in that the URL in the photo title was hard coded 
// to one of my Flickr pictures.
// Added a telltale "(?)" to link back to the userscripts URL
//
// Version 1 - 7 June 2007
// First version
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Flickr Blog This Size
// @namespace      http://xrrr-slog.blogspot.com/
// @description    Generates the same code for the current picture as the "blog this" button.  Handy for linking to multiple pictures or different sized pictures in your blog.
// @include        http://*flickr.com/photo_zoom.gne*
// @include        http://*flickr.com/photos/*/*/sizes/*
// ==/UserScript==



console.log ("Flickr Blog This Script Enabled");

// These are the data elements to extract from the page
var photoPageLink, imgTitle, userLink, userID, imageLink ;

var insertLoc, myPage ;


// Find the Image Title
var title = document.getElementsByTagName("title");
imgTitle = title[0].text.substring(title[0].text.indexOf(':')+2, title[0].text.length);


// Find the photo ID & user ID
var divs = document.getElementsByTagName('div');
for ( var i = 0; (i<divs.length); i++) {

   // Get the user and photo links
   if (divs[i].className == "Bucket") {
      var links = divs[i].getElementsByTagName ("a");
      var link = links[0].attributes.getNamedItem("href").nodeValue;
      var eles = link.split("/");
      userLink = "http://www.flickr.com/photos/"+eles[2]+"/";
      photoPageLink = userLink + eles[3] + "/";
   }


   // Get the user name and swap "You" for "Me"
   // If this is your own page
   if (divs[i].className == "Owner") {

      var links = divs[i].getElementsByTagName ("a");
      userID = links[2].text;

      if (userID == "You" ) {
         userID = "Me";
      }
   }


   // Find the location to insert the new text area.
   if (divs[i].className == "ThinBucket") {

      var ps = divs[i].getElementsByTagName ('p');
      insertLoc = ps[ps.length-1];
   }

   // Find the link to the image.
   if (divs[i].className == "DownloadThis" ) {
      var imgs = divs[i].getElementsByTagName('img');
      imageLink = imgs[1].attributes.getNamedItem("src").nodeValue;
   }
}


// Append the new stuff to the body element

var newElement = document.createElement('p');
var hhh = document.createElement('h3') ;
hhh.appendChild(document.createTextNode("To link to this photo in your blog, copy and paste this HTML into your blog:"));
newElement.appendChild(hhh);


// Create the text box.
var newTextArea;
newTextArea = document.createElement('textarea');
newTextArea.setAttribute('name', 'blogtextfield');
newTextArea.setAttribute('onFocus', 'this.select();' );
newTextArea.setAttribute('rows', '6');
newTextArea.setAttribute('style', 'width: 520px;');
newTextArea.setAttribute('wrap', 'virtual');


// Populate with the data extracted from the page.
newTextArea.value='<style type="text/css">.flickr-photo { border: solid 2px #000000; }.flickr-frame { text-align: left; padding: 3px; }.flickr-caption { font-size: 0.8em; margin-top: 0px; }</style><div class="flickr-frame"><a href="'+photoPageLink+'" title="photo sharing"><img src="'+imageLink+'" class="flickr-photo" alt="" /></a>\n<span class="flickr-caption"><a href="'+photoPageLink+'">'+imgTitle+'</a>, originally uploaded by <a href="'+userLink+'">'+userID+'</a> <span style="font-size:0.7em;vertical-align:super;"><a href="http://userscripts.org/scripts/show/9713">(?)</a></span>.</span></div>';

newElement.appendChild(newTextArea);
insertLoc.parentNode.insertBefore (newElement, insertLoc);