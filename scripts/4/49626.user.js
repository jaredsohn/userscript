// ==UserScript==
// @name           Friendly B.net Re-direct
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/*
// @include        http://*.bungie.net
// ==/UserScript==

// Restricted areas. Special Security Settings Required.
if (document.body.textContent.match(/Your current security settings do not grant you permission to access this area\./)) {
    history.back(0)
}

// Restricted areas. Special Security Settings Required.
if (document.body.textContent.match(/No Admin Tools are available to you\./)) {
    history.back(0)
}

// unable to find specified group.
if (document.body.textContent.match(/Group Not Found\:/)) {
    window.parent.location.href = 'http://www.bungie.net/Community/GroupSearch.aspx';
}

// unable to find specified group.
if (document.body.textContent.match(/Group\:/)) {
    window.parent.location.href = 'http://www.bungie.net/Community/GroupSearch.aspx';
}

// unable to find specified page.
if (document.body.textContent.match(/HTTP Client Error\;/)) {
    history.back(0)
}

// forum down
if (document.body.textContent.match(/Forums\:/)) {
    window.location.href = 'http://www.bungie.net/Forums/default.aspx';
}

// unable to loacte specified halo 3 file
if (document.body.textContent.match(/Unable to locate specified Halo 3 file\./)) {
    window.location.href = 'http://www.bungie.net/Online/Default.aspx';
}

// unable to find halo 2 game data
if (document.body.textContent.match(/we don't have a record of this game or we have temporarily turned off game statistics\./)) {
	window.location.href = 'http://www.bungie.net/Account/Profile.aspx';
}

// unable to find halo 3 game data
if (document.body.textContent.match(/We're Sorry\./)) {
    window.parent.location.href = 'http://www.bungie.net/Account/Profile.aspx';
}