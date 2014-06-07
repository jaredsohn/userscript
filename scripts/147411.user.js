// ==UserScript==
// @name        Waypoint Forum Drop-down
// @namespace   DavidJCobb
// @description Changes the "FORUMS" link in the site nav into a dropdown.
// @include     https://halo.xbox.com/*
// @include     https://*.halo.xbox.com/*
// @include     https://forums.halo.xbox.com/*
// @include     https://*.halowaypoint.com/*
// @include     https://forums.halowaypoint.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant       GM_getValue
// @comments    The @grant metadata is a pain in the ass.
// ==/UserScript==

if (window.top !== window.self) // do not run in IFRAMEs
  return;

$(document).ready(function(){

var navItem =
   $("#global-nav-wrapper>ul>li").filter(
      function(i) {
         return $.trim($(this).text()).toLowerCase() == "forums"
      }
   ).addClass("dropdown-type");

navItem.find("a").empty().append("<span> Forums</span><span class='arrow'></span>");
$("<div class='dropdown font-replace-standard'></div>")
   .append(
      $("<ul></ul>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics5.aspx'>Announcements</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics8.aspx'>Recruiting</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics9.aspx'>Halo Universe</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics10.aspx'>Matchmaking</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics22.aspx'>Halo Waypoint</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics11.aspx'>General Discussion</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics12.aspx'>Halo 4</a></li>")
         .append("<li><a href='https://forums.halo.xbox.com/yaf_topics14.aspx'>Halo: Reach</a></li>")
   ).appendTo(navItem);

});