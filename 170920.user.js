// This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/.

// ==UserScript==
// @name           Neverwinter Gateway - Professions Robot
// @description    Automatically selects professions for empty slots
// @namespace      http://userscripts.org/scripts/show/170920
// @include        https://gateway.playneverwinter.com
// @include        https://gateway.playneverwinter.com/*
// @include        https://gatewaysitedown.playneverwinter.com
// @include        https://gatewaysitedown.playneverwinter.com/*
// @include        http://gateway.playneverwinter.com
// @include        http://gateway.playneverwinter.com/*
// @include        http://gatewaysitedown.playneverwinter.com
// @include        http://gatewaysitedown.playneverwinter.com/*
// @updateURL      https://userscripts.org/scripts/source/170920.meta.js
// @downloadURL    https://userscripts.org/scripts/source/170920.user.js
// @originalAuthor Mustex
// @version        0.2.0.1
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/* RELEASE NOTES
0.2.0.1
	- Fix for selecting optional assets after gateway update
0.2.0.0
	- Added 'Training Mode' which causes the script to attempt to upgrade common assets (white) to the configured rank for each slot depending on level
		* Level     2 = Rank 1
		* Level  6/ 7 = Rank 2
		* Level 13/14 = Rank 3
		* Actual level vs rank is configured on a per profession basis
		* Leadership will create one of highest rank per open slot, and one Rank 1 for use in optional slot
		* Other professions will create one of highest rank per open slot
		* Extra higher rank assets count toward lower rank asset count
		* Green, Blue, Purple assets count against Rank 3, but are not upgraded
	- Added a secondary timer that will reload the gateway every few hours. This should help with disconnects from the server
	- Implemented tooltips for settings panel
	- Removed asset creation tasks from regular task list
0.1.9.2
	- Bug Fix: Fixed retry problems after a valid task is not found
	- Bug Fix: Fixed error in Leatherworking path setting
	- Added options to limit assets used in optional slots
	- Slightly lengthened timer values
	- Asset rank is taken into account when selecting assets to use for optional slots
	- Minor tweak in task grid for upgrading assets
0.1.9.1.1
	- Bug Fix: Removed configuration changes accidentally released
0.1.9.1
	- Fixes for gateway down detection
0.1.9.0
	- Added ability to pause the timer, allowing the user to navigate the gateway without it switching screens automatically
	- Make asset picking smarter with the changes made in the June 6th patch; only selects optional assets
	- Added detection for the gateway being down (not fully tested)
	- Leadership asset selection for bronze tier picks lowest asset first (From Bunta's script - http://userscripts.org/scripts/show/171738)
	- Add ability to select from multiple tasks with same name (eg Alchemical Research) (From Bunta's script)
	- Added tasks for Platesmithing, Leatherworking, Tailoring, Alchemy (Alchemy from Bunta's script)
	- Minor code cleanup and documentation, relaxed license
	- Tweaked Leadership tasks grid (again) since "Explore Local Area" was changed from 1 hour to 2 hours
0.1.8.3
	- Tweaked Leadership tasks grid
	- Added task grid for Alchemy (Partial)
0.1.8.2
	- onsave handlers for settings are now called before the settings values are saved
	- Added onsave handler for console to enable/disable using the window console
0.1.8.1
	- Added checking for errors (using the window title) and will navigate back to the main login page if autologin is enabled
0.1.8
	- Added popup for altering settings
	- Settings are saved to script cache
	- Added mailsmithing tasks to task grid
0.1.7
	- Added lower level leadership tasks to grid
	- Added hiring tasks to leadership task
	- Uses saved values to determine which profession type to level (Defaults to Leadership, currently no way to change it)
0.1.5
	- Is now able to recover from missing assets
	- Uses a configurable grid to determine what the next task is to complete
0.1.0
	- Is now able to select some hard coded leadership tasks
	- Can now collect from any completed slot
*/

/* REQUESTED FEATURES
 * - Add logic to determine when to 'hire' more assets (Depends on number of open slots, profession level, and current assets of the correct level)
 * - Add logic to create needed resources; this includes required potions for alchemy
 * - Add settings for defining a minimum amount of resources to attempt to keep in stock (When the rare tasks come up we will need to have some resources available)
 */

// Make sure it's running on the main page, no frames
if(window.self !== window.top) {
	throw "";
}

(function() {

	/**
	 * Add a string of CSS to the main page
	 *
	 * @param {String} cssString The CSS to add to the main page
	 */
	function AddCss(cssString) {
		var head = document.getElementsByTagName('head')[0];
		if(!head)
			return;
		var newCss = document.createElement('style');
		newCss.type = "text/css";
		newCss.innerHTML = cssString;
		head.appendChild(newCss);
	}
	function countLeadingSpaces(str) {
		return str.match(/^(\s*)/)[1].length;
	}

	var image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
		"AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
		"aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
		"koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
		"f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
		"QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
		"/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
		"1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
		"WdWHfmAAAAAElFTkSuQmCC";
	var image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
		"AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
		"BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
		"KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
		"UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
		"Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
		"pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
		"6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
		"85FH/WkOkaHQAAAABJRU5ErkJggg==";


	// Setup global closure variables
	var fouxConsole = {log:function(){},info:function(){},error:function(){},warn:function(){}};
	var console = unsafeWindow.console || fouxConsole;
	var $ = unsafeWindow.jQuery;
	var timerHandle = 0;
	var reloadTimerHandle = 0; // Used for timer that reloads the gateway every few hours
	var reloadNeeded = false;
	var reloadDelay = 7200000; // 2 hours
	var longDelay = 300000; // 5 minutes
	var delay = 15000; // 15 seconds
	var delayShort = 3000; // 3 second
	var dfdNextRun = $.Deferred();

	var tasklist = {
		Leadership: {
			name: "Leadership",
			assetRank: { // Order them lowest to highest while ignoring type; we only care about rank here
				Special: ["Hero"],
				Gold: ["Adventurer"], 
				Silver: ["Man at Arms","Basic Infantry Weapon","Basic Infantry Armor"],
				Bronze: ["Worn Infantry Weapon","Worn Infantry Armor","Mercenary","Guard","Footman"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [ // The list of images that are used on the gateway site to denote this asset rank
						"Crafting_Follower_Leader_Generic_T1_01"
					],
					task:"Hire a Mercenary", // The task that will create more assets of this rank
					level:2, // What crafting level the task becomes active
					requires: 0, // How many of the previous are needed to upgrade to this tier
				},
				{ // Rank 2
					images: [
						"Icons_Pets_Manatarms_01",
					],
					task:"Train a Guard",
					level:7,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Icons_Pets_Manatarms_03",
						"Crafting_Follower_Leader_Private_T2_01",
						"Crafting_Follower_Leader_Sergeant_T3_01",
						"Crafting_Follower_Leader_Lietenant_T4_01"
					],
					task:"Train a Footman",
					level:14,
					requires: 4,
				}
			],
			levels: { // use an object instead of an array to self-document the level and increase readability of the level grid
				 0:["Hire Your First Mercenary"],
				 1:["Complete Advanced Training", "Protect Grateful Merchant","Pick Up Package", "Basic Training"],
				 2:["Guard Duty","Martial Training"],
				 3:["Guard Duty","Martial Training", "Scout Area"],
				 4:["Protect Caravan","Guard Duty","Martial Training"],
				 5:["Explore Local Area","Protect Caravan" ,"Guard Duty"],
				 6:["Explore Local Area","Protect Caravan" ,"Guard Duty"],
				 7:["Explore Local Area","Protect Caravan" ,"Guard Duty"],
				 8:["Explore Local Area","Protect Caravan" ,"Guard Duty"],
				 9:["Chart Region","Explore Local Area","Protect Caravan" ,"Guard Duty"],
				10:["Chart Region","Explore Local Area","Protect Caravan" ,"Guard Duty"],
				11:["Chart Region","Explore Local Area","Protect Caravan" ,"Guard Duty"],
				12:["Chart Region","Explore Local Area","Protect Caravan" ,"Guard Duty"],
				13:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				14:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				15:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				16:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				17:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				18:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				19:["Chart Region","Patrol the Mines","Explore Local Area","War Games Training","Protect Caravan"],
				20:["Destroy Enemy Camp","Protect Caravan" ,"Battle Undead", "Gather Astral Diamonds", "Survey Terrain"],
			},
		},
		Armorsmithing_Med: {
			name: "Armorsmithing_Med",
			imagePath: "Medarmor", // TODO: Remove
			assetRank: {
				Special: ["Grandmaster Mailsmith", "Mithral Chisel", "Mithral Tongs","Mithral Hammer"],
				Gold: ["Master Mailsmith", "Steel Chisel", "Steel Tongs", "Steel Hammer"],
				Silver: ["Mailsmith","Iron Chisel", "Iron Tongs", "Iron Hammer"] ,
				Bronze: ["Worn Chisel","Worn Tongs","Worn Hammer","Prospector","Blacksmith","Assistant Mailsmith"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [
						"Crafting_Follower_Medarmor_Explorer_T1_01"
					],
					task:"Hire an additional Prospector", // The task that will create more assets of this rank
					level:2,
					requires: 0,
				},
				{ // Rank 2
					images: [
						"Crafting_Follower_Medarmor_Wiredrawer_T2_01",
					],
					task:"Upgrade Prospector",
					level:7,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Crafting_Follower_Medarmor_Metalsmith_T3_01",
					],
					task:"Upgrade Blacksmith",
					level:13,
					requires: 4,
				}
			],
			levels: {
				 0:["Hire your first Prospector"],
				 1:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 2:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 3:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 4:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 5:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 6:["Scale Shirt","Forge Iron Rings and Scales","Gather Iron Ore"],
				 7:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				 8:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				 9:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				10:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				11:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				12:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				13:["Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				14:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				15:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				16:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				17:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				18:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				19:["Ornate Scale Shirt","Mass Mithral Rings and Scales Forging","Forge Mithral Rings and Scales","Detailed Scale Shirt","Forge Steel Rings and Scales","Scale Shirt","Forge Iron Rings and Scales","Gather Mithral Ore","Forge Iron Rings and Scales","Gather High quality Iron Ore","Forge Iron Rings and Scales","Gather Iron Ore"],
				20:[],
			},
		},
		Armorsmithing_Heavy: {
			name: "Armorsmithing_Heavy",
			assetRank: {
				Special: ["Grandmaster Platesmith","Mithral Hammer","Mithral Anvil","Mithral Bellows"],
				Gold: ["Master Platesmith","Steel Hammer","Steel Anvil","Steel Bellows"],
				Silver: ["Platesmith","Iron Hammer","Iron Anvil","Iron Bellows"],
				Bronze: ["Worn Anvil","Worn Bellows","Worn Hammer","Miner","Armorer","Assistant Platesmith"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [
						"Crafting_Follower_Hvyarmor_Miner_T1_01"
					],
					task:"Hire an additional Miner",
					level:2,
					requires: 0,
				},
				{ // Rank 2
					images: [
						"Crafting_Follower_Hvyarmor_Blacksmith_T2_01",
					],
					task:"Upgrade Miner",
					level:7,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Crafting_Follower_Hvyarmor_Armorer_T3_01",
					],
					task:"Upgrade Armorer",
					level:14,
					requires: 4,
				}
			],
			levels: {
				 0:["Hire your first Miner"],
				 1:["Forge Iron Plates","Gather Iron Ore"],
				 2:["Forge Iron Plates","Gather Iron Ore"],
				 3:["Forge Iron Plates","Gather Iron Ore"],
				 4:["Forge Iron Plates","Gather Iron Ore"],
				 5:["Forge Iron Plates","Gather Iron Ore"],
				 6:["Forge Iron Plates","Gather Iron Ore"],
				 7:["Forge Steel Plates","Gather High quality Iron Ore"],
				 8:["Forge Steel Plates","Gather High quality Iron Ore"],
				 9:["Forge Steel Plates","Gather High quality Iron Ore"],
				10:["Forge Steel Plates","Gather High quality Iron Ore"],
				11:["Forge Steel Plates","Gather High quality Iron Ore"],
				12:["Forge Steel Plates","Gather High quality Iron Ore"],
				13:["Forge Steel Plates","Gather High quality Iron Ore"],
				14:["Forge Mithral Plates","Gather Mithral Ore"],
				15:["Forge Mithral Plates","Gather Mithral Ore"],
				16:["Forge Mithral Plates","Gather Mithral Ore"],
				17:["Forge Mithral Plates","Gather Mithral Ore"],
				18:["Forge Mithral Plates","Gather Mithral Ore"],
				19:["Forge Mithral Plates","Gather Mithral Ore"],
				20:[],
			},
		},
		Leatherworking: {
			name: "Leatherworking",
			assetRank: {
				Special: ["Grandmaster Leatherworker","Mithral Swivel Knife","Mithral Awl","Mithral Shears"],
				Gold: ["Master Leatherworker","Steel Swivel Knife","Steel Awl","Steel Shears"],
				Silver: ["Leatherworker","Iron Swivel Knife","Iron Awl","Iron Shears"],
				Bronze: ["Worn Awl","Worn Shears","Worn Swivel Knife","Skinner","Tanner","Assistant Leatherworker"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [
						"Crafting_Follower_Leather_Skinner_T1_01"
					],
					task:"Hire an additional Skinner",
					level:2,
					requires: 0,
				},
				{ // Rank 2
					images: [
						"Crafting_Follower_Leather_Skinner_T2_01",
					],
					task:"Upgrade Skinner",
					level:7,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Crafting_Follower_Leather_Skinner_T3_01",
					],
					task:"Upgrade Tanner",
					level:14,
					requires: 4,
				}
			],
			levels: {
				 0:["Hire your first Skinner"],
				 1:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts"],
				 2:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Hire an additional Skinner"],
				 3:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Hire an additional Skinner"],
				 4:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Hire an additional Skinner"],
				 5:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Hire an additional Skinner"],
				 6:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Hire an additional Skinner"],
				 7:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				 8:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				 9:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				10:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				11:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				12:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				13:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Skinner","Hire an additional Skinner"],
				14:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				15:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				16:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				17:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				18:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				19:["Leather Boots","Leather Shirt","Cure Simple Pelts","Gather Simple Pelts","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
				20:[],
			},
		},
		Tailoring: {
			name: "Tailoring",
			assetRank: {
				Special: ["Grandmaster Tailor","Mithral Awl","Mithral Shears","Mithral Needle"],
				Gold: ["Master Tailor","Steel Awl","Steel Shears","Steel Needle"],
				Silver: ["Tailer","Iron Awl","Iron Shears","Iron Needle"],
				Bronze: ["Worn Awl","Worn Shears","Worn Needle","Weaver","Outfitter","Assistant Tailer"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [
						"Crafting_Follower_Tailor_Weaver_T1_01"
					],
					task:"Hire an additional Weaver",
					level:2,
					requires: 0,
				},
				{ // Rank 2
					images: [
						"Crafting_Follower_Tailor_Outfitter_T2_01",
					],
					task:"Upgrade Weaver",
					level:7,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Crafting_Follower_Tailor_Tailor_T3_01",
					],
					task:"Upgrade Outfitter",
					level:14,
					requires: 4,
				}
			],
			levels: {
				 0:["Hire your first Weaver"],
				 1:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 2:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 3:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 4:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 5:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 6:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 7:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 8:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				 9:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				10:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				11:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				12:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				13:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				14:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				15:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				16:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				17:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				18:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				19:["Cloth Shirt","Cloth Boots","Weave Wool Cloth","Gather Wool Scraps"],
				20:[],
			},
		},
		Alchemy: {
			name: "Alchemy",
			assetRank: {
				Special: ["Grandmaster Alchemist","Mithral Crucible","Mithral Mortar","Mithral Philosopher's Stone"],
				Gold: ["Master Alchemist","Steel Crucible","Steel Mortar","Steel Philosopher's Stone"],
				Silver: ["Alchemist","Iron Crucible","Iron Mortar","Iron Philosopher's Stone"],
				Bronze: ["Worn Crucible","Worn Mortar","Worn Philosopher's Stone","Apothecary","Mixologist","Assistant Alchemist"],
			},
			upgradeInfo: [
				{ // Rank 1
					images: [
						"Crafting_Follower_Alchemy_Alchemist_T1_01"
					],
					task:"Hire an additional Apothecary",
					level:2,
					requires: 0,
				},
				{ // Rank 2
					images: [
						"Crafting_Follower_Alchemy_Alchemist_T2_01",
					],
					task:"Upgrade Apothecary",
					level:6,
					requires: 4,
				},
				{ // Rank 3
					 images: [
						"Crafting_Follower_Alchemy_Alchemist_T3_01",
					],
					task:"Upgrade Mixologist",
					level:13,
					requires: 4,
				}
			],
			levels: {
				 0:["Hire your first Apothecary"],
				 1:["Alchemical Research","Rank 1 Experimentation","Simple Vitriol Extraction","Gather Simple Components"],
				 2:["Alchemical Research","Rank 2 Experimentation","Simple Vitriol Extraction","Gather Simple Components"],
				 3:["Alchemical Research","Rank 3 Experimentation","Simple Vitriol Extraction","Gather Simple Components"],
				 4:["Alchemical Research","Rank 4 Experimentation","Aqua Vitae","Simple Vitriol Extraction","Gather Simple Components"],
				 4:["Alchemical Research","Rank 4 Experimentation","Minor Rejuvenation Potion","Simple Vitriol Extraction","Gather Simple Components"],
				 4:["Alchemical Research","Rank 4 Experimentation","Minor Potion of Force","Simple Vitriol Extraction","Gather Simple Components"],
				 4:["Alchemical Research","Rank 4 Experimentation","Minor Fortification Potion","Simple Vitriol Extraction","Gather Simple Components"],
				 5:["Alchemical Research","Rank 5 Experimentation","Aqua Vitae","Simple Vitriol Extraction","Gather Simple Components"],
				 5:["Alchemical Research","Rank 5 Experimentation","Potion of Minor Healing","Simple Vitriol Extraction","Gather Simple Components"],
				 5:["Alchemical Research","Rank 5 Experimentation","Minor Tidespan Potion","Simple Vitriol Extraction","Gather Simple Components"],
				 6:["Alchemical Research","Rank 6 Experimentation","Aqua Vitae","Simple Vitriol Extraction","Gather Simple Components"],
				 6:["Alchemical Research","Rank 6 Experimentation","Minor Accuracy Potion","Simple Vitriol Extraction","Gather Simple Components"],
				 6:["Alchemical Research","Rank 6 Experimentation","Minor Reflexes Potion","Simple Vitriol Extraction","Gather Simple Components"],
				 7:["Alchemical Research","Rank 7 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				 7:["Alchemical Research","Rank 7 Experimentation","Lesser Rejuvenation Potion","Advanced Vitriol Extraction","Gather Advanced Components"],
				 7:["Alchemical Research","Rank 7 Experimentation","Lesser Force Potion","Advanced Vitriol Extraction","Gather Advanced Components"],
				 7:["Alchemical Research","Rank 7 Experimentation","Lesser Fortification Potion","Advanced Vitriol Extraction","Gather Advanced Components"],
				 8:["Transmutation Research","Rank 8 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				 9:["Alchemical Research","Rank 9 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				10:["Transmutation Research","Rank 10 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				11:["Alchemical Research","Rank 11 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				12:["Alchemical Research","Rank 12 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				13:["Alchemical Research","Rank 13 Experimentation","Aqua Vitae","Advanced Vitriol Extraction","Gather Advanced Components"],
				14:["Alchemical Research","Rank 14 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				15:["Alchemical Research","Rank 15 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				16:["Alchemical Research","Rank 16 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				17:["Alchemical Research","Rank 17 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				18:["Alchemical Research","Rank 18 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				19:["Alchemical Research","Rank 19 Experimentation","Aqua Regia","Complex Vitriol Extraction","Gather Complex Components"],
				20:["Rank 20 Experimentation"],
			},
		},
	};

	// Load Settings
	var settingnames = [
		{name: 'paused',       title: 'Pause Timer',                    def: false,        type:'checkbox', tooltip:'Disble All Automation',},
		{name: 'debug',        title: 'Enable Debug',                   def: false,        type:'checkbox', tooltip:'Enable all debug output to console', onsave: function(newValue, oldValue) {console=newValue?unsafeWindow.console||fouxConsole:fouxConsole;}},
		{name: 'autoreload',   title: 'Auto Reload',                    def: false,        type:'checkbox', tooltop:'Enabling this will reload the gateway every two hours',},
		{name: 'autologin',    title: 'Attempt to login automatically', def: false,        type:'checkbox', tooltip:'Automatically attempt to login to the neverwinter gateway site',},
		{name: 'nw_username',  title: ' Neverwinter Username',          def: '',           type:'text',     tooltip:''},
		{name: 'nw_password',  title: ' Neverwinter Password',          def: '',           type:'password', tooltip:''},
		{name: 'nw_charname',  title: ' Neverwinter Character',         def: '',           type:'text',     tooltip:''},
		{name: 'tasktype',     title: 'Task Type',                      def: 'Leadership', type:'select',   tooltip:'Select the profession for which to automate task selection', opts: [
			{name:'Leadership',    path:'Leadership'},
			{name:'Platesmithing', path:'Armorsmithing_Heavy'},
			{name:'Mailsmithing',  path:'Armorsmithing_Med'},
			{name:'Leatherworking',path:'Leatherworking'},
			{name:'Tailoring',     path:'Tailoring'},
			{name:'Alchemy',       path:'Alchemy'},
		]},
		{name: 'text_1',       title:'Optional Slot Asset Qualities',                      type:'label',},
		{name: 'opt_special',  title: ' Very Rare',                     def:true,          type:'checkbox', tooltip:'Purple'},
		{name: 'opt_gold',     title: ' Rare',                          def:true,          type:'checkbox', tooltip:'Blue'},
		{name: 'opt_silver',   title: ' Uncommon',                      def:true,          type:'checkbox', tooltip:'Green'},
		{name: 'opt_bronze',   title: ' Common',                        def:true,          type:'checkbox', tooltip:'White'},
		{name: 'trainingMode', title: 'Training Mode *BETA*',           def:false,         type:'checkbox', tooltip:'Enable training/upgrading of new assets until enough of the currently highest available rank are available for each unlocked task slot. Creates more rank 1 assets for Leadership if necessary for optional asset slots. See code or script page for details.',},
	];
	// Load local settings cache (unsecured)
	var settings = {};
	for (var i = 0; i < settingnames.length; i++) {
		// Ignore label types
		if(settingnames[i].type === 'label') {
			continue;
		}
		settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
		// call the onsave for the setting if it exists
		if(typeof(settingnames[i].onsave) === "function") {
			console.log("Calling 'onsave' for", settingnames[i].name);
			settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
		}
	}

	// Page Settings
	var PAGES = Object.freeze({
		LOGIN : { name: "Login", path: "div#login"},
		GUARD : { name: "Account Guard", path: "div#page-accountguard"},
		CHARSELECT : { name: "Character Select", path: "div.page-characterselect"},
		FRONTPAGE : { name: "Front Page", path: "div.page-front"},
		PROFESSIONS : { name: "Professions", path: "div.page-professions"},
	});

	/**
	 * Uses the page settings to determine which page is currently displayed
	 */
	function GetCurrentPage() {
		for each(var page in PAGES) {
			if($(page["path"]).filter(":visible").length) {
				return page;
			}
		}
	}

	function page_DEFAULT() {
		dfdNextRun.resolve(false);
	}
	function page_LOGIN() {
		if(!$("form > p.error:visible").length && settings["autologin"]) {
			// No previous log in error - attempt to log in
			console.log("Setting username");
			$("input#user").val(settings["nw_username"]);
			console.log("Setting password");
			$("input#pass").val(settings["nw_password"]);
			console.log("Clicking Login Button");
			$("div#login > input").click();
		}
		dfdNextRun.resolve(false);
	}
	function page_GUARD() {
		// Do nothing on the guard screen
		dfdNextRun.resolve(false);
	}
	function page_CHARSELECT() {
		// Select the character if it is set
		var charname = settings["nw_charname"];
		if(charname.length) {
			$(".char-list-name:contains('"+settings["nw_charname"]+"')").click()
		}
		dfdNextRun.resolve(false);
	}
	function page_FRONTPAGE() {
		// Click the professions tab
		$("a.professions").click();
		dfdNextRun.resolve(false);
	}
	function page_PROFESSIONS() {
		// Switch to overview
		$("a.professions-overview").click();
		WaitForState("").done(function() {
			// List the buttons on the overview
			var completedSlotButtons = $("div.panel-content button").filter(":contains('Collect Result')").filter(":visible");
			var openSlotButtons = $("div.panel-content button").filter(":contains('Choose Task')").filter(":visible");

			// See if there are any completed tasks on the overview
			if(completedSlotButtons.length) {
				completedSlotButtons[0].click();
				WaitForState("div.professions-rewards-modal button:contains('Collect Result')").done(function() {
					$("div.professions-rewards-modal button:contains('Collect Result')").click();
					WaitForState("").done(function() {
						dfdNextRun.resolve(true);
					});
				});
			}
			else {
				// See if there are any open tasks on the overview
				if(openSlotButtons.length) {
					// Get training info
					var trainingInfo = GetTrainingInfo();

					// Create a list of tasks for training new assets
					var trainingList = [];
					var upgradeInfo = tasklist[settings["tasktype"]].upgradeInfo;
					// This is the difficult part, we have the list of assets at each rank and whether they are avilable or not
					// Now we have to determine if we should create more assets or if we should wait until the ones in use become available for upgrading
					// We also want to make sure we don't waste time by creating too many assets (we're going to create a few extra or leave some slots empty more than likely)
					// Primarily, we want to have one max rank asset for each unlocked slot(and one additional rank 1 asset if doing leadership)
					// If it was determined that we need more high rank assets, we could cancel tasks for all the assets currently in use (that aren't creating more assets)
					//	This way we would have all assets available for upgrading right away
					// For now, we just leave slots empty until enough assets become free to do the upgrade (if there are enough in use or being created)
					// TODO: While in training mode, we should be able to use the highest rank assets as they are not required for an upgrade

					// TODO: Convert to a loop
					var trainingNeeded = false;
					var nextRankNeeded = trainingInfo.slotCount;
					// Check if we need rank 3 assets created
					if(trainingInfo.canMakeAsset[2] && trainingInfo.assetAvailableCounts[2] + trainingInfo.assetCreatingCounts[2] + trainingInfo.assetInUseCounts[2] < nextRankNeeded) {
						// Schedule a rank 3 upgrade
						if(trainingInfo.assetAvailableCounts[1] >= upgradeInfo[2].requires)
							trainingList.push(upgradeInfo[2].task);
						// Remove as many rank 2 assets needed to create enough rank 3
						trainingInfo.assetAvailableCounts[1] -= upgradeInfo[2].requires * (nextRankNeeded - (trainingInfo.assetAvailableCounts[2] + trainingInfo.assetCreatingCounts[2] + trainingInfo.assetInUseCounts[2]));

						nextRankNeeded = 0;
						trainingNeeded = true;
					}
					else {
						nextRankNeeded = nextRankNeeded - (trainingInfo.assetAvailableCounts[2] + trainingInfo.assetCreatingCounts[2] + trainingInfo.assetInUseCounts[2]);
					}
					// See if we need more rank 2 assets created
					if(trainingInfo.canMakeAsset[1] && trainingInfo.assetAvailableCounts[1] + trainingInfo.assetCreatingCounts[1] + trainingInfo.assetInUseCounts[1] < nextRankNeeded) {
						// Schedule a rank 2 upgrade if we have enough lower rank assets available
						if(trainingInfo.assetAvailableCounts[0] >= upgradeInfo[1].requires)
							trainingList.push(upgradeInfo[1].task);
						// Remove as many rank 1 assets needed to create enough rank 2
						trainingInfo.assetAvailableCounts[0] -= upgradeInfo[1].requires * (nextRankNeeded - (trainingInfo.assetAvailableCounts[1] + trainingInfo.assetCreatingCounts[1] + trainingInfo.assetInUseCounts[1]));

						nextRankNeeded = 0;
						trainingNeeded = true;
					}
					else {
						nextRankNeeded = nextRankNeeded - (trainingInfo.assetAvailableCounts[1] + trainingInfo.assetCreatingCounts[1] + trainingInfo.assetInUseCounts[1]);
					}
					// See if we need more rank 1 assets created
					if(trainingInfo.canMakeAsset[0] && (trainingInfo.assetAvailableCounts[0] + trainingInfo.assetCreatingCounts[0] + trainingInfo.assetInUseCounts[0] < (nextRankNeeded + (settings["tasktype"]==="Leadership"?trainingInfo.slotCount:0)))) {
						// Schedule a rank 1 hiring
						trainingList.push(upgradeInfo[0].task);
						trainingNeeded = true;
					}

					console.log(trainingList,trainingInfo);

					// Load the task information
					var level = parseInt($("a.professions-"+settings["tasktype"]).closest("span").prevAll("div:first").find("span").text());
					var tasktype = settings["tasktype"];
					var list = $.merge([], tasklist[tasktype].levels[level]); // Make a copy because merge alters the original

					// If we are in training mode, prepend the training list
					if(settings["trainingMode"] && trainingNeeded) {
						// If we want to leave the extra slots unused, we just need to replace the original list with the training list
						// This will upgrade/hire enough assets so that the in-use assets can be upgraded once they become available again
						list = trainingList;
						// Otherwise we can prepend the training list, currently this would cause training to fail because
						// it is likely that an asset would be in use at all times, which would cause most (if not all) upgrades to delay inevitably
						//$.merge(trainingList, list);
						//list = trainingList; // list was merged into trainingList, and we want to use 'list' later on, so switch the variable
					}
					// At this point the 'list' variable should contain either the original list with the training list appended or just the training list depending on mode
					//console.log("List",list);

					if(!list.length) {
						// This can happen if we are in training mode and we can't train any new assets right now
						// or if nothing is configured for this level
						// We don't want to spam the server, so just wait until later
						//console.log("No tasks in list. Waiting.");
						dfdNextRun.resolve(false);
						return;
					}

					openSlotButtons[0].click();
					WaitForState("div#content_professions:visible").done(function() {
						// Switch to correct type
						$("a.professions-" + settings["tasktype"]).click();
						WaitForState("").done(function() {
							console.log(tasktype + " is level " + level);
							createNextTask(list, tasktype, level, 0, dfdNextRun);
						});
					});
				}
				else {
					dfdNextRun.resolve(false);
				}
			}
		});
	}

	/**
	 * Gets information needed to determine what assets we can or need to create
	 * Return {Object}:
	 * 		assetAvailableCounts: {Array(int)} The number of assets at each rank that are available for a task
	 * 		assetInUseCounts:     {Array(int)} The number of assets at each rank that are currently in use
	 * 		assetCreatingCounts:  {Array(int)} The number of assets at each rank that are currently being hired/upgraded
	 * 		canMakeAsset:         {Array(bool)} For each rank, denotes if the current profession level is high enough to start the hire/upgrade task
	 * 		level:                {int} The level of the currently selected profession type
	 * 		slotCount:            {int} The total number of unlocked profession slots
	 */
	function GetTrainingInfo() {
		// Determine how many slots we have
		var slotCount = $(".professions-slots").find("div.task-slot-open, div.task-slot-progress, div.task-slot-finished").length;
		// Determine the current level
		var currentLevel = parseInt($("a.professions-"+settings["tasktype"]).closest("span").prevAll("div:first").find("span").text());

		// Create some local variables
		var task = tasklist[settings["tasktype"]];
		var upgradeInfo = task.upgradeInfo;

		var assetAvailableCounts = new Array(upgradeInfo.length);
		var assetInUseCounts = new Array(upgradeInfo.length);
		var assetCreatingCounts = new Array(upgradeInfo.length);

		var canMakeAsset = new Array(upgradeInfo.length);
		var path1 = task.imagePath;
		
		// See which tasks we meet the level requirement for
		for(var i=upgradeInfo.length-1;i>=0;--i) {
			canMakeAsset[i] = currentLevel >= upgradeInfo[i].level;
		}
		// List the assets we currently have available
		var allAvailableIcons = $("div.professions-assets div.available img");
		for(var i=upgradeInfo.length-1;i>=0;--i) {
			var imageSearchString = ("img[src*='" + upgradeInfo[i].images.join("'],img[src*='") + "']");
			var icons = allAvailableIcons.filter(imageSearchString);
			var count = 0;
			for(var j=0;j<icons.length;j++) {
				var quantitySpan = $(icons[j]).nextAll(".quantity");
				if(quantitySpan.length) {
					count+=parseInt($(quantitySpan).text());
				}
				else { // Only 1
					count+=1;
				}
			}
			assetAvailableCounts[i] = count;
		}
		// List the assets we currently have in use
		var allInUseIcons = $("div.professions-assets div.in-use img");
		for(var i=upgradeInfo.length-1;i>=0;--i) {
			var imageSearchString = ("img[src*='" + upgradeInfo[i].images.join("'],img[src*='") + "']");
			var icons = allInUseIcons.filter(imageSearchString);
			var count = 0;
			for(var j=0;j<icons.length;j++) {
				var quantitySpan = $(icons[j]).nextAll(".quantity");
				if(quantitySpan.length) {
					count+=parseInt($(quantitySpan).text());
				}
				else { // Only 1
					count+=1;
				}
			}
			assetInUseCounts[i] = count;
		}
		// List the assets we are creating
		for(var i=upgradeInfo.length-1;i>=0;--i) {
			var icons = $("ul.professions-slots h4:contains('" + upgradeInfo[i].task + "')");
			var count = 0;
			for(var j=0;j<icons.length;j++) {
				var quantitySpan = $(icons[j]).nextAll(".quantity");
				if(quantitySpan.length) {
					count+=parseInt($(quantitySpan).text());
				}
				else { // Only 1
					count+=1;
				}
			}
			assetCreatingCounts[i] = count;
		}

		//console.log("assetAvailableCounts",assetAvailableCounts[0],assetAvailableCounts[1],assetAvailableCounts[2]);
		//console.log("assetInUseCounts",assetInUseCounts[0],assetInUseCounts[1],assetInUseCounts[2]);
		//console.log("assetCreatingCounts",assetCreatingCounts[0],assetCreatingCounts[1],assetCreatingCounts[2]);
		return {
				assetAvailableCounts: assetAvailableCounts,
				assetInUseCounts: assetInUseCounts,
				assetCreatingCounts:assetCreatingCounts,
				canMakeAsset: canMakeAsset,
				level: currentLevel,
				slotCount:slotCount,
		};
	}
	/**
	 * Attempts to start the given task.
	 * Resolves the deferred object with true if able or false if not
	 *
	 * @param {string} tasktype The type of the task
	 * @param {string} taskname The name of the task to attempt to start.
	 * @param {Deferred} dff The deffered object to resolve when finished: true when able, false if not 
	 */
	function createTask(tasktype, taskName, dff) {
		var task = SearchForTaskByName(taskName);
		if(task) {
			console.log('Task Found');
			task.click();
			WaitForState("div.page-professions-taskdetails").done(function() {
				// Click all buttons and select an item to use in the slot
				var def = $.Deferred();
				var buttonList = $("div.taskdetails-assets-block .Junk button");
				if(buttonList.length) {
					SelectItemFor(tasktype, buttonList, 0, def);
				}
				else {
					def.resolve();
				}
				def.done(function() {
					// All items are populated
					console.log("Items Populated");
					// Click the Start Task Button
					//Get the start task button if it is enabled
					var enabledButton = $("div.footer-body > div.input-field.button:not('.disabled') > button:contains('Start Task')");
					if(enabledButton.length) {
						console.log("Clicking Start Task Button");
						enabledButton.click();
						WaitForState("").done(function() {
							// Done
							dff.resolve(true);
						});
					}
					else { // Button not enabled, something required was probably missing
						// Go back
						$("div.footer-body > div.input-field.button > button:contains('Back')").click();
						WaitForState("").done(function() {
							// continue with the next one
							console.log(taskName, '- Task not enabled');
							dff.resolve(false);
						});
					}
				});
			});
		}
		else {
			dff.resolve(false);
		}
	}

	/**
	 * Iterative approach to finding the next task to assign to an open slot.
	 *
	 * @param {Array} list The list of task names to try in order of precedence
	 * @param {int} i The current attempt number. Will try to find the i'th task.
	 * @param {Deferred} dff The deffered object to resolve when a task is found or if all tasks were not found
	 */
	function createNextTask(list, tasktype, level, i, dff) {
		console.log("createNextTask", list.length, i);
		if(list.length <=i) {
			console.log("Nothing Found");
			dff.resolve(false);
			return;
		}
		var dff2 = $.Deferred();
		dff2.done(function(created) {
			if(created) {
				dff.resolve(true);
			}
			else {
				createNextTask(list, tasktype, level, i+1, dff);
			}
		});
		createTask(tasktype, list[i], dff2);
	}
	/**
	 * Selects the highest level asset for the i'th button in the list. Uses an iterative approach
	 * in order to apply a sufficient delay after the asset is assigned
	 *
	 * @param {Array} The list of buttons to use to click and assign assets for
	 * @param {int} i The current iteration number. Will select assets for the i'th button
	 * @param {Deferred} jQuery Deferred object to resolve when all of the assets have been assigned
	 */
	function SelectItemFor(tasktype, buttonListIn, i, def) {
		buttonListIn[i].click();
		WaitForState("").done(function() {
			var specialItems = $("div.modal-item-list a.Special");
			var goldItems = $("div.modal-item-list a.Gold");
			var silverItems = $("div.modal-item-list a.Silver");
			var bronzeItems = $("div.modal-item-list a.Bronze");

			// Click the highest slot
			if(specialItems.length && settings["opt_special"]) {
				FilterAssetList(specialItems, tasklist[tasktype].assetRank.Special).click();
			}
			else if(goldItems.length && settings["opt_gold"]) {
				FilterAssetList(goldItems, tasklist[tasktype].assetRank.Gold).click();
			}
			else if(silverItems.length && settings["opt_silver"]) {
				FilterAssetList(silverItems, tasklist[tasktype].assetRank.Silver).click();
			}
			else if(bronzeItems.length && settings["opt_bronze"]) {
				FilterAssetList(bronzeItems, tasklist[tasktype].assetRank.Bronze).click();
			}
			else { $("span.clear-item-slot a").click(); }

			console.log("Clicked item");
			WaitForState("").done(function() {
				// Get the new set of select buttons created since the other ones are removed when the asset loads
				var buttonList = $("div.taskdetails-assets-block .Junk button");
				if(i < buttonList.length - 1) {
					SelectItemFor(tasktype,buttonList, i+1, def);
				}
				else {
					// Let main loop continue
					def.resolve();
				}
			});
		});
	}
	/**
	 * Returns the first asset that matches in the rankList
	 * 
	 * @param {Array} assetList The list of assets available to filter
	 * @param {Array} rankList The rank of the available assets in ascending order
	 */
	function FilterAssetList(assetList,rankList) {
		for(var i=0;i<rankList.length;i++) {
			var asset = $(assetList).filter(":contains('"+rankList[i]+"')");
			if(asset.length > 0) {
				return asset[0];
			}
		}
		// Fallback to the first asset
		return assetList[0];
	}
	
	/**
	 * Given a task name and that the search pane is active, will attempt to search for the given task
	 * and return the button element if the level and resource criteria are met.
	 *
	 * @param {String} taskname The name of the task to search within the search pane for
	 */
	function SearchForTaskByName(taskname) {
		// Filter the results
		var filterDiv = $("div#tasklist_filter input");
		console.log("Searching for:", taskname);
		filterDiv.val(taskname);
		filterDiv.keyup();

		// Find the result
		var taskTitle = $("table#tasklist tr h4 span").filter(function() {
			return $(this).text() === taskname;
		});

		if(taskTitle.length) {
			for (var i = 0; i < taskTitle.length; i++) {
				if($(taskTitle[i]).closest("div.higherlevel").length) {
					// Too high level
					console.log(taskname, "- Level is too high.");
				}
				else if($(taskTitle[i]).closest("div.unmet").length) {
					// Not enough resources
					console.log(taskname, "- Not enough resources");
				}
				else {
					return $(taskTitle[i]).closest("tr").find("button");
				}
			}
		}
		return false;
	}
	
	/**
	 * Waits for the loading symbol to be hidden.
	 *
	 * @return {Deferred} A jQuery defferred object that will be resolved when loading is complete
	 */
	function WaitForLoad() {
		return WaitForState("");
	}
	/**
	 * Creates a deferred object that will be resolved when the state is reached
	 *
	 * @param {string} query The query for the state to wait for
	 * @return {Deferred} A jQuery defferred object that will be resolved when the state is reached
	 */
	function WaitForState(query) {
		var dfd = $.Deferred();
		window.setTimeout(function() {AttemptResolve(query, dfd);}, 1000); // Doesn't work without a short delay
		return dfd;
	}
	/**
	 * Will continually test for the given query state and resolve the given deferred object when the state is reached
	 * and the loading symbol is not visible
	 *
	 * @param {string} query The query for the state to wait for
	 * @param {Deferred} dfd The jQuery defferred object that will be resolved when the state is reached
	 */
	function AttemptResolve(query, dfd) {
		if((query === "" || $(query).length) && $("div.loading-image:visible").length == 0) {
			dfd.resolve();
		}
		else {
			window.setTimeout(function() {AttemptResolve(query, dfd);}, 1000); // Try again in a little bit
		}
	}

	/**
	 * The main process loop:
	 * - Determine which page we are on and call the page specific logic
	 * - When processing is complete, process again later
	 *   - Use a short timer when something changed last time through
	 *   - Use a longer timer when waiting for tasks to complete
	 */
	function process() {
		// Make sure the settings button exists
		addSettings();

		// Check if timer is paused
		if(settings["paused"]) {
			// Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
			var timerHandle = window.setTimeout(function() {process();}, delay);
			return;
		}
		// check for errors
		if($("title").text() == "Error" && settings["autologin"]) {
			console.log("Error detected - relogging");
			unsafeWindow.location.href = "http://gateway.playneverwinter.com";
			return;
		}
		// Check if a reload is needed
		if(reloadNeeded && settings["autologin"] && settings["autoreload"]) {
			console.log("Reloading Gateway");
			unsafeWindow.location.href = "http://gateway.playneverwinter.com";
			return;
		}
		// Check for Gateway down
		if(window.location.href.indexOf("gatewaysitedown") > -1) {
			// Do a long delay and then retry the site
			console.log("Gateway down detected - relogging in " + (longDelay/1000) + " seconds");
			window.setTimeout(function() {unsafeWindow.location.href = "http://gateway.playneverwinter.com";}, longDelay);
			return;
		}

		// Determine which page is displaying
		var currentPage = GetCurrentPage();
		     if(currentPage == PAGES.LOGIN)       { page_LOGIN();       }
		else if(currentPage == PAGES.GUARD)       { page_GUARD();       }
		else if(currentPage == PAGES.CHARSELECT)  { page_CHARSELECT();  }
		else if(currentPage == PAGES.FRONTPAGE)   { page_FRONTPAGE();   }
		else if(currentPage == PAGES.PROFESSIONS) { page_PROFESSIONS(); }
		else                                      { page_DEFAULT();     }

		// Continue again later
		dfdNextRun.done(function(useShortDelay) {
			dfdNextRun = $.Deferred();
			var timerHandle = window.setTimeout(function() {process();}, useShortDelay===true?delayShort:delay);
			var reloadTimerHandle = window.setTimeout(function() { reloadNeeded = true; }, reloadDelay);
		});
	}

	function addSettings() {
		if($("#settingsButton").length)
			return;
		// Add the required CSS
		AddCss("\
			#settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
			#settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; right: 0px; top: 0px; width: 350px; font: 12px sans-serif; text-align: left; display: block; z-index: 1000;}\
			#settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
			#settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
			#settingsPanel label.purple {font-weight:bold;color:#7C37F6}\
			#settingsPanel label.blue {font-weight:bold;color:#007EFF}\
			#settingsPanel label.green {font-weight:bold;color:#8AFF00}\
			#settingsPanel label.white {font-weight:bold;color:#FFFFFF}\
		");

		// Add settings panel to page body
		$("body").append(
			'<div id="settingsPanel">\
				<div id="settings_title">\
					<img src='+image_prefs+' style="float: left; vertical-align: text-bottom;"\>\
					<img id="settings_close" src='+image_close+' title="Click to hide preferences" style="float: right; vertical-align: text-bottom; cursor: pointer; display: block;"\>\
					<span style="margin:3px">Settings</span>\
				</div>\
				<form style="margin: 0px; padding: 0px">\
					<ul style="list-style: none outside none; max-height: 310px; overflow: auto; margin: 3px; padding: 0px;">\
					</ul>\
				</form>\
			</div>'
		);

		// Add each setting input
		var settingsList = $("#settingsPanel form ul");
		for (var i=0;i<settingnames.length;i++) {
			var id = 'settings_' + settingnames[i].name;
			var indent = countLeadingSpaces(settingnames[i].title) * 2;
			switch(settingnames[i].type) {
				case "checkbox":
					settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><input style="margin:4px" name="'+id+'" id="'+id+'" type="checkbox" /><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>')
					$('#'+id).prop('checked', settings[settingnames[i].name]);
					break;
				case "text":
					settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>')
					$('#'+id).val(settings[settingnames[i].name]);
					break;
				case "password":
					settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="password" /></li>')
					$('#'+id).val(settings[settingnames[i].name]);
					break;
				case "select":
					settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" style="padding-left:4px" for="'+id+'">'+settingnames[i].title+'</label><select style="margin:4px" name="'+id+'" id="'+id+'" /></li>')
					var options = settingnames[i].opts;
					var select = $('#'+id);
					for(var j=0;j<options.length;j++) {
						if(settings[settingnames[i].name] == options[j].path)
							select.append('<option value="'+options[j].path+'" selected="selected">'+options[j].name+'</option>');
						else 
							select.append('<option value="'+options[j].path+'">'+options[j].name+'</option>');
					}
					break;
				case "label":
					settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em;><label class="'+settingnames[i].class+'">'+settingnames[i].title+'</label></li>')
					break;
			}
		}
		// Add save/cancel buttons to panel
		$("#settingsPanel form").append('\
			<div id="settingsPanelButtonContainer">\
				<input id="settings_save" type="button" value="Save and Apply">\
				<input id="settings_close" type="button" value="Close">\
			</div>');

		// Add open settings button to page
		$("body").append('<div id="settingsButton"><img src="'+image_prefs+'" title="Click to show preferences" style="cursor: pointer; display: block;"></div>');

		// Add the javascript
		$("#settingsPanel").hide();
		$("#settingsButton").click(function() {
			$("#settingsButton").hide();
			$("#settingsPanel").show();
		});
		$("#settings_close,settings_cancel").click(function() {
			$("#settingsButton").show();
			$("#settingsPanel").hide();
		});

		//Use setTimeout to workaround permission issues when calling GM functions from main window
		$("#settings_save").click(function() { setTimeout(function() { SaveSettings();}, 0)});
	}

	function SaveSettings() {
		// Get each value from the UI
		for (var i=0;i<settingnames.length;i++) {
			var name = settingnames[i].name;
			var el = $('#settings_' + name);
			var value = false;
			switch(settingnames[i].type) {
				case "checkbox":
					value = el.prop("checked");
					break;
				case "text":
					value = el.val();
					break;
				case "password":
					value = el.val();
					break;
				case "select":
					value = el.val();
					break;
				case "label": // Labels don't have values
					continue;
			}
			if(typeof(settingnames[i].onsave) === "function") {
				console.log("Calling 'onsave' for", name);
				settingnames[i].onsave(value, settings[name]);
			}
			settings[name] = value; // Save to local cache
			GM_setValue(name, value); // Save to GM cache
		}
		// Close the panel
		$("#settingsButton").show();
		$("#settingsPanel").hide();
	}

	// Add the settings button and start a process timer
	addSettings();
	timerHandle = window.setTimeout(function() {process();}, delayShort);
})();