// ==UserScript==
// @name           Auction Check
// @namespace      Stufi Auction
// @description    Auto-refreshes the Gladiatus Auction page until it reaches Very Short, then sounds a continuous alarm and displays the auction VS time and projected end time
// @include        http://www.vatera.hu/veteran_merci_156091902.html
// @exclude        
// ==/UserScript==


var	REFRESH_DELAY = 1; // in seconds
var	currentTime = new Date()
var	hour = currentTime.getHours();
var	minute = currentTime.getMinutes();
var	second = currentTime.getSeconds();
        if(second < 10)
           second = "0" + second;
var	time = hour + ":" + minute + ":" + second;


function time2()
{
var second2 = second;
var minute2 = minute + 30;
var hour2 = hour;
var time2;

  if(minute2 >= 60)
  {
     hour2++;
     minute2 = minute2 - 60;
  }
  if(hour2 >= 24)
  {
     hour2 = hour2 - 24;
  }

time2 = hour2 + ":" + minute2 + ":" + second2;

if(minute < 10)
   minute = "0" + minute;
if(minute2 < 10)
   minute2 = "0" + minute2;

return time2;
}

function searcherVS()
{

var bodyText, search, search2, search3, searchF, searchF2, searchF3;

bodyText = document.getElementsByTagName("body")[0].innerHTML;

search = "Még nem látható";

searchF = bodyText.indexOf(search);

if(searchF == -1 )
{
   alert("SearchF :" + searchF );  
}

else
   alert("Else SearchF :" + searchF ); 
   document.getElementById('iwantit').click();
   setTimeout(function() { location.reload(); }, REFRESH_DELAY * 5 * 1000);
}


searcherVS()