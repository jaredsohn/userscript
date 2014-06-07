// ==UserScript==
// @name		Show CNY price for price.com.hk
// @namespace	hippasus
// @description	Show CNY price for price.com.hk
// @icon		https://raw.github.com/hippasus/Show-CNY-Price-in-price.com.hk/master/src/img/icon128.png
// @author		Hippasus Chu
// @include		http://www.price.com.hk/*
// @version		1.0.2
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_xmlhttpRequest
// @grant		GM_log
// @grant		unsafeWindow
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require		https://raw.github.com/josscrowcroft/accounting.js/master/accounting.min.js
// @run-at		document-end
// ==/UserScript==
$(function() {
	"use strict"

	var __version__ = '1.0.2',

		currency_base, rates, _delay = 100,
		RATE_PATTERN = /^\d+\.\d+/,

		getRates = function() {

			var STORAGE_RATES_KEY = "currency_rates",
				STORAGE_CURRENCY_TIMESTAMP_KEY = "currency_timestamp",
				STORAGE_CURRENCY_BASE_KEY = "currency_base",

				firefoxGreaseMonkeyMode = (typeof GM_getValue !== 'undefined') && GM_getValue.toString && (GM_getValue.toString().indexOf("not supported") < 0),
				loadStorage = function(key) {
					if(firefoxGreaseMonkeyMode) {
						return GM_getValue(key);
					} else {
						return localStorage[key];
					}
				},
				saveStorage = function(key, val) {
					if(firefoxGreaseMonkeyMode) {
						GM_setValue(key, val);
					} else {
						localStorage[key] = val;
					}
				},

				rates_json = loadStorage(STORAGE_RATES_KEY),
				local_timestamp = parseInt(loadStorage(STORAGE_CURRENCY_TIMESTAMP_KEY), 10),
				timestamp = (new Date()).getTime(),
				// 1 hour cache duration
				cache_duration = 1000 * 60 * 60,

				makeGetRequest = function(url, successHanlder) {
					var d = $.Deferred(),

						makeRequestXhrPromise = function(url) {
							var promise;
							if(firefoxGreaseMonkeyMode) {
								var xhrDeferred = $.Deferred();
								GM_xmlhttpRequest({
									method: "GET",
									url: url,
									onload: function(response) {
										var responseText = response.responseText,
											data = JSON.parse(responseText);
										xhrDeferred.resolveWith(null, [data]);
									},
									onerror: function(response) {
										xhrDeferred.reject();
									}
								});

								promise = xhrDeferred.promise();
							} else {
								promise = $.ajax({
									url: url,
									type: 'GET'
								});
							}

							return promise;
						},
						requestXHR = makeRequestXhrPromise(url);

					requestXHR.done(function(data) {
						try {
							successHanlder(data);
							d.resolve();
						} catch(err) {
							d.reject();
						}
					}).fail(function() {
						d.reject();
					});

					return d.promise();
				},
				cacheRates = function() {
					saveStorage(STORAGE_RATES_KEY, JSON.stringify(rates));
					saveStorage(STORAGE_CURRENCY_BASE_KEY, currency_base);
					saveStorage(STORAGE_CURRENCY_TIMESTAMP_KEY, timestamp.toString()); //Greasy monkey doesn't support long, use string instead
				},
				yahooFinanceRateExchangeProvider = function() {
					var url = 'http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json',
						d = makeGetRequest(url, function(data) {
							var resources = data["list"]["resources"],
								l = resources.length,
								i = 0;

							rates = {};
							currency_base = 'USD';
							rates[currency_base] = 1;

							for(; i < l; i += 1) {
								var resource = resources[i]["resource"],
									fields = resource["fields"],
									currency_name = fields["name"].substr(4),
									rate_to_usd = fields["price"];

								rates[currency_name] = rate_to_usd;
							};

							cacheRates();
						});

					return d;
				},
				gaeRateExchangeProvider = function() {
					var url = 'http://rate-exchange.appspot.com/currency?from=HKD&to=CNY&q=1',
						d = makeGetRequest(url, function(data) {
							rates = {
								'HKD': 1,
								'CNY': data.rate
							};
							currency_base = 'HKD';

							cacheRates();
						});

					return d;
				},
				rateExchangeProviders = [gaeRateExchangeProvider, yahooFinanceRateExchangeProvider],

				fetchRates = function() {
					var deferred = $.Deferred(),
						i = 0,
						providersCount = rateExchangeProviders.length,
						doFetchRates = function() {
							if(i >= providersCount) {
								deferred.reject();
								return;
							}

							var provider = rateExchangeProviders[i],
								providerDeferred = provider();
							providerDeferred.fail(function() {
								i += 1;
								doFetchRates();
							}).done(function() {
								deferred.resolve();
							});
						};

					doFetchRates();
					return deferred.promise();
				},

				isCacheValid = function() {
					currency_base = loadStorage(STORAGE_CURRENCY_BASE_KEY);
					if(rates_json) {
						rates = JSON.parse(rates_json);
					}

					return rates && currency_base && local_timestamp && (timestamp - local_timestamp < cache_duration);
				};

			if(isCacheValid()) {
				var d = $.Deferred(),
					promise = d.promise();

				d.resolve();

				return promise;
			}

			return fetchRates();
		},

		eleID = 'cny-' + (new Date()).getTime(),
		initHTML = function() {
			var html = '<div id="' + eleID + '" style="position: absolute; left: -10000px; padding: 5px; font-size: 12px; font-weight: bold; font-family: Tahoma, Verdana; line-height: 18px; border: 2px solid #bdbdbd; border-radius: 3px; box-shadow: #DDD 0px 0px 2px 2px; background-color: #eee; color: #F60; z-index: 100;"></div>';
			$(html).appendTo("body");
		},

		PRICE_ELEMENTS_FILTER = 'span.price, span.cheap, a.pgrid_price, a.rank_price, a.idx_rank_price',
		timerID,
		// register events
		registerEventHandler = function() {
			$("body").on('mouseover', PRICE_ELEMENTS_FILTER, function() {
				var $this = $(this),
					pos = $this.offset(),
					offset = {
						"top": -36,
						"left": -8
					},
					price = accounting.unformat($this.text()),
					converted_price = price / rates['HKD'] * rates['CNY'],
					cp_html = accounting.formatMoney(converted_price, '￥');

				pos.left += offset.left;
				pos.top += offset.top;

				if(timerID) {
					clearTimeout(timerID);
				}

				timerID = setTimeout(function() {
					$('#' + eleID).html(cp_html).css(pos).show();

					timerID = null;
				}, _delay);
			}).on('mouseout', function() {
				if(timerID) {
					clearTimeout(timerID);
					timerID = null;
				}

				$("#" + eleID).hide();
			});
		},

		init = function() {
			getRates().done(initHTML).done(registerEventHandler);
		};

	init();
});