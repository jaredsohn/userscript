// ==UserScript==
// @name        Dashboard-left-panel-hide
// @namespace   userscripts.org
// @description Hide left panel when multiple dashboards
// @include     http://*/secure/Dashboard*
// @version     1
// @grant       none
// ==/UserScript==

// works for Firefox, JIRA v6.1
// adapted from
// https://answers.atlassian.com/questions/50924/dashboard-how-do-i-hide-the-dashboard-selector-on-the-left

var removeLeftPanel = function() {
  jQuery("ul.vertical").remove();
  jQuery("#dashboard").attr("class", "dashboard");
};

window.addEventListener("load", removeLeftPanel, true);