// ==UserScript==
// @name       Rightmove Page Width Fixes
// @namespace  
// @version    0.1
// @description  Removes the enforced 980px page width and expands everything to use the available space without scrolling left and right.
// @match      http://*rightmove.co.uk/*
// @copyright  2013, Peter Bottomley
// ==/UserScript==

var sw = document.getElementById("sitewrapper");
sw.style.width = '100%';
sw.style.overflow = 'hidden';

var mic = document.getElementById("mainimagecontainer");
mic.style.width = '100%';
mic.style.height = 'auto';

var mp = document.getElementById("mainphoto");
mp.style.maxWidth = 'none';
mp.style.maxHeight = 'none';
mp.style.width = '100%';

var cp = document.getElementById("controlpanel");
cp.style.width = '100%';
cp.style.top = 'auto';
cp.style.bottom = '0px';

var mmw = document.getElementById("mainmapwrapper");
mmw.style.width = '100%';

var tc = document.getElementById("thumbnailcarousel");
tc.style.maxWidth = '90%';
tc.style.height = 'auto';

var fpContent = document.getElementById("tabs-floorplans-content");
var fp = fpContent.getElementsByClassName("floorplancontent");

var i, j;
for(i=0; i<fp.length; i++)
{
    fp[i].style.width = '100%';
	var fpImg = fp[i].getElementsByTagName("img");
	for(j=0; j<fpImg.length; j++)
	{
	    fpImg[i].style.maxWidth = 'none';
	    fpImg[i].style.width = '100%';
    }
}
