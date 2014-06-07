// ==UserScript==
// @name           Insel Monarchie Keys
// @namespace      http://example.org/a1x/gmscripts/keys
// @description    Insel Monarchie Keys - Tastaturbedienung für Insel Monarchie
// @include        http://*.insel-monarchie.de/sid/*
// ==/UserScript==
/*
Copyright (C) 2007 a1x

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
*/
window.addEventListener(
    'load', 
    function() {
function addLabel(obj, text) {
  label = document.createElement("span");
  label.style.color = "#050";
  label.style.backgroundColor = "#FFF";
  label.style.border = "1px solid black";
  label.innerHTML = text;
  label.style.position="absolute";
  obj.parentNode.insertBefore(label, obj.nextSibling);
}

var _page = document.location.href;
var $_links = document.getElementsByTagName("a");
var _keys=new Array(40), _keycodes=new Array( /*F1..F12*/112,113,114,115,116,117,118,119,120,121,122,123,
/*1-9,0*/ 49,50,51,52,53,54,55,56,57,48,
/*q-p*/ 81, 87, 69, 82, 84, 90, 85, 73, 79, 80,
/*a-f*/ 65,83,68,70);
var keymodes=new Array(40);
var res = new Array(6);
var ctrl=false;
var bkeys = "1234567890qwertzuiopasdf";

for($i=0;$i<keymodes.length;$i++) { keymodes[$i]=0; }
for($i=0;$i<12;$i++) { keymodes[$i]=1; }

/*
for($_i=0; $_i<$_links.length;$_i++) {
  if ($_links[$_i].href.indexOf("isle_back")>0) 
    _keys[0] = $_links[$_i].href;
  if ($_links[$_i].href.indexOf("isle_forward")>0) 
    _keys[1] = $_links[$_i].href;
}
*/

// Ressourcen lesen
tables = document.getElementsByTagName("table");
restbl = tables[8].getElementsByTagName("td");
for (i=0; i<6; i++) {
  res[i] = restbl[3+2*i].innerHTML;
}

// Linke Navigation
  tables = document.getElementsByTagName("table");
  navLinks = tables[5].getElementsByTagName("a");
  for ($_i=0;($_i<navLinks.length) && ($_i<10); $_i++) {
   addLabel(navLinks[$_i], "F" + ($_i+1));
   _keys[$_i] = navLinks[$_i].href;
  }

// obere Navigation
  navLinks = tables[7].getElementsByTagName("a");
  for ($_i=0;($_i<navLinks.length) && ($_i<2); $_i++) {
   addLabel(navLinks[$_i], "F" + ($_i+11));
   _keys[$_i+10] = navLinks[$_i].href;
  }

// Gebýude
  if (_page.indexOf("building")>0) {
    navLinks = tables[10].getElementsByTagName("form");
    for ($_i=0;($_i<navLinks.length) && ($_i<10); $_i++) {
     addLabel(navLinks[$_i], bkeys.substr($_i,1));
     _keys[$_i+12] = navLinks[$_i];
     keymodes[$_i+12] = 2;
    }
  }

// Forschung
  if (_page.indexOf("forschung")>0) {
    navLinks = tables[10].getElementsByTagName("form");
    for ($_i=0;($_i<navLinks.length) && ($_i<10); $_i++) {
     addLabel(navLinks[$_i], bkeys.substr($_i,1));
     _keys[$_i+12] = navLinks[$_i];
     keymodes[$_i+12] = 2;
    }
  }

// Kaserne / Einwohner
  if (_page.indexOf("people")>0) {
    navLinks = tables[10].getElementsByTagName("form");
    for ($_i=0;($_i<navLinks.length) && ($_i<10); $_i++) {
     if ((_page.indexOf("kaserne_modus=1")>0) && ($_i<5)) {
       switch($_i) {
          case 0: maxkk = Math.floor(Math.min(res[0]/10, res[4]/30));break;
          case 1: maxkk = Math.floor(Math.min(res[0]/40, Math.min(res[2]/30, res[4]/70))); break;
    			case 2: maxkk = Math.floor(Math.min(res[0]/80, Math.min(res[1]/40, Math.min(res[2]/25, res[4]/100)))); break;
    			case 3: maxkk = Math.floor(Math.min(res[0]/100, Math.min(res[1]/60, Math.min(res[2]/30, res[4]/130)))); break;
    			case 4: maxkk = Math.floor(Math.min(res[0]/180, Math.min(res[1]/60, Math.min(res[2]/40, Math.min(res[3]/50,res[4]/200))))); break;
					}
       if ($_i>0) maxkk = Math.min(maxkk, res[5]);
		   navLinks[$_i].getElementsByTagName("input")[0].value = maxkk;
     }
     addLabel(navLinks[$_i], bkeys.substr($_i+10,1));
     _keys[$_i+22] = navLinks[$_i];
     keymodes[$_i+22] = 3;
    }
  }

// Schiffe / Bau
  if (_page.indexOf("schiffe.php?prg=bau")>0) {
    navLinks = tables[10].getElementsByTagName("form");
    for ($_i=0;($_i<navLinks.length) && ($_i<10); $_i++) {
     addLabel(navLinks[$_i], bkeys.substr($_i+10,1));
     _keys[$_i+22] = navLinks[$_i];
     keymodes[$_i+22] = 3;
     if ($_i==4) {
       maxkk = Math.floor(Math.min(res[0]/900, res[1]/800));
		   navLinks[$_i].getElementsByTagName("input")[0].value = maxkk;
     }
    }
  }

// Hafen Links oben

  if (_page.indexOf("schiffe.php")>0) {
    navLinks = tables[10].getElementsByTagName("a");
    for ($_i=0;($_i<navLinks.length) && ($_i<3); $_i++) {
     addLabel(navLinks[$_i], bkeys.substr($_i+20,1));
     _keys[$_i+32] = navLinks[$_i];
     keymodes[$_i+32] = 1;
    }
  }



document.addEventListener("keyup", function(ev) {
  if (ev.keyCode==17) ctrl=false;
  page = document.location.href;
  for ($_i=0;$_i<_keycodes.length;$_i++)
    if ((_keycodes[$_i]==ev.keyCode) && (keymodes[$_i]>0)) {
  ev.stopPropagation();
  ev.preventDefault();
  if (keymodes[$_i]==1) { document.location.href=_keys[$_i]; }
  if (keymodes[$_i]==2) { _keys[$_i].submit(); }
  if (keymodes[$_i]==3) { _keys[$_i].getElementsByTagName("input")[0].select(); _keys[$_i].getElementsByTagName("input")[0].focus(); }
}
}, true);

document.addEventListener("keydown", function(ev) {
  if (ev.keyCode==17) ctrl=true;
  for ($_i=0;$_i<_keycodes.length;$_i++)
    if ((_keycodes[$_i]==ev.keyCode) && (keymodes[$_i]>0)) {
  ev.stopPropagation();
  ev.preventDefault();
  }
}, true);
 },
    true);

