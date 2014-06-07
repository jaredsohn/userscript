// ==UserScript==
// @name           TH StatGain Tracking
// @author         Sena
// @description    Tracks activations of statgain accessories
// @include        http://www.twilightheroes.com/fight.php*
// @include        http://twilightheroes.com/fight.php*
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var Body = document.getElementsByTagName("body")[0];
var StrCheck = /Your equipment has given you an extra-good physical training\. You get an extra Strength point!/;
var IntCheck = /Your equipment has given you an extra-good intellectual training\. You get an extra Intellect point!/;
var RefCheck = /Your equipment has given your reflexes extra-good practice\. You get an extra Reflex point!/;
if (/Patrol again/.test(Body.textContent) || /The fight is now over, and it's not pretty\./.test(Body.textContent)) {
	GM_setValue("Total",GM_getValue("Total",0)+1)
	}
if (StrCheck.test(Body.textContent)) {
	GM_setValue("Strength",GM_getValue("Strength",0)+1)
	}
if (IntCheck.test(Body.textContent)) {
	GM_setValue("Intellect",GM_getValue("Intellect",0)+1)
	}
if (RefCheck.test(Body.textContent)) {
	GM_setValue("Reflexes",GM_getValue("Reflexes",0)+1)
	}
if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear StatGain Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',sgClear,true);}
function sgClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("StatGain data cleared")
	}
if(/journal-notes/.exec(location.href)) {
	var c = document.getElementsByTagName('form')[0];
	var b = document.getElementsByTagName('textarea')[0];
	b.rows = 10;
	var f = document.createElement('table');
	var g = document.createElement('tr');
	var h = document.createElement('td');
	var l = document.createElement('textarea');
	l.rows = 3;
	l.cols = 60;
	l.readOnly=true;
	var data = "";
	var keys = GM_listValues().sort();
	for (var i=0, key=null; key=keys[i]; i++) {
		if (!/Total/.test(key)) {
			var count = GM_getValue(key);
			var total = GM_getValue("Total");
			data = data + key + ":\t{{statrate|" + total + "|" + count + "}}\n";
			}
		}
	l.value = data;
	h.innerHTML = "<h2>StatGain Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}