// ==UserScript==
// @name          Nexus Clash Status Screen Higlighter
// @namespace     http://www.quasimorto.com
// @description   Tweaks for the status screen.
// @include       http://nexusclash.com/*
// @include       http://www.nexusclash.com/*
// ==/UserScript==

GM_addStyle("tr.status-apmax      { background-color: #99ff99; }");
GM_addStyle("tr.status-apbuffer   { background-color: #ffff99; }");
GM_addStyle("tr.status-hpchange   { background-color: #ff0000; color:#ffffff; }");
GM_addStyle("tr.status-hpchange a { color:#ffffff; }");
GM_addStyle("tr.status-dead       { background-color: #000000; color:#ffffff; }");
GM_addStyle("tr.status-dead a     { color:#ffffff; }");

var AP_BUFFER = 8;

//TODO: Make AP_BUFFER configurable?

emulateGM();
var welcome = document.evaluate(
	"//h2[starts-with(.,'Welcome back to Nexus Clash')]", 
	document, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
);

if (welcome.snapshotLength == 1) {
	var tick = getTick();
	var characterRows = document.evaluate(
		"//tbody[tr/th='Character']/tr", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < characterRows.snapshotLength; i++) {
		var row = characterRows.snapshotItem(i);

		if (i == 0) {
			var header = document.createElement("th");
			header.innerHTML = "Full";
			row.insertBefore(header, row.cells[9]);
			continue;
		}
		
		row.insertCell(9);
		var id = parseInt(row.cells[0].innerHTML.match(/id=(\d+)"/)[1]);
		var apMatch = row.cells[2].innerHTML.match(/^(-?\d+)\/(\d+)$/);
		var currentAp = parseInt(apMatch[1]);
		var maxAp = parseInt(apMatch[2]);
		var hp = parseInt(row.cells[3].innerHTML.match(/^(\d+)\/(\d+)$/)[1]);
		var prevHp = GM_getValue(id + "-health");

		if (currentAp < maxAp) {
			var ticksToFull = maxAp - currentAp;
			var timeFull = new Date(tick);
			timeFull.setMinutes(tick.getMinutes() + (ticksToFull * 15));
			row.cells[9].innerHTML = timeFull.toTimeString().substring(0,5);
		}

		if (!prevHp || hp > prevHp) {
			GM_setValue(id + "-health", hp);
			prevHp = hp;
		}
		prevHp = parseInt(prevHp);

		var rowClass = "";
		if (hp != prevHp) {
			if (hp > 0) {
				rowClass += " status-hpchange";			
			} else {
				rowClass += " status-dead";
			}
		} else if (currentAp >= maxAp) {
			rowClass += " status-apmax";
		} else if (currentAp + AP_BUFFER >= maxAp) {
			rowClass += " status-apbuffer";		
		}
		row.setAttribute("class", rowClass);
	}
} else {
	var character = parseCharacterInfo();
	if (character) {
		GM_setValue(character.Id + "-health", character.HP);
	}	
}

/**********************************************************/

function getTick() {
	var tickMatch = document.documentElement.innerHTML.match(/Last Action Point Tick was at (\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/);
	var tick = null;
	if (tickMatch) {
		tick = new Date(tickMatch[1], tickMatch[2]-1, tickMatch[3], tickMatch[4], tickMatch[5], tickMatch[6]);
	}
	return tick;
}

/**********************************************************/

function parseCharacterInfo() {
	var character;
	var characterInfo = document.evaluate(
		"//div[@id='CharacterInfo']//tr[1]", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (characterInfo.snapshotLength == 1){
		var row = characterInfo.snapshotItem(0);
		character = new Object;
		character.HP = row.cells[3].innerHTML.match(/>(\d+)</)[1];
		character.Id = parseInt(row.cells[0].innerHTML.match(/id=(\d+)"/)[1]);
	}
	return character;
}

/**********************************************************/

function emulateGM() {
	//*** GM_* functionality for Chrome
	//*** http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
}

