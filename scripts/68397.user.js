// ==UserScript==
// @name		Rozkazy PERUN
// @version		0.02
// @description	Aktualne rozkazy dotyczace jadnostki PERUN
// @author		piotrek78
// @namespace	piotrek78
// @include     http://www.erepublik.com/en
// @include     http://www.erepublik.com/pl
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow
// modified by carbon ;)
// modified for PERUN by piotrek78



GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://egovstats.com/rozkazy/50.txt',

	onload:function(responseDetails){
			if(responseDetails.status == 200)
			{
				//sa rozkazy oddziału
				//format: data|rozkazy|link
				var tags = responseDetails.responseText.split('|');
				var comanda = tags[1];
				var link = tags[2];
				var ido = tags[0];

				latest=document.getElementById('latestnews');

				parancs_el = document.createElement("h3");
				parancs_el.textContent=comanda;

				titlu_el=document.createElement("div");
				titlu_el.setAttribute('class', 'title, box');
				titlu_el.setAttribute('style', 'float: left;');
				titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Oficjalne rozkazy PERUN:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>';



				link_el=document.createElement("div");
				link_el.setAttribute('class', 'latest_events, box');
				link_el.setAttribute('style', 'float: left;');
				link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"http://img145.imageshack.us/img145/1523/logoee.jpg\" alt=\"Region under attack\"/></div><div class=\"holder\"><p><a href=\"'+link+'\">'+comanda+'</a></p><p>'+ ido +'</p></div></div>';

				ido_el=document.createElement("h3");
				ido_el.textContent ='Data publikacji: ' + ido;

				latest.parentNode.insertBefore(titlu_el, latest);
				latest.parentNode.insertBefore(link_el, latest);
				//latest.parentNode.insertBefore(ido_el, latest);

			}
		}
	}
);
