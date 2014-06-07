// ==UserScript==
// @name           koszyk Nowa Fotka
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/*
// @version        5.0
// ==/UserScript==
var helpText = '[{"info":"Hej! tu krótki samouczek koszyka pro. Wyczyść tę listę za pomocą polecenia \'Opróżnij koszyk\', ale najpierw doczytaj do końca :)"},{"info":"Nowe profile możesz dodawać za pomocą zielonego plusika przy loginie."},{"info":"Po jego kliknięciu wyświetli się okienko z powódem do wpisania. Zatwierdzamy OK lub enter."},{"info":"Pojedyncze profile można usuwać klikając czerwony krzyżyk w okienku koszyka."},{"info":"Opcja \'Pokaż HTML\' generuje kod gotowy do wklejenia do opisu lub bloga w grupie"},{"info":"jeśli chcemy otrzymać wersję gotową do wklejenia na forum, z menu wybieramy \'Pokaż BB\'"}]'
var poz_ileProfili;
var popup;
var $ = unsafeWindow.$;
if(!$) return;
if (document.getElementById("content")){	// czy to nie popup?
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
    unsafeWindow.document.body.removeChild(koszyk_popup_div);
    popup = window.open("", "Koszyk", "height=350,width=600,scrollbars=1,resizable=no");
    odświeżPopup();
    popup.window.focus();
}
function pokażHTML(){
    unsafeWindow.document.body.removeChild(koszyk_popup_div);
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
    unsafeWindow.document.body.removeChild(koszyk_popup_div);
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
    poz_ileProfili.innerHTML = wpisy().length;
    odświeżPopup();
}
function dodajNoweMenu(){
    var noweMenu = newElem("div");
    noweMenu.id = "menu-koszyk";
    noweMenu.className = "header-menu-item";
    
    var span1 = newElem("span");
    noweMenu.appendChild(span1);
    
    var span2 = newElem("span");
    if (wpisy().length >99) {
        span2.className = "pill-widget pill-widget-red";
    } else {
        span2.className = "pill-widget pill-widget-gray";
    }
    span1.appendChild(span2);
    
    var span3 = newElem("span");
    span3.className = "sprites pill-widget-begin";
    span2.appendChild(span3);
    
    poz_ileProfili = newElem("span");
    poz_ileProfili.className = "pill-widget-value";
    poz_ileProfili.innerHTML = wpisy().length;
    poz_ileProfili.id = "poz_ileProfili";
    span3.appendChild(poz_ileProfili);
    
    var span5 = newElem("span");
    span5.className = "sprites pill-widget-end";
    span2.appendChild(span5);
    
    var a = newElem("a");
    a.href = "javascript:void(0)";
    a.addEventListener("click", pokazMenuGorne, false);
    a.innerHTML = "Koszyk";
    a.className = "k20" ;
    a.style.cssText = "margin-left:0;";
    noweMenu.appendChild(a);
    $("#pw-counter").before(noweMenu);
    
    var div1 = newElem("div");
    div1.className = "sprites-menu header-menu-separator-big";
    $("#pw-counter").before(div1);
}

function pokazMenuGorne(){
    koszyk_popup_div = newElem('div');
    koszyk_popup_div.id = 'pwObscure';
    koszyk_popup_div.setAttribute('class', 'fotkaLightBoxObscure');
    
    koszyk_popup_div.innerHTML = '<div id="pwContainer" class="fotkaLightBoxContainer pwclass" style="top: 40px;">\
                                    <div class="fotkaLightBox" style="width: 200px;">\
                                      <div id="fotkaLightBoxClose" class="icos24"></div>\
                                      <div class="fotkaLightBorder">\
                                        <div id="pwBox" class="fotkaLightContent" style="padding: 20px;">\
                                          <div style="font-size: 17px;">Koszyk ('+wpisy().length+')</div><br>\
                                            - <a href="javascript:void(0)" id="Koszyk_pokaz">Pokaż zawartość</a><br>\
                                            - <a href="javascript:void(0)" id="Koszyk_oproznij">Opróżnij koszyk</a><br>\
                                            - <a href="javascript:void(0)" id="Koszyk_HTML">Pokaż HTML</a><br>\
                                            - <a href="javascript:void(0)" id="Koszyk_BB">Pokaż BB</a><br>\
                                          </div>\
                                        </div>\
                                      </div>\
                                    </div>';
    unsafeWindow.document.body.appendChild(koszyk_popup_div);                     
    
    koszyk_popup_div_exit = document.getElementById('fotkaLightBoxClose');
    koszyk_popup_div_exit.addEventListener('click', function(){unsafeWindow.document.body.removeChild(koszyk_popup_div);}, false);
    koszyk_pokaz = document.getElementById('Koszyk_pokaz');
    koszyk_pokaz.addEventListener("click", pokażPopup, false);
    koszyk_oproznij = document.getElementById('Koszyk_oproznij');
    koszyk_oproznij.addEventListener("click", opróżnijKoszyk, false);
    koszyk_HTML = document.getElementById('Koszyk_HTML');
    koszyk_HTML.addEventListener("click", pokażHTML, false);
    koszyk_BB = document.getElementById('Koszyk_BB');
    koszyk_BB.addEventListener("click", pokażBB, false);
};


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
    poz_ileProfili.innerHTML = wpisy().length;
}
function dodajMenuKontekstowe(){
    var menu = newElem("div");
    menu.id = "koszyk_menu";
    menu.style.cssText = "border: 1px solid rgb(197, 197, 197); padding: 0px 3px 3px; z-index: 101; position: fixed; display: block; background-color: rgb(255, 255, 255); text-align: left; background-image: url(http://www.fotka.pl/img/operacje/menu.gif); background-repeat: no-repeat; display: none;";
    menu.style.top = $("#przycisk_dodaj").offset().top + "px";
    menu.style.left = $("#przycisk_dodaj").offset().left + "px";
    var f_powód = newElem("input");
    f_powód.id = "f_powód";
    f_powód.type = "textbox";
    f_powód.size = 25;
    f_powód.addEventListener("keypress", czyEnter, false);
    var ok = newElem("input");
    ok.type = "button";
    ok.value = "OK";
    ok.style.cssFloat = "none";
    ok.className = "voteAdd eleven";
    ok.addEventListener("click", dodajProfil, false);
    var info = newElem("div");
    info.innerHTML = "<br/><b>Powód:</b><br/>";
    menu.appendChild(info);
    menu.appendChild(f_powód);
    menu.appendChild(ok);
    $("#content").append(menu);
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
    unsafeWindow.document.body.removeChild(koszyk_popup_div);
    var n = wpisy().length;
    if (n>0){
        if (confirm("Czy na pewno chcesz usuńąć " + n + " profili z koszyka?")){
            GM_setValue("koszykPRO", "[]");
            poz_ileProfili.innerHTML = "0";
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