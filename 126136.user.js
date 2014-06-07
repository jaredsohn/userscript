// ==UserScript==
// @name           BillyTV Agent
// @namespace      BvS-ZeConster
// @description    Handles your auditions for you (mostly)
// @include        http://*animecubed.com/billy/bvs/billytv.html
// ==/UserScript==

//3 possible states:
//1: haven't picked abilities yet
//2: abilities picked, need to do challenges		2a: just did a challenge, need to pick another
//3: doing a challenge

var playername = "";

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

loadPlayerName();

function loadPlayerName() {
	try {
		var temp = document.getElementsByName("player")[0];
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playername = temp.value;
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

if (document.body.innerHTML.indexOf("You still have") > -1) {

	// Create the text area object
	var area = document.createElement("textarea");
	area.id = 'SchedulePlanningArea';
	
	area.rows = 11;
	area.cols = 20;
	
	// Create the button to fill the settings
	var a = document.createElement("a");
	
	a.href = "javascript:void(0)";
	a.innerHTML = "Click here to plan settings";

	a.addEventListener("click", function() {
		var storethis = document.getElementById('SchedulePlanningArea').value;
		var challengeArr = storethis.split('\n');
		if (challengeArr.length < 11) {
			document.getElementById('SchedulePlanningArea').value = "Not enough challenges - please try again.";
			return;
		}
		try {
			var challenges = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]];
			for (var i=0; i<11; i++) {
				challenges[i] = challengeArr[i].split(',');
				if (challenges[i].length < 9) {
					document.getElementById('SchedulePlanningArea').value = "Not enough Abilities for line " +(i+1)+" - please try again.";
					return;
				}
			}
			var abilitiesused = [0,0,0,0,0,0,0,0];
			for (var i = 0; i < 8; i++) {
				for (var j = 0; j < 11; j++) {
					abilitiesused[i] += parseInt(challenges[j][i+1]);
				}
			}
			var match = /<b>Amount Left: ([\d,]+)\/([\d,]+)<\/b>/.exec ( document.body.innerHTML );
			match[2] = match[2].replace(",","");
			var totalawesome = parseInt(match[2]);
			var usedawesome = 0;
			usedawesome += abilitiesused[0]*4;	usedawesome += abilitiesused[1]*6;
			usedawesome += abilitiesused[2]*8;	usedawesome += abilitiesused[3]*10;
			usedawesome += abilitiesused[4]*12;	usedawesome += abilitiesused[5]*20;
			usedawesome += abilitiesused[6]*30;	usedawesome += abilitiesused[7]*100;
			var remainingawesome = totalawesome - usedawesome;
			if (remainingawesome < 0) {
				alert("Strategy uses "+usedawesome+" Awesome, but you only have "+totalawesome+" Awesome!");
			} else {
				if (remainingawesome >= 4) {
					if (remainingawesome%4 > 1) {
						abilitiesused[1] += 1;
						remainingawesome -= 6;
					}
					remainingawesome -= remainingawesome%4;
					abilitiesused[0] += remainingawesome/4;
				}
				document.evaluate("//input[@name = 'dice4']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[0];
				document.evaluate("//input[@name = 'dice6']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[1];
				document.evaluate("//input[@name = 'dice8']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[2];
				document.evaluate("//input[@name = 'dice10']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[3];
				document.evaluate("//input[@name = 'dice12']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[4];
				document.evaluate("//input[@name = 'dice20']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[5];
				document.evaluate("//input[@name = 'dice30']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[6];
				document.evaluate("//input[@name = 'dice100']",document, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = abilitiesused[7];
				GM_setValue(playername+"_challenges",storethis);
				var planning = GM_getValue(playername+"_challenges","");
			}
		} catch (err) {
			alert('An error has occured:\n\n' + err.message);
		}
	},false);

	// Finally, HTML div overlay	
	var div = document.createElement("div");
	div.style.left = "40px";
	div.style.top = "100px";
	div.style.position = "fixed";
	div.style.width = "195px";
	div.style.height = "290px";
	div.style.background = 'none repeat scroll 0% 0% rgb(216, 100, 100)';
	 
	// Add the text area
	div.innerHTML = "<br>1. Paste the settings string here:<br>"
	div.appendChild(area);
	div.innerHTML += "<br><br>2. ";
	div.appendChild(a);

	document.body.appendChild(div);

} else if ((document.body.innerHTML.indexOf("Choose a Challenge Below!") > -1)
	|| (document.body.innerHTML.indexOf(":: Attempt") > -1)) {
	var planning = GM_getValue(playername+"_challenges","");
	var challengeArr = planning.split('\n');
	var challenges = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]];
	for (var i=0; i<11; i++) {
		challenges[i] = challengeArr[i].split(',');
	}
	//now figure out which challenge we're on
	for (var i = 0; i < 11; i++) {
		var currentindex = challenges[i][0];
		var str = "//input [@id='chl" + currentindex + "']";
		var element = document.evaluate(str,document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((element.snapshotLength > 0) && (element.snapshotItem(0).disabled == false)) {
			i = 11;	//we're done
			element.snapshotItem(0).checked = true;
		}
	}
} else if (document.body.innerHTML.indexOf("Attempting:") > -1) {
	var planning = GM_getValue(playername+"_challenges","");
	var challengeArr = planning.split('\n');
	var challenges = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]];
	for (var i=0; i<11; i++) {
		challenges[i] = challengeArr[i].split(',');
	}
	//now figure out which challenge we're on
	for (var i = 0; i < 11; i++) {
		var currentindex = challenges[i][0];
		var str = "//input [@id='chl" + currentindex + "']";
		var element = document.evaluate(str,document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((element.snapshotLength > 0) && (element.snapshotItem(0).disabled == false)) {
			var thischallenge = challengeArr[i].split(',');
			document.evaluate("//input[@name = 'dieused4']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[1];
			document.evaluate("//input[@name = 'dieused6']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[2];
			document.evaluate("//input[@name = 'dieused8']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[3];
			document.evaluate("//input[@name = 'dieused10']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[4];
			document.evaluate("//input[@name = 'dieused12']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[5];
			document.evaluate("//input[@name = 'dieused20']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[6];
			document.evaluate("//input[@name = 'dieused30']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[7];
			document.evaluate("//input[@name = 'dieused100']",document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = thischallenge[8];
			document.evaluate("//input [@name='actattemptit']",document,null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			i = 11;	//we're done
		}
	}
}