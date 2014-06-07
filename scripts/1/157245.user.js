// ==UserScript==
// @name       SC Chatroll Cleanup
// @description	Work in progress for cleaning up Star Citizen's Chatroll
// @namespace  http://www.elfindreams.com
// @version    0.2.9
// @include		http://chatroll.com/embed/chat/roberts-space-industries*
// ==/UserScript==


GM_addStyle ('.chat-contacts-divider { display: none; }');
GM_addStyle ('.chat-contacts-banner { display: none; }');
GM_addStyle ('.chat-contacts-container { display: none; }');
GM_addStyle ('.chat-messages-container-chromeless { right: 0px; }');
GM_addStyle ('.message-timestamp { display: none; }');
// GM_addStyle ('.message-profile-image { display: none; }');
GM_addStyle ('.message-profile-image { clear: both; top: 15px;}');
GM_addStyle ('.message-group-items { display: none; }');
GM_addStyle ('.message { clear: both; padding: 0px; padding-top: 10px;}');
GM_addStyle ('.message-profile-name { color: #A0E0FF; }');
GM_addStyle ('.message-profile-name { text-align: left; display: block; float: left; clear: both; width: 15%; visibility: visible; vertical-align: top; padding-bottom: 10px; padding-top: 1ex; padding-left: 5px;}');
GM_addStyle ('.message-text { display: block; float: left; margin-left: 2em; padding-left: 1em; visibility: visible; vertical-align: top; padding-bottom: 10px; padding-top: 1ex; width: 75%;}');
GM_addStyle ('.message-text img { padding-left: 5px; position: relative; vertical-align: top; }');
GM_addStyle ('.message-content { min-height: 0px; visibility: hidden; clear: both;}');
GM_addStyle ('.chat-welcome-message { clear: both; padding-top: 40px;}');