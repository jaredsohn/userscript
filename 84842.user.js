// ==UserScript==
// @name           DepositFiles Downloader
// @namespace      Badmash Ankit
// @description    Downloads from Depositfile
// @include        http://depositfiles.com/*
// ==/UserScript==
var link = document.forms[1].action;
window.location = link;