// ==UserScript==
// @name          TNABoard Ads Filter
// @namespace     http://tnaboard.com/
// @description   Allows filtering of ad headers on TNAboard.com. 2014/03/10
// @version       1.0
// @include       http://*tnaboard.com/forumdisplay.php?98-WA-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?116-OR-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?165-NV-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?158-AZ-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?151-CO-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?144-CA-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?137-ID-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?130-IL-Provider-Ads*
// @include       http://*tnaboard.com/forumdisplay.php?123-B-C-Provider-Ads*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// ==/UserScript==

// 
// TNABoard Ads Filter
//
// Allows for the manual filtering of thread headers on the TNABoard Provider Ads pages.
//
// Thread titles are converted to ALL lowercase and non-ASCII characters are replaced with spaces.
//
// The "Started by" provider name is made bolder, bigger and blacker to stand out better.
//
// Five square colored buttons are added to allow filtering of the provider's threads:
//
//		GREEN, BLUE & YELLOW buttons: highlight the provider's threads with the respective color.
//			The meaning and usage of such highlighting is up to the user.
//
//		The WHITE button resets the provider's threads to display without any color filter.
//
//		The RED button blanks out the thread display except for the "Replies/Views" and "Last Post By" elements.
//			The provider name will display in red alongside the button.
//

// --------------------------------------------------------------------------------
// MISC GLOBAL VARIABLES

  var PREFIX = "*tnaImg*.";	// PREFIX lets us store key values under a quasi-unique name
  var USERLIST = 'UserSettings';

// --------------------------------------------------------------------------------


  //main();
  try {main();} catch (e) {}


// --------------------------------------------------------------------------------

  function urlencode(clearString) {
  	// escape non-alpanumeric characters
  	// so they don't interfere with string parsing and storage
  	var output = '';
  	var x = 0;
  	clearString = clearString.toString();
  	var regex = /(^[a-zA-Z0-9_.]*)/;
  	while (x < clearString.length) {
  		var match = regex.exec(clearString.substr(x));

  		if (match != null && match.length > 1 && match[1] != '') {
  			output += match[1];
  			x += match[1].length;
  		} else {

  			if (clearString[x] == ' ') {
  				output += '+';
  			} else {
  				var charCode = clearString.charCodeAt(x);
  				var hexVal = charCode.toString(16);
  				output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
  			}

  			x++;
  		}
  	} //end while

  	// Remove space character
  	output = output.replace(/\+/g, "%20");
  	return output;
  }

  function setValue(key, val) {
	GM_setValue(PREFIX + key, val);
	return val;
  }

  function getValue(key) {
	var res = GM_getValue(PREFIX + key);
	return res == null ? '' : res;
  }

  function getUser(userName) {
  	// escape the userName
  	userName = urlencode(userName);
  	// get current user list string
  	var curList = getValue(USERLIST);
  	// split into individual user settings
  	var arrList = curList.split(';');
	// find the user
  	for (var i = 0; i < arrList.length; i++) {
  		// split user from setting
  		var parts = arrList[i].split('=');
  		if (parts[0] == userName) {
			// user found, return value
  			return parts[1];
  		}
  	}
  	return null;
  }

  function setUser(userName, value) {
  	if (userName == null || userName == '') {
  		return;
  	}
  	//GM_log('INFO: setUser: ' + userName + ' = ' + value);
  	// escape the userName
  	userName = urlencode(userName);
  	// get current user list string
  	var curList = getValue(USERLIST);
  	// split into individual user settings
  	var arrList = curList.split(';');
  	// find the user
  	for (var i = 0; i < arrList.length; i++) {
  		// split user from setting
  		var parts = arrList[i].split('=');
  		if (parts[0] == userName) {
  			// user found, set value
  			if (value == null) {
  				// value is null, meaning to remove user
  				arrList.splice(i, 1);
  			} else {
  				if (parts[1] == value) {
					// the value is not changing, so just exit
  					return;
  				}
  				// set new value
  				parts[1] = value;
				// merge user and setting
  				arrList[i] = parts.join('=');
  			}
			// merge the user list string
  			curList = arrList.join(';');
			// set updated user list
  			setValue(USERLIST, curList);
  			return;
  		}
  	}
	// user was not found
  	if (value != null) {
  		// if there's a value to set just add user and setting to the end
	  	curList = curList + ';' + userName + '=' + value;
  		// and set updated user list
	  	setValue(USERLIST, curList);
	  }
  }

  function setHighlightColor(threadDiv, color) {
  	//GM_log('INFO: setHighLightColor: ' + color + ' was: ' + threadDiv.style.background);

  	if (color != null) {
  		// highlight the thread div
  		threadDiv.style.background = color;
  	} else {
  		// unhighlight the thread div
  		threadDiv.style.background = '';
  	}
  }

  function setIgnore(threadDiv, onoff) {
  	//GM_log('INFO: setIgnore: ' + onoff + ' was: ' + threadDiv.style.visibility);

  	if (onoff) {
  		// ignore the thread div
  		threadDiv.style.visibility = 'hidden';
  		threadDiv.parentNode.lastChild.lastChild.style.visibility = 'inherit';
  	} else {
  		// unignore the thread div
  		threadDiv.style.visibility = 'inherit';
  		threadDiv.parentNode.lastChild.lastChild.style.visibility = 'hidden';
  	}
  }

  function setUserEffect(threadDiv, userName, effect) {
  	//GM_log('INFO: setUserEffect: ' + userName + ' - ' + effect);
	// save the new effect value for the user
  	var color;
  	var ignore;
  	if (effect == null) {
		// remove all effects
  	} else if (effect == 'ignore') {
  		// set ignore effect, remove color highlight
  		ignore = true;
  	} else {
  		// all other effects names are colors, not used directly
  		// we make them a bit brighter than their names would suggest
  		// so we can better read the black text
		// but limiting here to "web-safe" colors
  		var color;
  		switch (effect) {
  			case 'green':
  				color = '#66FF66';
  				break;
  			case 'blue':
  				color = '#6666FF';
  				break;
  			case 'yellow':
  				color = '#FFFF66';
  				break;
  			default:
  				color = '#000000';	// use black to indicate we got a bad effect string!!
  				break;
  		}
  	}
  	// set desired color highlight
  	setHighlightColor(threadDiv, color);
  	// set desired ignore effect
  	setIgnore(threadDiv, ignore);
  }

  function setUserEffectAndSetting(threadDiv, userName, effect) {
  	setUser(userName, effect);
  	setUserEffect(threadDiv, userName, effect);
  }

  function setThreadControl(link, userName) {
  	var el = link;
  	var threadDiv;
  	do {
  		// go up the document tree from the "Started by <username>"
		// looking for the thread DIV of interest
  		el = el.parentNode;
  		if (el.tagName == 'DIV') {
  			if (el.className.search('threadinfo') != -1) {
  				threadDiv = el;
  			}
  		}
		// stop when we reach the LI node that is topmost for threads on the page
  	} while (el != null && el.tagName != 'LI');

  	if (el == null || threadDiv == null) {
  		GM_log('ERROR: Could not find thread DIV');
  		return;
  	}

  	// the LI element is the topmost element in the document tree for the thread
  	// the DIV just below is the only child of the LI, containing all thread elements
  	// threadDiv is the first child of that DIV, containing all but the "Replies / Views" and "Last Post By" elements

	// we construct mainDiv to hold our control buttons
  	var mainDiv = document.createElement("ul");

  	// add our controls to the parent after the "Replies / Views" and "Last Post By" elements
  	threadDiv.parentNode.appendChild(mainDiv);

	// add the GREEN "button"
  	var ctlDiv = document.createElement("li");
  	ctlDiv.style = 'display:inline-block;background-color:#00FF00;width:10px;height:10px;border:1px solid #000;margin-right:3px;margin-left:20px';
  	ctlDiv.addEventListener("click", function () { setUserEffectAndSetting(threadDiv, userName, 'green') }, false);
  	mainDiv.appendChild(ctlDiv);

  	// add the BLUE "button"
  	ctlDiv = document.createElement("li");
  	ctlDiv.style = 'display:inline-block;background-color:#0000FF;width:10px;height:10px;border:1px solid #000;margin-right:3px';
  	ctlDiv.addEventListener("click", function () { setUserEffectAndSetting(threadDiv, userName, 'blue') }, false);
  	mainDiv.appendChild(ctlDiv);

  	// add the YELLOW "button"
  	ctlDiv = document.createElement("li");
  	ctlDiv.style = 'display:inline-block;background-color:#FFFF00;width:10px;height:10px;border:1px solid #000;margin-right:3px';
  	ctlDiv.addEventListener("click", function () { setUserEffectAndSetting(threadDiv, userName, 'yellow') }, false);
  	mainDiv.appendChild(ctlDiv);

  	// add the WHITE (reset effects) "button"
  	ctlDiv = document.createElement("li");
  	ctlDiv.style = 'display:inline-block;background-color:#FFFFFF;width:10px;height:10px;border:1px solid #000;margin-right:3px';
  	ctlDiv.addEventListener("click", function () { setUserEffectAndSetting(threadDiv, userName, null) }, false);
  	mainDiv.appendChild(ctlDiv);

  	// add the RED (ignore) "button"
  	ctlDiv = document.createElement("li");
  	ctlDiv.style = 'display:inline-block;background-color:#FF0000;width:10px;height:10px;border:1px solid #000;margin-right:3px';
  	ctlDiv.addEventListener("click", function () { setUserEffectAndSetting(threadDiv, userName, 'ignore') }, false);
  	mainDiv.appendChild(ctlDiv);

  	// add the username to show when ignoring the post
  	ctlDiv = document.createElement("li");
  	ctlDiv.innerHTML = userName;
  	ctlDiv.style = 'display:inline-block;visibility:hidden;color:#CC0000';
  	mainDiv.appendChild(ctlDiv);

  	var effect = getUser(userName);
	if (effect != null)
  		setUserEffect(threadDiv, userName, effect);
  }


// --------------------------------------------------------------------------------
// MAIN

  function main () {

	GM_log('INFO: Starting Ads checker script...');

	// we'll locate the thread headers through their "Started by <username>" links
	var links = document.links;

	// regular expression to find/replace non-ASCII characters
	var regex = /[^\x20-\x7F]/g;

	for (var i = 0; i < links.length; i++) {
		if (links[i].outerHTML.search('class="title') != -1) {
			// this is a TITLE link
			// for the title text: convert to ALL lowercase and replace non-ASCII characters with spaces
			links[i].innerHTML = links[i].innerHTML.toLowerCase().replace(regex, ' ');
		}
		if (links[i].outerHTML.search('class="username') != -1 && links[i].parentNode.innerHTML.search('Started by') != -1) {
			// this is a "Started by" USERNAME link
			var userName = links[i].innerHTML;
			// make the username stand out
			links[i].innerHTML = '<big><strong>' + links[i].innerHTML + '</strong></big>';
			links[i].style.color = '#000000';
			// setup the controls for the effects for this user's thread
			setThreadControl(links[i], userName);
		}
	}
  }
// --------------------------------------------------------------------------------

