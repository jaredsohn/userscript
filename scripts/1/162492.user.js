// ==UserScript==
// @name          NoDupe for Netvibes
// @author        Cedric Beaudier
// @version       1.0
// @namespace     
// @description   Cacher (et marquer comme lues) les publications RSS successives ayant le même titre
// @include       http://www.netvibes.com/*
// @grant         none
// ==/UserScript==

// liste des groupes
var group = ['groupItems-today', 'groupItems-yesterday', 'groupItems-2day', 'groupItems-older'];

function IsSameTitle(str1, str2) {
    // en minuscule, sans espaces
    return str1.toLowerCase().replace(" ","") == str2.toLowerCase().replace(" ","");
}

function HideDuplicate() {
    for(var j=0; j<group.length; j++) { // pour chaque groupes...
        var header = document.getElementById(group[j]);
        if(header == null) continue;
        var childs = header.children;
        for(var i=2; i<childs.length; i++) { // pour chaque publication
            var line = childs[i];
            var previous = childs[i-1];
            var title = line.firstChild.children[1].firstChild.firstChild;
            if(IsSameTitle(title.innerHTML,previous.firstChild.children[1].firstChild.firstChild.innerHTML)) {
                if(!line.classList.contains('read') && !previous.classList.contains('read')) { // aucune des deux n'est lue...
                    title.click(); // marquer comme lue
                    line.style.display = "none"; // on cache celle qu'on vient de maquer comme lu
                }
            }
        }
    }
}
function ShowButton() { // on affiche un bouton en haut à droite
    var div = document.createElement("div");
    div.innerHTML = "NoDupe";
    div.classList.add("header-button");
    div.classList.add("toplevel");
    div.onclick = HideDuplicate;
    document.getElementById('smartreader-feeds-headerViewSwitcher').parentNode.appendChild(div);
}
function TryHideDuplicate() { // on attend que le stream soit chargé
    if(document.getElementById(group[0]) != null) {
        ShowButton();
        HideDuplicate();
    }
    else
        setTimeout(function(){TryHideDuplicate()},100);
}

// démarrage du script
setTimeout(function(){TryHideDuplicate()},1000);

