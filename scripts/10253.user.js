// Google Inbox Count Display

// $Id: google.cache.user.js 33 2005-12-29 16:54:00Z jon $
// Copyright (C) 2005 by Jonathon Ramsey (jonathon.ramsey@gmail.com)

// Modified by Gina Trapani (ginatrapani@gmail.com) 6/27/2007
// to accomodate Google Apps for your domain inboxes

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
// @name           Google Inbox Count Display
// @namespace      htt://babylon.idlevice.co.uk/javascript/greasemonkey/
// @description    Modify Gmail inbox title to display count of unread messages at the beginning, so unread count displays in a small tab
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==




unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     if (matches = newval.match(/Inbox \((\d+)\)/)) {
     	names = newval.match(/\w+/)
        newval = matches[1] + ' unread - ' + names[0] + ' Inbox';
     }
     return (newval);
  });
  