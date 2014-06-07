// ==UserScript==
// @name           Karachan - boardy z Kara+
// @description    Dodaje do górnego paska boardy z Kara+
// @version        1.2
// @namespace      http://userscripts.org/users/324269
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// @include        http://karaplus.ho.am/*
// @include        http://www.karaplus.ho.am/*
// ==/UserScript==

//Znane błędy:
//- Czasamy jebią się linki i tworzy się jebana pętla przeskakująca z anonym.to na ly9.net i z powrotem
//- Przez zabezpieczenie przed linkowaniem kara nie działa link powrotny z karaplus.ho.am

var karaPlusAdres = "http://karaplus.ho.am";
var spacer = "&nbsp;/";

function karaPlusLink(boardName, desc){
  return "<a title='"+desc+"' href='"+karaPlusAdres+"/"+boardName+"'>"+boardName+"</a>";
}

//Chuj wie jak to z tym Harrischanem wykombinować, po dodaniu tej funkcji na Firebugu śmigało ładnie ale na Greasemonkey się jebało

/*function styleSpacer(){
  if(getCookie('kustyle')=='Harrischan'){
    return "<br /><br />"
  } else {
    return "<br />"
  }
}*/

if(document.URL.match('karachan.org')){
  document.getElementById("id_topbar").innerHTML = "<div style='text-align:left;'>" + document.getElementById("id_topbar").innerHTML + "<br /><br />&nbsp;[&nbsp;" + karaPlusLink("retro", "Retro") + spacer + karaPlusLink("jp", "Kultura japońska/azjatycka") + spacer + karaPlusLink("h", "Hentai") + spacer + karaPlusLink("sm", "Shemale") + spacer + karaPlusLink("aka", "Akademia") + "&nbsp;]&nbsp;[&nbsp;" + karaPlusLink("v", "Vidya") + spacer + karaPlusLink("gala", "Sporty") + spacer + karaPlusLink("biz", "Zarabianie") + spacer + karaPlusLink("cats", "Koty") + spacer + karaPlusLink("med", "Medyczny") + spacer + karaPlusLink("sil", "Schlesien") + "&nbsp;]&nbsp;[&nbsp;" + karaPlusLink("k+", "Organizacyjne") + spacer + karaPlusLink("up", "Upload") + "&nbsp;]</div>";
} else if(document.URL.match('karaplus.ho.am')){   
  //moge odpierdalać różne rzeczy z adresem ale to i tak nie powstrzyma zalgowego .htaccess ;_;
  document.body.innerHTML = document.body.innerHTML + "<div style='position:absolute;left:8px;top:28px;' class='adminbar'>[&nbsp;<a href='http://anonym.to/?http://www.karachan.org/b' title='Wróć na Karachan'>karaluch</a>&nbsp;]</div>";
}