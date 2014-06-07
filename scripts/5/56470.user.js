// ==UserScript==
// @name           Friendly Moderators
// @namespace      shoecream@luelinks.net
// @description    Makes your moderators friendly and inviting to speak to.
// @include        http://boards.endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// ==/UserScript==

var allboards = false;

var dictionary = {
  LlamaGuy: "Marcel",
  Sabretooth: "Dan",
  BigCow: "Mark",
  shoecream: "Jonathan",
  COTM: "Mike",
  shaunMD: "Shaun",
  Tiko: "Greg",
  "hollow life": "Craig",
  Moltar: "Ryan",
  Alveron: "Shawn",
  "l Dudeboy l": "Ben",  
  Kiffe: "Josu\u00e9",
  SirPenguin: "Joshua",
  bluntporcupinetoo: "Matt",
  darkinsanity: "Simon",
  "System Error": "Curtis",
  IncognetoMan: "Daniel",
  Wanglicious: "Jeff",
  "Leon Powalski": "Brandon",
  "Bukkake Tsunami": "Mollie",
  TidusWulf: "Adam",
  Waldo: "Kevin",
  terrium: "Matthew",

  // historic names
  gogogopogo: "Zach",
  "X ASTRO FLAME X": "Will",
  mehjesscha: "Jessica",
  "Yellow Cyclone": "Chris",
  ConkerTheHedgehog: "Topi",
  tealmarie: "Lisa",
  mammoth: "Danny",
  "Dancin Jesus": "Evan",
  "street spirit": "Dan",
  TheRealFolkBlues: "William",
};


function update() {
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    if (/profile\.php/.test(a[i].href)) {
      if (dictionary[a[i].textContent]) {
        a[i].textContent = dictionary[a[i].textContent];
      }
    }
  }
}

if (allboards || /board=-8[456]/.test(document.location.search)) {
  update();
  document.addEventListener("DOMNodeInserted", update, false);
}
