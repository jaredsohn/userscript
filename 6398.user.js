// ==UserScript==
// @name           ImageScroll
// @namespace      http://mywebsite.com/myscripts
// @description    Makes for better scrolling in lists of images.  Press ctrl + up and down arrows to jump to images
// @include        *
// ==/UserScript==

var allImages, thisImage, newAnchor;

allImages = document.getElementsByTagName('img');

var linkCount=1;

for (var i = 0; i < allImages.length; i++) 
{
    thisImage = allImages[i];

    if (thisImage.width==null || thisImage.width==0 || thisImage.width>300)    
    {
        newAnchor = document.createElement("a");
        newAnchor.innerHTML = '<a name="imageScroll' + linkCount + '" id="imageScroll' + linkCount + '"> </a><BR>';

        linkCount++;
 
        //GM_log ("Inserting link: " + linkCount);

	thisImage.parentNode.insertBefore(newAnchor, thisImage);
 	   
     }
}

var scrollCount=0;

document.addEventListener('keypress', function(event)
{
	if (event.keyCode==38 && event.ctrlKey && scrollCount > 1)
	{
		scrollCount--;
		window.scrollTo(0, findPosition(document.getElementById("imageScroll"+scrollCount)));
		//GM_log("scrolling to image: " + scrollCount);
	}
	else if (event.keyCode==40 && event.ctrlKey && scrollCount < linkCount)
	{
		scrollCount++;
		window.scrollTo(0, findPosition(document.getElementById("imageScroll"+scrollCount)));
		//GM_log("scrolling to image: " + scrollCount);
	}
}, false);

function findPosition(element) 
{
	if(element.offsetParent) 
	{
		for(var posX = 0, posY = 0; element.offsetParent; element = element.offsetParent ) 
		{
			posY += element.offsetTop;
    		}
    		return posY;
	} 
	else 
	{
    		return element.x;
	}
}