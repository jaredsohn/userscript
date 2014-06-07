// ==UserScript==
// @name           Peoples.com Login Form Auto-Focus
// @namespace      http://hacsoft.org/
// @description    Puts the cursor into the username box automatically to speed up login.  Trivial, but I found it irritating.
// @include        https://pcb.peoples.com/peoples/login.aspx
// ==/UserScript==

document.getElementById("ctlSignon_txtUserID").focus();