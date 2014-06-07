// ==UserScript==
// @name        MITx 6.002x Scrollable Textbook
// @namespace   nitrogenaudio
// @description Provides efficient full-length scrolling of the MITx 6.002x textbook (unofficial).
// @match	http://6002x.mitx.mit.edu/book*
// @match	https://6002x.mitx.mit.edu/book*
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.1
// ==/UserScript==

// Scrollable MITx 6.002x textbook
// A quick hack by Mike Bourgeous (nitrogenaudio.com/contact.html)
// (C)2012 Mike Bourgeous - CC-BY or 2-clause BSD (see the README on github)
// https://github.com/nitrogenlogic/6002x_textscroll
//
// Ideas for improvement:
//  - Use <canvas> to sharpen textbook images
//  - Store more page history in browser history
//  - Allow typing a page number into the page number overlay


// Firefox+Greasemonkey provides a useful unsafeWindow by default, that allows
// us to replace goto_page() and make SCR_TXT available for use in the console.
// Chrome provides an unsafeWindow that doesn't actually grant access to the
// page content, meaning jQuery is unavailable.  The fix for Chrome is getting
// the original window object by creating an element and setting its onclick
// handler to a function that returns the window object.  Unfortunately, this
// breaks in Firefox+Greasemonkey, leaving goto_page() unmodified and SCR_TXT
// unavailable.  Having failed to find a way of getting both browsers' user
// script implementations to work, I am resorting to browser detection by name.
if(window.navigator.vendor.match(/Google/)) {
	// Based on https://gist.github.com/1143845 and http://stackoverflow.com/a/4751049
	var windowFunc = function() {
		var div = document.createElement('div');
		div.setAttribute('onclick', 'return window;');
		return div.onclick();
	}
	unsafeWindow = windowFunc();
} else if(typeof unsafeWindow === 'undefined') {
	// Running as a native script in the HTML demo page
	unsafeWindow = window;
}

var $ = unsafeWindow.jQuery;

var console = unsafeWindow.console;

var SCR_TXT = {
	// Book structure settings
	firstPage: 0, // First physical page number (i.e. number of first image)
	lastPage: 1008, // Number of last image
	pageOne: 25, // Physical page number of page 1
	pageDigits: 3, // Minimum number of digits in image filenames
	pageWidth: 960, // Width of a page in pixels
	pageHeight: 1080, // Height of a page in pixels
	urlPrefix: unsafeWindow.location.search.substring(1),
	urlSuffix: '.png',

	// Network behavior settings
	pagesBefore: 1, // Number of pages to load before the current page (should be >= 1)
	totalPages: 4, // Total number of pages to keep loaded
	loadInterval: 150, // Minimum number of milliseconds to wait between page loads
};

// Namespace pollution avoidance wrapper for scrollable textbook initialization.
$(function() {
	// Pads nbr to at least the given number of digits using leading zeros.
	SCR_TXT.zeroPad = function(nbr, digits) {
		var zeros = digits - nbr.toString().length;
		var str = '';

		for(var i = 0; i < zeros; i++) {
			str += '0';
		}
		str += nbr.toString();

		return str;
	}

	// Excludes values in range1 from range2, operating under the assumption that
	// neither range will entirely enclose the other, with leftover elements on
	// both ends.  Range1 and range2 should both be two-numeric-element arrays.
	// The original arrays are not modified.
	// Example: SCR_TXT.excludeRange([15, 20], [19, 24]) returns [21, 24].
	SCR_TXT.excludeRange = function(range1, range2) {
		var min1 = range1[0];
		var max1 = range1[1];
		var min2 = range2[0];
		var max2 = range2[1];

		if(max1 < min2 || min1 > max2) {
			// range1 and range2 do not overlap
			return range2;
		}

		if(min1 <= min2 && max1 >= max2) {
			// range1 entirely eliminates range2
			min2 = -1;
			max2 = -1;
		} else if(max1 >= min2 && min1 <= min2) {
			// range1 chops elements off the beginning of range2
			min2 = max1 + 1;
		} else if(min1 <= max2 && max1 >= max2) {
			// range1 chops elements off the end of range2
			max2 = min1 - 1;
		} else {
			// range1 lies within range2, creating an invalid split
			throw 'Range2 encloses range1: [' + range1.join(', ') + '] and ['
				+ range2.join(', ') + '] -- unable to split range';
		}

		return [min2, max2];
	}

	// Creates an unloaded img tag for the given page number.
	SCR_TXT.makeImage = function(pageno) {
		var pageStr = SCR_TXT.zeroPad(pageno, SCR_TXT.pageDigits);
		var image = document.createElement('img');
		$(image).attr('id', 'page_' + pageno)
			.attr('alt', 'Page ' + (pageno - SCR_TXT.pageOne + 1))
			.attr('data-src', '' + SCR_TXT.urlPrefix + pageStr + SCR_TXT.urlSuffix)
			.css('max-width', '' + (SCR_TXT.pageWidth) + 'px')
			.css('max-height', '' + (SCR_TXT.pageHeight) + 'px')
			.css('width', '100%')
			.css('height', 'auto')
			.css('margin', '0')
			.css('display', 'inline-block')
			.css('padding', '0')
			.css('border', 'solid 1px #ccc');
		return image;
	}

	// Creates a section with unloaded img tag for the given page number.
	SCR_TXT.makePage = function(pageno) {
		var section = document.createElement('section');
		$(section).attr('class', 'page')
			.css('max-width', '' + (SCR_TXT.pageWidth) + 'px')
			.css('height', '' + (SCR_TXT.pageHeight) + 'px')
			.css('background', '#fff')
			.css('border', 'solid 1px black')
			.css('margin', '10px auto')
			.css('padding', '10px')
			.html(SCR_TXT.makeImage(pageno));
		return section;
	}

	// Returns the currently visible page number based on scroll bar position.
	// Includes fractional page amount.
	SCR_TXT.currentPage = function() {
		var offset = $(document).scrollTop() + $(unsafeWindow).height() / 2 - SCR_TXT.scrollStart;
		var pageno = offset / SCR_TXT.scrollOffset + SCR_TXT.firstPage;

		return Math.min(Math.max(pageno, SCR_TXT.firstPage), SCR_TXT.lastPage);
	}

	// Returns the integer logical page number of the currently visible page.
	SCR_TXT.currentLogicalPage = function() {
		return Math.floor(SCR_TXT.currentPage() - SCR_TXT.pageOne + 1);
	}

	// Returns the minimum and maximum pages to load, inclusive.
	// If pageno is unspecified, the current page will be used.
	SCR_TXT.pageRange = function(pageno) {
		pageno = pageno || SCR_TXT.currentPage();
		var minPage = Math.floor(pageno) - SCR_TXT.pagesBefore;
		var maxPage = minPage + SCR_TXT.totalPages - 1;

		minPage = Math.min(Math.max(minPage, SCR_TXT.firstPage), SCR_TXT.lastPage);
		maxPage = Math.min(Math.max(maxPage, SCR_TXT.firstPage), SCR_TXT.lastPage);

		return [minPage, maxPage];
	}

	// Loads the pages within the specified range, inclusive.  The range
	// may be specified as a two-element integer array passed in min.
	SCR_TXT.loadPages = function(min, max) {
		if(min instanceof Array) {
			max = min[1];
			min = min[0];
		}

		for(var i = min; i <= max; i++) {
			var img = $(SCR_TXT.pages[i - SCR_TXT.firstPage]).find('img');
			img.attr('src', img.attr('data-src'))
				.css('border', 'none');
		}
	}

	// Unloads the pages within the specified range, inclusive.  The range
	// may be specified as a two-element integer array passed in min.
	SCR_TXT.unloadPages = function(min, max) {
		if(min instanceof Array) {
			max = min[1];
			min = min[0]
		}

		for(var i = min; i <= max; i++) {
			var page = $(SCR_TXT.pages[i - SCR_TXT.firstPage]);
			page.html(SCR_TXT.makeImage(i))
		}
	}

	// Scrolls to the top of the given page
	SCR_TXT.scrollToPage = function(pageno) {
		$(document).scrollTop($(SCR_TXT.pages[pageno - SCR_TXT.firstPage]).offset().top - 10);
	}

	// Loads and unloads pages in a timer set by SCR_TXT.updateScroll().
	SCR_TXT.loadNewPages = function() {
		var pageno = SCR_TXT.currentPage();
		var oldRange = SCR_TXT.lastPagerange || [-1, -1];
		var newRange = SCR_TXT.pageRange(pageno);
		var unloadRange = SCR_TXT.excludeRange(newRange, oldRange);
		var loadRange = SCR_TXT.excludeRange(oldRange, newRange);

		console.log("Previous range: " + oldRange);
		console.log("New range: " + newRange);
		console.log("Pages to unload: " + unloadRange);
		console.log("Pages to load: " + loadRange);

		SCR_TXT.unloadPages(unloadRange);
		SCR_TXT.loadPages(loadRange);

		SCR_TXT.lastPageno = pageno;
		SCR_TXT.lastPagerange = newRange;
	}

	// Schedules loading and unloading of pages based on the current scroll position.
	var pageLoadTimer;
	SCR_TXT.updateScroll = function() {
		SCR_TXT.scrollStart = $(SCR_TXT.pages[0]).offset().top;
		SCR_TXT.scrollOffset = $(SCR_TXT.pages[1]).offset().top - SCR_TXT.scrollStart;

		var pageno = SCR_TXT.currentPage();
		console.log("Current page is " + pageno);

		if(Math.floor(pageno) != Math.floor(SCR_TXT.lastPageno)) {
			console.log("Integer page number " + Math.floor(pageno) +
					" differs from previous: " + Math.floor(SCR_TXT.lastPageno));

			// MITx original page selection logging
			// log_event("book", {"type":"gotopage","old":Math.floor(SRC_TXT.lastPageno),"new":Math.floor(pageno)});

			if(pageno < SCR_TXT.pageOne) {
				SCR_TXT.pageNumberOverlay.text('i-' + Math.floor(pageno));
			} else {
				SCR_TXT.pageNumberOverlay.text(Math.floor(pageno - SCR_TXT.pageOne + 1));
			}

			if(pageLoadTimer) {
				clearTimeout(pageLoadTimer);
			}
			pageLoadTimer = setTimeout(SCR_TXT.loadNewPages, SCR_TXT.loadInterval);
		}
	}

	// Initializes the Infinite Scrolling Textbook.  Creates DOM elements
	// for every page, sets scroll handlers to load visible pages.
	SCR_TXT.init = function() {
		console.log("Initializing MITx 6.002x scrollable textbook user script.");

		var origImage = document.getElementById('bookpage');
		if(origImage) {
			SCR_TXT.urlPrefix = origImage.attributes.src.value.split(/[0-9]{3,}/)[0];
			console.log("Discovered image URL prefix of " + SCR_TXT.urlPrefix);
		}

		// Find, reappropriate, and empty our container
		var container = $('section.page, section.page-container')
			.first()
			.attr('class', 'page-container')
			.css('position', 'relative')
			.css('background', '#ddd')
			.css('padding', '5px')
			.text('');

		// Create page sections and images
		SCR_TXT.pages = [];
		for(var i = SCR_TXT.firstPage; i <= SCR_TXT.lastPage; i++) {
			SCR_TXT.pages[i - SCR_TXT.firstPage] = SCR_TXT.makePage(i);
			container.append(SCR_TXT.pages[i]);
		}

		// Add page number overlay
		SCR_TXT.pageNumberOverlay = $(document.createElement('div'))
			.attr('id', 'page-number-overlay')
			.attr('class', 'header-wrapper')
			.css('position', 'fixed')
			.css('top', '0')
			.css('right', '0')
			.css('width', '2em')
			.css('height', '22px')
			.css('line-height', '18px')
			.css('font-size', '25px')
			.css('border-bottom-left-radius', '12px')
			.css('padding', '9px 25px')
			.css('text-align', 'center')
			.css('background', '#821')
			.css('color', '#fcfcfc')
			.css('text-shadow', '1px 1px 1px #200')
			.text('0');
		document.body.appendChild(SCR_TXT.pageNumberOverlay[0]);

		// Set up scroll event handler
		$(document).scroll(SCR_TXT.updateScroll);
		SCR_TXT.updateScroll();
	}

	SCR_TXT.init();

	// Hook into the existing page selection functions so the side panel
	// bookmarks work.
	var old_goto_page = unsafeWindow.goto_page;
	unsafeWindow.goto_page = function(pageno) {
		if(old_goto_page) {
			old_goto_page(pageno);
		}

		unsafeWindow.location.hash = '#page_' + pageno;
		SCR_TXT.scrollToPage(pageno);
	}
});

unsafeWindow.SCR_TXT = SCR_TXT;
