// ==UserScript==
// @name         for ...
// @description  حرب القبائل
// @version        1.0
// @include       http://ae*tribalwars.ae/*
// @author         Aywac
// ==/UserScript==

for (var i=0; i<10000; i++)
{ 

   $("#village_table").find("tr").find(":checked + span").find("a")[i].click();

}