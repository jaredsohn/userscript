// ==UserScript==
// @name        oligoAnalyzer Batch List Sequences
// @namespace   http://userscripts.org/users/505561
// @description make a list of sequences for more facility
// @include     http://eu.idtdna.com/analyzer/applications/oligoanalyzer/*
// @exclude     toto
// @version     1.01
// ==/UserScript==

function funcdesempiler() {
var montextarea = document.getElementById('maliste');
var valtextarea = montextarea.value;
l = valtextarea.split('\n');
var cible = document.getElementById("OligoAnalyzer_SequenceSettingsControl_tbSequence");
cible.value = l.pop();
montextarea.value = l.join('\n');
};

var form = document.createElement('form');
form.id = "monform";
var textarea = document.createElement('textarea');
textarea.id = "maliste"
textarea.cols = "50";
textarea.rows="10";
var btn = document.createElement('input');
btn.type='button';
btn.addEventListener("click", funcdesempiler, false);
btn.value = "Desempiler";
form.appendChild(textarea);
form.appendChild(btn);
var zone1 = document.getElementById('OligoAnalyzer_upAnalyzer');
var parentDiv = zone1.parentNode;
parentDiv.insertBefore(form, zone1);
