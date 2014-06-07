// ==UserScript==
// @name           unXify
// @namespace      http://boards.4chan.org/b/*
// @description    Removes the last 3 X's on /b/ and /v/ and replaces them with the postnumber
// @include        http://boards.4chan.org/b/*
// @include        http://boards.4chan.org/v/*
// @version        0.9.2
// ==/UserScript==

var links;
var busy=false;
var i=0;
var interval;
var docnode;

function CheckANumber(fp){
	for(var n=0;n<5;n++){
		if(i++<links.length-1){
			var lnk=links[i];
			if(lnk.innerHTML.match(/\d+XXX/)){
				lnk.href.match(/(\d+)('|$)/);
				lnk.innerHTML=RegExp.$1;
			}
		}else{
			links={};
			i=0;
			clearInterval(interval);
			busy=false;	
		}
	}
}

function fixPostNumbers()
{
	if(busy)return;
	links = document.getElementsByTagName("a");
	busy=true;
	interval=setInterval(CheckANumber,1);
}

fixPostNumbers();
document.getElementsByName('delform')[0].addEventListener ('DOMNodeInserted', fixPostNumbers, true);

