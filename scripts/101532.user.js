// ==UserScript==
// @name			Org Searcher For Laws
// @namespace		eLaw V2
// @version        	1.2
// @author			santirub (http://www.erepublik.com/en/citizen/profile/1208160)
// @description 	Org Searcher For Laws
// @include			http://www.erepublik.com/*/*/law/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==


var currencyCountry = {"ARS":"Argentina","AUD":"Australia","ATS":"Austria","BYR":"Belarus","BEF":"Belgium","BOB":"Bolivia","BAM":"Bosnia-Herzegovina","BRL":"Brazil","BGN":"Bulgaria","CAD":"Canada","CLP":"Chile","CNY":"China","COP":"Colombia","HRK":"Croatia","CYP":"Cyprus","CZK":"Czech-Republic","DKK":"Denmark","EGP":"Egypt","EEK":"Estonia","FIM":"Finland","FRF":"France","DEM":"Germany","GOLD":"GOLD","GRD":"Greece","HUF":"Hungary","INR":"India","IDR":"Indonesia","IRR":"Iran","IEP":"Ireland","NIS":"Israel","ITL":"Italy","JPY":"Japan","LVL":"Latvia","LTL":"Lithuania","MYR":"Malaysia","MXN":"Mexico","MEP":"Montenegro","NLG":"Netherlands","NZD":"New-Zealand","KPW":"North-Korea","NOK":"Norway","PKR":"Pakistan","PYG":"Paraguay","PEN":"Peru","PHP":"Philippines","PLN":"Poland","PTE":"Portugal","TWD":"Republic-of-China-Taiwan","MKD":"Republic-of-Macedonia-FYROM","MDL":"Republic-of-Moldova","RON":"Romania","RUB":"Russia","SAR":"Saudi-Arabia","RSD":"Serbia","SGD":"Singapore","SKK":"Slovakia","SIT":"Slovenia","ZAR":"South-Africa","KRW":"South-Korea","ESP":"Spain","SEK":"Sweden","CHF":"Switzerland","THB":"Thailand","TRY":"Turkey","UAH":"Ukraine","AED":"United-Arab-Emirates","GBP":"United-Kingdom","UYU":"Uruguay","USD":"USA","VEB":"Venezuela"};


var arrEN = [/(?=Donate)/,/Do you agree to transfer (.*?) (.*?) from the country accounts to (.*?)\?/i,'Do you agree to transfer <b>$1</b> $2 from the country accounts to <a href="http://www.erepublik.com/en/search/?q=','&commit= >$3</a> ?',6,12,'en'];
var arrFR = [/(?=Donation)/,/Acceptez vous le transfert de (.*?) (.*?) du Trésor Public à (.*?)\?/i,'Acceptez vous le transfert de <b>$1</b> $2 du Trésor Public à <a href="http://www.erepublik.com/fr/search/?q=','&commit= >$3</a> ?',6,11,'fr'];
var arrDE = [/(?=Spenden)/,/Bist du mit einer Überweisung von (.*?) (.*?) aus der Staatskasse an (.*?) einverstanden\?/i,'Bist du mit einer Überweisung von <b>$1</b> $2 aus der Staatskasse an <a href="http://www.erepublik.com/de/search/?q=','&commit= >$3</a> einverstanden?',7,12,'de'];
var arrPT = [/(?=Doação)/,/Concordas na transferência de (.*?) (.*?) das contas nacionais para (.*?)\?/i,'Concordas na transferência de <b>$1</b> $2 das contas nacionais para <a href="http://www.erepublik.com/en/search/?q=','&commit= >$3</a> ?',5,10,'pt'];
var arrES = [/(?=Donar)/,/\¿Accedes a transferir (.*?) (.*?) de las cuentas del país a (.*?)\?/i,'¿ Accedes a transferir <b>$1</b> $2 de las cuentas del país a <a href="http://www.erepublik.com/en/search/?q=','&commit= >$3</a> ?',4,11,'es'];

var arrOpt = new Array(arrEN, arrFR, arrDE, arrPT, arrES);

$(document).ready(function(){

	var isDonate = false;
	var lawText = $("div.indent>p.largepadded").html();
	var donateText = $("div.indent>p.largepadded").text();
	var lawType = $("div.goleft").text().replace(/\t/g, "");

	donateText = donateText.replace(/\t/g, "");	
	
	for (var langInd = 0; isDonate != true || langInd <6 ;langInd++) {
		if (lawType.match(arrOpt[langInd][0])) {
	  
			var donateTextSplit = donateText.replace('?', '').split(' ');
			var currencyText = donateTextSplit[arrOpt[langInd][4]];
			
		// ----- Org Name (to search and show up) -----	
			var	orgNameSearch = donateTextSplit[arrOpt[langInd][5]];
			var	orgName = donateTextSplit[arrOpt[langInd][5]];
			var i = arrOpt[langInd][5] + 1;	
			while (donateTextSplit[i] != undefined)	{ 	 
					orgNameSearch = orgNameSearch + '+' + donateTextSplit[i];
					orgName = orgName + ' ' + donateTextSplit[i];
					i++;
				}
		// ----- Org Name (to search and show up) -----

				
		// ----- Images of flags -----
			if (currencyText == 'GOLD') { 
				var imgCurrency = ' <img src="http://www.erepublik.com/images/parts/icon-gold.gif" >'; 
			} 
			else { 
				var imgCurrency = ' <img src="http://www.erepublik.com/images/flags/S/' + currencyCountry[currencyText] + '.gif" >'; 
			}
		// ----- Images of flags -----
		
		// ----- Replacement -----	
			donateText = donateText.replace (arrOpt[langInd][1], arrOpt[langInd][2] + orgNameSearch + arrOpt[langInd][3]);
			donateText = donateText.replace (currencyText, currencyText + imgCurrency);
			$("div.indent>p.largepadded").html(donateText);
		// ----- Replacement -----	
		
			isDonate = true;	
		
		// ----- Direct Link and a cute Picture :3 -----	
			var loadUrl = 'http://www.erepublik.com/en/search/?q=' + orgNameSearch + '&commit=';
			var awesomeLink = '';
			GM_xmlhttpRequest({
				method: 'GET',
				url: loadUrl,
				onload: function(response) {
					var orgID = $(response.responseText).find('div.nameholder>a.dotted').attr('href');
					var orgAvatar = $(response.responseText).find('div.avatarholder>a>img').attr("src");
					orgID = orgID.replace(/(.*?)\/citizen\/profile\/(.*?)/i, '$2');
					//orgAvatar = orgAvatar.replace(/(.*?)_142x142/i, '$1_55x55');
					orgAvatar = '<img src="' + orgAvatar + '" >';
					awesomeLink = '<div style="text-align:center;font-size:16px;font-weight:bold;">' + orgAvatar + ' <br><a href="http://economy.erepublik.com/en/accounts/' + orgID + '" >' + orgName + '</a> </div>';
					$("div.indent>p.largepadded").append(awesomeLink);
				}
			});
		// ----- Direct Link and a cute Picture :3 -----	
		}
	}	
});