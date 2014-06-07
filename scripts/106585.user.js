//
// (c) 2009 - 2010 Johann-Friedrich Salzmann, Alle Rechte vorbehalten - all rights reserved
//
// -----------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// -----------------------------------------------------
//
//
// ==UserScript==
// @name           scc_checkAll
// @namespace      http://www.jfsign.com/
// @description    Erleichtert das Einladen mehrerer Personen gleichzeitig in eine Gruppe oder das Empfehlen eines Videos, indem die Funktion "Alle auswählen" hinzugefügt wird.
// @include        http://www.schueler.cc/*
// @copyright      (c) 2009 - 2010 Johann-Friedrich Salzmann
// ==/UserScript==

(function (){

try {

  var where = document.getElementsByName("button_id_gruppe_freund_einladen_einladen");
     
  
  if(where.length > 0) {
  
   //Gruppeneinladung
   var element = document.createElement("br");
   where[0].parentNode.appendChild(element);
  
   var element = document.createElement("a");
   element.href = "javascript:handle_checked('check_id_gruppe_freund_einladen[]')";
   var alink = document.createTextNode("[ Alle auswählen ]");
   where[0].parentNode.appendChild(element);
   element.appendChild(alink);
  
   var script = document.createElement("script");
   where[0].parentNode.appendChild(script);
  
   var content = "function handle_checked(id) {\n var check = document.getElementsByName(id);\n var i = 0;\n for(i = 0; i<=(check.length-1); i++) {\n  var name = check[i].id;\n  if(document.getElementById(name).checked){\n   document.getElementById(name).checked = false;\n  } else {\n   document.getElementById(name).checked = true;\n  }\n }\n}";
   var jscript = document.createTextNode(content);
  
   script.appendChild(jscript);
   
  } else {
  
  //################################################################################################################
  
  //Videoeinladung
   var element = document.createElement("br");
   document.getElementById("id_step2_1").firstChild.nextSibling.firstChild.firstChild.nextSibling.appendChild(element);
  
   var element = document.createElement("a");
   element.href = "javascript:handle_checked('check_id_gruppe_freund_einladen[]')";
   var alink = document.createTextNode("[ Alle auswählen ]");
   document.getElementById("id_step2_1").firstChild.nextSibling.firstChild.firstChild.nextSibling.appendChild(element);
   element.appendChild(alink);
  
   var script = document.createElement("script");
   document.getElementById("id_step2_1").firstChild.nextSibling.firstChild.firstChild.nextSibling.appendChild(script);
  
   var content = "function handle_checked(id) {\n var check = document.getElementsByName(id);\n var i = 0;\n for(i = 0; i<=(check.length-1); i++) {\n  var name = check[i].id;\n  if(document.getElementById(name).checked){\n   document.getElementById(name).checked = false;\n  } else {\n   document.getElementById(name).checked = true;\n  }\n }\n}";
   var jscript = document.createTextNode(content);
  
   script.appendChild(jscript);
  }
  
  function handle_checked(id) {
   var check = document.getElementsByName(id);
   var i = 0;
   for(i = 0; i<=(check.length-1); i++) {
    var name = check[i].id;
    if(document.getElementById(name).checked){
     document.getElementById(name).checked = false;
    } else {
     document.getElementById(name).checked = true;
    }
   }
  }

} catch(e) {
}

})();