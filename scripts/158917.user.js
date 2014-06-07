// ==UserScript==
// @name       Ingress Intel Passcodes
// @version    20130613
// @description  Detects passcodes in COMM on ingress.com/intel and displays QR code popups.
// @updateURL	https://userscripts.org/scripts/source/158917.user.js
// @include     http://www.ingress.com/intel*
// @include     https://www.ingress.com/intel*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant		GM_setValue
// @grant		GM_getResourceText
// @grant		GM_info
// jQuery for Chrome:
// @require		https://userscripts.org/scripts/source/138310.user.js
// jQuery for Firefox:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/jquery.fancybox.pack.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3.9/sugar-full.min.js
// @resource	fancyBoxCSS http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/jquery.fancybox.css
// @run-at		document-end
// @copyright  2013+, Gregory Krohne
// ==/UserScript==

var 
	// Load fancyBox CSS
	fancyBoxCSS = GM_getResourceText('fancyBoxCSS')
	// Set options for fancyBox
    , fancyBoxOptions = {
        padding: 0,
        afterClose: function () {
            // Make the QR button match the Ingress page
            $('#qrButton').css('border-color', '#59fbea');
            return;
        },
        beforeLoad: function () {
            // Make the QR button match the Ingress page
            $('#qrButton').css('border-color', '#ebbc4a');
            return;
        }
    }
    // Retrieve saved list of passcodes and timestamps
    // These 2 arrays are synchronized. Turns out to be easier to manipulate than a true 2 dimensional array
    , passcodes = JSON.parse(GM_getValue('passcodes', '[]'))
	, timestamps = JSON.parse(GM_getValue('timestamps', '[]'))
    // Online QR code generator
    , qrAPI = "http://chart.apis.google.com/chart?chf=a,s,000000&chs=300x300&chld=|0&cht=qr&chl="
    // jQuery selector for player messages
    , msgSelector = '.plext>.pl_player:not(.scanned)'
    // HTML for QR popup button
    , qrButtonHTML = '<button id="qrButton" title="Passcodes" style="background:transparent;border:1px solid rgb(89, 251, 234);margin:0px 0px 0px 0px;padding:1px 1px 1px 1px;vertical-align:middle"><img src="http://chart.googleapis.com/chart?chs=29x29&cht=qr&chl=Ingress" border="0" style="padding:0px;vertical-align:middle"/></button>'
    // The QR button will be placed on the page just after the following jQuery selector
    , qrButtonLocation = '.nav_link'
    // Most common passcode patterns:
    // [2-9][p-z][a-h][2-9]{1,2}[a-z]+[p-z][2-9][p-z][2-9][p-z]
    // [a-z][a-z]+\d{2}[a-z]
	// [2-9][p-z][2-9][p-z][a-h][2-9][a-z]+[2-9]{3}[p-z]
	// [2-9][p-z][a-h][2-9][a-z0-9]+[p-z][2-9]{3}[p-z]
	// [2-9][p-z][2-9][p-z][a-h][2-9]{4}[p-z][2-9]{3}[p-z]
    // Unusual case: 7vd53rdlawz6q2u
    // Note: this ends up matching all kinds of things that clearly aren't passcodes.
    , passcode_pattern = /\b([2-9][p-z][a-h][2-9]{1,2}[a-z]+[p-z][2-9][p-z][2-9][p-z]|[a-z][a-z]+\d{2}[a-z]|[2-9][p-z]{2}[a-h][2-9]{1,2}[a-z]+[p-z][2-9]{3}[p-z]|\d{12,13}|[2-9][p-z][a-h][2-9][a-z0-9]+[p-z][2-9]{3}[p-z]|[2-9][p-z][2-9][p-z][a-h][2-9][a-z]+[2-9]{3}[p-z]|[2-9][p-z][2-9][p-z][a-h][2-9]{4}[p-z][2-9]{3}[p-z])\b/ig
	, fancyBoxItems = [];

fancyBoxCSS = fancyBoxCSS.replace(/url\([\'\"](.+)[\'\"]\)/ig, "url('http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/$1')");
GM_addStyle(fancyBoxCSS);

// Create the QR passcode button, for adding to the page somewhere
$(qrButtonHTML)
	// Picture button; no text required.
	.attr('text', false)
	// Initially hidden
	.css('display', 'none')
	// On click, show the fancyBox QR code popup
	.click(function () {
		$.fancybox.open(fancyBoxItems, fancyBoxOptions);
	})
	// Add this button to the end of the parent container for 'qrButtonLocation'
	.appendTo($(qrButtonLocation).parent());

function fbItem(passcode, timestamp) {
    // hyperlink to a QR-generating API
    this.href = qrAPI + passcode;
    // Make sure fancyBox knows what type to expect
    this.type = 'image';
    // Let sugar.js decide the relative time
    this.title = passcode + '<br/>' + Date.create(timestamp).relative();
    this.passcode = passcode;
    this.timestamp = timestamp;
}

// Load fresh passcodes at startup

function loadFresh() {

    var i
		// Passcodes have a 12 hour expiration
        , expirationTime = (12).hoursBefore().valueOf()
		, pl = passcodes.length
		, tl = timestamps.length
		;

    // Make sure both lists are the same length
    if (pl !== tl) {
        timestamps.splice(Math.min(pl, tl), Math.abs(pl - tl));
        passcodes.splice(Math.min(pl, tl), Math.abs(pl - tl));
    }

    // Load just fresh passcodes into the QR popup list
    i = passcodes.length;
    while (i--) {
        if (timestamps[i] > expirationTime) {
            // Generate QR code, and add it to the fancyBox QR popup list
            fancyBoxItems.unshift(new fbItem(passcodes[i], timestamps[i]));
        }
    }
}

function removeExpired() {
    var 
		i = fancyBoxItems.length
		// Passcodes have a 12 hour expiration
        , expirationTime = (12).hoursBefore().valueOf()
		;

    while (i--) {
        if (fancyBoxItems[i].timestamp < expirationTime) {
            console.info('Expired:', fancyBoxItems[i].passcode);
            delete fancyBoxItems[i];
            fancyBoxItems.splice(i, 1);
        }
    }
}

// Set to global faction chat once, and only once, no matter how many times it is called.
var global_faction_chat = (function () {
    console.info('set COMM to faction/global at startup');
    $('#pl_tab_fac').click();
    if ($('#pl_checkbox').is(':checked')) {
        $('#pl_checkbox').click();
    }
}).once();

// Add handlers to the page's AJAX events
function addAjaxEvents() {

    console.info('Adding Ajax event monitors');

    // Triggers after an AJAX request has completed
    unsafeWindow.$(document)
        .ajaxComplete(

			function (event, xhr, settings) {

				if (JSON.parse(settings.data).method === "dashboard.getPaginatedPlextsV2") {
					global_faction_chat(); // This will only run once.
					loop();
				}
			});

}

function loop() {

    var matches = [],
        matchTimes = [],
        timestamp = Date.create(),
        i
        // Unscanned COMM messages by players
        , msgs = $(msgSelector).parent().clone()
        // Passcodes have a 12 hour expiration
        ,
        expirationTime = (12).hoursBefore().valueOf(),
        newPasscodes = false;

    // Remove expired passcodes from QR popups
    removeExpired();

    // Mark the scanned messages, so we don't scan them again next time.
    $(msgSelector).addClass('scanned');

    // We don't need the span tags with faction and player name
    msgs.find('.ALIENS,.RESISTANCE,.pl_secure,.pl_nudge_player').remove();

    // Create an array of possible passcodes
    $(msgs).each(function () {
        var lineMatches = $(this).find('.pl_player').text().match(passcode_pattern);
        if ( !! lineMatches) {
            matches = matches.concat(lineMatches[0].toLowerCase());
            // Tell sugarJS to assume all dates and times are in the past
            timestamp = Date.past($(this).find('.pl_timestamp').text());
            matchTimes = matchTimes.concat(timestamp.valueOf());
        }
    });

    // Add newly found passcodes
    i = matches.length;
    while (i--) {
        // If this passcode isn't in the saved list, and it isn't already expired, then...
        if ((passcodes.indexOf(matches[i]) === -1) && (matchTimes[i] > expirationTime)) {
            // Add this passcode and timestamp to the list of fresh passcodes
            passcodes.unshift(matches[i]);
            timestamps.unshift(matchTimes[i]);
            newPasscodes = true;

            // Generate QR code, and add it to the fancyBox QR popup list
            fancyBoxItems.unshift(new fbItem(matches[i], matchTimes[i]));
            console.info('passcode:', matches[i], Date.create(matchTimes[i]).relative());

        }
    }

    console.info('scanned:', msgs.length, '| matched:', matches.length, '| fresh:', fancyBoxItems.length);

    // Update the QR passcode timestamps in titles
    i = fancyBoxItems.length;
    while (i--) {
        // Let sugar.js decide the relative time
        fancyBoxItems[i].title = fancyBoxItems[i].passcode + ': ' + Date.create(fancyBoxItems[i].timestamp).relative();
    }

    // If we have fresh passcodes in the list, then...
    if (fancyBoxItems.length) {

        $('#qrButton')
        // Show the QR passcode button
        .show();

        // If we added new passcodes, then...
        if (newPasscodes) {
            // Display the QR passcode popup immediately
            $('#qrButton').click();
        }
    } else // No fresh passcodes
    {
        $('#qrButton').hide();
    }

}

function updatePasscodes() {

    // Save the fresh passcodes and timestamps
    GM_setValue('passcodes', JSON.stringify(passcodes));
    GM_setValue('timestamps', JSON.stringify(timestamps));

}

console.info(GM_info.script.name, GM_info.script.version);

addAjaxEvents();

console.info('load fresh passcodes');

loadFresh();

// Set timer to save all passcodes every 1 minute
setInterval(updatePasscodes, 60000);

// Reload page if COMM messages are too far behind
function reloadPage() {
    var
		// Time of last message in COMM
		timestampLast = Date.past($('.pl_timestamp').last().text())
		// Time of first message in COMM
        ,timestampFirst = Date.past($('.pl_timestamp').first().text())
        // Time 5 minutes ago
        ,timeLag = (5).minutesBefore()
        // Time 6 hours ago
        ,timeBacklog = (6).hoursBefore();

    // If we aren't watching global chat, stop now
    if ($('#pl_checkbox').prop('checked')) {
        return;
    }
	
	console.info ( 'COMM log within range:', ( timestampFirst.isAfter ( timeBacklog ) && timestampLast.isAfter ( timeLag ) ) );

    // If we are lagging 5 minutes behind on COMMM
    // -or-
    // If we have more than 6 hours of COMM backlog loaded
    if ( timestampLast.isBefore ( timeLag ) || timestampFirst.isBefore ( timeBacklog ) ) {
        // Reload the page
        location.reload();
    }
}

// Check whether the page needs to be reloaded once every 60 seconds.
setInterval(reloadPage, 60000);

console.info('begin monitoring');