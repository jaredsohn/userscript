// ==UserScript==
// @name           Neopets : Stockmarket
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Displays your stocks in sidebar
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0.0
// @language       en
// @include        http://www.neopets.com/*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/35177.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       stockmarketModuleHtml http://pastebin.com/download.php?i=a3mzdaxj
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @uso:version    version
// @history        3.0.0.0 Updated @require#87942
// @history        2.0.0.4 Updated i18n
// @history        2.0.0.3 Fixed "hidden" div
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script was made from scratch.

    Based on http://userscripts.org/scripts/show/14675 (by nungryscpro)

***************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

//GM_getValue("prepend", 1);

/** stockmarket_default **/
var Stocks = {
	"Negative"	: 2,
	"NonPositive"	: 3,
	"Positive"	: 4,
	"NonNegative"	: 5,
	"All"	: 7
};
/** /stockmarket_default **/

/** php **/
function time() {
	return Math.round(new Date().getTime() / 1000);
}

function strftime(format, ts) {
	if (!ts) ts = time();
	ts = new Date(ts * 1000);
	var out = "", re = /[^%]?%([aAbBcCdDegGhHIjmMnprRStTuUVwWxXyYzZ%])/g;
	for (var match, i = 0 ; match = re.exec(format) ; i += 3) {
		out += format.substring(Math.max(i - 1, 0), i = match.index+match[0].length - 2);
		switch (match[1])
		{
//			case "h":
			case "b":
				break;
			case "D":
				format = format.replace("%D", "  %m/%d/%y");
				break;
			case "T":
				format = format.replace("%T","  %H:%M:%S");
				break;
			case "Y":
				out += ts.getFullYear();
				break;
			case "m":
				if (ts.getMonth() < 9) out += "0";
				out += 1+ts.getMonth();
				break;
			case "d":
				if (ts.getDate() < 10) out += "0";
				out += ts.getDate();
				break;
			case "H":
				if (ts.getHours() < 10) out += "0";
				out += ts.getHours();
				break;
			case "M":
				if (ts.getMinutes() < 10) out += "0";
				out += ts.getMinutes();
				break;
			case "S":
				if (ts.getSeconds() < 10) out += "0";
				out += ts.getSeconds();
				break;
			case "%":
				out += "%";
				break;
		}
	}
	return out;
}

function trim(pstr) {
	return pstr.replace(/^ \t\n\r\0\x0B| \t\n\r\0\x0B$/g, "");
}

function strip_tags(pstr) {
	return pstr.replace(/<(?:\/[^<].*?|[^<].*?(?: \/)?)>/g, "");
}
/** /php **/

/** neopets_default **/
function attachModule(module, prepend) {
	var oldElem = xpath('.//td[1]/div[contains(string(table/tbody/tr[1]/td), "' + strip_tags(module.title) + '")]')[0];

	var newElem = document.createElement("div");
	newElem.setAttribute("class", "sidebarModule");
	if (prepend) {
		newElem.setAttribute("style", "margin-bottom: 7px;");
	} else {
		newElem.setAttribute('style','margin-top: 7px;');
	}
	newElem.innerHTML = '<table width="158" cellpadding="0" cellspacing="0" border="0" class="sidebarTable"><tr><td valign="middle" class="sidebarHeader medText">__TITLE__</td></tr>__CONTENT__</table>'.replace("__TITLE__", module.title || "").replace("__CONTENT__", module.content || "");

	if (oldElem) {
		xpath("id('content')/table/tbody/tr/td[1]")[0].replaceChild(newElem, oldElem);
	} else if (prepend) {
		xpath("id('content')/table/tbody/tr/td[1]")[0].insertBefore(newElem, xpath(".//table/tbody/tr/td[1]/div[1]")[0]);
	} else {
		xpath('id("content")/table/tbody/tr/td[1]')[0].appendChild(newElem);
	}
}
/** /neopets_default**/

(function() {	// script scope

	var user = {
		"increment"	: GM_getValue("increment",		30000),	// miliseconds
		"image"	: GM_getValue("image",			"sell.gif"),
		"translate"	: eval(GM_getValue("translate",	uneval(["Stock Summary", "Buys", "Sells", "Ticker", "Price", "Holdings", "Refreshing...", "Options", "Buy Price", "Sell Price", "Close", "Minimum", "Maximum"])))
	};

	GM_addStyle(".activePetInfo TD {background-color: inherit;};");

	function executeContent(cont)
	{
			var content = cont.replace(/(?:<\/(?:a|td|font|b|nobr)>| [a-z]+="[#a-z0-9]+"|<(?:b|br|nobr|font)(?:\s*\/)?>|\s+)/gim, "");

			var portfolio = [],
			matches = content.match(/=([a-z]+)">\1<ahref="stockmarket.+?%<\/tr>/gi);
			for (var i = 0, t = matches.length ; i < t ; ++i) {
				var match = matches[i].match(/>([a-z]+)<ahref="stockmarket\.phtml\?type=profile&(?:amp;)?company_id=(\d+)">.+?<td>(\d+)<td>(\d+)<td><font>([+-]?\d+)<td>(\d+(?:[,.]\d+)*)<td>(\d+(?:[,.]\d+)*)<td>(-?\d+(?:[,.]\d+)*)<td><font>([+-]?\d+[,.]\d+)%/i);
				match.shift();
				portfolio.push(match);
			}
			GM_setValue("portfolio",uneval(portfolio));

			var companies = [];

			var matches = content.match(/company_id=\d+">.+?>[a-z]+\d+[-+]\d+/gi);
			for (var i = 0 , t = matches.length ; i < t ; ++i) {
				var match = matches[i].match(/company_id=(\d+)">.+?>([a-z]+)(\d+)([-+]\d+)/i);
				match.shift();
				if (companies[0] && companies[0][1] == match[1]) {
					break;
				}

				companies.push(match);
			}
			GM_setValue("companies", uneval(companies));

			addModule(companies, portfolio);
	}

	function recursive(first) {	// script scope

		var nst = new Date(),
		interval = 30 * 60 * 1000 + user.increment,
		lastAccess = new Date(Date.parse(GM_getValue("lastAccess", "Sat Jul 16 2011 09:24:27 GMT-0300"))||0);
		lastAccess.setMinutes(30 * Math.floor(lastAccess.getMinutes() / 30), 0, 0);

		if (!first) {
			xpath("id('stockmarketRefreshSpan')")[0].textContent = user.translate[6];
		}

		if (interval <= nst - lastAccess) {
			GM_setValue("refreshing", true);
			lastAccess = nst;
			GM_setValue("lastAccess", nst.toString());

			HttpRequest.open({
				"method" : "get",
				"url" : "http://www.neopets.com/stockmarket.phtml?type=portfolio",
				"onsuccess" : function(xhr) {
					GM_setValue("refreshing", false);
					executeContent(xhr.response.text);
				}
			}).send();
		} else {
			(wait = setInterval(function() {
				if (!GM_getValue("refreshing", false)) {
					addModule(eval(GM_getValue("companies", "([])")), eval(GM_getValue("portfolio", "([])")));
					clearInterval(wait);
				}
			}, (first ? 0 : 250)));
		}

		setTimeout(recursive, lastAccess - nst + interval);
	}

	function addModule(companies, portfolio)
	{
		var pp = GM_getValue("prepend", -1);
		attachModule({
			"title":GM_getResourceText("stockmarketModuleHtml").replace(/__([A-Z]+)__/g, function($0, $1) {
				switch ($1) {
					case "TITLE":return user.translate[0];
					case "OPTIONS":return user.translate[7];
					case "BUYPRICE":return user.translate[8];
					case "SELLPRICE":return user.translate[9];
					case "CLOSE":return user.translate[10];
					case "MINIMUM":return user.translate[11];
					case "MAXIMUM":return user.translate[12];
					case "BUYMIN":return GM_getValue("buyMinimum", 15);
					case "BUYMAX":return GM_getValue("buyMaximum", 20);
					case "SELLMIN":return GM_getValue("sellMinimum", 30);
					default:return $0;
				}
			}),
			"content":(function() {
				var out = '<tr><td class="activePet sf"><img id="stockmarketRefreshImage" width="150" height="150" border="0" src="http://images.neopets.com/images/'+user.image+'" style="cursor: pointer;" /><span id="stockmarketRefreshSpan">' + strftime("%Y-%m-%d %T", Date.parse(GM_getValue("lastAccess", "Sat Jul 16 2011 09:24:27 GMT-0300")).valueOf() / 1000) + '</span></td></tr>';

				function getInfo(arr,ind,find)
				{
					for ( var i = 0 , t = arr.length ; i < t ; ++i )
					{
						if (arr[i][ind] == find) return arr[i];
					}
					return [];
				}

				companies.sort(function(a, b) {	// sort by holdings
					var x = parseInt((getInfo(portfolio,1,a[0])[5] || "0").replace(/[,.]/g,""),10);
					var y = parseInt((getInfo(portfolio,1,b[0])[5] || "0").replace(/[,.]/g,""),10);
					if (x == y) return 0;
					return ( x > y ? 1 : -1 );
				});
				companies.sort(function(a, b) {	// sort by price
					if (a[2] == b[2]) return 0;
					return ( parseInt(a[2],10) > parseInt(b[2],10) ? 1 : -1 );
				});

				// BUYS
				out += '<tr><td class="activePet sf" style="padding: 2px;"><strong>'+user.translate[1]+'</strong></td></tr><tr><td class="activePet sf"><table width="100%" cellspacing="0" cellpadding="2" border="0" class="activePetInfo">';
				out += '<thead><tr style="background-color:#EFEFEF;"><th style="text-align:left;">'+user.translate[3]+'</th><th style="text-align:middle;">'+user.translate[4]+'</th><th style="text-align:right;">'+user.translate[5]+'</th></tr></thead><tbody>';
				var buy = [GM_getValue("buyMinimum",15),GM_getValue("buyMaximum",20)];
				for (var i = 0, t = companies.length ; i < t ; ++i) {
					var price = parseInt(companies[i][2],10);
					if (price < buy[0] || price > buy[1]) {
						continue;
					}
					var color = (price < 15 ? "#FFF5F5" : "#FFFFFF" );
					out += '<tr bgcolor="'+color+'" id="stockmarketBuy'+companies[i][1]+'" onmouseover="this.style.backgroundColor=\'#FFFFD5\';" onmouseout="this.style.backgroundColor=\''+color+'\';"><td style="text-align: left;cursor: pointer;">'+companies[i][1]+'</a></td><td style="cursor: pointer;">'+companies[i][2]+'</td><td style="text-align: right;cursor: pointer;">'+(getInfo(portfolio,1,companies[i][0])[5] || 0)+'</td></tr>';
				}
				out += '</tbody></table></td></tr>';

				portfolio.sort(function(a, b) {	// sort by price
					if (a[3] == b[3]) return 0;
					return (parseInt(a[3],10) < parseInt(b[3],10) ? 1 : -1 );
				});

				// SELLS
				out += '<tr><td class="activePet sf" style="padding: 2px;"><strong>'+user.translate[2]+'</strong></td></tr><tr><td class="sf"><table width="100%" cellspacing="0" cellpadding="2" border="0" class="activePetInfo">';
				out += '<thead><tr style="background-color:#EFEFEF;"><th style="text-align:left;">'+user.translate[3]+'</th><th style="text-align:middle;">'+user.translate[4]+'</th><th style="text-align:right;">'+user.translate[5]+'</th></tr></thead><tbody>';
				var sell = [GM_getValue("sellMinimum",30)];
				for (var i = 0 , t = portfolio.length ; i < t && parseInt(portfolio[i][3],10) >= sell[0] ; ++i) {
					var color = (parseInt(portfolio[i][3],10) < 15 ? "#FFF5F5" : "#FFFFFF" );
					out += '<tr bgcolor="'+color+'" id="stockmarketSell'+portfolio[i][1]+'" onmouseover="this.style.backgroundColor=\'#FFFFD5\';" onmouseout="this.style.backgroundColor=\''+color+'\';"><td style="text-align: left;cursor: pointer;">'+portfolio[i][0]+'</a></td><td style="cursor: pointer;">'+portfolio[i][3]+'</td><td style="text-align: right;cursor: pointer;">'+portfolio[i][5]+'</td></tr>';
				}
				out += '</tbody></table></td></tr>';

//				out +='</td></tr></tbody></table></td></tr>';

				return out;
			})()
		}, pp == 1 || pp == -1 && "/stockmarket.phtml" == location.pathname);

		xpath(".//tr[contains(@id, 'stockmarketBuy')]").forEach(function(elem) {
			elem.addEventListener("click", function(event) {
				var company = elem.id.match(/Buy(\w+)$/)[1];
				location.replace("/stockmarket.phtml?type=buy#ticker_symbol=" + company + "&amount_shares=1000");
				xpath(".//td[@class = 'content']//form/table/tbody/tr/td/input[@type = 'text']").forEach(function(elem) {
					var v_re = new RegExp("[#&]" + elem.name + "=(\\w+)");
					if (v_re.test(location.href)) {
						elem.value = RegExp.$1;
					}

					elem.select();
				});
			}, false);
		});

		xpath(".//tr[contains(@id, 'stockmarketSell')]").forEach(function(elem) {
			elem.addEventListener("click", function(event) {
				var company = elem.id.match(/(\d+)$/)[1];

				location.replace("/stockmarket.phtml?type=portfolio#" + company + "disclosure");

				if (/\/stockmarket\.phtml\?type=portfolio/.test(location.href)) {
					var x = GM_getValue("lastSell");
					if (x && company != x) {
						location.replace("javascript:disclose('" + x + "');disclose('" + company + "');");
					}
				}
				GM_setValue("lastSell", company);
			}, false);
		});
		xpath("id('stockmarketOption')")[0].addEventListener("click", function(event) {
			xpath("id('stockmarketDiv')")[0].style.display = "block";
		}, false);
		xpath("id('stockmarketFormOption')")[0].addEventListener("submit", function(event) {
			GM_setValue("buyMinimum", event.target.elements[0].value || 15);
			GM_setValue("buyMaximum", event.target.elements[1].value || 20);
			GM_setValue("sellMinimum", event.target.elements[2].value || 30);
			xpath("id('stockmarketDiv')")[0].style.display = "none";
			event.preventDefault();
			addModule(eval(GM_getValue("companies", "([])")), eval(GM_getValue("portfolio", "([])")));
		}, false);
		xpath("id('stockmarketRefreshImage')")[0].addEventListener("click", function(event) {
			GM_setValue("lastAccess", "Sat Jul 16 2011 09:24:27 GMT-0300");
			recursive();
		}, false);
	}

	if (/\/stockmarket\.phtml\?type=portfolio#(\d+)/.test(location.href)) {
		location.replace("javascript:disclose(\'" + RegExp.$1 + "\')");
	} else if (/\/stockmarket\.phtml\?type=buy#/.test(location.href)) {
		xpath(".//td[2]/form/table/tbody/tr/td/input[@type='text']").forEach(function(elem) {
			var v_re = new RegExp("[#&]" + elem.name + "=(\\w+)");
			if (v_re.test(location.href)) {
				elem.value = RegExp.$1;
			}

			elem.select();
		});
	}

	if (/\/stockmarket\.phtml\?type=portfolio/.test(location.href)) {
		GM_setValue("lastAccess", new Date().toString());
		executeContent(document.body.innerHTML);
	} else if (xpath("id('content')/table/tbody/tr/td[@class='sidebar']")[0]) {
		recursive(true);
	}
})();