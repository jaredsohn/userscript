// ==UserScript==
// @name          Set Users Online Status
// @namespace     Drew - joyboner.com [2.1.07]
// @description	  Gives option to set a user online or offline with a click of a button!
// @include       http://*myspace.com/*viewprofile&*
// ==/UserScript==

var friendid1 = document.getElementById('ctl00_Main_ctl00_UserContactLinks1_RateFriendLink').href;
var friendID = friendid1.replace(/http.*UserID=/, '');
//alert(''+friendID+'');

// add menu

box = document.createElement("iframe");
box.setAttribute("src", "http://joyboner.com/gmscripts/ostatus.php?id="+friendID);
box.style.height = '17px';
box.style.width = '150px';
box.style.position= 'fixed';
box.style.bottom = '0px';
box.style.left = '0px';
box.style.border = 'none';
box.style.zIndex = '9999';
document.body.insertBefore(box, document.body.firstChild);




