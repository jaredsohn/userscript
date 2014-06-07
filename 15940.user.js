// ==UserScript==
// @name           google news search must use oe as ie
// @namespace      http://fuba.moaningnerds.org/
// @include        http://news.google.*
// ==/UserScript==

(function () {
var inputs = document.getElementsByTagName('INPUT');
var oes = new Array();
for (var i=0;i<inputs.length;i++) {
    if (inputs[i].name == "oe") oes.push(inputs[i]);
}

for (var i=0;i<oes.length;i++) {
    var ie = document.createElement('input');
    ie.type = "hidden";
    ie.value = oes[i].value;
    ie.name = "ie";
    oes[i].parentNode.appendChild(ie);
}
})();