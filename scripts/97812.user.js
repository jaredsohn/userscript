// ==UserScript==
// @name          Mooshak
// @namespace     http://mooshak.deei.fct.ualg.pt/~mooshak/
// @description   Mooshak New 
// @include       http://mooshak.deei.fct.ualg.pt/~mooshak/*
// @version       0.0.1
// ==/UserScript==

var x=document.getElementsByName("contest")[0];
var txt="Concursos: ";
var i;
for (i=0;i<9;i++) {
    txt=txt + "\n" + x[i].value;
}
alert(txt);
document.writeln("<div style='position: absolute; top: 10px; left: 10px;'>"+txt+"</div>");