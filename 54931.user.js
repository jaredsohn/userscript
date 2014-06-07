// ==UserScript==
// @name           Silence idleWarning
// @namespace      goodbarry.com
// @include        http://*.goodbarry.com/Admin/*
// ==/UserScript==

// Timeout @ 3600000 and idle warning @ 3000000
unsafeWindow.idleWarning = function() {
  var a = new Image();
  a.src = "/Utilities/ExtendSession.aspx";
  window.setTimeout("idleWarning()", 3000000)
};