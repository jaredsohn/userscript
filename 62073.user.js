// ==UserScript==
// @name		Wakoopa - Status Links
// @version		1.0
// @description		Additional links in main menu.
// @author		s!n
// @contact		http://wakoopa.com/sin/
// @license		Creative Commons
// @include		http://wakoopa.com/*
// ==/UserScript==

var userMenu = document.getElementById('user_menu');
userMenu.innerHTML = '<div><ul><li><a href="http://wakoopa.com/">Dashboard</a></li><li><a href="http://wakoopa.com/account">Settings</a></li><li><a href="http://wakoopa.com/account/activity">Account Activity</a></li><li><a href="http://wakoopa.com/account/download">Download the tracker</a></li><li><a href="http://wakoopa.com/about/status">Server status</a></li><li><a href="http://wakoopa.com/widgets">Widgets for your sites</a></li><li><a href="http://wakoopa.com/account/invite">Find and invite friends</a></li><li><a href="#" onclick="document.getElementById(\'logout_form\').submit(); return false; return false;">Log out</a></li></ul></div>';

var peopleMenu = document.getElementById('people_menu');
peopleMenu.innerHTML = '<div><ul><li><a href="/teams" title="All together now!">Teams</a></li><li><a href="/teams/top" title="Overlords">Overlords</a></li><li><a href="/reviews" title="What do they think?">Reviews</a></li></ul></div>';

var softMenu = document.getElementById('soft_menu');
softMenu.innerHTML = '<div><ul><li><a href="/categories" title="What category of software is it?">Categories</a></li><li><a href="/tags" title="What kind of software is it?">Tags</a></li><li><a href="/reviews" title="What do people think of it?">Reviews</a></li><li><a href="/developers" title="Who made it?">Developers</a></li><li><a href="/updates" title="Software Updates">Updates</a></li><li><a href="/submit" title="Suggest a web application">Suggest Web App</a></li></ul></div>';