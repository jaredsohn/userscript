/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            USO: Don't flag yourself
// @namespace       http://userscripts.org/users/12
// @description     Remove 'Flag Spam' button from your own posts
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL     https://userscripts.org/scripts/show/138063
// @downloadURL     https://userscripts.org/scripts/source/138063.user.js
// @updateURL       https://userscripts.org/scripts/source/138063.meta.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://userscripts.org/users/*/posts*
// @include         https://userscripts.org/topics/*
// @include         https://userscripts.org/posts*
// @include         http://userscripts.org/users/*/posts*
// @include         http://userscripts.org/topics/*
// @include         http://userscripts.org/posts*
// @include         http://userscripts.org./users/*/posts*
// @include         http://userscripts.org./topics/*
// @include         http://userscripts.org./posts*
// @include         http://greasefire.userscripts.org/users/*/posts*
// @include         http://greasefire.userscripts.org/topics/*
// @include         http://greasefire.userscripts.org/posts*
// @include         http://greasefire.userscripts.org./topics/*
// @include         http://greasefire.userscripts.org./posts*
// @grant           none
// ==/UserScript==

(function() {
  var loggedin = document.querySelector(".login_status a[href^='/home']");
  if (!loggedin) return;  // Not logged in.

  var user = document.querySelector("#section .container h2 a");
  if (user && (user.textContent === loggedin.textContent)) {
    var forms = document.querySelectorAll("#main .posts.wide .post.hentry form[action='/spam']");
    if (!forms.length) return;
    for (var i = 0; i < forms.length; i++) {
      forms[i].parentNode.removeChild(forms[i]);
    }
    return;
  }

  var users = document.querySelectorAll(".author.vcard a[href^='/users/']");
  if (!users.length) return;
  var form;
  for (var i = 0; i < users.length; i++) {
    if (users[i].textContent === loggedin.textContent) {
      form = users[i].parentNode.parentNode.querySelector("form[action='/spam']");
      form.parentNode.removeChild(form);
    }
  }
})()