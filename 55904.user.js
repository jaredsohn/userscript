// ==UserScript==
// @name           Google Search - Japanese/English Link
// @namespace      http://d.hatena.ne.jp/blooo/ 
// @description    Google検索に英語/日本語の切り替えリンクを付けます。
// @include        http://*.google.tld/search?*
// @version        1.02
// ==/UserScript==

(function() {
    var baseurl = document.location.href;
	baseurl = baseurl.replace(/&$/, '');
   	
   	var lang_url = baseurl.replace(/([?|&])hl=([^&]+)&?/, '$1');
   	var current_lang = (RegExp.$2) ? RegExp.$2 : '';
    if(current_lang=="en")
    {
    	var lang = "ja";
    	var word = "Japanese";
    }
    else
    {
    	var lang= "en";
    	var word = "English";
    }
    
    var lang_url = lang_url.replace(/lr=lang_([^&]+)&?/, '').replace(/&/g, '&#38;') + '&#38;hl=' + lang;
	var lang_link = '<a href="' + lang_url + '">' + word + '</a>';
    var html = new XML('<span id="links">' + lang_link + '</span>');
    GM_addStyle("div[id=links] { margin:2px 10px 0 0px; display:block; }");
    with(document.getElementById('ssb').firstChild) { innerHTML =  innerHTML + html.toXMLString() };
})();