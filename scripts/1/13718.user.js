// Copyright (C) 2007 by Jeff Angelini

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
// @name           Older Version Gmail Title
// @namespace      Gmail.Title
// @description    Changes the title of Gmail to the older verssion so the email address isn't appended
// @include        http*://*mail.google.com/*
// ==/UserScript==

unsafeWindow.document.watch('title',
    function(prop, oldval, newval) {

      //get rid of appended email
      var lstI = newval.lastIndexOf(" - ");
      if(lstI != -1){
        newval = newval.substring(0,lstI);
      }

      //do label stuff
      lstI = newval.lastIndexOf('"');
      if(lstI != -1){
        if(matches = newval.match(/(".*") \((\d+)\)/)){
        newval = "("+matches[2]+") " + matches[1];
        }
        else if(matches = newval.match(/(".*")/)){
          newval = matches[1];
        }
      }

      return (newval);
    });

  /* *******************Made from below script**********************
  
  // Google Inbox Count Display

// $Id: google.cache.user.js 33 2005-12-29 16:54:00Z jon $
// Copyright (C) 2005 by Jonathon Ramsey (jonathon.ramsey@gmail.com)
  
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
        newval = matches[1] + ' unread - Google Mail - Inbox';
     }
     return (newval);
  });
  
  ************************End Old Script*************************** */
