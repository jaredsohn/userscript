// ==UserScript==
// @name           CBS Auto Refresh
// @namespace      http://chalkstunts.com/forum/viewtopic.php?f=9&t=599#p5464
// @creator        Nemo
// @include        http://chalkstunts.com/forum/*
// @include        http://www.chalkstunts.com/forum/*
// @exclude        http://chalkstunts.com/forum/posting.php*
// @exclude        http://www.chalkstunts.com/forum/posting.php*
// @exclude        http://chalkstunts.com/forum/ucp.php*
// @exclude        http://www.chalkstunts.com/forum/ucp.php*
// @exclude        http://chalkstunts.com/forum/mcp.php*
// @exclude        http://www.chalkstunts.com/forum/mcp.php*
// @exclude        http://chalkstunts.com/forum/adm/*
// @exclude        http://www.chalkstunts.com/forum/adm/*
// ==/UserScript==
var minutesbetweenreloads = 2
setTimeout(function() { document.location.reload(); } , (minutesbetweenreloads*60000));
