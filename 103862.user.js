// ==UserScript==
// @name           Freeze Dark Mater Animated Icon
// @author         Green - Uni13
// @version		   1.0.1
// @date           Nov 2013
// @namespace      http://userscripts.org/scripts/show/103862
// @description    Freeze Dark Mater Animated Icon
// @include        http://*.ogame.*/*
// ==/UserScript==


    function freeze_gif(i) {
    var c = document.createElement('canvas');
    var w = c.width = i.width;
    var h = c.height = i.height;
    c.getContext('2d').drawImage(i, 0, 0, w, h);
    try {
        i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
    } catch(e) { // cross-domain -- mimic original with all its tag attributes
        for (var j = 0, a; a = i.attributes[j]; j++)
            c.setAttribute(a.name, a.value);
        i.parentNode.replaceChild(c, i);
    }
}


    (function()
{
  try {

//////////////////////////////////////////////////////////
// Use Xpath to get image of DM

var myNodeList;
myNodeList = document.evaluate(
	"/html/body/div/div/div/div/ul/li[5]/a[1]/img",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// dm_image is img	
var dm_image;
for (var i = 0; i < myNodeList.snapshotLength; i++) 
{
	dm_image = myNodeList.snapshotItem(i);
}
////////////////////////////////////////////
// Freeze the image
freeze_gif(dm_image);

   } catch (eErr) {
     // alert ("Greasemonkey error: " + eErr);
   }

   return;
      
}) ();
   
    
    