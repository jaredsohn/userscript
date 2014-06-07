// ==UserScript==
// @name           	Ikariam ExMachina
// @namespace      	PhasmaExMachina
// @description    	A collection of mods, tools, and hacks for Ikariam by PhasmaExMachina
// @author			PhasmaExMachina
// @include       	http://*.ikariam.*/
// @include       	http://*.ikariam.*/index.php
// @include       	http://s*.ikariam.*/*
// @include       	http://ikariam.dev/*

// @exclude			http://*.ikariam.*/board
// @require		  	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        	http://userscripts.org/scripts/source/57377.user.js
// @require       	http://userscripts.org/scripts/source/57756.user.js
// @require         http://userscripts.org/scripts/source/58203.user.js
// @require         http://userscripts.org/scripts/source/62718.user.js
// @require         http://userscripts.org/scripts/source/53274.user.js
// @website			http://www.facebook.com/pages/Ikariam-ExMachina/134196059935036
// @version		0.97
// 
// @history		0.97 Added option to hide friends bar
// @history		0.96 Fixed resources required to build icons in building pages
// @history		0.96 Minor updates to handling of login page
// @history		0.95 Added detection for old style login page
// @history		0.94 Updated auto login for new login page
// @history		0.93 Targets in spies overview now show "-" instead of "?" for troops in town when military score is 0
// @history		0.93 Moved island icon in empire overview to left of resource icons to match spy overview layout
// @history		0.93 Added island icon to military overview
// @history		0.93 Added resources missing to building views
// @history		0.93 Added resources missing for 1:1 premium trade to building views
// @history		0.92 Fixed stupid glitch in building position detection from v0.91
// @history		0.91 Added time until full/empty to tooltips in empire overview
// @history		0.91 Resources full/empty in less than 48 hours are now marked in red 
// @history		0.91 Resources full/empty in less than 24 hours are now bold 
// @history		0.91 Resources full/empty in less than 2 hours are now larget font 
// @history		0.91 Updated detection of max building levels within auto build  
// @history		0.90 Fixed spy overview not showing targets of same player and city name
// @history		0.89 Updated to support Ikariam v0.4.0.1
// @history		0.88 Fixed first attempt to sort targets by player name
// @history		0.88 Fixed "[mission] returned to [origin]" notice  
// @history		0.87 Added troop/resource movements notification type
// @history		0.87 Targets in spy overview under research advisor are now sorted by player name
// @history		0.87 Fixed layout of movements overview on pages like the museum view  
// @history		0.86 Updated position of settings window and a few other settings tweaks 
// @history		0.85 Fixed some stupid coding errors that were causing island type detection bugs
// @history		0.85 Fixed display of number of ships in military movements advisor for incoming trades & attacks
// @history		0.84 Fixed travel times glitch in espionage overview  
// @history		0.83 Fixed glitch in inline scores caused by multiple search results for a player name
// @history		0.83 Added "New Circular" button to bottom right of inbox 
// @history		0.83 Fixed glitch in inbox when game messages are present
// @history		0.83 Maxed buildings no longer have broken mouseover required resources in city view
// @history		0.83 Maxed buildings are now blue in building lists
// @history		0.83 Maxed buildings in buildings overview are now drawn in blue and no longer have mouseover tooltip
// @history		0.83 Fixed colors of building levels in buildings overview when pinned to the bottom of the page
// @history		0.82 Fixed script breaking partially when buildings overview disabled
// @history		0.82 Added Alliance Highlighter
// @history		0.82 Maxed buildings now have blue building level indicators in city view
// @history		0.81 Fixed calculation of total income when occupying cities
// @history		0.80 Auto build queue is no longer drawn on battle reports when viewing battlefield
// @history		0.80 Fixed abort mission link in movements overview after spy mission in targets overview 
// @history		0.79 Fix for Chrome users
// @history		0.78 Units in training are now drawn in military overview even if there are no units of that type already trained
// @history		0.77 Fixed a bug in academy and a few other pages. May also improve stability for some.  
// @history		0.76 Moved target island type icon to left of city name in targets overview
// @history		0.76 Added player military score to targets overview
// @history		0.76 Updated layout of targets overview 
// @history		0.76 Added travel times to targets overview
// @history		0.75 Repaired broken building levels in spied cities from v0.74 
// @history		0.75 Fixed auto reading of new spy target information updating the wrong targets
// @history		0.75 Auto reading of new spy targets now reads island type as well
// @history		0.74 Research income in empire overview is now correctly displayed for cities that have no academy
// @history		0.74 Fully automated reading of most city information in city view when data is not already stored
// @history		0.74 Fixed bug where name of town hall would sometimes be blank in building lists
// @history		0.74 Added qty of inits in training to military overview 
// @history		0.74 Qty and % resources safe no longer shown if qty of resource in hand is 0
// @history		0.74 Removed "Income: #" title from city names in empire overview since the information's over to the right anyway
// @history		0.74 Prevented keyboard shortcuts from triggering when CTRL is pressed (it as jumpting to finance page on CTRL+F etc.)
// @history		0.74 Blocked premium CT finder on museum page for anti-plus
// @history		0.74 Added "-" as the keyboard for the 11th city (for those few that actually have 11 cities)
// @history		0.74 Fixed military overview settings
// @history		0.74 Changing cities via keyboard shortcuts when on mines will retain view
// @history		0.74 Changing cities via keyboard shortcuts when in pillage and send spy pages will retain view
// @history		0.74 Fixed calculation of wine consumption when viewing taverns in wine producting cities
// @history		0.73 Fixed several fatal data glitches in the code
// @history		0.73 Added search icons for player and alliance to museum page
// @history		0.73 Added overview of inactive/vacation mode players and their cities to museum 
// @history		0.73 Added keyboard shortcuts
// @history		0.72.1 Minor tweak to try to prevent some data bugs
// @history		0.72 Fixed buildable buildings in buildings overview not being marked in green
// @history		0.71 Added inline scores to island view (configure under "Search" tab in settings)
// @history		0.71 Level of buildings under construction in buildings overview is now more visible
// @history		0.71 Moved enable/disable building lists to its own option instead of being bundled with buildings overview
// @history		0.71 Fixed a minor JavaScript glitch when mousing over some drop-downs
// @history		0.70 Added current domain to notifications for those that play on multiple servers
// @history		0.69 Added "Test Server" option login server select on en.ikariam.com
// @history		0.69 Attempt to increase search compatibility for test server
// @history		0.68 Fixed overviews showing even when disabled for users that upgrade from old versions
// @history		0.68 Auto build stack is now cleared when enabling auto build to prevent stale build orders
// @history		0.68 Buildings overview can now be pinned to the bottom of the page like empire and military overviews
// @history		0.67 Fixed military overview showing on bottom when set to disabled
// @history		0.66 Empire and military overviews can now be placed at the bottom of the page (see settings)
// @history		0.65 Fixed/re-enabled alliance search
// @history		0.64 Fixed minor glitches layout of inbox and outbox
// @history		0.64 Added "Circular" button to messages to reply as a circular if in an alliance (thanks for the idea holyschmidt!)
// @history		0.64 Added append message option to inbox/outbox (thanks for the idea holyschmidt!)  
// @history		0.63 Fixed cultural treaty icon in messages for CT accept confirmation messages
// @history		0.62 Added option to disable library overview
//
// @uso:script      80545
// @uso:version     277078
// @uso:timestamp   Tue, 30 Nov 2010 19:04:08 +0000
// @uso:installs    89104
// @uso:reviews     30
// @uso:rating      4.33
// @uso:discussions 484
// @uso:fans        79
// @uso:hash        bb05a355a3177e47f43ebeeafc88270c2ed5d6b4
// ==/UserScript==
