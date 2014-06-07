// ==UserScript==
// @name        SpamCop App Tab helper
// @namespace   http://stiell.org/
// @description Avoid "No data" error upon browser restart.
// @author      Stian Ellingsen
// @license     http://creativecommons.org/publicdomain/zero/1.0/
// @version     0.1.0
// @match       *://*.spamcop.net/*
// ==/UserScript==

if (document.location.pathname == "/sc")
    history.replaceState(null, "", "/");
