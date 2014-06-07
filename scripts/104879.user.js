// ==UserScript==
// @name            MouseHunt GM Extended
// @namespace       http://userscripts.org/users/325306
// @description     Automatically sounds the hunter's horn and notifies about various events in the background. Allows management of stored trap setups. Displays desktop notifications when used with Autohotkey script.
// @version         1.3.6
// @author          Camarean, Bartsim
// @license         Creative Commons BY-NC-SA 3.0
// @include         http://www.mousehuntgame.com/*
// @include         https://www.mousehuntgame.com/*
// @include         http://apps.facebook.com/mousehunt/*
// @exclude         http://www.mousehuntgame.com/ads/*
// @exclude         http://www.mousehuntgame.com/canvas/*
// @exclude         https://www.mousehuntgame.com/ads/*
// @exclude         https://www.mousehuntgame.com/canvas/*
// ==/UserScript==

String.prototype.contains = function(str) { return this.indexOf(str) != -1; };
String.prototype.regexMatch = function(regex) { return regex.test(this); };

var browser = identifyBrowser();
var settings = loadSettings();

var MouseHuntGM_scriptId = '104879';
var currentVersion = '1.3.6';
var latestVersion = getValue('MouseHuntGM_LatestVersion', currentVersion);
var newVersionAvailable = false;

var nowTimeFull = new Date();
var nowTimeInMS = nowTimeFull.getTime();

var hudData, sidebar;

/* --------------------------------------------------------------------------------------------------------------------
 Main
-------------------------------------------------------------------------------------------------------------------- */

function initBot() {
	var pageHtml = document.getElementsByTagName('html')[0].innerHTML;
	if (pageHtml.contains('Lightning struck our server')) {
		document.title = 'Having server issues. Reloading in a few seconds. | MouseHunt';
		window.setTimeout(function() { window.location.reload(); }, 10000);
	} else if (pageHtml.contains('Login to see your account')) {
		document.title = 'Not logged in | MouseHunt';
	} else if (pageHtml.contains('MouseHunt will return shortly')) {
		document.title = 'Under maintenance | MouseHunt';
		window.setTimeout(function() { window.location.reload(); }, 180000);
	} else if (pageHtml.contains("The Tiny Mouse's little legs were too slow to fetch your data.")) {
		document.title = 'Failed to fetch data. Reloading in a few seconds. | MouseHunt';
		window.setTimeout(function() { window.location.reload(); }, 5000);
	} else {
		var hornTimeRemaining = parseInt(getBetween(pageHtml, '"next_activeturn_seconds":', ','));
		var lastHornTimestamp = parseInt(getBetween(pageHtml, '"last_activeturn_timestamp":', ','));
		var trapCheckTimeRemaining = calculateTrapCheck(settings.trapCheckTime, nowTimeFull);
		var cheeseRemaining = parseInt(getBetween(pageHtml, '"bait_quantity":', ','));
		
		var rewardPending = pageHtml.contains('"has_puzzle":true');
		var titlePercentage = getBetween(pageHtml, '"title_percentage":', ',');
		
		var currentHuntLocation = getBetween(pageHtml, '"location":"', '",');
		var fixedHuntLocation = unescape(getValue('fixedHuntLocation', ''));
	
		var autoHornEnabled = settings.autoHornEnabled;
		var hornDelay = randomise(settings.minHornDelay, settings.maxHornDelay);
		var hornForgottenRandomSeed = getObject('persistentSeed', {seed: nowTimeInMS, call: 0});
		var hornForgottenProbabilityDenominator = settings.hornForgottenProbabilityDenominator;
		var hornForgottenDelay = getHornForgottenDelay(hornForgottenProbabilityDenominator, settings.minHornForgottenDelay, settings.maxHornForgottenDelay, hornForgottenRandomSeed);
		if (hornForgottenDelay > 0) {
			incrementAndStoreSeed(hornForgottenRandomSeed, hornForgottenProbabilityDenominator);
		}
		var trapCheckDelay = randomise(settings.minTrapCheckDelay, settings.maxTrapCheckDelay);
		
		var nextHornTime = calculateNextTime(hornTimeRemaining + (autoHornEnabled ? hornDelay + hornForgottenDelay : 0), nowTimeInMS);
		var nextTrapCheckTime = calculateNextTime(trapCheckTimeRemaining + (autoHornEnabled ? trapCheckDelay : 0), nowTimeInMS);
		
		var hunterStatus = getHunterStatus();
		var trapCheckInactive = true;
		var hornAttempts = 0;
		
		writeHudEnhancements(currentHuntLocation);
		preCountdownUpdates();
		
		if (window.location.href.regexMatch(/^https?:\/\/www\.mousehuntgame\.com\/(?:(?:index|turn|journal)\.php)?(?:\?.*locale=\w\w.*)?$/)) {
			initSetupManager();
			var allowActivity = autoHornEnabled;
			if (hornTimeRemaining == 0 && hunterStatus == 'Normal') {
				window.setTimeout(soundTheHorn, 5000);
				incrementAndStoreSeed(hornForgottenRandomSeed, hornForgottenProbabilityDenominator);
			} else {
				initCountdown('HuntersCamp');
			}
		} else {
			var allowActivity = false;
			if (window.location.href.contains('profile.php?snuid=')) {
				initCountdown('HuntersProfile');
			} else {
				initCountdown('InactivePage');
			}
		}
	}
	pageHtml = null;

	function initCountdown(mhPage) {
		switch (hunterStatus) {
		case 'Normal':
			switch (mhPage) {
			case 'HuntersCamp':
				if (trapCheckTimeRemaining < hornTimeRemaining && settings.trapCheckEnabled) {
					updateStatus('Waiting for next trap check time...');
				} else {
					updateStatus('Waiting for next horn time...');
				}
				break;
			case 'InactivePage':
				updateStatus('Autohunting has been disabled. Return to the <a href="' + getPageProtocol() + '://www.mousehuntgame.com/">\
						Hunter\'s Camp</a> to resume script activity.');
				break;
			case 'HuntersProfile':
				var hpIntervalRemaining = randomise(settings.minHpInterval, settings.maxHpInterval) * 60;
				var nextHpRefresh = calculateNextTime(hpIntervalRemaining, nowTimeInMS);
				
				var titleMessage = 'Hunter\'s Profile';
				updateStatus('Autohunting has been disabled. Return to the <a href="' + getPageProtocol() + '://www.mousehuntgame.com/">\
						Hunter\'s Camp</a> to resume script activity.');
				
				countdownHuntersProfile();
				break;
			}
			updateHornDelays(formatTimer(parseInt(hornDelay)), formatTimer(parseInt(hornForgottenDelay)));
			break;
		case 'KingsReward':
			document.getElementsByName('puzzle_answer')[0].focus();
			var krTimeRemaining = randomise(settings.minKrInterval, settings.maxKrInterval) * 60;
			var nextKrRefresh = calculateNextTime(krTimeRemaining, nowTimeInMS);
			
			if (settings.krAlertEnabled) {
				var soundAlert = document.createElement('div');
				soundAlert.innerHTML = '\
						<embed src="https://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid"\
						type="audio/midi" autostart="true" hidden="true" loop="true" mastersound enablejavascript="true">\
							<noembed>\
								<bgsound src="https://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid" loop="infinite">\
							</noembed>\
						</embed>';
				getPageElement('fb-root').appendChild(soundAlert);
			}
			
			var titleMessage = 'King\'s Reward is pending.';
			updateStatus('Autohunting has been disabled. King\'s reward is pending.');
			allowActivity = false;
			
			kingsRewardWatcher();
			if (autoHornEnabled) {
				countdownKingsReward();
			}
			break;
		case 'InvalidLocation':
			var titleMessage = 'Invalid location';
			updateStatus('Autohunting has been disabled. Thrown out of predefined hunting location.');
			updateHornDelays(formatTimer(parseInt(hornDelay)), hornForgottenDelay);
			allowActivity = false;
			break;
		case 'BotDisabled':
			var titleMessage = 'Autohunting disabled';
			updateStatus('Autohunting has been disabled. Change your settings to re-enable it.');
			allowActivity = false;
			break;
		case 'NoCheese':
			var titleMessage = 'Out of cheese';
			updateStatus('Autohunting has been disabled. You are out of cheese.');
			allowActivity = false;
			break;
		}
		
		countdownHorn();
		
		if (trapCheckInactive) {
			countdownTrapCheck();
			trapCheckInactive = false;
		}	
	
		function countdownHorn() {
			hornTimeRemaining = nextHornTime - (new Date()).getTime();
			if (hornTimeRemaining >= 0) {
				document.title = formatTimer(parseInt(hornTimeRemaining / 1000)) + (titleMessage == undefined ? '' : ' | ' + titleMessage) + ' | MouseHunt';
				updateHornTimer(formatTimer(parseInt(hornTimeRemaining / 1000)));
				
				window.setTimeout(countdownHorn, 1000);
			} else {
				if (allowActivity) {
					soundTheHorn();
					incrementAndStoreSeed(hornForgottenRandomSeed, hornForgottenProbabilityDenominator);
				} else {
					document.title = 'Horn Ready' + (titleMessage == undefined ? '' : ' | ' + titleMessage) + ' | MouseHunt';
					hornSoundedWatcher();
				}
			}
		}
		
		function hornSoundedWatcher() {
			var hornStatus = getPageElement('header').getAttribute('class');
			var freshHornTimestamp = getPageVariable('user.last_activeturn_timestamp', 'n');
			if ((freshHornTimestamp != lastHornTimestamp) && hornStatus.contains('hornwaiting')) {
				extractData(mhPage);
			} else {
				window.setTimeout(hornSoundedWatcher, 5000);
			}
		}
		
		function countdownHuntersProfile() {
			hpTimeRemaining = nextHpRefresh - (new Date()).getTime();
			if (hpTimeRemaining >= 0) {
				updateStatus('Autohunting has been disabled. Reloading hunter\'s profile in ' + formatTimerLong(parseInt(hpTimeRemaining / 1000)));
				window.setTimeout(countdownHuntersProfile, 1000);
			} else {
				window.location.reload();
			}
		}
		
		function countdownKingsReward() {
			krTimeRemaining = nextKrRefresh - (new Date()).getTime();
			if (krTimeRemaining >= 0) {
				updateStatus('Autohunting has been disabled. King\'s reward is pending. (Refreshing in ' + formatTimerLong(parseInt(krTimeRemaining / 1000)) + ')');
				window.setTimeout(countdownKingsReward, 1000);
			} else {
				window.location.assign(getPageProtocol() + '://www.mousehuntgame.com/');
			}
		}
		
		function countdownTrapCheck() {
			trapCheckTimeRemaining = nextTrapCheckTime - (new Date()).getTime();
			if (!settings.trapCheckEnabled) {
				updateTrapCheckTimer('Disabled');
			} else if (trapCheckTimeRemaining >= 0) {
				updateTrapCheckTimer(formatTimerLong(parseInt(trapCheckTimeRemaining / 1000)));
				window.setTimeout(countdownTrapCheck, 1000);
			} else {
				updateTrapCheckTimer('Now!');
				if (allowActivity) {
					updateStatus('Checking trap...');
					
					window.location.assign(getPageProtocol() + '://www.mousehuntgame.com/');
				}
			}
		}
	}
		
	function extractData(mhPage) {
		hornTimeRemaining = getPageVariable('user.next_activeturn_seconds', 'n');
		lastHornTimestamp = getPageVariable('user.last_activeturn_timestamp', 'n');
		cheeseRemaining = getPageVariable('user.bait_quantity', 'n');
		rewardPending = getPageVariable('user.has_puzzle', 'b');
		titlePercentage = getPageVariable('user.title_percentage', 's');
		currentHuntLocation = getPageVariable('user.location', 's');

		nowTimeInMS = (new Date()).getTime();
		hornDelay = randomise(settings.minHornDelay, settings.maxHornDelay);
		hornForgottenRandomSeed = getObject('persistentSeed', {seed: nowTimeInMS, call: 0});
		hornForgottenProbabilityDenominator = settings.hornForgottenProbabilityDenominator;
		hornForgottenDelay = getHornForgottenDelay(hornForgottenProbabilityDenominator, settings.minHornForgottenDelay, settings.maxHornForgottenDelay, hornForgottenRandomSeed);
		nextHornTime = calculateNextTime(hornTimeRemaining + (autoHornEnabled ? hornDelay + hornForgottenDelay : 0), nowTimeInMS);
		
		hunterStatus = getHunterStatus();
		preCountdownUpdates();
		
		initCountdown(mhPage);
	}
	
	function getHunterStatus() {
		if (rewardPending) return 'KingsReward';
		else if (settings.locationLockEnabled && currentHuntLocation != fixedHuntLocation) return 'InvalidLocation';
		else if (cheeseRemaining == 0) return 'NoCheese';
		else if (!autoHornEnabled) return 'BotDisabled'
		else return 'Normal';
	}
	
	function kingsRewardWatcher() {
		var puzzleContainer = getPageElement('puzzleContainer');
		if (puzzleContainer.innerHTML.contains('resume_hunting_blue')) {
			window.location.assign(getPageProtocol() + '://www.mousehuntgame.com/');
		} else {
			window.setTimeout(kingsRewardWatcher, 1000);
		}
	}
	
	function soundTheHorn() {
		var hornStatus = getPageElement('header').getAttribute('class');
		var hornButtonContainer = document.getElementsByClassName('hornbutton')[0];
		var hornButtonDisplayStyle = getComputedStyle(hornButtonContainer).display;
		
		if ((hornStatus.contains('ready') && !(hornButtonDisplayStyle.contains('none'))) || settings.forceHornEnabled) {
			document.title = 'Sounding the horn';
			updateStatus('Sounding the horn...');
			hornAttempts += 1;
			
			fireEvent(hornButtonContainer.firstChild, 'click');
			window.setTimeout(postHornEvent, 5000);
		} else {
			document.title = 'Updating timer data';
			updateHornTimer('Updating...')
			updateStatus('Timers out of sync. Updating timer data...');
			
			window.location.reload();
		}
		
		function postHornEvent() {
			hornStatus = getPageElement('header').getAttribute('class');
			if (hornStatus.contains('sounding')) {
				window.setTimeout(postHornEvent, 5000);
			} else if (hornStatus.contains('sounded')) {
				if (getPageElement('hornTitle').firstChild.firstChild.innerHTML.contains('reward')) {
					window.location.replace(getPageProtocol() + '://www.mousehuntgame.com/');
				} else {
					window.setTimeout(postHornEvent, 5000);
				}
			} else if (hornStatus.contains('ready')) {
				if (hornAttempts > 3 && trapCheckInactive) {
					document.title = 'Unable to sound the horn.';
					updateStatus('Unable to sound the horn. Reloading...');
				
					window.location.reload();
				} else {
					soundTheHorn();
				}
			} else {
				document.title = 'Updating timer data';
				updateHornTimer('Updating...');
				updateStatus('Updating timer data...');
				hornAttempts = 0;
				
				window.setTimeout(function() { extractData('HuntersCamp'); }, 400);
			}
		}
	}
	
	function preCountdownUpdates() {
		hudData.titlePercentage.innerHTML = titlePercentage;
		if (settings.locationLockEnabled) {
			updateLocation(currentHuntLocation == fixedHuntLocation ? fixedHuntLocation : 
					'<span style="color: red;"><b>' + fixedHuntLocation + '</b></span>');
		}
	}
}

function getPage() {
	if (window.location.href.contains('apps.facebook.com/mousehunt')) return 'fb';
	else if (window.location.href.contains('www.mousehuntgame.com')) return 'mhg';
}

function loadSettings() {
	return {
		minHornDelay: getValue('minHornDelay', 20),
		maxHornDelay: getValue('maxHornDelay', 60),
		
		hornForgottenProbabilityDenominator: getValue('hornForgottenProbabilityDenominator', 8),
		minHornForgottenDelay: getValue('minHornForgottenDelay', 5),
		maxHornForgottenDelay: getValue('maxHornForgottenDelay', 10),
		
		minTrapCheckDelay: getValue('minTrapCheckDelay', 20),
		maxTrapCheckDelay: getValue('maxTrapCheckDelay', 90),
		
		minKrInterval: getValue('minKrInterval', 15),
		maxKrInterval: getValue('maxKrInterval', 20),
		
		minHpInterval: getValue('minHpInterval', 15),
		maxHpInterval: getValue('maxHpInterval', 20),
		
		autoHornEnabled: getValue('autoHornEnabled', true),
		trapCheckEnabled: getValue('trapCheckEnabled', true),
		autoRedirectEnabled: getValue('autoRedirectEnabled', false),
		forceHornEnabled: getValue('forceHornEnabled', false),
		krAlertEnabled: getValue('krAlertEnabled', false),
		locationLockEnabled: getValue('locationLockEnabled', false),

		trapCheckTime: getValue('trapCheckTime', 0),
		updateSchedule: getValue('updateSchedule', 3)
	};
}

function calculateNextTime(timeRemaining, now) {
	return now + (timeRemaining * 1000);
}

function getHornForgottenDelay(probabilityDenominator, minDelayMins, maxDelayMins, seed) {
	var delay = 0;
	var ran;
	if (probabilityDenominator > 0) {
		if ((ran = randomise(1, probabilityDenominator, seed)) == 1) {
			delay = randomise(minDelayMins, maxDelayMins) * 60;
		}
	}
	return delay;
}

function incrementAndStoreSeed(seed, probability) {
	if (probability > 0) {
		seed.call++;
		if (seed.call >= (probability * 10)) {
			seed.seed = (new Date()).getTime();
			seed.call = 0;
		}
		setObject('persistentSeed', seed);
	}
}

function calculateTrapCheck(setting, now) {
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var tcTime = (setting * 60) - ((minute * 60) + second);
	return (minute >= setting) ? tcTime + 3600 : tcTime;
}

function checkForUpdates(version, timestamp) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://userscripts.org/scripts/source/' + MouseHuntGM_scriptId + '.meta.js',
		onload: function(response) {
			if (response.status == 200) {
				setValue('MouseHuntGM_LastUpdateCheck', timestamp);
				var metaArray = response.responseText.split('\n');
				for (var line in metaArray) {
					var meta = trimString(metaArray[line].substring(3));
					if (meta.contains('UserScript==')) continue;
					if (meta.contains('@version')) {
						var metaVersion = trimString(meta.substring(8));
						if (version != metaVersion) {
							setValue('MouseHuntGM_LatestVersion', metaVersion);
						}
					}
				}
			}
		}
	});
}

function formatTimer(time) {
	var seconds = time % 60;
	return parseInt(time / 60) + (seconds < 10 ? ':0' : ':') + seconds;
}

function formatTimerLong(time) {
	var minutes = parseInt(time / 60);
	var seconds = time % 60;
	return minutes + (minutes == 1 ? ' minute' : ' minutes') + ' and ' + seconds + ' seconds';
}

// writeCorrections function contributed by userscripts.org user "bartsim".
function writeCorrections() {
	function correct(event) {
		switch (event.target.id) {
		case 'componentCategories':
			event.target.style.paddingLeft = '14px';
			event.target.style.width = '521px';
			break;
		case 'availableComponentsContainer':
			event.target.style.paddingLeft = '6px';
			event.target.style.width = '536px';
			break;
		case 'selectedComponentsContainer':
			event.target.style.marginLeft = '545px';
			break;
		}
	}

	if (navigator.platform.contains('Linux') && browser == 'Firefox') {
		var rootNode = document.getElementsByTagName('html')[0];
		rootNode.addEventListener('DOMNodeInserted', correct, false);

		var leftCol = document.getElementsByClassName('campLeft');
		if (leftCol.length > 0 && getPageElement('trapSelector')) {
			leftCol[0].style.width = '370px';
			getPageElement('trapSelector').style.width = '370px';
			getPageElement('trapSelectorBrowserControls').style.backgroundRepeat = 'repeat-x';
			getPageElement('trapSelectorBrowser').style.width = '364px';
			getPageElement('trapSelectorStats').style.backgroundRepeat = 'repeat-x';
		}

		var styleSheets = document.styleSheets;
		StyleLoop: for (var i = 0; i < styleSheets.length; i++) {
			if (styleSheets[i].href != null && styleSheets[i].href.contains('camp.css')) {
				var currSheetRules = styleSheets[i].cssRules;
				for (var j = 0; j < currSheetRules.length; j++) {
					if (currSheetRules[j].selectorText == '#trapSelectorStats .stat .help') {
						currSheetRules[j].style.setProperty('width', '354px', null);
						break StyleLoop;
					}
				}
			}
		}

		var hudelems = document.getElementsByClassName('hudstatlist');
		for (var i = 0; i < hudelems.length; i++) {
			hudelems[i].style.marginLeft = '2px';
			hudelems[i].style.marginRight = '2px';
		}
		getPageElement('cheeseped').style.width = '155px';
	}
}

function writeHudEnhancements(location) {
	if (settings.locationLockEnabled) {
		hudData.huntLocation.innerHTML += ' [<a id="lockSwitch" href="' + window.location.href + '">Unlock</a>]';
		getPageElement('lockSwitch').addEventListener('click', 
			function() {
				setValue('locationLockEnabled', false);
				removeValue('fixedHuntLocation');
			}, false);		
	} else {
		hudData.huntLocation.innerHTML += ' [<a id="lockSwitch" href="' + window.location.href + '">Lock</a>]';
		getPageElement('lockSwitch').addEventListener('click', 
			function() {
				setValue('locationLockEnabled', true);
				setValue('fixedHuntLocation', escape(location));
			}, false);
	}
	
	var hudRealHorn = document.getElementById('huntTimer');
	hudRealHorn.style.display = 'none';
	
	hudData.hornTimer.className = 'hunttimer';
	hudRealHorn.parentNode.insertBefore(hudData.hornTimer, hudRealHorn);
	
	document.getElementsByClassName('version')[0].innerHTML += ' [with MouseHunt GM v' + currentVersion + ']';
}

function writeSidebar(page) {
	var sidebarReferenceNode = document.getElementsByClassName(page == 'mhg' ? 'hgAppContainer' : 'UIStandardFrame_SidebarAds')[0];
	var sidebarContainer = document.createElement('div');
	sidebarContainer.id = 'sidebarContainer';
	sidebarContainer.style.marginLeft = '775px';
	sidebarContainer.style.paddingTop = '10px';
	sidebarContainer.style.paddingBottom = '20px';
	sidebarReferenceNode.parentNode.insertBefore(sidebarContainer, (page == 'mhg' ? sidebarReferenceNode.nextSibling : sidebarReferenceNode));
	
	var sidebarHeader = document.createElement('div');
	sidebarHeader.innerHTML = '<b>MouseHunt GM </b> [version ' + currentVersion +  ']<hr />';
	sidebarContainer.appendChild(sidebarHeader);
	
	switch (page) {
	case 'fb':
		var sidebarFacebook = document.createElement('div');
		sidebarFacebook.innerHTML = '\
			MouseHunt on Facebook is unsupported. Run the script on the main site for full functionality.<br /><br />\
			<div style="text-align: center;">\
				<input type="button" id="redirectButton"' + (settings.autoRedirectEnabled ? ' value="Redirecting in 5 seconds..." disabled="true" ' : ' value="Take me there!" ') + '"/><br />\
				<input type="checkbox" id="autoRedirectEnabled" ' + (settings.autoRedirectEnabled ? 'checked="true"' : '') + ' /> Automatically redirect me next time<br />\
			</div>\
			<hr /><br /><br />';
		sidebarContainer.appendChild(sidebarFacebook);
		
		getPageElement('redirectButton').addEventListener('click', 
			function() {
				setValue('autoRedirectEnabled', getPageElement('autoRedirectEnabled').checked);
				document.title = 'Redirecting to mousehuntgame.com';
				window.location.assign(getPageProtocol() + '://www.mousehuntgame.com/');
			}, false);
		break;	
	case 'mhg':
		sidebarContainer.style.width = '190px';
		var sidebarUpdates = document.createElement('div');
		sidebarUpdates.id = 'sidebarUpdates';
		sidebarUpdates.style.display = 'none';
		sidebarContainer.appendChild(sidebarUpdates);
		
		var sidebarDisplayNewVersion = 
			function(newVersion) {
				sidebarUpdates.innerHTML = '\
					<b>An update is available!</b><br />\
					Current version: ' + currentVersion + '<br />\
					Latest version: ' + newVersion + '<br />\
					<div style="text-align: center;">\
						<input type="button" id="installUpdateButton" value="Install update" />\
					</div><hr />';
				sidebarUpdates.style.display = 'inline';
					
				getPageElement('installUpdateButton').addEventListener('click', 
					function() { window.location.assign('https://userscripts.org/scripts/source/' + MouseHuntGM_scriptId + '.user.js'); }, false);
			};
		
		if (newVersionAvailable) {
			sidebarDisplayNewVersion(latestVersion);
		}
		
		var sidebarSettingsHandle = document.createElement('div');
		sidebarSettingsHandle.innerHTML = '<b>Settings</b> [ expand ] <hr />';
		sidebarSettingsHandle.setAttribute('style', 'cursor: pointer;');
		
		var sidebarSettings = document.createElement('div');
		sidebarSettings.id = 'sidebarSettings';
		sidebarSettings.style.display = 'none';
		sidebarSettings.innerHTML = '\
			<b>Horn Delay</b> (in secs)<br />\
			Min: <input type="text" size="2" id="minHornDelay" value="' + settings.minHornDelay + '" /> \
			Max: <input type="text" size="2" id="maxHornDelay" value="' + settings.maxHornDelay + '" /><br /> \
			\
			<b>Horn Forgotten Probability</b><br />\
			Probability of forgetting to sound the horn on each hunt (0 to disable): <div style="text-align: center;"><b>1 / </b>\
			<input type="text" size="2" id="hornForgottenProbabilityDenominator" value="' + settings.hornForgottenProbabilityDenominator + '" /></div>\
			\
			<b>Horn Forgotten Delay</b> (in mins)<br />\
			Min: <input type="text" size="2" id="minHornForgottenDelay" value="' + settings.minHornForgottenDelay + '" /> \
			Max: <input type="text" size="2" id="maxHornForgottenDelay" value="' + settings.maxHornForgottenDelay + '" /><br />\
			\
			<b>Trap Check Delay</b> (in secs)<br />\
			Min: <input type="text" size="2" id="minTrapCheckDelay" value="' + settings.minTrapCheckDelay + '" /> \
			Max: <input type="text" size="2" id="maxTrapCheckDelay" value="' + settings.maxTrapCheckDelay + '" /><br />\
			\
			<b>King\'s Reward Recheck</b> (in mins)<br />\
			Min: <input type="text" size="2" id="minKrInterval" value="' + settings.minKrInterval + '" /> \
			Max: <input type="text" size="2" id="maxKrInterval" value="' + settings.maxKrInterval + '" /><br /><br />\
			\
			<input type="checkbox" id="autoHornEnabled" ' + (settings.autoHornEnabled ? 'checked="true"' : '') + '" /> <b>Automatic horn sounding <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Autohunting)</b><br />\
			<input type="checkbox" id="trapCheckEnabled" ' + (settings.trapCheckEnabled ? 'checked="true"' : '') + '" /> Automatic trap checks<br />\
			<input type="checkbox" id="forceHornEnabled" ' + (settings.forceHornEnabled ? 'checked="true"' : '') + ' /> Force sounding the horn<br />\
			<input type="checkbox" id="krAlertEnabled" ' + (settings.krAlertEnabled ? 'checked="true"' : '') + '" /> King\'s Reward sound alerts<br />\
			<br />\
			\
			<b>Trap Check Setting</b>:\
			<select id="trapCheckTime">\
				<option value="0" ' + (settings.trapCheckTime == 0 ? 'selected="true"' : '') + '>00</option>\
				<option value="15" ' + (settings.trapCheckTime == 15 ? 'selected="true"' : '') + '>15</option>\
				<option value="30" ' + (settings.trapCheckTime == 30 ? 'selected="true"' : '') + '>30</option>\
				<option value="45" ' + (settings.trapCheckTime == 45 ? 'selected="true"' : '') + '>45</option>\
			</select><br /><br />\
			<b>Automatic Updates</b><br />\
			' + (browser == 'Firefox' ? '\
			Check every <input type="text" size="2" id="updateSchedule" value="' + settings.updateSchedule + '" /> days\
			<div style="text-align: center;">\
				<input type="button" id="checkUpdatesButton" value="Check for updates now" />\
			</div>\
			' : 'Automatic Updates for ' + browser + ' are not supported. You can check for updates \
			<a href="https://userscripts.org/scripts/show/' + MouseHuntGM_scriptId + '" target="_blank">here</a>.<br />') + '<br />\
			<b>Raw Trap Setup Data</b> <span id="toggleRawSetupEditButton" style="cursor: pointer; font-family: monospace;">[&nbsp;+&nbsp;]</span><br />\
			<b>(only edit if you know what you\'re doing)</b>\
			<div id="toggleRawSetupEditContainer" style="text-align: center; display: none;">\
				<textarea id="trapSetupRawData" cols="21" rows="10"></textarea>\
				<div style="text-align: center;"><input id="saveTrapSetupDataButton" type="button" value="Save Raw Setup Data"/></div>\
			</div>\
			<br /><br />\
			<div style="text-align: center;">\
				<input type="button" id="saveSettingsButton" value="Save Settings" />\
			</div><hr />';
		
		sidebarContainer.appendChild(sidebar.hornTimer);
		sidebarContainer.appendChild(sidebar.hornDelays);
		sidebarContainer.appendChild(sidebar.trapCheckTimer);
		sidebarContainer.appendChild(sidebar.huntLocation);
		sidebarContainer.appendChild(sidebar.status);
		sidebarContainer.appendChild(sidebarSettingsHandle);
		sidebarContainer.appendChild(sidebarSettings);
		
		sidebarSettingsHandle.addEventListener('click', 
			function() {
				if (sidebarSettings.style.display == 'none') {
					sidebarSettingsHandle.innerHTML = '<b>Settings</b> [ collapse ]<hr />';
					sidebarSettings.setAttribute('style', 'display: inline;');
				} else {
					sidebarSettingsHandle.innerHTML = '<b>Settings</b> [ expand ] <hr />';
					sidebarSettings.setAttribute('style', 'display: none;');
				}
			}, false);
		
		var trapSetupRawData = getPageElement('trapSetupRawData');
		var saveTrapSetupDataButton = getPageElement('saveTrapSetupDataButton');
		if (saveTrapSetupDataButton && trapSetupRawData) {
			saveTrapSetupDataButton.addEventListener('click',
				function() {
					var data = trapSetupRawData.value;
					if (data == '') {
						data = '[]';
					} else {
						data = data.replace(/\bhttps?/g, getPageProtocol());
					}
					
					try {
						data = JSON.parse(data.toString());
					} catch (e) {
						data = null;
					}
					
					if (setupManagerDataLoaded() && data != null) {
						storeSetups(data);
						window.location.reload();
					}
				}, false);
		}
		
		var toggleRawSetupEditButton = getPageElement('toggleRawSetupEditButton');
		var toggleRawSetupEditContainer = getPageElement('toggleRawSetupEditContainer');
		if (toggleRawSetupEditButton && toggleRawSetupEditContainer) {
			toggleRawSetupEditButton.addEventListener('click',
				function() {
					if (toggleRawSetupEditContainer.style.display == 'none') {
						toggleRawSetupEditButton.innerHTML = '[&nbsp;-&nbsp;]';
						toggleRawSetupEditContainer.setAttribute('style', 'display: inline;');
					} else {
						toggleRawSetupEditButton.innerHTML = '[&nbsp;+&nbsp;]';
						toggleRawSetupEditContainer.setAttribute('style', 'display: none;');
					}
				}, false);
		}
		
		var checkUpdatesButton = getPageElement('checkUpdatesButton');
		if (checkUpdatesButton) {
			checkUpdatesButton.addEventListener('click',
				function() {
					function checkVersionUpdateArrived() {
						if (getValue('MouseHuntGM_LastUpdateCheck', nowTimeInMS) != nowTimeInMS) {
							window.setTimeout(checkVersionUpdateArrived, 1000);
						} else {
							showVersionMessage();
						}
					};
				
					function showVersionMessage() {
						latestVersion = getValue('MouseHuntGM_LatestVersion', currentVersion);
						newVersionAvailable = compareVersion(currentVersion, latestVersion);
						if (newVersionAvailable) {
							sidebarDisplayNewVersion(latestVersion);
						} else {
							sidebarUpdates.innerHTML = '<b>No new updates available :-(</b><hr />';
							sidebarUpdates.style.display = 'inline';
						}
						flashContainer(sidebarUpdates);
					};
				
					checkForUpdates(currentVersion, nowTimeInMS);
					checkVersionUpdateArrived();
				}, false);
		}
			
		getPageElement('saveSettingsButton').addEventListener('click', 
			function() {
				setValue('minHornDelay', parseInt(getPageElement('minHornDelay').value));
				setValue('maxHornDelay', parseInt(getPageElement('maxHornDelay').value));
				
				setValue('hornForgottenProbabilityDenominator', parseInt(getPageElement('hornForgottenProbabilityDenominator').value));
				setValue('minHornForgottenDelay', parseInt(getPageElement('minHornForgottenDelay').value));
				setValue('maxHornForgottenDelay', parseInt(getPageElement('maxHornForgottenDelay').value));
				
				setValue('minTrapCheckDelay', parseInt(getPageElement('minTrapCheckDelay').value));
				setValue('maxTrapCheckDelay', parseInt(getPageElement('maxTrapCheckDelay').value));
				
				setValue('minKrInterval', parseInt(getPageElement('minKrInterval').value));
				setValue('maxKrInterval', parseInt(getPageElement('maxKrInterval').value));
				
				setValue('autoHornEnabled', getPageElement('autoHornEnabled').checked);
				setValue('trapCheckEnabled', getPageElement('trapCheckEnabled').checked);
				setValue('forceHornEnabled', getPageElement('forceHornEnabled').checked);
				setValue('krAlertEnabled', getPageElement('krAlertEnabled').checked);
				
				var newTcSetting = getPageElement('trapCheckTime');
				setValue('trapCheckTime', parseInt(newTcSetting.options[newTcSetting.selectedIndex].value));
				if (browser == 'Firefox') {
					setValue('updateSchedule', parseInt(getPageElement('updateSchedule').value));
				}
				
				window.location.reload();
			}, false);
		
		break;
	}
}

function updateHornTimer(update) {
	hudData.hornTimer.innerHTML = '<span class="timerlabel">Next Hunt:</span> ' + update;
	sidebar.hornTimer.innerHTML = '<span style="font-size: 115%; font-weight: bold;">Next hunt in: ' + update + ' mins</span>';
}

function updateHornDelays(hornDelay, hornForgottenDelay) {
	sidebar.hornDelays.innerHTML = '<b>Added delays:</b><br />Random: ' + hornDelay + ' mins<br />Forgotten: ' + hornForgottenDelay + ' mins';
}

function updateTrapCheckTimer(update) {
	sidebar.trapCheckTimer.innerHTML = '<b>Next trap check in:</b><br />' + update;
}

function updateLocation(update) {
	sidebar.huntLocation.innerHTML = '<b>Location locked to:</b><br />'+ update;	
}

function updateStatus(update) {
	sidebar.status.innerHTML = '<b>Status:</b><br />' + update + '<hr /><br /><br />';
}

/* --------------------------------------------------------------------------------------------------------------------
 Sub
-------------------------------------------------------------------------------------------------------------------- */

function getPageProtocol() {
	var protocol = /^(https?):.*/.exec(window.location.href)[1];
	return (protocol != null && protocol != '') ? protocol : 'http';
}

function compareVersion(current, latest) {
	current = current.split('.');
	latest = latest.split('.');	
	for (var number in current) {
		if (latest[number] == current[number]) continue;
		return latest[number] > current[number];
	}
	return false;
}

function identifyBrowser() {
	if (navigator.userAgent.regexMatch(/Firefox[\/\s]\d+\.\d+/)) return 'Firefox';
	else if (navigator.userAgent.regexMatch(/Chrome\/\d+\.\d+/)) return 'Chrome';
	else if (navigator.userAgent.regexMatch(/Opera\/\d+\.\d+/)) return 'Opera';
	else return 'Unsupported';
}

function getBetween(source, start, end) {
	var indexStart = source.indexOf(start);
	var indexEnd = source.indexOf(end, indexStart);
	return (indexEnd > indexStart && indexStart > -1) ? source.substring(indexStart + start.length, indexEnd) : '';
}

function getPageElement(id) {
	return document.getElementById(id) || null;
}

function getPageVariable(name, type) {
	var value = '';
	
	switch (browser) {
	case 'Firefox': case 'Opera':
		value = eval('typeof unsafeWindow.' + name + ' == "undefined" ? "" : unsafeWindow.' + name);
		break;
	case 'Chrome':
		var scriptElement = document.createElement('script');
		scriptElement.id = 'scriptElement';
		scriptElement.type = 'text/javascript';
		scriptElement.innerHTML = "document.getElementById('scriptElement').textContent = typeof " + name + " == 'undefined' ? '' : " + name + ';';
		document.body.appendChild(scriptElement);
		value = scriptElement.innerHTML;
		value = convertType(value, type);
		document.body.removeChild(scriptElement);
		break;
	}
	
	return value;
}

function callPageAPIFunction(call, returnType) {
	var result = '';
	
	switch (browser) {
	case 'Firefox': case 'Opera':
		result = eval('unsafeWindow.' + call);
		if (result == null) {
			result = '';
		}
		break;
	case 'Chrome':
		var scriptElement = document.createElement('script');
		scriptElement.id = 'scriptElement';
		scriptElement.type = 'text/javascript';
		
		var scriptContent = 'var result = ' + call + "; if (result == null) result = '';" 
		if (returnType == 'o') {
			scriptContent += 'result = JSON.stringify(result);';
		}
		scriptContent += "document.getElementById('scriptElement').textContent = result;";
		scriptElement.innerHTML = scriptContent;
		
		document.body.appendChild(scriptElement);
		do {
			result = scriptElement.innerHTML;
		} while (result.regexMatch(/^var result/));
		result = convertType(result, returnType);
		document.body.removeChild(scriptElement);
		break;
	}
	
	return result;
}

function convertType(value, type) {
	if (value != null) {
		switch (type) {
		case 'n':
			value = Number(value.toString());
			break;
		case 'b':

			value = value.toString() == 'true';
			break;
		case 's':
			value = value.toString();
			break;
		case 'o':
			try {
				value = JSON.parse(value.toString());
			} catch (e) {
			}
			break;
		}
	}
	
	return value;
}

function getValue(key, defaultValue) {
	var value = localStorage.getItem(key);
	if (!value) return defaultValue;
	
	var dataType = value[0];
	value = value.substring(1);
	return convertType(value, dataType);
}

function getObject(key, defaultObject) {
	var value = getValue(key, null);
	var object = defaultObject;
	
	if (value != null && typeof(value).toLowerCase() == 'string') {
		var convertedValue = convertType(value, 'o');
		if ((typeof convertedValue).toLowerCase() == 'object') {
			object = convertedValue;
		}
	}
	return object;
}

function setValue(key, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(key, value);
}

function setObject(key, object) {
	setValue(key, JSON.stringify(object));
}

function removeValue(key) {
	localStorage.removeItem(key);
}

function trimString(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function randomise(minValue, maxValue, seed) {
	if (seed == null) {
		seed = { seed: (new Date()).getTime(),
		         call: 0 };
	}
	var generator = Alea(seed.seed);
	
	var randNumber;
	for (var i = 0; i <= seed.call; i++) {
		randNumber = generator();
	}
	
	return Math.floor(randNumber * (maxValue - (minValue - 1))) + minValue;
}

function fireEvent(element, event) {
	var ev = document.createEvent('HTMLEvents');
	ev.initEvent(event, true, true);
	return !element.dispatchEvent(ev);
}

/* --------------------------------------------------------------------------------------------------------------------
 Initialise
-------------------------------------------------------------------------------------------------------------------- */

function runScript() {
	switch (browser) {
	case 'Firefox':
		if (getPageElement('errorPageContainer') != null && document.title == 'Problem loading page') {
			document.title += ' (Reloading in 60 seconds...)';
			window.setTimeout(function() { window.location.reload(); }, 60000);
			return;
		}
		
		newVersionAvailable = compareVersion(currentVersion, latestVersion);	
		var lastUpdateCheck = getValue('MouseHuntGM_LastUpdateCheck', 0);
		if (nowTimeInMS - lastUpdateCheck > settings.updateSchedule * 86400000) {
			checkForUpdates(currentVersion, nowTimeInMS);
		}
		break;
	case 'Opera':
		unsafeWindow = window;
		break;
	}
	
	var pageLoaded = getPage();	
	switch (pageLoaded) {
	case 'fb':
		writeSidebar(pageLoaded);
		if (settings.autoRedirectEnabled) {
			window.setTimeout(function() {
					setValue('autoRedirectEnabled', getPageElement('autoRedirectEnabled').checked);
					window.location.replace(getPageProtocol() + '://www.mousehuntgame.com/'); 
				}, 5000);
		}
		break;
	case 'mhg':
		hudData = {
			hornTimer:       document.createElement('div'),
			huntLocation:    document.getElementById('hud_location'),
			titlePercentage: document.getElementById('hud_titlePercentage')
		};	
		
		sidebar = {
			hornTimer:      document.createElement('div'),
			hornDelays:     document.createElement('div'),
			trapCheckTimer: document.createElement('div'),
			huntLocation:  	document.createElement('div'),
			status:         document.createElement('div')
		};
		
		writeCorrections();
		writeSidebar(pageLoaded);
		initBot();
		break;
	}
}

/* --------------------------------------------------------------------------------------------------------------------
 SetupManager
-------------------------------------------------------------------------------------------------------------------- */

// Mmmmh! Beatiful code, thank you, Google.
var trapAPI = new function() {
	var pageVar = 'userTrapSelector.';

	this.hasLoadedComponents = function() {
		return callPageAPIFunction(pageVar + 'hasLoadedComponents()', 'b');
	}
	this.populate = function(data) {
		return callPageAPIFunction(pageVar + 'populate(JSON.parse(decodeURI("' + encodeURI(JSON.stringify(data)) + '")))', 'b');
	}
	this.setComponentsCached = function() {
		callPageAPIFunction(pageVar + 'componentsCached = true', 'b');
	}
	this.getComponent = function(type) {
		return callPageAPIFunction(pageVar + 'getComponent("' + type + '")', 'o');
	}
	this.getBaseType = function() {
		return callPageAPIFunction(pageVar + 'getBaseType()', 's');
	}
	this.getWeaponType = function() {
		return callPageAPIFunction(pageVar + 'getWeaponType()', 's');
	}
	this.getBaitType = function() {
		return callPageAPIFunction(pageVar + 'getBaitType()', 's');
	}
	this.getTrinketType = function() {
		return callPageAPIFunction(pageVar + 'getTrinketType()', 's');
	}
	this.setSelectedComponentClass = function(classification) {
		return callPageAPIFunction(pageVar + 'selectedComponentClass = "' + classification + '"', 's');
	}
	this.doChangeComponent = function(component) {
		var fakeEvent = 'new function() {\
			this.target = new function() {\
				this.getId = function() { return "selectComponent-' + component + '"; }\
			},\
			this.preventDefault = function() { return; }\
		}';
		callPageAPIFunction(pageVar + "doChangeComponent(eval('" + fakeEvent + "'))", 's');
	}
};
var userIdentifier;
var userUniqueHash;
var callbackUrl;
var storedSetupsAllUsers;
var entryIndex = 0;

function setupManagerDataLoaded() {
	return getPageVariable('user', 's') != '' &&
			getPageVariable('user.user_id', 'n') != '' &&
			getPageVariable('user.unique_hash', 's') != '' &&
			getPageVariable('callbackurl', 's') != '';
}

function extractPageVars() {
	var success;
	var loclUserIdentifier, loclUserUniqueHash, loclCallbackUrl;
	
	if (success = setupManagerDataLoaded()) {
		userIdentifier = getPageVariable('user.user_id', 'n');
		userUniqueHash = getPageVariable('user.unique_hash', 's');
		callbackUrl = getPageVariable('callbackurl', 's');
	}
	
	return success;
}

function updateCachedComponents() {
	if (trapAPI.hasLoadedComponents()) {
		return;
	}
	
  var req = new XMLHttpRequest();
  
	function handleComponentsUpdate() {
  	if (req.readyState == 4) {
			var fetchedInventory = JSON.parse(req.responseText);
			trapAPI.populate(fetchedInventory.components);
			trapAPI.setComponentsCached();
		}
	}
	
	req.open("POST", callbackUrl + "managers/ajax/users/gettrapcomponents.php", false);
	req.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.onreadystatechange = handleComponentsUpdate;
	req.send('uh=' + userUniqueHash + '&hg_is_ajax=1&sn=FBConnect');
}

function getFullComponentName(componentClass, setupData) {
	var fullName = setupData[componentClass + 'FullName'];
	if (fullName == null && setupData[componentClass] != null && setupData[componentClass] != '') {
		updateCachedComponents();
		fullName = trapAPI.getComponent(setupData[componentClass]).name;
	}
	return (fullName == null) ? '' : fullName;
}

function getComponentThumbnailForced(componentClass, setupData) {
	var url = '';
	if (setupData[componentClass] != null && setupData[componentClass] != '') {
		updateCachedComponents();
		url = trapAPI.getComponent(setupData[componentClass]).thumbnail;
	}
	return url;
}

function getComponentThumbnail(componentClass, setupData) {
	var url = setupData[componentClass + 'Thumbnail'];
	if (url == null) {
		url = getComponentThumbnailForced(componentClass, setupData);
	}
	return url;
}

function updateComponentThumbnailURLs(setupData) {
	setupData.weaponThumbnail = getComponentThumbnailForced('weapon', setupData);
	setupData.baseThumbnail = getComponentThumbnailForced('base', setupData);
	setupData.trinketThumbnail = getComponentThumbnailForced('trinket', setupData);
	setupData.baitThumbnail = getComponentThumbnailForced('bait', setupData);
	storeSetup(setupData);
}

function setNewComponent(componentName, componentClass) {
	updateCachedComponents();
	var capClass = componentClass.charAt(0).toUpperCase() + componentClass.slice(1);
	var currentComponentName = eval("trapAPI.get" + capClass + "Type()");
	if (componentName == currentComponentName) {
		return;
	}
	if (componentName == "") {
		componentName = currentComponentName;
		if (componentName == "") {
			return;
		}
	}
	trapAPI.setSelectedComponentClass(componentClass);
	trapAPI.doChangeComponent(componentName);
}

function activateSetup(storedComponent) {
	setNewComponent(storedComponent.weapon, 'weapon');
	setTimeout(function() { setNewComponent(storedComponent.base, 'base'); } , 500);
	setTimeout(function() { setNewComponent(storedComponent.trinket, 'trinket'); } , 1000);
	setTimeout(function() { setNewComponent(storedComponent.bait, 'bait'); } , 1500);
}

function areSetupsEqual(setup1, setup2) {
	return setup1.weapon == setup2.weapon && setup1.base == setup2.base &&
		setup1.trinket == setup2.trinket && setup1.bait == setup2.bait;
}

function getStoredSetupsAllUsers() {
	if (storedSetupsAllUsers == null) {
		storedSetupsAllUsers = localStorage.getItem('GM_storedSetups');
		if (storedSetupsAllUsers != null) {
			storedSetupsAllUsers = JSON.parse(storedSetupsAllUsers);
		} else {
			storedSetupsAllUsers = {};
		}
	}
	return storedSetupsAllUsers;
}

function getStoredSetups() {
	var storedSetupsAllUsers = getStoredSetupsAllUsers();
	var storedSetups;
	if ((storedSetups = storedSetupsAllUsers[userIdentifier]) == null) {
		storedSetups = [];
	}
	var trapSetupRawData;
	if (trapSetupRawData = getPageElement('trapSetupRawData')) {
		trapSetupRawData.innerHTML = JSON.stringify(storedSetups);
	}
	return storedSetups;
}

function storeSetups(allSetups) {
	var trapSetupRawData;
	if (trapSetupRawData = getPageElement('trapSetupRawData')) {
		trapSetupRawData.innerHTML = JSON.stringify(allSetups);
	}
	var storedSetupsAllUsers = getStoredSetupsAllUsers();
	if (allSetups.length == 0) {
		storedSetupsAllUsers[userIdentifier] = null;
	} else {
		storedSetupsAllUsers[userIdentifier] = allSetups;
	}
	localStorage.setItem('GM_storedSetups', JSON.stringify(storedSetupsAllUsers));
}

function findSetup(setupData, allStoredSetups) {
	var found = false;
	var index;
	for (index = 0; index < allStoredSetups.length; index++) {
		var currSetup = allStoredSetups[index];
		if (areSetupsEqual(currSetup, setupData)) {
			found = true;
			break;
		}
	}
	return found ? index : -1;
}

function storeSetup(setupData) {
	allSetups = getStoredSetups();
	var index = findSetup(setupData, allSetups);
	if (index < 0) {
		allSetups.push(setupData);
	} else {
		var currentSetup = allSetups[index];
		currentSetup.name = setupData.name;
		currentSetup.weaponThumbnail = setupData.weaponThumbnail;
		currentSetup.baseThumbnail = setupData.baseThumbnail;
		currentSetup.trinketThumbnail = setupData.trinketThumbnail;
		currentSetup.baitThumbnail = setupData.baitThumbnail;
	}
	storeSetups(allSetups);
}

function deleteSetup(setupData) {
	allSetups = getStoredSetups();
	var index = findSetup(setupData, allSetups);
	if (index >= 0) {
		allSetups.splice(index, 1);
		storeSetups(allSetups);
	}
}

function swapSetup(setupData, direction) {
	function swapTwo(index1, index2, allSetups) {
		var tempStore = allSetups[index1];
		allSetups[index1] = allSetups[index2];
		allSetups[index2] = tempStore;
	}
	
	allSetups = getStoredSetups();
	var index = findSetup(setupData, allSetups);
	if (index >= 0) {
		switch (direction) {
		case 'left':
			if (index > 0) {
				swapTwo(index - 1, index, allSetups);
				storeSetups(allSetups);
			}
			break;
		case 'right':
			if (index < (allSetups.length - 1)) {
				swapTwo(index + 1, index, allSetups);
				storeSetups(allSetups);
			}
			break;
		}
	}
}

function flashContainer(container) {
	function getHexDigits(n, totalDigits) {
		n = Math.floor(n).toString(16);
		var toPad = '';
		if (totalDigits > n.length) {
			for (var i = 0; i < (totalDigits - n.length); i++) {
				toPad += '0';
			}
		}
		return toPad + n;
	}
	
	function setContainerColor(container, red, green, blue) {
		return function() {
			container.style.backgroundColor = "#" + getHexDigits(red, 2) + getHexDigits(green, 2) + getHexDigits(blue, 2);
		};
	}
	
	if (container) {
		var portionRed = 255, portionGreen = 255, portionBlue = 255;
		var cumulativeTimeout = 0;
		var steps = 20;
		var halfSteps = steps / 2;
		var colorValueFraction = 255 / steps;
		for (var i = 0; i < steps; i++) {
			portionGreen = i < halfSteps ? portionGreen - colorValueFraction : portionGreen + colorValueFraction;
			portionBlue = i < halfSteps ? portionBlue - colorValueFraction : portionBlue + colorValueFraction;
			var colorFunc = setContainerColor(container, portionRed, portionGreen, portionBlue);
			window.setTimeout(colorFunc, cumulativeTimeout);
			cumulativeTimeout += 25;
		}
	}
}

function flashSetupEntry(setupData) {
	function getSetupContainer(containerBaseNameRegExp, setupData) {
		var elems = document.getElementsByTagName('div');
		var i = 0;
		var element;
		while(element = elems[i++]){
			if (containerBaseNameRegExp.test(element.id) && areSetupsEqual(element.setupData, setupData)) {
				return element;
			}
		}
		return null;
	}
	
	flashContainer(getSetupContainer(/^setupContainer_/, setupData));
}

function createSetupEntry(setupData, isNewEntry) {
	function getIndexFromName(fullName, idBaseName) {
		return fullName.slice(idBaseName.length);
	}
	
	function getContainer(targetBaseName, sourceBaseName, event) {
		var index = event.target.id.slice(sourceBaseName.length);
		var targetContainer = document.getElementById(targetBaseName + index);
		return targetContainer;
	}
	
	function getEntryContainer(idBaseName, event) {
		return getContainer('setupContainer_', idBaseName, event);
	}
	
	function correctEntryStyle(entryNode) {
		var index = entryNode.id.slice('setupContainer_'.length);
		if (entryNode.previousElementSibling == null) {
			entryNode.style.borderTopStyle = 'solid';
			entryNode.style.borderTopWidth = 'thin';
			document.getElementById('moveUpButton_' + index).style.visibility = 'hidden';
		} else {
			entryNode.style.borderTopStyle = 'none';
			document.getElementById('moveUpButton_' + index).style.visibility = 'visible';
		}
		
		if (entryNode.nextElementSibling == null) {
			document.getElementById('moveDownButton_' + index).style.visibility = 'hidden';
		} else {
			document.getElementById('moveDownButton_' + index).style.visibility = 'visible';
		}
	}

	function activateSetupHandler(event) {
		var entryContainer = getEntryContainer('activateSetupButton_', event);
		activateSetup(entryContainer.setupData);
		updateComponentThumbnailURLs(entryContainer.setupData);
	}
	
	function deleteSetupHandler(event) {
		var entryContainer = getEntryContainer('deleteSetupButton_', event);
		var nextSibling = entryContainer.nextElementSibling;
		var prevSibling = entryContainer.previousElementSibling;
		deleteSetup(entryContainer.setupData);
		entryContainer.parentNode.removeChild(entryContainer);
		if (nextSibling != null) {
			correctEntryStyle(nextSibling);
		}
		if (prevSibling != null) {
			correctEntryStyle(prevSibling);
		}
	}
	
	function moveUpHandler(event) {
		var currNode = getEntryContainer('moveUpButton_', event);
		if (currNode.previousSibling != null) {
			var prevNode = currNode.previousSibling;
			var parentNode = currNode.parentNode;
			parentNode.replaceChild(prevNode, currNode);
			parentNode.insertBefore(currNode, prevNode);
			correctEntryStyle(currNode);
			correctEntryStyle(prevNode);
			
			swapSetup(currNode.setupData, 'left');
		}
	}
	
	function moveDownHandler(event) {
		var currNode = getEntryContainer('moveDownButton_', event);
		if (currNode.nextElementSibling != null) {
			var nextNode = currNode.nextElementSibling;
			var parentNode = currNode.parentNode;
			parentNode.replaceChild(currNode, nextNode);
			parentNode.insertBefore(nextNode, currNode);
			correctEntryStyle(currNode);
			correctEntryStyle(nextNode);
			
			swapSetup(currNode.setupData, 'right');
		}
	}
	
	function editNameHandler(event) {
		var editButton = event.target;
		var nameNode = getContainer('setupName_', 'editSetupNameButton_', event);
		var entryNode = getEntryContainer('editSetupNameButton_', event);

		var editField = document.createElement('input');
		editField.setAttribute('id', nameNode.getAttribute('id'));
		editField.setAttribute('type', 'text');
		editField.setAttribute('size', '15');
		editField.setAttribute('value', nameNode.innerHTML);
		editField.setAttribute('style', 'text-align: center; font-size: 95%');
		
		var storeButton = document.createElement('span');
		storeButton.setAttribute('style', editButton.getAttribute('style'));
		storeButton.innerHTML = '[Store]';
		
		nameNode.parentNode.replaceChild(editField, nameNode);
		editField.focus();
		editField.select();
		editButton.parentNode.replaceChild(storeButton, editButton);
		
		// this will restore the non-ditable view
		var restoreNonEditView = function() {
			editField.parentNode.replaceChild(nameNode, editField);
			storeButton.parentNode.replaceChild(editButton, storeButton);
		}
		
		// store entered value and restore view
		var saveAndRestoreView = function() {
			nameNode.innerHTML = editField.value;
			entryNode.setupData.name = nameNode.innerHTML;
			storeSetup(setupData);
			restoreNonEditView();
		}
		
		// setting saving function to be called after 10 secs of inactivity
		var timeoutRef = window.setTimeout(saveAndRestoreView, 10000);
		
		// this will reset the previously set timeout, check if <Enter> key was pressed,
		// and reschedule the saving function if not
		var actionHandler = function(event) {
			window.clearTimeout(timeoutRef);
			
			if (event.type == 'click') {
				timeoutRef = window.setTimeout(saveAndRestoreView, 10000);
			} else {
				switch (event.which) {
				case 13: // <Enter> key
					saveAndRestoreView();
					break;
				case 27: // <Esc> key
					restoreNonEditView();
					break;
				default:
					timeoutRef = window.setTimeout(saveAndRestoreView, 10000);
				}
			}
		}
		editField.addEventListener('keyup', actionHandler, true);
		editField.addEventListener('click', actionHandler, true);
		storeButton.addEventListener('click', function() { window.clearTimeout(timeoutRef); saveAndRestoreView(); }, true);
	}
	
	function toggleDetailsHandler(event) {
		var detailsButton = event.target;
		var longDetailsNode = getContainer('longSetupDetails_', 'toggleDetailsButton_', event);
		if (longDetailsNode.style.display == 'none') {
			longDetailsNode.style.display = 'inline';
			detailsButton.innerHTML = '[-]';
		} else {
			longDetailsNode.style.display = 'none';
			detailsButton.innerHTML = '[+]';
		}
	}
	
	var entry = document.createElement('div');
	var index = entryIndex++;
	
	entry.id = 'setupContainer_' + index;
	entry.style.borderBottomStyle = 'solid';
	entry.style.borderBottomWidth = 'thin';
	entry.innerHTML = '\
		<div id="descText_' + index + '">\
			<div style="text-align: center; margin-bottom: 2px;">\
				<span style="font-weight: bold; text-transform: capitalize; font-variant: small-caps;" id="setupName_' + index + '">' + setupData.name + '</span>&nbsp;\
				<span id="editSetupNameButton_' + index + '" style="cursor: pointer;">[Edit]</span>\
				<span id="toggleDetailsButton_' + index + '" style="cursor: pointer; font-family: monospace;">[+]</span>\
			</div>\
			<div id="shortSetupDetails_' + index + '" style="text-align: center;">\
				<img src="' + getComponentThumbnail('weapon', setupData) + '" width="20%" style="margin-right: 3px" />\
				<img src="' + getComponentThumbnail('base', setupData) + '" width="20%" style="margin-right: 3px" />\
				' + ((setupData.trinket != "") ? '\
				<img src="' + getComponentThumbnail('trinket', setupData) + '" width="20%" style="margin-right: 3px" />' : '') + '\
				' + ((setupData.bait != "") ? '\
				<img src="' + getComponentThumbnail('bait', setupData) + '" width="20%" />' : '') + '\
			</div>\
			<div id="longSetupDetails_' + index + '" style="display: none;">\
				<b>Weapon:</b>&nbsp;' + getFullComponentName('weapon', setupData) + '<br/>\
				<b>Base:</b>&nbsp;' + getFullComponentName('base', setupData) + '<br/>\
				<b>Bait:</b>&nbsp;' + ((setupData.bait != "") ? getFullComponentName('bait', setupData) : 'none')  + '<br/>\
				<b>Charm:</b>&nbsp;' + ((setupData.trinket != "") ? getFullComponentName('trinket', setupData) : 'none') + '\
			</div>\
		</div>\
		<div style="text-align: center; margin-bottom: 2px">\
			<span id="activateSetupButton_' + index + '" style="width: 47px; text-align: center; font-weight: bold; cursor: pointer">[Apply]</span>\
			<span id="deleteSetupButton_' + index + '" style="width: 47px; text-align: center; font-weight: bold; cursor: pointer">[Remove]</span>\
			<span id="moveDownButton_' + index + '" style="margin-left: 10px; width: 30px; text-align: center; font-weight: bold; cursor: pointer">[&#x2193;]</span>\
			<span id="moveUpButton_' + index + '" style="width: 30px; text-align: center; font-weight: bold; cursor: pointer">[&#x2191;]</span>\
		</div>';
	entry.setupData = setupData;
	document.getElementById('setupListContainer').appendChild(entry);
	document.getElementById('editSetupNameButton_' + index).addEventListener('click', editNameHandler, true);
	document.getElementById('toggleDetailsButton_' + index).addEventListener('click', toggleDetailsHandler, true);
	document.getElementById('activateSetupButton_' + index).addEventListener('click', activateSetupHandler, true);
	document.getElementById('deleteSetupButton_' + index).addEventListener('click', deleteSetupHandler, true);
	document.getElementById('moveUpButton_' + index).addEventListener('click', moveUpHandler, true);
	document.getElementById('moveDownButton_' + index).addEventListener('click', moveDownHandler, true);
	correctEntryStyle(entry);
	if (entry.previousElementSibling != null) {
		correctEntryStyle(entry.previousElementSibling);
	}
	if (isNewEntry) {
		var fakeEvent = document.createEvent('MouseEvents');
		fakeEvent.initEvent('click', true, true);
		document.getElementById('editSetupNameButton_' + index).dispatchEvent(fakeEvent);
	}
}

function populateSetupManager() {
	allSetups = getStoredSetups();
	for (var idx = 0; idx < allSetups.length; idx++) {
		createSetupEntry(allSetups[idx], false);
	}
}

function createSetupManager() {
	if (document.getElementById('setupManager')) {
		return;
	}

	function storeSetupHandler(event) {
		var setup = {};
		setup.weapon = trapAPI.getWeaponType();
		setup.base = trapAPI.getBaseType();
		setup.trinket = trapAPI.getTrinketType();
		setup.bait = trapAPI.getBaitType();
		setup.weaponFullName = getFullComponentName('weapon', setup);
		setup.baseFullName = getFullComponentName('base', setup);
		setup.trinketFullName = getFullComponentName('trinket', setup);
		setup.baitFullName = getFullComponentName('bait', setup);
		setup.weaponThumbnail = getComponentThumbnail('weapon', setup);
		setup.baseThumbnail = getComponentThumbnail('base', setup);
		setup.trinketThumbnail = getComponentThumbnail('trinket', setup);
		setup.baitThumbnail = getComponentThumbnail('bait', setup);
		var index = findSetup(setup, allSetups);
		if (index < 0) {
		  setup.name = 'New Setup';
			storeSetup(setup);
			createSetupEntry(setup, true);
		} else {
			flashSetupEntry(setup);
		}
	}
	
	var manager = document.createElement('div');
	manager.id = 'setupManager';
	manager.innerHTML = '\
		<div id="storeButtonContainer" style="text-align: center; margin: 3px 0px">\
			<input type="button" value="Store Current Trap Setup" id="storeTrapSetupButton"/>\
		</div>\
		<b>Stored Trap Setups:</b><br/>\
		<div id="setupListContainer">\
		</div>\
		<hr/>';
	document.getElementById('sidebarContainer').appendChild(manager);
	document.getElementById('storeTrapSetupButton').addEventListener('click', storeSetupHandler, true);
	populateSetupManager();
}

function initSetupManager() {
	if (!extractPageVars()) {
		window.setTimeout(initSetupManager, 2000);
	} else {
		createSetupManager();
	}
}

/* --------------------------------------------------------------------------------------------------------------------
 Improved random number generator (allows seeding)
-------------------------------------------------------------------------------------------------------------------- */

// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

// From http://baagoe.com/en/RandomMusings/javascript/
function Alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() + 
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};

runScript();
