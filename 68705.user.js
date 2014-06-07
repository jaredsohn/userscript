// ==UserScript==
// @name                Party news
// @description	        News from PI, HSP and LAM
// @include		http://www.erepublik.com/*
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow
// & modified by C11n3k

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
					url: "http://www.partiaimperialna.pl/vote/main/xml",
					headers: {
						"User-Agent": "Mozilla/5.0",
						 'Accept': 'application/atom+xml,application/xml,text/xml',
					},
				onload: function(response) {

		        var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText,"application/xml");
				var news = dom.getElementsByTagName('new');
				
				titlu_el=document.createElement("div");
					titlu_el.setAttribute('class', 'title, box');
					titlu_el.setAttribute('style', 'float: left;');
					titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Vote:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>';
					latest=document.getElementById('latestnews');
					latest.parentNode.insertBefore(titlu_el, latest);
					
				for (x in news)
				{
					var wiadomosc = news[x];
					var comanda = wiadomosc.getElementsByTagName('text')[0].textContent;
					var link = wiadomosc.getElementsByTagName('url')[0].textContent;

					

					parancs_el = document.createElement("h3");
					parancs_el.textContent=comanda;

					



					link_el=document.createElement("div");
					link_el.setAttribute('class', 'latest_events, box');
					link_el.setAttribute('style', 'float: left;');
					link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/btn-vote.gif\" alt=\"Vote\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'</a></p></div></div>';


				
				latest.parentNode.insertBefore(link_el, latest);
				//latest.parentNode.insertBefore(ido_el, latest);
			}}})} , 0);});}