// ==UserScript==
// @name          WeeWar Notes
// @namespace     http://gibberish.com/hacks/gm
// @author        Mike Sugarbaker
// @description   Keep private strategy notes on your WeeWar games so you don't lose the thread between turns
// @include       http://*weewar.com/game/*
// ==/UserScript==

(function(){
	var gameid = (/game\/([0-9]*)/g).exec(window.location.href)[1];
	
	var notes = document.createElement("div");
	var hed = document.createElement("h2");
	hed.appendChild(document.createTextNode("Notes"));
	hed.style.fontWeight = 'bold';
	notes.appendChild(hed);
	
	var notefld = document.createElement("textarea");
	notefld.style.width = "290px";
	notefld.style.height = "120px";
	notefld.value = GM_getValue('weewarnotes_' + gameid, '');
	notefld.addEventListener('keyup', function(e){
		GM_setValue('weewarnotes_' + gameid, this.value);
	},false);
	notes.appendChild(notefld);
	
	notes.style.marginBottom = "12px";
	
	document.getElementById('game_controls').appendChild(notes);
})();
