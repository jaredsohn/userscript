// ==UserScript==
// @name            New Torrent Notifier
// @author          power78
// @description		Marks newly uploaded torrents
// @namespace		http://what.cd
// @include         http://what.cd/torrents.php*
// @include         https://ssl.what.cd/torrents.php*
// @match			http://what.cd/torrents.php*
// @match         	https://ssl.what.cd/torrents.php*
// @updateURL		http://userscripts.org/scripts/source/36156.meta.js
// @installURL		http://userscripts.org/scripts/source/36156.user.js
// @downloadURL		http://userscripts.org/scripts/source/36156.user.js
// @grant           none
// @version         3.3
// ==/UserScript==

(function (win) {
	// Constants
	var APP_NAME = "New Torrent Notifier",
		NEW_MARK = "\u272D",
		OLD_MARK = "\u2718",
		NEW_FORMAT_TITLE = "New Format",
		BRAND_NEW_TITLE = "New Torrent",
		RESET_BUTTON_VALUE = "Update Last Browse Time",
		RESET_MSG = "Your last settings were cleared, the last browse time has been reset.",
		UPDATE_MSG = "You have updated the last browse time to %s.",
		UPDATE_KEY = "ntn_last_browsed",
		LAST_UPDATE = new Date(10),
		OLD_UPDATE_KEY = "ntn_old_browsed_time",
		UPDATE_UPDATE_KEY = "ntn_browse_reset",
		RESETBOX_ID = "ntn_browse_reset",
		userRegExp = /[?&]type=(?:snatched|leeching|seeding)/i,
		TORRENT_ROWS = null,
		doc = win.document;
		
	// Add Style
	var customStyles = "#" + RESETBOX_ID + "{text-align:center; background: #EEE;} #" + RESETBOX_ID + " > div.header {font-weight:bold; margin-bottom:2px;} #" + RESETBOX_ID + " > div.content {padding:2px; font-size:1.1em;} #" + RESETBOX_ID + " > div.button_bar > input {display:inline} table#torrent_table tr.group td:first-child, table#torrent_table tr.torrent td:first-child, table#torrent_table tr.group_torrent td:first-child {text-align:center;font-weight:bold;} table#torrent_table td.new {color:rgb(42, 165, 54) !important; font-size:1.4em;} table#torrent_table td.old {color:inherit; font-size:1em;} table#torrent_table tr.ntnnew td {background:#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiMP7PkAYQYAAENAGZ9uuFpwAAAABJRU5ErkJggg==) repeat scroll 0 0;} table#torrent_table tr.ntnnew2 td {background:#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiMP7P4AAQYAAEDgFzqQQk1QAAAABJRU5ErkJggg==) repeat scroll 0 0;}";
	var newStyle = doc.createElement('style');
	newStyle.innerHTML = customStyles;
	newStyle.setAttribute("type", "text/css");
	doc.getElementsByTagName('head')[0].appendChild(newStyle);		
	
    // Initial Checks
    if ( $("table#torrent_table") === null) {
        return;
    }
	if (userRegExp.test(win.top.location.href)) {
		return;
	}

    restoreState();
	
	var header = $("table#torrent_table tr.colhead")[0];
	var cell = doc.createElement("td");
	cell.appendChild(doc.createTextNode("New"));
	header.insertBefore(cell, header.firstChild);
	
	TORRENT_ROWS = $("table#torrent_table tr:not(.colhead)");
    for (var i = 0; i < TORRENT_ROWS.length; i++) {
        var row = TORRENT_ROWS[i];

		var cell = doc.createElement("td");
		row.insertBefore(cell, row.firstChild);
		
        if (row.querySelector('td.edition_info') !== null) {
            continue;
        }

        var torrentDate = parseTorrentDate(row);
        if (!torrentDate) {
			continue;
		}
		else if (torrentDate < LAST_UPDATE) {
			highlightRow(row, false, false);
        }
		else {
			var isFormat = row.className.indexOf("group_torrent") > -1;
			highlightRow(row, true, isFormat);
		}
    }

    placeResetButton();
	
	// Done
	
	/*
	 * Helper Functions
	 */
	function $ (q) {
		return doc.querySelectorAll(q);
	}
	
    function highlightRow(row, isNew, isFormat) {
		var title = BRAND_NEW_TITLE,
			mark = OLD_MARK,
			cls = " ntnnew",
			cls2 = '';
		if (isFormat) {
			title = NEW_FORMAT_TITLE;
			cls = " ntnnew2";
		}
		if (isNew) {
			mark = NEW_MARK;
			cls2 = "new";
		}
		else {
			title = "Old Torrent";
			cls = '';
			cls2 = "old";
		}
		
		var textNode = doc.createTextNode(mark);
		row.firstChild.setAttribute("title", title);
		row.className += cls;
		row.firstChild.innerHTML = '';
		row.firstChild.className = cls2;
		row.firstChild.appendChild(textNode);
	}

    function checkForReset() {
        if (getValue(UPDATE_UPDATE_KEY) == 1) {
			var msg = UPDATE_MSG.replace('%s', printDate(LAST_UPDATE));
            displayMessage(msg);
        }
        deleteValue(UPDATE_UPDATE_KEY);
    }

    function displayMessage(msg) {
        var filterbox = $('div#ft_container')[0];
		var resetBox = getResetBox(msg);
        filterbox.parentNode.insertBefore(resetBox, filterbox);
    }

    function getResetButton() {
        var button = doc.createElement("input");
        button.setAttribute("type", "button");
        button.style.marginRight = "5px";
        button.setAttribute("title", "Last updated " + LAST_UPDATE.toUTCString());
        button.value = RESET_BUTTON_VALUE;
        button.addEventListener("click", function() {
            var date = new Date();
            setValue(OLD_UPDATE_KEY, LAST_UPDATE.toUTCString());
            setValue(UPDATE_KEY, date.toUTCString());
            setValue(UPDATE_UPDATE_KEY, 1);
            win.location.reload();
        }, false);
        return button;
    }

    function getResetBox(msg) {
        var box = document.createElement("div");
		var h2 = document.createElement("h2");
        var header = document.createElement("div");
		var content = document.createElement("div");
		var buttons = document.createElement("div");
        var text = document.createTextNode(msg);
		var title = doc.createTextNode(APP_NAME);
		
        box.id = RESETBOX_ID;
		box.className = "pad";
        header.className = "header";
		content.className = "content";
		buttons.className = "button_bar";
		
		buttons.appendChild(getUndoButton());
		buttons.appendChild(getCloseButton());
		
		h2.appendChild(title);
		header.appendChild(h2);
        box.appendChild(header);
        content.appendChild(text);
		box.appendChild(content);
		box.appendChild(buttons);
		
        return box;
    }

    function getUndoButton() {
        var undo = doc.createElement("input");
        undo.setAttribute("type", "button");
        undo.value = "Undo";
		undo.addEventListener("click", function() {
            setValue(UPDATE_KEY, getValue(OLD_UPDATE_KEY));
            deleteValue(OLD_UPDATE_KEY);
            win.location.reload();
        }, false);
        return undo;
    }

	function getCloseButton() {
		var close = doc.createElement("input");
		close.setAttribute("type", "button");
		close.value = "Close";
		close.style.marginLeft = '4px';
		close.addEventListener("click", function() {
			var box = $('#' + RESETBOX_ID)[0];
			box.parentNode.removeChild(box);
		}, false);
		return close;
	}
	
	function printDate(date) {
		var hour = date.getHours(),
			mins = date.getMinutes(),
			day  = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear(),
			ampm = "AM";
		
		if (hour >= 12) {
			ampm = "PM"
		}
		if (hour == 0) {
			hour = 12;
		}
		if (hour > 12) {
			hour -= 12;
		}
		
		return [month, day, year].join('/') + ' ' + [pad(hour), pad(mins)].join(':') + ' ' + ampm;
	}
	
	function pad(num) {
		return (num < 10 ? '0' : '') + num;
	}
	
    function restoreState() {
		var date = getValue(UPDATE_KEY);
        if (date) {
            LAST_UPDATE = new Date(date);
            checkForReset();
        }
        else {
			setValue(UPDATE_KEY, LAST_UPDATE.toUTCString());
            displayMessage(RESET_MSG);
        }
    }

    function parseTorrentDate(row) {
        var date = row.querySelector('td.nobr span.time');
        if (date) {
            return new Date(date.getAttribute("title") + " UTC");
        }
		return new Date(0);
    }

    function placeResetButton() {
        var filterButton = $('div.submit input[type="submit"]')[0];
        filterButton.parentNode.insertBefore(getResetButton(), filterButton);
    }

	function setValue(name, value) {
		if (typeof win.localStorage !== 'undefined') {
			win.localStorage.setItem(name, value);
		}
		else if (typeof GM_setValue !== 'undefined') {
			GM_setValue(name, value);
		}
		else {
			setCookie(name, value, (new Date()).getFullYear() + 4);
		}
	}
	
	function getValue(name) {
		if (typeof win.localStorage !== 'undefined') {
			return win.localStorage.getItem(name);
		}
		if (typeof GM_getValue !== 'undefined') {
			return GM_getValue(name);
		} 
		else {
			return getCookie(name);
		}
	}
	
	function deleteValue(name) {
		if (typeof win.localStorage !== 'undefined') {
			win.localStorage.removeItem(name);
		}
		if (typeof GM_deleteValue !== 'undefined') {
			GM_deleteValue(name);
		}
		else {
			setCookie(name, false, (new Date()).getFullYear() - 4);
		}
	}

    function setCookie(name, val, expr) {
        var cookie = name + "=" + val;
        if (expr) {
            cookie += "; expires=Fri, 3 Aug " + expr + " 20:47:11 UTC; path=/";
        }
        doc.cookie = cookie;
    }

    function getCookie(name) {
        var cookie = name + "=";
        var ca = doc.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(cookie) === 0) {
                return c.substring(cookie.length, c.length);
            }
        }
    }
})(typeof(unsafeWindow) !== 'undefined' ? unsafeWindow : window);