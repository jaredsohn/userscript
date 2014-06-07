// ==UserScript==
// @name           menu górne
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/*
// @version        1.2
// ==/UserScript==

var $ = unsafeWindow.$;
if(!$) return;

if (document.getElementById("content")){	// czy to nie popup?
    dodajMenuGorne();
}

function dodajMenuGorne(){
    if ((pozMenu().length) > 0){
        for (w=0; w<pozMenu().length; w++){
            var noweMenu = newElem("div");
            noweMenu.className = "header-menu-item";
            noweMenu.style.cssText = "margin-left: 20px;";
            var a = newElem("a");
            a.href = pozMenu()[w]["link"];
            a.innerHTML = pozMenu()[w]["nazwa"];
            a.className = "grey-link" ;
            a.style.cssText = "margin-left:0;";
            noweMenu.appendChild(a);
            $("#pw-counter").before(noweMenu);
            
            var tmp = document.getElementById('header-logo');
            tmp.style.top = '12px';
            tmp.style.position = 'relative';

        }
    }
    var czyUstawienia = document.location.href.match(/ustawienia\/\w+/); //Wykonujemy tylko na podstronie konfiguracji... doklejamy do menu
    if (czyUstawienia) {
        var liKonf = newElem("li");
        var aKonf = newElem("a");
        aKonf.href = "javascript:void(0)";
        aKonf.addEventListener("click", pokazKonfig, false);
        aKonf.innerHTML = "Konfiguracja menu";
        liKonf.appendChild(aKonf);
        $("#two-column-left-menu").append(liKonf);
        var divKonf = newElem("div");
        divKonf.className = "left-menu-separator";
        $("#two-column-left-menu").append(divKonf);
    };
}

function pokazKonfig(){
    //<div class="fotkaLightBoxObscure">
    var div1 = newElem("div");
    div1.id = 'pwObscure';
    div1.setAttribute('class', 'fotkaLightBoxObscure');
    //<div id="pwContainer" class="fotkaLightBoxContainer pwclass" style="top: 40px;"> 
    var div2 = newElem("div");
    div2.className = "fotkaLightBoxContainer pwclass";
    div2.style.cssText = "top: 40px;";
    div1.appendChild(div2);
    //<div class="fotkaLightBox" style="width: 200px;">
    var div3 = newElem("div");
    div3.className = "fotkaLightBox";
    div3.style.cssText = "width: 800px;";
    div2.appendChild(div3);
    //<div id="fotkaLightBoxClose" class="icos24"></div>
    var div4 = newElem("div");
    div4.id = "fotkaLightBoxClose";
    div4.className = "sprites ico-lightbox-close";
    div4.addEventListener('click', function(){unsafeWindow.document.body.removeChild(div1);}, false);
    div3.appendChild(div4);
    //<div class="fotkaLightBorder">
    var div5 = newElem("div");
    div5.className = "fotkaLightBorder";
    div3.appendChild(div5);
    //<div id="pwBox" class="fotkaLightContent" style="padding: 20px;">
    var div6 = newElem("div");
    div6.className = "fotkaLightContent";
    div6.style.cssText = "padding: 20px;";
    div5.appendChild(div6);
    
    //tutaj zrobimy petle wyswietlajaca pozycje menu
    if ((pozMenu().length) > 0){
        var tabelka = newElem("table");
        tabelka.align = "center";
        tabelka.cellSpacing = 0;
        tabelka.appendChild(nowyWierszX("Nazwa", "Link", null, true));
        
        for (w=0; w<pozMenu().length; w++){
            tabelka.appendChild(nowyWierszX(pozMenu()[w]["nazwa"], pozMenu()[w]["link"], w));
        }
        div6.appendChild(tabelka);
        
    }
    
    //guziki na dodanie nowego
    //<input type="button" value="Dodaj" class="button" style="font-size: 8pt; padding: 1px; margin-left: 4px;">
    var inputKonf = newElem("input");
    inputKonf.value = " Dodaj pozycję menu ";
    inputKonf.className = inputKonf.type = "button";    
    inputKonf.style.fontSize = "8pt";
    inputKonf.style.padding = "1px";
    inputKonf.style.marginLeft = "4px"; 
    inputKonf.style.marginTop = "20px"; 
    inputKonf.addEventListener("click", dodajPozMenu, false);
    div6.appendChild(inputKonf);
    
    unsafeWindow.document.body.appendChild(div1);                     
    
};

function nowyWierszX(nazwa, link, n, naglowek){
    var tr = newElem("tr");
    var td = new Array(4);
    for(i=0; i<4; i++){
        td[i] = newElem("td");
        td[i].className = "b22";
        td[i].style.cssText = "padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; ";
        tr.appendChild(td[i]);
    }
    
    if (!link) { link = "&nbsp;";}
    if(!naglowek){
        td[0].innerHTML = n+1;
        td[1].innerHTML = nazwa;
        
        var a = newElem("a");
        a.href = "javascript:void(0);"
        a.addEventListener("click", openInNewWindow, false);
        a.innerHTML = link;
        td[2].appendChild(a);
        
        var przycisk = newElem("IMG");
        przycisk.src = "http://s.fotka.pl/img/operacje/delete.png";
        przycisk.style.cursor = "pointer";
        przycisk.addEventListener("click", usuńPozMenu, false);
        przycisk.id = "delete_"+n;
        td[3].align = "center";
        td[3].appendChild(przycisk);
        
        td[1].style.overflow = td[2].style.overflow = "hidden";
        td[1].style.maxWidth = td[2].style.maxWidth = "350px";
        
    }else{
        td[0].innerHTML = "Lp";
        td[1].innerHTML = nazwa;
        td[2].innerHTML = link;
        td[3].innerHTML = "Usuń";
        
        for(i=0; i<4; i++){
            td[i].style.cssText = "font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238);";
        }
    }
    return tr;
}

function dodajPozMenu(){
    //http://www.fotka.pl/forum/humor/
    var nazwa = prompt("Podaj wyświetlaną nazwę w menu.\n np.Forum humor");
    if(nazwa == null || nazwa == "") return;
    if(nazwa != null || nazwa != ""){
        var link = prompt("Podaj link do menu.\n np. http://www.fotka.pl/forum/humor/")
        if(link == null || link == "") return;
        if(link != null || link != ""){
            var tmp = pozMenu();
            tmp.push({nazwa: nazwa, link: link});
            GM_setValue("menuGorne", JSON.stringify(tmp));
            alert("Ustawienia zapisane. Proszę odświeżyć stronę");
            var xxx = document.getElementById("pwObscure");
            unsafeWindow.document.body.removeChild(xxx);
            pokazKonfig();
        }
    }
}

function usuńPozMenu(e){
    e.target.parentNode.parentNode.style.textDecoration = "line-through";
    e.target.removeEventListener("click", usuńPozMenu, false);
    var tmp = pozMenu();	
    tmp.splice(e.target.id.split("_")[1], 1);
    GM_setValue("menuGorne", JSON.stringify(tmp));
    var xxx = document.getElementById("pwObscure");
    unsafeWindow.document.body.removeChild(xxx);
    pokazKonfig();
}

function newElem(type){
    return document.createElement(type);
}

function openInNewWindow() {
    var newWindow = window.open(this.innerHTML, '_blank');
    return false;
}

// używamy tego zamiast zwykłej zmiennej po to, żeby mieć zawsze aktualną wersję bazy, która mogła być zmieniona w innej zakładce
function pozMenu(){
    try{
        return JSON.parse(GM_getValue("menuGorne"));
    }catch(e){
        return [];
    }
}
