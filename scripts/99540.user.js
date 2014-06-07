// ==UserScript==
// @name           BvS Hacker Helper
// @namespace      rvHack
// @description    BvS r00t Hacking Helper 1.3.3
// @include        http://*animecubed.com/billy/bvs/villagefields.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.3.3
// @history        1.3.3 (3/12/2011) Made Firefox 4 compatible.
// @history        1.3.2 (1/1/2010) Fixed some bad code I put in in 1.3.1.
// @history        1.3.1 (12/31/2009) fixed an error because of new changes McM made to the display when you hacked someone
// @history        1.3 script now remembers your hacked targets and when you hack them, and displays counts for past 24 hr hacks and past 48 hrs
// @history        1.2 fixed error with field changing when one key is "Dealer's Room" because of the single quote.
// @history        1.2 add a link text change when you click "Retry" so the user knows when the server responds.
// @history        1.2 changed execution address from '*.animecubed' to '*animecubed' as requested.
// ==/UserScript==

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSHackerHelper", "http://rveach.romhack.org/BvS/bvs_hacker_helper.user.js", "1.3.3");
} catch(e) {};

var helperBoxStyle = "background-color: black; color: white; border: #A1A100 2px solid;";

/////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////
var scripts = ""+<![CDATA[

function switchHuntAndHack() {
	return switchTargetField("Cursed,Filthy,Noodle Shop", "hackfieldswitch");
}


function switchTargetField(target, confirm) {
	if ((target == null) || (target == ""))
		return false;

	try {
		if (document.getElementById(confirm).checked) {
			var field = target.split(",");

			switchField(field[0], field[1], field[2]);
		} else {
			alert("Please check the confirm box!");
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	return false;
}

function switchField(key1, key2, key3) {
	try {
		switchFieldKey(document.field.key_1, unescape(key1));
		switchFieldKey(document.field.key_2, unescape(key2));
		switchFieldKey(document.field.key_3, unescape(key3));

		document.field.submit();
	} catch(e) {
		if (e == "KeyError")
			alert("Failed to switch to the desired Field. You may not have the keys necessary to travel there.");
		else
			throw(e);
	}
}

function switchFieldKey(keyfield, keyvalue) {
	for (var i = 0; i < keyfield.length; i++) {
		if (keyfield[i].text == keyvalue)
			break;
	}

	if (i == keyfield.length)
		throw("KeyError");

	keyfield.selectedIndex = i;
}


]]>;

String.prototype.startsWith	= function(str) { return (this.match("^"+str) == str); }
String.prototype.trim		= function() { return this.replace(/^\s+|\s+$/g,""); }


function getCurrentTarget() {
	var target = GM_getValue("currentTarget_" + playerName, "");

	if (target != "") {
		var info = target.split(";");
		if (info[0] == "")
			info[0] = "[<i>Unknown Hacker</i>]";

		return info;
	}

	return new Array("", "");
}

function getHackTargets() {
	var rtrn = GM_getValue("oldTargets_" + playerName, "").split(",");
	var removed = false;

	while (rtrn.length > 0) {
		if (currentTime >= (parseInt(rtrn[1]) || 0) + 172800) { //2 days
			rtrn.splice(0, 2);
			remove = true;
		} else
			break;
	}

	if (removed) {
		GM_setValue("oldTargets_" + playerName, rtrn.join(","))
	}

	return rtrn;
}

function saveHackTargets(targets) {
	GM_setValue("oldTargets_" + playerName, targets.join(","))
}

function addHackedTarget(targetName) {
	var targets = getHackTargets();

	targets.push(targetName);
	targets.push(currentTime);

	saveHackTargets(targets);
}

function countHacks24Hours(targets) {
	var count = 0;

	for (var i = 0; i < targets.length; i += 2) {
		if (currentTime < (parseInt(targets[i+1]) || 0) + 86400) { //1 day
			count++;
		}
	}

	return count;
}

function getTimeAgo(time) {
	var diff = currentTime - time;
	var rtrn = "";

	if (diff >= 3600) {
		rtrn += Math.round(diff / 3600) + " hrs ";
		diff %= 3600;
	}

	rtrn += Math.round(diff / 60) + " mins";

	return rtrn;
}

function QueryServer_FindPlayer(player) {
	if ((player == null) || (player == undefined)) {
		player = getCurrentTarget()[0];

		if (player.indexOf("<i>") != -1)
			return;
	}

	QueryServer("action=find&player=" + player);
}

function QueryServer(query) {
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://rveach.romhack.org/BvS/hackhelper.php',
		headers: {'Content-type' : 'application/x-www-form-urlencoded'},
		data: encodeURI(query),

		onerror: function(response) {
			alert("Hack Download Failed!");
		},
		onload: function(response) {
			try {
				var text = response.responseText;

				if (text.startsWith("Saved;")) {
					//saved hack info
				} else if (text.startsWith("Info;")) {
					GM_setValue("currentTarget_" + playerName, text.substr(5));

					updateHackDisplay();
				} else if ((text == null) || (text.length == 0)) {
					alert("Hack Download Error:\n\nUnknown Error");
				} else if (text.length >= 200) {
					alert("Hack Download Error:\n\nError Message too big to display!");
				} else {
					alert("Hack Download Error:\n\n" + text);
				}
			} catch(e) {
				alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
			}
		}
	});
}

function updateHackDisplay(info) {
	if ((info == null) || (info == undefined))
		info = getCurrentTarget();

	if (info[0] == "")
		return;
	if ((info[1] == null) || (info[1] == undefined))
		info[1] = "";

	var helper;
	var insert;

	var snap = document.evaluate("//table/tbody/tr/td/form/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; temp = snap.snapshotItem(i); i++) {
		if (match = temp.textContent.match(/.*Remove Target \(.* Core\).*/)) {
			if (helper = document.getElementById("minihackdisplay")) {
				insert = false;
			} else {
				insert = true;
				helper = document.createElement("div");

				helper.setAttribute("id", "minihackdisplay");
				helper.setAttribute("style", helperBoxStyle + "margin-top: 5px; font-size: 12px;");
			}
			var helperText = "";

			helperText += ("<b>" + info[0] + "</b><br>\n");

			if (info[1] == "") {	//no location saved
				helperText += "<i>Location Unknown</i>";
			} else {
				helperText += ("<b>" + info[1] + "</b>, <b>" + info[2] + "</b>, <b>" + info[3] + "</b> saved <b>" + info[4] + "</b>");
				helperText += ("\n<br><input style='margin-bottom: 7px;' type='checkbox' id='targetfieldswitch2' value='1'> <a href='javascript:;' onclick='return switchTargetField(\"" + escape(info[1]) + "," + escape(info[2]) + "," + escape(info[3]) + "\", \"targetfieldswitch2\")' style='color: white;'>Switch to Field!</a>");
			}

			helperText += "<br>\n<a href='javascript:;' id='hackretry2' style='color: white;'>Retry</a>";

			helper.innerHTML = helperText;

			if (insert)
				temp.parentNode.insertBefore(helper, temp.nextSibling);

			document.getElementById("hackretry2").addEventListener("click", function() { this.innerHTML = "Requesting"; QueryServer_FindPlayer(); }, false);
			break;
		}
	}

	if (helper = document.getElementById("hackdisplay")) {
		helperText = ("<br>Current Target: <b>" + info[0] + "</b> [<a href='javascript:;' id='hackretry1' style='color: white;'>Retry</a>]<br>(");
		if (info[1] == "") {	//no location saved
			helperText += "<i>Location Unknown</i>";
		} else {
			helperText += ("<b>" + info[1] + "</b>, <b>" + info[2] + "</b>, <b>" + info[3] + "</b> saved <b>" + info[4] + "</b>");
		}

		helperText += ")\n";

		if (info[1] != "") {
			helperText += "<br><input type='checkbox' id='targetfieldswitch1' value='1'> <a href='javascript:;' onclick='return switchTargetField(\"" + escape(info[1]) + "," + escape(info[2]) + "," + escape(info[3]) + "\", \"targetfieldswitch1\")' style='color: white;'>Switch to Target's Last Known Field!</a><br>\n";
		}

		helper.innerHTML = helperText;

		document.getElementById("hackretry1").addEventListener("click", function() { this.innerHTML = "Requesting"; QueryServer_FindPlayer(); }, false);
	}
}

/////////////////////////////////////////////////////////////////

try {
	var match;
	var currentTime = Math.round(new Date().getTime()/1000.0);

	/////////////////////////////////////////////////////////////////
	// Get Form Fields
	/////////////////////////////////////////////////////////////////
	var fieldForm  = document.getElementsByName("field")[0];
	var playerName = document.getElementsByName("player")[0].value;
	var key_1;
	var key_2;
	var key_3;
	var element;

	for (var i = 0; element = fieldForm.elements[i]; i++) {
		if (element.name == "key_1")
			key_1 = element;
		else if (element.name == "key_2")
			key_2 = element;
		else if (element.name == "key_3")
			key_3 = element;
	}

	/////////////////////////////////////////////////////////////////
	// Insert JS Functions
	/////////////////////////////////////////////////////////////////
	var head = document.getElementsByTagName("head")[0];
	var node = document.createElement("script");
	node.type = "text/javascript";
	node.innerHTML = scripts;
	head.appendChild(node);

	/////////////////////////////////////////////////////////////////
	// Create Helper
	/////////////////////////////////////////////////////////////////
	var helper = document.createElement("div");
	var helperText = "<center><h3 style='display: inline'>Hacker Helper</h3></center>\n";
	helper.setAttribute("style", helperBoxStyle);
	fieldForm.parentNode.insertBefore(helper, fieldForm.nextSibling);

	/////////////////////////////////////////////////////////////////
	// Get Player List
	/////////////////////////////////////////////////////////////////
	var playerlist = "";
	var playertemp;
	var snap = document.evaluate("//table/tbody/tr/td/i", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; playertemp = snap.snapshotItem(i); i++) {
		if (match = playertemp.textContent.replace(/[\n\r\t]/g, " ").match(/.*Other Ninja on this Field:\s*(.*)/)) {
			playerlist = match[1].replace(/  /g, " ").replace(/, /g, ",");
			break;
		}
	}

	/////////////////////////////////////////////////////////////////
	// Get New Target, Hacked Target, or Target Dropped (can't be both)
	/////////////////////////////////////////////////////////////////
	snap = document.evaluate("//table/tbody/tr/td/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; temp = snap.snapshotItem(i); i++) {
		temp2 = temp.textContent.replace(/[\n\r\t]/g, " ");
		if (match = temp2.match(/.*Target Found:\s*(.*)/)) {		//got new target
			GM_setValue("currentTarget_" + playerName, "");
			QueryServer_FindPlayer(match[1].replace(/  /g, " ").trim());
			break;
		} else if (match = temp2.match(/.*Hack Successful!.*/)) {	//hacked target
			var info = getCurrentTarget();

			if (info[0] != "")
				addHackedTarget(info[0]);

			GM_setValue("currentTarget_" + playerName, "");
			break;
		} else if (match = temp2.match(/.*Get a Target.*/)) {		//dropped hack
			GM_setValue("currentTarget_" + playerName, "");
			break;
		}
	}

	/////////////////////////////////////////////////////////////////
	// Get Keys
	/////////////////////////////////////////////////////////////////
	var key1 = key_1[key_1.selectedIndex].text;
	var key2 = key_2[key_2.selectedIndex].text;
	var key3 = key_3[key_3.selectedIndex].text;
	var keyString = key1 + "," + key2 + "," + key3;

	/////////////////////////////////////////////////////////////////
	// Logic
	/////////////////////////////////////////////////////////////////
	if (playerlist != "") {
		QueryServer("action=save&field=" + keyString + "&playerlist=" + playerlist);

		var info = getCurrentTarget();

		if (info[0] != "")
			playertemp.innerHTML = playertemp.innerHTML.replace(info[0], "<h3><u>" + info[0] + "</u></h3>");
	}

	helperText += "<div id='hackdisplay'></div>";
	helperText += "<br><input type='checkbox' id='hackfieldswitch' value='1'> <a href='javascript:;' onclick='return switchHuntAndHack()' style='color: white;'>Switch to 'Hunt and Hack' Field!</a>\n";

	var targets = getHackTargets();
	if (targets.length > 0) {
		helperText += "<br><br><b>" + countHacks24Hours(targets) + "</b> successful hacks in the past 24 hours.";
		helperText += "<br><b>" + (targets.length / 2) + "</b> in the past 48 hours.";

		helperText += "<br><font size='1'>";

		for (var i = 0; i < targets.length; i += 2) {
			if (i)
				helperText += ", ";

			helperText += "<i><b>" + targets[i] + "</b></i> (" + getTimeAgo(targets[i+1]) + " ago)";
		}

		helperText += "</font>";
	}

	helper.innerHTML = helperText;

	updateHackDisplay();
} catch(e) {
	alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
}
