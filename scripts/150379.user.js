// ==UserScript==
// @name        Achievement flag breakdown
// @namespace   com.ta
// @include     http://*.trueachievements.com/*achievements.htm*
// @include 	http://*.trueachievements.com/game.aspx?gameid=*
// @include     http://*.truetrophies.com/*trophies.htm*
// @include 	http://*.truetrophies.com/game.aspx?gameid=*
// @version     2.9
// @grant 	none
// @downloadURL http://userscripts.org/scripts/source/150379.user.js
// ==/UserScript==

var flags = [{"name":"Online Required", "src":"/images/itemflags/Online.png", "count":"0"},
{"name":"Offline Required", "src":"/images/itemflags/offlinegamemode.png", "count":0}, 
{"name":"Online/Offline", "src":"/images/itemflags/online_offline.png", "count":0}, 
{"name":"Single Player", "src":"/images/itemflags/SinglePlayer.png", "count":0}, 
{"name":"Cooperative +", "src":"/images/itemflags/Cooperative_plus.png", "count":0}, 
{"name":"Cooperative -", "src":"/images/itemflags/cooperative_minus.png", "count":0}, 
{"name":"Versus", "src":"/images/itemflags/Versus.png", "count":0}, 
{"name":"Main Storyline", "src":"/images/itemflags/MainStoryline.png", "count":0}, 
{"name":"Difficulty Specific", "src":"/images/itemflags/DifficultySpecific.png", "count":0}, 
{"name":"Stackable", "src":"/images/itemflags/Stackable.png", "count":0}, 
{"name":"Collectable", "src":"/images/itemflags/Collectable.png", "count":0}, 
{"name":"Cumulative", "src":"/images/itemflags/Cumulative.png", "count":0},
{"name":"Shop", "src":"/images/itemflags/shop.png", "count":0}, 
{"name":"Level", "src":"/images/itemflags/level.png", "count":0},  
{"name":"Viral", "src":"/images/itemflags/Viral.png", "count":0}, 
{"name":"Date Sensitive", "src":"/images/itemflags/DateSensitive.png", "count":0}, 
{"name":"Online Skill", "src":"/images/itemflags/OnlineSkill.png", "count":0}, 
{"name":"3+ Players Required", "src":"/images/itemflags/3playersrequired.png", "count":0}, 
{"name":"6+ Players Required", "src":"/images/itemflags/6playersrequired.png", "count":0}, 
{"name":"9+ Players Required", "src":"/images/itemflags/9playersrequired.png", "count":0}, 
{"name":"Community", "src":"/images/itemflags/community.png", "count":0}, 
{"name":"Date Sensitive", "src":"/images/itemflags/DateSensitive.png", "count":0}, 
{"name":"Time Sensitive", "src":"/images/itemflags/timesensitive.png", "count":0}, 
{"name":"Unlock Required", "src":"/images/itemflags/unlockrequired.png", "count":0}, 
{"name":"Multiple Playthroughs Required", "src":"/images/itemflags/multipleplaythroughsrequired.png", "count":0}, 
{"name":"Peripheral Required", "src":"/images/itemflags/PeripheralRequired.png", "count":0}, 
{"name":"Extra Content Required", "src":"/images/itemflags/ExtraContentRequired.png", "count":0}, 
{"name":"Time Consuming", "src":"/images/itemflags/TimeConsuming.png", "count":0}, 
{"name":"Missable", "src":"/images/itemflags/Missable.png", "count":0}, 
{"name":"Buggy +", "src":"/images/itemflags/Buggy_plus.png", "count":0}, 
{"name":"Buggy -", "src":"/images/itemflags/Buggy_minus.png", "count":0}, 
{"name":"Unobtainable", "src":"/images/itemflags/Unobtainable.png", "count":0}, 
{"name":"Partly Discontinued / Unobtainable", "src":"/images/itemflags/partlydiscontinued.png", "count":0}, 
{"name":"Discontinued", "src":"/images/itemflags/Discontinued.png", "count":0}, 
{"name":"Downloadable Content", "src":"/images/icons/dlc.png", "count":0}]; // All flags, image src and a count for each flag

var host = window.location.hostname;

var SIDEBAR_POS = 4; // this needs to be a multiple of 2 for each position, 0 and 2 are top positions, 4 is position 2.

var isGame = false;		// variable for checking if any flags have been found 

// check if it's a walkthrough or achievement:

var maincontent = document.getElementById("maincontent");
if(maincontent == null) { maincontent = document.getElementById("main"); }
if(maincontent.childNodes[1].className == "maincolumnpanel gameheader") { isGame = true; }

if(host == "www.trueachievements.com") {
	if(document.URL.indexOf("achievement.htm") > -1) { isGame = false; }	// stops the flags being shown for a single achievement
} else if(host == "www.truetrophies.com") {
	if(document.URL.indexOf("trophy.htm") > -1) { isGame = false; }	// stops the flags being shown for a single achievement
}

if(isGame) {								// if a flag has been foundm, we know it's a game rather than a news page, so add the side panel

	var images = document.getElementsByTagName("img");	// get all images!
	var hasFlags = false;								// has a flag been found?

	for(i = 0; i < images.length; i++) {				// iterate through all images
		for(x = 0; x < flags.length; x++) {				// iterate through all flags
			if(images[i].src == "http://" + host + flags[x].src) {			// if image matches a flag src, we have a flag!
				flags[x].count++;						// increment count for that flag
				hasFlags = true;
			}
		}
	}

	if(hasFlags) {											// if flags exist then we need to create and display the panel

		var sidebar = document.getElementById("sidebar");	// find the sidebar so we can create a new box

		var flagpanel = document.createElement("DIV");		// create a new panel
		flagpanel.id = "oFlagPanel";						// give it an id
		flagpanel.className = "smallpanel panelred";		// and a CSS class
				
		flagpanel.innerHTML = "<h4>// Full achievement breakdown</h4>";	// give it a title				

		var flagcontent = document.createElement("DIV");	// create the content inside the panel's div
		flagcontent.className = "panelcontent";				// give it the same style as the other
		flagcontent.innerHTML = "";							// empty the HTML content

		for(i = 0; i < flags.length; i++) {					// iterate through all flags
			if(flags[i].count > 0) {						// if the flag count is > 0 then at least 1 is set
				flagcontent.innerHTML += "<img src=\"" + "http://" + host + flags[i].src + "\" /> " + (flags[i].count - 1).toString() + " " + flags[i].name + " achievements<br />";
			}
		}

		flagpanel.appendChild(flagcontent);							// add the content to the new panel
		sidebar.insertBefore(flagpanel, sidebar.childNodes[SIDEBAR_POS]);		// add the panel to the sidebar
		
		
		
		// now for flag filter
		// create a new div to hold our flag filter
		var divFlagFilter = document.createElement("DIV");
		divFlagFilter.id = "divFlagFilter";
		divFlagFilter.innerHTML = "Flag Filter: ";
		
		var optFlags = document.createElement("SELECT");
		optFlags.id = "optFlags";
		optFlags.onchange = UpdateAchievementList;
		
		var objFlag = document.createElement("OPTION");
		objFlag.id = "optAll";
		objFlag.innerHTML = "All...";
		objFlag.value = "All";
		optFlags.appendChild(objFlag);
		objFlag = null;
		
		for(var i = 0; i < flags.length; i++) {
				
				if(flags[i].count > 0) {
		
					objFlag = document.createElement("OPTION");
					objFlag.id = flags[i].name;
					objFlag.innerHTML = flags[i].name;
					objFlag.value = flags[i].name;
					optFlags.appendChild(objFlag);
					objFlag = null;
				
				}
		}
		
		divFlagFilter.appendChild(optFlags);
		
		if(document.getElementsByClassName("achievementwonoptions").length == 0) { 
			maincontent.insertBefore(divFlagFilter, maincontent.childNodes[4]);
		} else {
			maincontent.insertBefore(divFlagFilter, maincontent.childNodes[6]);
		}

	}
}

function UpdateAchievementList() {
    
    
	var value = document.getElementById("optFlags").value;
	var flagpos;
	
	for(i = 0; i < flags.length; i++) {
		if(flags[i].name == value) { flagpos = i; }
	}
	
	var nodes = document.getElementsByClassName("achievementpanel");
	
	for(i = 0; i < nodes.length; i++) {
			
			
			if(value == 'All') {
				jQuery('#' + nodes[i].id).show();

			} else { 

				jQuery('#' + nodes[i].id).hide();
				
				var images = nodes[i].getElementsByTagName("img");
				
				for(var x = 0; x < images.length; x++) {
					if(images[x].src == "http://" + host +  flags[flagpos].src) {

						jQuery('#' + nodes[i].id).show();

					}
				}
			}
			

	}
}