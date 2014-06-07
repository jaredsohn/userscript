// ==UserScript==
// @name           eRepublik Company Helper
// @namespace      erepcomphelper
// @include        http://*.erepublik.com/*/company*
// @description This script greatly helps company owners. It gathers prices of the markets you can sell to and calculates the price you would have to sell your products at, including taxes etc. It will also show the price of your products in gold for every market.
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @require		http://omnipotent.net/jquery.sparkline/1.5.1/jquery.sparkline.min.js
// @require 		http://jquery-simpletip.googlecode.com/files/jquery.simpletip-1.3.1.min.js
// @require		http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require 	http://abomb.info/uislider.js
// @version 2.2.7
// ==/UserScript==

//V1.3: - script now works even if the language of the erepublik site is not english
//- script also works if the market you're trying to sale to is empty
//V1.4: - will show update link if a new version is found
//- hover with the mouse over the first line to see a tooltip containing the current cheapest 10 entries in the market
//V1.4.5: - Position on market is now the real position, not the number of people before you
//V1.5 - click on an entry in the market list tooltip to fill the amount and price of this entry into the sell boxes
//V1.5.1 - small adjustments to the market popup
//V1.5.2 - embargo handling - will not display anything or markets you can not sell to
//V1.5.3 - embargo handling #2 - will display market tooltip even if you can't sell to a market but no prices without taxes
//V1.6 - gold price history graph - move your mouse over it to display actual values. Shows up to 3 days, 3 pixel = 1 hour
//V1.6.1 - gold history tooltip polished, shows now 5 days and 2 pixel = 1 hour
//V1.6.2 - fixed a bug where the gold history graph would sometimes not show the current day and single values would be shown as a vertical line
//V1.6.3 - cleaned up the code a little and added a border to the graph, I think its easier that way to see the general trend of the graph
//V1.6.4 - fixed a bug while calculating the price without tax - prices should now always be correct
//V1.6.5 - another try at fixing the display of correct prices without taxes ... ;( Also added small loading graphic that are shown while prices and/or taxes are displayed
//V1.6.6 - error handling when feeds are down
//V1.6.7 - market links on flags now also work if feeds are down. Also streamlines price display, should really always show the correct prices now. WARNING: prices for countries where you have to pay import tax may not be completly accurate, as the tax can "distort" the price compared to companies that don't have to pay it. What that means is that it is possible that there are market offers whos exact price you won't be able to match.
//V1.7 - Added a graph for the raw materials prices your company needs. It searches through all qualities to find the cheapest offer and adjusts the "Buy raw materials" link accordingly.
//V1.7.1 - fixed several bugs concerning the raw materials graph
//V1.7.3 - more fixes for the raw material part
//V1.7.4 - possible fix for l0nestar's problem
//V1.7.5 - added error handling
//V1.7.5.x - more bug finding efforts
//V1.7.6 - the tax you will have to pay will now be displayed, also many many bugfixes, thanks to Roktaal, l0nestar1980, dumetrai and exesproll!
//V1.8 - Enhanced the worker page with a summary of the amount of money needed for paying workers and raw materials.
//V1.8.1 - bugfixes for the new employee page thingy.
//V1.8.2 - now also shows profit total and per employee.
//V1.8.3 - changing wages and fireing people is again possible ;P
//V1.8.3.x - added error reporting to employee page, bugfixes.
//V1.8.4 - many many employee page fixes - thanks to l0nestar1980, dumetrai and pfc1! also update link now updates directly
//V1.8.5 - added warnings if the script has missing data and help on what to do then. profit part can be disabled by appending "?disableemployeepage=1" to the url once.
//V1.8.6 - added settings popup, employee enhancement and changing price and amount input boxes maxlength is now configurable there.
//V1.8.7 - small bugfixes and added shameless advert for my login switcher script in settings boxa nd for my worker wellness history script on the employee page
//V1.8.8 - small bugfixes and debug output can be enabled in the settings popup, also the enhancement of the buy raw materials link can be enabled/disabled in the settings
//V2.0 - compatible with erep V2 =) Employee page profit etc not yet working.
//V2.0.x - bugfixes
//V2.1 - found most of the bugs, corrected calculation of prices + prices with tax
//V2.1.x - more bugfixes
//V2.2 - you can now filter the market data querys by customization points (like on the nromal market page).
//V2.2.1 - bugfixes
//V2.2.2 - bugfixes
//V2.2.3 - refresh data links will now show how many requests are still running
//V2.2.4 - improved precision of gold amounts for raw prices, thanks toBilkoff for suggestion!
//V2.2.5 - show progress during first initialization
//V2.2.6 - bugfix for raw companies
//V2.2.7 - fix for day 1000+
var version = "2.2.7";

GM_addStyle(".fakelink { color: #53B3D3; }");
GM_addStyle(".echmet td { background-image: none !important; height: auto !important; border-bottom: 0px !important; font-weight: normal !important; color: #999999 !important;}");
GM_addStyle(".fakelink:hover { color: #53B3D3; cursor:pointer; }");
GM_addStyle("div.tooltip2:hover {background:#ffffff; text-decoration:nsone;}");
GM_addStyle("div.tooltip2 span {display:none; padding:2px 3px; margin-left:2px;}"),
GM_addStyle("div.tooltip2:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}");
GM_addStyle("div.tooltip2 td { border-bottom: 0px; padding: 0px !important; }");
GM_addStyle("div.tooltip2 tr.highlight td { color: #22BB22 !important; }");
GM_addStyle("table.echtable { padding: 0px; font-weight: normal; color: #999999 !important; }");
GM_addStyle("div.enhmarket div { font-weight: normal !important; color: #999999 !important; }");

document.marketdatas = 0;
document.exs = 0;

Function.prototype.bind = function( thisObject ) {
	var method = this;
	var oldargs = [].slice.call( arguments, 1 );
	return function () {
		var newargs = [].slice.call( arguments );
		return method.apply( thisObject, oldargs.concat( newargs ));
	};
};

function getJSON(ajaxUrl, functionSuccess, functionFailure){
	$.ajax(
			{
				type: "GET",
				url: ajaxUrl,
				contentType: "application/json; charset=utf-8",
				data: {},
				dataType: "json",
				success: functionSuccess,
				error: functionFailure
			});
}

var dataname="data2";
var cdataname="cdata2";
GM_deleteValue("data");
GM_deleteValue("cdata");

var GMset = {};
GMset.get = function(name, def) {
	var settings = deserialize("settings", {});
	if (settings[name] == undefined)
		return def;
	return settings[name];
};
GMset.set = function(name, value) {
	var settings = deserialize("settings", {});
	settings[name] = value;
	serialize("settings",settings);
};



var errorgif = "data:image/gif,GIF89a%0F%00%0D%00%B3%00%00%EC%9F%9F%E6%80%80%D2%20%20%F9%DF%DF%DCPP%DF%60%60%FC%EF%EF%D600%E5%7F%7F%EF%AF%AF%F2%BF%BF%E9%8F%8F%CF%10%10%CC%00%00%FF%FF%FF%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%0D%00%00%04G%D0%C9%89%1A%9A%18%0F%D6%D8%C8%19%D1%8C%048)%CD%A2%2C%8Db%3AB%EB%A0%82%C96%D3%B8d%06%87K%23%86%01S%18%A5%1C%B7F%E1dl%04%1C%81%A6%CBqhZG%07%07%C0%9A%D0Z%01%3E%E3.%DAd%84%AF%E5%08%00%3B";
var loadinggif = "data:image/gif,GIF89a%13%00%0D%00%A5%00%00%14%16%14%8C%8E%8C%CC%CA%CCljl%E4%E6%E4%AC%AE%AC464%24%26%24%DC%DA%DC%7C~%7C%F4%F6%F4%BC%BE%BC%9C%9E%9C%D4%D2%D4%EC%EE%EC%B4%B6%B4LJL%2C.%2C%84%86%84%1C%1E%1C%9C%9A%9Ctrt%E4%E2%E4%FC%FE%FC%C4%C6%C4%AC%AA%AC%94%92%94%CC%CE%CC%EC%EA%EC%B4%B2%B4%3C%3A%3C%2C*%2C%DC%DE%DC%84%82%84%FC%FA%FC%C4%C2%C4%A4%A2%A4%D4%D6%D4%F4%F2%F4%BC%BA%BCLNL424%8C%8A%8C%24%22%24tvt%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%06%00%17%00%2C%00%00%00%00%13%00%0D%00%00%06%B1%C0%8B%F0%E20%09%17'%81%D0%E1%18%3A%1B%9DE%89%13%00eL%0D%92%A0%E4%14%92%92%24%85D%A5%121H%A5%8EHh%EA%144%09%C9%E8%C2%195G%89D%E0%EBx%9CL%0C'%25k%5D%08%23!%18%26%0F%19%0C%1D*%5C%5DC%20%09%1A%1D%19%20*z%1DF%91%22%0F%01*U%17%0F%24%16'%05B%04'%0DB%23*%02%04%05k%14%05%0E%0B!%22%02%11%07%11%1A%17%24%2C%B0%24F%19%7B%12%14%22(%2B%11))%16%18%15%1A%14%14%0A%17%80*%0C%1C%22%06%2B%07%1F%07%0D%22'%01%0C%04C%22%0A%84%2C%00%13%2B%1E%9C%91%5D%26%03%1F%10%1B%F1A%00!%F9%04%09%06%00%16%00%2C%00%00%00%00%13%00%0D%00%85%0C%0E%0C%8C%8A%8C%C4%C6%C4TRT%AC%AA%AC%E4%E6%E4%2C*%2C%9C%9A%9C%D4%D6%D4%BC%BA%BC%F4%F6%F4lnl%3C%3A%3C%7C~%7C%24%22%24%94%92%94%CC%CE%CC%B4%B2%B4%EC%EE%EC%A4%A2%A4%DC%DE%DC%C4%C2%C4%FC%FE%FCDBD%84%86%84%1C%1A%1C%8C%8E%8C%CC%CA%CC%AC%AE%AC%EC%EA%EC%2C.%2C%9C%9E%9C%DC%DA%DC%BC%BE%BC%FC%FA%FCtrt%3C%3E%3C%84%82%84%24%26%24%94%96%94%D4%D2%D4%B4%B6%B4%F4%F2%F4%A4%A6%A4%E4%E2%E4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AC%40%8B%D0%22Q%09%13%89%8DP%22%19%3AQ%91%10B%12%A0%ACT%A8%09%04%E1%14N%92%13%05%26%A0%11%7D%26P%91P%15%E1%3C%1A%98%8A%A5S%E9X*%A5%86%E6%DBI%25T%1F%09%08j%5D%20x%02*)%04%1F%11%01%5C%5DC%14y%11%04%14%01z%11%0A%90%16%22%23%1E%0C%0D%14%16)%2B%2C%09%04k%20%05B%18%19%06%1E%03%9A%07%04*%02%01%22%2C%0Fgr%03%19%0E%06%06%AB%04%7B%1A%1F%16%1F%07%1D%1D%18%12%18%00%BE%0C%9A%12%13%01%1Fv''(%08%0F%05%0A%23%0E%24JB%22%0A%84%09%18%0F'%07%84%9A%9B%E3%09%7B%AB%90A%00!%F9%04%09%06%00%17%00%2C%00%00%00%00%13%00%0D%00%85%0C%0E%0C%8C%8A%8C%C4%C6%C4TRT%AC%AA%AC%E4%E6%E4trt%24%26%24%9C%9A%9C%D4%D6%D4%BC%BA%BC%F4%F6%F4%7C~%7C%1C%1A%1C%94%92%94%CC%CE%CCdfd%B4%B2%B4%EC%EE%EC424%A4%A2%A4%DC%DE%DC%C4%C2%C4%FC%FE%FC%84%86%84%14%16%14%8C%8E%8C%CC%CA%CCTVT%AC%AE%AC%EC%EA%EC%7Cz%7C%2C.%2C%9C%9E%9C%DC%DA%DC%BC%BE%BC%FC%FA%FC%84%82%84%24%22%24%94%96%94%D4%D2%D4ljl%B4%B6%B4%F4%F2%F4464%A4%A6%A4%E4%E2%E4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AF%C0%8B%F0%22Y%09%15%8A%8DP%22%19%3AQ%91Q%C2%A3%A9%B4V(%CA%26%E1%14R%92%94%05%26%10%20%85(%8F%08I%B8%8At%1C%0C%8C%E5%E2%B14-%25%03%87%C5%11%A9%14%0B!%0A%09k%5D%09-%19%07%13%10%04!%11%01%5C%5DC%0A%00%0D%26%03%15%01%0C%1A%11F%92%24%11%1F)%20%23%17*%14.%0A%04l%22%05B%16%01%1B%05%1Dk%08%1D%12%02%18%17.%0Egs-%18%02%1E%14F%04%1A%14%C7%17!%08%1E%1E'%B8%1F%0E'!%0B%17%2B!%01!%1E%17%D2(%09'%1E%24%0A%BD%AEB%24%0B%85%23%18%D2%08%D5%17%85%92%E6%E3%14%E5%5DA%00!%F9%04%09%06%00%14%00%2C%00%00%00%00%13%00%0D%00%85%0C%0E%0C%8C%8A%8C%C4%C6%C4%AC%AA%AC%E4%E6%E4LNL%9C%9A%9C%D4%D6%D4%BC%BA%BC%F4%F6%F4%24%26%24%7C~%7C%94%92%94%CC%CE%CC%B4%B2%B4%EC%EE%EC%A4%A2%A4%DC%DE%DC%1C%1E%1C%C4%C2%C4%FC%FE%FC424%84%86%84%14%16%14%8C%8E%8C%CC%CA%CC%AC%AE%AC%EC%EA%ECTVT%9C%9E%9C%DC%DA%DC%BC%BE%BC%FC%FA%FC%2C*%2C%84%82%84%94%96%94%D4%D2%D4%B4%B6%B4%F4%F2%F4%A4%A6%A4%E4%E2%E4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AF%40%8A%90%F20%09%3F%88%8C0%E2%19%3AI%8E%CF%E1%11%88tL%83P%E5%E4%14B%10%0D%88%C9%82%09%80%0A%12%05%07%24494%8C%85eB%D9L6%94%05%E0%C2%F9%3EJ%08%09%1D%08%07lN%20%0E%23%22%02%0F%08%03%1D%0E%01%07%5DN(%0B%0C%0E'%11%01%0B%18%0EF%94%88%01%01%18%11%14%25%10(%8Em%1E%04B%13%01%19(%1Al%06%1A%0F%02f(%0C%10%1Dt'%8B%1Bb%14%03%18%10%18%1D%14%1D%06%04%0F%23%26%02%97%23%06%09D%1D%01%1Dx%0C%23%24%07%23%04%20%08%0C%1D%AEC%A0%14%1F%16%0C%0C%06%86%86%94B%E1%0C'x%94A%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%13%00%0D%00%85%14%16%14%8C%8E%8C%CC%CA%CC%AC%AE%AC%E4%E6%E4%7Cz%7C%9C%9E%9C%DC%DA%DC%BC%BE%BC%F4%F6%F4%84%86%84%3C%3E%3C%94%96%94%D4%D2%D4%B4%B6%B4%EC%EE%EC%A4%A6%A4%2C*%2C%84%82%84%E4%E2%E4%C4%C6%C4%FC%FE%FC%1C%1A%1C%94%92%94%CC%CE%CC%B4%B2%B4%EC%EA%EC%7C~%7C%A4%A2%A4%DC%DE%DC%C4%C2%C4%FC%FA%FC%8C%8A%8C%9C%9A%9C%D4%D6%D4%BC%BA%BC%F4%F2%F4%AC%AA%AC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AB%C0%8A%B0%F2%20%09%0B%0B%90%F0%F1%18%3A%1B%19DCd%89D%08%0D%8E%40%E4%14rF%18%86%06%00%88%90.%06Q%E6%23%24e%06%97%8D%C2S%C1H%B8%14%C9%26%F0%D58F%24%06%23%22l%5D%07%1E%12%14%24%0E%25%06%19%20%5C%5DC%1D%12%01%19%25%1D%20%95%03F%92%1F%8F%01%01%1D%15%0E%1C%1D%23%03m%22%1AB%1E%20%02%04%03l!%9C%14%20%1F%13%17%1C%06t%10%89%04%1CF%25%7C%01%06%15%06!%04%1A%0C%24%14%1B%17!!l%0F%06%20%06%AC%0C%0C%0D%07%17%04%1F%23%C5%04N%9D%15%23%20%17%17%0C%85%92%5D%1F%0E%BA%AC%92A%00!%F9%04%09%06%00%14%00%2C%00%00%00%00%13%00%0D%00%85%14%12%14%8C%8A%8C%C4%C6%C4%AC%AA%AC%E4%E6%E4TVT%9C%9A%9C%D4%D6%D4464%BC%BA%BC%F4%F6%F4%24%26%24%7C~%7C%94%92%94%CC%CE%CC%B4%B2%B4%EC%EE%EC%A4%A2%A4%DC%DE%DC%C4%C2%C4%FC%FE%FC%2C.%2C%84%86%84%14%16%14%8C%8E%8C%CC%CA%CC%AC%AE%AC%EC%EA%EC%5CZ%5C%9C%9E%9C%DC%DA%DCLJL%BC%BE%BC%FC%FA%FC%2C*%2C%84%82%84%94%96%94%D4%D2%D4%B4%B6%B4%F4%F2%F4%A4%A6%A4%E4%E2%E4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%B2%40%8A%90%22I%09%13%89%8C%10%02%19%3A%23%15%C4cc%91%A0N%A5%88%E3%E0%14~%16%22%8E%82%11%C0%84%0C%91%C3%23%24%3C%3D4%05%00%60D%D9L6%94%C9%88%81%89%246%26%09'%1D%18%03%0A%5D%14%1E%20%23%02'%26%03%1D%0F%01%5C%88B)%0C%0D%0F%03%12%01%23%01%1A%87%88!%0F%18e%12%14%26%11%12%20%03m%1E%04B%13%01%19%04%1Al%06%1A'%02%01!)%7D%11%13%14(%8C%1B%11'%14%03%7D%7D%14%1D%06%04%1B%24%10%02%98%06%24l%10%11%01%1Dx%0D%24%25%07%24%1B!%09%18%1D%B0B!%C7B%20%16%0D%0D%06%A1l%95%E8%09%0D%11%E7%5DA%00!%F9%04%09%06%00%19%00%2C%00%00%00%00%13%00%0D%00%85%1C%1E%1C%94%92%94%CC%CA%CCdbd%AC%AE%AC%E4%E6%E4DFD%7C~%7C%A4%A2%A4%DC%DA%DC%BC%BE%BC%F4%F6%F4%2C*%2C%8C%8A%8C%9C%9A%9C%D4%D2%D4%B4%B6%B4%EC%EE%EC%24%26%24lnlTVT%84%86%84%AC%AA%AC%E4%E2%E4%C4%C6%C4%FC%FE%FC%24%22%24%94%96%94%CC%CE%CC%B4%B2%B4%EC%EA%ECLNL%84%82%84%A4%A6%A4%DC%DE%DC%C4%C2%C4%FC%FA%FC%2C.%2C%8C%8E%8C%9C%9E%9C%D4%D6%D4%BC%BA%BC%F4%F2%F4trt%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AD%C0%8C0%13Q%09%15)%810%12%19%3A%1F%1D%05*%D2%10%85T%0F%04%07%E5%14%22%3A%1C%84%0A%D40%91N'T%87%24%2C%0C%0C%83Ue%94%F1%60%3C%99%11%88%8CHy%26%0C%25%0Ci%5DB%09%0A%20%18%11)%14%1A%12%00%16%85C%17%07%01%10%16)%00%1F%2B%16%0B%92%24%1D%26e%22%19%04%08%17)%91%19*%09%05B%23%0D%02%05%04l%0E%16*%B0%24%17%26%08%08t%08%15wb%19%16%BC%26'%19'%0E%05%11%1B*%18%95%0E%1Bl%11%08%0D'M%1B%1B%0F(%1B%05%24)%BC%AEB%24FB)%15%01%1B%0El%92%5D%E0%01%08%E3%5DA%00!%F9%04%09%06%00%1A%00%2C%00%00%00%00%13%00%0D%00%85%1C%1E%1C%94%92%94%CC%CA%CCdfd%AC%AE%AC%E4%E6%E4%3C%3E%3C%7C~%7C%A4%A2%A4%DC%DA%DC%BC%BE%BC%F4%F6%F4%2C.%2C%8C%8A%8C%24%26%24%9C%9A%9C%D4%D2%D4%B4%B6%B4%EC%EE%ECTVTtrtDFD%84%86%84%AC%AA%AC%E4%E2%E4%C4%C6%C4%FC%FE%FC%24%22%24%94%96%94%CC%CE%CC%B4%B2%B4%EC%EA%EC%84%82%84%A4%A6%A4%DC%DE%DC%C4%C2%C4%FC%FA%FC%3C%3A%3C%8C%8E%8C%2C*%2C%9C%9E%9C%D4%D6%D4%BC%BA%BC%F4%F2%F4%7Cz%7CLJL%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%06%AE%40%8DP%23Y%09U*%81P%22%19%3A!%1EEJ%D2%10%85V%10D'%E5%14%22%92%88%85%A5a%22%A1%10P%92p%E5!%04X%96%91%E63%FAhF%A0%83%E9%2B%89%A8V(*%5C%5D%1A%09%0A%20%19%2B%11%17g%26%83%84%1A%18%07%01%1E%17%22%16%15%25%14M%84%24%1E%26d%22%1A%2C%0E%0C'%03k%09%05B%23%0D%02%05%04%24%24%25%A5'%0C%24%18%7B%08r!%88%05%08M%13%00%1B%00-%1A%26%0F%1F%1F%1C%12%19%93%0F(j%09%06%00%06%09%24%01%1C%10)%1C%1F%24*%01(%ABB%24%DEj*%16%D9%0F%0B%E4%90C%24%11%01!%E3%5DA%00%3B";
var settingsimg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%04gAMA%00%00%D7%FBo3%18%01%00%00%00%20cHRM%00%00l%9B%00%00ro%00%00%F6%AE%00%00%85%83%00%00n%F7%00%00%E8A%00%001t%00%00%17l%A1%B6-%9B%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%19tEXtSoftware%00Paint.NET%20v3.5.5I%8A%FC%E0%00%00%02%DCIDAT8O%5D%93%5DH%9Aa%14%C7%DF%D7Y%E9%D6%60%17%A3.v%A1%171o%EA%22o%0DF%11%16%89%90va%8CA5%86%8B%10%A3F%26%9B%F4Ma%99%1A%2B%CDH%ED%D3%96%7D%40%9607%8A%89fjf%84%0C%04%0B6%1Ac%AC%8B%C1%16%D6%FA%D8%D9y%5E%B6%B1%12%0Er%8E%E7%FF%9Cs~%E7HQ%D7%3E555%B7%AB%AB%ABotvv%CA%17%17%17%DDf%B3%B9%05%7D%1A-%FBz%EE%15%BF%AB%AB%AB.%10%08%7C%B2X%2C%86%99%99%19%D7%D1%D1%11%AC%AF%AF%A7Z%5B%5B%1F%FA%FD%FE%AFCCCZ%B9%5C%9EqETQQA%97%97%97%B3%C6%C7%C7_%1D%1C%1C%402%99%BC%DC%D9%D99%D9%DF%DF%87D%22q%B1%BB%BB%9B%26q%8F%C7%93%94J%A5%9C%2B%E2%B6%B6%B6%BA%D5%D5%D5%C8%C0%C0%80%17E%80%C9%90J%A5%E0%F0%F0%10%88hoo%8F%89%8D%8C%8Cl%CE%CF%CF%BB%F5z%BD%8Ey%40%22%91%DCt%B9%5C%1F%83%C1%20%C4%E3q%08%85B%8C%80%24ommA%2C%16c%FCH%24%02%E4%E1p8%0CX%E8%18%DB%E7Qb%B1%98%AE%AD%AD%7D211%91%C6%20loo%C3%DA%DA%1A%CC%CE%CE%9E%19%8D%C6%0F%93%93%93'%24%1E%8DF%C1%EB%F5%C2%C2%C2%C2%AF%E6%E6fkiii%16%D5%D8%D8X%87%81%A0%DB%ED%3E%5DZZ%82%95%95%15%18%1B%1B%3B%97%C9d%8A%B2%B22%16%F2%10!%A8%1FH%9E%CC%0C%D8%E5%E5%D4%D4%94O%A7%D3%3D%A6%D4j%B5%13%1D%40X%E4%07%C0J%80%0C%BE%14%15%15%B1%FF%82%D1h4%9Bv%BB%1D%B0%00%93%87%9B%80%9E%9E%1E7%85%F4%1E544%BC%D5j%B5%A7%B8S%B0Z%AD%80%E0%CE*%2B%2B%A5D%5CRR%22%EC%EF%EF%FFn2%99%60tt%14%DA%DB%DB%2F%B1%DB%A4B%A1h%A1%04%02%01%AB%BE%BE%FE%19%0A%7FbEX%5E%5E%06%DC7%CC%CD%CD%9Db%85%04%D2%3D%C6*%40%DA%26%F1%BE%BE%BE%0B%A5R%F9%9C%E8%A8%FC%FC%FC%EC%EE%EE%EE%CF%83%83%83%600%18%00%0F%04%F0P%98%D6%86%87%87%C1%E9t%02%1E%088%1C%0E%209%7F%2C-%14%0A%EF1c!%F1%A7X%FD%5DUU%D5k%92L%E6%F6%F9%7C%CC%AA%F0%C2%60zz%9Ay%04%B7%12V%A9TQ%1CI%9F%97%97G3%E2%DC%DC%5C%3A''%87%D5%D1%D1%F1%86%10E8%176%9B%ED%8C%90G%D19%FA%E7%24%DE%DB%DB%1B%E0%F3%F9%19%3C%1E%EF%1FL%A2%A7%D9lv%16%EE%EE%05%CE%F4%AD%B8%B8%D8%D6%D4%D4%14%DB%D8%D8%00%04%F9%5E%24%12Y%B0%DD4%C25fff%DE%22%F9%FF%9F(y%E9%0E%1A%9F%C3%E1%3C%A0iZ%5CPP%F0%92%B4YXXh'%87%C8%E5r%25%F8%7D%1F%ED.%1A%F3%E7%F8%0DL%94%BBP%DB%B2%89%FA%00%00%00%00IEND%AEB%60%82";
var goldimg = '<img title="Gold" alt="Gold" style="position: relative; top: 2px; height: 14px; border: none;" src="http://www.erepublik.com/images/parts/icon-gold.gif" />';

var cids = {};
cids['Argentina'] = [27,"ARS"];
cids['Australia'] = [50,"AUD"];
cids['Austria'] = [33,"ATS"];
cids['Belgium'] = [32,"BEF"];
cids['Bolivia'] = [76,"BOB"];
cids['Bosnia-Herzegovina'] = [69,"BAM"];
cids['Brazil'] = [9,"BRL"];
cids['Bulgaria'] = [42,"BGN"];
cids['Canada'] = [23,"CAD"];
cids['Chile'] = [64,"CLP"];
cids['China'] = [14,"CNY"];
cids['Colombia'] = [78,"COP"];
cids['Croatia'] = [63,"HRK"];
cids['Czech-Republic'] = [34,"CZK"];
cids['Denmark'] = [55,"DKK"];
cids['Estonia'] = [70,"EEK"];
cids['Finland'] = [39,"FIM"];
cids['France'] = [11,"FRF"];
cids['Germany'] = [12,"DEM"];
cids['Greece'] = [44,"GRD"];
cids['Hungary'] = [13,"HUF"];
cids['India'] = [48,"INR"];
cids['Indonesia'] = [49,"IDR"];
cids['Iran'] = [56,"IRR"];
cids['Ireland'] = [54,"IEP"];
cids['Israel'] = [58,"NIS"];
cids['Italy'] = [10,"ITL"];
cids['Japan'] = [45,"JPY"];
cids['Latvia'] = [71,"LVL"];
cids['Lithuania'] = [72,"LTL"];
cids['Malaysia'] = [66,"MYR"];
cids['Mexico'] = [26,"MXN"];
cids['Netherlands'] = [31,"NLG"];
cids['North-Korea'] = [73,"KPW"];
cids['Norway'] = [37,"NOK"];
cids['Pakistan'] = [57,"PKR"];
cids['Paraguay'] = [75,"PYG"];
cids['Peru'] = [77,"PEN"];
cids['Philippines'] = [67,"PHP"];
cids['Poland'] = [35,"PLN"];
cids['Portugal'] = [53,"PTE"];
cids['Republic-of-Moldova'] = [52,"MDL"];
cids['Romania'] = [1,"RON"];
cids['Russia'] = [41,"RUB"];
cids['Serbia'] = [65,"RSD"];
cids['Singapore'] = [68,"SGD"];
cids['Slovakia'] = [36,"SKK"];
cids['Slovenia'] = [61,"SIT"];
cids['South-Africa'] = [51,"ZAR"];
cids['South-Korea'] = [47,"KRW"];
cids['Spain'] = [15,"ESP"];
cids['Sweden'] = [38,"SEK"];
cids['Switzerland'] = [30,"CHF"];
cids['Thailand'] = [59,"THB"];
cids['Turkey'] = [43,"TRY"];
cids['Ukraine'] = [40,"UAH"];
cids['United-Kingdom'] = [29,"GBP"];
cids['Uruguay'] = [74,"UYU"];
cids['USA'] = [24,"USD"];
cids['Venezuela'] = [28,"VEB"];
var pids = {};
pids['food'] = 1;
pids['gift'] = 2;
pids['weapon'] = 3;
pids['moving-tickets'] = 4;
pids['grain'] = 5;
pids['diamonds'] = 6;
pids['iron'] = 7;
pids['oil'] = 8;
pids['wood'] = 9;
pids['house'] = 10;
pids['hospital'] = 11;
pids['defense-system'] = 12;
var rawmatdict = {};
rawmatdict['weapon'] = 'iron';
rawmatdict['food'] = 'grain';
rawmatdict['gift'] = 'diamonds';
rawmatdict['moving-tickets'] = 'oil';
rawmatdict['house'] = 'wood';
rawmatdict['hospital'] = 'wood';
rawmatdict['defense-system'] = 'wood';

(function($) {
	$.fn.sparklineEvents = function (uservalues, options) {
		var options = $.extend({
			type : 'line',
			lineColor : '#00f',
			fillColor : '#D4E4FF',
			defaultPixelsPerValue : 2,
			width : 'auto',
			height : 'auto',
			composite : false,
			onMouseOverCallback: undefined
		}, options ? options : {});

		return this.each(function() {
			var render = function() {
				var values = (uservalues=='html' || uservalues==undefined) ? $(this).text().split(',') : uservalues;
				var width = options.width=='auto' ? values.length*options.defaultPixelsPerValue : options.width;
				if (options.height == 'auto') {
					if (!options.composite || !this.vcanvas) {
						// must be a better way to get the line height
						var tmp = document.createElement('span');
						tmp.innerHTML = 'a';
						$(this).html(tmp);
						height = $(tmp).innerHeight();
						$(tmp).remove();
					}
				} else {
					height = options.height;
				}

				$.fn.sparkline[options.type].call(this, values, options, width, height);

				this.options = options;
				this.values = values;
				if(options.onMouseOverCallback != undefined){
					$(this).bind("mousemove", function(e){
						// where am i based on left and bar width and space..
						var theElement = this;
						var positionX = 0;
						while (theElement != null)
						{
							positionX += theElement.offsetLeft;
							theElement = theElement.offsetParent;
						}
						var left = e.pageX - positionX;
						var element = Math.ceil(left / this.options.defaultPixelsPerValue);
						var opts = this.options;
						opts.highlightIndex = element;
						if(options.onMouseOverCallback != undefined){
							options.onMouseOverCallback(element, this.values[element]);
						}
					});
				}
			};

			// jQuery 1.3.0 completely changed the meaning of :hidden :-/
			if (($(this).html() && $(this).is(':hidden')) || ($.fn.jquery < "1.3.0" && $(this).parents().is(':hidden'))) {
				pending.push([this, render]);
			} else {
				render.call(this);
			}
		});
	};

})(jQuery);


document.lastError = "";
document.debugc = 0;

function deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

function RefreshMDLeft() {
	if (document.marketdatas > 0)
		$('#md_left').html('(' + document.marketdatas + ')');
	else
		$('#md_left').html('');
}

function RefreshEXLeft() {
	if (document.exs > 0)
		$('#ex_left').html('(' + document.exs + ')');
	else
		$('#ex_left').html('');
}

function GetMarketDatas() {
	var compid = $('#companyId').val();
	var cdata = deserialize(cdataname, [])[compid];
	for (var index = 0; index < cdata.exportcountries.length; index++) {
		try {
			document.marketdatas++;
			RefreshMDLeft();
			var customs = cdata.customizations;
			var idx = 1;
			var custarray = [];
			for (cust in cdata.customizations)
			{
				custarray.push(GMset.get("slider_" + compid + "_" + idx++, 0));
			}

			// only add customizations to url if we are NOT a raw company
			var cust = "";
			if (!cdata.israw)
				cust = '/'+custarray.join("/");

			var url = 'http://api.erepublik.com/v2/feeds/market/'+cdata.industry+'/'+cdata.exportcountries[index].id+ cust + ".json";
			/*
			 * onerror: function(res) { ReportDebug("Error getting market data from " +
			 * res.finalUrl + ": " + res.status + " - " + res.statusText);
			 * $('#errormarket').css({'display':'inline'}); document.marketdatas--;
			 * if (document.marketdatas == 0) {
			 * $("#refreshmarket").attr("class","fakelink");
			 * $('#refreshmarketimg').css({"display":"none"}); } },
			 */
			var index_ = index;
			ReportDebug("'Requesting market data from <a href=\"" + url + "\">"+url+"</a>");
			getJSON(url, ParseMarketData(index), function() { 
				ReportDebug("Error getting market data!");
				$('#errormarket').css({'display':'inline'}); 
				document.marketdatas--;
				RefreshMDLeft();
				if (document.marketdatas == 0) {
					$("#refreshmarket").attr("class","fakelink");
					$('#refreshmarketimg').css({"display":"none"}); 
				}
			});
		}
		catch (e) {
			ReportError(e);
		}
	}
}

function ParseMarketData(index) {
	return function(retdata,status) {
		try {
			var compid = $('#companyId').val();
			var cdata = deserialize(cdataname, [])[compid];
			document.debugc = "m1";
			ReportDebug("Success! Got market data.");
			$('#errormarket').css({'display':'none'});
			var country = cdata.exportcountries[index].id;
			document.debugc = "m2";
			var data = deserialize(dataname,{});
			if (data[country] == undefined)
				data[country] = {};
			document.debugc = "m3";
			data[country].pos = ">10";
			document.marketdatas--;
			RefreshMDLeft();
			document.debugc = "m4";
			if (document.marketdatas == 0) {
				document.debugc = "m5";
				$("#refreshmarket").attr("class","fakelink");
				$('#refreshmarketimg').css({"display":"none"});
			}
			document.debugc = "m6";
			var rs = [];
			//var records = $(responseDetails.responseText).find('record');
			document.debugc = "m7";
			if (retdata.length == 0) {
				document.debugc = "m8";
				rs.push({price:0, pieces:0, cid:0});
			}
			else {
				document.debugc = "m9";
				$.each(retdata, function(rindex, value) {
					document.debugc = "m10";

					var price = value.price;
					var pieces = value.amount;
					var cid = value.company.id;
					var pushed = false;
					document.debugc = "m11";
					for (var i = 0; i < rs.length; i++) {
						document.debugc = "m11";
						if (price < rs[i].price || (price == rs[i].price && pieces >= rs[i].pieces) ){
							document.debugc = "m12";
							pushed = true;
							rs.splice(i,0,{price:price, pieces:pieces, cid:cid});
							break;
						}
					}
					document.debugc = "m13";
					if (!pushed)
						rs.push({price:price, pieces:pieces, cid:cid});
					document.debugc = "m14";
				});
			}
			document.debugc = "m15";
			data[country].rs = rs;
			document.debugc = "m16";
			for (var i = 0; i < rs.length; i++) {
				document.debugc = "m17";
				if ($('#companyId').val() == rs[i].cid) {
					document.debugc = "m18";
					data[country].pos = (i+1);
					break;
				}
			}
			document.debugc = "m19";
			serialize(dataname,data);
			document.debugc = "m20";
			EnhanceMarket();
			document.debugc = "m21";
		}
		catch (e) {
			ReportError(e);
		}

	};
}

function LoadExchange() {
	var cdata = deserialize(cdataname, [])[$('#companyId').val()];
	for (var index = 0; index < cdata.exportcountries.length; index++) {
		document.exs++;
		RefreshEXLeft();
		getJSON('http://api.erepublik.com/v2/feeds/exchange/'+cdata.exportcountries[index].currency+'/GOLD.json', ParseExchange(index), function() { 
			$('#errorexchange').css({'display':'inline'});
			document.exs--;
			RefreshEXLeft();
			if (document.exs == 0) {
				$("#refreshex").attr("class","fakelink");
				$('#refresheximg').css({"display":"none"});
			}
		});
	}
}

function ParseExchange(index) {
	return function(retdata, status) {
		var cdata = deserialize(cdataname, [])[$('#companyId').val()];
		$('#errorexchange').css({'display':'none'});
		var country = cdata.exportcountries[index].id;
		var data = deserialize(dataname,{});
		if (data[country] == undefined)
			data[country] = {};
		data[country].ex = parseFloat(retdata[0].exchange_rate);
		serialize(dataname,data);
		document.exs--;
		RefreshEXLeft();
		if (document.exs == 0)
		{
			$("#refreshex").attr("class","fakelink");
			$('#refresheximg').css({"display":"none"});
		}
		EnhanceMarket();
	};
}


function GetResourceFeeds() {
	var cdata = deserialize(cdataname, [])[$('#companyId').val()];
	if (cdata.israw)
		return;
	var url = 'http://api.erepublik.com/v2/feeds/market/'+ cdata.country +'/' + $('.raw_materials_actions a').attr('href').split('/')[4] + ".json";
	getJSON(url, ParseRaw, function() {
		$('#errorraw').css({'display':'inline'});
		$("#refreshraw").attr("class","fakelink");
		$('#refreshrawimg').css({"display":"none"});
	});
}

function ParseRaw(retdata,status) {
	//price = Math.floor(price*1000) / 1000;
	var data = deserialize(dataname,{});
	var cdata = deserialize(cdataname, [])[$('#companyId').val()];
	var country = cdata.country;
	var date = $(".eday strong").html().replace(',','');
	var time = $('#live_time').html().split(':')[0];
	if (data[country] == undefined)
		data[country] = {};
	var rawindustry = $('.raw_materials_actions a').attr('href').split('/')[4];
	if (retdata.length > 0) {
		var price = retdata[0].price;
		if (data[country][rawindustry] == undefined)
			data[country][rawindustry] = {};
		if (data[country][rawindustry][date] == undefined)
			data[country][rawindustry][date] = {};
		if (data[country][rawindustry][date][time] == undefined)
			data[country][rawindustry][date][time] = {};
		if (data[country][rawindustry][date][time].price == undefined)
			data[country][rawindustry][date][time].price = 999999999;
		if (price <= data[country][rawindustry][date][time].price)
		{
			var gold = Math.round((price * data[country].ex) * 100000) / 100000;
			data[country][rawindustry][date][time].price = price;
			data[country][rawindustry][date][time].gold = gold;
			data[country][rawindustry].currentPrice = price;
		}
		serialize(dataname,data);
	}
	EnhanceRaw();
}

function EnhanceRaw() {
	var data = deserialize(dataname,{});
	var cdata = deserialize(cdataname, [])[$('#companyId').val()];
	var country = cdata.country;
	var rawindustry = $('.raw_materials_actions a').attr('href').split('/')[4];
	var date = $(".eday strong").html().replace(',','');
	var time = $('#live_time').html().split(':')[0];

	$("#refreshraw").attr("class","fakelink");
	$('#refreshrawimg').css({"display":"none"});



	if ($('#rawcont').length == 0) {
		$('.raw_materials').append('<div style="position: relative; height: 0px; top: -82px;"><div id="rawcont" style="position: absolute; background-color: rgb(255, 255, 255); border: 1px solid white; height: 51px;"/></div>');
		$('.raw_materials').css({'overflow':'visible'});
	}
	$('#rawcont').html('');
	$('#rawcont').append('<div>'+data[country][rawindustry][date][time].price+'</div>');
	$('#rawcont').append('<div>'+data[country][rawindustry][date][time].gold+' ' + goldimg + '</div>');

	for (var sd = 850; sd <= parseInt(date - 12); sd++)
	{
		if (data[country] != undefined && data[country][rawindustry] != undefined && data[country][rawindustry][sd] != undefined)
			delete data[country][rawindustry][sd];
	}
	serialize(dataname,data);

	var gh = [];
	var ghtime = {};
	var counter = 0;
	for (var b = date - 4; b <= date; b++) {
		var max = 23;
		if (date == b) {
			max = parseFloat($('#live_time').html().split(':')[0]);
		}
		for (var y = 0; y <= max; y++) {
			if (y < 10)
				y = '0' + y;
			var val = null;
			if (data[country][rawindustry][b] != undefined && data[country][rawindustry][b][y] != undefined && data[country][rawindustry][b][y] != 0)
				val = data[country][rawindustry][b][y].price;
			if (isNaN(val))
				val = null;
			gh.push(val);
			if (gh[gh.length-1] == null && gh[gh.length-2] != null && gh[gh.length-3] == null)
				gh[gh.length-2] = null;
			ghtime[counter] = "day " + b  + ", " + y + "h: ";
			counter++;
		}
	}
	var wid = 240 - ((23 - parseFloat($('#live_time').html().split(':')[0])) * 2);

	var ghtt_ = $('<div class="ghtt" style=""/>');
	ghtt_.appendTo($('#rawcont'));
	var ghtt = $('<div/>').appendTo(ghtt_);
	ghtt.sparklineEvents(gh, {barWidth:wid , onMouseOverCallback: function(e,v) {
		if (!isNaN(v) && v != null)
			gtt.update(ghtime[e] + v);
		else
			gtt.update('');
	}});
	ghtt_.simpletip('');
	var gtt = ghtt_.eq(0).simpletip();
	ghtt.mouseleave(function() {
		gtt.hide();
	});

	ghtt_.find('.tooltip.fixed').css({'margin-top': '-34px', 'width': wid+'px', 'text-align':'right'});
	ghtt_.find("canvas").css({'border': '0.5px solid rgb(221, 221, 221'});

}

function RefreshMarketDatas() {
	if ($('#refreshmarket').attr("class") == "fakelink") {
		$('#refreshmarket').attr("class","");
		$('#refreshmarketimg').css({"display":""});
		GetMarketDatas();
	}
}

function AppendMarketLinks() {
	var mele = $('#market_offers_company h4');
	var compid = $('#companyId').val();
	var cdata = deserialize(cdataname, [])[compid];

	mele.append(' - ');
	$('<span class="" id="refreshmarket">Refresh Market Data <img id="refreshmarketimg" src="'+loadinggif+'"/><span id="md_left"></span></span><div id="errormarket" class="tooltip2" style="display: none;"><img src="'+errorgif+'"/><span style="z-index:999;">Error while getting market feed!<br/><a href="http://api.erepublik.com/" target="_blank">Erepublik API feeds</a> might be down.</span></div>').appendTo(mele).click(function(ev) {
		RefreshMarketDatas();
	});
	mele.append(' - ');
	$('<span class="fakelink" id="refreshex">Refresh Exchange Rates <img id="refresheximg" style="display: none;" src="'+loadinggif+'"><span id="ex_left"></span></span><div id="errorexchange" class="tooltip2" style="display: none;"><img src="'+errorgif+'"/><span style="z-index:999;">Error while getting exchange feed!<br/><a href="http://api.erepublik.com/" target="_blank">Erepublik API feeds</a> might be down.</span></div>').appendTo(mele).click(function(ev) {
		if ($(ev.target).attr("class") == "fakelink") {
			$(ev.target).attr("class","");
			$('#refresheximg').css({"display":""});
			LoadExchange();
		}
	});	
	// mele.append(' - <a href="http://userscripts.org/scripts/show/76219"
	// target="_blank">ECH V' + version + "</a>");
	mele.append(' - ');
	mele.append('<div style="float: right; height: 0px;"><div style="position: relative; left: 40px; background: none repeat scroll 0% 0% rgb(255, 255, 255); z-index: 999; border: 1px solid black; overflow: auto; padding: 5px; width: 450px; display: none;" id="ech_settings"></div><div>');
	var set = $('#ech_settings');
	
	AppendSettings(set, cdata, compid);
	
	var imgicon = $('<img class="fakelink" style="vertical-align: middle; margin-top: -3px;" src="'+settingsimg+'"/>');
	imgicon.appendTo(mele);
	imgicon.click(function(event) {
		$('#ech_settings').toggle();
		event.stopPropagation();
	});
}

function AppendSettings(set, cdata, compid) {
	set.append('Settings:');
	
	$('body').parent().click(function() {
		$('#ech_settings').css({'display': 'none'});
	});
	$('#ech_settings').click(function(event){
		event.stopPropagation();
	});


	// Enable Employee page stuff
	var setid = 'echs_enable_employee';
	set.append('<div style="margin:2px;"><input type="checkbox" id="'+setid+'" /> Enable employee page enhancements</div>');
	$('#' + setid).attr('checked',GMset.get(setid,true));
	$('#' + setid).change(function() {
		var setid = $(this).attr('id');
		GMset.set(setid, $('#' + setid).is(":checked"));
	});

	// Debug Output
	var setid = 'echs_enable_debug';
	set.append('<div style="margin:2px;"><input type="checkbox" id="'+setid+'" /> Enable Debug Output</div>');
	$('#' + setid).attr('checked',GM_getValue(setid,false));
	$('#' + setid).change(function() {
		var setid = $(this).attr('id');
		if ($('#' + setid).is(":checked")) {
			if (!confirm("This option is only useful if you encounter errors and were asked to send debug output.\nDo you really want to enable it?"))
				$('#' + setid).attr('checked',false);
		}
		GM_setValue(setid, $('#' + setid).is(":checked"));
	});


	/*// set input maxlength to 7
	var setid = 'echs_enable_maxlength';
	set.append('<div style="margin:2px;"><input type="checkbox" id="'+setid+'" /> Expand input fields maxlength</div>');
	$('#' + setid).attr('checked',GM_getValue(setid,false));
	$('#' + setid).change(function() {
		var setid = $(this).attr('id');
		GM_setValue(setid, $('#' + setid).is(":checked"));
	});*/



	/*set.append(sliderdiv);
	sliderdiv.addClass('normal_sliders');
	sliderdiv = $('<div/>').appendTo(sliderdiv);
	sliderdiv.addClass('bg_fix');
	sliderdiv.addClass('bg_fix wellness');
	sliderdiv = $('<div/>').appendTo(sliderdiv);
	sliderdiv.addClass('enabled');
	sliderdiv.addClass('sliders');
	sliderdiv.addClass('slider-range-min'); 
	sliderdiv.slider({
		range: "min",
		value: 0,
		min: 0,
		max: 100
	});
	 */

	if (!cdata.israw) {
		set.append("Filter Market by Customizations:");

		var sliderdiv = $('<div id="slidersettings" class="normal_sliders"><table id="slidertable"></table></div>');
		set.append(sliderdiv);

		var industryJSON = {"1":{"name":"Food","attributes":{"1":{"name":"Wellness","division":1,"modifier":0.1,"min":0},"2":{"name":"Happiness","division":1,"modifier":0.1,"min":0}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/food\/q1_90x90.png","cp":{"start":30,"upgrade":30}},"2":{"name":"Moving Tickets","attributes":{"1":{"name":"Wellness","division":1,"modifier":0.1,"min":0},"2":{"name":"Happiness","division":1,"modifier":0.1,"min":0},"3":{"name":"Moving Distance","division":20,"modifier":0.05,"min":20}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/movingtickets\/q1_90x90.png","cp":{"start":40,"upgrade":40}},"3":{"name":"House","attributes":{"1":{"name":"Wellness","division":1,"modifier":0.1,"min":10},"2":{"name":"Happiness","division":1,"modifier":0.1,"min":0},"3":{"name":"Durability","division":1,"modifier":1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/house\/q1_90x90.png","cp":{"start":40,"upgrade":40}},"4":{"name":"Hospital","attributes":{"2":{"name":"Durability","division":1,"modifier":100,"min":10},"1":{"name":"Wellness","division":1,"modifier":1,"min":10},"3":{"name":"Area of Effect","division":10,"modifier":0.1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/hospital\/q1_90x90.png","cp":{"start":40,"upgrade":40}},"5":{"name":"Defense System","attributes":{"1":{"name":"Defense","division":1,"modifier":0.5,"min":10},"2":{"name":"Durability","division":1,"modifier":1000,"min":10},"3":{"name":"Area of Effect","division":10,"modifier":0.1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/defensesystem\/q1_90x90.png","cp":{"start":40,"upgrade":40}},"6":{"name":"Rifle","attributes":{"4":{"name":"Damage","division":1,"modifier":0.1,"min":1},"1":{"name":"Attack","division":1,"modifier":1,"min":10},"2":{"name":"Defense","division":1,"modifier":1,"min":10},"3":{"name":"Durability","division":1,"modifier":1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/rifle\/q1_90x90.png","cp":{"start":50,"upgrade":50}},"7":{"name":"Tank","attributes":{"4":{"name":"Damage","division":1,"modifier":0.14,"min":1},"1":{"name":"Attack","division":1,"modifier":1,"min":10},"2":{"name":"Defense","division":1,"modifier":1,"min":10},"3":{"name":"Durability","division":1,"modifier":1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/tank\/q1_90x90.png","cp":{"start":50,"upgrade":50}},"8":{"name":"Artillery","attributes":{"4":{"name":"Damage","division":1,"modifier":0.12,"min":1},"1":{"name":"Attack","division":1,"modifier":1,"min":10},"2":{"name":"Defense","division":1,"modifier":1,"min":10},"3":{"name":"Durability","division":1,"modifier":1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/artillery\/q1_90x90.png","cp":{"start":50,"upgrade":50}},"9":{"name":"Air Unit","attributes":{"4":{"name":"Damage","division":1,"modifier":0.1,"min":1},"1":{"name":"Attack","division":1,"modifier":1,"min":10},"2":{"name":"Defense","division":1,"modifier":1,"min":10},"3":{"name":"Durability","division":1,"modifier":1,"min":10}},"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/airunit\/q1_90x90.png","cp":{"start":50,"upgrade":50}},"10":{"name":"Grain","attributes":null,"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/grain\/default_90x90.png","cp":null},"11":{"name":"Oil","attributes":null,"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/oil\/default_90x90.png","cp":null},"12":{"name":"Titanium","attributes":null,"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/titanium\/default_90x90.png","cp":null},"13":{"name":"Stone","attributes":null,"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/stone\/default_90x90.png","cp":null},"14":{"name":"Iron","attributes":null,"img":"http:\/\/www.erepublik.com\/images\/icons\/industry\/iron\/default_90x90.png","cp":null}};
		var attributesJSON = {"1":{"1":{"partName":"Ingredients","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/food\/part_ingredients.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_wellness.png","resultType":"intNr","resultDay":"\/ day","color":"wellness"},"2":{"partName":"Packaging","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/food\/part_packaging.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_happiness.png","resultType":"intNr","resultDay":"\/ day","color":"happiness"}},"2":{"1":{"partName":"Paper","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/movingtickets\/part_paper.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_wellness.png","resultType":"intNr","resultDay":"\/ use","color":"wellness"},"2":{"partName":"Packaging","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/movingtickets\/part_packaging.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_happiness.png","resultType":"intNr","resultDay":"\/ use","color":"happiness"},"3":{"partName":"Itinerary","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/movingtickets\/part_itinerary.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_movingdistance.png","resultType":"intNr","resultDay":"zone(s)","color":"moving_distance"}},"3":{"1":{"partName":"Roof","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/house\/part_roof.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_wellness.png","resultType":"intNr","resultDay":"\/ day","color":"wellness"},"2":{"partName":"Layout","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/house\/part_layout.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_happiness.png","resultType":"intNr","resultDay":"\/ day","color":"happiness"},"3":{"partName":"Walls","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/house\/part_walls.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"day(s)","color":"durability"}},"4":{"2":{"partName":"Walls","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/hospital\/part_walls.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"","color":"durability"},"1":{"partName":"Roof","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/hospital\/part_roof.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_wellness.png","resultType":"intNr","resultDay":"\/ use","color":"wellness"},"3":{"partName":"Ambulances","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/hospital\/part_ambulances.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_areaofeffect.png","resultType":"intNr","resultDay":"tile(s)","color":"area_of_effect"}},"5":{"1":{"partName":"Layout","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/defensesystem\/part_layout.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_defense.png","resultType":"intNr","resultDay":"","color":"defense"},"2":{"partName":"Walls","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/defensesystem\/part_walls.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"use(s)","color":"durability"},"3":{"partName":"Cannons","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/defensesystem\/part_cannons.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_areaofeffect.png","resultType":"intNr","resultDay":"tile(s)","color":"area_of_effect"}},"6":{"4":{"partName":"Ammunition","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/rifle\/part_ammunition.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_damage.png","resultType":"intNr","resultDay":"","color":"damage"},"1":{"partName":"Rifle Barrel","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/rifle\/part_riflebarrel.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_attack.png","resultType":"intNr","resultDay":"","color":"attack"},"2":{"partName":"Frame","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/rifle\/part_frame.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_defense.png","resultType":"intNr","resultDay":"","color":"defense"},"3":{"partName":"Rifle Butt","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/rifle\/part_riflebutt.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"use(s)","color":"durability"}},"7":{"4":{"partName":"Ammunition","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/tank\/part_ammunition.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_damage.png","resultType":"intNr","resultDay":"","color":"damage"},"1":{"partName":"Tank Barrel","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/tank\/part_tankbarrel.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_attack.png","resultType":"intNr","resultDay":"","color":"attack"},"2":{"partName":"Body","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/tank\/part_body.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_defense.png","resultType":"intNr","resultDay":"","color":"defense"},"3":{"partName":"Engine","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/tank\/part_engine.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"use(s)","color":"durability"}},"8":{"4":{"partName":"Ammunition","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/artillery\/part_ammunition.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_damage.png","resultType":"intNr","resultDay":"","color":"damage"},"1":{"partName":"Gun Barrel","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/artillery\/part_gunbarrel.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_attack.png","resultType":"intNr","resultDay":"","color":"attack"},"2":{"partName":"Body","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/artillery\/part_body.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_defense.png","resultType":"intNr","resultDay":"","color":"defense"},"3":{"partName":"Engine","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/artillery\/part_engine.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"use(s)","color":"durability"}},"9":{"4":{"partName":"Ammunition","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/airunit\/part_ammunition.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_damage.png","resultType":"intNr","resultDay":"","color":"damage"},"1":{"partName":"Missiles","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/airunit\/part_missiles.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_attack.png","resultType":"intNr","resultDay":"","color":"attack"},"2":{"partName":"Body","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/airunit\/part_body.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_defense.png","resultType":"intNr","resultDay":"","color":"defense"},"3":{"partName":"Engine","partImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/airunit\/part_engine.png","influenceImg":"http:\/\/www.erepublik.com\/images\/icons\/industry\/attribute_durability.png","resultType":"intNr","resultDay":"use(s)","color":"durability"}},"10":[],"11":[],"12":[],"13":[],"14":[]};

		var attributes = industryJSON[cdata.industry]['attributes'];            
		$.each(attributes, function(idx, n){
			sliderName = 'slider_'+idx;
			$('<tr><td><img id="partImg_'+idx+'"/></td><td><div id="part_'+idx+'"/></td><td><div id="slider_holder_'+idx+'"/></td><td><div id="slider_result_'+idx+'" style="width: 50px;"/></td><td><span>'+n.name+': </span></td><td><span id="slider_influence_'+idx+'"/></td></tr>').appendTo('#slidertable');

			slider = $('<div/>').appendTo('#slider_holder_' + idx); 
			slider     = $('<div id="'+sliderName + '" class="slider-range-min"/>').appendTo(slider);
			$(slider).addClass('enabled');
			$(slider).addClass('sliders');
			$(slider).slider({                  
				range: "min",                  
				value: GMset.get("slider_" + compid + "_" + idx, 0),        
				min: 0,               
				max: 100,             
				step: n.division,           
				modifier: n.modifier,     
				attrId: idx,              
				slide: function(event, ui){
				GMset.set("slider_" + compid + "_" + idx, ui.value);
				UpdateSliderResult(idx, ui.value, cdata.customizations[attributesJSON[cdata.industry][idx].color], $(this).slider('option', 'modifier'));
			}           
			});            
			$(slider).parent().attr('class', 'bg_fix ' + attributesJSON[cdata.industry][idx].color);
			$('#partImg_'+idx).attr('src', attributesJSON[cdata.industry][idx].partImg);
			$('#part_'+idx).html(attributesJSON[cdata.industry][idx].partName);
			UpdateSliderResult(idx, GMset.get("slider_" + compid + "_" + idx, 0), cdata.customizations[attributesJSON[cdata.industry][idx].color], n.modifier);
			//nr++;
		});
		$('#slidertable td').css({'padding-left': '5px'});
	}

	// login switcher advertisement
	if(!unsafeWindow.loginswitcher) {
		set.append('<div style="margin:2px;"><a href="http://userscripts.org/scripts/show/75881" target="_blank">Get Login Switcher to easily switch between Citizen/Org Accounts!</a></div>');
	}

	// Version
	$('#ech_settings').append('<div style="float: right; margin-top: 10px;"><a href="http://userscripts.org/scripts/show/76219" target="_blank">V '+version+'</a></div>');

}

function UpdateSliderResult(idx, value, custValue, modifier) {
	var affect = value*modifier;
	affect = (Math.ceil(Math.floor(affect*100)))/100;
	$('#slider_result_' + idx).html(value + ' (' + custValue + ")");
	$('#slider_influence_'+idx).html(affect);
}

function VersionCheck() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/76219',
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml'
	},
	onload: function(responseDetails) {
		var newv = $(responseDetails.responseText).find('#summary').html().split("<b>Version:</b>")[1].trim().split('\n')[0];
		if(newv != version) {
			GM_setValue("newv","1");
			$('#market_offers h2').append(' - <a href="https://userscripts.org/scripts/source/76219.user.js">Update available! (V' + newv + ')</a>');
		}
		else {
			GM_setValue("newv","0");
		}
	}
	});
}


function Main() {
	// run only once!
	if (document.hasrun != undefined)
		return;
	document.hasrun = true;

	GetCompanyData();

	var companyid = $('#companyId').val();

	var cdata = deserialize(cdataname, undefined);

	if (cdata == undefined || cdata[companyid] == undefined) {
		ReportWarn('Thanks for using eRepublic Company Helper! The script is just initializing itself, please wait...');
		return;
	}

	var date = $(".eday strong").html().replace(',','');

	//document.companycountry = $("#profileholder a[href*='/country']").attr("href").split('/')[3];

	document.language = window.location.href.split('/')[3];


	AppendMarketLinks();

	if (cdata[companyid] != undefined && !cdata[companyid].israw) {
		var h2node = $(".raw_materials h2");
		h2node.append(" - ");
		h2node.append('<span id="rawlink"/>');
		$('<span id="refreshraw" class="">Refresh Data <img id="refreshrawimg" style="display: inline;" src="'+loadinggif+'"></span><div id="errorraw" class="tooltip2" style="display: none;"><img src="'+errorgif+'"/><span style="z-index:999; width: 250px;">Error while getting raw materials feed!<br/><a href="http://api.erepublik.com/" target="_blank">Erepublik API feeds</a> might be down.</span></div>').appendTo($('#rawlink'));
		$('#refreshraw').click(function(ev) {
			if ($(ev.target).attr("class") == "fakelink") {
				$(ev.target).attr("class","");
				$('#refreshrawimg').css({"display":"inline"});
				GetResourceFeeds();
			}
		});
	}

	//document.industry = $('.qllevel').parent().next().attr("src").split('/')[3].split('.')[0].replace("icon_industry_","").replace("_","-");
	//if (document.industry == 'movingtickets')
	//	document.industry = 'moving-tickets';

//	document.countries = []
//	$('.manage').find('.icon').each(function() {
//	// document.countries.push($(this).attr("title").replace(' ', '-'));
//	var c = $(this).attr("src").split('/')[4].split('.')[0]; // .replace('
//	// ', '-');
//	document.countries.push(c);
//	});

	//var cdata = deserialize("cdata",{});
	//if (cdata[document.companyid] == undefined)
	//	cdata[document.companyid] = {};
	//cdata[document.companyid].countries = document.countries;
	//serialize("cdata",cdata);


	GetMarketDatas();

	GetResourceFeeds();

	if (GM_getValue("ep_date","0") != date) {
		$("#refreshex").attr("class","");
		LoadExchange();
		if (GM_getValue("newv","0") == "0")
			VersionCheck();
		GM_setValue("ep_date",date);
	}
	if (GM_getValue("newv","0") == "1")
		VersionCheck();

	CreateMarketLinksOnFlags();

	FixMaxLength();

	/*var func = unsafeWindow.licenses.changeState;
	unsafeWindow.licenses.changeState = function(a,b,c) {
		window.setTimeout(EnhanceMarket,10);
		func.apply(unsafeWindow.licenses, arguments); 
	};*/
	BindButtonEvents();
}

function FixMaxLength() {
	if (GM_getValue('echs_enable_maxlength',false)) {
		$('#market_offers').find('input').each(function() {
			if ($(this).attr('maxlength') != undefined)
				$(this).attr('maxlength', '7');
		});
	}

}

function CreateMarketLinksOnFlags() {
	setTimeout(function() {
		if (document.div == undefined) document.div = {};

		var cdata = deserialize(cdataname, [])[$('#companyId').val()];

		$('#marketOffers tr[id*=\'rowId_\']').each(function(index) {
			if (document.div[index] == undefined) {
				$(this).find('.mo_market img, .no_market img').css({"margin-top": "15px", "margin-bottom": "0px"});
				document.div[index] = $(this).find('.mo_market, .no_market').html();
			}
			// http://economy.erepublik.com/en/market/12/9/0/0/0/0
			$(this).find('.mo_market, .no_market').replaceWith('<td class="mo_market" style="text-align: center;"><a href="http://economy.erepublik.com/'+document.language+'/market/'+cdata.exportcountries[index].id + '/' + cdata.industry + '/0/0/0/0">' + document.div[index] + '</a></td>');
		});
	}, 100);
}

function BindButtonEvents() {
	$('#marketOffers tr[id*=\'rowId_\']').find('.edit, .new, .save, .cancel, .delete').live('mousedown', function() {
		setTimeout(EnhanceMarket,100);
	});
}

function EnhanceMarket() {
	ReportDebug("Enhance market start");
	CreateMarketLinksOnFlags();
	$('.enhmarket').remove();
	$('#marketOffers tr[id*=\'rowId_\']').each(function(index) {
		try {
			var embargo = $(this).attr('class').indexOf("embargo") >= 0;
			var date = $(".eday strong").html().replace(',','');
			var compid = $('#companyId').val();
			var cdata = deserialize(cdataname, [])[compid];
			var c = cdata.exportcountries[index].id;
			var row = unsafeWindow.licenses.rows[index];
			//var c = $(this).attr("src").split('/')[4].split('.')[0]; // .replace('
			// ',
			// '-');
			ReportDebug("Enhancing market " + index);
			document.debugc = 0;
			var tax = row.taxes;
			var data = deserialize(dataname,{});
			var goldhist = deserialize("goldhist",{});
			document.debugc = "0-1";
			var data = data[c];
			document.debugc = "0-2";
			if (data == undefined || data.ex == undefined || data.rs == undefined || data.rs.length == 0 || cdata == undefined){
				document.debugc = "0-3";
				var tmp = "";
				if (data == undefined)
					tmp = "data";
				if (data.ex == undefined) {
					tmp = "ex";
					// If exchange data is not present load it
					if ($('#refreshex').attr("class") == "fakelink") {
						document.debugc = "0-7";
						$('#refreshex').attr("class","");
						$('#refresheximg').css({"display":""});
						LoadExchange();
					}
				}
				if (data.rs == undefined)
					tmp = "rs1";
				if (data.rs.length == 0)
					tmp = "rs2";
				if (cdata == undefined)
					tmp = "cdata";
				document.debugc = "0-4";
				ReportDebug("Problem with Data: " + tmp);
				return false;
			}
			document.debugc = 1;
			// calculate chepest prices for display
			// old
			//var pr = Math.floor(data.rs[0].price*100) / 100;
			//var price2 = Math.ceil(pr / (1+tax) * 100) / 100;
			// new
			var price2 = Math.floor(data.rs[0].price*100) / 100;
			var pr = Math.round((price2 + price2*tax) * 100) / 100;
			var data_ = deserialize(dataname,{});
			data_[c].price = price2;
			serialize(dataname,data_);
			var factor = 1000;
			if (cdata.israw)	
				factor = 100000;
			var gold = Math.round((price2 * data.ex) * factor) / factor;
			document.debugc = 2;

			if (!embargo) {
				document.debugc = 3;
				if (goldhist[compid] == undefined)
					goldhist[compid] = {};
				if (goldhist[compid][c] == undefined)
					goldhist[compid][c] = {};
				if (goldhist[compid][c][date] == undefined)
					goldhist[compid][c][date] = {};
				goldhist[compid][c][date][$('#live_time').html().split(':')[0]] = gold;
			}
			document.debugc = 4;
			for (var sd = 850; sd <= parseInt(date - 12); sd++)
			{
				document.debugc = 5;
				if (goldhist[compid] != undefined && goldhist[compid][c] != undefined && goldhist[compid][c][sd] != undefined)
					delete goldhist[compid][c][sd];
			}
			document.debugc = 6;
			serialize("goldhist",goldhist);
			var div = $('<div class="enhmarket" style="text-align: left; position: relative; left: -140px; top: '+(26+40*index)+'px; height: 0px; width: 120px;"/>').prependTo($('#marketlicense').parent());

			if (!embargo)
				div.append('<div style="position: relative; left: 145px; height: 0px; top:1px; text-align: center; width: 60px;">tax: ' + Math.round(tax*100) + '%</div>');
			var pcs1 = data.rs[0].pieces;
			var items = parseInt($('#stock').html().split('<')[0]);
			document.debugc = 7;
			/*$.each(unsafeWindow.licenses.rows, function(i_, rowval) {
				items += rowval.amount;
			});*/
			document.debugc = 8;
			if (items < parseInt(pcs1))
				pcs1 = '<font color="red">' + pcs1 + '</font>';
			var gld = '';
			if (!embargo)
				gld = '<div style="display: inline;"> &nbsp;' + gold + ' '+goldimg+'</div>';

			div.append('<div class="tooltip2">' + pcs1 + " @ " + pr + '<span style="z-index:999;"></span></div>');
			document.debugc = 9;
			if (data.rs != undefined) {
				ReportDebug("Have data, creating popup");
				document.debugc = 10;
				var span = div.find('span');
				$('<table class="echmet" style="width: 130px;"><tbody /></table>').appendTo(span);
				var tbody = span.find("tbody");
				// tt = "<table style='width: 130px;'><tbody>";
				document.debugc = 11;
				for (var h = 0; h < data.rs.length; h++) {
					document.debugc = 12;
					var tradd = "";
					if (parseInt(compid) == data.rs[h].cid)
						tradd = ' class="highlight"';
					// old 
					//var p1 = Math.floor(data.rs[h].price * 100) / 100;
					//var p2 = Math.round(data.rs[h].price / (1+tax) * 100) / 100;
					// new
					var p2 = Math.floor(data.rs[h].price*100) / 100;
					var p1 = Math.round((p2 + p2*tax) * 100) / 100;
					var pcs = data.rs[h].pieces;
					if (items < data.rs[h].pieces && !embargo)
						pcs = '<font color="red">' + pcs + '</font>';
					document.debugc = 13;
					$("<tr"+tradd+" licid=\""+index+"\"><td>" + pcs + "</td><td>@</td><td>" + p1 + "</td>" + ((!embargo) ? "<td><font color=\"green\">" + p2 + "</font></td>" : "") + "</tr>").appendTo(tbody).click(function(ev) {
						try {
							document.debugc = 14;
							if (embargo)
								return;
							var parent = $(ev.target).parent();
							if (parent.children('td:eq(0)').length == 0)
								parent = $(ev.target).parent().parent();
							var licid = parseInt(parent.attr('licid'));
							document.debugc = 15;
							unsafeWindow.$j('#rowId_' + licid).find('.new, .edit').click();
							var pnt = $('#rowId_' + licid);
							document.debugc = 16;
							var avl = items;
							document.debugc = 17;
							var amt = parent.find('td:eq(0)').html();
							if (parent.find('td:eq(0) font').length > 0)
								amt = parent.find('td:eq(0) font').html();
							document.debugc = 18;
							if (parseInt(amt) > avl)
								amt = avl;
							var price = parent.find('td:eq(3) font').html();
							pnt.find('.mo_quantity input').val(amt);
							pnt.find('.mo_price input').val(price);
							//EnhanceMarket();
						}
						catch (e) 
						{
							ReportError(e);
						}
					});
					document.debugc = 21;
				}
				document.debugc = 22;
				if (!embargo) {
					ReportDebug("Have tax, creating graph");
					document.debugc = 23;
					var pos = '';
					if ($(this).find('.edit').length > 0) {
						pos = " <span>("+data.pos+")</span>";
					}
					document.debugc = 24;
					div.append('<div><font color="green">' + price2 + '</font>'+pos+gld+'</div>');
					var gh = [];
					var ghtime = {};
					var counter = 0;
					document.debugc = 25;
					var havevalues = false;
					for (var b = date - 4; b <= date; b++) {
						document.debugc = 26;
						var max = 23;
						if (date == b) {
							max = parseFloat($('#live_time').html().split(':')[0]);
						}
						document.debugc = 27;
						for (var y = 0; y <= max; y++) {
							document.debugc = 28;
							if (y < 10)
								y = '0' + y;
							var val = null;
							document.debugc = 29;
							if (goldhist[compid][c][b] != undefined && goldhist[compid][c][b][y] != undefined && goldhist[compid][c][b][y] != 0)
								val = goldhist[compid][c][b][y];
							if (isNaN(val))
								val = null;
							gh.push(val);
							document.debugc = 30;
							if (gh[gh.length-1] == null && gh[gh.length-2] != null && gh[gh.length-3] == null)
								gh[gh.length-2] = null;
							ghtime[counter] = "day " + b  + ", " + y + "h: ";
							counter++;
							document.debugc = 31;
						}
						document.debugc = 32;
					}
					for (v in gh) {
						if (v != null)
							havevalues = true;
					}
					document.debugc = 33;
					if (havevalues) {
						var wid = 240 - ((23 - parseFloat($('#live_time').html().split(':')[0])) * 2);
						var ghtt_ = $('<div class="ghtt"/>');
						ghtt_.appendTo(div);
						document.debugc = 34;

						var ghtt = $('<div/>').appendTo(ghtt_);
						document.debugc = 35;
						try {
							document.debugc = "35-10";
							ghtt.sparklineEvents(gh, {barWidth:wid , onMouseOverCallback: function(e,v) {
								document.debugc = "35-20";
								try {
									if (!isNaN(v) && v != null)
										if (gtt.update)
											gtt.update(ghtime[e] + v);
										else
											if (gtt.update)
												gtt.update('');
								}
								catch(e) {
									ReportError(e);
									gtt.update('');
								}
							}});
						}
						catch (e) {
							ReportDebug(gh.join(','));
							ReportError(e);
							ghtt.sparkline(gh,{barWidth:wid,type : 'line',			lineColor : '#00f',			defaultPixelsPerValue : 2,			width : 'auto',			height : 'auto',			composite : false});
						}
						document.debugc = "35-30";
						ghtt.css({'margin-left': '-'+(wid+5)+'px', "margin-top": "-17px"});
						document.debugc = 36;
						ghtt_.simpletip(' ');
						var gtt = ghtt_.eq(0).simpletip();
						ghtt.mouseleave(function() {
							gtt.hide();
						});
						if (gtt.update)
							gtt.update('');
						document.debugc = 37;

						ghtt_.find('.tooltip.fixed').css({'margin-left': '-'+(wid+5)+'px', 'margin-top': '-34px', 'width': wid+'px', 'text-align':'right'});
						ghtt_.find("canvas").css({'border': '0.5px solid rgb(221, 221, 221'});
						document.debugc = 38;

						var but = $(this).parent().parent().parent().find("[class*=td_no_products_] input");
						but.attr("pdef",price2);
						but.click(function(ev) {
							var pele = $(ev.target).parent().parent().parent().parent().find("input[id*=price_]");
							if (pele.val() == "0")
								pele.attr("value",but.attr("pdef"));
						});
					}
					document.debugc = 39;
				}
				document.debugc = 40;
			}
			document.debugc = 41;
		}
		catch (e) 
		{
			ReportError(e);
		}
	});
}


function ReportDebug(str) {
	GM_log(str);
	if (window.location.href.indexOf("debug=1") == -1)
		return;
	if ($('#erepchdebug').length == 0) {
		$('body').append('<div id="erepchdebug" style="z-index: 999999; padding: 10px; margin: 1px; border-spacing: 1px; position: fixed; left: 10px; bottom: 6px; width: 200px; height: 300px; overflow: auto; text-align: left; border: 5px solid rgb(0, 100, 0);"></div>');
		$("#erepchdebug").append("Debug Output:<p>");
	}
	$("#erepchdebug").append(str + "<br>");

}

function ReportWarn(str) {
	if ($('#erepchwarn').length == 0) {
		$('body').append('<div id="erepchwarn" style="z-index: 999999; padding: 10px; margin: 1px; border-spacing: 1px; position: fixed; left: 10px; top: 10px; width: 200px; height: 100px; overflow: auto; text-align: left; border: 5px solid rgb(255, 170, 0);"></div>');
		// $("#erepchdebug").append("Debug Output:<p>");
	}
	$("#erepchwarn").append(str + "<br>");
	$("#erepchwarn").scrollTop = $("#erepchwarn").scrollHeight;

}

function ReportError(e) {
	if ($('#erepcherror').length == 0) {
		$('body').append('<div id="erepcherror" style="z-index: 999999; padding: 10px; margin: 1px; border-spacing: 1px; position: fixed; right: 10px; bottom: 6px; width: 200px; height: 300px; overflow: auto; text-align: left; border: 5px solid rgb(255, 0, 0);"></div>');
		$("#erepcherror").append("Error in eRepublik Company Helper! <a style=\"color: rgb(255, 0, 0); text-decoration: underline;\" href=\"http://userscripts.org/topics/55538\" target=\"_blank\">Please report</a> the following:<p>");
	}
	var tmp = document.lastError;
	document.lastError = e;
	if (tmp.toString() != e.toString()) {
		$("#erepcherror").append(document.debugc  + ": " + e.toString() + "<br>");
	}
	document.debugc = -1;
}

function EnhanceEmployees() {
	var compid = $('#companyId').val();
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + compid,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml'
	},
	onload: function(responseDetails) {
		EnhanceEmployees_($(responseDetails.responseText).find('employee').length);
	}
	});
}

function EnhanceEmployees_(employees){
	ReportDebug("Enhancing employee page...");
	try {
		document.debugc = "e1";
		var companyid = $('#companyId').val();
		var country = $("#profileholder a[href*='/country']").attr("href").split('/')[3];
		var cdata = deserialize(cdataname,{});
		document.debugc = "e2";
		GetCompanyData();
		if (cdata[companyid] == undefined) {
			document.debugc = "e3";
			return;
		}
		document.debugc = "e4";
		var cd = cdata[companyid];
		// var employees = $('.employees_details tr').length - 1;
		// num employee multiplier
		var recommended = cd.recommendedemployees;
		document.debugc = "e5";
		if(employees <= recommended)     
		{           
			employees = 1 + (employees/recommended);    
		} else if(employees > recommended) {     
			employees = 3 - (employees/recommended);    
		}           
		if(employees < 1) { employees = 1; }
		document.debugc = "e5";

		var day = (parseInt($('.eday strong').html()) + 1) % 7;
		if (day == -1)
			day = 6;
		document.debugc = "e6";

		var ws = 0;
		var nws = 0;
		var wp = 0;
		var nwp = 0;

		var cur = $('.ecur:eq(0)').html();

		document.debugc = "e7";
		ReportDebug("Industry: " +  cd.industry + "; Employees: " + ($('.employees_details tr').length - 1) + "; Recommended: " + recommended + "; Raw: " + (rawmatdict[cd.industry] == undefined));
		$('.employees_details tr').each(function(eindex,vvv) {
			// ReportDebug("Parsing employee " + eindex);
			document.debugc = "e8";
			if ($(this).find('.e_skill strong').length == 0)
			{
				// ReportDebug("Skill not found " + eindex);
				return;
			}
			document.debugc = "e9";
			var skill = parseFloat($(this).find('.e_skill strong').html());
			var wellness = parseFloat($(this).find('.e_wellness strong').html());
			var region = cd.resourcemod;
			var quality = cd.quality;

			if (isNaN(skill))
				ReportError("Skill is NaN!");
			if (isNaN(wellness))
				ReportError("Wellness is NaN!");
			if (isNaN(region))
				ReportError("RegionMod is NaN!");
			if (isNaN(quality))
				ReportError("Quality is NaN!");


			document.debugc = "e10";
			if(skill == 0) { skill = 0.1; }           
			if(rawmatdict[cd.industry] == undefined) {
				// ReportDebug("PROD " + skill + " - " + employees + " - " +
				// wellness + " - " + region + " - " + quality);
				var prod =     1/4 * skill * employees * (1 + 2 * wellness/100) * region * 1.5 * ((11-quality) / 10);  
			} else {          
				var prod =     1/2 * skill * employees * (1 + 2 * wellness/100) * 1.5 * (1/quality);   
			} 
			document.debugc = "e11";

			var salary = parseFloat($(this).find('.e_salary input').val());

			if (isNaN(salary))
				ReportError("Salary is NaN!");
			if (isNaN(prod))
				ReportError("Prod is NaN!");

			var workedProd = parseFloat($(this).find('.e_productivity li:eq('+day+') p').html());
			document.debugc = "e12";
			if (isNaN(workedProd))
			{
				document.debugc = "e13";
				$(this).attr("prod",prod);
				nwp += prod;
				nws += salary;
			}
			else {
				document.debugc = "e14";
				$(this).attr("prod",workedProd);
				wp += workedProd;
				ws += salary;
			}
			document.debugc = "e15";
		});
		// ReportDebug("Prod: " + wp + " " + nwp + "; Salary: " + ws + " " + nws
		// + ";");

		document.debugc = "e16";
		ws = Math.round(ws*100)/100;
		nws = Math.round(nws*100)/100;
		document.debugc = "e17";

		var data = deserialize(dataname,{});
		wp = Math.round(wp);
		nwp = Math.round(nwp);
		document.debugc = "e18";

		$('.ctools').append('<div id="echet" style="position: relative; top: 10px;"/>');
		$('#echet').append('<span><table class="echtable"><colgroup><col width="80"><col width="40"><col width="30"></colgroup><tr><td colspan=2 align="center">Salary:</td><td></td></tr><tr><td>Worked:</td><td>'+ws+'</td><td>'+cur+'</td></tr><tr><td>Not worked:</td><td>'+nws+'</td>'+cur+'</tr><tr><td>Total:</td><td>'+(Math.round((ws+nws) * 100) / 100)+'</td><td>'+cur+'</td></tr></table></span>');
		document.debugc = "e20";
		if(rawmatdict[cd.industry] != undefined) {
			document.debugc = "e19";
			if (data[country][rawmatdict[cd.industry]] == undefined) {
				var url = $('#content').children('a').attr('href');
				ReportWarn('Can`t calculate profits - market data missing. Please visit your <a href="'+url+'">company page</a> once to get that data.');
				return;
			}
			ReportDebug("Data: " + (data[country] != undefined) + "; Industry: " + cd.industry + "; Raw: " + rawmatdict[cd.industry]); 
			var wm = Math.round((wp * data[country][rawmatdict[cd.industry]].currentPrice) * 100) / 100;
			var nwm = Math.round((nwp * data[country][rawmatdict[cd.industry]].currentPrice) * 100) / 100;
			document.debugc = "e21";
			$('#echet').append('<span style="position: absolute; top: 0px; left: 250px;"><table class="echtable"><colgroup><col width="80"><col width="35"><col width="80"></colgroup><tr><td colspan=2 align="center">Raw Materials:</td><td></td></tr><tr><td>Used:</td><td>'+wp+'</td><td>('+wm+' '+cur+')</td></tr><tr><td>Still needed:</td><td>'+nwp+'</td><td>('+nwm+' '+cur+')</td></tr><tr><td>Total:</td><td>'+(Math.round((wp+nwp) * 100 ) / 100)+'</td><td>('+(Math.round((wm+nwm) * 100 ) / 100)+' '+cur+')</td></tr></table></span>');
		}
		document.debugc = "e22";
		$('.ctools').append('<div id="echspc" style="position: relative; top: 25px;"/>');
		// $.each(cd.countries, function (i, value) {
		// var img = $('<img i="'+i+'" class="fakelink"
		// style="vertical-align: middle;" src="/images/flags/M/' +
		// value.charAt(0).toUpperCase() + value.slice(1) + '.gif" />');
		// img.appendTo('#echspc');
		// img.click(ShowProfit);
		// $('#echspc').append(' ');
		// });
		document.debugc = "e23";
	}
	catch (e) 
	{
		ReportError(e);
	}
	ShowProfit({"target": '<img i="0"/>'});
}

function ShowProfit(ev) {
	try {
		document.debugc = "p1";
		var index = parseInt($(ev.target).attr("i"));
		var companyid = $('#companyId').val();
		var cdata = deserialize(cdataname,{});
		document.debugc = "p2";
		if (cdata[companyid] == undefined || cdata[companyid].countries == undefined) {
			var url = $('#content').children('a').attr('href');
			ReportWarn('Can`t calculate profits - market data missing. Please visit your <a href="'+url+'">company page</a> once to get that data.');
			return;
		}
		document.debugc = "p3";
		var cd = cdata[companyid];
		var country = cd.countries[index];
		var data = deserialize(dataname,{});
		if (data[country] == undefined || isNaN(parseFloat(data[country].price))) {
			var url = $('#content').children('a').attr('href');
			ReportWarn('Can`t calculate profits - market data missing. Please visit your <a href="'+url+'">company page</a> once to get that data.');
			return;
		}
		document.debugc = "p4";
		data = data[country];
		var price = data.price;
		document.debugc = "p5";

		if(cd.industry == "house") {
			var units = 200;
		} else if(cd.industry == "hospital" || cd.industry == "defence-system") {
			var units = 2000;
		} else if(cd.industry == "weapon"){
			var units = 5;
		} else if(cd.industry == "food"){
			var units = 1;
		} else if(cd.industry == "gift"){
			var units = 2;
		} else if(cd.industry == "moving-tickets"){
			var units = 10;
		} else {
			// wrong? =(
			// var units = cd.quality;
			var units = 1;
		}
		document.debugc = "p6";
		$('.echpd').remove();
		$('#echtp').remove();
		var totalprofit = 0;
		var totalprofitgold = 0;
		document.debugc = "p7";

		$('.employees_details tr').each(function() {
			document.debugc = "p8";
			if ($(this).find('.e_salary input').length == 0)
				return;
			document.debugc = "p9";
			var prod = parseFloat($(this).attr("prod"));
			if (isNaN(prod))
				ReportError("P Prod is NaN!");
			var sell = prod/units * price;

			if (isNaN(sell))
				ReportError("P Sell is NaN!");

			var salary = parseFloat($(this).find('.e_salary input').val());
			if (isNaN(salary))
				ReportError("P Salary is NaN!");

			if (rawmatdict[cd.industry] != undefined) {
				prod = prod * data[rawmatdict[cd.industry]].currentPrice;			
				var cost = salary + prod;
			}
			else
				var cost = salary;

			ReportDebug("Prod: " + prod + "; Units: " + units + "; Price: " + price + "; Sell: " + sell + "; Cost: " + cost + ";");

			if (isNaN(cost))
				ReportError("P Cost is NaN!");

			var profit = Math.round((sell - cost) * 100) / 100;
			if (isNaN(profit))
				ReportError("P Profit is NaN!");

			var profitgold = Math.round((profit * data.ex) * 1000) / 1000;
			document.debugc = "p10";
			totalprofit += profit;
			totalprofitgold += profitgold;
			document.debugc = "p11";
			if (profit >= 0)
				var font = '<font color="green">';
			else
				var font = '<font color="red">';
			document.debugc = "p12";
			$(this).find('.e_salary').append('<div style="height: 15px; margin-top: 45px;" class="echpd">'+font+profit + ' / ' + profitgold + '</font> '+goldimg+'</div>');
			document.debugc = "p13";
		});
		document.debugc = "p14";
		if (totalprofit >= 0)
			var font = '<font color="green">';
		else
			var font = '<font color="red">';
		document.debugc = "p15";

		totalprofit = Math.round(totalprofit * 100) / 100;
		totalprofitgold = Math.round(totalprofitgold * 100) / 100;
		document.debugc = "p16";

		$('#echspc').append('<span id="echtp">Total profit: ' + font + totalprofit + " / " + totalprofitgold + '</font> '+goldimg+'</span>');
		if (!unsafeWindow.workerwellness) {
			$('#echspc').append('<div><a href="http://userscripts.org/scripts/show/75371" target="_blank">Get my "Worker Wellness History" script to easily see if your workers look after their wellness!</a></div>');
		}
		document.debugc = "p17";
	}
	catch (e) 
	{
		ReportError(e);
	}
}

function FinishedFirstRun() {
	ReportWarn("Finished!");
	ReportDebug("Finished getting Company data!");
	var compid =$('#companyId').val();
	var cdata = deserialize(cdataname,{});
	cdata[compid].ok = true;
	serialize(cdataname,cdata);
	document.hasrun = undefined;
	Main();
}

function ParseCountry(index) {
	return function(retdata,status) {
		var addon = ".";
		if (!isNaN(document.firstrun))
			addon = ", " + (document.firstrun - 1) + " to go.";
		ReportDebug("Parsed Country" + addon);
		var compid =$('#companyId').val();
		var cdata = deserialize(cdataname,{});
		cdata[compid].exportcountries[index].currency = retdata.currency;
		serialize(cdataname,cdata);
		document.firstrun--;
		if (!isNaN(document.firstrun)) {
			ReportWarn((document.totalrun - document.firstrun) + "/" + document.totalrun);
		}
		if (document.firstrun == 0)
			FinishedFirstRun();
	};
}

function GetCompanyData() {
	var compid =$('#companyId').val();
	var date = $(".eday strong").html().replace(',','');
	var cdata = deserialize(cdataname,undefined);
	var firstRun = cdata == undefined;
	ReportDebug("firstRun1: " + firstRun);
	if (!firstRun)
		firstRun = cdata[compid] == undefined;
	ReportDebug("firstRun2: " + firstRun);
	if (firstRun || window.location.href.indexOf("reset=1")>0 || cdata[compid].lastupdate != date || cdata[compid].ok != true) {
		if (firstRun)
			document.firstrun = 0;
		cdata[compid] = {};
		$.getJSON('http://api.erepublik.com/v2/feeds/companies/'+compid+'.json', function(data) {
			ReportDebug("Getting Company Details...");
			cdata[compid].lastupdate = date;
			var regionid = data.region.id;
			var industry = data.industry.id;
			var industryname = data.industry.name;
			cdata[compid].industry = industry;
			cdata[compid].industryname = industryname;
			cdata[compid].country = data.country.id;
			cdata[compid].customizations = {};

			// Get company customization values
			var custcount = 0;
			for (cust in data.customization) {
				cdata[compid].customizations[cust] = data.customization[cust];
				custcount++;
			}

			ReportDebug("Industry: "+ industryname + ", customizations: " + custcount);

			// get companies export licenses and their info
			cdata[compid].exportcountries = [];
			$.each(data.export_licenses, function(index, value) {
				document.firstrun++;
				cdata[compid].exportcountries.push({"id": value.country.id, "code": value.country.code});
				setTimeout(function() {$.getJSON('http://api.erepublik.com/v2/feeds/countries/'+value.country.id+'.json', ParseCountry(index)); }, index*200);
			});
			ReportDebug("Found " + cdata[compid].exportcountries.length + " licenses.");


			// cdata[compid].quality =
			// parseInt($(responseDetails.responseText).children('quality').text());
			if (industry == 3 || industry == 4 || industry == 5) {
				// house, defence system, hospital
				cdata[compid].recommendedemployees = 20;
			}
			else {
				// all other indutries
				cdata[compid].recommendedemployees = 10;
			}
			if (industry >= 10 && industry <= 14) {
				// Is a raw company
				ReportDebug("CD: raw, getting region mod from " + 'http://api.erepublik.com/v2/feeds/regions/'+regionid+'.json');
				cdata[compid].israw = true;
				cdata[compid].resourcemod = 0.01;
				serialize(cdataname,cdata);
				document.firstrun++;
				$.getJSON('http://api.erepublik.com/v2/feeds/regions/'+regionid+'.json', function(data) {
					$.each(data.raw_materials, function(index, value) {
						if (value.name == industryname) {
							cdata[compid].resourcemod = parseFloat(value.productivity);
							ReportDebug("CD: mod: " + cdata[compid].resourcemod);
							serialize(cdataname,cdata);
						}
					});
					var addon = ".";
					if (!isNaN(document.firstrun))
						addon = ", " + (document.firstrun - 1) + " to go.";
					ReportDebug("Parsed Region" + addon);
					document.firstrun--;
					if (!isNaN(document.firstrun)) {
						ReportWarn((document.totalrun - document.firstrun) + "/" + document.totalrun);
					}
					if (document.firstrun == 0)
						FinishedFirstRun();
				});								
			}
			else {
				ReportDebug("CD: noraw");
				cdata[compid].israw = false;
				cdata[compid].resourcemod = 1;
				serialize(cdataname,cdata);
			}
			if (!isNaN(document.firstrun)) {
				document.totalrun = document.firstrun;
				ReportWarn((document.totalrun - document.firstrun) + "/" + document.totalrun);
			}
		});
	}
}

/*
 * function GetCompanyData() { var compid =$('#companyId').val(); var cdata =
 * deserialize("cdata",{}); if (cdata[compid] == undefined ||
 * window.location.href.indexOf("reset=1")>0) { cdata[compid] = {};
 * GM_xmlhttpRequest({ method: 'GET', url:
 * 'http://api.erepublik.com/v1/feeds/companies/' + compid, headers: {
 * 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 'Accept':
 * 'application/atom+xml,application/xml,text/xml', }, onload:
 * function(responseDetails) { ReportDebug("Getting Company Details..."); var
 * countryid =
 * cids[$(responseDetails.responseText).children('country').text()][0]; var
 * region = $(responseDetails.responseText).children('region').text(); var
 * industry = $(responseDetails.responseText).children('industry').text();
 * cdata[compid].industry = industry; cdata[compid].quality =
 * parseInt($(responseDetails.responseText).children('quality').text()); if
 * (industry == "house" || industry == "hospital" || industry== "defense
 * system") cdata[compid].recommendedemployees = 20; else
 * cdata[compid].recommendedemployees = 10; if (industry == "iron" || industry ==
 * "wood" || industry == "grain" || industry == "diamonds" || industry == "oil") {
 * ReportDebug("CD: raw"); cdata[compid].israw = true; cdata[compid].resourcemod =
 * 0.01; serialize("cdata",cdata); GM_xmlhttpRequest({ method: 'GET', url:
 * 'http://api.erepublik.com/v1/feeds/countries/' + countryid, headers: {
 * 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 'Accept':
 * 'application/atom+xml,application/xml,text/xml', }, onload:
 * function(responseDetails) { ReportDebug("CD: search region");
 * $(responseDetails.responseText).find('region').each(function () { if
 * ($(this).find('name').text() == region) { var rid =
 * $(this).find('id').text(); GM_xmlhttpRequest({ method: 'GET', url:
 * 'http://api.erepublik.com/v1/feeds/regions/' + rid, headers: { 'User-agent':
 * 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 'Accept':
 * 'application/atom+xml,application/xml,text/xml', }, onload:
 * function(responseDetails) { ReportDebug("CD: region found");
 * //GM_log(responseDetails.responseText);
 * $(responseDetails.responseText).find('raw-material').each(function () { if
 * ($(this).find('name').text() == industry) { cdata[compid].resourcemod =
 * parseFloat($(this).find('value').text()); ReportDebug("CD: mod: " +
 * cdata[compid].resourcemod); serialize("cdata",cdata); } });
 * 
 * 
 * 
 *  } }); } });
 * 
 * 
 * 
 *  } }); } else { cdata[compid].israw = false; cdata[compid].resourcemod = 1;
 * serialize("cdata",cdata); }
 *  } }); } }
 */
window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		if ($('.manage_company').length == 0) {
			clearInterval(checker);
			return;
		}

		if (document.location.href.indexOf("/company-employees/") > 0) {
			clearInterval(checker);
			if (GM_getValue("echs_enable_employee",true))
				EnhanceEmployees();
		}
		else if (document.location.href.indexOf("/company/") > 0 && $('#company_info_panel').length > 0) {
			// if ($('.qllevel').parent().next().attr("alt") == undefined)
			// return;
			clearInterval(checker);
			//GM_log(dumpObj(unsafeWindow.licenses.rows[0], "lic"));

			//InjectUI();

			Main();
			window.setInterval(RefreshMarketDatas,1000*60*60);
			window.setInterval(GetResourceFeeds,1000*60*60);

			unsafeWindow.$j('#content').ajaxComplete(function(e, xhr, settings) {
				if(settings.url.indexOf('/company/addMarketOffer') >= 0) { 
					window.setTimeout(EnhanceMarket,100);
					window.setTimeout(GetMarketDatas,500);
				}
			}); 

		}
		else {
			clearInterval(checker);
		}

	}
},100);}, false);

var MAX_DUMP_DEPTH = 2;

function dumpObj(obj, name, indent, depth) {
	if (depth > MAX_DUMP_DEPTH) {
		return indent + name + ": <Maximum Depth Reached>\n";
	}
	if (typeof obj == "object") {
		var child = null;
		var output = indent + name + "\n";
		indent += "\t";
		for (var item in obj)
		{
			try {
				child = obj[item];
			} catch (e) {
				child = "<Unable to Evaluate>";
			}
			if (typeof child == "object") {
				output += dumpObj(child, item, indent, depth + 1);
			} else {
				output += indent + item + ": " + child + "\n";
			}
		}
		return output;
	} else {
		return obj;
	}
}