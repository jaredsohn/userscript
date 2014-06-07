// ==UserScript== 
// @name Gooooglere 
// @description Scrolls through Pages 
// @include http://www.google.com.sa/
// ==/UserScript==

var websites = [ // Here you can fill up the wanted sites and jump times in seconds. 
 ["http://www.youtube.com", 2], 
 ["http://www.pkmns.com/levelup.php?id=2", 1], 
 ["http://www.pkmns.com/levelup.php?id=3", 1], 
 ["http://www.pkmns.com/levelup.php?id=4", 1], 
 ["http://www.pkmns.com/levelup.php?id=5", 1], 
 ["http://www.pkmns.com/levelup.php?id=6", 1], 
 ["http://www.pkmns.com/levelup.php?id=7", 1], 
 ["http://www.pkmns.com/levelup.php?id=8", 1], 
 ["http://www.pkmns.com/levelup.php?id=9", 1], 
 ["http://www.pkmns.com/levelup.php?id=10", 1], 
 ["http://www.pkmns.com/levelup.php?id=11", 1], 
 ["http://www.pkmns.com/levelup.php?id=12", 1], 
 ["http://www.pkmns.com/levelup.php?id=13", 1], 
 ["http://www.pkmns.com/levelup.php?id=14", 1], 
 ["http://www.pkmns.com/levelup.php?id=15", 1] 
];

for (var i = 0; i < websites.length; i++) { 
  
if (document.location.href == websites[i][0]) { 
 setTimeout(function() { 
 document.location.href = websites[(i+1)%websites.length][0]; 
 }, websites[i][1]*1000); 
 break; 
 } 
}