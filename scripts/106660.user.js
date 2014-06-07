// ==UserScript==
// @name           Google Naptár - Oldalsáv és kereső gomb
// @namespace      http://morneo.com
// @description    Kettő extra gomb hozzáadása a Google Naptárhoz. Összecsukható így az oldalsáv, és a kereső mező egy gombnyomással
// @include        https://www.google.com/calendar/*
// @include        http://www.google.com/calendar/*
// ==/UserScript==

/*

	Én csak honosítottam a szkriptet, minden elismerés Steffen Petersen kollegát illeti.

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
  2011-07-12: MorNeo lefordította magyar nyelvre az eredeti szkriptet.

 */
function GCCB_sidebarHide() {
    var sidebar = document.getElementById('nav');
    var applogo = document.getElementById('vr-proto-nav').childNodes[0];
    var calendar = document.getElementById('mainbody');
    var calctrl = document.getElementById('topLeftNavigation');
    var button = document.getElementById('GCCB_sidebarbtn');
    button.classList.remove('goog-imageless-button-checked');
    sidebar.style.display = 'none';
    applogo.style.display = 'none';
    calendar.style.marginLeft = '15px'; // A small margin looks better.
    calctrl.style.left = '15px';
    // GM_setValue('sidebarIsHidden', true);
}
function GCCB_sidebarShow() {
    var sidebar = document.getElementById('nav');
    var applogo = document.getElementById('vr-proto-nav').childNodes[0];
    var calendar = document.getElementById('mainbody');
    var calctrl = document.getElementById('topLeftNavigation');
    var button = document.getElementById('GCCB_sidebarbtn');
    button.classList.add('goog-imageless-button-checked');
    sidebar.style.display = 'block';
    applogo.style.display = 'block';
    calendar.style.marginLeft = '210px';
    calctrl.style.left = '210px';
    // GM_setValue('sidebarIsHidden', false);
 }
function GCCB_sidebarToggle() {
    document.defaultView.getComputedStyle(
	document.getElementById('nav'), null
    ).display == 'block' ? GCCB_sidebarHide() : GCCB_sidebarShow();
}
function GCCB_searchHide() {
    var search = document.getElementById('vr-proto-header');
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
    button.classList.remove('goog-imageless-button-checked');
    search.style.height = '0px';
    search.childNodes[0].style.display = 'none';
    search.childNodes[2].style.display = 'none';
    notice.style.top = '0px';
    // GM_setValue('searchbarIsHidden', true);
}
function GCCB_searchShow() {
    var search = document.getElementById('vr-proto-header');
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
    button.classList.add('goog-imageless-button-checked');
    search.style.height = '71px';
    search.childNodes[0].style.display = 'block';
    search.childNodes[2].style.display = 'block';
    notice.style.top = '60px';
    // GM_setValue('searchbarIsHidden', false);
}
function GCCB_searchToggle() {
    document.defaultView.getComputedStyle(
        document.getElementById('vr-proto-header'), null
    ).height == '71px' ? GCCB_searchHide() : GCCB_searchShow();
}
function GCCB_setup() {
    if (document.getElementById('mg-refresh')) {
    	var orig = document.getElementById('topRightNavigation')
	    .childNodes[0];
	var our = orig.cloneNode(false);
	our.setAttribute('title', 'Display');

	// Deep clone first button from the source and change the text. Add
	// certain attributes and relevant event listeners.
	var sidebarbtn = orig.childNodes[0].cloneNode(true);
	sidebarbtn.setAttribute('id', 'GCCB_sidebarbtn');
	sidebarbtn.classList.add('goog-imageless-button-checked');
	var sidebarbtndivs = sidebarbtn.getElementsByTagName('div');
	for (var i = sidebarbtndivs.length-1; i >= 0; i--) {
	    var div = sidebarbtndivs[i];
	    if (div.classList.contains('goog-imageless-button-content')) {
		div.removeChild(div.childNodes[0]);
		div.appendChild(document.createTextNode('Oldalsáv'));
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
	var searchbtn = orig.childNodes[0].cloneNode(true);
	searchbtn.setAttribute('id', 'GCCB_searchbtn');
	searchbtn.classList.add('goog-imageless-button-checked');
	var searchbtndivs = searchbtn.getElementsByTagName('div');
	for (var i = searchbtndivs.length-1; i >= 0; i--) {
	    var div = searchbtndivs[i];
	    if (div.classList.contains('goog-imageless-button-content')) {
		div.removeChild(div.childNodes[0]);
		div.appendChild(document.createTextNode('Keresés'));
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
	document.getElementById('mg-refresh')
	    .addEventListener('click', function (e) {
		if (document.defaultView.getComputedStyle(
		    document.getElementById('vr-proto-header'), null
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
	document.addEventListener('keydown', function (e) {
		var elem = e.target.nodeName.toLowerCase();
		if (elem == 'input' || elem == 'textarea') return true;
		if (String.fromCharCode(e.which).toLowerCase() == 'h'
		    && !e.ctrlKey && !e.metaKey) {
		    GCCB_searchToggle();
		    GCCB_sidebarToggle();
		}
	    }, false);
	our.appendChild(sidebarbtn);
	our.appendChild(searchbtn);
	document.getElementById('topRightNavigation')
	    .insertBefore(our, orig.nextSibling);
	orig.style.right =
	    parseInt(document.defaultView.getComputedStyle(orig, null).right)
	    + 15 // Padding between containers.
	    + our.childNodes.length * 58 // Width of our line
	    + 'px';
	// if (GM_getValue('sidebarIsHidden', false)) GCCB_sidebarToggle();
	// if (GM_getValue('searchbarIsHidden', false)) GCCB_searchToggle();

    }
    else {
	window.setTimeout(GCCB_setup, 250);
    }
}
GCCB_setup();