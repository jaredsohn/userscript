// Mafia Wars Spend my Money
// version 1.21
// 2010-12-07
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           mw spend my money fb
// @namespace      mwSpendMyMoneyfb@micron
// @description    Automatically spend your money in the best way to buy properties in New York
// @include				 http://apps.facebook.com/inthemafia/*
// @include 			 http://facebook.mafiawars.com/mwfb/remote/*
// ==/UserScript==

var mwSpendMyMoney = new Object();
mwSpendMyMoney.debug = false;
mwSpendMyMoney.uri = null;
mwSpendMyMoney.money = null;
mwSpendMyMoney.properties = {
	"Flophouse" : {
			"income" : 300
	},
	"Pawnshop" : {
			"income" : 700
	},
	"Tenement" : {
			"income" : 5000
	},
	"Warehouse" : {
			"income" : 10000
	},
	"Dockyard" : {
			"income" : 50000
	},
	"Office Park" : {
			"income" : 150000
	},
	"Uptown Hotel" : {
			"income" : 200000
	},
	"Mega Casino" : {
			"income" : 300000
	}
};

mwSpendMyMoney.start = function(){
	this.debugMsg("start");
	this.getMoney();
	this.getProperties();
	this.run();
};

mwSpendMyMoney.run = function(){
	var script = document.getElementById("mwSpendMyMoney");
	
	if(script !== null){
		script.parentNode.removeChild(script);
	}
	
	this.debugMsg("run");
	this.getMoney();
	this.getProperties();
	
	var bestBuy = this.getBestBuy();
	
	if(this.money - bestBuy.cost >= 0){
		this.debugMsg("upgrade");
		
		var script = document.createElement("script");
		script.setAttribute("id", "mwSpendMyMoney");
		script.innerHTML = bestBuy.upgrade;
		
		document.getElementsByTagName("body")[0].appendChild(script);
		
		window.setTimeout(function(){mwSpendMyMoney.run();}, 2000);
	}
};
	
mwSpendMyMoney.unframe = function(){
	this.debugMsg("unframe");
	if(window.location.href.search("http://apps.facebook.com/inthemafia/") !== -1){
		window.location = document.getElementsByClassName('canvas_iframe_util')[0].src;
	}
};
	
mwSpendMyMoney.getProperties = function (){
	this.debugMsg("getProperties");
	var trs = document.getElementById("flash_content_propertiesV2").getElementsByTagName("table")[0].getElementsByTagName("tr");
	for(var i = 2; i < trs.length; i++){
		var tds = trs[i].getElementsByTagName("td");
		var name = tds[0].textContent; 
		
		if(name === "Restaurant" || name === "Chop Shop" || name === "Weapons Depot" || name === "Armory"){
			continue;
		}
		
		var upgrade = tds[2].firstChild;
		
		this.properties[name].upgrade = upgrade.getAttributeNode('onClick').value.replace(/(return|false)/g, '');
		this.properties[name].cost = upgrade.textContent.replace(/(Upgrade|for|[$, ])/g, "");
		
		this.properties[name].roi = this.properties[name].income / this.properties[name].cost;
		
		//unsafeWindow.console.log(name, this.properties[name].roi);
	}
};

mwSpendMyMoney.getMoney = function(){
	this.debugMsg("getMoney");
	this.money = document.getElementById("user_cash_nyc").textContent.replace(/[,.$]/g, "");
	//unsafeWindow.console.log(this.money);
};

mwSpendMyMoney.getBestBuy = function(){
	this.debugMsg("getBestBuy");
	var obj = null;
	
	for(var i in this.properties){
		if(obj === null || obj.roi < this.properties[i].roi){
			obj = this.properties[i];
		}
	}
	
	return obj;
};

mwSpendMyMoney.debugMsg = function(message){
	if(this.debug === true){
		unsafeWindow.console.log("MW Spend my Money - "+message);
	}
}

GM_registerMenuCommand('MW Spend my Money - debug', function(){mwSpendMyMoney.debug = true; mwSpendMyMoney.debugMsg("Debuging on");});
if(window.location.href.search("http://apps.facebook.com/inthemafia/") !== -1){
	GM_registerMenuCommand('MW Spend my Money - unframe', function(){mwSpendMyMoney.unframe();});
}else{
	GM_registerMenuCommand('MW Spend my Money - start', function(){mwSpendMyMoney.start();});
}