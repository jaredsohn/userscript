// YouTube Pop-out

// Version 1.2

// 2009-03-18

// Copyright (c) 2009, Paul Venuti

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

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

// select "YouTube Pop-out", and click Uninstall.

//

// --------------------------------------------------------------------

//

// Change History

//

// Version 1 Beta (2008-08-30)

//   -- Initial version
// Version 1.1 (2009-02-21)
//   -- Updated to work with Flashblock
// Version 1.2 (2009-03-18)
//   -- Added video title to the title of the pop-out window
//   -- Removed default padding around video object
//   -- Removed location bar from pop-out window

//

// ==UserScript==

// @name          YouTube Pop-out

// @namespace     http://www.venutip.com/category/web-development/greasemonkey

// @description   Creates a link on YouTube video pages that you can use to pop out the video into a separate window (sort of like GTalk's pop-out feature)
// @version       1.2

// @include       youtube.com/watch*

// @include       *.youtube.com/watch*

// ==/UserScript==



// Create a new link and attach popup event

var popOutLink = document.createElement("a");

popOutLink.innerHTML = "Pop out video";

popOutLink.setAttribute("href", "#");

popOutLink.addEventListener("click", insertVideoInNewWindow, false);



// Add a nice little external link icon

var popOutImage = document.createElement("img");

popOutImage.setAttribute("src", "http://i80.photobucket.com/albums/j181/venutip/external.png");

popOutImage.setAttribute("alt", "External link icon");

popOutImage.setAttribute("style", "padding-left:5px;");



// Create a paragraph to hold the link; add link; add graph below video

var popOutGraph = document.createElement("p");

popOutGraph.appendChild(popOutLink);

popOutGraph.appendChild(popOutImage);

document.getElementById("watch-this-vid").appendChild(popOutGraph);



/**

 * Opens a new window in which to display the video

 */ 

function insertVideoInNewWindow()

{
  // Get video width and height. Must parse from the embed code's value string,
  // as Flashblock obliterates document.embeds.
  var embedCode = document.getElementById("embed_code");
  var embedCodeValueString = embedCode.value;
  
  var matchResults = embedCodeValueString.match('width="([0-9]+)"');
  var width = parseInt(matchResults[1]);

  matchResults = embedCodeValueString.match('height="([0-9]+)"');
  var height = parseInt(matchResults[1]);

  // Set properties for popout window

  var popOutWindow = window.open("","popUpWindow","height=" + height + ",width="

                                 + width + ",top=0,left=0,navigation=0");

  

  // Remove video and pop-out link from main page
  var videoDiv = document.getElementById("watch-this-vid");

  while(videoDiv.hasChildNodes())

    videoDiv.removeChild(videoDiv.firstChild);

  

  // Can't force related videos to open in the parent window, so disabling
  var video = embedCode.value.replace(/&fs=1/g, "&fs=1&rel=0");

  

  // Add video to page

  popOutWindow.document.writeln("<html><head><title>" + document.title + "</title>" +
 				"<style>body { margin: 0; }</style></head>" + video +
				"</html>");

}