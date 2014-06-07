// ==UserScript==
// @name           TH Spelunking Tracking
// @author         Sena
// @description    Tracks spelunking adventures
// @include        http://www.twilightheroes.com/fight.php?location=71
// @include        http://twilightheroes.com/fight.php?location=71
// @include        http://www.twilightheroes.com/main.php
// @include        http://twilightheroes.com/main.php
// @include        http://www.twilightheroes.com/journal-notes.php
// @include        http://twilightheroes.com/journal-notes.php
// ==/UserScript==

var NonseiziumGear = "0";
var Adventure = document.getElementsByTagName("h2");
var tdList = document.getElementsByTagName("td");
var StrAdvCheck = /^Who Thought of These Names, Anyway\?$/;
var IntAdvCheck = /^Feels like an RPG$/;
var RefAdvCheck = /^Speed Spelunking$/;
var NonAdvCheck = /^For Heroes, the Impossible is Merely Improbable$/;
var GemAdvCheck = /^Shine on You Crazy Gemstone$/;
if(/fight/.exec(location.href)) {
	if (StrAdvCheck.test(Adventure[0].textContent)) {
		GM_setValue( "SpelunkingStr" + NonseiziumGear, GM_getValue( "SpelunkingStr" + NonseiziumGear, 0)+1)
		GM_setValue( "SpelunkingTot" + NonseiziumGear, GM_getValue( "SpelunkingTot" + NonseiziumGear, 0)+1)
		};
	if (IntAdvCheck.test(Adventure[0].textContent)) {
		GM_setValue( "SpelunkingInt" + NonseiziumGear, GM_getValue( "SpelunkingInt" + NonseiziumGear, 0)+1)
		GM_setValue( "SpelunkingTot" + NonseiziumGear, GM_getValue( "SpelunkingTot" + NonseiziumGear, 0)+1)
		};
	if (RefAdvCheck.test(Adventure[0].textContent)) {
		GM_setValue( "SpelunkingRef" + NonseiziumGear, GM_getValue( "SpelunkingRef" + NonseiziumGear, 0)+1)
		GM_setValue( "SpelunkingTot" + NonseiziumGear, GM_getValue( "SpelunkingTot" + NonseiziumGear, 0)+1)
		};
	if (NonAdvCheck.test(Adventure[0].textContent)) {
		GM_setValue( "SpelunkingNon" + NonseiziumGear, GM_getValue( "SpelunkingNon" + NonseiziumGear, 0)+1)
		GM_setValue( "SpelunkingTot" + NonseiziumGear, GM_getValue( "SpelunkingTot" + NonseiziumGear, 0)+1)
		};
	if (GemAdvCheck.test(Adventure[0].textContent)) {
		GM_setValue( "SpelunkingGem" + NonseiziumGear, GM_getValue( "SpelunkingGem" + NonseiziumGear, 0)+1)
		GM_setValue( "SpelunkingTot" + NonseiziumGear, GM_getValue( "SpelunkingTot" + NonseiziumGear, 0)+1)
		GM_setValue( "Spelunking" + "|GemTotal", GM_getValue( "Spelunking" + "|GemTotal", 0)+1)
		GM_setValue("Spelunking" + "|" + document.getElementById("drop1").textContent.trim(),GM_getValue("Spelunking" + "|" + document.getElementById("drop1").textContent.trim(),0)+1)
		};
	}
if(/main/.exec(location.href)) {
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Clear Spelunking Data';
	c.parentNode.appendChild(b);
	b.addEventListener('click',spelunkingClear,true);
	}
function spelunkingClear() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
		}
	alert("Spelunking results cleared")
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
		if(/Spelunking(?:Str|Int|Ref|Gem|Non)/.test(key)) {
			var adventures = GM_getValue(key);
			var total = GM_getValue("SpelunkingTot" + key.substring(13, 14));
			data = data + key + ":\t{{statrate|" + total + "|" + adventures + "}}\n";
			}
		if (/Spelunking\|uncut/.test(key)) {
			var thisGem = GM_getValue(key);
			var allGems = GM_getValue("Spelunking|GemTotal");
			data = data + key + ":\t{{statrate|" + allGems + "|" + thisGem + "}}\n";
			}
		}
	l.value = data;
	h.innerHTML = "<h2>Spelunking Spading Data</h2>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}