// ==UserScript==
// @name          Never remember e-mail or password for Hotmail
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   uncheckes labels to remember e-mail or password
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @version       1.0
// @include       https://login.live.com/*
// ==/UserScript==

document.getElementById('i0201').checked = false;
document.getElementById('i0202').checked = false;