// ==UserScript==
// @name           Cheggit Full IMG Display
// @namespace      NA
// @include        *cheggit.net/torrents.php*
// ==/UserScript==

// VERSION: 1.000
// DATE: Oct 17, 2010

// Sets max width for images (0 means no max)
// If this is true, all images that are "added" using this script will automaticly be set to max widrth
var enableMaxWidth = true;
var maxWidth = 1280;

//Finds all current images and adds them to array
var foundImgTags = document.getElementById("content_frame").getElementsByTagName("img");
var alreadyPostedArray=new Array();
var ArrayInc = 0;

for(i = 0; i < foundImgTags.length;i++)
{
	//Next if makes sure to NOT add the hidden imags to the alreadyPostedArray
	if ((foundImgTags[i].parentNode.style.display != "none") && (foundImgTags[i].style.display != "none"))
	{
		alreadyPostedArray[ArrayInc++] = foundImgTags[i].src;
	}
}

//Replaces thumbs/links with full size images
var A = document.getElementById("content_frame").getElementsByTagName("a");
var PostItem = true;

for(var i=A.length-1; i>=0 ;i--)
{
	if (A[i].href.match(/pics.cheggit.nl/i))
	{
		PostItem = true;
		
		// This makes sure img has not been posted already, if it has been
		// adds (LOADED) text and sets PostItem to false
		for (x = 0; x < alreadyPostedArray.length; x++)
		{
			if (alreadyPostedArray[x] == A[i].href)
			{
				A[i].innerHTML += " (LOADED)";
				PostItem = false;
				break;
			}
		}

		//If img has not been posted, replace the link/thumb with the full img
		if (PostItem == true)
		{
			var oImg=document.createElement("img");
			oImg.setAttribute('src', A[i].href);
			alreadyPostedArray[ArrayInc++] = A[i].href;
			A[i].parentNode.replaceChild(oImg,A[i]);
			
			if (enableMaxWidth == true)
			{
				if (oImg.complete)
					shrinkToMax.call(oImg);
				else
					oImg.addEventListener("load", shrinkToMax, true);
			}
				
		}
	}
}

function shrinkToMax()
{
	width = this.width;

	if (width >= maxWidth)
	{
		this.width = maxWidth;
	}
}

