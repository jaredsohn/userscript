// ==UserScript==
// @name           Tumblr Hide Followers
// @namespace      http://userscripts.org/users/asanusta
// @description    Hides follower count from Tumblr asanusta
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/*
// ==/UserScript==

var rules = new Array();
var style;

function enableStyle(rules) {
   style = document.createElement('style');
   style.type = 'text/css';
   document.getElementsByTagName('head')[0].appendChild(style);
   for (var i = 0; i < rules.length; i++) {
      style.sheet.insertRule(rules[i], 0);
   }
}

rules[rules.length] = "#right_column .dashboard_nav_item .dashboard_subpages a[href='/followers'] { display:none; }";

enableStyle(rules);