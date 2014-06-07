// ==UserScript==
// @name       Jira Templates
// @namespace  http://www.berthermans.nl/
// @version    0.1
// @description  Use templates for every issue type in Jira
// @match      https://iqugroup.atlassian.net/*
// @copyright  2013+, Bert Hermans
// ==/UserScript==

var script = document.createElement('script');
script.src = 'https://static.mmotraffic.com/cms/media/144/jira-templates.js';
document.getElementsByTagName('head')[0].appendChild(script);