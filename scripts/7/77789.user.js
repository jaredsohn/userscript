// ==UserScript==
// @name           4od_Automatic_Restricted_Confirm
// @namespace      dodgy_gr
// @version        0.2
// @description    Disables the Restricted Content Dialogue Box
// @include        http://www.channel4.com/programmes/*
// @history        0.2 Increased Age to 32
// @history        0.1 First and probably last release.
// ==/UserScript==

document.cookie="C4AccessControlCookie={'allowedToWatch':32}";