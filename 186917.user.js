// ==UserScript==
// @name         GitHub Star Star Star
// @namespace    http://userscripts.org/users/laiso
// @description  Add star to the GitHub repository by automatic when you visit firstly.
// @include      https://github.com/*/*
// @run-at       document-end
// @version      0.0.1
// ==/UserScript== 

jQuery("a.unstarred").css("display") === "block" && jQuery("a.unstarred").click();

