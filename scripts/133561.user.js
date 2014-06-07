// ==UserScript==
// @name           koszyk pro NP1
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/*
// @version        1.0.55
// ==/UserScript==



var helpText = '[{"info":"Hej! tu krótki samouczek koszyka pro. Wyczyść tę listę za pomocą polecenia \'Opróżnij koszyk\', ale najpierw doczytaj do końca :)"},{"info":"Nowe profile możesz dodawać za pomocą zielonego plusika przy loginie."},{"info":"Po jego kliknięciu wyświetli się okienko z powódem do wpisania. Zatwierdzamy OK lub enter."},{"info":"Pojedyncze profile można usuwać klikając czerwony krzyżyk w okienku koszyka."},{"info":"Opcja \'Pokaż HTML\' generuje kod gotowy do wklejenia do opisu lub bloga w grupie"},{"info":"jeśli chcemy otrzymać wersję gotową do wklejenia na forum, z menu wybieramy \'Pokaż BB\'"}]'
var poz_ileProfili;
var popup;
var $ = unsafeWindow.$;
if(!$) return;

if (document.getElementById("strona")){	// czy to nie popup?
	dodajNoweMenu();
	if (document.getElementById("profile-grid") != null){  // czy jesteśmy na profilu?
		dodajPrzycisk();
		dodajMenuKontekstowe();
	}
}

function odświeżPopup(){
	popup.document.open();
	var panel = newElem("div");
	var tabelka = newElem("table");
	tabelka.width = "90%";
	tabelka.align = "center";
	tabelka.cellSpacing = 0;
	tabelka.appendChild(nowyWiersz("Profil", "Powód", null, null, true, null));
	for (w=0; w<wpisy().length; w++){
		tabelka.appendChild(nowyWiersz(wpisy()[w]["profil"], wpisy()[w]["info"], wpisy()[w]["av"], w));
	}
	panel.appendChild(tabelka);

	popup.document.write("<head> <style type='text/css'>" + 'a:visited {background-color:transparent;color:#98AEB8;}.k10, h1, h2, a, a:hover, a.k01:hover,a.k21:hover, a.k10:visited {color:#4996BA;} table {font-size:12px;} body {color:#666666;font-family:"Trebuchet MS",Verdana,Arial,sans-serif;font-size:12px;} .b22, h2 {border-color:#DDDDDD;}' + "</style> <title>Koszyk</title></head>");
	popup.document.body = newElem("body");
	popup.document.body.appendChild(newElem("br"));
	popup.document.body.appendChild(panel);
	popup.document.close();
	
}


function pokażPopup(){
	popup = window.open("", "Koszyk", "height=350,width=600,scrollbars=1,resizable=no");
	odświeżPopup();
	popup.window.focus();
}


function pokażHTML(){
	var popup = window.open("", "Wykres", "height=200,width=800,scrollbars=1,resizable=no")
	popup.document.open();
	popup.document.write('<div style="font-size: 8pt; font-family: Courier New">');
	for (w=0; w<wpisy().length; w++){

		if (wpisy()[w]["info"] == ""){
			popup.document.write([w+1] + ' &lt;a href="' + wpisy()[w]["profil"] + '"&gt; &lt;img src="' + wpisy()[w]["av"] + '"&gt; ' + wpisy()[w]["profil"] + '&lt;/a&gt; &lt;br/&gt; <br />');
		}else{
			popup.document.write([w+1] + ' &lt;a href="' + wpisy()[w]["profil"] + '"&gt; &lt;img src="' + wpisy()[w]["av"] + '"&gt; ' + wpisy()[w]["profil"] + '&lt;/a&gt; - ' + wpisy()[w]["info"] + '&lt;br/&gt; <br />');
		}
	}
	popup.document.write('</div>');
	popup.document.close();
	popup.window.focus();
}


function pokażBB(){
	var popup = window.open("", "Wykres", "height=200,width=800,scrollbars=1,resizable=no")
	popup.document.open();
	popup.document.write('<div style="font-size: 8pt; font-family: Courier New">');
	for (w=0; w<wpisy().length; w++){
		var profil_ok = ukryjBluzgi(wpisy()[w]["profil"]);
		if (wpisy()[w]["info"] == ""){
			popup.document.write( [w+1] + " [URL=" + wpisy()[w]["profil"] + "] [IMG]" + wpisy()[w]["av"] + "[/IMG] " + wpisy()[w]["profil"] + "[/URL]<br>");
		}else{
			popup.document.write( [w+1] + " [URL=" + profil_ok + "] [IMG]" + wpisy()[w]["av"] + "[/IMG] " + profil_ok + "[/URL] - " + wpisy()[w]["info"] + "<br>");
		}
	}
	popup.document.write('</div>');
	popup.document.close();
	popup.window.focus();
}


function usuńWpis(e){
	e.target.parentNode.parentNode.style.textDecoration = "line-through";
	e.target.removeEventListener("click", usuńWpis, false);
	var tmp = wpisy();	
	tmp.splice(e.target.id.split("_")[1], 1);
	GM_setValue("koszykPRO", JSON.stringify(tmp));
	poz_ileProfili.innerHTML = "Koszyk (" + (wpisy().length) + ")";
	odświeżPopup();
}


function dodajNoweMenu(){
	var noweMenu = newElem("li");
	noweMenu.className = "right right_dropdown";
    
    poz_div = newElem("div");
    noweMenu.appendChild(poz_div);
    
	poz_ileProfili = newElem("a");
	poz_ileProfili.href = "javascript:void(0)";
	poz_ileProfili.id = "poz_ileProfili";
	poz_ileProfili.innerHTML = "Koszyk (" + (wpisy().length) + ")";
	poz_div.appendChild(poz_ileProfili);

	pozLista = newElem("ul");

	poz1 = newElem("li");
	poz1.innerHTML = "<a href = 'javascript:void(0)'>Pokaż zawartość</a>";
	poz1.addEventListener("click", pokażPopup, false);
	pozLista.appendChild(poz1);

	poz2 = newElem("li");
	poz2.innerHTML = "<a href = 'javascript:void(0)'>Opróżnij koszyk</a>";
	poz2.addEventListener("click", opróżnijKoszyk, false);
	pozLista.appendChild(poz2);

	poz3 = newElem("li");
	poz3.innerHTML = "<a href = 'javascript:void(0)'>Pokaż HTML</a>";
	poz3.addEventListener("click", pokażHTML, false);
	pozLista.appendChild(poz3);
    
	poz4 = newElem("li");
	poz4.innerHTML = "<a href = 'javascript:void(0)'>Pokaż BB</a>";
	poz4.addEventListener("click", pokażBB, false);
	pozLista.appendChild(poz4);

	poz_div.appendChild(pozLista);
	$("#menu").children(":first").append(noweMenu);
	pozLista.style.cssText = "left: " + (noweMenu.offsetLeft + noweMenu.offsetWidth -103) + "px;	";
}


function dodajWpis(url, powód, avatar){
	var było = false;
	var tmp = wpisy();

	for(i=0; i<wpisy().length; i++){
		było = było | (wpisy()[i]["profil"] == url);
		if(było) break;
	}
	if(było){
		alert("ten profil jest już na liście");
	}else{
		tmp.push({profil: url, av: avatar, info: powód});
	}
	GM_setValue("koszykPRO", JSON.stringify(tmp));
}

// używamy tego zamiast zwykłej zmiennej po to, żeby mieć zawsze aktualną wersję bazy, która mogła być zmieniona w innej zakładce
function wpisy(){
	try{		
		return JSON.parse(GM_getValue("koszykPRO", helpText));		
	}catch(e){
		return [];
	}
}


function dodajPrzycisk(){
	var l = $("#obok-av h1");
	if (l != null){		
		var p = newElem("IMG");
		p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB10lEQVQ4jY2SvWsUURTFf3fmfSVhN5FdMSQLFmKhf4OIrYXWStJZaLYUtBCEYCVWVlkby2AvSEolCPYWNhpJoTFqoq5LdrPzZuZamEjIToIHXnM4nHfuvUdijByEMQa5bpeAhQN0R5/FNlVQ1ZEn86l+6X3Q7f6Gbv5eU5lPtUqnqpg8z0cSGAt5OSAvd/9ytvLvfb0ZIZ1TuvEbsdjFph7n9GiDqgTWKcO8z07cYsI2sccZtO6NLAwfIJGEqJFEEnxQpu/KYZfO5iNty+n76PKtZSbdKUziKTTSj11yHfJ55x2zE+cx4hi3U6Riycsh3ewrc0/mWH+gYlyArcE6b7dfIGJIJcWkhu+D94gkfOytcnLsLLHIKcocpWBm/Bwu7I0QPPwYfiKkkyRpQkg8LnWkScZa7xVnapeomQZZkbFbDimLkp/DDYLfM/CBztLLzsKh+Vi8eptIi8ZYg8XnD0eW5wMdAPPmZmwD/1pmjOHCU9HGWIPEtDhhG/gAr2+oVF6hqgc+QN3VCW4GRx0fjrxidQ+cg7qdJUk9ZdHEuWMMqhJYB1mR4WiSFRn2OAMRMcAUMA00gdrFx6zcWb12eV/UXWdFRK4APWAL2AR+qWouqkfX9H/wB9WxyXV1kNA7AAAAAElFTkSuQmCC";
		p.id = "przycisk_dodaj";
		p.title = "dodaj na listę";
		p.style.cursor = "pointer";
		p.style.position = "relative";
		p.style.top = "3px";
		p.style.marginLeft = "4px";
		p.addEventListener("click", pokażMenu, false);
		l.append(p);
	}	
}


function dodajProfil(){
	var login = unsafeWindow.profile_login;
	var powód = $("#f_powód").val();
	var av = unsafeWindow.profile_av_32_url;
	dodajWpis("http://www.fotka.pl/profil/" + login + "/", powód, av);
	$("#koszyk_menu").hide("fast");
	poz_ileProfili.innerHTML = "Koszyk (" + (wpisy().length) + ")";
}


function dodajMenuKontekstowe(){
	var menu = newElem("div");
	menu.id = "koszyk_menu";
	menu.style.cssText = "border: 1px solid rgb(197, 197, 197); padding: 0px 3px 3px; z-index: 101; position: absolute; display: block; width: 18em; background-color: rgb(255, 255, 255); text-align: left; background-image: url(http://www.fotka.pl/img/operacje/menu.gif); background-repeat: no-repeat; display: none;";

	menu.style.top = $("#przycisk_dodaj").offset().top + "px";
	menu.style.left = $("#przycisk_dodaj").offset().left + "px";

	var f_powód = newElem("input");
	f_powód.id = "f_powód";
	f_powód.type = "textbox";
	f_powód.style.fontSize = "10pt";
	f_powód.size = 25;
	f_powód.addEventListener("keypress", czyEnter, false);

	var ok = newElem("input");
	ok.type = "button";
	ok.value = "OK";
	ok.style.fontSize = "10pt";
	ok.addEventListener("click", dodajProfil, false);

	var info = newElem("div");
	info.innerHTML = "<br/><b>Powód:</b><br/>";

	menu.appendChild(info);
	menu.appendChild(f_powód);
	menu.appendChild(ok);

	$("#strona").append(menu);
}


function pokażMenu(){
	$("#przycisk_dodaj").css("display", "none");
	$("#koszyk_menu").css("display", "");
	$("#f_powód").focus();
}


function nowyWiersz(profil, powód, avatar, n, nagłówek){
	var tr = newElem("tr");
	var td = new Array(5);

	for(i=0; i<5; i++){
		td[i] = newElem("td");
		td[i].className = "b22";
		td[i].style.cssText = "padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; ";
		tr.appendChild(td[i]);
	}
    
    if (!powód) { powód = "&nbsp;";}
	td[3].innerHTML = powód;

	if(!nagłówek){
		var przycisk = newElem("IMG");
		przycisk.src = "http://s.fotka.pl/img/operacje/delete.png";
		przycisk.style.cursor = "pointer";
		przycisk.addEventListener("click", usuńWpis, false);
		przycisk.id = "delete_"+n;
		td[4].align = "center";
		td[4].appendChild(przycisk);

		var a = newElem("a");
		a.href = "javascript:void(0);"
		a.addEventListener("click", openInNewWindow, true);
		a.innerHTML = profil;
		td[2].appendChild(a);

		var av = newElem("img");
		av.src = avatar;
		td[1].appendChild(av);
        
        td[0].innerHTML = n+1;

	}else{
		td[2].innerHTML = profil;
        td[4].innerHTML = "Usuń";
        td[0].innerHTML = "Lp";
		for(i=0; i<5; i++){
			td[i].style.cssText = "font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238);";
		}
	}

	return tr;
}


function opróżnijKoszyk(){
	var n = wpisy().length;
	if (n>0){
		if (confirm("Czy na pewno chcesz usuńąć " + n + " profili z koszyka?")){
			GM_setValue("koszykPRO", "[]");
			poz_ileProfili.innerHTML = "Koszyk (0)";
		}
	}
}


function czyEnter(e){
	if (e.keyCode == 13){
		dodajProfil();
	}
}


function newElem(type){
	return document.createElement(type);
}


function openInNewWindow() {
	var newWindow = window.open(this.innerHTML, '_blank');
	return false;
}


function ukryjBluzgi(str){
	var bluzglista = [["kurw","ku_w"], ["kurv","ku_v"], ["chuj","ch_j"], ["pierdal","pie_dal"], ["pierdol","pie_dol"], ["jeb","j_b"], ["pizd","pi_d"], ["huj","h_j"]];

	var oryginalny = str;
	for(i=0; i<bluzglista.length; i++){
		str = str.replace(new RegExp(bluzglista[i][0], "ig"), bluzglista[i][1]);
	}
	str = copyCase(str, oryginalny);
	return str;
}


function copyCase(source, pattern){		// (C)BOZAR 2010
	var out = "";
	for(i=0; i<pattern.length; i++){
		if(pattern.charAt(i) == pattern.charAt(i).toUpperCase()){
			out = out + source.substring(i,i+1).toUpperCase();
		}else{
			out = out + source.substring(i,i+1).toLowerCase();
		}
	}
	return out;
}