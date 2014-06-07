// ==UserScript==
// @name           Facebook MoM Autovault
// @namespace      http://userscripts.org/users/69391
// @description    Deposits your gold automatically to the vault
// @include        http://apps.facebook.com/mightofmany/vault/
// @include        http://apps.new.facebook.com/mightofmany/vault/
// ==/UserScript==

// v2.04 by K.Hampf <khampf@users.sourceforge.net>
//
// This scripts runs on the Facebook game Might of Many vault-page.
// It periodically checks if you have gold and if you do it deposits the
// gold in your account so people attacking you can't touch it.
//    For now, if you want to disable it swiftly just disable greasemonkey while
// you do your manual transactions, then re-enable GM and go to your vault-
// page again.
//    The script should detect if you have withdrawn funds manually but there's
// no guarantee, disable it if you don't want your gold auto-inserted.

var timerMinutesMin = 3; var timerMinutesMax = 6;
var timerTop = "25px"; var timerLeft = "450px";
var timerID = null; var timer = null;

function timerTick() {
	var now = new Date();
	var seconds = Math.floor((timer.getTime() - now.getTime())/1000);
	var digits = document.getElementById('timerdigits');
	if (seconds > 0) {
		if (digits) {
			var mins = Math.floor(seconds/60);
			var secs = seconds % 60;
			digits.innerHTML = ((mins>9)?mins:("0"+mins))+":"+((secs>9)?secs:("0"+secs));
		} else GM_log("Unable to find timer digits!");
	} else {	// timer fires
		clearTimeout(timerID);
		if (digits) digits.innerHTML = "00:00";
		window.location.href = window.location.href;	// reload
	}
}

function addTimer(node) {
	if (!node) node = document.getElementsByTagName('div')[0]; // first div
	var div = document.createElement('div'); div.setAttribute('id',"reloadTimer");
	var html = "<p id=\"timerdigits\" style=\"font: bold 18px arial,sans;margin:0;text-align:center\">  --:-- </p>";
	html += "<p id=\"timertime\" style=\"font: bold 8px arial,sans;margin:0;text-align:center\">timer</p>";
	div.innerHTML = html;
	div.style.color = "white"; div.style.backgroundColor = "red";
	div.style.position = "absolute"; div.style.border = "1px solid white";
	div.style.top = timerTop; div.style.left = timerLeft; div.style.width = "65px";
	node.appendChild(div);

	timer = new Date();	// set timestamp
	timer.setTime(timer.getTime() +
		(timerMinutesMin*60+Math.floor(
			Math.random()*(timerMinutesMax-timerMinutesMin)*60))*1000);
	timerID = setInterval(timerTick,1000);
	document.getElementById('timertime').innerHTML =
		timer.toLocaleString().match(/([\d\.:]*)$/)[1].replace(/\./g,':');
	timerTick();
}

function checkVault() {
	var content = document.getElementById('app48385495290_content');
	if (content) {
		var gold = document.getElementsByName("deposit_amount");
		if (gold.length) {
			gold = gold[0].value;
			var withdraw = /You withdrew/.test(content.innerHTML);
			if (!withdraw && (gold >= 200)) {
				// GM_log("Depositing " + gold + " gold");
				var depositForm = content.getElementsByTagName('form')[1];
				depositForm.submit();
			} else if (!withdraw) addTimer(content);
		}
	}
}

try {
	checkVault();
} catch(err) { GM_log("Error: " + err); }
