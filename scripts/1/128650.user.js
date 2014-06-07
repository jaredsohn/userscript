// ==UserScript==
// @name         9gag Safe Mode Hider
// @namespace    com.shedosurashu.userscripts.9GagSafeModeHider
// @include      http://9gag.com/*
// @include      https://9gag.com/*
// @author       Shedo Surashu
// @description  This nifty little tool will hide the Safe Mode toggle on 9gag.
// @version 1.1
// ==/UserScript==

GM_addStyle(".safe-mode-toggle, .nsfw { visibility:hidden !important; }");
