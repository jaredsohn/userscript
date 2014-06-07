// Slashdot fix zoom user script
// version 0.3
// Author: Greg Bray (3/05/2010)
// Website: http://blog.theg2.net/
// License: free for personal or commercial use under the Creative Commons Attribution 3.0 United States License.

// ==UserScript==
// @name          Slashdot Fix Zoom
// @namespace     http://codeblog.theg2.net/2010/03/slashdot-zoom-fix-greasemonkey-and.html
// @description   Removes the boxes from the right side of the screen so that zooming works better.
// @include http://*.slashdot.org/*
// @include http://slashdot.org/*
// ==/UserScript==

//alert('start');
var b=document.body;
var d=false; //Disabled script 1/25/2011 per new designdocument.getElementById('firehose');
var isStory = (document.location.href.indexOf("/story/") >0) || (document.location.href.indexOf("type=story") >0) || (document.location.href.indexOf("slashdot.org/submission/") >0);
if(isStory && d){
    //alert('hit');
    slashboxes=document.getElementById('slashboxes');
    slashboxes.parentNode.style.display = "none";
    d.style.marginRight = "0px";
    //document.body.style.zoom = 2; //Use to zoom page automatically. 
    //TODO: create a function to automatically pick the right zoom size for a given resolution.
}
//alert('end');