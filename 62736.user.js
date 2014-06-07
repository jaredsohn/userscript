// ==UserScript==
// @name                Auricoctor
// @description	        wyróżnia firmy Imperialistów na markecie
// @include		http://www.erepublik.com/en/market/*
// @include		http://ww2.erepublik.com/en/market/*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	

// Main
    function letsJQuery() {
    $(document).ready(function(){
			
			window.setTimeout(function() {
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://i-ps.pl/marcin/inne/xml.xml",
					headers: {
						"User-Agent": "Mozilla/5.0",
						 'Accept': 'application/atom+xml,application/xml,text/xml',
					},
				onload: function(response) {
		
					var parser = new DOMParser();
					var dom = parser.parseFromString(response.responseText,"application/xml");
					var firmy = dom.getElementsByTagName('firma');
					
					$("a.nameholder").each(function () {
					for (x in firmy)
					{
						if ($(this).html()==firmy[x].textContent)
						{
						$(this).html("<b>"+$(this).html()+"</b>");
						$(this).parent().after("<img src=\"http://img686.imageshack.us/img686/3127/pi50.jpg\" />");
						}}});}});}, 0);});}