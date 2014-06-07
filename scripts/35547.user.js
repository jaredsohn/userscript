// ==UserScript==
// @name          Bei-uns.de "Freundesliste und Ignorierliste"
// @description   Zeigt erst auf Wunsch die Listen an
// @include       *.bei-uns.de/freunde*
// ==/UserScript==

//
// By Madboy 2008
//
document.getElementById('freundeOfflineListe').style.display='none';
if((document.getElementById('ignorierListe'))!=null){
  document.getElementById('ignorierListe').style.display='none';
}

function freundeoffliste(){
  if(document.getElementById('freundeOfflineListe').style.display=='none'){ 
    document.getElementById('freundeOfflineListe').style.display='block';
    document.getElementById('Buttonfreunde').value='Freunde ausblenden';
  }
  else{
    document.getElementById('freundeOfflineListe').style.display='none';
    document.getElementById('Buttonfreunde').value='Freunde anzeigen';
  } 
}

function ignoliste(){ 
  if(document.getElementById('ignorierListe').style.display=='none'){ 
    document.getElementById('ignorierListe').style.display='block';
    document.getElementById('ButtonIgno').value='Ignorierliste ausblenden';
  }
  else{
    document.getElementById('ignorierListe').style.display='none';
    document.getElementById('ButtonIgno').value='Ignorierliste anzeigen';
  } 
}

var elm = document.getElementById("freundeOfflineListe");
var elm_parent = elm.parentNode;
var div1 = document.createElement("div");
elm_parent.insertBefore(div1, elm);
div1.innerHTML = '<div align="center"><input type=button OnClick="freundeoffliste();" value="Freunde anzeigen" id="Buttonfreunde"></div>';
div1.addEventListener("click", freundeoffliste, false); 

if((document.getElementById('ignorierListe'))!=null){
  var elm = document.getElementById("freundeOfflineListe");
  var elm_parent = elm.parentNode;
  var div2 = document.createElement("div");
  elm_parent.insertBefore(div2, elm);
  div2.innerHTML = '<div align="center"><input type=button OnClick="ignoliste();" value="Ignorierliste anzeigen" id="ButtonIgno"></div>';
  div2.addEventListener("click", ignoliste, false);
} 
