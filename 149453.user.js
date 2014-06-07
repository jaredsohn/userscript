// ==UserScript==
// @name        FacebookCC
// @namespace   Robert
// @description test
// @include     *facebook*
// @version     0.0.1
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// ==/UserScript==

// background
GM_addStyle("body { background-color: rgb(255, 204, 225) !important }");

// Default text
GM_addStyle("a { color: rgb(179, 71, 152) !important }");
GM_addStyle(".shareRedesign .uiAttachmentTitle {color: rgb(179, 71, 152) !important;}");
GM_addStyle(".UIActionLinks .uiLinkButton, .UIActionLinks .uiLinkButton input, .UIActionLinks .uiLinkButton {color: rgb(179, 71, 152) !important}");


// header
GM_addStyle("#blueBar { background-color: rgb(255, 101, 217); border-bottom: 1px solid rgb(0, 0, 0);} ");

// group counts
GM_addStyle(".uiSideNavCount { background-color: rgb(255, 255, 255); color: rgb(179, 71, 152);} ");

// reminders
GM_addStyle(".fbReminders .fbRemindersStory .fbRemindersTitle { color: rgb(179, 71, 152);} ");

// selected
GM_addStyle(".uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover { background-color: rgb(255, 255, 255);} ");

// hover
GM_addStyle(".uiSideNav .item:hover, .uiSideNav .item:active, .uiSideNav .item:focus, .uiSideNav .subitem:hover, .uiSideNav .subitem:active, .uiSideNav .subitem:focus {background-color: rgb(255, 255, 255);} ");