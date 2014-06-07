// ==UserScript==
// @name           RPGnet image resizer
// @version        0.1
// @namespace      tag:PhasmaFelis
// @description    Resizes images on RPGnet to fit the window width and prevent horizontal scrollbars.
// @include        http://forum.rpg.net/*
// ==/UserScript==

/*
STILL NEEDS DOING:
* Properly implement a resize event listener to change image sizes when the window is resized. (Refer to VampireD's script) Could rerun the entire iteration routine at every resize, but might be more efficient to note all the images once (in a global array) and then run a function across the array as needed.
* Check properly that we're on a vBulletin board (using metadata, probably), and remove the forum.rpg.net restriction.
* Properly detect a "reply" page.
* Properly scale images in quotes (or otherwise offset to the right).
* Deal sanely with images that are also links.
* (If I'm feeling froggy) Refine setImageResize so that it offers special options for an image that's currently smaller than the window at original size.

Good test thread: http://forum.rpg.net/showthread.php?t=491118
*/

window.setImageResize = function(image)
//This is not really optimal, since the function is defined globally and could conceivably interfere with other scripts.
//But I don't want to re-declare it in full every time I need it.
{
	if ((image.style.maxWidth == 'none') || (image.style.maxWidth == 0))
	{
		image.style.maxWidth = (document.documentElement.clientWidth - 30) + 'px';
		image.title = 'Click for original size';
	}
	else
	{
		image.style.maxWidth = 'none';
		image.title = 'Click for thread-friendly size';
	}
}

//Here we should check to make sure we're on a vBulletin site--probably via metadata.
var vBulletin = true;

if (vBulletin)
{
	//Iterate across all divs.
	var divs = document.getElementsByTagName('div');
	for (i=0; i<divs.length; i++)
	{
		//Get all message posts.
		if (divs[i].id.substring(0, 12) == "post_message")
		{
			//Find all images in posts.
			var images = divs[i].getElementsByTagName('img');
			for (j=0; j<images.length; j++)
			{
				//Drop images that are control buttons or board smilies.
				if (images[j].className != 'inlineimg')
				{
					setImageResize(images[j]);

					images[j].addEventListener('click', function(event)
					{ setImageResize(event.currentTarget); }, false);

					images[j].addEventListener('resize', function(event)
					{
						alert(event.currentTarget.src + " reports resize");
					}, false);
				}
			}
		}
	}
}

//Not implemented yet.
window.addEventListener('resize', function()
{
}, false);