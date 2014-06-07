// ==UserScript==
// @name           LandGrab games filter
// @namespace      landgrab_games_filter
// @description    LandGrab Games Filter
// @include        http://www.landgrab.net/landgrab/Home*
// @include        http://landgrab.net/landgrab/Home*
// ==/UserScript==

var oTables = document.getElementsByTagName('table');
var oTable;
var count =0;
for(var i=0; count<2; i++){
	if(oTables[i].parentNode == document.body){
		oTable = oTables[i];
		count++;
	}
}
var oTd = oTable.childNodes[3].childNodes[0].childNodes[1];
var oDiv = oTd.childNodes[11];
var reg = /\((\d)* games? waiting on you\)/;
var iHidden = 0;
var iShown = 0;
if(reg.test(oDiv.innerHTML)){
	for(var i=13;i<oTd.childNodes.length; i+=4){
		if(oTd.childNodes[i].hasAttribute){
			if(!oTd.childNodes[i].hasAttribute("style")){
				if(oTd.childNodes[i].childNodes.length >= 2){
					oMsg = oTd.childNodes[i].childNodes[1].childNodes[2].childNodes[1];
					reg = /message/;
					if(!reg.test(oMsg.innerHTML)){
						for(var j=i;j<i+4;j+=2)
							oTd.childNodes[j].style.display = 'none';
						iHidden++;
					}else{
						iShown++;
					}
				}
			}else{
				iShown++;
			}
		}
	}
	oDiv.innerHTML = oDiv.innerHTML + "<br />("+iShown+" shown, "+iHidden+" hidden)";
}else{
	var bDo = false;
	for(var i=11;i<oTd.childNodes.length; i+=4){
		if(oTd.childNodes[i].childNodes.length >= 2){
			oMsg = oTd.childNodes[i].childNodes[1].childNodes[2].childNodes[1];
			reg = /message/;
			if(reg.test(oMsg.innerHTML)){
				bDo = true;
				break;
			}
		}
	}
	if(bDo){
		for(var i=11;i<oTd.childNodes.length; i+=4){
			if(oTd.childNodes[i].childNodes.length >= 2){
				oMsg = oTd.childNodes[i].childNodes[1].childNodes[2].childNodes[1];
				reg = /message/;
				if(!reg.test(oMsg.innerHTML)){
					for(var j=i;j<i+4;j+=2)
						oTd.childNodes[j].style.display = 'none';
					iHidden++;
				}else{
					iShown++;
				}
			}
		}
		var oDivTo = document.createElement("div");
		oDivTo.style.color = 'rgb(235,225,85)';
		oDivTo.style.textAlign = 'center';
		oDivTo.innerHTML = '('+iShown+' shown, '+iHidden+' hidden)<br />';
		oTd.insertBefore(oDivTo, oTd.childNodes[10]);
	}
}