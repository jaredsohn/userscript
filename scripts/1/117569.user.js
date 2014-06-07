// ==UserScript==
// @name           FunnyPizza Helper
// @description    Extends FunnyPizza
// @date           07.11.2011
// @version        0.0.4
// @include        http://s*.funnypizza.de/*
// ==/UserScript==

// http://userscripts.org/scripts/show/117569

var VERSION = "0.0.4";

body = document.getElementsByTagName("body")[0];

var now = new Date();
var PBtimer = '';
var prodTimer = '';

var leftMaster = document.createElement('div');
leftMaster.setAttribute("style","position: fixed; left:1px;top:1px;z-index:999;width:100px;");
leftMaster.setAttribute("id","leftMaster");
body.appendChild(leftMaster);

var rightMaster = document.createElement('div');
rightMaster.setAttribute("style","position: fixed; right: 0px; top:1px;z-index:999;width:100px;");
rightMaster.setAttribute("id","rightMaster");
body.appendChild(rightMaster);

var AllReq = document.createElement('div');
AllReq.setAttribute("style","float:left;left:1px;z-index:999;border: 1px solid black; margin: 1px;width:100%;background-color: red");
AllReq.setAttribute("id","AllReq");
leftMaster.appendChild(AllReq);

function renameProduct(oldProduct) {
	//alert(oldProduct);
	var oldAr = oldProduct.split(" ");
	if(oldAr[0] == "Pizza") {
		newProduct = "P "+oldAr[1];
	} else if(oldAr[1] == "Salat") {
	 	newProduct = "S "+oldAr[0];
	} else if(oldAr[1] == "Spaghetti" || oldAr[1] == "Makkaroni" || oldAr[1] == "Tortellini" || oldAr[1] == "Lasagne") {
	 	newProduct = "N "+oldAr[0];
	} else if(oldAr[1] == "Eis") {
	 	newProduct = "E "+oldAr[0];
	} else {
		newProduct = "G "+oldProduct;
	}
	return newProduct;
}

function refreshtimerpb() {         
	if(typeof PBTimer == 'undefined') {
		PBTimer = document.createElement('div');
		PBTimer.setAttribute("style","float:left;left:1px;z-index:999;border: 1px solid black; margin: 1px;width:100%;background-color: red");
		PBTimer.setAttribute("id","PBTimer");
		rightMaster.appendChild(PBTimer);
	}
	var now = new Date();
	timenow = now.getTime();
	pbend = parseInt(GM_getValue("timer_pb"));
	var title = GM_getValue("timer_pbtitle");
	timediff = pbend - timenow;
	if(timediff > 0) {
		//alert(title)
		PBTimer.innerHTML = "<b>Pizzabäcker</b><br />"+title+"<br />"+getTimeLeft(Math.round(timediff/1000));
	} else {
		if(title != '') {
			GM_setValue("timer_pbtitle",'');
		}
		PBTimer.innerHTML = "<b>Pizzabäcker</b><br />UNTÄTIG!";
	}
	
	setTimeout(refreshtimerpb, 1000);
}

function addBox(text,name,color,position,append) {
	var newBox = document.createElement('div');
	newBox.setAttribute("style","float:left;left:1px;z-index:999;border: 1px solid black; margin: 1px;width:100%;background-color:"+color);
	newBox.setAttribute("id",name);
	newBox.innerHTML = text;
	append.appendChild(newBox);
}

function assocSort (oldAr) {
	var arKey = Array();
	var newAr = Array();
	for (var key in oldAr) {
		arKey.push(key);
	}
	arKey.sort();
	for (var y=0;y<arKey.length;y++) {
		newAr[arKey[y]] = oldAr[arKey[y]];
	}
	return newAr;
}

function getTimeLeft(sec) {
    h = Math.floor(sec / 3600);
    m = Math.floor((sec - (h * 3600)) / 60);
    s = Math.floor(sec - ((h * 3600) + (m * 60)));
    if (h && m < 10) m = '0' + m;
    if ((h || m) && s < 10) s = '0' + s;
    return (h ? h + 'h ' : '') + (m ? m + 'm ' : '') + s + 's';
}

function checkSlots() {
	for(var snum=0;snum<4;snum++) {
		if (location.href.match(/pizzaofen$/)) var prodtype = "P";
		if (location.href.match(/salatbar$/))  var prodtype = "S";
		if (location.href.match(/nudelecke$/)) var prodtype = "N";
		if (location.href.match(/eisvitrine$/)) var prodtype = "E";
		if (location.href.match(/getraenkeregal$/)) var prodtype = "G";
		var slot = document.getElementById('left'+snum)
		if(slot) {
			var slotdiv = document.getElementById('div'+snum).getAttribute("onmouseover");
			var slotspl = slotdiv.split("TITLE, '");
			var slotprod = renameProduct(slotspl[1].replace("')",""));
			GM_setValue("timer_slot_"+prodtype+snum+"_prod",slotprod);
			GM_setValue("timer_slot_"+prodtype+snum,String(((now.getTime()))+(parseInt(slot.value)*1000)));
		} else {
		   GM_setValue("timer_slot_"+prodtype+snum,String("0"));
		}
	}
}

function refreshTimer() {
	var prodtypes = Array('P','S','N','E');
	for (var a=0;a<prodtypes.length;a++) {
		for(var snum=0;snum<4;snum++) {
		
			var istimer = GM_getValue("timer_slot_"+prodtypes[a]+snum);
			if(istimer != 0) {
				slotname = prodtypes[a]+snum;
				var doit = 0;
				eval("if(typeof timer_"+slotname+" == 'undefined') doit = 1");
				if(doit != 0) {
					eval("timer_"+slotname+" = document.createElement('div')");
					eval("timer_"+slotname+".setAttribute('style','float:left;left:1px;z-index:999;border: 1px solid black; margin: 1px;width:100%;background-color: red')");
					eval("timer_"+slotname+".setAttribute('id','prodTimer_"+slotname+"')");
					eval("rightMaster.appendChild(timer_"+slotname+")");
				}
				var now = new Date();
				timenow = now.getTime();
				pbend = parseInt(istimer);
				//var title = GM_getValue("timer_pbtitle");
				timediff = pbend - timenow;
				if(timediff > 0) {
					var slotprod = GM_getValue("timer_slot_"+prodtypes[a]+snum+"_prod");
					eval("timer_"+slotname+".innerHTML = '1x  "+slotprod+"<br />"+getTimeLeft(Math.round(timediff/1000))+"'");
				} else {
					GM_setValue("timer_slot_"+prodtypes[a]+snum+"_prod","");
					GM_setValue("timer_slot_"+prodtypes[a]+snum,0);
					eval("rightMaster.removeChild(timer_"+slotname+")");
				}
			}
		}
		
	}
	setTimeout(refreshTimer, 1000);
}

function check_update() {
	var now = new Date();
	timenow = now.getTime();
	var lastcheck = GM_getValue("last_update_check");
	if((timenow - lastcheck) > 86400000 || typeof lastcheck == 'undefined') {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/117569.meta.js",
			onload: function(response){
				if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
					updateCheck=(/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
					GM_setValue("newerversion",updateCheck);
					GM_setValue("last_udpate_check",String(timenow));
				}
			}
		});
	}
	newerversion = GM_getValue("newer_version");
	if(newerversion != VERSION) {
		var updateInfo = document.createElement('div');
		updateInfo.setAttribute("style","color: black; border:1px solid black; bottom: 0px; margin:auto auto auto auto; z-index:999;width:100px;background-color: yellow");
		updateInfo.setAttribute("id","updateInfo");
		leftMaster.appendChild(updateInfo);
		updateInfo.innerHTML = "Helper Update<br />Alt: "+VERSION+"<br />Neu: "+newerversion+"<br /><button onclick=\"location.href='http://userscripts.org/scripts/source/117569.user.js'\">installieren</button>";
	}
}

window.addEventListener("load",function(){
   check_update()


	var candDiv = document.getElementsByTagName("div");
	var need = Array();
	var have = Array();
	for(var i=0;i<candDiv.length;i++){
		if(candDiv[i].id.match(/request/) && candDiv[i].id != "requestsPopup") {
			var items = candDiv[i].getElementsByTagName("li")
			var text="";
			for(var z=0;z<items.length;z++){
				
				var tmp1 = Array();
				tmp1 = items[z].innerHTML.split(" ");
				
				var count = tmp1[0].replace("x","");
				if(tmp1[2] != "<span") {
					pname = tmp1[1]+" "+tmp1[2];
					var imp = 4;
				} else {
					pname = tmp1[1];
					var imp = 3;
				}

				var product = renameProduct(pname);
				
				var tmp2 = tmp1[imp].split('style="color:#333">(');
				
				var chave = tmp2[1].replace("x)</span>","");
				chave = chave.replace("<br","");
				have[product] = chave;
				if(!need[product]) need[product] = 0;
				need[product] = need[product]+parseInt(count);

				if(count <= chave) {
					strokeStart = "<s>";
					strokeEnd = "</s>";
				} else {
				 	strokeStart = "";
					strokeEnd = "";
				}
				text = text+strokeStart+chave+"/"+count+" "+product+strokeEnd+"<br />";
			}  
			var name = candDiv[i].id.replace("request","mtxreq");
			addBox(text,name,"#008000",1,leftMaster);
			text = "";
		}
	}
	
	//alert(candDiv[i].getElementsByTagName("li")[0].innerHTML)
	var AllReqContent = "";
	have = assocSort(have);
	for (var prod in have) {
		//alert(prod);
		AllReqContent = AllReqContent + have[prod] +"/"+need[prod]+" "+prod+"<br />";
	}
	//if(AllReqContent = '') { AllReqContent = "Keine Bestellungen"; }                                                             
	AllReq.innerHTML = AllReqContent;
	
	if(location.href.match(/salatbar$/) || location.href.match(/pizzaofen$/) || location.href.match(/nudelecke$/)|| location.href.match(/eisvitrine$/)) {
	 	var sortenDiv = document.getElementById("sorten");
	 	var singleDivs = sortenDiv.getElementsByClassName("float20");
	 	var newdiv = Array();
	 	for(var a=0;a<singleDivs.length;a++) {
	 		var prod;
	 		var product;
	 		prod = singleDivs[a].getElementsByTagName("p")[0].innerHTML;
	 		//alert(prod);
	 		product = renameProduct(prod); 
			var proddiv = singleDivs[a].getElementsByTagName("div")[0];
			if(need[product] || have[product]) {
				if(have[product] >= need[product]) col = "green";
				if(have[product] < need[product]) col = "red";
				proddiv.innerHTML = proddiv.innerHTML + '<font color="'+col+'">Haben:'+have[product]+' | Soll:'+need[product]+'</font>';
			} else {
				if(proddiv.getAttribute("onmouseover").match(/Bestand/)) {
					var spAr = proddiv.getAttribute("onmouseover").split(">");
					spAr = spAr[1].split("x");
					proddiv.innerHTML = proddiv.innerHTML + '<font color="green">Haben:'+spAr[0]+' Soll:0</font>';
				}
			}
	 	}
	}      
	var pb = document.getElementById('leftPB')
	if(pb) {
		var pbtitle = document.getElementById('titlePB');
		var tmp_pbtitle = pbtitle.value.split(" ");
		var new_pbtitle = tmp_pbtitle[0]+" "+renameProduct(tmp_pbtitle[1]+" "+tmp_pbtitle[2]);
		GM_setValue("timer_pb",String(((now.getTime()))+(parseInt(pb.value)*1000)));
		GM_setValue("timer_pbtitle",new_pbtitle);
	}
	refreshtimerpb();
	checkSlots();
	refreshTimer();
	
   //GM_deleteValue("timer_slot_undefined0");
	var log="";
	var vals = GM_listValues();
	vals.sort();
	for each (val in vals) {
	  log = log+val+":"+GM_getValue(val)+"\n";
	} 
	GM_log(log)
	
},false);