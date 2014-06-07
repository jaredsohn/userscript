// ==UserScript==
// @name          Frenzies Underground Logo Resizer
// @namespace     http://greasemonkey.hansv.com/
// @description   Resizes tall logos to make longer topics easier to read.
// @include       http://*frenzyboard.net*action=read*
// @include       http://*frenzyboard.net*action=display*
// ==/UserScript==
//
// New in 0.5 -------------------------
//
// Based on Laurens Holst's phpBB image resizer script:
// http://www.grauw.nl/projects/pc/greasemonkey/ 
//
// Klif requested a script to resize images over 100px, so I figured Laurens' script was a good
// place to start. You can set your own maximum width and height by changing "maxHeight" to the
// tallest size (in pixels) you want images to display.
//
// Images are shown at their regular size when you click them (thanks, Laurens!)
//
// TODO:
// Currently, the script resizes all images in the topic to the specified size, but clicking on
// an image only returns it to normal if it's the logo. Posted pictures and sigs stay the same
// size. This needs to either be changed to allow all images to be resized to normal or to only
// make logos scale down.

maxHeight = 350;		// The tallest size (in pixels) images display at.

var phpBB = true;

if (phpBB) {
	var aSpan = document.getElementsByTagName('td');
	for (i=0; i<aSpan.length; i++) {
		if (aSpan[i].className == 'window') {
			var aCenter = document.getElementsByTagName('center');
			var aImg = aSpan[i].getElementsByTagName('img');
			for (j=0; j<aImg.length; j++) {
				aImg[j].style.maxHeight = maxHeight + 'px';
				aImg[j].title = 'Click for the original size';
				aImg[j].addEventListener('click', function(event) {
						if (event.currentTarget.style.maxHeight == 'none')
							event.currentTarget.style.maxHeight = maxHeight + 'px';
						else
							event.currentTarget.style.maxHeight = 'none';
					}, false);
				
			}
		}
	}
}

/* 	Based on Brian Livingston's MaxImageSize script at http://userscripts.org/scripts/show/690
//	Allows you to limit width as well as height, but it waits for the page to finish loading first.
var imgWidth = 200; //Set your maximum width here
var imgHeight = 400; //Set your maximum height here

(function(hotpotato) 
{

var xpath = "//td[@class='window']";
var resProfile = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (resProfile.snapshotLength >= 1) 
{
		
   window.addEventListener("load", function(e) 
			{
    var imgList = document.getElementsByTagName("img");
	for (j=0; j < imgList.length; j++)
				{
				var width = imgList[j].width;
				var height = imgList[j].height;

				if (width > imgWidth || height > imgHeight)
					{
						imgList[j].width = Math.min(width, imgWidth);
						imgList[j].height = Math.min(imgList[j].width * height / width, imgHeight);
						imgList[j].width = imgList[j].height * width / height;
					}
				}
//			return;
			}, false);
//			}, null);
}
		
*/