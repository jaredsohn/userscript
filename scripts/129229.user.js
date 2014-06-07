// Author: LL25255252 
// The script "centers" the hebrew/arabic text

// This script is a tweak of "Facebook - Fix RTL on Posts and Comments" (credit to Elad Ossadon) which aligns the text to the right(RTL) - http://userscripts.org/scripts/show/93225

The script is compatible with my Stylish scripts:
1. Facebook - Blue-Gray Background --> http://userstyles.org/styles/33437
2. Facebook - Large Text --> http://userstyles.org/styles/33602

// ==UserScript==
// @name              Facebook - "Center" Hebrew/Arabic Text
// @namespace         http://userstyles.org/users/14682
// @description       "centers" Hebrew/Arabic text of posts and comments
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// ==/UserScript==

var CSS="span[dir='rtl'] { display:block!important; text-align:center!important; }";
GM_addStyle(CSS);