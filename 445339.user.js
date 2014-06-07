// ==UserScript==
// @name           Manga Eden New Tab Links
// @namespace      Ryan
// @description    Sets all manga and manga issue links to open in a new tab
// @include        http://www.mangaeden.com/*
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js
// ==/UserScript==

/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js" />
$("a")
  .filter(function () { return /en-manga\/[\w\-]+\/(?:\d+(?:[.]\d*?)*?\/)?$/.test(this.href); })
  .each(function (index) { $(this).attr({ title: "Opens in new tab", target: "_blank" }); });