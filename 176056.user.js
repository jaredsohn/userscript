// ==UserScript==
// @name        SilkMyCurrency
// @namespace   SilkCurrency
// @description Display your home currency next to bitcoin price
// @include     http://silkroadvb5piz3r.onion/*
// @version     1
// @grant 		GM_setValue
// @grant 		GM_getValue
// ==/UserScript==

//If you like this script, you can donate bitcoin to the following address
//1H2om3zdyZWBE28Vc4Fe13kstBr1onfRav

//Update every hour
var DELAY_UPDATE = 1 * 60 * 60 * 1000;
var DEV_SYMBOL_AFT = {"USD":"$","EUR":"€","CHF":"CHF","CNY":"CNY","DKK":"Kr","RUB":"RUB","SEK":"Kr","NOK":"Kr"};
var DEV_SYMBOL_BFR = {"GBP":"£","JPY":"¥","AUD":"AU$","CAD":"CA$","HKD":"HK$","PLN":"zł","SGD":"SG$","THB":"฿"};

var mtGoxApiCurrency ;
var valueCurrency ;
var showCurrency ;
var lastSaved ;


var getCurrencyValue = function(currency){
	var link =  "http://data.mtgox.com/api/2/" + currency +"/money/ticker_fast";
	
	var r = new XMLHttpRequest(); 
	r.open("GET", link, false); 
	r.send(null);

	var objTick = JSON.parse(r.responseText);
	mtGoxApiCurrency = currency;
	valueCurrency = parseFloat(objTick.data.last.value);
	showCurrency = objTick.data.last.currency;
	lastSaved = (new Date()).getTime();
};

var setHomeCurrency = function(valCurrency){
	document.body.innerHTML = document.body.innerHTML.replace(
	 /\฿\d+(.\d+)?/g,
	 function(match, p1){
	    var converted = parseFloat(match.replace(/฿/,'')) *  valCurrency ;
	    return match 
	    		+ '&nbsp;(' 
	    		+ (DEV_SYMBOL_BFR[showCurrency] || '')
	    		+ converted.toFixed(2)  
	    		+ (DEV_SYMBOL_AFT[showCurrency] || '')
	    		+ ')'
	    		;
	 }
	);
};

var currencyChange = function(evt){
	var cur = evt.target.value;
	if(cur){
		getCurrencyValue(cur);
		saveVar();
	}else GM_setValue("cur", false);
	location.reload();

};

var appendSelectCurrency = function(){
	var sc = document.createElement("select");
	sc.setAttribute("id", "selectCurrency");
	sc.style.cssText="float:left;";
	sc.addEventListener('change', currencyChange);
	sc.innerHTML = 
		  '<option value="">Not Set</option>\
		   <option value="BTCUSD">Dollar</option>\
		   <option value="BTCGBP">Great British Pound</option>\
		   <option value="BTCEUR">Euro</option>\
		   <option value="BTCJPY">Japanese Yen</option>\
		   <option value="BTCAUD">Australian Dollar</option>\
		   <option value="BTCCAD">Canadian Dollar</option>\
		   <option value="BTCCHF">Swiss Franc</option>\
		   <option value="BTCCNY">Chinese Yuan</option>\
		   <option value="BTCDKK">Danish Krone</option>\
		   <option value="BTCHKD">Hong Kong Dollar</option>\
		   <option value="BTCPLN">Polish Złoty</option>\
		   <option value="BTCRUB">Russian Rouble</option>\
		   <option value="BTCSEK">Swedish Krona</option>\
		   <option value="BTCSGD">Singapore Dollar</option>\
		   <option value="BTCTHB">Thai Baht</option>\
		   <option value="BTCNOK">Norwegian Krone</option>'
	;
	
	sc.value = mtGoxApiCurrency ;
	

	//label 
	var lc = document.createElement("label");
	lc.setAttribute("for","selectCurrency");
	lc.style.cssText="float:left;";
	lc.innerHTML = "&nbsp;&nbsp;My currency :&nbsp;&nbsp;";
	var footer = document.getElementById("footer");
	footer.appendChild(lc)
	footer.appendChild(sc);
};

var saveVar = function(){
	GM_setValue("cur" , mtGoxApiCurrency);
	GM_setValue("val" , valueCurrency.toString());
	GM_setValue("sym" , showCurrency);
	GM_setValue("sav" , lastSaved.toString());
};

var restoreVar = function(){
	mtGoxApiCurrency = GM_getValue("cur");
	valueCurrency = parseFloat(GM_getValue("val"));
	showCurrency = GM_getValue("sym");
	lastSaved = parseInt(GM_getValue("sav" ,0));
};


window.onload = function ()
{	
	//SetTimeout fix a WTF bug with grease monkey
	//http://wiki.greasespot.net/0.7.20080121.0_compatibility
	setTimeout(function() {
		appendSelectCurrency();
	},0);

	restoreVar();
	if(!mtGoxApiCurrency) return;

	//Determining if the last saved value is to old.
	var nowTick = (new Date()).getTime();
	var valIsToOld = (nowTick - lastSaved) > DELAY_UPDATE ;


    if(!valueCurrency || valIsToOld)
		getCurrencyValue(mtGoxApiCurrency);

	setHomeCurrency(valueCurrency);
}




