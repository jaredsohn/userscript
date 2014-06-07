// gmailcolordeletebutton.user.js
// version 0.2
// 2007-01-16
// Copyright (c) 2006-2007, Bruno Caimar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name            GMAIL Delete Button - RED Color
// @author          Bruno Caimar <bruno.caimarATgmail.com/>
// @namespace
// @description     GMAIL Delete Button - Change Color to RED
// @include         http://mail.google.com/*
// @include         https://mail.google.com/*

// CHANGELOG: 
// 0.1 2006-01-20 ** 0.1 Version
// 0.2 2007-01-16 ** 0.2 Version 
// Several Optimizations, add 'D' key shortcut  

const IDBOTAODELETE = "ac_tr" ;

function fChangeColorButton() {
   // to change the colors and styles modify params bellow
   var CORFONTE1 = "red",   CORFUNDO1 = "white", FONTETIPO1 = "normal" ;
   var CORFONTE2 = "white", CORFUNDO2 = "red",   FONTETIPO2 = "bold" ;
   // select style: 1 or 2
   var ESTILO    = 2 ;

   var _stl  = "#" + IDBOTAODELETE + " {";
       _stl += "background-color: " + eval("CORFUNDO"  + ESTILO);
       _stl += " ; color: " + eval("CORFONTE"  + ESTILO) ;
       _stl += " ; font-weight: " + eval("FONTETIPO" + ESTILO) ;
       _stl += " ; }" ; 

   GM_addStyle ( eval("\'" + _stl + "\'") );
}
function keyShortcut(e) {
  var _key = e.which ;
  if (document.getElementById(IDBOTAODELETE)) {
    if (e.target.nodeName.toString().toLowerCase() != "input" &&
        e.target.nodeName.toString().toLowerCase() != "textarea") {
      GM_log('target..' + e.target) ;
      GM_log('target..' + e.target.nodeName) ;
      const D_key = 100 ; const d_key = 68 ;
      if (_key == D_key || _key == d_key) {
        fakeDeleteClick(document.getElementById(IDBOTAODELETE)); 
      }
    }
  }
}
function fakeDeleteClick(node) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 1, 50, 50, 50, 50, 
                         false, false, false, false, 0, node);
    node.dispatchEvent(event);
}
// ==/UserScript==
(function() {
  try {
    fChangeColorButton();
    window.addEventListener("keyup", keyShortcut, false);
  } catch (erro) {
    // algum erro ocorreu
    GM_log("Some error ocurred..." + erro.description)
  }
})();
