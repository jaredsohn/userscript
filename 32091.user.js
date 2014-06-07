// Greasemonkey user script - phpBB Signature Hider
//
// This script hides images in people's signatures on phpBB.
//
// It does this by hiding all images in a post below the line
// containing "_________________".
//
// It only does anything on pages with the phpBB copyright notice.
// Seemed as good a way to detect phpBB as any.
//
// By default it runs for all pages, but you can customise which
// pages it runs on if you want to save a processor cycle or two.
//
//
// *** UPDATED 20/05/2005
// Now using (much more reliable) regexp to spot 'Powered by',
// making phpBB board identification better. Done in honour
// of http://www.opelgsiclub.nl/phpBB2/index.php
//
//
// Written by Michael Tandy - michaeltandy at spamcop dot net
//
//
// Update aug 19th 2008 -- phpBB board recognition made less strigent
// because it didnt find all boards. Also removes -everything- below and
// including the ___-line now
// Chess - Moonglade, WoW.   Enjoy!


// ==UserScript==
// @name          phpBB Signature Image Hider
// @namespace     http://www.warwick.ac.uk/~esudbi/greasemonkeyscripts/
// @include       *
// @description	  Hides images below "_________________" in phpBB posts.
// @exclude
// ==/UserScript==

(function() {

  // Here we look for the "Powered by phpBB" at the bottom of all phpBB pages.

  // GM_log("phpBB sig image hider is checking if the page is phpBB...", 0);

  var alllinks =  document.getElementsByTagName("A");
  for (var i = (alllinks.length-1); i > (alllinks.length-20) ; i--)	// Only test the last 20 links on a page, for speed.
    if ((alllinks[i].className == "copyright") && (alllinks[i].href == "http://www.phpbb.com/") &&  alllinks[i].previousSibling.data.match(/Powered by/) ) {
      HideSigs();	// Triggers sig hiding.
      break;		// No need to search any further.
    }

  // GM_log("phpBB sig image hider is done.", 0);

})();




// This function runs on phpBB pages only, we hope. It identifies nodes in posts
// below the 'sig start' line and calls the image hide subroutine on them.
function HideSigs() {

  GM_log("phpBB detected; trying to hide sig images...", 0);
  var allspans = document.getElementsByTagName("SPAN");
  for (var i = 0 ; i < allspans.length ; i++) {

    if(allspans[i].className == "postbody") { // If it's a post...

      var SpanChildNodes = allspans[i].childNodes;
      var hidestuff = false;

      for (var j = 0 ; j < SpanChildNodes.length ; j++) { // for each node within the post

        if (SpanChildNodes[j].nodeValue == "_________________")
          hidestuff = true;

        if (hidestuff == true)
          RecursiveImgHide(SpanChildNodes[j]);

      } // end for each node of post
    } // end code for if it's a post
  } // end for each span

}



// This function recursively searches everything below the chosen node in the DOM.
// We have to look at children at least once to catch the case of <a><img></a>.
// Using recursion means we can catch even things in lots of formatting
// e.g. <big><a><small><i><foo><img></foo></i></small></a></big>
// We're safe with unclosed tags etc. because the DOM takes care of all that.

function RecursiveImgHide(CurrentNode) {

/**
  if(CurrentNode.nodeName == "IMG") {    
    // If the node under inspection is an image..
   replacementTextNode = document.createTextNode("-img-"); 
    // generate a replacement node, and replace img with it.
    CurrentNode.parentNode.replaceChild(replacementTextNode, CurrentNode); 
  }
**/

  // chess - moonglade WoW
  // replace all nodes under and including the ____-line with empty string
  replacementTextNode = document.createTextNode("");
  CurrentNode.parentNode.replaceChild(replacementTextNode, CurrentNode);

      // Want to catch and kill other formatting? Insert code here...

  if (CurrentNode.childNodes.length > 0) { // If the node under inspection has children...
    var ChildNodes = CurrentNode.childNodes;       // ...create an array of them...
    for (var i = 0 ; i < ChildNodes.length ; i++)  // ...and for each of them...
      RecursiveImgHide(ChildNodes[i]);             // ...recurse.
  }

}