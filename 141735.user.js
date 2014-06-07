/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            USO: Tag Search Form
// @namespace       http://userstyles.org/users/12
// @description     Add search form on tags pages
// @author          LouCypher
// @version         1.0
// @license         WTFPL http://sam.zoy.org/wtfpl/
// @updateURL       https://userscripts.org/scripts/source/141735.meta.js
// @include         https://userscripts.org/tags
// @include         https://userscripts.org/tags/*
// @include         http://userscripts.org/tags
// @include         http://userscripts.org/tags/*
// @include         http://userscripts.org./tags
// @include         http://userscripts.org./tags/*
// @grant           none
// ==/UserScript==

(function() {
  var container = $("#section > .container");
  var section = container.insertBefore(document.createElement("div"),
                                       container.firstChild);
  section.id = "section_search";
  var form = section.appendChild(document.createElement("form"));
  form.innerHTML = '<input type="text" class="input"'
                 + ' name="tag" placeholder="tag"/>'
                 + '<input type="submit" value="" class="go"/>';

  form.addEventListener("submit", function(aEvent) {
    aEvent.preventDefault();
    var input = $("input[name='tag']", aEvent.target);
    if (input.value == "") return;
    location.href = "//" + location.hostname + "/tags/" + input.value;
  }, false);

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }
})()