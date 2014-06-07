// ==UserScript==
// @name           Remember the Milk Auto-login
// @namespace      http://userscripts.org
// @description    Automatically login to rememberthemilk.com once you visit their home page, ASSUMING YOUR BROWSER REMEMBERS AND FILLS IN YOUR USERNAME AND PASSWORD FOR YOU.
// @include        http://www.rememberthemilk.com/
// @include        http://www.rememberthemilk.com/login/
// ==/UserScript==

if(document.location.toString().indexOf("login") == -1 && document.referrer.indexOf("rememberthemilk.com/home") == -1)
	document.location = "http://www.rememberthemilk.com/login/";
else if(document.getElementById("username").value.length > 0 && document.getElementById("password").value.length > 0)
	document.forms[0].submit();