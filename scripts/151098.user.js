// ==UserScript==
// @name           smthredirect
// @namespace      joyfun.net
// @description    too old theme
// @include        http://www.newsmth.net/nForum/*
// ==/UserScript==
var ourl = window.location.href;
var reg = new RegExp("http://www.newsmth.net/nForum/#!article/(\\w+)/(\\d+)\?.*");
var bid = ourl.match(reg)[1];
var aid = ourl.match(reg)[2];
var nurl="http://www.newsmth.net/bbstcon.php?board="+bid+"&gid="+aid;
window.location=nurl;