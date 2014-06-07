// ==UserScript==
// @name        Hide Bitbucket .pbxproj diff
// @namespace   com.tgoode.greasemonkey.hidepbxprojdiff
// @description Hides the .pbxproj diff on Bitbucket Pull Requests
// @include     https://bitbucket.org/*/*/pull-request/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('                          \
section[data-filename*=".pbxproj"] {   \
    display:none;                      \
}                                      \
');
