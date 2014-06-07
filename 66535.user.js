// ==UserScript==
// @name           eIndonesia Blacklist Company
// @namespace      http://www.erepublik.com/en/citizen/profile/2138711
// @description    eIndonesia Blacklist Company
// @version        0.1
// @include        http://ww*.erepublik.com/en/market/*
// ==/UserScript==

function getElementsByClassName(classname, tag) {
	node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName(tag);
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function in_array(needle, haystack) {  
	strict = true;
	for(var i = 0; i < haystack.length; i++) {  
		if(strict) {  
			if(haystack[i] === needle) {  
				return true;  
			}  
		} else {  
			if(haystack[i] == needle) {  
				return true;  
			}  
		}
	}
	return false;  
}

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://docs.google.com/View?id=dch4kn93_365f64txf3',

	onload:function(response){
		var responselist = response.responseText.match('#(.*)#')[1].split("<br>");
		var blacklist = new Array();
		for (var i = 0; i < responselist.length; i++) {
			if(responselist[i] != "") {
				var blackcomp = responselist[i].split("-");
				var blackid = blackcomp[blackcomp.length - 1];
				blacklist.push(blackid);
			}
		}
		
		var companies = getElementsByClassName("nameholder", "a");
		
		for (var i = 0; i < companies.length; i++) {
			var company = companies[i];
			company_href = company.getAttribute("href").split("-");
			company_id = company_href[company_href.length - 1];
			if(in_array(company_id, blacklist)) {
				company.innerHTML = company.innerHTML + " (blacklist)";
				company.style.color = "#f00";
			}
		}
	}
});