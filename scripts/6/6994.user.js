// ==UserScript==
// @name          Ap3.ee frame remover
// @namespace     http://userscripts.org/
// @description	  Removes (actually hides) the frame from pages opened on Ap3.ee
// @include       http://www.ap3.ee/*
// ==/UserScript==

(function() {
parent.document.body.rows = "1,*";
})();