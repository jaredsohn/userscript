// ==UserScript==
// @name        amazon-cloud-player-helper
// @namespace   http://fluidapp.com
// @description Adds Growl notifications and dock menu items to a Fluid-created SSB version of the Amazon Cloud Player
// @include     *
// @author      Zachary Berry (zachberry@gmail.com, @zachberry)
// ==/UserScript==

// Info: http://zachberry.com/blog/?p=108 and https://github.com/zachberry/amazon-cloud-player-growl

//@TODO: last.fm scrobbling
(function ()
{
	if(!window.fluid)
	{
		return;
	}
	
	var INTERVAL_DELAY = 2000;
	
	var curSongData = {};
	var pollPlayerWidgetCreatedID;
	var pollSongDataID;
	
	pollPlayerWidgetCreatedID = setInterval(checkForPlayerWidgetCreated, INTERVAL_DELAY);
	
	window.fluid.addDockMenuItem('Play / Pause', onPlay);
	window.fluid.addDockMenuItem('Next', onPrev);
	window.fluid.addDockMenuItem('Previous', onNext);
	
	function onPrev()
	{
		amznMusic.widgets.player.playHash('play/previous', '', {});
	}
	
	function onNext()
	{
		amznMusic.widgets.player.playHash('play/next', '', {});
	}
	
	function onPlay()
	{
		amznMusic.widgets.player.masterPlay();
	}
	
	function checkForPlayerWidgetCreated()
	{
		try
		{
			if(amznMusic.widgets.player.created === true)
			{
				clearInterval(pollPlayerWidgetCreatedID);
				pollSongDataID = setInterval(checkForNewSongData, INTERVAL_DELAY);
			}
		}
		catch(e)
		{
			//
		}
	}
	
	function checkForNewSongData()
	{
		var newSongData = getCurrentSongData();
		if(newSongData)
		{
			if(curSongData == {})
			{
				if(newSongData)
				{
					curSongData = newSongData;
					showGrowl();
				}
			}
			else if(curSongData.title != newSongData.title)
			{
				curSongData = newSongData;
				showGrowl();
			}
		}
	}
	
	function getCurrentTime()
	{
		return amznMusic.widgets.player.getCurrentTime();
	}
	
	function getCurrentSongData()
	{
		try
		{
			return amznMusic.widgets.player.getCurrent().metadata;
		}
		catch(e)
		{
			return undefined;
		}
	}
	
	function showGrowl()
	{
		curSongData = getCurrentSongData();
		
		if(curSongData)
		{
			window.fluid.showGrowlNotification({
				title: curSongData.title,
				description: curSongData.artistName,
				priority: 1,
				sticky: false,
				identifier: curSongData.objectId,
				onclick: onGrowlCallback,
				icon: curSongData.albumCoverImageSmall
			});
		}
	}
	
	function onGrowlCallback()
	{
		//
	}
})();