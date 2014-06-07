// ==UserScript==
// @name        JoplinGlobe De-Paywall
// @namespace   http://userscripts.org/scripts/show/185334
// @description Removes the Paywall from the Joplin Globes website
// @include     http://www.joplinglobe.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==
 GM_addStyle ( "                                     \
    #ta_background {                                   \
        display: none !important; \
    }                                               \
" );
