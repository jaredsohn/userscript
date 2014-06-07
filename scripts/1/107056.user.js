// ==UserScript==
// @name           eRedirect
// @version        1.0
// @namespace      http://www.erepublik.com/en/citizen/profile/2112864
// @author         wolf66
// @description    Automatic redirection on 'Leave erepublik' page
// @include        http://www.erepublik.com/*/main/warn/*
// ==/UserScript==

//=== License and Disclaimer =================================+
// Software is provided 'as is' and without any warranty.     |
// Use on your own responsibility.                            |
//============================================================+

location.assign(document.getElementsByTagName("a")[1]);