// ==UserScript==
// @name           Environment Canada Widescreen Weather
// @namespace      weather.gc.ca
// @description    Just the weather, please. Make Environment Canada weather pages better for wide-screen monitors.
// @include        http://weather.gc.ca/city/*
// @grant          GM_addStyle
// @version        1.2
// @copyright      2012-2013, malloc@userscripts.org 
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

GM_addStyle('\
div#gcwu-gcnb, div#gcwu-bnr-in, div.wet-boew-menubar.mb-mega, div.span-8.margin-bottom-none.banner, \
 div#gcwu-sft-in, div#gcwu-sft, div#gcwu-bc-in, div#gcwu-gcft-in { display: none !important; } \
');
