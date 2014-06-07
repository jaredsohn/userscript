// ==UserScript==
// @name           Stadhuis Improver
// @namespace      Johnnei
// @description    Stadhuis Improver 1.00
// @include        http://s*.ikariam.*/index.php?view=townHall*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require 	   http://userscripts.org/scripts/source/57377.user.js

// @history	   0.1 - Base Script Made.
// ==/UserScript==

IkaTools.init({trackData:false});

Imp = {
	getIncome:function(class, gs1){
		var allDivs, tD, pos, end, Hout, txt, re, div, gs;
		div = "//div[@class='"+class+"']";
		pos = -1;
		end = 0;
		allDivs = document.evaluate(
   		div, 
		document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
    	tD = allDivs.snapshotItem(i);
		txt = tD.innerHTML;
		pos = parseInt(txt.indexOf(gs1));
			if(pos != -1){
				pos = pos + 18;
				end = txt.length;
				end = end - 7;
				Hout = parseInt(txt.substring(pos, end));
				Hout = Hout *24;
				}
		}
		return Hout;
	},
	getGold:function(){
		var allDivs, tD, pos, end, Gold, txt, re;
		pos = -1;
		end = 0;
		allDivs = document.evaluate(
   		"//li[@class='incomegold incomegold_positive']",
		document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
    	tD = allDivs.snapshotItem(i);
		txt = tD.innerHTML;
		pos = parseInt(txt.indexOf("Netto goud:"));
			if(pos != -1){
				pos = pos + 39;
				end = txt.length;
				end = end - 7;
				Gold = parseInt(txt.substring(pos, end));
				Gold = Gold *24;
				}
		}
				
		allDivs = document.evaluate(
   		"//li[@class='incomegold incomegold_negative']",
		document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
    	tD = allDivs.snapshotItem(i);
		txt = tD.innerHTML;
		pos = parseInt(txt.indexOf("Netto goud:"));
			if(pos != -1){
				pos = pos + 39;
				end = txt.length;
				end = end - 7;
				Gold = parseInt(txt.substring(pos, end));
				Gold = Gold *24;
				Gold = Gold *-1;
				Gold = "-"+Gold;
				}
		}
		return Gold;
	},
	GetLuxery:function(){
		var allDivs, tD, pos, end, lux, txt, re, div, gs;
		div = "//div[@class='specialworkers']";
		pos = -1;
		end = 0;
		allDivs = document.evaluate(
   		div, 
		document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
    	tD = allDivs.snapshotItem(i);
		txt = tD.innerHTML;
		pos = parseInt(txt.indexOf("icon_"));
			if(pos != -1 || pos2 != -1){
				pos = pos + 5;
				end = txt.length;
				end = end - 126;
				lux = txt.substring(pos, end);
				}
		}
		return lux;
	},
	PanelDir:function(){
		var Panel = document.createElement("div");
		var Gold = Imp.getGold();
		var gs2 = Imp.GetLuxery();
		var icon = '<img src="http://s1.ikariam.nl/skin/resources/icon_'+gs2+'.gif" alt="Luxery" style="float:left";></td><td>'
		Panel.className = "contentBox01h";
		Panel.innerHTML = 
		'<table><b><tr><td>'+
		'<img src="http://s1.ikariam.nl/skin/resources/icon_gold.gif" alt="Goud" style="float:left";></td><td>'
		+ Gold+'<br><br></td><td></tr><tr>'+
		'<img src="http://s1.ikariam.nl/skin/resources/icon_wood.gif"alt="Grondstoffen" style="float:left";></td><td>'
		+Imp.getIncome("woodworkers", "Bouwmateriaal")+'<br><br></td><td></tr><tr>'+
		icon
		+Imp.getIncome("specialworkers",gs2)+'<br><br></td><td></tr></table>';
		return Panel;
	},
	Init:function(){
		IkaTools.addInfoBox("Productie Per Dag",Imp.PanelDir());
	}
}

Imp.Init();