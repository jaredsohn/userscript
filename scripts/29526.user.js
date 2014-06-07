// ==UserScript==
// @name           GLB Player Position Notes
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

// to add a player make an entry using the player ID followed by a colon followed by the note inside quotes ""
// playerId:"(AB1)" and add it to the notes array, each entry has to be seperated by a comma
// the player ID is the number in the URL for the player for example:
// http://goallineblitz.com/game/player.pl?player_id=611092 - here the player ID is 611092
var notes = {190055:"(FB2)", 611092:"(WR7)",188692:"(RDE)"};
var timeout = 0;

var url = window.location.href;

window.setTimeout( function() {
   if(url == "http://goallineblitz.com/game/home.pl"){
      // <div class="player_name"><a href="/game/player.pl?player_id=123456">Player Name Here</a> (AB)</div>
      var playername = getElementsByClassName("player_name", document);
      var re = /player_id=(\d{1,7})">(.+)<\/a>\s(.+)/g;   
      for(var i=0;i<playername.length;i++) {      
         var matches = playername[i].innerHTML.match(re);
         var pos = matches[0].replace(re, "$3");
         var playerId = matches[0].replace(re, "$1")
         playername[i].innerHTML = playername[i].innerHTML.replace(matches[0].replace(re, "$3"),  notes[playerId]);
      }
   }else{
      // <div id="player_name">(AB) Player Name Here</div>
      var currentId = url.substring(window.location.href.indexOf('_id=')+4, url.length);
      var player_name = document.getElementById("player_name");
      var re = /(.+)\s(.+)/g;   
      var matches = player_name.innerHTML.match(re);
      player_name.innerHTML = player_name.innerHTML.replace(matches[0].replace(re, "$1"),  notes[currentId]);
   }
},timeout);

function getElementsByClassName(classname, par){
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');    	
	var els = par.getElementsByTagName("*"); 
	for(var i=0,j=els.length; i<j; i++){       
		if(re.test(els[i].className)){	
			a.push(els[i]);
		}
	}
	return a;
};