// ==UserScript==
// @name        Remove "Selected Readers" on Comic Rocket
// @namespace   http://userscripts.org/users/JonathanGawrych
// @description Comic Rocket adds various user's profile pictures every comic serial as "Selected Readers". This script removes them, and tidies up with the empty space.
// @include     *://www.comic-rocket.com/
// @version     1
// @grant       none
// ==/UserScript==


var prefix = '.comics-item-';
var selectors = ['progressrow', 'rating', 'readers', 'progress', 'date', 'date div', 'date span'];
var rulesMap = {
	length: 0,
	push: function (key, value) {
		rulesMap[key] = value;
		rulesMap.length++;
	}
};

var fallback = true;

// create map of css rules
if (document.styleSheets) {
	var fullSelectors = selectors.map(function addPrefix(sel) {
		return prefix + sel;
	});

	dance:
	// loop though styleSheets (I believe there is only 1 on comic-rocket)
	for (var i = document.styleSheets.length - 1; i >= 0; i--) {
		var styleSheet = document.styleSheets[i];
		var rules = styleSheet.cssRules || styleSheet.rules || [];

		// loop though the styleSheet's rules
		for (var j = rules.length - 1; j >= 0; j--) {

			// determine if we need this rule, and if so, add it to the map.
			var selIndex = fullSelectors.indexOf(rules[j].selectorText);
			if (~selIndex) {
				rulesMap.push(selectors[selIndex], rules[j].style);

				// if we are done, don't fallback, and breakdance!
				if (rulesMap.length === selectors.length) {
					fallback = false;
					break dance;
				}
			}
		}
	}
}

// force fallback to test
// fallback = true;

// fast way, modify css style sheet directly, changing all items simultaneously 
if (!fallback) {
    console.log("Remove Selected Readers Stylesheets Used");

	rulesMap.progressrow.height = '30px';
	
	rulesMap.rating.cssFloat = 'left';
	rulesMap.rating.display = 'block';
	rulesMap.rating.height = '30px';
	rulesMap.rating.lineHeight = '30px';
	
	rulesMap.readers.display = 'none';
	
	rulesMap.progress.top = 'auto';
	rulesMap.progress.right = 'auto';
	rulesMap.progress.position = 'static';
	rulesMap.progress.cssFloat = 'left';
	rulesMap.progress.margin = '5.5px';
	rulesMap.progress.width = '465px';
	
	rulesMap.date.top = 'auto';
	rulesMap.date.right = 'auto';
	rulesMap.date.position = 'static';
	rulesMap.date.cssFloat = 'left';
	
	// these properties can't be accessed by a dot due to the space, so we use ['property name']
	rulesMap['date div'].height = '30px';
	rulesMap['date span'].display = 'none';

// Legacy slow way, loop though each item and set the style manually.
} else {
    console.log("Remove Selected Readers Fallback Used");

	var progressrows = document.querySelectorAll(prefix + 'progressrow');
	for (var i = progressrows.length - 1; i >= 0; i--) {
		progressrows[i].style.height = '30px';
	}
	
	var ratings = document.querySelectorAll(prefix + 'rating');
	for (var i = ratings.length - 1; i >= 0; i--) {
		ratings[i].style.cssFloat = 'left';
		ratings[i].style.display = 'block';
		ratings[i].style.height = '30px';
		ratings[i].style.lineHeight = '30px';
	}
	
	var readers = document.querySelectorAll(prefix + 'readers');
	for (var i = readers.length - 1; i >= 0; i--) {
		readers[i].style.display = 'none';
	}

	var progresses = document.querySelectorAll(prefix + 'progress');
	for (var i = progresses.length - 1; i >= 0; i--) {
		progresses[i].style.top = 'auto';
		progresses[i].style.right = 'auto';
		progresses[i].style.position = 'static';
		progresses[i].style.cssFloat = 'left';
		progresses[i].style.margin = '5.5px';
		progresses[i].style.width = '465px';
	}

	var dates = document.querySelectorAll(prefix + 'date');
	for (var i = dates.length - 1; i >= 0; i--) {
		dates[i].style.top = 'auto';
		dates[i].style.right = 'auto';
		dates[i].style.position = 'static';
		dates[i].style.cssFloat = 'left';
	}

	var datedivs = document.querySelectorAll(prefix + 'date div');
	for (var i = datedivs.length - 1; i >= 0; i--) {
		datedivs[i].style.height = '30px';
	}

	var datespans = document.querySelectorAll(prefix + 'date span');
	for (var i = datespans.length - 1; i >= 0; i--) {
		datespans[i].style.display = 'none';
	}
}