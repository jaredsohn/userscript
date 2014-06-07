// ==UserScript==
// @name        Jira issue panel
// @namespace   https://rhinofly.atlassian.net/
// @description Jira issue panel width to auto
// @include     https://*.atlassian.net/*
// @include     http://*.atlassian.net/*
// @version     1
// ==/UserScript==
var issuePanelWidth = function () {
	GM_addStyle("#ghx-detail-view {width:auto !important}");
};
window.onload = issuePanelWidth();