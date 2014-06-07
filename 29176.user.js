// ==UserScript==
// @name           Highlight My Players in Play by Play
// @namespace      KHMI - Greasemonkey
// @description    Highlight all of my players in the PBP list to make them easier to find.
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

var timeout = 0;
var highlightStyle = "font-weight:700;background-color:yellow;";

window.setTimeout( function() {
   var url = window.location.href;
   var players = [];

   if(url == "http://goallineblitz.com/game/home.pl"){
      // collect a list of my players from the home page and save them
      var playerHead = getElements("*", "class", "large_title_bar playerhead");
      for(var i=0;i<playerHead.length;i++){
         var value = playerHead[i].childNodes[2].textContent;
         var playerUrl = playerHead[i].childNodes[2].attributes[1].textContent.split("player_id=");
         var key = playerUrl[1];         
         players.push(key);
         players.push(value);
      }
      GM_setValue("myPlayers", players.join());
   }else{
      // on all the other @include pages show the player navigation
      var savedPlayers = GM_getValue("myPlayers", null);
      var myPlayers= new Array();
      if(savedPlayers != null){      
         var players = savedPlayers.split(",");
         for(var i=0;i<players.length;i=i+2){
            myPlayers[players[i]] = players[i+1];
         }         
         
         highlightPlayers(myPlayers);
      }
   }
},timeout);

function highlightPlayers(myPlayers){
   var pbpinfo
   var allPBP = getElements("*", "class", "pbp_play");
   for (var i = 0; i < allPBP.length; i++) {
      for(var key in myPlayers){
         if (allPBP[i].innerHTML.indexOf(myPlayers[key]) != -1) {
            allPBP[i].innerHTML = allPBP[i].innerHTML.replace(myPlayers[key], "<span style='" + highlightStyle + "'>" + myPlayers[key] + "</span>");
         }
      }
   }
}

function getElements(element, classname, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}