// ==UserScript==
// @name           TH Eskrima Tracking
// @author         Sena
// @description    Tracks Eskrima master attacks
// @include        http://www.twilightheroes.com/fight.php
// @include        http://twilightheroes.com/fight.php
// @include        http://www.twilightheroes.com/nav.php
// @include        http://twilightheroes.com/nav.php
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var Body = document.getElementsByTagName("body")[0];
var LevelCheck = /Level (\d+)/;
var AttackCheck1 = /twirls a rattan stick around impressively/;
var AttackCheck2 = /demonstrates how two rattan sticks are better than one/;
var AttackCheck3 = /flips through a endless array of belts and hiding places/;
var AttackCheck4 = /pulls out a pair of butterfly knives/;
var AttackCheck5 = /tries to grab your opponent, but gets completely distracted/;
var AttackCheck6 = /tries to do that awesome flipping thing with a butterfly knife, but just ends up dropping it/;
if (LevelCheck.exec(Body.textContent)) {
	GM_setValue("Level", LevelCheck.exec(Body.textContent)[1])
	}
if (AttackCheck1.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack1", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack1", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck2.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack2", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack2", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck3.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack3", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack3", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck4.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack4", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack4", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck5.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack5", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack5", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck6.test(Body.textContent)) {
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack6", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Attack6", 0)+1)
	GM_setValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", GM_getValue( document.getElementById("enemy").textContent + "|Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck1.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack1", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack1", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck2.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack2", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack2", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck3.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack3", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack3", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck4.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack4", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack4", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck5.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack5", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack5", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if (AttackCheck6.test(Body.textContent)) {
	GM_setValue( "Level" + GM_getValue("Level",0) + "Attack6", GM_getValue( "Level" + GM_getValue("Level",0) + "Attack6", 0)+1)
	GM_setValue( "Level" + GM_getValue("Level",0) + "Total", GM_getValue( "Level" + GM_getValue("Level",0) + "Total", 0)+1)
	}
if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear Eskrima Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',eskrimaClear,true);}
function eskrimaClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("Eskrima attacks cleared")
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
		if (key.indexOf('|')==-1) {
			if (/^Level\d+Attack\d+$/.test(key)) {
				var attacks = GM_getValue(key);
				var total = GM_getValue(/^(.+|Level\d+)Attack\d+$/.exec(key)[1] + "Total");
				data = data + key + ":\t{{statrate|" + total + "|" + attacks + "}}\n";
				}
			}
		else {
			if (/Level\d+Attack\d+/.test(key)) {
				var attacks = GM_getValue(key);
				var total = GM_getValue(/^(.+|Level\d+)Attack\d+$/.exec(key)[1] + "Total");
				data = data + key + ":\t{{statrate|" + total + "|" + attacks + "}}\n";
				}
			}
		}
	l.value = data;
	h.innerHTML = "<h2>Eskrima Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}