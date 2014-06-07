// ==UserScript==
// @name        DCI New HIT Monitor for mturk
// @namespace   wutevs
// @description Monitors for new HITs from requesters on your list
// @include     https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&qualifiedFor=on&sortType=LastUpdatedTime%3A1
// @version     9000
// @grant       none
// ==/UserScript==

var needles = new Array(
    
    
//==[This is your requester list. Add or remove whatever you like]==\\
//==[If you make a typo and break it, you'll know, because it won't reload]==\\
    
"ACME Data Collection",
"agent agent",
"AJ Ghergich",
"Andy K",
"BICC",
"Bluejay Labs",
"carnegie mellon social computing group",
"Christos Koritos",    
"Dan Shaffer",
"David Mease",
"Funicular Heavy Industries",
"Gaddy",    
"Heather Walters",
"JASON W GULLIFER",
"Jeff Foster",
"jesse egbert",
"Jonathan Frates",
"Leonid",
"nabirds",
"nlp",    
"OCMP",
"Parisa",
"Personagraph",
"pickfu",
"Procore", 
"Project Endor",
"Project Gandolph",
"Sergey Schmidt",
"SIRIUSProject",
"Smartsheet",
"Spreecast",
"Stiglitz",
"Tag Requester",
"Two Lakes",
"User Manual",
"vaplab",    
"Vesterman",
"UW Social", 
"Wharton",    
"World Vision",
"x8 data"
    
//==[Be careful not to put a comma after the last item on your list]==\\    
    
);

var haystack = document.body.innerHTML;

var my_pattern, my_matches, found = "";
for (var i=0; i<needles.length; i++){
  my_pattern = eval("/" + needles[i] + "/gi");
  my_matches = haystack.match(my_pattern);
  if (my_matches){
    found += "\n" + my_matches.length + " found for " + needles[i]; 
  }
}

//===[Settings]===\\
mCoinSound = new Audio("http://static1.grsites.com/archive/sounds/musical/musical002.wav"); //==[This is the path to the mp3 used for the alert]==\\
//===[Settings]===\\                                                          //==[Just change the url to use whatever sound you want]==\\

if (found != "") 
    
{
    
mCoinSound.play(); 

setTimeout(function(){alert("Alert" + found)}, 2000);//==[This number is the delay between your sound alert and popup alert. 1000 is 1 second. You may need to increase the delay if the popup is frequently cutting off your sound before it can play]==\\
    
//===[Settings]===\\
var StRefTime = '300';  //==[This is the number of seconds HIT monitor sleeps after the alert is clicked]
//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);
}
else
//===[Settings]===\\
var StRefTime = '5';  //==[This is the number of seconds between page reloads]
//===[/Settings]===\\
    
if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);    
    



                      