// ==UserScript==
// @name            MouseHunt GM
// @namespace       http://userscripts.org/users/295901
// @description     Automatically sounds the hunter's horn and notifies about various events in the background. Displays desktop notifications when used with Autohotkey script.
// @version         1.2.1
// @author          Camarean
// @license         Creative Commons BY-NC-SA 3.0
// @include         http://www.mousehuntgame.com/*
// @include         http://apps.facebook.com/mousehunt/*
// @exclude         http://www.mousehuntgame.com/ads/*
// @exclude         http://www.mousehuntgame.com/canvas/*
// ==/UserScript==

String.prototype.contains = function(str) { return this.indexOf(str) != -1; };
String.prototype.regexMatch = function(regex) { return regex.test(this); };

var browser = identifyBrowser();
var settings = loadSettings();

var currentVersion = '1.2.1';
var latestVersion = getValue('MouseHuntGM_LatestVersion', currentVersion);
var newVersionAvailable = false;

var nowTimeFull = new Date();
var nowTimeInMS = nowTimeFull.getTime();

var hud, sidebar;

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
	} else {
		var hornTimeRemaining = parseInt(getBetween(pageHtml, '"next_activeturn_seconds":', ','));
		var trapCheckTimeRemaining = calculateTrapCheck(settings.trapCheckTime, nowTimeFull);
		var cheeseRemaining = parseInt(getBetween(pageHtml, '"bait_quantity":', ','));
		
		var rewardPending = pageHtml.contains('"has_puzzle":true');
		var titlePercentage = getBetween(pageHtml, '"title_percentage":', ',');
		
		var currentHuntLocation = getBetween(pageHtml, '"location":"', '",');
		var fixedHuntLocation = getValue('fixedHuntLocation', '');
	
		var hornDelay = randomise(settings.minHornDelay, settings.maxHornDelay);
		var trapCheckDelay = randomise(settings.minTrapCheckDelay, settings.maxTrapCheckDelay);
		
		var nextHornTime = calculateNextTime(hornTimeRemaining + hornDelay, nowTimeInMS);
		var nextTrapCheckTime = calculateNextTime(trapCheckTimeRemaining + trapCheckDelay, nowTimeInMS);
		
		var hunterStatus = getHunterStatus();
		var trapCheckInactive = true;
		var hornAttempts = 0;
		
		writeHudEnhancements(currentHuntLocation);
		preCountdownUpdates();
		
		if (window.location.href == 'http://www.mousehuntgame.com/'              || 
				window.location.href == 'http://www.mousehuntgame.com/index.php' || 
				window.location.href == 'http://www.mousehuntgame.com/turn.php'  || 
				window.location.href == 'http://www.mousehuntgame.com/journal.php') {
			var allowActivity = true;
			if (hornTimeRemaining == 0 && hunterStatus == 'Normal') {
				window.setTimeout(soundTheHorn, 5000);		
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
				updateStatus('Autohunting has been disabled. Return to the <a href="http://www.mousehuntgame.com/">\
						Hunter\'s Camp</a> to resume script activity.');
				break;
			case 'HuntersProfile':
				var hpIntervalRemaining = randomise(settings.minHpInterval, settings.maxHpInterval) * 60;
				var nextHpRefresh = calculateNextTime(hpIntervalRemaining, nowTimeInMS);
				
				var titleMessage = 'Hunter\'s Profile';
				updateStatus('Autohunting has been disabled. Return to the <a href="http://www.mousehuntgame.com/">\
						Hunter\'s Camp</a> to resume script activity.');
				
				countdownHuntersProfile();
				break;
			}
			break;
		case 'KingsReward':
			document.getElementsByName('puzzle_answer')[0].focus();
			var krTimeRemaining = randomise(settings.minKrInterval, settings.maxKrInterval) * 60;
			var nextKrRefresh = calculateNextTime(krTimeRemaining, nowTimeInMS);
			
			if (settings.krAlertEnabled) {
				var soundAlert = document.createElement('div');
				soundAlert.innerHTML = '\
						<embed src="http://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid"\
						type="audio/midi" autostart="true" hidden="true" loop="true" mastersound enablejavascript="true">\
							<noembed>\
								<bgsound src="http://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid" loop="infinite">\
							</noembed>\
						</embed>';
				getPageElement('fb-root').appendChild(soundAlert);
			}
			
			var titleMessage = 'King\'s Reward is pending.';
			updateStatus('Autohunting has been disabled. King\'s reward is pending.');
			allowActivity = false;
			
			kingsRewardWatcher();
			countdownKingsReward();
			break;
		case 'InvalidLocation':
			var titleMessage = 'Invalid location';
			updateStatus('Autohunting has been disabled. Thrown out of predefined hunting location.');
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
				} else {
					document.title = 'Horn Ready' + (titleMessage == undefined ? '' : ' | ' + titleMessage) + ' | MouseHunt';
				}
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
				window.location.assign('http://www.mousehuntgame.com/');
			}
		}
		
		function countdownTrapCheck() {
			trapCheckTimeRemaining = nextTrapCheckTime - (new Date()).getTime();
			if (trapCheckTimeRemaining >= 0) {
				updateTrapCheckTimer(formatTimerLong(parseInt(trapCheckTimeRemaining / 1000)));
				window.setTimeout(countdownTrapCheck, 1000);
			} else {
				if (allowActivity && settings.trapCheckEnabled) {
					updateTrapCheckTimer('Now!');
					updateStatus('Checking trap...');
					
					window.location.assign('http://www.mousehuntgame.com/');
				} else {
					updateTrapCheckTimer('Now!');
				}
			}
		}
	}
		
	function extractData() {
		switch (browser) {
		case 'Firefox': case 'Opera':
			hornTimeRemaining = unsafeWindow.user.next_activeturn_seconds;
			cheeseRemaining = unsafeWindow.user.bait_quantity;
			rewardPending = unsafeWindow.user.has_puzzle;	
			titlePercentage = unsafeWindow.user.title_percentage;
			currentHuntLocation =  unsafeWindow.user.location;
			break;
		case 'Chrome':
			hornTimeRemaining = parseInt(getPageVariable('user.next_activeturn_seconds'));
			cheeseRemaining = parseInt(getPageVariable('user.bait_quantity'));
			rewardPending = getPageVariable('user.has_puzzle').toString() == 'true';
			titlePercentage = getPageVariable('user.title_percentage');
			currentHuntLocation =  getPageVariable('user.location');
			break;
		}

		nowTimeInMS = (new Date()).getTime();
		hornDelay = randomise(settings.minHornDelay, settings.maxHornDelay);
		nextHornTime = calculateNextTime(hornTimeRemaining + hornDelay, nowTimeInMS);
		
		hunterStatus = getHunterStatus();
		preCountdownUpdates();
		
		initCountdown('HuntersCamp');
	}
	
	function getHunterStatus() {
		if (rewardPending) return 'KingsReward';
		else if (settings.locationLockEnabled && currentHuntLocation != fixedHuntLocation) return 'InvalidLocation';
		else if (cheeseRemaining == 0) return 'NoCheese';
		else return 'Normal';
	}
	
	function kingsRewardWatcher() {
		var puzzleContainer = getPageElement('puzzleContainer');
		if (puzzleContainer.innerHTML.contains('resume_hunting_blue')) {
			window.location.assign('http://www.mousehuntgame.com/');
		} else {
			window.setTimeout(kingsRewardWatcher, 1000);
		}
	}
	
	function soundTheHorn() {
		var hornStatus = getPageElement('header').getAttribute('class');
		if (hornStatus.contains('ready') || settings.forceHornEnabled) {
			document.title = 'Sounding the horn';
			updateStatus('Sounding the horn...');
			hornAttempts += 1;
			
			fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
			window.setTimeout(postHornEvent, 3000);		
		} else {
			document.title = 'Updating timer data';
			updateHornTimer('Updating...')
			updateStatus('Timers out of sync. Updating timer data...');
			
			window.location.reload();
		}
		
		function postHornEvent() {
			hornStatus = getPageElement('header').getAttribute('class');
			if (hornStatus.contains('sounding')) {
				window.setTimeout(postHornEvent, 1000);		
			} else if (hornStatus.contains('sounded')) {
				if (getPageElement('hornTitle').firstChild.firstChild.innerHTML.contains('reward')) {
					window.location.replace('http://www.mousehuntgame.com/');
				} else {
					window.setTimeout(postHornEvent, 1000);		
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
				
				window.setTimeout(extractData, 400);
			}
		}
	}
	
	function preCountdownUpdates() {
		hud.titlePercentage.innerHTML = titlePercentage;
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
		
		minTrapCheckDelay: getValue('minTrapCheckDelay', 20),
		maxTrapCheckDelay: getValue('maxTrapCheckDelay', 90),
		
		minKrInterval: getValue('minKrInterval', 15),
		maxKrInterval: getValue('maxKrInterval', 20),
		
		minHpInterval: getValue('minHpInterval', 15),
		maxHpInterval: getValue('maxHpInterval', 20),
		
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

function calculateTrapCheck(setting, now) {
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var tcTime = (setting * 60) - ((minute * 60) + second);
	return (minute >= setting) ? tcTime + 3600 : tcTime;
}

function checkForUpdates(version, timestamp) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/97586.meta.js',
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
			event.target.style.marginLeft = '6px';
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
		if (leftCol.length > 0) {
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
		hud.huntLocation.innerHTML += ' [<a id="lockSwitch" href="' + window.location.href + '">Unlock</a>]';
		getPageElement('lockSwitch').addEventListener('click', 
			function() {
				setValue('locationLockEnabled', false);
				removeValue('fixedHuntLocation');
			}, false);		
	} else {
		hud.huntLocation.innerHTML += ' [<a id="lockSwitch" href="' + window.location.href + '">Lock</a>]';
		getPageElement('lockSwitch').addEventListener('click', 
			function() {
				setValue('locationLockEnabled', true);
				setValue('fixedHuntLocation', escape(location));
			}, false);
	}
	
	var hudRealHorn = document.getElementById('huntTimer');
	hudRealHorn.style.display = 'none';
	
	hud.hornTimer.className = 'hunttimer';
	hudRealHorn.parentNode.insertBefore(hud.hornTimer, hudRealHorn);
	
	document.getElementsByClassName('version')[0].innerHTML += ' [with MouseHunt GM v' + currentVersion + ']';
}

function writeSidebar(page) {
	var sidebarReferenceNode = document.getElementsByClassName(page == 'mhg' ? 'hgSideBar' : 'UIStandardFrame_SidebarAds')[0];
	var sidebarContainer = document.createElement('div');
	sidebarContainer.id = 'sidebarContainer';
	sidebarContainer.style.marginLeft = '775px';
	sidebarContainer.style.paddingTop = '10px';
	sidebarContainer.style.paddingBottom = '20px';
	sidebarReferenceNode.parentNode.insertBefore(sidebarContainer, sidebarReferenceNode);
	
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
				window.location.assign('http://www.mousehuntgame.com/');
			}, false);
		break;	
	case 'mhg':
		sidebarContainer.style.width = '190px';
		if (newVersionAvailable) {
			var sidebarUpdates = document.createElement('div');
			sidebarUpdates.innerHTML = '\
				<b>An update is available!</b><br />\
				Current version: ' + currentVersion + '<br />\
				Latest version: ' + latestVersion + '<br />\
				<div style="text-align: center;">\
					<input type="button" id="installUpdateButton" value="Install update" />\
				</div><hr />';
			sidebarContainer.appendChild(sidebarUpdates);
			
			getPageElement('installUpdateButton').addEventListener('click', 
				function() { window.location.assign('http://userscripts.org/scripts/source/97586.user.js'); }, false);
		}
		
		var sidebarSettingsHandle = document.createElement('div');
		sidebarSettingsHandle.innerHTML = '<b>Settings</b> [ expand ] <hr />';
		
		var sidebarSettings = document.createElement('div');
		sidebarSettings.id = 'sidebarSettings';
		sidebarSettings.style.display = 'none';
		sidebarSettings.innerHTML = '\
			<b>Horn Delay</b> (in secs)<br />\
			Min: <input type="text" size="2" id="minHornDelay" value="' + settings.minHornDelay + '" /> \
			Max: <input type="text" size="2" id="maxHornDelay" value="' + settings.maxHornDelay + '" /><br /> \
			\
			<b>Trap Check Delay</b> (in secs)<br />\
			Min: <input type="text" size="2" id="minTrapCheckDelay" value="' + settings.minTrapCheckDelay + '" /> \
			Max: <input type="text" size="2" id="maxTrapCheckDelay" value="' + settings.maxTrapCheckDelay + '" /><br />\
			\
			<b>King\'s Reward Recheck</b> (in mins)<br />\
			Min: <input type="text" size="2" id="minKrInterval" value="' + settings.minKrInterval + '" /> \
			Max: <input type="text" size="2" id="maxKrInterval" value="' + settings.maxKrInterval + '" /><br /><br />\
			\
			<input type="checkbox" id="trapCheckEnabled" ' + (settings.trapCheckEnabled ? 'checked="true"' : '') + '" /> Automatic trap checks<br />\
			<input type="checkbox" id="forceHornEnabled" ' + (settings.forceHornEnabled ? 'checked="true"' : '') + ' /> Force sounding the horn<br />\
			<input type="checkbox" id="krAlertEnabled" ' + (settings.krAlertEnabled ? 'checked="true"' : '') + '" /> King\'s Reward sound alerts<br />\<br />\
			\
			<b>Trap Check Setting</b>:\
			<select id="trapCheckTime">\
				<option value="0" ' + (settings.trapCheckTime == 0 ? 'selected="true"' : '') + '>00</option>\
				<option value="15" ' + (settings.trapCheckTime == 15 ? 'selected="true"' : '') + '>15</option>\
				<option value="30" ' + (settings.trapCheckTime == 30 ? 'selected="true"' : '') + '>30</option>\
				<option value="45" ' + (settings.trapCheckTime == 45 ? 'selected="true"' : '') + '>45</option>\
			</select><br /><br />\
			\
			<b>Automatic Updates</b><br />\
			Check every <input type="text" size="2" id="updateSchedule" value="' + settings.updateSchedule + '" /> days<br />\
			\
			<div style="text-align: center;">\
				<input type="button" id="saveSettingsButton" value="Save Settings" />\
			</div><hr />';
		
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
			
		getPageElement('saveSettingsButton').addEventListener('click', 
			function() {
				setValue('minHornDelay', parseInt(getPageElement('minHornDelay').value));
				setValue('maxHornDelay', parseInt(getPageElement('maxHornDelay').value));
				
				setValue('minTrapCheckDelay', parseInt(getPageElement('minTrapCheckDelay').value));
				setValue('maxTrapCheckDelay', parseInt(getPageElement('maxTrapCheckDelay').value));
				
				setValue('minKrInterval', parseInt(getPageElement('minKrInterval').value));
				setValue('maxKrInterval', parseInt(getPageElement('maxKrInterval').value));
				
				setValue('trapCheckEnabled', getPageElement('trapCheckEnabled').checked);
				setValue('forceHornEnabled', getPageElement('forceHornEnabled').checked);
				setValue('krAlertEnabled', getPageElement('krAlertEnabled').checked);
				
				var newTcSetting = getPageElement('trapCheckTime');
				setValue('trapCheckTime', parseInt(newTcSetting.options[newTcSetting.selectedIndex].value));
				setValue('updateSchedule', parseInt(getPageElement('updateSchedule').value));
				
				window.location.reload();
			}, false);
		break;
	}
}

function updateHornTimer(update) {
	hud.hornTimer.innerHTML = '<span class="timerlabel">Next Hunt:</span> ' + update;
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

function getPageVariable(name) {
	var scriptElement = document.createElement('script');
	scriptElement.id = 'scriptElement';
	scriptElement.type = 'text/javascript';
	scriptElement.innerHTML = "document.getElementById('scriptElement').innerText=" + name + ';';
	document.body.appendChild(scriptElement);
	var value = scriptElement.innerHTML;
	document.body.removeChild(scriptElement);
	return value;
}

function getValue(key, defaultValue) {
	var value = localStorage.getItem(key);
	if (!value) return defaultValue;
	
	var dataType = value[0];
	value = value.substring(1);
	switch (dataType) {
	case 'b': return value == 'true';
	case 'n': return Number(value);
	case 's': return unescape(value);	
	default: return value;
	}
}

function setValue(key, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(key, value);
}

function removeValue(key) {
	localStorage.removeItem(key);
}

function trimString(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function randomise(minValue, maxValue) {
	return Math.floor(Math.random() * (maxValue - (minValue - 1))) + minValue;
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
					window.location.replace('http://www.mousehuntgame.com/'); 
				}, 5000);
		}
		break;
	case 'mhg':
		hud = {
			hornTimer:       document.createElement('div'),
			huntLocation:    document.getElementById('hud_location'),
			titlePercentage: document.getElementById('hud_titlePercentage')
		};	
		
		sidebar = {
			trapCheckTimer: document.createElement('div'),
			huntLocation:   document.createElement('div'),
			status:         document.createElement('div')
		};
		
		writeCorrections();
		writeSidebar(pageLoaded);
		initBot();
		break;
	}
}
runScript();