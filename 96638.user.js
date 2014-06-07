// ==UserScript==
// @name           eRT+
// @version        0.1
// @namespace      http://facebook.com/seadused/
// @include        https://www.riigiteataja.ee/akt/*
// @match          https://www.riigiteataja.ee/akt/*
// @copyright      (C) 2011 Peeter P. Mõtsküla <peeterpaul@motskula.net>
// @license        GPLv3+ (http://www.gnu.org/licenses/gpl.html)
// @description    eRT+ hoiab õigusakti sisukorra elektroonilises Riigi Teatajas pidevalt nähtaval ja võimaldab akti välja trükkida koos sisukorraga. Seda kõike eeldusel, et kasutad Mozilla Firefox'i koos GreaseMonkey laiendusega või Google Chrome'i.
// ==/UserScript==

// asendame sisukorras "Peida" viitega wLex-ile
var elm = document.getElementById("contents-close");
elm.innerHTML = '<a href="http://facebook.com/seadused">eRT+</a>';

// lehekülje päis (<head>...</head>) edaspidi kasutamiseks
var docHead = document.getElementsByTagName('head')[0];

// tühjendame sisukorra peitmise skripti
var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = "function contentsHide() {}";
docHead.appendChild(script);

// muudame stiile, hoidmaks sisukorra nii ekraanil kui trükis nähtaval
var style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = "\
@media screen {\
  #content {\
    margin-right: 0;\
    margin-left: auto;\
    width: 620px;\
  }\
  #toolbar, #content h1.fixed, #content ul.tabs {\
    margin-left: -340px; width: 960px;\
  }\
}\
@media print {\
  #article-sidebar {\
    display: block !important;\
    position: static !important;\
    height: auto !important;\
    page-break-after: always;\
  }\
  #article-sidebar a:link, #article-sidebar a:visited {\
    text-decoration: none;\
  }\
}\
";
docHead.appendChild(style);

// käivitame sisukorra vertikaalsuuruse arvutamise lehe laadimisel
// (sisuliselt samaväärne klõpsamisega sisukorra näitamise nupul)
var p = unsafeWindow;
if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    p = div.onclick();
};
p.contentsShow.clickIt();
