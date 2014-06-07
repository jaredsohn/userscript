// ==UserScript==
// @name        TheSixtyOne Growl Notifications
// @namespace   http://dreamcloudstudios.com
// @description Growl Notifications for http://thesixtyone.com with Fluid.app
// @include     http://www.thesixtyone.com/*
// @author      DreamCloudStudios (Ryan Schmukler)
// ==/UserScript==

(function() {
	if (window.fluid) {
		
		var currentSong;
		var currentArtist;
		
		var previousSong;
		var previousArtist;
		
		var songLength;
		
		setTimeout(checkSong, 1500);
		
		function songChanged() {
			
			previousSong = currentSong;
			previousArtist = currentArtist;
			
			var attention = function() {
				window.fluid.unhide();
				window.fluid.active();
			}
			
			var growlOptions = {
                title: currentSong,
                description: currentArtist + "\n" + songLength,
                sticky: false,
                onclick: attention
            };

			window.fluid.showGrowlNotification(growlOptions);
		}
		
		function checkSong() {
			
			setCurrents();
			
			if(currentSong == previousSong && currentArtist == previousArtist)
			{
				setTimeout(checkSong, 1500);
			}else{
				songChanged();
				setTimeout(checkSong, 1500);
			}
		}
		
		function setCurrents() 
		{
			if(document.title == "thesixtyone - a music adventure")
			{
				songLength = "";
				currentSong = "Paused";
				currentArtist = "";
			}else
			{
				var pageTitle = document.title.substring(document.title.indexOf(")") + 2, document.title.length);

				var hyphenIndex = pageTitle.indexOf("-");

				songLength = document.title.substring(document.title.indexOf("(") + 1, document.title.indexOf(")"));
				currentSong = pageTitle.substring(0, hyphenIndex - 1);
				currentArtist = pageTitle.substring(hyphenIndex + 2, pageTitle.length);
			}
			
			
		}
		
	}
})();