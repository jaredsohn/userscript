// ==UserScript==
// @name           OnlineStreamRecorder: Nur eigene/nur fremde Aufnahmen anzeigen
// @namespace      http://www.n-regen.bplaced.de
// @description    Ermöglicht es dem Benutzer, wahlweise nur eigene, nur fremde oder alle Aufnahmen anzeigen zu lassen.
// @include        http://www.onlinetvrecorder.com/index.php?aktion=addstreams*
// ==/UserScript==

var row = document.getElementById("reiter1").parentNode.parentNode;

var tde = document.createElement("td");
var dive = document.createElement("div");
dive.style.marginLeft = "7px";
var inpute = document.createElement("input");
inpute.type = "checkbox";
if (GM_getValue("hideOwn", "0") == "1")
{
    inpute.checked = false;
} else {
    inpute.checked = true;
}
inpute.id = "showown";
inpute.addEventListener("click", function() {if (document.getElementById("showown").checked) {GM_setValue("hideOwn", "0"); for each (var styleblock in document.getElementsByTagName("style")) {if (styleblock.innerHTML.match(/tr.own/)){styleblock.innerHTML = "";}}} else { GM_setValue("hideOwn", "1"); style = document.createElement('style'); style.type = 'text/css'; style.innerHTML = "tr.own {display: none;}"; document.getElementsByTagName('head')[0].appendChild(style);}}, false);
var labele = document.createElement("label");
labele.htmlFor = "showown";
var labeltext = document.createTextNode(" Eigene Aufnahmen anzeigen");
row.appendChild(tde);
tde.appendChild(dive);
dive.appendChild(inpute);
dive.appendChild(labele);
labele.appendChild(labeltext);

var tde = document.createElement("td");
var dive = document.createElement("div");
dive.style.marginLeft = "7px";
var inpute = document.createElement("input");
inpute.type = "checkbox";
if (GM_getValue("hideForeign", "0") == "1")
{
    inpute.checked = false;
} else {
    inpute.checked = true;
}
inpute.id = "showforeign";
inpute.addEventListener("click", function() {if (document.getElementById("showforeign").checked) {GM_setValue("hideForeign", "0"); for each (var styleblock in document.getElementsByTagName("style")) {if (styleblock.innerHTML.match(/tr.foreign/)){styleblock.innerHTML = "";}}} else { GM_setValue("hideForeign", "1"); style = document.createElement('style'); style.type = 'text/css'; style.innerHTML = "tr.foreign {display: none;}"; document.getElementsByTagName('head')[0].appendChild(style);}}, false);
var labele = document.createElement("label");
labele.htmlFor = "showforeign";
var labeltext = document.createTextNode(" Fremde Aufnahmen anzeigen");
row.appendChild(tde);
tde.appendChild(dive);
dive.appendChild(inpute);
dive.appendChild(labele);
labele.appendChild(labeltext);

for each (var rowe in document.getElementById("tab1").getElementsByTagName("tr"))
{
    if (rowe.innerHTML.match(/aktion=addstreams.amp.delete/))
    {
        rowe.className = "own";
    } else {
        rowe.className = "foreign";
    }
}

for each (var rowe in document.getElementById("tab2").getElementsByTagName("tr"))
{
    if (rowe.innerHTML.match(/aktion=addstreams.amp.delete/))
    {
        rowe.className = "own";
    } else {
        rowe.className = "foreign";
    }
}

for each (var rowe in document.getElementById("tab3").getElementsByTagName("tr"))
{
    if (rowe.innerHTML.match(/aktion=addstreams.amp.delete/))
    {
        rowe.className = "own";
    } else {
        rowe.className = "foreign";
    }
}

if (GM_getValue("hideOwn", "0") == "1")
{
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "tr.own { display: none; }";
    document.getElementsByTagName('head')[0].appendChild(style);
}

if (GM_getValue("hideForeign", "0") == "1")
{
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "tr.foreign { display: none; }";
    document.getElementsByTagName('head')[0].appendChild(style);
}
