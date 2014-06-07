// ==UserScript==
// @name           JHunz's KOL Hippy/Fratboy Counter
// @namespace      hunsley@gmail.com
// @description    Kingdom of Loathing script to count the remaining number of hippies and fratboys on The Battlefield
// @include        *kingdomofloathing.com/*island.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/council.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/questlog.php*
// @include        *kingdomofloathing.com/town_sendgift.php*
// @include        *kingdomofloathing.com/login.php*
// @include        *kingdomofloathing.com/valhalla.php*
// @include        *kingdomofloathing.com/topmenu.php*
// @include        *kingdomofloathing.com/compactmenu.php*
// @include        http://127.0.0.1:60*/*island.php*
// @include        http://127.0.0.1:60*/fight.php*
// @include        http://127.0.0.1:60*/council.php*
// @include        http://127.0.0.1:60*/charpane.php*
// @include        http://127.0.0.1:60*/questlog.php*
// @include        http://127.0.0.1:60*/town_sendgift.php*
// @include        http://127.0.0.1:60*/login.php*
// @include        http://127.0.0.1:60*/valhalla.php*
// @include        http://127.0.0.1:60*/topmenu.php*
// @include        http://127.0.0.1:60*/compactmenu.php*
// ==/UserScript==

//
// Version 1.0	09/04/2007	First public release!
// Version 1.1	09/05/2007	Multi-character support added (thanks neminem!).
//                              	Also, bug fixed that caused the counter to count war hippy cadets and drill sergeants killed before the war starts.
// Version 1.2  09/07/2007	Bugfix - War Hippy Spies in the Orcish Frat House are no longer counted.
// Version 2.0  09/26/2007	Fixed a bug where the script was not properly deactivating upon quest completion.
//					Implemented sidequest completion tracking.  Display of completed sidequests is by image replacement on the main island map.
//					Added one hippy end-of-combat message for 5 sidequests kills that was previously missed
//					Added one frat end-of-combat message for 2 sidequests that was previously missed
//					Updated the sidequest unlocking numbers based on corrected information from the wiki.
//					Implemented the variable killFlag, announcing when a specific user-configured number of kills is reached.
//					Implemented meat tracking during the nuns quest
//					Implemented highlighting of tool-related junkyard combat messages
//					Implemented spoilers for the last tool and location given by Yossarian
// Version 2.1 09/28/2007	Bugfix for onAnIslandMap not being declared
// Version 2.2 09/30/2007	Added support for multiple kill flag breakpoints through the killFlag variable - to use, set to a comma-separated list of numbers
// Version 2.3 10/25/2007	Bug eradication release! Brutus, the toga-clad lout should now be counted.  
//					Fixed compatibility with the navel ring.  
//					Removed a debug message that was left on by accident.  
//					Fixed the nuns counter to not count meat gained that was not from the kill itself (familiar stealing, etc.)  
//					Arena completion tracking should now work properly. 
//					Fixed one expression that was causing a 4-kill frat message to be counted as 2 kills. 
//					Minor new feature: Gremlin attack messages for the wrong gremlin types are now an ugly brown.
// Version 2.4 11/17/2007	Added a feature to import/export data to/from the Quest Log Notes page
//                              	Hopefully finished off any bugs with battlefield bosses not being counted
//					Rearranged some code so that quest completion images will show up immediately
//					Implemented automatic update detection
// Version 2.5 01/01/2008     Fixed a bug that would make a few things not work properly some of the time in compact mode
//                            		Finally tracked down why semirare bosses weren't being counted.  It's all Jick's fault, honest.
//					Nuns now compatible with Can Has Cyborger
// Version 2.6 01/28/2008     Added a feature where the counter will disable itself if the council is visited when the quest is not active.  This will allow you to deactivate the counter if you finished the quest on a different PC.
//					Added a message stating how many turns left are in the current side at the current rate (thanks morgad!).
//					Added a reminder to cash in dimes and nickels when nearing the end of the war.
//					Modified the counter message to show the number killed this turn rather than the previous count.
// Version 2.7 02/25/2008	Arena sidequest tracking should now work properly if you finish the quest in the outfit opposite that in which you started it.
//					Exporting quest data will now work correctly when your quest notes are completely empty.
//					When finishing the quest, a donation button is added to the council page.  I figure a once-per-ascension link won't piss anyone off much and someone who wouldn't have thought to send me a little present might now do so.					
// Version 2.8 03/13/2008	Hotfix to resolve ugliness with the new combat action bar
// Version 3.0 04/23/2008	Massive rewrite of most of the script.  The following is a list of all the things I remember changing:
//						1) Data is now stored in Xenophobe's combat action bar JSON object and dynamically updated as needed.  This means that the script should never again forget data due to no longer relying on preferences.  It also means that the script data is automatically saved and loaded no matter what PC you are at without any extra work.  Export functionality has correspondingly been removed.
//						2) Counts can now be manually updated through a handy form on the quest notes page.
//						3) Some GUI changes to be prettier, and to give more information or more useful information.
//						4) Junkyard quest spoilers now prompt you to visit Yossarian when you have received the appropriate tool.
//						5) When a sidequest opens, it will now tell you which one.
//						6) The script is now far less readable due to the trickery I had to employ to safely use the JSON object without causing possible hideous race conditions.  Sorry :(
// Version 3.1 04/24/2008	Fixed an issue with the script not working at all in compact mode.  Also fixed an issue with manual counter updates.  Also added a few more debugging messages on error conditions.
// Version 3.2 04/25/2008	Fixed an issue with Firefox Beta 3
// Version 3.3 04/29/2008	Tracked down and fixed the issue with characters that have never enabled the action bar.  Warning to other developers: At the present time, the initial Json string provided from a character who has not used the action bars is not a valid JSON string.
//					Also fixed several incompatibilities between Firefox 2 and 3 implementations of javascript security..
// Version 3.4 05/03/2008	Compatibility with anything that saves lots of cookies to the KoL domain, like some of Tard's scripts
// Version 3.5 05/18/2008	Another FF3 compatibility update
// Version 3.6 01/29/2009	Eliminated FF2 support, along with most or all of the problems with the script forgetting data.
//					
// Official topic on the KOL forums: http://forums.kingdomofloathing.com/vb/showthread.php?t=141472
//
const VERSION=3.6;
const RELEASECOMMENT='Script should no longer forget data.  FF2 support dropped.';

CheckForUpdates();

//If this is the login page, reset session variables and return
if (window.location.pathname == "/login.php") {
	GM_setValue('curCharName','UNDEFINED');
	GM_setValue('curOutfit','UNDEFINED');
	GM_setValue('donating','false');
	GM_setValue('phpSessIdString','UNDEFINED');
	return false;
}

SetGetGlobalValue();
ImplementJSON();

var phpSessIdString = GM_getValue('phpSessIdString','UNDEFINED');
if (phpSessIdString == 'UNDEFINED') {
	phpSessIdString = GetPHPSessIdString();
	if(phpSessIdString == '') {
		GM_log("Could not retrieve PHPSESSID.  Exiting");
		return false;
	}
	GM_setValue('phpSessIdString',phpSessIdString);
}

var dataIsNew = 'false';
var consecutiveWriteFailures = 0;

if (window.location.pathname == "/topmenu.php" || window.location.pathname == "/compactmenu.php") {
	LoadButtonCache();

	location.href = 'javascript:void(top.needsJsonWrite = "false")';
	unsafeWindow.top.needsJsonWrite = "false";
	location.href = 'javascript:void(top.writingJson = "false")';
	unsafeWindow.top.writingJson = "false";
	GM_log("Trace point 1, false/false");

	//Dynamically load in the JSON script
	var scriptNode = document.createElement('script');
	scriptNode.setAttribute('type','text/javascript')
	scriptNode.setAttribute('src', 'http://hunsley.googlepages.com/json3.js');
	var existingScriptNode = document.evaluate('//script',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	existingScriptNode.parentNode.appendChild(scriptNode);

	//The rand(75) is so that other scripts of mine setting intervals of the same callback aren't quite synced up
	var tmp = 1000 + rand(75);
	var t = window.setInterval(function() {JsonQueuedWrite(); },tmp); 
	return false;
}

if (window.location.pathname == "/charpane.php") {
	var curOutfitName = document.getElementsByTagName("img")[0].src;
	var fratWarriorOutfitNode = document.evaluate('//center[.="Outfit: Frat Warrior Fatigues"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var warHippyOutfitNode = document.evaluate('//center[.="Outfit: War Hippy Fatigues"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	var curOutfit;
	if (curOutfitName.match("warfratoutfit.*\.gif") || (fratWarriorOutfitNode)) {
		curOutfit = 'frat';
	}
	else if (curOutfitName.match("warhippyoutfit.*\.gif") || (warHippyOutfitNode)) {
		curOutfit = 'hippy';
	}
	else {
		curOutfit = 'neither';
	}
	GM_setValue('curOutfit',curOutfit);
}
else {
	var charName = GM_getValue('curCharName','UNDEFINED');
	var curOutfit = GM_getValue('curOutfit','UNDEFINED');
}

var currentPage,pageAddress,s,textnodes,onAnIslandMap;
var deadHippies = 0; var deadFratboys = 0; var nunsMeat = 0;
var arenaComplete = 'no';  var junkyardComplete = 'no';  var orchardComplete = 'no';  
var lighthouseComplete = 'no';  var nunsComplete = 'no';  var farmComplete = 'no';
var junkyardTool = 'unknown';  var junkyardLocation = 'unknown';
var active = 'no';

var topCacheString = ReadTopCache();
//GM_log("topCacheString: "+topCacheString);

if (topCacheString == 'missing') {
	//If the cached data is fully missing, terminate for now and wait for it to load in.
	//GM_log("buttoncache:\n"+getGlobalValue('top.buttoncache')+"\ntype:\n"+getGlobalType('top.buttoncache'));
	if(getGlobalValue('top.buttoncache')=='' || getGlobalType('top.buttoncache') != 'object') {
		GM_log("Buttoncache not yet loaded, terminating for now...",0);
		return false;
	}
	
	//If the cache is there but BCDATA isn't, this is presumably a first run.  Load in old preferences and such
	GM_log("No battlefield counter data found, creating new/loading preferences",0);

	//Get character name
	var charName = top.frames[1].document.getElementsByTagName("b")[0].textContent;

	deadHippies = parseInt(GM_getValue(charName + '.CurrentHippies',0),10);
	deadFratboys = parseInt(GM_getValue(charName + '.CurrentFratboys',0),10);
	nunsMeat = parseInt(GM_getValue(charName + '.nunsMeat',0),10);
	arenaComplete = GM_getValue(charName + '.arenaComplete','no');
	junkyardComplete = GM_getValue(charName + '.junkyardComplete','no');
	orchardComplete = GM_getValue(charName + '.orchardComplete','no');
	lighthouseComplete = GM_getValue(charName + '.lighthouseComplete','no');
	nunsComplete = GM_getValue(charName + '.nunsComplete','no');
	farmComplete = GM_getValue(charName + '.farmComplete','no');
	junkyardTool = GM_getValue(charName + '.junkyardTool','unknown');
	if (junkyardTool == 'none') {
		junkyardTool = 'unknown';
	}
	junkyardLocation = GM_getValue(charName + '.junkyardLocation','unknown');
	if (junkyardLocation == 'none') {
		junkyardLocation = 'unknown';
	}
	active = GM_getValue(charName + '.active','no');
	if (active == 'false') {
		active = 'no';
	}
	else if (active == 'true') {
		active = 'started';
	}

	//Now generate a new BCDATA string.  This will also happen if the BCDATA string was found but corrupted.
	DataStringToGlobals(BuildDataString());

	//GM_log("Data string after generating new:\n"+BuildDataString());
	//In both cases, immediately write to the top cache  
	//Then proceed with the rest of the script
	dataIsNew = 'true';
	MaybeQueueWrite();
	ScriptBody();
}
else {
	//GM_log("Validating data string");
	if(ValidateDataString(topCacheString)) {
		DataStringToGlobals(topCacheString);
		ScriptBody();
	}
	else {
		GM_log("Invalid battlefield counter data, creating new data");
		DataStringToGlobals(BuildDataString());
		dataIsNew = 'true';
		MaybeQueueWrite();
		ScriptBody();
	}
}

//INDENT EVERYTHING LATER
function ScriptBody() {
//GM_log("SCRIPTBODY: BEGIN");

if (curOutfit == 'UNDEFINED') {
	//GM_log("outfit unknown, terminating");
	return false;
}

//Initialization of base64-encoded images.  Hidden inside a function because the encoding is way ugly.
var replacementImages=GM_getValue('replacementImages','UNDEFINED');
if(replacementImages == 'UNDEFINED') {
	InitImageConfigs();
}

//If this is valhalla, reset all configs
if (window.location.pathname == "/valhalla.php") {
	ResetConfigs();
	active = 'no';
}

//Determine which page we are on
pageAddress=window.location.href;
if(pageAddress.match("council.php")) {
	currentPage='council';
}
else if (pageAddress.match("fight.php")) {
	currentPage='fight';
}
else if (pageAddress.match("island.php$")) {
	currentPage='island';
}
else if (pageAddress.match("bigisland.php.*\?action=junkman")) {
	currentPage='junkyardquest';
}
else if (pageAddress.match("bigisland.php.*\?place=junkyard")) {
	currentPage='junkyardmap';
}
else if (pageAddress.match("bigisland.php.*\?action=stand")) {
	currentPage='orchardquest';
}
else if (pageAddress.match("bigisland.php.*\?place=concert")) {
	currentPage='arenaquest';
}
else if (pageAddress.match("bigisland.php.*\?action=farmer")) {
	currentPage='farmquest';
}
else if (pageAddress.match("bigisland.php.*\?action=pyro")) {
	currentPage='lighthousequest';
}
//nuns purposefully excluded since all important processing is on the fight page
else if (pageAddress.match("questlog.php.*\?which=4")) {
	currentPage='questnotes';
}
else if (pageAddress.match("town_sendgift.php")) {
	currentPage='gifting';
}

//Added so that map images are replaced on the various submaps as well
if (pageAddress.match("bigisland.php.*\?place=") || pageAddress.match("bigisland.php$")) {
	onAnIslandMap = 'true';
}

//Text nodes variable now global since I use it a lot and re-evaluating is silly
var textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

//Council page processing
//If we just received the level 12 quest, reset the counters and set it active
//If we just finished the quest, reset counters and set it inactive
//If the quest is already started, make sure it is set active
if(currentPage=='council') {
	var found12message = 'false';
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
		if(s.match("^Adventurer, we have heard rumors that trouble is brewing on the Mysterious Island of Mystery.")) {
			//received quest
			ResetConfigs();
			active = 'started';
			found12message = 'true';

		}
		else if (s.match("you're now a decorated war hero.")) {
			//finished quest
			ResetConfigs();
			AddDonationLink();
			active = 'complete';
			found12message = 'true';
		}
		else if (s.match("^Hey, have you managed to start the war on the Mysterious Island yet")) {
			//quest active
			active = 'started';
			found12message = 'true';
		}
		else if (s.match("^Excellent work, adventurer! You've finally managed to get those idiots to fight each other.")) {
			//quest active
			active = 'started';
			found12message = 'true';
		}
	}
	if ((found12message == 'false') && (active == 'started')) {
		//No messages relating to the level 12 quest found.  Deactivating quest.
		active = 'complete';
	}
}


//Giftshop page processing, if you clicked the donate button
//Moved this far up in the script because it's one of the few pages that is parsed when active != started
var donating = GM_getValue('donating');
if (currentPage == 'gifting' && donating == 'true') {
	GM_setValue('donating','false');

	var recipient = document.evaluate("//input[@name='towho']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	recipient.setAttribute("value","JHunz");

	outsideMessage = document.evaluate("//textarea[@name='note']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	messageTextNode = document.createTextNode('Thanks for creating and maintaining the Battlefield Counter script.');
	outsideMessage.appendChild(messageTextNode);

	fromWhere = document.evaluate("//select[@name='fromwhere']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	fromWhere.selectedIndex = 1;

	var evt = document.createEvent("HTMLEvents");
   	evt.initEvent("change", true, true);
	fromWhere.dispatchEvent(evt);

}

//Skip the rest if nothing interesting is going to happen
if(active != 'started' && currentPage!='council' && currentPage !='questnotes' && dataIsNew == 'false') {
	//GM_log("Script inactive, returning");
	return false;
}

//Island page processing
//Shows the counter on the mysterious island page when the quest is active
if (currentPage=='island') {
	if(active=='started') {
		var numHippySidequests,numFratSidequests;

		//count unlocked areas
		if (deadHippies >= 458) {
			numHippySidequests = 3;
		}
		else if (deadHippies >= 192) {
			numHippySidequests = 2;
		}
		else if (deadHippies >=64) {
			numHippySidequests = 1;
		}
		else {
			numHippySidequests = 0;
		}

		if (deadFratboys >= 458) {
			numFratSidequests = 3;
		}
		else if (deadFratboys >= 192) {
			numFratSidequests = 2;
		}
		else if (deadFratboys >=64) {
			numFratSidequests = 1;
		}
		else {
			numFratSidequests = 0;
		}

		var hippymessage,fratboymessage;
		hippyMessage = deadHippies + ' hippies killed, ' + (1000 - deadHippies) + ' left.';
		fratboyMessage = deadFratboys + ' fratboys killed, ' + (1000 - deadFratboys) + ' left.';
		hippyMessage += ' (' + numHippySidequests + ' areas unlocked.)';
		fratboyMessage += ' (' + numFratSidequests + ' areas unlocked.)';

		//Create the counter page element
		var newElement = document.createElement('tr');
		newElement.innerHTML = '<tr><td><div style="color: red;font-size: 80%;width: 40%;text-align:center;float:left">' + fratboyMessage + '</div><div style="color: red;font-size: 80%;width: 40%;text-align:center;float:left">' + hippyMessage + '</div><div style="font-size: 9px;font-family:arial;width: 20%;text-align:center;float:right"></div></td></tr>';

		//insert the counter at the top of the page
		AddToTop(newElement,document);
	}
}

//Fight page processing
//Updates and shows the counter after every hippy or fratboy kill
if (currentPage=='fight') {
	//only do all of this nonsense if we're actually in the quest
	if (active == 'started') {
		var side = 'neither', delta = 0, win = 'false', rxs;

		//verify that this is an end-of-combat, and store the fight won text node for later if so
		rxs = '^WINWINWIN$';
		var commentNode;
		commentNodes = document.evaluate("//comment()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i<commentNodes.snapshotLength;i++) {
			if (win == 'false') {
				node = commentNodes.snapshotItem(i);
				s=node.data;
				if(s.match(rxs)) {
					win = 'true';
					commentNode = node;
				}
			}
		}

		//Find and evaluate the monster name
		monname=document.evaluate("//SPAN[@id='monname']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.data;

		//Gremlins are here instead of inside the statement below because both in-combat and end-of-combat stuff is relevant
		if (monname.match("gremlin$")) {
			side = 'gremlins';
		}

		if (win == 'true') {

			//find and evaluate the monster name to make sure this is a relevant kill
			monnamespan = document.evaluate("//SPAN[@id='monname']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			monname=monnamespan.singleNodeValue.data;

			if(monname.match('Bailey') || monname.match('Green Ops Soldier$') || monname.match('Mobile Armored Sweat Lodge$') || (monname.match('War Hippy ') && !monname.match('cadet') && !monname.match('drill sergeant') && !monname.match('Spy$') && !monname.match('spy$')) || monname.match('C.A.R.N.I.V.O.R.E.') || monname.match('Glass of Orange Juice') || monname.match('Neil$') || monname.match('Slow Talkin') || monname.match('Zim Merman')) {
				side = 'hippies';
				delta = 1;
			}
			else if (monname.match('Beer Bongadier$') || monname.match('Heavy Kegtank$') || monname.match('Sorority Nurse$') || monname.match('Panty Raider Frat Boy$') || monname.match('Sorority Operator$') || monname.match('War Frat ') || monname.match('Brutus') || monname.match('Danglin') || monname.match('Monty') || monname.match('Next-generation Frat Boy')) {
				side = 'fratboys';
				delta = 1;
			}
			//added the nuns quest here since completion is an end-of-combat message
			else if (monname.match('dirty thieving brigand$')) {
				side = 'nuns';
			}

			if (delta > 0) {

				//now find and process the special end-of-combat messages from sidequests
				//i.e. some truly ugly text-processing

				//get the text nodes
				for (var i=0;i<textnodes.snapshotLength;i++) {
					node = textnodes.snapshotItem(i);
					s=node.data;
					//cut out all the too-short text nodes to prevent unneccessary pattern matching
					if (s.length > 90) {

						if (side == 'hippies') {
							//look for messages indicating extra dead hippies
							if(s.match('M.C. Escher') || s.match('^You see a hippy l') || s.match('^You see a "B') || s.match('violating his deeply held') || s.match('garotting') || s.match('over for a high-five\.') || s.match('^You glance out') || s.match('^You see one of the W') || s.match('by her own ferrets\.') || s.match('bra... yeah\."') || s.match('^As the hippy falls,')) {
								delta = 2;
							}
							else if (s.match('^You see a War F') || s.match('^As you finish') || s.match('incense to burn\.') || s.match('simultaneous paddling\.') || s.match('car, and drive away\.') || s.match('^As you deliver')) {
								delta = 4;
							}
							else if (s.match('^You see one of your B') || s.match('out of their dreadlocks\.') || s.match(', gasping for air\.') || s.match('^You see a Gri')) {
								delta = 8;
							}
							else if (s.match('^A streaking f') || s.match('personal airship') || s.match('POW of the fr') || s.match('guess the outcome\.')) {
								delta = 16;
							}
							else if (s.match('Absolutely nothing!') || s.match('glass sculpture\.') || s.match('one more six-pack\.')) {
								delta = 32;
							}
							else if (s.match('filthy, filthy eyes\.') || s.match('Not the wagons\.') || s.match('and possibly both\.')) {
								delta = 64;
							}
						}


						if (side == 'fratboys') {
							//look for messages indicating extra dead fratboys
							if (s.match('karmic retribution!') || s.match('^You see a Green G') || s.match('^Elsewhere') || s.match('^You see a Grill Sergeant p') || s.match('^You see a Fire Spinner') || s.match('^Nearby, you see o') || s.match('^You see a member of the fr') || s.match('^You glance over your shoulder') || s.match('^You see a hippy shaman') || s.match('^You see a frat boy warrior p') || s.match('^You see an F\.R\.O\.G\.')) {
								delta = 2;
							}
							else if (s.match('^You hear chanting') || s.match('^Nearby, you see an E') || s.match('^You look over and see three') || s.match('^You see a member of the Fo') || s.match('^Over the next hill,') || s.match('^You hear excited ch')) {
								delta = 4;
							}
							else if (s.match('^Nearby, a W') || s.match('^You leap out of the way') || s.match('^A few yards away,') || s.match('^You look over and see o')) {
								delta = 8;
							}
							else if (s.match('^You turn to see') || s.match('^You see a platoon') || s.match('^You look over and see a fu') || s.match('^Nearby, a platoon')) {
								delta = 16;
							}
							else if (s.match('^A mobile sweat lodge r') || s.match('She told me she was 18, bra!') || s.match('^You see a r')) {
								delta = 32;
							}
							else if (s.match('^You see an airborne c') || s.match('^You see a couple of h') || s.match('^You see an elder h')) {
								delta = 64;
							}
						}
					}
				}

				//update and store counter
				var currentCount, prevCount, counterMessage,mode,enemyType;
				if (side == 'hippies') {
					prevCount = deadHippies;
					currentCount = prevCount + delta;
					deadHippies = currentCount;
				}
				else if (side == 'fratboys') {
					prevCount = deadFratboys;
					currentCount = prevCount + delta;
					deadFratboys = currentCount;
				}

				turnsleftMessage = '';
				if (delta >0){
					turnsLeft = Math.ceil((1000 - currentCount) / delta);
					turnsLeftMessage = turnsLeft + ' turns left. ';	
					if (turnsLeft < 4) {
						if (side == 'hippies') {
							turnsLeftMessage = turnsLeftMessage + "Don't forget to cash in your nickels, bra.";
						}
						else {
							turnsLeftMessage = turnsLeftMessage + "Don't forget to cash in your dimes, man.";
						}
					}
				}

				counterMessage = 'You win the fight!';
				counterMessage += ' <b>' + currentCount + '</b> ' + side + ' down, <b>' + (1000 - currentCount) + '</b> left (<b>+' + delta + '</b>). ' + turnsLeftMessage;
				
				//Check for new unlocked areas
				if (currentCount >= 64 && prevCount < 64) {
					if (side == 'hippies') {
						counterMessage += ' <b>Orchard unlocked!</b>';
					}
					else if (side == 'fratboys') {
						counterMessage += ' <b>Lighthouse unlocked!</b>';
					}
				}
				else if (currentCount >= 192 && prevCount < 192) {
					if (side == 'hippies') {
						counterMessage += ' <b>Nuns unlocked!</b>';

					}
					else if (side == 'fratboys') {
						counterMessage += ' <b>Junkyard unlocked!</b>';
					}
				}
				else if (currentCount >= 458 && prevCount < 458) {	
 					if (side == 'hippies') {
						counterMessage += ' <b>Farm unlocked!</b>';
					}
					else if (side == 'fratboys') {
						counterMessage += ' <b>Arena unlocked!</b>';

					}
				}

				//replace the victory text to include the counter
				var newDiv = document.createElement("div");
				newDiv.innerHTML = counterMessage;
				commentNode.parentNode.replaceChild(newDiv,commentNode.previousSibling);
			}
			
			else if (side == 'nuns') {
				//nun sidequest completion detection and meat tracker
		
				//grab text nodes
				var maxMeatIndex = 0;
				for (var i=0;i<textnodes.snapshotLength;i++) {
					node = textnodes.snapshotItem(i);
					s=node.data;

					//look for the quest completion text
					if (s.match("I think this is the last of it")) {
					switch(curOutfit) {
							case 'frat': nunsComplete = 'frat'; break;
							case 'hippy': nunsComplete = 'hippy'; break;

						}
					}
					/*else if ((s.match("^You gain .* Meat.$"))||(s.match("^You gets .* Meets"))) {
						maxMeatIndex = i;
					}*/
				}
				//node = textnodes.snapshotItem(maxMeatIndex);
				//s = node.data
				
				/////////////////////////////////////////////////////////////////
				//nuns fix by Charon the Hand. Original code left commented above
				var nodes = document.querySelectorAll('img[src *= "meat.gif"]')
				//use the last meat gain message, in case of meat stealing familiars
				node = nodes[nodes.length - 1].parentNode.nextSibling
				s = node.textContent;
				/////////////////////////////////////////////////////////////////
		
				//extract the actual meat amount from the string
				var meatAmount = parseInt(s.replace(/[^0-9]/g,""),10);

				//add to counter
				nunsMeat += meatAmount;
				//prettyify the amount with a comma if appropriate
				formattedMeat = "" + nunsMeat;
				if(nunsMeat > 999) {
					formattedMeat = formattedMeat.substr(0,(formattedMeat.length-3)) + ',' + formattedMeat.substr(-3,3);
				}

				//Calculate remaining adventures
				var adventuresRemaining = ((100000 - nunsMeat) / meatAmount);
				adventuresRemaining = adventuresRemaining.toFixed(2);

				//Create new div holding the extra info, and replace the meat gain with it
				var meatMessage = s + '&nbsp;&nbsp;Total: <b>' + formattedMeat + '</b>.  <b>' + adventuresRemaining + '</b> adventures at current rate.'
				var nunsDiv = document.createElement("div");
				nunsDiv.innerHTML = meatMessage;
				node.parentNode.replaceChild(nunsDiv,node);
			}

			else if (side=='gremlins') {
				//grab text nodes
				for (var i=0;i<textnodes.snapshotLength;i++) {
					node = textnodes.snapshotItem(i);
					s=node.data;
					if(s.match(/molybdenum (hammer|pliers|crescent wrench|screwdriver)/i)) {
						//if one of the above strings is found on end-of-combat, it means we grabbed a tool successfully
						junkyardLocation = 'yossarian';
					}
				}
			}
		}

		//fight page processing that's not at the end of combat.  for now, just gremlins
		else if (side == 'gremlins') {
			//Look for any of the tool-related messages
			for (var i=0;i<textnodes.snapshotLength;i++) {
				node = textnodes.snapshotItem(i);
				s=node.data;

				if (s.match(/^It whips out a hammer|^He whips out a crescent wrench|^It whips out a pair of pliers|^It whips out a screwdriver|^It does a bombing run over your head|^He uses the random junk around him to make an automatic eyeball-peeler|^It bites you in the fibula with its mandibles|^It picks a beet off of itself and beats you with it/)) {
					//Create a new div with the text bolded and colored purple, and replace the message
					var newDiv = document.createElement("div");

					if(s.match("^It whips out a hammer")) {
						var contentString = '<div style="color: #DD00FF;float:left"><b>It whips out a hammer</b></div>' + s.replace("It whips out a hammer","&nbsp;");
					} 
					else if (s.match("^He whips out a crescent wrench")) {
						var contentString = '<div style="color: #DD00FF;float:left"><b>He whips out a crescent wrench</b></div>' + s.replace("He whips out a crescent wrench","&nbsp;");
					}
					else if (s.match("^It whips out a pair of pliers")) {
						var contentString = '<div style="color: #DD00FF;float:left"><b>It whips out a pair of pliers</b></div>' + s.replace("It whips out a pair of pliers","&nbsp;");
					}
					else if (s.match("^It whips out a screwdriver")) {
						var contentString = '<div style="color: #DD00FF;float:left"><b>It whips out a screwdriver</b></div>' + s.replace("It whips out a screwdriver","&nbsp;");
					}
					else if(s.match("^It does a bombing run over your head")) {
						var contentString = '<div style="color: #663300;float:left"><b>It does a bombing run over your head</b></div>' + s.replace("It does a bombing run over your head","");
					} 
					else if (s.match("^He uses the random junk around him to make an automatic eyeball-peeler")) {
						var contentString = '<div style="color: #663300;float:left"><b>He uses the random junk around him to make an automatic eyeball-peeler</b></div>' + s.replace("He uses the random junk around him to make an automatic eyeball-peeler","");
					}
					else if (s.match("^It bites you in the fibula with its mandibles")) {
						var contentString = '<div style="color: #663300;float:left"><b>It bites you in the fibula with its mandibles</b></div>' + s.replace("It bites you in the fibula with its mandibles","");
					}
					else if (s.match("^It picks a beet off of itself and beats you with it")) {
						var contentString = '<div style="color: #663300;float:left"><b>It picks a beet off of itself and beats you with it</b></div>' + s.replace("It picks a beet off of itself and beats you with it","");
					}
					else if (s.match("^It picks a radish off of itself and tosses it at you")) {
						var contentString = '<div style="color: #663300;float:left"><b>It picks a radish off of itself and tosses it at you</b></div>' + s.replace("It picks a radish off of itself and tosses it at you","");
					}

					newDiv.innerHTML = contentString;

					node.parentNode.replaceChild(newDiv,node);
				}
			}
		}			
	}
}

//Each of the sections below is searching a single quest giver page for the quest completion text
//to track which sidequests are done for which side.

//Junkyard quest
if (currentPage == 'junkyardquest' && active=='started') {

	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;

		if (s.match("All right")) {
			switch(curOutfit) {
				case 'frat':
					junkyardComplete = 'frat'; break;
				case 'hippy':
					junkyardComplete = 'hippy';break;
			}
		}

		//The following section processes Yossarian's spoiler text about where to find the next tool
		else if (s.match("^\"The last time I saw my ")) {
			//get the spoilered tool
			if (s.match("hammer")) {
				junkyardTool = 'hammer';
			}
			else if (s.match("screwdriver")) {
				junkyardTool = 'screwdriver';
			}
			else if (s.match("pliers")) {
				junkyardTool = 'pliers';
			}
			else if (s.match("wrench")) {
				junkyardTool = 'wrench';
			}

			//get the spoilered location
			if (s.match("[Bb]arrel")) {
				junkyardLocation = 'next to that barrel with something burning in it';
			}
			else if (s.match("[Rr]efrigerator") || s.match("[Ff]ridge")) {
				junkyardLocation = 'near an abandoned refrigerator';
			}
			else if (s.match("[Tt]ires")) {
				junkyardLocation = 'over where the old tires are';
			}
			else if (s.match("[Cc]ar")) {
				junkyardLocation = 'out by that rusted-out car';
			}	
		}
	}
}

//Arena quest
if (currentPage == 'arenaquest' && active=='started') {
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
		if (s.match("If you have any flyers left")) {			
			if(s.match("man")) {
				//	GM_setValue(charName + '.arenaComplete','hippy');
				arenaComplete = 'hippy';
			}
			else if (s.match("bra")) {
				//	GM_setValue(charName + '.arenaComplete','frat');
				arenaComplete = 'frat';
			}
			else {
				alert("This alert should never show up");
			}
		}
	}
}

//Lighthouse quest
if (currentPage == 'lighthousequest' && active=='started') {
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
		if (s.match("my bombs for you")) {
			switch(curOutfit) {
				case 'frat':
					lighthouseComplete = 'frat'; break;
				case 'hippy':
					lighthouseComplete = 'hippy'; break;
			}
		}
	}
}

//Orchard quest
if (currentPage == 'orchardquest' && active=='started') {
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
		if (s.match("The heart of the filthworm queen")) {
			switch(curOutfit) {
				case 'frat':
					orchardComplete = 'frat'; break;
				case 'hippy':
					orchardComplete = 'hippy'; break;
			}
		}
	}
}

//Farm quest
if (currentPage == 'farmquest' && active=='started') {
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
		if (s.match("Ach, the dooks are gone")) {
			switch(curOutfit) {
				case 'frat':
					farmComplete = 'frat'; break;
				case 'hippy':
					farmComplete = 'hippy'; break;
			}
		}
	}
}

//Nuns quest is above in the fight page processing, since quest completion is an end-of-combat message

//	var junkyardComplete = GM_getValue(charName + '.junkyardComplete');
//Add quest spoiler to the junkyard map and yossarian
if ((currentPage == 'junkyardmap' || currentPage == 'junkyardquest' || side == 'gremlins') && active=='started' && junkyardComplete=='no') {
	if((junkyardLocation != 'unknown') && (junkyardTool != 'unknown')) {
		//Create the page element
		var newElement = document.createElement('tr');
		var contentString = '<tr><td><div style="color: red;font-size: 80%;width: 100%;text-align:center">';

		if(junkyardLocation == 'yossarian') {
			//Tell the user to go visit yossarian to get the next stage of the quest
			contentString += "Visit Yossarian to advance the quest.";
		}
		else {
			contentString += "Current tool is the " + junkyardTool + ", located " + junkyardLocation + ".  Enemy: ";

			//spoiler the appropriate gremlin type
			switch(junkyardTool) {
				case 'hammer': contentString += 'batwinged gremlin'; break;
				case 'screwdriver': contentString += 'vegetable gremlin'; break;
				case 'pliers': contentString += 'spider gremlin'; break;
				case 'wrench': contentString += 'erudite gremlin'; break;
			}
		}

		contentString += '</div></td></tr>';

		newElement.innerHTML = contentString;

		//insert the spoiler at the top of the page
		AddToTop(newElement,document);
	}
}

//Implements image replacement on quest completion for the island map and submaps
if (onAnIslandMap == 'true' && active == 'started') {
	//Fetch the array of data URIs for the images
	var replacementImages = (GM_getValue('replacementImages')).split("|");

	//Fetch and iterate through the images on the island map
	var islandImages = document.getElementsByTagName('img');
	var image;
	for (var i=0;i<islandImages.length;i++) {
		image = islandImages[i];
		if (!image) {
			continue;
		}
		//junkyard quest
		if ((junkyardComplete != 'no') && image.src.match('\/bigisland\/2\.gif$')) {
			if (junkyardComplete == 'frat') {
				image.src=replacementImages[0];
			} 
			else if (junkyardComplete == 'hippy') {
				image.src=replacementImages[1];
			}
		}
		//orchard quest
		else if ((orchardComplete != 'no') && image.src.match('\/bigisland\/3\.gif$')) {
			if (orchardComplete == 'frat') {
				image.src=replacementImages[2];
			}
			else if (orchardComplete == 'hippy') {
				image.src=replacementImages[3];
			}
		}
		//arena quest
		else if ((arenaComplete != 'no') && image.src.match('\/bigisland\/6\.gif$')) {
			if (arenaComplete == 'frat') {
				image.src=replacementImages[4];
			}
			else if (arenaComplete == 'hippy') {
				iamge.src=replacementImages[5];
			}
		}
		//farm quest
		else if ((farmComplete != 'no') && image.src.match('\/bigisland\/15\.gif$')) {
			if (farmComplete == 'frat') {
				image.src=replacementImages[6];
			}
			else if (farmComplete == 'hippy') {
				image.src=replacementImages[7];
			}
		}
		//lighthouse quest
		else if ((lighthouseComplete != 'no') && image.src.match('\/bigisland\/17\.gif$')) {
			if (lighthouseComplete == 'frat') {
				image.src=replacementImages[8];
			}
			else if (lighthouseComplete == 'hippy') {
				image.src=replacementImages[9];
			}
		}
		//nuns quest
		else if ((nunsComplete != 'no') && image.src.match('\/bigisland\/19\.gif$')) {
			if (nunsComplete == 'frat') {
				image.src=replacementImages[10];
			}	
			else if (nunsComplete == 'hippy') {
				image.src=replacementImages[11];
			}
		}
	}
}

//Quest log import support (export support removed in 3.0)
//Added in 3.0: Ability to update the counters manually from this page
if (currentPage == 'questnotes') {

	var newElement = document.createElement('center');
	var newElementHTMLString = '';

	if (active == 'started') {
		//Create the element to manually update the counters
		newElementHTMLString = '<table style="border: 1px solid blue; margin-bottom: 4px; font-size:85%" width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=blue style="color:white;text-align:center;">Battlefield Counter: Manually update counts</td></tr><tr><td><center>Dead Hippies:&nbsp;<input type="text" id="hippyText" maxlength="4" size="4" value="'+deadHippies+'">&nbsp;Dead Fratboys:&nbsp;<input type="text" id="fratboyText" maxlength="4" size="4" value="'+deadFratboys+'"/>&nbsp;<input type="button" class="button" id="counterUpdateButton" value="Update Counters"/></td></tr>';
	}

	noteTextNode = document.evaluate("//TEXTAREA[@name='notes']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if(noteTextNode && noteTextNode.textContent && noteTextNode.textContent.match(/%BCDATA%.*%BCDATA%/)) {

		//Create the import page element
		//var newElement = document.createElement('tr');
		if (newElementHTMLString == '') {
			newElementHTMLString += '<table style="border: 1px solid blue; margin-bottom: 4px; font-size:85%" width=95% cellpadding=1 cellspacing=0>';
		}
		newElementHTMLString += '<tr><td bgcolor=blue style="color:white;text-align:center;">' + ((newElementHTMLString.match(/Manually/))?'Import quest data from notes':'Battlefield Counter: Import quest data from notes') +'</td></tr><tr><td style="text-align:center;"><input id="impButton" value="Import quest data from notes" type="button" class="button"/>&nbsp;<input id="remButton" value="Remove old data from notes" type="button" class="button"/></td></tr>';
	}

	if(newElementHTMLString != '') {
		newElementHTMLString += '</table>';

		newElement.innerHTML = newElementHTMLString;

		//insert it at the top of the page
		AddToTop(newElement,document);

		//add event handlers to the various buttons, if they exist, to run the appropriate functions
		button=document.getElementById("impButton");
		if (button) {
			button.addEventListener("click",ImportData,false);	
		}
		button2 = document.getElementById("remButton");
		if (button2) {
			button2.addEventListener("click",RemoveExportedData,false);
		}
		button3 = document.getElementById("counterUpdateButton");
		if (button3) {
			button3.addEventListener("click",ManualCounterUpdate,false);
		}
	}
}

//GM_log("SCRIPTBODY: BEFORE QUEUE");

//Check cached data against current, and queue a write if necessary

MaybeQueueWrite();

//GM_log("SCRIPTBODY: END");
} //END FUNCTION SCRIPTBODY


//This function executes once per second.  
//If new data needs to be written and it is not already writing data, it goes ahead and does that
//If it is already writing data or no new data exists, it does nothing
function JsonQueuedWrite() {
	//GM_log("JsonQueuedWrite, source document:"+window.location.pathname);
	//tmp = getGlobalValue('top.needsJsonWrite'); GM_log("JsonQueuedWrite: top.needsJsonWrite: "+tmp+", type="+typeof(tmp))
	if(getGlobalValue('top.needsJsonWrite')=='true') {
		//tmp = getGlobalValue('top.writingJson'); GM_log("JsonQueuedWrite: top.writingJson: "+tmp+", type="+typeof(tmp));
		if(getGlobalValue('top.writingJson')=='false') {
			location.href = 'javascript:void(top.needsJsonWrite = "false")';
			unsafeWindow.top.needsJsonWrite = "false";
			location.href = 'javascript:void(top.writingJson = "true")';
			unsafeWindow.top.writingJson = "true";
			//GM_log("Trace point 2, false/true");

			//GM_log("Stringify");
			unsafeWindow.top.stringifiedJson = JSON.stringify(getGlobalValue('top.buttoncache'));
			
			var cabObjectString = getGlobalValue('top.stringifiedJson');
			
			url = 'http://' + document.location.host + '/actionbar.php?action=set&bar=' + cabObjectString;
			//GM_log("Sending POST request.\nurl: "+url+"\ncabObjectString: "+cabObjectString);
			GM_xmlhttpRequest({
				method:'POST',
				url:url,
				headers: {'Content-type': 'application/x-www-form-urlencoded',
					    'Cookie': phpSessIdString},
				onload:function(response) {
					location.href = 'javascript:void(top.writingJson = "false")';
					unsafeWindow.top.writingJson = "false";
					//GM_log("Trace point 3, null/false");
					if(response.status != 200) {
						location.href = 'javascript:void(top.needsJsonWrite = "true")';
						unsafeWindow.top.needsJsonWrite = "true";
						//GM_log("Trace point 4, true/null");
						GM_log("Received non-200 status code when attempting to POST data");
						AddWriteFailure();
					}
					else {
						consecutiveWriteFailures = 0;
					}
				},
				onerror:function(response) {
					location.href = 'javascript:void(top.needsJsonWrite = "true")';
					unsafeWindow.top.needsJsonWrite = "true";
					location.href = 'javascript:void(top.writingJson = "false")';
					unsafeWindow.top.writingJson = "false";
					//GM_log("Trace point 5, true/false");
					GM_log("Error when attempting to POST data");
					AddWriteFailure();
				}
			});
		}
		else {
			GM_log("Already writing data.  New write delayed ("+(consecutiveWriteFailures+1)+" consecutive)");
			AddWriteFailure();
		}
	}
	//else: do nothing at this time
}

//Function to call when a write fails or is delayed
function AddWriteFailure() {
	consecutiveWriteFailures++;
	if(consecutiveWriteFailures >= 10) {
		consecutiveWriteFailures = 0;
		GM_log("10 consecutive failed writes.  Reset to not writing");
		
		location.href = 'javascript:void(top.needsJsonWrite = "true")';
		unsafeWindow.top.needsJsonWrite = "true";
		location.href = 'javascript:void(top.writingJson = "false")';
		unsafeWindow.top.writingJson = "false";
		//GM_log("Trace point 6, true/false");
	}
}

//Function to add a donation link button to the page
function AddDonationLink() {
	var newElement = document.createElement('tr');
	newElement.innerHTML = '<tr><td><div style="font-size: 80%;width: 100%;text-align:center">If you find the Battlefield Counter script helpful, please consider donating to the author: <input id="donateButton" value="Donate" type="button"/></div></td></tr>';

	//insert the counter at the top of the page
	AddToTop(newElement,document);

	//Add event handlers to the button
	button=document.getElementById("donateButton");
	button.addEventListener("click",function() {
		GM_setValue('donating','true');
		window.location.href = "town_sendgift.php";
	},false);

}

//Stores the base64-encoded images in a preference
function InitImageConfigs() {
	//The island map replacement images are encoded as base64 data URIs
	var replacementImages = "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf1BQf5hYf5xcf6Bgf6QkP6goP7AwP%2FQ0P%2Ff3%2F%2Fv7%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAACwAAAAAZABkAAAF%2F6Ajjs7jUBfXrSunWZApPvL4TNa1qZy6apgJhEQsGo%2FI5PFBsWQ6wIhkKsFkehmLpbLNaTg7cAZDkU6kkaFyzW4bIZbvJqguSiqZjEaj72MsE0Jug4SFEXFzFBNuNIWOj4UaGxsWEjWQmI43EpkjWZedoWwQFxguGJyiqqtIEVcdLhqwGRGstqwVsnlzGBdPGhW3wpkVPRcWPrC9LovDzoMRGx06LB2vsFC1z9tKGNYqGRLIld4sF9zoRhWw0hcmExznDiktzenpEmA9ljQW0zMSzN27560dCX8WSLDYcMHewFuHvrSgQIXCEzC9AlYDY%2BkhKwmyWlTbKG2kyQt1Vv9F0OBQRAQugDpNCGmSRYYUybKUHBnM1gUoqSBkILWwUzkWHMbsNDkm2UgNth5skITBgdAOGzJsoFAsEwSnWKeCRSqxJqyWnVJMWKeFA7J%2FXTH9HGt2JAZTvTDslCfKn7yf%2F1xZi%2FsIAk2yeujCSvpnBGAooCBJHSoCwgp5E1aYwpR5JIeeDvyZvLsCdIlqKHFEJvRAL4XWpxys3ErYjZqrI%2FlaXdqhwgMgGzhFiPDga7VJHDCsHpSZ4WcZKYLFITTT0rUWlCpcqBXhaAtTsC7MtVLX9CNk8Ubk%2BzwP6qCfpD1DkRbOW4%2Fk9GBJug%2Fs%2FoYKFARIQUqP5IOBGg9oRYn%2FA2MQMsYKTfGSVTD5HUgEgDZI8Qw8yo1QDB4UOLCgGxaUMQYNFIkgQR0TkEGgRxNkVYMEMr4gYkJuTLCcR21YMBWL0vimgTsj8ngLKRikMZ5V4smyhykNsWekLSupgIGTsvSwkGjWeENGilOKckUpmhX3E0P5QeHdCnOYF2YhKbzGxGvqaRMBBajEIM4eN8mC45uOgPQnJnAACgkE2hiq6KKMNuroo5BGKumklFZqKSEjOdABpmxsmomn24AKahujIlGqI6cKI6qmoq5wxKarViOCp7COQKurmubKqq6h2korr6nWOiuwuf46bKzG4trrsMfKWoSwxdq6q7Sturoq%2F7PLEpuqrtB2G%2B2x2HqL7TPXfssrt9x6Cy2xu16rLLnSMsvCs62aK2y57Z5r7aWc8quqvwAHLPDABBcMsAklGiwXH7NAAAEKU0IQyBlFtIZWJuvlAdbF6ByVwTzNEPXxKnNx4YMPVfE4Ri5AYDVEMZNw7Mg6YEDxAwspe9RgZ3pFeeAcosBjzWE%2F6ZHzQ2P4%2BFwxLgyBjG6Q5HEUJUNO06DK4MlDQWkzeJNoYRpQwBs2PRw90Mpf1KJ0BsVdqWMmPnJZXzu%2FvNixcvmwLYLYZEId6FIHivfEnSuk8pAVD0TTQYgiwEwZJgmWldRSEBQ08kM%2BQpCPJKk88JObheQDkv80erHg51QXaPB1OhF0MNxW6XX9XyZDlnITgy0go3E%2BoG9jmRQczMMB4yKYQrwjGeBZwQa1tAiFUJSg4pZsdg9jmQSZPUDj8CNAb8GO3Uxg%2Bx1OA%2BNNBQAm9cs9lgEyTemUoBQa6Wpvt0biDuRyRRwd4K3CDllCDTcSR7gsmOMiUPiClvrjMiU8QQtPIYvp%2BlCB6q1CAr4wCcNsciVrhIgeQ3LB6kiwvdxZ6RAqgEEOLFALw22DAlhQYPKGg6cLDEg2NywBCizBISSk7mEwsEoMKmPBdMSkExTQgAtJACaFrUEQilLECEboxBkcwh1EMEVwRMCnKpKAKJchQTS0woHuRfAheF7cW%2F%2BSeLTUCSZEGahNFWP0PT6MYGvkkcdN0NgoBfjxj4Bsw284kKAtLu8P2XAASFLgMPB5pAABAIAkBUCASAKgDTRanAqkkBXwQMEJNQNHDpY4pQNIUgEjQAAAGICE1vimHCURXzXuMpaT9c4jCTglCQ7QACT4IzlJcYFWIISHZnTnQE5wh3YcORAF6FIEl0zCGafBBE7AkHsAcyYAEOBHA0TzCPnAARadqM0BEIAAkkxCBTqURm2i0gHOTGMb3DmCd8pTCfS8pxu0iQB9tqEAApAkAAiwAH%2FiE5AK6KVBF8rQhjr0oQELAQA7"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAO%2F38gKHKxGONyGWRTGdUkGlX2C0enC7h4DDlZDKoqDSr8DhyrDZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAACwAAAAAZABkAAAF%2F6Ajjs7jUBfXrSunWZApPvL4TNa1qZy6apgJhEQsGo%2FI5PFBsWQ6wIhkKsFkehmLpbLNaTg7cAZDkU6kkaFyzW4bIZbvJqguSiqZjEaj72MsE0Jug4SFEXFzFBNuNIWOj4UaGxsWEjWQmI43EpkjWZedoWwQFxguGJyiqqtIEVcdLhqwGRGstqwVsnlzGBdPGhW3wpkVPRcWPrC9LovDzoMRGx06LB2vsFC1z9tKGNYqGRLIld4sF9zoRhWw0hcmExznDiktzenpEmA9ljQW0zMSzN27560dCX8WSLDYcMHewFuHvrSgQIXCEzC9AlYDY%2BkhKwmyWlTbKG2kyQt1Vv9F0OBQRAQugDpNCGmSRYYUybKUHBnM1gUoqSBkILWwUzkWHMbsNDkm2UgNth5skITBgdAOGzJsoFAsEwSnWKeCRSqxJqyWnVJMWKeFA7J%2FXTH9HGt2JAZTvTDslCfKn7yf%2F1xZi%2FsIAk2yeujCSvpnBGAooCBJHSoCwgp5E1aYwpR5JIeeDvyZvLsCdIlqKHFEJvRAL4XWpxys3ErYjZqrI%2FlaXdqhwgMgGzhFiPDga7VJHDCsHpSZ4WcZKYLFITTT0rUWlCpcqBXhaAtTsC7MtVLX9CNk8Ubk%2BzwP6qCfpD1DkRbOW4%2Fk9GBJug%2Fs%2FoYKFARIQUqP5IOBGg9oRYn%2FA2MQMsYKTfGSVTD5HUgEgDZI8Qw8yo1QDB4UOLCgGxaUMQYNFIkgQR0TkEGgRxNkVYMEMr4gYkJuTLCcR21YMBWL0vimgTsj8ngLKRikMZ5V4smyhykNsWekLSupgIGTsvSwkGjWeENGilOKckUpmhX3E0P5QeHdCnOYF2YhKbzGxGvqaRMBBajEIM4eN8mC45uOgPQnJnAACgkE2hiq6KKMNuroo5BGKumklFZqKSEjOdABpmxsmomn24AKahujIlGqI6cKI6qmoq5wxKarViOCp7COQKurmubKqq6h2korr6nWOiuwuf46bKzG4trrsMfKWoSwxdq6q7Sturoq%2F7PLEpuqrtB2G%2B2x2HqL7TPXfssrt9x6Cy2xu16rLLnSMsvCs62aK2y57Z5r7aWc8quqvwAHLPDABBcMsAklGiwXH7NAAAEKU0IQyBlFtIZWJuvlAdbF6ByVwTzNEPXxKnNx4YMPVfE4Ri5AYDVEMZNw7Mg6YEDxAwspe9RgZ3pFeeAcosBjzWE%2F6ZHzQ2P4%2BFwxLgyBjG6Q5HEUJUNO06DK4MlDQWkzeJNoYRpQwBs2PRw90Mpf1KJ0BsVdqWMmPnJZXzu%2FvNixcvmwLYLYZEId6FIHivfEnSuk8pAVD0TTQYgiwEwZJgmWldRSEBQ08kM%2BQpCPJKk88JObheQDkv80erHg51QXaPB1OhF0MNxW6XX9XyZDlnITgy0go3E%2BoG9jmRQczMMB4yKYQrwjGeBZwQa1tAiFUJSg4pZsdg9jmQSZPUDj8CNAb8GO3Uxg%2Bx1OA%2BNNBQAm9cs9lgEyTemUoBQa6Wpvt0biDuRyRRwd4K3CDllCDTcSR7gsmOMiUPiClvrjMiU8QQtPIYvp%2BlCB6q1CAr4wCcNsciVrhIgeQ3LB6kiwvdxZ6RAqgEEOLFALw22DAlhQYPKGg6cLDEg2NywBCizBISSk7mEwsEoMKmPBdMSkExTQgAtJACaFrUEQilLECEboxBkcwh1EMEVwRMCnKpKAKJchQTS0woH%2FRfAheF7cW%2F%2BSeLTUCSZEGaiNoRqQgAXYcQENEAECGHDHBCghRt%2Fjwwi2Rh553ASNi1pAAQLAyAIsQAQHGAAjB2AAJfyGAwna4vL%2BkA0HgCQFDgOfRwgQgAIQgQGMfKQSaLQ4FUghK%2BCBghNqBo4cLNFIizQlCRaQyiVgwDflKIn4qnGXsZysdw%2FJJRF4GQBVFsEfyUmKC7QCITw0ozsHcoI7tCPKeyySAHe0YwJ6aYQzToMJnIAh9%2Fy1SEa6853OJGEZc9BNSylzl%2BS8UIe8eM8RMDOeaSxCP0Xwz4AiQZK6HME4m2nQIjCgnaVUgAMAUAABuDOhDXVAA8KJx4lyDxSgGQ2pSEdK0pKatIohAAA7"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf1BQf5RUf5hYf5xcf6Bgf6goP7AwP%2Ff3%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3tbW1s7Ozr29vZycnG9vb0pKSjExMSEhIRQUFAgICAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgsGo%2FIpHLJbDqfoo1UytjApjkrtDrStrze7Q1cBVNJYa5VS2Wfp%2BzoeWmOcu3d0jpevqvza3l0gmpwaHp%2BZGVtgH5Nin8naYF4kZaBaYOVlI6Jm3J3jHacmUaQbqVYlX1ul6FzYjulsUWGtLe4ubq7vL0%2Bqiuzwb6fwzLCtJORqntdb6%2BdusrPo3Fk1LC704TFhqfE26ue14TIyYLf5Kzo5slzYczsluvE9fb3%2BPkkDfo%2BDRQXMlxw0K%2FGPwsVKmjQYMGChgoWMGSg8EQBgosYMSrQ8cBChgoYNlD4d4HCho8VMv80gOCAn5IFBwAACEDgwIEBABDowGCBoASKE6SYpNhAQ4aFPU%2B4dPlDJgESBArgcFDhggmTGiZQiMCgAUIJExhStUCBoAMKEP5teOgD51MRCxQsuPEgwwYMTEdIUKoVpMCUGBQuDFlhQmARLXMQAPCWwUUcECdMaNAgYQUTKT%2FalaJhL4MKJ7cGHcmgbsSHD3AsFnDRQACdNy7wq8ww4gQSFwKDrhDhgcnbDChY4Coi7QgKEyNksKAaAGsEBnLOcCkhpQXDGCTww0BRBEAUkvOWoOB5RFjxMhY3NgAbxr%2BEGXhe2JC0YwYREgJeliFYu14Nqdmg3gwt%2FRPfBQ%2B5VAH%2FQQxEoMFaIDk0mQzzbVBecAkKyFgMBgokEj%2BXoSfCAyABFaAIIp5QHWkjQFDVfjTgBMBcL5SIXAVMAQYBeFmZIAFCNlCAAQ0JyGRkYysYpuCOIkQwxYTjPcjiCKABOEIDym0A3Aog0bAAjTFkh0JdG8BYgkOlKJQBkyKAViYLD2jQnRH5EafilscRBIEFd82p14UY9lhCZfthl0RlH7owXwYBhgVoCg4wOJ4Uk3l0Ip0MwfBgZwoy98JZk%2FYIUIpBBCVSjQwxZRiKGFilAp%2ByXTmBZ8iRCoRw%2FgX3aFckXOoXPyZpKR5T82mAQmWuIjFBrA1KYWZXUJqAZlnKYcCm%2F0sUUJCakNGiiKGfRjRwwX4K0ectA2GRhZ4Dvt3HwI7YkgWBUCnEadezR2AlQV1ZNUDVAxCEtNBC6IXV6wNqrVWmBoct1eZDbCoBEVq9CjzYQxYkO4JpvDpwlEl8YmBsdfEJWdIEEj6h3JyViTxRtgRLwDCOLkHQ47IiC%2FXAXRoA%2B%2BBaFyBoQcRNKETrBhcENVBDPQcnRWCpSYB0Sj8PFSeCpd37JmWxxLnfPw%2FN55FDDmQZUJk%2FPQ3YQvMFlVJV9Dl0KRN58WNYBstVydBJhK2VMWdGWSCBBDw5MJ9EUla4nAZ2EhFBQxkHzVnGkEMeHNOFrSWBA6dhMAHeEVh3mf%2BDFzwg0b0KofygQ1MSITPgRi0MB2dzO22V52qVnvUFCC1nulUK8d6qwG8iIdjUDK%2FOGYKUmuDAQsip7qkIp5VJW2oOrBUf3P0mEdJyDg7NXQQ3ks6oCeImJCd9eXELwQVSd9cAZxDN13oRQRkFUmAYDO%2By38ZCH0Rk5hCiISdoeLPAUkTmF97ZCghVukvQgha5htQvIigACHI%2BIh6APA0Dl6Lg%2BvBlBM7JiUspySDvpPAorJikceKagkKcICFbJQQvJwCIqSR1HIY9zwTzAc18nAAacGEmhTkclxTQE5EKSA2IGngfn3iYBIfkCgU3VGGF0COybGUCQREYVxSLZiH%2FFOIQM3Z5EBc%2F4qRBHUUgDiGhEeSmFF5VgAJNw4wU5iMe0oEwA9EqCtAggiMmiI13lENI5fDGKSAiCEFUFJJDGJAxpjhJgg3RmPemVaHZwQFPiHkIQzqzD4EIBALxo5IUMsadDRDtCD%2BLyCr3dhQp2KVb6JLTQ5ZDgqEERjOM2s5aPscoXi5BA8zDm0KsE0eF4ZKDbdISfujDHRLRJ1MgG1JKfMMW50nglbKgT9AUQgGItOqAIenWMicAkkVV5UG50RPkkEbN5YyrnA%2BqSkMg4CK7MCsHSwkLyixgup9sSmCbAc5YNsO2CiHzexHJGdBW%2BDSHBmSCAuPOBGpXg1llZQwgDDnK0CSwmSkwJCXlPIpRxMIirnUFIMtByISWsrnZOAxFD6BiDl7Xqvj0CSIYS2P%2FSnoSshRkY6g0y0quJJySDA4xswLLA49aR6pa9apYzapWt8rVrnr1q2ANq1jHStay1iAEADs%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAAKHKxGONyGWRTGdUkGlX2C0eoDDlZDKoqDSr8DhyrDZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3tbW1s7Ozr29vZycnG9vb0pKSjExMSEhIRQUFAgICAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgsGo%2FIpHLJbDqfoo1UytjApjkrtDrStrze7Q1cBVNJYa5VS2Wfp%2BzoeWmOcu3d0jpevqvza3l0gmpwaHp%2BZGVtgH5Nin8naYF4kZaBaYOVlI6Jm3J3jHacmUaQbqVYlX1ul6FzYjulsUWGtLe4ubq7vL0%2Bqiuzwb6fwzLCtJORqntdb6%2BdusrPo3Fk1LC704TFhqfE26ue14TIyYLf5Kzo5slzYczsluvE9fb3%2BPkkDfo%2BDRQXMlxw0K%2FGPwsVKmjQYMGChgoWMGSg8CSBgYsXE4jAiNHGAwsZKmDYQOHfBQobQv9WyNAAggN%2BShYYAAAggIEFIhQQoEkAgQ0MFghKoDhBCkqKDTRkWBj0BEyYP3YSKJGApkYaDipcMIFSwwQKERg0QChhAsOsFigQdEABwr8ND31IpWqVxoMMGzBAHSHB6VeRAldiULhwZIUJg0W8zDGXRFUAV2VAnDChQYOEFUysDIlXioa%2BDCqkBFu0JIO7ER8%2BwLFTAEcDBerOuMDvMsOIE0hcGCy6QoQHKHMzoGAhrAi3IyhMjJDBAuuaBKJHHyC7BUwJKy0gxiCBHwaKIgCioLy3BAXQI8yWl9F4xOPIK%2F4lzAD0woamHzOIkBAws%2BSF3fGlwWo2tCfCeyq89A%2F%2FfRc8BFMFBDEQgQZwieRQZTLYtwF6wzlYIABTOVZdCQsKRBI%2Fma0nwgMiEUWgCCqegJ1pI0CglX80BADAACXMBMABKLSoXAVQCQbBeF6ZIAFCNlCAAQ0H0CQlkAtISVMAJiD24JEiRDAFhuZRSOMIog04QgPMbSDcCiIlwR0Kd22AYwkOlaJQBlyKIJqcLDygAXhG8GecjGsmRxAEFuQFKF8cdpgkiQmJsF0Sl53ogn0ZEGhWoyk4EKF5UlQG0ouBMgQDhZ896NwLbIGaJEAxBlEUSS8oZAFUiMGIwVYqJErbmROAplysQBAX4HCcikUCqYDxg5Ka5UFlnwYoXMYr%2FxIT%2FCqhFHOKBaYJdarFHAZ5wkQBBas5%2BS2MHS5qRAMX%2BKfQfewyYFZa6zkAnH4MHGluWhAYlYKfeHV7RFcS3OVVA1k9AMFICy20nlnLPvAWXHJqkNhTej6UpxIQtbUsxIU9ZMG1I6CmrANLoZQoBtRiR5%2BTJ01w4RPMAXoZzBOdK7EEGhMJEwRJZguzUQ%2FkpYGzFMJ1QYMWfNyEQsJucEFRAzW09HBSDLaaBFav1PRRfjZ4WsF8WhaLn%2F7985B9IDnkQJoByTlU14ItZF9RK2l1n0OkMrEXP4hl0FyZDKVkGFwne6aUBRJIAJQD9kkkpobNaTAoERE0dPLTnp3suf%2Fnw2l9GFwSOJAaBhMYHkF2mU14wQMSFayQzRQ6NCYRQDuuVMZweBY411ux%2FtbsZ1%2BAUHO0b6WQ8rtCzCcShIWtce6eNRiqCQ4spBzuq4qQmpy2reYAXPT5vbCbKRXH0MNgDSl7pibAm9Cf9%2B2lLgQXgA1eA56BiH12V4SiKEUkg8FA9HjGOGrVDyJAc4jUlPM0w91KVw%2BRiPKIBYQy5eVpT%2FtcQwQYERQARDkhKQ9AuoYBUoUQfwYzgur%2BxKaVmFB5UuBUV1CyOXhNQSFOuBCxEqKXEwBkVp9Kjsa6ZwL7iMY%2BThCNuzRjQyPGSwrriUgFwNZEDfAvUUlMgkOOFaT%2FNllRQ%2BuB2bky0aAIxMuLU9tQDYuoGbxQKI0h8RKJliIQh8TQCIBzirIqQIGtaUYK9imP7FqYgW8lxWkQIRIT4KY80SFkdIZLVRMb1KAwOskhDDgZVLz0wYagzE3h0lDw4FAoxTyEIZ%2FZh0AEAgH%2FkUkKJ%2FvOBqR2hKZFBJeJW4oU8LIue%2F3pIc0hwVEGw5lMeQcurctUMpegAe0ZTiHZ8SPGiplCPalpP%2Ff5DovuYyqXPWklwIkL9yTAS1nc52kKoQBEdkXBkawLmxMQCaa0QqHdHMpzVgtnc%2BIlTwpppSEQsBFetJWDp5jFZhag3VBQBbHOCActndGbhqo5kuYoebBp1cRh1zYaEBBC7DsTGF4NgnUygDBkKVGTQGemwJCVyHMpSjkLjdQmFoA0ByEYekrqasMxGD0gjDno3a7ooyiImMyOCpxp%2B6aYD4eljgEvKRdxThI5xQSrLBwsSLXEStaymvWsaE2rWtfK1ra69a1wjatc53qEEAAAOw%3D%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf1BQf5RUf5hYf5xcf6Bgf6QkP6goP6wsP7AwP%2Ff3%2F%2Fv7%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAACwAAAAAZABkAAAF%2F%2BAjitKWRaPopc%2FKvi3MunI90ilu33CkbagZzaOTFXfI1%2FFoK0IyHAlEOVwNVcRWVuuyxrgqHjiH7ZbL1W%2FK0pkYY96rPBzeeuu8a34%2Fx2tZEx0XQUpwX3d%2FdESLaoiOWIWJh4x9aiIaGk2GZjpmlo2genRiiqF7ow8XHBNTb4ekfZWPXY%2Bnm5CxOBoZO56iY3Z2Yoy4Z2TAxXpZNIGsSTBMz9LT1CwYmdWo2dvcSLvd4OHiOW7j5ufTHoTo7O0sHOvu8uga8fLR89MbrfmI%2Bdsa%2BM2bZWxRFXzieP0zBMmUn0%2FoFPYbdsMgKC4IwUkcaPEiLI%2FtNrrr5JGgpJD%2FSP%2FiIKbMHzuRC2NmyyBQpk1pAW%2FqlLZvp88dPX8KfQFzqNCiMiNUsHChqdOmFiw4W0jhJoQIFjBp6GCwKxEOWitEqHmOrLsJFzBsMLgrQ4YLbplmwOA2gwaDHDBckMDO7LkJFjZw8NCBw4YLFSj4BeTBApTBHjZYWJyNMri0iwRbyDZB3Qi6gzVgsCyNdDUIFQYbxjDh2jZVNSVc4CrZ9E0JGQhjqCrCdTZMZink9oDNqAgIbDycYGG38obDUaP%2BQIF8rWTjDzAQvvACAtgHEMKLHx%2B%2BtV2tXL16KPcggnZBQyFg6FCPRdQLkelqgKzea4cNHbjFQV3LpUDBVqP55EP%2FBxgEAcEPABYmIWH%2FIVYBJhdKZkEFHF5DgVQWeHDBBHzB8KAHCd7kA4opuOeWKtw90FmJIgSW11o%2F1LjVWl1xUAMEa212E340wQDYaks1VkE5w3XFV5OLgEWfDWwUJ9NzNUDZFQYiRKBeVfh5xQGDO%2BQm5D9HEoGUllG2UkGP6z0ggXoYcBBjDRRwVcFCdy2yZn%2FwiPCmQbm54WVmTeV55wvXbEUcn4HaZRabX5XYZ1d7duZoV4umIAF%2FxNnWjXYodMYbc%2F11sNkTDHLIVAddUtjBrLSeyUIEG2hQAX6dnuVZC3M1mEKTJtQl7A7y2WNDbrzMuNCc5bDl6Ygk5gOF%2F5oy%2FprPp3tmh4F2VtrUZLPazvOprUCGG9MEY1IwVrbK9qUBurnu9GlOInQW70tcjuBlXmmdmg9qyqWg70JPbPSEQRssdIFgBY9w8ELNGUxXnT7%2Bk9tzi06ssbojZNDwxxLQmK8H3X5cQ73yTCAgEC9AO42oRIEswn9RpXyOdkSA3Bl7SehMTcUwpBcZzTKMF4F7dl5gq8SNTYNUEkTDsCGWUqCmmAS7WsgUYl87BdqYUQZlZLneIB0yvjXMJ9hzswqW3qyL0F03V7TSenQNHieBtjRVywAFgYQXXniDyL2bynw259vBvtAILHXjIwAIluSvLUJ530i4pfYDgcNwqf%2B6FFxcuAWlB5vWNcQ5bQPnOzwMeZaUHydBIIblTathP%2FxgtN5fEdHrC6ZOQ0EUM9XurwdNP4XYBNSB17XT0TWFFnw7%2BDC1DG0g7UO%2FSBwaKmeXgr%2Fs9kUD%2FcynJtsAZHrtIwGBBO%2FNOjxR6L9wHTWw2xBBbt%2B6WAAHSEC6fGVoT%2FNG%2Foj3tzIxjwOGyRUEJ0hBChKhA0Ir0%2F3aVqRp9A9Pg5kdUdJjPmTpihoXUB6jHjeztThoAuojXmgUIw1ccS0qmINBCqsBnOwZLIT%2F28%2BA4jWBPvXLNBTI06YwiISsPAMrVfmB9UgAFcD0aQMUkMClonQXDigmAwFKC2SMxrD%2FPmWAL7LR0i4whIQdJuEuHaAAj5gnmjmSjW6GiQwYNcSK2fynK%2FTZEFMAJLIx6S2CF8wVBsQyjRSaZo1EKNZwBkSXF4ngYSjyy4FMEJ0EcnAtbxFhDbIiShREIIk0SmIMRyABGtYgAvGbRis%2Ftwa2YccnFxLlLeVxoV0KxYm%2B9Ikbb6IAABjzmMdEgE8cQ0twOMCYA2CAAxywgAAcQJgqdEcAAECAFCRAmTvxzU4IwM0RKEABPwmlT8jZzQc0oADg3MkqfkJOZAIgnjrpQCxjwk4RNEAA%2BLQJBPRJz3KKgAEM8Ikc97mQfhplmOMEgACMIxqfNAAB2wSAAdAplDb4LkQBBkCASBHA0Z80MJgLMRtKxdXMlXJjgS5FxwVaGtNq5LCm8tAlTsVx052yIwQAOw%3D%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAAKHKxGONyGWRTGdUkGlX4DDlZDKoqDSr8Dhys%2Fo17DZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjig9mOaO4pczKvi3MunI90ilu37BzYagZbaOTFXfI1%2FFoKzYsmUdDOVwNVcRWVuuyxrgqHjiH7ZbL1W9qooEYY96rPBzeeuu8a34%2Fx2tZEBoUQUpwX3d%2FdESLaoiOWIWJh4x9aiIXF02GZjpmlo2genRiiqF7owwUGRBTb4ekfZWPXY%2Bnm5CxOBcWO56iY3Z2Yoy4Z2TAxXpZNIGsSTBMz9LT1CwVmdWo2dvcSLvd4OHiOW7j5ufTG4To7O0sGevu8ugX8fLR89MYrfmI%2BdsX%2BM2bZWxRFXzieP0zBMmUn0%2FoFPYbdsMgKC4IwUkcaPEiLI%2FtNrrr5JGgpJD%2FSP%2FiIKbMHzuRC2NmsyBQpk1pAW%2FqlLZvp88dPX8KfQFzqNCiMh1ImEChqdOmEyY4WxjhZgMHEzBd0GCwK5EMWiU4qHmOrDsIFCpgMLjLggUKbplaqODWwgWDGSpQeMDO7DkIEzBk2KAhAwYKEiL4BbRhApTBGzBMWJyNMri0iwRPyAZB3Qi6gy9UsCyNdLUGEgYbrgDh2jZVNR9Q4CrZ9M0HFghXqCrCdTZMZiPk3oDNqIgGbDacYGG3MobDUaP%2BQIF8rWTjDCoQpvCiAVgGDcKLHx%2B%2BtV2tXL1uKMfAgXZBQxtU0FCPRVQKkelegKzeqwYMGriVQV3LpRDBVqP55IP%2FBhUE0cAPABYmIWH%2FISYBJhdKNoEEHF4TgVQTbEABBHzB8OAGCd7kA4opuOeWKtwx0FmJIgSW11o%2F1LjVWl1lUEMDa212E340wQDYaks1JkE5w3XFV5OLgEWfDWwUJ9NzNUDZVQUiOKBeVfh5lQGDO%2BQm5D9HEoGUllG2IkGP6zHwgHoVZBBjDRFwJcFCdy2yZn%2FwiPCmQbm54WVmTeV55wvXbEUcn4HaZRabX5XYZ1d7duZoV4um8AB%2FxNnWjXYodMYbc%2F1psNkTDHLIlAZdUqjBrLSeyYIDGFwgAX6dnuVZC3M1mEKTJtQl7A7y2WNDbrzMuNCc5bDl6Ygk5gOF%2F5oy%2FprPp3tmV4F2VtrUZLPazvOprUCGGxMEY0YwVrbK9nUBurnu9GlOInQW70tcjuBlXmmdmg9qyqWg70JPbPSEQRgsRIFgBY9w8ELNGUxXnT7%2Bk9tzi06ssbojWNDwxw%2FQmO8G3X5cQ73yQCAgEC9AO42oRIEswn9RpXyOdkSA3Bl7SehMTcUwpBcZzTKM54B7dlJgq8SNTYNUEkTDsCGWUqCm2AO7WsgUYl87BdqYUQZlZLneIB0yvjXMJ9hzswqW3qyL0F03V7TSenQNHieBtjRVywAFgYQXXniDyL2bynw256vBvtAILHXjIwAIluSvLUJ530i4pTYDgcNwqf%2B6EVxc%2BASlB5vWNcQ5bQPnOzwMeZaUH%2FdAIIblTathP%2FxgtN5fEdHrC6ZOE0EUM9Xu7wZNP4UYBNSB17XT0TWFFnw7%2BDC1DG0g7UO%2FSBwaKmeXgr%2Fs9kUD%2FcynJtsAZHrtI9HAA%2B%2FNOjxR6L9wHTWw2%2BBAbt%2B6WAAHSEC6fGVoT%2FNG%2Foj3tzIxLwOGyRUEJ0hBChJBA0Ir0%2F3aVqRp9A9Pg5kdUdJjPmTpihoUUB6jHjeztTgIAuojXmgUIw1ccS0qmINBCqsBnOwZLIT%2F28%2BA4gWBPvXLNBHI06YwiISsPAMrVfmB9UgAFcD0CQMReMClonSXDCjGAgFKC2SMxrD%2FPlmAL7LR0i4whIQdJuEuGogAj5gnmjmSjW6GiQwYNcSK2fynK%2FTZEFMAJLIx6S2CF8xVBcQyjRSaZo1EKNZwBkSXF4ngYSjyy4FMEJ0EcnAtbxFhDbIiShQ4IIk0SmIMR%2FAAGtbAAfGbRis%2Ftwa2YccnFxLlLeVxoV0KxYm%2B9Ikbb3IAABjTmAcQwQCOCQAB2MQxtAyHAAAwABYUEwDJtMkwdUIAABCABQgwJgJu4puddPObKQgnAMYprkH45JzgFOdNVvGTbjLznuyUiQZiGZNuDgABAAWoAeQpkwbss57ejOc6bSJHfi4EnukkaEy2qZNlonMECpAon0ookwQUQsCYAShAAkRQgGVS0wD6XOVCEFCAlrZ0nAtwqUtl0sBgLsRsNhVXNHPKjQXyFB0U2OlPq5HDocpDl0YVR1GTyo4QAAA7"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf1BQf5RUf5hYf5xcf6Bgf6goP7AwP%2Ff3%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3sbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmyLNm4sz3QN13iu73zv%2F8CgcEgsGo%2FIpHLJbL6c0Kh0Sq1ar9isdsvter%2FgsHhMLpvP6LR6qym1Te9Re86gG%2BMivDynifdPf3l%2BdUl6enl8fm99i4qEdI2KkZKIlX%2BNj3uRMpCZiJ2gnqJ2o4SfgqaXe5WmLaGGma%2BtcoytpKykuackgTGyvLHBt7bEsLulosC%2BlsXMv56qx3bR1IPKsyuLloHawqm9qta1qJjlq7y9azOH6nzt7%2FDx8vMqjOn0rvg4h%2BOg4%2FL2cNUxhw2FAgQIEyZUoIVfLXGsVCw4AABAAAIHDgwAgKChG02rurWoSIAEgQIelf9FSxVxxcaSIhYoWJASHTKRLAgAgMkAob6cAAQgNBCg408VOoUiMMDxKNKdIwwYVSIhQ4YIVXTybDIhQ58MEqhohVJBA4YIFPpUuAFlIwCaSxxY0GABQgQMjDBIeNAkQcW%2FW43c1VDhwVx7XyOwRbIALhMJfSSUpQvB8FdGE36mvTDhAmUSgzNg8Hp23gS8nK1OWCzCQVezeDVcoADhHQS1ZTHUFtHA7mmsEDwjxsBX3dzOGiiQsHDBa5%2FMIk73YZ5c3QPCEwiX8OqcXYYLDUYXR9PAc3kMDrZr6H4iLYSy0NFkr1AHK2irAU98hyCa9RgHojFQwQUmpIWYfSWkNUH%2FWmGdkZ1i1SWImHYnNPcABhj4l4MDEqRnBH8EUoBBe4xYYGKDJtxWQVr08SAXXhmMN0QFGTQAoHImNBCBAx6uQMFVc6FIwwMVxGbPbBruEB59PyYpA4AWPBAgDRIchoEF3a23XgUI9hCBBpVFyAODx8kQwWEWDPgVltM5Z0GXOqTVgAUj%2FoAhfxrEp0IDr6XpZoPlTVfkenDWIGVdGgjJQ3YTlJUBCxF4VgGN671pwmRmUVpBjzUoiKEQovVBoArZaTndCofJFtsFFewmA57ZWWAmBBRMSgEFijKQQVkXcFpCpGaVCIGTI0BA54SEFapCBN3JasIE0FLAKnNZllhC%2FwMZTLAjCmeu59wFypLgmratSdfHaIS%2BSumooCGr1q0UoPVpu7mOYCClV10bQQTFOYCuWWwxi28frsYgJbvo1OVhWc6OgOViX9bLwHWzfZVhdMzF1mJaadLY448QGMvdCcQycFvDJDDcY6ktRqcBp1%2FqWQKmVbLrpogt3ibCXR%2FXGV29vprwJcojOBpldBkoOMKXnGIrMwnXZVDblSMkXRwGLV4XQQVzufpjCxIvTeHMen2XXldzamBfAy9v93TKu0k9gm4mA9hiqeeOV2QLLXM7dsoZQqZcVwz4G2MeimZAdApgjnABX7PtKsJ7t8J5weImOIDwCV%2F2XfTFc0VQlf8IUl6c6HaYA%2BLq4wxA%2BzcKSbMw%2BrKvi7C3yd8RLoLg9W3nOeOr7yYljipYdeILs63Q%2BQm3C5jco7x9qrbvLsgtQq8i%2FNgwkSg68CMjzmXg62lB%2Fyom4CMAuB4J2bm3nc%2B7Y8VnWPsmKwFeGEhbIqWidoeBtvw6DfFagyTlne5SCEsL9FoTmwHq6lEPkIAEFMgmulRLNlbZVaMyeCssieZW5SsB%2BfbUm9fZ6HIMsFHhrHIDHrHMRnaZzL9kg6bJSI1IFQhbDi5EAWJJS0pJS5PtvKKt0VgAObIqkuI8gyEjgS9NPYTCjxSjArwMyl15uWCwvtIcVk0AAjwq2RGyo8Nb1mWLEVyKwGm4dIErKQYCEzjiGoe1rwjURkZV4E8UVTBBBlQldeq4XAidYoKziJGQAyIk2LKlyBUIbpCNvBEkG8mcSRLSMIdrJLdEg0dN8gZLhfHktV5URhGEAAA7"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAAKHKxGONyGWRTGdUkGlX2C0eoDDlZDKoqDSr8DhyrDZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3sbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmyLNm4sz3QN13iu73zv%2F8CgcEgsGo%2FIpHLJbL6c0Kh0Sq1ar9isdsvter%2FgsHhMLpvP6LR6qym1Te9Re86gG%2BMivDynifdPf3l%2BdUl6enl8fm99i4qEdI2KkZKIlX%2BNj3uRMpCZiJ2gnqJ2o4SfgqaXe5WmLaGGma%2BtcoytpKykuackgTGyvLHBt7bEsLulosC%2BlsXMv56qx3bR1IPKsyuLloHawqm9qta1qJjlq7y9azOH6nzt7%2FDx8vMqjOn0rvg4h%2BOg4%2FL2cNUxhw1FAgMIESYQkTChFX61xLFSscAAAAABDCwQoYDARQIIHrrRtKpbC48ESv8kuLhQpLJoqSauQKmS5RWIyEyyoEliJYCW%2Bkx4FNDQQAGbQYViJMCU6QCkSUnwHOETaBEJGTJEqDJVRNUjEzL0ySCBSlcGX4tU0IAhAoU%2BFW5ACQBgQAmLAA4QcWBBgwUIETAwwiDhQZMDFxPrXZD4YgAhgTVUeNDX3tgIcvVJ6CNhrV8IlMcymhD07YUJFz6TiJwBg9i28yYIPp11QmYRDsKyFazhAgUI7yDAXYsBuIgGgGVvhZDaMgbD6vqi1kCBhIULYvuQFiG7z3Xq6h5IniC5hNjs7DJcaOAaOpoGqeFjcGBeA%2FoTbyGs3Y6GfIU6W62WVUAnqAdBa7eN4UD%2FawxUcIEJb1kWYAlvTfBWWWeQhxl4FFpW3gnYPYABBgnm4IAE9Blx4IMUYIAfIxbEiKEJwlXw1n888CVYBu4NUUEGDSxYnQkNROBAiitQoFVfM9LwQAW82eNbiTuw95%2BSVMqwoAUPMEiDBJVhYAF69tlXwYQ9RKABaBzycKF0MkRQmQUOjjWmd9lZgKYObzVggYs%2FjHigBvyp0IBudOaJIXzeQWnfnjV0%2BZcGTfJA3gRrZcBCBKlV8KN9eprgGVufVoBkDRWOKERrfTyoAnllerdCZb3xdkEFxskwKHkWxAkBBZ5SQEGlDGSw1gWnlsApWzBCkOUIEPzpoWSQqhAB%2F3q9mjDBthTceh2ZMJbQQAYTGImCnPZld0G1JORWLm7d9eHao7p%2B6upq08IlLAVuqYovsSNE%2BKlW4kYQAXQOzMuWXNcO3EeuMXR5Lzp%2FpbhWtiOMmZmaADMgnm9jkcjddbzh%2BBadPyKpJATRnnfCswwIhzEJFyMJK47caXCqmoWWMCqY9%2BbZIo7CiRCYyoByB3CyJqg58wiZcsldBhWOoOap4%2FZMgngZACfmCFRDhwGO4kVQQV%2B5KtlCx1Z%2F6DNh6tEXlp8aBNiAzuZpTbNxXY9QXMwL4girvO5B2QLO57pNM4mbVRcWAwnzmEelGTydwpojXGCYb8aKoJ%2Bwe15guf8JDkx8gpqIQy1yXxFgJUKXIlNq3uiA5Ko5A9sqjgLVLLhure4iGB6zeo%2BL0DiA5qV%2Bue3GdTmkClnJ%2BIJvK6B%2BgvANUqfpcarWnbwLfYuArAhKYvzkjA4oyUh2GSQrG9PKtrn4CAvaRwJ5%2BZmXtPFbHVqWwdSSgGAw0C0YfapV6MFAuQ4mm%2BfhZkrVk52oJvaW7eGGNw4slqYeIAEJVPBOfgFXb7JiLEyRUFhjao2w4FeC9xkKOboLkugYECTIZeUGR7pZkADjGYX1Zk6e6dqTKsC2HIiIAs%2FqVpeoRqfgiaVcrrHAdHoFpcqlZkRRWh%2BdkAgFJWFGBYJxVL4GI0JpZo0FO7eaAASOBDOwSDAFYRncmSIgmzNdQEyYgcAEpFhHZxksAsDpURUOxEUVeJABWKGdOkTHwqiYoC1tdKSDHLk2clFyBY1r5CWFpMlLXqeTjqSM5C55rtYIkpTHGdNkUCkuHRVxBCEAADs%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf1BQf5RUf5hYf5xcf6Bgf6goP7AwP%2Ff3%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgsGo%2FIpHLJbDqf0Kh0Sq1ar9isFrXpdhkbV5g0LpVF43O1rE61T%2Bp0lg1mf8lmdHhfr%2FPvfmgjaYBePnaCdIN5hH1gj458iYt0ijuWe15ncZCPlYKToZCFmj2YnXl4n6Grnouvbzqnlqiufautkl%2B5pq%2BjgHqGjZKexISIx4PAc1tEpc3Q0dLT1NXW19jZ2i4OFg3bORMY3%2BA3FBjUCgjr7OwKNhcZDtMLBwAAAQQHBwMACDUUulCodo8ACQIFaEzI0MVCtX4GRSxQsGAGBQ2aBk4jACAig3UzFmraoEHCRgAC1v8ZCPAvxsWRXTA8kMYxJQID%2FmB0g6nJYTSOHg20bFEBI0meDX92nIEBKc8K0IAy1WCUqtWnzfoBqDjjQQaf5CBYsIAhA0YNELIkuMfWI4wGF8BSmECOgoUHeMldWcD1hoWBDSyYnSCCwoVyLv4yiLDhQQV0DOwiZuGVMIUMEipc%2BGZ48goIG0xGoLrBZ2fPKR6PiECBwrzIh1GfcIABQ4UKrdOOOC27xIQuRoF%2FtTuudwkH4i5IWP44A0OSEYyX8OqTBOixr6WL%2BJ09sgPQ3bUzuABZRIOSDjaEl97ANonzEtLPFC8CQgaoJCo8SK%2BR%2FoSSs22An38Z6PWee%2FRFlkH%2FCmMlOF5sDEhA2AgWQCheBv1d0B8DFSbYAIa7TchAYBZKB4EGIprQIX2X6XZChQYap5kKK4o3I4MlGgfjeiPWqN0Ftw0oQgUStJdjbygiOMJXDtyX4AYQzFVCBhc4oMGGxqXnIgkUQJCekMYtNN9sX7G4WQrtVSddgyk0eSRqmkWHgpVvIvaABE1dySOd0onTRQUWbIClCOnVuc1oFrj425aEaoABXagF5g0JDlxwZoQTnAOcodc8gJYJFWxg6QVn3SeOBqjh%2BU035lEQqgW3UTBmUajBKgJjInj14YAPtNbAaGBqUylUD5A3YmeqsZanA3AVR8SgP1yUFnnRSZBB%2BHQXkaoBbnKCN4QDocboQwQgMpDBhGQVpoEFcr5nqRB4lpTiD5Z%2BI0GV20F2kUkvHsbjDcWKigYF4gLMmagONJnoaxFAkKmg381UaZe1kWUBszoshBk5v13Qbg5OBiQgBE1t8GhgXZj12AZflfycF3F9TMNFF5cQ78UFxxDquhp8ta3JZBml3AVHkUfSbVRaQJcEJPFLwwMW6DmbxrLa4OkEj2EAAcoXpEUbBq4xUCnYDTwQQXQNeJlfBTm3UCyKK3STAQYyw9DrN3o1MMG%2FRiA3d90oQEDqBQ%2B0Tc29247ZQgOXbctoNW%2BzSwO4PbNrOBZQz10kCyEAADs%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAAKHKxGONyGWRTGdUkGlX2C0eoDDlZDKoqDSr8DhyrDZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgsGo%2FIpHLJbDqf0Kh0Sq1ar9isFrXpdhkbV5g0LpVF43O1rE61T%2Bp0lg1mf8lmdHhfr%2FPvfmgjaYBePnaCdIN5hH1gj458iYt0ijuWe15ncZCPlYKToZCFmj2YnXl4n6Grnouvbzqnlqiufautkl%2B5pq%2BjgHqGjZKexISIx4PAc1tEpc3Q0dLT1NXW19jZ2i4OFg3bORMY3%2BA3FBjUCQbr6wki7OwyFxkO0wsGAAABBgsiCgT5CCCIQaELhWoACZRIkM8djAkZulhACEAhCYYAHLqgoEHTwWkJFzZ8AVHTBg0SQP8CEADPQIGRLTia7ILhgTSAAQjo1DkApopuMzVNjBbyok8UFTqeDCqRaEWRGVVgYBq0ArSiIzBqPIFBg1KvYKs2CwBgQAl8AA6weJBhKDkIFixgyNBRA4QsB%2FLpVbtAb74AKxpccEthAjkKFh4oJlcOhYWDDSzQnSCCwoXGLR4ziLDhQQV0DBBjXsGWMoUMEipc%2BGZ5tAoIG1JG8LphaGvXSEFvpkChXujLuE04wIChQgXed0fcDk5iQhelz9siHsechANxFyRo%2F5wh4skI1UmwHUoCdlzf4Rk4Rx%2FaAWz26S%2FoZtAApYMN8Ks3KE6ivoT7NqUnAgQZWEVCBQ%2Fc95H%2FgBOgdMJ9BjKYAWP98SdgaBmkENeFDFwAHAMSUDaCBR%2Bml8GCFyzIAIkXNnCiciLSx6KAEGgQowkzpndacieQSCFzqqmQY3hBalhidT7mJ%2BORzF1gXIQiVCDBfkwGZ6OFI7TlQIEXbgBBYSVkcIEDGqjI3H08kkABBBBKGOCDbQlo2Y8VkoekncKJKaBq4KFAZpWYPSDBVGUq%2BWd14nRRgQUbmCnCfYCCM5sFPDqX5qMaYGCYa5F5Y52H5IR4znORYvOAXSZUsIGHF9RVoDgauDboN92I0AAFqlpgHAVvJuWariJwJgJbLkb4AG8NzAblNg44ycAD8tHX2me7EeqA%2F2DUEeHoDxzdJR94EmQAHketanBcn%2B8N4YCqdPYQwYsMZCCiXJVpYEGf%2FXkoxKAo3fgDqCCOKYI49abU42VK3gDtqmhQ0K4ND7C2qgNbUupbBBBMUFBvENjU7JrEyWXBtTpAhBo5zl2Abw5cFrRBBRBMtYGmkXVB12cbtCWzd14MtjINHI1cAr8jPwyDqvZq0Ja5M8ulVHYXLCXfScaJaYFhEpxkMA0PWFDogybzCrGNn2EAQc0X3DUcBr0x0CzbDTwQAXgNsHlgBUav1aq%2FwkmGwc8wHPsNYw1MkLAR12XwtwsQtHpBxOVI0CqCMNx686XVQGsv4Nwk1VYEeWPRtQXiU7IQAgA7"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAP0DA%2F0SEv0iIv0xMf5RUf5hYf6Bgf6goP6wsP7AwP%2FQ0P%2Ff3%2F%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAAAAAAAAAACwAAAAAZABkAAAF%2FyAjjmRpbqipjtuqtu4Kx3TtznOd07tu%2F0DRroVjEEk9FO5YRKaMz6BUVjoKodXsFZZqXr%2B9qdiYLSZPSjJYzWqzx%2FAh24rUkpv0rzoMl%2BKFeXpgVlFna32IaSxMaIpdgHMvhYiUlTZ8lpmaN5udnp%2BgoaKjpKWmp6gxSphArHWpl25xP66welxPjIVdj4Nctj5bbbm%2FZreRtbargGleRMu%2FvoHAJ3bHwq%2FG2NRUr3eL24SQuG%2Fc1szHu%2BRY5NPmU8nvpPHy9fb3%2BPn6%2B6euyWH05Pnjt%2BnZrj3qfCmEEqUeHUIPkUnUVs5cRDPQtEyiGHCexG2C3hQbJkvgx17fhP8Z43gvIjt0MHFFc1SSoM2bOHPq3MmzJxADQIMK9dnnwAAAAAYQMEAgAACfDSg0GGMAaYIRCQAo6OlgQ4UxCKxivcozAgUNGS48mJIVAFkGT3tWwJBBwwUIbJEWAHoUqgMLF6bmBbDXgIC4Pi1YGNOW7ALEPS1gcCCmMVESDS5sWDz47WUJKDREmBKW8GUREDIowYAXyGGkYqFqXnUXiOfLDSysWvX1tJQJqyRUWEWBsm8boJX0Hq78eA0ItEkwR9HbuQoJqlFkWMtAMAXaxq2PiJB9gwYIUSuorwAhuZLR4hk4wKAkg4TZGVRr2HDh%2B6oJggkWhIDy5LaKBWhN4ED%2FVMVFgIEGZ9G2XgUURNBaCRBQQMEEwk0YHjUPzGbeBRlYkAEGo1kQQQPA8SfBfrvtpsGMNMIYIwrwcSPiBi9K9UAFGkxA4VkabgBBiDcmqeQG9OUIzHQbUPAidwxM8OCMFhQpgXw7LunlBh%2BOQaAUBoY2AQMVqNXdBBQwR%2BMFEIqAoIXCXWCnnRTeqd4FillQwQQaWHBhH2MC4QCUZ6KJVn5pKaEiZUHKhwFnJTQw5lQEZlYdIpsGEcEqGbSWZgSkQgCYnRjcBd1oD3g1gp8USHYBCRq2WYGAF3QKRwZh%2FmAghPaJ8NdUf6l1QQQhNopXq1uKACeTJ47QAAYPqkZC%2F66W9FeoDbndGqyzGFSg2FQodqfZZAy0Gh6fTM41wgQnorUBrrqO4eC2Qdgn2AP0qclABgA6yCNqOfSXFgUYjDCXuN%2BtW%2B8YfiKiLwlWphUBhAhqIIFgn0rL56SSKawBtQ%2BOMN%2FDYjjAax8YNEvCoXU5OmjHwsLJ6KwiUMCoiiOA5nIlafZxQaIqmLXhmMO93GsMFWSwyQOh4lsDwCY0YKqdTo5wQcJwhCv1GEGP8a3JuqE1Y9YMYEuDpSI08ICAGFDQyXwbizHxq0wyQAG%2FopEA9a2VltC0YvRRGvfXYyC89NR1i%2FBifwxo8MB3XIvwtwjirpflq6muJmwGUiHSgP8DPzOgmN2N682nVBsgqcHLXv%2B7G86mw0gtzqkRba9kr%2FtdrhS%2FOxurVLxOqkF4ucu5W2%2BZaVhioCJcrLsUf41MwaA5r5xv6vZBvl3cx4%2FAb28tKoGzA7Yr1iy%2F0%2FsKAV1yu8CnFGNPG4F6aWcGWvyScjbBsyjgn9sWVIKLhQ4IbtMNa2iQO8SRIHgMYI16rPQ%2BQG1KMyIAlI1KV7X9decHENAM5GxAHvT8YGz%2FUs%2BGMAAozSzGARNA0gQiUD4UEC1TtdJNliiQKyqpADh3caC0eLg4BiALcxuI4epspAH12Khp5oHRjGR0olrZKWZpOREKqNVEFViNRAccEGC2pcHU%2FIxsincSVARMZJc6papOf5rLwSJwJ%2Fps8U4SWMsDHACBCDjAAW%2B7zsgCKYYQoUtwEhDOBI4kARVZikAPgEB4lua2MTmgVEKsVAgD5cNCbq2TN2nA4zg4hr%2BgKJPvaEDTirOJVaKSGiGkmid6VER5kIc1r5SCgw6ZDyBRKhSxxJ48dBNGUeTmlPVw0N1KERXQ5dITUbEL2koBrwrUchT3gdAzNSGBSYGSFA9AUG3MQUe1bFMMDVhjfvj3DlMS8hORBAxaKvBNbqhSlpuAIYnM86dPhAAAOw%3D%3D"
					+ "|" + "data:image/gif;base64,R0lGODlhZABkAMQAAO%2F38gKHKxGONyGWRTGdUkGlX1CsbWC0eoDDlZDKoqDSr8DhyrDZvN%2Fw5P%2F%2F%2F%2Ff39%2B%2Fv7%2Bfn597e3s7OzsbGxrW1taWlpYyMjHNzc1JSUjk5OSkpKRgYGAAAAAAAAAAAACwAAAAAZABkAAAF%2F6AjjmRpdqipjt2qtu4Kx3TtznOd07tu%2F0DRroVzEEk9FO5YRKaMz6BUVjoKodXsFZZqXr%2B9qdiYLSZPSjJYzWqzx%2FAh24rUkpv0rzoMl%2BKFeXpgVlFna32IaSxMaIpdgHMvhYiUlTZ8lpmaN5udnp%2BgoaKjpKWmp6gxSphArHWpl25xP66welxPjIVdj4Nctj5bbbm%2FZreRtbargGleRMu%2FvoHAJ3bHwq%2FG2NRUr3eL24SQuG%2Fc1szHu%2BRY5NPmU8nvpPHy9fb3%2BPn6%2B6euyWH05Pnjt%2BnZrj3qfCmEEqUeHUIPkUnUVs5cRDPQtEyiGHCexG2C3hQbJkvgx17fhP8Z43gvIjt0MHFFc1SSoM2bOHPq3Mmzpw0EQIOKWBAU6AKfUhQUCBDAgAIRDRIwDYCgwc4HFh5MWcD0KImlBXpC6HBha9cSYHlOsMBhQ4YIQbgG8Doi7c4LGjZwyCAhLtMDRREMCBD2KgQMGbT6DUCggGPHAgj7xIDB7Fy0knti0ABBily6IuxezdCh8mLQDkTrpICCw4QgUgMwIAEgMgGrOiVsUKKhr43IUwWIODCVaYKcD0iv4osUzgMMq1aVbT6lwioKF1ZZ6Ez9B2sl07OD725DwnIS4lFMJ7%2BCwm4UG%2BA6UGxhOXf2JCa878BBAtYLAF4gwXdKvIafCBBooMT%2FBhQot8FuHHSQQX2rVKCYYkFgKM9zq2DQVgUQYLXdBBpwwNZyAV5gwQS%2BlSCBBRZUgF2K91ETgXL8ZbABBhto8BoGEzxgnYQURBhddBwkqaSRR6JgIDc4dlBkVhFcwEEFKrIFYwcS3Njkl2B2oOCTwKTXgQVFyudABSUmicGWFDgAQZRh1tlBjWNoKAWHrVXgwAVvzVeBBeIpmYGJInjIInYZNNqoio4CmAFlGFxQAQcYtNiHnkBAYKaff7b1oFtKANnZlXJqYFoJD%2BiplYbJrYeIrEFMsMoGvgE6wa4SINaoBnyZ91oEZI1QqQWbZUACjIRegGEGtMKxAZ4%2FcGgi%2F4MIYqDVYW9lMMGNpPZFbJwiHCpmjyM8oEGJu5EArSUTcmrDc85iW64GF1CmlY%2FzkcaZA8TeN6mYeI1QQY9tdfBstGOQKG8QDCoWgYKBOrCBhSRKKYJ57lrglgUajIBXvvUJzPAYlSISMQlsujWBiR5yQIFitqY7qaqbiczBuiWOkODJYkAwbR8akEuCp3qVqmnNCB46qrIiePwgkCOwZnQlgPaRAagqrBWjntkdTW0MF2ywSQS4PlzDxSY80GujZI6QQchw4Kv2GFmPYa%2FP0LWVZNwOvEtDqyI8EAGGGljQSYIzi7GysWI6YMHErpGAtrOsllA2ZQqumvjdY4A89v%2FajYtQ5IQOcBBBfXSLcLkI%2BQb4prHA8obgBlkh8gAEVztAmeOlSz5pVh14ycHRdlscHdS%2BG7ku1Lpx3fBmx1vOrxTXl4tsVtOqysF90Sca3XTJwbgjpiK8LL0Uh%2B1sgaZRDw1x8AyiHl%2Fi348w8XRDKgE1BM6jDLkmtr5qSSAvinPBpKSwN3VNAECBSw5rEpgq01TAXCigoOFCVIKX5Q4IhoNOb2gQPdCRIHsO6A2A2HTAS8mKNCK4FJN617YJzucHEiAN6mygH%2F%2F8YG8WA1CMNHAp0lQGAhXwUgUm0D8UcA1WzILOmywALTWpwDp8MWG6qDg6B3wLdh1I4vCYxAH2ADGpbPwxUpKQ1CNmNSppbukRCtZVRhW4TUcfzBBi5CXDB%2B1sjY7K1AR4tBdGAYtRlsLLxybgKAXN0VEUgEsEICCBCUAAAodTQZE0kEkx3OhfmqMAdirQJQoAqVUaioAE7jM2w%2BkJArzSIqtyiCkrenJutrzJA05HwzEcxkeyfMcDyradTRAzmNTIIds8MaUuykM%2FvUGmFEgEynxYaVWhUCb85AGdPIriOcCsB4keVwqs4E6ansDKXgBXioNdwJmjaJCJ0KkJCqgql6SIgIeYYw5GvoWeYnjAIB9EwXf8spOfUCVi2nIBfHJjmMvcBBJ1xB9LfSIEADs%3D";
	GM_setValue('replacementImages',replacementImages);
}

//Resets configurations to beginning-of-quest values (doesn't effect the active variable)
function ResetConfigs() {
	deadHippies = 0; 
	deadFratboys = 0; 
	nunsMeat = 0;
	arenaComplete = 'no';  
	junkyardComplete = 'no';  
	orchardComplete = 'no';  
	lighthouseComplete = 'no';  
	nunsComplete = 'no';  
	farmComplete = 'no';
	junkyardTool = 'unknown';  
	junkyardLocation = 'unknown';
}

//Imports script data from the quest notes
function ImportData() {
	noteTextNode = document.evaluate("//TEXTAREA[@name='notes']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	noteText=noteTextNode.data;

	if(noteText && noteText.match("%BCDATA%.*%BCDATA")) {
		//Separate out the datastring from the other notes, then parse into an array of values
		var dataArray = noteText.split("%BCDATA%")[1].split(";");

		if (!dataArray[10]) {
			alert('Data somehow corrupted.  Cannot Import'); 
			return;
		}

		//save all variables
		deadHippies = ImportDataConverter(dataArray[0]);
		deadFratboys = ImportDataConverter(dataArray[1]);
		nunsMeat = ImportDataConverter(dataArray[2]);
		arenaComplete = ImportDataConverter(dataArray[3]);
		junkyardComplete = ImportDataConverter(dataArray[4]);
		orchardComplete = ImportDataConverter(dataArray[5]);
		lighthouseComplete = ImportDataConverter(dataArray[6]);
		nunsComplete = ImportDataConverter(dataArray[7]);
		farmComplete = ImportDataConverter(dataArray[8]);
		junkyardTool = ImportDataConverter(dataArray[9]);
		junkyardLocation = ImportDataConverter(dataArray[10]);
		active = 'started';

		//Write new data to important places
		MaybeQueueWrite();
		
		//Create the import complete notification page element
		var newElement = document.createElement('tr');
		newElement.innerHTML = '<tr><td><div style="font-size: 80%;width: 50%;text-align:right;float:left">Import Complete!&nbsp;</div><div style="font-size:9px;font-family:arial;width:50%;text-align:left;float:right"><a href="bigisland.php">island</a></div></td></tr>';

		//insert it at the top of the page
		AddToTop(newElement,document);

		//Remove the old data from the quest notes
		noteText = noteText.replace(/%BCDATA%.*%BCDATA%/g,'');
		newTextNode = document.createTextNode(noteText);
		noteTextNode.parentNode.replaceChild(newTextNode,noteTextNode);

		//Submit the form to save the notes
		document.getElementsByName("f")[0].submit()
	}
	else {
		alert('No data present in quest notes.  Cannot import.  Tough luck.');
	}

}

//Removes old script data from the notes
function RemoveExportedData() {
	noteTextNode = document.evaluate("//TEXTAREA[@name='notes']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	noteText=noteTextNode.data;

	if(noteText && noteText.match("%BCDATA%.*%BCDATA")) {
		//Remove the old data from the quest notes
		noteText = noteText.replace(/%BCDATA%.*%BCDATA%/g,'');
		newTextNode = document.createTextNode(noteText);
		noteTextNode.parentNode.replaceChild(newTextNode,noteTextNode);

		//Submit the form to save the notes
		document.getElementsByName("f")[0].submit()
	}
}

//Callback from the button on the quest notes page.
//Manually updates the hippy and fratboy counts if valid values have been entered.
function ManualCounterUpdate() {
	var fratboyText = document.getElementById('fratboyText');
	var hippyText = document.getElementById('hippyText');

	if(fratboyText && hippyText) {
		var fratboyValue = parseInt(fratboyText.value,10);
		var hippyValue = parseInt(hippyText.value,10);
		
		if(!isNaN(fratboyValue) && !isNaN(hippyValue) && (fratboyValue >= 0) && (fratboyValue <= 1000) && (hippyValue >= 0) && (hippyValue <= 1000)) {
			deadHippies = hippyValue;
			deadFratboys = fratboyValue;

			MaybeQueueWrite();

			//Redirect to the quest notes to provide feedback to the user that something actually happened.
			window.location = window.location;
		}
		else {
			alert("Invalid values entered");
		}	
	}
}

//gets the value of the specified variable, then returns the shortened version 
function ExportDataConverter(varToConvert) {
	switch(varToConvert) {
		case 'no': return 'N';break;
		case 'yes': return 'Y';break;
		case 'frat': return 'F';break;
		case 'hippy': return 'H';break;
		case 'unknown': return 'U';break;
		case 'hammer': return 'h';break;
		case 'screwdriver': return 's';break;
		case 'wrench': return 'w';break;
		case 'pliers': return 'p';break;
		case 'next to that barrel with something burning in it': return 'b';break;
		case 'near an abandoned refrigerator': return 'f';break;
		case 'over where the old tires are': return 't';break;
		case 'out by that rusted-out car': return 'c';break;
		case 'yossarian': return 'y'; break;
		case 'started': return 'S'; break;
		case 'complete': return 'C'; break;
		default: return (''+varToConvert);
	}
}

//Passed the shortened value, returns the full value
function ImportDataConverter(varToConvert) {
	switch(varToConvert) {
		case 'N':return 'no';break;
		case 'Y':return 'yes';break;
		case 'F':return 'frat';break;
		case 'H':return 'hippy';break;
		case 'U':return 'unknown';break;
		case 'h':return 'hammer';break;
		case 's':return 'screwdriver';break;
		case 'w':return 'wrench';break;
		case 'p':return 'pliers';break;
		case 'b':return 'next to that barrel with something burning in it';break;
		case 'f':return 'near an abandoned refrigerator';break;
		case 't':return 'over where the old tires are';break;
		case 'c':return 'out by that rusted-out car';break;
		case 'y':return 'yossarian';break;
		case 'S':return 'started';break;
		case 'C':return 'complete';break;
		default:return parseInt(varToConvert,10);
	}
}

//insert an element at the top of the page, but under the combat bar if present
function AddToTop(newElement,refDocument) {
	var fightElement = refDocument.evaluate('//b[contains(.,"Combat") and contains(.,"!")]/ancestor::tr[1]',refDocument,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (fightElement) {
		fightElement.parentNode.insertBefore(newElement,fightElement);
	}
	else {
		var element = refDocument.getElementsByTagName("tr")[0];
		if (element && element.parentNode) {
			element.parentNode.insertBefore(newElement,element);
		}
	}
}

//auto-update checking code
function CheckForUpdates() {
	var scriptUrl = 'http://userscripts.org/scripts/source/11720.user.js';

	var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
	var curTime = new Date().getTime();
	if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck,10) < (curTime - 86400000))) {
		GM_setValue('lastUpdateCheck',''+curTime);
		GM_xmlhttpRequest({method: 'GET',url: scriptUrl,
					onload: function(responseDetails) {
						var bodyText = responseDetails.responseText;
						var matches = bodyText.match(/const VERSION=([\d\.]+);(\s+const RELEASECOMMENT='(.*)';)?/);
						var curVersionNum = parseFloat(matches[1]);
						//GM_log('fetched script version: '+curVersionNum);
						if (matches[3] && matches[3] != '') {
							GM_setValue('releaseComment',matches[3]);
						}
						else {
							GM_setValue('releaseComment','');
						}
						//if (curVersionNum > VERSION) {
						if ((curVersionNum > VERSION) && (curVersionNum != 28)) {
							GM_setValue('outOfDate','true');
						}
						else {
							GM_setValue('outOfDate','false');
						}
					}
				});
	}
	var curVersion = GM_getValue('curVersion','0');
	if (parseFloat(curVersion) != VERSION) {
		GM_setValue('curVersion',''+VERSION);
		GM_setValue('outOfDate','false');
	}
	//Nag user with update link if the script is out of date
	var outOfDate = GM_getValue('outOfDate');
	if((outOfDate == 'true') && (window.location.pathname != "/charpane.php") && (window.location.pathname != "/login.php") && (window.location.pathname != "/topmenu.php") && (window.location.pathname != "/compactmenu.php") ) {
		var releaseComment = GM_getValue('releaseComment','');
		var newElement = document.createElement('center');
		newElement.innerHTML = '<table style="border: 1px solid red; margin-bottom: 4px; color: red; font-size:85%" width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=red style="color:white;">A new version of the Battlefield Counter is available!</td></tr><tr style="color:red;"><td><a href="'+scriptUrl+'" target="_blank">Update</a>&nbsp;&nbsp;<a href="http://forums.kingdomofloathing.com:8080/vb/showthread.php?t=141472">Forum thread</a>&nbsp;&nbsp;' + ((releaseComment!='')?('Release notes:&nbsp;'+releaseComment):'') + '</td></tr></table>';

		//insert the counter at the top of the page
		AddToTop(newElement,document);
	}
}

//Finds and returns the cached data in the top frame
//If the data is not found, returns 'missing'
function ReadTopCache() {
	if ((getGlobalValue('top.buttoncache')=='') || (getGlobalValue('top.buttoncache.BCDATA'))=='') {
		return 'missing';
	}
	else {
		var tmp = getGlobalValue('top.buttoncache.BCDATA');
		return tmp;
	}
}

//Uses the global variables to form a data string, then writes it to the data cache in the top frame
function WriteTopCache() {
	var resultingDataString = BuildDataString();
	//alert("resulting data string:\n"+resultingDataString);

	if (getGlobalType('top.buttoncache') != 'object') {
		//GM_log("Trying to write to non-existant cache");
	}
	else {
		location.href = 'javascript:void(top.buttoncache.BCDATA = "'+resultingDataString+'")';
		if (unsafeWindow.top.buttoncache) {
			unsafeWindow.top.buttoncache.BCDATA = resultingDataString;
		}
	}
}

//Checks if the current data is different from that in the top frame.
//If it is, write the new data to the top frame and queue a JSON write.
function MaybeQueueWrite() {
	var newDataString = BuildDataString();
	var cachedDataString = ReadTopCache();
	
	//GM_log("newDataString: "+newDataString+"\ncachedDataString: "+cachedDataString+"\ndataIsNew: "+dataIsNew);
	
	if ((newDataString != cachedDataString) || (dataIsNew == 'true')) {
		//Data is different or last write didn't happen and >5 seconds have passed, write it to the top cache and the JSON object
		WriteTopCache();
	
		//Queue a JSON object write
		//GM_log("queueing a JSON write");
		location.href = 'javascript:void(top.needsJsonWrite = "true")';
		unsafeWindow.top.needsJsonWrite = "true";
		//GM_log("Trace point 7, true/null");

		//If the writingJson variable isn't yet properly set, set it now to false.
		var writingTemp = getGlobalValue('top.writingJson');
		//GM_log("top.writingJson: "+writingTemp);
		if ((writingTemp != "false") && (writingTemp != "true")) {
			location.href = 'javascript:void(top.writingJson = "false")';
			unsafeWindow.top.writingJson = "false";	
			//GM_log("Trace point 8, null/false");		
		}
	}
}

//Uses a BCDATA string to set the values of the global variables
function DataStringToGlobals(dataString) {
	if (!ValidateDataString(dataString)) {
		alert("BCDATA string corrupted.  Terminating battlefield counter");
		return false;
	}
	var dataArray = dataString.split(";");

	//save all variables
	deadHippies = ImportDataConverter(dataArray[0]);
	deadFratboys = ImportDataConverter(dataArray[1]);
	nunsMeat = ImportDataConverter(dataArray[2]);
	arenaComplete = ImportDataConverter(dataArray[3]);
	junkyardComplete = ImportDataConverter(dataArray[4]);
	orchardComplete = ImportDataConverter(dataArray[5]);
	lighthouseComplete = ImportDataConverter(dataArray[6]);
	nunsComplete = ImportDataConverter(dataArray[7]);
	farmComplete = ImportDataConverter(dataArray[8]);
	junkyardTool = ImportDataConverter(dataArray[9]);
	junkyardLocation = ImportDataConverter(dataArray[10]);
	active = ImportDataConverter(dataArray[11]);
}

//Checks that a BCDATA string contains valid data.  Pretty regex, isn't it?
function ValidateDataString(dataString) {
	if (dataString.match(/^\d{1,4};\d{1,4};\d{1,6};([NFH];){6}[Uhswp];[Ubftcy];[NSC]/)) {
		return true;
	}
	else {
		return false;
	}
}

//Takes the current values of the global variables, and makes a BCDATA string out of them.
function BuildDataString() {
	var resultingDataString = 	ExportDataConverter(deadHippies) + ';'
		+ ExportDataConverter(deadFratboys) + ';'
		+ ExportDataConverter(nunsMeat) + ';'
		+ ExportDataConverter(arenaComplete) + ';'
		+ ExportDataConverter(junkyardComplete) + ';'
		+ ExportDataConverter(orchardComplete) + ';'
		+ ExportDataConverter(lighthouseComplete) + ';'
		+ ExportDataConverter(nunsComplete) + ';'
		+ ExportDataConverter(farmComplete) + ';'
		+ ExportDataConverter(junkyardTool) + ';'
		+ ExportDataConverter(junkyardLocation) + ';'
		+ ExportDataConverter(active);
	return resultingDataString;
}

//Should ideally be called once per top frame load, and only then.  Nonetheless, I am designing it to be safe and safely reusable.
function LoadButtonCache() {
	if(getGlobalValue('top.buttoncache')=='') {
		GM_log("Dynamically loading button cache");
		
		var pleaseWaitNode = top.frames[2].document.evaluate('.//div[@id="pleasewait"]',top.frames[2].document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (!pleaseWaitNode) {
			var pleaseWaitNode = top.frames[2].document.createElement('tr');
			pleaseWaitNode.innerHTML = '<tr><td><div style="font-size: 80%;width: 100%;text-align:center" id="pleasewait"><i>Caching JSON data, please wait...</i></div></td></tr>';
			AddToTop(pleaseWaitNode,top.frames[2].document);
		}

		//Attempt to read JSON object
		url = 'http://' + document.location.host + '/actionbar.php?action=fetch';
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers: {'Cookie' : phpSessIdString},
			onload:function(response) {
				if (response.status==200) {
					responseText = response.responseText;

					//Because of a bug I reported where the initial JSON string is invalid
					if (responseText == '{whichpage:0,pages:[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]]}') {
						responseText = '{"whichpage":0,"pages":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]]}'; 
					}

					cabObject = JSON.parse(responseText);
					if(!cabObject) {
						GM_log('JSON CAB object invalid, generating new');
						cabObject = JSON.parse('{"whichpage":0,"pages":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]]}');
					}
					//Restringifying the object from the parsed version to make sure it's safe for eval
					cabObjectString = JSON.stringify(cabObject);

					//GM_log("Re-stringified object:\n"+cabObjectString);

					//Recheck to make sure that another script has not loaded in top.buttoncache
					if(getGlobalValue('top.buttoncache')=='') {
						//Use the location hack to set the global variable top.buttoncache
						location.href = 'javascript:void(top.buttoncache = eval(' + cabObjectString + '))';
						unsafeWindow.top.buttoncache = eval('('+cabObjectString+')');
					}

					//Remove the please wait node from the page
					pleaseWaitNode = top.frames[2].document.evaluate('.//div[@id="pleasewait"]',top.frames[2].document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					if(pleaseWaitNode && pleaseWaitNode.parentNode) {
						pleaseWaitNode.parentNode.removeChild(pleaseWaitNode);
					}
				}
				else {
					//retry
					GM_log("non-200 status on JSON request, retrying",0);
					LoadButtonCache();
				}
			},
			onerror:function(response) {
				//retry
				GM_log("error on JSON request, retrying",0);
				LoadButtonCache();
			}
		});
	}
}

//Function to set up the getGlobalValue function, because I don't want this ugly stuff at the top of the script
function SetGetGlobalValue() {
	getGlobalValue = function (name) {
		var tmp = eval("unsafeWindow."+name);
		if ((tmp == null)||(typeof(tmp) == 'undefined')) {
			return '';
		}
		else {
			return tmp;
		}
	}
	getGlobalType = function (name) {
		var tmp = eval("unsafeWindow."+name);
		return typeof(tmp);
	}
}

function GetPHPSessIdString() {
	var allCookies = document.cookie;
	var cookieMatch = allCookies.match(/(.*;)?(PHPSESSID=[^,;\s]+)(;.*)?/);
	//for (var i in cookieMatch) {
	//	GM_log("cookieMatch["+i+"]: "+cookieMatch[i]);
	//}
	if(cookieMatch[2]) {
		return cookieMatch[2];
	}
	else {
		return '';
	}
}


//Whole number, 1-n, inclusive
function rand ( n )
{
  return ( Math.floor ( Math.random ( ) * n + 1 ) );
}

//JSON parser and stringifier implementation
//Minified version of http://json.org/json2.js
//Stored in a function because I don't want this ugly stuff at the top of my script.
function ImplementJSON() {
	if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
	Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
	f(this.getUTCMonth()+1)+'-'+
	f(this.getUTCDate())+'T'+
	f(this.getUTCHours())+':'+
	f(this.getUTCMinutes())+':'+
	f(this.getUTCSeconds())+'Z';};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
	c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
	(c%16).toString(16);})+'"':'"'+string+'"';}
	function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
	if(typeof rep==='function'){value=rep.call(holder,key,value);}
	switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
	gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
	v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
	if(typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
	v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
	return{stringify:function(value,replacer,space){var i;gap='';indent='';if(space){if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}}
	if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined;}
	return value;};}else if(typeof replacer==='function'||(typeof replacer==='object'&&typeof replacer.length==='number')){rep=replacer;}else{throw new Error('JSON.stringify');}
	return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
	return reviver.call(holder,key,value);}
	if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
	throw new SyntaxError('JSON.parse');},quote:quote};}();}
}