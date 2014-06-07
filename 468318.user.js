// ==UserScript==
// @name        Weird Birthdays
// @namespace   weird_birthdays
// @description removes birthday notifications from metglobal jira
// @include     https://metglobal.atlassian.net/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('announcement-banner').remove();