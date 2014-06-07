// ==UserScript==
// @name          irc-galleria cleaner
// @namespace     
// @description   Clean up irc-galleria.net
// @include       http://irc-galleria.net/*
// ==/UserScript==


(function()
{  
  var a;
// Poistaa yllÃ¤pito tiedottaa boxin sisÃ¤llÃ¶n
// otsikkoa itseÃ¤Ã¤n ei voi poistaa
  if(a = document.getElementById('newstable')){
    a.style.display="none";
  }
// Poista Tuoreimmat kysymykset boxin
  if(a = document.getElementById('indexgallups')){
    a.style.display="none";
  }
// Poistaa ison mainos bannerin sivun ylÃ¤osasta
  if(a = document.getElementById('hugebanner')){
    a.style.display="none";
  }
// Poistaa onnittelut boxin
  if(a = document.getElementById('birthdays')){
    a.style.display="none";
  }
// Poistaa tyhjÃ¤n solukon vasemmasta reunasta
  if(a = document.getElementById('itcr')){
    a.style.display="none";
  }
// Poistaa mun kuva boxin
  if(a = document.getElementById('indexmypicture')){
    a.style.display="none";
  }
// Poistaa puhelimen taustakuva boxin
  if(a = document.getElementById('indexphonebackground')){
    a.style.display="none";
  }
// Poistaa kirjautuneita boxin
  if(a = document.getElementById('indexstats')){
    a.style.display="none";
  }
// Poistaa kaikki flash mainokset
  if(a = document.getElementById('adv')){
    a.style.display="none";
  }
// Poistaa sisÃ¤Ã¤nkirjautumattomalta irc-galleria boxin
  if(a = document.getElementById('indexintrobox')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot1')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot2')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot3')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot4')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot5')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot6')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot7')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot8')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot9')){
    a.style.display="none";
  }
  if(a = document.getElementById('advslot10')){
    a.style.display="none";
  }
}
)();