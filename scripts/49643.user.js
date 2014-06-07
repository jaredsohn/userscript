// ==UserScript==
// @name           Friendly B.net Re-direct with alerts
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/*
// @include        http://*.bungie.net
// ==/UserScript==

// Restricted areas. Special Security Settings Required.
if (document.body.textContent.match(/Your current security settings do not grant you permission to access this area\./)) {
    history.back(0)
	window.setTimeout(function() { alert('Security clearance invalid. You have been sent back to your previous page.') }, 2);
}

// Restricted areas. Special Security Settings Required.
if (document.body.textContent.match(/No Admin Tools are available to you\./)) {
    history.back(0)
	window.setTimeout(function() { alert('DO NOT ATTEMPT TO ACCESS THIS PAGE AGAIN!') }, 2);
}

// unable to find specified group.
if (document.body.textContent.match(/Group Not Found\:/)) {
    window.parent.location.href = 'http://www.bungie.net/Community/GroupSearch.aspx';
	window.setTimeout(function() { alert('The Group you were looking for could not be found.') }, 2);
}

// unable to find specified group.
if (document.body.textContent.match(/Group\:/)) {
    window.parent.location.href = 'http://www.bungie.net/Community/GroupSearch.aspx';
	window.setTimeout(function() { alert('The Group you were looking for could not be found.') }, 2);
}

// unable to find specified page.
if (document.body.textContent.match(/HTTP Client Error\;/)) {
	window.setTimeout(function() { alert ('An error has occured, you have been sent back 1 history state.') }, 2);
    history.back(0)
	
}

// forum down
if (document.body.textContent.match(/Forums\:/)) {
    history.back(0)
	window.setTimeout(function() { alert ('An error has occured, you have been sent back 1 history state.') }, 2);
}

// unable to loacte specified halo 3 file
if (document.body.textContent.match(/Unable to locate specified Halo 3 file\./)) {
    window.location.href = 'http://www.bungie.net/Online/Default.aspx';
    window.setTimeout(function() { alert ('The file you were looking for could not be found.') }, 2);
}

// unable to find halo 2 game data
if (document.body.textContent.match(/we don't have a record of this game or we have temporarily turned off game statistics\./)) {
	window.location.href = 'http://www.bungie.net/Account/Profile.aspx';
    window.setTimeout(function() { alert ('The game data you were looking for could not be found.') }, 2);
}

// unable to find halo 3 game data
if (document.body.textContent.match(/We're Sorry\./)) {
    window.parent.location.href = 'http://www.bungie.net/Account/Profile.aspx';
    window.setTimeout(function() { alert ('The game data you were looking for could not be found.') }, 2);
}

// page down - needs work
//if (document.body.textContent.match(/We apologize for the inconvenience\,/)) {
//  window.location.href = 'http://www.bungie.net';
//}