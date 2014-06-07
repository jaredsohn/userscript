// ==UserScript==
// @name           ImageBam.com Just Image
// @namespace      imagebam
// @include        http://www.imagebam.com/image/*
// @match          http://www.imagebam.com/image/*
// ==/UserScript==


var img = document.getElementById("imageContainer").getElementsByTagName('tr')[1].getElementsByTagName('img')[0];

var myWindow=window.open('','_self','');
myWindow.document.write("<img align=\"left\" id=\"resizing\" style=\"position:absolute; TOP:0px; LEFT:0px; cursor: move\" src=\"" + img.src + "\">");

var img = myWindow.document.getElementById("resizing");
img.addEventListener("click", rescale, true);

var rescaled = true;
function rescale()
{
	if(!rescaled)
	{
		rescaled = true;
		img.height = img.naturalHeight;
		img.width = img.naturalWidth;
	}
	else
	{
		rescaled = false;
		
		if(img.naturalWidth > window.innerWidth && img.naturalHeight > window.innerHeight)
		{
			if((img.naturalWidth - window.innerWidth) > (img.naturalHeight - window.innerHeight))
			{
				img.width = window.innerWidth;
				img.style.height = 'auto';
				img.style.removeProperty("width");
			}
			else
			{
				img.height = window.innerHeight;
				img.style.width = 'auto';
				img.style.removeProperty("height");
			}
		}
		else if(img.naturalWidth > window.innerWidth)
		{
			img.width = window.innerWidth;
			img.style.height = 'auto';
			img.style.removeProperty("width");
		}
		else if(img.naturalHeight > window.innerHeight)
		{
			img.height = window.innerHeight;
			img.style.width = 'auto';
			img.style.removeProperty("height");
		}
	}
}
