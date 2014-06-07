// ==UserScript==
// @name           wykrywacz 3.5 NP
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/profil/*
// @version        3.5.5
// ==/UserScript==


const SERWER = "http://teczka.szatana.eu/"
const $ = unsafeWindow.$;

var wykrywacz_content = document.createElement("div");
var wykrywacz_box = document.createElement("div"); // to jest w tym wyżej. robi cień.
var wykrywacz_napis = document.createElement("a");
var wykrywacz_strzałka = document.createElement("span");


var tr = document.createElement("tr");
var td1 = document.createElement("td");
var td2 = document.createElement("td");
var s = document.createElement("span");


td1.className = "textColorLightNormalSize";
td1.appendChild(s);
s.style.backgroundImage = "url('http://wykrywacz.szatana.eu/wykr-ico.png')";
s.className = "icos16";
s.style.height = "17px";
s.style.width = "22px";
tr.appendChild(td1);
tr.appendChild(td2);
$("#profile-info div.container table tbody").prepend(tr);

wykrywacz_content.id = "wykrywacz_content";
wykrywacz_content.style.backgroundColor = "white";
wykrywacz_content.style.fontSize = "8pt";

wykrywacz_box.id = "wykrywacz_box";
wykrywacz_box.style.border = "4pt solid rgba(0,100,220,0.2)";
wykrywacz_box.style.display = "none";
wykrywacz_box.style.width = "220px";
wykrywacz_box.style.position = "absolute";
wykrywacz_box.style.zIndex = "101";
wykrywacz_box.style.cssText += " -moz-border-radius: 8px";
wykrywacz_box.appendChild(wykrywacz_content);

wykrywacz_strzałka.id = 'wykrywacz_strzałka';
wykrywacz_strzałka.innerHTML = "►";

wykrywacz_napis.id = "wykrywacz_napis";
wykrywacz_napis.style.cursor = "pointer";
wykrywacz_napis.style.color = "inherit";
wykrywacz_napis.style.textDecoration = "none";
wykrywacz_napis.style.fontWeight = "bold";
wykrywacz_napis.href = 'javascript:void(0)';
wykrywacz_napis.innerHTML = "Wykrywacz ";
wykrywacz_napis.appendChild(wykrywacz_strzałka);

// modyfikujemy stronę
var css = document.createElement("link");
css.rel = "stylesheet"
css.type = "text/css"
css.href = (GM_getValue("css", "")=="") ? (SERWER+"/wykrywacz.css") : GM_getValue("css");
document.getElementsByTagName("head")[0].appendChild(css);
document.body.addEventListener("click", function(){ wykrywacz_box.style.display = "none"; }, true);
document.body.appendChild(wykrywacz_box);
GM_registerMenuCommand("Wykrywacz: zmień styl CSS", config);

// doklejamy wykrywacz
td2.appendChild(wykrywacz_napis);

// zapytanie
GM_xmlhttpRequest({
	method: "GET",
	url: SERWER+"wykrywacz-3.5.1.php?login="+unsafeWindow.profile_login+"&"+GM_getValue("extra",""),
	onload: obsługaDanychZwrotnych
});


function obsługaDanychZwrotnych(resp){
		wykrywacz_napis.addEventListener("click", function(e){
		wykrywacz_box.style.display = "block";
		var pos = $(wykrywacz_napis).offset();
		wykrywacz_box.style.left = pos.left + 100 + "px";
		wykrywacz_box.style.top =  pos.top + "px";
		mrugaj(false);
		//e.stopPropagation();
	}, true);
	try{
		var dane = JSON.parse(resp.responseText);
		wykrywacz_content.innerHTML = dane["html"];
		setTimeout(function(){eval(dane["js"])}, 1000);
		wykrywacz_strzałka.innerHTML = "►";
		//if (dane["kol_menu"]) wykrywacz_napis.style.color = dane["kol_menu"] + " !important";	//override
		wykrywacz_napis.style.color = wykrywacz_strzałka.style.color = dane["kol_strzałki"];
		if (dane["kol_strzałki"] == "red") mrugaj(true);
	}catch(e){
		wykrywacz_content.innerHTML = "Niezrozumiała odpowiedź serwera";
		wykrywacz_napis.style.textDecoration = "line-through";
	}
}


function mrugaj(b){
	if(b){
		document.getElementById("profile-avatar").style.cssText = "border: 4px solid red !important";
		mrugaj.timer = setInterval(function(){
			mrugaj.stan = !mrugaj.stan;
			wykrywacz_strzałka.style.visibility = (mrugaj.stan ? "visible" : "hidden");
			document.getElementById("profile-avatar").style.cssText = "border: 4px solid "+(mrugaj.stan?"crimson":"red")+" !important";
		}, 250);
	}else{
		clearInterval(mrugaj.timer);
		wykrywacz_strzałka.style.visibility = "visible";
	}
}


function config(){
	var res = prompt("Podaj pełny adres URL do stylu CSS, którego ma używać wykrywacz.\nPozostaw pole puste, jeśli chcesz używać domyślnego stylu.", GM_getValue("css", ""));
	if(res != null){
		GM_setValue("css", res);
		alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
	}
}