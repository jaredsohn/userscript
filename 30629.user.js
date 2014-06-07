// ==UserScript==
// @name           Wykop (zakopy)
// @namespace      wykop
// @include        http://www.wykop.pl/*
// ==/UserScript==
window.addEventListener("load", function(){



var przejrzyj = document.getElementsByClassName("wykop-item");
var ajax = new XMLHttpRequest();
var i = -1;
var id;
var k;
function uzupelnij(){
  i++;
  id = przejrzyj[i].getAttribute("id").replace("linkid-","");
}
function pobierz(){
  var ajax = new XMLHttpRequest();
  ajax.open('GET', "http://www.wykop.pl/link/"+id+"/raporty", true); // http://www.wykop.pl/link/80981/raporty
  ajax.onreadystatechange = function (aEvt) {
    if (ajax.readyState == 4) {
      if(ajax.status == 200){
        var r = ajax.responseText;
        var start = r.indexOf("<p>Liczba wszystkich raportów ");
        var end = r.indexOf("</div> <!-- /wykop-item -->");
        text = "Zakopów "+r.substring(start, end).replace("<p>Liczba wszystkich raportów ", "").replace("</p>","");
        document.getElementById("linkid-"+id).getElementsByTagName("ul")[0].appendChild(document.createElement("li").appendChild(document.createTextNode(text)));
        
        if(i<przejrzyj.length-1){
          uzupelnij();
          pobierz();
        }
      }
      else
        alert("Błąd podczas ładowania strony\n");
    }
  };
  ajax.send(null); 
}
if(przejrzyj.length>0){
  uzupelnij();
  pobierz();
}


}, false);

