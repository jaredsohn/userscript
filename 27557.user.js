// ==UserScript==
// @name           Bitty Browser + Gmail Addons
// @namespace      http://year2000prob.googlepages.com/
// @description    Adds Bitty Browser to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

GmailAddons.registerAddon({
  id: "bitty",
  name: "Bitty Browser",
  url: "http://b1.bitty.com/b2browser/",
  indicatorLabel: "Browser",
  height: 50
});