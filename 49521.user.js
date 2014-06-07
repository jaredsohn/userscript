// ==UserScript==
// @name           MySpace Home - Advanced Customize It
// @namespace      Seifer - http://userscripts.org/users/33118
// @description    Add/Remove columns/rows and move things around on your homepage like never before :)
// @include        http://home.myspace.com/*fuseaction=user*
// @include        http://home.myspace.com/*fuseaction=home
// @exclude        *fuseaction=user.*
// ==/UserScript==

if ($('col1_2')) { init(); // Check that we're using the new skin and initiate.
	/* ==================================================================================
	Change the variables below to setup your home page exactly how you want!
	-------------------------------------------------------------------------------------
	Use the letters to position the different "pieces" of the homepage in each column.
	The first letter is the top, the last letter is the bottom.
	
	A	MySpace Annoucement Module
	B	User Profile Module
	C	Alerts Module
	D	My Apps Navigation
	E	Google Ad Sense Module
	F	Birthdays Module
	G	Status and Mood Update Module
	H	Activity Stream Module
	J	Friend Space Module
	K	Med Rec Module (ad)
	L	People You May Know Module
	M	Artist Dashboard Module (Band pages only)
	O	Marketing Box Module (ad)
	P	Upcoming Shows Module (Band pages only)
	Q	Recommended Events Module
	R	Featured Games Module

	Z	GreaseMonkey Script Link-Backs 

	Available layout controls are...
		SetWidth('<SIZE px/%>);			 Set how wide the page is that you'll be laying out.
		Column('<LETTERS'>,<SIZE px/%>);	 Add a column to the right of the current one
		Seperate();				 End the row of columns so you can add different columns below
		Row('<LETTERS>');			 Add a row that spans the entire width
	
	**** To hide a piece completely just don't use its letter. ****/
	
	HideTopAd(true);				// True or false, hides or shows the ad in the header.

	SetWidth('1640px');

	Column('', '3px');
	Column('BCD', '195px');
	Column('', '2px');
	Column('AGH', '814px');
	Column('', '7px');
	Column('MPJL', '610px');
	Seperate();
	Row('Z');

	
	/*====================================================================================
	 STOP EDITTING HERE UNLESS YOU KNOW WHAT YOU'RE DOING!
	 =====================================================================================*/
}

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName = 'Myspace - Advanced Customize It';
scriptId='49521';
scriptVersion=2.2;
scriptUpdateText='Fixed to work with all MySpaces changes as of 29/05/2010';
// === Stop editing here. ===
var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (parseInt(navigator.appVersion) > 3) {
	if (navigator.appName == "Netscape") {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	if (navigator.appName.indexOf("Microsoft") != -1) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
}
if (currentTime > (lastCheck + 86400)) { //24 hours after last check
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/' + scriptId + '?format=txt',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain',
		},
		onload: function (responseDetails) {
			var text = responseDetails.responseText;
			var onSiteVersion = text.substring(text.indexOf("scriptVersion=") + 14, text.indexOf("\n", text.indexOf("scriptVersion=")) - 2);
			var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=") + 18, text.indexOf("\n", text.indexOf("scriptUpdateText=")) - 3);
			if (onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
				GM_addStyle('#gm_update_alert {' + '	position: fixed;' + '	z-index:100000;' + '	top: ' + ((winH / 2) - 60) + 'px;' + '	left: ' + ((winW / 2) - 275) + 'px;' + '	width: 550px;' + '	height: 120px;' + '	background-color: yellow;' + '	text-align: center;' + '	font-size: 11px;' + '	font-family: Tahoma;' + '}' + '#gm_update_alert_buttons {' + '	position: relative;' + '	top: -5px;' + '	margin: 7px;' + '}' + '#gm_update_alert_button_close {' + '	position: absolute;' + '	right: 0px;' + '	top: 0px;' + '	padding: 3px 5px 3px 5px;' + '	border-style: outset;' + '	border-width: thin;' + '	z-index: inherit;' + '	background-color: #FF0000;' + '	color: #FFFFFF;' + '	cursor:pointer' + '}' + '#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {' + '	text-decoration:underline;' + '	color: #003399;' + '	font-weight: bold;' + '	cursor:pointer' + '}' + '#gm_update_alert_buttons span a:hover  {' + '	text-decoration:underline;' + '	color: #990033;' + '	font-weight: bold;' + '	cursor:pointer' + '}');
				newversion = document.createElement("div");
				newversion.setAttribute('id', 'gm_update_alert');
				newversion.innerHTML = '' + '	<b>GreaseMonkey UserScript Update Notification</b><br>' + '	There is an update available for &quot;' + scriptName + '&quot; <br>' + '	You are currently running version ' + scriptVersion + '. The newest version is ' + onSiteVersion + '.<br>' + '	<br>' + '	<div id="gm_update_alert_button_close">' + '		Close</div>' + '	<b>What do you want to do?</b><br>' + '	<div id="gm_update_alert_buttons">' + '		<span id="gm_update_alert_button_showinfo"><a href="#">Show Update Info</a></span>&nbsp;&nbsp;' + '		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/' + scriptId + '">Go To Script Homepage</a></span>&nbsp;&nbsp;' + '		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/' + scriptId + '.user.js">Upgrade to version ' + onSiteVersion + '</a></span>&nbsp;&nbsp;' + '		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;' + '		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again' + '		until the next new version</a></span> </div>';
				document.body.insertBefore(newversion, document.body.firstChild);
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function (event) {
					alert(onSiteUpdateText);
				},
				true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function (event) {
					GM_setValue('lastCheck', currentTime);
					alert("You will not be reminded again until tomorrow.");
					document.body.removeChild(document.getElementById('gm_update_alert'));
				},
				true);
				document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function (event) {
					GM_getValue('lastVersion', onSiteVersion);
					alert("You will not be reminded again until the next new version is released.");
					document.body.removeChild(document.getElementById('gm_update_alert'));
				},
				true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function (event) {
					document.body.removeChild(document.getElementById('gm_update_alert'));
				},
				true);
			}
		}
	});
}

function init() {
	piece = [];
	columns = 0;
	rows = 0;
	lastAdded = 'row';

	////////////////////////////////
	// Create script link-back (Concept by InsaneNinja)
	//
	if (!$('GM_Script_Links')) { var gsl = document.createElement('p'); gsl.setAttribute('id','GM_Script_Links');
	if ($('col1_0')) $('col1_0').appendChild(gsl); GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}') }
	GM_addStyle('#GM_Script_Links { text-align: center }');
	$('GM_Script_Links').innerHTML += '<a target="_blank" href="http://userscripts.org/scripts/show/49521">GM - Advanced Customize it!</a>';
	//
	/* To check if this script has been run before your own, use the following line...
	 if ($('GM_Script_Links') && $('GM_Script_Links').innerHTML.match('scripts/show/49521"')) (
	*/
	////////////////////////////////
	/*	==========================
	Define all the pieces of the homepage so
	they can be manipulated later.
	------------------------*/
	piece['B'] = $('module-1'); // userBadgeModule
	piece['C'] = $('module-2'); // alertsModule
	piece['D'] = $('module-3'); // myappsModule
	piece['E'] = $('module-4'); // googleAdSenseModule
	piece['F'] = $('module-22'); // birthdaysModule
	piece['G'] = $('module-13'); // superPostModule
	piece['H'] = $('module-14'); // activityStreamModule
	piece['J'] = $('module-17'); // friendSpaceModule
	piece['K'] = $('module-18'); // medRecModule (ad)
	piece['L'] = $('module-23'); // pymkModule
	piece['O'] = $('module-26'); // marketingBoxModule
	piece['Q'] = $('module-20'); // recommendedEventsModule
	piece['R'] = $('module-24'); // featuredGamesModule
	piece['Z'] = $('GM_Script_Links');

	if ($('module-11') || $('module-15')) { // Check if this is an artist page
		piece['G'] = $('module-11'); // superPostModule
		piece['M'] = $('module-18'); // artistDashboard
		piece['H'] = $('module-13'); // activityStreamModule
		piece['K'] = $('module-17'); // medRecModule
		piece['P'] = $('module-15'); // bandUpcomingShowsModule
		piece['J'] = $('module-16'); // friendSpaceModule
	}

	// Hide the old columns and all contents but leave for other scripts.
	$('col1_0').setAttribute('style', 'display: none;');
	$('col1_1').setAttribute('style', 'display: none;');
	$('col1_2').setAttribute('style', 'display: none;');

	// Create hide link for MySpace/Tom's Annoucement.
	if ($('tomannouncement')) {
		GM_addStyle('#gm_hideannounce {text-align:right;margin-top:10px !important;,margin-bottom:-20px !important;;}');
		hideannounce = document.createElement('div');
		hideannounce.setAttribute('id', 'gm_hideannounce');
		hideannounce.innerHTML = '<a href="#" id="gm_hideannouncelink">Got it! Hide this announcement.</a>';
		$('tomannouncement').lastChild.previousSibling.appendChild(hideannounce);
		document.getElementById('gm_hideannouncelink').addEventListener('click', function (event) {
			GM_setValue('tomannouncement', $('tomannouncement').innerHTML);
			$('tomannouncement').setAttribute('style', 'display:none');
		},
		true);
		if (GM_getValue("tomannouncement", false) == $('tomannouncement').innerHTML) {
			$('tomannouncement').setAttribute('style', 'display:none');
		}
	}

} // end of init.

function SetWidth(width) {
	GM_addStyle('div.wrap { width: ' + width + '; } ');
	overallWidth = width;
}

function HideTopAd(answer){
	if (answer) {
		removeElement('leaderboard');
	}
}

function Column(pieces, width) {
	if (lastAdded.indexOf('ow') > 0) {
		seperate = document.createElement('span');
		seperate.setAttribute('style', 'clear:both');
		$('row1').insertBefore(seperate, $('col1_0'));
	}
	columns++;
	column = document.createElement('div');
	column.setAttribute('name', 'gm_col' + columns);
	column.setAttribute('id', 'gm_col' + columns);
	if (width != "") {
		column.setAttribute('style', 'float:left; width:' + width);
	} else {
		column.setAttribute('style', 'float:left;');
	}
	column.innerHTML = "&nbsp;";
	$('row1').insertBefore(column, $('col1_0'));
	lastAdded = 'gm_col' + columns;
	contents = pieces.split('');
	for (i = 0; sel = contents[i]; i++) {
		if (piece[sel]) {
			$(lastAdded).appendChild(piece[sel]);
		}
	}
}

function Row(pieces, width) {
	if (lastAdded.indexOf('olumn') > 0) {
		seperate = document.createElement('span');
		seperate.setAttribute('style', 'clear:both');
		$('row1').insertBefore(seperate, $('col1_0'));
	}
	rows++;
	row = document.createElement('div');
	row.setAttribute('name', 'gm_row' + rows);
	row.setAttribute('id', 'gm_row' + rows);
	if (width != "") {
		row.setAttribute('style', 'float:left; width:' + width);
	} else {
		row.setAttribute('style', 'float:left;');
	}
	row.innerHTML = "&nbsp;";
	lastAdded = 'gm_row' + rows;
	$('row1').insertBefore(row, $('col1_0'));
	contents = pieces.split('');
	for (i = 0; sel = contents[i]; i++) {
		if (piece[sel]) {
			$(lastAdded).appendChild(piece[sel]);
		}
	}
}

function Seperate() {
	seperate = document.createElement('div');
	seperate.setAttribute('style', 'height:0px;clear:both;');
	$('row1').insertBefore(seperate, $('col1_0'));
}

loadBulletins_firstrun = 1;
window.gm_refreshPage = function () {
	if (ENHANCED_BULLETINS) {
		if (loadBulletins_firstrun) {
			GM_addStyle("#module9 .profileimagelink { max-height: 40px; }");
			loadBulletins_firstrun = 0;
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin',
			headers: {
				'User-Agent': 'MySpace Should Install Auto Updating'
			},
			onload: function (responseDetails) {
				var text = responseDetails.responseText;

				// Get just from the board onwards.
				startstr = '<table id = "bulletin_inbox" align="center" >';
				text = text.substr(text.indexOf(startstr));

				// Fix whitespace in <tr  > tag.
				text = text.replace('<tr  >', '<tr>');

				// Replace linebreaks with whitespace
				text2 = '';
				while (text != text2) {
					text2 = text;
					text = text.replace(/<br.*?>/i, "&nbsp;");
				}

				i = 0;
				end = 0;
				startstr = '<tr>';
				endstr = '</tr>';
				bulletins = '<tr><td style="width: 100px;">From</td><td style="width: 130px;">Date</td><td>Subject</td></tr>';
				while (i <= TOTAL_BULLETINS) {
					start = text.indexOf(startstr, end);
					end = text.indexOf(endstr, start);
					bulletin = text.substr(start, (end + endstr.length) - start);
					if (i > 0) { // If its not the first one, the header.
						bulletins += bulletin;
					}
					i = i + 1;
					if (text.indexOf('<td class="userinfo">', end) == -1) {
						i = TOTAL_BULLETINS;
					}
				}
				$('module9').getElementsByTagName('table')[0].innerHTML = bulletins;
			}
		});
	} // end enhance bulletins
}

function getAtt(elementId, att) {
	if (document.getElementById(elementId)) {
		return document.getElementById(elementId).getAttribute(att);
	} else {
		return false;
	}
}

function removeElement(elementId) {
	if (document.getElementById(elementId)) {
		document.getElementById(elementId).setAttribute('style', 'display:none');
		return true;
	} else {
		return false;
	}
}

function removeChildNode(elementId, node) {
	if (document.getElementById(elementId)) {
		document.getElementById(elementId).childNodes[node].setAttribute('style', 'display:none');
		return true;
	} else {
		return false;
	}
}

function $(elementId) {
	return document.getElementById(elementId);
} // shortcut from "Prototype Javascript Framework"

function $$(elementName) {
	return document.getElementsByName(elementName);
}