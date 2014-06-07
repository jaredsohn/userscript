// ==UserScript==
// @name        Coastalwatch Plus auto-login
// @description This script remove the anooying and painful click you got to do when going to check the surf
// @version     0.1
// @include     https://plus.coastalwatch.com/account/login*
// ==/UserScript==

document.forms[1].Username.value = 'email'
document.forms[1].Password.value = 'password'
document.forms[1].submit();
