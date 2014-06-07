// ==UserScript==
// @name           Travian QP Targets
// @version        3.0.0
// @namespace      QP
// @description    Simplifies lots of Travian tasks - v3.0.0
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
<h2>Buildings / Fields / Troops / Research</h2>
<ul>
	<li>Time To Build - Each resource missing and timer to make stuff</li>
	<li>NPC Time To Build - Resources missing and timer for total resources to make stuff</li>
</ul>

<h3>Instruction details</h3>
<ul>
	<li>Time To Build
		<ul>
			<li>If the warehouse and/or granary needs to be upgraded each respective image is shown</li>
			<li>Else, if any resource is missing some amount to complete any action:
				<ul>
					<li>show each resource amount that is missing</li>
					<li>show a timer that indicates when is that amount going to be available</li>
					<li>when the timer reaches 0, the page refreshes so that the action is available and can be clicked</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>NPC Time To Build
		<ul>
			<li>If any resource is missing some amount to complete any action:
				<ul>
					<li>If total available resources (TAR) > total needed resources (TNR):
						<ul>
							<li>show a <img src="" alt="gold coin"/> link to the Market, NPC trading</li>
						</ul>
					</li>
					<li>Else:
						<ul>
							<li>show a <img src="" alt="gold coin"/> with the total missing resources</li>
							<li>show a timer which indicates when will the TAR reaches the TNR</li>
							<li>when the timer reaches 0, the <img src="" alt="gold coin"/> becomes a link and the rest disappears</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</li>
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
			a space or minor (a &lt;br/> is placed automatically at the end of a line). (regex: w+://[^s&lt;] )</li>
		</ul>
	</li>
	<li>Auto Report Delete
		<ul>
			<li>Click the button in the new table for the report type you want to delete</li>
			<li>This will try indefinitely to delete all reports. It will stop when:
				<ul>
					<li>it reaches an empty reports page</li>
					<li>the current page is not a reports list page</li>
					<li>the current page is a reports list page, but not either of these:
						<ul>
							<li>report list of the type to be deleted</li>
							<li>report list of the type "all reports" - after deleting 1 page of a type
								the next page has this url</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>As a result, if it is interrupted for any reason and no other page is visited (eg.: disabling
				script, ...) it may happen that this is resumed when the report list page is visited.</li>
			<li>If this happens, just visit any other page while the script is enabled and the action should
				be stopped</li>
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
			<li>Plus Feature: Archive IGMs/Reports</li>
			<li>Plus Feature: Notes</li>
			<li>Delayed Send Troops: Hop village in background so that you can prepare multiple attacks from multiple villages</li>
			<li>Rally Point: Text to clipboard with the incoming attacks, town, granary, crop prod, curr crop,...</li>
			<li>Improve general performance ( specially main ) </li>
			<li>Add a mailing list possibility to send IGMs to multiple people</li>
			<li>Add retrieve all reinforcement reports to a exportable format and put it in QP clipboard</li>
			<li>Market Send: show each cumulative Arriving Totals per merchant arrival in scrolable table</li>
			<li>Market Send Resource Timers: when on negative production, add the possibility of the arriving resource maxing out the capacity - the rest it wasted</li>
			<li>Market Send Resource: limit total resources sent to current merchants in town</li>
			<li>Rally Point: Troop Group Links: try to make links without having the #</li>
			<li>NPC Time To Build: With NPC autofill</li>
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
	<li>3.0.0 - 08-04-29
		<ul>
			<li>added: Time To Build feature</li>
			<li>added: NPC Time To Build feature</li>
			<li>improve: Rally Point Troop Group Links: "Costs" link (to upgrade building) is back</li>
			<li>improve: Rally Point Troop Group Links: Oasis links mention the oasis and then what type of gourp it is</li>
			<li>improve: Rally Point Troop Group Links: all links are now working again - oasis links were now links to the oasis page</li>
			<li>improve: Delete Reports is now safe(r)</li>
			<li>improve: Market Send Resources code cleanup</li>
			<li>improve: Less output (on error console) as per default on release version</li>
			<li>bugfix: Total Troop Table no longer wrong when there are Incoming Troops</li>
			<li>bugfix: Rally Point Village Reinfs Away Coordinates - only applies on village
				links, not on user links so those "(NaN|NaN)" should all disappear </li>
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
					<li>Graphic pack used or if none is used</li>
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

	<li>2.9.2 - 08-04-22
		<ul>
			<li>bugfix: Building Levels work with lvl 0 buildings (different image)</li>
		</ul>
	</li>
	<li>2.9.1 - 08-04-22
		<ul>
			<li>improved: Building Levels now allow any graphic packs</li>
		</ul>
	</li>
	<li>2.9.0 - 08-04-17
		<ul>
			<li>improved: Building Levels rewritten - simplified, organized, prepared for future, works in FF3</li>
			<li>improved: Resource Field Levels take capital into account - visit Profile to learn the capital</li>
			<li>bugfix: Culture Points table had the hour repeated if less than a day was missing for next level</li>
			<li>bugfix: Culture Points table had the title wrong on FF2 (I had tested on FF3 only)</li>
		</ul>
	</li>
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
			<li>improved: resource timers now show &infin; when applicable (eg.: 0 production, ...)</li>
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
			<li>added: shortcut key "SPACE" for "&raquo;" links - next page on message/report list pages</li>
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
var DEF_PARTKEY_INFO_DORF1 = DEF_UNDERSCORE + "infoDorf1";
var DEF_PARTKEY_INFO_DORF2 = DEF_UNDERSCORE + "infoDorf2";
var DEF_PARTKEY_UNDER_CONSTRUCTION = DEF_UNDERSCORE + "underConstruction";


var DEF_PARTKEY_LANG_FIELDS = "lang_fields";
var DEF_PARTKEY_LANG_LEVEL = "lang_level";

var DEF_PARTKEY_CAPITALVILLAGEID = "capitalVillageId";
var DEF_PARTKEY_REPORTSACTION = "reportsAction";
var DEF_PARTKEY_SMARTPREVIOUSPAGE = "smartPreviousPage";
var DEF_PARTIALPERMANENTMKEY_SINGLEVILLAGEINFO = "singleVillageInfo";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_ARRIVING = "arrivingMerchants";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_OWNMERCHANTS = "ownMerchants";
var DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS = "lang_reinforcements";
var DEF_PARTIALPERMANENTMKEY_QP_CLIPBOARD = "QPClipboard";
var DEF_PARTKEY_PREFIX = getServerName() + DEF_UNDERSCORE + getUserId() + DEF_UNDERSCORE;


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

var DEF_COLOR_RESOURCE_UNDERCONSTRUCTION = "blue";
var DEF_COLOR_RESOURCE_MAXLEVEL = "green";
var DEF_COLOR_RESOURCE_UNUPGRADEABLE = "red";


var DEF_CHAR_INFINITY = unescape("%u221E");


var IMGS_SCOUT = "data:image/gif,GIF89a%11%00%0F%00%C4%1F%00%04%04%04%02%02%02%0B%0B%0BRRR%0F%0F%0F%08%08%08%40%40%40DDD%FD%FD%FD%FC%FC%FC999%09%09%09%0D%0D%0D%3D%3D%3D333%0C%0C%0COOOKKK%F9%F9%F9%E7%E7%E7GGGHHH%14%14%14%FE%FE%FEXXX%FB%FB%FB%3A%3A%3A666222%FF%FF%FF%00%00%00%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%11%00%0F%00%00%05~%E0'%8Edin%117r%83j~%5Cv%ACR%F5~%0A%E3~%D1%B2%93%1C%8E%25%08%E3x%0E%3F%11%A7%E3!l%3E%1B%26%C0P%E2%18%3CXN%83%03%C0Rv%18NB%E0)L%3C%82%04%01%FBx%88%1C%1Ef%00p%5E%20%3C%16OW%A4(t%02kAQXd%00JX%1E%1B%2CE%10%1E%01%01%1E%22%03%08%05C%25%0EL%02%0CJ%7F%1E%0DU%17k%910%1AVI%1C%8A%8A7%AB%1F!%00%3B";
var IMGS_HERO = "data:image/gif,GIF89a%10%00%10%00%D5%3F%00%CF%AAp%F0%ABS%F7%C3p%E2W%0F%F5%DA%9A%DET%04%F4m%26%D3%B9%82%AFY%01%DC%B0Y%AEu%17%F9%8C*%FF%FD%D4%E3z%1A%FF%F0%B4%DC%87'%B4%843%FA%97G%FF%FE%FA%FF%FD%F4%FE%F7%C6%A9m*%F8%E8%C3%F7%846%C6Y%07%FDu%08%F7%956%E5%B7l%ECl%03%FC%D7%AA%E2%CF%A6%FF%FD%EC%DCa%01%FF%FF%DC%C6%9CJ%FD%F1%D4%CCL%01%FE%F3%E2%FF%E7%A7%FF%F6%DD%CF%99%3A%F6%AFc%C7%5E%17%D3S%09%E3%C3%83%E9%D0%89%FD%BEv%ED%899%E1%DB%B3%CB%97c%EF%DD%A3%E4%E9%C1%C8y%1F%EB%EB%D4%D0n%1D%DBx%11%CD%811%FC%EE%D7%FB%F6%F1%D1%819%D9%C0%9A%E5%BC%7B%FD%F6%EC%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%A6%C0%9Fp%F8%9BP%18%C4%24%B1%24%A3L%94II'A%F8%40%97%AEG%60t%15N%3A%11N%83%20!J%24%8C4%C5%B5%C8%80%02%8EcIR%83%B1%04%F8%40%1Bt%0Blz%07%1E%3F3%1B%0F%0B%1A%88%0D%1C%20%20%0A%10%00%16%3F%1F%0E%01%0D%0B%17%17%06%03%05%2B%15%90e%92%26)%99%9A%2B%24*%009%A0E%0C%26%11%06%9C%18%08%3B%5CI!%04%2F%05%24%B2%088'J%0C%026%18%0F(%0A%084%91D%13%0E%22%151%169%07%10%0A%3C%AB%92-%22%3C%3AB%3E%04%22%07VC%132%04%3ED'%04%1EO%3FA%00%3B";
var IMGS_GOLD = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%02%80IDAT8O%95%8F%FFKS%01%14%C5%CF%9Bf%9B%9B%CE%CDi%A8%11~%9DFSP%D0H%02SHiR%8A%F4E%0C%D1%BEI%C3_%A2%B0%D4%A8%88%FC%C1%AC%08%22%08%A6(I5rc%20j))R6%9BX%9A%B92%FCB%86Z%D3%D1%FC%92%7Bsm%EF%DD%DE%FE%04%0F%97%0B%17%3E%E7r%0ECD%D8%96%04%C3%B6%84m%D1%FE8D%1CO%AC%8F%C8%C3%0A%A7%97%88%ED1%CC%96j%B5%07s4%8D%FA%86%A1%B1%95%85_.%A2u%9F%878%FA%CBq%1C%7C%1C%B9%B6Vy%DAt%DA7%1E%DF%7Dp8%3B%24%2F%1B%B5%A5%CCYm%E8%DE%18%C4*B%D3%E3%A5%0Du%E5%B4E%2C%E7%E0y%1E%3C%910%A3%D6%C1L%8D4G%03%B3%3E%CE%F9CE%93*%FA%B6%7B%E1%033%F7.%E6%E9%1DI%5E%12*%8E%5D%F6%08%A4%60%D8t%3B%5DN%3AUPPS%C5%2C%7C%8A%A3%C5Xv%1C%F4%054%06%FA%0C%FA%0A%FA%8D%FE%E7L%AC%12%AB%AC%CFo%20%DA%EA%D0%1B2va~8%CAc%83%D7%02%1A%01%2Bl%1BC69Y%E44%0E%F7lx%BA%1Ak.%AF%BF%83%10%FD%90%3A%A2%F5%3Ah*%90%ED%85%9F%18%00g%0Df%DF%E3%9F%15d%15s%23%D8%98%8CJ%8F%87%DBC%5E%AF%17%2F%9A%8DGR%B0%DC%A7pu%82%FAU%BCq%07%F5%83%7F%A5%E2%FB%22i0%88%7D%0D%9A%C0%A2E%9C%9B%0E%87%D3%E5%F1xPv%F4%A4.%0F%D3-%20%23%7C%ED%E0_%82%EB%90%911%807%89%7C%5D%C2%8B%B0%A5%F6%08%5D%16Rd%09%8B%F6e%B7%DB%8D%01SKI~d%F7-%5C%C8%92%0D%3D%C2%92%00%3D%83%B7%0Dd%02%F5%C0%DC%844ExY%11%F6%84%04%14%17%96%AC9%960%F5%D1v%20%86%B1%B7%E1%CD%95%B8%D6%3CE%B3V2rZ%F4%F6%12%9A%CB%C5%95%B9%CAD1Zt%A1%835%A8H%96I%C3%B0%B6I%98%9B%FDyQw%A3j%1F%D6%9F%C8%E9~%E0%FCC%18%CE%E0%DE9%E9%D5%02%98%ABE3M%01%EB%9D%3B%8B%13Q_%CB%24%C4%07%AD%3AV%F0%FD%8F%BD%7B%D8%AC%16%85U%A7%89%2Cu%D2%A9%DB%C1%A4%97P%1BC%8D%0C%7F%13%3D%958%91%8A%FD%09%D2Q%9B4%23J%E8%3D%81%E9%99%C9%FAk%E7%D3%92T%99%C9%A2%E8H%A8%25!%85I%C8%D7%A0(Z%96%AAD%B0%5Cy%3C%3F%C2n%C2roPN%B6%D2%D0%D5%F5%1F%12%C3%AAx%A3%F9)%8F%00%00%00%00IEND%AEB%60%82';
var IMGS_FAKE = 'img/un/a/att1.gif';
var IMGS_CRANNY = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%005%00%00%009%08%03%00%00%00%A1%FA%939%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%03%00PLTE%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FFDb%B0P%00%00%04TIDATHK%9D%96%3D%92%C28%10F%95%99%CCw%EBN%A4%C4%C7p%26%05%94%02%8EA('%3A%05G%20%99%9A%CB%EC%EB%96%871%0Clm%AD%8A%81%B1%A5%D7%BF%9Fd%87%F9%FF%8C%F0%19%AA1%7D%9A%FCL%D5%B8%C4%F6%01%FBHuY%96%18%3E%60%9F%A8%1A%23T%AC%EF%9D%7D%A2%F0%C4%88Z%D3%3Bw%EF%A9V%07%B5H%3CK%EE5%BF%F8%7CC%A5(%CB%D9%02%C4%97%2C%97%F3%99%AF%E5%D9%E3_J%E5%12Y%1B%A2%C4(%97%CB%F9rY%F8%7Bn%C2%1F%AA%C43%83%A5Z%AB%E2%0E_F%FE%3B%95%A2%2F%BAD)%F3%DC%25%18u%BE%2C%2F%C5%7C%F5%95%80%CC%D5h%B1%5Dy%8C%2F*y%A5%B2%055%B2%A1ne%A1(%17n%7D%ACaM%923%D6%BDzq%117%2FA%F5%1C%D3k%B3%7F%7Cu%15YDjK%82%24D%2C%BE%9C%24%B0%3E%FF%ED%B3Q%3D%F79%99%7D%FA%83%B7%25%25%11n%B7u%15%A0%9EK%AD%7D~j%B4Q%84SL%0B%16%9B%D4%DE%A9%82QyU%0B2Z%EF%A2%9C%8F%B9Ai%A4%B2%81%A21%08R%C9%A2%92b%D3U-%1FZ%B1%5C%22k%0E%C9%05%22%8A%14%8CT%A8%9D%98%CDE%E7%8A%11%D2%C4%92%F9%B5%82%02%1E%D2%0B%95%C5%AE%05%D83%FA%A3%3F.%25%AE%05%09jZv%AD%04%8Fw%8C%D0m%B5%F7%D5%9C%B9%05d%E8%B2%B2%2F%F1i%EB5%C9%1F(%04%EEM%B5~%DAZ%D3%0F%EB%DD3%B6%9Cb%E6%A9%D7%81%B4%08%DF%B7%83%7B2%11%92%93%FF%9A_%9F%8Cf%E0%20F%D2%A6n%CC)%B5%1Fb%B7%10%CD%94%F9E%22%C1(%0B6%FE%26%16%10%03%D5J9Y%E9%C7%06%A6xcp'7%FB6%DEj%FB%A8%06%1AH1S%E0%B1j%C1%BC%04%BC%3B%8C%189v%FC%C2%2C%1C%A9%FD%FF%1Al%C3%03%F5%B9h%86%E0%AC%B1u5s%11%A2%96%A7.%3F%0C%A4%98%14%C3%A1%CF%3D%D4%9E%C2P%BD%B7G%B3%A2%B3C%BF%8E%17H%B5%CD%89%F0U%E6%3AThCC%AFR%90%F8%9B%08%89%A5%D9%04%8E%E6%2C5_q%85%DB%CA%16%9A3%07%DCq%3F%1F%F6%B2u%8E(%D9%20%B5K%AA%D75%AD%8C%EB%0D%FD%9B%12%0E%25%9C%7F%A9lm%F6%12%AE%D75%04%BD%AD%2B%9FU5%08%9F%E7%13%E7%40q%F8%B9%3C%A4%AE%B7%EB%F5z%5B%AF%DA%1AB%A70C*O%FD%DAs%A4)%DEL%9EZm%BD%D9X%F7%FC%91%BD7%EC%B7%F4%0F_%FDG%0F%F4k%AEW%A3%DCvO%AA%A6%B8e%F9m%F2!%2F%B53%26%AA%EF%DFF%11n7%EF%B1N%F7%D3%D8%A0o%2B%DF%0AZ%DC%1BK%1D%C1%A0%B2n%F7%EF%EF%A2%05%B9%7C%EE%F2%3E%D3%3D%B1%82%B4%B6%D37%03%F2~%D8%CA%87%08%8F%22%E9%EEK%B5l%E6j%8C%FFBQ%F9%ABle%BA%3F%A8%E9%BDz%1F%CEZ%D1%D5(%B29Yl%D34%15%02%D5%E4%95r9%3F%AB%D7%AEr%D9%0A%7D6j%82%3A%05%1F%F7%89%1C%7F%B0'%AA%156Q%25%99%C9%7C%DDH%0BW2()'%C6%9E%DC%91%AAL%14%D5%13%94%3A%B5m%DC%18P%60%8E8%F7%AD%F9K5L%9B%B5%8D1%A8%95%BC6E%BE%06aa%9B%B8%7C%CE%CB%02%03%DAXH%F2%DE%2F)%A5%F3%ACh%0D%12S%F8%C5%A87%FB%F1%FC%1A%90s%2C%F2%BC%F6%23%E0%0B%B4L%93c%18%B4%8A%0C%AA%CDn%CC%82%3BMJ%89%C5t%B8%B6%AF%AFQ%E2Z%8AS%CC%DF%AD%22%3B%85t%ECfa%96'QM%EEk%ED_%3F%8A%DD)%0A%B2%DD%A9%88S%25%05%3D%DD%AD%80%3CSs%AD5%0F%AA%3D%A8%B9%7Bb%23%EF%3C%A8%CA3%95%1En%CA%AFAP%BE%2B%DB%D7%CC%B3u%C4%E8%11%8E%A1%C5%A9%D6x%BF%CA%14!%25%C2%1B%BE%8C%AA%A4%B5S%7D%9B%2C%85A%E9%B1%CB%5E%06%10%5E%85%DC%D7%F5%20sk%CCFV%24B%1E%07%8A8U%02_%19%C8%8F%00w%E6%E3%AB%FB%CEd%EF%C0h%1D%94%BD%1A0%3A%AF%1BZx%C8x1p%96%8D%B2%3Fkv-%82E_%B8%FB%B2%13%CC%13%CA%C9%8EP%C4%C7%A1h%C7)%EB%1B%C6%C6%F6gz%B8~h%C3%A8%D6zK%2C%E2U%23%A1%81Z~J%B1%C7%F9%F8%F9%07%82z'%8F%00g3%F3%00%00%00%00IEND%AEB%60%82";
var IMGS_CLOCK = "img/un/a/clock.gif";


/** wood, clay, iron, crop */
var g_res_now = new Array(4);
var g_res_prod = new Array(4);
var g_res_max  = new Array(4);


/** retrieveResourcesInfo */
function retrieveResourcesInfo() {
	for(var i=0; i<4; i++) {
		var resourceNode = document.getElementById("l" + (4-i));
		var resourceNowMaxParts = resourceNode.innerHTML.split("/");
		g_res_now[i] = resourceNowMaxParts[0];
		g_res_max[i] = resourceNowMaxParts[1];
		g_res_prod[i] = resourceNode.title;
	}
}



function main() {												dbg("[ - MAIN - ]");
	createAllCSSs();

	if (isThisPageTravianTeamMessagePage()) {					dbg("[-][isTravianTeamMessagePage]");
		retrieveTravianTeamMessage();
	}


	retrieveResourcesInfo();


	// All single village and village list creation is inside here
	if (!isVillageListPresent()) {								dbg("[-][!isVillageListPresent]");
		if (isThisPageProfile()) {								dbg("[--][isThisPageProfile]");
			if (isThisPageMyProfile()) {						dbg("[---][isThisPageMyProfile]");
				findAndSaveSingleVillageInfo();
			}
		}
		if (isThisPageDorf3()) {								dbg("[--][isPageDorf3]");
			findAndSaveSingleVillageInfo();
		}
		transformPageAllPages_addVillagesList();
	}


	// Delete reports action
	if (isToDeleteReportsOfGivenType()) {						dbg("[-][isToDeleteReportsOfGivenType]");

		if (isThisPageReportListToDeletePage) {					dbg("[--][isThisPageReportListToDeletePage]");
			transformPageReportList_addSelectAllCheckbox();
			actionPageReportsTradeList_deleteAllReportsOfGivenType();
			return;
		} else {												dbg("[--][!isThisPageReportListToDeletePage]");
			gmReset_ReportsAction();
		}
	}


	if (CONFIG_FEATURE_VILLAGE_TARGETS) {
		// QP Targets - created on all pages except...
		if (!	(
					isThisPageSendTroopsConfirmation() ||
					isThisPageRallyPoint() ||
					isThisPageAnyBuildingPage() ||
					isThisPageWWStatistics()
				)
			) {
				dbg("[-]NOT: SendTroopsConfirmation, RallyPoint, AnyBuildingPage, WWStatistics");
				transformGeneric_findTargetsToCreateTargetLinks();
		}
	}


	// PAGES
	if (isThisPageAnyIGMPage()) {								dbg("[-][isThisPageAnyIGMPage]");

		if (isThisPageIGM()) {									dbg("[-][isThisPageIGM]");

			transformPageIGM_createLinks();

		} else if (isThisPageIGMList()) {						dbg("[-][isThisPageIGMList]");

			transformPageIGMsList_addSelectAllCheckbox();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}

	} else if (isThisPageAnyReportPage()) {						dbg("[-][isThisPageAnyReportPage]");

		if (isThisPageReportReinf()) {							dbg("[--][isThisPageReportReinf]");

			retrieveReportReinf_AppendToQPClipboard();

		} else if (isThisPageReportAttackScout()) {				dbg("[--][isPageReportAttackScout]");

			transformPageScoutReport_createQuickFarmInputs();

		} else if (isThisPageAnyReportList()) {					dbg("[--][isPageAnyReportList]");

			transformPageReportList_addSelectAllCheckbox();
			transformPageReportList_addDeleteByReportTypeButtons();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}
		/*if (isPageReportAttack(document.location.href)) {		dbg("[-][isPageReportAttack]");
			getInfoPageAttackReport_getDateInfo();
		}*/

	} else if (isThisPageAnyAlliancePage()) {					dbg("[-][isThisPageAnyAlliancePage]");

		if (isThisPageAllianceForumMsgs()) {					dbg("[--][isPageAllianceForumMsgs]");
			transformPageAllianceForumMsgs_createLinks();
		}

	} else if (isThisPageAnySendTroopsPage()) {					dbg("[-][isThisPageAnySendTroopsPage]");

		if (isThisPageSendTroops()) {							dbg("[--][isThisPageSendTroops]");

			savePermanentMyTribe();

			if (isToMoveTroopsToThisVillage()) {				dbg("[---][isToMoveTroopsToThisVillage]");
				var ret = actionPageSendTroops_universalTroopsMove();
				if (ret) { return; }
			}

			transformGeneric_addAutoCompleteFromPlus();

		} else if (isThisPageSendTroopsConfirmation()) {		dbg("[--]isThisPageSendTroopsConfirmation");

			var village = xpathEvaluate('//a[contains(@href, "karte.php?d=")]').snapshotItem(0).href;

			if (isToMoveTroopsToVillage(village)) {				dbg("[---][isToMoveTroopsToVillage]");

				actionPageSendTroopsConfirmation_universalTroopsMove(village);
				return;

			} else {											dbg("[---][!isToMoveTroopsToVillage]");

				// no action, then transform page
				transformPageSendTroopsConfirm_addTimeOffArrivalSync();
			}
		}

	} else if (isThisPageAnyBuildingPage()) {					dbg("[-][isThisPageAnyBuildingPage]");

		transformPageGeneric_addBuildTime();

		if (isThisPageRallyPoint()) {							dbg("[--][isPageRallyPoint]");
			getInfoRallyPoint_ReinforcementsLang();
			getInfoRallyPoint_CreateIncomingAttacksReport();
			transformPageRallyPoint_addOwnTownTotalTroopsTable();
			transformPageRallyPoint_addLinksForTroopGroups();
			transformPageRallyPoint_addCoordsForOwnVillageReinfsAway();

		} else if (isThisPageMarketSend()) {					dbg("[--][isThisPageMarketSend]");
			lang_get_market_sendResources_MerchantGroupTitles();
			transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion();
			transformPageMarketplaceSendResources_addMerchantsUsed();
			transformPageMarketplaceSendResources_addExtraQuantities();
			transformPageMarketplaceSendResources_addCumulativeArrivals();
			transformGeneric_addAutoCompleteFromPlus();

		} else if (isThisPageMarketSendConfirmation(true)) {	dbg("[--][isThisPageMarketSendConfirmation]");
			transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton();

		} else if (isThisPageHeroMansionPage()) {				dbg("[--][isThisPageHeroMansionPage]");
			transformPageHeroMansion_addHeroLevelInfo();

		} else if (isThisPageTreasuryPage()) {					dbg("[--][isThisPageTreasuryPage]");
			transformPageTreasury_addCoordsForConstructionPlanHolderVillages();

		} else if (isThisPageAnyResidencePalacePage()) {		dbg("[--][isThisPageAnyResidencePalacePage]");

			if (isThisPageResidencePalaceCulturePointsPage()) {	dbg("[---][isThisPageResidencePalaceCulturePointsPage]");
				transformPageResidenceOrPalaceCulturePoints_addCPsForVillages();
			}
		}

	} else if (isThisPageDorf2()) {								dbg("[-][isThisPageDorf2]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf2_Info();
		transformPageDorf2_addBuildingLevels();

	} else if (isThisPageDorf1()) {								dbg("[-][isThisPageDorf1]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf1_FieldsNamesLang();
		retrievePageDorf1_Info();
		transformPageDorf1_addColorsToResourceFieldsLevels();

	} else if (isThisPageVillage()) {							dbg("[-][isThisPageVillage]");

		if (isToMoveTroopsToThisVillage()) {					dbg("[--][isToMoveTroopsToThisVillage]");
			actionPageGeneric_followFirstSendTroopsLink();
			return;
		}

	} else if (isThisPageAnyStatisticsPage()) {					dbg("[-][isThisPageAnyStatisticsPage]");

		if (isThisPageWWStatistics()) {							dbg("[--][isThisPageWWStatistics]");

			transformPageWWStatistics_addCoordsForWWVillages();
		}

	} else if (isThisPageProfile()) {							dbg("[-][isThisPageProfile]");

		if (isThisPageMyProfile()) {							dbg("[--][isThisPageMyProfile]");

			retrieveMyProfile_Capital();
		}
	}
	
	


	transformGenericPage_fixTitle();
//	transformGeneric_addQPConfigurationMenu();
	if (CONFIG_FEATURE_RESOURCES_INFO) {
		transformGeneric_addOverflowDepleteTimes();
	}

	// Start the timers
	QPTimersCollect();
	QPTimersUpdate();
}


/**
* transformPageGeneric_addBuildTime
*/
function transformPageGeneric_addBuildTime() {
	var clocksCells = xpathEvaluate('//img[@src="img/un/a/clock.gif"]/../../td');
	
	for(var i=0, len=clocksCells.snapshotLength; i<len; i++) {
		var currentClockCell = clocksCells.snapshotItem(i);
		var resources = retrieveResourcesAndTimeFromCell(currentClockCell);
		debug(DBG_NORMAL, "[transformPageGeneric_addBuildTime] \n"
				+ " resources " + resources
				+ "\n currentClockCell.innerHTML " + currentClockCell.innerHTML
				);

		createBuildTimeSpan(resources, currentClockCell.parentNode.parentNode);
	}
}



/**
* createBuildTimeSpan
*/
function createBuildTimeSpan(resources, parentTable) {
	var needsMoreResources = false;
	var maxTimeToReady = 0;
	var warehouseNeeded = 0;
	var granaryNeeded = 0;
	var totalResourcesActual = parseInt(0);
	var totalResourcesNeeded = parseInt(0);
	var neededResources = new Array();
	for(var j=0; j<g_res_now.length; j++) {
		var neededResource = parseInt(resources[j]);
		var diff = neededResource - g_res_now[j];
		neededResources[j] = (diff > 0) ? diff : 0;
		needsMoreResources = needsMoreResources || (diff > 0);
		var thisTimeToReady = (diff > 0) ? (diff/g_res_prod[j]) : 0;
		maxTimeToReady = (thisTimeToReady > maxTimeToReady) ? thisTimeToReady : maxTimeToReady;
		totalResourcesNeeded += neededResource;
		totalResourcesActual += parseInt(g_res_now[j]);

		if (j<3) {
			warehouseNeeded = warehouseNeeded > neededResource ? warehouseNeeded : neededResource;
		} else {
			granaryNeeded = granaryNeeded > neededResource ? granaryNeeded : neededResource;
		}

		debug(DBG_NORMAL, "[createBuildTimeSpan] \n"
			+ " j " + j
			+ "\n needsMoreResources " + needsMoreResources
			+ "\n totalResourcesActual " + totalResourcesActual
			+ "\n totalResourcesNeeded " + totalResourcesNeeded
			+ "\n neededResources " + neededResources
			+ "\n thisTimeToReady " + thisTimeToReady
			+ "\n timeToReady " + maxTimeToReady
			+ "\n diff " + diff
		);
	}



	// Enough resources already no more needed
	if (!needsMoreResources) { return; }



	var warehouseOrGranaryNeeded = false;
	// Warehouse needs upgrading
	if (warehouseNeeded > g_res_max[0]) {
		var tr = createElementAppend('tr', parentTable);	
		var td = createElemAppendAndSetInner('td', tr, '<img src="img/un/g/g10.gif" />');
		warehouseOrGranaryNeeded = true;
	}

	// Granary needs upgrading
	if (granaryNeeded > g_res_max[3]) {
		var tr = createElementAppend('tr', parentTable);	
		var td = createElemAppendAndSetInner('td', tr, '<img src="img/un/g/g11.gif" />');
		warehouseOrGranaryNeeded = true;
	}

	// If warehouse or granary is needed then there is no point in showing how many resources are needed
	if (warehouseOrGranaryNeeded) {
		return;
	}



	var res = '<span class="c" style="white-space:nowrap;">'
			+ '<img class="res" src="img/un/r/1.gif" />' + neededResources[0] + ' | '
			+ '<img class="res" src="img/un/r/2.gif" />' + neededResources[1] + ' | '
			+ '<img class="res" src="img/un/r/3.gif" />' + neededResources[2] + ' | '
			+ '<img class="res" src="img/un/r/4.gif" />' + neededResources[3] + ' | '
			+ '<img class="res" src="img/un/a/clock.gif" />'
			+ '<span id="QPtimer">' + timeInSecondsToColonSeparatedTxt(maxTimeToReady*3600) + '</span>'
			+ ' '
			+ '</span> ';
	window.setTimeout(actionRefreshPage, maxTimeToReady*3600*1000);

	var tr = createElementAppend('tr', parentTable);	
	var td = createElemAppendAndSetInner('td', tr, res);
	td.colSpan = 0;



	var goldSpan = createElementAppend('span', td);
	goldSpan.className = "c";

	parentTable.style.whiteSpace = "nowrap";
	td.style.whiteSpace = "normal";
	goldSpan.style.whiteSpace = "nowrap";

	var totalResourceDiff = totalResourcesActual - totalResourcesNeeded;
		debug(DBG_NORMAL, "[createBuildTimeSpan] \n"
			+ "\n totalResourceDiff " + totalResourceDiff
		);
	if (totalResourceDiff > 0) {
		goldSpan.innerHTML = '<a href="build.php?gid=17&t=3"><img class="res" src="'+IMGS_GOLD+'" /></a>';
	} else {
		var totalProduction = 0;
		for(var i=0; i<g_res_prod.length; i++) {
			totalProduction += parseInt(g_res_prod[i]);
		}
		var timeInSeconds = ((-totalResourceDiff)/totalProduction) * 3600;
		goldSpan.innerHTML = ''
				+ '<img class="gold" src="'+IMGS_GOLD+'" />' + (-totalResourceDiff) + '|'
				+ '<img class="res" src="img/un/a/clock.gif" />'
				+ '<span id="QPtimer">'
				+ timeInSecondsToColonSeparatedTxt(timeInSeconds)
				+ '</span>';

		window.setTimeout(function() {
			goldSpan.innerHTML = '<a href="build.php?gid=17&t=3"><img class="res" src="'+IMGS_GOLD+'" /></a>';
		}, timeInSeconds*1000);
		debug(DBG_NORMAL, "[createBuildTimeSpan] \n"
			+ "\n timeInSeconds*1000 " + timeInSeconds*1000
		);
	}
}

function actionRefreshPage() {
	document.location.href = document.location.href;
}


/** transformGenericPage_fixTitle */
function transformGenericPage_fixTitle() {
	if ((CONFIG_TITLEFIX != 1) && (CONFIG_TITLEFIX != 2) && (CONFIG_TITLEFIX != 3)) { return; }
	var titleInPage = xpathEvaluate('//h1');
	if (titleInPage.snapshotLength == 0) { return; }	// just in case a page has no title
	var titleInPageStr = titleInPage.snapshotItem(0).textContent;
	if (document.location.pathname.indexOf('/dorf2.php') == 0) {
		titleInPageStr = String.fromCharCode(164, 32) + titleInPageStr;
	}

	switch (CONFIG_TITLEFIX) {
		case 1:	// Adds the title inside the page
				document.title += " - " + titleInPageStr;
				break;

		case 2:	// Crops the document title and adds the title inside the page
				var dTitle = document.title;
				var spacePos = dTitle.indexOf(" ");
				dTitle = dTitle.substr(0, 1) + dTitle.substr(spacePos);
				document.title = dTitle + " - " + titleInPageStr;
				break;

		case 3:	// Replaces the document title with the title inside the page
				document.title = titleInPageStr;
				break;

		default:document.title = "ERROR";
			break;
	}
}



//===========================================================================================================
//===========================================================================================================
//========================================  MISCELANEOUS  ===================================================
//===========================================================================================================
//===========================================================================================================







/**
* Adds a style to the page
*/
function addCSS(cssString) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
* Creates styles to be used throughout this script.
*/
function createAllCSSs() {
	cssString = '.QPpopup{' +
		'background-color:white;' +
//		'border:thin solid #000000;' +
//		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
//		'font-size:8pt;' +
//		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'position:absolute;' +
//		'visibility:hidden;' +
		'display:none' +
		'z-index:200;}';
	addCSS(cssString);
	addCSS('.QPnowrap{white-space:nowrap;}');
	cssString = '.QPsmall{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'}';
	addCSS(cssString);
	cssString = '.QPsmallTxt{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'}';
	cssString = '.QPcoords{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:lightgrey;' +
		'}';
	addCSS(cssString);
	cssString = '.QPcoords2{' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:grey;' +
		'}';
	addCSS(cssString);
	var cssString = '.QPbuildingLevel{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +
		'-moz-border-radius:2em;' +
		'border-radius:2em;' +
		'padding-top:3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'color:black;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '#QPD1BL{' +
		'position:absolute;' +
		'top:71px;' +
		'left:257px;' +
		'z-index:20;}';
	addCSS(cssString);
	var cssString = '#QPD2BL{' +
		'position:absolute;' +
		'top:60px;' +
		'left:25px;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPdorf1BuildingLevel{' +
		'opacity:0.25;' +
		'-moz-border-radius:4em;' +
		'border-radius:4em;' +
		'position:absolute;' +
		'width:22px;' +
		'height:20px;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPresources{' +
		'font-size:7pt;' +
		'color:#909090;' +
		'text-align:left;' +
		'position:absolute;' +
		'top:13px;' +
		'height:20px;' +
		'}';
	addCSS(cssString);


}



/** transformPageTreasury_addCoordsForConstructionPlanHolderVillages */
function transformPageTreasury_addCoordsForConstructionPlanHolderVillages() {
	var constructionPlanHolderVillagesLinks = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/a[contains(@href, "karte.php?d=")]');
	for(var i=0; i<constructionPlanHolderVillagesLinks.snapshotLength; i++) {
		var currentLink = constructionPlanHolderVillagesLinks.snapshotItem(i);
		var coordZ = getParamFromUrl(currentLink.href, "d");
		var readableCoords = coordZToXYReadableString(coordZ);
		currentLink.innerHTML += " " + "<span class='QPcoords'>" + readableCoords + "</span>";
	}
}



/**
* transformPageWWStatistics_addCoordsForWWVillages
*/
function transformPageWWStatistics_addCoordsForWWVillages() {
	// The player cell is the only one that has a width restriction - this prevents double lines
	xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[2]/td[2]').snapshotItem(0).width = "";

	var wwVillagesLinks = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[@class="s7"]/a[contains(@href, "karte.php?d=")]');
	for(var i=0; i<wwVillagesLinks.snapshotLength; i++) {
		var currentLink = wwVillagesLinks.snapshotItem(i);
		var coordZ = getParamFromUrl(currentLink.href, "d");
		var readableCoords = coordZToXYReadableString(coordZ);
		currentLink.innerHTML += " " + "<span class='QPcoords'>" + readableCoords + "</span>";
	}
}



/**
* transformPageHeroMansion_addHeroLevelInfo
*/
function transformPageHeroMansion_addHeroLevelInfo() {

	// retrieve local information
	var heroTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]/../../../..').snapshotItem(0);
	var heroTableRows = heroTable.rows;

	var heroLevel = parseInt(/\d+/.exec(heroTableRows[0].cells[0].textContent));
	var heroLevelPercent = parseInt(/\d+/.exec(heroTableRows[heroTableRows.length - 1].cells[1].textContent));

	var thisLevelExp = (heroLevel + 1) * 100;
	var currLevelExp = ((thisLevelExp) / 2) * heroLevel;
	var nextLevelExp = currLevelExp + thisLevelExp;

	var expGainedInThisLevel = (heroLevel+1) * heroLevelPercent;
	var expToLevelUp = (heroLevel+1) * (100 - heroLevelPercent);

	var levelTxt = heroTableRows[0].cells[0].childNodes[1].textContent;
	levelTxt = levelTxt.substr(0, levelTxt.indexOf(1, " "));

	// create extra info on the page
	var separatorRow = createElemAppendAndSetInner('tr', heroTable, '<td colspan="0" />');

	var extendedHeroRow = createElementAppend('tr', heroTable);
	var extendedHeroCell = createElementAppend('td', extendedHeroRow);
	extendedHeroCell.colSpan = 0;
	var extendedHeroTable = createElementAppend('table', extendedHeroCell);
	extendedHeroTable.style.width = "100%";
	extendedHeroTable.className = "tbg";
	extendedHeroTable.border = 0;
	extendedHeroTable.cellSpacing = 1;

	var row1 = createElementAppend('tr', extendedHeroTable);
	var r1c1 = createElemAppendAndSetInner('td', row1, levelTxt + " " + heroLevel);
	var r1c2 = createElemAppendAndSetInner('td', row1, heroLevelPercent + "%");
	var r1c3 = createElemAppendAndSetInner('td', row1, (100 - heroLevelPercent) + "%");
	var r1c4 = createElemAppendAndSetInner('td', row1, levelTxt + " " + (heroLevel + 1));

	var row2 = createElementAppend('tr', extendedHeroTable);
	var r2c1 = createElementAppend('td', row2);		r2c1.width = "20%";
	var r2c2 = createElementAppend('td', row2);		r2c2.colSpan = 2;
	createHorizontalGraphicBar(r2c2, 8, heroLevelPercent, "green", "yellow");
	var r2c3 = createElementAppend('td', row2);		r2c3.width = "20%";

	var row3 = createElementAppend('tr', extendedHeroTable);
	var r3c1 = createElemAppendAndSetInner('td', row3, currLevelExp);
	var r3c2 = createElemAppendAndSetInner('td', row3, expGainedInThisLevel);
	var r3c3 = createElemAppendAndSetInner('td', row3, expToLevelUp);
	var r3c4 = createElemAppendAndSetInner('td', row3, nextLevelExp);

	r3c2.title = "" + currLevelExp + " + " + expGainedInThisLevel + " = " + (currLevelExp+expGainedInThisLevel);
}



/**
* createHorizontalGraphicBar
* @param {HTMLNode} parentNode Node that will be the parent of the table that has the bar.
* @param {int} tableHeight Height of the table in pixels.
* @param {int} percent Percentage that the bar must represent.
* @param {HTMLColor} barColor Background color of the bar.
* @param {HTMLColor} complementColor Background color of the rest of the bar.
*/
function createHorizontalGraphicBar(parentNode, tableHeight, percent, barColor, complementColor) {

	var table = document.createElement('table');
	var row = createElementAppend('tr', table);
	var cell1 = createElementAppend('td', row);
	var cell2 = createElementAppend('td', row);

	table.cellSpacing = 0;
	table.border = 0;

	table.style.height = tableHeight + "px";
	table.style.width = "100%";

	cell1.style.width = percent + "%";
	cell2.style.width = (100 - percent) + "%";

	cell1.style.backgroundColor = barColor;
	cell2.style.backgroundColor = complementColor;

	parentNode.appendChild(table);
}







/**
* retrieveTravianTeamMessage
* For now it is just a stub which prints the message in the error console.
*/
function retrieveTravianTeamMessage() {
	var msg  = xpathEvaluate('//div[@id="lmid2"]').snapshotItem(0).textContent;
	debug(DBG_HIGHEST, "[retrieveTravianTeamMessage] msg " + msg);
}




/**
* isTruce
* On some special occasions the Admins put the server on "truce" mode.
* While in this mode, attacks do not make any damage - no casualties.
* Spy attacks can be made and spies can die.
*/
function isTruce() {
	var truce = xpathEvaluate('//div[@id="lleft"]/div/span');
	if (truce.snapshotLength > 0) {
		return (truce.snapshotItem(0).innerHTML.indexOf('\u2665') >= 0);
	}
	return false;
}


/**
* retrieveResidenceLoyalty
*/
function retrieveResidenceOrPalaceLoyalty() {
	var loyalty = parseInt(xpathEvaluate('//div[@id = "lmid2"]/b').snapshotItem(0).innerHTML);
}

/**
* retrieveDorf2Loyalty
*/
function retrieveResidenceOrPalaceLoyalty() {
	var loyalty = xpathEvaluate('//div[@id = "lmid2"]/div[@class="dname"]/h1/div[@class="f7 c5"]');
	if (loyalty.snapshotLength > 0) {	// loyalty not at 100%
		return parseInt(loyalty.snapshotItem(0).innerHTML.split(" ")[1]);
	}
	return 100;
}




/**
* isPlusAccount
* Checks if this is a Plus account (at this moment).
*/
function isPlusAccount() {
	return xpathEvaluate('//div[@id="lleft"]/a/img[@class="logo"][contains(@src, "/a/travian1.gif")]').snapshotLength > 0;
}

/**
* transformGeneric_addAutoCompleteFromPlus
*/
function transformGeneric_addAutoCompleteFromPlus() {
	var destNameInputs = xpathEvaluate('//input[@name="dname"]');
	debug(DBG_NORMAL, "[transformGeneric_addAutoCompleteFromPlus] destNameInputs.snapshotLength " + destNameInputs.snapshotLength);

	if (destNameInputs.snapshotLength == 0) { return; }
	var df;

	var isToCreateTheDestinationVillage = true;
	for(var i=0; i<destNameInputs.snapshotLength; i++) {
		var currentInput = destNameInputs.snapshotItem(i);
		currentInput.addEventListener("focus", function () {
			if (isToCreateTheDestinationVillage) {
				isToCreateTheDestinationVillage = false;
				// Create the destination village list
				var villages = getInfo_getOwnVillageLinksFromRightSideVillageList();
				df = new Array();
				for(var j=0; j<villages.snapshotLength; j++) {
					df.push(villages.snapshotItem(j).innerHTML);
				}
			}
		}, true);
		currentInput.addEventListener("keyup", function() {	// my_village() -> adapted from unx.js
			var aU = Math.round(0);
			var aD;
			var e = currentInput.value;
			for(var i = 0; i < df.length; i++) {
				if (df[i].indexOf(e) > -1) {
					aU++;
					aD = df[i];
				}
			}
			if (aU == 1) {
				currentInput.value = aD;
			}
		}, true);
	}
}


/**
* getInfo_getOwnVillageLinksFromRightSideVillageList
*/
function getInfo_getOwnVillageLinksFromRightSideVillageList() {
	return xpathEvaluate('//div[@id="lright1"]/table/tbody/tr/td/a');
}


/**
* transformGeneric_addQPConfigurationMenu
*/
function transformGeneric_addQPConfigurationMenu() {

	var qpConfDiv	= document.createElement('div');
	var qpConfTable = createElementAppend('table', qpConfDiv);

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElemAppendAndSetInner('td', qpConfRow, '<b><font color="#71d000">Q</font><font color="#ff6f0f">P</font></b>');

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElementAppend('td', qpConfRow);
	var qpConfScout	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_SCOUT + '" />');
	var qpConfFakes	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_FAKE + '" />');
	var qpConfHero	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_HERO + '" />');

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElementAppend('td', qpConfRow);
	var qpConfCrannyImg		= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_CRANNY + '" width="32" height="32" />');
	var qpConfCrannyInput	= createElemAppendAndSetInner('td', qpConfCell, '<input type="text" size="3" />');
	var qpConfCrannySure	= createElemAppendAndSetInner('td', qpConfCell, '<input type="text" size="1" />');

	var leftDiv = document.getElementById('lleft');
	leftDiv.appendChild(qpConfDiv);
}



/**
* transformGeneric_addAction_gotoNextPage
*/
function transformGeneric_addAction_spaceShortcutKeyGoesToNextPage() {
	var DEF_CHAR_RAQUO = unescape('%BB');	// Right Angled Quotes
	var DEF_CHAR_SPACE = " ";

	function action_goToNextPage() {
		var links = document.getElementsByTagName("a");
		var i;
		for(i=0; i<links.length; i++) {
			if (links[i].innerHTML.indexOf(DEF_CHAR_RAQUO) == 0) { break; }
		}
		if (i == links.length) { return; }
		document.location.href = links[i].href;
	}

	document.addEventListener("keydown", function (e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
	    if (key == DEF_CHAR_SPACE) { action_goToNextPage(); }
	}, true);
}




/**
* transformGeneric_addOverflowDepleteTimes
*/
function transformGeneric_addOverflowDepleteTimes() {

	for(var i=0; i<4; i++) {
		var resourceNode = document.getElementById("l" + (4-i));	// wood, clay, iron, crop

		var time = calculateResourceOverflowOrStarvation(g_res_prod[i], g_res_now[i], g_res_max[i]);
		var resourcePlaceholder = resourceNode.previousSibling.previousSibling;

		var resourceOverflowDiv = createElementAppend("div", resourcePlaceholder);

		var resColor = ( (g_res_prod[i] <= 0) ? ( (g_res_prod[i] < 0) ? ';color:red' : ';color:orange;font-size:larger;' ) : '');
		var resOverflowSpanTime =	'<span id="QPtimer" style="font-weight:bold' + resColor + '">' + time + '</span>';

		var resOverflowSpanProd = createElementAppend("span", resourceOverflowDiv);
		resOverflowSpanProd.className = "QPresources";
		resOverflowSpanProd.innerHTML = '(' + ( (g_res_prod[i] > 0) ? '+' : '' ) + g_res_prod[i] +
										', ' + resOverflowSpanTime +
										')';
	}
}







/** transformPageDorf1_addColorsToResourceFieldsLevels */
function transformPageDorf1_addColorsToResourceFieldsLevels() {
	var positioningDIV = addDiv('QPD1BL', '', "", "lmid2");
	var d1info = gmLoad_InfoDorf1(getActiveTownId());

	for(var i=1, len=d1info.length; i<len; i++) {
		var resLevel = d1info[i];

		var resLink = createElementAppend('a', positioningDIV);
		resLink.href = "build.php?id=" + i;
		resLink.id = "QPD1L"+i;
		resLink.className = "rf"+i;
		var DIV = addDiv('QPbl', 'QPdorf1BuildingLevel', " ", "QPD1L"+i);

		if (resLevel == 10) {
			if (gmLoadCapitalVillageId() != getActiveTownId()) {
				DIV.style.visibility = "visible";
				DIV.style.backgroundColor = DEF_COLOR_RESOURCE_MAXLEVEL;
			}
		} else {
			var resType = DEF_RESOURCETYPE_IN_VILLAGE[d1info[0]][i-1];

			if (!canBuildNextBuildingLevel(resType, resLevel)) {
				DIV.style.visibility = "visible";
				DIV.style.backgroundColor = DEF_COLOR_RESOURCE_UNUPGRADEABLE;
			}
		}	
	}
}





/** transformPageDorf2_addBuildingLevels */
function transformPageDorf2_addBuildingLevels() {
	var positioningDIV = addDiv('QPD2BL', '', "", "lmid2");

	var d2info = gmLoad_InfoDorf2(getActiveTownId()).split(",");

	for(var i=0; i<22; i++) {

		var currentBuilding = d2info[i].split("_");
		var buildingLevel = currentBuilding[1];
		if (buildingLevel >= 0) {
			var buildingType = currentBuilding[0];

			var buildingLink = createElementAppend('a', positioningDIV);
			buildingLink.href = "build.php?id=" + (i + 19);
			buildingLink.id = "QPD2L"+i;

			var DIV = addDiv('QPbuildingLevel' + i, 'QPbuildingLevel', buildingLevel, "QPD2L"+i);
			DIV.style.visibility = "visible";

			switch (i) {
/*				case 17:
					DIV.style.top = "264px";
					DIV.style.left = "296px";
					break;
*/				case 20:
					DIV.style.top = "166px";
					DIV.style.left = "315px";
					break;
				case 21:
					DIV.style.top = "356px";
					DIV.style.left = "287px";
					break;
				default:
					buildingLink.className = "d" + (i+1);
					break;
			}

			if (buildingLevel == DEF_BUILDINGS_MAX_LEVELS[buildingType]) {
				DIV.style.backgroundColor = DEF_COLOR_BUILDING_MAXLEVEL;
			} else {	// if it has not reached top level, check if can build next one
				if (!canBuildNextBuildingLevel(buildingType, buildingLevel)) {
					DIV.style.backgroundColor = DEF_COLOR_BUILDING_UNUPGRADEABLE;
				}
			}
		}
	}
}





function _OLD_transformPageDorf2_addBuildingLevels() {
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element) {
		var buildingImgs = xpathEvaluate('//div[@id="lmid2"]/img');
		var x = 152; var y = 160;
		var buildingCoordX = [318, 121, 204, 264, 338, 394,  86, 167, 253, 401,  72, 198, 161, 408,  90, 233, 360, 164, 292, 150, 266, 290];
		var buildingCoordY = [166,  82,  57,  47,  62, 111, 121, 128, 111, 152, 191, 156, 182, 210, 230, 226, 243, 266, 260, 297, 306, 356];
		var buildingLevel, DIV;
		var areaElements = map1Element.childNodes; // All map1 children are area elements
		var debuginfo = "";
		// for each area which represents a building (ommit wall repetitions)
		for (var i = 0; i < 22; i++) {
			if (buildingLevel = /(\d+)/.exec(areaElements[i].title)) {
				var currAreaElemHref = areaElements[i].href;
				// Only show spots with buildings on them.
				DIV = addDiv('QPbuildingLevel' + i, 'QPbuildingLevel', buildingLevel[0], false);

				DIV.style.top = parseInt(buildingCoordY[i] + y) + 'px';
				DIV.style.left = parseInt(buildingCoordX[i] + x) + 'px';
				DIV.style.visibility = "visible";
				DIV.setAttribute('goto', currAreaElemHref);
				DIV.addEventListener('click', function() {window.location.href = this.getAttribute('goto');}, true);

				// getting the number 22 from the '<area href="build.php?id=22" title="Building site" ...>'
				var buildingPlaceId = parseInt(currAreaElemHref.substr(currAreaElemHref.lastIndexOf("=") + 1));
				for(var j=0; j<buildingImgs.snapshotLength; j++) {
					var currBuilding = buildingImgs.snapshotItem(j);

					// getting the number 11 from the '<img class="d11" ...>'
					var buildingPosDString = currBuilding.className.substr(1);

					// getting the building GID
					var currBuildSrc = currBuilding.src;
					var buildGid;

					var buildImgClass = currBuilding.className;
					var buildPlaceImg;
					if (buildImgClass.length < 4) {	//	normal + rally point (class="dx1")
						// gets the PLACE from the image
						buildPlaceImg = (buildImgClass == "dx1") ? 21 : buildImgClass.substr(1);
						// gets the GID from the image SRC (eg.: img/un/g/g16.gif )
						buildGid = parseInt(currBuildSrc.substring(currBuildSrc.lastIndexOf("/") + 2,
																	  currBuildSrc.lastIndexOf(".")));
					} else {	// walls for each race (class   G "d2_x d2_1"   R "d2_x d2_11"   T "d2_x d2_12")
						parseInt(buildImgClass.substr(8));
						switch (buildPlaceImg) {
							case 1:		buildGid = DEF_BUILD_GID_PALISADE;		break;
							case 11:	buildGid = DEF_BUILD_GID_CITY_WALL;		break;
							case 12:	buildGid = DEF_BUILD_GID_EARTH_WALL;	break;
							default:	break;
						}
						// wall is always on the same place
						buildPlaceImg = 22;
					}

					buildPlaceImg = parseInt(buildPlaceImg) + 18;

/*	debug(DBG_NORMAL, "[transformPageDorf2_addBuildingLevels] j "+j+" \n"
	+ " NAME: " + areaElements[i].getAttribute('title')
	+ " buildingPosD " + buildingPosD
	+ " buildingGid " + buildingGid
	+ " buildingId " + buildingId
	+ " buildingLevel[0] " + buildingLevel[0]
	+ " DEF_BUILDINGS_MAX_LEVELS[buildingGid] " + DEF_BUILDINGS_MAX_LEVELS[buildingGid]);

					debuginfo += "\n" + areaElements[i].title + " D="+buildingPosD+" ID="+buildingId+ " GID " + buildingGid + " max " + DEF_BUILDINGS_MAX_LEVELS[buildingGid];
*/
					if (buildPlaceImg == buildingPlaceId) {
						if (buildingLevel[0] == DEF_BUILDINGS_MAX_LEVELS[buildGid]) {
							DIV.style.backgroundColor = DEF_COLOR_BUILDING_MAXLEVEL;
							break;
						} else {	// if it has not reached top level, check if can build next one
							if (!canBuildNextBuildingLevel(buildGid, buildingLevel[0])) {
								DIV.style.backgroundColor = DEF_COLOR_BUILDING_UNUPGRADEABLE;
							}
						}
					}
				}
			}
		}
	}
//	debug(DBG_NORMAL, "[transformPageDorf2_addBuildingLevels] \n" + debuginfo);
}

/**
* canBuildNextBuildingLevel
* @param {int} gid
* @param {int} currLevel
*/
function canBuildNextBuildingLevel(gid, currLevel) {
	debug(DBG_NORMAL, "[canBuildNextBuildingLevel] gid " + gid + " currLevel " + currLevel);
	var nextLvlStats = DEF_BUILDING[gid][currLevel];	// this is already the next lvl -> array starts at 0
	debug(DBG_NORMAL, "[canBuildNextBuildingLevel] nextLvlStats " + nextLvlStats);

	var currWood = xpathEvaluate('//td[@id="l4"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currWood < nextLvlStats[0]) { return false; }
	var currClay = xpathEvaluate('//td[@id="l3"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currClay < nextLvlStats[1]) { return false; }
	var currIron = xpathEvaluate('//td[@id="l2"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currIron < nextLvlStats[2]) { return false; }
	var currCrop = xpathEvaluate('//td[@id="l1"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currCrop < nextLvlStats[3]) { return false; }

	return true;
}



/**
* transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton
*/
function transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton] start");
	xpathEvaluate('//div[@id="lmid2"]/form/p/input').snapshotItem(0).focus();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton] end");
}



/**
* savePermanentArrivingMerchantsTitle
*/
function savePermanentArrivingMerchantsTitle(arrivingMercsTitle) {
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] arrivingMercsTitle " + arrivingMercsTitle);
	var key = createPermanentKeyForArrivingMerchantsTitle();
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key );
	GM_setValue(key, escape(arrivingMercsTitle));
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key + " arrivingMercsTitle " + arrivingMercsTitle);
}

/**
* loadPermanentArrivingMerchantsTitle
*/
function loadPermanentArrivingMerchantsTitle() {
	var key = createPermanentKeyForArrivingMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}

/**
* createPermanentKeyForArrivingMerchantsTitle
* Creates a key for permanent storing reports actions.
* The key is of this format: <server>_<userId>_arrivingMerchants
*/
function createPermanentKeyForArrivingMerchantsTitle() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_ARRIVING;
}

/**
* savePermanentOwnMerchantsTitle
*/
function savePermanentOwnMerchantsTitle(ownMercsTitle) {
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] arrivingMercsTitle " + ownMercsTitle);
	var key = createPermanentKeyForOwnMerchantsTitle();
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key );
	GM_setValue(key, escape(ownMercsTitle));
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key + " arrivingMercsTitle " + ownMercsTitle);
}

/**
* loadPermanentOwnMerchantsTitle
*/
function loadPermanentOwnMerchantsTitle() {
	var key = createPermanentKeyForOwnMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}

/**
* createPermaentKeyForOwnMerchantsTitle
* Creates a key for permanent storing reports actions.
* The key is of this format: <server>_<userId>_ownMerchants
*/
function createPermanentKeyForOwnMerchantsTitle() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_OWNMERCHANTS;
}



/**
* lang_get_market_sendResources_MerchantGroupTitles
*
* Get the "Arriving merchants:" phrase from the MarketSendResources page.
* Methods to discover:
* 1 - Get from already saved permanent information;
* 2 - Both mercs arriving and own mercs on the way, 1st group is arriving;
* 3 - Group with other players: it is arriving;
* 4 - Own mercs returning, resource quantities greyed out;
* 5 - Too much resources arriving for the mercs (market lvl) and load/merc of town: arriving mercs;
*/
function lang_get_market_sendResources_MerchantGroupTitles() {
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles]");

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] loadPermanentArrivingMerchantsTitle() " + loadPermanentArrivingMerchantsTitle());
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] loadPermanentOwnMerchantsTitle() " + loadPermanentOwnMerchantsTitle());
	// method 1
	if (loadPermanentArrivingMerchantsTitle() != undefined) {
		if (loadPermanentOwnMerchantsTitle() != undefined) {
			return;
		}
	}

	// Not yet retrieved, go for each method
	var mercGroupTitles = xpathEvaluate('//div[@id="lmid2"]/form/p[@class="b"]');
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] mercGroupTitles.snapshotLength " + mercGroupTitles.snapshotLength);

	// no mercs arriving or own mercs so simply try again later
	if (mercGroupTitles.snapshotLength == 0) { return; }

	// method 2
	if (mercGroupTitles.snapshotLength == 2) {
		// 2 groups: 1st is arriving mercs, 2nd is own mercs
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method2 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method2 OWN: " + mercGroupTitles.snapshotItem(1).innerHTML);
		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentOwnMerchantsTitle(mercGroupTitles.snapshotItem(1).innerHTML);
		return;
	}

	// method 3
	var myUid = getUserId();
	var mercsFromOtherUsers = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[1]/td[1]/a[1][not(contains(@href, "spieler.php?uid='+myUid+'"))]');
	if (mercsFromOtherUsers.snapshotLength > 0) {
		// only 1 group: the arriving mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method3 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	// method 4
	var returningMercs = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[3]/td[2]/span[@class="c f10"]');
	if (returningMercs.snapshotLength > 0) {
		// only 1 group: the own mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method4 OWN: " + mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentOwnMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	// method 5
	var availableAndTotalMercsString = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').snapshotItem(0).firstChild.textContent;
	var availableAndTotalMercsArray = availableAndTotalMercsString.split(" ")[1].split("/");
	var mercsOnWay = availableAndTotalMercsArray[1] - availableAndTotalMercsArray[0];

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	var resSpanOnMercTables = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[3]/td[2]/span[@class="f10"]');

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] resSpanOnMercTables.snapshotLength " + resSpanOnMercTables.snapshotLength);
	var totalMercsOnTables = 0;
	for(var i=0; i<resSpanOnMercTables.snapshotLength; i++) {
		var resSpan = resSpanOnMercTables.snapshotItem(i);
		var mercWood = parseInt(resSpan.childNodes[1].nodeValue.replace("|", ""));
		var mercClay = parseInt(resSpan.childNodes[3].nodeValue.replace("|", ""));
		var mercIron = parseInt(resSpan.childNodes[5].nodeValue.replace("|", ""));
		var mercCrop = parseInt(resSpan.childNodes[7].nodeValue.replace("|", ""));

		var totalResOnThisTable = mercWood + mercClay + mercIron + mercCrop;

		var mercsOnThisTable = totalResOnThisTable / mercsLoad;

		totalMercsOnTables += Math.ceil(mercsOnThisTable);
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method5 mercsOnThisTable " + mercsOnThisTable + " totalMercsOnTables " + totalMercsOnTables);
	}

	if (totalMercsOnTables > mercsOnWay) {
		// only 1 group: the arriving mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method5 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);

		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] UNKNOWN ");
	// UNKNOWN IF THE GROUP IS ARRIVING OR OWN MERCS
}


/**
* addListenerMarketplaceSendResources_updateResourceQuatity
* @param {HTMLNode} parentNode
* @param {int} times
* @param {int} quantity
*/
function addListenerMarketplaceSendResources_updateResourceQuatity(currRowNode, parentNode, times, quantity, inner) {
	var link = createElemAppendAndSetInner('a', parentNode, '<span style="font-size:8pt">' + inner + '</span>');
	link.href = "#";

	var resInput = xpathEvaluateInContext(currRowNode, 'td/input').snapshotItem(0);

	link.addEventListener('click',	function() {
		debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] currRowNode.innerHTML " + currRowNode.innerHTML);
		if (times == 0) {
			resInput.value = '';

		} else {
			var resNewValue = resInput.value;
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] resNewValue " + resNewValue);
			resNewValue = (isNaN(parseInt(resNewValue))) ? 0 : parseInt(resNewValue);
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] resNewValue " + resNewValue);
			resInput.value = resNewValue + (times * parseInt(quantity));
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] times " + times + " quantity " + quantity);
		}
		updateMerchantsUsed();
	}, true);
	return link;
}



/** stringRepeat - repeats string "s", "m" times */
function stringRepeat(s, m) { var r = ""; for(var i=0; i<m; i++) { r += s; } return r; }


var v=new Array(0,0,0,0,0);

/** market */
function QPadd_res(B) {
	C = document.getElementById('l'+(5-B)).value;	// warehouse/granary capacity
	I = 1500 * 20;		// max single resource send quantity
	v[B] = QPap(v[B], C, I, carry);
	document.getElementById('r'+B).value = v[B];
};

/** market */
function QPupd_res(B,max) {
	GM_log("[upd_res] B " + B + " max " + max);
	C = document.getElementById('l'+(5-B)).innerHTML.split("/")[1];	// warehouse/granary capacity
	GM_log("[upd_res] document.getElementById('l'+(5-B)) " + document.getElementById('l'+(5-B)));
	GM_log("[upd_res] document.getElementById('l'+(5-B)).innerHTML " + document.getElementById('l'+(5-B)).innerHTML);
	I = 1500 * 20;		// max single resource send quantity
	GM_log("[upd_res] B " + B + " max " + max + " C " + C + " I " + I);
	if (max) {
		L = C;
	} else {
		L = parseInt(document.getElementById('r'+B).value);
		var aaa = document.getElementById('r'+B);
		GM_log("[upd_res] aaa " + aaa);
		GM_log("[upd_res] aaa.value " + aaa.value);
		GM_log("[upd_res] aaa.innerHTML " + aaa.innerHTML);
		GM_log("[upd_res] L " + L);
	}
	GM_log("[upd_res] B " + B + " max " + max + " L " + L + " C " + C + " I " + I);
	if(isNaN(L)){
		L = 0;
	}
	v[B] = QPap(parseInt(L), C, I, 0);
	document.getElementById('r'+B).value = v[B];
};

/** market - gives the max values for the resource to be sent at market send resources page */
function QPap(aj, X, M, aC) {
	ab = aj + aC;
	if (ab>X) {
		ab = X;
	}
	if (ab>M) {
		ab=M;
	}
	if (ab==0) {
		ab='';
	}
	return ab;
};




/**
* transformPageMarketplaceSendResources_addExtraQuantities
*/
function transformPageMarketplaceSendResources_addExtraQuantities() {

	var sendResRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a/../..');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	for(var i=0, len = sendResRow.snapshotLength; i<len; i++) {
		var currResourceRow = sendResRow.snapshotItem(i);

		currResourceRow.cells[0].innerHTML = "";
		var newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[0], 20, mercsLoad, "<img src='img/un/r/"+parseInt(i+1)+".gif'/>");

		currResourceRow.cells[3].innerHTML = "";
		newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[3], 1, mercsLoad, "("+mercsLoad+")");

		var newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 0, mercsLoad, "(x0)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 2, mercsLoad, "(x2)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 5, mercsLoad, "(x5)");
	}
}


/**
* retrievePageMarketPlaceSendResources_MercLoad
*/
function retrievePageMarketPlaceSendResources_MercLoad() {
	var mercsLoad = xpathEvaluate('//div[@id="lmid2"]/form/p/b');

	if (mercsLoad.snapshotLength > 0) {
		mercsLoad = parseInt(mercsLoad.snapshotItem(0).textContent);
		if (!isNaN(mercsLoad)) {
			return mercsLoad;
		}
	}

	mercsLoad = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a').snapshotItem(1).innerHTML;
	mercsLoad = parseInt(mercsLoad.substr(1));
	return mercsLoad;
}



function updateMerchantsUsed() {
	debug(DBG_NORMAL, "[updateMerchantsUsed] ");
	var inputsTable = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]').snapshotItem(0);
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();
	var availableAndTotalMercsString = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').snapshotItem(0).firstChild.textContent;
	var availableMercs = availableAndTotalMercsString.split(" ")[1].split("/")[0];

	var txt = document.getElementById("QPusedMercs");

	function getInputsTotal() {
		var res = 0;
		for(var i=0; i<inputs.snapshotLength; i++) {
			res += (inputs.snapshotItem(i).value == "") ? 0 : parseInt(inputs.snapshotItem(i).value);
		}
		return res;
	}
	debug(DBG_NORMAL, "[updateMerchantsUsed] 2");
	var totResources = getInputsTotal();
	var mercs = Math.ceil(totResources / mercsLoad);
	var lastMercExcessLoad = ((totResources % mercsLoad) == 0) ? 0 : (totResources % mercsLoad);
	var lastMercAvailableLoad = ((totResources % mercsLoad) == 0) ? 0 : mercsLoad - (lastMercExcessLoad);
	if (mercs > availableMercs) {
//			debug(DBG_NORMAL, "[updateMerchantsUsed] if lastMercExcessLoad " + lastMercExcessLoad);
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercExcessLoad==0) ? " (0)" : (" (+"+ lastMercExcessLoad +")"));
		txt.style.color = "red";
	} else {
//			debug(DBG_NORMAL, "[updateMerchantsUsed] else lastMercAvailableLoad " + lastMercAvailableLoad);
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercAvailableLoad==0) ? " (0)" : (" (-"+ lastMercAvailableLoad +")"));
		txt.style.color = "green";
	}
}



/**
* transformPageMarketplaceSendResources_addMerchantsUsed
*/
function transformPageMarketplaceSendResources_addMerchantsUsed() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addMerchantsUsed] ");
	var inputsTable = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]').snapshotItem(0);
	var inputFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a');
	var inputResourceFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a/img[@class="res"]/..');
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	// add the mercs used html
	var txt = document.createElement("span");
	txt.className = "QPsmall";
	txt.id = "QPusedMercs";
	inputsTable.parentNode.insertBefore(txt, inputsTable.nextSibling);
	txt.innerHTML = "0 = 0 (0)";
	txt.style.color = "green";


	for(var i=0; i<inputs.snapshotLength; i++) {
		inputs.snapshotItem(i).addEventListener('keyup', updateMerchantsUsed, true);
	}
/*
	for(var i=0; i<inputFillLinks.snapshotLength; i++) {
		inputFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, true);
		inputFillLinks.snapshotItem(i).addEventListener('dblclick', updateMerchantsUsed, true);
		debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] i " + i);
		inputFillLinks.snapshotItem(i).addEventListener('click', function(){
			debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] e " + e);
			var iii = parseInt((i%4)+1);
			debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] iii " + iii);
			QPupd_res(iii);
		}, true);
		debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] i after " + i);
	}
	for(var i=0; i<inputResourceFillLinks.snapshotLength; i++) {
		inputResourceFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, false);
	}
*/
}



/**
* transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion
*/
function transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] ");
	var myUid = getUserId();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] myUid " + myUid);
	// selects the receiving merchants
	var receiveAndTitles = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (receiveAndTitles.snapshotLength == 0) { return; }
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] receiveAndTitles.snapshotItem(0).textContent " + receiveAndTitles.snapshotItem(0).textContent);
	if (loadPermanentArrivingMerchantsTitle() != receiveAndTitles.snapshotItem(0).textContent) { return; }

	var mercTimes = new Array();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] creating arrays to gather arriving mercs info");
	var mercWood = new Array();
	var mercClay = new Array();
	var mercIron = new Array();
	var mercCrop = new Array();
	for(var i=1; i<receiveAndTitles.snapshotLength; i++) {
		debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] for i " + i);
		var currentMerchantTable = receiveAndTitles.snapshotItem(i);
		if (currentMerchantTable.nodeName == "P") { break; }
		var currentMerchantTime = currentMerchantTable.childNodes[1].childNodes[2].childNodes[1].childNodes[0].innerHTML;
		mercTimes[i-1] = timeColonSeparatedToValue(currentMerchantTime);
		var tdRes = currentMerchantTable.lastChild.lastChild.lastChild.lastChild;
		mercWood[i-1] = parseInt(tdRes.childNodes[1].nodeValue.replace("|", ""));
		mercClay[i-1] = parseInt(tdRes.childNodes[3].nodeValue.replace("|", ""));
		mercIron[i-1] = parseInt(tdRes.childNodes[5].nodeValue.replace("|", ""));
		mercCrop[i-1] = parseInt(tdRes.childNodes[7].nodeValue.replace("|", ""));
	}

	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercTimes " + mercTimes);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercWood " + mercWood);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercClay " + mercClay);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercIron " + mercIron);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercCrop " + mercCrop);

	var woodSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[0], g_res_now[0], g_res_max[0], mercTimes, mercWood);
	var claySecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[1], g_res_now[1], g_res_max[1], mercTimes, mercClay);
	var ironSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[2], g_res_now[2], g_res_max[2], mercTimes, mercIron);
	var cropSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[3], g_res_now[3], g_res_max[3], mercTimes, mercCrop);

	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] woodSecs " + woodSecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] claySecs " + claySecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] ironSecs " + ironSecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] cropSecs " + cropSecs);

	// selects the "Each of your merchants can carry X resources." sentence
	var previous = xpathEvaluate('//div[@id="lmid2"]/form/p/b/..');
	if (previous.snapshotLength > 0) {
		previous = previous.snapshotItem(0);
	} else {
		previous = xpathEvaluate('//div[@id="lmid2"]/form/p/input[contains(@src, "/b/ok1.gif")]').snapshotItem(0);
	}

	var resColor = ( (g_res_prod[3] <= 0) ? ( (g_res_prod[3] < 0) ? ';background-color:red' : ';background-color:orange;font-size:larger;' ) : '');

	var divOverflows = document.createElement('div');
	divOverflows.innerHTML = '<table class="tbg" cellpadding="2" cellspacing="1"><tbody><tr class="cbg1">' +
							'<td><img class="res" src="img/un/r/1.gif"></td><td><span id="QPtimer">'+woodSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/2.gif"></td><td><span id="QPtimer">'+claySecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/3.gif"></td><td><span id="QPtimer">'+ironSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/4.gif"></td>' +
							'<td style="' + resColor + '"><span id="QPtimer">'+cropSecs+'</span></td>' +
							'</tr></tbody></table>'

	previous.parentNode.insertBefore(divOverflows, previous.nextSibling);
}





function transformPageMarketplaceSendResources_addCumulativeArrivals() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals]");

	// selects the receiving merchants
	var sendReceive = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (sendReceive.snapshotLength == 0) { return; }
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] sendReceive.snapshotItem(0).textContent " + sendReceive.snapshotItem(0).textContent);
	if (loadPermanentArrivingMerchantsTitle() != sendReceive.snapshotItem(0).textContent) { return; }

	for(var i=0; i<sendReceive.snapshotLength; i++) {
		debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] sendReceive.snapshotItem i " + i);

		if ((i>0) && (sendReceive.snapshotItem(i).nodeName == "P")) { break; }

		if (sendReceive.snapshotItem(i).nodeName == "P") {
			//create place to sum the resources
			var sp = document.createElement("span");
			var swood = document.createTextNode("0");
			var sclay = document.createTextNode("0");
			var siron = document.createTextNode("0");
			var scrop = document.createTextNode("0");
//			var stime = document.createTextNode("99:99:99");
			var stime = document.createElement("span");
//<span id="time6">0:45:09</span>
			var img1 = document.createElement("img");	img1.src = "img/un/r/1.gif";
			var img2 = document.createElement("img");	img2.src = "img/un/r/2.gif";
			var img3 = document.createElement("img");	img3.src = "img/un/r/3.gif";
			var img4 = document.createElement("img");	img4.src = "img/un/r/4.gif";
			var img5 = document.createElement("img");	img5.src = IMGS_CLOCK;
			sp.appendChild(img1);	sp.appendChild(swood);
			sp.appendChild(img2);	sp.appendChild(sclay);
			sp.appendChild(img3);	sp.appendChild(siron);
			sp.appendChild(img4);	sp.appendChild(scrop);
			sp.appendChild(img5);	sp.appendChild(stime);
			sendReceive.snapshotItem(i).appendChild(sp);
		} else { // table
			// add resources, keep max time
			var tdRes = sendReceive.snapshotItem(i).lastChild.lastChild.lastChild.lastChild;
//			GM_log("[onMarketPlaceSendResourcesLoad] td res " + tdRes.innerHTML);
			var rwood = parseInt(tdRes.childNodes[1].nodeValue.replace("|", "")); swood.nodeValue = parseInt(swood.nodeValue) + rwood;
			var rclay = parseInt(tdRes.childNodes[3].nodeValue.replace("|", "")); sclay.nodeValue = parseInt(sclay.nodeValue) + rclay;
			var riron = parseInt(tdRes.childNodes[5].nodeValue.replace("|", "")); siron.nodeValue = parseInt(siron.nodeValue) + riron;
			var rcrop = parseInt(tdRes.childNodes[7].nodeValue.replace("|", "")); scrop.nodeValue = parseInt(scrop.nodeValue) + rcrop;
//			stime.nodeValue = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
			stime.innerHTML = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
//			stime.id = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.id;
//			stime.id = "timeouta";
			stime.id = "QPtimer";
		}
	}
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] END");
}

/**
* retrieveResourcesAndTimeFromCell
* @return Array with 5 positions with the resources and the time
*/
function retrieveResourcesAndTimeFromCell(cell) {
	var arr = new Array();
	for(var i=0, j=0; i<cell.childNodes.length; i++) {
		var currentNode = cell.childNodes[i];
		if (currentNode.nodeName == "IMG") {
			continue;
		}
		var txt = currentNode.nodeValue.replace("|", "").trim();
		if (txt == "") {
			continue;
		}
//		debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] j " + j + " txt " + txt);
		arr[j++] = txt;
	}
	return arr;
}






/**
* calculateResourceOverflowOrStarvation
* @param {int} productionPerHour
* @param {int} currentState
* @param {int} maxCapacity
*/
function calculateResourceOverflowOrStarvation(productionPerHour, currentState, maxCapacity) {
	if (productionPerHour == 0) { return DEF_CHAR_INFINITY; }

	var productionPerSeconds = Math.abs(productionPerHour / 3600);

	// depending if is going to overflow or depletion
	var diference = parseInt((productionPerHour > 0) ? (maxCapacity - currentState) : currentState);
	var totalSeconds = Math.floor(diference / productionPerSeconds);
	var timeTxt = timeInSecondsToColonSeparatedTxt(totalSeconds);
	return timeTxt;
}


/**
* calculateResourceOverflowOrStarvation
* @param {int} productionPerHour
* @param {int} currentState
* @param {int} maxCapacity
* @param {int array} timeOfArrivals Array of arrival times in seconds.
* @param {int array} amountToArrive Amount of the resource to arrive in the corresponding time (the other array).
*/
function calculateResourceOverflowOrStarvationWithMarketArrivals(productionPerHour, currentState, maxCapacity, timeOfArrivals, amountToArrive) {
	var productionPerSeconds = Math.abs(productionPerHour / 3600);
	debug(DBG_HIGHEST, "[calculateResourceOverflowOrStarvationWithMarketArrivals] "
			+ "\n productionPerHour " + productionPerHour
			+ " productionPerSeconds " + productionPerSeconds
			+ " currentState " + currentState
			+ " maxCapacity " + maxCapacity
			+ "\n timeOfArrivals " + timeOfArrivals
			+ " amountToArrive " + amountToArrive
	);

	var isOverflowing = (productionPerHour > 0);

	// depending if is going to overflow or depletion calculates diference to 0 or to maxCapacity
	var diference = parseInt(isOverflowing ? (maxCapacity - currentState) : currentState);
	var totalSeconds = (productionPerHour==0) ? ((diference==0)?0:-1) : Math.floor(diference / productionPerSeconds);

	for(var i = 0, len = timeOfArrivals.length; i<len; i++) {
		var currArrivalAmount = amountToArrive[i];
		var currArrivalTime = timeOfArrivals[i];
		if (currArrivalAmount == 0) { continue; }	// mercs arriving but not bringing this resource

		if (currArrivalTime <= totalSeconds) {
			// depending if is going to overflow or depletion re-calculates new diference with arriving amount
			diference = isOverflowing ? (diference - currArrivalAmount) : (diference + currArrivalAmount);

			if (diference <= 0) {
				// this arrival filled it up / emptied it out - do no evaluate more arrivals
				totalSeconds = currArrivalTime;
				break;
			}
			// from this point, the goal hasn't been reached

			if (productionPerHour == 0) {	// with previous arrivals and current production never reaches goal
				totalSeconds = -1;

			} else {	// still has production so goal can make it get there

				// time is the time to fill the "rest" (diference) of the resource
				totalSeconds = Math.floor(diference / productionPerSeconds);

				// if the time it takes to fill the "rest" is lower than the time of arrival then the total time to fill is the arrival
				totalSeconds = (totalSeconds < currArrivalTime) ? currArrivalTime : totalSeconds;
			}

			debug(DBG_HIGHEST, "[calculateResourceOverflowOrStarvationWithMarketArrivals] "
				+ " diference " + diference
				+ " timeOfArrivals[i] " + currArrivalTime
				+ " amountToArrive[i] " + currArrivalAmount
				);
		} else {
			break;
		}
	}
	if (totalSeconds == -1) { return DEF_CHAR_INFINITY; }
	var timeTxt = timeInSecondsToColonSeparatedTxt(totalSeconds);
	return timeTxt;
}





// Gets current server
function getServerName() {
//	return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
	return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}

// Gets current full server name
function getFullServerName() {
	return location.href.match(/([\w]+:\/\/[\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}

// Gets the current player
function getUserId() {
	var userID = xpathEvaluate('//a[contains(@href, "spieler.php?uid=")]');
	return getParamFromUrl(userID.snapshotItem(0).href, "uid");
}


function getCoordZfromHref(url) {
	var coordZ = getParamFromUrl(url, 'd');
	coordZ = (coordZ) ? coordZ : getParamFromUrl(url, 'z');
	return coordZ;
}




//===========================================================================================================
//===========================================================================================================
//======================  Travian Single Village / Add Village List functions  ==============================
//===========================================================================================================
//===========================================================================================================





/**
* getTribeBySettlerTroopsInAnyPage - Gets the my tribe by looking at the gifs of the troops
* @param {boolean} troopsPosition To choose from the troops shown in the page.
*/
function getTribeBySettlerTroopsInAnyPage(troopsPosition) {
	var romanImg = xpathEvaluate('//img[contains(@src, "img/un/u/")][contains(@src, "0.gif")]');

	var imgSrc = romanImg.snapshotItem(troopsPosition).src;
	var imgNumber = parseInt(imgSrc.substr(imgSrc.indexOf("0.gif") - 1, 2));

	switch (imgNumber) {
		case 10: return TRIBE_ROMAN;
		case 20: return TRIBE_TEUTON;
		case 30: return TRIBE_GAUL;
		case 40: return TRIBE_NATURE;
		case 50: return TRIBE_NATAR;
		case 60: return TRIBE_UNDISCLOSED;
		default: alert("New tribe?!?!?"); return;
	}
}

/**
* getTribeBySendTroopsPage - Gets the my tribe by looking at the gifs in the send troops page
*/
function getTribeBySendTroopsPage() {
	return getTribeBySettlerTroopsInAnyPage(0);
}



function loadPermanentMyTribe() {
	var myTribe = GM_getValue(DEF_PARTKEY_PREFIX + "myTribe");
	return myTribe;
}
function savePermanentMyTribe() {
	var tribe = getTribeBySendTroopsPage();
	GM_setValue(DEF_PARTKEY_PREFIX + "myTribe", tribe);
}




//===========================================================================================================
//===========================================================================================================
//======================================  Travian Retrieve Info  ============================================
//===========================================================================================================
//===========================================================================================================



String.prototype.trim = function () {
	var str = this.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}





/** retrievePageDorf1Or2_langLevel */
function retrievePageDorf1Or2_langLevel() {

	// if the field names were already retrieved, then nothing needs to be done
	if (gmExists_Lang_Level()) {
		debug(DBG_NORMAL, "[retrievePageDorf1Or2_langLevel] gmExists_Lang_Level " + gmExists_Lang_Level());
		return;
	}
	// else, retrieve the field names

	var constructionType = xpathEvaluate('//div[@id="lbau1"]/table[@class="f10"]/tbody/tr/td[2]');
	debug(DBG_NORMAL, "[retrievePageDorf1Or2_langLevel] constructionType.snapshotLength " + constructionType.snapshotLength);
	if (constructionType.snapshotLength>0) {
		var levelLang = constructionType.snapshotItem(0).innerHTML.match(/\((\w+) \d+\)/i)[1];

		gmSave_Lang_Level(levelLang);
		debug(DBG_NORMAL, "[retrievePageDorf1Or2_langLevel] levelLang " + levelLang);
	}
}


/** save, reset, load, createKey, exists - Lang_Level - <server>_<userId>_lang_fields */
// Saved info: level
function gmSave_Lang_Level(levelLang) { gmSave_Escape(gmKey_Lang_Level(), levelLang); }
function gmReset_Lang_Level() { gmSave_Lang_Level(""); }
function gmLoad_Lang_Level() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Lang_Level()); }
function gmKey_Lang_Level() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_LANG_LEVEL; }
function gmExists_Lang_Level() { return (gmLoad_Lang_Level() != ""); }






/** retrievePageDorf1_FieldsNamesLang */
function retrievePageDorf1_FieldsNamesLang() {

	// if the field names were already retrieved, then nothing needs to be done
	if (gmExists_FieldNames()) {
		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] gmLoad_FieldNames " + gmLoad_FieldNames());
		return;
	}
	// else, retrieve the field names


	var constructionType = xpathEvaluate('//div[@id="lbau1"]/table[@class="f10"]/tbody/tr/td[2]');
	debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] constructionType.snapshotLength " + constructionType.snapshotLength);
	if (constructionType.snapshotLength>0) {
		var levelLang = constructionType.snapshotItem(0).innerHTML.match(/\((\w+) \d+\)/i)[1];

		var divF = xpathEvaluate('//div[@id="lmid2"]/div[contains(@id, "f")]').snapshotItem(0);
		var villageTypeNumber = parseInt(divF.id.substr(1));

		var fieldsAreas = xpathEvaluate('//div[@id="lmid2"]/map[@name="rx"]/area');

		var woodfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_WOOD)).title;
		var clayfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_CLAY)).title;
		var ironfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_IRON)).title;
		var cropfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_CROP)).title;

		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] \n"
				+ " levelLang " + levelLang
				+ " woodfieldLang " + woodfieldLang
				+ " clayfieldLang " + clayfieldLang
				+ " ironfieldLang " + ironfieldLang
				+ " cropfieldLang " + cropfieldLang
				);

		woodfieldLang = getBuildingNameFromConstruction(woodfieldLang);
		clayfieldLang = getBuildingNameFromConstruction(clayfieldLang);
		ironfieldLang = getBuildingNameFromConstruction(ironfieldLang);
		cropfieldLang = getBuildingNameFromConstruction(cropfieldLang);

		var fieldNames = new Array();
		fieldNames[0] = levelLang;
		fieldNames[DEF_BUILD_GID_WOODCUTTER]= woodfieldLang;
		fieldNames[DEF_BUILD_GID_CLAY_PIT]	= clayfieldLang;
		fieldNames[DEF_BUILD_GID_IRON_MINE]	= ironfieldLang;
		fieldNames[DEF_BUILD_GID_CROPLAND]	= cropfieldLang;

		gmSave_FieldNames(fieldNames);
		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] fieldNames " + fieldNames);
	}
}


/** getBuildingNameFromConstruction */
function getBuildingNameFromConstruction(constr, lvl) { return constr.match(/\D+/)[0].replace(lvl, "").trim(); }


/** save, reset, load, createKey - FieldNames - <server>_<userId>_lang_fields */
// Saved info: level, woodfield, claypit, ironmine, cropland
function gmSave_FieldNames(fieldNames) { gmSave_Escape(gmKey_FieldNames(), fieldNames); }
function gmReset_FieldNames() { gmSave_FieldNames(""); }
function gmLoad_FieldNames() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_FieldNames()).split(","); }
function gmKey_FieldNames() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_LANG_FIELDS; }
function gmExists_FieldNames() { return (gmLoad_FieldNames() != ""); }







/** retrievePageDorf1Or2_BuildingsUnderConstruction */
function retrievePageDorf1Or2_BuildingsUnderConstruction() {

	if (!gmExists_FieldNames()) {
		return;
	}

	var levelLang = gmLoad_Lang_Level();
	var fieldNames = gmLoad_FieldNames();
	var underConstructionRows = xpathEvaluate('//div[@id="lbau1"]/table[@class="f10"]/tr');

	var len = underConstructionRows.snapshotLength;
	if (len>0) {
		for(var i=0; i<len; i++) {
			var construction = underConstructionRows.snapshotItem(0);
			var construcionType = construction.cells[1];
			var constructionName = getBuildingNameFromConstruction(construcionType, levelLang);
			var constructionReadyTime = construction.cells[2].firstChild;
			var constructionLevel = construcionType.match(/\d+/)[1];
			var constructionGid = -999;

			if (isThisPageDorf1()) {
				var fieldIndex = fieldNames.indexOf(constructionName);
				var bag = new Array();
				for(var j=0; j<array.length; j++) {
					
				}
			} else {
				
			}



		}
		gmSave_UnderConstruction(getActiveTownId(), dorf1Info);
		debug(DBG_HIGHEST, "[retrievePageDorf1Or2_BuildingsUnderConstruction] ");
	}
}


/** save, reset, load, createKey - UnderConstruction - <server>_<userId>_<villageId>_infoDorf1 */
// Saved info: villageType, 18fields			- info to be added later: time, underConstruction
function gmSave_UnderConstruction(villageId, constructions) { GM_setValue(gmKey_UnderConstruction(villageId), constructions); }
function gmReset_UnderConstruction(villageId) { gmSave_UnderConstruction(villageId, ""); }
function gmLoad_UnderConstruction(villageId) { return gmLoad_UndefinedIsEmptyString(gmKey_UnderConstruction(villageId)).split(","); }
function gmKey_UnderConstruction(villageId) { return DEF_PARTKEY_PREFIX + villageId + DEF_PARTKEY_UNDER_CONSTRUCTION; }
function gmExists_UnderConstruction() { return (gmLoad_UnderConstruction() != ""); }










/** retrievePageDorf2_Info */
function retrievePageDorf2_Info() {
	var d2info = "";

	var buildingArea = xpathEvaluate('//map[@name="map1"]/area');
	var buildingImgs = xpathEvaluate('//div[@id="lmid2"]/img');

	var buildType = new Array();
	var buildLevel = new Array();
	
	// Building TYPE from the IMAGES - wall is corrected outside since the image is in a class of a div
	for(var i=0, len=buildingImgs.snapshotLength; i<len; i++) {

		var buildingType = /g(\d+)b?.gif$/.exec(buildingImgs.snapshotItem(i).src);
		buildingType = ((buildingType==null) ? -1 : buildingType[1]);

		var buildingTypePlace = buildingImgs.snapshotItem(i).className.substr(1);
		buildingTypePlace = ((buildingTypePlace=="x1")?21:buildingTypePlace);

		buildType[buildingTypePlace-1] = buildingType;
	}
debug(DBG_NORMAL, "[retrievePageDorf2_Info] i " + i
		+ " \n"
		+ " buildingType " + buildingType
		+ " buildingTypePlace " + buildingTypePlace
		+ " buildType " + buildType
		);

	// Building LEVEL from the AREA's TITLES
	for(var i=0, len=buildingArea.snapshotLength; i<len; i++) {

		var buildingLevel = /\d+/.exec(buildingArea.snapshotItem(i).title);
		buildingLevel = ((buildingLevel==null) ? -1 : buildingLevel);

		var buildingLevelPlace = /\d+$/.exec(buildingArea.snapshotItem(i).href) - 18;

		buildLevel[buildingLevelPlace-1] = buildingLevel;

debug(DBG_NORMAL, "[retrievePageDorf2_Info] i " + i
		+ " \n"
		+ " buildingLevel " + buildingLevel
		+ " buildingLevelPlace " + buildingLevelPlace
		+ " buildLevel " + buildLevel
		);
	}
	// rally point - if it doesn't exist yet
	if (buildingImgs.snapshotLength == 21) {
		buildType[20] = -1;
	}
	// wall
	var wallDiv = xpathEvaluate('//div[@id="lmid2"]/div[contains(@class, "d2_x d2_")]');
	if (wallDiv.snapshotLength > 0) {
		var buildingType;
		var wallType = parseInt(wallDiv.snapshotItem(0).className.substr(8));
		switch (wallType) {
			case 1:		buildingType = DEF_BUILD_GID_PALISADE;		break;
			case 11:	buildingType = DEF_BUILD_GID_CITY_WALL;		break;
			case 12:	buildingType = DEF_BUILD_GID_EARTH_WALL;	break;
			default:	break;	// 0 means level 0
		}
		buildType[21] = buildingType;
	} else {
		buildType[21] = -1;
	}

	// join the 2 arrays
	for(var i=0; i<22; i++) {
		d2info += "," + buildType[i] + "_" + buildLevel[i];
		debug(DBG_NORMAL, "[retrievePageDorf2_Info] JOIN ARRAYS "
		+ " \n"
		+ " i " + i
		+ " buildType[i] " + buildType[i]
		+ " buildLevel[i] " + buildLevel[i]
		);
	}
	d2info = d2info.substr(1);

	gmSave_InfoDorf2(getActiveTownId(), d2info);
	debug(DBG_HIGHEST, "[retrievePageDorf2_Info] d2info " + d2info);
}

/** save, reset, load, createKey - InfoDorf2 - <server>_<userId>_<villageId>_infoDorf2 */
// Saved info: 22 buildingType,buildingLevel pairs		- info to be added later: time, underConstruction
function gmSave_InfoDorf2(villageId, info) { GM_setValue(gmKey_InfoDorf2(villageId), info); }
function gmReset_InfoDorf2(villageId) { gmSave_InfoDorf2(villageId, ""); }
function gmLoad_InfoDorf2(villageId) { return gmLoad_UndefinedIsEmptyString(gmKey_InfoDorf2(villageId)); }
function gmKey_InfoDorf2(villageId) { return DEF_PARTKEY_PREFIX + villageId + DEF_PARTKEY_INFO_DORF1; }




/** retrievePageDorf1_Info */
function retrievePageDorf1_Info() {

	var divF = xpathEvaluate('//div[@id="lmid2"]/div[contains(@id, "f")]').snapshotItem(0);
	var villageTypeNumber = parseInt(divF.id.substr(1));

	var resourceLevels = xpathEvaluate('//div[@id="lmid2"]/div[contains(@id, "f")]/img');

	var dorf1Info = "" + villageTypeNumber;
	// go through all 18 fields
	for(var pos=1, i=0, len=resourceLevels.snapshotLength, rfnum=0, resLevel=-1; pos<19; pos++) {

		// get the level of the current field
		if (i < len) {
			var currentResource = resourceLevels.snapshotItem(i);
   			rfnum = parseInt(currentResource.className.substr(2));
			// if the current position is the next image
			if (rfnum == pos) {
				resLevel = currentResource.src;
				resLevel = parseInt(resLevel.substring(resLevel.lastIndexOf("/") + 2, resLevel.lastIndexOf(".")));
				i++;
			} else {
				resLevel = 0;
			}
		} else {
			resLevel = 0;
		}
		dorf1Info += "," + resLevel;
	}
	gmSave_InfoDorf1(getActiveTownId(), dorf1Info);
	debug(DBG_HIGHEST, "[retrievePageDorf1_Info] dorf1Info " + dorf1Info);
}


/** save, reset, load, createKey - InfoDorf1 - <server>_<userId>_<villageId>_infoDorf1 */
// Saved info: villageType, 18fields			- info to be added later: time, underConstruction
function gmSave_InfoDorf1(villageId, info) { GM_setValue(gmKey_InfoDorf1(villageId), info); }
function gmReset_InfoDorf1(villageId) { gmSave_InfoDorf1(villageId, ""); }
function gmLoad_InfoDorf1(villageId) { return gmLoad_UndefinedIsEmptyString(gmKey_InfoDorf1(villageId)).split(","); }
function gmKey_InfoDorf1(villageId) { return DEF_PARTKEY_PREFIX + villageId + DEF_PARTKEY_INFO_DORF1; }





/** retrieveMyProfile_Capital */
function retrieveMyProfile_Capital() {
	var capitalCoordsCell = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[3]/td[1]/span/../../td[3]')

	if (capitalCoordsCell.snapshotLength == 0) { // no capital village - reset capital
		gmResetCapitalVillageId();

	} else { // found the current capital village - save the current capital
		var capitalCoords = capitalCoordsCell.snapshotItem(0).innerHTML.split("|");
		var capitalVillageLink = xpathEvaluate('//div[@id="lright1"]/table/tbody/tr/td/table/tbody/tr/td[1][.="'+capitalCoords[0]+'"]/../td[3][.="'+capitalCoords[1]+'"]/../../../../../td/a').snapshotItem(0);
		var capitalVillageId = getParamFromUrl(capitalVillageLink.href, "newdid");
		gmSaveCapitalVillageId(capitalVillageId);
	}
}

/** save, reset, load, createKey - CapitalVillageId - <server>_<userId>_capitalVillageId */
function gmSaveCapitalVillageId(capitalId) { GM_setValue(gmCreateKeyForCapitalVillageId(), capitalId); }
function gmResetCapitalVillageId() { gmSaveCapitalVillageId(""); }
function gmLoadCapitalVillageId() { return gmLoad_UndefinedIsEmptyString(gmCreateKeyForCapitalVillageId()); }
function gmCreateKeyForCapitalVillageId() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_CAPITALVILLAGEID; }



/** gmLoad_UndefinedIsEmptyString - if it is undefined then return empty string: "" */
function gmLoad_UndefinedIsEmptyString(key) { var val = GM_getValue(key); return ((val==undefined)?"":val); }


/** gmLoad_Unescape_UndefinedIsEmptyString - if it is undefined then make empty string; in any case, unescape it */
function gmLoad_Unescape_UndefinedIsEmptyString(key) { return unescape(gmLoad_UndefinedIsEmptyString(key)); }

/** gmSave_Escape - escape the value to be stored - minly for LANG dependant stuff */
function gmSave_Escape(key, value) { return GM_setValue(key, escape(value)); }


//===========================================================================================================
//===========================================================================================================
//======================  Travian Single Village / Add Village List functions  ==============================
//===========================================================================================================
//===========================================================================================================



/**
* createPermanentKeyForSingleVillageInfo
* Creates a key for permanent storing single village info.
* The key is of this format: <server>_<userId>_singleVillageInfo
*/
function createPermanentKeyForSingleVillageInfo() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_SINGLEVILLAGEINFO;
}

/**
* loadSingleVillageInfo
*/
function loadSingleVillageInfo() {
	var tmp = unescape(GM_getValue(createPermanentKeyForSingleVillageInfo()));
	return xmlToArray(tmp);
}

/**
* findAndSaveSingleVillageInfo
*/
function findAndSaveSingleVillageInfo() {
	if (isThisPageMyProfile()) {
		var coordsCells = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[3][not(@class)]');
		if (coordsCells.snapshotLength == 2) {
			var svCoords = coordsCells.snapshotItem(1).innerHTML.split("|");
			svCoords[0] = svCoords[0].replace("(", "");
			svCoords[1] = svCoords[1].replace(")", "");
			svCoords[2] = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[3]/td[1]/a[1]').snapshotItem(0).innerHTML;
			var oldInfo = loadSingleVillageInfo();
			svCoords[3] = oldInfo[3];
			GM_setValue(createPermanentKeyForSingleVillageInfo(), escape(arrayToXML(svCoords)));
		}
	}
	if (isThisPageDorf3()) {
		var villageLinksInOverviewTable = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[@class="s7 li ou"]/a');
		if (villageLinksInOverviewTable.snapshotLength == 1) {
			var oldInfo = loadSingleVillageInfo();
			oldInfo[3] = getParamFromUrl(villageLinksInOverviewTable.snapshotItem(0).href, "newdid");
			GM_setValue(createPermanentKeyForSingleVillageInfo(), escape(arrayToXML(oldInfo)));
		}
	}
}

/**
* transformPageAllPages_addVillagesList
*/
function transformPageAllPages_addVillagesList() {
	var lmidall = xpathEvaluate('//div[@id="lmidall"]').snapshotItem(0);
	var singleVillageInfo = loadSingleVillageInfo();
	lmidall.appendChild(createRightSideVillagesList(singleVillageInfo[3], singleVillageInfo[2], singleVillageInfo[0], singleVillageInfo[1]));
}



//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report pages extra functions  =====================================
//===========================================================================================================
//===========================================================================================================



/**
* getInfoPageAttackReport_getDateInfo
*/
function getInfoPageAttackReport_getDateInfo() {
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting building destructions");
	// getting building destruction cells
	var infoCells = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]/tbody/tr/td[@class="s7"]/div/img[@class="unit"]/../..');
	if (infoCells.snalshotLength == 0) { return; }

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting attack date");
	// getting attack date
	var dateCell = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[2]/td[last()]');
	var dateValue = dateCell.snapshotItem(0).firstChild.nodeValue;

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting links");
	// Getting player and village links for attacker and defender
	var previousLink = "";
	var isGettingAttacker = true;
	var fullServerName = getFullServerName();
	debug(DBG_HIGH, "[getInfoPageAttackReport_getDateInfo] fullServerName " + fullServerName);
	var attackerPlayerLink, attackerVillageLink, defenderPlayerLink, defenderVillageLink;
	var attackerDefenderLinks = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]/tbody/tr[@class="cbg1"]/td/a');
	for(var i=0; i<attackerDefenderLinks.snapshotLength; i++) {
		currentLink = attackerDefenderLinks.snapshotItem(i);
		// for extra external links (eg.: travian map services)
		if (currentLink.href.indexOf(fullServerName) != 0) { continue; }
		// for extra players/villages links (eg.: scout/fake links)
		if (currentLink == previousLink) { continue; }
		var uidParam = getParamFromUrl(currentLink.href, "uid");
		var dParam = getParamFromUrl(currentLink.href, "d");
		debug(DBG_LOW, "[getInfoPageAttackReport_getDateInfo] currentLink.href " + currentLink.href + " uidParam " + uidParam + " dParam " + dParam);
		if (isGettingAttacker) {
			if (!uidParam) { attackerVillageLink = currentLink; isGettingAttacker = false; } else { attackerPlayerLink = currentLink; }
		} else {
			if (!uidParam) { defenderVillageLink = currentLink; } else { defenderPlayerLink = currentLink; }
		}
		previousLink = currentLink;
	}

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] create table");
	// create table
	var infoTable = document.createElement("table");
	var infoTbody = document.createElement("tbody");
	infoTable.className = "tbg QPnowrap";
	var idParam = getParamFromUrl(document.location.href, "id");
	for(var i=0; i<infoCells.snapshotLength; i++) {
		var infoRow = getInfoPageAttackReport_createInfoRow(idParam, attackerPlayerLink, attackerVillageLink, dateValue, defenderPlayerLink, infoCells.snapshotItem(i));

		debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] for - infoRow.innerHTML: " + infoRow.innerHTML);
		infoTbody.appendChild(infoRow);
	}
	infoTable.appendChild(infoTbody);
	var infoDiv = document.createElement("div");
	infoDiv.appendChild(infoTable);

//	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] show table");
	// show table
//	var reportsTitle = xpathEvaluate('//div[@id="lmid2"]/h1/..');
//	reportsTitle.snapshotItem(0).appendChild(infoTable.cloneNode(true));

	// save info
	var coordZ = getParamFromUrl(defenderVillageLink.href, "d");
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] coordZ " + coordZ);
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] infoTable.innerHTML " + infoTable.innerHTML);
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] infoDiv.innerHTML " + infoDiv.innerHTML);
	savePermanentVillageReportInfo(coordZ, infoDiv.innerHTML);
}



/**
* getInfoPageAttackReport_createInfoRow
*/
function getInfoPageAttackReport_createInfoRow(reportId, attackerPlayerLink, attackerVillageLink,
												dateTimeString, defenderPlayerLink, infoCell) {
	var infoRow = document.createElement("tr");
	infoRow.id = reportId;

	var infoCellAttackerPlayer = document.createElement("td");
	infoCellAttackerPlayer.appendChild(attackerPlayerLink.cloneNode(true));
	infoRow.appendChild(infoCellAttackerPlayer);

	var infoCellAttackerVillage = document.createElement("td");
	infoCellAttackerVillage.appendChild(attackerVillageLink.cloneNode(true));
	infoRow.appendChild(infoCellAttackerVillage);

	var infoCellTime = document.createElement("td");
	infoCellTime.innerHTML = dateTimeString;
	infoRow.appendChild(infoCellTime);

	var infoCellDefenderPlayer = document.createElement("td");
	infoCellDefenderPlayer.appendChild(defenderPlayerLink.cloneNode(true));
	infoRow.appendChild(infoCellDefenderPlayer);

	var infoCellInfo = infoCell.cloneNode(true);
	infoRow.appendChild(infoCellInfo);

	return infoRow;
}




























/**
* savePermanentVillageReportInfo
*/
function savePermanentVillageReportInfo(villageId, villageReportInfo) {
	debug(DBG_LOW, "[savePermanentVillageReportInfo] villageReportInfo " + villageReportInfo);
	var key = createPermanentKeyForVillageReportInfo(villageId);
	debug(DBG_LOW, "[savePermanentVillageReportInfo] key " + key );
	GM_setValue(key, escape(villageReportInfo));
	debug(DBG_LOW, "[savePermanentVillageReportInfo] key " + key + " villageReportInfo " + villageReportInfo);
}

/**
* resetPermanentVillageReportInfo
*/
function resetPermanentVillageReportInfo(villageId) {
	savePermanentVillageReportInfo(villageId, "");
}

/**
* loadPermanentVillageReportInfo
*/
function loadPermanentVillageReportInfo(villageId) {
	debug(DBG_LOW, "[loadPermanentVillageReportInfo] villageId " + villageId);
	var key = createPermanentKeyForVillageReportInfo(villageId);
	debug(DBG_LOW, "[loadPermanentVillageReportInfo] key " + key);
	return unescape(GM_getValue(key));
}

/**
* createPermanentKeyForVillageReportInfo
* Creates a key for permanent storing report infos.
* The key is of this format: <server>_<userId>_<villageId>_reportInfo
*/
function createPermanentKeyForVillageReportInfo(villageId) {
	return DEF_PARTKEY_PREFIX + villageId + DEF_PARTIALPERMANENTMKEY_VILLAGEREPORTINFO;
}


































//===========================================================================================================
//===========================================================================================================
//==============================  Travian Quick Targets functions  ==========================================
//===========================================================================================================
//===========================================================================================================




/*
var hint_offset_x=-100;
var hint_offset_y=-100;
var hint_length=200;

var map=document.getElementsByName("map1")[0].childNodes;
for(var i=0;i<map.length;i++) {
	map[i].addEventListener('mouseover',hint_on,false);
	map[i].addEventListener('mouseout',hint_off,false);
}

var map2=document.getElementsByName("map2")[0].childNodes;
for(var i=0;i<map2.length;i++) {
	map2[i].addEventListener('mouseover',hint_on,false);
	map2[i].addEventListener('mouseout',hint_off,false);
}

var hintdiv=document.createElement('div');
hintdiv.setAttribute("id","hint");
hintdiv.setAttribute("style","position:absolute;z-index:200;display:none;top:0px;left:0px");
map[0].parentNode.insertBefore(hintdiv,map[0]);

document.addEventListener('mousemove',get_mouse,false);
*/
function hint_on(z){
	hint_text='<table bgcolor=\"#000000\" border=\"0\" cellpadding=\"6\" cellspacing=\"1\" width=\"'+hint_length+'\"><tr bgColor=#ffffe1><td style=\"font:11px Verdana;COLOR:#000000;\">' + z.target.title + '</td></tr></table>';
	hintdiv.innerHTML=hint_text;
	hintdiv.style.display='';
}
function hint_off(){
	hintdiv.style.display='none';
}

function get_mouse(z){
	var x=z.pageX;
	var y=z.pageY;
	hintdiv.style.top=y+hint_offset_y+'px';
	hintdiv.style.left=x+hint_offset_x+'px';
}

/**
* Adds a DIV to a page.
*/
function addDiv(id, className, innerHtml, parentNodeId){
	var parentNode, div;
	parentNode = (!parentNodeId) ? (document.getElementsByTagName('body')[0]) : (document.getElementById(parentNodeId));
	if (!parentNode) {return false;}
	div = document.createElement('div');
	if (id)		{div.id = id;}
	if (className)	{div.className = className;}
	if (innerHtml)	{div.innerHTML = innerHtml;}
	parentNode.appendChild(div);
	return div;
}

/**
* transformGeneric_addListenerVillageReportInfo
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerVillageReportInfo(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo]" + nodeA.id);
	var dParam = getParamFromUrl(nodeA.href, "d");
	var villageReportInfo = loadPermanentVillageReportInfo(dParam);

	// no info for this village
	if (villageReportInfo == "undefined") { return; }

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] villageReportInfo " + villageReportInfo);
	if (nodeA.parentNode.id == "") { nodeA.parentNode.id = dParam; }

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] before add div");
	var popupDiv = addDiv('QPVillageReport', 'QPpopup', villageReportInfo, nodeA.parentNode.id);

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] CREATED DIV \n popupDiv.innerHTML " + popupDiv.innerHTML + " \n popupDiv.style " + popupDiv.style);
	nodeA.addEventListener('mouseover', function() {
		debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] mouse is over \n popupDiv.innerHTML " + popupDiv.innerHTML + " \n popupDiv.style " + popupDiv.style);
		popupDiv.style.display = "";
	}, false);
	nodeA.addEventListener('mouseout', function() { popupDiv.style.display = "none";}, false);
/*	document.addEventListener('mousemove', function(z) {
		debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] mouse moving");
		var x=z.pageX;
		var y=z.pageY;
		popupDiv.style.top=y+'px';
		popupDiv.style.left=x+'px';

	} ,false);
*/

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] end");
}


/**
* transformGeneric_findTargetsToCreateTargetLinks
*/
function transformGeneric_findTargetsToCreateTargetLinks() {
	var pageSendTroopsNodeA = getLinksPageSendTroops();
	var pageVillagesNodeA = getLinksPageVillage();

//	//html > body > div #lmidall > div #lright1 > table .f10 > tbody > tr > td > a > img
	var ownVillagesTable = xpathEvaluate('//a[@class="active_vl"]/../../../..').snapshotItem(0);

	debug(DBG_NORMAL, "[transformGeneric_findTargetsToCreateTargetLinks]");

	for(var i=0, len=pageSendTroopsNodeA.snapshotLength; i<len; i++) {
		var curr = pageSendTroopsNodeA.snapshotItem(i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] pageSendTroopsNodeA - i " + i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] curr: " + curr.href);

		var currParent4 = curr.parentNode.parentNode.parentNode.parentNode;	//table
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] currParent4: " + currParent4);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ownVillagesTable: " + ownVillagesTable);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] currParent4: \n" + currParent4.innerHTML);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ownVillagesTable: \n" + ownVillagesTable.innerHTML);
		if (currParent4 == ownVillagesTable) { continue }
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ADDING QUICK LINKS");
		transformGeneric_addListenerHeroAttack(curr);
		transformGeneric_addListenerFakeAttack(curr);
		transformGeneric_addListenerScoutAttack(curr);
	}

	for(var i=0, len=pageVillagesNodeA.snapshotLength; i<len; i++) {
		var curr = pageVillagesNodeA.snapshotItem(i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] pageVillagesNodeA - i " + i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] curr: " + curr.href);

		transformGeneric_addListenerFakeAttack(curr);
		transformGeneric_addListenerScoutAttack(curr);
		transformGeneric_addListenerVillageReportInfo(curr);
	}
}





/**
* transformGeneric_addListenerHeroAttack
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerHeroAttack(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerHeroAttack]");
	if (! ( isThisPageVillage_UnclaimedOasis() || isThisPageVillage_OwnedOasis() ) ) { return; }

	debug(DBG_LOW, "[transformGeneric_addListenerHeroAttack]" + nodeA);
	var qsl = document.createElement("a");
	qsl.addEventListener('mouseup', function() { listenerHeroAttack(nodeA)}, false);
//	qsl.href = "#";
	qsl.href = nodeA.href;
//	qsl.innerHTML = '<img width="14" height="14" src="img/un/u/hero.gif"/>';
	qsl.innerHTML = '<img src="img/un/u/hero.gif"/>';
	nodeA.parentNode.insertBefore(qsl, nodeA.nextSibling);
	nodeA.parentNode.insertBefore(document.createTextNode(" "), nodeA.nextSibling);
	debug(DBG_LOW, "[transformGeneric_addListenerHeroAttack]" + qsl.innerHTML);
}

function listenerHeroAttack(nodeA) {
	debug(DBG_LOW, "[listenerHeroAttack] nodeA " + nodeA);

	var utm = createUniversalTroopsMove(0,0,0,0,0,0,0,0,0,0,1, DEF_ATTACKTYPE_RAID, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_RANDOM, DEF_CATATARGET_NONE);
	debug(DBG_LOW, "[listenerHeroAttack] utm " + utm);

	var coordZ = getCoordZfromHref(nodeA.href);
	debug(DBG_LOW, "[listenerHeroAttack] coordZ " + coordZ);
	savePermanentUniversalTroopsMove(coordZ, utm);
	debug(DBG_LOW, "[listenerHeroAttack] savePermanentUniversalTroopsMove ");

//	document.location.href = nodeA.href;
}



/**
* transformGeneric_addListenerScoutAttack
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerFakeAttack(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerFakeAttack]" + nodeA);
	var qsl = document.createElement("a");
	qsl.addEventListener('mouseup', function() { listenerFakeAttack(nodeA)}, false);
//	qsl.href = "#";
	qsl.href = nodeA.href;
	qsl.innerHTML = '<img width="14" height="14" src="' + IMGS_FAKE + '"/>';
	nodeA.parentNode.insertBefore(qsl, nodeA.nextSibling);
	nodeA.parentNode.insertBefore(document.createTextNode(" "), nodeA.nextSibling);
	debug(DBG_LOW, "[transformGeneric_addListenerFakeAttack]" + qsl.innerHTML);
}





function listenerFakeAttack(nodeA) {
	debug(DBG_LOW, "[listenerFakeAttack] nodeA " + nodeA);

	var utm = CONFIG_FAKE_ATTACK;
	debug(DBG_LOW, "[listenerFakeAttack] utm " + utm);

	var coordZ = getCoordZfromHref(nodeA.href);
	debug(DBG_LOW, "[listenerFakeAttack] coordZ " + coordZ);
	savePermanentUniversalTroopsMove(coordZ, utm);
	debug(DBG_LOW, "[listenerFakeAttack] savePermanentUniversalTroopsMove ");

//	document.location.href = nodeA.href;
}





/**
* transformGeneric_addListenerScoutAttack
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerScoutAttack(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerScoutAttack]" + nodeA);
	var qsl = document.createElement("a");
	qsl.addEventListener('mouseup', function() { listenerScoutAttack(nodeA)}, false);
//	qsl.href = "#";
	qsl.href = nodeA.href;
	qsl.innerHTML = '<img width="14" height="14" src="' + IMGS_SCOUT + '"/>';
	nodeA.parentNode.insertBefore(qsl, nodeA.nextSibling);
	nodeA.parentNode.insertBefore(document.createTextNode(" "), nodeA.nextSibling);
	debug(DBG_LOW, "[transformGeneric_addListenerScoutAttack]" + qsl.innerHTML);
}



function listenerScoutAttack(nodeA) {
	debug(DBG_LOW, "[listenerScoutAttack] nodeA " + nodeA);

	var trib = loadPermanentMyTribe();
	debug(DBG_LOW, "[listenerScoutAttack]trib:" + trib);

	// get the correct input for scout units - gauls's scout is the 3rd unit ; roman/teuton's scout is the 4th unit
	var scoutIndex = (trib == TRIBE_GAUL) ? 3 : 4;

	var scoutQtty = CONFIG_SCOUT_QTTY;
	var scoutAttackType = CONFIG_SCOUT_TYPE;
	debug(DBG_LOW, "[listenerScoutAttack] scoutQtty " + scoutQtty + " scoutAttackType " + scoutAttackType);

//	var scoutQtty = 1;
//	var scoutAttackType = DEF_SCOUTTYPE_RESOURCES;
//	var scoutAttackType = DEF_SCOUTTYPE_DEFENSES;

	// creates the scout attack -
	var utm = createUniversalScoutAttack(scoutQtty, scoutIndex, scoutAttackType);

	var coordZ = getCoordZfromHref(nodeA.href);
	savePermanentUniversalTroopsMove(coordZ, utm);

//	document.location.href = nodeA.href;
}






//===========================================================================================================
//===========================================================================================================
//==============================  Travian Delayed Send Troops functions  ====================================
//===========================================================================================================
//===========================================================================================================

function createElementAppend(newElementTag, parentElement) {
	var newElement = document.createElement(newElementTag);
	parentElement.appendChild(newElement);
	return newElement;
}

function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM) {
	var newElement = createElementAppend(newElementTag, parentElement);
	newElement.innerHTML = innerHTM;
	return newElement;
}


/**
* transformPageSendTroopsConfirm_addTimeOffArrivalSync
* Adds the timer for time of arrival.
* Herein original table is called "sendTable". An extra row is added with the name sendTableExtraRow.
* Inside that row, create 2 cells: [ action cell ] [ table ]
*/
function transformPageSendTroopsConfirm_addTimeOffArrivalSync() {
	var sendTable = xpathEvaluate('//form/table[@class="tbg"]/tbody/tr[last()]/..').snapshotItem(0);

	// adds an extra row to the original sendTable
	var sendTableExtraRow  = createElementAppend("tr", sendTable);

	// creates the 2 cells like the above rows of the original table
	var dstCountdownCell   = createElemAppendAndSetInner("td", sendTableExtraRow, "??:??:??");
	var dstOutCell  = createElementAppend("td", sendTableExtraRow);
	dstOutCell.colSpan = 20;

	// creates the Delayed Send Troops table, with a tbody and a single row
	var dstTable = createElementAppend("table", dstOutCell);
	dstTable.className = "tbg";
	dstTable.cellSpacing = 0;
	var dstTbody = createElementAppend("table", dstTable);
	var dstRow = createElementAppend("tr", dstTbody);

	// creates 5 cells to put inside the Delayed Send Troops table (tbody, row)
//	var travelTime = xpathEvaluateInContext(sendTable, 'tr[4]/td[2]/table/tbody/tr/td[1]').snapshotItem(0).innerHTML;
	var travelTime = xpathEvaluateInContext(sendTable, 'tr[last() - 1]/td[2]/table/tbody/tr/td[1]').snapshotItem(0).innerHTML;
	var travelTime = /\d+:\d+:\d+/.exec(travelTime);

	var dstLaunchTimeCell  = createElemAppendAndSetInner("td", dstRow, "??:??:??");	dstLaunchTimeCell.width = "20%";
	var dstSpacerCell1    = createElemAppendAndSetInner("td", dstRow, ">");			dstSpacerCell1.width = "5%";
	var dstTravelTimeCell = createElemAppendAndSetInner("td", dstRow, travelTime);	dstTravelTimeCell.width = "20%";
	var dstSpacerCell2    = createElemAppendAndSetInner("td", dstRow, ">");			dstSpacerCell2.width = "5%";
	var dstConfigTOACell  = createElementAppend("td", dstRow);						dstConfigTOACell.width = "45%";
	var actionCell   = createElementAppend("td", dstRow);							actionCell.width = "5%";
	var actionButton = createElemAppendAndSetInner("a", actionCell, "<img src='"+IMGS_CLOCK+"'/>");


	// create the form in the configuration cell
	var timerForm  = createElementAppend("form", dstConfigTOACell);
	timerForm.name = "timeSynchronizer";
	timerForm.innerHTML =
			'<select name="hours">' + dropDownListCreateNumericOptions(0, 24) + '</select>' +
			'<select name="minutes">' + dropDownListCreateNumericOptions(0, 60) + '</select>' +
			'<select name="seconds">' + dropDownListCreateNumericOptions(0, 60) + '</select>';

	// create the listener for the action button
	var timeout = null;
	var okButton = xpathEvaluate('//form/p/input[@name="s1"]').snapshotItem(0);
	actionButton.addEventListener('click', function() {
		var confTime = xpathEvaluate('//form[@name="timeSynchronizer"]/select');
		var actualTime = xpathEvaluate('//span[@id="tp2"]');

		var actualTimeValue = timeColonSeparatedToValue(actualTime.snapshotItem(0).innerHTML);
		var confTimeValue = time3ToValue(confTime.snapshotItem(0).value, confTime.snapshotItem(1).value, confTime.snapshotItem(2).value);
		var diffTimeValue = (confTimeValue > actualTimeValue) ? (confTimeValue - actualTimeValue) : (86400 + confTimeValue - actualTimeValue);
		var travelTimeValue = timeColonSeparatedToValue("" + travelTime);
		var launchTimeValue = (confTimeValue > travelTimeValue) ? (confTimeValue - travelTimeValue) : (86400 + confTimeValue - travelTimeValue);

		dstLaunchTimeCell.innerHTML = timeInSecondsToColonSeparatedTxt(launchTimeValue);
		dstCountdownCell.innerHTML = "<span id='QPtimer'>"+timeInSecondsToColonSeparatedTxt(diffTimeValue)+"</span>";
//		dstCountdownCell.innerHTML = timeInSecondsToColonSeparatedTxt(diffTimeValue);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync] diffTimeValue : " + diffTimeValue + " timeInSecondsToColonSeparatedTxt(diffTimeValue) " +timeInSecondsToColonSeparatedTxt(diffTimeValue));

		if (timeout != null) {	// changing the timer
			clearTimeout(timeout);
		} else {	// setting the timer for the first time
//			dstCountdownCell.id = "QPtimer";
			QPTimersCollect();
		}
		var delaySend = (diffTimeValue * 1000);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync]delaySend : " + delaySend);
		timeout = setTimeout( function() { okButton.click() } , delaySend);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync]timeout : " + timeout);
	}, false);

}






//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report functions  =================================================
//===========================================================================================================
//===========================================================================================================





/**
* retrieveReportReinf_AppendToQPClipboard
*/
function retrieveReportReinf_AppendToQPClipboard() {

	var reinfTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]').snapshotItem(0);

	var playerAndVillage = retrieveReportTable_PlayerAndVillage(reinfTable);

	var csv = 	retrieveReport_Subject().innerHTML + "," +
				retrieveReport_Time().innerHTML + "," +
				playerAndVillage[0].innerHTML + "," +
				playerAndVillage[1].innerHTML + "," +
				retrieveReportTable_Troops(reinfTable);

	appendPermanentQPClipboard(csv + "\n");
	debug(DBG_HIGHEST, "[retrieveReportReinf_AppendToQPClipboard] csv " + csv)
}

/** retrieveReport		Subject / Time */
function retrieveReport_Subject() {return xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[1]/td[2]').snapshotItem(0); }
function retrieveReport_Time() {return xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[2]/td[2]').snapshotItem(0); }

/** retrieveReportTable_PlayerAndVillage */
function retrieveReportTable_PlayerAndVillage(table) {
	var fullServerName = getFullServerName();
	var previousLink = "";

	var returnLinks = new Array();
	var tableLinks = xpathEvaluateInContext(table, 'tbody/tr/td/a');
	for(var i=0, len=tableLinks.snapshotLength; i<len; i++) {
		currentLink = tableLinks.snapshotItem(i);
		// for extra external links (eg.: travian map services)
		if (currentLink.href.indexOf(fullServerName) != 0) { continue; }
		// for extra players/villages links (eg.: scout/fake links)
		if (currentLink.href == previousLink.href) { continue; }
		var uidParam = getParamFromUrl(currentLink.href, "uid");
		if (uidParam) {
			returnLinks[0] = currentLink;
		} else {
			returnLinks[1] = currentLink;
		}
		previousLink = currentLink;
	}
	return returnLinks;
}
/** retrieveReportTable_Troops */
function retrieveReportTable_Troops(table) {
	var troops = new Array();
	var troopsRowCells = xpathEvaluateInContext(table, 'tbody/tr[3]/td');
	for(var i=0, len=troopsRowCells.snapshotLength-1; i<len; i++) {
		troops[i] = troopsRowCells.snapshotItem(i+1).innerHTML;
	}
	if (troopsRowCells.snapshotLength == 11) { troops[10] = 0; }
	return troops;
}





//===========================================================================================================
//===========================================================================================================
//==============================  Travian QP Clipboard functions  ===========================================
//===========================================================================================================
//===========================================================================================================



/** appendPermanentQPClipboard */
function appendPermanentQPClipboard(txt) {
	savePermanentQPClipboard(loadPermanentQPClipboard() + txt)
}

/** resetPermanentQPClipboard */
function resetPermanentQPClipboard() {
	savePermanentQPClipboard("");
}

/** savePermanentQPClipboard */
function savePermanentQPClipboard(txt) {
	GM_setValue(createPermanentKeyForQPClipboard(), txt);
}

/** loadPermanentQPClipboard */
function loadPermanentQPClipboard() {
	return GM_getValue(createPermanentKeyForQPClipboard());
}

/** createPermanentKeyForQPClipboard */
function createPermanentKeyForQPClipboard() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_QP_CLIPBOARD;
}




//===========================================================================================================
//===========================================================================================================
//==============================  Travian Quick Farm functions  =============================================
//===========================================================================================================
//===========================================================================================================



/**
* transformPageScoutReport_createQuickFarmInputs
*/
function transformPageScoutReport_createQuickFarmInputs() {
	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs]");

	// Sum up the resources found in the city
	var resQtty = xpathEvaluate('//tr[@class="cbg1"]/td[@class="s7"]/text()');
	var resTotal = 0;
	if (resQtty.snapshotLength > 0) {
		for(var i=0; i<4; i++) {
			resTotal += parseInt(resQtty.snapshotItem(i).nodeValue);;
		}
	}

	// Get the attacker table to add the Hero column in case there was none
	var attackerTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]').snapshotItem(0);
	var columnsAttackerTroopsRow = xpathEvaluateInContext(attackerTable, 'tbody/tr[2]/td');

	if (columnsAttackerTroopsRow.snapshotLength == 11) {
		var rows = xpathEvaluateInContext(attackerTable, 'tbody/tr');
		rows.snapshotItem(0).cells[1].colSpan = 20;
		var td = createElemAppendAndSetInner('td', rows.snapshotItem(1), '<img src="img/un/u/hero.gif" />');
		var td = createElemAppendAndSetInner('td', rows.snapshotItem(2), '0'); td.className = "c";
		var td = createElemAppendAndSetInner('td', rows.snapshotItem(3), '0'); td.className = "c";
		for(var i=4; i<rows.snapshotLength; i++) {
			var currentRow = rows.snapshotItem(i);
			currentRow.cells[currentRow.cells.length - 1].colSpan = 20;
		}
	}


//	var villageLinkNode = getLinkLastPageVillage();
	var villageLinkNodes = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td/a[contains(@href, "karte.php?d=")]');
	var defenderVillageLinkNode = villageLinkNodes.snapshotItem(villageLinkNodes.snapshotLength - 1);

	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs] villageLinkNode.href " + defenderVillageLinkNode.href);

	var inputRow = document.createElement("tr");
	var tdAttackType = document.createElement("td");

	var attackTypeChecked = (getTribeBySettlerTroopsInAnyPage(1) == TRIBE_GAUL) ?
								new Array ("checked", "") :
								new Array ("", "checked");

	tdAttackType.innerHTML =
			'<div class="f10"><input type="Radio" name="c" value="3" ' + attackTypeChecked[0] + '>Attack</div>' +
			'<div class="f10"><input type="Radio" name="c" value="4" ' + attackTypeChecked[1] + '>Raid</div>';

	var sendAllButton = document.createElement("a");
	sendAllButton.addEventListener('click', function() { addToFarmList(defenderVillageLinkNode, "sendAll")}, false);
	sendAllButton.name = "sendAll";
	sendAllButton.title = "Sends all troops types";
	sendAllButton.href = defenderVillageLinkNode.href;
	sendAllButton.innerHTML = "Send All";
	tdAttackType.appendChild(sendAllButton);

	inputRow.appendChild(tdAttackType);

	var tribe = getTribeBySettlerTroopsInAnyPage(0);
	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs]: resTotal " + resTotal);
	for(var i=0; i<troopsBountyLoad[tribe].length; i++) {
		var troopsAmount = suggestedTroopNumber(resTotal, i, tribe);
		if (i<8) {
			inputRow.appendChild(createInputOnTd("fm", "Text", "t" + i, troopsAmount, "2", "6", defenderVillageLinkNode, tribe));
		} else {
			inputRow.appendChild(createInputOnTd("fm", "Text", "t" + i, troopsAmount, "1", "2", defenderVillageLinkNode, tribe));
		}
	}
	var reportAttackerRows = xpathEvaluate('//tr[@class="cbg1"]/../tr[last()]');
	reportAttackerRows.snapshotItem(0).parentNode.appendChild(inputRow);
}


/**
* suggestedTroopNumber
* @param {int} totalResQtty Total resources quantity.
* @param {int} troopNumber Number of the troop (index in the array of troopsBountyLoad).
* @param {int} tribe The tribe of the farmer.
*/
function suggestedTroopNumber(totalResQtty, troopIndex, tribe) {
	//debug(DBG_NORMAL, "[suggestedTroopNumber]: totalResQtty " + totalResQtty + " troopIndex " + troopIndex);

	if (totalResQtty == 0) {
		return 0;
	}
	var troopsAmount = 0;
	if (troopsBountyLoad[tribe][troopIndex] > 0) {

		// troops required to get all the resources at the village
		var troopsAmount = totalResQtty / troopsBountyLoad[tribe][troopIndex];

		// number of digits in the troopsAmount
		var digitsAmount = Math.floor(Math.log(troopsAmount) / Math.LN10) + 1;

		// troopsAmount in x,xxxx format - with only 1 non-decimal digit
		troopsAmount = troopsAmount * Math.pow(10, -(digitsAmount - 1));

		// troopsAmount in x,0000 format
		var troopsAmountFloor = Math.floor(troopsAmount);

		// the decimal places of the troopsAmount 0,xxxx
		var rest = (troopsAmount - troopsAmountFloor);

		// value to be added to the x,0000 troopsAmount
		var recess = ((rest < 0.20) ? (0.5) : ((rest < 0.70) ? 1 : 1.5));
		//GM_log("[suggestedTroopNumber][for each troop] ["+troopIndex+"]: troopsAmount " + troopsAmount+
		//" troopsAmountFloor " + troopsAmountFloor +	" rest " + rest + " recess " + recess);

		// x,0000 +  (0.5 | 1 | 1.5)
		troopsAmount = troopsAmountFloor + recess;

		// make it back to original type of value xxxxx
		troopsAmount = troopsAmount * Math.pow(10, (digitsAmount - 1));
		// just for testing purposes - adjusting the formula, shows the res this troops would take
		//troopsAmount *= troopsBountyLoad[TRIBE_ROMAN][i];

		// Just in case the value was so small that it only had 1 digit, increase it (happens to settlers)
		troopsAmount = Math.ceil(troopsAmount);
	}
	return troopsAmount;
}


function addToFarmList(nodeA, troopTypeTNumber) {
	debug(DBG_LOW, "[addToFarmList] nodeA " + nodeA + " document.location.href: " + document.location.href);

//	var attackType = xpathEvaluate('//input[@checked=true()]').snapshotItem(0).value;
//  IMPROVE THIS SINCE THIS IS RIDICULOUS!!!
	var attackTypeInputs = xpathEvaluate('//input[@type="radio"]');
	var attackType = 0;
	for(var i=0; i<attackTypeInputs.snapshotLength; i++) {
		if (attackTypeInputs.snapshotItem(i).checked == true) {
			attackType = attackTypeInputs.snapshotItem(i).value;
		}
	}

	debug(DBG_LOW, "[addToFarmList] attackType " + attackType);

	var troopsToSend = xpathEvaluate('//input[@class="fm"]');

	// The send all sends the number of troops selected for each troop type, others clean the other troop fields
	if (troopTypeTNumber != "sendAll") {
		for(var i=0; i<troopsToSend.snapshotLength; i++) {
			if (troopTypeTNumber != troopsToSend.snapshotItem(i).name) {
				troopsToSend.snapshotItem(i).value = 0;
			}
		}
	}

	var coordZ = getCoordZfromHref(nodeA.href);

	var utm = createUniversalTroopsMoveXpathIterator(troopsToSend, attackType, DEF_SCOUTTYPE_RESOURCES, 0, 0);
	savePermanentUniversalTroopsMove(coordZ, utm);
}



/**
* createInputOnTd
* example: "fm", "Text", "t9", troopsAmount, "2", "6", villageLinkNode
*/
function createInputOnTd(pclass, ptype, pname, pvalue, psize, pmaxlength, nodeA, tribe) {
	var newInput = document.createElement("input");
	newInput.className = pclass;
	newInput.type = ptype;
	newInput.name = pname;
	newInput.value = pvalue;
	newInput.size = psize;
	newInput.maxLength = pmaxlength;

	var newTd = document.createElement("td");
	newTd.appendChild(newInput);
	newTd.appendChild(createSendQuickFarmSendTroopsLink(pname, nodeA, "Send", tribe));

	return newTd;
}

/**
* createSendQuickFarmSendTroopsLink
*/
function createSendQuickFarmSendTroopsLink(pname, nodeA, linkText, tribe) {
	var aOriginalTitle = "Send only this type of troop [load/unit="+troopsBountyLoad[tribe][pname.substring(1)]+"] ";
	var newButton = document.createElement("a");
	newButton.addEventListener('click', function() { addToFarmList(nodeA, pname)}, false);
	newButton.addEventListener('mouseover', function() {
			var inputNode = xpathEvaluate('//input[@name="' + pname + '"]');
			var num = parseInt(inputNode.snapshotItem(0).value);
			num = isNaN(num) ? 0 : num;
			newButton.title = aOriginalTitle + " Total: "+ parseInt(num * troopsBountyLoad[tribe][pname.substring(1)]);
		}, false);
	newButton.addEventListener('mouseout', function() { newButton.title = aOriginalTitle;}, false);
	newButton.name = pname;
	newButton.title = aOriginalTitle;
	newButton.href = nodeA.href;
	newButton.innerHTML = linkText;
	newButton.className = "QPsmallTxt";
	return newButton;
}








//===========================================================================================================
//===========================================================================================================
//==============================  Travian IGM pages extra functions  ========================================
//===========================================================================================================
//===========================================================================================================



/**
* transformPageIGMsList_addSelectAllCheckbox
*/
function transformPageIGMsList_addSelectAllCheckbox() {
	// Plus users already have this checkbox so do nothing
	if (document.getElementsByName("s10").length > 0) { return; }

	var buttonsRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr[last()]').snapshotItem(0);
//	var selectAllCell = '<td align="center"><input id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox"></td>';
	var selectAllCell = '<input id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';

	buttonsRow.cells[0].innerHTML = selectAllCell;
}



//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report List pages extra functions  ================================
//===========================================================================================================
//===========================================================================================================



/**
* actionPageReportsTradeList_deleteAllReportsOfGivenType
*/
function actionPageReportsTradeList_deleteAllReportsOfGivenType() {

	var checkboxes = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/input[@type="checkbox"][not(@id)]');
	if (checkboxes.snapshotLength == 0) {
		gmReset_ReportsAction();
		var allLink = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a[not(contains(@href,"&t="))]');
		document.location.href = allLink.snapshotItem(0).href;
		return;
	}

	document.getElementsByName("s10")[0].click();
	var deleteButton = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/input[@class="std"][1]');

	deleteButton.snapshotItem(0).click();
}


/**
* transformPageReportList_addDeleteByReportTypeButtons
*/
function transformPageReportList_addDeleteByReportTypeButtons() {
	var deleteButton = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/input[@class="std"][1]');
	var deleteLang = deleteButton.snapshotItem(0).value;
	deleteLang = deleteLang.substr(0, 1).toUpperCase() + deleteLang.substr(1);

	var form = xpathEvaluate('//div[@id="lmid2"]/form').snapshotItem(0);
	debug(DBG_NORMAL, "[transformPageReportList_addDeleteTradeButton] new TABLE " );

	var br = createElementAppend('br', form);

	var tbody = createElemTravianTable(deleteLang, form, true);

	var tr = createElementAppend('tr', tbody);

	var reportTypesLinks = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a[contains(@href,"berichte.php")]');
	debug(DBG_NORMAL, "[transformPageReportList_addDeleteTradeButton] reportTypesLinks.snapshotLength " + reportTypesLinks.snapshotLength);
	for(var i=0, len=reportTypesLinks.snapshotLength; i<len; i++) {
		var curr = reportTypesLinks.snapshotItem(i);

		debug(DBG_NORMAL, "[transformPageReportList_addDeleteTradeButton] curr.innerHTML " + curr.innerHTML);
		var td = createElementAppend('td', tr);

		var bt = createElemTravianButton(curr.innerHTML, td, curr.href);
		bt.addEventListener('click', function(ev) {
			var currLink = ev.target.id;
			debug(DBG_NORMAL, "[transformPageReportList_addDeleteTradeButton] listener i " +i);
			gmSave_ReportsAction(currLink);
			debug(DBG_NORMAL, "[transformPageReportList_addDeleteTradeButton] " + " currLink " + currLink);
	
			document.location.href = currLink;
		}, true);

	}
}
/**
* transformPageResidenceOrPalaceCulturePoints_addCPsForVillages
*/
function transformPageResidenceOrPalaceCulturePoints_addCPsForVillages() {
	var culturePointsLink = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a[contains(@href, "build.php?id=")][contains(@href, "&s=2")]');
	var culturePointsLang = culturePointsLink.snapshotItem(0).innerHTML;

	var divLmid2 = document.getElementById("lmid2");

	var currentTotalCPs = xpathEvaluate('//div[@id="lmid2"]/p[not(@class)][2]/b[1]').snapshotItem(0).innerHTML;
 	var currentTotalCPsPerDay = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[2]/td/b').snapshotItem(0).innerHTML;
	var villagesLang = xpathEvaluate('//div[@id="lright1"]/a[1]/span').snapshotItem(0).innerHTML.replace(":","");
	
	createElemTravianCPTable(divLmid2, villagesLang, culturePointsLang, currentTotalCPs, currentTotalCPsPerDay);
}

/**
* createElemTravianCPTable
*/
function createElemTravianCPTable(tableParent, villagesText, cpText, currentTotalCPs, currentTotalCPsPerDay) {
	var tbody = createElemTravianTable(villagesText, tableParent, false);
	createElemAppendAndSetInner('td', tbody.rows[0], cpText);
	createElemAppendAndSetInner('td', tbody.rows[0], '<img src="'+IMGS_CLOCK+'"/>');
	

	var cpArray;
	switch (CONFIG_TRAVIAN_SERVER_TYPE) {
		case DEF_TRAVIAN_SERVER_TYPE_2:		cpArray = DEF_CP_TRAVIAN_2;		break;
		case DEF_TRAVIAN_SERVER_TYPE_3:		cpArray = DEF_CP_TRAVIAN_3;		break;
		case DEF_TRAVIAN_SERVER_TYPE_SPEED:	cpArray = DEF_CP_TRAVIAN_SPEED;	break;
		default: debug(DBG_HIGHEST, "[createElemTravianCPTable] ERROR: wrong CONFIG_TRAVIAN_SERVER_TYPE " + CONFIG_TRAVIAN_SERVER_TYPE); break;
	}


	var nextVillage = searchCPValue(currentTotalCPs, cpArray);

	var numberOfVillages = xpathEvaluate('//div[@id="lright1"]/table[1]/tbody/tr/td/a[contains(@href, "newdid")]').snapshotLength;

	var villagesToBeBuiltWithCurrentCPs = (nextVillage-1) - numberOfVillages;
	
	if (villagesToBeBuiltWithCurrentCPs > 0) {
		createElemTravianCPTableRow(tbody, cpArray, numberOfVillages, currentTotalCPs, currentTotalCPsPerDay);
		if (villagesToBeBuiltWithCurrentCPs > 1) {
			createElemTravianCPTableRow(tbody, false, "...", currentTotalCPs, currentTotalCPsPerDay);
			
		}
	}

	for(var i=0; i<3; i++) {
		createElemTravianCPTableRow(tbody, cpArray, nextVillage - 1 + i, currentTotalCPs, currentTotalCPsPerDay);
	}
}

/**  createElemTravianCPTableRow */
function createElemTravianCPTableRow(rowParent, cpArray, index, currentTotalCPs, currentTotalCPsPerDay) {
	var tr = createElementAppend('tr', rowParent);
	tr.style.backgroundColor = "palegreen";
	var td = createElemAppendAndSetInner('td', tr, index);
	var timeToReachNextLevel = 0;
	if (cpArray) {
		var cpValueOfLevel = "?";
		if (index < cpArray.length) {
			cpValueOfLevel = cpArray[index];
			if (cpValueOfLevel > currentTotalCPs) {
				timeToReachNextLevel = (cpValueOfLevel - currentTotalCPs) / currentTotalCPsPerDay;
				tr.style.backgroundColor = "lightpink";
			}
		}

		var td = createElemAppendAndSetInner('td', tr, cpValueOfLevel);
	} else {
		var td = createElemAppendAndSetInner('td', tr, "...");
	}
	timeToReachNextLevel = timeInSecondsToColonSeparatedTxtWithDays(timeDaysToSeconds(timeToReachNextLevel));
	var td = createElemAppendAndSetInner('td', tr, timeToReachNextLevel);
	return tr;
}


/** searchCPValue */
function searchCPValue(cpValue, cpArray) {
	for(var i=0, len=cpArray.length; i<len; i++) {
		if (cpValue < cpArray[i]) {
			return i;
		}
	}
	return i;
}


/** createElemTravianTable */
function createElemTravianTable(tableTitle, tableParent, isTitleSingleCell) {
	var table = createElementAppend('table', tableParent);
	table.className = "tbg";
	table.cellSpacing = "1";
	table.cellPadding = "2";

	var tbody = createElementAppend('tbody', table);

	var tr = createElementAppend('tr', tbody);
	tr.className = "rbg";

	var td = createElemAppendAndSetInner('td', tr, tableTitle);

	if (isTitleSingleCell) {
		td.colSpan = "0";
	}

	return tbody;	
}

/** createElemTravianButton */
function createElemTravianButton(buttonText, buttonParent, buttonId) {//, buttonEventListenerFunction) {
	var button = document.createElement('input');
	button.type = "button";
	button.value = buttonText;
	button.id = buttonId;
	button.className = "std";
//	button.addEventListener('click',	function() {buttonEventListenerFunction();}, true);
	buttonParent.appendChild(button);
	return button;
}


/** isThisPageReportListToDeletePage */
function isThisPageReportListToDeletePage() { return gmLoad_ReportsAction().indexOf(document.location.href) >= 0; }


/** isToDeleteReportsOfGivenType */
function isToDeleteReportsOfGivenType() {
	var exists = gmExists_ReportsAction();
	debug(DBG_HIGHEST, "[isToDeleteReportsOfGivenType] gmExists_ReportsAction() " + exists);
	return exists;
}



/** transformPageReportList_addSelectAllCheckbox */
function transformPageReportList_addSelectAllCheckbox() {
	// Plus users already have this checkbox so do nothing
	if (document.getElementsByName("s10").length > 0) { return; }

	var buttonsRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr[last()]').snapshotItem(0);
	var selectAllCell = '<td align="center"><input id="s10" name="s10" onclick="Allmsg(this.form);" align="bottom" type="checkbox"></td>';
										//	<input id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">
	buttonsRow.cells[0].colSpan = 1;
	buttonsRow.innerHTML = selectAllCell + buttonsRow.innerHTML;
}


/** save, reset, load, createKey, exists - ReportsAction - <server>_<userId>_reportsAction */
// Saved info: url of type of report to delete
function gmSave_ReportsAction(reportAction) { GM_setValue(gmKey_ReportsAction(), reportAction); }
function gmReset_ReportsAction() { gmSave_ReportsAction(""); }
function gmLoad_ReportsAction() { return gmLoad_UndefinedIsEmptyString(gmKey_ReportsAction()); }
function gmKey_ReportsAction() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_REPORTSACTION; }
function gmExists_ReportsAction() { return (gmLoad_ReportsAction() != ""); }









//===========================================================================================================
//===========================================================================================================
//==============================  Travian Rally Point extra info functions  =================================
//===========================================================================================================
//===========================================================================================================



/**
* getInfoRallyPoint_CreateIncomingAttacksReport
*/
function getInfoRallyPoint_CreateIncomingAttacksReport() {
	var reinfsWord = loadPermanentLang_Reinforcements();
	if (reinfsWord == undefined) { return; }

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport]  ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] activeVillageCoordZ " + activeVillageCoordZ);

	var txt = "";
	txt += getActiveVillageNameAndCoords() + " ";
	var cropName = xpathEvaluate('//img[@class = "res"][contains(@src, "img/un/r/4.gif")][@title]');
	txt += cropName.snapshotItem(0).title + ": ";

	txt += g_res_now[3] + "/" + g_res_max[3] + " " + ((g_res_prod[3] >= 0) ? "+" : "") + g_res_prod[3];
	txt += "\nhttp://speed.travian.com/karte.php?z=" + activeVillageCoordZ;

	// selects tables for moving troops that aren't from this city (the reinfs are filtered out in the for cycle)
	var incomingAttacksTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td[1][not(img)]/../../../../../../../tbody/tr[1]/td[1]/a[not(contains(@href, ' + activeVillageCoordZ + '))]/../../..');

	for(var i=0; i<incomingAttacksTables.snapshotLength; i++) {
		var currentTable = incomingAttacksTables.snapshotItem(i);
		var currentTableRow0 = currentTable.rows[0];
		if (currentTableRow0.cells[1].innerHTML.indexOf(reinfsWord) != 0) {
			txt += "\n" + removeAllTags(currentTableRow0.cells[0].innerHTML);
			txt += " " + currentTableRow0.cells[1].innerHTML;
			var currentTableRow3 = currentTable.rows[3];
			txt += "\n" + removeAllTags(currentTableRow3.cells[0].innerHTML);
			txt += " " + removeAllTags(currentTableRow3.cells[1].innerHTML).replace(/(\n|&nbsp;)/g, "");
		}
	}
	debug(DBG_HIGHEST, "[getInfoRallyPoint_CreateIncomingAttacksReport] txt \n" + txt);
	// ??????????????????????????????????

	var overviewSendWarsimParagraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]').snapshotItem(0);
	overviewSendWarsimParagraph.appendChild(document.createTextNode(" | "));
	var defReport = createElemAppendAndSetInner("a", overviewSendWarsimParagraph, '<img src="img/un/a/def2.gif" />');
	defReport.addEventListener('click',	function() {
		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] QPCreateDefReport");
//		savePermanentReportsAction(DEF_ACTION_DELETE_TRADE);
		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] tradeLink.snapshotItem(0).href " + tradeLink.snapshotItem(0).href);
//		document.location.href = tradeLink.snapshotItem(0).href;
	}, true);
}




/**
* getInfoRallyPoint_ReinforcementsLang
*/
function getInfoRallyPoint_ReinforcementsLang() {
	debug(DBG_NORMAL, "[getInfoRallyPoint_ReinforcementsLang] ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[getInfoRallyPoint_ReinforcementsLang] activeVillageCoordZ " + activeVillageCoordZ);

	// selects tables of reinforcements (consuming crop), that are of troops from this town (so own troops away)
	var ownReinfsAwayTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td/img[@class = "res"]/../../../../../../../../tbody/tr/td/a[contains(@href, ' + activeVillageCoordZ + ')]/../../td[2]/a/span[@class = "c0"]');
	if (ownReinfsAwayTables.snapshotLength > 0) {
		var txt = ownReinfsAwayTables.snapshotItem(0).innerHTML;
		txt = txt.split(" ")[0];
		savePermanentLang_Reinforcements(txt);
	}
}


/**
* savePermanentLang_Reinforcements
*/
function savePermanentLang_Reinforcements(txt) {
	GM_EscapeAndSave(createPermanentKeyForLangReinforcements(), txt);
}

/**
* loadPermanentLang_Reinforcements
*/
function loadPermanentLang_Reinforcements() {
	return GM_LoadAndUnescape(createPermanentKeyForLangReinforcements());
}

/**
* createPermanentKeyForLangReinforcements
* Creates a key for permanent storing the word for reinforcements as used in the Rally Point.
* The key is of this format: <server>_<userId>_lang_reinforcements
*/
function createPermanentKeyForLangReinforcements() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS;
}






/**
* transformPageRallyPoint_addOwnTownTotalTroopsTable
* Simplifies rally point page by adding a table with the total troops own'ed by this town, no matter
* where they are currently. This avoids checking multiple locations to see own many troops this town has.
* Troops that go or are already in an oasis owned by the current town, cannot be counted on the oasis because
* they already at the "on the way" or the "in other villages" groups.
*/
function transformPageRallyPoint_addOwnTownTotalTroopsTable() {
	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] activeVillageCoordZ " + activeVillageCoordZ);

	// selects tables with troops from current town OR the oasis titles
	var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ownTroopsTables.snapshotLength " + ownTroopsTables.snapshotLength);
	if (ownTroopsTables.snapshotLength > 0) {
		var newTable = ownTroopsTables.snapshotItem(0).cloneNode(true);
		var newTableTitleRow = newTable.rows[0];
		var newTableIconsRow = newTable.rows[1];
		var newTableTroopsRow = newTable.rows[2];

		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] BEfor");
		for(var i=1, len=ownTroopsTables.snapshotLength; i<len; i++) {	// table 0 is the cloned one above
			var currentTable = ownTroopsTables.snapshotItem(i);

			// doesn't count on oasis to not double count
			if (currentTable.nodeName == "P") { break; }

			var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);
			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] i "+i+" currentTroopsCells.snapshotLength " + currentTroopsCells.snapshotLength);

			// creates the hero column in case it wasn't in the "totals" table but the hero belongs to this town now
			if (currentTroopsCells.cells.length == 12) {
				// clone the hero icon cell
				var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
				newTableIconsRow.appendChild(currentTroopsHeroIconCell.cloneNode(true));
				// create the hero amount cell (with 0 amount, it will be added as normal)
				var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
				newHeroAmountCell.innerHTML = 0;
				newTableTroopsRow.appendChild(newHeroAmountCell);
			}

			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] adding troops");
			// ADDS UP THE TROOPS
			for(var j=1; j<currentTroopsCells.cells.length; j++) {	// cell 0 has the word "troops"
				newTableTroopsRow.cells[j].innerHTML = parseInt(newTableTroopsRow.cells[j].innerHTML) + parseInt(currentTroopsCells.cells[j].innerHTML);
			}
		}
		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] greying totals");
		// make the totals 0s greyed out and the non-0s non-grayed out
		for(var j=1; j<newTableTroopsRow.cells.length; j++) {	// cell 0 has the word "troops"
			newTableTroopsRow.cells[j].className = (newTableTroopsRow.cells[j].innerHTML == 0) ? "c" : "";
		}
		// change the title row
		var newTableTitleCell = newTableTitleRow.cells[0];
		newTableTitleRow.innerHTML = "";
		newTableTitleRow.appendChild(newTableTitleCell);
		newTableTitleCell.colSpan = 0;
		// remove all and re-insert the 1st 3 rows - removes the upkeep/arrival row
		newTable.innerHTML = "";
		newTable.appendChild(newTableTitleRow);
		newTable.appendChild(newTableIconsRow);
		newTable.appendChild(newTableTroopsRow);
		// add the newly created table with the totals
		var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]').snapshotItem(0);
		paragraph.parentNode.insertBefore(newTable, paragraph.nextSibling);
	}
}



/**
* transformPageRallyPoint_addCoordsForOwnVillageReinfsAway
* Adds coordinates of the villages being reinf'ed - very usefull for oasis among others
*/
function transformPageRallyPoint_addCoordsForOwnVillageReinfsAway() {
	var ownReinfsLinks = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[1]/td[@class="b"]/a[contains(@href, "karte.php?d=")]');
	for(var i=0; i<ownReinfsLinks.snapshotLength; i++) {
		var currentLink = ownReinfsLinks.snapshotItem(i);
		var coordZ = getParamFromUrl(currentLink.href, "d");
		var readableCoords = coordZToXYReadableString(coordZ);
		currentLink.firstChild.innerHTML += " " + "<span class='QPcoords2'>" + readableCoords + "</span>";
	}
}


/**
* transformPageRallyPoint_addLinksForTroopGroups
* Simplifies rally point page by adding links to each troop group (reinfs, troops going, troops away, ...)
*/
function transformPageRallyPoint_addLinksForTroopGroups() {
	var otherTroopGroups = xpathEvaluate('//div[@id="lmid2"]/p[@class="b"]|//div[@id="lmid2"]/p[@class="b f16"]|//div[@id="lmid2"]/div/b');

	var oasisTxt = "";
	var addedLinks = "";

	for(var i=0; i<otherTroopGroups.snapshotLength; i++) {
		var currentGroup = otherTroopGroups.snapshotItem(i);

		if (currentGroup.className == "b f16") {
			// oasis - save the oasis title to prefix the next links
			oasisTxt = currentGroup.textContent + " - ";
			continue;
		}
		if (currentGroup.nodeName == "B") {
			oasisTxt = "";
		}

		addedLinks += '<a href="#'+i+'">' + oasisTxt + currentGroup.textContent + '</a><br/>';
		currentGroup.innerHTML += '<a name="'+i+'" />';
	}

	for(var i=0; i<otherTroopGroups.snapshotLength; i++) {
		var currentGroup = otherTroopGroups.snapshotItem(i);
		if (currentGroup.className == "b f16") {
			continue;	// skip the oasis, put the links in the next description which is still for the oasis
		}
		currentGroup.innerHTML = addedLinks + currentGroup.innerHTML;
	}
}



//===========================================================================================================
//===========================================================================================================
//==============================  Travian Universal Troops Move functions  ==================================
//===========================================================================================================
//===========================================================================================================



/**
* actionPageGeneric_followFirstSendTroopsLink
*/
function actionPageGeneric_followFirstSendTroopsLink() {
	var pageSendTroopsNodeA = getLinksPageSendTroops();
	randomDelay(17, 362, function() {document.location.href = pageSendTroopsNodeA.snapshotItem(0).href});
}



function createUniversalScoutAttack(scoutQtty, scoutIndex, scoutType) {
	var troops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	troops[scoutIndex - 1] = scoutQtty;
	return createUniversalTroopsMove(
		troops[0], troops[1], troops[2], troops[3], troops[4], troops[5], troops[6], troops[7],
		troops[8], troops[9], troops[10], DEF_ATTACKTYPE_RAID, scoutType, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE
	);
}



function createUniversalTroopsMoveXpathIterator(troops, attackType, scoutType, cataTarget1, cataTarget2) {
	return createUniversalTroopsMove(
		troops.snapshotItem(0).value, troops.snapshotItem(1).value, troops.snapshotItem(2).value,
		troops.snapshotItem(3).value, troops.snapshotItem(4).value, troops.snapshotItem(5).value,
		troops.snapshotItem(6).value, troops.snapshotItem(7).value, troops.snapshotItem(8).value,
		troops.snapshotItem(9).value, troops.snapshotItem(10).value,
		attackType, scoutType, cataTarget1, cataTarget2
	);
}


/**
* createUniversalTroopsMove
*/
function createUniversalTroopsMove(troop1, troop2, troop3, troop4, troop5, troop6,
								troopRams, troopCatas, troopSenator, troopSettler, troopHero,
								attackType, scoutType, catapultTarget1, catapultTarget2) {
	// check validity of attackType/scoutType/catapultTargets
	if ((attackType<2) || (attackType>4)) { GM_log("Invalid attack type"); throw "Invalid attack type"; }
	if ((scoutType<1) || (scoutType>2)) { GM_log("Invalid scout type"); throw "Invalid scout type"; }
	checkValidCatapultTarget(catapultTarget1);
	checkValidCatapultTarget(catapultTarget2);

	var arr = [troop1, troop2, troop3, troop4, troop5, troop6, troopRams, troopCatas, troopSenator,
				troopSettler, troopHero, attackType, scoutType, catapultTarget1, catapultTarget2];

	return arrayToXML(arr);
}

function checkValidCatapultTarget(cataTarget) {
	if ((cataTarget<0) ||  (cataTarget>99)) { throw "Invalid catapult target. id: " + cataTarget; }
	if ((cataTarget>30) &&  (cataTarget<37)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
	if ((cataTarget>37) &&  (cataTarget<99)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
}



/**
* savePermanentUniversalTroopsMove
*/
function savePermanentUniversalTroopsMove(destVillageCoordZ, troopsMove) {
	var key = createPermanentKeyForInstantTroopsMove(destVillageCoordZ);
	GM_setValue(key, troopsMove);
	debug(DBG_NORMAL, "[savePermanentUniversalTroopsMove] key " + key + " troopsMove " + troopsMove);
}

/**
* resetPermanentUniversalTroopsMove
*/
function resetPermanentUniversalTroopsMove(destVillageCoordZ) {
	savePermanentUniversalTroopsMove(destVillageCoordZ, "");
}

/**
* loadPermanentUniversalTroopsMove
*/
function loadPermanentUniversalTroopsMove(destVillageCoordZ) {
	var key = createPermanentKeyForInstantTroopsMove(destVillageCoordZ);
	var tmp = GM_getValue(key);
	if (tmp == "") { return null; }
	return xmlToArray(tmp);
}


/**
* createPermanentKeyForInstantTroopsMove
* Creates a key for permanent storing of instant troop moving (includes all attacks and reinfs).
* The key is of this format: <server>_<userId>_<destinationVillageCoordZ>_instantTroopsMove
* @param {int} destinationVillageCoordZ
*/
function createPermanentKeyForInstantTroopsMove(destinationVillageCoordZ) {
	return DEF_PARTKEY_PREFIX +
			destinationVillageCoordZ + DEF_PARTIALPERMANENTMKEY_INSTANTTROOPMOVE;
}



/** isToMoveTroopsToThisVillage */
function isToMoveTroopsToThisVillage() { return isToMoveTroopsToVillage(document.location.href); }
function isToMoveTroopsToVillage(url) {
	debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]start: " + url);
	var coordZ = getCoordZfromHref(url);
	debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]coordZ (from href): " + coordZ);
	if (!coordZ) {
		var coordZ = retrieve_SendTroopsPage_coordZ();
	}
	debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]coordZ: " + coordZ);
	var utm = loadPermanentUniversalTroopsMove(coordZ);
	debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]utm: " + utm);
	if (utm) {
		debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]true");
		return true;
	}
	debug(DBG_NORMAL, "[isToMoveTroopsToThisVillage]false");
	return false;
}




/**
* actionPageSendTroopsConfirmation_universalTroopsMove
*/
function actionPageSendTroopsConfirmation_universalTroopsMove(url) {
	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove]");

	var destVillageCoordZ = getCoordZfromHref(url);
	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove]coordZ");
	var utm = loadPermanentUniversalTroopsMove(destVillageCoordZ);

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] scout ");

	// scout attack
	var scoutAttackRadioInputs = xpathEvaluate('//input[@name="spy"]');
	if (scoutAttackRadioInputs.snapshotLength > 0) {

		xpathEvaluate('//input[@name="spy"][@value="' + utm[DEF_UTM_SCOUTTYPEINDEX] + '"]').snapshotItem(0).checked = true;
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] cata 1");

	// catapult1 attack
	var cataTargetInputs = xpathEvaluate('//select[@name="kata"]');
	if (cataTargetInputs.snapshotLength > 0) {
		cataTargetInputs.snapshotItem(0).value = utm[DEF_UTM_CATATARGET1INDEX];
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] cata 2");

	// catapult2 attack
	var cataTargetInputs = xpathEvaluate('//select[@name="kata2"]');
	if (cataTargetInputs.snapshotLength > 0) {
		debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] utm[DEF_UTM_CATATARGET2INDEX] "+ utm[DEF_UTM_CATATARGET2INDEX]);
		cataTargetInputs.snapshotItem(0).value = utm[DEF_UTM_CATATARGET2INDEX];
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] coordZ "+ destVillageCoordZ);
	resetPermanentUniversalTroopsMove(destVillageCoordZ);

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] pressing OK");
	var okButton = xpathEvaluate('//input[@name="s1"]');
	randomDelay(98, 173, function() {okButton.snapshotItem(0).click()});
}



/**
* actionPageSendTroops_universalTroopsMove
*/
function actionPageSendTroops_universalTroopsMove() {
	debug(DBG_LOW, "[actionPageSendTroops_universalTroopsMove]");

	var destVillageCoordZ = getCoordZfromHref(document.location.href);
	if (!destVillageCoordZ) {
		var destVillageCoordZ = retrieve_SendTroopsPage_coordZ();
	}

	var utm = loadPermanentUniversalTroopsMove(destVillageCoordZ);
	debug(DBG_LOW, "[actionPageSendTroops_universalTroopsMove]destVillageCoordZ "+destVillageCoordZ+" utm "+utm);

	// choose the attack type
	xpathEvaluate('//input[@name="c"][@value="' + utm[DEF_UTM_ATTACKTYPEINDEX] + '"]').snapshotItem(0).checked = true;

	// gets the inputs of the troops (and the village name and coordinates)
	var troopsInputs = xpathEvaluate('//input[@class="fm"]');
	// minus 3 - village name and coordinates inputs
	var troopsInputsLength = troopsInputs.snapshotLength - 3;
	// fills all troops available in the form (including hero if he is present)
	for(var i=0; i<troopsInputsLength; i++) {
		// gets the name of the inputs (t1 to t11)
		var tNumber = parseInt(troopsInputs.snapshotItem(i).name.substr(1));
		// fills in the troops according to the tNumber
		troopsInputs.snapshotItem(i).value = utm[tNumber - 1];
	}

	// presses the ok button
	var okButton = xpathEvaluate('//input[@name="s1"]');

	if (retrieve_SendTroopsPage_areNoTroopsSelected()) {
		debug(DBG_NORMAL, "[actionPageSendTroops_universalTroopsMove] search_SendTroopsPage_areNoTroopsSelected");
//		document.getElementsByTagName('body')[0].addEventListener('unload',	function() {
			debug(DBG_NORMAL, "[actionPageSendTroops_universalTroopsMove] reseting");
			resetPermanentUniversalTroopsMove(destVillageCoordZ);
			debug(DBG_NORMAL, "[actionPageSendTroops_universalTroopsMove] reseted");
//		}, true);
		return false;
	} else {
		debug(DBG_NORMAL, "[actionPageSendTroops_universalTroopsMove] troops selected");
		randomDelay(237, 741, function() {okButton.snapshotItem(0).click()});
		return true;
	}
}



/**
* search_SendTroopsPage_coordZ
*/
function retrieve_SendTroopsPage_coordZ() {
	var coordX = xpathEvaluate('//input[@name="x"]').snapshotItem(0).value;
	var coordY = xpathEvaluate('//input[@name="y"]').snapshotItem(0).value;
	return coordsXYToZ(parseInt(coordX), parseInt(coordY));
}



/**
* search_SendTroopsPage_areNoTroopsSelected
*/
function retrieve_SendTroopsPage_areNoTroopsSelected() {
	var noTroopsSelected = xpathEvaluate('//div[@id="lmid2"]/div[@class="f10 e b"]');
	return noTroopsSelected.snapshotLength > 0;
}




//===========================================================================================================
//===========================================================================================================
//==============================  Travian Replace Coords by Links functions  ================================
//===========================================================================================================
//===========================================================================================================


var DEF_GRAPHIC_PACK_ACTIVE;
var DEF_GRAPHIC_PACK_PREFIX;


function transformPageAllianceForumMsgs_createLinks() {
	getGraphicPackPathPrefix();
	var msgTxtFields = xpathEvaluate('//td[@class = "row11"]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}

function transformPageIGM_createLinks() {
//	var msgTxtFields = xpathEvaluate('//td[@background="img/en/msg/underline.gif"]');
	var msgTxtFields = xpathEvaluate('//td[contains(@background, "/msg/underline.gif")]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}


function getGraphicPackPathPrefix() {
	var woodImgUrl = "img/un/r/1.gif";
	var graph = xpathEvaluate('//img[contains(@src, "img/un/r/1.gif")]');
	if (graph.snapshotLength > 0) {
		var imgSrc = graph.snapshotItem(0).src;
		DEF_GRAPHIC_PACK_ACTIVE = imgSrc.length > woodImgUrl.length;
		DEF_GRAPHIC_PACK_PREFIX = imgSrc.replace(woodImgUrl, "").replace("///", "//");
	}
}

function transformGeneric_replaceUriByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/\w+:\/\/[^\s<]+/g, replaceUriByLink);
	txtNode.innerHTML = res;
}
function replaceUriByLink(match) {
	if (DEF_GRAPHIC_PACK_ACTIVE) {
		if (match.indexOf(DEF_GRAPHIC_PACK_PREFIX) > -1) {
			return match;
		}
	}
	return "<a href='" + match + "'>" + match + "</a>";
}



function transformGeneric_replaceAllCoordsByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/-?\d+\|-?\d+/g, replaceCoordsByLink);
	txtNode.innerHTML = res;
}


function replaceCoordsByLink(match) {
	var arrMatch = match.split("|", 2);
	var coord = coordsXYToZ(parseInt(arrMatch[0]), parseInt(arrMatch[1]));
	return "<a href='karte.php?z=" + coord + "'>" + match + "</a>";
}


//===========================================================================================================
//===========================================================================================================
//==========================================  Travian URL functions  ========================================
//===========================================================================================================
//===========================================================================================================





/** isThisPageTravianTeamMessagePage */
function isThisPageTravianTeamMessagePage() {
	//http://speed.travian.com/dorf1.php?ok
	var msgOk = xpathEvaluate('//a[contains(@href, "?ok")]');
	return (msgOk.snapshotLength > 0);
}


/** isThisPageTravianTeamMessagePage_ConstructionPlans */
function isThisPageTravianTeamMessagePage_ConstructionPlans() {
	// UNTESTED - this is hard to test since it only happens once per round
	if (isThisPageTravianTeamMessagePage()) {
		// the image also contained: style="float: right; padding-left: 10px;"
		var treasuryImage = xpathEvaluate('//div[@id="lmid2"]/img[contains(@src, "gid27.gif")]');
		return (treasuryImage.snapshotLength > 0);
	}
	return false;
}



// ========================================================
// =====   Travian URL functions - Village Pages      =====
// ========================================================

/** Is the page a page of a village in the map */
function isThisPageVillage() { return isPageVillage(document.location.href); }
function isPageVillage(url) { return ( (url.search(/karte\.php\?d=/) != -1) || (url.search(/karte\.php\?.+\&d=/) != -1) ); }

var DEF_VILLAGETYPE_OWNEDVILLAGE = 1;
var DEF_VILLAGETYPE_OWNEDOASIS = 2;
var DEF_VILLAGETYPE_UNCLAIMEDVILLAGE = 3;
var DEF_VILLAGETYPE_UNCLAIMEDOASIS = 4;

var DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C = 5;	// f1
var DEF_VILLAGETYPE_VILLAGE_3W_4C_5I_6C = 6;	// f2
var DEF_VILLAGETYPE_VILLAGE_4W_4C_4I_6C = 7;	// f3
var DEF_VILLAGETYPE_VILLAGE_4W_5C_3I_6C = 8;	// f4
var DEF_VILLAGETYPE_VILLAGE_5W_3C_4I_6C = 9;	// f5
var DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C = 10;	// f6

var DEF_VILLAGETYPE_VILLAGE_CROPPER_9 = DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C;	// f1
var DEF_VILLAGETYPE_VILLAGE_CROPPER_15 = DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C;	// f6

/** What type of village page is this (occupied village, unclaimed village, occupied oasis, unclaimed oasis) */
function isThisPageVillage_UnclaimedOasis() {	return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_UNCLAIMEDOASIS); }
function isThisPageVillage_UnclaimedVillage() { return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_UNCLAIMEDVILLAGE); }
function isThisPageVillage_OwnedOasis() {		return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_OWNEDOASIS); }
function isThisPageVillage_OwnedVillage() {		return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_OWNEDVILLAGE); }
function isThisPageVillage_WhatType() {
	debug(DBG_NORMAL, "[isThisPageVillage_WhatType]");
	if (isThisPageVillage()) {
	debug(DBG_NORMAL, "[isThisPageVillage_WhatType] is this page village...");
		var mapDetailsRight = xpathEvaluate('//div[@id="lmid2"]/div[@class="map_details_right"]').snapshotItem(0);
		if (mapDetailsRight.id == "pr") {
			// unclaimed territory -> abandoned oasis / abandoned valley
			var resources = xpathEvaluateInContext(mapDetailsRight, 'table/tbody/tr/td/img[@class="res"]');
			if (resources.snapshotLength == 4) {
				// how many resources of each type there are
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_UNCLAIMEDVILLAGE " + DEF_VILLAGETYPE_UNCLAIMEDVILLAGE);
				return DEF_VILLAGETYPE_UNCLAIMEDVILLAGE;
			} else {
				// no resources means it is an oasis (with or without troops)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_UNCLAIMEDOASIS " + DEF_VILLAGETYPE_UNCLAIMEDOASIS);
				return DEF_VILLAGETYPE_UNCLAIMEDOASIS;
			}
		} else {
			// claimed territory -> someone's village / someone's oasis
			var lastRow = xpathEvaluateInContext(mapDetailsRight, 'table/tbody/tr[last()]/td[last()]/a');
			if (lastRow.snapshotLength == 1) {
				// last row of the table has a link (oasis links to the village)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_OWNEDOASIS " + DEF_VILLAGETYPE_OWNEDOASIS);
				return DEF_VILLAGETYPE_OWNEDOASIS;
			} else {
				// last row of the table has no links (village has the population in the last row)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_OWNEDVILLAGE " + DEF_VILLAGETYPE_OWNEDVILLAGE);
				return DEF_VILLAGETYPE_OWNEDVILLAGE;
			}
		}
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Dorf Pages         =====
// ========================================================

/** Is the page a dorf3 page */
function isThisPageDorf3() { return (isPageDorf3(document.location.href)); }
function isPageDorf3(url) { return (url.search(/dorf3\.php/) != -1); }


/** Is the page a dorf1 page */
function isThisPageDorf1() { return (isPageDorf1(document.location.href)); }
function isPageDorf1(url) { return (url.search(/dorf1\.php/) != -1); }


/** Is the page a dorf2 page */
function isThisPageDorf2() {
	var url = document.location.href;
	if (url.search(/dorf2\.php/) != -1) { return true; }
	return isThisPageDorf2AlthoughTheLocationIsABuilding();
}
// In case of town switch when was inside a building that doesn't exist in the newly selected town
function isThisPageDorf2AlthoughTheLocationIsABuilding() {
	var url = document.location.href;
	if (url.search(/build\.php/) != -1) {
		var maps = xpathEvaluate('//map[contains(@name, "map")]');
		return (maps.snapshotLength == 2);
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Statistics Pages   =====
// ========================================================


/** Is the page of any Statistics page */
function isThisPageAnyStatisticsPage() { return (isPageAnyStatisticsPage(document.location.href)); }
function isPageAnyStatisticsPage(url) { return (url.search(/statistiken\.php/) != -1); }


/** Is the page of Wonder of the World Statistics */
function isThisPageWWStatistics() { return (isPageWWStatistics(document.location.href)); }
function isPageWWStatistics(url) {
	if (isPageAnyStatisticsPage(url)) {
		return (getParamFromUrl(url, "id") == 6);
	}
	return false;
}



// ========================================================
// =====   Travian URL functions - Building Pages     =====
// ========================================================

/** Is the page any building page */
function isThisPageAnyBuildingPage() { return (isPageAnyBuildingPage(document.location.href)); }
function isPageAnyBuildingPage(url) {
	if (url.search(/build\.php/) != -1) {	// may be building, but may be dorf2
		return (!isThisPageDorf2AlthoughTheLocationIsABuilding());
	}
	return false;
}


/** Is this page any Residence or Palace page */
function isThisPageAnyResidencePalacePage() {
	if (isThisPageAnyBuildingPage()) {
		var links = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a[contains(@href, "build.php?id=")][contains(@href, "&s=")]');
		if (links.snapshotLength > 2) {
			return true;
		}
	}
	return false;
}


/** Is this a Residence or Palace Culture Points page */
function isThisPageResidencePalaceCulturePointsPage() {
	if (isThisPageAnyResidencePalacePage()) {
		return (document.location.href.indexOf("&s=2") >= 0);
	}
	return false;
}


/** Is this the page of a Treasury */
function isThisPageTreasuryPage() {
	if (isThisPageAnyBuildingPage()) {
		var textBelowBuildingNameAndLevel = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]');
		if (textBelowBuildingNameAndLevel.snapshotItem(0).textContent.indexOf("10") >= 0) {
			return true;
		}
	}
	return false;
}


/** Is the page of Hero's Mansion */
function isThisPageHeroMansionPage() {
	if (isThisPageAnyBuildingPage()) {
		var heroNameSpan = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]');
		return (heroNameSpan.snapshotLength == 1);
	}
	return false;
}


/** Is any page of the market place */
function isThisPageAnyMarketPage() {
	if (isThisPageAnyBuildingPage()) {
		var linksMyProfilePage = xpathEvaluate('//div[@id="lmid2"]/p/a[contains(@href, "&t=")]');
		return (linksMyProfilePage.snapshotLength > 0);
	}
	return false;
}


/** Is the page of the market place to send resources */
function isThisPageMarketSend() {
	if (isThisPageAnyMarketPage()) {
		var tParam = getParamFromUrl(document.location.href, "t");
		if (!tParam) {
			var destinationPlayerLink = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr[@class="left"]/td/a[contains(@href, "uid")]');
			return (destinationPlayerLink.snapshotLength == 0);
		}
	}
	return false;
}


/** Is the page of the market place to confirm the send resources */
function isThisPageMarketSendConfirmation(isToSelf) {
	if (isThisPageAnyMarketPage()) {
		var userId = getUserId();
		var destinationPlayerLink = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr[@class="left"]/td/a[contains(@href, "uid")]');
		if (destinationPlayerLink.snapshotLength > 0) {	// is MarketPlaceSendResourcesConfirmation page
			if (isToSelf) {
				var destinationUid = getParamFromUrl(destinationPlayerLink.snapshotItem(0).href, "uid");
				return (userId == destinationUid);
			} else {	// since destination doesn't need to be self - it is MarketPlaceSendResourcesConfirmation
				return true;
			}
		}
	}
	return false;
}



/** Is the page of the market place to buy resources */
function isThisPageMarketBuy() {
	if (isThisPageAnyMarketPage()) {
		return (getParamFromUrl(document.location.href, "t") == 1);
	}
	return false;
}


/** Is the page of the Rally Point */
function isThisPageRallyPoint() { return (isPageRallyPoint(document.location.href)); }
function isPageRallyPoint(url) {
	if (getParamFromUrl(url, "id") == 39) { return true; }
	if (getParamFromUrl(url, "gid") == 16) { return true; }

	// check for the 3 links of the rally point (Overview | Send troops | Combat-Simulator)
	var rallyPointLinks = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a');
	if (rallyPointLinks.snapshotLength > 2) {
		if (rallyPointLinks.snapshotItem(0).href.indexOf("/build.php?id=39") < 0) { return false; }
		if (rallyPointLinks.snapshotItem(1).href.indexOf("/a2b.php") < 0) { return false; }
		if (rallyPointLinks.snapshotItem(2).href.indexOf("/warsim.php") < 0) { return false; }
		// all 3 links above were found
		return true;
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Profile Pages      =====
// ========================================================

/** Is the page a profile page */
function isThisPageProfile() { return (isPageProfile(document.location.href)); }
function isPageProfile(url) { return (url.search(/spieler\.php\?uid=/) != -1); }

/** Is this page my profile page */
function isThisPageMyProfile() {
	if (isThisPageProfile()) {
		var linksMyProfilePage = xpathEvaluate('//a[contains(@href, "spieler.php?s=")]');
		return (linksMyProfilePage.snapshotLength > 0);
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - IGM Pages          =====
// ========================================================

/** Is the page any IGM page (IGM or IGM List) */
function isThisPageAnyIGMPage() { return (isPageAnyIGMPage(document.location.href)); }
function isPageAnyIGMPage(url) { return (url.search(/nachrichten\.php/) != -1); }

/** Is the page a single IGM page */
function isThisPageIGM() { return (isPageIGM(document.location.href)); }
function isPageIGM(url) { return ( (url.search(/nachrichten\.php\?id=/) != -1) || (url.search(/nachrichten\.php\?.+\&id=/) != -1) ); }

/** Is the page the IGM list page */
function isThisPageIGMList() { return (isPageIGMList(document.location.href)); }
function isPageIGMList(url) {
	if (isPageAnyIGMPage(url)) {
		var idParam = getParamFromUrl(url, "id");
		if (!idParam) {
			var tableIGMs = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]');
			if (tableIGMs.snapshotLength > 0) {
				return true;
			}
		}
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Report Pages       =====
// ========================================================

/** Is the page any report page (any report or any report List) */
function isThisPageAnyReportPage() { return (isPageAnyReportPage(document.location.href)); }
function isPageAnyReportPage(url) { return (url.search(/berichte\.php/) != -1); }


/** Is the page any report list page */
function isThisPageAnyReportList() { return (isPageAnyReportList(document.location.href)); }
function isPageAnyReportList(url) {
	if (isPageAnyReportPage(url)) { return (!getParamFromUrl(url, "id")); }
	return false;
}


/** Is the page a trade report list page */
function isThisPageReportListTrade() { return (isPageReportListTrade(document.location.href)); }
function isPageReportListTrade(url) {
	if (isPageAnyReportList(url)) { return (getParamFromUrl(url, "t") == 2); }
	return false;
}


/** Is the page a single report page */
function isThisPageReport() { return (isPageReport(document.location.href)); }
function isPageReport(url) { return ( (url.search(/berichte\.php\?id=/) != -1) || (url.search(/berichte\.php\?.+\&id=/) != -1) ); }


/** Is the page a single attack report page */
function isThisPageReportAttack() { return (isPageReportAttack(document.location.href)); }
function isPageReportAttack(url) {
	if (isPageReport(url)) {
		var unitImgs = xpathEvaluate('//img[contains(@src, "img/un/u/")]');
		return (unitImgs.snapshotLength > 11);	// 10 units min for attacker and same for defender
	} else {
		return false;
	}
}


/** Is the page a single scout report page */
function isThisPageReportAttackScout() { return (isPageReportAttackScout(document.location.href)); }
function isPageReportAttackScout(url) {
	if (isPageReportAttack(url)) {
		var tribe = getTribeBySettlerTroopsInAnyPage(0);
		var attackUnitsQtty = xpathEvaluate(
			'//table[@class = "tbg"][position() = 1]/tbody/tr[@class = "cbg1"]/../tr[position() = 3]/td');

		// Starts at 1 to skip the cell that says "Troops"
		for(var i=1; i<attackUnitsQtty.snapshotLength; i++) {
			if (attackUnitsQtty.snapshotItem(i).className != "c") {
				// then it has some troops, check if it is the right index (depends on tribe)
				if (scoutTroopIndex[tribe] != i) {
					return false;
				}
			}
		}
		return true;	// all troops sent are scouts
	} else {
		return false;
	}
}


/** Is the page a single reinforcement report page */
function isThisPageReportReinf() {
	if (isPageReport(document.location.href)) {
		var unitImgs = xpathEvaluate('//img[contains(@src, "img/un/u/")]');
		return (unitImgs.snapshotLength <= 11);	// 11 units max, otherwise there is attacker and defender
	} else {
		return false;
	}
}




// ========================================================
// =====   Travian URL functions - Alliance Pages     =====
// ========================================================

/** Is the page any report page (any report or any report List) */
function isThisPageAnyAlliancePage() { return (isPageAnyAlliancePage(document.location.href)); }
function isPageAnyAlliancePage(url) { return (url.search(/allianz\.php/) != -1); }


/** Is the page an ingame alliance forum page */
function isThisPageAllianceForumMsgs() { return (isPageAllianceForumMsgs(document.location.href)); }
function isPageAllianceForumMsgs(url) {
	if (url.indexOf("/allianz.php?s=2&t=") != -1) {
		return true;
	}
}

// ========================================================
// =====   Travian URL functions - Send Troop Pages   =====
// ========================================================

/** Is the page any send troops page (send without target, send with target, confirm send) */
function isThisPageAnySendTroopsPage() { return (isPageAnySendTroopsPage(document.location.href)); }
function isPageAnySendTroopsPage(url) { return (url.search(/a2b\.php/) != -1); }


/** Is the page a send troops page (send without target, send with target) */
function isThisPageSendTroops() {
	var url = document.location.href;
	if (isPageAnySendTroopsPage(url) != -1) {
		var troopsInputs = xpathEvaluate('//input[@class = "fm"]');
		return (troopsInputs.snapshotLength >= 13);	// 10 troops + 3 village (1name+2coords)
	}
}

/** Is the page a send troops confirmation page */
function isThisPageSendTroopsConfirmation() {
	var url = document.location.href;
	if (url.search(/\/a2b\.php$/) != -1) {
		return xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td[@class="s7"]/a[contains(@href, "spieler.php?uid=")]').snapshotLength == 1;
	}
	return false;
}








/**
* isPageLogout
*/
function isPageLogout(url) {
	if (stringEndsWith(url, "/logout.php")) {
		return true;
	}
}





/**
* getLinksPageVillage
* @return NodeList with the links to village pages.
*/
function getLinksPageVillage() {
	//html > body > div #lmidall > div #lright1 > table .f10 > tbody > tr > td > a > img
//	var links = xpathEvaluate('//div[@id="lright1"]/table[@class="f10"][1]/tbody/tr/td/a[contains(@href, "karte.php?d=")]');
	var links = xpathEvaluate('//a[contains(@href, "karte.php?d=")]');
//	var links = xpathEvaluate('//a[contains(@href, "karte.php?d=")]/../../../../../di');
	for(var index=0; index<links.snapshotLength; index++) {
		debug(DBG_LOWEST, "[getLinksPageVillage] villages: " + links.snapshotItem(index).href);
	}
	return links;
}

/**
* getLinkPageVillage
* @return Node of a link to a village page.
*/
function getLinkLastPageVillage() {
	var links = getLinksPageVillage();
	if (links.snapshotLength > 0) {
		return links.snapshotItem(links.snapshotLength - 1);
	}
	return null;
}

/**
* getLinksPageSendTroops
* @return NodeList with the links to send troops pages.
*/
function getLinksPageSendTroops() {
	var links = xpathEvaluate('//a[contains(@href, "a2b.php?z=")]');
	for(var index=0; index<links.snapshotLength; index++) {
		debug(DBG_LOWEST, "[getLinksPageSendTroops] users: " + links.snapshotItem(index).href);
	}
	return links;
}





var DEF_RES_WOOD = 1;
var DEF_RES_CLAY = 2;
var DEF_RES_IRON = 3;
var DEF_RES_CROP = 4;

// villageTypeF, id
DEF_RESOURCETYPE_IN_VILLAGE = new Array();
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C - 4] = [DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_3W_4C_5I_6C - 4] = [DEF_RES_IRON, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_4W_4C_4I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_4W_5C_3I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_5W_3C_4I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_WOOD, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C - 4] = [DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_CROP, DEF_RES_CROP];


/**
* getResourceTypeFromVillageTypeAndPosition
*/
function getResourceTypeFromVillageTypeAndPosition(villageTypeF, id) {
	var villageTypeNumber = parseInt(villageTypeF.substr(1));
	return DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber][id];
}

/**
* searchResourcePositionFromType
*/
function searchResourcePositionFromType(villageTypeNumber, resourceType) {
	for(var i=0, len=DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber].length; i<len; i++) {
		if (DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber][i] == resourceType) {
			return i;
		}
	}
	return -1;	// if this happens something is wrong with the code
}



//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Coordinates functions  ===================================
//===========================================================================================================
//===========================================================================================================



/**
* coordsXYToZ
*
* @param {int} x The X coordinate of a map location.
* @param {int} y The Y coordinate of a map location.
*
* @return The absolute coordinate of a town / abandoned valley / oasis.
*/
function coordsXYToZ(x, y) {
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}


/**
* coordZToX
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The X coordinate of the map location indicated by Z.
*/
function coordZToX(z) {
	var x = ((z - 1) % 801) - 400;
	return x;
}


/**
* coordZToY
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The Y coordinate of the map location indicated by Z.
*/
function coordZToY(z) {
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}


/**
* coordZToXYReadableString
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return A string containing the normal in-game readable coordinates: "(X|Y)".
*/
function coordZToXYReadableString(z) {
	res = "(" + coordZToX(z) + "|" + coordZToY(z) + ")";
	return res;
}

/**
* globeDistance - indicates the minimum distance between 2 X coordinates or 2 Y coordinates
* taking into account the fact that -400 and 400 are next to each other
*/
function globeDistance(a, b) {
	var dist1 = (a > b) ? Math.abs(a-b) : Math.abs(b-a);
	var dist2 = (a > b) ? (Math.abs(400-a)+Math.abs(-400-b)) : (Math.abs(400-b)+Math.abs(-400-a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;

	return distFinal;
}


/**
* coordDistXYtoXY - calculates the distance between 2 villages in the map
*/
function coordDistXYtoXY(x1, y1, x2, y2) {
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX*distX) + (distY*distY));
//	debug(DBG_LOW, "[coordDistXYtoXY] x1 "+x1+" y1 "+y1+" x2 "+x2+" y2 "+y2+" distX "+distX+" distY "+distY+" dist "+dist);

	return dist;
}





//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Generic functions  =======================================
//===========================================================================================================
//===========================================================================================================


/**
* getActiveTownLink
*/
function getActiveTownLink() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	return activeVillageLink.snapshotItem(0);
}


/**
* getActiveVillageNameAndCoords
*/
function getActiveVillageNameAndCoords() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	var activeVillageCoords = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var txt = activeVillageLink.snapshotItem(0).innerHTML + " " +
				activeVillageCoords.snapshotItem(0).innerHTML +
				activeVillageCoords.snapshotItem(1).innerHTML +
				activeVillageCoords.snapshotItem(2).innerHTML;
	return txt;
}


/**
* getActiveTownId
*/
function getActiveTownId() {
	var activeTownLink = getActiveTownLink();
	return getParamFromUrl(activeTownLink.href, "newdid");
}



/**
* isVillageListPresent
*/
function isVillageListPresent() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	return (activeVillageLink.snapshotLength > 0);
}





/**
* getActiveVillageCoordZ
*/
function getActiveVillageCoordZ() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var coordXCurrentActiveVillage = -10000;
	var coordYCurrentActiveVillage = -10000;
	if (activeVillageLink.snapshotLength > 0) {
		coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
		coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
	}
	return coordsXYToZ(coordXCurrentActiveVillage, coordYCurrentActiveVillage);
}


/**
* createRightSideVillagesList
* To create the village list in case there is none (1 village accounts).
* Since there are no more villages it is pointless to change village so "newdid" is omitted,
* and the link is to the page where you already are. newdid could be obtained from dorf3 page.
*/
function createRightSideVillagesList(newdid, villageName, coordX, coordY) {
	var DEF_CHAR_SELECTEDVILLAGEBULLET = unescape('%u2022');
	var rightSideVillageList = document.createElement('div');
	rightSideVillageList.id = "lright1";
	rightSideVillageList.innerHTML = '<a href="dorf3.php"><span class="f10 c0 s7 b">Villages:</span></a>' +
	'<table class="f10"><tbody><tr>' +
		'<td class="nbr"><span class="c2">'+DEF_CHAR_SELECTEDVILLAGEBULLET+'</span>&nbsp; <a href="?newdid='+newdid+'" class="active_vl">'+villageName+'</a></td>' +
		'<td class="right"><table class="dtbl" cellpadding="0" cellspacing="0"><tbody><tr>' +
			'<td class="right dlist1">('+coordX+'</td><td class="center dlist2">|</td><td class="left dlist3">'+coordY+')</td>' +
			'</tr></tbody></table>' +
		'</td>' +
		'</tr></tbody>' +
	'</table>';
	return rightSideVillageList;
}







//===========================================================================================================
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
//===========================================================================================================


/** Gets the time in miliseconds */
function QPcurrentTimeMilis() { return new Date().getTime(); }

/** Gets the time in seconds */
function QPcurrentTimeSecs() { return Math.round(QPcurrentTimeMilis()/1000); }



/**
* QPTimersUpdate - Updates the timers.
*/
function QPTimersUpdate() {
//	debug(DBG_LOWEST, "[QPtimerUpdater]");
/*	for(i in m){
		//Calculates the "offset" of the time in the page now and the page when it was loaded... in seconds!!
		o = QPcurrentTimeSecs() - V;
		// stringifies the time PLUS the offset to create the new time
		U = timeInSecondsToColonSeparatedTxt(m[i].D + o);
		// updates the server time
		m[i].ad.innerHTML = U;
	}*/
	for (i in l) {
//		debug(DBG_LOWEST, "[QPtimerUpdater] [for] i " + i);
		//Calculates the "offset" of the time in the page now and the page when it was loaded... in seconds!!
		offsetInSecs = QPcurrentTimeSecs() - V;

		if (l[i].D == DEF_CHAR_INFINITY) { continue; }

		// gets the time of this timer MINUS the offset to create the new time
		ae = l[i].D - offsetInSecs;

		if (ae <= 0) { continue; }	// don't update below 0
		// should change class - style

/*		// O starts at 0, and changes to 1 when the timer reaches 0 to reload the page
		if ((O == 0) && (ae < 1)) {
			O = 1;
			setTimeout("document.location.reload()", 1000);
		} else {}
*/		// stringifies the newly calculated time
		U = timeInSecondsToColonSeparatedTxt(ae);

		// updates the HTML with the new time
		l[i].ad.innerHTML = U;
	}
	// calls back this function in 1 seconds
//	debug(DBG_LOWEST, "[QPtimerUpdater] O " + O);
	if (O == 0) {
		window.setTimeout(QPTimersUpdate, 1000);
	}
}



/**
* Searches for QP timers;
* Creates a struct for each one with: the HTML element found and the time in seconds of the timer
* Calls QPTimersUpdate (which processes each of these timers...)
*/
function QPTimersCollect() {
	debug(DBG_LOWEST, "[QPtimersStartup]");

	c = xpathEvaluate('//*[@id = "QPtimer"]');
	debug(DBG_LOWEST, "[QPtimersStartup] c.snapshotLength " + c.snapshotLength);

	for(i = 0; i < c.snapshotLength; i++) {
		var currentQpTimer = c.snapshotItem(i);
		var currentQpTimerContents = currentQpTimer.innerHTML;
		debug(DBG_LOWEST, "[QPtimersStartup] currentQpTimer " + currentQpTimer);
		debug(DBG_LOWEST, "[QPtimersStartup] currentQpTimerContents [" + currentQpTimerContents+"]");
		l[i] = new Object();
		l[i].ad = currentQpTimer;
		l[i].D = ((currentQpTimerContents == DEF_CHAR_INFINITY)
						? DEF_CHAR_INFINITY
						: timeColonSeparatedToValue(currentQpTimerContents));
	}
//	QPtimerUpdater();
}




//===========================================================================================================
//===========================================================================================================
//================================  Generic Permanent Save/Load functions  ==================================
//===========================================================================================================
//===========================================================================================================



/**
* GM_EscapeAndSave
* @param {string} key
* @param {string} value
*/
function GM_EscapeAndSave(key, value) {
	debug(DBG_LOW, "[GM_EscapeAndSave] key " + key + " txt " + value);
	GM_setValue(key, escape(value));
}

/**
* GM_LoadAndUnescape
* @param {string} key
* @return {string} value
*/
function GM_LoadAndUnescape(key) {
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}



//===========================================================================================================
//===========================================================================================================
//=======================================  Generic time functions  ==========================================
//===========================================================================================================
//===========================================================================================================



/**
* timeInSecondsToColonSeparatedTxt
* Transforms a time in seconds to the string with the following format hh:mm:ss .
*/
function timeInSecondsToColonSeparatedTxtWithDays(secs) {
	var d = Math.floor((secs/86400));
	var h = Math.floor((secs%86400)/3600);
	var m = Math.floor((secs%3600)/60);
	var s = Math.floor((secs%60));
	return time4ToText(d, h, m, s);
}

/**
* time4ToText
* Transforms a time from the days, hour, minutes and seconds to a single text string in the following format: d,hh:mm:ss.
*/
function time4ToText(d, h, m, s) {
debug(DBG_HIGHEST, "[time4ToText] "
	 + " d " + d
	 + " h " + h
	 + " m " + m
	 + " s " + s
	);

	var txtTime = "";
	if (d!=0) {	// Days comma space 0_if_Hours_is_less_than_10
		txtTime += d + ", " + ((h<10)?"0":"");
	}
	txtTime += time3ToText(h, m, s);
	return txtTime;
}

/** timeDaysToSeconds - transforms*/
function timeDaysToSeconds(d) {	return (parseInt(d * 86400)); }

/**
* timeInSecondsToColonSeparatedTxt
* Transforms a time in seconds to the string with the following format hh:mm:ss .
*/
function timeInSecondsToColonSeparatedTxt(secs) {
	var h = Math.floor(secs/3600);
	var m = Math.floor((secs%3600)/60);
	var s = Math.floor((secs%60));
	return time3ToText(h, m, s);
}


/**
* time3ToText
* Transforms a time from the hour, minutes and seconds to a single text string in the following format: hh:mm:ss.
*/
function time3ToText(h, m, s) {
	var txtTime = "" + (h) + ":" + ((m < 10)?("0"+m):m) + ":" + ((s < 10)?("0"+s):s);
//	var txtTime = "" + ((h < 10)?("0"+h):h) + ":" + ((m < 10)?("0"+m):m) + ":" + ((s < 10)?("0"+s):s);
	return txtTime;
}


/**
* timeColonSeparatedToValue
* Transforms a time from the format hh:mm:ss to a single value in seconds.
*/
function timeColonSeparatedToValue(txt) { var t = txt.split(":"); return time3ToValue(t[0], t[1], t[2]); }


/**
* time3ToValue
* Transforms a time from the hour, minutes and seconds to a single value in seconds.
*/
function time3ToValue(h, m, s) { var v = (3600 * parseInt(h)) + (60 * parseInt(m)) + (1 * parseInt(s)); return v; }





//===========================================================================================================
//===========================================================================================================
//==============================  Extended GreaseMonkey Get / Set functions  ================================
//===========================================================================================================
//===========================================================================================================




function GM_QP_getValue(key) {
	var val = GM_getValue(key);
	return (val == undefined) ? false : val;
}


//===========================================================================================================
//===========================================================================================================
//=======================================  Generic helper functions  ========================================
//===========================================================================================================
//===========================================================================================================


/**
* removeAllTags
* Removes all tags, to allow getting similar to what a user copy-paste would get.
*/
function removeAllTags(txt) {
	var strTagStrippedText = txt.replace(/<\/?[^>]+(>|$)/g, "");
	return strTagStrippedText;
}


/**
* dropDownListCreateNumericOptions
* Creates a numeric drop down list from (including) start to (excluding) end.
*/
function dropDownListCreateNumericOptions(start, end) {
	var res = "";
	for(var i=start; i<end; i++) {
		res += '<option value="' + i + '">' + i + '</option>';
	}
	return res;
}



/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}



/**
* arrayToXML
* @param {Array of primitive types} arr
*/
function arrayToXML(arr) {
	var res = "<array>";
	if (arr) {
		for(var i=0; i<arr.length; i++) {
			res += "<arrayNode>" + arr[i] + "</arrayNode>";
		}
	}
	res += "</array>";

	return res;
}

/**
* xmlToArray - converts the XML string to an array of values
* @param {xml string} xmlString A string of XML nodes with a depth of 2 (1 container + 1 repeatable list of nodes)
*								like this: <globalContainer><node></node>...<node></node></globalContainer>
*/
function xmlToArray(xmlString) {

	if (xmlString) {
		if (window.ActiveXObject) { // code for IE

			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(xmlString);

		} else { // code for Mozilla, Firefox, Opera, etc.

			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlString,"text/xml");
		}
		var x = doc.documentElement;

		var res = new Array();
		for(var i=0; i<x.childNodes.length; i++) {
			if (x.childNodes[i].childNodes.length == 0) {
				res.push("");
			} else {
				for(var j=0; j<x.childNodes[i].childNodes.length; j++) {
//					debug(DBG_LOWEST, "[xmlToArray] i["+i+"] j["+j+"] " + x.childNodes[i].childNodes[j].nodeValue);
					res.push(x.childNodes[i].childNodes[j].nodeValue);
				}
			}
		}
		return res;
	} else {
		return null;
	}
}



/**
* stringEndsWith - true if the other string is the final part of the original string (or if both don't exist)
*/
function stringEndsWith(original, other) {
	if (!original && ! other) { // none exists = true
		return true;
	}

	if (original && other) { // both exist check...
		var pos = original.indexOf(other);
		if ((pos + other.length) == original.length) { // pos of other string + it's size == original's string = true
			return true;
		} else { // "other" may or may not exist in "original", but not at the end
			return false;
		}
	} else { // only one exists = false
		return false;
	}
}



/**
* Toggles printing debug info.
* @param {int} verbosity Integer to indicate if a debug message should really be printed or not (like a priority).
* @param {String} txt The text to be printed.
*/
function debug(verbosity, txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: if (verbosity <= DEBUG_VERBOSITY) { GM_log(txt); } break;
 		default: break;
 	}
}

/** dbg - calls debug with highest verbosity */
function dbg(txt) { debug(DBG_HIGHEST, txt); }




/**
* Toggles printing debug info.
* @param {String} txt The text to be printed.
*/
function debugOLD(txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: GM_log(" ### DEPRECATED DEBUG MESSAGE ### " + txt); break;
 		default: break;
 	}
}


/**
* randomDelay
* @param {int} min
*/
function randomDelay(min, max, callMethod) {
	var rnd = random(min, max);
	debug(DBG_LOWEST, "[TQS][randomDelay] delaying: " + rnd);
	window.setTimeout(function() {callMethod()}, rnd);
}


/**
* randomDelay
* @param {int} min
*/
function random(min, max) {
	var range = max - min + 1;
    var ranNum = Math.floor(Math.random() * range) + min;
    return ranNum;
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {Node} context Node from where to search.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}




//###############################    CONFIGURATIONS     ########################################

// ##########   FAKE ATTACK CONFIGS   ##########
// creates some fakes types to be used below
var __CONFIG_FAKE_ATTACK_LEGG_PHALX_CLUB = 				createUniversalTroopsMove(1,0,0,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_PRAET_SWORD_PIKE = 			createUniversalTroopsMove(0,1,0,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_IMP_GAULSCOUT_AXE = 			createUniversalTroopsMove(0,0,1,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_SCOUT_THUNDER_SCOUT = 			createUniversalTroopsMove(0,0,0,1,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_EQIMPS_DRUID_PALADIN = 		createUniversalTroopsMove(0,0,0,0,1,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_EQCAESAR_HAEDUAN_TEUTONKNIGHT =createUniversalTroopsMove(0,0,0,0,0,1,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_RAM = 							createUniversalTroopsMove(0,0,0,0,0,0,1,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_CATA = 						createUniversalTroopsMove(0,0,0,0,0,0,0,1,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_RANDOM, DEF_CATATARGET_NONE);
// configures the fake attack
var CONFIG_FAKE_ATTACK = __CONFIG_FAKE_ATTACK_PRAET_SWORD_PIKE;

// ##########   SCOUT ATTACK CONFIGS   ##########
var CONFIG_SCOUT_QTTY = 1;
var CONFIG_SCOUT_TYPE = DEF_SCOUTTYPE_RESOURCES;

// ##########   Resource info and counters - true = enables this; false = disables it   ##########
var CONFIG_FEATURE_RESOURCES_INFO = true;

// ##########   Village Targets - true = enables this; false = disables it   ##########
var CONFIG_FEATURE_VILLAGE_TARGETS = true;

// ##########   Title Fix - options 1 to 3 all append the title of current page, any other disables this   ##########
// 1 - Keeps original title and adds the title inside the page
// 2 - Crops original title and adds the title inside the page (eg.: "Travian comx" -> "T com9")
// 3 - Removes original title and adds the title inside the page

var CONFIG_TITLEFIX = 2;


// ##########   Village Targets - true = enables this; false = disables it   ##########
var DEF_TRAVIAN_SERVER_TYPE_2 = 1;
var DEF_TRAVIAN_SERVER_TYPE_3 = 2;
var DEF_TRAVIAN_SERVER_TYPE_SPEED = 3;
var CONFIG_TRAVIAN_SERVER_TYPE = DEF_TRAVIAN_SERVER_TYPE_SPEED;


//#################################################################################################


main();


},false);



