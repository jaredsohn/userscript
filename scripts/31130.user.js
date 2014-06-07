// ==UserScript==
// @name           automatic page width on UserAgentString.com
// @include        http://www.useragentstring.com/pages/useragentstring.php?name=*
// @description    automatic page width on "UserAgentString.com - List of [browser] User Agent Strings" pages.
// ==/UserScript==
document.getElementById("kasten").style.width="auto"
document.getElementById("kasten").style.left="0"