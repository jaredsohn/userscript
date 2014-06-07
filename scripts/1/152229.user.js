// ==UserScript==
// @name        2chToLogsoku
// @namespace   ねこさん
// @include     */test/read.cgi/*
// @version     1
// ==/UserScript==
var URL=location.href;
var Access="http://logsoku.com/2ch.php?url="+URL;
location.href=Access;