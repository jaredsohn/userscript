// ==UserScript==
// @name          Facebook login
// @namespace     http://jeffpalm.com/facebooklogin/
// @description   Automatically submits the login form for facebook so you don't have to click it.
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/index.php*
// @include       http://www.facebook.com/index.php*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */


function main() {
  
  // First check if we have a form to submit
  var login = document.getElementById('menubar_login');
  if (!login) return;

  // See if we've filled in the email
  var email = document.getElementById('email');
  if (email) email = email.value;
  if (!email) return;

  // See if we've filled in the password
  var passw = document.getElementById('pass');
  if (passw) passw = passw.value;
  if (!passw) return;

  // Now, submit the form
  login.submit();

}

main();
