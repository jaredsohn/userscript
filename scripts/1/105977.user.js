// ==UserScript==
// @name           TwitchTV Mod
// @version        1.1.3
// @include        http://www.twitchtv.com*
// @include        http://www.twitch.tv*
// @exclude		   http://www.twitchtv.com/
// @exclude		   http://www.twitch.tv/*/popout
// @exclude        http://www.twitch.tv/
// ==/UserScript==

/// Edit these variables to change the width and height of the player.
var directoryWidth = 960;    /// Width of the channel browsing page.
var directoryFilter = 300;    /// Width of the filter bar on the left of the directory page.

var videoWidth = 1100;        /// Width of the video in the live page and archives page.
var videoHeight = 700;        /// Height of the video in the live page and archives page.
var chatHeight = 935;         /// Height of the chat, subtract manually by 250 if ads are enabled.
var chatWidth = 390;          /// Width of the chat including the scroll bar.
var chatLineWidth = 360;      /// Width of the text within the chat.

var chatPadding = 10;
var mainPadding = 40;         /// Padding for the main container.

var videoStyle = 
    'div.main {' +
        'width: ' + (videoWidth + chatWidth + chatPadding + mainPadding).toString() + 'px !important;' +
    '}' +
	'div.c12 {' +
		'width: ' + (videoWidth + chatWidth + chatPadding).toString() + 'px !important;' +
	'}' +
	'#player_column, #videos_column {' +
		'width: ' + videoWidth.toString() + 'px !important;' +
	'}' +
	'div#standard_holder {' +
		'width: ' + videoWidth.toString() + 'px !important;' +
		'height: ' + videoHeight.toString() + 'px !important;' +
	'}' +
	'#chat_column, #instructions_column {' +
		'width: ' + (chatWidth - chatPadding).toString() + 'px !important;' +
	'}' +
	'#chat_line_list {' +
		'width: ' + chatLineWidth.toString() + 'px !important;' +
	'}' +
    '#chat_lines {' +
        'max-height: 100% !important;' +
        'height: 100% !important;' +
    '}' +
    '#chat {' +
        'height: ' + chatHeight.toString() + 'px !important;' +
    '}' +
    '#twitch_chat {' +
        'height: 95% !important;' +
    '}' +
    '#live_site_player_flash {' +
	'width: ' + videoWidth.toString() + 'px !important;' +
	'height: ' + videoHeight.toString() + 'px !important;' +
    '}' +
    '.directory #directory_channels {' +
	'width: ' + directoryWidth.toString() + 'px !important;' +
    '}' +
    '.archive_site_player_container {' +
        'width: ' + videoWidth.toString() + 'px !important;' +
        'height: ' + videoHeight.toString() + 'px !important;' +
    '}' +
    '#archive_site_player_flash {' +
        'width: ' + videoWidth.toString() + 'px !important;' +
        'height: ' + videoHeight.toString() + 'px !important;' +
    '}' +
    '.main.discovery {' +
        'width: ' + (directoryWidth + mainPadding + directoryFilter).toString() + 'px !important;' +
    '}' +
    '.discovery > .wrapper {' +
        'width: ' + (directoryWidth + directoryFilter).toString() + 'px !important;' +
    '}';
GM_addStyle(videoStyle);
