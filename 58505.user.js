// ==UserScript==
// @name        Dock Integration
// @namespace   http://fluidapp.com
// @description Add Dock menu item for Play/Pause and badge the Dock icon for new notifications. version 1.1: Modified to work with Lala site redesign.  Original scripts here: http://nanovivid.com/stuff/fluid-userscripts-for-lala/
// @include     *
// @author      Adam Nolley/Chethan Pandarinath
// @version     1.1
// ==/UserScript==


if (!Array.prototype.sum) {
	Array.prototype.sum= function(){
		for(var i=0,sum=0;i<this.length;sum+=this[i++]);
		return sum;
	}	
}


function __lalaDockBadgeManager() {
	
	this.set = function() {
		var newCount = window.__lalaDockBadgeCount.sum();
		window.fluid.dockBadge = (newCount > 0) ? newCount.toString() : "";
	};
	
	this.update = function() {
		if (!window.__lalaDockBadgeCount) {
			window.__lalaDockBadgeCount = new Array();
		}
		
		// Ok, this is a little nuts but it's the only way I could work out to get the counts
		// of new notification items. We have to use Lala's API object to ask independently 
		// about each of the five types of notifications.
		
		// And there is probably a better way to pass the data back than using the window object
		// but I gave up on getting anything else working.
		api.Alerts.getBlurbDetails(function(res){
			window.__lalaDockBadgeCount[0] = (res.data.list.length > 0) ? res.data.list.length : 0;
		});
		
		api.Alerts.getGiftDetails(function(res){
			window.__lalaDockBadgeCount[1] = (res.data.list.length > 0) ? res.data.list.length : 0;
		});
		
		api.Alerts.getRecoDetails(function(res){
			window.__lalaDockBadgeCount[2] = (res.data.list.length > 0) ? res.data.list.length : 0;
		});
		
		api.Alerts.getUploadDetails(function(res){
			window.__lalaDockBadgeCount[3] = (res.data.length > 0) ? res.data.length : 0;
		});
		
		api.Alerts.getFollowerDetails(function(res){
			window.__lalaDockBadgeCount[4] = (res.data.list.length > 0) ? res.data.list.length : 0;
		});
		
		// Wait a few seconds and then update the Dock badge
		setTimeout(this.set.bind(this), 5000);
	};
}

// Wait until the page is loaded before trying to do anything with the Dock badge
window.addEventListener('load', function() {
	
	if (!window.__lalaDockBadge_Initialized) {
		
		window.__lalaDockBadge_Initialized = true;
		var __lalaDockBadge = new __lalaDockBadgeManager();
		__lalaDockBadge.update();
		
		// Update the dock badge every five minutes
		setInterval(__lalaDockBadge.update, 60 * 5 * 1000);
	}
	
}, false);



if (!window.__lalaDockMenus_Initialized) {
	window.__lalaDockMenus_Initialized = true;
	// Add Play/Pause menu item
	window.fluid.addDockMenuItem("Play/Pause", function() { Player.g.togglePlayback(); });
	// Add Previous Track menu item
	window.fluid.addDockMenuItem("Previous Track", function() { Player.g.prevTrack(); });
	// Add Next Track menu item
	window.fluid.addDockMenuItem("Next Track", function() { Player.g.nextTrack(); });
}
