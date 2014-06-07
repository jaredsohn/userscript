// ==UserScript==
// @name        JWXT Restriction Blower for JNU
// @namespace   name.xen0n
// @description Removes all the nasty restrictions on jwxt pages.
// @include     http://jwxt.jiangnan.edu.cn/jndx/xsjxpj_znmz2.aspx*
// @include     http://202.195.144.163/jndx/xsjxpj_znmz2.aspx*
// @grant       none
// @version     1
// ==/UserScript==


// at require     http://userscripts.org/scripts/source/100842.user.js
//contentEval(function() {
  // enable tab key
  window.Keykz = function() {};
  // disable submit button hiding
  window.HidenTj = function() {};
  // disable non-empty check of feedback text
  window.CheckForm = function() {};
  // disable range check of grade numbers
  window.TextCheck = function(obj) { obj.value = parseFloat(obj.value); };
//});


// vim:ai:et:ts=2:sw=2:sts=2:ff=unix:fenc=utf-8: