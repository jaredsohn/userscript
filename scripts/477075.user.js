// ==UserScript==
// @name        Ninja Kiwi Feed Auto Updater
// @namespace   test
// @description This Script auto updates your feed in your Ninja Kiwi profile.
// @include     http://*.ninjakiwi.com/profile/*
// @include     https://*.ninjakiwi.com/profile/*
// @include     http://ninjakiwi.com/profile/*
// @include     https://ninjakiwi.com/profile/*
// @version     2.0b
// @grant       none
// (c) 2014 Reaper_guy http://www.ninjakiwi.com/profile/Reaper_guy
// Original upload of this script: http://pastebin.com/yDg7MZ7u
// ==/UserScript==


function ID(e,t){return e.getElementById(t)}function CLASS(e,t){return e.getElementsByClassName(t)}function NAME(e,t){return e.getElementsByTagName(t)}function loadScript(e,t){var n=document.createElement("script");n.type="text/javascript";if(n.readyState){n.onreadystatechange=function(){if(n.readyState=="loaded"||n.readyState=="complete"){n.onreadystatechange=null;t(n)}}}else{n.onload=function(){t(n)}}n.src=e;document.getElementsByTagName("head")[0].appendChild(n)}function updateFeed(){feed=activity.children[0];oldChildNum=feed.children.length;loadScript(activityURL,onLoaded)}function onLoaded(e){while(oldChildNum!=1){feed.removeChild(feed.children[1]);oldChildNum--}document.head.removeChild(e)}function toggleAutoUpdate(){if(autoUpdating){autoUpdateButton.innerHTML="Start auto update";updateButton.removeAttribute("disabled");autoUpdating=false;window.clearInterval(intervalID)}else{autoUpdateButton.innerHTML="Stop auto update";updateButton.setAttribute("disabled","");autoUpdating=true;intervalID=autoUpdate()}}function autoUpdate(){return window.setInterval(updateFeed,1e4)}var activity=ID(document,"activity");var username=activity.getAttribute("data-username");var feed=null;var oldChildNum=null;var intervalID=null;var activityURL="http://ninjakiwi.com/profile/activities.js?last=2100-12-31%2012:00:00&username="+username;var autoUpdating=false;var updateButton=document.createElement("button");updateButton.type="button";updateButton.setAttribute("onClick","updateFeed()");updateButton.setAttribute("style","position: absolute; right: -100px; top: 5px;");updateButton.innerHTML="Update feed";CLASS(document,"details")[0].appendChild(updateButton);var autoUpdateButton=document.createElement("button");autoUpdateButton.type="button";autoUpdateButton.setAttribute("onClick","toggleAutoUpdate()");autoUpdateButton.setAttribute("style","position: absolute; right: -125px; top: 25px;");autoUpdateButton.innerHTML="Start auto update";CLASS(document,"details")[0].appendChild(autoUpdateButton)