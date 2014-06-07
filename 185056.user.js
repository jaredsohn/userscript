// ==UserScript==
// @name        build.kde.org log highlighter
// @namespace   http://agateau.com/
// @description Highlight warnings and errors of build.kde.org build logs
// @include     http://build.kde.org/user/*/job/*
// @include     http://build.kde.org/job/*
// @version     1.1
// ==/UserScript==
var panel = document.getElementById("main-panel");

var elts = panel.getElementsByTagName("pre");

var warnRx = new RegExp(".*(QWARN|warning:).*", "g");
var errorRx = new RegExp(".*(FAIL|QFATAL|error:|make.*\\*\\*\\*).*", "g");

var warnRepl = "<font color='#a56725'>$&</font>";
var errorRepl = "<font color='red'>$&</font>";

for (var idx = 0; idx < elts.length; ++idx) {
    var elt = elts[idx];
    var text = elt.innerHTML;
    elt.innerHTML = text.replace(warnRx, warnRepl).replace(errorRx, errorRepl);
}
