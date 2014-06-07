// ==UserScript==
// @name        FFixer
// @namespace   http://code-poet.net/
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @exclude     http://*.facebook.com/plugins/*
// @exclude     https://*.facebook.com/plugins/*
// @author      Vaughan Chandler
// @timestamp   1324786085530
// @version     2.3.1.8
// ==/UserScript==

// Last edited 2012-06-13 18:00 by GreatMarko
// See http://userscripts.org/topics/112931 for changes

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

FFixer is Copyright (c) 2011, Vaughan Chandler
FFixer is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Facebook is a registered trademark of Facebook, Inc.
FFixer is not related to or endorsed by Facebook, Inc. in any way.

*/


(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.1.8';
var version_timestamp = 1324786085530; // javascript:window.alert(new Date().getTime());
var release_date = 20121224;

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'en';
var detectedLanguage = '';
var showPopupPicTimeout;
var hidePopupPicTimeout;
var storage;

var lang = {
	// English - By Vaughan Chandler
	en : {
		'_language' : 'English',
		'AddToCalendar' : 'Add to Calendar',
		'AddToGoogleCalendar' : 'Add to Google Calendar',
		'all' : 'all',
		'All' : 'All',
		'AllPhotosLoaded' : 'All photos loaded',
		'Automatic' : 'Automatic',
		'Birthday' : '%s\'s Birthday',
		'BookmarkAdd' : 'Add New Bookmark',
		'BookmarkExists' : 'There is already a bookmark for this page.\n\nGo to the page you want to bookmark and try again.',
		'BookmarkNamePrompt' : 'Enter a name for this bookmark:\n%s',
		'BookmarksConfirmRemoval' : 'Are you sure you want to remove the following bookmarks?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Remove Selected Bookmarks',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Your browser does not support this feature.',
		'CreatingFile' : 'Creating File',
		'Close' : 'Close',
		'ConfigureFacebookFixer' : 'Configure FFixer',
		'ConfigureInstructions' : 'All changes are saved immediately, but some changes might not take effect in tabs that are already open.',
		'ConfAge' : 'Show people\'s age on their profile (if they provide their full birthdate).',
		'ConfApplicationWhitelist' : 'Application Whitelist - Enter the IDs of applications to prevent them from being hidden. Separate IDs with a space.',
		'ConfAutoBigAlbumPictures' : 'Automatically show bigger album pictures when the page opens.',
		'ConfAutoLoadFullAlbum' : 'Automatically load thumbnnails for all images in an album on a single page.',
		'ConfAutoLoadTaggedPhotos' : 'Automatically load thumbnnails for all tagged photos on a single page (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Automatically click on "see more" links.',
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Add a Bookmarks submenu to the top menu bar.',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.',
		'ConfChatHideIdle' : 'Hide idle buddies.',
		'ConfDelayPopupPics' : 'Add a short delay before showing popup pictures.',
		'ConfDelayPopupPicsTimeout' : 'Delay before showing popup pictures, in milliseconds (default=500):',
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfDisableTheater' : 'Disable the photo theater.',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExport' : 'To export your settings, copy the text below and save it in a file.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Language for FFixer',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add FFixer timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show FFixer timestamps in 24-hour format.',
		'ConfFriendRequestCountInTitle' : 'Show the number of new friend requests in the page title.',
		'ConfFindFriendsLink' : 'Show the Find Friends link in the top menu bar.',
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Hide application stories.',
		'ConfHideAskFriendStories' : 'Hide ask friend stories.',
		'ConfHideEgos' : 'Hide all "ego" sections (should hide most of Facebook\'s recommendations).',
		'ConfHideEventStories' : 'Hide event stories.',
		'ConfHideFacebookCountInTitle' : 'Hide Facebook\'s count of new inbox messages.',
		'ConfHideFriendStories' : 'Hide friend stories.',
		'ConfHideGroupStories' : 'Hide group stories.',
		'ConfHideHovercards' : 'Hide hovercards (the popup that appears when you mouse-over a name).',
		'ConfHideLikeStories' : 'Hide like stories.',
		'ConfHideLinkStories' : 'Hide link stories.',
		'ConfHideNoteStories' : 'Hide note stories.',
		'ConfHidePhotoStories' : 'Hide photo stories.',
		'ConfHidePlaceStories' : 'Hide place stories.',
		'ConfHideProfilePicStories' : 'Hide profile pic stories.',
		'ConfHideRead' : 'Hide items in the live feed that have been marked as read.',
		'ConfHideRelationshipStories' : 'Hide relationship stories.',
		'ConfHideStatusStories' : 'Hide status stories.',
		'ConfHideTicker' : 'Hide ticker.',
		'ConfHideVideoStories' : 'Hide video stories.',
		'ConfHideWallStories' : 'Hide wall stories.',
		'ConfHomeChat' : 'Show the Chat section.',
		'ConfHomeChatNames' : 'Show names in the Chat section.',
		'ConfHomeEvents' : 'Show the Events section.',
		'ConfHomeFindFriends' : 'Show the Get Connected section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Show the left column.',
		'ConfHomeLeftColumnFixed' : 'Keep the left column visible, even after scrolling down.',
		'ConfHomeLink' : 'Show the Home link in the top menu bar.',
		'ConfHomeMostRecent' : 'Show the "Recent Stories First" feed by default.',
		'ConfHomeNavigation' : 'Show the Navigation section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeProfile' : 'Show the Profile section.',
		'ConfHomeRecommendations' : 'Show recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Show the Requests section.',
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfHomeStretch' : 'Stretch the home page to the full width of the browser window.',
		'ConfHomeStretchMiddleColumn' : 'Stretch the contents of the middle column of the home page.',
		'ConfImport' : 'To import your settings later, overwrite the text below with the text you saved previously and click "Import".',
		'ConfInboxCountInTitle' : 'Show the number of new inbox messages in the page title.',
		'ConfLogoutLink' : 'Add a logout link to the top menu bar.',
		'ConfNotificationCountInTitle' : 'Show the number of new notifications in the page title.',
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageStretch' : 'Stretch all pages to the full width of the browser window.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupSmartAutoClose' : 'Prevent popup pictures from closing automatically if the mouse is over it.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfPopupWhileTagging' : 'Show popup pictures even when tagging.',
		'ConfProcessInterval' : 'Interval at which to process the page, in milliseconds (default=1000):',
		'ConfProfileLink' : 'Show the Profile link in the top menu bar.',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'About FFixer',
		'ConfSectionAdvanced' : 'Advanced',
		'ConfSectionEvents' : 'Birthdays/Events',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Other Options',
		'ConfSectionPageTitle' : 'Page Title',
		'ConfSectionPictures' : 'Pictures',
		'ConfSectionShortcuts' : 'Keyboard Shortcuts',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - FFixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to FFixer. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideoLow' : 'Download Video (Low Quality)',
		'DownloadVideoHigh' : 'Download Video (High Quality)',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'FacebookFixerConflict' : 'Facebook Fixer is now known as FFixer.<br /><br />Because of the name change you need to manually uninstall Facebook Fixer from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
		'fullAlbumLoaded' : 'full album loaded',
		'Import' : 'Import',
		'ImportConfirm' : 'Are you sure you want to import these settings?\nYour current settings will be lost.',
		'ImportFailure' : 'An error occurred while trying to import your settings.',
		'ImportSuccess' : 'Import complete. Would you like to refresh the page?',
		'Left' : 'Left',
		'LoadingAllPhotos' : 'Loading all photos...',
		'loadingFullAlbum' : 'loading full album...',
		'LoadingPic' : 'Loading Pic...',
		'LoadPhotosWarning' : 'Loading all photos may take a long time',
		'Months' : new Array('January','February','March','April','May','June','July','August','September','October','November','December'),
		'ProtocolSkype' : 'Call %s using Skype',
		'ProtocolMSN' : 'Chat with %s using Windows Live',
		'ProtocolYahoo' : 'Chat with %s using Yahoo Messenger',
		'ProtocolGoogle' : 'Chat with %s using Google Talk',
		'ReloadErrorPage' : 'Click to Try Again, or wait 5 seconds',
		'Refresh' : 'Refresh',
		'Remove' : 'Remove',
		'Right' : 'Right',
		'ShowBigPictures' : 'Show Big Pictures',
		'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'An update is available for FFixer',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	}	
}

//
// Get Elements
//
function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

//
// Greasemonkey functions / cross-browser stuff
//

// Figure out what type of storage should be used
var storage = 'none';
try {
	if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
		// Make sure greasemonkey's functions work cause some browsers lie. Yes Chrome/Chromium, I'm talking about you...
		GM_setValue('testkey', 'testvalue');
		if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
	}
} catch(x) {}
if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

//
// Implement JSON functions if they're not already defined - based on http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
//
if (!this.JSON) {
	JSON = {};
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"'+obj.replace(/"/g,'\\"')+'"';
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t == "string") v = '"'+v.replace(/"/g,'\\"')+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	JSON.parse = function (str) {
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
}

function setValue(key, value) {
	prefs[key] = value;
	switch (storage) {
		case 'greasemonkey':
			GM_setValue(id+'-'+key, value);
			break;

		case 'localstorage':
			localStorage['fbf-'+id+'-'+key] = value;
			break;
	}
}

function getValue(key, value) {
	switch (storage) {
		case 'greasemonkey':
			return GM_getValue(id+'-'+key, value);

		case 'localstorage':
			var val = localStorage['fbf-'+id+'-'+key];
			if (val=='true') { return true; }
			else if (val=='false') { return false; }
			else if (val) { return val; }
			break;
	}
	return value;
}

function log(str) {
	if (typeof debug !== 'undefined') { debug(str); }
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	return false;
}

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

function getStyle(elm, prop) {
	return window.getComputedStyle(elm, null).getPropertyValue(prop);
}

function registerMenuCommand(name, func) {
	if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
}

function xmlhttpRequest(params, callBack) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		params['onload'] = callBack;
		return GM_xmlhttpRequest(params);
	}
	return null;
}

function openInTab(url) {
	if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
	else { window.open(url); }
}

function row(cells) { return '<tr><td>' + cells.join('</td><td>') + '</td></tr>'; }


//
// Enable profile-specific settings
//
try {
	var profileLink = $("//ul[@id='pageNav']//li[contains(@class,'tinyman')]/a",null,true);
	if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
	else if (m = profileLink.href.match(/\/([^\/]+)$/)) { id = m[1]; }
	if (id.indexOf('?'!=-1)) { id = id.split('?')[0]; }
} catch(x) {}
//log('id = ' + id); // DEBUG ONLY
var buf  =	'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,!PopupWhileTagging,BigAlbumPictures,BigAlbumPicturesBorder,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,!DisableTheater,'+
			'Age,Sign,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,'+
			'!HomeLeftAlign,!HomeStretch,!HomeStretchMiddleColumn,!HomeLeftColumnFixed,HomeLeftColumn,HomeRightColumn,HomeProfile,HomeNavigation,HomeChat,!HomeChatNames,HomePokes,HomeFindFriends,HomeEvents,HomeRequests,HomeRecommendations,!HomeMostRecent,'+
			'Bookmarks,HomeLink,ProfileLink,FindFriendsLink,LogoutLink,ChatDifferentiate,!ChatHideIdle,DownloadVideo,ErrorPageReload,PageTitle,HideFacebookCountInTitle,!FriendRequestCountInTitle,!NotificationCountInTitle,InboxCountInTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts,!FacebookTimestamps,FBFTimestamps,FBFTimestamps24,!PageStretch,'+
			'!HideApplicationStories,!HideAskFriendStories,!HideEventStories,!HideFriendStories,!HideGroupStories,!HideLikeStories,!HideLinkStories,!HideNoteStories,!HidePhotoStories,!HidePlaceStories,!HideProfilePicStories,!HideRelationshipStories,!HideStatusStories,!HideTicker,!HideVideoStories,!HideWallStories,!AutoReadMore,!HideEgos,!HideHovercards';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '1.0'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en'),
	'ProcessInterval': getValue('ProcessInterval', '1000'),
	'DelayPopupPicsTimeout' : getValue('DelayPopupPicsTimeout', '500'),
	'BookmarkList' : getValue('BookmarkList', '[]'),
	'ApplicationWhitelist' : getValue('ApplicationWhitelist', '[]'),
	'CustomFeedModification' : getValue('CustomFeedModification', ''),
	'CustomCSS' : getValue('CustomCSS', '')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}
prefs['HideRead'] = false; // This is broken

//
// Adjust legacy prefs
//
prefs['PopupPosition'] = prefs['PopupPosition'].toLowerCase().replace(/^-/, ''); // The replace is to handle a bug in 2.1.4
setValue('PopupPosition', prefs['PopupPosition']);

//
// Figure out what language we should be using
//
buffer = document.body.className.match(/locale_([^ ]+)/i);
if (prefs['FacebookFixerLanguage'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['FacebookFixerLanguage'];
}
//log(language); // DEBUG ONLY

//
// Add div for showing big profile pics
//
var popupPicDiv = document.createElement('div');
popupPicDiv.id = 'ff-popup-pic-div';
popupPicDiv.className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition']=='auto' ? 'left' : prefs['PopupPosition']);
popupPicDiv.innerHTML = '<div id="ff-popup-pic-close" title="' + $l('Close') + '">x</div><div id="ff-popup-pic-image"><span></span></div>';
try {
	document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
			on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
			if ($('#ff-popup-pic-div')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
	}, 100);
}
// Listeners are added by the code for showing the popups

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
document.body.appendChild(popupDiv);
on('click', popupDiv, function(e) { if (e.target.id=='fbfPopupContainer') { hidePopup() } });
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
document.body.appendChild(shadowDiv);

//
// Misc. Short Functions
//

// Get a string in the current language, or default to english
function $l(key,text) {
	var string, l;
	if (lang[language][key]) { string = lang[language][key]; l = language; }
	else { string = lang['en'][key]; l = 'en'}
	if (text) { string = string.replace('%s', text); }
	return string;
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { for (var i=0; i<type.length; i++) { on(type[i], elm, func); } }
	else {
		if (elm instanceof Array) { for (var j=0; j<elm.length; j++) { on(type, elm[j], func); } }
		else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
	}
}

// Add 'click' event listener
function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

// Click on an element selected using xpath
function clickX(path) {
	var elm = $(path, null, true);
	if (!elm) { return false; }
	click(elm);
	return true;
}

// Get an elements position
function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

// Determine if we're on the home page
function isHomePage() {
	return !!(page.match(/^((\?|home\.php).*)?$/));
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
	$('#fbfPopupContainer').innerHTML = content;
	$('#fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
	$('#fbfShadow').style.zIndex = '1000';
	$('#fbfPopupContainer').style.zIndex = '1001';
	$('#fbfShadow').style.display = 'block';
	$('#fbfPopupContainer').style.display = 'block';
	if (!fixedPosition) { window.scroll(0,0); }
}

// Show a popup dialog - similar to showPopup() but more automated
function showDialog(content, controls, opts) {
	if (!opts) { opts=''; }
	if (!controls) { controls=''; }
	if (!opts.match(/\bnocontrols\b/)) { content+= '<div style="border-top:1px solid #ccc; margin-top:10px; padding-top:10px; text-align:right;">' + controls + (opts.match(/\bnoclose\b/) ? '' : '<input type="button" value="' + $l('Close') + '" id="ff-popup-close" />') + '</div>'; }
	showPopup('<div class="fbfPopup" style="' + (opts.match(/\bsmall\b/) ? 'max-width:450px; margin:80px auto;' : 'max-width:700px; margin:30px auto;') + '">' + content + '</div>');
	if (!opts.match(/\b(noclose|nocontrols)\b/)) { onClick($('#ff-popup-close'), hidePopup); }
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('#fbfPopupContainer')) {
		$('#fbfPopupContainer').style.display = 'none';
		$('#fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
// Returns an integer starting at 0 for January, or -1 if the month can't be figured out.
function parseMonth(str) {
	// Supports: Bulgarian, Czech, Danish, Dutch, English, French, German, Greek, Indonesian, Italian, Macedonian, Portuguese, Serbian, Slovak, Spanish, Swedish
	var dict = {
		'bg'		: Array('??????', '????????', '????', '?????', '???', '???', '???', '??????', '?????????', '????????', '???????', '????????'),
		'cs'		: Array('leden', 'únor', 'b?ezen', 'duben', 'kv?ten', '?erven', '?ervenec', 'srpen', 'zá?í', '?íjen', 'listopad', 'prosinec'),
		'da'		: Array('januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'),
		'de'		: Array('januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'),
		'en-abbr1'	: Array('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'),
		'en-abbr2'	: Array('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'),
		'en'		: Array('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'),
		'es'		: Array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'),
		'el'		: Array('i?????????', '???????????', '???????', '????????', '?????', 'i??????', 'i??????', '?????????', '???????????', 'o????????', '?????????', '??????????'),
		'fr'		: Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'),
		'id'		: Array('januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'),
		'it'		: Array('gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'),
		'mk'		: Array('???????', '????????', '????', '?????', '???', '????', '????', '??????', '?????????', '????????', '???????', '????????'),
		'nl'		: Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'),
		'pt'		: Array('janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'),
		'sk'		: Array('január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'),
		'sr'		: Array('??????', '???????', '????', '?????', '???', '????', '????', '??????', '?????????', '???????', '????????', '????????'),
		'sv'		: Array('januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december')
	}
	$d_months = Array(Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array());
	for (var key in dict) { for (var i=0; i<dict[key].length; i++) { $d_months[i].push(dict[key][i]); } }
	for (var i=0; i<12; i++) { $d_months[i] = RegExp('^(.*\\s)?(' + $d_months[i].join('|') + ')(\\s.*)?$'); }
	
	parseMonth = function(str) {
		str = str.toLowerCase();
		for (var i=0; i<$d_months.length; i++) { if (str.match($d_months[i])) { return i; } }
		return -1;
	}
	return parseMonth(str);
}

// Figure out the day-of-week from a string containing a date
// Returns an integer starting at 0 for Sunday, 7 for "today", 8 for "tomorrow", or -1 if the day-of-week can't be figured out.
function parseDay(str) {
	// Supports: English, French, Spanish
	var dict = {
		"en-abbr1"	: Array("sun", "mon", "tue", "wed", "thu", "fri", "sat", "today", "tomorrow"),
		"en-abbr2"	: Array("sun", "mon", "tues", "wed", "thurs", "fri", "sat", "today", "tomorrow"),
		"en"		: Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "today", "tomorrow"),
		"es"		: Array("domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "hoy", "mañana"),
		"fr"		: Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "aujourd'hui", "demain")
	}
	$d_days = Array(Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array());
	for (var key in dict) { for (var i=0; i<dict[key].length; i++) { $d_days[i].push(dict[key][i]); } }
	for (var i=0; i<9; i++) { $d_days[i] = RegExp('^(.*\\s)?(' + $d_days[i].join('|') + ')(\\s.*)?$'); }
	
	parseDay = function(str) {
		str = str.toLowerCase();
		for (var i=0; i<$d_days.length; i++) { if (str.match($d_days[i])) { return i; } }
		return -1;
	}
	return parseDay(str);
}

// Parse a date
/*
function $d(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('tomorrow')!=-1) { date = date.getNextDay(); }
	else if (str.indexOf('today')==-1) {
		var month = parseMonth(str);
		if (month==-1) return null;
		date.setMonth(month);
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
		if (m = str.match(/\s(\d\d?\.?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	return date;
}
*/
function $d(str, forceNextDay) {
	str = ' ' + str.toLowerCase().replace(/,/g, ' ') + ' ';
	var m;
	var date = new Date();
	var now = new Date();
	var dow = parseDay(str);
	var month = parseMonth(str);
	
	var regex_time = /\b(\d\d?):(\d\d)( ?(a|p)m)?/i;
	var regex_year = /\b(\d{4})\b/;
	var regex_date = /\s(\d\d?\.?|3?1st|2nd|3rd|\d?\dth)\s/;
	
	if (m = str.match(regex_time)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	} else if (month==-1 && dow==-1) return null;
	
	if (month!=-1) { date.setMonth(month); }
	
	if (m = str.match(regex_year)) { date.setYear(m[1]); }
	else if (date.before(now)) { 
		if (month==-1 && dow==-1) { date = date.getNextDay(); /* no date/month info, assume the time refers to tomorrow */ }
		else { date.setYear(now.getFullYear()-0+1); /* no year info, assume the date refers to next year */ }
	}
	
	if (dow==8) { date = date.getNextDay(); }
	else if (dow!=7) {
		if ((m = str.match(regex_date))) {
			d = m[1].replace(/\D/g, '');
			if (d>0 && d<32) { date.setDate(d); }
		} else if (dow!=-1) {
			for (var i=0; i<7; i++) {
				date = date.getNextDay();
				if (date.getDay()==dow) { break; }
			}
		}
	}
	
	if (forceNextDay) { date = date.getNextDay(); }
	
	return date;
}
if (false) {
	// Sanity check for the date parser
	setTimeout(function() {
		var dates = Array(
			'January 1',
			'February 28',
			'February 29',
			'February 30',
			'December 31',
			'Sunday, January 1 at 9:00 pm',
			'January 1st at 9:00 pm',
			'1st January, 2012 at 9:00 pm',
			'Friday at 5:00pm',
			'Saturday at 5:00pm',
			'Sunday at 5:00pm',
			'Today at 21:00',
			'Tomorrow at 21:00',
			'23:59',
			'00:01',
			'11:59pm',
			'12:01am'
		);
		var buf = Array();
		for (var i=0; i<dates.length; i++) { buf.push('<td style="text-align:right; padding-right:5px;"> ' + dates[i] + ' </td><td style="text-align:right;"> ' + $d(dates[i], true) + ' </td>'); }
		showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; ">Sanity check for date parser:<br /><table><tr>' + buf.join('</tr><tr>') + '</tr></table></div>');
	}, 3000);
}


//
// Rotate an object
//
function rotate(elm) {
	degrees=((elm.getAttribute('data-ff-degrees') || 0) - 0 + 90 ) % 360;
	elm.setAttribute('data-ff-degrees', degrees);
	elm.style.margin = '75px 0';
	elm.style.transform = 'rotate(' + degrees + 'deg)';
	elm.style.MozTransform = 'rotate(' + degrees + 'deg)';
	elm.style.OTransform = 'rotate(' + degrees + 'deg)';
	elm.style.WebkitTransform = 'rotate(' + degrees + 'deg)';
}


//
// Google Translate functions
//
function handleTranslateRequest() { showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translating...</b> (press escape to close this popup)</div>', true, true); }
function handleTranslateResponse(r) {
	//window.alert(r.responseText);
	//window.alert(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	//t = JSON.parse(r.responseText.replace('],,"', '],"","'));
	t = JSON.parse(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	translated = Array();
	for (var i=0; i<t.length; i++) { translated.push(t[i][0]); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (automatically translated to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}
function googleTranslate(str) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		handleTranslateRequest();
		xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
	} else {
		window.open('http://translate.google.com/?sl=auto&tl=' + prefs['GoogleLanguage'] + '&text=' + window.getSelection());
	}
}


//
// Detect Facebook Fixer
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">FFixer</div><br />' + $l('FacebookFixerConflict', 'href="http://www.code-poet.net/userscripts/ffixer/upgrading-from-facebook-fixer.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'FFixer Debug Info:<br /><br />'+
			'<table id="ff-debug">'+
			row(['version: ',version])+
			row(['release date: ',release_date])+
			row(['release timestamp: ',version_timestamp])+
			row(['id: ',id])+
			row(['page: ',page])+
			row(['homepage: ',(isHomePage()?'yes':'no')])+
			row(['language: ',language])+
			row(['detected language: ',detectedLanguage])+
			row(['storage: ',storage])+
			row(['date: ',new Date()])+
			row(['user agent: ',navigator.userAgent])+
			'</table>'
		);
	} catch(x) { logError('Debug Info', x); }
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.shiftKey + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') { return clickX("//a[contains(@href,'" + filter.replace(/^./,'') + "')]"); }
			return clickX("//a[contains(string(),'"+filter+"')]");
		}
		function gotoPage(url, preventClick) {
			url = url.replace(/^https?:\/\/www\.facebook\.com/, '');
			if (unsafeWindow && unsafeWindow.Quickling) {
				if (location.href.toLowerCase().match(/^https?:\/\/www\.facebook\.com\//)) { location.hash = '!'+url; }
				else if (preventClick || !clickLink(':' + url)) { location.href = location.protocol + '//www.facebook.com' + url; }
			} else { location.href = location.protocol + '//www.facebook.com' + url; }
		}
		function gotoPageX(path) {
			var xElm = $(path,null,true);
			if (xElm) { gotoPage(xElm.href, true); }
			//else { log('"' + path + '" could not be resolved'); } // debug
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('ff-popup-pic-div').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { showDebugInfo(); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: gotoPage('/?sk=media'); break; // A
				case 66: click($("//*[@id='fbDockChatBuddylistNub']/a",null,true)); break; // B
				case 67: if (isHomePage() || !(page=='' || page.match(/^index.php/) || page.match(/^login.php/) || page.match(/^logout.php/))) { showConfig(); } break; // C
				case 68: gotoPage('/?sk=bd'); break; // D
				case 69: gotoPage('/?sk=events'); break; // E
				case 70: gotoPage('/friends/?filter=afp'); break; // F
				case 72: gotoPage('/home.php'); break; // H
				case 73: gotoPage('/?sk=messages'); break; // I
				case 75: click($('#ff-add-bookmark')); break; // K
				case 76: click($('#navAccountLink')); $('//form[@id="logout_form"]//input[@type="submit"]', null, true).focus(); break; // L
				case 78: gotoPage('/notifications.php'); break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 82: gotoPage('/reqs.php'); break; // R
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break; // S
				case 84: if (window.getSelection()!='') { googleTranslate(window.getSelection()); } break; // T
				case 86: gotoPage('/?sk=video'); break; // V
			}
		}
		else {
			if (page.indexOf('photo.php')==0) {
				switch(e.keyCode) {
					case 82: rotate($('//img[@id="fbPhotoImage"]|//div[@id="fbPhotoSnowbox"]//img[@class="spotlight"]', null, true)); break; // r
				}
			} else if (page.indexOf('/photos/')!=-1) {
				switch(e.keyCode) {
					case 65: // a
					case 82: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=recent'; break; // r
					case 77: // m
					case 85: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=mobile'; break; // u
					case 84: // t
					case 70: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=tagged'; break; // f
					case 67: clickLink('Photo Comments'); break; // c
					case 79: clickLink('Photos of Me'); break; // o
					case 80: clickLink('My Photos'); break; // p
				}
			}
			else if (isHomePage()) {
				switch(e.keyCode) {
					case 65: gotoPage('/home.php?filter=pp'); break; // a
					case 70: gotoPage('/home.php?filter=nf'); break; // f
					case 71: gotoPage('/home.php?filter=app_2361831622'); break; // g
					case 76: gotoPage('/home.php?filter=app_2309869772'); break; // l
					case 78: gotoPage('/home.php?filter=h'); break; // n
					case 80: gotoPage('/home.php?filter=app_2305272732'); break; // p
					case 83: gotoPage('/home.php?filter=app_2915120374'); break; // s
					case 84: gotoPage('/home.php?filter=app_2347471856'); break; // t
					case 85: gotoPage('/home.php?filter=app_2915120374'); break; // u
					case 86: gotoPage('/home.php?filter=app_2392950137'); break; // v
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink($l('ShowBigPictures')); break; // b
					case 67: if (!clickLink('View Comments')) { if (!clickLink('Photo Comments')) { clickLink('Comments on Photos'); } } break; // c
					case 73: gotoPageX('//a[contains(@href,"v=info")][not(contains(@href,"edit"))]'); break; // i
					case 80: gotoPageX("//a[contains(@href,'v=photos')]"); break; // p
					case 87: gotoPageX("//a[contains(@href,'v=wall')]");  break; // w
					case 88: gotoPageX("//a[contains(@href,'v=box')]");  break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 75: gotoPageX('//a[contains(@href,"album.php")][not(contains(@href,"page="))]'); break; // k
				case 65: click(document.getElementById('FBFLoadAllPhotos')); break; // a
			}
		}
	}, false);
}


//
// Allow script configuration
//
registerMenuCommand($l('ConfigureFacebookFixer'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="ff-config-menu-link" class="navSubmenu" href="#" onclick="return false;">' + $l('ConfigureFacebookFixer') + '</a>';
	menu.insertBefore(configLink, ($('.//form[@id="logout_formx"]/parent::li', menu, true) || menu.lastChild));
	on('click', '#ff-config-menu-link', showConfig);
}
function showConfig() {
	var opacitySelect = '';
	for (i=100; i>=0; i-=10) { opacitySelect=opacitySelect+'<option value="' + (i==100?'1.0':'0.'+(i/10)) + '">' + (100-i) + '%</option>'; }
	function makeOpacitySelector(id1, id2) { return '<tr><td><span class="fbfLabel">' + $l('Conf'+id1) + '</span></td><td><select id="fbfConf' + id1 + '">' + opacitySelect + '<option value="-1">' + $l('Remove') + '</option></select> &nbsp; &nbsp;<span class="fbfLabel">' + $l('Conf'+id2) + '</span> &nbsp;<select id="fbfConf' + id2 + '">' + opacitySelect + '</select></td></tr>'; }
	function makeCheckBoxes(ids, prefix) {
		if (!prefix) { prefix = ''; }
		ids = ids.split(',');
		for (var i=0, buf=''; i<ids.length; i++) { buf = buf + prefix + '<input type="checkbox" id="fbfConf' + ids[i] + '" /><label for="fbfConf' + ids[i] + '">' + $l('Conf'+ids[i]) + '</label><br />'; }
		return buf;
	}
	function makeNumberInputs(ids) {
		ids = ids.split(',');
		for (var i=0, buf = ''; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
		return buf;
	}
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(FFixer ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br />'+
		'<table id="fbfConfigContainer">'+
			'<tr><td id="fbfConfigTabs">'+
					'<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
					'<div id="fbfConfigTab-1">' + $l('ConfSectionFeeds') + '</div>'+
					'<div id="fbfConfigTab-2">' + $l('ConfSectionPictures') + '</div>'+
					'<div id="fbfConfigTab-3">' + $l('ConfSectionEvents') + '</div>'+
					'<div id="fbfConfigTab-4">' + $l('ConfSectionMenu') + '</div>'+
					'<div id="fbfConfigTab-5">' + $l('ConfSectionPageTitle') + '</div>'+
					'<div id="fbfConfigTab-6">' + $l('ConfSectionShortcuts') + '</div>'+
					'<div id="fbfConfigTab-7">' + $l('ConfSectionOther') + '</div>'+
					'<div id="fbfConfigTab-8">' + $l('ConfSectionImportExport') + '</div>'+
					'<div id="fbfConfigTab-9">' + $l('ConfSectionAdvanced') + '</div>'+
					'<div id="fbfConfigTab-10">' + $l('ConfSectionAbout') + '</div>'+
			'</td><td id="fbfConfigControls">'+
				'<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
					makeCheckBoxes('HomeStretch,HomeStretchMiddleColumn,HomeMostRecent,HomeLeftAlign,HomeLeftColumnFixed,HomeLeftColumn')+
					makeCheckBoxes('HomeProfile,HomeNavigation,HomeChat', ' &nbsp; &nbsp; ') +
					makeCheckBoxes('HomeChatNames', ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;') +
					makeCheckBoxes('HomeRightColumn') +
					makeCheckBoxes('HomeEvents,HomeRecommendations,HomeRequests,HomePokes,HomeFindFriends', ' &nbsp; &nbsp; ') +
				'</div>'+
				'<div id="fbfConfigControl-1">'+
					makeCheckBoxes('HideApplicationStories,HideAskFriendStories,HideEventStories,HideFriendStories,HideGroupStories,HideLikeStories,HideLinkStories,HideNoteStories,HidePhotoStories,HidePlaceStories,HideProfilePicStories,HideRelationshipStories,HideStatusStories,HideVideoStories,HideWallStories') +
					'<br />' + $l('ConfApplicationWhitelist') + '<br /><textarea id="fbfConfApplicationWhitelist" style="width:400px; height:150px;"></textarea>' +
				'</div>'+
				'<div id="fbfConfigControl-2">'+
					makeCheckBoxes('ProfilePicPopup,PhotoPopup,ExternalPopup,DelayPopupPics,PopupAutoClose,PopupSmartAutoClose,PopupWhileTagging,BigAlbumPictures')+
					makeCheckBoxes('BigAlbumPicturesBorder', '&nbsp; &nbsp; ')+
					makeCheckBoxes('AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos,DisableTheater') +
					'<span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-auto" value="auto" /><label for="fbfConfPopupPosition-auto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-left" value="left" /><label for="fbfConfPopupPosition-left">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-right" value="right" /><label for="fbfConfPopupPosition-right">' + $l('Right') + '</label><br />'+
				'</div>'+
				'<div id="fbfConfigControl-3">'+
					makeCheckBoxes('Age,Sign,GoogleCalendar,CalendarFullName,CalendarBirthDate,GoogleApps') +
					$l('ConfGoogleAppsDomain') + ': <input id="fbfConfGoogleAppsDomain"></input><br />'+
				'</div>'+
				'<div id="fbfConfigControl-4">'+
					makeCheckBoxes('ChatHideIdle,ChatDifferentiate,Bookmarks,LogoutLink,HomeLink,FindFriendsLink,ProfileLink,TopBarFixed') +
					'<table style="margin-left:-3px;">' +
					makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
					makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-5">'+
					makeCheckBoxes('PageTitle,HideFacebookCountInTitle,FriendRequestCountInTitle,InboxCountInTitle,NotificationCountInTitle') +
				'</div>'+
				'<div id="fbfConfigControl-6">'+
					makeCheckBoxes('Shortcuts') + '<br />' + $l('ConfShortcutList')+
				'</div>'+
				'<div id="fbfConfigControl-7">'+
					makeCheckBoxes('DownloadVideo,ProtocolLinks,ErrorPageReload,NewTabSearch,SecureLinks,AutoReadMore,HideHovercards,HideTicker,FacebookTimestamps,FBFTimestamps,FBFTimestamps24,Updates') +
					'<table style="margin-left:-3px;">' +
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">?eština (Czech)</option><option value="sr_rs">?????? (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">???????? (Greek)</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">?????????? ????? (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Sloven?ina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Ti?ng Vi?t (Vietnamese)</option><option value="tr">Türkçe (Turkish)</option><option value="bg">????????? (Bulgarian)</option><option value="zh_tw">??(??) (Chinese - Taiwan)</option><option value="ko">??? (Korean)</option><option value="ja">??? (Japanese)</option></select></td></tr>'+
					'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Hatian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option></select></td></tr>'+
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-8">'+
					(typeof JSON == 'undefined' ? $l('BrowserUnsupported') : $l('ConfExport') + '<br />' + $l('ConfImport') + '<br /><br /><textarea id="fbfPrefsJSON" style="width:425px; height:200px;" onmouseover="this.focus();this.select()">' + JSON.stringify(prefs, null, "\n") + '</textarea><br /><input type="button" id="fbfImport" value="' + $l('Import') + '" />')+
				'</div>'+
				'<div id="fbfConfigControl-9">'+
					makeNumberInputs('ProcessInterval,DelayPopupPicsTimeout')+
					makeCheckBoxes('HideEgos,PageStretch')+
					'<br /><input type="button" id="fbfAnalyzeLocalization" value="Analyze Localization" />'+
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html" target="_blank">FFixer</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />FFixer is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gökhan Gurbeto?lu - Turkish</li><li>Gorgeous - Italian</li><li>Gorštak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Masami HIRATA - Japanese</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Sindhu Pripamungkas - Indonesian</li><li>Tr?n ??c Th?nh - Vietnamese</li><li>??? - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
		'</div>', true
	);
	// Add the listener for the close button - if nothing else we should be able to close the popup
	onClick('fbfCloseConfig', function() { hidePopup(); });

	try {

		// Update checkbox/boolean fields to match current settings and listen for changes
		for (var i=0; i<booleanOptions.length; i++) {
			if (prefs[booleanOptions[i]]) { $('#fbfConf'+booleanOptions[i]).checked='checked'; }
			on('click', '#fbfConf'+booleanOptions[i], function(e) {
				setValue(e.target.id.replace('fbfConf',''), e.target.checked);
				prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
			});
		}
		
		// Update radio fields to match current settings
		$('#fbfConfPopupPosition-' + prefs['PopupPosition']).checked='checked';
		
		// Update select fields to match current settings
		var opacities = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity');
		for (var i=0; i<opacities.length; i++) { $('#fbfConf'+opacities[i]).value = prefs[opacities[i]]; }
		$('#fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
		$('#fbfConfGoogleLanguage').value = prefs['GoogleLanguage'];
		$('#fbfConfFacebookFixerLanguage').value = prefs['FacebookFixerLanguage'];
		$('#fbfConfApplicationWhitelist').value = JSON.parse(prefs['ApplicationWhitelist']).sort().join(' ');
		$('#fbfConfCustomFeedModification').value = prefs['CustomFeedModification'];
		$('#fbfConfCustomCSS').value = prefs['CustomCSS'];

		// Listen for changes
		
		on('click', '#fbfConfigTabs', function(e) {
			var current = e.target;
			if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
				var previous = $('.fbfConfigSelectedTab')[0];
				previous.className='';
				$('#fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
				current.className = 'fbfConfigSelectedTab';
				$('#fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
			}
		});
		
		var positions = new Array('auto','left','right');
		for (var i=0; i<positions.length; i++) {
			on('click', '#fbfConfPopupPosition-'+positions[i], function(e) {
				setValue('PopupPosition', e.target.id.replace('fbfConfPopupPosition-',''));
				e.target.blur();
			});
		}
		
		on('keyup', '#fbfConfGoogleAppsDomain', function(e) {
				setValue('GoogleAppsDomain', e.target.value);
				prefs['GoogleAppsDomain'] = e.target.value;
		});
		
		on(Array('blur','keyup'), '#fbfConfApplicationWhitelist', function(e) {
				e.target.value = e.target.value.replace(/^\s+/g, '').replace(/\s*[^\d\s]/g, ' ').replace(/(\s)\s+(\S)/, '$1$2');
				var awl = JSON.stringify(e.target.value.replace(/^\s+|\s+$/g, '').split(/\s+/).sort());
				if (awl == '[""]') { awl = '[]'; }
				setValue('ApplicationWhitelist', awl);
				prefs['ApplicationWhitelist'] = awl;
		});
		
		on('click', '#fbfUpdateLink', function() { FBFUpdateCheck(true); });
		
		on('click', '#fbfImport', function() {
			if (window.confirm($l('ImportConfirm'))) {
				try {
					var importing = JSON.parse($('#fbfPrefsJSON').value);
					for (var key in importing) {
						log(key + ' => ' + importing[key]);
						setValue(key, importing[key]);
					}
					if (window.confirm($l('ImportSuccess'))) { location.reload(); }
				} catch(x) {
					logError('Import/Export', x);
					window.alert($l('ImportFailure'));
				}
			}
		});
		
		on('click', '#SaveCustomFeedModification', function() { setValue('CustomFeedModification', $('#fbfConfCustomFeedModification').value); });
		
		on('click', '#SaveCustomCSS', function() { setValue('CustomCSS', $('#fbfConfCustomCSS').value); });
		
		on('click', '#fbfAnalyzeLocalization', function() {
			var analysis = [];
			for (var key in lang.en) {
				var missing = !lang[language][key];
				var string = missing ? $l(key) : lang[language][key];
				if (typeof string == 'string') { string = "'" + string.toString().replace("'", "\\'").replace(/\n/g, "\\n") + "'"; }
				else {
					var buffer = [];
					for (var i=0; i<string.length; i++) { buffer.push("'" + string[i].replace("'", "\\'").replace(/\n/g, "\\n") + "'"); }
					string = "new Array(" + buffer.join(",") + ")";
				}
				analysis.push((missing ? '/**/' : '') + "		'" + key + "' : " + string);
			}
			showDialog(
				'<div style="margin-bottom:9px;">Below are the strings for the ' + $l('_language') + ' localization.' + (language=='en' ? ' You can use them for starting a new localization.' : '<br />Obsolete strings have been removed, and strings requiring translation have /**/ at the start of the line.') + '</div>'+
				'<textarea style="height:600px; width:694px; padding:2px;" onmouseover="this.focus(); this.select();" wrap="off" readonly="yes">' + analysis.join(',\n') + '</textarea>'
			);
		});
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
		for (var i=0; i<selects.length; i++) {
			on('change', '#fbfConf'+selects[i], function(e) {
				setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value);
				e.target.blur();
			});
		}

		var numberInputs = new Array('ProcessInterval','DelayPopupPicsTimeout');
		for (var i=0; i<numberInputs.length; i++) {
			on('keyup', '#fbfConf'+numberInputs[i], function(e) {
				try {
					var val = parseInt(e.target.value);
					setValue(e.target.id.replace(/^fbfConf/,''), val);
				} catch(x){}
			});
		}

	} catch(x) { logError('Config Popup', x); }

	window.scroll(0,0);
}

//
// Check for Updates (very modified, originally based on code by Jarett - http://userscripts.org/users/38602)
//
var updateForced;
function FBFUpdateCheck(forced) {
	if((forced)||(parseInt(getValue("LastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
		updateForced = forced;
		// new: http://userscripts.org/scripts/source/8861.meta.js old: http://userscripts.org/scripts/review/8861
		try { xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/8861.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse); }
		catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } }
	}
}
function handleUpdateResponse(r) {
	setValue('LastUpdate', new Date().getTime() + "");
	if (r.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) { showUpdatePopup(); }
	else if (updateForced) { alert("No update is available for FFixer."); }
}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showDialog(
		$l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div>',
		'<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" /> '+
		'<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div>',
		'small,noclose'
	);
	onClick('fbfUpdateInstall', function() { openInTab('http://userscripts.org/scripts/source/8861.user.js'); hidePopup(); });
	onClick('fbfUpdateHomepage', function() { window.open('http://userscripts.org/scripts/show/8861'); hidePopup(); });
	onClick('fbfUpdateTomorrow', hidePopup);
}

//
// Add CSS
//
var style='';

// General CSS used by script itself
style = style +
	'.fbfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#ff-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'+
	'.ff-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'+
	'.ff-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#ff-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'+
	'#ff-popup-pic-div:hover #ff-popup-pic-close { display:block; }'+
	'#ff-popup-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:15px 3px; margin:10px; text-align:center; position:relative; }'+
	'#FBFBigAlbum a { padding:1px; }'+
	'.FBFBigAlbumClose { color:red; cursor:pointer; font-weight:bold; padding:0 10px; }'+
	'#FBFBigAlbumClose1 { position:absolute; top:0; right:0; }'+
	'#FBFBigAlbumClose2 { position:absolute; bottom:0; right:0; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'+
	'.ff-album-page td { background:#aaa; text-align:center; }'+
	'#ff-debug td { vertical-align:top; }'+
	'.ffixer-highlighted-story, .ffixer-highlighted-story * { font-weight:bold !important; }';

// CSS for the config screen
style = style +
	'#fbfConfigContainer { width:100%; z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#fbfConfigTabs { width:200px; vertical-align:top; }'+
	'#fbfConfigTabs div { background:white; color:background:#3b5998; padding:10px 0 10px 10px; border:1px solid #cccccc; border-top-width:0; cursor:pointer; }'+
	'#fbfConfigTabs div#fbfConfigTab-0 { border-top-width:1px; }'+
	'#fbfConfigTabs div:hover { font-weight:bold; }'+
	'#fbfConfigTabs div.fbfConfigSelectedTab { background:#3b5998; color:white; font-weight:bold; }'+
	'#fbfConfigControls { background:white; border:1px solid #cccccc; vertical-align:top; }'+
	'#fbfConfigControls div { display:none; padding:5px 5px 5px 23px; }'+
	'#fbfConfigControls div.fbfConfigSelectedControl { display:block; }'+
	'#fbfConfigControls input[type=checkbox] { margin-left:-18px; margin-bottom:8px; }';

// Custom CSS
if (prefs['CustomCSS'].length>0) { style = style + prefs['CustomCSS']; }

// CSS used to hide/show/alter Facebook features
if (prefs['ChatDifferentiate'])			{ style = style + ' .fbChatBuddyList a.friend, #pagelet_friends_online .chatOnline { font-weight:bold; } .fbChatBuddyList a.idle, #pagelet_friends_online .chatIdle { font-weight:normal; font-style:italic; }'; }
if (prefs['ChatHideIdle'])				{ style = style + ' body .fbChatBuddyList a.idle { max-height:0; overflow:hidden; padding-top:0; padding-bottom:0; } #pagelet_friends_online .chatIdle { display:none; }'; }
if (prefs['HideEgos'])					{ style = style + ' .ego_column, .netego_organic, #netego_organic, #pagelet_netego, #pagelet_netego_lower, #pagelet_betabox { display:none; } #pagelet_netego_requests div.ego_column, #pagelet_netego_pokes div.ego_column { display:block; }'; }
if (prefs['HideHovercards'])			{ style = style + ' .uiOverlayArrowTop, .uiOverlayArrowBottom { display:none; }'; }
if (prefs['HideTicker'])				{ style = style + ' #pagelet_ticker, .fbSidebarGripper, /* previous selectors are for side bar, subsequent selectors are for home pages right column */ #pagelet_rhc_ticker { display: none; }'; }
if (prefs['AutoReadMore'])				{ style = style + ' .text_exposed_root .text_exposed_hide { display:none; } .text_exposed_root .text_exposed_show { display:inline; }'; }
//if (prefs['FBFTimestamps'])				{ style = style + ' abbr[data-date] { display:none; } abbr.timestamp { display:inline; }'; } // debug
if (prefs['BigAlbumPicturesBorder'])	{ style = style + ' #FBFBigAlbum a { padding:0 1px 1px 0; } #FBFBigAlbum img { display:inline-block; border:1px solid #ccc; background:#fff; min-width:20px; min-height:20px; }'; }
if (prefs['HomeLeftColumnFixed'])		{ style = style + ' .home #leftColContainer { position:fixed; }'; }
if (prefs['HomeStretchMiddleColumn'])	{ style = style + ' body.home #contentArea { position:absolute; width:auto !important; margin-right:240px; padding-right:25px !important; } body.home .UIStream .uiUfi { width:auto; }'; }
if (prefs['HomeStretch'])				{ style = style + ' body.home #globalContainer { width:auto; margin:auto 1px; } .nsh .slim #blueBar #pageHead{ width:100%; margin-right:1px; left:10px; }'; }
else if (prefs['HomeLeftAlign'])		{ style = style + ' .home #globalContainer { margin:0 0 0 5px; ! important; left:0; }'; }
//if (prefs['PageStretch'])				{ style = style + ' .fbx li.uiUnifiedStory { padding-right:0; } .fbx form.commentable_item > ul {width: auto !important;} .fbx .uiStream .hideSelector { margin-right:0; } .fbx #globalContainer { width:auto; margin:auto 7px; } .fbx #fbf-page-head-container { width:auto; } .fbx .hasRightCol { position:relative; } .fbx #contentCol #contentArea { margin-right:10px; width:auto; min-width:759px; } .fbx #contentCol.hasRightCol #contentArea { margin-right:275px; width:auto; } .fbx .hasRightCol #rightCol { position:absolute; right:0; } .fbx .uiStream .hideSelector { margin-right:0; }'; }
//if (prefs['PageStretch'])				{ style = style + ' '; }
if (!prefs['FindFriendsLink'])			{ style = style + ' .nsh #pageNav .navItem a[href*="find-friends"], .nsh #pageNav #navAccountLink a[href*="find-friends"] { display:none; }'; }
if (!prefs['HomeLink'])					{ style = style + ' #navHome { display:none; }'; }
if (!prefs['ProfileLink'])				{ style = style + ' .navItem.firstItem.tinyman { display:none; }'; }
if (!prefs['TopBarFixed']) 				{ style = style + ' #blueBar { position:static !important; }'; }
if (!prefs['FacebookTimestamps'])		{ style = style + ' abbr.timestamp { display:none; }'; }
if (!prefs['HomeProfile'])				{ style = style + ' #pagelet_welcome_box { display:none; }'; }
if (!prefs['HomeNavigation'])			{ style = style + ' #pagelet_navigation { display:none; }'; }
if (!prefs['HomeChat'])					{ style = style + ' #pagelet_friends_online { display:none; }'; }
if (!prefs['HomePokes'])				{ style = style + ' #pagelet_netego_pokes { display:none; }'; }
if (!prefs['HomeRecommendations'])		{ style = style + ' #pagelet_netego, #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeFindFriends'])			{ style = style + ' #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeEvents'])				{ style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests'])				{ style = style + ' #pagelet_netego_requests { display:none; }'; }
if (!prefs['HomeBeta'])					{ style = style + ' #pagelet_betabox { display:none; }'; }
if (!prefs['HomeLeftColumn'])			{ style = style + ' .home #mainContainer #leftCol { display:none; } .home #mainContainer #contentCol { margin-left:5px; }'; }
if (!prefs['HomeRightColumn'])			{ style = style + ' .home #mainContainer #rightCol { display:none; }'; $('#contentCol').className=$('#contentCol').className.replace(/ hasRightCol/,''); }
if (prefs['HomeChatNames'])				{ style = style+'  .fbx #pagelet_friends_online .uiListHorizontalItem { float:none; } .fbx #pagelet_friends_online .uiTooltip .uiTooltipWrap { background:inherit; display:inline; position:relative; visibility:visible; } .fbx #pagelet_friends_online .uiTooltipText { background-position:left center; background-color:inherit; color:inherit !important; border-right:none; display:inline-block; line-height:18px; padding:0 0 0 10px; margin-left:3px; width:130px; overflow:hidden; } .fbx #pagelet_friends_online .uiProfilePhotoMedium { height:22px; width:22px; } .fbx #pagelet_friends_online .chatOverlay { background-image:none !important; }'; }

if (prefs['HomeStretchMiddleColumn'] && !prefs['HomeRightColumn']) {
	style = style + ' body.home #contentArea { margin-right:0; }';
}

if (prefs['TopBarOpacity']!='1.0' || prefs['TopBarHoverOpacity']!='1.0') {
	if (prefs['TopBarOpacity'] < 0) { style = style + ' #blueBarHolder { display:none; } '; }
	else { style = style + ' #blueBar { opacity:' + prefs['TopBarOpacity'] + '; } #blueBar:hover { opacity:' + prefs['TopBarHoverOpacity'] + '; }'; }
}

// Apply CSS Code
if (style!='') { addStyle(style); }

//
// Extra code for stretching pages
//
/*
if (prefs['HomeStretch'] || prefs['PageStretch']) {
	var lastWidth=0;
	function setHeadNav() {
		try {
			thisWidth = document.body.clientWidth - 196;
			if (thisWidth!=lastWidth) {
				log('Setting new width to ' + thisWidth);
				$('#headNav').style.width=thisWidth + 'px'; // must be done after the other "homestretch" css
				lastWidth=thisWidth;
			}
		} catch(x) { logError('Home Stretch CSS', x); }
	}
	setHeadNav();
	setInterval(setHeadNav, 500);
}
*/

//
// Load thumbnails for entire album
//
function loadFullAlbum() {
	try {
		if (m = $('.summary')[0].textContent.split('|')[0].match(/(\d+)/g)) {
			m = m.sort(function(a,b){return a-b});
			totalImagePages = Math.ceil(m[2]/20);
			if (n=page.match(/page=(\d)/)) { thisPageNumber=n[1]; } else { thisPageNumber=1; }
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('loadingFullAlbum') + '<span></span></span>';
			for (var i=1; i<totalImagePages+1; i++) {
				if (i!=thisPageNumber) {
					appendPhotos('http://www.facebook.com/' + (page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+i) : page+'&page='+i) + '&quickling', $l('fullAlbumLoaded'));
				}
			}
		}
	} catch(x) { logError('Load Full Album', x); }
}


//
// Load tagged thumbnails
//
function loadTaggedPhotos() {
	try {
		if (m = $('.caption')[0].textContent.split('|')[0].replace(',','').match(/(\d+)/g)) {
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('LoadingAllPhotos') + '<span></span></span>';
			totalImagePages = Math.ceil(m[m.length-1]/15);
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			var thisPhoto = 0;
			if (m = page.match(/so=(\d+)/)) { thisPhoto = m[1]; }
			for (var i=0; i<totalImagePages; i++) {
				if (i*15!=thisPhoto) {
					appendPhotos('http://www.facebook.com/' + page.replace(/&so=\d+/,'') + '&so=' + (i*15), '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
				}
			}
		}
	} catch(x) { logError('Load Tagged Photos', x); }
}


//
// Add thumbnails from the specified URL
// (Abilities to show pictures in correct order, with the album page number and link displayed are based heavily on code by MysticMetal)
//
var photoTableRegex = /UIPhotoGrid_Table[^>]+>(.*?)<\\\/table/;
function appendPhotos(url, completeMessage) {
	var pageNum = (m=url.match(/\bso=(\d+)/)) ? m[1]/15+1 : url.match(/\bpage=(\d+)/)[1];
	var albumURL = (url.replace(/&quickling/, '') + '').replace(/&/g,'&amp;');
	var albumPageIdentifier = pageNum + '-' + (new Date().getTime());
	var tbody = $('.UIPhotoGrid_Table')[0]
	tbody.innerHTML = tbody.innerHTML + '<tbody><tr class="ff-album-page"><td colspan="5"><a href="' + albumURL + '"> Album page ' + pageNum + '</a></td></tr></tbody>'+
										'<tbody id="ff-album-page-' + albumPageIdentifier + '"></tbody>';
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				$('#ff-album-page-'+albumPageIdentifier).innerHTML = photoTableRegex.exec(req.responseText)[1].replace(/\\/g,'');
				if (albumPagesLoaded>=totalAlbumPages) { $('#fbf_photo_pagination').innerHTML = completeMessage; }
				if (prefs['AutoBigAlbumPictures']) { clickX("//a[contains(string(),'"+$l('ShowBigPictures')+"')]"); }
			}
		}
	}
}


//
// Add Bookmarks sub-menu
//
if (prefs['Bookmarks'] && !$('#fbf-bookmarks')) {
	try {

		var bmArray = [];
		var bmString = '';

		function getURL() {
			var url = location.href;
			if (m = location.href.match(/^(.*?facebook\.com\/).*#!?\/?(.*)$/)) { url = m[1]+m[2]; }
			return url.replace(/\?$/, '');
		}

		function getBookmark(url) {
			for (var i=0; i<bmArray.length; i++) {
				// The second condition below is only needed until the script's name or namepsace gets changed
				// It handles a modification to getURL()
				if (bmArray[i].indexOf('|'+url+'|')!=-1 || bmArray[i].indexOf('|'+url+'?|')!=-1) { return i; }
			}
			return false;
		}

		function setBookmarkHTML() {
			var bmHTML = '';
			for (var i=0; i<bmArray.length; i++) {
				buffer = bmArray[i].split('|');
				bmHTML = bmHTML + '<div class="linkWrap noCount"><a href="' + buffer[1] + '">' + buffer[0] + '</a></div>';
			}
			$('#fbf-bookmark-list').innerHTML = bmHTML+
				'<div style="height:1px; margin:6px 5px; background:#ddd;"></div>'+
				'<div class="linkWrap noCount"><a id="ff-add-bookmark">' + $l('BookmarkAdd') + '</a></div>'+
				'<div class="linkWrap noCount"><a id="ff-manage-bookmark">' + $l('BookmarksManage') + '</a></div>';
			addBookmarkListeners();
		}

		function reloadBookmarkList() {
			var bmString = getValue('BookmarkList', '');
			if (bmString.match(/^\[.*\]$/)) { bmArray = JSON.parse(bmString).sort(); }
		}

		function updateBookmarkList() {
			bmString = JSON.stringify(bmArray);
			setValue('BookmarkList', bmString);
			prefs['BookmarkList'] = bmString;
			setBookmarkHTML();
		}

		function addBookmarkListeners() {

			on('click', '#ff-add-bookmark', function() {
				var url = getURL();
				if (getBookmark(url)!==false) { window.alert($l('BookmarkExists')); }
				else {
					name = document.title.replace(/^.*[\|\)] /i, '').replace(/ on facebook$/i, '');
					if (name = window.prompt($l('BookmarkNamePrompt', url), name)) {
						bmArray.push(name + '|' + url + '|');
						updateBookmarkList();
					}
				}
			});

			on('click', '#ff-manage-bookmark', function() {
				var removalList = [];
				for (var i=0, url = getURL(); i<bmArray.length; i++) {
					var bookmark = bmArray[i].split('|');
					removalList.push('<label><input type="checkbox" value="' + bmArray[i] + '" ' + (bookmark[1]==url ? 'checked="checked"' : '') + ' />' + bookmark[0] + '</label> - ' + bookmark[1]);
				}
				showDialog(
					'<div style="max-height:500px; overflow:auto; background:white; border:1px solid #ccc; padding:5px 0;">'+
					'<form id="ff-bookmark-removal-list" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">' + removalList.join('<br />') + '</form>'+
					'</div>',
					'<input type="button" id="ff-remove-bookmark-button" value="' + $l('BookmarksRemoveSelected') + '" /> '
				);
				on('click', '#ff-remove-bookmark-button', function() {
					var urls = Array();
					var names = Array();
					var inputs = $('input', '#ff-bookmark-removal-list');
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].checked) {
							urls.push(inputs[i].value.split('|')[1]);
							names.push(inputs[i].value.split('|')[0]);
						}
					}
					if (window.confirm($l('BookmarksConfirmRemoval') + '\n' + names.join('\n'))) {
						for (var i=0; i<urls.length; i++) {
							if ((bookmark = getBookmark(urls[i]))!==false) { bmArray.splice(bookmark,1); }
						}
						updateBookmarkList();
						hidePopup();
					}
				});
			});

		}

		var pageNav = $('#pageNav');
		if (pageNav) {

			addStyle(
				'body #fbf-bookmarks { position:relative; display:list-item; z-index:2000; padding:0 10px;}'+
				'body #fbf-bookmarks.openToggler ul#fbf-bookmark-list, #fbf-bookmarks.openToggler li, body #fbf-bookmarks:hover ul#fbf-bookmark-list, #fbf-bookmarks:hover li  { display:block; }'+
				'body #fbf-bookmarks ul a, #fbf-bookmarks ul a:focus { background:white; }'+
				'body #fbf-bookmarks li { display:block; float:none; }'+
				'body #fbf-bookmark-list { overflow:auto; }'+
				// The following line is based on: #navAccountLink img
				'#fbf-bookmarks img { background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yR/r/J4KWsmBQZvg.png) no-repeat -137px 0; height:4px; left:5px; position:relative; top:-2px; width:7px; }'+
				// The following line is based on: #navAccount ul
				'#fbf-bookmarks ul#fbf-bookmark-list { background:#fff;display:none;border-width:2px 1px 2px;border-style:solid;border-color:#3B5998 #333 #2d4486;margin-right:-1px;margin-top:-1px;min-width:200px;padding:4px 0;position:absolute;right:0;top:100%;width:200px;z-index:1 }'+
				// The following line is based on: #navAccount ul a
				'#fbf-bookmarks ul#fbf-bookmark-list a {color:#222;display:block;font-weight:normal;height:20px;line-height:20px;padding:1px 0 1px 10px;white-space:nowrap;}'+
				// The following line is based on: #navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active
				'#fbf-bookmarks ul#fbf-bookmark-list a:hover {background:#6d84b4;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;color:#fff;padding:0 0 0 10px;}'+
				// The following line is based on: .openToggler #navAccountLink
				'#fbf-bookmarks:hover fbf-bookmark-link {background-color:#fff;color:#333;height:22px;position:relative;z-index:3}'+
				'#fbf-bookmarks ul#fbf-bookmark-list a:after{display:none}'
			);

			var bookmarks = document.createElement('li');
			bookmarks.id = 'fbf-bookmarks';
			//bookmarks.className = 'topNavLink';
			bookmarks.className = 'navItem middleItem';
			bookmarks.innerHTML =	'<a href="#" onclick="return false;" id="fbf-bookmark-link" role="button" rel="toggle">' + $l('Bookmarks') + '</a>'+
									'<ul id="fbf-bookmark-list"></ul>';
			pageNav.insertBefore(bookmarks, pageNav.firstChild);

			on('mouseover', '#fbf-bookmark-link', function() {
				reloadBookmarkList();
				setBookmarkHTML();
				$('#fbf-bookmark-list').style.maxHeight = (window.innerHeight - 65) + 'px';
			});

		}


	} catch(x) { logError('Bookmarks', x); }
}

//
// Add easily accessbile Logout link
//
if (prefs['LogoutLink'] && !$('#ff-logout')) {
	try {
		newLogout = document.createElement('li');
		newLogout.className = 'navItem middleItem';
		newLogout.innerHTML = '<a>' + $('//form[@id="logout_form"]//input[@type="submit"]', null, true).value + '</a>';
		onClick(newLogout, function() { $('#logout_form').submit(); });
		$('#pageNav').appendChild(newLogout);



	} catch(x) { logError('Logout Link', x); }
}


//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0' || prefs['BottomBarHoverOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] < 0) { addStyle(' #pagelet_presence { display:none; }'); }
	else { addStyle(' #pagelet_presence .fbDockWrapper { opacity:' + prefs['BottomBarOpacity'] + '; } #pagelet_presence:hover .fbDockWrapper { opacity:' + prefs['BottomBarHoverOpacity'] + '; }'); }
}

//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	
	// Facebook's hovercards prevent FFixer from listening to mouseover/out's on some profile images; this is part 1 of the fix.
	// A hidden image is added to the page.
	// Mouseover events on the troublesome images will update this image's src and trigger onmouseover on this image.
	// Mouseout events on the troublesome images will trigger onmouseout on this image.
	// FFixer is able to detect the events on this image.
	var ffImage = document.createElement('img');
	ffImage.id='ff-image';
	ffImage.style.display='none';
	document.body.appendChild(ffImage);
	
	picRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|sphotos|sphotos_[a-z]|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	
	
	backgroundRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|sphotos|sphotos_[a-z]|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqnst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	profilePixRegex = /\bfbcdn(.net|-profile-)/;
	
	
	newPicRegex = /(https?:\/\/([^\/]+fbcdn\.net|fbcdn[^\/]+.akamaihd\.net)\/.*\/s\d+x\d+\/(.*\/)?(n[0-9_]+|[0-9_]+n).jpg)/;
	
	//picRegex_old = /(https?:\/\/[^\/]*\bfbcdn\b.*?(\/[anqst]\d[\d_]+|_[anqst])\.jpg)/;
	//picRegex_new = /(https?:\/\/[^\/]*\bfbcdn\b.*\/s\d+x\d+\/(.*\/)?(n[0-9_]+|[0-9_]+n).jpg)/;
	picRegex_old = /(https?:\/\/[^\/]*\bfbcdn.*?(\/[anqst]\d[\d_]+|_[anqst])\.jpg)/;
	picRegex_new = /(https?:\/\/[^\/]*\bfbcdn.*\/s\d+x\d+\/(.*\/)?(n[0-9_]+|[0-9_]+n).jpg)/;
	picRegex_n = /(\/n\d[\d_]+|_n)\.jpg/;
	picRegex_resized = /\/s\d+x\d+\//;
	picRegex_external = /(src|url)=([^&]+)/;
	bigPicSize='960'; // sizes known to work: 320 480 720 960 2048* (* = url works, but haven't seen pics this size yet)
	
	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;
			var newStylePic;
			
			if ((t.tagName == 'I' && (m=picRegex_new.exec(t.style.backgroundImage))) || (t.tagName == 'IMG' && (m=picRegex_new.exec(t.src)))) {
				oldSrc = m[1] + '#1';
				newSrc = oldSrc.replace(picRegex_resized,'/s'+bigPicSize+'x'+bigPicSize+'/');
			}
			else if ((t.tagName == 'I' && (m=picRegex_old.exec(t.style.backgroundImage))) || (t.tagName == 'IMG' && (m=picRegex_old.exec(t.src)))) {
				oldSrc = m[1] + '#2';
				if(/c\d+\.\d+\.\d+\.\d+\/p\d+x\d+\//i.test(oldSrc)) {
					picRegex_p=/c\d+\.\d+\.\d+\.\d+\/p\d+x\d+\//;
					newSrc=oldSrc.replace(picRegex_p,"");
				}

			}
			else if (t.tagName == 'IMG' && picRegex_old.test(t.src)) { oldSrc = t.src + '#3'; }
			else if (t.src && (t.src.indexOf('app_full_proxy.php')!=-1 || t.src.indexOf('safe_image.php')!=-1) && (m=picRegex_external.exec(t.src))) { oldSrc = unescape(m[2]) + '#4'; }
			else if (t.firstChild){
				if(t.firstChild.tagName == 'IMG' && picRegex_new.test(t.firstChild.src)) {
					newStylePic=1;
					oldSrc = t.firstChild.src + '#5';
					newSrc = oldSrc.replace(picRegex_resized,'/s'+bigPicSize+'x'+bigPicSize+'/');
				}
			}
			

			if ((oldSrc && picRegex_n.exec(oldSrc))&&(!newStylePic)) {
				// The pic is an "n" pic, so we might not want to show the popup... need to do more testing first.
				if (t.tagName=='IMG' && t.className.match(/\bff-popup-pic-img\b/)) {
					// The pic is already a popup pic, so don't show the popup.
					return;
				} else if (t.tagName=='IMG' && t.parentNode && t.parentNode.className.match(/\buiScaledImageContainer\b/)) {
					// The pic is scaled down via CSS, so show the popup. eg friend list on timelined profile.
				} else if (t.parentNode && t.parentNode.className.match(/\bimageStage\b/)) {
					// The pic is on being displayed fullsize in an album, so don't show the popup. This must be above the test for server-side resized images.
					return;
				} else if (t.className.match(/\bspotlight\b/)) {
					// The pic is on being displayed in spotlight/photo theater, so don't show the popup. This must be above the test for server-side resized images.
					return;
				} else if ((t.tagName=='IMG' || t.tagName=='I') && picRegex_resized.exec(oldSrc)) {
					// The pic is scaled down via some server-side method, so show the popup. eg URLs with /s320x320/
				} else {
					// Don't show the popup.
					return;
				}
			}
			
			// Facebook's code somtimes triggers the popup incorrectly when tagging (ie, even though the mouse is not actually over the image).
			if (oldSrc && oldSrc.match(/#4$/) && getStyle(t.parentNode.firstChild, 'cursor')=='crosshair') { return; }
			
			// Disable completely when tagging (only on the tagging image itself)
			if (!prefs['PopupWhileTagging'] && t.tagName=='IMG' && getStyle(t, 'cursor')=='crosshair') { return; }
			
			if (oldSrc || newSrc) {
				
				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}

				if (!profilePixRegex.test(newSrc)) { newSrc = newSrc + '-external'; }
				else {
					if (newSrc.indexOf('profile')!=-1) { newSrc = newSrc + '-profile'; }
					else { newSrc = newSrc + '-photo'; }
				}

				if (profilePixRegex.test(newSrc) ? (newSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']) {
					
					clearTimeout(hidePopupPicTimeout);
					t.removeEventListener('mouseout', hidePopupPic, false);
					t.addEventListener('mouseout', hidePopupPic, false);
					
					if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
					else if (t.href) { profileLink = t.href; }
					else if (t.parentNode.href) { profileLink = t.parentNode.href; }
					else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }

					showPopupPicTimeout = setTimeout(function(){
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="FFixer - ' + $l('LoadingPic') + '" class="ff-popup-pic-img" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
						$('#ff-popup-pic-div').style.display = 'block';
						$('#ff-popup-pic-div').className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : prefs['PopupPosition']);
					}, prefs['DelayPopupPics'] ? prefs['DelayPopupPicsTimeout'] : 0);

				}

			}

		} catch(x) { logError('Popup Pic', x); }
	}

	$('#ff-popup-pic-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);

	$('#ff-popup-pic-div').addEventListener('mouseout', function(e) {
		var r = e.relatedTarget;
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			while (r.parentNode && r.id!='ff-popup-pic-div') { r = r.parentNode; }
			if (r.id!='ff-popup-pic-div') { document.getElementById('ff-popup-pic-div').style.display = 'none'; }
		}
	}, false);

	window.addEventListener('mouseover', function(e) {
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
	}, false);

	function hidePopupPic(e) {
		if (prefs['DelayPopupPics']) { clearTimeout(showPopupPicTimeout); }
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			hidePopupPicTimeout = setTimeout(function() { document.getElementById('ff-popup-pic-div').style.display = 'none'; }, 30);
		}
	}

}


//
// Modify search form to search results open in a new tab/window
//
if (prefs['NewTabSearch'] && $('#q')) {
	$('#q').addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && e.ctrlKey) { $('#navSearch').target = '_blank'; }
		else { $('#navSearch').target = ''; }
	}, false);
}

//
// Add useful date functions
//
Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
Date.prototype.toISOString=function(time, punc){var dash=punc?'-':''; var semi=punc?':':''; var space=punc?' ':'T'; return ''+this.getFullYear()+dash+$0(this.getMonth()-0+1)+dash+$0(this.getDate())+(time?space+$0(this.getHours())+semi+$0(this.getMinutes())+semi+$0(this.getSeconds()):'');}
Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()]; }
function date_getFormattedTime(d) {
	return (prefs['FBFTimestamps24'] ? $0(d.getHours()) : (d.getHours()%12==0 ? '12' : d.getHours()%12)) + ':' + $0(d.getMinutes()) + (prefs['FBFTimestamps24'] ? '' : (d.getHours()>11 ? 'pm' : 'am'));
}



//
// Add link for showing full-size album pictures
//
function addBigAlbumPicLinks() {
	
	if (!$('#ff-bap-link')) {
		var a = document.createElement('a');
		a.innerHTML = $l('ShowBigPictures');
		a.id = 'ff-bap-link';
		
		// albums
		if (container = $('//*[contains(@class,"fbxPhotoSetPageHeader")]//*[contains(@class,"uiHeaderSubTitle")]//div[contains(@class,"fsm")]', null, true)) {
			container.appendChild(document.createTextNode(' · '));
			container.appendChild(a);
		}
		
		// photo tabs on new profiles (including timeline profiles)
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode(' · '));
			container.appendChild(a);
		}

		on('click', a, function(e) {
			var tables = $('./following::table[contains(@class,"fbPhotosGrid")]', e.target); // new albums/profiles use this
			if (tables.snapshotLength==0) { tables = $('./following::table[contains(@class,"UIPhotoGrid_Table")]', e.target); } // old albums/profiles use this
			var buf = '';
			for (var t=0; t<tables.snapshotLength; t++) {
				var cells = $('td', tables.snapshotItem(t));
				for (i=0; i<cells.length; i++) {
					var src = (cells[i].getAttribute('data-src',null) || cells[i].innerHTML).match(/(https?:\/\/[^"%&]+\.jpg)/);
					if (src) { src=src[1]; }
					else { continue; }
					var link = $('a', cells[i])[0];
					if (link.className.indexOf('uiVideoLink')!=-1) { continue; } // skip video thumbnails
					var title = ($('a', cells[i])[0].getAttribute('title') || '').replace('"', '&quot;');
					buf+=	'<a href="' + link.href + '">'+
							'<img src="' + src.replace(/\/[as]([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)[as]\.jpg/, '/$1n.jpg') + '" title="' + title + '" />'+
							'</a>';
				}
			}
			hidePopup();
			showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">' + $l('Close') + '</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">' + $l('Close') + '</div></div></div>', false);
			on('click', Array('#FBFBigAlbumClose1','#FBFBigAlbumClose2'), hidePopup);
		});
	}
}

//
// Get a google calendar link
//
function googleCalendarLink(startDate, endDate, useTime, text, details, location) {
	var url = 
		'http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event'+
		'?action=TEMPLATE'+
		'&text=' + escape(text).replace(/"/g, '&quot;')+
		'&dates=' + startDate.toISOString(useTime) + '/' + (endDate||startDate.getNextDay()).toISOString(useTime)+
		(location ? '&location=' + escape(location).replace(/"/g, '&quot;') : '')+
		(details ? '&details=' + escape(details).replace(/"/g, '&quot;') : '')
	return 	''+
		'<a href="' + url.substring(0,2048) + '" title="' + $l('AddToGoogleCalendar') + ' - ' + text.replace(/"/g, '&quot;') + '">' + $l('AddToGoogleCalendar') + '</a>';
}
function googleCalendarBdayLink(bday, name) {
	var now = new Date();
	var text = $l('Birthday',prefs['CalendarFullName'] ? name : name.split(' ')[0]);
	var details = $l('Birthday',name) + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '');
	bday.setYear(now.getFullYear()-0+(bday.past()?1:0));
	return googleCalendarLink(bday, null, false, text, details, null);
}


//
// Process the page at regular intervals
//
processing = setInterval(processPage, prefs['ProcessInterval']);
processPage();

function processPage() {

	//
	// Figure out what page we're looking at
	//
	loc = window.location.href.toLowerCase();
	page = loc.split('facebook.com/')[1];
	if (page.indexOf('#')!=-1) {
		buf = page.split('#');
		page = buf[1]!='' ? buf[1] : buf[0];
	}
	page = page.replace(/^!?\//,'');
	//if (page!=lastPage) { log('Page => "' + page + '"'); }// DEBUG ONLY

	if (page != lastPage && prefs['PopupAutoClose'] && $('#ff-popup-pic-div')) {
		$('#ff-popup-pic-div').style.display = 'none';
		lastPage = page;
	}
	
	// Facebook's hovercards prevent FFixer from listening to mouseover/out's on some profile images; this is part 2 of the fix.
	// See part 1 for details on why it works.
	if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
		var profilePics = $('.//img[contains(@src,"profile")][contains(concat(" ",normalize-space(@class)," ")," img ")][not(contains(@class,"ff-handled-mouseover"))]');
		for (var i=0; i<profilePics.snapshotLength; i++) {
			profilePics.snapshotItem(i).className = profilePics.snapshotItem(i).className + ' ff-handled-mouseover';
			profilePics.snapshotItem(i).setAttribute('onmouseover',"var i=document.getElementById('ff-image'); i.src=this.src; var e=document.createEvent('MouseEvents'); e.initEvent('mouseover', true, false); i.dispatchEvent(e); ");
			profilePics.snapshotItem(i).setAttribute('onmouseout', "var i=document.getElementById('ff-image'); i.src=this.src; var e=document.createEvent('MouseEvents'); e.initEvent('mouseout',  true, false); i.dispatchEvent(e); ");
		}
	}
	
	//
	// Show date/time of comments and feed items
	//
	if (prefs['FBFTimestamps']) {
		try {
			var fTimestamp = new Date();
			var recentTimeFormat = prefs['FacebookTimestamps'] ? '%F (%T)' : '%T';
			var distantTimeFormat = '%I at %T';
			var distantTimeFormat = '%F';
			var timestamps = $('//abbr[@data-utime][not(contains(@class,"ffixer-handled"))]');
			for (var i=0; i<timestamps.snapshotLength; i++) {
				var t = timestamps.snapshotItem(i);
				t.className = t.className + ' ffixer-handled';
				fTimestamp.setTime(t.getAttribute('data-utime')*1000);
				var time = t.className.indexOf('timestamp')!=-1 ? recentTimeFormat : distantTimeFormat;
				if (time.indexOf('%T')!=-1) { time = time.replace('%T', date_getFormattedTime(fTimestamp)); }
				if (time.indexOf('%I')!=-1) { time = time.replace('%I', fTimestamp.toISOString(false, true)); }
				if (time.indexOf('%F')==-1) { t.style.display='none'; }
				time = time.replace('%F', '');
				if (time!='') {
					var fbfTimestamp = document.createElement('span');
					fbfTimestamp.innerHTML = time;
					t.parentNode.insertBefore(fbfTimestamp, t.nextSibling);
				}
			}
		} catch(x) { logError('Timestamps', x); }
	}


	//
	// Customize Home Page
	//
	if (isHomePage()) {
		try {

			homeStream = $('#home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
			
				homeStream.className = homeStream.className + (' fbf');
			
			}

			// Make today's events bold
			try {
				var eventDays = $('//div[contains(@class,"UIUpcoming_Item")][not(contains(@class,"fbf-handled"))]');
				for (var i=0; i<eventDays.snapshotLength; i++) {
					eventDays.snapshotItem(i).className = eventDays.snapshotItem(i).className + ' fbf-handled';
					if (eventDays.snapshotItem(i).getElementsByTagName('span')[0].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays.snapshotItem(i).style.fontWeight = 'bold';
					}
				}
			} catch(x) { logError('Bold Events', x); }
			
			// Default to the "Recent Stories" feed instead of "Highlighted Stories"
			if (prefs['HomeMostRecent'] && page.indexOf('sk=')==-1 && $('//li/a[contains(@href,"sk=h_chr")]', null, true)) {
				location.replace('/?sk=h_chr');
			}

			// Modify the live feed
			try {
				if (prefs['CustomFeedModification'].length>0 || prefs['HideApplicationStories'] || prefs['HideAskFriendStories'] || prefs['HideEventStories'] || prefs['HideFriendStories'] || prefs['HideGroupStories'] || prefs['HideLikeStories'] || prefs['HideLinkStories'] || prefs['HideNoteStories'] || prefs['HidePhotoStories'] || prefs['HidePlaceStories'] || prefs['HideProfilePicStories'] || prefs['HideRelationshipStories'] || prefs['HideStatusStories'] || prefs['HideVideoStories'] || prefs['HideWallStories']) {
					var stream = $('#pagelet_home_stream');
					var whitelist = JSON.parse(prefs['ApplicationWhitelist']);
					whitelistRegex = whitelist.length==0 ? null : new RegExp('/apps/application\\.php\\?id=(' + whitelist.join('|') + ')\\b');
					if (stream) {
						var blockedIDs = Array();
						var blockedStoryXPath = Array();
						var highlightedStoryXPath = Array();
						
						if (prefs['HideApplicationStories'])	{ blockedIDs = blockedIDs.concat(Array('237','313')); }
						if (prefs['HideAskFriendStories'])		{ blockedIDs = blockedIDs.concat(Array('280', '286', '338')); }
						if (prefs['HideEventStories'])			{ blockedIDs = blockedIDs.concat(Array('1','38','178')); }
						if (prefs['HideFriendStories']) 		{ blockedIDs = blockedIDs.concat(Array('8','12')); }
						if (prefs['HideGroupStories'])			{ blockedIDs = blockedIDs.concat(Array('4','21', '308', '316')); }
						if (prefs['HideLikeStories'])			{ blockedIDs = blockedIDs.concat(Array('161','283')); }
						if (prefs['HideLinkStories'])			{ blockedIDs = blockedIDs.concat(Array('5','263')); }
						if (prefs['HideNoteStories'])			{ blockedIDs = blockedIDs.concat(Array('66')); }
						if (prefs['HidePhotoStories'])			{ blockedIDs = blockedIDs.concat(Array('6','7','65','247')); }
						if (prefs['HidePlaceStories'])			{ blockedIDs = blockedIDs.concat(Array('278', '285')); }
						if (prefs['HideProfilePicStories'])		{ blockedIDs = blockedIDs.concat(Array('60', '259')); }
						if (prefs['HideRelationshipStories'])	{ blockedIDs = blockedIDs.concat(Array('10')); }
						if (prefs['HideStatusStories'])			{ blockedIDs = blockedIDs.concat(Array('11','46')); }
						if (prefs['HideVideoStories'])			{ blockedIDs = blockedIDs.concat(Array('3','128','130')); }
						if (prefs['HideWallStories'])			{ blockedIDs = blockedIDs.concat(Array('56','273')); }
						if (blockedIDs.length>0) {
							blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + blockedIDs.join(",') or contains(@data-ft,'\"sty\":") + ",')");
							blockedStoryXPath.push("contains(@data-ft,'\"s_obj\":" + blockedIDs.join(",') or contains(@data-ft,'\"s_obj\":") + ",')");
						} 
						
						if (prefs['CustomFeedModification'].length>0) {
							try {
								var custom = prefs['CustomFeedModification'].split(/\r?\n\r?/);
								for (var i=0; i<custom.length; i++) {
									if (m = custom[i].match(/^[^#]+/)) {
										var rule = m[0].replace(/^\s*|\s*$/g,'');
										if (m = rule.match(/^-\s*(\d+)$/)) { blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^-\s*(.+)$/)) { blockedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else if (m = rule.match(/^\+\s*(\d+)$/)) { highlightedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^\+\s*(.+)$/)) { highlightedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else { log('Ignoring ' + rule); }
									}
								}
							} catch(x) { logError('Custom Feed Modification', x); }
						}
						
						if (blockedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and (" + blockedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) {
								if (whitelistRegex===null || !whitelistRegex.test(elms.snapshotItem(i).innerHTML)) {
									elms.snapshotItem(i).style.border='1px solid red';
								}
							}
						}
						
						if (highlightedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'ffixer-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' ffixer-highlighted-story'; }
						}
					}
				}
			} catch(x) { logError('Live Feed', x); }

		} catch(x0) { logError('Home', x0); }
	}
	
	//
	// Extra code for stretching home page's middle column
	//
	if (prefs['HomeStretchMiddleColumn']) {
		try {
			var contentArea = $('.//body[contains(@class,"home")]//*[@id="contentArea"]', null, true);
			var contentAreaHeight = $('.//body[contains(@class,"home")]//*[@id="contentAreaHeight"]', null, true);
			if (contentArea) {
				if (!contentAreaHeight) {
					// This element is used to fake height on #contentArea so the footer stays at the bottom of the page.
					// Some pages may also have a #headerArea whose height and padding need to be taken into account.
					var elm = document.createElement('div');
					elm.id = 'contentAreaHeight';
					elm.style.minHeight = window.innerHeight + 'px';
					contentArea.parentNode.insertBefore(elm, contentArea.nextSibling);
					contentAreaHeight = $('.//body[contains(@class,"home")]//*[@id="contentAreaHeight"]', null, true);
				}
				contentAreaHeight.style.height = getStyle(contentArea,'height');
				var headerArea = $('.//body[contains(@class,"home")]//*[@id="headerArea"][not(contains(@class,"hidden_elem"))]', null, true);
				if (headerArea) { contentArea.style.top = ((getStyle(headerArea,'height').replace('px','')-0) + (getStyle(headerArea,'padding-bottom').replace('px','')-0) + (getStyle(headerArea,'padding-top').replace('px','')-0) + 5) + 'px'; }
				else { contentArea.style.top='5px'; }
			} else if (contentAreaHeight) { contentAreaHeight.parentNode.removeChild(contentAreaHeight); }
		} catch(x) { logError('Middle Column Stretch', x); }
	}

	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}
	
	//
	// Disable Theater
	//
	if (prefs['DisableTheater']) {
		theaterPhotos = document.evaluate("//a[contains(@rel, 'theater')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
		for (var i = 0; i < theaterPhotos .snapshotLength ; ++i ) { theaterPhotos.snapshotItem(i).setAttribute("rel", " "); }
	}

	//
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		try {
			if (page.indexOf('/photos')!=-1 || page.indexOf('album.php')!=-1 || page.indexOf('photo_search.php')!=-1 || page.indexOf('media/set/')!=-1 || page.indexOf('sk=photos')!=-1 || page.indexOf('v=photos')!=-1) {
				addBigAlbumPicLinks();
			}
		} catch(x) { logError('Big Album Pictures', x); }
	}

	//
	// Add calendar features to Birthdays pages
	//
	if (prefs['GoogleCalendar'] && (page.indexOf('events/birthdays')==0 || page.indexOf('?sk=bd')==0)) {
		try {
			var now = new Date();
			var elms = $('//*[@id="pagelet_events"]//div/div[contains(@class,"fcg")][not(contains(@class,"ff-bday-handled"))][not(.//*)]');
			for (i=0; i<elms.snapshotLength; i++) {
				e = elms.snapshotItem(i);
				e.className = e.className + ' ff-bday-handled';
				t = e.innerHTML;
				if (t.indexOf(' · ')!=-1) {
					buf=t.split(/ · /);
					bday = $d(buf[0]);
					bday.setYear(now.getFullYear() - buf[1].replace(/\D/g,'') + (bday.past() ? 1 : 0));
				}
				else { bday = $d(t); }
				if (bday) {
					var name = e.parentNode.previousSibling.firstChild.textContent;
					e.innerHTML = e.innerHTML + ' · ' + googleCalendarBdayLink(bday, name);
				}
			}
			//event = googleCalendarLink(startDate, endDate, true, title, 'Hosted by '+host, where);
		} catch(x) { logError('Birthdays', x); }
	}

	//
	// Add calendar features to Event pages
	//
	if (prefs['GoogleCalendar'] && page.match(/^events\/\d/)) {
		try {
			var now = new Date();
			var root = $('//div[@id="pagelet_event_details"]//li[contains(@class,"uiListVerticalItemBorder")]', null, true);
			if (root.className.indexOf('ff-event-handled')==-1) {
				root.className = root.className + ' ff-event-handled';
				var elms = $('.//*[contains(@class,"fcb") or contains(@class,"lfloat")][not(.//*)]', root);
				if (elms.snapshotLength==2) {
					date1 = elms.snapshotItem(0).textContent;
					date2 = elms.snapshotItem(1).textContent;
					forceNextDay = false;
					pos = elms.snapshotItem(1);
					sep = '<br />';
				} else if (elms.snapshotLength==3) {
					date1 = elms.snapshotItem(0).textContent + ' ' + elms.snapshotItem(1).textContent;
					date2 = elms.snapshotItem(0).textContent + ' ' + elms.snapshotItem(2).textContent;
					forceNextDay = true;
					pos = elms.snapshotItem(2);
					sep = ' ';
				}
				d1 = $d(date1);
				d2 = $d(date2, forceNextDay);
				
				var name = $('//div[contains(@class,"fbEventHeadline")]', null, true).textContent;
				
				var where = $('//i[@title="Where"]', null, true);
				where = where ? where.parentNode.parentNode.nextSibling.textContent : null;
				
				var description = $('//i[@title="Description"]', null, true);
				if (description) {
					description = description.parentNode.parentNode.nextSibling.cloneNode(true);
					elms = $('.//*[@class="text_exposed_hide"]', description);
					for (i=0; i<elms.snapshotLength; i++) { log(elms.snapshotLength); elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i)); }
					description = description.textContent;
				} else { description = null; }
				
				var link = document.createElement('div');
				link.innerHTML = googleCalendarLink(d1, d2, true, name, description, where);
				pos.parentNode.insertBefore(link, pos.nextSibling);
			}
		} catch(x) { logError('Event', x); }
	}

	//
	// Show birthday info and Google Calendar link
	//
	if ((prefs['Age'] || prefs['Sign'] || prefs['GoogleCalendar']) && (page.match(/^profile.php/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) || (page.match(/\/info$/)))) {
		try {
			var timeline = page.match(/\/info$/);
			var bdayNode;
			if (timeline) { bdayNode = $("//div[@id='pagelet_basic']//td[contains(@class,'data')][not(contains(@class,'ff-bday-handled'))]",null,true); }
			else { bdayNode = $("//div[@id='pagelet_byline']//span[last()]/span[not(contains(@class,'ff-bday-handled'))]",null,true); }
			if (bdayNode != null) {
				bdayNode.className = bdayNode.className + ' ff-bday-handled';
				var info = [];
				var now = new Date();
				var bday = $d(bdayNode.textContent);
				if (bday!=null)  {
					if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info.push($l('yearsOld',bday.getAge())); } }
					if (prefs['Sign']) { info.push(bday.getSign()); }
					if (prefs['GoogleCalendar']) {
						var name = timeline ? $('//div[contains(@class,"name")]//a[contains(@class,"nameButton")]', null, true).textContent : $('.profileName')[0].innerHTML;
						info.push(googleCalendarBdayLink(bday, name));
					}
					if (info.length>0) { bdayNode.innerHTML = bdayNode.innerHTML + (timeline ? '<br />' : ' ') + '(' + info.join(', ') + ') '; }
				}
			}
		} catch(x) { logError('Age/Sign/Calendar', x); }
	}

	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^photo.php\?.*v=/)) {
		try {
			
			function addVideoLink(script, pos, text, regex) {
				if (m=regex.exec(script)) {
					var link = document.createElement('a');
					link.href = m[1].replace(/\\u00253A/g,":").replace(/\\u00252F/g,'/').replace(/\\u00253F/g,'?').replace(/\\u00253D/g,'=').replace(/\\u002526/g,'&');
					link.innerHTML = text;
					pos.insertBefore(link, pos.firstChild.nextSibling);
				}
			}
			
			var regex_low = /"video_src", "(.*?)"/;
			var regex_high = /"highqual_src", "(.*?)"/;
			var pos = $("#fbPhotoPageActions");
			var scripts = $('//script[contains(text(),"video_src")][not(@data-ff-video-handled)]');
			for (var i=0; i<scripts.snapshotLength; i++) {
				s = scripts.snapshotItem(i);
				s.setAttribute('data-ff-video-handled','handled');
				addVideoLink(s.innerHTML, pos, $l('DownloadVideoLow'), regex_low);
				addVideoLink(s.innerHTML, pos, $l('DownloadVideoHigh'), regex_high);
			}
		} catch(x) { logError('Download Video', x); }
	}

	//
	// Change page title
	//
	try {
		if (prefs['HideFacebookCountInTitle']) { document.title = document.title.replace(/Facebook \(\d+\)/, 'Facebook'); }
		if (prefs['PageTitle']) { document.title = document.title.replace(/Facebook.*?\| /, ''); }
		if (prefs['FriendRequestCountInTitle'] || prefs['NotificationCountInTitle'] || prefs['InboxCountInTitle']) {
			var counts = Array();
			if (prefs['FriendRequestCountInTitle']) {
				var count = $('//a[@name="requests"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'f'); }
			}
			if (prefs['InboxCountInTitle']) {
				var count = $('//a[@name="messages"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'm'); }
			}
			if (prefs['NotificationCountInTitle']) {
				var count = $('//a[@name="notifications"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'n'); }
			}
			if (counts.length>0) {
				if (document.title.charAt(0) == '(') { document.title = document.title.replace(/^\(.*?\)/, '(' + counts.join(' ') + ')'); }
				else { document.title = '(' + counts.join(' ') + ') ' + document.title; }
			} else {
				document.title = document.title.replace(/^\(.*?\)/, '');
			}
		}
	} catch(x) { logError('Page Title', x); }

	//
	// Reload Error Page
	//
	if (prefs['ErrorPageReload'] && $('#content') && $('#content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('#try_again_button')) {
		tryAgainButton=$('#try_again_button');
		if (tryAgainButton.className.indexOf('autoreload')==-1) {
			tryAgainButton.className = tryAgainButton.className + ' autoreload';
			tryAgainButton.value = $l('ReloadErrorPage');
			setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
		}
	}

	//
	// Add Protocol Links
	//
	if (prefs['ProtocolLinks'] && (page.match(/profile\.php\?id=.*&v=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) && page.indexOf('v=info')!=-1) && $('#info_section_info_contact') && $('#info_section_info_contact').className.indexOf('fbfhandled')==-1) {
		try {
			$('#info_section_info_contact').className = $('#info_section_info_contact').className + ' ' + 'fbfhandled';
			var dds = $('#info_section_info_contact').getElementsByTagName('dd');
			var dts = $('#info_section_info_contact').getElementsByTagName('dt');
			for (var i=0; i<dds.length; i++) {
				if (dts[i].innerHTML == 'Skype:') { dds[i].innerHTML = '<a href="skype:' + dds[i].innerHTML + '?call" title="' + $l('ProtocolSkype', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Windows Live:') { dds[i].innerHTML = '<a href="msnim:chat?contact=' + dds[i].innerHTML + '" title="' + $l('ProtocolMSN', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Yahoo:') { dds[i].innerHTML = '<a href="ymsgr:sendIM?' + dds[i].innerHTML + '" title="' + $l('ProtocolYahoo', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Google Talk:') { dds[i].innerHTML = '<a href="xmpp:' + dds[i].innerHTML + '" title="' + $l('ProtocolGoogle', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
			}
		} catch(x) { logError('Protocol Links', x); }
	}

	//
	// Load thumbnails for entire album
	//
	if (page.match(/^album.php?/)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadFullAlbum']) {
					loadFullAlbum();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('all') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadFullAlbum(); }, 0);
					});
				}
			}
		} catch(x) { logError('Album Thumbnails', x); }
	}

	//
	// Load thumbnails for tagged photos
	//
	if (page.match(/^profile.php?.*v=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadTaggedPhotos']) {
					loadTaggedPhotos();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('All') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadTaggedPhotos(); }, 0);
					});
				}
			}
		} catch(x) { logError('Tagged Photos Thumbnails', x); }
	}

}


}) ();

// There are only 10 types of people in the world - those who understand ternary, those who don't, and those who mistake it for binary :)

