// ==UserScript==
// @name           eRepublik: WAR - Active Battles
// @namespace      http://userscripts.org/scripts/show/????
// @description    Republik: Find the best offer for a commodity worldwide
// @include        http://www.erepublik.com/*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 62490; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1258756699838; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}

function addChild(parent, type, settings, sibling) {
	var child = document.createElement(type);
	for (var key in settings) {
		child[key] = settings[key];
	}
	if (sibling) parent.insertBefore(child, sibling);
	else parent.appendChild(child);
	return child;
}

function addText(parent, text) {
	return parent.appendChild(document.createTextNode(text));
}

function html2text(html) {
	var hiddenNode = document.createElement('div');
	hiddenNode.innerHTML = html;
	var text = hiddenNode.textContent;
	return text;
}

function tailRecurse(tail, re, act) {
	var ar;
	while (ar = re.exec(tail)) {
		tail = tail.substr(ar.index + ar[0].length);
		if (act(ar)) return tail;
	}
	return '';
}

function elRecurse(tail, startRe, endRe, act) {
	var startAr, endAr, body;
	while (1) {
		body = null;
		startAr = null;
		endAr = null;
		if (startRe) {
			startAr = startRe.exec(tail);
			if (!startAr) break;
			tail = tail.substr(startAr.index + startAr[0].length);
		}
		if (endRe) {
			endAr = endRe.exec(tail);
			if (!endAr) break;
			body = tail.substr(0, endAr.index);
			tail = tail.substr(endAr.index + endAr[0].length);
		}
		if (act(body, startAr, endAr)) return tail;
	}
	return '';
}

function request(url, analyze, asXML, postProcess) {
	var asynch = (typeof postProcess != 'undefined');
	var req = new XMLHttpRequest();
	function stateChange() {
		if ((req.readyState == 4) && (req.status == 200)) {
			if (asXML) {
				analyze(req.responseXML);
			} else {
				analyze(req.responseText);
			}
			postProcess();
		}
	}
	if (asynch) req.onreadystatechange = stateChange;
	req.open('GET', url, asynch);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(null);
	if (!asynch) {
		if (asXML) {
			analyze(req.responseXML);
		} else {
			analyze(req.responseText);
		}
	}
}

var infoMenuList = xpathi('//div[@id="menu"]/ul[@id="nav"]/li[@id="menu4"]/ul');
if (!infoMenuList) return;
var anchors = infoMenuList.getElementsByTagName('a');
anchors[1].href = anchors[1].href.replace(/\/country\//, '/country/military/');

if (/\/country\/military\//.test(window.location.href)) {
	var detailsButtons = xpath('//div[@id="content"]//a[@class="vroundbtnh25-core"]');
	for (var idx = 0; idx < detailsButtons.snapshotLength; idx++) {
		var detailsButton = detailsButtons.snapshotItem(idx);
		if (/\/wars\/show\//i.test(detailsButton.href)) {
			request(detailsButton.href, function (response) {
				var isActive = true;
				elRecurse(response, /id="messagealert"/, /<\/div>/, function (body) {
					if (/no active battles/i.test(body)) {
						isActive = false;
						return 1;
					}
					return 0;
				});
				if (isActive) {
					detailsButton.setAttribute('style', 'color: #0000FF');
				} else {
					detailsButton.setAttribute('style', 'color: #00FF00');
				}
			});
		}
	}
}

if (/\/change-residence/.test(window.location.href)) {
	var locations = new Object();
	var locationAnchors = xpath('//form[@class="changeresidence"]//a[@class="dotted"]');
	for (var idx = 0; idx < locationAnchors.snapshotLength; idx++) {
		var ar = /\/(country|region)\/([^/]+)/.exec(locationAnchors.snapshotItem(idx).href);
		if (ar) {
			locations[ar[1]] = ar[2];
		}
	}
	if (locations.country) {
		var countryList = document.getElementById('country_list');
		var countryOptions = countryList.getElementsByTagName('option');
		for (idx in countryOptions) {
			if (countryOptions[idx].textContent == locations.country) {
				countryList.value = countryOptions[idx].value;
				unsafeWindow.populate();
				break;
			}
		}
	}
}

addText(addChild(addChild(infoMenuList, 'li'), 'a', {
	href: 'javascript:getBestOffer()'
}), 'Best offer');

if (false) {
	function listOffers(country, countryNr, industryNr) {
		var offers = [];
		request('http://www.erepublik.com/en/market/country-' + countryNr + '-industry-' + industryNr + '-quality-0', function (res) {
			elRecurse(res, /<table[^>]* class="offers">/, /<\/table>/, function (table) {
				elRecurse(table, /<tr>/, /<\/tr>/, function (row) {
					var offer = {};
					var tail = tailRecurse(row, /title="([^"]+)"/, function (ar) {
						offer.company = html2text(ar[1]);
						return 1;
					});
					if (tail) {
						tail = tailRecurse(tail, /style="width:\s*(\d+)%;?"/, function (ar) {
							offer.level = (parseInt(ar[1]) / 20);
							return 1;
						});
					}
					if (tail) {
						elRecurse(tail, /<td width="\d+">/, /<\/td>/, function (price) {
							var ar = /<span class="special">(\d+)<\/span>\s*<sup>(\.\d+)<\/sup>\s*<span class="currency">(\w+)<\/span>/.exec(price);
							if (ar) {
								offer.price = ar[1] + ar[2];
								offer.currency = ar[3];
							}
							return 1;
						});
					}
					offers[offers.length] = offer;
					return 0;
				});
				return 1;
			});
		}, false, function () {
			offers = offers.sort(function (offer1, offer2) {
				var level1 = 0; if (offer1.level) level1 = offer1.level;
				var level2 = 0; if (offer2.level) level2 = offer2.level;
				if (level1 == level2) {
					var price1 = 0; if (offer1.price) price1 = offer1.price;
					var price2 = 0; if (offer2.price) price2 = offer2.price;
					return price1 - price2;
				}
				return level2 - level1;
			});
			var contents = '';
			for (idx in offers) {
				var offer = offers[idx];
				var offered = '';
				if (offer.level) offered += 'L' + offer.level + ' ';
				if (offer.price) offered += offer.price + ' ' + offer.currency + '\t';
				if (offer.company) offered += offer.company;
				if (offered) contents += offered + '\n';
			}
			if (contents) GM_log('Country: ' + country + '\n' + contents);
		});
	}

	function listGoldRate(country) {
		request('http://www.erepublik.com/en/exchange#buy_currencies=' + country.nr + ';sell_currencies=62;page=1', function (res) {
			elRecurse(res, /<span class="[^"]*change_ajax_RER[^"]*">\s*<span>/, /<\/span>\s*<\/span>/, function (rate) {
				country.rate = rate;
				return 1;
			});
		}, false, function () {
			GM_log(country.name + '> ' + country.rate + 'G');
		});
	}

	unsafeWindow.getBestOffer = function() {
		var countries = [];
		request('/en/market/country-0-industry-0-quality-0', function (res) {
			tailRecurse(res, /id="(\d+)__\/images\/flags\/L\/(\w+)\.gif"/, function (ar) {
				var country = {
					name: html2text(ar[2]),
					nr: ar[1]
				};
				countries[countries.length] = country;
				return 0;
			});
		}, false, function () {
			for (idx in countries) {
				var country = countries[idx];
				listGoldRate(country);
				listOffers(country.name, country.nr, 10);
			}
		});
	};
}
