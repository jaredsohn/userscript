/*
 * Title:
 * 	LJ: Message Count
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2007-02-02
 *
 * Copyright (c) 2006, John Morton
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the author nor the names of the contributors may 
 *       be used to endorse or promote products derived from this software 
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR 
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS 
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN 
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */

// ==UserScript==
// @name LJ: Message Count
// @namespace http://angrymonkey.net.nz/
// @description Retrieves your new message count so it can be displayed against the inbox link as it appears on other pages.
// @include http://*.livejournal.com/*
// @exclude http://www.livejournal.com/*
// ==/UserScript==

// We want to parse out the value inside this span:
// <span id="LJ_Inbox_Unread_Count"></span>
var unread_count_re = /<span\s+id=[\'\"]LJ_Inbox_Unread_Count[\'\"]\s*>\s*\(?(\d*)\)?\s*<\/span>/gi;

var message_url_xpath = "//a[@href='http://www.livejournal.com/inbox/']";

var count_fetch_msg = new Array();
count_fetch_msg["SUCCESS"] = 
  "Unread message count retrieved from the login page.";
count_fetch_msg["WAITING"] = 
  "Attempting to retrive the unread message count from the login page."
count_fetch_msg["ERR_NOT_ON_PAGE"] = 
  "Didn't find an unread message count block on the login page. " + 
  "Has the page changed?";
count_fetch_msg["ERR_NO_PAGE"] = 
  "The login page response was empty; no unread message count.";
count_fetch_msg["ERR_PAGE_LOAD"] = 
  "There was an error retrieving the login page; no unread message count.";


function retrieveUnreadCountFromLJ(set_callback){
  /* Runs a GM_xmlhttpRequest against the LJ login page to fetch the 
     current unread message count for the logged in user. 
     
     The set_callback is a function that takes the parsed unread message 
     count and outcome state of the retrieval attempt so they can be
     written out to some global variables somewhere. It returns 1 if 
     we know for certain the result of the user name fetch, or 0 if 
     we're still waiting. If the unread message count is unknown, it's 
     passed in as null, and it's up to the function to decide whether 
     the global values should  be overwritten or not.
  */
  
  GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://www.livejournal.com/__rpc_esn_inbox',
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Content-type': 'application/x-www-form-urlencoded', 
        },
        data: "action=get_unread_items",
        onload: function(res) {
          if (res.responseText.length > 0) {
            var resObj;
            var e;
            try {
              eval("resObj = " + res.responseText + ";");
            } catch (e) {
            }

            if (e || ! resObj) {
              return set_callback(null, "ERR_NOT_ON_PAGE");             
            } else {
              return set_callback(resObj['unread_count'], "SUCCESS_PAGE");
            } 
          }         
          return set_callback(null, "ERR_NO_PAGE");
      },
        onerror: function(res){set_callback(null, "ERR_PAGE_LOAD");},
        });
}



function getUnreadCount(set_callback) {
  /* A simple wrapper around retrieveUnreadCountFromLJ */
  
  retrieveUnreadCountFromLJ(set_callback);
  return set_callback(null, "WAITING");
}


// An example of getUser in action:

var lj_unread = null;
var lj_state = 0;

function callback(unread, state) {
  if (unread != null) lj_unread = unread; 
  lj_state = state;
  if (state == "WAITING") {
    // We don't know whether we have the unread message count, yet.
    return 0;
  } else {
    // We do know.
    return 1;
  }
}


lj_unread_timed_alert = function() {
  if (lj_state == "WAITING") {
    setTimeout(lj_unread_timed_alert, 500);
  } else {
    if (lj_unread != null) {
      var inbox_links = document.evaluate(
             message_url_xpath, document, null,
             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for(var i=0; i < inbox_links.snapshotLength; i++) {
        var this_link = inbox_links.snapshotItem(i);
        var done = 0;
        // Check for existing span with class inbox_unread_count 
        // or id = LJ_Inbox_Unread_Count
        for(var j=0; j < this_link.childNodes.length; j++) {
          if (this_link.childNodes[j].id == 'LJ_Inbox_Unread_Count' ||
              this_link.childNodes[j].class == 'inbox_unread_count') {
            done = 1;
          }
        }
        if (done == 1) { continue; }

        var unread_text = " (" + lj_unread + ")";
        var count_c = document.createElement('span');
        count_c.setAttribute('class', 'inbox_unread_count');        
        count_c.appendChild(document.createTextNode(unread_text));
        this_link.appendChild(count_c);
      }
    }
  }
}
  
if (getUnreadCount(callback) == 0) {
  id = setTimeout(lj_unread_timed_alert, 500);  
} else {
  lj_unread_timed_alert();
}
