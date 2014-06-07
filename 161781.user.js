// ==UserScript==
// @id            Allow_Font_Reize
// @name          Allow Font Resize
// @version       1.0
// @author        jmandel
// @description   Never permit webkit-text-size-adjust to be non-0
// @include       *://*/*
// ==/UserScript==
GM_addStyle("*{-webkit-text-size-adjust: auto !important}");
