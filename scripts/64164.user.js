// ==UserScript==
// @name           Kocke.si KoregirajPresirokeSlike
// @namespace      Kocke.si KoregirajPresirokeSlike v1.0
// @description    Na forumu pregleda slike in tiste, s preveliko sirino, prikaze v dovoljeni velikosti
// @include	   http://www.kocke.si/forum/*
// ==/UserScript==

NajvecjaDovoljenaSirina = 600; // najvecja dovoljena sirina v pikslih

vsiPrispevki = document.getElementsByTagName("span");

function KoregirajPresirokeSlike() {
  //Sprehodimo se skozi vse prispevke
  for (i=0; i<vsiPrispevki.length; i++) {
    if (vsiPrispevki[i].className.match("postbody")) {
      slika = vsiPrispevki[i].getElementsByTagName("img");
      //Sprehodimo se skozi vse slike
      for (j=0; j<slika.length; j++) { 
        //Slikam, ki so prevelike
        if (slika[j].offsetWidth >= NajvecjaDovoljenaSirina + 1) {
  	  //popravimo velikost
  	  slika[j].style.maxWidth = NajvecjaDovoljenaSirina + "px";
        }
      }
    }
  }
}

KoregirajPresirokeSlike();