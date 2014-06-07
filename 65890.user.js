// ==UserScript==
// @name          Simple Craigslist Image Preview
// @description   View craigslist image previews
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.ca/*
// @exclude       http://*.craigslist.org/
// @exclude       http://*.craigslist.ca/
// include        http://*.backpage.com/*
// exclude        http://*.backpage.com/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// @grant         GM_xmlhttpRequest
// @version       2.5.2
// ==/UserScript==

/*
Modifications By: Jared Dutton
20131105 Changes
Fix Z-Index of full size image div to put it in front of Craiglist images
20130501 Changes
Modify to handle changes to craigslist page layout that causes duplicate images.
20130524 Changes
Update to handle how images are referenced in pages to get popup working again.
20130820 Changes
Update to correct image sizes and location of images in relation to ad header.
*/

var maxImages = 9;
var fullSizeWidth = 350;
var maxThumbnailVerticalSize = 100;
  
function updateFullSizeImage(url) 
{
	$('#FullSizeImage').attr("src",url);
 	$('#FullSizeimageDiv').toggleClass("hidden");
}

function newNode(tag,on) 
{
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

// Parse through the text returned by ajax for images, show them on the page near the link
function showImages(link) 
{
	return function(details) 
	{
		var previousImage = "";
		// Get the links to images from the target page via regular expression
		$("img", details.responseText).each
		(
			function(key) 
			{
				if (key>=maxImages)
					return;
				// On first pass through for loop create the div to hold the links
				if (key==0) {
					div = newNode("div",link.parentNode.parentNode);
				}
                
				var imageLink = this.src;

                var parentHref = "";
                if ($(this).parent().attr("href") != "")
                    parentHref = $(this).parent().attr("href");

                if (parentHref && (parentHref.endsWith("jpg") || parentHref.endsWith("jpeg") || parentHref.endsWith("png")))
                {
                    imageLink = parentHref;
                }
				// Get rid of thumb/ in url if it is a craigslist image
				//if(imageLink.indexOf("images.craigslist") > 0 && imageLink.indexOf("thumb/") > 0)
				//	imageLink = imageLink.replace("thumb/","");
				
				if (previousImage != imageLink)
				{
					//alert(imageLink);

					// Create the link and image and add them
					$(div).append(' ');
					var newA = newNode("a",div);
					newA.href = imageLink;

					var img = newNode("img",newA);
					img.src = imageLink;
					img.style.maxHeight = maxThumbnailVerticalSize + "px";

					// Set the large image to the one being moused over
					img.addEventListener("mouseover", function() { updateFullSizeImage(imageLink) },true);
									   
					// When mouse out of an image set it back to original size
					img.addEventListener("mouseout", function() { updateFullSizeImage('') },true);
					
					previousImage = imageLink;
				}
			}
		);
	};
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// Loop through all the ads on the page to show their images
function loopThroughAds() 
{
  $('.pl > a[href$=".html"],.cat a[href*=".backpage."]').slice(0,120).each(
  function(){
		try {
			  // If the target page is a craigslist ad, get the link and send it to the showImages function
			  GM_xmlhttpRequest({method:"GET",url: this.href,headers:{"Accept":"text/html,text/monkey,text/xml,text/plain"},onload: showImages(this)});
		  }
		  catch(e) { }
  });
}

// Create necessary styles, div and image to show large image preview
function main() 
{
  var requiredMarkup = '<style type="text/css">#FullSizeimageDiv{position: fixed; top: 0em; right: 0em; z-index: 99;} .hidden{display:none;} </style>' + 
	'<div id="FullSizeimageDiv" class="hidden">' + 
      '<img id="FullSizeImage" style="border-style: solid; border-color: black; border-width: 2; " name="FullSizeImage" src="" width="' + fullSizeWidth + '">' + 
	'</div>';
  
  $('body div:first').prepend(requiredMarkup);
  loopThroughAds();
}

$(document).ready(main());