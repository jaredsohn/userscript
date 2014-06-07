//
// ==UserScript==
// @name          Ready Turns
// @namespace     http://userscripts.org/
// @description   Adds Number of Turns to Mygames Link.
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var najax = [];
var pagecol = 0;
var turns = 0;
var left,leftdivs;
var lf;

function getGames(pid,page) {
	var nump = 'http://www.conquerclub.com/api.php?mode=gamelist&gs=A&u=' + pid;		 			
	najax['turns' + page] = new XMLHttpRequest();
	najax['turns' + page].open('GET', nump, true);
	najax['turns' + page].onreadystatechange = function() {
		if (najax['turns' + page].readyState == 4) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(najax['turns' + page].responseText,"application/xml");
			var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
			var games = dom.getElementsByTagName('game');
    	if(pages.match(/^(\d+) of (\d+)$/)) {
    		numPages = parseInt(RegExp.$2);
    		if(page == 1) {
      		if(numPages > 1) {
        		for(var pg=2;pg<=numPages;pg++) {
          		getGames(pid, pg);
       			}
       		}
      	}
    	}
    	for(var g=0; g< games.length; g++) {
        var players = games[g].getElementsByTagName('player');
        for(var y=0;y<players.length;y++) {
	        if(players[y].firstChild.nodeValue == pid) {
		        if(players[y].getAttribute('state') == "Ready") turns++;
		        break;
	        }
        }
			}
			pagecol++;
			if(pagecol==numPages && turns) displayTurns();
		}
	}	
	najax['turns' + page].send(null);
}

function displayTurns() {
	var mygames = leftdivs[lf].getElementsByTagName('li')[0].getElementsByTagName('a')[0];	    	
	var span = document.createElement('span');
	span.className = "inbox";
	if(turns > 1) span.innerHTML = ' [ ' + turns + ' turns ]';
	else span.innerHTML = ' [ 1 turn ]';
	mygames.appendChild(span);	    	
}

function displayGame() {
 left = document.getElementById('leftColumn');
 leftdivs = document.getElementById('leftColumn').getElementsByTagName('div');
 for(lf=0; lf<leftdivs.length;lf++) {
	 if(leftdivs[lf].className == "vnav") {
 		var para = leftdivs[lf].getElementsByTagName('a');
 		if(para[0]) {
 			for(var p=para.length-1;p>=0;p--) {
	 			if(para[p].href.match(/u=(\d+)#wall/)) {		 					 			
		 			getGames(RegExp.$1,1);
		 			break;
	 			}
 			}
		}		 			
 		break;
 	}
 }
}

displayGame();


