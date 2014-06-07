// ==UserScript==
// @name          Reddit - BF3 Flair Linker
// @match         http://reddit.com/r/battlefield3*
// @match         https://reddit.com/r/battlefield3*
// @match         http://*.reddit.com/r/battlefield3*
// @match         https://*.reddit.com/r/battlefield3*
// @include        http://reddit.com/r/battlefield3*
// @include        https://reddit.com/r/battlefield3*
// @include        http://*.reddit.com/r/battlefield3*
// @include        https://*.reddit.com/r/battlefield3*
// @version       1.0
// ==/UserScript==

var f = document.querySelectorAll(".flair"); 
for(var i = 0; i < f.length; i++) { 
    var a = document.createElement("a");
    a.textContent = f[i].textContent;
    a.href = "http://battlelog.battlefield.com/bf3/user/" + f[i].textContent;
    a.style.color = "inherit";
    f[i].textContent = "";
    f[i].appendChild(a);
}