// ==UserScript==
// @name          Bei-uns.de Message Complete
// @description   Add all your Contacts @ Message
// @include       *bei-uns.de/nachrichten/verfassen/*
// ==/UserScript==

//
// By Madboy 2008
//

//(function() {

function allenSchicken()
{
  var div1 = document.getElementById("freund");
  var num = div1.length;
  
  for( var i = 2; i < num; i++)
  {
    var shit = div1.options[i].value;
    var pnEmpfaengerBox = document.getElementById('empfaengerListe');
    if(pnEmpfaengerBox.value == '') pnEmpfaengerBox.value = shit;
    else pnEmpfaengerBox.value = pnEmpfaengerBox.value + '; ' + shit;
   }
   alert("-Done-");
}   
//  }

var elm = document.getElementById("freund");
var elm_parent = elm.parentNode;
var div10 = document.createElement("div");
elm_parent.insertBefore(div10, elm);
div10.innerHTML = '<span class="Spezial"><b><a href="javascript:allenSchicken();">Alle hinzuf&#252;gen</a></b></span>';
div10.addEventListener("click", allenSchicken, false);
//  div.innerHTML = '<input type=button OnClick="allenSchicken();" value="Alle hinzuf&#252;gen">';
//})();

