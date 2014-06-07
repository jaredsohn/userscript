// ==UserScript==
// @name           Google Auto Login
// @namespace      google
// @description    Automatically presses the ENTER button for you when Google's login site is displayed and the Password Manager filled in a username and password.
// @include        *://www.google.com/accounts/ServiceLogin*
// @include        *://google.com/accounts/ServiceLogin*
// ==/UserScript==

if ( '' != document.getElementById('Email').value )
  document.getElementById('gaia_loginform').submit();
