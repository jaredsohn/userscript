// ==UserScript==
// @name		Klón Hadsereg Napiparancs
// @version		0.21
// @description	Mindig látható helyre rakja a napiparancsot
// @author		Windozer
// @namespace	Windozer
// @include		http://ww*.erepublik.com/*
// ==/UserScript==

GM_addStyle("#menu { margin: 0; } #klonparancs { display: block; float: left; margin: 8px 0 18px 0; padding: 0; position: relative; padding: 5px; -moz-border-radius: 5px;}");
var parent = document.getElementById("container");
var container = document.createElement("div");
container.id = "klonparancs";
container.innerHTML = "<b>KHNP: Loading...</b>";
var container = parent.insertBefore(container,document.getElementById("menu").nextSibling);
parent.insertBefore(document.createElement("div"),container.nextSibling).style.clear = 'left';
GM_xmlhttpRequest({
	method: "GET",
	url: "http://karbon.ingyentar.info/wdz/kh",
	onload: function(response) {

		var valasz = eval('(' + response.responseText + ')');

		container.style.backgroundColor = valasz[3] ? valasz[3] : '#E9F5FA';
		container.innerHTML = '<b>KHNP: </b> <b><a href="http://www.erepublik.com/en/battles/show/'+valasz[0]+'" style="font-variant: small-caps;">['+valasz[2]+']</a></b>  '+valasz[1]+' <b>(Még <span id="conspan"></span>)</b>';
		var conspan = document.getElementById('conspan');
		
		function updateClock() {
			var diff = valasz[4] - Math.round(new Date().getTime()/1000);
			if (diff <= 0) {
				conspan.innerHTML = '00:00';
				clearInterval(azinterval);
				return;
			}
			var c;
			conspan.innerHTML = ((c = Math.floor(diff / (60 * 60))) != 0 ? c+':' : '' );
			diff %= (60 * 60);
			conspan.innerHTML += (c = Math.floor(diff / 60)) > 9 ? c : '0'+c;
			diff %= 60;
			conspan.innerHTML += ':'+((c = Math.floor(diff)) > 9 ? c : '0'+c);
		}
		updateClock();
		var azinterval = setInterval(updateClock,1000);
	}
});