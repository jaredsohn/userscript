// Bungie.net Natural Text Box Enhancement
// version 2.1
// c r e a t e d   b y   the eNeME
// 12-27-2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// @namespace     http://userscripts.org/scripts/show/39123
// @version          2.1
// @description   Changes the size of the text input box for sending messages and posting threads and replies.
// @include       		*bungie.net/Forums/createpost.aspx*
// @include			*bungie.net/fanclub/*/Forums/createpost.aspx*
// @include			*bungie.net/account/profile.aspx?uid=*&page=PostMsg
// @include			*bungie.net/Account/Profile.aspx?msgID=*&act=reply*
// @include			*bungie.net/Account/Profile.aspx?postID=*&act=msg
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
	var list;
	var uls = new Array();

	var li1 = document.createElement('li');
	var msgBox;


	for (var i = 0; i < divs.length; i ++) 
	{
		if(divs[i].getAttribute("class") == "list-c")
			msgBox="ctl00_mainContent_postForm_skin_body";
		if(divs[i].getAttribute("class") == "list-b")
			msgBox="ctl00_mainContent_messageForm_skin_body";
	}	
			
	for (var i = 0; i < divs.length; i ++)
		if (divs[i].getAttribute('class') == "create-post-actions")
		{
			list = divs[i].getElementsByTagName("ul")[0];
			li1.innerHTML = '<br><br><a href=#'+msgBox+' onclick=javascript:document.getElementById("'+msgBox+'").rows+=11;>Add Lines</a><a href=#'+msgBox+' onclick=javascript:document.getElementById("'+msgBox+'").rows-=11;> Remove Lines</a>';
			list.appendChild(li1);
		}