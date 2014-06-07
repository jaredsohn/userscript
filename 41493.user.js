// UNTUMBLARITY
// by Justin Koh
// justin@carboxymoron.com
// nerf.tumblr.com
//
// ==UserScript==
// @name           UNTUMBLARITY
// @description    Hide Follower count in the Dashboard.
// @include        http://tumblr.com/dashboard
// @include        http://tumblr.com/dashboard/*
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/*
// @author         Justin Koh
// @version        2.1
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

rules[rules.length] = "#right_column .dashboard_nav_item ul.dashboard_subpages a[href='/followers'] { display:none; }";

rules[rules.length] = "#right_column .dashboard_nav_item ul.dashboard_subpages a[href$='/followers'] { display:none; }";

enableStyle(rules);