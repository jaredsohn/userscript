// ==UserScript==
// @name           Partner backup
// @namespace      Hans Goedegebuure
// @include        http://www*.camorraworld.nl/user/partners.php
// ==/UserScript==
var bestaat;
opslaan = true;

linkjes = document.getElementsByTagName("a");
i = 0;

if (GM_getValue("log")){
    log = GM_getValue("log").split(",");
}
else {
    log = new Array;
}

huidigepartners = new Array();

while (linkjes[i]){
    if (linkjes[i].href.match("cw/criminal.php") == "cw/criminal.php" && linkjes[i].innerHTML != ""){
        huidigepartners[huidigepartners.length] = linkjes[i].innerHTML;
    }
    i++;
}

if (GM_getValue("partners")){
    partners = GM_getValue("partners").split(",");
}
else {
    partners = new Array;
}
i = 0;
while (partners[i]){
    j = 0;
    while(huidigepartners[j]){
        if (huidigepartners[j] == partners[i]){
            bestaat = true;
        }
        j++;
    }
    if (!bestaat){
        log[log.length] = partners[i];
    }
    bestaat = false;
    i++
}


divje = document.createElement("div");
divje.className = "cb";
text = "<h1>Vermiste partners</h1><p><table>";
if (log.length > 0){
    i = 0;
    while (log[i]){
        text = text + "<tr><td>" + log[i] + "</td></tr>";
        i++;
    }
    text = text + "<tr><td><a id=\"resetlink\" class=\"green bold\">Log legen</a></td></tr>";
}
else {
    text = text + "<tr><td><span class=\"green bold\">Geen vermiste partners</span></td></tr>";
}
divje.innerHTML = text + "</table></p>";

cbs = document.getElementById("cbs");
if (cbs){
    cbs.appendChild(divje);
}

resetlink = document.getElementById("resetlink");
if (resetlink){
    resetlink.addEventListener("click", resetten, false);
}

function resetten(){
    GM_deleteValue("log");
    window.location.reload(false);
}

naam = document.getElementsByTagName("h1")[0].innerHTML.replace("Partners in crime van ", "");
if (GM_getValue("naam")){
    if (GM_getValue("naam") != naam){
        opslaan = confirm("De partnerlijst die opgeslagen is is van " + GM_getValue("naam") + ", wil je de gegevens van deze partnerlijst opslaan?");
    }
}

if (opslaan){
    GM_setValue("naam", naam);
    GM_setValue("partners", huidigepartners.toString());
    GM_setValue("log", log.toString());
}