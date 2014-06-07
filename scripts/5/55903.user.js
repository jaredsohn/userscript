// ==UserScript==
// @name           Google Search - "Quote" link
// @namespace      http://d.hatena.ne.jp/blooo/
// @description    Add a "Quote/Dequote" link to Google search
// @include        http://*.google.tld/search?*
// @version        1.02
// ==/UserScript==

(function() {
    var baseurl = document.location.href;
	baseurl = baseurl.replace(/&$/, '');
   	
   	var quoted_url = baseurl.replace(/([&|?])q=([^&]+)&?/, '$1');
   	var current_query = (RegExp.$2) ? RegExp.$2 : '';
   	if(current_query.match(/^%22(.*)%22$/))
   	{
   		//already quoted
   		current_query = RegExp.$1;
   		quoted_url = quoted_url.replace(/&/g, '&#38;') + '&#38;q=' + current_query;
   		var word = "Dequote";
   	}
   	else	
   	{
	   	quoted_url = quoted_url.replace(/&/g, '&#38;') + '&#38;q=&#34;' + current_query + '&#34;';
	   	var word="Quote";
	}
	
   	var quoted_link = '<a href="' + quoted_url + '">' + word + '</a>';
    var html = new XML('<span id="links">' + quoted_link + '</span>');
    GM_addStyle("div[id=links] { margin:2px 10px 0 0px; display:block; }");
    with(document.getElementById('ssb').firstChild) { innerHTML =  innerHTML + html.toXMLString() };
})();