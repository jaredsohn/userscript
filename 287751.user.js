// ==UserScript==
// @name        poe.xyz.is helper
// @namespace   http://userscripts.org/users/Neraud
// @include     http://poe.xyz.is/*
// @require     https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @version     2
// @description Helper for http://poe.xyz.is : adds price filtering and sorting
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

var debug = false;
var $ = unsafeWindow.jQuery;
var currenciesConf = {
	'chromatic' : {		'name' : 'Chromatic', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_chromatic_displayed', 	'settingNameComputed' : 'conversion_chromatic_computed', 	'defaultRate': 1/20 },
	'alteration' : {	'name' : 'Alteration', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_alteration_displayed', 	'settingNameComputed' : 'conversion_alteration_computed', 	'defaultRate': 1/20 },
	'jewellers' : {		'name' : 'Jewellers', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_jewellers_displayed', 	'settingNameComputed' : 'conversion_jewellers_computed', 	'defaultRate': 1/6 },
	'chance' : {		'name' : 'Chance', 		'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_chance_displayed', 		'settingNameComputed' : 'conversion_chance_computed', 		'defaultRate': 1/7.7 },
	'chisel' : {		'name' : 'Chisel', 		'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_chisel_displayed', 		'settingNameComputed' : 'conversion_chisel_computed', 		'defaultRate': 1/3.8 },
	'fusing' : {		'name' : 'Fusing', 		'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_fusing_displayed', 		'settingNameComputed' : 'conversion_fusing_computed', 		'defaultRate': 1/2 },
	'alchemy' : {		'name' : 'Alchemy', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_alchemy_displayed', 		'settingNameComputed' : 'conversion_alchemy_computed', 		'defaultRate': 1/2 },
	'scouring' : {		'name' : 'Scouring', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_scouring_displayed', 		'settingNameComputed' : 'conversion_scouring_computed', 	'defaultRate': 1/2 },
	'blessed' : {		'name' : 'Blessed', 	'compareToRef' : -1, 'settingNameDisplayed' : 'conversion_blessed_displayed', 		'settingNameComputed' : 'conversion_blessed_computed', 		'defaultRate': 1/1.5},
	'chaos' : {			'name' : 'Chaos', 		'compareToRef' :  0, 'settingNameDisplayed' : 'conversion_chaos_displayed', 		'settingNameComputed' : 'conversion_chaos_computed', 		'defaultRate': 1 },
	'regret' : {		'name' : 'Regret', 		'compareToRef' :  1, 'settingNameDisplayed' : 'conversion_regret_displayed', 		'settingNameComputed' : 'conversion_regret_computed', 		'defaultRate': 1 },
	'regal' : {			'name' : 'Regal', 		'compareToRef' :  1, 'settingNameDisplayed' : 'conversion_regal_displayed', 		'settingNameComputed' : 'conversion_regal_computed', 		'defaultRate': 1.6 },
	'gcp' : {			'name' : 'Gcp', 		'compareToRef' :  1, 'settingNameDisplayed' : 'conversion_gcp_displayed', 			'settingNameComputed' : 'conversion_gcp_computed', 			'defaultRate': 2.7 },
	'divine' : {		'name' : 'Divine', 		'compareToRef' :  1, 'settingNameDisplayed' : 'conversion_divine_displayed', 		'settingNameComputed' : 'conversion_divine_computed', 		'defaultRate': 8 },
	'exalted' : {		'name' : 'Exalted', 	'compareToRef' :  1, 'settingNameDisplayed' : 'conversion_exalted_displayed', 		'settingNameComputed' : 'conversion_exalted_computed', 		'defaultRate': 24 }
};

// The baseCurrency is the one used to define the other currencies conversion rates.
var baseCurrencyKey = 'chaos';

myLog("main", "start");

function myLog(functionName, msg) {
	if(debug) {	console.log(functionName + " | " + msg); }
}

function initConfig() {
    myLog("initConfig", "start");
	
	var configInit = {
		'id': 'GM_config', 
		'title': 'Script Settings',
		'fields': {
			// General settings
			'filter_by_currencies_enabled': {
				'label': 'Enable filter by currencies',
				'labelPos': 'right', 
				'section': ['Filter settings'],
				'type': 'checkbox',
				'default': true
			},
			'filter_by_rates_enabled': {
				'label': 'Enable filter using conversion rates',
				'labelPos': 'right', 
				'type': 'checkbox',
				'default': true
			},
			'currency_conversion_enabled': {
				'label': 'Enable currency conversion',
				'labelPos': 'right', 
				'type': 'checkbox',
				'default': true
			},
			'filter_by_rates_currency': {
				'label': 'Currency used for filtering using conversion rates',
				'labelPos': 'left', 
				'type': 'select',
				'options': Object.keys(currenciesConf), // TODO : name / value ?
				'default': 'chaos'
			}
		}
	};
	
	var conversionFieldsMapping = {};
	var firstLower = true;
	var firstHigher = true;
	// Prepare conversion fields
	for(currencyKey in currenciesConf) {
		myLog("initConfig", " - field for " + currencyKey);
		var currency = currenciesConf[currencyKey]['name'];
		var defaultRate = currenciesConf[currencyKey]['defaultRate'];
		var fieldNameDisplayed = currenciesConf[currencyKey]['settingNameDisplayed'];
		var fieldNameComputed = currenciesConf[currencyKey]['settingNameComputed'];
		conversionFieldsMapping[fieldNameDisplayed] = currencyKey;
		
		var fieldDisplayed = {
			'labelPos': 'right', 
			'type': 'float',
			'size': 3,
			'save': false
		};
		var fieldComputed = {
			'type': 'hidden',
			'default': defaultRate
		};
		
		var defaultDisplayedRate;
		if(currenciesConf[currencyKey]['compareToRef'] < 0) {
			if(firstLower) {
				fieldDisplayed['section'] = [ 'Conversion rates', 'How many of these for a <span title="'+currenciesConf[baseCurrencyKey]['name']+'" class="currency currency-'+baseCurrencyKey+'" />' ];
				firstLower = false;
			}
			fieldDisplayed['label'] = '<span title="'+currency+'" class="currency currency-'+currencyKey+'" />';
			defaultDisplayedRate = 1/defaultRate;
		} else if(currenciesConf[currencyKey]['compareToRef'] == 0) {
			defaultDisplayedRate = 1;
			fieldDisplayed['type'] = 'hidden';
			fieldComputed['value'] = 1;
		} else {
			if(firstHigher) {
				fieldDisplayed['section'] = [ undefined, 'How many <span title="'+currenciesConf[baseCurrencyKey]['name']+'" class="currency currency-'+baseCurrencyKey+'"></span> for one of these' ];
				firstHigher = false;
			}
			fieldDisplayed['label'] = '<span title="'+currency+'" class="currency currency-'+currency+'" />';
			defaultDisplayedRate = defaultRate;
		}
		fieldDisplayed['default'] = Math.round(defaultDisplayedRate*100)/100;
		
		configInit['fields'][fieldNameDisplayed] = fieldDisplayed;
		configInit['fields'][fieldNameComputed] = fieldComputed;
	}

	// Styles for the conversion rates
	if(configInit['css'] == undefined) configInit['css'] = "";
	//configInit['css'] += ' #GM_config_wrapper label { display: inline } ';
	//configInit['css'] += ' #GM_config_section_1 input, #GM_config_section_2 input { display: inline ; width: 45px ; margin: 0 } ';
	configInit['css'] += ' #GM_config_section_1 .config_var, #GM_config_section_2 .config_var { display: inline ; width: 100px } ';

	configInit['css'] += '.currency{white-space:nowrap;padding-right:20px;background-position:right center;background-size:20px;background-repeat:no-repeat} ';
	configInit['css'] += '.currency-chromatic{background-image:url("/static/currency/chromatic.png")} ';
	configInit['css'] += '.currency-alteration{background-image:url("/static/currency/alteration.png")} ';
	configInit['css'] += '.currency-jewellers{background-image:url("/static/currency/jewellers.png")} ';
	configInit['css'] += '.currency-chance{background-image:url("/static/currency/chance.png")} ';
	configInit['css'] += '.currency-chisel{background-image:url("/static/currency/chisel.png")} ';
	configInit['css'] += '.currency-fusing{background-image:url("/static/currency/fusing.png")} ';
	configInit['css'] += '.currency-alchemy{background-image:url("/static/currency/alchemy.png")} ';
	configInit['css'] += '.currency-scouring{background-image:url("/static/currency/scouring.png")} ';
	configInit['css'] += '.currency-blessed{background-image:url("/static/currency/blessed.png")} ';
	configInit['css'] += '.currency-chaos{background-image:url("/static/currency/chaos.png")} ';
	configInit['css'] += '.currency-regret{background-image:url("/static/currency/regret.png")} ';
	configInit['css'] += '.currency-regal{background-image:url("/static/currency/regal.png")} ';
	configInit['css'] += '.currency-gcp{background-image:url("/static/currency/gcp.png")} ';
	configInit['css'] += '.currency-divine{background-image:url("/static/currency/divine.png")} ';
	configInit['css'] += '.currency-exalted{background-image:url("/static/currency/exalted.png")} ';
	configInit['css'] += '.currency-mirror{background-image:url("/static/currency/mirror.png")} ';
	
	
	if(configInit['events'] == undefined) configInit['events'] = {};
	
	myLog("initConfig", "Prepare onOpen function");
	configInit['events']['open'] = function(document, window, frame) {
		myLog("onOpenConfig", "start");
	
		// import CSS in config iframe
		//var origStylesheet = $('link[rel="stylesheet"]');
		//myLog("onOpenConfig", "Injecting css '" + origStylesheet.prop('href') + "' in config iFrame");
		// doesn't work with jquery $document.find ....
		//document.getElementsByTagName("head")[0].innerHTML += '<link rel="stylesheet" href="'+origStylesheet.prop('href')+'" type="text/css" />';
		
		for(currencyKey in currenciesConf) {
			var currency = currenciesConf[currencyKey]['name'];
			var fieldNameDisplayed = currenciesConf[currencyKey]['settingNameDisplayed'];
			var fieldNameComputed = currenciesConf[currencyKey]['settingNameComputed'];
			
			
			GM_config.fields[fieldNameDisplayed].node.addEventListener('change', function (event) {
				var targetId = event.target.id; //GM_config_field_conversion_fusing_displayed
				var targetFieldNameDisplayed = targetId.substring(16);
				
				var targetCurrencyKey = conversionFieldsMapping[targetFieldNameDisplayed];
				
				var targetFieldNameComputed = currenciesConf[targetCurrencyKey]['settingNameComputed'];
				var targetDisplayedValue = event.target.value;

				if(targetDisplayedValue != undefined && targetDisplayedValue != "") {
					if(currenciesConf[targetCurrencyKey]['compareToRef'] < 0) {
						var targetComputedValue = 1 / parseFloat(targetDisplayedValue);
					} else if(currenciesConf[targetCurrencyKey]['compareToRef'] == 0) {
						var targetComputedValue = 1;
					} else {
						var targetComputedValue = parseFloat(targetDisplayedValue);
					}
				} else {
					var targetComputedValue = "";
				}
				
				myLog("onChangeRate", targetId + " (" + targetDisplayedValue + ") -> " + targetFieldNameComputed + " = " + targetComputedValue);
				GM_config.fields[targetFieldNameComputed].node.value = targetComputedValue;
			});
			
			var computedValue = GM_config.get(fieldNameComputed);
			if(computedValue != undefined && computedValue != "") {
				if(currenciesConf[currencyKey]['compareToRef'] < 0) {
					var displayedValue = 1 / parseFloat(computedValue);
				} else if(currenciesConf[currencyKey]['compareToRef'] == 0) {
					var displayedValue = 1;
				} else {
					var displayedValue = parseFloat(computedValue);
				}
				displayedValue = Math.round(displayedValue*100)/100;
			} else {
				var displayedValue = "";
			}
			
			myLog("onOpenConfig", " - " + fieldNameDisplayed + " (" + fieldNameComputed + " = " + computedValue + ") -> " + displayedValue);
			
			// In a hidden field "node" is the input element
			GM_config.fields[fieldNameDisplayed].node.value = displayedValue;
		}

		myLog("onOpenConfig", "end");
	};
	
	myLog("initConfig", "Prepare onSave function");
	configInit['events']['save'] = function() {
		myLog("onSaveConfig", "start");
		
		refreshFilterInputStates();
		filterResults();

		myLog("onSaveConfig", "end");
	};
		
	GM_config.init(configInit);
	
	myLog("initConfig", "Registering menu");
	GM_registerMenuCommand('Configuration', openConfigMenu);
	
    myLog("initConfig", "end");
}

function openConfigMenu() {
	GM_config.open();
}

function addFilterValueInputs() {
    myLog("addFilterValueInputs", "start");
	
	var filterForm = document.createElement('form');
	$(filterForm).attr('id', 'filter_currency_form');
	$('#search-results-first').before(filterForm);
	
	var filterTable = document.createElement('table');
	$(filterForm).append(filterTable);
	$(filterTable).attr('style', 'width: 100%')
	
	var colNumber = Object.keys(currenciesConf).length;
	
	// Row : information disabled
	var infoRow = document.createElement("tr");
	$(infoRow).attr('id', 'filterInputsInfoRow');
	$(filterTable).append(infoRow);	
	$(infoRow).append('<td colspan="'+(colNumber-2)+'" style="padding: 0.4em 0.2em">All filters are disabled</td>');
	$(infoRow).append('<input type="button" value="Settings" id="settingsButtonTop" style="margin: 0"/>');
	$("#settingsButtonTop").click(openConfigMenu);

	
	// Row : filter by currencies
	var filterByCurrenciesInputsRow = document.createElement("tr");
	$(filterByCurrenciesInputsRow).attr('id', 'filterInputsCurrenciesRow');
	$(filterTable).append(filterByCurrenciesInputsRow);
	
	for(currencyKey in currenciesConf) {
		myLog("addFilterValueInputs", "- " + currencyKey);
		// <span title="1.5 exalted" class="currency currency-exalted">1.5×</span>
		$(filterByCurrenciesInputsRow).append('<td style="padding: 0.4em 0.2em"><input type="text" value="" id="filter_currency_' + currencyKey + '" length="2" maxlength="3" style="display: inline ; width: 35px ; margin: 0" /><span title="'+currencyKey+'" class="currency currency-'+currencyKey+'" /></td>');
	}
	
	
	// Row : filter by Rate
	var filterByRateInputsRow = document.createElement("tr");
	$(filterByRateInputsRow).attr('id', 'filterInputsRatesRow');
	$(filterTable).append(filterByRateInputsRow);
	$(filterByRateInputsRow).append('<td style="padding: 0.4em 0.2em"><input type="text" value="" id="filter_rate_amount" length="2" maxlength="3" style="display: inline ; width: 35px ; margin: 0" /></td>');
	
	var currencyOptions = "";
	for(currencyKey in currenciesConf) {
		if(currencyKey == baseCurrencyKey) var selected = 'selected';
		else var selected = '';
		currencyOptions += '<option value="'+currencyKey+'" '+selected+'>'+currenciesConf[currencyKey]['name']+'</option>';
	}
	$(filterByRateInputsRow).append('<td colspan="'+(colNumber-1)+'" style="padding: 0.4em 0.2em"><select id="filter_rate_currency" style="width: 100px ; margin: 0">'+currencyOptions+'</select></td>');

	
	
	// Row : last line with button and stats
	var filterLastRow = document.createElement("tr");
	$(filterLastRow).attr('id', 'filterInputsBottomRow');
	$(filterTable).append(filterLastRow);
	
	$(filterLastRow).append('<td colspan="2"><input type="checkbox" checked="false" id="filter_enabled" style="margin: 0">&nbsp;Enabled ?</input></td>');
	$(filterLastRow).append('<td colspan="2"><input type="button" value="Filter" id="filter_currency_button" style="margin: 0"/></td>');
	$("#filter_currency_button").click(filterResults);
	$(filterLastRow).append("<td colspan=" + (colNumber - 6) + "><span id='statsItemsShown'/> item(s) shown out of <span id='statsItemsTotal'/> found (<span id='statsItemsHidden'/> hidden)</td>");
	
	$(filterLastRow).append('<td colspan="2"><input type="button" value="Settings" id="settingsButtonBottom" style="margin: 0"/></td>');
	$("#settingsButtonBottom").click(openConfigMenu);
	
	
	// sorting breaks with the filtering (the filtered positions remain, but the items' order is modifier, so the wrong items are displayed)
	// so we have to re-filter after each sort
	$(document).on("click",".sortable", filterResults);
	
    myLog("addFilterValueInputs", "end");
}

function refreshFilterInputStates() {
    myLog("refreshFilterInputStates", "start");
	
	if(GM_config.get("filter_by_currencies_enabled") || GM_config.get("filter_by_rates_enabled")) {
		$('#filterInputsInfoRow').hide();
	} else {
		$('#filterInputsInfoRow').show();
	}
	
	if(GM_config.get("filter_by_currencies_enabled")) {
		$('#filterInputsCurrenciesRow').show();
	} else {
		$('#filterInputsCurrenciesRow').hide();
	}
	
	if(GM_config.get("filter_by_rates_enabled")) {
		$('#filterInputsRatesRow').show();
	} else {
		$('#filterInputsRatesRow').hide();
	}
	
	
	if(GM_config.get("filter_by_currencies_enabled") || GM_config.get("filter_by_rates_enabled")) {
		$('#filterInputsBottomRow').show();
	} else {
		$('#filterInputsBottomRow').hide();
	}
	
    myLog("refreshFilterInputStates", "start");
}

function extractFilterByCurrenciesCritirias() {
    myLog("extractFilterByCurrenciesCritirias", "start");
	
	var criterias = {};

	for(currencyKey in currenciesConf) {
		myLog("extractFilterByCurrenciesCritirias", "- " + currencyKey);
		var currencyInput = $("#filter_currency_" + currencyKey);
		if(currencyInput != undefined && currencyInput.val() != "") {
			criterias[currencyKey] = parseFloat(currencyInput.val());
		}			
		myLog("extractFilterByCurrenciesCritirias", "-> " + criterias[currencyKey])
	}

	
    myLog("extractFilterByCurrenciesCritirias", "end");
	return criterias;
}

function extractFilterByRateCritirias() {
    myLog("extractFilterByRateCritirias", "start");
	
	var criterias = {};
	
	var amountInput = $("#filter_rate_amount");
	var currencySelect = $("#filter_rate_currency");
	
	if(amountInput != undefined && amountInput.val() != "") {
		criterias['amount'] = parseFloat(amountInput.val());
	}
	myLog("extractFilterByRateCritirias", "amount : " + criterias['amount']);
	
	if(currencySelect != undefined && currencySelect.val() != "") {
		criterias['currency'] = currencySelect.val();
	}
	myLog("extractFilterByRateCritirias", "currency : " + criterias['currency']);
			
    myLog("extractFilterByRateCritirias", "end");
	return criterias;
}

function convertCurrency(fromAmount, fromCurrencyKey, toCurrencyKey) {
	//myLog("convertCurrency", "start");
	var toAmount = undefined;
	
	var rateToRef = undefined;
	if(currencyKey != baseCurrencyKey) {
		rateToRef = parseFloat(GM_config.get(currenciesConf[fromCurrencyKey]['settingNameComputed']));
	} else {
		rateToRef = 1;
	}

	var rateToTarget = undefined;
	if(toCurrencyKey != baseCurrencyKey) {
		rateToTarget = parseFloat(GM_config.get(currenciesConf[toCurrencyKey]['settingNameComputed']));
	} else {						
		rateToTarget = 1;
	}
	
	if(rateToRef != undefined && rateToTarget != undefined) {
		toAmount = fromAmount * rateToRef / rateToTarget;
	}
	
	myLog("convertCurrency", fromAmount + " " + fromCurrencyKey + " -> " + toAmount + " " + toCurrencyKey);
	
	//myLog("convertCurrency", "end");
	return toAmount;
}

function filterResults() {
    myLog("filterResults", "start");
	
	var filterCheckbox = $("#filter_enabled");
	var filteringEnabled = (filterCheckbox != undefined && filterCheckbox.is(':checked'));
	
    var filterByCurrenciesCriterias = extractFilterByCurrenciesCritirias();
	var filterByRateCriterias = extractFilterByRateCritirias();
	
	var statsItemsTotal = 0;
	var statsItemsShown = 0;
	var statsItemsHidden = 0;
	
	$(".search-results > tbody span.converters").each(function () {
		$(this).hide();
	});
	$(".search-results > tbody span.converter-value").each(function () {
		$(this).attr('data-value', "");
		$(this).attr('data-selector', "");
	});
	$(".search-results > tbody span.sortable-desc").each(function () {
		$(this).attr('data-value', "");
	});
	$(".search-results > tbody span.sortable-asc").each(function () {
		$(this).attr('data-value', "");
	});
	
	
    $(".search-results > tbody").each(function () {
		statsItemsTotal++;
        var completeBuyout = $(this).attr("data-buyout");
		var toShow = true;
		
		if(completeBuyout != "") {
			// ex : 1.5 exalted
			var splittedBuyout = completeBuyout.split(" ");
			var amount = parseFloat(splittedBuyout[0], 10);
			var currencyKey = splittedBuyout[1];
			
			myLog("filterResults", "- " + amount + " of " + currencyKey);
			
			if(filteringEnabled && toShow && GM_config.get("filter_by_currencies_enabled")) {
				var maxAllowed = filterByCurrenciesCriterias[currencyKey];
				if(maxAllowed == undefined) {
					myLog("filterResults", "[filter by currencies] -> displayed (no maxAllowed)");
				} else if(maxAllowed >= amount) {
					myLog("filterResults", "[filter by currencies] -> displayed ("+amount+" <= "+maxAllowed+")");
				} else {
					myLog("filterResults", "[filter by currencies] -> hidden ("+amount+" > "+maxAllowed+")");
					toShow = false;
				}
			}
			
			if(filteringEnabled && toShow && GM_config.get("filter_by_rates_enabled")) {
				var targetCurrencyKey = filterByRateCriterias['currency'];
				if(targetCurrencyKey != undefined) {
					var amoutInTarget = convertCurrency(amount, currencyKey, targetCurrencyKey);
					if(amoutInTarget == undefined) {
						myLog("filterResults", "[filter by rate] -> displayed (no rate)");
					} else {
						var maxAllowedInTarget = filterByRateCriterias['amount'];
						if(maxAllowedInTarget == undefined) {
							myLog("filterResults", "[filter by rate] -> displayed (no maxAllowed)");
						} else if(maxAllowedInTarget >= amoutInTarget) {
							myLog("filterResults", "[filter by rate] -> displayed ("+amoutInTarget+" <= "+maxAllowedInTarget+")");
						} else {
							myLog("filterResults", "[filter by rate] -> hidden ("+amoutInTarget+" > "+maxAllowedInTarget+")");
							toShow = false;
						}
					}
				}
			}
			
			if(toShow && GM_config.get("currency_conversion_enabled")) {
				var targetCurrencyKey = GM_config.get("filter_by_rates_currency");
				var amoutInTarget = convertCurrency(amount, currencyKey, targetCurrencyKey);
				
				if(amoutInTarget == undefined) {
					myLog("filterResults", "[convert by rate] -> hidden (no rate)");
				} else {
					var requirementsSpan = $(this).find("span.requirements");
					
					if($(requirementsSpan).find("span.converters").length == 0) {
						// Adding the spans
						var currencySpan = $(requirementsSpan).find("span.currency").first();
						
						$(currencySpan).before('<span class="converters converter-value"></span>');
						$(currencySpan).before('<span class="converters">&nbsp;(</span>');
						$(currencySpan).before('<span class="converters sortable sortable-asc" data-value="">Asc</span>');
						$(currencySpan).before('<span class="converters">&nbsp;/&nbsp;</span>');
						$(currencySpan).before('<span class="converters sortable sortable-desc" data-value="">Desc</span>');
						$(currencySpan).before('<span class="converters">)&nbsp;</span>');
						
						$(currencySpan).before('<span class="converters">&nbsp;(</span>');
						$(currencySpan).after('<span class="converters">)&nbsp;</span>');
					}
					
					var convertedSpan = $(requirementsSpan).find("span.converters").first();
					$(convertedSpan).attr('class', 'converters converter-value has-tip currency currency-' + targetCurrencyKey);
					$(convertedSpan).text(Math.round(amoutInTarget*100)/100+'×');
										
					$(requirementsSpan).find("span.sortable-desc").attr('data-name', "price-desc");
					$(requirementsSpan).find("span.sortable-desc").attr('data-value', amoutInTarget);
					$(requirementsSpan).find("span.sortable-asc").attr('data-name', "price-asc");
					$(requirementsSpan).find("span.sortable-asc").attr('data-value', -amoutInTarget);
					
					$(requirementsSpan).find("span.converters").each(function () {
						$(this).show();
					});
				}
			}
		} 
		
		if(toShow) {
			$(this).show();
			statsItemsShown++;
		} else {
			$(this).hide();
			statsItemsHidden++;
		}
    });
	
	$("#statsItemsTotal").html(statsItemsTotal);
	$("#statsItemsShown").html(statsItemsShown);
	$("#statsItemsHidden").html(statsItemsHidden);
	
    myLog("filterResults", "end");
}

initConfig();
addFilterValueInputs();
refreshFilterInputStates();
filterResults();

myLog("main", "end");
