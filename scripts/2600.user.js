// Currency Convertion
// v0.5
// 2006-04-03
// Copyright (c) 2006-2008, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Currency Convertion
// @namespace	http://6v8.gamboni.org/Greasemonkey-Yahoo-Finance.html
// @description	Convert currencies on the page with yahoo finance
// @source         http://6v8.gamboni.org/Greasemonkey-Yahoo-Finance.html
// @identifier     http://6v8.gamboni.org/IMG/js/CurrencyConverter.user.js
// @version        0.5
// @date           2008-04-03
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include	*
// ==/UserScript==

(function () {

	var SCRIPT = {
		name: "Currency Convertion",
		namespace: "http://6v8.gamboni.org/Greasemonkey-Yahoo-Finance.html",
		description: "Convert currencies on the page with yahoo finance",
		source: "http://6v8.gamboni.org/Greasemonkey-Yahoo-Finance.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/CurrencyConverter.user.js",
		version: "0.5",								// version
		date: (new Date(2008, 4, 3))		// update date
		.valueOf()
	};

	var numberRegexp = '\\d[\\d.,\']*[kK]?\\s*';
	var currencies = ['USD','CAD','EUR','AFA','ALL','DZD','ARS','AWG','AUD','BSD','BHD','BDT','BBD','BYR','BZD','BMD','BTN','BOB','BWP','BRL','GBP','BND','BGN','BIF','KHR','CVE','KYD','XOF','XAF','CLP','CNY','COP','KMF','CRC','HRK','CUP','CYP','CZK','DKK','DJF','DOP','XCD','ECS','EGP','SVC','ERN','EEK','ETB','FKP','FJD','GMD','GHC','GIP','XAU','GTQ','GNF','GYD','HTG','HNL','HKD','HUF','ISK','INR','IDR','IRR','IQD','ILS','JMD','JPY','JOD','KZT','KES','KRW','KWD','LAK','LVL','LBP','LSL','LRD','LYD','LTL','MOP','MKD','MGF','MWK','MYR','MVR','MTL','MRO','MUR','MXN','MDL','MNT','MAD','MZM','MMK','NAD','NPR','ANG','NZD','NIO','NGN','KPW','NOK','OMR','XPF','PKR','XPD','PAB','PGK','PYG','PEN','PHP','XPT','PLN','QAR','ROL','RUB','RWF','WST','STD','SAR','SCR','SLL','XAG','SGD','SKK','SIT','SBD','SOS','ZAR','LKR','SHP','SDD','SRG','SZL','SEK','CHF','SYP','TWD','TZS','THB','TOP','TTD','TND','TRL','AED','UGX','UAH','UYU','VUV','VEB','VND','YER','YUM','ZMK','ZWD'];
	var symbols = {
		"\u0024":"USD", //us dollar
		"\uFF04":"USD", //us dollar
		//"\u0024":"RUB",
		//"\u0024":"AUD",
		//"\u0024":"CAD",
		//"\u0024":"HKD",
		//"\u0024":"SGD",
		//"\u0024":"NZD",

		"\u00A3":"GBP", //British pound
		"\uFFE1":"GBP",
		//	"\u00A3":"CYP",
		
		"\u20AC":"EUR", //EURO
		"\u20A0":"EUR", //EURO
		
		'.-':'CHF', //Swiss franc
		
		"\u00A5":"JPY", //Japan yen
		"\uFFE5":"JPY", //Japan yen
		"\u5186":"JPY",
		"\u5706":"JPY",
		"\u570E":"JPY",
		"\u571C":"JPY",
		
		"\u006b\u0072":"DKK",
		//"\u006b\u0072":"SEK",
		
		"\u20A4":"MTL",
		"\u5143":"CNY",
		"\u20A9":"KRW",
		"\u20B1":"PHP",
		"\u0E3F":"THB",
		
		"\u20A1":"CRC", //Costa Rica Colon
		//		"\u20A1":"SVC", //El Savador Colon
		
		"\u20A4":"TRL", //Turkish lira
		//		"\u20A4":"MTL", // Maltese Lira
		
		"\u20A6":"NGN",	//Nigerian Naira
		
		"\u20A8":"INR",	//Indian Rupee
		"\u09F2":"INR",
		"\u09F3":"INR",
		"\u0AF1":"INR",
		"\u0BF9":"INR",
		//"\u20A8":"MUR",	//Mauritius Rupee
		//"\u20A8":"NPR",	//Nepalese Rupee
		//"\u20A8":"PKR",	//Pakistani Rupee
		//"\u20A8":"SCR",	//Seychelles Rupee
		//"\u20A8":"LKR",	//Sri Lanka Rupee
		
		"\u20A9":"KPW",	//North Korean Won
		"\uFFE6":"KPW",

		//"\u20AB":"VND",	//Vietnam Dong
		//"\u20AE":"MNT",	//Mongolian Tugrik
		
		//"\u20B1":"CLP",	//Chilean Peso
		//"\u20B1":"COP",	//Colombian Peso
		//"\u20B1":"CUP",	//Cuban Peso
		//"\u20B1":"DOP",	//Dominican Peso
		//"\u20B1":"MXN",	//Mexican Peso
		//"\u20B1":"PHP",	//Philippine Peso
		//"\u20B1":"UYU",	//Uruguayan New Peso
		"\u20B1":"ARS",	//Argentine Peso

		"\u0E3F":"THB",	//Thai Baht
		"\u17DB":"KHR",	//Cambodia Riel

		"\u3350":"CNY",	//Chinese Yuan
		"\u5143":"CNY",	//Chinese Yuan
		"\u5713":"CNY",

		"\uFDFC":"IRR",	//Iran Rial
		//"\uFDFC":"OMR",	//Omani Rial
		//"\uFDFC":"QAR",	//Qatar Rial
	} //utf codes from http://www.alanwood.net/unicode/currency_symbols.html

	var win = (unsafeWindow || window.wrappedJSObject || window);
	
	win.CurrencyConverter = function() {;}

	win.CurrencyConverter.prototype = {
		init: function(toCurrency) {
			if(GM_xmlhttpRequest) {
				this.initCurrency(toCurrency);
				this.waitForAjax(toCurrency,numberRegexp,symbols,0);
			}
		},
		
		waitForAjax: function(toCurrency,numberRegexp,symbols,tries) {
			var self = this;
			if(this.exRateCnt > 0 && tries < 15) {
				setTimeout(function() {self.waitForAjax(toCurrency,numberRegexp,symbols,tries+1)},1000);
			} else {
				this.findAndReplace(toCurrency,numberRegexp,symbols);
			}
		},
	

		regexString: null,
		exRate: new Array(),
		exRateCnt: 0,

		quotemeta: function(toquote) {
			unsafe=/(\\|\.|\+|\*|\?|\[|\^|\]|\$|\(|\)|\{|\}|\=|\!|\<|\>|\ý|\||\:)/g;  
			var quoted=toquote.replace(unsafe,"\\$1"); 
			return quoted;
		},

		initCurrency: function(toCurrency) {
			var bodyHTML = document.body.textContent;
			if (bodyHTML) {
				this.regexString = '';
				for (var i = 0; currencies[i]; i++) {
					var re = new RegExp(this.quotemeta(currencies[i]),'i');
					if ((currencies[i] != toCurrency) && re.test(bodyHTML)) {
						this.regexString += "|(?:" + this.quotemeta(currencies[i]) + ")";
						this.exRateCnt++;
						this.getExRate(currencies[i],toCurrency);
					}
				}
				for (var symbol in symbols) {		
					var re = new RegExp(this.quotemeta(symbol),'i');
					if (symbols[symbol] != toCurrency && re.test(bodyHTML)) {
						this.regexString += "|(?:" + this.quotemeta(symbol) + ")";
						this.exRateCnt++;
						this.getExRate(symbols[symbol],toCurrency);
					}
				}
				this.regexString = this.regexString.substring(1);
			}
		},

		findAndReplace: function(toCurrency,numberRegexp,symbols) {						
			var bodyHTML = document.body.textContent;
			if (bodyHTML && this.regexString != null) {
				var fullregexp = new RegExp("(?:\\s*|[\\.;,?!])(?:(" + this.regexString + ")\\s*("+numberRegexp+")|("+numberRegexp+")\\s*(" + this.regexString + "))(?:\\s*|[\\.;,?!])");
				var allTextNodes = document.evaluate("//text()[not(ancestor::script) and not(parent::button) and not(parent::textarea) and not(parent::style) and not(ancestor::a[@href])]",
													 document.body,
													 null,
													 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
													 null);
				for (var i = 0; i < allTextNodes.snapshotLength; i++) {
					var thisTextNode = allTextNodes.snapshotItem(i);
					var nodeText = thisTextNode.nodeValue;
					var matches = fullregexp.exec(nodeText);
					while (matches) {
						var searchIndex = matches.index;
						thisTextNode.splitText(searchIndex + matches[0].length);
						thisTextNode = thisTextNode.nextSibling;

						var from = matches[4];
						var amt = matches[3]; 
						if(!from || !amt) {
							from = matches[1];
							amt = matches[2]; 
						}
						var rate = this.exRate[from];
						if(!rate) {
							from = symbols[from];
							rate = this.exRate[from];
						}

						var lastComa=amt.lastIndexOf(','); 
						if(lastComa != -1 && amt.indexOf(',') == lastComa && amt.substring(lastComa+1).length <= 2) {
							amt=amt.replace(/\./g,'',amt) ;
							amt=amt.replace(/,/g,'.',amt) ;
						}

						amt = amt.replace(/[,']/,'',amt);
						amt = amt.replace(/k/i,'000',amt);
						
						if(rate && (parseFloat(amt) > 0)) {
							converted = parseInt(rate*parseFloat(amt)*100)/100; //approximation to have 2 digits after the .
							var insert = document.createElement('a');
							insert.href = 'http://finance.yahoo.com/currency/convert?amt='+amt+
								'&from='+from+
								'&to='+toCurrency+
								'&submit=Convert';
							insert.className="GM_CurrencyConvertion";
							insert.appendChild(document.createTextNode('('+converted + " " +toCurrency+') '));
							thisTextNode.parentNode.insertBefore(insert, thisTextNode);
						}
						nodeText = thisTextNode.nodeValue; 
						matches = fullregexp.exec(nodeText);
				} 
				}
			} 
		},

		getExRate: function(from,to) {
			var convertionURL = "http://finance.yahoo.com/d/quotes.csv?s="+encodeURIComponent(from+to+"=X")+"&f=l1";
			var self = this;
			GM_xmlhttpRequest({
		method: 'GET',
					url: convertionURL,
					onload: function(responseDetails) {
			if(responseDetails) self.storeResponse(responseDetails.responseText,from);
		} 
			});
		},
	
		storeResponse: function(response,from) {
			if(response.length > 0) {
				var rate = parseFloat(response);
				if(rate > 0) {
					this.exRate[from] = rate;
				}
				this.exRateCnt--;
			}
		},


		getConversionTo: function() {
			//configuration from: http://dunck.us/code/greasemonkey/mypipstag.user.js
			var conversionTo;
			
			if (!(conversionTo = GM_getValue('conversionTo'))) {
				conversionTo = prompt("What currency do you want to convert to?");
				GM_setValue('conversionTo', conversionTo);
			}
			
			return conversionTo;
		},
		
		setConversionTo: function() {
			conversionTo = prompt("What currency do you want to convert to?");
			GM_setValue('conversionTo', conversionTo);
		},

	}
	
	
	// update automatically (http://userscripts.org/scripts/show/2296)
	try {
		window.addEventListener("load", function () {
			try {
				win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
			} catch (ex) {} 
			

			var converter = new win.CurrencyConverter();
			if(GM_registerMenuCommand && GM_getValue && GM_setValue) {
				GM_registerMenuCommand("Change currency conversion", converter.setConversionTo);
				converter.init(converter.getConversionTo());
			} else {
				//if you have an old version of greasemonkey, you will have to set the preference here:
				converter.init('EUR');	
			}
		}, false);
	} catch (ex) {}



})();
