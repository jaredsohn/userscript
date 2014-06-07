// ==UserScript==

// @name           Hide certain images

// @namespace   rustyfuture 28 April 2007

// @description  Hides all the images on its list.

// @include        *
// ==/UserScript==

//I've added a few images to the array just as examples. They're all logos: two from bbc.co.uk and two from answers.com.
//But in practice I use this script so I don't see certain signature images.
//To find the address of an image, right click on it, 
// select 'properties', and look for 'location' under the heading 'Image Properties'. The address is there.

var imagesToHide=[
	"http://www.bbc.co.uk/home/i/images/ban_home.gif",
	"http://www.bbc.co.uk/home/img/logo.gif",
	"http://site.answers.com/main169011/images/answers_logo_tm2.gif",
	"http://site.answers.com/main169011/images/nrs/Answers_logo2.gif" 
	];


var allImgs;
allImgs=document.getElementsByTagName('img');

for (var i=0; i<allImgs.length; i++)
{	
	for (var j=0; j<imagesToHide.length; j++)
		if(allImgs[i].src===imagesToHide[j] )
		{
			allImgs[i].parentNode.removeChild(allImgs[i]);
			i--;
			break;
		}
}