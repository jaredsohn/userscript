// ==UserScript==
// @name           svzBetterStartPage
// @namespace      http://win-start.de
// @include        http://www.schuelervz.net/Home
// @author		   Benjamin Hättasch
// @description    SVZ Buschfunk Testpiloten: Verschiebt die Benachrichtigungen in die Sidebar und blendet "Kennst-Du-Schon" aus
// ==/UserScript==

//Nimm die Benachrichtigungs-Box...
box = document.getElementById("Mod-Home-Infobox");
//...und häng sie an die Sidebar an
document.getElementById("Grid-Page-Left").appendChild(box);

//Nun nur noch ein paar Styles anpassen, damit die Breite stimmt und die "Kennst-Du-Schon"-Box verschwindet...
addGlobalStyle('.infobox-inner { margin-left: 115px! important; } #Mod-Home-Infobox {width:156px!important;margin-top:20px!important} #Mod-Kdk-Snipplet {display:none!important;} #Mod-Home-Feed {padding-top:0px!important}');


//Funktion: Styles setzen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}