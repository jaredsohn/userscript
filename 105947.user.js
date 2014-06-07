// ==UserScript==
// @name           Google Calendar Collapsible Bars
// @namespace      http://spet.dk/
// @description    Adds buttons to collapse the sidebar (containing the list of calendars) and the search bar (containing the Google logo and calendar search).
// @include        http://calendar.google.tld/*
// @include        https://calendar.google.tld/*
// @include        http://www.google.tld/calendar*
// @include        https://www.google.tld/calendar*
// @include        http://google.tld/calendar*
// @include        https://google.tld/calendar*
// @include        http://calendar.google.com/*
// @include        https://calendar.google.com/*
// @include        http://www.google.com/calendar*
// @include        https://www.google.com/calendar*
// @include        http://google.com/calendar*
// @include        https://google.com/calendar*
// ==/UserScript==

/*

  Copyright 2011 Steffen Petersen, spet@spet.dk.
  
  This program is free software: you can redistribute it and/or modify it under
  the terms of the GNU General Public License as published by the Free Software
  Foundation, either version 3 of the License, or (at your option) any later
  version.

  This program is distributed in the hope that it will be useful, but WITHOUT
  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
  details.

  You should have received a copy of the GNU General Public License along with
  this program.  If not, see <http://www.gnu.org/licenses/>.

 */

/*

  CHANGELOG

  2011-07-02: Initial relase.
  2011-07-03: New search bar hiding method: Fixes missing notifications.
              Added GPLv3 license information.
	      Fixed partial search bar display upon reload.
  2011-07-06: Refactoring of toggle methods.
              Hiding Sidebar will hide red Calendar link for added space.
  2011-07-18: Added persistence: State of bars are remebered across page loads.
              Fixed partial uhiding of search bar.
	      Added max time to wait for interface to be populated.
	      Added further @includes, taken from http://userscripts.org/scripts/show/8507
  2011-08-12: Added persistence compatability for Opera and Chrome,
                original work by James Campos, see license and
                attribution under this changelog.
              Added further @includes as Opera does not undestand ".tld".
              Fixed references to div ids as per changes from Google.
              Minor cosmetic changes.
  2011-09-05: Updated to suit changes in interface.
              Removed margins left and right of calendar.
              Prevented default action for shortcut key 'h'.

 */

/*

  The emulated functions GM_getValue, GM_setValue, GM_deleteValue,
  GM_log and GM_registerMenuCommand are not part of this program and
  is not covered by the above GPLv3 license. They are "lent" from
  http://userscripts.org/topics/41177 and are covered by Creative
  Commons cc-by-3.0 (http://creativecommons.org/licenses/by/3.0).

  As per the license these functions are hereby attributed to the
  original author James Campos (2009, 2010).

*/
if (typeof GM_deleteValue == 'undefined') {
    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_registerMenuCommand = function(name, funk) {
	//todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
/*

  End of James Campos' work. The following is covered by the
  aforementioned GPLv3 license.

*/


// The sidebar is quite easy to hide: First set the display of the div
// containing the entire sidebar to none (note, that this is NOT the
// one with id sidebar but with id nav). Then adjust the margin of the
// calendar body to fill the space freed. For some reason Google would
// like to have 44px of white space on either side of the calendar, we
// change this to nothing.
function GCCB_sidebarHide() {
    var sidebar  = document.getElementById('nav');
    var applogo  = document.getElementById('vr-nav').childNodes[0];
    var calendar = document.getElementById('mainbody');
    var grid     = document.getElementById('gridcontainer');
    var calctrl  = document.getElementById('topLeftNavigation');
    var button   = document.getElementById('GCCB_sidebarbtn');
    button.classList.remove('goog-imageless-button-checked');
    sidebar.style.display = 'none';
    applogo.style.display = 'none';
    calendar.style.marginLeft = '0px';
    grid.style.marginRight = '0px';
    calctrl.style.left = '16px';
    GM_setValue('sidebarIsHidden', true);
}
function GCCB_sidebarShow() {
    var sidebar  = document.getElementById('nav');
    var applogo  = document.getElementById('vr-nav').childNodes[0];
    var calendar = document.getElementById('mainbody');
    var grid     = document.getElementById('gridcontainer');
    var calctrl  = document.getElementById('topLeftNavigation');
    var button   = document.getElementById('GCCB_sidebarbtn');
    button.classList.add('goog-imageless-button-checked');
    sidebar.style.display = 'block';
    applogo.style.display = 'block';
    calendar.style.marginLeft = '210px';
    grid.style.marginRight = '44px';
    calctrl.style.left = '210px';
    GM_setValue('sidebarIsHidden', false);
 }
function GCCB_sidebarToggle() {
    document.defaultView.getComputedStyle(
	document.getElementById('nav'), null
    ).display == 'block' ? GCCB_sidebarHide() : GCCB_sidebarShow();
}

// Hiding the search bar is not as easy a just setting display for the bar to
// none. The search bar contains the div (#ntowner) which in turn will contain
// notifications for adding, editing and deleting events as well as general
// notifications of problems. Setting the display property of the search bar to
// none will remove the notifications, which is undesirable. Instead, set the
// height of the search bar to 0px and display none for all its children except
// the one holding the notifications.
// 
// In addition, toggling the bar will then make the gridcontainer (which
// contains the actual calendar view) to large or small so we add/remove the
// height of the bar to the grid with each toggle. Actually we will need to
// edit the height of different elements depending on the exact view, but this
// can be handled by looking at the container and the containers last child and
// only setting the height if it is already set. It's not an elegant solution
// but it seems to work.
function GCCB_searchHide() {
    var search = document.getElementById('vr-header');
    var button = document.getElementById('GCCB_searchbtn');
    var notice = document.getElementById('ntowner');
    var grid   = document.getElementById('gridcontainer');
    var gridnodes = [grid, grid.lastChild];
    if (document.defaultView.getComputedStyle(search, null).height != '0px') {
	for (var i in gridnodes) {
	    var g = gridnodes[i];
	    if (g.style.height != '') {
		g.style.height = parseInt(document.defaultView.getComputedStyle(g, null).height) + 71 + 'px';
	    }
	}
    }
    for (var i = 0; i < search.childNodes.length; i++) {
	var c = search.childNodes[i];
	if (c != notice) c.style.display = 'none';
    }
    button.classList.remove('goog-imageless-button-checked');
    search.style.height = '0px';
    notice.style.top = '0px';
    GM_setValue('searchbarIsHidden', true);
}
function GCCB_searchShow() {
    var search = document.getElementById('vr-header');
    var button = document.getElementById('GCCB_searchbtn');
    var notice = document.getElementById('ntowner');
    var grid   = document.getElementById('gridcontainer');
    var gridnodes = [grid, grid.lastChild];
    if (document.defaultView.getComputedStyle(search, null).height != '71px') {
	for (var i in gridnodes) {
	    var g = gridnodes[i];
	    if (g.style.height != '') {
		g.style.height = parseInt(document.defaultView.getComputedStyle(g, null).height) - 71 + 'px';
	    }
	}
    }
    for (var i = 0; i < search.childNodes.length; i++) {
	var c = search.childNodes[i];
	if (c != notice) c.style.display = 'block';
    }
    button.classList.add('goog-imageless-button-checked');
    search.style.height = '71px';
    notice.style.top = '60px';
    GM_setValue('searchbarIsHidden', false);
}
function GCCB_searchToggle() {
    document.defaultView.getComputedStyle(
        document.getElementById('vr-header'), null
    ).height == '71px' ? GCCB_searchHide() : GCCB_searchShow();
}

// We want to copy certain controls but Google Calendar creates these after the
// page has loaded. We check for the existence of the last control in the
// relevant section before doing anything. If nothing is found we wait 250ms and
// try again until end of patience.
function GCCB_setup() {
    if (document.getElementById('mg-refresh')) {
	// Copy the container holder the 'Day', 'Week', etc. buttons as we want
	// our buttons to have the same look and feel.
    	var orig = document.getElementById('topRightNavigation')
	    .childNodes[0];
	var our = orig.cloneNode(false);
	our.setAttribute('title', 'Controls');

	// Deep clone first button from the source and change the text. Add
	// certain attributes and relevant event listeners.
	var sidebarbtn = orig.childNodes[1].cloneNode(true);
	sidebarbtn.setAttribute('id', 'GCCB_sidebarbtn');
	sidebarbtn.classList.add('goog-imageless-button-checked');
	var sidebarbtndivs = sidebarbtn.getElementsByTagName('div');
	for (var i = sidebarbtndivs.length-1; i >= 0; i--) {
	    var div = sidebarbtndivs[i];
	    if (div.classList.contains('goog-imageless-button-content')) {
		div.removeChild(div.childNodes[0]);
		div.appendChild(document.createTextNode('Sidebar'));
		break;
	    }
	}
	sidebarbtn.addEventListener('click', function (e) {
		GCCB_sidebarToggle();
	    }, false);
	sidebarbtn.addEventListener('mouseover', function (e) {
		this.classList.add('goog-imageless-button-hover');
	    }, false);
	sidebarbtn.addEventListener('mouseout', function (e) {
		this.classList.remove('goog-imageless-button-hover');
	    }, false);
	
	// Deep clone last button from the source and change the text. Add
	// certain attributes and relevant event listeners.
	var searchbtn = orig.lastChild.cloneNode(true);
	searchbtn.setAttribute('id', 'GCCB_searchbtn');
	searchbtn.classList.add('goog-imageless-button-checked');
	var searchbtndivs = searchbtn.getElementsByTagName('div');
	for (var i = searchbtndivs.length-1; i >= 0; i--) {
	    var div = searchbtndivs[i];
	    if (div.classList.contains('goog-imageless-button-content')) {
		div.removeChild(div.childNodes[0]);
		div.appendChild(document.createTextNode('Search'));
		break;
	    }
	}
	searchbtn.addEventListener('click', function (e) {
		GCCB_searchToggle();
	    }, false);
	searchbtn.addEventListener('mouseover', function (e) {
		this.classList.add('goog-imageless-button-hover');
	    }, false);
	searchbtn.addEventListener('mouseout', function (e) {
		this.classList.remove('goog-imageless-button-hover');
	    }, false);

	// When clicking the refresh button (or using the 'r' shortcut key) part
	// of the search bar is shown. This ugly workaround will fix that.
	document.getElementById('mg-refresh')
	    .addEventListener('click', function (e) {
		if (document.defaultView.getComputedStyle(
		    document.getElementById('vr-header'), null
		).height == '0px') GCCB_searchHide();
		}, false);
	document.addEventListener('keydown', function (e) {
		var elem = e.target.nodeName.toLowerCase();
		if (elem == 'input' || elem == 'textarea') return true;
		if (String.fromCharCode(e.which).toLowerCase() == 'r'
		    && !e.ctrlKey && !e.metaKey
		    && !document.getElementById('GCCB_searchbtn')
		        .classList.contains('goog-imageless-button-checked')
		    ) GCCB_searchHide();
	    }, false);

	// Add a shortcut key to toggle both sidebar and search bar. We're using
	// the key h with the mnemonic hide.
	document.addEventListener('keydown', function (e) {
		var elem = e.target.nodeName.toLowerCase();
		if (elem == 'input' || elem == 'textarea') return true;
		if (String.fromCharCode(e.which).toLowerCase() == 'h'
		    && !e.ctrlKey && !e.metaKey) {
		    GCCB_searchToggle();
		    GCCB_sidebarToggle();
		    e.preventDefault(true);
		}
	    }, false);

	// Add out buttons to the container and add the container to the DOM
	// tree. The source container is placed absolutely so we have to adjust
	// its position to accomodate out container.
	our.appendChild(sidebarbtn);
	our.appendChild(searchbtn);
	document.getElementById('topRightNavigation')
	    .insertBefore(our, orig.nextSibling);
	orig.style.right =
	    parseInt(document.defaultView.getComputedStyle(orig, null).right)
	    + our.childNodes.length * (54+16) // Width of our line
	    + 16 // padding
	    + 'px';

	// Should the bars be hidden? This is a setting local to the accessing
	// client and will not be synchronized with the users Google account. It
	// will however be used for anybody accessing Google Calendar using the
	// browser.
	if (GM_getValue('sidebarIsHidden', false) == true)   GCCB_sidebarToggle();
	if (GM_getValue('searchbarIsHidden', false) == true) GCCB_searchToggle();
    }
    else if (haveWaited < maxWait) {
	window.setTimeout(GCCB_setup, waitStep);
	haveWaited += waitStep;
    }
    else {
	GM_log("Google Calendar Collapsible Bars reached maximum waiting time " +
	       "and interface has not been populated. This should not happen " +
	       "unless interface has changed. Pester author.");
    }
}

// To make sure GCCB_setup() does not create an infinite loop if Google changes
// the interface. A maximum time of 10 seconds can be waited. This is a hard
// limit so it won't slow down browsers on lesser hardware, at least not for
// mere than 10 seconds...
var maxWait = 10000;
var waitStep = 250;
var haveWaited = 0;

// It may be desirable to revert to default and we provide a way to do that.
GM_registerMenuCommand('Forget state of search and sidebars', GCCB_forget);
function GCCB_forget() {
    GM_deleteValue('sidebarIsHidden');
    GM_deleteValue('searchbarIsHidden');
}

// Do Magic!
GCCB_setup();
