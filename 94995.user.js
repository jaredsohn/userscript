// ==UserScript==
// @name           Facebook Cleaner URLS
// @namespace      http://userscripts.org/scripts/show/94995
// @version        1.0.3
// @description    Cleans Facebook URLs that don't actually take you to a new page only when it's disirable to do so.
// @include        http*://*.facebook.com/*
// @history        1.0.3 Cleaned up some unused code
// @history        1.0.2 Updated isTopWindow() now accepts l as a location param.
// @history        1.0.1 Fixed a console error relating to top.location == location, seems to be a bug in firefox
// @history        1.0.0 Initial release
// @credit         Jordon Kalilich, Adapted from his URL cleaner script
// ==/UserScript==

// to enable when browsing everywhere on facebook, change the following value to true:
var bOverRide = false;

// Returns true if data is in some way "not empty"
function hasData(data)
{
	var bRet = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bRet = true;
	}
	return bRet;
}

// Possible bug in firefox, using error trapping to fix this oddity with top.location == location
function isTopWindow(l){
	try{
		if(hasData(l)){
			if(top.location == l){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch(e){
		return false;
	}
}

// if possible return the page title other wise return "undefined"
function checkTitle(){
	var bRet = null;
	if(hasData(document.title) == true) {
		bRet = document.title;
	} else if(hasData(window.title) == true) {
		bRet = window.title;
	} else  {
		bRet = "undefined";
	}
	return bRet;
}

function ignorePage(){
	var bReturn = false;
	// Main from top to bottom on the left @ www.facebook.com
	var messagingHeader =  document.getElementsByClassName('messaging_invitation_header')[0];// Messages inbox, includes updates and sent messages also
	var eventPagelet = document.getElementById('pagelet_events');	// Events, handles all submenu events also
	var friendPagelet = document.getElementById('pagelet_friends'); // Friends, also seems to be a parent on apps/games pages
	var groupPagelet = document.getElementById('pagelet_groups'); // All Groups
	var appsDash = document.getElementsByClassName('apps_dashboard')[0];// Apps Requests (left side menu)
	var notesDash = document.getElementsByClassName('noteDashboard')[0]; // All Notes
	var linksReg = /posted\.php.*#.*posted\.php/i; // Link's regex
	
	// Others	
	var photoReg = /photo\.php.*#.*photo\.php/i; // Photo's
	var friendsHeader = document.getElementById('editFriendsHeader');
	
	// Messages inbox(includes updates and sent messages)
	if(messagingHeader)
	{
		bReturn = true;
		//GM_log('Found: Messages');
	}
	// Events
	if(eventPagelet)
	{
		bReturn = true;
		//GM_log('Found: Events');
	}		
	// Friends
	if(friendPagelet || friendsHeader)
	{
		bReturn = true;
		//GM_log('Found: Friends');
	}
	// Groups
	if(groupPagelet)
	{
		bReturn = true;
		//GM_log('Found: Groups');
	}	
	// Photo's
	var photoTitle = checkTitle();
	if(photoReg.test(location.href) || photoTitle === 'Photos')
	{
		bReturn = true;
		//GM_log('Found: Photos');
	}		
	// Apps Requests (left side menu)
	if(appsDash)
	{
		bReturn = true;
		//GM_log('Found: Apps');
	}
	// Notes
	if(notesDash)
	{
		bReturn = true;
		//GM_log('Found: Notes');
	}
	// Links
	if(linksReg.test(location.href))
	{
		bReturn = true;
		//GM_log('Found: Links');
	}
	return bReturn;
}

//-- see original source @ http://userscripts.org/scripts/show/29910
function checkURL(event) {
	/**
	+ Currently i'm aware of and ignoring these pages during the url rewriting:
	+ - Photos, Friends, Events, Groups, Messages(all), Links, Notes(all),Apps/Games 
	+ Basically any page with previous | next ajax buttons needs to be ignored
	+ Anyone that finds other url's i'm missing in the list above or regex tips please contact me :)
	**/
	//GM_log('checkURL');
	if(window.location.href.indexOf('?ref=') >= 0){
		window.location.replace(window.location.href.substring(0, window.location.href.indexOf('?ref=')));
		//GM_log('Removing: ?href=');
	}
	var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!(\/.*)/i;
	var reg2 = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#(\/.+)/i;
	if(reg.test(location.href) || reg2.test(location.href)){
		if(!ignorePage() || bOverRide){
			//GM_log('cleaning the url');
			document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
			location.replace(location.href.replace(reg, '$1$3'));
		}
	}
}

// checkURL
if(isTopWindow(location) != false && /\.facebook\.com$/i.test(location.hostname)) {
	document.addEventListener('DOMNodeInserted', checkURL, true);
}