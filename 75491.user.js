// ==UserScript==
// @name           Én Kicsi Tanyám Automata
// @namespace      http://s*.enkicsitanyam.hu/*
// @description    Én Kicsi Tanyám ültetési és öntözési segédlet
// @date           26.04.2010
// @include        http://s*.enkicsitanyam.hu/*
// ==/UserScript==


window.addEventListener("load",function(){

function $(ID) {return document.getElementById(ID)}
function getRandom( min, max ) {
	if( min > max ) {return( -1 );	}
	if( min == max ) {return( min );}
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

// Umlaute
var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
var sz = "\u00DF";

var feldtyp = [0,1,2,2,2,2,0,3,3,3,3,0];

function removeElement(node){node.parentNode.removeChild(node)}

function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}

function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
}

function keyup(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("keyup", true, true);
	A.dispatchEvent(B);
}

function show_page( page ) {
  unsafeWindow.gclr();
  unsafeWindow.clr();
  var i = 0;
  while( document.getElementById("kunde"+i) ) {
	document.getElementById("kunde"+i).style.display = "none";
	i++;
  }
  document.getElementById("einkaufszettel").style.display = "none";
  document.getElementById("multiframe").src = page;
  document.getElementById("popup_garden").style.display = "block";
  document.getElementById("multiframe").style.display = "block";
  document.getElementById("transp").style.display = "block";
}

function auto(v){
//GM_log("auto"+v);
	busy=true;
	if (unsafeWindow.mode!="0") click($("anpflanzen"));
	if ($("busydiv")) {
		if (v<121) {
		$("busydiv").innerHTML = "Ültetés...";
		if (v%12==1) { linecount = 0; }
		var frei = true;
		if (unsafeWindow.garten_kategorie[v] && ((unsafeWindow.garten_kategorie[v]!="v") || (unsafeWindow.garten_zeit[v]!="0"))) { frei = false; }
		else {
			if (unsafeWindow.global_x == "2") { 
				if (v%12==0) { frei = false; } 
				else {
					w = v+1;
					if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))) { frei = false; }
					else {
						if (unsafeWindow.global_y == "2") {
							if (v>108) { frei = false; } 
							else {
								w = v+12;
								if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))) { frei = false; }
								else {
									w = v+13;
									if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))) { frei = false; }
								}
							}
						}
					}
				}
			}
		}
		
		if (frei) {
			window.setTimeout(function(){
				click($("f"+v));
				v+=parseInt(unsafeWindow.global_x,10);
				linecount += parseInt(unsafeWindow.global_x,10);
				if (linecount>11) { v += 12*(parseInt(unsafeWindow.global_y,10)-1); }
				auto(v);
			},getRandom(tmin,tmax));
		} else auto(v+1);
		} else {
			if (ernte()) {
				window.setTimeout(function(){
					auto(1);
				},getRandom(tmin2,tmax2));
			} else {
				$("busydiv").innerHTML = "Öntözés...";
				window.setTimeout(function(){
					if ($("tooltipwaterall")) { 
						unsafeWindow.waterGarden(gartenNr); 
						removeElement($("busydiv")); 
						busy=false;
						try {clearInterval(restartBot);} catch(err) { }
						if (valBot) { //Garten schliessen
							$("logoutbutton").innerHTML = "Foglalt:"+busy;
							window.setTimeout(function(){ 
								click($("button_cancel"+gartenNr));
							},getRandom(tmin2,tmax2));
						}
					} else { autogiess(1); }
				},getRandom(tmin2,tmax2));
			}
		}
	} else {
		busy=false;
		try {clearInterval(restartBot);} catch(err) { }
		valBot = false;
		$("inputvalBot").checked = false;
	}
}

function autogiess(v){
//GM_log("autogiess"+v);
	busy=true;
	if (unsafeWindow.mode!="2") click($("giessen"));
	if ($("busydiv")) {		
		$("busydiv").innerHTML = "Locsol...";
		if (v<121) {
		if ((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0") && ((unsafeWindow.garten_wasser[v]=="0")||(unsafeWindow.garten_wasser[v]=="")))  { 
			window.setTimeout(function(){
				click($("f"+v));
				autogiess(v+parseInt(unsafeWindow.garten_max_x[v],10));
			},getRandom(tmin,tmax));
		} else autogiess(v+1);
		} else {
			if (ernte()) {
				window.setTimeout(function(){
					auto(1);
				},getRandom(tmin2,tmax2));			
			} else {
				click($("anpflanzen"));
				removeElement($("busydiv")); 
				busy=false;
				try {clearInterval(restartBot);} catch(err) { }
				if (valBot) { //Garten schliessen
					$("logoutbutton").innerHTML = "Foglalt:"+busy;
					window.setTimeout(function(){ 
						click($("button_cancel"+gartenNr));
					},getRandom(tmin2,tmax2));
				}
			}
		}
	} else {
		click($("anpflanzen"));
		busy=false;
		try {clearInterval(restartBot);} catch(err) { }
		valBot = false;
		$("inputvalBot").checked = false;
	}		
}

function autofutter(sorte){
//GM_log("autofutter"+sorte);
	busy=true;
	if ($("busydiv")) {		
		$("busydiv").innerHTML = "Etetés...";
		if ($("errorboxinner").style.display!="block") {
			window.setTimeout(function(){
				unsafeWindow.feedAnimals(sorte);
				if (valBot && (!valTiereSatt[unsafeWindow.locationinfo[6]])) { $("errorboxinner").style.display="block"; }
				autofutter(sorte);
			},3*getRandom(tmin,tmax));
		} else {
			removeElement($("busydiv")); 
			unsafeWindow.hideDiv('transp2');
			unsafeWindow.hideDiv('errorboxinner');
			busy=false;
			try {clearInterval(restartBot);} catch(err) { }
			if (valBot) { //Stall schliessen
				$("logoutbutton").innerHTML = "Foglalt:"+busy;
				window.setTimeout(function(){
					removeElement($("busydiv"));
					busy=false;
					try {clearInterval(restartBot);} catch(err) { }
					$("logoutbutton").innerHTML = "Foglalt:"+busy;
					click($("button_cancel"+gartenNr));
				},getRandom(tmin2,tmax2));
			}
		}
	} else {
		busy=false;
		try {clearInterval(restartBot);} catch(err) { }
		valBot = false;
		$("inputvalBot").checked = false;
	}			
}

function autoprem(){
//GM_log("autoprem");
	busy=true;
	click($("button_cancel"+gartenNr));
	window.setTimeout(function(){
		click($("autoplantbutton"+gartenNr).parentNode);
		window.setTimeout(function(){
			click($("commitboxfooter").firstChild);
			window.setTimeout(function(){
				busy=false;
				try {clearInterval(restartBot);} catch(err) { }
				$("logoutbutton").innerHTML = "Foglalt:"+busy;
				click($("button_cancel"+gartenNr));
			},getRandom(tmin2,tmax2));
		},getRandom(tmin2,tmax2));
	},getRandom(tmin2,tmax2));
}

function autofutterprem(sorte){
//GM_log("autofutterprem"+sorte);
	busy=true;
	$("busydiv").innerHTML = "Takarmányozás...";
	window.setTimeout(function(){
		unsafeWindow.commitSubmitFillFood(gartenNr,sorte);
		window.setTimeout(function(){
			if (valTiereSatt[unsafeWindow.locationinfo[6]]) $("feedamount").value="216";
			keyup($("feedamount"));
			window.setTimeout(function(){
				click($("commitboxfooterinner").firstChild);
				window.setTimeout(function(){
					removeElement($("busydiv"));
					busy=false;
					try {clearInterval(restartBot);} catch(err) { }
					$("logoutbutton").innerHTML = "Foglalt:"+busy;
					click($("button_cancel"+gartenNr));
				},getRandom(tmin2,tmax2));
			},getRandom(tmin2,tmax2));
		},getRandom(tmin2,tmax2));
	},getRandom(tmin2,tmax2));
}

function autofabrik(){
	busy=true;
	$("busydiv").innerHTML = "Gyártás...";
	window.setTimeout(function(){
		click($("advancedproductionbutton"+unsafeWindow.locationinfo[6]).firstChild);
		window.setTimeout(function(){
			click($("commitboxfooterinner").firstChild);
			removeElement($("busydiv"));
			busy=false;
			try {clearInterval(restartBot);} catch(err) { }
			$("logoutbutton").innerHTML = "Foglalt:"+busy;			
			click($("button_cancel"+gartenNr));
		},getRandom(tmin2,tmax2));
	},getRandom(tmin2,tmax2));
}

function ernte() {
//GM_log("ernte");
	if ($("gardenmaincontainer").style.display=="block") { zoneTyp = 1; }
	if ($("innermaincontainer").style.display=="block") { zoneTyp = feldtyp[unsafeWindow.locationinfo[6]]; }
//GM_log("zoneTyp"+zoneTyp);
	switch (zoneTyp) {
		case 1: { var keypflanze = /_(..)\./;
			var ernten = false;
			for(var v=1;v<=120;v++){
//GM_log(v);			
				str=keypflanze.exec($("f"+v).style.background);
				if ((unsafeWindow.garten_kategorie[v]=="v") && str && str[1]=="04") {ernten=true;break;}
			}
			if (ernten) {click($("cropall").firstChild);; return true;}
			else {return false;}
			break; }
		case 2: {
			if ($("commitboxcrop").style.display=="block") {click($("commitboxfootercrop").firstChild); return true;}
			else {return false;}
			break;}
		case 3: {
			if ($("commitboxcrop").style.display=="block") {click($("commitboxfootercrop").firstChild); return true;}
			else {return false;}
			break;}
		default: return false;
	}
}

function start_bot(){
	try {window.clearInterval(restartBot);} catch (err) {}
	try {window.clearInterval(intBot);} catch (err) {}
	if (valBot) {
		restartBot = window.setInterval(function () { 
			busy = false; 
			$("logoutbutton").innerHTML = "Foglalt:"+busy;
		},120000);		
		intBot = window.setInterval(function () { 
			if (!busy) run_bot(); 
		},getRandom(tmin2,tmax2));
	} 
}

function run_bot(){
	try{ if (unsafeWindow.selected!=autoPflanze) {
		if ($("glass"+autoPflanze)){
			click($("glass"+autoPflanze));
		} else {
			if (unsafeWindow.userracks == "2"){
				help = autoPflanze;
				click($("racknaviright").firstChild);
				window.setTimeout(function(){
					if ($("glass"+help)){
						click($("glass"+help));
					}
				},200);
			}
		}
	}} catch(err) {}
	busy=true;
	$("logoutbutton").innerHTML = "Foglalt:"+busy;
	// Fertige Zone oeffnen
	if (document.title.search("FERTIG")!=-1){
		var found = false;
		for (var v=1;v<7;v++){
			if ($("zonetime"+v) && (($("zonetime"+v).innerHTML=="ELKÉSZÜLT!") || ($("zonetime"+v).innerHTML=="---"))){
				click($("zone"+v).firstChild.firstChild);
				found = true;
				break;
			}
		}
		// Farmwechsel
		if (!found) {
			nextfarm = 1+((parseInt(unsafeWindow.farm,10))%(parseInt(unsafeWindow.farmamount,10)));
			click($("farmtooltip"+nextfarm).parentNode);
			window.setTimeout(function(){ run_bot(); },getRandom(tmin2,tmax2));
		} else {
			gartenNr = v;
			window.setTimeout(function(){
				ernte();
				if ($("gardenmaincontainer").style.display=="block") {
					newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
					unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
					if ($("autoplantbutton"+gartenNr)) { 
						autoprem(); 
					}
					else { 
						newdiv.addEventListener("click",function(){removeElement(this);},false);
						auto(1); 
					}
				
				} else {
				if ($("innermaincontainer").style.display=="block") {
					newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
					unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
					var currFeld = unsafeWindow.locationinfo[6];
					if (feldtyp[currFeld] == 2){
						var v = 2*currFeld-3;
						if (!valTiereFutter[currFeld]) v++;
						if (unsafeWindow.premium || (parseInt($("levelnum").innerHTML,10)<10)) { 
							autofutterprem(v); 
						} else {
							autofutter(v); 
							newdiv.addEventListener("click",function(){removeElement(this);},false);	
						}
					}
					if (feldtyp[currFeld] == 3){
						autofabrik(); 
					}
				} else {
				busy=false;
				$("logoutbutton").innerHTML = "Foglalt:"+busy;
				try {clearInterval(restartBot);} catch(err) { }
				}}
			},getRandom(tmin2,tmax2));
		}
	} else {
		if ($("gardenmaincontainer").style.display=="block") {
			click($("button_cancel"+gartenNr));
		}
		if ($("innermaincontainer").style.display=="block") {
			click($("button_cancel"+gartenNr));
		}
		busy=false;
		$("logoutbutton").innerHTML = "Foglalt:"+busy;
		try {clearInterval(restartBot);} catch(err) { }
		
		//umloggen
		if ($("sprcontent").firstChild.firstChild.href)
		document.location = $("sprcontent").firstChild.firstChild.href; 
	}
}

function do_main(){
var keygarten = /parent.cache_me\((.*?),/;

window.setInterval(function () {
cand = keygarten.exec($("gardenarea").innerHTML);
if (valAutoPflanz && cand && $("gardenmaincontainer").style.display=="block"){
	gartenNr = parseInt(cand[1],10);
	if($("gardencancel").childNodes.length==1){
		newimg = createElement("img",{id:"autoplantbutton",title:"Ültetőautómata",class:"link",style:"width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("gardencancel"));
		newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png"},false);
		newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},false);
		newimg.addEventListener("click",function(){
			newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
			newdiv.addEventListener("click",function(){removeElement(this);},false);
			unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
			if($("bedientext").innerHTML=="Locsolás") autogiess(1);
			else auto(1);
		},false);
	}
for (var v=1;v<121;v++) $("f"+v).setAttribute("title",v+"|kat"+unsafeWindow.garten_kategorie[v]+"|zt"+unsafeWindow.garten_zeit[v]+"|wa"+unsafeWindow.garten_wasser[v]+"|pr"+unsafeWindow.garten_prod[v]);
}

if (valAutoFutter && $("innermaincontainer").style.display=="block"){
	for (var v=1;v<10;v++) if($("articleimg"+v)){
	if (!$(v)) {
		newimg = createElement("img",{id:v,class:"link",style:"position:absolute;top:50px;width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("articleimg"+v).parentNode.parentNode);
		newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png"},false);
		newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},false);
		newimg.addEventListener("click",function(){
			newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
			newdiv.addEventListener("click",function(){removeElement(this);},false);
			this.style.display="none";
			position = unsafeWindow.position;
			autofutter(this.id);
		},false);
	}
	}
}

},500);

divsetting = createElement("div",{style:"display:inline;"},all);

link = createElement("button",{type:"button",class:"link2",style:"margin-left:3px;"},divsetting);
link.innerHTML = "Automata beállításai";
link.addEventListener("click",function(){show_page("hilfe.php?autooptions");},false);
link.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9"},false);
link.addEventListener("mouseout",function(){this.style.backgroundColor=""},false);

valBot = GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_valBot"); 
if(valBot==undefined) {valBot=false;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valBot", valBot);}
inp = createElement("input",{id:"inputvalBot",type:"checkbox",checked:valBot,title:"Bot",style:"margin-left:3px;"},divsetting);
inp.addEventListener("click",function(){
	autoPflanze=unsafeWindow.selected;
	GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_autoPflanze", autoPflanze);
	valBot=$("inputvalBot").checked;
	GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valBot", valBot);
	start_bot();
},false);
start_bot();

$("lager").addEventListener("click",function(){
	window.setTimeout(function(){
		if (unsafeWindow.produkt_category[unsafeWindow.selected]=="v") {
			autoPflanze = unsafeWindow.selected;
			GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_autoPflanze", autoPflanze);
		}
	},100);
},false);

// Updatecheck
if (!valBot) {
	valLastUpdate = GM_getValue("enKicsitanyamAutomata_valLastUpdate");
	if(valLastUpdate==undefined) {valLastUpdate="0";GM_setValue("enKicsitanyamAutomata_valLastUpdate", valLastUpdate);}
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/75326.meta.js",
		onload: function(response) {
			keyusoversion = /uso:version\s+(\d+)/;
			serverversion = keyusoversion.exec(response.responseText)[1];
			if (valLastUpdate!=serverversion) {
				if(confirm("Új verzió érhető el az Én Kicsi Tanyám Automata scriptből. Szeretnéd most frissíteni?")) {
					document.location="http://userscripts.org/scripts/source/75326.user.js";
				}
			}				
			GM_setValue("enKicsitanyamAutomata_valLastUpdate",serverversion);
		}
	});
}

}

function do_hilfe(){
if (pageZusatz=="?autooptions"){
	canddiv = all.getElementsByTagName("div");
	for (var v=canddiv.length-1;v>0;v--) if (canddiv[v].style.height=="360px") removeElement(canddiv[v]);
	var divinfo=createElement("div",{style:"height:380px; width:500px; margin:10px; overflow:auto; color:black;"},all);
	
	newtable = createElement("table",{style:"width:100%"},divinfo);

	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputvalAutoPflanz",type:"checkbox",checked:valAutoPflanz},newtd);
	inp.addEventListener("click",function(){valAutoPflanz=$("inputvalAutoPflanz").checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valAutoPflanz", valAutoPflanz);},false);
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Jelenítse meg az automatikus ültetőt?";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputvalAutoFutter",type:"checkbox",checked:valAutoFutter},newtd);
	inp.addEventListener("click",function(){valAutoFutter=$("inputvalAutoFutter").checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valAutoFutter", valAutoFutter);},false);
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Jelenítse meg az automatikus etetőt?";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputtmin",value:tmin,size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("keyup",function(){tmin=this.value;GM_setValue("enKicsitanyamAutomata_tmin", tmin);},false);
	newspan = createElement("span","",newtd);
	newspan.innerHTML = "ms";
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Minimális várakozási idő a klikkelések között";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputtmax",value:tmax,size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("keyup",function(){tmax=this.value;GM_setValue("enKicsitanyamAutomata_tmax", tmax);},false);
	newspan = createElement("span","",newtd);
	newspan.innerHTML = "ms";
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Maximális várakozási idő a klikkelések között";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputtmin2",value:tmin2,size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("keyup",function(){tmin2=this.value;GM_setValue("enKicsitanyamAutomata_tmin2", tmin2);},false);
	newspan = createElement("span","",newtd,"ms");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Minimális várakozási idő az eszköz váltások (vetés <> öntözés) között";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	inp = createElement("input",{id:"inputtmax2",value:tmax2,size:"5px",style:"background-color:transparent;color:white;"},newtd);
	inp.addEventListener("keyup",function(){tmax2=this.value;GM_setValue("enKicsitanyamAutomata_tmax2", tmax2);},false);
	newspan = createElement("span","",newtd,"ms");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Maximális várakozási idő az eszköz váltások (vetés <> öntözés) között";
	
	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{id:"inputvalTiereSatt2",type:"checkbox",checked:valTiereSatt[2]},newdiv);
	inp.addEventListener("click",function(){valTiereSatt[2]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt", valTiereSatt.join("|"));},false);
	newspan = createElement("span","",newdiv,"Igen");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter2",checked:valTiereFutter[2]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[2]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Búza");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter2",checked:!valTiereFutter[2]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[2]=!this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Kukorica");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Szeretnéd etetni a csirkéket?";

	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{checked:valTiereSatt[3],id:"inputvalTiereSatt3",type:"checkbox"},newdiv);
	inp.addEventListener("click",function(){valTiereSatt[3]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt", valTiereSatt.join("|"));},false);
	newspan = createElement("span","",newdiv,"Igen");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter3",checked:valTiereFutter[3]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[3]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Lucerna");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter3",checked:!valTiereFutter[3]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[3]=!this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Repce");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Szeretnéd etetni a teheneket?";

	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{id:"inputvalTiereSatt4",type:"checkbox",checked:valTiereSatt[4]},newdiv);
	inp.addEventListener("click",function(){valTiereSatt[4]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt", valTiereSatt.join("|"));},false);
	newspan = createElement("span","",newdiv,"Igen");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter4",checked:valTiereFutter[4]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[4]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Takarmányrépa");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter4",checked:!valTiereFutter[4]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[4]=!this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Fű");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Szeretnéd etetni a birkákat?";

	newtr = createElement("tr",{style:"line-height:18px;"},newtable);
	newtd = createElement("td",{align:"center"},newtr);
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{id:"inputvalTiereSatt5",type:"checkbox",checked:valTiereSatt[5]},newdiv);
	inp.addEventListener("click",function(){valTiereSatt[5]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt", valTiereSatt.join("|"));},false);
	newspan = createElement("span","",newdiv,"Igen");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter5",checked:valTiereFutter[5]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[5]=this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Napraforgó");
	newdiv = createElement("div","",newtd);
	inp = createElement("input",{type:"radio",name:"futter5",checked:!valTiereFutter[5]},newdiv);
	inp.addEventListener("click",function(){valTiereFutter[5]=!this.checked;GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|"));},false);
	newspan = createElement("span","",newdiv,"Búzavirág");
	newtd = createElement("td","",newtr);
	newtd.innerHTML = "Szeretnéd etetni a méheket?";
	
}
}

// ***************************************************************************************************

var reg = /http:\/\/s(.*?)\.enkicsitanyam\.hu\/(.*?)\.php(.*)/i;
loc = reg.exec(document.location);
var server = loc[1];
var page = loc[2];
var pageZusatz = loc[3];

if (top.document.getElementById("username")) { 
	username = top.document.getElementById("username").innerHTML; 
	all  = document.getElementsByTagName("body")[0];
	candtable  = document.getElementsByTagName("table");
	
	var busy=false;
	var linecount = 0;
	var gartenNr = 1;
	var autoPflanze = GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_autoPflanze"); 
	if(isNaN(autoPflanze)) autoPflanze = 1;
	valAutoPflanz = !!GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_valAutoPflanz"); 
	valAutoFutter = !!GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_valAutoFutter");
	tmin = parseInt(GM_getValue("enKicsitanyamAutomata_tmin"),10);
	if(isNaN(tmin)) {tmin=300;GM_setValue("enKicsitanyamAutomata_tmin", tmin);}
	tmax = parseInt(GM_getValue("enKicsitanyamAutomata_tmax"),10);
	if(isNaN(tmax)) {tmax=700;GM_setValue("enKicsitanyamAutomata_tmax", tmax);}
	tmin2 = parseInt(GM_getValue("enKicsitanyamAutomata_tmin2"),10);
	if(isNaN(tmin2)) {tmin2=2000;GM_setValue("enKicsitanyamAutomata_tmin2", tmin2);}
	tmax2 = parseInt(GM_getValue("enKicsitanyamAutomata_tmax2"),10);
	if(isNaN(tmax2)) {tmax2=4000;GM_setValue("enKicsitanyamAutomata_tmax2", tmax2);}
	valTiereSatt = new Array();
	try { 
		arr = GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt").split("|");
		for (var v=2;v<6;v++) valTiereSatt[v]=(arr[v]=="true");
	} catch(err) {
		for (var v=2;v<6;v++) valTiereSatt[v]=true;
		GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereSatt", valTiereSatt.join("|")); 
	}
	valTiereFutter = new Array();
	try { 
		arr = GM_getValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter").split("|");
		for (var v=2;v<6;v++) valTiereFutter[v]=(arr[v]=="true");
	} catch(err) {
		for (var v=2;v<6;v++) valTiereFutter[v]=true;
		GM_setValue(server+"_"+username+"_enKicsitanyamAutomata_valTiereFutter", valTiereFutter.join("|")); 
	}
	
	switch (page) {
		case "main": do_main();break;
		case "hilfe": do_hilfe();break;
	}
}
},false);