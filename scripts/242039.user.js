// ==UserScript==
// @name            Hackforums Thread Title Boldness Fixer [HFTTBF]
// @namespace       +mK or OMGWTFISTHIS
// @description     Fixes the fucking thread titles being unbold!
// @include         *hackforums.net/forumdisplay.php*
// @include         *hackforums.net/usercp.php*
// @include         *hackforums.net/search.php*
// @version         1.1
// ==/UserScript==



GM_addStyle(
".subject_new, a.subject_new {font-weight: bold; !important;}"
    );