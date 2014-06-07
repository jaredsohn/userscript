// ==UserScript==
// @name       Zoho.com login using Google OpenID
// @namespace  http://javlog.cacek.cz/
// @version    0.1
// @description Automatically submits OpenID login form from Zoho.com login page.
// @match      https://accounts.zoho.com/login*
// @copyright  2013+, Josef Cacek
// @run-at document-end
// ==/UserScript==

document.getElementById("google_open").click();