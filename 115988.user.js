// ==UserScript==
// @name           WK Emblems turn-in
// @namespace      Conster
// @description    Speeds up the turning in of your WK emblems
// @include        http://*animecubed.com/billy/bvs/worldkaiju-spend.html
// ==/UserScript==
var playername = "";
var altprizes = false;
var quantity = 11;
loadPlayerName();
var goback = document.forms.namedItem("backemblem");
if (goback) {	//there's a "Back to Emblem List" button, so we're at a specific redemption thingie
	if (altprizes) {
		var v = document.evaluate("//input [@name = 'wkaltprize']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (v) {
			v.checked = true;
		}
	}
	changeAmount();
}

function loadPlayerName() {
	try {
		var temp = document.getElementsByName("player")[1];
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playername = temp.value;
		altprizes = GM_getValue(playername+"_altprizes", false);
		quantity = GM_getValue(playername+"_quantity", 11);
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function changeAmount() {
	var s = "//option [@value = '" + quantity + "']";
	var v = document.evaluate(s,document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (v) {
		v.selected = true;
	}
}

function process_event(event) {
	if (goback) {
		if (event.keyCode == 65) {		//a for "Alt Prize": switch on or off
			altprizes = !altprizes;
			GM_setValue(playername+"_altprizes",altprizes);
			var v = document.evaluate("//input [@name = 'wkaltprize']",document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			if (v) {
				v.checked = !(v.checked);
			}
		} else if (event.keyCode == 107) {	//+ to increase amount to hand in
			quantity = quantity + 1;
			if (quantity > 11) {	quantity = 1;	}
			alert("New quantity to hand in at a time: "+quantity);
			GM_setValue(playername+"_quantity",quantity);
			changeAmount();
		} else if (event.keyCode == 109) {	//- to increase amount to hand in
			quantity = quantity - 1;
			if (quantity == 0) {	quantity = 11;	}
			alert("New quantity to hand in at a time: "+quantity);
			GM_setValue(playername+"_quantity",quantity);
			changeAmount();
		} else if (event.keyCode == 85) {	//u for "Use Emblems"
			var s = "//option [@value = '" + quantity + "']";
			var v = document.evaluate(s,document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			if (v) {
				document.evaluate("//input [@name = 'wkconfirmcheck']",document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
				document.forms.namedItem("chooseemblem").wrappedJSObject.submit();
			}
		}
	}
}

document.documentElement.addEventListener("keyup", process_event, true);