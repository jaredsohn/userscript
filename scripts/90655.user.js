// ==UserScript==
// @name           przycisk ok
// @namespace      local
// @include        http://www.fotka.pl/wiadomosci/talk/*
// @copyright      Bozar
// @version        1.0.3
// ==/UserScript==

var counter = GM_getValue("przyciskOK", 0) + 1;

var p = document.createElement("input");
//p.className = "button";
p.type = "submit";
p.style.marginLeft = "2px";
p.value = "Załatwione";
p.addEventListener("click", function(e){
	if(document.getElementById("tresc").value != ""){
		if(confirm("PW zawiera już treść. Czy na pewno chcesz wysłać tylko OK?")){
			document.getElementById("tresc").value = "Twoje zamówienie nr #" + counter + " zostało zrealizowane.";
			GM_setValue("przyciskOK", counter);
		}else{
			e.preventDefault();
		}
	}else{
		document.getElementById("tresc").value = "Twoje zamówienie nr #" + counter + " zostało zrealizowane.";	
		GM_setValue("przyciskOK", counter);
	}
}, false);
	

var gdzie = document.getElementById("nowa_wiadomosc");
//gdzie.parentNode.insertBefore(p, gdzie);
gdzie.appendChild(p);