// ==UserScript==
// @name           Amazon International Prices
// @namespace      http://userscripts.org/users/130678
// @include        http://www.amazon.com/*
// @include        http://www.amazon.ca/*
// @include        http://www.amazon.cn/*
// @include        http://www.amazon.fr/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.it/*
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.co.uk/*
// @require        https://gist.github.com/raw/3238/bc5f6bd5fb64b1baf6aa17423735a1816f36b358/dollarX.js
// ==/UserScript==
var asin = document.getElementById("ASIN").value;
if(!asin) return;

var sites = new Object();

sites.com = {hostname: 'www.amazon.com', currency: 'usd'};
sites.ca = {hostname: 'www.amazon.ca', currency: 'cad'};
sites.cn = {hostname: 'www.amazon.cn', currency: 'cny'};
sites.fr = {hostname: 'www.amazon.fr', currency: 'eur'};
sites.de = {hostname: 'www.amazon.de', currency: 'eur'};
sites.it = {hostname: 'www.amazon.it', currency: 'eur'};
sites.jp = {hostname: 'www.amazon.co.jp', currency: 'jpy'};
sites.uk = {hostname: 'www.amazon.co.uk', currency: 'gbp'};

var internationalPricesContainer = document.createElement("ul");
internationalPricesContainer.style.marginLeft = "340px";
document.getElementById("handleBuy").appendChild(internationalPricesContainer);

for (var i in sites){
	sites[i].price = document.createElement("li");
	sites[i].isCurrent = false;
	if(location.hostname==sites[i].hostname){
		sites.current = sites[i];
	}else{
		getPrice(sites[i], asin);
	}
}

function getPrice(site, asin){
	var itemUrl = 'http://' + site.hostname + '/dp/'+ asin;
	GM_xmlhttpRequest({
		method: 'GET',
		url: itemUrl,
		onload: function(res){
			var price = res.responseText.match(/<b class="priceLarge">.+<\/b>/g);
			if(price){
				site.price.innerHTML = '<a href="' + itemUrl + '">' + price + '</a>';
				internationalPricesContainer.appendChild(site.price);
			}
		}
	});
}

//Flag icons from http://www.famfamfam.com/lab/icons/flags/ Thanks!
sites.com.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/us.png")';
sites.ca.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/ca.png")';
sites.cn.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/cn.png")';
sites.fr.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/fr.png")';
sites.de.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/de.png")';
sites.it.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/it.png")';
sites.jp.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/jp.png")';
sites.uk.price.style.listStyleImage = 'url("http://dec31.net/famfamfam_flag_icons/png/gb.png")';
