// ==UserScript==
// @name        Facebook Group Membership Auto-Confirm
// @namespace   Membership Auto-Confirm
// @description Confirm all group memberships at once.
// @include     https://www.facebook.com/
// @version     1
// @grant       none
/* @usage       go to the page where you can see all requests awaiting for confirm
                bring up console screen in your browser, copy & paste code, Hit
                Enter. =)
*/
// ==/UserScript==



var cont = document.getElementById('Group_member_request_pagelet');
var ul = cont.childNodes[0];
var li = ul.getElementsByTagName('li'); // iterate on this
 
for (var i = 0; i < li.length; i++) {
var btnCont = li[i].getElementsByClassName('rfloat');
var ancHors = btnCont[0].getElementsByTagName('a');
ancHors[0].click(); // make the click
}