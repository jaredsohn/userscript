// ==UserScript==
// @name           ugamela - more info
// @namespace      http://userscripts.org/scripts/show/10337
// @description    Elimina la publicidad de ugamela y muestra en las tablas de consumos de las minas las diferencias entre el consumo actual y el consumo de otros niveles. Funcionalidad parecida a la de FoxGame para aquellos que lo conozcan (addon de firefox).
// @include        http://*ugamela*
// ==/UserScript==
function addDots(nStr) {
	nStr += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + '.' + '$2');
	}
	return nStr;
}

function infoMinas() {
	if ((url == "gid=1") || (url == "gid=2") || (url == "gid=3")){
		snap = document.evaluate("//FONT[@color='#ff0000']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		numAct = parseInt(snap.snapshotItem(2).innerHTML.replace(".", ""));
		html = snap.snapshotItem(2).parentNode.innerHTML;
		snap = document.evaluate("//BODY/CENTER/CENTER[2]/TABLE[2]/TBODY/TR[2]/TH/TABLE/TBODY/TR/TH[3]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < snap.snapshotLength; i++) {
			if ((snap.snapshotItem(i).innerHTML != html) && (!isNaN(numAct))){
				num = parseInt(snap.snapshotItem(i).innerHTML.replace(".", "")) - numAct;
				num = addDots(num);
				if (num > 0)
					color = "#0e0";
				else
					color = "#f00";
				snap.snapshotItem(i).innerHTML += "  <span style='color: "+color+"'>("+num+")</span>";
			}
		}
	}
	if ((url == "gid=4") || (url == "gid=1") || (url == "gid=2") || (url == "gid=3")) {
		snap = document.evaluate("//BODY/CENTER/CENTER[2]/TABLE[2]/TBODY/TR[2]/TH/TABLE", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		elem = snap.snapshotItem(0);
		elem.setAttribute('align', 'center');
		snap = document.evaluate("//FONT[@color='#ff0000']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		numAct = parseInt(snap.snapshotItem(1).innerHTML.replace(".", ""));
		html = snap.snapshotItem(1).parentNode.innerHTML;
		snap = document.evaluate("//BODY/CENTER/CENTER[2]/TABLE[2]/TBODY/TR[2]/TH/TABLE/TBODY/TR/TH[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < snap.snapshotLength; i++) {
			if (snap.snapshotItem(i).innerHTML != html) {
				num = parseInt(snap.snapshotItem(i).innerHTML.replace(".", "")) - numAct;
				num = addDots(num);
				if (num > 0)
					color = "#0e0";
				else
					color = "#f00";
				snap.snapshotItem(i).innerHTML += "  <span style='color: "+color+"'>("+num+")</span>";
			}
		}
	}
}

function showTime() {
	fec = new Date();
	day = fec.getDate();
	if (day < 10)
		day = "0"+day;
	month = fec.getMonth() + 1;
	if (month < 10)
		month = "0"+month;
	hours = fec.getHours();
	if (hours < 10)
		hours = "0"+hours;
	minutes = fec.getMinutes();
	if (minutes < 10)
		minutes = "0"+minutes;
	secs = fec.getSeconds();
	if (secs < 10)
		secs = "0"+secs;
	snap.snapshotItem(0).innerHTML = day + "/" + month + "/" + fec.getFullYear() + " - " + hours + ":" + minutes + ":" + secs;
	setTimeout(showTime, 1000);
}

function coordsToLinks() {
	snap = document.evaluate("//BODY//*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < snap.snapshotLength; i++) {
		obj = snap.snapshotItem(i);
		if (obj.innerHTML.search(":") != "-1") {
			words = obj.innerHTML.split(" ");
			for (x = 0; x < words.length; x++) {
				if (words[x].search(":") != -1) {
					coords = words[x].split(":");
					if ((coords.length <= 3) && (!isNaN(coords[0])) && (!isNaN(coords[1])) && (coords[0] != "") && (coords[1] != "") && ((coords[2] == null) || (!isNaN(coords[2])))) {
						obj.innerHTML = obj.innerHTML.replace(words[x], "<a href='http://www.ugamela.com/galaxy.php?galaxy="+coords[0]+"&system="+coords[1]+"'>"+words[x]+"</a>");
					}
				}
			}
		}
	}
}
els = document.getElementsByTagName("iframe");
for (i = 0; i < els.length; i++)
	els[i].style.display = 'none';
snap = document.evaluate("//*[@class='c']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < snap.snapshotLength; i++) {
	snap.snapshotItem(i).style.background = "#000";
	snap.snapshotItem(i).style.filter = "alpha(opacity=85)";
	snap.snapshotItem(i).style.opacity = "0.85";
	snap.snapshotItem(i).style.MozOpacity = "0.85";
}
urlArr = document.location.href.split("/");
url = urlArr[3];
url = url.split("?");
if (url[0] != "leftmenu.php") {
	coordsToLinks();
}
if (url[0] == "infos.php") {
	url = url[1];
	infoMinas();
}
if ((url[0] == "overview.php") && ((url[1] == null) || (url[1].search("mode") == "-1"))){
	snap = document.evaluate("//TABLE/TBODY/TR/TH[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	showTime();
}