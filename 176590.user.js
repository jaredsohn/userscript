// ==UserScript==
// @name domains to grep
// @version 0.1
// @description get list of domains from cp.timeweb.ru/sites
// @match https://cp.timeweb.ru/sites/
// @require https://cp.timeweb.ru/js/punycode.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright 2012+, Igor Savhuk, Artem Kolomycev
// ==/UserScript==
$('.content .primary_div').prepend('<a id="ext_domainlist" style="float:left;margin:20px -100% 20px 20px;">domain list</a>');
$('#ext_domainlist').click(
    function () {
		var domains = $('#div_sites_list td td[align="right"] a');
		var out = "'" + domains[0].text;
		for (i = 1; i < domains.length; i++){
	        out += '|' + punycode.ToASCII(domains[i].text);
	    }
        out += "'";
		console.log(out);
	}
);
