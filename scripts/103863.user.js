// ==UserScript==
// @name           Asimov Commander
// @author         Green - Asimov Uni13
// @version		   1.0.1
// @date           Nov 2013
// @namespace      http://userscripts.org/scripts/show/103863
// @description    Asimov Commander. Substitutes Commander image for Asimov Image. 
// @include        http://*.ogame.*/*
// ==/UserScript==


(function()
{
  try {

//////////////////////////////////////////////////////////
// Use Xpath to get image of official

var myNodeList;
myNodeList = document.evaluate(
	"/html/body/div/div/div/div/div/a[1]/img",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// asimov is img	
var asimov;
for (var i = 0; i < myNodeList.snapshotLength; i++) 
{
	asimov = myNodeList.snapshotItem(i);
}
////////////////////////////////////////////
// Change the src attribute of the image
asimov.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Isaac_Asimov_on_Throne-crop.png/45px-Isaac_Asimov_on_Throne-crop.png";
asimov.width ="32";


   } catch (eErr) {
     // alert ("Greasemonkey error: " + eErr);
   }

   return;
      
}) ();
   
    
    