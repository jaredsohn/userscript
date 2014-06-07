// ==UserScript==
// @name           Xkeeper's Goggles
// @namespace      http://userscripts.org/users/124757
// @description    Mysterious goggles that let you see hidden snarky comments in people's Jul posts. Like They Live, but more mundane.
// @include        *
// ==/UserScript==

document.getElementsByTagName("BODY")[0].innerHTML = document.getElementsByTagName("BODY")[0].innerHTML.replace(/<!--(.*?)-->/g, "<span style=\"color: #80ff80; text-shadow: #000000 0 0 1px;\">&lt;-- $1 --&gt;</span><br />");