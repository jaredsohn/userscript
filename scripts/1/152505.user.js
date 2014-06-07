// ==UserScript==
// @name         No Custom Subreddit CSS (anti-SRS)
// @description  Disable custom subreddit stylesheets
// @lastupdated  2012-11-15
// @version      1.1
// @license      Public Domain
// @include      http://*.reddit.com/r/shitredditsays*
// @include      http://*.reddit.com/r/srs*
// @include      http://*.reddit.com/r/commandline*
// @include      http://*.reddit.com/r/lolphp*
// @include      http://*.reddit.com/r/feminisms*
// @include      http://*.reddit.com/r/dataisbeautiful*
// @include      http://*.reddit.com/r/DebateCommunism*
// @include      http://*.reddit.com/r/BSG*
// @include      http://*.reddit.com/r/Economics*
// @exclude      http://*.reddit.com/r/srssucks*
// @grant        none
// ==/UserScript==

$('link[title="applied_subreddit_stylesheet"]').remove();
