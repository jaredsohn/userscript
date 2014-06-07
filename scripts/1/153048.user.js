// ==UserScript==
// @name           Czytam Prawicowe Strony Dla Beki
// @description    Pokazuje pasek "czytam dla beki" na mocno prawicowych serwisach
// @author         Tomasz "Tomash" Stachewicz
// @timestamp      1353937354
// @version        1.0.2
// @license        MIT
// @include        http://niezalezna.pl/*
// @include        http://*.niezalezna.pl/*
// @include        http://naszeblogi.pl/*
// @include        http://rebelya.pl/*
// @include        http://*.rebelya.pl/*
// @include        http://salon24.pl/*
// @include        http://*.salon24.pl/*
// @include        http://wpolityce.pl/*
// @include        http://*.wpolityce.pl/*
// @include        http://nowyekran.pl/*
// @include        http://*.nowyekran.pl/*
// @include        http://www.pch24.pl/*
// @include        http://*.pch24.pl/*
// @include        http://prawy.pl/*
// @include        http://prawica.net/*
// @include        http://fronda.pl/*
// @include        http://*.fronda.pl/*
// @include        http://oksiuta.blog.onet.pl/*
// @include        http://korwin-mikke.blog.onet.pl/*
// @include        http://korwin-mikke.pl/*
// @include        http://nczas.pl/*
// @include        http://nowaprawica.org.pl/*


// ==/UserScript==


//Don't run on frames or iframes.
if (window.top !== window.self) {
  return;
}


(function() {

  var data = 'data:image/png;base64,'+
    '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';

  var image_element = document.createElement('img');
  image_element.id = "dla-beki-ribbon";
  image_element.src = data;
  image_element.style.position = "fixed";
  image_element.style.top = "0px";
  image_element.style.right = "0px";
  image_element.style.border = "0px";
  // delete itself upon clicking
  image_element.onclick = function() {document.body.removeChild(document.getElementById("dla-beki-ribbon"))};
  document.body.appendChild(image_element);
}) ();