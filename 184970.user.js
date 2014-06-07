// ==UserScript==
// @name        ncrypt.in decrypt
// @namespace   *
// @description decrypts ncrypt.in links
// @include     http://ncrypt.in/folder-*
// @version     1.1
// ==/UserScript==

var element = document.getElementById("mirror_0");
if(element != null) {
	function reqLoc(url) {
		GM_xmlhttpRequest({
		  method: "HEAD",
		  url: url,
		  onload: function(res) {
			var cont = document.getElementById("decryptedLinks");
			cont.innerHTML = cont.innerHTML + res.finalUrl + '\r\n';
		  }
		});
	}
	
	var mainCont = document.getElementById("main")
	mainCont.innerHTML = mainCont.innerHTML + '<div><textarea readonly onfocus="this.select()" wrap="virtual" id="decryptedLinks" style="width:100%;height:200px;background:lightgrey" disabled="disabled"></textarea></div>';
	
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@class='link']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		var thisOC = thisDiv.getAttribute('onclick');
		if(thisOC != null && thisOC != "") {
			thisOC = thisOC.replace("window.open('", "");
			var end = thisOC.indexOf("', '_blank');");
			if(end !== -1) {
				thisOC = thisOC.slice(0,end);
				if(thisOC.indexOf("FriendlyDuck") == -1) {
					thisOC = thisOC.replace("/link-", "/frame-");
					reqLoc(thisOC)
				}
			}
		}
		if((i+1) == allDivs.snapshotLength) {
			var cont = document.getElementById("decryptedLinks");
			cont.removeAttribute("disabled");
			cont.style.background = "white";
		}
	}
}