// ==UserScript==
// @name           Greasemonkey Search
// @namespace      bamaplaya1
// @description    will search userscripts.org for a desired script
// @include        http://goallineblitz.com*
// ==/UserScript==

document.getElementById('footer').innerHTML = '<form method="get" action="http://userscripts.org/scripts/search"><input type="text" name="q" size="31" maxlength="255" value=""><input type="submit" value="Userscripts Search"></form>';