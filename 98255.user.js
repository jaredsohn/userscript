// ==UserScript==
// @name           pager2
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/profil/*
// @version        1.0.1
// ==/UserScript==



const u = unsafeWindow;
const $ = u.$;
if(!u.entries) return;
var currentPage = 1;
u.pager = true;	// dzięki temu inne modyfikacje wiedzą w jakim trybie pracować
u.currentCommentsPage = 1;


// anulowanie automatycznego doczytywania komentarzy
u.more_entries = function(){};
$("#entries-more").hide();


var panel = newElem("div")
var bPrev = newButton("Poprzednia", pagePrev);
var bNext = newButton("Następna", pageNext);
var pageNrSelect = newElem("select");
pageNrSelect.addEventListener("change", pageSelect, true);
pageNrSelect.style.marginLeft = "4px";
var maxPage = getMaxPage();
for(var i=1; i<=maxPage; i++){
	var o = newElem("option");
	o.innerHTML = i;
	pageNrSelect.appendChild(o);
}
var bReload = newButton("R", pageReload);
var logo = newElem("img");
logo.src = "http://teczka.szatana.eu/pager.png";
logo.alt = "PAGER";
logo.style.top = "3px";
logo.style.position = "relative";
logo.addEventListener("dblclick", config, true);
logo.title = "konfiguracja";
panel.appendChild(logo);
panel.appendChild(bPrev);
panel.appendChild(bNext);
panel.appendChild(pageNrSelect);
panel.appendChild(bReload);
panel.style.textAlign = "center";
panel.style.margin = "4px";


switch(GM_getValue("pozycja", "1")){
	case "1":
		$("#entries-list").before(panel);
		break;
	case "2":
		$("#entries-list").after(panel);
		break;
}


function pageSelect(){
	loadPage(currentPage = parseInt(pageNrSelect.value));
}

function pagePrev(){
	if(currentPage >= 2){
		loadPage(currentPage -= 1);
	}
}

function pageNext(){
	if(currentPage < maxPage){
		loadPage(currentPage += 1);
	}
}

function pageReload(){
	loadPage(currentPage);
}

function loadPage(n){
	$("#entries-list .comments-item").css("opacity", "0.5");
	var loading = $(newElem("div"));
	loading.html("Ładowanie...");
	loading.css({position: "absolute", zIndex: "100", fontSize: "14pt", width: "100%", textAlign: "center", fontWeigth: "bold", color: "black"});
	$("#entries-list div:eq(0)").before(loading);

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.fotka.pl/profil/"+u.profile_login+"/entries.html?page="+n,
		headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		onload: function(e){
			u.currentCommentsPage = currentPage; // dla innych modyfikacji			
			$("#entries-list").html(e.responseText);
			$(document).trigger("commentsChanged");		// nadajemy zmiany stron
			$(pageNrSelect).attr("value", currentPage);
			if (u.usuwanie_moderator) u.new_komentarze_usun_fp_init(u.profile_id); 	// nie ma co usuwać warunku - i tak wam nie zadziała :)
			loading.remove();
		}
	});
}


function newElem(type){
	return document.createElement(type);
}

function newButton(title, event){
	var ret = newElem("input");
	ret.value = title;
	ret.className = ret.type = "button";
	ret.addEventListener("click", event, true);
	ret.style.fontSize = "8pt";
	ret.style.padding = "1px";
	ret.style.marginLeft = "4px";
	return ret;
}

function getMaxPage(){
	var scripts = document.getElementsByTagName("script");
	for(var i=0; i<scripts.length; i++){
		if(scripts[i].innerHTML.length == 0) continue;
		var test = scripts[i].innerHTML.substring(0, 1000).match(/entries\.setCounters\((\d+)\)/);
		if(test != null) return Math.min(100, Math.ceil(parseInt(test[1]) / 10));
	}
	return 1;
}


function config(){
	var res = prompt("W którym miejscu chcesz widzieć przyciski pagera?\n1 - nad komentarzami\n2 - pod komentarzami");
	if(res == null) return;
	if(res == 1 || res == 2){
		GM_setValue("pozycja", res);
		alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
	}else{
		alert("No człowieku... albo 1, albo 2! :P");
	}
}
