// ==UserScript==
// @name           Tumblr De-Bling
// @namespace      http://dreamloom.com/tumblr_1
// @include        http://www.tumblr.com/*
// ==/UserScript==


var blingToken = "sharks_vs_cats_bling";

//
// Find images on initial load and hide if they match the 
// blingToken
//
var imgs = document.getElementsByTagName("img")
for (i = 0; i < imgs.length; i++)
{
  if (imgs[i].src.search(blingToken) > -1)
  {
    imgs[i].style.visibility = 'hidden';
  }
}


//
// Register for DOM add events. 
// If images added that match the blingToken, hide them.
// 
document.addEventListener("DOMNodeInserted", 
	function(evt) {
	  var addedImgs = evt.target.getElementsByTagName("img");
	  for (i=0; i < addedImgs.length; i++) {
	    if (addedImgs[i].src.search(blingToken) > 1)
	    {
	      addedImgs[i].style.visibility = "hidden";
	    }
	  }
	}, true);
