// ==UserScript==
// @name           Don't alert when meebo closes
// @namespace      http://www.splintor.com/userscripts
// @description    When you close a meebo window, you get an alert. This script removes this warning.
// @include        http://www*.meebo.com/*
// ==/UserScript==


try { unsafeWindow.gLang.navigateAway = undefined; } catch(e) {}