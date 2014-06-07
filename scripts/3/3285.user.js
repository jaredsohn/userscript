/*
 * Title:
 * 	Livejournal: Who Am I?
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-02-20
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
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ==UserScript==
// @name LJ: Who am I?
// @namespace http://angrymonkey.net.nz/
// @description Demonstration code for finding out who the currently logged in user is, on Livejournal.
// @include http://*.livejournal.com/*
// @exclude 
// ==/UserScript==

var hidden_user_re = /<input\s+type=[\'\"]hidden[\'\"]\s+name=[\"\']user[\"\']\s+value=[\'\"](\w+)[\'\"]/gi;
var cookie_re = /ljloggedin=u(\d+):s\d+;/g;


var user_fetch_msg = new Array();
user_fetch_msg["SUCCESS_CACHE"] = "User name retrieved from the cache.";
user_fetch_msg["SUCCESS_PAGE"] = "User name retrieved from the login page.";
user_fetch_msg["WAITING"] = "Attempting to retrive user name from the login page."
user_fetch_msg["ERR_NO_COOKIE"] = "Cannot find the user ID in the logged in cookie.";
user_fetch_msg["ERR_NOT_ON_PAGE"] = "Didn't find a user name on the login page. Has the page changed?";
user_fetch_msg["ERR_NO_PAGE"] = "The login page response was empty; no user name.";
user_fetch_msg["ERR_PAGE_LOAD"] = "There was an error retrieving the login page; no user name.";


function getLJuid(){
  /* Pull the uid out of the login cookie, so we can (potentially)
     look up a stored user name */
  if (document.cookie.length > 0) {
    match = cookie_re.exec(document.cookie);    
    if (match != null) {
      return match[1];
    }
  }
  return null; 
}

function retrieveUserFromLJ(set_callback){
  /* Runs an xmlhttpRequest against the LJ login page to work out
     the user name of the currently logged in user. 
     
     The set_callback is a function that takes the uid, user name and the 
     outcome state of the retrieval attempt so they can be written out to
     some global variables somewhere. It returns 1 if we know for certain
     the result of the user name fetch, or 0 if we're still waiting.
     If the uid or user name are unknown, they're passed in as null, and 
     it's up to the function to decide whether the global values should
     be overwritten or not.

  */
  
  GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.livejournal.com/login.bml',
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        onload: function(res) {
          if (res.responseText.length > 0) {
            match = hidden_user_re.exec(res.responseText);
            if (match != null) {
              // Brazenly assume the first match is the right one.
              return set_callback(null, match[1], "SUCCESS_PAGE");
            }
            return set_callback(null, match[1], "ERR_NOT_ON_PAGE");
          }
          return set_callback(null, null, "ERR_NO_PAGE");
        },
        onerror: function(res){set_callback(null, null, "ERR_PAGE_LOAD");},
        });
}

function getUser(set_callback) {
  /* Try and get the user from the cache of uid->user mappings, or
     attempt to retrieve a page from LJ that might tell us the user.
     
     The set_callback function is the same as used by retrieveUserFromLJ,
     except that the return value can be used to indicate a definite
     success, or definite failure. In the retrieval case, we return
     undefined to indicate that you'll want to check the state and value
     globals you assign to in the callback and do the setTimeout trick
     to try again later if the page hasn't come back, yet.
  */
  var uid = null;
  var user = null;
  var state = 0;
  
  uid = getLJuid();  
  GM_log("uid: " + uid);
  if (uid == null) {      
    // We can't work out the user.
    return set_callback(null, null, "ERR_NO_COOKIE");
  } else {
    user = GM_getValue(uid, null);
    GM_log("user from cache: " + user);
    if (user == null) {
      // We don't know yet; 
      retrieveUserFromLJ(set_callback);
      return set_callback(uid, null, "WAITING");
    } else {
      return set_callback(uid, user, "SUCCESS_CACHE");
    }
  }  
}


// An example of getUser in action:

var ljuid = null;
var ljuser = null;
var ljuser_state = 0;

function callback(uid, user, state) {
  if (uid != null) ljuid = uid;
  if (user != null) ljuser = user; 
  ljuser_state = state;
  if (state == "WAITING") {
    // We don't know whether we have the user name, yet.
    return 0;
  } else {
    // We do know.
    return 1;
  }
}


window.lj_whoami_timed_alert = function() {
  if (ljuser_state == "WAITING") {
    setTimeout('window.lj_whoami_timed_alert()', 500);
  } else {
    if (ljuser == null) {
      if (ljuser_state == "ERR_NO_COOKIE") {
        alert(user_fetch_msg[ljuser_state] + " Are you logged in?");
      } else {
        alert(user_fetch_msg[ljuser_state]);
      }
    } else {
      var from = "";
      if (ljuser_state == "SUCCESS_CACHE") from = " (from the cache)";
      if (ljuser_state == "SUCCESS_PAGE") { 
        from = " (from the login page)";
        GM_setValue(ljuid, ljuser);
      }
      alert("Your username is " + ljuser + from);
    }
  }
}

if (getUser(callback) == 0) {
  id = setTimeout('window.lj_whoami_timed_alert()', 500);  
} else {
  window.lj_whoami_timed_alert();
}
