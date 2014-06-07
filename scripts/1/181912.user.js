// ==UserScript==
// @name        GameFAQs - Private Board User Profile Invite button
// @namespace   http://userscripts.org/scripts/source/181912.user.js
// @description GameFAQs - Private Board User Profile Invite button descr
// @include     http://www.gamefaqs.com/users/*/boards
// @version     1
// @grant       none
// ==/UserScript==

var board = ""; //Enter the board number you are admin of here

//Do not edit below this line unless you know what you're doing.

var tbody = document.getElementsByTagName('tbody')[0];
var user = tbody.getElementsByTagName('td')[1];
var username = user.innerHTML;
var user_key = document.forms[1].key.value;
document.getElementsByClassName("span8")[0].innerHTML+=' <form action="/boards/'+board+'-?action=addmember&amp;admin=1" method="post" style="display:inline;margin:0;padding:0;" name="gm_invite">'
+ '<input type="hidden" name="username" value="'+username+'" /><input type="hidden" name="key" value="'+user_key+'"></form>'
+ '<input type="button" onclick="document.forms[\'gm_invite\'].submit();" value="Invite" />';