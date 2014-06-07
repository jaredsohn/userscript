// ==UserScript==
// @name AutoReload
// @namespace Autor: hawk
// @namespace http://userscripts.org
// @description Autoreload mit einstellungsmoeglichkeiten fuer alle seiten
// @version 1.1
// @include http://*
// ==/UserScript==

// css-style in html einfuegen
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head') [0];
if (!head) { return; }
style = document.createElement('style') ;
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

// css haupt container
addGlobalStyle('div#ReloadMainDiv { position:fixed; bottom:0px; right:0px; width:180px; background:#000000; color:#ffffff; -moz-border-radius-topleft:10px; border: 2px solid yellow; z-index:10000; }')
addGlobalStyle('div#ReloadMainDiv { font-family:Verdana, Arial, sans-serif; font-weight:bold; font-size:10px; text-align:center; }')
addGlobalStyle('div#ReloadMainDiv span#AR_Set_Open { font-size:12px; cursor:pointer; }')
// css settings container
addGlobalStyle('div#ReloadSettingDiv { position:fixed; bottom:0px; right:0px; width:180px; background:#000000; color:#ffffff; -moz-border-radius-topleft:10px; border: 2px solid yellow; z-index:10000;')
addGlobalStyle('div#ReloadSettingDiv { font-family:Verdana, Arial, sans-serif; font-size:10px; text-align:center; }')
addGlobalStyle('#AR_Set_Set { color:#ffffff; font-size:12px; font-weight:bold; cursor:help; }')
addGlobalStyle('.AR_Text { color:#ffffff; font-size:10px; }')

// reloadangaben
// standart: ausgeschaltet und 60sec (60000)
var AutoReload = GM_getValue("AutoReloadIn" + location.protocol + location.host + location.path, false);

var AR_Zeit = GM_getValue("AR_ZeitIn" + location.protocol + location.host + location.path) ;
if (AR_Zeit == null){AR_Zeit = "60000";};

// optionen in dropdownbox
// auswahl 1min
if (AR_Zeit == 60000){
var RealodZeit60 = "<option selected value=\"60000\">1 Min</option>";
var ReloadMin = 1
}else{
var RealodZeit60 = "<option value=\"60000\">1 Min</option>";
};
// auswahl 2min
if (AR_Zeit == 120000){
var RealodZeit120 = "<option selected value=\"120000\">2 Min</option>";
var ReloadMin = 2
}else{
var RealodZeit120 = "<option value=\"120000\">2 Min</option>";
};
// auswahl 3min
if (AR_Zeit == 180000){
var RealodZeit180 = "<option selected value=\"180000\">3 Min</option>";
var ReloadMin = 3
}else{
var RealodZeit180 = "<option value=\"180000\">3 Min</option>";
};
// auswahl 4min
if (AR_Zeit == 240000){
var RealodZeit240 = "<option selected value=\"240000\">4 Min</option>";
var ReloadMin = 4
}else{
var RealodZeit240 = "<option value=\"240000\">4 Min</option>";
};
// auswahl 5min
if (AR_Zeit == 300000){
var RealodZeit300 = "<option selected value=\"300000\">5 Min</option>";
var ReloadMin = 5
}else{
var RealodZeit300 = "<option value=\"300000\">5 Min</option>";
};
// auswahl 6min
if (AR_Zeit == 360000){
var RealodZeit360 = "<option selected value=\"360000\">6 Min</option>";
var ReloadMin = 6
}else{
var RealodZeit360 = "<option value=\"360000\">6 Min</option>";
};
// auswahl 8min
if (AR_Zeit == 480000){
var RealodZeit480 = "<option selected value=\"480000\">8 Min</option>";
var ReloadMin = 8
}else{
var RealodZeit480 = "<option value=\"480000\">8 Min</option>";
};
// auswahl 10min
if (AR_Zeit == 600000){
var RealodZeit600 = "<option selected value=\"600000\">10 Min</option>";
var ReloadMin = 10
}else{
var RealodZeit600 = "<option value=\"600000\">10 Min</option>";
};

// dropdownbox zusammensetzen
var ReloadZeitOption = "" + RealodZeit60 + RealodZeit120 + RealodZeit180 + RealodZeit240 + RealodZeit300 + RealodZeit360 + RealodZeit480 + RealodZeit600 + "";
var AR_ZeitSelect = "<select class=\"AutoReloadTime\" name=\"AR_ZeitIn\">"+ReloadZeitOption+"</select>";

if (AutoReload == "true")
{window.setTimeout("location.reload()", AR_Zeit);}
else{};

if (AutoReload == "true")
{var AR_Anzeige = "<div id=\"ReloadMainDiv\"><span id=\"AR_Set_Open\">AutoReload <b>("+ReloadMin+" Min.)</b></span></div>";}
else
{var AR_Anzeige = "<div id=\"ReloadMainDiv\"><span id=\"AR_Set_Open\">AutoReload <b>(Aus)</b></span></div>";};
// div container erzeugen
var DocumentReloadDiv = document.createElement('div') ;
document.body.appendChild(DocumentReloadDiv);
// container befuellen
DocumentReloadDiv.innerHTML = ""+AR_Anzeige+"";

// optionsmenue nach klick aufrufen
document.getElementById("AR_Set_Open") .addEventListener('click', function AR_Set_Open () {

if (AutoReload == "true")
{var MAutoReload = "<span class=\"AR_Text\">AutoReload Einschalten:<input name=\"AutoReloadIn\" type=\"checkbox\" checked=\"checked\" /><br/>Alle </span>"+AR_ZeitSelect+"";}
else
{var MAutoReload = "<span class=\"AR_Text\">AutoReload Einschalten:<input name=\"AutoReloadIn\" type=\"checkbox\" /><br/>Alle </span>"+AR_ZeitSelect+"";};

var OAbbrechen = "<input type=\"submit\" class=\"formbutton\" id=\"AR_Set_Cancel\" value=\"Abbrechen\">";
var OSpeichern = "<input type=\"submit\" class=\"formbutton\" id=\"AR_Set_Save\" value=\"OK\">";

// div container erzeugen
var AR_O_Div = document.createElement('div') ;
document.body.appendChild(AR_O_Div);
// optionsmenue in html einfuegen
AR_O_Div.innerHTML = "<div id=\"ReloadSettingDiv\"><span id=\"AR_Set_Set\">Einstellungen</span><br/>"+MAutoReload+"<br/>"+OAbbrechen+OSpeichern+"</div>";

document.getElementById("AR_Set_Save") .addEventListener('click', function Schliessen () {

if (document.getElementsByName('AutoReloadIn') [0].checked == true)
{GM_setValue("AutoReloadIn" + location.protocol + location.host + location.path, "true") ;}else{GM_setValue("AutoReloadIn" + location.protocol + location.host + location.path, "false") ;}

GM_setValue("AR_ZeitIn" + location.protocol + location.host + location.path, document.getElementsByName('AR_ZeitIn') [0].value);

// klick speichern
window.location.reload();
},false);

// klick abbrechen
document.getElementById("AR_Set_Cancel") .addEventListener('click', function Schliessen () {
window.location.reload();
},false);

},false); 