// ==UserScript==
// @name        Grooveshark for Fluid
// @namespace   clintxs@gmail.com
// @description Adds Growl notifications and iTunes-style track info to the dock menu. Also adds the controls: Play/Pause, Next, and Previous.
// @include     http://*grooveshark.com/*
// @author      Clint Strong
// ==/UserScript==

(function () {
    if (window.fluid) {
		var dockTitles = [];
		setTimeout(getGroove, 1000);
	}
	
	function isPlaying() {
		return document.getElementById('player_play_pause').getAttribute('class').indexOf('pause') > -1;
	}
	function isPaused() {
		return document.getElementById('player_play_pause').getAttribute('class').indexOf('play') > -1 && !isStopped();
	}
	function isStopped() {
		return document.getElementById('player_play_pause').getAttribute('class').indexOf('disabled') > -1;
	}
	function isNext() {
		return document.getElementById('player_next').getAttribute('class').indexOf('disabled') == -1
	}
	function isPrev() {
		return document.getElementById('player_previous').getAttribute('class').indexOf('disabled') == -1;
	}
	
	function playPause() {
		document.getElementById('player_play_pause').click();
	}
	
	function getGroove() {
		if (typeof(window.GS.player) == 'undefined') {
			setTimeout(getGroove, 1000);
		} else {
			init();
		}
	}
	
	function init() {
		$.subscribe('gs.player.playing', grooveCallback);
		$.subscribe('gs.player.paused', grooveCallback);
		$.subscribe('gs.player.stopped', function() {
			clearDockItems();
		});
		$.subscribe('gs.player.queue.change', function(data) {
			clearDockItems();
			updateDock();
		});
	}
	
	window.grooveCallback = function(songInfo) {
		// This keeps the dock menu from getting too wide (don't need to show the song info in the title).
		document.title = 'Grooveshark';
		current = songInfo;
		if (current.status == undefined) {
			current.status = GS.player.PLAY_STATUS_PAUSED;
			current.activeSong = current;
		}
		if (isPlaying()) {
			notify();
			clearDockItems();
			updateDock();
		} else if (songInfo.status == GS.player.PLAY_STATUS_PAUSED) {
			clearDockItems();
			updateDock();
		}
	}
	
	function notify() {
		if (typeof current.EstimateDuration != 'undefined') {
			var time = current.EstimateDuration;
		} else {
			var time = current.activeSong.EstimateDuration;
		}
		time = Math.floor(time) / 1000;
		
		mins = Math.floor(time / 60);
		secs = Math.floor(time - (mins * 60));
		
		if (secs < 10) {
			secs = "0" + secs;
		}
		
		if (secs == '0') {
			secs == '00';
		} else if (secs.length == 1) {
			secs = '0' + secs;
		}
		
		window.fluid.showGrowlNotification({
			title: current.activeSong.SongName,
			description: current.activeSong.ArtistName + "\n" + current.activeSong.AlbumName + "\n" + mins + ':' + secs, 
			sticky: false,
			identifier: 'Grooveshark',
			onclick: function() {
				window.fluid.activate();
			},
			icon: current.activeSong.artPath + 'm' + current.activeSong.CoverArtFilename
		});
	}
	
	function addDockItem(text, callback) {
		dockTitles.push(text);
		
		if (typeof(callback) !== undefined) {
			window.fluid.addDockMenuItem(text, callback);
		} else {
			window.fluid.addDockMenuItem(text);
		}
	}
	
	function clearDockItems() {
		for (var i = 0; i < dockTitles.length; i++) {
			window.fluid.removeDockMenuItem(dockTitles[i]);
		}
		dockTitles = [];
	}
	
	function updateDock() {
		clearDockItems();
		
		if (isPlaying()) {
			addDockItem('Now Playing', notify);
		} else {
			addDockItem('Paused');
		}
		
		addDockItem('   ' + current.activeSong.SongName);
		addDockItem('   ' + current.activeSong.ArtistName);
		
		addDockItem('Controls');
		
		if (isPlaying()) {
			addDockItem('   Pause', function() {
				playPause();
			});
		} else if (isPaused()) {
			addDockItem('   Play', function() {
				playPause();
			});
		}
		
		if (isNext()) {
			addDockItem('   Next', function() {
				document.getElementById('player_next').click();
			});
		}
		
		if (isPrev()) {
			addDockItem('   Previous', function() {
				document.getElementById('player_previous').click();
			});
		}
	}
})();