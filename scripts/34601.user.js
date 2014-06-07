// ==UserScript==
// @name           dAmn Mad Libs
// @namespace      http://www.paramour.net78.net/
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

 function teeth() {
  function arrMatch(patt, string) {
   var arr=new Array();
   var r=0;
   var patt1=new RegExp(patt,"g");
   do {
    result=patt1.exec(string);
    if(result!=null && result!="" && result!=undefined) {
     arr[r]=result;
    }
    r++;
   }
   while (result!=null)
   return arr;
  }
  function promptandstrip() {
   var xi;
   var where = prompt("What Channel?\n\nPlease exclude the '#' from the name.");
   if(where!=null && where!="") {
    where="chat:"+where;
    var msg = prompt("Message:");
    if (msg!=null && msg!="") {
     var noun = new Array(
      "glasses",
      "pen",
      "film",
      "toilet",
      "table",
      "cup of water",
      "dildo",
      "paper",
      "computer",
      "piano",
      "tree",
      "timer",
      "clock",
      "stereo",
      "CD",
      "DVD",
      "video tape",
      "cell phone",
      "guitar",
      "accordian"
     );
     var adj = new Array(
      "slimey",
      "hairy",
      "beautiful",
      "sticky",
      "ugly",
      "musical",
      "genuine",
      "fake",
      "broken",
      "dark",
      "bright",
      "light",
      "awesome",
      "stupid",
      "unintelligent",
      "dorky",
      "large",
      "small",
      "gigantic",
      "pale",
      "colorful"
     );
     var person = new Array( 
      "Shaq",
      "David Copperfield",
      "Jerry Seinfield",
      "Bill Gates",
      "Steve Jobs",
      "Michael Jackson",
      "Jesus",
      "Tom Cruise",
      "Adam Sandler",
      "Your Mom",
      "Tupac",
      "Eminem",
      "Britney Spears",
      "Lindsey Lohan"
     );
     var city = new Array(
      "Amsterdam",
      "Paris",
      "Brussels",
      "New York City",
      "San Francisco",
      "Hollywood",
      "Omaha",
      "Denver",
      "Miami",
      "Minneapolis",
      "St. Paul",
      "Washington D.C.",
      "Venice",
      "Rome",
      "Stockholm",
      "London",
      "Cornwall",
      "Hong Kong",
      "Japan",
      "Sydney"
     );
     var cont = new Array(
      "Africa",
      "North America",
      "South America",
      "Australia",
      "Antarctica",
      "Asia",
      "Europe",
      "Australia"
     );
     var country = new Array(
      "Kenya",
      "Iraq",
      "The United Kingdom",
      "Germany",
      "Ireland",
      "Canada",
      "Spain",
      "Portugal",
      "Brazil",
      "India",
      "The United States of America",
      "Argentina",
      "Columbia",
      "Vietnam",
      "North Korea",
      "South Korea",
      "Laos",
      "Cambodia",
      "Iran",
      "Israel",
      "Saudi Arabia",
      "South Africa",
      "Mali",
      "Ghana",
      "Madagascar",
      "New Zealand",
      "Switzerland",
      "Ukraine",
      "Georgia",
      "Russia",
      "China",
      "Japan",
      "France",
      "Poland",
      "Greenland",
      "Iceland",
      "Sweden",
      "Norway",
      "Finland"
     );
     var bodypart = new Array(
      "mouth",
      "teeth",
      "finger",
      "toe",
      "arm",
      "hand",
      "leg",
      "foot",
      "head",
      "nose",
      "eye",
      "ear",
      "penis",
      "vagina",
      "ass"
     );
     var band = new Array(
      "3 Doors Down",
      "The Jackson 5",
      "The Bee Gees",
      "Hinder",
      "Paramore",
      "P!nk",
      "The White Stripes",
      "Green Day",
      "The Beatles",
      "The Beach Boys",
      "The Blues Brothers",
      "Boys II Men",
      "D12",
      "Joan Jett and the Blackhearts",
      "Buddy Holly and the Crickets",
      "Fall Out Boy"
     );
     var animal = new Array(
      "frog",
      "pig",
      "rabbit",
      "salamander",
      "tortoise",
      "sea turtle",
      "turtle",
      "dog",
      "cat",
      "bird",
      "fish",
      "bat",
      "eagle",
      "octopus",
      "shark",
      "whale",
      "elephant",
      "zebra"
     );
     var color = new Array(
      "red",

      "white",
      "blue",
      "black",
      "green",
      "purple",
      "pink",
      "magenta",
      "yellow",
      "turquoise",
      "brown"
     );
     var l, o;
     var personS, nounS, adjS, colorS, animalS, bandS, bodypartS, countryS, contS, cityS;
     personS=arrMatch("_person_", msg);
     nounS=arrMatch("_noun_", msg);
     adjS=arrMatch("_adj_", msg);
     animalS=arrMatch("_animal_", msg);
     bandS=arrMatch("_band_", msg);
     bodypartS=arrMatch("_body part_", msg);
     countryS=arrMatch("_country_", msg);
     contS=arrMatch("_continent_", msg);
     cityS=arrMatch("_city_", msg);
     for(l in animalS) {
      var crazy = Math.floor(Math.random()*animal.length)
      o = animal[crazy];
      msg=msg.replace(animalS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in bandS) {
      var crazy = Math.floor(Math.random()*band.length)
      o = band[crazy];
      msg=msg.replace(bandS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in bodypartS) {
      var crazy = Math.floor(Math.random()*bodypart.length)
      o = bodypart[crazy];
      msg=msg.replace(bodypartS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in countryS) {
      var crazy = Math.floor(Math.random()*country.length)
      o = country[crazy];
      msg=msg.replace(countryS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in cityS) {
      var crazy = Math.floor(Math.random()*city.length)
      o = city[crazy];
      msg=msg.replace(cityS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in contS) {
      var crazy = Math.floor(Math.random()*cont.length)
      o = cont[crazy];
      msg=msg.replace(contS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in personS) {
      var crazy = Math.floor(Math.random()*person.length)
      o = person[crazy];
      msg=msg.replace(personS[l], o);
      delete(crazy);
      delete(o);
     }
     for(l in nounS) {
      var crazy = Math.floor(Math.random()*noun.length)
      o = noun[crazy];
      msg=msg.replace(nounS[l], o);
      delete(crazy);
      delete(o);
     }            
     for(l in adjS) {
      var crazy = Math.floor(Math.random()*adj.length)
      o = adj[crazy];
      msg=msg.replace(adjS[l], o);
      delete(crazy);
      delete(o);
     }
     // Safer than dAmn_Raw
     unsafeWindow.dAmnChats[where].Send( "msg", "main", msg );
    } 
   }
  }
  promptandstrip();
 }
 GM_registerMenuCommand("Mad Libs", teeth);

