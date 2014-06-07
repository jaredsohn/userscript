// ==UserScript==
// @name           Get my offer
// @namespace      ivicaSR_ponuda
// @description    Eve gi oplaj :P
// @include        http://www.erepublik.com/en/economy/inventory
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==

var iconOffer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGdJREFUeNqsVU1sVUUYPTNz73uPttDSFmKEWIMYSdSICRWQgEFdaPAvxGhcqGsFVwZduHDLSmOIC4wL2ZjoApsYNRpLhCghRmhDrDSlxRSrNPSH1sfre/dnZjzf3PdqdyTWe3PfvDt37pnzne9831Xee7z9xVmfWQfrPFZ7WOLdTDJ88spjSr3x2Wmf5i5M5M7h/zjqmUUjSRBVGxlqKa8kh/OrZ654OWthkwYiYSuSCLDw1uHxfz986yRuBF9MuRWgjvdaRh+TSh7+1xcXYG3SZKfhvYXhqbSF1xVUurrgnOIMKTYViAQYK6R2zRd9ZODzDFopZFxz5Knd2NBRQhyXmDQFZTRHea4xdW0Ox8+NMeySMCrAeUXFHxfYCSfLAIzibmlEIAJQshL5XJi6gf47unH05CmU1q/lduQdlxlYA0effRhOTcB4FERlJGakuJMSvWUkSyM5qNeRL80hy5cQG0OLanw/PwVf34r3X34c7w0O4ToVUvUaELdjjc4DhneMxLsAvIK5cOYEQeThvq09OLjrUXS3t9G4BNcpaks5rZphHec2b+jB9NhlhtjBdxOUK50cM8YSQ+pGkaBsFglouKHXicxNNV7avQMnh8fxw9hkWOxzi+0b23Hkmf04dvoiLvw2gf5NGzE1P4+ZvIwyM6ddxAhtICfAwjUSy0gYKsgkJrLoWRfjx9FJRExQZBu4u7cLhw/sxbEzQ/hp5Hfs7OvBW889ghuNGl794HNUDH1NbxvtQkJ9UMOSuW+C8gbNtGplUOZlVIbbe9vwwr5tOH7mF1wa/wt7tvTgzaf3o8qK/ubin/j4tRe5PobgKFuAK1+MGkEfkcaGCzYvFjJJve0l7LqnD98OX8Xc7AJ2bOnGoSf2YGBoggwsvjp/GYNjVzFbYy1Q+0AwSFJIo4MvV14sGpGqTOf0dXdi9I8ZzNXq2NRZwYH+BzAwfAWfnh3B2rhCjev48udxvH5iACqjOcXHruUWsaJvMg9VxZ1zjYzU20sGc9UaEnp+DQvl3jvvwndDVzDIXEh+sjwnEVZwnlDriEXlkegMccYG0rR3YcUW61BGPJ1BmqaoGjGXRsf6NpwbncDw1DQD4/OsjlS5UEDKS8WmfJ9F12LuisKMWob3Li+SyfmZxb9x/+ZuDF+aDBMLs7PsdAluI0NiYft927Cw2OB77CQEVoxWKRecptkaPArdQ+MqEuqXe+bItet48qEH8fzendBG1jlGwI4gFcxl1UaCXyen6W1aMDQC/loWoEYhr7jGS+Na9qULyFQLJ74+D2d8uAvAqoRU2xCVrDWafTGPJD3sO+TLTbU0u2ZvkQ2WNQ+ByEtC2xeOYR8N/cdQB4eEHuZzz+XiUyuBN5gNU7xHwFyanVP/yiLgOX3tWPrGSSPIuGOrP7pm8y96uA4zNjS30Jq9bOyKqJtytT4VyEWmDNHizSWC09u+Bba6Q2rEZilrkcVYrVZx8N2PaJasYHGrD+StdvfFJ+7Uh++ofwQYAOiQsoUzvoqZAAAAAElFTkSuQmCC';

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome) {
	chrome.extension.sendRequest({action: 'tmpDS', data: JSON.stringify(window.localStorage)}, function(response){
		chrome.extension.sendRequest({action: 'getLD'}, function(response){
			window.localStorage.clear();
			for(var x in response = JSON.parse(response)) window.localStorage[x] = response[x];
			Main();
		});
	});
	
	unsafeWindow = window;

	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function GM_deleteValue(name) {
		chrome.extension.sendRequest({action: 'delValue', 'name': name});
		window.localStorage.removeItem(name);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (value == 'false') {
			return false;
		}
		return value || defaultValue;
	}

	function GM_log(message) {
		console.log(message);
	}

	function GM_registerMenuCommand(name, funk) {
	//todo
	}

	function GM_setValue(name, value) {
		chrome.extension.sendRequest({action: 'setValue', 'name': name, 'value': value});
		window.localStorage.setItem(name, value);
	}
	
	function GM_xmlhttpRequest(data) {
		if (data.method == 'GET') {
			chrome.extension.sendRequest({'url' : data.url.toString()}, data.onload);
		}
	}
} else {
	
	window.addEventListener('load', function() {
		var checker = setInterval(function() {
			if(typeof ($ = jQuery.noConflict()) != 'undefined') {
				alert(1);
				clearInterval(checker);
				alert(1);
				Main();
			}
		}, 100);
	}, false);
}




function betterInventory() {
	if (eRAopt["inventory"] == false) {
		return;
	}
	
	
	
	var citCountry = fixString2($('#content script:last').text().split('var ')[5].replace('citizenshipCountry = ', '').replace(';', ''));
    
    // frimen - start
    setInterval(function(){	
		
		
		
		$('#sell_offers table tbody tr:gt(0)').each(function() {
			var offId = $(this).attr('id').split('_')[1];
			$('#' + $(this).attr('id') + ' [id^="gPrice_"], #' + $(this).attr('id') + ' [id^="priceCit_"], #' + $(this).attr('id') + ' [id^="basePrice_"], #' + $(this).attr('id') + ' [id^="basePriceG_"], #' + $(this).attr('id') + ' [id^="basePriceC_"], #' + $(this).attr('id') + ' [id^="totValue_"], #' + $(this).attr('id') + ' [id^="totValueG_"]').attr('id', function(index, attr){return $(this).attr('id').split('_')[0] + '_' + offId;});
			var offCountryCode = country_currency[$(this).find('.offer_flag').attr('src').split('/')[4].split('.')[0]];
			var offCountry = country_id[$(this).find('.offer_flag').attr('src').split('/')[4].split('.')[0].toLowerCase()];
			var offIndustry = $(this).find('.offer_image').attr('src').split('/')[6];
			
			if (offIndustry == "1" || offIndustry == "2" || offIndustry == "3" || offIndustry == "4" || offIndustry == "5" || offIndustry == "15") {
				var offQuality = $(this).find('.offer_image').attr('src').split('/')[7].split('_')[0].replace('q', '');
			} else {
				var offQuality = "1";
			}
			
			
			var buttPresent = $(this).find('#goto_offer');
			
			if (buttPresent.length == 0) {
				$(this).find('.delete_offer').before('<a title="Visit market" target="_blank" class="fluid_blue_dark_small" style="padding-left: 3px;" id="visit_market" href="http://economy.erepublik.com/' + document.language + '/market/' + offCountry + '/' + offIndustry + '/' + offQuality + '/citizen/0/price_asc/1">' +
													 	'<span>M</span>' +
													'</a>' +
													'<a title="Show offer on market" id="goto_offer" href="http://economy.erepublik.com/' + document.language + '/market/offer/' + offId + '">' +
														'<img style="padding-left: 10px;" src="' + iconOffer + '">' +
													'</a>');
			} else {
				$(this).find('#goto_offer').attr('href', 'http://economy.erepublik.com/' + document.language + '/market/offer/' + offId);
			}
			
			
			
			
		});
    }, 500);
    // frimen - end
}

function Main() {
    if (typeof unsafeWindow == 'undefined') {
        unsafeWindow = window;
	}
	
    var subURL = currURL.substr(BASE_URL.length);
    LOCALE = subURL.substring(0, 2) + '/';
    BASE_URL += LOCALE;
    subURL = currURL.substr(BASE_URL.length);
	
	$('#miniprofile .avatarholder .backwhite').css('background-color', 'white');
	$('#account_validation').css('display', 'none');
	$('#citizen_feed h6 em').css('color', 'black');
	
	document.language = window.location.href.split('/')[3].split('?')[0];
	
	prepareInventory();
	
	
}