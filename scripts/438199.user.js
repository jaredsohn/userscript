// ==UserScript==
// @name       babbel_for_notebooks.tamper.js
// @namespace  http://www.userscripts.org/thor
// @version    0.8.9.3
// @description  This script is used for www.babbel.com. I need it for using the function 'repeating manager' on a small notebook monitor. My aim was to eliminate as much unnecessary white space as possible to display more content on the notebook screen height, and to increase the contrast by using black fonts instead of gray fonts. 
// @downloadURL http://userscripts.org/scripts/source/438199.user.js
// @updateURL http://userscripts.org/scripts/source/438199.user.js
// @match      http://www.babbel.com/*
// @copyright  2014, Thorsten Albrecht
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//Wiederholmanager: verkleinerte Abstände
addGlobalStyle('#mywords-head div.wrapper  {margin: 0; padding: 5px 0;}'); //Grafik "gelernte Wörter" 
addGlobalStyle('#mywords-head {margin-bottom: 5px; }'); //Tabelle Vokabelmanaager 
addGlobalStyle('h2.title {margin-bottom: 0; }'); //Überschrift "Dein Wortschatz"
addGlobalStyle('a#start-review {padding: 0 10px 0 10px; margin-left: 0;}'); //Button Jetzt wiederholen

addGlobalStyle('.page-component {margin-top: -1.0em !important;}'); //Hauptmenü + Titel "Schreibe d. Übersetzung"
addGlobalStyle('#mywords-head #learn-levels .inner legend {padding-bottom: 0;}'); //Hauptmenü + Titel "Schreibe die Übersetzung" - learning levels

addGlobalStyle('#mywords-content .toolbar {height: 35px; padding-top: 5px;}'); //Vokabelliste: Header-buttons
addGlobalStyle('#mywords-content table#words thead tr th  {padding-top: 0; padding-bottom: 0; }'); //Vokabelliste Header

//schmale Navigationsleiste
addGlobalStyle('.navbar .nav>li>a {padding: 4px 15px; }'); //schmalerere Navigationsleiste
addGlobalStyle('.navbar-inner {min-height: 0; }'); //keine Mindesthöhe Nav-Bar
addGlobalStyle('.navbar+.container {padding-top: 50px; }'); //Abstand zum Hauptteil schmaler
addGlobalStyle('.brand .logo {height: 16px; width: 64px; background-size: contain; -webkit-background-size: contain; -moz-background-size: contain; -o-background-size: contain; }'); //Logo in schmalerere Nav-Bar skalieren

//Wiederholmanager: Fonts: größer und schwarz
addGlobalStyle('#mywords-content table#words tbody tr td  {color: black; font-size: 1.1em; }'); //Vokabelliste

addGlobalStyle('.reference-language {color: black; font-size: 1.0em;} '); //deutscher Begriff unter input 
addGlobalStyle('.learning-language .text-box {color: black;} '); //Übersetzungseingabe (vorausgefüllte Übersetzung davor, z.B. Artikel)
addGlobalStyle('input[type="text"] {color: black;}'); //Input box für Übersetzung

addGlobalStyle('#mywords-head .babbel_h2 {font-size: 15px; font-weight: bold;}'); //Überschrift "Dein Wortschatz"

//Wiederholmanager: Löschen unnötiger Überschriften und Elemente
addGlobalStyle('.babbel_hr_lightgrey {display: none;}'); //keine graue Trennlinie nach der Überschrift
addGlobalStyle('#mywords-head-inner > div > p.description {display: none;}'); //keine Aufforderung zum "Diskutieren"
