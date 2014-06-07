// ==UserScript==
// @name           What.cd padawan
// @namespace      none
// @description    Replaces your invite count with the word "padawan" on what.cd. As a reference to Star Wars
// @include        http://what.cd/user.php?id*
// @include        https://ssl.what.cd/user.php?id*
// ==/UserScript==

function changePosts ()
{
document.body.innerHTML = document.body.innerHTML.replace("Invited:", "Padawans:");
}
window.addEventListener("load", function() { changePosts(); }, false);
