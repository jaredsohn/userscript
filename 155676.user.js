// ==UserScript==
// @name            Vimeo autoplay killer
// @author          Pugsworth
// @description     Put an end to the annoying autoplay with embeded vimeo videos
// @version	        1.0
// @include         http://www.facepunch.com/showthread.php*
// ==/UserScript==
try
{
	var vimeovideos = document.getElementsByClassName("media_vimeo");
	if(vimeovideos.length >= 1)
	{
		for(var i = 0; i < vimeovideos.length; i++)
		{
			var video = vimeovideos[i].getElementsByClassName('message')[0].getElementsByClassName('mediablock')[0].children[0];
			video.src = '';
		}
	}
}
catch(e)
{
	console.error(e);
}
