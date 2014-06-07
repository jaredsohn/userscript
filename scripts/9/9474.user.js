
// ==UserScript==
// @name          StudiVZ Eingabefeld nicht deaktivieren
// @namespace     http://j169.de/
// @description   Verhindert die Deaktivierung des Eingabefeldes auf StudiVZ. Somit kann man seinen Text auch dann noch kopieren, wenn man ihn abgeschickt hat und damit retten, falls das Abschicken scheitert.
// @include       *studivz.*
// @creator       Juergen <jb@j169.de>
// ==/UserScript==

var ub = document.getElementById("uploadbutton");

if(ub) {
  ub.addEventListener('click', neddisablen, true);
} else {
  
  var input = document.getElementsByTagName("input");
  
  for(var i = 0; i < input.length; i++) {
    if(input[i].value != "Abschicken") 
      continue;
    
    if(input[i].getAttribute("onclick") == "sendPinn()")
      input[i].addEventListener('click', neddisablen3, true);
    else
      input[i].addEventListener('click', neddisablen2, true);
    break;
  }
}


function neddisablen() {
  document.getElementById('data[content]').removeAttribute("disabled");
}

function neddisablen2() {
  document.getElementById('msg_content').removeAttribute("disabled");
}

function neddisablen3() {
  document.getElementById('contentd').removeAttribute("disabled");
}
