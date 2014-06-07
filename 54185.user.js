// ==UserScript==
// @name           Facebook Extra Links
// @namespace      http://userscripts.org/users/23652
// @description    Adds extra links at the top of facebook; customizable
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @copyright      JoeSimmons
// @version        1.0.26
// @require        https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL    http://userscripts.org/scripts/source/54185.user.js
// @updateURL      http://userscripts.org/scripts/source/54185.meta.js
// ==/UserScript==

JSL.runAt('interactive', function () {
    'use strict';

    var menubar, navSearch, rTrim, u;
    var links = {



    // LINKS SECTION
    // FORMAT: 'LINK TEXT' : 'LINK URL',
    /////////////////////////////////////////////////////////////////////////////
    'FarmVille' : 'http://apps.facebook.com/onthefarm/',
    'Requests' : 'http://www.facebook.com/reqs.php',
    'Notifications' : 'http://www.facebook.com/notifications.php',
    /////////////////////////////////////////////////////////////////////////////



    '':'' // don't change
    };






        navSearch = JSL('#blueBar');
        rTrim = /^\s*(\S*(?:\s+\S+)*)\s*$/; // trim regexp by douglas crockford
        menubar = JSL.create('div', {id: 'extra_links_holder', style: 'float: left; padding: 11px 0 0 4px;'});

    if (navSearch.exists) {
        for (u in links) {
            u = u.replace(rTrim, '$1'); // trim text
            if (u !== '') {
                menubar.appendChild(
                    JSL.create('a', {href: links[u], style: 'padding: 6px 8px; color: #FFFFFF; font-family: verdana, tahoma, arial, sans-serif; font-size: 11pt;', target:'_parent'}, [
                        JSL.create('text', u)
                    ])
                );
            }
        }
        navSearch.prepend(menubar);
    }

});