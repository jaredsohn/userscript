// ==UserScript==
// @name          PHPBB_GIF_REMOVER
// @description   Removes GIF images from the forum.
// @include       http://www.phpbb.com/phpBB/*
// ==/UserScript==

// entry point
function init()
{
	var img1 = document.getElementsByTagName("img");
	for (var n = 0; n < img1.length; n++)
	{
		if (img1[n].getAttribute("src").indexOf(".gif") >= 0)
		{
			img1[n].style.display = "none";
		}
	}
}

window.addEventListener("load", init, false);