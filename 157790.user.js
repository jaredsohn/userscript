// ==UserScript==
// @name           MyFreeFarm Automat
// @namespace      http://userscripts.org/scripts/show/70238
// @updateURL      about:blank
// @description    Extends MyFreeFarm
// @date           02.02.2013
// @version        1.5.19
// @include        http://userscripts.org/scripts/show/70238
// @include        http://myfreefarm.*
// @include        http://wolnifarmerzy.pl*
// @include        http://mabelleferme.fr*
// @include        http://enkicsitanyam.hu*
// @include        http://tr.myfreefarm.com*
// @include        http://veselaferma.com*
// @include        http://fermavesela.ro*
// @include        http://mojaderewnja.ru*
// @include        http://migranjalinda.es*
// @include        http://*.myfreefarm.*
// @include        http://*.wolnifarmerzy.pl*
// @include        http://*.mabelleferme.fr*
// @include        http://*.enkicsitanyam.hu*
// @include        http://*.tr.myfreefarm.com*
// @include        http://*.pt.myfreefarm.com*
// @include        http://*.veselaferma.com*
// @include        http://*.fermavesela.ro*
// @include        http://*.mojaderewnja.ru*
// @include        http://*.migranjalinda.es*
// @exclude        http://*forum.*
// @exclude        http://*board.*
// @exclude        http://*farmpedia.*
// @exclude        http://*/dyn_bubbles.php*
// @exclude        http://*/login_inc.php*
// @exclude        http://*/stadt/*
// @exclude        http://*/nachrichten/*
// @exclude        http://*/vertraege/*
// @exclude        http://*/nutzer/*
// @exclude        http://*/payment/*
// @exclude        http://*facebook.com/*
// @exclude        http://*myfreefarm.pytalhost.com/*
// @grant          GM_addStyle
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_log
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @require        http://userscripts.org/scripts/source/94946.user.js
// ==/UserScript==
// GM_log("Run Code Automat :"+location.href);

const VERSION="1.5.19";
// 1.2 Rack-mode queues
// 1.3 Zone pairing
// 1.4 Firefox 4
const neededVersionBerater="1.4.53";
const neededVersionFunctionFile="1.0.37";
const USO_ID    ="70238";
const USO_Home  ="http://userscripts.org/scripts/show/"+USO_ID; //GM_info["script"]["namespace"]
const USO_Source="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
const USO_Meta  ="http://userscripts.org/scripts/source/"+USO_ID+".meta.js";
if(NEVER==undefined){
	alert("Hi, I am the Automaton-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href=USO_Source;
}else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the Automaton-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href=USO_Source;
}
var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_FUNCTION=GM_getValue("devmode_function",false);
const LOGGING_ARBITER=false;
const PRODSTOP=-1;
const PRODSTOPold=66; // TODO remove
const MILLSTOPold=0; // TODO remove
const ExtendedListCHAR="l";
var extendedListReg=/^l(\d+)$/;
const REPEAT_NO_LIMIT=-1;
const REPEAT_RESTART=0;
const OPTION_ITEM_REPEAT=false;	// should be OPTION_LIST_REPEAT=!OPTION_ITEM_REPEAT, But is not needed
const OPTION_LIST_REPEAT=true;  // should be OPTION_LIST_REPEAT=!OPTION_ITEM_REPEAT, But is not needed
const DEFAULT_ZONELIST_ITEM=[PRODSTOP,0,0,false,false,REPEAT_NO_LIMIT];// ["prodId","AmntToDo","AmntToGo","rackMode","mode","AmntToRepeat"] //mode=Field,Rack,Time,Repeat
const DEFAULT_ZONELIST_ITEM_ARRAY=[DEFAULT_ZONELIST_ITEM];
const DEFAULT_ZONELIST_ITEM_ARRAY2=[DEFAULT_ZONELIST_ITEM,DEFAULT_ZONELIST_ITEM];
const DEFAULT_ZONELIST_MILL=[PRODSTOP,0,0,0,[]]; // {"pId":PRODSTOP,"AmntTodo":0,"AmntMax":0,"AmntItem":[]}
const DEFAULT_ZONELIST_MILL_ARRAY=[DEFAULT_ZONELIST_MILL];

const _TEXTE_STOP="----";
const row1=2;const row2=21;const row3=38;const row4=55;const row5=72;const row6=89;const row7=108;
const col1=2;const col2=21;const col3=40;const col4=55;
 
var strImages=new Object();
const BUILDING2FEED=[,,[1,2],[3,4],[5,6],[7,8],,[9,21],[10,110],[11,151],[12],[92,93],[108,109],,,[153,154]]; // task_new_product
const FEEDBONUSTIME={"1":600,"2":1200,"3":900,"4":1800,"5":2400,"6":4800,"7":4800,"8":9600,"92":14400,"93":28800,"108":3600,"109":1800,"153":1560,"154":3120};//in sek  // task_new_product
const CROPCOST={"13":2.5,"14":180,"15":30,"16":500};

var valBot=false;
var busy=false;
var busy_action="";
var autoRunId=0;
var linecount=0;
var handled=new Object();
const queueItemBoxWidth=58;
const queueItemBoxTimeHeight=28;
const STEPPINGRACK=100;
const STEPPINGFIELD=1;

var zoneList=new Object(); // zoneList[zoneNrL][queueNum]=DEFAULT_ZONELIST_ITEM
var zoneToList=new Object();
var emergencyPlants=new Array();
var zoneWaiting=new Object();
var zoneSettings=new Object();
var autoMillStorage=new Object();
var valUseMillBot=null;
var valUseBot=new Object();
var valAutoPflanz=null;
var valAutoFutter=null;
var valSeedWaitForCrop=null;
var valDisableCropFields=null;
var valWater=null;
var valUseQueueList=null;
var valShowQueueTime=null;
var viewOverViewFarms=null;
var valPowerUpActivate=null;
var valLotteryActivate=null;
var valLotteryDailyLot=null;
/* quest-bot needs review
var valQuestActivate=null;
var valQuestActivateUntilNr=null;
var valQuestSolving= null;
var valQuestSolvingUntilNr=null;
var valLodgeQuestSolving=null;
*/
var valFarmiReject=null;
var valFarmiRejectUntilNr=null;
var valFarmiAccept=null;
var valFarmiAcceptAboveNr=null;
var valFarmiAcceptBelowMinValue=null;
var valFarmiRemoveMissing=null;
var valFarmiRemoveMissingAboveNr=null;
var automatStarted=unsafeData.automatStarted=false;
var zoneTimeline=new Object();

const CLOSETIME=180;
const RAISETIME=2; //seconds
const OpenWindow={"all":["multiframe","divQueueBox","divChooseBox","infoPanel","friendscontainer","guildmaincontainer","createguildbox","reallocateBuildingContainer"],"farm":["farmhousecontainer"],"city1":["cart","shop","shopframe","animaldealer","wbwcontainer","adcolumn"],"city2":["lotterycontainer","fishpoolinner","formuladealer","windmillinner","collectorscontainer"]};
// const MenuCommand=["rackElement","racksortinfo","userfarminfos","locationinfo","buildinginfos","windmillinfo","formulas","powerupcontent","produkt_name","garten_kategorie","garten_zeit","garten_prod","_currRack","cityzones","punkte","zoneSettings","zoneList","autoMillStorage","GMzoneBonus","prodName","prodNameSort","prodTyp","GMprodBlock","GMgut","GMzoneEndTimes","prodGrowTime","GMzoneErnte","GMwindmillRecipe","GMcurrentPowerup","GMzoneEndTimes","zoneEndProducts","GMzoneWaterTimes","GMzoneFieldData","zoneTyp","zoneToList","produkt_ernte","produkt_x","produkt_y","GMprodMinRack","GMzoneAnimals","produkt_category","produkt_level","zoneBlock","GMstatBotpreisBeob","GMstatBotgutBeob","guildquestlist_level","userquests","unsolvedquests","QUESTS","readyZone","lotteryprizes","lotrack","GMzoneBonusSpecialAmount","GMzoneBonusSpecialProduct","now","GMquestState","city","farm","farmisinfo","zoneWaiting","GMquestNr","forestry_production_run","forestry_production_time","forestry_action","forestry_area_run","forestry_area_time","forestry_area_watertime","forestry_area_name","forestry_area_pid","forestry_stock","forestry_production_products","forestry_farmis","forestry_area","forestry_cache_area","forestry_waterall_cost","forestry_quests","forestry_quicknavi","forestry_user_buildings","forestry_questdelay_run","forestry_questdelay_time","forestry_unlock","forestry_slots","forestry_run","forestry_remain","forestry_slotrun","forestry_slotremain","currentslot","ftimer","fremains"];
const MenuCommand=["_currRack","autoMillStorage","buildinginfos","city","cityzones","currentslot","farm","farmamount","farmisinfo","farmisaway","forestry_action","forestry_area","forestry_area_name","forestry_area_pid","forestry_area_run","forestry_area_time","forestry_area_watertime","forestry_cache_area","forestry_farmis","forestry_production_products","forestry_production_run","forestry_production_time","forestry_questdelay_run","forestry_questdelay_time","forestry_quests","forestry_quicknavi","forestry_remain","forestry_run","forestry_slotremain","forestry_slotrun","forestry_slots","forestry_stock","forestry_unlock","forestry_user_buildings","forestry_waterall_cost","formulas","fremains","ftimer","garten_kategorie","garten_prod","garten_zeit","GMberaterDone","GMberaterVersion","GMbotConfigData","GMcalcToLodgeCampaignNr","GMcalcToLodgeQuestNr","GMcalcToQuestNr","GMcurrentPowerup","GMguid","GMgut","GMlodgeCampaignNr","GMlodgeQuestData","GMlodgeQuestNr","GMlodgeTimeEnd","GMlotteryCollectForPrize","GMnpcSaison","GMpreisBeob","GMprodBlock","GMprodGrowTime","GMprodMinRack","GMprodMinRackInit","GMprodMinRackSettings","prodName","prodNameSort","GMprodPlantSize","GMprodRequire","prodStock","prodTyp","prodYield","GMquestNr","GMquestState","readyZone","reallocateBuildingSet","GMsetCalcToLodgeQuest","GMsetCalcToQuest","GMstatBotgutBeob","GMstatBotpreisBeob","GMstatBotVersion","GMusername","GMvalFarmiLimits","GMzoneAddToGlobalTime","GMzoneAnimals","GMzoneBlock","GMzoneBonus","GMzoneBonusSpecialAmount","GMzoneBonusSpecialProduct","zoneEndProducts","GMzoneEndTimes","GMzoneErnte","zoneProductionData","GMzoneMainProd","zoneTyp","GMzoneWaterTimes","guildquestlist_level","locationinfo","lotrack","lotteryprizes","now","powerupcontent","produkt_category","produkt_ernte","produkt_level","produkt_name","produkt_x","produkt_y","punkte","QUESTS","rackElement","racksortinfo","unsolvedquests","userfarminfos","userquests","windmillinfo","zoneList","zoneSettings","zoneToList","zoneWaiting"];

var botArbiterStack=new Object();
var botArbiterInterval=null;
var botArbiterIntervalBusy=false;
function botArbiterAdd(evt){
try{
	if(LOGGING_ARBITER){ GM_log("botArbiterAdd evt="+evt+" valBot="+valBot); }
	var priority,fkt=null;
	switch(evt){
	case "sessionEnds":    priority=999;fkt=doGameSessionEnds;	break;
	case "farm":           priority= 30;fkt=autoFarm;			break;
	case "windmill":       priority= 20;fkt=autoWindmill;		break;
	case "forestry":       priority= 10;fkt=autoForestry;		break;
	case "lottery":        priority=  5;fkt=autoLottery;        break;
	case "activatePowerUp":priority=  5;fkt=autoActivatePowerUp;break;
	case "farmi":          priority=  5;fkt=autoFarmi;          break;
	// case "quest":          priority=  5;fkt=autoActivateQuest;	break;
	// case "lodgeQuest":     priority=  5;fkt=autoActivateLodgeQuest;break;
	case "otherAccReady":  priority=  1;fkt=doGameOtherAccReady;break;
	}	
	if(!valBot){
		GM_log("WARNING botArbiterAdd evt="+evt+": Bot is off!");
	}else if(fkt==null){
		GM_log("WARNING botArbiterAdd evt="+evt+": No bot-function!");
	}else{
		if(botArbiterIntervalBusy){
			window.setTimeout(botArbiterAdd,100,evt);
		}else{
			botArbiterStack[evt]=[priority,fkt];
			window.setTimeout(botArbiterRun,100);
		}
	}
}catch(err){ GM_log("ERROR botArbiterAdd evt="+evt+"\n"+err); }
}
function botArbiterClear(evt){
	if(LOGGING_ARBITER){ GM_log("BEGIN botArbiterClear evt="+evt+" botArbiterIntervalBusy="+botArbiterIntervalBusy); }
	if(botArbiterStack[evt]){
		if(botArbiterIntervalBusy){
			window.setTimeout(botArbiterClear,100,evt);
			// window.setTimeout(function(){
			// 	botArbiterClear(evt);
			// },100);
		}else{
			delete botArbiterStack[evt];
		}
	}
	if(LOGGING_ARBITER){ GM_log("END botArbiterClear botArbiterStack="+implode(botArbiterStack)); }
}
function botArbiterRun(){
	// GM_log("botArbiterRun "+botArbiterInterval+":"+valBot);
	if(botArbiterInterval||(!valBot)){ return false; }
	botArbiterInterval=window.setInterval(function (){
		// GM_log("botArbiterStack="+implode(botArbiterStack));
		botArbiterIntervalBusy=true;
		// showInLogBubble(""+"botArbiterStack="+implode(botArbiterStack));		
		//if(LOGGING_ARBITER){ GM_log("botArbiterInterval, busy:"+busy+" zoneWaiting:"+implode(zoneWaiting)+" botArbiterStack:"+implode(botArbiterStack)); }
		//if(LOGGING_ARBITER){ GM_log("botArbiterInterval, busy:"+busy+" zoneWaiting:"+implode(zoneWaiting)+" botArbiterStack:"+print_r(botArbiterStack)); }
		try{
			if(LOGGING_ARBITER){ GM_log("botArbiterInterval botArbiterStack="+implode(botArbiterStack)+" readyZone="+implode(unsafeData.readyZone)); }
			if(valBot&&(!busy)&&checkOpenWindow()){
				var found=null;
				var count=0;
				for(evt in botArbiterStack){
					if(!botArbiterStack.hasOwnProperty(evt)){ continue; }
					count++;
					if((found==null)||(botArbiterStack[found][0]<botArbiterStack[evt][0])){
						found=evt;
					}
				}
				if(LOGGING_ARBITER){ GM_log("botArbiterInterval found="+found); }
				if(found){
					startBot();
					botArbiterStack[found][1](autoRunId); // call bot function
					delete botArbiterStack[found];
					count--;
				}
				if(count==0){
					try{ window.clearInterval(botArbiterInterval); }catch(err){}
					botArbiterInterval=null;
				}
			}
		}catch(err){GM_log("ERROR botArbiterInterval \n"+err);}
		botArbiterIntervalBusy=false;
	},RAISETIME*1000);
}
function botArbiterStop(){ //TODO the bot is not deactivated until the timer is runS out .. after that the buttoN should change.. inbetween it should have a inbetween state.
	if(LOGGING_ARBITER){ GM_log("BEGIN botArbiterStop valBot:"+valBot); }
	if(botArbiterIntervalBusy){
		window.setTimeout(botArbiterStop,100);
		// window.setTimeout(function(){
		// 	botArbiterStop();
		// },100);
	}else{
		botArbiterStack=new Object();
		try{ window.clearInterval(botArbiterInterval); }catch(err){}
		botArbiterInterval=null;
	}
}
function botArbiterCheck(){
	if(LOGGING_ARBITER){GM_log("BEGIN botArbiterCheck");}
	// Testing for actions to do
	try{
		botArbiterStop();
		if(valBot){
			if($("divSessionEnd")){
				botArbiterAdd("sessionEnds");
			}
			checkReadyZone(); // farm, windmill, forestry
			if(valUseBot["farmi"]&&unsafeWindow.farmisinfo && unsafeWindow.farmisinfo[0] && (valFarmiReject || valFarmiAccept)){
				checkFarmi(1);
			}
			if(valUseBot["lottery"]&&valLotteryActivate&&$("divGoToLottery")){
				botArbiterAdd("lottery");
			}
			var cell;
			if(valUseBot["windmill"]){
				if(checkPowerUp(1)){
					botArbiterAdd("activatePowerUp");
				}
			}
			cell=null;
			/* quest-bot needs review
			if(valUseBot["quest"]&&unsafeData.questData["farm"]["1"]["state"]){
				if(unsafeData.questData["farm"]["1"]["state"]==1 && valQuestActivate && valQuestActivateUntilNr>=unsafeData.questData["farm"]["1"]["nr"]){
					botArbiterAdd("quest");
				}else if(unsafeData.questData["farm"]["1"]["state"]==2 && valQuestSolving && valQuestSolvingUntilNr>=unsafeData.questData["farm"]["1"]["nr"] && checkQuest()){
					botArbiterAdd("quest");
				}
			}
			if(valUseBot["quest"]&&valLodgeQuestSolving&&checkLodgeQuest()){
				botArbiterAdd("lodgeQuest");
			}
			*/
			if($("linkOtherAccReady")){
				botArbiterAdd("otherAccReady");
			}
		}
	}catch(err){GM_log("ERROR botArbiterCheck\n"+err);}
	if(LOGGING_ARBITER){GM_log("End botArbiterCheck");}
}

var closeWindowTimer=null;
var closeWindowTime=CLOSETIME;
var openWindows=null;
function startCloseWindowTimer(){
	var divCWL=$("divCloseWindowLayer");
	if(divCWL.style.display!="block"){ divCWL.style.display="block"; }
	var divCW=$("divCloseWindow");
	if(divCW.style.display!="block"){ divCW.style.display="block"; }
	var cell=$("divBotInfo");
	if(cell.style.display!="block"){ cell.style.display="block"; }
	if(cell.innerHTML!="Busy:"+busy_action){ cell.innerHTML="Busy:"+busy_action; }
	if(!busy){
		// GM_log("startCloseWindowTimer ");
		if(--closeWindowTime>0 && !checkOpenWindow(true)){
			//-- GM_log("startCloseWindowTimer closeWindowTime:"+closeWindowTime);
			cell.innerHTML +="<br>" + texte["automat"]["CloseWindowTimer"].replace("%1%",getTimeStr(closeWindowTime));
			divCW.innerHTML=texte["automat"]["CloseWindowTimer"].replace("%1%", getTimeStr(closeWindowTime)) + "<br>" + texte["automat"]["CloseWindowTimerClick"] + (DEVMODE?"<br>OpenWindows: "+openWindows:"");
			if(!closeWindowTimer) closeWindowTimer=window.setInterval(startCloseWindowTimer,1000);
		}else{
			//-- GM_log("closingEventTimer closeWindowTime:"+closeWindowTime);
			if($("multiframe").style.display=="block"){
				click($("multiframe").contentDocument.getElementsByClassName("link2")[0].firstElementChild);
			}else if($("divQueueBox").style.display=="block"){
				click($("divQueueBoxClose"));
			}else if($("divChooseBox").style.display=="block"){
				click($("divChooseBoxClose"));
			}else if($("infoPanel").style.display=="block"){
				click($("infoPanelClose"));
			}else if($("friendscontainer").style.display=="block"){
				click($("friendsclose").getElementsByClassName("link")[0]);
			}else if($("guildmaincontainer").style.display=="block"){
				click($("cancelscreen2").getElementsByClassName("link")[0]);
			}else if($("reallocateBuildingContainer").style.display=="block"){
				click($("reallocateBuildingContainerHeader").getElementsByClassName("link")[0]);
			}else if($("farmhousecontainer").style.display=="block"){
				click($("fhclose").getElementsByClassName("link")[0]);
			}else if($("cart").style.display=="block"){
				unsafeWindow.clearCart();
			}else if($("shop").style.display=="block"){
				$('transp3').style.display='none';
				$('shopframe').src='';
				$('shop').style.display='none';
				//click($("shopframe").contentDocument.getElementsByClassName("link2")[0].firstElementChild);
			}else if($("shopframe").style.display=="block"){
				$('transp3').style.display='none';
				$('shopframe').src='';
				$('shop').style.display='none';
				//click($("shopframe").contentDocument.getElementsByClassName("link2")[0].firstElementChild);
			}else if($("animaldealer").style.display=="block"){
				click($("animaldealerheader").getElementsByClassName("link")[0]);
			}else if($("wbwcontainer").style.display=="block"){//competitie
				click($("wbwhead").getElementsByClassName("link")[0]);
			}else if($("adcolumn").style.display=="block"){
				click($("adcolumnheader").getElementsByClassName("link")[0]);
			}else if($("lotterycontainer").style.display=="block"){
				click($("lotteryhead").getElementsByClassName("link")[0]);
			}else if($("fishpoolinner").style.display=="block"){
				click($("fishpoolheader").getElementsByClassName("link")[0]);
			}else if($("formuladealer").style.display=="block"){
				click($("formuladealerheader").getElementsByClassName("link")[0]);
			}else if($("windmillinner").style.display=="block"){
				click($("windmillheader").getElementsByClassName("link")[0]);
			}else if($("collectorscontainer").style.display=="block"){
				 click($("collectorshead").getElementsByClassName("link")[0]);
			}
			botArbiterRun();
			stopCloseWindowTimer();
		}
	}else{
		stopCloseWindowTimer();
	}
	cell=null;
}
function stopCloseWindowTimer(){
	try{
		if(DEVMODE_FUNCTION){GM_log("Begin stopCloseWindowTimer "+ closeWindowTimer);}
		try{ window.clearInterval(closeWindowTimer); }catch(err){}
		closeWindowTimer=null;
		closeWindowTime=CLOSETIME;
		if($("divCloseWindowLayer")){ $("divCloseWindowLayer").style.display="none";}
		if($("divCloseWindow")){ $("divCloseWindow").style.display="none";}
		if(DEVMODE_FUNCTION){GM_log("End stopCloseWindowTimer "+ closeWindowTimer);}
	}catch(err){GM_log("ERROR stopCloseWindowTimer \n"+err);}
}

function checkOpenWindow(justcheck){
try{
	var allWinClosed=true;
	openWindows="";
	if(DEVMODE_FUNCTION){GM_log("Begin checkOpenWindow automatStarted:"+automatStarted+" busy:"+busy+" closeWindowTimer:"+closeWindowTimer); }
	if(automatStarted&&!busy){
		for(var ctn in OpenWindow){
			if(!OpenWindow.hasOwnProperty(ctn)){ ctn=null;continue; }
			if(ctn=="all"||(ctn=="farm"&&unsafeWindow.farm!="")||(ctn=="city1"&&unsafeWindow.city==1)||(ctn=="city2"&&unsafeWindow.city==2)){
				for(var wn in OpenWindow[ctn]){
					// if(!OpenWindow[ctn].hasOwnProperty(wn)){ ctn=null;continue; }
					if(typeof OpenWindow[ctn][wn]=="function"){ wn=null;continue; }
					if($(OpenWindow[ctn][wn]) && $(OpenWindow[ctn][wn]).style.display=="block"){
						openWindows +=(openWindows!=""?", ":"") + OpenWindow[ctn][wn];
						//if(DEVMODE){ GM_log("Container:"+ctn+" Window:"+OpenWindow[ctn][wn]+" is open"+(justcheck?" (checking)":" (timer)")); }
						allWinClosed=false;
					}
				}
			}
		}
		if(justcheck===true){ return allWinClosed; }
		if(allWinClosed){
			if(closeWindowTimer&&!justcheck){
				//-- GM_log("checkOpenWindow 1");
				stopCloseWindowTimer();
			}
			return true;
		}else if(!closeWindowTimer&&!justcheck){ //garden can be open for eve
			//-- GM_log("checkOpenWindow 2");
			startCloseWindowTimer();
		}
	}else if(busy&&closeWindowTimer&&!justcheck){
		//-- GM_log("checkOpenWindow 3");
		stopCloseWindowTimer();
	}
	return false;
}catch(err){GM_log("ERROR checkOpenWindow ctn:"+ctn+" wn:"+wn+" \n"+err);}
}
function getFarmZoneBonus(zoneNr,product){
	if(DEVMODE_FUNCTION){GM_log("Begin getFarmZoneBonus zoneNr:"+zoneNr+" product:"+product);}
	var bonus=1;
	try{
		var zoneNrF=zoneNr.toString().replace(/\.\d+$/,"");
		if(!!unsafeData.zoneBonusSpecialProduct[zoneNrF] && unsafeData.zoneBonusSpecialProduct[zoneNrF]==product){
			bonus -=unsafeData.zoneBonusSpecialAmount[zoneNrF]/100;
		}
		if(unsafeData.zoneBonus[zoneNrF]){
			bonus -=unsafeData.zoneBonus[zoneNrF]/100;
		}
	}catch(err){
		GM_log("ERROR getFarmZoneBonus \n"+err);
		if(Math.ceil(zoneNrF/6)==parseInt(unsafeWindow.farm,10)){
			if(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["specialwaterbonus"][0]==product){
				bonus=1 - parseInt(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["specialwaterbonus"][1],10)/100;
			}else if(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["waterbonus"]){
				bonus=1 - parseInt(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["waterbonus"],10)/100;
			}else if(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["time"]){
				bonus=1 - parseInt(unsafeWindow.userfarminfos[Math.ceil(zoneNrF/6)][getGarden(zoneNrF)]["time"],10)/100;
			}
		}
	}
	if(DEVMODE_FUNCTION){GM_log("Begin getFarmZoneBonus zoneNrF:"+zoneNrF+" product:"+product+" bonus:"+bonus);}
	return bonus;
}
function getLowestTimeFarmZone(timeTable){
	if(DEVMODE_FUNCTION){GM_log("Begin getLowestTimeFarmZone:" + implode(timeTable,"getLowestTimeFarmZone/timeTable"));}
	for(var i in timeTable){
		if(!timeTable.hasOwnProperty(i)){ continue; }
		if(zoneNrF==undefined) var zoneNrF=i;
		if(timeTable[i] < timeTable[zoneNrF]){
			zoneNrF=i;
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End getLowestTimeFarmZone:" + zoneNrF);}
	return zoneNrF;
}
function getHighestTimeFarmZone(timeTable){
	if(DEVMODE_FUNCTION){GM_log("Begin getHighestTimeFarmZone:" + zoneNrF);}
	for(var i in timeTable){
		if(!timeTable.hasOwnProperty(i)){ continue; }
		if(zoneNrF==undefined) var zoneNrF=i;
		if(timeTable[i] > timeTable[zoneNrF]){
			zoneNrF=i;
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End getHighestTimeFarmZone:" + zoneNrF);}
	return zoneNrF;
}

String.prototype.count=function(match){
	var res=this.match(new RegExp(match,"g"));
	if(res==null){ return 0; }
	return res.length;
};
String.prototype.repeat=function(num){
	 return new Array(num+1).join(this);
};
String.prototype.leftPad=function(len, str){
	return (new Array(len - this.length + 1)).join(str).concat(this);
};
String.prototype.replaceArray=function(arr){
	if(typeof arr!="object") throw("Argument not a Object or Array :" + typeof arr +"<br>");
	// if(!(arr instanceof Array)) throw("Argument not a Array :" + typeof arr +"<br>");
	var val=this;
	for(var key in arr){
		if(!arr.hasOwnProperty(key)){ continue; }
		// GM_log("replace :" + key + " with : " + arr[key] + " : " + val);
		val=val.replace(new RegExp("%"+key+"%","gi"),arr[key]);
	}
	return val;
};
String.prototype.toTitleCase=function(){
	return this.toLowerCase().replace(/^./, this.match(/^./)[0].toUpperCase());
};

Object.prototype.allEqual=function(){
	var equal=true, num=null;
	for(var key in this){
		if(!this.hasOwnProperty(key)){ continue; }
		// GM_log("prototype.average key: " + key + " num: " + this[key] + " tot: " + total + " len: " + len);
		if( typeof this[key]=="number"){
			if(num!=this[key] && num!=null){
				equal=false;
				break;
			}
			num=this[key];
		}
	}
	return equal;
};
Object.prototype.average=function(){
	var total=0, len=0;
	for(var key in this){
		if(!this.hasOwnProperty(key)){ continue; }
		// GM_log("prototype.average key: " + key + " num: " + this[key] + " tot: " + total + " len: " + len);
		if( typeof this[key]=="number"){
			total +=this[key];
			len++;
		}
	}
	return total/len;
};
Object.prototype.averageFieldTime=function(amount){
	var total=0, len=0;
	for(var key in this){
		if(!this.hasOwnProperty(key)){ continue; }
		if( typeof this[key]=="number"){
			// GM_log("prototype.averageFieldTime key: " + key + " num: " + this[key] + " tot: " + total + " len: " + len);
			total +=this[key];
			len++;
		}
	}
	// GM_log("End prototype.averageFieldTime tot: " + total + " amount: " + amount + " len: " + len);
	return (total*amount)/(len*len);
};

function calcDauer(dauer,bonus){ //dauer in sek, bonus zB 0.85
	var gesamtdauer=0;
	while(dauer>0){
		dauer *=bonus;
		help=Math.min(dauer,86400);
		dauer -=help;
		gesamtdauer +=help;
	}
	return gesamtdauer;
}
function calcProductScore(product, zoneNrF, amount, endtime){
	if(DEVMODE_FUNCTION){GM_log("Begin calcScoreAmount: product:"+product+" zoneNrF:"+zoneNrF+" amount:"+amount);}
	switch(getBuildingTyp(zoneNrF)){
	case "windmill":
		return unsafeData.prodPoints[3][product];
	break;
	case "sawmill":case "carpentry":
		if(amount==null || amount==undefined){ amount=1; }
		return unsafeData.prodPoints[1][product]*amount;
	break;
	case "forest":
		if(amount==null || amount==undefined){ amount=calcProductPositions(product, zoneNrF); }
		return unsafeData.prodPoints[1][product]*amount;
	break;
	case 1:
		if(amount==null || amount==undefined) amount=calcProductPositions(product, zoneNrF);
		if(unsafeData.currentPowerup && unsafeData.currentPowerup[product] && unsafeData.currentPowerup[product][0] > (endtime==null?now:endtime)){
			return (unsafeData.prodPoints[0][product]+unsafeData.currentPowerup[product][2])*amount;
		}else{
			return unsafeData.prodPoints[0][product]*amount;
		}
	break;
	case 2:
		if(amount==null || amount==undefined) amount=unsafeData.zoneAnimals[zoneNrF] * unsafeData.prodYield[0][product];
		return unsafeData.prodPoints[0][product]*amount;
	break;
	case 3:
		if(amount==null || amount==undefined) amount=unsafeData.prodYield[0][product];
		return unsafeData.prodPoints[0][product]*amount;
	break;
	default:
		GM_log("WARNING calcProductScore returns 0\nproduct="+product+" zoneNrF="+zoneNrF+" amount="+amount+" endtime="+endtime);
		return 0;
	}
}
function calcProductAmount(product, zoneNrF, amount, endtime, minPlanted){
	if(DEVMODE_FUNCTION){GM_log("Begin calcProductAmount: product:"+product+" zoneNrF:"+zoneNrF+" amount:"+amount+" endtime:"+endtime+" minPlanted:"+minPlanted);}
	switch(getBuildingTyp(zoneNrF)){
	case "windmill":
		return 1;
	break;
	case "sawmill":case "carpentry":
		if(amount==null || amount==undefined){ amount=1; }
		return unsafeData.prodYield[1][product]*amount;
	break;
	case "forest":
		if(amount==null || amount==undefined){ amount=calcProductPositions(product, zoneNrF); }
		return unsafeData.prodYield[1][product]*amount; //no minPlanted because planted is other product.
	break;
	case 1:
		if(amount==null || amount==undefined){ amount=calcProductPositions(product, zoneNrF); }
		if(unsafeData.currentPowerup && unsafeData.currentPowerup[product] && unsafeData.currentPowerup[product][0] > ((endtime==null||endtime==undefined)?now:endtime)){
			return (unsafeData.prodYield[0][product]-(minPlanted?1:0)+unsafeData.currentPowerup[product][1])*amount;
		}else{
			return (unsafeData.prodYield[0][product]-(minPlanted?1:0))*amount;
		}
	break;
	case 2:
		return unsafeData.zoneAnimals[zoneNrF] * unsafeData.prodYield[0][product];
	break;
	case 3:
		return unsafeData.prodYield[0][product];
	break;
	default: 
		GM_log("WARNING calcProductScore returns 0\nproduct="+product+" zoneNrF="+zoneNrF+" amount="+amount+" endtime="+endtime);
		return 0;
	}
}
function calcEmptyProductPositions(product, zoneNrF){
	var returnn=0;
	if(getBuildingTyp(zoneNrF)==1){
		var size=unsafeData.prodPlantSize[0][product];
		if(unsafeData.zoneProductionData && unsafeData.zoneProductionData[zoneNrF]){
			if(unsafeData.zoneProductionData[zoneNrF][1] && !isNaN(unsafeData.zoneProductionData[zoneNrF][1][size])){
				returnn=unsafeData.zoneProductionData[zoneNrF][1][size];
			}else{
				returnn=120/size;
			}
			if(DEVMODE&&!unsafeData.zoneProductionData[zoneNrF][3]){
				GM_log("calcEmptyProductPositions OLD DATA: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);
			}
		}
	}else if(isNaN(zoneNrF)){
		var size=unsafeData.prodPlantSize[1][product];
		if(unsafeData.zoneProductionData && unsafeData.zoneProductionData[zoneNrF]){
			if(unsafeData.zoneProductionData[zoneNrF][1] && !isNaN(unsafeData.zoneProductionData[zoneNrF][1][size])){
				returnn=unsafeData.zoneProductionData[zoneNrF][1][size];
			}
			if(DEVMODE&&!unsafeData.zoneProductionData[zoneNrF][3]){
				GM_log("calcEmptyProductPositions OLD DATA: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);
			}
		}
	}
	if(DEVMODE_FUNCTION){ GM_log("calcEmptyProductPositions: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);}
	return returnn;
}
function calcProductPositions(product, zoneNrF){
	var returnn=1;
	if(getBuildingTyp(zoneNrF)==1){
		var size=unsafeData.prodPlantSize[0][product];
		if(unsafeData.zoneProductionData && unsafeData.zoneProductionData[zoneNrF]){
			if(unsafeData.zoneProductionData[zoneNrF][2] && !isNaN(unsafeData.zoneProductionData[zoneNrF][2][size])){
				returnn=unsafeData.zoneProductionData[zoneNrF][2][size];
			}else{
				returnn=120/size;
			}
			if(DEVMODE&&!unsafeData.zoneProductionData[zoneNrF][3]){
				GM_log("calcProductPositions OLD DATA: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);
			}
		}
	}else if(isNaN(zoneNrF)){
		if(unsafeData.zoneProductionData && unsafeData.zoneProductionData[zoneNrF]){
			// var size=unsafeData.prodPlantSize[1][product];
			if(unsafeData.zoneProductionData[zoneNrF][2] && !isNaN(unsafeData.zoneProductionData[zoneNrF][2])){
				returnn=unsafeData.zoneProductionData[zoneNrF][2];
			}

			if(DEVMODE&&!unsafeData.zoneProductionData[zoneNrF][3]){
				GM_log("calcProductPositions OLD DATA: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);
			}
		}
	}
	// GM_log("calcProductPositions: zoneNrF:"+zoneNrF+" product:"+product+" return:"+returnn);
	return returnn;
}
function calcInGameProductAmountOnField(product, zoneNrF, endtime){
	try{
		var iBase=0;
		if(unsafeData.zoneProductionData && unsafeData.zoneProductionData[zoneNrF]){
			if(unsafeData.zoneProductionData[zoneNrF][0][0][product]){
				for(var i in unsafeData.zoneProductionData[zoneNrF][0][0][product]){
					if(!unsafeData.zoneProductionData[zoneNrF][0][0][product].hasOwnProperty(i)){ continue; }
					if(endtime==undefined || endtime==null || unsafeData.zoneProductionData[zoneNrF][0][0][product][i][1]<=endtime){
						iBase +=calcProductAmount(product,zoneNrF,unsafeData.zoneProductionData[zoneNrF][0][0][product][i][0],unsafeData.zoneProductionData[zoneNrF][0][0][product][i][1],false);
					}
				}
			}
			if(DEVMODE&&!unsafeData.zoneProductionData[zoneNrF][3]){
				GM_log("calcInGameProductAmountOnField OLD DATA: zoneNrF:"+zoneNrF+" product:"+product+" endtime:"+endtime+" return:"+iBase);
			}
		}
		return iBase;
	}catch(err){ GM_log("ERROR calcInGameProductAmountOnField product="+product+" zoneNrF="+zoneNrF+" endtime="+endtime+"\n"+err);return 0; }
}
function calcInGameProductAmount(product, zoneNrF, endtime, includeThisField){
	try{
		if(DEVMODE_FUNCTION){GM_log("Begin calcInGameProductAmount product:"+product); }
		var type=getZoneStockType(zoneNrF);
		var iBase=unsafeData.prodStock[type][product]?unsafeData.prodStock[type][product]:0;
		var fzType=getBuildingTyp(zoneNrF);
		if(includeThisField||(fzType=="sawmill")||(fzType=="carpentry")||(fzType=="forest")){ 
			iBase +=calcInGameProductAmountOnField(product, zoneNrF, endtime); 
		}
		for(var i=0;i<unsafeData.ALL_ZONES["farm"].length;i++){
			var fz=unsafeData.ALL_ZONES["farm"][i];
			if(includeThisField||(fz!=zoneNrF)){
				iBase +=calcInGameProductAmountOnField(product, fz, endtime);
			}
		}
		if(DEVMODE_FUNCTION){GM_log("End calcInGameProductAmount product:"+product+" endTotal:"+iBase,5,"red");}
		return iBase;
	}catch(err){ GM_log("ERROR calcInGameProductAmount product="+product+" zoneNrF="+zoneNrF+" endtime="+endtime+" includeThisField="+includeThisField+"\n"+err);return 0; }
}
function calcProductionTime(product, zoneNrF){
try{
	var bonus=getFarmZoneBonus(zoneNrF, product);
	var time=(product==PRODSTOP?0:unsafeData.prodGrowTime[0][product]*60);
	switch(getBuildingTyp(zoneNrF)){
	case 1:
		time=calcDauer(time,bonus);
		break;
	case 2:
		time *=bonus;
		var zoneNrL=getZoneListId(zoneNrF);
		if(zoneList[zoneNrL][0][0]!=PRODSTOP){
			time -=zoneList[zoneNrL][0][1]*FEEDBONUSTIME[zoneList[zoneNrL][0][0]]/unsafeData.zoneAnimals[zoneNrF];
			if(zoneList[zoneNrL][1][1]>0){
				time -=zoneList[zoneNrL][1][1]*FEEDBONUSTIME[zoneList[zoneNrL][1][0]]/unsafeData.zoneAnimals[zoneNrF];
			}
		}
		break;
	case 3:
		time*=bonus;
		break;
	case "windmill":
		time=(product==PRODSTOP?0:parseInt(unsafeWindow.formulas[0][product][4],10));
		//time*=bonus;
		break;
	case "forest":
		time=(product==PRODSTOP?0:unsafeData.prodGrowTime[1][product]*60);
		time=calcDauer(time,bonus);
		break;
	case "sawmill":
	case "carpentry":
		time=(product==PRODSTOP?0:unsafeData.prodGrowTime[1][product]*60);
		time*=bonus;
		break;
	}
	return time;
}catch(err){GM_log("ERROR calcProductionTime product:"+product+" zoneNrF:"+zoneNrF+" \n"+err);return 0;}
}
function isMultiSlotZone(zoneNrF){
	if(isNaN(zoneNrF)){
		if((zoneNrF=="sawmill")||(zoneNrF=="carpentry")){
			return true;
		}else{
			return false;
		}
	}else if((unsafeData.zoneTyp[zoneNrF]==13)||(unsafeData.zoneTyp[zoneNrF]==14)){
		return true;
	}else{
		return false;
	}
}
function isVisibleZone(zoneNr){
	if(extendedListReg.test(zoneNr)){
		return false;
	}else if(isNaN(zoneNr)){
		zoneNr=zoneNr.toString().replace(/\.\d+$/,"");
		switch(zoneNr){
		case "windmill":
			return((unsafeData.gameLocation[0]=="city")&&(unsafeData.gameLocation[1]==2));
		break;
		case "sawmill": case "carpentry": case "forest":
			return(unsafeData.gameLocation[0]=="forestry");
		break;
		default:
			return false;
		}
	} else {
		zoneNr=(parseInt(zoneNr,10));
		return((unsafeData.gameLocation[0]=="farm")&&(unsafeData.gameLocation[1]==Math.floor((zoneNr-1)/6)));
	}
}
function getZoneTimes(zoneNrL){
	if(DEVMODE_FUNCTION){GM_log("Begin getZoneTimes " + zoneNrL);}
	try{
		if(!valShowQueueTime){
			if(DEVMODE_FUNCTION){GM_log("End getZoneTimes DISABLED:" + zoneNrL);}
			return new Object();
		}
		noTime=false;
		var zoneTimes=new Object();
		for(var fz in unsafeData.zoneEndTimes){
			if (!unsafeData.zoneEndTimes.hasOwnProperty(fz)){continue;}
			zoneTimes[fz]=((unsafeData.zoneEndTimes[fz]==NEVER)?now:unsafeData.zoneEndTimes[fz]);
		}
		if(zoneNrL==undefined){
			if(DEVMODE_FUNCTION){GM_log("End getZoneTimes " + zoneNrL);}
			return zoneTimes.clone();
		}else{
			var returnn=new Object();
			var zones=getZonesFromList(zoneNrL);
			for(var i=0;i<zones.length;i++){
				returnn[zones[i]]=zoneTimes[zones[i]];
			}
			zoneTimes=null;
			if(DEVMODE_FUNCTION){GM_log("End getZoneTimes " + zoneNrL);}
			return returnn.clone();
		}
	}catch(err){GM_log("ERROR getZoneTimes \n"+err);return new Object();}
}
function getFarmZonesTyp(zType){
	var zoneT=new Array();
	for(var fz=1;fz<=6*parseInt(unsafeWindow.farmamount,10);fz++){
		if(getBuildingTyp(fz)==zType || zType==undefined){
			zoneT.push(fz);
		}
	}
	return zoneT;
}
function getZoneActiveList(){
	if(DEVMODE_FUNCTION){ GM_log("Begin getZoneActiveList zoneNr:"+zoneNrL);}
	var zones=new Object();
	var returnn=new Array();
	for(var zoneNrF in zoneList){
		if(!zoneList.hasOwnProperty(zoneNrF)){continue;}
		zones[zoneList[zoneNrF]]=1;
	}
	for(var zoneNrL in zones){
		if(!zones.hasOwnProperty(zoneNrL)){continue;}
		returnn.push(zoneNrL);
	}
	zones=null;
	if(DEVMODE_FUNCTION){ GM_log("End getZoneActiveList zoneNr:"+zoneNrL+" return:"+implode(returnn,"getZoneActiveList/returnn"));}
	return returnn;
}
function getZonesFromList(zoneNrL){
	if(DEVMODE_FUNCTION){ GM_log("Begin getZonesFromList zoneNr:"+zoneNrL);}
	var returnn=new Array(); // [[zoneNrF,slot],...]
	// if(isNaN(zoneNrL)){
	// 	returnn.push(zoneNrL);
	// }else{
		for(var i in zoneToList){
			if(!zoneToList.hasOwnProperty(i)){continue;}		
			if(zoneToList[i]==zoneNrL){
				//help=i.split(".");
				//returnn.push([(isNaN(help[0])?help[0]:parseInt(help[0],10)),(help[1]?parseInt(help[1],10):null)]);
				returnn.push(i);
			}
		}
	if(DEVMODE_FUNCTION){ GM_log("End getZonesFromList zoneNr:"+zoneNrL+" return:"+implode(returnn,"getZonesFromList/returnn"));}
	return returnn;
}
function createZoneList(zoneNrS){
	switch(getZoneTyp(zoneNrS)){
	case "windmill": zoneList[zoneNrS]=DEFAULT_ZONELIST_MILL_ARRAY.clone(); break;
	case 2: zoneList[zoneNrS]=DEFAULT_ZONELIST_ITEM_ARRAY2.clone(); break;
	default: zoneList[zoneNrS]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
	}
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"createZoneList"),"createZoneList");
}	
function getZoneListId(zoneNrF,slot){
	if(isNaN(zoneNrF)){
		var zoneToListId = zoneNrF+(isMultiSlotZone(zoneNrF)?(slot?"."+slot:".1"):"");
	}else{
		var zoneToListId = zoneNrF.toString()+(isMultiSlotZone(zoneNrF)?(slot?"."+slot:".1"):"");
	}
	if(!zoneToList[zoneToListId]){ setZoneListId(zoneToListId,zoneToListId); }
	if(!zoneList[zoneToList[zoneToListId]]){ createZoneList(zoneToList[zoneToListId]); }
	return zoneToList[zoneToListId];
}
function setZoneListId(zoneNrF,zoneNrL){
	if(!unsafeData.ALL_SLOTS[zoneNrF]){ return false; }
	if((!extendedListReg.test(zoneNrL))&&(!unsafeData.ALL_SLOTS[zoneNrL])){ return false; }
	zoneToList[zoneNrF]=zoneNrL;
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList",implode(zoneToList,"setZoneListId/zoneToList"));
	showInLogBubble("Change Queue: Zone "+getZoneName(zoneNrF,zoneNrF,null,false,true,false,true)+" paired to Queue "+getZoneName(zoneNrL,zoneNrL,null,false,true,false,true),5);
}
function deleteZoneInList(zoneNrL){
	delete zoneList[zoneNrL];
	delete zoneSettings[zoneNrL];
	for(var fz in zoneToList){
		if(!zoneToList.hasOwnProperty(fz)){ continue; }
		if(zoneToList[fz]==zoneNrL){ setZoneListId(fz,fz); }
	}
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"deleteZoneInList/zoneSettings"));
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"deleteZoneInList/zoneList"));
	showInLogBubble("Remove General Queue:"+extendedListReg.exec(zoneNrL)[1],5);
}
function addZoneToList(){
	var newZone=1;
	for(var lz in zoneList){
		if(!zoneList.hasOwnProperty(lz)){ continue; }
		if(extendedListReg.test(lz)){
			if(extendedListReg.exec(lz)[1]!=newZone) break;
			newZone++;
		}
	}
	zoneList[ExtendedListCHAR+newZone]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
	// GM_log("zoneList "+ implode(zoneList,"addZoneToList/zoneList"));
	zoneList.sortObj();
	// GM_log("zoneList "+ implode(zoneList,"addZoneToList/zoneList"));
	zoneSettings[ExtendedListCHAR+newZone]={"repeat":false,"shuffle":false};
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList",implode(zoneToList,"addZoneToList/zoneToList"));
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"addZoneToList/zoneSettings"));
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"addZoneToList/zoneList"));
	showInLogBubble("Adding General Queue:"+newZone,5);
	return ExtendedListCHAR+newZone;
}
function getFarmZone(gardenNr, farm){
	if(farm==null || farm==undefined){ farm=unsafeWindow.farm; }
	if(isNaN(gardenNr)){ return gardenNr; }
	else { return parseInt(gardenNr,10) + 6*(parseInt(farm,10)-1); }
}
function getGarden(zoneNr){
	var zoneNrF=zoneNr.toString().replace(/\.\d+$/g,"");
	if(isNaN(zoneNrF)){
		switch(zoneNrF){
		case "windmill":
			return "windmill";
		break;
		case "forest":case "sawmill":case "carpentry":
			return "forestry";
		break;
		default:
			GM_log("WARNING getGarden returns null\nzoneNr="+zoneNr);
			return null;
		}
	}else{
		return (((parseInt(zoneNrF,10)-1)%6)+1);
	}
}
function getZoneStockType(zoneNrFL){//zoneNrFL=zoneNrF or zoneNrL
	var fzType=getBuildingTyp(zoneNrFL);
	if(extendedListReg.test(zoneNrFL)){//extended list is always a field of type 1
		return 0;
	}else if(fzType=="windmill"){
		return 3;
	}else if (fzType=="sawmill"||fzType=="carpentry"||fzType=="forest"){
		return 1;
	}else{
		return 0;
	}
}
function getZoneTyp(zoneNr){
	if(extendedListReg.test(zoneNr)){ //extended is always a field of type 1
		return 1;
	}
	var help=zoneNr.toString().replace(/\.\d+$/g,"");
	if(isNaN(help)){
		return help;
	}else{
		return unsafeData.zoneTyp[help];
	}
}
function getBuildingTyp(zoneNr){
	try{
	var zoneType=getZoneTyp(zoneNr);
	if(isNaN(zoneType)){
		return zoneType;
	}else{
		return unsafeData.BUILDINGTYPE[zoneType];
	}
	}catch(err){ GM_log("ERROR getBuildingTyp zoneNr="+zoneNr+"\n"+err); }
}
function getZoneNameCorrected(zoneNrFL){
	if(extendedListReg.test(zoneNrFL)){//extended is always a field
		return zoneNrFL;
	}else if(isNaN(zoneNrFL)){//all zones not fields
		return zoneNrFL.match(/[^A-z]*([A-z]*)[^A-z]*/)[1];
	}else{
		return zoneNrFL;
	}
}
function getOpenZoneNrF(){
	var zoneNr=null;
	if($("gardenmaincontainer").style.display=="block"){
		zoneNr=parseInt(/button_cancel(\d*)/i.exec($("gardencancel").innerHTML)[1],10);
	}else if($("innermaincontainer").style.display=="block"){
		zoneNr=parseInt(/button_cancel(\d*)/i.exec($("cancelscreen").innerHTML)[1],10);
	// }else if(unsafeWindow.forestry_quicknavi==1){//Not needed
	//	zoneNr="forestry";
	}
	if(!isNaN(zoneNr)){
		 return getFarmZone(zoneNr);
	}else{
		return zoneNr;
	}
}
function getZoneName(zoneNrS,zoneNrL,queueNum,showPaired,showLocation,showBonus,showName){
try{
	if(DEVMODE_FUNCTION){ GM_log("Begin getZoneName zoneNrF="+zoneNrF+" zoneNrL="+zoneNrL);}
	// GM_log("Begin getZoneName zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+" args="+implode([queueNum,showPaired,showLocation,showBonus,showName]));
	if(showName==undefined){ showName=true; }
	zoneNrS=zoneNrS.toString();
	var zoneNrF=zoneNrS.replace(/\.\d+$/,"");
	var zones=getZonesFromList(zoneNrL);
	var txt="";
	if((extendedList=extendedListReg.exec(zoneNrL))!=null){
		txt=texte["automat"]["titleGeneral"].replace(" ","&nbsp;")+"&nbsp;"+extendedList[1];
		if(zones.length==1){
			// TODO rekursion ohne abbruch?
			// txt +="&nbsp;("+ getZoneName(zones[0],zoneNrL,null,false,false,showBonus,showName) + ")";
		}
	}else if(showPaired && (zones.length > 1 || zoneNrS!=zoneNrL)){
		// if(showName) txt +=unsafeWindow.buildinginfos[0][unsafeData.zoneTyp[zoneNrF]][10].replace(" ","&nbsp;")+"&nbsp;";
		if(showName){
			txt +=(isNaN(zoneNrF)?texte[getZoneTyp(zoneNrF)]:unsafeWindow.buildinginfos[0][getZoneTyp(zoneNrF)][10].replace(" ","&nbsp;"))+"&nbsp;";
		}
		if(showLocation){
			txt+='<span style="font-weight:bold;color:#505050;">';
			for(var i=0;i<zones.length;i++){
				zones[i]=[zones[i].toString().replace(/\..*$/,""),zones[i]];
				if(i>0) txt +="|";
				if(zones[i][0]==zoneNrF) txt+="</span>";
				if(zones[i][0]==zoneNrL) txt+="<u>";
				txt +=getZoneName(zones[i][1],zoneNrL,null,false,true,false,(zones.length==1));
				if(zones[i][0]==zoneNrL) txt+="</u>";
				if(zones[i][0]==zoneNrF) txt+='<span style="font-weight:bold;color:#505050;">';
			}
			txt+="</span>";
			if(valUseQueueList && queueNum!=null && queueNum>=0) txt+="&nbsp;{" + queueNum + "}";
			zones=null;lz=null;
		}
	}else{
		switch(getBuildingTyp(zoneNrF)){
			case 1:
				if(valUseQueueList && showLocation && queueNum!=null && queueNum>=0){ //  && showPaired
					txt="&nbsp;{" + queueNum + "}";
				}
				if(showBonus){
					txt='<div style="position:relative;display:inline-block;">';
					if(unsafeData.zoneBonus[zoneNrF]>0){
						txt+='<span>'+unsafeData.zoneBonus[zoneNrF]+'%</span>';
					}
					if(unsafeData.zoneBonusSpecialProduct[zoneNrF]!="0"){
						txt+='<span>,</span><span><div class="kp'+unsafeData.zoneBonusSpecialProduct[zoneNrF]+'" style="display:inline-block;"></div>'+(unsafeData.zoneBonus[zoneNrF]+unsafeData.zoneBonusSpecialAmount[zoneNrF])+'%</span>';
					}
					txt+='</div>';
				}
				break;
			case 2:
				if(showBonus){
					if(unsafeData.zoneBonus[zoneNrF]>0){
						txt+=unsafeData.zoneBonus[zoneNrF]+"%";
					}
					if(txt!="") txt+=",";
					txt+="#"+unsafeData.zoneAnimals[zoneNrF];
				}
				break;
			case 3:
				if(showBonus && unsafeData.zoneBonus[zoneNrF]>0){
					txt=unsafeData.zoneBonus[zoneNrF]+"%";
				}
				break;
			default:
				if(showBonus && unsafeData.zoneBonus[zoneNrF]>0){
					txt=unsafeData.zoneBonus[zoneNrF]+"%";
				}
		}
		if(showLocation){
			txt=(zoneNrS.match(/\./)?"["+zoneNrS.replace(/^.*\./,"")+"]":"")+(txt!=""?"&nbsp;("+txt+")":"");
			if(!isNaN(zoneNrF)){
				txt=Math.ceil(zoneNrF/6)+"."+getGarden(zoneNrF)+txt;
			}
		}
		if(showName){
			txt=(isNaN(zoneNrF)?texte[getZoneTyp(zoneNrF)]:unsafeWindow.buildinginfos[0][getZoneTyp(zoneNrF)][10].replace(" ","&nbsp;"))+"&nbsp;"+txt;
		}
	}
	if(DEVMODE_FUNCTION){ GM_log("End getZoneName zoneNrL:"+zoneNrL);}
	return txt;
}catch(err){GM_log("ERROR getZoneName zoneNrF:"+zoneNrF+" zoneNrS:"+zoneNrS+" zoneNrL:"+zoneNrL+" \n"+err);return "Error. See console.";}
}

function drawAutomatIcon(name,zoneNrS,appendTo,style){
try {
	if(DEVMODE_FUNCTION){ GM_log("Begin drawAutomatIcon name=" + name);}
	if(!$("divAutomatIcon_"+name)){
		switch(getBuildingTyp(zoneNrS)){
		case "windmill":
			newdiv=createElement("div",{"id":"divAutomatIcon_"+name,"class":"link divWindmillIcon","product":PRODSTOP,"zoneNrS":zoneNrS,"style":style},appendTo);
			createElement("div",{"class":"fmm"+PRODSTOP,"style":"position:relative;"},newdiv);
		break;
		case "forest":case "sawmill":case "carpentry": 
			newdiv=createElement("div",{"id":"divAutomatIcon_"+name,"class":"link divForestryIcon","product":PRODSTOP,"zoneNrS":zoneNrS,"style":style},appendTo);
			createElement("div",{"class":"f_symbol"+PRODSTOP,"style":"position:relative;"},newdiv);
			// newdiv=createElement("div",{"id":"divAutomatIcon_"+name,"class":"link divForestryIcon f_symbol"+PRODSTOP,"product":PRODSTOP,"zoneNrS":zoneNrS,"style":style},appendTo);
		break;
		default:
			newdiv=createElement("div",{"id":"divAutomatIcon_"+name,"class":"link divZoneIcon v"+PRODSTOP,"product":PRODSTOP,"zoneNrS":zoneNrS,"style":style},appendTo);
		}
		newdiv.addEventListener("click", function(){
			var zoneNrF=getFarmZone(this.id.replace("divAutomatIcon_","").replace("global_",""));
			var zoneNrS=this.getAttribute("zoneNrS");
			var zoneNrL=getZoneListId(zoneNrS);
			switch(getBuildingTyp(zoneNrS)){
				case 1:
					if(valUseQueueList){
						redrawQueueBox(zoneNrS, zoneNrL, $("divQueueBoxInner"));
					}else{
						drawQueueChooseItemBox(zoneNrS, zoneNrL, 0, $("divChooseBoxInner"));
					}
					break;
				case 2:
					drawStableChooseFeedBox(zoneNrS, zoneNrL,$("divChooseBoxInner"));
					break;
				case 3:
					if(valUseQueueList){
						redrawQueueBox(zoneNrS, zoneNrL, $("divQueueBoxInner"));
					}else{
						drawFactoryChooseItemBox(zoneNrS, zoneNrL,$("divChooseBoxInner"));
					}
					break;
				case "windmill":
				case "forest":case "sawmill":case "carpentry":
					redrawQueueBox(zoneNrS, zoneNrL, $("divQueueBoxInner"));
					break;
			}
			zoneNrF=null;zoneNrS=null;zoneNrL=null;
		},false);
		newdiv.addEventListener("mouseover", function(evt){
			showToolTip(evt, toolTipProductSmall(this.getAttribute("zoneNrS"),null,0,this));
		},false);
		newdiv=null;
		updateQueueBox(zoneNrS);
	}
	if(DEVMODE_FUNCTION){ GM_log("End drawAutomatIcon:" + zoneNrF);}
}catch(err){GM_log("ERROR drawAutomatIcon "+zoneNrF+"\n"+err);}
}

function drawQueueBox(zoneNrS, zoneNrL, appendTo){
try{
	if(DEVMODE_FUNCTION){ GM_log("Begin drawQueueBox zoneNrS="+zoneNrS +" zoneNrL="+zoneNrL +" appendTo.id="+appendTo.id); }
	if(zoneNrS==undefined){ return; }
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	var fzType=getBuildingTyp(zoneNrS);
	appendTo.innerHTML="";
	appendTo.style.display="none";
	appendTo.setAttribute("zoneNrS",zoneNrS);
	appendTo.setAttribute("zoneNrL",zoneNrL);

	createElement("div",{id:"divAutoMatTitle_"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrS, zoneNrL, null, true, true, true));
	createElement("div",{id:"divAutoMatEndTime"+zoneNrL,"class":"queueTime"},appendTo);
	createElement("div",{style:"clear:both;"},appendTo);
	createElement("div",{id:"divAutoMatButton"+zoneNrL, "class":"queueBoxerButton"},appendTo);

	// Repeat button
	if(OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"]!=undefined){
		newelm=createElement("div",{id:"divAutoMatButtonRepeat"+zoneNrL,"class":"link queueButtonRepeat"},$("divAutoMatButton"+zoneNrL));
		newelm.addEventListener("mouseover", function(evt){
			var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
			showToolTip(evt, zoneSettings[zoneNrL]["repeat"]?texte["automat"]["repeat_on"]:texte["automat"]["repeat_off"]);
		},false);
		newelm.style.backgroundImage=(zoneSettings[zoneNrL]["repeat"])?"url("+strImages["repeat_on"]+")":"url("+strImages["repeat_off"]+")";
		newelm.addEventListener("click", function(){
			var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
			zoneSettings[zoneNrL]["repeat"]=!zoneSettings[zoneNrL]["repeat"];
			this.style.backgroundImage=(zoneSettings[zoneNrL]["repeat"])?"url("+strImages["repeat_on"]+")":"url("+strImages["repeat_off"]+")";
			if(!zoneSettings[zoneNrL]["repeat"]){ for(var i=0;i<zoneList[zoneNrL].length;i++) zoneList[zoneNrL][i][2]=0;} //reset when disabling
			updateQueueBox(zoneNrS, zoneNrL);
			adjustToolTip(this);
		},false);
	}
	// Shuffle button
	newelm=createElement("div",{id:"divAutoMatButtonShuffle"+zoneNrL,"class":"link queueButtonShuffle"},$("divAutoMatButton"+zoneNrL));
	newelm.addEventListener("mouseover", function(evt){
		var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
		showToolTip(evt, zoneSettings[zoneNrL]["shuffle"]?texte["automat"]["shuffle_on"]:texte["automat"]["shuffle_off"]);
	},false);
	newelm.style.backgroundImage=(zoneSettings[zoneNrL]["shuffle"])?"url("+strImages["shuffle_on"]+")":"url("+strImages["shuffle_off"]+")";
	newelm.addEventListener("click",function(){
		var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
		zoneSettings[zoneNrL]["shuffle"]=!zoneSettings[zoneNrL]["shuffle"];
		this.style.backgroundImage=(zoneSettings[zoneNrL]["shuffle"])?"url("+strImages["shuffle_on"]+")":"url("+strImages["shuffle_off"]+")";
		updateQueueBox(zoneNrS, zoneNrL);
		adjustToolTip(this);
	},false);
	// Rotate button
	newelm=createElement("div",{id:"divAutoMatButtonRotate"+zoneNrL,"class":"link queueButtonRotate"},$("divAutoMatButton"+zoneNrL));
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["rotate"]);},false);
	newelm.style.backgroundImage="url("+strImages["rotate"]+")";
	newelm.addEventListener("click",function(){
		var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
		zoneList[zoneNrL].push(zoneList[zoneNrL].splice(0,1)[0]);
		updateQueueBox(zoneNrS, zoneNrL);
	},false);
	// add button.
	newelm=createElement("div",{id:"divAutoMatButtonAdd"+zoneNrL,"class":"link queueButtonAdd"},$("divAutoMatButton"+zoneNrL));
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueAddText"]);},false);
	newelm.addEventListener("click",function(){
		var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
		var lRepeat=(!OPTION_LIST_REPEAT || zoneNrS=="windmill")?false:!valUseQueueList?false:zoneSettings[zoneNrL]["repeat"]==undefined?false:zoneSettings[zoneNrL]["repeat"];
		var lShuffle=!valUseQueueList?false:zoneSettings[zoneNrL]["shuffle"]==undefined?false:zoneSettings[zoneNrL]["shuffle"];
		var product=(zoneNrS=="windmill"?(lShuffle?zoneList[zoneNrL][zoneList[zoneNrL].length-1][0]:PRODSTOP):(lRepeat||lShuffle?zoneList[zoneNrL][zoneList[zoneNrL].length-1][0]:PRODSTOP));
		var queueNum=zoneList[zoneNrL].push(DEFAULT_ZONELIST_ITEM.clone())-1;
		zoneList[zoneNrL][queueNum][0]=product;
		reFillQueueBox(zoneNrS, zoneNrL, queueNum);
		click($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item"));
		product=null;
	},false);

	if(fzType=="windmill"){
		// Clear mill-list then add all button
		newelm=createElement("div",{id:"divAutoMatButtonAddAll"+zoneNrL,"class":"link queueButtonAddAll"},$("divAutoMatButton"+zoneNrL));
		createElement("img",{id:"divAutoMatButtonAddAll",style:"width:21px;height:15px;top:1px;left:1px;",src:strImages["reload_all"]},newelm);
		newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["MillClearAddAll"]);},false);
		newelm.addEventListener("click",function(){
			var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
			zoneList[zoneNrL]=new Array();
			for(var iProd in autoMillStorage){
				if(!autoMillStorage.hasOwnProperty(iProd)){continue;}
				if(autoMillStorage[iProd][0]){
					zoneList[zoneNrL].push([iProd,autoMillStorage[iProd][0],0]);
				}
			}
			if(zoneList[zoneNrL].length<=0) zoneList[zoneNrL]=DEFAULT_ZONELIST_MILL_ARRAY.clone();
			reFillQueueBox(zoneNrS, zoneNrL, 0);
		},false);
	}
	if(fzType=="sawmill"||fzType=="carpentry"||fzType=="forest"){
		//TODO add button for sawmill/carpentry/forest
		//TODO add button for needed in prodMinRack
	}
	if(!isNaN(zoneNrS)){
		// copy button
		newelm=createElement("div",{id:"divAutoMatButtonCopy"+zoneNrL,"class":"link queueButtonCopy"},$("divAutoMatButton"+zoneNrL));
		newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueCopyTextHeader"]);},false);
		newelm.addEventListener("click",function(){
			var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
			var appendTo=this.parentNode.parentNode.id;

			$("divQueueBoxInner").innerHTML="";
			$("divQueueBoxInner").style.display="none";
			$("divQueueBoxInner").setAttribute("zoneNrS","");
			$("divQueueBoxInner").setAttribute("zoneNrL",zoneNrL);
			$("divQueueBoxInner").setAttribute("reAppendTo",appendTo);

			createElement("div",{"class":"headline divQueueItemListHeader"},$("divQueueBoxInner"),texte["automat"]["QueCopyTextHeaderFrom"]);
			createElement("div",{id:"farmZoneFrom","class":"divQueueItemListBox"},$("divQueueBoxInner"));
			drawQueueListSmall(zoneNrL, zoneNrL, $("farmZoneFrom"));

			createElement("div",{"class":"headline divQueueItemListHeader"},$("divQueueBoxInner"),texte["automat"]["QueCopyTextHeaderTo"]);
			var selectDiv=createElement("select",{id:"copyZone","class":"divQueueItemListSelect"},$("divQueueBoxInner"));
			createElement("option",{value:"-"},selectDiv,"-");
			for(var lz in zoneList){
				if(!zoneList.hasOwnProperty(lz)){ continue; }
				if(((!extendedListReg.test(lz) && getBuildingTyp(lz)==1)||(extendedListReg.test(lz)))&& lz!=zoneNrL){
					createElement("option",{value:lz},selectDiv,getZoneName(lz,lz,null,false,true,false));
				}
			}
			selectDiv.value="-";
			selectDiv.addEventListener("change", function(evt){
				if(this.value!="-"){
					drawQueueListSmall(this.value, this.value, $("farmZoneTo"));
				}else{
					$("farmZoneTo").innerHTML="";
				}
			},false);
			selectDiv=null;

			createElement("div",{id:"farmZoneTo","class":"divQueueItemListBox"},$("divQueueBoxInner"));

			createElement("div",{style:"clear:both;"},$("divQueueBoxInner"));
			divfooter=createElement("div",{"class":"divQueueItemListFooter"},$("divQueueBoxInner"));

			var newdiv=createElement("div",{style:"position:absolute;top:0px;left:100px;","class":"link"},divfooter);
			createElement("img",{src:GFX + "button_ok.png"},newdiv);
			newdiv.addEventListener("click", function(evt){
				var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
				var toZone=$("copyZone").value;
				// GM_log("Copy "+ zoneNrL+ " to " + toZone);
				if(toZone!="-"){
					zoneList[toZone]=zoneList[zoneNrL].clone();
					zoneSettings[toZone]=zoneSettings[zoneNrL].clone();
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList", implode(zoneList,"drawQueueBox/zoneList"));
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"drawQueueBox/zoneSettings"));
				}
				// reopen the correct queuelist. In general mode this can only be the general list.
				var reAppendTo=this.parentNode.parentNode.getAttribute("reappendto");
				toZone=(toZone=="-")?zoneNrL:toZone;
				if(reAppendTo.indexOf("tdAutoMatOverview")==0){ //NOTE overview has the zoneNrL addend to it.
					reAppendTo="tdAutoMatOverview"+toZone;
				}
				if($(reAppendTo)){
					redrawQueueBox(toZone, toZone, $(reAppendTo));
				}else{
					click($("divQueueBoxClose"));
				}
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				this.src=GFX + "button_ok_over.png";
				showToolTip(evt,unsafeWindow.commitbox_text_yes);
			},false);
			newdiv.addEventListener("mouseout", function(evt){
				this.src=GFX + "button_ok.png";
			},false);

			var newdiv=createElement("div",{style:"position:relative;top:0px;left:200px;","class":"link"},divfooter);
			createElement("img",{src:GFX + "button_no.png"},newdiv);
			newdiv.addEventListener("click", function(evt){
				var zoneNrS=this.parentNode.parentNode.getAttribute("zoneNrS");
				var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
				var reAppendTo=this.parentNode.parentNode.getAttribute("reappendto");
				if(reAppendTo=="divQueueBoxInner"){
					redrawQueueBox(zoneNrS, zoneNrL, $(reAppendTo));
				}else if($("divQueueBox").style.display=="block"){
					click($("divQueueBoxClose"));
				}
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				this.src=GFX + "button_no_over.png";
				showToolTip(evt,unsafeWindow.commitbox_text_no);
			},false);
			newdiv.addEventListener("mouseout", function(evt){
				this.src=GFX + "button_no.png";
			},false);
			newdiv=null;
			//TODO this goes wrong needs appento==
			$("divQueueBoxInner").style.display="block";
			$("divQueueBox").style.display="block";
			$("divQueueBox").style.top=Math.round(255 - $("divQueueBox").offsetHeight/2)+"px";
		},false);
	}

	createElement("div",{id:"divAutoMatQueueBox"+zoneNrL,"class":"queueBoxerQueueBox"},appendTo);
	for(queueNum=0;queueNum<zoneList[zoneNrL].length; queueNum++){
		drawQueueItemBox(zoneNrS, zoneNrL, queueNum, $("divAutoMatQueueBox"+zoneNrL));
	}

	var newscrL=createElement("div",{id:"divAutoMatScrollLeft"+zoneNrL, "class":"link queueButtonScrollLeft"},valShowQueueTime?$("divAutoMatButton"+zoneNrL):appendTo);
	var newscrR=createElement("div",{id:"divAutoMatScrollRight"+zoneNrL, "class":"link queueButtonScrollRight"},valShowQueueTime?$("divAutoMatButton"+zoneNrL):appendTo);
	newscrL.addEventListener("click", function(){
		var zoneNrL=this.id.replace("divAutoMatScrollLeft","");
		// GM_log("click divAutoMatScrollLeft :" + zoneNrL);
		var scrlelm=$("divAutoMatQueueBox"+zoneNrL);
		if(scrlelm.scrollLeft > 0){
			scrlelm.scrollLeft=Math.max(0,scrlelm.scrollLeft-queueItemBoxWidth);
		}
		this.style.visibility=(scrlelm.scrollLeft>0?"visible":"hidden");
		$("divAutoMatScrollRight"+zoneNrL).style.visibility=((scrlelm.scrollLeft + scrlelm.clientWidth)<scrlelm.scrollWidth?"visible":"hidden");
		scrlelm=null;
	},false);
	newscrR.addEventListener("click", function(){
		var zoneNrL=this.id.replace("divAutoMatScrollRight","");
		// GM_log("click divAutoMatScrollRight :" + zoneNrL);
		var scrlelm=$("divAutoMatQueueBox"+zoneNrL);
		if((scrlelm.scrollLeft + scrlelm.clientWidth)<scrlelm.scrollWidth){
			scrlelm.scrollLeft=Math.min((scrlelm.scrollWidth-scrlelm.clientWidth),((scrlelm.scrollLeft+queueItemBoxWidth)-((scrlelm.scrollLeft+queueItemBoxWidth)%queueItemBoxWidth)));
		}
		$("divAutoMatScrollLeft"+zoneNrL).style.visibility=(scrlelm.scrollLeft>0?"visible":"hidden");
		this.style.visibility=((scrlelm.scrollLeft + scrlelm.clientWidth)<scrlelm.scrollWidth?"visible":"hidden");
		scrlelm=null;
	},false);
	createElement("div",{style:"clear:both;"},appendTo);

	updateQueueBox(zoneNrS, zoneNrL);

	appendTo.style.display="block";
	if(appendTo==$("divQueueBoxInner")){
		$("divQueueBox").style.display="block";
		$("divQueueBox").style.top=Math.round(255 - $("divQueueBox").offsetHeight/2)+"px";
	}
	var scrlelm=$("divAutoMatQueueBox"+zoneNrL);
	scrlelm.scrollLeft=0;
	$("divAutoMatScrollLeft"+zoneNrL).style.display=((scrlelm.scrollWidth > scrlelm.clientWidth)?"block":"none");
	$("divAutoMatScrollRight"+zoneNrL).style.display=((scrlelm.scrollWidth > scrlelm.clientWidth)?"block":"none");
	$("divAutoMatScrollLeft"+zoneNrL).style.visibility=(scrlelm.scrollLeft>0?"visible":"hidden");
	$("divAutoMatScrollRight"+zoneNrL).style.visibility=((scrlelm.scrollLeft + scrlelm.clientWidth)<scrlelm.scrollWidth?"visible":"hidden");

	if(DEVMODE_FUNCTION){ GM_log("End drawQueueBox :" + zoneNrL); }
	newlayer=null;newelm=null;newscrL=null;newscrR=null;scrlelm=null;appendTo=null;
}catch(err){GM_log("ERROR drawQueueBox \n"+err);}
}
function drawQueueItemBox(zoneNrS, zoneNrL, queueNum, appendTo){
try{
	if(DEVMODE_FUNCTION){ GM_log("Begin drawQueueItemBox zoneNrS:" + zoneNrS + " zoneNrL:" + zoneNrL + " queueNum:"+ queueNum); }
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	var fzType=getBuildingTyp(zoneNrS);
	// begin adding new box
	newlayer=createElement("span",{id:"divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum,"class":"queueItemBox","style":"cursor:default;"},appendTo);
	newlayer.setAttribute("zoneNrS",zoneNrS);
	newlayer.setAttribute("zoneNrL",zoneNrL);
	newlayer.setAttribute("queueNum",queueNum);
/*
	newelm=createElement("div",{id:newlayer.id+"test1",alt:"del","class":"link","style":"position:absolute;width:100%;height:10px;top:0px;left:0px;background:blue;opacity:0;z-index:250;cursor:default;"},newlayer);
	newelm.addEventListener("mouseover", function(evt){
		this.style.opacity = 0.5;
	},false);
	newelm.addEventListener("mouseout", function(evt){
		this.style.opacity = 0;
	},false);
	newelm=createElement("div",{id:newlayer.id+"test2",alt:"del","class":"link","style":"position:absolute;width:20px;height:100%;top:0px;left:-10px;background:blue;opacity:0;z-index:250;cursor:default;"},newlayer);
	newelm.addEventListener("mouseover", function(evt){
		this.style.opacity = 0.5;
	},false);
	newelm.addEventListener("mouseout", function(evt){
		this.style.opacity = 0;
	},false);
*/
	// UP Button
	newelm=createElement("div",{id:newlayer.id+"Up",alt:"up","class":"link queueItemButton queueItemUpButton"},newlayer);
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueUpButton"]);},false);
	newelm.addEventListener("click", function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		// GM_log("swap" + queueNum + " : " + queueNum-1);
		zoneList[zoneNrL].swap(queueNum, queueNum-1);
		// GM_log("Before scrollTop:" + $("divAutoPflanzeQueBox"+zoneNrL).scrollTop);
		$("divAutoMatQueueBox"+zoneNrL).scrollLeft=Math.max(0,Math.min($("divAutoMatQueueBox"+zoneNrL).scrollWidth,((queueNum+2)*queueItemBoxWidth)) - $("divAutoMatQueueBox"+zoneNrL).clientWidth);
		// GM_log("After scrollTop:" + $("divAutoPflanzeQueBox"+zoneNrL).scrollTop);
		updateQueueBox(zoneNrS, zoneNrL);
		zoneNr=null;zoneNrL=null;queueNum=null;
	},false);

	// Down Button
	newelm=createElement("div",{id:newlayer.id+"Down",alt:"down","class":"link queueItemButton queueItemDownButton"},newlayer);
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueDownButton"]);},false);
	newelm.addEventListener("click", function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		// GM_log("swap" + queueNum + " : " + queueNum+1);
		zoneList[zoneNrL].swap(queueNum, queueNum+1);
		// GM_log("Before scrollTop:" + $("divAutoPflanzeQueBox"+zoneNrL).scrollTop);
		$("divAutoMatQueueBox"+zoneNrL).scrollLeft=Math.max(0,Math.min($("divAutoMatQueueBox"+zoneNrL).scrollWidth,((queueNum+2)*queueItemBoxWidth)) - $("divAutoMatQueueBox"+zoneNrL).clientWidth);
		// GM_log("After scrollTop:" + $("divAutoPflanzeQueBox"+zoneNrL).scrollTop);
		updateQueueBox(zoneNrS, zoneNrL);
		zoneNrS=null;zoneNrL=null;queueNum=null;
	},false);

	// Item
	if(fzType=="windmill"){
		newelm=createElement("div",{"id":newlayer.id+"Item","class":"link windmillItemProduct"},newlayer);
		createElement("div",{"class":"fmm"+PRODSTOP,style:"position:relative;"},newelm);
	}else if(fzType=="sawmill"||fzType=="carpentry"||fzType=="forest"){
		newelm=createElement("div",{"id":newlayer.id+"Item","class":"link forestryItemProduct"},newlayer);
		createElement("div",{"class":"f_symbol"+PRODSTOP,style:"position:relative;"},newelm);
	}else{
		newelm=createElement("div",{id:newlayer.id+"Item","class":"link queueItemProduct v"+PRODSTOP},newlayer);
	}
	newelm.addEventListener("click", function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		var fzType=getBuildingTyp(zoneNrS);
		switch(fzType){
		case "windmill": 
			drawMillChooseItemBox(zoneNrS, zoneNrL, queueNum, $("divChooseBoxInner"));
		break;
		case "sawmill":case "carpentry":case "forest":
			drawForestryChooseItemBox(zoneNrS, zoneNrL, queueNum, $("divChooseBoxInner"));
		break;
		default:
			drawQueueChooseItemBox(zoneNrS, zoneNrL, queueNum, $("divChooseBoxInner"));
		}
	},false);
	newelm.addEventListener("mouseover", function(evt){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		showToolTip(evt, toolTipMain(zoneNrS, zoneNrL, queueNum, this.parentNode));
	},false);

	// Minus Button
	newelm=createElement("div",{id:newlayer.id+"M",alt:"-","class":"link queueItemButton queueItemMinButton"},newlayer);
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueMin"]);},false);
	newelm.addEventListener("click", function(){
		// GM_log("Minus button id " + this.id.substring(0,this.id.length-1));
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		var inputID=this.id.substring(0,this.id.length-1)+"I1";
		var stepping=(zoneNrS!="windmill" && zoneList[zoneNrL][queueNum][3])?STEPPINGRACK:STEPPINGFIELD;
		$(inputID).value=parseFloat($(inputID).value.replace(regDelimThou,"").replace(regDelimDeci,".")) - stepping;
		change($(inputID));
	},false);

	// Plus Button
	newelm=createElement("div",{id:newlayer.id+"P",alt:"+","class":"link queueItemButton queueItemPlusButton"},newlayer);
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QuePlus"]);},false);
	newelm.addEventListener("click", function(){
		// GM_log("Plus button id " + this.id.substring(0,this.id.length-1));
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		var inputID=this.id.substring(0,this.id.length-1)+"I1";
		var stepping=(zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3])?STEPPINGRACK:STEPPINGFIELD;
		$(inputID).value=parseFloat($(inputID).value.replace(regDelimThou,"").replace(regDelimDeci,".")) + stepping;
		change($(inputID));
	},false);

	// Behaviour Type Button
	newelm=createElement("div",{id:newlayer.id+"B",alt:"Behaviour","class":"link queueItemButton queueItemBehaviourButton"},newlayer);
	newelm.style.backgroundImage=(zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3])?"url("+strImages["functionR"]+")":"url("+strImages["functionF"]+")";
	newelm.addEventListener("mouseover", function(evt){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		showToolTip(evt, (zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3])?texte["automat"]["QueBehaviourR"]:texte["automat"]["QueBehaviourF"]);
	},false);
	newelm.addEventListener("click", function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		var inputValue=$(this.id.substring(0,this.id.length-1)+"I1");
		// GM_log("Behaviour button: zoneNrL:" + zoneNrL + " queueNum:" + queueNum);
		zoneList[zoneNrL][queueNum][3]=!zoneList[zoneNrL][queueNum][3];
		if(zoneNrS=="windmill"){
			this.style.backgroundImage="url("+strImages["functionF"]+")";
		}else{
			if(zoneList[zoneNrL][queueNum][3]){
				// rack Behaviour
				this.style.backgroundImage="url("+strImages["functionR"]+")";
				inputValue.value=(unsafeData.prodMinRack&&(unsafeData.prodMinRack[0][zoneList[zoneNrL][queueNum][0]]!=undefined))?unsafeData.prodMinRack[0][zoneList[zoneNrL][queueNum][0]]:(unsafeData.prodStock[0][zoneList[zoneNrL][queueNum][0]]?unsafeData.prodStock[0][zoneList[zoneNrL][queueNum][0]]:0)+((120/unsafeData.prodPlantSize[0])*inputValue.parentNode.getAttribute("itogo"));
				zoneList[zoneNrL][queueNum][2]=0;
			}else{
				// field Behaviour
				this.style.backgroundImage="url("+strImages["functionF"]+")";
				inputValue.value=inputValue.parentNode.getAttribute("iTogo");
				zoneList[zoneNrL][queueNum][2]=0;
			}
		}
		adjustToolTip(this);
		change(inputValue); //this includes a updateQueueBox
		inputValue=null;
	},false);

	//Mode Button
	if(OPTION_ITEM_REPEAT){
		newelm=createElement("div",{id:newlayer.id+"Mode",alt:"Mode","class":"link queueItemButton queueItemModeButton"},newlayer);
		newelm.style.backgroundImage=(getZoneTyp(zoneNrS)!=1 || zoneList[zoneNrL][queueNum][4])?"url("+strImages["mode_repeat"]+")":"url("+strImages["mode_1time"]+")";
		newelm.addEventListener("mouseover", function(evt){
			var zoneNrS=this.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			showToolTip(evt, (getZoneTyp(zoneNrS)==1 && zoneList[zoneNrL][queueNum][4])?texte["automat"]["QueBehaviourR"]:texte["automat"]["QueBehaviourF"]);
		},false);
		newelm.addEventListener("click", function(){
			var zoneNrS=this.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			// GM_log("Behaviour button: zoneNrL:" + zoneNrL + " queueNum:" + queueNum);
			if(getZoneTyp(zoneNrS)!=1){
				zoneList[zoneNrL][queueNum][4]=true;
				this.style.backgroundImage="url("+strImages["mode_1time"]+")";
			}else{
				zoneList[zoneNrL][queueNum][4]=!zoneList[zoneNrL][queueNum][4];
				this.style.backgroundImage="url("+(zoneList[zoneNrL][queueNum][4]?strImages["mode_repeat"]:strImages["mode_1time"])+")"; // repeat mode
			}
			adjustToolTip(this);
			updateQueueBox(zoneNrS, zoneNrL);
		},false);
		newelm=createElement("input",{id:newlayer.id+"IListRepeat",value:((zoneList[zoneNrL][queueNum][5]==undefined)?REPEAT_NO_LIMIT:zoneList[zoneNrL][queueNum][5]),maxlength:"4",size:"3","class":"queueItemInput3 queueItemInputWidth2"},newlayer);
		newelm.addEventListener("change", function(){
		try{
			// GM_log("Input field change :" + this.value);
			if(/^-?(0|[1-9]\d*)$/.test(this.value)){
				if(this.value < 1) this.value=1;
				var zoneNrS=this.parentNode.getAttribute("zoneNrS");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				zoneList[zoneNrL][queueNum][5]=Math.max(1,Math.min(999, this.value));
				updateQueueBox(zoneNrS, zoneNrL);
			}else{
				this.value=(isNaN(parseInt(this.value,"")))?1:parseInt(this.value,"");
			}
		}catch(err){GM_log("ERROR drawQueueItemBox InputRepeatField changed \n"+err);}
		},false);
	}
	// Input Field
	newelm=createElement("input",{id:newlayer.id+"I2",disabled:true,value:((zoneList[zoneNrL][queueNum][2]==undefined)?0:zoneList[zoneNrL][queueNum][2]),maxlength:"4",size:"3","class":"queueItemInput2 queueItemInputWidth2"},newlayer);
	newelm=createElement("input",{id:newlayer.id+"I1",value:0,maxlength:(zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3]?"6":"4"),size:"3","class":"queueItemInput1 queueItemInputWidth2"},newlayer);
	newelm.value=(zoneList[zoneNrL][queueNum][1]==undefined)?1:zoneList[zoneNrL][queueNum][1];
	newelm.addEventListener("change", function(){
	try{
		// GM_log("Input field change :" + this.value);
		if(/^-?(0|[1-9]\d*)$/.test(this.value)){
			if(this.value < 1) this.value=1;
			var zoneNrS=this.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			zoneList[zoneNrL][queueNum][1]=(zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3])? this.value:Math.max(1,Math.min(9999, this.value));
			updateQueueBox(zoneNrS, zoneNrL);
		}else{
			this.value=(isNaN(parseInt(this.value,"")))?1:parseInt(this.value,"");
		}
	}catch(err){GM_log("ERROR drawQueueItemBox InputField changed \n"+err);}
	},false);
/*
	newelm.addEventListener("mouseover", function(){
		$(this.id+"Min").style.visibility = "visible";
		$(this.id+"Min").style.top = (this.clientHeight -2) + "px";
		$(this.id+"Plus").style.visibility = "visible";
		$(this.id+"Plus").style.top = (this.clientHeight -2) + "px";
	},false);
	newelm.addEventListener("mouseout", function(){
		$(this.id+"Min").style.visibility = "hidden";
		$(this.id+"Plus").style.visibility = "hidden";
	},false);
	//createElement("div",{id:newelm.id+"Min",alt:"-","class":"link queueItemButton queueButtonMin"},newlayer);
	//createElement("div",{id:newelm.id+"Plus",alt:"+","class":"link queueItemButton queueButtonPlus"},newlayer);
*/
	// infinity sign
	createElement("div",{id:newlayer.id+"T","class":"queueItemText queueItemTextInf"},newlayer);

	// add button.
	newelm=createElement("img",{id:newlayer.id+"A","class":"link queueItemAddButton",src:GFX+"buildingupdatebutton_off.png"},newlayer);
	newelm.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueAddAboveText"]);},false);
	newelm.addEventListener("click",function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		if(zoneNrS=="windmill"){
			zoneList[zoneNrL].splice(queueNum,0,DEFAULT_ZONELIST_MILL.clone());
		}else{
			zoneList[zoneNrL].splice(queueNum,0,DEFAULT_ZONELIST_ITEM.clone());
			zoneList[zoneNrL][queueNum][0]=zoneList[zoneNrL][queueNum+1][0];
		}
		reFillQueueBox(zoneNrS, zoneNrL, queueNum);
		click($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item"));
	},false);
	newelm.addEventListener("mouseover", function(evt){
		this.setAttribute("src",GFX+"buildingupdatebutton_on.png");
		showToolTip(evt, texte["automat"]["QueAddAboveText"]);
	},false);
	newelm.addEventListener("mouseout", function(evt){
		this.setAttribute("src",GFX+"buildingupdatebutton_off.png");
	},false);

	// Delete Button
	newelm=createElement("img",{id:newlayer.id+"D","class":"link queueItemDeleteButton",src:GFX+"button_cancel_off.png"},newlayer);
	newelm.addEventListener("mouseover", function(evt){
		this.setAttribute("src",GFX+"button_cancel_on.png");
		showToolTip(evt, texte["automat"]["QueDeleteText"]);
	},false);
	newelm.addEventListener("mouseout", function(evt){
		this.setAttribute("src",GFX+"button_cancel_off.png");
	},false);
	newelm.addEventListener("click", function(){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		var foundActive=false;
		zoneList[zoneNrL].splice(queueNum,1);
		for(var i=0;i<zoneList[zoneNrL].length;i++){
			if(zoneList[zoneNrL][i][1] > zoneList[zoneNrL][i][2]){
				foundActive=true;
				break;
			}
		}
		if(!foundActive){
			for(var i=0;i<zoneList[zoneNrL].length;i++){zoneList[zoneNrL][i][2]=0;}
		}
		if(zoneList[zoneNrL].length==queueNum){
			removeElement(this.parentNode);
			updateQueueBox(zoneNrS, zoneNrL);
		}else{
			reFillQueueBox(zoneNrS, zoneNrL, queueNum);
		}
	},false);

	// End Time
	createElement("div",{id:newlayer.id+"ET","class":"queueItemTime",style:"height:"+queueItemBoxTimeHeight+"px;"},newlayer);
	newlayer=null;newelm=null;appendTo=null;
	if(DEVMODE_FUNCTION){ GM_log("End drawQueueItemBox :" + zoneNrL + " : " + queueNum); }
}catch(err){GM_log("ERROR drawQueueItemBox \n"+err);}
}
function drawQueueListSmall(zoneNrF, zoneNrL, appendTo){
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	appendTo.style.display="none";
	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrF",zoneNrF);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	var lRepeat=(!OPTION_LIST_REPEAT || zoneNrF=="windmill")?false:!valUseQueueList?false:zoneSettings[zoneNrL]["repeat"]==undefined?false:zoneSettings[zoneNrL]["repeat"];
	var lShuffle=!valUseQueueList?false:zoneSettings[zoneNrL]["shuffle"]==undefined?false:zoneSettings[zoneNrL]["shuffle"];
 	var fzType=getBuildingTyp(zoneNrF);

	createElement("div",{id:"divQueueItemListTitle"+zoneNrL,"class":"divQueueItemListTitle"},appendTo, getZoneName(zoneNrF,zoneNrL, null, false, true, true));
	createElement("div",{"class":"divQueueItemListTitle2"},appendTo,((lRepeat && lShuffle)?texte["automat"]["QueRepeatShuffle"]:(lShuffle?texte["automat"]["QueShuffle"]:(lRepeat?texte["automat"]["QueRepeat"]:""))));
	createElement("div",{style:"clear:both;"},appendTo);

	var newdiv=null;
	if(false && fzType==3){//OPTION this show the factory begin product..
		for(var k=0;k<BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]].length;k++){
			newdiv=createElement("div",{id:"divQueueItemListList"+zoneNrL+"Q"+k+"Item","class":"divQueueItemListChooseItem v"+BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][k]},appendTo);
			createElement("div",{"class":"divQueueItemListNumber"},newdiv, FEEDBONUSTIME[BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][k]]);
		}
	}else{
		for(queueNum=0;queueNum<zoneList[zoneNrL].length; queueNum++){
			if(!valUseQueueList && queueNum>0 && getBuildingTyp(zoneNrL)==1) break;
			if(fzType=="windmill"){
				newdiv=createElement("div",{id:"divQueueItemListList"+zoneNrL+"Q"+queueNum+"Item","class":"divQueueItemListChooseItem"},appendTo);
				createElement("div",{"class":"fmm"+zoneList[zoneNrL][queueNum][0],style:"position:relative;"},newdiv);
			}else if(fzType=="sawmill"||fzType=="carpentry"||fzType=="forest"){
				newdiv=createElement("div",{id:"divQueueItemListList"+zoneNrL+"Q"+queueNum+"Item","class":"divQueueItemListChooseItem f_symbol"+zoneList[zoneNrL][queueNum][0]},appendTo);
			}else{
				newdiv=createElement("div",{id:"divQueueItemListList"+zoneNrL+"Q"+queueNum+"Item","class":"divQueueItemListChooseItem v"+zoneList[zoneNrL][queueNum][0]},appendTo);
			}
			if(fzType!=3 && zoneList[zoneNrL][queueNum][0]!=PRODSTOP){
				var iLastInf=((zoneList[zoneNrL].length-1)==queueNum) && !lRepeat && !lShuffle;
				var amount=""+Math.max(0,zoneList[zoneNrL][queueNum][1] - zoneList[zoneNrL][queueNum][2]);
				createElement("div",{"class":"divQueueItemListNumber"},newdiv,((!valUseQueueList && fzType==1)||lRepeat&&iLastInf)?sign_inf:amount);
			}
		}
	}
	newdiv=null;
	appendTo.style.display="block";
}
function drawQueueChooseItemBox(zoneNrS, zoneNrL, queueNum, appendTo){
try{
	// GM_log("Begin drawQueueChooseItemBox zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+" queueNum="+queueNum+" appendTo.id="+appendTo.id);
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	if(queueNum==undefined){ queueNum=0; }
	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrS",zoneNrS);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	appendTo.setAttribute("queueNum",queueNum);
	var fzZoneType=getZoneTyp(zoneNrS);
	createElement("div",{"id":"divChooseTitle"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrS,zoneNrL, ($("divChooseBoxInner")==appendTo)?queueNum:null, true, true, true));
	createElement("div",{"id":"divChooseEndTime"+zoneNrL,"class":"queueTime"},appendTo);
	createElement("div",{"style":"clear:both;"},appendTo);

	newdiv=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum + "I"+PRODSTOP,"class":"divChooseItem link v"+PRODSTOP,"product":PRODSTOP},appendTo);
	newdiv.addEventListener("click",function(){
			var zoneNrS=this.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			zoneList[zoneNrL][queueNum]=DEFAULT_ZONELIST_ITEM.clone();
			hideToolTip(this);
			if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
			updateQueueBox(zoneNrS, zoneNrL);
	},false);
	newdiv.addEventListener("mouseover", function(evt){
		var zoneNrS=this.parentNode.getAttribute("zoneNrS");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		showToolTip(evt, toolTipProductSmall(zoneNrS, zoneNrL, queueNum, this));
	},false);
	for(var iProd=0;iProd<unsafeData.prodName[0].length;iProd++){
		//if((unsafeData.prodTyp[0][iProd]=="v")&&!(unsafeData.prodBlock[0][iProd]&&unsafeData.prodBlock[0][iProd].match(/l/))){
		if((unsafeData.PRODUCT2BUILDING[0][iProd]==fzZoneType)&&!(unsafeData.prodBlock[0][iProd]&&unsafeData.prodBlock[0][iProd].match(/[lq]/))){
			newdiv=createElement("div",{"id":"divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd,"class":"divChooseItem link v"+iProd,"product":iProd},appendTo);
			newdiv.style.opacity=(unsafeData.prodStock[0][iProd]&&unsafeData.prodStock[0][iProd]>0)?1:0.4;
			newdiv.addEventListener("click",function(){
				var zoneNrS=this.parentNode.getAttribute("zoneNrS");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				var product=parseInt(this.getAttribute("product"),10);
				if(zoneList[zoneNrL][queueNum][0]!=product){
					zoneList[zoneNrL][queueNum][0]=product;
					zoneList[zoneNrL][queueNum][1]=(zoneNrS!="windmill"&&zoneList[zoneNrL][queueNum][3])?((unsafeData.prodMinRack&&(unsafeData.prodMinRack[0][product]!=undefined))?unsafeData.prodMinRack[0][product]:100):(zoneList[zoneNrL][queueNum][1]>=1?zoneList[zoneNrL][queueNum][1]:1);
					zoneList[zoneNrL][queueNum][2]=0;
				}
				hideToolTip(this);
				if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
				updateQueueBox(zoneNrS, zoneNrL);
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				var zoneNrS=this.parentNode.getAttribute("zoneNrS");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				showToolTip(evt, toolTipProductSmall(zoneNrS, zoneNrL, queueNum, this));
			},false);
		}
	}
/*
	if(valUseQueueList){ //TODO //display powerups
		createElement("div",{style:"clear:both;"},appendTo);
		createElement("div",{style:"width:100%;border-top:1px solid white;margin-top:4px;padding-top:4px;height:0px;"},appendTo);
		for(var v in unsafeWindow.powerupcontent){
			if(!unsafeWindow.powerupcontent.hasOwnProperty(v)){ continue; }
			if(unsafeWindow.powerupcontent[v][5][0]==0){
				rProd=unsafeWindow.powerupcontent[v][0];
				iProd=unsafeWindow.powerupcontent[v][5][1]==0?unsafeWindow.powerupcontent[v][5][2][0]:unsafeWindow.powerupcontent[v][5][1][0];
				newdiv=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum+"R"+rProd,"class":"divChooseItem link r"+rProd,"product":rProd},appendTo);
				createElement("div",{"class":"kp"+iProd,style:"position:absolute;right:0px;bottom:0px;"},newdiv);
				// newdiv.addEventListener("click", function(){
				// },false);
				newdiv.addEventListener("mouseover",function(evt){
					var zoneNrS=this.parentNode.getAttribute("zoneNrS");
					var zoneNrL=this.parentNode.getAttribute("zoneNrL");
					var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
					showToolTip(evt, toolTipProductSmall(zoneNrS, zoneNrL, queueNum, this));
				},false);
			}
		}
	}
*/
	if(appendTo==$("divChooseBoxInner")){
		$("divChooseBox").style.display="block";
		$("divChooseBox").style.top=Math.round(255 - $("divChooseBox").offsetHeight/2)+"px";
	}
	newdiv=null;appendTo=null;
	updateQueueBox(zoneNrS, zoneNrL);
	// GM_log("End drawQueueChooseItemBox :" + zoneNrL);
}catch(err){GM_log("ERROR drawQueueChooseItemBox \n"+err);}
}
function drawFactoryChooseItemBox(zoneNrS, zoneNrL, appendTo){
try{
	// GM_log("Begin drawFactoryChooseItemBox :" + zoneNrS+":"+zoneNrL);
	var zoneNrF=zoneNrS.toString().replace(/\.\d+$/,"");
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrF",zoneNrF);
	appendTo.setAttribute("zoneNrS",zoneNrS);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	appendTo.setAttribute("queueNum",0);
	createElement("div",{"id":"divChooseTitle"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrS,zoneNrL,null,true,true,true,true));
	createElement("div",{"id":"divChooseEndTime"+zoneNrL,"class":"queueTime"},appendTo);
	createElement("div",{"style":"clear:both;"},appendTo);
	newdiv=createElement("div",{"class":"divChooseItem link v"+PRODSTOP,"id":"divChooseItem"+zoneNrL+"Q0I"+PRODSTOP},appendTo);
	if(zoneList[zoneNrL][0][0]==PRODSTOP){ newdiv.style.border="2px solid black"; }
	newdiv.addEventListener("click",function(){
		var zoneNrF=this.parentNode.getAttribute("zoneNrF");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
		if(this.parentNode==$("divChooseBoxInner")){ click($("divChooseBoxClose")); }
		updateQueueBox(zoneNrF, zoneNrL);
	},false);
	newdiv.addEventListener("mouseover", function(evt){
		var zoneNrF=this.parentNode.getAttribute("zoneNrF");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		showToolTip(evt, toolTipProductSmall(zoneNrF, zoneNrL, 0, this));
	},false);
	for(var v in unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrS)]){
		if(!unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrS)].hasOwnProperty(v)){ continue; }
		if(unsafeData.prodBlock[0][v]){ continue; }
		newdiv=createElement("div",{"class":"divChooseItem link v"+v,"id":"divChooseItem"+zoneNrL+"Q0I"+v},appendTo);
		if(zoneList[zoneNrL][0][0]==v){ newdiv.style.border="2px solid black"; }
		newdiv.addEventListener("click",function(){
			var zoneNrF=this.parentNode.getAttribute("zoneNrF");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
			zoneList[zoneNrL][0][0]=parseInt(/Q0I(.*)$/.exec(this.id)[1],10);
			if(this.parentNode==$("divChooseBoxInner")){ click($("divChooseBoxClose")); }
			updateQueueBox(zoneNrF, zoneNrL);
		},false);
		newdiv.addEventListener("mouseover", function(evt){
			var zoneNrS=this.parentNode.getAttribute("zoneNrS");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			showToolTip(evt, toolTipProductSmall(zoneNrS, zoneNrL, 0, this));
		},false);
	}
	if(appendTo==$("divChooseBoxInner")){
		$("divChooseBox").style.display="block";
		$("divChooseBox").style.top=Math.round(255 - $("divChooseBox").offsetHeight/2)+"px";
	}
	updateQueueBox(zoneNrF, zoneNrL);
	zoneFeedCurr=null;zoneProdCurr=null;
	newdiv=null;appendTo=null;
	// GM_log("End drawFactoryChooseItemBox :" + zoneNrL);
}catch(err){GM_log("ERROR drawFactoryChooseItemBox \n"+err);}
}
function drawStableChooseFeedBox(zoneNrF, zoneNrL, appendTo){
try{
	// GM_log("Begin drawStableChooseFeedBox zoneNrF:" + zoneNrF + " zoneNrL:"+zoneNrL);
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	var level=parseInt($("levelnum").innerHTML,10);

	// catch bad data
	// should be zoneList[zoneNrL]=[[feed1,amount1,0,false],[feed2,amount2,0,false]]
	// or if deactivated [[PRODSTOP,amount1,0],[PRODSTOP,amount2,0]]
	if(zoneList[zoneNrL].length!=2){
		zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY2.clone();
	}else{
		if(zoneList[zoneNrL][0][0]==PRODSTOP){ zoneList[zoneNrL][0]=DEFAULT_ZONELIST_ITEM.clone(); }
		if(zoneList[zoneNrL][1][0]==PRODSTOP){ zoneList[zoneNrL][1]=DEFAULT_ZONELIST_ITEM.clone(); }
	}

	var feedSort=[,];
	var feedAmount=[0,0];
	var feedMax=[0,0];
	var feedTime=[,];
	// the time needed if full fed
	var growTime=30 * unsafeData.prodGrowTime[0][unsafeData.BUILDING2PRODUCT[unsafeData.zoneTyp[zoneNrF]][0]] * getFarmZoneBonus(zoneNrF, null);
	if(unsafeWindow.premium==0 && level>9){ growTime -=1; } // small hack. non-premiums cant feed completely

	function calcStableChooseFeedBox(index,val){
		var noTime=false;
		// GM_log("calcStableChooseFeedBox "+index+":"+val);
		feedAmount[index]=val;
		var cand=appendTo.getElementsByClassName("divChooseFeed");
		cand[index].getElementsByClassName("divChooseFeedAmountSpan")[0].innerHTML=feedAmount[index];
		cand=null;
		if(feedAmount[0]+feedAmount[1]==0){
			// no feed
			zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY2;
		}else{
			// feed
			var calcTime=feedAmount[index]*feedTime[index];
			index=(index+1)%2;
			if(feedSort[index]){
				if(feedAmount[index]>0){
					if(feedAmount[(index+1)%2]>0){ calcTime++; } // a bit time is lost when 2 feeds are used
					var help=calcTime+feedAmount[index]*feedTime[index];
					while((feedAmount[index]>0) && (help>growTime)){
						feedAmount[index]--;
						help=calcTime+feedAmount[index]*feedTime[index];
					}
					calcTime=help-1;
				}
			}
			if(feedAmount[0]>feedAmount[1]){
				zoneList[zoneNrL]=[[feedSort[0],feedAmount[0],0,false],[feedSort[1],feedAmount[1],0,false]];
			}else{
				zoneList[zoneNrL]=[[feedSort[1],feedAmount[1],0,false],[feedSort[0],feedAmount[0],0,false]];
			}
		}

		GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList", implode(zoneList,"calcStableChooseFeedBox/zoneList"));
		updateQueueBox(zoneNrF, zoneNrL);
	}

	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrF",zoneNrF);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	appendTo.setAttribute("queueNum",0);

	createElement("div",{"id":"divChooseTitle"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrF,zoneNrL,null,true,true,true,true));
	var newdiv=createElement("div",{"id":"divChooseEndTime"+zoneNrL,"class":"divChooseFeedTime"},appendTo);
	createElement("div",{"style":"clear:both;"},appendTo);
	var newdiv1,newspan;

	for(var k=0;k<BUILDING2FEED[getZoneTyp(zoneNrF)].length;k++){
		var iProd=BUILDING2FEED[getZoneTyp(zoneNrF)][k];
		var queueNum=(zoneList[zoneNrL][0][0]==iProd?0:1);

		newdiv=createElement("div",{"name":k,"queueNum":queueNum,"class":"divChooseFeed"},appendTo);
		newitem=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum+"I","class":"divChooseFeedIcon v"+iProd,"product":iProd},newdiv);
		newitem.addEventListener("mouseover", function(evt){
			var zoneNrF=this.parentNode.parentNode.getAttribute("zoneNrF");
			var zoneNrL=this.parentNode.parentNode.getAttribute("zoneNrL");
			showToolTip(evt, toolTipProductSmall(zoneNrF, zoneNrL, this.parentNode.getAttribute("name"), this));
		},false);

		// if(unsafeWindow.produkt_level[iProd]<=level){
		if(!(unsafeData.prodBlock[0][iProd]&&unsafeData.prodBlock[0][iProd].match(/l/))){
			feedSort[k]=iProd;
			feedAmount[k]=zoneList[zoneNrL][queueNum][1];
			feedTime[k]=FEEDBONUSTIME[iProd]/unsafeData.zoneAnimals[zoneNrF];
			feedMax[k]=Math.floor(growTime/feedTime[k],1);

			newdiv1=createElement("div",{"class":"link divChooseFeedAmount","id":"divChooseFeedAmount"+zoneNrL+"Q"+iProd+"I"},newdiv);
			var help=((($("divChooseBoxInner")==$("divChooseEndTime"+zoneNrL).parentNode)?243:243)/feedMax[k])-1; //TODO
			for(var v=1;v<=Math.max(1,feedMax[k]);v++){
				newval=createElement("div",{style:"width:"+help+"px;"+(v==1?"border:none;":"")},newdiv1);
				newval.setAttribute("value",v);
				newval.addEventListener("mouseover", function(evt){ showToolTip(evt, this.getAttribute("value"));},false);
			}
			newdiv1.addEventListener("click",function(event){
				var help=parseInt(event.target.getAttribute("value"),10);
				if(!isNaN(help)){ calcStableChooseFeedBox(parseInt(this.parentNode.getAttribute("name"),10),help); }
			},false);

			newdiv1=createElement("div",{style:"float:left;margin-top:2px;margin-left:5px;color:black;font-weight:bold;"},newdiv);
			createElement("span",{"class":"divChooseFeedAmountSpan","id":"divChooseFeedAmountSpan"+zoneNrL+"Q"+iProd+"I"},newdiv1,zoneList[zoneNrL][0][1]);
			createElement("span",{style:"margin-right:5px;"},newdiv1,"&nbsp;"+unsafeData.prodName[0][iProd]);

			newdiv1=createElement("div",{style:"float:right;margin-top:2px;color:black;font-weight:bold;"},newdiv);
			newspan=createElement("span",{"class":"divChooseFeedButton link"},newdiv1,feedMax[k]);
			newspan.addEventListener("click",function(event){
				var help=parseInt(this.parentNode.parentNode.getAttribute("name"),10);
				calcStableChooseFeedBox(help,feedMax[help]);
			},false);
			newspan=createElement("span",{"class":"divChooseFeedButton link"},newdiv1,"+");
			newspan.addEventListener("click",function(event){
				var help=parseInt(this.parentNode.parentNode.getAttribute("name"),10);
				calcStableChooseFeedBox(help,Math.min(feedMax[help],feedAmount[help]+1));
			},false);
			newspan=createElement("span",{"class":"divChooseFeedButton link"},newdiv1,"-");
			newspan.addEventListener("click",function(event){
				var help=parseInt(this.parentNode.parentNode.getAttribute("name"),10);
				calcStableChooseFeedBox(help,Math.max(0,feedAmount[help]-1));
			},false);
			newspan=createElement("span",{"class":"divChooseFeedButton link"},newdiv1,"0");
			newspan.addEventListener("click",function(event){
				var help=parseInt(this.parentNode.parentNode.getAttribute("name"),10);
				calcStableChooseFeedBox(help,0);
			},false);
		}
	}
	if(appendTo==$("divChooseBoxInner")){
		$("divChooseBox").style.display="block";
		$("divChooseBox").style.top=Math.round(255 - $("divChooseBox").offsetHeight/2)+"px";
	}
	// updateQueueBox(zoneNrF, zoneNrL);
	calcStableChooseFeedBox(0,feedAmount[0]);
	newdiv=null;newdiv1=null;newspan=null;newitem=null;newval=null;
	// GM_log("End drawStableChooseFeedBox :" + zoneNrF);
}catch(err){GM_log("ERROR drawStableChooseFeedBox \n"+err);}
}

function drawMillChooseItemBox(zoneNrF, zoneNrL, queueNum, appendTo){
try {
	// GM_log("Begin drawMillChooseItemBox :" + queueNum);
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	if(queueNum==undefined) queueNum=0;
	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrF",zoneNrF);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	appendTo.setAttribute("queueNum",queueNum);

	createElement("div",{"id":"divChooseTitle"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrF,zoneNrL, ($("divChooseBoxInner")==appendTo)?queueNum:null), false, true ,true);
	createElement("div",{"id":"divChooseEndTime"+zoneNrL,"class":"queueTime"},appendTo);
	createElement("div",{"style":"clear:both;"},appendTo);

	newdiv=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum + "I"+PRODSTOP,"class":"divMillChooseItem link","product":PRODSTOP},appendTo);
	newdiv.addEventListener("click",function(){
			var zoneNrF=this.parentNode.getAttribute("zoneNrF");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			// GM_log("Click" + zoneNrF + " : " + queueNum + " : " + 0);
			zoneList[zoneNrL][queueNum]=DEFAULT_ZONELIST_MILL.clone();
			hideToolTip(this);
			if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
			updateQueueBox(zoneNrF, zoneNrL);
	},false);
	newdiv.addEventListener("mouseover", function(evt){ showToolTip(evt, texte["automat"]["QueDontWork"]);},false);
	newdiv.style.backgroundColor=(zoneList[zoneNrL][0][0]==PRODSTOP)? "black":"";
	createElement("div",{"class":"fm"+PRODSTOP,style:"position:relative;"},newdiv);
	createElement("div",{"class":"divMillChooseItemNumber"},newdiv,sign_inf);

	for(var iProd in autoMillStorage){
		if(!autoMillStorage.hasOwnProperty(iProd)){continue;}
		if((autoMillStorage[iProd][0]-autoMillStorage[iProd][1]) > 0){
			newdiv=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd,"class":"divMillChooseItem link","product":iProd},appendTo);
			newdiv.addEventListener("click",function(){
				var zoneNrF=this.parentNode.getAttribute("zoneNrF");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				var recipe=parseInt(this.getAttribute("product"),10);
				// GM_log("Click" + zoneNrF + " : " + queueNum + " : " + recipe);
				if(zoneList[zoneNrL][queueNum][0]!=recipe) zoneList[zoneNrL][queueNum]=[recipe,1,0,0,[]];
				hideToolTip(this);
				if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
				updateQueueBox(zoneNrF, zoneNrL);
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				showToolTip(evt, unsafeWindow.showFormulaInfos(parseInt(this.childNodes[0].getAttribute("class").replace("fm",""),10)));
			},false);
			newdiv.style.backgroundColor=(zoneList[zoneNrL][queueNum][0]==iProd)? "black":"";
			createElement("div",{"class":"fm"+iProd,style:"position:absolute;"},newdiv);
			createElement("div",{"class":"divMillChooseItemNumber"},newdiv,(autoMillStorage[iProd][0]-autoMillStorage[iProd][1]));
		}
	}
	if(appendTo==$("divChooseBoxInner")){
		$("divChooseBox").style.display="block";
		$("divChooseBox").style.top=Math.round(255 - $("divChooseBox").offsetHeight/2)+"px";
	}
	updateQueueBox(zoneNrF,zoneNrL);
	newdiv=null;appendTo=null;
	// GM_log("End drawMillChooseItemBox :" + queueNum);
}catch(err){GM_log("ERROR drawMillChooseItemBox \n"+err);}
}
function drawForestryChooseItemBox(zoneNrF, zoneNrL, queueNum, appendTo){
try{
	// GM_log("Begin drawForestryChooseItemBox zoneNrF:"+zoneNrF+" zoneNrL:" + zoneNrL);
	var fzType=getBuildingTyp(zoneNrF);
	var zoneStockTyp = (fzType=="forest"?"f1":(fzType=="sawmill"?"f3":(fzType=="carpentry"?"f4":null)));
	// GM_log("drawForestryChooseItemBox zoneStockTyp:"+zoneStockTyp);
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	if(queueNum==undefined) queueNum=0;
	var level=parseInt($("levelnum").innerHTML,10);
	appendTo.innerHTML="";
	appendTo.setAttribute("zoneNrF",zoneNrF);
	appendTo.setAttribute("zoneNrL",zoneNrL);
	appendTo.setAttribute("queueNum",queueNum);
	createElement("div",{"id":"divChooseTitle"+zoneNrL,"class":"queueTitle"},appendTo, getZoneName(zoneNrF,zoneNrL, ($("divChooseBoxInner")==appendTo)?queueNum:null, true, true, true));
	createElement("div",{"id":"divChooseEndTime"+zoneNrL,"class":"queueTime"},appendTo);
	createElement("div",{"style":"clear:both;"},appendTo);

	newdiv=createElement("div",{id:"divChooseItem"+zoneNrL+"Q"+queueNum + "I"+PRODSTOP,"class":"divChooseItem link f_symbol"+PRODSTOP,"product":PRODSTOP},appendTo);
	newdiv.addEventListener("click",function(){
			var zoneNrF	=this.parentNode.getAttribute("zoneNrF");
			var zoneNrL=this.parentNode.getAttribute("zoneNrL");
			var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
			zoneList[zoneNrL][queueNum]=DEFAULT_ZONELIST_ITEM.clone();
			hideToolTip(this);
			if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
			updateQueueBox(zoneNrF, zoneNrL);
	},false);
	newdiv.addEventListener("mouseover", function(evt){
		var zoneNrF=this.parentNode.getAttribute("zoneNrF");
		var zoneNrL=this.parentNode.getAttribute("zoneNrL");
		var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
		showToolTip(evt, toolTipProductSmall(zoneNrF, zoneNrL, queueNum, this));
	},false);

	// GM_log("drawForestryChooseItemBox prodName:"+implode(unsafeData.prodName[1],"GMprodName[1]"));
	for(var iProd in unsafeData.prodName[1]){
		if(!unsafeData.prodName[1].hasOwnProperty(iProd)){continue;}
		if(unsafeData.prodTyp[1][iProd]!=zoneStockTyp){continue;}
		var help,opacity=false;
		// GM_log("drawForestryChooseItemBox iProd:"+iProd+" prodTyp:"+unsafeData.prodTyp[1][iProd]+" prodBlock:"+unsafeData.prodBlock[1][iProd]);
		if(!(unsafeData.prodBlock[1][iProd]&&unsafeData.prodBlock[1][iProd].match(/q/))){
			newdiv=createElement("div",{"id":"divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd,"class":"divChooseItem link f_symbol"+iProd,"product":iProd},appendTo);
			opacity=false;help=null;
			for(var i in unsafeData.prodRequire[1][iProd]){
				if(!unsafeData.prodRequire[1][iProd].hasOwnProperty(i)){continue;}
				help=unsafeData.prodRequire[1][iProd][i];
				//GM_log("drawForestryChooseItemBox prodStock["+help[0]+"]["+help[1]+"]:"+unsafeData.prodStock[help[0]][help[1]]+" > "+help[2]);
				opacity=opacity&&(unsafeData.prodStock[help[0]][help[1]]>help[2]);
			}
			newdiv.style.opacity=(opacity)?0.4:1;
			newdiv.addEventListener("click",function(){
				var zoneNrF=this.parentNode.getAttribute("zoneNrF");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				var product=parseInt(this.getAttribute("product"),10);
				if(zoneList[zoneNrL][queueNum][0]!=product){
					zoneList[zoneNrL][queueNum][0]=product;
					zoneList[zoneNrL][queueNum][1]=(zoneNrF!="windmill"&&zoneList[zoneNrL][queueNum][3])?((unsafeData.prodMinRack&&(unsafeData.prodMinRack[0][product]!=undefined))?unsafeData.prodMinRack[0][product]:100):(zoneList[zoneNrL][queueNum][1]>=1?zoneList[zoneNrL][queueNum][1]:1);
					zoneList[zoneNrL][queueNum][2]=0;
				}
				hideToolTip(this);
				if(this.parentNode==$("divChooseBoxInner")) click($("divChooseBoxClose"));
				updateQueueBox(zoneNrF, zoneNrL);
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				var zoneNrF=this.parentNode.getAttribute("zoneNrF");
				var zoneNrL=this.parentNode.getAttribute("zoneNrL");
				var queueNum=parseInt(this.parentNode.getAttribute("queueNum"),10);
				showToolTip(evt, toolTipProductSmall(zoneNrF, zoneNrL, queueNum, this));
			},false);
		}
	}
	if(appendTo==$("divChooseBoxInner")){
		$("divChooseBox").style.display="block";
		$("divChooseBox").style.top=Math.round(255 - $("divChooseBox").offsetHeight/2)+"px";
	}
	newdiv=null;appendTo=null;
	updateQueueBox(zoneNrF, zoneNrL);
	// GM_log("End drawForestryChooseItemBox zoneNrF:"+zoneNrF+" zoneNrL:" + zoneNrL);
}catch(err){GM_log("ERROR drawForestryChooseItemBox iProd:"+iProd+"\n"+err);}
}
function updateQueueBox(zoneNrS,zoneNrL){
try{
	if(DEVMODE_FUNCTION){ GM_log("Begin updateQueueBox zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL); }
	if(zoneNrS==undefined){ return; }
	var err_trace="init";
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	var fzType=getBuildingTyp(zoneNrS);
	var fzZoneType=getZoneTyp(zoneNrS);
	var fzWindmill=(fzType=="windmill");
	var fzForestry=(fzType=="forest"||fzType=="sawmill"||fzType=="carpentry");
	var iType=(fzWindmill?3:(fzForestry?1:0));
	var noTime=false;
	var level=parseInt($("levelnum").innerHTML,10);
	var zones=getZonesFromList(zoneNrL);
	var lShowTime=(zones.length>0);
	var zoneTimes=getZoneTimes(zoneNrL);
	// GM_log("updateQueueBox zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+" zonetimes="+implode(zoneTimes,"updateQueueBox/zoneTimes"));
	
	if(fzWindmill){ reCalculateWindmill(); }
	// automat icons
	err_trace="automat icons collect";
	var automatIcons=[];
	for(var i=0;i<zones.length;i++){
		if(isVisibleZone(zones[i])){
			automatIcons.push(zones[i]);
			if(zones[i].match(/\.1$/)){
				automatIcons.push(zones[i].replace(/\.1$/,""));
			}
		}
	}
	if(fzWindmill||fzForestry){
		automatIcons.push("global_"+zoneNrS);
	}
	err_trace="automat icons update";
	for(var i=0;i<automatIcons.length;i++){
		var farmIcon=$("divAutomatIcon_"+automatIcons[i]);
		if(farmIcon){
			switch(fzType){
			case "windmill":
				// farmIcon.setAttribute("class","link divWindmillIcon");
				farmIcon.childNodes[0].setAttribute("class","fmm"+zoneList[zoneNrL][0][0]);
			break;
			case "forest":case "sawmill":case "carpentry":
				farmIcon.childNodes[0].setAttribute("class","f_symbol"+zoneList[zoneNrL][0][0]);
				// farmIcon.setAttribute("class","link divForestryIcon f_symbol"+zoneList[zoneNrL][0][0]);
			break;
			case 1: // Field
			case 3: // Factory
				farmIcon.setAttribute("class","link divZoneIcon v"+zoneList[zoneNrL][0][0]);
			break;
			case 2: // Stable
				//catch wrong feed
				var futter1=BUILDING2FEED[fzZoneType][0];
				var futter2=BUILDING2FEED[fzZoneType][1];
				for(var queueNum=0;queueNum<zoneList[zoneNrL].length;queueNum++){
					if((zoneList[zoneNrL][queueNum][0]!=futter1)&&(zoneList[zoneNrL][queueNum][0]!=futter2)&&(zoneList[zoneNrL][queueNum][0]!=PRODSTOP)){
						zoneList[zoneNrL][queueNum]=DEFAULT_ZONELIST_ITEM.clone();
						queueNum--;
					}
				}
				queueNum=null;
				farmIcon.setAttribute("class","link divZoneIcon v"+zoneList[zoneNrL][0][0]);
			break;
			}
			farmIcon.setAttribute("product",zoneList[zoneNrL][0][0]);
			farmIcon.setAttribute("zoneBeginTime",implode(zoneTimes,"updateQueueBox/zoneTimes"));
			farmIcon.style.display="block";
			farmIcon=null;
		}
	}
	//queue list
	err_trace="queue list";
	if($("divAutoMatQueueBox"+zoneNrL)){ 
		// GM_log("updateQueueBox Box :" + zoneNrL);
		var totalInQue=0;
		var foundStop=false;
		var lRepeat=(!OPTION_LIST_REPEAT || zoneSettings[zoneNrL]["repeat"]==undefined)?false:zoneSettings[zoneNrL]["repeat"];
		var lShuffle=zoneSettings[zoneNrL]["shuffle"]==undefined?false:zoneSettings[zoneNrL]["shuffle"];
		var newRackAmount=new Array(); //array with all culterd products until that moment.
		var fRepeat=OPTION_LIST_REPEAT?lRepeat:false; //foundRepeat

		for(queueNum=0;queueNum<zoneList[zoneNrL].length;queueNum++){
			// GM_log("updateQueueBox Box :" + zoneNrS + ":"+queueNum + " | " + zoneList[zoneNrL].length);
			var iRepeat=(!OPTION_ITEM_REPEAT||fzWindmill)?false:zoneList[zoneNrL][queueNum][4];
			fRepeat=fRepeat||(OPTION_ITEM_REPEAT?iRepeat:false);
			var iLastInf=fzWindmill?false:(((zoneList[zoneNrL].length-1)==queueNum) && !fRepeat && !lShuffle);
			var iRackMode=!iLastInf && !fzWindmill && zoneList[zoneNrL][queueNum][3];
			var iProd=parseInt(zoneList[zoneNrL][queueNum][0],10);
			var iStop=(iProd==PRODSTOP);
			var iDone=iRackMode?0:parseInt(zoneList[zoneNrL][queueNum][2],10);
			var iTot=parseInt(zoneList[zoneNrL][queueNum][1],10);
			var iTogo=iRackMode?0:(iLastInf?(11*(zones.length)):iTot-iDone);
			var iTogoAmount=0,iTogoScore=0;
			var iRequireMissing=false;
			if(iStop){
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).style.backgroundColor=(foundStop?"red":"transparent");
				foundStop=true;
			}else{
				for(var i in unsafeData.prodRequire[iType][iProd]){
					if(!unsafeData.prodRequire[iType][iProd].hasOwnProperty(i)){continue;}
					if(iRequireMissing){continue;}
					if(iTot*unsafeData.prodRequire[iType][iProd][i][2]-unsafeData.prodStock[unsafeData.prodRequire[iType][iProd][i][0]][unsafeData.prodRequire[iType][iProd][i][1]]>0){
						iRequireMissing=true;
					}
				}			
				if(!newRackAmount[iProd] && !fzWindmill){ newRackAmount[iProd]=calcInGameProductAmount(iProd, zoneNrS, null, true); }
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).style.backgroundColor=(foundStop?"red":(iRequireMissing?"yellow":"transparent"));
			}

			if(valShowQueueTime){
				var beginTime=new Object();
				var timeArray=new Object();
				var timesArray=new Object();
				var iTogoArray=new Object();
				var endTime=zoneTimes[getLowestTimeFarmZone(zoneTimes)];
				var currFeldPositions=0;

				if(fzWindmill){
					beginTime[zoneNrS]=zoneTimes[zoneNrS];
					timeArray[zoneNrS]=calcProductionTime(iProd, zoneNrS);
					if(!timesArray[zoneNrS]) timesArray[zoneNrS]=new Array();
					iTogoArray[zoneNrS]=0;
					for(var k=0;k<iTogo;k++){
						zoneTimes[zoneNrS] +=timeArray[zoneNrS];
						if(timesArray[zoneNrS].length<=10) timesArray[zoneNrS][timesArray[zoneNrS].length]=zoneTimes[zoneNrS];
						iTogoArray[zoneNrS]++;
					}
					endTime=zoneTimes[zoneNrS];
				}else if(iTot<=0 || iStop){ //don't do any thing just give the begin info.
					for(var fz in zoneTimes){
						if(!zoneTimes.hasOwnProperty(fz)){ continue; }
						if(isNaN(iTogoArray[fz])) iTogoArray[fz]=0;
						iTogoArray[fz]++;
						if(!beginTime[fz]) beginTime[fz]=zoneTimes[fz];
						if(!timeArray[fz]) timeArray[fz]=calcProductionTime(iProd, getZoneNameCorrected(fz));
					}
				}else if(!iRackMode){
					for(var k=0;k<iTogo;k++){
						var fz=getLowestTimeFarmZone(zoneTimes);
						var bt=getBuildingTyp(fz);
						if(!beginTime[fz]) beginTime[fz]=zoneTimes[fz];
						if(!timeArray[fz]) timeArray[fz]=calcProductionTime(iProd, fz);
						if(isNaN(iTogoArray[fz])) iTogoArray[fz]=0;
						iTogoArray[fz]++;
						currFeldPositions=calcProductPositions(iProd, fz);
						zoneTimes[fz] +=timeArray[fz]+((unsafeWindow.premium==1)?0:(tmin2/1000)*currFeldPositions);
						if(!timesArray[fz]){ //this is the amount that is plantend on a field. that last field returns them.
							timesArray[fz]=new Array();
							if(!fzForestry){ //TODO should be done with the prodrequire == prodYield check..
								iTogoAmount += currFeldPositions;
							}
						}
						if(timesArray[fz].length<=10) timesArray[fz][timesArray[fz].length]=zoneTimes[fz];
						iTogoAmount +=calcProductAmount(iProd, fz, currFeldPositions, zoneTimes[fz], true);
						iTogoScore +=calcProductScore(iProd, fz, currFeldPositions, zoneTimes[fz]);
						if(endTime < zoneTimes[fz]) endTime=zoneTimes[fz];
					}
				}else{ // if(iRackMode){
					while((newRackAmount[iProd]+iTogoAmount) < iTot){
						var fz=getLowestTimeFarmZone(zoneTimes);
						var cfz=getZoneNameCorrected(fz);
						if(!beginTime[fz]) beginTime[fz]=zoneTimes[fz];
						if(!timeArray[fz]) timeArray[fz]=calcProductionTime(iProd, cfz);
						if(isNaN(iTogoArray[fz])) iTogoArray[fz]=0;
						iTogoArray[fz]++;
						currFeldPositions=calcProductPositions(iProd,cfz);
						zoneTimes[fz] +=timeArray[fz]+(unsafeWindow.premium==1?0:(tmax2/1000)*currFeldPositions);
						if(!timesArray[fz]){
							timesArray[fz]=new Array();
							iTogoAmount +=currFeldPositions;//this is the amount that is plantend on a field. that last field returns them.
						}
						if(timesArray[fz].length<=10) timesArray[fz][timesArray[fz].length]=zoneTimes[fz];
						iTogoAmount +=calcProductAmount(iProd, cfz, currFeldPositions, zoneTimes[fz], true);
						iTogoScore +=calcProductScore(iProd, cfz, currFeldPositions, zoneTimes[fz]);
						iTogo++;
						if(endTime < zoneTimes[fz]) endTime=zoneTimes[fz];
					}
					// GM_log("updateAMount:"+newRackAmount[iProd]);
				}
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("timeArray",implode(timeArray,"updateQueueBox/timeArray"));
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("iTogoArray",implode(iTogoArray.sortObj(),"updateQueueBox/iTogoArray"));
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("timesArray",implode(timesArray.sortObj(),"updateQueueBox/timesArray"));
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("zoneBeginTime",implode(beginTime.sortObj(),"updateQueueBox/beginTime"));
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("zoneEndTime",implode(zoneTimes,"updateQueueBox/zoneTimes"));
				timeArray=null;beginTime=null;timesArray=null;iTogoArray=null;
			}else{
				iTogoAmount=iTogo*calcProductAmount(iProd, zoneNrS);
				iTogoScore=iTogo*calcProductScore(iProd, zoneNrS);
			}
			if(!fzWindmill && !iStop){
				newRackAmount[iProd] +=iTogoAmount;
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("iTogo",iTogo);//Not in Mill needed
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("iTogoAmount",iTogoAmount);//Not in Mill needed
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("iTogoScore",iTogoScore);//Not in Mill needed
			}
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("totalInQue",totalInQue);
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).setAttribute("foundStop",foundStop);
			totalInQue +=iTogo;

			// GM_log("updateQueueBox Box :" + zoneNrL + ":"+queueNum + " | 4");
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item").style.opacity=(iTogo<=0 && !iStop)? 0.4:1;
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item").setAttribute("product",iProd);
			if(fzWindmill){
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item").childNodes[0].className="fmm"+iProd;
			}else if(fzForestry){
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item").childNodes[0].className="f_symbol"+iProd;
			}else{
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Item").className="link queueItemProduct v"+iProd;
			}
			// GM_log("updateQueueBox Box :" + zoneNrL + ":"+queueNum + " | 5");
			$("divAutoMatQueueBox"+zoneNrL).style.width=($("divAutoMatQueueBox"+zoneNrL).parentNode==$("divQueueBoxInner"))?"348px":"530px";
			$("divAutoMatQueueBox"+zoneNrL).style.height=row7+2+((valShowQueueTime && lShowTime)?queueItemBoxTimeHeight:0)+"px";
			$("divAutoMatButton"+zoneNrL).style.height=row7+2+((valShowQueueTime && lShowTime)?queueItemBoxTimeHeight:0)+"px";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I1").className=(iRackMode)?"queueItemInput1 queueItemInputWidth1":"queueItemInput1 queueItemInputWidth2";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I1").value=(iTot==undefined)?1:iTot; //TODO remove setting val here
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I1").style.display=(iLastInf || iStop)?"none":"block";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I1").maxLength=(iRackMode)?"6":"4";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I2").value=(iDone==undefined)?0:iDone; //TODO remove setting val here
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I2").style.opacity=(iTogo<=0)? 0.4:1;
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"I2").style.display=(!iRackMode && (iRepeat || lRepeat) && !iStop)?"block":"none";
			if(OPTION_ITEM_REPEAT){
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Mode").style.display=(!iRackMode && !iStop)?"block":"none";
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Mode").style.backgroundImage="url("+(zoneList[zoneNrL][queueNum][4]?strImages["mode_repeat"]:strImages["mode_1time"])+")";

				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"IListRepeat").style.display=(!iRackMode && (iRepeat || lRepeat) && !iStop)?"block":"none";
				$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"IListRepeat").value=(zoneList[zoneNrL][queueNum][5]==undefined)?REPEAT_NO_LIMIT:zoneList[zoneNrL][queueNum][5];
			}
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"M").style.opacity=iTogo<=0? 0.4:1;
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"M").style.display=(iLastInf || iStop || iTot<=1) ?"none":"block";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"P").style.display=(iLastInf || iStop || (fzWindmill && autoMillStorage[iProd][0]<=autoMillStorage[iProd][1])) ?"none":"block";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"ET").innerHTML=(valShowQueueTime && lShowTime)?iLastInf?sign_inf:(getDateText(endTime,0) + "<br/>" + getDaytimeStr(endTime,true)):null;
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"ET").style.color=noTime? "#DD0000":"black";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"ET").style.display=(iTogo<=0 || foundStop || !valShowQueueTime || !lShowTime)?"none":"block";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"T").innerHTML=(iStop)?_TEXTE_STOP:sign_inf;
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"T").setAttribute("class",(iStop?"queueItemText queueItemTextStop":"queueItemText queueItemTextInf"));
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"T").style.display=(iLastInf || iStop)?"block":"none";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Up").style.display=(queueNum==0) ?"none":"block";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"Down").style.display=((zoneList[zoneNrL].length-1)==queueNum) ?"none":"block";

			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"A").style.top=((iRackMode))?row4+"px":"";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"D").style.left=(iRackMode)?col3+"px":"";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"D").style.display=(zoneList[zoneNrL].length > 1) ?"block":"none";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"B").style.display=(fzWindmill || iLastInf || iStop)?"none":"block";
			$("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum+"B").style.backgroundImage="url("+(iRackMode?strImages["functionR"]:strImages["functionF"])+")";
			// GM_log("updateQueueBox Box :" + zoneNrL + ":"+queueNum + " END");
		}
		// GM_log("updateQueueBox Box :" + zoneNrL + ":"+queueNum + " AFTER");

		$("divAutoMatEndTime"+zoneNrL).style.display=(valShowQueueTime)?"block":"none";
		if(valShowQueueTime){
			$("divAutoMatEndTime"+zoneNrL).innerHTML=(!fRepeat && !lShuffle && !foundStop && !fzWindmill)? texte["automat"]["inftext"]:(texte["automat"]["QueTimeReady"] + (lShowTime?(((!foundStop && (lRepeat || iRepeat || noTime))?" ~ ":" ") + getDateText(endTime,0) + "&nbsp;"+ getDaytimeStr(endTime,true)):" ~ ")); // why +- (\u00B1)?
			$("divAutoMatEndTime"+zoneNrL).style.color=(noTime?"#DD0000":((foundStop || fRepeat)?"#0000DD":"#000000"));
		}
	}
	zoneTimes=null;
	//ChooseBox part
	err_trace="ChooseBox";
	var divChooseEndTimeCurr = $("divChooseEndTime"+zoneNrL)
	if(divChooseEndTimeCurr){
		var zoneTimes=getZoneTimes(zoneNrL);
		// GM_log("updateQueueBox chooseBox zoneNrS:" + zoneNrS + " zoneNrL:" + zoneNrL + " queueNum:" + queueNum );
		var queueNum=divChooseEndTimeCurr.parentNode.getAttribute("queueNum");
		var foundStop=false;
		for(var i=0;i<=queueNum;i++){
			if(foundStop=zoneList[zoneNrL][i][0]==PRODSTOP) break;
		}
		// GM_log("updateQueueBox chooseBox foundStop:" + foundStop + " lShowTime:"+lShowTime);
		if(fzWindmill){ //windmill
			if(valShowQueueTime){
				divChooseEndTimeCurr.parentNode.setAttribute("zoneBeginTime",implode(zoneTimes,"updateQueueBox/chooseBox/zoneBeginTimes"));
				divChooseEndTimeCurr.style.display=lShowTime?"block":"none";
				if(lShowTime){
					var endTime=zoneTimes[zoneNrS] + calcProductionTime(zoneList[zoneNrL][queueNum][0],zoneNrS);
					divChooseEndTimeCurr.style.color=noTime? "#DD0000":"black";
					divChooseEndTimeCurr.innerHTML=(foundStop? texte["automat"]["QueDontWork"]:(($("divChooseBoxInner")==divChooseEndTimeCurr.parentNode)?texte["automat"]["QueTimeFirstReady"]:texte["automat"]["QueTimeReady"]) + " " + getDateText(endTime,0) + "&nbsp;"+ getDaytimeStr(endTime,true));
				}
			}
			$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+PRODSTOP).style.border=(zoneList[zoneNrL][queueNum][0]==PRODSTOP?"2px solid black":"");
			for(var iProd=0;iProd<autoMillStorage.length;iProd++){
				if(!autoMillStorage.hasOwnProperty(iProd)){continue;}
				if((autoMillStorage[iProd][0]-autoMillStorage[iProd][1])>0){
					$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd).style.border=(zoneList[zoneNrL][queueNum][0]==iProd)?"2px solid black":"";
				}
			}
			iProd=null;endTime=null;
		}else if(fzType==2){ //stable
			if(valShowQueueTime){
				divChooseEndTimeCurr.parentNode.setAttribute("zoneBeginTime",implode(zoneTimes,"updateQueueBox/chooseBox/zoneTimes"));
				divChooseEndTimeCurr.style.display=lShowTime?"block":"none";
				//for(var queueNum=0;queueNum<zoneList[zoneNrL].length;queueNum++){
				for(var k=0;k<BUILDING2FEED[fzZoneType].length;k++){
					var iProd=BUILDING2FEED[fzZoneType][k];
					var queueNum=(zoneList[zoneNrL][0][0]==iProd?0:1);
					if(!(unsafeData.prodBlock[0][iProd]&&unsafeData.prodBlock[0][iProd].match(/l/))){
						$("divChooseFeedAmountSpan"+zoneNrL+"Q"+iProd+"I").innerHTML=zoneList[zoneNrL][queueNum][1];
						var cand2=$("divChooseFeedAmount"+zoneNrL+"Q"+iProd+"I").getElementsByTagName("div");
						for(var v=0;v<cand2.length;v++){
							cand2[v].style.backgroundColor=(parseInt(cand2[v].getAttribute("value"),10)<=zoneList[zoneNrL][queueNum][1]?"blue":"");
						}
						cand2=null;
					}
					iProd=null;
				}
				if(lShowTime){
					var iProd=unsafeData.BUILDING2PRODUCT[fzZoneType][0];
					var duration=calcProductionTime(iProd,zoneNrS);
					var endTime=zoneTimes[zoneNrS] + duration;
					divChooseEndTimeCurr.style.color=noTime? "#DD0000":"black";
					if(zoneList[zoneNrL][0][1]==PRODSTOP && zoneList[zoneNrL][1][1]==PRODSTOP){
						divChooseEndTimeCurr.innerHTML=texte["automat"]["QueDontWork"];
					}else{
						// divChooseEndTimeCurr.innerHTML=texte["automat"]["QueTimeReady"] + " " + getDateText(endTime,0) + "&nbsp;"+ getDaytimeStr(endTime,true);
						divChooseEndTimeCurr.innerHTML=getTimeStr(duration,true)+"&nbsp;"+texte["stunden"] + "&nbsp;" + getDateText(endTime,0) + "&nbsp;"+ getDaytimeStr(endTime,true);
					}
				}
			}
		}else if(fzType==3){ // factory
			$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+PRODSTOP).style.border=((zoneList[zoneNrL][queueNum][0]==PRODSTOP)?"2px solid black":"");
			for(var v in unsafeData.BUILDING_INPUT[fzZoneType]){
				if(!unsafeData.BUILDING_INPUT[fzZoneType].hasOwnProperty(v)){ continue; }
				if(unsafeData.prodBlock[0][v]){ continue; }
				$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+v).style.border=((zoneList[zoneNrL][queueNum][0]==v)?"2px solid black":"");
			}
			if(valShowQueueTime){
				divChooseEndTimeCurr.parentNode.setAttribute("zoneBeginTime",implode(zoneTimes,"updateQueueBox/chooseBox/zoneTimes"));
				divChooseEndTimeCurr.style.display=lShowTime?"block":"none";
				if(lShowTime){
					var fz=getLowestTimeFarmZone(zoneTimes);
					var endTime=zoneTimes[fz] + calcProductionTime(zoneList[zoneNrL][queueNum][0],fz);
					divChooseEndTimeCurr.style.color=noTime? "#DD0000":"black";
					divChooseEndTimeCurr.innerHTML=(foundStop?texte["automat"]["QueDontWork"]:(($("divChooseBoxInner")==divChooseEndTimeCurr.parentNode)?texte["automat"]["QueTimeFirstReady"]:texte["automat"]["QueTimeReady"]) + " " + getDateText(endTime,0) + "&nbsp;"+ getDaytimeStr(endTime,true));
					fz=null;endTime=null;
				}
			}
			zoneFeedCurr=null;zoneProdCurr=null;
		}else if(fzType==1 || extendedListReg.test(zoneNrS)){ //fields
			// GM_log("updateQueueBox chooseBox fields 1:" + zoneNrS);
			if(valShowQueueTime){
				if($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum) && lShowTime){
					var zoneBeginTime=explode($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).getAttribute("zoneBeginTime"),"updateQueueBox/chooseBox/zoneBeginTime",{});
				}else{
					var zoneBeginTime=zoneTimes;
				}
				var fz=getLowestTimeFarmZone(zoneBeginTime);
				var productTime=calcProductionTime(zoneList[zoneNrL][queueNum][0],fz);
				divChooseEndTimeCurr.style.display=lShowTime?"block":"none";
				divChooseEndTimeCurr.parentNode.setAttribute("zoneBeginTime",implode(zoneBeginTime,"updateQueueBox/chooseBox/zoneBeginTime"));
				divChooseEndTimeCurr.style.color=noTime? "#DD0000":"black";
				divChooseEndTimeCurr.innerHTML=(foundStop? texte["automat"]["QueDontWork"]:(($("divChooseBoxInner")==divChooseEndTimeCurr.parentNode)?texte["automat"]["QueTimeFirstReady"]:texte["automat"]["QueTimeReady"]) + " " + getDateText(zoneBeginTime[fz]+productTime,0) + "&nbsp;"+ getDaytimeStr(zoneBeginTime[fz]+productTime,true));
			}
			// GM_log("updateQueueBox chooseBox fields 2:" + zoneNrS);
			$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+PRODSTOP).style.border=(zoneList[zoneNrL][queueNum][0]==PRODSTOP?"2px solid black":"");
			for(var iProd=0;iProd<unsafeWindow.produkt_name.length;iProd++){
				if((unsafeData.prodTyp[0][iProd]=="v")&&!(unsafeData.prodBlock[0][iProd]&&unsafeData.prodBlock[0][iProd].match(/l/))){
					$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd).style.border=(zoneList[zoneNrL][queueNum][0]==iProd?"2px solid black":"");
				}
			}
			zoneBeginTime=null;fz=null;productTime=null;
		}else if(fzForestry){
			// GM_log("updateQueueBox chooseBox forestry :" + zoneNrS);
			if(valShowQueueTime){
				if($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum) && lShowTime){
				var zoneBeginTime=explode($("divAutoMatQueueItemBox"+zoneNrL+"Q"+queueNum).getAttribute("zoneBeginTime"),"updateQueueBox/chooseBox/zoneBeginTime",{});
				}else{
					var zoneBeginTime=zoneTimes;
				}
				var fz=getLowestTimeFarmZone(zoneBeginTime);
				var productTime=calcProductionTime(zoneList[zoneNrL][queueNum][0],fz);
				// GM_log("updateQueueBox chooseBox fields 1:" + zoneNrS + " queueNum:" + queueNum + " fz:" + fz + " productTime:" + productTime + " zoneTimes:" + implode(zoneBeginTime,"") + " uhr:" + zoneBeginTime[fz]+ ":" + typeof productTime);
				divChooseEndTimeCurr.style.display=lShowTime?"block":"none";
				divChooseEndTimeCurr.parentNode.setAttribute("zoneBeginTime",implode(zoneBeginTime,"updateQueueBox/chooseBox/zoneBeginTime"));
				divChooseEndTimeCurr.style.color=noTime? "#DD0000":"black";
				divChooseEndTimeCurr.innerHTML=(foundStop? texte["automat"]["QueDontWork"]:(($("divChooseBoxInner")==divChooseEndTimeCurr.parentNode)?texte["automat"]["QueTimeFirstReady"]:texte["automat"]["QueTimeReady"]) + " " + getDateText(zoneBeginTime[fz]+productTime,0) + "&nbsp;"+ getDaytimeStr(zoneBeginTime[fz]+productTime,true));
			}
			// GM_log("updateQueueBox chooseBox fields 2:" + zoneNrS);
			$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+PRODSTOP).style.border=(zoneList[zoneNrL][queueNum][0]==PRODSTOP?"2px solid black":"");
			for(var iProd=0;iProd<unsafeWindow.produkt_name.length;iProd++){
				if((unsafeData.prodTyp[1][iProd]=="v")&&!(unsafeData.prodBlock[1][iProd]&&unsafeData.prodBlock[1][iProd].match(/l/))){
					$("divChooseItem"+zoneNrL+"Q"+queueNum+"I"+iProd).style.border=(zoneList[zoneNrL][queueNum][0]==iProd?"2px solid black":"");
				}
			}
			zoneBeginTime=null;fz=null;productTime=null;
		}
		queueNum=null;zoneTimes=null;
	}
	divChooseEndTimeCurr=null;
	if(DEVMODE_FUNCTION){ GM_log("End updateQueueBox :" + zoneNrS);}
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"updateQueueBox/zoneSettings"));
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList", implode(zoneList,"updateQueueBox/zoneList"));
	checkReadyZone();
}catch(err){GM_log("ERROR updateQueueBox ("+err_trace+") zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+"\n"+err);}
}
function redrawQueueBox(zoneNrS, zoneNrL, appendTo){
	if(DEVMODE_FUNCTION){  GM_log("Begin redrawQueueBox zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+" appendTo.id=" + appendTo.id);}
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrS);
	if($("divChooseBox").style.display=="block") click($("divChooseBoxClose"));
	if($("divQueueBox").style.display=="block") click($("divQueueBoxClose"));
	drawQueueBox(zoneNrS, zoneNrL, appendTo);
	if(DEVMODE_FUNCTION){ GM_log("End redrawQueueBox"); }
}
function reFillQueueBox(zoneNrF, zoneNrL, scrollToQueue){
	if(DEVMODE_FUNCTION){ GM_log("Begin reFillQueueBox zoneNrF="+zoneNrF+" zoneNrL="+zoneNrL+" scrollToQueue=" +scrollToQueue);}
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	// GM_log("Begin2 reFillQueueBox zoneNrF:"+ zoneNrF+" zoneNrL:"+ zoneNrL+" scrollToQueue:" + scrollToQueue);
	if($("divAutoMatQueueBox"+zoneNrL)){
		$("divAutoMatQueueBox"+zoneNrL).innerHTML="";
		$("divAutoMatQueueBox"+zoneNrL).style.visibility="hidden";
		for(queueNum=0;queueNum<zoneList[zoneNrL].length; queueNum++){
			drawQueueItemBox(zoneNrF, zoneNrL, queueNum, $("divAutoMatQueueBox"+zoneNrL));
		}
		updateQueueBox(zoneNrF, zoneNrL);
		$("divAutoMatQueueBox"+zoneNrL).style.visibility="visible";

		var scrlelm=$("divAutoMatQueueBox"+zoneNrL);
		if(scrollToQueue==undefined || scrollToQueue==null){
			scrlelm.scrollLeft=0;
		}else{
			scrlelm.scrollLeft=Math.max(0,Math.min(scrlelm.scrollWidth,((scrollToQueue+2)*queueItemBoxWidth)) - scrlelm.clientWidth);
		}
		$("divAutoMatScrollLeft"+zoneNrL).style.display=((scrlelm.scrollWidth > scrlelm.clientWidth)?"block":"none");
		$("divAutoMatScrollRight"+zoneNrL).style.display=((scrlelm.scrollWidth > scrlelm.clientWidth)?"block":"none");
		$("divAutoMatScrollLeft"+zoneNrL).style.visibility=(scrlelm.scrollLeft>0?"visible":"hidden");
		$("divAutoMatScrollRight"+zoneNrL).style.visibility=((scrlelm.scrollLeft + scrlelm.clientWidth)<scrlelm.scrollWidth?"visible":"hidden");
		scrlelm=null;
	}else if($("divAutomatIcon_"+zoneNrF)){
		updateQueueBox(zoneNrF, zoneNrL);
	}else{
		GM_log("WARNING reFillQueueBox zoneNrF="+zoneNrF+" zoneNrL="+zoneNrL+" scrollToQueue=" +scrollToQueue+"\nQueueBox not found");
	}
	if(DEVMODE_FUNCTION){ GM_log("End reFillQueueBox :"+zoneNrF);}
}

function toolTipProductSmall(zoneNrS, zoneNrL, queueNum, parent){
try{
	var zoneNrF=zoneNrS.toString().replace(/\.\d+$/,"");
	if(zoneNrL==undefined || zoneNrL==null){ zoneNrL=getZoneListId(zoneNrS); }
	// GM_log("Begin toolTipProductSmall zoneNrF="+zoneNrF+" zoneNrS="+zoneNrS+" zoneNrL="+zoneNrL+" queueNum="+queueNum+" parent.id="+parent.id);
	var fzType=getBuildingTyp(zoneNrF);
	var isIcon=(parent.id.search("divAutomatIcon_")!=-1);
	var isTimeLine=(parent.parentNode.id.indexOf("lineZone")==0);
	var lZonesAmount=getZonesFromList(zoneNrL).length;
	var lShowTime=(lZonesAmount > 0);
	var fzWindmill=(fzType=="windmill");
	var fzForestry=(fzType=="sawmill"||fzType=="carpentry"||fzType=="forest");
	var fzPowerUp=(fzType=="powerup");//TODO powerup
	var iType=(fzWindmill?3:(fzForestry?1:0));
	var noTime=false;
	// GM_log("toolTipProductSmall 0 zoneNrF:" + zoneNrF + " zoneNrL:" + zoneNrL + " queueNum:" + queueNum + " isIcon:" + isIcon +" fzType:"+ fzType + " zoneTyp:"+getZoneTyp(zoneNrF)+ " parent:"+parent.innerHTML);
	if(isIcon){
		if(fzType==2){
			var iProd=(zoneList[zoneNrL][0][0]==PRODSTOP?PRODSTOP:unsafeData.BUILDING2PRODUCT[getZoneTyp(zoneNrF)][0]);
		// }else if(fzType==3){
		// 	var iProd=(zoneList[zoneNrL][0][0]==PRODSTOP?PRODSTOP:zoneList[zoneNrL][0][0]);
		}else{
			var iProd=zoneList[zoneNrL][0][0];
		}
		if(valShowQueueTime) var zoneBeginTime=explode(parent.getAttribute("zoneBeginTime"),"toopTipProductSmall/[0]/zoneBeginTime",{});
		// GM_log(" fyldType:"+ fzType + " zoneTyp:"+getZoneTyp(zoneNrF) + " iProd:"+ iProd);
	}else if(isTimeLine){
		var iProd=parseInt(parent.getAttribute("iProd"),10); //unsafeData.BUILDING2PRODUCT[getZoneTyp(zoneNrF)];
		if(valShowQueueTime){
			var zoneBeginTime=new Array();
			zoneBeginTime[zoneNrF]=parseFloat(parent.getAttribute("zoneBeginTime"));
		}
	}else if(fzType==2){ // stable
		var iProd=unsafeData.BUILDING2PRODUCT[getZoneTyp(zoneNrL)][0];  // zoneNrF?
		//parseInt(parent.getAttribute("class").replace("divChooseFeedIcon v",""),10);
		if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.parentNode.getAttribute("zoneBeginTime"),"zoneBeginTimeStable");
	// }else if(fzType==3){ // factory
	// 	var iProd=parseInt(parent.getAttribute("class").replace("divChooseItem link v",""),10);
	// 	if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.getAttribute("zoneBeginTime"),"zoneBeginTimeFactory");
	}else if(fzWindmill){
		var iProd=parseInt(parent.firstElementChild.getAttribute("class").replace("fmm",""),10); //TODO getAttribute("product")
		if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.getAttribute("zoneBeginTime"),"toopTipProductSmall/[2]/zoneBeginTime",{});
	}else if(fzForestry){
		var iProd=parseInt(parent.getAttribute("class").replace("divChooseItem link f_symbol",""),10);
		if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.getAttribute("zoneBeginTime"),"toopTipProductSmall/[5]/zoneBeginTime",{});
	}else if(fzPowerUp){//parseInt(parent.getAttribute("class").replace("divChooseItem link r",""),10)>0){
		var iProd=parseInt(parent.getAttribute("class").replace("divChooseItem link r",""),10);
		if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.getAttribute("zoneBeginTime"),"toopTipProductSmall/[3]/zoneBeginTime",{});
	}else{ // Field, Factory
		var iProd=parseInt(parent.getAttribute("class").replace("divChooseItem link v",""),10);
		if(valShowQueueTime) var zoneBeginTime=explode(parent.parentNode.getAttribute("zoneBeginTime"),"toopTipProductSmall/[4]/zoneBeginTime",{});
	}
	var iStop=(iProd==PRODSTOP);
	var foundStop=false;
	for(var i=0;i<queueNum;i++){
		if(foundStop=zoneList[zoneNrL][i][0]==PRODSTOP) break;
	}
	if(valShowQueueTime && !isTimeLine && lShowTime && !isIcon){ //this is to find the first field that is ready.
		var fz=getLowestTimeFarmZone(zoneBeginTime);
	}else{
		var fz=zoneNrS;
	}
	var productTime=calcProductionTime(iProd,fz);
	var content=createElement("div");
	var newrow,newdiv,newspan;
	// GM_log("toolTipProductSmall fz:"+fz);
	//TODO texte "Recipe"
	createElement("div",{"class":"queueTitle"},content, fzPowerUp?"Recipe":getZoneName(zoneNrS,zoneNrL,(fzType!=1||isIcon)?null:queueNum,true,true,!isIcon||lZonesAmount==1,true));
	// createElement("div",{style:"font-weight:bold;"},content,iStop?texte["automat"]["stop"].toTitleCase():(fzWindmill?unsafeWindow.formulas[0][iProd][2]:(fzPowerUp?unsafeWindow.powerupcontent[iProd][2]:unsafeData.prodName[iType][iProd])));
	createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
	// GM_log("toolTipProductSmall 1 zoneNrF:" + zoneNrF + " zoneNrL:" + zoneNrL + " queueNum: " + queueNum + " zoneBeginTime:"+implode(zoneBeginTime,"")) ;

	if(fzPowerUp){
		//TODO add tooltip for recipes
	}else{
		if(iStop){
			createElement("div",{style:""},content,texte["automat"]["stop"].toTitleCase());
		}else{
			if(fzType!=2 || isIcon || isTimeLine){
				newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
				createElement("div",{"class":"tableTd1"},newrow, texte["automat"]["QueGives"]);
				newdiv=createElement("div",{"class":"tableTd2"},newrow);
				produktPic(iType,iProd,newdiv);
				createElement("span",{},newdiv, calcProductAmount(iProd, zoneNrF)+"&nbsp;" + unsafeData.prodName[iType][iProd]);
				newdiv=createElement("div",{style:"display:table-row;width:100%;"},content);
				createElement("div",{"class":"tableTd1"},newdiv,"");
				pointsFormat(calcProductScore(iProd, zoneNrF),"span",createElement("div",{"class":"tableTd2"},newdiv));
				createElement("div",{"class":"tableSeperater"},content);createElement("div",{"class":"tableSeperater"},content);
				newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
				createElement("div",{"class":"tableTd1"},newrow,texte["automat"]["QueTimeThis"]);
				createElement("div",{"class":"tableTd2"},newrow, getTimeStr(productTime,true) + "&nbsp;" + texte["stunden"]);
			}
			// GM_log("End toolTipProductSmall 2 : " + zoneNrF + " : " + queueNum);
			if(fzType==2 && (isIcon || isTimeLine)){
				createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));
				createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));
				newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
				createElement("div",{"class":"tableTd1"},newrow, texte["automat"]["QueUses"]);
				newdiv=createElement("div",{"class":"tableTd2"},newrow);
				produktPic(iType,zoneList[zoneNrL][0][0],newdiv);
				createElement("span",{},newdiv,zoneList[zoneNrL][0][1] + "&nbsp;" + unsafeData.prodName[iType][zoneList[zoneNrL][0][0]]);

				if(zoneList[zoneNrL][1][1]>0){
					newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
					createElement("div",{"class":"tableTd1"},newrow,"");
					newdiv=createElement("div",{"class":"tableTd2"},newrow);
					produktPic(iType,zoneList[zoneNrL][1][0],newdiv);
					createElement("span",{},newdiv, zoneList[zoneNrL][1][1] + "&nbsp;" + unsafeData.prodName[iType][zoneList[zoneNrL][1][0]]);
				}
			}else if(fzType==3){
				createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));
				createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));
				for(var i=0;i<unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrL)][iProd][0].length;i++){
					newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
					createElement("div",{"class":"tableTd1"},newrow,i==0?texte["automat"]["QueUses"]:"");
					newdiv=createElement("div",{"class":"tableTd2"},newrow);
					produktPic(iType,unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrL)][iProd][0][i][0],newdiv);
					createElement("span",{},newdiv, numberFormat(unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrL)][iProd][0][i][1]) + "&nbsp;" + unsafeData.prodName[0][unsafeData.BUILDING_INPUT[getZoneTyp(zoneNrL)][iProd][0][i][0]]);
				}
			}
		}
		if(fzType==2){
			if(isIcon || isTimeLine){ createElement("div",{"class":"tableSeperater"},content);createElement("div",{"class":"tableSeperater"},content);}
			newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
			createElement("div",{"class":"tableTd1"},newrow, texte["automat"]["QueFutter"]);
			newdiv=createElement("div",{"class":"tableTd2"},newrow);
			produktPic(iType,BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][0],newdiv);
			createElement("span",{},newdiv, getTimeStr(FEEDBONUSTIME[BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][0]]/unsafeData.zoneAnimals[zoneNrF]) + "&nbsp;" + unsafeData.prodName[0][BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][0]]);

			newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
			createElement("div",{"class":"tableTd1"},newrow, "");
			newdiv=createElement("div",{"class":"tableTd2"},newrow);
			produktPic(0,BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][1],newdiv);
			createElement("span",{},newdiv, getTimeStr(FEEDBONUSTIME[BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][1]]/unsafeData.zoneAnimals[zoneNrF]) + "&nbsp;" + unsafeData.prodName[0][BUILDING2FEED[unsafeData.zoneTyp[zoneNrF]][1]]);
		}
		if(valShowQueueTime && !isTimeLine && lShowTime && (!iStop || foundStop)){
			if(lZonesAmount > 1 || fzType=="sawmill"){
				createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
				createElement("div",{style:"display:block"},content,queueNum==0?texte["automat"]["QueTimeNextReady"]:texte["automat"]["QueTimeFirstReady"]);//texte["automat"]["autoPflanzeOn"]);
				createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:1px;border-bottom:1px dashed white;"},content);

				// GM_log ("toolTipProductSmall zoneArray:" + print_r(zoneArray));
				for(var fz in zoneBeginTime){
					if(!zoneBeginTime.hasOwnProperty(fz)){ continue; }
					var cfz=getBuildingTyp(fz);//TODO cfz name change
					// GM_log("toolTipProductSmall Title :" + gardenNr + "/" + fz);
					newrow=createElement("div",{style:"display:table-row;white-space:nowrap;"+(fz!=zoneNrF&&isIcon?"color:#505050;":"")},content);
					createElement("div",{"style":"display:table-cell;"},newrow,getZoneName(fz,fz,null,false,true,true,false));
					createElement("div",{"style":"display:table-cell;padding:0px 2px;"},newrow, "->");
					createElement("div",{"style":"display:table-cell;padding:0px 3px;font-weight:bold;"},newrow, getDateText(Math.max(now,zoneBeginTime[fz])+calcProductionTime(iProd,fz),0).toLowerCase());
					createElement("div",{"style":"display:table-cell;padding:0px 3px;"},newrow, getDaytimeStr(Math.max(now,zoneBeginTime[fz])+calcProductionTime(iProd,fz),true));
				}
			}else{
				createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));createElement("div",{"class":"tableSepBorder"},createElement("div",{"class":"tableSeperater"},content));
				newrow=createElement("div",{style:"display:table-row;width:100%;"},content);
				createElement("div",{"class":"tableTd1"},newrow,queueNum==0?texte["automat"]["QueTimeNextReady"]:texte["automat"]["QueTimeFirstReady"]);//texte["automat"]["autoPflanzeOn"]);
				createElement("div",{"class":"tableTd2"},newrow, "<b>"+getDateText(Math.max(now,zoneBeginTime[fz])+productTime,0).toLowerCase()+"</b>&nbsp;"+getDaytimeStr(Math.max(now,zoneBeginTime[fz])+productTime,true));
			}
		}
		if(iStop){
			createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
			createElement("div",{style:""},content,fzWindmill?texte["automat"]["MillStop0"]:(fzType==1?texte["automat"]["QueStop0"]:texte["automat"]["QueDontWork"]));
		}else if(foundStop){
			createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
			createElement("div",{style:""},content,fzWindmill?texte["automat"]["MillStoped"]:texte["automat"]["QueueStoped"]);
		}else{
			createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
			createElement("div",{style:""},content,fzWindmill?texte["automat"]["MilldoWork"]:texte["automat"]["QueDoWork"]);
		}
	}

	var thisTitle=content.innerHTML;
	content=null;fz=null;zoneBeginTime=null;newrow=null;newdiv=null;productTime=null;

	//%PRODNAME%=iProd name
	thisTitle=thisTitle.replace(/%PRODNAME%/gi, unsafeData.prodName[0][iProd]);

	// GM_log("End toolTipProductSmall : " + zoneNrF + " : " + queueNum);
	return thisTitle;
}catch(err){GM_log("ERROR toolTipProductSmall\nzoneNrF="+zoneNrF+" zoneNrL="+zoneNrL+" queueNum="+queueNum+" parent.id="+parent.id+"\n"+err);return "Error. See console.";}
}
function toolTipMain(zoneNrF, zoneNrL, queueNum, parent){
	if(zoneNrF=="windmill"){
		return toolTipRecipe(zoneNrF, zoneNrL, queueNum, parent);
	}else if(zoneNrF=="sawmill"||zoneNrF=="carpentry"||zoneNrF=="forest"){
		return toolTipProduct(zoneNrF, zoneNrL, queueNum, parent);
	}else{
		return toolTipProduct(zoneNrF, zoneNrL, queueNum, parent);
	}
}
function toolTipProduct(zoneNrF, zoneNrL, queueNum, parent){
try{
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	// GM_log("Begin toolTipProduct zoneNrF="+zoneNrF+" zoneNrL="+zoneNrL+" queueNum="+queueNum+" parent.id="+parent.id);
	var totalInQue=parseInt(parent.getAttribute("totalInQue"),10);
	var foundStop=parent.getAttribute("foundStop")=="true";
	var lRepeat=(!OPTION_LIST_REPEAT || zoneSettings[zoneNrL]["repeat"]==undefined)?false:zoneSettings[zoneNrL]["repeat"];
	var lShuffle=zoneSettings[zoneNrL]["shuffle"]==undefined?false:zoneSettings[zoneNrL]["shuffle"];
	var iRepeat=(!OPTION_ITEM_REPEAT)?false:zoneList[zoneNrL][queueNum][4];
	var iLastInf=((zoneList[zoneNrL].length-1)==queueNum) && !(lRepeat || iRepeat) && !lShuffle;
	var iRackMode=zoneNrL!="windmill" && zoneList[zoneNrL][queueNum][3];
	var iProd=parseInt(zoneList[zoneNrL][queueNum][0],10);
	var iTot=parseInt(zoneList[zoneNrL][queueNum][1],10);
	var iDone=iRackMode?0:parseInt(zoneList[zoneNrL][queueNum][2],10);
	var iStop=(iProd==PRODSTOP);
	var lShowTime=getZonesFromList(zoneNrL).length > 0;
	var fzType=getBuildingTyp(zoneNrF);
	var fzWindmill=(fzType=="windmill");
	var fzPowerUp=(fzType=="powerup");//TODO powerup
	var fzForestry=(fzType=="sawmill"||fzType=="carpentry"||fzType=="forest");
	var iType=(fzWindmill?2:(fzForestry?1:0));
	// GM_log("toolTipProductSmall fzType:"+fzType);

	if(valShowQueueTime && lShowTime){
		var iTogoArray=explode(parent.getAttribute("iTogoArray"),"toolTipProduct/iTogoArray",{});
		var timeArray=explode(parent.getAttribute("timeArray"),"toolTipProduct/timeArray",{});
		var timesArray=explode(parent.getAttribute("timesArray"),"toolTipProduct/timesArray",{});
		var zoneBeginTime=explode(parent.getAttribute("zoneBeginTime"),"toolTipProduct/zoneBeginTime",{});
		var zoneEndTime=explode(parent.getAttribute("zoneEndTime"),"toolTipProduct/zoneEndTime",{});
		var equalTimeArray=timeArray.allEqual();
	}
	var iTogo=parseInt(parent.getAttribute("iTogo"),10);
	var iTogoAmount=parseInt(parent.getAttribute("iTogoAmount"),10);
	var iTogoScore=parseInt(parent.getAttribute("iTogoScore"),10);
	var iDoneAmount=calcProductAmount(iProd, zoneNrF, null, null, true) * iDone;
	var iDoneScore=calcProductScore(iProd, zoneNrF, null, null) * iDone;

	var content=createElement("div");
	texte["automat"]["QueRackMode"]="(Rack mode)";//TODO texte
	createElement("div",{"class":"queueTitle"},content,iRackMode?texte["automat"]["QueRackMode"]:(((lRepeat || iRepeat) && lShuffle)?texte["automat"]["QueRepeatShuffle"]:(lShuffle?texte["automat"]["QueShuffle"]:((lRepeat || iRepeat)?texte["automat"]["QueRepeat"]:(iTot<=1?texte["automat"]["QueFieldInRow1"]:texte["automat"]["QueFieldInRowX"])))));
	createElement("div",{style:"font-weight:bold;"},content,(iStop)?texte["automat"]["stop"].toTitleCase():(fzWindmill)?unsafeWindow.formulas[0][iProd][2]:(fzPowerUp)?unsafeWindow.powerupcontent[iProd][2]:unsafeData.prodName[iType][iProd]);
	createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);

	if(iStop){
		createElement("div",{style:""},content,(totalInQue==0)?texte["automat"]["QueStop0"]:(totalInQue==1)? texte["automat"]["QueStop1"]:texte["automat"]["QueStopX"]);
	}else{
		if((lRepeat || iRepeat || lShuffle || iRackMode) && iTogo<=0){//iTot<=iDone){
			var newspan=createElement("div",{style:"display:block"},content,((iRackMode && !(lRepeat || iRepeat) && !lShuffle)?texte["automat"]["QueRoundDoneR"]:(iDone<=1?texte["automat"]["QueRoundDone1"]:texte["automat"]["QueRoundDoneX"])));
		}else{ //normal
			var newspan=createElement("div",{style:"display:table-row;"},content);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["ertrag"]);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["punkte"]);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["fields"]); //TODO texte -> "fields" much be "zone" for isNaN(zoneNrF)

			if(!extendedListReg.test(zoneNrL)){
				if(!iRackMode){ //TOTAL
					var newspan=createElement("div",{style:"display:table-row;"},content);
					createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,(lRepeat || iRepeat || lShuffle ?texte["automat"]["QueRoundMake"]:texte["automat"]["QueFieldMake"]));
					createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (equalTimeArray?"":" ~ ") + (iLastInf?sign_inf:numberFormat(iTogoAmount+iDoneAmount)+sign_mult));
					createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (equalTimeArray?"":" ~ ") + (iLastInf?sign_inf:numberFormat(iTogoScore+iDoneScore)));
					createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (iLastInf?sign_inf:numberFormat(iTot)));

					if((lRepeat || iRepeat || lShuffle) && iDone>0){ //DONE
						var newspan=createElement("div",{style:"display:table-row;"},content);
						createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["QueRoundMade"]);
						createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (equalTimeArray?"":" ~ ") + numberFormat(iDoneAmount)+sign_mult);
						createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (equalTimeArray?"":" ~ ") + numberFormat(iDoneScore));
						createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, iDone);
					}
				}
			}
			if(iTogo>0){//TOGO
				var newspan=createElement("div",{style:"display:table-row;"},content);
				createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan, (lRepeat || iRepeat || lShuffle ?texte["automat"]["QueRoundToGo"]:texte["automat"]["QueFieldToGo"]));
				createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (valShowQueueTime?"":" ~ ") + (iLastInf?sign_inf:numberFormat(iTogoAmount)+sign_mult));
				createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (valShowQueueTime?"":" ~ ") + (iLastInf?sign_inf:numberFormat(iTogoScore)));
				createElement("div",{style:"display:table-cell;padding-right:10px;text-align:right;"},newspan, (iLastInf?sign_inf:numberFormat(iTogo)));
			}
		}
		createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
		// GM_log("toolTipProduct Title :" + zoneNrF + ": 1");

		if(foundStop){
			createElement("div",{"style":""},content,texte["automat"]["QueueStoped"]);
		}else if(valShowQueueTime && lShowTime && (iTogo>0)){
			var newspan=createElement("div",{style:"display:table-row;"},content);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["QueTimeThis"]);
			//createElement("div",{style:"display:table-cell;"},newspan, getTimeStr(timeArray[zoneNrF],true) + "&nbsp;" + texte["stunden"]);
			createElement("div",{style:"display:table-cell;"},newspan, (equalTimeArray?"":" ~ ") + getTimeStr(timeArray.average(),true) + "&nbsp;" + texte["stunden"]);

			if((lRepeat || iRepeat || lShuffle)&& !iLastInf){
				var newspan=createElement("div",{style:"display:table-row;"},content);
				createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["QueTimeRound"]);
				//createElement("div",{style:"display:table-cell;"},newspan, getTimeStr(timeArray[zoneNrF]*Math.max(iTogo+iDone,0),true) + "&nbsp;" + texte["stunden"]);
				createElement("div",{style:"display:table-cell;"},newspan, (equalTimeArray?"":" ~ ") + getTimeStr(timeArray.averageFieldTime(Math.max(iTogo+iDone,1)),true) + "&nbsp;" + texte["stunden"]);
			}
			//GM_log("toolTipProduct Title :" + zoneNrF + ": 2");
			if(iTogo>0){
				if(!iLastInf){
					var beginTime=zoneBeginTime[getLowestTimeFarmZone(zoneBeginTime)];
					var endTime=zoneEndTime[getHighestTimeFarmZone(zoneEndTime)];
					var newspan=createElement("div",{style:"display:table-row;"},content);
					createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["QueTimeToGo"]);
					createElement("div",{style:"display:table-cell;"},newspan, getTimeStr(endTime - beginTime,true) + "&nbsp;" + texte["stunden"]);
					var newspan=createElement("div",{style:"display:table-row;"},content);
					createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["QueTimeReady"]);
					createElement("div",{style:"display:table-cell;"},newspan, getDateText(endTime,0).toLowerCase() + " " + getDaytimeStr(endTime,true));
					beginTime=null;endTime=null;
				}
				createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);
				var newspan=createElement("div",{style:"display:table-row;"},content);
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan);
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["automat"]["number"]);
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["total"]);
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["automat"]["lack"]);
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["product"]);

				for(var i in unsafeData.prodRequire[iType][iProd]){
					if(!unsafeData.prodRequire[iType][iProd].hasOwnProperty(i)){continue;}
					var newspan=createElement("div",{style:"display:table-row;"},content);
					produktPic(unsafeData.prodRequire[iType][iProd][i][0],unsafeData.prodRequire[iType][iProd][i][1],newspan);
					var help=unsafeData.prodRequire[iType][iProd][i][2];
					createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(help));
					help*=iTot;
					createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(help));
					help-=unsafeData.prodStock[unsafeData.prodRequire[iType][iProd][i][0]][unsafeData.prodRequire[iType][iProd][i][1]];
					createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, help>0?numberFormat(help):"");
					createElement("div",{style:"display:table-cell;padding-left:8px;"},newspan,unsafeData.prodName[unsafeData.prodRequire[iType][iProd][i][0]][unsafeData.prodRequire[iType][iProd][i][1]]);
				}
				createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);
				createElement("div",{style:"display:block"},content,texte["automat"]["autoPflanzeOn"]);
				createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:1px;border-bottom:1px dashed white;"},content);

				var timesCount=0;
				for(var fz in timesArray){
					if(!timesArray.hasOwnProperty(fz)){ continue; }
					timesCount=Math.max(timesArray[fz].length,timesCount);
				}

				for(var fz in timesArray){
					if(!timesArray.hasOwnProperty(fz)){ continue; }
					// GM_log("toolTipProduct Title :" + zoneNrF + "/" + fz);
					var newspan=createElement("div",{style:"display:table-row;white-space:nowrap;"},content);
					if(lShowTime){
						createElement("div",{style:"display:table-cell;"},newspan, getZoneName(fz,fz,null,false,true,true,false)); //Math.ceil(fz/6) + "." + getGarden(fz));
						createElement("div",{style:"display:table-cell;padding:0px 2px;"},newspan, "->");
						createElement("div",{style:"display:table-cell;text-align:right;"},newspan, iTogoArray[fz]);
						createElement("div",{style:"display:table-cell;text-align:right;padding:0px 3px;"},newspan, sign_mult);
						createElement("div",{style:"display:table-cell;padding:0px 2px;"},newspan,getTimeStr(timeArray[fz],true) + "&nbsp;" + texte["stunden"]);
						createElement("div",{style:"display:table-cell;padding:0px 2px;"},newspan, "->");
					}
					for(k=0;k < Math.min(10,timesCount-1);k++){
						createElement("div",{style:"display:table-cell;padding:0px 3px;"},newspan, (k<(timesArray[fz].length-1))?(k==0&&queueNum>0?"<b>"+getDateText(timesArray[fz][k],0)+"</b>&nbsp;":"")+getDaytimeStr(timesArray[fz][k],true):"&nbsp;");
					}
					if(timesCount>=11) createElement("div",{style:"display:table-cell;padding:0px 2px;"},newspan, timesArray[fz].length>=11?"&nbsp;....&nbsp;":"");
					if(!iLastInf){
						createElement("div",{style:"display:table-cell;padding:0px 3px;"},newspan, "<b>"+getDateText(zoneEndTime[fz],0) + "</b>&nbsp;" + getDaytimeStr(zoneEndTime[fz],true));
					}else{
						createElement("div",{style:"display:table-cell;padding:0px 3px;"},newspan, sign_inf);
					}
				}
				timesArray=null;fz=null;k=null;
			}
		}
	}

	var thisTitle=content.innerHTML;
	content=null;newspan=null;timeArray=null;zoneBeginTime=null;zoneEndTime=null;timesArray=null;

	//%PRODNAME%=product name, %FLDFROM%=field nr from, %FLDTO%=field nr until,
	thisTitle=thisTitle.replace(/%PRODNAME%/gi, unsafeData.prodName[iType][iProd]);
	thisTitle=thisTitle.replace(/%FLDFROM%/gi, totalInQue + (iProd==PRODSTOP?0:1));
	thisTitle=thisTitle.replace(/%FLDTO%/gi, iLastInf?sign_inf:(totalInQue+iTot));

	// GM_log("End toolTipProduct :" + zoneNrF + " : " + queueNum);
	return thisTitle;
}catch(err){GM_log("ERROR toolTipProduct \n"+err);return "Error. See console.";}
}
function toolTipRecipe(zoneNrF, zoneNrL, queueNum, parent){
try{
	// GM_log("Begin toolTipRecipe :" + zoneNrF + " : " + queueNum);
	if(zoneNrL==undefined || zoneNrL==null) zoneNrL=getZoneListId(zoneNrF);
	var totalInQue=parseInt(parent.getAttribute("totalInQue"),10);
	var foundStop=parent.getAttribute("foundStop")=="true";
	var lRepeat=(!OPTION_LIST_REPEAT || zoneSettings[zoneNrL]["repeat"]==undefined)?false:zoneSettings[zoneNrL]["repeat"];
	var lShuffle=zoneSettings[zoneNrL]["shuffle"]==undefined?false:zoneSettings[zoneNrL]["shuffle"];
	var iProd=parseInt(zoneList[zoneNrL][queueNum][0],10);
	var iTot=parseInt(zoneList[zoneNrL][queueNum][1],10);
	var iDone=parseInt(zoneList[zoneNrL][queueNum][2],10);
	var iStop=(iProd==PRODSTOP);
	var lShowTime=getZonesFromList(zoneNrL).length > 0;

	if(valShowQueueTime && lShowTime){
		var timeArray=explode(parent.getAttribute("timeArray"),"toolTipRecipe/timeArray",false);
		var timesArray=explode(parent.getAttribute("timesArray"),"toolTipRecipe/timesArray",false);
		var zoneBeginTime=explode(parent.getAttribute("zoneBeginTime"),"toolTipRecipe/zoneBeginTime",false);
		var zoneEndTime=explode(parent.getAttribute("zoneEndTime"),"toolTipRecipe/zoneEndTime",false);
	}

	var content=createElement("div");
	createElement("div",{"class":"queueTitle"},content,(zoneSettings[zoneNrL]["shuffle"]?texte["automat"]["MillShuffle"]:(iTot<=1?texte["automat"]["MillInRow1"]:texte["automat"]["MillInRowX"])));
	createElement("div",{style:"font-weight:bold;"},content,(iStop?texte["automat"]["stop"].toTitleCase():unsafeWindow.formulas[0][iProd][2]));
	createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);

	//item title info creation
	if(iStop){
		createElement("div",{style:""},content,(totalInQue==0)?texte["automat"]["MillStop0"]:(totalInQue==1)? texte["automat"]["MillStop1"]:texte["automat"]["MillStopX"]);
	}else{
		if(unsafeWindow.formulas[0][iProd]){
			var info=unsafeWindow.formulas[0][iProd];

			if(valShowQueueTime && lShowTime){
				var newspan=createElement("div",{style:"display:table-row;"},content);
				createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillTimeThis"]);
				createElement("div",{style:"display:table-cell;"},newspan,getTimeStr(timeArray["windmill"],true) + "&nbsp;" + texte["stunden"]);
				var newspan=createElement("div",{style:"display:table-row;"},content);
				createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillTimeTotal"]);
				createElement("div",{style:"display:table-cell;"},newspan,getTimeStr(timeArray["windmill"]*Math.max(iTot,0),true) + "&nbsp;" + texte["stunden"]);
				if(!foundStop){
					var beginTime=zoneBeginTime[getLowestTimeFarmZone(zoneBeginTime)]; //not used !?
					var endTime=zoneEndTime[getHighestTimeFarmZone(zoneEndTime)]; //not used !?
					var newspan=createElement("div",{style:"display:table-row;"},content);
					createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillTimeReady"]);
					createElement("div",{style:"display:table-cell;"},newspan,getDateText(zoneEndTime[zoneNrF],0).toLowerCase() + " " + getDaytimeStr(zoneEndTime[zoneNrF],true));
					createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);
				}
			}

			for( var bonus=0;bonus<info[5].length;bonus++){if(!!info[5][bonus]) break;}
			if(bonus!=undefined){
				var newspan=createElement("div");
				createElement("div",{"class":"kp"+info[5][bonus][0],style:"float:left;"},newspan);
				createElement("div",{style:"float:left; margin-left:5px; width:250px;"},newspan,texte["automat"]["MillPowerUpText"][bonus]);
				createElement("div",{style:"clear:both;"},newspan);

				newspan.innerHTML=newspan.innerHTML.replace("%PRODUCT%",unsafeData.prodName[0][info[5][bonus][0]]);
				newspan.innerHTML=newspan.innerHTML.replace("%AMOUNT%",info[5][bonus][1] * iTot);
				newspan.innerHTML=newspan.innerHTML.replace("%TIME%", getTimeStr(info[5][bonus][2])); //bonus=0
				newspan.innerHTML=newspan.innerHTML.replace("%CROP%",'+' + info[5][bonus][1]); //bonus=1
				newspan.innerHTML=newspan.innerHTML.replace("%POINTS%",'+' + info[5][bonus][1]); //bonus=2
				var newspan=createElement("div",{style:"margin:2px 0px 2px 0px;"},content, newspan.innerHTML);
			}
			var newspan=createElement("div",{style:"margin:2px 0px 2px 0px;"},content);
			createElement("img",{src:GFX+"points.gif",style:"float:left;display:block;margin:0px 2px 0px 1px;width:12px;"},newspan);
			createElement("div",{style:"float:left; margin-left:5px;"},newspan,numberFormat(info[8] * iTot) + " " + texte["punkte"]);
			createElement("div",{style:"clear:both;"},newspan);
			createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);

			createElement("div","",content,texte["automat"]["MillIngredients"]);
			createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:1px;border-bottom:1px dotted white;"},content);

			var newspan=createElement("div",{style:"display:table-row;"},content);
			createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan);
			createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["automat"]["number"]);
			createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["total"]);
			if(zoneList[zoneNrL][queueNum][3]<0){
				createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["automat"]["lack"]);
				//createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["total"] + "&nbsp;" + texte["automat"]["lack"]);
			}
			createElement("div",{style:"display:table-cell;padding-left:5px;"},newspan,texte["product"]);

			for(var j=0;j<info[3].length;j++){
				if(info[3][j]){
					var newspan=createElement("div",{style:"display:table-row;"},content);
					//image
					createElement("div",{"class":"kp"+info[3][j][0], style:"float:left;"},newspan);
					//reciep product number
					createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(info[3][j][1]) + sign_mult);
					//reciep product number total autolist
					createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(iTot * info[3][j][1]) + sign_mult);
					//reciep product number missing total autolist
					if(zoneList[zoneNrL][queueNum][4][j]<0){
						//createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(iTot * info[3][j][1]) + sign_mult);
						createElement("div",{style:"display:table-cell;padding-left:8px;text-align:right;"},newspan, numberFormat(Math.abs(zoneList[zoneNrL][queueNum][4][j])) + sign_mult);
					}else if(zoneList[zoneNrL][queueNum][3]<0){ //somewhere else there is a shortage: show empty td
						//createElement("div",{style:"display:table-cell;padding-left:8px;"},newspan);
						createElement("div",{style:"display:table-cell;padding-left:8px;"},newspan);
					}
					//name
					createElement("div",{style:"display:table-cell;padding-left:8px;"},newspan,unsafeData.prodName[0][info[3][j][0]]);
				}
			}
			createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);

			var newspan=createElement("div",{style:"display:table-row;"},content);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillRecipesBought"]);
			createElement("div",{style:"display:table-cell;"},newspan,numberFormat(autoMillStorage[iProd][0]));
			var newspan=createElement("div",{style:"display:table-row;text-align:left;"},content);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillRecipesUsed"]);
			createElement("div",{style:"display:table-cell;"},newspan,numberFormat(autoMillStorage[iProd][1]));
			var newspan=createElement("div",{style:"display:table-row;text-align:left;"},content);
			createElement("div",{style:"display:table-cell;padding-right:10px;"},newspan,texte["automat"]["MillRecipesBake"]);
			createElement("div",{style:"display:table-cell;"},newspan,numberFormat(autoMillStorage[iProd][2]));

			if(valShowQueueTime && !foundStop && lShowTime){
				createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);
				createElement("div",{style:"display:block"},content,texte["automat"]["autoPflanzeOn"]);
				createElement("div",{style:"margin:2px 0px 2px 0px;width:100%;height:1px;border-bottom:1px dashed white;"},content);

				var timesCount=0;
				for(var fz in timesArray){
					if(!timesArray.hasOwnProperty(fz)){ continue; }
					timesCount=Math.max(timesArray[fz].length,timesCount);
				}

				for(var fz in timesArray){
					if(!timesArray.hasOwnProperty(fz)){ continue; }
					// GM_log("updateQueueBox Title :" + gardenNr + "/" + fz);
					var newspan=createElement("div",{style:"display:table-row;white-space:nowrap;"},content);
					for(k=0;k < Math.min(10,timesCount-1);k++){
						createElement("div",{style:"display:table-cell;padding:0px 3px;"},newspan, (k<(timesArray[fz].length-1))?(k==0?"<b>"+getDateText(timesArray[fz][k],0)+"</b>&nbsp;":"")+getDaytimeStr(timesArray[fz][k],true):"&nbsp;");
					}
					if(timesCount>=11) createElement("div",{style:"display:table-cell;padding:0px 2px;"},newspan, timesArray[fz].length>=11?"&nbsp;....&nbsp;":"");
					createElement("div",{style:"display:table-cell;padding:0px 3px;"},newspan, "<b>"+getDateText(zoneEndTime[fz],0) + "</b>&nbsp;" + getDaytimeStr(zoneEndTime[fz],true));
				}
				timesArray=null;fz=null;k=null;
			}
			info=null;
		}
		if(foundStop){
			createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:1px;border-bottom:1px solid white;"},content);
			createElement("div",{style:""},content,texte["automat"]["MillStoped"]);
		}
	}
	var thisTitle=content.innerHTML;
	content=null;newspan=null;timeArray=null;zoneBeginTime=null;zoneEndTime=null;
	// GM_log("toolTipRecipe Box :"+queueNum + " | 2");
	thisTitle=thisTitle.replace(/%PRODNAME%/gi, (iProd==PRODSTOP?texte["automat"]["stop"]:unsafeWindow.formulas[0][iProd][2]));
	thisTitle=thisTitle.replace(/%FLDFROM%/gi, totalInQue + (iProd==PRODSTOP?0:1));
	thisTitle=thisTitle.replace(/%FLDTO%/gi, totalInQue + iTot);

	// GM_log("End toolTipRecipe :" + zoneNrF + " : " + queueNum);
	return thisTitle;
}catch(err){GM_log("ERROR toolTipRecipe \n"+err);return "Error. See console.";}
}

function setNextQueueItem(zoneNrS){
try{
	if(DEVMODE){
		GM_log("setNextQueueItem zoneNrS="+zoneNrS);
		showInLogBubble("Setting next queue item ("+zoneNrS+")");
	}
	var zoneNrL=getZoneListId(zoneNrS);
	if(isNaN(zoneList[zoneNrL][0][1])){ zoneList[zoneNrL][0]=DEFAULT_ZONELIST_ITEM.clone(); }
	if(isNaN(zoneList[zoneNrL][0][2])){ zoneList[zoneNrL][0][2]=0; }
	if((valUseQueueList||isNaN(zoneNrS)) && (zoneList[zoneNrL][0][0]!=PRODSTOP) && (!zoneList[zoneNrL][0][3])){
		if((OPTION_LIST_REPEAT && (zoneSettings[zoneNrL]["repeat"]))||(OPTION_ITEM_REPEAT && (zoneList[zoneNrL][0][4]))){
			zoneList[zoneNrL][0][2]++;
		}else{
			zoneList[zoneNrL][0][1]--;
		}
	}
	reSortQueue(zoneNrS, true); //->reFillQueueBox
	if(DEVMODE){GM_log("End setNextQueueItem :" + zoneNrS);}
	return zoneList[zoneNrL][0];
}catch(err){ GM_log("ERROR setNextQueueItem zoneNrS="+zoneNrS+"\n"+err);return DEFAULT_ZONELIST_ITEM.clone(); }
}

function reSortQueue(zoneNrF, nextItemMode){
try{
	if(DEVMODE){
		GM_log("reSortQueue "+zoneNrF);
		showInLogBubble("reSort queue items ("+zoneNrF+")");
	}
	var itemsRackDone=0,itemsRepeatDone=0,itemsStopsFound=0,iDoRack=false;
	var zoneNrL=getZoneListId(zoneNrF);
	if((valUseQueueList||isNaN(zoneNrF)) && (zoneList[zoneNrL][0][0]!=PRODSTOP) && (nextItemMode || (((zoneList[zoneNrL][0][3] && calcInGameProductAmount(zoneList[zoneNrL][0][0],zoneNrF,null,true) < zoneList[zoneNrL][0][1]) || (!zoneList[zoneNrL][0][3] && zoneList[zoneNrL][0][1]<=((OPTION_ITEM_REPEAT && zoneList[zoneNrL][0][4])||(OPTION_LIST_REPEAT&&zoneSettings[zoneNrL]["repeat"])?zoneList[zoneNrL][0][2]:0))) ))){
		// && (getBuildingTyp(zoneNrF)==1||isNaN(zoneNrF))
		// GM_log("auto plant volgende " + zoneList[zoneNrL][0][0]);
		for(i=0;i<zoneList[zoneNrL].length;i++){
			if(zoneList[zoneNrL][i][0]==PRODSTOP){
				itemsStopsFound++;
			}else if(zoneList[zoneNrL][i][3]){
				if(calcInGameProductAmount(zoneList[zoneNrL][i][0],zoneNrF,null,true) > zoneList[zoneNrL][i][1]){
					itemsRackDone++;
				}
			// }else if((zoneList[zoneNrL][i][5]!=REPEAT_NO_LIMIT && zoneList[zoneNrL][i][5]<=(REPEAT_RESTART+(zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2]?1:0)) && OPTION_ITEM_REPEAT && zoneList[zoneNrL][i][4])||(OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"]&& zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2])){
			// }else if((zoneList[zoneNrL][i][5]!=REPEAT_NO_LIMIT && zoneList[zoneNrL][i][5]<=(REPEAT_RESTART+(zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2]?1:0)) && OPTION_ITEM_REPEAT && zoneList[zoneNrL][i][4])||(((OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"])||(zoneList[zoneNrL][i][5]==REPEAT_NO_LIMIT)) && zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2])){
			}else if((zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2] && OPTION_ITEM_REPEAT && zoneList[zoneNrL][i][4])||(OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"] && zoneList[zoneNrL][i][1]<=zoneList[zoneNrL][i][2])){
				itemsRepeatDone++;
			}
		}
		//if(DEVMODE) GM_log("reSortQueue itemsRackDone:"+itemsRackDone+" itemsRepeatDone:"+itemsRepeatDone+" itemsStopsFound:"+itemsStopsFound+" length:"+zoneList[zoneNrL].length);
		if(zoneList[zoneNrL].length==itemsRackDone){
			//if(DEVMODE){GM_log("reSortQueue "+zoneNrF+":4");}
			//if(DEVMODE) GM_log("Added PRODSTOP zoneNrL:"+zoneNrL + " itemsRackDone:"+itemsRackDone+" : "+ typeof itemsRackDone);
			zoneList[zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
		}else if(zoneList[zoneNrL].length==1 && 1==itemsRepeatDone && zoneList[zoneNrL][0][5]<=REPEAT_RESTART && zoneList[zoneNrL][0][5]!=REPEAT_NO_LIMIT){
			zoneList[zoneNrL][0]=DEFAULT_ZONELIST_ITEM.clone();
		}else if(zoneSettings[zoneNrL]["shuffle"] && zoneList[zoneNrL].length==(itemsRepeatDone+itemsRackDone+itemsStopsFound)){
			for(queueNum=0;queueNum<zoneList[zoneNrL].length;queueNum++){
				if(OPTION_ITEM_REPEAT && zoneList[zoneNrL][0][4] && zoneList[zoneNrL][0][1]<=zoneList[zoneNrL][0][2] && zoneList[zoneNrL][0][5]!=REPEAT_NO_LIMIT){
					zoneList[zoneNrL][0][5]--;
				}
				zoneList[zoneNrL][queueNum][2]=0;
			}
		}
		if(zoneList[zoneNrL][0][0]==PRODSTOP){
			reFillQueueBox(zoneNrF);
			return zoneList[zoneNrL][0][0];
		}
		do {
			//GM_log("Begin Do:" + zoneList[zoneNrL][0][0]);
			iDoRack=zoneList[zoneNrL][0][3] && calcInGameProductAmount(zoneList[zoneNrL][0][0],zoneNrF,null,true) < zoneList[zoneNrL][0][1];
			if((OPTION_ITEM_REPEAT && zoneList[zoneNrL][0][4])||(OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"])){ //repeat
				if(zoneList[zoneNrL][0][3] && !iDoRack && !zoneSettings[zoneNrL]["shuffle"]){
					zoneList[zoneNrL].push(zoneList[zoneNrL].splice(0,1)[0]);
				}else if(zoneList[zoneNrL][0][1]<=zoneList[zoneNrL][0][2]){
					if(!zoneSettings[zoneNrL]["shuffle"]){
						zoneList[zoneNrL][0][2]=0; //in a loop without shuffel there is no end of a list
						//if(DEVMODE){GM_log("reSortQueue "+zoneNrF + " queue:"+print_r(zoneList[zoneNrL][0],"",true));}
						if(zoneList[zoneNrL][0][5]!=REPEAT_NO_LIMIT && OPTION_ITEM_REPEAT && zoneList[zoneNrL][0][4]){//extra check should not be needed but incase i forgot a state.
							zoneList[zoneNrL][0][5]--;
						}
					}
					//GM_log("reSortQueue "+zoneNrF+" zoneList[zoneNrL][0][5]:"+zoneList[zoneNrL][0][5]+" REPEAT_RESTART:"+REPEAT_RESTART);
					if(zoneList[zoneNrL][0][5]<=REPEAT_RESTART && zoneList[zoneNrL][0][5]!=REPEAT_NO_LIMIT){
						if(zoneList[zoneNrL].length<=1){
							//GM_log("reSortQueue "+zoneNrF +" length<=1");
							zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
						}else{
							//GM_log("reSortQueue "+zoneNrF +" length>1");
							zoneList[zoneNrL].splice(0,1);
						}
					}
					if(zoneList[zoneNrL].length>1){
						zoneList[zoneNrL].push(zoneList[zoneNrL].splice(0,1)[0]);
					}
				}
			}else if(zoneList[zoneNrL][0][3]){
				if(!iDoRack){
					if(zoneList[zoneNrL].length<=1){
						zoneList[zoneNrL][0]=DEFAULT_ZONELIST_ITEM.clone(); // stop if no items to go.
					}else{
						zoneList[zoneNrL].splice(0,1);
					}
				}
			}else if(zoneList[zoneNrL][0][1]<=0 && zoneList[zoneNrL].length<=1 && !zoneSettings[zoneNrL]["shuffle"]){
				zoneList[zoneNrL][0][1]=1; // reset to 1 only for displaying in repeat modus needed.
			}else if(zoneList[zoneNrL][0][1]<=0 && zoneList[zoneNrL].length<=1 && zoneSettings[zoneNrL]["shuffle"]){
				zoneList[zoneNrL][0]=DEFAULT_ZONELIST_ITEM.clone(); // stop if no items to go. //TODO do i realy have to stop. if no rackmode no repeat length=1 and shuffle or do i have to repeat as is !shuffle?
			}else if(zoneList[zoneNrL][0][1]<=0){
				zoneList[zoneNrL].splice(0,1);
			}

			if(zoneSettings[zoneNrL]["shuffle"]){
				zoneList[zoneNrL].shuffle();
			}
			//TODO do here remove PRODSTOP in shuffle or repeat mode list and not in RACK-mode
		}while (((zoneList[zoneNrL][0][3] && calcInGameProductAmount(zoneList[zoneNrL][0][0],zoneNrF,null,false)>=zoneList[zoneNrL][0][1])||(!zoneList[zoneNrL][0][3] && (zoneList[zoneNrL][0][1]<=(((OPTION_ITEM_REPEAT && zoneList[zoneNrL][0][4])||(OPTION_LIST_REPEAT && zoneSettings[zoneNrL]["repeat"]))?zoneList[zoneNrL][0][2]:0)))) && zoneList[zoneNrL].length>=1 && zoneList[zoneNrL][0][0]!=PRODSTOP);
		//GM_log("End Do:" + zoneList[zoneNrL][0][0]);
	}
	if(zoneList[zoneNrL].length<1){
		zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone();
	}
	itemsRackDone=null;itemsRepeatDone=null;itemsStopsFound=null;iDoRack=null;
	reFillQueueBox(zoneNrF);
	// GM_log("End reSortQueue :" + zoneNrF);
	return zoneList[zoneNrL][0][0];
}catch(err){GM_log("ERROR reSortQueue \n"+err);return PRODSTOP;}
}

function reSortWindmill(shuffle){
	if(DEVMODE){GM_log("Begin reSortWindmill shuffle:"+shuffle);}
	if(DEVMODE){showInLogBubble("reSortWindmill items");}
	var zoneNrF="windmill";
	var zoneNrL=getZoneListId(zoneNrF);
	do {
		if(shuffle){
			zoneList[zoneNrL].shuffle();
		}
		if(zoneList[zoneNrL][0][0]==PRODSTOP){
			break;
		}else if(autoMillStorage[zoneList[zoneNrL][0][0]]&&autoMillStorage[zoneList[zoneNrL][0][0]][2]<=0){
			var pCount=0;
			for(var rId=0;rId<zoneList[zoneNrL].length;rId++){
				pCount +=(zoneList[zoneNrL][0][0]==PRODSTOP?1:(autoMillStorage[zoneList[zoneNrL][rId][0]][2]<=0?1:0));
			}
			if(pCount==zoneList[zoneNrL].length){ //if none recipe can be milled which are bought due to product shortage
				zoneList[zoneNrL].unshift(DEFAULT_ZONELIST_MILL.clone()); //insert stop item at begin
			}else{
				zoneList[zoneNrL].push(zoneList[zoneNrL].splice(0,1)[0]); //add first item to the end of array
			}
		}else if(zoneList[zoneNrL].length==0 || zoneList[zoneNrL][0][1]<=0 && zoneList[zoneNrL].length<=1){
			zoneList[zoneNrL]=DEFAULT_ZONELIST_MILL_ARRAY.clone(); // stop if no items to go.
			break;
		}else if(zoneList[zoneNrL][0][1]<=0){
			zoneList[zoneNrL].splice(0,1); // delete first items
		}
	}while (zoneList[zoneNrL][0][1]<=0 || zoneList[zoneNrL].length==0 || (zoneList[zoneNrL][0][0]!=PRODSTOP && (!autoMillStorage[zoneList[zoneNrL][0][0]]||autoMillStorage[zoneList[zoneNrL][0][0]][2]<=0)));
}
//[zoneNrF][QueNr][0]=product number, [1]=number to grow, [2]=number grown in loop modus, [3]=Behaviour (Field (default), Rack, Time(//TODO)), [4]=mode (1 time (default), repeat)
//[zoneNrF][mill][0]=product number, [1]=number to grow, [2]=number grown in loop modus, [3]=Min([4]), [4]=Array([X]=Max recipes for product X)
//autoMillStorage: {[rId][0]=number bought, [1]=total number in zoneList[getZoneListId("windmill")], [2]=max number of recieps on products global Math.min([3][pId]), [3][pId]=max number of recieps for this products per products
function reCalculateWindmill(){
	if(DEVMODE){GM_log("Begin reCalculateWindmill");}
	if(DEVMODE){showInLogBubble("reCalculateWindmill");}
	var zoneNrF="windmill";
	var zoneNrL=getZoneListId(zoneNrF);
	var autoMillUsedProducts=new Array();
	for(var rId in autoMillStorage){
		if(!autoMillStorage.hasOwnProperty(rId)){continue;}
		if(autoMillStorage[rId][0]==0){
			delete autoMillStorage[rId];
		}else{
			autoMillStorage[rId][1]=0;
			autoMillStorage[rId][2]=NEVER; //max that can be baked.
		}
	}
	for(var v=0;v<zoneList[zoneNrL].length;v++){
		var rId=zoneList[zoneNrL][v][0];
		zoneList[zoneNrL][v][2]=0;
		zoneList[zoneNrL][v][3]=NEVER;
		zoneList[zoneNrL][v][4]=new Array();
		if(rId!=PRODSTOP){ // don't do anything with STOP
			if(autoMillStorage[rId]){
				autoMillStorage[rId][1] +=parseInt(zoneList[zoneNrL][v][1],10); // hold total number of recipe counter
	
				if(autoMillStorage[rId][1] > autoMillStorage[rId][0]){ // change the zoneList[zoneNrL] amount to the max amount that is bought
					zoneList[zoneNrL][v][1] -=(autoMillStorage[rId][1] - autoMillStorage[rId][0]);
					autoMillStorage[rId][1]=autoMillStorage[rId][0];
					if(zoneList[zoneNrL][v][1]<=0){
						zoneList[zoneNrL].splice(v,1);
						v--;
						continue;
					}
				}
				//give the lowest number of recieps that can be made with these products.
				for(var i=0;i<unsafeWindow.formulas[0][rId][3].length;i++){
					var pId=unsafeWindow.formulas[0][rId][3][i][0]; //product number in formulas
					var pNum=unsafeWindow.formulas[0][rId][3][i][1]; //amount in formulas
					var rNum=(unsafeData.prodStock[0][pId])?parseInt(unsafeData.prodStock[0][pId],10):0;
	
					if(!autoMillUsedProducts[pId]) autoMillUsedProducts[pId]=0;
					// GM_log("Calculate: " + i + " : " + rNum + " : " + pNum);
					var mx=rNum/pNum ; //(rNum - autoMillUsedProducts[pId])/pNum;
					autoMillStorage[rId][2]=Math.min(autoMillStorage[rId][2],mx<0?Math.ceil(mx):Math.floor(mx));
					autoMillUsedProducts[pId] +=(pNum * zoneList[zoneNrL][v][1]);
					zoneList[zoneNrL][v][4][i]=rNum - autoMillUsedProducts[pId];
					zoneList[zoneNrL][v][3]=Math.min(zoneList[zoneNrL][v][3],Math.floor(zoneList[zoneNrL][v][4][i]));
				}
			}else{ //if the rId is not bought
				zoneList[zoneNrL].splice(v,1);
				v--;
				break;
			}
		}
	}
	unsafeWindow.prodMinRackAddon.removeAll(0,texte["automat"]["titleQueue"]+"&nbsp;"+texte["windmill"]);
	for(var v=0;v<autoMillUsedProducts.length;v++){
		if(autoMillUsedProducts[v]>0){
			// GM_log("prodMinRackAddon add windmill\n"+implode([0,v,texte["automat"]["titleQueue"]+"&nbsp;"+texte["windmill"],autoMillUsedProducts[v]]));
			unsafeWindow.prodMinRackAddon.add(0,v,texte["automat"]["titleQueue"]+"&nbsp;"+texte["windmill"],autoMillUsedProducts[v]);
		}
	}
	autoMillUsedProducts=null;
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_autoMillStorage",implode(autoMillStorage,"reCalculateWindmill/autoMillStorage"));
	GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"reCalculateWindmill/zoneList"));
	// GM_log("End reCalculateWindmill");
}
function checkReadyZone(fz){
try{
	if(DEVMODE_FUNCTION){GM_log("Begin checkReadyZone fz:"+fz+" readyZone:"+implode(unsafeData.readyZone,"checkReadyZone/readyZone"));}
	var help,lz;
	if(!valBot){
		return false;
	}else if(fz){
		lz = getZoneListId(fz);
		if((help=unsafeData.readyZone[fz])&&help[2]&&((help[1]=="w")||(help[1]=="r" && (zoneList[lz][0][0]!=PRODSTOP||!valDisableCropFields))||(help[1]=="e" && zoneList[lz][0][0]!=PRODSTOP))){
			if(!zoneWaiting[fz]){
				if(isNaN(fz)){
					if(valUseBot[getGarden(fz)]){ botArbiterAdd(getGarden(fz)); }
				} else {
					botArbiterAdd("farm");
				}
			} else {
				GM_log("checkReadyZone fz="+fz+" zoneWaiting="+getDateText(zoneWaiting[fz])+" "+getDaytimeStr(zoneWaiting[fz]));
			}
		}
	}else{
		for(var fz in unsafeData.readyZone){
			if(!unsafeData.readyZone.hasOwnProperty(fz)){ continue; }
			if((help=unsafeData.readyZone[fz])&&help[2]){
				lz = getZoneListId(fz);
				// GM_log(fz+":"+(help[1]=="w")+"||("+(help[1]=="r")+"&&"+(zoneList[lz][0][0]!=PRODSTOP||!valDisableCropFields)+")||("+(help[1]=="e" && zoneList[lz][0][0]!=PRODSTOP)+")");
				if((help[1]=="w")||(help[1]=="r" && (zoneList[lz][0][0]!=PRODSTOP||!valDisableCropFields))||(help[1]=="e" && zoneList[lz][0][0]!=PRODSTOP)){
					if(zoneWaiting[fz]){
						GM_log("checkReadyZone fz="+fz+" zoneWaiting="+getDateText(zoneWaiting[fz])+" "+getDaytimeStr(zoneWaiting[fz]));
					} else {
						if(isNaN(fz)){
							if(valUseBot[getGarden(fz)]){
								botArbiterAdd(getGarden(fz));
							}
						} else {
							botArbiterAdd("farm");
						}
					}
				}
			}
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End checkReadyZone fz:"+fz+" return:"+false);}
	return false;
}catch(err){ GM_log("ERROR checkReadyZone fz="+fz+"\n readyZone="+implode(unsafeData.readyZone,"checkReadyZone/readyZone")+"\n"+err);}
}
function getReadyZone(location){
	if(DEVMODE_FUNCTION){GM_log("Begin getReadyZone location:"+location+" readyZone:"+implode(unsafeData.readyZone,"getReadyZone/readyZone"));}
	var help,zoneNrS,zoneNrL;
	if(!valBot){
		return null;
	}else{
		for(var zoneNrS in unsafeData.readyZone){
			if(!unsafeData.readyZone.hasOwnProperty(zoneNrS)){ continue; }
			if((help=unsafeData.readyZone[zoneNrS])&&help[2]&&((location==undefined)||(location==help[0]))){
				zoneNrL = getZoneListId(zoneNrS);
				if((help[1]=="w")||(help[1]=="r" && (zoneList[zoneNrL][0][0]!=PRODSTOP||!valDisableCropFields))||(help[1]=="e" && zoneList[zoneNrL][0][0]!=PRODSTOP)){
					if(zoneWaiting[zoneNrS]){
						GM_log("getReadyZone zoneNrS="+zoneNrS+" zoneWaiting="+getDateText(zoneWaiting[zoneNrS])+" "+getDaytimeStr(zoneWaiting[zoneNrS]));
					} else if((!isNaN(zoneNrS))||valUseBot[getGarden(zoneNrS)]){
						return zoneNrS;
					}
				}
			}
		}
	}
	if(DEVMODE_FUNCTION){ GM_log("End getReadyZone location:"+location+" return:"+null); }
	return null;
}
// Bot-functions handling fields,stables and factories
/*
function autoZone(){
	try{
		if(DEVMODE_FUNCTION){GM_log("Begin autoZone readyZone:"+implode(unsafeData.readyZone,"autoZone/readyZone"));}
		if(DEVMODE){ showInLogBubble("autoZone"); }
		// busy=true;
		if(!busy){ GM_log("BUSY NOT SET: autoZone");  return false;}
		var farmNr=(unsafeWindow.forestry_quicknavi?"f1":((unsafeWindow.cities&&unsafeWindow.city)?("c"+unsafeWindow.city):(parseInt(unsafeWindow.farm,10)-1)));
		var zoneNrF=null;
		zoneNrF=getReadyZone(farmNr);
		if(DEVMODE){GM_log("autoZone 1 farmNr:"+farmNr+" zoneNrF:"+zoneNrF);}
		if(zoneNrF==null){
			zoneNrF=getReadyZone();
			if(DEVMODE){GM_log("autoZone 2 zoneNrF:"+zoneNrF);}
			if(zoneNrF==null){ // nothing to work (all fields waiting !?)
				if(DEVMODE){GM_log("autoZone farmNr:"+farmNr+" zoneNrF:"+zoneNrF);}
				autoZoneFinish();
			}else{
				handled.zoneBuildingTyp=getBuildingTyp(zoneNrF);
				GM_log("autoZone handled.zoneBuildingTyp:"+handled.zoneBuildingTyp);
				switch(handled.zoneBuildingTyp){
					case 1:case 2:case 3:
						document.addEventListener("gameUpdateFarm",function(){
							document.removeEventListener("gameUpdateFarm",arguments.callee,false);
							showInLogBubble("Arrived in farm");
							autoZone();
						},false);
						window.setTimeout(function(){
							showInLogBubble("Change to farm "+(parseInt(unsafeData.readyZone[zoneNrF][0],10)+1));
							click($("farmlinks").getElementsByClassName("link")[unsafeData.readyZone[zoneNrF][0]]);
						},getRandom(tmin,tmax));
						break;
					case "windmill":
						document.addEventListener("gameCity2",function(){
							document.removeEventListener("gameCity2",arguments.callee,false);
							showInLogBubble("Arrived in city 2");
							autoZone();
						},false);
						window.setTimeout(function(){
							showInLogBubble("Change to city 2");
							click($top("citylineitem2"));
						},getRandom(tmin,tmax));
						break;
					case "forest":
					case "sawmill":
					case "carpentry":
						document.addEventListener("gameOpenForestry",function(){
							document.removeEventListener("gameOpenForestry",arguments.callee,false);
							showInLogBubble("Arrived in forestry");
							autoZone();
						},false);
						window.setTimeout(function(){
							showInLogBubble("Change to forestry");
							click($top("speedlink_forestry"));
						},getRandom(tmin,tmax));
						break;
				}
			}
		}else{
			handled.zoneNr=getGarden(zoneNrF);
			handled.zoneNrF=zoneNrF;
			handled.zoneNrL=getZoneListId(zoneNrF);
			handled.zoneBuildingTyp=getBuildingTyp(zoneNrF);
			unsafeWindow.jsTimeStamp=unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;

			if(!unsafeData.readyZone[handled.zoneNrS][2]){
				// close wrong zone
				var OpenZoneNrF=getOpenZoneNrF();
				if(OpenZoneNrF!=handled.zoneNrF){
					if($("gardenmaincontainer").style.display=="block"){ click($("gardencancel").getElementsByClassName("link")[0]); }
					if($("innermaincontainer").style.display=="block"){ click($("cancelscreen").getElementsByClassName("link")[0]); }
				}

				if(unsafeData.readyZone[handled.zoneNrS][1]=="e" && zoneList[handled.zoneNrL][0][0]==PRODSTOP){
					if(handled.zoneNrF=="windmill"||handled.zoneNrF=="sawmill"||handled.zoneNrF=="carpentry"||handled.zoneNrF=="forest"){
						autoZoneFinish();
					}else if(unsafeWindow.forestry_unlock!=undefined){
						autoZoneFinish($("button_cancel"+handled.zoneNrF));
					}else if(handled.zoneBuildingTyp>1){
						autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
					}else{
						autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
					}
				}else if(OpenZoneNrF!=handled.zoneNrF){
					if(DEVMODE) GM_log("click zone: " + farmNr + "." + handled.zoneNr + " readyZone=" +implode(unsafeData.readyZone,"autoZone/readyZone"));
					switch(handled.zoneBuildingTyp){
						case 1:
							document.addEventListener("gameOpenField",function(){//gameFieldModified
								document.removeEventListener("gameOpenField",arguments.callee,false);//gameFieldModified
								autoZoneHandle();
							},false);
							click($("zone"+handled.zoneNr).firstElementChild.firstElementChild);
						break;
						case 2:
							document.addEventListener("gameOpenStable",function(){
								document.removeEventListener("gameOpenStable",arguments.callee,false);
								autoZoneHandle();
							},false);
							click($("zone"+handled.zoneNr).firstElementChild.firstElementChild);
						break;
						case 3:
							document.addEventListener("gameOpenFactory",function(){
								document.removeEventListener("gameOpenFactory",arguments.callee,false);
								autoZoneHandle();
							},false);
							click($("zone"+handled.zoneNr).firstElementChild.firstElementChild);
							break;
						default://sawmill/carpentry/forest/windmill => not need to open an extra zone inside the farm/forestry/city
							autoZoneHandle();
							break;
					}
					if(DEVMODE){GM_log("autoZone click zone:"+handled.zoneNr+" readyZone:"+implode(unsafeData.readyZone,"autoZone/readyZone"));}
					showInLogBubble("Open zone "+handled.zoneNr);
				}else{
					showInLogBubble("Zone "+handled.zoneNr+" is opened");
					autoZoneHandle();
				}
			}
		}
		if(DEVMODE_FUNCTION){ GM_log("End autoZone handled.zoneNr:"+handled.zoneNr);}
	}catch(err){GM_log("ERROR boterror \n"+err);autoZoneFinish();} //busy=false;
}
*/
function autoZoneHandle(){
/*
DE-1: ERROR autoZoneHandle case 2* handled.zoneNrF=18
readyZone:{} 
TypeError: can't convert undefined to object

DE-1: ERROR autoZoneHandle case 2* handled.zoneNrF=14
readyZone:{"15":{"0":2,"1":"r","2":true},"18":{"0":2,"1":"r","2":true}} 
TypeError: can't convert undefined to object
*/
	if(DEVMODE_FUNCTION){GM_log("Begin autoZoneHandle"); }
	busy_action="autoZoneHandle";
	window.setTimeout(function(){
		switch(handled.zoneBuildingTyp){
			case 1:
				//-- GM_log("autoZoneHandle run nextFkt case:1");
				try{
					if(!unsafeData.zoneProductionData[handled.zoneNrF][3]){
						if(DEVMODE){ showInLogBubble("Field-Data not ready"); }
						showInLogBubble("Field-Data not ready");
						window.setTimeout(autoZoneHandle,getRandom(tmin2,tmax2));
					}else{
						autoZoneCrop();
						window.setTimeout(function(){
							var newdiv=$("busydiv");
							if(newdiv){ removeElement(cell); }
							newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
							newdiv.addEventListener("mouseover",function(evt){
								showToolTip(evt,texte["automat"]["botStop"]);
							},false);
							newdiv.addEventListener("click",function(){
								removeElement(this);
								updateQueueBox(handled.zoneNrF);
								deactivateBot();
							},false);
							newdiv=null;
							if(unsafeData.readyZone[handled.zoneNrS]&&(unsafeData.readyZone[handled.zoneNrS][1]=="w")){
								unsafeData.readyZone[handled.zoneNrS][2]=false;
								autoFarmWater(1,false,true); // just water
							}else if(zoneList[handled.zoneNrL][0][0]==PRODSTOP){
								autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
							}else{
								reSortQueue(handled.zoneNrF, false);
								autoFarmPlantInit(zoneList[handled.zoneNrL][0][0]); // init planting
							}
						},getRandom(tmin2,tmax2));
					}
				}catch(err){GM_log("ERROR autoZoneHandle case 1 handled.zoneNrF:"+handled.zoneNrF+" readyZone:"+implode(unsafeData.readyZone,"autoZoneHandle/readyZone")+" \n"+err);}
				break;
			case 2:
				//-- GM_log("autoZoneHandle run nextFkt case:2");
				try{
					busy_action="autoZoneHandle(2,crop)";
					autoZoneCrop();
				}catch(err){GM_log("ERROR autoZoneHandle case 2 handled.zoneNrF="+handled.zoneNrF+"\nreadyZone:"+implode(unsafeData.readyZone,"autoZoneHandle/readyZone")+" \n"+err);}
				window.setTimeout(function(){
				try{
					busy_action="autoZoneHandle(2,busydiv)";
					var newdiv=$("busydiv");
					if(newdiv){ removeElement(cell); }
					newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
					newdiv.addEventListener("mouseover",function(evt){
						showToolTip(evt,texte["automat"]["botStop"]);
					},false);
					newdiv.addEventListener("click",function(){
						removeElement(this);
						deactivateBot();
					},false);
					newdiv=null;
					busy_action="autoZoneHandle(2,cases)";
					if((!unsafeData.readyZone[handled.zoneNrS])||((zoneList[handled.zoneNrL][0][0]==PRODSTOP)&&(zoneList[handled.zoneNrL][1][0]==PRODSTOP))){
						busy_action="autoZoneHandle(2,autoZoneFinish)";
						autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
					}else if((unsafeWindow.premium==1) || (parseInt($("levelnum").innerHTML,10)<10)){
						busy_action="autoZoneHandle(2,autoFarmStablePremium)";
						unsafeData.readyZone[handled.zoneNrS][2]=false;
						autoFarmStablePremium(zoneList[handled.zoneNrL][0][0],zoneList[handled.zoneNrL][0][1]);
					}else{
						busy_action="autoZoneHandle(2,autoFarmStable)";
						unsafeData.readyZone[handled.zoneNrS][2]=false;
						autoFarmStable(zoneList[handled.zoneNrL][0][0],0,zoneList[handled.zoneNrL][0][1]);
					}
				}catch(err){GM_log("ERROR autoZoneHandle case 2* handled.zoneNrF="+handled.zoneNrF+"\nreadyZone:"+implode(unsafeData.readyZone,"autoZoneHandle/readyZone")+" \n"+err);}
				},getRandom(tmin2,tmax2));
				break;
			case 3:
				//-- GM_log("autoZoneHandle run nextFkt case:3");
				try{
					autoZoneCrop();
					window.setTimeout(function(){
						var newdiv=$("busydiv");
						if(newdiv){ removeElement(cell); }
						newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
						newdiv.addEventListener("mouseover",function(evt){
							showToolTip(evt,texte["automat"]["botStop"]);
						},false);
						newdiv.addEventListener("click",function(){
							removeElement(this);
							deactivateBot();
						},false);
						newdiv=null;
						if(zoneList[handled.zoneNrL][0][0]==PRODSTOP){
							autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
						}else{
							unsafeData.readyZone[handled.zoneNrS][2]=false;
							autoFarmFactory();
						}
					},getRandom(tmin2,tmax2));
				}catch(err){GM_log("ERROR autoZoneHandle case 3 handled.zoneNrF:"+handled.zoneNrF+" readyZone:"+implode(unsafeData.readyZone,"autoZoneHandle/readyZone")+" \n"+err);}
				break;
			/*
			case "windmill":
				autoWindmill();
				break;
			case "sawmill":
				reSortQueue(handled.zoneNrF, false);
				autoForestrySawmill();
				break;
			case "carpentry":
				reSortQueue(handled.zoneNrF, false);
				autoForestryCarpentry();
				break;
			case "forest":
				try{
					if(!unsafeData.zoneProductionData[handled.zoneNrF][3]){
						if(DEVMODE){ showInLogBubble("Field-Data not ready"); }
						window.setTimeout(autoZoneHandle,getRandom(tmin2,tmax2));
					}else{
						autoZoneCrop();
						window.setTimeout(function(){
							var newdiv=$("busydiv");
							if(newdiv){ removeElement(cell); }
							newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:-30px; left:200px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("forestry_forest"));
							newdiv.addEventListener("mouseover",function(evt){
								showToolTip(evt,texte["automat"]["botStop"]);
							},false);
							newdiv.addEventListener("click",function(){
								removeElement(this);
								updateQueueBox(handled.zoneNrF);
								deactivateBot();
							},false);
							newdiv=null;
							if(unsafeData.readyZone[handled.zoneNrS]&&(unsafeData.readyZone[handled.zoneNrS][1]=="w")){
								unsafeData.readyZone[handled.zoneNrS][2]=false;
								autoForestryWatering();
							}else if(zoneList[handled.zoneNrL][0][0]==PRODSTOP){
								autoZoneFinish();
							}else{
								reSortQueue(handled.zoneNrF, false);
								autoForestryPlantInit(zoneList[handled.zoneNrL][0][0]); // init planting
							}
						},getRandom(tmin2,tmax2));
					}
				}catch(err){GM_log("ERROR autoZoneHandle case forest handled.zoneNrF:"+handled.zoneNrF+" readyZone:"+implode(unsafeData.readyZone,"autoZoneHandle/readyZone")+" \n"+err);}
				break;
			*/
		}
	},getRandom(tmin2,tmax2));
}
function autoZoneCrop(){
try{
	var zoneTyp = parseInt(unsafeWindow.userfarminfos[unsafeWindow.farm][handled.zoneNr].buildingid, 10);
	
	if(DEVMODE){GM_log("autoZoneCrop zoneTyp"+zoneTyp);}
	switch (zoneTyp){
		case 1:
			var cropable=false;
			var NowServer=unsafeWindow.Zeit.Server;
			var emptycounter=0;
			for(var v=1;v<=120;v++){
				// GM_log(v);
				if((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0") && (parseInt(unsafeWindow.garten_zeit[v],10)<NowServer)){
					cropable=true;
					break;
				}
			}
			if(DEVMODE){GM_log("Cropping cropable:"+cropable);}
			if(cropable){
				showInLogBubble("Cropping");
				unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
				click($("cropall").getElementsByTagName("img")[0]);
				return true;
			}else{
				return false;
			}
			break;
		case 2:
			if($("globalbox").style.display=="block"){
				// TODO(Seberoth): 
				click($("globalbox_button1"));
				return true;
			}else{
				return false;
			}
			break;
		case 3:
			if($("globalbox").style.display=="block"){
				click($("globalbox_button1"));
				return true;
			}else{
				return false;
			}
			break;
		case "forest":
			try{
				var cropable=false,v;
				for(var i=0;i<unsafeWindow.forestry_area.length;i++){
					v=unsafeWindow.forestry_area[i]['position'];
					//GM_log("Cropping forestry_area["+i+"]['category']="+unsafeWindow.forestry_area[i]['category']+" forestry_area["+i+"]['block']="+unsafeWindow.forestry_area[i]['block']+" forestry_area_time["+v+"]="+unsafeWindow.forestry_area_time[v]);
					if(unsafeWindow.forestry_area[i]['category']==1 && unsafeWindow.forestry_area[i]['block']==0 && unsafeWindow.forestry_area_time[v]!=undefined&&unsafeWindow.forestry_area_time[v]<=0&&!unsafeData.zoneProductionData["forest"][2]<25){
						cropable=true;
						break;
					}
				}
				v=null;
			}catch(err){GM_log("ERROR forest cropping i:"+i+" v:"+v+"\n"+err);}

			if(DEVMODE){GM_log("Cropping cropable:"+cropable);}
			if(cropable){
				showInLogBubble("Cropping");
				unsafeData.zoneProductionData["forest"][3]=false;
				click($("forestry_forest_button2"));
				return true;
			}else{
				return false;
			}
			break;
		default:
			return false;
	}
	// GM_log("End ernte do nothing");
} catch(err){GM_log("ERROR autoZoneCrop \n"+err);return false;}
}
function autoZoneFinish(closeButton){
	if(DEVMODE){GM_log("autoZoneFinish handled.zoneNrF:"+handled.zoneNrF +" closeButton:"+(closeButton?closeButton.id:closeButton) + " readyZone:"+implode(unsafeData.readyZone,"autoZoneFinish/readyZone"));}
	//if(DEVMODE){GM_log("autoZoneFinish arg caller:"+autoZoneFinish.caller.toString());}
	busy_action="autoZoneFinish: init";
	top.unsafeData.autoAction="automat: autoZoneFinish";
	var help;
	// closeButton is optional, a click is fired on it
	if(unsafeData.zoneProductionData[handled.zoneNrF]&&!unsafeData.zoneProductionData[handled.zoneNrF][3]){
		busy_action="autoZoneFinish: data not ready";
		window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),closeButton);
	}else {
		if(help=$("busydiv")){
			busy_action="autoZoneFinish: remove busydiv";
			removeElement(help);
		}
		if(valBot){
			busy_action="autoZoneFinish: close zone";
			if(closeButton){  // Close
				try{
					click(closeButton);
				}catch(err){
					GM_log("ERROR autoZoneFinish closeButton\n"+err);
					autoZoneFinish();
				}
			}else if(closeButton!=undefined){
				if(DEVMODE){GM_log("autoZoneFinish not found handled.zoneNrF:"+handled.zoneNrF+" closeButton:"+(closeButton?closeButton.id:closeButton));}
			}
			busy_action="autoZoneFinish: reFillQueueBox";
			if(handled.zoneNrL){
				reFillQueueBox(handled.zoneNrF,handled.zoneNrL);
			}
			handled=new Object();
			top.unsafeData.autoAction=null;
			autoRunId++;
			busy=false;
			// initiate working progress of next zone
			busy_action="autoZoneFinish: checkReadyZone";
			checkReadyZone();
		}else{
			busy_action="autoZoneFinish: deactivateBot";
			top.unsafeData.autoAction=null;
			autoRunId++;
			deactivateBot();
		}
	}
	if(DEVMODE){GM_log("autoZoneFinish end");}
}

function autoFarm(){
	try{
		if(DEVMODE_FUNCTION){GM_log("Begin autoFarm readyZone:"+implode(unsafeData.readyZone,"autoFarm/readyZone"));}
		if(DEVMODE){ showInLogBubble("autoFarm"); }
		// busy=true;
		if(!busy){ GM_log("BUSY NOT SET: autoFarm");  return false;}
		busy_action="autoFarm";
		// TODO(Seberoth): come back later
		var farmNr=(parseInt(unsafeWindow.farm,10)-1);
		var zoneNrS=getReadyZone(farmNr);
		if(DEVMODE){ GM_log("autoFarm 1 farmNr:"+farmNr+" zoneNrS="+zoneNrS); }
		if(zoneNrS==null){
			busy_action="autoFarm: wrong farm";
			for(var i=0;i<parseInt(unsafeWindow.farmamount,10);i++){
				if((zoneNrS==null)&&(i!=farmNr)){ zoneNrS=getReadyZone(i); }
			}
			if(DEVMODE){GM_log("autoFarm 2 zoneNrS:"+zoneNrS);}
			if(zoneNrS==null){ // nothing to work (all fields waiting !?)
				if(DEVMODE){GM_log("autoFarm farmNr:"+farmNr+" zoneNrS="+zoneNrS);}
				autoZoneFinish();
			}else{
				document.addEventListener("gameUpdateFarm",function(){
					document.removeEventListener("gameUpdateFarm",arguments.callee,false);
					showInLogBubble("Arrived in farm");
					autoFarm();
				},false);
				window.setTimeout(function(){
					showInLogBubble("Change to farm "+(unsafeData.readyZone[zoneNrS][0]+1));
					click($("speedlink_farm"+(unsafeData.readyZone[zoneNrS][0]+1)));
				},getRandom(tmin,tmax));
			}
		}else{
			busy_action="autoFarm: correct farm";
			handled.zoneNrS=zoneNrS;
			handled.zoneNrF=handled.zoneNrS.toString().replace(/\.\d+$/,"");
			handled.zoneNr=getGarden(handled.zoneNrF);
			handled.zoneNrL=getZoneListId(handled.zoneNrF);
			handled.zoneBuildingTyp=getBuildingTyp(handled.zoneNrF);
			try{ unsafeWindow.jsTimeStamp=unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung; }catch(err){}

			if(unsafeData.readyZone[handled.zoneNrS][2]){ // TODO else
				busy_action="autoFarm: farm opened";
				// close wrong zone
				var OpenZoneNrF=getOpenZoneNrF();
				if(OpenZoneNrF!=handled.zoneNrF){
					if($("gardenmaincontainer").style.display=="block"){ click($("gardencancel").getElementsByClassName("link")[0]); }
					if($("innermaincontainer").style.display=="block"){ click($("cancelscreen").getElementsByClassName("link")[0]); }
				}
				if((unsafeData.readyZone[handled.zoneNrS][1]=="e")&&(zoneList[handled.zoneNrL][0][0]==PRODSTOP)){
					if(handled.zoneBuildingTyp>1){
						autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
					}else{
						autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
					}
				}else if(OpenZoneNrF!=handled.zoneNrF){
					if(DEVMODE) GM_log("click zone: " + farmNr + "." + handled.zoneNr + " readyZone=" +implode(unsafeData.readyZone,"autoFarm/readyZone"));
					switch(handled.zoneBuildingTyp){
						case 1:
							document.addEventListener("gameOpenField",function(){//gameFieldModified
								document.removeEventListener("gameOpenField",arguments.callee,false);//gameFieldModified
								autoZoneHandle();
							},false);
							click($("zone"+handled.zoneNr).querySelector(".bm"+getZoneTyp(handled.zoneNrF)));
						break;
						case 2:
							document.addEventListener("gameOpenStable",function(){
								document.removeEventListener("gameOpenStable",arguments.callee,false);
								autoZoneHandle();
							},false);
							click($("zone"+handled.zoneNr).querySelector(".bm"+getZoneTyp(handled.zoneNrF)));
						break;
						case 3:
							if((getZoneTyp(handled.zoneNrF)==13)||(getZoneTyp(handled.zoneNrF)==14)){
								document.addEventListener("gameOpenFactoryOil",function(){
									document.removeEventListener("gameOpenFactoryOil",arguments.callee,false);
									autoFarmFactoryOil();
								},false);
							}else{
								document.addEventListener("gameOpenFactory",function(){
									document.removeEventListener("gameOpenFactory",arguments.callee,false);
									autoZoneHandle();
								},false);
							}
							click($("zone"+handled.zoneNr).querySelector(".bm"+getZoneTyp(handled.zoneNrF)));
						break;
					}
					if(DEVMODE){GM_log("autoFarm click zone:"+handled.zoneNr+" readyZone:"+implode(unsafeData.readyZone,"autoFarm/readyZone"));}
					showInLogBubble("Open zone "+handled.zoneNr);
				}else{
					showInLogBubble("Zone "+handled.zoneNr+" is opened");
					autoZoneHandle();
				}
			}
		}
		if(DEVMODE_FUNCTION){ GM_log("End autoFarm handled.zoneNr:"+handled.zoneNr);}
	}catch(err){GM_log("ERROR autoFarm \n"+err);autoZoneFinish();} //busy=false;
}
function autoFarmCrop(v){
	if(DEVMODE) GM_log("autoFarmCrop "+v);
	busy_action="autoCrop";
	var wait=false;
	if(unsafeWindow.mode!="1"){ click($("ernten")); }
	var NowServer=unsafeWindow.Zeit.Server;
	if(unsafeWindow.garten_kategorie[v]=="v"){
		var z=parseInt(unsafeWindow.garten_zeit[v],10);
		if((z>0)&&(unsafeWindow.garten_x[v]==1)&&(unsafeWindow.garten_y[v]==1)){ // first part plants
			if(z<NowServer){
				wait=true;
				unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
				click($("f"+v));
			}
		}
	}
	if(v<120){
		if(wait){
			window.setTimeout(autoFarmCrop,getRandom(tmin,tmax),v+1);
		}else{
			autoFarmCrop(v+1);
		}
	}
}

function autoFarmPlantInit(rackitemNr){
	if(DEVMODE) GM_log("autoFarmPlantInit :"+rackitemNr + "(" + typeof rackitemNr+")");
	busy_action="autoFarmPlantInit";
	showInLogBubble("Initializing planting ("+rackitemNr+")");
	if(unsafeWindow.racksort&&(unsafeWindow.racksort>3)){
		// non-plant-rack opened
		showInLogBubble("Switching rack to plants");
		document.addEventListener("gameUpdateRack",function(rackitemNr){
			return function(){
				window.setTimeout(function(){ autoFarmPlantInit(rackitemNr); },tmin2);
				document.removeEventListener("gameUpdateRack",arguments.callee,false);
			};
		}(rackitemNr),false);
		click($("rackcat1"));
	// }else if(unsafeWindow.racksorttype&&(unsafeWindow.racksorttype!=0)){
	// 	// rack filtered
	// 	showInLogBubble("Removing rack filter");
	// 	document.addEventListener("gameUpdateRack",function(rackitemNr){
	// 		return function(){
	// 				window.setTimeout(function(){ autoFarmPlantInit(rackitemNr); },tmin2);
	// 				document.removeEventListener("gameUpdateRack",arguments.callee,false);
	// 		};
	// 	}(rackitemNr),false);
	// 	click($("racksort4"));
	}else if(!(unsafeData.prodStock[0][rackitemNr]&&unsafeData.prodStock[0][rackitemNr]>0)){
		// product is missing
		// this is correct set, even if rack is updating
		showInLogBubble("Plant is not in rack",10,"red");
		autoFarmPlantDefault();
	}else if(unsafeWindow.selected==rackitemNr){
		// calculate time of next cropping
		// here its not important if rack is updating
		var time=NEVER;
		var NowServer=unsafeWindow.Zeit.Server;
		for(var v=1;v<=120;v++){
			if(unsafeWindow.garten_kategorie[v]=="v"){ // only plants
				var z=parseInt(unsafeWindow.garten_zeit[v],10);
				if(z>0){
					time=Math.min(time,z-NowServer);
				}
			}
		}
		time=Math.max(time,0);
		if(time<=valSeedWaitForCrop){
			zoneWaiting[handled.zoneNrF]=now+time;
			window.setTimeout(function(){//TIMEOUT
				for(var fz in zoneWaiting){
					if(!zoneWaiting.hasOwnProperty(fz)){continue;}
					if(zoneWaiting[fz]<=now){ delete zoneWaiting[fz]; }
				}
				checkReadyZone();
			},(1000*time)+getRandom(tmin2,tmax2));
			showInLogBubble("Waiting for crop in "+getTimeStr(time));
			if(DEVMODE){GM_log("initAutoPlant Waiting for crop in "+getTimeStr(time));}
			autoZoneFinish();
			return false;
		}
		// Correct plant selected
		if(calcEmptyProductPositions(rackitemNr,handled.zoneNrF)>0){
			if((unsafeWindow.premium==1) && (unsafeWindow.currentuserlevel>=unsafeWindow.autoplantlevel)){
				autoFarmPlantPremium();
			}else{
				autoFarmPlant(1,false,true);
			}
		}else{
			autoFarmPlantDefault();
		}
	}else{
		showInLogBubble("Wrong plant selected");
		var nextRack=(unsafeWindow.racksort%3)+1;
		while(unsafeWindow.racklocks&&unsafeWindow.racklocks[nextRack]){
			nextRack=(nextRack%3)+1;
		}
		if($("rackitem"+rackitemNr)){
			if(unsafeWindow.updateRackBusy){
				// Rack not loaded
				showInLogBubble("Rack not loaded",10,"red");
				document.addEventListener("gameUpdateRack",function(rackitemNr){
					return function(){
						window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
						document.removeEventListener("gameUpdateRack",arguments.callee,false);
					};
				}(rackitemNr),false);
			}else{
				if($("rackitem"+rackitemNr).style.display!="none"){
					showInLogBubble("Seed found");
					click($("rackitem"+rackitemNr)); // rackitem found
					window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
				}else if(unsafeWindow.racksort!=nextRack){
					// call next rack
					document.addEventListener("gameUpdateRack",function(rackitemNr){
						return function(){
							window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
							document.removeEventListener("gameUpdateRack",arguments.callee,false);
						};
					}(rackitemNr),false);
					showInLogBubble("Switching to next rack");
					click($("rackswitch"+nextRack));
					// unsafeWindow.updateRack((1+parseInt(unsafeWindow._currRack,10))%unsafeWindow.userracks);
					//window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
				}else{
					// should not happen
					showInLogBubble("Invisible non-empty rackitem and only 1 rack",10,"red");
					autoFarmPlantDefault();
				}
			}
		}else if(unsafeWindow.racksort!=nextRack){
			// rackamount>0 but no rackitem
			//=2nd or 3rd rack was not loaded yet
			document.addEventListener("gameUpdateRack",function(rackitemNr){
				return function(){
					window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
					document.removeEventListener("gameUpdateRack",arguments.callee,false);
				};
			}(rackitemNr),false);
			showInLogBubble("Switching to next rack (no rackitem)");
			click($("rackswitch"+nextRack));
			// unsafeWindow.updateRack((1+parseInt(unsafeWindow._currRack,10))%unsafeWindow.userracks); // call next rack
		}else{// rackamount>0 but no rackitem and 1 rack
			// should not happen because thats "product is missing" (1.case)
			showInLogBubble("No rackitem but rackamount and only 1 rack",10,"red");
			autoFarmPlantDefault();
		}
		nextRack=null;
	}
	// GM_log("End initAutoPlant :"+rackitemNr + " : " + typeof rackitemNr);
}
function autoFarmPlantDefault(){
	if(DEVMODE) GM_log("autoFarmPlantDefault");
	busy_action="autoFarmPlantDefault";
	showInLogBubble("Searching other plant");
	// handled.zoneNrF=getFarmZone(handled.zoneNr);
	if(unsafeWindow.updateRackBusy){
		// Rack not loaded
		showInLogBubble("Rack not loaded",10,"red");
		document.addEventListener("gameUpdateRack",function(){
			window.setTimeout(autoFarmPlantDefault,tmin2);
			document.removeEventListener("gameUpdateRack",arguments.callee,false);
		},false);
	}else{
		var rackitemNr=null;
		// try emergency plants
		for(var v=0;v<emergencyPlants.length;v++){
			if(unsafeData.prodStock[0][emergencyPlants[v]]&&unsafeData.prodStock[0][emergencyPlants[v]]>0&&(calcEmptyProductPositions(emergencyPlants[v],handled.zoneNrF)>0)){
				rackitemNr=emergencyPlants[v];
				showInLogBubble("Taking emergency plant "+rackitemNr);
				window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
				break;
			}
		}
		if(rackitemNr==null){
			// first plant in loaded rack
			var cand=$("rackItems").getElementsByClassName("sack");
			for(var v=0;v<cand.length;v++){
				if(cand[v].style.display=="none"){ continue; }
				var prod=cand[v].id.replace("rackitem","");
				if((unsafeData.prodTyp[0][prod]=="v")&&(calcEmptyProductPositions(prod,handled.zoneNrF)>0)){
					rackitemNr=prod;
					break;
				}
			}
			cand=null;
			if(rackitemNr!=null){
				showInLogBubble("Taking "+unsafeData.prodName[0][rackitemNr]);
				window.setTimeout(autoFarmPlantInit,tmin2,rackitemNr);
			}else if(unsafeWindow.userracks>1){
				// does a plant exist in other rack?
				var plants=false;
				for(var v=0;v<unsafeData.prodTyp[0].length;v++){ // all
					if((unsafeData.prodTyp[0][v]=="v")&&(calcEmptyProductPositions(v,handled.zoneNrF)>0)&&unsafeData.prodStock[0][v]&&unsafeData.prodStock[0][v]>0){
						plants=true;
						break;
					}
				}
				if(plants){
					document.addEventListener("gameUpdateRack",function(){
						autoFarmPlantDefault();
						document.removeEventListener("gameUpdateRack",arguments.callee,false);
					},false);
					showInLogBubble("Switching to next rack");
					unsafeWindow.updateRack((1+parseInt(unsafeWindow._currRack,10))%unsafeWindow.userracks); // call next rack
				}else{
					showInLogBubble("No plant in racks.<br>Would add stop.",10,"red");
					//zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
					//updateQueueBox(handled.zoneNrF);
					autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
				}
			}else{
				showInLogBubble("No plant in rack.<br>Would add stop.",10,"red");
				//zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
				//updateQueueBox(handled.zoneNrF);
				autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
			}
		}
	}
}
function autoFarmPlant(v,didPlant,isBot){
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmPlant :"+v+":"+didPlant+":"+isBot);}
	if(!busy){ GM_log("BUSY NOT SET: autoFarmPlant:"+v+":"+didPlant+":"+isBot); }
	if(isBot&&!valBot){ return false; } // bot is switched off (or wrong called)
	busy_action="autoFarmPlant";
	if(v==1){ showInLogBubble("Planting"); }
	if(unsafeWindow.mode!="0"){ click($("anpflanzen")); }
	if($("busydiv")){
		if(v<121){
			if((unsafeData.prodTyp[0][unsafeWindow.selected]=="v")&&unsafeData.prodStock[0][unsafeWindow.selected]&&unsafeData.prodStock[0][unsafeWindow.selected]>0){
				$("busydiv").innerHTML=texte["automat"]["pflanze"];
				if(v%12==1){ linecount=0; }
				var frei=true;
				if(unsafeWindow.garten_kategorie[v] && ((unsafeWindow.garten_kategorie[v]!="v") || (unsafeWindow.garten_zeit[v]!="0"))){ frei=false; }
				else{
					if(unsafeWindow.global_x=="2"){
						if(v%12==0){ frei=false; }
						else{
							w=v+1;
							if(unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei=false; }
							else{
								if(unsafeWindow.global_y=="2"){
									if(v>108){ frei=false; }
									else{
										w=v+12;
										if(unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei=false; }
										else{
											w=v+13;
											if(unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei=false; }
										}
									}
								}
							}
						}
					}
				}

				if(frei){
					unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
					click($("f"+v));
					v+=parseInt(unsafeWindow.global_x,10);
					linecount +=parseInt(unsafeWindow.global_x,10);
					if(linecount>11){ v +=12*(parseInt(unsafeWindow.global_y,10)-1); }
					window.setTimeout(autoFarmPlant,getRandom(tmin,tmax),v,true,isBot);
				}else{
					autoFarmPlant(v+1,didPlant,isBot);
				}
			}else{
				showInLogBubble("Invalid plant");
				$("busydiv").innerHTML=texte["automat"]["warte"];
				if(didPlant&&isBot){ setNextQueueItem(handled.zoneNrS); }
				autoFarmWater(1,didPlant,isBot);
			}
		}else{
			GM_log("All fields done");
			showInLogBubble("All fields done");
			if(autoZoneCrop()){
				window.setTimeout(autoFarmPlant,getRandom(tmin2,tmax2),1,didPlant,isBot);
			}else{
				$("busydiv").innerHTML=texte["automat"]["warte"];
				if(didPlant&&isBot){ setNextQueueItem(handled.zoneNrS); }
				window.setTimeout(autoFarmWater,getRandom(tmin2,tmax2),1,didPlant,isBot);
			}
		}
	}else{
		autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
	}
	if(DEVMODE_FUNCTION){GM_log("End autoFarmPlant :"+ v);}
}
function autoFarmPlantPremium(){
	if(!busy){ GM_log("BUSY NOT SET: autoFarmPlantPremium");}
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmPlantPremium");}
	busy_action="autoFarmPlantPremium";
	showInLogBubble("Planting (Premium)");
	$("busydiv").innerHTML="Premium "+texte["automat"]["pflanze"];
	var leereFelder=0;
	for(var v=1;v<=120;v++){
		if(unsafeWindow.garten_kategorie[v]=="v"){
			if(!unsafeWindow.garten_prod[v]){ leereFelder++; }
		}else{
			if((unsafeWindow.garten_kategorie[v]!="z") && (unsafeWindow.garten_kategorie[v]!="u")){ leereFelder++; }
		}
	}
	// GM_log(leereFelder);
	if(leereFelder>0){
		// busy_action="autoFarmPlantPremium: click gardencancel";
		// click($("gardencancel").getElementsByClassName("link")[0]);
		// window.setTimeout(function(){
			busy_action="autoFarmPlantPremium: click autoplantbutton";
			$("globalcommitbox").addEventListener("DOMAttrModified",function(event){
				if((this==event.target)&&(this.style.display=="block")){
					busy_action="autoFarmPlantPremium: click globalcommitboxfooter";
					window.setTimeout(function(){
						document.addEventListener("gameFieldModified",function(){
							busy_action="autoFarmPlantPremium: autoFarmWater";
							window.setTimeout(autoFarmWater,getRandom(tmin2,tmax2),1,true,true);
							document.removeEventListener("gameFieldModified",arguments.callee,false);
						},false);
						unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
						click($("globalcommitboxfooter").firstElementChild);
						setNextQueueItem(handled.zoneNrS);
					},getRandom(tmin2,tmax2));
					this.removeEventListener("DOMAttrModified",arguments.callee,false);
				}
			},false);
			click($("autoplantbuttoninner")); // open automat
		// },getRandom(tmin2,tmax2));
	}else{
		autoFarmWater(1,false,true);
	}
	if(DEVMODE_FUNCTION){GM_log("End autoFarmPlantPremium");}
}
function autoFarmWater(v,didPlant,isBot){
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmWater :"+v);}
	if(!busy){ GM_log("BUSY NOT SET: autoFarmWater:"+v+":"+didPlant+":"+isBot);}
	busy_action="autoFarmWater "+v+": init";
	if(isBot){
		if(!valBot){ return false; } // bot is switched off (or wrong called)
		if(!valWater){ // bot shall not water (option)
			autoZoneFinish($("gardencancel").getElementsByClassName("link")[0]);
			return false;
		}
	}
	if(DEVMODE&&v==1){ GM_log("autoFarmWater :"+v); }
	if(v==1){ showInLogBubble("Watering Field"); }
	if($("tooltipwaterall")){
		busy_action="autoFarmWater "+v+": premium";
		window.setTimeout(function(){
			showInLogBubble("Water all");
			unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
			click($("waterall").getElementsByTagName("img")[0]);
			window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),isBot?$("gardencancel").getElementsByClassName("link")[0]:null);
		},getRandom(tmin2,tmax2));
	}else{
		busy_action="autoFarmWater "+v+": non-premium";
		if(unsafeWindow.mode!="2") click($("giessen"));
		if($("busydiv")){
			$("busydiv").innerHTML=texte["automat"]["giesse"];
			if(v<121){
				if((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0") && (isNaN(parseInt(unsafeWindow.garten_wasser[v],10))||(parseInt(unsafeWindow.garten_wasser[v],10)+86400<unsafeWindow.Zeit.Server))){
					busy_action="autoFarmWater "+v+": will click ";
					window.setTimeout(function(){
						busy_action="autoFarmWater "+v+": click ";
						unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
						click($("f"+v));
						autoFarmWater(v+parseInt(unsafeWindow.garten_max_x[v],10),didPlant,isBot);
					},getRandom(tmin,tmax));
				}else{
					busy_action="autoFarmWater "+v+": continue ";
					autoFarmWater(v+1,didPlant,isBot);
				}
			}else{
				busy_action="autoFarmWater "+v+": finish ";
				if(autoZoneCrop()){
					busy_action="autoFarmWater "+v+": finish, cropable";
					window.setTimeout(autoFarmPlant,getRandom(tmin2,tmax2),1,didPlant,isBot);
				}else{
					busy_action="autoFarmWater "+v+": finish, not cropable";
					click($("anpflanzen"));
					window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),isBot?$("gardencancel").getElementsByClassName("link")[0]:null);
				}
			}
		}else{
			busy_action="autoFarmWater "+v+": not busy";
			click($("anpflanzen"));
			window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),isBot?$("gardencancel").getElementsByClassName("link")[0]:null);
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End autoFarmWater :"+v);}
}
function autoFarmStable(sorte,feedcounter,maxFeed){
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmStable :"+":"+sorte+":"+feedcounter+":"+maxFeed);}
	if(!busy){ GM_log("BUSY NOT SET: autoFarmStable:"+sorte+":"+feedcounter+":"+maxFeed); }
	busy_action="autoFarmStable";
	if(feedcounter==0){ showInLogBubble("Feeding"); }
	if($("busydiv")){
		$("busydiv").innerHTML=texte["automat"]["fuettere"]+" "+feedcounter+" "+unsafeWindow.produkt_name[sorte];
		// TODO(Seberoth): Replace all errorbox with globalbox
		if($("errorboxinner").style.display=="block"){
			// Error displayed
			click($("errorboxfooterinner").getElementsByClassName("link")[0]);
			window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),$("cancelscreen").getElementsByClassName("link")[0]);
		}else{
			if(unsafeData.prodStock[0][sorte]&&unsafeData.prodStock[0][sorte]>0){
				//feed found
				
				// TODO(Seberoth): Replace feed method
				
				unsafeWindow.buildingInnerDialogBox('feed',unsafeWindow.farm,handled.zoneNr,sorte);
				//unsafeWindow.feedAnimals(sorte); // give feed
				// GM_log("feed "+sorte);
				feedcounter++;
				if(feedcounter>=maxFeed){
					if(valBot && (sorte==zoneList[handled.zoneNrL][0][0]) && (zoneList[handled.zoneNrL][1][1]>0)){
						autoFarmStable(zoneList[handled.zoneNrL][1][0],0,zoneList[handled.zoneNrL][1][1]); //do other food
					}else{
						removeElement($("busydiv"));
						window.setTimeout(autoFarmStable,3*getRandom(tmin,tmax),sorte,feedcounter,maxFeed);
					}
				}else{
					window.setTimeout(autoFarmStable,3*getRandom(tmin,tmax),sorte,feedcounter,maxFeed);
				}
			}else if(valBot){
				// feed not found
				if(1+parseInt(unsafeWindow._currRack,10)<unsafeWindow.userracks){
					unsafeWindow.updateRack(1+parseInt(unsafeWindow._currRack,10));//switch to last rack
					window.setTimeout(autoFarmStable,getRandom(tmin2,tmax2),sorte,feedcounter,maxFeed);
				}else{
					if(sorte==zoneList[handled.zoneNrL][0][0]){
						autoFarmStable(zoneList[handled.zoneNrL][1][0],0,zoneList[handled.zoneNrL][1][1]); //do other food
					}else{
						if(unsafeData.readyZone[handled.zoneNrS]){
							showInLogBubble("No feed.<br>Stopping zone.",10,"red");
							zoneList[handled.zoneNrL][0][0]=PRODSTOP;//sleep zone
							updateQueueBox(handled.zoneNrF);
						}
						autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
					}
				}
			}
		}

	}else{
		// TODO(Seberoth):
		if($("errorboxinner").style.display=="block"){
			click($("errorboxfooterinner").getElementsByClassName("link")[0]);
			window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),$("cancelscreen").getElementsByClassName("link")[0]);
		}else{
			autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End autoFarmStable :"+":"+sorte);}
}
function autoFarmStablePremium(sorte,amount){
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmStablePremium :"+sorte+":"+amount);}
	if(!busy){ GM_log("BUSY NOT SET: autoprem:"+sorte+":"+amount); }
	busy_action="autoFarmStablePremium";

	showInLogBubble("Feeding (Premium)");
	$("busydiv").innerHTML=texte["automat"]["futterautomat"]+" "+unsafeWindow.produkt_name[sorte];
	// TODO(Seberoth): Hab keinen PA
	if($("errorboxinner").style.display=="block"){
		click($("errorboxfooterinner").getElementsByClassName("link")[0]);
	}
	if(unsafeData.prodStock[0][sorte]&&unsafeData.prodStock[0][sorte]>0){
		//enough food
		window.setTimeout(function(){
			unsafeWindow.commitSubmitFillFood(handled.zoneNr,sorte); // start feed
			window.setTimeout(function(){
				$("feedamount").value=amount; // enter amount
				keyup($("feedamount"));
				window.setTimeout(function(){
					click($("commitboxfooterinner").firstElementChild); //FIXED IT for forestry
					if((sorte==zoneList[handled.zoneNrL][0][0]) && (zoneList[handled.zoneNrL][1][1]>0)){
						autoFarmStablePremium(zoneList[handled.zoneNrL][1][0],zoneList[handled.zoneNrL][1][1]); //do other feed
					}else{
						autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
					}
				},getRandom(tmin2,tmax2));
			},getRandom(tmin2,tmax2));
		},getRandom(tmin2,tmax2));
	}else{
		if((sorte==zoneList[handled.zoneNrL][0][0]) && (zoneList[handled.zoneNrL][1][1]>0)){
			autoFarmStablePremium(zoneList[handled.zoneNrL][1][0],zoneList[handled.zoneNrL][1][1]); //do other feed
		}else{
			if(unsafeData.readyZone[handled.zoneNrS]){
				showInLogBubble("No feed.<br>Stopping zone.",10,"red");
				zoneList[handled.zoneNrL][0][0]=PRODSTOP;//sleep zone //TODO bought items must be PRODSTOP;
				updatePflanzeBox(handled.zoneNrF);
			}
			autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
		}
	}
	if(DEVMODE_FUNCTION){GM_log("End autoFarmStablePremium :"+":"+sorte);}
}
function autoFarmFactory(){
	busy_action="autoFarmFactory";
	if(DEVMODE_FUNCTION){GM_log("Begin autoFarmFactory :" + handled.zoneNrF);}
	showInLogBubble("Doing factory");
	if(!busy){ GM_log("BUSY NOT SET: autoFarmFactory"); }
	$("busydiv").innerHTML=texte["automat"]["fabrikautomat"];
	var gotoFarm=window.setInterval(function(){
		if(!(valBot&&busy)){ window.clearInterval(gotoFarm); }
		// GM_log("autoFarmFactory 1 valbot:"+valbot+" busy:"+busy);
		if($("innermaincontainer").style.display=="block" && !$("infoblock"+unsafeWindow.locationinfo[6])){
			window.clearInterval(gotoFarm);
			// GM_log("autoFarmFactory click:"+"advancedproductionbutton"+unsafeWindow.locationinfo[6]);
			// click on "Produktion starten"
			click($("advancedproductionbutton"+unsafeWindow.locationinfo[6]+"_"+unsafeData.BUILDING_INPUT[getZoneTyp(handled.zoneNrL)][zoneList[handled.zoneNrL][0][0]][0][0][0]).firstElementChild);
			// click($("advancedproductionbutton"+unsafeWindow.locationinfo[6]).firstElementChild);
			var gotoFabrik=window.setInterval(function(){
				if(!(valBot&&busy)){ window.clearInterval(gotoFabrik); }
				// GM_log("autoFarmFactory 2 valbot:"+valbot+" busy:"+busy);
				if($("commitboxinner").style.display=="block"){
					window.clearInterval(gotoFabrik);
					click($("commitboxfooterinner").firstElementChild);
					setNextQueueItem(handled.zoneNrS);
					var gotoExit=window.setInterval(function(){
						if(!(valBot&&busy)) window.clearInterval(gotoExit);
						if($("infoblock"+unsafeWindow.locationinfo[6]) && $("infoblock"+unsafeWindow.locationinfo[6]).style.display=="block"){
							window.clearInterval(gotoExit);
							window.setTimeout(function(){
								autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
							},getRandom(tmin2,tmax2));
							/*
							click($("cancelscreen").getElementsByClassName("link")[0]);
							var gotoMain=window.setInterval(function(){
								if(!(valBot&&busy)) window.clearInterval(gotoMain);
								if($("innermaincontainer").style.display=="none"){
									window.clearInterval(gotoMain);
									removeElement($("busydiv"));
									busy=false;
								}
							},getRandom(tmin2,tmax2));
						*/
						}
					},getRandom(tmin2,tmax2));
				}
			},getRandom(tmin2,tmax2));
		}else if($("infoblock"+unsafeWindow.locationinfo[6])){
			window.clearInterval(gotoFarm);
			//removeElement($("busydiv"));
			//busy=false;
			if(DEVMODE){GM_log("autoFarmFactory fabrik is running");}
			autoZoneFinish();
		}
	},getRandom(tmin2,tmax2));
	// GM_log("End autoFarmFactory :" + handled.zoneNrF);
}
function autoFarmFactoryOil(step){
	try{
	if(!step){ step=1; }
	if(valBot){
		if(busy){
			busy_action="autoFarmFactoryOil ("+step+")";
showInLogBubble(busy_action);
			var action=null,listeningEvent=null;
			switch(step){
			case 1: // init
				// TODO check required products earlier (recalcQueue)
				if(unsafeData.zoneBlock[handled.zoneNrS]){
					zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
					updateQueueBox(handled.zoneNrS);
					window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),6);
				}else{
					if(zoneList[handled.zoneNrL][0][0]!=PRODSTOP){
						var req=unsafeData.BUILDING_INPUT[getZoneTyp(handled.zoneNrS)][zoneList[handled.zoneNrL][0][0]][0];
						for(var i=0;i<req.length;i++){
							if(unsafeData.prodStock[0][req[i][0]]<req[i][1]){
								zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
								updateQueueBox(handled.zoneNrS);
							}
						}
					}
					if(unsafeData.zoneEndTimes[handled.zoneNrS]==NEVER){ // empty
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),3);
					}else if(unsafeData.zoneEndTimes[handled.zoneNrS]<=unsafeWindow.Zeit.Server){ // cropable
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
					}else{ // busy
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),6);
					}
				}
			break;
			case 2: // crop
// unsafeData.valErnte					
				var slot=/\.(\d+)$/.exec(handled.zoneNrS)[1];
				var div=$("oil_slot"+slot+"_cropbutton");
				if(div&&(div.style.display=="block")){
					unsafeData.readyZone[handled.zoneNrS][2]=false;
					click(div);
					div=null;
					window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
				}else{
					autoFarmFactoryOil(step+1);
				}
			break;
			case 3: // click slot
				if(unsafeData.readyZone[handled.zoneNrS]){
					if(unsafeData.readyZone[handled.zoneNrS][2]&&(unsafeData.readyZone[handled.zoneNrS][1]=="e")){
						if(zoneList[handled.zoneNrL][0][0]==PRODSTOP){
							autoFarmFactoryOil(6);
						}else{
							var slot=/\.(\d+)$/.exec(handled.zoneNrS)[1];
							var div=$("oil_slot"+slot);
							click(div);
							div=null;
							window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
						}
					} else {
						// wait for response
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step);
					}
				}else{
					autoFarmFactoryOil(6);
				}
			break;
			case 4: // click oil
				var div=$("oil_selectbox");
				if(div&&(div.style.display=="block")){
					div=div.querySelector(".oil"+zoneList[handled.zoneNrL][0][0]);
					if(div){
						click(div.parentNode);
						setNextQueueItem(handled.zoneNrS);
						div=null;
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
					} else {
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step);
					}
				}else{
					window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step);
				}
			break;
			case 5: // wait for response
				if(unsafeData.readyZone[handled.zoneNrS]){
					window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step);
				} else {
					window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
				}
			break;
			case 6: // exit
				autoZoneFinish($("cancelscreen").getElementsByClassName("link")[0]);
			break;
			}
			if(listeningEvent){
				document.addEventListener(listeningEvent,function(listeningEvent,step){
					return function(){
						document.removeEventListener(listeningEvent,arguments.callee,false);
						window.setTimeout(autoFarmFactoryOil,getRandom(tmin2,tmax2),step+1);
					};
				}(listeningEvent,step),false);
			}
			if(action){ action(); }
			listeningEvent=null;action=null;
		}else{
			GM_log("BUSY NOT SET: autoFarmFactoryOil");
		}
	}
	}catch(err){ GM_log("ERROR autoFarmFactoryOil("+step+")\n"+err); }
}

function autoWindmill(runId,step){
	if(!step){ step=1; }
	if(valBot&&valUseBot["windmill"]){
		if(busy){
			busy_action="autoWindmill ("+step+")";
showInLogBubble(""+busy_action+" "+implode(unsafeData.readyZone["windmill"]));
			var zoneNrF="windmill";
			var zoneNrL=getZoneListId(zoneNrF);
			var action=null,listeningEvent=null;
			switch(step){
			case 1: // init and open city
				reSortWindmill(false); // checks if recipe is possible
				if(zoneList[zoneNrL].length==0){ zoneList[zoneNrL]=DEFAULT_ZONELIST_MILL_ARRAY; }
				if(unsafeData.readyZone["windmill"]&&(unsafeData.readyZone["windmill"][1]=="e")&&(zoneList[zoneNrL][0][0]==PRODSTOP)){
					// Windmill is empty and no recipe to do
					autoWindmill(runId,8); // exit
				}else{
					listeningEvent="gameCity2";
					action=function(){ click($top("speedlink_city2")); };
				}
			break;
			case 2: // open windmill
				// test if possible $("windmillproductiontime").style.display=="block"
				listeningEvent="gameOpenWindmill";
				action=function(){ click($("cityzone_2_1")); };
			break;
			case 3: // get powerup
				if($("globalcommitbox").style.display=="block"){
					click($("globalcommitboxfooter").firstElementChild);
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
				}else{
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+2);
				}
			break;
			case 4: // powerup-message
				if($("globalbox").style.display=="block"){
					click($("globalbox_button1"));
				}
				window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
			break;
			case 5: // drag new recipe
				if(zoneList[zoneNrL][0][0]!=PRODSTOP){
					var newdiv=unsafeWindow.document.createElement("div");
					newdiv.id="windmillformula"+zoneList[zoneNrL][0][0];
					unsafeWindow.addWindmillFormula(newdiv);
					newdiv=null;
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
				} else {
					autoWindmill(runId,8); // exit
				}
			break;
			case 6: // confirm new recipe
				if($("windmillpaper").style.display=="block"){
					unsafeData.readyZone[zoneNrL][2]=false;
					click($("windmillproduction").firstElementChild.firstElementChild);
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
				} else {
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step);
				}
			break;
			case 7: // wait for response
				if(unsafeData.readyZone[zoneNrL]){
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step);
				} else {
					botArbiterClear("windmill");
					//if($("windmillproductiontime").style.display=="block"){
					// windmill started -> pop from queue
					if(isNaN(zoneList[zoneNrL][0][1])){ zoneList[zoneNrL][0][1]=1; }
					if(autoMillStorage[zoneList[zoneNrL][0][0]]&&autoMillStorage[zoneList[zoneNrL][0][0]][2]>0){
						zoneList[zoneNrL][0][1]--;
						autoMillStorage[zoneList[zoneNrL][0][0]][0]--;
					}
					if(zoneList[zoneNrL][0][1]<=0 && zoneList[zoneNrL].length<=1){ zoneList[zoneNrL]=DEFAULT_ZONELIST_MILL_ARRAY.clone(); }
					// } else {
					// 	// windmill not started -> stop queue
					// 	zoneList[zoneNrL].unshift(DEFAULT_ZONELIST_MILL.clone()); //insert stop item at begin
					// }
					GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"autoWindmill/zoneList"),"autoWindmill/zoneList");			
					reCalculateWindmill();
					reSortWindmill(zoneSettings[zoneNrL]["shuffle"]);
					reFillQueueBox(zoneNrF, zoneNrL, 0);
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
				}
			break;
			case 8: // close windmill
				if($("windmillinner").style.display=="block"){
					click($("windmillheader").getElementsByClassName("link")[0]);
					window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
				} else {
					autoWindmill(runId,step+1);
				}
			case 9: //
				busy=false;
				botArbiterCheck(); // -> calls activatePowerUp if needed 
			break;
			}
			if(listeningEvent){
				document.addEventListener(listeningEvent,function(listeningEvent,runId,step){
					return function(){
						document.removeEventListener(listeningEvent,arguments.callee,false);
						window.setTimeout(autoWindmill,getRandom(tmin2,tmax2),runId,step+1);
					};
				}(listeningEvent,runId,step),false);
			}
			if(action){ action(); }
			listeningEvent=null;action=null;
		}else{
			GM_log("BUSY NOT SET: autoWindmill");
		}
	}
}
function checkPowerUp(mode){
	var foundPowerUp=false;
	if(valPowerUpActivate){
		for(var v in unsafeWindow.powerupcontent){ // find powerup
			if(!unsafeWindow.powerupcontent.hasOwnProperty(v)){ continue; }
			if(unsafeWindow.powerupcontent[v][5] && unsafeWindow.powerupcontent[v][5][0][1]){
				foundPowerUp=v;
				break;
			}
		}
	}
	return mode==0?(!!foundPowerUp):foundPowerUp;
}
function autoActivatePowerUp(){
	if(!busy){ GM_log("BUSY NOT SET: autoActivatePowerUp"); return false;}
	if(DEVMODE_FUNCTION){GM_log("Begin autoActivatePowerUp powerupcontent:"+implode(unsafeWindow.powerupcontent,"autoActivatePowerUp/powerupcontent"));}
	if(!valPowerUpActivate){
		busy=false;
		return false;
	}
	busy_action="autoActivatePowerUp";
	if(DEVMODE){ showInLogBubble("Looking for powerups",5,"green");}
	var foundPowerUp=checkPowerUp();
	// GM_log("autoActivatePowerUp foundPowerUp:"+foundPowerUp);
	if(foundPowerUp!=null){
		if(unsafeWindow.farm!=1){//switch to farm
			// GM_log("autoActivatePowerUp switch to farm 1");
			document.addEventListener("gameUpdateFarm",function(){
				document.removeEventListener("gameUpdateFarm",arguments.callee,false);
				//showInLogBubble("Arrived in farm");
				window.setTimeout(autoActivatePowerUp,getRandom(tmin2,tmax2));


			},false);
			window.setTimeout(function(){
				//showInLogBubble("Change farm to 1");
				click($("speedlink_farm1"));
				// click($("farmlinks").getElementsByClassName("link")[0]);
			},getRandom(tmin2,tmax2));
		}else if(unsafeWindow.powerupcontent[foundPowerUp]){
			// GM_log("autoActivatePowerUp open powerupbar");
			if($("powerupselector").style.display!="block"){ click($("powerupbar")); }
			window.setTimeout(function(){
				if(foundPowerUp>=(unsafeWindow.poweruprack * 12)){
					// GM_log("autoActivatePowerUp click powerselectornavidown");
					click($("powerselectornavidown"));
					window.setTimeout(autoActivatePowerUp,getRandom(tmin2,tmax2)); //wait for showPowerUps() //non request


				}else if(foundPowerUp < ((unsafeWindow.poweruprack-1) * 12)){
					// GM_log("autoActivatePowerUp click powerselectornaviup");
					click($("powerselectornaviup"));
					window.setTimeout(autoActivatePowerUp,getRandom(tmin2,tmax2)); //wait for showPowerUps() //non request


				}else{
					$("globalcommitbox").addEventListener("DOMAttrModified",function(){
						if(this.style.display=="block"){
							window.setTimeout(function(){
								document.addEventListener("gamePowerupcontentUpdated",function(){
									document.removeEventListener("gamePowerupcontentUpdated",arguments.callee,false);
									if(valUseBot["windmill"]&&valPowerUpActivate){
										$("powerselectorcontentblock").style.display="";
										botArbiterAdd("activatePowerUp");
									}
									busy=false;
								},false);
								showInLogBubble("Activated powerup: "+unsafeWindow.powerupcontent[foundPowerUp][2],20,"green");
								// GM_log("autoActivatePowerUp click commit :" + unsafeWindow.powerupcontent[foundPowerUp][2]);
								click($("globalcommitboxfooter").firstElementChild);
							},getRandom(tmin2,tmax2));
							this.removeEventListener("DOMAttrModified",arguments.callee,false);
						}
					},false);
					// GM_log("autoActivatePowerUp click powerup :" + unsafeWindow.powerupcontent[foundPowerUp][2]);
					click($("powerupmain"+unsafeWindow.powerupcontent[foundPowerUp][0]));
				}
			},getRandom(tmin2,tmax2));
		}else{
			if(DEVMODE){ showInLogBubble("Exiting powerups unknown combination",5,"red");}
			if($("powerupselector").style.display=="block"){ click($("powerupbar")); }
			busy=false;
		}
	}else{
		if(DEVMODE){ showInLogBubble("Exiting powerups no powerup found",5,"red");}
		if($("powerupselector").style.display=="block"){ click($("powerupbar")); }
		busy=false;
	}
}

function autoForestry(runId){
	try{
		if(!valBot){
			GM_log("BOT OFF: autoForestry");
		}else if(!valUseBot["forestry"]){
			GM_log("FORESTRY BOT OFF: autoForestry");
		}else if(!busy){
			GM_log("BUSY NOT SET: autoForestry");
		}else if(top.unsafeData.autoAction!=null){
			busy_action="autoForestry waiting ("+top.unsafeData.autoAction+")";
			window.setTimeout(autoForestry,getRandom(tmin2,tmax2),runId);
		}else{
			top.unsafeData.autoAction="automat: autoForestry";
			busy_action="autoForestry";
			// showInLogBubble(""+busy_action+" "+implode(unsafeData.readyZone["forest"]));
			var zoneNrS=getReadyZone("forestry");
			if(zoneNrS==null){
				GM_log("autoForestry. no ready zone\nreadyZone="+implode(unsafeData.readyZone));
				autoZoneFinish();
			}else{
				handled=new Object();
				handled.zoneNrS=zoneNrS;
				handled.zoneNrF=handled.zoneNrS.toString().replace(/\.\d+$/,"");
				handled.zoneNrL=getZoneListId(handled.zoneNrF);
				handled.zoneBuildingTyp=getBuildingTyp(handled.zoneNrF);
				try{ unsafeWindow.jsTimeStamp=unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung; }catch(err){}
				if(unsafeData.readyZone[handled.zoneNrS][2]){
					switch(handled.zoneBuildingTyp){
						case "forest": autoForestryForest(runId,1,1,false,true); break;
						case "sawmill":
						case "carpentry": autoForestryBuilding(runId,1); break;
					}
				}else{
					GM_log("autoForestry. data not ready\nreadyZone[handled.zoneNrS]="+implode(unsafeData.readyZone[handled.zoneNrS]));
					autoZoneFinish(); // TODO else
				}
			}
		}
		if(DEVMODE_FUNCTION){ GM_log("End autoForestry handled.zoneNr:"+handled.zoneNr);}
	}catch(err){GM_log("ERROR autoForestry runId="+runId+"\n"+err);autoZoneFinish();} //busy=false;
}
function autoForestryForest(runId,step,field,didPlant,isBot){
try{
	// GM_log("autoForestryForest runId="+runId+" step="+step+" field="+field+" didPlant="+didPlant+" isBot="+isBot);
	if((!isBot)||(valBot&&valUseBot["forestry"])){
		if(!busy){
			GM_log("BUSY NOT SET: autoForestryForest");
		}else if(runId!=autoRunId){
			GM_log("WRONG RUN ID: autoForestryForest("+runId+"!="+autoRunId+")");
		}else{
			top.unsafeData.autoAction="automat: autoForestryForest";
			busy_action="autoForestryForest ("+step+")";
			// showInLogBubble(""+busy_action+" "+implode(unsafeData.readyZone["forest"]));
			var zoneNrF="forest";
			var zoneNrS="forest";
			var zoneNrL=getZoneListId(zoneNrS);
			var help,action=null,listeningEvent=null;
			switch(step){
			case 1:{ // init
				if(zoneList[zoneNrL].length==0){ zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone(); }
				if(unsafeData.prodTyp[1][zoneList[zoneNrL][0][0]]!="f1"){ zoneList[zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone(); }
				// open forestry
				if((help=unsafeData.readyZone[zoneNrL])&&help[2]&&(!zoneWaiting[zoneNrL])&&((help[1]=="w")||((help[1]=="r")&&(zoneList[zoneNrL][0][0]!=PRODSTOP||!valDisableCropFields))||((help[1]=="e")&&(zoneList[zoneNrL][0][0]!=PRODSTOP)))){
					listeningEvent="gameOpenForestry";
					action=function(){ click($("speedlink_forestry")); };
				}else{
					autoForestryForest(runId,7,field,didPlant,isBot); // -> exit
				}
			break;}
			case 2:{ // set zoneWaiting
				var time=NEVER;
				var NowServer=unsafeWindow.Zeit.Server;
				for(var v=0;v<unsafeWindow.forestry_area_time.length;v++){ //use area_time because this holds only planted fields or if just emptied==0
					if(unsafeWindow.forestry_area_time[v]>0){
						time=Math.min(time,unsafeWindow.forestry_area_time[v]);
					}
				}
				time=Math.max(time,0);
				if(time<=valSeedWaitForCrop){
					zoneWaiting[handled.zoneNrF]=now+time;
					window.setTimeout(function(){
						for(var fz in zoneWaiting){
							if(!zoneWaiting.hasOwnProperty(fz)){continue;}
							if(zoneWaiting[fz]<=now){ delete zoneWaiting[fz]; }
						}
						checkReadyZone();
					},(1000*time)+getRandom(tmin2,tmax2));
					showInLogBubble("Waiting for crop in "+getTimeStr(time));
					autoForestryForest(runId,7,field,didPlant,isBot); // -> exit
				}else{
					if(help=$("busydiv")){ removeElement(help); }
					help=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute;top:25px;left:2px;width:130px;height:40px;border:3px inset black;background-color:yellow;z-index:50;display:block;padding:10px;font-weight:bold"},$("forestry_container"));
					help.addEventListener("mouseover",function(evt){
						showToolTip(evt,"Stop automat"); // TODO texte
					},false);
					help.addEventListener("click",function(){
						autoZoneFinish();
						//removeElement(this);
					},false);				
					autoForestryForest(runId,3,field,didPlant,isBot);
				}
			break;}
			case 3:{ // cropping
				if((!isBot)||(zoneList[zoneNrL][0][0]!=PRODSTOP)||(!valDisableCropFields)){
					$("busydiv").innerHTML="Forest automat<br>Cropping"; //TODO texte
					if(unsafeWindow.premium==1){
						if(!unsafeData.zoneProductionData[zoneNrS][3]){
							window.setTimeout(autoForestryForest,getRandom(tmin2,tmax2),runId,step,field,didPlant,isBot);
						}else if(unsafeData.zoneEndTimes[zoneNrS]<unsafeWindow.Zeit.Server){
							listeningEvent="gameOpenForestry";
							action=function(){ click($top("forestry_forest_button2")); };
						}else{
							autoForestryForest(runId,step+1,field,didPlant,isBot);
						}
					}else if(field<=25){
						for(var i in unsafeWindow.forestry_area){ //if not in forestry_area the field is empty
							if(!unsafeWindow.forestry_area.hasOwnProperty(i)){continue;}
							if(parseInt(unsafeWindow.forestry_area[i]["position"],10)==field){
								break;
							}
						}
						if((unsafeWindow.forestry_area[i]["category"]==1)&&(unsafeWindow.forestry_area[i]["block"]=="0")&&(unsafeWindow.forestry_area[i]["ready"]==1)){
							unsafeData.zoneProductionData[zoneNrS][3]=false;
							click($("forestry_pos"+field));
							window.setTimeout(autoForestryForest,getRandom(tmin,tmax),runId,step,field+1,didPlant,isBot);
						}else{
							autoForestryForest(runId,step,field+1,didPlant,isBot);
						}
					}else if(!unsafeData.zoneProductionData[zoneNrS][3]){
						// GM_log("autoForestryForest step="+step+"\ndata not ready");
						window.setTimeout(autoForestryForest,getRandom(tmin2,tmax2),runId,step,field,didPlant,isBot);
					}else if(isBot){
						autoForestryForest(runId,step+1,1,didPlant,isBot);
					}else{
						autoForestryForest(runId,7,1,didPlant,isBot); // -> exit
					}
				}else{
					autoForestryForest(runId,step+1,1,didPlant,isBot);
				}
			break;}
			case 4:{ // select tree
				if(zoneList[zoneNrL][0][0]!=PRODSTOP){
					$("busydiv").innerHTML="Forest automat<br>Select tree"; //TODO texte
					if(zoneList[zoneNrL][0][0]!=unsafeWindow.forestry_plant){
						if(help=$("f_stock_item"+zoneList[zoneNrL][0][0])){
							click(help);
							window.setTimeout(autoForestryForest,getRandom(tmin,tmax),runId,step,field,didPlant,isBot);
						}else{ // tree not available
							showInLogBubble("Tree not available");
							zoneList[zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone()); //add PRODSTOP to begin of list
							updateQueueBox(handled.zoneNrS);
							autoForestryForest(runId,6,1,didPlant,isBot); // -> water
						}
					}else{
						autoForestryForest(runId,step+1,1,didPlant,isBot);
					}
				}else{
					autoForestryForest(runId,6,1,didPlant,isBot); // -> water
				}
			break;}
			case 5:{ // planting
				if(field==1){
					showInLogBubble("Planting forestry");
					$("busydiv").innerHTML="Forest automat<br>"+texte["automat"]["pflanze"]; //TODO texte
				}
				if(field<=25){
					help=true;
					for(var i in unsafeWindow.forestry_area){ //if not in forestry_area the field is empty
						if(!unsafeWindow.forestry_area.hasOwnProperty(i)){continue;}
						if(parseInt(unsafeWindow.forestry_area[i]["position"],10)==field){
							help=false;
							break;
						}
					}
					if(help){
						unsafeData.zoneProductionData[zoneNrS][3]=false;
						showInLogBubble("click field:"+field,10,"orange");
						click($("forestry_pos"+field));
						window.setTimeout(autoForestryForest,getRandom(tmin,tmax),runId,step,field+1,true,isBot);
					}else{
						autoForestryForest(runId,step,field+1,didPlant,isBot);
					}
				}else if(!unsafeData.zoneProductionData[zoneNrS][3]){
					window.setTimeout(autoForestryForest,getRandom(tmin2,tmax2),runId,step,field,didPlant,isBot);
				}else{
					// if(autoZoneCrop()){ ... go back }
					if(isBot&&didPlant){ setNextQueueItem(handled.zoneNrS); }
					autoForestryForest(runId,step+1,1,didPlant,isBot);
				}
			break;}
			case 6:{ // watering
				if(unsafeData.zoneBonus[zoneNrF]>0){
					showInLogBubble("Watering forestry");
					$("busydiv").innerHTML="Forest automat<br>"+texte["automat"]["giesse"]; //TODO texte
					if(!unsafeData.zoneProductionData[zoneNrS][3]){
						window.setTimeout(autoForestryForest,getRandom(tmin2,tmax2),runId,step,field,didPlant,isBot);
					}else if(unsafeData.zoneWaterTimes[zoneNrS]<unsafeWindow.Zeit.Server){
						unsafeData.zoneProductionData[zoneNrS][3]=false;
						listeningEvent="gameOpenForestry";
						action=function(){ click($top("forestry_forest_button1")); };
					}else{
						autoForestryForest(runId,step+1,field,didPlant,isBot);
					}
				}else{
					autoForestryForest(runId,step+1,field,didPlant,isBot);
				}
			break;}
			case 7:{ // exit
				autoZoneFinish();
			break;}
			}
			if(listeningEvent){
				document.addEventListener(listeningEvent,function(listeningEvent,runId,step,field,didPlant,isBot){
					return function(){
						document.removeEventListener(listeningEvent,arguments.callee,false);
						window.setTimeout(autoForestryForest,getRandom(tmin2,tmax2),runId,step+1,field,didPlant,isBot);
					};
				}(listeningEvent,runId,step,field,didPlant,isBot),false);
			}
			if(action){ action(); }
			help=null;listeningEvent=null;action=null;
		}
	}
}catch(err){GM_log("ERROR autoForestryForest runId="+runId+" step="+step+" field="+field+" didPlant="+didPlant+" isBot="+isBot+"\n"+err);}
}
function autoForestryBuilding(runId,step){
try{
	GM_log("autoForestryBuilding runId="+runId+" step="+step+" handled.zoneNrS="+handled.zoneNrS);
	if(valBot&&valUseBot["forestry"]){
		if(!busy){
			GM_log("BUSY NOT SET: autoForestryBuilding");
		}else if(runId!=autoRunId){
			GM_log("WRONG RUN ID: autoForestryBuilding("+runId+"!="+autoRunId+")");
		}else{
			busy_action="autoForestryBuilding ("+step+")";
			// showInLogBubble(""+busy_action+" "+implode(unsafeData.readyZone["forest"]));
			var help,action=null,listeningEvent=null;
			var slot=/\.(\d+)$/.exec(handled.zoneNrS)[1];
			switch(step){
			case 1:{ // init
				if(zoneList[handled.zoneNrL].length==0){ zoneList[handled.zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone(); }
				if(handled.zoneNrF=="sawmill"){
					if(unsafeData.prodTyp[1][zoneList[handled.zoneNrL][0][0]]!="f3"){ zoneList[handled.zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone(); }
				}else{
					if((unsafeData.prodTyp[1][zoneList[handled.zoneNrL][0][0]]!="f4")&&(unsafeData.prodTyp[1][zoneList[handled.zoneNrL][0][0]]!="f5")){ zoneList[handled.zoneNrL]=DEFAULT_ZONELIST_ITEM_ARRAY.clone(); }
				}
				// open forestry
				if((help=unsafeData.readyZone[handled.zoneNrS])&&help[2]&&(((help[1]=="r")&&(zoneList[handled.zoneNrL][0][0]!=PRODSTOP||!valDisableCropFields))||((help[1]=="e")&&(zoneList[handled.zoneNrL][0][0]!=PRODSTOP)))){
					action=function(){ click($("speedlink_forestry")); };
					listeningEvent="gameOpenForestry";
				}else{
					autoForestryBuilding(runId,8); // -> exit
				}
			break;}
			case 2:{
				// check required products
				help=true;
				if(zoneList[handled.zoneNrL][0][0]!=PRODSTOP){
					help=unsafeData.prodRequire[1][zoneList[handled.zoneNrL][0][0]];
					if(typeof help=="object"){
						for(var i=0;i<help.length;i++){
							if(unsafeData.prodStock[help[i][0]][help[i][1]]<help[i][2]){
								zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
								updateQueueBox(handled.zoneNrS);
								break;
							}
						}
					}
				}
				// open building
				if((help=unsafeData.readyZone[handled.zoneNrS])&&help[2]&&(((help[1]=="r")&&(zoneList[handled.zoneNrL][0][0]!=PRODSTOP||!valDisableCropFields))||((help[1]=="e")&&(zoneList[handled.zoneNrL][0][0]!=PRODSTOP)))){
					if(help=$("busydiv")){ removeElement(help); }
					help=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute;top:25px;left:2px;width:130px;height:40px;border:3px inset black;background-color:yellow;z-index:50;display:block;padding:10px;font-weight:bold"},$("forestry_container"));
					help.addEventListener("mouseover",function(evt){
						showToolTip(evt,"Stop automat"); // TODO texte
					},false);
					help.addEventListener("click",function(){
						autoZoneFinish();
						//removeElement(this);
					},false);				
					help.innerHTML=handled.zoneNrF.capitalize()+" automat<br>Opening"; //TODO texte				
					action=function(){ click($("forestry_building_click"+(handled.zoneNrF=="sawmill"?1:2))); };
					listeningEvent="gameOpen"+handled.zoneNrF.capitalize();
				}else{
					autoForestryBuilding(runId,8); // -> exit
				}
			break;}
			case 3:{ // cropping
				if((zoneList[handled.zoneNrL][0][0]!=PRODSTOP)||(!valDisableCropFields)){
					$("busydiv").innerHTML=handled.zoneNrF.capitalize()+" automat<br>Cropping"; //TODO texte
					if((help=$("forestry_slot_crop"+slot)) && (help.style.display=="block")){
						action=function(){ click(help); };
						listeningEvent="gameOpenGlobalCommitBox";
					}else{
						autoForestryBuilding(runId,step+2);
					}
				}else{
					autoForestryBuilding(runId,step+2);
				}
			break;}
			case 4:{ // confirm
				action=function(){ click($("globalcommitboxfooter").firstElementChild); };	
				listeningEvent="gameOpen"+handled.zoneNrF.capitalize();
			break;}
			case 5:{ // open slot
				if(zoneList[handled.zoneNrL][0][0]!=PRODSTOP){
					$("busydiv").innerHTML=handled.zoneNrF.capitalize()+" automat<br>Opening slot"; //TODO texte
					action=function(){ click($("forestry_slot"+slot)); };	
					listeningEvent="gameOpen"+handled.zoneNrF.capitalize()+"Slot";
				}else{
					autoForestryBuilding(runId,8); //->exit
				}			
			break;}
			case 6:{ // start production
				if((handled.zoneNrF=="sawmill")&&(help=$("forestry_sawmill_productbox"))&&(help=help.querySelector(".f_symbol"+zoneList[handled.zoneNrL][0][0]))&&(help.parentNode.style.display=="block")){
					$("busydiv").innerHTML=handled.zoneNrF.capitalize()+" automat<br>Start production"; //TODO texte
					action=function(){ click(help); };
					listeningEvent="gameOpenGlobalCommitBox";
				}else if((handled.zoneNrF=="carpentry")&&(help=$("forestry_carpenter_productbox"))&&(help=help.querySelector(".f_symbol"+zoneList[handled.zoneNrL][0][0]))&&(help.parentNode.style.display=="block")){
					$("busydiv").innerHTML=handled.zoneNrF.capitalize()+" automat<br>Start production"; //TODO texte
					action=function(){
						mouseover(help);
						window.setTimeout(click,100,help);
					};
					listeningEvent="gameOpenGlobalCommitBox";
				}else{
					zoneList[handled.zoneNrL].unshift(DEFAULT_ZONELIST_ITEM.clone());
					updateQueueBox(handled.zoneNrS);
					autoForestryBuilding(runId,8); //->exit
				}
			break;}
			case 7:{ // confirm
				action=function(){
					click($("globalcommitboxfooter").firstElementChild);
					setNextQueueItem(handled.zoneNrS);
				};
				listeningEvent="gameOpen"+handled.zoneNrF.capitalize();
			break;}
			case 8:{ // other slots
				var slotNew=null;
				for(var slot=1;slot<=3;slot++){
					var zoneNrS=handled.zoneNrF+"."+slot;
					if((!unsafeData.zoneBlock[zoneNrS])&&(help=unsafeData.readyZone[zoneNrS])&&help[2]){
						var zoneNrL=getZoneListId(zoneNrS);
						if(((help[1]=="r")&&(zoneList[zoneNrL][0][0]!=PRODSTOP||!valDisableCropFields))||((help[1]=="e")&&(zoneList[zoneNrL][0][0]!=PRODSTOP))){
							handled.zoneNrS=zoneNrS;
							handled.zoneNrL=zoneNrL;
							slotNew=slot;
							break;
						}
					}
				}
				if(slotNew==null){
					autoZoneFinish($("forestry_productiondialog_close")); // exit
				}else{
					autoForestryBuilding(runId,2);
				}
			break;}
			}
			if(listeningEvent){
				document.addEventListener(listeningEvent,function(listeningEvent,runId,step){
					return function(){
						document.removeEventListener(listeningEvent,arguments.callee,false);
						window.setTimeout(autoForestryBuilding,getRandom(tmin2,tmax2),runId,step+1);
					};
				}(listeningEvent,runId,step),false);
			}
			if(action){ action(); }
			help=null;listeningEvent=null;action=null;
		}
	}
}catch(err){GM_log("ERROR autoForestryBuilding runId="+runId+" step="+step+"\n"+err);}
}

function _autoForestrySawmill(){
	if(!busy){ GM_log("BUSY NOT SET: autoForestrySawmill"); return false;}
	if(DEVMODE_FUNCTION){GM_log("Begin autoForestrySawmill");}
	var zoneNrL=getZoneListId(handled.zoneNrF);
	if(unsafeData.zoneProductionData[handled.zoneNrF]&&!(unsafeData.zoneProductionData[handled.zoneNrF][3])){
		if(DEVMODE){ showInLogBubble("Field-Data not ready"); }
		window.setTimeout(autoZoneHandle,getRandom(tmin2,tmax2));
	}else{
		window.setTimeout(function(){
			if($("forestry_productiondialog").style.display!="block"){
				click($("forestry_building_click1"));
			}
			var gotoZone=window.setInterval(function(){
			try{
				GM_log("autoForestrySawmill begin");
				if(!busy) window.clearInterval(gotoZone);
				if($("globalbox").style.display=="block"){
					click($("globalbox_button1"));
				}else if($("forestry_productiondialog").style.display=="block"){
					window.clearInterval(gotoZone);
					var doSlot=handled.zoneNrF.match(/[A-z]*([^A-z]*)/)[1];
					GM_log("autoForestrySawmill forestry_productiondialog doSlot:"+doSlot);
					if(doSlot==1||unsafeWindow.forestry_slots[doSlot]){
						var help=unsafeWindow.forestry_user_buildings[getForestryUserBuilding(1)];
						if((!help["slots"]||!help["slots"][doSlot])&&zoneList[zoneNrL][0][0]!=PRODSTOP){
							GM_log("autoForestrySawmill plant:"+zoneList[zoneNrL][0][0]+" doSlot:"+doSlot);
							var found=false;
							for(var i in unsafeData.zoneEndTimes[handled.zoneNrF]){
								if(!unsafeData.zoneEndTimes[handled.zoneNrF].hasOwnProperty(i)){continue;}
								if(unsafeData.zoneEndTimes[handled.zoneNrF][i]==NEVER || unsafeData.zoneEndTimes[handled.zoneNrF][i]<=now){
									found=true;
								}
							}
							if(!found && unsafeData.readyZone[handled.zoneNrS]){ unsafeData.readyZone[handled.zoneNrS][2]=false; }
							unsafeWindow.currentslot=doSlot;
							unsafeWindow.forestryAjaxAction("startproduction",1,zoneList[zoneNrL][0][0]); // type => 1 = saegewerk / 2 = schreinerei
							document.addEventListener("gameOpenForestry",function(){
								document.removeEventListener("gameOpenForestry",arguments.callee,false);
								setNextQueueItem(handled.zoneNrS);
								autoZoneFinish($("forestry_productiondialog_close"));
							},false);
/*
						}else if($("forestry_slot_crop"+doSlot).display.style=="block"){
							unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
							$("globalcommitbox").addEventListener("DOMAttrModified",function(){
								if(this.style.display=="block"){
									window.setTimeout(function(){
										document.addEventListener("gameOpenForestry",function(){
											document.removeEventListener("gameOpenForestry",arguments.callee,false);
											autoForestrySawmill();
										},false);
										showInLogBubble("Activated powerup: "+unsafeWindow.powerupcontent[foundPowerUp][2],20,"green");
										click($("globalcommitboxfooter").firstElementChild);
									},getRandom(tmin2,tmax2));
									this.removeEventListener("DOMAttrModified",arguments.callee,false);
								}
							},false);
							GM_log("autoForestrySawmill crop doSlot:"+doSlot);
							click($("forestry_slot_crop"+doSlot));
*/
						}else if(help["slots"]&&help["slots"][doSlot]&&help["slots"][doSlot]["ready"]==1){
							unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
							unsafeWindow.forestryAjaxAction("cropproduction",1,0,doSlot);
							document.addEventListener("gameOpenForestry",function(){
								document.removeEventListener("gameOpenForestry",arguments.callee,false);
								autoForestrySawmill();
							},false);
						}
					}else{
						if(unsafeData.readyZone[handled.zoneNrS]){ unsafeData.readyZone[handled.zoneNrS][2]=false; }
						autoZoneFinish($("forestry_productiondialog_close"));
					}
				}
			}catch(err){GM_log("ERROR autoForestrySawmill zoneNrL:"+zoneNrL+"\n"+err);}
			},getRandom(tmin2,tmax2));
		},getRandom(tmin2,tmax2));
	}
	if(DEVMODE_FUNCTION){GM_log("End autoForestrySawmill");}
}
function _autoForestryCarpentry(){
	if(!busy){ GM_log("BUSY NOT SET: autoForestryCarpentry"); return false;}
	if(DEVMODE_FUNCTION){GM_log("Begin autoForestryCarpentry");}
	var zoneNrL=getZoneListId(handled.zoneNrF);
	if(unsafeData.zoneProductionData[handled.zoneNrF]&&!(unsafeData.zoneProductionData[handled.zoneNrF][3])){
		if(DEVMODE){ showInLogBubble("Field-Data not ready"); }
		window.setTimeout(autoZoneHandle,getRandom(tmin2,tmax2));
	}else{
		window.setTimeout(function(){
			if($("forestry_productiondialog").style.display!="block"){
				click($("forestry_building_click2"));
			}
			var gotoZone=window.setInterval(function(){
				if(!busy) window.clearInterval(gotoZone);
				help=unsafeWindow.forestry_user_buildings[getForestryUserBuilding(2)];
				if($("globalcommitbox").style.display=="block"&&(help&&(!help["slots"]||(help["slots"]&&help["slots"][1]&&help["slots"][1]["ready"]==1)))){
					GM_log("autoForestryCarpentry globalcommitbox");
					unsafeData.zoneProductionData[handled.zoneNrF][3]=false;
					if(unsafeData.readyZone[handled.zoneNrS]){ unsafeData.readyZone[handled.zoneNrS][2]=false; }
					window.clearInterval(gotoZone);
					click($("globalcommitboxfooter").firstElementChild);
					document.addEventListener("gameOpenForestry",function(){
						document.removeEventListener("gameOpenForestry",arguments.callee,false);
							if(zoneList[zoneNrL][0][0]==PRODSTOP){
								GM_log("autoForestryCarpentry globalcommitbox 1");
								autoZoneFinish();
							}else{
								GM_log("autoForestryCarpentry globalcommitbox 2");
								window.setTimeout(autoForestryCarpentry,getRandom(tmin2,tmax2));
							}
					},false);
				// }else if($("globalerrorbox").style.display=="block"&&(help&&(!help["slots"]||(help["slots"]&&help["slots"][1]&&help["slots"][1]["ready"]==1)))){
				//	GM_log("autoForestryCarpentry globalerrorbox");
				//	click($("globalerrorboxfooter").firstElementChild);
				}else if($("forestry_productiondialog").style.display=="block"){
					window.clearInterval(gotoZone);
					GM_log("autoForestryCarpentry forestry_productiondialog");
					if(zoneList[zoneNrL][0][0]!=PRODSTOP){
						GM_log("autoForestryCarpentry forestry_productiondialog build:"+zoneList[zoneNrL][0][0]);
						unsafeWindow.currentslot=1;
						if(unsafeData.readyZone[handled.zoneNrS]){ unsafeData.readyZone[handled.zoneNrS][2]=false; }
						unsafeWindow.forestryAjaxAction("startproduction",2,zoneList[zoneNrL][0][0]); // type => 1 = sawmill / 2 = carpentry
						document.addEventListener("gameOpenForestry",function(){
							document.removeEventListener("gameOpenForestry",arguments.callee,false);
							setNextQueueItem(handled.zoneNrS);
							autoZoneFinish();
						},false);
					}
				}
			},getRandom(tmin2,tmax2));
		},getRandom(tmin2,tmax2));
	}
	if(DEVMODE_FUNCTION){GM_log("End autoForestryCarpentry");}
}

function autoLottery(){
	if(DEVMODE_FUNCTION){GM_log("Begin autoLottery");}
	if(!busy){ GM_log("BUSY NOT SET: autoLottery"); return false;}
	busy_action="autoLottery";
	if(unsafeWindow.city!=2){ //switch to city 2
		document.addEventListener("gameCity2",function(){
			document.removeEventListener("gameCity2",arguments.callee,false);
			showInLogBubble("Arrived in city 2",5,"green");
			window.setTimeout(autoLottery,getRandom(tmin2,tmax2));
		},false);
		window.setTimeout(function(){
			showInLogBubble("Goto City 2",5,"green");
			click($top("speedlink_city2"));
		},getRandom(tmin2,tmax2));
	}else if($("productboxlottery").style.display=="block"){
		click($("productboxlotteryfooter").getElementsByClassName("link")[0]);
		window.setTimeout(function(){
			click($("lotteryhead").getElementsByClassName("link")[0]);
			busy=false;
		},getRandom(tmin2*2,tmax2*2));
	}else if($("currentlot").style.display=="block"){
		var lotid=$("currentlot").style.backgroundImage.match(/lotback_(\d*).jpg/i)[1];
		//GM_log("lottery currentlot id:"+lotid + ":");
		if(valLotteryDailyLot && (lotid==null?false:(!(unsafeData.lotteryCollectForPrize["total"]&&unsafeData.lotteryCollectForPrize["total"][lotid])?false:(unsafeData.lotteryCollectForPrize["total"][lotid]>=(unsafeWindow.lotrack[lotid]?unsafeWindow.lotrack[lotid]:0))))){
			showInLogBubble("Click Save Lot",5,"green");
			click($("prizeslotkeeplot"));
			window.setTimeout(function(){
				click($("lotteryhead").getElementsByClassName("link")[0]);
				busy=false;
			},getRandom(tmin2*2,tmax2*2));
		}else{
			document.addEventListener("gameLotteryGotPrize",function(){
				document.removeEventListener("gameLotteryGotPrize",arguments.callee,false);
				showInLogBubble("Lottery got prizes",5,"green");
				window.setTimeout(autoLottery,getRandom(tmin2*2,tmax2*2));
			},false);
			click($("prizeslotgetprize"));
		}
	}else if($("lotterycontainer").style.display=="block" && $("dailylotleft").style.display=="none"){
		window.setTimeout(function(){
			showInLogBubble("Exiting Lottery",5,"green");
			click($("lotteryhead").getElementsByClassName("link")[0]);
			busy=false;
		},getRandom(tmin2*2,tmax2*2));
	}else if($("lotterycontainer").style.display=="block" && $("dailylotleft").style.display!="none"){
		document.addEventListener("gameLotteryGotDailyLot",function(){
			document.removeEventListener("gameLotteryGotDailyLot",arguments.callee,false);
			showInLogBubble("Lottery: Got daily lot",5,"green");
			window.setTimeout(autoLottery,getRandom(tmin2*2,tmax2*2));
		},false);
		click($("dailylot"));
	}else if(unsafeWindow.city==2 && $("lotterycontainer").style.display!="block"){
		document.addEventListener("gameLotteryOpen",function(){
			document.removeEventListener("gameLotteryOpen",arguments.callee,false);
			window.setTimeout(autoLottery,getRandom(tmin2*2,tmax2*2));
		},false);
		showInLogBubble("Click Lottery",5,"green");
		click($("cityzone_2_8"));
	}else{
		showInLogBubble("Exiting lottery unknown combination",5,"red");
		busy=false;
	}
	if(DEVMODE_FUNCTION){GM_log("End autoLottery");}
}

/* quest-bot needs review
function checkQuest(){
	if(DEVMODE_FUNCTION){GM_log("Begin checkQuest");}
	var doQuest=true;
	var questNr=parseInt(unsafeData.questData["farm"]["1"]["nr"],10);
	if(unsafeData.questData["farm"]["1"]["state"]==2){
		var iId,iType;
		for(var i=0;i<unsafeData.QUESTS["farm"]["1"][questNr][0].length;i++){
			iType=0;
			iId=unsafeData.QUESTS["farm"]["1"][questNr][0][i][0];
			//GM_log("checkQuest iId:"+iId+" doQuest:"+doQuest+" prodStock[0]["+iId+"]:"+unsafeData.prodStock[0][iId]+" GMprodMinRackInit[0]["+iId+"]:"+unsafeData.prodMinRackInit[0][iId]+" QUESTS["+questNr+"][0]["+i+"][1]:"+unsafeData.QUESTS["farm"]["1"][questNr][0][i][1]);
			doQuest=doQuest&&unsafeData.prodStock[iType][iId]&&(unsafeData.prodStock[iType][iId]>(unsafeData.prodMinRackInit[iType][iId]+unsafeData.QUESTS["farm"]["1"][questNr][0][i][1]));
			//doQuest=doQuest&&unsafeData.prodStock[iType][iId]&&(unsafeData.prodStock[iType][iId]>(unsafeData.prodMinRack[iType][iId]+(unsafeData.prodMinRackSettings["valMinRackQuest"]?0:unsafeData.QUESTS["farm"]["1"][questNr][0][i][1])));
			//GM_log("checkQuest iId:"+iId+" doQuest:"+doQuest);
			if(!doQuest) break;
		}
		iId=null;
	}
	if(DEVMODE_FUNCTION){GM_log("End checkQuest doQuest:"+doQuest);}
	return doQuest;
}
function autoActivateQuest(){

	if(DEVMODE_FUNCTION){GM_log("Begin autoActivateQuest"); }
	if(!busy){ GM_log("BUSY NOT SET: autoActivateQuest"); return false;}

	var questNr=unsafeData.questData["farm"]["1"]["nr"];
	showInLogBubble("Looking for Quest:"+questNr,5,"green");


	if(!checkQuest()){
		showInLogBubble("Exiting to low number of product available",5,"red");



		window.setTimeout(autoZoneFinish,getRandom(tmin2*2,tmax2*2));
	}else if((unsafeData.questData["farm"]["1"]["state"]==0 || unsafeWindow.city==1) && $("errorboxcity").style.display=="block"){
		showInLogBubble("Exiting no Quest found to accept or finish",5,"red");


		click($("errorboxfootercity").firstElementChild);
		window.setTimeout(autoZoneFinish,getRandom(tmin2*2,tmax2*2));
	}else if(unsafeWindow.city!=1){
		document.addEventListener("gameCity1",function(){
			document.removeEventListener("gameCity1",arguments.callee,false);
			showInLogBubble("Arrived in city 1",5,"green");
			window.setTimeout(autoActivateQuest,getRandom(tmin2*2,tmax2*2));


		},false);
		showInLogBubble("Goto City 1",5,"green");
		click($top("citylineitem1"));
	}else if(unsafeData.questData["farm"]["1"]["state"]>0 && unsafeWindow.city==1 && $("questboxcity").style.display!="block"){ //open quest box
		showInLogBubble("Open Quest "+questNr,5,"green");
		if(DEVMODE){ GM_log("Open Quest "+questNr); }
		unsafeWindow.fillQuestBox(questNr);
		window.setTimeout(autoActivateQuest,getRandom(tmin2*2,tmax2*2));
	}else if(valQuestActivate && valQuestActivateUntilNr>=questNr && unsafeWindow.city==1 && $("questboxcity").style.display=="block" && unsafeData.questData["farm"]["1"]["state"]==1){ //accept quest
		if(DEVMODE){ GM_log("Accept Quest "+questNr); }
		document.addEventListener("gameQuestAccepted",function(){//todo this does n't work
			document.removeEventListener("gameQuestAccepted",arguments.callee,false);
			showInLogBubble("Accepted Quest "+questNr,5,"green");
			autoZoneFinish();
		},false);
		click($("questboxfootercity").firstElementChild);
	}else if(valQuestSolving && valQuestSolvingUntilNr>=questNr && unsafeWindow.city==1 && $("questboxcity").style.display=="block" && unsafeData.questData["farm"]["1"]["state"]==2){ //finish quest
		if(DEVMODE){ GM_log("Finish Quest "+questNr); }
		document.addEventListener("gameQuestFinished",function(){ //todo this does n't work
			document.removeEventListener("gameQuestFinished",arguments.callee,false);
			showInLogBubble("Finished Quest "+questNr,5,"green");
			autoZoneFinish();
		},false);
		click($("questboxfootercity").firstElementChild);
	}else{
		showInLogBubble("Exiting quest unknown combination",10,"red");
		autoZoneFinish();
	}
	if(DEVMODE_FUNCTION){GM_log("End autoActivateQuest");}
}
function checkLodgeQuest(){
	if(DEVMODE_FUNCTION){GM_log("Begin checkLodgeQuest");}
	//LQUESTS["campaign"]["nr"][[[type,id,amount]],waittime,points,[[type,tekst]]]
	var doQuest=false;
	var campaignNr="1";
	var lquestNr=unsafeData.questData["lodge"][campaignNr]["nr"];
	if(unsafeData.questData["lodge"][campaignNr]["time"]<=now){
		//if(DEVMODE_FUNCTION){GM_log("Mid checkLodgeQuest doQuest:"+doQuest+" time:"+(now-unsafeData.questData["lodge"][campaignNr]["time"]));}
		var iId,iType;
		for(var i=0;i<unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0].length;i++){
			iType=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][0];
			iId=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][1];
			//GM_log("checkLodgeQuest iId:"+iId+" doQuest:"+doQuest+" prodStock["+iType+"]["+iId+"]:"+unsafeData.prodStock[iType][iId]+" GMprodMinRackInit["+iType+"]["+iId+"]:"+unsafeData.prodMinRackInit[iType][iId]+" LQUESTS["+campaignNr+"]["+lquestNr+"][0]["+i+"]:"+unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i]);

			iAdd=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][2]-((unsafeData.questData["lodge"][campaignNr][iId]&&unsafeData.questData["lodge"][campaignNr][iId]["type"]==iType)?unsafeData.questData["lodge"][campaignNr][iId]["sum"]:0); //unsafeData.questData["lodge"][campaignNr][fId]["type":0,"max":0,"sum":0]
			iAdd=Math.min(iAdd,(unsafeData.prodStock[iType][iId]-unsafeData.prodMinRackInit[iType][iId]));
			doQuest=doQuest||(unsafeData.prodStock[iType][iId]>0&&iAdd>0);

			GM_log("checkLodgeQuest iId:"+iId+" doQuest:"+doQuest+" iAdd:"+iAdd);
		}
		iId=null;iType=null;iAdd=null;
	}else{
		doQuest=false;
	}
	if(DEVMODE_FUNCTION){GM_log("End checkLodgeQuest doQuest:"+doQuest);}
	return doQuest;
}
function autoActivateLodgeQuest(didGive){
	if(DEVMODE_FUNCTION){GM_log("Begin autoActivateLodgeQuest");}
	//if(!busy){ GM_log("BUSY NOT SET: autoActivateQuest"); return false;}
	if(didGive==undefined){didGive=false;}

	var campaignNr="1";
	var lquestNr=unsafeData.questData["lodge"][campaignNr]["nr"];
	if(!didGive){
		showInLogBubble("Looking for Campaign:"+campaignNr+" Lodge Quest:"+lquestNr,5,"green");
	}

	if(unsafeData.questData["lodge"][campaignNr]["time"]>now){
		showInLogBubble("Exiting you stil have to wait some more",5,"red");
		window.setTimeout(autoZoneFinish,getRandom(tmin2,tmax2),$("forestry_questlist_close"));
	}else if(!checkLodgeQuest()){
		showInLogBubble("Exiting to low number of product available",5,"red");
		window.setTimeout(autoZoneFinish,getRandom(tmin2*2,tmax2*2),$("forestry_questlist_close"));
	}else if(unsafeWindow.city!=2){
		document.addEventListener("gameCity2",function(){
			document.removeEventListener("gameCity2",arguments.callee,false);
			showInLogBubble("Arrived in city 2",5,"green");
			window.setTimeout(autoActivateLodgeQuest,getRandom(tmin2*2,tmax2*2),true);
		},false);
		showInLogBubble("Goto City 2",5,"green");
		click($top("citylineitem2"));
	}else if(unsafeWindow.city==2 && unsafeData.questData["lodge"][campaignNr]["time"]<=now && $("forestry_questlist_container").style.display!="block"){ //open quest box
		document.addEventListener("gameOpenCampaign",function(){
			document.removeEventListener("gameOpenCampaign",arguments.callee,false);
			showInLogBubble("Opened Lodge Quest",5,"green");
			window.setTimeout(autoActivateLodgeQuest,getRandom(tmin2*2,tmax2*2),true);
		},false);
		click($("cityzone_2_9")); //unsafeWindow.initCampaigns();
	}else if(unsafeWindow.city==2 && unsafeData.questData["lodge"][campaignNr]["time"]<=now && $("forestry_questlist_container").style.display=="block"){ //quest box is open
		var iId,iType,iAdd;
		for(var i=0;i<unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0].length;i++){
			iType=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][0];
			iId=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][1];
			iAdd=unsafeData.QUESTS["lodge"][campaignNr][lquestNr][0][i][2]-((unsafeData.questData["lodge"][campaignNr][iId]&&unsafeData.questData["lodge"][campaignNr][iId]["type"]==iType)?unsafeData.questData["lodge"][campaignNr][iId]["sum"]:0); //unsafeData.questData["lodge"][campaignNr][fId]["type":0,"max":0,"sum":0]
			iAdd=Math.min(iAdd,(unsafeData.prodStock[iType][iId]-unsafeData.prodMinRackInit[iType][iId]));
			if(unsafeData.prodStock[iType][iId]&&iAdd>0){
				//GM_log("Add in iStock:"+iStock+" iAdd:"+iAdd);
				showInLogBubble("Add #"+iAdd+" of "+unsafeData.prodName[iType][iId],5,"green");
				$("globalcommitbox").addEventListener("DOMAttrModified",function(iAdd){
					return function(){
						showInLogBubble("Add in #"+iAdd+" of "+unsafeData.prodName[iType][iId],5,"green");
						$("globalcommitbox").removeEventListener("DOMAttrModified",arguments.callee,false);
						$("forestry_questentry_value").value=iAdd;
						click($("globalcommitboxfooter").firstElementChild);
						document.addEventListener("gameOpenCampaign",function(){
							document.removeEventListener("gameOpenCampaign",arguments.callee,false);
							window.setTimeout(autoActivateLodgeQuest,getRandom(tmin2*2,tmax2*2),true);
						},false);
					};
				}(iAdd),false);
				click($("forestry_quest_entry"+campaignNr+"_"+lquestNr+"_"+(iType+1)+"_"+iId));
				break;
			}
		}
		iId=null;iType=null;iAdd=null;
	}
	if(DEVMODE_FUNCTION){GM_log("End autoActivateLodgeQuest");}
}
*/

function checkFarmi(mode){
	if(DEVMODE_FUNCTION){GM_log("Begin checkFarmi");}
	var farmiNr=null;
	var farmiAmount=0;
	var farmiAcceptRemove=new Array();
	for(var i in unsafeWindow.farmisinfo[0]){
		if(!unsafeWindow.farmisinfo[0].hasOwnProperty(i)){ continue; }
		//GM_log("farmisinfo farmiNr:"+farmiNr+" valFarmiReject:"+valFarmiReject+" valFarmiAccept:"+valFarmiAccept);
		if(valFarmiReject && !unsafeWindow.farmisinfo[0][i]["sold"] && unsafeWindow.farmisinfo[0][i]["costQuotient"] < valFarmiRejectUntilNr){
			if(DEVMODE){GM_log("gameFarmiReject farmiNr:"+i);}
			if(farmiNr==null){ farmiNr=i; }
			farmiAmount++;
		}else if(valFarmiAccept && !unsafeWindow.farmisinfo[0][i]["sold"] && unsafeWindow.farmisinfo[0][i]["costQuotient"]>=valFarmiAcceptAboveNr && !unsafeWindow.farmisinfo[0][i]["missing"] && ((valFarmiAcceptBelowMinValue&&!unsafeWindow.farmisinfo[0][i]["belowMinRackInit"]) || !unsafeWindow.farmisinfo[0][i]["belowMinRack"])){
			if(DEVMODE){GM_log("valFarmiAccept farmiNr:"+farmiNr);}
			if(farmiNr==null){ farmiNr=i; }
			farmiAmount++;
		}else if(valFarmiAccept && valFarmiRemoveMissing && !unsafeWindow.farmisinfo[0][i]["sold"] && unsafeWindow.farmisinfo[0][i]["costQuotient"]>=valFarmiAcceptAboveNr && unsafeWindow.farmisinfo[0][i]["missing"]){
			farmiAcceptRemove.push([i,unsafeWindow.farmisinfo[0][i]["price"]-unsafeWindow.farmisinfo[0][i]["marketValue"]]);
		}
	}
	if(valFarmiRemoveMissing && farmiAcceptRemove.length > valFarmiRemoveMissingAboveNr){
		farmiAmount += (farmiAcceptRemove.length-valFarmiRemoveMissingAboveNr);
		farmiAcceptRemove.sort(function(a,b){return (parseInt(b[1],10)-parseInt(a[1],10));});
		farmiAcceptRemove.splice(0,valFarmiRemoveMissingAboveNr); //.slice(0,farmiAcceptRemove.length-valFarmiRemoveMissingAboveNr);
		farmiAcceptRemove.reverse();
		if(DEVMODE){GM_log("valFarmiAcceptedRemove farmiNr:"+farmiNr+" farmiAcceptRemove:"+implode(farmiAcceptRemove,"checkFarmi/farmiAcceptRemove"));}
		if(farmiNr==null){farmiNr = farmiAcceptRemove[0][0];}
	}
	if(DEVMODE_FUNCTION){ GM_log("End checkFarmi");}
	switch (mode){
	case 2:
		return [farmiAmount,farmiNr,farmiAcceptRemove];
		break;
	case 1:
		if(farmiNr!=null){
			botArbiterAdd("farmi");
		}
		break;
	case 0:
	default:
		return (farmiNr!=null);
		break;
	}
}
function autoFarmi(){
	if(DEVMODE_FUNCTION){ GM_log("Begin autoFarmi"); }
	if(!busy){ GM_log("BUSY NOT SET: autoFarmi"); return false;}
	showInLogBubble("Begin for Farmi",5,"green");
try{
	var help=checkFarmi(2);
	var farmiNr=help[1];
	var farmiAmount=help[0];
	var farmiAcceptRemove = help[2];
	GM_log("autoFarmi farmiAmount:"+farmiAmount+" farmiNr:"+farmiNr);
	if(farmiAmount>0){
		if(unsafeWindow.farm!=1){
			// change farm
			document.addEventListener("gameUpdateFarm",function(){
				document.removeEventListener("gameUpdateFarm",arguments.callee,false);
				showInLogBubble("arrived in farm");
				if(DEVMODE){GM_log("arrived in farm");}

				autoFarmi();
			},false);
			if(DEVMODE){GM_log("change farm to 1");}
			showInLogBubble("change farm to 1");
			click($("speedlink_farm1"));
			// click($("farmlinks").getElementsByClassName("link")[0]);
		}else if(unsafeWindow.farm==1){
			var doFarmiInterval=window.setInterval(function(farmiNr,farmiAmount){
				try{
					if($("cart").style.display=="block"){
						try {
							window.clearInterval(doFarmiInterval);
							doFarmiInterval=null;
						} catch (err){}
						if(farmiAmount>=1){
							document.addEventListener("gameFarmiResponse",function(){
								document.removeEventListener("gameFarmiResponse",arguments.callee,false);
								window.setTimeout(function(){
									showInLogBubble("Do next Farmi");
									autoFarmi();
								},3000);
							},false);
							if(valFarmiReject && !unsafeWindow.farmisinfo[0][farmiNr]["sold"] && unsafeWindow.farmisinfo[0][farmiNr]["costQuotient"] < valFarmiRejectUntilNr){
								if(DEVMODE){GM_log("valFarmiReject farmiNr:"+farmiNr);}
								unsafeWindow.handleFarmi(farmiNr,2);
								unsafeWindow.farmisinfo[0][farmiNr]["sold"]=1;
							}else if(valFarmiAccept && !unsafeWindow.farmisinfo[0][farmiNr]["sold"] && unsafeWindow.farmisinfo[0][farmiNr]["costQuotient"]>=valFarmiAcceptAboveNr && !unsafeWindow.farmisinfo[0][farmiNr]["missing"] && ((valFarmiAcceptBelowMinValue&&!unsafeWindow.farmisinfo[0][farmiNr]["belowMinRackInit"]) || !unsafeWindow.farmisinfo[0][farmiNr]["belowMinRack"])){
								if(DEVMODE){GM_log("valFarmiAccept farmiNr:"+farmiNr);}
								unsafeWindow.handleFarmi(farmiNr,1);
								unsafeWindow.farmisinfo[0][farmiNr]["sold"]=1;
							}else if(valFarmiAccept && valFarmiRemoveMissing && !unsafeWindow.farmisinfo[0][farmiNr]["sold"] && unsafeWindow.farmisinfo[0][farmiNr]["costQuotient"]>=valFarmiAcceptAboveNr && unsafeWindow.farmisinfo[0][farmiNr]["missing"]){
								if(DEVMODE){GM_log("valFarmiAcceptedRemove farmiNr:"+farmiNr);}
								unsafeWindow.handleFarmi(farmiNr,2);
								unsafeWindow.farmisinfo[0][farmiNr]["sold"]=1;
							}else{
								GM_log("valFarmi Null farmiNr:"+farmiNr);
							}
						}
					}
					if(DEVMODE){ GM_log("Click Farmi:"+farmiNr,5,"green"); }
					showInLogBubble("Click  Farmi:"+farmiNr,5,"green");
					click($("kunde_"+farmiNr));
				}catch(err){GM_log("ERROR autoFarmi farmiNr:"+farmiNr+" farmiAmount:"+farmiAmount+"\n"+err);}
			},getRandom(tmin,tmax),farmiNr,farmiAmount);
		}else{
			showInLogBubble("Exiting farmi unknown combination",10,"red");
			if(DEVMODE){ GM_log("Exiting farmi unknown combination"); }
			busy=false;
		}
	}else{
		showInLogBubble("Exiting no farmi");
		if(DEVMODE){ GM_log("Exiting no farmi"); }
		busy=false;
	}
}catch(err){GM_log("ERROR autoFarmi farmiNr:"+farmiNr+" farmiAmount:"+farmiAmount+"\n"+err);}
}

function activateBot(){
	valBot=true;
	busy=false;
	var cell=$("inputvalBot");
	cell.checked=true;
	cell.style.backgroundColor="#f55";
	cell.innerHTML=texte["automat"]["botStop"];
	if(cell=$("busydiv")){ removeElement(cell); }
	cell=$("divBotInfo");
	cell.style.display="block";
	cell.innerHTML="Busy:--";
	cell=null;
	botArbiterCheck();
}
function deactivateBot(){
	valBot=false;
	busy=false;
	var cell=$("inputvalBot");
	cell.checked=false;
	cell.style.backgroundColor="#3c3";
	cell.innerHTML=texte["automat"]["botStart"];
	$("divBotInfo").style.display="none";
	if(cell=$("busydiv")){ removeElement(cell); }
	cell=null;
	botArbiterStop();//TODO the bot is not deactivated until the timer is runS out .. after that the buttoN should change.. inbetween it should have a inbetween state.
	stopCloseWindowTimer();
}
function startBot(){
	if(DEVMODE){ showInLogBubble("startBot"); }
	try {window.clearInterval(restartBot);} catch (err){}
	var restartBotTime=(800*tmax+20*tmax2)/1000;
	busy=true;
	autoRunId++;
	restartBot=window.setInterval(function (){
		var cell=$("divBotInfo");
		if(cell.style.display!="block"){ cell.style.display="block"; }
		if(cell.innerHTML!="Busy:"+busy_action){ cell.innerHTML="Busy:"+busy_action; }
		if(busy){
			if(--restartBotTime>0){
				cell.innerHTML +="<br>Reset:"+getTimeStr(restartBotTime);
			}else{
				busy=false;
				cell.innerHTML="Busy:--";
				if(cell=$("busydiv")){ removeElement(cell); }
				try {window.clearInterval(restartBot);} catch (err){}
				botArbiterCheck();
			}
		}else{
			if(cell=$("busydiv")){ removeElement(cell); }
			try {window.clearInterval(restartBot);} catch (err){}
			botArbiterCheck();
		}
		cell=null;
	},1000);
}
function doGameSessionEnds(){  //NOTICE: Use only in combination with botArbiterAdd("sessionEnds");
	// if(DEVMODE){ showInLogBubble("doGameSessionEnds"); }
	click($("divSessionEnd"));
}
function doGameOtherAccReady(){  //NOTICE: Use only in combination with botArbiterAdd("otherAccReady");
	// if(DEVMODE){ showInLogBubble("doGameOtherAccReady"); }
	click($("linkOtherAccReady"));
}
function drawButtons(){
	if(!$("divBeraterButtonsAutomatOverview")){
		newdiv=createElement("div",{"id":"divBeraterButtonsAutomatOverview","class":"link beraterButtonIcon hoverBgGreen","mouseOverText":texte["automat"]["buttonOverview"]},$("divBeraterButtons"));
		createElement("img",{"class":"link","src":strImages["gear"],"style":"position:relative;top:3px;left:1px;width:28px;height:28px;"},newdiv);
		newdiv.addEventListener("click",function(){
			buildInfoPanel("overviewZones",explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_viewOverViewFarms"),"drawButtons/timeArray",[[true,true,false,false,false],[true,true,true]]));
		},false);
	}
}
function drawZoneListTable(currZoneType){
	try{
		var newtable=createElement("table",{style:"",border:"1",cellspacing:"0",style:"margin-bottom:10px;"});
		newtable.addEventListener("mouseout",function(event){
			for(var y=0;y<this.rows.length;y++){
				for(var x=0;x<this.rows[y].cells.length;x++){
					this.rows[y].cells[x].style.backgroundColor="";
				}
			}
		},false);
		newtable.addEventListener("mouseover",function(event){
			var node=event.target;
			while((node!=this)&&(node.nodeName!="TD")){ node=node.parentNode;}
			if(node!=this){
				var posX=node.cellIndex;
				var posY=node.parentNode.rowIndex;
				if(node.parentNode.cells.length>1){
					if(0<posX){
						for(var v=0;v<this.rows.length;v++){
							if(this.rows[v].cells[posX]){ this.rows[v].cells[posX].style.backgroundColor="lightblue"; }
						}
					}
					if(0<posY){
						for(var v=0;v<this.rows[posY].cells.length;v++){
							if(this.rows[posY].cells[v]){ this.rows[posY].cells[v].style.backgroundColor="lightblue"; }
						}
					}
				}
			}
		},false);
		// collect the handled zones
		var zones=new Array();
		for(var fz in unsafeData.ALL_SLOTS){
			if(!unsafeData.ALL_SLOTS.hasOwnProperty(fz)){ continue; }
			if(unsafeData.zoneBlock[fz]){ continue; }
			if(getZoneTyp(fz)!=currZoneType){ continue; }
			zones.push(fz);
		}
		// build table
		var newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
		var newtd=createElement("td",{"style":"text-align:right;border-bottom:none;"},newtr,"Zone"); // TODO texte
		for(var i=0;i<zones.length;i++){
			newtd=createElement("td",{"align":"center","style":"width:10px;","rowspan":2},newtr,getZoneName(zones[i],zones[i],null,false,true,false,false)+"<br>"+getZoneName(zones[i],zones[i],null,false,false,true,false).replace(/,/g,"<br>"));
		}
		if(currZoneType=="1"){
			newtd=createElement("td",{align:"center","rowspan":2},newtr);
		}
		newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
		createElement("td",{"style":"text-align:left;border-top:none;"},newtr,texte["automat"]["titleQueue"]);
		for(var lz in zoneList){
			if(!zoneList.hasOwnProperty(lz)){ continue; }
			if(lz==0 || lz=="windmill"){ continue; }
			var extendedList=extendedListReg.exec(lz);
			if((!extendedList && currZoneType!=getZoneTyp(lz)) || (extendedList && currZoneType!=1)) continue;
			newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
			newtd=createElement("td",{"nowrap":"","style":"width:50px;text-align:right;","class":"link","lz":lz}, newtr, getZoneName(lz,lz,null,false,true,true,false));
			// !!extendedList?
			// texte["automat"]["titleGeneral"].replace(" ","&nbsp;")+"&nbsp;"+extendedList[1]
			// :texte["automat"]["titleQueue"]+"&nbsp;"+((isNaN(Number(lz))?lz:(Math.ceil(lz/6)+"."+getGarden(lz))))
			newtd.addEventListener("mouseover",function(evt){
				var zoneNrL=this.getAttribute("lz");
				texte["queueshow"]="Click to edit the queue";
				var content=createElement("div");
				drawQueueListSmall(zoneNrL, zoneNrL, content);
				createElement("div",{"style":"margin:4px 0px 4px 0px;width:100%;height:0px;border-bottom:1px solid white;"},content);
				createElement("div",{"class":"queueTitle"},content,texte["queueshow"]);
				showToolTip(evt, content.innerHTML);
				content=null;
			},false);
			newtd.addEventListener("click",function(){
				var zoneNrL=this.getAttribute("lz");
				var extendedList=extendedListReg.test(zoneNrL);
				switch(extendedList?1:getBuildingTyp(zoneNrL)){
					case 1:
						if(valUseQueueList){
							redrawQueueBox(zoneNrL, zoneNrL, $("divQueueBoxInner"));
						}else{
							drawQueueChooseItemBox(zoneNrL, zoneNrL, 0, $("divChooseBoxInner"));
						}
						break;
					case 2:
						drawStableChooseFeedBox(zoneNrL, zoneNrL, $("divChooseBoxInner"));
						break;
					case 3:
						if(valUseQueueList){
							drawQueueBox(zoneNrL,zoneNrL,$("divChooseBoxInner"));
						}else{
							drawFactoryChooseItemBox(zoneNrL,zoneNrL,$("divChooseBoxInner"));
						}						
						break;
					case "windmill":
						redrawQueueBox(zoneNrL, zoneNrL, $("divQueueBoxInner"));
						break;
				}
			},false);
			for(var i=0;i<zones.length;i++){
				var fz=zones[i];
				newtd=createElement("td",{align:"center"},newtr);
				var inp=createElement("input",{id:"inputZoneList"+lz,name:"farmZone"+fz,"class":"link",type:"radio",checked:getZoneListId(fz)==lz},newtd);
				inp.addEventListener("click",function(){
					var lz=this.id.replace("inputZoneList","");
					var fz=this.name.replace("farmZone","");
					setZoneListId(fz,lz);
					updateQueueBox(fz,lz);
				},false);
				inp.addEventListener("mouseover", function(evt){
					var lz=this.id.replace("inputZoneList","");
					var content=createElement("div");
					drawQueueListSmall(lz, lz, content);
					showToolTip(evt, content.innerHTML);
				},false);
			}
			if(currZoneType=="1"){
				newtd=createElement("td",{align:"center"},newtr);
				if(extendedList){
					inp=createElement("img",{id:"inputZoneListDelete"+lz,"class":"link",style:"display:inline-block;width:15px;height:15px;",src:GFX+"button_cancel_off.png"},newtd);
					inp.addEventListener("mouseover", function(evt){
						this.setAttribute("src",GFX+"button_cancel_on.png");
						showToolTip(evt, "Delete this queue");
					},false);
					inp.addEventListener("mouseout", function(evt){
						this.setAttribute("src",GFX+"button_cancel_off.png");
					},false);
					inp.addEventListener("click", function(){
						var lz=this.id.replace("inputZoneListDelete","");
						deleteZoneInList(lz);
						click($("infoPanelZoneList"));
					},false);
				}
			}
		}
		if(currZoneType=="1"){
			var newtr=createElement("tr",{style:"line-height:18px;"},newtable);
			var newtd=createElement("td",{align:"center",colspan:(zones.length+2)},newtr);
			inp=createElement("button",{id:"inputZonesToGeneral","class":"link",style:"display:block;width:110px;margin:5px;padding:1px;"},newtd,"Add" + texte["automat"]["titleQueue"]);
			inp.addEventListener("click",function(){
				addZoneToList();
				click($("infoPanelZoneList"));
			},false);
		}
		newtr=null;newtd=null;inp=null;help=null;zones=null;
		return newtable;
	}catch(err){GM_log("ERROR drawZoneListTable currZoneType:"+currZoneType+" \n"+err);return newtable;}
}

function closeInfoPanel(){
	click($("infoPanelClose"));
}
function buildInfoPanel(mode,mode2){
	if(mode==$("infoPanel").getAttribute("mode")&&(mode2==undefined ||$("infoPanel").getAttribute("mode2")==implode(mode2,"mode2"))){
		closeInfoPanel();
	}else{
		$("infoPanel").setAttribute("mode",mode);
		$("infoPanel").setAttribute("mode2",mode2==undefined?"":implode(mode2,"mode2"));
		$("infoPanel").style.display="block";
		$("infoPanel").style.zIndex="101";
		$("infoPanelInner").innerHTML="";
		$("infoPanelInner").style.width="90%";
		$("infoPanelInner").style.background="";
		if($("transp100")){ $("transp100").style.display="block"; }
		$("multiframe").style.zIndex="99";
		//if($("divQueueBox").style.display=="block") click($("divQueueBoxClose"));
		var newtable,newdiv,newdiv1,newdiv2;

		switch(mode){
		case "overviewZones":{
		try{
			if((typeof mode2[0]!="object")||(mode2[0] instanceof Array)){
				mode2[0]={"farm1":true};
			}
			if((typeof mode2[1]!="object")||(mode2[1] instanceof Array)){
				mode2[1]={"0":true,"1":true,"2":true};
			}
			//$("infoPanelInner").style.width="93%";//"640px";
			newdiv=createElement("div",{"id":"infoPanelHeader","style":"height:35px;width:100%;border:0px solid red;-moz-user-select:none;"},$("infoPanelInner"));
			newdiv.addEventListener("mouseover", function(event){
				var node=event.target;
				while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node=node.parentNode; }
				if(node!=this){ showToolTip(event,node.getAttribute("mouseOverText")); }
			},false);
			newdiv.addEventListener("click", function(event){
				var node=event.target;
				while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node=node.parentNode; }
				// GM_log(node.parentNode.getAttribute("name")+":"+node.getAttribute("name"));
				if(event.ctrlKey || node.parentNode.childElementCount==1){
					mode2[node.parentNode.getAttribute("name")][node.getAttribute("name")]=!mode2[node.parentNode.getAttribute("name")][node.getAttribute("name")];
				}else{
					mode2[node.parentNode.getAttribute("name")]={};
					mode2[node.parentNode.getAttribute("name")][node.getAttribute("name")]=true;
				}
				//this.className=mode2[this.getAttribute("name")]?"farmlinkitemactivate":"farmlinkitem";
				GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_viewOverViewFarms",implode(mode2,"mode2"));
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel(mode,mode2);
			},false);
			newdiv1=createElement("div",{"id":"farmlinks2","name":0,"class":"farmlinks"},newdiv);
			for(var farmNr=1;farmNr<=unsafeWindow.farmamount;farmNr++){ // Farm-Buttons
				newdiv2=createElement("div",{"name":"farm"+farmNr,"class":(mode2[0]["farm"+farmNr]?"link speedlink link speedlink_farm"+farmNr+"_active":"link speedlink link speedlink_farm"+farmNr),"mouseOverText":texte["automat"]["title"][(mode2[0]["farm"+farmNr]?"off":"on")]["farm"+farmNr]},newdiv1);
				createElement("span",{"class":"speedlink_text"},newdiv2,farmNr);
			}
			newdiv2=createElement("div",{"name":"windmill","class":(mode2[0]["windmill"]?"link citylinkitemactivate":"link citylinkitem"),"mouseOverText":texte["automat"]["title"][(mode2[0]["windmill"]?"off":"on")]["windmill"]},newdiv1);
			createElement("img",{"src":strImages["windmill"],"style":"height:16px;width:16px;"},newdiv2);
			newdiv2=createElement("div",{"name":"forestry","class":(mode2[0]["forestry"]?"link citylinkitemactivate":"link citylinkitem"),"mouseOverText":texte["automat"]["title"][(mode2[0]["forestry"]?"off":"on")]["forestry"]},newdiv1);
			// createElement("img",{"src":strImages["windmill"],"style":"height:16px;width:16px;"},newdiv2);
			newdiv1=createElement("div",{"id":"fieldlinks","name":1,"class":"fieldlinks","style":"-moz-user-select:none;"},newdiv);
			for(var i=2;i>=0;i--){ // Zonetype-Buttons
				createElement("div",{"name":i,"class":"link "+(mode2[1][i]?("fieldlinkitemactivate"+i):("fieldlinkitem"+i)),"mouseOverText":texte["automat"]["title"][(mode2[1][i]?"off":"on")]["type"+i]},newdiv1);
			}

			newdiv=createElement("div",{style:"overflow-y:auto;overflow-x:hidden;width:100%;height:"+($("infoPanelInner").clientHeight-35)+"px;"},$("infoPanelInner"));
			newtable=createElement("table",{"class":"border1",style:"width:100%;"},newdiv);
			var newtr,newtd,zoneNrS;
			// collect all handled zones
			var zones=new Array();
			for(var i in unsafeData.ALL_SLOTS){
				if(!unsafeData.ALL_SLOTS.hasOwnProperty(i)){ continue; }
				if(unsafeData.zoneBlock[i]){ continue; }
				if(unsafeData.ALL_SLOTS[i]=="farm"){
					if(!mode2[0][unsafeData.ALL_SLOTS[i]+Math.ceil(parseInt(i,10)/6)]){ continue; }
					zones.push([unsafeData.ALL_SLOTS[i]+Math.ceil(parseInt(i,10)/6),i]);
				}else{
					if(!mode2[0][unsafeData.ALL_SLOTS[i]]){ continue; }
					zones.push([unsafeData.ALL_SLOTS[i],i]);
				}
			}
			// GM_log("ALL_SLOTS:\n"+print_r(unsafeData.ALL_SLOTS,"",true,"\n"));
			// GM_log("zones:\n"+print_r(zones,"",true,"\n"));
			// build table
			var old=null;
			for(var i=0;i<zones.length;i++){
				if(old!=zones[i][0]){
					if(old!=null){
						newtr=createElement("tr",{style:"line-height:1px;"},newtable);
						newtd=createElement("td",{"colspan":"3",style:"background-color:black;"},newtr);
					}
					old=zones[i][0];
				}
				zoneNrS=zones[i][1];
				zoneNrL=getZoneListId(zoneNrS);
				// GM_log("loop farmNr:" + farmNr + " zoneNr:"+zoneNr + " zoneNrS:"+zoneNrS + " zoneNrL:"+zoneNrL+" feldtyp:"+getBuildingTyp(zoneNrF));
				switch(getBuildingTyp(zoneNrS)){
				case 1:{ // field
					if(mode2[1][0] && !$("tdAutoMatOverview_"+zoneNrL)){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"id":"tdAutoMatOverview_"+zoneNrL},newtr);
						if(valUseQueueList){
							drawQueueBox(zoneNrS, null, newtd);
						}else{
							drawQueueChooseItemBox(zoneNrS, null, 0, newtd);
						}
					}
				break;}
				case 2:{ //stable
					if(mode2[1][1] && !$("tdAutoMatOverview_"+zoneNrL)){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"id":"tdAutoMatOverview_"+zoneNrL},newtr);
						drawStableChooseFeedBox(zoneNrS,null,newtd);
					}
				break;}
				case 3:{ //factory
					if(mode2[1][2] && !$("tdAutoMatOverview_"+zoneNrL)){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"id":"tdAutoMatOverview_"+zoneNrL},newtr);
						if(valUseQueueList){
							drawQueueBox(zoneNrS,null,newtd);
						}else{
							drawFactoryChooseItemBox(zoneNrS,null,newtd);
						}						
					}
				break;}
				default:{
					if(!$("tdAutoMatOverview_"+zoneNrL)){
						newtr=createElement("tr",{},newtable);
						newtd=createElement("td",{"id":"tdAutoMatOverview_"+zoneNrL},newtr);
						drawQueueBox(zoneNrS, null, newtd);
					}
				}
				}
			}
			newtr=null;newtd=null;newinput=null;
			}catch(err){GM_log("ERROR buildInfoPanel overviewZones \n"+err);}
		break;}
		}
		newimg=null;newtable=null;newdiv=null;
	}
	raiseEvent("gameInfoPanelOpen");
}

// ***************************************************************************************************

function do_main(){
	// GM_log("AUTOMAT START");
	if(DEVMODE){ showInLogBubble("Automat-Script started"); }
	// **************************************************
	// Changes:
	// ....
	// GM_setValue2("changedata",1);
	//
	// **************************************************

	document.addEventListener("gameInfoPanelOpen", function(event){
 		click($("divQueueBoxClose"));
 		click($("divChooseBoxClose"));
		if($("infoPanel").getAttribute("mode")=="options"){
			var newdiv=createElement("div",{"class":"","style":"margin-top:20px;padding-top:5px;border-bottom:1px solid #685338;font-weight:bold;"},$("infoPanelL"),texte["automat"]["automat"]);
			var newdiv=createElement("div",{"id":"infoPanelLAutomat","class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["optionen"]);
			newdiv.addEventListener("click",function(){
				try{
				$("infoPanelT").innerHTML="<b>"+texte["optionen"]+"</b>&nbsp;-&nbsp;"+texte["automat"]["automat"]+"&nbsp;"+VERSION;
				$("infoPanelR").innerHTML="";
				var newtable=createElement("table",{"class":"hoverRowBgCc9","style":"width:100%","border":"1"},$("infoPanelR"));
				var newtr, newtd, inp;
		// *********** FARM ***************************************
				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,texte["farm"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalAutoPflanz","class":"link",type:"checkbox",checked:valAutoPflanz},newtd);
				inp.addEventListener("click",function(){
					valAutoPflanz=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valAutoPflanz", valAutoPflanz);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalAutoPflanz"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalWater","class":"link",type:"checkbox",checked:valWater},newtd);
				inp.addEventListener("click",function(){
					valWater=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valWater", valWater);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalWater"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputvalAutoFutter","class":"link",type:"checkbox",checked:valAutoFutter},newtd);
				// inp.disabled=(top.window.wrappedJSObject.premium=="1" || parseInt(top.document.getElementById("levelnum").innerHTML,10)<10);
				inp.disabled=(unsafeWindow.premium==1 || parseInt(top.document.getElementById("levelnum").innerHTML,10)<10);
				inp.addEventListener("click",function(){
					valAutoFutter=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valAutoFutter", valAutoFutter);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalAutoFutter"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalDisableCropFields","class":"link",type:"checkbox",checked:valDisableCropFields},newtd);
				inp.addEventListener("click",function(){
					valDisableCropFields=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valDisableCropFields", valDisableCropFields);
					checkReadyZone();
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalDisableCropFields"]);

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center"},newtr);
				inp=createElement("select",{"id":"inputvalSeedWaitForCrop","class":"link"},newtd);
				createElement("option",{"value":0},inp,"--");
				createElement("option",{"value":5},inp,"5s");
				createElement("option",{"value":10},inp,"10s");
				createElement("option",{"value":30},inp,"30s");
				createElement("option",{"value":60},inp,"1min");
				createElement("option",{"value":120},inp,"2min");
				createElement("option",{"value":300},inp,"5min");
				createElement("option",{"value":600},inp,"10min");
				inp.value=valSeedWaitForCrop;
				inp.addEventListener("change",function(){
					valSeedWaitForCrop=this.value;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valSeedWaitForCrop", valSeedWaitForCrop);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalSeedWaitForCrop"]);

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center"},newtr);
				inp=createElement("input",{"id":"inputEmergencyPlants","style":"width:100px;text-align:center;background-color:transparent;","value":emergencyPlants.join(",")},newtd);
				inp.addEventListener("change",function(){
					emergencyPlants=this.value.split(/,/);
					for(var v=emergencyPlants.length-1;0<=v;v--){
						if((!unsafeData.prodTyp[0][emergencyPlants[v]])||(unsafeData.prodTyp[0][emergencyPlants[v]]!="v")||(unsafeData.prodBlock[0][emergencyPlants[v]].match(/l/))){
							// check if the entry is a plant and not blocked by level
							emergencyPlants.splice(v,1);
						}
					}
					if(emergencyPlants.length==0){
						// no entry=> set to default (Grain,Carrots)
						emergencyPlants=[1,17];
					}else{
						// remove duplicates
						for(var v=0;v<emergencyPlants.length;v++){
							for(var w=emergencyPlants.length-1;v<w;w--){
								if(emergencyPlants[v]==emergencyPlants[w]){
									emergencyPlants.splice(w,1);
								}
							}
						}
					}
					// update the select-box
					var cell=$("selectEmergencyPlants");
					for(var v=0;v<cell.children.length;v++){
						var found=false;
						for(var w=0;w<emergencyPlants.length;w++){
							if(emergencyPlants[w]==cell.children[v].value){ found=true; }
						}
						cell.children[v].style.backgroundColor=(found?"#cc9":"");
					}

					this.value=emergencyPlants.join(",");
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_emergencyPlants", implode(emergencyPlants,"gameInfoPanelOpen/options/emergencyPlants"));
				},false);
				newtd=createElement("td",{"colspan":"2"},newtr,texte["automat"]["emergencyPlants"]);
				newdiv=createElement("div",{},newtd);
				inp=createElement("select",{"class":"link","id":"selectEmergencyPlants"},newdiv);
				for(var v=0;v<unsafeData.prodTyp[0].length;v++){
					if((unsafeData.prodTyp[0][v]=="v")&&(!unsafeData.prodBlock[0][v].match(/l/))){
						var found=false;
						for(var w=0;w<emergencyPlants.length;w++){
							if(emergencyPlants[w]==v){ found=true; }
						}
						createElement("option",{"value":v,"style":(found?"background-color:#cc9;":"")},inp,v+" "+unsafeData.prodName[0][v]+" ("+numberFormat(unsafeData.prodPlantSize[0][v])+")");
					}
				}
				inp.addEventListener("change",function(){
					var cell=$("inputEmergencyPlants");
					cell.value +=","+this.value;
					change(cell);
					cell=null;
				},false);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center",width:"40"},newtr);
				inp=createElement("input",{id:"inputvalUseQueList","class":"link",type:"checkbox",checked:valUseQueueList},newtd);
				inp.addEventListener("click",function(){
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valUseQueueList", (valUseQueueList=this.checked));
					if($("divQueueBox").style.display=="block"){
						var zoneNrF=$("divQueueBoxInner").getAttribute("zoneNrF");
						//var zoneNrL=$("divQueueBoxInner").getAttribute("zoneNrL");
						click($("divQueueBoxClose"));
						if(valUseQueueList) click($("divAutomatIcon_"+zoneNrF));
					}
				},false);
				newtd=createElement("td","",newtr,texte["automat"]["setvalUseQueueList"]);
				inp=createElement("img",{"src":strImages["help"],"style":"margin-left:3px;height:14px;width:14px;"},newtd);
				inp.addEventListener("mouseover",function(evt){ showToolTip(evt,"<div style='width:300px'><b>"+texte["automat"]["hilfe"]["queue"][0]+"</b><br>"+texte["automat"]["hilfe"]["queue"][1]+"</div>"); },false);
				inp=createElement("img",{"src":strImages["help"],"style":"margin-left:3px;height:14px;width:14px;"},newtd);
				inp.addEventListener("mouseover",function(evt){ showToolTip(evt,"<div style='width:300px'><b>"+texte["automat"]["hilfe"]["windmill"][0]+"</b><br>"+texte["automat"]["hilfe"]["windmill"][1]+"</div>"); },false);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("button",{id:"inputDeleteAllQueueData","class":"link hoverBgCc9",style:"display:block;width:110px;margin:5px;padding:1px;"},newtd,texte["automat"]["set12a"]);
				inp.addEventListener("click",function(){
					this.disabled=true;
					zoneList={};
					zoneSettings={};
					zoneToList={};
					for(var fz in unsafeData.ALL_SLOTS){
						if(!unsafeData.ALL_SLOTS.hasOwnProperty(fz)){ continue; }
						zoneList[fz]=(fz=="windmill"?DEFAULT_ZONELIST_MILL_ARRAY.clone():DEFAULT_ZONELIST_ITEM_ARRAY.clone());
						zoneSettings[fz]={"repeat":false,"shuffle":false};
						zoneToList[fz]=fz;
						reFillQueueBox(fz,fz,0);
					}
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"gameInfoPanelOpen/options/zoneList"));
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"gameInfoPanelOpen/options/zoneSettings"));
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList",implode(zoneToList,"gameInfoPanelOpen/options/zoneToList"));
					alert(texte["automat"]["set12b"]);
					this.disabled=false;
				},false);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputvalShowQueueTime","class":"link",type:"checkbox",checked:valShowQueueTime},newtd);
				inp.addEventListener("click",function(){
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valShowQueueTime", (valShowQueueTime=this.checked));
					for(var i=0;i<unsafeData.ALL_ZONES["farm"].length;i++){
						updateQueueBox(unsafeData.ALL_ZONES["farm"][i]);
					}
					updateQueueBox("windmill",0);
					//TODO ALL_SLOTS?
				},false);
				createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalShowQueueTime"]);

		// *********** FARMIE *************************************

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				newtd=createElement("th",{colspan:"3"},newtr,"Farmis"); // TODO texte

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center","width":"40"},newtr);
				inp=createElement("input",{"class":"link","type":"checkbox","checked":valUseBot["farmi"]},newtd);
				inp.addEventListener("click",function(){
					valUseBot["farmi"]=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valUseBot",implode(valUseBot));
					var help=$("infoPanelR").getElementsByClassName("valUseBot_farmi");
					if(valUseBot["farmi"]){
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){	help[i].style.opacity="1";
							}else{ help[i].disabled=false; }
						}
					}else{
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){ help[i].style.opacity="0.6"; 
							}else{ help[i].disabled=true; }
						}
					}
					help=null;
					botArbiterCheck();
				},false);
				newtd=createElement("td",{"colspan":"2"},newtr,"Use farmie bot"); //TODO texte
				
				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalFarmiReject","class":"link",type:"checkbox",checked:valFarmiReject},newtd);
				inp.addEventListener("click",function(){
					valFarmiReject=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiReject", valFarmiReject);
					if(valFarmiReject){botArbiterCheck();}
				},false);
				newtd=createElement("td",{colspan:"1"},newtr,texte["automat"]["setvalFarmiReject"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("input",{"id":"inputvalFarmiRejectUntilNr","style":"width:100%;height:18px;direction:rtl",value:valFarmiRejectUntilNr+"%"},newtd);
				inp.addEventListener("change",function(){
					var help=parseInt(this.value.replace("%",""),10);
					if(isNaN(help)){
						this.value=valFarmiRejectUntilNr+"%";
					}else{
						valFarmiRejectUntilNr=Math.max(0,Math.min(999,Math.min(help,valFarmiAcceptAboveNr)));
						this.value=valFarmiRejectUntilNr+"%";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRejectUntilNr", valFarmiRejectUntilNr);
						if(valFarmiReject){botArbiterCheck();}
					}
				},false);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalFarmiAccept","class":"link",type:"checkbox",checked:valFarmiAccept},newtd);
				inp.addEventListener("click",function(){
					valFarmiAccept=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAccept", valFarmiAccept);
					if(valFarmiAccept){botArbiterCheck();}
					$("inputvalFarmiAcceptBelowMinValue").disabled=!valFarmiAccept;
				},false);
				newtd=createElement("td",{colspan:"1"},newtr,texte["automat"]["setvalFarmiAccept"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("input",{"id":"inputvalFarmiAcceptAboveNr","style":"width:100%;height:18px;direction:rtl",value:valFarmiAcceptAboveNr+"%"},newtd);
				inp.addEventListener("change",function(){
					var help=parseInt(this.value.replace("%",""),10);
					if(isNaN(help)){
						this.value=valFarmiAcceptAboveNr+"%";
					}else{
						valFarmiAcceptAboveNr=Math.max(0,Math.min(999,Math.max(help,valFarmiRejectUntilNr)));
						this.value=valFarmiAcceptAboveNr+"%";
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAcceptAboveNr", valFarmiAcceptAboveNr);
						if(valFarmiAccept){botArbiterCheck();}
					}
				},false);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalFarmiAcceptBelowMinValue","class":"link",type:"checkbox",checked:valFarmiAcceptBelowMinValue},newtd);
				inp.addEventListener("click",function(){
					valFarmiAcceptBelowMinValue=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAcceptBelowMinValue", valFarmiAcceptBelowMinValue);
					if(valFarmiAcceptBelowMinValue){botArbiterCheck();}
				},false);
				inp.disabled=!valFarmiAccept;
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalFarmiAcceptBelowMinValue"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalFarmiRemoveMissing","class":"link",type:"checkbox",checked:valFarmiRemoveMissing},newtd);
				inp.addEventListener("click",function(){
					valFarmiRemoveMissing=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRemoveMissing", valFarmiRemoveMissing);
					if(valFarmiRemoveMissing){botArbiterCheck();}
				},false);
				newtd=createElement("td",{colspan:"1"},newtr,texte["automat"]["setvalFarmiRemoveMissing"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("input",{"id":"inputvalFarmiRemoveMissingAboveNr","style":"width:100%;height:18px;direction:rtl",value:valFarmiRemoveMissingAboveNr},newtd);
				inp.addEventListener("change",function(){
					var help=parseInt(this.value,10);
					if(isNaN(help)){
						this.value=valFarmiRemoveMissingAboveNr;
					}else{
						valFarmiRemoveMissingAboveNr=Math.max(0,Math.min(999,help));
						this.value=valFarmiRemoveMissingAboveNr;
						GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRemoveMissingAboveNr", valFarmiRemoveMissingAboveNr);
						if(valFarmiRemoveMissing){botArbiterCheck();}
					}
				},false);
				
		// *********** LOTTERY ************************************

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				newtd=createElement("th",{colspan:"3"},newtr,"Lottery"); // TODO texte

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center","width":"40"},newtr);
				inp=createElement("input",{"class":"link","type":"checkbox","checked":valUseBot["lottery"]},newtd);
				inp.addEventListener("click",function(){
					valUseBot["lottery"]=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valUseBot",implode(valUseBot));
					var help=$("infoPanelR").getElementsByClassName("valUseBot_lottery");
					if(valUseBot["lottery"]){
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){	help[i].style.opacity="1";
							}else{ help[i].disabled=false; }
						}
						$("inputvalLotteryDailyLot").disabled=!valLotteryActivate;
					}else{
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){ help[i].style.opacity="0.6"; 
							}else{ help[i].disabled=true; }
						}
					}
					help=null;
					botArbiterCheck();
				},false);
				newtd=createElement("td",{"colspan":"2"},newtr,"Use lottery bot"); //TODO texte
				
				newtr=createElement("tr",{"class":"valUseBot_lottery","style":"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{"class":"valUseBot_lottery link",type:"checkbox","checked":valLotteryActivate},newtd);
				inp.addEventListener("click",function(){
					valLotteryActivate=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valLotteryActivate", valLotteryActivate);
					$("inputvalLotteryDailyLot").disabled=!valLotteryActivate;
					if(valLotteryActivate){botArbiterCheck();}
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalLotteryActivate"]);

				newtr=createElement("tr",{"class":"valUseBot_lottery","style":"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{"class":"valUseBot_lottery","id":"inputvalLotteryDailyLot","class":"link",type:"checkbox",checked:valLotteryDailyLot},newtd);
				inp.disabled=!valLotteryActivate;
				inp.addEventListener("click",function(){
					valLotteryDailyLot=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valLotteryDailyLot", valLotteryDailyLot);
					if(valLotteryDailyLot){botArbiterCheck();}
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalLotteryDailyLot"]);

		// *********** QUEST **************************************
				/* quest-bot needs review
				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalQuestActivate","class":"link",type:"checkbox",checked:valQuestActivate||GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestActivate", false)},newtd);
				inp.addEventListener("click",function(){
					valQuestActivate=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestActivate", valQuestActivate);
					if(valQuestActivate){botArbiterCheck();}
				},false);
				inp.disabled=valQuestActivateUntilNr<unsafeData.questData["farm"]["1"]["nr"];
				newtd=createElement("td",{colspan:"1"},newtr,texte["automat"]["setvalQuestActivate"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("select",{"id":"valQuestActivateUntilNrSelector","style":"width:100%;height:18px;direction:rtl"},newtd);
				createElement("option",{"value":"-"},inp,"-");
				for(var i=unsafeData.questData["farm"]["1"]["nr"];i<unsafeData.QUESTS["farm"]["1"].length;i++){
					createElement("option",{"value":i},inp,i);
				}
				inp.value=(valQuestActivateUntilNr<unsafeData.questData["farm"]["1"]["nr"])?"-":valQuestActivateUntilNr;
				inp.addEventListener("change",function(){
					if(this.value=="-"){
						valQuestActivateUntilNr=0;
					}else{
						valQuestActivateUntilNr=parseInt(this.value,10);
					}
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestActivateUntilNr", valQuestActivateUntilNr);
					$("inputvalQuestActivate").disabled=valQuestActivateUntilNr<unsafeData.questData["farm"]["1"]["nr"];
					if(valQuestActivateUntilNr < unsafeData.questData["farm"]["1"]["nr"]) valQuestActivate=false;
					if(valQuestActivate){botArbiterCheck();}
				},false);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalQuestSolving","class":"link",type:"checkbox",checked:valQuestSolving||GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestSolving", false)},newtd);
				inp.addEventListener("click",function(){
					valQuestSolving=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestSolving", valQuestSolving);
					if(valQuestSolving){botArbiterCheck();}
				},false);
				inp.disabled=valQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"];
				newtd=createElement("td",{colspan:"1"},newtr,texte["automat"]["setvalQuestSolving"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("select",{"id":"valQuestActivateUntilNrSelector","style":"width:100%;height:18px;direction:rtl"},newtd);
				createElement("option",{"value":"-"},inp,"-");
				for(var i=unsafeData.questData["farm"]["1"]["nr"];i<unsafeData.QUESTS["farm"]["1"].length;i++){
					createElement("option",{"value":i},inp,i);
				}
				inp.value=(valQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"])?"-":valQuestSolvingUntilNr;
				inp.addEventListener("change",function(){
					if(this.value=="-"){
						valQuestSolvingUntilNr=0;
					}else{
						valQuestSolvingUntilNr=parseInt(this.value,10);
					}
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestSolvingUntilNr", valQuestSolvingUntilNr);
					$("inputvalQuestSolving").disabled=valQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"];
					if(valQuestSolvingUntilNr < unsafeData.questData["farm"]["1"]["nr"]) valQuestSolving=false;
					if(valQuestSolving){botArbiterCheck();}
				},false);
				//TODO add valLodgeQuestSolving
				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{id:"inputvalLodgeQuestSolving","class":"link",type:"checkbox",checked:valLodgeQuestSolving||GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valLodgeQuestSolving", false)},newtd);
				inp.addEventListener("click",function(){
					valLodgeQuestSolving=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valLodgeQuestSolving", valLodgeQuestSolving);
					if(valLodgeQuestSolving){botArbiterCheck();}
				},false);
				newtd=createElement("td",{colspan:"1"},newtr,"setvalLodgeQuestSolving");//texte["automat"]["setvalLodgeQuestSolving"]);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				
				inp.disabled=valLodgeQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"];				
				inp=createElement("select",{"id":"valLodgeQuestActivateUntilNrSelector","style":"width:100%;height:18px;direction:rtl"},newtd);
				createElement("option",{"value":"-"},inp,"-");
				for(var i=unsafeData.questData["farm"]["1"]["nr"];i<unsafeData.QUESTS["farm"]["1"].length;i++){
					createElement("option",{"value":i},inp,i);
				}
				inp.value=(valLodgeQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"])?"-":valLodgeQuestSolvingUntilNr;
				inp.addEventListener("change",function(){
					if(this.value=="-"){
						valLodgeQuestSolvingUntilNr=0;
					}else{
						valLodgeQuestSolvingUntilNr=parseInt(this.value,10);
					}
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valLodgeQuestSolvingUntilNr", valLodgeQuestSolvingUntilNr);
					$("inputvalLodgeQuestSolving").disabled=valLodgeQuestSolvingUntilNr<unsafeData.questData["farm"]["1"]["nr"];
					if(valLodgeQuestSolvingUntilNr < unsafeData.questData["farm"]["1"]["nr"]) valLodgeQuestSolving=false;
					if(valLodgeQuestSolving){botArbiterCheck();}
				},false);
				*/
				
		// *********** WINDMILL ***********************************

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{"colspan":"3"},newtr,texte["windmill"]);

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center","width":"40"},newtr);
				inp=createElement("input",{"class":"link","type":"checkbox","checked":valUseBot["windmill"]},newtd);
				inp.addEventListener("click",function(){
					valUseBot["windmill"]=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valUseBot",implode(valUseBot));
					handleGlobalIcon("windmill");
					/*
					if($("divQueueBox").style.display=="block"){
						var zoneNrF=$("divQueueBoxInner").getAttribute("zoneNrF");
						//var zoneNrL=$("divQueueBoxInner").getAttribute("zoneNrL");
						click($("divQueueBoxClose"));
						if(valUseMillBot) click($("divAutomatIcon_"+zoneNrF));
					}
					*/
					var help=$("infoPanelR").getElementsByClassName("valUseBot_windmill");
					if(valUseBot["windmill"]){
						reCalculateWindmill();
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){	help[i].style.opacity="1";
							}else{ help[i].disabled=false; }
						}
					}else{
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){ help[i].style.opacity="0.6"; 
							}else{ help[i].disabled=true; }
						}
					}
					help=null;
					botArbiterCheck();
				},false);
				newtd=createElement("td",{},newtr,"Use windmill bot"); //TODO texte
				inp=createElement("img",{"src":strImages["help"],"style":"margin-left:3px;height:14px;width:14px;"},newtd);
				inp.addEventListener("mouseover",function(evt){ showToolTip(evt,"<div style='width:300px'><b>"+texte["automat"]["hilfe"]["windmill"][0]+"</b><br>"+texte["automat"]["hilfe"]["windmill"][1]+"</div>"); },false);
				newtd=createElement("td",{"style":"width:120px;"},newtr);
				inp=createElement("button",{"class":"valUseBot_windmill link hoverBgCc9",style:"display:block;width:110px;margin:5px;padding:1px;"},newtd,texte["automat"]["set18a"]);
				inp.addEventListener("click",function(){
					this.disabled=true;
					zoneList["windmill"]=DEFAULT_ZONELIST_MILL_ARRAY;
					zoneSettings["windmill"]={"shuffle":false,"lack":0,"detail":new Array()};
					autoMillStorage=new Array();
					reFillQueueBox("windmill","windmill",0);
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList));
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings));
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_autoMillStorage",implode(autoMillStorage));
					alert(texte["automat"]["set18b"]);
					this.disabled=false;
				},false);
				
				newtr=createElement("tr",{"class":"valUseBot_windmill","style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center","style":"max-width:120px;"},newtr);
				inp=createElement("input",{"class":"valUseBot_windmill link","type":"checkbox","checked":valPowerUpActivate},newtd);
				inp.addEventListener("click",function(){
					valPowerUpActivate=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valPowerUpActivate", valPowerUpActivate);
					if(valPowerUpActivate){ botArbiterCheck(); }
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalPowerUpActivate"]);

		// *********** FORESTRY ***********************************

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{"colspan":"3"},newtr,texte["forestry"]);

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"colspan":"3","align":"center"},newtr,"This bot is not ready. Sorry... :(");

				newtr=createElement("tr",{"style":"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center","width":"40"},newtr);
				inp=createElement("input",{"class":"link","type":"checkbox","checked":valUseBot["forestry"]},newtd);
				inp.addEventListener("click",function(){
					valUseBot["forestry"]=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valUseBot",implode(valUseBot));
					// handleGlobalIcon("forestry");
					var help=$("infoPanelR").getElementsByClassName("valUseBot_forestry");
					if(valUseBot["forestry"]){
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){	help[i].style.opacity="1";
							}else{ help[i].disabled=false; }
						}
					}else{
						for(var i=0;i<help.length;i++){
							if(help[i].nodeName=="TR"){ help[i].style.opacity="0.6"; 
							}else{ help[i].disabled=true; }
						}
					}
					help=null;
					botArbiterCheck();
				},false);
				newtd=createElement("td",{"colspan":"2"},newtr,"Use forestry bot"); //TODO texte

		//*****

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,texte["automat"]["general"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center"},newtr);
				inp=createElement("input",{id:"inputvalUpdate","type":"checkbox","class":"link","checked":GM_getValue("valUpdate",true)},newtd);
				inp.addEventListener("click",function(){
					GM_setValue2("valUpdate", this.checked);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["valUpdate"][1]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputtmin",value:tmin,size:"5px",style:"text-align:center;background-color:transparent;"},newtd);
				inp.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					help=Math.max(0,Math.min(help,tmax));
					this.value=help;
					GM_setValue2(LNG+"_tmin", help);
				},false);
				createElement("span","",newtd,"ms");
				createElement("td",{},newtr,texte["automat"]["settMin"]);
				newtd=createElement("td",{"rowspan":"4","style":"width:120px;"},newtr);
				inp=createElement("button",{"id":"inputResetTimingValues","class":"link hoverBgCc9","style":"display:block;width:110px;margin:5px;padding:1px;"},newtd,texte["automat"]["setToDefault"]);
				inp.addEventListener("click",function(){
					tmin=300;
					tmax=700;
					tmin2=2000;
					tmax2=4000;
					GM_setValue2(LNG+"_tmin", tmin);
					GM_setValue2(LNG+"_tmax", tmax);
					GM_setValue2(LNG+"_tmin2", tmin2);
					GM_setValue2(LNG+"_tmax2", tmax2);
					$("inputtmin").value=tmin;
					$("inputtmax").value=tmax;
					$("inputtmin2").value=tmin2;
					$("inputtmax2").value=tmax2;
				},false);


				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputtmax",value:tmax,size:"5px",style:"text-align:center;background-color:transparent;"},newtd);
				inp.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					help=Math.max(0,Math.max(help,tmin));
					this.value=help;
					GM_setValue2(LNG+"_tmax", help);
				},false);
				createElement("span","",newtd,"ms");
				createElement("td",{},newtr,texte["automat"]["settMax"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputtmin2",value:tmin2,size:"5px",style:"text-align:center;background-color:transparent;"},newtd);
				inp.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					help=Math.max(0,Math.min(help,tmax2));
					this.value=help;
					GM_setValue2(LNG+"_tmin2", help);
				},false);
				createElement("span","",newtd,"ms");
				createElement("td",{},newtr,texte["automat"]["settMin2"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{align:"center"},newtr);
				inp=createElement("input",{id:"inputtmax2",value:tmax2,size:"5px",style:"text-align:center;background-color:transparent;"},newtd);
				inp.addEventListener("change",function(){
					var help = parseInt(this.value,10);
					help=Math.max(0,Math.max(help,tmin2));
					this.value=help;
					GM_setValue2(LNG+"_tmax2", help);
				},false);
				createElement("span","",newtd,"ms");
				createElement("td",{},newtr,texte["automat"]["settMax2"]);

		// *****

				newtr=createElement("tr",{"style":"background-color:#b69162;"},newtable);
				createElement("th",{colspan:"3"},newtr,texte["automat"]["development"]);

				newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				newtd=createElement("td",{"align":"center"},newtr);
				newinput=createElement("input",{"id":"inputDevmode","type":"checkbox","class":"link","checked":DEVMODE},newtd);
				newinput.addEventListener("click",function(){GM_setValue2("devmode",DEVMODE=this.checked);},false);
				createElement("td",{},newtr,"Developer Mode");
				createElement("td",{},newtr);

				newtr=createElement("tr",{},newtable);
				newtd=createElement("td",{"align":"center"},newtr);
				newinput=createElement("input",{"id":"inputDevmodeFunctions","type":"checkbox","class":"link","checked":DEVMODE_FUNCTION},newtd);
				newinput.addEventListener("click",function(){GM_setValue2("devmode_function",DEVMODE_FUNCTION=this.checked);},false);
				createElement("td",{},newtr,"Developer Function");
				createElement("td",{},newtr,"Show function calls");
				newtable=null;newtr=null;newtd=null;inp=null;newtable=null;
				}catch(err){GM_log("ERROR click@infoPanelLAutomat\n"+err);}
			},false);
//****************-------------------------------
			newdiv=createElement("div",{"id":"infoPanelZoneList","class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["automat"]["zonePairing"]);
			newdiv.addEventListener("click",function(){
			try{
				$("infoPanelT").innerHTML="<b>"+texte["automat"]["zonePairing"]+"</b>&nbsp;-&nbsp;"+texte["automat"]["automat"]+"&nbsp;"+VERSION;

				var infoPanelR=$("infoPanelR");
				infoPanelR.innerHTML="";
				// count zones
				var slotCount=new Object();
				var zoneType;
				for(var i in unsafeData.ALL_SLOTS){
					if(!unsafeData.ALL_SLOTS.hasOwnProperty(i)){ continue; }
					if(unsafeData.zoneBlock[i]){ continue; }
					zoneType=getZoneTyp(i);
					if(!slotCount[zoneType]){ slotCount[zoneType]=0; }
					slotCount[zoneType]++;
				}
				var newdiv;
				for(var i in slotCount){
					if(!slotCount.hasOwnProperty(i)){ continue; }
					if((i==1)||(slotCount[i]>1)){
						newdiv=createElement("div",{"style":"font-weight:bold;"},infoPanelR,isNaN(i)?texte[i]:unsafeWindow.buildinginfos[0][i][10]);
						newdiv.appendChild(drawZoneListTable(i));
					}
				}
				infoPanelR=null;newdiv=null;
			}catch(err){ GM_log("ERROR click@infoPanelZoneList i="+i+"\n"+err); }
			},false);
//****************-------------------------------
/*
			newdiv=createElement("div",{"id":"infoPanelZoneList","class":"link hoverBgCc9","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["automat"]["debug"]);
			newdiv.addEventListener("click",function(){
				$("infoPanelT").innerHTML="<b>"+texte["automat"]["debug"]+"</b>&nbsp;-&nbsp;"+texte["automat"]["automat"]+"&nbsp;"+VERSION;
				var infoPanelR=$("infoPanelR");
				infoPanelR.innerHTML="";

				var newtable=createElement("table",{style:"width:100%",border:"1"},$("infoPanelR"));

				var newtr=createElement("tr",{style:"line-height:18px;"},newtable);
				var newtd=createElement("td",{align:"center","style":"max-width:120px;"},newtr);
				var inp=createElement("input",{id:"inputvalAutoPflanz","class":"link",type:"checkbox",checked:valAutoPflanz},newtd);
				inp.addEventListener("click",function(){
					valAutoPflanz=this.checked;
					GM_setValue2(LNG+"_"+SERVER+"_"+USERNAME+"_valAutoPflanz", valAutoPflanz);
				},false);
				newtd=createElement("td",{colspan:"2"},newtr,texte["automat"]["setvalAutoPflanz"]);



				infoPanelR=null;newtable=null;newtr=null;newtd=null;inp=null;
			},false);
*/
//****************-------------------------------
			newdiv=createElement("div",{"id":"infoPanelDebug","class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["automat"]["debug"]);
			newdiv.addEventListener("click",function(){
				$("infoPanelT").innerHTML="<b>"+texte["automat"]["debug"]+"</b>&nbsp;-&nbsp;"+texte["automat"]["automat"]+"&nbsp;"+VERSION;
				var infoPanelR=$("infoPanelR");
				infoPanelR.innerHTML="";

				newdiv=createElement("TEXTAREA", {"id":"debugbox","style":"width:99%;height:99%;"},infoPanelR);
				newdiv.innerHTML +="scriptversion:"+VERSION + ";\n";
				newdiv.innerHTML +="neededVersionBerater:"+neededVersionBerater + ";\n";
				newdiv.innerHTML +="neededVersionFunctionFile:"+neededVersionFunctionFile + ";\n";
				newdiv.innerHTML +="zoneSettings:"+implode(zoneSettings,"Debug/zoneSettings") + ";\n";
				newdiv.innerHTML +="zoneList:"+implode(zoneList,"Debug/zoneList") + ";\n";
				newdiv.innerHTML +="zoneToList:"+implode(zoneToList,"Debug/zoneToList") + ";\n";
				newdiv.innerHTML +="autoMillStorage:"+implode(autoMillStorage,"Debug/autoMillStorage") + ";\n";
				newdiv.innerHTML +="zoneType:"+implode(unsafeData.zoneTyp,"Debug/zoneTyp") + ";\n";
				newdiv.innerHTML +="emergencyPlants:"+implode(emergencyPlants,"Debug/emergencyPlants") + ";\n";
				newdiv.innerHTML +="valBot:"+valBot+ ";\n";
				newdiv.innerHTML +="valAutoPflanz:"+valAutoPflanz+ ";\n";
				newdiv.innerHTML +="valAutoFutter:"+valAutoFutter+ ";\n";
				newdiv.innerHTML +="valSeedWaitForCrop:"+valSeedWaitForCrop+ ";\n";
				newdiv.innerHTML +="valDisableCropFields:"+valDisableCropFields+ ";\n";
				newdiv.innerHTML +="valWater:"+valWater+ ";\n";
				newdiv.innerHTML +="valUseQueueList:"+valUseQueueList+ ";\n";
				newdiv.innerHTML +="valShowQueueTime:"+valShowQueueTime+ ";\n";
				newdiv.innerHTML +="valPowerUpActivate:"+valPowerUpActivate+ ";\n";
				newdiv.innerHTML +="valLotteryActivate:"+valLotteryActivate+ ";\n";
				newdiv.innerHTML +="valLotteryDailyLot:"+valLotteryDailyLot+ ";\n";
				/* quest-bot needs review
				newdiv.innerHTML +="valQuestActivate:"+valQuestActivate+ ";\n";
				newdiv.innerHTML +="valQuestActivateUntilNr:"+valQuestActivateUntilNr+ ";\n";
				newdiv.innerHTML +="valQuestSolving:"+valQuestSolving+ ";\n";
				newdiv.innerHTML +="valQuestSolvingUntilNr:"+valQuestSolvingUntilNr+ ";\n";
				newdiv.innerHTML +="valLodgeQuestSolving:"+valLodgeQuestSolving+ ";\n";
				*/
				newdiv.innerHTML +="valFarmiReject:"+valFarmiReject+ ";\n";
				newdiv.innerHTML +="valFarmiRejectUntilNr:"+valFarmiRejectUntilNr+ ";\n";
				newdiv.innerHTML +="valFarmiAccept:"+valFarmiAccept+ ";\n";
				newdiv.innerHTML +="valFarmiAcceptAboveNr:"+valFarmiAcceptAboveNr+ ";\n";
				newdiv.innerHTML +="valFarmiAcceptBelowMinValue:"+valFarmiAcceptBelowMinValue+ ";\n";
				newdiv.innerHTML +="valFarmiRemoveMissing:"+valFarmiRemoveMissing+ ";\n";
				newdiv.innerHTML +="valFarmiRemoveMissingAboveNr:"+valFarmiRemoveMissingAboveNr+ ";\n";
				newdiv.innerHTML +="tmin:"+tmin+"; tmax:"+tmax+";\n tmin2:"+tmin2+"; tmax2:"+tmax2+ ";\n";
				newdiv.innerHTML +="valUpdate:"+GM_getValue("valUpdate",true)+";\n";
				newdiv.innerHTML +="devMode:"+DEVMODE+";\n";

				infoPanelR=null;newdiv=null;
			},false);

			if(GM_getValue("testaccount",false)){ //CODE inside for debuging debug info
				texte["automat"]["recovertext"]="Paste here the code of the debug info then press the recode-button. A screen opens and select import or cancel.";

				newdiv=createElement("div",{"id":"infoPanelRecover","class":"link hoverBgLightbrown","style":"padding-top:5px;border-bottom:1px solid #685338;"},$("infoPanelL"),texte["automat"]["recover"]);
				newdiv.addEventListener("click",function(){
					$("infoPanelT").innerHTML="<b>"+texte["automat"]["recover"]+"</b>&nbsp;-&nbsp;"+texte["automat"]["automat"]+"&nbsp;"+VERSION;
					$("infoPanelT").innerHTML +="<br>"+texte["automat"]["recovertext"];
					var infoPanelR=$("infoPanelR");
					infoPanelR.innerHTML="";
					newdiv=createElement("TEXTAREA", {"id":"recoverbox","style":"width:475px;height:450px;"},infoPanelR);
					newdiv.innerHTML +="scriptversion:"+VERSION + ";\n";
					newdiv.innerHTML +="neededVersionBerater:"+neededVersionBerater + ";\n";
					newdiv.innerHTML +="neededVersionFunctionFile:"+neededVersionFunctionFile + ";\n";
					newdiv.innerHTML +="zoneSettings:"+implode(zoneSettings,"recover/zoneSettings") + ";\n";
					newdiv.innerHTML +="zoneList:"+implode(zoneList,"recover/zoneList") + ";\n";
					newdiv.innerHTML +="zoneToList:"+implode(zoneToList,"recover/zoneToList") + ";\n";
					newdiv.innerHTML +="autoMillStorage:"+implode(autoMillStorage,"recover/autoMillStorage") + ";\n";
					newdiv.innerHTML +="zoneType:"+implode(unsafeData.zoneTyp,"recover/zoneTyp") + ";\n";
					newdiv.innerHTML +="emergencyPlants:"+implode(emergencyPlants,"recover/emergencyPlants") + ";\n";
					newdiv.innerHTML +="valBot:"+valBot+ ";\n";
					newdiv.innerHTML +="valAutoPflanz:"+valAutoPflanz+ ";\n";
					newdiv.innerHTML +="valAutoFutter:"+valAutoFutter+ ";\n";
					newdiv.innerHTML +="valSeedWaitForCrop:"+valSeedWaitForCrop+ ";\n";
					newdiv.innerHTML +="valDisableCropFields:"+valDisableCropFields+ ";\n";
					newdiv.innerHTML +="valWater:"+valWater+ ";\n";
					newdiv.innerHTML +="valUseQueueList:"+valUseQueueList+ ";\n";
					newdiv.innerHTML +="valShowQueueTime:"+valShowQueueTime+ ";\n";
					newdiv.innerHTML +="valPowerUpActivate:"+valPowerUpActivate+ ";\n";
					newdiv.innerHTML +="valLotteryActivate:"+valLotteryActivate+ ";\n";
					newdiv.innerHTML +="valLotteryDailyLot:"+valLotteryDailyLot+ ";\n";
					/* quest-bot needs review
					newdiv.innerHTML +="valQuestActivate:"+valQuestActivate+ ";\n";
					newdiv.innerHTML +="valQuestActivateUntilNr:"+valQuestActivateUntilNr+ ";\n";
					newdiv.innerHTML +="valQuestSolving:"+valQuestSolving+ ";\n";
					newdiv.innerHTML +="valQuestSolvingUntilNr:"+valQuestSolvingUntilNr+ ";\n";
					newdiv.innerHTML +="valLodgeQuestSolving:"+valLodgeQuestSolving+ ";\n";
					*/
					newdiv.innerHTML +="valFarmiReject:"+valFarmiReject+ ";\n";
					newdiv.innerHTML +="valFarmiRejectUntilNr:"+valFarmiRejectUntilNr+ ";\n";
					newdiv.innerHTML +="valFarmiAccept:"+valFarmiAccept+ ";\n";
					newdiv.innerHTML +="valFarmiAcceptAboveNr:"+valFarmiAcceptAboveNr+ ";\n";
					newdiv.innerHTML +="valFarmiAcceptBelowMinValue:"+valFarmiAcceptBelowMinValue+ ";\n";
					newdiv.innerHTML +="valFarmiRemoveMissing:"+valFarmiRemoveMissing+ ";\n";
					newdiv.innerHTML +="valFarmiRemoveMissingAboveNr:"+valFarmiRemoveMissingAboveNr+ ";\n";
					newdiv.innerHTML +="tmin:"+tmin+"; tmax:"+tmax+";\n tmin2:"+tmin2+"; tmax2:"+tmax2+ ";\n";
					newdiv.innerHTML +="valUpdate:"+GM_getValue("valUpdate",true)+";\n";
					newdiv.innerHTML +="devMode:"+DEVMODE+";\n";

					newelm=createElement("button",{"class":"link","style":""},infoPanelR,"Preview");
					newelm.addEventListener("click",function(){
						try{
							var recover=new Object();
							var recoverbox=$("recoverbox").value;
							GM_log("recoverbox="+recoverbox);
							//TODO add OPTION_ITEM_REPEAT
							//TODO add OPTION_LIST_REPEAT
							recover["scriptversion"]=/scriptversion:(.*);/.exec(recoverbox)[1];
							recover["neededVersionBerater"]=/neededVersionBerater:(.*);/.exec(recoverbox)[1];
							recover["neededVersionFunctionFile"]=/neededVersionFunctionFile:(.*);/.exec(recoverbox)[1];
							recover["zoneSettings"]=explode(/zoneSettings:(.*);/.exec(recoverbox)[1],"preview/zoneSettings");
							recover["zoneList"]=explode(/zoneList:(.*);/.exec(recoverbox)[1],"preview/zoneList");
							recover["zoneToList"]=explode(/zoneToList:(.*);/.exec(recoverbox)[1],"preview/zoneToList");
							recover["autoMillStorage"]=explode(/autoMillStorage:(.*);/.exec(recoverbox)[1],"preview/autoMillStorage");
							recover["zoneType"]=explode(/zoneType:(.*);/.exec(recoverbox)[1],"preview/zoneType");
							recover["emergencyPlants"]=explode(/emergencyPlants:(.*);/.exec(recoverbox)[1],"preview/emergencyPlants");
							recover["valBot"]=/valBot:(.*);/.exec(recoverbox)[1];
							recover["valAutoPflanz"]=/valAutoPflanz:(.*);/.exec(recoverbox)[1];
							recover["valAutoFutter"]=/valAutoFutter:(.*);/.exec(recoverbox)[1];
							recover["valSeedWaitForCrop"]=/valSeedWaitForCrop:(.*);/.exec(recoverbox)[1];
							recover["valDisableCropFields"]=/valDisableCropFields:(.*);/.exec(recoverbox)[1];
							recover["valWater"]=/valWater:(.*);/.exec(recoverbox)[1];
							recover["valUseQueueList"]=/valUseQueueList:(.*);/.exec(recoverbox)[1];
							recover["valShowQueueTime"]=/valShowQueueTime:(.*);/.exec(recoverbox)[1];
							recover["valPowerUpActivate"]=/valPowerUpActivate:(.*);/.exec(recoverbox)[1];
							recover["valLotteryActivate"]=/valLotteryActivate:(.*);/.exec(recoverbox)[1];
							recover["valLotteryDailyLot"]=/valLotteryDailyLot:(.*);/.exec(recoverbox)[1];
							/* quest-bot needs review
							recover["valQuestActivate"]=/valQuestActivate:(.*);/.exec(recoverbox)[1];
							recover["valQuestActivateUntilNr"]=/valQuestActivateUntilNr:(.*);/.exec(recoverbox)[1];
							recover["valQuestSolving"]=/valQuestSolving:(.*);/.exec(recoverbox)[1];
							recover["valQuestSolvingUntilNr"]=/valQuestSolvingUntilNr:(.*);/.exec(recoverbox)[1];
							recover["valLodgeQuestSolving"]=/valLodgeQuestSolving:(.*);/.exec(recoverbox)[1];
							*/
							recover["valFarmiReject"]=/valFarmiReject:(.*);/.exec(recoverbox)[1];
							recover["valFarmiRejectUntilNr"]=/valFarmiRejectUntilNr:(.*);/.exec(recoverbox)[1];
							recover["valFarmiAccept"]=/valFarmiAccept:(.*);/.exec(recoverbox)[1];
							recover["valFarmiAcceptAboveNr"]=/valFarmiAcceptAboveNr:(.*);/.exec(recoverbox)[1];
							recover["valFarmiAcceptBelowMinValue"]=/valFarmiAcceptBelowMinValue:(.*);/.exec(recoverbox)[1];
							recover["valFarmiRemoveMissing"]=/valFarmiRemoveMissing:(.*);/.exec(recoverbox)[1];
							recover["valFarmiRemoveMissingAboveNr"]=/valFarmiRemoveMissingAboveNr:(.*);/.exec(recoverbox)[1];
							recover["tmin"]=/tmin:(.*); tmax:(.*);\n/.exec(recoverbox)[1];
							recover["tmax"]=/tmin:(.*); tmax:(.*);\n/.exec(recoverbox)[2];
							recover["tmin2"]=/tmin2:(.*); tmax2:(.*);\n/.exec(recoverbox)[1];
							recover["tmax2"]=/tmin2:(.*); tmax2:(.*);\n/.exec(recoverbox)[2];
							recover["valUpdate"]=/valUpdate:(.*);/.exec(recoverbox)[1];
							recover["devMode"]=/devMode:(.*);/.exec(recoverbox)[1];
						}catch(err){GM_log("ERROR recover \n"+err);}
						GM_log("recover:"+implode(recover,"recover"));
						if(recover["scriptversion"]==VERSION){
							recoverPreview(recover);
						}else{
							showInLogBubble("Recover version is of other version\n then current running script",30,"red");
						}
						newdiv=null;newcontainer=null;
					},false);
					infoPanelR=null;newdiv=null;
				},false);
			}

			newdiv=null;
			if(DEVMODE) raiseEvent("nodeInsertedInfoPanelLAutomat");//NOTE this is for quick buttons
		}
	},false);

	function recoverPreview(recoverData){
		var newcont=$("recoverBuildingContainerContent");
		// var colors=["#FF6600","#FF9900","#FFCC00","#99CC00","#33CCCC","#3366FF","#FFCC99","#CC99FF","#FF99CC","#99CCFF","#FFFF99","#CCFFCC"];
		var colors=["#000080","#00FF00","#008080","#800000","#800080","#808000","#FEF5A8","#C5F19A","#FFD8A0","#B9D0E8","#D6BFD4","#F79494","#D3D7CF","#B3B300","#FFFF80"];
		newcont.setAttribute("recoverData",implode(recoverData,"revocerPreview/recoverData"));
		newcont.innerHTML="";
		var newz;
		// GM_log("recoverPreview recoverData:"+implode(recoverData,"recoverPreview/recoverData"));
	try{
		var zoneColor=new Array();
		var cCount=0,zNrL,zNrF;
		GM_log("zoneToList:"+implode(recoverData["zoneToList"],"recoverPreview/zoneToList"));

		for(zNrL in recoverData["zoneToList"]){
			if(!recoverData["zoneToList"].hasOwnProperty(zNrL)){ continue; }
			if(!zoneColor[recoverData["zoneToList"][zNrL]]) zoneColor[recoverData["zoneToList"][zNrL]]=new Array();
			zoneColor[recoverData["zoneToList"][zNrL]].push(zNrL);
		}
		GM_log("zoneColor:"+implode(zoneColor,"recoverPreview/zoneColor"));

		for(zNrL in zoneColor){
			if(!zoneColor.hasOwnProperty(zNrL)){ continue; }
			if(zoneColor[zNrL].length >1){
				zoneColor[zNrL]=colors[++cCount];
			}else{
				zoneColor[zNrL]="transparent";
			}
		}
		GM_log("zoneColor:"+implode(zoneColor,"recoverPreview/zoneColor"));

		for(var i=0;i<unsafeData.ALL_ZONES["farm"].length;i++){
			zNrF=unsafeData.ALL_ZONES["farm"][i];
			zNrL=recoverData["zoneToList"][zNrF];
			//GM_log("recoverPreview zNrF:"+zNrF+" zNrL:"+zNrL);
			if(recoverData["zoneType"][zNrF]!=undefined){
				newz=createElement("div",{"class":"recoverBuildingLocate"+zNrF,"zoneNr":zNrF,"style":"border:2px solid "+zoneColor[zNrL]+";"},newcont);
				newz.addEventListener("mouseover",function(evt){
					var zNrF=this.getAttribute("zoneNr");
					var recoverData=explode(this.parentNode.getAttribute("recoverData"),"recoverPreview/recoverData");
					$("recoverBuildingContainerZoneing").innerHTML="";
					showToolTip(evt,recoverDrawQueueList(recoverData,zNrF));
				},false);
				newz.addEventListener("mouseout",function(evt){
					$("recoverBuildingBubbleHeader").innerHTML="";
					// $("recoverBuildingContainerZoneing").innerHTML="";
				},false);
				if(recoverData["zoneType"][zNrF]==0){
					createElement("div",{"style":"position:absolute;width:64px;height:64px;background:url("+GFX+"block4.gif) top left no-repeat;"},newz); //zone building
				}else{
					createElement("div",{"style":"position:absolute;width:64px;height:64px;background:url("+GFX+"building"+recoverData["zoneType"][zNrF]+".gif) top left no-repeat;"},newz); //zone building
				}
				newdiv=createElement("div",{"style":"position:absolute; left:5px; top:5px;"},newz); //zone stars

				newdiv=createElement("div",{"style":"position:absolute; left:0px; top:50px;width:64px;text-align:center;"},newz); //zone info
				if(unsafeData.BUILDINGTYPE[recoverData["zoneType"][zNrF]]==1){
					newelm=createElement("div",{"class":"link queueButtonRepeat","style":"display:inline-block;"},newdiv);
					newelm.style.backgroundImage=(recoverData["zoneSettings"][zNrL]["repeat"])?"url("+strImages["repeat_on"]+")":"url("+strImages["repeat_off"]+")";
					newelm=createElement("div",{"class":"link queueButtonShuffle","style":"display:inline-block;"},newdiv);
					newelm.style.backgroundImage=(recoverData["zoneSettings"][zNrL]["shuffle"])?"url("+strImages["shuffle_on"]+")":"url("+strImages["shuffle_off"]+")";
				}else{
					newelm=createElement("div",{"class":"link queueButtonRepeat","style":"display:inline-block;"},newdiv);
					newelm.style.backgroundImage="url("+strImages["repeat_on"]+")";
				}
			}
		}
	}catch(err){GM_log("ERROR recoverPreview \n"+err);}
		newz=null;newdiv=null;newelm=null;
		$("recoverContainer").style.display="block";
		$("recoverContainerLayer").style.display="block";
	}

	function recoverDrawQueueList(recoverData,zNrF){
		var newdiv,newelm;
		var zNrL=recoverData["zoneToList"][zNrF];
		appendTo=createElement("div",{});

		//createElement("div",{"class":"queueTitle"},appendTo,unsafeWindow.buildinginfos[0][recoverData["zoneType"][zNrF]][10] + "&nbsp;zone&nbsp;"+zNrF+"&nbsp;list&nbsp;"+recoverData["zoneToList"][zNrF]);
		createElement("div",{style:"font-weight:bold;"},appendTo,unsafeWindow.buildinginfos[0][recoverData["zoneType"][zNrF]][10] + "&nbsp;zone&nbsp;"+zNrF+"&nbsp;list&nbsp;"+recoverData["zoneToList"][zNrF]);
		createElement("div",{style:"margin:4px 0px 4px 0px;width:100%;height:0px;border-bottom:1px solid white;"},appendTo);

		if(unsafeData.BUILDINGTYPE[recoverData["zoneType"][zNrF]]==3){
			for(var k=0;k<BUILDING2FEED[recoverData["zoneType"][zNrF]].length;k++){
				newdiv=createElement("div",{"class":"divQueueItemListChooseItem v"+BUILDING2FEED[recoverData["zoneType"][zNrF]][k]},appendTo);
				createElement("div",{"class":"divQueueItemListNumber"},newdiv, FEEDBONUSTIME[BUILDING2FEED[recoverData["zoneType"][zNrF]][k]]);
				newelm=createElement("div",{"class":"link queueItemButton queueItemModeButton","style":"top:47px;left:16px;"},newdiv);
				newelm.style.backgroundImage="url("+strImages["mode_repeat"]+")";
			}
		}else{
			for(queueNum=0;queueNum<recoverData["zoneList"][zNrL].length; queueNum++){
				if(!recoverData["valUseQueueList"] && queueNum>0 && unsafeData.BUILDINGTYPE[recoverData["zoneType"][zNrF]]==1) break;
				if(zNrL=="windmill"){
					newdiv=createElement("div",{"style":"margin-bottom:30px;","class":"divQueueItemListChooseItem"},appendTo);
					createElement("div",{"class":"fmm"+recoverData["zoneList"][zoneNrL][queueNum][0],style:"position:relative;"},newdiv);
				}else{
					newdiv=createElement("div",{"style":"margin-bottom:30px;","class":"divQueueItemListChooseItem v"+recoverData["zoneList"][zNrL][queueNum][0]},appendTo);
				}
				if(recoverData["zoneList"][zNrL][queueNum][0]!=PRODSTOP){
					var iLastInf=((recoverData["zoneList"][zNrL].length-1)==queueNum) && !recoverData["zoneSettings"][zNrL]["repeat"] && !recoverData["zoneSettings"][zNrL]["shuffle"];
					var amount=""+Math.max(0,recoverData["zoneList"][zNrL][queueNum][1] - recoverData["zoneList"][zNrL][queueNum][2]);
					createElement("div",{"class":"divQueueItemListNumber"},newdiv,((!recoverData["valUseQueueList"] && unsafeData.BUILDINGTYPE[recoverData["zoneType"][zNrF]]==1)||recoverData["zoneSettings"][zNrL]["repeat"]&&iLastInf)?sign_inf:amount);
				}
				if(unsafeData.BUILDINGTYPE[recoverData["zoneType"][zNrF]]==1){
					newelm=createElement("div",{"class":"link queueItemButton queueItemBehaviourButton","style":"top:47px;left:0px;"},newdiv);
					newelm.style.backgroundImage=(zNrL!="windmill" && recoverData["zoneList"][zNrL][queueNum][3])?"url("+strImages["functionR"]+")":"url("+strImages["functionF"]+")";

					if(recoverData["zoneList"][zNrL][queueNum][4]){ //TODO NEW function
						newelm=createElement("div",{"class":"link queueItemButton queueItemModeButton","style":"top:47px;left:16px;"},newdiv);
						newelm.style.backgroundImage=(zNrL!="windmill" && recoverData["zoneList"][zNrL][queueNum][4])?"url("+strImages["mode_repeat"]+")":"url("+strImages["mode_1time"]+")";
					}
				}else{
					newelm=createElement("div",{"class":"link queueItemButton queueItemModeButton","style":"top:47px;left:16px;"},newdiv);
					newelm.style.backgroundImage="url("+strImages["mode_repeat"]+")";
				}
			}
		}
		newdiv=null;newelm=null;
		var content=appendTo.innerHTML;
		appendTo=null;
		return content;
	}

//END RECOVER ************************************************************
	document.addEventListener("gameZoneReady",function(){
		if(DEVMODE){ showInLogBubble("event found:gameZoneReady: "+valBot); }
		checkReadyZone();
	},false);

	/* quest-bot needs review
	document.addEventListener("gameQuestNewAvailable",function(){
		if(DEVMODE){ showInLogBubble("event found:gameQuestNewAvailable: "+valQuestActivate); }
		if(unsafeData.questData["farm"]["1"]["state"]==1 && valQuestActivate && valQuestActivateUntilNr>=unsafeData.questData["farm"]["1"]["nr"]){
			botArbiterAdd("quest");
		}
	},false);
	document.addEventListener("gameQuestSolvable",function(){
		if(DEVMODE){ showInLogBubble("event found:gameQuestSolvable: "+valQuestSolving); }
		if(unsafeData.questData["farm"]["1"]["state"]==2 && valQuestSolving && valQuestSolvingUntilNr>=unsafeData.questData["farm"]["1"]["nr"] && checkQuest()){
			botArbiterAdd("quest");
		}
	},false);
	*/
	try{
		// Updatecheck
		var err_trace="Updatecheck";
		if((!unsafeData.beraterVersion)||(compareVersions(neededVersionBerater,unsafeData.beraterVersion)>0)){
			alert2(texte["automat"]["shouldUpdateBerater"],texte["ok"]);
		}
		// Updatecheck, [time,version on server,last checked version]
		var updateCheck=explode(GM_getValue("updateCheck",'[0,"'+VERSION+'","'+VERSION+'"]'),"do_main/updateCheck",[0,VERSION,VERSION]);
		if(GM_getValue("valUpdate",true)&&(now-updateCheck[0]>1800)){
			showInLogBubble("Checking for update (Automat)");
			updateCheck[0]=now;
			GM_setValue2("updateCheck",implode(updateCheck));
			GM_xmlhttpRequest({
				method: "GET",
				url: USO_Meta,
				onload: function(response){
					if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
						updateCheck[1]=(/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
						if(VERSION==updateCheck[1]){
							// this script is the one of the server
							updateCheck[2]=updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
							showInLogBubble("Update Check Automat: Script is up-to-date");
						}else if(updateCheck[1]!=updateCheck[2]){
							alert2(texte["automat"]["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
								updateCheck[2]=updateCheck[1];
								GM_setValue2("updateCheck",implode(updateCheck));
								window.setTimeout(function(){
									location.href=USO_Source;
								},0);
							},function(){
								updateCheck[2]=updateCheck[1];
								GM_setValue2("updateCheck",implode(updateCheck));
							});
						}else{
							showInLogBubble("Update Check Automat: Newer version available, but not wanted");
						}
					}else{
						showInLogBubble("Update Check Automat failed. Bad Response: "+response.responseText);
					}
				}
			});
		}
		////--------------------------------------------------------------------------------------------------------------------------------
		//[zoneNrF][QueNr][0]=product number, [1]=number to grow, [2]=number grown in loop modus, [3]=Behaviour (Field (default), Rack, Time(//TODO)), [4]=mode (1 time (default), repeat)
		//[zoneNrF][mill][0]=product number, [1]=number to grow, [2]=number grown in loop modus, [3]=Min([4]), [4]=Array([X]=Max recipes for product X)
		zoneList=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList"),"settings/zoneList",{});
		if((typeof zoneList!="object")||(zoneList instanceof Array)){ zoneList={}; }
		// check consistence
		var bChanged=false;
		for(var fz in zoneList){
			if(!zoneList.hasOwnProperty(fz)){ continue; }
			if(!(zoneList[fz] instanceof Array)){
				GM_log("zoneList delete not array:"+fz+"("+getZoneTyp(fz)+")");
				delete zoneList[fz]; bChanged=true; continue;
			}
			if(extendedListReg.test(fz)){ continue; }
			if(!unsafeData.ALL_SLOTS[fz]){
				GM_log("zoneList delete bad queue:"+fz+"("+getZoneTyp(fz)+")");
				delete zoneList[fz]; bChanged=true; continue;
			}
			if(unsafeData.zoneBlock[fz]){
				GM_log("zoneList delete blocked queue:"+fz+"("+getZoneTyp(fz)+")");
				delete zoneList[fz]; bChanged=true; continue;
			}
		}
		// check completeness
		for(var fz in unsafeData.ALL_SLOTS){
			if(!unsafeData.ALL_SLOTS.hasOwnProperty(fz)){ continue; }
			if(unsafeData.zoneBlock[fz]){ continue; }
			if(!zoneList[fz]){ createZoneList(fz); }
		}
		if(bChanged){ GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"settings/zoneList")); }
		zoneSettings=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings"),"settings/zoneSettings",{});
		if((typeof zoneSettings!="object")||(zoneSettings instanceof Array)){ zoneSettings={}; }
		zoneToList=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList"),"settings/zoneToList",{});
		if((typeof zoneToList!="object")||(zoneToList instanceof Array)){ zoneToList={}; }
		// check consistence
		var bChanged=false;
		for(var fz in zoneToList){
			if(!zoneToList.hasOwnProperty(fz)){ continue; }
			if(!unsafeData.ALL_SLOTS[fz]){
				GM_log("zoneToList delete bad zone:"+fz+"("+getZoneTyp(fz)+"):"+zoneToList[fz]+"("+getZoneTyp(zoneToList[fz])+")");
				delete zoneToList[fz]; bChanged=true; continue;
			}
			if(unsafeData.zoneBlock[fz]){
				GM_log("zoneToList delete blocked zone:"+fz+"("+getZoneTyp(fz)+"):"+zoneToList[fz]+"("+getZoneTyp(zoneToList[fz])+")");
				delete zoneToList[fz]; bChanged=true; continue;
			}
			if((!extendedListReg.test(zoneToList[fz]))&&(!unsafeData.ALL_SLOTS[zoneToList[fz]])){
				GM_log("zoneToList delete bad queue:"+fz+"("+getZoneTyp(fz)+"):"+zoneToList[fz]+"("+getZoneTyp(zoneToList[fz])+")");
				delete zoneToList[fz]; bChanged=true; continue;
			}
			if(getZoneTyp(fz)!=getZoneTyp(zoneToList[fz])){
				GM_log("zoneToList delete bad pairing:"+fz+"("+getZoneTyp(fz)+"):"+zoneToList[fz]+"("+getZoneTyp(zoneToList[fz])+")");
				delete zoneToList[fz]; bChanged=true; continue;
			}
		}
		if(bChanged){ GM_setValue(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList",implode(zoneToList,"settings/zoneToList")); }
		// check completeness
		for(var fz in unsafeData.ALL_SLOTS){
			if(!unsafeData.ALL_SLOTS.hasOwnProperty(fz)){ continue; }
			if(unsafeData.zoneBlock[fz]){ continue; }
			if(!zoneSettings[fz]){ zoneSettings[fz]={"repeat":false,"shuffle":false}; }
			if(!zoneToList[fz]){ setZoneListId(fz,fz); }
		}
		zoneList.sortObj();
		zoneSettings.sortObj();
		zoneToList.sortObj();

		valUseBot=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valUseBot"),"settings/valUseBot",{});
		if((!unsafeWindow.cities)||(unsafeWindow.cities<2)){ 
			valUseBot["windmill"]=false; 
		}

		emergencyPlants=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_emergencyPlants","[1,17]"),"settings/emergencyPlants",[1,17]); // Grain,Carrots
		//autoMillStorage: {[rId][0]=number bought, [1]=total number in zoneList[getZoneListId("windmill")], [2]=max number of recieps on products global Math.min([3][pId]), [3][pId]=max number of recieps for this products per products
		autoMillStorage=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_autoMillStorage","[]"),"settings/autoMillStorage",[]);
		valAutoPflanz=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valAutoPflanz",true);
		valAutoFutter=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valAutoFutter",true);
		valSeedWaitForCrop=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valSeedWaitForCrop",30);
		valDisableCropFields=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valDisableCropFields",false);
		valWater=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valWater",true);
		valUseQueueList=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valUseQueueList",false);
		valShowQueueTime=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valShowQueueTime",true);
		viewOverViewFarms=explode(GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_viewOverViewFarms"),"settings/viewOverViewFarms",[,true,true,true]);
		valPowerUpActivate=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valPowerUpActivate", false);
		valLotteryActivate=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valLotteryActivate", false);
		valLotteryDailyLot=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valLotteryDailyLot", false);
		/* quest-bot needs review
		valQuestActivate=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestActivate", false);
		valQuestActivateUntilNr=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestActivateUntilNr", 0);
		if(valQuestActivateUntilNr < unsafeData.questData["farm"]["1"]["nr"]) valQuestActivate=false;
		valQuestSolving =GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestSolving", false);
		valQuestSolvingUntilNr =GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valQuestSolvingUntilNr", 0);
		if(valQuestSolvingUntilNr < unsafeData.questData["farm"]["1"]["nr"]) valQuestSolving=false;
		valLodgeQuestSolving=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valLodgeQuestSolving", false);
		// TODO add valLodgeQuestSolving limits
		*/
		valFarmiReject=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiReject", false);
		valFarmiRejectUntilNr =GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRejectUntilNr", (unsafeData.valFarmiLimits?unsafeData.valFarmiLimits[0]:90));
		valFarmiAccept=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAccept", false);
		valFarmiAcceptAboveNr =GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAcceptAboveNr", (unsafeData.valFarmiLimits?unsafeData.valFarmiLimits[1]:100));
		valFarmiAcceptBelowMinValue=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiAcceptBelowMinValue", false);
		valFarmiRemoveMissing=GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRemoveMissing", false);
		valFarmiRemoveMissingAboveNr =GM_getValue(LNG+"_"+SERVER+"_"+USERNAME+"_valFarmiRemoveMissingAboveNr", 10);

		if(unsafeWindow.premium==1 || parseInt(top.document.getElementById("levelnum").innerHTML,10)<10) valAutoFutter=false;
		tmin=parseInt(GM_getValue(LNG+"_tmin",GM_getValue("tmin",300)),10);
		if(isNaN(tmin)){tmin=300;GM_setValue2(LNG+"_tmin", tmin);}
		tmax=parseInt(GM_getValue(LNG+"_tmax",GM_getValue("tmax",700)),10);
		if(isNaN(tmax)){tmax=700;GM_setValue2(LNG+"_tmax", tmax);}
		tmin2=parseInt(GM_getValue(LNG+"_tmin2",GM_getValue("tmin2",2000)),10);
		if(isNaN(tmin2)){tmin2=2000;GM_setValue2(LNG+"_tmin2", tmin2);}
		tmax2=parseInt(GM_getValue(LNG+"_tmax2",GM_getValue("tmax2",4000)),10);
		if(isNaN(tmax2)){tmax2=4000;GM_setValue2(LNG+"_tmax2", tmax2);}

		//make generic queue Box
		err_trace="generic queue Box";
		newdiv=createElement("div",{id:"divQueueBox",style:"position:absolute;top:240px;left:170px;width:380px;padding:2.5% 3%;background-color:#b8a789;z-index:102;display:none;"},$("garten_komplett"));
		createElement("img",{"src":GFX+"guild/help_back.jpg",style:"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
		var newimg=createElement("img",{id:"divQueueBoxClose","class":"link queueBoxClose",style:"position:absolute;right:2px;top:2px;","title":texte["automat"]["QueClose"],"src":GFX+"close.jpg"},newdiv);
		newimg.addEventListener("click",function(event){if(this.id==event.target.id){
			this.parentNode.style.display="none";
			if($("divChooseBox").style.display="block" && $("divChooseBoxInner").getAttribute("zoneNrF")==$("divQueueBoxInner").getAttribute("zoneNrF")) click($("divChooseBoxClose"));
			$("divQueueBoxInner").setAttribute("zoneNrF","");
			$("divQueueBoxInner").setAttribute("zoneNrL","");
			$("divQueueBoxInner").innerHTML="";
		}},false);
		createElement("div",{id:"divQueueBoxInner",style:""},newdiv);

		//make chooseBox
		err_trace="chooseBox";
		newdiv=createElement("div",{id:"divChooseBox",style:"position:absolute;top:240px;left:170px;width:380px;padding:2.5% 3%;background-color:#b8a789;z-index:103;display:none;"},$("garten_komplett"));
		createElement("img",{"src":GFX+"guild/help_back.jpg",style:"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
		var newimg=createElement("img",{id:"divChooseBoxClose","class":"link queueBoxClose",style:"position:absolute;right:2px;top:2px;","title":texte["automat"]["QueClose"],"src":GFX+"close.jpg"},newdiv);
		newimg.addEventListener("click",function(event){if(this.id==event.target.id){
			this.parentNode.style.display="none";
			$("divChooseBoxInner").setAttribute("zoneNrF","");
			$("divChooseBoxInner").setAttribute("zoneNrL","");
			$("divChooseBoxInner").innerHTML="";
		}},false);
		createElement("div",{id:"divChooseBoxInner",style:""},newdiv);

		newdiv=null;newimg=null;

		GM_addStyle(
			".rotate90 {-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);}\n"+
			".rotate180 {-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2)}\n"+
			".rotate270 {-webkit-transform: rotate(270deg);-moz-transform: rotate(270deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);}"+
			"#buildinginfo0, #buildinginfo1, #buildinginfo2, #buildinginfo3, #buildinginfo4, #buildinginfo5, #buildinginfo6 {top:52px; !important;}\n"+
			".divZoneIcon {position:absolute;bottom:0;right:-20px;z-index:3;border:2px solid black;border-radius:10px;background-color:#000000;}\n"+
			"#divAutomatIconContainer {position:absolute;top:125px;left:1001px;width:76px;margin:2px 0px;}\n"+
			".divWindmillIcon {position:relative;float:left;height:26px;width:26px;border:2px solid black;border-radius:10px;background-color:#CBAD85;margin:2px;padding:2px;}\n"+
			".divForestryIcon {position:relative;float:left;height:25px;width:25px;border:2px solid black;border-radius:10px;background-color:#FFFFFF;margin:2px;padding:2.5px;}\n"+
			".fmm"+PRODSTOP+" {background:url("+strImages["PRODSTOP_windmill_26"]+") no-repeat scroll 0 0 transparent;height:24px;width:26px;position:absolute;}\n"+
			".fm"+PRODSTOP+" {background:url("+strImages["PRODSTOP_windmill_52"]+") no-repeat scroll 0 0 transparent;height:49px;width:52px;position:absolute;}\n"+
			".v"+PRODSTOP+" {background:url("+strImages["PRODSTOP_30"]+") no-repeat scroll 0 0 transparent;height:30px;width:30px;!IMPORTANT}\n"+
			".kp"+PRODSTOP+" {background:url("+strImages["PRODSTOP_15"]+") no-repeat scroll 0 0 transparent;height:15px;width:15px;!IMPORTANT}\n"+
			".f_symbol"+PRODSTOP+" {background:url("+strImages["PRODSTOP_25"]+") no-repeat scroll 0 0 transparent;height:25px;width:25px;!IMPORTANT}\n"+
			".f_m_symbol"+PRODSTOP+" {background:url("+strImages["PRODSTOP_15"]+") no-repeat scroll 0 0 transparent;height:15px;width:15px;!IMPORTANT}\n"+
			".pointstar {background:url('"+GFX+"points.gif') no-repeat scroll 2 2 transparent;height:15px;width:15px;}\n"+
			".tableTd1 {width:40%;display:table-cell;padding:0px 10px 0px 0px;white-space:nowrap;}\n"+
			".tableTd2 {width:60%;display:table-cell;padding:0px 10px 0px 0px;white-space:nowrap;}\n"+
			".tableSeperater {display:table-cell;padding:2px 0px 2px 0px;max-height:2px;}\n"+
			".tableSepBorder {border-top:1px solid white;max-height:1px;width:100%;}\n"+

			".divChooseFeedTime {float:right;color:black;font-weight:bold;}\n"+
			".divChooseFeed {float:left;margin:2px;width:280px;}\n"+
			".divChooseFeed div{float:left;}\n"+
			".divChooseFeedIcon {border-radius:10px;border:2px solid grey;}\n"+
			".divChooseFeedAmount {float:left;border:1px solid black;}\n"+
			".divChooseFeedAmount div{float:left;height:17px;border-left:1px solid grey;}\n"+
			".divChooseFeedAmount div:hover{background-color:red!important;}\n"+
			".divChooseFeedButton{float:right;text-align:center;margin-left:1px;width:25px;border:1px solid black;}\n"+
			".divChooseFeedButton:hover{color:white;background-color:blue;}\n"+
			".divChooseItem {float:left;margin:5px;border-radius:10px;border:2px solid grey;}\n"+
			".divChooseItem:hover {border:2px solid red;}\n"+

			".divMillChooseItem {float:left;position:relative;margin:5px;width:52px;height:52px;border-radius:7px;}\n"+
			".divMillChooseItem:hover {background-color:red;}\n"+
			".divMillChooseItemNumber {position:absolute;right:0px;bottom:0px;margin:3px;color:white;font-weight:bold;font-size:16px;}\n"+

			".divQueueItemListTitle {float:left;display:block;font-weight:bold;padding:0px 2px 1px 2px;}\n"+
			".divQueueItemListTitle2 {float:right;display:block;font-weight:bold;padding:0px 2px 1px 2px;}\n"+
			".divQueueItemListHeader {margin-bottom:3px;display:inline-block;}\n"+
			".divQueueItemListSelect {float:right;position:relative;display:block;font-weight:bold;padding:0px 2px 1px 2px;margin-bottom:5px;}\n"+
			".divQueueItemListBox {position:relative;display:block;border:1px solid black;margin:5px;min-height:45px;}\n"+
			".divQueueItemListChooseItem {position:relative;display:inline-block;margin:3px 5px 13px 5px;border-radius:10px;border:2px solid grey;}\n"+
			".divQueueItemListNumber {position:absolute;right:0px;bottom:-16px;font-weight:bold;font-size:12px;}\n"+
			".divQueueItemListFooter {position:relative;display:block;height:40px;}\n"+
			".divItem {float:left;margin:2px;border-radius:10px;border:2px solid grey;}\n"+

			".queueTitle {display:inline-block;font-weight:bold;padding:0px 2px 1px 2px;}\n"+
			".queueTime {float:right;display:block;font-weight:bold;padding:0px 2px 1px 2px;}\n"+
			".queueBoxerButton {float:left;display:inline-block;left:0px;height:"+(row7+2)+"px;display:block;padding:0px 2px 0px 1px;border-right:1px solid black;}\n"+
			".queueBoxerQueueBox {float:left;display:inline-block;white-space:nowrap;left:27px;overflow:hidden;}\n"+
			".queueItemBox {text-align:center;display:inline-block;position:relative;width:"+(queueItemBoxWidth-1)+"px;border-right:1px solid black;height:100%;}\n"+
			".queueButtonScrollLeft {float:left;display:block;margin-left:29px;background:url("+strImages["arrowleft"]+") no-repeat scroll left top transparent;height:17px;width:25px;}\n"+
			".queueButtonScrollRight {float:right;display:block;margin-right:3px;background:url("+strImages["arrowright"]+") no-repeat scroll left top transparent;height:17px;width:25px;}\n"+
			".queueBoxerButton .queueButtonScrollLeft {float:none;position:relative;margin:2px 1px 0px 0px;}\n"+
			".queueBoxerButton .queueButtonScrollRight {float:none;position:relative;margin:2px 1px 0px 0px;}\n"+
			".queueButtonRepeat,.queueButtonShuffle, .queueButtonRotate, .queueButtonAdd, .queueButtonAddAll, .queueButtonCopy{display:block;width:22px;height:16px;border:1px solid #6C441E;border-radius:5px;margin:2px 1px 0px 0px;background:#FFFFFF}\n"+
			".queueButtonRepeat {background: #FFFFFF no-repeat 2px 0px;}\n"+
			".queueButtonShuffle {background: #FFFFFF no-repeat 2px 0px;}\n"+
			".queueButtonRotate {background: #FFFFFF no-repeat 3px 0px;}\n"+
			".queueButtonAdd {background: url("+strImages["plus"]+") #FFFFFF no-repeat 4px 1px;}\n"+
			".queueButtonCopy {background: url("+strImages["copy"]+") #FFFFFF no-repeat 3px 2px;}\n"+

			".queueItemProduct {left:"+(col2-2)+"px;top:"+(row1)+"px;position:relative;border:2px solid grey;border-radius:10px;margin-left:2px;}\n"+
			".windmillItemProduct {left:"+(col2-2)+"px;top:"+(row1)+"px;position:relative;border:2px solid grey;border-radius:10px;margin-left:2px;background-color:#CBAD85;width:26px;height:24px;padding:3px 2px 3px 2px;}\n"+
			".forestryItemProduct {left:"+(col2-2)+"px;top:"+(row1)+"px;position:relative;border:2px solid grey;border-radius:10px;margin-left:2px;background-color:#FFFFFF;width:25px;height:25px;padding:2.5px;}\n"+
			".queueItemInput1, .queueItemInput2, .queueItemInput3{position:absolute;height:11px;background-color:transparent;color:black;text-align:right;}\n"+
			".queueItemInput1 {top:"+row3+"px;}\n"+
			".queueItemInput2 {top:"+row4+"px;}\n"+
			".queueItemInput3 {top:"+row6+"px;}\n"+
			".queueItemInputWidth1 {width:"+(col4-col1-2)+"px;left:"+col1+"px;}\n"+
			".queueItemInputWidth2 {width:"+(col4-col2-2)+"px;left:"+col2+"px;}\n"+
			".queueButtonMin  {left:0px;background:url("+strImages["minus"]+") no-repeat 0px 0px #FFFFFF;} \n"+
			".queueButtonPlus {right:0px;background:url("+strImages["plus"]+") no-repeat 0px 0px #FFFFFF;} \n"+
			".queueItemButton {border:1px solid #6C441E;position:absolute;width:13px;height:13px;}\n"+
			".queueItemPlusButton {top:"+row1+"px;left:"+col1+"px;background:url("+strImages["plus"]+") no-repeat 0px 0px #FFFFFF;}\n"+
			".queueItemMinButton {top:"+row2+"px;left:"+col1+"px;background:url("+strImages["minus"]+") no-repeat 0px 0px #FFFFFF;}\n"+
			".queueItemUpButton {top:"+row5+"px;left:"+col1+"px;background:url("+strImages["singleArrowUp"]+") no-repeat 3px 2px #FFFFFF;}\n"+
			".queueItemDownButton {top:"+row5+"px;left:"+col3+"px;background:url("+strImages["singleArrowDown"]+") no-repeat 5px 2px #FFFFFF;}\n"+
			".queueItemBehaviourButton {top:"+row5+"px;left:"+col2+"px;background:no-repeat -1px -1px #FFFFFF;}\n"+
			".queueItemModeButton {top:"+row6+"px;left:"+col1+"px;background:no-repeat 0px 0px #FFFFFF;}\n"+

			".queueItemAddButton, .queueItemDeleteButton {display:block;position:absolute;width:15px;height:15px;}\n"+
			".queueItemAddButton {top:"+row3+"px;left:"+col1+"px;}\n"+
			".queueItemDeleteButton {top:"+row4+"px;left:"+col1+"px;}\n"+

			".queueItemText {text-align:center;vertical-align:middle;position:absolute;width:"+(col4-col2)+"px;color:black;font-family:Verdana,sans-serif}\n"+
			".queueItemTextInf {top:"+(row3-7)+"px;left:"+(col2)+"px;font-size:20px;font-weight:normal;}\n"+
			".queueItemTextStop {top:"+(row3)+"px;left:"+(col2-2)+"px;font-size:12px;font-weight:bold;}\n"+
			".queueItemTime {position:absolute;width:100%;overflow:hidden;text-align:center;border-top:1px solid black;margin:0px 1px;width:"+(queueItemBoxWidth-3)+"px;}\n"+
			".queueItemTime {top:"+(row7+2)+"px;}\n"+
			".hoverBgPurple:hover{background-color:#ff00ff!important;}\n"+
			".hoverBgWhite:hover{background-color:#ffffff!important;}\n"+

			".queueBoxSpacer {float:left;display:block;width:100%;padding:2px 0px 2px 0px;}\n"+
			".queueBox {z-index:5;position:absolute;text-align:center;display:none;background-color: #b8a789;padding: 0px 0px 3px 0px;position:absolute;border:2px solid black;border-radius:10px;color:black;}\n"+
			".queueBoxerGeneral {width:100%;overflow:hidden;overflow-y:auto;border-top:1px solid black;border-bottom:1px solid black}\n"+
			".queueBoxerGeneral {max-height:280px;}\n"+
			".queueBoxClose {float:right;top:3px;width:15px;height:15px;margin-right:1px;padding:2px 2px 2px 2px;}\n"+

			".citylinkitem, .citylinkitemactivate {color:#FFFFFF;float:left;font-size:12px;font-weight:bold;margin-left:5px;position:relative;text-align:center;width:40px;}\n"+
            ".citylinkitem {background: url('"+GFX+"citylink.png') no-repeat scroll left top transparent;height:34px;}\n"+
            ".citylinkitemactivate {background: url('"+GFX+"citylinkactivate.png') no-repeat scroll left top transparent;height:32px;}\n"+

			".fieldlinks {height:25px;right:0;position:absolute;top:0;}\n"+
			".fieldlinkitem0, .fieldlinkitem1, .fieldlinkitem2, .fieldlinkitemactivate0, .fieldlinkitemactivate1, .fieldlinkitemactivate2 {float:right;color:#FFFFFF;font-size:16px;font-weight:bold;height:29px;margin-left:5px;padding-top:2px;text-align:center;height:34px;width:54px;}\n"+
			".fieldlinkitemactivate0 {background:url("+strImages["zone_on"][0]+") no-repeat scroll left top transparent;}\n"+
			".fieldlinkitem0 {background:url("+strImages["zone_off"][0]+") no-repeat scroll 2px 0px transparent;}\n"+
			".fieldlinkitemactivate1 {background:url("+strImages["zone_on"][1]+") no-repeat scroll left top transparent;}\n"+
			".fieldlinkitem1 {background:url("+strImages["zone_off"][1]+") no-repeat scroll 2px 0px transparent;}\n"+
			".fieldlinkitemactivate2 {background:url("+strImages["zone_on"][2]+") no-repeat scroll left top transparent;}\n"+
			".fieldlinkitem2 {background:url("+strImages["zone_off"][2]+") no-repeat scroll 2px 0px transparent;}\n"+

			".lineZoneItem {border-radius:3px;margin:1px 0px 1px 1px;display:inline-block;height:15px;overflow:hidden;}\n"+
			".lineZoneItem:hover {background-color:red;}\n"+
			".lineZoneTypeB1 {background-color:#800000}\n"+
			".lineZoneTypeB2 {background-color:#808080}\n"+
			".lineZoneTypeB3 {background-color:#808000}\n"+
			".lineZoneTypeBmill {background-color:#DEDE16}\n"+
			".lineZoneTypeL1 {background-color:#993300}\n"+
			".lineZoneTypeL2 {background-color:#C0C0C0}\n"+
			".lineZoneTypeL3 {background-color:#B08000}\n"+
			".lineZoneTypeLmill {background-color:#C8C814}\n"+
			"#lineZonemill {height:28px;}\n"+
			".lineZone {display:block;white-space:nowrap;text-align:left;height:17px;width:100%;background-color:#333300;}\n"+

			".ernte13 {position:absolute;top:98px;left:145px;width:30px;height:30px;border:2px solid black;border-radius:10px;}\n"+
			".ernte14 {position:absolute;top:98px;left:210px;width:30px;height:30px;border:2px solid black;border-radius:10px;}\n"+
			".ernte15 {position:absolute;top:98px;left:415px;width:30px;height:30px;border:2px solid black;border-radius:10px;}\n"+
			".ernte16 {position:absolute;top:98px;left:480px;width:30px;height:30px;border:2px solid black;border-radius:10px;}\n"+
			".r1, .r2, .r3, .r4, .r5, .r6, .r7, .r8, .r9, .r10, .r11, .r12, .r13, .r14, .r15, .r16, .r17, .r18, .r19, .r20, .r21 {background:url("+strImages["powerups"]+") no-repeat scroll left top transparent;height: 30px;width: 30px;position:relative;}\n"+
			".r2, .r7, .r8, .r9, .r10, .r11, .r12, .r13, .r19, .r20 {background-position:0px -0.5px;}\n"+
			".r3, .r5, .r15, .r18 {background-position:-31px -0.5px;}\n"+
			".r1, .r4, .r6, .r14, .r16, .r17, .r21 {background-position:-61px -0.5px;}\n"+
			"#recoverBuildingCancel {background:url("+GFX+"button_cancel_off.png) no-repeat scroll left top transparent;border:0px;}\n"+
			"#recoverBuildingCancel:hover {background:url("+GFX+"button_cancel_on.png) no-repeat scroll left top transparent;}\n"+
			".recoverBuildingLocate1 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:0px;left:0px;}\n"+
			".recoverBuildingLocate2 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:0px;left:91px;}\n"+
			".recoverBuildingLocate3 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:0px;left:182px;}\n"+
			".recoverBuildingLocate4 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:129px;left:0px;}\n"+
			".recoverBuildingLocate5 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:129px;left:91px;}\n"+
			".recoverBuildingLocate6 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:129px;left:182px;}\n"+
			".recoverBuildingLocate7 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:294px;left:0px;}\n"+
			".recoverBuildingLocate8 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:294px;left:91px;}\n"+
			".recoverBuildingLocate9 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:294px;left:182px;}\n"+
			".recoverBuildingLocate10 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:423px;left:0px;}\n"+
			".recoverBuildingLocate11 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:423px;left:91px;}\n"+
			".recoverBuildingLocate12 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:423px;left:182px;}\n"+
			".recoverBuildingLocate13 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:293px;left:325px;}\n"+
			".recoverBuildingLocate14 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:293px;left:416px;}\n"+
			".recoverBuildingLocate15 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:293px;left:507px;}\n"+
			".recoverBuildingLocate16 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:422px;left:325px;}\n"+
			".recoverBuildingLocate17 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:422px;left:416px;}\n"+
			".recoverBuildingLocate18 {background:url("+GFX+"building0.gif) top left no-repeat;position:absolute;width:64px;height:64px;top:422px;left:507px;}\n"+
			""
		);
//const row1=2;const row2=21;const row3=38;const row4=55;const row5=72;const row6=89;const row7=108;
//const col1=2;const col2=21;const col3=40;const col4=55;

		createElement("div",{"id":"divAutomatIconContainer"},$("divGame").children[0]);
		drawButtons();

		err_trace="listener gameOpenField";
		document.addEventListener("gameOpenField",function(){ // field open
		try{
			var cand=(/parent.cache_me\((.*?),/).exec($("gardenarea").innerHTML);
			handled.zoneNr=parseInt(cand[1],10);
			handled.zoneNrF=getFarmZone(handled.zoneNr);
			if(valAutoPflanz&&(!$("autoplantbutton"))){ //autoFarmPlant button
				if((unsafeWindow.premium!=1)||(unsafeWindow.currentuserlevel<autoplantlevel)){
					var newdiv=createElement("div",{"id":"autoplantbutton","class":"autoplantbutton link","style":"display:block;position:absolute;top:100px;left:273px;"},$("gardenmaincontainer")); // z-index:4;
					newdiv.addEventListener("mouseover",function(event){
						// this.src=GFX+"autoplant_on.png";
						showToolTip(event,texte["automat"]["pflanzautomat"]);
					},false);
					// newdiv.addEventListener("mouseout",function(){this.src=GFX+"autoplant_off.png";},false);
					newdiv.addEventListener("click",function(){
						var newdiv=$("busydiv");
						if(newdiv){ removeElement(newdiv); }
						newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
						newdiv.addEventListener("mouseover",function(evt){
							showToolTip(evt,"Stop automat"); // TODO texte
						},false);
						newdiv.addEventListener("click",function(){
							autoZoneFinish();
							//removeElement(this);
						},false);
						unsafeWindow.jsTimeStamp=unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
						startBot();
						if(unsafeWindow.mode=="2"){
							autoFarmWater(1,false,false);
						}else{
							autoFarmPlant(1,false,false);
						}
						newdiv=null;
					},false);
					newdiv=null;
				}
			}
			if(DEVMODE){ for(var v=1;v<121;v++){ $("f"+v).setAttribute("title",v+"|kat"+unsafeWindow.garten_kategorie[v]+"|zt"+unsafeWindow.garten_zeit[v]+"|wa"+unsafeWindow.garten_wasser[v]+"|pr"+unsafeWindow.garten_prod[v]);}} //only for viewing
			cand=$("cropall").getElementsByTagName("img")[0];
			if(!cand.getAttribute("onclick")){
				cand.setAttribute("src",GFX+"leer.gif");
				cand.setAttribute("onclick","parent.selectMode(1,true,top.selected);");
				cand.addEventListener("click",function(){ autoFarmCrop(1); },false);
			}
			cand=null;

			showCropWeed();
		}catch(err){GM_log("ERROR eventListener:gameOpenField \n"+err);}
		},false);

		err_trace="listener gameOpenForestry";
		document.addEventListener("gameOpenForestry",function(){
		try{
			// Cropping automat
			if(unsafeWindow.premium!=1){
				//showInLogBubble("reset frestry croppping",10,"red");
				$("forestry_forest_button2").setAttribute("onclick","");
				$("forestry_forest_button2").addEventListener("click",function(){
					if(!busy){
						var newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute;top:2px;right:2px;width:130px;height:40px;border:3px inset black;background-color:yellow;z-index:50;display:block; padding:10px; font-weight:bold"},$("forestry_container"));
						newdiv.addEventListener("mouseover",function(evt){
							showToolTip(evt,"Stop automat"); // TODO texte
						},false);
						newdiv.addEventListener("click",function(){
							autoZoneFinish();
							//removeElement(this);
						},false);
						handled.zoneNrF="forest";
						startBot();
						autoForestryForest(autoRunId,3,1,false,false);
						newdiv=null;
					}
				},false);
			}
			// Planting automat
			var el1=createElement("img",{"id":"autoFarmForest","class":"link","style":"position:absolute;top:-25px;left:0;width:25px;height:25px;","src":GFX+"autoplant_off.png"},$("forestry_forest_buttons"));
			el1.addEventListener("mouseover",function(evt){
				this.src=GFX+"autoplant_on.png";
				showToolTip(evt,"Automatic planting"); // TODO texte
			},false);
			el1.addEventListener("mouseout",function(){this.src=GFX+"autoplant_off.png";},false);
			el1.addEventListener("click",function(){
				if(!busy){
					var newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute;top:2px;right:2px;width:130px;height:40px;border:3px inset black;background-color:yellow;z-index:50;display:block; padding:10px; font-weight:bold"},$("forestry_container"));
					newdiv.addEventListener("mouseover",function(evt){
						showToolTip(evt,"Stop automat"); // TODO texte
					},false);
					newdiv.addEventListener("click",function(){
						autoZoneFinish();
						//removeElement(this);
					},false);
					handled.zoneNrF="forest";
					startBot();
					autoForestryForest(autoRunId,5,1,false,false);
					newdiv=null;
				}
			},false);
			// Automat icons
			drawAutomatIcon("forest","forest",$("forestry_forest_buttons"),"margin-top:10px;");
			if(!unsafeData.zoneBlock["sawmill.1"]){
				drawAutomatIcon("sawmill.1","sawmill.1",$("forestry_building1"),"position:absolute;right:0pt;bottom:15px;");
			}
			if(!unsafeData.zoneBlock["carpentry"]){
				drawAutomatIcon("carpentry.1","carpentry.1",$("forestry_building2"),"position:absolute;right:0pt;bottom:15px;");
			}
			el1=null;
		}catch(err){GM_log("ERROR eventListener:gameOpenForestry \n"+err);}
		},false);
		function showCropWeed(){
		try{
			if(DEVMODE) showInLogBubble("showCropWeed",5,"#880808");
			var velds=new Array();
			var newspan=null;
			for(var v=1;v<=120;v++){
				if(!velds[unsafeWindow.garten_prod[v]]) velds[unsafeWindow.garten_prod[v]]=new Array();
				velds[unsafeWindow.garten_prod[v]].push(v);
			}
			for(var product in CROPCOST){
				if(!CROPCOST.hasOwnProperty(product)){ continue; }
				if(velds[product] && velds[product].length > 0){
					if(!$("cropWeed"+product)){
						newspan=createElement("div",{id:"cropWeed"+product,"class":"link ernte"+product+ " v"+product},$("gardenmaincontainer"));
						newspan.addEventListener("click",function(){
						try{
							if(this.getAttribute("run")=="false"){
								this.setAttribute("run",true);
								deactivateBot();
								var product=this.getAttribute("product");
								showInLogBubble("Autoclear: "+unsafeData.prodName[0][product],5,"#880808");
								this.style.border="2px solid red";
								autoCropUndefined(explode(this.getAttribute("velds"),"showCropWeed/click/velds"), product);
							}else{
								this.setAttribute("run",false);
								this.style.border="";
								showInLogBubble("Exiting Autoclear: stopping",5,"#880808");
							}
						}catch(err){GM_log("ERROR showCropWeed Icon Click \n"+err);}
						},false);
						newspan.addEventListener("mouseover",function(evt){
							var product=this.getAttribute("product");
							var amount=explode(this.getAttribute("velds"),"showCropWeed/mouseover/velds").length;
							showToolTip(evt,texte["automat"]["ernte"].replace("%PROD%",unsafeData.prodName[0][product]).replace("%TCOST%",moneyFormat(amount*CROPCOST[product])).replace("%AMOUNT%",amount).replace("%COST%",moneyFormat(CROPCOST[product])));
						},false);
					}else{
						newspan=$("cropWeed"+product);
					}
					newspan.style.border="";
					newspan.setAttribute("run",false);
					newspan.setAttribute("product",product);
					newspan.setAttribute("velds",implode(velds[product],"showCropWeed/velds"));
				}else if($("cropWeed"+product)){
					removeElement($("cropWeed"+product));
				}
			}
			newspan=null;prods=null;product=null;
			$("gardenclearer").style.display="none";
		}catch(err){GM_log("ERROR showCropWeed \n"+err);}
		}

		function autoCropUndefined(felds,product){
			if(DEVMODE_FUNCTION){GM_log("begin autoCropUndefined: handled.zoneNr="+handled.zoneNr+" felds="+implode(felds,"autoCropUndefined/felds")+" product="+product);}
			if($("bar").innerHTML.replace(" "+texte["waehrung"],"").replace(regDelimThou,"").replace(regDelimDeci,".") < CROPCOST[product]){
				showInLogBubble("Exiting Autoclear: not enough money",5,"#880808");
				showCropWeed();
			}else if($("cropWeed"+product).getAttribute("run")=="true" && felds.length > 0){
				showInLogBubble("Autoclear: "+ felds.length +"x "+unsafeData.prodName[0][product],5,"#880808");
				if(unsafeWindow.garten_prod[felds[0]]==product){
					//unsafeWindow.raeumeFeld(handled.zoneNr,felds[0]);
					$("commitboxgarden").addEventListener("DOMAttrModified",function(){
						if(this.style.display=="block"){
							//showInLogBubble(felds);
							document.addEventListener("gameFieldDemolish",function(felds,product){
								return function(){
									try{
									document.removeEventListener("gameFieldDemolish",arguments.callee,false);
									felds.shift();
									$("cropWeed"+product).setAttribute("velds",implode(felds,"autoCropUndefined/velds"));
									if($("fundpopup").style.display=="block"){
										click($("fundpopup").firstElementChild);
										var cell;
										showInLogBubble("Found Money: "+((cell=$("fundpopupbetrag"))?cell.innerHTML:""),10,"green");
										cell=null;
									}
									adjustToolTip($("cropWeed"+product));
									window.setTimeout(autoCropUndefined,getRandom(tmin2*2,tmax2*2),felds,product);

								}catch(err){GM_log("ERROR autoCropUndefined/gameFieldDemolish felds:"+felds+" product:"+product+"\n"+err);}
								}
							}(felds,product),false);
							click($("commitboxgarden").getElementsByClassName("link")[0]);
							this.removeEventListener("DOMAttrModified",arguments.callee,false);
						}
					},false);
					click($("f"+felds[0]));
				}
			}else if(felds.length<=0){
				felds=null;product=null;
				showInLogBubble("Exiting Autoclear: Done",5,"#880808");
				showCropWeed();
			}else{
				showCropWeed();
			}
		}

		err_trace="listener gameOpenStable";
		document.addEventListener("gameOpenStable",function(){ // stable open
		try{
			if(valAutoFutter){ //autoFarmStable button
				var zoneNrF=getFarmZone(unsafeWindow.currentposition);
				var v=getZoneTyp(zoneNrF);
				for(var w=0;w<BUILDING2FEED[v].length;w++){
					if($("articleimg"+BUILDING2FEED[v][w])){
						if(!$("autoFarmStable"+v+"t"+BUILDING2FEED[v][w])){
							var newimg=createElement("img",{id:"autoFarmStable"+v+"t"+BUILDING2FEED[v][w],"class":"link",style:"position:absolute;top:50px;width: 25px; height: 25px;z-index:11;",src:GFX+"autoplant_off.png"},$("articleimg"+BUILDING2FEED[v][w]).parentNode.parentNode);
							newimg.addEventListener("mouseover",function(evt){
								this.src=GFX+"autoplant_on.png";
								showToolTip(evt,"Automatic feeding"); // TODO texte
							},false);
							newimg.addEventListener("mouseout",function(){this.src=GFX+"autoplant_off.png";},false);
							newimg.addEventListener("click",function(){
								var newdiv=createElement("div",{"id":"busydiv","class":"link","style":"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
								newdiv.addEventListener("mouseover",function(evt){
									showToolTip(evt,"Stop automat"); // TODO texte
								},false);
								newdiv.addEventListener("click",function(){
									autoZoneFinish();
									//removeElement(this);
								},false);
								this.style.display="none";
								var help=/(\d+)t(\d+)/.exec(this.id);
								startBot();
								autoFarmStable(help[2],0,240); //could be calculated exactly
								newdiv=null;
							},false);
							newimg=null;
						}
					}
				}
			}
		}catch(err){GM_log("ERROR eventListener:gameOpenStable \n"+err);}
		},false);

		err_trace="listener gameOpenFactoryOil";
		document.addEventListener("gameOpenFactoryOil",function(){ // oil-factory open
		try{
			var zoneNrF=getFarmZone(unsafeWindow.currentposition);
			var zoneNrS;
			var zoneTypeCurr=getZoneTyp(zoneNrF);
			for(var slot=1;slot<=3;slot++){
				zoneNrS=zoneNrF+"."+slot;
				if(!unsafeData.zoneBlock[zoneNrS]){
					drawAutomatIcon(zoneNrS,zoneNrS,$("oil_slot"+slot),"left:-10px;");
				}
			}
		}catch(err){GM_log("ERROR eventListener:gameOpenFactoryOil \n"+err);}
		},false);
		
		function doZone(zoneNr){
			// GM_log("doZone zoneNr=" + zoneNr);
			var zoneNrF = getFarmZone(zoneNr);
			var icon=$("divAutomatIcon_"+zoneNrF);
			if(unsafeData.zoneBlock[zoneNrF]||(getBuildingTyp(zoneNrF)==0)){
				if(icon){ removeElement(icon); }
			}else{
				if(!icon){ 
					drawAutomatIcon(zoneNrF,zoneNrF+(isMultiSlotZone(zoneNrF)?".1":""),$("zone"+zoneNr),"");
				}
			}
		}
		document.addEventListener("nodeModifiedZone1",function(){ doZone(1); },false);
		document.addEventListener("nodeModifiedZone2",function(){ doZone(2); },false);
		document.addEventListener("nodeModifiedZone3",function(){ doZone(3); },false);
		document.addEventListener("nodeModifiedZone4",function(){ doZone(4); },false);
		document.addEventListener("nodeModifiedZone5",function(){ doZone(5); },false);
		document.addEventListener("nodeModifiedZone6",function(){ doZone(6); },false);

		err_trace="handleGlobalIcon";
		function handleGlobalIcon(name){
			try{
			// GM_log("Begin handleGlobalIcon name="+name);
			var icon=$("divAutomatIcon_global_"+name);
			if(valUseBot[getBuildingTyp(name)]){
				if(!icon){ drawAutomatIcon("global_"+name,name,$("divAutomatIconContainer"),""); }
			}else{
				if(icon){ removeElement(icon); }
			}
			icon=null;
			}catch(err){ GM_log("ERROR handleGlobalIcon name="+name+"\n"+err); }
		}
		handleGlobalIcon("windmill");
		// handleGlobalIcon("forest");
		// handleGlobalIcon("sawmill");
		// handleGlobalIcon("carpentry");
		err_trace="listener gameUpdateFarm";
		document.addEventListener("gameUpdateFarm",function(){
			handleGlobalIcon("windmill");
			// handleGlobalIcon("forestry");
			// handleGlobalIcon("sawmill1");
			// handleGlobalIcon("carpentry");
		},false);
		err_trace="listener nodeModifiedZoneWindmill";
		document.addEventListener("nodeModifiedZoneWindmill",function(){handleGlobalIcon("windmill");},false);
		// document.addEventListener("nodeModifiedZoneForestry",function(){handleGlobalIcon("forest");},false);
		// document.addEventListener("nodeModifiedZoneSawmill1",function(){handleGlobalIcon("sawmill");},false);
		// document.addEventListener("nodeModifiedZoneSawmill2",function(){handleGlobalIcon("sawmill");},false);
		// document.addEventListener("nodeModifiedZoneSawmill3",function(){handleGlobalIcon("sawmill");},false);
		// document.addEventListener("nodeModifiedZoneCarpentry",function(){handleGlobalIcon("carpentry");},false);

		err_trace="devMode";
		function viewDev(mode){
			// GM_log("viewDev: " + mode);
			if(mode!=""){
				viewDevMode=explode(GM_getValue("viewDevMode",implode(["",""],"viewDev/viewDevMode"),"viewDev/viewDevMode",["",""]));
				viewDevMode=viewDevMode.slice(0,1);
				viewDevMode.unshift(mode);
				GM_setValue2("viewDevMode",implode(viewDevMode,"viewDev/viewDevMode"));
			}else{
				viewDevMode=["",""];
				GM_setValue2("viewDevMode",implode(["",""],"viewDev/viewDevMode"));

				try{
					window.clearInterval(autoDevRefresh);
					autoDevRefresh=null;
				}catch(err){
					autoDevRefresh=null;
				}
			}
			showDevMode();
		}
		function showDevMode(){
			for(var i=0;i<viewDevMode.length;i++){
				// GM_log("showDevMode: " + viewDevMode[i]);
				switch (viewDevMode[i]){
					case "punkte":
					case "zoneToList":
					case "zoneSettings":
					case "zoneList":
					case "autoMillStorage":
					case "QUESTS":
					case "now":
						$("divPrintArray"+i).style.display="block";
						$("divPrintArray"+i).innerHTML=viewDevMode[i]+"<br/>" + print_r(eval(viewDevMode[i]));
						break;
					case "":
						$("divPrintArray"+i).style.display="none";
						$("divPrintArray"+i).innerHTML="";
						break;
					default:
						$("divPrintArray"+i).style.display="block";
						$("divPrintArray"+i).innerHTML=viewDevMode[i]+"<br/>" + print_r(eval("unsafeWindow."+viewDevMode[i]));
						// GM_log("unsafeWindow."+viewDevMode[i]+"="+implode(eval("unsafeWindow."+viewDevMode[i])));
						break;
				}
			}
			if(!autoDevRefresh){
				autoDevRefresh=window.setInterval(function (){
					showDevMode();
				},1000);
			}
		}
		if(DEVMODE){
			newdiv=createElement("div",{id:"divPrintArray0",style:"height:100%;padding:4px;margin-bottom:30px;color:white;background-color:black;top:10px;float:left;border:1px solid red;"});
			ALL.insertBefore(newdiv,$("uptoolbar"));
			newdiv=createElement("div",{id:"divPrintArray1",style:"height:100%;padding:4px;margin-bottom:30px;color:white;background-color:black;top:10px;float:right;border:1px solid red;"});
			ALL.insertBefore(newdiv,$("uptoolbar"));

			GM_registerMenuCommand("View none", function(){viewDev("");});
			//GM_registerMenuCommand("Refresh", function(){devRefresh("manual");});
			//GM_registerMenuCommand("Auto Refresh", function(){devRefresh("auto");});
			MenuCommand.sort();
			for(i in MenuCommand){
				if(!MenuCommand.hasOwnProperty(i)){ continue; }
				GM_registerMenuCommand("View "+MenuCommand[i], function(i){return function(){viewDev(MenuCommand[i]);};}(i));
			}

			document.getElementsByTagName("body")[0].style.overflow="auto";
			var autoDevRefresh=null;
			var viewDevMode=explode(GM_getValue("viewDevMode",implode(["",""],"do_main/viewDevMode")),"do_main/viewDevMode",["",""]);
			showDevMode();
		}

		document.addEventListener("gameReallocateBuilding",function(){
			if(DEVMODE_FUNCTION){GM_log("Begin gameReallocateBuilding");}
			try{
				var building1=unsafeData.reallocateBuildingSet[0];
				var building2=unsafeData.reallocateBuildingSet[1];
				var zoneL1 = getZoneListId(building1);
				var zoneL2 = getZoneListId(building2);
				if(DEVMODE){GM_log("Automat gameReallocateBuilding: " + building1 + " : " + building2);}
				var help;

				help=zoneList[zoneL1].clone();
				zoneList[zoneL1]=zoneList[zoneL2].clone();
				zoneList[zoneL2]=help;
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneList",implode(zoneList,"gameReallocateBuilding/zoneList"));

				help=zoneSettings[zoneL1].clone();
				zoneSettings[zoneL1]=zoneSettings[zoneL2].clone();
				zoneSettings[zoneL2]=help;
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneSettings",implode(zoneSettings,"gameReallocateBuilding/zoneSettings"));

				help=zoneToList[building1].clone();
				zoneToList[building1]=zoneToList[building2].clone();
				zoneToList[building2]=help;
				GM_setValueCache(LNG+"_"+SERVER+"_"+USERNAME+"_zoneToList",implode(zoneToList,"gameReallocateBuilding/zoneToList"));

				// if(isVisibleZone(building1)) doZone(getGarden(building1));
				// if(isVisibleZone(building2)) doZone(getGarden(building2));
				// GM_log("End Automat gameReallocateBuilding: " + building1 + " : " + building2);
			}catch(err){GM_log("ERROR gameReallocateBuilding \n"+err);}
			if(DEVMODE_FUNCTION){GM_log("End gameReallocateBuilding");}
		},false);

		document.addEventListener("gameUpdateRack",function(){
			// reCalculateWindmill();
		},false);

		// get dealer items
		document.addEventListener("gameUpdateFormuladealerRack",function(){ // Bought a recipe
		try{
			var help=new Object();
			for(var v=0; v<$("formuladealerrackinner").childNodes.length;v++){
				if($("formuladealerrackinner").childNodes[v].childNodes.length > 0){
					rId=parseInt($("formuladealerrackinner").childNodes[v].childNodes[0].getAttribute("class").replace("fmm",""),10);
					rNum=parseInt($("formuladealerrackinner").childNodes[v].childNodes[1].innerHTML,10);
					if(!!rId && !!rNum) help[rId]=[rNum,0,NEVER];
				}
			}
			autoMillStorage=help.clone();
			help=null;
			reFillQueueBox("windmill","windmill",0);
		}catch(err){GM_log("ERROR eventListener:gameUpdateFormuladealerRack \n"+err);}
		},false);

		document.addEventListener("gameOpenWindmill",function(){ // Windmill
		try{
			var help=new Object();
			for(var v=0; v<$("windmillformula").childNodes.length;v++){
				if($("windmillformula").childNodes[v].childNodes.length > 0){
					rId=parseInt($("windmillformula").childNodes[v].childNodes[0].getAttribute("class").replace("fm",""),10);
					rNum=parseInt($("windmillformula").childNodes[v].childNodes[1].innerHTML,10);
					if(!!rId && !!rNum) help[rId]=[rNum,0,NEVER];
				}
			}
			autoMillStorage=help.clone();
			help=null;
			reFillQueueBox("windmill","windmill",0);
		}catch(err){GM_log("ERROR eventListener:gameOpenWindmill \n"+err);}
		},false);

		//Bot Start-Stop-Button
		err_trace="Start-Stop-Button";
		valBot=GM_getValue(LNG+"_"+SERVER+"_valBot",false);
		if(valBot==undefined){valBot=false;GM_setValue2(LNG+"_"+SERVER+"_valBot", valBot);}
		inp=createElement("button",{"id":"inputvalBot","type":"button","class":"link","style":"margin-left:3px;"},$("divSettings"));
		inp.addEventListener("click",function(){
			if(valBot){
				deactivateBot();
			}else{
				activateBot();
			}
			GM_setValue2(LNG+"_"+SERVER+"_valBot", valBot);
		},false);
		newdiv=createElement("div",{"id":"divBotInfo","class":"link blackbox","style":"position:fixed;bottom:0px;left:0px;z-index:999;"},ALL);
		newdiv.addEventListener("mouseover",function(evt){
			showToolTip(evt,"Click to break Automat business");
		},false);
		newdiv.addEventListener("click",function(){
			top.unsafeData.autoAction=null;
			autoRunId++;
			busy=false;
		},false);
		if(valBot){
			activateBot();
		}else{
			deactivateBot();
		}

		newdiv=createElement("div",{"id":"divCloseWindowLayer","class":"link ","style":"opacity:0.7;position:absolute;top:20px;z-index:101;display:none;background:black;height:84px;left:210px;width:770px;"},$("headercontainer"));
		newdiv=createElement("div",{"id":"divCloseWindow","class":"link blackbox","style":"width:250px;display:none;text-align:center;padding:10px;border-radius:5px 5px 5px 5px;position:relative;z-index:101;top:30px;left:470px;"},$("headercontainer"));
		newdiv.addEventListener("mouseover",function(evt){
			showToolTip(evt,"Restart closing timer");
		},false);
		newdiv.addEventListener("click",function(){
			stopCloseWindowTimer();
		},false);

		newdiv=createElement("div",{"id":"recoverContainerLayer","style":"position:absolute;width:100%;height:100%;display:none;z-index:150;background:no-repeat black;opacity:0.7;"},$("garten_komplett"));
		var newcontainer=createElement("div",{"id":"recoverContainer","style":"position:absolute;width:640px;height:540px;top:35px;left:50px;display:none;z-index:151;border:2px solid #00000;background:url("+GFX+"reallocatebuildingback.jpg) no-repeat scroll left top transparent;"},$("garten_komplett"));
		newdiv=createElement("div",{"id":"recoverBuildingContainerHeader","style":"position:absolute;top:5px; right:5px;"},newcontainer);
		newdiv=createElement("div",{"id":"recoverBuildingCancel","class":"link","style":"width:36px;height:36px;"},newdiv);
		newdiv.addEventListener("click",function(){
			$("recoverContainer").style.display="none";
			$("recoverContainerLayer").style.display="none";
			$("recoverBuildingContainerContent").setAtribute("recoverData","");
		},false);
		createElement("div",{"id":"recoverBuildingContainerContent","style":"position:absolute;top:20px;left:27px;"},newcontainer);
		newdiv=createElement("div",{"id":"recoverBuildingInfoBubble","style":"position:absolute; right:135px; top:45px; width:130px;"},newcontainer);
		createElement("div",{"id":"recoverBuildingBubbleHeader","class":"headline"},newdiv);
		createElement("div",{"id":"recoverBuildingBubbleContent"},newdiv);
		createElement("div",{"id":"recoverBuildingContainerZoneing","class":"blackbox", "style":"border-radius:0px 0px 5px 5px;position:absolute;top:520px;left:0px;width:630px;height:65px;overflow:auto;overflow-y:hidden;"},newcontainer);
		newcontainer=null;

// GM_registerMenuCommand("DEV setNextQueueItem",function(){ GM_log("setNextQueueItem :" +implode(setNextQueueItem("5.1"))); });
/*
		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"botArbiterCheck");
		link.addEventListener("click",function(){botArbiterCheck();},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"autoForestryCrop");
		link.addEventListener("click",function(){autoForestryCrop(1);},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"test 3");
		link.addEventListener("click",function(){GM_log("test :" +reSortQueue(4,false));},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),texte["optionen"]);
		link.addEventListener("click",function(){
			document.addEventListener("nodeInsertedInfoPanelLAutomat",function(){
				click($("infoPanelLAutomat"));
				document.removeEventListener("nodeInsertedInfoPanelLAutomat",arguments.callee,false);
			},false);
			click($("berateroptionen"));
		},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),texte["automat"]["titleQueue"]);
		link.addEventListener("click",function(){
			document.addEventListener("nodeInsertedInfoPanelLAutomat",function(){
				click($("infoPanelZoneList"));
				document.removeEventListener("nodeInsertedInfoPanelLAutomat",arguments.callee,false);
			},false);
			click($("berateroptionen"));
		},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"test");
		link.addEventListener("click",function(){
			click($("multiframe").contentDocument.getElementsByClassName("link2")[0].firstElementChild);
		},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"Q active");
		link.addEventListener("click",function(){raiseEvent("gameQuestNewAvailable");},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"Q solve");
		link.addEventListener("click",function(){raiseEvent("gameQuestSolvable");},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"PowerUp");
		link.addEventListener("click",function(){botArbiterAdd("activatePowerUp");},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"DailyLot");
		link.addEventListener("click",function(){raiseEvent("gameLotteryDailyLotAvailable");},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"Windmill");
		link.addEventListener("click",function(){raiseEvent("gameWindmillReady");},false);

		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"Zone Ready");
		link.addEventListener("click",function(){raiseEvent("gameZoneReady");},false);



		link=createElement("button",{type:"button","class":"link2",style:"margin-left:3px;border:2px solid red;"},$("divSettings"),"recover");
		link.addEventListener("click",function(){
			var rcData=new Object();
			rcData["scriptversion"]=VERSION;
			rcData["neededVersionBerater"]=neededVersionBerater;
			rcData["neededVersionFunctionFile"]=neededVersionFunctionFile;
			rcData["zoneSettings"]=zoneSettings.clone();
			rcData["zoneList"]=zoneList.clone();
			rcData["zoneToList"]=zoneToList.clone();
			rcData["autoMillStorage"]=autoMillStorage.clone();
			rcData["zoneType"]=unsafeData.zoneTyp.clone();
			rcData["emergencyPlants"]=emergencyPlants.clone();
			rcData["valBot"]=valBot;
			rcData["valAutoPflanz"]=valAutoPflanz;
			rcData["valAutoFutter"]=valAutoFutter;
			rcData["valSeedWaitForCrop"]=valSeedWaitForCrop;
			rcData["valDisableCropFields"]=valDisableCropFields;
			rcData["valWater"]=valWater;
			rcData["valUseQueueList"]=valUseQueueList;
			rcData["valShowQueueTime"]=valShowQueueTime;
			rcData["valPowerUpActivate"]=valPowerUpActivate;
			rcData["valLotteryActivate"]=valLotteryActivate;
			rcData["valLotteryDailyLot"]=valLotteryDailyLot;
			rcData["valQuestActivate"]=valQuestActivate;
			rcData["valQuestActivateUntilNr"]=valQuestActivateUntilNr;
			rcData["valQuestSolving"]=valQuestSolving;
			rcData["valQuestSolvingUntilNr"]=valQuestSolvingUntilNr;
			rcData["valLodgeQuestSolving"]=valLodgeQuestSolving;
			rcData["valFarmiReject"]=valFarmiReject;
			rcData["valFarmiRejectUntilNr"]=valFarmiRejectUntilNr;
			rcData["valFarmiAccept"]=valFarmiAccept;
			rcData["valFarmiAcceptAboveNr"]=valFarmiAcceptAboveNr;
			rcData["valFarmiAcceptBelowMinValue"]=valFarmiAcceptBelowMinValue;
			rcData["valFarmiRemoveMissing"]=valFarmiRemoveMissing;
			rcData["valFarmiRemoveMissingAboveNr"]=valFarmiRemoveMissingAboveNr;
			rcData["tmin"]=tmin;
			rcData["tmax"]=tmax;
			rcData["tmin2"]=tmin2;
			rcData["tmax2"]=tmax2
			rcData["valUpdate"]=GM_getValue("valUpdate",true);
			rcData["devMode"]=DEVMODE;
			recoverPreview(rcData);
		},false);
*/

	} catch(err){GM_log("ERROR General test settings ("+err_trace+")\n"+err);}
	document.addEventListener("gameSessionEnds",function(){
		botArbiterAdd("sessionEnds");
	},false);

	document.addEventListener("gameLotteryDailyLotAvailable",function(){
		if(valUseBot["lottery"]&&valLotteryActivate){
			botArbiterAdd("lottery");
		}
	},false);

	document.addEventListener("gameOtherAccReady",function(){
		botArbiterAdd("otherAccReady");
	},false);

	document.addEventListener("gameFarmiNew",function(){
		if(valUseBot["farmi"]){ checkFarmi(1); }
	},false);
	document.addEventListener("gameUpdateFarm",function(){
		if(valUseBot["farmi"]){ checkFarmi(1); }
	},false);
	
}

function do_hilfe(){
	GM_addStyle(
		".queueButtonAddAll {display:inline-block;width:22px;height:16px;border:1px solid #6C441E;border-radius:5px;margin:0px 1px 0px 1px;}\n"+
		".queueButtonAddAll {background: url("+strImages["reload_all"]+") #FFFFFF no-repeat 1px -1px;width:28px;}\n"+
		".kp"+PRODSTOP+" {background:url("+strImages["PRODSTOP_15"]+") no-repeat scroll 0 0 transparent;height:15px;width:15px;!IMPORTANT}"
	);

	var newdiv=createElement("div",{},$("helpmenuLinks"));
	var newa=createElement("a",{"class":"list_header","href":"#"},newdiv,texte["automat"]["automat"]);
	newa.addEventListener("click",function(){
		var cell=$("helpbody");
		cell.innerHTML="";
		createElement("div",{"class":"tnormal"},cell,"<b>"+texte["automat"]["automat"]+"</b><br>");
		for(var w in texte["automat"]["hilfe"]){
			if(!texte["automat"]["hilfe"].hasOwnProperty(w)){ continue; }
			if(typeof texte["automat"]["hilfe"][w]=="function"){ continue; }
			if(texte["automat"]["hilfe"][w][0]) createElement("div",{"class":"tmenu"},cell,"<b>"+texte["automat"]["hilfe"][w][0]+"</b>");
			createElement("p",{"class":"tmenu"},cell,texte["automat"]["hilfe"][w][1]);
		}
	},false);
	newdiv=null;newa=null;
}

function manageVariables(){
	// 1: historic data - not reproducible!
	// 2: collectable data
	// 3: options, settings
	// 4: temporary data = 2?
	// 5: useless, old data
	const variableInfo = { "GLOBAL":{"changedata":["Data version",1],
									 "devmode":["Developer mode",3],
									 "devmode_function":["Developer mode",3],
									 "updateCheck":["Update information",2],
									 "valUpdate":["Check for update",3],
									 "serverversion":["",5],
									 "tmin":["",5],
									 "tmin2":["",5],
									 "tmax":["",5],
									 "tmax2":["",5],
									 "valLastUpdate":["",5]},
						   "LNG":{"changedata":["Data version",1],
						          "tmin":["Bot waiting time",3],
								  "tmin2":["Bot waiting time",3],
								  "tmax":["Bot waiting time",3],
								  "tmax2":["Bot waiting time",3]},
						   "SERVER":{"changedata":["Data version",1],
						             "valBot":["Bot is active",3]},
						   "USER":{"changedata":["Data version",1],
						           "autoMillStorage":["Mill data",3],
								   "emergencyPlants":["Emergency plants",3],
								   "lotteryCollectForPrize":["Lottery collection data",3],
								   "raisedEvents":["Stack of raised event",4],
								   "valAutoFutter":["Stables automated",3],
								   "valAutoPflanz":["Fields automated",3],
								   "valWater":["Fields watered",3],
								   "valDevRefresh":["Developer",4],
								   "valDisableCropFields":["Option",3],
								   "valFarmiAccept":["Option",3],
								   "valFarmiAcceptAboveNr":["Option",3],
								   "valFarmiAcceptBelowMinValue":["Option",3],
								   "valFarmiReject":["Option",3],
								   "valFarmiRejectUntilNr":["Option",3],
								   "valFarmiRemoveMissing":["Option",3],
								   "valFarmiRemoveMissingAboveNr":["Option",3],
								   "valLotteryActivate":["Activate lottery",3],
								   "valLotteryDailyLot":["Option",3],
								   "valPowerUpActivate":["Activate power-up",3],
								   "valQuestActivate":["Option",3],
								   "valQuestActivateUntilNr":["Option",3],
								   "valQuestSolving":["Option",3],
								   "valQuestSolvingUntilNr":["Option",3],
								   "valSeedWaitForCrop":["Wait cropping",3],
								   "valShowQueueTime":["Show ready times",3],
								   "valUseBot":["Use bot",3],
								   "valUseMillBot":["Use mill bot",5],
								   "valUseMillList":["Use mill list",5],
								   "valUseQueueList":["Use queue",3],
								   "viewDevMode":["Option",3],
								   "viewOverViewFarms":["Selection Automat-overview",3],
								   "zoneList":["Zone automat settings",3],
								   "zoneSettings":["Zone modes",3],
								   "zoneToList":["Zone pairing",3],
						           "autoMill":["",5],
								   "autoPflanze":["",5],
								   "valMillBoxInfo":["",5],
								   "valMillPowerUpActivate":["",5],
								   "valQueBoxInfo":["",5],
								   "valTiereFutter":["",5],
								   "valTiereSatt":["",5],
								   "valTimeLinePeriode":["",5],
								   "valTimeLineZoom":["",5]}
						};
    
	function buildManageVariables(){
		var container=$("divManageVariablesInner");
		container.innerHTML="";
		var containerPart = createElement("div",{"style":"height:10%;"},container);
		createElement("div",{"style":"font-weight:bold;"},containerPart,"Variable Management "+texte["automat"]["automat"]);

		var newinput=createElement("select",{"class":"link"},containerPart);
		createElement("option",{"value":"GLOBAL"},newinput,"GLOBAL");
		createElement("option",{"value":"ALL"},newinput,"ALL");
		createElement("option",{"value":"UNKNOWN"},newinput,"UNKNOWN");
		createElement("option",{"value":"USELESS"},newinput,"USELESS");
		newinput.addEventListener("click",function(){
			buildExportTable(this.value);
		},false);

		var variables = {};
		variables["GLOBAL"] = [];
		var help = GM_listValues();
		help.sort();
		var help2;					
		for(var v=0;v<help.length;v++){
			help2 = (/^([a-z]{2}_\d+_.+?_)(.*)$/).exec(help[v]); // LNG_SERVER_USER_...
			if(!help2){ help2 = (/^([a-z]{2}_\d+_)(.*)$/).exec(help[v]); // LNG_SERVER_...
				if(!help2){ help2 = (/^([a-z]{2}_)(.*)$/).exec(help[v]); // LNG_...
			}	}
			
			if(help2){
				if(!variables[help2[1]]){ 
					variables[help2[1]] = []; 
					createElement("option",{"value":help2[1]},newinput,help2[1]);
				}
				variables[help2[1]].push(help2[2]);
			} else {
				variables["GLOBAL"].push(help[v]); // GLOBAL
			}
		}

		newinput=createElement("button",{"class":"link","style":"margin-left:20px;"},containerPart,"Select all");
		newinput.addEventListener("click",function(){
			var container=$("divManageVariablesInner");
			var rows = container.children[1].getElementsByTagName("tr");
			var checkedNew;
			if(this.innerHTML=="Select all"){
				checkedNew = true;
				this.innerHTML="Unselect all";
			} else {
				checkedNew = false;
				this.innerHTML="Select all";
			}
			for (var v=0;v<rows.length;v++){
				rows[v].children[0].children[0].checked = checkedNew;
			}
			
		},false);

		newinput=createElement("button",{"class":"link","style":"margin-left:20px;"},containerPart,"Delete");
		newinput.addEventListener("click",function(){
			var container=$("divManageVariablesInner");
			var rows = container.children[1].getElementsByTagName("tr");
			var variables = [];
			var acc, varname;
			var str = "Delete following variables:";
			for (var v=0;v<rows.length;v++){
				if(rows[v].children[0].children[0].checked){
					acc = rows[v].children[1].innerHTML;
					varname = rows[v].children[2].innerHTML;
					variables.push(acc+varname);
					if(variables.length<11){ str += "\n"+acc+varname; }
				}
			}
			if(variables.length>0){
				if(variables.length>10){ str += "\n..." }
				if(confirm(str)){
					for (var v=0;v<variables.length;v++){
						GM_deleteValue(variables[v]);
					}
					buildManageVariables();
				}
			} else {
				alert("Nothing selected");
			}
		},false);
	
		newinput=createElement("button",{"class":"link","style":"margin-left:20px;"},containerPart,"Create storage string");
		newinput.addEventListener("click",function(){
			var container=$("divManageVariablesInner");
			var rows = container.children[1].getElementsByTagName("tr");
			var variables = [];
			var acc, varname;
			for (var v=0;v<rows.length;v++){
				if(rows[v].children[0].children[0].checked){
					acc = rows[v].children[1].innerHTML;
					varname = rows[v].children[2].innerHTML;
					variables.push([acc+varname,GM_getValue(acc+varname)]);
				}
			}
			if(variables.length>0){
				prompt("Copy this string to a text-file", implode(variables));
			} else {
				alert("Nothing selected");
			}
		},false);

		newinput=createElement("button",{"class":"link","style":"margin-left:20px;"},containerPart,"Import storage string");
		newinput.addEventListener("click",function(){
			var data = prompt("Enter storage string");
			if(data){
				try{
					data = explode(data,"buildImportTable/storageString");
					buildImportTable(data);
				}catch(err){ alert("Sorry. Can't read the entered string.\n"+err); }
			}
		},false);
		
		newinput=createElement("button",{"class":"link","style":"margin-left:20px;"},containerPart,"Import OLD storage string");
		newinput.addEventListener("click",function(){
			var data = prompt("Enter storage string");
			var user = prompt("Enter prefix like 'de_7_Johnny_' if needed");
			if(data){
				try{
					data=data.split("::");
					for(var v=0;v<data.length;v++){
						data[v] = [,data[v].split(":")];
						data[v][0] = user+data[v][1].splice(0,1)[0];
						var impType=data[v][1].splice(0,1)[0];
						data[v][1] = data[v][1].join(":");
						if(impType == "n"){ data[v][1] = parseFloat(data[v][1],10); }
						else if(impType == "b"){ data[v][1] = (data[v][1]=="true"); }
					}
					buildImportTable(data);
				}catch(err){ alert("Sorry. Can't read the entered string.\n"+err); }
			}
		},false);
		
		containerPart = createElement("div",{"style":"height:90%;overflow-y:scroll;"},container);
		function buildExportTable(filter){
			var container=$("divManageVariablesInner");
			container.children[1].innerHTML = "";
			var newtable=createElement("table",{"border":"1","class":"hoverRowBgCc9","style":"width:100%"},container.children[1]);
			var newtr,newtd;
			var help=GM_listValues();
			var help2;
			for(var v=0;v<help.length;v++){
				help2 = (/^([a-z]{2}_\d+_.+?_)(.*)$/).exec(help[v]); // LNG_SERVER_USER_...
				if(help2){ 
					help[v] = [help2[1],help2[2],"USER"];
				} else {
					help2 = (/^([a-z]{2}_\d+_)(.*)$/).exec(help[v]); // LNG_SERVER_...
					if(help2){
						help[v] = [help2[1],help2[2],"SERVER"];
					} else {
						help2 = (/^([a-z]{2}_)(.*)$/).exec(help[v]); // LNG_...
						if(help2){
							help[v] = [help2[1],help2[2],"LNG"];
						} else {
							help[v] = ["",help[v],"GLOBAL"];
						}
					}	
				}
			}
			help.sort(function(a,b){
				if(a[0]==b[0]){ return ((a[1]>b[1])-(a[1]<b[1])); }
				          else{ return ((a[0]>b[0])-(a[0]<b[0])); }
			});

			for(var v=0;v<help.length;v++){
				switch(filter){
				case "ALL": break;
				case "GLOBAL":if(help[v][0]!=""){ continue; } break;
				case "UNKNOWN":if(variableInfo[help[v][2]][help[v][1]]){ continue; } break;
				case "USELESS":if((!variableInfo[help[v][2]][help[v][1]])||(variableInfo[help[v][2]][help[v][1]][1]!=5)){ continue; } break;
				default: if(help[v][0]!=filter){ continue; }
				}
				
				help[v][4] = GM_getValue(help[v][0]+help[v][1]);
				help[v][3] = "s";
				// if(help[v][4]==""){ help[v][4]=" "; }
				if(typeof help[v][4]=="number"){ help[v][3]="n"; }
				else if(typeof help[v][4]=="boolean"){ help[v][3]="b"; }
				else{	// help[v][4] = help[v][4].replace(/(:+)/g,":");
						if(help[v][4].length>100){
							help[v][4] = help[v][4].substr(0,97)+"..."; 
						}
					}
				
				newtr=createElement("tr",{},newtable);
				newtd = createElement("td",{},newtr);
				createElement("input",{"type":"checkbox","class":"link","checked":false},newtd);
				createElement("td",{},newtr,help[v][0]);
				createElement("td",{},newtr,help[v][1]);
				createElement("td",{},newtr,help[v][3]);
				if(variableInfo[help[v][2]][help[v][1]]){
					createElement("td",{},newtr,variableInfo[help[v][2]][help[v][1]][0]);
					createElement("td",{},newtr,[,"historic data - not reproducible!","collectable data","options, settings","temporary data","useless, old data"][variableInfo[help[v][2]][help[v][1]][1]]);
				} else {
					createElement("td",{},newtr,"unknown");
					createElement("td",{},newtr,"");
				}
				createElement("td",{},newtr,help[v][4]);
			
			}
			container=null;newtable=null;newtr=null;newtd=null;
		}
		buildExportTable("GLOBAL");

		function buildImportTable(data){
			var container=$("divManageVariablesInner");
			container.children[1].innerHTML = "";
			var newinput=createElement("button",{"class":"link"},container.children[1],"SAVE !");
			newinput.addEventListener("click",function(){
				var container=$("divManageVariablesInner");
				var rows = container.children[1].getElementsByTagName("tr");
				var variables = [];
				var acc, varname;
				for (var v=0;v<rows.length;v++){
					if(rows[v].children[0].children[0].checked){
						GM_setValue(data[v][0]+data[v][1],data[v][3]);
					}
				}
				buildManageVariables();
			},false);
			var newtable=createElement("table",{"border":"1","class":"hoverRowBgCc9","style":"width:100%"},container.children[1]);
			var newtr,newtd;
			var help2;
			var dataLevel;
			for(var v=0;v<data.length;v++){
				help2 = (/^([a-z]{2}_\d+_.+?_)(.*)$/).exec(data[v][0]); // LNG_SERVER_USER_...
				if(help2){ 
					dataLevel = "USER";
					data[v] = [help2[1],help2[2],"s",data[v][1]];
				} else {
					help2 = (/^([a-z]{2}_\d+_)(.*)$/).exec(data[v][0]); // LNG_SERVER_...
					if(help2){
						dataLevel = "SERVER";
						data[v] = [help2[1],help2[2],"s",data[v][1]];
					} else {
						help2 = (/^([a-z]{2}_)(.*)$/).exec(data[v][0]); // LNG_...
						if(help2){
							dataLevel = "LNG";
							data[v] = [help2[1],help2[2],"s",data[v][1]];
						} else {
							dataLevel = "GLOBAL";
							data[v] = ["",data[v][0],"s",data[v][1]];
						}
					}	
				}
				if(typeof data[v][3]=="number"){ data[v][2]="n"; }
				else if(typeof data[v][3]=="boolean"){ data[v][2]="b"; }

				newtr=createElement("tr",{},newtable);
				newtd = createElement("td",{},newtr);
				createElement("input",{"type":"checkbox","class":"link","checked":true},newtd);
				createElement("td",{},newtr,data[v][0]);
				createElement("td",{},newtr,data[v][1]);
				createElement("td",{},newtr,data[v][2]);
				if(variableInfo[dataLevel][data[v][1]]){
					createElement("td",{},newtr,variableInfo[dataLevel][data[v][1]][0]);
					createElement("td",{},newtr,[,"historic data - not reproducible!","collectable data","options, settings","temporary data","useless, old data"][variableInfo[dataLevel][data[v][1]][1]]);
				} else {
					createElement("td",{},newtr,"unknown");
					createElement("td",{},newtr,"");
				}
				if(data[v][3].length>100){
					createElement("td",{},newtr,data[v][3].substr(0,97)+"...");
				} else {
					createElement("td",{},newtr,data[v][3]);
				}
			}
			container=null;newtable=null;newtr=null;newtd=null;newinput=null;
		}

		container=null;containerPart=null;newselect=null;
		newdiv=null;newinput=null;
	}

	if($("divManageVariables")){ return false; }
	var newdiv=createElement("div",{"id":"divManageVariables","mode":"","style":"position:fixed;top:0;left:0;width:100%;height:100%;background-color:#b8a789;z-index:1000;display:block;"},ALL);
	createElement("img",{"src":GFX+"guild/help_back.jpg","style":"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
	createElement("div",{"id":"divManageVariablesInner","class":"tnormal","style":"position:absolute;top:6%;left:5%;width:90%;height:88%;overflow:auto;"},newdiv);
	var newimg=createElement("img",{"id":"infoPanelClose","class":"link","src":GFX+"close.jpg","style":"position:absolute;top:8px;right:8px;width:20px;height:20px;"},newdiv);
	newimg.addEventListener("click",function(){ removeElement(this.parentNode); },false);
	newdiv = null;newimg=null;
	buildManageVariables();
}

function do_login(){
	var cell = $("GM_manageVariables");
	if(cell){
		cell=createElement("div",{"class":"link loginbutton","style":"background-color:orange;"},cell,"Manage Variables "+texte["automat"]["automat"]); // TODO texte
		cell.addEventListener("click",function(){
			if($("divInfo")){ click($("divInfo")); }
			manageVariables();
		},false);
	}
	cell=null;
}

function do_reload(time){
	if(!unsafeData.beraterDone){
		if(time>0){
			GM_log("Page '"+location.href+"' is not completely loaded. Reload in "+time+"sec.");
			window.setTimeout(function(){ do_reload(--time); },1000);
		}else{
			location.href=location.href;
		}
	}
}
do_reload(20);

function do_relogin(time){
	var newdiv=$("automatDoRelogin");
	if(document.getElementsByTagName("div").length>10){
		if(newdiv){ removeElement(newdiv); }
	}else{
		if(time>0){
			if(!newdiv){ newdiv=createElement("div",{"id":"automatDoRelogin","class":"alertbubble tbig link"},document.body); }
			newdiv.innerHTML="Relogin in "+getTimeStr(time);
			newdiv=null;
			window.setTimeout(do_relogin,1000,--time);
		}else if(GAMEPAGES[top.unsafeData.LNG]){
			location.href="http://www."+GAMEPAGES[top.unsafeData.LNG];
		}
	}
	newdiv=null;
}

function start_script(){
	LNG=top.unsafeData.LNG;
	PAGE=location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
	TOOLTIP=$top("divToolTip");
	LOG_BUBBLE_BOX=$top("divLogBubbleBox");

		// Multilingual
		function loadLanguage(lang){
			texte["automat"] = new Object();
			texte["automat"]["hilfe"] = new Object();
			// texte["automat"]["QueFieldInfo"] = new Array();
			// texte["automat"]["QueFieldInfo"][2] = new Array();
			// texte["automat"]["reciep"] = new Object();
			texte["automat"]["MillPowerUpText"] = new Array();
			texte["automat"]["title"] = new Object();
			texte["automat"]["title"]["on"] = new Object();
			texte["automat"]["title"]["off"] = new Object();
			switch (lang){
			case "au":case "nz":case "uk":case "us":case "ir":case "no": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "br": { // I need a translation :(
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "bu": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "de": {
				texte["automat"]["automat"] = "Automat";
				texte["automat"]["pflanze"] = "Pflanze...";
				texte["automat"]["warte"] = "Warte...";
				texte["automat"]["giesse"] = "Gie"+sz+"e...";
				texte["automat"]["fuettere"] = "F"+u_dots+"ttere...";
				texte["automat"]["pflanzautomat"] = "Pflanzautomat";
				texte["automat"]["futterautomat"] = "Futterautomat...";
				texte["automat"]["fabrikautomat"] = "Fabrikautomat...";
				texte["automat"]["millautomat"] = "M"+u_dots+"hlenautomat...";
				texte["automat"]["botStart"] = "Automat-Bot starten";
				texte["automat"]["botStop"] = "Automat-Bot stoppen";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "Es liegt eine neue Script-Version des Automaten vor. Diese installieren?";
				texte["automat"]["shouldUpdateBerater"] = "Du solltest das Berater-Script aktualisieren!<br>Der Automat wird nicht ordnungsgem"+a_dots+sz+" arbeiten.";
				texte["automat"]["valUpdate"] = ["Update","Es wird gepr"+u_dots+"ft, ob eine neuere Version dieses Scriptes verf"+u_dots+"gbar ist."];
				texte["automat"]["setvalAutoPflanz"] = "Soll der Pflanz-Automat angezeigt werden?";
				texte["automat"]["setvalWater"] = "Sollen die "+A_dots+"cker gegossen werden?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Soll der Futter-Automat angezeigt werden?";
				texte["automat"]["settMin"] = "Minimale Klickzeit der Automaten";
				texte["automat"]["settMax"] = "Maximale Klickzeit der Automaten";
				texte["automat"]["settMin2"] = "Minimale Wartezeiten der Automaten";
				texte["automat"]["settMax2"] = "Maximale Wartezeiten der Automaten";
				texte["automat"]["setToDefault"] = "Standard setzen";
				texte["automat"]["setvalSeedWaitForCrop"] = "Das Pflanzen wartet, falls innerhalb dieser Zeit geerntet werden kann.";
				texte["automat"]["emergencyPlants"] = "Notfall-Pflanzen. Diese werden zuerst genommen, falls die ben"+o_dots+"tigte Pflanze nicht verf"+u_dots+"gbar oder passend ist.";
				texte["automat"]["setvalUseQueueList"] = "Benutze Queue-Listen f"+u_dots+"r die "+A_dots+"cker";
				texte["automat"]["set12a"] = "L"+o_dots+"sche \n alle zone Queue\n Daten";
				texte["automat"]["set12b"] = "Gel"+o_dots+"scht.";
				texte["automat"]["setvalShowQueueTime"] = "Zeige berechnete Zeiten in der Queue-Liste.";
				texte["automat"]["set18a"] = "L"+o_dots+"sche alle Daten der M"+u_dots+"hlen-Queue";
				texte["automat"]["set18b"] = "L"+o_dots+"schen erfolgreich";
				texte["automat"]["setvalPowerUpActivate"] = "Aktiviere Produkt-Powerups";
				texte["automat"]["setvalLotteryActivate"] = "Aktiviere das t"+a_dots+"gliche Lotterie-Los";
				texte["automat"]["setvalLotteryDailyLot"] = "Behalte das t"+a_dots+"gliche Lotterie-Los";
				texte["automat"]["setvalQuestActivate"] = "Aktiviere den Quest to quest:";
				texte["automat"]["setvalQuestSolving"] = "Erf"+u_dots+"lle den Quest to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto-Ablehnung Farmi unter";
				texte["automat"]["setvalFarmiAccept"] = "Auto-Annahme Farmi "+u_dots+"ber";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] =  "Nimm Farmi an, der ein Produkt verlangt unter minimalem Lagerbestand";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Entferne Farmi mit fehlenden Produkten und wenigstem Gewinn. Schwelle:";
				texte["automat"]["fields"] = A_dots+"cker";
				texte["automat"]["titleGeneral"] = "Allgemein-Queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Kopiere Queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Kopiere von:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Kopiere nach:";
				texte["automat"]["QueAddText"] = "Eine weitere Pflanze an die Liste anh"+a_dots+"ngen"; //Add product
				texte["automat"]["QueAddAboveText"] = "Eine weitere Pflanze in die Liste schieben";
				texte["automat"]["QueDeleteText"] = "Diese Pflanze l"+o_dots+"schen";
				texte["automat"]["QueClose"] = "Men"+u_dots+" schlie"+sz+"en";
				texte["automat"]["QueCLoseAll"] = "Alle ge"+o_dots+"ffneten Queue-Fenster schlie"+sz+"en";
				texte["automat"]["QueMin"] = "Weniger";
				texte["automat"]["QuePlus"] = "Mehr";
				texte["automat"]["QueBehaviourF"] = "Klick um in den Lager-Modus zu schalten";
				texte["automat"]["QueBehaviourR"] = "Klick um in den Felder-Modus zu schalten";
				texte["automat"]["QueUpButton"] = "Fr"+u_dots+"her";
				texte["automat"]["QueDownButton"] = "Sp"+a_dots+"ter";
				texte["automat"]["buttonTimeLine"] = "Zeige Felder-Zeitverlauf";
				texte["automat"]["buttonOverview"] = "Zeige Automaten-"+U_dots+"bersicht";
				texte["automat"]["repeat_on"] = "Wiederholung AN";
				texte["automat"]["repeat_off"] = "Wiederholung AUS";
				texte["automat"]["shuffle_on"] = "Zufall AN";
				texte["automat"]["shuffle_off"] = "Zufall AUS";
				texte["automat"]["rotate"] = "Rotieren";
				texte["automat"]["stop"] = "STOPP";
				texte["automat"]["week"] = "Wochen";
				texte["automat"]["inftext"] = "L"+a_dots+"uft ohne Ende";
				texte["automat"]["ernte"] = "Entferne alle %AMOUNT% %PROD%<br>St"+u_dots+"ck = %COST%<br>Total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Benutzte Felder sind fertig um:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone wird vom Bot bearbeitet";
				texte["automat"]["QueDontWork"] = "Zone wird vom Bot ignoriert";
				texte["automat"]["QueueStoped"] = "Diese %PRODNAME% werden nicht gepflanzt, da vorher gestoppt wird.";
				texte["automat"]["QueStop0"] = "Das automatische Pflanzen wird gestoppt.";
				texte["automat"]["QueStop1"] = "Nach Pflanzen von %FLDFROM% Feld wird gestoppt.";
				texte["automat"]["QueStopX"] = "Nach Pflanzen von %FLDFROM% Feldern wird gestoppt.";
				texte["automat"]["QueRepeat"] = "(Wiederholung)";
				texte["automat"]["QueShuffle"] = "(Zufall)";
				texte["automat"]["QueRepeatShuffle"] = "(Zufallswiederholung)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% bis %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "%PRODNAME% ist diese Runde bereits gepflanzt <br/>und wird erneut geplanzt.";
				texte["automat"]["QueRoundDoneX"] = "%PRODNAME% sind diese Runde bereits gepflanzt <br/>und werden erneut geplanzt.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "Noch:";
				texte["automat"]["QueRoundMake"] = "Jede Runde:";
				texte["automat"]["QueRoundMade"] = "Erledigt:";
				texte["automat"]["QueRoundToGo"] = "Noch:";
				texte["automat"]["QueUses"] = "Benutzt:";
				texte["automat"]["QueGives"] = "Ertrag:";
				texte["automat"]["QueFutter"] = "Zeitersparnis:";
				texte["automat"]["QueTimeThis"] = "Wachstumszeit:";
				texte["automat"]["QueTimeToGo"] = "Verbleibende Wachstumszeit:";
				texte["automat"]["QueTimeReady"] = "Fertig um:";
				texte["automat"]["QueTimeFirstReady"] = "Erstes fertig:";
				texte["automat"]["QueTimeNextReady"] = "N"+a_dots+"chstes fertig:";
				texte["automat"]["QueTimeRound"] = "Durchschnitt jede Runde:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "M"+u_dots+"hlen-Queue";
				texte["automat"]["MilldoWork"] = "Windm"+u_dots+"hle wird automatisch bearbeitet.";
				texte["automat"]["MillDontWork"] = "Windm"+u_dots+"hle wird ignoriert. Manuelle Bedienung.";
				texte["automat"]["MillClearAddAll"] = "L"+o_dots+"sche Windm"+u_dots+"hlen-Queue und nehme dann alle Rezepte auf";
				texte["automat"]["MillShuffle"] = "(Zufallsmodus)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% bis %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Backzeit:";
				texte["automat"]["MillTimeReady"] = "Fertig:";
				texte["automat"]["MillStoped"] = "Es ist ein Stopp in der Liste. %PRODNAME% wird nicht gebacken.";
				texte["automat"]["MillStop0"] = "Der automatische Prozess wird gestoppt.";
				texte["automat"]["MillStop1"] = "Nach %FLDFROM% Rezept wird der automatische Prozess gestoppt.";
				texte["automat"]["MillStopX"] = "Nach %FLDFROM% Rezepten wird der automatische Prozess gestoppt.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Anzahl";
				texte["automat"]["lack"] = "Fehlend";
				texte["automat"]["MillRecipesBought"] = "Total gekaufte Rezepte: ";
				texte["automat"]["MillRecipesUsed"] = "Total benutzte Rezepte: ";
				texte["automat"]["MillRecipesBake"] = "Max zu backende Rezepte: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Zeige nur Allgemein-Queue<br>+Strg: Zeige Allgemein-Queue";
				texte["automat"]["title"]["off"]["general"] = "Zeige nur Allgemein-Queue<br>+Strg: Verstecke Allgemein-Queue";
				texte["automat"]["title"]["on"]["farm1"] = "Zeige nur 1. Farm<br>+Strg: Zeige 1. Farm";
				texte["automat"]["title"]["off"]["farm1"] = "Zeige nur 1. Farm<br>+Strg: Verstecke 1. Farm";
				texte["automat"]["title"]["on"]["farm2"] = "Zeige nur 2. Farm<br>+Strg: Zeige 2. Farm";
				texte["automat"]["title"]["off"]["farm2"] = "Zeige nur 2. Farm<br>+Strg: Verstecke 2. Farm";
				texte["automat"]["title"]["on"]["farm3"] = "Zeige nur 3. Farm<br>+Strg: Zeige 3. Farm";
				texte["automat"]["title"]["off"]["farm3"] = "Zeige nur 3. Farm<br>+Strg: Verstecke 3. Farm";
				texte["automat"]["title"]["on"]["farm4"] = "Zeige nur 4. Farm<br>+Strg: Zeige 4. Farm";
				texte["automat"]["title"]["off"]["farm4"] = "Zeige nur 4. Farm<br>+Strg: Verstecke 4. Farm";
				texte["automat"]["title"]["on"]["windmill"] = "Zeige nur Windm"+u_dots+"hle<br>+Strg: Zeige Windm"+u_dots+"hle";
				texte["automat"]["title"]["off"]["windmill"] = "Zeige nur Windm"+u_dots+"hle<br>+Strg: Verstecke Windm"+u_dots+"hle";
				texte["automat"]["title"]["on"]["forestry"] = "Zeige nur Baumerei<br>+Strg: Zeige Baumerei";
				texte["automat"]["title"]["off"]["forestry"] = "Zeige nur Baumerei<br>+Strg: Verstecke Baumerei";
				texte["automat"]["title"]["on"]["type0"] = "Zeige nur "+A_dots+"cker<br>+Strg: Zeige "+A_dots+"cker";
				texte["automat"]["title"]["off"]["type0"] = "Zeige nur "+A_dots+"cker<br>+Strg: Verstecke "+A_dots+"cker";
				texte["automat"]["title"]["on"]["type1"] = "Zeige nur St"+a_dots+"lle<br>+Strg: Zeige St"+a_dots+"lle";
				texte["automat"]["title"]["off"]["type1"] = "Zeige nur St"+a_dots+"lle<br>+Strg: Verstecke St"+a_dots+"lle";
				texte["automat"]["title"]["on"]["type2"] = "Zeige nur Fabriken<br>+Strg: Zeige Fabriken";
				texte["automat"]["title"]["off"]["type2"] = "Zeige nur Fabriken<br>+Strg: Verstecke Fabriken";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "dk": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "es": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "fr": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "gr": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "hu": { //translation thanks to EnKicsiTanyam
				texte["automat"]["automat"] = "Seg"+e_ac+"d";
				texte["automat"]["pflanze"] = U_dots+"ltet"+e_ac+"s...";
				texte["automat"]["warte"] = "V"+a_ac+"rakoz"+a_ac+"s...";
				texte["automat"]["giesse"] = O_dots+"nt"+o_dots+"z"+e_ac+"s...";
				texte["automat"]["fuettere"] = "Etet"+e_ac+"s...";
				texte["automat"]["pflanzautomat"] = "Vetog"+e_ac+"p";
				texte["automat"]["futterautomat"] = "Etetog"+e_ac+"p...";
				texte["automat"]["fabrikautomat"] = "Gy"+a_ac+"rt"+o_ac+"g"+e_ac+"p...";
				texte["automat"]["millautomat"] = "Millmachine...";
				//texte["automat"]["botStart"] = "Ind"+i_ac+"t"+a_ac+"s";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				//texte["automat"]["botStop"] = "Le"+a_ac+"ll"+i_ac+"t"+a_ac+"s";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = U_ac+"j verzi"+o_ac+" "+e_ac+"rheto el az automat"+a_ac+"b"+o_ac+"l. Telep"+i_ac+"ted?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Friss"+i_ac+"t"+e_ac+"s","Ellenorzi, hogy van e "+u_ac+"jabb el"+e_ac+"rheto verzi"+o_ac+" az "+E_ac+"n Kicsi Tany"+a_ac+"m Tan"+a_ac+"csad"+o_ac+"b"+o_ac+"l. Felk"+i_ac+"n"+a_ac+"lja az egy kattint"+a_ac+"sos friss"+i_ac+"t"+e_ac+"st."];
				texte["automat"]["setvalAutoPflanz"] = "Szeretn"+e_ac+"d haszn"+a_ac+"lni a vetog"+e_ac+"pet?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Szeretn"+e_ac+"d haszn"+a_ac+"lni az etetog"+e_ac+"pet?";
				texte["automat"]["settMin"] = "Minim"+a_ac+"lis idok"+o_dots+"z a klikkel"+e_ac+"sek k"+o_dots+"z"+o_dots+"tt";
				texte["automat"]["settMax"] = "Maxim"+a_ac+"lis idok"+o_dots+"z a klikkel"+e_ac+"sek k"+o_dots+"z"+o_dots+"tt";
				texte["automat"]["settMin2"] = "Minim"+a_ac+"lis v"+a_ac+"rakoz"+a_ac+"si ido a muveletek k"+o_dots+"z"+o_dots+"tt";
				texte["automat"]["settMax2"] = "Maxim"+a_ac+"lis v"+a_ac+"rakoz"+a_ac+"si ido a muveletek k"+o_dots+"z"+o_dots+"tt";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Vet"+e_ac+"si sorrend fel"+a_ac+"ll"+i_ac+"t"+a_ac+"s"+a_ac+"nak enged"+e_ac+"lyez"+e_ac+"se";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Vet"+e_ac+"si sorrend t"+o_dots+"r"+o_dots+"lve";
				texte["automat"]["setvalShowQueueTime"] = "V"+a_ac+"rhat"+o_ac+" elk"+e_ac+"sz"+u_dots+"l"+e_ac+"s idej"+e_ac+"nek mutat"+a_ac+"sa a vet"+e_ac+"si sorrendn"+e_ac+"l.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Klikkelj ide egy "+u_ac+"jabb term"+e_ac+"ny list"+a_ac+"ra v"+e_ac+"tel"+e_ac+"hez."; //Add product
				texte["automat"]["QueAddAboveText"] = "Egy "+u_ac+"jabb term"+e_ac+"ny felv"+e_ac+"tele a list"+a_ac+"ra";
				texte["automat"]["QueDeleteText"] = "Term"+e_ac+"ny t"+o_dots+"rl"+e_ac+"se a list"+a_ac+"r"+o_ac+"l";
				texte["automat"]["QueClose"] = "Z"+a_ac+"rd be ezt az ablakot";
				texte["automat"]["QueCLoseAll"] = "Z"+a_ac+"rd be az "+o_dots+"sszes vet"+e_ac+"si sorrend ablakot.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Feljebb";
				texte["automat"]["QueDownButton"] = "Lejjebb";
				texte["automat"]["buttonTimeLine"] = "Idovonal mutat"+a_ac+"sa";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Lista ism"+e_ac+"tl"+e_ac+"se BEKAPCSOLVA, klikk a kikapcsol"+a_ac+"shoz.";
				texte["automat"]["repeat_off"] = "Lista ism"+e_ac+"tl"+e_ac+"se KIKAPCSOLVA, klikk a bekapcsol"+a_ac+"shoz.";
				texte["automat"]["shuffle_on"] = "V"+e_ac+"letlen sorrend BEKAPCSOLVA, klikk a kikapcsol"+a_ac+"shoz.";
				texte["automat"]["shuffle_off"] = "V"+e_ac+"letlen sorrend KIKAPCSOLVA, klikk a bekapcsol"+a_ac+"shoz.";
				texte["automat"]["rotate"] = "Ism"+e_ac+"tl"+e_ac+"s: a lista v"+e_ac+"g"+e_ac+"re "+e_ac+"rve "+u_ac+"jrakezd"+e_ac+"s";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Haszn"+a_ac+"latban l"+e_ac+"vo mezok:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Automatikus "+u_dots+"zemeltet"+e_ac+"s bekapcsolva";
				texte["automat"]["QueDontWork"] = "Automatikus "+u_dots+"zemeltet"+e_ac+"s kikapcsolva";
				texte["automat"]["QueueStoped"] = "A termel"+e_ac+"s le"+a_ac+"ll"+i_ac+"tva, mert nem termesztheto %PRODNAME%.";
				texte["automat"]["QueStop0"] = "Az automatikus termel"+e_ac+"s le lesz "+a_ac+"ll"+i_ac+"tva";
				texte["automat"]["QueStop1"] = "A %FLDFROM%. mezo betakar"+i_ac+"t"+a_ac+"sa ut"+a_ac+"n az automatikus termel"+e_ac+"s le fog "+a_ac+"llni.";
				texte["automat"]["QueStopX"] = "A %FLDFROM%. mezok betakar"+i_ac+"t"+a_ac+"sa ut"+a_ac+"n az automatikus termel"+e_ac+"s le fog "+a_ac+"llni.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "A(z) %PRODNAME% sikeresen betakar"+i_ac+"tva ebben a k"+o_dots+"rben, <br/> "+e_ac+"s a k"+o_dots+"vetkezoben "+u_ac+"jraindul a termel"+e_ac+"se.";
				texte["automat"]["QueRoundDoneX"] = "Ezek a(z) %PRODNAME% sikeresen betakar"+i_ac+"tva ebben a k"+o_dots+"rben, <br/> "+e_ac+"s a k"+o_dots+"vetkezoben "+u_ac+"jraindul a termel"+e_ac+"s"+u_dots+"k.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Nyeres"+e_ac+"g:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "it": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "nl": { // translation thanks to terrorsource and DrBOB101 and Jan-Hans
				texte["automat"]["automat"] = "Automaat";
				texte["automat"]["pflanze"] = "Planten...";
				texte["automat"]["warte"] = "Wachten...";
				texte["automat"]["giesse"] = "Water geven...";
				texte["automat"]["fuettere"] = "Voeren...";
				texte["automat"]["pflanzautomat"] = "Plant machine";
				texte["automat"]["futterautomat"] = "Voeder machine...";
				texte["automat"]["fabrikautomat"] = "Fabriek machine...";
				texte["automat"]["millautomat"] = "Molen machine...";
				texte["automat"]["botStart"] = "Start de Automaat-Bot";
				texte["automat"]["botStop"] = "Stop de Automaat-Bot";
				texte["automat"]["zonePairing"] = "Zone koppeling";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "Molen";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "Algemeen";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "Er is een nieuwe versie van de Automaat beschikbaar. Deze nu installeren?";
				texte["automat"]["shouldUpdateBerater"] = "Het script van de Adviseur heeft een update nodig!<br>De automaat zal niet goed werken.";
				texte["automat"]["valUpdate"] = ["Update","Er wordt gecontroleerd of er een nieuwe script versie beschikbaar is"];
				texte["automat"]["setvalAutoPflanz"] = "Moet de plantmachine getoond worden?";
				texte["automat"]["setvalWater"] = "Moeten akkers worden bewaterd?";
				texte["automat"]["setvalDisableCropFields"]="Blokkeer het oogsten van velden welke in slaapstand gaan.";
				texte["automat"]["setvalAutoFutter"] = "Moet de voedermachine getoond worden?";
				texte["automat"]["settMin"] = "Minimale klik vertraging van de automaat";
				texte["automat"]["settMax"] = "Maximale klik vertraging van de automaat";
				texte["automat"]["settMin2"] = "Minimale wachttijd van de automaat";
				texte["automat"]["settMax2"] = "Maximale wachttijd van de automaat";
				texte["automat"]["setToDefault"] = "Wijzig naar standaard waarde";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wacht met planten als de volgende oogst binnen deze tijd is.";
				texte["automat"]["emergencyPlants"] = "Nood beplanting. Deze planten worden als eerste gepland als de benodigde plant niet aanwezig is of niet past.";
				texte["automat"]["setvalUseQueueList"] = "Gebruik een wachtrij voor alle velden.";
				texte["automat"]["set12a"] = "Verwijder \n veld wachtrij \n gegevens";
				texte["automat"]["set12b"] = "Verwijderen Voltooid.";
				texte["automat"]["setvalShowQueueTime"] = "Laat berekende oogst tijden in de wachtrij zien.";
				texte["automat"]["set18a"] = "Verwijder molen wachtrij gegevens";
				texte["automat"]["set18b"] = "Klaar";
				texte["automat"]["setvalPowerUpActivate"] = "Activeer powerups voor producten";
				texte["automat"]["setvalLotteryActivate"] = "Activeer automatisch de dagelijkse loterij.";
				texte["automat"]["setvalLotteryDailyLot"] = "Kies voor het bewaren van het dagelijkse lot.";
				texte["automat"]["setvalQuestActivate"] = "Activeer de Quest automatisch t/m quest:";
				texte["automat"]["setvalQuestSolving"] = "Los de Quest automatische op t/m quest";
				texte["automat"]["setvalFarmiReject"] = "Wijs farmies automatisch af beneden:";
				texte["automat"]["setvalFarmiAccept"] = "Accepteer farmies automatische vanaf:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accepteer farmies met producten waarvan de hoeveelheid in het rack beneden het minimale benodigd aantal ligt.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Verwijder farmi met missende producten en laagste opbrengst. Drempel:";
				texte["automat"]["fields"] = "Akkers";
				texte["automat"]["titleGeneral"] = "Algemene wachtrij";
				texte["automat"]["titleQueue"] = "Wachtrij";
				texte["automat"]["QueCopyTextHeader"] = "Kopieer wachtrij";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Kopieer van:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Kopieer naar:";
				texte["automat"]["QueAddText"] = "Voeg een product toe aan einde van lijst."; //Add product
				texte["automat"]["QueAddAboveText"] = "Voeg een product, voor dit product, toe aan de lijst.";
				texte["automat"]["QueDeleteText"] = "Verwijder dit product van de lijst.";
				texte["automat"]["QueClose"] = "Sluit deze lijst";
				texte["automat"]["QueCLoseAll"] = "Sluit alle open wachtrij vensters.";
				texte["automat"]["QueMin"] = "Verlaag";
				texte["automat"]["QuePlus"] = "Verhoog";
				texte["automat"]["QueBehaviourF"] = "Klik om te schakelen naar rack-modus";
				texte["automat"]["QueBehaviourR"] = "Klik om te schakelen naar field-modus";
				texte["automat"]["QueUpButton"] = "Verplaats naar links";
				texte["automat"]["QueDownButton"] = "Verplaats naar rechts";
				texte["automat"]["buttonTimeLine"] = "Bekijk veld tijdlijnen";
				texte["automat"]["buttonOverview"] = "Bekijk overzicht van de automatisering";
				texte["automat"]["repeat_on"] = "Herhaal lijst is AAN, klik om uit te zetten.";
				texte["automat"]["repeat_off"] = "Herhaal lijst is UIT, klik om aan te zetten.";
				texte["automat"]["shuffle_on"] = "Shuffle lijst is AAN, klik om uit te zetten.";
				texte["automat"]["shuffle_off"] = "Shuffle lijst is UIT, klik om aan te zetten.";
				texte["automat"]["rotate"] = "Draaien: plaats bovenste item onderaan lijst.";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Loopt oneindig door";
				texte["automat"]["ernte"] = "Verwijder alle %AMOUNT% %PROD%<br>per stuk = %COST%<br>totaal = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Gebruikte velden zijn klaar om:";
				texte["automat"]["CloseWindowTimer"] = "Sluit scherm over :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Klik om de klok te herstarten!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Veld wordt automatisch onderhouden.";
				texte["automat"]["QueDontWork"] = "Veld wordt overgeslagen. Handmatig onderhoud is nodig";
				texte["automat"]["QueueStoped"] = "Er is een kweek stop toegvoegd deze %PRODNAME% worden niet gekweekt";
				texte["automat"]["QueStop0"] = "Het automatishe produceren wordt gestopt.";
				texte["automat"]["QueStop1"] = "Na %FLDFROM% veld wordt het automatishe kweken gestopt.";
				texte["automat"]["QueStopX"] = "Na %FLDFROM% velden wordt het automatishe kweken gestopt.";
				texte["automat"]["QueRepeat"] = "(Herhaal modus)";
				texte["automat"]["QueShuffle"] = "(Shuffle modus)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle herhaal modus)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% t/m %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "De velden %PRODNAME% zijn al gekweekt en worden overgeslagen";
				texte["automat"]["QueRoundDone1"] = "Dit veld %PRODNAME% is al gekweekt en wordt pas de volgende ronde weer gekweekt.";
				texte["automat"]["QueRoundDoneX"] = "De velden %PRODNAME% zijn al gekweekt en wordt pas de volgende ronde weer gekweekt.";
				texte["automat"]["QueFieldMake"] = "Totaal:";
				texte["automat"]["QueFieldToGo"] = "Nog te gaan:";
				texte["automat"]["QueRoundMake"] = "Per ronde:";
				texte["automat"]["QueRoundMade"] = "Gedaan:";
				texte["automat"]["QueRoundToGo"] = "Nog te gaan:";
				texte["automat"]["QueUses"] = "Gebruikt:";
				texte["automat"]["QueGives"] = "Opbrengst:";
				texte["automat"]["QueFutter"] = "Produkt korting:";
				texte["automat"]["QueTimeThis"] = "Produktie tijd:";
				texte["automat"]["QueTimeToGo"] = "Kweektijd nog te gaan:";
				texte["automat"]["QueTimeReady"] = "Klaar op:";
				texte["automat"]["QueTimeFirstReady"] = "Eerste klaar op:";
				texte["automat"]["QueTimeNextReady"] = "Volgende klaar op:";
				texte["automat"]["QueTimeRound"] = "Gem. per ronde:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Wachtrij molen";
				texte["automat"]["MilldoWork"] = "De windmolen wordt automatisch onderhouden.";
				texte["automat"]["MillDontWork"] = "De windmolen wordt overgeslagen. Handmatig onderhoud is nodig";
				texte["automat"]["MillClearAddAll"] = "Leeg molen wachtrij en voeg alle recepten toe.";
				texte["automat"]["MillShuffle"] = "(Shuffle modus)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% t/m %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Totale Kooktijd:";
				texte["automat"]["MillTimeReady"] = "Klaar:";
				texte["automat"]["MillStoped"] = "Er is een bereidingsstop toegvoegd deze %PRODNAME% worden niet bereid";
				texte["automat"]["MillStop0"] = "Het automatishe bereiden wordt gestopt.";
				texte["automat"]["MillStop1"] = "Na %FLDFROM% recept wordt het automatishe bereiden gestopt.";
				texte["automat"]["MillStopX"] = "Na %FLDFROM% recepten wordt het automatishe bereiden gestopt.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Aantal";
				texte["automat"]["lack"] = "Tekort";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Bekijk alleen algemene wachtrij<br>+Ctrl: Bekijk algemene wachtrij.";
				texte["automat"]["title"]["off"]["general"] = "Bekijk alleen algemene wachrij<br>+Ctrl: Verberg algemene wachtrij.";
				texte["automat"]["title"]["on"]["farm1"] = "Bekijk alleen 1ste boerderij<br>+Ctrl: Bekijk 1ste boerderij.";
				texte["automat"]["title"]["off"]["farm1"] = "Bekijk alleen 1ste boederij<br>+Ctrl: Verberg 1ste boerderij.";
				texte["automat"]["title"]["on"]["farm2"] = "Bekijk alleen 2de boerderij<br>+Ctrl: Bekijk 2de boerderij.";
				texte["automat"]["title"]["off"]["farm2"] = "Bekijk alleen 2de boederij<br>+Ctrl: Verberg 2de boerderij.";
				texte["automat"]["title"]["on"]["farm3"] = "Bekijk alleen 3de boerderij<br>+Ctrl: Bekijk 3de boerderij.";
				texte["automat"]["title"]["off"]["farm3"] = "Bekijk alleen 3de boederij<br>+Ctrl: Verberg 3de boerderij.";
				texte["automat"]["title"]["on"]["windmill"] = "Bekijk alleen de windmolen<br>+Ctrl: Bekijk de windmolen";
				texte["automat"]["title"]["off"]["windmill"] = "Bekijk alleen de winmolen<br>+Ctrl: Verberg de windmolen";
				texte["automat"]["title"]["on"]["type0"] = "Bekijk alleen de akkers<br>+Ctrl: Bekijk akkers";
				texte["automat"]["title"]["off"]["type0"] = "Bekijk alleen de akkers<br>+Ctrl: Verberg akkers";
				texte["automat"]["title"]["on"]["type1"] = "Bekijk alleen de stallen<br>+Ctrl: Bekijk stallen";
				texte["automat"]["title"]["off"]["type1"] = "Bekijk alleen de stallen<br>+Ctrl: Verberg stallen";
				texte["automat"]["title"]["on"]["type2"] = "Bekijk aleen de fabrieken<br>+Ctrl: Bekijk fabrieken";
				texte["automat"]["title"]["off"]["type2"] = "Bekijk alleen de fabrieken<br>+Ctrl: Verberg fabrieken";
				texte["automat"]["title"]["on"]["all"] = "Bekijk alle boerderij wachtrijen";
				texte["automat"]["title"]["off"]["all"] = "Verberg alle boerderij wachtrijen";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"Dit script kan worden gebruikt automatisering toe te voegen aan het cultivering proces."];
				texte["automat"]["hilfe"]["botStart"] = ["Hoe werkt het!","Als aan de onderkant van het scherm op de knop '"+texte["automat"]["botStart"]+"' klikt zal het automatiseringsproces worden gestart."];
				texte["automat"]["hilfe"]["field"] = ["Tuin","Bij elke tuin wordt rechts onder een icoon afgebeeld. Als het icoon er als uitziet als <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> dan is het automatiseringsproces gestopt of wordt gestopt bij het volgende zaai moment. Er zullen daarna geen producten worden verbouwd totdat een ander product wordt geselecteerd. Als er een product icoon wordt afgebeeld zal deze als volgende worden geproduceerd in deze tuin."];
				texte["automat"]["hilfe"]["queue"] = ["Wachtrij","Als in het Automaat '"+texte["option"]+"' menu de optie zone wachtrij is aangevinkt zal er bij het aanklikken van een product icoon, bij een tuin, een wachtrij lijst worden getoond."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Als de \"Repeat\"-functie wordt aangevinkt zal de lijst steeds weer worden herhaalt."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Bij het aanvinken van de \"Shuffle\"-functie zal de lijst willekeurig worden doorlopen."];
				texte["automat"]["hilfe"]["stable"] = ["Stallen","Bij elke stal wordt rechtsonder een icoon afgebeeld. Als het icoon er uitziet als <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> dan is het automatiseringsproces gestopt of wordt gestopt bij het volgende zaai moment. Als er een product wordt afgebeeld wordt dit product gebruikt om de stal te voeden. Klik op dit icoon om via een schuifbalk te kiezen met hoeveel van dit product de stal gevoerd moet worden of om van voedings product te wisselen."];
				texte["automat"]["hilfe"]["factory"] = ["Fabrieken","Bij elke fabriek wordt rechtsonder een icoon afgebeeld. Als het icoon er uitziet als <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> dan is het automatiseringsproces gestopt of wordt gestopt bij het volgende zaai moment. Als er een product wordt afgebeeld zal dit product worden geproduceerd in deze fabriek."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In het Automaat '"+texte["automat"]["zonePairing"]+"' menu kan via de aanklik rondjes gekozen worden welke zones aan welke wachtrij gekoppeld moet worden. Ook is het mogelijk om meerdere algemene wachtrijen aan te maken. Dit is een uitbreiding op de oude algemene wachtrij optie."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmolen","De winmolen wachtrij werkt hetzelfde als de veld wachtrij. Maar in plaats van producten worden en recepten bereid. <br>Als extra heeft de molen wachtrij de knop <div class = \"queueButtonAddAll\">&nbsp;</div> waarmee de lijst gewist wordt en direct gevuld met alle recepten die gekocht en nog niet gekookt zijn en waarvan ook het juiste aantal benodigde producten van aanwezig zijn.<br> Als de achtergrond van een wachtrij item geel wordt geeft dit aan de er te weinig producten beschikbaar zijn om dit recept te koken.<br><br><b>Note: </b>Voor een nieuwe gebruiker die al recepten heeft gekocht. Ga eerst naar de molenaar of naar de receptenhandelaarster scherm. Wacht daar even zodat de gekochte recepten wordt opgeslagen in het systeem."];
			break;}
			case "pl": { // translation thanks to bonizaur
				texte["automat"]["automat"] = "Automat";
				texte["automat"]["pflanze"] = "Wysiewanie...";
				texte["automat"]["warte"] = "Oczekiwanie...";
				texte["automat"]["giesse"] = "Podlewanie...";
				texte["automat"]["fuettere"] = "Karmienie...";
				texte["automat"]["pflanzautomat"] = "AutoZasiewy...";
				texte["automat"]["futterautomat"] = "AutoKarmienie...";
				texte["automat"]["fabrikautomat"] = "AutoProdukcja...";
				texte["automat"]["millautomat"] = "M"+l_stroke+"yn...";
				texte["automat"]["botStart"] = "Startuj Bota";
				texte["automat"]["botStop"] = "Zatrzymaj Bota";
				texte["automat"]["zonePairing"] = l_stroke+a_ogonek+"czenie p"+o_ac+"l";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "M"+l_stroke+"yn";
				texte["automat"]["timing"] = "Czas";
				texte["automat"]["general"] = "Og"+o_ac+"lne";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "Jest nowa wersja skryptu automatyzacji. Zainstalowa"+c_ac+"?";
				texte["automat"]["shouldUpdateBerater"] = "Powiniene"+s_ac+" zaktualizowa"+c_ac+" skrypt Doradcy!<br> Inaczej Automat nie b"+e_ogonek+"dzie dzia"+l_stroke+"a"+l_stroke+" prawid"+l_stroke+"owo.";
				texte["automat"]["valUpdate"] = ["Aktualizacja","Sprawdza"+c_ac+" czy jest nowsza wersja tego skryptu?"];
				texte["automat"]["setvalAutoPflanz"] = "Czy wy"+s_ac+"wietla"+c_ac+" ikony automatyzacji siewu?";
				texte["automat"]["setvalWater"] = "Czy pola maj"+a_ogonek+" by"+c_ac+" podlewane?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Czy wy"+s_ac+"wietla"+c_ac+" ikony automatyzacji karmienia?";
				texte["automat"]["settMin"] = "Minimalna zw"+l_stroke+"oka dla automatyzacji siewu";
				texte["automat"]["settMax"] = "Maksymalna zw"+l_stroke+"oka dla automatyzacji siewu";
				texte["automat"]["settMin2"] = "Minimalny czas oczekiwania mi"+e_ogonek+"dzy operacjami";
				texte["automat"]["settMax2"] = "Maksymalny czas oczekiwania mi"+e_ogonek+"dzy operacjami";
				texte["automat"]["setToDefault"] = "Przywr"+o_ac+c_ac+" domy"+s_ac+"lne";
				texte["automat"]["setvalSeedWaitForCrop"] = "Czekaj z zasiewem, je"+s_ac+"li do kolejnego zbioru to mniej ni"+z_dot;
				texte["automat"]["emergencyPlants"] = "Ro"+s_ac+"liny rezerwowe. S"+a_ogonek+" u"+z_dot+"ywane je"+s_ac+"li wymagane ro"+s_ac+"liny nie s"+a_ogonek+" dost"+e_ogonek+"pne lub si"+e_ogonek+" sko"+n_ac+"cz"+a_ogonek+".";
				texte["automat"]["setvalUseQueueList"] = "U"+z_dot+"yj listy zasiew"+o_ac+"w dla p"+o_ac+"l.";
				texte["automat"]["set12a"] = "Usu"+n_ac+" \n listy zasiew"+o_ac+"w\n dla wszystkich p"+o_ac+"l";
				texte["automat"]["set12b"] = "Usuwanie zako"+n_ac+"czone.";
				texte["automat"]["setvalShowQueueTime"] = "Poka"+z_dot+" skalkulowany czas zbior"+o_ac+"w na li"+s_ac+"cie.";
				texte["automat"]["set18a"] = "Usu"+n_ac+" list"+e_ogonek+" prac dla m"+l_stroke+"yna";
				texte["automat"]["set18b"] = "Usuwanie zako"+n_ac+"czone";
				texte["automat"]["setvalPowerUpActivate"] = "Aktywuj powerupy dla produkt"+o_ac+"w";
				texte["automat"]["setvalLotteryActivate"] = "Automatycznie aktywuj dzienn"+a_ogonek+" loteri"+e_ogonek;
				texte["automat"]["setvalLotteryDailyLot"] = "Zaznacz, aby automatycznie odebra"+c_ac+" nagrod"+e_ogonek;
				texte["automat"]["setvalQuestActivate"] = "Aktywuj Quest automatycznie";
				texte["automat"]["setvalQuestSolving"] = "Wykonaj Quest automatycznie";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Pola";
				texte["automat"]["titleGeneral"] = "Lista G"+l_stroke+o_ac+"wna";
				texte["automat"]["titleQueue"] = "Lista";
				texte["automat"]["QueCopyTextHeader"] = "Kopiuj list"+e_ogonek;
				texte["automat"]["QueCopyTextHeaderFrom"] = "Kopiuj z:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Kopiuj do:";
				texte["automat"]["QueAddText"] = "Kliknij aby doda"+c_ac+" produkt do listy."; //Add product
				texte["automat"]["QueAddAboveText"] = "Kliknij aby doda"+c_ac+" produkt do listy przed t"+a_ogonek+" pozycj"+a_ogonek+".";
				texte["automat"]["QueDeleteText"] = "Usu"+n_ac+" ten produkt z listy.";
				texte["automat"]["QueClose"] = "Zamknij to menu";
				texte["automat"]["QueCLoseAll"] = "Zamknij wszystkie otwarte listy zasiew"+o_ac+"w.";
				texte["automat"]["QueMin"] = "Zmniejsz warto"+s_ac+c_ac;
				texte["automat"]["QuePlus"] = "Zwi"+e_ogonek+"ksz warto"+s_ac+c_ac;
				texte["automat"]["QueBehaviourF"] = "Kliknij aby przej"+s_ac+c_ac+" do rack-mode";
				texte["automat"]["QueBehaviourR"] = "Kliknij aby przej"+s_ac+c_ac+" do field-mode";
				texte["automat"]["QueUpButton"] = "W g"+o_ac+"r"+e_ogonek;
				texte["automat"]["QueDownButton"] = "W d"+o_ac+l_stroke;
				texte["automat"]["buttonTimeLine"] = "Poka"+z_dot+" linie czasowe prac";
				texte["automat"]["buttonOverview"] = "Poka"+z_dot+" przeglad automatyzacji";
				texte["automat"]["repeat_on"] = "Zap"+e_ogonek+"tlenie listy: TAK, kliknij aby wy"+l_stroke+a_ogonek+"czy"+c_ac+".";
				texte["automat"]["repeat_off"] = "Zap"+e_ogonek+"tlenie listy: NIE, kliknij aby w"+l_stroke+a_ogonek+"czy"+c_ac+".";
				texte["automat"]["shuffle_on"] = "Losowe zasiewy: TAK, kliknij aby wy"+l_stroke+a_ogonek+"czy"+c_ac+".";
				texte["automat"]["shuffle_off"] = "Losowe zasiewy: NIE, kliknij aby w"+l_stroke+a_ogonek+"czy"+c_ac+".";
				texte["automat"]["rotate"] = "Rotacja: przesu"+n_ac+" towary o jedn"+a_ogonek+" pozycj"+e_ogonek+" (pierwszy na koniec)";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "tydzie"+n_ac;
				texte["automat"]["inftext"] = "w niesko"+n_ac+"czono"+s_ac+c_ac;
				texte["automat"]["ernte"] = "Usu"+n_ac+" wszystkie %AMOUNT% %PROD%<br>za szt. = %COST%<br>razem = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "U"+z_dot+"yte miejsca na polu:";
				texte["automat"]["CloseWindowTimer"] = "Zamkni"+e_ogonek+"cie ekranu za :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Kliknij aby zresetowa"+c_ac+" timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Pole obs"+l_stroke+"ugiwane przez bota";
				texte["automat"]["QueDontWork"] = "Pole ignorowane przez bota";
				texte["automat"]["QueueStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie b"+e_ogonek+"dzie dalej siany.";
				texte["automat"]["QueStop0"] = "Proces automatycznych zasiew"+o_ac+"w zostanie zatrzymany.";
				texte["automat"]["QueStop1"] = "Po obsianiu %FLDFROM% pola proces automatycznych zasiew"+o_ac+"w zostanie zatrzymany.";
				texte["automat"]["QueStopX"] = "Po obsianiu %FLDFROM% p"+o_ac+"l proces automatycznych zasiew"+o_ac+"w zostanie zatrzymany.";
				texte["automat"]["QueRepeat"] = "(Tryb powtarzania)";
				texte["automat"]["QueShuffle"] = "(Tryb losowy)";
				texte["automat"]["QueRepeatShuffle"] = "(Tryb losowy powtarzalny)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "Te pola %PRODNAME% s"+a_ogonek+" ju"+z_dot+" zagospodarowane i zostan"+a_ogonek+" pomini"+e_ogonek+"te";
				texte["automat"]["QueRoundDone1"] = "Na tym polu %PRODNAME% zosta"+l_stroke+" wysiany w tej turze, <br/>w kolejnej turze b"+e_ogonek+"dzie wysiany ponownie.";
				texte["automat"]["QueRoundDoneX"] = "Na tych polach %PRODNAME% zosta"+l_stroke+"y wysiane w tej turze, <br/>w kolejnej turze b"+e_ogonek+"d"+a_ogonek+" wysiane ponownie.";
				texte["automat"]["QueFieldMake"] = "Og"+o_ac+l_stroke+"em:";
				texte["automat"]["QueFieldToGo"] = "Pozosta"+l_stroke+"o:";
				texte["automat"]["QueRoundMake"] = "W ka"+z_dot+"dej turze: ";
				texte["automat"]["QueRoundMade"] = "Wyprodukowano:";
				texte["automat"]["QueRoundToGo"] = "Pozosta"+l_stroke+"o:";
				texte["automat"]["QueUses"] = "U"+z_dot+"yto:";
				texte["automat"]["QueGives"] = "Plon:";
				texte["automat"]["QueFutter"] = "Zysk czasowy:";
				texte["automat"]["QueTimeThis"] = "Czas produkcji:";
				texte["automat"]["QueTimeToGo"] = "Pozosta"+l_stroke+"y czas wzrostu:";
				texte["automat"]["QueTimeReady"] = "Gotowe o:";
				texte["automat"]["QueTimeFirstReady"] = "Pierwsze gotowe o:";
				texte["automat"]["QueTimeNextReady"] = "Nast"+e_ogonek+"pne gotowe o:";
				texte["automat"]["QueTimeRound"] = S_ac+"rednio na tur"+e_ogonek+":";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Lista M"+l_stroke+"yna";
				texte["automat"]["MilldoWork"] = "M"+l_stroke+"yn jest obslugiwany automatycznie.";
				texte["automat"]["MillDontWork"] = "M"+l_stroke+"yn jest pomijany. Wymagana obs"+l_stroke+"uga r"+e_ac+"czna";
				texte["automat"]["MillClearAddAll"] = "Wyczy"+s_ac+c_ac+" liste mlyna i dodaj ponownie wszystkie przepisy";
				texte["automat"]["MillShuffle"] = "(Tryb losowy)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% do %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Ca"+l_stroke+"kowity czas tworzenia:";
				texte["automat"]["MillTimeReady"] = "Gotowe:";
				texte["automat"]["MillStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie b"+e_ogonek+"dzie dalej tworzony.";
				texte["automat"]["MillStop0"] = "Proces automatycznych wypiek"+o_ac+"w zostanie zatrzymany.";
				texte["automat"]["MillStop1"] = "Po wykonaniu %FLDFROM% przepisu proces automatycznych wypiek"+o_ac+"w zostanie zatrzymany.";
				texte["automat"]["MillStopX"] = "Po wykonaniu %FLDFROM% przepis"+o_ac+"w proces automatycznych wypiek"+o_ac+"w zostanie zatrzymany.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){}
				texte["automat"]["number"] = "Numer";
				texte["automat"]["lack"] = "Brak";
				texte["automat"]["MillRecipesBought"] = "Ilo"+s_ac+c_ac+" wypiek"+o_ac+"w og"+o_ac+l_stroke+"em: ";
				texte["automat"]["MillRecipesUsed"] = "U"+z_dot+"yto og"+o_ac+l_stroke+"em przepis"+o_ac+"w: ";
				texte["automat"]["MillRecipesBake"] = "Max przepis"+o_ac+"w do zrobienia: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Poka"+z_dot+" tylko List"+e_ogonek+" G"+l_stroke+o_ac+"wn"+a_ogonek+"<br>+Ctrl: Poka"+z_dot+" Liste G"+l_stroke+o_ac+"wn"+a_ogonek;
				texte["automat"]["title"]["off"]["general"] = "Poka"+z_dot+" tylko List"+e_ogonek+" G"+l_stroke+o_ac+"wn"+a_ogonek+"<br>+Ctrl: Schowaj Liste G"+l_stroke+o_ac+"wn"+a_ogonek;
				texte["automat"]["title"]["on"]["farm1"] = "Poka"+z_dot+" tylko pierwsz"+a_ogonek+" farm"+e_ogonek+"<br>+Ctrl: Poka"+z_dot+" pierwsz"+a_ogonek+" farm"+e_ogonek;
				texte["automat"]["title"]["off"]["farm1"] = "Poka"+z_dot+" tylko pierwsz"+a_ogonek+" farm"+e_ogonek+"<br>+Ctrl: Schowaj pierwsz"+a_ogonek+" farm"+e_ogonek;
				texte["automat"]["title"]["on"]["farm2"] = "Poka"+z_dot+" tylko pierwsz"+a_ogonek+" farm"+e_ogonek+"<br>+Ctrl: Poka"+z_dot+" pierwsz"+a_ogonek+" farm"+e_ogonek;
				texte["automat"]["title"]["off"]["farm2"] = "Poka"+z_dot+" tylko drug"+a_ogonek+" farm"+e_ogonek+"<br>+Ctrl: Schowaj drug"+a_ogonek+" farm"+e_ogonek;
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Poka"+z_dot+" tylko trzeci"+a_ogonek+" farm"+e_ogonek+"<br>+Ctrl: Schowaj trzeci"+a_ogonek+" farm"+e_ogonek;
				texte["automat"]["title"]["on"]["windmill"] = "Poka"+z_dot+" tylko m"+l_stroke+"yn<br>+Ctrl: Poka"+z_dot+" m"+l_stroke+"yn";
				texte["automat"]["title"]["off"]["windmill"] = "Poka"+z_dot+" tylko m"+l_stroke+"yn<br>+Ctrl: Schowaj m"+l_stroke+"yn";
				texte["automat"]["title"]["on"]["type0"] = "Poka"+z_dot+" tylko pola<br>+Ctrl: Poka"+z_dot+" pola";
				texte["automat"]["title"]["off"]["type0"] = "Poka"+z_dot+" tylko pola<br>+Ctrl: Schowaj pola";
				texte["automat"]["title"]["on"]["type1"] = "Poka"+z_dot+" tylko zagrody<br>+Ctrl: Poka"+z_dot+" zagrody";
				texte["automat"]["title"]["off"]["type1"] = "Poka"+z_dot+" tylko zagrody<br>+Ctrl: Schowaj zagrody";
				texte["automat"]["title"]["on"]["type2"] = "Poka"+z_dot+" tylko wytw"+o_ac+"rnie<br>+Ctrl: Poka"+z_dot+" wytw"+o_ac+"rnie";
				texte["automat"]["title"]["off"]["type2"] = "Poka"+z_dot+" tylko wytw"+o_ac+"rnie<br>+Ctrl: Schowaj wytw"+o_ac+"rnie";
				texte["automat"]["title"]["on"]["all"] = "Poka"+z_dot+" listy dla wszystkich farm";
				texte["automat"]["title"]["off"]["all"] = "Ukryj listy dla wszystkich farm";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"Ten skrypt s"+l_stroke+"u"+z_dot+"y do automatyzacji produkcji na farmie."];
				texte["automat"]["hilfe"]["botStart"] = ["Jak to dzia"+l_stroke+"a?","Je"+s_ac+"li klikniesz na dole przycisk '"+texte["automat"]["botStart"]+"' rozpocznie si"+e_ogonek+" proces automatyzacji.<br>Mo"+z_dot+"esz kontynuowa"+c_ac+" gr"+e_ogonek+" samemu dop"+o_ac+"ki nic nie b"+e_ogonek+"dzie gotowe. W"+o_ac+"wczas bot rozpocznie symulacj"+e_ogonek+" klini"+e_ogonek+c_ac+" za u"+z_dot+"ytkownika. Podczas tego procesu nie powiniene"+s_ac+" przeszkadza"+c_ac+" automatowi."];
				texte["automat"]["hilfe"]["Pole"] = ["Field","U do"+l_stroke+"u ka"+z_dot+"dego pola wy"+s_ac+"wietlana jest ikona. Je"+s_ac+"li ikona pokazuje <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b"+e_ogonek+"dzie zatrzymany po zako"+n_ac+"czeniu bie"+z_dot+a_ogonek+"cych operacji. Na tym polu nie b"+e_ogonek+"dzie nic siane ani produkowane do momentu wybrania innej opcji. Je"+s_ac+"li wybrana jest ikona produktu to b"+e_ogonek+"dzie on wysiewany/produkowany w nast"+e_ogonek+"pnej kolejno"+s_ac+"ci."];
				texte["automat"]["hilfe"]["queue"] = ["Plan zasiew"+o_ac+"w","Je"+s_ac+"li w opcjach zaznaczona jest lista zasiew"+o_ac+"w, klikni"+e_ogonek+"cie na ikon"+e_ogonek+" ro"+s_ac+"liny na wybranym polu wy"+s_ac+"wietla list"+e_ogonek+" produkt"+o_ac+"w, kt"+o_ac+"re mog"+a_ogonek+" by"+c_ac+" uprawiane. Je"+s_ac+"li t"+l_stroke+"o danej pozycji na li"+s_ac+"cie jest czerwone, to znaczy, "+z_dot+"e do listy zosta"+l_stroke+"a dodana ikona zatrzymania produkcji gdzie"+s_ac+" przed t"+a_ogonek+" pozycj"+a_ogonek+"."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Zap"+e_ogonek+"tlenie","Ikona \"Zap"+e_ogonek+"tlenie listy\" oznacza, "+z_dot+"e po w"+l_stroke+a_ogonek+"czeniu zasiewy b"+e_ogonek+"d"+a_ogonek+" realizowane \"w p"+e_ogonek+"tli\" tj. po ostatnim zostanie wysiany pierwszy i tak w k"+o_ac+l_stroke+"ko."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Losowe zasiewy","W"+l_stroke+a_ogonek+"czenie opcji \"Losowe zasiewy\" spowoduje, "+z_dot+"e do uprawy b"+e_ogonek+"d"+a_ogonek+" wybierane losowo pozycje z listy."];
				texte["automat"]["hilfe"]["stable"] = ["Zagrody","Na dole ka"+z_dot+"dej zagrody wy"+s_ac+"wietlana jest ikona. Je"+s_ac+"li pokazuje </div>"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b"+e_ogonek+"dzie zatrzymany po zako"+n_ac+"czeniu bie"+z_dot+a_ogonek+"cych operacji. Je"+s_ac+"li wy"+s_ac+"wietlany jest produkt, to b"+e_ogonek+"dzie on u"+z_dot+"ywany w zagrodzie. Po klikni"+e_ogonek+"ciu na ikon"+e_ogonek+" mo"+z_dot+"na zmieni"+c_ac+" produkt oraz ilo"+s_ac+c_ac+" jaka b"+e_ogonek+"dzie u"+z_dot+"yta do karmienia. Klikni"+e_ogonek+"cie na ikon"+e_ogonek+" pozwala ustawi"+c_ac+" ilo"+s_ac+c_ac+" karmy za pomoc"+a_ogonek+" suwaka lub zmieni"+c_ac+" rodzaj karmy."];
				texte["automat"]["hilfe"]["factory"] = ["Przetw"+o_ac+"rnie","Na dole ka"+z_dot+"dej przetw"+o_ac+"rni r"+o_ac+"wnie"+z_dot+" jest ikona i podobnie jak w przypadku p"+o_ac+"l czy zagr"+o_ac+"d wy"+s_ac+"wietlenie <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b"+e_ogonek+"dzie zatrzymany po zako"+n_ac+"czeniu bie"+z_dot+a_ogonek+"cych operacji. Wy"+s_ac+"wietlana inna ikona informuje co jest produkowane obecnie."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"W opcji \""+texte["automat"]["zonePairing"]+"\" znaczniki pozwalaj"+a_ogonek+" ustali"+c_ac+", kt"+o_ac+"re pola wchodz"+a_ogonek+" w sk"+l_stroke+"ad danej listy zasiew"+o_ac+"w, co wed"+l_stroke+"ug niej b"+e_ogonek+"dzie wysiewane oraz doda"+c_ac+" dodatkowe listy zasiew"+o_ac+"w."];
				texte["automat"]["hilfe"]["windmill"] = ["M"+l_stroke+"yn","Lista prodkucji dla m"+l_stroke+"yna dzia"+l_stroke+"a podobnie jak lista zasiew"+o_ac+"w tylko, "+z_dot+"e tu wyrabiane s"+a_ogonek+" przepisy.<br> Lista produkcji dla m"+l_stroke+"yna posiada dodatkowy przycisk <div class = \"queueButtonAddAll\">&nbsp;</div>, kt"+o_ac+"ry mo"+z_dot+"e by"+c_ac+" wykorzystany do wyczyszczenia bie"+z_dot+"cej listy i utworzenia nowej na podstawie zakupionych przepis"+o_ac+"w oraz ilo"+s_ac+"ci produkt"+o_ac+"w w regale. Je"+s_ac+"li lista pod"+s_ac+"wietlona jest na "+z_dot+o_ac+l_stroke+"to to znaczy, "+z_dot+"e jest za ma"+l_stroke+"o surowc"+o_ac+"w do produkcji wszystkich przepis"+o_ac+"w.<br><br><b>Uwaga: </b>Przed pierwszym u"+z_dot+"yciem, je"+s_ac+"li ju"+z_dot+" zakupili"+s_ac+"my, przepisy konieczna jest wizyta u handlarki lub m"+l_stroke+"ynarza, aby automat wczyta"+l_stroke+" zakupione przepisy."];
			break;}
			case "pt": { // I need a translation :(
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "ro": { // I need a translation :(
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Farmies Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "ru": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "se": {
				texte["automat"]["automat"] = "Automaton";
				texte["automat"]["pflanze"] = "Planting...";
				texte["automat"]["warte"] = "Waiting...";
				texte["automat"]["giesse"] = "Watering...";
				texte["automat"]["fuettere"] = "Feeding...";
				texte["automat"]["pflanzautomat"] = "Seedingmachine";
				texte["automat"]["futterautomat"] = "Feedingmachine...";
				texte["automat"]["fabrikautomat"] = "Factorymachine...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Start Automaton-Bot";
				texte["automat"]["botStop"] = "Stop Automaton-Bot";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Shall the planting machine be displayed?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Shall the feeding machine be displayed?";
				texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
				texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
				texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
				texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Yield:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			case "tr": { // translation thanks to Cilek Kocak
				texte["automat"]["automat"] = "Otomat";
				texte["automat"]["pflanze"] = "Dikiliyor...";
				texte["automat"]["warte"] = "Bekleyin...";
				texte["automat"]["giesse"] = "Sulan"+i_dotless+"yor...";
				texte["automat"]["fuettere"] = "Besleniyor...";
				texte["automat"]["pflanzautomat"] = "Tohummakinesi";
				texte["automat"]["futterautomat"] = "Beslememakinesi...";
				texte["automat"]["fabrikautomat"] = "Fabrikamakinesi...";
				texte["automat"]["millautomat"] = "Millmachine...";
				texte["automat"]["botStart"] = "Otomat-Bot'u Ba"+s_cedilla+"lat";
				texte["automat"]["botStop"] = "Otomat-Bot'u Durdur";
				texte["automat"]["zonePairing"] = "Zone pairing";
				texte["automat"]["debug"] = "Debug Info";
				texte["automat"]["recover"] = "Recover Info";
				texte["automat"]["windmill"] = "windmill";
				texte["automat"]["timing"] = "Timing";
				texte["automat"]["general"] = "General";
				texte["automat"]["development"] = "Development";
				texte["automat"]["msgUpdate"] = "Otomat beti"+g_breve+"inin yeni versiyonu bulundu. Kurulsun mu?";
				texte["automat"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
				texte["automat"]["valUpdate"] = ["G"+u_dots+"ncelle","Checks whether an updated version of this Advisor script is available."];
				texte["automat"]["setvalAutoPflanz"] = "Hasat makinesi g"+o_dots+"sterilsin mi?";
				texte["automat"]["setvalWater"] = "Shall the fields be watered?";
				texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
				texte["automat"]["setvalAutoFutter"] = "Besleme makinesi g"+o_dots+"sterilsin mi?";
				texte["automat"]["settMin"] = "Otomat"+i_dotless+"n minimum t"+i_dotless+"k gecikme zaman"+i_dotless;
				texte["automat"]["settMax"] = "Otomat"+i_dotless+"n maksimum t"+i_dotless+"k gecikme zaman"+i_dotless;
				texte["automat"]["settMin2"] = "Otomat"+i_dotless+"n minimum bekleme zaman"+i_dotless;
				texte["automat"]["settMax2"] = "Otomat"+i_dotless+"n maksimum bekleme zaman"+i_dotless;
				texte["automat"]["setToDefault"] = "Set to default";
				texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
				texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
				texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
				texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
				texte["automat"]["set12b"] = "Delete Completed.";
				texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
				texte["automat"]["set18a"] = "Delete all mill queue data";
				texte["automat"]["set18b"] = "Delete Completed";
				texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
				texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
				texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
				texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
				texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
				texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
				texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
				texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
				texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
				texte["automat"]["fields"] = "Fields";
				texte["automat"]["titleGeneral"] = "General queue";
				texte["automat"]["titleQueue"] = "Queue";
				texte["automat"]["QueCopyTextHeader"] = "Copy queue";
				texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
				texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
				texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
				texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
				texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
				texte["automat"]["QueClose"] = "Close this menu";
				texte["automat"]["QueCLoseAll"] = "Close all open Queue windows.";
				texte["automat"]["QueMin"] = "Lower value";
				texte["automat"]["QuePlus"] = "Increase value";
				texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
				texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
				texte["automat"]["QueUpButton"] = "Move Up";
				texte["automat"]["QueDownButton"] = "Move Down";
				texte["automat"]["buttonTimeLine"] = "Show field timelines";
				texte["automat"]["buttonOverview"] = "Show overview of automatons";
				texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
				texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
				texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
				texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
				texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
				texte["automat"]["stop"] = "STOP";
				texte["automat"]["week"] = "week";
				texte["automat"]["inftext"] = "Runs indefinitely";
				texte["automat"]["ernte"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
				texte["automat"]["autoPflanzeOn"] = "Used farm fields are ready at:";
				texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
				texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until
				texte["automat"]["QueDoWork"] = "Zone is done by bot";
				texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
				texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
				texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
				texte["automat"]["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
				texte["automat"]["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
				texte["automat"]["QueRepeat"] = "(Repeat mode)";
				texte["automat"]["QueShuffle"] = "(Shuffle mode)";
				texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
				texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skiped";
				texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
				texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
				texte["automat"]["QueFieldMake"] = "Total:";
				texte["automat"]["QueFieldToGo"] = "To go:";
				texte["automat"]["QueRoundMake"] = "Each turn: ";
				texte["automat"]["QueRoundMade"] = "Made:";
				texte["automat"]["QueRoundToGo"] = "To do:";
				texte["automat"]["QueUses"] = "Uses:";
				texte["automat"]["QueGives"] = "Verim:";
				texte["automat"]["QueFutter"] = "Time discount:";
				texte["automat"]["QueTimeThis"] = "Production time:";
				texte["automat"]["QueTimeToGo"] = "Culture time to go:";
				texte["automat"]["QueTimeReady"] = "Ready at:";
				texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
				texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
				texte["automat"]["QueTimeRound"] = "Average each turn:";
				//For the Mill
				//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
				texte["automat"]["MilllistTitle"] = "Mill Queue";
				texte["automat"]["MilldoWork"] = "The windmill is automatically maintained.";
				texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
				texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
				texte["automat"]["MillShuffle"] = "(Shuffle mode)";
				texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
				texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
				texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
				texte["automat"]["MillTimeReady"] = "Ready:";
				texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
				texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
				texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
				texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
				try{
				texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
				texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
				texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
				texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
				texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
				}catch(err){GM_log("ERROR texte Mill from game missing \n"+err);}
				texte["automat"]["number"] = "Number";
				texte["automat"]["lack"] = "Lack";
				texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
				texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
				texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
				//title
				texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
				texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
				texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
				texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
				texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
				texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
				texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
				texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
				texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
				texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
				texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
				texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
				texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
				texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
				texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
				texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
				texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
				texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";
				//help
				texte["automat"]["hilfe"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
				texte["automat"]["hilfe"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
				texte["automat"]["hilfe"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
				texte["automat"]["hilfe"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
				texte["automat"]["hilfe"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
				texte["automat"]["hilfe"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
				texte["automat"]["hilfe"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
				texte["automat"]["hilfe"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
				texte["automat"]["hilfe"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
				texte["automat"]["hilfe"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
			break;}
			}
		}
		//Icon images
		strImages["repeat_off"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAABoUlEQVR4nK2TQW7aQBRAfZ54wKEhEaA48djYhDiqMQdooKRpthjqdgHYSjcp66B0GYsDhB273IJUjdQcoVd4XUApVqqWViye%2Fnz90dOfmT8KoGyCjUj%2BS1T363x7evr%2BR9F0OmU0Gq1wPY%2FX8%2FzzzQ2WaWIcGiRJwjPRl4cHfK%2FGoX6AKeUSS0osaWIucKwybvWY46Mq0pD0%2B72lTHl8%2FIpjO1jSpFKpcHF%2BQdAO6LTbBCkCukGHE9flxHXxfT%2Fd0eXHS0xDYts269xRxbZ5%2B%2BYcQJlM7u6T24TZbGYoZ60zTEMSR9Faok9XV8t9Yfcde%2FldBv0BSqv1mgNd50P4fi3RKmEYUioUaTQaKNEgolQo0gmCpajb7awl7QQBpUKR01enz4vVoypCFX8VjcdjXuRy7OV36fV66WJ%2BZwctm0XTNOr1OjXPo%2Ba9xPO8JTXPw7EdhKqS286h7%2B%2BTGshms4nYUtnWNLSshhAqQl2wNUf9masCLZOlXC7%2FmqPVjobDIdmMICMEcRwTx9EirqyjOZPJXeqb%2FPb8uq7%2F8wtu7Pf%2FAH%2Fz8ulFilh2AAAAAElFTkSuQmCC';
		strImages["repeat_on"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAABqklEQVR4nK2T30uTURyHP%2Fe7ty533au79vJdEYEU0sA3V4ZdRNCFYb5jkMwNG7MmEnolJd4JzqSgCLop6jaC%2FoIEZ7%2FYVCbm6%2Bbcu6eLN96pw83Ii%2BfinO85D%2Bd8vucI0GlwKpJ%2FFr3%2FUjPPhj8y%2F7pES9HD%2BSIDqTw3kg2uj%2BXpT%2BSxRtewRtdQzwrq%2Fszd7HeaRM9e%2FeZMz1dkrqKLP1oT2fa48I1Lww2ZFt%2FtELi8jqwaikJwCAwbOmN1umJ1OmN1DBsfRT0Ct%2BDtp33TF10dL6GbLhqE8aV6092bshiE4AgAyiw42LNbLH8omQrFHXQHwtn2EkC9M66%2FLjy2jawSkcwmCqUqaAjMicqJRAcxJ7y9oYSDIrO7KA7hqbIvupLdOJHUnKqgOHRlyt6EvbxH%2BqUnCtoFdH%2BnrSi16KARByWg92n5cDFw7ydKVlEaziWLPkayiJEqYPwdBx8U0PAGSkPgkRe8Lzn%2F5Bd67KJJPNKV48lU0SR0zDQadOhEt1%2FsoWnQNPTlXPpyLlauxrWlffoPEH1eJfFmt%2FllH6Vjzm2bUcu%2F9j%2F8AfkMLDj%2BSRDIAAAAAElFTkSuQmCC';
		strImages["shuffle_off"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAAB4UlEQVR4nK2RzW4SARhF53U6%2F1YhKWVgBmYoA%2BpAcWmT2lJtrAuHtiSApRNWpcvKBNyV1I21ryArNnZDAnvfAF%2FhuDCpIQSssYu7%2BZLv5OZcARAeIg8C%2BS%2FQZnGTyXjMHSjsdAjDkDAM6XRClj2PRiP6l5f0ul3SqRRW0qTf7wMIQsJIkLZSpKwUlmlhxOP4vj8D%2FHhxgWM7JOIGpmni2A75XA43m8UyLU5OPiDs7pap%2BD4V3%2BfwfYUNO4OZNNkrlwGEer1GIpHAsW02nAyHvs%2Fb%2FX2e5vI8y%2BcpFIpMf07n63%2Fq9Uin0gyHw0Gv28OIG9hpm3qtNtMy42R4s%2Fea6XTKQtm3t98H48nkR8Z2sJIm7w4O5ty1z85mbgvFviiViMfWcbPu0gGWgqrVKtFIhNhajJuvN1x%2FuZ6DHR8dLW%2FUaDTQNZ3okwjV42MG3wZEo1G2Xm5xdfX57lmWJFz3T1vBcRw8z8PznlMsFFAkmUe6TqlYBBAa9QaaqqKpKpIoUvA83GwWTdPQVJXHq6u%2FZYsrK8iihCxKKJKMqiqUd3ZmardaLdbXYqiKgizLKIqMrmnomoYkimy%2F2kZoNpsEwSnBaUAQBH8Ve95uEwQBiiKjygrt9vni%2Be8TwzDuN%2F%2B%2F5hdpvvKVfR9GiQAAAABJRU5ErkJggg%3D%3D';
		strImages["shuffle_on"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAAB4UlEQVR4nK2Sy2sTURSHz35ci8vYhYumiBtfiDAhuKmKKMSSiiYWrGCxNH1ErJoxpPURISRgu1EEVzEmdVNBEAS7FP8DpRJMojWk1o6NSSad%2BVxMbQxNS8QuPrj3cs6Py3eOALIdbEvIfwXtcr3lyeySuh50%2Bc4n%2BiJZ%2FOEsvnCW1Juf6mbND2d0tW%2BiwNnxz0j3PHLoPQPRPICIHCvQxJGPHL6UIzNXVQF59a6u9t4uorg%2BIEfnEXfOrjuj27hzHB%2FOI3sCFvuuWewds%2BgatRAvyOkKzouLZOZM1TX0HTmhIz0m4gXnCDiuYtd5YYcfWjrqSViID4JP6%2Fgf6IinjPjgQMginLJYd%2BKDjpG%2F7q1chNMW07MGyoVlpB%2BctxoNfziVMJveNp2K40oJGTBRhtkQ0vb4u%2B8uIQEDCcJYahUt%2BWtD2Mn7pa1%2F5En8QAIryE1Qpy2mXtZQBhfZr5XQkuWGk8AKu0cXGveO8QJd2lec2gKdoSIS1JEIOGK2F8%2FUMhI2kRsVZKhEZ6iI4%2Fo3JAISMlAGv6zt0aSBRKoNonDwcbNIb7KOEgOJYtdMGvY5CnLPxB3LI%2F6ZMuczFc6la%2FQ%2Br20pNv66gj%2B9iueZicRB4tD%2Fotp6j9pl56M2x%2F%2Bv%2FAYjnimH96%2FpaAAAAABJRU5ErkJggg%3D%3D';
		strImages["rotate"]='data:image/gif;base64,R0lGODlhEAAPAKEAAICAgAAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEKAAIALAAAAAAQAA8AAAIrlI%2BpAOGgTnM0xAmlTS9yF21CRSGlQZrVcaKkKKqxNylBZmDhiy8U4wkiCgA7';
		strImages["minus"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK%2FINwWK6QAAAClJREFUKFNj%2FA8EDKQAkAZSAAMpisGuGcQagAEFCi28eLD7gdjgJTkeAMUo9xhLWaTjAAAAAElFTkSuQmCC';
		strImages["plus"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK%2FINwWK6QAAAChJREFUKFNj%2FA8EDKQAkAZSAAMuxUBLsUoNZg0gNxPC4BAdTp4mNrYBvNHfMGxUbs8AAAAASUVORK5CYII%3D';
		strImages["reload_all"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeBJREFUeNq0lEsoRGEYhg%2FjmksZcivkspIslGwoFohcSixkx2Kk7Ni5bIaNhWthocbIzlIoSaFYkIQikdhKNBkZl%2FH%2B03vq6%2FTPSPLVc%2Br83%2Ftfzve%2F37EZoSMF%2BMGH8Yew%2FZDvB7VgH%2FiCaKJAAojnep882I%2BRA4rAKiccggqLJhl0gXXwQN0tWAJ1IDLY4gVgBlyBd0408QAndVlgy5KXvIEp3Ual4FoIP8Wn%2B5lrYWn2xPgKaANloBsciNyk3CANXDLxCEZAKpjn2CywU%2BsUi%2FRoqhED3Mx7eaeBGOPgK09rhgO0ivdocE%2FtTIg7zQSn1M0rN2SAYX6NmjghxEegBpQw3wwa6KI1EA6ywQtPbYaH4%2BWsjNEB7mjRRs2pjjUX%2B2W5rzHNvE7mDiLwSKILVKmeNeITNqWN5bKLu%2FOxNHFBnGp%2BlVFFy%2Frpe91Fqgm5wEXdBagEhaCaZZGRwcP5aZ5AmJ7fYZPpIg%2BcU7doMYObNjbfXTp3tYj6LoB0ywb5YEM0pXnyJtFbg6Dd0ifTcpEwMCeSZ2Ac9HH8RuTU%2FyyRh%2Fn4bcdHs9F8QSY%2BgV5qY2l7r0WjXLoM6kP9u1QUg1Gwy1JsggHhFhnqJ7rNDRwcizD%2BIVQFhug2bXwLMABxaqOs9lkr9wAAAABJRU5ErkJggg%3D%3D';
		strImages["singleArrowUp"]='data:image/gif;base64,R0lGODlhBQAJAIAAAP%2F%2F%2FwAAACH5BAEAAAAALAAAAAAFAAkAAAIMhBEXibz2FIOzHVQAADs%3D';
		strImages["singleArrowDown"]='data:image/gif;base64,R0lGODlhBQAJAIAAAP%2F%2F%2FwAAACH5BAEAAAAALAAAAAAFAAkAAAIMDA5hqJh72otLJlcAADs%3D';
		strImages["timlinebutton"]='data:image/gif;base64,R0lGODlhFwAXAKIBAG1MG%2F%2F%2F%2F3FoUpiLZYhzTm1SNHthPF1BGSH5BAEAAAEALAAAAAAXABcAAAOIGLrc%2FjBCAoAhpBQj1dgLwIhRFgyCUgTCGoAOxwzLwRjyQnAC0Rgk36thgxQZO8YqtzAcA5gA6SV0PJW1k4NgczJzlkNVcSgzNS5pbwahBXI4qLYzVHADR%2FfDN8Uv9HpWSjZCgToqVjKAWBoOAwcyF2%2BIb31EaXhVB5ZWB5hvByl0eGWln6OjCQA7';
		strImages["gear"]='data:image/gif;base64,R0lGODlhMAAwAPcAADQCBGSCZJzWnDQqZGSCnMzW/GSqnDRWNMz+zDRWZJzWzJyqnAQqNMz+/GRWnJyqzGSqZJyCzJxWZPzWzGQqNJyCZMzWnGQqZJyCnPzW/GRWNGRWZMzWzMyqnDQqNPz+/MyqzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAB8ALAAAAAAwADAABwj/AD8IHEiwoMGDCBMqRMghA4KFECMiXMChIoeCFSVqPIiBYoYGHAoItJhxo8kNBEJaBMGBZcOLJhVaHBgAQ8UMJFtyaOAwZkKdLEE8sFggZwEEOFn6NCg0Z8WiIBZgIDB1wQIQPHV+KBkzwIKhHIYGfRBgg9mzDmoOhQrVp9kKD8QqAFEWJYaaBCoQkJD3K0mlJssmuMrywYINaQOkJYB3qmIMYjnMjbkhwQaKcw/nnVoBw93NnKle1WqSgFmKIBTc3eC1o1XPjKl6Vnv1gU8CBB4IBWEgN+CBDzqEliraMAiNwYOjzmwTJtPXsqVepSjRb9jrhh9MkEl8AQGp2b9C/5QatrYF3YYhlvcsFXIHw1IVLgigs6JuBVYjgugguqPhCF8toBAGDnSA324CgCCURBzwB6B/X/GHQUJl5fXdV6mNJhF8uQX4AAEabJCQaXWhtMB5QlEX0QMdQSbdBgwIiBAGZgl2mW4JXiVRVC4C+IBZ8tUl5GhD6VZdgB7KiJBhjlV2GUujqbgQi1d1FEFHx0V02GVz2RdWlgN66FpHDWj5ZGEtBaWAcwfFhaRh34EpE1gcIMDSmpIpaGRBdkYVlY9f3aWlSwW4FFROkaEXYXhVsRjRZSqBgEBRFRnqJY4KfqnbYR5s0NGjl221FZU7pVbpX3Mp8B4HhzHggasiLuxE12lF0XjABgawROlKXbY0l2EDuAoAAwGMd9YGHJR16wGdUqTSs5WuyRIGr3rgAQHbLeSdBgmEeJZlyxK6EqUuDbWBtSlVx9oGt0Jg1gEXHDBABy8lJVVZdEYlFb07bumVQBW8exlIFzUQgLXWHkDvU0puVBOYrBJAwQYuZXQws8xuQG7DSw0EArt0VnQuwtZS9GOxHRvELpYWrZYAwrd6EICcKQsk8FkTbsUuyRqwWbPNB7x8wK0EDNQByQl08LPKB1AA763OcUCABwdIufRAW76MbEFRdUDz1aNGVcFvYJdt9tlop6322hIFBAA7';
		strImages["copy"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFYGBgAAAA%2F%2F%2F%2FhOOiKAAAAAN0Uk5T%2F%2F8A18oNQQAAACtJREFUeNpiYIQCJihggLKQBcDyIAhmIVQwMqCrYKCCCnRb4O5AcylAgAEAYrYBDtxJwuMAAAAASUVORK5CYII%3D';
		strImages["PRODSTOP_30"]='data:image/gif;base64,R0lGODlhHgAeALMMAN3Mu%2B7u3e7du%2F%2Fu3f%2FuzN3Mqu7dz%2B7uzNvKpdO%2BlgAAAP%2F96P%2F%2F%2FwAAAAAAAAAAACH5BAEAAAwALAAAAAAeAB4AAASqkEmQqr04JyQ7qkKwjGRpjseXANKHiGccGxVDIbKp7Hy%2FCBdYbtQrKkaU1XC5Ix1Ay1yzVDlEYzzTx3rVHbUJbpf4BYu709N2vMjG1icjKa0OM%2Bflt12KN6bhWCV%2BbguAOmwjhnOIiXtePldrRYwkhnmMgJeYe5qbAm2QlBU4lCdPiqUfQAkDpSQ3NlWuSR1JAAIDAQQBAwe5u72%2FAQerCR0SAgUayxksEhEAOw%3D%3D';
		strImages["PRODSTOP_25"]='data:image/gif;base64,R0lGODlhGQAZALMAAAUEBZSUiODOrPHn1fv74u/iylFTStjFoPz+7SknJHt8caypmkA8OBweHNrVw8TGtCH5BAAAAAAALAAAAAAZABkAAwTWEKFxahXXWlyLREVHIGNJfhJBcNMhmDCyKHStLKHjDueYSgaAcAgwDHQHR285Kjiez0bCQzkMYljJgAEwYa5ZGEFR9K0Oqk+Y4GAYT4hvOgxye7xoJqqUACiYciYBCYQAAQgOfnoYc0sBAQQPDQ0LlZUPEoGOhwhBREIGI4wxjyUPlqiYcWhpEqV7eqJWR08Fg4QJkLGZaAsGQYd0P7JgpXRYo49qy3RfAQCEClnDcBgvu8JVAjzHegNfBw8F01gqOkoUAg5XYO0q7QUPBx5aHBr3+PMSEQA7';
		strImages["PRODSTOP_15"]='data:image/gif;base64,R0lGODlhDwAPAMQXAP%2F%2F7%2Fv34evexfTv1%2B7nytO%2Bf%2FPrz%2BHTsP%2F758uxM9rHn9nFiufYttzLpv%2F%2B6t%2FPqv%2F%2F6tfDmtzKpf%2F%2B6f365AAAAP%2F96P%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAPAA8AAAVk4LVEzWOeZrQkI2FBcAxNg9QCk6VbVd8PEUXAsSvyXgcJJWc8WhwMJdNY0UGlOp%2FzGV3uqtXd1ev09cZMbXGsbkIjAUi4%2BXwoBL6Jfj8BGIJ3FAgUhIUUfwUiEgoNjY4NEhGJIQA7';
		strImages["PRODSTOP_windmill_52"]='data:image/gif;base64,R0lGODlhNAAxANU%2FAKt2Q9CtdYx5VurUo9S4ieLMmq6JV5WHadvHkjY5OndoSWlsZ7ule%2BrRnqqTbOXEjebRo9jPrenKk6%2Bkksmzh%2B%2B2cZFjMquZc5iFWOTJlfXxuHFcO7WUZeLGkd7JnMWaZ1JMQOrOmMuRTKOMaLSect7IlWxfRcKtguvWp%2BPTqNzAjeTPn%2BO8gtXEmdjClNzFl4x7YNO9kO%2FgrKF6X%2B7Yot%2BvV19RZ%2FCZWoxyTezLkUczIO3YqV1KLmxYPgAAAP%2F%2F%2FyH5BAEAAD8ALAAAAAA0ADEAAAb%2FwJ9wSCwaj8ikcslk7naVaOVGpdZ8SUQuR7iJqrmodSoqfz4igwFgaQNwlh6vB%2BIlEqCETjf8TGtlAB9sbQo9cjw8ezo%2Bez53j3c6d5KVdyA6mDo8RY2NCY2MjHqkk4t4mSB1domJdaogdKp4bTNEioqLp3t3uaausKqtsbFzdIexOHC2RJm%2Bur14vTyv1Dw2dHPGh9zIOA7KFjhFrbp7w7DWwt09JuwKC4fxIDAMDjNsDuSIiZvq1KpkKXDXYwG8eAoSKlzYAwYBezPw6RuyQFuri8fiFSy4wAS8gwI%2BJsSxAMdHhwwmfJhhwEKRbnG0yeNmsKDHkyYNblCwocdO%2F4PxCCAIcEYNAAa3DmE7hE6VOxM3FZgUAKOqgKsCMADAYMBBSgZcCJwJRE4qjAMR0c7gymGEAwMk4solceECAwYkHJDwwZdvDASACQgmQBQAgCIAalTYgkAw0Qt59ZJgcOIEBQIUMlem62DEgREjfDg4MeGEYC2EzxwmIkhEAMCNhSIoUUBFCRUqXOiOwbuF7xKycyDwUYHAjgg5IkR4QqBCgBurhwAIECC5dQTKV2h%2F8GCAhBUQCnjokKJAgQ5ClxNHcLz9DsCL0dwg4mB6jvbCcwxAkWI%2FCgkoDADBChl00IF2HWTA3g598bVFck%2BEBYgIrBkQAAFbRPgADQOsEP8CDTmgEKCAIazQQQEpQBACe1pEocWCT7wXBRoU9vGBUPc9McAAHmwRwhMoRDBACBI0kEGDfL1YgWIZxsgYGTUK4cAHOca4YwYZhLCidShk6YGR4K3gQ4s13BBFGDto4ORzZUT5gx9NRihgDiuUUEJytKFYggQpNICCDw80F0UNYeSogZo75BDAhAYQ4VqVieonQQErFBBDCRGU%2BAAE%2FkGQgg8rEoCkDzHGiMANE7opwmKloqBfA%2Bbh5gKlKnSAQggi%2FqnCa4JVoIUPkCaaGhoBOErog66KKCCBHqjgQQorSODfDn8%2BUEMMzWEIbITUojDUDWNNJMSqD0rLaQSjNjj%2FwA77%2BTDAAxdykcOYOQrZwgNDETXIB44G4KsEOdSKXLp99TnAqI0BiylyCATKwq5EtcTvEK7FUIGdCaZQIgQQ7AlBA3xpt0MDKdwqQQe8jRlCAyGcJ8EDLHBHmAEiWDABETUQRgBttjUwQAMNcLojXwNAS7LPBYTwQgwqjFpgBytDwEIA9whCxAeLEvCCCi%2BsQEPQO%2BLaF4DaDVgpBA908DMNMrRNJAslZACeChMwsIa4P4ggGNcZmMexzz4f7IME5q7Q5woPSJDBfT%2FHyPKOIhbAAgUcoIW3Aaa9UEDf2qHAMad8USttittBzd0OXzewQ4kDyMDuAJJDhANSQ3AQ%2F8BllAa9QgMeignqrSmMTCkEHkgQgn40gJiD7vvtAC0LNXzAwAwWHECEARycoEIBEGTQoXZHhvwxybD3XUJ4IXDKO5E7UruDBCqwwEAA9gDAjBBwfcB1BxKYrR1fKCoAgHYkHg94QG7aYd2QCLQCAaHHOSdgwAjsxxoOkCAALijBA7QzKb5koGsQUNaAPPACF7TAAyiA1X66VwDNmSgDLMAM%2FRxggfv9AAAcMMCNCHCgDjSNYD6AwIFeYEAPmIdSBzTgiVT0ABdgxh4HsIAAiGCBHErvQi6IIRB94EMPuCAGXzShbkzINAMWoAROpAADLuAZE4xjCBYAgAA4oJfbYf%2BGApaxDAV6oxsCxEAzmQmkHv3Imz%2Fe5R4YEMAG3igEKQrALaC5C144Uxe8SLJudamLAy6wybpMhjIR5ExVLLABHjDyBz3AwQwOwErQOAADI8AADKhCFQxggJW3pEpVZjlLW7KSlbu8Sg%2BkYoI2NEMpG1iAMm9iAh5swAQb2IkylCEVBYQkIQJQxlW0whI1eGUQM4DDGy0AgzjEEQ5tEAc%2BuqIGBkjvDCNQgwHwYRj7zeAt9cEAXrrizjdwQwg6SKcF1qAACxRUAVVhCVow4ICGvnINBsAA9QTwBhzIE6IRbWhLmNIDISSiDamEQ0E3IA5lwECiB3DoQ7lyAMMoAx%2BAKeVKRLtyADXg4CKNTMQbxFHQOJjFpLL85QFsuUqJirMqFlUGVyTqALX0YA8u%2BYEFAppKAMCAmgY9yyphAIBfnqWmrJxBOUU6zZceYJcwwAcuovrUNiT0qmU961WzitWDDjMO71hIQrjBAwtwYgg%2ByMUw%2BcoNeDThsIhNrGKZEAQAOw%3D%3D';
		strImages["PRODSTOP_windmill_26"]='data:image/gif;base64,R0lGODlhGgAYANU%2BAJqCWlVOP6d3Q7ijerWpj0wyGJJnNOm4c4BWK11hTBURDnJxZnRmTR8bFM2IQ82sd0VBN5uJZ2tcRNeoXsu1itS%2BkkI1JrajflNFMn9wV15SPuybZfe9WI1%2BY%2FeZP%2FfcZkhMZ8hkJZmDXcOneGBob29UNYFhOrOedMOphYh1V62WcYRoRaaQbFkJGS8tKK6JVcWaY4p5XZaJbWhYPl1IKY5yTPLnvMu2jd7Cj%2B7Ok6mUb9XJpXhmSerYqf%2F%2F%2FwAAACH5BAEAAD4ALAAAAAAaABgAAAb%2FQJ9QaON4PjkPbiKAOV%2BDl4E34xVcwoLWpeByFd2wa%2ByCQBSFmpDsupoLEFogkAjQZvgZRCYwCHk0WjRyMwEzCVULPIuLATI3NQBCeAhaARBzIHQJiHg8IAA9MAIOQjQxqJEALzoDMA87NyoSFhI9OTgPDjBCDgc2tzY5OR8cOT3CPRcMFD07PTgOBEIvxzjHzzgHzxXPHSURz9AbpT4wxz3I6bg4ERkWOQcTOMjxDgJCOMDHNsDp%2FRdYHDCxQkS%2FHuR4hcixL0cFChQqVOiXoceBAxIu1HMiBMYBdBcaiGyAAUcGDQxuRGiWTt4LIQ8OXMv2rAGKHfRyRNCQIgKO2J8w%2FPgYMOHADZw3elhgsANnrKZQcewYgM%2BHjgc3sMbSICHWjaNfbxAgsIOAWDVDXzwYcDVCgwFmxxJgO6Au3LFodbxgpWNEAwsYMDDQQViGDAAydCQmXFWHgBcAYpyQwKByB8SoZKACENkwDyEyDOiIIWNBjUU1UC1SRIUHa0BCFtBYsKDOoEF16Awy5AmAAASSECD4jcAAAMJE9wpY%2FmKUkxsGaPhAQMNADQMIUgtYvEqHcRl7X8iAwQOLjxaiYxggXSN1%2B%2FY8EKA%2BHb9AbBKmhujfz19IEAA7';

		strImages["functionR"]='data:image/gif;base64,R0lGODlhDwAPAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAAPAA8AAAIcjI%2BpixAOn2R0SmdwXbHbnXgeqGhRRpbXqqVuAQA7';
		strImages["functionF"]='data:image/gif;base64,R0lGODlhDwAPAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAAPAA8AAAIdjI%2Bpy20AAwQynlkpvhFvB4ZiRn5lZz2olo6uWwAAOw%3D%3D';
		strImages["functionT"]='data:image/gif;base64,R0lGODlhDQANAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAANAA0AAAIYjI9pEMz5oFozNmRPphrPK4Xbx4WeQ34FADs%3D';

		strImages["mode_repeat"]='data:image/gif;base64,R0lGODlhDQANALMCABiI%2BqvI%2BQAAAIit902Q9ypz8gNN8Ory%2FgZ6%2B2yX79Xh%2Bkqn%2FEh26X%2B5%2BypX1v%2F%2F%2FyH5BAEAAAIALAAAAAANAA0AAARFUMhJa3XBisSKM85QMQZYGgRFGMUQBOg7FUgmpUGRSLQ9BYiCJFHIpCRAITJAqAUGAESDskAgotdFpQEALL5TDUBDrkQAADs%3D';
		strImages["mode_1time"]='data:image/gif;base64,R0lGODlhDQANALMPAEtJSkJBQmVkZZWVlXNxciwrKz49PlFQUYqJiX5%2BfYCAgE9PT4CAf6GgoDAvLwAAACH5BAEAAA8ALAAAAAANAA0AAAQv8MlJq33n1hAm%2Fx8AdA9hnoQALIsmAYIrEbJUANPB6jrg%2FLaCcFj4FWTCmqFWiQAAOw%3D%3D';

		strImages["arrowright"]='data:image/gif;base64,R0lGODlhGQARALMPAGAzHPvNoK5tTcWQZva%2FknZMMLN%2FWMBzTc%2BrfuuvfoJYP8eCXJtlRP%2Foudmabf%2F%2F%2FyH5BAEAAA8ALAAAAAAZABEAAATZ8L2iCrj26g2Kl5NBNA0RnGVCrAGRBORQPNWwJo6T7HmfDwhYw6NQGAYDw2K5ODifAsZhORoUjUjDQTB9Tj0UgWCEqBgRjoVBqWU6MIw4olH2GNBRgYERZQwCHRcMBQN0RH8KDFeLDAYVGQUCdFc2HJYARRmSCIcBOQsDDqGgCWUKGgJznEUMKjw8Cy8NGGJAhol%2BaUsDTU46F0drDpNFerxNvFxTDn4GXAYJDVasSrwHony%2BaVJTL4ODBXwLYs5ceXlSA6UUNESKi5lgRJkKIFfyFh4YGvMSEQA7';
		strImages["arrowleft"]='data:image/gif;base64,R0lGODlhGQARALMPAGAzHPvNoK5tTcWQZva%2FknZMMLN%2FWMBzTc%2BrfuuvfoJYP8eCXJtlRP%2Foudmabf%2F%2F%2FyH5BAEAAA8ALAAAAAAZABEAAATa8L2iCrj26g2Kl5NBNA0RnGVCrAGRBORQPNWwJo6T7HmfDwhYw6NQiAYLAUNwaDoPi2h00BgUjQkmw1NYOKMHpgHYQFSMCMY24wAfDAsD3IEoVwrwwvoSGCgNS0oCdGVEfhlEgBRXRQwKMGZFCAIYRRyXACMIhpMakglIDgMDbTmQiwwIfgIZDQEJCwM8Oy6FCmoOcgMGFggOX79RonaNsAICcgxtYVADULEGVVcMY0gHosdNogsMTQsvW2tLSchLYYHd3bKbCjREjoxFXFy3RCBn8xYeGBuLEhEAOw%3D%3D';
		strImages["windmill"]='data:image/gif;base64,R0lGODlhEAAUALMPAN%2Ff3%2FX19fz8%2FPb29u%2Fv7%2Fn5%2BfLy8u3t7fr6%2BvPz8%2Bjo6NfX19nZ2fHx8f%2F%2F%2F%2F%2F%2F%2FyH5BAEAAA8ALAAAAAAQABQAAARh8MlJ6zyWYsmcy4%2FHTMphWAahVEDiLNLiJEDmHAUAFMcHAg6DwVEDSQIIRMB4FDgFS5CnICl4MojBgKJFVAJBlCMaGjgEFoHDPPn4KG5LQg5aVewWQl5qeVf0f1JgQmN%2BEQA7';
		strImages["zone_off"]=new Array();
		strImages["zone_off"][0]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAMAAABZj73OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRF9OietathnI8%2FbGAQiHoqVkoCeHlXGxcCeW8ef4YvWlw4VVkaQUM2OTUVMy8W%2F%2F%2F%2FkSeAWQAAABB0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAOAjXRkAAAI1SURBVHjajJSJkuMgDESNjiCDIf%2F%2Ft9MtiDdz1FaUoyq2HlK35ByP1ur8PK72OFq76pjjw9hIm8cfYSJ4S1gRCzGzCEU4kd7qr3QkqCZiwR%2FIT0B1tEZkfAdKKSI6B7KGZSSyKO%2BsEj8aMx8e1TXw9Ubgt5pkYxE%2FqsSsVd1rHV7tG2MlehA5v1UpEsjXWqv7gJa7KzJa%2BwnkPIe8AWIADAi%2BYELW2EVU543guizh6ZL6oAydcxNCAx0xVDdCi6QkkCmKxtSqjUglYsXghinKhhCRhuySPWFu7riHpofPGDlBHMLjQlF%2FVyGCnlAflwdkg6ujYok8daCqsQ8cdYpmlXOyhOV6BJzqItMnbUtAOA70hBw177JM3gCQSnM55ZHHMzQScnaH4Z8LWRtID2DumByJ06ckWAI3QrK9jeBE%2BCVcWdwRH3guVomlGbADdNhWdCNpMKYl5Nixa%2Fqd2brU4BLcfDV2Cf1Oji%2Blqlx8tLKsFRJ50qsK%2BypJ8B3LCshICfyYRxJvWjayILpX0M3OTnmU44EOXo1hjvEPEmiiU%2BmvLfEl4CHFbKSVXHnZZbAfOULb4s0xMNYokE8tVwciXBk6KWszcox6Dx4Ge64fwDOAROfzlmvmNE74pNidnZahUOHuYy7tKLOfl7vkMvMk2pMLDCmvGvhipYanvpfjOfBUPB4P2Z%2B%2FQvYt6O7X83iWOXvcLv8vzrP3UYCQGaNn4E%2Bt%2F4p2X8f%2Fa3kSAXR9FiiB%2BBJgAN9SIFE8j2AJAAAAAElFTkSuQmCC';
		strImages["zone_off"][1]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAMAAABZj73OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRFpZ1SQ0kG4taG%2Beyec3Y%2BiYY4ta9nLy8MycBzVVka5OumQUM2OTUV1NuW%2F%2F%2F%2F3YzMqgAAAA90Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8A1NyYoQAAAhVJREFUeNqMlIt24jAMRKUgy5Id8%2F%2BfuzNyoA3dc9pJCMGZaz0QiOXs0Pl57uM6v97nNMmZ%2BPRX9Wkm02Z%2FbB3Q46duq8koaR1Lx%2BvhWGN8AET22vFQI%2FKOwscL%2Bs40OcYq7VBnMrE8K8hRTJAYa%2FvX5d4a7yhmZwERIseBj2aZyORm32ItuZHH0ZrggExVzxST%2FxBrYMsGpLXziAgPp5oqVrT3T2ZQ8UboBxGFYKkjVG%2Fjbi857ET6ZXcXF7NO4osZNzFnIFn%2BDYVtYDM%2FtKwSk%2BT%2BwhAiQXOrrmn3x92PplcUa71ygjziYMss2QTc3P1j%2Ba4FyTNG1GRE0Jm2X2ove%2FlNu1THECW2uxJjZg33XvX43n4sgR%2FaSCIxeScmgaSM3U7FnXL7aEm7ojHrinISaBJ1YTH0VuNS0ULd9s61F6IoyeOiQpDOQpJWYcIvcymPV5RwTBfKIOQohu1Yw4Hkiq5vordXLUq7E3JAK1U4AQtI6lr6TeKvKJxhxiDUkDyaCEQqyg1BUzaS3H0nxvYKJvNC8oZk5YRfZYLE8O9qcDlCU9jPhrxyrGocDrSoZUWZarPy8is7WY1RekXB159subGVbC2mT3xiNE5lWoyVWEYtzXI17A2E42ZNhF9xYlpdnv3EQOPEwR8y97lrP6jpRt3zKU%2FvHXWJ%2F67GCQ8gT8efrc78Xfgjmf4kgsv8o8r9T4ABAOePJPxoP9uNAAAAAElFTkSuQmCC';
		strImages["zone_off"][2]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAMAAABZj73OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFlJxmZmYk%2Bfrn%2FvCm8OOVfodZb3hLqrJ8iYQxusSR0dOW3em6VVkaQUM2OTUV%2F%2F%2F%2Fvz9GpgAAABB0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAOAjXRkAAAJASURBVHjalJTbkuMwCESRLUAXbP%2F%2F3043klOp2oedwVGixBw1t1gsrvsPdl0m5fobUkwuu%2B560moda4Ndrfn2rxGJEhtJ1%2FNz4TVUO35zH5Xn8f2mSsR9vghl6jyXxHmKiNbTTRVcMcOPEVQpH4SxjTnHwI5fxV3O092JYD8WUr6Rc3gfc3SGcB5TOp21b0THWYO5WPtCKg72DqR3ZNBdEAzBgRs9kQaktfs4XuRYCKCOnVpYH9KxhxaQOoiUZkA2hFjE1aWnQLkQhhNB4RYId8VqLzIQDS8kKhCIojDp6ZxaQgQqeB2LMdN0ErMSZigxghTNnAQIqtCoEk3LVrFg0gDJSpZhouS5mB%2FB78COChXeUGqhPj2dtx1YZDSoUj7pr8BSoc9vO0hMxIi%2BM5eSKqyXFcSFxFXo8Dl9GTIxzCRViOymmI0xEBgS79P7MX3k%2BVjDtXCIJVtpX4hwEE2zneKTDXoVsoSerYzSrj0sti0LvYYARZjsKgH3WnvsXAh4bXQPFVy60WwNxiAVenVpO5cLQ48eJXJhCNEPsY%2BJrpBql9bkDQz%2B%2BCipIpzJmTJKbyAQ45g22i4yq12isebMffXTMnrdiQ1PgCfjjwyENKiSeAucx45ChTIYzAV4ixsqBf%2F9di%2FkXSCFYaMOHGkfgzEhHDyTEnnuwGMpGk6qWBGpzmqsI4IriMSNbpZ4gNyIrylcDAGZ2rflUOOmCgvKEC4gYKKw%2Fv8zUHiAPUQePjjjNwa%2FZyHPc%2F3O7nT%2BEWAAeDwox7VxSqQAAAAASUVORK5CYII%3D';
		strImages["zone_on"]=new Array();
		strImages["zone_on"][0]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAiCAMAAAAj3NpiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFMCkCS0QZWFIn5OTkZF80cGo%2FkpdInqJobHIbQTwQg3xThIsxNDATLysRGRsO%2F%2F%2F%2FeL4JQQAAAAR0Uk5T%2F%2F%2F%2FAEAqqfQAAAKFSURBVHjalJSBcuMwCEQBY0fEWP%2F%2FubcLcpKZa26umsRNLT0tLEhi5vP61ZhARInlb8ZlbpLuz%2B%2FDXcMsIlQjQw1%2FVYmF79%2BpHWv4CXVwILBBpFLNvqlhHdeAAheNQBKihY2fw0MomnNGyNTWaRA7DZVr%2FIxhtcQUCTwYYNxqwAfUxvkzNiegyefMhnRx9hVzC5GbMoa4IiQ3Tjg5jnvl%2FoYUFLIHpFLW3xSCloXVcqNZ9twLon2tpvh2YsryJd%2BO04E9dMdwd4PVvlehWKScdAOPjtDCsVVoZmHngcVrgKaUK1xUgZnILKYuR3xHz6TaOKh2lEpTbAgEQytQ01lDyhDFNraj0VQWhqiMHDbjT6UKEtIqAStHKND0IshHg0HmOKLak1LVSVZibI8oNzpR5EYQLeytdrYVLWX8Z67osHtDmiT4NVFvtZPr35RVibQSS62Dki3H7BCzLIweWZ%2BjOloFY1rqdC0CTrWkVrmp9vKCiLdmaKeq5W2WJFaDutVY65phyfvTmLHuRRhPGIMElUsNIRp85PEjQZDSZt3DJrEIuonHpyUAHR3kLClZYnQQUenL%2F6JsqSGipN7u9aPByq3vArz9pCq3CxjkMbnDUDSBLFuitVK7j5micE7m7aSw4XhuyWETuoO44nWDrNYqSqoAl51FcbGg6syRzcdXVXfi%2Bdaik7gUJu6hKn9ggkeZil4XEC%2BpIqPKtShxxodeaS1QzBs9h4I4c2Dv85ulTTd4uN0HJrcZpBMbkQrOe%2FDAo6OjqGiq4hTzMXKT7Zpx7s%2FH8fifcTzHGBrANjS6nSde%2FQs9%2BnOesPjaiEFvSkZ83IV%2Fj%2Fum5G22NbY95i%2FGg8QfAQYARBYtCPYYox4AAAAASUVORK5CYII%3D';
		strImages["zone_on"][1]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAiCAMAAAAj3NpiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRF5OTkenZNIyYDVlQpmZxsh441REMXZWI5fXxVa3IbNDATLysRh4BYGRsOcHRP%2F%2F%2F%2FSbUjIgAAAAF0Uk5TAEDm2GYAAAJHSURBVHjalJTZdsMgDEQB2RKL4f8%2FtzOS7ThpH9Lx0prDZbQQkojM8S9NEUsqNkf%2Fj4aYpG52vJRzxbse9VLmjctvPND6jYEL7MhHjoFzmAvmkBKTD6zm5ezhxlyDKJ2CzjWwdrxxC6rwC%2FYIYvkoBjmgTVNv79hhjq0aRF0Phf0hDW4tv2NdoVHIrE9Vzzuw%2FdiObbsxLdAQld%2BUx1l32SVpYPXmBJBKmfOTi47Arjm2keEVBZCiMub84O5GomhtN2L0ut2qqQKipjpXX0zowuqDy6sHFNxDK175INabx7cx6MAIoJjYfWXam41br%2FVye7S7dmKw7Kzpevl4O82yhNseO%2BhMLWeU0hHH9LJxRhG3WLjtzx0JGWcb5OlZ2NQliBnCKBvQH1hVNXDDMdEySoQJmz5dpcic7xiiHl2wgxHcOGuJv7aUNsXrO4uNy616eNpZPTFlcobc8emYOTOLg11Kv7CapQNhzfFStAAnjK1qtFs270YieqR4YpjTL4yO1otwpyysXPpa5SERvdwU%2F3O6txgroM56YqOMD0xvjJCK5%2Ba4cDf%2F6dZZEyU2iMHO2R6PIfPASu%2BrekVxMYTZxbEuzI3dFX%2F8Qx0zumGbsJ5oDfOd3HPuJrv9JQQdQdY6YE55%2F6CGQ6Fowxz5jXEeQ6884PzLCz24SzRpaXeID6uQL%2Bg3cnZWho4mktJkrJiaPxlSLHEU%2BhIOyNZTSgNhZhxd3%2BlAYqrAEova9m3%2FhtpbQ3rJhR6Ort%2BJP7p0ahvze20kfgQYAMBcNxD0Ae3kAAAAAElFTkSuQmCC';
		strImages["zone_on"][2]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAiCAMAAAAj3NpiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRF5OTkZWpOT1EvNTkbh441nqFmQUMfX187foFufnhPa3EbNDATLysRGRsOh4BY%2F%2F%2F%2FnNS9VwAAAAF0Uk5TAEDm2GYAAAJ1SURBVHjalJXbYqMwDESxZCTf%2F%2F9zOyObbJKXbUUKTvDxSGNBLxGf408xgVxGrP8hdIjLpZ7WKypiVVxj9B3Pj5KI%2BVrv4Aoqjv29nvVemEGtS%2FvE6ueoHvYbax%2FYIxfXUnA1SZjqfjD8ZC3U6jdWS6QGCoWIGCgzWyWp2lqZmLaM%2B1x3R1mlplJSCqm6JLlQzKUsnrGgbKzsCIhzU8S2tIono3luqzo8TKu2%2FI4dwZrEPbi0r6KBAZCUDNtFzNpd7sLPy0BgvhWxsaKqGPBDZfrTskPt%2FlCrUMNsLJ6gYDoGsHownGVtLN%2FvFObi4AkOqg41g5ehRin6s7ZaPkkGB4sZyA2QKhAsIsaEiYetxOxJkt5jK5U1maIk25lyK%2FDBX4q8xY9aGH8cOZiJSTAloHTqCJvsH%2FZqEYMIktQDlSN19EqiscT6G0aIbrOV5AEeiFoOZ78xr4KHUPcOM8fiXooTqRsSnXTpLUmk1816D79hPU1L2%2FGUHmhwNVF2CdTYGJ0IH3ljojzo%2FWmWDXE%2F0Mt9HjVM6A9mh4jNJi6BE7JoNaREtdEybhkTjNIwmnu7AFrsOevZuygTefZHjZ7LUxtnRWZcmcK266X%2BRLgdtYDibqewRBeGncCcqofqoLrYsQTtwkMan1632DYmhnUIqB45o9g8tUnm9IjXICKm%2Bu7hHXNHw0thWuMMvJleYNpUPAkpOoYeSlRuA1i2S0cTqUgRyEO28AGBxiHFZw9I6HcbVLtmVLeRfQ5PSbUtJeydqJvj1tq4rmsMw5vyXvevYoEyBXbB1Nbyr6CcAXWKUW%2FiX9V%2BGfwvtGPydeKef4ibxI8AAwD7gTKmcpqQCwAAAABJRU5ErkJggg%3D%3D';
		strImages["help"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJVJREFUeNp8lFtoHFUYx%2F9n5z6zm91cbZqUGkNiUxtLY7V3SvviQxGFKr4oBV9E8KHgQ1H7UMQHUUQslAp58Fa0FC8UClofKlopbSP0loaYNE3CdjeXzW66u3OfMzN%2Bs01ASnHg%2F3TO%2Bc3%2FO%2F%2FvfCyOYzDG8PD33dnzmigwnTFBj4EsA%2BNxzJZ5GFoB9%2BxDBw9EeMTHHgYOf%2F%2BzKEviWkmSX1AkdbsgyBsEQWgL4zDwPL8Y%2BO4lx7PPLi7MX3%2F%2F8Fve%2FwJPfH1GlmVpv66l321vaduZ1lUxRUtxFCLgHK7P4bgeqqa9XK2VTy7MFT798L13Ko8EfvLFV4quGQcNLXd8TUdbrimtCNrIJYgzd5HJz0JyXJRbW1F4vA%2FlDZthe5yXSsUz47evHf52%2BMQSseIEKK6SibsDkfRxLtvUahgaLKuGHUePYKlcxiKtN5EGRRGDsoxTh94Edu0XNT37Smf3E0nZb5OcBCMcO3YMyDy2VmDSkWyuZVdzNgNFVeDZDu6MXMYPu3bj6oEXMbpnL5ao7PXTUyhU72N24yYomiE4jtfVtW7d8uj1v0cJyBsOOeebYlV4SZFFRFFEdwaomo77H3yEzYGH5uZW5Fpa8M%2Bz26C%2F%2FBe6JsdxYW4O6%2FUmyKrWphq51%2Fo3bvpzYmx0ogH0ebhVR8qIwghBwJMfQNd1AvXDSOug1GGbJnKWhSS%2BKU2DY1ug1JOrSgmi3Nfa0bkPY6PFBtB1%2Fb4wCClFHwrJdV1Qq0ASBbiOjXrVQ21iDFtOfo4x2n%2B5tx%2BiJIOHHIEfgnzooqxspaXzD4CO2%2BR5HrWEC5EggsCQpA%2BEYCZH5rdzeO70KRTGxvDNkwNY2rYHXS3tiGiL5%2FrwAl8Iw6iTDrQ3gASyLQrBMm1qpEbjUd8lfw5h1Zfx6pfDuJnP47OdexE99TQ6166HamTgU1%2FarkNQl87WE1SuAbRtM19TTGiUbkTOQrpHz0%2Fko1JaxPL0NC7mWmD29KG3qwd6OkuuQpiJCceBadX9xbl8lVByA2hWl2%2BxlG7LkqSH4QOQ69MVOAocL8Cvz2xHgaWQybYCgkwVBQ1ntbqFet2MK6VitVQslAjlNYALhdkbZOoKS4n7IipTVZJg5EbSYirC4sAgvJpFcSrkyKMwHNj0cmo1E%2BWlebs4M3GP86BMqEoDeOPKxfzAEP%2BRSeoQtU5WN1QosgQ%2FCMBCD0d%2F%2BQkXIobj6WZkqEfDMEadyq3VqsFiYXK%2BODM1TZh84m316blTt6%2F9TuWe9tdtfN0wmjTNMFidQnLqVZwjwIiioVIpI6DXynkM06wF5fnJwp2bI%2BN0fpY0kThcHQ5Jv2YYS23p6ul7o72773kj295GDcti7jPbrBKEULIKQdIi7jteZW7y3uzErakoDO%2FS2T9Il0jz%2Fx1fAqmNNETPaX9Hd8%2FuTHNHtygbaVoXaB%2BjWei65lKldG%2BmZNWrlRVnl1eUlOw%2FPGDFFehAKiUM0TvrlWRljSCIOjWnSM3vR5zTVInv07kEcJN0nVRIEn7kxF5xmiElnd9D6iY1k1RSMvZrpCJpNYjEabB6%2BF8BBgAdzmULFXvFdAAAAABJRU5ErkJggg%3D%3D';
		strImages["powerups"]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAeCAMAAAB0fZJ0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFT0Q16cuwdGQts4lwSzgszKubmicorKiw%2Fv78sDAxa0YQxaZRSTAO2cO3pYM557JxzctrzIyLt3dJk1Mo07ao%2Fs5m%2Ff2ujo1tkEQc%2BvM1UktH2MyF1MjNloU%2FmWQ3oVopiHpLpGU57bbDh1VWwH1JmmksaDIPtaxN%2F%2F%2BYr654qYZF5rGGmHhF9e3mmWhjp3k34dTE%2BOvZnYVJyINUq3FF%2FbFRzIJGiXY7uHM72phZdHN47%2BbjOi8nxXtyom5C9sdOp4pSl2Nex8NSeHJI9%2FLtr7CX49nVOCIbmns5%2F5WYpmhUrZdbtJGPsokasm46pGdpdGlFhHJQgWw5iW1mgFgXmFsy5%2BJJimQQelU1PAwH%2BvyJq3ZWqn16qWAuwItkt5JJ25to1JpJ%2F9brZVc5Y2RnZ2RIwaRmuIVb8amxl2hItpddeTIsTBcMmEskqUlAkV1llItV%2FOJzdUlJdWNbuXlW88ommZSXZlRI1K8mq54x5sSk%2F42DqpxJ8NvHTkMZo3RtiWVfZFQp%2BsmGj11Z%2BvrFiYBV%2BPTytIhCxlVI36dm5OBr5Z5Of108xK5w8fHvqW55wZ1I%2Ff7WmnEsh3Vte3uAyZJUnJRbwoGByJRqu3Z6m5aiYkYoenFspXsVmVtK0og8hoCG7J2nfVlU1qUejIWRlkQ7x7Rj%2BuhbwHc8fHlYZT8%2Fi2VB4JA%2F0o5c9fZz1c4mzolO6t%2FbcFkwdG1206F88ubEroBd7Otx%2BFFP6cKFa2xtkGEnmHJspVlx%2F%2F9pW042ekpUpnExdkcj%2FNKC49aKlY%2BdvG9awp2Fx5od%2FPr4r2c0mJY7bFpThnMqildF4uKJgnp4nmZzZ2JRnH51%2F%2BP4gjwTvb21oJx7pJyqXh4Hb15EIRoMf2tfr25sfYF0sGd32799Wjg4WltMWlleYV8nikEz3ZSi9%2Fv6sz046%2BXP%2BN2l%2F3x3wLqC47pz383Cnn5R%2F8HE%2BtDhhoY9b0w9pqJBnlMjz4dy7%2B%2BY7PCObkRN7ceV360fjpGQgFBSf19c%2F%2F%2F%2FFMHsBAAAAQB0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAFP3ByUAAAjlSURBVHjabJYLVFLpFsePiCMaWqEV2cgjhdLwERL4QINwxItpipCaoU5k5oM09ebcJjEzLcuyzHymWZn5nPGVllQ%2BmqsD6txeVqhdQ63u7WbOWMxMNgzzHc2yuv%2B1DgvY6%2F87%2B%2Bzzrb03pH0v1H8v37x588C0jg1K%2B7lQ7snPQfTAtL1c%2B%2F%2FCNpfh8PNk9w%2F%2FQXNf5MkTp31EarVa5OPQnPwpHbV2OtNSgVer8QpMwV6bz8iXp087zprr9NZ%2BwkbpHMWTg4K4QDFKsokipOEj79qrlgPKmXBMjHJAhNH7OPe1mfPMEkWz%2B3x2xtVKZRDXbLtzbm5u2xgSPSByNJqX%2BmUnSUwQcqwNRJ23myGVEp%2BCeanLpx3fm5vGVOgBPOblB7ZLpjqGO5b74Kv7QF89KG%2BDyCY%2BPXNw1F46OQjZ9oc%2BHL2vvyd3DDmgoHnMod0XqpXc0X%2FvAeEXL6weLGszA2a9OXaGEzYIWWX1w%2BWDB0%2BeXPrbv1ZYLRuTCjF678w64JnG9txvOP4MhUI9O%2B5xf48z1EXDvHtweZgkiFllZX9ujbs7bF5kFTeKxGNMZ9moNZIgKG%2FF76uXrl69ZcvvS3870roo704xEWM%2FW0y6krt948pt9%2B5tW2m08pdt934x3XjKrCsxZLbm0%2BogKG7Rdwd%2F%2FvZ%2Ff5MD%2FxZgDi8mWnrMsHXoSmZ6xZEb3x1ZtGFD77L7Xz5YdWRR3GixZWIGnNdCbFDS3afndu58Wpi2wS978bmVP%2B%2FcmgDhEvXe3ZlJcVp3aem3V65ceX5p%2FZLdu5csmGwvxoBbQ1q5E5kbHrdqw4bXvb1TU1PjUG7RsHmFFwcKnKmKjk8M8s%2FswsWFt2PfGG7urY7Nzn96bvE1M4hGA1V5FjYQM3iodt363QcO%2F8fgcObZ2nVLlqyr95sxQ1odUBGC%2Bet9U4hxWFIm13nPHX4eQYzE4TK0ckvlUN%2F%2BTYAcq1EZXtoMdcTGbsrPTzmP7CL2aLXJJkEQw%2FFsbe1RBwPADu30qTx79Gi9mxgpdJNDqAIy15fBMGeM%2B4bfCR8NHzWDcsv%2FuINghCMD8UbaZHUM9KcGgDs63jADWm%2F0qzo6NOwR9nkzJBGH0jYDM4nkWKmwsyxI3HUsB08CdLojLguYPaBkSyWUzmBMIcKLior%2B%2BbCo6OHDorLy3PZGfnsxMVi7RhKTsF8TX62CVEzDkkurv0cjkSro1av4PmSNpEFeqVRR3DodHUsUnYdCdp3uNI6KiLDzIeFqgLkH2uujDCfw%2BXxEO8Qc4jJhbS9rQ6b6MsIhmpu8eQA5bFFtWHJh%2Bebv3769tHRL65HW1s3f9HechwJFL20UykGKUIgXCYXCzpBdIVEOhw9H0IhCIS4QogVDaxRkX5jNT5UOmZkxpdIhZlEukzmO4PtCGKFN2AC03yIeiRZ4L4d14yTqYOs3AWhV%2FHmzQIXpWhHZ141EIuXgSCS7iIsFBQYGBokUEk5G4kOOblAYkVxFgfNOlTrrt0Gp0lH9MiYzFYFAcNox2AangVf%2BaZp4Jpos8P470PL13gI0VxUfr0nKUvQki8h%2BbiBnEyBZyBPexS%2B%2B4E3K4F817RgTKEzRVUWlUBhZ0ib9MWZqo7jIGUbz%2BQyC2EHSUIdNusZms39CotGG3hfevr1QAtDVGo1mf19NJWB3ESbtKBQ3TwrL6xgvOvpiCytHJpP153iKLfGgJl3peZMUfvEZ%2Fe1DQ2g0kzs0JG3kg5OTLnbA2xRgk%2B6m2Nqy05BoUHQg7wBuvEVaWpptQmSlHmCnW7uRcDhZS%2Ffh7pZo3SgqTgjYQhJF7EAE77Kryos12XhLP7ep7datsltnnMvONPIpFGrcoGWpvNlEfDcFwG1VgF0SEOD9Y4lUAx6EnZJQIzKy8enisKyN7ew8Q3kGBk%2Bio4xzSP05QMbWYstIyB7TFc6i8sXlZaBFlueWl5eVlze1IxgManoWPVLbTCw%2BlcJmp2nQhgJDQ0Oy4McLApXGwoKd0kfDe7j7dA1a23WSSDISq%2BXik2gWSQCyloEXa55F50HyEKE4jspIhZrKzIbAIeTC57AY0e%2FJ4riJ9LT2iq6Ea%2Bw0i2o0IKOBBBdKkKAo7GuDdKwcFYJPpdrlwCWWeXpFqliyQBOBDEfqtPZ1U5hCWlPMK445AyFlNuUyh9BSWKmIfnNrUJIBF21GIi7JP9aigwnYaDBY4PNiGB%2B7KWU40sdWC8yBfOMSUkCAQCBgtPw0KQN559gZH7L2BWZIa4PBiePM%2B8elSOdySDo%2BjkD093sah54gUCrTQK%2FqsXyVcC1WA84JF139RsUFmRtaPCrcOkgfAG00A5gpdjme1lQqNYrH20FleXntqKjYQcBV2sI9ticxi5NHNQdlcW5LhcHmgLwgjuOEhRu4C4aWBCoeT1a9AWW20FSjycWP8vOHWfQ0eDDpYbJ890VFJCZ2B%2FOin%2FB4vO5uB9eQB35O2AaY7U6kiau89ll7Nra3I0DGAFxREcXZQdedaf56PjVJd7eCk7EJ6NGjR5vYhYsXn0rPlLjMTFoaLdBPtyWYxyudEa%2Fb9ddfdatmzPBMe0mkNVZ5LTgR6ml8KPQE0IIFeb5RdcLZwfIsAobn5%2Be7Frq6uhaCj%2Fx8f7%2BFatPZmeYBMks%2F9ngF0A%2FwBWRVFeVkIn83i41EtCzfvH2r%2FgHUC18czrF6ScbcHA%2Bm4fqGt%2BYXjoyMXL9%2BfSQ7tm9ZpnpummpfwmbW6a9ra2tBH6%2Btraf4vTPP7hCmirpgPmeq9zWs3ilO3lV69PH3S0IGzcEhsu9P%2F9vZI9nZ2bcTqo5dHdj4YYcwAuYaPjX0xNdAoRRgrp81z7JRpiaYupBJDodAIHDSrR5nikrn707uwfi6uhb%2F4WH%2FM8PDy15M1GP15q8%2B9kTY7OdHSScQZszBGR%2FtbC66%2BMq6sMyJxxOZTvXqJ58sTihToojulLlwYmJhppMjlvfx1qWV9xBhMwjD5lKjT%2FdBrYtpMFEowWJNSnW%2F%2FHydfPayhwdHJSZsPZfPV82Ml7rBRAlWUsrb6PF%2BIftLgAEAiLKf3pFD0foAAAAASUVORK5CYII%3D';

		strImages["min-restore"]='data:image/gif;base64,R0lGODlhKAAUAMQAAPYCA%2F3V1gdQBupTUP%2FExP2oqXGeYP67u%2F%2F%2F2Kw8JVqISP6zs9MUFOgGBskKCvmXlyFBE9MHB8sbEv%2FfvOM5OSQ%2FEP%2FkwMolHOQWFoy8gPf2xv%2Ffu8wXDL4SBhlEGf%2F52iH5BAAAAAAALAAAAAAoABQAAAX%2FoCB4UGWeqAl5okimcLW2BjLdW75N%2Bm1pClHtxuv1Jr%2BgB5HoOJ9QaALhWTajWOe0%2BuEAvuBwuGNZdcVoMNnsTYsbnQ073AA07vgIXO45u8UdExV9HAwOERGHDIsMEhcMEYGDfm9feABxbAMPBAcLCwUPDwUFnwNxk22WeKwRmBupm5%2BeB7WzC6ewhIaHvYyNkIFsFKOlxrYHBacTmg8HBAsHAQW11cvNpNnHydeEFAUEndLh4QEHFKiEm9qkn9G46V0YhvS8vw7xHOvZt9bxEnXoCNwziQGxUtGqVSOQK9UfQLq6fFNIrmJDQg%2FH8JHH6MIFCfUW4YsoIaOajQAtRKWps8fMBZNf1vR5CVMmggEfJXDYybOnhC1LcErQ2bPoTyoCMiBA8KGp06dNlxoQoZQp1KtSW1TZyrVrlRYjvIr9KiAEADs%3D';
    
	window.setInterval(function (){
		now=Math.floor((new Date()).getTime()/1000);
	},1000);
 
	texte=top.unsafeData.texte;
	delimThou=top.unsafeData.delimThou;
	regDelimThou=new RegExp(top.unsafeData.regDelimThou,"g");
	delimDeci=top.unsafeData.delimDeci;
	regDelimDeci=new RegExp(top.unsafeData.regDelimDeci);

	if(texte["automat"]==undefined){ loadLanguage(LNG); }

	GM_registerMenuCommand(texte["automat"]["automat"]+" "+"Update", function(){
		location.href=USO_Source;
	});
	GM_registerMenuCommand(texte["automat"]["automat"]+" "+texte["scriptHomepage"], function(){
		window.open(USO_Home);
	});

	var loc=new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname);
	if(loc){
		SERVER=loc[1];
		USERNAME=unsafeData.username.slice();
		switch (PAGE){
			//case "dbfehler":
			//case "wartung":	break;
			case "main":	do_main();break;
			case "hilfe":	do_hilfe();break;
		}
	} else {
		do_login();
	}
	GM_log("Userscript \"MyFreeFarm Automat\" has started\nPage="+location.href);
	unsafeData.automatStarted=automatStarted=true;
}

window.addEventListener("load",function(){
	// Userscripts.org
	if(location.href==USO_Home){
		var uso_version=/<p><b>Version:<\/b>(\d+\.\d+\.\d+)<\/p>/gi.exec($("summary").innerHTML.replace(/\s/gi,""))[1];
		if(compareVersions(uso_version,VERSION)<1){
			$("install_script").firstElementChild.innerHTML="Already installed";
		}else{
			$("install_script").firstElementChild.innerHTML="Update ("+VERSION+"&nbsp;&rarr;&nbsp;"+uso_version+")";
		}
		return false;
	}else{
		if(self==top){ do_relogin(60); }
		if(unsafeData.beraterDone){
			start_script();
		}else{
			document.addEventListener("beraterDone",function(){
				start_script();
				document.removeEventListener("beraterDone",arguments.callee,false);
			},false);
		}
	}
},false);