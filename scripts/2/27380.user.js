// ==UserScript==
// @name PMOG.com Header Spiffer
// @namespace http://userscripts.org/users/3034
// @description Sets PMOG headings to Blue Plate Special NF font to match the site's graphics (requires this font be active; it is available free from http://www.myfonts.com/fonts/nicksfonts/blue-plate-special-nf/blue-plate-special-nf/)
// @include http://pmog.com/*
// @include http://*.pmog.com/*
// ==/UserScript==

GM_addStyle('h1 { font-family: BluePlateSpecialNF; font-size: 30pt; line-height: 100%; font-weight: normal;}');
GM_addStyle('h2 { font-family: BluePlateSpecialNF; font-size: 26pt; font-weight: normal;}');
GM_addStyle('h3 { font-family: BluePlateSpecialNF; font-size: 18pt; line-height: 100%; font-weight: normal;}');
GM_addStyle('h4 { font-family: BluePlateSpecialNF; font-size: 16pt; font-weight: normal;}');

GM_addStyle('h2.caps { font-family: BluePlateSpecialNF; font-size: 14pt; line-height: 100%; font-weight: normal;}');

GM_addStyle('.user_profile_title_tab { font-family: BluePlateSpecialNF; font-size: 22pt; font-weight: normal;}');
GM_addStyle('.user_levelrep_h { font-family: BluePlateSpecialNF; font-size: 32pt; font-weight: normal;}');
GM_addStyle('.mission_section_tab { font-family: BluePlateSpecialNF; font-size: 16pt; font-weight: normal;}');
GM_addStyle('.forum_title { font-family: BluePlateSpecialNF; font-size: 42pt; line-height: 70%; font-weight: normal;}');
