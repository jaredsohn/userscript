// http://XIXs.com/GreaseMonkey/LJ_Scrobbler.user.js
// version 2005-07-31
// (K) Kriss Daniels ( http://XIXs.com ) All Rites Reversed
//
// -><-
//
// This is a Grease Monkey user script.
//
// http://greasemonkey.mozdev.org/
//
// If you are reading this in firefox and have grease monkey installed
// then you should now be able to select "Install User Script..." from the
// tools menu.
//
// -><-
//
// This script changes the value of the Music: field on
// http://www.livejournal.com/update.bml to your last played track from
// audioscrobblers provided XML feed
//
// eg my feed -> http://ws.audioscrobbler.com/rss/recent.php?user=XIXs
//
// It trys to use your LJ name as your scrobbler name by default, if you
// are not so lucky as to have the same username on both sites then there
// is a menu item added under Tools/User_Script_Commands/ to set it. This
// menu item is only available when you are on the
// http://www.livejournal.com/update.bml page with this script installed.
//
// If you don't get anything, check that you do have a recent list of tracks
// in your feed from scrobbler before complaining.
//
//
// Kriss
//
//
// ==UserScript==
// @name          LJ Scrobbler
// @description   Add your last played track from www.AudioScrobbler.com into LiveJournal.com update.bml page
// @include       http://*.livejournal.com/update.bml*
// ==/UserScript==



// This seems to be the way to have editable options?
// although you do need to go to one of the update pages to get the menu.

GM_registerMenuCommand( "Set audioscrobbler username",
	function()
	{
		GM_setValue('audioscrobbler_username', prompt("Please enter your audioscrobbler user name.\n* means try to use your LJ username.",GM_getValue('audioscrobbler_username', '*')));
	}
);



var audioscrobbler_username;


audioscrobbler_username=GM_getValue('audioscrobbler_username', '*');


// try and use the logged in LJ username if we can ?
// obviously this only works if you are lucky enough to have the same login for audioscrobbler as LJ

// parse the username from => "You are currently logged in as xixs" at the top of the page

if(audioscrobbler_username=='*')
{

	var lj_username;
	var remotelogin_content = document.getElementById('remotelogin_content');
	if (remotelogin_content) {
	
		lj_username=remotelogin_content.getElementsByTagName('b')[0]

		if(lj_username)
		{
			audioscrobbler_username=lj_username.textContent;
		}
	}

}


// find the field we want to change

var allLinks, thisLink;

allLinks = document.evaluate(
    '//input[@name]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

window.prop_current_music=null;

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink

	if( thisLink.name == "prop_current_music" )
	{
		window.prop_current_music=thisLink;
		
	}
}

// if we found something perform a request to get info to fill it with

if(window.prop_current_music){
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.audioscrobbler.com/rss/recent.php?user=' + audioscrobbler_username,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        var entries = dom.getElementsByTagName('item');
        var title;

	if(entries.length) // we found something
	{
		title = entries[0].getElementsByTagName('title')[0].textContent;

		window.prop_current_music.value=title;
	}

// make a select from list button as well?
//
//	for (var i = 0; i < entries.length; i++)
//	{
//		title = entries[i].getElementsByTagName('title')[0].textContent;
// 	}

    }
});
}

