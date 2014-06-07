// ==UserScript==
// @name           Codler - Metrobloggen
// @namespace      http://www.metrobloggen.se/codler
// @description    Improving metrobloggen.se
// @include        http://www.metrobloggen.se/*
// @include        http://metrobloggen.se/*
// ==/UserScript==

if(document.getElementById("formEpost")) {
window.document.getElementById("formEpost").value = "http://www.metrobloggen.se/codler";
}