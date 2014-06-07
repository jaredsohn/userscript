// ==UserScript==
// @name         GW2Stuff Event Audio Notifications
// @namespace    http://webering.eu/~fritz/projects/gw2stuffaudio/gw2stuffaudio.user.js
// @version      0.2g
// @description  Adds audio notifications to *.gw2stuff.com (event timers for Guild Wars 2) when an event becomes active.
// @include      http://*.gw2stuff.com/*events/*
// @downloadURL  https://userscripts.org/scripts/source/169173.user.js
// @updateURL    http://userscripts.org.nyud.net/scripts/source/169173.meta.js
// @copyright    2013, Fritz Webering
// @license      Public Domain
// ==/UserScript==


/*
 * LICENSE TERMS AND CONDITIONS
 * 
 * This code is in the public domain, just do whatever you want with it.
 */

/*
 * CHANGELOG
 * 
 * 0.2g
 *  - Fixed a bug that prevented events from beeping if they became
 *    active for a second time (e.g. when you missed them the first time).
 * 
 * 0.2f
 *  - Changed @include directive to work on localized pages like
 *    http://us.gw2stuff.com/en/events/drakkar-lake as well as
 *    http://us.gw2stuff.com/events/drakkar-lake
 * 
 * 0.2d, 0.2e
 *  - Don't play sound for events that are hidden by filters
 * 
 * 0.2c
 *  - Fixed the bug that would beep even though the event was
 *    already marked as completed
 *  - Switched to userscripts.org for https (needed for automatic
 *    updates in Greasemonkey)
 * 
 * 0.2b
 *  - Fixed script after the structure of the site was changed
 * 
 * 0.2a
 *  - Minor typos fixed
 * 
 * 0.2
 *  - Added audio notification when the site "goes to sleep" / stops updating
 *  - Change favicon to "Zzz" when site is sleeping
 *  - Added some comments
 *  - Added changelog
 * 
 * 0.1a
 *  - Fixed @include directive to work on all subdomains of gw2stuff.com
 * 
 * 0.1
 *  - Initial release
 *  - Beep when event comes active
 */


// Create audio player element
var div = document.createElement("div");
div.innerHTML = 
    'Audio Notificaions: '+
    '<audio id="audioplayer" preload="auto" controls="yes" style="vertical-align:bottom">'+
    	'<source src="http://blamestar.de/files/beep.ogg" type="audio/ogg" />'+
    	'<source src="http://blamestar.de/files/beep.mp3" type="audio/mp3" />'+
    '</audio>';
div.id = 'audioplayer-content';
div.className = 'header-text'
document.getElementById('main-menu').appendChild(div);


// Save the audio volume across page loads
var player = document.getElementById('audioplayer');
player.volume = Number(GM_getValue('audioVolume', 1))
player.addEventListener('volumechange', saveVolume, false);


// Check if events became active every 2 seconds
var checkIntervalHandle = setInterval(checkActive, 2000);


// Helper functions
function saveVolume() { GM_setValue('audioVolume', this.volume.toString()) }
function playSound() { document.getElementById('audioplayer').play() }


// Add a nice reminder to the sleep overlay
document.getElementById('sleep-text').innerHTML +=
    '<p style="font-size:12pt;">If you don\'t want to do any more events today, please don\'t wake up the site to help reduce server load.</p>'


// Prepare for swapping the favicon when the site went to sleep
var zzzIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4y6WSzQrAIAyD0+FljL3/g4p47E4Dp7G1s+DJJHz9ATZLAOC8brVEtWTxgnT2vPDUkrTVG1lQLVkoWitm+O8/DYiYB/So+RPwx0zXOFuZOcSdO0iBo1N2hOHyaMNmWUSW3szmoqRPF/cwRLoS8gA5UkuHhb8FXQAAAABJRU5ErkJggg=='
var linkElements = document.head.getElementsByTagName('link');
var faviconElement = null;
for (var i = 0; i < linkElements.length; i++) {
    if (linkElements[i].rel == 'icon') faviconElement = linkElements[i];
}
var originalFavicon = faviconElement.href;

// Main function that checks if anything changed. Gets called periodically
function checkActive() {
    var play = 0;
    
    var events = document.getElementById('event-container').children;
    for (var i = 0; i < events.length; i++) {
        var e = events[i];
        // Check if event became active
        if (e.dataset.was_active != "true" && e.classList.contains("active")) {
            var display = window.getComputedStyle(e).display;
            // Don't play sound if the event is marked as completed or hidden by filters
            if (!e.classList.contains("completed") && display != "none") {
                play = 2;
            }
            e.dataset.was_active = "true"; // Dont beep each time for the same event
        }
        // Check if event became inactive and reset internal flag
        else if (e.dataset.was_active == "true" && e.classList.contains("inactive")) {
            e.dataset.was_active = "false";
        }
    }
    
    // Check if the site just "went to sleep"
    if (document.body.dataset.was_sleeping != "true" && document.body.classList.contains("sleeping")) {
        document.body.dataset.was_sleeping = "true";
        faviconElement.href = zzzIcon;
        play = 2;
    }
    // Reset sleeping flag
    if (document.body.dataset.was_sleeping == "true" && !document.body.classList.contains("sleeping")) {
        document.body.dataset.was_sleeping = "false";
        faviconElement.href = originalFavicon;
    }
    
    // Play audio file for the specified number of times
    while (play-- > 0) {
        setTimeout(playSound, play * 1000);
    }
}