// ==UserScript==
// @name           Change URL
// @namespace      Branden Guess
// @description    This will change the url of a download to a different url that you specify
// @include        http://www.example.com/download/*
// ==/UserScript==
document.location='http://(remote_computer:port)/download=' + document.location