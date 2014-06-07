// ==UserScript==
// @name           craftsite editor
// @namespace      dikamilo.net
// @include        http://craftsite.pl/forum/*
// ==/UserScript==


document.addEventListener( "DOMNodeInserted", nodeInserted, false );


function nodeInserted( event ) 
{
  var editors = document.getElementsByClassName("ipsEditor_textarea");

  for (var i = 0; i < editors.length; i++)
  {
    var name = "cke_" + editors[i].id;
    var edit = document.getElementById(name);
    
    edit.parentNode.removeChild(edit);
    editors[i].style.display = "inline";
    editors[i].style.visibility = "visible";
    editors[i].style.marginBottom = "10px";
    editors[i].style.resize = "none";
  }
}