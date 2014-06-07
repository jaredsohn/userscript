/*

This code is belong to Google+ Large Avatars.
Copyright (C) 2012 Jackson Tan
Copyright (C) 2012 Simon Chan
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
// @id             LargeAvartars
// @name           Google+ Large Avatars
// @version        1.9.5
// @namespace      
// @author         CSS: Jackson Tan JS: Simon Chan
// @description    Repleace all avatars with their HD version and display them on your G+.
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

var css = ".k-pu-NS {\nheight: 72px !important;\nmargin-right: 10px !important;\nwidth: 72px !important;\n}\n\n.Wl .tg {\nheight: 69px !important;\nmargin-left: -74px !important;\nwidth: 69px !important;\n}\n\n.Yl {\nheight: 48px !important;\nwidth: 48px !important;\nmargin: 0 6px 0 0 !important;\n}\n\n.hf.tg, .hf.sf {\nheight: 42px !important;\nmargin-top: -3px !important;\nmargin-left: -46px !important;\nwidth: 42px !important;\n}\n\n.Rb .Wl .tg, .Rb .Wl .sf {\nmargin-left: -42px !important;\n}\n\n.Rb .ug, .Rb .hf {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.Rb .We {\nmargin-left: 0px !important;\n}\n\n.gemAid {\nmargin-left: 46px;\n}\n\n.lzqA1d .gemAid {\nmargin-left: 0px; !important\n}\n\n.k-uH-MHYjYb-yd .gemAid {margin-left: 0px !important;\n}\n\n.Rb .Ul.We {\nmargin-left: -46px !important;\n}\n\n.k-Ja-Qh, .k-Ja-Rh {\nwidth: 32px !important;\nheight: 32px !important;\n}\n\n.k-Ja-Qh:nth-child(1) {\npadding-top: 0px;\npadding-right: 0px;\n}\n\n.k-Ja-Qh:nth-child(1), .k-Ja-Qh:nth-child(1) .k-Ja-Rh {\nheight: 86px !important;\nwidth: 86px !important;\n}\n\n.k-Ja-Qh:nth-child(2) {\npadding-top: 0px;\n}\n\n.k-Ja-Qh:nth-child(2),\n.k-Ja-Qh:nth-child(2) .k-Ja-Rh\n{\nheight: 86px !important;\nwidth: 86px !important;\n}\n\n.k-Ja-Qh:nth-child(3) {\npadding-top: 0px;\n}\n\n.k-Ja-Qh:nth-child(3),\n.k-Ja-Qh:nth-child(3) .k-Ja-Rh\n{\nheight: 57px !important;\nwidth: 57px !important;\n}\n.k-Ja-Qh:nth-child(4),\n.k-Ja-Qh:nth-child(4) .k-Ja-Rh\n{\nheight: 57px !important;\nwidth: 57px !important;\n}\n.k-Ja-Qh:nth-child(5),\n.k-Ja-Qh:nth-child(5) .k-Ja-Rh\n{\nheight: 57px !important;\nwidth: 57px !important;\n}\n\n.k-Ja-Qh:nth-child(6),\n.k-Ja-Qh:nth-child(6) .k-Ja-Rh\n{\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(7),\n.k-Ja-Qh:nth-child(7) .k-Ja-Rh\n{\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(8),\n.k-Ja-Qh:nth-child(8) .k-Ja-Rh\n{\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(9),\n.k-Ja-Qh:nth-child(9) .k-Ja-Rh\n{\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(10),\n.k-Ja-Qh:nth-child(11),\n.k-Ja-Qh:nth-child(12),\n.k-Ja-Qh:nth-child(13),\n.k-Ja-Qh:nth-child(14)\n{\nheight: 34px !important;\nwidth: 34px !important;\n}\n}";

GM_addStyle(css);

function replaceImg(target) {
    if (target && target.src) {
        var distHeight = target.clientHeight != 0 ? target.clientHeight * 2 : 64;
        target.src = target.src.replace(/s\d{2,}-c-k/g, 's' + distHeight + '-c-k');
        return target.src;
    }
}

function batchReplace(targets) {
    if (targets && targets.length)
        for (var i = 0; i < targets.length ; i++)
            replaceImg(targets[i]);
}

//Speacial preprocessing for Webkit Browsers.
batchReplace(document.body.getElementsByClassName('tg'));

var intervalID = setInterval(function () {
    if (!replaceImg(document.getElementsByClassName('k-pu-NS')[0]))
        clearInterval(intervalID);
}, 1000);

document.body.addEventListener('DOMNodeInserted', function (e) {
    if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
        batchReplace(e.target.getElementsByClassName('tg'));
        batchReplace(e.target.getElementsByClassName('k-Ja-Rh'));
    }
}, false);