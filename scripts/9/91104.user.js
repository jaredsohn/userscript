// ==UserScript==
// @name           iPhone-Ticker.de Abgespeckt
// @description vergrößert die Schriftart und ermöglicht die Konzentration auf das Wesentliche
// @author         me
// @include        http://www.iphone-ticker.de/20*
// @version        1.0
// ==/UserScript==

GM_addStyle(" body {font-size:13px !important; line-height: 20px !important;} ");

GM_addStyle(" #post_icon_category, #social_twitter, #sidebar_container, #navigation, #leaderboard_728x90, #crossover_ifun, #crossover_iphoneticker { display: none; }");

GM_addStyle(" #header {width: 600px; height: 69px; margin: 0;} ");