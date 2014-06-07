// ==UserScript==
// @name              Myspace Heading
// @creator           LordLoss
// @description       Change your myspace heading to what you want it to say.
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==


html = document.body.innerHTML.replace(/Hello,/, "Ello,"); 
document.body.innerHTML = html;

GM_addStyle(s);
