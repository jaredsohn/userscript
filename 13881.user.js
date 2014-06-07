// Google Inbox Count Display 2

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation; either version 2, or (at your
// option) any later version.

// This file is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this software; see the file COPYING. If not, write to
// the Free Software Foundation, Inc., 59 Temple Place - Suite 330,
// Boston, MA 02111-1307, USA.

// ==UserScript==
// @name           Google Inbox Count Display 2
// @namespace      http://svn.ideaharbor.org/greasemonkey/
// @description    Modify Gmail inbox title to display count of unread messages at the beginning, so unread count displays in a small tab; works with tags & chat too
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

// adapted from Google Inbox Count Display
// http://userscripts.org/scripts/show/4146
// by Jon Ramsey

unsafeWindow.document.watch('title', function(prop, oldval, newval) {

    if (matches = newval.match(/\((\d+)\)/)) {
        // remove the old unread count
        newval = newval.replace(/\(.*\) /, "");
        // add the unread count to the beginning
        newval = newval.replace(/^/, "(" + matches[1] + ") ");
    }
    // remove 'Gmail - ' (always present)
    newval = newval.replace(/Gmail - /, "");
    // remove 'Inbox - ' (if present)
    newval = newval.replace(/Inbox - /, "");

    return newval;
});

