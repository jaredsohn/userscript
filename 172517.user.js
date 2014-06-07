// ==UserScript==
// @name        Google "2-step verification" fix: Uncheck "don't ask".
// @namespace   http://mhulse.com
// @include     https://accounts.google.com/SmsAuth*
// @include     https://accounts.google.com/SecondFactor*
// @description When "2-step verfication" is turned on, this disables the "Don't ask for codes again on this computer" checkbox.
// @grant       none
// @version     2
// ==/UserScript==

document.getElementById("PersistentCookie").checked = false;
