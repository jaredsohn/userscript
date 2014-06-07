// Remove Serienjunkies' Rapidshare Frame user script
// version 0.1
// 2009-07-12
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Remove Serienjunkies Rapidshare Frame
// @namespace      http://userscripts.org/users/neander
// @description    Removes the frame that Serienjunkies.org places around Rapidshare sites. Based on  Thomas Dippel's "Remove Facebook Frame user script".
// @include        http://download.serienjunkies.org/*
// ==/UserScript==
var Frame = document.getElementsByName('main')[0];
window.location.href = Frame.src;