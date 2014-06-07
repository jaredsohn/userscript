// ==UserScript==
// @name       hide trip with no seat available
// @namespace  http://static.pcinpact.com/images/bd/news/44549.jpg
// @version    0.1
// @description  [FR] cache les trajets complets dont franchement on n'en a rien à secouer
// @match      http://www.covoiturage.fr/recherche?*
// @match      http://www.covoiturage.fr/trajets/recherche/*
// @copyright  2012+, You
// ==/UserScript==


l = document.getElementsByClassName('one-trip-no-seat-available');
len=l.length;
for(i=0;i<len;i++)
    l.item(i).style.display='none';