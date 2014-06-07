// ==UserScript==
// @name        Rm Readonly x Claudio
// @namespace   http://zawardo.it
// @include     http://inlinea.provincia.mi.it/risp/web/editaudit.do?risp.request.idaudit*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==
$("input[id*='resp_manutentore']").attr("readOnly",false);
$("select[id*='resp_manutentore']").removeAttr('disabled');