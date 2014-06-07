// ==UserScript==

// @name           Resize inline images in forums

// @namespace      http://prdesignz.com

// @include        *

// ==/UserScript==

var ratio, imagewidth, imageheight, state, newwin;
ratio = 0.5; // set between 0.1 to 1, the lower the number the smaller the image
imagewidth = 400; // this is the width the image needs to be before resizing it
imageheight = 50; // to avoid style images from being resized set this to something like 50 or higher
state = 1; // do not change this or the toggle function to resize to original resolution will now work
newwin = false; // set this to true if you just want to open the original image in a new window

function resizeImg()
{
	var getImages;
	getImages = document.evaluate("//img", document, null, 6, null);
	for(i=0; i < getImages.snapshotLength; i++)
	{
		gI = getImages.snapshotItem(i);
		if(gI.offsetWidth > imagewidth && gI.offsetHeight > imageheight)
		{
			var newwidth = parseInt(gI.offsetWidth * ratio);
			var newheight = parseInt(gI.offsetHeight * ratio);
			var oldwidth = gI.offsetWidth;
			var oldheight = gI.offsetHeight;
			(!newwin) ? gI.setAttribute('title',"Original Resolution - " + gI.offsetWidth + "x" + gI.offsetHeight + " pixels - Click to resize to original resolution.") : gI.setAttribute('title',"Original Resolution - " + gI.offsetWidth + "x" + gI.offsetHeight + " pixels - Click to open in a new window.");
			(!newwin) ? gI.addEventListener("click",function(){toggle(this,oldwidth,oldheight,state)},false) : gI.addEventListener("click",function(){window.open(this.getAttribute('src'),'newwin');},false);
			gI.setAttribute('width',newwidth);
			gI.setAttribute('height',newheight);
			gI.style.cursor = 'pointer';
		}

	}
}
function toggle(what,wid,hgt,st)
{
	if(st == 1)
	{
		what.setAttribute('width',wid);
		what.setAttribute('height',hgt);
		what.setAttribute('title',"Previous Resolution - " + parseInt(wid * ratio) + "x" + parseInt(hgt * ratio) + " pixels - Click to resize to previous resolution.");
		state = 0;
		
	}
	if(st == 0)
	{
		what.setAttribute('width',parseInt(wid * ratio));
		what.setAttribute('height',parseInt(hgt * ratio));
		what.setAttribute('title',"Original Resolution - " + wid + "x" + hgt + " pixels - Click to resize to original resolution.");
		state = 1;
	}
}
window.addEventListener("load",resizeImg,false); 