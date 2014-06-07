// ==UserScript==
// @name          Bei-uns.de Seite editieren
// @description   Bearbeitet jede Seite von BU
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

function buedit()
{
document.body.contentEditable = 'true';
document.designMode = 'on';
void 0;
}

function bueditdone()
{
javascript: document.body.contentEditable = 'false';
document.designMode='on';
void 0;
}

var elm = document.getElementById("fusszeile");
var elm_parent = elm.parentNode;
var div13 = document.createElement("div");
elm_parent.insertBefore(div13, elm);

div13.innerHTML = '<div align="center"><input type=button OnClick="buedit();" value="Edit BU" name="Button1">';
div13.addEventListener("click", buedit, false);

var elm = document.getElementById("fusszeile");
var elm_parent = elm.parentNode;
var div12 = document.createElement("div");
elm_parent.insertBefore(div12, elm);

div12.innerHTML = '<div align="center"><input type=button OnClick="bueditdone();" value="Stop Edit" name="Button2">';
div12.addEventListener("click", bueditdone, false);
