// ==UserScript==
// @name           Company Country Indicator
// @namespace      http://userscripts.org/users/NOTEXIST
// @description    La di dah
// @include        http://www.erepublik.com/en/market/*
// ==/UserScript==

var table = document.getElementsByClassName("offers")[0];
var offers = table.getElementsByClassName("entity");
var hashoffer = new Array();
for(var i=0;i<offers.length;i++)
{
	var compLink = offers[i].innerHTML.split('<a href="')[1].split('" class')[0];
	var finalNum = "";
	var index = compLink.length-1;
	var numChar = compLink.charAt(index);
	while(numChar!="-")
	{
		finalNum = numChar + finalNum;
		index--;
		numChar = compLink.charAt(index);
	}
	hashoffer[finalNum]=offers[i];
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'http://api.erepublik.com/v1/feeds/companies/'+finalNum,
    		headers: {
       			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
       			 'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: function(responseDetails,i) {
        		//var parser = new DOMParser();
        		//var dom = parser.parseFromString(responseDetails.responseText,
            		//	"application/xml");
       	 		//var entries = dom.getElementsByTagName('country');
       			//alert(entries.length);
			var lol = responseDetails.responseText.split('</export-licences>')[1];
			var country = lol.split('<country>')[1].split('</country>')[0];
			var id = responseDetails.responseText.split('<id>')[1].split('</id>')[0];
			var offer = hashoffer[id];
			if(country!="USA")
				offer.innerHTML+='<div class="nameholder dotted" style="color:#FF0000">'+country+'</div>';
			else
				offer.innerHTML+='<div class="nameholder dotted" style="color:#333333">'+country+'</div>';
    		},
    		onerror: function(responseDetails) {
       			 ERRORERRORERROR();
    		}
	});
}