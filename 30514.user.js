// ==UserScript==
// @name          Conquer Club - auto refresh
// @namespace     irc://irc.gamesurge.net/lp-risk@bit
// @description   Auto refreshes the game every 2 seconds, pops up a message when a new round starts if the window isn't focused
// @include       http://*conquerclub.com/*game.php?*game=*
// ==/UserScript==

var timers = {'refresh':null, 'roundStatus':null};
var global = {'alerted':false, 'roundStatus':null};
var action = document.getElementById('action');

/*
 * Adds a variable that returns the Y position of the Action section
 */
var actionPosition;
function updateActionPosition() {
	var obj = action;
	var curtop = 0;
	do {
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);

	actionPosition = curtop
}

/*
 * Adds a variable that returns whether or not the window is focused
 */
var focused = false;
unsafeWindow.onfocus = function() {
	focused = true;
}
unsafeWindow.onblur = function() {
	focused = false;
}

/*
 * Checks the Action section with a RE and returns the result
 */
function checkAction(r) {
	return r.test(action.innerHTML)
}

/*
 * Checks the rounds' status, shows a message if there's a new
 * round, and refreshes
 */
function refresh() {
	clearTimeout(timers.refresh);
	timers.refresh = setTimeout("sendRequest()", 2000); // refresh after 4 seconds
}
var refreshGMScript = unsafeWindow.refreshGMScript;
unsafeWindow.refreshGMScript = function() {
	refreshGMScript();
	global.roundStatus() // will be called every refresh
}
global.roundStatus = function() {
	if (checkAction(/Leave rating for/)) // game ended
		return false;

	if (checkAction(/may take your turn/)) { // new round!
		if (focused) {
			/*
			 * if the user is viewing the page, and the Action section
			 * is not visible on the screen, show the newround <div> alert
			 */
			if (actionPosition <= unsafeWindow.pageYOffset)
				newroundDiv.show(1);
		}
		else if (!global.alerted) {
			alert('new round started');
			global.alerted = true;

			var button = action.getElementsByTagName("input")[0];
			button.addEventListener('click', function(event) {
				global.alerted = false;
			}, true);
		}
	}
	if (checkAction(/<input/)) { // playing
		clearTimeout(timers.roundStatus);
		timers.roundStatus = setTimeout(global.roundStatus, 2000); // check if the user is done every two seconds
	}
	else
		refresh() // loop back to refresh()
}


var newroundDiv = {
	/*
	 * Creates a <div> that alerts the user when a new round starts,
	 * and inserts it in #pageWrapper
 	 */
	create: function() {
		var newround = document.createElement('div');
		newround.id = "newround";
		newround.style.display = "none";
		newround.style.position = "fixed";
		newround.style.zIndex = "1000";
		newround.style.top = (window.innerHeight - 20) + "px";
		newround.style.left = (window.innerWidth - 156) + "px";
		newround.style.height = "16px";
		newround.style.width = "150px";
		newround.style.padding = "3px";
		newround.style.backgroundColor = "#ccddcc";
		newround.style.cursor = "pointer";
		newround.style.color = "#fff";
		newround.style.fontWeight = "bold";
		newround.innerHTML = "&uarr; new round started";
		newround.addEventListener('click', function(event) {
			unsafeWindow.scroll(0, 75);
		}, true);
		document.getElementById('pageWrapper').appendChild(newround);
	},
	updatePosition: function() {
		var newround = document.getElementById('newround');
		newround.style.top = (window.innerHeight - 20) + "px";
		newround.style.left = (window.innerWidth - 156) + "px";
	},
	show: function(show) {
		var newround = document.getElementById('newround');
		if (show)
			newround.style.display = "";
		else
			newround.style.display = "none";
	}
}

function onscroll() {
	// if the Action section is visible on the screen, hide the alert

	if (actionPosition > unsafeWindow.pageYOffset)
		newroundDiv.show(0);
}
unsafeWindow.onscroll = onscroll;

function onresize() {
	newroundDiv.updatePosition();
	updateActionPosition()
}
unsafeWindow.onresize = onresize;

(function() {
	if (!action) // user not in the game
		return false;

	var loading = document.getElementById('loading');
	loading = loading.getElementsByTagName("img")[0];
	loading.style.height = "8px";
	loading.style.width = "8px";

	updateActionPosition();
	newroundDiv.create();
	refresh();
})()