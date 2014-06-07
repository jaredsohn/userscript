// ==UserScript==
// @name           Bitcoin Rebate
// @namespace      http://userscripts.org/users/27396
// @description    Order from noagendamarket's affiliate links and receive a percentage of noagendamarket's profits in the form of Bitcoins.  This script automates communicating your purchases and a Bitcoin address that you would like to receive the funds with.
// @include        http://www.amazon.com/*
// @include        https://www.amazon.com/*
// @include        http://www.amazon.ca/*
// @include        https://www.amazon.ca/*
// @include        http://www.amazon.de/*
// @include        https://www.amazon.de/*
// @include        http://www.amazon.fr/*
// @include        https://www.amazon.fr/*
// @include        http://www.amazon.it/*
// @include        https://www.amazon.it/*
// @include        http://www.amazon.co.uk/*
// @include        https://www.amazon.co.uk/*
// ==/UserScript==

/*
	http://bitcoinrebate.com/abebooks.html
	http://bitcoinrebate.com/acronis.html
	http://bitcoinrebate.com/alliance.html
	http://bitcoinrebate.com/amazon.html
	http://bitcoinrebate.com/amazonca.html
	http://bitcoinrebate.com/amazonuk.html
	http://bitcoinrebate.com/audible.html
	http://bitcoinrebate.com/chinagadgets.html
	http://bitcoinrebate.com/compuvest.html
	http://bitcoinrebate.com/cowboom.html
	http://bitcoinrebate.com/ebooks.html
	http://bitcoinrebate.com/hbostore.html
	http://bitcoinrebate.com/hostmonster.html
	http://bitcoinrebate.com/pokernstuff.html
	http://bitcoinrebate.com/popcap.html
	http://bitcoinrebate.com/roxio.html
	http://bitcoinrebate.com/thenerds.html
*/

// http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; jQuery_loaded(); }
}
GM_wait();

function jQuery_loaded() {
	if (window.location.href.indexOf("://www.amazon.com")) site_amazon("us");
	else if (window.location.href.indexOf("://www.amazon.cn")) site_amazon("cn");
	else if (window.location.href.indexOf("://www.amazon.de")) site_amazon("de");
	else if (window.location.href.indexOf("://www.amazon.fr")) site_amazon("fr");
	else if (window.location.href.indexOf("://www.amazon.it")) site_amazon("it");
	else if (window.location.href.indexOf("://www.amazon.co.jp")) site_amazon("jp");
	else if (window.location.href.indexOf("://www.amazon.co.uk")) site_amazon("uk");
}

function site_amazon(country) {
	if (
		window.location.href.substr(0,34) == "https://www.amazon.ca/gp/gc/thanks" ||
		window.location.href.substr(0,35) == "https://www.amazon.com/gp/gc/thanks" ||
		window.location.href.substr(0,37) == "https://www.amazon.co.uk/gp/gc/thanks" ||
		window.location.href.substr(0,34) == "https://www.amazon.de/gp/gc/thanks" ||
		window.location.href.substr(0,34) == "https://www.amazon.fr/gp/gc/thanks"
	) {
		$("div#gcThankyouContainer div.gcThankYouSuccessBox table ul li").slice(0,1).children("a").after("<b> <---------- You must click here to receive Bitcoins</b>");
	} else if (
		window.location.href.substr(0,46) == "https://www.amazon.ca/gp/css/summary/edit.html" ||
		window.location.href.substr(0,47) == "https://www.amazon.com/gp/css/summary/edit.html" ||
		window.location.href.substr(0,49) == "https://www.amazon.co.uk/gp/css/summary/edit.html" ||
		window.location.href.substr(0,46) == "https://www.amazon.de/gp/css/summary/edit.html" ||
		window.location.href.substr(0,46) == "https://www.amazon.fr/gp/css/summary/edit.html"
	) {
		var order = {};
		var contentMain = $("body").children("table").children("tbody").children("tr").children("td");
		order.site = location.hostname;
		order.placed = contentMain.children("table").slice(0,1).find("tr").slice(0,1).children("td").text().trim().replace(/Order Placed:/, "")
			.replace(/Bestellung aufgegeben am:/, "") // amazon.de
			.replace(/Date de la commande :/, "") // amazon.fr
			.trim();
		// Originally it was considered not to automatically relay this information,
		// however in cases of data being submitted more than once from viewing
		// order summary multiple times, this information will help to prevent
		// duplicated requests from causing any confusion for noagendamarket.
		order.number = contentMain.children("table").slice(0,1).find("tr").slice(1,2).children("td").text().trim().replace(/Amazon.(?:ca|co\.uk|com) order number:/, "")
			.replace(/Bestellnummer:/, "") // amazon.de
			.replace(/Numéro de commande Amazon.fr :/, "") // amazon.fr
			.trim();
		order.total = contentMain.children("table").slice(0,1).find("tr").slice(2,3).children("td").text().trim().replace(/Order Total:\n/g, "")
			.replace(/Gesamtbestellwert:/, "") // amazon.de
			.replace(/Montant total\xA0:/, "") // amazon.fr
			.trim();
		order.items = {}; item=0;
		var contentItems = contentMain.children("table").slice(1);
		contentItems.each(function (index) {
			if ($(this).text().trim() == "Gift Certificates/Cards") contentOrderType = $(this).text().trim();
			else if ($(this).text().trim() == "Payment Information") return false;
			else { // Items
				$(this).find("table[cellpadding=5]").each(function (index) { // Individual Item
					if ($(this).find("a[name=address] b").length > 0) { // Item: Gift Certificates/Cards
						order.items[item] = {};
						order.items[item].type = "Gift Certificate/Card";
						order.items[item++].amount = $(this).find("td:last-child").text().trim().replace(/Amount\n/, "")
							.replace(/Betrag\n/, "") // amazon.de
							.replace(/Montant\n/, "") // amazon.fr
							.trim();
					}
				});
			}
		});
		alert(order.toSource());
	} else {
		var pg = window.location.href;
		var src = "<div style='background-color:#FFFFFF;border:1px solid black;left:0;padding:2px;position:fixed;top:0;z-index:99;'>";
		src += "<a href='http://www.amazon.com/gp/redirect.html?ie=UTF8&location=";
		if (pg.indexOf("?") == -1) src += encodeURIComponent(pg);
		else src += " "+encodeURIComponent(pg.substr(0,pg.indexOf("?")))+" ";
		src += "&tag=bitcointo-20&linkCode=ur2&camp=1789&creative=390957' style='text-decoration:none;'>Activate affiliate reward</a></div>";
		$("body").prepend(src);
	}
}