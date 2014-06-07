/*

Following code belongs to Black Navigation Bar for Google.
Copyright (C) 2013 Jackson Tan

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
// @id             BlackNavGoogle
// @name           Black Navigation Bar for Google
// @version        1.8.6
// @namespace      BNG
// @author         Jackson Tan
// @description    Helps you restore the original version of black navigation bar on Google+, Gmail and Google Search.
// @include        https://plus.google.com/*
// @include        https://www.google.com/*
// @include        http://www.google.com/*
// @include        https://mail.google.com/*
// @exclude        
// @run-at         document-end
// ==/UserScript==

GM_addStyle = function (css) {
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) { return }
    style.type = 'text/css';
    try { style.innerHTML = css } catch (x) { style.innerText = css }
    head.appendChild(style);
}

if (document.URL.match(/https:\/\/www\.google\.com?/) || document.URL.match(/http:\/\/www\.google\.com?/) || document.URL.match(/https:\/\/mail\.google\.com?/)) {
    var css = "#gbzw {\nmargin-left: 0px !important;\n}\n\n#gbz .gbzt, #gbz .gbgt {\nfont-weight: normal !important;\n}\n\n#gbz .gbts {\npadding: 0 5px !important;\n}\n\n#gbu {\ntop: 0px !important;\npadding-top: 2px !important;\nz-index: 991 !important;\nposition: fixed !important;\n}\n\n#gbi4t {\ncolor: #CCC !important;\n}\n\n#gbx3, #gbx4 {\nheight: 32px !important;\n}\n\n#gbzw .gbt {\nline-height: 29px !important;\n}\n\n.k-YB-nb-Zg {\nposition: absolute !important;\n}\n\n#gbzw {\nposition: fixed !important;\n}\n\n#gbx3 {\nposition: fixed !important;\n}\n\n.gbqldr {\nmax-height: 98px !important;\n}\n\n.gbg4p {\nmargin-top: -1px !important;\n}\n\n#gbgs4 {\nheight: 28px !important;\nwidth: 28px !important;\n}\n\n#gbi4i, #gbi4ip {\nheight: 28px !important;\nwidth: 28px !important;\n}\n\n.gbmab {\nmargin: 41px 0 0 !important;\n}\n\n.gbmac {\nmargin: 42px 0 0 !important;\n}\n\n.gbmai {\nleft: 40px !important;\ntop: 15px !important;\n}\n}";

    GM_addStyle(css);
}

if (document.URL.match(/https:\/\/plus\.google\.com?/)) {

    //document.getElementById("gbqld").src="https://lh3.googleusercontent.com/-TjxB63logDQ/T2jy2-uoWmI/AAAAAAAACr4/su0DlngJrDs/s294/logobleed.png";
    var css = "#gbgs1 {\ntop: auto !important;\n}\n\n#gbzw {\nmargin-left: 0px !important;\n}\n\n#gbz .gbzt, #gbz .gbgt {\nfont-weight: normal !important;\n}\n\n#gbz .gbts {\npadding: 0 5px !important;\n}\n\n#gbu {\ntop: 0px !important;\npadding-top: 7px !important;\nz-index: 991 !important;\nposition: fixed !important;\n}\n\n#gbi4t {\ncolor: #CCC !important;\n}\n\n#gbx3, #gbx4 {\nheight: 32px !important;\n}\n\n#gbzw .gbt {\nline-height: 29px !important;\n}\n\n.k-YB-nb-Zg {\nposition: absolute !important;\n}\n\n#gbzw {\nposition: fixed !important;\n}\n\n#gbx3 {\nposition: fixed !important;\n}\n\n.gbqldr {\nmax-height: 98px !important;\n}\n\n.gbg4p {\nmargin-top: -1px !important;\n}\n\n#gbgs4 {\nheight: 28px !important;\nwidth: 28px !important;\n}\n\n#gbi4i, #gbi4ip {\nheight: 28px !important;\nwidth: 28px !important;\n}\n\n.gbmab {\nmargin: 41px 0 0 !important;\n}\n\n.gbmac {\nmargin: 42px 0 0 !important;\n}\n\n.gbmai {\nleft: 40px !important;\ntop: 15px !important;\n}.wY5tt {\nbackground-color: transparent !important;\nborder-right: solid 0px transparent !important;\n}\n\n.KTzH3 {\nbackground-color: transparent !important;\n}\n\n.wJHyif {\nbackground-color: transparent !important;\nborder-bottom: solid 0px transparent !important;\n}\n\n.ZpbLFf {\nbackground-color: transparent !important;\n}\n\n.AYoUUe.Lr1ucd, .dFEfVe.Lr1ucd {\ntop: 0px !important;\n}\n\n.K9UU0 .g-Ua-z9.YXXdGb {\nbackground-color: transparent !important;\n}\n\n.K9UU0 .g-Ua-z9 {\nbackground-color: transparent !important;\n}\n\n.K9UU0 {\nbackground-color: transparent !important;\n\n}\n\n.qibAV {\nbackground-color: rgba(255,255,255,0.6) !important;\n}\n\n.heaJh {\nbackground-color: transparent !important;\n}\n\n.tCa .a-u-q-b {\nbackground-color: transparent !important;\n}\n}";

    var css2 = ".NRa {\nz-index: auto !important;\n}\n\n.Dob, .gFjvW {\nheight: 0 !important;\n}\n\n#gbg6 {\ndisplay: none !important;\n}\n\n.wC {\nmargin-top: -22px !important;\n}\n\n#gbq1 {\ndisplay: none !important;\n}\n\n#gbq2 {\ndisplay: none !important;\npadding-top: 0px !important;\npadding-left: 260px !important;\nwidth: 250px !important;\nmargin-top: -16px !important;\n}\n\n#gbqfbw {\nmargin: 0 2px !important;\n}\n\n.wl.cVa.V9 {\ndisplay: none !important;\n}\n\n#gbx1 {\nheight: 0px !important;\nborder-bottom: 0px !important;\n}\n\n#gbz {\nwidth: 2560px !important;\nheight: 32px !important;\nbackground-color: black !important;\ntop: -30px !important;\n-webkit-transition:all 0.5s linear;\n-moz-transition:all 0.5s linear;\n-o-transition:all 0.5s linear;\n}\n\n#gbz:hover {\ntop: 0px !important;\n-webkit-transition:all 0.5s linear;\n-moz-transition:all 0.5s linear;\n-o-transition:all 0.5s linear;\n}\n\n#gbx3 {\ndisplay: none !important;\n}\n\n.k-Qf-YB-nb-dd {\nmargin-top: -80px; !important;\n}\n\n#gbbw {\ntop: 164px !important;\n}\n\n.Lg {\nleft: 0px !important;\nposition: relative !important;\n}\n\n.Tl.DAa.jaa, .wdb, .vdb, .ndb, .Pdb, .Odb {\ndisplay: none !important;\n}\n\n.KTa {\nborder: 0px solid #D7D7D7 !important;\n}\n\n.K9 {\nborder-right: 1px solid #D7D7D7 !important;\n}\n\n.NTa {\nborder-bottom: 0px solid #D7D7D7 !important;\n}\n\n.TDa, .WDa {\nborder-top: 0px solid #D7D7D7 !important;\nborder-left: 0px solid #D7D7D7 !important;\n}\n\n.UDa, .XDa {\nborder-top: 0px solid #F1F1F1 !important;\nborder-right: 0px solid #F1F1F1 !important;\n}\n\n.K9 {\nborder-right: 0px solid #D7D7D7 !important;\n}\n\n.pu {\nborder-bottom: 0px solid #D7D7D7 !important;\n}\n}";

    var css3 = ".Bla.gS, .Ep, .ag, .fK, .Zb, .Rf {\nborder-radius: 50% !important;\n}\n\n.roster_row>button>img, .Yka {\nborder-radius: 50% !important;\n}\n\n.Ub {\nborder-radius: 50% !important;\n}\n\n.om {\nborder-radius: 50% !important;\n}\n\n.gbem#gb, .gbemi#gb {\nheight: 0 !important;\n}\n\n#gb {\nheight: 0 !important;\n}";

    var css4 = ".Um8btf {\nbackground-color: #fff !important;\n-webkit-transform: translateZ(0) !important;\n-moz-transform: translateZ(0) !important;\ntransform: translateZ(0) !important;\nposition: fixed !important;\n-webkit-transition: top .15s !important;\n-moz-transition: top .15s !important;\ntransition: top .15s !important;\n}\n\n.iYjCM {\nbackground-color: #fff !important;\n-webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.15) !important;\n-moz-box-shadow: 0 2px 4px 0 rgba(0,0,0,.15) !important;\nbox-shadow: 0 2px 4px 0 rgba(0,0,0,.15) !important;\n-webkit-transform: translateZ(0) !important;\n-moz-transform: translateZ(0) !important;\nleft: 1px !important;\nposition: fixed !important;\nright: 0 !important;\ntop: 0 !important;\n}\n\nXXuWB.iYjCM.Jf7Uxf.gIdB1, .IvwRoc.Um8btf.SfVZpc {\ntop: 0 !important;\n}\n\n.pdsQUd.vqlG.WrxPu.CVep0d {\nmargin-top: 0 !important;\n}\n\n.Dd.Ofc.ULec3c {\ntop: 0 !important;\n}\n\n.oBgpme.ODc6zb.AYoUUe {\ntop: 44px !important;\n}\n}"

    GM_addStyle(css);
    GM_addStyle(css2);
    GM_addStyle(css3);
    GM_addStyle(css4);
}