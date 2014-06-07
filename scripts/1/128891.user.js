﻿﻿﻿/*

Following code belongs to Readibility Enhancer for Google+.
Copyright (C) 2012 Jackson Tan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             ReadibilityEnhancer
// @name           Readibility Enhancer for Google+
// @version        1.2.5
// @namespace      REGP
// @author         Jackson Tan
// @description    Improve Readibility for Google+.
// @include        https://plus.google.com/*
// @exclude        
// @run-at         document-end
// ==/UserScript==

var css1280 = "";
var css1366 = ".AOaixb.yRwDId.eub5Ne {\nright: -205px !important;\nz-index: 10;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n.AOaixb.yRwDId.eub5Ne:hover {\nright: 0px !important;-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n.k-B-yd-nb {\nwidth: 1200px !important;\n}\n\n.k-B-yd.tNsA5e-yd {\nfloat: right;\n}\n\n.ncGWdc {\nwidth: 896px !important;\n}\n\n.iH {\nwidth: 820px !important;\n}\n\n.e-dd {\nwidth: 820px !important;\n}\n\n.Te {\nwidth: 820px !important;\n}\n\n.L9ru2b.c-wa-Da {\nfloat: right;\n}\n\n.atQfbd {\ndisplay: none !important;\n}\n\n.EvUqIc.cm2O3c {\nright: 52px !important;\n}\n}";
var css1920 = ".yRwDId {\nleft: 100px !important;\n}\n\n.iH {\nwidth: 800px !important;\n}\n\n.atQfbd {\nbackground-color: transparent !important;\nborder: 0px solid #D7D7D7 !important;\n}\n\n.e-dd {\nwidth: 800px !important;\n}\n\n.KSB3fe {\nbackground-color: transparent !important;\n}\n\n.uBkbrd.D0jntb.cm2O3c.EvUqIc {\ndisplay: none !important;\n}\n\n.ZeMNWc {\nborder-right: 0px solid transparent !important;\nmargin: 0 252px 0 460px !important;\n}\n\n.k-B-fa-wf-mf {\nborder: 0px solid transparent !important;\n}\n\n.NeLhq {\nborder-bottom: 0px solid transparent !important;\n}\n\n.mxeerd {\nbackground-color: transparent !important;\n}\n\n.RazREb.ZI35oe {\nwidth: 880px !important;\n}\n\n.Te {\nwidth: 800px !important;\n}\n\n.USIcmb {\nbackground-color: transparent !important;\n}\n\n.fsfr2c.NeLhq {\nwidth: 800px !important;\n}\n\n.vI7nae.Xv6LFe {\nwidth: 830px !important;\n}\n\n#gbd1 {\nwidth: 830px !important;\n}\n\n#gbwc {\nright: 6px !important;\nwidth: 830px !important;\n}\n\n.SfBCie {\nborder: 0px solid transparent !important;\n}\n\n.N3caIc {\ndisplay: none !important;\n}\n\n.NeLhq, .GJLzkf, .az {\nbackground: transparent !important;\n}\n\n.pz {\nbackground-color: transparent !important;\nfloat: right !important;\nwidth: 1340px !important;\n}\n\n.UE {\nwidth: 790px !important;\n}\n\n.hsHREd {\nleft: 900px !important;\n}\n\n.vM91ad {\nleft: 70px !important;\nposition: initial !important;\n}\n\n.ekW7J, .uaHW5d {\nbackground-color: transparent !important;\n}\n\n.NeLhq, .GJLzkf {\npadding: 0 90px !important;\n}\n}";
var cssOther = "";

if ((screen.width == 1280) && (screen.height == 720)) {
GM_addStyle(css1280);
} 
else {
	if ((screen.width == 1366) && (screen.height == 768)) {
	GM_addStyle(css1366);
	} 
		else {
			if ((screen.width == 1920) && (screen.height == 1080)) {
			GM_addStyle(css1920);

		} else 
			{
			GM_addStyle(cssOther);
			}
		}
}