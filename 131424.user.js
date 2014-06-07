// ==UserScript==
// @name NoWhiteSpace (BETA)
// @version 0.4
// @namespace http://googleplus-whitespace-remover.googlecode.com/files/gpluswhitespace-beta.user.js
// @description Entfernt den WhiteSpace und passt Google+ optisch an.
// @include https://plus.google.com/*
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
   
// Übersicht   
   // entfernt die Hangouts, die Vorschlaege und den App Hinweis in der Uebersicht 
addGlobalStyle('.Yf96sb {display: none !important;}');
   // erhoeht die Streambreite bis maximal 1000px
addGlobalStyle('.Wbhcze {width: 80% !important;}');
addGlobalStyle('.SG {max-width: 1000px; width: 200%;}');
   // rueckt den den Text neben LinkPost Bildern ein
addGlobalStyle('.R91CDb {padding-left: 10px;}');
   // sonstige Anpassungen
addGlobalStyle('.BVFDSe {margin: 5px 0 0 6px;}')
addGlobalStyle('.Iya3A {margin: 5px 0 0 6px;}')
addGlobalStyle('.DM1I7e {margin-left: -40px; position: relative !important;}')
addGlobalStyle('.HPvmqf {position: relative !important;}')
addGlobalStyle('.peIMR.c-q-o-a {margin-top: 15px;}')


// Profil
   // verschiebt in der Profilansicht die Posts nach unten
addGlobalStyle('.o8dQjb {padding-top: 250px;}');
   // Anpassung und Verschiebung der "in den Kreisen von", "in den Kreisen anderer"
   // und die "gemeinsame Kontakte", sowie Schriftanpassung.
addGlobalStyle('.oIZr7 {display: none;}')
addGlobalStyle('.r4gluf {margin: auto;}');
addGlobalStyle('.TK6IB {width: 60%; margin: auto;}');
addGlobalStyle('.KBMoYc {width: 500px; height: 150px; position: absolute !important; left: -580px; top: 300px;}');
addGlobalStyle('.w5faHc {float: left; margin-bottom: 15px; width: 400px;}');
addGlobalStyle('.mxeerd {font-size: 150%;}')   
addGlobalStyle('.USIcmb {font-size: 150%;}') 
addGlobalStyle('.c-wa-Da {position: static;}')  
   // entfernt den "Seite erstellen" Link auf Google+ Seiten
addGlobalStyle('div[componentid="8"] {display: none;}');
   // Passt Sucheergebnisse an
addGlobalStyle('.HWkrRb {margin-top: 50px;}')
addGlobalStyle('.Lo6oDf {position: relative !important; right: 20px; top: -2px;}')
   // About Seite
addGlobalStyle('.KzjeM {margin-top: 250px;}')
   // Photos
addGlobalStyle('.rsFKub {margin-top: 230px;}')
	//Sonstige
addGlobalStyle('.yxucnd {position: absolute !important; top: 15px; left: 9px;}')
addGlobalStyle('.NdrWSd {position: relative !important;}')	
addGlobalStyle('.gH {width: 80%;}')
// Sonstiges
   // Circles
addGlobalStyle('.Pw {position: relative !important;}')  
   // Benachrichtigungen
addGlobalStyle('.BSdute {position: relative !important; float: right;}')   




// Ich hoffe das Script gefaellt Euch!
// Euer Rene von Google+ Report
