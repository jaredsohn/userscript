// ==UserScript==
// @name           Fyens - no inline styles
// @namespace      http://fyens.dk/1
// @description    Remove inline styles from fyens.dk
// @include        http://fyens.dk/*
// @include        http://www.fyens.dk/*
// ==/UserScript==

//    <span style="font-size: 17px; font-family: verdana;">text here</span>
//    into  <span>text here</span>

for (
  var xp = document.evaluate(
      '//a//span[@style]',       // modify as needed for other sites
      document, null, 6, null
      ) , x , i = 0; 
      x = xp.snapshotItem(i); 
      i++
      ) 
x.removeAttribute('style');
