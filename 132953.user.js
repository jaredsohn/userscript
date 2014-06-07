// ==UserScript==
// @name           LevynLight AutoPlay
// @namespace      http://www.shrmn.com/
// @description    Automatically plays LevynLight turn, shows time to next turn in title bar and sub-menu bar.
// @copyright      2010, Shrmn K (http://www.shrmn.com/)
// @version        0.2.1
// @include        http://www.levynlight.com*
// @require        http://userscripts.org/scripts/source/74144.user.js
//
// @history 0.2.1 Script will now not play turn if you are not at Camp (will auto return to camp in 15 mins)
// @history 0.2.1 Added option menu option to remove new feature
// @history 0.2.1 Added loading script for https://apps.facebook.com/levynlight/
// @history 0.2.1 Moved checking for Energy in initializing area to optimize code
// @history 0.2.1 Changed Stagnant Wait time to 10 minutes
// @history 0.2.1 Removed loading script for http://apps.new.facebook.com/levynlight/
// @history 0.2.0 Added display of refreshing time of Stagnant Wait in body of page
// @history 0.2.0 Fixed bug where checking for page load would return an error if the playCounter element was not present
// @history 0.2.0 Fixed bug where the minutes in Stagnant Wait would display as a single digit if it was < 10
// @history 0.2.0 Changed timeleft display to have 3 types: '830s', '14m 30s', or 14:30
// @history 0.2.0 Changed Victory and Defeat text (displays enemy name)
// @history 0.2.0 Changed all instances of 'AutoPlayer' to 'AutoPlay' to be consistent in naming
// @history 0.2.0 Removed exclamation mark in enemy name
// @history 0.2.0 Compatible with LevynLight v2.0.21
// @history 0.1.9 Added name of enemy in Status update during battles
// @history 0.1.9 Changed minutes/seconds display to show 'm' and 's' as per TheDr's request
// @history 0.1.9 Changed default behavior of timeleft display to show in minutes and seconds
// @history 0.1.9 Fixed bug where page would just show Defeat if the timer starts before the AJAX has responded
// @history 0.1.9 Fixed bug where Cancel button in settings doesn't work (Thanks TheDr)
// @history 0.1.9 Code optimizations
// @history 0.1.8 Fixed some ugh careless bugs in 0.1.7
// @history 0.1.8 Commented out untested features
// @history 0.1.7 Removed loot code as it was a scam (Thanks TheDr)
// @history 0.1.7 Added check for goblin/empty page - will refresh page after 5 minutes if the script cannot detect the timer
// @history 0.1.6 Fixed some compatibility issues with Loot in Maintenance update v2.0.15 (thanks d3stiny)
// @history 0.1.6 Added menu commands (uses Greasemonkey's memory system. Breaks support for Chrome)
// @history 0.1.6 Added ability to force update check
// @history 0.1.6 Added ability to change update frequency
// @history 0.1.6 Added ability to toggle Minutes or Seconds display
// @history 0.1.6 Added ability to toggle No Energy alert
// @history 0.1.6 Added TheSpy's Script Updater - http://userscripts.org/scripts/show/74144
// @hsitory 0.1.6 Code optimizations
// @history 0.1.5 Fixed compatibility with Chapter 4 release v2.0.14
// @history 0.1.5 Moved timerbox down to header section, above Play button
// @history 0.1.4 Changed default update frequency to 1 second
// @history 0.1.4 Script option to show minutes instead of seconds
// @history 0.1.4 Removed colon in timer display
// @history 0.1.4 Option to launch a javascript alert box if there is no energy remaining (default on)
// @history 0.1.4 Removed redundant call to start script more than once
// @history 0.1.4 Added check for whether script has started in window.onload function in case Firefox calls function twice
// @history 0.1.4 - Code optimizations
// @history 0.1.3 Chrome support (limited)
// @history 0.1.3 Code is now self-contained
// @history 0.1.3 Version variable moved up to fix 'vundefined' bug
// @history 0.1.3 Added fallback to initialize script without DOMContentLoaded (for Chrome)
// @history 0.1.3 Added 3 second delay before refreshing page
// @history 0.1.3 Added configurable script variable for update frequency (see top of script, "Settings" section)
// @history 0.1.2 Now does not keep attempting to play turn if you have no Energy
// @history 0.1.2 Now updates both subMenu info text as well as title text
// @history 0.1.2 Changed "Time to next turn: XXs" to "Next turn in XXs"
// @history 0.1.2 Added check if battle in progress before running timer functions
// @history 0.1.2 Added version in info text area
// @history 0.1.2 Added link to userscripts.org page for this script in info text tag
// @history 0.1.2 Added random time before playing turn instead of the fixed 3 seconds
// @history 0.1.2 Added DOMContentLoaded event to start script instead of the 1 second delay after script loads
// @history 0.1.2 Tested with playing map movement turns
// @history 0.1.2 Code optimizations
// @history 0.1.1 Should fix bug where page would not refresh if you lost the battle
// @history 0.1.0 Initial release
// ==/UserScript==

// Settings - will get overwritten by GreaseMonkey functions
var updateFrequency = 1;         // Frequency timer updates (in seconds)
var timeDisplayType = 1;         // Type of timeleft display
var alertOnEnergyZero = true;    // Fires a javascript alert box to inform user that he has no more energy
var stagnantThreshold = 10;      // Waits this number of seconds for page to load
var onlyAtCamp = false;          // Play turn only if user is at Camp

///////////////////////////////////////////////////////////////////////////////////////
// *** DO NOT TOUCH ANYTHING BELOW HERE IF YOU DO NOT KNOW WHAT YOU ARE DOING!!! *** //
///////////////////////////////////////////////////////////////////////////////////////

// Variable w/ Initial Values
var pageTitle = document.title;
var battleInProgress = 0;
var scriptStarted = false;
var stagnantTime = 0;

// Variable Placeholders
var header = false;
var headerHTML = false;
var i = 0;
var enemyName = '';

// Constants
var _LLAPversion = '0.2.1';

////////////////////////////
////// CORE FUNCTIONS //////
////////////////////////////

// First thing to run
// Gets script updater to check for updates
// Register menu commands in Greasemonkey
function initialize() {
    if(scriptStarted) return;
    //ScriptUpdater.check(80811, _LLAPversion);
    try {
        ScriptUpdater.check(80811, _LLAPversion);
    } catch(e) { };

    // Restore settings from Greasemonkey
    timeDisplayType = GM_getValue('timeDisplayType', 1);
    alertOnEnergyZero = GM_getValue('alertOnEnergyZero', true);
    updateFrequency = GM_getValue('updateFrequency', 1);
    stagnantThreshold = GM_getValue('stagnantThreshold', 10);
    onlyAtCamp = GM_getValue('onlyAtCamp', true);

    // Greasemonkey User Commands
    GM_registerMenuCommand("[LevynLight AutoPlay] Check for Updates", function() {
        try {
            ScriptUpdater.forceCheck(80811, _LLAPversion, function(v) {
                if(v > _LLAPversion) {
                    try {
                        ScriptUpdater.forceNotice(80811, _LLAPversion);
                    } catch(e) {};
                } else if(v < _LLAPversion) {
                    alert('[LevynLight AutoPlay]\nYou have a later version [dev] than what is on UserScripts.org!\nYour Version/UserScripts Version: ' + _LLAPversion + '/' + v);
                } else if(v == _LLAPversion) {
                    if(confirm('[LevynLight AutoPlay]\nYou already have the latest version!\nYour Version/UserScripts Version: ' + _LLAPversion + '/' + v + '\n\nClick OK to reinstall LevynLight AutoPlay v' + v + ',\b else, click Cancel.')) {
                        try {
                            ScriptUpdater.forceNotice(80811, _LLAPversion);
                        } catch(e) {};
                    }
                }
            });
        } catch(e) {};
    });

    GM_registerMenuCommand("[LevynLight AutoPlay] Change Timeleft Display", function() {
        var tmp = prompt('[LevynLight AutoPlay]\nChange the Timeleft Display.\n0 = "830s"\n1 = "14m 30s"\n2 = "14:30"', timeDisplayType);
        if(tmp === null) return;
        tmp = parseInt(tmp, 10);
        // Keep asking until they give a frikin number
        while(isNaN(tmp) || tmp < 0 || tmp > 2) {
            tmp = prompt('[LevynLight AutoPlay]\nChange the Timeleft Display.\n0 = "830s"\n1 = "14m 30s"\n2 = "14:30"', timeDisplayType);
            if(tmp === null) return;
            tmp = parseInt(tmp, 10);
        }
        // Set the value, through parseInt, base 10 (decimal)
        timeDisplayType = tmp;
        GM_setValue('timeDisplayType', timeDisplayType);
    });

    GM_registerMenuCommand("[LevynLight AutoPlay] Toggle No Energy Alert", function() {
        if(alertOnEnergyZero) {
            alertOnEnergyZero=false;
            GM_setValue('alertOnEnergyZero', false);
            alert('[LevynLight AutoPlay] You will NOT be alerted when you have no energy');
        } else {
            alertOnEnergyZero=true;
            GM_setValue('alertOnEnergyZero', true);
            alert('[LevynLight AutoPlay] You WILL be alerted when you have no energy');
        }
    });

    GM_registerMenuCommand("[LevynLight AutoPlay] Change Update Frequency", function() {
        var tmp = prompt('[LevynLight AutoPlay]\nThe current Update Frequency is ('+updateFrequency+'s). \nPlease enter the new Update Frequency (in seconds, max 900).', updateFrequency);
        if(tmp === null) return;
        tmp = parseInt(tmp, 10);
        // Keep asking until they give a frikin number
        while(isNaN(tmp) || tmp < 1 || tmp > 900) {
            tmp = prompt('[LevynLight AutoPlay]\nThe current Update Frequency is ('+updateFrequency+'s). \nPlease enter the new Update Frequency (in seconds, max 900).', updateFrequency);
            if(tmp === null) return;
            tmp = parseInt(tmp, 10);
        }
        // Set the value, through parseInt, base 10 (decimal)
        updateFrequency = tmp;
        GM_setValue('updateFrequency', updateFrequency);
    });

    GM_registerMenuCommand("[LevynLight AutoPlay] Change Stagnant Wait Threshold", function() {
        var tmp = prompt('[LevynLight AutoPlay]\nStagnant Wait is the time the script waits for the page to load (incl. AJAX functions) before deeming the page dormant and refreshing the page.\n\nThe current Threshold is ('+stagnantThreshold+'s). \nPlease enter the new Threshold (in seconds, min 5, max 30).', stagnantThreshold);
        if(tmp === null) return;
        tmp = parseInt(tmp, 10);
        // Keep asking until they give a frikin number
        while(isNaN(tmp) || tmp < 5 || tmp > 30) {
            tmp = prompt('[LevynLight AutoPlay]\nStagnant Wait is the time the script waits for the page to load (incl. AJAX functions) before deeming the page dormant and refreshing the page.\n\nThe current Threshold is ('+stagnantThreshold+'s). \nPlease enter the new Threshold (in seconds, min 5, max 30).', stagnantThreshold);
            if(tmp === null) return;
            tmp = parseInt(tmp, 10);
        }
        // Set the value, through parseInt, base 10 (decimal)
        stagnantThreshold = tmp;
        GM_setValue('stagnantThreshold', stagnantThreshold);
    });

    GM_registerMenuCommand("[LevynLight AutoPlay] Toggle only play turn at Camp", function() {
        if(onlyAtCamp) {
            onlyAtCamp=false;
            GM_setValue('onlyAtCamp', false);
            alert('[LevynLight AutoPlay] AutoPlay will run even if you are not at Camp');
            checkActions();
        } else {
            onlyAtCamp=true;
            GM_setValue('onlyAtCamp', true);
            alert('[LevynLight AutoPlay] AutoPlay will NOT run if you are not at Camp');
        }
    });

    scriptStarted = true;
    // Start function to check if the page is loaded
    checkPage();
}

// Starts playing turn
// Launches click event and starts battle loop after 3 seconds
function playTurn() {
    if(battleInProgress == 0) {
        var playbutton = document.getElementById('playbutton');
        clickElement(playbutton);
        battleInProgress = 1;
        // Start loop to check for battle status after 3 seconds
        // There is a loop within this to check if AJAX has loaded
        setTimeout(loopWhileBattle, 3000);
    }
}

/////////////////////////////
////// TIMER FUNCTIONS //////
/////////////////////////////

// Loops to check if the page is loaded
function checkPage() {
    if(document.getElementById('playCounter') == null) {
        if(stagnantTime < stagnantThreshold) {
            setTimeout(checkPage, 1000);
            stagnantTime++;
            updateStatus('Loading... (' + (stagnantThreshold-stagnantTime+1) + 's before stagnant wait)');
        } else {
            setTimeout('window.location = "http://www.levynlight.com/";', 1000*60*10);
            // Show time
            var time = new Date();
            var time_hour = time.getHours();
            var time_minutes = time.getMinutes() + 10;
            var time_suffix;

            if(time_minutes >= 60) {
                time_minutes = time_minutes - 60;
                time_hour++;
            }
            if(time_minutes < 10) time_minutes = '0' + time_minutes;	// Fix missing '0' if minutes is single-digit
            if(time_hour < 12) time_suffix = 'AM';
            else time_suffix = 'PM';
            if(time_hour == 0) time_hour = 12;
            else if(time_hour > 12) time_hour = time_hour - 12;

            updateStatus('Refreshing at ' + time_hour + ':' + time_minutes + time_suffix + ' ' + time.getSeconds() + 'seconds');

            document.getElementById('app_content_377144924760').innerHTML = '<div align="center"><h1>[LevynLight AutoPlay]</h1>' + '<h3>Refreshing at ' + time_hour + ':' + time_minutes + time_suffix + ' ' + time.getSeconds() + 'seconds</h3>' + '</div>' + document.getElementById('app_content_377144924760').innerHTML;
        }
    } else {
        header = document.getElementById("header");
        headerHTML = header.innerHTML;
        stagnantTime = 0;	// Reset stagnant time to use for turn waiting again

        // Check if there is energy. Will terminate everything if there is no energy.
        if(document.getElementById('hud_energy_quantity').innerHTML == 0) {
            updateStatus('Out of Energy!');
            if(alertOnEnergyZero)
                alert('You have run out of Energy to use in LevynLight!');
            return;
        } else

        // Check if user is at Camp
        if(onlyAtCamp && !isAtCamp()) {
            setTimeout('window.location = "http://www.levynlight.com/";', 1000*60*15);
            // Show time
            var time = new Date();
            var time_hour = time.getHours();
            var time_minutes = time.getMinutes() + 15;
            var time_suffix;

            if(time_minutes >= 60) {
                time_minutes = time_minutes - 60;
                time_hour++;
            }
            if(time_minutes < 10) time_minutes = '0' + time_minutes;	// Fix missing '0' if minutes is single-digit
            if(time_hour < 12) time_suffix = 'AM';
            else time_suffix = 'PM';
            if(time_hour == 0) time_hour = 12;
            else if(time_hour > 12) time_hour = time_hour - 12;

            updateStatus('Returning at ' + time_hour + ':' + time_minutes + time_suffix + ' ' + time.getSeconds() + 'seconds');
        } else {
            // Passed all checks; continue to script
            checkActions();
        }
    }
}

// Runs every x seconds to check for turn readyness
function checkActions() {
    // Terminate this loop if there is a battle in progress. Battle Loop will take over.
    if(battleInProgress > 0) return;

    // Check if there is energy. Will terminate everything if there is no energy.
    /*if(document.getElementById('app377144924760_hud_energy_quantity').innerHTML == 0) {
		updateStatus('Out of Energy!');
		if(alertOnEnergyZero)
			alert('You have run out of Energy to use in LevynLight!');
		return;
	}*/

    var actions = document.getElementById('hud_actions').innerHTML;
    if(actions > 0) {
        // Play turn (wait 1 second + random time between 1 and 5 seconds)
        setTimeout(playTurn, 1000 + Math.floor(Math.random()*5+1)*1000);
        updateStatus('Playing turn...');
    //window.getAttention();
    } else {
        var timeLeft = document.getElementById('playCounter').innerHTML;
        timeLeft = timeLeft.replace('+1 action in: ', '');
        var splitTime = timeLeft.split(':');
        // Check every updateFrequency seconds
        setTimeout(checkActions, updateFrequency*1000);
        if(timeDisplayType == 0)
            updateStatus('Next Turn in <b>' + parseInt(parseInt(splitTime[0])*60 + parseInt(splitTime[1])) + 's</b>');
        else if (timeDisplayType == 1)
            updateStatus('Next Turn in <b>' + timeLeft.replace(':', 'm ') + 's</b>');
        else
            updateStatus('Next Turn in <b>' + timeLeft + '</b>');
    }
}

// Runs every second to check for battle status
function loopWhileBattle() {
    if(battleInProgress == 1) {
        if(!getEnemyName()) {
            if(stagnantTime < stagnantThreshold) {
                // AJAX has not responded; run loop again in a second
                stagnantTime++;
                updateStatus('Loading... (' + (stagnantThreshold-stagnantTime+1) + 's before page refresh)');
                setTimeout(loopWhileBattle, 1000);
                return;
            } else {
                updateStatus('Refreshing Page...');
                window.location = "http://www.levynlight.com/";
                return;
            }
        } else {
            updateStatus("VS: " + enemyName);
            battleInProgress = 2;
        }
    }
    var winnerDiv = getElementsByClassName("winner player", "div", document.getElementById('turnSummary'));
    var roundOver = getElementsByClassName("hidden player", "div", document.getElementById('turnStack'));

    var won = 'Victory against ' + enemyName + '!';
    if(winnerDiv.length == 0) {
        won = 'Defeated by ' + enemyName + '!';
        // The class changes from "player" to "game" when the AI wins
        roundOver = getElementsByClassName("hidden game", "div", document.getElementById('turnStack'));
    }

    if(roundOver.length == 1 && roundOver[0].getAttribute("id") == "turnSummary") {
        // Run this every second until the battle is over.
        setTimeout(loopWhileBattle, 1000);
    } else {
        battleInProgress = 0;
        //var loot = getElementsByClassName("lootContent clear-block", "div", document.getElementById('app377144924760_turnSummary'));
        //if(loot.length == 0) {
        updateStatus(won);
        setTimeout('window.location = "http://www.levynlight.com/";', 3000);
    /*} else {
			var lootBoxes = getElementsByClassName("mysteryLoot closed", "div", loot[0]);
			updateStatus(won + " (" + lootBoxes.length + " Loot Present)");

			// Click loot boxes
			for (i = 0; i < lootBoxes.length; i++) {
				clickElement(lootBoxes[i]);
			}
			//alert('!LOOT PRESENT!');
			setTimeout('lootOpened('+lootBoxes.length+');', 1000);
			// Refresh page in 5 seconds after opening loot.
			// Should be enough for AJAX to do its thing.
			setTimeout('window.location = "http://apps.facebook.com/levynlight/";', 5000);
		}*/
    // Refresh page
    //setTimeout('window.location = "http://apps.facebook.com/levynlight/";', 3000);
    }
}
/*
function lootOpened(total) {
	var openedLootBoxes = getElementsByClassName("mysteryLoot open", "div", document.getElementById('app377144924760_turnSummary'));
	if(openedLootBoxes.length == total) {
		setTimeout('window.location = "http://apps.facebook.com/levynlight/";', 3000);
	} else {
		setTimeout('lootOpened('+total+');', 1000);
	}
}
*/
//////////////////////////////
////// HELPER FUNCTIONS //////
//////////////////////////////

function getEnemyName() {
    var enemy = getElementsByClassName("encounterText", "div", document.getElementById('turnLog'));
    if(enemy.length == 1) {
        var tmp = enemy[0].innerHTML;
        enemyName = tmp.substr(tmp.indexOf('<b>') + 3, tmp.indexOf('</b>') - tmp.indexOf('<b>') - 4);
        return true;
    }
    return false;
}

// Changes text in title as well as info box
function updateStatus(text) {
    // For title, strip tags of text.
    document.title = text.replace(/(<([^>]+)>)/ig,"") + " | " + pageTitle;
    if(header) header.innerHTML = '<div id="status" style="width: 175px;"><span style="background: #ffffff; border: 1px solid; padding: 1px; color: #999999; left: 571px; position: absolute; top: -1px; width: 161px; text-align: center;"><b>[<a href="http://userscripts.org/scripts/show/80811" target="_blank" style="color: #666666; text-decoration: none;">AutoPlayer</a> v' + _LLAPversion + ']</b><br />' + text + '</span></div>' + headerHTML;
}

// Virtually click an element
function clickElement(el) {
    /*var clickMouse = document.createEvent("MouseEvents");
	clickMouse.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	playbutton.dispatchEvent(clickMouse);*/
    var clickUI = document.createEvent("UIEvents");
    clickUI.initUIEvent("click", true, true, window, 1);
    el.dispatchEvent(clickUI);
}

// Check if user is at camp
function isAtCamp() {
    var url = window.location.toString().toLowerCase();
    if(
           url == 'http://www.levynlight.com/'
        || url == 'http://www.levynlight.com/index.php'
        || url == 'http://www.levynlight.com/turn.php'
        || url == 'http://www.levynlight.com/canvas/'
        || url == 'http://www.levynlight.com/canvas/index.php'
        || url == 'http://www.levynlight.com/canvas/turn.php'
        || url == 'http://apps.facebook.com/levynlight/'
        || url == 'http://apps.facebook.com/levynlight/index.php'
        || url == 'http://apps.facebook.com/levynlight/turn.php'
            )
        return true;
    else
        return false;
}

/*
	Following helper function getElementsByClassName is
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
            returnElements = [],
            elements,
            node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try	{
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

// Firefox DOMContentLoaded (Greasemonkey)
if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", initialize, false);
}
// Chrome window.onload (Script Extension)
// Possible support for other browsers as well
window.onload = function() {
    if(!scriptStarted) {
        setTimeout('if(!scriptStarted) { initialize(); }', 3000);
    }
}