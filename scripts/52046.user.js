// ==UserScript==
// @name		Legends of Zork Helper
// @author		CalvinN
// @version		2.0.3
// @namespace		http://userscripts.org/users/95897
// @description		This script helps in Legends of Zork. It creates alot new functions and makes the LOZ life easier.
// @include		http://legendsofzork.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// Script version
var lozVersion = "2.0.3";

// Globally used variables
var myCharacterData;
var longVersion = false;
var el;

// Stance Indicators
var leftArrowImage = '/images/lightview/blank.gif';
var rightArrowImage = '/images/lightview/blank.gif';
var upArrowImage = '/images/middle/friends-block/button-friend-online.png';
var downArrowImage = '/images/middle/friends-block/button-friend-offline.png';

// LOZ Levels
var lozLevels = new Array(0, 2500, 5000, 8500, 13000, 18500, 25000, 32500, 41000, 50500, 62900, 78300, 95200, 113600, 133500, 154900, 177800, 202300, 228300, 255900, 290400, 334100, 380200, 428800, 479900, 533500, 589600, 648300, 709600, 773500, 856200, 958200, 1064400, 1174800, 1289600, 1408700, 1532200, 1660200, 1792500, 1929400, 2112400, 2333400, 2561900, 2798000, 3041700, 3375700, 3772100, 4181300, 4603500, 5038800, 6305100, 6879000, 7470200, 8079000, 8705500, 9349900, 10012400, 10693200, 11392400, 12110200, 13395800, 14186200, 14996800, 15827600, 16679000, 17551100, 18444000, 19358000, 20293200, 21249700, 22227800);

// Guides
var guides = new Array('base', 'map', 'mychar', 'skills', 'fanucci', 'explore', 'location', 'zoom');

// Pages which need an automated Request from the server
var requestPages = new Array('arena', 'site\/my_rankings', 'community', 'clan\/invite_requests\/\\d+$');

// Local location on LOZ
var loc = document.location.href.replace(/^http:\/\/(www\.)?legendsofzork\.com\//, '');

// Do not run this script when the top banner is loaded
if (loc.match(/^site\/top_banner$/))
	return;

// Add the clan board link is available
if (GM_getValue('activateMisc', true) && GM_getValue('activateBoard', true) && GM_getValue('boardLink', '').length)
	$('li.forum').after("\n<li class='forum'><a href='"+GM_getValue('boardLink')+"' target='_blank'>Clan Board</a></li>");

// Add the other links
if (GM_getValue('activateMisc', true)) {
	$('li.faq').after("\n<li class='faq'><a href='http://www.irondune.com/words/frobozzica/intro.html' target='_blank'>Encyclopedia Frobozzica</a></li>").after("\n<li class='faq'><a href='http://zorkpedia.com/index.php/Main_Page' target='_blank'>Zorkpedia</a></li>");
	$('div.cd-row-quests').after('<div class="cd-row" style="text-align: center;"><a href="/site/search">Search for Adventurers</a></div>');
}
// Check if we are on such a page
var onRequestPage = false;

for (i in requestPages) {
	// Create the fitting RegEx in Runtime and check it
	var reg = new RegExp('^'+requestPages[i]);
	if (loc.match(reg))
		onRequestPage = true;
}

// This is to tell if we really need an autorequest
var doAutoRequest = true;

// Is there a message from the game? If yes slide it up after a while
if ($('div#flash_notice'))
	closeNotice('flash_notice');
if ($('div#flash_error'))
	closeNotice('flash_error');

// Any guide visible?
$(document).ready(function () {
	if (GM_getValue('activateGuide', true) && $('div.guidebox').length != 0) {
		// Just hide the guidebox and be happy
		$('div.guidebox').hide();
	}
});

// To be secure we delete the jump values when we are not exploring
if (!loc.match(/^game\/(move_to_location(\?|$)|level_(up|down)$)/)) {
	GM_deleteValue('jumpLvl');
	GM_deleteValue('jumpCount');
}

// Account settings
if (loc.match(/^account/)) {
	var settingsPos = $("a[name='twitter']:first");
	
	// First of all insert the update div
	settingsPos.before('<div id="flash_notice2" class="notice">Searching for update...</div><p>&nbsp;<p>');
	// Check for script updates
	checkUpdate(false, false);
	
	// Now the settings come
	settingsPos.before('<h2>Legends of Zork Helper</h2>'+"\n"
		+'<div><table border="0" cellpadding="5" cellspacing="5" id="lozHelper" class="inventory">'+"\n"
		+'	<th colspan="3">Here you can choose out which parts of the LoZ Helper you need or not</th>'+"\n"
		+'	<tr class="table-alt"><td colspan="3"><strong><input type="checkbox" id="activateMisc"> Activate Misc functions</strong></td></tr>'+"\n"
		+'	<tr id="misc1">'+"\n"
		+'		<td><input type="checkbox" id="closeGnotice"> Close game notices after <input type="text" id="closeGnoticeTime" value="" size="1" /> seconds</td>'+"\n"
		+'		<td><input type="checkbox" id="closeGerror"> Close game errors after <input type="text" id="closeGerrorTime" value="" size="1" /> seconds</td>'+"\n"
		+'		<td><input type="checkbox" id="activateGuide"> Autoclose Guide windows</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr id="misc2">'+"\n"
		+'		<td><input type="checkbox" id="closeSnotice"> Close helper notices after <input type="text" id="closeSnoticeTime" value="" size="1" /> seconds</td>'+"\n"
		+'		<td><input type="checkbox" id="enhanceMailbox"> Enhance Mailbox</td>'+"\n"
		+'		<td><input type="checkbox" id="activateFastExplore"> Activate fast explore</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr id="misc3">'+"\n"
		+'		<td><input type="checkbox" id="activateJump"> Activate "Jump to certain level" in <input type="text" id="maxJump" value="" size="1" /> tries max.</td>'+"\n"
		+'		<td><input type="checkbox" id="activateSubs"> Show sublocations</td>'+"\n"
		+'		<td><input type="checkbox" id="activateDiscount"> Activate Discount Googles</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr id="misc4">'+"\n"
		+'		<td colspan="3"><input type="checkbox" id="activateBoard"> Activate link to your clan board which is <input type="text" id="boardLink" value="" size="50" /></td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr id="misc5">'+"\n"
		+'		<td colspan="2"><input type="checkbox" id="activateAccessKeys"> Activate Accesskeys (ALT+E - Explore or ALT+B - Base or ALT+L - Last exploration)</td>'+"\n"
		+'		<td><input type="checkbox" id="activateTrophy"> Activate Trophy Enchancement</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr class="table-alt"><td colspan="3"><strong><input type="checkbox" id="activateArena"> Activate Arena functions</strong></td></tr>'+"\n"
		+'	<tr id="arena1">'+"\n"
		+'		<td><input type="checkbox" id="activateAttChanger"> Show attitude stance changer</td>'+"\n"
		+'		<td><input type="checkbox" id="activateArenaFFight"> Show fast fight links</td>'+"\n"
		+'		<td><input type="checkbox" id="activateArDr"> Show AR/DR link</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr id="arena2">'+"\n"
		+'		<td><input type="checkbox" id="markOwnClan"> Mark members of your own clan</td>'+"\n"
		+'		<td><input type="checkbox" id="arenaScanOnLoad"> Scan whole arena page on load</td>'+"\n"
		+'		<td><input type="checkbox" id="activateMinimumFame"> Scan only people above <input type="text" id="minimumFame" value="" size="4" /> fame points</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr class="table-alt"><td colspan="3"><strong><input type="checkbox" id="activateRanking"> Activate Ranking page functions</strong></td></tr>'+"\n"
		+'	<tr id="ranking1">'+"\n"
		+'		<td><input type="checkbox" id="activateShowClan"> Show clan</td>'+"\n"
		+'		<td><input type="checkbox" id="activateShowFocus"> Mark players who are in arena focus</td>'+"\n"
		+'		<td><input type="checkbox" id="activateRankingFFight"> Show fast fight links</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr class="table-alt"><td colspan="3"><strong> Other functions</strong></td></tr>'+"\n"
		+'		<td><input type="checkbox" id="activateClanFunc"> Activate Clan functions</td>'+"\n"
		+'		<td><input type="checkbox" id="activateNoApproveConf"> Activate confirmation of item request approvements</td>'+"\n"
		+'		<td><input type="checkbox" id="activateRequest"> Activate automatic requests</td>'+"\n"
		+'	</tr>'+"\n"
		+'	<tr class="table-alt"><td colspan="3"><strong>Your changes are automatically saved! You don\'t need to click on any <input type="submit" value="save" disabled="disabled" /> button.</strong></td></tr>'+"\n"
		+'</table>'+"\n"
		+'</div>');
	// And don't forget the effects
	$('input#activateMisc').click(function() {
		miscActivated = $("input#activateMisc").attr("checked");
		for (i=1; i<=5; i++)
			miscActivated ? $("table#lozHelper tr#misc"+i).fadeTo("slow", 1.00) : $("table#lozHelper tr#misc"+i).fadeTo("slow", 0.4);
	});
	$('input#activateArena').click(function() {
		arenaActivated = $("input#activateArena").attr("checked");
		for (i=1; i<=3; i++)
			arenaActivated ? $("table#lozHelper tr#arena"+i).fadeTo("slow", 1.00) : $("table#lozHelper tr#arena"+i).fadeTo("slow", 0.4);
	});
	$('input#activateRanking').click(function() {
		$("input#activateRanking").attr("checked") ? $("table#lozHelper tr#ranking1").fadeTo("slow", 1.00) : $("table#lozHelper tr#ranking1").fadeTo("slow", 0.4);
	});
	// List of variables for automated request functions
	var autoFields = new Array("activateAttChanger", "arenaScanOnLoad", "activateShowClan", "activateRankingFFight", "markOwnClan", "minimumFame", "activateMinimumFame");
	$('input#activateRequest').click(function() {
		for (i in autoFields)
			$("input#activateRequest").attr("checked") ? $("input#"+autoFields[i]).removeAttr("disabled") : $("input#"+autoFields[i]).attr("disabled", "disabled");
	});
	
	// Check the boxes which are set
	$('table#lozHelper input:checkbox').each(function() {
		var valId = $(this).attr('id');
		if (GM_getValue(valId, true))
			$('input#'+valId).attr('checked', true);
	});
	// And also fill the text fields
	$('table#lozHelper input:text').each(function() {
		var valId = $(this).attr('id');
		$('input#'+valId).attr('value', GM_getValue(valId, ''));
	});
	// We definetly need save functions!
	$('table#lozHelper input:checkbox').click(function() {
		var valId = $(this).attr('id');
		if ($(this).attr('checked'))
			GM_setValue(valId, true);
		else
			GM_setValue(valId, false);
	});
	$('table#lozHelper input:text').keyup(function() {
		var valId = $(this).attr('id');
		var textValue = valId != 'boardLink' ? parseInt($(this).val().replace(/[^0-9]/, '')) : $(this).val();
		GM_setValue(valId, textValue);
		$(this).val(textValue);
	});

	// Last but not least do not forget to opague and disable
	if (!$("input#activateMisc").attr("checked")) {
		for (i=1; i<=5; i++)
			$("table#lozHelper tr#misc"+i).fadeTo("fast", 0.4);
	}
	if (!$("input#activateArena").attr("checked")) {
		for (i=1; i<=2; i++)
			$("table#lozHelper tr#arena"+i).fadeTo("fast", 0.4);
	}
	if (!$("input#activateRanking").attr("checked")) {
		$("table#lozHelper tr#ranking1").fadeTo("fast", 0.4);
	}
	if (!$("input#activateRequest").attr("checked")) {
		for (i in autoFields)
			$("input#"+autoFields[i]).attr("disabled", "disabled");
	}
}
else {
	// Find my character id from top left panel, strip out unnecessary href info
	var myCharacter = $('.char-name a').attr('href');
	    myCharacter = myCharacter.replace(/\/heroes\//i, "");

	var myId = parseInt(myCharacter);
	var myProfile = new RegExp('^heroes/'+myId+'(-.*)?(\\?tab=\d)?$');

	var myLevel = parseInt($('#character-level').text().replace(/(\s+|Level\s)/g, ""));
	var myZorkmids = parseInt($('div.cdr-col-1.zorkmids').attr('title').replace(/,/g, ''));

	var maxWager = myLevel*100;


	// Set Menu commands
	GM_registerMenuCommand('Arena', function() { goTo('arena') }, 'a', 'alt control', 'A');
	if (GM_getValue('ClanId'))
		GM_registerMenuCommand('My Clan', function() { goTo('clan/clan?id='+GM_getValue('ClanId')) }, 'c', 'alt control', 'C');
	GM_registerMenuCommand('-----------Settings-----------');
	GM_registerMenuCommand('LoZ Settings (Update check)', function() { goTo('account') }, 'u', 'alt control', 'U');
	GM_registerMenuCommand('Double Fanucci', function() { goTo('fanucci_cards/edit') }, 'f', 'alt control', 'F');
	if (myLevel >= 30)
		GM_registerMenuCommand('Sidekick Fanucci', function() { goTo('fanucci_cards/edit_sidekick') }, 's', 'alt control', 'S');
	GM_registerMenuCommand('Inventory', function() { goTo('inventory') }, 'v', 'alt control', 'v');
	GM_registerMenuCommand('Skill Training', function() { goTo('skills') }, 'k', 'alt control', 'k');
	GM_registerMenuCommand('------------Shops-------------');
	GM_registerMenuCommand('Armory', function() { goTo('store/buy') }, 'r', 'alt control', 'r');
	GM_registerMenuCommand('Magic Shoppe', function() { goTo('magic') }, 'm', 'alt control', 'M');

	// Grab the auth token for stuff where we could need it
	var authToken = $("input[name='authenticity_token']:first").val();

	// How many Actions Points are left? We need at least 1!
	var actionPoints = parseInt($('#action-points-remaining').text());
	
	// Change the link to the mailbox on the left side
	if (GM_getValue('activateMisc')) { 
		if (GM_getValue('enhanceMailbox', true))
			$('p.fdb-mailbox a:first').attr('href', '/community/?tab=1');
	
	}
	
	// Add some accesskeys
	if (GM_getValue('activateAccessKeys', true)) {
		// Explore
		if ($('a[href="/game/explore"]').length)
			$('a[href="/game/explore"]:first').attr('accessKey', 'e');
		else if ($('a[href="#"] span[onclick*="/game/explore"]').length) {
			parentLink = $('a[href="#"] span[onclick*="/game/explore"]').parent();
			if (parentLink.attr('href') == '#')
				parentLink.attr('href', '/game/explore').attr('accessKey', 'e').attr('title', 'Accesskey: e');
		}
		else if ($('div#explore').length)
			$('div#explore span[onclick^="window.location.href="]:first').attr('accessKey', 'e').attr('title', 'Accesskey: e');

		// Base
		$('a[href="/game/return_to_base"]:first').attr('accessKey', 'b').attr('title', 'Accesskey: b');

		// Level changers
		if ($('a[href="/game/level_up"]').length)
			$('a[href="/game/level_up"]:first').attr('accessKey', '+').attr('title', 'Accesskey: +');
		if ($('a[href="/game/level_down"]').length)
			$('a[href="/game/level_down"]:first').attr('accessKey', '-').attr('title', 'Accesskey: -');

		// Last Exploration
		$('a[href^="/game/move_to_location?name="]').each(function() {
			if ($(this).text() == 'Last Exploration') {
				$(this).attr('accessKey', 'l').attr('title', 'Accesskey: l');
				return false;
			}
		});
	}
}

// Login page?
if (loc == '') {
	// To be secure we delete the ClanID and the Clan Functions auth
	GM_deleteValue('ClanId');
	GM_deleteValue('ClanFuncs');
}
// Profile page
else if (loc.match(/^heroes\/\d+(-.*)?(\?tab=\d)?$/)) {
	// Trophy stuff
	if (GM_getValue('activateMisc', true) && GM_getValue('activateTrophy', true)) {
		// Toggle the visibilty of not achieved trophies
		$('div#tab-char-2-content h2').eq(1).after('<a href="javascript:void(0)" id="toggleLink">Hide not achieved trophies</a><br />');

		var toggler = true;
		$('a#toggleLink').click(function() {
			if (toggler) {
				$('div#tab-char-2-content div.not-achieved').hide();
				$('a#toggleLink').text('Show not achieved trophies');
			}
			else {
				$('div#tab-char-2-content div.not-achieved').show();
				$('a#toggleLink').text('Hide not achieved trophies');
			}
			toggler = !toggler;
			return;
		});
		
		// Collapse or expand character level trophies
		$('div.trophies-profile-10 div.trophies-text:first').before('<div class="trophies-text"><div class="not-achieved" id="leveltoggle"><span class="dark"><a href="#trophy10" id="levelToggler">Collapse all level trophies</a></span><br />Scroll em up! (Level 1-100)</div></div>');
		$('div.trophies-profile-10 div.trophies-text:contains("First to level")').wrap('<div class="toggler"></div>');
		$('div.trophies-profile-10 div.trophies-text:contains("Second to level")').wrap('<div class="toggler"></div>');
		$('div.trophies-profile-10 div.trophies-text:contains("Third to level")').wrap('<div class="toggler"></div>');
		
		var levelToggle = true;
		$('a#levelToggler').click(function() {
			if (levelToggle) {
				$('div.toggler').hide();
				$('div#leveltoggle').attr('class', 'achieved');
				$('a#levelToggler').text('Expand all level trophies');
			}
			else {
				$('div.toggler').show();
				$('div#leveltoggle').attr('class', 'not-achieved');
				$('a#levelToggler').text('Collapse all level trophies');
			}
			levelToggle = !levelToggle;
			return false;
		});
	}
	// Seeking clan functions?
	if (GM_getValue('activateClanFunc', true)) {
		clanId = 0;
		if (!GM_getValue('ClanFuncs', false)) {
			if($('img.infoImage').length) {
				$('div.creature-block').before('<div id="flash_notice2" class="confirmed">Clan Functions recognized and activated</div>');
				closeNotice();
				GM_setValue('ClanFuncs', true);
				clanId = parseInt($('div.mc-col-2-profile a[href*="/clan/leader"]').attr('href').replace(/^\/clan\/leader\?id=\d+&clan_id=(\d+)$/, '$1'))
				GM_setValue('ClanId', clanId);
			}
		}
		if (GM_getValue('ClanFuncs', false)) {
			clanId = parseInt($('div.mc-col-2-profile p a[href*="/clans/"]').attr('href').match(/\d+/));
			if (clanId == GM_getValue('ClanId', 0)) {
				var playerId = document.location.href.match(/\d+/);
				var playerName = $('div.creature-block h2').text();
				$('div#community_message').after('<p><a href="/clan/leader?id='+playerId+'&clan_id='+GM_getValue('ClanId', 0)+'">Clan Functions for '+playerName+'</a></p>');
			}
		}
	}
}
// Fast Explore
else if (loc.match(/^game\/(explore|fight)$/) && GM_getValue('activateFastExplore', true)) {
	// Ids of all the invisible divs
	var ids = new Array('base-chance', 'encounter-attack-defense', 'skills-used', 'encounter-stance', 'final-chance', 'combat-result', 'extra-help-link-standard');
	for (i in ids)
		$('#'+ids[i]).show();
	$('dl.result').show();
	// Set a very high value for currentItem to stop the timeouts and show the health block immediately
	unsafeWindow.currentItem = 100;
}
// Move to location
else if (loc.match(/^game\/(move_to_location(\?|$)|level_(up|down)$)/) && GM_getValue('activateMisc', true)) {
	if (GM_getValue('activateJump', true)) {
		// First grab the range of explore
		if ($('div.main-content p strong:contains("level range:")').length) {
			tmp = $('div.main-content p strong:contains("level range:")').text().match(/\d+/g);
			lowestLevel = parseInt(tmp[1]);
			highestLevel = parseInt(tmp[2]);
		}
		else {
			tmp = $('div.main-content p strong:contains("Encounters will vary from level")').text().match(/\d+/g);
			lowestLevel = parseInt(tmp[0]);
			highestLevel = parseInt(tmp[1]);
		}
		// Now comes the current level
		tmp = $('div.main-content p strong:contains("You are exploring at level")').text().match(/\d+/);
		currentLevel = parseInt(tmp[0]);
	
		// Check if we are in a sublocation or normal one
		normLoc = $('div.main-content div a[href^="/game/level_"]').length;
	
		// Is an autojump active?
		jumpTo = GM_getValue('jumpLvl', false);
		recurs = 0;

		if (jumpTo && jumpTo != currentLevel) {
			if (!normLoc)
				recurs = parseInt(GM_getValue('jumpCount', 0))+1; // Only increase on sublocations
			GM_setValue('jumpCount', recurs);
			if (recurs < GM_getValue('maxJump', 10)) {
				// We are not where we want to be and we still have jumps left
				if (!normLoc)
					window.location.reload();  // On sublocations we need to reload the page
				else if (jumpTo > currentLevel) {
					window.location.href = 'http://legendsofzork.com/game/level_up';
				}
				else 
					window.location.href = 'http://legendsofzork.com/game/level_down';
			}
			else {
				$('a.s-button[href="/game/explore"]').before('<div id="flash_notice2" class="error">Could not reach the wanted level after '+GM_getValue('maxJump', 10)+' jumps and stopped.</div>');
				closeNotice('flash_notice2');
				GM_deleteValue('jumpCount');
			}
		}
		else if (jumpTo == currentLevel) {
			// Reached the wanted level
			GM_deleteValue('jumpLvl');
			GM_deleteValue('jumpCount');
		}
	
		// Add the jump buttons
		if (GM_getValue('addJumpButtons', true)) {
			exploreButton = $('a[href="/game/explore"]:first');

			for (i = highestLevel; i >= lowestLevel; i--) {
				if (i == currentLevel)
					continue;
				lvlDiff = i-myLevel;
				if (lvlDiff > 0)
					lvlSign = '+'+lvlDiff;
				else if (!lvlDiff)
					lvlSign = '';
				else
					lvlSign = lvlDiff;
				if (lvlSign != '')
					lvlSign = ' ('+lvlSign+')';
				exploreButton.after('<a href="#" id="lvljump_'+i+'" class="s-button"><span class="s-button-right">lvl '+i+lvlSign+'</span></a>');
		
				currentButton = $('a#lvljump_'+i);
				if (!normLoc) {
					// Sublocation
					currentButton.click(function () {
						GM_setValue('jumpLvl', parseInt($(this).attr('id').match(/\d+/)));
						location.reload();
						return false;
					});
				}
				else if (i > currentLevel) {
					// Go to higher levels
					currentButton.click(function () {
						GM_setValue('jumpLvl', parseInt($(this).attr('id').match(/\d+/)));
						window.location.href = '/game/level_up';
						return false;
					});
				}
				else {
					// Go to lower levels
					currentButton.click(function () {
						GM_setValue('jumpLvl', parseInt($(this).attr('id').match(/\d+/)));
						window.location.href = '/game/level_down';
						return false;
					});
				}
				// Add Accesskey?
				if (GM_getValue('activateAccessKeys', true) && lvlDiff > 0)
					currentButton.attr('accessKey', lvlDiff).attr('title', 'Accesskey: '+lvlDiff);
			}
			exploreButton.after('<br /><strong>Jump to a certain level</strong><br />');
		}
	}
	
	// Delete the sublocation links?
	if (!GM_getValue('activateSubs', true))
		$('form#location-form').html('');
	else {
		// If shown rewrite the javascript links to real ones
		subLinks = $('form#location-form a[href^="javascript: go("]');
		subLinks.each(function() {
			subLink = $(this).attr('href').replace(/^javascript:\sgo\('([^']+).*$/, '$1');
			$(this).attr('href', '/game/move_to_location?name='+subLink);
		});
	}
}
// Cards pages
else if (loc.match(/^fanucci_cards\/edit(_sidekick)?$/) && GM_getValue('activateMisc', true)) {
	if (loc.match(/^fanucci_cards\/edit_sidekick$/)) {
		linkname = '';
		cardVersion = 'normal';
	}
	else {
		linkname = '_sidekick';
		cardVersion = 'sidekick';
	}
	$('div#card-actions').before('<div class="fanucci-guide"><p><a href="/fanucci_cards/edit'+linkname+'">Go to the '+cardVersion+' cards</a></p></div>');
}
// Game Armory
else if (loc.match(/^store\/buy(\?.*)?$/) && GM_getValue('activateMisc', true)) {
	$('li#tab-store-3').after('<li id="tab-store-4"><a href="/magic">Go to Magic Shoppe</a></li>');
	showDiscount('store');
}
// Magic Shoppe
else if (loc.match(/^magic(\?.*)?$/) && GM_getValue('activateMisc', true)) {
	$('li#tab-magic-3').after('<li id="tab-magic-4"><a href="/store/buy">Go to Armory</a></li>');
	showDiscount('magic');
}
// Append the "Back to Mailbox" link to inbox messages
else if (loc.match(/^community\/readin\?msg=/) && GM_getValue('activateMisc', true) && GM_getValue('enhanceMailbox', true)) {
	// Append a link back to the mailbox inside the message
	$('div.main-content a').each(function() {
		if ($(this).text() == 'Delete')
			$(this).after(' | <a href="/community/">Back to Mailbox</a>');
	});
}
// Append the "Back to Sentbox" link to sentbox messages
else if (loc.match(/^community\/readout\?msg=/) && GM_getValue('activateMisc', true) && GM_getValue('enhanceMailbox', true)) {
	var messageId = getURLArgument('msg');
	// Append a link back to the mailbox inside the message
	$('div.the-message').after('<form method="POST" id="delform" action="/community/delete_multiple_outbox"><input type="hidden" name="authenticity_token" value="'+authToken+'" /><input type="hidden" name="message_ids[]" value="'+messageId+'" /></form><div><a href="/community/?tab=1">Back to Mailbox</a> | <a href="/community/?tab=2">Back to Sentbox</a> | <a href="javascript:$(\'delform\').submit();">Delete</a></div>');
}
// Check the focus on ranking pages and look if we need auto requests
else if (loc.match(/^site\/my_rankings/)) {
	if (GM_getValue('activateShowFocus', true))
		checkFocus();
	
	if (!GM_getValue('activateRankingFFight', true) && !GM_getValue('activateShowClan', true))
		doAutoRequest = false;
}

if (loc.match(/^community(\/([^r]|$)|\?|$)/) && GM_getValue('activateMisc', true) && GM_getValue('enhanceMailbox', true))
{
	var tabulator = parseInt(getURLArgument('tab'));
	
	// If no tabulator is set  and we come from a sent message (for example when we delete a message there)
	// we go back to tab 2 (SENT)
	if (!tabulator && document.referrer.match(/^http:\/\/(www\.)?legendsofzork\.com\/community\/readout\?msg=/))
		tabulator = 2;
	
	switch (tabulator) {
		case 1:
			$('div#tab-mail-1-content').show();
			$('li#tab-mail-1').attr('class', 't-active');
			$('div#tab-mail-2-content').hide();
			$('li#tab-mail-2').attr('class', '');
			break;
		case 2:
			$('div#tab-mail-1-content').hide();
			$('li#tab-mail-1').attr('class', '');
			$('div#tab-mail-2-content').show();
			$('li#tab-mail-2').attr('class', 't-active');
			break;
	}
	onRequestPage = false;
	
	// Check if we have at least one message from the Grand Wizard
	var gwMessages = false;
	$('form#form-in table tr td span').each(function () {
		if ($(this).text().match(/^Grand\sWizard$/)) {
			gwMessages = true;
			return false; // We found one, stop the recursion
		}
	});
	if (gwMessages) {
		// Create the "GW Messages" selectorGM_getValue('activateClanFunc', true)
		$('form#form-in a.s-button:first').after('<a class="s-button" id="select_hj" href="javascript: void(0);"><span class="s-button-right">Select GW Messages</span></a>');
		$('a#select_hj').click(function() {
			$('form#form-in input:checkbox').each(function() {
				if($(this).parent().prevAll().eq(4).text().match(/^\s*Grand\sWizard\s*$/i))
					$(this).attr('checked', true);
			});
		});
	}
	
	// How about PVP messages?
	var pvpMessages = false;
	$('form#form-in input:checkbox').each(function() {
		if($(this).parent().prevAll().eq(3).text().match(/PVP\sOutcome/i)) {
			pvpMessages = true;
			return false; // We found a hit! We don't need more.
		}
	});

	if (pvpMessages) {
		// Create the "PVP Outcome" selector
		$('form#form-in a.s-button:first').after('<a class="s-button" id="select_pvp" href="javascript: void(0);"><span class="s-button-right">Select PVP Outcome</span></a>');	
		$('a#select_pvp').click(function() {
			$('form#form-in input:checkbox').each(function() {
				if($(this).parent().prevAll().eq(3).text().match(/PVP\sOutcome/i)) {
					$(this).attr('checked', true);
					pvpMessages = true;
				}
			});
		});
	}
	
	// Append the tab id to the pagination links
	for (i=1; i<=2; i++) {
		$('div#tab-mail-'+i+'-content > div.pagination a').each(function () {
			link = $(this).attr('href').replace(/&tab=\d+/, '');
			$(this).attr('href', link+'&tab='+i);
		});
	}
}
// Delete the Auth value when we are at the Char choose page
else if (loc.match(/^characters\/my_characters/)) {
	// Check for updates and show a notice is there is one
	checkUpdate(false, true);
	
	// Show a message the first time we go to the char choose page
	if (GM_getValue('ClanFuncs', false) && GM_getValue('activateClanFunc', true)) {
		$('h2').each(function() {
			if ($(this).text() == 'Choose a Character')
				$(this).before('<div id="flash_notice2" class="notice">Deactivated Clan Functions</div>');	
		});
		closeNotice();
	}
	// On the character choose page we delete the auth and the ClanId value
	GM_deleteValue('ClanFuncs');
	GM_deleteValue('ClanId');
}
// Own clan page
else if ((loc.match(/^clans\/\d+($|\?)/) || loc.match(/^clan\/clan\?id=\d+(&term=.*)?$/)) && $('h1:first').text() == 'My Clan') {
	// Check if there is a Clan Functions link
	if($('img.infoImage').length && GM_getValue('activateClanFunc', true)) {
		// Did we reach our clan page by inviting someone?
		if (document.referrer.match(/^http:\/\/legendsofzork\.com\/clan\/send_invite\/\d+\?mode=accept$/)) {
			location.href = 'http://legendsofzork.com'+$('div.clan-links a[href^="/clan/invite_requests/"]').attr('href');
			return;
		}
		// Or maybe after approving an item request?
		else if (document.referrer.match(/^http:\/\/legendsofzork\.com\/clan\/gift_requests\/\d+$/) && $('div#flash_notice').text().match(/^(Gave|You gave) .* to /)) {
			location.href = 'http://legendsofzork.com'+$('div.clan-links a[href^="/clan/gift_requests/"]').attr('href');
			return;
		}
		// Show a message the first time we go to our clan
		if (!GM_getValue('ClanFuncs', false)) {
			$('div.mc-col-1-profile h1').before('<div id="flash_notice2" class="confirmed">Clan Functions recognized and activated</div>');
			closeNotice();
		}
		GM_setValue('ClanFuncs', true);
	}
	// Even if we have no Clan Functions we set our Clan ID
	var clanId = parseInt($('div.messages-box a').attr('href').match(/\d+/));
	GM_setValue('ClanId', clanId);
}
// Requests page
else if (loc.match(/^clan\/gift_requests\/\d+$/) && GM_getValue('activateClanFunc', true)) {
	// First we need to do some work before the real thing starts
	var actualId = 0;
	var counter = 0;
	$('table.inventory tr td a').each(function() {
		if ($(this).attr('href').match(/^\/heroes\/\d+-/)) {
			tmp = $(this).attr('href').match(/\d+/);
			actualId = tmp[0];
			return true;
		}
		counter++;
		$(this).attr('id', actualId+'_'+counter);
	});
	$('table.inventory tr td[colspan=3] a').each(function() {
		var actualLink = $(this).attr('href');
		if (actualLink.match(/^\/clan\/deny_gift\/\d+$/)) {
			// We have found a Deny Gift link
			requestId = actualLink.match(/\d+/);
			memberId = parseInt($(this).attr('id'));
			// Now create the link to the "Gift Item" page and put our suffix into it
			var newLink = actualLink.replace(/^\/clan\/deny_gift\/(\d+)$/, '/clan/gift?id='+memberId+'&amp;clan='+GM_getValue('ClanId', 0)+'&amp;request=$1');
			$(this).before('<a href="'+newLink+'">Gift a different item</a> | ');
			if (!GM_getValue('activateNoApproveConf', true)) {
				// Get rid of the confirmation
				tmp = $(this).prev().prev();
				if (typeof tmp.attr('href') != 'undefined') {
					tmp.text('');
					tmp.after('<a href="'+tmp.attr('href')+'">Approve Gift</a>');
					$(this).text('');
					$(this).after('<a href="'+$(this).attr('href')+'">Deny Gift</a>');
				}
			}
		}
	});
	// Show the level of a requester on the requests page
	if (GM_getValue('activateRequest', true) && actionPoints > 0) {
		$('table.inventory tr td a[href^="/heroes/"]').each(function () {
			var requester = $(this).attr('href').replace(/^\/heroes\/(\d+-.*)$/, '$1');
		
			$.getJSON("/arena/select?opponent=" + requester, function (requesterData) {
				reqId = parseInt(requesterData.id);
				// Select the right link
				$('table.inventory tr td a[href^="/heroes/'+reqId+'-"]').after(' ('+requesterData.level+')');
			});
		});
	}
}
// Gruegle page
else if (loc.match(/^site\/search$/)) {
	// Show the clan of a found player
	if (GM_getValue('activateRequest', true) && actionPoints > 0) {
		$('table tr td a[href^="/heroes/"]').each(function () {
			var player = $(this).attr('href').replace(/^\/heroes\/(\d+-.*)$/, '$1');
		
			$.getJSON("/arena/select?opponent=" + player, function (playerData) {
				playerId = parseInt(playerData.id);
				// Select the right link
				if (playerData.clanname != null) {
					$('table tr td a[href^="/heroes/'+playerId+'-"]').html('<span style="background-color: red; color: white" title="Clan: '+playerData.clanname+'">'+playerData.name+'</span>');;
				}
			});
		});
	}
}
// Clan message board
else if (GM_getValue('ClanFuncs', false) && loc.match(/^clan\/messages(\?id=|\/)/) && GM_getValue('activateClanFunc', true)) {
	$('div.clan-message em a').each(function() {
		if ($(this).attr('href').match(/\d+-/)) {
			var member = parseInt($(this).attr('href').match(/\d+-/));
			$(this).after(' <a href="/clan/leader?id='+member+'&clan_id='+GM_getValue('ClanId', 0)+'"><img class="infoImage" src="/images/clans/info.png"></a>');
		}
	});
}
// Gift page
else if (loc.match(/^clan\/gift(\?id=|\/)\d+(&|\?)/) && GM_getValue('activateClanFunc', true)) {
	// First of alle add a "Back to Clan" link
	$('div.pagination').after('<a href="/clans/'+GM_getValue('ClanId')+'">Back to clan</a> | <a href="/clan/gift_requests/'+GM_getValue('ClanId')+'">Back to Gift Requests</a>');
	
	// Do we want to gift something else than the member requested?
	var requestId = parseInt(getURLArgument('request'));
	if (requestId) {
		// First add the RequestID to the sorting links
		$('table.inventory tr th a[href^="/clan/gift?id="]').each(function () {
			$(this).attr('href', $(this).attr('href')+'&request='+requestId);
		});
		$('table.inventory tr td a[href^="/clan/gift?clan='+GM_getValue('ClanId')+'&id="]').each(function () {
			// Grab out the ids we need
			linkRegex = new RegExp('/clan/gift\\?clan='+GM_getValue('ClanId')+'&id=(\\d+)&item_id=(\\d+)');
			linkRegex.exec($(this).attr('href'));
			// Create and set the new link
			giftLink = '/clan/gift/'+RegExp.$1+'?clan='+GM_getValue('ClanId')+'&item_id='+RegExp.$2+'&request='+requestId;
			$(this).attr('href', giftLink);
			$(this).text('Gift this item instead');
			$(this).click(function () {
				return confirm('Are you sure you want to gift this item instead of the requested one?');
			});
		});
	}
}
// Reading a message and have Clanfunc and automatic requests activated?
else if (loc.match(/^community\/read(in|out)\?msg=/) && GM_getValue('activateClanFunc', true) && GM_getValue('activateRequest', true) && actionPoints > 0) {
	if (GM_getValue('ClanFuncs', false)) {
		// Only do this when it's not a message from the Grand Wizard
		if ($('p.mail-header a').text() != 'Grand Wizard') {
			// Oh we have some Clan rights, so check if the sender is in our clan
			var senderId = $('p.mail-header a').attr('href').match(/\d+-[^\']+/);
			// get the json data for the sender
			$.getJSON("/arena/select?opponent=" + senderId, function(senderData){
				if (senderData.clanid == GM_getValue('ClanId', 0)) {
					var sender = $('p.mail-header a').attr('href').match(/\d+/);
					$('p.mail-header a').after(' <a href="/clan/leader?id='+sender+'&clan_id='+GM_getValue('ClanId', 0)+'"><img class="infoImage" src="/images/clans/info.png"></a>');
				}
			});
		}
		// It's a message from the "big boss" ;)
		else if ($('div.the-message p').text().match(/\shas\sleft\s/)) {
			// Someone left us. Let's see who it is
			var leftMessage = $('div.the-message p').text();
			var username = leftMessage.match(/\n.+\shas\sleft\s/).toString().replace(/^\s+(.*?)\shas\sleft\s/, '$1');
			var searchUsername = username.toLowerCase();
			$('div.main-content h1').after('<div id="flash_notice2" class="confirmed" style="display:none">Searching for the user profile.</div>');
			$('div#flash_notice2').show();
			$.post('/site/search', {
				authenticity_token: authToken,
				search_query: searchUsername,
				search_submit: 'Search'
			}, function(data) {
				// uuh, I love RegExp :D We use this to get the right link and replace the part we don't need
				var userRegex = new RegExp('/heroes/\\d+-.*?">'+username+'<', 'g');
				var replaceRegex = new RegExp('">'+username+'<');
				// Do we have a hit?
				if (data.match(userRegex)) {
					var profileLink = data.match(userRegex).toString().replace(replaceRegex, '');
			
					// Now that we have the link we can replace the message text
					replaceRegex = new RegExp(username);
					$('div.the-message p').html(leftMessage.replace(replaceRegex, '<a href="'+profileLink+'">'+username+'</a>'));
					$('div#flash_notice2').text('Found profile of the user and replaced the nick with the profile link!');
					closeNotice();
				}
				else {
					// It seems that the user has deleted his account
					$('div#flash_notice2').text('Didn\'t find any results for that username. It seems that the profile is deleted!').attr('class', 'error');
					closeNotice();
				}
			}, 'html');
		}
		else if ($('div.the-message p').text().match(/\shas\sjoined\s/)) {
			// Someone joined us. Let's see who it is
			var leftMessage = $('div.the-message p').text();
			var username = leftMessage.match(/\n.+\shas\sjoined\s/).toString().replace(/^\s+(.*?)\shas\sjoined\s/, '$1');
			var usernameSearch = username.toLowerCase();
			$('div.main-content h1').after('<div id="flash_notice2" class="confirmed" style="display:none">Searching for the user profile.</div>');
			$('div#flash_notice2').show();
			$.post('/site/search', {
				authenticity_token: authToken,
				search_query: usernameSearch,
				search_submit: 'Search'
			}, function(data) {
				// RegExp again
				var userRegex = new RegExp('/heroes/\\d+-.*?">'+username+'<', 'g');
				var replaceRegex = new RegExp('">'+username+'<');
				// Do we have a hit?
				if (data.match(userRegex)) {
					var profileLink = data.match(userRegex).toString().replace(replaceRegex, '');
					var memberId = profileLink.toString().replace(/\/heroes\/(\d+)-.+/, '$1');
			
					// Now that we have the link we can replace the message text
					replaceRegex = new RegExp(username);
					$('div.the-message p').html(leftMessage.replace(replaceRegex, '<a href="'+profileLink+'">'+username+'</a> <a href="/clan/leader?id='+memberId+'&clan_id='+GM_getValue('ClanId', 0)+'"><img class="infoImage" src="/images/clans/info.png"></a>'));
					$('div#flash_notice2').text('Found profile of the user and replaced the nick with the profile link!');
					closeNotice();
				}
				else {
					// It seems that the user has deleted his account
					$('div#flash_notice2').text('Didn\'t find any results for that username. It seems that the profile is deleted or Gruegle is not finding it!').attr('class', 'error');
					closeNotice();
				}
			}, 'html');
		}
	}
}
else if (loc.match(/^arena\/confirm$/) && GM_getValue('activateArena', true)) {
	$('input#wager').val(maxWager);
}
else if (onRequestPage && actionPoints > 0 && GM_getValue('activateRequest', true)) {
	// query my character data, callback to myCharacterDataReady()
	// but only when we still have at least 1 AP left and autorequest is wanted!
	if (doAutoRequest)
		$.getJSON("/arena/select?opponent=" + myCharacter, myCharacterDataReady);
}
// We have reached 0 APs so some functions are disabled and we need to set warning about that
else if (loc.match(/^site\/my_rankings/) && GM_getValue('activateShowClan', true)) {
	// Set a warning onto the ranking page
	if (GM_getValue('activateRequest', true))
		$('p:eq(10)').html('<div id="flash_notice2" class="notice" style="display:none">Automatical clan recognition disabled due to 0 Action Points left.</div>');
	else
		$('p:eq(10)').html('<div id="flash_notice2" class="notice" style="display:none">Clan recognition impossible due to disabled automatic requests.</div>');
	$('div#flash_notice2').slideDown('slow');
	closeNotice();
}
else if (GM_getValue('ClanFuncs', false) && loc.match(/^community\/read(in|out)\?msg=/) && GM_getValue('activateClanFunc', true)) {
	// Ignore this if it's a message from the Grand Wizard
	if ($('p.mail-header a').text() != 'Grand Wizard') {
		// Set a warning above the message
		if (!GM_getValue('activateRequest', true))
			// Did we reach here because of disabled automatic requests?
			$('div.main-content h1').after('<div id="flash_notice2" class="notice" style="display:none">Clan recognition impossible due to disabled automatic requests. Please click on the profile link for possibly needed Clan Functions.</div>');
		else
			// So it must be because we have no AP left
			$('div.main-content h1').after('<div id="flash_notice2" class="notice" style="display:none">Clan recognition impossible due to 0 Action Points left. Please click on the profile link for possibly needed Clan Functions.</div>');
		$('div#flash_notice2').slideDown('slow');
		closeNotice();
	}
	// Oh it's a message from the "big boss" ;)
	else if ($('div.the-message p').text().match(/\shas\s(left|joined)\s/)) {
		// Someone left or joined us. But we have no automatic requests. Show a notice about it
		if (!GM_getValue('activateRequest', true))
			// Did we reach here because of disabled automatic requests?
			$('div.main-content h1').after('<div id="flash_notice2" class="notice" style="display:none">Automatic profile recognition impossible due to disabled automatic requests.</div>');
		else
			// So it must be because we have no AP left
			$('div.main-content h1').after('<div id="flash_notice2" class="notice" style="display:none">Automatic profile recognition impossible due to 0 Action Points left.</div>');
		$('div#flash_notice2').slideDown('slow');
		closeNotice();
	}
}

/** 
* Callback function for $.getJSON, starts main functions
*/
function myCharacterDataReady(myCharData) {
	// myCharacterData.ar           Attack Rating
	// myCharacterData.dr           Defense Rating
	// myCharacterData.attitude     Attitude
	// myCharacterData.magic	    Magic
	myCharacterData = myCharData;

	// Arena functions
	if (loc.match(/^arena/) && !loc.match(/^arena\/fight/) && GM_getValue('activateArena', true)) {
		var minimumFame = GM_getValue('minimumFame', 0);

		// ForEach <a> found
		$('#tab-arena-1-content table tr td').each(function(intIndex) {
			// Double check that the link we are looking at is indeed a player link
			tmp = $(this).contents().filter('a');
			if(!tmp.length || !tmp.attr('href').match(/javascript:[%20 ]*select/))
			    return; // return if not a player link			
			// Did we set a minimum fame for parsing?
			if (minimumFame != '' && GM_getValue('activateMinimumFame', true)) {
				fame = parseInt($(this).next().next().text());
				if (fame < minimumFame)
					return;
			}
			// Append the AR/DR link
			appendLink(tmp, myCharacterData, true);
		});

		// Append attitude stance changers
		if (GM_getValue('activateAttChanger', true)) {
			$('div#character_data').before('<div class="protection"><h2>Your current attitude stance is:<br /><strong><span id="current_stance">'+myCharacterData.attitude+'</span></strong></h2><a href="javascript:void(0)" id="sa_click">Change to Shock & Awe</a><br /><a href="javascript:void(0)" id="sm_click">Change to Smart Moves</a><br /><a href="javascript:void(0)" id="hr_click">Change to Hit & Run</a><br /><a href="javascript:location.reload();" >Reload Page</a></div>');

			// Don't forget the onClick-Functions
			$('#sa_click').click(function() {
				// Use jQuery to set the attitude stance Shock & Awe
				$.post('/characters/update_attitude', {
					authenticity_token: authToken,
					attitude: 'attitude_shock_awe',
					commit: 'Update'
				});
				$('#current_stance').text('Shock & Awe');
				// Set the attitude icons new
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Shock"]').attr('src', rightArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Smart"]').attr('src', upArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Hit"]').attr('src', downArrowImage);
			});
			$('#sm_click').click(function() {
				// Use jQuery to set the attitude stance Smart Moves
				$.post('/characters/update_attitude', {
					authenticity_token: authToken,
					attitude: 'attitude_smart_moves',
					commit: 'Update'
				});
				$('#current_stance').text('Smart Moves');
				// Set the attitude icons new
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Shock"]').attr('src', downArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Smart"]').attr('src', rightArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Hit"]').attr('src', upArrowImage);
			});
			$('#hr_click').click(function() {
				// Use jQuery to set the attitude stance Hit & Run
				$.post('/characters/update_attitude', {
					authenticity_token: authToken,
					attitude: 'attitude_hit_run',
					commit: 'Update'
				});
				$('#current_stance').text('Hit & Run');
				// Set the attitude icons new
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Shock"]').attr('src', upArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Smart"]').attr('src', downArrowImage);
				$('div#tab-arena-1-content table tr td img[title^="Opponents attitude: Hit"]').attr('src', rightArrowImage);
			});
		}
		// Did we set a minimum Fame filter?
		if (minimumFame != '' && GM_getValue('activateMinimumFame')) {
			$('li#tab-arena-2').after("\n"+'<li id="tab-arena-3"><a href="javascript:void(0);">Filter set to '+minimumFame+'.0 Fame</a></li>');
		}
	}
	// Are we looking at a rankings page?
	else if (loc.match(/^site\/my_rankings/) && GM_getValue('activateRanking', true)) {
		// ForEach <a> found
		$('.m-col-2 td a').each(function(intIndex) {
			// Double check that the link we are looking at is indeed a player link
			if(!$(this).attr('href').match(/heroes\/\d+-/))
			    return false; // return false if not a player link

			appendLink($(this), myCharacterData, false);
		});
	}
	// Are we at the invite requests page?
	else if (loc.match(/^clan\/invite_requests\/\d+$/) && GM_getValue('activateClanFunc', true)) {
		$('table.inventory tr td a[href^="/heroes/"]').each(function () {
			var requester = $(this).attr('href').replace(/^\/heroes\/(\d+-.*)$/, '$1');
			
			$.getJSON("/arena/select?opponent=" + requester, function (requesterData) {
				reqId = parseInt(requesterData.id);
				// Select the right link
				el = $('table.inventory tr td a[href^="/heroes/'+reqId+'-"]');
				// Is the requester already in a clan?
				if (requesterData.clanname != null) {
					el.html('<span style="background-color: red; color: white" title="Clan: '+requesterData.clanname+'">'+requesterData.name+'</span>');
				}
				el.after(' ('+requesterData.level+')');
			});
		});
	}
}

/**
* Adds an attack link.
*/
function appendLink(el, myCharacterData, longVers) {
	// get the target's Id
	var targetId = el.attr('href').match(/\d+-[^\']+/);

	// Short version for Ranking pages?
	longVersion = (!longVers ? false : longVers);

	// get the json data for the target
	$.getJSON("/arena/select?opponent=" + targetId, parseTargetResponse);
}

// Decrease the showed action points
function decreaseAP() {
	var ap = parseInt($('div#action-points-remaining').text());
	if (!ap)
		return false;
	ap--;
	$('div#action-points-remaining').text(ap);
	if (!ap) {
		$('div#tab-arena-1-content table:first').before('<div id="flash_notice2" class="notice" style="display:none">You have reached 0 Action Points. So no more fights are possible</div>');
		$('div#flash_notice2').slideDown('slow');
	}
}

// Check for updates
function checkUpdate(slide, onlyCheck) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://loz.awardspace.info/lozhelper_version',
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'text/html',
		'Pragma': 'no-cache',
		'Cache-Control': 'no-cache',
	    },
	    onload: function(responseDetails) {
	    	var extVersion = responseDetails.responseText.match(/[0-9 a-z.]+/i);
		if (extVersion != lozVersion) {
			// If we do a short check just give out an error telling about the update
			if (onlyCheck) {
				$('table.choose-characters').after('<div id="flash_error2" class="error">New version of the LoZ Helper found. Please go to the <a href="/account">Account Settings</a> and do an update.</div>');
				return;
			}
			// New Version found! Grab the changelog too
			var tmp = responseDetails.responseText.match(/\n.+/g);
			var changelog = '';
			for (i in tmp)
				changelog += tmp[i];

			$('div#flash_notice2').html('New version of the LOZ Helper script found.<br />Your version is <strong>'+lozVersion+'</strong>. The actual version is <strong>'+extVersion+'</strong><br/><strong><u>Changelog</u></strong>'+changelog+'<a href="javascript:void(0)" id="updatelink">Click here to update</a>');
			$('a#updatelink').click(function() {
				window.location.href = 'http://userscripts.org/scripts/source/52046.user.js';
				return false;
			});
		}
		else {
			if (onlyCheck)
				return false;
			$('div#flash_notice2').html('Your version is up to date!');
			closeNotice();
		}
		if (slide)
			$('div#flash_notice2').slideDown('slow');
	    }
	});
}

// Parse the response of the arena target
function parseTargetResponse(targetData){
	// Select the right row
	var el = longVersion ? $('div#tab-arena-1-content table tr td a[href^="javascript: select(\''+targetData.id+'"]') : $('div.main-content table tr td a[href="/heroes/'+targetData.id+'"]');
	
	// First of all check the clan
	if (GM_getValue('activateShowClan', true)) {
		if (targetData.clanname != null)
			el.attr('title', 'Clan: '+targetData.clanname);
		else if (!longVersion) {
			el.attr('style', 'background: #87FF00 none repeat scroll 0 0 !important');
		}
	}
	
	// Is the target in focus?
	var levelDiff = targetData.level - myCharacterData.level;
	if (levelDiff < 0 || levelDiff > 4 || targetData.id == myCharacterData.id)
		// Not in Focus or myself so do not append links
		return false;

	// Is the opponent in my clan?
	if (GM_getValue('markOwnClan', true)) {
		if (targetData.clanid == myCharacterData.clanid)
			el.html('<span style="background-color: red; color: white">'+targetData.name+'</span>');
	}

	// Add the target's AR and DR together
	var targetArDr = targetData.ar + targetData.dr;

	// Add the player's AR and DR together
	var myCharacterArDr = myCharacterData.ar + myCharacterData.dr;

	// Check the attitudes
	if ((myCharacterData.attitude == 'Shock & Awe' && targetData.attitude == 'Smart Moves') || (myCharacterData.attitude == 'Smart Moves' && targetData.attitude == 'Hit & Run') || (myCharacterData.attitude == 'Hit & Run' && targetData.attitude == 'Shock & Awe')) {
		var attitudeSign = upArrowImage;
	}
	else if (myCharacterData.attitude == targetData.attitude) {
		var attitudeSign = rightArrowImage;
	}
	else {
		var attitudeSign = downArrowImage;
	}

	// Check the magic
	if ((myCharacterData.magic == 'Low Magic' && targetData.magic == 'High Magic') || (myCharacterData.magic == 'Middle Magic' && targetData.magic == 'Low Magic') || (myCharacterData.magic == 'High Magic' && targetData.magic == 'Middle Magic')) {
		var magicSign = upArrowImage;
	}
	else if (myCharacterData.magic == targetData.magic) {
		var magicSign = leftArrowImage;
	}
	else {
		var magicSign = downArrowImage;
	}

	// This function is a VERY quick and dirty evaluation on the AR/DR stats
	// between the player and target. All it does is take the AR+DR stat of the
	// player and target and compare them. If the AR+DR of the target is higher, 
	// then color the link purple. Otherwise, check to see if it's 75%, 50%, or
	// less. This essentially gives us a "con" rating that looks like this:
	// 100% or more: purple
	// 75-100%: orange
	// 50-75%: yellow
	// 0-50%: green
	var ArDrColor;
	var textColor = "black";
	if(targetArDr > myCharacterArDr) {
	    ArDrColor = "purple";
	    textColor = "white";
	} else {
	    arPct = (targetArDr/myCharacterArDr)*100;
	    if(arPct > 50) {
		ArDrColor = "yellow";
		if(arPct > 75) {
		    ArDrColor = "orange";
		}
	    } else {
		ArDrColor = "green";
		textColor = "white";
	    }
	}

	// Piece together the HTML for the data we're about to insert
	var arSpan = '<span>' + targetData.ar + '</span>';
	var drSpan = '<span>' + targetData.dr + '</span>';

	// Append the HTML after the target's default <a> link
	// This is the fast fight link
	if ((longVersion && GM_getValue('activateArenaFFight', true)) || (!longVersion && GM_getValue('activateRankingFFight', true))) {
		newLine = longVersion ? '' : '<br />';
		$(el).after(newLine+'<a class="GM_FastFightLink" id="opponentf_'+el.attr('href').match(/\d+/)+'" style="cursor: pointer; margin-left: 10px;"><span style="background-color: steelblue; color: white">Fast Fight!</span></a>');
	}
	// Append the fight link
	if (longVersion && GM_getValue('activateArDr', true))
		$(el).after('<a class="GM_FightLink" id="opponent_'+el.attr('href').match(/\d+/)+'" style="cursor: pointer; margin-left: 10px;"><span style="background-color: '+ ArDrColor +'; color: ' + textColor + '">' + arSpan + '/' + drSpan + '</span></a>');

	// Append Attitude before the target's default <a> link
	if (attitudeSign != '') {
		$(el).before('<img src="'+attitudeSign+'" border="0" title="Opponents attitude: '+targetData.attitude+'" />');
	}

	// Append Magic after the target's default <a> link
	if (magicSign != '') {
		$(el).after('<img src="'+magicSign+'" border="0" title="Opponents magic: '+targetData.magic+'" />');
	}

	// This is the target's arena link, with a max wager assigned
	var targetHref = "http://legendsofzork.com/arena/fight?opponent="+el.attr('href').match(/\d+-[^\']+/)+"&wager="+maxWager;
	
	if ((longVersion && GM_getValue('activateArenaFFight', true)) || (!longVersion && GM_getValue('activateRankingFFight', true))) {
		// Assign a click handler to the newly inserted <a> links
		$(el).siblings('.GM_FastFightLink').click(function() {
		    // Use jQuery to set the fight
		    $.get(targetHref, function (respondPage){
		    	// First grab the FWP
			var fwp = respondPage.match(/<dt>Final Win Probability:<\/dt>\s+<dd class="big-number">\d+%<\/dd>/);
			fwp = parseInt(fwp[0].match(/\d+/));
			// and now the count of Fame we won or lost
			var fame = parseInt(respondPage.match(/\d+\sFame\sand\snow/));
		    	if (respondPage.match(/encounter-won/)) {
		    		$(el).siblings('.GM_FastFightLink').html('<span style="background-color: green; color: white">+'+fame+' Fame / '+fwp+'% FWP</span>');
		    	}
		    	else if (respondPage.match(/encounter-lost/)) {
		    		$(el).siblings('.GM_FastFightLink').html('<span style="background-color: firebrick; color: white">-'+fame+' Fame / '+fwp+'% FWP</span>');
		    	}
		    	else {
		    		$(el).siblings('.GM_FastFightLink').html('<a class="GM_FastFightLink" id="opponentf_'+el.attr('href').match(/\d+/)+'" style="cursor: pointer; margin-left: 10px;"><span style="background-color: steelblue; color: white">Fast Fight!</span></a>');
		    	}
		    });
		    
		    $(this).html('');
		    $('#opponent_'+el.attr('href').match(/\d+/)).html('');
		    // Decrease the APs by one
		    decreaseAP();
		    return false;
		});
	}

	if (longVersion && GM_getValue('activateArDr', true)) {
		$(el).siblings('.GM_FightLink').click(function() {
		    $('#opponent_'+el.attr('href').match(/\d+/)).html('');
		    $('#opponentf_'+el.attr('href').match(/\d+/)).html('');
		    // Use GreaseMonkey to open the link in a new tab
		    GM_openInTab(targetHref);
		    // And decrease the APs by one
		    decreaseAP();
		    return false;
		});
	}
}

// Check if players from the ranking page are "in focus"
function checkFocus() {
	var hitCount = 100; // Impossible value
	var playerId;
	$('.m-col-2 table tr td').each(function(intIndex) {
		hitCount--;
		if (!hitCount && (playerId != myId)) {
			var xp = parseInt($(this).text());
			// Iterate through the XP array to find out the level of the player
			var found = false;
			for (i in lozLevels) {
				if (xp < lozLevels[i] && !found) {
					found = true;
					if (i-myLevel <= 4 && i-myLevel >= 0)
						$(this).attr('style', 'background: #87FF00 none repeat scroll 0 0 !important');
					$(this).attr('title', 'Level: '+i);
				}
			}
			
		}
		
		// Use the profile like as an indicator for the XP td
		if($(this).html().match(/heroes\/\d+-/)) {
			hitCount = 2;
			// Player ID
			playerId = parseInt($(this).html().replace(/<a href=\"\/heroes\//, ""));
		}
	});
}

// Show discount value in Armory and Magic Shoppe
function showDiscount(shop) {
	if (!GM_getValue('activateDiscount', true))
		return;
	
	// different column for the shops
	var costBase = shop == 'magic' ? 3 : 4;
	for (i=1; i<=2; i++) {
		$('div#tab-'+shop+'-'+i+'-content table tr').each(function() {
			cost = parseInt($(this).children().eq(costBase).text().match(/^\d+/));
			// Ignore the first row
			if (!cost)
				return true;
				
			tmp = $(this).children().eq(costBase+1);
			// Calculate the discount
			discounted = parseInt(tmp.text().match(/^\d+/));
			percentage = ((cost/discounted -1)*100).toFixed(2);
			// And append it to the discounted value
			tmp.append('<br />'+percentage+'%');
			
			// Also check if we still need money to buy the item
			if (discounted > myZorkmids) {
				tmp = $(this).children().eq(costBase+2);
				// Ignore it when the item is already owned
				if (tmp.text().match(/You\salready\sown\sthis\./))
					return true;
					
				tmp.prepend('missing '+(discounted-myZorkmids)+'zm');
			}
		});
	}
}

// Get arguments out of a GET Request
function getURLArgument(name, url) {
	if (typeof url == 'undefined')
		url = window.location.search;
	else if (url.indexOf('?') == -1)
		return false;
	else
		url = url.substr(url.indexOf('?'));

	// No arguments?
	if (url == '')
		return false;

	// Strip the ? on the left and split the arguments
	var args = url.substr(1).split('&');

	// Now go through all found argument and look if we find the one we are searching
	for (i in args) {
		var pos = args[i].indexOf('=');
		if (pos != -1) {
			var argname = args[i].substr(0, pos);
			var argvalue = args[i].substr(pos+1);
		}
		else {
			// Arguments without value
			var argname = args[i];
			var argvalue = '';
		}

		// Is it what we are searching?
		if (argname == name)
			return argvalue;
	}
	// Nothing found
	return false;
}

// Function used by the GM menu
function goTo(where) {
	window.location.href='http://legendsofzork.com/'+where;
}

// Cookie functions
function getCookie(Name) {
    var search = Name + '='
    var returnvalue = '';
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(';', offset);
            if (end == -1) end = document.cookie.length;
            returnvalue=unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}

function setCookie(name,value,days,path,domain,secure) {
    var today = new Date();
    var cookie_expire_date = new Date(today.getTime() + (days * 24*60*60*1000));

    var cookieString = name + "=" +escape(value) +
        ( (cookie_expire_date) ? ";expires=" + cookie_expire_date.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
    document.cookie = cookieString;
}

// Delayed sliding up a notice
function closeNotice(divId, closeTime) {
	// Misc functions deactivated? Then just return
	if (!GM_getValue('activateMisc', true))
		return;
	
	// Set default values if no argument is sent
	if (!divId)
		divId = 'flash_notice2';
	
	// Check if we really need to close the notice
	switch (divId) {
		case 'flash_notice':
			// Closing game notices deactivated?
			if (!GM_getValue('closeGnotice', true))
				return;
			// No close time given?
			if (!closeTime)
				closeTime = GM_getValue('closeGnoticeTime', 3)*1000;
			break;
		case 'flash_error':
			// Closing game errors deactivated?
			if (!GM_getValue('closeGerror', true))
				return;
			// No close time given?
			if (!closeTime)
				closeTime = GM_getValue('closeGerrorTime', 3)*1000;
			break;
		default:
			// All other cases fit the script notices
			// Closing script notices deactivated?
			if (!GM_getValue('closeSnotice', true))
				return;
			// No close time given?
			if (!closeTime)
				closeTime = GM_getValue('closeSnoticeTime', 3)*1000;
			break;
	}

	setTimeout(function() { $('div#'+divId).slideUp('slow'); }, closeTime);
}
