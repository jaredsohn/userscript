// ==UserScript==
// @name           koszyk Sprawdzacz
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/*
// @version        1.0.5
// ==/UserScript==



var helpText = '[{"info":"hej! tu krótki samouczek koszyka pro. wyczyść tą listę za pomocą polecenia Opróżnij, ale najpierw doczytaj do końca :)"},{"info":"nowe profile możesz dodawać za pomocą zielonego plusika przy loginie"},{"info":"po jego kliknięciu wyświetli się okienko z powódem do wpisania. zatwierdzamy OK lub enter"},{"info":"pojedyncze profile można usuwać klikając czerwony krzyżyk w okienku koszyka"},{"info":"opcja Pokaż HTML generuje kod gotowy do wklejenia do opisu lub bloga w grupie"},{"info":"jeśli chcemy otrzymać wersję gotową do wklejenia na forum, z menu wybieramy Pokaż BB"}]'
var poz_ileProfili;
var popup;
var $ = unsafeWindow.$;
if(!$) return;

if (document.getElementById("strona")){	// czy to nie popup?
	dodajNoweMenu();
	if (document.getElementById("profile-info") != null){  // czy jesteśmy na profilu?
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
	tabelka.appendChild(nowyWiersz("Profil", "Powód", null, null, true));
	for (w=0; w<wpisy().length; w++){
		tabelka.appendChild(nowyWiersz(wpisy()[w]["profil"], wpisy()[w]["info"], wpisy()[w]["av"], w));
	}
	panel.appendChild(tabelka);

	popup.document.write("<head> <style type='text/css'>" + 'a:visited {background-color:transparent;color:#98AEB8;}.k10, h1, h2, a, a:hover, a.k01:hover,a.k21:hover, a.k10:visited {color:#4996BA;} table {font-size:12px;} body {color:#666666;font-family:"Trebuchet MS",Verdana,Arial,sans-serif;font-size:12px;} .b22, h2 {border-color:#DDDDDD;}' + "</style> <title>Sprawdzacz</title></head>");
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
			popup.document.write( '&lt;a href="' + wpisy()[w]["profil"] + '"&gt; &lt;img src="' + wpisy()[w]["av"] + '"&gt ' + wpisy()[w]["profil"] + '&lt;/a&gt; &lt;br/&gt; <br/> ');
		}else{
			popup.document.write( '&lt;a href="' + wpisy()[w]["profil"] + '"&gt; &lt;img src="' + wpisy()[w]["av"] + '"&gt ' + wpisy()[w]["profil"] + '&lt;/a&gt; - ' + wpisy()[w]["info"] + '&lt;br/&gt; <br/> ');
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
			popup.document.write( "[URL=" + wpisy()[w]["profil"] + "][IMG]" + wpisy()[w]["av"] + "[/IMG] " + wpisy()[w]["profil"] + "[/URL]<br>");
		}else{
			popup.document.write( "[URL=" + profil_ok + "][IMG]" + wpisy()[w]["av"] + "[/IMG] " + profil_ok + "[/URL] - " + wpisy()[w]["info"] + "<br>");
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
	noweMenu.className = "right";
	poz_ileProfili = newElem("a");
	poz_ileProfili.href = "javascript:void(0)";
	poz_ileProfili.id = "poz_ileProfili";
	poz_ileProfili.innerHTML = "Koszyk (" + (wpisy().length) + ")";
	poz_ileProfili.addEventListener("mouseover", rozwińMenu, true);
	poz_ileProfili.addEventListener("mouseout", zwińMenu, false);

	noweMenu.appendChild(poz_ileProfili);
	pozLista = newElem("ul");
	pozLista.id = "pozLista";

	pozLista.addEventListener("mouseover", rozwińMenu, true);
	pozLista.addEventListener("mouseout", zwińMenu, false);

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

	noweMenu.appendChild(pozLista);
	$("#menu").children(":first").append(noweMenu);
	pozLista.style.cssText = "left: " + (noweMenu.offsetLeft-6) + "px;	";
}


function rozwińMenu(){
	$("#pozLista").css("visibility", "visible");
	$("#poz_ileProfili").css("background:transparent url(http://s.fotka.pl/img/javascript_menu.1.png) repeat scroll -6px -50px; color:#3E8DB2;");
}


function zwińMenu(){
	$("#pozLista").css("visibility", "hidden");
	$("#poz_ileProfili").css("border-right:1px solid transparent; color:#FFFFFF;");
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
	var l = $("#profile-info h1");
	if (l != null){		
		var p = newElem("IMG");
		p.src = "http://i43.tinypic.com/35isy2o.gif";
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
	var av; 
		
	var id0 = unsafeWindow.profile_id.toString();
	var ret = "http://av.fotka.pl/av_users/";
	while(id0.length<8) id0 = "0" + id0;

	ret += id0.substring(0,2) + "/" + id0.substring(2,5) + "/";
	ret += unsafeWindow.profile_id + "_32.jpg";
	
	var avURL = $("#profile-avatar").find("img").attr("src");

	GM_xmlhttpRequest({
		method: "GET",
		url: ret,
		headers: {"Content-Type" : "text/html; charset=UTF-8"} ,
		onload: function(resp){				
					if(resp.status == 404){						
						av = avURL.replace("_160","_32");
					}else{
						av = ret;					
					}
					if(!av.match("brak")) av = av.replace(/\.\d+\.jpg/, ".jpg");
					dodajWpis("http://www.fotka.pl/profil/" + login + "/", powód, av);
					$("#koszyk_menu").hide("fast");
					poz_ileProfili.innerHTML = "Koszyk (" + (wpisy().length) + ")";
				}
			});
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
	var td = new Array(4);

	for(i=0; i<4; i++){
		td[i] = newElem("td");
		td[i].className = "b22";
		td[i].style.cssText = "padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; ";
		tr.appendChild(td[i]);
	}

	td[2].innerHTML = powód;

	if(!nagłówek){
		var przycisk = newElem("IMG");
		przycisk.src = "http://s.fotka.pl/img/operacje/delete.png";
		przycisk.style.cursor = "pointer";
		przycisk.addEventListener("click", usuńWpis, false);
		przycisk.id = "delete_"+n;
		td[3].align = "center";
		td[3].appendChild(przycisk);

		var a = newElem("a");
		a.href = "javascript:void(0);"
		a.addEventListener("click", openInNewWindow, true);
		a.innerHTML = profil;
		td[1].appendChild(a);

		var av = newElem("img");
		av.src = avatar;
		td[0].appendChild(av);


	}else{
		td[1].innerHTML = profil;
		for(i=0; i<4; i++){
			td[i].style.cssText = "font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238);";
		}
		td[3].innerHTML = "Usuń";
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