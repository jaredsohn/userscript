// ==UserScript==
// @name          Kill File fuer das DeDi Forum.
// @namespace     http://forum.der-dirigent.de/
// @description   Ausblenden von unerwuenschten Usern. Benutze Extras->User Scripts Commands->DeDi Forum Killfile veraendern
// @include       http://forum.der-dirigent.de/index.php*
// ==/UserScript==

var killfileStr = GM_getValue("dediforumkillfile", "");

GM_registerMenuCommand( "DeDi Forum Killfile verändern", updateKillfile );

if (killfileStr == "") return;

var killfile = killfileStr.split(" ");

for (var i=0; i<killfile.length; i++) {
	killfile[i] = "/html/body/div/div[2]/div[2]/table/tbody/tr/td/span/a[text()=\"" 
		+ killfile[i] + "\"]/../../..";
}

var xpath = killfile.join(" | ");

var toProcess = new Array();
var trs = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null); 
var thisTr = trs.iterateNext();
while (thisTr) {
  toProcess[toProcess.length] = thisTr;
  thisTr = trs.iterateNext();
}
for (var i=0; i<toProcess.length;i++) {
  var thisTr = toProcess[i];
  var contentTr = findNextTr(thisTr);
  if (contentTr) {
  	contentTr.style.display = "none";
  	contentTr.setAttribute("killed", "true");
  }
}

if (toProcess.length > 0) {
	var img = document.createElement("img");
	img.id = "deKillImg";
	img.src = "data:image/gif,GIF89a%11%00%11%00%C4%19%00ccc%FF%FF%FF%C6%B5%A5%FD%FE%FA%F9%FA%F2%F5%F5%EC%C9%B9%A9%F0%EE%E5%CD%BE%AE%D7%CB%BC%EB%E7%DE%E6%E0%D5%D1%C4%B4%DC%D3%C4%E1%D9%CB%EC%E8%E1%E1%D9%CE%F8%F5%F3%DC%D3%C7%CD%BE%B0%C9%B9%AA%D7%CC%BF%D2%C5%B7%FC%FB%FA%F2%EF%EB%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%19%00%2C%00%00%00%00%11%00%11%00%00%05%7F%60%96%01di%96%E2%18%ACl%CB%02%01%3C%CCt%5D%93%17%A1%EB%E4%EE%93%91%82PH%0A%0C%87%24%CCaI%3A%C4%00%CB(%E9%A1%A8%16%15%D7*%16%B0X%90%16O%F0%B7K%828%8AgX%3A%E0HK%1A%8Dg%9C%14%0F%C0I%95%84%BE%98%E0%EB%FB%00%16%0C%24%0C%2B%0C%85%84%87%24%13%08E%08%8F%8F%8E%8D%00%14%06%06%2B%96%99%97%01%96%24%02%9F%A0%A1%A2%00%23%A2%A6%9F%A4%22'%AB%24%22!%00%3B";
	img.style.position = "fixed";
	img.style.bottom = "2px";
	img.style.left = "2px";
	img.style.cursor = "pointer";
	img.title = "Ausgeblendete Beiträge wieder einblenden";
	img.addEventListener("click", deKill, false);
	document.getElementsByTagName("body")[0].appendChild(img);
}

function deKill(e){
	document.getElementById("deKillImg").style.display = "none";
	var trs = document.getElementsByTagName("TR");
	for (var i=0; i<trs.length; i++) {
		if (trs[i].getAttribute("killed") == "true") {
			trs[i].style.display = "";
		}
	}
}

function findNextTr(curTr) {
	curTr = curTr.nextSibling;
	while (curTr) {
		if (curTr.nodeName.toUpperCase() == "TR") return curTr;
		curTr = curTr.nextSibling;
	}
	return null;
}


function updateKillfile() {
	GM_setValue("dediforumkillfile", 
		prompt("Liste der User, die ausgeblendet werden sollen (Separiert mit Leerzeichen)", 
		GM_getValue("dediforumkillfile", ""))
	);
	location.reload();
}
