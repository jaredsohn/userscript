// ==UserScript==
// @name           Friendly Moderators
// @namespace      shoecream@luelinks.net (maintained by hollow life)
// @description    Makes your moderators friendly and inviting to speak to.
// @include        http://boards.endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// ==/UserScript==

var allboards = false;

var dictionary = {
  
  //admins
  LlamaGuy: "Marcel",
  Sabretooth: "Dan",
  "hollow life": "Craig",
  
  //mods
  COTM: "Mike",
  shaunMD: "Shaun",
  Tiko: "Greg",
  Moltar: "Ryan",
  Alveron: "Shawn",
  Kiffe: "Josu\u00e9",
  "Nate the Jew": "Nate",
  XSonicShadow: "James",
  "l Dudeboy l": "Ben",
  darkinsanity: "Simon",
  
  //link mods
  shaldengeki: "Chuck",
  entrO: "Rab",
  Psyduck: "David",
  
  //wiki mod(s)
  "System Error": "Curtis",
  
  //SD mods
  Wanglicious: "Jeff",
  "Leon Powalski": "Brandon",
  "Bukkake Tsunami": "Mollie",
  
  //FP mod(s)
  DoichiMyLove: "Meshell",  
  
  //LL Mart mods
  TidusWulf: "Adam",
  Waldo: "Kevin",
  
  //fake mods
  terrium: "Matthew",

  //historic names
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
  SirPenguin: "Joshua",
  bluntporcupinetoo: "Matt",
  shoecream: "Jonathan",
  IncognetoMan: "Daniel",
  BigCow: "Mark",  

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