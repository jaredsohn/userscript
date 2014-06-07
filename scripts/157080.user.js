// ==UserScript==
// @name       Online Scout Manager Disable Auto Logout
// @version    1
// @description  Disable auto-logout in Online Scout Manager
// @match      https://*.onlinescoutmanager.co.uk/*
// @copyright  2012+, Patabugen
// @run-at       document-idle
// ==/UserScript==

location.href = 'javascript:console.log(clearTimeout(globals.ping))';