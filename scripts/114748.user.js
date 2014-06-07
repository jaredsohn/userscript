// ==UserScript==
// @name           JoeMonster Nav
// @version        0.2
// @namespace      http://userscripts.org/scripts/show/114748
// @description    Nawigacja następny/poprzedni z klawiatury na forum i w artykułach na głównej JoeMonster
// @include        http://www.joemonster.org/*
// ==/UserScript==
var jm_forum_phref='#';
var jm_forum_nhref='#';
var jm_art_phref='#';
var jm_art_nhref='#';
var jm_gal_phref='#';
var jm_gal_nhref='#';

var jm_forum_onkeyup = function(e) {
  switch (e.keyCode) {
    case 37:
      window.location = jm_forum_phref;
      break;
    case 39:
      window.location = jm_forum_nhref;
      break;
  }
}
var jm_forum_kb_nav = function() {
  var divCollection = document.getElementsByTagName("div");
  var pMatch = new RegExp("Starsz", "ig");
  var nMatch = new RegExp("Nowsz", "ig");
  for (var i=0; i<divCollection.length; i++) {
    if(divCollection[i].getAttribute("class") == "nav" && (divCollection[i].innerHTML.match(pMatch) || divCollection[i].innerHTML.match(nMatch))) {
      aCollection = divCollection[i].getElementsByTagName('a');
      for (var j=0; j < aCollection.length; j++) {
	if (aCollection[j].innerHTML.match(pMatch)) jm_forum_phref = aCollection[j].getAttribute('href');
	if (aCollection[j].innerHTML.match(nMatch)) jm_forum_nhref = aCollection[j].getAttribute('href');
      }
    }
    if (jm_forum_phref != '#' && jm_forum_nhref != '') break;
  }
  document.addEventListener('keyup',jm_forum_onkeyup);
} 

var jm_art_onkeyup = function(e) {
  switch (e.keyCode) {
    case 37:
      window.location = jm_art_phref;
      break;
    case 39:
      window.location = jm_art_nhref;
      break;
  }
}
var jm_art_kb_nav = function() {
  var aCollection = document.getElementsByTagName("a");
  var pMatch = new RegExp("starszy artykuł", "ig");
  var nMatch = new RegExp("nowszy artykuł", "ig");
  for (var i=0; i<aCollection.length; i++) {
    if (aCollection[i].innerHTML.match(pMatch)) jm_art_phref = aCollection[i].getAttribute('href');
    if (aCollection[i].innerHTML.match(nMatch)) jm_art_nhref = aCollection[i].getAttribute('href');
  
    if (jm_art_phref != '#' && jm_art_nhref != '#') break;
  }
  document.addEventListener('keyup',jm_art_onkeyup);
} 


var jm_gal_onkeyup = function(e) {
    switch (e.keyCode) {

    case 37:  
      window.location = jm_gal_phref;  
      break;  
    case 39:  
      window.location = jm_gal_nhref;  
      break;  

    }
}
var jm_gal_kb_nav = function() {
    var aCollection = document.getElementsByTagName("a");
    var pMatch = new RegExp("poprzedni", "ig");
    var nMatch = new RegExp("następny", "ig");
    for (var i=0; i<aCollection.length; i++) {

    if (aCollection[i].innerHTML.match(pMatch)) jm_gal_phref = aCollection[i].getAttribute('href');  
    if (aCollection[i].innerHTML.match(nMatch)) jm_gal_nhref = aCollection[i].getAttribute('href');        
    if (jm_gal_phref != '#' && jm_gal_nhref != '#') break;  

    }
    document.addEventListener('keyup',jm_gal_onkeyup);
}

if (new String(window.location).substring(26,29) == 'pho') jm_forum_kb_nav();
else if (new String(window.location).substring(26,29) == 'art') jm_art_kb_nav();
else if (new String(window.location).substring(26,28) == 'mg') jm_gal_kb_nav();

