// ==UserScript==
// @name           Kocke.si Stevilke2Povezave
// @namespace      Kocke.si Stevilke2Povezave v1.1
// @description    Pretvori najdene stevilke v prispevkih in doda povezave do Bricklink.com in Peeron.com
// @include	   http://www.kocke.si/*
// ==/UserScript==

vsiPrispevki = document.getElementsByTagName("span");
polje = new Array();

function dodaj_povezave_k_stevilkam() {
  //Sprehodimo se skozi vse prispevke
  for (i=0; i<vsiPrispevki.length; i++) {
    if (vsiPrispevki[i].className.match("postbody")) {
      besedilo = vsiPrispevki[i].innerHTML;
      
      //zlistamo vse 4 in 5 mestne številke
      cifre = besedilo.match(/\d{4,5}/g); 
      
      if(cifre != null){
        //napolnimo cifre v polje
      	polje = cifre.toString().split(",");
      	
      	//kreiramo povezave
      	for(x=0; x<polje.length; x++){
      	  povezava1 = "<a href=\"http://www.peeron.com/inv/sets/"+polje[x]+"-1\" target=\"novo_okno\"><img src=\"http://www.peeron.com/favicon.ico\" width=\"16px\" height=\"16px\" title=\"Peeron.com\" border=\"0\"></a>";
      	  povezava2 = "<a href=\"http://www.brickset.com/detail/\?Set="+polje[x]+"-1\" target=\"novo_okno2\"><img src=\"http://www.brickset.com/favicon.ico\" width=\"16px\" height=\"16px\" title=\"Brickset.com\" border=\"0\"></a>";
          //v primeru, da ne gre za povezavo, kreiramo novo besedilo s povezavami
      	  if ((besedilo.indexOf(polje[x]+" ") != -1) || (besedilo.indexOf(" "+polje[x]) != -1) || ((besedilo.indexOf(""+polje[x]) != -1)&&(besedilo.indexOf(polje[x]+",") != -1))) {
            besedilo = besedilo.replace(polje[x], ""+polje[x]+" "+povezava1+" "+povezava2);
      	  }
      	}
      }
      
      //zamenjamo prvotno besedilo z novim
      vsiPrispevki[i].innerHTML = besedilo;
    }
  }
}

dodaj_povezave_k_stevilkam();