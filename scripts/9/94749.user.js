// ==UserScript==
// @name           DE: NFS Autolog
// @namespace      LWChris
// @description    Übersetzt die NFS Autolog Seiten ins Deutsche
// @include        http://hotpursuit.needforspeed.com/de/autolog/career
// @include        http://hotpursuit.needforspeed.com/de/autolog/career/*
// @include        http://hotpursuit.needforspeed.com/de/autolog/compare
// @include        http://hotpursuit.needforspeed.com/de/autolog/compare/*
// @require        http://userscripts.org/scripts/source/86768.user.js
// ==/UserScript==

if(window.location.href.indexOf("compare")>-1){
	STag(ID("section-content-wrapper"),"h2").innerHTML="Statistik vergleichen";
	STag(ID("users-compared"),"h3").innerHTML="Du";
	if(ID("users-compared-other")){
		STag(ID("compare-another"),"a").innerHTML="Mit anderem Freund vergleichen";
		STag(ID("users-compared-other"),"h3").innerHTML="Dein Freund";
		var E=STag(ID("driver-details"),"td",5);
		E.innerHTML=E.innerHTML.split(" ")[0]+" Meilen";
	}else{
		STag(ID("users-compared-choose"),"a").innerHTML="Wähle einen Freund<br>zum Vergleichen aus";
	};
	STag(SClass(ID("section-content-wrapper"),"choose-modal"),"h3").innerHTML="Wähle einen Freund zum Vergleichen der Statistiken aus";
	var List=SLTag(ID("friends-list"),"a");
	for(a=0;a<List.length;++a){
		List[a].innerHTML=List[a].innerHTML.replace(/Compare Stats/g,"Vergleiche Statistiken");
	};
	var a=4;
}else{
	STag(ID("stats-section"),"a").innerHTML=(window.location.href.indexOf("career/")>-1)?"Mit diesem Freund vergleichen":"Mit einem Freund vergleichen";
	var a=2;
};

// Fahrerdetails
var E=STag(ID("driver-details"),"td",a);
E.innerHTML=E.innerHTML.split(" ")[0]+" Meilen";

// Dienstakte
var Sec=ID("service-record");
STag(Sec,"th",2).innerHTML="Nagelband";
STag(Sec,"th",5).innerHTML="Als Cop gespielte Zeit";
STag(Sec,"th",6).innerHTML="Cop-Wagen freigeschaltet";
STag(Sec,"th",12).innerHTML="Erfolgreiche Nagelbänder";
STag(Sec,"th",13).innerHTML="Erfolgreiche EMPs";
STag(Sec,"th",14).innerHTML="Erfolgreiche Helikopter-Unterstützungen";

// Strafregister
Sec=ID("rap-sheet");
STag(Sec,"th",2).innerHTML="Nagelband";
STag(Sec,"th",5).innerHTML="Als Racer gespielte Zeit";
STag(Sec,"th",7).innerHTML="Racer-Wagen freigeschaltet";
STag(Sec,"th",11).innerHTML="Erfolgreiche Nagelbänder";
STag(Sec,"th",12).innerHTML="Erfolgreiche EMPs";

// Fahr-Meilensteine
var Sec=ID("driving-milestones");
STag(Sec,"th",1).innerHTML="Distanz gesamt";
STag(Sec,"th",2).innerHTML="Distanz im Gegenverkehr";
STag(Sec,"th",3).innerHTML="Distanz im Drift";
STag(Sec,"th",4).innerHTML="Distanz auf Abkürzungen";
STag(Sec,"th",5).innerHTML="Zeit auf Höchstgeschwindigkeit";
STag(Sec,"th",6).innerHTML="Zeit im Windschatten";
STag(Sec,"th",7).innerHTML="Zeit Nitro gezündet";
STag(Sec,"th",8).innerHTML="Nitro-Anzeigen aufgefüllt";
STag(Sec,"th",9).innerHTML="Beinaheunfälle";

// Online-Bericht
var Sec=ID("online-record");
STag(Sec,"th",5).innerHTML="Hot Pursuits gewonnen";
STag(Sec,"th",6).innerHTML="Interceptors gewonnen";
STag(Sec,"th",8).innerHTML="Rennen gewonnen";
STag(Sec,"th",10).innerHTML="Interceptors gewonnen";

var List=SLClass(ID("compare-sections"),"current");
for(a=0;a<List.length;++a){
	List[a].innerHTML=List[a].innerHTML.replace(/miles/g,"Meilen");
};
var List=SLTag(ID("compare-sections"),"td");
for(a=0;a<List.length;++a){
	List[a].innerHTML=List[a].innerHTML.replace(/Complete/g,"Erfüllt").replace(/miles/g,"Meilen");
};