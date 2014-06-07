// ==UserScript==
// @name        Pandora for Fluid
// @namespace   clintxs@gmail.com
// @description Adds Growl notifications and iTunes-style track info to the dock menu.
// @include     http://*pandora.com/*
// @author      Clint Strong
// ==/UserScript==

(function () {
    if (window.fluid) {
		
		var isHomePage = (window.location.href.indexOf('/music') == -1);
		var isSongPaused = false;
		var dockTitles = [];
		
		if (isHomePage) {
			document.title = 'Pandora';
		}
		
		// Shorten song & artist names
		function truncate(title) {
			if (title.length > 50) {
				title = title.substr(0, 50) + '…';
			}
			return title;
		}
		
		// Show a Growl notification
		function notify(data) {
			if (!isSongPaused && isHomePage) {
				window.fluid.showGrowlNotification({
					title: 'Now Playing', 
					description: truncate(data.songName) + "\nby " + truncate(data.artistName), 
					sticky: false,
					identifier: 'Pandora',
					icon: data.artURL
				});
			}
		}
		
		// Update the dock menu with track info
		function updateDock(data, action) {
			clearDockItems();
			
			songDisplayStatus = (action == 'play') ? 'Now Playing' : 'Paused';
			
			addDockItem(songDisplayStatus, function() {
				notify(data);
			});
			
			// Form our artist URL, for the dock menu
			urlParts = data.songURL.split('/');
			artistURL = urlParts[0] + '//' + urlParts[2] + '/' + urlParts[3] + '/artist/' + urlParts[5];
			
			addDockItem('   ' + truncate(data.artistName), function() {
				window.open(artistURL);
			});
			
			addDockItem('   ' + truncate(data.songName), function() {
				window.open(data.songURL);
			});
			
			if (action == 'play') {
				addDockItem('Pause', pauseSong);
			} else {
				addDockItem('Play', pauseSong);
			}
		}
		
		// Add an item to the dock menu
		function addDockItem(text, callback) {
			dockTitles.push(text);
			window.fluid.addDockMenuItem(text, callback);
		}
		
		// Clear all dock menu items
		function clearDockItems() {
			for (i = 0; i < dockTitles.length; i++) {
				window.fluid.removeDockMenuItem(dockTitles[i]);
			}
			
			dockTitles = [];
		}
		
		// Play or pause the current track
		function pauseSong() {
			Pandora.pauseMusic(!isSongPaused);
		}
		
		Pandora.setEventHandler('PandoraStarted', function() {
			clearDockItems();
			addDockItem("Loading Pandora...");
		});
		
		Pandora.setEventHandler('PandoraEnded', function() {
			clearDockItems();
		});
		
		Pandora.setEventHandler('SongPlayed', function(data) {
			clearDockItems();
			updateDock(data, 'play');
			notify(data);
			isSongPaused = false; // Keep this at the end
		});
		
		Pandora.setEventHandler('SongPaused', function(data) {
			isSongPaused = true;
			clearDockItems();
			updateDock(data, 'pause');
		});
    }
})();