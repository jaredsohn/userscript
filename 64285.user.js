// ==UserScript==
// @name           Kocke.si Admin-PresirokeSlike
// @namespace      Kocke.si Admin-PresirokeSlike v1.0
// @description    Na forumu pregleda slike in tiste, s preveliko sirino, prikaze v dovoljeni velikosti ter oznaci z rdecim robom, da jo administrtor takoj opazi.
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
  	  //dodamo debel rdec rob, da jih moderator takoj opazi
          slika[j].style.border = "5px solid red";
          //dodamo napis ob prehodu z misko
          slika[j].title = "Velikost slike: "+slika[j].offsetWidth+"x"+slika[j].offsetHeight+"px. Klikni za prikaz originala.";
          //Omogocimo, da se ob kliku na sliko prikaze originalna velikost
  	  slika[j].addEventListener("click", function(event) {
	  if (event.currentTarget.style.maxWidth == "none") {
  	    event.currentTarget.style.maxWidth = NajvecjaDovoljenaSirina + "px";
  	    }
	  else
	    event.currentTarget.style.maxWidth = "none";
	  }, false);
        }
      }
    }
  }
}

KoregirajPresirokeSlike();