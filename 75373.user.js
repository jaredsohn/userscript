// ==UserScript==
// @name           MyFreeFarm StatBot
// @namespace      http://userscripts.org/scripts/show/75373
// @updateURL      about:blank
// @description    Observes the market
// @date           11.04.2012
// @version        1.2.8
// @include        http://userscripts.org/scripts/show/75373
// @include        http://s*.myfreefarm.*/main.php*
// @include        http://s*.migranjalinda.es/main.php*
// @include        http://s*.mabelleferme.fr/main.php*
// @include        http://s*.wolnifarmerzy.pl/main.php*
// @include        http://s*.enkicsitanyam.hu/main.php*
// @include        http://s*.mojaderewnja.ru/main.php*
// @include        http://s*.tr.myfreefarm.com/main.php*
// @include        http://s*.pt.myfreefarm.com/main.php*
// @include        http://s*.veselaferma.com/main.php*
// @require        http://userscripts.org/scripts/source/94946.user.js
// ==/UserScript==

const VERSION = "1.2.8"
const neededVersionBerater = "1.4.9";
const neededVersionFunctionFile = "1.0.30";
const USO_ID    ="75373";
const USO_Home  ="http://userscripts.org/scripts/show/"+USO_ID; //GM_info["script"]["namespace"]
const USO_Source="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
const USO_Meta  ="http://userscripts.org/scripts/source/"+USO_ID+".meta.js";
if(NEVER==undefined){
	alert("Hi, I am the StatBot-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href = USO_Source;
} else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the StatBot-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href = USO_Source;
}

const MIN_VALDELAY = 3
var DEVMODE=GM_getValue("devmode",false);
var allIds = new Array();
var gutBeob = new Array();
var preisBeob = new Array();

var today = 0;
var timeOfLastRun = 0;
var timeOfNextRun = 0;
var restartTimer = null;
var botActive = -1; // 0=off, 1=started to run once, 2=started by script, 3=started by user
var readingActive = false;
var functionBusy = false;
var nodes = new Object();

var valStartAt = false;
var valStartAtActivate = false;
var valStartAtTime = getRandom(8*60,20*60)*60;//14*60*60;
var	valStartEvery = false
var valStartEveryActivate = false;
var valStartEveryTime = getRandom(3*60,6*60)*60;//4*60*60;
var valDelay = 5;
var INIT_category={"c":false,"v":true,"e":false,"o":false,"z":false};
var category={};

function calcObservedPrice(mode,data){
	// data = [[amount1,price1],[amount2,price2],...]
	switch(mode){
	case 1:{ // normal mode. fast market
		data = data.slice();
		// kick upper 20% quantile
		var sum = 0;
		for (var v=0;v<data.length;v++){
			sum += data[v][0];
		}
		sum = Math.floor(0.2*sum);
		for (var v=data.length-1;0<=v;v--){
			if(data[v][0]<sum){
				sum -= data[v][0];
				data.splice(v,1);
			} else {
				data[v][0] -= sum;
				sum = 0;
				break;
			}
		}

		// calc weighted mean
		var weights = [3,3,3,3,2,2,2,2,1,1,1,1];
		var count1 = 0;
		var count2 = 0;
		for (var v=0;v<data.length;v++){
			if(weights[v]!=undefined){
				count1 += weights[v]*data[v][0]*data[v][1];
				count2 += weights[v]*data[v][0];
			}
		}
		if(count2>0){
			return (Math.round(100*count1/count2)/100);
		} else {
			return 0;
		}
	break;}
	case 2:{ // decorations. slow market
		if(data.length>1){
			return data[1][1];
		} else if(data.length==1){
			return data[0][1];
		} else {
			return 0;
		}
	break;}
	}
}
function postStatData(){
	if(DEVMODE){ GM_log("Begin StatBot: posting Data"); }
	unsafeData.statBotpreisBeob = preisBeob.slice();
	preisBeob = new Array();
	unsafeData.statBotgutBeob = gutBeob.slice();
	gutBeob = new Array();
	GM_setValue2(LNG+"_"+SERVER+"_timeOfLastRun",timeOfLastRun = now);	
	raiseEvent("gameStatBotPostedData");
	//setTimers();
	if(DEVMODE){ GM_log("End StatBot: posting Data"); }
}

function parseMarket(currId){
	if (DEVMODE){ GM_log("Begin parseMarket currId:"+currId+" prod:"+allIds[currId]); }
	if(unsafeData.prodTyp[0][allIds[currId]]==undefined || !category[unsafeData.prodTyp[0][allIds[currId]]]){
		if(currId<allIds.length){
			if(DEVMODE){ GM_log("Skip "+unsafeData.prodName[0][allIds[currId]]); }
			window.setTimeout(function (currId){
				parseMarket(++currId);
			},0,currId);
		} else {
			endMarketReading();
		}
	}else{
		$("inputRunOnce").innerHTML = texte["statBot"]["lese1"]+"&nbsp;"+allIds[currId]+"&nbsp;"+unsafeData.prodName[0][allIds[currId]];
		//GM_log("parseMarket parse currId:"+currId+" prod:"+allIds[currId]);
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php?page=1&order=p&id="+allIds[currId],
			onload: function(response){
				if (DEVMODE){ GM_log("Response parseMarket currId:"+currId+" prod:"+allIds[currId]); }
				var pId = /[?&]id=(\d+)/.exec(response.finalUrl)[1];

				var marketContainer = createElement("div",{},null,response.responseText).querySelector("#marketcontainer");
				if(marketContainer.childElementCount==0){
					// no offers
					preisBeob[pId] = [false,(Math.floor((new Date()).getTime()/1000)),,,0];
				} else {
					var canddiv;
					var offers = new Array();
					var sumTotal = 0;
					for (var v=0;v<marketContainer.childElementCount;v++){
						canddiv = marketContainer.children[v].getElementsByTagName("div");
						var menge = parseInt(canddiv[0].innerHTML,10);
						sumTotal += menge;
						var preis = parseFloat(/(\d+\.\d+)/.exec(canddiv[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."))[1],10);
						offers.push([menge,preis]);
					}
					gutBeob[pId] = calcObservedPrice((unsafeData.prodTyp[0][pId]=="z"?2:1),offers);
					preisBeob[pId] = [true,(Math.floor((new Date()).getTime()/1000)),offers[0][1],offers[offers.length-1][1],sumTotal];
					canddiv=null;
					if(DEVMODE){
						GM_log("Read "+unsafeData.prodName[0][pId]);
						GM_log("offers: "+implode(offers));
						GM_log("calc: "+gutBeob[pId]+":"+preisBeob[pId]);
					}
				}
				marketContainer=null;
				if((botActive>0) && (currId<allIds.length)){
					window.setTimeout(function (currId){
						//GM_log("pasreMarket next for currId:"+currId);
						parseMarket(++currId);
					},valDelay*1000,currId);
				} else {
					endMarketReading();
				}
			}
		});
	}
}
function startMarketReading(){
	if(DEVMODE){ GM_log("Begin startMarketReading");}
	//if(busy){ return false; }
	//busy = true;
	if(botActive==0){ return false; }
	if(readingActive){ return false; }
	if(functionBusy){ return false; }
	functionBusy = true;
	readingActive = true;
	gutBeob = new Array();
	preisBeob = new Array();
	//nodes["inputRunOnce"].disabled = true;
	try{ window.clearInterval(restartTimer); }catch(err){}
	nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese0"];
	functionBusy = false;
	//setTimers();
	parseMarket(0);
	if(DEVMODE){ GM_log("End startMarketReading");}
}
function endMarketReading(){
	if(DEVMODE){ GM_log("Begin endMarketReading");}
	if(functionBusy){ return false; }
	functionBusy = false;
	readingActive = false;
	var cell;
	// nodes["inputRunOnce"].disabled = false;
	nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese0"];
	postStatData();
	if(botActive>0){ 
		if(botActive==1){ 
			deactivateBot(); 
		} else {
			setTimers();
		}
	}
	if(DEVMODE){ GM_log("End endMarketReading");}
}

function activateBot(newBotActive){
	if(DEVMODE){ GM_log("Begin activateBot "+botActive+"_"+newBotActive);}
	// busy = false;
	// Check if bot is already running 
	if (botActive>=newBotActive){ return false; }
	// Parallel-run protection
	if(functionBusy){ return false; }
	functionBusy = true;
	botActive = Math.max(botActive,newBotActive);
	GM_setValue2(LNG+"_"+SERVER+"_botActive", botActive);
	nodes["inputStartBot"].style.backgroundColor = (botActive==3)?"#f55":"yellow";
	nodes["inputStartBot"].innerHTML = texte["statBot"]["botStop"];
	if(newBotActive>1){
		functionBusy = false;
		setTimers();
	} else {
		functionBusy = false;
		startMarketReading();
	}
	if(DEVMODE){ GM_log("End activateBot");}
}
function deactivateBot(){
	if(DEVMODE){ GM_log("Begin deactivateBot "+botActive);}
	if(botActive==0){ return false; }
	if(functionBusy){ return false; }
	functionBusy = true;
	botActive = 0;
	GM_setValue2(LNG+"_"+SERVER+"_botActive", botActive);
	nodes["inputStartBot"].style.backgroundColor = "#3c3";
	nodes["inputStartBot"].innerHTML = texte["statBot"]["botStart"];
	//nodes["inputRunOnce"].disabled = false;
	nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese0"];
	functionBusy = false;
	setTimers();
	if(DEVMODE){ GM_log("End deactivateBot");}
}
function setTimers(){
	if(functionBusy){ return false; }
	functionBusy = true;
	//if(DEVMODE){ GM_log("Begin setTimers");}
	
	// daily starting. only if bot is active or activation-option is set.
	if (valStartAt&&((botActive>0)||valStartAtActivate)){
		// check if bot has run today, else set tomorrow.
		if(timeOfLastRun<today+valStartAtTime) {
			timeOfNextRun = today+valStartAtTime;
		} else {
			timeOfNextRun = today+86400+valStartAtTime;
		}
	} else {
		timeOfNextRun = 0;
	}
	// restarting after the set duration. only if bot is active or activation-option is set.
	if (valStartEvery&&((botActive>0)||valStartEveryActivate)) {
		if(timeOfNextRun>0){
			timeOfNextRun = Math.min(timeOfNextRun,timeOfLastRun+valStartEveryTime);
		} else {
			timeOfNextRun = timeOfLastRun+valStartEveryTime;
		}
	}

	try{ window.clearInterval(restartTimer); }catch(err){}
	if(timeOfNextRun>0){
		functionBusy = false;
		restartTimer=window.setInterval(function (){
			nodes["inputRunOnce"].innerHTML = "Restart in "+getTimeStr(timeOfNextRun-now);
			if(timeOfNextRun<=now){
				try{ window.clearInterval(restartTimer); }catch(err){}
			    if(botActive==0){
					activateBot(2);
				} else {
					startMarketReading();
				}
			}
		},1000);
	} else {
		nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese0"];
		functionBusy = false;
	}
	//if(DEVMODE){ GM_log("End setTimers");}
}

function do_main(){
	if(DEVMODE){ showInLogBubble("Stat-Bot-Script started"); }
	if(DEVMODE){ GM_log("Stat-Bot-Script started"); }

	TOOLTIP = $top("divToolTip");
	LOG_BUBBLE_BOX = $top("divLogBubbleBox");
	LNG = top.unsafeData.LNG;
	SERVER = (new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname))[1];
	delimThou = top.unsafeData.delimThou;
	regDelimThou = new RegExp(top.unsafeData.regDelimThou,"g");
	delimDeci = top.unsafeData.delimDeci;
	regDelimDeci = new RegExp(top.unsafeData.regDelimDeci);

	today = Math.floor((new Date((new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate())).getTime()/1000);
	//GM_setValue2(LNG+"_"+SERVER+"_today", today);
	//GM_setValue(LNG+"_"+SERVER+"_today2", today%(24*60*60));
	window.setInterval(function (){
		now = Math.floor((new Date()).getTime()/1000);
		//GM_setValue2(LNG+"_"+SERVER+"_now", now%(24*60*60));
		//GM_setValue2(LNG+"_"+SERVER+"_now2", getDaytimeStr(now));
	},1000);
	window.setTimeout(function (){
		today = Math.floor((new Date((new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate())).getTime()/1000);
		//GM_setValue2(LNG+"_"+SERVER+"_today", today);
	},((24*60*60)-(now-today)+1)*1000);

	document.addEventListener("gameInfoPanelOpen", function(event){
		if($("infoPanel").getAttribute("mode")=="options"){
			var newdiv = createElement("div",{"class":"","style":"margin-top:20px;padding-top:5px;border-bottom:1px solid #685338;font-weight:bold;"},$("infoPanelL"),texte["statBot"]["statBot"]);
			var newdiv = createElement("div",{"id":"infoPanelLAutomat","class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["optionen"]);
			newdiv.addEventListener("click",function(){
				$("infoPanelT").innerHTML = "<b>"+texte["optionen"]+"</b>&nbsp;-&nbsp;"+texte["statBot"]["statBot"]+"&nbsp;"+VERSION;
				$("infoPanelR").innerHTML = "";
				var newtable = createElement("table",{"class":"hoverRowBgCc9","style":"width:100%","border":"1"},$("infoPanelR"));
				var newtr, newtd, newdiv, inp;
		// *****
				newtr = createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,texte["allgemein"]);

				newtr = createElement("tr",{style:"line-height:18px;"},newtable);
				newtd = createElement("td",{align:"center","style":""},newtr);
				inp = createElement("input",{id:"inputvalStartAt","class":"link",type:"checkbox",checked:valStartAt},newtd);
				inp.addEventListener("click",function(){
					valStartAt = this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_valStartAt", valStartAt);
					setTimers();
				},false);
				inp.addEventListener("blur",function(){
					this.value = valStartAt;
				},false);
				newtd = createElement("td",{colspan:"2"},newtr);
				newdiv = createElement("div",{},newtd);
				createElement("span",{},newdiv,texte["statBot"]["starttime"]);
				inp = createElement("select",{id:"inputvalStartAtTimeH","class":"link",style:"text-align:right;"},newdiv);
				for(var i=0;i<24;i++){
					createElement("option",{"value":i},inp,i+"&nbsp;"+texte["stunden"]);
				}
				inp.value = Math.floor(valStartAtTime/(60*60));
				inp.addEventListener("change",function(){
					valStartAtTime = (parseInt(this.value,10)*60*60) + (parseInt($("inputvalStartAtTimeM").value,10)*60);
					GM_setValue2(LNG+"_"+SERVER+"_valStartAtTime", valStartAtTime);
					setTimers();
				},false);
				inp = createElement("select",{id:"inputvalStartAtTimeM","class":"link",style:"text-align:right;"},newdiv);
				for(var i=0;i<60;i++){
					createElement("option",{"value":i},inp,i+"&nbsp;"+texte["statBot"]["minuts"]);
				}
				inp.value = (valStartAtTime/60)%60;
				inp.addEventListener("change",function(){
					valStartAtTime = (parseInt($("inputvalStartAtTimeH").value,10)*60*60) + (parseInt(this.value,10)*60);
					GM_setValue2(LNG+"_"+SERVER+"_valStartAtTime", valStartAtTime);
					setTimers();
				},false);
				newdiv = createElement("div",{},newtd);
				inp = createElement("input",{id:"inputvalStartAtActivate","class":"link",type:"checkbox",checked:valStartAtActivate},newdiv);
				inp.addEventListener("click",function(){
					valStartAtActivate = this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_valStartAtActivate", valStartAtActivate);
					setTimers();
				},false);
				createElement("span",{},newdiv,texte["statBot"]["enable"]);
				
				newtr = createElement("tr",{style:"line-height:18px;"},newtable);
				newtd = createElement("td",{align:"center","style":""},newtr);
				inp = createElement("input",{id:"inputvalStartEvery","class":"link",type:"checkbox",checked:valStartEvery},newtd);
				inp.addEventListener("click",function(){
					valStartEvery = this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_valStartEvery", valStartEvery);
					setTimers();
				},false);
				inp.addEventListener("blur",function(){
					this.value = valStartEvery;
				},false);
				newtd = createElement("td",{colspan:"2"},newtr);
				newdiv = createElement("div",{},newtd);
				createElement("span",{},newdiv,texte["statBot"]["startdelay"]);
				inp = createElement("select",{id:"inputvalStartEveryTimeH","class":"link",style:"text-align:right;"},newdiv);
				for(var i=0;i<24;i++){
					createElement("option",{"value":i},inp,i+"&nbsp;"+texte["stunden"]);
				}
				inp.value = Math.floor(valStartEveryTime/(60*60));
				inp.addEventListener("change",function(){
					valStartEveryTime = (parseInt(this.value,10)*60*60) + (parseInt($("inputvalStartEveryTimeM").value,10)*60);
					GM_setValue2(LNG+"_"+SERVER+"_valStartEveryTime", valStartEveryTime);
					setTimers();
				},false);
				inp = createElement("select",{id:"inputvalStartEveryTimeM","class":"link",style:"text-align:right;"},newdiv);
				for(var i=0;i<60;i++){
					createElement("option",{"value":i},inp,i+"&nbsp;"+texte["statBot"]["minuts"]);
				}
				inp.value = (valStartEveryTime/60)%60;
				inp.addEventListener("change",function(){
					valStartEveryTime = (parseInt($("inputvalStartEveryTimeH").value,10)*60*60) + (parseInt(this.value,10)*60);
					GM_setValue2(LNG+"_"+SERVER+"_valStartEveryTime", valStartEveryTime);
					setTimers();
				},false);
				newdiv = createElement("div",{},newtd);
				inp = createElement("input",{id:"inputvalStartEveryActivate","class":"link",type:"checkbox",checked:valStartEveryActivate},newdiv);
				inp.addEventListener("click",function(){
					valStartEveryActivate = this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_valStartEveryActivate", valStartEveryActivate);
					setTimers();
				},false);
				createElement("span",{},newdiv,texte["statBot"]["enable"]);

				newtr = createElement("tr",{style:"line-height:18px;"},newtable);
				newtd = createElement("td",{align:"center","style":""},newtr);
				inp = createElement("input",{id:"inputvalDelay","class":"link",type:"text",value:valDelay,size:"5px",style:"text-align:center;background-color:transparent;"},newtd);
				inp.addEventListener("keyup",function(){
					valDelay=Math.max(MIN_VALDELAY,parseInt(this.value,10));
					GM_setValue2(LNG+"_"+SERVER+"_valDelay", valDelay);
				},false);
				inp.addEventListener("blur",function(){
					this.value = valDelay;
				},false);
				createElement("td",{colspan:"2"},newtr,texte["statBot"]["itemdelay"]);

		// *****
		
				newtr = createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,"Check category"); //TODO texte

				var help={};
				for(var v=0;v<allIds.length;v++){
					help[unsafeData.prodTyp[0][allIds[v]]]=true;
				}
				for(var v in help){
					if(!help.hasOwnProperty(v)){ continue; }
					newtr = createElement("tr",{style:"line-height:18px;"},newtable);
					newtd = createElement("td",{align:"center","style":"max-width:120px;"},newtr);
					inp = createElement("input",{"id":"inputcategory_"+v,"class":"link","type":"checkbox","checked":category[v]},newtd);
					inp.addEventListener("click",function(){
						category[this.id.replace("inputcategory_","")] = this.checked;
						GM_setValue(LNG+"_"+SERVER+"_category",implode(category,"category"));
					},false);
					createElement("td",{colspan:"2"},newtr,texte["category"][v]);
				}

		// *****

				newtr = createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,texte["statBot"]["development"]);

				newtr = createElement("tr",{style:"line-height:18px;"},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputDevmode","type":"checkbox","class":"link","checked":DEVMODE},newtd);
				newinput.addEventListener("click",function(){
					GM_setValue2("devmode",DEVMODE=this.checked);
				},false);
				createElement("td",{"colspan":"2"},newtr,"Developer Mode");//TODO texte

				createElement("div",{"colspan":"3","style":"position:absolute;right:0px;bottom:0px;size:-1;"},$("infoPanelR"),texte["statBot"]["lastrun"].replace("%1%",getDateText(timeOfLastRun,0).toLowerCase()+"&nbsp;"+getDaytimeStr(timeOfLastRun,true)));
				
				newtable=null;newtr=null;newtd=null;newdiv=null;inp=null;
			},false);//end click
		}
	},false);//end gameInfoPanelOpen

	texte = top.unsafeData.texte;
	texte["statBot"] = new Object();

	timeOfLastRun = GM_getValue(LNG+"_"+SERVER+"_timeOfLastRun",0);
	//GM_setValue(LNG+"_"+SERVER+"_timeOfLastRun2",timeOfLastRun%(24*60*60));
	valStartAt = GM_getValue(LNG+"_"+SERVER+"_valStartAt",false);
	valStartAtActivate = GM_getValue(LNG+"_"+SERVER+"_valStartAtActivate",false);
	valStartAtTime = parseInt(GM_getValue(LNG+"_"+SERVER+"_valStartAtTime",valStartAtTime),10);
	valStartEvery = GM_getValue(LNG+"_"+SERVER+"_valStartEvery",false);
	valStartEveryActivate = GM_getValue(LNG+"_"+SERVER+"_valStartEveryActivate",false);
	valStartEveryTime = parseInt(GM_getValue(LNG+"_"+SERVER+"_valStartEveryTime",valStartEveryTime),10);
	valDelay = parseInt(GM_getValue(LNG+"_"+SERVER+"_valDelay",5),10);
	category = explode(GM_getValue(LNG+"_"+SERVER+"_category"),"category",{});
	var bChanged=false;
	for(var v in INIT_category){
		if(!INIT_category.hasOwnProperty(v)){ continue; }
		if(category[v]==undefined){ category[v]=INIT_category[v];bChanged=true; }
	}
	for(var v in category){
		if(!category.hasOwnProperty(v)){ continue; }
		if(INIT_category[v]==undefined){ delete category[v];bChanged=true; }
		else if(typeof category[v]!="boolean"){ category[v]=INIT_category[v];bChanged=true; }
	}
	if(bChanged){ GM_setValue(LNG+"_"+SERVER+"_category",implode(category,"category")); }

	switch(LNG){
	case "au": case "nz": case "uk": case "us":case "ir": case "no":{
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "bu":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "de":{
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Marktplatz auslesen";
		texte["statBot"]["lese1"] = "lese...";
		texte["statBot"]["botStop"] = "Stat-Bot stoppen";
		texte["statBot"]["botStart"] = "Stat-Bot starten";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		//texte["statBot"]["itemdelay"] = "Stat-Bot Wartezeit in sek (minimal "+MIN_VALDELAY+"sek)";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "Es liegt eine neue Script-Version des Stat-Bots vor. Diese installieren?";
		texte["statBot"]["shouldUpdateBerater"] = "Du musst das Berater-Script aktualisieren!<br>Der Stat-Bot wird nicht geladen.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "dk":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "es":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "fr":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "gr":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "hu":{ // thanks to Csapajev
		texte["statBot"]["statBot"] = "Stat-Bot";  
		texte["statBot"]["lese0"] = "Piac ellenorz"+e_ac+"se";  
		texte["statBot"]["lese1"] = "Olvas"+a_ac+"s...";  
		texte["statBot"]["botStop"] = "Stop Stat-Bot";  
		texte["statBot"]["botStart"] = "Start Stat-Bot";  
		texte["statBot"]["enable"] = "Stat-Bot automatikus ind"+i_ac+"t"+a_ac+"s"+a_ac+"nak enged"+e_ac+"lyez"+e_ac+"se";  
		texte["statBot"]["starttime"] = "Stat-Bot indit"+a_ac+"sa naponta:";  
		texte["statBot"]["startdelay"] = "Stat-Bot "+u_ac+"jra ind"+i_ac+"t"+a_ac+"sa:";  
		texte["statBot"]["itemdelay"] = "V"+a_ac+"rakoz"+a_ac+"s m"+a_ac+"sodpercekben (minimal "+MIN_VALDELAY+"sek) between products";  
		texte["statBot"]["msgUpdate"] = "Stat-Bot "+o_ac+"j verzi"+o_ac+"ja megjelent. Let"+o_dots+"ltsem?";  
		texte["statBot"]["shouldUpdateBerater"] = "Ujra kell install"+a_ac+"lni a Tan"+a_ac+"csad"+o_ac+"t!<br>Stat-Bot nem indult el.";  
		texte["statBot"]["minuts"] = "m";  
		texte["statBot"]["development"] = "Fejleszt"+e_ac+"s";  
		texte["statBot"]["lastrun"] = "Utols"+o_ac+" fut"+a_ac+"s ideje: %1%";
	break;}
	case "it":{// I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "nl":{
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Lees markt";
		texte["statBot"]["lese1"] = "Lezen...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Start Stat-Bot dagelijks om:";
		texte["statBot"]["startdelay"] = "Herstart Stat-Bot elke:";
		texte["statBot"]["itemdelay"] = "Update tijd in sec. (minimaal "+MIN_VALDELAY+"sec) tussen de producten";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "min";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Voor het laatst bekeken om: %1%";
	break;}
	case "pl":{
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Sprawd"+z_ac+" ceny";
		texte["statBot"]["lese1"] = "Sprawdzam...";
		texte["statBot"]["botStop"] = "Zatrzymaj Stat-Bota";
		texte["statBot"]["botStart"] = "Startuj Stat-Bota";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		//texte["statBot"]["itemdelay"] = "Zw"+l_stroke+"oka Stat-Bota w sek (minimum "+MIN_VALDELAY+"sek)";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "ru":{ // I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "se":{ // I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	case "tr":{ // I need a translation :(
		texte["statBot"]["statBot"] = "Stat-Bot";
		texte["statBot"]["lese0"] = "Read market";
		texte["statBot"]["lese1"] = "Reading...";
		texte["statBot"]["botStop"] = "Stop Stat-Bot";
		texte["statBot"]["botStart"] = "Start Stat-Bot";
		texte["statBot"]["enable"] = "Enable automatic starting the Stat-Bot";
		texte["statBot"]["starttime"] = "Daily start Stat-Bot at:";
		texte["statBot"]["startdelay"] = "Restart Stat-Bot every:";
		texte["statBot"]["itemdelay"] = "Waiting delay in sek (minimal "+MIN_VALDELAY+"sek) between products";
		texte["statBot"]["msgUpdate"] = "There is a new script version of the Stat-Bot. Install?";
		texte["statBot"]["shouldUpdateBerater"] = "You have to update the script of the Adviser!<br>Stat-Bot is not loaded.";
		texte["statBot"]["minuts"] = "m";
		texte["statBot"]["development"] = "Development";
		texte["statBot"]["lastrun"] = "Last run at: %1%";
	break;}
	}

	// Updatecheck
	if((!unsafeData.beraterVersion)||(compareVersions(neededVersionBerater,unsafeData.beraterVersion)>0)){
		var newdiv = createElement("div",{"class":"alertbubble tbig link"},document.getElementsByTagName("body")[0],texte["statBot"]["shouldUpdateBerater"]);
		newdiv.addEventListener("click",function(){
			removeElement(this);
		},false);
		return false;
	}
	// Updatecheck, [time,version on server,last checked version]
	var updateCheck=explode(GM_getValue("updateCheck",'[0,"'+VERSION+'","'+VERSION+'"]'),"do_main/updateCheck",[0,VERSION,VERSION]);
	if(GM_getValue("valUpdate",true)&&(now-updateCheck[0]>1800)){
		showInLogBubble("Checking for update (StatBot)");
		updateCheck[0]=now;
		GM_setValue2("updateCheck",implode(updateCheck),1);
		GM_xmlhttpRequest({
			method: "GET",
			url: USO_Meta,
			onload: function(response){
				if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
					updateCheck[1]=(/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
					if(VERSION==updateCheck[1]){
						// this script is the one of the server
						updateCheck[2]=updateCheck[1];
						GM_setValue2("updateCheck",implode(updateCheck),2);
						showInLogBubble("Update Check StatBot: Script is up-to-date");
					}else if (updateCheck[1]!=updateCheck[2]){
						alert2(texte["statBot"]["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
							updateCheck[2]=updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck),3);
							window.setTimeout(function(){
								location.href=USO_Source;
							},0);
						},function(){
							updateCheck[2]=updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck),4);
						});
					}else{
						showInLogBubble("Update Check StatBot: Newer version available, but not wanted");
					}
				}else{
					showInLogBubble("Update Check StatBot failed. Bad Response: "+response.responseText);
				}
			}
		});
	}

	for (var v=0;v<unsafeData.prodBlock[0].length;v++){
		if((!unsafeData.prodBlock[0][v].match(/t/))&&(!unsafeData.prodBlock[0][v].match(/l/))){
			allIds.push(v);
		}
	}

	nodes["inputStartBot"] = createElement("button",{"id":"inputStartBot","type":"button","class":"link","style":"margin-left:3px;"},$("divSettings"));
	nodes["inputStartBot"].addEventListener("click",function(){
		if(botActive==0){
			activateBot(3);
		} else {
			deactivateBot();
		}
	},false);
	nodes["inputStartBot"].addEventListener("mouseover",function(evt){	
		showToolTip(evt,texte["statBot"]["lastrun"].replace("%1%",getDateText(timeOfLastRun,0).toLowerCase()+"&nbsp;"+getDaytimeStr(timeOfLastRun,true)));
	},false);

	nodes["inputRunOnce"] = createElement("button",{id:"inputRunOnce",class:"link msg_input",style:"margin-left:3px;"},$("divSettings"),texte["statBot"]["lese0"]);
	var help = nodes["inputRunOnce"].offsetWidth;
	for(var v=0;v<allIds.length;v++){
		nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese1"]+"&nbsp;"+unsafeData.prodName[0][allIds[v]];
		help = Math.max(help,nodes["inputRunOnce"].offsetWidth);
	}
	nodes["inputRunOnce"].style.width = help+"px";
	nodes["inputRunOnce"].innerHTML = texte["statBot"]["lese0"];
	nodes["inputRunOnce"].addEventListener("click",function(){
		if(botActive==0){
			//deactivateBot(true);
			activateBot(1);
		} else {
			startMarketReading();
		}
	},false);
	nodes["inputRunOnce"].addEventListener("mouseover",function(evt){	
		showToolTip(evt,texte["statBot"]["lese0"]+"<br>"+texte["statBot"]["lastrun"].replace("%1%",getDateText(timeOfLastRun,0).toLowerCase()+"&nbsp;"+getDaytimeStr(timeOfLastRun,true)));
	},false);

	var help = parseInt(GM_getValue(LNG+"_"+SERVER+"_botActive",0),10);
	// parseInt&isNaN will ensure that help is well-set
	if(isNaN(help)||(help<=0)){ 
		deactivateBot();
	} else {
		activateBot(help);
	}
}

// init script
window.addEventListener("load",function(){
	unsafeData.statBotVersion = VERSION;
	// Userscripts.org
	if(location.href==USO_Home){
		var uso_version=/<p><b>Version:<\/b>(\d+\.\d+\.\d+)<\/p>/gi.exec($("summary").innerHTML.replace(/\s/gi,""))[1];
		if(compareVersions(uso_version,VERSION)<1){
			$("install_script").firstElementChild.innerHTML="Already installed";
		}else{
			$("install_script").firstElementChild.innerHTML="Update ("+VERSION+"&nbsp;&rarr;&nbsp;"+uso_version+")";
		}
		return false;
	}
	
	if(unsafeData.beraterDone){
		do_main();
	} else {
		document.addEventListener("beraterDone",function(){
			do_main();
			document.removeEventListener("beraterDone",arguments.callee,false);
		},false);
	}
},false);
window.addEventListener("unload",function(){
	try{window.clearInterval(restartTimer);}catch(err){}
},false);