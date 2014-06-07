// StudiVZ: Numerierte Listen
// Version 1.0.1
// 2007-06-05
// Copyright (c) 2007 Jochen Lutz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "StudiVZ: Numerierte Listen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           StudiVZ: Numerierte Listen
// @namespace      http://www.jlu.name/programmieren/greasemonkey
// @description    Ändert die Liste der Gruppen und Kurse nach Doppelklick auf die jeweilige Überschrift  in eine numerierte Liste. Rückgängig ebenfalls per Doppelklick.
// @include        http://www.studivz.net/profile.php*
// ==/UserScript==

// Style
addGlobalStyle('ol.ul_red { margin-left: 15px; margin-top: 6px; padding-left: 0px; padding-top: 0px; color: #e06060; }');
addGlobalStyle('ol.ul_red li { padding: 5px 0px; }');
//addGlobalStyle('#profilecourses.ul_red li { padding: 2px 0px; }');
addGlobalStyle('ol.ul_red li span  { color: black; }');
// Kurse
var courses_h2 = document.getElementById('profile_courses_list').getElementsByTagName('h2')[0];

if ( courses_h2 ) {
    courses_h2.addEventListener('dblclick', function() {
        var oldlist, newlist;
        var groupsdiv = document.getElementById('profile_courses_list');

        oldlist = groupsdiv.getElementsByTagName('ul')[0];
        if( oldlist ) {
            newlist = document.createElement('ol');
        }
        else {
            oldlist = groupsdiv.getElementsByTagName('ol')[0];
            newlist = document.createElement('ul');
        };

        newlist.innerHTML = oldlist.innerHTML;
        newlist.setAttribute('id', 'profilecourses');
        newlist.setAttribute('class', 'ul_red');
        oldlist.parentNode.replaceChild(newlist, oldlist);
    }, 'false');
};

// Gruppen
var groups_h2 = document.getElementById('profile_groups_list').getElementsByTagName('h2')[0];

if ( groups_h2 ) {
    groups_h2.addEventListener('dblclick', function() {
        var oldlist, newlist;
        var groupsdiv = document.getElementById('profile_groups_list');

        oldlist = groupsdiv.getElementsByTagName('ul')[0];
        if( oldlist ) {
            newlist = document.createElement('ol');
        }
        else {
            oldlist = groupsdiv.getElementsByTagName('ol')[0];
            newlist = document.createElement('ul');
        };

        newlist.innerHTML = oldlist.innerHTML;
        newlist.setAttribute('id', 'profilecourses');
        newlist.setAttribute('class', 'ul_red');
        oldlist.parentNode.replaceChild(newlist, oldlist);
    }, 'false');
};

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}