// ==UserScript==
// @name           Better OkCupid IM Windows
// @namespace      http://userscripts.org/users/swemoney
// @description    Make the OkCupid IM Windows suck less by removing the really stupid cell phone border. Also shrinks the window down a bit, makes text easier to read, and removes a couple ads that got in the way. (This script shouldn't be needed anymore since OkCupid seems to have fixed up their IM windows themselves.
// @version        1.1.1
// @include        http://www.okcupid.com/*
// @url http://userscripts.org/scripts/source/77278.user.js
// ==/UserScript==

GM_addStyle(".im_cap  {display:none !important;} "
          + ".im_tab  {padding:1px 8px 6px 8px !important; height: 10px !important} "
          + ".im_text {background:#ffffff !important;} "
          + ".im_to_me {color:#111111 !important;} "
          + ".im_from_me {#666666 !important;} "
          + ".im_to_me.archive {color:#FFBFFF !important;} "
          + ".im_from_me.archive {color:#FFDEFF !important;} "
          + ".im_wrapper {width:250px !important;} "
          + ".im_container {width:250px !important;} "
          + ".im_body input {width:233px !important;} "
          + ".im_body {padding:2px 3px !important;} "
          + ".im_text {height:125px !important;} "
          + ".im_tab, .im_body {background:#000000 !important;} " 
          + "#leaderboard {display:none !important;} "
          + ".okad {display:none !important;}");
