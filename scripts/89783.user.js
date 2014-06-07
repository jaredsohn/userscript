// ==UserScript==
// @name           MouseHunt V3.1 Autohorn
// @namespace      http://userscripts.org/users/89783
// @description    Automatically sounds the hunter's horn and notifies about various events in the background. Displays desktop notifications when used with Autohotkey script.
// @version        v32
// @author         Jonaz
// @include        http://mousehuntgame.com/*
// @include        http://www.mousehuntgame.com/*
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.facebook.com/sorry.php?msg=account
// @exclude        http://www.mousehuntgame.com/ads/*
// @exclude        http://www.mousehuntgame.com/canvas/*
// @exclude        http://apps.facebook.com/mousehunt/forum/*
// ==/UserScript==

var scriptVer = '1.1.7';

/* ----------------------------------------
 Settings
----------------------------------------*/

// Horn delay (in seconds)
var hornDelay_min = 01;
var hornDelay_max = 10;

// Trap check delay (in seconds)
var trapCheckDelay_min = 10;
var trapCheckDelay_max = 90;

// King's reward recheck delay (in minutes)
var krInterval_min = 15;
var krInterval_max = 20;

// Enable king's reward sound alert (true/false)
var krAlertEnabled = false;

// Trap check (00 - 59)
var trapCheckSetting = 00;

/* ----------------------------------------
 DO NOT TOUCH ANYTHING BELOW THIS LINE
 UNLESS YOU KNOW WHAT YOU'RE DOING
----------------------------------------*/

function main() {
	switch (true) {		
	case window.location.href.indexOf('facebook.com/sorry.php?msg=account') != -1:
		document.title = 'Account unavailable. Check back in a while.';
		break;
		
	case window.location.href.indexOf('facebook.com/mousehunt/') != -1 || 
			window.location.href.indexOf('http://mousehuntgame.com') != -1:
			
		window.location.href = 'http://www.mousehuntgame.com/';
		break;
		
	default:
		var pageData = document.getElementsByTagName('html')[0].innerHTML;
		
		if (pageData.indexOf('Login to see your account') != -1) {
			document.title = 'Not logged in';
			
		} else if (pageData.indexOf('<body') != -1) {
			var krActive              = pageData.indexOf('"has_puzzle":true') != -1;
			var hornTimeRemaining     = parseInt(getBetween(pageData, '"next_activeturn_seconds":', ','));
			var cheeseRemaining       = parseInt(getBetween(pageData, '"bait_quantity":', ','));
			var titlePercentage       = getBetween(pageData, '"title_percentage":', ',');
			
			var currentHuntLocation   = getBetween(pageData, '"location":"', '",');
			var fixedHuntLocation     = getValue('fixedHuntLocation', '');
			var locationLockEnabled   = getValue('locationLockEnabled', false);
			
			var now = new Date();
			var	trapCheckTimeRemaining 	= now.getMinutes() >= trapCheckSetting ? 
					3600 + (60 * trapCheckSetting) - ((60 * now.getMinutes()) + now.getSeconds()) : 
					(60 * trapCheckSetting) - ((60 * now.getMinutes()) + now.getSeconds());
							
			var hud = {
				hornTimer:          document.createElement('div'),
				huntLocation:       document.getElementById('hud_location'),
				titlePercentage:    document.getElementById('hud_titlePercentage')
			}
			
			var sidebar = {
				trapCheckTimer:     document.createElement('div'),
				huntLocation:       document.createElement('div'),
				status:             document.createElement('div')
			}
			
			if (window.location.href == 'http://www.mousehuntgame.com/' 				||
					window.location.href == 'http://www.mousehuntgame.com/index.php' 	||
					window.location.href == 'http://www.mousehuntgame.com/turn.php' 	||
					window.location.href == 'http://www.mousehuntgame.com/journal.php') {
				
				if (pageData.indexOf('too slow to fetch your data') != -1) {
					window.setTimeout(function() {window.location.href = 'http://www.mousehuntgame.com/'}, 1500);
					
				} else {
					var allowActivity = true;
					writePageElements();
					if (hornTimeRemaining == 0 && getHunterStatus() == 'normal') {
						window.setTimeout(soundTheHorn, 2000);
						
					} else {
						startCountdown(getHunterStatus());
					}
				}
				
			} else {
				var allowActivity = false;
				writePageElements();
				startCountdown('inactivePage');
			}
			pageData = null;
			
		} else {
			document.title = 'Problem loading page. (Refreshing in 30 seconds...)';
			window.setTimeout(function() {window.location.href = 'http://www.mousehuntgame.com/'}, 30000);
		}
	}
	
	function getHunterStatus() {
		if (krActive) {
			return 'kingsReward';
			
		} else if (locationLockEnabled && currentHuntLocation != fixedHuntLocation) {
			return 'invalidLocation';
			
		} else if (cheeseRemaining == 0) {
			return 'noCheese';
			
		} else {
			return 'normal';
		}
	}
	
	function startCountdown(status) {
		hud.titlePercentage.innerHTML = titlePercentage;
		
		if (locationLockEnabled) {
			updateLocation(currentHuntLocation == fixedHuntLocation ? fixedHuntLocation : 
					'<font color="red"><strong>' + fixedHuntLocation + '</strong></font>');
		}
		
		hornTimeRemaining += intRandomise(hornDelay_min, hornDelay_max);
		trapCheckTimeRemaining += intRandomise(trapCheckDelay_min, trapCheckDelay_max);
		
		switch (status) {
		case 'normal':
			updateStatus('Waiting for next ' + (hornTimeRemaining <= trapCheckTimeRemaining ? 'horn' : 'trap check') + ' time...');	
			break;
		
		case 'inactivePage':
			updateStatus('Autohunting has been disabled. Return to the <a href="http://www.mousehuntgame.com/">' +
						'Hunter\'s Camp</a> to resume script activity.');
			break;
		
		case 'kingsReward':
			document.getElementsByName('puzzle_answer')[0].focus();
			var krIntervalRemaining = intRandomise(krInterval_min, krInterval_max) * 60;
			
			if (krAlertEnabled) {
				var soundAlert = document.createElement('div');
				soundAlert.innerHTML = '<embed src="http://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid" type="audio/midi" autostart="true" hidden="true" loop="true" mastersound enablejavascript="true"><noembed><bgsound src="http://dl.dropbox.com/u/5853074/Userscripts/MouseHuntGM/soundalert.mid" loop="infinite"></noembed></embed>';
				document.getElementById('fb-root').appendChild(soundAlert);
			}
			
			var titleMessage = 'King\'s Reward is pending.';
			updateStatus('Autohunting has been disabled. King\'s reward is pending.');
			allowActivity = false;
			
			kingsRewardWatcher();
			kingsRewardRefresher();
			break;

		case 'invalidLocation':
			var titleMessage = 'Invalid location';
			updateStatus('Autohunting has been disabled. Thrown out of predefined hunting location.');
			allowActivity = false;
			break;
		
		case 'noCheese':
			var titleMessage = 'Out of cheese';
			updateStatus('Autohunting has been disabled. You are out of cheese.');
			allowActivity = false;
			break;
		}
		
		countdownTimer();
		
		function countdownTimer() {
			if (hornTimeRemaining >= 0) {
				document.title = 'Next Hunt: ' + formatTimer(hornTimeRemaining) + (titleMessage == undefined ? '' : ' | ' + titleMessage);
				updateHornTimer(formatTimer(hornTimeRemaining--));
				
			} else {
				if (allowActivity) {
					soundTheHorn();
					return;
				} else {
					document.title = 'Horn Ready' + (titleMessage == undefined ? '' : ' | ' + titleMessage);
				}
			}
			
			if (trapCheckTimeRemaining >= 0) {
				updateTrapCheckTimer(formatTimerLong(trapCheckTimeRemaining--));
				
			} else {
				if (allowActivity) {
					updateTrapCheckTimer('Now!');
					updateStatus('Checking trap...');
					
					window.location.href = 'http://www.mousehuntgame.com/';
					return;
				} else {
					updateTrapCheckTimer('Now!');
				}
			}
			
			if (hornTimeRemaining >= 0 || trapCheckTimeRemaining >= 0) {
				window.setTimeout(countdownTimer, 1000);
			}
		}
		
		function kingsRewardRefresher() {
			if (krIntervalRemaining >= 0) {		
				updateStatus('Autohunting has been disabled. King\'s reward is pending. (Refreshing in ' + formatTimerLong(krIntervalRemaining--) + ')');
				window.setTimeout(kingsRewardRefresher, 1000);
			} else {
				window.location.href = 'http://www.mousehuntgame.com/';
			}
		}
		
		function kingsRewardWatcher() {
			var puzzleContainer = document.getElementById('puzzleContainer');
			if (puzzleContainer.innerHTML.indexOf('resume_hunting_blue') != -1) {
				window.location.href = 'http://www.mousehuntgame.com/';
				return;
			}
			
			window.setTimeout(kingsRewardWatcher, 1000);
		}
	}
	
	function soundTheHorn() {
		var hornStatus = document.getElementById('header').getAttribute('class');
		if (hornStatus.indexOf('ready') != -1) {
			document.title = 'Sounding the horn...';
			updateStatus('Sounding the horn');

			updateHornTimer('Now!');
			fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
			
			window.setTimeout(postHornEvent, 1000);
		
		} else {
			document.title = 'Updating timer data...';
			updateHornTimer('Updating...')
			updateStatus('Timers out of sync. Updating timer data...');
			
			window.location.href = 'http://www.mousehuntgame.com/';
		}
		
		function postHornEvent() {
			hornStatus = document.getElementById('header').getAttribute('class');
			if (hornStatus.indexOf('sounding') != -1) {
				updateStatus('Waiting for server response...');
				
				window.setTimeout(postHornEvent, 1000);
			
			} else if (hornStatus.indexOf('sounded') != -1) {
				if (document.getElementById('hornTitle').firstChild.firstChild.innerHTML.indexOf('reward') != -1) {
					window.location.href = 'http://www.mousehuntgame.com/';
					
				} else {
					window.setTimeout(postHornEvent, 1000);
				}
			
			} else if (hornStatus.indexOf('ready') != -1) {				
				soundTheHorn();
				
			} else {
				document.title = 'Updating timer data...';
				updateTimers('Updating...', 'Grabbing next trap check time...');
				updateStatus('Updating timer data...');
				
				window.setTimeout(extractData, 400);
			}
		}
	}
	
	function extractData() {
		try {
			krActive = unsafeWindow.user.has_puzzle;
			hornTimeRemaining = unsafeWindow.user.next_activeturn_seconds;
			cheeseRemaining = unsafeWindow.user.bait_quantity;
			titlePercentage = unsafeWindow.user.title_percentage;
			currentHuntLocation =  unsafeWindow.user.location;
		} catch(err) {
			krActive = getPageVariable('user.has_puzzle').toString() == 'true';
			hornTimeRemaining = parseInt(getPageVariable('user.next_activeturn_seconds'));
			cheeseRemaining = parseInt(getPageVariable('user.bait_quantity'));
			titlePercentage = getPageVariable('user.title_percentage');
			currentHuntLocation = getPageVariable('user.location');
		} finally {
			startCountdown(getHunterStatus());
		}
	}
	
	function writePageElements() {
		var sidebarLocation = document.getElementsByClassName('hgSideBar')[0];
		var sidebarExtras = document.createElement('div');
		sidebarExtras.id = 'sidebarExtras';
		sidebarExtras.style.marginLeft = '775px';
		sidebarExtras.style.width = '190px';
		sidebarLocation.parentNode.insertBefore(sidebarExtras, sidebarLocation);
			
		var sidebarTitle = document.createElement('div');
		sidebarTitle.innerHTML = '<hr /><b>MouseHunt GM </b> [version ' + scriptVer + ']';
		sidebarExtras.appendChild(sidebarTitle);
		sidebarExtras.appendChild(document.createElement('hr'));
		sidebarExtras.appendChild(sidebar.trapCheckTimer);
		
		if (locationLockEnabled) {
			sidebarExtras.appendChild(sidebar.huntLocation);
			hud.huntLocation.innerHTML = currentHuntLocation + ' [<a href="' + window.location.href + '" onclick="localStorage.setItem(\'locationLockEnabled\', \'bfalse\')">Unlock</a>]';
		} else {
			hud.huntLocation.innerHTML = currentHuntLocation + ' [<a href="' + window.location.href + '" onclick="localStorage.setItem(\'locationLockEnabled\', \'btrue\');' +
					'localStorage.setItem(\'fixedHuntLocation\', \'s' + escape(currentHuntLocation) + '\')">Lock</a>]';
		}
		
		sidebarExtras.appendChild(sidebar.status);
		
		var hudRealHorn = document.getElementById('huntTimer');
		hudRealHorn.style.display = 'none';
		
		hud.hornTimer.className = 'hunttimer';
		hudRealHorn.parentNode.insertBefore(hud.hornTimer, hudRealHorn);
		
		document.getElementsByClassName('version')[0].innerHTML += ' [with MouseHunt GM v' + scriptVer + ']';
	}
	
	function updateHornTimer(hornUpdate) {
		hud.hornTimer.innerHTML = '<span class="timerlabel">Next Hunt:</span> ' + hornUpdate;
	}
	function updateTrapCheckTimer(trapCheckUpdate) {
		sidebar.trapCheckTimer.innerHTML = '<b>Next trap check in:</b><br />' + trapCheckUpdate;
	}
	function updateTimers(hornUpdate, trapCheckUpdate) {
		updateHornTimer(hornUpdate);
		updateTrapCheckTimer(trapCheckUpdate);
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

	function updateLocation(locationUpdate) {
		sidebar.huntLocation.innerHTML = '<hr /><b>Location locked to:</b><br />'+ locationUpdate;	
	}

	function updateStatus(statusUpdate) {
		sidebar.status.innerHTML = '<hr /><b>Status:</b><br />' + statusUpdate + '<hr /><br /><br />';
	}
}

function getBetween(source, start, end, position) {
    var indexStart = source.indexOf(start, position == undefined ? 0 : position);
	var indexEnd = source.indexOf(end, indexStart);
    return (indexEnd > indexStart && indexStart > -1) ? source.substring(indexStart + start.length, indexEnd) : '';
}

function getPageVariable(name) {
	var scriptElement = document.createElement('script');
	scriptElement.id = 'scriptElement';
	scriptElement.type = 'text/javascript';
	scriptElement.innerHTML = "document.getElementById('scriptElement').innerText=" + name + ';';
	document.body.appendChild(scriptElement);
	var varValue = scriptElement.innerHTML;
	document.body.removeChild(scriptElement);
	return varValue;
}

function getValue(name, defaultValue) {
	var value = localStorage.getItem(name);
	if (!value) {
		return defaultValue;
	} else {
		var dataType = value[0];
		value = value.substring(1);
		switch (dataType) {
		case 'b':
			return value == 'true';
		case 'n':
			return Number(value);
		default:
			return unescape(value);	
		}
	}
}

function setValue(name, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(name, value);
}

function deleteValue(name) {
	localstorage.removeItem(name);
}

function intRandomise(minValue, maxValue) {
	return Math.floor(Math.random() * (maxValue - (minValue - 1))) + minValue;
}

function fireEvent(element, event) {
	var ev = document.createEvent('HTMLEvents');
	ev.initEvent(event, true, true);
	return !element.dispatchEvent(ev);
}

if (typeof unsafeWindow == 'undefined') unsafeWindow = window;
main();
