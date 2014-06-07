// ==UserScript==
// @name        RedMine fix reverted task properties
// @namespace   http://userscripts.org/users/536030
// @description Disable autocomplete on RedMine issue update form. Fixes http://www.redmine.org/issues/15125
// @version     1
// @grant       none
// ==/UserScript==

var form = document.getElementById("issue-form");
if (form)
    form.setAttribute("autocomplete", "off");
