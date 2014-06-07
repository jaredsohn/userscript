// ==UserScript==
// @name           EuroFotbal+
// @namespace      none
// @description    Zobrazi stranku Eurofotbal.cz bez reklamnich bloku + vice barevne odlisene nove prispevky
// @include        http://www.eurofotbal.cz/*
// @author         Whites (Potty)
// @version        1.0.2
// @date           14.7.2013
// ==/UserScript==

/////////// CHANGELOG //////////////
//----------------------------------
// 1.0.2
//  - oprava vycentrovani stranky
//
// 1.0.1
//  - vycentrovani stranky
//----------------------------------
////////////////////////////////////

if (e = document.getElementsByTagName("div"))
{
	c = e.length;
	for(i = 0; i < c; i++)
	{
		if (e[i].hasAttribute("class")){

			// zmenseni a vycentrovani hlavniho kontejneru
			/*var sirka = screen.width;
			var margin = (sirka - 940) / 2;

			if(e[i].getAttribute("class") == "all"){
				e[i].setAttribute("style", "width: 940px; margin-left:" + margin.toString() + "px");
			}*/

			// skrytí reklam
			if ((e[i].getAttribute("class") == "adsenvelope adstextpad banx-square")
		  		|| (e[i].getAttribute("class") == "adsenvelope adstextpad banx-fullbanner")
		  		|| (e[i].getAttribute("class") == "col-advert")
		  		|| (e[i].getAttribute("class") == "adsenvelope adstextpad banx-bwin_left")
		  		|| (e[i].getAttribute("class") == "adsenvelope adstextvpad banx-top")
			){
				e[i].style.display = "none";
			}

			// barva neprectenych prispevku v diskuzi
			if(e[i].getAttribute("class") == "post last unread" || e[i].getAttribute("class") == "post unread"){
				e[i].style.backgroundColor = "#FFFF99";
			}
		}
	}
}



