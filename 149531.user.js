// ==UserScript==
// @name           IEEExplore PDF fix
// @include        http://ieeexplore.ieee.org/stamp/stamp.jsp*
// ==/UserScript==

var url;
url=window.location.href;
url=url.replace("stamp/stamp", "stampPDF/getPDF");
window.location.replace(url);