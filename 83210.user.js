// ==UserScript==
// @name            QuakeLive AdSkip
// @namespace       http://userscripts.org/scripts/show/83210
// @version         1.3.4
// @description     Skips the Ads when joining games.
// @require         http://www.nodeka411.net/public/gmupdater/83210.js
// @include         http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum/*
// ==/UserScript==

(function(jQuery) {
	// Define our object to help simplify modification of the page
	QLAdSkip = {
		ajaxProcessingCalls: {},
		globalStorage: {},
		// Define our debugger function so we don't have to repeat the if statement
		debug: function(msg)
		{
			if (typeof console.log == "function")
				console.log("[QLADS]: " + msg);
		},
		sniffAjaxCalls: function() {
			// Store the original jQuery.ajax call into our script
			var oldAjax = jQuery.ajax;
			// Rewrite the jQuery.ajax call and store the calling url to xhr.url for checking later
			jQuery.ajax = function( origSettings ) {
				var xhr = oldAjax(origSettings);
				xhr.url = origSettings.url;
				return xhr;
			}
			
			// Store the original jQuery.httpData function into our script
			var origHTTPData = jQuery.httpData;
			jQuery.httpData = function( xhr, type, s ) {
				var str = origHTTPData( xhr, type, s );
				// Define our array for the xmlhttprequest path
				var xhrPath = [];
				// Check to ensure the variable is defined
				if (typeof xhr.url != "undefined")
					str = QLAdSkip.processAjaxCall(xhr.url,str);
				return str;
			}
		},
		// Allows us to attach multiple functions to a single ajax call from quake live
		attachProcessAjaxCall: function(path,func) {
			// Split our path into an array for proper storage
			var xhrPath = this.splitURLPath(path);
			// Initialize our link list
			var position = this.ajaxProcessingCalls;
			for (var i in xhrPath)
			{
				// Follow the path until we reach a spot that hasn't been made and make it
				if (eval("typeof position." + xhrPath[i]) == "undefined")
					eval("position." + xhrPath[i] + " = {}");
				eval("position = position." + xhrPath[i] + ";");
			}
			// We found the spot to store it, so store the function for usage later on
			position[position.length] = func;
		},
		// Intercepted a call, lets see if there's anything that needs to happen
		processAjaxCall: function(path,html)
		{
			// Split our path into an array for proper storage
			var xhrPath = this.splitURLPath(path);
			
			// Initialize our link list
			var position = this.ajaxProcessingCalls;
			for (var i in xhrPath)
			{
				// We reached the ende of the line and found nothing
				if (eval("typeof position." + xhrPath[i]) == "undefined")
					return html;
					
				eval("position = position." + xhrPath[i] + ";");
			}
			// We came to the end of the line, lets see how many functions there are and run them
			for (var i in position)
				html = position[i](html);
			
			// Return the data we recieved
			return html;
		},
		splitURLPath: function(path)
		{
			var xhrPath = [];
			// Normalize the xmlhttprequest path so it ensures that it doesn't start with a slash
			var url = (path.substr(0,1) == '/' ? path.substr(1) : path);
			// Attempt to split the xmlhttprequest path, if it fails, then its only store it since there's nothing to split
			try {
				xhrPath = url.split('/');
			} catch (err) {
				xhrPath = [url];
			}

			return xhrPath;
		},
		changePreGameDelay: function(delay) {
			this.debug("Changing Pre-game Delay to " + delay);
			// Check to see if the pregame countdown timer is defined. if so, set to {delay} second(s) instead of 15
			if (typeof unsafeWindow.PREGAME_COUNTDOWN_TIME == "number")
				unsafeWindow.PREGAME_COUNTDOWN_TIME = delay;
			else
				debug("variable not available yet");
		},
		initQuickClickMenu: function() {
			// Add our quick-click-menu to the html
			this.debug("Initializing our quick-click-menu");
			jQuery('body').append("<ul id='quick-click-menu'></ul>");
		},
		addQuickClickMenuItem: function(settings) {
			// Add an item to our quick-click-menu
			this.debug("Adding quick-click-menu item " + settings.name);
			jQuery('#quick-click-menu').append('<li class="' + settings.name + '"><div title="' + settings.title + '"></div></li>');
			jQuery('#quick-click-menu li.' + settings.name + ' div').click(settings.click);
		},
		idleProtect: function() {
			this.addQuickClickMenuItem({
				name: "idle",
				title: "Idle Protect",
				click: function() {
					// Add/Remove enabled class to div
					jQuery(this).toggleClass('enabled');
					
					// Check which code we need to run, the turn on or turn off code
					if (jQuery(this).hasClass("enabled"))
					{
						QLAdSkip.globalStorage.oldIsGameRunning = unsafeWindow.quakelive.IsGameRunning;
						unsafeWindow.quakelive.IsGameRunning = function() {
							return true;
						}
					} else {
						unsafeWindow.quakelive.IsGameRunning = QLAdSkip.globalStorage.oldIsGameRunning;
						delete QLAdSkip.globalStorage.oldIsGameRunning;
					}
				}
			});
		},
		skipPregameAd: function() {
			this.addQuickClickMenuItem({
				name: "adskip",
				title: "Skip Pregame Ad",
				click: function() {
					// Add/Remove enabled class to div
					jQuery(this).toggleClass('enabled');
					
					// Check which code we need to run, the turn on or turn off code
					if (jQuery(this).hasClass("enabled"))
					{
						QLAdSkip.globalStorage.PREGAME_COUNTDOWN_TIME = unsafeWindow.PREGAME_COUNTDOWN_TIME;
						QLAdSkip.changePreGameDelay(1);
					} else {
						QLAdSkip.changePreGameDelay(QLAdSkip.globalStorage.PREGAME_COUNTDOWN_TIME);
						delete QLAdSkip.globalStorage.PREGAME_COUNTDOWN_TIME;
					}
				}
			});
		},
		toggleAltBrowser: function() 
		{
			this.addQuickClickMenuItem({
				name: "tabular",
				title: "Tabular Match Listing",
				click: function() 
				{
					jQuery(this).toggleClass('enabled');
					
					if (typeof QLAdSkip.globalStorage.listenerDisplayServerList == "undefined")
						QLAdSkip.globalStorage.listenerDisplayServerList = unsafeWindow.quakelive.serverManager.listener.DisplayServerList;
					else
					{
						unsafeWindow.quakelive.serverManager.listener.DisplayServerList = QLAdSkip.globalStorage.listenerDisplayServerList;
						delete QLAdSkip.globalStorage.listenerDisplayServerList;
					}
				}
			});
		}
	};
	
	// Add our Quick-Click-Menu stylesheet
	jQuery('<link rel="stylesheet" type="text/css" href="http://nodeka411.net/public/gladskip/style.css" />')
           .appendTo("head");
	QLAdSkip.initQuickClickMenu();
	// Add our idle Protect System
	QLAdSkip.idleProtect();
	// Add the ability to skip the pregame ad
	QLAdSkip.skipPregameAd();
	QLAdSkip.toggleAltBrowser();
	
	// Start sniffing QL's ajax calls
	QLAdSkip.sniffAjaxCalls();
	// Remove the premium adverts when the page layout is loaded
	QLAdSkip.attachProcessAjaxCall("layout/postlogin",function(html) {
		QLAdSkip.debug("Removing ads for premium");
	   // Wait 100 milliseconds till the html is placed on the page, then remove certain elements
	   setTimeout(function() {
		   jQuery('#qlv_topFadeAds').hide();
		   jQuery('.gopro_logo').hide();
	   }, 100);
	   // Send back the html to its displayed
	   return html;
	});
	// Remove the sponsored by block when the page layout is loaded
	QLAdSkip.attachProcessAjaxCall("welcome",function(html) {
		QLAdSkip.debug("Modifying Welcome Page Layout");
		// Wait 100 milliseconds till the html is placed on the page, then remove certain elements
		setTimeout(function() {
			jQuery('.spon_media').hide();
			jQuery('#spon_vert').html('');
		}, 100);
		// Send back the html to its displayed
		return html;
	});
	
	/**
	 * Match List
	 */
	function updateServerListing(v) 
	{
		// Check what page we're on to see if we're on the original or the list
		if (jQuery(".postlogin_nav ul li.selected").text() != "Match List")
		{
			// We're on the original, so direct the request to the original listener
			return QLAdSkip.globalStorage.listenerDisplayServerList(v);
		}
		// Bring in some outside help for us to generate our list
		var staticURL = unsafeWindow.quakelive.siteConfig.staticUrl;
		var baseURL = unsafeWindow.quakelive.siteConfig.baseUrl;
		var revision = unsafeWindow.quakelive.siteConfig.resourceRevision;
		var GetSkillRankInfo = unsafeWindow.GetSkillRankInfo;
		var locDB = unsafeWindow.locdb;
		var mapDB = unsafeWindow.mapdb;
		var matchtip = unsafeWindow.quakelive.matchtip;
		var servers = v.GetServers();
      
	  // Build our table to display our data in
      jQuery('#qlv_postlogin_matches').html(
				"<p style='color:#000;padding:5px;'>Click the column names to sort. Hold shift and select multiple columns to sort by multiple columns.</p>"
			+	"<table class='tablesorter matchListing qlv_pls_box'><thead>"
			+	"<tr class='postlogin_nav' style='height:30px;background-position:-10px 0px'>"
			+	"	<th style='background:transparent;'>Hostname</th>"
			+	"	<th style='background:transparent;'>Skill</th>"
			+	"	<th style='background:transparent;'>Map</th>"
			+	"	<th style='background:transparent;'>Map Type</th>"
			+	"	<th style='background:transparent;'>Location</th>"
			+	"	<th style='background:transparent;'>Players</th>"
			//+	"	<th style='background:transparent;'>Link</th>"
			+	"</tr></thead><tbody></tbody></table>");

		// Loop through each server and output the server info
		for (var x in servers)
		{
			// Find out where this server is located
			var loc = locDB.GetByID(servers[x].location_id);
			// Build the string to output our server location
			var locStr = '<img class="location_flag" width="16" height="11" src="'
						+ staticURL + "/images/flags3cc/" + loc.countryAbbr.toLowerCase() + "_v" + revision + '.0.gif" /> ' + loc.region + ", " + loc.city;
			// Output the skill level of our server
			var skillStr = '<div class="unranked_icon" title="Unranked"></div>';
			if (servers[x].ranked && servers[x].skillDelta > 0 && servers[x].skillDelta < 4)
				skillStr = '<div class="rankicon rank_icon_'+servers[x].skillDelta+'" title="' + GetSkillRankInfo(servers[x].skillDelta).desc + ' ['+servers[x].skillDelta+']"></div>';
			else if (servers[x].ranked && servers[x].skillDelta == 4)
				skillStr = '<div class="rankicon rank_icon_3" title="' + GetSkillRankInfo(servers[x].skillDelta).desc + ' ['+servers[x].skillDelta+']"></div>';
			else if (servers[x].ranked && servers[x].skillDelta == -1)
				skillStr = '<div class="rankicon rank_icon_p" title="' + GetSkillRankInfo(servers[x].skillDelta).desc + '"></div>';
			// Build the string to output the game Type icon
			var gameType = '<img class="gameicon" width="21" height="21"  src="'
						+ staticURL + "/images/gametypes/sm/" + mapDB.getGameTypeByID(servers[x].game_type).name + "_v" + revision + '.0.png" /> ' + mapDB.getGameTypeByID(servers[x].game_type).title;
			// Check to see if we know whether or not some of our friends are on this server, if so highlight it since its special
			var rowClass = (servers[x].num_friends > 0 ? "hasFriends" : "");
			// For sorting purposes, add a 0 infront of the numbers less than 10, sorting as a string and all that
			var players = (servers[x].num_clients < 10 ? "0" : "") + servers[x].num_clients+"/"+servers[x].max_clients;
			// Build our link to give to other people to join the server
			//var link = '<a href="'+baseURL+'/r/join/'+servers[x].public_id+'"><img src="'
			//		+ staticURL + "/images/link_glow_v" + revision + '.0.png" /></a>';
			matchtip.BindMatchTooltip(jQuery("<tr class='match_"+servers[x].public_id+" " + rowClass + "'>"
					+ "	<td>"+servers[x].host_address+"</td>"
					+ "	<td class='server_icons' style='position:relative;height:30px;'>"+ skillStr +"</td>"
					+ "	<td>"+mapDB.maps[servers[x].map].name+"</td>"
					+ "	<td>"+gameType +"</td><td>"+locStr+"</td>"
					+ "	<td>"+players+"</td>"
					//+ "	<td>"+link+"</td>"
					+ "</tr>").appendTo('#qlv_postlogin_matches table tbody'),servers[x].public_id);
		}
		jQuery(".tablesorter").tablesorter();
	}
  
   // Attach the CSS for the match list
	GM_addStyle('table.matchListing {width:100%;color:#000;padding:0px;margin:0px;} table.matchListing th {text-align:center;font-size:115%;font-weight:bold;color:#fff;} table.matchListing td {text-align:left;line-height:30px;height:30px;} table.matchListing tr.hasFriends td {background-color:#FFFF00;}');
   
   // Add our Match List tab
	QLAdSkip.attachProcessAjaxCall("home",function(html) {
       QLAdSkip.debug("Modifying home layout");
       var serverManager = unsafeWindow.quakelive.serverManager;
       setTimeout(function() {
	   		// Remove any extra unwanted adverts
			jQuery('.spon_media').hide();
			jQuery('#spon_vert').html('');
			// Check to see we have a copy of the displayserverlist function before we overwrite it
			if (typeof QLAdSkip.globalStorage.listenerDisplayServerList != "undefined")
			{
				// Add our match list tab to the nav bar
				jQuery('.postlogin_nav ul li').after('<li>Match List</li>').next().click(function() {
					// Change which tab we clicked
					jQuery('.postlogin_nav ul li').removeClass('selected');
					jQuery(this).addClass('selected');
					// Overwrite the display with our custom display
					unsafeWindow.quakelive.serverManager.listener.DisplayServerList = updateServerListing;
					unsafeWindow.quakelive.serverManager.listener.DisplayServerList(serverManager);
				});
			}
       }, 100);
       
       return html;
   });
})(unsafeWindow.jQuery);