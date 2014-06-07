// ==UserScript==
// @name          JV MP Manager
// @namespace     http://perdu.com/jvmpmanager
// @description   Script pour gérer ses MP
// @include       http://www.jeuxvideo.com/messages-prives/*
// @version       1.0
// ==/UserScript==


// Un nouvel onglet nomme JVMPManager est crée dans la boite de réception

var ongletMPManager = document.createElement("li");
var lienMPManager = document.createElement("a");
var textNode = document.createTextNode("JVMPManager");
var idOnglets = document.getElementById("mp_onglets").children[0];
var idLastOnglet = document.getElementById("indesirables");

lienMPManager.href = '#';
lienMPManager.appendChild(textNode);
ongletMPManager.appendChild(lienMPManager);
idOnglets.insertBefore(ongletMPManager, idLastOnglet);

lienMPManager.onclick = function(e) 
    {
        e.preventDefault();
        
        alert('Bienvenue dans JVMPManager');
        
        ongletMPManager.removeChild(lienJVMPManager);
        textNode.nodeValue = 'JVMPManager';
        ongletMPManager.className = 'on';
        ongletMPManager.appendChild(textNode);
    }

// Remplacement des checkboxs par un "s" rouge de modération

var checkboxList = document.querySelectorAll('input[type="checkbox"]');
 
 
for(var i=checkboxList.length-1; i>=1; i--) {
 
var img = document.createElement('img');
img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif"
img.style.cursor = 'pointer';
checkboxList[i].parentNode.insertBefore(img, checkboxList[i]);
checkboxList[i].style.display='none';
img.id = i;
 
img.onclick = function() {
if(confirm("Etes vous sur de vouloir EFFACER ce message ainsi qui toutes ses reponses associees?"))
{
document.querySelectorAll('input[type="checkbox"]')[this.id].checked=true;
document.querySelector('#form_list').submit();
}
};
 
}