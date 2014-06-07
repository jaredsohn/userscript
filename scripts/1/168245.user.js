// ==UserScript==
// @name          IEEExplore PDF frame view replacement
// @namespace   userscripts
// @include        http://ieeexplore.ieee.org/stamp/stamp.jsp*
// @description    This replaces IEEE's PDF frame view to direct PDF view.
// ==/UserScript==

function ieee_frame_replace() {
    document.location.href = document.location.href.replace("stamp/stamp", "stampPDF/getPDF");
}
ieee_frame_replace();