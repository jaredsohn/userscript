// ==UserScript==
// @name    Travian Resource Information
// @version 1.0
// @include http://*.travian*.*/*
// ==/UserScript==

function ID(id) {
    return document
.getElementById(id)
};

function total(setId, IdNumber, TagNumber, FunctionName) {
    if (ID(setId)) { var E = ID(setId); E.parentNode.removeChild(E); };
    var res = parseInt(ID("l" + IdNumber).innerHTML.split("/")[0] - ID("l" + IdNumber).innerHTML.split("/")[1]);
    if (res < 0) {
        var Style = 'position: absolute; top: -11px; font-size: 12px; color: silver;';
        var sp = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        var X = ID("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[TagNumber]; ;
        X.innerHTML += '<div id="' + setId + '" style="' + Style + '">' + sp + sp + res + '</div>';
        setTimeout(FunctionName, 250);
    } 
};

function resA() {
    total("resA", "4", "0", resA);
};
function resB() {
    total("resB", "3", "2", resB);
};
function resC() {
    total("resC", "2", "4", resC);
};
function resD() {
    total("resD", "1", "6", resD);
};

window.onload = resA();resB();resC();resD();