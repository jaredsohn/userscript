// ==UserScript==
// @name           TH Software Tracking
// @author         Sena
// @description    Tracks software activations
// @include        http://www.twilightheroes.com/fight.php*
// @include        http://twilightheroes.com/fight.php*
// @include        http://www.twilightheroes.com/nav.php
// @include        http://twilightheroes.com/nav.php
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var Body = document.getElementsByTagName("body")[0];
var SoftwareEffects = ["Prepunctuality","On Camera","Financial Prudence","T.a.I.L.o.R.","Betting on the Stars","Surfing for Lulz"];
var LookOutCheck = /Your watch beeps with a reminder from your GigantoFirm LookOut software\. The reminder keeps you punctual, saving you \d+ seconds\./;
var IMyselfCheck = /After the fight you replay a particularly cool maneuver and study it thoroughly, earning you an additional \d+ XP\./;
var PennyPincherCheck = /Your watch beeps with a suggestion from the Penny Pincher software\. The reminder gets you a nice discount earning you \d+ chips\./;
var SUITCheck = /Your watch beeps with an update from the S\.U\.I\.T\. software\. You've processed another chunk of data, earning you \d+ points with the S\.U\.I\.T\. data farmers\./;
var ASXCheck = /Your watch beeps with an update from the Astral Stock Exchange\. It's been working hard on investing while you're away fighting crime\. Since the last time you've checked, you have earned \d+ "chips" on the Astral Stock Exchange\./;
var InternetCheck = /After the fight you catch an especially funny video clip and have a good laugh, earning you an additional \d+ XP\./;
if (/nav/.test(location.href)) {
	for (var j = 0; j < SoftwareEffects.length; j++) {
		var swRegex = new RegExp(SoftwareEffects[j].replace(".","\.") + " - \u221E")
		if (swRegex.test(Body.textContent)) {
			GM_setValue(SoftwareEffects[j] + "|Active",1)
			}
		else {
			GM_setValue(SoftwareEffects[j] + "|Active",0)
			}
		}
	}
if (/Patrol again/.test(Body.textContent) || /The fight is now over, and it's not pretty\./.test(Body.textContent)) {
	for (var j = 0; j < SoftwareEffects.length; j++) {
		if (GM_getValue(SoftwareEffects[j] + "|Active")==1) {
			GM_setValue(SoftwareEffects[j] + "|Total",GM_getValue(SoftwareEffects[j] + "|Total",0)+1)
			}
		}
	}
if (LookOutCheck.test(Body.textContent)) {
	GM_setValue("Prepunctuality|Count",GM_getValue("Prepunctuality|Count",0)+1)
	}
if (IMyselfCheck.test(Body.textContent)) {
	GM_setValue("On Camera|Count",GM_getValue("On Camera|Count",0)+1)
	}
if (PennyPincherCheck.test(Body.textContent)) {
	GM_setValue("Financial Prudence|Count",GM_getValue("Financial Prudence|Count",0)+1)
	}
if (SUITCheck.test(Body.textContent)) {
	GM_setValue("T.a.I.L.o.R.|Count",GM_getValue("T.a.I.L.o.R.|Count",0)+1)
	}
if (ASXCheck.test(Body.textContent)) {
	GM_setValue("Betting on the Stars|Count",GM_getValue("Betting on the Stars|Count",0)+1)
	}
if (InternetCheck.test(Body.textContent)) {
	GM_setValue("Surfing for Lulz|Count",GM_getValue("Surfing for Lulz|Count",0)+1)
	}
if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear Software Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',swClear,true);}
function swClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("Software data cleared")
	}
if(/journal-notes/.exec(location.href)) {
	var c = document.getElementsByTagName('form')[0];
	var b = document.getElementsByTagName('textarea')[0];
	b.rows = 10;
	var f = document.createElement('table');
	var g = document.createElement('tr');
	var h = document.createElement('td');
	var l = document.createElement('textarea');
	l.rows = 6;
	l.cols = 60;
	l.readOnly=true;
	var data = "";
	var keys = GM_listValues().sort();
	for (var i=0, key=null; key=keys[i]; i++) {
		if (/\|Count/.test(key)) {
			var count = GM_getValue(key);
			var total = GM_getValue(key.substring(0, key.indexOf('|')) + "|Total");
			data = data + key.substring(0, key.indexOf('|')) + ":\t{{statrate|" + total + "|" + count + "}}\n";
			}
		}
	l.value = data;
	h.innerHTML = "<h2>Software Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}