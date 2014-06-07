// ==UserScript==
// @name		No Mobile Pages
// @namespace	https://userscripts.org/users/493847
// @version		1.0
// @description	Redirects m.example.com to example.com
// @include		*://m.*
// @run-at		document-start
// @copyright	2013 Pwnicorn
// @downloadURL	https://userscripts.org/scripts/source/173486.user.js
// @icon		http://i.imgur.com/lJcSjPv.png
// ==/UserScript==

window.location.href = window.location.href.split("://")[0]+"://"+window.location.href.split("://m.")[1];