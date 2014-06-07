//
// ==UserScript==
// @name          Cooks
// @namespace     http://userscripts.org/
// @description   Script to work out if 2 players from same class are in same game
// @include       http://www.conquerclub.com/*
// @include       https://www.conquerclub.com/*
// ==/UserScript==

var ghist = [];
var mhist = [];
var npages = 0;
var ghistobj;

var uname = "chipv";
var gorder = new Array();

function getText() {
	var jump = 'http://www.fileden.com/files/2008/5/8/1902058/tour.txt?nocache=' + Math.random();
  ghistobj = new XMLHttpRequest();	
    if ("withCredentials" in ghistobj){
GM_xmlhttpRequest({
  method: 'GET',
  url: jump,
  headers: {
  },
  onload: function(responseDetails) {
	  	      alert(responseDetails.responseText);
  }
});
	} 
	else if (typeof XDomainRequest != "undefined"){
   	ghistobj = new XDomainRequest();
    ghistobj.open('GET', jump);
  ghistobj.onreadystatechange = function() {
  	if (ghistobj.readyState == 4) {
	  	      alert(ghistobj.responseText);

  	}
	}
  ghistobj.send(null);
  } 
	
}

function getGames(page) {
  var jump = 'http://www.conquerclub.com/api.php?mode=gamelist&events=Y&gs=F&un=' + uname;
  if(page > 1) jump += "&page=" + page;
  ghist["paging" + page] = new XMLHttpRequest();
    if ("withCredentials" in ghist["paging" + page]){
  	ghist["paging" + page].open('GET', jump, true);
	} 
	else if (typeof XDomainRequest != "undefined"){
   	ghist["paging" + page] = new XDomainRequest();
    ghist["paging" + page].open('GET', jump);
  } 

  ghist["paging" + page].open('GET', jump, true);
  ghist["paging" + page].onreadystatechange = function() {
  	if (ghist["paging" + page].readyState == 4) {
    	var parser = new DOMParser();
    	var dom = parser.parseFromString(ghist["paging" + page].responseText,"application/xml");
    	var games = dom.getElementsByTagName('game');
    	var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;
    	var numGames = parseInt(dom.getElementsByTagName('games')[0].getAttribute('total'));
    	var pn;
    	
      if(pages.match(/^(\d+) of (\d+)$/)) {
        numPages = parseInt(RegExp.$2);
        pn = parseInt(RegExp.$1);
      }
      if(page == 1) {
       if(numPages > 1) {
         for(var pg=2;pg<=numPages;pg++) {
          getGames(pg);
         }
       }
      }
    	npages++;
    	gorder.push(pn);
    	if(npages == numPages) {
    	alert(gorder);
  		}
  	}
  }
  ghist["paging" + page].send(null);
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
	getText();
}
}