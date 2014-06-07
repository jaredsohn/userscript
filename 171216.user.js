// ==UserScript==
// @name        Lavabit - select custom timezone
// @namespace   cid85
// @description Select a custom timezone on Lavabit.com webmail login page
// @include     https://lavabit.com/apps/webmail/src/login.php
// @version     1
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace("<option value=\"Europe/Vienna\">Europe/Vienna</option>", "<option value=\"Europe/Vienna\" selected>Europe/Vienna</option>");