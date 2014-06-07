﻿/*

This code belongs to Google+ Fresh Edition.
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
// @id             GooglePlusFreshEdition
// @name           Google+ Fresh Edition
// @version        1.0.2
// @namespace      GPFE
// @author         Jackson Tan
// @description    Gives Google+ a larger space to display your stream. Remove useless items on your G+ page. 
// @include        https://plus.google.com/*
// @exclude        https://plus.google.com/photos
// @exclude	https://plus.google.com/circles/*
// @run-at         document-end
// ==/UserScript==

var css = "#gbqf {\ndisplay: none;\n}\n\n#gbx1, #gbx2 {\nheight: 0px;\nopacity: 0;\n}\n\n#gbx3 {\ndisplay: none;\n}\n\n#gbq {\nwidth: 0%;\n}\n\n#gb_8 {\ndisplay: none;\n}\n\n#gb_5 {\ndisplay: none;\n}\n\n#gb_24 {\ndisplay: none;\n}\n\n.k-Qf-YB-nb-dd {\ndisplay: none;\n}\n\n.HC{\ndisplay: none;\n}\n\n.a1CWdd {\ndisplay: none;\n}\n\n.Ie {\ndisplay: none;\n}\n\n.u7 {\ndisplay: none;\n}\n\n.Ela {\ndisplay: none;\n}\n\n.Dla {\ndisplay: none;\n}\n\n.Vp, .EZ {\ndisplay: none;\n}\n\n.c-i-Yd-V-xe{\ndisplay: none;\n}\n\n.xT {\ndisplay: none !important;\n}\n\n.k-Dj-zj {\ndisplay: none !important;\n}\n\n.k-vc-nb.k-Qf-vc-nb {\ndisplay: none !important;\n}\n\n.R3fLkb {\ndisplay: none !important;\n}\n\n.xg4qL {\ndisplay: none !important;\n}\n\n.c-wa-Da.b-a.b-a-G.RCYYkb.rm59s {\ndisplay: none !important;\n}\n\n.X6ysrb {\ndisplay: none !important;\n}\n\n.Om8HKf {\ndisplay: none !important;\n}\n\n.o1uJLe {\ndisplay: none !important;\n}\n\n.Dk2cHb.vOdz0d {\nheight: 0px !important;\n}\n}";

GM_addStyle(css);