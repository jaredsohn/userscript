// ==UserScript==
// @name           Travian QP Targets
// @version        2.8.1
// @namespace      QP
// @description    Simplifies lots of Travian tasks - v2.8.1
// @include        http://s*.travian*.*/dorf1.php*
// @include        http://s*.travian*.*/dorf2.php*
// @include        http://s*.travian*.*/dorf3.php*
// @include        http://s*.travian*.*/nachrichten.php*
// @include        http://s*.travian*.*/berichte.php*
// @include        http://s*.travian*.*/karte.php*
// @include        http://s*.travian*.*/a2b.php*
// @include        http://s*.travian*.*/allianz.php?s=2&t=*
// @include        http://s*.travian*.*/spieler.php*
// @include        http://s*.travian*.*/build.php*
// @include        http://s*.travian*.*/statistiken.php*
// ==/UserScript==
// Included pages: Dorfs, Msgs, Reports, inside other Villages, sendTroops[Confirmation], Ingame Alliance Forum, Profile Overview, Buildings, Statistics


/** Presentation info
----- Small description -----
<i>Quick</i> Scout / Fake / Hero / Farm<br>Delayed Send Troops<br><i>Plus</i> features<br>Message Autolinks<br><i>Enhanced</i> Rally Point / Market / Residence / Palace<br>Field / Building Levels<br>Quick Delete Reports<br>..<br>All langs & servers
----- Full description -----
<h3>Features</h3>
<h2>Quick Target Features</h2>
<ul>
	<li>Quick Scout - <img src="" alt="binoculars icon"/> - sends scouts to village (configurable)</li>
	<li>Quick Fake - <img src="" alt="attack icon"/> - sends fake to village (configurable)</li>
	<li>Quick Farm - farms village on scout report (ingame configurable)</li>
	<li>Quick Hero - hero raids oasis - useful for conquering and early hero leveling</li>
</ul>
<h2>Report List Features</h2>
<ul>
	<li>Select all messages checkbox - like Plus</li>
	<li>Next Page Shortcut Key - SPACE</li>
	<li>Auto Report Delete per report type - 1 click deletes all report of that type</li>
</ul>
<h2>Message List Features</h2>
<ul>
	<li>Select all messages checkbox - like Plus</li>
	<li>Next Page Shortcut Key - SPACE</li>
</ul>
<h2>Messages / Ingame Forum Messages Features</h2>
<ul>
	<li>Coordinates Link To Target - ingame format coordinates: X|Y link to the target map location</li>
	<li>URIs Link To URIs - useful for user, alliance, reports, ...</li>
</ul>
<h2>Dorf1 - Resource Fields</h2>
<ul>
	<li>Resource Field Levels color coded (max'ed out / upgradeable / not upgradeable / )</li>
</ul>
<h2>Dorf2 - Inner City - Buildings</h2>
<ul>
	<li>Building Levels color coded (max'ed out / upgradeable / not upgradeable / )</li>
</ul>
<h2>Rally Point Features</h2>
<ul>
	<li>Village Troops Total - wherever they are</li>
	<li>Troop Group Links - jump to "troop the the way" or others</li>
	<li>Village Reinfs Away Coordinates</li>
</ul>
<h2>Marketplace Send Resources Features</h2>
<ul>
	<li>Overflow/Depletion Times  - considering arriving all mercs</li>
	<li>Cumulative Resource Arrival (with times) - considering arriving all mercs</li>
	<li>Merchants Used - changing the resources to send shows merchants needed and the excess/available load</li>
	<li>Autocomplete - like Plus, auto completes own village names</li>
	<li>SendResourcesConfirmation - send to self autofocuses on ok (hit enter)</li>
	<li>Market Easy Send Resource Quantities (times 0, plus times 2, plus times 5)</li>
</ul>
<h2>Hero's Mansion Features</h2>
<ul>
	<li>Complete Hero Status</li>
</ul>
<h2>Residence / Palace Culture Points Features</h2>
<ul>
	<li>Total Villages available</li>
	<li>Time for next villages</li>
</ul>
<h2>Send Troops Features</h2>
<ul>
	<li>Delayed Send Troops - send attack after X time (needs improved interface)</li>
	<li>Autocomplete - like Plus, auto completes own village names</li>
</ul>
<h2>All Pages</h2>
<ul>
	<li>Title fix - put page header on title (on tab)</li>
	<li>Current village resources production</li>
	<li>Current village resources overflow/deplete timers</li>
</ul>
<h2>Single Village Features</h2>
<ul>
	<li>Adds Village List - usefull internally (and more, see instructions)</li>
</ul>
<h2>Statistics</h2>
<ul>
	<li>WW Village coords</li>
</ul>
<h2>Treasury</h2>
<ul>
	<li>Contruction Plan Village holder coords</li>
</ul>

<h3>Instruction details</h3>
<ul>
	<li>Dorf1 - Resource Field Levels color code
		<ul>
			<li>Green - max level achieved</li>
			<li>Yellow - upgradeable building with current resources</li>
			<li>Red - lack of resources to upgrade building (considers resources on page load)</li>
		</ul>
	</li>
	<li>Dorf2 - Inner City Building Levels color code
		<ul>
			<li>Green - max level achieved</li>
			<li>Yellow - upgradeable building with current resources</li>
			<li>Red - lack of resources to upgrade building (considers resources on page load)</li>
		</ul>
	</li>
	<li>Rally Point Village Total Troops
		<ul>
			<li>Additional table at the top of the Rally point (above the "overview | send troops | simulator" links)
			with the total of troops from this town, no matter where they are at the moment.</li>
		</ul>
	</li>
	<li>Message Text to Links
		<ul>
			<li>Coordinates to Link: ingame coordinates format only (just copy paste from profile): X|Y</li>
			<li>URI to Link: complete URI only. Accepted format: something before :// and then until
			a space or minor (a <br/> is placed automatically at the end of a line). (regex: w+://[^s<] )</li>
		</ul>
	</li>
	<li>Auto Report Delete
		<ul>
			<li>Click the button in the new table for the report type you want to delete</li>
			<li>This will try indefinitely to delete all reports until it reaches an empty reports page.</li>
			<li>As a result, if it is interrupted for any reason, the next time the script is active in a reports
				list page, the script will resume this deleting all reports of the type you were now seeing.</li>
			<li>If this happens, disable the script, go to the report type you wanted to delete, activate
				the script, and press again in the report type you wanted to delete</li>
		</ul>
	</li>
	<li>Quick Scout / Quick Fake / Quick Hero
		<ul>
			<li>on village links, the icons appear, just press and there they go</li>
			<li>if no available troops, troop sending is canceled on SendTroopsPage</li>
			<li>for now only configurable in the script (at the end, in the "CONFIG" vars)</li>
		</ul>
	</li>
	<li>Quick Farm
		<ul>
			<li>Appears on scout reports (resource scout reports)</li>
			<li>Raid/Attack pre-selection: raid = romans/teutons; attack = gauls (in case there are traps)</li>
			<li>Troop amounts pre-selection: based on resources available with extra carrying space (...)</li>
		</ul>
	</li>
	<li>Quick Target Features
		<ul>
			<li>Multitabbing
				<ul>
					<li>different targets: send troops simultaneously (while other tabs still processing)</li>
					<li>same target: send troops one after the other (send,	wait for all redirections, send next, ...)</li>
				</ul>
			</li>
			<li>notice that sending a lot of troops in multiple tabs at the same time may slow the browser a little... yeah, don't send 50 at the same time :P</li>
		</ul>
	</li>
	<li>Delayed Send Troops
		<ul>
			<li>Set the arrival time, press the clock and the seconds to attack will appear</li>
			<li>Interface needs improving</li>
			<li>This is not exact... timeout skew, server delays...</li>
		</ul>
	</li>
	<li>MarketPlace
		<ul>
			<li>Resources Overflow/Depletion
				<ul>
					<li>the script tries to understand which resources are arriving or are own merchants on the way</li>
					<li>once understood, that info is saved and the script will always be able to distinguish them</li>
					<li>easiest for the script to learn: make a trade (other town mercs arriving AND own merchants on the way)</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>Complete Hero Status
		<ul>
			<li>total kills needed for current level</li>
			<li>total kills needed for next level</li>
			<li>kills done for current level</li>
			<li>kills needed to get to the next level</li>
			<li>on mouse over of the "kills done on this level" cell, you get the total kills done</li>
		</ul>
	</li>
	<li>Single Village
		<ul>
			<li>visit the profile page to retrieve the name and coords of the village</li>
			<li>visit the dorf3 (Use the "Villages" link) to get the proper village id</li>
			<li>useful for getting to dorf3 early on</li>
			<li>useful for other features in this script</li>
			<li>usefull to activate scripts that only work on multiple villages</li>
			<li>remember to make sure this script is above all scripts that may need this</li>
		</ul>
	</li>
	<li>Configurable variables
		<ul>
			<li>some features can be enabled / disabled / changed by using the variables at the very end of the script</li>
		</ul>
	</li>
</ul>

<h3>To Do</h3>
<ul>
	<li>Possible future features
		<ul>
			<li>Improve Timers (lightweight timers - not sure how to test - increase load?) (30 - 900 - 5 - 60 - 1)</li>
			<li>Auto Avoid Attack - move troops away and cancel them to return after an attack (time configurable)</li>
		</ul>
	</li>
	<li>Features to be added
		<ul>
			<li>Quick Farm - improve interface (now it is using english words)</li>
			<li>Quick Targets - ingame fully configurable: quantities / attack types / cata targets</li>
			<li>Target "Info" History - save "info" lines from attacks (ingame erasable) to display... somewhere (village link mouse-over?)</li>
			<li>Quick Targets - if not enough troops, stop redirections at send troops confirmation (for a few seconds with cancel button?)</li>
			<li>Incoming Attack Slowest Unit Calculation</li>
			<li>MarketPlace, SendResourcesPage: show each cumulative Arriving Totals per merchant arrival in scrolable table</li>
			<li>Plus Feature: Archive IGMs/Reports</li>
			<li>Plus Feature: Notes</li>
			<li>Delayed Send Troops: Hop village in background so that you can prepare multiple attacks from multiple villages</li>
			<li>Rally Point: Text to clipboard with the incoming attacks, town, granary, crop prod, curr crop,...</li>
			<li>Improve general performance ( specially main ) </li>
			<li>Add a mailing list possibility to send IGMs to multiple people</li>
			<li>Add retrieve all reinforcement reports to a exportable format and put it in QP clipboard</li>
			<li>TimeToBuild based on current and production resources</li>
			<li>Market Send Resource Timers: when on negative production, add the possibility of the arriving resource maxing out the capacity - the rest it wasted</li>
			<li>Market Send Resource: limit total resources sent to current merchants in town</li>
		</ul>
	</li>
	<li>Requests
		<ul>
			<li>Update this with posts information</li>
		</ul>
	<li>Known bugs
		<ul>
			<li>delayed send troops timer may show strange values, but sends on time</li>
			<li>--- Currently none ---</li>
		</ul>
	</li>
</ul>

<h3>History</h3>
<ul>
	<li>2.8.1 - 08-04-07
		<ul>
			<li>bugfix: Hopefully fixes the problem of report deletion on new script installs</li>
		</ul>
	</li>
	<li>2.8.0 - 08-04-07
		<ul>
			<li>added: Villages available for current Culture Points at Residence/Palace CP pages</li>
			<li>improved: Rally Total Troops Table - general overall cleanup/improvement</li>
		</ul>
	</li>
	<li>2.7.0 - 08-04-05
		<ul>
			<li>*added: All types of Automatic Report Delete</li>
			<li>bugfix: Title fix option 2 wasn't doing anything in last release</li>
		</ul>
	</li>
	<li>Previous history inside script</li>
</ul>


<h3>Generic script goals</h3>
<ul>
	<li>simplify some tasks - repetitive tasks; too-many-steps tasks; ... </li>
	<li>no support for other browsers - using of firefox GM_set/GM_get to save permanent info</li>
	<li>no need for language translations - simple new icons OR words/icons from travian</li>
	<li>low priority on Plus support - Plus users already have benefits over others</li>
	<li>ultra low priority on country specific HTML support - some travian servers have changed HTML in the game</li>
</ul>

<h3>Script problems?</h3>
<ul>
	<li>Instructions for newbies
		<ul>
			<li>Install <a href="http://www.firefox.com">FireFox</a> most recent stable version</li>
			<li>Install <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a> Addon for FireFox</li>
			<li>Install <a href="http://userscripts.org/scripts/show/13471">QP Targets</a> most recent version</li>
		</ul>
	</li>
	<li>Firefox 3 BETA x
		<ul>
			<li>As long as FF3 is not final do not report any bugs please.</li>
			<li>FF 3 beta (4) seems to have a problem with showing HTML so there are bound to be problems with scripts.</li>
		</ul>
	</li>
	<li>Bugs / problems / etc...
		<ul>
			<li>Try the following:
				<ul>
					<li>Disable other GM scripts (for incompatibilities)</li>
					<li>Check the Error Console - Tools, Error Console (for added info)</li>
					<li>Change the DEBUG_VERBOSITY level down to DBG_LOWEST (for maximum possible info)</li>
				</ul>
			</li>
			<li>If the problem still exists please give me the following information:
				<ul>
					<li>Browser used, including version</li>
					<li>Script version</li>
					<li>Travian server where you see the problem</li>
					<li>Describe the problem the best you can</li>
					<li>Information from the Error Console you believe can help</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
*/


/** Older Info
----- Previous Small description -----
Quick Scout<br>Quick Fake<br>Quick Hero<br>Quick Farm<br>Delayed Send Troops<br><i>Plus</i> features<br>Message coordinates (auto-links to target)<br>Enhanced Rally Point<br/>1-click Delete All Trade Msgs<br>..<br>All langs & servers
----- Previous History -----

<ul style="display:none">
	<li>2.6.0 - 08-04-05
		<ul>
			<li>added: Title fix now has the option to show only the current page name</li>
			<li>improved: Resource Field Levels are now links to make it easier</li>
			<li>improved: Quick Links now do not show on own village list</li>
		</ul>
	</li>
	<li>2.5.1 - 08-04-04
		<ul>
			<li>improved: Resource Field Levels with color codes - level 0 with color, bugfixed, only capital lvl10 will still be green</li>
		</ul>
	</li>
	<li>2.5.0 - 08-04-03
		<ul>
			<li>added: Resource Field Levels with color codes - level 0 still no color code and capital not considered</li>
			<li>improved: checking if a page is a market place page is now more restrictive</li>
		</ul>
	</li>
	<li>2.4.1 - 08-03-28
		<ul>
			<li>improved: uncomment Title Fix and moved its config variable to the config zone (at the end)</li>
		</ul>
	</li>
	<li>2.4.0 - 08-03-27
		<ul>
			<li>added: Treasury Village Coords - only on the "karte.php?d=" links</li>
			<li>improved script interoperability</li>
			<ul>
				<li>improved: WW Statistics Village coords - only on the "karte.php?d=" links</li>
				<li>improved: village targets - variable configurable</li>
				<li>improved: resources info</li>
			</ul>
		</ul>
	</li>
	<li>2.3.0
		<ul>
			<li>added: WW Statistics Village coords</li>
			<li>added: Market Easy Send Resource Quantities (times 0, times 2, times 5)</li>
			<li>improved: @include so that profile pages, after changing town still have the script</li>
			<li>bugfix: Hero Mansion Status info - was using previous level total kills instead of current one</li>
		</ul>
	</li>
	<li>2.2.0
		<ul>
			<li>added: Hero Mansion Status info</li>
			<li>improved: resource timers now show ∞ when applicable (eg.: 0 production, ...)</li>
			<li>bugfix: fixed market resource timers for still a couple extra cases</li>
			<li>bugfix: fixed bug on page after send resources confirmation - script break on that page</li>
		</ul>
	</li>
	<li>2.1.0
		<ul>
			<li>added: update Used merchants also on press resource which max's resource to send</li>
			<li>improve: get resources info only once and use it everywhere it is needed</li>
			<li>bugfix: RallyPoint - when warehouse >100k, resources info is in different place in page</li>
			<li>bugfix: SendResources Timers - when overflow the numbers were wrong</li>
			<li>bugfix: fixed all resources related timers</li>
		</ul>
	</li>
	<li>2.0.0
		<ul>
			<li>added: send resources confirmation - autofocus on Ok button if your towns are the destination</li>
			<li>added: inner building levels red color if can't be upgraded</li>
			<li>improved: performance on quick fake/scout - removed resource prod/overflow/deplete from showing there</li>
			<li>bugfix: SendResourcesTotals - sending resources twice in a row would show NaN on the totals</li>
		</ul>
	</li>
	<li>1.9.0
		<ul>
			<li>added: autocomplete destination village like Plus (send troops and resources)</li>
			<li>bugfix: autolinks fixed for: smiles in InGame forum using graphic pack</li>
		</ul>
	</li>
	<li>1.8.0
		<ul>
			<li>improved: re-written main function increasing readability and overall performance</li>
			<li>improved: some features now also work after changing village (eg. links in IGMs)</li>
			<li>improved: corrected presentation html and hiden older history (still in script)</li>
		</ul>
	</li>
	<li>1.7.0
		<ul>
			<li>added: Granary/Warehouse overflow/deplete on all pages</li>
			<li>improved: time to overflow/deplete now considers the possibility of 0 production (crop)</li>
			<li>improved: Quick Hero now on owned oasis also - simplifies conquering owned ones</li>
			<li>bugfix: corrected char for bullet village list for the Single Village Feature</li>
		</ul>
	</li>
	<li>1.6.0
		<ul>
			<li>added: shortcut key "SPACE" for "»" links - next page on message/report list pages</li>
		</ul>
	</li>
	<li>1.5.0
		<ul>
			<li>bugfix: Quick Farm was getting the last village link in the page (Plus users that had put farm links on the links part would get the last village link from there)</li>
			<li>improved: include map/inside other village pages after changing village (Plus users)</li>
		</ul>
	</li>
	<li>1.4.0
		<ul>
			<li>added: Timers now show the decreasing value</li>
		</ul>
	</li>
	<li>1.3.1
		<ul>
			<li>bugfix: support for servers "travian3" (partially tested succesfully)</li>
		</ul>
	</li>
	<li>1.3.0
		<ul>
			<li>added: support for servers that are called travian3 instead of travian</li>
			<li>added: dorf2 building levels with max level indication</li>
			<li>bugfix: reworked main function fixed at least: Rally point features not working on single village accounts</li>
		</ul>
	</li>
	<li>1.2.0
		<ul>
			<li>added: Quick Targets - if NO troops (from the selected ones) cancel sending at SendTroopsPage</li>
			<li>added: Quick Hero on oasis</li>
			<li>improved: internals: is send troops confirmation page</li>
		</ul>
	</li>
	<li>1.1.0
		<ul>
			<li>added: Quick Farm allows sending hero</li>
			<li>added: MarketPlace, Send Resources Page: add Arriving Totals and Time of Arrival</li>
			<li>added: MarketPlace, Send Resources Page: Merchants Used and available load in last merchant</li>
			<li>bugfix: Delayed Send Troops: didn't show travel time in the new row for scout/cata attacks</li>
			<li>bugfix: Quick Fake cata targets were not being used (it was always 1 target random)</li>
		</ul>
	</li>
	<li>1.0.0
		<ul>
			<li>improved: completed marketplace table with time to overflow/deplete considering ALL arriving mercs</li>
			<li>improved: finished Delayed Send Troops interface</li>
		</ul>
	</li>
	<li>0.9.1
		<ul>
			<li>improved: Target "Info" History: internally only, not yet releasable</li>
			<li>bugfix: Single Village Accounts: building time doesn't show to be decreasing</li>
		</ul>
	</li>
	<li>0.9.0
		<ul>
			<li>added: BETA: marketplace table with time to overflow/deplete considering mercs (from other accounts)</li>
			<li>added: autoLink for URIs in the IGMs/ingame forum</li>
			<li>improved: delayed send troops now shows the seconds to the attack in hh:mm:ss format, not yet counting down</li>
			<li>improved: select all checkboxes (were creating a new cell in some servers)</li>
			<li>improved: rally point now always shows the totals table, even if no troops away (uniformization and possible future uses)</li>
			<li>improved: internals: debug info workings; is rally point and marketplace functions</li>
			<li>bugfix: rally point troop totals when hero is not at the 1st table</li>
			<li>bugfix: rally point troop totals double counting reinfs at/going to own village's oasis</li>
		</ul>
	</li>
	<li>0.8.0
		<ul>
			<li>first pre-release</li>
		</ul>
	</li>
</ul>
*/


/**
Internals: Coordinates, Distances, Universal Troops Move,
CATAPULT TARGET
			<option value="0"></option>
			<option value="99">Random</option>
			<option value="1">Woodcutter</option>
			<option value="2">Clay Pit</option>
			<option value="3">Iron Mine</option>
			<option value="4">Cropland</option>
			<option value="5">Sawmill</option>
			<option value="6">Brickyard</option>
			<option value="7">Iron Foundry</option>
			<option value="8">Grain Mill</option>
			<option value="9">Bakery</option>
			<option value="10">Warehouse</option>
			<option value="11">Granary</option>
			<option value="12">Blacksmith</option>
			<option value="13">Armoury</option>
			<option value="14">Tournament Square</option>
			<option value="15">Main Building</option>
			<option value="16">Rally Point</option>
			<option value="17">Marketplace</option>
			<option value="18">Embassy</option>
			<option value="19">Barracks</option>
			<option value="20">Stable</option>
			<option value="21">Workshop</option>
			<option value="22">Academy</option>
			<option value="24">Town Hall</option>
			<option value="25">Residence</option>
			<option value="26">Palace</option>
			<option value="27">Treasury</option>
			<option value="28">Trade Office</option>
			<option value="29">Great Barracks</option>
			<option value="30">Great Stable</option>
			<option value="37">Hero's Mansion</option>

			<option value="31">City Wall</option>
			<option value="32"></option>
			<option value="33"></option>
			<option value="34"></option>
			<option value="35"></option>
			<option value="36"></option>
			<option value="38"></option>
			<option value="39"></option>
*/









// event listener starts things off once the page is done loading
window.addEventListener("load", function () {

//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
var V = QPcurrentTimeSecs();	// shouldn't this be in MILIS ?????
var l = new Object();
var O = 0;
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================




//   ==========   DEBUG STATICS   ==========
// 0 - GM_log ; else NOTHING
var DEBUG_STATE_PRODUCTION = -1;
var DEBUG_STATE_GM_LOG = 0;

var DBG_HIGHEST = 1;
var DBG_HIGH = 2;
var DBG_NORMAL = 3;
var DBG_LOW = 4;
var DBG_LOWEST = 5;

var DEBUG_STATE = DEBUG_STATE_GM_LOG;
var DEBUG_VERBOSITY = DBG_HIGHEST;

GM_log("START: DEBUG_STATE " + DEBUG_STATE + " DEBUG_VERBOSITY " + DEBUG_VERBOSITY);
//   ==========   DEBUG STATICS   ==========


var DEF_CATATARGET_RANDOM = 99;
var DEF_CATATARGET_NONE = 0;

var DEF_ATTACKTYPE_REINFORCE = 2;
var DEF_ATTACKTYPE_ATTACK = 3;
var DEF_ATTACKTYPE_RAID = 4;

var DEF_SCOUTTYPE_RESOURCES = 1;
var DEF_SCOUTTYPE_DEFENSES = 2;

var DEF_UNDERSCORE = "_";
// Keys that depend on villageId or some other info have the underscore, others use the one from the prefix
var DEF_PARTIALPERMANENTMKEY_INSTANTTROOPMOVE = DEF_UNDERSCORE + "instantTroopsMove";
var DEF_PARTIALPERMANENTMKEY_VILLAGEREPORTINFO = DEF_UNDERSCORE + "villageReportInfo";
var DEF_PARTIALPERMANENTMKEY_REPORTSACTION = "reportsAction";
var DEF_PARTIALPERMANENTMKEY_SINGLEVILLAGEINFO = "singleVillageInfo";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_ARRIVING = "arrivingMerchants";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_OWNMERCHANTS = "ownMerchants";
var DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS = "lang_reinforcements";
var DEF_PARTIALPERMANENTMKEY_QP_CLIPBOARD = "QPClipboard";
var DEF_PARTIALPERMANENTMKEY_PREFIX = getServerName() + DEF_UNDERSCORE + getUserId() + DEF_UNDERSCORE;

var DEF_ACTION_DELETE_TRADE = "deleteTrade";

var DEF_UTM_ATTACKTYPEINDEX = 11;
var DEF_UTM_SCOUTTYPEINDEX = 12;
var DEF_UTM_CATATARGET1INDEX = 13;
var DEF_UTM_CATATARGET2INDEX = 14;

var TRIBE_ROMAN = 0;
var TRIBE_GAUL = 1;
var TRIBE_TEUTON = 2;
var TRIBE_NATURE = 3;
var TRIBE_NATAR = 4;
var TRIBE_UNDISCLOSED = 5;

// bounty each troop can carry, troops ordered by each tribe, tribe ordered by: romans, gauls, teutons
var troopsBountyLoad = new Array(
								new Array(40, 20, 50, 0, 100, 70, 0, 0, 0, 3000, 0),
								new Array(30, 45, 0, 75,  35, 65, 0, 0, 0, 3000, 0),
								new Array(60, 40, 50, 0, 110, 80, 0, 0, 0, 3000, 0)
						);

// The index of the troop that is the scout in the troops list of each tribe
var scoutTroopIndex = new Array (4, 3, 4);


var DEF_BUILDINGS_MAX_LEVELS = [-999,
					10, 10, 10, 10,  5,  5,  5,  5,  5, 20,
					20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
					20, 20, 10, 20, 20, 20, 10, 20, 20, 20,
					20, 20, 20, 20, 20, 20, 20, 20, 20, 100
					];

DEF_BUILD_GID_WOODCUTTER = 1;
DEF_BUILD_GID_CLAY_PIT = 2;
DEF_BUILD_GID_IRON_MINE = 3;
DEF_BUILD_GID_CROPLAND = 4;
DEF_BUILD_GID_SAWMILL = 5;
DEF_BUILD_GID_BRICKYARD = 6;
DEF_BUILD_GID_IRON_FOUNDRY = 7;
DEF_BUILD_GID_GRAIN_MILL = 8;
DEF_BUILD_GID_BAKERY = 9;
DEF_BUILD_GID_WAREHOUSE = 10;
DEF_BUILD_GID_GRANARY = 11;
DEF_BUILD_GID_BLACKSMITH = 12;
DEF_BUILD_GID_ARMOURY = 13;
DEF_BUILD_GID_TOURNAMENT_SQUARE = 14;
DEF_BUILD_GID_MAIN_BUILDING = 15;
DEF_BUILD_GID_RALLY_POINT = 16;
DEF_BUILD_GID_MARKETPLACE = 17;
DEF_BUILD_GID_EMBASSY = 18;
DEF_BUILD_GID_BARRACKS = 19;
DEF_BUILD_GID_STABLE = 20;
DEF_BUILD_GID_WORKSHOP = 21;
DEF_BUILD_GID_ACADEMY = 22;
DEF_BUILD_GID_CRANNY = 23;
DEF_BUILD_GID_TOWNHALL = 24;
DEF_BUILD_GID_RESIDENCE = 25;
DEF_BUILD_GID_PALACE = 26;
DEF_BUILD_GID_TREASURY = 27;
DEF_BUILD_GID_TRADE_OFFICE = 28;
DEF_BUILD_GID_GREAT_BARRACKS = 29;
DEF_BUILD_GID_GREAT_STABLE = 30;
DEF_BUILD_GID_CITY_WALL = 31;
DEF_BUILD_GID_EARTH_WALL = 32;
DEF_BUILD_GID_PALISADE = 33;
DEF_BUILD_GID_STONEMASON = 34;
DEF_BUILD_GID_BREWERY = 35;
DEF_BUILD_GID_TRAPPER = 36;
DEF_BUILD_GID_HEROS_MANSION = 37;
DEF_BUILD_GID_GREAT_WAREHOUSE = 38;
DEF_BUILD_GID_GREAT_GRANARY = 39;
DEF_BUILD_GID_WONDER_OF_THE_WORLD = 40;

DEF_BUILDING = new Array();
DEF_BUILDING[DEF_BUILD_GID_WOODCUTTER] = [ [40, 100, 50, 60, 2, 1, 5], [65, 165, 85, 100, 1, 1, 9], [110, 280, 140, 165, 1, 2, 15], [185, 465, 235, 280, 1, 2, 22], [310, 780, 390, 465, 1, 2, 33], [520, 1300, 650, 780, 2, 3, 50], [870, 2170, 1085, 1300, 2, 4, 70], [1450, 3625, 1810, 2175, 2, 4, 100], [2420, 6050, 3025, 3630, 2, 5, 145], [4040, 10105, 5050, 6060, 2, 6, 200], [6750, 16870, 8435, 10125, 2, 7, 280], [11270, 28175, 14090, 16905, 2, 9, 375], [18820, 47055, 23525, 28230, 2, 11, 495], [31430, 78580, 39290, 47150, 2, 13, 635], [52490, 131230, 65615, 78740, 2, 15, 800], [87660, 219155, 109575, 131490, 3, 18, 1000], [146395, 365985, 182995, 219590, 3, 22, 1300], [244480, 611195, 305600, 366715, 3, 27, 1600], [408280, 1020695, 510350, 612420, 3, 32, 2000], [681825, 1704565, 852280, 1022740, 3, 38, 2450], [1138650, 2846620, 1423310, 1707970, 3, 46, 3050], [1901540, 4753855, 2376925, 2852315, 3, 55, 3750], [3175575, 7938935, 3969470, 4763360, 3, 66, 4600], [5303210, 13258025, 6629015, 7954815, 3, 79, 5650], [8856360, 22140900, 11070450, 13284540, 3, 95, 6950] ];
DEF_BUILDING[DEF_BUILD_GID_CLAY_PIT] = [ [80, 40, 80, 50, 2, 1, 5], [135, 65, 135, 85, 1, 1, 9], [225, 110, 225, 140, 1, 2, 15], [375, 185, 375, 235, 1, 2, 22], [620, 310, 620, 390, 1, 2, 33], [1040, 520, 1040, 650, 2, 3, 50], [1735, 870, 1735, 1085, 2, 4, 70], [2900, 1450, 2900, 1810, 2, 4, 100], [4840, 2420, 4840, 3025, 2, 5, 145], [8080, 4040, 8080, 5050, 2, 6, 200], [13500, 6750, 13500, 8435, 2, 7, 280], [22540, 11270, 22540, 14090, 2, 9, 375], [37645, 18820, 37645, 23525, 2, 11, 495], [62865, 31430, 62865, 39290, 2, 13, 635], [104985, 52490, 104985, 65615, 2, 15, 800], [175320, 87660, 175320, 109575, 3, 18, 1000], [292790, 146395, 292790, 182995, 3, 22, 1300], [488955, 244480, 488955, 305600, 3, 27, 1600], [816555, 408280, 816555, 510350, 3, 32, 2000], [1363650, 681825, 1363650, 852280, 3, 38, 2450], [2277295, 1138650, 2277295, 1423310, 3, 46, 3050], [3803085, 1901540, 3803085, 2376925, 3, 55, 3750], [6351150, 3175575, 6351150, 3969470, 3, 66, 4600], [10606420, 5303210, 10606420, 6629015, 3, 79, 5650], [17712720, 8856360, 17712720, 11070450, 3, 95, 6950] ];
DEF_BUILDING[DEF_BUILD_GID_IRON_MINE] = [ [100, 80, 30, 60, 3, 1, 5], [165, 135, 50, 100, 2, 1, 9], [280, 225, 85, 165, 2, 2, 15], [465, 375, 140, 280, 2, 2, 22], [780, 620, 235, 465, 2, 2, 33], [1300, 1040, 390, 780, 2, 3, 50], [2170, 1735, 650, 1300, 2, 4, 70], [3625, 2900, 1085, 2175, 2, 4, 100], [6050, 4840, 1815, 3630, 2, 5, 145], [10105, 8080, 3030, 6060, 2, 6, 200], [16870, 13500, 5060, 10125, 3, 7, 280], [28175, 22540, 8455, 16905, 3, 9, 375], [47055, 37645, 14115, 28230, 3, 11, 495], [78580, 62865, 23575, 47150, 3, 13, 635], [131230, 104985, 39370, 78740, 3, 15, 800], [219155, 175320, 65745, 131490, 3, 18, 1000], [365985, 292790, 109795, 219590, 3, 22, 1300], [611195, 488955, 183360, 366715, 3, 27, 1600], [1020695, 816555, 306210, 612420, 3, 32, 2000], [1704565, 1363650, 511370, 1022740, 3, 38, 2450], [2846620, 2277295, 853985, 1707970, 4, 46, 3050], [4753855, 3803085, 1426155, 2852315, 4, 55, 3750], [7938935, 6351150, 2381680, 4763360, 4, 66, 4600], [13258025, 10606420, 3977410, 7954815, 4, 79, 5650], [22140900, 17712720, 6642270, 13284540, 4, 95, 6950] ];
DEF_BUILDING[DEF_BUILD_GID_CROPLAND] = [ [70, 90, 70, 20, 0, 1, 5], [115, 150, 115, 35, 0, 1, 9], [195, 250, 195, 55, 0, 2, 15], [325, 420, 325, 95, 0, 2, 22], [545, 700, 545, 155, 0, 2, 33], [910, 1170, 910, 260, 1, 3, 50], [1520, 1950, 1520, 435, 1, 4, 70], [2535, 3260, 2535, 725, 1, 4, 100], [4235, 5445, 4235, 1210, 1, 5, 145], [7070, 9095, 7070, 2020, 1, 6, 200], [11810, 15185, 11810, 3375, 1, 7, 280], [19725, 25360, 19725, 5635, 1, 9, 375], [32940, 42350, 32940, 9410, 1, 11, 495], [55005, 70720, 55005, 15715, 1, 13, 635], [91860, 118105, 91860, 26245, 1, 15, 800], [153405, 197240, 153405, 43830, 2, 18, 1000], [256190, 329385, 256190, 73195, 2, 22, 1300], [427835, 550075, 427835, 122240, 2, 27, 1600], [714485, 918625, 714485, 204140, 2, 32, 2000], [1193195, 1534105, 1193195, 340915, 2, 38, 2450], [1992635, 2561960, 1992635, 569325, 2, 46, 3050], [3327700, 4278470, 3327700, 950770, 2, 55, 3750], [5557255, 7145045, 5557255, 1587785, 2, 66, 4600], [9280620, 11932225, 9280620, 2651605, 2, 79, 5650], [15498630, 19926810, 15498630, 4428180, 2, 95, 6950] ];
DEF_BUILDING[DEF_BUILD_GID_SAWMILL] = [ [520, 380, 290, 90, 4, 1, 0.05], [935, 685, 520, 160, 2, 1, 0.1], [1685, 1230, 940, 290, 2, 2, 0.15], [3035, 2215, 1690, 525, 2, 2, 0.2], [5460, 3990, 3045, 945, 2, 2, 0.25] ];
DEF_BUILDING[DEF_BUILD_GID_BRICKYARD] = [ [440, 480, 320, 50, 3, 1, 0.05], [790, 865, 575, 90, 2, 1, 0.1], [1425, 1555, 1035, 160, 2, 2, 0.15], [2565, 2800, 1865, 290, 2, 2, 0.2], [4620, 5040, 3360, 525, 2, 2, 0.25] ];
DEF_BUILDING[DEF_BUILD_GID_IRON_FOUNDRY] = [ [200, 450, 510, 120, 6, 1, 0.05], [360, 810, 920, 215, 3, 1, 0.1], [650, 1460, 1650, 390, 3, 2, 0.15], [1165, 2625, 2975, 700, 3, 2, 0.2], [2100, 4725, 5355, 1260, 3, 2, 0.25] ];
DEF_BUILDING[DEF_BUILD_GID_GRAIN_MILL] = [ [500, 440, 380, 1240, 3, 1, 0.05], [900, 790, 685, 2230, 2, 1, 0.1], [1620, 1425, 1230, 4020, 2, 2, 0.15], [2915, 2565, 2215, 7230, 2, 2, 0.2], [5250, 4620, 3990, 13015, 2, 2, 0.25] ];
DEF_BUILDING[DEF_BUILD_GID_BAKERY] = [ [1200, 1480, 870, 1600, 4, 1, 0.05], [2160, 2665, 1565, 2880, 2, 1, 0.1], [3890, 4795, 2820, 5185, 2, 2, 0.15], [7000, 8630, 5075, 9330, 2, 2, 0.2], [12595, 15535, 9135, 16795, 2, 2, 0.25] ];
DEF_BUILDING[DEF_BUILD_GID_WAREHOUSE] = [ [130, 160, 90, 40, 1, 1, 1200], [165, 205, 115, 50, 1, 1, 1700], [215, 260, 145, 65, 1, 2, 2300], [275, 335, 190, 85, 1, 2, 3100], [350, 430, 240, 105, 1, 2, 4000], [445, 550, 310, 135, 1, 3, 5000], [570, 705, 395, 175, 1, 4, 6300], [730, 900, 505, 225, 1, 4, 7800], [935, 1155, 650, 290, 1, 5, 9600], [1200, 1475, 830, 370, 1, 6, 11800], [1535, 1890, 1065, 470, 2, 7, 14400], [1965, 2420, 1360, 605, 2, 9, 17600], [2515, 3095, 1740, 775, 2, 11, 21400], [3220, 3960, 2230, 990, 2, 13, 25900], [4120, 5070, 2850, 1270, 2, 15, 31300], [5275, 6490, 3650, 1625, 2, 18, 37900], [6750, 8310, 4675, 2075, 2, 22, 45700], [8640, 10635, 5980, 2660, 2, 27, 55100], [11060, 13610, 7655, 3405, 2, 32, 66400], [14155, 17420, 9800, 4355, 2, 38, 80000] ];
DEF_BUILDING[DEF_BUILD_GID_GRANARY] = [ [80, 100, 70, 20, 1, 1, 1200], [100, 130, 90, 25, 1, 1, 1700], [130, 165, 115, 35, 1, 2, 2300], [170, 210, 145, 40, 1, 2, 3100], [215, 270, 190, 55, 1, 2, 4000], [275, 345, 240, 70, 1, 3, 5000], [350, 440, 310, 90, 1, 4, 6300], [450, 565, 395, 115, 1, 4, 7800], [575, 720, 505, 145, 1, 5, 9600], [740, 920, 645, 185, 1, 6, 11800], [945, 1180, 825, 235, 2, 7, 14400], [1210, 1510, 1060, 300, 2, 9, 17600], [1545, 1935, 1355, 385, 2, 11, 21400], [1980, 2475, 1735, 495, 2, 13, 25900], [2535, 3170, 2220, 635, 2, 15, 31300], [3245, 4055, 2840, 810, 2, 18, 37900], [4155, 5190, 3635, 1040, 2, 22, 45700], [5315, 6645, 4650, 1330, 2, 27, 55100], [6805, 8505, 5955, 1700, 2, 32, 66400], [8710, 10890, 7620, 2180, 2, 38, 80000] ];
DEF_BUILDING[DEF_BUILD_GID_BLACKSMITH] = [ [170, 200, 380, 130, 4, 2], [220, 255, 485, 165, 2, 3], [280, 330, 625, 215, 2, 3], [355, 420, 795, 275, 2, 4], [455, 535, 1020, 350, 2, 5], [585, 685, 1305, 445, 3, 6], [750, 880, 1670, 570, 3, 7], [955, 1125, 2140, 730, 3, 9], [1225, 1440, 2740, 935, 3, 10], [1570, 1845, 3505, 1200, 3, 12], [2005, 2360, 4485, 1535, 3, 15], [2570, 3020, 5740, 1965, 3, 18], [3290, 3870, 7350, 2515, 3, 21], [4210, 4950, 9410, 3220, 3, 26], [5390, 6340, 12045, 4120, 3, 31], [6895, 8115, 15415, 5275, 4, 37], [8825, 10385, 19730, 6750, 4, 44], [11300, 13290, 25255, 8640, 4, 53], [14460, 17015, 32325, 11060, 4, 64], [18510, 21780, 41380, 14155, 4, 77] ];
DEF_BUILDING[DEF_BUILD_GID_ARMOURY] = [ [130, 210, 410, 130, 4, 2], [165, 270, 525, 165, 2, 3], [215, 345, 670, 215, 2, 3], [275, 440, 860, 275, 2, 4], [350, 565, 1100, 350, 2, 5], [445, 720, 1410, 445, 3, 6], [570, 925, 1805, 570, 3, 7], [730, 1180, 2310, 730, 3, 9], [935, 1515, 2955, 935, 3, 10], [1200, 1935, 3780, 1200, 3, 12], [1535, 2480, 4840, 1535, 3, 15], [1965, 3175, 6195, 1965, 3, 18], [2515, 4060, 7930, 2515, 3, 21], [3220, 5200, 10150, 3220, 3, 26], [4120, 6655, 12995, 4120, 3, 31], [5275, 8520, 16630, 5275, 4, 37], [6750, 10905, 21290, 6750, 4, 44], [8640, 13955, 27250, 8640, 4, 53], [11060, 17865, 34880, 11060, 4, 64], [14155, 22865, 44645, 14155, 4, 77] ];
DEF_BUILDING[DEF_BUILD_GID_TOURNAMENT_SQUARE] = [ [1750, 2250, 1530, 240, 1, 1, 1.1], [2240, 2880, 1960, 305, 1, 1, 1.2], [2865, 3685, 2505, 395, 1, 2, 1.3], [3670, 4720, 3210, 505, 1, 2, 1.4], [4700, 6040, 4105, 645, 1, 2, 1.5], [6015, 7730, 5255, 825, 1, 3, 1.6], [7695, 9895, 6730, 1055, 1, 4, 1.7], [9850, 12665, 8615, 1350, 1, 4, 1.8], [12610, 16215, 11025, 1730, 1, 5, 1.9], [16140, 20755, 14110, 2215, 1, 6, 2], [20660, 26565, 18065, 2835, 2, 7, 2.1], [26445, 34000, 23120, 3625, 2, 9, 2.2], [33850, 43520, 29595, 4640, 2, 11, 2.3], [43330, 55705, 37880, 5940, 2, 13, 2.4], [55460, 71305, 48490, 7605, 2, 15, 2.5], [70990, 91270, 62065, 9735, 2, 18, 2.6], [90865, 116825, 79440, 12460, 2, 22, 2.7], [116305, 149540, 101685, 15950, 2, 27, 2.8], [148875, 191410, 130160, 20415, 2, 32, 2.9], [190560, 245005, 166600, 26135, 2, 38, 3] ];
DEF_BUILDING[DEF_BUILD_GID_MAIN_BUILDING] = [ [70, 40, 60, 20, 2, 2, 1], [90, 50, 75, 25, 1, 3, 0.96], [115, 65, 100, 35, 1, 3, 0.93], [145, 85, 125, 40, 1, 4, 0.9], [190, 105, 160, 55, 1, 5, 0.86], [240, 135, 205, 70, 2, 6, 0.83], [310, 175, 265, 90, 2, 7, 0.8], [395, 225, 340, 115, 2, 9, 0.77], [505, 290, 430, 145, 2, 10, 0.75], [645, 370, 555, 185, 2, 12, 0.72], [825, 470, 710, 235, 2, 15, 0.69], [1060, 605, 905, 300, 2, 18, 0.67], [1355, 775, 1160, 385, 2, 21, 0.64], [1735, 990, 1485, 495, 2, 26, 0.62], [2220, 1270, 1900, 635, 2, 31, 0.6], [2840, 1625, 2435, 810, 3, 37, 0.58], [3635, 2075, 3115, 1040, 3, 44, 0.56], [4650, 2660, 3990, 1330, 3, 53, 0.54], [5955, 3405, 5105, 1700, 3, 64, 0.52], [7620, 4355, 6535, 2180, 3, 77, 0.5] ];
DEF_BUILDING[DEF_BUILD_GID_RALLY_POINT] = [ [110, 160, 90, 70, 1, 1], [140, 205, 115, 90, 1, 1], [180, 260, 145, 115, 1, 2], [230, 335, 190, 145, 1, 2], [295, 430, 240, 190, 1, 2], [380, 550, 310, 240, 1, 3], [485, 705, 395, 310, 1, 4], [620, 900, 505, 395, 1, 4], [795, 1155, 650, 505, 1, 5], [1015, 1475, 830, 645, 1, 6], [1300, 1890, 1065, 825, 2, 7], [1660, 2420, 1360, 1060, 2, 9], [2130, 3095, 1740, 1355, 2, 11], [2725, 3960, 2230, 1735, 2, 13], [3485, 5070, 2850, 2220, 2, 15], [4460, 6490, 3650, 2840, 2, 18], [5710, 8310, 4675, 3635, 2, 22], [7310, 10635, 5980, 4650, 2, 27], [9360, 13610, 7655, 5955, 2, 32], [11980, 17420, 9800, 7620, 2, 38] ];
DEF_BUILDING[DEF_BUILD_GID_MARKETPLACE] = [ [80, 70, 120, 70, 4, 4, 1], [100, 90, 155, 90, 2, 4, 2], [130, 115, 195, 115, 2, 5, 3], [170, 145, 250, 145, 2, 6, 4], [215, 190, 320, 190, 2, 7, 5], [275, 240, 410, 240, 3, 9, 6], [350, 310, 530, 310, 3, 11, 7], [450, 395, 675, 395, 3, 13, 8], [575, 505, 865, 505, 3, 15, 9], [740, 645, 1105, 645, 3, 19, 10], [945, 825, 1415, 825, 3, 22, 11], [1210, 1060, 1815, 1060, 3, 27, 12], [1545, 1355, 2320, 1355, 3, 32, 13], [1980, 1735, 2970, 1735, 3, 39, 14], [2535, 2220, 3805, 2220, 3, 46, 15], [3245, 2840, 4870, 2840, 4, 55, 16], [4155, 3635, 6230, 3635, 4, 67, 17], [5315, 4650, 7975, 4650, 4, 80, 18], [6805, 5955, 10210, 5955, 4, 96, 19], [8710, 7620, 13065, 7620, 4, 115, 20] ];
DEF_BUILDING[DEF_BUILD_GID_EMBASSY] = [ [180, 130, 150, 80, 3, 5, 0], [230, 165, 190, 100, 2, 6, 0], [295, 215, 245, 130, 2, 7, 9], [375, 275, 315, 170, 2, 8, 12], [485, 350, 405, 215, 2, 10, 15], [620, 445, 515, 275, 2, 12, 18], [790, 570, 660, 350, 2, 14, 21], [1015, 730, 845, 450, 2, 17, 24], [1295, 935, 1080, 575, 2, 21, 27], [1660, 1200, 1385, 740, 2, 25, 30], [2125, 1535, 1770, 945, 3, 30, 33], [2720, 1965, 2265, 1210, 3, 36, 36], [3480, 2515, 2900, 1545, 3, 43, 39], [4455, 3220, 3715, 1980, 3, 51, 42], [5705, 4120, 4755, 2535, 3, 62, 45], [7300, 5275, 6085, 3245, 3, 74, 48], [9345, 6750, 7790, 4155, 3, 89, 51], [11965, 8640, 9970, 5315, 3, 106, 54], [15315, 11060, 12760, 6805, 3, 128, 57], [19600, 14155, 16335, 8710, 3, 153, 60] ];
DEF_BUILDING[DEF_BUILD_GID_BARRACKS] = [ [210, 140, 260, 120, 4, 1, 1], [270, 180, 335, 155, 2, 1, 0.9], [345, 230, 425, 195, 2, 2, 0.81], [440, 295, 545, 250, 2, 2, 0.73], [565, 375, 700, 320, 2, 2, 0.66], [720, 480, 895, 410, 3, 3, 0.59], [925, 615, 1145, 530, 3, 4, 0.53], [1180, 790, 1465, 675, 3, 4, 0.48], [1515, 1010, 1875, 865, 3, 5, 0.43], [1935, 1290, 2400, 1105, 3, 6, 0.39], [2480, 1655, 3070, 1415, 3, 7, 0.35], [3175, 2115, 3930, 1815, 3, 9, 0.31], [4060, 2710, 5030, 2320, 3, 11, 0.28], [5200, 3465, 6435, 2970, 3, 13, 0.25], [6655, 4435, 8240, 3805, 3, 15, 0.23], [8520, 5680, 10545, 4870, 4, 18, 0.21], [10905, 7270, 13500, 6230, 4, 22, 0.19], [13955, 9305, 17280, 7975, 4, 27, 0.17], [17865, 11910, 22120, 10210, 4, 32, 0.15], [22865, 15245, 28310, 13065, 4, 38, 0.14] ];
DEF_BUILDING[DEF_BUILD_GID_STABLE] = [ [260, 140, 220, 100, 5, 2, 1], [335, 180, 280, 130, 3, 3, 0.9], [425, 230, 360, 165, 3, 3, 0.81], [545, 295, 460, 210, 3, 4, 0.73], [700, 375, 590, 270, 3, 5, 0.66], [895, 480, 755, 345, 3, 6, 0.59], [1145, 615, 970, 440, 3, 7, 0.53], [1465, 790, 1240, 565, 3, 9, 0.48], [1875, 1010, 1585, 720, 3, 10, 0.43], [2400, 1290, 2030, 920, 3, 12, 0.39], [3070, 1655, 2595, 1180, 4, 15, 0.35], [3930, 2115, 3325, 1510, 4, 18, 0.31], [5030, 2710, 4255, 1935, 4, 21, 0.28], [6435, 3465, 5445, 2475, 4, 26, 0.25], [8240, 4435, 6970, 3170, 4, 31, 0.23], [10545, 5680, 8925, 4055, 4, 37, 0.21], [13500, 7270, 11425, 5190, 4, 44, 0.19], [17280, 9305, 14620, 6645, 4, 53, 0.17], [22120, 11910, 18715, 8505, 4, 64, 0.15], [28310, 15245, 23955, 10890, 4, 77, 0.14] ];
DEF_BUILDING[DEF_BUILD_GID_WORKSHOP] = [ [460, 510, 600, 320, 3, 4, 1], [590, 655, 770, 410, 2, 4, 0.9], [755, 835, 985, 525, 2, 5, 0.81], [965, 1070, 1260, 670, 2, 6, 0.73], [1235, 1370, 1610, 860, 2, 7, 0.66], [1580, 1750, 2060, 1100, 2, 9, 0.59], [2025, 2245, 2640, 1405, 2, 11, 0.53], [2590, 2870, 3380, 1800, 2, 13, 0.48], [3315, 3675, 4325, 2305, 2, 15, 0.43], [4245, 4705, 5535, 2950, 2, 19, 0.39], [5430, 6020, 7085, 3780, 3, 22, 0.35], [6950, 7705, 9065, 4835, 3, 27, 0.31], [8900, 9865, 11605, 6190, 3, 32, 0.28], [11390, 12625, 14855, 7925, 3, 39, 0.25], [14580, 16165, 19015, 10140, 3, 46, 0.23], [18660, 20690, 24340, 12980, 3, 55, 0.21], [23885, 26480, 31155, 16615, 3, 67, 0.19], [30570, 33895, 39875, 21270, 3, 80, 0.17], [39130, 43385, 51040, 27225, 3, 96, 0.15], [50090, 55535, 65335, 34845, 3, 115, 0.14] ];
DEF_BUILDING[DEF_BUILD_GID_ACADEMY] = [ [220, 160, 90, 40, 4, 5], [280, 205, 115, 50, 2, 6], [360, 260, 145, 65, 2, 7], [460, 335, 190, 85, 2, 8], [590, 430, 240, 105, 2, 10], [755, 550, 310, 135, 3, 12], [970, 705, 395, 175, 3, 14], [1240, 900, 505, 225, 3, 17], [1585, 1155, 650, 290, 3, 21], [2030, 1475, 830, 370, 3, 25], [2595, 1890, 1065, 470, 3, 30], [3325, 2420, 1360, 605, 3, 36], [4255, 3095, 1740, 775, 3, 43], [5445, 3960, 2230, 990, 3, 51], [6970, 5070, 2850, 1270, 3, 62], [8925, 6490, 3650, 1625, 4, 74], [11425, 8310, 4675, 2075, 4, 89], [14620, 10635, 5980, 2660, 4, 106], [18715, 13610, 7655, 3405, 4, 128], [23955, 17420, 9800, 4355, 4, 153] ];
DEF_BUILDING[DEF_BUILD_GID_CRANNY] = [ [40, 50, 30, 10, 0, 1, 100], [50, 65, 40, 15, 0, 1, 130], [65, 80, 50, 15, 0, 2, 170], [85, 105, 65, 20, 0, 2, 220], [105, 135, 80, 25, 0, 2, 280], [135, 170, 105, 35, 1, 3, 360], [175, 220, 130, 45, 1, 4, 460], [225, 280, 170, 55, 1, 4, 600], [290, 360, 215, 70, 1, 5, 770], [370, 460, 275, 90, 1, 6, 1000] ];
DEF_BUILDING[DEF_BUILD_GID_TOWNHALL] = [ [1250, 1110, 1260, 600, 4, 6], [1600, 1420, 1615, 770, 2, 7], [2050, 1820, 2065, 985, 2, 9], [2620, 2330, 2640, 1260, 2, 10], [3355, 2980, 3380, 1610, 2, 12], [4295, 3815, 4330, 2060, 3, 15], [5500, 4880, 5540, 2640, 3, 18], [7035, 6250, 7095, 3380, 3, 21], [9005, 8000, 9080, 4325, 3, 26], [11530, 10240, 11620, 5535, 3, 31], [14755, 13105, 14875, 7085, 3, 37], [18890, 16775, 19040, 9065, 3, 45], [24180, 21470, 24370, 11605, 3, 53], [30950, 27480, 31195, 14855, 3, 64], [39615, 35175, 39930, 19015, 3, 77], [50705, 45025, 51110, 24340, 4, 92], [64905, 57635, 65425, 31155, 4, 111], [83075, 73770, 83740, 39875, 4, 133], [106340, 94430, 107190, 51040, 4, 160], [136115, 120870, 137200, 65335, 4, 192] ];
DEF_BUILDING[DEF_BUILD_GID_RESIDENCE] = [ [580, 460, 350, 180, 1, 2], [740, 590, 450, 230, 1, 3], [950, 755, 575, 295, 1, 3], [1215, 965, 735, 375, 1, 4], [1555, 1235, 940, 485, 1, 5], [1995, 1580, 1205, 620, 1, 6], [2550, 2025, 1540, 790, 1, 7], [3265, 2590, 1970, 1015, 1, 9], [4180, 3315, 2520, 1295, 1, 10], [5350, 4245, 3230, 1660, 1, 12], [6845, 5430, 4130, 2125, 2, 15], [8765, 6950, 5290, 2720, 2, 18], [11220, 8900, 6770, 3480, 2, 21], [14360, 11390, 8665, 4455, 2, 26], [18380, 14580, 11090, 5705, 2, 31], [23530, 18660, 14200, 7300, 2, 37], [30115, 23885, 18175, 9345, 2, 44], [38550, 30570, 23260, 11965, 2, 53], [49340, 39130, 29775, 15315, 2, 64], [63155, 50090, 38110, 19600, 2, 77] ];
DEF_BUILDING[DEF_BUILD_GID_PALACE] = [ [550, 800, 750, 250, 1, 6], [705, 1025, 960, 320, 1, 7], [900, 1310, 1230, 410, 1, 9], [1155, 1680, 1575, 525, 1, 10], [1475, 2145, 2015, 670, 1, 12], [1890, 2750, 2575, 860, 1, 15], [2420, 3520, 3300, 1100, 1, 18], [3095, 4505, 4220, 1405, 1, 21], [3965, 5765, 5405, 1800, 1, 26], [5075, 7380, 6920, 2305, 1, 31], [6495, 9445, 8855, 2950, 2, 37], [8310, 12090, 11335, 3780, 2, 45], [10640, 15475, 14505, 4835, 2, 53], [13615, 19805, 18570, 6190, 2, 64], [17430, 25355, 23770, 7925, 2, 77], [22310, 32450, 30425, 10140, 2, 92], [28560, 41540, 38940, 12980, 2, 111], [36555, 53170, 49845, 16615, 2, 133], [46790, 68055, 63805, 21270, 2, 160], [59890, 87110, 81670, 27225, 2, 192] ];
DEF_BUILDING[DEF_BUILD_GID_TREASURY] = [ [2880, 2740, 2580, 990, 4, 10, NaN], [3685, 3505, 3300, 1265, 2, 12, NaN], [4720, 4490, 4225, 1620, 2, 14, NaN], [6040, 5745, 5410, 2075, 2, 17, NaN], [7730, 7355, 6925, 2660, 2, 20, NaN], [9895, 9415, 8865, 3400, 3, 24, NaN], [12665, 12050, 11345, 4355, 3, 29, NaN], [16215, 15425, 14525, 5575, 3, 34, NaN], [20755, 19745, 18590, 7135, 3, 41, NaN], [26565, 25270, 23795, 9130, 3, 50, 1] ];
DEF_BUILDING[DEF_BUILD_GID_TRADE_OFFICE] = [ [1400, 1330, 1200, 400, 3, 4, 1.1], [1790, 1700, 1535, 510, 2, 4, 1.2], [2295, 2180, 1965, 655, 2, 5, 1.3], [2935, 2790, 2515, 840, 2, 6, 1.4], [3760, 3570, 3220, 1075, 2, 7, 1.5], [4810, 4570, 4125, 1375, 2, 9, 1.6], [6155, 5850, 5280, 1760, 2, 11, 1.7], [7880, 7485, 6755, 2250, 2, 13, 1.8], [10090, 9585, 8645, 2880, 2, 15, 1.9], [12915, 12265, 11070, 3690, 2, 19, 2], [16530, 15700, 14165, 4720, 3, 22, 2.1], [21155, 20100, 18135, 6045, 3, 27, 2.2], [27080, 25725, 23210, 7735, 3, 32, 2.3], [34660, 32930, 29710, 9905, 3, 39, 2.4], [44370, 42150, 38030, 12675, 3, 46, 2.5], [56790, 53950, 48680, 16225, 3, 55, 2.6], [72690, 69060, 62310, 20770, 3, 67, 2.7], [93045, 88395, 79755, 26585, 3, 80, 2.8], [119100, 113145, 102085, 34030, 3, 96, 2.9], [152445, 144825, 130670, 43555, 3, 115, 3] ];
DEF_BUILDING[DEF_BUILD_GID_GREAT_BARRACKS] = [ [630, 420, 780, 360, 4, 1, 1], [805, 540, 1000, 460, 2, 1, 0.9], [1030, 690, 1280, 590, 2, 2, 0.81], [1320, 880, 1635, 755, 2, 2, 0.73], [1690, 1125, 2095, 965, 2, 2, 0.66], [2165, 1445, 2680, 1235, 3, 3, 0.59], [2770, 1845, 3430, 1585, 3, 4, 0.53], [3545, 2365, 4390, 2025, 3, 4, 0.48], [4540, 3025, 5620, 2595, 3, 5, 0.43], [5810, 3875, 7195, 3320, 3, 6, 0.39], [7440, 4960, 9210, 4250, 3, 7, 0.35], [9520, 6345, 11785, 5440, 3, 9, 0.31], [12185, 8125, 15085, 6965, 3, 11, 0.28], [15600, 10400, 19310, 8915, 3, 13, 0.25], [19965, 13310, 24720, 11410, 3, 15, 0.23], [25555, 17035, 31640, 14605, 4, 18, 0.21], [32710, 21810, 40500, 18690, 4, 22, 0.19], [41870, 27915, 51840, 23925, 4, 27, 0.17], [53595, 35730, 66355, 30625, 4, 32, 0.15], [68600, 45735, 84935, 39200, 4, 38, 0.14] ];
DEF_BUILDING[DEF_BUILD_GID_GREAT_STABLE] = [ [780, 420, 660, 300, 5, 2, 1], [1000, 540, 845, 385, 3, 3, 0.9], [1280, 690, 1080, 490, 3, 3, 0.81], [1635, 880, 1385, 630, 3, 4, 0.73], [2095, 1125, 1770, 805, 3, 5, 0.66], [2680, 1445, 2270, 1030, 3, 6, 0.59], [3430, 1845, 2905, 1320, 3, 7, 0.53], [4390, 2365, 3715, 1690, 3, 9, 0.48], [5620, 3025, 4755, 2160, 3, 10, 0.43], [7195, 3875, 6085, 2765, 3, 12, 0.39], [9210, 4960, 7790, 3540, 4, 15, 0.35], [11785, 6345, 9975, 4535, 4, 18, 0.31], [15085, 8125, 12765, 5805, 4, 21, 0.28], [19310, 10400, 16340, 7430, 4, 26, 0.25], [24720, 13310, 20915, 9505, 4, 31, 0.23], [31640, 17035, 26775, 12170, 4, 37, 0.21], [40500, 21810, 34270, 15575, 4, 44, 0.19], [51840, 27915, 43865, 19940, 4, 53, 0.17], [66355, 35730, 56145, 25520, 4, 64, 0.15], [84935, 45735, 71870, 32665, 4, 77, 0.14] ];
DEF_BUILDING[DEF_BUILD_GID_CITY_WALL] = [ [70, 90, 170, 70, 0, 1, 0.03], [90, 115, 220, 90, 0, 1, 0.06], [115, 145, 280, 115, 0, 2, 0.09], [145, 190, 355, 145, 0, 2, 0.13], [190, 240, 455, 190, 0, 2, 0.16], [240, 310, 585, 240, 1, 3, 0.19], [310, 395, 750, 310, 1, 4, 0.23], [395, 505, 955, 395, 1, 4, 0.27], [505, 650, 1225, 505, 1, 5, 0.3], [645, 830, 1570, 645, 1, 6, 0.34], [825, 1065, 2005, 825, 1, 7, 0.38], [1060, 1360, 2570, 1060, 1, 9, 0.43], [1355, 1740, 3290, 1355, 1, 11, 0.47], [1735, 2230, 4210, 1735, 1, 13, 0.51], [2220, 2850, 5390, 2220, 1, 15, 0.56], [2840, 3650, 6895, 2840, 2, 18, 0.6], [3635, 4675, 8825, 3635, 2, 22, 0.65], [4650, 5980, 11300, 4650, 2, 27, 0.7], [5955, 7655, 14460, 5955, 2, 32, 0.75], [7620, 9800, 18510, 7620, 2, 38, 0.81] ];
DEF_BUILDING[DEF_BUILD_GID_EARTH_WALL] = [ [120, 200, 0, 80, 0, 1, 0.02], [155, 255, 0, 100, 0, 1, 0.04], [195, 330, 0, 130, 0, 2, 0.06], [250, 420, 0, 170, 0, 2, 0.08], [320, 535, 0, 215, 0, 2, 0.1], [410, 685, 0, 275, 1, 3, 0.13], [530, 880, 0, 350, 1, 4, 0.15], [675, 1125, 0, 450, 1, 4, 0.17], [865, 1440, 0, 575, 1, 5, 0.2], [1105, 1845, 0, 740, 1, 6, 0.22], [1415, 2360, 0, 945, 1, 7, 0.24], [1815, 3020, 0, 1210, 1, 9, 0.27], [2320, 3870, 0, 1545, 1, 11, 0.29], [2970, 4950, 0, 1980, 1, 13, 0.32], [3805, 6340, 0, 2535, 1, 15, 0.35], [4870, 8115, 0, 3245, 2, 18, 0.37], [6230, 10385, 0, 4155, 2, 22, 0.4], [7975, 13290, 0, 5315, 2, 27, 0.43], [10210, 17015, 0, 6805, 2, 32, 0.46], [13065, 21780, 0, 8710, 2, 38, 0.49] ];
DEF_BUILDING[DEF_BUILD_GID_PALISADE] = [ [160, 100, 80, 60, 0, 1, 0.03], [205, 130, 100, 75, 0, 1, 0.05], [260, 165, 130, 100, 0, 2, 0.08], [335, 210, 170, 125, 0, 2, 0.1], [430, 270, 215, 160, 0, 2, 0.13], [550, 345, 275, 205, 1, 3, 0.16], [705, 440, 350, 265, 1, 4, 0.19], [900, 565, 450, 340, 1, 4, 0.22], [1155, 720, 575, 430, 1, 5, 0.25], [1475, 920, 740, 555, 1, 6, 0.28], [1890, 1180, 945, 710, 1, 7, 0.31], [2420, 1510, 1210, 905, 1, 9, 0.34], [3095, 1935, 1545, 1160, 1, 11, 0.38], [3960, 2475, 1980, 1485, 1, 13, 0.41], [5070, 3170, 2535, 1900, 1, 15, 0.45], [6490, 4055, 3245, 2435, 2, 18, 0.48], [8310, 5190, 4155, 3115, 2, 22, 0.52], [10635, 6645, 5315, 3990, 2, 27, 0.56], [13610, 8505, 6805, 5105, 2, 32, 0.6], [17420, 10890, 8710, 6535, 2, 38, 0.64] ];
DEF_BUILDING[DEF_BUILD_GID_STONEMASON] = [ [155, 130, 125, 70, 2, 1, 1.1], [200, 165, 160, 90, 1, 1, 1.2], [255, 215, 205, 115, 1, 2, 1.3], [325, 275, 260, 145, 1, 2, 1.4], [415, 350, 335, 190, 1, 2, 1.5], [535, 445, 430, 240, 2, 3, 1.6], [680, 570, 550, 310, 2, 4, 1.7], [875, 730, 705, 395, 2, 4, 1.8], [1115, 935, 900, 505, 2, 5, 1.9], [1430, 1200, 1155, 645, 2, 6, 2], [1830, 1535, 1475, 825, 2, 7, 2.1], [2340, 1965, 1890, 1060, 2, 9, 2.2], [3000, 2515, 2420, 1355, 2, 11, 2.3], [3840, 3220, 3095, 1735, 2, 13, 2.4], [4910, 4120, 3960, 2220, 2, 15, 2.5], [6290, 5275, 5070, 2840, 3, 18, 2.6], [8050, 6750, 6490, 3635, 3, 22, 2.7], [10300, 8640, 8310, 4650, 3, 27, 2.8], [13185, 11060, 10635, 5955, 3, 32, 2.9], [16880, 14155, 13610, 7620, 3, 38, 3] ];
DEF_BUILDING[DEF_BUILD_GID_BREWERY] = [ [1200, 1400, 1050, 2200, 6, 1], [1535, 1790, 1345, 2815, 3, 1], [1965, 2295, 1720, 3605, 3, 2], [2515, 2935, 2200, 4615, 3, 2], [3220, 3760, 2820, 5905, 3, 2], [4125, 4810, 3610, 7560, 4, 3], [5280, 6155, 4620, 9675, 4, 4], [6755, 7880, 5910, 12385, 4, 4], [8645, 10090, 7565, 15855, 4, 5], [11070, 12915, 9685, 20290, 4, 6], [14165, 16530, 12395, 25975, 4, 7], [18135, 21155, 15865, 33245, 4, 9], [23210, 27080, 20310, 42555, 4, 11], [29710, 34660, 25995, 54470, 4, 13], [38030, 44370, 33275, 69720, 4, 15], [48680, 56790, 42595, 89245, 5, 18], [62310, 72690, 54520, 114230, 5, 22], [79755, 93045, 69785, 146215, 5, 27], [102085, 119100, 89325, 187155, 5, 32], [130670, 152445, 114335, 239560, 5, 38] ];
DEF_BUILDING[DEF_BUILD_GID_TRAPPER] = [ [100, 100, 100, 100, 4, 1, 10], [130, 130, 130, 130, 2, 1, 20], [165, 165, 165, 165, 2, 2, 30], [210, 210, 210, 210, 2, 2, 40], [270, 270, 270, 270, 2, 2, 50], [345, 345, 345, 345, 3, 3, 60], [440, 440, 440, 440, 3, 4, 70], [565, 565, 565, 565, 3, 4, 80], [720, 720, 720, 720, 3, 5, 90], [920, 920, 920, 920, 3, 6, 100], [1180, 1180, 1180, 1180, 3, 7, 110], [1510, 1510, 1510, 1510, 3, 9, 120], [1935, 1935, 1935, 1935, 3, 11, 130], [2475, 2475, 2475, 2475, 3, 13, 140], [3170, 3170, 3170, 3170, 3, 15, 150], [4055, 4055, 4055, 4055, 4, 18, 160], [5190, 5190, 5190, 5190, 4, 22, 170], [6645, 6645, 6645, 6645, 4, 27, 180], [8505, 8505, 8505, 8505, 4, 32, 190], [10890, 10890, 10890, 10890, 4, 38, 200] ];
DEF_BUILDING[DEF_BUILD_GID_HEROS_MANSION] = [ [700, 670, 700, 240, 2, 1, NaN], [930, 890, 930, 320, 1, 1, NaN], [1240, 1185, 1240, 425, 1, 2, NaN], [1645, 1575, 1645, 565, 1, 2, NaN], [2190, 2095, 2190, 750, 1, 2, NaN], [2915, 2790, 2915, 1000, 2, 3, NaN], [3875, 3710, 3875, 1330, 2, 4, NaN], [5155, 4930, 5155, 1765, 2, 4, NaN], [6855, 6560, 6855, 2350, 2, 5, NaN], [9115, 8725, 9115, 3125, 2, 6, 1], [12125, 11605, 12125, 4155, 2, 7, 1], [16125, 15435, 16125, 5530, 2, 9, 1], [21445, 20525, 21445, 7350, 2, 11, 1], [28520, 27300, 28520, 9780, 2, 13, 1], [37935, 36310, 37935, 13005, 2, 15, 2], [50450, 48290, 50450, 17300, 3, 18, 2], [67100, 64225, 67100, 23005, 3, 22, 2], [89245, 85420, 89245, 30600, 3, 27, 2], [118695, 113605, 118695, 40695, 3, 32, 2], [157865, 151095, 157865, 54125, 3, 38, 3] ];
DEF_BUILDING[DEF_BUILD_GID_GREAT_WAREHOUSE] = [ [650, 800, 450, 200, 1, 1, 3600], [830, 1025, 575, 255, 1, 1, 5100], [1065, 1310, 735, 330, 1, 2, 6900], [1365, 1680, 945, 420, 1, 2, 9300], [1745, 2145, 1210, 535, 1, 2, 12000], [2235, 2750, 1545, 685, 1, 3, 15000], [2860, 3520, 1980, 880, 1, 4, 18900], [3660, 4505, 2535, 1125, 1, 4, 23400], [4685, 5765, 3245, 1440, 1, 5, 28800], [5995, 7380, 4150, 1845, 1, 6, 35400], [7675, 9445, 5315, 2360, 2, 7, 43200], [9825, 12090, 6800, 3020, 2, 9, 52800], [12575, 15475, 8705, 3870, 2, 11, 64200], [16095, 19805, 11140, 4950, 2, 13, 77700], [20600, 25355, 14260, 6340, 2, 15, 93900], [26365, 32450, 18255, 8115, 2, 18, 113700], [33750, 41540, 23365, 10385, 2, 22, 137100], [43200, 53170, 29910, 13290, 2, 27, 165300], [55295, 68055, 38280, 17015, 2, 32, 199200], [70780, 87110, 49000, 21780, 2, 38, 240000] ];
DEF_BUILDING[DEF_BUILD_GID_GREAT_GRANARY] = [ [400, 500, 350, 100, 1, 1, 3600], [510, 640, 450, 130, 1, 1, 5100], [655, 820, 575, 165, 1, 2, 6900], [840, 1050, 735, 210, 1, 2, 9300], [1075, 1340, 940, 270, 1, 2, 12000], [1375, 1720, 1205, 345, 1, 3, 15000], [1760, 2200, 1540, 440, 1, 4, 18900], [2250, 2815, 1970, 565, 1, 4, 23400], [2880, 3605, 2520, 720, 1, 5, 28800], [3690, 4610, 3230, 920, 1, 6, 35400], [4720, 5905, 4130, 1180, 2, 7, 43200], [6045, 7555, 5290, 1510, 2, 9, 52800], [7735, 9670, 6770, 1935, 2, 11, 64200], [9905, 12380, 8665, 2475, 2, 13, 77700], [12675, 15845, 11090, 3170, 2, 15, 93900], [16225, 20280, 14200, 4055, 2, 18, 113700], [20770, 25960, 18175, 5190, 2, 22, 137100], [26585, 33230, 23260, 6645, 2, 27, 165300], [34030, 42535, 29775, 8505, 2, 32, 199200], [43555, 54445, 38110, 10890, 2, 38, 240000] ];
DEF_BUILDING[DEF_BUILD_GID_WONDER_OF_THE_WORLD] = [ [66700, 69050, 72200, 13200, 1, 0], [68535, 70950, 74185, 13565, 1, 0], [70420, 72900, 76225, 13935, 1, 0], [72355, 74905, 78320, 14320, 1, 0], [74345, 76965, 80475, 14715, 1, 0], [76390, 79080, 82690, 15120, 1, 0], [78490, 81255, 84965, 15535, 1, 0], [80650, 83490, 87300, 15960, 1, 0], [82865, 85785, 89700, 16400, 1, 0], [85145, 88145, 92165, 16850, 1, 0], [87485, 90570, 94700, 17315, 2, 0], [89895, 93060, 97305, 17790, 2, 0], [92365, 95620, 99980, 18280, 2, 0], [94905, 98250, 102730, 18780, 2, 0], [97515, 100950, 105555, 19300, 2, 0], [100195, 103725, 108460, 19830, 2, 0], [102950, 106580, 111440, 20375, 2, 0], [105785, 109510, 114505, 20935, 2, 0], [108690, 112520, 117655, 21510, 2, 0], [111680, 115615, 120890, 22100, 2, 0], [114755, 118795, 124215, 22710, 3, 0], [117910, 122060, 127630, 23335, 3, 0], [121150, 125420, 131140, 23975, 3, 0], [124480, 128870, 134745, 24635, 3, 0], [127905, 132410, 138455, 25315, 3, 0], [131425, 136055, 142260, 26010, 3, 0], [135035, 139795, 146170, 26725, 3, 0], [138750, 143640, 150190, 27460, 3, 0], [142565, 147590, 154320, 28215, 3, 0], [146485, 151650, 158565, 28990, 3, 0], [150515, 155820, 162925, 29785, 4, 0], [154655, 160105, 167405, 30605, 4, 0], [158910, 164505, 172010, 31450, 4, 0], [163275, 169030, 176740, 32315, 4, 0], [167770, 173680, 181600, 33200, 4, 0], [172380, 178455, 186595, 34115, 4, 0], [177120, 183360, 191725, 35055, 4, 0], [181995, 188405, 197000, 36015, 4, 0], [186995, 193585, 202415, 37005, 4, 0], [192140, 198910, 207985, 38025, 4, 0], [197425, 204380, 213705, 39070, 5, 0], [202855, 210000, 219580, 40145, 5, 0], [208430, 215775, 225620, 41250, 5, 0], [214165, 221710, 231825, 42385, 5, 0], [220055, 227805, 238200, 43550, 5, 0], [226105, 234070, 244750, 44745, 5, 0], [232320, 240505, 251480, 45975, 5, 0], [238710, 247120, 258395, 47240, 5, 0], [245275, 253915, 265500, 48540, 5, 0], [252020, 260900, 272800, 49875, 5, 0], [258950, 268075, 280305, 51245, 6, 0], [266070, 275445, 288010, 52655, 6, 0], [273390, 283020, 295930, 54105, 6, 0], [280905, 290805, 304070, 55590, 6, 0], [288630, 298800, 312430, 57120, 6, 0], [296570, 307020, 321025, 58690, 6, 0], [304725, 315460, 329850, 60305, 6, 0], [313105, 324135, 338925, 61965, 6, 0], [321715, 333050, 348245, 63670, 6, 0], [330565, 342210, 357820, 65420, 6, 0], [339655, 351620, 367660, 67220, 7, 0], [348995, 361290, 377770, 69065, 7, 0], [358590, 371225, 388160, 70965, 7, 0], [368450, 381435, 398835, 72915, 7, 0], [378585, 391925, 409800, 74920, 7, 0], [388995, 402700, 421070, 76985, 7, 0], [399695, 413775, 432650, 79100, 7, 0], [410685, 425155, 444550, 81275, 7, 0], [421980, 436845, 456775, 83510, 7, 0], [433585, 448860, 469335, 85805, 7, 0], [445505, 461205, 482240, 88165, 8, 0], [457760, 473885, 495505, 90590, 8, 0], [470345, 486920, 509130, 93080, 8, 0], [483280, 500310, 523130, 95640, 8, 0], [496570, 514065, 537520, 98270, 8, 0], [510225, 528205, 552300, 100975, 8, 0], [524260, 542730, 567490, 103750, 8, 0], [538675, 557655, 583095, 106605, 8, 0], [553490, 572990, 599130, 109535, 8, 0], [568710, 588745, 615605, 112550, 8, 0], [584350, 604935, 632535, 115645, 9, 0], [600420, 621575, 649930, 118825, 9, 0], [616930, 638665, 667800, 122090, 9, 0], [633895, 656230, 686165, 125450, 9, 0], [651330, 674275, 705035, 128900, 9, 0], [669240, 692820, 724425, 132445, 9, 0], [687645, 711870, 744345, 136085, 9, 0], [706555, 731445, 764815, 139830, 9, 0], [725985, 751560, 785850, 143675, 9, 0], [745950, 772230, 807460, 147625, 9, 0], [766460, 793465, 829665, 151685, 10, 0], [787540, 815285, 852480, 155855, 10, 0], [809195, 837705, 875920, 160140, 10, 0], [831450, 860745, 900010, 164545, 10, 0], [854315, 884415, 924760, 169070, 10, 0], [877810, 908735, 950190, 173720, 10, 0], [901950, 933725, 976320, 178495, 10, 0], [926750, 959405, 1000000, 183405, 10, 0], [952235, 985785, 1000000, 188450, 10, 0], [1000000, 1000000, 1000000, 193630, 10, 0] ];

// CPs needed to found a village - 0 cities to 100 cities
var DEF_CP_TRAVIAN_2 =     [0, 0, 2000, 8000, 18000, 32000, 50000, 72000,  98000, 128000, 162000, 200000, 242000, 288000, 338000, 392000, 450000, 512000,  578000,  648000,  722000,  800000,  882000,  968000, 1058000, 1152000, 1250000, 1352000, 1458000, 1568000, 1682000, 1800000, 1922000, 2048000, 2178000, 2312000, 2450000, 2592000, 2738000, 2888000, 3042000, 3200000, 3362000, 3528000, 3698000, 3872000,  4050000,  4232000,  4418000,  4608000,  4802000,  5000000,  5202000,  5408000,  5618000,  5832000,  6050000,  6272000,  6498000,  6728000,  6962000,  7200000,  7442000,  7688000,  7938000,  8192000,  8450000,  8712000,  8978000,  9248000,  9522000,  9800000, 10082000, 10368000, 10658000, 10952000, 11250000, 11552000, 11858000, 12168000, 12482000, 12800000, 13122000, 13448000, 13778000, 14112000, 14450000, 14792000, 15138000, 15488000, 15842000, 16200000, 16562000, 16928000, 17298000, 17672000, 18050000, 18432000, 18818000, 19208000, 19602000];
var DEF_CP_TRAVIAN_3 =     [0, 0, 2000, 8000, 20000, 39000, 65000, 99000, 141000, 191000, 251000, 319000, 397000, 486000, 584000, 692000, 811000, 941000, 1082000, 1234000, 1397000, 1572000, 1759000, 1957000, 2168000, 2391000, 2627000, 2874000, 3135000, 3409000, 3695000, 3995000, 4308000, 4634000, 4974000, 5327000, 5695000, 6076000, 6471000, 6881000, 7304000, 7742000, 8195000, 8662000, 9143000, 9640000, 10151000, 10677000, 11219000, 11775000, 12347000, 12935000, 13537000, 14156000, 14790000, 15439000, 16105000, 16786000, 17484000, 18197000, 18927000, 19673000, 20435000, 21214000, 22009000, 22821000, 23649000, 24495000, 25357000, 26236000, 27131000, 28044000, 28974000, 29922000, 30886000, 31868000, 32867000, 33884000, 34918000, 35970000, 37039000, 38127000, 39232000, 40354000, 41495000, 42654000, 43831000, 45026000, 46240000, 47471000, 48721000, 49989000, 51276000, 52581000, 53905000, 55248000, 56609000, 57989000, 59387000, 60805000, 62242000];
var DEF_CP_TRAVIAN_SPEED = [0, 0,  500, 2600,  6700, 12900, 21600, 32900,  46900,  63700,  83500, 106400, 132500, 161900, 194600, 230700, 270400, 313700,  360600,  411300,  465700,  524000,  586300,  652500,  722700,  797000,  875500,  958200, 1045000, 1136200, 1231700, 1331600, 1435900, 1544700, 1658000, 1775800, 1898300, 2025300, 2157100, 2293500, 2434700, 2580700, 2731500, 2887200, 3047700, 3213200,  3383700,  3559100,  3739600,  3925100,  4115800,  4311500,  4512400,  4718500,  4929800,  5146400,  5368300,  5595400,  5827900,  6065700,  6309000,  6557600,  6811700,  7071300,  7336400,  7607000,  7883100,  8164900,  8452200,  8745200,  9043800,  9348100,  9658100,  9973900, 10295400, 10622600, 10955700, 11294600, 11639300, 11989900, 12346400, 12708800, 13077200, 13451500, 13831800, 14218100, 14610400, 15008800, 15413200, 15823700, 16240400, 16663100, 17092000, 17527100, 17968400, 18415900, 18869600, 19329600, 19795800, 20268400, 20747200];


var DEF_COLOR_BUILDING_MAXLEVEL = "lightgreen";
var DEF_COLOR_BUILDING_UNUPGRADEABLE = "LightCoral";

var DEF_COLOR_RESOURCE_MAXLEVEL = "green";
var DEF_COLOR_RESOURCE_UNUPGRADEABLE = "red";


var DEF_CHAR_INFINITY = unescape("%u221E");


var IMGS_SCOUT = "data:image/gif,GIF89a%11%00%0F%00%C4%1F%00%04%04%04%02%02%02%0B%0B%0BRRR%0F%0F%0F%08%08%08%40%40%40DDD%FD%FD%FD%FC%FC%FC999%09%09%09%0D%0D%0D%3D%3D%3D333%0C%0C%0COOOKKK%F9%F9%F9%E7%E7%E7GGGHHH%14%14%14%FE%FE%FEXXX%FB%FB%FB%3A%3A%3A666222%FF%FF%FF%00%00%00%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%11%00%0F%00%00%05~%E0'%8Edin%117r%83j~%5Cv%ACR%F5~%0A%E3~%D1%B2%93%1C%8E%25%08%E3x%0E%3F%11%A7%E3!l%3E%1B%26%C0P%E2%18%3CXN%83%03%C0Rv%18NB%E0)L%3C%82%04%01%FBx%88%1C%1Ef%00p%5E%20%3C%16OW%A4(t%02kAQXd%00JX%1E%1B%2CE%10%1E%01%01%1E%22%03%08%05C%25%0EL%02%0CJ%7F%1E%0DU%17k%910%1AVI%1C%8A%8A7%AB%1F!%00%3B";
var IMGS_HERO = "data:image/gif,GIF89a%10%00%10%00%D5%3F%00%CF%AAp%F0%ABS%F7%C3p%E2W%0F%F5%DA%9A%DET%04%F4m%26%D3%B9%82%AFY%01%DC%B0Y%AEu%17%F9%8C*%FF%FD%D4%E3z%1A%FF%F0%B4%DC%87'%B4%843%FA%97G%FF%FE%FA%FF%FD%F4%FE%F7%C6%A9m*%F8%E8%C3%F7%846%C6Y%07%FDu%08%F7%956%E5%B7l%ECl%03%FC%D7%AA%E2%CF%A6%FF%FD%EC%DCa%01%FF%FF%DC%C6%9CJ%FD%F1%D4%CCL%01%FE%F3%E2%FF%E7%A7%FF%F6%DD%CF%99%3A%F6%AFc%C7%5E%17%D3S%09%E3%C3%83%E9%D0%89%FD%BEv%ED%899%E1%DB%B3%CB%97c%EF%DD%A3%E4%E9%C1%C8y%1F%EB%EB%D4%D0n%1D%DBx%11%CD%811%FC%EE%D7%FB%F6%F1%D1%819%D9%C0%9A%E5%BC%7B%FD%F6%EC%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%A6%C0%9Fp%F8%9BP%18%C4%24%B1%24%A3L%94II'A%F8%40%97%AEG%60t%15N%3A%11N%83%20!J%24%8C4%C5%B5%C8%80%02%8EcIR%83%B1%04%F8%40%1Bt%0Blz%07%1E%3F3%1B%0F%0B%1A%88%0D%1C%20%20%0A%10%00%16%3F%1F%0E%01%0D%0B%17%17%06%03%05%2B%15%90e%92%26)%99%9A%2B%24*%009%A0E%0C%26%11%06%9C%18%08%3B%5CI!%04%2F%05%24%B2%088'J%0C%026%18%0F(%0A%084%91D%13%0E%22%151%169%07%10%0A%3C%AB%92-%22%3C%3AB%3E%04%22%07VC%132%04%3ED'%04%1EO%3FA%00%3B";
var IMGS_GOLD = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%02%80IDAT8O%95%8F%FFKS%01%14%C5%CF%9Bf%9B%9B%CE%CDi%A8%11~%9DFSP%D0H%02SHiR%8A%F4E%0C%D1%BEI%C3_%A2%B0%D4%A8%88%FC%C1%AC%08%22%08%A6(I5rc%20j))R6%9BX%9A%B92%FCB%86Z%D3%D1%FC%92%7Bsm%EF%DD%DE%FE%04%0F%97%0B%17%3E%E7r%0ECD%D8%96%04%C3%B6%84m%D1%FE8D%1CO%AC%8F%C8%C3%0A%A7%97%88%ED1%CC%96j%B5%07s4%8D%FA%86%A1%B1%95%85_.%A2u%9F%878%FA%CBq%1C%7C%1C%B9%B6Vy%DAt%DA7%1E%DF%7Dp8%3B%24%2F%1B%B5%A5%CCYm%E8%DE%18%C4*B%D3%E3%A5%0Du%E5%B4E%2C%E7%E0y%1E%3C%910%A3%D6%C1L%8D4G%03%B3%3E%CE%F9CE%93*%FA%B6%7B%E1%033%F7.%E6%E9%1DI%5E%12*%8E%5D%F6%08%A4%60%D8t%3B%5DN%3AUPPS%C5%2C%7C%8A%A3%C5Xv%1C%F4%054%06%FA%0C%FA%0A%FA%8D%FE%E7L%AC%12%AB%AC%CFo%20%DA%EA%D0%1B2va~8%CAc%83%D7%02%1A%01%2Bl%1BC69Y%E44%0E%F7lx%BA%1Ak.%AF%BF%83%10%FD%90%3A%A2%F5%3Ah*%90%ED%85%9F%18%00g%0Df%DF%E3%9F%15d%15s%23%D8%98%8CJ%8F%87%DBC%5E%AF%17%2F%9A%8DGR%B0%DC%A7pu%82%FAU%BCq%07%F5%83%7F%A5%E2%FB%22i0%88%7D%0D%9A%C0%A2E%9C%9B%0E%87%D3%E5%F1xPv%F4%A4.%0F%D3-%20%23%7C%ED%E0_%82%EB%90%911%807%89%7C%5D%C2%8B%B0%A5%F6%08%5D%16Rd%09%8B%F6e%B7%DB%8D%01SKI~d%F7-%5C%C8%92%0D%3D%C2%92%00%3D%83%B7%0Dd%02%F5%C0%DC%844ExY%11%F6%84%04%14%17%96%AC9%960%F5%D1v%20%86%B1%B7%E1%CD%95%B8%D6%3CE%B3V2rZ%F4%F6%12%9A%CB%C5%95%B9%CAD1Zt%A1%835%A8H%96I%C3%B0%B6I%98%9B%FDyQw%A3j%1F%D6%9F%C8%E9~%E0%FCC%18%CE%E0%DE9%E9%D5%02%98%ABE3M%01%EB%9D%3B%8B%13Q_%CB%24%C4%07%AD%3AV%F0%FD%8F%BD%7B%D8%AC%16%85U%A7%89%2Cu%D2%A9%DB%C1%A4%97P%1BC%8D%0C%7F%13%3D%958%91%8A%FD%09%D2Q%9B4%23J%E8%3D%81%E9%99%C9%FAk%E7%D3%92T%99%C9%A2%E8H%A8%25!%85I%C8%D7%A0(Z%96%AAD%B0%5Cy%3C%3F%C2n%C2roPN%B6%D2%D0%D5%F5%1F%12%C3%AAx%A3%F9)%8F%00%00%00%00IEND%AEB%60%82';
var IMGS_FAKE = 'img/un/a/att1.gif';
var IMGS_CRANNY = "data:image/png,%89PNG%0D%0A%1