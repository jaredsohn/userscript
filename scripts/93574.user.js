/*
Geocaching Favorites Percentage
http://www.lildevil.org/greasemonkey/favorites-percentage

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Favorites Percentage
// @description   Shows the percentage of users that found a cache and also favorited it.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       3.0
// @copyright     2010-2013, Lil Devil
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon          http://www.lildevil.org/greasemonkey/images/FP-icon.png
// @downloadURL   https://userscripts.org/scripts/source/93574.user.js
// @updateURL     http://userscripts.org.nyud.net/scripts/source/93574.meta.js
// @grant         GM_xmlhttpRequest
// @include       http://www.lildevil.org/greasemonkey/versions*
// @include       http://*.geocaching.com/seek/cache_details.aspx*
// @include       http://*.geocaching.com/seek/nearest.aspx*
// ==/UserScript==

/* the following is for http://www.jshint.com/  */
/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, funcscope:true, immed:true, noarg:true, noempty:false, smarttabs:true, strict:false, sub:true, undef:false, unused:false */

(function(){

var SCRIPT_NAME			= 'GC Favorites Percentage',
	SCRIPT_VERSION		= '3.0',
	SCRIPT_ABBREV		= SCRIPT_NAME.replace(/[^A-Z]/g, ''),
	RUNNING_AS_EXTENSION= false,
	CURRENT_LANGUAGE	= Determine_Website_Language();

Check_for_Update();

var favGrayedOut = true;
Process_Cache_Page();
var clickAll = true;
Process_Cache_List();

function Process_Cache_Page() {
	// find the Favorites count. if it doesn't exist, then this cache type can't be favorited.
	var favPointsValue = document.querySelector('span.favorite-value');
	if (!favPointsValue) { return; }

	// get the Find Counts box. If it doesn't exist, then this cache has no logs.
	var findCountsBox = $('ctl00_ContentBody_lblFindCounts');
	if (!findCountsBox) { return; }

	var findCountImages = findCountsBox.querySelectorAll('img[src$="/2.png"],img[src$="/10.png"],img[src$="/11.png"]');
	if (!findCountImages) { return; }
	console.debug('d', findCountImages);

	var findCount = 0;
	for (var i=0; i<findCountImages.length; i++) {
		var thisImage = findCountImages[i];

		if (thisImage.parentNode.nodeName === 'A') {
			// VIP List has changed things
			findCount += parseInt(thisImage.parentNode.nextSibling.textContent, 10);
		} else {
			findCount += parseInt(thisImage.nextSibling.textContent, 10);
		}
	}

	// if there are no finds, then the cache can't be favorited.
	if (findCount === 0) { return; }

	// save the find count so we can use it later
	favPointsValue.setAttribute('findCount', findCount);

	// create a new span to hold the percentage
	var favPercentElement = document.createElement('span');
	favPercentElement.id = 'favorite-percent';
	favPercentElement.appendChild(document.createTextNode(' '));

	// create a pie chart
	var favPie = document.createElement('img');
	favPie.id = 'favPie';
	favPie.src = 'http://www.lildevil.org/greasemonkey/images/pie/0.png';

	// add them to the page
	favLabel = $('imgFavoriteArrow').previousSibling;
	favLabel.parentNode.insertBefore(favPie, favLabel);
	favLabel.parentNode.insertBefore(favPercentElement, favLabel);
	favLabel.parentNode.insertBefore(document.createElement('br'), favLabel);

	// fix some styles to make room for the percentage
	LD_addStyle('a>div.favorite-container      { height:54px; }' +		// was height:35px
				'a>div.favorite-container-open { height:55px; }' +		// was height:36px
				'#favorite-percent             { font-weight:bold; font-size:130%; ' +
												'color:#003399; padding-left:5px; ' +
												'opacity:0.5; }' +
				'#favPie                       { height:20px; width:20px; opacity:0.5;' +
												'margin:-2px; position:relative; top:3px; }' +
				'div>div.favorite-dropdown     { width:auto; white-space:nowrap; top:63px; }' +
				'.favorite-dropdown dl dd      { line-height:18px; }');

	// set an event trigger to fire when the Favorites count changes,
	// such as when the user adds or removes the cache from his Favorites list.
	favPointsValue.addEventListener('DOMSubtreeModified', ComputePercentage, false);

	// set an event to trigger when the premium percent in the dropdown is updated
	var favScore = $('uxFavoriteScore');
	favScore.addEventListener('DOMSubtreeModified', GetPremiumPercentage, false);

	// show the initial percentage.
	ComputePercentage();
}

function ComputePercentage() {
	// when the add or remove link is clicked, the value is cleared before the new value is drawn
	// and the event is fired twice, so ignore the "clear" event.
	var favPointsValue = document.querySelector('.favorite-value');
	if (favPointsValue.textContent.length === 0) { return; }

	var favPoints = parseInt(favPointsValue.textContent, 10),
		findCount = favPointsValue.getAttribute('findCount'),
		favPercent = 0;
		favTitle = favPoints + ' Favorites / ' + findCount + ' Logs';
	if (isNumber(favPoints) && (favPoints > 0) && (findCount > 0) ) {
		favPercent = Math.min(Math.round((favPoints / findCount) * 100), 100);
	}
	DisplayPercentage(favPercent, favTitle);
}

function GetPremiumPercentage() {
	// kill the "regular" event now that "premium" data is available
	var favPointsValue = document.querySelector('.favorite-value');
	favPointsValue.removeEventListener('DOMSubtreeModified', ComputePercentage, false);

	var favScore = $('uxFavoriteScore'),
		favPoints = parseInt(favPointsValue.textContent, 10),
		favPercent = parseInt(favScore.firstChild.textContent, 10),
		premLogs = Math.round(1 / (Math.max(favPercent, 0.4) / 100) * favPoints),
		favTitle = favPoints + ' Favorites / ~' + premLogs + ' Premium Logs';
	DisplayPercentage(favPercent, favTitle);

	// now that we have a premium number, make number fully opaque
	if (favGrayedOut) {
		LD_addStyle('span#favorite-percent, img#favPie { opacity:1; }');
		favGrayedOut = false;
	}
}

function DisplayPercentage(percent, title) {
	$('favPie').src = 'http://www.lildevil.org/greasemonkey/images/pie/' + percent + '.png';
	var favPercentElement = $('favorite-percent');
	favPercentElement.replaceChild(document.createTextNode(percent + '%'), favPercentElement.firstChild);
	favPercentElement.title = title;
}

function Process_Cache_List() {
	var sortFavs = $('ctl00_ContentBody_dlResults_ctl00_uxSort_Favorites');
	if (!sortFavs) { return; }

	// this function will be called when the percentage is returned from the server
	var popupObserverCallback = function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length && mutation.addedNodes[0].className === 'FavoriteScorePopUp') {
				var pieImg = mutation.addedNodes[0].querySelector('img'),
					piePercent = pieImg.src.match(/\d+/)[0],
					uiTooltipID = mutation.target.parentNode.id,
					favNumber = document.querySelector('a.favoriteTotal[aria-describedby="' + uiTooltipID + '"]');
				AddPercentImage(piePercent, favNumber.parentNode);
				favNumber.click();
			}
		});
	};
	var popupObserver = new MutationObserver(popupObserverCallback);

	// this function will be called when the user clicks on one of the favorites numbers
	// at the same time, a page function will request the percentage from the server
	var favObserverCallback = function(mutations) {
		mutations.forEach(function(mutation) {
			var uiTooltipID = mutation.target.getAttribute('aria-describedby'),
				uiTooltip = $(uiTooltipID);
			popupObserver.observe(uiTooltip, { childList:true, subtree:true });
		});
		if (clickAll) {
			clickAll = false;
			var clickIt = function(obj) {
				obj.click();
			};
			for (var i=0; i<favTotals.length; i++) {
				if (favTotals[i].textContent > 0) {
					window.setTimeout(clickIt, 10*i, favTotals[i]);
				} else {
					AddPercentImage(0, favTotals[i].parentNode);
				}
			}
		}
	};
	var favObserver = new MutationObserver(favObserverCallback);

	var favTotals = document.querySelectorAll('a.favoriteTotal');
	for (var i=0; i<favTotals.length; i++) {
		if (favTotals[i].textContent > 0) {
			favObserver.observe(favTotals[i], { attributes:true, attributeFilter:['aria-describedby'] });
		}
	}

	LD_addStyle('table.SearchResultsTable td > a.favoriteTotal { display:inline !important; vertical-align:middle; }' +
				'a > span.favorite-rank { margin-right:0; }');
}

function AddPercentImage(percent, container) {
	var newPie = document.createElement('img');
	newPie.src = 'http://www.lildevil.org/greasemonkey/images/pie/' + percent + '.png';
	newPie.title = percent + '%';
	newPie.style.verticalAlign = 'middle';
	newPie.width = '31';
	newPie.height = '31';
	container.appendChild(newPie);
	var newLabel = document.createElement('strong');
	newLabel.appendChild(document.createTextNode(percent + '%'));
	newLabel.style.verticalAlign = 'middle';
	if (percent > 0) {
		newLabel.style.color = '#4066A1';
	} else {
		newLabel.style.color = '#B1D0FD';
	}
	container.appendChild(newLabel);
	container.style.whiteSpace = 'nowrap';
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function LD_addStyle(css, theID) {
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.appendChild(document.createTextNode(css));
	if (theID) {
		LD_removeNode(theID);	// no duplicate IDs
		styleSheet.id = theID;
	}
	document.getElementsByTagName('head')[0].appendChild(styleSheet);
}

function LD_removeNode(node) {
	if (typeof node === 'string') {
		node = document.getElementById(node);
	}
	if (node) {
		node.parentNode.removeChild(node);
	}
}

function $() {
	return document.getElementById(arguments[0]);
}

function Determine_Website_Language() {
	var selectedLanguage = document.querySelector('.selected-language');
	if (!selectedLanguage) { return 'en'; }

	switch (selectedLanguage.textContent.trim().slice(0, -1)) {
		case 'English'			: return 'en';	// English
		case 'Deutsch'			: return 'de';	// German
		case 'Français'			: return 'fr';	// French
		case 'Português'		: return 'pt';	// Portuguese
		case 'Ceština'			: return 'cs';	// Czech
		case 'Svenska'			: return 'sv';	// Swedish
		case 'Español'			: return 'es';	// Spanish
		case 'Italiano'			: return 'it';	// Italian
		case 'Nederlands'		: return 'nl';	// Dutch
		case 'Català'			: return 'ca';	// Catalan
		case 'Polski'			: return 'pl';	// Polish
		case 'Eesti'			: return 'et';	// Estonian
		case 'Norsk, Bokmål'	: return 'nb';	// Norwegian
		case '한국어'			: return 'ko';	// Korean
		case 'Magyar'			: return 'hu';	// Hungarian
		case 'Română'			: return 'ro';	// Romanian
		default					: return 'en';	// unknown
	}
}

function isNullOrUndefined(value) {
	return (value === null || typeof value === 'undefined');
	// this check is convenient because GM_getValue returns undefined if val doesn't exist, whereas localStorage.getItem returns null
}

function LD_addScript(source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');

	if ((typeof source === 'string') && (source.substring(0,4) === 'http')) {
		script.src = source;
	} else {
		script.appendChild(document.createTextNode(source.toString()));
	}
	document.getElementsByTagName('head')[0].appendChild(script);
}

function LD_getValue(key, defaultVal, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return defaultVal;
		}
	}
	var val = localStorage.getItem(SCRIPT_ABBREV + '_' + key);
	return isNullOrUndefined(val) ? defaultVal : val;
}

function LD_setValue(key, val, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return;
		}
	}
	localStorage.setItem(SCRIPT_ABBREV + '_' + key, val);
}

function URL_Decode(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function URL_Encode(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function Check_for_Update() {
	// show current version number on http://www.lildevil.org/greasemonkey/versions
	var versObj = document.getElementById(SCRIPT_ABBREV + '_installed');
	if (versObj) {
		versObj.innerHTML = SCRIPT_VERSION;
		versObj.parentNode.style.display = '';
		return;
	}

	var referer = document.location.toString().replace(/\?.*$/, ''), // strip query string
		checkURL = 'http://www.lildevil.org/greasemonkey/version-check.php?script=' +
					URL_Encode(SCRIPT_NAME) + '&version=' + SCRIPT_VERSION +
					'&lang=' + CURRENT_LANGUAGE +
					'&referer=' + encodeURIComponent(referer);

	var Check_Update_Response = function(JSONstring) {
		if (RUNNING_AS_EXTENSION) { return; }
			// The extension mechanism does the update checking for us, so don't report
			// anything here. This abort is after the query is sent so I can track
			// feature usage and browser popularity.

		if (!JSONstring) {
			console.log(SCRIPT_NAME, 'Updater: No response');
			return;
		}
		var scriptData = {};
		try {
			scriptData = JSON.parse(JSONstring);
		} catch (err) {
			// compatibility with older browsers (FF3.0, IE7)
			// this is very specialized to work with this known well-formatted JSON string
			// comprised of one non-nested object containing strings only
			var m, re = new RegExp('[{,]"(\\w+)":"(.*?)"', 'g');
			while ((m = re.exec(JSONstring))) {
				scriptData[m[1]] = m[2];
			}
		}
		if (scriptData.days) {
			LD_setValue('Update_Days', scriptData.days);
		} else {
			console.log(SCRIPT_NAME, 'Updater: Unable to parse response');
		}
		if (scriptData.message && scriptData.link) {
			if (window.confirm(URL_Decode(scriptData.message))) {
				scriptData.link = URL_Decode(scriptData.link);
				if (typeof PRO_openInTab !== 'undefined') {
					PRO_openInTab(scriptData.link, 1);
				} else {
					var newWin = window.open(scriptData.link, '_blank');
					if (!newWin || !newWin.top) {
						// popup blocked - open in same window instead
						window.location.href = scriptData.link;
					}
				}
			}
		}
	};
	var Request_PostMessage = function() {
		// If we got an error trying to send xmlhttpRequest,
		// it is probably because this browser doesn't support cross-domain requests
		// so we'll do it another way
		window.addEventListener('message', Check_PostMessage_Response, false);
		LD_addScript(checkURL + '&wrapper=pm');
	};
	var Check_PostMessage_Response = function(message) {
		window.removeEventListener('message', Check_PostMessage_Response, false);
		Check_Update_Response(message.data);
	};

	// avoid a flood of dialogs such as when opening a browser with multiple tabs open
	var now = new Date().getTime();
	var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
	var lastStart = LD_getValue('Update_Start', 0);
	LD_setValue('Update_Start', now.toString());
	if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

	// time to check yet?
	var oneDay = 24 * 60 * 60 * 1000;
	var lastChecked = LD_getValue('Update_Last', 0);
	var checkDays = parseFloat(LD_getValue('Update_Days', 1));
	if (lastChecked && (now - lastChecked) < (oneDay * (checkDays || 1)) ) { return; }

	try {
		GM_xmlhttpRequest({
			method : 'GET',
			url : checkURL,
			headers : {
				'Referer' : referer,
				'User-Agent' : navigator.userAgent
			},
			onload: function(result) {
				Check_Update_Response(result.responseText);
			},
			onerror: Request_PostMessage
		});
	} catch (err) {
		Request_PostMessage();
	}
	LD_setValue('Update_Last', now.toString());
}
})();
