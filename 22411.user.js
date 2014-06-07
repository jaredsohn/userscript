// ==UserScript==

// @name           La Revolucion banner changer script

// @namespace      Whatever.Ya.Org

// @description    A script which changes the banner of La Revolucion!
// @include        http://revolt.org.uk/*
// @include        http://www.revolt.org.uk/*
// Created by RedPower
// ==/UserScript==

var chosenLogo = 23;

var altLogos = new Array (
   new Array ( 0,  "http://revolt.org.uk/xmas.gif", 100),
   new Array ( 1,  "http://i1.tinypic.com/8f3ihbq.png", 100),
   new Array ( 2,  "http://i18.tinypic.com/8a1yzi9.jpg", 100),
   new Array ( 3,  "http://i14.tinypic.com/86hsrj5.png", 100),
   new Array ( 4,  "http://i10.photobucket.com/albums/a128/pnmgomes/revoltbanner1.png", 100),
   new Array ( 5,  "http://i10.photobucket.com/albums/a128/pnmgomes/banner3.png", 100),
   new Array ( 6,  "http://i10.photobucket.com/albums/a128/pnmgomes/banner4.png", 100),
   new Array ( 7,  "http://xs123.xs.to/xs123/08031/untitled-1419.jpg", 100),
   new Array ( 8,  "http://xs123.xs.to/xs123/08031/r2cy631.jpg", 100),
   new Array ( 9,  "http://i17.tinypic.com/7xnigyx.jpg", 100),
   new Array ( 10, "http://i023.radikal.ru/0801/bc/caaef489cbfd.png", 150),
   new Array ( 11, "http://i6.tinypic.com/8borzix.png", 150),
   new Array ( 12, "http://i213.photobucket.com/albums/cc9/AnestesiaGeral/Revolt1.jpg", 100),
   new Array ( 13, "http://xs123.xs.to/xs123/08033/revolt_copy489.png", 100),
   new Array ( 14, "http://aycu05.webshots.com/image/40404/2004506067724022809_rs.jpg", 100),
   new Array ( 15, "http://i10.photobucket.com/albums/a128/pnmgomes/banner6.png", 100),
   new Array ( 16, "http://i10.photobucket.com/albums/a128/pnmgomes/banner7-2.png", 100),
   new Array ( 17, "http://i73.photobucket.com/albums/i212/searsta/revolt-1.png", 100),
   new Array ( 18, "http://i73.photobucket.com/albums/i212/searsta/revolt-2.png", 100),
   new Array ( 19, "http://revolt.org.uk/vimg.php?id=876", 100),
   new Array ( 20, "http://xs125.xs.to/xs125/08115/blbanner513.jpg", 100),
   new Array ( 21, "http://xs125.xs.to/xs125/08115/revolt2115.gif", 100),
   new Array ( 22, "http://xs125.xs.to/xs125/08115/viva179.gif", 150),
   new Array ( 23, "http://revolt.org.uk/revapes.jpg", 100)
);


(function(){
  var logo = document.getElementById("logo").src;
  var newLogo = altLogos[chosenLogo][1];
  //var newLogo = logo.replace(/(www\.)*revolt\.org\.uk\/.*/, altLogos[chosenLogo][1]);

  document.getElementById("logo").src = newLogo;
  document.getElementById("logo").height = altLogos [chosenLogo][2];

})();
