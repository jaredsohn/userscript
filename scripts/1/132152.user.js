// ==UserScript==
// @name          USO Quick Home
// @namespace     fr.kergoz-panik.watilin
// @version       2.0.1
// @description   Adds a dropdown list to the /home link. Now also auto-reloads pages when encountering 502 errors.
//                
// @match         *://userscripts.org/*
//
// @author        Watilin
// @copyright     2013+, Watilin
// @license       Creative Commons by-nc-sa
// @homepage      http://kergoz-panik.fr/watilin/userscripts/uso-quick-home/
// @icon          http://kergoz-panik.fr/watilin/userscripts/uso-quick-home/icon32.png
//                
// @grant         none
// ==/UserScript==

"use strict";

// In an effort to be cross browser, I decided to remove GM_addStyle.
function injectStyle( style, charset ){
   charset = charset || "utf-8";
   var $receiver = document.head || document.documentElement;
   var $style = document.createElement("style");
   $style.type = "text/css; charset=" + charset;
   $style.textContent = style;
   $receiver.appendChild($style);
}

// Dropdown Menu ///////////////////////////////////////////////////////

var $top = document.getElementById("top");
var $homelink = $top && $top.querySelector("a[href='/home']");

if ($homelink) {

   var $dropdown = document.createElement("ul");

   /* This is raw HTML copied from the "/home" page;
      since I can't find the public profile ID on all page, I didn't
      include the link into this list. */
   $dropdown.innerHTML =
   '<li class="menu"><a href="/messages">private messages</a></li>\
   <li class="menu"><a href="/home/comments">comments on your scripts</a></li>\
   <li class="menu"><a href="/home/favorites">favorite scripts</a></li>\
   <li class="menu"><a href="/home/topics">monitored topics</a></li>\
   <li class="menu"><a href="/home/scripts">script management</a></li>\
   <li class="menu"><a href="/home/settings">settings</a></li>\
   <li class="menu"><a href="/home/widgets">widgets</a></li>';

   // A bit of styling…
   $dropdown.id = "watilin-dropdown";
   $dropdown.className = "subnav"; // existing class
   injectStyle("#watilin-dropdown {\
      position: absolute;\
      z-index: 1000;\
      background: rgba(0,0,0,0.75);\
      border-radius: 1em;\
      padding: 1ex 1em;\
      overflow: hidden;\
      display: none;\
   }");

   // … Positioning…
   var effectiveWidth = parseInt(getComputedStyle($dropdown, null).width);
   var topHeight = parseInt(getComputedStyle($top, null).height);
   $dropdown.style.top = topHeight + 'px';

   // … Interactivity…
   var hideTimer = 0;
   const DELAY = 1500;

   $homelink.addEventListener("mouseenter", function( e ){
      clearTimeout(hideTimer);
      if ("inherit" != $dropdown.style.display) {
         $dropdown.style.left = e.clientX - effectiveWidth + 'px';
         $dropdown.style.display = "inherit";
      }
   }, false);
   $dropdown.addEventListener("mousemove", function( ){
      clearTimeout(hideTimer);
   }, false);
   $homelink.addEventListener("mouseleave", function( e ){
      clearTimeout(hideTimer);
      if (e.relatedTarget != $dropdown)
         hideTimer = setTimeout(function( ){
            $dropdown.style.display = "none";
         }, DELAY);
   }, false);
   $dropdown.addEventListener("mouseleave", function( e ){
      clearTimeout(hideTimer);
      if (e.relatedTarget != $homelink)
         $dropdown.style.display = "none";
   }, false);

   // … And here we go!
   $top.appendChild($dropdown);

}

// 502 Reload //////////////////////////////////////////////////////////

if (/^502/.test(document.title)) {
   setTimeout(function( ){
      location.reload();
   }, 1000); // 1s to let the server breathe
}
