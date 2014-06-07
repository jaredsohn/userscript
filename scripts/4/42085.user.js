// ==UserScript==
// @name          Cheggit Re-Color
// @namespace     SpicyBurrito
// @description	  Changes the color of torrents with less than <bad> seeds and torrents with more than <good> seeds. You can change the variables in the script, they're on the first two lines.
// @include       http://cheggit.net/*
// ==/UserScript==

//The Thresholds for when they're colored red (bad) or colored blue-green (good) and the colors themselves (in hex).
var bad = 3;
var good = 10;
badColor = '#ff0000';
goodColor = '#00b0b0';
//This block does the searching
var tables = document.getElementsByTagName('table');
for (var t=0; t<tables.length-1; t++) {  //Each day has its own table it seems (and the ad table at the end)
  for (var i=1; i<tables[t].rows.length; i++) { //Go through all the rows
    var row=tables[t].rows[i];  //Get the current row
    if(row.cells[5]) { //cells[5] is the 6 column, which is the seed column 
      if(row.cells[5].innerHTML<bad){  //If it has less than 'bad' seeds
        var hrefs = row.cells[0].getElementsByTagName('a');
        hrefs[0].style.color = badColor;  //Turn it red (uncomment next line for bold) 
        //hrefs[0].style.fontWeight = 'bold';
      } else if(row.cells[5].innerHTML>good){  //If it has more than 'good' seeds
        var hrefs = row.cells[0].getElementsByTagName('a');
        hrefs[0].style.color = goodColor;    //Turn it blue-green (uncomment next line for bold)
        //hrefs[0].style.fontWeight = 'bold';
      }
    }
  }
}