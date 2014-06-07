// ==UserScript==
// @name Auto AirBears
// @description Automatically log into UC Berkeley's AirBears network.  Originally written by Han Wei for Google Chrome; converted to work with Greasemonkey by Wayne Song.
// @include http://wlan.berkeley.edu/login/*
// @include https://wlan.berkeley.edu/login/*
// @include https://wlan.berkeley.edu/cgi-bin/login/*
// ==/UserScript==
if (location.pathname === '/login/')
  document.forms[0].submit();
else if (location.pathname === '/cgi-bin/login/calnet.cgi' || location.pathname === '/cgi-bin/login/cookie.cgi')
  location.replace(document.links[1]);
