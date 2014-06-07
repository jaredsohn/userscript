// ==UserScript==
// @name           Slashdot - better ad removal
// @namespace      http://khopis.com/scripts
// @description    Remove ads and fix the spacing that was reserved for them
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.5
// @copyright      2008-9 by Adam Katz
// @license        AGPL v3
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2008-2009  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==
// This script compliments adblock plus, though it performs decently alone, too.

var ads = '';
for (var i=0; i<9; i++) { ads += "#fad" + i + ", #ad" + i + ", " }

GM_addStyle( ("\n" + ads + "#fad9, #ad9, .inlinead \n"
+ "               { display:none; }"       // kill ads and their spacing
+ "#indexhead     { padding-right:0; }"    // 1st articles were narrowed for ads
+ ".article, .storylinks { margin-right:0; }" // as above
+ "#slashboxes    { margin-top:0; }"       // slashboxes were lower for ad

// fix other spacing and flow issues (unrelated to ad removal)
+ "#links         { position:absolute; }"  // remove space above users' comments
+ "div.commentBody > div:first-child p \n"
+ "               { margin-top:1em; }"     // fix wrap for expnding comm
+ "div.commentBody > div:first-child > p:first-child \n"
+ "               { display:inline; }"     // fix wrap for expanding comments

).replace(/}/g, "}\n").replace(/;/g, "!important;") ); // it's all important!
