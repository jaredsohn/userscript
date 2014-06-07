// ==UserScript==
// @name          Raptr Website Tweaks
// @namespace     Parsnip
// @include       http://*raptr.com/*
// @downloadURL   https://userscripts.org/scripts/source/154090.user.js
// @updateURL     https://userscripts.org/scripts/source/154090.meta.js
// @version       2.4
// ==/UserScript==

// Adds some styles that aren't normally loaded on all pages //
GM_addStyle(".mod-manual-tracking button .text {text-align: center; font-size:13px; font-weight: bold; vertical-align:middle}.mod-manual-tracking {text-align: center}.mod-manual-tracking button {font-size:13px; padding:6px}#page-head .nav .discover .trigger {border-color: transparent}");

// Removes the Home link from the header //
var RemoveHome = document.getElementsByClassName('nav-link home')[0];
RemoveHome.parentNode.removeChild(RemoveHome);

// Adds the Forums link to the header //
var ForumLink = document.createElement('li');
ForumLink.className = 'nav-link download';
ForumLink.innerHTML = '<a href=/forums>Forums</a>';
var InsLink = document.getElementsByClassName('nav-link account')[0];
InsLink.parentNode.insertBefore(ForumLink, InsLink);

// Checks if the page has sidebar navigation, looks for the manual tracking button in there and inserts one if it doesn't find it //
var SidebarCondition1=document.getElementsByClassName('mod-page-nav')[0];
if (SidebarCondition1==null)
 {
 }
else
 {
var SidebarCondition2=document.getElementsByClassName('mod mod-manual-tracking inited')[0];
var SidebarCondition3=document.getElementsByClassName('mod-account-nav')[0];

if (SidebarCondition2==null && SidebarCondition3==null) 
 {
var ManualTrack = document.createElement('div');
ManualTrack.className = 'mod mod-manual-tracking inited';
ManualTrack.innerHTML = '<div class="bd"><button data-auth-required="=&quot;true&quot;" data-modal-id="gametime-tracking-modal" data-conf="{&quot;id&quot;:&quot;GametimeTrackingMod&quot;}" data-event="track-gametime-maually" class="event-track almost-epic"><span class="text">Track gametime manually</span></button></div>';
var InsTrack = document.getElementsByClassName('mod-page-nav')[0];
InsTrack.parentNode.insertBefore(ManualTrack, InsTrack.nextSibling);
 }
 }