// ==UserScript==
// @name           odnoklassniki.(ru|ua) loginform email autofill
// @namespace      http://userscripts.org/
// @description    automatically fills email into login form at odnoklassniki.(ru|ua)
// @include        http://odnoklassniki.ru/*
// @include        http://*.odnoklassniki.ru/*
// @include        http://odnoklassniki.ua/*
// @include        http://*.odnoklassniki.ua/*
// ==/UserScript==


function main() {
  var email = "email@email.com";

    var emailBox = document.getElementById("field_email");
    if (emailBox) {
      emailBox.value = email;
    }
    document.getElementById("field_password").focus();
}
main();
