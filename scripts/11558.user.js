// ==UserScript==
// @name          GoogleImagesEnlarger
// @description   Enlarges pictures when you roll over them
// @include       http://images.google.com/*
// @include       http://images.google.co.uk/*
// ==/UserScript==
//
// By: wagstaff
//
// Partly based on "Googlenlarge" (http://userscripts.org/scripts/show/7863)
// and partly on "Google Image Relinker with Mouseover"
// (http://userscripts.org/scripts/show/9524).

// Utility function to get the left position of an object
function getLeftPosn(object) {
   var leftPos = object.offsetLeft;

   while (object.offsetParent !== null) {
      object = object.offsetParent;
      leftPos += object.offsetLeft;
   }

   return leftPos;
}

// Function to tidy up in the event that we fail to load a big image.
function removeBigImage(event) {
   var bigImage, parentSpan;

   // Get objects.
   bigImage = event.currentTarget;
   parentSpan = bigImage.parentNode;

   // Remove the event listener.
   bigImage.removeEventListener('error', removeBigImage, false);

   // Remove big image and its parent span.
   parentSpan.removeChild(bigImage);
   parentSpan.parentNode.removeChild(parentSpan);
}

// Now we begin
var LEFT_RIGHT_MARGIN = 8;
var TOP_BOTTOM_MARGIN = 3;
var LITTLE_IMG_BORDER = 1;
var BIG_IMG_BORDER = 2;
var SPAN_BORDER = 3;

var allLinks, thisLink;
var ii;
var regExpMatches, imageURI;
var newSpan, bigImage;
var href;
var maxWidth, maxHeight;
var newWidth, newHeight, ratio;
var littleImage;
var spaceLeft, spaceRight, rightPosn, spanWidth;

// add a style that we'll use for the spans that contain our big images.
// Initially they're hidden, but if you hover over the link they become visible.
GM_addStyle('a.thumbnail span {visibility:hidden; position:fixed; z-index:10000; border:'+SPAN_BORDER+'px solid #3B5998};');
GM_addStyle('a.thumbnail:hover span {visibility:visible;};');
GM_addStyle('a.thumbnail img {border:'+BIG_IMG_BORDER+'px solid white; vertical-align:bottom};');

// Find links to images.
allLinks = document.evaluate('//A[contains(@href,"/imgres?imgurl=")][contains(@href,"&imgrefurl=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Max height is the same for all of our new images.
maxHeight = window.innerHeight - 2*(TOP_BOTTOM_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

// Walk through them.
for (ii = 0; ii < allLinks.snapshotLength; ii++) {
   // Get link, and put it in the thumbnail class.
   thisLink = allLinks.snapshotItem(ii);
   thisLink.className = 'thumbnail ' + thisLink.className;

   // Google helpfully store the image width and height for us - get them.
   href = thisLink.href;
   regExpMatches = href.match(/\&w\=(.*?)\&sz\=/);
   newWidth = parseInt(regExpMatches[1]);
   regExpMatches = href.match(/\&h=(.*?)\&w\=/);
   newHeight = parseInt(regExpMatches[1]);

   // Create a span to contain our big image.
   newSpan = document.createElement('SPAN');
   thisLink.appendChild(newSpan);

   // We will allow the big image to go to either the right or the left of the
   // little image, wherever there is more space.
   littleImage = thisLink.getElementsByTagName("IMG")[0];
   spaceLeft = getLeftPosn(littleImage);
   rightPosn = spaceLeft + littleImage.width + (2*LITTLE_IMG_BORDER);
   spaceRight = document.body.clientWidth - rightPosn;
   maxWidth = Math.max(spaceLeft, spaceRight);
   maxWidth = maxWidth - 2*(LEFT_RIGHT_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

   // Calculate the new image size.
   if (newWidth > maxWidth) {
      ratio = (maxWidth/newWidth);
      newWidth *= ratio;
      newHeight *= ratio;
   }
   if (newHeight > maxHeight) {
      ratio = (maxHeight/newHeight);
      newWidth *= ratio;
      newHeight *= ratio;
   }

   // Position our span to the right or the left, wherever there's more room.
   spanWidth = newWidth + 2*(BIG_IMG_BORDER + SPAN_BORDER);
   if (spaceRight >= spaceLeft) {
      newSpan.style.right = (spaceRight - spanWidth + LEFT_RIGHT_MARGIN) + 'px';
   }
   else {
      newSpan.style.left = (spaceLeft - spanWidth - LEFT_RIGHT_MARGIN) + 'px';
   }

   // And position our image in the middle of the screen
   newSpan.style.bottom = ((maxHeight - newHeight)/2) + TOP_BOTTOM_MARGIN + 'px';

   // Figure out the source of the image.
   regExpMatches = href.match(/\/imgres\?imgurl\=(.*?)\&imgrefurl\=/);
   imageURI = decodeURI(regExpMatches[1]);

   // Finally insert the image into the document.
   bigImage = document.createElement('IMG');
   bigImage.width = newWidth;
   bigImage.height = newHeight;
   bigImage.src = imageURI;
   newSpan.appendChild(bigImage);

   // If the image fails to load, remove this whole construction.
   bigImage.addEventListener('error', removeBigImage, false);
}
