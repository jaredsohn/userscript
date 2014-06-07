// ==UserScript==
// @name           YouTube HD (Opera)
// @description    A dirty hack of YouTube HD (http://userscripts.org/scripts/show/77951) to make it work with Opera
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

// Default quality (Available values: 1080, 720, 480, 360)
var quality = 720;

function $(ID,root) {return (root||document).getElementById(ID);}

if (location.hostname.indexOf('youtube.com') != -1)
{
  window.opera.addEventListener('AfterEvent.load', function (e)
  {

    //no restrictions, just keep trying until it works...
    //if (e.event.target instanceof Document)
    //{

	// Flash Player
	player = $('movie_player');

  	var qualMap = { 'hd1080': 1080, 'hd720': 720, 'large': 480, 'medium': 360 };
  	var quals = player.getAvailableQualityLevels();

   	for(var i = 0; i < quals.length; i++)
	{
   	  if(qualMap[quals[i]] <= quality)
	  {
    	    player.setPlaybackQuality(quals[i]);
    	    break;
      	  }
	}

    //}
  }, false);
}
