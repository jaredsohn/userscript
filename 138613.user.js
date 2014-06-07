// ==UserScript==
// @name        Readability auto-click save to reading list
// @namespace   http://www.michaelpollmeier.com
// @description Clicks on 'Yes, save to my Reading list' automatically
// @include     https://www.readability.com/save?url=*
// @version     1
// ==/UserScript==

document.getElementsByTagName('form')[0].submit();
