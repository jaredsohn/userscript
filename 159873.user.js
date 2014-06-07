// ==UserScript==
// @name           TH Drop Tracking
// @author         Sena
// @description    Tracks item drops
// @include        http://www.twilightheroes.com/fight.php*
// @include        http://twilightheroes.com/fight.php*
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var tdList = document.getElementsByTagName("td");
var Body = document.getElementsByTagName("body")[0];
var Enemy = document.getElementById("enemy");
var Noncombat = document.getElementsByTagName("h2")[0];
var DropCheck = /^You got an item: (.+) /;
var IgnoreList = ["crimebusters IOU","water du lac","city map code","financial spreadsheet code","physiology scan code","signal processing code","statistical analysis code","moderately encrypted swipe card","somewhat encrypted swipe card","slightly encrypted swipe card","decrypted swipe card","tritanium","polysteel","red horse pill","athelas capsule","bleeding edge medkit","regoodened draught","byzantium","hyper-c, small","postprecoffee","hyper-c, drop","hyper-c, large","steamwork core","pentium","custom Evader","waaambulance","lightningcycle","a team van","motorpede","luxury chameleon","Lexura Infinides D20","paladinum","yuggothium","malkamite","athelas leaf","hunk of scrap metal"]
var NoncombatTrackList = ["Dumpster Diving","Oh I Loooooove Trash!"];
var VictoryCheck1 = /Victory! You beat up your foe and win the combat!/;
var VictoryCheck2 = /Your foe beats itself up\. You win the battle\./;
if (Enemy) {
	for (var j = 0; j < tdList.length; j++) {
		if (DropCheck.test(tdList[j].textContent) && IgnoreList.indexOf(DropCheck.exec(tdList[j].textContent)[1])==-1) {
			GM_setValue(Enemy.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],GM_getValue(Enemy.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],0)+1)
			}
		}
	if (VictoryCheck1.test(Body.textContent) || VictoryCheck2.test(Body.textContent)) {
		GM_setValue( Enemy.textContent, GM_getValue( Enemy.textContent, 0)+1)
		}
	}
else if (Noncombat) {
	if (NoncombatTrackList.indexOf(Noncombat.textContent)!=-1) {
		GM_setValue( Noncombat.textContent, GM_getValue( Noncombat.textContent, 0)+1)
		for (var j = 0; j < tdList.length; j++) {
			if (DropCheck.test(tdList[j].textContent) && IgnoreList.indexOf(DropCheck.exec(tdList[j].textContent)[1])==-1) {
				GM_setValue(Noncombat.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],GM_getValue(Noncombat.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],0)+1)
				}
			}
		}
	}
if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear Item Drop Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',dropClear,true);}
function dropClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("Item drops cleared")
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
		if(key.indexOf('|')!=-1) {
			var drops = GM_getValue(key);
			var fights = GM_getValue(key.substring(0, key.indexOf('|')));
			data = data + key + ":\t{{statrate|" + fights + "|" + drops + "|+}}\n";
			}
		}
	l.value = data;
	h.innerHTML = "<h2>Drop Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}