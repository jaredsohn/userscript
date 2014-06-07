// ==UserScript==
// @name           eBay Pager Enhanced
// @namespace      http://fastcheck.blogspot.com
// @description    Pagermenue fuer die Seiten 'Bewertungsprofil', 'Angebotene Artikel' und den meissten Suchseiten. Berechnet Einstellvolumen.
// @include        http://feedback.ebay.*/ws/eBayISAPI.dll?*
// @include        http://cgi6.ebay.*/ws/eBayISAPI.dll?*
// @include		   http://search.ebay.*
// @include		   http://search-completed.ebay.*
// ==/UserScript==
(function () { // function wrapper for Opera

var ioArgs = new Array("cgi6","search","feedback");
var dUrl = document.URL;
for (i=0;i<ioArgs.length;i++){
	if (dUrl.indexOf(ioArgs[i]) !=-1) break;
}

if (ioArgs[i]) {
	var total = 0;
	var count = 0;
	var auctionsLink = "";
	var tld = /ebay\.(.*)/.exec(document.domain)[1]; 
	var pUrl = "http://cgi6.ebay."+tld+"/ws/eBayISAPI.dll?ViewListedItems&rdir=0";
	var td = document.evaluate("//td[@class='navigation']",	document, null, 7, null).snapshotItem(0);        

		if (tld!="de"){
			auctionsLinkText = "View only current auctions"
			auctionsLinkTextS =	"View with ended auctions"
			buttonTotalValue = "Total of indicated items"
			perPageText = "Items per page: "
		}
		else {
			auctionsLinkText = "Nur aktuelle Auktionen anzeigen"
			auctionsLinkTextS = "Mit beendeten Auktionen anzeigen"
			buttonTotalValue = "Summe angezeigter Artikel"
			perPageText = "Artikel pro Seite: "
		}

	switch (i) {
	    case 0:
					regExp = /(rows\S)(\d*)/;
					var userid = '&userid=' + 
						document.evaluate("//a[contains(@href, 'myworld.ebay')]/text()", 
							document, null, 9,null).singleNodeValue.data;
					var rows = '&rows=' + regExp.exec(dUrl)[2];
					var since = /since\S(\S\d*)/.exec(dUrl)[1];
					var auctionsLink = (since!='-1')?auctionsLinkText.link(pUrl+'&since=-1'+rows+userid):
						auctionsLinkTextS.link(pUrl+'&since=31'+rows+ userid);
					var items = document.evaluate("//td[@colspan = '6']/descendant::text()",
									document, null, 7, null).snapshotItem(1).data.replace(/\D+/gi,'');

					if (!items) break; 
					else {
						var divTotal = document.createElement("div");
						divTotal.setAttribute("style", "display:block;text-align:center;");
						td.appendChild(divTotal);
						var totalButton =  document.createElement("input");
						totalButton.setAttribute("class", "button");
						totalButton.setAttribute("value", buttonTotalValue);
						totalButton.setAttribute("type", "submit");
						totalButton.addEventListener('click', showTotalItems, false)
						divTotal.appendChild(totalButton)
					}

					var shopImg = document.evaluate("//img[contains(@src , 'moreStore_88x31')]", document, null, 7, null).snapshotItem(0);
					if (shopImg) shopImg.setAttribute("style", "display:none;")	
			break;
	    case 1:
				regExp = /(frpp\S)(\d*)/;		// frpp= frppZ
				if (dUrl.indexOf("frpp")==-1) dUrl = dUrl+"QQfrppZ25";
	        break;
	    case 2:
				regExp = /(items\W)(\S\d*)/;	// items= 
				if (dUrl.indexOf("items=")==-1) dUrl = dUrl+"&items=25";
	        break;
	    default:
	        break;
	}  // end switch 

	
		var r = new Array("25","50","100","200"," | ");

		var divLinks = document.createElement("div");
		divLinks.setAttribute("style", "margin:0 0 4px 0;display:block;");
		divLinks.innerHTML = perPageText; 

		for(k=0;k<4;k++){
			if (regExp.exec(dUrl)[2] == r[k]) divLinks.innerHTML += r[k];
			else divLinks.innerHTML +=  r[k].link(dUrl.replace(regExp,'$1' + r[k]));
			(k<3)?divLinks.innerHTML += r[4]:'';
		}

		divLinks.innerHTML += "<br>" + auctionsLink;
		td.appendChild(divLinks);
	
} 

function showTotalItems(){

	var cur = document.evaluate("//table[@cellpadding = '3']//td[@align = 'right']/descendant::text()",
				document, null, 9, null).singleNodeValue.data.charAt(0);

	switch (cur){  // regExp match only for 'de' domain
		case "E":
			rx = /\x3E+EUR\s+[0-9,.]+/g;
			cur = "EUR ";
		break;
		case "U":
			rx = /\x3E+US\s+\x24[0-9,.]+/g;
			cur = "US $ ";
		break;
		case "$":
			rx = /\x3E+US\s+\x24[0-9,.]+/g; //rx = /\x3E\x24[0-9,.]+\x3C/g;
			cur = "US $ ";
		break;
		case "A":
			rx = /\x3E+AU\s+\x24[0-9,.]+/g;
			cur = "AU $ ";
		break;
		case "£":
			rx = /\x3E\xA3[0-9,.]+\x3C/g;
			cur = "£ ";
		break;
		case "G":
			rx = /\x3E\xA3[0-9,.]+\x3C/g;
			cur = "£ ";
		break;
		default:
		break;
	}

	perPageText = " / " + items.bold() + " - Total - " + cur.bold();
	divTotal.innerHTML = "000" + perPageText;

	String.prototype.curFormatStr = function(){         
		return this.replace(/(\d+)(\d{2}$)/,function($0,$1,$2){
			l=$1.length; // (l>3?'.':'')
			return(l%3?$1.substr(0,l%3)+'.':'')+$1.substring(l%3,l).replace(/(\d{3})(?=\d)/g,'$1.')+','+$2
		})
	}
	
	
		
	var m = Math.ceil(items/200)+1;
	var sUrl = 'http://cgi6.ebay.de/ws/eBayISAPI.dll?ViewListedItems&include=0&since='+since+'&rdir=0&rows=200'+userid+'&page=';

	for(var p=1;p<m;p++){			
				GM_xmlhttpRequest({ 
					method:"GET", 
					url:sUrl+p, 
					onload:function(result) {
//							r = result.responseText;
							x = result.responseText.match(rx);
							for(j=0;j<x.length;j++){
								total += x[j].replace(/\D/gi,'') * 1.00;
								count ++;
								t = total + '';
								divTotal.innerHTML = count + perPageText + t.curFormatStr();
							}
					}
				});
	
	}




}

})(); // function wrapper for Opera

