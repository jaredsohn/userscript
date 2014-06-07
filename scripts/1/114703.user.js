// ==UserScript==
// @name Auto AirBears for Chrome
// @description Automatically logs into UC Berkeley's AirBears network.  Written by Han Wei.
// @match http://wlan.berkeley.edu/login/*
// @match https://wlan.berkeley.edu/login/*
// @match https://wlan.berkeley.edu/cgi-bin/login/*
// ==/UserScript==
if (location.pathname === '/login/')
  document.forms[0].submit.click();
else if (location.pathname === '/cgi-bin/login/calnet.cgi' || location.pathname === '/cgi-bin/login/cookie.cgi')
  location.replace(document.links[1]);
