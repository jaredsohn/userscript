// OverrideBackgroundGmailInbox
// by Jonathan Abramson
//
// Based on: ActiveInboxDarkCSS (Copyright (c) 2011, Gabriel Tran)
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OverrideBackgroundGmailInbox
// @namespace     tag:zenpoy.spam@gmail.com,2011-11-15:OverrideBackgroundGmailInbox
// @description   Overwrites Inbox CSS values
// @include       http://mail.google.com*
// @include       https://mail.google.com*
// @version       0.3
// ==/UserScript==

var colorsSettingsDark = {
	read_backgraound: 'rgba(5, 5, 5, .85)',
	read_color: '#AAA',
	unread_backgraound: 'rgba(35, 35, 35, .9)',
	unread_color: '#EEE',
	selected_background: '#FFC',
	selected_color: '#222',
	attachment_background: 'url(//ssl.gstatic.com/ui/v1/icons/mail/sprite_white2.png) no-repeat -2px 0',
	seperator_borderbottom: '1px #2A2A2A solid'
}


var colorsSettingsLight = {
	read_backgraound: 'rgba(243, 243, 243, .95)',
	read_color: '#222',
	unread_backgraound: 'rgba(255, 255, 255, .95)',
	unread_color: '#222',
	selected_background: '#FFC',
	selected_color: '#222',
	attachment_background: 'url(//ssl.gstatic.com/ui/v1/icons/mail/sprite_black2.png) no-repeat -2px 0',
	seperator_borderbottom: '1px #DDE solid'
}

/* Light */
var colorsSettings = colorsSettingsLight;

function injectCSS(cssdata)
{
head = document.getElementsByTagName("head")[0];
style = document.createElement("style");
style.setAttribute("type", 'text/css');
style.innerHTML = cssdata;
head.appendChild(style);
} 

//change background color
//read
injectCSS('.yO  {background:' + colorsSettings.read_backgraound + '! important; color: ' + colorsSettings.read_color + ' ! important; }');
//unread
injectCSS('.zE  {background:' + colorsSettings.unread_backgraound + ' ! important; color:' + colorsSettings.unread_color + '! important; }');
//selected
//injectCSS('.aqw  {background:' + colorsSettings.selected_background + '! important; color:' + colorsSettings.selected_color + '! important; }');
//attachment
injectCSS('.yE  {background:' + colorsSettings.attachment_background + '! important; }');
//seperator
injectCSS('.xY  {border-bottom: ' + colorsSettings.seperator_borderbottom + '! important; }');