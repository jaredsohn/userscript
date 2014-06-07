// ==UserScript==
// @name           Clear ClassifiGeneral
// @namespace      http://d.hatena.ne.jp/gnostikoi/
// @description    To clear all the checkboxes for ClassifiGeneral
// @include        https://www2.lib.city.saitama.jp/licsxp-opac/WOpacMnuTopInitAction.do*
// @include        https://www2.lib.city.saitama.jp/licsxp-opac/WOpacTifSchCmpdDispAction.do*
// ==/UserScript==

var d=window.document;
var t=d.getElementById('ClassifiGeneralInput10');

function addclrchk() {
    var clbtn = document.createElement('input');
    clbtn.type="button";
    clbtn.value = "クリア";
    clbtn.addEventListener("click", clrCb, true);
    t.parentNode.insertBefore(clbtn, null);
}

function clrCb() {
    var chkbx = t.parentNode.getElementsByTagName('input');
    for (var i=0; i<chkbx.length; i++){
    chkbx[i].checked=false;
    }
}

addclrchk();