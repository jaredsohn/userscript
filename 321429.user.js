// ==UserScript==
// @name          USO Reporter
// @namespace     erosman
// @description   Adds Spam Button to Empty Topics
// @updateURL     https://userscripts.org/scripts/source/321429.meta.js
// @downloadURL   https://userscripts.org/scripts/source/321429.user.js
// @include       http://userscripts.org/topics/*
// @include       https://userscripts.org/topics/*
// @grant         none
// @author        erosman
// @version       1.1
// ==/UserScript==

/* --------- Note ---------
  This script adds a post body and spam button to empty topics for reporting.



  --------- History ---------

  1.1 Code Improvement + Style Changes
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame


// Check if the table has any children ie not empty
var table = document.getElementsByClassName('posts wide');
if (table[0] && table[0].children[0]) { return; } // end execution if not empty

var ident = document.querySelector('a[id*="posts-"]');
// var ident = table[0].previousSibling;
if (!ident) { return; } // end execution if not found

var postID = ident.id.match(/\d+/);

var user = document.querySelector('#right a[href*="/users/"]');
if (!user) { return; } // end execution if not found

var userID = user.href.match(/\d+/);
var userName = user.title;

var authenticity_token = document.querySelector('input[name="authenticity_token"]');
if (!authenticity_token) { return; } // end execution if not found

var authToken = authenticity_token.value;

// insert a first post
table[0].innerHTML +=
'<tr class="post hentry good-ham" id="row-' + postID + '">' +'\r\n'+
'  <td class="author vcard">' +'\r\n'+
'    <span class="fn"><a href="/users/' + userID + '" class="admin" rel="nofollow" ' + 
         'text="' + userName + '" user_id="' + userID + '">' + userName + '</a></span>' +'\r\n'+
'    <span class="role">User</span>' +'\r\n'+
'    <p><form action="/spam" method="post">' +'\r\n'+
'      <div style="margin: 0; padding: 0; display: inline;">' +'\r\n'+
'        <input name="authenticity_token" type="hidden" value="' + authToken + '" /></div>' +'\r\n'+
'      <input id="target_id" name="target_id" type="hidden" value="' + postID + '" />' +'\r\n'+
'      <input id="target_type" name="target_type" type="hidden" value="Post" />' +'\r\n'+
'      <input id="spam" name="spam" type="hidden" value="true" />' +'\r\n'+
'      <input name="commit" type="submit" value="SPAM" />' +'\r\n'+
'    </form></p>' +'\r\n'+
'  </td>' +'\r\n'+
'  <td class="body entry-content" id="post-body-' + postID + '" style="vertical-align: middle;">' +'\r\n'+
'    <p style="color: #f00; font-weight: bold;">Empty Content. Please Report as Spam.</p>' +'\r\n'+
'  </td>' +'\r\n'+
'</tr>' +'\r\n';

})(); // end of anonymous function