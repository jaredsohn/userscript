// Bungie.net Natural Text Box Enhancement
// version 3.1
// created by CAVX
// version 2.0 created by the eNeME
// 12-23-2008
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bungie.net Natural Text Box Enhancement", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bungie.net Natural Text Box Enhancement
// @namespace     N/A
// @version       3.1
// @description   Changes the size of the text input box for sending messages and posting threads and replies.
// @include       http://*bungie.net/*Forums/createpost.aspx*
// @include	  http://*bungie.net/Account/profile.aspx?uid=*&page=PostMsg
// @include	  http://*bungie.net/Account/Profile.aspx?msgID=*&act=reply*
// @include	  http://*bungie.net/Account/Profile.aspx?postID=*&act=msg
// ==/UserScript==

var create = false;
var url = document.location.href;
var parts = new Array();
parts = url.split('/');

for (var i = 0; i < parts.length; i++)
	if (parts[i].indexOf("createpost.aspx") != -1 || parts[i].indexOf("act=msg") != -1 || parts[i].indexOf("PostMsg") != -1 || parts[i].indexOf("act=reply") != -1)
	{
		create = true;
		break;
	}

if (create == true)
	var divs = new Array()
	divs = document.getElementsByTagName('div');
	var msgBox;


	for (var i = 0; i < divs.length; i ++) 
	{
		if(divs[i].getAttribute("class") == "list-c")
			msgBox="ctl00_mainContent_postForm_skin_body";
		if(divs[i].getAttribute("class") == "list-b")
			msgBox="ctl00_mainContent_messageForm_skin_body";
	}	

	function autoExpandBox() {
	while (document.getElementById(msgBox).clientWidth < 525) 
		{
		document.getElementById(msgBox).rows+=5;
		}
	}

	function boxListen() {
	document.getElementById(msgBox).addEventListener("keyup", function () { autoExpandBox() }, false); 
	}
	
	boxListen();

	function hitQuote() {
	boxListen();
	autoExpandBox();
	}

	document.getElementById('ctl00_mainContent_postForm_skin_quoteButton').addEventListener("blur", function () { hitQuote() }, false); 
