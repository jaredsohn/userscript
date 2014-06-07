///////////////////////////////////////////
//
// ==UserScript==
// @name        IC Fleet Boss
// @author      Momentum
// @version     0.0.6
// @namespace   http://userscripts.org/scripts/show/38573
// @description 0.0.6 - Press 'a' on any IC page containing planet links to convert them to attack links. Automatically enters fleet sizes in attack pages.
// @include     http://www.imperialconflict.com/*
// @exclude     http://www.imperialconflict.com/guide*
// @exclude     http://www.imperialconflict.com/*.html
// @exclude     http://www.imperialconflict.com/account.php
// @require     http://sizzlemctwizzle.com/updater.php?id=38573
// ==/UserScript==
//
///////////////////////////////////////////

///////////////////////////////////////////
//
// Copyright (C) 2008 Momentum
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
///////////////////////////////////////////

(function() {try {

  var i, m;

  if(document.location.href.match(/attack\.php\?/gi) || document.location.href.match(/Transfer\.php\?/gi)) {
    var b;
    for (i=1;i<=m;i++) {document.forms[0].elements[i-1].setAttribute('value',GM_getValue('type'+i,''));}
    b = document.getElementsByName('type1')[0];
    if(b){
      b.setAttribute('value',GM_getValue('type1',''));
      b.addEventListener('change', function() {GM_setValue('type1',document.getElementsByName('type1')[0].value)}, true);
    }
    b = document.getElementsByName('type2')[0];
    if(b){
      b.setAttribute('value',GM_getValue('type2',''));
      b.addEventListener('change', function() {GM_setValue('type2',document.getElementsByName('type2')[0].value)}, true);
    }
    b = document.getElementsByName('type3')[0];
    if(b){
      b.setAttribute('value',GM_getValue('type3',''));
      b.addEventListener('change', function() {GM_setValue('type3',document.getElementsByName('type3')[0].value)}, true);
    }
    b = document.getElementsByName('type4')[0];
    if(b){
      b.setAttribute('value',GM_getValue('type4',''));
      b.addEventListener('change', function() {GM_setValue('type4',document.getElementsByName('type4')[0].value)}, true);
    }
    b = document.getElementsByName('type5')[0];
    if(b){
      b.setAttribute('value',GM_getValue('type5',''));
      b.addEventListener('change', function() {GM_setValue('type5',document.getElementsByName('type5')[0].value)}, true);
    }
    return;
  }

  var listElements, thisElement, linkURL='attack', linkColor='red';
  if (document.location.href.match(/myPlanets\.php/gi)) {
    linkURL='Transfer';
    linkColor='lime';
  }
 
  listElements = document.evaluate("//a[@href and @class='icPlanetLink']",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(!listElements.snapshotItem(0)) {
    listElements = document.evaluate("//a[@href and contains(@href,'planet.php')]",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(listElements.snapshotItem(0)) alert('Make sure you have IC Map Links installed and that it runs before IC Fleet Boss.\nYou can change this under Greasemonkey, Manage User Scripts.');
    return;
  }

  GM_setValue('attackMode',0);

  function keyHandler(e) {
    if(e.keyCode!=65) return;
    var a = (GM_getValue('attackMode',0)==1);
    var l, t, i, h;
    l = document.evaluate('//a[@href and @class="icPlanetLink"]',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; t = l.snapshotItem(i); i++) {
      h = t.getAttribute('href','');
      if (!a) {
        h = h.replace(/\/planet\.php/gi,'/'+linkURL+'.php');
        t.setAttribute('style','color: '+linkColor);
      } else {
        h = h.replace(/\/@linkURL\.php/gi,'/planet.php');
        t.removeAttribute('style');
      }
      t.setAttribute('href',h);
    }
    document.getElementById('fleetBox').style.display = (a?'none':'block');
    if(!a) reloadCounts();
    GM_setValue('attackMode',(a?0:1));
  }

  function reloadCounts() {
    var i;
    for (i=1;i<=5;i++) {document.getElementById('unitType'+i).value=GM_getValue('type'+i,'');}
  }

  var d, f, t, tr, td, s, b;
  var types=['Bombers','Fighters','Soldiers','Transports','Droids'];
  d = document.createElement('div');
  d.setAttribute('id','fleetBox');
  d.setAttribute('style','display: none; position:fixed; width: 90%; left: 5%; background-color: black; border: 1px white solid; text-align: center');
  d.style.height = 66;
  d.style.top = window.innerHeight-33;
  f = document.createElement('form');
  t = document.createElement('table');
  t.setAttribute('cellspacing','5px');
  t.setAttribute('style','margin-left: auto; margin-right: auto;');
  tr = document.createElement('tr');
  for(i=1;i<=5;i++) {
    td = document.createElement('td');

    s = document.createElement('strong');
    s.appendChild(document.createTextNode(types[i-1]+': '));
    td.appendChild(s);
    b = document.createElement('input');
    b.setAttribute('name','type'+i);
    b.setAttribute('id','unitType'+i);
    b.setAttribute('type','text');
    b.setAttribute('style','width:50px');
    b.setAttribute('value',GM_getValue('type'+i,''));
    td.appendChild(b);
    tr.appendChild(td);
  }
  t.appendChild(tr);
  f.appendChild(t);
  d.appendChild(f);
  document.body.appendChild(d);

  document.getElementById('unitType1').addEventListener('change', function() {GM_setValue('type1',document.getElementById('unitType1').value)}, true);
  document.getElementById('unitType2').addEventListener('change', function() {GM_setValue('type2',document.getElementById('unitType2').value)}, true);
  document.getElementById('unitType3').addEventListener('change', function() {GM_setValue('type3',document.getElementById('unitType3').value)}, true);
  document.getElementById('unitType4').addEventListener('change', function() {GM_setValue('type4',document.getElementById('unitType4').value)}, true);
  document.getElementById('unitType5').addEventListener('change', function() {GM_setValue('type5',document.getElementById('unitType5').value)}, true);

  document.addEventListener('keyup',keyHandler,true);
  document.body.setAttribute('onresize',"var d=document.getElementById('fleetBox'),h=33;d.style.height=h;d.style.top=window.innerHeight-h;");

} catch(e) {dump('IC Fleet Boss Error ('+e.lineNumber+'): '+e+'\n')} })();