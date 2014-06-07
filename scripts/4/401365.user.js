// ==UserScript==
// @name        ovs - ajout age et prénom
// @namespace   https://userscripts.org/scripts/show/401365
// @author      Luc Philippe
// @include     http://*.onvasortir.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {

function getByTagAndClassName(doc, tagName, className) {
	var res = new Array();
	var divs=doc.getElementsByTagName(tagName);
	for (var i = 0; i < divs.length; i++) { 
		var divClass = divs[i].getAttribute("class"); 
		if ( divClass == className) { 
        	res.push(divs[i]);
		}
	}
	return res;
}
function ovsMember() {
	this.name = "?";
	this.age = 0;
	this.setValue = function(strDoc) {
		var doc = document.implementation.createHTMLDocument("doc");
		doc.documentElement.innerHTML = strDoc;
		var eltsTd=doc.getElementsByTagName('td');
		var eltsTxt=eltsTd[0].childNodes;
		for (var i=0; i<eltsTxt.length; i++) { 
			eltTxt=eltsTxt[i];
			if (eltTxt.nodeName == "B") {
				this.name = eltTxt.textContent;
				break;
			}
		}
		for ( ; i<eltsTxt.length; i++) { 
			eltTxt=eltsTxt[i];
			if (eltTxt.nodeName == "#text") {
				var strAgeValue = eltTxt.textContent;
				var index=strAgeValue.indexOf("ans",0);
				if (index != -1) {
					this.age = parseInt(strAgeValue);
					break;
				}
			}
		}
		// console.log(this);
	}
}
function addAge () { 
	var eltsA=document.getElementsByTagName('A');
	for (var i = 0; i < eltsA.length; i++) { 
		var eltA=eltsA[i];
		var strHref=eltA.getAttribute("href"); 
		if (!strHref)
			continue;
		if (strHref.substring(0,16) != "profil_read.php?") 
			continue;
		var eltFont=eltA.childNodes[0].childNodes[0];
		var index=eltFont.innerHTML.indexOf("#",0);
		if ( index != -1) 
			continue;
		var strOnMouseOver=eltA.getAttribute("onmouseover"); 
		var strTip=strOnMouseOver.substring(5,strOnMouseOver.length-2);
		
		var m = new ovsMember();
		m.setValue(strTip);
		eltFont.innerHTML += "#" + m.age+"#<br><font size=\"1\">(" + m.name + ")<br></font>";
	}
}
var bInprogress=false; 
function OnNodeInserted (event) { 
	try {
		if (bInprogress == true) 
			return;
		bInprogress=true;		
		addAge();
		bInprogress=false;		
	} catch (e) {
		console.error("OnNodeInserted("+event+") error:", e); 
	}
}
console.log("START");
var eltsRight = getByTagAndClassName(document,"TD","background_droite"); 
console.log(eltsRight.length);
eltsRight[0].addEventListener ('DOMNodeInserted', OnNodeInserted, false);
addAge();
console.log("END");
})();