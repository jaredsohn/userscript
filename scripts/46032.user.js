// ==UserScript==
// @name           Round Table Poker
// @description	   Autohelper for RTPoker
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/games/draw_poker/round_table*   
// ==/UserScript==
//deal and gm resetter
if(document.body.innerHTML.indexOf('DEAL') != -1){
	GM_setValue("kh","0");
	GM_setValue("dh","0");
	GM_setValue("ih","0");
	GM_setValue("mh","0");
	var button = document.evaluate('//form[contains(@action,"round_table_pokers.phtml")]/input[@type = "submit" and @value = "DEAL"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}
//first hand alert
if(document.body.innerHTML.indexOf('turn to start the first round') != -1){
	if(document.body.innerHTML.indexOf('kau_happy.gif') != -1){GM_setValue("kh","1");}
	if(document.body.innerHTML.indexOf('draik_happy.gif') != -1){GM_setValue("dh","1");}
	if(document.body.innerHTML.indexOf('ixi_happy.gif') != -1){GM_setValue("ih","1");}
	if(document.body.innerHTML.indexOf('meerca_happy.gif') != -1){GM_setValue("mh","1");}
		if (GM_getValue("kh") != 0){ alert("Kalandra has two pair +");}
		if (GM_getValue("dh") != 0){ alert("Commander Lazarr has two pair+");}
		if (GM_getValue("ih") != 0){ alert("Chortle has two pair+");}
		if (GM_getValue("mh") != 0){ alert("Nigel of Meridar II has two pair+");}
	}
//waiting room last happy setter & round 2 initiation
if(document.body.innerHTML.indexOf('the 2nd round of betting') != -1){
		var II = document.evaluate('//font[@color="white"]/b[1][. = "Nigel of Meridar II"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (II.snapshotLength > 0){
			if(document.body.innerHTML.indexOf('2 cards') != -1){GM_setValue("mh","2");}
			if(document.body.innerHTML.indexOf('0 card') != -1){GM_setValue("mh","3");}
			if(document.body.innerHTML.indexOf('1 card') != -1){if (GM_getValue("mh") ==0){GM_setValue("mh","-1");}}}
		var button = document.evaluate('//input[@type = "submit" and @value = "Back to Waiting Room"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}

//happy counters
	
if(document.body.innerHTML.indexOf('turn to make a move') != -1){
	if(document.body.innerHTML.indexOf('kau_happy.gif') != -1){if (GM_getValue("kh") ==0){ GM_setValue("kh","1");}if (GM_getValue("kh") ==-1){ GM_setValue("kh","3");}}
	if(document.body.innerHTML.indexOf('draik_happy.gif') != -1){if (GM_getValue("dh") ==0){ GM_setValue("dh","1");}if (GM_getValue("dh") ==-1){ GM_setValue("dh","3");}}
	if(document.body.innerHTML.indexOf('ixi_happy.gif') != -1){if (GM_getValue("ih") ==0){ GM_setValue("ih","1");}if (GM_getValue("ih") ==-1){ GM_setValue("ih","3");}}
	if(document.body.innerHTML.indexOf('meerca_happy.gif') != -1){if (GM_getValue("mh") ==0){ GM_setValue("mh","1");}if (GM_getValue("mh") ==-1){ GM_setValue("mh","3");}}
		if (GM_getValue("kh") == 1){ alert("Kalandra has two pair +");}
		if (GM_getValue("dh") == 1){ alert("Commander Lazarr has two pair+");}
		if (GM_getValue("ih") == 1){ alert("Chortle has two pair+");}
		if (GM_getValue("mh") == 1){ alert("Nigel of Meridar II has two pair+");}
		if (GM_getValue("kh") == 2){ alert("Kalandra has three of a kind +");}
		if (GM_getValue("dh") == 2){ alert("Commander Lazarr has three of a kind +");}
		if (GM_getValue("ih") == 2){ alert("Chortle has three of a kind +");}
		if (GM_getValue("mh") == 2){ alert("Nigel of Meridar II has three of a kind +");}
		if (GM_getValue("kh") == 3){ alert("Kalandra has a straight +");}
		if (GM_getValue("dh") == 3){ alert("Commander Lazarr has a straight +");}
		if (GM_getValue("ih") == 3){ alert("Chortle has a straight +");}
		if (GM_getValue("mh") == 3){ alert("Nigel of Meridar II has a straight +");}
}
//discard counter	
if(document.body.innerHTML.indexOf('CONTINUE') != -1){
	if(document.body.innerHTML.indexOf('discarded') != -1){
		var chortle = document.evaluate('//font[@color="white"]/b[1][. = "Chortle"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (chortle.snapshotLength > 0){
			if(document.body.innerHTML.indexOf('2 cards') != -1){GM_getValue("ih","2");}
			if(document.body.innerHTML.indexOf('0 card') != -1){GM_setValue("ih","3");}
			if(document.body.innerHTML.indexOf('1 card') != -1){if (GM_getValue("ih") ==0){ GM_setValue("ih","-1");}}}
		var Lazarr = document.evaluate('//font[@color="white"]/b[1][. = "Commander Lazarr"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (Lazarr.snapshotLength > 0){
			if(document.body.innerHTML.indexOf('2 cards') != -1){GM_setValue("dh","2");}
			if(document.body.innerHTML.indexOf('0 card') != -1){GM_setValue("dh","3");}
			if(document.body.innerHTML.indexOf('1 card') != -1){if (GM_getValue("dh") ==0){ GM_setValue("dh","-1");}}}
		var Kalandra = document.evaluate('//font[@color="white"]/b[1][. = "Kalandra"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (Kalandra.snapshotLength > 0){
			if(document.body.innerHTML.indexOf('2 cards') != -1){GM_setValue("kh","2");}
			if(document.body.innerHTML.indexOf('0 card') != -1){GM_setValue("kh","3");}
			if(document.body.innerHTML.indexOf('1 card') != -1){if (GM_getValue("kh") ==0){ GM_setValue("kh","-1");}}}
		var II = document.evaluate('//font[@color="white"]/b[1][. = "Nigel of Meridar II"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (II.snapshotLength > 0){
			if(document.body.innerHTML.indexOf('2 cards') != -1){GM_setValue("mh","2");}
			if(document.body.innerHTML.indexOf('0 card') != -1){GM_setValue("mh","3");}
			if(document.body.innerHTML.indexOf('1 card') != -1){if (GM_getValue("mh") ==0){ GM_setValue("mh","-1");}}}}				
		var button = document.evaluate('//input[@type = "submit" and @value = "CONTINUE"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}


if(document.body.innerHTML.indexOf('Your game is saved') != -1){var button = document.evaluate('//form[contains(@action,"round_table_pokers.phtml")]/input[@type = "submit" and @value = "Tournament Level 6"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}
if(document.body.innerHTML.indexOf('SHOW') != -1){var button = document.evaluate('//form[contains(@action,"round_table_pokers.phtml")]/input[@type = "submit" and @value = "SHOW"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}

