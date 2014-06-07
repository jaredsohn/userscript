// ==UserScript==
// @name           Rubysoccer Negotiations Plus
// @namespace      http://www.rubysoccer.com/game/team_players/
// @description    Add new features in you negotiations list
// @include        http://www.rubysoccer.com/game/negotiations/*
// @version 0.1.0
// @contributor Ulisses Buonanni
// ==/UserScript==

var opcoes = 'Predefined Wages: <a id=\'e100\' \'>100</a> - <a id=\'e200\' \'>200</a> - <a id=\'e400\' \'>400</a> - <a id=\'e800\' \'>800</a> - <a id=\'e1600\' \'>1600</a> - <a id=\'e3200\' \'>3200</a> - <a id=\'e6400\' \'>6400</a> - <a id=\'e12800\' \'>12800</a> - <a id=\'e25600\' \'>25600</a><br><br><br><label for=\"contract_length\">';
document.body.innerHTML = document.body.innerHTML.replace(/<label for=\"contract_length\">/g, opcoes);
//document.setElementById('wage').value = "199";
//alert(document.getElementById('wage').value);
//document.getElementById('wage').value = "";
//addEventListener
document.getElementById('e100').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "100";
}, false);

document.getElementById('e200').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "200";
}, false);

document.getElementById('e400').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "400";
}, false);

document.getElementById('e800').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "800";
}, false);

document.getElementById('e1600').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "1600";
}, false);

document.getElementById('e3200').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "3200";
}, false);

document.getElementById('e6400').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "6400";
}, false);

document.getElementById('e12800').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "12800";
}, false);

document.getElementById('e25600').addEventListener("click", function(event) { 
	document.getElementById('wage').value = "25600";
}, false);

