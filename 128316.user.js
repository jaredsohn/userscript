/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            USO: Add install button on script pages
// @namespace       http://userscripts.org/users/12
// @version         2.5
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/COPYING
// @updateURL       https://userscripts.org/scripts/source/128316.meta.js
// @downloadURL     https://userscripts.org/scripts/source/128316.user.js
// @include         /^https?://(greasefire\.)?userscripts.org\.?/(reviews|scripts|topics)/.*$/
// @include         https://userscripts.org/scripts/*/*
// @include         http://userscripts.org/scripts/*/*
// @include         http://userscripts.org./scripts/*/*
// @include         http://greasefire.userscripts.org./scripts/*/*
// @include         https://userscripts.org/topics/*
// @include         http://userscripts.org/topics/*
// @include         http://userscripts.org./topics/*
// @include         http://greasefire.userscripts.org./topics/*
// @include         https://userscripts.org/reviews/*
// @include         http://userscripts.org/reviews/*
// @include         http://userscripts.org./reviews/*
// @include         http://greasefire.userscripts.org./reviews/*
// ==/UserScript==

(function(){
  var id = "install_script";
  var source = document.querySelector("#script-nav a[href^='/scripts/show/']");
  if (document.getElementById(id) || !source) return;

  var scriptId = source.href.match(/\d+/).toString();
  var div = document.createElement("div");
  div.id = id;
  div.innerHTML = '<a class="userjs" href="/scripts/source/'
                + scriptId + '.user.js">Install</a>'
                + '<a title="how to use greasemonkey" class="help" '
                + 'href="/about/installing">How do I use this?</a>';

  var heading = document.getElementById("heading");
  heading && heading.parentNode.insertBefore(div, heading.nextSibling);

  setTimeout(function(){
    var button = document.getElementById(id);
    if (button.textContent == "Deobfuscate") {
      div.insertBefore(button.firstChild, div.firstChild);
      button.parentNode.removeChild(button);
    }
  })
})()