// ==UserScript==
// @name       Tek Network Ad-Block
// @version    0.3
// @description  Ad-block for Tek.no nettverket, skrevet av Rudde
// @require       //ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @match		http://*.hardware.no/*
// @match		http://*.tek.no/*
// @match		http://*.amobil.no/*
// @match		http://*.akam.no/*
// @match		http://*.teknofil.no/*
// @match		http://*.gamer.no/*
// @match		http://*.mobilen.no/*
// @match		http://hardware.no/*
// @match		http://tek.no/*
// @match		http://amobil.no/*
// @match		http://akam.no/*
// @match		http://teknofil.no/*
// @match		http://gamer.no/*
// @match		http://mobilen.no/*
// ==/UserScript==

$('div[id*=ad-]').filter(function() {
  return /^ad-\d+$/.test(this.id);
}).each(function() {
  document.getElementById(this.id).style.display = "none";
});

document.getElementById('wallpaper').style.display = "none";