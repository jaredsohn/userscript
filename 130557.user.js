// ==UserScript==
// @name           INTERNETSTAGRAM
// @namespace      http://userscripts.org/users/rws
// @description    hurr hipsters
// @include        *
// @version        1.3.2
// ==/UserScript==

var lol = (Math.random() < 0.5) ? "112, 66, 20" : "135, 169, 107";
var lolgrad = "linear-gradient(" + Math.floor(Math.random()*360) + "deg, rgba(" + lol + ",0.6) 0%, rgba(" + lol + ", 0." + Math.floor(Math.random() * 5 + 1) + ") 100%); ";

var lol = document.createElement("div");
lol.setAttribute("style","position: fixed; top: -30px; left: -30px; bottom: -30px; right: -30px; background: -moz-" + lolgrad + "background: -webkit-" + lolgrad + "background: -o-" + lolgrad + "background: " + lolgrad + "border: 60px solid #000; border-radius: 90px; z-index: 1000001; pointer-events: none;");
document.body.appendChild(lol);

var lol = document.createElement("div");
lol.setAttribute("style","position: fixed; top: 0; left: 0; width: 100%; height: 30px; background: url('http://i.imgur.com/YA4mu.png') center top no-repeat; z-index: 1000002; pointer-events: none;");
document.body.appendChild(lol);