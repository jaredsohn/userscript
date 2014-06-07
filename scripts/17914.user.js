// ==UserScript==
// @name           arseblog menu mover
// @namespace      arseblog
// @description    Moves the navigation menu for Arseblog's new theme
// @include        http://www.arseblog.com/WP/index.php
// ==/UserScript==
GM_addStyle("#l_sidebar { float:right !important; border-right: 10px solid #C0C0C0 !important; }");
GM_addStyle("#contentmiddle { border-left: 10px solid #C0C0C0 !important; border-right: none !important; }");