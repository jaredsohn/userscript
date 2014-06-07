// ==UserScript==
// @name           MyFreeFarm SalesList
// @namespace      http://userscripts.org/scripts/show/101699
// @description    Gives an overview of your products that are not needed until a given quest and profides a maner to create a list to sell them on a market of a forum and easy distribution of goods true a contract.
// @version        1.0.14
// @date           30.08.2011
// @include        http://s*.myfreefarm.*
// @include        http://s*.mabelleferme.fr*
// @include        http://s*.wolnifarmerzy.pl*
// @include        http://s*.enkicsitanyam.hu*
// @include        http://s*.tr.myfreefarm.com*
// @include        http://s*.mojaderewnja.ru*
// @include        http://s*.veselaferma.com*
// @include        http://s*.migranjalinda.es*
// @include        http://forum.*.upjers.com/viewforum.php*
// @include        http://board.myfreefarm.de/viewforum.php*
// @exclude        http://*board.*
// @exclude        http://*farmpedia.*
// @exclude        http://*/dyn_bubbles.php*
// @exclude        http://*/login_inc.php*
// @exclude        http://*/login.php*
// @exclude        http://*/nachrichten/*
// @exclude        http://*/vertraege/*
// @exclude        http://*/nutzer/*
// @exclude        http://*/payment/*
// @exclude        http://*/stadt/markt.php*
// @exclude        http://*/stadt/shop*
// @exclude        http://*/stadt/stats*
// @exclude        http://*/stadt/wettbewerb*
// @require        http://userscripts.org/scripts/source/94946.user.js
// ==/UserScript==

//GM_log("Run Code Saleslist :"+location.href);

const VERSION = "1.0.14";
const neededVersionBerater = "1.3.22";
const neededVersionFunctionFile = "1.0.17";
const USO_ID = "101699";
if(NEVER==undefined){
	alert("Hi, I am the SalesList-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href = "http://userscripts.org/scripts/source/"+USO_ID+".user.js";
}else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the SalesList-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href = "http://userscripts.org/scripts/source/"+USO_ID+".user.js";
}
const QUESTS = [,[[[17,43],[9,1]],1,142,[0,54]],[[[1,173],[9,2]],1,348,[0,145]],[[[18,192],[17,288]],1,255,[0,73]],[[[18,672],[9,10]],1,1883,[0,608]],[[[17,922],[9,19]],1,2304,[0,890]],[[[20,360],[18,960]],1,3300],[[[19,540],[20,720]],1,6413],[[[2,240],[21,245]],1,2895],[[[20,1440],[9,24]],1,11700,[1,47]],[[[21,1152],[9,48]],1,16200],[[[9,72],[22,1037]],1,16202],[[[20,3456],[10,27]],1,25476],[[[18,8064],[10,48]],1,15660],[[[23,3110],[9,144]],1,57240],[[[10,96],[9,180]],1,33930,[1,59]],[[[9,240],[6,1836]],1,62190],[[[10,384],[9,144]],1,70920],[[[10,192],[23,6739]],1,116280,[2,2]],[[[22,7518],[9,216]],1,108956],[[[11,150],[10,272]],1,34650],[[[7,1350],[12,50]],1,78375,[1,63]],[[[23,15552],[9,1008]],1,318600],[[[29,6552],[25,130]],1,373645,[3,2]],[[[1,51840],[27,55]],1,60579],[[[11,280],[12,210]],1,138705],[[[10,672],[12,210]],1,169785],[[[1,75600],[2,25000]],1,42131,[1,90]],[[[11,480],[12,272]],1,206760],[[[9,2688],[10,1024]],1,448320],[[[12,320],[11,560]],1,242160],[[[29,14742],[27,194]],1,836328,[2,3]],[[[20,77760],[12,383]],1,620831,[1,78]],[[[12,540],[32,14600]],1,449550],[[[32,50400],[25,432]],1,1208880],[[[10,1760],[11,1000]],1,481800,[3,3]],[[[9,4800],[12,595]],1,749738],[[[26,46550],[27,216]],1,933756,[1,77]],[[[1,259200],[30,216]],1,252960],[[[23,51840],[28,230]],1,856800],[[[9,5280],[10,1795]],1,849816],[[[25,475],[30,238]],1,1665576,[1,80]],[[[34,64152],[28,253]],1,1704780],[[[11,1320],[12,880]],1,615120],[[[27,238],[24,30294]],1,576923,[1,76]],[[[10,2304],[30,259]],1,538272],[[[9,5760],[10,2304]],1,976320],[[[37,13800],[25,518]],1,5559806,[1,61]],[[[9,5760],[10,1958]],1,927072],[[[28,276],[30,259]],1,417312],[[[12,1040],[30,281]],1,376253,[1,52]],[[[20,72000],[12,800]],1,732000,[4,23,15]],[[[12,4000],[10,1920]],1,1683600],[[[23,64800],[9,4800]],1,1395000],[[[25,432],[28,230]],1,373680,[4,24,15]],[[[24,72000],[27,216]],1,1135800],[[[7,18000],[10,1920]],1,1083600],[[[27,216],[11,1200]],1,423000,[4,31,15]],[[[31,103700],[30,216]],1,2965498],[[[11,1200],[25,432]],1,478080,[4,21,10]],[[[21,57600],[10,1920]],1,813600],[[[12,800],[27,216]],1,427800,[4,29,15]],[[[29,27300],[25,432]],1,1506635],[[[4,48000],[9,4800]],1,855000],[[[28,230],[27,216]],1,318600,[4,33,15]],[[[33,43200],[25,432]],1,1685880,[5,1]],[[[9,4800],[12,800]],1,822000,[4,22,10]],[[[8,18000],[28,230]],1,1792800],[[[10,1920],[11,1200]],1,550800,[4,34,15]],[[[34,64800],[30,216]],1,1704960],[[[6,10800],[28,230]],1,207000],[[[11,1200],[10,1920]],1,550800,[4,35,20]],[[[35,12950],[27,216]],1,932692],[[[25,432],[11,1200]],1,478080],[[[32,72000],[12,800]],1,1722000,[4,36,15]],[[[36,24500],[9,4800]],1,3235000],[[[27,216],[30,216]],1,320760,[4,7,10]],[[[26,66500],[28,230]],1,1298451],[[[12,800],[10,1920]],1,555600,[4,37,30]],[[[37,3833],[9,4800]],1,2017431],[[[28,230],[25,432]],1,373680],[[[33,43200],[12,800]],1,1767000,[4,38,15]],[[[38,108000],[30,216]],1,3594960],[[[9,4800],[28,230]],1,712800,[4,19,5]],[[[5,72000],[10,1920]],1,963600],[[[30,216],[9,4800]],1,714960,[4,39,30]],[[[39,2867],[12,800]],1,1834778],[[[10,1920],[25,432]],1,474480],[[[32,72000],[27,216]],1,1585800,[4,40,30]],[[[40,2250],[12,800]],1,1782000],[[[25,432],[11,1200]],1,478080,[4,20,10]],[[[3,64000],[30,216]],1,374960],[[[27,216],[11,1200]],1,423000,[4,41,30]],[[[41,1975],[10,1920]],1,1819998],[[[11,1200],[27,216]],1,423000,[4,8,15]],[[[24,72000],[10,1280]],1,1172400,[5,1]],[[[12,800],[9,4800]],1,822000,[4,26,15]],[[[36,24500],[28,230]],1,2867800],[[[31,103700],[10,1920]],1,3064138,[4,42,30]],[[[28,230],[25,432]],1,373680],[[[42,1680],[30,216]],1,1693960,[4,33,15]],[[[4,80000],[30,210]],2,722800],[[[6,48000],[12,300]],2,854400],[[[1,800000],[25,320]],2,998400,[4,32,10]],[[[35,64000],[32,12000]],2,1629600],[[[26,108000],[11,540]],2,1452600],[[[39,12000],[9,5600]],2,2160000,[4,43,30]],[[[43,10000],[27,600]],2,2556000],[[[24,184000],[25,480]],2,2248000],[[[9,10200],[10,24000]],2,2205600],[[[23,108000],[91,250]],2,1359600],[[[34,36936],[37,10580]],2,1959726],[[[29,78624],[26,5200]],2,2164176],[[[44,2016],[28,1600]],2,2059245],[[[10,12000],[12,1200]],2,1536000],[[[30,840],[30,0]],2,906800],[[[40,3240],[36,9800]],2,1265312],[[[91,750],[31,72590]],2,1233972],[[[26,113050],[27,600]],2,1874430],[[[38,7020],[42,2352]],2,2134942],[[[41,9480],[9,28800]],2,1886172,[5,1]],[[[23,174960],[22,98515]],2,2267541],[[[8,5040],[7,3780]],2,2022804],[[[32,27000],[10,24000]],2,2357400],[[[39,2580],[37,7935]],2,1525641,[1,99]],[[[33,51840],[35,20720]],2,2464720],[[[43,5000],[21,146880]],2,2139910],[[[31,60664],[26,100520]],2,1945541],[[[20,100800],[9,15360]],2,1216320,[4,44,20]],[[[10,10080],[11,4500]],2,1571400],[[[7,18900],[38,5400]],2,2239480],[[[40,3500],[35,12000]],2,1168200],[[[91,1000],[91,0]],2,600000],[[[44,4400],[26,22400]],2,1284560],[[[3,280000],[31,40000]],2,1328000],[[[12,1200],[39,3900]],2,1228860],[[[7,9800],[2,240000]],2,1003320],[[[26,60000],[1,275000]],2,1031000],[[[11,6400],[11,0]],2,1088000],[[[6,14444],[33,34000]],2,1158911],[[[27,625],[27,0]],2,1078125],[[[38,8600],[41,2900]],2,1056220],[[[43,4050],[7,5250]],2,1133280],[[[9,16200],[9,0]],2,453600,[5,1]],[[[25,900],[10,5400]],2,990000],[[[37,8600],[37,0]],2,1016520],[[[28,300],[10,7500]],2,1050000],[[[30,400],[42,3600]],2,1096880],[[[29,51000],[9,3600]],2,1069800],[[[91,175],[8,18200]],2,1087560],[[[36,10300],[41,3800]],2,1312700]];
const NPC = [,0.5,1.1,1.34,2.75,3.95,8.05,17.8,18.5,,,,,,,,,0.16,0.52,1.02,1.44,1.96,2.28,3.8,3.69,,4.38,,,12.4,,3.49,5.19,8.75,6,15.63,16.88,37.5,3.9,52.44,51.75,60.25,58.13,66.19,18.2,"c79",150,,1200,,1200,,,,,4500,,14400,1200,,"c125",,"c23",,4800,4200,,,,,,,,750,2100,"c25",,,,,,,10800,12000,,1500,3300,,,,,,,,5000,12000,"c10",,"c20",];
var FARMNAME = null;
var prodNameSortAll = new Array();
var bestand = new Array();
const EMPTYFILE = "[FARMNAME,[],1,0,[],[],[],[],[],[],[],[],[],[]]"; //0:farmName,1:rackAmount,2:quest,3:calcToQuest,4:calcToQuestProds,5:SellPrice,6:SellAmount,7:PriceMin,8:PriceAvg,9:PriceMax,10:PMinArrow,11:PAvgArrow,12:PMaxArrow,13:DontSell,
const EMPTYIMPORT = '{"name":"","url":"","regexp":"","regexpProd":"","regexpProdNum":"1","regexpPrice":"","regexpPriceNum":"1","regexpPriceReplaceFind":"","regexpPriceReplaceWith":"","regexpLimit":"","regexpLimitNum":"1","regexpLimitReplaceFind":"","regexpLimitReplaceWith":"","price":[],"pricedate":[],"oldprice":[],"oldpricedate":[],"updateDate":0,"limit":[],"regStrip":"","date_made":0,"date_edit":0}';
var STD_SELL_FACTOR = null;
const PRODSKIP = -2;
const STDTABLEWIDTH = 10;
var show = null;
var imports = null;
var importsShow = false;
var productRename = null;
var unknownStack = null;
var DEVMODE = false;
var DEVFORUMINDEX = false;
var strImages = new Array();

Array.prototype.remove = function(from, to){
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
function findProdId(arr, fProduct){
	for (var keys in arr){
		if(!arr.hasOwnProperty(keys)){ continue; }
		if(arr[keys].toLowerCase().indexOf(fProduct)==0){
			return keys;
		}
	}
	return -1;
}

function calc_total(){
	var total=0,pId=0,subtotal=0;
	// GM_log("Begin Calc Total");
	for(var v=0;v<prodNameSortAll.length;v++){
		pId = prodNameSortAll[v];
		if(!$("sellprice"+pId) || !$("salestotal"+pId)) continue;

		if(!bestand[5][pId] && bestand[5][pId]!=0){
			$("sellprice"+pId).value = numberFormat(bestand[8][pId]*STD_SELL_FACTOR,pId==0?0:2);
		}
		subtotal = $("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,".")*$("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,".");
		$("salestotal"+pId).innerHTML = numberFormat(subtotal,pId==0?0:2);
		// GM_log("Calc subtotal:"+subtotal+" pId:"+pId);

		if(!bestand[13][pId]){
			total += subtotal;
		}
	}
	$("saleslisttotal").innerHTML = numberFormat(total,2);
	// GM_log("End Calc Total");
}

function checkPriceUpdate(){
	var found=false;
	for(var v=0;v<prodNameSortAll.length;v++){
		pId = prodNameSortAll[v];
		if(!$("sellprice"+pId)) continue;
		if(bestand[8][pId] != unsafeWindow.GMgut[pId]){
			if(DEVMODE){ GM_log("Found: "+pId); }
			found = true;
			break;
		}
		if(unsafeWindow.GMpreisBeob[pId]){
			if(bestand[7][pId] != unsafeWindow.GMpreisBeob[pId][2] || bestand[9][pId] != unsafeWindow.GMpreisBeob[pId][3]){
				if(DEVMODE){ GM_log("Found: "+pId); }
				found = true;
				break;
			}
		}
	}
	return found;
}
function NPC_price(prod){
	if(NPC[prod]!=undefined && isNaN(NPC[prod])){
		return parseInt(NPC[prod].substr(1),10) * (unsafeWindow.GMgut[0]?unsafeWindow.GMgut[0]:330);
	}else if(NPC[prod]!=undefined){
			return NPC[prod];
	}else{
		return Infinity;
	}
}
function productAmounts(pId, mode){
	var prodMinRack = (unsafeWindow.GMprodMinRackInit && unsafeWindow.GMprodMinRackInit[0][pId])?unsafeWindow.GMprodMinRackInit[0][pId]:0;
	var prodRack = (bestand[1] && bestand[1][pId]>=0)?bestand[1][pId]:-1;
	var prodQuest = (bestand[4][pId] && bestand[4][pId][0]>=0)?bestand[4][pId][0]:0;
	if(!mode){
		return prodRack-prodQuest-prodMinRack;
	}else{
		var amountProd = (prodRack-prodQuest-prodMinRack);
		return {"prodMinRack":prodMinRack,"prodRack":prodRack,"prodQuest":prodQuest,"amountProd":amountProd,"thisProdOver":Math.max(0,amountProd)};
	}
}

var priceUpdateBlink = null;
function showForPriceUpdate(update){
	if(DEVMODE){ GM_log("Begin showForPriceUpdate isUpdate:"+update); }
	$("saleslistupdate").style.backgroundColor = update?"#FF0000":"transparent";
	// $("saleslisttable").style.borderColor = update?"#FF0000":"transparent";
	$("saleslistupdate").disabled = !update;
	if(update && !priceUpdateBlink){
		priceUpdateBlink = window.setInterval(function(){
			cell = $("saleslistupdate");
			// cell = $("saleslisttable");
			if(cell){
				// GM_log("cell:"+cell.style.backgroundColor);
				cell.style.backgroundColor = ((cell.style.backgroundColor=="rgb(255, 0, 0)")?"#FFFFFF":"#FF0000");
				// cell.style.borderColor = ((cell.style.borderColor=="rgb(255, 0, 0)")?"#FFFFFF":"#FF0000");
			}else{
				// GM_log("Clear timer showForPriceUpdate 2");
				try{window.clearInterval(priceUpdateBlink);}catch(err){}
				// GM_log("priceUpdateBlink:"+priceUpdateBlink);
			}
		},1000);
	}else if(!update){
		// GM_log("Clear timer showForPriceUpdate 1");
		try{window.clearInterval(priceUpdateBlink);}catch(err){}
		// GM_log("priceUpdateBlink:"+priceUpdateBlink);
	}
}

function showShopframePage(page){
	var cell = $top("shop");
	if(cell){
		if(top.window.wrappedJSObject.city!=1){
			top.document.addEventListener("gameCity1",function(){
				top.document.removeEventListener("gameCity1",arguments.callee,false);
				showShopframePage(page);
			},false);
			click($top("citylineitem1"));
		}else if(cell.style.display!="block"){
			cell.style.display = "block";
			cell.style.visibility = "visible";
			cell = $top("transp3");
			cell.style.display = "block";
			cell.style.visibility = "visible";
			showShopframePage(page);
		}else{
			$top("shopframe").src = page;
		}
		//closeInfoPanel();
	}else{
		location.href = page;
	}
	cell=null;
}
function showMarket(pId){
	showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(pId!=undefined?"?page=1&order=p&id="+pId+"&filter=1&guild=0":""));
}
function showMarketStall(){
	showShopframePage("http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/marktstand.php");
}

function updatePriceMarket(doo){
	var pId=0,cellmin=null,cellavg=null,cellmax=null,bestandChanged=false,NPCprice=0;
	for(var v=0;v<prodNameSortAll.length;v++){
		pId = prodNameSortAll[v];
		cellmin = $("PriceMin"+pId);
		cellavg = $("PriceAvg"+pId);
		cellmax = $("PriceMax"+pId);
		NPCprice = NPC_price(pId);

		if(cellmin){
			cellmin.className ="";
			if(doo!="init" && unsafeWindow.GMpreisBeob[pId] && unsafeWindow.GMpreisBeob[pId][2]!=bestand[7][pId]){
				if(DEVMODE){ GM_log("Change PriceMin for pId:"+pId); }
				bestand[10][pId] = ((unsafeWindow.GMpreisBeob[pId][2]>bestand[7][pId])?"arrowGrDown":(unsafeWindow.GMpreisBeob[pId][2]==bestand[7][pId])?"":"arrowRdUp");
				bestand[7][pId] = unsafeWindow.GMpreisBeob[pId][2];
				bestandChanged=true;
			}
			if(doo=="init"||bestandChanged){
				cellmin.className = bestand[10][pId];
				cellmin.innerHTML = numberFormat(bestand[7][pId],pId==0?0:2);
				cellmin.style.backgroundColor =(bestand[7][pId]==NPCprice?"#AADD77":(bestand[7][pId]>NPCprice)?"#DD7777":"");
			}
		}
		if(cellavg){
			cellavg.className ="";
			if(doo!="init" && unsafeWindow.GMgut[pId] && unsafeWindow.GMgut[pId]!=bestand[8][pId]){
				if(DEVMODE){ GM_log("Change PriceAvg for pId:"+pId); }
				bestand[11][pId] = ((unsafeWindow.GMgut[pId]>bestand[8][pId])?"arrowGrDown":(unsafeWindow.GMgut[pId]==bestand[8][pId])?"":"arrowRdUp");
				bestand[8][pId] = unsafeWindow.GMgut[pId];
				bestandChanged=true;
			}
			if(doo=="init"||bestandChanged){
				cellavg.className = bestand[11][pId];
				cellavg.innerHTML = numberFormat(bestand[8][pId],pId==0?0:2);
				cellavg.style.backgroundColor =(bestand[8][pId]==NPCprice?"#AADD77":(bestand[8][pId]>NPCprice)?"#DD7777":"");

				if(!bestand[5][pId] && bestand[5][pId]!=0 && $("sellprice"+pId) && $("sellamnt"+pId)){
					$("sellprice"+pId).value = numberFormat(bestand[8][pId]*STD_SELL_FACTOR,pId==0?0:2);
					$("salestotal"+pId).innerHTML= numberFormat($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,".")*$("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."),pId==0?0:2);
				}
			}
		}
		if(cellmax){
			cellmax.className = "";
			if(doo!="init" && unsafeWindow.GMpreisBeob[pId] && unsafeWindow.GMpreisBeob[pId][3]!=bestand[9][pId]){
				if(DEVMODE){ GM_log("Change PriceMax for pId:"+pId); }
				bestand[12][pId] = ((unsafeWindow.GMpreisBeob[pId][3]>bestand[9][pId])?"arrowGrDown":(unsafeWindow.GMpreisBeob[pId][3]>bestand[9][pId])?"":"arrowRdUp");
				bestand[9][pId] = unsafeWindow.GMpreisBeob[pId][3];
				bestandChanged=true;
			}
			if(doo=="init"||bestandChanged){
				cellmax.className = bestand[12][pId];
				cellmax.innerHTML = numberFormat(bestand[9][pId],pId==0?0:2);
				cellmax.style.backgroundColor =(bestand[9][pId]==NPCprice?"#AADD77":(bestand[9][pId]>NPCprice)?"#DD7777":"");
			}
		}
	}
	if(bestandChanged) GM_setValueCache(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
	calc_total();
	doSalesListNotepad();
}

function updatePricing(pId,doo){

	var elm = $("sellprice"+pId);
	if(!elm){
		if(DEVMODE){ GM_log("updatePricing elm not defined:"+pId); }
		return false;
	}
	var xval = elm.value.replace(regDelimThou,"").replace(regDelimDeci,".");
	if(doo=="update"){
		bestand[5][pId] = Math.max(0,xval);
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		elm.value = numberFormat(bestand[5][pId],pId==0?0:2);
		elm.style.backgroundColor = ((bestand[5][pId]>=NPC_price(pId))?"#DD7777":"");
		elm.style.borderColor = "RED";
	}else if(doo=="remove"){
		delete bestand[5][pId];
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		elm.value = numberFormat(bestand[8][pId]*STD_SELL_FACTOR,pId==0?0:2);
		elm.style.backgroundColor = ((bestand[8][pId]*STD_SELL_FACTOR)>=NPC_price(pId)?"#DD7777":"");
		elm.style.borderColor = "";
	}else{ // doo=="init"
		elm.value = numberFormat((bestand[5][pId]?bestand[5][pId]:(bestand[8][pId]*STD_SELL_FACTOR)),pId==0?0:2);
		elm.style.backgroundColor = (((bestand[5][pId]?bestand[5][pId]:(bestand[8][pId]*STD_SELL_FACTOR))>=NPC_price(pId))?"#DD7777":"");
		elm.style.borderColor = bestand[5][pId]?"RED":"";
	}
	if($("sellNotepadPrice"+pId)){
		$("sellNotepadPrice"+pId).innerHTML = elm.value;
	}
	if(doo=="init"){
		if($("sellamnt"+pId)&&$("salestotal"+pId)){
			$("salestotal"+pId).innerHTML= numberFormat(xval*$("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."),pId==0?0:2);
		}
	}else{
		calc_total();
	}
}

function updateAmount(pId,doo){
	var elm = $("sellamnt"+pId);
	if(!elm) return;
	var xval = elm.value.replace(regDelimThou,"").replace(regDelimDeci,".");
	var thisProdOver = Math.max(0,productAmounts(pId, false));
	if(doo=="zero"){
		//if(thisProdOver>0){ //TODO Why did i do this??
			xval = 0;
			doo="update";
		//}
	}
	if(doo=="update"){
		bestand[6][pId] = Math.max(0,xval);
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		elm.value = numberFormat(bestand[6][pId],0);
		elm.style.backgroundColor = ((bestand[6][pId]>thisProdOver)?"#DD7777":"");
		elm.style.borderColor = "RED";
	}else if(doo=="remove"){
		delete bestand[6][pId];
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		elm.value = numberFormat(thisProdOver,0);
		elm.style.backgroundColor = "";
		elm.style.borderColor = "";
	}else{
		elm.value = numberFormat((bestand[6][pId]>=0?bestand[6][pId]:thisProdOver),0);
		elm.style.backgroundColor = (((bestand[6][pId]>=0?bestand[6][pId]:thisProdOver)>thisProdOver)?"#DD7777":"");
		elm.style.borderColor = bestand[6][pId]>=0?"RED":"";
	}
	if($("sellNotepadAmount"+pId)) $("sellNotepadAmount"+pId).innerHTML = elm.value;
	if(doo=="init"){
		if($("sellprice"+pId)&&$("salestotal"+pId)){
			$("salestotal"+pId).innerHTML= numberFormat(xval*$("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."),pId==0?0:2);
		}
	}else{
		calc_total();
	}
}

function updateRackAmount(pId){
	//if(DEVMODE){ GM_log("Begin updateRackAmount:"); }
	var elm = $("salesListRack"+pId);
	if(!elm) return;
	var PA = productAmounts(pId, true);
	// GM_log("pId:"+pId+"prodRack:"+PA["prodRack"]+" prodQuest:"+PA["prodQuest"]+" prodMinRack:"+PA["prodMinRack"]);
	var mouseOverText = "<div style='display:table-row;'><div style='display:table-cell;'>Amount in rack:</div><div style='display:table-cell;text-align:right;'>"+ numberFormat(PA["prodRack"])+"</div></div>";
	mouseOverText += "<div style='display:table-row;'><div style='display:table-cell;'>Amount minimal:</div><div style='display:table-cell;text-align:right;'>"+ numberFormat(PA["prodMinRack"])+"</div></div>";
	mouseOverText += "<div style='display:table-row;'><div style='display:table-cell;'>Amount needed for Quests:</div><div style='display:table-cell;text-align:right;border-bottom:1px solid white;'>"+ numberFormat(PA["prodQuest"])+"</div></div>";
	mouseOverText += "<div style='display:table-row;'><div style='display:table-cell;'>Amount over:</div><div style='display:table-cell;text-align:right;'>"+ numberFormat(PA["amountProd"])+"</div></div>";
	if(PA["prodQuest"]>0){
		mouseOverText += "<br/>";
		mouseOverText += "<div style='display:table-row;'><div style='display:table-cell;'>Used in Quest:</div></div>"+bestand[4][pId][1];
	}
	elm.innerHTML = "";
	elm.setAttribute("mouseOverText",mouseOverText);
	if(PA["prodRack"]>-1){ // product amount
		elm.style.color = (PA["prodQuest"]>0?(PA["amountProd"]<0?"#cc0000":"green"):"black");
		elm.innerHTML = (PA["prodQuest"]>0&&PA["amountProd"]<0?"":"+")+numberFormat(PA["amountProd"]);
	}else{
		if(PA["prodQuest"]>0){
			createElement("span",{"style":"text-align:right;color:blue;padding:0px 2px 0px 2px;"},elm,"Lvl&nbsp;" + unsafeWindow.produkt_level[pId]);
		}else{
			elm.innerHTML = "--";
		}
	}
	//if(DEVMODE){ GM_log("End updateRackAmount:"); }
	mouseOverText=null;
	return (PA["amountProd"]>0);
}

function doSaleslistUpdate(doo){
	bestand[1][0] = parseInt($("coins").innerHTML.replace(regDelimThou,""),10);
	if((bestand[2]!=unsafeWindow.GMquestNr)||(bestand[3]==undefined)||doo=="update"){
		bestand[2] = unsafeWindow.GMquestNr;
		if(bestand[3] < bestand[2] && bestand[3]!=0){
			bestand[3] = bestand[2] + 10; // calc-to-quest passed
		}
		bestand[4] = new Array(); // quest product amount (summed)
		if(bestand[3]!=0){
			var prod,qId;
			for(var qId=bestand[2];qId<=bestand[3];qId++){
				for(var i=0;i<QUESTS[qId][0].length;i++){
					prod = QUESTS[qId][0][i][0];
					if(!bestand[4][prod]) bestand[4][prod]=[0,""];
					bestand[4][prod][0] += QUESTS[qId][0][i][1];
					bestand[4][prod][1] += "<div style='display:table-row;'><div style='display:table-cell;'>"+qId+"</div><div style='display:table-cell;text-align:right;'>"+numberFormat(QUESTS[qId][0][i][1],0)+"</div></div>";
				}
			}
			prod=null;qId=null;
		}
	}
	for (var pId=1;pId<unsafeWindow.GMprodBlock.length;pId++){
		var c = -1;
		if(unsafeWindow.rackElement[pId]&&(!unsafeWindow.GMprodBlock[pId].match(/l/))){ c = unsafeWindow.rackElement[pId].number; }
		bestand[1][pId] = (c?parseInt(c,10):0);
		if($("infoPanel").getAttribute("mode")=="saleslist"){
			updateRackAmount(pId);
			updateAmount(pId,"init");
		}
	}
	GM_setValueCache(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
}

function doSalesListNotepad(){
	var newdiv = $("salesListNotepad");
	if(show[0]&&newdiv){
		newdiv.innerHTML = "";
		var newtable = createElement("table",{"border":"0","cellspacing":"0","cellpadding":"0"},newdiv);
		var newtr = createElement("tr",{"class":"link"},newtable);
		var newtd = createElement("td",{"colspan":"5","style":"border-bottom:1px solid black;text-align:center;"},newtr,"SalesList");
		newtr.addEventListener("mouseover",function(event){
			var str = '<table class="white">';
			str += '<tr><td>'+sign_sum+'</td><td style="text-align:right;">'+moneyFormatInt(parseInt(this.getAttribute("value"),10))+'</td></tr>';
			str += '</table>';
			showToolTip(event,str);
		},false);

		var sumTotal=0,oldType=null,newType=null;
		var prod=0,thisProdOver=0,amount=0,price=0;
		for(var v=0;v<prodNameSortAll.length;v++){
			pId = prodNameSortAll[v];
			newType = unsafeWindow.GMprodTyp[pId];
			thisProdOver = Math.max(0,productAmounts(pId, false));

			if(!bestand[1] || bestand[1][pId]<0 || GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeSalesList","cvez").indexOf(newType)==-1 || thisProdOver<=0 || unsafeWindow.GMprodBlock[pId] ) continue;
			price = (bestand[5][pId]>=0?bestand[5][pId]:(bestand[8][pId]*STD_SELL_FACTOR));
			amount = (bestand[6][pId]>=0?bestand[6][pId]:thisProdOver);
			sumTotal += price*amount;
			newtr = createElement("tr",{"class":"link hoverBgCc9"+(((oldType!=null)&&(oldType!=newType))?" borderTop1dashedBlack":""),"prodId":pId,"value":(amount*price)},newtable);
			oldType = newType;

			newtd = createElement("td",{},newtr);
			produktPic(0,pId,newtd);
			newtd.addEventListener("click",function(){showMarket(this.parentNode.getAttribute("prodId"));},false);
			newtd.addEventListener("mouseover",function(event){
				showSalesNotepadToolTip(event,this.parentNode.getAttribute("prodId"),texte["goToMarket"]);
			},false);

			newtd = createElement("td",{"style":"text-align:right;","id":"sellNotepadAmount"+pId},newtr,numberFormat(amount,0));
			newtd.addEventListener("click",function(event){editSaleslistItem(event, this.parentNode.getAttribute("prodId"));},false);
			newtd.addEventListener("mouseover",function(event){
				showSalesNotepadToolTip(event,this.parentNode.getAttribute("prodId"),texte["saleslist"]["editSalesItem"]);
			},false);

			newtd = createElement("td",{"style":"padding-left:3px;"},newtr,unsafeWindow.GMprodName[0][pId]);
			newtd.addEventListener("click",function(){showMarket(this.parentNode.getAttribute("prodId"));},false);
			newtd.addEventListener("mouseover",function(event){
				showSalesNotepadToolTip(event,this.parentNode.getAttribute("prodId"),texte["goToMarket"]);
			},false);

			newtd = createElement("td",{"style":"padding-left:3px;text-align:right;","id":"sellNotepadPrice"+pId},newtr,numberFormat(price,pId==0?0:2));
			newtd.addEventListener("click",function(event){editSaleslistItem(event, this.parentNode.getAttribute("prodId"));},false);
			newtd.addEventListener("mouseover",function(event){
				showSalesNotepadToolTip(event,this.parentNode.getAttribute("prodId"),texte["saleslist"]["editSalesItem"]);
			},false);
		}

		newtable.firstElementChild.setAttribute("value",sumTotal);
		if(newtable.childElementCount==1){
			newtr = createElement("tr",{},newtable);
			createElement("td",{"colspan":"5","style":"text-align:center;"},newtr,"---");
		}
		newtable=null;newtr=null;newtd=null;
	}
	newdiv=null;
}

function showSalesNotepadToolTip(event, prodId, topline){
	thisProdOver = Math.max(0,productAmounts(pId, false));
	price = (bestand[5][prodId]>=0?bestand[5][prodId]:(bestand[8][prodId]*STD_SELL_FACTOR));
	amount = (bestand[6][prodId]>=0?bestand[6][prodId]:thisProdOver);

	var str = '<table class="white">';
	str += '<tr><th colspan="2" style="border-bottom:1px solid white">'+topline.replace(/%1%/,unsafeWindow.GMprodName[0][prodId])+'</th></tr>';
	str += '<tr><td>'+texte["saleslist"]["marktpreisMin"]+'</td><td style="text-align:right;">'+moneyFormat(bestand[7][prodId])+'</td></tr>';
	str += '<tr><td>'+texte["saleslist"]["marktpreisAvg"]+'</td><td style="text-align:right;">'+moneyFormat(bestand[8][prodId])+'</td></tr>';
	str += '<tr><td>'+texte["saleslist"]["marktpreisMax"]+'</td><td style="text-align:right;">'+moneyFormat(bestand[9][prodId])+'</td></tr>';
	str += '<tr><td colspan="2" style="border-bottom:1px solid white"></td></tr>';
	str += '<tr><td>'+texte["bestand"]+'</td><td style="text-align:right;">'+numberFormat(thisProdOver)+'</td></tr>';
	str += '<tr><td>'+texte["wert"]+'</td><td style="text-align:right;">'+moneyFormatInt(unsafeWindow.GMgut[prodId]*thisProdOver)+'</td></tr>';
	str += '<tr><td colspan="2" style="border-bottom:1px solid white"></td></tr>';
	str += '<tr><td>'+sign_sum+'</td><td style="text-align:right;">'+moneyFormatInt(price*amount)+'</td></tr>';
	str += '</table>';
	showToolTip(event,str);
	str=null;
}

function editSaleslistItem(event,prodId){
	if($("salesListNotepadChange")) removeElement($("salesListNotepadChange"));
	var newdiv = createElement("div",{"id":"salesListNotepadChange","style":"z-index:999;position:absolute;overflow:visible;display:block;-moz-border-radius:5px;","class":"blackbox"},ALL);
	// newdiv.style.left = xpos.left + ((event.target.clientWidth - newdiv.offsetWidth)/2) + "px";
	// newdiv.style.top = xpos.top + event.target.clientHeight + 10 + "px";
	var help = getOffset(frameElement);
	var cleft = (event.pageX+help.left-(newdiv.offsetWidth/3));
	newdiv.style.left = cleft + Math.min(0,(top.document.body.clientWidth - cleft - newdiv.offsetWidth)) + 20 + "px";
	newdiv.style.top = (((top.document.body.clientHeight - event.pageY+help.top - 25 - newdiv.offsetHeight)<0)?(event.pageY+help.top-25-newdiv.offsetHeight):(event.pageY+help.top+25)) + "px";

	var newtable = createElement("table",{"border":"0","cellspacing":"0","cellpadding":"0"},newdiv);
	var newtr = createElement("tr",{},newtable);
	var newtd = createElement("td",{"colspan":"2","style":"border-bottom:1px solid white;text-align:center;padding-bottom:2px;"},newtr,unsafeWindow.GMprodName[0][prodId]);

	newtr = createElement("tr",{"style":"height:22px;"},newtable);
	newtd = createElement("td",{"style":"text-align:left;padding-right:10px;"},newtr,"Amount");
	newtd = createElement("td",{"prodId":prodId},newtr);
	newelm = createElement("input",{"type":"text","style":"text-align:right;width:60px;"},newtd);
	newelm.value = $("sellNotepadAmount"+prodId).innerHTML;
	newelm.addEventListener("focus",function(){this.select();},false);
	newelm.addEventListener("change",function(){
		var prodId = this.parentNode.getAttribute("prodId");
		bestand[6][prodId] = Math.max(0,this.value.replace(regDelimThou,"").replace(regDelimDeci,"."));
		if(DEVMODE){ GM_log("update amount:" + prodId + " :" + bestand[6][prodId]); }
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		doSalesListNotepad();
		updateAmount(prodId,"");
	},false);

	newtr = createElement("tr",{"style":"height:22px;"},newtable);
	newtd = createElement("td",{"style":"text-align:left;padding-right:10px;"},newtr,"Price");
	newtd = createElement("td",{"prodId":prodId},newtr);
	newelm = createElement("input",{"type":"text","style":"text-align:right;width:60px;"},newtd);
	newelm.value = $("sellNotepadPrice"+prodId).innerHTML;
	newelm.addEventListener("focus",function(){this.select();},false);
	newelm.addEventListener("change",function(){
		var prodId = this.parentNode.getAttribute("prodId");
		bestand[5][prodId] = Math.max(0,this.value.replace(regDelimThou,"").replace(regDelimDeci,"."));
		if(DEVMODE){ GM_log("update price:" + prodId + " :" + bestand[5][prodId]); }
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		doSalesListNotepad();
		updatePricing(prodId,"");
	},false);
/*				newelm.addEventListener("dblclick",function(){
		var prodId = this.parentNode.getAttribute("prodId");
		delete bestand[5][prodId];
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
		this.value = numberFormat(bestand[8][prodId]*STD_SELL_FACTOR,pId==0?0:2);
		updatePricing(prodId,"remove");
	},false);
*/
	newtr = createElement("tr",{},newtable);
	newtd = createElement("td",{"colspan":"2","style":"border-top:1px solid white;text-align:center;padding-top:2px;"},newtr);
	newelm = createElement("button",{"type":"text"},newtd,texte["saleslist"]["button_close"]);
	newelm.addEventListener("click",function(event){
		removeElement($("salesListNotepadChange"));
	},false);
	newtable=null;newtr=null;newtd=null;newelm=null;newdiv=null;
}

function drawAskUnknowItemBox(uName, appendTo){
try{
	GM_log("Begin drawAskUnknowItemBox :" + uName);
	appendTo.innerHTML = "";
	appendTo.setAttribute("uName",uName);
	createElement("div",{id:"divAskTitle","class":"queueTime"},appendTo,"Choose what is the correct product for %1%".replace("%1%",uName)); //TODO texte
	createElement("div",{style:"clear:both;"},appendTo);
	newdiv = createElement("div",{id:"divAskItemI"+PRODSKIP,"class":"divChooseItem link v"+PRODSKIP},appendTo);
	newdiv.addEventListener("click",function(){
		productRename[this.parentNode.getAttribute("uName")]="skip";
		GM_setValue(LNG+"_productRename",implode(productRename));
		delete unknownStack[this.parentNode.getAttribute("uName")];
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_unknownStack",implode(unknownStack));
		hideToolTip(this);
		if(this.parentNode==$("divAskBoxInner")) click($("divAskBoxClose"));
	},false);
	newdiv.addEventListener("mouseover", function(evt){
		showToolTip(evt, "unknow skip");//TODO texte
	},false);
	for (var iProd=0;iProd<unsafeWindow.produkt_name.length;iProd++){
		//TODO add only tradeble items
		newdiv = createElement("div",{"id":"divAskItemI"+iProd,"iProd":iProd,"class":"divChooseItem link v"+iProd},appendTo);
		//newdiv.style.opacity = (unsafeWindow.rackElement[iProd]&&unsafeWindow.rackElement[iProd]["number"]>0)?1:0.4;
		newdiv.addEventListener("click",function(){
		try{
			var pId = parseInt(this.getAttribute("iProd"),10);
			var uName = this.parentNode.getAttribute("uName");

			productRename[uName]=unsafeWindow.GMprodName[0][pId]; //saveing for future usage
			GM_setValue(LNG+"_productRename",implode(productRename));

			var iIdlist = new Array();
			var stack, iId, cell;
			for(var i=0;i<unknownStack[uName].length;i++){
				stack = unknownStack[uName][i];
				iId = stack["iId"];
				iIdlist.push(iId);
				if(stack["pricedate"]>=imports[iId]["updateDate"]){
					if(imports[iId]["price"][pId]!= stack["price"]){
						imports[iId]["oldprice"][pId] = stack["oldprice"][pId];
						imports[iId]["oldpricedate"][pId] = stack["oldpricedate"][pId];
						if(stack["price"]!=null){
							imports[iId]["price"][pId] = stack["price"];
							imports[iId]["pricedate"][pId]=stack["pricedate"];
						}
						if(stack["limit"]!=null){
							imports[iId]["limit"][pId] = stack["limit"];
						}
					}
				}
			}
			stack=null;iId=null;pId=null;
			//save it all
			GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));

			delete unknownStack[uName];
			removeElement($("unknownStackButton"+uName));
			$("importsStackTr").style.display = (unknownStack.length()>0)?"table-row":"none";
			GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_unknownStack",implode(unknownStack));
			
			hideToolTip(this);
			redrawImportTable();
			if(this.parentNode==$("divAskBoxInner")) click($("divAskBoxClose"));
		}catch(err){GM_log("ERROR: drawAskUnknowItemBox click \n"+err);}
		},false);
		newdiv.addEventListener("mouseover", function(evt){
			showToolTip(evt, unsafeWindow.GMprodName[0][parseInt(this.getAttribute("iProd"),10)]);
		},false);
	}
	if(appendTo==$("divAskBoxInner")){
		$("divAskBox").style.display = "block";
		$("divAskBox").style.top = Math.round(255 - $("divAskBox").offsetHeight/2)+"px";
	}
	newdiv=null;appendTo=null;
	GM_log("End drawAskUnknowItemBox :" + uName);
}catch(err){GM_log("ERROR: drawAskUnknowItemBox \n"+err);}
}

function parseImport(iId, testMode, doAll){
	if(DEVMODE){GM_log("Begin 3 iId:"+iId+" url:"+imports[iId]["url"]);}
	if(DEVMODE){showInLogBubble("Searching for "+(imports[iId]["name"]==""?" new marketplace":imports[iId]["name"]),undefined,"green");}//TODO texte
	GM_xmlhttpRequest({
		method: "GET",
		url: imports[iId]["url"],
		onload: function(response){
			try{
				//TODO add bubble
				var help = explode(EMPTYIMPORT); //TODO remove in online version
				for(i in help){
					if(!help.hasOwnProperty(i)){ continue; }
					if(imports[iId][i]==undefined){
						GM_log("Adding missing property iId:"+iId+" property:"+i);
						imports[iId][i]=help[i];
					}
				}
				help=null;
				var iContainer = createElement("div",{},null,response.responseText).querySelector("#pagecontent");
				//GM_log("parseImport 1 iContainer:"+iContainer.innerHTML);
				if(iContainer.childElementCount > 0){
					//GM_log("parseImport childElementCount:"+iContainer.childElementCount);
					var regStrip = new RegExp(imports[iId]["regStrip"],"g");
					var regLine = new RegExp(imports[iId]["regexp"],"mgi");
					var regProd = (imports[iId]["regexpProd"]!="")?new RegExp(imports[iId]["regexpProd"],"i"):null;
					var regPrice = (imports[iId]["regexpPrice"]!="")?new RegExp(imports[iId]["regexpPrice"],"i"):null;
					var regLimit = (imports[iId]["regexpLimit"]!="")?new RegExp(imports[iId]["regexpLimit"],"i"):null;
					var regReplacePrice = (imports[iId]["regexpPriceReplaceFind"]!="")?new RegExp(imports[iId]["regexpPriceReplaceFind"],"gi"):null;
					var regReplaceLimit = (imports[iId]["regexpLimitReplaceFind"]!="")?new RegExp(imports[iId]["regexpLimitReplaceFind"],"gi"):null;
					var oldprice, oldpricedate, help, lines;
					if(!testMode){
						oldprice = imports[iId]["price"].clone();
						GM_log("oldprice :"+implode(oldprice));
						oldpricedate = imports[iId]["pricedate"].clone();
						imports[iId]["price"]= new Array();
						imports[iId]["limit"]= new Array();
						imports[iId]["updateDate"] = now;
					}
					imports[iId]["name"] = iContainer.querySelector("div.postauthor").innerHTML;
					help = iContainer.querySelector("td.postbottom"); //help = "Ma 7. Feb 2011, 18:25";
					if(help!=null){
						help = help.innerHTML;
						help = help.substr(help.indexOf(" ",0)).replace(/[,.]*/gi,"");
						imports[iId]["date_made"] = new Date(help).getTime()/1000;
					}else{
						imports[iId]["date_made"] = -1;
					}
					help = iContainer.querySelector("span.gensmall"); //<span class="gensmall">Laatst gewijzigd door <a class="username-coloured" style="color: #000000;" href="./memberlist.php?mode=viewprofile&amp;u=14027&amp;sid=9a7679b47ef83b53dddb462991fb88f0">Dutch Farming</a> op Do 23. Jun 2011, 13:24, in totaal 6805 keer gewijzigd.</span>
					if(help!=null){
						help = help.innerHTML.match(/(\d*. \w* \d*, \d*:\d*)/gi);
						//GM_log("date_edit match:"+implode(help));
						if(help[0]){
							imports[iId]["date_edit"] = new Date(help[0].replace(/[,.]*/gi,"")).getTime()/1000;
						}else{
							imports[iId]["date_edit"] = -1;
						}
					}else{
						imports[iId]["date_edit"] = -1;
					}
					help=null;
					showInLogBubble(("Prices are %1% days old").replace("%1%",countDays(Math.max(imports[iId]["date_made"],imports[iId]["date_edit"]),now)));
					if(!testMode){GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));}
	
					iContainer = iContainer.querySelector("div.postbody").innerHTML;
					iContainer = iContainer.replace(/&(lt|gt);/g, function (strMatch, p1){return (p1 == "lt")? "<" : ">";}); //realy making sure <> are converted
					iContainer = iContainer.replace(/<(\/?[^>\s]*)?[^>]*(>|$)/g, "<$1>").toLowerCase(); // /<\/?[^>]+(>|$)/g
					iContainer = iContainer.replace(regStrip, "");
					if(testMode){GM_log("Tag semi-stripped String:"+iContainer);}
					if(imports[iId]["regexp"]!=""){
						lines = iContainer.match(regLine);
						if(testMode){
							var cnt = "";
							for(var i=0;i<lines.length;i++){
								cnt += "\n"+i+") "+lines[i];
							}
							GM_log("testImport implode:"+ cnt);
						}
						if(lines.length > 0){
							var pId=-1, prodName="", price="", limit="", newprods=0;
							for(var i=0;i<lines.length;i++){
								prodName = regProd?lines[i].match(regProd)[imports[iId]["regexpProdNum"]]:null;
								pId = findProdId(unsafeWindow.GMprodName[0],prodName);
								if(pId==-1 && productRename[prodName] && productRename[prodName]!="skip"){
									//GM_log("refind prodName:"+prodName+" : "+productRename[prodName]);
									pId = findProdId(unsafeWindow.GMprodName[0], productRename[prodName].toLowerCase());
								}
								price = regPrice?lines[i].match(regPrice)[imports[iId]["regexpPriceNum"]]:null;
								if(regReplacePrice&&price){price = price.replace(regReplacePrice, imports[iId]["regexpPriceReplaceWith"]);}
								limit = regLimit?lines[i].match(regLimit)[imports[iId]["regexpLimitNum"]]:null;
								if(regReplaceLimit&&limit){limit = limit.replace(regReplaceLimit, imports[iId]["regexpLimitReplaceWith"]);}
	
								if(!testMode){
									if(pId==-1 && !(productRename[prodName] && productRename[prodName]=="skip")){
										//GM_log("unknownStack add prodName:"+prodName);
										if(!unknownStack[prodName]){unknownStack[prodName]=new Array();}
										unknownStack[prodName].push({"iId":iId,"price":price,"pricedate":now,"limit":limit,"oldprice":oldprice,"oldpricedate":oldpricedate});
										newprods++;
									}else if(pId!=-1){
										if(oldprice[pId]!=price){
											imports[iId]["oldprice"][pId] = oldprice[pId];
											imports[iId]["oldpricedate"][pId] = oldpricedate[pId];
											imports[iId]["pricedate"][pId]=now;
											newprods++;
										}
										oldprice[pId]=undefined;
										if(price!=null){
											imports[iId]["price"][pId]=price;
										}
										if(limit!=null){
											imports[iId]["limit"][pId]=limit;
										}
									}
								}
								if(testMode && (regProd||regPrice||regLimit)){
									//GM_log("item i:"+i+" pId:"+pId+" Prod:"+prodName+" Price:"+price+" Limit:"+limit+(doAll?" \nline:"+lines[i]:"")); 
									GM_log("item i:"+i+" pId:"+pId+" Prod:"+prodName+" Price:"+price+" Limit:"+limit+(regProd?" \nregProd:"+implode(lines[i].match(regProd)):"")+(regPrice?" \nregPrice:"+implode(lines[i].match(regPrice)):"")+(regLimit?" \nregLimit:"+implode(lines[i].match(regLimit)):"")); 
								}
							}
							if(!testMode){
								for(var pId=0;pId<oldprice.length;pId++){ //correct deleted prodcuts.
									if(oldprice[pId]){
										imports[iId]["oldprice"][pId] = oldprice[pId];
										imports[iId]["oldpricedate"][pId] = oldpricedate[pId];
									}
								}
								GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
								GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_unknownStack",implode(unknownStack));
								showInLogBubble(("Found %1% new prices").replace("%1%",newprods));//TODO texte
							}
							pId=null;prodName=null;price=null;limit=null;newprods=null;
						}
					}
					oldprice=null;oldpricedate=null;lines=null;
					regStrip=null;regLine=null;regProd=null;regPrice=null;regLimit=null;regReplacePrice=null;regReplaceLimit=null;
				}
				iContainer=null;
				if(!testMode){
					var newspan;
					$("importsStackTd").innerHTML="";
					$("importsStackTr").style.display = (unknownStack.length()>0)?"table-row":"none";
					for(var i in unknownStack){
						if(!unknownStack.hasOwnProperty(i)){continue;}
						newspan = createElement("button",{"id":"unknownStackButton"+i,"uName":i,"style":"margin-right:5px;"},$("importsStackTd"),i);
						newspan.addEventListener("click",function(){
							drawAskUnknowItemBox(this.getAttribute("uName"),$("divAskBoxInner"));
						},false);
						newspan.addEventListener("mouseover",function(evt){
							var stck = unknownStack[parseInt(this.getAttribute("uName"),10)]
							var cnt = "<table>";
							var iId;
							for(var i in stck){
								iId = parseInt(stck[i]["iId"],10);
								cnt += "<tr><td><b>"+imports[iId]["name"]+"</b></td><td>"+stck[i]["price"]+"</td><td>"+getDateStr(stck[i]["pricedate"],2)+"&nbsp;"+getDaytimeStr(stck[i]["pricedate"],true)+"</td></tr>";
							}
							cnt += "</table>";
							showToolTip(evt, cnt, this);
						},false);
					}
					newspan=null;
				}
			}catch(err){GM_log("ERROR: \n"+err);}
			if(!testMode){
				if(imports[++iId] && doAll){
					window.setTimeout(function (iId, testMode, doAll){
						GM_log("parseImport next imports -> iId:"+iId+" testMode:"+testMode+" doAll:"+doAll);
						parseImport(iId, testMode, doAll);
					},1000,iId, testMode, doAll);
				}else{
					redrawImportTable();
				}
			}
		}
	});
}

function pushToMarket(contractData){
	GM_log("Begin pushToMarket contractData:"+implode(contractData));
	if($top("multiframe").style.display!="block"){
		click($top("menueimg2"));
	}
	var gotoContactTimeout = window.setInterval(function (){

		if($top("multiframe").style.display == "block"){
			clearTimeout(gotoContactTimeout);
			$top("multiframe").src = "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/vertraege/new.php";
			GM_log("set new.php");
			var gotoFillingTimeout = window.setInterval(function (){
				//GM_log("try filling");
				GM_log("fillContract "+ $("multiframe").contentWindow.wrappedJSObject.fillContract);
				if($top("multiframe").contentDocument.getElementById("to_player") && $("multiframe").contentWindow.wrappedJSObject.fillContract!=undefined){
					clearTimeout(gotoFillingTimeout);
					$("multiframe").contentWindow.wrappedJSObject.fillContract(null,contractData);
					for (pId in contractData){
						if(!contractData.hasOwnProperty(pId)){ continue; }
						updateAmount(pId,"zero");
					}
					contractData=null;
				}
			},3000,contractData);
		}
	},200,contractData);
}

function createImportButton(iId,appendTo){
	//GM_log("Begin createImportButton iId:"+iId);
	newelm = createElement("button",{"id":"importsButton"+iId,"class":"link","style":"margin:0px 2.5px 2px 2.5px;","iId":iId},appendTo,"Site:"+iId); //TODO texte
	newelm.addEventListener("click",function(){
		clickImportButton(this.getAttribute("iId"));
	},false);
	newelm.addEventListener("mouseover",function(evt){
		var iId = parseInt(this.getAttribute("iId"),10);
		var cnt = "<table><tr><th colspan=2>"+imports[iId]["name"]+"<th><tr>";
		if(imports[iId]["date_made"]){cnt += "<tr><td>Forum Created:</td><td>"+getDateStr(imports[iId]["date_made"],2)+"&nbsp;"+getDaytimeStr(imports[iId]["date_made"],true)+"</td></tr>";} //TODO texte
		if(imports[iId]["date_edit"]){cnt += "<tr><td>Forum Edited:</td><td>"+getDateStr(imports[iId]["date_edit"],2) + "&nbsp;"+ getDaytimeStr(imports[iId]["date_edit"],true)+"</td></tr>";} //TODO texte
		if(imports[iId]["updateDate"]){cnt += "<tr><td>Last Updated:</td><td>"+getDateStr(imports[iId]["updateDate"],2)+"&nbsp;"+getDaytimeStr(imports[iId]["updateDate"],true)+"</td></tr>";} //TODO texte
		cnt += "</table>";
		showToolTip(evt, cnt, this);
	},false);
	//newelm.style.borderColor = (imports[iId]["date_edit"]<=(now-(7*24*60*60)))?"red":"";
}
function clickImportButton(iId){
	try{
		for(var i=0;i<imports.length;i++){
			if($("importsButton"+i)){
				$("importsButton"+i).style.backgroundColor = "";
			}
		}
		GM_log("Begin clickImportButton iId:"+iId+" tableId:"+$("importsTable").getAttribute("iId"));
		if(iId==$("importsTable").getAttribute("iId")){
			$("importsTable").setAttribute("iId",null);
			$("importsTable").style.display = "none";
			$("importsremove").disabled = true;
		}else{
			$("importsButton"+iId).style.backgroundColor = "red";
			$("importsTable").setAttribute("iId",iId);
			$("importsTable").style.display = "block";
			$("importsName").value = imports[iId]["name"];
			$("importsUrl").value = imports[iId]["url"];
			$("importsRegExp").value = imports[iId]["regexp"];
			$("importsRegExpProd").value = imports[iId]["regexpProd"];
			$("importsRegExpProdNum").value = imports[iId]["regexpProdNum"];
			$("importsRegExpPrice").value = imports[iId]["regexpPrice"];
			$("importsRegExpPriceNum").value = imports[iId]["regexpPriceNum"];
			$("importsRegExpPriceReplaceFind").value = imports[iId]["regexpPriceReplaceFind"];
			$("importsRegExpPriceReplaceWith").value = imports[iId]["regexpPriceReplaceWith"];
			$("importsRegExpLimit").value = imports[iId]["regexpLimit"];
			$("importsRegExpLimitNum").value = imports[iId]["regexpLimitNum"];
			$("importsRegExpLimitReplaceFind").value = imports[iId]["regexpLimitReplaceFind"];
			$("importsRegExpLimitReplaceWith").value = imports[iId]["regexpLimitReplaceWith"];
			$("importsRegStrip").value = imports[iId]["regStrip"];
			$("importsUrl").style.width = (500 - 7 - $("importstest").offsetWidth) + "px";
			$("importsName").style.width = (500 - 7 - $("importsclear").offsetWidth) + "px";
			$("importsremove").disabled = false;
		}
		GM_log("End clickImportButton iId:"+iId+" tableId:"+$("importsTable").getAttribute("iId"));
	}catch(err){GM_log("ERROR: button click iId:"+iId+" i:"+i+" length:"+imports.length+"\n"+err);}
}
function redrawImportTable(){
try{
	if(DEVMODE){GM_log("Begin redrawImportTable");}
	var cell=$("saleslisttable").querySelectorAll("td[iId]");
	var iId;
	for(var iId=0;iId<imports.length;iId++){ 
		$("importsButton"+iId).style.borderColor = (Math.max(imports[iId]["date_edit"],imports[iId]["date_made"])<=(now-(7*86400)))?"red":""; //86400=24*60*60
	}
	for(var i=0;i<cell.length;i++){
		pId = cell[i].parentNode.getAttribute("pId");
		iId = cell[i].getAttribute("iId");
		cell[i].style.border="";
		cell[i].style.display = importsShow?"table-cell":"none";
		cell[i].style.backgroundColor = imports[iId]["pricedate"]?((countDays(imports[iId]["pricedate"][pId],imports[iId]["updateDate"])==0)?"#D6CECE":""):"";
		cell[i].innerHTML = (imports[iId] && imports[iId]["price"][pId])?numberFormat(imports[iId]["price"][pId],2):"--";
		//GM_log("redrawImportTable iId:"+iId+" pId:"+pId+" price:"+imports[iId]["price"][pId]);
	}
	cell = $("saleslisttable").querySelectorAll("[seperator]");
	for(var i=0;i<cell.length;i++){
		cell[i].colSpan = STDTABLEWIDTH + (importsShow?imports.length:0);
	}
	cell = $("saleslisttable").querySelectorAll("td[importpart]");
	for(var i=0;i<cell.length;i++){
		cell[i].style.display = imports.length>0&&importsShow?"table-cell":"none";
		cell[i].colSpan = imports.length;
	}
	var mini,miniId;
	for(var pId=0;pId<unsafeWindow.GMprodName[0].length;pId++){
		mini=NEVER;miniId=new Array();
		for(var iId=0;iId<imports.length;iId++){
			if(imports[iId]["price"][pId]){
				if(mini>imports[iId]["price"][pId]){
					miniId=[iId];
					mini=imports[iId]["price"][pId];
				}else if(mini==imports[iId]["price"][pId]){
					miniId.push(iId);
				}
			}
		}
		if(miniId.length>0){
			for(var i=0;i<miniId.length;i++){
				$("imports"+miniId[i]+"p"+pId).style.border="1px solid "+(miniId.length==1?"red":"#FF00FF");
			}
		}
	}
	cell=null;miniId=null;
}catch(err){GM_log("ERROR: redrawImportTable \n"+err);}
}

function closeInfoPanel(){
	try{window.clearInterval(priceUpdateBlink);}catch(err){}
	click($("infoPanelClose"));
}

function buildInfoPanel(mode,mode2){
	if(mode2==undefined){ mode2 = ""; }
	var container = $("infoPanel");
	if((container.style.zIndex=="101")&&(mode==container.getAttribute("mode"))&&(implode(mode2)==container.getAttribute("mode2"))){
		closeInfoPanel();
	}else{
		container.setAttribute("mode",mode);
		container.setAttribute("mode2",implode(mode2));
		container.style.display = "block";
		container.style.zIndex = "101";

		container = $("infoPanelInner");
		container.innerHTML = "";
		container.style.width = "90%";
		container.style.background = "";

		$("multiframe").style.zIndex = "99";
		$("transp100").style.display = "block";

		switch(mode){
		case "saleslist":{
		// try{
			if(mode2){
				GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeSalesList",mode2);
			}else{
				mode2 = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeSalesList","cvez");
			}

			var newdiv = createElement("div",{"id":"offertypeselector","class":"productSort","style":"position:absolute;top:0px;left:0px;"},container);
			newdiv.addEventListener("mouseover",function(event){
				var node = event.target;
				while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node = node.parentNode; }
				if(node!=this){ showToolTip(event,node.getAttribute("mouseOverText")); }
			},false);
			var newdiv1 = createElement("div",{"mouseOverText":texte["category"]["v"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
			if(mode2.match(/v/)){
				newdiv1.style.backgroundPosition="-10px -20px";
			}else{
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false);
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/v/)){
						mode2.replace(/v/,"");
					}else{
						mode2 += "v";
					}
				}else{
					mode2 = "v";
				}
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("saleslist",mode2);
			},false);

			newdiv1 = createElement("div",{"mouseOverText":texte["category"]["c"]+"<br>"+texte["category"]["e"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
			if(mode2.match(/c/)&&mode2.match(/e/)){
				newdiv1.style.backgroundPosition="-62px -20px";
			}else{
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false);
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/ce/)){
						mode2.replace(/ce/,"");
					}else{
						mode2 += "ce";
					}
				}else{
					mode2 = "ce";
				}
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("saleslist",mode2);
			},false);

			newdiv1 = createElement("div",{"mouseOverText":texte["category"]["z"],"class":"link","style":"float:left;height:20px;width:26px;background:url('"+GFX+"racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
			if(mode2.match(/z/)){
				newdiv1.style.backgroundPosition="-36px -20px";
			}else{
				newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false);
				newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
			}
			newdiv1.addEventListener("click",function(event){
				if(event.ctrlKey){
					if(mode2.match(/z/)){
						mode2.replace(/z/,"");
					}else{
						mode2 += "z";
					}
				}else{
					mode2 = "z";
				}
				$("infoPanel").setAttribute("mode","");
				buildInfoPanel("saleslist",mode2);
			},false);

			// *****------------------------------------------------------------------

			var newtable = createElement("table",{"id":"saleslisttable","border":"1","style":"width:100%;"},container);
			newtable.addEventListener("mouseover",function(event){
				var node = event.target;
				while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node = node.parentNode; }
				if(node!=this){ showToolTip(event,node.getAttribute("mouseOverText"),this); }
			},false);
			var newtr = createElement("tr",{},newtable);
			var newtd = createElement("td",{},newtr);
			var newelm = null;
			var newspan = null;
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;","colspan":"3"},newtr,bestand[0]);
			createElement("td",{"style":"border:none;","colspan":"1"},newtr);
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_factor"]);
			createElement("td",{"style":"border:none;display:none;","importpart":true,"colspan":imports.length},newtr);

			newtd = createElement("td",{"style":"border:none;text-align:center;","colspan":"4","rowspan":"2"},newtr);
			newelm = createElement("button",{"type":"text","class":"link","id":"saleslistupdate","style":"text-align:center;width:100%;height:36px;"},newtd,texte["saleslist"]["button_priceupdate"]);
			newelm.addEventListener("click",function(){
				showForPriceUpdate(false);
				updatePriceMarket("update");
			},false);
			var oldclass = "c";

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{"style":"background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_quest"]);
			createElement("td",{"style":"text-align:right;","colspan":"3"},newtr,numberFormat(bestand[2]));

			newtd = createElement("td",{"style":"border:none;","colspan":"1"},newtr);
			newtd = createElement("td",{"style":"text-align:right;"},newtr);
			newelm = createElement("input",{"type":"text","id":"saleslistfactor","style":"text-align:right;width:50px;"},newtd);
			newelm.value = numberFormat(STD_SELL_FACTOR,2);
			newelm.addEventListener("focus",function(){this.select();},false);
			newelm.addEventListener("change",function(){
				STD_SELL_FACTOR = Number(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."));
				if(DEVMODE){ GM_log("STD_SELL_FACTOR:"+STD_SELL_FACTOR); }
				this.value = numberFormat(STD_SELL_FACTOR,2);
				GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_factor",""+STD_SELL_FACTOR);
				var pId;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					updatePricing(pId, "init");
				}
				calc_total();
			},false);
			newtd = createElement("td",{"style":"border:none;display:none;","importpart":true,"colspan":imports.length},newtr);

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{"style":"background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_questcalcto"]);
			newtd = createElement("td",{"style":"text-align:right;","colspan":"3"},newtr);
			var newsel = createElement("select",{"class":"link","id":"questselect","style":"width:100%;height:18px;direction:rtl"},newtd);
			createElement("option",{"value":0},newsel,"-");
			for(var i=bestand[2];i<QUESTS.length;i++){
				createElement("option",{"value":i},newsel,i);
			}
			newsel.addEventListener("change",function(){
				bestand[3] = parseInt(this.value,10);
				doSaleslistUpdate("update");
			},false);
			newsel.value = bestand[3];
			newsel=null;i=null;

			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_amount"] );
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_price"] );

			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;display:none;","importpart":true,"colspan":imports.length},newtr,"imports" );//TODO texte "imports"
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_min"] );
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_avg"] );
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_max"] );
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,texte["saleslist"]["column_total"] );

			var boolThisProdOver=false,newelm=null,pId=0;
			for(var v=0;v<prodNameSortAll.length;v++){
				boolThisProdOver=false;
				pId = prodNameSortAll[v];

				if(mode2.search(unsafeWindow.GMprodTyp[pId])>=0){
					if(oldclass!=unsafeWindow.GMprodTyp[pId]){
						createElement("td",{"colspan":STDTABLEWIDTH,"seperator":true},createElement("tr",{},newtable));
						oldclass = unsafeWindow.GMprodTyp[pId];
					}
					newtr = createElement("tr",{"style":"height:21px;","pId":pId},newtable);
					newtd = createElement("td",{"style":"white-space:nowrap;"},newtr);
					produktPic(0,pId,newtd);
					if(!unsafeWindow.GMprodBlock[pId]){ // if(unsafeWindow.GMprodBlock[pId].match(/^[lt]*$/)){
						newtd.setAttribute("mouseOverText",texte["goToMarket"].replace("%1%",unsafeWindow.GMprodName[0][pId]));
						newa = createElement("a",{"id":pId},newtd,unsafeWindow.GMprodName[0][pId]);
						newa.setAttribute("class","link");
						newa.addEventListener("click",function(){showMarket(this.id);},false);
					}else{
						createElement("span",{"id":pId},newtd,unsafeWindow.GMprodName[0][pId]);
					}

					newtd = createElement("td",{"style":"text-align:right;white-space:nowrap;"},newtr);
					newelm = createElement("div",{"class":"link playerContract","style":"float:none;position:relative;margin:0px 1px 0px 1px;width:13px;","prodId":pId},newtd);
					createElement("div",{},newelm);
					newelm.addEventListener("mouseover",function(event){
						if(top.window.wrappedJSObject.GMprodBlock[this.getAttribute("prodId")].match(/t/)){
							showToolTip(event,"---");
						}else{
							showToolTip(event,texte["XmitVertragAuslagern"].replace(/%1%/,top.window.wrappedJSObject.GMprodName[0][unsafeWindow.selected]));
						}
					},false);
					newelm.addEventListener("click",function(){
						var contractData = new Object();
						var price=0,amount=0;
						var pId = this.parentNode.parentNode.getAttribute("pId");
						if($("sellprice"+pId)&& $("sellamnt"+pId)){
							price = Number($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
							amount = Number($("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
							if(amount> 0 && price > 0){
								contractData[pId] = [amount,price];
							}
							// GM_log("contractData:"+implode(contractData));
							pushToMarket(contractData);
						}
						contractData=null;
					},false);

					newtd = createElement("td",{"style":"text-align:right;white-space:nowrap;"},newtr);
					newelm = createElement("input",{"class":"link","type":"checkbox","checked":!!bestand[13][pId],"id":"dontsell"+pId,"name":"dontsell","style":"width:13px;","prodId":pId},newtd);
					newelm.addEventListener("click",function(){
						bestand[13][this.getAttribute("prodId")] = this.checked;
						GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",implode(bestand));
						calc_total();
					},false);
					newelm.addEventListener("mouseover",function(event){
						showToolTip(event,"Check to never sell this product");
					},false);

					newtd = createElement("td",{"id":"salesListRack"+pId,"style":"text-align:right;white-space:nowrap;"},newtr);
					boolThisProdOver = updateRackAmount(pId);

					newtd = createElement("td",{"style":"text-align:right;"},newtr);
					if(!unsafeWindow.GMprodBlock[pId]){
						newelm = createElement("input",{"class":"text","type":"text","id":"sellamnt"+pId,"name":"sellamnt","style":"text-align:right;width:50px;","prodId":pId},newtd);
						newelm.addEventListener("focus",function(){this.select();},false);
						newelm.addEventListener("change",function(){
							updateAmount(this.getAttribute("prodId"),"update");
						},false);
						newelm.addEventListener("dblclick",function(){
							updateAmount(this.getAttribute("prodId"),"remove");
						},false);
						updateAmount(pId,"init");
					}
					newtd = createElement("td",{"style":"text-align:right;"},newtr);
					if(!unsafeWindow.GMprodBlock[pId]){
						newelm = createElement("input",{"class":"text","type":"text","id":"sellprice"+pId,"name":"sellprice","style":"text-align:right;width:60px;","prodId":pId},newtd);
						newelm.addEventListener("focus",function(){this.select();},false);
						newelm.addEventListener("change",function(){
							updatePricing(this.getAttribute("prodId"),"update");
						},false);
						newelm.addEventListener("dblclick",function(){
							updatePricing(this.getAttribute("prodId"),"remove");
						},false);
						newelm.addEventListener("mouseover",function(event){
							var pId = this.parentNode.parentNode.getAttribute("pId");
							var cnt = "";
							if(bestand[5][pId]){
								cnt += "<table style=\"border:0px;padding:0px 3px;\">";
								cnt += "<tr><td>Min</td><td>"+numberFormat((bestand[5][pId]/bestand[7][pId])*100,1)+"%</td></tr>";
								cnt += "<tr><td>Avg</td><td>"+numberFormat((bestand[5][pId]/bestand[8][pId])*100,1)+"%</td></tr>";
								cnt += "<tr><td>Max</td><td>"+numberFormat((bestand[5][pId]/bestand[9][pId])*100,1)+"%</td></tr>";
								cnt += "</table>";
							}
							if(imports.length>0){
								cnt += "<table style=\"border:0px;padding:0px 3px;\">";
								for (var iId=0;iId<imports.length;iId++){
									cnt += "<tr><td>"+imports[iId]["name"]+"</td><td>Price</td><td>"; //TODO texte "Price"
									cnt += (imports[iId]["price"][pId] || imports[iId]["price"][pId]==0)?moneyFormat(imports[iId]["price"][pId],2):"--";
									cnt += "</td><td>Limit</td><td>"; //TODO texte "limit"
									cnt += (imports[iId]["limit"][pId] || imports[iId]["limit"][pId]==0)?imports[iId]["limit"][pId]:"--";
									cnt +="</td></tr>";
								}
								cnt += "</table>";
							}
							if(cnt){
								showToolTip(event, cnt ,this);
							}
						},false);
						updatePricing(pId,"init");
					}
					if(DEVFORUMINDEX){
						for (var iId=0;iId<imports.length;iId++){
							newtd = createElement("td",{"id":"imports"+iId+"p"+pId,"style":"text-align:right;white-space:nowrap;","iId":iId},newtr);
							newtd.addEventListener("mouseover",function(event){
								var iId = this.getAttribute("iId");
								var pId = this.parentNode.getAttribute("pId");
								var cnt = "<table style=\"color:white;\"><tr><th colspan=2>"+imports[iId]["name"]+"</th></tr>";
								if(imports[iId]["price"][pId]){cnt += "<tr><td>Prijs datum:</td><td>"+getDateStr(imports[iId]["pricedate"][pId],2)+"</td></tr>";} //TODO texte
								if(imports[iId]["limit"][pId]){cnt += "</td><td>Limit</td><td>"+((imports[iId]["limit"][pId] || imports[iId]["limit"][pId]==0)?imports[iId]["limit"][pId]:"--")+"</td></tr>";} //TODO texte "limit"
								if(imports[iId]["oldprice"][pId]){cnt += "<tr style=\"border-top:1px solid white;\"><td>Oude Prijs:</td><td>"+moneyFormat(imports[iId]["oldprice"][pId],2)+"</td></tr>";} //TODO texte
								if(imports[iId]["oldpricedate"][pId]){cnt += "<tr><td>Oude Prijs datum:</td><td>"+getDateStr(imports[iId]["oldpricedate"][pId],2)+"</td></tr>";} //TODO texte
								if(imports[iId]["date_made"]){cnt += "<tr style=\"border-top:1px solid white;\"><td>Forum Created:</td><td>"+getDateStr(imports[iId]["date_made"],2) + "&nbsp;"+ getDaytimeStr(imports[iId]["date_made"],true)+"</td></tr>";} //TODO texte
								if(imports[iId]["date_edit"]){cnt += "<tr><td>Forum Edited:</td><td>"+getDateStr(imports[iId]["date_edit"],2)+"&nbsp;"+getDaytimeStr(imports[iId]["date_edit"],true)+"</td></tr>";} //TODO texte
								if(imports[iId]["updateDate"]){cnt += "<tr><td>Last Updated:</td><td>"+getDateStr(imports[iId]["updateDate"],2)+"&nbsp;"+getDaytimeStr(imports[iId]["updateDate"],true)+"</td></tr>";} //TODO texte
								cnt += "</table>";
								showToolTip(event, cnt, this);//TODO texte
							},false);
						}
					}
					
					newtd = createElement("td",{"id":"PriceMin"+pId,"style":"text-align:right;"},newtr);
					newtd.addEventListener("mouseover",function(event){
						var pId = this.parentNode.getAttribute("pId");
						var NPCprice = NPC_price(pId);
						var cnt = "90% = "+numberFormat(bestand[7][pId]*0.9,pId==0?0:2) + "<br>" + numberFormat(STD_SELL_FACTOR*100,0)+"% = "+numberFormat(bestand[7][pId]*STD_SELL_FACTOR,pId==0?0:2)+(bestand[7][pId]==NPCprice?"<br>same as NPC":(bestand[7][pId]>NPCprice)?"<br>larger then NPC":"");
						showToolTip(event, cnt, this);
					},false);
					newtd = createElement("td",{"id":"PriceAvg"+pId,"style":"text-align:right;"},newtr);
					newtd.addEventListener("mouseover",function(event){
						var pId = this.parentNode.getAttribute("pId");
						var NPCprice = NPC_price(pId);
						var cnt = "90% = "+numberFormat(bestand[8][pId]*0.9,pId==0?0:2) + "<br>" + numberFormat(STD_SELL_FACTOR*100,0)+"% = "+numberFormat(bestand[8][pId]*STD_SELL_FACTOR,pId==0?0:2)+(bestand[8][pId]==NPCprice?"<br>same as NPC":(bestand[8][pId]>NPCprice)?"<br>larger then NPC":"");
						showToolTip(event, cnt, this);
					},false);
					newtd = createElement("td",{"id":"PriceMax"+pId,"style":"text-align:right;"},newtr);
					newtd.addEventListener("mouseover",function(event){
						var pId = this.parentNode.getAttribute("pId");
						var NPCprice = NPC_price(pId);
						var cnt = "90% = "+numberFormat(bestand[9][pId]*0.9,pId==0?0:2) + "<br>" + numberFormat(STD_SELL_FACTOR*100,0)+"% = "+numberFormat(bestand[9][pId]*STD_SELL_FACTOR,pId==0?0:2)+(bestand[9][pId]==NPCprice?"<br>same as NPC":(bestand[9][pId]>NPCprice)?"<br>larger then NPC":"");
						showToolTip(event, cnt, this);
					},false);
					newtd = createElement("td",{"id":"salestotal"+pId,"style":"text-align:right;"},newtr);
					if($("sellprice"+pId) && $("sellamnt"+pId)){
						newtd.innerHTML = numberFormat($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,".")*$("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."),pId==0?0:2);
					}
				}
			}
			createElement("td",{"colspan":STDTABLEWIDTH,"seperator":true},createElement("tr",{},newtable));

			newtr = createElement("tr",{},newtable);
			newtd = createElement("td",{"style":"text-align:right;border:none;","colspan":6},newtr);
			newelm = createElement("button",{"class":"link","style":"margin-right:5px;"},newtd,texte["saleslist"]["button_reset_amount"]);
			newelm.addEventListener("click",function(){
				var pId;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					updateAmount(pId,"remove");
				}
			},false);

			//newtd = createElement("td",{"style":"text-align:center;border:none;"},newtr);
			newelm = createElement("button",{"class":"link","style":"margin-right:5px;"},newtd,texte["saleslist"]["button_zero_amount"]);
			newelm.addEventListener("click",function(){
				var pId;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					updateAmount(pId,"zero");
				}
			},false);

			//newtd = createElement("td",{"style":"text-align:center;border:none;"},newtr);
			newelm = createElement("button",{"class":"link","style":"margin-right:5px;"},newtd,texte["saleslist"]["button_reset_price"]);
			newelm.addEventListener("click",function(){
				var pId;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					updatePricing(pId, "remove");
				}
			},false);

			createElement("td",{"style":"text-align:center;border:none;display:none;","importpart":true,"colspan":imports.length},newtr);
			createElement("td",{"style":"text-align:center;background-color:#CCCCFF;"},newtr,"Total"); //TODO texte "Total"
			createElement("td",{"id":"saleslisttotal","colspan":"3","style":"text-align:right;"},newtr);

			newtd = createElement("td",{"style":"text-align:center;","colspan":STDTABLEWIDTH,"seperator":true},createElement("tr",{},newtable));
			newelm = createElement("button",{"class":"link","style":"padding:0px 5px;"},newtd,texte["saleslist"]["button_contract"]);
			newelm.addEventListener("click",function(){
				// contractData {"10":[500,10],"11":[200,20],"8":[500,6.1],"12":[50,75]}
				var contractData = new Object();
				var contractDataLength=0,pId=0,price=0,amount=0;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					if(!$("sellprice"+pId)||!$("sellamnt"+pId)) continue;
					price = Number($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					amount = Number($("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));

					if(amount> 0 && price > 0 && !bestand[13][pId]){
						if(contractDataLength < 8){
							contractData[pId] = [amount,price];
						}
						contractDataLength++;
					}
				}
				// GM_log("contractData:"+implode(contractData));
				if(contractDataLength<=8 && contractDataLength>0){
					pushToMarket(contractData);
				}else	if(contractDataLength>8){
						if(confirm(texte["saleslist"]["alert_contact_more8"])){
							//GM_log("contractData:"+implode(contractData));
							pushToMarket(contractData);
						}
				}else{
					alert(texte["saleslist"]["alert_contact_none"]);
				}
				contractData=null;
			},false);

			newelm = createElement("button",{"class":"link","style":"padding:0px 5px;"},newtd,texte["saleslist"]["button_market"]);
			newelm.addEventListener("click",function(){
				// contractData {"10":[500,10],"11":[200,20],"8":[500,6.1],"12":[50,75]}
				var contractData = new Object();
				var contractDataLength=0,pId=0,price=0,amount=0;
				var msgtext = "";
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					if(!$("sellprice"+pId)||!$("sellamnt"+pId)) continue;
					price = Number($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					amount = Number($("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					if(amount> 0 && price > 0 && !bestand[13][pId]){
						contractData[pId] = [amount,price];
						contractDataLength++;
						msgtext += numberFormat(amount)+"&nbsp;pieces&nbsp;of&nbsp;"+unsafeWindow.GMprodName[0][pId]+"&nbsp;for&nbsp;"+moneyFormat(price)+"&nbsp;\n"; //TODO texte
					}
				}
				msgtext = msgtext.replace(/&nbsp;/ig," ");
				// GM_log("contractData:"+implode(contractData));
				if(contractDataLength==0){
					alert(texte["saleslist"]["alert_market_none"]);
				}else{
					if(confirm("Do You really want to sell these products:\n"+msgtext)){ //TODO texte
						if(contractDataLength >10){
							if(confirm("Are you really sure to sell these much product at ones:\n"+msgtext)){ //TODO texte
								GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketData",implode(contractData));
								showMarketStall();
							}
						}else{
							GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketData",implode(contractData));
							showMarketStall();
						}
					}
				}
				contractData=null;
			},false);

			createElement("br",{},container);

			//-------------------------------------------------------------------------------------------------------------------
			if(DEVFORUMINDEX){
				newtable = createElement("table",{"border":"1","style":"width:100%;"},container);
				createElement("tr",{"style":"height:18px;"},newtable);
				newtr = createElement("tr",{"style":"background-color:#b69162;"},newtable);
				newtd = createElement("th",{"id":"importsTh","style":"text-align:center;","colspan":STDTABLEWIDTH,"seperator":true},newtr,"Imports for forum"); //TODO texte "Imports for forum"
	
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:center;","colspan":STDTABLEWIDTH,"seperator":true},newtr);
				newelm = createElement("button",{"class":"link","id":"importsview","style":"margin-right:5px;"},newtd,"view import in table"); //TODO texte "remove"
				newelm.disabled = (imports.length<=0);
				newelm.addEventListener("click",function(){
				try{
					importsShow = (importsShow==false);
					this.innerHTML = importsShow?"hide import in table":"view import in table"; //TODO texte
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_importsShow",importsShow);
					redrawImportTable();
				}catch(err){GM_log("ERROR: view click\n"+err);}
				},false);
				newelm = createElement("button",{"class":"link","id":"importsupdate","style":"margin-right:5px;","iId":""},newtd,"update imports"); //TODO texte "update"
				newelm.addEventListener("click",function(){
					var iId = $("importsTable").getAttribute("iId");
					GM_log("click importsupdate iId:"+iId+":"+!!iId);
					if(iId){
						GM_log("update import 1 iId:"+iId);
						parseImport(iId, false, false);
					}else{
						GM_log("update import all iId:"+iId);
						parseImport(0, false, true);
					}
				},false);
				newelm = createElement("button",{"class":"link","id":"importsremove","style":"margin-right:5px;","disabled":true},newtd,"remove active import"); //TODO texte "remove"
				newelm.addEventListener("click",function(){
				try{
					var iId = $("importsTable").getAttribute("iId");
					if(iId && !isNaN(iId)){
						iId = parseInt(iId,10);
						if(confirm("Remove Site:"+iId)){ //TODO texte
							imports.splice(iId,1);
							GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
							removeElement($("importsButton"+iId));
							$("importsTable").setAttribute("iId","");
							$("importsTable").style.display = "none";
							$("importsremove").disabled = (imports.length<=0);
							$("importsview").disabled = (imports.length<=0);
							var elm;
							for(++iId;iId<=imports.length;iId++){
								elm = $("importsButton"+iId);
								elm.setAttribute("iId",(iId-1));
								elm.id = "importsButton"+(iId-1);
								elm.innerHTML = "Site:"+(iId-1); //TODO texte "site:"
							}
							var tr=$("saleslisttable").querySelectorAll("tr[pId]");
							for(var i=0;i<tr.length;i++){
								removeElement(tr[i].children[6+iId-1]);
							}
							redrawImportTable();
						}
					}
				}catch(err){GM_log("ERROR: remove click\n"+err);}
				},false);
				newelm = createElement("button",{"class":"link","id":"importsadd","style":"margin-right:5px;"},newtd,"add import"); //TODO texte "add"
				newelm.addEventListener("click",function(){
					var iId = imports.push(explode(EMPTYIMPORT))-1;
					//GM_log("Imports Add:"+iId);
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
					createImportButton(iId,$("importsButtonTd"));
					$("importsview").disabled = (imports.length<=0);
					var newelm, pId;
					var tr=$("saleslisttable").querySelectorAll("tr[pId]");
					for (var i=0; i<tr.length; i++){
						pId = tr[i].getAttribute("pId");
						newelm = createElement("td",{"id":"imports"+iId+"p"+pId,"style":"text-align:right;white-space:nowrap;","iId":"iId"});
						newelm.addEventListener("mouseover",function(event){
							var iId = this.getAttribute("iId");
							showToolTip(event, imports[iId]["name"], this);
						},false);
						tr[i].insertBefore(newelm, tr[i].children[6+iId]);
					}
					tr=null;newelm=null;pId=null;
					redrawImportTable();
				},false);
	
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"id":"importsButtonTd","style":"text-align:center;","colspan":STDTABLEWIDTH,"seperator":true},newtr);
				for (var iId=0;iId<imports.length;iId++){
					createImportButton(iId,newtd);
				}
	
				newtr = createElement("tr",{"style":"","id":"importsStackTr"},newtable);
				newtr.style.display = (unknownStack.length()>0)?"table-row":"none";
				newtd = createElement("td",{"id":"importsStackTd","style":"text-align:center;","colspan":STDTABLEWIDTH,"seperator":true},newtr);
				newelm = createElement("button",{"class":"link","id":"unknownStackClear","style":"margin-right:5px;float:left;"},newtd,"clear all"); //TODO texte "clear"
				newelm.addEventListener("click",function(){
					unknownStack = new Object();
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_unknownStack",implode(unknownStack));
					$("importsStackTd").innerHTML="";
					$("importsStackTr").style.display = "none";
				},false);
				for(var i in unknownStack){
					if(!unknownStack.hasOwnProperty(i)){continue;}
					newspan = createElement("button",{"id":"unknownStackButton"+i,"uName":i,"style":"margin-right:5px;"},newtd,i);
					newspan.addEventListener("click",function(){
						drawAskUnknowItemBox(this.getAttribute("uName"),$("divAskBoxInner"));
					},false);
					newspan.addEventListener("mouseover",function(evt){
						var stck = unknownStack[parseInt(this.getAttribute("uName"),10)];
						GM_log("stck:"+implode(unknownStack));
						var cnt = "<table>";
						var iId;
						for(var i in stck){
							cnt += "<tr><td><b>"+stck[i]["iId"]+"</b></td><td>"+stck[i]["price"]+"</td><td>"+getDateStr(stck[i]["pricedate"],2)+"&nbsp;"+getDaytimeStr(stck[i]["pricedate"],true)+"</td></tr>";
						}
						cnt += "</table>";
						showToolTip(evt, cnt, this);
					},false);
				}
	
				newtable = createElement("table",{"id":"importsTable","border":"1","style":"width:100%;display:none;","iId":null},container);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("div",{"style":"width:55px;display:inline-block;"},newtd,"Name:"); //TODO texte "Name"
				newelm = createElement("input",{"id":"importsName","style":"margin-left:5px;width:400px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["name"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("button",{"class":"link","id":"importsclear","style":"margin-left:5px;"},newtd,"clear pricing"); //TODO texte "clear pricing"
				newelm.addEventListener("click",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["price"]=new Array();
					imports[iId]["pricedate"]=new Array();
					imports[iId]["oldprice"]=new Array();
					imports[iId]["oldpricedate"]=new Array();
					imports[iId]["updateDate"]=0;
					imports[iId]["limit"]=new Array();
					imports[iId]["date_made"]=0;
					imports[iId]["date_edit"]=0;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
					redrawImportTable();
				},false);
	
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:55px;display:inline-block;"},newtd,"Url:"); //TODO texte "Url"
				newelm = createElement("input",{"id":"importsUrl","style":"margin-left:5px;width:400px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["url"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("button",{"class":"link","id":"importstest","style":"margin-left:5px;"},newtd,"test active"); //TODO texte "test active"
				newelm.addEventListener("click",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					if(iId||iId==0){
						parseImport(iId, true, false);
					}
				},false);
	
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:55px;display:inline-block;"},newtd,"Strip:"); //TODO texte "Strip"
				newelm = createElement("input",{"id":"importsRegStrip","style":"margin-left:5px;width:500px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regStrip"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:55px;display:inline-block;"},newtd,"Regexp:"); //TODO texte "Regexp"
				newelm = createElement("input",{"id":"importsRegExp","style":"margin-left:5px;width:500px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexp"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:100px;display:inline-block;"},newtd,"Regexp Product:"); //TODO texte "Regexp prodcut"
				newelm = createElement("input",{"id":"importsRegExpProd","style":"margin-left:5px;width:430px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpProd"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpProdNum","style":"margin-left:5px;width:20px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpProdNum"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:100px;display:inline-block;"},newtd,"Regexp Price:"); //TODO texte "Regexp price"
				newelm = createElement("input",{"id":"importsRegExpPrice","style":"margin-left:5px;width:230px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpPrice"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpPriceReplaceFind","style":"margin-left:5px;width:115px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpPriceReplaceFind"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpPriceReplaceWith","style":"margin-left:5px;width:70px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpPriceReplaceWith"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpPriceNum","style":"margin-left:5px;width:20px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpPriceNum"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"style":"text-align:left;position:relative;"},newtr);
				newspan = createElement("span",{"style":"width:100px;display:inline-block;"},newtd,"Regexp Limit:"); //TODO texte "Regexp limit"
				newelm = createElement("input",{"id":"importsRegExpLimit","style":"margin-left:5px;width:230px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpLimit"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpLimitReplaceFind","style":"margin-left:5px;width:115px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpLimitReplaceFind"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpLimitReplaceWith","style":"margin-left:5px;width:70px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpLimitReplaceWith"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				newelm = createElement("input",{"id":"importsRegExpLimitNum","style":"margin-left:5px;width:20px;overflow:hidden;"},newtd);
				newelm.addEventListener("change",function(){
					var iId = parseInt($("importsTable").getAttribute("iId"),10);
					imports[iId]["regexpLimitNum"] = this.value;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports",implode(imports));
				},false);
				createElement("br",{},container);
			}

			newtable = createElement("table",{"border":"1","style":"width:100%;"},container);
			newtr = createElement("tr",{},newtable);

			newtd = createElement("td",{"style":"text-align:center;"},newtr);
			newelm = createElement("button",{"class":"link"},newtd,texte["saleslist"]["button_reset_all"]);
			newelm.addEventListener("click",function(){
				bestand = explode(EMPTYFILE);
				$("questselect").value = bestand[3] = QUESTS.length-1;
				doSaleslistUpdate();
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					updatePricing(pId, "init");
				}
				showForPriceUpdate(checkPriceUpdate());
				updatePriceMarket("init");
			},false);

			newtd = createElement("td",{"style":"text-align:center;"},newtr);
			newelm = createElement("button",{"class":"link"},newtd,texte["saleslist"]["button_list"]);
			newelm.addEventListener("click",function(){
				var cell = $("textsaleslist");
				var line = $("textlineitem");
				cell.value = "";
				var pId=0,price=0,amount=0;
				for(var v=0;v<prodNameSortAll.length;v++){
					pId = prodNameSortAll[v];
					if(!$("sellprice"+pId)||!$("sellamnt"+pId)) continue;
					price = Number($("sellprice"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					amount = Number($("sellamnt"+pId).value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					if(amount> 0 && price > 0){
						// GM_log("do line pId:"+pId );
						cell.value += line.value.replace(/%PROD_NAME%/g,unsafeWindow.GMprodName[0][pId]).replace(/%AMOUNT%/g,$("sellamnt"+pId).value).replace(/%PRICE%/g,$("sellprice"+pId).value).replace(/%PROD_NUM%/g,pId).replace(/%SYMBOL%/g,texte["waehrung"]);
						cell.value += "\n";
					}
				}
				change(cell);
				this.parentNode.parentNode.parentNode.parentNode.scrollTop = this.parentNode.parentNode.parentNode.parentNode.scrollHeight;
			},false);

			newtr = createElement("tr",{"style":"width:100%;"},newtable);
			newtd = createElement("td",{"style":"","colspan":"4"},newtr,texte["saleslist"]["tutorial_line"]);

			newtr = createElement("tr",{"style":"width:100%;"},newtable);
			newtd = createElement("td",{"style":"text-align:right;","colspan":"4"},newtr);
			newelm = createElement("textarea",{"id":"textlineitem","style":"width:100%;","class":"text"},newtd);
			newelm.value = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_lineitem",texte["saleslist"]["example_line"]);
			newelm.addEventListener("change",function(){
				GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_lineitem",this.value);
			},false);

			newtr = createElement("tr",{"style":"width:100%;"},newtable);
			newtd = createElement("td",{"style":"","colspan":"4"},newtr,texte["saleslist"]["created_text"]);

			newtr = createElement("tr",{"style":"width:100%;"},newtable);
			newtd = createElement("td",{"style":"text-align:right;","colspan":"4"},newtr);
				newelm = createElement("textarea",{"id":"textsaleslist","style":"width:100%;overflow:visible;min-height:42px;"},newtd);
				newelm.addEventListener("change",function(){
					this.style.height = this.scrollHeight + "px";
					this.value = this.value.replace(/&nbsp;/g,"");
				},false);

			updatePriceMarket("init");
			showForPriceUpdate(checkPriceUpdate());
			redrawImportTable();

			newtable=null;newtr=null;newtd=null;newdiv=null;newdiv1=null;newelm=null;
			break;
		// }catch(err){GM_log("ERROR buildInfoPanel pId:"+pId+" \n"+err);}
		}
		default:
			break;
		}
	}
	container=null;
}// end buildinfo

var tempTimer = null;
function do_marktstand(){
try{
	if(DEVMODE){ GM_log("Saleslist-Script do_marktstand"); }
	if(DEVMODE){ showInLogBubble("Saleslist-Script do_marktstand"); }

	var pushdata = new Object();
	try{ pushdata = explode(GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketData","{}")); }catch(err){}
	var amount, price;
	var pId = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",-1);
	try{window.clearInterval(tempTimer);}catch(err){}

	if(pId>=0 && !$("produckt_max")){
		GM_log("commission"+pId);
		tempTimer= window.setInterval(function(){
		try{
			if(DEVMODE){ GM_log("do_martkstand interval run pId:"+pId); }
			if($("chosenobj").value == pId){
				try{window.clearInterval(tempTimer);}catch(err){}
				//GM_log("do_marktstand commission click pId:"+pId);
				window.setTimeout(function(pId){
					if(DEVMODE){ GM_log("Accept 10% "+top.window.wrappedJSObject.GMprodName[0][pId]); }
					showInLogBubble("Accept 10% "+top.window.wrappedJSObject.GMprodName[0][pId],10,"red");
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",-1);
					delete pushdata[pId];
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketData",implode(pushdata));
					//unsafeWindow.form_verkaufe_markt.submit();
					click($("verkaufe_markt"));
				},getRandom(500,1200),pId);
			}
		}catch(err){
			GM_log("ERROR: do_marktstand interval \n"+err);
			GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",-1);
		}
		},200,pushdata,pId);
	}else if($("preisschild").style.display=="none"){
		//GM_log("pushdata"+implode(pushdata));
		for (pId in pushdata){
			if(!pushdata.hasOwnProperty(pId)){ pId=null;continue; }
			amount = pushdata[pId][0];
			price = pushdata[pId][1];
			break;
		}
		if(DEVMODE){ GM_log("do_martkstand pushdata pId:"+pId+" amount:"+amount+" price:"+price); }
		if(cand=$("p"+pId)){
			unsafeWindow.zeigePreisschild(unsafe$("p"+pId));
			cand.setAttribute("style","position: absolute; top: 380px; left: 515px; z-index: 0;");
			//GM_log("do_martkstand zeigePreisschild pId:"+pId);
			tempTimer = window.setInterval(function(){
			try{
				if(DEVMODE){ GM_log("do_martkstand interval run pId:"+pId); }
				if(pId==0 && $("chosenobj2").value == pId){
					try{window.clearInterval(tempTimer);}catch(err){}
					var cent = parseInt((price-parseInt(price,10))*100,10);
					$("p_anzahl").value = amount;
					$("p_preis1").value = parseInt(price,10);
					$("p_preis2").value = cent<10?"0"+cent:cent;
					$("p_coinstype").value = 2;
					window.setTimeout( function(pId){
						if(DEVMODE){ GM_log("Post products: "+amount+" "+top.window.wrappedJSObject.GMprodName[0][pId]); }
						showInLogBubble("Post products: "+amount+" "+top.window.wrappedJSObject.GMprodName[0][pId],10,"red");
						delete pushdata[pId];
						GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketData",implode(pushdata));
						try{
							//unsafeWindow.form_verkaufe_markt.submit();
							click(document.getElementsByName("verkaufe_markt")[0]);
						}catch(err){
							GM_log("ERROR: do_marktstand click coins \n"+err);
						}
					},getRandom(500,1200),pId);
				}else if($("chosenobj").value == "p"+pId){
					try{window.clearInterval(tempTimer);}catch(err){}
					var cent = parseInt((price-parseInt(price,10))*100,10);
					$("produkt_anzahl").value = amount;
					$("produkt_preis1").value = parseInt(price,10);
					$("produkt_preis2").value = cent<10?"0"+cent:cent;
					GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",pId);
					window.setTimeout( function(pId){
						if(DEVMODE){ GM_log("Post products: "+amount+" "+top.window.wrappedJSObject.GMprodName[0][pId]); }
						showInLogBubble("Post products: "+amount+" "+top.window.wrappedJSObject.GMprodName[0][pId],10,"red");
						unsafeWindow.form_prepare_markt.submit();
					},getRandom(500,1200),pId);
				}
			}catch(err){
				GM_log("ERROR: do_marktstand interval \n"+err);
				GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",-1);
			}
			},200,pId,amount,price);
		}
	}else{
		GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_doPushToMarketSend",-1);
	}
}catch(err){GM_log("ERROR: do_marktstand \n"+err);}
}

function do_main(){
	try{
		if(DEVMODE){ GM_log("Saleslist-Script started"); }
		if(DEVMODE){ showInLogBubble("Saleslist-Script started"); }

		// Updatecheck
		if((!unsafeWindow.GMberaterVersion)||(compareVersions(neededVersionBerater,unsafeWindow.GMberaterVersion)>0)){
			alert2(texte["saleslist"]["shouldUpdateBerater"],texte["ok"]);
		}
		// Updatecheck
		var updateCheck = new Array(); // time,version on server,last checked version
		try{ updateCheck = explode(GM_getValue("updateCheck",'[0,"'+VERSION+'","'+VERSION+'"]')); }catch(err){}
		if(GM_getValue("valUpdate",true)&&(now-updateCheck[0]>1800)){
			showInLogBubble("Checking for update (Saleslist)");
			updateCheck[0] = now;
			GM_setValue2("updateCheck",implode(updateCheck));
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/"+USO_ID+".meta.js",
				onload: function(response){
					if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
						updateCheck[1] = (/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
						if(VERSION==updateCheck[1]){
							// this script is the one of the server
							updateCheck[2] = updateCheck[1];
							GM_setValue2("updateCheck",implode(updateCheck));
							showInLogBubble("Update Check Saleslist: Script is up-to-date");
						}else if(updateCheck[1]!=updateCheck[2]){
							alert2(texte["saleslist"]["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
								updateCheck[2] = updateCheck[1];
								GM_setValue2("updateCheck",implode(updateCheck));
								window.setTimeout(function(){
									location.href = "http://userscripts.org/scripts/source/"+USO_ID+".user.js";
								},0);
							},function(){
								updateCheck[2] = updateCheck[1];
								GM_setValue2("updateCheck",implode(updateCheck));
							});
						}else{
							showInLogBubble("Update Check Saleslist: Newer version available, but not wanted");
						}
					}else{
						showInLogBubble("Update Check Saleslist failed. Bad Response: "+response.responseText);
					}
				}
			});
		}
		GM_registerMenuCommand(texte["saleslist"]["saleslist"]+" "+"Update", function(){
			location.href = "http://userscripts.org/scripts/source/"+USO_ID+".user.js";
		});

		if(DEVFORUMINDEX){
			imports = explode(GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_imports","[]"));
			importsShow = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_importsShow",false);
		}else{
			imports = new Array();
			importsShow= false;
		}
		productRename = explode(GM_getValue(LNG+"_productRename","{}")); //{prodnamePage:productNameGame}
		unknownStack = explode(GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_unknownStack","{}"));
		show = explode(GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_show","[false]"));

		doSaleslistUpdate();

		document.addEventListener("gameUpdateRack",function(){
			doSaleslistUpdate();
		},false);

		document.addEventListener("gameChangedBeobPrice",function(){
			if($("infoPanel").getAttribute("mode")=="saleslist"){
				window.setTimeout(function(){
					showForPriceUpdate(checkPriceUpdate());
				},1000);
			}
		},false);
		document.addEventListener("gameChangedGut",function(){
			if($("infoPanel").getAttribute("mode")=="saleslist"){
				window.setTimeout(function(){
					showForPriceUpdate(checkPriceUpdate());
				},1000);
			}
		},false);

		var newdiv = createElement("div",{"id":"divBeraterButtonsSellList","mouseOverText":"Sales List","class":"link beraterButtonIcon hoverBgRed"},$("divBeraterButtons"));
		createElement("img",{"src":strImages['saleslist'],"style":"position:relative;top:5px;left:4px;width:22px;height:22px;"},newdiv);
		newdiv.addEventListener("click",function(){
			buildInfoPanel("saleslist");
		},false);

		newdiv = createElement("div",{"style":"position:relative;margin-top:5px;display:block;white-space:nowrap;"},ALL.getElementsByClassName("rahmen_hoch")[2]);
		newdiv = createElement("div",{"id":"salesListNotepadOpener","class":"link","style":"display:inline-block;vertical-align:top;height:25px;width:20px;background:no-repeat scroll center top #000000;"},newdiv);
		createElement("div",{"id":"salesListNotepad","style":"display:"+(show[0]?"inline-block":"none")+";vertical-align:top;border:2px inset black;background-color:white;padding:3px;height:200px;overflow-x:visible;overflow-y:scroll;"},$("salesListNotepadOpener").parentNode);
		newdiv.style.backgroundImage = "url('"+GFX+"arrow_"+(show[0]?"left":"right")+".png')";
		newdiv.addEventListener("click",function(){
			show[0] = !show[0];
			GM_setValueCache(LNG+"_"+SERVER+"_"+FARMNAME+"_show",implode(show));
			if(show[0]){
				this.style.backgroundImage = "url('"+GFX+"arrow_left.png')";
				$("salesListNotepad").style.display = "inline-block";
			}else{
				this.style.backgroundImage = "url('"+GFX+"arrow_right.png')";
				$("salesListNotepad").style.display = "none";
			}
			doSalesListNotepad();
		},false);

		//make AskBox
		newdiv = createElement("div",{id:"divAskBox",style:"position:absolute;top:240px;left:20px;width:660px;padding:2.5% 3%;background-color:#b8a789;z-index:200;display:none;"},$("garten_komplett"));
		createElement("img",{"src":GFX+"guild/help_back.jpg",style:"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
		var newimg = createElement("img",{id:"divAskBoxClose","class":"link queueBoxClose",style:"position:absolute;right:2px;top:2px;","title":"Close","src":GFX+"close.jpg"},newdiv); //TODO texte "Close"
		newimg.addEventListener("click",function(event){if(this.id==event.target.id){
			this.parentNode.style.display="none";
			$("divAskBoxInner").innerHTML="";
		}},false);
		createElement("div",{id:"divAskBoxInner"},newdiv);

		doSalesListNotepad();
		newdiv=null;img=null;
	}catch(err){GM_log("ERROR: general:"+err);}
}

function start_script(){
	LNG = top.window.wrappedJSObject.GMlng;
	var loc = new RegExp("s(\\d+)\\."+GAMEPAGES[LNG].replace(/\./g,"\\."),"i").exec(location.hostname);
	if(loc){
		SERVER = loc[1];
		PAGE = location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
		FARMNAME = unsafeWindow.GMusername.slice();
		//FARMNAME = $("username").innerHTML;

		window.setInterval(function (){
			now = Math.floor((new Date()).getTime()/1000);
		},1000);

		_GM_log = GM_log;
		GM_log = function(txt){
			_GM_log(LNG.toUpperCase()+"-"+SERVER+": "+txt);
		};
		GM_log("Saleslist start_script");

		TOOLTIP = $top("divToolTip");
		LOG_BUBBLE_BOX = $top("divLogBubbleBox");
		texte = top.window.wrappedJSObject.GMtexte;
		delimThou = top.window.wrappedJSObject.GMdelimThou;
		regDelimThou = new RegExp(top.window.wrappedJSObject.GMregDelimThou,"g");
		delimDeci = top.window.wrappedJSObject.GMdelimDeci;
		regDelimDeci = new RegExp(top.window.wrappedJSObject.GMregDelimDeci);

				var help1 = new Array();
		var help2 = new Array();
		var help3 = new Array();
		for (var v=1;v<unsafeWindow.produkt_name.length;v++){
			if(!/[uct]+/.test(unsafeWindow.GMprodBlock[v])){// {if(unsafeWindow.GMprodBlock[v].match(/^[lt]*$/)){
				switch (unsafeWindow.produkt_category[v]){
					case "v": help1.push(v); break;
					case "e": help2.push(v); break;
					case "z": help3.push(v); break;
				}
			}
		}
		prodNameSortAll = ["0"].concat(help1,help2,help3);
		help1=null;help2=null;help3=null;

		STD_SELL_FACTOR = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_factor",0.95);
		bestand = explode(GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_saleslist",EMPTYFILE));
		if(!(bestand instanceof Array)){ bestand = explode(EMPTYFILE); }
		var efile = explode(EMPTYFILE);
		for (i in efile){
			if(!efile.hasOwnProperty(i)){ continue; }
			if((efile[i] instanceof Array) && ( (!(bestand[i] instanceof Array)) || bestand[i]==undefined)){
				GM_log("ERROR bestand["+i+"] is not an Array as it should be");
				bestand[i] = new Array();
			//}else{
				//GM_log("EMPTYFILE["+i+"]="+(efile[i] instanceof Array)+" bestand["+i+"]="+(bestand[i] instanceof Array));
			}
		}
		efile=null;

		function loadLanguage(lang){
			texte["saleslist"] = new Object();
			switch (LNG){
				case "au":case "nz":case "uk":case "us":{
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "bu":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "de":{ // thanks to whitescripter
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "Es liegt eine neue Script-Version der \"Sales List\" vor. Diese installieren?";
					texte["saleslist"]["shouldUpdateBerater"] = "Du solltest das Berater-Script aktualisieren!<br>Das \"Sales List\"-Script wird nicht ordnungsgem"+a_dots+sz+" arbeiten.";
					texte["saleslist"]["editSalesItem"] = "Editiere SalesList Produkt %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "Schlie"+sz+"en";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Reset Menge";
					texte["saleslist"]["button_reset_price"] = "Reset Preis";
					texte["saleslist"]["button_reset_all"] = "Reset alle Daten";
					texte["saleslist"]["button_list"] = "Erzeuge Liste";
					texte["saleslist"]["button_contract"] = "Als Vertrag";
					texte["saleslist"]["button_market"] = "Auf den Markt";
					texte["saleslist"]["button_priceupdate"] = "Neue Preise verf"+u_dots+"gbar";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Faktor";
					texte["saleslist"]["column_questcalcto"] = "Bis Quest";
					texte["saleslist"]["column_amount"] = "Menge";
					texte["saleslist"]["column_price"] = "Preis";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = sign_average;
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "Mehr als 8 Produkte f"+u_dots+"r Vertrag ausgew"+a_dots+"hlt";
					texte["saleslist"]["alert_contact_none"] = "Keine Produkte f"+u_dots+"r Vertrag ausgew"+a_dots+"hlt";
					texte["saleslist"]["alert_market_none"] = "Keine Produkte f"+u_dots+"r Markt ausgew"+a_dots+"hlt";
					texte["saleslist"]["tutorial_line"] = "Zeile je Produkt (nutze :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% f"+u_dots+"r je %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Erzeugter Text";
					break;}
				case "dk":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "es":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "fr":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "gr":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "hu":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "it":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "nl":{
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "Er is een nieuwe script-versie van de \"Sales List\" beschikbaar. Installeren?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The \"Sales List\"-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Bewerk saleslist produkt %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marktprijs";
					texte["saleslist"]["marktpreisAvg"] = "Gem marktprijs";
					texte["saleslist"]["marktpreisMax"] = "Max marktprijs";
					texte["saleslist"]["button_close"] = "sluiten";
					texte["saleslist"]["button_reset_amount"] = "Std Aantal";
					texte["saleslist"]["button_zero_amount"] = "Aantal=0";
					texte["saleslist"]["button_reset_price"] = "Std prijs";
					texte["saleslist"]["button_reset_all"] = "Reset alle data";
					texte["saleslist"]["button_list"] = "Maak lijst";
					texte["saleslist"]["button_contract"] = "Maak contract";
					texte["saleslist"]["button_market"] = "Zet op de markt";
					texte["saleslist"]["button_priceupdate"] = "Nieuwe prijslijst beschikbaar.";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Berek. tot Quest";
					texte["saleslist"]["column_amount"] = "Aantal";
					texte["saleslist"]["column_price"] = "prijs";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Gem";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Totaal";
					texte["saleslist"]["alert_contact_more8"] = "Er zijn meer dan 8 producten geselecteerd voor het maken van een contract.";
					texte["saleslist"]["alert_contact_none"] = "Er zijn geen prodcuten geselecteerd voor het maken van een contract.";
					texte["saleslist"]["alert_market_none"] = "Er zijn geen prodcuten geselecteerd om op de market te verkopen.";
					texte["saleslist"]["tutorial_line"] = "Lijn Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% per stuk %PRICE%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "pl":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "ru":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "se":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
				case "tr":{ // I need a translation :(
					texte["saleslist"]["saleslist"] = "Saleslist";
					texte["saleslist"]["msgUpdate"] = "There is a new script version of Sales List Creator availible. Install?";
					texte["saleslist"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The SalesList-Script will not run properly.";
					texte["saleslist"]["editSalesItem"] = "Edit saleslist product %1%";
					texte["saleslist"]["marktpreisMin"] = "Min marketprice";
					texte["saleslist"]["marktpreisAvg"] = "Avg marketprice";
					texte["saleslist"]["marktpreisMax"] = "Max marketprice";
					texte["saleslist"]["button_close"] = "close";
					texte["saleslist"]["button_reset_amount"] = "Std Amount";
					texte["saleslist"]["button_zero_amount"] = "Amount=0";
					texte["saleslist"]["button_reset_price"] = "Std Price";
					texte["saleslist"]["button_reset_all"] = "Reset all data";
					texte["saleslist"]["button_list"] = "Create List";
					texte["saleslist"]["button_contract"] = "Push to Contract";
					texte["saleslist"]["button_market"] = "Push to market";
					texte["saleslist"]["button_priceupdate"] = "new pricing availible";
					texte["saleslist"]["column_quest"] = "Quest";
					texte["saleslist"]["column_factor"] = "M-Factor";
					texte["saleslist"]["column_questcalcto"] = "Calc until Quest";
					texte["saleslist"]["column_amount"] = "Amount";
					texte["saleslist"]["column_price"] = "Price";
					texte["saleslist"]["column_min"] = "Min";
					texte["saleslist"]["column_avg"] = "Avg";
					texte["saleslist"]["column_max"] = "Max";
					texte["saleslist"]["column_total"] = "Total";
					texte["saleslist"]["alert_contact_more8"] = "More then 8 products selected to push to a contract";
					texte["saleslist"]["alert_contact_none"] = "No products selected to push to a contract";
					texte["saleslist"]["alert_market_none"] = "No products selected to push to the market";
					texte["saleslist"]["tutorial_line"] = "Line Item (use :%PROD_NAME%,%PROD_NUM%,%AMOUNT%,%PRICE%,%SYMBOL%)";
					texte["saleslist"]["example_line"] = "%PROD_NAME% %AMOUNT% a piece %PRICE% %SYMBOL%";
					texte["saleslist"]["created_text"] = "Created Text";
					break;}
			}
		}

		// strImages['arrow5'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAMCAMAAAAERl6qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRFA5PX3BshqRAVcLZVrtaOU8DujMRuRZo%2BlNf0Hqzm0dWz1j41zmptxhYc%2F%2F%2F%2FvKEUXgAAAA90Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8A1NyYoQAAAMFJREFUeNqUklEOxCAIRNGqu1rl%2FsftCOLSbH86JpUan0wA4vfKX9lIvinZ8UdkfzFadIoWqqygLaX2hJ4xrtscRAutwpLkLMXyehTkZjeaoVpzFrSBBIvjcmwV5h5FXd2GEcbcieoU8hJyHkDKMfMmIxH3EXWBHVusZCXodh3P4BF9xl2HgRV2pp%2FuJpf5pibhcZoM3rxxVcrkS%2BNLNlxVd8k2%2BYf6RvmG%2BEaBzPyAuvHwY%2BDHQ8k1Te9EOoiXAAMATOcaui1BekUAAAAASUVORK5CYII%3D';
		strImages['arrowredup'] = 'data:image/gif;base64,R0lGODlhDAAMAKIFAM5qbdwbIdY%2BNakQFcYWHP%2F%2F%2FwAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMqWLrcOsMtAYWkcFgGcgYLQAxjOYAFoa5sIbwCEahwsMhBbje67sAwiTABADs%3D';
		strImages['arrowreddown'] = 'data:image/gif;base64,R0lGODlhDAAMAKIFAM5qbdwbIakQFdY%2BNcYWHP%2F%2F%2FwAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMmWLrc87CVQKusVsERSN8FIY6kAgjkCCyn4LorM7zCIBVzfSvu7icAOw%3D%3D';
		strImages['arrowgreenup'] = 'data:image/gif;base64,R0lGODlhDAAMAKIFANHVs4zEbq7WjkWaPnC2Vf%2F%2F%2FwAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMmWLrcKsItAIGEIcBGc44LRATESGyFUK5rRLJwsAx07dR2g9NSnwAAOw%3D%3D';
		strImages['arrowgreendown'] = 'data:image/gif;base64,R0lGODlhDAAMAKIFANHVs4zEbq7WjkWaPnC2Vf%2F%2F%2FwAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMmWLrc87AVGB0dK5DNeyhC1wmKEBKaZi6AELyBADTmu0qtLC337icAOw%3D%3D';
		strImages['arrowblue'] = 'data:image/gif;base64,R0lGODlhDAAMAKIEAJTX9FPA7h6s5gOT1%2F%2F%2F%2FwAAAAAAAAAAACH5BAEAAAQALAAAAAAMAAwAAAMmSEoB%2Bys0%2BIKYVdob3hhCGGIEKIbfoKRsurafsMAgVX6djdurAyUAOw%3D%3D';
		strImages['saleslist'] = 'data:image/gif,GIF89a%18%00%13%00%A2%04%00%20%20%20%10%10%10%FF%00%00%00%00%00%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%04%00%2C%00%00%00%00%18%00%13%00%00%03MHJ%D3%FEp%84%B5%9Chw%E4%DDf%C5%A0%16f%9D%12%9D%A8D%ADlk%A6%F0C%08%C0%5C%D3v%8E%EF%B5%EB%FF%C0%20C8l%0D%5EG%07%A3Qd%1D%97I%A6%F2I%01%C4N%1E%0A%15%B8%D5%12%BB%95%AF%0B%3C.%0B%C9M.%25%01%00%3B';
		strImages["prod_cross"] = 'data:image/gif;base64,R0lGODlhKAAoAIABAMInDf%2F%2F%2FyH5BAEAAAEALAAAAAAoACgAAAKfjAOpy%2B17zpt0Shaz3rEZxYViBoLjKXroqqnsi0Bb8tKzSeKjnNsdtgP%2BfB9HyjgE9FxLYZH4ZEad0RtyyktyLLHrMlTxfsFhXct8DgehVu6R3ZZu0XNxXbl2k%2BFJSv5dBrhXxteFl6aip4XopFjVlIWFFukoCUVp12cWaVh4wclpuBIaGlNz2AQDI6cK6NkKiQpbhzUL%2BUmYC6qbG1EAADs%3D';

		GM_addStyle(".arrowGrUp {background:url("+strImages["arrowgreenup"]+") no-repeat scroll -4px bottom transparent;");
		GM_addStyle(".arrowGrDown {background:url("+strImages["arrowgreendown"]+") no-repeat scroll -4px top transparent;");
		GM_addStyle(".arrowRdUp {background:url("+strImages["arrowredup"]+") no-repeat scroll -4px bottom transparent;");
		GM_addStyle(".arrowRdDown {background:url("+strImages["arrowreddown"]+") no-repeat scroll -4px top transparent;");
		GM_addStyle(".arrowBl {background:url("+strImages["arrowblue"]+") no-repeat scroll -2px center transparent;");
		GM_addStyle(".v"+PRODSKIP+" {background:url("+strImages["prod_cross"]+") no-repeat scroll center center transparent;height:30px;width:30px;!IMPORTANT}");

		if(texte["saleslist"]==undefined){ loadLanguage(LNG); }

		if(DEVMODE){ GM_log("loading page:"+PAGE); }
		switch (PAGE){
			case "stadt/marktstand":	do_marktstand();break;
			case "main":	do_main();break;
		}
	}
}

// init script
window.addEventListener("load",function(){
	if(unsafeWindow.GMberaterDone){
		start_script();
	}else{
		document.addEventListener("beraterDone",function(){
			start_script();
			document.removeEventListener("beraterDone",arguments.callee,false);
		},false);
	}
	if(DEVFORUMINDEX){
		//GM_log("saleslist");
		var sites, siteUrl, cells, val;
		var help = GM_listValues();
		for (val in help){
			if(help[val].match(/\w+_\d+_\w+_imports$/gi)){
				//GM_log("test val:"+help[val]);
				sites = explode(GM_getValue(help[val],"{}"));
				for(var i=0;i<sites.length;i++){
					siteUrl=(/(http:\/\/)?(.*)(\/viewtopic.php\?(f=\d+))&(t=\d+)/gi).exec(sites[i]["url"]); //[1]=="http://",[2]==url,[3]==page,[4]==f=xxx,[5]==p=xxxxx
					//GM_log("test href impl:"+implode(targt));
					if (location.hostname==siteUrl[2]){
						if(location.search.indexOf(siteUrl[4])>=0&&location.search.indexOf(siteUrl[5])<0){
							cells = document.querySelectorAll("a[class=\"topictitle\"]");
							for(var l=0;l<cells.length;l++){
								//GM_log("test "+cells[l].href);
								if(cells[l].href.indexOf(siteUrl[4])>=0 && cells[l].href.indexOf(siteUrl[5])>=0){
									//GM_log("test load cell["+l+"]");
									insertAfter(createElement("div",{"style":"float:right;display:inline-block;color:red"},null,"SALESLIST IMPORTED<br>item:"+i),cells[l]); //+"<br>last imported:"+getDateStr(item[i]["updateDate"],2)
								}
							}
						}
					}
				}
			}
		}
		sites=null;siteUrl=null;val=null;i=null;cells=null;help=null;
	}
},false);