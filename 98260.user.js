// ==UserScript==
// @name Kill Sure Want To Nav Away
// @description    Kill "Are you sure you want to navigate away from this page|site" popups
// @include        http://*
// ==/UserScript==

location.href = "javascript:(" + function() {
  window.onbeforeunload = null;
  window.onunload = null;
} + ")()";
