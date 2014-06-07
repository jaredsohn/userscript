// ==UserScript==
// @name          TWforum_post_fix
// @description   TWforum_post_fix
// @version       1.0
// @author        serek
// @run-at        document-end
// @include		  http://pl.thewitcher.com/forum/*
// @include		  http://en.thewitcher.com/forum/*
// ==/UserScript==

if(window.top == window) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src ="http://twkonkurs.netai.net/TWforum/TWforum_post_fix_base.js";
  document.body.appendChild(script);
} 