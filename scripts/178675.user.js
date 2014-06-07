// ==UserScript==
// @name Trello Superb
// @description geat theme for Trello (just need in addition to install Duepuntozero free font)
// @author Pierre L'Huillier
// @include http://trello.com/*
// @include https://trello.com/*
// @include http://*.trello.com/*
// @include https://*.trello.com/*
// @run-at document-start
// ==/UserScript==

(function() {
var css = "html, body, input, select, textarea {font-size: 13px !important; } \n\n\n#board-header .board-name {font-family:'Duepuntozero' !important; font-size:25px!important; color:#C7621F!important;} \n\n.list-card a {\n font-family:'Duepuntozero'!important;\n font-size:16px;\n font-weight:500;\n} \n\n.list-title h2 {\n font-size:25px!important; \n color:#1F86C8!important; \n} \n\n.list-title {\n text-align:center!important; \n font-family:'Duepuntozero'!important; \n} \n\n.list-card.selected, .list-card.active-card { \n background: #91CCF1 !important; \n box-shadow: none !important;\n } ";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
heads[0].appendChild(node);
} else {
// no head yet, stick it whereever
document.documentElement.appendChild(node);
}
}
})();

GM_addStyle (".search-result-card .card-label, .list-card-area .card-label { min-height: 8px; max-width: 30px; background-repeat: no-repeat; background-position:center center; }");
GM_addStyle (".pop-over-label-list .card-label, .relative .card-label { background-repeat: no-repeat; background-position:center center; }");
GM_addStyle (".edit-labels-pop-over .card-label { background-repeat: no-repeat; background-position:5px center; padding-left: 25px; }");
GM_addStyle (".card-label-list .card-label { background-repeat: no-repeat; background-position:5px center; padding-left: 25px ! important; }");
GM_addStyle (".list-card { box-shadow: inset 1px 1px 1px rgba(10,10,10,0.7); }");
GM_addStyle (".card-label { box-shadow: 1px 1px 1px rgba(10,10,10,0.5); border: solid 1px #606060; }");
GM_addStyle (".ui-sortable-helper .card-label { background-image:none ! important; }");
GM_addStyle (".card-operation.icon-sm.icon-menu.dark-hover.js-card-menu { background-color: transparent; }");