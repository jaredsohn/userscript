// ==UserScript==
// @name           Amazon International Prices - EUROPE
// @namespace      http://userscripts.org/users/297077
// @include        http://www.amazon.es/*
// @include        http://www.amazon.com/*
// @include        http://www.amazon.ca/*
// @include        http://www.amazon.cn/*
// @include        http://www.amazon.fr/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.it/*
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.co.uk/*
// @include        http://www.amazon.at/*
// ==/UserScript==
var asin = document.getElementById("ASIN").value;
if(!asin) return;

var sites = new Object();
var first = true;

sites.fr = {hostname: 'www.amazon.fr', currency: 'eur',image:"data:image/gif;base64,R0lGODlhFgAQAPMAAPj4+OdgXObm5ssvLhdJiqAkIt3d3QoyaW6YxTRpp+2JhUZ4siJYmg0+g9ZEQbe3tyH5BAAAAAAALAAAAAAWABAAAARukMhJjL3WaTc6QWAIjOSonOhwLGxblkEcK8Xasi8py3Xi/7nRLtb7+YKAoaPGaDqRmw3T2YRGlwcClWGN1igSgXgs7pgHtQaYTD530o14nD12ow9yOb3shucxGHZ+E4AXggeIiQcPjI2MBZCRBREAOw=="};
sites.es={hostname:'www.amazon.es',currency:'eur',image:"data:image/gif;base64,R0lGODlhFgAQALMAAI0MItBgcbowRPW+K/C4Jbx/IXY0I5lubrqZS5ttC+KkGeitGdqaEqlwMpAAFW0AFiH5BAAAAAAALAAAAAAWABAAAAR1EMhJq5Uh6805eEIojiT5gGVaPglBDHAsz4ObJIs7LEyh1K6gcHFTLBaKgsHgEwaPyOKxkDAcEAWoFqq4MRSKxvJwaBi3RwXDy2A0qoZE4wuug9tsN1ze7vvxCX+Cg3gPDoeIiYqKJ4uOjo2PkocnlZaXmJURADs="};
sites.de = {hostname: 'www.amazon.de', currency: 'eur',image:"data:image/gif;base64,R0lGODlhFgAQALMAAB0dHUVFRTc3N/IjL+8YJ60AB90KHesIHqaBCOSxD8+iDNyrC9mqEN+yGbSPEHNzcyH5BAAAAAAALAAAAAAWABAAAARkEMhJq5Uv6825DGAojuNHnqQkrGzrukAxzHRt20VB7Hzv+znDYUgsGomG4HFpTBaEzGgSwUhYr9jslYGgLrTg64KLUCy+4exZ0VUwzvC4/Mxgl92Mhn7P1zPqdggOg4SFhoRdEQA7"};
sites.it = {hostname: 'www.amazon.it', currency: 'eur',image:"data:image/gif;base64,R0lGODlhFgAQALMAAHLAlNmIkM59hchbZ0OmbA1fKsBNWYEVISuSVK8zQRR4OKAfLeLi4hx/Qre3t/j4+CH5BAAAAAAALAAAAAAWABAAAARqsMnZmL026Z0a+OAjjmJgCmhSEGxLkkMsH2vLvqM81zYuGsAgDUEs+h5BYaFo9HE0tAYTcXwmotPqk6agVDCXhXjMVXQl4PBYXDab05Y1u+B2wxnyRdsOlx/2aHAJfgWFhgUOiYqJf41/EQA7"};
sites.uk = {hostname: 'www.amazon.co.uk', currency: 'gbp',image:"data:image/gif;base64,R0lGODlhFgAQAPMAAPTy8zxWnbIPG89cYNuXmayprRIqdbe6yt3Q0J5PUnaJvOXj5Nm3vdDU3Mc2PMd9gyH5BAAAAAAALAAAAAAWABAAAASnMLETjLVNCFRveMKTPAvQKKgCEA+QKg27HAYzEMCCBsDguAGFDbeoBGwtIMDxCxIGDFMn4HRED8vfYTAAAKfUowOXXYxz4UphUfK6l4K3m13Q2O/4vH7PLzTabwsacl4LDQUXBgF/IAgabAMhHYkGMAhMCo4COisCA5MWfgSeFZoLig2XDgoXBw2RrBaaCK2vAgkGBXWrHqaJmXUJCbeguRqIiQG6CREAOw=="};
sites.at = {hostname: 'www.amazon.at', currency: 'eur',image:"data:image/gif;base64,R0lGODlhFgAQALMAALktPOZ7hvGJlOFodOtUY9tKWuZKW/T09K+vr+zs7Nra2pkPIcsVLcsoO6YbLOPj4yH5BAAAAAAALAAAAAAWABAAAARgEEjZqr11zsCF/yDIBcAyEGiqrumwmGy8ukth3Hiu48WCJIegcEgUJhCIB7DIDCYeSGWz+YwmrtisFgtFKJTb8PWhQCwY6LR6vX6x3283fI6W0+F2jN6Sfjn+gIGCggsRADs="};
var internationalPricesContainer = document.createElement("ul");
internationalPricesContainer.style.display="inline";

var parent = document.getElementById("olpDivId");
parent.appendChild(internationalPricesContainer);

for (var i in sites){
	sites[i].price = document.createElement("li");
        sites[i].price.style.display = "inline";
        sites[i].price.style.margin="15px";
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
                                if(first){
                                     site.price.innerHTML = "<br />";
                                     first = false;
                                }
                             
                                price = price.toString().replace("EUR","€");
				site.price.innerHTML += '<img src="'+site.image+'"></img>&nbsp;<a href="' + itemUrl + '">' + price + '</a>';
				internationalPricesContainer.appendChild(site.price);
                               
			}
		}
	});
}
