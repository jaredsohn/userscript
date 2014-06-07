// ==UserScript==
// @name		Szwat napiparancs
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
container.innerHTML = "<b>SzWAT-napiparancs: Loading...</b>";
var container = parent.insertBefore(container,document.getElementById("menu").nextSibling);
parent.insertBefore(document.createElement("div"),container.nextSibling).style.clear = 'left';
GM_xmlhttpRequest({
	method: "GET",
	url: "http://users.atw.hu/csiguusz/parancs/kiiras.php",
	onload: 
	function(response) {
		var valasz = eval(response.responseText);
		container.style.backgroundColor = valasz[2] ? valasz[2] : '#E9F5FA';
		container.innerHTML = '<strong>SzWAT-napiparancs: </strong><a href="http://www.erepublik.com/en/military/battlefield/'+valasz[0]+'" style="color:#000000; text-decoration:underline">[CsataLink]</a><strong>\tParancs: '+valasz[1]+'</strong> | Még <span id="conspan"></span> van hátra | by '+valasz[4];
		var conspan = document.getElementById('conspan');
		
		function updateClock() {
			var diff = valasz[3] - Math.round(new Date().getTime()/1000);
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