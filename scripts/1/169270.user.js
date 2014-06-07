// ==UserScript==
// @name        YLE Areena suurempi video
// @namespace   www.hiekkalaatikko.eu
// @include     http://areena.yle.fi/*
// @version     1.03
// @grant       none
// ==/UserScript==

korkeus = getCookie('videon_koko_dsa');
if (!isNumber(korkeus) || korkeus < 100) korkeus = 530;

// Onko kyseessä numero
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Suurennetaan pyydetty elementti
function suurenna(element) {
    element.style.width = korkeus*2+'px'; // korkeus * 2 jotta videon kontrollit pysyvät järkevän kokoisina, mutta leveys on kuitenkin riittävän suuri millä tahansa kuvasuhteella
    element.style.height = korkeus+'px';
}

// Suurennetaan elementit jos voidaan
function tarkista() { 
        suurenna(document.getElementById('areena_player')); // videon div
        suurenna(document.getElementById('areena_player').parentNode); // <section class="player-frame"> … </section> pitää myös suurentaa jotta video mahtuu sisään
        if (document.getElementById('areena_player_api')) suurenna(document.getElementById('areena_player_api')); // Videon object

        // Siirretään play nappula keskelle
        document.getElementById('player-play-icon').style.position = 'absolute';
        document.getElementById('player-play-icon').style.left = korkeus*2 / 2 - 40+'px'; // Play nappulan leveys ja korkeus on 80px
        document.getElementById('player-play-icon').style.top = korkeus / 2 - 40+'px';
}

// Odotellaan että käyttäjä painaa play
function alusta() { 
    if (document.getElementById('areena_player')) { // Toimitaan vain jos sivulta löytyy soitin
        tarkista(); // Suurennetaan videon div
        if (document.getElementById('areena_player_api')) tarkista(); // Suurennetaan itse video kunhan käyttäjä lataa sen
        else setTimeout(alusta,500); // Jos areena_player_api ei vielä lyötynyt, yritetään myöhemmin uudelleen.
        if (!document.getElementById('lksjdflkjsllksjdf')) { // Luodaan "määritä videon koko" nappula, jos ei vielä luotu
            var menu = document.createElement('button');
            menu.style.cssText = 'position:absolute;right:4px;top:4px;';
            menu.id = 'lksjdflkjsllksjdf'; // Random nimi ettei satuta käyttämään samaa areenan kanssa
            menu.innerHTML = 'Määritä videon koko';
            menu.addEventListener('click',function() { setCookie('videon_koko_dsa',prompt("Määritä videon korkeus (pikseleinä, suositus 530, alkuperäinen 360)",korkeus),999); korkeus = getCookie('videon_koko_dsa'); tarkista(); },false);
            document.getElementById('areena_player').parentNode.parentNode.appendChild(menu);
        }
    }
}

function setCookie(c_name,value,exdays) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1) {	 
	c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1) {	 
	c_value = null;
  }
else {
  c_start = c_value.indexOf("=", c_start) 
	+ 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1) {
	c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

window.addEventListener ("load", alusta, false);

