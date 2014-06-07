// ==UserScript==
// @name           TH Exp/Chips Tracking
// @author         Sena
// @description    Tracks min/max experience and chips
// @include        http://www.twilightheroes.com/fight.php*
// @include        http://twilightheroes.com/fight.php*
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var Result = document.getElementById("result");
var Enemy = document.getElementById("enemy");
var Noncombat = document.getElementsByTagName("h2")[0];
if (Result && Enemy) {
	var Chips = parseInt(Result.attributes.getNamedItem("data-chips").textContent);
	var Exp = parseInt(Result.attributes.getNamedItem("data-xp").textContent);
	if (Exp > GM_getValue(Enemy.textContent + "|" + "ExpHigh", 0)) {
		GM_setValue(Enemy.textContent + "|" + "ExpHigh",Exp)
		}
	if (Exp < GM_getValue(Enemy.textContent + "|" + "ExpLow", 1000000000)) {
		GM_setValue(Enemy.textContent + "|" + "ExpLow",Exp)
		}
	if (Chips > GM_getValue(Enemy.textContent + "|" + "ChipsHigh", 0)) {
		GM_setValue(Enemy.textContent + "|" + "ChipsHigh",Chips)
		}
	if (Chips < GM_getValue(Enemy.textContent + "|" + "ChipsLow", 1000000000)) {
			GM_setValue(Enemy.textContent + "|" + "ChipsLow",Chips)
		}
	}
else if (Noncombat) {
	var Body = document.getElementsByTagName("body")[0].textContent;
	if (/You gain \d+ XP/.test(Body)) {
		var Exp = parseInt(/You gain (\d+) XP/.exec(Body)[1]);
		if (Exp > GM_getValue(Noncombat.textContent + "|" + "ExpHigh", 0)) {
			GM_setValue(Noncombat.textContent + "|" + "ExpHigh",Exp)
			}
		if (Exp < GM_getValue(Noncombat.textContent + "|" + "ExpLow", 1000000000)) {
			GM_setValue(Noncombat.textContent + "|" + "ExpLow",Exp)
			}
		}
	if (/You gain \d+ chips/.test(Body)) {
		var Chips = parseInt(/You gain (\d+) chips/.exec(Body)[1]);
		if (Chips > GM_getValue(Noncombat.textContent + "|" + "ChipsHigh", 0)) {
			GM_setValue(Noncombat.textContent + "|" + "ChipsHigh",Chips)
			}
		if (Chips < GM_getValue(Noncombat.textContent + "|" + "ChipsLow", 1000000000)) {
			GM_setValue(Noncombat.textContent + "|" + "ChipsLow",Chips)
			}
		}
	}
if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear Exp/Chips Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',ecClear,true);}
function ecClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("Exp and chips cleared")
	}
if(/journal-notes/.exec(location.href)) {
	var c = document.getElementsByTagName('form')[0];
	var b = document.getElementsByTagName('textarea')[0];
	b.rows = 10;
	var f = document.createElement('table');
	var g = document.createElement('tr');
	var h = document.createElement('td');
	var l = document.createElement('textarea');
	l.rows = 10;
	l.cols = 60;
	l.readOnly=true;
	var data = "";
	var keys = GM_listValues().sort();
	for (var i=0, key=null; key=keys[i]; i++) {
		var value = GM_getValue(key);
		data = data + key + ":\t" + value + "\n";
		}
	l.value = data;
	h.innerHTML = "<h2>Exp/Chips Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}