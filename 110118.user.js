//
// ==UserScript==
// @name           Shooty na hlavnej stránke SME
// @version        1.1
// @description    V1.1 - Karikatúra sa zobrazí na vrchu hlavnej stránky.
// @include        http://*sme.sk/*
// ==/UserScript==
	var shootylink = document.getElementById("shooty_hs_img");
        var shootyimg = shootylink.src;
        shootyimg = shootyimg.replace("_tab2", "");
        if(shootyimg.length == 0)
		return; 
        var obsah = document.getElementById("contentw");

	if (obsah != 0) { 
        var obrazok = document.createElement('img');
        obrazok.setAttribute("src", shootyimg);
		var odkaz = document.createElement('a');
		odkaz.setAttribute("onclick", "hideshooty()");
		odkaz.setAttribute("id", "vypnut");
		odkaz.appendChild(obrazok);
		var div = document.createElement('div');
        div.setAttribute("id", "shootydiv");
		div.appendChild(odkaz);
		var div2 = document.createElement('div');
		var odkaz2 = document.createElement('a');
		odkaz2.innerHTML = "Zobraziť karikatúru";
		odkaz2.setAttribute("onclick", "showshooty()");
		div2.appendChild(odkaz2);
        obsah.insertBefore(div, obsah.firstChild);
		obsah.insertBefore(div2, obsah.firstChild);
		odkaz.addEventListener('click', hideshooty, false);
		odkaz2.addEventListener('click', showshooty, false);
		if (GM_getValue("shooty_url") == shootyimg) { 
			hideshooty();
		}
		else {
			showshooty();
		}
	}
function hideshooty() 
{
	div.style.display="none";
	div2.style.display="inline";
	GM_setValue("shooty_url", shootyimg);
}
function showshooty() 
{
	div.style.display="inline";
	div2.style.display="none";
	GM_setValue("shooty_url", "");
}

