// ==UserScript==
// @name Facebook Live News Feed
// @description Automatically loads new News Feed items. Must have navigated directly to the home page for this to work.
// @include http://www.facebook.com/home.php
// @include http://www.facebook.com/home.php?*
// ==/UserScript==

// Set number of seconds between refreshes
var FLNF_Delay = 30;

var FLNF_NewPostNotification_ElementParentDOM = document.getElementById("home_stream").childNodes[2];
var FLNF_NewPostNotification_ElementContainerDOM = FLNF_NewPostNotification_ElementParentDOM.childNodes[0];
var FLNF_NewPostNotification_ElementDOM = FLNF_NewPostNotification_ElementParentDOM.childNodes[0].childNodes[0];
var FLNF_NewPostNotification_LoadNewJS = FLNF_NewPostNotification_ElementDOM.getAttribute("onclick");

FLNF_NewPostNotification_ElementParentDOM.removeChild(FLNF_NewPostNotification_ElementContainerDOM);

var FLNF_Updater = document.createElement('script');
FLNF_Updater.setAttribute("type","text/javascript");
FLNF_Updater.innerHTML = "setInterval('" + FLNF_NewPostNotification_LoadNewJS + "', " + FLNF_Delay*1000 + ");";
document.getElementsByTagName("head")[0].appendChild(FLNF_Updater);

var FLNF_NoFirstPost = document.createElement('style');
FLNF_NoFirstPost.setAttribute("type","text/css");
FLNF_NoFirstPost.innerHTML = ".UIStory_First{ border-top: 1px solid #eee !important; padding-top: 7px !important; }";
document.getElementsByTagName("head")[0].appendChild(FLNF_NoFirstPost);