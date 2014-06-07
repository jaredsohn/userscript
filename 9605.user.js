// StudiVZ: Gemeinsame Gruppen hervorheben
// Version 1.0
// 2007-06-01
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
// select "StudiVZ: gemeinsame Gruppen hervorheben", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           StudiVZ: gemeinsame Gruppen hervorheben
// @namespace      http://www.jlu.name/programmieren/greasemonkey
// @description    Markiert (in fremden Profilen) Gruppen, in denen man selbst auch Mitglied ist
// @include        http://www.studivz.net/profile.php*
// ==/UserScript==

getOwnGrouplist();

function getOwnGrouplist() {
    var myPage = findLinkByLabel('Meine Seite').href;

    if ( myPage != document.location.href ) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: myPage,
            onload: function(resp) {
                var mygroups = extractOwnGrouplist(resp.responseText).getElementsByTagName('li');
                var localgroups = extractLocalGrouplist().getElementsByTagName('li');
    
                var i = 0;
                var j = 0;
                while ( (i < mygroups.length) && (j < localgroups.length) ) {
                    if ( mygroups[i].textContent == localgroups[j].textContent ) {
                        var bold = document.createElement('b');
                        bold.innerHTML = localgroups[j].firstChild.innerHTML;
                        localgroups[j].firstChild.replaceChild(bold, localgroups[j].firstChild.firstChild);
    
                        i++;
                        j++;
                    }
                    else {
                        if ( mygroups[i].textContent.toLowerCase() < localgroups[j].textContent.toLowerCase() ) {
                            i++;
                        }
                        else {
                            j++;
                        }
                    }
                }
            }
        });
    }
}

function extractLocalGrouplist() {
    var groupsdiv = document.getElementById('profile_groups_list');

    var groupslist = groupsdiv.getElementsByTagName('ul')[0];
    if( ! groupslist ) {
        groupslist = groupsdiv.getElementsByTagName('ol')[0];
    };

    if ( groupslist ) {
        var prevgroup = '';
        var prevgroupid = '';

        for ( var i = 0; i < groupslist.childNodes.length; i++ ) {
            var curr = groupslist.childNodes[i];

            if ( curr.nodeName == 'LI' ) {
                var group   = curr.textContent.toLowerCase();
                //var groupid = curr.firstChild.getAttribute('href').replace(/^.*\?ids=/, '');

                if ( prevgroup > group ) {
                    alert('Inversion der Reihenfolge: \n' + group + '\n' + prevgroup);
                }

                prevgroup   = group;
                //prevgroupid = groupid;
            }
        }
    }

    return groupslist;
}

function extractOwnGrouplist(htmlstring) {
    var temp = document.createElement('div');
    temp.innerHTML = htmlstring;

    // finde div[@id='profile_groups_list']
    var div;
    var divs = temp.getElementsByTagName('div');
    for ( var i = 0; i < divs.length; i++ ) {
        if ( divs[i].getAttribute('id') == 'profile_groups_list') {
            div = divs[i];
            break;
        }
    }
    if ( ! div ) {
        // nicht gefunden
    }

    // finde div[@class='profilecourses']
    var ul;
    var uls = div.getElementsByTagName('ul');
    for ( var i = 0; i < uls.length; i++ ) {
        if ( uls[i].getAttribute('id') == 'profilecourses') {
            ul = uls[i];
            break;
        }
    }
    if ( ! ul ) {
        // nicht gefunden
    }
    return ul;
}

function findLinkByLabel(label) {
    var links = document.getElementsByTagName('a');

    for ( var i = 0; i < links.length; i++ ) {
        if ( links[i].textContent == label ) {
            return links[i];
        }
    }
}