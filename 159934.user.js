/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            USO: Return to Y position after reporting spam
// @namespace       http://userscripts.org/users/12
// @author          LouCypher
// @version         1.0
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL     https://userscripts.org/scripts/show/159934
// @supportURL      https://userscripts.org/scripts/discuss/159934
// @downloadURL     https://userscripts.org/scripts/source/159934.user.js
// @updateURL       https://userscripts.org/scripts/source/159934.meta.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://userscripts.org/topics/*
// @include         https://userscripts.org/posts*
// @include         https://userscripts.org/users/*/posts*
// @exclude         https://userscripts.org/posts/search*
// @include         http://userscripts.org/topics/*
// @include         http://userscripts.org/posts*
// @include         http://userscripts.org/users/*/posts*
// @exclude         http://userscripts.org/posts/search*
// @grant           none
// ==/UserScript==

(function() {
  var doc = document, storage = sessionStorage;

  var y = storage.getItem("pageYOffset");
  if (y) {
    scrollTo(0, y);
    storage.removeItem("pageYOffset");
  }

  var notice = doc.querySelector("p.notice span");
  var postId = storage.getItem("postId");
  if (notice && postId) {
    var post = doc.querySelector("#posts-" + postId + " p.topic");
    storage.removeItem("postId");
    if (post) {
      var p = doc.createElement("p");
      p.className = "notice";
      p.textContent = notice.textContent;
      post.parentNode.insertBefore(p, post);
    }
  }

  var forms = doc.querySelectorAll("form[action='/spam']");
  if (!forms.length) return;
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function(e) {
      if (pageYOffset > 0) {
        storage.setItem("pageYOffset", pageYOffset);
        storage.setItem("postId", e.target.target_id.value);
      }
    }, false);
  }
})()