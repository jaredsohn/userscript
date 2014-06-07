// ==UserScript==
// @name           Calculates investments + auto missions
// @namespace      HighlightInvestments
// @description    Highlight the best investments for those mass manufactured games: ganster battle, sex games, knighted, etc.
// @include        http://apps*.facebook.com/*/investments.php*
// @include        http://apps*.facebook.com/*/missions.php*
// ==/UserScript==

Number.prototype.formatMoney = function(){
	var c=0;
	var d=".";
	var t=",";
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

nHtml={
gameNameRe:new RegExp("^/([^/]+)/"),

FindByAttr:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},

GameName:function() {
	var m=this.gameNameRe.exec(window.location.pathname);
	if(m) { return m[1]; }
	GM_log('Error unknown game:'+window.location.pathname);
	return null;
},
GMSetValue:function(n,v) {
	return GM_setValue(this.GameName()+"__"+n,v);
},
GMGetValue:function(n,v) {
	return GM_getValue(this.GameName()+"__"+n,v);
},

Click:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},

spaceTags:{
	'td':1,
	'br':1,
	'hr':1,
	'span':1,
	'table':1
},
GetText:function(obj) {
	var txt='';
	if(obj.textContent!=undefined) { return obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child);
	}
	return txt;
}

};

HighlightInvestments={
costs:[],
costsByName:{},
bestReturn:null,
hasConstructedOver:0,
cashNeeded10:0,
daysTillBuy:0,
daysTillBuy10:0,

FindByClassName:function(obj,tag,className) {
	var divs=obj.getElementsByTagName(tag);
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(div.className==className) {
			return div;
		}
	}
	return null;
},
billionRe:new RegExp('billion','i'),
millionRe:new RegExp('million','i'),
trillionRe:new RegExp('trillion','i'),
NumberOnly:function(num) {
	var numOnly=parseFloat(num.replace(/[^0-9\.]/g,""));
	if(this.millionRe.exec(num)) {
		numOnly*=1000000;
	}
	else if(this.billionRe.exec(num)) {
		numOnly*=1000000000;
	}
	else if(this.trillionRe.exec(num)) {
		numOnly*=1000000000000;
	}
	return numOnly;
},
contructedOverRe:new RegExp('<b>([^<]*)</b>','i'),
FindCosts:function() {
	var tds=document.getElementsByTagName('td');
	for(var t=0; t<tds.length; t++) {
		var td=tds[t];
		if(td.className!="investmentsBox") { continue; }
		var nameObj=this.FindByClassName(td,"div","property_name");
		if(nameObj==null) { continue; }
		
		var a=document.createElement('a');
		a.name=nameObj.innerHTML;
		td.insertBefore(a,td.childNodes[0]);
		var constructedObj=this.FindByClassName(td,"div","property_constructed_over");
		var constructedOver=null;
		if(constructedObj!=null) {
			var coMatch=this.contructedOverRe.exec(constructedObj.innerHTML);
			constructedOver=coMatch[1];
		}
		var revObj=this.FindByClassName(td,"span","property_revenue");
		var costObj=this.FindByClassName(td,"span","itemCost");
		var buyObj=this.FindByClassName(td,"form","buyForm");
		var ownedObj=this.FindByClassName(td,"span","itemDetails");
		var owned=this.NumberOnly(ownedObj.innerHTML);

		var inps=buyObj.getElementsByTagName('input');
		var buyButton=null;
		for(var i=0; i<inps.length; i++) {
			var inp=inps[i];
			if(inp.type=="submit") {
				buyButton=inp;
				break;
			}
		}
		var name=nameObj.innerHTML;
		var rev=this.NumberOnly(revObj.innerHTML);
		var cost=this.NumberOnly(costObj.innerHTML);
		var origCost=cost/((owned/10)+1);
		var costObj={
			'rev':rev,'cost':cost,'buyButton':buyButton,
			'name':name,
			'nameObj':nameObj,'buyForm':buyObj,
			'owned':owned,
			'origCost':origCost,
			'costTotal':cost,
			'constructedOver':constructedOver
		};
		this.costs.push(costObj);
		this.costsByName[name]=costObj;
	}

	for(var c=0; c<this.costs.length; c++) {
		var cost=this.costs[c];
		if(cost.constructedOver==null) { continue; }
		var over=this.costsByName[cost.constructedOver];
		if(!over) {
			GM_log('Could not find:'+cost.constructedOver);
			continue;
		}
		var owned=over.owned-10;
		if(owned<10) {
			owned=0;
		}
		var last10OverCost=over.origCost+(owned*over.origCost/10);

		cost.costTotal=last10OverCost+cost.cost;
		cost.last10OverCost=last10OverCost;
		this.hasConstructedOver++;
	}
},
FormatPercent:function(num) {
	return (Math.floor(num*100000)/1000)+"%";
},
ClickBuy:function(items) {
	var propToClick=this.bestReturn;
	if(propToClick.constructedOver!=null) {
		// check if we can buy this, if not let's but the property that we need.
		var over=this.costsByName[propToClick.constructedOver];
		if(over.owned==0) {
			propToClick=over;
		}
	}
	var buySel=propToClick.buyForm.getElementsByTagName('select')[0];
	for(var b=0; b<buySel.options.length; b++) {
		if(buySel.options[b].value==items) {
			buySel.selectedIndex=b;
		}
	}
	propToClick.buyButton.click();
},
AddListener:function(objId,type,func) {
	document.getElementById(objId).addEventListener(type,func,false);
},
moneyRe:new RegExp('([0-9,\\.]+)','im'),
moneySuffixRe:new RegExp('([0-9,\\.]+)\\s*GC','im'),
moneyPrefixRe:new RegExp('Cigs:\\s*([0-9,\\.]+)','im'),
ShowCosts:function() {
	this.FindCosts();
	var bestReturnPerDay=-1;
	var bestReturn=null;
	var headerObj=this.FindByClassName(document.body,"div","headerDivStyle1");
	if(!headerObj) {
		headerObj=nHtml.FindByXPath(document.body,"//div[contains(@id,'status_box')]");
	}
	if(!headerObj) {
		GM_log("Could not find header");
		return;
	}

	var earnPerHour=undefined;
	var statusM=this.moneyRe.exec(nHtml.GetText(headerObj));
	if(statusM) {
		earnPerHour=this.NumberOnly(statusM[1]);
	}

	var cashObj=this.FindByClassName(document.body,"div","cash");
	var moneyM=null;
	if(!cashObj) {
		cashObj=nHtml.FindByXPath(document.body,"//div[contains(@id,'header_stats')]");
		var txt=nHtml.GetText(cashObj);
		moneyM=this.moneyPrefixRe.exec(txt);
		if(!moneyM) {
			moneyM=this.moneySuffixRe.exec(txt);
		}
	} else {
		moneyM=this.moneyRe.exec(cashObj.innerHTML);
	}
	var cash=undefined;
	if(moneyM) {
		cash=this.NumberOnly(moneyM[1]);
	}


	for(var c=0; c<this.costs.length; c++) {
		var cost=this.costs[c];
		var returnPerDay=(cost.rev*24)/cost.costTotal;
//GM_log(cost.name+",rev:"+cost.rev+",cost:"+cost.costTotal);
		var info=document.createElement('span');
		var infoMess=this.FormatPercent(returnPerDay) + " return per day";
		if(cost.last10OverCost) {
			var constructedOverObj=this.costsByName[cost.constructedOver];
			infoMess+=" @ $"+cost.last10OverCost+" per "+constructedOverObj.name;
		}
		info.innerHTML=infoMess;
		cost.nameObj.parentNode.insertBefore(info,cost.nameObj.nextSibling);
		if(this.hasConstructedOver>0 && cost.constructedOver==null) {
			// on gangster battle, knighed, etc.
			// we ignore the primary properties cause
			// they're needed to purchase later ones.
			continue; 
		}
		if(bestReturnPerDay<returnPerDay) {
			bestReturnPerDay=returnPerDay;
			bestReturn=cost;
		}
	}
	var bestLink=document.createElement('span');
	var overMess='';
	var bestToBuy=bestReturn;
	if(bestReturn.constructedOver!=null) {
		var bestOverObj=this.costsByName[bestReturn.constructedOver];
		if(bestOverObj.owned==0) {
			overMess+="(buy "+bestOverObj.name+
			" @ $"+bestOverObj.cost.formatMoney()+")";
			bestToBuy=bestOverObj;
		}
	}
	var cashNeeded=bestToBuy.cost-cash;
	var cashNeeded10=(bestToBuy.cost*10)-cash;
	var earnPerDay=earnPerHour*24;
	var cashNeededMess='';
	if(cashNeeded>0) {
		cashNeededMess=" Need $"+
			cashNeeded.formatMoney()+
			" more, wait "+
			(Math.floor((cashNeeded/earnPerDay)*100)/100)+" days";
	} else if(cashNeeded10>0) {
		cashNeededMess=" Need $"+
			cashNeeded10.formatMoney()+
			" more for 10, wait "+
			(Math.floor((cashNeeded10/earnPerDay)*100)/100)+" days";
	}
	this.cashNeeded10=cashNeeded10;
	this.daysTillBuy=cashNeeded/earnPerDay;
	this.daysTillBuy10=cashNeeded10/earnPerDay;

	var autoBuy10=nHtml.GMGetValue('AutoBuy10');
	bestLink.innerHTML="<br />Best: <a href='#"+bestReturn.name+
		"'>"+bestReturn.name+
		"</a> "+this.FormatPercent(bestReturnPerDay)+
		" return per day @ $"+
		bestReturn.cost.formatMoney()+" each"+
		"<br />Buy: <a id='hi_buy1' href='javascript:;'>1</a>, "+
		"<a id='hi_buy5' href='javascript:;'>5</a>, "+
		"<a id='hi_buy10' href='javascript:;'>10</a>, "+
		"<a id='hi_buy_auto10' href='javascript:;'>"+
		(autoBuy10?"Disable ":"")+
		"Auto buy 10</a> "+
		overMess+cashNeededMess+
		"<br />"
		;

	var overheadObj=this.FindByClassName(document.body,'span','revenue');
	overheadObj.parentNode.insertBefore(bestLink,overheadObj);
	this.bestReturn=bestReturn;
	this.AddListener('hi_buy1','click',function() { HighlightInvestments.ClickBuy(1); } );
	this.AddListener('hi_buy5','click',function() { HighlightInvestments.ClickBuy(5); } );
	this.AddListener('hi_buy10','click',function() { HighlightInvestments.ClickBuy(10); } );
	this.AddListener('hi_buy_auto10','click',function() { nHtml.GMSetValue('AutoBuy10',nHtml.GMGetValue('AutoBuy10')?0:1); HighlightInvestments.AutoBuy(); } );
},

AutoBuy:function() {
	var buyWait=500;
	var noAutoBuy=false;
	if(nHtml.GMGetValue('AutoBuy10')) {
		if(this.cashNeeded10>0) {
			GM_log("Waiting for "+this.daysTillBuy10+" days till we can afford it");
			buyWait=Math.floor(this.daysTillBuy10*1000*(60*60*24))+(60*60*24);
		}
	} else { 
		noAutoBuy=true; 
	}
	var waitUntil=new Date().getTime()+buyWait;
//~~~
	if(buyWait>500 || noAutoBuy) {
		// nothing to auto buy, let's go back to missions page if we have an auto mission setup.
		Missions.GoToAutoMissionPage();
		return;
	}
	window.setTimeout(function() {
		HighlightInvestments.ClickBuy(10);
	},buyWait);
}

};

Missions={



GetMissions:function() {
	var missions={};
	var divs=document.body.getElementsByTagName('div');
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(div.className!="missionsBox") { continue; }
		var click=nHtml.FindByAttr(div,'input','type','submit');
		if(!click) { 
			GM_log('could not find submit button');
			continue; 
		}
		var spans=div.getElementsByTagName('span');
		var name;
		if(spans.length>0) { name=spans[0].innerHTML; }
		else {
			GM_log('no name for mission');
			continue; 
		}
		missions[name]={'click':click};
	}
	return missions;
},

AddAutoMissionButton:function() {
	var missions=this.GetMissions();
	for(var missionName in missions) {
		var mission=missions[missionName];
		var a=document.createElement('a');
		a.innerHTML='Auto run';
		var span=document.createElement('span');
		span.innerHTML=missionName;
		span.style.display='none';
		a.appendChild(span);
		a.addEventListener('click',function(e) {
			Missions.SetAutoMission(e.target.getElementsByTagName('span')[0].innerHTML.toString());
			Missions.AutoMission();
		},false);
		mission.click.parentNode.insertBefore(a,mission.click);
	}
},
SetAutoMission:function(mission) {
	nHtml.GMSetValue("AutoMission",mission);
},
enduranceRe:new RegExp("([0-9]+)\\s*/\\s*([0-9]+)"),
endurancePrefixRe:new RegExp('(Endurance|Boldness):\\s*([0-9,\\.]+)\\s*/\\s*([0-9,\\.]+)','im'),
GetEndurance:function() {
	var endObj=nHtml.FindByAttr(document.body,'div','className','endurance');

	var endM=null;
	var txt='';
	if(!endObj) {
		endObj=nHtml.FindByXPath(document.body,"//div[contains(@id,'header_stats')]");
		if(endObj) {
			txt=nHtml.GetText(endObj);
			var m=this.endurancePrefixRe.exec(txt);
			if(m) { endM=[m[0],m[2],m[3]]; }
		}
	}
	

	if(!endObj) {
		GM_log('cannot find endurance');
		return null;
	}

	if(!endM) {
		txt=nHtml.GetText(endObj);
		endM=this.enduranceRe.exec(txt);
	}
	if(endM.length>2) {
		return {
			'num':HighlightInvestments.NumberOnly(endM[1]),
			'max':HighlightInvestments.NumberOnly(endM[2])
		};
	} else {
		GM_log('cannot find endurance:'+txt);
	}
	return null;
},
GetAutoMission:function() {
	return nHtml.GMGetValue("AutoMission",'');
},
// go to mission page if auto mission is running.
GoToAutoMissionPage:function() {
	var missionName=this.GetAutoMission();
	if(!missionName || missionName.length<=0) { return false; }
	window.location.href='missions.php?skip_invites=1';
	return true;w
},
AutoMission:function() {
	var missionName=this.GetAutoMission();
	if(!missionName || missionName.length<=0) { return; }
	var missions=this.GetMissions();
	var gameName=nHtml.GameName();
	var tired=false;
	var t=nHtml.FindByXPath(document.body,"//table[contains(@id,'missionsTable')]");
	var endurance=this.GetEndurance();
	if(endurance==null) { 
		return; 
	}
	if(endurance.num>=(endurance.max-1)) {
		var mission=missions[missionName];
		if(mission) {
			window.setTimeout(function() {
				nHtml.Click(mission.click);
			},5000);
		} else {
			GM_log('Could not find mission');
		}
	}
	if(t) {
		var a=document.createElement('a');
		a.addEventListener('click',function() {
			Missions.SetAutoMission('');
		},false);
		a.innerHTML='Stop auto run:'+missionName;
		t.parentNode.insertBefore(a,t);
	} else {
		GM_log('Could not find missions table');
	}
	var waitSecs=5000;
	var enduranceToWait=endurance.max-endurance.num-1;
	waitSecs=320*1000*enduranceToWait;
	if(waitSecs<5000) { waitSecs=5000; }
	var mess=document.createElement('div');
	mess.innerHTML='Wait for '+Math.floor(waitSecs/1000/60)+" mins for "+enduranceToWait+" endurance";
	t.parentNode.insertBefore(mess,t);

	window.setTimeout(function() { window.history.go(0); },waitSecs);
}

};

window.addEventListener("load", function(e) {
	var href=window.location.href;
	if(href.indexOf('/investments.php')>=0) {
		HighlightInvestments.ShowCosts();
		HighlightInvestments.AutoBuy();
	} else if(href.indexOf('/missions.php')>=0) {
		Missions.AddAutoMissionButton();
		Missions.AutoMission();
	}
},false);

