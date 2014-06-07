// ==UserScript==
// @name           Kongregate Legacy of a Thousand Suns Raid Link Helper
// @namespace      tag://kongregate
// @description    Improves the text of raid links and stuff
// @author         doomcat
// @version        1.1.28
// @date           02.01.2012
// @include        http://www.kongregate.com/games/*/*
// ==/UserScript== 

/*
License: "Kongregate Legacy of a Thousand Suns Raid Link Helper for Chat" (henceforth known as "doomscript") is free to download and use unlimited times on unlimited devices. You're allowed to modify the script for personal use, but you need written permission from doomcat to distribute those modifications. If you plan to distribute doomscript in whole or in part, modified or not, as part of an application other than in userscript form, some fees may apply. Contact doomcat for pricing. 

Warranty: This userscript comes with no assurance or guarantee of functionality, suitability, or other promise of working as you intend. doomcsript is provided as-is.
*/


/**********************************************\
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
|** !!!!!!!!!! NOTE TO DEVELOPERS !!!!!!!!!! **|
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
|** !!!!!! If you fork this script,   !!!!!! **|
|** !!!!!! please change raidStorage  !!!!!! **|
|** !!!!!! in  DC_LoaTS_Properties    !!!!!! **|
|** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **|
\**********************************************/


/**
Change Log:

2012.02.01 - 1.0.0
Initial Version

2012.02.03 - 1.0.1
Quick add of a single missing id

2012.02.06 - 1.0.2
Code Cleanup
Added a bunch of comments for non-code people to convince themselves it isn't a virus
As far as I've heard, it works as designed in Chrome and FF on Mac and Win
Added Additional Alliance raid ids.

2012.02.06 - 1.0.3
All Public raid ids are in as far as I know, including the new Vince Vortex. Still missing some alliance ids.
Should now work in Opera.

2012.02.07 - 1.0.4
Added in FairShare calculation for raid

2012.02.09 - 1.0.5
Added in /raid command

2012.02.14 - 1.0.6
Switched /raid command to report FS*2 instead of *3. Added additional alliance raid ids.

2012.02.16 - 1.0.7
Merged in code from SReject's branch http://userscripts.org/scripts/review/125847
SReject's code adds the ability to click raid links and have them load in the same window, no refresh
Based on SReject's code, added /loadraid command
Moderately sized internal code refactors

2012.02.21 - 1.0.8
Added in /raidformat command
Added in /reload command
Fixed some trouble with /loadraid
All commands can now do /command help to learn more about the command
Minor refactors to improve code versatility

2012.02.22 - 1.0.9
Mistaken name on Mercury Raid
Added debugging for bizarre error that can happen only occasionally. 
Now remembers which raids were posted
Target damage is now possible to add to raid links as {target}
Added /seenraids command
Added /clearraids command
Added /raidformat reset
Replaced FS*2 with Target Damage in /raid desriptions

2012.02.22 - 1.0.10
Fixed bug that links from /seenraids refreshed the whole page
Added command /raidhelp
Added /w RaidBot help and /w RaidBot command
Added ability to do regex in /seenraids name
/seenraids will put visited raids to the top of the list

2012.02.27 - 1.0.11
Lots of formatting tweaks in help texts
Commented RaidManager code
Added /clearraids name difficulty {state: stateName}
Added /seenraids name difficulty {state: stateName}
Added update button to /raidhelp aka /w RaidBot help
Automatically checks for new versions. Will show in banner at top.
Finally compiled all known raid ids into script

2012.02.29 - 1.0.12
Fixed collision of hashes - apparently they aren't unique
Fixed typo in /seenraids and /clearraids where all raids were being shown incorrectly
Improved automatic update to popdown include notification bar
Added /autoupdate command
Added /loadraids as alias to /loadraid
Now links you load will update all throughout chat

2012.03.03 - 1.0.13
Fixed slow down of raids as posted
Improved memory usage in long term seen storage
Improved internal processing of raids
Added simple additional filters {age}, {count}, {page}

2012.03.08 - 1.0.14
Fixed a couple of minor reported bugs
Significantly improved speed of /seenraids
When changing the raid format, chat will update all other links in the chat, too
Removed backward compatibilty of old hash indexed raids since those should have all expired by now

2012.04.23 - 1.1.0
-- First Alpha Release: 2012-04-23
First parts of the omnibox UI added
First parts of the raid menu UI added
Added {diff} as a raidformat to get N, H, L, and NM instead of full text difficulties
Added {health}, {time}, {optimal} (alias of target), {ofs} (alias of target), {short-name}, 
	{shorter-name}, {zone}, {cache-state-nice}, and {cache-state-short} to Raid Format options
Completely reworked many parts of the internal structure of the code to make alterations by others easier
Locked script to just the Kongregate game page. Script no longer activates on other games.
Added Zone, Time Limit, Official Short Name, and Unofficial Short name to raids.
Corrected some minor errors in raid information, mainly alliance and world raid.
Attempted to better comment internal code for future extension by others
Raid links are now aged off at each raids length instead of blanket 200 hours.
Fixed health and FS for non-standard health pattern raids (currently Wahsh and Pox)
Added "/linkstate url state" command to force change a link's state, as in /linkstate http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_raid_boss=telemachus&kv_difficulty=4&kv_raid_id=2769083&kv_hash=9Bo4uUiWIM visited to set that tele to visited
Added "/wiki searchTerm" to open a page to the wiki like /wiki Snuuth Obliterator
-- Second Alpha Release: 2012-04-26
Shift-clicking a link now cycles through all states for that link
Migrated remaining commands over to new command format
/command help should now contain clickable links for examples
/clearraids without parameters will no longer clear all raids. Use /clearraids all
Added a template command in the new command style in order for others to create custom /commands
Moved {visited} format to use standard text
Added {visited-short} format
Slight rework and improvement to custom command creation
Corrected bug where visited state was getting overwritten by unseen
Omnibox should now appropriately respond (at least basically) to all commands
Pox optimum damage set to 20 epics
Fixed missing aliases in help text
Added first version of /farmvalue command. Needs work to be solid.
-- Third Alpha Release: 2012-05-22
Pox FS and Target were still broken. They should really be fixed for real now.
Added simple /time command to display server time. Works nicely in the omnibox.
Added a catch for just incase you /raidbot instead of /w raidbot. They both work the same way.
Added an attempt to recover from corrupted raid link storage. Quarantines old storage for examination and clears current bad storage
Made RaidMenu movable
Added Right-click visited option to preferences menu
Added /farmvalue command for simple hard-coded dump of info from spreadsheet
Added very simple implementation of live search in Raids tab
Fixed wiki commands making double entries in the omnibox autocomplete
-- Fourth Alpha Release: 2012-06-13
Altered RaidLink constructor parameter order - now is id, hash, diff, boss. No longer need all 4, just the first 2
RaidMenu tabs kind of respect tabPosition now, depending on browser. Will implement real solution later.
In some browsers, the script appeared to load a number of times only to fail. Most of these should no longer run.
Added first version of raid format into the raid menu
Added a simple /update command for those that get confused between scripts. Will eventually like to have the command do more.
Files are now in an Assembla SVN repo: http://subversion.assembla.com/svn/doomscript/
Now using Trac for bug tracking: http://trac.assembla.com/doomscript
Todos all moved to ticketing system.
Added Z10 raids, first pasee
-- Fifth Alpha Release: 2012-06-25
Removed kv_action_type=raidhelp from the required parameters of the link due to changes in SReject's spammer
Added game specific icons in place of generic LoTS icon
Can now /raid raidName 0 to get base info about a raid that doesn't change with health
Fixed bug with command aliases being case sensitive. /SEENRAID colo should now work.
Added /clearchat command
Added /raidstyle command
Kong added some padding to their text boxes that has now been removed from the Omnibox

2012.08.01 - 1.1.0 Stable
Too much to even list. See above and tickets.


2012.08.29 - 1.1.1 
Updated Skorzeny and Temple info
Updated to add Gut-Phager raid
Updated autoload timer

2012.09.04 - 1.1.2
Improved AutoLoad to have more descriptive messages
Added Load Raids In Background

2012.09.05 - 1.1.3
Commented out Load Raids In Background due to ToS concerns
Added new Hound alliance raid

2012.09.12 - 1.1.4
Added new G. Rahn raid

2012.09.18 - 1.1.5
Added /loadpastebin command
Fixed weird height layout issue with game and chat area

2012.09.21 - 1.1.6
Added Cerebral Destroyer WR

2012.10.02 - 1.1.7
Fixed export function in Chrome
Updated hotlinked image location
Updated Python Data

2012.10.18 - 1.1.8
Added /markall filter state command
Altered /autoload timer in some cases
Added /linktools command to list tools links
Added /pasteraids command
Added blob raid
Fixed export function in Chrome, again

2012.11.02 - 1.1.9
Fixed bug with exportraids killing the omnibox
Added two new raids, Nosferatu Nick and Haunted House

2012.11.02 - 1.1.10
Added 3 new Zone A raids, Boar, Cake, and Guan Yu

2012.11.15 - 1.1.11
Added 3 new Zone A raids, Missile Strike, Bashan, and Your Wrath

2012.11.16 - 1.1.12
Fixed bug where Cerebral Destroyed had gotten deleted
Altered the way export raids works until a longer term solution can be provided

2012.11.16 - 1.1.13
Added 3 new Zone A2 raids, Cyborg Shark, Vlarg Relic Hunter, and Anthropist Xenocide Warship
Fixed unknown links to not say Undefined Undefined over and over

2012.11.28 - 1.1.14
Added 3 new Zone A2 raids. Bile Beast, Pi, and Lubu
Added aliases of /loadpastebin as /loadraidbin and /lrb
Added aliases of /exportraids as /exportraid and /er
Added /updateraiddata or /updatedata or /urd command to pull down new raid data as it's available without updating script
Visted and Completed raids won't be matched by a filter unless {state: visited} or {state: completed} are specifically used
Accepted a patch from sycdan doing the following:
- Formatting: Added {state} and {status} as aliases to {cache-state-nice}
- Formatting: Added {state-short} and {status-short} as aliases to {cache-state-short}
- Raids Tab: Links should now get their state updated to match what they do in chat
- Formatting Tab: Sample raid (when all raids are cleared) will now always have FS/OS
- Chat Commands: /clearchat now aliased with /cc and /cls
- Chat Commands: /raid now aliased with some typo checks
- Chat Commands: /loadraid now aliased with /lr
- Chat Commands: /seenraids now aliased with /sr

2012.11.30 - 1.1.15
Added new World Raid: Kraken
Added new World Raid Tab, Timer, and Loot Table
Fixed visited links not showing up ever in /exportraids
Fixed update raid data being annoying

2012.12.11 - 1.1.16
Removed Kraken World Raid info
Added Snowman Rare Spawn info
Altered some WR display code
Performance tuned some raid loading code
Added link formatting for Alliance invites
Added new Alliance Raid: Crazed Santa

2012.12.14 - 1.1.17
Added two new Alliance Raids: SANTA's Workshop and Rabid Reindeer
Updated Snowman rare spawn info, due to new snowman
Added two new Zone 15 Raids: Tentacled Turkey and Hulking Mutant
Added new WR: Christmas Campaign
Added snull preference to snull the snulls in the snull
Added ignore visited raids preference
Added ignore invalid commands preference
Added additional filtering capability to string multiple filters together using ||, like colo|tele 1 || rage|void 4 would give normal tele, normal colossa and colonel, nightmare ragebeasts, nightmare void
Fixed bug loading WR data during update
Reworked how pastebin and autoload work by making them use the same code
With help from Sycdan, added /loadcconoly
Added some help to keep the spammer up to date with known raid data

2013.02.10 - 1.1.18
Fixed issue with /clearraids all not working
Improved help text of a few commands
Corrected and updated /farmvalue a bit
Added marked dead functionality for CConoly
Added os to filters [Sycdan]
Fixed WR Space Pox Icon
Kind of made the broken close icon for the menu suck less, though not totally fixed
Added Zone 16 raids: Screaming Barracuda and Symphony of Two Worlds
Added Zone 17 raids: Al-Husam
Added two Rare Spawns: Cerebral CEO and Space Pox Mary
WR Info page's forum link should now open in a new window/tab
Corrected hard health numbers on a bunch of raids from Z10 on

2013.02.14 - 1.1.19
Altered /lcc <filter> so it runs /loadall <filter> after fetching raids, rather than just filterting the list of newly-fetched raids [sycdan]
Added preference for delay between loading raids [sycdan]
Hid doomscript tabs that were previously labeled under construction.

2013.02.24 - 1.1.20
Fixed a bug that was causing raids to be marked as completed when they were actually being re-joined
Minor code cleanup
Added more timing data to find slow downs
Added aliases to /linktools: /advertise, /blatantselfpromotion, /getdoomscript
Added aliases to /reload: /reloaf, /reloa, /eload
Moved /loadall to ChatCommands folder from Experimental. It's a main feature now, not just an experimental hack. 
Consequently, /loadall will now appear in the correct alphabetical order in the help list
Added /refreshlinks command to cause the links to redraw themselves. This is mainly for when a link refuses to mark visited
All links will now be refreshed after /loadall and /clearraids [sycdan]
Fixed a bug in /clearraids all that was causing /seenraids to still show raids [sycdan]
Cleaned up some CConoly communication code [doomcat/sycdan]
/clearraids ALL was not being accepted. It's now case-insensitive

2013.03.21 - 1.1.21
Fixed missing images on toolbar
Added /rss command
Moved /checkload out of experimental
Added noir raid
Added zone filter
Invalid Raid Id fix [Solsund]

2013.04.04 - 1.1.22
Fixed bug in zone filter not working for /raidstyle
Added size filter
Fixed bug with dynamic loading of Kong page (chat_window div)
Fixed bug where /raidstyle and /markall were not respecting OS filters
Added /forum command [anonimmm]

2013.05.26 - 1.1.23
Fixed critical issues where script is totally broken in Opera. 
Added Penelope Wellerd RS
Added M & S alliance raid
Added Zone 19 Raids: Bethany, Vunlac, R. Dule, Master Hao, and Noir (II)
Tweaked chat icons
Attempted critical Chrome 27 fix

2013.06.18 - 1.1.24
Added H8 RS
Fixed Critical bug from Kong Change

2013.12.18 - 1.1.25
Added Inventor RS & WR
Added Sweet and Jalfreezi alliance raids
Changed defaults
Fixed Critical bug in Latest Firefox [greenkabbage]

2013.12.31 - 1.1.26
Added CMM RS
Fixed default prefs not working
Added new pref to hide world chat

2014.02.21 - 1.1.27
Added Mega Mimes, Neon Knights, and Gamma Hammers Alliance raids
Fixed raid icons

2014.03.08 - 1.1.28
Added Chem-Runners Alliance raid
Added two KX raids, Battle Station and Subjugator
Attempt to handle WC's bad link copying bug

[TODO] Post new Opera instructions
[TODO] Fix missing images on menu
*/

// Wrapper function for the whole thing. This gets extracted into the HTML of the page.
function main()
{
	// Properties for this script
	window.DC_LoaTS_Properties = {
		// Script info
		
    	version: "1.1.28",
    	
    	authorURL: "http://www.kongregate.com/accounts/doomcat",
    	updateURL: "http://www.kongregate.com/accounts/doomcat.chat",
    	scriptURL: "http://userscripts.org/124753",
    	scriptDownloadURL: "http://userscripts.org/scripts/source/124753.user.js",
    	raidDataURL: "http://getKongE.org/old/RaidData.js",
    	worldRaidDataURL: "http://getKongE.org/old/WorldRaidData.js",
    	docsURL: "http://www.tinyurl.com/doomscript-docs",
    	chatzyURL: "http://us5.chatzy.com/46964896557502",
    	
    	joinRaidURL: "http://web1.legacyofathousandsuns.com/kong/raidjoin.php",
    	kongLoaTSURL: "http://web1.legacyofathousandsuns.com/kong/raidjoin.php",
        lotsCDNUrl: "http://5thplanetlots.insnw.net/lots_live/",

        // Other URLS
    	RaidToolsURL: "http://userscripts.org/132671",
    	QuickFriendURL: "http://userscripts.org/125666",
    	PlayNowFixURL: "http://userscripts.org/142619",
    	farmSpreadsheetURL: "https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4",
    	
    	// Do not check code in with this set to true. 
    	// Preferably, turn it on from the browser command line with DC_LoaTS_Properties.debugMode = true;
    	// Or add debugMode=true to the game url in the browser
    	debugMode: (function() {
    		var value = /debugMode=(\w+)/.exec(document.location.href);
    		if (value && value[1]) {
    			return true;
    		}
    		return false;
    	})(),
    	
    	// GreaseMonkey Storage Keys
    	storage: {
	    	// Auto Update
	    	autoUpdate: "DC_LoaTS_autoUpdate",
	    	
	    	// Format of messages in chat
	    	messageFormat: "DC_LoaTS_messageFormat",

	    	// Format of links in chat
	    	linkFormat: "DC_LoaTS_linkFormat",
	    	
	    	// Format of links in chat
	    	customLinkFormatBool: "DC_LoaTS_customLinkFormatBool",
	    	
	    	// Overall container for raid link storage
	    	raidStorage: "RaidManager_doomcat_v1",
	    	
	    	// RaidType Specific preferences
	    	raidPrefs: "DC_LoaTS_raidPreferences",
	    	
	    	// General script behaviour preferences
	    	behaviorPrefs: "DC_LoaTS_behaviorPreferences",
	    	
	    	// Quarantine addendum
	    	quarantine: "_quarantine",
	    		
	    	// Timestamp of last query to cconoly
	    	cconolyLastQueryTime: "DC_LoaTS_cconolyLastQueryTime"
    	}
	};

	
	// Class declaring function for Opera compatibility
	function declareClasses()
	{
		/************************************/
		/****** DC_LoaTS_Helper Class *******/
		/************************************/

		// Manager and runner class for this whole thing
		// This is a PrototypeJS class. Kongregate uses the Prototype libraries, so we don't
		// have to link them ourselves in this script
	    window.DC_LoaTS_Helper = Class.create({
	    		    	
	    	// Constructor
			initialize: function() {
				
				// Initialize the link storage
				RaidManager.init();
				
				// Whether or not to auto update
				var autoUpdate = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate);
				
				// If we don't have a set value for auto update
				if (typeof autoUpdate == "undefined")
				{
					// Default to true
					autoUpdate = true;
					GM_getValue(DC_LoaTS_Properties.storage.autoUpdate, true);
				}
				
				// If we're auto update checking
				if (autoUpdate)
				{
					// Check for updates
					DC_LoaTS_Helper.checkForUpdates();
				}
				
				// Get the raid link for the current page
				var currentPageLink = new RaidLink(window.location.href);
				
				// Check to see if this is a raid link
				if (currentPageLink.isValid())
				{
					// Store this page as visited
					RaidManager.store(currentPageLink, RaidManager.STATE.VISITED);
				}
				
				// Show the raid toolbar
				RaidToolbar.show();

                // Hide the game (or not)
                DC_LoaTS_Helper.handleHideWorldChat(DC_LoaTS_Helper.getPref("HideWorldChat", false));
				
				
				// ChatDialogue is the Kongregate ChatDialogue class that is part of the Kongregate Holodeck
				// See: http://www.kongregate.com/javascripts/holodeck/chat_dialogue.js for readable source
				// We're going to take the normal function that displays a chat message and move it so that
				// we can intercept chat messages and reformat them.
				ChatDialogue.prototype.DC_LoaTS_displayUnsanitizedMessage = ChatDialogue.prototype.displayUnsanitizedMessage;
							
				// Define the NEW function that will display chat messages (we call the old function at the end
				// this is just a reformatter for the better LoaTS links)
				// params:
				// user - user name of the user who sent the message
				// message - message text
				// attributes - an object that usually is undefined, but somtimes contains {class: "CSSclassname"} among others
				// options - Mostly for use with private messages
				ChatDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options)
				{
					Timer.start("Process Message");
					// Be careful not to reprocess messages that we ourselves sent
					if (user.toLowerCase() != "raidbot")
					{
						// Just in case we need it
						var originalMsg = msg;
						
						// Try to create a RaidLink from this message
						var raidLink = new RaidLink(msg);
						
						// Alliance Invite Link
						var allianceInvitePattern = /(?:https?:\/\/)?(?:www\.)?kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns\?kv_action_type=guildinvite&(?:amp;)?kv_fbuid=kong_([^<"']+)/i;
						
						var allianceInviteFormat = "<a href='{0}'>Join {1}'s alliance?</a>";
						
						
						// Make sure we haven't already put a raid link in here and the link we found was valid
						if (msg.indexOf("<span class=\"raidMessage\"") == -1 && raidLink.isValid())
						{
							// Retrieve the message format
							var messageFormat = DC_LoaTS_Helper.getMessageFormat();
							
							// Retrieve the anchor tag format
							var linkFormat = DC_LoaTS_Helper.getLinkFormat();
							
							// Mark the link visited if the current user posted
							if (user == holodeck._active_user._attributes._object.username)
							{
								// Store this link as visted
								RaidManager.store(raidLink, RaidManager.STATE.VISITED);
							}
							else
							{
								// Store this link as-is and let raid manager decide its state
								RaidManager.store(raidLink);
							}
							
							// Get the new message after formatting is applied
							var newMessage = raidLink.getFormattedRaidLink(messageFormat, linkFormat).trim();
							
							// We don't want to totally blow away the message, though, because people do write text in there some times
							msg = msg.replace(/<a(?:(?!<a class="reply_link).)*<\/a>/i, newMessage);
							
							// This means our replace didn't catch it, must be IE link
							if (msg == originalMsg)
							{
								//TODO: Missed this case
								//http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&amp;kv_difficulty=4&amp;kv_hash=Bil9M7W0s5&amp;kv_raid_boss=centurian_sentinel&amp;kv_raid_id=2969908","Legacy\u00a0of\u00a0a\u00a0T……
								//http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=Nw3p60d02T&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3293614

								//s["http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=4cc5r5FTXh&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3315012","Legacy of a Thousand Sun…
								
								//s["http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op","5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty=4&kv_hash=VRoC7Po8CD&kv_raid_boss=kalaxian_cult_mistress&kv_raid_id=3324329","Legacy of a Thousand Sun…


								msg = msg.replace(RaidLink.backupLinkReplacementPattern, newMessage);
							}
							
							// Make sure attributes exists
							if (typeof attributes === "undefined")
							{
								attributes = {};
							}
							
							// Make sure attributes.class exists
							if (typeof attributes["class"] === "undefined")
							{
								attributes["class"] = "";
							}
							
							// Get the className of the link
							var className = raidLink.getMatchedStyles().className;
							if (typeof className !== "undefined")
							{
								attributes["class"] += className;
							}
							
							
							// If still didn't get it, note the problem
							if (msg == originalMsg)
							{
								console.warn("Failed to replace raid link in chat text");
								console.warn(raidLink);
								console.warn($A(arguments));
							}
							
							// Extra debugging bit for a very specific weird behavior
							if (typeof raidLink.getRaid() == "undefined" || typeof raidLink.getRaid().fullName == "undefined" || raidLink.getRaid().fullName === "undefined")
							{
								console.warn("Bad Raid link");
								console.warn(raidLink);
								console.warn($A(arguments));
							}
						}
						else if (allianceInvitePattern.test(msg)) {
							var match = allianceInvitePattern.exec(msg);
							
							msg = msg.replace(/<a(?:(?!<a class="reply_link).)*<\/a>/i, allianceInviteFormat.format(match[0], match[1]));
						}
					}
					
					// Make sure to run the normal version of this function because
					// it does all the heavy lifting for actually displaying the right string
					// and since we can't control what other scripts and addons have also replaced it
					this.DC_LoaTS_displayUnsanitizedMessage(user, msg, attributes, options);
					Timer.stop("Process Message");
				};
								
				// Take all the chat commands and register them with Kongregate
				for (var commandName in DC_LoaTS_Helper.chatCommands)
				{
					// Get the command
					var command = DC_LoaTS_Helper.chatCommands[commandName];
					
					// If there's really a command for this name
					if (typeof command !== "undefined")
					{
						// Create a command factory for this command
						var commandFactory = new RaidCommandFactory(command, "chat");
						
						// Attach the command factory to the holodeck callback
						holodeck.addChatCommand(commandName, commandFactory.createAndExecuteCommand.bind(commandFactory));
					}
				}
				
				// We want to intercept whispers to the raid bot and alias commands
				// What we're going to do here is snag any attempt to execute a command
				// before that command is actually run. Then, we can either capture it
				// and keep it from running at all, change it to run how we want (aliases),
				// or send the command on as intended (like non-raidbot whispers)
				holodeck.DC_LoaTS_processChatCommand = holodeck.processChatCommand;
				holodeck.processChatCommand = function(str)
				{
					// Assume it's not /w RaidBot
					var raidBotWhisper = false;
					
					// If this is a RaidBot whisper, or someone failed to /w
					if (str.substring(0,10).toLowerCase() == "/w raidbot"
						||
						str.substring(0,8).toLowerCase() == "/raidbot"
					   )
					{
						// Grab the command
						var command = str.substring(11).trim();
						
						// If there was no command or the command was help
						if (command.length == 0 || command.toLowerCase() == "help")
						{
							// Print out the about script screen
							return DC_LoaTS_Helper.printScriptHelp(holodeck, command);
						}
						// If this has a real command in it
						else
						{
							// Make sure it started with a /
							if (command.charAt(0) != '/')
							{
								command = "/" + command;
							}
							
							// Process the command as if it was a normal command
							str = command;
						}
						
						// This supressed the command going to chat, even on failure
						// and even if a real command is not found by that name
						raidBotWhisper = true;
					}
					
					//TODO: This process could be optimized a bit when the user starts out using the official command name
					// Iterate over the commands to find their aliases
					for (var commandName in DC_LoaTS_Helper.chatCommands)
					{
						DCDebug(commandName);
						// If the regular command name is here, just use that
						if (new RegExp("^\/" + commandName + "\\b", "i").test(str))
						{
							// Stop trying to find aliases
							break;
						}
						// Not this real command name. Check its aliases.
						else
						{
							// Grab the aliases for this command
							var aliases = DC_LoaTS_Helper.chatCommands[commandName].aliases;
							
							// If there are actually any aliases
							if (typeof aliases != "undefined")
							{
								// For each alias
								for (var i = 0; i < aliases.length; i++)
								{
									// Get this alias
									var alias = aliases[i];
									
									// If we found an alias
									if (new RegExp("^\/" + alias + "\\b", "i").test(str))
									{
										// Redirect to the official command
										str = str.replace(new RegExp(alias, "i"), commandName);
									}
								}
							}
						}
					}
					
					// Capture the resulting state of the chat command
					var chatCommandResult = holodeck.DC_LoaTS_processChatCommand(str);
					var ignoredByPreference = false;
					DCDebug("Chat Command Result for " + str + ": ");
					DCDebug(chatCommandResult);
					
					// If it was a /w RaidBot but we didn't find a command
					if (raidBotWhisper && chatCommandResult)
					{
						// Let the user know the command failed
						holodeck.activeDialogue().raidBotMessage("Did not understand command: <code>" + str + "</code>");
					}
					else if (chatCommandResult && str.indexOf("/") == 0 && str.indexOf("/me") !== 0 && str.indexOf("/wrists") !== 0 && DC_LoaTS_Helper.getPref("IgnoreInvalidCommands", true)) {
						ignoredByPreference = true;

						// Let the user know the command failed
						holodeck.activeDialogue().raidBotMessage("Did not understand command: <code>" + str + "</code> " + DC_LoaTS_Helper.getCommandLink("/w RaidBot help", "Need Help?"));
					}
					
					// Only pass the message along if it wasn't a /w RaidBot and it's not a command and we're not ignoring this message by preference
					return !raidBotWhisper && chatCommandResult && !ignoredByPreference;
				}; // End Replacement displayUnsanitizedMessage
				
				
				// Make sure the ignore visited thing is working
				// TODO: If we ever do more of these, make a framework for it, or something
				DC_LoaTS_Helper.handleIgnoreVisitedRaids();
		    } // End initialize
	    });	
	    
	    // Retrieve the message format
	    DC_LoaTS_Helper.getMessageFormat = function()
	    {
	    	// Retrieve the message format
			var messageFormat = GM_getValue(DC_LoaTS_Properties.storage.messageFormat);

			// Fall back to default messageFormat if necessary
			if (typeof messageFormat == "undefined" || messageFormat.trim().length == 0)
			{
				messageFormat = RaidLink.defaultMessageFormat;
				GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);
			}
			return messageFormat;	
	    }
	    
	    // Set the message format
	    DC_LoaTS_Helper.setMessageFormat = function(messageFormat)
	    {
			// Fall back to default messageFormat if necessary
			if (typeof messageFormat == "undefined" || messageFormat.trim().length == 0)
			{
				messageFormat = RaidLink.defaultMessageFormat;
			}
			
			// Set the message format
			GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);
	    }
	    
	    // Retrieve the link format
	    DC_LoaTS_Helper.getLinkFormat = function()
	    {
			// Retrieve the boolean of whether or not we're using a custom link format
			var customLinkFormatBool = GM_getValue(DC_LoaTS_Properties.storage.customLinkFormatBool);
			
			// If we are using a custom link format
			if (customLinkFormatBool == true)
			{
				// Retrieve the custom anchor tag format
				var linkFormat = GM_getValue(DC_LoaTS_Properties.storage.linkFormat);
				
				// Fall back to default linkFormat if necessary or update old default
				if (typeof linkFormat == "undefined" || linkFormat.trim().length == 0 || linkFormat.trim() == RaidLink.defaultLinkFormat_v1)
				{
					linkFormat = RaidLink.defaultLinkFormat_v2;
					GM_setValue(DC_LoaTS_Properties.storage.linkFormat, linkFormat);
				}
			}
			else
			{
				if (typeof customLinkFormatBool == "undefined")
				{
					GM_setValue(DC_LoaTS_Properties.storage.customLinkFormatBool, false);
				}
				
				linkFormat = RaidLink.defaultLinkFormat_v2;
			}
			return linkFormat;
	    }
	    
	    // Retrieve a preference value from storage
	    DC_LoaTS_Helper.getPref = function(prefName, defaultValue)
	    {
	    	// Fetch the json
	    	var json = GM_getValue(DC_LoaTS_Properties.storage.behaviorPrefs);
	    	
	    	// Make sure there's JSON
	    	if (typeof json === "undefined" || json.length == 0)
	    	{
				json = "{}";
	    	}
	    	
	    	var ret;
	    	try
	    	{
	    		var prefs = JSON.parse(json);
	    		ret = prefs[prefName];
	    	}
	    	catch(ex)
	    	{
	    		console.warn("Could not parse prefs to find " + prefName);
	    		console.warn(ex);
	    	}
	    	
	    	return (typeof ret !== "undefined") ? ret : defaultValue;
	    }
	    
	    // Store a preference value into storage
	    DC_LoaTS_Helper.setPref = function(prefName, value)
	    {
	    	// Fetch the json
	    	var json = GM_getValue(DC_LoaTS_Properties.storage.behaviorPrefs);
	    	
	    	// Make sure there's JSON
	    	if (typeof json == "undefined" || json.length == 0)
	    	{
				json = "{}";
	    	}
	    	
	    	// Store value
	    	try
	    	{
	    		var prefs = JSON.parse(json);
	    		prefs[prefName] = value;
	    		GM_setValue(DC_LoaTS_Properties.storage.behaviorPrefs, JSON.stringify(prefs));
	    	}
	    	catch(ex)
	    	{
	    		console.warn("Could not parse prefs to store " + prefName + ": " + value);
	    		console.warn(ex);
	    	}
	    }
	    
	    // Find all raid types matching a given filter
	    DC_LoaTS_Helper.getRaidTypes = function(raidFilter)
	    {
	    	// We're going to return an array of raid types that match
	    	var matchedTypes = [];
	    	
			// Iterate over all raids
			for (var raidId in DC_LoaTS_Helper.raids)
			{
				// Get the current raid
				var raid = DC_LoaTS_Helper.raids[raidId];
				
				// If the user's text matches this raid name
				if (raidFilter.matches({name: raid.getSearchableName(), size: raid.size, zone: raid.zone}))
				{
					// Capture this raid to return
					matchedTypes.push(raid);
				}
			}
			
			return matchedTypes;
	    }
		
	    // Print the description of the script
	    DC_LoaTS_Helper.printScriptHelp = function(deck, text)
	    {
   			var helpText = "<b>Kongregate Legacy of a Thousand Suns Raid Link Helper for Chat</b>\n";
			helpText += "by <a href=\"" + DC_LoaTS_Properties.authorURL + "\">doomcat</a>\n";
			helpText += "\n";
			helpText += "<b>Script homepage:</b> <a href=\"" + DC_LoaTS_Properties.scriptURL + "\" target='_blank'>" + DC_LoaTS_Properties.scriptURL + "</a>\n";
			helpText += "<b>Script Docs:</b> <a href=\"" + DC_LoaTS_Properties.docsURL + "\" target='_blank'>" + DC_LoaTS_Properties.docsURL + "</a>\n";
			helpText += "<b>Script Chatzy:</b> <a href=\"" + DC_LoaTS_Properties.chatzyURL + "\" target='_blank'>" + DC_LoaTS_Properties.chatzyURL + "</a>\n";
			helpText += "\n";
			helpText += "<span class=\"DC_LoaTS_versionWrapper\">";
			// If we've checked for version before
			if (typeof DC_LoaTS_Helper.needUpdateState != "undefined")
			{
				// If it's time to update
				if (DC_LoaTS_Helper.needUpdateState == "old")
				{
					helpText += DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
					helpText += "\n";
					helpText += "<span class='clearfix'>";
					helpText += "<span style='float:left; padding-top: 5px;'>Update now?</span>";
					helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink' href='http://userscripts.org/scripts/source/124753.user.js' target='_blank'>Update</a></span>";
				}
				// If the user has a newer than public version
				else if (DC_LoaTS_Helper.needUpdateState == "new")
				{
					helpText += DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
				}
				// Either current or some kind of failure
				else
				{
					helpText += "<b>Version:</b> " + DC_LoaTS_Helper.needUpdateText + "\n";
					helpText += "\n";
					helpText += "\n";
					helpText += "<span class='clearfix'>";
					helpText += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
					helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false' href='#' target='_blank'>Check now</a></span>";
				}
				
			}
			// We don't really know what the current version is
			else
			{
					
				helpText += "<b>Version:</b> " + DC_LoaTS_Properties.version + "\n";
				helpText += "\n";
				helpText += "\n";
				helpText += "<span class='clearfix'>";
				helpText += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
				helpText += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false' href='#' target='_blank'>Check now</a></span>";
			}
			
			helpText += "</span>";
			helpText += "\n";
			helpText += "\n";
			helpText += "</span>";
			helpText += "\n";
			helpText += "<b>Commands:</b>\n";
			helpText += "\n";
			
			// Iterate over all commands and display their summaries
			for (var commandName in DC_LoaTS_Helper.chatCommands)
			{
				var command = DC_LoaTS_Helper.chatCommands[commandName];
				if (typeof command.doNotEnumerateInHelp == "undefined" || command.doNotEnumerateInHelp === false)
				{
					if (typeof command.getParamText === "function")
					{
						helpText += "<code>/" + commandName + " " + command.getParamText() + "</code>\n";
					}
				}
			}
			
			helpText += "\n";
			helpText += "All commands can do <code>/commandname help</code> to learn more about them. Brackets <code>[]</code> indicate optional parameters; don't actually put brackets in your commands, please.\n";
			deck.activeDialogue().raidBotMessage(helpText);
			
			
			return false;
	    }
	    
	DC_LoaTS_Helper.chatCommands = {};
	DC_LoaTS_Helper.raidStyles = {};

		/************************************/
		/********* RaidButton Class *********/
		/************************************/
		
		window.RaidButton = Class.create({
			initialize: function(name, className, callback)
			{
				this.name = name || "";
				this.callback = callback;
				this.node = new Element("li", {"class": "DC_LoaTS_button_wrapper " + className + "Wrapper"});
				this.anchor = new Element("a", {"class": "DC_LoaTS_button " + className});
				this.anchor.appendChild(document.createTextNode(this.name));
				this.anchor.observe("click", function(clickEvent)
				{
					this.execute(clickEvent);
				}.bindAsEventListener(this));
				
				this.node.insert({bottom: this.anchor});
			},
			
			execute: function(clickEvent)
			{
				this.callback(clickEvent);
			}
			
		});

		/************************************/
		/********* RaidCommand Class ********/
		/************************************/
		
		// Mainly located by the omnibox iterating over all commands checking to see what matches
		// and each of these being hard assigned to their names for the chat commands
		
		window.RaidCommand = Class.create({
			initialize: function(context, commandText)
			{
				this.context = context;
				this.isHelp = false;
				
				if (typeof commandText != "undefined")
				{
					this.processText(commandText);
				}
			},
			
			processText: function (commandText)
			{
				this.commandText = commandText;
				this.processedText = this.commandText;
				
				if (this.processedText.charAt(0) == '/')
				{
					this.processedText = this.processedText.substring(1);
				}
								
				// If the command was explicitly provided, we need to strip it
				if (this.processedText.toLowerCase().indexOf(this.getName()) == 0)
				{
					this.processedText = this.processedText.substring(this.getName().length);
				}
				else 
				{
					for (var i = 0; i < this.aliases.length; i++)
					{
						var alias = this.aliases[i];
						if (this.processedText.toLowerCase().indexOf(alias) == 0)
						{
							this.processedText = this.processedText.substring(alias.length);
						}
					}
				}
				
				// Now processed text should just be the params. Need to trim the whitespace
				this.processedText = this.processedText.trim();
				
				// Reassemble the normalized commandText				
				this.commandText = "/" + this.getName() + " " + this.processedText;
				
				// Check for help
				if (this.processedText.toLowerCase() == "help")
				{
					this.isHelp = true;
				}
				// Not a help command
				else
				{
					// With the params, get the parser
					if (typeof this.parsingClass != "undefined")
					{
						this.parser = new this.parsingClass(this.processedText);
					}
				}
			},
			
			// Get the param text for help
			getParamText: function()
			{
				return this.constructor.getParamText();
			},
			
			// Get all the names for this command, including both it's actual name and aliases
			getNames: function()
			{
				return [this.getName()].concat(this.aliases);
			},
			
			// Get the name of this command
			getName: function()
			{
				return this.constructor.commandName;
			},
			
			// Get the help text for the command
			getHelpText: function()
			{
				// Default help text to say there isn't help text
				var helpText = "This command does not have any additional help.";
				
				// If the subclass has help text
				if (typeof this.buildHelpText != "undefined")
				{
					// Grab it and set it to be our returned help text
					helpText = this.buildHelpText();
				}
				
				// Append any aliases this command has
				helpText += "\n"
				helpText += "<b>Aliases:</b> " + this.getAliasesText() + "\n";

				return helpText;
			},
			
			// See if the assigned parser has valid params
			//FIXME - Does not work and/or is not used
			isValid: function()
			{
				var valid = true;
				if (typeof this.parsingClass != "undefined")
				{
					var parser = new this.parsingClass(params);
					valid = parser.isValid();
				}
			
				return valid;
			},
			
			// Get the text for all the aliases of this command. Aliases are wrapped in <code></code>tags
			getAliasesText: function()
			{
				var aliasesText = "";
				
				// If there are any aliases
				if (typeof this.aliases != "undefined" && this.aliases.length > 0)
				{
					// Add all the aliases in
					for (var i = 0; i < this.aliases.length; i++)
					{
						// Format the alias
						aliasesText += "<code>/" + this.aliases[i] + "<code>";
						
						// Add commas as necessary
						if (i < this.aliases.length - 1)
						{
							aliasesText += ", ";
						}
					}
				}
				// No aliases
				else
				{
					aliasesText = "None.";
				}
				
				return aliasesText;
			},
			
			// Get a text link to this command
			getCommandLink: function(params, displayText)
			{
				return DC_LoaTS_Helper.getCommandLink("/" + this.getName() + " " + params, displayText);
			},
			
			// Get the drop down menu options for this command
			getOptions: function()
			{
				var commandOptions = {
					
					initialText: {
						text: this.commandName,
						callback: function()
						{
							console.log("mainOption " + this.commandName);
						}
					},
					
					secondOption: {
						text: "Option #2",
						callback: function()
						{
							console.log("secondOption " + this.commandName);
						}
					}
					
				};
				
				return commandOptions;
			},
			
			// Gets the full HTML line for this command's options
			getOptionLine: function(oldLine)
			{
				var commandOptions = this.getOptions();
				
				var line;
				// If we're operating on an existing line
				if (typeof oldLine != "undefined")
				{
					// Put new stuff back into this line
					line = oldLine;
					
					// Clear everything old from this line
					line.childElements().invoke("remove");
				}
				// If there is no existing line
				else
				{
					// Make a new line
					line = new Element("li");
				}
				
				var subOptions = new Element("div", {style: "float: right;"});
				
				var config = commandOptions.config || {};
				
				for (var optionName in commandOptions)
				{
					// Configuration is obviously not a real option
					if (optionName.toLowerCase() == "config")
					{
						continue;
					}
					
					var option = commandOptions[optionName];
										
					var textHolder;
					if (typeof option.callback != "undefined" || typeof option.linkParams != "undefined" || false !== option.executable)
					{	
						
						var linkParams = {"href": "#", "class": "DC_LoaTS_omniboxOption DC_LoaTS_" + optionName.toLowerCase()};
						if (typeof option.linkParams != "undefined")
						{
							for (var paramName in option.linkParams)
							{
								linkParams[paramName] = option.linkParams[paramName];
							}
						}
						
						textHolder = new Element("a", linkParams);
												
						
						textHolder.onclick = function(option)
											 {
					 							if (typeof option.callback != "undefined")
					 							{
													option.callback.apply(this);
					 							}
											 	this.execute(option.doNotCallHandler); 
											 	return (typeof option.followLink != "undefined")?option.followLink:false;
											 }.bind(this, option);
					}
					else
					{
						textHolder = new Element("div", {"class": "DC_LoaTS_" + optionName.toLowerCase()});
					}
					
					if (typeof option.text != "undefined")
					{
						textHolder.update(option.text);
					}
					
					if (optionName == "initialText")
					{
						line.insert({bottom: textHolder});
					}
					else 
					{
						subOptions.insert({bottom: textHolder});
					}
				}
				
				if (subOptions.children.length > 0)
				{
					line.insert({bottom: subOptions});
				}
				else
				{
					line.children[0].setStyle({"float":"none"});
				}
//				
//				var children = $A(line.immediateDescendants());
//				var currentTallest = 0;
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        if (children[i].getHeight() > currentTallest)
//			        {
//		                currentTallest = children[i].getHeight();
//			        }
//				}
//				
//				for (i = 0; i < children.length; i++)
//				{
//			        children[i].setStyle({ height: (currentTallest + 'px') });
//				}
//				
//				
				if (typeof config.refreshEvery == "number" && typeof this.omniboxOptionRefreshInterval == "undefined")
				{
					this.omniboxOptionRefreshInterval = setInterval(this.getOptionLine.bind(this, line), config.refreshEvery);
				}
				
				return line;
			},
			
			// Run this command
			execute: function(doNotCallHandler)
			{
				var ret = {};
				
				// Check for help
				if (this.isHelp == true)
				{
					DCDebug("Executing help for " + this.commandName);
					if (this.context == "chat" || true) //TODO: Remove || true
					{
						holodeck.activeDialogue().raidBotMessage(this.getHelpText());
					}
					else if (this.context == "omnibox")
					{
						console.log("Display help for " + this.commandName);
					}
					else
					{
						console.warn("Could not find help for command " + this.commandText + " in context " + this.context);
					}
				}
				// Not a help command
				else if (typeof doNotCallHandler === "undefined" || !doNotCallHandler)
				{
					DCDebug("Executing non-help for " + this.commandName + " doNotCallHandler: " + doNotCallHandler)
					if (typeof this.parser === "undefined" || (typeof this.parser.isValid === "function" && this.parser.isValid()))
					{
						ret = this.handler(holodeck, this.parser, this.processedText, this.commandText, this.context);
						
						if (typeof ret.statusMessage != "undefined")
						{
							if (this.context == "chat" || true) //TODO: Remove || true 
							{
								holodeck.activeDialogue().raidBotMessage(ret.statusMessage);
							}
							else if (this.context == "omnibox")
							{
								console.log("Display status message: " + ret.statusMessage);
							}
							else
							{
								console.warn("Could not display message " + ret.statusMessage + " for command " + this.commandText + " in context " + this.context);
							}
						}
						
						DCDebug("Command " + this.commandText + (ret.success===true?" Succeeded":" Failed"));
					}
					else
					{
						console.warn("Could not parse text " + this.commandText + " as command " + this.commandName + " in context " + this.context);
					}
				}
				
				ret.sendToChat = this.sendToChat && this.context == "chat";
				
				// Regardless of execution, we need to hide the command options
				RaidToolbar.hideCommandOptions();
				
				// Clear the omnibox, needs work
//				RaidToolbar.resetOmnibox();
				
				return ret;
			},
			
			// Called when the option is no longer in the suggested box
			onRemovedFromOmnibox: function()
			{
				DCDebug("Deactivating " + this.commandName);
				if (typeof this.omniboxOptionRefreshInterval != "undefined")
				{
					clearInterval(this.omniboxOptionRefreshInterval);
					delete this.omniboxOptionRefreshInterval;
				}
			}
		});
		
		RaidCommand.create = function(classObject)
		{
			if (typeof classObject.commandName === "undefined") {
				throw {message: "Cannot create command without name", cls: classObject}; 
			}
			
			if (typeof classObject.aliases === "undefined") {
				classObject.aliases = [];
				console.warn(classObject.commandName + " did not define its aliases");
			}
			
			var commandClass = Class.create(RaidCommand, classObject);
			//TODO: Need to clean this up
			commandClass.commandName = classObject.commandName;
			commandClass.aliases = classObject.aliases;
			commandClass.paramText = classObject.paramText;
			commandClass.parsingClass = classObject.parsingClass;
			//TODO Implement OO framework at some point
			if (typeof commandClass.parsingClass !== "undefined" && typeof commandClass.parsingClass.prototype.isValid !== "function")
			{
				console.warn(commandClass.commandName + " Command Creation Error: Parser must have isValid method!");
			}
			commandClass.doNotEnumerateInHelp = classObject.doNotEnumerateInHelp;
			commandClass.getParamText = function()
			{
				// Assume empty
				var params = "";
				
				// If the command provided text, use that
				if (typeof this.paramText != "undefined")
				{
					params = this.paramText;
				}
				// If the parser can provide us param text, that's great, too
				else if (typeof this.parsingClass != "undefined" && typeof this.parsingClass.paramText == "string")
				{
					params = this.parsingClass.paramText;
				}
				else
				{
					DCDebug("No param text for " + this.commandName);
				}
				
				return params;
			}.bind(commandClass);
			
			
			
			DC_LoaTS_Helper.chatCommands[classObject.commandName] = commandClass;
		};
		
		/************************************/
		/****** RaidCommandFactory Class ****/
		/************************************/

		window.RaidCommandFactory = Class.create({
			
			/*public constructor*/ initialize: function(raidCommandClass, context)
			{
				this.raidCommandClass = raidCommandClass;
				this.context = context;
			},
			
			/*public RaidCommand*/ createCommand: function(text)
			{
				return new this.raidCommandClass(this.context, text);
			},
			
			// Returning true will send the message on to Kongregate chat
			// Returning false will stop the message from being sent
			/*public boolean*/ createAndExecuteCommand: function(deck, text)
			{
				var command = this.createCommand(text);
				DCDebug("Created Command " + this.raidCommandClass.commandName);
				var commandRet = command.execute();
				
				// If the commandRet has sendToChat set to true, the command text typed by the user,
				// 		(Not the command output text) will forward on to chat
				// otherwise, we default to absorbing the command locally
				return commandRet.sendToChat || false;
			}
			
			
		});
		
		/************************************/
		/********* RaidFilter Class *********/
		/************************************/
		
		// This class represents a filter on a raid search
		window.RaidFilter = Class.create({
			
			// Constructor
			initialize: function(filterText)
			{
				Timer.start("RaidFilter init");
				try
				{
					// Declare some vars for later
					this.name;
					this.difficulty;
					this.state;
					this.inverseState = false;
					this.age;
					this.size;
					this.count;
					this.page;
					this.fs;
					this.os;
					this.zone;
					this.valid = true;
	
					// Capture original filterText
					this.filterText = filterText;
					
					// Pattern to pick apart the command for the name and id
					//TODO: /((?:[^{}\d]|[5-9]|\d*\.\d*)+)?\s*([0-4](?:\s*\|\s*[0-4]){0,4})?/
					var commandPattern = /([^0-4{}]+)? ?([0-4])? ?/;
	
					// Attempt to find the matches
					var match = commandPattern.exec(filterText);
					
					// If there were some matches
					if (match != null)
					{
						// If the raid command had a name
						if (typeof match[1] != "undefined")
						{
							this.name = match[1].trim();
						}
						
						// If the raid command had a difficulty
						if (typeof match[2] != "undefined")
						{
							this.difficulty = parseInt(match[2]);
						}
						
					}
					
					// Pattern to match everything that's currently in {filterType: paramValue} form
					var extraFiltersPattern = /(?:{(\w+)[:=]([^{}]+)} ?)/g;
					
					// For every additional parameter type
					while ((match = extraFiltersPattern.exec(filterText)) != null)
					{
						// Name of the param
						var filterType = match[1].trim().toLowerCase();
						
						// Value of the param
						var paramValue = match[2].trim();
						
						// Trace statement
						var traceStatement = "<code>{" + filterType + ":" + paramValue + "}</code> in <code>" + filterText + "</code>";
						
						// Based on the param type, parse the param value
						switch (filterType)
						{
							case "age":
								// Get the pieces of the age
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								// If there were pieces to get
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									var period = match[3];
									
									// If there was a period
									if (typeof period != "undefined")
									{
										switch (period.toLowerCase())
										{
											case "d":
												// 24 hours in a day
												num *= 24;
											case "h":
												// 60 minutes in an hour
												num *= 60;
											case "m":
												// 60 seconds in a minute
												num *= 60;
											case "s":
												// 1000 ms in a second
												num *= 1000;
												break;
											case "ms":
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand unit of time <code>" + period + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no period, assume ms
									
									// Sanitize the condition. Default to <=
									condition = this.sanitizeConditional(condition, "<=");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that age is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression <code>" + paramValue + "</code> for " + traceStatement);
									this.valid = false;
								}
								this.age = condition + num;
								break;
							case "count":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.count = parseInt(paramValue);
								break;
							case "page":
								// If the number wasn't really a number
								if (isNaN(parseInt(paramValue)))
								{
									// Go to the next one.
									continue;
								}
								
								this.page = parseInt(paramValue);
								break;
							case "os":
							case "fs":
							case "size":
								var match = RaidFilter.numberExpressionPattern.exec(paramValue);
								
								if (match != null)
								{
									var condition = match[1];
									var num = parseInt(match[2]);
									
									// If the number wasn't really a number
									if (isNaN(num))
									{
										// Go to the next one.
										continue;
									}
									
									var magnitude = match[3];
									
									// If there was a magnitude
									if (typeof magnitude != "undefined")
									{
										switch (magnitude.toLowerCase())
										{
											case "t":
												num *= 1000;
											case "b":
												num *= 1000;
											case "m":
												num *= 1000;
											case "k":
												num *= 1000;
												break;
											default:
												holodeck.activeDialogue().raidBotMessage("Did not understand magnitude <code>" + magnitude + "</code>  for " + traceStatement);
												this.valid = false;
										}
									}
									// else no magnitude, assume fully written out damage
									
									// Sanitize the condition. Default to ==
									condition = this.sanitizeConditional(condition, "==");
									
									if (condition == "undefined")
									{
										holodeck.activeDialogue().raidBotMessage("Did not understand condition <code>" + condition + "</code>  for " + traceStatement);
										this.valid = false;
									}
								}
								else
								{
									// Notify the user that we don't know what that fs is
									holodeck.activeDialogue().raidBotMessage("Did not understand " + filterType + " expression " + traceStatement);
									this.valid = false;
								}
								this[filterType] = condition + num;
								break;
							case "state":
								var tmpStateText = paramValue;
							
								// Are we doing invese state?
								if (tmpStateText.charAt(0) == '!')
								{
									this.inverseState = true;
									tmpStateText = tmpStateText.substring(1);
								}
								
								// Lookup the state enum from the text
								this.state = RaidManager.STATE.valueOf(tmpStateText);
								
								// If the text didn't match any known state
								if (typeof this.state == "undefined")
								{
									// Notify the user that we don't know what that state is
									holodeck.activeDialogue().raidBotMessage("Did not understand state for "  + traceStatement);
									
									// No longer valid
									this.valid = false;
								}
								break;
							case "zone":
								
								if (isNaN(paramValue)) {
									this.zone = "" + paramValue;
								}
								else {
									this.zone = "Z" + paramValue
								}
								
								this.zone = this.zone.toUpperCase();
								
								break;
							default:
								console.warn("Did not understand filter param " + match[1] + ":" + match[2]);
						}
					}
				}
				catch(ex)
				{
					console.warn("Failed to initialize RaidFilter with text " + filterText);
				}
				Timer.stop("RaidFilter init");
			},
			
			// Takes in a condition and sanitizes it for use in the filter
			sanitizeConditional: function(condition, defaultTo)
			{
				if (typeof condition != "undefined")
				{
					switch (condition)
					{
						case "=": 
							condition = "==";
							break;
						case "!":
							condition = "!=";
							break;
						case "<=":
						case ">=":
						case "==":
						case "!=":
						case "<":
						case ">":
							break;
						default:
							// Print warning to console
							console.warn("Could not parse condition: " + condition);
							
							// Return undefined since there was a problem
							return;
					}
				}
				// If there was no condition passed in
				else
				{
					// Set it to the default
					condition = defaultTo;
				}
				
				// Return the correct condition
				return condition;
			},
			
			// Based on this filter, does a given property match the filter
			matches: function(params)
			{				
				// Init matched to true
				var matched = true;
				
				var STATE = RaidManager.STATE;
				
				// Shortcut to fail any visited, completed, or ignored raids when no state filter is specified
				if (typeof params.state !== "undefined" && !this.state && 
						(
								STATE.equals(params.state, STATE.VISITED) ||
								STATE.equals(params.state, STATE.COMPLETED) ||
								STATE.equals(params.state, STATE.IGNORED)
						)
					) {
					return false;
				}
				
				// Iterate over all the params
				for (var field in params)
				{
					// Grab the value of the field
					var value = params[field];
					
					// If the field is not part of the filter or was undefined in the params
					if (typeof value != "undefined" && typeof this[field] != "undefined")
					{
						switch(field.toLowerCase())
						{
							case "name":
								try {
									// Dirty pi hacks. TODO: Do this better
									var tmpName = (this.name && this.name.toLowerCase() === "pi")?"^pi_":this.name;

									// If the user's text matches this raid name
									matched = matched && new RegExp(tmpName, "i").test(value);
								}
								catch (ex){
									holodeck.activeDialogue().raidBotMessage("Errors occurred while trying to match "  + tmpName + ". " + ex);
									console.log(ex);
									return false;
								}
								break;
							case "difficulty":
								// If the user's difficulty matches the raid
								matched = matched && this.difficulty == value
								break;
							case "state":
								// If the state matches and shouldn't be inverted
								// Or of the state doesn't match and should be inverted
								matched = matched && ((RaidManager.STATE.equals(value, this.state) && !this.inverseState)
										|| 
										(!RaidManager.STATE.equals(value, this.state) && this.inverseState));
								break;
							case "age":
								// Check against the age condition
								matched = matched && eval(value + this.age);
								break;
							case "os":
							case "fs":
							case "size":
								// Check against the fs condition
								matched = matched && eval(value + this[field]);
								break;
							case "count":
								// Check against the count condition
								matched = matched && value < this.count;
								break;
							case "zone":
								matched = matched && value === this.zone;
								break;
							default:
								// Didn't find the field
								console.warn("Couldn't match RaidFilter property to " + field);
								matched = false;
								break;
						}
					}
				}
				
				return matched;
			},
			
			// Gets a key to define this filter
			getKey: function()
			{
				return 	((typeof this.name 			!= "undefined")?"n=" + this.name + ";":"") + 
						((typeof this.difficulty 	!= "undefined")?"d=" + this.difficulty + ";":"") +
						((typeof this.state 		!= "undefined")?"s=" + this.state + ";":"") +
						((typeof this.inverseState 	!= "undefined")?"i=" + this.inverseState + ";":"") +
						((typeof this.age 			!= "undefined")?"a=" + this.age + ";":"") +
						((typeof this.count 		!= "undefined")?"c=" + this.count + ";":"") +
						((typeof this.page 			!= "undefined")?"p=" + this.page + ";":"") +
                        ((typeof this.size          != "undefined")?"e=" + this.size + ";":"") + 
                        ((typeof this.fs            != "undefined")?"f=" + this.fs + ";":"") + 
						((typeof this.os 			!= "undefined")?"o=" + this.os + ";":"") + 
						((typeof this.zone 			!= "undefined")?"z=" + this.zone + ";":"");
			},
			
			// If it has a name and optionally a difficulty and nothing else, it's simple
			isSimple: function()
			{
				return typeof this.name != "undefined" && 
					 (typeof this.state			== "undefined" &&
					  typeof this.inverseState 	== "undefined" &&
					  typeof this.age			== "undefined" &&
					  typeof this.count			== "undefined" &&
					  typeof this.page			== "undefined" &&
                      typeof this.size          == "undefined" &&
                      typeof this.fs            == "undefined" &&
					  typeof this.os			== "undefined" &&
					  typeof this.zone			== "undefined");
			},
			
			isEmpty: function()
			{
				return 	(typeof this.name 			== "undefined") &&
						(typeof this.difficulty 	== "undefined") &&
						(typeof this.state 			== "undefined") &&
						(typeof this.inverseState 	== "undefined") &&
						(typeof this.age 			== "undefined") &&
						(typeof this.count 			== "undefined") &&
						(typeof this.page 			== "undefined") &&
                        (typeof this.size           == "undefined") && 
                        (typeof this.fs             == "undefined") && 
						(typeof this.os 			== "undefined") && 
						(typeof this.zone 			== "undefined");
	
			},
			
			isValid: function()
			{
				return this.valid;
			},
			
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			toString: function()
			{
				return 	(((typeof this.name 			!= "undefined")? this.name + " ":"") +
						 ((typeof this.difficulty 		!= "undefined")? this.difficulty + " ":"") +
						 ((typeof this.state 			!= "undefined")? "{state: " + 
						 
						 ((typeof this.inverseState 	!= "undefined" && this.inverseState == true)? "!":"")
						 + this.state.text + "}"+ " ":"") +
                         ((typeof this.size             != "undefined")? "{size: " + this.size + "} ":"") + 
                         ((typeof this.fs               != "undefined")? "{fs: " + this.fs + "} ":"") + 
						 ((typeof this.os 				!= "undefined")? "{os: " + this.os + "} ":"") + 
						 ((typeof this.zone				!= "undefined")? "{zone: " + this.zone + "} ":"") + 
						 ((typeof this.age 				!= "undefined")? "{age: " + this.age + "ms} ":"") +
						 ((typeof this.count 			!= "undefined")? "{count: " + this.count + "} ":"") +
						 ((typeof this.page 			!= "undefined")? "{page: " + this.page + "} ":"")).trim();
			},
			
			toPrettyString: function() {
				var ret = "";

				// Find the matching raid types
				var matchedTypes = DC_LoaTS_Helper.getRaidTypes(this);

				if (matchedTypes.length > 0)
				{
					// If there's a difficulty
					if (typeof this.difficulty !== "undefined") {
						if (this.difficulty >= 1 && this.difficulty <= 4) {
							ret += RaidType.difficulty[this.difficulty] + " ";
						}
						else {
							return "Filter does not match any raid difficulties";
						}
					}

					// If there's a name
					if (typeof this.name !== "undefined") {

						// If we matched some raid types
						var raids = [];
						for (var i = 0; i < matchedTypes.length; i++)
						{
							// Grab this raid
							raids.push(matchedTypes[i].fullName);
						}

						if (raids.length == 1) {
							ret += raids[0];
						}
						else if (raids.length == 2) {
							ret += raids[0] + " and " + raids[1];
						}
						else {
							var tmp = raids.join(", ");
							ret += tmp.substring(0, tmp.lastIndexOf(", ") + 2) + "and " + tmp.substring(tmp.lastIndexOf(", ") + 2);
						}

					}
				}
				else {
					return "Filter does not match any raid types";
				}					
				
				return ret;
			}
		});
		
		// Parameter text for this parser
		RaidFilter.paramText = "[raidName] [raidDifficulty] [{state: stateParam}] [{size: sizeParam}] [{fs: fsParam}] [{os: osParam}] [{zone: zoneParam}] [{age: ageParam}] [{count: countParam} [{page: pageParam}]]";
		
		// Regex to parse number expressions
		RaidFilter.numberExpressionPattern = /(<=?|>=?|==?|!=?)?\s*(\d+)\s*(\w\w?)?/;
		
		/************************************/
		/**** RaidFilterStyleParser Class ***/
		/************************************/
		
		// Class to parse raid link and style parameters
		window.RaidFilterStyleParser = Class.create({
			initialize: function(params)
			{
				// Split the params at the + that divides the filter from the style
				var parts = params.split("\+");
				
				// Parse the first part as a raid filter
				if (parts.length >= 1)
				{
					this.raidFilter = new RaidMultiFilter(parts[0].trim()); 
				}
				
				// The second part as the link style
				if (parts.length >= 2)
				{
					this.linkStyle = new RaidStyle(parts[1].trim());
				}
				
				// The third part as the message style
				if (parts.length >= 3)
				{
					this.messageStyle = new RaidStyle(parts[2].trim());
				}
				
				// The fourth part as the image style
				if (parts.length >= 4)
				{
					this.imageStyle = new RaidStyle(parts[3].trim());
				}
			},
			
			// Whether or not a link style exists for this parser
			hasLinkStyle: function()
			{
				return typeof this.linkStyle !== "undefined" && !this.linkStyle.isEmpty();
			},
			
			// Whether or not a message style exists for this parser
			hasMessageStyle: function()
			{
				return typeof this.messageStyle !== "undefined" && !this.messageStyle.isEmpty();
			},
			
			// Whether or not an image style exists for this parser
			hasImageStyle: function()
			{
				return typeof this.imageStyle !== "undefined" && !this.imageStyle.isEmpty();
			},
			
			// String describing this parser
			toString: function()
			{
				var ret;
				if (this.isValid())
				{
					ret = "Raids Matching <code>" + this.raidFilter.toString() + "</code> will have ";
					
					if (this.hasLinkStyle())
					{
						ret += "\nLink Style: <code>" + this.linkStyle.toString() + "</code>";
					}
					
					if (this.hasMessageStyle())
					{
						ret += "\nMessage Style: <code>" + this.messageStyle.toString() + "</code>";
					}
					
					if (this.hasImageStyle())
					{
						ret += "\nImage Style: <code>" + this.imageStyle.toString() + "</code>";
					}
				}
				else
				{
					ret = "Invalid Raid Filter Style Parser. Filter: " + (this.raidFilter?this.raidFilter.toString():"Not defined.");
				}
				
				return ret;
			},
			
			// Inject the styles from this parser into the page
			injectStyles: function()
			{
				// Create a class name for this set of styles
				this.className = "DCLH-RFSP-" + RaidFilterStyleParser._lastInjectedStyleId++;
				var rulesText = "";
				
				if (this.hasMessageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + "{" + this.messageStyle.toString() + "}";
				}
				
				if (this.hasLinkStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " a {" + this.linkStyle.toString() + "}";
				}
				
				if (this.hasImageStyle())
				{
					rulesText += "#kong_game_ui .chat_message_window ." + this.className + " img {" + this.imageStyle.toString() + "}";
				}
				
				
				// Locate/Create nodes
				var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				// Style tag type
				style.type = 'text/css';
				
				// Browser dependencies
				if(style.styleSheet)
				{
				    style.styleSheet.cssText = rules.nodeValue;
				}
				else
				{
					style.appendChild(rules);
				}
				
				// Drop in the style node
				head.appendChild(style);
			},
			
			// Check validity of the parser
			isValid: function()
			{
				return typeof this.raidFilter !== "undefined" && this.raidFilter.isValid();
			}
		});
		
		RaidFilterStyleParser._lastInjectedStyleId = 0;

		/************************************/
		/********** RaidLink Class **********/
		/************************************/
		
		// Represents and parses actual raid link
		// Constructor is either
		// new RaidLink(str)
		//	params:
		//		str - Any string containing a raid link. The rest of the string will be ignored.
		//
		// OR
		//
		// new RaidLink(id, hash, difficulty, raidTypeId)
		//	params:
		//		id - kv_raid_id - the unique id for this raid instance
		//		hash - kv_hash - the string hash for the raid
		//		difficulty - kv_difficulty - a number from 1 to 4 where 1 is normal, 4 is nightmare
		//		raidTypeId - kv_raid_boss - the unique key for the raid type
		window.RaidLink = Class.create({
			initialize: function()
			{
				Timer.start("RaidLink init");
				// Capture variable args
				var args = $A(arguments);
				
				// If there's only one arg, must be link text
				if (args.length == 1)
				{
					// Only 1 arg means that it must be a link URL
					var linkURL = args[0];
					
					if (typeof linkURL != "undefined")
					{
                        // Correct for World Chat's broken links
                        linkURL = linkURL.replace("thousand-sunskv_", "thousand-suns?kv_");

						// Execute our regular expression (defined below) against the message
						// This checks to see if the message contained a LoaTS raid link
						var match = RaidLink.linkPattern.exec(linkURL);
						
						// If there was a raid link
						if (match != null)
						{
							// Get Param String
							var paramString = match[0];
							
							// Remove junk
							paramString = paramString.replace(/amp;/gi, "");
							
							// Separate params 
							var params = paramString.split("\?")[1].split("&");
														
							// Put the params together again into this object
							var paramObj = {kv_raid_id: "", kv_hash: ""};
							
							try 
							{
								for (var i = 0; i < 5; i++)
								{
									// If the param wasn't empty
									if (typeof params[i] == "string" &&  params[i] != "")
									{
										// Find the KV pairs
										var paramKV = params[i].split("=");
										
										// If there was something to split
										if (typeof paramKV[1] == "string")
										{
											// Split off any extra junk
											paramKV[1] = paramKV[1].split(/["'] /)[0].replace(/[^\w]/, "");
											
											// Assign the KV pairs
											paramObj[paramKV[0]] = paramKV[1];
										}
									}
								}
							}
							catch(ex)
							{
								console.warn(ex);
							}
													
							// Extract the difficulty
							this.difficulty = paramObj.kv_difficulty;
							
							// Extract the hash
							this.hash = paramObj.kv_hash;
							
							// Extract the raid boss (RaidType.id)
							this.raidTypeId = paramObj.kv_raid_boss;
							
							// Extract the raid id
							this.id = paramObj.kv_raid_id.replace(/\D/g, "");
						}
					}
					else
					{
						console.warn("Attempted make a raid link from an undefined URL");
					}
				}
				// If we got the 4 separate parts rather than a whole link
				else if (args.length > 1)
				{
					// Extract the raid id
					this.id = args[0];

					// Extract the hash
					this.hash = args[1];
					
					// Extract the difficulty
					this.difficulty = args[2];
					
					// Extract the raid boss (RaidType.id)
					this.raidTypeId = args[3];
				}
				else
				{
					console.error("Invalid parameters trying to create a RaidLink. ");
					console.error(args);
				}
								
				Timer.stop("RaidLink init");
			},
			
			getUniqueKey: function()
			{
				return this.id + "_" + this.hash;
			},
			
			getRaid: function()
			{
				// If this link wasn't fully filled out
				if (typeof this.raidTypeId == "undefined" || typeof this.difficulty == "undefined")
				{
					// Look up the same link in the storage
					var savedLink = RaidManager.fetch(this);
					
					// If there's a previous version of the link
					if (typeof savedLink !== "undefined")
					{
						// Capture the save params into this link
						this.raidTypeId = savedLink.raidTypeId;
						this.difficulty = savedLink.difficulty;
					}
				}
				
				// Look up the raid type
				var raid = DC_LoaTS_Helper.raids[(this.raidTypeId||"").toLowerCase()];
				
				// Return the raid type, or if we found nothing, a new empty raid type
				return (typeof raid !== "undefined")? raid : new RaidType(this.raidTypeId);
			},
			
			getMatchedStyles: function()
			{
				// Possible styles to find and apply
				var styleRet = {};
				
				// Attempt to apply styles
				try 
				{
					// Iterate over all the styles
					for (var key in DC_LoaTS_Helper.raidStyles)
					{
						// Get the style manager for the style
						var styleManagers = DC_LoaTS_Helper.raidStyles[key];
						
						// Grab the higher level info about the raid link
						var raidData = RaidManager.fetch(this);
						
						for (var i = 0; i < styleManagers.length; i++)
						{
							// Get the current style manager
							var styleManager = styleManagers[i];
							
							// If this link matches the filter
							if (styleManager.raidFilter.matches(
										{
											age: (new Date()/1) - raidData.firstSeen,
											difficulty: this.difficulty,
											fs:  this.getRaid().getFairShare(this.difficulty),
											os: this.getRaid().getOptimalShare(this.difficulty),
											name: this.getRaid().getSearchableName(),
											state: RaidManager.fetchState(this),
											size: this.getRaid().size,
											zone: this.getRaid().zone
										})
							)
							{
								for (var property in styleManager)
								{
									if ((property.indexOf("Style") > 0 || property.indexOf("className") > -1) && typeof styleManager[property] !== "undefined")
									{
										if (typeof styleRet[property] === "undefined")
										{
											styleRet[property] = "";
										}
										
										styleRet[property] += " " + styleManager[property];
									}
								}
							}
						}
					}
				}
				catch(ex)
				{
					console.warn("Error while finding styles for link:");
					console.warn(this);
					console.warn(ex);
				}
								
				return styleRet;
			},
			
			// Takes in a format returns a formatted text for this link
			getFormattedRaidLinkText: function(messageFormat)
			{
				try
				{
					if (this.isValid())
					{
						// Grab the raid type
						var raid = this.getRaid();
						
						// Start with just an empty template
						var newMessage = messageFormat;
						
						// Grab the link state
						var linkState = RaidManager.fetchState(this);
						
						// Fill in the basic data to the template
						newMessage = newMessage.replace(/{id}/gi, this.id);
						newMessage = newMessage.replace(/{line}/gi, "<br>");
						newMessage = newMessage.replace(/{size}/gi, raid.size);
						newMessage = newMessage.replace(/{stat}/gi, raid.stat);
						newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
						newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
						newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
						newMessage = newMessage.replace(/{zone}/gi, raid.zone);
						newMessage = newMessage.replace(/{name}/gi, raid.fullName);
						newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
						newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
						newMessage = newMessage.replace(/{shortest-name}/gi, raid.shortestName);
						newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());
						
						newMessage = newMessage.replace(/{(?:fs|fair|fairshare)}/gi, raid.getFairShareText(this.difficulty));
						newMessage = newMessage.replace(/{(?:os|opt|optimal|ofs|target)}/gi, raid.getTargetDamageText(this.difficulty));

						newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
						newMessage = newMessage.replace(/{(?:cache-state-nice|state|status)}/gi, linkState.niceText);
						newMessage = newMessage.replace(/{(?:cache-state|state|status)-short}/gi, linkState.shortText);
						newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
						newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
						
						if (typeof linkState == "undefined" || linkState.text == "undefined")
						{
							console.warn("Bad Link State");
							console.warn(linkState);
							console.warn(this);
						}
						
						// FS has special properties, so parse it differently
						var fsMatch = /{fs([^}]*)}/.exec(newMessage);
						
						// How many times we matched an FS
						var fsMatchCount = 0;
						
						// If there were any FS calls
						while (fsMatch != null)
						{
							try
							{
								// Don't get in an infite loop
								if (fsMatchCount >= 5)
								{
									console.warn("Can only match 5 {fs} with math")
									holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
									break;
								}
								
								fsMatchCount++;
								
								// Replace FS and do the math
								newMessage = newMessage.replace(/{fs[^}]*}/, 
									DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
								
								// Find the next FS
								var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
							}
							catch (ex)
							{
								console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
								console.error(ex);
							}
						}
						
						return newMessage.trim();
					}
					else
					{
						console.warn("Tried to get formatted raid link text from invalid link");
						return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")"
					}
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLinkText");
					console.warn(ex);
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Error Formatting Raid (id: " + this.raidTypeId + ")"
				}
			},
			
			// Gets the simplest text possible based on the storage messagen and link formats
			getSimpleText: function()
			{
				if (this.isValid())
				{
					// Retrieve the message format
					var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
					// Retrieve the anchor tag format
					var linkFormat = DC_LoaTS_Helper.getLinkFormat();
					
					// Start with just an empty template
					var newMessage = messageFormat;
					
					// Grab the link state
					var linkState = RaidManager.fetchState(this);
					
					// Grab the raid type
					var raid = this.getRaid();
					
					// Fill in the basic data to the template
					newMessage = newMessage.replace(/{id}/gi, this.id);
					newMessage = newMessage.replace(/{size}/gi, raid.size);
					newMessage = newMessage.replace(/{stat}/gi, raid.stat);
					newMessage = newMessage.replace(/{health}/gi, raid.getHealthText(this.difficulty));
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{diff}/gi, RaidType.shortDifficulty[this.difficulty]);
					newMessage = newMessage.replace(/{zone}/gi, raid.zone);
					newMessage = newMessage.replace(/{name}/gi, raid.fullName);
					newMessage = newMessage.replace(/{short-name}/gi, raid.shortName);
					newMessage = newMessage.replace(/{shorter-name}/gi, raid.colloqName);
					newMessage = newMessage.replace(/{shortest-name}/gi, raid.shortestName);
					newMessage = newMessage.replace(/{time}/gi, raid.getTimeText());

					newMessage = newMessage.replace(/{fs}/gi, raid.getFairShareText(this.difficulty));
					newMessage = newMessage.replace(/{target}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{optimal}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{ofs}/gi, raid.getTargetDamageText(this.difficulty));
					newMessage = newMessage.replace(/{os}/gi, raid.getTargetDamageText(this.difficulty));
					
					newMessage = newMessage.replace(/{cache-state}/gi, linkState.text);
					newMessage = newMessage.replace(/{cache-state-nice}/gi, linkState.niceText);
					newMessage = newMessage.replace(/{cache-state-short}/gi, linkState.shortText);
					newMessage = newMessage.replace(/{visited}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.niceText:"");
					newMessage = newMessage.replace(/{visited-short}/gi, (RaidManager.STATE.equals(linkState, RaidManager.STATE.VISITED))?RaidManager.STATE.VISITED.shortText:"");
					
					// Remove fields we don't want
					newMessage = newMessage.replace(/{line}/gi, "");
					newMessage = newMessage.replace(/{image}/gi, "");
					newMessage = newMessage.replace(/<[^>]+>/gi, "");
					
					
					// FS has special properties, so parse it differently
					var fsMatch = /{fs([^}]*)}/.exec(newMessage);
					
					// How many times we matched an FS
					var fsMatchCount = 0;
					
					// If there were any FS calls
					while (fsMatch != null)
					{
						try
						{
							// Don't get in an infite loop
							if (fsMatchCount >= 5)
							{
								console.warn("Can only match 5 {fs} with math")
								holodeck.activeDialogue().raidBotMessage("Can only match 5 {fs} with math while formatting");
								break;
							}
							
							fsMatchCount++;
							
							// Replace FS and do the math
							newMessage = newMessage.replace(/{fs[^}]*}/, 
								DC_LoaTS_Helper.prettyFormatNumber(eval(raid.getFairShare(this.difficulty)+fsMatch[1])));
							
							// Find the next FS
							var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
						}
						catch (ex)
						{
							console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
							console.error(ex);
						}
					}
					
					return newMessage.trim();
				}
				else
				{
					console.warn("Tried to get simple raid link text from invalid link");
					return "Legacy of a Thousand Suns Raid: [" + RaidType.difficulty[this.difficulty] + "] Unknown Raid (id: " + this.raidTypeId + ")";
				}
							
			},

			// Takes in a message format and a link format and returns a ready to inject link
			getFormattedRaidLink: function(messageFormat, linkFormat)
			{
				Timer.start("getFormattedRaidLink");
				
				// If there was no message format, look it up
				if (typeof messageFormat === "undefined")
				{
					messageFormat = DC_LoaTS_Helper.getMessageFormat();
				}
				
				// If there was no link format, look it up
				if (typeof linkFormat === "undefined")
				{
					linkFormat = DC_LoaTS_Helper.getLinkFormat();
				}
				
				// Get the basics of the message
				var newMessage = this.getFormattedRaidLinkText(messageFormat).trim();
				
				try 
				{
					// Get the text of the message without the image
					var noImage = newMessage.replace(/{image}/gi, "").replace(/<[^>]+>/gi, "").trim();
					
					// Define the image tag
					var imageTag = this.getFormattedImageTag();
					
					// Index of the image tag
					var imageIndex = newMessage.indexOf("{image}");

					// If {image} is in the middle, just lump it in with the text
					if (imageIndex == -1 || (imageIndex > 0 && imageIndex < newMessage.length - "{image}".length))
					{
						newMessage = newMessage.replace(/{image}/gi, imageTag).trim();
						newMessage = linkFormat.replace(/{text}/gi, newMessage);
					}
					// If {image} is at the beginning or end, put it in it's own anchor, for aesthetics
					else
					{
						// At the beginning
						if (newMessage.indexOf("{image}") == 0)
						{
							newMessage = linkFormat.replace(/{text}/gi, imageTag).replace(/class=\"/, "class=\"game_icon_link ") + " " + linkFormat.replace(/{text}/gi, newMessage);
						}
						// At the end
						else
						{
							newMessage = linkFormat.replace(/{text}/gi, newMessage) + " " + linkFormat.replace(/{text}/gi, imageTag);
						}
						
						// Remove images from the message
						newMessage = newMessage.replace(/{image}/gi, "");
					}
					
					
					newMessage = newMessage.replace(/{difficulty}/gi, RaidType.difficulty[this.difficulty]);
					newMessage = newMessage.replace(/{text-no-image}/gi, noImage);
					newMessage = newMessage.replace(/{url}/gi, this.getURL());
					

					
					newMessage = "<span class=\"raidMessage\">" + newMessage + "</span>";


					// Get the styles for this link
//					var styles = this.getMatchedStyles();

//					newMessage = newMessage.replace(/{linkStyle}/gi, styles.linkStyle||"");
				}
				catch(ex)
				{
					console.warn("Error encountered in RaidLink.getFormattedRaidLink");
					console.warn(ex);
				}
				
				Timer.stop("getFormattedRaidLink");
				return newMessage;
			},
			
			// Get the raid name
			getName: function()
			{
				return this.getRaid().fullName;
			},
			
			// Get the difficulty text of the raid
			getDifficultyText: function()
			{
				return RaidType.difficulty[this.difficulty];
			},
			
			// Generate a url for this raid
			getURL: function()
			{
				var raidURL = "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp";
				
				if (typeof this.raidTypeId != "undefined")
				{
					raidURL += "&kv_raid_boss=" + this.raidTypeId;	
				}
				if (typeof this.difficulty != "undefined")
				{
					raidURL += "&kv_difficulty=" + this.difficulty;
				}
				
				// It's easier to inspect the link if the easier to read bits are first
				raidURL += "&kv_raid_id=" + this.id + "&kv_hash=" + this.hash;
				
				return raidURL;
			},
			
			// Get the raid image url, or default to LoaTS icon
			getImageSRC: function()
			{
				// Assume default
				var imageSRC = RaidLink.defaultImageSRC;
				
				// If we have a raidTypeId
				if (typeof this.raidTypeId !== "undefined")
				{
					// Locate the offsite image
					imageSRC = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/" + this.raidTypeId + "_1.jpg";
				}
				
				return imageSRC;
			},
			
			// Get the fully formatted <img> tag for this raid
			getFormattedImageTag: function()
			{				
				// Get the image src
				var imageSRC = this.getImageSRC();
				
				// Fill in image SRC
				var imageTag = RaidLink.defaultImageFormat.replace("{imageSRC}", imageSRC);
				
				return imageTag;

			},
			
			// Generate a param array for this link
			getParamArray: function()
			{
				return [this.id, this.hash, this.difficulty, this.raidTypeId];
			},
			
			// Is this a valid link (to the best of our knowledge)
			isValid: function()
			{
				// All a link needs to be valid is an id and a hash
				return typeof this.id != "undefined" && typeof this.hash != "undefined" && this.id != "" && this.hash != "";
			},
			
			// Necessary for reloading the iFrame
			toQueryParams: function() {
			    return {
			        kv_action_type: "raidhelp", 
			        kv_raid_boss: this.raidTypeId, 
			        kv_difficulty: this.difficulty, 
			        kv_raid_id: this.id, 
			        kv_hash: this.hash
			    };
			}
			
		});
		
		// Parameter text for this parser
		RaidLink.paramText = "url";

		// Define the regular expression (regex) that tells us if a link is a raid link or not
		RaidLink.linkPattern = /(?:https?:\/\/www\.kongregate\.com)?(?:\/games\/)?(?:5thPlanetGames\/legacy-of-a-thousand-suns)?(?!\?4217\-op)\?([^\s,"]*)\b/i;

		// Define a regular expresson to catch busted links
		RaidLink.backupLinkReplacementPattern = /.?\[?"?http:\/\/.*?\?4217\-op","5thPlanetGames\/legacy\-of\-a\-thousand\-suns\?.*?(?:\u2026|\u8320|…|\.\.\.|\]|"|')*$/i;
		
		// Fallback image url if we can't get the provided one
		RaidLink.defaultImageFormat = '<img class="raidIcon" src="{imageSRC}" onerror="RaidLink.fixBrokenImage.apply(this);" />';
		
		// Fallback image url if we can't get the nice one
		RaidLink.defaultImageSRC = "http://cdn2.kongregate.com/game_icons/0033/2679/i.gif?4217-op";
		
		// Fallback message format
		RaidLink.defaultMessageFormat = "{image} {visited-short} {diff} [{size}-{stat}-{fs}-{os}] {shorter-name} ({id})";
		
		// Old link format
		RaidLink.defaultLinkFormat_v1 = "<a class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event, '{url}');\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
		// Fallback link format
		RaidLink.defaultLinkFormat_v2 = "<a style=\"{linkStyle}\" class=\"raidLink raidDiff{difficulty}\" onclick=\"return DC_LoaTS_Helper.raidLinkClick(event);\" onmousedown=\"return DC_LoaTS_Helper.raidLinkMouseDown(event);\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";
		
		// Fix broken images, an inline handler
		RaidLink.fixBrokenImage = function()
		{
			// Get the relevant raid link
			var raidLink = new RaidLink(this.parentNode.href);
			
			// First time failed, check for alternate fail names
			if (this.src === DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/" + raidLink.raidTypeId + "_1.jpg" && this.src != RaidLink.defaultImageSRC)
			{
				switch(raidLink.raidTypeId)
				{
					case "wr_space_pox":
						this.src = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/space_pox_1.jpg";
						break;
					case "dule_warmaster":
						this.src = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/dule_1.jpg";
						break;
					case "hultex_quibberath":
						this.src = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/hultex_1.jpg";
						break;
					case "warden_ramiro":
						this.src = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/post/ramiro_1.jpg";
						break;
					case "purple_lion":
					case "kang":
					case "tourniquet":
					case "flora":
					default:
                        this.src = DC_LoaTS_Properties.lotsCDNUrl + "images/bosses/" + raidLink.raidTypeId + "_small.jpg";
				}
			}
			// Second time failed, switch to default
			else if (this.src != RaidLink.defaultImageSRC)
			{
				this.src = RaidLink.defaultImageSRC;
			}
			// Default failed, no image
			else
			{
				this.src="";
			}
		};
		
		/************************************/
		/**** RaidLinkstateParser Class *****/
		/************************************/
		
		window.RaidLinkstateParser = Class.create({
			initialize: function(params)
			{
				var paramsParts = params.trim().replace(/\s+/g, " ").split(" ");
				var ret;
				if (paramsParts.length != 1 && paramsParts.length != 2)
				{
					ret.success = false;
					ret.statusMessage = "Could not understand <code>" + params + "</code>. Should have one or two parameters: url and optionally state.";
				}
				else
				{
					this.raidLink = new RaidLink(paramsParts[0]);
					this.state;
					var raidLinkIndex = 0;
					if (!this.raidLink.isValid())
					{
						if (paramsParts.length == 2)
						{
							this.raidLink = new RaidLink(paramsParts[1]);
							raidLinkIndex = 1;
						}
					}
					
					if (!this.raidLink.isValid())
					{
						ret.success = false;
						ret.statusMessage = "Could not parse raid link from <code>" + params + "</code>";
					}
					else
					{
						if (paramsParts.length == 2)
						{
							this.state = paramsParts[raidLinkIndex*-1+1];
						}
						
						DCDebug("LinkState: ");
						DCDebug("RaidLink for " + this.raidLink.getName());
						DCDebug("State Param: " + this.state);
					}
				}
				
				return ret;
			},
			
			getName: function()
			{
				return (typeof this.raidLink != "undefined")?this.raidLink.getName():"undefined";
			},
			
			getState: function()
			{
				return this.state;
			},
			
			isValid: function()
			{
				return this.raidLink != "undefined" && this.raidLink.isValid();
			}
		});
		
		// Parameter text for this parser
		RaidLinkstateParser.paramText = "url [newState]";

		
		/************************************/
		/******** RaidManager Utility *******/
		/************************************/
		
		// The RaidManager utility stores information about
		// instances of raids that the user has seen/joined
		// It is not actually a class, but rather just a 
		// collection of static functions
		window.RaidManager = {
			// STATE Enum
			STATE: {
				// The ids below are critical. Please do not ever change the ids, ever.
				// If you create custom states, please set the ids of the new states above 20 
				// to allow for new native ids in the future.
				// Every state with id below 0 is an unknown state
				// Note: Priority may be removed or altered in future releases
				//TODO: Maybe add an equals method to these in init? RaidManager.STATE.equals is a pain
				UNSEEN:  	{id:0, text: "unseen", 		niceText: "Unseen", 		shortText: "(NEW)",	priority: 0},
				//DB_ONLY: 	{id:1, text: "db_only", 	niceText: "From Database", 	shortText: "(DB)",	priority: 1},
				SEEN:    	{id:2, text: "seen", 		niceText: "Seen", 			shortText: "(S)",	priority: 2},
				VISITED: 	{id:3, text: "visited", 	niceText: "Visited", 		shortText: "(V)", 	priority:5},
				IGNORED: 	{id:4, text: "ignored", 	niceText: "Ignored", 		shortText: "(X)", 	priority:10},
				COMPLETED: 	{id:5, text: "completed", 	niceText: "Completed", 		shortText: "(!)", 	priority:99},
				
				// Takes in a state.text or a state.id and looks up the corresponding state
				// Returns a STATE if one is found, undefined otherwise
				/*public static STATE*/ 
				valueOf: function(stateParam)
				{
					// Set up the cache for ids, if it's not already set up
					if (!RaidManager.STATE.cacheById) {
						RaidManager.STATE.cacheById = {};
						for (var stateKey in this)
						{
							var item = this[stateKey];
							// Ignore functions. Check for the state.id or state.text to equal the passed in value
							if (item && item !== "function")
							{
								RaidManager.STATE.cacheById[item.id] = item;
							}
						}
					}
					
					// State we found
					var state;
					
					// If the parameter was a string
					if (typeof stateParam === "string")
					{
						// lowercase it just in case
						stateParam = stateParam.toLowerCase();
					}
					// Otherwise return from the id cache
					else
					{
						return RaidManager.STATE.cacheById[stateParam];
					}
					
					// Iterate over all valid states
					for (var stateKey in this)
					{
						// Ignore functions. Check for the state.id or state.text to equal the passed in value
						if (this[stateKey] && typeof this[stateKey] !== "function"
							&& (this[stateKey].id == stateParam || this[stateKey].text == stateParam)
						   )
						{
							// If we found a state that matches, capture it and break the loop
							state = this[stateKey];
							break;
						}
						else if (typeof this[stateKey] === "undefined")
						{
							console.warn("Invalid State:", stateKey);
						}
					}
					
					// Return the state we found, or undefined if we didn't find one
					return state;
				},
				
				// Returns the UNKNOWN state. Not listed as enumerable on purpose to avoid listing when iterated over
				/*public static STATE*/
				getUnknownState: function()
				{
					return {id: -1, text: "unknown", niceText: "Unknown", shortText: "(?)", priority: -1};
				},
				
				// Compares two states and returns true if they are equal, false otherwise
				/*public static boolean*/ 
				equals: function(state1, state2)
				{
					return (state1 == state2 || 
							(typeof state1 != "undefined" && typeof state2 != "undefined" && 
								(
									(typeof state1.id != "undefined" && state1.id == state2.id)
									||
									(typeof state1.text != "undefined" && state1.text == state2.text)
								)
							)
						   );
				}
			},
			
			// Initialize the raid manager. MUST BE INITIALIZED before it can be used
			/*public static void*/
			init: function()
			{
				Timer.start("RaidManager init");
				
				// Load up everything that's been stored
				var rawRaidStorage = GM_getValue(DC_LoaTS_Properties.storage.raidStorage);
				
				// Make sure the raid storage actually finds what it's supposed to
				if (typeof rawRaidStorage == "undefined" || rawRaidStorage.length == 0)
				{
					// Otherwise default to empty
					rawRaidStorage = "{}";
				}
				
				try
				{
					RaidManager.raidStorage = JSON.parse(rawRaidStorage);
				}
				catch(ex)
				{
					try
					{
						holodeck.activeDialogue.raidBotMessage("Raid link storage has become corrupted and will now be cleared. RaidBot apologizes for the inconvenience. If this happens frequently, please report it.");
					}
					catch (ex2)
					{
						console.warn("Could not display raid bot message to user: Raid link storage has become corrupted and will now be cleared. RaidBot apologizes for the inconvenience. If this happens frequently, please report it.");
						console.warn(ex2);
					}
					
					console.warn("rawRaidStorage was not able to be parsed. For debugging purposes, it will now been quarantined, and the normal raid link storage will be cleared.");
					console.warn(ex)
					
					// Quarantine the current raid storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage + DC_LoaTS_Properties.storage.quarantine, rawRaidStorage);
					
					// Clear the existing corrupted storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, "{}");
					RaidManager.raidStorage = {};

				}
				
				// Count raids we're about to delete
				var clearCount = 0;
				
				// Iterate over all stored data
				for (var key in RaidManager.raidStorage)
				{
					// Grab this raidData item
					var raidData = RaidManager.raidStorage[key];
					
					// The raidData item is actually RaidLink, but storage doesn't retain methods. Add back in the methods
					Object.extend(raidData.raidLink, RaidLink.prototype);
					
					// Clear items that have been stored for more than their total raid length
					if ((new Date()/1) - raidData.firstSeen > raidData.raidLink.getRaid().time * 60*60*1000)
					{
						delete RaidManager.raidStorage[key];
						clearCount++;
					}
				}

				// If anything was cleared, log it for posterity
				if (clearCount > 0)
				{
					console.info("Cleared " + clearCount + " raid" + ((clearCount != 1)?"s":"") + " for being too old");
				}
				
				// Store back into the DB any modifications we made
				GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(RaidManager.raidStorage));
				
				// Update raid preferences
				RaidManager.updateRaidPreferences();
				
				Timer.stop("RaidManager init");
			},
			
			// Update the script with the user's preferences
			// This handles the customized bits of text loaded from memory
			/*public static void*/
			updateRaidPreferences: function()
			{
				// Load up the raid preferences
				var raidPrefs = GM_getValue(DC_LoaTS_Properties.storage.raidPrefs);
				
				// Make sure the raid prefs are populated
				if (typeof raidPrefs != "undefined" && raidPrefs.length > 0)
				{
					RaidManager.raidPrefs = JSON.parse(raidPrefs);
					
					// Iterate over every preference type
					for (var key in RaidManager.raidPrefs)
					{
						var pref = RaidManager.raidPrefs[key];
						
						// Iterate over every variable to change in that preference.
						for (var variable in pref)
						{
							try
							{
								eval(variable + "=" + pref[variable]);
							}
							catch (ex)
							{
								console.warn("Could not update `" + variable + "` to be \"" + pref[variable] + "\".")
								console.warn(ex);
							}
						}
					}
				}
				
				
				

			},
			
			// Clear everything from storage
			/*public static void*/
			clear: function(raidList)
			{
				Timer.start("clear");
				// If there was no list passed in, clear them all
				if (typeof raidList == "undefined")
				{
					// Replace the entire stored dataset with an empty object
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify({}));
					
					// Also clear the memcache
					RaidManager.raidStorage = {};
				}
				else
				{
					// Iterate over everything we need to delete
					for (var i = 0; i < raidList.length; i++)
					{
						delete RaidManager.raidStorage[raidList[i].getUniqueKey()];
					}
					
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(RaidManager.raidStorage));
				}
				
				// Reset the CConoly query time so all the raids can be loaded again
				CConolyAPI.setLastQueryTime(0);
				
				// Reset all the links to NEW
				DC_LoaTS_Helper.updatePostedLinks();
				
				Timer.stop("clear");
			},
			
			// Store a raid link and the state of the link
			// RaidManager.raidStorage is a write-through cache, and the storage is volatile
			// So we have to look up the storage every time we store. This keeps us in sync with
			// other windows of the same browser running the game simultaneously
			/*public static void*/
			store: function(raidLink, state)
			{
				Timer.start("store");
				// If the link is valid
				if (raidLink.isValid())
				{
					Timer.start("store > loading hardRaidStorage");
					// Load up the storage object
					var hardRaidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
					Timer.stop("store > loading hardRaidStorage");
					
					// Attempt to load the passed in raid link
					var raidData = hardRaidStorage[raidLink.getUniqueKey()];
					
					// Lookup the current state
					var currentState;
					var containedInLocalDB = true;
					if (typeof raidData != "undefined")
					{
						// If there is a stateId, use that first
						if (typeof raidData.stateId != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.stateId);
						}
						// If there is an old-style state, use that second
						else if (typeof raidData.state != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.state.text);
						}
					}
					
					// If we couldn't find the current state, set it to UNSEEN
					if (typeof currentState === "undefined")
					{
						currentState = RaidManager.STATE.UNSEEN;
						containedInLocalDB = false;
					}
					
					// If we weren't provided a state param, set it to the current state
					if (typeof state === "undefined")
					{
						state = currentState;
					}
					
					// Keep track of whether or not this link needs to be updated elsewhere
					var shouldUpdateAllLinks = false;
					
					// If we've never seen this link before
					if (typeof raidData == "undefined")
					{
						// Create a new storage container for it, and wrap it
						raidData = {raidLink: raidLink, stateId: state.id, firstSeen: new Date()/1}
						
						// Place this object into the storage
						hardRaidStorage[raidLink.getUniqueKey()] = raidData;						
					}
					// Two unseens upgrade to seen if the link was already in the DB
					else if (containedInLocalDB
							 &&
								RaidManager.STATE.equals(state, RaidManager.STATE.UNSEEN)
								&& 
								RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN)
							 )
					{
					        // Set the new state
					        raidData.stateId = RaidManager.STATE.SEEN.id;
					       
					        // Changed state
					        shouldUpdateAllLinks = true;
					}
					// If we have seen this link before, change the links state if necessary
					else if (!RaidManager.STATE.equals(currentState, state))
					{
						// Set the new state
						raidData.stateId = state.id;
						
						// Since we changed state, need to update all those links
						shouldUpdateAllLinks = true;
					}
					else
					{
						// Just double check to make sure the state id has been set
						// Helps convert old states to new ones
						raidData.stateId = currentState.id;
					}
					
					// If we should report dead raids and this one is dead and it hasn't been reported yet
					if (DC_LoaTS_Helper.getPref("ReportDeadRaids", true) && RaidManager.STATE.equals(state, RaidManager.STATE.COMPLETED) && !raidData.reported) {
						raidData.reported = true;
						DC_LoaTS_Helper.reportDead(raidLink);
					}
					
					// Update the lastSeen time of the link
					raidData.lastSeen = new Date()/1;
					
					Timer.start("store > storing hardRaidStorage");
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(hardRaidStorage));
					Timer.stop("store > storing hardRaidStorage");
					
					Timer.start("store > extending raid links");
					//TODO Work around this (update: not really that big of a deal based on timer data)
					// Gotta have the methods attached to the objects
					for (var key in hardRaidStorage)
					{
						// If we're missing methods, add them
						if (typeof hardRaidStorage[key].raidLink.getRaid != "function")
						{
							Object.extend(hardRaidStorage[key].raidLink, RaidLink.prototype);		
						}
					}
					Timer.stop("store > extending raid links");
					
					// Update the cache
					RaidManager.raidStorage = hardRaidStorage;
					
					// If we found a reason to update all versions of this link
					if (shouldUpdateAllLinks)
					{
						// Update the posted links
						DC_LoaTS_Helper.updatePostedLinks(raidLink);
					}
				}
				else
				{
					console.warn("Did not store because link was invalid or storage unavailable");
				}
				
				Timer.stop("store");
			},
			
			// Store a list of raid links and the state of the links
			// RaidManager.raidStorage is a write-through cache, and the storage is volatile
			// So we have to look up the storage every time we store. This keeps us in sync with
			// other windows of the same browser running the game simultaneously
			/*public static void*/
			storeBulk: function(raidLinks, state)
			{
				Timer.start("store bulk");

				// Load up the storage object
				Timer.start("store > loading hardRaidStorage");
				var hardRaidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
				Timer.stop("store > loading hardRaidStorage");
				
				// Declare a bunch of vars. Don't forget there's no such thing as block scope
				var raidLink, raidData, currentState, newState, containedInLocalDB, shouldUpdateAllLinks;
				
				// Capture all the valid links we're actually going to store
				var outboundLinks = [];
				
				for (var i = 0; i < raidLinks.length; i++) {
					
					raidLink = raidLinks[i];
					state = undefined;
					
					// Valid link?
					if (raidLink.isValid()) {
						
						// Remember the valid ones
						outboundLinks.push(raidLink);
					
						// Attempt to load the passed in raid link
						raidData = hardRaidStorage[raidLink.getUniqueKey()];
						
						// Lookup the current state
					    containedInLocalDB = true;
					    currentState = null;
						if (raidData)
						{
							// If there is a stateId, use that first
							if (raidData.stateId)
							{
								currentState = RaidManager.STATE.valueOf(raidData.stateId);
							}
							// If there is an old-style state, use that second
							else if (raidData.state)
							{
								currentState = RaidManager.STATE.valueOf(raidData.state.text);
							}
						}
						
						// If we couldn't find the current state, set it to UNSEEN
						if (!currentState)
						{
							currentState = RaidManager.STATE.UNSEEN;
							containedInLocalDB = false;
						}
						
						// Set the new state. It's either going to be the new parameter state or the existing state
						newState = state || currentState;
						
						// Keep track of whether or not this link needs to be updated elsewhere
						shouldUpdateAllLinks = false;
						
						// If we've never seen this link before
						if (!raidData)
						{
							// Create a new storage container for it, and wrap it
							raidData = {raidLink: raidLink, stateId: newState.id, firstSeen: new Date()/1}
							
							// Place this object into the storage
							hardRaidStorage[raidLink.getUniqueKey()] = raidData;						
						}
						// Two unseens upgrade to seen if the link was already in the DB
						else if (containedInLocalDB
								 &&
									RaidManager.STATE.equals(newState, RaidManager.STATE.UNSEEN)
									&& 
									RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN)
								 )
						{
						        // Set the new state
						        raidData.stateId = RaidManager.STATE.SEEN.id;
						       
						        // Changed state
						        shouldUpdateAllLinks = true;
						}
						// If we have seen this link before, change the links state if necessary
						else if (!RaidManager.STATE.equals(currentState, newState))
						{
							// Set the new state
							raidData.stateId = newState.id;
							
							// Since we changed state, need to update all those links
							shouldUpdateAllLinks = true;
						}
						else
						{
							// Just double check to make sure the state id has been set
							// Helps convert old states to new ones
							raidData.stateId = currentState.id;
						}
												
						// Update the lastSeen time of the link
						raidData.lastSeen = new Date()/1;
						
						// If we should report dead raids and this one is dead and it hasn't been reported yet
						if (DC_LoaTS_Helper.getPref("ReportDeadRaids", true) && RaidManager.STATE.equals(newState, RaidManager.STATE.COMPLETED) && !raidData.reported) {
							raidData.reported = true;
							DC_LoaTS_Helper.reportDead(raidLink);
						}
					}
				} // End for iterating over the links
				
				Timer.start("store > storing hardRaidStorage");
				// Store the storage data back into the browser storage
				GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(hardRaidStorage));
				Timer.stop("store > storing hardRaidStorage");
				
				Timer.start("store > extending raid links");
				//TODO Work around this (update: not really that big of a deal based on timer data)
				// Must have the methods attached to the objects
				for (var key in hardRaidStorage)
				{
					// If we're missing methods, add them
					if (typeof hardRaidStorage[key].raidLink.getRaid !== "function")
					{
						Object.extend(hardRaidStorage[key].raidLink, RaidLink.prototype);		
					}
				}
				Timer.stop("store > extending raid links");
				
				// Update the cache
				RaidManager.raidStorage = hardRaidStorage;
				
				// Update the posted links. 
				DC_LoaTS_Helper.updatePostedLinks();
				
				Timer.stop("store bulk");
				
				return outboundLinks;
			},
			
			// Lookup RaidData for a given link
			/*public static RaidData*/
			fetch: function(raidLink)
			{
				Timer.start("fetch");
				
				// Declare the return var
				var raidData;
				
				if (raidLink.isValid())
				{
					// Attempt to load the passed in raid link
					raidData = RaidManager.raidStorage[raidLink.getUniqueKey()];
										
					// If the link is in storage
					if (raidData && typeof raidData.raidLink.getRaid !== "function")
					{
						// Add in the functions that you expect to see on those objects
						Object.extend(raidData.raidLink, RaidLink.prototype);
					}
				}
				
				Timer.stop("fetch");
				
				// Return what we found or undefined
				return raidData;
			},
			
			// Returns the raid storage
			/*public static Object*/
			fetchStorage: function()
			{
				// Return the whole thing
				return RaidManager.raidStorage;
			},
			
			// Returns the all stored raid links
			/*public static Array*/
			fetchAll: function()
			{
				// Holder for raid links
				var raidLinks = new Array();
				
				// For everything in storage
				for (var key in RaidManager.raidStorage)
				{
					// Pull the raid data
					var raidData = RaidManager.raidStorage[key];
					
					// It should exist, but just in case
					if (typeof raidData != "undefined")
					{
						// Collect the links into the array
						raidLinks.push(raidData.raidLink);
					}
					
				}
				
				// Return all the links
				return raidLinks;
			},
			
			// Returns the state of a link, or UNSEEN if the link hasn't been stored
			/*public static STATE*/
			fetchState: function(raidLink)
			{
				// Attempt to load the raid link
				var raidData = RaidManager.fetch(raidLink);
				
				// If the raid link has been seen before
				if (typeof raidData !== "undefined")
				{
					if (typeof raidData.stateId !== "undefined")
					{
						// Return its state
						return RaidManager.STATE.valueOf(raidData.stateId);
					}
					else if (typeof raidData.state !== "undefined")
					{
						// Return its state
						return RaidManager.STATE.valueOf(raidData.state.text);
					}
				}
				
				// Since we haven't seen it, return UNSEEN
				return RaidManager.STATE.UNSEEN;
			},
			
			// Parameterized command line raid lookup
			/*public static Array*/
			fetchByFilter: function(filterParam)
			{
				Timer.start("fetchByFilter");
				try 
				{
					var raidFilter;
					
					// If we got text and not a RaidFilter
					if (typeof filterParam == "string")
					{
						// Parse the command into a RaidFilter
						raidFilter = new RaidMultiFilter(filterParam);
					}
					// We got something other than text. Assume it's a RaidFilter
					else if (filterParam instanceof RaidFilter || filterParam instanceof RaidMultiFilter)
					{
						// filterParam was already a raidFilter
						raidFilter = filterParam;
					}
					else
					{
						console.warn("Could not fetch by filter " + filterParam + ". Parameter must be a String or RaidFilter");
						return;
					}
					
					// If the command makes a valid filter
					if (raidFilter.isValid())
					{
						// Collect all matching raid links
						var raidLinks = new Array();
						
						// If there was no name or difficulty
						if (raidFilter.isEmpty())
						{
							// Get all raid links
							raidLinks = RaidManager.fetchAll();
						}
						// If we found a raid name, difficulty, or state 
						else 
						{
							// Get all raids
							var raidStorage = RaidManager.fetchStorage();
							
							// Count of raids seen
							var raidCount = 0;
							
							// Count of raids seen
							var resultsPage = 1;
							
							// Start time of the run
							var commandStartTime = (new Date() / 1);
							
							// Iterate over all raids
							for (var key in raidStorage)
							{
								// Get the raid data from storage
								var raidData = raidStorage[key];
								
								// Get the current raidLink
								var raidLink = raidData.raidLink;
								
								// Get the state of the link
								var currentState;
								if (typeof raidData.stateId != "undefined")
								{
									currentState = RaidManager.STATE.valueOf(raidData.stateId);
								}
								else if (typeof raidData.state != "undefined" && typeof raidData.state.text != "undefined")
								{
									currentState = RaidManager.STATE.valueOf(raidData.state.text);
								}
								
								if (typeof currentState == "undefined")
								{
									console.warn("Could not locate a state for " + raidLink.getSimpleText() + ". This may cause unexpected matching behavior.");
								}
								
								try
								{
									// If this link matches the filter
									if (raidFilter.matches(
										{
											age: commandStartTime - raidData.firstSeen,
											difficulty: raidLink.difficulty,
											fs: raidLink.getRaid().getFairShare(raidLink.difficulty),
											os: raidLink.getRaid().getOptimalShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: raidCount,
											size: raidLink.getRaid().size,
											zone: raidLink.getRaid().zone
										}
										))
									{
										//TODO: Improved Sorting
										// If we don't have a defined page, or we're on the right page, or we don't care about the count
										if (typeof raidFilter.page == "undefined" || resultsPage == raidFilter.page || typeof raidFilter.count == "undefined")
										{
											// Put seen links at the end
											if (RaidManager.STATE.equals(currentState, RaidManager.STATE.SEEN))
											{
												raidLinks.push(raidLink);
											}
											// Put visited and other links up top
											else
											{
												raidLinks.unshift(raidLink);
											}
										}
										
										// Keep track of how many raids match the query so we can deal with pagination
										raidCount++;
										if (raidFilter.count != "undefined" && raidCount % raidFilter.count == 0) {resultsPage++;raidCount=0;}
										
										// Once we've collected enough links, bail
										// If count is not set, we'll only break when we've iterated over all raids
										if (raidLinks.length == raidFilter.count)
										{
											break;
										}
									}
								}
								catch(ex)
								{
									console.warn(ex);
									console.warn("Failure while trying to match ");
									console.warn(
										{
											age: commandStartTime - raidData.firstSeen,
											difficulty: raidLink.difficulty,
											fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
											name: raidLink.getRaid().getSearchableName(),
											state: currentState,
											count: raidCount
										}
									);
								}
							}
						}
						
						Timer.stop("fetchByFilter");
	
						// Return all found links
						return raidLinks;
					}
				}
				catch (ex)
				{
					console.warn("Failed to lookup raids by ");
					console.warn(filterParam);
					console.warn(ex);
				}
				Timer.stop("fetchByFilter");
			},
			
			markByFilter: function(filter, state) {
				Timer.start("markByFilter");
				
				if (typeof filter === "string") {
					filter = new RaidMultiFilter(filter);
				}
				
				if (typeof state === "string") {
					state = RaidManager.STATE.valueOf(state.toUpperCase());
				}
				
				// Count of raids seen
				var raidCount = 0;
				
				// If the command makes a valid filter
				if (filter.isValid())
				{
					// Get all raids
					Timer.start("markByFilter > loading hardRaidStorage");
					// Load up the storage object
					var raidStorage = JSON.parse(GM_getValue(DC_LoaTS_Properties.storage.raidStorage));
					Timer.stop("markByFilter > loading hardRaidStorage");
					
					// Count of raids seen
					var resultsPage = 1;
					
					// Start time of the run
					var commandStartTime = (new Date() / 1);
					
					// Iterate over all raids
					for (var key in raidStorage)
					{
						// Get the raid data from storage
						var raidData = raidStorage[key];
						
						// Get the link from the data
						var raidLink = raidData.raidLink;
						
						// Convert to RaidLink
						Object.extend(raidLink, RaidLink.prototype);
						
						// Get the state of the link
						var currentState;
						if (typeof raidData.stateId != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.stateId);
						}
						else if (typeof raidData.state != "undefined" && typeof raidData.state.text != "undefined")
						{
							currentState = RaidManager.STATE.valueOf(raidData.state.text);
						}
						
						if (typeof currentState == "undefined")
						{
							console.warn("Could not locate a state for " + raidLink.getSimpleText() + ". This may cause unexpected matching behavior.");
						}
						
						try
						{
							// If this link matches the filter
							if (filter.matches(
								{
									age: commandStartTime - raidData.firstSeen,
									difficulty: raidLink.difficulty,
                                    fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
                                    os:  raidLink.getRaid().getOptimalShare(raidLink.difficulty),
									name: raidLink.getRaid().getSearchableName(),
									state: currentState,
									count: raidCount,
									size: raidLink.getRaid().size,
									zone: raidLink.getRaid().zone
								}
								))
							{
								raidData.stateId = state.id;
								
								// Keep track of how many raids match the query so we can deal with pagination
								raidCount++;
								if (filter.count != "undefined" && raidCount % filter.count == 0) {resultsPage++;raidCount=0;}
								
								// Once we've changed enough links, bail
								// If count is not set, we'll only break when we've iterated over all raids
								if (raidCount == filter.count)
								{
									break;
								}
							}
						}
						catch(ex)
						{
							console.warn(ex);
							console.warn("Failure while trying to match ");
							console.warn(
								{
									age: commandStartTime - raidData.firstSeen,
									difficulty: raidLink.difficulty,
									fs:  raidLink.getRaid().getFairShare(raidLink.difficulty),
									name: raidLink.getRaid().getSearchableName(),
									state: currentState,
									count: raidCount
								}
							);
						}
					}
					
					Timer.start("markByFilter > storing hardRaidStorage");
					// Store the storage data back into the browser storage
					GM_setValue(DC_LoaTS_Properties.storage.raidStorage, JSON.stringify(raidStorage));
					Timer.stop("markByFilter > storing hardRaidStorage");
				}
				
				Timer.stop("markByFilter");
				
				return raidCount;
			}
		}

		/************************************/
		/********** RaidMenu Class **********/
		/************************************/
		
		// TODO: RaidMenu coming soon!
		// Class to manage a popup raid menu
		// There can only be a single raid menu at a time. The constructor will enforce this
		window.RaidMenu = Class.create({
			initialize: function()
			{
				// Find the existing RaidMenu
				this.container = document.getElementById("DC_LoaTS_raidMenu");
				
				// If a RaidMenu doesn't exist yet, make it
				if (typeof this.container == "undefined" || this.container == null)
				{
					// Hooks to register and unregister
					this._startDragHook = this._startDrag.bind(this);
					this._performDragHook = this._performDrag.bind(this);
					this._stopDragHook = this._stopDrag.bind(this);

					this.container = document.createElement("div");
					this.container.id = "DC_LoaTS_raidMenu";
					$(this.container).hide();
					document.body.appendChild(this.container);
					
					this.titleBarWrapper = document.createElement("div");
					this.titleBarWrapper.id = "DC_LoaTS_raidMenuTitleBarWrapper";
					this.titleBarWrapper.className = "clearfix";
					this.container.appendChild(this.titleBarWrapper);
					
					this.titleBar = document.createElement("div");
					this.titleBar.id = "DC_LoaTS_raidMenuTitleBar";
					this.titleBarWrapper.appendChild(this.titleBar);
					DC_LoaTS_Helper.registerEventHandler(this.titleBar, "mousedown", this._startDragHook);
					
					var titleBarLeft = document.createElement("div");
					titleBarLeft.id = "DC_LoaTS_raidMenuTitleBarLeft";
					titleBarLeft.appendChild(document.createTextNode("LoaTS Helper Menu"));
					this.titleBar.appendChild(titleBarLeft);
					
					this.titleBarCenter = document.createElement("div");
					this.titleBarCenter.id = "DC_LoaTS_raidMenuTitleBarCenter";
					this.titleBar.appendChild(this.titleBarCenter);
					
					var titleBarRight = document.createElement("div");
					titleBarRight.id = "DC_LoaTS_raidMenuTitleBarRight";
					this.titleBar.appendChild(titleBarRight);


					// Set up the close button
					this.titleBarClose = document.createElement("img");
					this.titleBarClose.id = "DC_LoaTS_raidMenuClose";
					this.titleBarClose.src = "https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/base.png";					
					this.titleBarClose.setAttribute("usemap", "#raidMenuCloseMap");
					this.titleBarWrapper.appendChild(this.titleBarClose);
					
					// We only want the hover effect to work on the red triangle, so we'll need a click map
					this.titleBarCloseMap = document.createElement("map");
					this.titleBarCloseMap.name = "raidMenuCloseMap";
					this.titleBarCloseMap.id = "raidMenuCloseMap";
					this.titleBarWrapper.appendChild(this.titleBarCloseMap);
					
					// Define the click map for the triangle close image.
					// This is the area that responds to clicks and hover effects
					var titleBarCloseArea = document.createElement("area");
					titleBarCloseArea.shape = "poly";
					titleBarCloseArea.coords = "12,6,50,42,50,6,46,1,42,0,19,-1";
					titleBarCloseArea.href = "#";
					titleBarCloseArea.setAttribute("onclick", "RaidMenu.toggle(); return false;");
					titleBarCloseArea.setAttribute("onmouseover", "$('DC_LoaTS_raidMenuClose').src = 'https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hover.png';");
					titleBarCloseArea.setAttribute("onmouseout", "$('DC_LoaTS_raidMenuClose').src = 'https://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/base.png';");
					this.titleBarCloseMap.appendChild(titleBarCloseArea);

					
					// This is where the panes go
					this.bodyWrapper = document.createElement("div");
					this.bodyWrapper.id = "DC_LoaTS_raidMenuBodyWrapper";
					this.container.appendChild(this.bodyWrapper);
					
					// This is where the tabs go
					this.tabsList = document.createElement("ul");
					this.tabsList.id = "DC_LoaTS_raidMenuTabs"
					this.bodyWrapper.appendChild(this.tabsList);


					// Activate tab container
					this.tabs = new Control.Tabs('DC_LoaTS_raidMenuTabs');

					// Holder for activated tabs
					this.activatedTabs = {};
					
					// Activate tabs
					this._activateTabs();
				}
			},
			
			// Resorts the tabs according to their position
			// TODO: RaidMenu should probably have an addTab() where it manages this
			resortTabs: function() {
				
				var tabs = this.tabsList.getElementsByTagName("li");
				console.log(tabs);
				
			},
			
			// Toggles the visibility of the raid menu
			/*public void*/
			toggle: function()
			{
				this.container.toggle();
			},
			
			// Show the raid menu
			/*public void*/
			show: function()
			{
				this.container.show();
			},
			
			// Hide the raid menu
			/*public void*/
			hide: function()
			{
				this.container.hide();
			},
			
			// Activates the tab classes. Probably don't call this except once in initialize
			/*private void*/
			_activateTabs: function()
			{
				// Create all the tabs
				for (var tabPosition in RaidMenu.tabClasses)
				{
					try 
					{
						this.activatedTabs[tabPosition] = new RaidMenu.tabClasses[tabPosition](this);
					}
					catch (ex)
					{
						console.warn("Error activating tab in position " + tabPosition);
						console.warn(ex);
					}
				}
				
				// Activate first tab
				this.tabs.first();
			},
			
			activateTab: function(tabClass) {
				this.activatedTabs[tabClass.tabPosition] = new tabClass(this);
			},
			
			// Event fired as the menu title has been clicked
			/*private void*/	
			_startDrag: function(e)
			{
				// Half-hearted IE check
				var evt = e || window.event;
				
				// Detect right click
				var rightclick;
				if (evt.which)
				{
					rightclick = (evt.which == 3);
				}
				else if (evt.button)
				{
					rightclick = (evt.button == 2);
				}
				
				// Don't start dragging on right click
				if (rightclick)
				{
					return;
				}
				
				// Mark that it's being dragged
				this.beingDragged = true;
				
				// Capture the drag start point in order to calculate movement
				this.preDragLeft = this.container.offsetLeft;
				this.preDragTop = this.container.offsetTop;
				this.startingMouseX = evt.clientX;
				this.startingMouseY = evt.clientY;
				
				// Register the listeners for the rest of the drag
				DC_LoaTS_Helper.registerEventHandler(document, "mousemove", this._performDragHook);
				DC_LoaTS_Helper.registerEventHandler(document, "mouseup", this._stopDragHook);
				
				// This should hopefully keep it from selecting text and doing anything else
				// that normal clicking would do
				return DC_LoaTS_Helper.stopDefaultEventAction(evt);
			},
			
			// Event fired as the menu is being actually dragged
			/*private void*/
			_performDrag: function(e)
			{
				// Half-hearted IE check
				var evt = e || window.event;
				
				// Move the menu based on the user's mouse movements
				this.container.style.left = Math.max(this.preDragLeft + (evt.clientX-this.startingMouseX), 0) + "px";
				this.container.style.top = Math.max(this.preDragTop + (evt.clientY-this.startingMouseY), 0) + "px";
				
				// This should hopefully keep it from selecting text and doing anything else
				// that normal dragging would do
				return DC_LoaTS_Helper.stopDefaultEventAction(evt);
			},
			
			//Event fired as the mouse is released at the end of a drag
			/*private void*/
			_stopDrag: function(e)
			{
				// Mark that it's no longer being dragged
				this.beingDragged = false;
				
				// Remove the event listeners
				DC_LoaTS_Helper.unregisterEventHandler(document, "mousemove", this._performDragHook);
				DC_LoaTS_Helper.unregisterEventHandler(document, "mouseup", this._stopDragHook);

				// Release the variables holding the previous locations
				delete this.preDragLeft;
				delete this.preDragTop;
				delete this.startingMouseX;
				delete this.startingMouseY;
			}
		});
		
		// Put in a place holder for the tabs
		RaidMenu.tabClasses = {};
		
		// Ensure the raid menu is available
		/*public static RaidMenu*/
		RaidMenu.getInstance = function()
		{
			// Locate or create a raid menu
			var raidMenu = window.raidMenu;
			if (typeof raidMenu == "undefined")
			{
				try
				{
					raidMenu = new RaidMenu();
					window.raidMenu = raidMenu;
				}
				catch(ex)
				{
					console.error("Error while opening raid menu");
					console.error(ex);
					return;
				}
			}
			
			return raidMenu;
		}


		
		// Toggle the visibility of the raid menu
		/*public static void*/
		RaidMenu.toggle = function()
		{
			// Toggle its visibility
			RaidMenu.getInstance().toggle();
		}


		// Show the raid menu
		/*public static void*/
		RaidMenu.show = function()
		{
			// Show it
			RaidMenu.getInstance().show();
		}


		// Hide the raid menu
		/*public static void*/
		RaidMenu.hide = function()
		{
			// Hide it
			RaidMenu.getInstance().hide();
		}


		/************************************/
		/******** RaidMenuTab Class *********/
		/************************************/
		
		// Class to manage a tab in the raid popup menu
		window.RaidMenuTab = Class.create({
			initialize: function(parentMenu)
			{
				//console.log("Creating tab ", arguments);
				this.parentMenu = parentMenu;
				var me = this;
				
				var sanitaryName = me.getSanitizedName();
				me.tabLi = document.createElement("li");
				me.tabLi.className = "DC_LoaTS_raidMenuTab";
				me.parentMenu.tabsList.appendChild(me.tabLi);
				
				me.tabA = document.createElement("a");
				me.tabA.href = "#DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				me.tabA.id = "DC_LoaTS_raidMenu" + sanitaryName + "PaneTab";
				me.tabA.appendChild(document.createTextNode(me.tabName));
				me.tabLi.appendChild(me.tabA);
				
				me.pane = document.createElement("div");
				me.pane.id = "DC_LoaTS_raidMenu" + sanitaryName + "Pane";
				me.pane.className = "DC_LoaTS_raidMenuPane";
				me.pane.style.display = "none";
				me.parentMenu.bodyWrapper.appendChild(me.pane);
				
				me.parentMenu.tabs.addTab(me.tabA);

				
				if (me.closeable) {
					me.tabCloseA = document.createElement("a");
					me.tabCloseA.href = "#";
					me.tabCloseA.className = "DC_LoaTS_raidMenuCloseTabA";
					me.tabCloseA.innerText = "X";
					me.tabCloseA.onclick = function() {
						me.parentMenu.tabsList.removeChild(me.tabLi);
						me.parentMenu.bodyWrapper.removeChild(me.pane);
						delete RaidMenu.tabClasses[me.tabPosition];
						delete me.parentMenu.tabs.containers._object[me.tabA.href];
						var links = me.parentMenu.tabs.links;
						for (var i = 0; i < links.length; i++) {
							var link = links[i];
							if (link.key == me.tabA.href) {
								var rest = links.slice((i-1 || i) + 1 || links.length);
								links.length = i < 0 ? links.length + i : i;
								me.parentMenu.tabs.links = links.push.apply(links, rest);

								break;
							}
						}
						me.parentMenu.tabs.previous();
						return false;
					}
					me.tabLi.appendChild(me.tabCloseA);
				} // End closeable logic
				
				me.header = me.createHeader(me.tabHeader || me.tabName);
				me.pane.appendChild(me.header);
								
				
				if (typeof me.initPane === "function") {
					me.initPane();
				}
			},
			
			getSanitizedName: function()
			{
				return this.tabName.trim().replace(" ", "_");
			},
			
			createHeader: function(title)
			{
				var header = document.createElement("h1");
				header.className = "RaidMenuTab-Header";
				header.update(title);
				return header;
			},
			
			createSimpleOptionHTML: function(id, type, value, description, hoverText, additionalAttributes)
			{
				if (type == "boolean" || type == "text") // Not sure if other types would need different wrappers...
				{
						var outerWrapper = document.createElement("div");
						outerWrapper.id = id + "Wrapper";
						outerWrapper.className = "DC_LoaTS_raidMenuOptionWrapper clearfix";
						
						var innerWrapper = document.createElement("div");
						innerWrapper.className = "DC_LoaTS_raidMenuInnerWrapper"
						outerWrapper.appendChild(innerWrapper);
				}
				
				switch(type)
				{
					case "boolean":
					{
						var option = document.createElement("input");
						option.type = "checkbox";
						option.id = id;
						option.title = hoverText;
						
						if (value === "true" || value === true)
						{
							option.checked = true;
						}
						
						for (var attribute in additionalAttributes)
						{
							option[attribute] = additionalAttributes[attribute];
						}
						
						innerWrapper.appendChild(option);
						
						var desc = document.createElement("div");
						desc.className = "DC_LoaTS_raidMenuDescription";
						desc.innerHTML = description;
						outerWrapper.appendChild(desc);
						
						return {wrapper: outerWrapper, option: option};
					}
					case "text":
					{						
						var option = document.createElement("input");
						option.type = "text";
						option.id = id;
						option.title = hoverText;
						option.value = value;
						
						for (var attribute in additionalAttributes)
						{
							option[attribute] = additionalAttributes[attribute];
						}
						
						innerWrapper.appendChild(option);
						
						var desc = document.createElement("div");
						desc.className = "DC_LoaTS_raidMenuDescription";
						desc.innerHTML = description;
						outerWrapper.appendChild(desc);
						
						return {wrapper: outerWrapper, option: option};
					}
				}
			}
		});
		
		RaidMenuTab.create = function(classObject)
		{
			//console.log(classObject);
			try
			{
				// Don't collide with other poorly positioned tabs
				while (typeof RaidMenu.tabClasses[classObject.tabPosition] !== "undefined")
				{
					classObject.tabPosition++;
				}
				
				var tabClass = Class.create(RaidMenuTab, classObject);
				tabClass.tabName = classObject.tabName;
				tabClass.tabPosition = classObject.tabPosition;
				tabClass.closeable = classObject.closeable;
				RaidMenu.tabClasses[classObject.tabPosition] = tabClass;
				return tabClass;
			}
			catch(ex)
			{
				var tabName = (typeof classObject !== "undefined" && typeof classObject.tabName !== "undefined")?classObject.tabName:"";
				
				console.warn("Error while creating RaidMenu tab class " + tabName);
				console.warn(classObject);
				console.warn(ex);
			}
		};

		RaidMenuTab.createDataDumpTab = function(data, title)
		{
			var tabTitle = title.length == 0?"Data Export":title.length > 25?title.substring(0,25):title;
			var tabA;
			RaidMenu.show();
			var tabClass = RaidMenuTab.create({
				tabName: tabTitle,
				tabHeader: "Export: " + title,
				tabPosition: 150,
				closeable: true,
				
				initPane: function()
				{
					var textArea = document.createElement("textarea");
					textArea.className = "DataDumpTab-Data";
					textArea.innerHTML = data;
					
					tabA = this.tabA;
					this.pane.appendChild(textArea);
				}
			});
			RaidMenu.getInstance().activateTab(tabClass);
			RaidMenu.getInstance().tabs.setActiveTab(tabA);
		};

		/************************************/
		/********* RaidMultiFilter Class *********/
		/************************************/
		
		// This class represents a group of filters
		window.RaidMultiFilter = Class.create({
			
			// Constructor
			initialize: function(filterText)
			{
				Timer.start("RaidMultiFilter init");

				// Declare some vars for later
				this.valid = true;

				// Capture original filterText
				this.filterText = filterText;
				
				// Break out any bunch
				var filterTexts = this.filterText.split("||");
				
				// Prepare the filters
				this.filters = [];
				
				for (var i = 0; i < filterTexts.length; i++) {
					this.filters.push(new RaidFilter(filterTexts[i]));
				}

				Timer.stop("RaidMultiFilter init");
			},
			
			// Based on this filter, does a given property match the filter
			matches: function(params)
			{				
				var matched = false;
				
				for (var i = 0; i < this.filters.length; i++) {
					matched = matched || this.filters[i].matches(params);
				}
				
				return matched;
			},
			
			// Gets a key to define this filter
			getKey: function()
			{
				var key = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					key += (i>0?"||":"") + this.filters[i].getKey()
				}
				
				return key;
			},
			
			// If it has a name and optionally a difficulty and nothing else, it's simple
			isSimple: function()
			{
				var simple = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					simple = simple && this.filters[i].isSimple();
				}
				
				return simple;
			},
			
			isEmpty: function()
			{
				var empty = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					empty = empty && this.filters[i].isEmpty();
				}
				
				return empty;

			},
			
			isValid: function()
			{
				var valid = true;
				
				for (var i = 0; i < this.filters.length; i++) {
					valid = valid && this.filters[i].isValid();
				}
				
				return valid;
			},
			
			getDifficultyText: function()
			{
				var text = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					text += (i>0?"||":"") + this.filters[i].getDifficultyText()
				}
				
				return text;
			},
			
			toString: function()
			{
				var str = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					str += (i>0?"||":"") + this.filters[i].toString()
				}
				
				return str;
			},
			
			toPrettyString: function() {
				var pretty = "";
				
				for (var i = 0; i < this.filters.length; i++) {
					pretty += (i>0?"||":"") + this.filters[i].toPrettyString()
				}
				
				return pretty;

			}
		});

		RaidMultiFilter.paramText = "[raidName] [raidDifficulty] [{state: stateParam}] [{fs: fsParam}] [{age: ageParam}] [{count: countParam} [{page: pageParam}]]";

				/************************************/
		/********** RaidStyle Class *********/
		/************************************/
		
		// Class to parse raid style text of any form into CSS stuff
		window.RaidStyle = Class.create({
			initialize: function(styleText)
			{
				var naturalLanguage = "";
				var nativeCSS = "";
				this.css = "";

//				console.log("Parsing styleText: \"" + styleText + "\"")
				
				// Extract from the inputted text the various natural language and native CSS bits
				RaidStyle.parsePattern.lastIndex = 0;
				for (var match = RaidStyle.parsePattern.exec(styleText); match && match[0] != ""; match = RaidStyle.parsePattern.exec(styleText))
				{
					// Combine any natural language pieces together
					if (typeof match[1] !== "undefined")
					{
						naturalLanguage += match[1];
					}
					
					// Combine any native CSS pieces together
					if (typeof match[2] !== "undefined")
					{
						nativeCSS += match[2];
					}
				}
				
				// Trim out any extra whitespace
				naturalLanguage = naturalLanguage.trim().toLowerCase();
				nativeCSS = nativeCSS.trim();
				
//				console.log("styleText yielded naturalLanguage: \"" + naturalLanguage + "\" and nativeCSS: \"" + nativeCSS + "\"");
				
				// Try to parse the natural language bits
				// First, get a copy of the parsable bits
				var parseEls = RaidStyle.getNaturalLanguageParseElements();
				
				for (var i = 0; i < parseEls.length && naturalLanguage.length > 0; i++)
				{
					var el = parseEls[i];
					el.pattern.lastIndex = 0;
					var match = el.pattern.exec(naturalLanguage);
					if (match != null && match[0] != "")
					{
//						console.log(el.property + " captured \"" + match[el.capture] + "\" and will replace \"" + match[el.replace]) +"\"";
						this.css += el.property + ": " + match[el.capture] + "; ";
//						console.log("Natural language before: \"" + naturalLanguage + "\"");
						naturalLanguage = naturalLanguage.replace(match[el.replace], "").trim();
//						console.log("Natural language after: \"" + naturalLanguage + "\"");
					}
					else
					{
//						console.log(el.property + " did not match against \"" + naturalLanguage + "\"");
					}
				}
				
				this.css += nativeCSS;
//				console.log("CSS: ");
//				console.log(this.css);
			},
			
			toString: function()
			{
				return this.css;
			},
			
			isEmpty: function()
			{
				return typeof this.css === "undefined" || this.css.trim().length == 0;
			},
			
			isValid: function()
			{
				//TODO Will a style ever be not valid?
				return true;
			}
		});
		
		// General pattern to pick apart the natural language style from the native CSS styles
		RaidStyle.parsePattern = /([^"]*)?("[^"]*")?/gi;
		
		// Pattern to find bits of text that are colors. Can find #FFF, #FFFFFF, rgb(255,255,255), or white as the color white
		RaidStyle.baseColorPattern = /#[0-9a-f]{3}(?:[0-9a-f]{3})?\b|rgb\((?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),(?:[0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)|\b(?:black|white|red|yellow|lime|aqua|blue|fuchsia|orange|gray|silver|maroon|olive|green|teal|navy|purple)\b/i;
		RaidStyle.colorPattern = new RegExp("(?:(?:(?!on +).. )|^)(" + RaidStyle.baseColorPattern.source + ")", "i");
		RaidStyle.backgroundColorPattern = new RegExp("\\bon +(" + RaidStyle.baseColorPattern.source + ")", "i");
		
		// These are the current natural language features we're going to support for now
		RaidStyle.naturalLanguageParseElements = [
												 	{property: "font-weight", 		capture: 0, replace: 0, pattern: /\b(?:[1-9]00(?!px|pt|em|en|%)|bold(?:er)?|lighter|normal)\b/i},
												 	{property: "background-color", 	capture: 1, replace: 0, pattern: RaidStyle.backgroundColorPattern},
												 	{property: "color", 			capture: 1, replace: 1, pattern: RaidStyle.colorPattern},
												 	{property: "font-size", 		capture: 0, replace: 0, pattern: /\b[0-9]?[0-9]?[0-9]?[0-9] ?(?:(?:px|pt|em|en)\b|%)|\bx?x-small\b|\bsmall(?:er)?\b|\bmedium\b|\blarger?\b|\bx?x-large\b/i},
												 	{property: "text-decoration", 	capture: 0, replace: 0, pattern: /\bunderline(?: overline)\b/i},												 	
												 	{property: "font-style", 		capture: 0, replace: 0, pattern: /\b(?:italic|oblique|normal)\b/i},												 	
												 	{property: "whitespace", 		capture: 0, replace: 0, pattern: /\b(?:pre|pre-wrap|pre-line|-moz-pre-wrap|-o-pre-wrap|nowrap|normal)\b/i},												 	
												 	{property: "display", 			capture: 0, replace: 0, pattern: /\b(?:none|inline|block|inline-block|list-item|marker|compact|run-in|table-header-group|table-footer-group|table|inline-table|table-caption|table-cell|table-row|table-row-group|table-column|table-column-group)\b/i}
												 ];
		
		RaidStyle.getNaturalLanguageParseElements = function()
		{
			var el = [];
			for (var i = 0; i < RaidStyle.naturalLanguageParseElements.length; i++)
			{
				el.push(RaidStyle.naturalLanguageParseElements[i]);
			}
			
			return el;
		}
		
												 
		/************************************/
		/********* RaidToolbar Class ********/
		/************************************/
		window.RaidToolbar = Class.create({
			initialize: function()
			{
				// Set up the matched commands container
				this.existingMatchedCommands = [];
				
				// Find the existing RaidToolbar
				this.container = document.getElementById("DC_LoaTS_raidToolbarContainer");
				
				// If a RaidToolbar doesn't exist yet, make it
				if (typeof this.container == "undefined" || this.container == null)
				{
					// Create the space bewteen the kong buttons and game
					var td = new Element("td", {"id": "DC_LoaTS_toolbarCell"});
					var tr = new Element("tr");
					tr.appendChild(td);
					
					this.container = new Element("ul", {id: "DC_LoaTS_raidToolbarContainer"});
					td.appendChild(this.container);
					
					$($("flashframecontent").children[0].children[0].children[0]).insert({after:tr});
					var ccc = $("chat_container_cell");
					ccc.remove();
					td.insert({after: ccc});
					ccc.setAttribute("rowspan", "2");
					
					$("maingame").style.height = parseInt($("maingame").style.height) + 20 + "px";
					$("chat_container").style.height = parseInt($("chat_container").style.height) + 20 + "px";
					$("chat_tab_pane").style.height = parseInt($("chat_tab_pane").style.height) + 20 + "px";
					
					//TODO: Should break these out like the commands?
					this.buttons = {
						toggleMenu: new RaidButton("toggleMenu", "DC_LoaTS_menuButton", 
							function(event)
							{
								// Show the raid menu
								RaidMenu.toggle();
								
								// If the menu was spawned by a click, move the menu there
								if (typeof event != "undefined")
								{
									// Fixed Menu positioning - Needs to be relative to window scroll
									var scrollOffsets = document.viewport.getScrollOffsets();
									
									// Move the raid menu to where the mouse clicked this button
									window.raidMenu.container.style.left = Event.pointerX(event) - scrollOffsets.left + "px";
									window.raidMenu.container.style.top = Event.pointerY(event) - scrollOffsets.top + 20 + "px";
								}

							}
						),
						reload: new RaidButton("reload", "DC_LoaTS_reloadButton", DC_LoaTS_Helper.reload),
                        toggleGame: new RaidButton("toggleGame", "DC_LoaTS_toggleGameButton", DC_LoaTS_Helper.toggleGame, "Show / Hide the game"),
                        toggleWorldChat: new RaidButton("toggleWorldChat", "DC_LoaTS_toggleWorldChatButton", DC_LoaTS_Helper.toggleWorldChat, "Show / Hide World Chat")
					};
					for (var buttonName in this.buttons)
					{
						this.container.insert({bottom: this.buttons[buttonName].node});
					}
					
					this.omniboxWrapper = new Element("li", {"class": "DC_LoaTS_omniboxWrapper"});
					
					this.omnibox = new Element("input", {type: "text", "class": "DC_LoaTS_omnibox", autocomplete: "off"});
					this.omniboxWrapper.insert({bottom: this.omnibox});
					this.omnibox.oldValue = "";
					
					this.omniboxCommandsWrapper = new Element("ul", {"class": "DC_LoaTS_omniboxCommandsWrapper"});
					this.omniboxCommandsWrapper.hide();
					
					this.omniboxWrapper.insert({bottom: this.omniboxCommandsWrapper});
					this.container.insert({bottom: this.omniboxWrapper});

					this.omnibox.observe("mouseover", function() {
						$(this).addClassName("DC_LoaTS_omnibox_focus");
					});
					
					this.omniboxWrapper.observe("mouseover", function() {
						$(this).addClassName("DC_LoaTS_omniboxWrapper_hover");
					});
					
					this.omnibox.observe("focus", function(event, raidToolbar) {
						$(this).addClassName("DC_LoaTS_omnibox_focus");
						if (this.value.length >= 3 && raidToolbar.omniboxCommandsWrapper.childElements().length > 0)
						{
							raidToolbar.omniboxCommandsWrapper.show();
						}
					}.bindAsEventListener(this.omnibox, this));
					
					this.omnibox.observe("mouseout", function() {
						if (this.value.length == 0 && this != document.activeElement)
						{
							$(this).removeClassName("DC_LoaTS_omnibox_focus");
						}
					});
					
					this.omniboxWrapper.observe("mouseout", function() {
						$(this).removeClassName("DC_LoaTS_omniboxWrapper_hover");
					});
					
					this.omnibox.observe("blur", function(event, raidToolbar) {
						if (this.value.length == 0 && this != document.activeElement)
						{
							$(this).removeClassName("DC_LoaTS_omnibox_focus");
						}
						
						if (!$(raidToolbar.omniboxWrapper).hasClassName("DC_LoaTS_omniboxWrapper_hover"))
						{
							raidToolbar.omniboxCommandsWrapper.hide();
						}
					}.bindAsEventListener(this.omnibox, this));
					
					this.omnibox.observe("input", function(event, raidToolbar) {
						if (this.oldValue != this.value)
						{
							// Stretch the bar as needed
							this.setAttribute("size", Math.min(Math.max(20, (93/80) * this.value.length), 120));
							this.oldValue = this.value;
							
							DCDebug("Text Changed");
							
							// Process the omnibox text
							raidToolbar.processOmniboxText(this.value);
						}
					}.bindAsEventListener(this.omnibox, this));
					
					//TODO: Rig up keys to control omnibox selection
					this.omnibox.observe("keydown", function(event) {
						// Up arrow
						if (event.keyCode == 38)
						{
							DCDebug("Pressed up")
						}
						// Down arrow
						else if (event.keyCode == 40)
						{
							DCDebug("Pressed down")							
						}
						// Left arrow
						else if (event.keyCode == 41)
						{
							DCDebug("Pressed left")							
						}
						// Right arrow
						else if (event.keyCode == 39)
						{
							DCDebug("Pressed right")							
						}
						// Enter
						else if (event.keyCode == 13)
						{
							DCDebug("Pressed Enter")							
						}
					});
					
					RaidToolbar.createWRButton();
					
				}
				// Else if it does exist, grab the hooks
				//TODO
			},
			
			// Process omnibox text
			processOmniboxText: function(text)
			{
				var matchedCommands = [];
				
				// Clean up whitespace
				text = text.trim();
				
				// We really need at least 3 characters to make sense of the user's input
				if (text.length >= 3)
				{
					// Run through all of the text processors
					var raidLink = new RaidLink(text);
					var raidFilter = new RaidFilter(text);
					
					// If this is a valid link
					if (raidLink.isValid())
					{
						try
						{
							DCDebug("Link refers to: " + raidLink.getSimpleText() + "First seen: " + "Last seen: ");
							
							DCDebug("Load: " + raidLink.getSimpleText());
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.loadraid("omnibox", raidLink.getURL()));
							DCDebug("Info: " + raidLink.getDifficultyText() + " " + raidLink.getName());
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.raid("omnibox", raidLink.getName() + " " + raidLink.difficulty));
							DCDebug("State: Forget/Remember, Un/Mark Visited");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.linkstate("omnibox", raidLink.getURL()));
							
							DCDebug("Seen:  " + raidLink.getName() + " Any, Normal, Hard, Legendary, Nightmare");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.seenraids("omnibox", raidLink.getName() + " " + raidLink.difficulty));
							DCDebug("Search: " + raidLink.getName() + " on ZoyWiki");
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.wiki("omnibox", raidLink.getName()));
						}
						catch(ex)
						{
							console.warn("Failure while creating options for omnibox");
							console.warn(raidLink);
							console.warn(ex);
						}
						
					}
					// If it's a valid filter and it's not empty
					else if (raidFilter.isValid() && !raidFilter.isEmpty())
					{
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(raidFilter);
						if (matchedTypes.length > 0)
						{
							// If it's simple and matches only 1 type, put raid info first
							var raidInfoFirst = matchedTypes == 1 && raidFilter.isSimple();
							if (raidInfoFirst)
							{
								if (typeof raidFilter.difficulty != "undefined")
								{
									DCDebug("Raid info for " + raidFilter.getDifficultyText() + " " + matchedTypes[0].fullName);
								}
								else
								{
									DCDebug("Raid info for " + matchedTypes[0].fullName);
								}
								
								DCDebug("Look up " + matchedTypes[0].fullName + " on ZoyWiki");
							}
							
							DCDebug("Seen raids matching " + text);
							
							// If we didn't offer raid info first
							if (!raidInfoFirst)
							{
								DCDebug("Raid info for all matching raids");
								for (var i = 0; i < matchedTypes.length; i++)
								{
									if (typeof raidFilter.difficulty != "undefined")
									{
										DCDebug("Raid info for " + raidFilter.getDifficultyText() + " " + matchedTypes[i].fullName);
									}
									else
									{
										DCDebug("Raid info for " + matchedTypes[i].fullName);
									}
								}
							}
						}
					}

					// Simple commands
					if (text.toLowerCase().indexOf("lsi") == 0)
					{
						DCDebug("Calculate lsi");
					}
					else if (text.toLowerCase().indexOf("bsi") == 0)
					{
						DCDebug("Calculate bsi");
					}
					else if (text.toLowerCase().indexOf("help") == 0)
					{
						DCDebug("Get help?");
					}

					if (matchedCommands.length == 0)
					{
						try
						{
							// Attempt to match the text to a known command
							for (var commandName in DC_LoaTS_Helper.chatCommands)
							{
								// Going to add a wiki command no matter what
								if (commandName.toLowerCase() == DC_LoaTS_Helper.chatCommands.wiki.commandName ||
									commandName.toLowerCase() == DC_LoaTS_Helper.chatCommands.forum.commandName)
								{
									continue;
								}
								
								// Check command
								if (text.toLowerCase().indexOf(commandName.toLowerCase()) == 0
									||
									text.toLowerCase().indexOf("/" + commandName.toLowerCase()) == 0
								)
								{
									matchedCommands.push(new DC_LoaTS_Helper.chatCommands[commandName]("omnibox", text));
								}
								// Check aliases of this command
								else
								{
									var command = DC_LoaTS_Helper.chatCommands[commandName];
									for (var i = 0; i < command.aliases.length; i++)
									{
										var alias = command.aliases[i];
										if (text.toLowerCase().indexOf(alias.toLowerCase()) == 0
											||
											text.toLowerCase().indexOf("/" + alias.toLowerCase()) == 0
										)
										{
											matchedCommands.push(new DC_LoaTS_Helper.chatCommands[commandName]("omnibox", text));
										}
									}
								}
							}
							
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.wiki("omnibox", text));
							matchedCommands.push(new DC_LoaTS_Helper.chatCommands.forum("omnibox", text));
						}
						catch(ex)
						{
							console.warn("Failure while matching omnibox text (\"" + text + "\") to command.");
							console.warn(ex);
						}
					}
					
					// Clear out any old suggestions
					if (matchedCommands.length > 0 || this.omnibox.value.length < 3)
					{
						// Remove all existing options
						this.omniboxCommandsWrapper.childElements().invoke("remove");

						// Unhook the existing commands
						this.existingMatchedCommands.invoke("onRemovedFromOmnibox");
					}
					
					// Set the new commands we found to tbe ones we remember
					this.existingMatchedCommands = matchedCommands;
					
					// Put in the new suggestions, if any
					if (matchedCommands.length > 0)
					{						
						for (var i = 0; i < matchedCommands.length; i++)
						{
							var command = matchedCommands[i];
							DCDebug(command.commandName);
//							var option = new Element("li", {"class": "omniboxCommandOption"});
//							var anchor = new Element("a", {"href": "#"});
//							anchor.onclick = function(){alert(this.innerHTML); return false;};
//							anchor.update(command.commandName);
//							
//							option.insert({bottom: anchor});
//							this.omniboxCommandsWrapper.insert({bottom: option});

							this.omniboxCommandsWrapper.insert({bottom: command.getOptionLine()});
						}
						
						this.omniboxCommandsWrapper.show();
					}
				}
				else
				{
					this.omniboxCommandsWrapper.hide();
				}
			},
			
			toggle: function()
			{
				this.container.toggle();
			},

			show: function()
			{
				this.container.show();
			},

			hide: function()
			{
				this.container.hide();
			}
		});
		
		// Toggle the visibility of the raid toolbar
		RaidToolbar.toggle = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidToolbar;
			if (typeof raidToolbar == "undefined")
			{
				raidToolbar = new RaidToolbar();
				window.raidToolbar = raidToolbar;
			}
			
			// Toggle its visibility
			raidToolbar.toggle();
		};
		
		// Show the raid toolbar
		RaidToolbar.show = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidToolbar;
			if (typeof raidToolbar == "undefined")
			{
				raidToolbar = new RaidToolbar();
				window.raidToolbar = raidToolbar;
			}
			
			// Toggle its visibility
			raidToolbar.show();
		};
		
		// Hide the raid toolbar
		RaidToolbar.hide = function()
		{
			// Locate or create a raid toolbar
			var raidToolbar = window.raidtoolbar;
			if (typeof raidToolbar != "undefined")
			{
				// Hide the toolbar
				raidToolbar.hide();
			}
		};
		
		// Hide the command options
		RaidToolbar.hideCommandOptions = function()
		{
			$$(".DC_LoaTS_omniboxCommandsWrapper")[0].hide();
		}
		
		// Hide the command options
		RaidToolbar.resetOmnibox = function()
		{
			$$(".DC_LoaTS_omnibox")[0].value = "";
			$$(".DC_LoaTS_omnibox")[0].focus();			
		}
		
		RaidToolbar.createWRButton = function() {
			var wr = DC_LoaTS_Helper.worldRaidInfo;
			if (!DC_LoaTS_Helper.wrButton && typeof wr === "object" && (!wr.timerEnds || new Date(wr.timerEnds) > new Date())) {
				// Locate or create a raid toolbar
				var raidToolbar = window.raidToolbar;
				if (typeof raidToolbar == "undefined")
				{
					raidToolbar = new RaidToolbar();
					window.raidToolbar = raidToolbar;
				}
				
				DC_LoaTS_Helper.wrButton = new RaidButton(DC_LoaTS_Helper.worldRaidInfo.name + " Info", "DC_LoaTS_WRButton", DC_LoaTS_Helper.showWRInfo);
				raidToolbar.container.insert({bottom: DC_LoaTS_Helper.wrButton.node});
			}
		}
		/************************************/
		/********** RaidType Class **********/
		/************************************/
		
		// The Raid Type class is the generic form of a raid
		/*public class*/
		window.RaidType = Class.create({
	    	
		    // Constructor
		    /*public RaidType*/
			initialize: function(id, zone, fullName, shortName, colloqName, time, size, stat, health, fairShare, target)
			{
				this.id = id;
				this.zone = zone || "?";
				this.fullName = fullName || id;
				this.shortName = shortName || id;
				this.colloqName = colloqName || id;
				this.shortestName = colloqName || id;
				this.time = time || "?";
				this.size = size || "?";
				this.stat = stat || "?";
				
				// Calculate Health
				if (typeof health === "number")
				{
					this.health = [health*RaidType.difficultyHealthFactor[1],
								   health*RaidType.difficultyHealthFactor[2],
								   health*RaidType.difficultyHealthFactor[3],
								   health*RaidType.difficultyHealthFactor[4]
								   ];
				}
				else if (typeof health === "string")
				{
					this.health = [health, health, health, health];
				}
				else if (typeof health === "object" && typeof health !== null)
				{
					this.health = health;
				}
				else
				{
					this.health = ["?", "?", "?", "?"];
				}
				
				// Calculate Fair Share
				if (typeof fairShare === "number" || typeof fairShare === "string")
				{
					this.fairShare = [fairShare, fairShare, fairShare, fairShare];
				}
				else if (typeof fairShare === "object" && fairShare !== null)
				{
					this.fairShare = fairShare;
				}
				//TODO: Cache this instead
				// Else, calculate FS inline


				// Calculate Target
				if (typeof target === "number" || typeof target === "string")
				{
					this.target = [target, target, target, target];
				}
				else if (typeof target === "object" && target !== null)
				{
					this.target = target;
				}
				//TODO: Cache this instead
				// Else, calcuate Target inline

			},
			
			// Get or calculate fair share for a given difficulty raid. 
			// Can be int or String (usually, if applicable, "Unknown")
			/*public int or String*/
			getFairShare: function (difficulty)
			{
				var fs = 0;
				
				// If there is a hardcoded fair share, use that
				if (typeof this.fairShare !== "undefined")
				{
					fs = this.fairShare[difficulty-1];
				}
				// IF there is no hardcoded fair share, calculate it
				// Also, we must have healths, difficulty, and size to calculate it
				else if (typeof difficulty !== "undefined" 
					  && typeof this.size === "number" 
					  && typeof this.getHealth(difficulty) === "number")
				{
					fs = this.getHealth(difficulty) / this.size;
				}
				
				return fs;
			},
			
			// Get pretty text for fair share
			/*public String*/
			getFairShareText: function(difficulty)
			{
				var fs = this.getFairShare(difficulty);
				
				return DC_LoaTS_Helper.prettyFormatNumber(fs);
			},
			
			// Get or calculate optimal share for a given difficulty raid. 
			// Can be int or String (usually, if applicable, "Unknown")
			/*public int or String*/
			getOptimalShare: function (difficulty)
			{
				var target = 0;
				
				// If non-standard target damage is set
				if (typeof this.target !== "undefined")
				{
					target = this.target[difficulty-1];
				}
				// Otherwise assume usual calculation of target
				else
				{
					target = this.getFairShare(difficulty) * RaidType.targetDamageModifier[this.size];
				}
				
				return target;
			},
			
			// Get pretty text for target damage (optimal share)
			/*public String*/
			getTargetDamageText: function(difficulty)
			{
				return DC_LoaTS_Helper.prettyFormatNumber(this.getOptimalShare(difficulty));
			},
			
			// Returns the int of the health or specified String (usually, if applicable, it's "Unknown")
			/*public int or String*/
			getHealth: function(difficulty)
			{
				return this.health[difficulty-1];
			},
			
			// Returns the health of the raid as friendly text
			/*public String*/
			getHealthText: function(difficulty)
			{
				var health = this.getHealth(difficulty);
				return (typeof health == "number")?DC_LoaTS_Helper.prettyFormatNumber(health):health;
			},
			
			// Returns the duration of the raid as text
			/*public String*/
			getTimeText: function()
			{
				return this.time + "H";
			},
			
			// Returns a combination of all acceptable names for the raid
			// So that the string can be searched
			/*public String*/
			getSearchableName: function()
			{
				return this.fullName + "_" + this.shortName + "_" + this.colloqName;
			},
			
			// Gets a big descriptive block of text for the raid
			// Difficulty is optional. If provided, narrows down output, otherwise gives all
			/*public String*/ 
			getVerboseText: function(difficulty)
			{
				// Put the name, size, and stat facts into the string
				var text = "<b title=\"" + this.id + "\">" + this.fullName + "</b> \n";
				text += "Raid Size: " + this.size + " \n";
				text += "Stat(s) Used: " + this.stat + " \n";
				text += "Duration: " + this.getTimeText() + " \n";
				text += "Zone: " + this.zone + " \n";

				// If the user passed in difficulty 0, they only want the above listed stuff
				if (difficulty != 0)
				{
					var difficulties;
					
					// If we're focusing on a single difficulty
					if (typeof difficulty != "undefined")
					{
						difficulties = [difficulty];
						
					}
					// If we didn't get a single difficulty, show all difficulties
					else
					{
						difficulties = [1, 2, 3, 4];
					}
					
					// For each of the difficulties we're addressing
					for (var i = 0; i < difficulties.length; i++)
					{
						var d = difficulties[i];
						
						if (difficulties.length > 1)
						{
							text += " \n-- \n";
						}
						
						// Get text for the difficulty
						var diffText = RaidType.difficulty[d];
	
						if (typeof diffText == "undefined")
						{
							diffText = "Unknown";
						}
						
						var healthText = DC_LoaTS_Helper.prettyFormatNumber(this.getHealth(d));
						
						// Display the difficulty, health, fs, and target damage
						text += "Difficulty: " + diffText + " \n";
						text += "Health: " + healthText + " \n";
						text += "<acronym title=\"FS = Fair Share (of damage) = Raid Health (" + healthText + 
								") / Raid Size (" + this.size + ")\">FS</acronym>: " + this.getFairShareText(d) + " \n";
						text += "<span class=\"abbr\" title=\"Target Damage is FS * Raid Size Multiplier. The multiplier is calculated from user tests in the spreadsheet.\">Target(OS)</span>: " +  this.getTargetDamageText(d) + " ";
	
					}
				}
				
				return text;
			}
			
		});// End RaidType Class
		
		// List of possible difficulties, anything else will show up as Unknown
		RaidType.difficulty = {1: "Normal", 2: "Hard", 3: "Legendary", 4: "Nightmare"};
		
		// List of possible short name difficulties, anything else will show up as Unknown
		RaidType.shortDifficulty = {1: "N", 2: "H", 3: "L", 4: "NM"};
		
		// List of how much each difficulty modifies the base HP of the raid
		RaidType.difficultyHealthFactor = {1: 1, 2: 1.25, 3: 1.6, 4: 2};
		
		// List of *FS modifiers for Target Damage based on raid size.
		// From the raid spreadsheet:
		//		https://docs.google.com/spreadsheet/ccc?key=0AoPyAHGDsRjhdGYzalZZdTBpYk1DS1M3TjVvYWRwcGc&hl=en_US#gid=4
		RaidType.targetDamageModifier = {1: 1, 10: 1.25, 25: 1.5, 50: 2.2, 100: 2.3, 250: 1, 500: 1.5};

		/************************************/
		/********** Timing Utility **********/
		/************************************/
				
		window.Timer = {
			
			start: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					timer = {name: timerName, start: 0, totalTime: 0, longestTime: 0, numTimes: 0};
					window.Timer[timerName] = timer;
				}
				timer.start = new Date()/1;
			},
			
			stop: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer == "undefined")
				{
					console.log("Can't stop a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					var elapsed = (new Date()/1) - timer.start;
					timer.totalTime += elapsed;
					if (timer.longestTime < elapsed) {timer.longestTime = elapsed;}
					timer.numTimes++;
					timer.start = 0;
				}
			},
			
			addRun: function(timerName, runTime) {
				var timer = Timer[timerName];

				if (typeof timer === "undefined")
				{
					timer = {name: timerName, start: 0, totalTime: 0, longestTime: 0, numTimes: 0};
					window.Timer[timerName] = timer;
				}

				timer.totalTime += runTime || 0;
				if (timer.longestTime < runTime) {timer.longestTime = runTime;}
				timer.numTimes++;
			},
			
			getTimer: function(timerName)
			{
				var timer = Timer[timerName];
				if (typeof timer === "undefined")
				{
					console.log("Can't get a timer (" + timerName + ") that wasn't started");
				}
				else
				{
					timer.getAverage = function()
					{
						return this.totalTime / this.numTimes;
					}.bind(timer);
				}
				
				return timer;
			},
			
			getReport: function()
			{
				var report = "";
				for (var timerName in window.Timer)
				{
					var timer = window.Timer.getTimer(timerName);
					if (typeof timer !== "function" && typeof timer !== "undefined")
					{
						report += timerName + " > Average: " + timer.getAverage().toFixed(5) + "ms - Total: " + timer.totalTime + "ms - # " + timer.numTimes + "\n\n";
					}
				}
				
				return report;
			},
			
			printReport: function()
			{
				console.log(Timer.getReport());
			}
		};

		/************************************/
		/** UrlParsingFilter Class */
		/************************************/
		
		window.UrlParsingFilter = Class.create({
			initialize: function(params)
			{
				// Capture input params
				this.params = params;
				
				// Default to not forced and not cancelled
				this.force = false;
				this.cancel = false;
				
				// Type is other unless we match something specific
				this.type = "other";
				
				// Break apart the params to find out what this filter is supposed to represent
				var paramsParts = params.trim().replace(/\s+/g, " ").split(" ");
				
				// If we're supposed to force this filter
				if (paramsParts[0] === "force" || paramsParts[0] === "!") {
					this.force = true;
					this.url = paramsParts[1];
					if (paramsParts[2]) {
						this.raidFilter = new RaidMultiFilter(paramsParts.slice(2).join(" "));
					}
				}
				// If we're supposed to cancel this filter
				else if (paramsParts[0] === "cancel") {
					this.cancel = true;
				}
				// Neither forced nor cancelled, just a URL and maybe a RaidFilter
				else {
					this.url = paramsParts[0];
					if (paramsParts[1]) {
						this.raidFilter = new RaidMultiFilter(paramsParts.slice(1).join(" "));
					}
				}
				
				// Does this match the url of any service we already know about? Assume not
				this.known = false;
				
				var match;
				// Try the various urls that this parser knows about
				// Even if we're forcing it, we still need to run this to resolve the regexMatch
				for (var type in UrlParsingFilter.urlPatterns) {
					if ((match = UrlParsingFilter.urlPatterns[type].exec(this.url)) !== null) {
						this.known = true;
						this.type = type;
						this.regexMatch = match;
						break;
					}
				}
			},
			
			getUrlLink: function()
			{
				return "<a href=\"" + this.getWorkingUrl() + "\" target=\"_blank\">" + this.getLinkName() + "</a>";
			},
				
			getLinkName: function()
			{
				switch(this.type)
				{
					case "pastebin":
						return "Pastebin";
						break;
					case "cconoly":
						return "CConoly"
						break;
					default:
						return this.getWorkingUrl();
						break;
				}
			},
			
			getWorkingUrl: function ()
			{
				return this.convertedUrl || this.url;
			},
			
			// It's valid if it provides a url or is a cancel
			isValid: function()
			{
				return this.getWorkingUrl() || this.cancel;
			}
		});
		
		// Parameter text for this parser
		UrlParsingFilter.paramText = "url [raidFilter]";
		
		// Pattern to match different link types
		UrlParsingFilter.urlPatterns = {
			"pastebin": /(?:http:\/\/)?(?:www\.)?pastebin\.com\/(.+)/i, 
			"cconoly": /(?:http:\/\/)?(?:www\.)?cconoly\.com\/lots\/raidlinks\.php/i
		};
		
		/************************************/
		/********** Formatting Tab **********/
		/************************************/
		
		// Class to manage the formatting tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Formatting",
				tabPosition: 30,
				
				initPane: function()
				{
					var messageFormatHeader = document.createElement("h2");
					messageFormatHeader.className = "RaidMenuTab-SectionHeader";
					messageFormatHeader.update("Message Format");
					this.pane.appendChild(messageFormatHeader);
					
					var messageFormatDescription = document.createElement("p");
					messageFormatDescription.className = "RaidMenuTab-SectionDescription";
					messageFormatDescription.update("The format of raid links as they will appear in chat.");
					this.pane.appendChild(messageFormatHeader);
					
					this.messageFormatTextArea = document.createElement("textarea");
					this.messageFormatTextArea.id = "FormattingTab-MessageFormatTextArea";
					this.messageFormatTextArea.setAttribute("placeholder", RaidLink.defaultMessageFormat);
					this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
					this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
					DC_LoaTS_Helper.registerEventHandler(this.messageFormatTextArea, "input", this.handleMessageFormatInput.bind(this));
					this.pane.appendChild(this.messageFormatTextArea);					
					
					var saveButton = document.createElement("button");
					saveButton.update("Save");
					saveButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(saveButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat " + this.currentMessageFormat);
						}.bind(this)
					);
					this.pane.appendChild(saveButton);
					
					var cancelButton = document.createElement("button");
					cancelButton.update("Cancel");
					cancelButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(cancelButton, "click", 
						function()
						{
							this.currentMessageFormat = DC_LoaTS_Helper.getMessageFormat();
							this.messageFormatTextArea.value = this.currentMessageFormat.replace("{line}", "\n");
							this.handleMessageFormatInput();
						}.bind(this)
					);
					this.pane.appendChild(cancelButton);
					
					var defaultButton = document.createElement("button");
					defaultButton.update("Reset to default");
					defaultButton.className = "FormattingTab-Button";
					DC_LoaTS_Helper.registerEventHandler(defaultButton, "click", 
						function()
						{
							holodeck.processChatCommand("/raidformat reset");
						}.bind(this)
					);
					this.pane.appendChild(defaultButton);
					
					
					
					
					
					var samplePostHeader = document.createElement("h2");
					samplePostHeader.className = "RaidMenuTab-SectionHeader";
					samplePostHeader.update("Sample Post");
					samplePostHeader.style.marginTop = "15px";
					this.pane.appendChild(samplePostHeader);

					// --- Sample Link --- \\
					// Create the sample raid link area to display the results of the format
					var raidStorage = RaidManager.fetchStorage();
					
					// Find any valid link to use as a sample
					//TODO: Customizable sample
					for (var id_hash in raidStorage)
					{
						this.sampleRaidLink = raidStorage[id_hash].raidLink;
						var tmpRaid = this.sampleRaidLink.getRaid();
						// Don't sample with invalid links (same full name and id, essentially Unknown raids)
						// Don't pick raids with the same FS and OS (size 250 raids)
						if (tmpRaid.fullName === tmpRaid.id || tmpRaid.size === 250)
						{
							continue;
						}
						break;
					}
					
					// If there wasn't a valid sample in the local storage, generate one
					if (typeof this.sampleRaidLink === "undefined")
					{
						// Will not have state info, though
						this.sampleRaidLink = new RaidLink(9999999999, "hash11hash", 4, "ragebeasts");
					}

					this.messageFormatExampleLinkContainer = document.createElement("div");
					
					var p = document.createElement("p");
					p.className = "even";
					this.messageFormatExampleLinkContainer.appendChild(p);
					
					var username = holodeck._active_user._attributes._object.username;
					var usernameSpan = document.createElement("span");
					usernameSpan.setAttribute("username", username);
					usernameSpan.className = "username chat_message_window_username";
					usernameSpan.update(username);
					p.appendChild(usernameSpan);
					
					var separatorSpan = document.createElement("span");
					separatorSpan.className = "separator";
					separatorSpan.update(": ");
					p.appendChild(separatorSpan);
					
					this.messageSpan = document.createElement("span");
					this.className = "message";
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink();
					p.appendChild(this.messageSpan);
					
					var clearSpan = document.createElement("span");
					clearSpan.className = "clear";
					p.appendChild(clearSpan);
					
					
					this.pane.appendChild(this.messageFormatExampleLinkContainer);

				},
				
				handleMessageFormatInput: function()
				{
					this.currentMessageFormat = this.messageFormatTextArea.value.replace(/(?:\r\n|\r|\n)/g, "{line}");
					this.messageSpan.innerHTML = this.sampleRaidLink.getFormattedRaidLink(this.currentMessageFormat);
				}
		});
		
		/************************************/
		/********* Preferences Tab **********/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Preferences",
				tabPosition: 100,
				
				rightClickVisitedKey: "RightClickVisited",
				ignoreInvalidCommandsKey: "IgnoreInvalidCommands",
				hideVisitedRaidsKey: "HideVisitedRaids",
				hideWorldChatKey: "HideWorldChat",
				loadRaidsInBackgroundKey: "LoadRaidsInBackground",
				reportDeadRaidsKey: "ReportDeadRaids",
				useQueryTimeDeltaKey: "UseQueryTimeDelta",
				loadRaidsInBackgroundDelayKey: "LoadRaidsInBackgroundDelay",
				
				initPane: function()
				{
					var wrapper = document.createElement("div");
					var me = this;
					
					var rightClickOption = me.createSimpleOptionHTML(
									"PreferencesMenu-RightClickVisitedInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(me.rightClickVisitedKey, true), 
									"Right-click should mark raids visited.", 
									"If checked, right clicking a link will mark it visited", 
									{
										onclick: function()
										{
											DC_LoaTS_Helper.setPref(me.rightClickVisitedKey, this.checked);
										}
									}
					);
					wrapper.appendChild(rightClickOption.wrapper);

					var ignoreInvalidOption = me.createSimpleOptionHTML(
							"PreferencesMenu-IgnoreInvalidCommandsInput",
							"boolean", 
							DC_LoaTS_Helper.getPref(me.ignoreInvalidCommandsKey, true), 
							"Ignore invalid commands.", 
							"If checked, any command that is not a valid command will be ignored", 
							{
								onclick: function()
								{
									DC_LoaTS_Helper.setPref(me.ignoreInvalidCommandsKey, this.checked);
								}
							}
					);
					wrapper.appendChild(ignoreInvalidOption.wrapper);


                    var hideVisitedOption = me.createSimpleOptionHTML(
                        "PreferencesMenu-HideVisitedRaidsInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.hideVisitedRaidsKey, false),
                        "Hide Visited and Completed Raids.",
                        "If checked, Visited and Completed Raids posted into chat will be hidden",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.hideVisitedRaidsKey, this.checked);

                                DC_LoaTS_Helper.handleIgnoreVisitedRaids(this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(hideVisitedOption.wrapper);

                    var hideWorldChat = me.createSimpleOptionHTML(
                        "PreferencesMenu-HideWorldChatInput",
                        "boolean",
                        DC_LoaTS_Helper.getPref(me.hideWorldChatKey, false),
                        "Hide World Chat",
                        "If checked, World Chat will not be visible",
                        {
                            onclick: function()
                            {
                                DC_LoaTS_Helper.setPref(me.hideWorldChatKey, this.checked);

                                DC_LoaTS_Helper.handleHideWorldChat(this.checked);
                            }
                        }
                    );
                    wrapper.appendChild(hideWorldChat.wrapper);

                    var loadBackgroundOption = me.createSimpleOptionHTML(
									"PreferencesMenu-LoadRaidsInBackgroundInput",
									"boolean", 
									DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundKey, true), 
									"Load Raids in Background (Skips the Play Now screen when loading raids)", 
									"If checked, raids won't load in the game area.", 
									{
										onclick: function()
										{
											DC_LoaTS_Helper.setPref(me.loadRaidsInBackgroundKey, this.checked);
										}
									}
					);
					wrapper.appendChild(loadBackgroundOption.wrapper);
					
					var loadRaidsInBackgroundDelayOption = me.createSimpleOptionHTML(
							"PreferencesMenu-LoadRaidsInBackgroundDelayInput",
							"text", 
							DC_LoaTS_Helper.getPref(me.loadRaidsInBackgroundDelayKey, 50), 
							"ms. Time Between Loading Raids (Only applicable if Load Raids in Background is enabled)",
							"Default = 50; No delay = 0; Half a second = 500.",
							{
								size: 4,
								maxlength: 4,
								onchange: function()
								{
									var v = this.value;
									
									if (/^\d+$/.test(v))
									{
										DC_LoaTS_Helper.setPref(me.loadRaidsInBackgroundDelayKey, v);
									}
									else
									{
										holodeck.activeDialogue().raidBotMessage("Load Raids In Background Delay: Please enter only numbers.");
									}
								}
							}
					);
					wrapper.appendChild(loadRaidsInBackgroundDelayOption.wrapper);

//					var reportDeadRaidsOption = me.createSimpleOptionHTML(
//							"PreferencesMenu-ReportDeadRaidsInput",
//							"boolean",
//							DC_LoaTS_Helper.getPref(me.reportDeadRaidsKey, true),
//							"Report Dead Raids to CConoly",
//							"When a raid is marked Complete (Dead or Timed Out), inform CConoly",
//							{
//								onclick: function()
//								{
//									DC_LoaTS_Helper.setPref(me.reportDeadRaidsKey, this.checked);
//								}
//							}
//					);
//					wrapper.appendChild(reportDeadRaidsOption.wrapper);
//
//					var useQueryTimeDeltaOption = me.createSimpleOptionHTML(
//							"PreferencesMenu-UseQueryTimeDeltaInput",
//							"boolean",
//							DC_LoaTS_Helper.getPref(me.useQueryTimeDeltaKey, true),
//							"Ignore Duplicates When Using /loadcconoly",
//							"If enabled, when you use /loadccconoly (/lcc), it will only collect raids since the last time you used it (Saves your time and saves CConoly bandwidth money)",
//							{
//								onclick: function()
//								{
//									DC_LoaTS_Helper.setPref(me.useQueryTimeDeltaKey, this.checked);
//								}
//							}
//					);
//					wrapper.appendChild(useQueryTimeDeltaOption.wrapper);

					this.pane.appendChild(wrapper);
				}
							
		});
		
		/************************************/
		/************ Raids Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
		RaidMenuTab.create(
			{
				tabName: "Raids",
				tabHeader: "Seen Raids",
				tabPosition: 10,
				
				initPane: function()
				{
					this.currentRaidFilter;
					
//					this.header = document.createElement("h1");
//					this.header.className = "RaidMenuTab-Header";
//					this.header.update("Seen Raids");
//					this.pane.appendChild(this.header);
//					
					this.searchWrapper = document.createElement("div");
					this.searchWrapper.id = "RaidsMenu-SearchWrapper";
					this.pane.appendChild(this.searchWrapper);
					
					this.searchWrapper.update("Search for raids: ");
					
					this.searchBox = document.createElement("input");
					this.searchBox.id = "RaidsMenu-SearchBox";
					this.searchBox.observe("input", function(e)
					{
						if (typeof this._searchBoxTypingTimeout)
						this.onSearchBoxChange();
					}.bind(this));
					
					this.searchWrapper.appendChild(this.searchBox);
					
					var afterSearchWrapper = document.createElement("div");
					afterSearchWrapper.update("RaidBot sees: /seenraids ");
					this.searchWrapper.appendChild(afterSearchWrapper);
					
					
					this.searchBoxNormalized = document.createElement("span");
					this.searchBoxNormalized.id = "RaidsMenu-SearchBoxNormalized";
					afterSearchWrapper.appendChild(this.searchBoxNormalized);
					
					this.resultsBox = document.createElement("div");
					this.resultsBox.id = "RaidsMenu-ResultsBox";
					this.pane.appendChild(this.resultsBox);
				},
				
				onSearchBoxChange: function()
				{
					if (this.searchBox.value.length < 3)
					{
						this.clearResults();
						return;
					}
					
					var tmpFilter = new RaidMultiFilter(this.searchBox.value);
					
					if (!this.currentRaidFilter || this.currentRaidFilter.toString() != tmpFilter.toString())
					{
						this.currentRaidFilter = tmpFilter;
						this.searchBoxNormalized.update(this.currentRaidFilter.toString());
						
						
						// Retrieve the message format
						var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
						// Retrieve the anchor tag format
						var linkFormat = DC_LoaTS_Helper.getLinkFormat();
						
						
						var raidLinks = RaidManager.fetchByFilter(this.currentRaidFilter);
						var raidsHTML = "";
						for (var i = 0; i < raidLinks.length; i++)
						{
							raidsHTML += (i+1) + ") " + raidLinks[i].getFormattedRaidLink(messageFormat.replace("{image}", ""), linkFormat) + "<br><br>";
						}
						
						this.resultsBox.innerHTML = raidsHTML;
					}
				},
				
				getRaidRow: function(link)
				{
					var raid = link.getRaid();
				},
				
				clearResults: function()
				{
					this.resultsBox.childElements().invoke("remove");
				}
			
		});
		
//		RaidMenuTab.raidSearchResultsFields = [{"raid."}]
		
		/************************************/
		/*********** Styles Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
//		RaidMenuTab.create(
//			{
//				tabName: "Styles",
//				tabHeader: "Raid Styles (Under construction)",
//				tabPosition: 20,
//				optionIndex: 0,
//				
//				initPane: function()
//				{
//					this.optionRowTemplate = document.createElement("div");
//					this.optionRowTemplate.className = "StylesTab-OptionRow clearfix";
//					
//					var raidNamesPicker = document.createElement("div");
//					raidNamesPicker.className = "StylesTab-RaidNamesPicker";
//					this.optionRowTemplate.appendChild(raidNamesPicker);
//					
//					var selectedRaidsInput = document.createElement("input");
//					raidNamesPicker.appendChild(selectedRaidsInput);
//					
//					var selectedRaidsOptionHolder = document.createElement("div");
//					raidNamesPicker.appendChild(selectedRaidsOptionHolder);
//					
//					for (var raidId in DC_LoaTS_Helper.raids)
//					{
//						var raid = DC_LoaTS_Helper.raids[raidId];
//						var label = document.createElement("label");
//						label["for"] = "StyleTab-RaidOption-" + raid.shortestName + "-" + this.optionIndex++;
//						label.appendChild(document.createTextNode(raid.colloqName));
//						
//						var checkbox = document.createElement("input");
//						checkbox.type = "checkbox";
//						checkbox.id = label["for"];
//						label.appendChild(checkbox);
//						
//						selectedRaidsOptionHolder.appendChild(label);
//						selectedRaidsOptionHolder.appendChild(document.createElement("br"));
//					}
//					
//					this.pane.appendChild(this.optionRowTemplate);
//				}
//				
//		});

		/************************************/
		/************ Utils Tab *************/
		/************************************/
		
		// Class to manage a tab in the raid tab in the popup menu
//		RaidMenuTab.create(
//			{
//				tabName: "Utils",
//				tabHeader: "Utilities (Under Construction)",
//				tabPosition: 50,
//				
//				initPane: function()
//				{
//					//TODO: Fill out utilities tab
//				}
//							
//		});
		
		RaidCommand.create( 
			{
				commandName: "autoupdate",
				aliases: [],
				// Custom parsing
				/*parsingClass: ,*/
				// Custom parsing means custom param text
				paramText: "[on/off]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
					
					// 
					switch(params.toLowerCase())
					{
						// If there was no command, display current state
						case "":
							var updatesState = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate);
							if (typeof updatesState == "undefined")
							{
								updatesState = true;
							}
							
							if (updatesState)
							{
								ret.statusMessage = "Automatic update checks are <code>ON</code>. Turn them " + this.getCommandLink("OFF","OFF?");
							}
							else
							{
								ret.statusMessage = "Automatic update checks are <code>OFF</code>. Turn them " + this.getCommandLink("ON","ON?");
							}
							
							break;
						// Turn updates on
						case "on":
							var updatesState = GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, true);
							ret.statusMessage = "Automatic update checks are now <code>ON</code>";
							break;
						// Turn updates off
						case "off":
							var updatesState = GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, false);
							ret.statusMessage = "Automatic update checks are now <code>OFF</code>";
							break;
						// Not sure what this command was supposed to be
						default:
							ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
							ret.success = false;
					}
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Get autoupdate status"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/autoupdate toggle</code>\n";
					helpText += "Sets whether or not this script should automatically check for updates.\n";
					helpText += "where <code>toggle</code> <i>(optional)</i> is on or off\n";
					helpText += "\n";
					helpText += "If <code>toggle</code> is omitted, then the current status will be shown\n";
					helpText += "\n";
					helpText += "If there is an update to install and checks are on, when the page loads, a bar will appear";
					helpText += " at the top of the screen offering the option to update.\n";
					helpText += "\n";
					if (GM_getValue(DC_LoaTS_Properties.storage.autoUpdate, false)) {
						helpText += "Updates are currently ON. Turn them " + this.getCommandLink("OFF","OFF?") + "\n";
					}
					else {
						helpText += "Updates are currently OFF. Turn them " + this.getCommandLink("ON","ON?") + "\n";
					}
					
					return helpText;
				}
			}
		);
	
		RaidCommand.create( 
			{
				commandName: "checkload",
				aliases: ["loadcheck", "check", "load"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					var data = DC_LoaTS_Helper.autoLoader;
						
					if (data) {
						var fractionComplete = data.raidLinks.length / data.startingLinkCount,
						    percentComplete = Math.round(fractionComplete * 100);
						    timeElapsed = new Date()/1 - data.startTime,
						    timeRemaining = timeElapsed / fractionComplete;
						ret.statusMessage = "Attempted " + data.counter.attempted + " of " + data.startingLinkCount + " raids (" + percentComplete + "%) in " + timeElapsed + "ms.";
						ret.statusMessage += "\nEstimated Time Remaining: " + timeRemaining + " ms."
						ret.statusMessage += "\nCurrent Report: \n" + data.counter._generateReportText();
					}
					else {
						ret.statusMessage = "No load being performed at this time.";
					}
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Print the timer report"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/timerdata</code>\n";
					helpText += "Prints out timing and performance data about the script\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "clearchat",
				aliases: ["cc", "cls"],
				// No parsing
				//parsingClass: ,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true, statusMessage: "Chat cleared at " + (new Date().toLocaleString())};
						
					// Load the raid from the link's url
					holodeck._active_dialogue._message_window_node.childElements().invoke("remove");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Clear chat?"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearchat</code>\n";
					helpText += "Clears the text of the chat.\n";
					helpText += "\n";
					helpText += this.getCommandLink("","Clear chat now?") + "\n";

					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "clearraids",
				aliases: ["clearraid", "raidclear", "raidsclear", "clearcache"],
				parsingClass: RaidMultiFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					ret = {};
					
					// If the user wants to clear all raids
					if (params && params.toLowerCase() === "all")
					{
						// Clear all raids stored in memory
						RaidManager.clear();
						
						// Notify the user
						ret.statusMessage = "All raids have been cleared from script memory.";
						ret.success = true;
					}
					// If there were no params. 
					// This used to clear all raids, but that was catching some people by surprise, :-P
					else if (params.length == 0)
					{
						// Notify the user
						ret.statusMessage = "/" + this.getName() + " no longer clears all raids. Use " + this.getCommandLink("all") + " to clear all raids or " + this.getCommandLink("help") + " to find out more about this command.";
						ret.success = true;
					}
					// The user posted specific criteria
					else
					{
						// Find all raids that match the user's criteria
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If the RaidManager executed successfully
						if (typeof raidLinks !== "undefined")
						{
							// If we didn't match a single raid
							if (raidLinks.length == 0)
							{
								ret.statusMessage = "Could not locate any raids to clear matching <code>" + raidFilter.toString() + "</code>";
								ret.success = true;
							}
							// If we did match some raids
							else
							{
								// Delete all found raids from memory
								RaidManager.clear(raidLinks);
								
								// Notify the user
								ret.statusMessage = "Cleared " + raidLinks.length + " raids from memory.";
								ret.success = true;
							}
						}
						// RaidManager failed
						else
						{
							ret.statusMessage = "Did not understand command: <code>/" + this.getName() + " " + raidFilter.toString() + "</code>";
							ret.success = false;
						}
					}
								
					return ret;
				},
				
				getOptions: function()
				{
					//TODO: Decide what options should go here
					var commandOptions;
					if (this.parser.name == "all")
					{
						commandOptions = {
							initialText: {
								text: "Clear all raids from memory"
							}
						};
					}
					else
					{
						commandOptions = {
							initialText: {
								text: "Clear raids from memory matching " + this.parser.toString()
							}
						};
					}
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/clearraids raidName difficully {state:stateName} {age: timeFormat} {fs: fsFormat}</code>\n";
					helpText += "Deletes all raids from script memory.\n";
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "\n"
					helpText += "<b>Examples:</b>\n"
					helpText += "\n"
					helpText += "<i>Clear all seen but keep all visited raids<i>\n"
					helpText += "<code>/clearraids {state:seen}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n"
					helpText += "<code>/clearraids {state:seen} {age: <5h} {fs:<1M}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all normal telemachus raids that you've visited before\n"
					helpText += "<code>/clearraids tele 1 {state:visited}</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void killer raids in memory\n"
					helpText += "<code>/clearraids killer</code>\n"
					helpText += "\n"
					helpText += "<i>Clear all void nightmare vorden raids\n"
					helpText += "<code>/clearraids vorden 4</code>\n"
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "exportraids",
				parsingClass: RaidMultiFilter,
				aliases: ["exportraid", "er"],
				
				handler: function(deck, raidFilter, params, text, context)
				{
					// Capture the start time of the query
					var queryStartTime = new Date()/1;
				
					// Declare ret object
					var ret = {};
					
					// Find all raids that match the user's criteria
					var raidLinks = RaidManager.fetchByFilter(raidFilter);
					
					// If the RaidManager executed successfully
					if (typeof raidLinks != "undefined")
					{
						// If we didn't match a single raid
						if (raidLinks.length == 0)
						{
							if (params.length == 0)
							{
								ret.statusMessage = "Could not locate any seen raids in memory.";
							}
							else
							{
								ret.statusMessage = "Could not locate any seen raids matching <code>" + params + "<code>";
							}
							
							// The lookup succeeded, we just didn't find anything
							ret.success = true;
						}
						// If we did match some raids
						else
						{
							// Capture all the text in one block
							var outputText = "";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// Print matched links
								outputText += raidLinks[i].getURL() + "\n";
							}
							
							// Export the data we found
							//DC_LoaTS_Helper.forceDownload(outputText, raidFilter.toString().replace(" ", "_").replace(/\W/gi, ""));
							RaidMenuTab.createDataDumpTab(outputText, raidFilter.toString());
							
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and exported " + raidLinks.length + " results.";
							
							// Succeeded
							ret.success = true;
						}
					}
					// RaidManager failed
					else
					{
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
						ret.success = false;
					}

					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Export matching data"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/exportraids raidName difficulty {state: stateName} {age: timeFormat} {fs: fsFormat} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Exports to file raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
					helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					helpText += "\n";
					helpText += "Example:\n";
					helpText += "Export all seen psychic colonels, including visited: \n";
					helpText += this.getCommandLink("psy {state: !completed}") + "\n";

					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "farmvalue",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};

					var farmText = "<table>";
					farmText += "<tr><th>Stamina Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>"
					farmText += "<tr><td>Void Killer</td><td>19.8</td><td>6.6</td></tr>";
					farmText += "<tr><td>Ragebeasts</td><td>12.6</td><td>6.3</td></tr>";
					farmText += "<tr><td>Telemachus</td><td>11.0</td><td>3.7</td></tr>";
					farmText += "<tr><td>CC Colonel</td><td>9.3</td><td>2.3</td></tr>";
					farmText += "<tr><td>Supreme Cybertollahs</td><td>8.4</td><td>2.1</td></tr>";
					farmText += "<tr><td>Carnus</td><td>6.6</td><td>2.6</td></tr>";
					farmText += "<tr><td>Carnifex</td><td>6.3</td><td>2.5</td></tr>";
					farmText += "<tr><td>Rautha</td><td>5.9</td><td>1.5</td></tr>";
					farmText += "<tr><td>Vespasia's Android</td><td>5.6</td><td>1.6</td></tr>";
					farmText += "<tr><td>CC Cruiser</td><td>5.3</td><td>1.3</td></tr>";
					farmText += "<tr><td>Assassin</td><td>4.5</td><td>1.4</td></tr>";
					farmText += "<tr><td>Vorden</td><td>4.2</td><td>1.4</td></tr>";
					farmText += "<tr><td>CC General</td><td>4.0</td><td>1.0</td></tr>";
					farmText += "<tr><td>Warmaster </td><td>3.7</td><td>0.8</td></tr>";
					farmText += "<tr><td>Robotic Rautha</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>CC Sentinel</td><td>3.4</td><td>0.8</td></tr>";
					farmText += "<tr><td>Mermara</td><td>3.3</td><td>0.7</td></tr>";
					farmText += "<tr><td>Purple Lion</td><td>3.2</td><td>1.1</td></tr>";
					farmText += "<tr><td>Cybersmash</td><td>3.1</td><td>1.0</td></tr>";
					farmText += "<tr><td>Blood Alley Gang</td><td>2.8</td><td>0.9</td></tr>";
					farmText += "<tr><td>Bashan</td><td>2.3</td><td>0.6</td></tr>";
					farmText += "<tr><td>Missiles</td><td>2.3</td><td>0.6</td></tr>";
					farmText += "<tr><td>Tulk</td><td>2.2</td><td>0.6</td></tr>";
					farmText += "<tr><td>Scarlet Harlot</td><td>2.0</td><td>0.6</td></tr>";
					farmText += "<tr><td>Agony Ecstacy</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Sludge Serpent</td><td>1.8</td><td>0.7</td></tr>";
					farmText += "<tr><td>Lupin</td><td>1.7</td><td>0.7</td></tr>";
					farmText += "<tr><td>Mercury</td><td>1.6</td><td>0.6</td></tr>";
					farmText += "<tr><td>Storm Commander</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Sun-Xi</td><td>1.5</td><td>0.6</td></tr>";
					farmText += "<tr><td>Lt. Targe</td><td>1.4</td><td>0.6</td></tr>";
					farmText += "<tr><td>Guldax Quibberath</td><td>1.4</td><td>0.5</td></tr>";
					farmText += "<tr><td>Bachanghenfil</td><td>1.3</td><td>0.3</td></tr>";
					farmText += "<tr><td>Warden Ramiro</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Nemo</td><td>1.3</td><td>0.5</td></tr>";
					farmText += "<tr><td>Gut-Phager</td><td>1.2</td><td>0.2</td></tr>";
					farmText += "<tr><td>Vulture Gunship</td><td>1.2</td><td>0.5</td></tr>";
					farmText += "<tr><td>Caligula</td><td>1.2</td><td>0.4</td></tr>";
					farmText += "<tr><td>Cyborg Shark</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Guan Yu</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Pi</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Sigurd</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Bile Beat</td><td>1.0</td><td>0.3</td></tr>";
					farmText += "<tr><td>Fleet Com.</td><td>0.9</td><td>0.3</td></tr>";
					farmText += "<tr><td>Reaver</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>Cult-Mistress</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>Nick</td><td>0.9</td><td>0.3</td></tr>";
					farmText += "<tr><td>Cake</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>The Hat</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Xenocide</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Colossa</td><td>0.7</td><td>0.1</td></tr>";
					farmText += "<tr><td>Blob</td><td>0.5</td><td>0.2</td></tr>";
					farmText += "<tr><td>Councilor</td><td>0.5</td><td>0.1</td></tr>";
					farmText += "<tr><td>Boar</td><td>0.5</td><td>0.1</td></tr>";
					farmText += "<tr><td>R. Hunter</td><td>0.4</td><td>0.2</td></tr>";
					farmText += "<tr><td>G. Rahn</td><td>0.3</td><td>0.1</td></tr>";
					farmText += "<tr><td>Dule's Bot</td><td>0.3</td><td>0.1</td></tr>";
					
					farmText += "<tr><td></td><td></td><td></td></tr>";
					
					farmText += "<tr><th>Energy Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>";
					farmText += "<tr><td>Vince Vortex</td><td>1.7</td><td>0.4</td></tr>";
					
					farmText += "<tr><td></td><td></td><td></td></tr>";
					
					farmText += "<tr><th>Honor Raid</th><th>Norm Farm Val</th><th>NM Farm Val</th></tr>";
					farmText += "<tr><td>Krakak Swarm</td><td>5.6</td><td>1.9</td></tr>";
					farmText += "<tr><td>Infected Squad</td><td>4.4</td><td>1.3</td></tr>";
					farmText += "<tr><td>Flying Saucers</td><td>4.0</td><td>1.6</td></tr>";
					farmText += "<tr><td>Lurking Horror</td><td>3.7</td><td>0.9</td></tr>";
					farmText += "<tr><td>Kang</td><td>3.4</td><td>1.0</td></tr>";
					farmText += "<tr><td>Tourniquet 7</td><td>2.4</td><td>0.9</td></tr>";
					farmText += "<tr><td>Ship of the Damned</td><td>2.3</td><td>0.8</td></tr>";
					farmText += "<tr><td>Wyrm</td><td>2.0</td><td>0.7</td></tr>";
					farmText += "<tr><td>Death Flora</td><td>1.9</td><td>0.6</td></tr>";
					farmText += "<tr><td>Crossbones Squadron</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Celebrator</td><td>1.6</td><td>0.5</td></tr>";
					farmText += "<tr><td>Shadows</td><td>1.4</td><td>0.3</td></tr>";
					farmText += "<tr><td>Mr. Justice</td><td>1.1</td><td>0.3</td></tr>";
					farmText += "<tr><td>Rylattu Exterminators</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Colonel Mustard</td><td>1.1</td><td>0.4</td></tr>";
					farmText += "<tr><td>Luna</td><td>1.0</td><td>0.4</td></tr>";
					farmText += "<tr><td>Genesis</td><td>0.9</td><td>0.5</td></tr>";
					farmText += "<tr><td>Grislak</td><td>0.9</td><td>0.3</td></tr>";
					farmText += "<tr><td>Interceptor</td><td>0.9</td><td>0.2</td></tr>";
					farmText += "<tr><td>Peacemaker 500</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Qin Legion</td><td>0.8</td><td>0.3</td></tr>";
					farmText += "<tr><td>Juggernaut</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Squid</td><td>0.7</td><td>0.2</td></tr>";
					farmText += "<tr><td>Death Squadron</td><td>0.7</td><td>0.1</td></tr>";
					farmText += "<tr><td>H. House</td><td>0.6</td><td>0.1</td></tr>";
					farmText += "<tr><td>Devourer</td><td>0.6</td><td>0.1</td></tr>";
					farmText += "<tr><td>Colby</td><td>0.5</td><td>0.1</td></tr>";
					farmText += "<tr><td>Legacy Bot</td><td>0.4</td><td>0.1</td></tr>";
					farmText += "<tr><td>Psi-Hound</td><td>0.2</td><td>0.1</td></tr>";
					farmText += "<tr><td>Wahsh</td><td>0.0</td><td>0.0</td></tr>";
					
					farmText += "</table>";
					farmText += "<a href=\"" + DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">Source</a>\n";

					deck.activeDialogue().raidBotMessage(farmText);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display farm values"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/farmvalue</code>\n";
					helpText += "Displays the farm value of the raids per <a href=\"" + 
								DC_LoaTS_Properties.farmSpreadsheetURL + "\" target=\"_blank\">this spreadsheet</a>\n";
					
					return helpText;
				}
			}
		);
		
		
		// Fetch raids command
		RaidCommand.create( 
			{
				commandName: "fetchraids",
				aliases: ["fetch", "fr"],
				parsingClass: UrlParsingFilter,
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: parser.known || parser.force || parser.cancel};
						
					if (ret.success) {
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						if (!parser.known) {
							ret.statusMessage = parser.getWorkingUrl() + " is not from a known raid host. Are you sure you wish to fetch from there? " + DC_LoaTS_Helper.getCommandLink("/fetchraids force " + params);
						}
						else {
							ret.statusMessage = "Could not find a url in <code>" + text + "</code>";
						}
					}
					return ret;
				},
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load raids from: " + this.parser.getWorkingUrl()
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/fetchraids url</code>\n";
					helpText += "where <code>url</code> is the url of a raid host of some kind\n";
					helpText += "\n";
					helpText += "Loads all raids from the url, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "forum",
				urlPattern: "http://www.legacyofathousandsuns.com/forum/search.php?do=process&sortby=rank&query=%searchString%",
				// No parsing
				/*parsingClass: ,*/
				aliases: ["forums"],
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					var url = this.createURL(params);
					
					window.open(url, "_blank");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Search Forum for: " + this.processedText,
							linkParams: {href: this.createURL(this.processedText), target: "_blank"},
							doNotCallHandler: true,
							followLink: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/forum searchText</code>\n";
					helpText += "where <code>searchText</code> is what you want to search for on the LoTS Forum\n";
					
					return helpText;
				},
				
				createURL: function(searchInput)
				{
					searchInput = searchInput || " ";
					return this.urlPattern.replace("%searchString%",searchInput);
				}
			}
		);        RaidCommand.create( 
            {
                commandName: "konginfo",
                aliases: [],
                doNotEnumerateInHelp: true, // Don't list this in the help
               // No parsing needed
                /*parsingClass: ,*/
                handler: function(deck, parser, params, text, context)
                {
                    // Declare ret object
                    var ret = {success: true};
                    
                    ret.statusMessage = "Kong ID: " + active_user.id() + "\n";
                    ret.statusMessage = "Kong Hash: " + active_user.gameAuthToken();

                    return ret;
                },
                
                getOptions: function()
                {
                    var commandOptions = {
                        initialText: {
                            text: "Get important info about your Kong game."
                        }
                    };
                    
                    return commandOptions;
                },
                
                buildHelpText: function()
                {
                    var helpText = "<b>Raid Command:</b> <code>/konginfo</code>\n";
                    helpText += "Displays important Kong info.\n";
                    
                    return helpText;
                }
            }
        );
        
		RaidCommand.create( 
			{
				commandName: "linkstate",
				aliases: ["setcachestate", "setstate"],
				parsingClass: RaidLinkstateParser,
				/*public Object*/ handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// If there's a raid link but no new state set
					if (typeof parser.raidLink != "undefined" && typeof parser.state == "undefined")
					{
						// Get the current state
						var state = RaidManager.fetchState(parser.raidLink);
						
						// Print the current state
						ret.statusMessage = parser.raidLink.getName() + "(raid_id: " + parser.raidLink.id + ") is in state " + state.niceText;
						
						// Success
						ret.success = true;
					}
					// If there's a raid link and there's a new state to set it to
					else if (typeof parser.raidLink != "undefined" && typeof parser.state != "undefined")
					{
						// Get the actual state
						var actualState = RaidManager.STATE.valueOf(parser.state);
						
						DCDebug("About to set link to state: ");
						DCDebug(actualState);
						
						if (typeof actualState != "undefined")
						{
							// Set the new state for the raid link
							RaidManager.store(parser.raidLink, actualState);
							
							// Get the current state
							var state = RaidManager.fetchState(parser.raidLink);
							
							// Print the current state
							ret.statusMessage = parser.raidLink.getName() + " (raid_id: " + parser.raidLink.id + ") is now in state " + state.niceText;
							
							// Success
							ret.success = RaidManager.STATE.equals(parser.state, state);
						}
						// Could not actually locate the state the user tried to set this link to
						else
						{
							console.warn("Could not locate a corresponding state to " + parser.state + " in command " + text);

							// Failed
							ret.success = false;
							
							// Print the failure message
							ret.statusMessage = "Could not find match <code>" + parser.state + "</code> to a known state in <code>" + text + "</code>";
						}

					}
					// Must not have found a raid link
					else
					{
						// Failure
						ret.success = false;
						ret.statusMessage = "Could not find raid link in <code>" + text + "</code>";
					}
												
					return ret;
				},
				
				/*public Object*/ getOptions: function()
				{
					var linkState = RaidManager.fetchState(this.parser.raidLink);
					
					var commandOptions = {					
						initialText: {
							text: "Mark this " + linkState.niceText + " " + this.parser.getName(),
							executable: false
						}
					};
					
					for (var stateType in RaidManager.STATE)
					{
						if (typeof RaidManager.STATE[stateType] == "object" && linkState.id != RaidManager.STATE[stateType].id)
						{
							commandOptions["mark_" + stateType.toLowerCase()] = this.createStateOption(RaidManager.STATE[stateType]);
						}
					}
					
					return commandOptions;
				},
				
				/*private Object*/ createStateOption: function(state)
				{
					return {
						text: state.niceText,
						callback: function(state){this.parser.state = state.id}.bind(this, state)
					};
				},
				
				/*protected String*/ buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadraid url</code>\n";
					helpText += "where <code>url</code> is the url of a raid\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "linktools",
				aliases: ["advertise", "blatantselfpromotion", "getdoomscript"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};

					
					if (params.trim() === "post") {
						var toolsText = "\nGet doomscript: " + DC_LoaTS_Properties.scriptURL + " and any of: ";
						toolsText += "\nRaidTools: " + DC_LoaTS_Properties.RaidToolsURL + " ";
						toolsText += "\nQuickFriend: " + DC_LoaTS_Properties.QuickFriendURL + " ";
						toolsText += "\nPlay Now Fix: " + DC_LoaTS_Properties.PlayNowFixURL;

						holodeck._chat_window._active_room.sendRoomMessage(toolsText);
					}
					else {
						var toolsText = "\ndoomscript: <a href=\"" + DC_LoaTS_Properties.scriptURL + "\" target=\"_blank\">" + DC_LoaTS_Properties.scriptURL + "</a> \n";
						toolsText += "RaidTools: <a href=\"" + DC_LoaTS_Properties.RaidToolsURL + "\" target=\"_blank\">" + DC_LoaTS_Properties.RaidToolsURL + "</a> \n";
						toolsText += "QuickFriend: <a href=\"" + DC_LoaTS_Properties.QuickFriendURL + "\" target=\"_blank\">" + DC_LoaTS_Properties.QuickFriendURL + "</a> \n";
						toolsText += "Play Now Fix: <a href=\"" + DC_LoaTS_Properties.PlayNowFixURL + "\" target=\"_blank\">" + DC_LoaTS_Properties.PlayNowFixURL + "</a> \n";

						deck.activeDialogue().raidBotMessage(toolsText);
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display tools links"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/linktools [post]</code>\n";
					helpText += "Displays a list of scripts that you might find useful.\n";
					helpText += "<code>" + this.getCommandLink("") + "</code> will post the links just to you.\n";
					helpText += "<code>" + this.getCommandLink("post") + "</code> will post the links to chat.";
					
					return helpText;
				}
			}
		);
		
//TODO: Remove Autoload alias. AutoLoad should be for incoming new raids, not loading existing ones
		RaidCommand.create(
			{
				commandName: "loadall",
				aliases: ["autoload"],
				parsingClass: RaidMultiFilter,

				handler: function(deck, raidFilter, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					var isCancelled = params === "cancel";
										
					// Cancel the previous timer, if there is one
					if (typeof DC_LoaTS_Helper.autoLoader !== "undefined" || isCancelled)
					{
						// Clear out the raidLinks array from the previous one.
						// The timeout will detect that there are suddenly no more links
						// and acknowledge the error state and quit.
						DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
					}
					
					
					// This only works with a valid filter
					if (!isCancelled && raidFilter && raidFilter.isValid())
					{
						// Fetch all the links
						var raidLinks = RaidManager.fetchByFilter(raidFilter);
						
						// If there were any matched links
						if (raidLinks.length > 0)
						{
							ret.success = true;
							ret.statusMessage = "AutoLoad starting for " + raidFilter.toString() + ". Loading " + raidLinks.length + " raids. " + this.getCommandLink("cancel", "Cancel");
							
							DC_LoaTS_Helper.loadAll(raidLinks);
						}
						else
						{
							ret.statusMessage = "AutoLoad could not find any raids matching " + raidFilter.toString() + " to load.";							
						}
						
						ret.success = true;
					}
					else if (!isCancelled)
					{
						ret.success = false;
						ret.statusMessage = "Could not execute autoload due to invalid raid filter: '" + raidFilter.toString() + "'.";
					}
					else 
					{
						ret.success = true;
						ret.statusMessage = "AutoLoad cancelled.";
					}
						
					return ret;
				},
				getOptions: function()
				{
					//TODO: Better options here
					var commandOptions = {					
						initialText: {
							text: "Load all raids matching the filter"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadall raidFilter</code>\n";
					helpText += "where <code>raidFilter</code> is a valid raid filter\n";
					helpText += "\n";
					helpText += "\nLoads all seen raids that match the given filter";
					helpText += "\n";
					helpText += "\nFor example, " + this.getCommandLink("colonel 4") + " would load all nightmare colonels not previously visited";
					helpText += "\n";
					helpText += "<b>This feature is implemented for experimental/academic purposes only and should not be distributed!</b>\n";
					
					return helpText;
				}
			}
		);
		
		
		// Load CConoly command
		RaidCommand.create( 
			{
				commandName: "loadcconoly",
				aliases: ["loadcc", "lcc", "cconoly", "cc", "loadcconolyraids", "loadccraids"],
				// No predefined parsing
				// parsingClass: none,
				
				paramText: "[filter]",

				handler: function(deck, parser, params, text, context)
				{
					if (params === "cancel") {
						parser = new UrlParsingFilter("cancel");
					}
					else {
						parser = new UrlParsingFilter(CConolyAPI.getRaidListUrl() + " " + params);
					}
					
					// Declare ret object
					var ret = {success: parser.type === "cconoly"};
						
					if (ret.success) {
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						ret.statusMessage = "Error processing command <code>" + text + "</code>";
						DCDebug("Error with /lcc. Parser: ", parser);
					}
					return ret;
				},
					
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load CConoly raids"
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
                    var helpText = "<b>Raid Command:</b> <code>/loadcconoly raidName difficulty {state: stateName} {age: timeFormat} {size: sizeFormat} {fs: fsFormat} {os: osFormat} {zone: zoneNumber} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "\n";
                    helpText += "Looks up raids from CConoly. "
                    helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
                    helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
                    helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
                    helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
                    helpText += "where <code>sizeFormat</code> <i>(optional)</i> is like <code>&lt;100</code> or <code>250</code>\n";
                    helpText += "where <code>osFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>zoneNumber</code> <i>(optional)</i> is like <code>1</code>, <code>Z14</code>, <code>ZA</code>, <code>WR</code>\n";
                    helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
                    helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
                    helpText += "\n";
                    helpText += "<b>Examples:</b>\n";
                    helpText += "\n";
                    helpText += "<i>Find all raids you've seen, but not visited<i>\n";
                    helpText += "<code>" + this.getCommandLink("{state:seen}") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n";
                    helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h}") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n";
                    helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h} {fs:<1M}") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Find all normal telemachus raids that you've not visited before\n";
                    helpText += "<code>" + this.getCommandLink("tele 1 {state:!visited}") + " </code>\n";
                    helpText += "\n";
                    helpText += "<i>Find the first 10 void killer raids you've seen\n";
                    helpText += "<code>" + this.getCommandLink("killer {count: 10}") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Find the second 10 void killer raids you've seen\n";
                    helpText += "<code>" + this.getCommandLink("killer {count: 10} {page: 2}") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Find all void nightmare vorden raids you've seen\n";
                    helpText += "<code>" + this.getCommandLink("vorden 4") + "</code>\n";
                    helpText += "\n";
                    helpText += "<i>Looking for <a href=\"http://www.zoywiki.com/index.php/LotS/experiment/multicoloredcloorian\" title=\"Cloorian Material needed to craft some Legendary pants\">Cloorian Material<a/>\n";
                    helpText += "<code>" + this.getCommandLink("vor|gan|nat 4 {age: <24h} {state: !visited}") + "</code>\n";
					
					return helpText;
				}
			}
		);
		
		
			// Load Pastebin command
		RaidCommand.create( 
			{
				commandName: "loadpastebin",
				aliases: ["loadpaste", "loadbin", "lpb", "loadraidbin", "lrb"],
				parsingClass: UrlParsingFilter,
				
				pastebinRawBase: "http://pastebin.com/raw.php?i=",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: parser.type === "pastebin"};
						
					if (ret.success) {
						// Make sure to convert to the better url
						parser.convertedUrl = this.pastebinRawBase + parser.regexMatch[1];
						DC_LoaTS_Helper.fetchAndLoadRaids(parser);
					}
					else {
						if (parser.getWorkingUrl()) {
							ret.statusMessage = parser.url + " does not appear to be a pastebin link. Try " + DC_LoaTS_Helper.getCommandLink("/fetchraids " + params);
						}
						else {
							ret.statusMessage = "Could not find a pastebin link in <code>" + text + "</code>";
						}
					}
					return ret;
				},
							
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load bin raids from: " + this.parser.getWorkingUrl()
						}
					};
					
					return commandOptions;
				},
				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadpastebin pastebinURL raidFilter</code>\n";
					helpText += "where <code>pastebinURL</code> is the url of a raid pastebin\n";
					helpText += "where <code>raidFilter</code> (optional) is a seenraids style filter to limit what's loaded from the bin\n";
					helpText += "\n";
					helpText += "Loads all raids from the pastebin, or whichever ones match the filter\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "loadraid",
				aliases: ["addraid", "joinraid", "loadraids", "raidload", "raidadd", "raidjoin", "lr"],
				parsingClass: RaidLink,
				handler: function(deck, raidLink, params, text, context)
				{
					// Declare ret object
					var ret = {};
						
					// Load the raid from the link's url
					ret.success = !DC_LoaTS_Helper.loadRaid(raidLink.getURL());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Load raid: " + this.parser.getDifficultyText() + " " + this.parser.getName()
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/loadraid url</code>\n";
					helpText += "where <code>url</code> is the url of a raid\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "markall",
				aliases: ["bulkcachestate"],

				paramText: "filter state",
				
				
				/*public Object*/ handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					params = params.trim();
					
					var space = params.lastIndexOf(" ");
					
					var filter = params.substring(0, space);
					var state = params.substring(space+1);
					
					var count = RaidManager.markByFilter(filter, state);
					
					ret.statusMessage = "Marked " + count + " raid" + (count!=1?"s":"") + " matching \"<code>" + filter + "</code>\" as " + state;
					ret.success = true;
					
					if (count > 0) {
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				
				/*public Object*/ getOptions: function()
				{					
					var commandOptions = {					
						initialText: {
							text: "Mark all " + this.parser.filterText + " as " + this.parser.stateText
						}
					};
					

					return commandOptions;
				},
				
				/*protected String*/ buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/markall [filter] state</code>\n";
					helpText += "where <code>filter</code> (optional) is a seenraids style filter to limit what gets marked\n";
					helpText += "where <code>state</code> is a valid state to mark the raids to (unseen, seen, visited)\n";
					
					return helpText;
				}
			}
		);
		
RaidCommand
		.create({
			commandName : "pasteraids",
			aliases : [ "pastebinraids" ],
			parsingClass : RaidMultiFilter,

			handler : function(deck, raidFilter, params, text, context) {
				// Capture the start time of the query
				var queryStartTime = new Date() / 1;

				// Declare ret object
				var ret = {};

				// Find all raids that match the user's criteria
				var raidLinks = RaidManager.fetchByFilter(raidFilter);

				// If the RaidManager executed successfully
				if (typeof raidLinks != "undefined") {
					// If we didn't match a single raid
					if (raidLinks.length == 0) {
						if (params.length == 0) {
							ret.statusMessage = "Could not locate any seen raids in memory.";
						} else {
							ret.statusMessage = "Could not locate any seen raids matching <code>"
									+ params + "<code>";
						}

						// The lookup succeeded, we just didn't find anything
						ret.success = true;
					}
					// If we did match some raids
					else {
						// Capture all the text in one block
						var outputText = "";

						// For every link we found
						for ( var i = 0; i < raidLinks.length; i++) {
							// Print matched links
							outputText += raidLinks[i].getURL() + "\n";
						}

						// Wait a moment, then paste it
						setTimeout(
								function() {
									DC_LoaTS_Helper.PastebinAPI
											.pasteData(
													outputText,
													raidFilter.toPrettyString()
															+ " by "
															+ holodeck._active_user._attributes._object.username,
													raidFilter.toString());
								}, 100);

						// Status
						ret.statusMessage = "Pasting " + raidLinks.length
								+ " raids matching <code>"
								+ raidFilter.toString()
								+ "</code> to Pastebin. Please wait...";

						// Succeeded
						ret.success = true;
					}
				}
				// RaidManager failed
				else {
					ret.statusMessage = "Did not understand command: <code>"
							+ text + "</code>";
					ret.success = false;
				}

				return ret;
			},
			getOptions : function() {
				var commandOptions = {
					initialText : {
						text : "Export matching data to pastebin"
					}
				};

				return commandOptions;
			},
			buildHelpText : function() {
				var helpText = "<b>Raid Command:</b> <code>/pasteraids raidName difficulty {state: stateName} {age: timeFormat} {fs: fsFormat} {count: numberResults} {page: resultsPage}</code>\n";
				helpText += "Exports to pastebin raids that you've seen before in chat"
				helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
				helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
				helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
				helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
				helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
				helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
				helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";

				return helpText;
			}
		});
		RaidCommand.create( 
			{
				commandName: "raid",
				aliases: ["raids", "radi", "radu", "raud", "radus", "rauds", "radis", "rai", "fs", "os"],
				parsingClass: RaidFilter,
				
				// Doesn't use all the filter params
				paramText: "[raidName] [raidDifficulty]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true},
					    filter = parser;
				
					// If this was a valid filter
					if (filter.isValid())
					{
						// Find the matching raid types
						var matchedTypes = DC_LoaTS_Helper.getRaidTypes(filter);
						
						// If we matched some raid types
						if (matchedTypes.length > 0)
						{
							// Iterate over all the matched raid types
							for (var j = 0; j < matchedTypes.length; j++)
							{
								// Grab this raid
								var raid = matchedTypes[j];
								
								// Have the raid bot tell them 
								deck.activeDialogue().raidBotMessage(raid.getVerboseText(filter.difficulty));
							}
							
							ret.success = ret.success && true;
						}
						// If we didn't match a single raid
						else
						{
							ret.success = ret.success && true;
							ret.statusMessage = (i > 0?"\n":"") + "Could not locate any raids matching <code>" + filter.toString() + "</code>";
						}
						
					}
					
					return ret;
				},
				getOptions: function()
				{
				    console.log("Raid Info: ", this, this.parser);
				    
					var commandOptions = {					
						initialText: {
							text: "Raid Info for: " + this.parser.name,
							executable: false
						},
						all: {
							text: "All",
							callback: function()
							{
								DCDebug("Info All " + this.parser.name);
								delete this.parser.difficulty;
							}
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Info Normal " + this.parser.name);
								this.parser.difficulty = 1;
							}
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Info Hard " + this.parser.name);
								this.parser.difficulty = 2;
							}
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Info Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							}
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Info Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raid raidName difficulty</code>\n";
					helpText += "where <code>raidName</code> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "\n";
					helpText += "<b>Example:</b>\n";
					helpText += "Raid data for NM Tulk: " + this.getCommandLink("tulk 4") + "\n";

					return helpText;
				}
			}
		);
		

		RaidCommand.create( 
			{
				commandName: "raidbulkcallback",
				aliases: [],
				doNotEnumerateInHelp: true,
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// Break apart the guid and possible cancel message
					var paramsParts = params.split(" "),
					    guid = paramsParts[0],
					    bulkRaidObject = DC_LoaTS_Helper.bulkRaids[guid],
					    cancel = paramsParts[1];
					    
					DCDebug(paramsParts, guid, bulkRaidObject, cancel);
					
					// If this load was canceled
					if ( (typeof cancel !== "undefined" && cancel === "cancel") || bulkRaidObject.canceled)
					{
						// Keep track of the total run time so far
						if (typeof bulkRaidObject.runTime === "undefined")
						{
							bulkRaidObject.runTime = 0;
						}
						bulkRaidObject.runTime += (new Date()/1) - bulkRaidObject.startTime;
						bulkRaidObject.canceled = true;
						if (bulkRaidObject.timeout)
						{
							clearTimeout(bulkRaidObject.timeout);
							delete bulkRaidObject.timeout;
						}
						ret.success = true;
						ret.statusMessage = "Canceled bulk load from " + bulkRaidObject.loadSource;
					}
					else
					{
						if (typeof bulkRaidObject.iteration === "undefined")
						{
							bulkRaidObject.iteration = 0;
							bulkRaidObject.startTime = new Date()/1;
							holodeck.activeDialogue().raidBotMessage("Loading bulk raids from " + bulkRaidObject.loadSource + ". " + DC_LoaTS_Helper.getCommandLink("/raidbulkcallback " + guid + " cancel", "Cancel?"));
						}
						
						var raidIndexToLoad = bulkRaidObject.iteration++;
						var raidToLoad = bulkRaidObject.raids[raidIndexToLoad];
						if (raidIndexToLoad < bulkRaidObject.raids.length)
						{
							DC_LoaTS_Helper.loadRaid(raidToLoad);
							
							bulkRaidObject.iteration >= bulkRaidObject.raids.length
							
							bulkRaidObject.timeout = setTimeout("holodeck.processChatCommand(\"/raidbulkcallback " + guid + "\");", 1500);
						}
						else 
						{
							ret.statusMessage = "Completed bulk load from " + bulkRaidObject.loadSource + " in " + ((new Date()/1) - bulkRaidObject.startTime) + "ms.";
						}
						ret.success = true;
					}
					
					
					return ret;
				},
				
				getOptions: function()
				{
					return {};
				},
				
				buildHelpText: function()
				{
					return "";
				}
			}
		);
		

		RaidCommand.create( 
			{
				commandName: "raidformat",
				aliases: [],
				// Custom parsing
				/*parsingClass: ,*/
				// Custom parsing means custom param text
				paramText: "[newFormat]",
				
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					if (params.length == 0)
					{
						// Retrieve the message format
						var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
						// Let the user know what the format is
						ret.statusMessage = "Current raid format: <code>" + messageFormat + "</code>" + 
											"\nUse <code>" + this.getCommandLink("help") + "</code> to list all formatting options.";

					}
					else if (params == "reset")
					{
						var messageFormat = RaidLink.defaultMessageFormat;
						
						// Retrieve the message format
						GM_setValue(DC_LoaTS_Properties.storage.messageFormat, messageFormat);

						// Let the user know what the format is
						ret.statusMessage = "Raid format reset to: <code>" + messageFormat + "</code>";
					}
					// Has a format and is not a help request
					else
					{
						// Store the message format
						GM_setValue(DC_LoaTS_Properties.storage.messageFormat, params);
						
						// Notify user that we stored it
						ret.statusMessage = "Raid format is now: <code>" + params + "</code>";
						
						// Update the posted links
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Set raid format to " + this.processedText
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					// Get the text of all the cache states
					var cache_state_text = "";
					var cache_state_nice_text = "";
					var cache_state_short_text = "";
					
					for (var stateName in RaidManager.STATE)
					{
						var state = RaidManager.STATE[stateName];
						if (typeof state == "object")
						{
							cache_state_text += state.text + ", ";
							cache_state_nice_text += state.niceText + ", ";
							cache_state_short_text += state.shortText + ", ";
						}
					}
					
					var unknownState = RaidManager.STATE.getUnknownState();
					cache_state_text += "or " + unknownState.text;
					cache_state_nice_text += "or " + unknownState.niceText;
					cache_state_short_text += "or " + unknownState.shortText;
					
					
					// Get the text of all the difficulties
					var difficulty_text = "";					
					for (var diffNum in RaidType.difficulty)
					{
						difficulty_text += RaidType.difficulty[diffNum] + ", ";
					}
					difficulty_text += "or Unknown (error)";
					
					// Get the text of all the short difficulties
					var diff_text = "";
					for (var diffNum in RaidType.shortDifficulty)
					{
						diff_text += RaidType.shortDifficulty[diffNum] + ", ";
					}
					diff_text += "or Unknown (error)";
					
					
					var helpText = "<b>Raid Command:</b> <code>/raidformat newFormat</code>\n";
					helpText += "where <code>newFormat</code> <i>(optional)</i> is the new format for raid links\n";
					helpText += "if <code>newFormat</code> is omitted, it will tell you your current raid format\n";
					helpText += "\n";
					helpText += "<b>Format options (hover for description):</b>\n";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_text + "\">cache-state</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">cache-state-nice</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">state</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_nice_text + "\">status</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">cache-state-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">state-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + cache_state_short_text + "\">status-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + difficulty_text + "\">difficulty</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + diff_text + "\">diff</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fs</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fair</span>, ";
					helpText += "<span class=\"abbr\" title=\"Fair Share (of damage) = Max raid health / Max raid members\">fairshare</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Health\">health</span>, ";
					helpText += "<span class=\"abbr\" title=\"Unique Raid ID Number\">id</span>, ";
					helpText += "<span class=\"abbr\" title=\"Kongregate LoaTS icon\">image</span>, ";
					helpText += "<span class=\"abbr\" title=\"Break to the next line\">line</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Raid Name\">name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">os</span>, ";
					helpText += "<span class=\"abbr\" title=\"Same as target\">optimal</span>, ";
					helpText += "<span class=\"abbr\" title=\"Official Short Raid Name\">short-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"User defined short name\">shorter-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Shortest unique name of the raid\">shortest-name</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid Size = Max raid members\">size</span>, ";
					helpText += "<span class=\"abbr\" title=\"S, E, and/or H if the raid uses Stamina, Energy, and/or Honor\">stat</span>, ";
					helpText += "<span class=\"abbr\" title=\"Target (Damage) = FS * multiplier. Changes per raid size.\">target</span>, ";
					helpText += "<span class=\"abbr\" title=\"Duration of the raid\">time</span>, ";
					helpText += "<span class=\"abbr\" title=\"Full text url of the raid\">url</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + RaidManager.STATE.VISITED.niceText + "\" if you've loaded this raid before, blank otherwise\">visited</span>, ";
					helpText += "<span class=\"abbr\" title=\"" + RaidManager.STATE.VISITED.shortText + "\" if you've loaded this raid before, blank otherwise\">visited-short</span>, ";
					helpText += "<span class=\"abbr\" title=\"Raid's Mission Zone. On Alliance raids, indicates Archimedes tier.\">zone</span>";
					helpText += "\n";
					helpText += "\n";
					helpText += "Options should be placed in <code>{}</code>\n";
					helpText += "\n";
					helpText += "<b>Default:</b>\n";
					helpText += "<code>" + this.getCommandLink(RaidLink.defaultMessageFormat) + "</code>\n";
					helpText += "<i class=\"smallText\">(<code>" + this.getCommandLink("reset") + "</code> will set your format back to this)</i>\n";
					helpText += "\n";
					helpText += "<b>SRLTSX Default:</b>\n";
					helpText += "<code>" + this.getCommandLink("{visited} {name} - {diff} - {fs}/{os}") + "</code>";
					helpText += "\n";
					helpText += "<b>Short:</b>\n";
					helpText += "<code>" + this.getCommandLink("{cache-state-short} {diff} {shorter-name}") + "</code>";
					helpText += "\n"
					helpText += "<b>Notes:</b>\n"
					helpText += "<code>{fs}</code> can also do simple math like <code>{fs*2}</code>\n"
					helpText += "Use <code>{line}</code> for new lines, and can be used multiple times.\n"
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raidhelp",
				aliases: ["raidabout", "raidbot"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {sucess: true};
					
					DC_LoaTS_Helper.printScriptHelp(deck, text);
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Display doomscript help"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidhelp</code>\n";
					helpText += "Displays the help info for the script\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "raidstyle",
				aliases: [],
				parsingClass: RaidFilterStyleParser,

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					console.log(parser);
					
					if (typeof parser.raidFilter === "undefined" || parser.raidFilter.isEmpty())
					{
						//TODO: Display all existing raid styles
						
						
					}
					else if (typeof parser.linkStyle === "undefined" && typeof parser.messageStyle === "undefined" && typeof parser.imageStyle === "undefined")
					{
						//TODO: Display all raid styles that have the same filter
					}
					else
					{
						// Find all the styles matching this filter
						var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];
						if (typeof matchingStyles === "undefined")
						{
							matchingStyles = [];
							DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()] = matchingStyles;
						}
						
						// Have the parser create CSS styles for itself.
						parser.injectStyles();
						
						// Add this to the list of styles for this filter
						matchingStyles.push(parser);
						
						// Success report
						ret.success = true;
						ret.statusMessage = parser.toString();
						
						// Refresh the links to see the change
						DC_LoaTS_Helper.updatePostedLinks();
					}
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Execute this raid style command"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/raidstyle filter +linkStyle +messageStyle +imageStyle</code>\n";
					helpText += "\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "refreshlinks",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					DC_LoaTS_Helper.updatePostedLinks();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Refresh the links in chat"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/refreshlinks</code>\n";
					helpText += "Will refresh all the links and their states in chat.\n";
					helpText += "This can help if raids aren't looking marked like they should be.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "reload",
				aliases: ["refresh", "reloaf", "reloa", "eload"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};

					// true if we did reload, false otherwise
					ret.success = DC_LoaTS_Helper.reload();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Reload the game"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/reload</code>\n";
					helpText += "Attempts to reload just the game and not the window\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "seenraids",
				aliases: ["seenraid", "raidseen", "raidseen", "sr"],
				parsingClass: RaidMultiFilter,
				handler: function(deck, raidFilter, params, text, context)
				{
					// Capture the start time of the query
					var queryStartTime = new Date()/1;
				
					// Declare ret object
					var ret = {};
					
					// Find all raids that match the user's criteria
					var raidLinks = RaidManager.fetchByFilter(raidFilter);
					
					// If the RaidManager executed successfully
					if (typeof raidLinks != "undefined")
					{
						// If we didn't match a single raid
						if (raidLinks.length == 0)
						{
							if (params.length == 0)
							{
								ret.statusMessage = "Could not locate any seen raids in memory.";
							}
							else
							{
								ret.statusMessage = "Could not locate any seen raids matching <code>" + params + "<code>";
							}
							
							// The lookup succeeded, we just didn't find anything
							ret.success = true;
						}
						// If we did match some raids
						else
						{
							// Retrieve the message format
							var messageFormat = DC_LoaTS_Helper.getMessageFormat();
						
							// Retrieve the anchor tag format
							var linkFormat = DC_LoaTS_Helper.getLinkFormat();
							
							// Capture all the text in one block
							var outputText = "\n";
							
							// For every link we found
							for (var i = 0; i < raidLinks.length; i++)
							{
								// We need to find the style the user has requested
								var className = raidLinks[i].getMatchedStyles().className;
								
								// Bits to wrap each message raid link with
								var wrapperFront = "<span class=\"seenraidMessageWrapper" + (className?" " + className:"") + "\">" + (i+1) + ") ";
								var wrapperBack = "</span>\n\n";
								
								// Print matched links
								outputText += wrapperFront + raidLinks[i].getFormattedRaidLink(messageFormat, linkFormat) + wrapperBack;
							}
							
							// Print out the raid links we found
							deck.activeDialogue().raidBotMessage(outputText);
							
							// Print out the stats for the query
							ret.statusMessage = "<code>/" + this.commandName + " " + raidFilter.toString() + "</code> took " + (new Date()/1 - queryStartTime) + " ms and yielded " + raidLinks.length + " results.";
							// Succeeded
							ret.success = true;
						}
					}
					// RaidManager failed
					else
					{
						ret.statusMessage = "Did not understand command: <code>" + text + "</code>";
						ret.success = false;
					}
					
					return ret;
				},
				
				getOptions: function()
				{
					var commandOptions = {
						
						initialText: {
							text: "Seen raids: " + ((typeof this.parser.name != "undefined")?this.parser.name : "Unknown")
						},
						
						any: {
							text: "Any",
							callback: function()
							{
								DCDebug("Seen Any " + this.parser.name);
								delete this.parser.difficulty;
							}
						},
						
						normal: {
							text: "Normal",
							callback: function()
							{
								DCDebug("Seen Normal " + this.parser.name);
								this.parser.difficulty = 1;
							}
						},
						
						hard: {
							text: "Hard",
							callback: function()
							{
								DCDebug("Seen Hard " + this.parser.name);
								this.parser.difficulty = 2;
							}
						},
						
						legendary: {
							text: "Legendary",
							callback: function()
							{
								DCDebug("Seen Legendary " + this.parser.name);
								this.parser.difficulty = 3;
							}
						},
						
						nightmare: {
							text: "Nightmare",
							callback: function()
							{
								DCDebug("Seen Nightmare " + this.parser.name);
								this.parser.difficulty = 4;
							}
						}
					};
					
					return commandOptions;
				},

				
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/seenraids raidName difficulty {state: stateName} {age: timeFormat} {size: sizeFormat} {fs: fsFormat} {os: osFormat} {zone: zoneNumber} {count: numberResults} {page: resultsPage}</code>\n";
					helpText += "Looks up raids that you've seen before in chat"
					helpText += "where <code>raidName</code> <i>(optional)</i> is any partial or full raid name\n";
					helpText += "where <code>difficulty</code> <i>(optional)</i> is a number 1 - 4 where 1 is normal, 4 is nightmare\n";
					helpText += "where <code>stateName</code> <i>(optional)</i> is either seen or visited\n";
					helpText += "where <code>timeFormat</code> <i>(optional)</i> is like <code>&lt;24h</code>, <code>&lt;30m</code>, or <code>&gt;1d</code>\n";
                    helpText += "where <code>sizeFormat</code> <i>(optional)</i> is like <code>&lt;100</code> or <code>250</code>\n";
                    helpText += "where <code>osFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>fsFormat</code> <i>(optional)</i> is like <code>&lt;1m</code> or <code>&gt;500k</code>\n";
                    helpText += "where <code>zoneNumber</code> <i>(optional)</i> is like <code>1</code>, <code>Z14</code>, <code>ZA</code>, <code>WR</code>\n";
					helpText += "where <code>numberResults</code> <i>(optional)</i> is the number of results to display\n";
					helpText += "where <code>resultsPage</code> <i>(optional)</i> is if you've set count, then which page to show. If page is omitted, it will show the first page of results.\n";
					helpText += "\n";
					helpText += "<b>Examples:</b>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all raids you've seen, but not visited that you saw posted in the last 5 hours that have FS &lt; 1M<i>\n";
					helpText += "<code>" + this.getCommandLink("{state:seen} {age: <5h} {fs:<1M}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all normal telemachus raids that you've not visited before\n";
					helpText += "<code>" + this.getCommandLink("tele 1 {state:!visited}") + " </code>\n";
					helpText += "\n";
					helpText += "<i>Find the first 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find the second 10 void killer raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("killer {count: 10} {page: 2}") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Find all void nightmare vorden raids you've seen\n";
					helpText += "<code>" + this.getCommandLink("vorden 4") + "</code>\n";
					helpText += "\n";
					helpText += "<i>Looking for <a href=\"http://www.zoywiki.com/index.php/LotS/experiment/multicoloredcloorian\" title=\"Cloorian Material needed to craft some Legendary pants\">Cloorian Material<a/>\n";
					helpText += "<code>" + this.getCommandLink("vor|gan|nat 4 {age: <24h} {state: !visited}") + "</code>\n";
					
					return helpText;
				}
			}
		);
		
		// This is the general template which chat commands should follow
		RaidCommand.create( 
			{
				commandName: "template", // This is the /template command
				aliases: ["templateCommand", "commandTemplate"], // Also, /templateCommand and /commandTemplate
				parsingClass: RaidMultiFilter, // Comment out this line, and a parser will not be created
				myCustomAttribute: "Foo",
				doNotEnumerateInHelp: true, // Don't list this in the help
				
				
				// It's highly advised to just delete this function entirely
				// but I've left it here, commented out, to show that it
				// can be used if you know what you're doing										
//					initialize: function($super, context, commandText)
//					{
//						// Do some special constructor logic here
//						
//						// In the name of all that is good, call the superclass constructor
//						// somewhere in here
//						$super(context, commandText);
//					},

				
				// Handle the execution of this command
				// Parameters:
				//		deck - The Kongregate holodeck
				//		parser - If there is a parsing class, this parser was run with the params
				// 		params - Command text stripped of /commandName from the front
				//		text - Full text of the command as it was called
				//		context - Where this command was called from, either chat or omnibox
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {};
					
					// The work should be done in here
					
					// Explicitly posting as the RaidBot to the chat
					// This only shows for the current user. This message is not sent to everyone.
					deck.activeDialogue().raidBotMessage("Hello World!");

					
					// Always set the success state
					// If the command succeeeded, set the status to true
					// If it failed, set it to false
					ret.success = true;
					
					// If you want to display a message to the user after the command
					// finishes, put the text of the message in ret.statusMessage
					// Unrelatedly, we can also access custom attributes like this.myCustomAttribute
					ret.statusMessage = this.myCustomAttribute;
					
					// Always way to return the ret object
					return ret;
				},
				
				// These options are what the omnibox uses to determine how to display
				// this command as an autocomplete option
				getOptions: function()
				{
					// Typically, there is just a single commandOptions object that is returned
					var commandOptions = {	
						// This option is a clickable link that will load
						// a page in a new window/tab like a real link				
						initialText: {
							// Text of the link
							text: "Open script homepage",
							// Attributes of the <a> tag of this link
							// If there are linkParams, the option will call the handler
							// unless doNotCallHandler is true
							linkParams: {href: this.myCustomFunction(), target: "_blank"},
							// Do not call the above handler function
							doNotCallHandler: true,
							// Actually let the browser load the link
							followLink: true
						},
						
						// This option is just text. It doesn't do anything
						otherOption: {
							text: "Not clickable",
							// Sets this option to do nothing
							executable: false
						},
						
						// This command actually runs the template command
						thirdOption: {
							// Text of the command button
							text: "Run Template Command",
							// If there's a callback, the option will call the handler
							// unless doNotCallHandler is true.
							callback: function()
									  {
									  	// Do work in here. Usually just minor
									  	// set up work since the handler is going
									  	// to be called next. 
									  	// If this code starts to get long, you
									  	// might consider going about it differently.
									  }
						}
					};
					
					// Make sure to return the options we just made
					return commandOptions;
				},
				
				// Custom functions go in just like needed functions
				myCustomFunction: function()
				{
					return DC_LoaTS_Properties.scriptURL;
				},
				
				// Here you simply construct the help text for when a user calls /template help
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/template</code>\n";
					helpText += "Prints hello world, or does something else\n";
					
					// Aliases for the command will be automatically appended to the bottom
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "time",
				aliases: ["servertime"],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
					
					ret.statusMessage = "Local Time is approximately: " + this.getLocalDateText() + "\n";
					ret.statusMessage += "Server Time is approximately: " + this.getServerDateText();
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						config: {
							refreshEvery: 1000
						},
						initialText: {
							text: "Local Time: " + this.getLocalDateText() + "<br>Server Time: " + this.getServerDateText()
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/time</code>\n";
					helpText += "Estimates the current server time (GMT) based on local system time.\n";
					
					return helpText;
				},
				
				getLocalDateText: function()
				{
					return new Date().toLocaleString();
				},
				getServerDateText: function()
				{
					var localDate = new Date();
					var serverDate =  new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000);
					return serverDate.toLocaleString().substring(0,25) + " GMT+0000 (UTC)";
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "update",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					window.open(DC_LoaTS_Properties.scriptDownloadURL, "_blank");
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Get the current stable script"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/update</code>\n";
					helpText += "Attempts to install the latest stable doomscript version from <a href=\"" + DC_LoaTS_Properties.scriptURL + "\">" + DC_LoaTS_Properties.scriptURL + "</a>.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "updateraiddata",
				aliases: ["urd", "updatedata"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					DC_LoaTS_Helper.updateRaidData();
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {
						initialText: {
							text: "Update your local raid data"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/updateraiddata</code>\n";
					helpText += "Attempts to update to the latest raid data (All the raid types).\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "version",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/
				handler: function(deck, parser, params, text, context)
				{
					return {success: true, statusMessage: "Your doomscript version is <b>" + DC_LoaTS_Properties.version + "</b>"};
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Your doomscript version is <b>" + DC_LoaTS_Properties.version + "</b>",
							doNotCallHandler: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/version</code>\n";
					helpText += "Tells the current version of the installed script.\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "wiki",
				aliases: ["search", "lookup", "zoywiki"],
				urlPattern: "http://www.zoywiki.com/index.php?title=Special:Search&search=LotS/{0}&go=Go",
				// No parsing
				/*parsingClass: ,*/
				paramText: "query",

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
											
					var url = this.createURL(params);
					
					window.open(url, "_blank");
					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Search Zoywiki for: " + this.processedText,
							linkParams: {href: this.createURL(this.processedText), target: "_blank"},
							doNotCallHandler: true,
							followLink: true
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/wiki searchText</code>\n";
					helpText += "where <code>searchText</code> is what you want to search for on Zoywiki\n";
					
					return helpText;
				},
				
				createURL: function(searchInput)
				{
					searchInput = searchInput || "";
					return this.urlPattern.format(escape(searchInput.replace(" ", "+")));
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "rss",
				aliases: ["forums", "threads", "posts"],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true, statusMessage: "Reading RSS feed..."};

					DC_LoaTS_Helper.ajax({
						url: "http://www.legacyofathousandsuns.com/forum/external.php?type=RSS2",
						onload:function(response) {
							var xmlDoc = (new DOMParser()).parseFromString(response.responseText, "text/xml"),
							    items = xmlDoc.getElementsByTagName("item"),
							    i, item, j, child, threads = [], thread, 
							    str = "Recent posts (as of " + DC_LoaTS_Helper.getCurrentPrettyDate() + ")";
							
							for (i = 0; i < items.length; i++) {
								item = items[i];
                                threads.push({
                                    title: getNodeValue(item, "title"),
                                    url: getNodeValue(item, "link"),
                                    date: getNodeValue(item, "pubDate"),
                                    relativeDate: DC_LoaTS_Helper.timeDifference(new Date()/1, new Date(getNodeValue(item, "pubDate"))/1),
                                    description: getNodeValue(item, "description"),
                                    category: getNodeValue(item, "category"),
                                    categoryUrl: getNodeValue(item, "category", "domain"),
                                    creator: getNodeValue(item, "creator")
                                });
							}

                            function getNodeValue(parent, tagName, attribute) {
                                tags = parent.getElementsByTagNameNS("*", tagName);
                                if (tags && tags[0]) {
                                	if (attribute) {
                                		return tags[0].attributes[attribute].nodeValue;
                                	}
                                	else {
                                		return tags[0].childNodes[0].nodeValue;
                                	}
                                }
                                
                                return "<i>Unable to locate in RSS feed</i>";
                            }

                            for (i = 0; i < threads.length; i++) {
                            	thread = threads[i];
                            	str += "\n--------------------------------------------------\n"
                                str += thread.relativeDate + " ";
                            	str += "<a href='" + thread.categoryUrl + "' target='_blank'>" + thread.category + "</a>";
                            	str += " &gt; <a href='" + thread.url + "' target='_blank'>" + thread.title + "</a>";
                            }
                            
                            holodeck.activeDialogue().raidBotMessage(str);
                            
						} // end onload
					});					
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Lists recent threads from the forums"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/threads</code>\n";
					helpText += "Lists recent threads from the forums\n";
					
					return helpText;
				}
			}
		);
		
		RaidCommand.create( 
			{
				commandName: "timerdata",
				aliases: [],
				// No parsing needed
				/*parsingClass: ,*/

				handler: function(deck, parser, params, text, context)
				{
					// Declare ret object
					var ret = {success: true};
						
					deck.activeDialogue().raidBotMessage(Timer.getReport());
						
					return ret;
				},
				getOptions: function()
				{
					var commandOptions = {					
						initialText: {
							text: "Print the timer report"
						}
					};
					
					return commandOptions;
				},
				buildHelpText: function()
				{
					var helpText = "<b>Raid Command:</b> <code>/timerdata</code>\n";
					helpText += "Prints out timing and performance data about the script\n";
					
					return helpText;
				}
			}
		);
		
		
		// Manage data related to the CConoly API
		window.CConolyAPI = {
				
			lastQueryTimeKey: DC_LoaTS_Properties.storage.cconolyLastQueryTime,
			useQueryTimeDeltaPrefKey: "UseQueryTimeDelta",
			
			baseUrl: "http://cconoly.com/lots/",
			markDeadUrl: "markDead.php?kv_raid_id=%RAID_ID%&doomscript=%VERSION%",
			raidListUrl: "raidlinks.php?hrs=%TIME%&doomscript=%VERSION%",
			
			setLastQueryTime: function(lastQueryTime) {
				GM_setValue(this.lastQueryTimeKey, lastQueryTime);
			},
			
			getMarkDeadUrl: function(raidID) {
				var reportUrl = this.baseUrl + this.markDeadUrl;
				reportUrl = reportUrl.replace("%RAID_ID%", raidID);
				reportUrl = reportUrl.replace("%VERSION%", this.getVersionString());
				return reportUrl;
			},
			
			getRaidListUrl: function() {
				var raidListUrl = this.baseUrl + this.raidListUrl;
				raidListUrl = raidListUrl.replace("%TIME%", this.getRaidListQueryHours());
				raidListUrl = raidListUrl.replace("%VERSION%", this.getVersionString());
				return raidListUrl;
			},
			
			getVersionString: function() {
				return this.versionString || (this.versionString = DC_LoaTS_Properties.version.toString().replace(/\./g, ""));
			},
			
			getRaidListQueryHours: function()
			{
				return DC_LoaTS_Helper.getPref(this.useQueryTimeDeltaPrefKey, true) ? this.getHoursSinceLastQuery() : 168;
			},
			
			getHoursSinceLastQuery: function() {
				var elapsedMs = new Date()/1 - GM_getValue(this.lastQueryTimeKey, 0);
				elapsedHrs = elapsedMs / 1000 / 60 / 60; // Convert ms to hours
				return Math.min(168, Math.ceil(elapsedHrs * 1000)/1000); // Round to 3 decimals, take 168 or lower
			}
		};
		

// List of all raid ids and names. Any raid without a real raid id will not show up nicely.
DC_LoaTS_Helper.raids =
{
    // Personal Raids
    sherlock_holmes:    new RaidType("sherlock_holmes",    "Z10", "The Murderer", "Murderer", "Murderer",             12,   1, "S",    [6000000, "N/A", "N/A", "N/A"]),
    wrath_of_player:    new RaidType("wrath_of_player",     "ZA", "Your Wrath", "Your Wrath", "Wrath",                12,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    lu_bu:              new RaidType("lu_bu",              "ZA2", "LU BU", "LU BU", "Lubu",                           12,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    ragnar:             new RaidType("ragnar",             "ZA3", "Ragnar", "Ragnar", "Ragnar",                        1,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    centurian_covert_agent:new RaidType("centurian_covert_agent","ZA3", "Centurian Covert Agent", "CC Agent", "Agent", 1,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    talia:              new RaidType("talia",              "ZA4", "Talia", "Talia", "Talia",                           1,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    myrmexidaks:        new RaidType("myrmexidaks",        "ZA4", "Myrmexidaks", "Myrmexidaks", "Myrm",                1,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),

    // Public raids
    // Small Raids
    commander:          new RaidType("commander",           "Z1", "Centurian Commander", "CC Commander", "CC Comm",  168,  10, "S",     150000),
    ragebeasts:         new RaidType("ragebeasts",          "Z2", "Garlax Ragebeasts", "Ragebeasts", "Rage",         120,  10, "S",    2000000),
    cybertollahs:       new RaidType("cybertollahs",        "Z3", "Supreme Cybertollahs", "Cybertollahs", "Cyber-T",  72,  10, "S",    4000000),
    seth:               new RaidType("seth",                "Z4", "Nathaniel Vorden", "Vorden", "Vorden",             72,  10, "S",    6000000),
    purple_lion:        new RaidType("purple_lion",         "Z5", "Purple Lion", "Lion", "Lion",                      72,  10, "S",    8000000),
    scarlet_harlet:     new RaidType("scarlet_harlet",      "Z6", "The Scarlet Harlot", "Scarlet", "Harlot",          72,  10, "S",   10000000),
    lupin:              new RaidType("lupin",               "Z7", "Lupin", "Lupin", "Lupin",                          72,  10, "S",   12000000),
    lieutenant_targe:   new RaidType("lieutenant_targe",    "Z8", "Lieutenant Targe", "Targe", "Targe",              120,  10, "S",   14000000),
    sigurd:             new RaidType("sigurd",              "Z9", "Sigurd Spinebreaker", "Sigurd", "Sigurd",          72,  10, "S",   16000000),
    space_pox:          new RaidType("space_pox",           "P1", "Space Pox", "Pox", "Pox",                           5,  12, "S", [100000000, 500000000, 1000000000, 1500000000],/*FS calculated normally*/null,[35000000, 175000000, 350000000, 525000000]),
    quiskerian_temple:  new RaidType("quiskerian_temple",   "L1", "Quiskerian Temple", "Temple", "Temple",            10,  25, "S", [200000000, 1000000000, 2000000000, 3000000000]),
    missile_strike:     new RaidType("missile_strike",      "ZA", "Missile Strike", "Missiles", "Missile",            72,  10, "S",  [22000000, 28600000, 35200000, 44000000]),
    pi:                 new RaidType("pi",                 "ZA2", "Pi", "Pi", "Pi",                                   72,  10, "S",  [24000000, 31200000, 38400000, 48000000]),
    master_hao:         new RaidType("master_hao",         "Z19", "Master Hao", "Hao", "Hao",                         36,  10, "S",[1000000000, 1300000000, 1600000000, 2000000000]),
    trulcharn:          new RaidType("trulcharn",           "F1", "Trulcharn", "Trulcharn", "Trulcharn",               3,  10, "S",[10100000000, 10100000000, 10100000000, 10100000000],/*FS calculated normally*/null,[1000000000, 1000000000, 1000000000, 1000000000]),

    // Medium Raids
    "void":             new RaidType("void",                "Z1", "Centurian Void Killer", "Void Killer", "VK",      168,  50, "S",    5000000),
    carnus:             new RaidType("carnus",              "Z2", "Carnus 9000", "Carnus", "Carnus",                 120,  50, "S",   15000000),
    cruiser:            new RaidType("cruiser",             "Z3", "Centurian Cruiser", "CC Cruiser", "Cruiser",       72,  50, "S",   25000000),
    china:              new RaidType("china",               "Z4", "Blood Alley Gang", "Gang", "Gang",                 72,  50, "S",   35000000),
    advocate_tulk:      new RaidType("advocate_tulk",       "Z5", "Advocate Tulk", "Tulk", "Tulk",                    75,  50, "S",   45000000),
    caligula:           new RaidType("caligula",            "Z6", "Caligula", "Caligula", "Cali",                     72,  50, "S",   55000000),
    warden_ramiro:      new RaidType("warden_ramiro",       "Z7", "Warden Ramiro", "Ramiro", "Ramiro",                72,  50, "S",   60000000),
    vulture_gunship:    new RaidType("vulture_gunship",     "Z8", "Vulture Gunship", "Vulture", "Vulture",            72,  50, "S",   65000000),
    xarpa:              new RaidType("xarpa",               "Z9", "Centurian Fleet Commander", "Fleet Com.", "Fleet Comm",72,50,"S",  70000000),
    bachanghenfil:      new RaidType("bachanghenfil",      "Z10", "Bachanghenfil", "Bachanghenfil", "Bach",           72,  50, "S",  [75000000, 97500000, 120000000, 150000000]),
    gut_phager:         new RaidType("gut_phager",         "Z11", "Gut-Phager", "Gut-Phager", "Phager",               72,  50, "S",  [80000000, 104000000, 128000000, 160000000]),
    bashan:             new RaidType("bashan",              "ZA", "Bashan", "Bashan", "Bashan",                       72,  50, "S",   85000000),
    cyborg_shark:       new RaidType("cyborg_shark",        "ZA2", "Cyborg Shark", "C. Shark", "Shark",               72,  50, "S",   90000000),
    hulking_mutant:     new RaidType("hulking_mutant",      "Z15", "Hulking Mutant", "Mutant", "Mutant",              72,  50, "S",   90000000),
    screaming_barracuda:new RaidType("screaming_barracuda", "Z16", "Screaming Barracuda", "Barracuda", "Barracuda",   72,  50, "S",  110000000),
    vunlac:             new RaidType("vunlac",              "Z19", "Vunlac", "Vunlac", "Vunlac",                      36,  50, "S", [1500000000, 1950000000, 2400000000, 3000000000]),
    silj:               new RaidType("silj",                "ZA3", "Silj the Wurm-Rider", "Silj", "Silj",             30,  50, "S",  750000000),
    tyraness_guard:     new RaidType("tyraness_guard",      "ZA4", "Tyraness' Guard", "Tyr. Guard", "Guard",          30,  50, "S",  750000000),

    // Large Raids
    telemachus:         new RaidType("telemachus",          "Z1", "Telemachus", "Telemachus", "Tele",                168, 100, "S",   20000000),
    carnifex:           new RaidType("carnifex",            "Z2", "Carnifex Prime", "Carnifex", "Carni",             120, 100, "S",   35000000),
    rautha:             new RaidType("rautha",              "Z3", "Commander Rautha", "Rautha", "Rautha",             72, 100, "S",   50000000),
    assasin:            new RaidType("assasin",             "Z4", "Kelovar Assassin", "Assassin", "Assa",             72, 100, "S",   65000000),
    robotic_rautha:     new RaidType("robotic_rautha",      "Z5", "Robotic Rautha", "Rautha 2.0", "Robo Rautha",      75, 100, "S",   80000000),
    agony_and_ecstasy:  new RaidType("agony_and_ecstasy",   "Z6", "Agony and Ecstasy", "Agony, Ecstasy", "A&E",       72, 100, "S",   95000000),
    sun_xi:             new RaidType("sun_xi",              "Z7", "Sun Xi's Echo", "Psi-Echo", "Echo",                72, 100, "S",  100000000),
    sludge_serpent:     new RaidType("sludge_serpent",      "Z8", "Sludge Serpent", "Serpent", "Serpent",             72, 100, "S",  120000000),
    kalaxian_cult_mistress: new RaidType("kalaxian_cult_mistress","Z10","Kalaxian Cult-Mistress", "Cult-Mistress", "Cult",72, 100, "S", [180000000, 234000000, 288000000, 320000000]),
    shuborunth: 		new RaidType("shuborunth",         "Z13","Wulblunralxanachi", "Blob", "Blob",                 72, 100, "S", [200000000, 260000000, 320000000, 400000000]),
    birthday_cake_of_doom: new RaidType("birthday_cake_of_doom", "ZA","Birthday Cake of Doom", "Cake", "Cake",        72, 100, "S", [250000000, 325000000, 400000000, 500000000]),
    anthropist_xenocide_warship:new RaidType("anthropist_xenocide_warship","ZA2","Anthropist Xenocide Warship","Xenocide","Xeno",72,100,"S",[300000000, 390000000, 480000000, 600000000]),
    tentacled_turkey:   new RaidType("tentacled_turkey",   "Z15","Tentacled Turkey","Turkey","Turkey",                72, 100, "S", [350000000, 455000000, 560000000, 700000000]),
    where_music_meets:  new RaidType("where_music_meets",  "Z16","Symphony of Two Worlds","Symphony","Symphony",      72, 100, "S", [400000000, 520000000, 640000000, 800000000]),
    reichsmarschall_dule:new RaidType("reichsmarschall_dule","Z19","Reichsmarschall Dule", "R. Dule", "R. Dule",      36, 100, "S",[2000000000, 2600000000, 3200000000, 4000000000]),
    dark_hat:           new RaidType("dark_hat",           "ZA3","Dark Hat", "D. Hat", "D. Hat",                      30, 100, "S",[1000000000, 1300000000, 1600000000, 2000000000]),
    rampaging_rackalax: new RaidType("rampaging_rackalax", "ZA4","Rampaging Rackalax", "Rackalax", "Rack",            30, 100, "S",[1000000000, 1300000000, 1600000000, 2000000000]),

    // Large Plus Raids
    kulnarxex_subjugator_1:new RaidType("kulnarxex_subjugator_1","S","Kulnar-Xex Subjugator","K-X Subjugator","KX Sub",8, 125, "S", 12500000000, /*FS calculated normally */null, [100000000,125000000,160000000,200000000]),

    // Epic Raids
    colonel:            new RaidType("colonel",             "Z1", "Psychic Colonel", "CC Colonel", "Col.",           168, 250, "S",  150000000),
    vespasia:           new RaidType("vespasia",            "Z2", "Vespasia's Android", "Vespasia Bot", "Vesp",      168, 250, "S",  250000000),
    generalrahn:        new RaidType("generalrahn",         "Z3", "Centurian General", "CC General", "General",      168, 250, "S",  350000000),
    natasha:            new RaidType("natasha",             "Z4", "Natasha Cybersmash", "Cybersmash", "Cyber-S",     168, 250, "S",  450000000),
    centurian_sentinel: new RaidType("centurian_sentinel",  "Z5", "Centurian Sentinel", "CC Sentinel", "Sentinel",   165, 250, "S",  550000000),
    mercury:            new RaidType("mercury",             "Z6", "Mercury", "Mercury", "Mercury",                    72, 250, "S",  700000000),
    hultex_quibberath:  new RaidType("hultex_quibberath",   "Z7", "Guldax Quibberath", "Quibberath", "Quib",         168, 250, "S",  800000000),
    commander_veck:     new RaidType("commander_veck",      "Z8", "Centurian Storm Commander", "Storm", "Storm",     168, 250, "S",  900000000),
    reaver:             new RaidType("reaver",              "Z9", "Galactic Reaver", "Reaver", "Reaver",              72, 250, "S", 1000000000),
    the_hat:            new RaidType("the_hat",            "Z10", "The Hat", "Hat", "Hat",         	                  72, 250, "S", [1100000000, 1475000000, 1850000000, 2200000000]),
    g_rahn:             new RaidType("g_rahn",             "Z12", "G. Rahn", "G. Rahn", "G. Rahn",                    72, 250, "S", [1200000000, 1560000000, 1920000000, 2400000000]),
    guan_yu:            new RaidType("guan_yu",             "ZA", "Guan Yu", "Guan", "Guan",                          72, 250, "S", [1300000000, 1690000000, 2080000000, 2600000000]),
    bile_beast:         new RaidType("bile_beast",         "ZA2", "Bile Beast", "Bile", "Bile",                       72, 250, "S", [1400000000, 1820000000, 2240000000, 2800000000]),
    al_husam:           new RaidType("al_husam",           "Z17", "Al-Husam", "Al-Husam", "Al-Husam",                 72, 250, "S", [1500000000, 1950000000, 2400000000, 3000000000]),
    noir:               new RaidType("noir",               "Z18", "Noir", "Noir", "Noir",                             72, 250, "S", [1600000000, 2080000000, 2560000000, 3200000000]),
    sky_commander_bethany:new RaidType("sky_commander_bethany","Z19","Sky Commander Bethany","Bethany","Bethany",     36, 250, "S", [2500000000, 3250000000, 4000000000, 5000000000]),
    void_master:        new RaidType("void_master",        "ZA3", "Void Master", "V. Master", "V. Master",            30, 250, "S", [1250000000, 1625000000, 2000000000, 2500000000]),
    giant_kwelshax:     new RaidType("giant_kwelshax",     "ZA4", "Giant Kwelshax", "Kwelshax", "Kwel",               30, 250, "S", [1250000000, 1625000000, 2000000000, 2500000000]),

    // Colossal Raids
    besalaad_warmaster: new RaidType("besalaad_warmaster",  "Z5", "Besalaad Warmaster", "Warmaster", "Warmaster",    160, 500, "S",  700000000),
    mermara:            new RaidType("mermara",             "Z6", "Mermara", "Mermara", "Mermara",                   168, 500, "S",  800000000),
    nemo:               new RaidType("nemo",                "Z7", "Nemo",    "Nemo", "Nemo",                         168, 500, "S", 1000000000),
    the_emperor:        new RaidType("the_emperor",         "Z8", "Dule's Robot", "Dule's Bot", "Dule",              168, 500, "S", 5000000000),
    dule_warmaster:     new RaidType("dule_warmaster",      "Z9", "Centurian Councilor", "CC Councilor", "Councilor", 24, 500, "S", 2500000000),
    crush_colossa:      new RaidType("crush_colossa",      "Z10", "Crush Colossa", "Colossa", "Crush",                72, 500, "S", [3000000000, 3900000000, 4800000000, 6000000000]),
    nosferatu_nick:     new RaidType("nosferatu_nick",     "Z14", "Nosferatu Nick", "Nick", "Nick",                   24, 500, "S", 3500000000),
    niflung_boar:       new RaidType("niflung_boar",        "ZA", "Niflung Boar", "Boar", "Boar",                     30, 500, "S", 4000000000),
    vlarg_relic_hunter: new RaidType("vlarg_relic_hunter", "ZA2", "Vlarg Relic Hunter", "R. Hunter", "Vlarg",         30, 500, "S", 4500000000),
    noir2:              new RaidType("noir2",              "Z19", "Noir (II)", "Noir (II)", "Noir2",                  30, 500, "S", 5000000000),
    the_saboteur:       new RaidType("the_saboteur",       "ZA3", "The Saboteur", "Saboteur", "Saboteur",             30, 500, "S", 5000000000),
    the_tyraness:       new RaidType("the_tyraness",       "ZA4", "The Tyraness", "Tyraness", "Tyraness",             30, 500, "S", 5000000000),


    // Aliance Raids
    // Small Raids
    krakak:             new RaidType("krakak",              "A0", "Krakak Swarm", "Swarm", "Swarm",                  120,  10, "H",    4500000),
    kang:               new RaidType("kang",                "A1", "Kang", "Kang", "Kang",                            120,  10, "H",    5000000),
    crossbones_squadron: new RaidType("crossbones_squadron","A2", "Crossbones Squadron", "Crossbones", "XBones",     120,  10, "H",    8000000),
    colonel_mustard:    new RaidType("colonel_mustard",     "A3", "Colonel Mustard", "Mustard", "Mustard",           120,  10, "H",   12000000),
    professor_squid:    new RaidType("professor_squid",     "A4", "Professor Squid", "Squid", "Squid",               120,  10, "H",   18000000),
    terminus_death_squad: new RaidType("terminus_death_squad","A5", "Terminus Death Squad", "Death Squad", "Death Squad",120,10,"H",  24000000),
    rabid_reindeer:     new RaidType("rabid_reindeer",      "A8", "Rabid Reindeer", "Reindeer", "Reindeer",           60,  50, "H",  [62500000, 81250000, 100000000, 125000000]),

    // Medium Raids
    infection:          new RaidType("infection",           "A0", "Infected Squad",    "Infected", "Infected",       144,  50, "H",   30000000),
    flora:              new RaidType("flora",               "A1", "Ruomyes' Death Flora", "Death Flora", "Flora",    144,  50, "H",   35000000),
    psychic_cyborg:     new RaidType("psychic_cyborg",      "A2", "Mr. Justice", "Justice", "Justice",               144,  50, "H",   45000000),
    grislak:            new RaidType("grislak",             "A3", "Grislak", "Grislak", "Grislak",                   144,  50, "H",   55000000),
    qin_legion:         new RaidType("qin_legion",          "A4", "Qin Legion",    "Legion", "Legion",               144,  50, "H",   65000000),
    terminus_interceptor_squadron: new RaidType("terminus_interceptor_squadron","A5", "Terminus Interceptor Squadron", "Interceptor", "Interceptor", 144, 50,"H",75000000),
    luna:               new RaidType("luna",                "A6", "Luna", "Luna", "Luna",                            120,  50, "H",   50000000),
    trashmaster:        new RaidType("trashmaster",         "A6", "Trashmaster Colby", "Colby", "Colby",             144,  50, "H",  100000000),
    santas_workshop:    new RaidType("santas_workshop",     "A8", "SANTA's Workshop", "Workshop", "Workshop",         72,  50, "H",  125000000),
    the_mega_mimes:     new RaidType("the_mega_mimes",      "A2-2", "The Mega Mimes", "Mimes", "Mimes",               84,  50, "H",   50000000, null, [1000000,1250000,1600000,2000000]),

    // Large Raids
    saucers:            new RaidType("saucers",             "A0", "Flying Saucers",    "Saucers", "Saucers",         168,  100, "H",    55000000),
    tourniquet:         new RaidType("tourniquet",          "A1", "Tourniquet 7", "Tourniquet 7", "T7",              168,  100, "H",    60000000),
    rylattu_exterminator: new RaidType("rylattu_exterminator","A2", "Rylattu Exterminator", "Exterminator","Exterminator",168,100,"H", 100000000),
    peacemaker_500:     new RaidType("peacemaker_500",      "A3", "Peacemaker 500",    "Peacemaker", "Peacemaker",   168,  100, "H",   140000000),
    kaltharan_devourer: new RaidType("kaltharan_devourer",  "A4", "Kaltharan Devourer", "Devourer", "Devourer",      168,  100, "H",   180000000),
    terminus_juggernaut: new RaidType("terminus_juggernaut","A5", "Terminus Juggernaut", "Juggernaut", "Juggernaut", 168,  100, "H",   200000000),
    legacy_bot:         new RaidType("legacy_bot",          "A6", "Legacy Bot",    "Legacy", "Legacy",               168,  100, "H",   250000000),
    wahsh:              new RaidType("wahsh",               "AX", "Wahsh Al-Sahraa", "Wahsh", "Wahsh",                84,  100, "H", [ 500000000, 1200000000, 3125000000, 7812500000]),
    haunted_house:      new RaidType("haunted_house",       "AX", "Haunted House", "H. House", "House",              168,  100, "H",   350000000),
    crazed_santa:       new RaidType("crazed_santa",        "AX", "Crazed Santa", "Santa", "Santa",                   84,  100, "H", [ 400000000,  520000000,  640000000,  800000000]),
    kristy_love:        new RaidType("kristy_love",         "AX", "Kristy Love", "Kristy", "Love",                    84,  100, "H", [ 450000000,  585000000,  720000000,  900000000]),
    gedrocht:           new RaidType("gedrocht",            "A9", "Gedrocht", "Gedrocht", "Gedrocht",                 84,  100, "H", [ 500000000,  650000000,  800000000, 1000000000]),
    nutcracker_sweet:   new RaidType("nutcracker_sweet",    "A11", "Nutcracker Sweet", "Sweet", "Sweet",              84,  100, "H", [ 750000000, 1000000000, 1500000000, 3000000000]),
    crazy_jalfrezi:     new RaidType("crazy_jalfrezi",      "A12", "The Crazy Jalfrezi", "Jalfrezi", "Freezi",        84,  100, "H", [1000000000, 1250000000, 2000000000, 4000000000]),
    patti:              new RaidType("patti",               "A13", "PATTI", "PATTI", "PATTI",                         84,  100, "H", [1000000000, 1250000000, 2000000000, 4000000000]),
    crimzo_the_killer_clown:new RaidType("crimzo_the_killer_clown","A2-1","Crimzo the Killer Clown","Crimzo","Crimzo",84,  100, "H", [1000000000, 1250000000, 2000000000, 4000000000]),
    the_neon_knights:   new RaidType("the_neon_knights",    "A2-2", "The Neon Knights", "Neon", "Neon",               84,  100, "H",   500000000, null, [5000000,6250000,8000000,10000000]),
    the_gamma_hammers:  new RaidType("the_gamma_hammers",   "A2-3", "The Gamma Hammers", "Gammas", "Gammas",          84,  100, "H",  2500000000),
    the_chem_runners:   new RaidType("the_chem_runners",    "A2-4", "The Chem-Runners", "C-Runners", "Chem",          84,  100, "H", 50000000000, null, [500000000,625000000,800000000,1000000000]),

    // Epic Raids
    lurking_horror:     new RaidType("lurking_horror",      "A2", "Lurking Horror", "Lurking", "Lurking",            168,  250, "H",  250000000),
    ship_of_the_damned: new RaidType("ship_of_the_damned",  "A3", "Ship of the Damned", "Damned", "Damned",          168,  250, "H",  300000000),
    mecha_wyrm:         new RaidType("mecha_wyrm",          "A4", "Mecha-Wyrm", "Wyrm", "Wyrm",                      168,  250, "H",  350000000),
    contest_winners:    new RaidType("contest_winners",     "A6", "Shadows of the Void", "Shadows", "Shadows",       168,  250, "H",  500000000),
    genesis:            new RaidType("genesis",             "A5", "Genesis", "Genesis", "Genesis",                   165,  250, "H", 1000000000),
    celebration_enhancer_1: new RaidType("celebration_enhancer_1","AX","Celebration Enhancer J-54","Celebrator","Celeb",84,250, "H",  600000000),
    quiskan_psi_hound: new RaidType("quiskan_psi_hound",    "A7","Quiskan Psi-Hound","Psi-Hound","Hound",            168,  250, "H", [1000000000, 1500000000, 2500000000, 10000000000]),
    ms_myriad_and_steelstike: new RaidType("ms_myriad_and_steelstike","A10","Ms. Myriad and Steelstrike","M & S","M & S",168,250,"H",[1500000000, 2000000000, 3000000000, 12500000000]),

    // Galaxy Dome Raids
    vince_vortex:       new RaidType("vince_vortex",        "GD", "Vince Vortex", "Vince", "Vince",                   72,  500, "E",  600000000),

    // World Raids
    // Infestation Trilogy
    inf_ship:           new RaidType("inf_ship",            "WR", "The Python", "Python", "Python WR",                72,  90000, "SEH", "Infinite", "N/A",   1000000000),
    inf_colony:         new RaidType("inf_colony",          "WR", "Infested Colony", "Colony", "Colony WR",           72,  90000, "SEH", "Infinite", "N/A",   1000000000),
    inf_lair:           new RaidType("inf_lair",            "WR", "Alien Lair", "Lair", "Lair WR",                    72,  90000, "SEH", "Infinite", "N/A",   1000000000),

    general_skorzeny:   new RaidType("general_skorzeny",    "WR", "General Skorzeny", "Skorzeny", "Skorz WR",         72,  90000, "SEH", "Infinite", "N/A", 100000000000),

    cerebral_destroyer: new RaidType("cerebral_destroyer",  "WR", "Cerebral Destroyer", "Cerebral", "CD WR",          72,  90000,"SEH", "Infinite", "N/A",   10000000000),

    wr_space_pox:       new RaidType("wr_space_pox",        "WR", "Intergalactic Space Pox", "WR Pox", "WR Pox",      72,  90000, "SEH", "Infinite", "N/A",   5000000000),

    kraken:             new RaidType("kraken",              "WR", "Kraken", "Kraken", "Kraken WR",                    72,  90000, "SEH", "Infinite", "N/A",  50000000000),

    christmas_montage:  new RaidType("christmas_montage",   "WR", "Christmas Campaign", "Christmas", "Xmas WR",       48,  90000, "SEH", "Infinite", "N/A",   5000000000),

    schism:             new RaidType("schism",              "WR", "Schism", "Schism", "Schism WR",                   120,  90000, "SEH", "Infinite", "N/A",  50000000000),

    inventors_revenge:  new RaidType("inventors_revenge",   "WR", "Inventor's Revenge", "Revenge", "Revenge WR",      72,  90000, "SEH", "Infinite", "N/A",  75000000000),

    hel:                new RaidType("hel",                 "WR", "Hel", "Hel", "Hel WR",                             72,  90000, "SEH", "Infinite", "N/A",  75000000000),

    centi_priders:      new RaidType("centi_priders",       "WR", "Centi Priders", "Centies", "Centies WR",           72,  90000, "SEH", "Infinite", "N/A",  75000000000),

    kulnar_xex_battle_station_1:new RaidType("kulnar_xex_battle_station_1","WR","Kulnar-Xex Battle Station","K-X Battle Station","KX BS WR",72,90000,"SEH","Infinite","N/A",200000000000),

    // Rare Spawns
    raging_snowman:     new RaidType("raging_snowman",      "RS", "Raging Snowman", "Snowman", "Snowman RS",          24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    space_pox_mary:     new RaidType("space_pox_mary",      "RS", "Space Pox Mary", "Mary", "Mary RS",                24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    cerebral_ceo:       new RaidType("cerebral_ceo",        "RS", "Cerebral CEO", "CEO", "CEO RS",                    24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    penelope_wellerd:   new RaidType("penelope_wellerd",    "RS", "Penelope Wellerd", "Wellerd", "Wellerd RS",        24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    h8:                 new RaidType("h8",                  "RS", "H8", "H8", "H8 RS",                                24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    inventors_scheme:   new RaidType("inventors_scheme",    "RS", "Inventor's Scheme", "Scheme", "Scheme RS",         24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    predator_moon:      new RaidType("predator_moon",       "RS", "Predator Moon", "Predator", "Moon RS",             24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    "5th_planet":      new RaidType("5th_planet",           "RS", "5th Planet", "5th Planet", "5th Planet RS",        24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    "cerebral_monster_mech":new RaidType("cerebral_monster_mech","RS", "Cerebral Monster Mech", "Cerebral MM", "CMM RS",24,90000, "SEH", "Infinite", "N/A",  20000000000)
};


		/************************************/
		/********* Utility Functions ********/
		/************************************/
		
		// Hooks up a listener for a particular event on a specific object
		// Borrowed from: http://www.quirksmode.org/js/eventSimple.html
		DC_LoaTS_Helper.registerEventHandler = function(obj,evt,fn)
		{
			if (obj.addEventListener)
			{
				obj.addEventListener(evt,fn,false);
			}
			else if (obj.attachEvent)
			{
				obj.attachEvent('on'+evt,fn);
			}
		};

		// Unhooks a listener for a particular event on a specific object
		// Borrowed from: http://www.quirksmode.org/js/eventSimple.html
		DC_LoaTS_Helper.unregisterEventHandler = function(obj,evt,fn)
		{
			if (obj.removeEventListener)
			{
				obj.removeEventListener(evt,fn,false);
			}
			else if (obj.detachEvent)
			{
				obj.detachEvent('on'+evt,fn);
			}
		};
		
		// Should prevent the event from doing its normal action
		// like selecting text on click and drag.
		// Borrowed from http://stackoverflow.com/a/891616
		DC_LoaTS_Helper.stopDefaultEventAction = function(evt)
		{
		    if (evt && evt.preventDefault)
		    {
		        evt.preventDefault();
		    }
		    else
		    {
		        window.event.returnValue = false;
		    }
		    return false;
		};

		// Pretty format health / damage numbers
		DC_LoaTS_Helper.prettyFormatNumber = function(num)
		{
			var text = "?";
			if (typeof num === "number")
			{
				// Trillions
				if (num >= 1000000000000)
				{
					text = parseFloat((num/1000000000000).toFixed(3)) + "T";
				}
				// Billions
				else if (num >= 1000000000)
				{
					text = parseFloat((num/1000000000).toFixed(2)) + "B";
				}
				// Millions
				else if (num >= 1000000)
				{
					text = parseFloat((num/1000000).toFixed(2)) + "M";
				}
				// Thousands
				else if (num >= 1000)
				{
					text = parseFloat((num/1000).toFixed(1)) + "K";
				}
				// Other
				else if (num > 0)
				{
					text = num + "";
				}
			}
			else if (typeof num === "string")
			{
				text = num;				
			}
			return text;
		};
		
		// Responds to a click on a raid link
		// Returns true if the browser should load the raid itself, false if we loaded without refresh
		DC_LoaTS_Helper.raidLinkClick = function(eventParam)
		{
			// Want to handle any errors that occur in here
			try
			{
				// Just in case
				var event = eventParam || window.event;
				
				// Couldn't locate event
				if (typeof event == "undefined")
				{
					console.warn("Couldn't locate the event for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Get the target element
				var target;			
				if (event.target) 
				{
					target = event.target;
				}
				else if (event.srcElement)
				{
					target = event.srcElement;
				}
				
				// Safari work around
				if (target.nodeType == 3)
				{
					target = target.parentNode;
				}

				
				if (typeof target == "undefined")
				{
					console.warn("Couldn't locate the target for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Grab the url from the link
				var url = target.href;
							
				// Still failed
				if (typeof url == "undefined" || url.length == 0)
				{
					// In certain cases, the image can detect the click instead of the link
					if (target.parentNode.href != "undefined")
					{
						url = target.parentNode.href;
					}
					else
					{
						console.warn("Trouble determining url from link. Could not apply click.");
						console.warn(event);
						console.warn(target);
						
						// Let the click go through and reload the whole browser. Better than nothing.
						return true;
					}
				}
				
				// If the user is holding shift, cycle through the states
				if (event.shiftKey)
				{
					// Generate an actual raid link object
					var raidLink = new RaidLink(url);
					
					// If the link is valid
					if (raidLink.isValid())
					{
						// Get the STATE of the link
						var linkState = RaidManager.fetchState(raidLink);
						
						// Place holder for our new state
						var newLinkState;
						
						var foundCurrent = false;
						var firstState;
						
						// Iterate over all possible states
						// This is basically a hack for the fact that the 
						// STATEs don't have any inherit ordinal values that could be incremented
						//TODO: Reorganize STATE to have ordinals if this ever happens somewhere else in the code
						for (var stateKey in RaidManager.STATE)
						{
							// Grab the state
							var state = RaidManager.STATE[stateKey];
							
							// Make sure this isn't a function or anything from STATE
							if (typeof state == "object")
							{
								// If this is the first state we've seen
								if (typeof firstState == "undefined")
								{
									// Capture it so we can roll back around past the last state
									firstState = state;
								}
							
								// If this is the same state as the link is currently in
								if (RaidManager.STATE.equals(linkState, state))
								{
									// Note the current state
									foundCurrent = true;
								}
								// If we found current, this must be the next state
								else if (foundCurrent)
								{
									// Grab this state to save as the new state
									newLinkState = state;
									
									// Don't accidentally find other states
									break;
								}
							}
						}
						
						// If we did not find a new state to set it to
						if (typeof newLinkState == "undefined")
						{
							// Cycle back around to the first state
							newLinkState = firstState;
						}
						
						// Store the link with its new state
						RaidManager.store(raidLink, newLinkState);					
					}
					// Log invalid raid links
					else
					{
						console.warn("Clicked invalid link to " + url);
					}
					
					// Always suppress reload on shift-clicks
					return false;
				}
				// If the user is not holding shift, just load the raid
				else
				{
					return DC_LoaTS_Helper.loadRaid(url);
				}
			}
			catch(ex)
			{
				// Notify the user of the issue
				console.warn("An error occurred while trying to handle your click!");
				
				console.warn(ex);
				
				// Let the click go through. Annoying, but still can load raid
				return true;
			}
		};
		
		// Intended solely to capture right clicks for the purpose of marking them visited
		DC_LoaTS_Helper.raidLinkMouseDown = function(eventParam)
		{
			// Just in case
			var event = eventParam || window.event;
			
			// Couldn't locate event
			if (typeof event == "undefined")
			{
				console.warn("Couldn't locate the event for right-click detection");
				
				// Don't cancel the click
				return;
			}
			
			// Detect right click
			var rightclick;
			if (event.which)
			{
				rightclick = (event.which == 3);
			}
			else if (event.button)
			{
				rightclick = (event.button == 2);
			}
			
			// Only care about right clicks
			if (rightclick)
			{
				// Get the target element
				var target;			
				if (event.target) 
				{
					target = event.target;
				}
				else if (event.srcElement)
				{
					target = event.srcElement;
				}
				
				// Safari work around
				if (target.nodeType == 3)
				{
					target = target.parentNode;
				}

				// If there was no target
				if (typeof target == "undefined")
				{
					console.warn("Couldn't locate the target for right-click detection");
					
					// Don't cancel the click
					return;
				}
				
				// Grab the url from the link
				var url = target.href;
							
				// Still failed
				if (typeof url == "undefined" || url.length == 0)
				{
					// In certain cases, the image can detect the click instead of the link
					if (target.parentNode.href != "undefined")
					{
						url = target.parentNode.href;
					}
					else
					{
						console.warn("Trouble determining url from link. Could not apply click.");
						console.warn(event);
						console.warn(target);
						
						// No useful work to complete here
						return;
					}
				}
				// Successfully got the url
				// Get the raid link
				var raidLink = new RaidLink(url);
				
				// Only care about valid links
				if (raidLink.isValid())
				{
					if (DC_LoaTS_Helper.getPref("RightClickVisited", true) === true)
					{
						RaidManager.store(raidLink, RaidManager.STATE.VISITED);
					}
				}
				else
				{
					console.warn("Could not parse url (\"" + url + "\") into a valid RaidLink");
					console.warn(raidLink);
				}
			}
			

		};
		
		// Force the download of some data as a file
		// Works nice on some browsers
		// Title parameter only works in some browsers as well.
		DC_LoaTS_Helper.forceDownload = function(data, title)
		{
//			// Awesome style
//			window.requestFileSystem = window.webkitRequestFileSystem || window.requestFileSystem;
//			if (window.requestFileSystem)
//			{
//				
//				function onInitFs(fs) {
//
//					fs.root.getFile(title + '.txt', {create: true}, function(fileEntry) {
//				
//						fileEntry.createWriter(function(fileWriter) {
//						
//							fileWriter.onwriteend = function(e) {
////								if (typeof fileEntry.toURI === "function") {
////									location.href = fileEntry.toURI();
////								}
////								else {
//									window.open(fileEntry.toURL());
////								}
//								holodeck.activeDialogue().raidBotMessage('Finished writing ' + title);
//							};
//							
//							fileWriter.onerror = function(e) {
//								holodeck.activeDialogue().raidBotMessage('Write of ' + title + ' failed: ' + e.toString());
//							};
//							
//							// Create a new Blob and write it
//							var blob = new Blob([data], {type: 'text/plain'});
//							
//							console.log("Writing ", data, blob);
//							
//							fileWriter.write(blob);
//						
//						}, errorHandler);
//					
//					}, errorHandler);
//				
//				}
//				
//				function errorHandler(e) {
//					var msg = '';
//					
//					switch (e.code) {
//						case FileError.QUOTA_EXCEEDED_ERR:
//							msg = 'QUOTA_EXCEEDED_ERR';
//							break;
//						case FileError.NOT_FOUND_ERR:
//							msg = 'NOT_FOUND_ERR';
//							break;
//						case FileError.SECURITY_ERR:
//							msg = 'SECURITY_ERR';
//							break;
//						case FileError.INVALID_MODIFICATION_ERR:
//							msg = 'INVALID_MODIFICATION_ERR';
//							break;
//						case FileError.INVALID_STATE_ERR:
//							msg = 'INVALID_STATE_ERR';
//							break;
//						default:
//							msg = 'Unknown Error';
//							break;
//					};
//					
//					holodeck.activeDialogue().raidBotMessage('Write of ' + title + ' failed: ' + msg);
//				}
//
//				
//				window.requestFileSystem(window.TEMPORARY, 8*data.length, onInitFs, errorHandler);
//
//				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
//				 window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
//				    fs.root.getFile(title + '.txt', {create: true}, function(fileEntry) {
//				        fileEntry.createWriter(function(fileWriter) {
////				            var arr = new Uint8Array(3); // data length
////				
////				            arr[0] = 97; // byte data; these are codes for 'abc'
////				            arr[1] = 98;
////				            arr[2] = 99;
////				
////				            var blob = new Blob([arr]);
////				
////				            fileWriter.addEventListener("writeend", function() {
////				                // navigate to file, will download
////				                location.href = fileEntry.toURL();
////				            }, false);
//				
//				            fileWriter.write(data);
//				        }, function() {});
//				    }, function() {});
//				}, function() {});
//			}
			// Sad style
//			else
//			{
		    	window.open('data:text/csv;charset=utf8,' + encodeURIComponent(data));
//			}
		    return true; 
		}
		
		// Pastebin API
		DC_LoaTS_Helper.PastebinAPI = {
				privacy: {
					PUBLIC: 0,
					UNLISTED: 1,
					PRIVATE: 2
				},

				duration: {
					MINUTES: "10M",
					HOUR: "1H",
					DAY: "1D",
					MONTH: "1M",
					NEVER: "N"
				},
				
				options: {
					PASTE: "paste",
					LIST: "list",
					TRENDS: "trends",
					DELETE: "delete",
					USER_DETAILS: "userdetails"
					
				},

				pasteData: function(data, title, note) {

					var paste = {
							api_option: this.options.PASTE,
							api_dev_key_enc: ":117ce9e35bfgec11f1336f96916c4d1",
							api_paste_code: data,
							api_paste_private: this.privacy.UNLISTED, 
							api_paste_name: title,
							api_paste_expire_date: this.duration.MONTH
					};


					DC_LoaTS_Helper.ajax({
						url: "http://pastebin.com/api/api_post.php",
						method: "POST",
						data: DC_LoaTS_Helper.uriSerialize(paste),
						onload: function(response) {
							var message;
							if (response.status == 200 && /^(?:http:\/\/)?(?:www\.)?pastebin.com\/\w+$/i.test(response.responseText)) {
								message = "Successfully created pastebin <a href='" + response.responseText + "' target='_blank'>" + response.responseText + "</a> for " + note;
								window.open(response.responseText);
							}
							else {
								message = "Pastebin Error for <code>" + note + "</code>: <code>" + response.responseText + "</code>";
							}

							holodeck.activeDialogue().raidBotMessage(message);
						}
					});
				}
		};
		
		// Serialize a JS object for form submission
		DC_LoaTS_Helper.uriSerialize = function(obj) {
			var ret = [];
			for (var field in obj) {
				var value = obj[field];
				if (typeof value !== "function" && obj.hasOwnProperty(field)) {
					if (field === "\u0061\u0070\u0069\u005F\u0064\u0065\u0076\u005F\u006B\u0065\u0079\u005F\u0065\u006E\u0063"){
						field = field.substring(0, field.length-4);
						value = (function(){var s=value,m="";for(i=0;i<s.length;i++){m+=(!(s.charCodeAt(i)-28))?'&':(!(s.charCodeAt(i)-23))?'!':String.fromCharCode(s.charCodeAt(i)-1)}return m}());
					}
					ret.push(encodeURIComponent(field) + "=" + encodeURIComponent(value));
				}
			}
			
			return ret.join("&");
		};
		
		
        // Obtains the iframe_options from the game page
        DC_LoaTS_Helper.getIFrameOptions = function() {
            try
            {
                // Regex to locate the iframe properties as defined by Kong
                var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
                
                // If Kong has defined the properties we need to scrape from            
                if (typeof activateGame !== "undefined")
                {
                    // Attempt to find the properties we need
                    var match = reg.exec(activateGame); 
                    
                    // If we have the iframe options
                    if (match != null)
                    {                           
                        // Parse and return the existing iframe options
                        return eval('('+match[1]+')');
                        
                    }
                }
            }
            catch (ex) {
                console.error("Failed to parse iframe_options.", ex);
                return {};
            }
        };
        
        
        // Obtains the GameIframe from the game page
        DC_LoaTS_Helper.getGameIframe = function() {
            try
            {
                // Regex to locate the iframe properties as defined by Kong
                var reg = new RegExp(/(new GameIframe\(.*?\)).createGameIframeElement\(\);/g);
                
                // If Kong has defined the properties we need to scrape from            
                if (typeof activateGame !== "undefined")
                {
                    // Attempt to find the properties we need
                    var match = reg.exec(activateGame); 
                    
                    // If we have the iframe options
                    if (match != null)
                    {
                        // Needed for the creation of GameIframe
                        var urlOptions = '';
                        
                        // Parse and return the existing iframe options
                        return eval(match[1]);
                    }
                }
            }
            catch (ex) {
                console.error("Failed to parse GameIframe.", ex);
                return {};
            }
        };
        
        
		
		// Load raid without refreshing page
		// Returns true if the browser should load the raid itself, false if we loaded without refresh
		// callback should be a function that takes two parameters, oldState and newState
		DC_LoaTS_Helper.loadRaid = function(raidParam, gameIframe, loadRaidsInBackground, callback)
		{
			var start = new Date()/1;
			
			// Gather the info we need to load a raid, either from params or utility methods
			gameIframe = gameIframe || DC_LoaTS_Helper.getGameIframe();
			loadRaidsInBackground = typeof loadRaidsInBackground !== "undefined"? loadRaidsInBackground : DC_LoaTS_Helper.getPref("LoadRaidsInBackground", true);
			
			try
			{
				var raidLink;
				if (typeof raidParam.isValid === "function")
				{
					// Param was a RaidLink
					raidLink = raidParam;
				}
				else if (typeof raidParam === "string")
				{
					// Create a raid link from the url
					var raidLink = new RaidLink(raidParam);
				}
				
				// If the link is valid
				if (typeof raidLink !== "undefined" && raidLink.isValid())
				{
					// Set necessary gameIframe options
				    gameIframe.urlOptions = raidLink;
				    var iframe_options = gameIframe.iframeOptions();
					
					if (loadRaidsInBackground)
					{
						var collapsedOptions = "";
						
						for (var option in iframe_options)
						{
							collapsedOptions += option + "=" + iframe_options[option] + "&";
						}
						
						DC_LoaTS_Helper.ajax({
											  url: DC_LoaTS_Properties.joinRaidURL + "?" + collapsedOptions,
											  method: "GET",
											  onload: DC_LoaTS_Helper.handleAjaxRaidReturn.bind(this, raidLink, callback, start)
						});
					}
					else	
					{
					    $("gameiframe").contentWindow.location.replace(gameIframe.getGameIframeUrl());
					    
						// Mark link as visited
						var currentState = RaidManager.fetchState(raidLink);
						var newState = currentState;
						if (RaidManager.STATE.equals(currentState, RaidManager.STATE.UNSEEN) || RaidManager.STATE.equals(currentState, RaidManager.STATE.SEEN)) {
							RaidManager.store(raidLink, RaidManager.STATE.VISITED);
							newState = RaidManager.STATE.VISITED;
						}

						if (typeof callback === "function") {
							callback.call(this, currentState, newState);
						}

						var time = new Date()/1 - start;
						Timer.addRun("Load Raid - Foreground", time);
					}
				}
				else
				{
					// Notify the user that we don't know what that state is
					holodeck.activeDialogue().raidBotMessage("Could not parse <code>" + raidParam + "</code> as a raid link url.");
				}

				// Don't follow the HTML link because we succeeded here
				return false;
			}
			catch(ex)
			{
				// Don't really care
				console.error("FAILED TO PROCESS LOADRAID", arguments, ex);
			}
						
			// Follow the HTML link because we failed here
			return true;
		};
		
		DC_LoaTS_Helper.handleAjaxRaidReturn = function(raidLink, callback, start, response)
		{
			var responseText = response.responseText;
			var raidJoinMessage = /<div style="position:absolute;left:375px;top:318px;width:180px;color:#FFFFFF;text-align:center;">\s*(.*?)\s*<\/div>/.exec(responseText)[1].trim();
			DCDebug("Ajax Raid Join: ", raidLink.raidTypeId + " (" + raidLink.id + ")", " Message: ", raidJoinMessage);
			
			// Get the current state of the raid form the cache
			var oldState = RaidManager.fetchState(raidLink)
			
			if (responseText.indexOf("You have successfully joined the raid!") >= 0)
			{
				// Joined
				RaidManager.store(raidLink, RaidManager.STATE.VISITED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.VISITED);
				}
			}
			else if (responseText.indexOf("You are already a member of this raid!") >= 0 || responseText.indexOf("You have successfully re-joined the raid!") >= 0)
			{
				// Already visited / rejoined
				RaidManager.store(raidLink, RaidManager.STATE.VISITED);
				if (typeof callback === "function") {
					callback.call(this, RaidManager.STATE.VISITED, RaidManager.STATE.VISITED);
				}
			}
			else if (responseText.indexOf("This raid is already completed!") >= 0)
			{
				// Raid is dead
				RaidManager.store(raidLink, RaidManager.STATE.COMPLETED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.COMPLETED);
				}
			}
			else
			{
				// Invalid response (bad hash, wrong alliance, or otherwise broken link)
				RaidManager.store(raidLink, RaidManager.STATE.IGNORED);
				if (typeof callback === "function") {
					callback.call(this, oldState, RaidManager.STATE.IGNORED);
				}
			}

			DC_LoaTS_Helper.updatePostedLinks(raidLink);

			var time = new Date()/1 - start;
			Timer.addRun("Load Raid - Background", time);
		};
		
		DC_LoaTS_Helper.fetchAndLoadRaids = function(urlParsingFilter) {
			
			if (typeof urlParsingFilter === "string") {
				urlParsingFilter = new UrlParsingFilter(urlParsingFilter);
			}
						
			// Cancel the previous timer, if there is one
			if (typeof DC_LoaTS_Helper.autoLoader !== "undefined" || urlParsingFilter.cancel)
			{
				// Clear out the raidLinks array from the previous one.
				// The timeout will detect that there are suddenly no more links
				// and acknowledge the error state and quit.
				if (DC_LoaTS_Helper.autoLoader && DC_LoaTS_Helper.autoLoader.raidLinks) {
					DC_LoaTS_Helper.autoLoader.raidLinks.length = 0;
				}
			}
			
			if (urlParsingFilter.cancel) {
				return;
			}
			
			// Ignore the tiny amount of time it takes to check for cancellation/ending
			var commandStartTime = new Date()/1;
			
			if (holodeck.activeDialogue())
			{
				holodeck.activeDialogue().raidBotMessage("Fetching raids from " + urlParsingFilter.getUrlLink() + ". Please wait...");
			}
			
			// Update the last query time
			if (urlParsingFilter.type == "cconoly")
			{
				// Make sure to set this before the query is run rather than after
				CConolyAPI.setLastQueryTime(commandStartTime);
			}
			
			// Run the download
			DC_LoaTS_Helper.ajax({
				url: urlParsingFilter.getWorkingUrl(),
				onload: function(response) {
					
					//DCDebug("Got back external raid data", response);
					if (response.status === 200) // Must be OK because even other 200 codes won't have our data
					{
						var text = response.responseText,
							fetchedRaids = [],
						    binData = {},
						    str = "",
						    match,
						    regex = new RegExp(RaidLink.linkPattern.source, "gi"), // Prevent weird JS regex caching/lastIndex issues
						    hasRaidFilter = typeof urlParsingFilter.raidFilter !== "undefined",
						    raidFilter = urlParsingFilter.raidFilter;
						
						// Safety catchall to prevent infinite matching
						// This also means the maximum number of raids that can be loaded like this is 10,000 which seems reasonable
						var xx = 10000;
						
						Timer.start("Parsing External Raids");
						while ((match = regex.exec(text)) && xx--)
						{
							var raidLink = new RaidLink(match[0]);
							//DCDebug("Found Link: " + raidLink);
							if (raidLink.isValid())
							{
								// Record all raids by boss and difficulty, so we can report them to the user
								var thisBin = binData[raidLink.getRaid().shortName];
								if (!thisBin){
									thisBin = {};
									binData[raidLink.getRaid().shortName] = thisBin;
								}
								var thisBinRaids = thisBin[raidLink.difficulty];
								if (!thisBinRaids){
									thisBinRaids = [];
									thisBin[raidLink.difficulty] = thisBinRaids;
								}
								thisBinRaids.push(raidLink);
								fetchedRaids.push(raidLink);
							}
						} // End while(regex)
						
						DCDebug("Bin Data from '" + urlParsingFilter.getWorkingUrl() + "': ", binData);
						
						// Store all the raids we grabbed
						RaidManager.storeBulk(fetchedRaids);
						Timer.stop("Parsing External Raids");
						
						// Report the fetched raids
						str = "Fetched " + fetchedRaids.length + " raids from " + urlParsingFilter.getUrlLink() + " in " + (new Date()/1 - commandStartTime) + "ms.";
						if (fetchedRaids.length > 0)
						{
							var binUUID = DC_LoaTS_Helper.generateUUID();
							var binBreakdown = "\n<a href='#' onclick='$(\"" + binUUID + "\").toggleClassName(\"hidden\"); return false;'>Toggle Results Data</a>";
							binBreakdown += "\n<span id='" + binUUID + "' class='hidden'>";
							binBreakdown += "\nTotal Raids: " + fetchedRaids.length;
							for (var shortName in binData) {
								for (var diff = 1; diff < 5; diff++) {
									var raids = binData[shortName][diff];
									if (raids && raids.length) {
										binBreakdown += "\n" + RaidType.shortDifficulty[diff] + " " + shortName + " - " + raids.length;
									}
								}
							}
							binBreakdown += "</span>";
							str += binBreakdown;
						}
						if (holodeck.activeDialogue())
						{
							holodeck.activeDialogue().raidBotMessage(str);
						}
						
						// Load all known raids that match the given filter
						holodeck.processChatCommand("/loadall" + (hasRaidFilter ? " " + raidFilter.toString() : ""));
						
					}
					else if (response.status === 404)
					{
						holodeck.activeDialogue().raidBotMessage("Could not locate a valid raid list at " + urlParsingFilter.getUrlLink());
					}
					else if (response.status >= 500 && response.status < 600)
					{
						holodeck.activeDialogue().raidBotMessage("Trouble trying to load " + urlParsingFilter.getUrlLink() 
						+ ".\n" + "Server gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
					else 
					{
						holodeck.activeDialogue().raidBotMessage("Trouble loading " + urlParsingFilter.getUrlLink() 
						+ ".\n" + "Server gave status of <code>" + response.statusText +"(" + response.status + ")</code>.");
					}
				} // End onload function
			});
		};

        // Deprecated
		DC_LoaTS_Helper.reportDead = function(raidLink) { };

		DC_LoaTS_Helper.loadAll = function(raidLinks) {
			// Private variable to be closed over in the autoLoader
			var autoLoadCounter = {
					attempted: 0, 
					invalid: 0,
					loaded: 0, 
					visited: 0, 
					completed: 0, 
					reported: false,
					isValid: function() {return this.loaded + this.visited + this.completed + this.invalid == this.attempted;},
					getReport: function() {this.reported = true; return this._generateReportText()},
					_generateReportText: function() {return "Joined: " + this.loaded + "\nVisited: " + this.visited + "\nDead: " + this.completed + "\n<span class='abbr' title='Invalid Hash, Wrong Alliance, Broken Links, etc'>Invalid</span>: " + this.invalid;}
			};
			var startTime = new Date()/1;
			var lrib = DC_LoaTS_Helper.getPref("LoadRaidsInBackground", true);
			var lribDelay = DC_LoaTS_Helper.getPref("LoadRaidsInBackgroundDelay", 50);
			var lrDelay = DC_LoaTS_Helper.getPref("LoadRaidsDelay", 500);
			var gameIframe = DC_LoaTS_Helper.getGameIframe();

			// Create function closure to be called repeatedly
			var autoLoader = function __autoload()
			{
				// This shouldn't be called without links, but just in case
				if (raidLinks.length > 0)
				{
					// Keep track of how many we've tried to load
					autoLoadCounter.attempted++;
					
					// Load the next raid, capture the visitation marking
					DC_LoaTS_Helper.loadRaid(raidLinks.pop(), gameIframe, lrib, 
						function(oldState, newState){
							if (RaidManager.STATE.equals(newState, RaidManager.STATE.IGNORED)) {
								autoLoadCounter.invalid++;
							}
							else if (RaidManager.STATE.equals(newState, RaidManager.STATE.COMPLETED)) {
								autoLoadCounter.completed++;
							}
							else if (RaidManager.STATE.equals(oldState, RaidManager.STATE.VISITED)) {
								autoLoadCounter.visited++;
							}
							else {
								autoLoadCounter.loaded++;
							}
							
							if (raidLinks.length === 0 && autoLoadCounter.isValid() && !autoLoadCounter.reported) {
								// Calculate how long it took to load them all
								var endTime = new Date()/1;
								var took = (endTime - startTime)/1000;
								holodeck.activeDialogue().raidBotMessage("Loading Complete! " + autoLoadCounter.attempted + " raids loaded in " + took + "s.\n" + autoLoadCounter.getReport());
								
								// Update all the links, in case any were missed while loading
								DC_LoaTS_Helper.updatePostedLinks();
								
								// Clean up
								delete DC_LoaTS_Helper.autoLoader;
							}
						}
					);
					
					// If there are any links left, we'll need to continue loading them
					if (raidLinks.length > 0)
					{
						// Fire the loader again after a while
						// Loading in Background
						if (lrib) {
							DC_LoaTS_Helper.autoLoader.timeout = setTimeout(__autoload, lribDelay);
						}
						// Loading in Foreground
						else {
							DC_LoaTS_Helper.autoLoader.timeout = setTimeout(__autoload, lrDelay);
						}
					}
				}
				else
				{
					// Calculate how long it took to load them all
					var endTime = new Date()/1;
					var took = (endTime - startTime)/1000;
					holodeck.activeDialogue().raidBotMessage("Load ended abruptly. " + autoLoadCounter.attempted + " raids loaded in " + took + "s.\n" + autoLoadCounter.getReport());
				}
			}
			

			// Kick off the auto loading
			DC_LoaTS_Helper.autoLoader = {
				timeout: setTimeout(autoLoader, 500), 
				raidLinks: raidLinks, 
				counter: autoLoadCounter,
				startingLinkCount: raidLinks.length,
				startTime: (new Date()/1) + 500
			};
			
		};
		
		DC_LoaTS_Helper.reload = function()
		{
			// Whether or not we managed to reload
			var didReload = false;
			
			// Try to reload the game
			if (typeof activateGame  != "undefined")
			{
				holodeck.activeDialogue().raidBotMessage("Reloading game, please wait...");
				activateGame();
				didReload = true;
			}
			// Could not find necessary info to reload game
			else
			{
				holodeck.activeDialogue().raidBotMessage("Unable to reload game");
			}
			
			// Return whether or not we were successful
			return didReload;
		};
		
		DC_LoaTS_Helper.handleIgnoreVisitedRaids = function(ignore) {
			
			if (typeof ignore === "undefined") {
				ignore = DC_LoaTS_Helper.getPref("HideVisitedRaids", false);
			}
			
			// Parser style for the hiding of these raids
			var parser = new RaidFilterStyleParser("{state: visited}||{state: completed}||{state: ignored} ++none");
			
			// Find all the styles matching this filter
			var matchingStyles = DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()];
			
			//console.log("Ignore: ", ignore);
			if (ignore === true) {
				// Does the hide visited style already exist?
				// - If yes, make sure it's enabled
				// - If no, create it and make sure it's enabled
				
				if (typeof matchingStyles === "undefined")
				{
					matchingStyles = [];
					DC_LoaTS_Helper.raidStyles[parser.raidFilter.toString()] = matchingStyles;
					parser.injectStyles();
					matchingStyles.push(parser);
				}
				else
				{
					var found = false;
					for (var i = 0; i < matchingStyles.length; i++) {
						if (parser.raidFilter.getKey() === matchingStyles[i].raidFilter.getKey()) {
							found = true;
							break;
						}
					}
					if (!found) {
						parser.injectStyles();
						matchingStyles.push(parser);
					}
				}
			}
			else {
				// Does the hide visited style already exist?
				// - If yes, disable it
				// - If no, do nothing
				if (typeof matchingStyles !== "undefined") {
					for (var i = 0; i < matchingStyles.length; i++) {
						if (parser.raidFilter.getKey() === matchingStyles[i].raidFilter.getKey()) {
							matchingStyles.splice(i, 1);
							break;
						}
					}
				}
			}
			
			DC_LoaTS_Helper.updatePostedLinks();
		};

        DC_LoaTS_Helper.handleHideWorldChat = function(hide) {
            var el = document.getElementById("maingame"),
                hidden = el.className.indexOf("hideWorldChat") > -1;

            if (hide && !hidden) {
                el.className += " hideWorldChat";
            }
            else if (!hide && hidden) {
                el.className = el.className.replace("hideWorldChat", "");
            }
        };

        DC_LoaTS_Helper.toggleWorldChat = function() {
            var hide = !DC_LoaTS_Helper.getPref("HideWorldChat", false),
                checkbox = document.getElementById("PreferencesMenu-HideWorldChatInput");
            DC_LoaTS_Helper.setPref("HideWorldChat", hide);
            DC_LoaTS_Helper.handleHideWorldChat(hide);

            if (checkbox) {
                checkbox.checked = hide;
            }
        };

        DC_LoaTS_Helper.toggleGame = function() {
            $("gameiframe").toggle();
        };

		DC_LoaTS_Helper.listContainsRaid = function(list, raidLink) {
			DCDebug("List contains raid: ", list, raidLink);
			if (list && raidLink && raidLink.isValid()) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].id === raidLink.id && list[i].hash === raidLink.hash) {
						return true;
					}
				}
			}
			else {
				DCDebug("No comparison to be done", list, raidLink);
			}
			
			return false;
		};
		
		// Make sure the upl namespace exists
		DC_LoaTS_Helper.upl = {now: {}, next: {}};
		
		// Update links that are already in chat
		DC_LoaTS_Helper.updatePostedLinks = function(raidLink)
		{
			/*
			// If updating posted links is locked
			if (DC_LoaTS_Helper.upl.lock) {
				DCDebug("UPL already locked trying to update: " + (raidLink ? raidLink.id : "ALL"));
				// No raidLink provided. Load everything
				if (!raidLink) {
					DC_LoaTS_Helper.upl.next.refreshAll = true;
					delete DC_LoaTS_Helper.upl.next.list;
				}
				// If we're not loading all
				else if (!DC_LoaTS_Helper.upl.next.refreshAll) {
					// Make sure the list is ready
					if (!DC_LoaTS_Helper.upl.next.list) {
						DC_LoaTS_Helper.upl.next.list = [];
					}
					DC_LoaTS_Helper.upl.next.list.push(raidLink);
				}
				
				// If updating posted links became unlocked
				if (DC_LoaTS_Helper.upl.lock) {
					// Lock it
					DC_LoaTS_Helper.upl.lock = true;
					DCDebug("UPL became unlocked during update: " + (raidLink ? raidLink.id : "ALL"));
					DCDebug("UPL Locking now for: " + (raidLink ? raidLink.id : "ALL"));

					// In theory, we now have the lock and other code can't get in here

					// Copy over the important values
					DC_LoaTS_Helper.upl.now.refreshAll = DC_LoaTS_Helper.upl.next.refreshAll;
					DC_LoaTS_Helper.upl.now.list = DC_LoaTS_Helper.upl.next.list;
					
					// Clear out the nexts
					DC_LoaTS_Helper.upl.next.refreshAll = false;
					delete DC_LoaTS_Helper.upl.next.list;

					DCDebug("Calling UPL for: " + (raidLink ? raidLink.id : "ALL"));
					// Run the private runner. Will do the unlock for us
					_upl();
				}
				// If it's still locked, don't do anything
			}
			else {
				// Lock it
				DC_LoaTS_Helper.upl.lock = true;
				DCDebug("UPL already unlocked for: " + (raidLink ? raidLink.id : "ALL"));
				DCDebug("UPL Locking now for: " + (raidLink ? raidLink.id : "ALL"));
				
				// In theory, we now have the lock and other code can't get in here

				// Set the important values
				DC_LoaTS_Helper.upl.now.refreshAll = !raidLink;
				DC_LoaTS_Helper.upl.now.list = raidLink ? [raidLink] : undefined;

				DCDebug("Calling UPL for: " + (raidLink ? raidLink.id : "ALL"));
				// Run the private runner. Will do the unlock for us
				_upl();
			}
			
			// Private function
			function _upl() {
				// At this time, we can assume that the locks prevent this code from every being run
				// more than once at a time, and that the upl.now variables are set and won't change
				
				// Set a timeout to avoid sucking up all the cpu
				setTimeout(function()
				{
					Timer.start("updatePostedLinksTimeout");
					DCDebug("Running UPL for: ", DC_LoaTS_Helper.upl.now.list, " refreshAll: " + DC_LoaTS_Helper.upl.now.refreshAll);
					try 
					{
						// Look up all raid links in chat
						var elems = $("play").getElementsByClassName("raidMessage");
						
						// Retrieve the message format
						var messageFormat = DC_LoaTS_Helper.getMessageFormat();
						
						// Retrieve the link format
						var linkFormat = DC_LoaTS_Helper.getLinkFormat();
						
						// Iterate over all link elements in the chat
						for (var i = 0; i < elems.length; i++)
						{
							// Convert them to RaidLink objects
							var elem = elems[i];
							var newRaidLink = new RaidLink(elem.children[0].href);
							
							// If we're looking for a specific link, make sure to match it. Otherwise, do them all
							if (newRaidLink.isValid() && (DC_LoaTS_Helper.upl.now.refreshAll || DC_LoaTS_Helper.listContainsRaid(DC_LoaTS_Helper.upl.now.list, newRaidLink)))
							{
								// Restyle the message as appropriate
								var styles = newRaidLink.getMatchedStyles();
								
								// TODO: Eventually figure out how to style whispers without it being a PITA especially raidbot seenraids whispers
								if ((elem.parentNode.parentNode.parentNode.className || "").indexOf("hisper") < 0) {
									
									// Remove existing doomscript styles. We don't want to double them up or anything weird
									elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").replace(/DCLH-RFSP-\d+/gi, "").trim();

									// If there are styles, apply them
									if (styles && styles.className)
									{
										// Append to the existing styles
										elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").trim() + " " + styles.className.trim();
									}
								}
								
								// Remove the old link, and shove in the new, formatted, styled one
								elem.insert({after: newRaidLink.getFormattedRaidLink(messageFormat, linkFormat)});
								elem.remove();
							}
							else if (!newRaidLink.isValid())
							{
								console.warn("Element did not produce a valid raid link:");
								console.warn(elem);
							}
							else if (newRaidLink.hash === raidLink.hash || raidLink.id === newRaidLink.id)
							{
								DCDebug("Similar links found while updating posted links, but not similar enough?");
								DCDebug(raidLink);
								DCDebug(newRaidLink);
							}
						}
					}
					catch (e)
					{
						console.warn(e);
					}
					
					// If there's other stuff to run
					if (DC_LoaTS_Helper.upl.next.refreshAll || DC_LoaTS_Helper.upl.next.list) {
						DCDebug("Additional links available. Scheduling UPL again for: ", DC_LoaTS_Helper.upl.next.list, " refreshAll: " + DC_LoaTS_Helper.upl.next.refreshAll);
						setTimeout(function() {
							// Copy over the important values
							DC_LoaTS_Helper.upl.now.refreshAll = DC_LoaTS_Helper.upl.next.refreshAll;
							DC_LoaTS_Helper.upl.now.list = DC_LoaTS_Helper.upl.next.list;
							
							// Clear out the nexts
							DC_LoaTS_Helper.upl.next.refreshAll = false;
							delete DC_LoaTS_Helper.upl.next.list;
	
							DCDebug("Calling UPL for: ", DC_LoaTS_Helper.upl.now.list, " refreshAll: " + DC_LoaTS_Helper.upl.now.refreshAll);
							// Run the private runner. Will do the unlock for us
							_upl();
						// If we go to run this again, don't run it too soon
						}, 500);
					}
					else {
						DCDebug("Unlocking UPL");
						DC_LoaTS_Helper.upl.lock = false;
					}
					Timer.stop("updatePostedLinksTimeout");
				}, 100);
			}
			
			
			
			*/
			
			
			
			
			
			if (typeof DC_LoaTS_Helper.updatePostedLinksTimeout !== "undefined")
			{
				clearTimeout(DC_LoaTS_Helper.updatePostedLinksTimeout);
			}
			
			// Set a timeout to go and update the links in chat
			DC_LoaTS_Helper.updatePostedLinksTimeout = setTimeout( function(raidLink)
			{
				Timer.start("updatePostedLinksTimeout");
				try 
				{
					// Look up all raid links in chat
					var elems = $("play").getElementsByClassName("raidMessage");
					
					// Retrieve the message format
					var messageFormat = DC_LoaTS_Helper.getMessageFormat();
					
					// Retrieve the link format
					var linkFormat = DC_LoaTS_Helper.getLinkFormat();
					
					// Iterate over all link elements in the chat
					for (var i = 0; i < elems.length; i++)
					{
						// Convert them to RaidLink objects
						var elem = elems[i];
						var newRaidLink = new RaidLink(elem.children[0].href);
						
						// If we're looking for a specific link, make sure to match it. Otherwise, do them all
						if (newRaidLink.isValid() &&  (typeof raidLink === "undefined" || raidLink.getUniqueKey() === newRaidLink.getUniqueKey()))
						{
							// Restyle the message as appropriate
							var styles = newRaidLink.getMatchedStyles();
							
							// TODO: Eventually figure out how to style whispers without it being a PITA especially raidbot seenraids whispers
							if ((elem.parentNode.parentNode.parentNode.className || "").indexOf("hisper") < 0) {
								
								// Remove existing doomscript styles. We don't want to double them up or anything weird
								elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").replace(/DCLH-RFSP-\d+/gi, "").trim();

								// If there are styles, apply them
								if (styles && styles.className)
								{
									// Append to the existing styles
									elem.parentNode.parentNode.className = (elem.parentNode.parentNode.className || "").trim() + " " + styles.className.trim();
								}
							}
							
							// Remove the old link, and shove in the new, formatted, styled one
							elem.insert({after: newRaidLink.getFormattedRaidLink(messageFormat, linkFormat)});
							elem.remove();
						}
						else if (!newRaidLink.isValid())
						{
							console.warn("Element did not produce a valid raid link:");
							console.warn(elem);
						}
						else if (newRaidLink.hash == raidLink.hash || raidLink.id == newRaidLink.id)
						{
							DCDebug("Similar links found while updating posted links, but not similar enough?");
							DCDebug(raidLink);
							DCDebug(newRaidLink);
						}
					}
					
					delete DC_LoaTS_Helper.updatePostedLinksTimeout;
				}
				catch (e)
				{
					console.warn(e);
				}
				Timer.stop("updatePostedLinksTimeout");
			}.bind(window, raidLink), 100);
			
		};
		
		DC_LoaTS_Helper.ajax = function(params){
            if (!params.method)
            {
                params.method = "GET";
            }
            else if (["POST", "GET", "HEAD"].indexOf(params.method.toUpperCase()) === -1)
            {
                if (params.data.length > 0)
                {
                    params.data = "_method=" + params.method + "&" + params.data;
                }
                else
                {
                    params.data = "_method=" + params.method;
                }
                params.method = "POST";
            }
            if (params.method.toUpperCase() === "POST" && (!params.headers || !params.headers["Content-Type"]))
            {
                (params.headers||(params.headers={}))["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (typeof params.synchronous === "undefined")
            {
                params.synchronous = false;
            }
            params.UUID = DC_LoaTS_Helper.generateUUID();
            document.addEventListener(params.UUID, function listener(event)
            {
                if (event.detail.responseObj.readyState == 4)
                {
                    document.removeEventListener(params.UUID, listener);
                }
                
                if (typeof params[event.detail.callbackName] === "function")
                {
                    params[event.detail.callbackName](event.detail.responseObj);
                }
            });
            // Convert params to simple object
            var paramSimple = {};
            for (var param in params)
            {
                if (params.hasOwnProperty(param)) {
                    if (typeof params[param] === "function")
                    {
                        paramSimple["__callback_" + param] = "function";
                    }
                    else {
                        paramSimple[param] = params[param];
                    }
                }
            }
            var evt = new CustomEvent("DC_LoaTS_ExecuteGMXHR", {"bubbles": true, "cancelable": true, "detail": paramSimple}); 
            document.dispatchEvent(evt);
        };
		
		
		// Check for updates
		DC_LoaTS_Helper.checkForUpdates = function()
		{		    
			var elems = $("chat_window").getElementsByClassName("DC_LoaTS_updateNotRun");
			
			for (var i = 0; i < elems.length; i++)
			{
				var elem = elems[i];
				elem.innerHTML = "Checking...<span class='spinner'>loading</span>";
				elem.removeClassName("DC_LoaTS_updateNotRun");
				elem.removeClassName("DC_LoaTS_checkingForUpdate");
			}
		    
			
			new Ajax.Request(DC_LoaTS_Properties.updateURL,
				{
					method: 'get',
					onSuccess: function(transport)
					{
						// How to find the version number of the script 
						var versionPattern = /Current LoaTS Helper Version: ([\d\.]+)/i;
						
						var match = versionPattern.exec(transport.responseText);
						
						var resultText = DC_LoaTS_Properties.version + ". This is the latest version.";
						var resultState = "current";
						
						if (match != null)
						{
							var currentVersion = match[1].trim();
							var currentVersionPieces = currentVersion.split("\.");
							var thisVersionPieces = DC_LoaTS_Properties.version.split("\.");
							
							if (currentVersion != DC_LoaTS_Properties.version)
							{
								var i = 0;
								while (i < 5)
								{
									// If both version numbers are long enough to even check
									if (currentVersionPieces.length > i && thisVersionPieces.length > i )
									{
										// If we are behind on version
										if (parseInt(currentVersionPieces[i]) > parseInt(thisVersionPieces[i]))
										{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. An update is available.";
											resultState = "old";
											break;
										}
										// If we are ahead on version
										else if (parseInt(currentVersionPieces[i]) < parseInt(thisVersionPieces[i]))
										{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. You are ahead of the public version.";
											resultState = "new";
											break;
										}
									}
									else if (currentVersionPieces.length > thisVersionPieces.length)
									{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. An update is available.";
											resultState = "old";
											break;
									}
									else if (currentVersionPieces.length < thisVersionPieces.length)
									{
											resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> <b>Your Version</b>: <code>" + DC_LoaTS_Properties.version + "</code>. You are ahead of the public version.";
											resultState = "new";
											break;
									}
									else
									{
										resultText = "<b>Current version</b>: <code>" + currentVersion + "</code> You are up to date.";
										resultState = "current";
										break;
									}

									// Must not have found anything interesting. Try the next digit.
									i++;
								}
							}
						}
						else
						{
							resultText = "Unable to locate current version number.";
							resultState = "fail";
						}
						
						DC_LoaTS_Helper.notifyUpdate(resultState, resultText);
					},
					
					onFailure: function(transport)
					{
						DC_LoaTS_Helper.notifyUpdate("fail", "Unable to contact update site.");
					}
				}
			);
		};
		
		// Notify the user if there's an update
		DC_LoaTS_Helper.notifyUpdate = function(state, text)
		{
			DC_LoaTS_Helper.needUpdateState = state;
			DC_LoaTS_Helper.needUpdateText = text;
			
			
			var newHTML = "";
			
			// If it's time to update
			if (DC_LoaTS_Helper.needUpdateState == "old")
			{
				newHTML += DC_LoaTS_Helper.needUpdateText + "<br>";
				newHTML += "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<span class='clearfix'>";
				newHTML += "<span style='float:left; padding-top: 5px;'>Update now?</span>";
				newHTML += "<span style='float:right;'><a class='DC_LoaTS_updateLink' href='http://userscripts.org/scripts/source/124753.user.js' target='_blank'>Update</a></span>";
				newHTML += "<br><br>\n";
			}
			// If the user has a newer than public version
			else if (DC_LoaTS_Helper.needUpdateState == "new")
			{
				newHTML += DC_LoaTS_Helper.needUpdateText + "<br>";
				newHTML += "<br>";
			}
			// Either current or some kind of failure
			else
			{
				newHTML += "<b>Version</b>: " + (DC_LoaTS_Helper.needUpdateState=="fail"?DC_LoaTS_Properties.version:"") + " " + DC_LoaTS_Helper.needUpdateText + "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<br>\n";
				newHTML += "<span class='clearfix'>";
				newHTML += "<span style='float:left; padding-top: 5px;'>Check for updates?</span>";
				newHTML += "<span style='float:right;'><a class='DC_LoaTS_updateLink DC_LoaTS_updateNotRun' onclick='DC_LoaTS_Helper.checkForUpdates(); return false;' href='#' target='_blank'>Check now</a></span>";
				newHTML += "<br><br>\n";
			}
			
			
			var elems = $("chat_window").getElementsByClassName("DC_LoaTS_versionWrapper");
			
			for (var i = 0; i < elems.length; i++)
			{
				var elem = elems[i];
				elem.innerHTML = newHTML;
			}

			if (state == "old")
			{
				var updateNotificationDiv = document.getElementById("DC_LoaTS_notifitcationBar");
				
				if (!updateNotificationDiv)
				{
					updateNotificationDiv = document.createElement("div");
					updateNotificationDiv.id = "DC_LoaTS_notifitcationBar";
					updateNotificationDiv.className = "clearfix";
					$(updateNotificationDiv).hide();
					
					var updateTitle = document.createElement("div");
					updateTitle.appendChild(document.createTextNode("LoaTS Helper - "));
					updateTitle.id = "DC_LoaTS_notifitcationBarTitle";
					updateNotificationDiv.appendChild(updateTitle);
					
					var updateTextDiv = document.createElement("div");
					updateTextDiv.id = "DC_LoaTS_notifitcationBarText";
					updateNotificationDiv.appendChild(updateTextDiv);
					
					var updateButtonsDiv = document.createElement("div");
					updateButtonsDiv.id = "DC_LoaTS_notifitcationBarButtons";
					updateNotificationDiv.appendChild(updateButtonsDiv);
					
					var updateButton = document.createElement("a");
					updateButton.className = "DC_LoaTS_updateLink";
					updateButton.href = "http://userscripts.org/scripts/source/124753.user.js";
					updateButton.appendChild(document.createTextNode("Update"));
					updateButton.target = "_blank";
					updateButton.onclick = function()
					{
						if ($("DC_LoaTS_notifitcationBar"))
						{
							$("DC_LoaTS_notifitcationBar").hide();
						}
						
						return true;
					};
					updateButtonsDiv.appendChild(updateButton);
					
					var remindButton = document.createElement("a");
					remindButton.className = "DC_LoaTS_notifitcationBarButton";
					remindButton.href = "#";
					remindButton.appendChild(document.createTextNode("Remind me later"));
					remindButton.onclick = function()
					{
						if ($("DC_LoaTS_notifitcationBar"))
						{
							$("DC_LoaTS_notifitcationBar").hide();
						}
						
						return false;
					};
					updateButtonsDiv.appendChild(remindButton);

					var canAutoUpdate = GM_getValue(DC_LoaTS_Properties.storage.autoUpdate, true);

					if (typeof canAutoUpdate != "undefined" && canAutoUpdate)
					{
						var ignoreButton = document.createElement("a");
						ignoreButton.className = "DC_LoaTS_notifitcationBarButton";
						ignoreButton.href = "#";
						ignoreButton.appendChild(document.createTextNode("Turn auto update check off"));
						ignoreButton.onclick = function()
						{
							if ($("DC_LoaTS_notifitcationBar"))
							{
								$("DC_LoaTS_notifitcationBar").hide();
							}
							
							GM_setValue(DC_LoaTS_Properties.storage.autoUpdate, false);
							
							return false;
						};
						updateButtonsDiv.appendChild(ignoreButton);
					}
					
					
					document.body.appendChild(updateNotificationDiv);
				}
				$(updateNotificationDiv).down("#DC_LoaTS_notifitcationBarText").update(text);
				$(updateNotificationDiv).show();
			}
		};
		
		DC_LoaTS_Helper.updateRaidData = function() {
			DC_LoaTS_Helper.ajax({
				url: DC_LoaTS_Properties.raidDataURL + "?_dc=" + DC_LoaTS_Helper.generateUUID(),
				onload: function(response) {
					var message;
					if (response.status === 200) {
						eval(response.responseText.replace("DC_LoaTS_Helper.raids", "var data"));
						var added = [];
						for (var i in data) {
							if (data.hasOwnProperty(i) && typeof DC_LoaTS_Helper.raids[i] === "undefined") {
								DC_LoaTS_Helper.raids[i] = data[i];
								added.push(data[i].fullName);
							}
						}
						if (added.length > 0) {
							message = "Loaded " + added.length + " new raid type" + ((added.length!=1)?"s":"") + ".\n" + added.join("\n");
							DC_LoaTS_Helper.updatePostedLinks();
						}
						else {
							message = "No new raid types found."
						}
					}
					else if (response.status > 200 && response.status < 400) {
						message = "No new raid types found."
					}
					else {
						message = "Unable to check for updated raid data from update site. (status: " + response.status + ")";
					}

					if (message) {
						if (holodeck.activeDialogue()) {
							holodeck.activeDialogue().raidBotMessage(message);
						}
					}
					
					if (window.raidTools && window.raidTools.spammer && window.raidTools.spammer.raids) {
						var raidsObj = window.raidTools.spammer.raids;
						if (!raidsObj.lots) {
							raidsObj.lots = {};
						}
						
						for (var raidId in DC_LoaTS_Helper.raids) {
							if (!raidsObj.lots[raidId]){
								raidsObj.lots[raidId] = DC_LoaTS_Helper.raids[raidId].shortName;
							}
						}
					}
				}
			});

			DC_LoaTS_Helper.ajax({
				url: DC_LoaTS_Properties.worldRaidDataURL + "?_dc=" + DC_LoaTS_Helper.generateUUID(),
				onload: function(response) {
					var message;
					if (response.status === 200) {
						var oldWRData = DC_LoaTS_Helper.worldRaidInfo;
						try {
						    eval(response.responseText);
						}
						catch (ex){}
						var WRData = DC_LoaTS_Helper.worldRaidInfo;
						
						if (!oldWRData && WRData) {
							message = "New " + (WRData.spawnType||"World Raid") + ": " + WRData.name;
						}
						
						RaidToolbar.createWRButton();
					}
					else if (response.status > 200 && response.status < 400) {
						message = "No new World Raids found."
					}
					else {
						message = "Unable to check for updated world raid data from update site. (status: " + response.status + ")";
					}

					if (message) {
						if (holodeck.activeDialogue()) {
							holodeck.activeDialogue().raidBotMessage(message);
						}
					}
				}
			});

		};
		
		DC_LoaTS_Helper.getCommandLink = function(commandText, displayText)
		{
			if (typeof displayText == "undefined"){displayText = commandText};
			return "<a href=\"#\" class=\"chatCommandLink\" onclick=\"holodeck.processChatCommand('" + commandText + "'); return false;\">" + displayText + "</a>";
		};
		
		
		// Calculate shortest names
		DC_LoaTS_Helper.calculateShortestRaidNames = function()
		{
			Timer.start("calculateShortestRaidNames calc");
			// Borrowed from: http://stackoverflow.com/questions/11245481/find-the-smallest-unique-substring-for-each-string-in-an-array
			var uniqueNames = [], nameInd, windowSize, substrInd, substr, otherNameInd, foundMatch;
			// For each name
			for (nameInd in DC_LoaTS_Helper.raids)
			{
			    var name = DC_LoaTS_Helper.raids[nameInd].getSearchableName();
			    // For each possible substring length
			    windowLoop:
			    for (windowSize = 1; windowSize <= name.length; windowSize++)
			    {
			        // For each starting index of a substring
			        for (substrInd = 0; substrInd <= name.length-windowSize; substrInd++)
			        {
			            substr = name.substring(substrInd,substrInd+windowSize).toLowerCase();
			            if (/\W|_|^[1-4]$/gi.test(substr)){continue;}
			            foundMatch = false;
			            // For each other name
			            for (otherNameInd in DC_LoaTS_Helper.raids)
			            {
			                if (nameInd != otherNameInd && DC_LoaTS_Helper.raids[otherNameInd].getSearchableName().toLowerCase().indexOf(substr) > -1)
			                {
			                    foundMatch = true;
			                    break;
			                }
			            }
			
			            if (!foundMatch)
			            {
			                // This substr works!
			                DC_LoaTS_Helper.raids[nameInd].shortestName = substr;
			                break windowLoop;
			            }
			        }
			    }
			}
			Timer.stop("calculateShortestRaidNames calc");
		};
		
		DC_LoaTS_Helper.showWRInfo = function() {
			if (typeof DC_LoaTS_Helper.worldRaidInfo === "object") {
				
				var wr = DC_LoaTS_Helper.worldRaidInfo;
				wr.spawnType = wr.spawnType || "World Raid";
				
				RaidMenu.show();

				var wrtab = document.getElementById("DC_LoaTS_raidMenu" + wr.spawnType.trim().replace(" ", "_") + "PaneTab");
				if (!wrtab) {
					// Need to create a WR Info Div
					var tabClass = RaidMenuTab.create({
						tabName: wr.spawnType || "World Raid",
						tabHeader: wr.name + " " + wr.spawnType + ". " + wr.startDate,
						tabPosition: 150,
						closeable: true,
						
						initPane: function()
						{
							var timerDiv = document.createElement("div");
							timerDiv.className = "DC_LoaTS_WR_Timer";
							timerDiv.style.fontWeight = "Bold";
							timerDiv.appendChild(document.createTextNode("Please Wait, Starting Timer..."));
							this.pane.appendChild(timerDiv);
							this.pane.appendChild(document.createElement("br"));
							
							if (wr.raidUrl) {
								var wrlink = new RaidLink(wr.raidUrl);
								var wrlinkDiv = document.createElement("div");
								wrlinkDiv.innerHTML = wrlink.getFormattedRaidLink();
								this.pane.appendChild(wrlinkDiv);
							}
							
							var infoDiv = document.createElement("div");
							
							if (wr.infoUrl) {
								var infoLink = document.createElement("a");
								infoLink.href = wr.infoUrl;
								infoLink.target = "_BLANK";
								infoLink.appendChild(document.createTextNode(wr.infoUrlTitle||wr.infoUrl));
								infoDiv.appendChild(infoLink);
							}
							
							if (wr.lootTableImageUrl) {
								infoDiv.appendChild(document.createElement("br"));
								var lootTable = document.createElement("img");
								lootTable.src = wr.lootTableImageUrl;
								lootTable.title = wr.name  + " Loot Table. " + wr.startDate;
								lootTable.style.borderRadius = "5px";
								infoDiv.appendChild(lootTable);
							}
							
							this.pane.appendChild(infoDiv);
							
							wrtab = this.tabA;
							
							DC_LoaTS_Helper.doWRTimer();
						}
					});
					RaidMenu.getInstance().activateTab(tabClass);
				}
	
				RaidMenu.getInstance().tabs.setActiveTab(wrtab);
			}
		};

		DC_LoaTS_Helper.doWRTimer = function() {
			var wr = DC_LoaTS_Helper.worldRaidInfo;
			var timerText = "No current WR or WR is over."
			if (typeof wr === "object" && wr.timerEnds) {
				var now = new Date();
				var timerEnds = new Date(wr.timerEnds);
				
				if (timerEnds > now) {
					// WR is on
					var diff = Math.floor((timerEnds.getTime() - now.getTime()) / 1000);
					var hours = Math.floor(diff/3600);
					var minutes = Math.floor((diff%3600)/60);
					var seconds = Math.floor((diff%60));
					timerText = "Estimated Time Remaining: " + 
								(hours<10?"0"+hours:hours) + ":" + 
								(minutes<10?"0"+minutes:minutes) + ":" + 
								(seconds<10?"0"+seconds:seconds);
				}
				else {
					// WR is over
					timerText = wr.name + " is over.";
				}
				
				var elems = document.getElementsByClassName("DC_LoaTS_WR_Timer");
				if (elems && elems.length > 0) { 
					for (var i = 0; i < elems.length; i++) {
						elems[i].innerHTML = timerText;
					}
					
					wr.timerEndsTimeout = setTimeout("DC_LoaTS_Helper.doWRTimer();", 1000);
				}
			}
		}
		
		DC_LoaTS_Helper.timeDifference = function(current, previous) {

		    var msPerImmediate = 10 * 1000,
		        msPerMinute = 60 * 1000,
		        msPerHour = msPerMinute * 60,
		        msPerDay = msPerHour * 24,
		        msPerMonth = msPerDay * 30,
		        msPerYear = msPerDay * 365,

		        elapsed = current - previous,
		        val, unit, text;

		    if (elapsed < msPerImmediate) {
		         text = "moments ago";
		    }
		    else if (elapsed < msPerMinute) {
		         val = Math.round(elapsed/1000);
		         unit = "second";
		    }
		    else if (elapsed < msPerHour) {
		         val = Math.round(elapsed/msPerMinute);
		         unit = "minute";
		    }
		    else if (elapsed < msPerDay ) {
		    	val = Math.round(elapsed/msPerHour);
		        unit = "hour";
		    }
		    else if (elapsed < msPerMonth) {
		    	val = Math.round(elapsed/msPerDay);
		        unit = "day";
		    }
		    else if (elapsed < msPerYear) {
		    	val = Math.round(elapsed/msPerMonth);
		        unit = "month";
		    }
		    else {
		    	val = Math.round(elapsed/msPerYear);
		        unit = "year";
		    }
		    
		    return text || val + " " + unit + (val !== 1 ? 's':'') + " ago"
		};
		
		DC_LoaTS_Helper.getCurrentPrettyDate = function() {
			// Via: https://gist.github.com/akb/1187817
			return (function () {
			    return ['Jan.', 'Feb.', 'Mar.', 
			            'Apr.', 'May', 'Jun.',
			            'Jul.', 'Aug.', 'Sep.', 
			            'Oct.', 'Nov.', 'Dec.'][this.getMonth()] + " " +
			            (function (d) { 
			                var s = d.toString(), l = s[s.length-1];
			                return s+(['st','nd','rd'][l-1] || 'th');
			            })(this.getDate()) + ", " +
			            this.getFullYear() + " " +
			            this.getHours() + ":" + ("0" + this.getMinutes()).slice(-2);
			}).call(new Date())
		};


		DC_LoaTS_Helper.generateUUID = function()
		{
		    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		        return v.toString(16);
		    });
		};
		
		// Go ahead and execute this, too
		DC_LoaTS_Helper.calculateShortestRaidNames();

		// Debug log wrapping function
		// Special scope debugging for just this script
		window.DCDebug = function()
		{
			if (DC_LoaTS_Properties.debugMode === true)
			{
				console.log.apply(console, arguments);
			}
		}
		
		// Borrowed from: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
		String.prototype.format = function()
		{
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number)
			{ 
				return typeof args[number] != 'undefined'?args[number]:match;
			});
		};

	// World Raid Data, if there is any
    // We can leave stuff commented out in here, but don't let it get too big. This gets downloaded with /urd
	
	// DC_LoaTS_Helper.worldRaidInfo.timerEnds = "2013-01-28T22:20:19Z" // 6PM EST / 11PM GMT

//	DC_LoaTS_Helper.worldRaidInfo = {
//		name: "Cerebral CEO",
//		
//		spawnType: "Rare Spawn",
//		
//		startDate: "02/21/2013",
//		timerEnds: "2013-02-22T22:21:04Z",
//		
//		raidUrl: "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_raid_id=7186882&kv_difficulty=1&kv_raid_boss=cerebral_ceo&kv_hash=1A0RG3zutj",
//		infoUrl: "http://www.legacyofathousandsuns.com/forum/showthread.php?11606-Corporate-Takedown-Fight-the-Cerebral-CEO!",
//		infoUrlTitle: "'Corporate Takedown - Fight the Cerebral CEO! ' Official Announcement",
//		lootTableImageUrl: "http://i.imgur.com/7TzuHjl.jpg"
//	};

	/*
	DC_LoaTS_Helper.worldRaidInfo = {
		name: "Cerebral Destroyer",
		
		spawnType: "World Raid",
		
		startDate: "02/28/2013",
		timerEnds: "2013-03-03T22:30:00Z",
		
		raidUrl: "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_raid_id=6648986&kv_difficulty=1&kv_raid_boss=wr_space_pox&kv_hash=0P9ft37ffs",
		infoUrl: "http://www.legacyofathousandsuns.com/forum/showthread.php?10224-Delirium-of-the-Cerebral-Destroyer",
		infoUrlTitle: "'Delirium of the Cerebral Destroyer' Official Announcement",
		lootTableImageUrl: "http://i.imgur.com/XlWhw.jpg"
	};
	*/


	// End World Raid Data
		}// End declareClasses function
	
	// Define some CSS Styles
	function defineStyles()
	{
				var rulesText = "abbr, acronym, span.abbr {\n";
				rulesText += "\tborder-bottom: 1px dashed #444444;\n";
				rulesText += "}\n";
				
				rulesText += "\n.smallText {\n";
				rulesText += "\tfont-size: 85%;\n";
				rulesText += "}\n";
				
				
				rulesText += "\na.DC_LoaTS_updateLink {\n";
				rulesText += "\tbackground: #BAE37F url(http://userscripts.org/images/sprite.png?2) right -130px no-repeat;\n";
				rulesText += "\tborder: 1px solid #888; padding: 2px 16px;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfont-weight: bold;\n";
				rulesText += "\tfont-size: 1.5em;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\tcolor: #004 !important;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "}\n";
								
                rulesText += "\na.DC_LoaTS_updateLink:hover {\n";
                rulesText += "\tcolor: #08F !important;\n"                              
                rulesText += "\tbackground: url(http://userscripts.org/images/sprite.png?2) right 0px no-repeat;\n";
                rulesText += "}\n";
                
                
                rulesText += "\nimg.raidIcon {\n";
                rulesText += "\tbackground: url(http://userscripts.org/images/sprite.png?2) right 0px no-repeat;\n";
                rulesText += "}\n";
                
                
				// -- Raid Menu Styles -- \\
				
				rulesText += "\n#DC_LoaTS_raidMenu {\n";
//				rulesText += "\theight: 60%;\n";
				rulesText += "\twidth: 775px;\n";
//				rulesText += "\tbackground: #062834;\n";
//				rulesText += "\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\tposition: fixed;\n";
				rulesText += "\tleft: 7%;\n";
				rulesText += "\ttop: 20%;\n";
				rulesText += "\tz-index: 99999999;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
//				rulesText += "\tborder:  2px solid #93CDD0;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidMenuClose {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\twidth: 50px;\n";
				rulesText += "\theight: 45px;\n";
				rulesText += "\tcursor: pointer;\n";
				rulesText += "}\n";


				rulesText += "\n#DC_LoaTS_raidMenuTitleBar {\n";
				rulesText += "\tbackground: #347D87 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menutitlebarbg.png) 50% 50% repeat-x;\n";
				//rulesText += "\tbackground: #347D87 url(http://old.jqueryui.com/themeroller/images/?new=347d87&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
				rulesText += "\tpadding:  2px 10px;\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
//				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "\tborder-right-width: 0px;\n";
				rulesText += "\twidth: 702px;\n";
				rulesText += "\theight: 37px;\n";
				rulesText += "\tcursor: move;\n";
				rulesText += "\tfont-size: 15pt;\n";
				rulesText += "\tcolor: #DEECED;\n";
				rulesText += "\tborder: 3px solid #93CDD0;\n";
				rulesText += "\tborder-bottom: 1px solid #062834;\n";
				rulesText += "\tborder-right-width: 0px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidMenuTitleBarLeft {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTitleBarCenter {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tmargin: auto;\n";
				rulesText += "\twidth: 400px;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTitleBarRight {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuBodyWrapper {\n";
				rulesText += "\tbackground: #0E5969 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menubodywrapperbg.png) 50% 50% repeat;\n";
				//rulesText += "\tbackground: #0E5969 url(http://old.jqueryui.com/themeroller/images/?new=0e5969&w=12&h=10&f=png&q=100&fltr[]=over|textures/18_hexagon.png|0|0|20) 50% 50% repeat;\n";
				rulesText += "\tborder: 3px solid #93CDD0;\n";
				rulesText += "\tborder-top-width: 0px;\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "}\n";
				
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs {\n";
				rulesText += "\tclear: both;\n";
				rulesText += "\tborder-bottom: 1px solid #CCC;\n";
				rulesText += "\theight: 23px;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li {\n";
				rulesText += "\tlist-style: none;\n";
				rulesText += "\tfont-family: Verdana, sans;\n";
				rulesText += "\tfont-size: 11px;\n";
				rulesText += "\tline-height: 18px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tmargin-right: 5px;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\t;\n";
				rulesText += "\t;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li a {\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\theight: 20px;\n";
				rulesText += "\tpadding: 0px 6px;\n";
				rulesText += "\twidth: 80px;\n";
				rulesText += "\tbackground-color: #153041;\n";
				rulesText += "\tborder: 2px solid #41B0B5;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "\tfont-size: 115%;\n";
				rulesText += "\tcolor: #FFFFFF;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidMenuTabs li a.active {\n";
				rulesText += "\tbackground-color: #57959E;\n";
				rulesText += "\tborder: 2px solid #F1FFFF;\n";
				rulesText += "\tcolor: #B7E5EE;\n";
				rulesText += "}\n";
				
				rulesText += "\n.RaidMenuTab-Header {\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuOptionWrapper {\n";
				rulesText += "\tborder-bottom: 1px solid #479090;\n";
				rulesText += "\tmargin-bottom: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuOptionWrapper div{\n";
				rulesText += "\tpadding: 5px;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuDescription{\n";
				rulesText += "\tpadding-left: 15px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane {\n";
				//rulesText += "\tbackground: #77C0C0 url(http://old.jqueryui.com/themeroller/images/?new=77c0c0&w=1&h=100&f=png&q=100&fltr[]=over|textures/06_inset_hard.png|0|0|50) 50% bottom repeat-x;\n";
				rulesText += "\tbackground: #77C0C0 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/menupanebg.png) 50% bottom repeat-x;\n";
				rulesText += "\tfont-size: 1.2em;\n";
				rulesText += "\tpadding: 5px 10px;\n";
				rulesText += "\tmin-height: 200px;\n";
				rulesText += "\tmax-height: 600px;\n";
				rulesText += "\toverflow: auto;\n";
				rulesText += "\tclear: both;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane h1{\n";
				rulesText += "\tborder-bottom: 1px solid #000000;\n";
				rulesText += "\tmargin-bottom: 15px;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_raidMenuPane h2{\n";
				rulesText += "\tborder-bottom: 1px solid #479090;\n";
				rulesText += "\tmargin-bottom: 10px;\n";
				rulesText += "}\n";
				
				
				
				rulesText += "\n#RaidsMenu-SearchWrapper {\n";
				rulesText += "\twidth: 50%;\n";
				rulesText += "\tmargin: auto;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#RaidsMenu-SearchBox {\n";
				rulesText += "\twidth: 70%;\n";
				rulesText += "\tmin-width: 150px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#RaidsMenu-ResultsBox {\n";
				rulesText += "\tmax-height: 300px;\n";
				rulesText += "\toverflow: auto;\n";
				rulesText += "}\n";				
				
				rulesText += "\n#FormattingTab-MessageFormatTextArea {\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\tmin-height: 35px;\n";
				rulesText += "}\n";				
				
				
				rulesText += "\n.FormattingTab-Button {\n";
				rulesText += "\tpadding: 3px 15px 4px;\n";
				rulesText += "}\n";				
				
				rulesText += "\n.StylesTab-RaidNamesPicker {\n";
				rulesText += "\tfloat:left;\n";
				rulesText += "}\n";				
				
				
				rulesText += "\n#PreferencesMenu-LoadRaidsInBackgroundDelayInputWrapper input {\n";
				rulesText += "\twidth: 30px;\n";
				rulesText += "\theight: 10px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "}\n";				
				
				
				rulesText += "\n#DC_LoaTS_notificationBar {\n";
				rulesText += "\tbackground: #f8dc5a url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/notificationbg.png) 50% 50% repeat-x;\n";
				//rulesText += "\tbackground: #f8dc5a url(http://old.jqueryui.com/themeroller/images/?new=f8dc5a&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75) 50% 50% repeat-x;\n";
				rulesText += "\tpadding: 4px 10px; 0px\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\tfont-size: 12pt;\n";
				rulesText += "\tcolor: #915608;\n";
				rulesText += "\tborder-bottom: 1px solid #fcd113;\n";
				rulesText += "\tposition: fixed;\n";
				rulesText += "\ttop: 0px;\n";
				rulesText += "\tleft: 0px;\n";
				rulesText += "\tz-index: 99999999;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notificationBarTitle {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notificationBarText {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notificationBarButtons {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "\tpadding-top:1px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_notificationBarButtons a.DC_LoaTS_updateLink {\n";
				rulesText += "\tfont-size: inherit;\n";
				rulesText += "\tmargin-right:10px;\n";
				rulesText += "}\n";
				
				rulesText += "\na.DC_LoaTS_notificationBarButton {\n";
				rulesText += "\tbackground-color: #F9B83E;\n";
				rulesText += "\tborder: 1px solid #915608;"
				rulesText += "\tpadding: 2px 10px;\n";
				rulesText += "\tmargin-right: 10px;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfont-weight: bold;\n";
				rulesText += "\ttext-align: center;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
								
				rulesText += "\na.DC_LoaTS_notificationBarButton:hover {\n";
				rulesText += "\tcolor: #915608;\n"								
				rulesText += "\tbackground: #FDE477;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer {\n";
				rulesText += "\tcolor: #FFFFFF;\n"								
				rulesText += "\tlist-style: none;\n"								
				rulesText += "\tbackground: #113552 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hexbg.png) 50% 50% repeat;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\theight: 16px;\n";
				rulesText += "\tpadding: 2px 5px;\n";
				rulesText += "\ttext-align:left;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidToolbarContainer li {\n";
				rulesText += "float:left;";
				rulesText += "}\n";
				

				rulesText += "\na.DC_LoaTS_button {\n";
				rulesText += "\twidth: 16px;\n";
				rulesText += "\theight: 16px;\n";
				rulesText += "\tbackground: url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/icons.png);\n";
				rulesText += "\tbackground-repeat: no-repeat;\n";
				rulesText += "\tcursor: pointer;\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\ttext-indent: -99999px;\n";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_menuButton {\n";
				rulesText += "\tbackground-position: -48px -80px;";
				rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_reloadButton {\n";
				rulesText += "\tbackground-position: -160px -64px;";
				rulesText += "}\n";

                rulesText += "\na.DC_LoaTS_toggleGameButton {\n";
                rulesText += "\tbackground-position: 0 -176px;";
                rulesText += "}\n";

                rulesText += "\na.DC_LoaTS_toggleWorldChatButton {\n";
                rulesText += "\tbackground-position: -128px -96px;";
                rulesText += "}\n";

				rulesText += "\na.DC_LoaTS_WRButton {\n";
				rulesText += "\ttext-indent: 0px;\n";
				rulesText += "\tbackground: none;\n";
				rulesText += "\twidth: auto;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\na.DC_LoaTS_WRButton:hover {\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tbackground-color: #71A5CE;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li.DC_LoaTS_WRButtonWrapper {\n";
				rulesText += "\tfloat: right;\n";
				rulesText += "}\n";
				

				rulesText += "\n.DC_LoaTS_omnibox {\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\tborder-color: #FFFFFF;\n"								
				rulesText += "\tbackground-color: #71A5CE;\n";
				rulesText += "\tpadding: 0px 2px !important;\n";
				rulesText += "}\n";
								
				rulesText += "\n.DC_LoaTS_omnibox_focus {\n";
				rulesText += "\tborder-color: #71A5CE;\n"								
				rulesText += "\tbackground-color: #FFFFFF;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_omniboxWrapper {\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "\tposition: relative;\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "}\n";
				
				rulesText += "\n.DC_LoaTS_omniboxCommandsWrapper {\n";
				rulesText += "\tbackground: #113552 url(http://subversion.assembla.com/svn/doomscript/trunk/1.1.0/Assets/hexbg.png) 50% 50% repeat;\n";
				rulesText += "\tlist-style: none;\n";
				rulesText += "\tz-index: 999;\n";
				rulesText += "\tposition: absolute;\n";
				rulesText += "\twidth: 630px;\n";
				rulesText += "\tpadding: 5px;;\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "\t;\n";
				rulesText += "}\n";

				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li{\n";
				rulesText += "\tfloat:none;\n";
				rulesText += "\tmargin: 0px;\n";
				rulesText += "\tbackground-color: #051E2A;\n";
				rulesText += "\tfont-size: 1.3em;\n";
				rulesText += "\toverflow: hidden;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a{\n";
				rulesText += "\tdisplay: block;\n";
				rulesText += "\tcolor: #EEEEEE;\n";
				rulesText += "\ttext-decoration: none;\n";
				rulesText += "\tfloat:left;\n";
				rulesText += "\t-moz-border-radius: 5px;\n";
				rulesText += "\t-webkit-border-radius: 5px;\n";
				rulesText += "\tborder-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a:hover{\n";
				rulesText += "\tbackground-color: #57959E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li:first-child{\n";
				rulesText += "\tborder-top-left-radius: 5px;\n";
				rulesText += "\tborder-top-right-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li:last-child{\n";
				rulesText += "\tborder-bottom-left-radius: 5px;\n";
				rulesText += "\tborder-bottom-right-radius: 5px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer li li a:first-child, #DC_LoaTS_raidToolbarContainer li li div:first-child{\n";
				rulesText += "\tpadding-left: 10px !important;\n";
				rulesText += "}\n";				
				
				//--- Onnibox Option Styles ---\\
				
				rulesText += "\n.DC_LoaTS_initialtext {\n";
				rulesText += "\tfloat: left;\n";
				rulesText += "\tpadding-left: 0px !important;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_omniboxOption {\n";
				rulesText += "\tpadding: 2px 10px;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_any {\n";
				rulesText += "\t;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal {\n";
				rulesText += "\tcolor:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_normal:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard {\n";
				rulesText += "\tcolor:#E3E72E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_hard:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#E3E72E;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary {\n";
				rulesText += "\tcolor:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_legendary:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare {\n";
				rulesText += "\tcolor:#B84EFE;\n";
				rulesText += "}\n";
				
				rulesText += "\n#DC_LoaTS_raidToolbarContainer a.DC_LoaTS_nightmare:hover {\n";
				rulesText += "\tcolor:#FFFFFF;\n";
				rulesText += "\tbackground-color:#B84EFE;\n";
				rulesText += "}\n";
				

				rulesText += "\na.raidDiffNormal:hover {\n";
				rulesText += "\tcolor:#48C957;\n";
				rulesText += "}\n";
				
				rulesText += "\na.raidDiffHard:hover {\n";
				rulesText += "\tcolor:#828505;\n";
				rulesText += "}\n";

				rulesText += "\na.raidDiffLegendary:hover {\n";
				rulesText += "\tcolor:#CB0039;\n";
				rulesText += "}\n";
				
				rulesText += "\na.raidDiffNightmare:hover {\n";
				rulesText += "\tcolor:#B84EFE;\n";
				rulesText += "}\n";
				
				rulesText += "\n.hidden {\n";
				rulesText += "\tdisplay: none;\n";
				rulesText += "}\n";
				
				
				rulesText += "\n.DataDumpTab-Data {\n";
				rulesText += "\twidth: 100%;\n";
				rulesText += "\theight: 400px;\n";
				rulesText += "}\n";

				rulesText += "\n.DC_LoaTS_raidMenuCloseTabA {\n";
				rulesText += "\tborder-radius: 100px;\n";
				rulesText += "\twidth: 5px;\n";
				rulesText += "\theight: 5px;\n";
				rulesText += "\tcolor: #FFFFFF;\n";
				rulesText += "\tbackground-color: #CCCCCC;\n";
				rulesText += "}\n";

                rulesText += "\n#maingame {\n";
                rulesText += "\t-moz-transition: width .5s ease-out 0s;\n";
                rulesText += "\t-webkit-transition: width .5s ease-out 0s;\n";
                rulesText += "\t-o-transition: width .5s ease-out 0s;\n";
                rulesText += "}\n";

                rulesText += "\n#maingame.hideWorldChat {\n";
                rulesText += "\twidth: 1060px !important;\n";
                rulesText += "}\n";

                rulesText += "\n#game {\n";
                rulesText += "\toverflow: hidden;\n";
                rulesText += "\t-moz-transition: width .5s ease-out 0s;\n";
                rulesText += "\t-webkit-transition: width .5s ease-out 0s;\n";
                rulesText += "\t-o-transition: width .5s ease-out 0s;\n";
                rulesText += "}\n";

                rulesText += "\n.hideWorldChat #game {\n";
                rulesText += "\twidth: 759px !important;\n";
                rulesText += "}\n";

                rulesText += "\n#gameholder {\n";
                rulesText += "\twidth: auto !important;\n";
                rulesText += "}\n";

        var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				style.type = 'text/css';
				
				if(style.styleSheet)
				{
				    style.styleSheet.cssText = rules.nodeValue;
				}
				else
				{
					style.appendChild(rules);
				}
				
				head.appendChild(style);
	}
	
	function setupGMFunctions()
	{
		if (typeof GM_setValue === 'undefined')
		{
		    // These are probably obsolete now
			if(window.opera)
			{
				if(window.localStorage)
				{
					console.log("Creating Opera local storage fallbacks for GM functions");
					window.GM_setValue = function(k, v)
					{
						localStorage.setItem(k, v);
					}
					window.GM_getValue = function(k, def)
					{
						var ret = localStorage.getItem(k);
						return (ret == null?def:ret)
					}
					window.GM_deleteValue = function(k)
					{
						localStorage.removeItem(k);
					}
				} 
				else
				{
					window.GM_setValue = function(){console.warn("Local Storage not accessible.");};
					window.GM_getValue = function(){console.warn("Local Storage not accessible.");};
					window.GM_deleteValue = function(){console.warn("Local Storage not accessible.");};
				}
			}
			else if(/Chrome/i.test(navigator.appVersion) || typeof unsafeWindow === "undefined")
			{
				console.log("Creating Chrome local storage fallbacks for GM functions");
				window.GM_setValue = function(k, v)
				{
					localStorage.setItem(k, v);
				}
				window.GM_getValue = function(k, def)
				{
					var ret = localStorage.getItem(k);
					return (ret == null?def:ret)
				}
				window.GM_deleteValue = function(k)
				{
					localStorage.removeItem(k);
				}
			}
		}
		
		if (typeof GM_xmlhttpRequest !== "function") {
		    console.warn("doomscript will not run properly (or maybe even at all) in your browser without Greasemonkey Emulation: http://userscripts.org/scripts/show/105153");
		}
	}
	
	function doCriticalHooks()
	{
		// Have the raid bot post a message to the user
		ChatDialogue.prototype.raidBotMessage = function(message)
		{
			try 
			{
				holodeck.activeDialogue().displayUnsanitizedMessage("RaidBot",
														 	message.replace(/\n/g, "<br />\n"),
														 	{"class": "whisper received_whisper"},
															{non_user: true} 
														   );
			}
			catch (ex) 
			{
				console.warn("Unexpected exception during raidBotMessage", ex);
			}
		}
	}
	
	// Gotta jumpstart this bucket of giggles	
    function bootstrap_DC_LoaTS_Helper(loadSubFrames)
    {
    	// Only run if the script is running in the top frame
    	if (top !== self && loadSubFrames != true)
    	{
    		return;
    	}
    	
		if (typeof window._dc_loats_helper_fails == "undefined")
        {
        	window._dc_loats_helper_fails = 0;
        }
        
        if (window._dc_loats_helper_fails >= 10)
        {
            console.warn("DC LoaTS Link Helper could not load.");
        	return;
        }

    	// Don't want to run the script twice
    	if (!window._dc_loats_helper)
    	{
	        
	        // Do we actually have everything we need to start?
	        if (typeof holodeck === "undefined" || typeof ChatDialogue === "undefined" || typeof Class === "undefined" || !$("chat_window"))
	        {
	        	// Something is not loaded yet. Bail on this and try again later
//	            console.log("DC LoaTS Link Helper not ready. Fail " + window._dc_loats_helper_fails + "/10");
	            
	            window._dc_loats_helper_fails++;
	            setTimeout(bootstrap_DC_LoaTS_Helper, 1000); // 1000ms = 1 second
	            return;
	        }
	        
	        // Print that we're about to start
    		console.info("DC LoaTS Link Helper v" + DC_LoaTS_Properties.version + " trying to start...");
	        
	        // Setup GreaseMonkey functions
	        setupGMFunctions();
	        
	        // Do critical hooks
	        doCriticalHooks();
	        
	        // Declare classes
	        declareClasses();
	        
	        // Define styles
	        defineStyles();
	        
    		// Throw a reference to this onto the window I guess in case anyone else wants to use it?
			window._dc_loats_helper = new DC_LoaTS_Helper();
			
			// Update raid data
			DC_LoaTS_Helper.updateRaidData();			
    	}
    	
    	// Everything is done
        console.info("DC LoaTS Link Helper started!");
    }
    
    // Hit the go button and activate the main script.
    bootstrap_DC_LoaTS_Helper();
}


// GM Layer
function xhrGo(event)
{
	var params = event.detail;
	for (var param in params)
	{
		if (typeof params[param] === "string" && param.toLowerCase().indexOf("__callback_") === 0)
		{
			var funcName = param.substring("__callback_".length);
			params[funcName] = gmCallBack.bind(this, params.UUID, funcName);
		}
	}
    if (typeof GM_xmlhttpRequest === "function") {
	    setTimeout(function(){GM_xmlhttpRequest(params);},0);
    }
    else {
        console.error("Browser is not configured to allow GM_xmlhttpRequest. This could be due to a Chrome v27 bug.");
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState === 4)
            {
                if (typeof params.onload === "function") {
                    params.onload(xmlhttp);
                }
            }
        }
        xmlhttp.open(params.method,params.url,!params.synchronous);
        xmlhttp.send();
        
    }
};

function gmCallBack(UUID, funcName, response)
{
	setTimeout(function()
	{
		var evt = new CustomEvent(UUID, {"bubbles": true, "cancelable": true, "detail": {callbackName: funcName, responseObj: response}});
		document.dispatchEvent(evt);
	}, 0);
};

document.addEventListener("DC_LoaTS_ExecuteGMXHR", xhrGo);



// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
if (/https?:\/\/www\.kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns.*/i.test(window.location.href))
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}