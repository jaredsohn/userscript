// ==UserScript==
// @name           Travian: Ally and NAP marker 
// @namespace      http://users.hszk.bme.hu/~am703
// @description    Shows your allies and NAPs with different color on the map
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/allianz.php
// @include        http://*.travian.*/allianz.php?aid=*
// ==/UserScript==


//constats for xpath
var Snapshot = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var First = XPathResult.FIRST_ORDERED_NODE_TYPE;

//0: időzítést segítő, nehogy kétszer híodjon cserebere, 
//1: éppen hol tartunk szövi keresésben
//2: server namespace
var konst = [false, 1, ''];
konst[2] = location.host;

//main part
if(location.href.indexOf('karte.php') != -1){
  cserebere();
  document.getElementById('map_content').addEventListener("DOMNodeRemoved", visszahiv, true);
}
else if(location.href.indexOf('allianz.php') != -1 && GM_getValue('auto3704', true)){
  var kekkep = document.evaluate('//img[@title="online"]', document, null, First, null);
  if(kekkep.singleNodeValue){
    klankeres();
  }
}

//klánoldalon ally és nap kereső
function klankeres(){
  var klanleirok = document.evaluate('//td[@class="slr3"]', document, null, Snapshot, null);
  for(var i=0; i < klanleirok.snapshotLength; i++){
    for(var mutato = klanleirok.snapshotItem(i).firstChild; mutato; mutato = mutato.nextSibling){
      if(mutato.nodeName == 'P'){
        switch(konst[1]){
        case 1:
          nevkiszed(mutato, 'ally'+konst[2]);
          konst[1]=2;
          break;
        case 2:
          nevkiszed(mutato, 'nap'+konst[2]);
          konst[1]=3;
          break;
        case 3:
          nevkiszed(mutato, 'war'+konst[2]);
          konst[1]=4;
          break;
        }
      }
    }
  }
}

//A konkrét klánevek kiszedése
function nevkiszed(mutato, hova){
  tp = mutato.nextSibling;
  var nevsor = '|';
  while(tp && tp.nodeName == 'DIV'){
    nevsor += tp.firstChild.textContent+'|';
    tp = tp.nextSibling;
  }
  GM_setValue(hova, nevsor);
}

//visszahívó cucc
function visszahiv(){
  if(konst[0] == false){
    window.setTimeout(cserebere, 10);
    konst[0] = true;
  }
}

//ami a tényleges cserét végzi
function cserebere(){
  var areak = document.evaluate("id('map_content')//area", document, null, Snapshot, null);
  for(var i=0; i < areak.snapshotLength; i++){
    var x = areak.snapshotItem(i);
    if(x.hasAttribute("alt")){
      var szovije = x.getAttribute("onmouseover").split("'")[7];
      var szovi = '|'+szovije+'|';
      if(GM_getValue('ally'+konst[2], ' ').indexOf(szovi)!=-1 && szovije){
        kepcsere(i-7, 1);
      }
      else if(GM_getValue('nap'+konst[2], ' ').indexOf(szovi)!=-1 && szovije){
        kepcsere(i-7, 5);
      }
      else if(GM_getValue('war'+konst[2], ' ').indexOf(szovi)!=-1 && szovije){
        kepcsere(i-7, 2);
      }
    }
  }
  konst[0] = false;
}

//kép lecserélése
function kepcsere(adik, mire){
  var img = document.evaluate('//img[@class="mt'+adik+'"]', document, null, First, null);
  var falukep = img.singleNodeValue.getAttribute("src");
  img.singleNodeValue.setAttribute("src", falukep.replace("4.gif", mire+".gif"));
}

//menu command part
if(GM_getValue('auto'+konst[2], true)){
  GM_registerMenuCommand('Manually set alliance relations', manual);
}
else{
  GM_registerMenuCommand('Automaticly update alliance relations', auto);
  GM_registerMenuCommand('Add Ally', addAlly);
  GM_registerMenuCommand('Add NAP', addNap);
  GM_registerMenuCommand('Add War', addWar);
  GM_registerMenuCommand('Delete all', deleteAll);
}

function manual(){
  GM_setValue('auto'+konst[2], false);
  alert('Now you will be able to manually add alliances you want to mark ally or NAP');
  location.reload();
}
function auto(){
  GM_setValue('auto'+konst[2], true);
  alert('Now the script will try to find the allys and NAPs of your alliance');
  location.pathname = '/allianz.php';
}
function addAlly(){
  var uj = prompt('Type in the name of an ally');
  if(uj){
    GM_setValue('ally'+konst[2], GM_getValue('ally'+konst[2])+uj+'|');
  }
}
function addNap(){
  var uj = prompt('The name of the alliance you have a NAP with');
  if(uj){
    GM_setValue('nap'+konst[2], GM_getValue('nap'+konst[2])+uj+'|');
  }
}
function addWar(){
  var uj = prompt('Give an alliance you are at war with');
  if(uj){
    GM_setValue('war'+konst[2], GM_getValue('war'+konst[2])+uj+'|');
  }
}
function deleteAll(){
  GM_setValue('ally'+konst[2], '|');
  GM_setValue('nap'+konst[2], '|');
  GM_setValue('war'+konst[2], '|');
  alert('All relations deleted');
}

GM_registerMenuCommand('Show relations', ask);
function ask(){
  var txt = "Ally: "+GM_getValue('ally'+konst[2], '');
  txt += "\n NAP: "+GM_getValue('nap'+konst[2], '');
  txt += "\n War: "+GM_getValue('war'+konst[2], '');
  alert(txt);
}
