// ==UserScript==
// @name Mn3njalnik jumpmenu integration
// @author Petkotnik
// @description Dodan jumpmenu
// @match http://www.joker.si/mn3njalnik/*
// @include http://www.joker.si/mn3njalnik/*
// ==/UserScript==
form = document.createElement("form");
form.setAttribute("onsubmit", "if(document.jumpmenu.f.value == -1){return false;}");
form.setAttribute("method", "get");
form.setAttribute("name", "jumpmenu");
form.setAttribute("class","jumpmenu");
select = document.createElement("select");
select.setAttribute("onchange","if(this.options[this.selectedIndex].value != -1){ document.location='http://www.joker.si/mn3njalnik/index.php?showforum='+this.options[this.selectedIndex].value;}");
el = [];
el[3] = document.createElement("option");
el[3].setAttribute("value", "31");
el[3].innerHTML = "Joker";
el[4] = document.createElement("option");
el[4].setAttribute("value", "3");
el[4].innerHTML = "&nbsp;&nbsp;|-- Revija Joker";
el[5] = document.createElement("option");
el[5].setAttribute("value", "64");
el[5].innerHTML = "&nbsp;&nbsp;|---- Mn3njalnik";
el[6] = document.createElement("option");
el[6].setAttribute("value", "65");
el[6].innerHTML = "&nbsp;&nbsp;|---- Javka";
el[7] = document.createElement("option");
el[7].setAttribute("value", "32");
el[7].innerHTML = "Mehka in trda roba vseh vrst";
el[8] = document.createElement("option");
el[8].setAttribute("value", "4");
el[8].innerHTML = "&nbsp;&nbsp;|-- Igrovje za PC";
el[9] = document.createElement("option");
el[9].setAttribute("value", "45");
el[9].innerHTML = "&nbsp;&nbsp;|---- Brezmejni onkraj";
el[10] = document.createElement("option");
el[10].setAttribute("value", "46");
el[10].innerHTML = "&nbsp;&nbsp;|---- Starinarnica";
el[11] = document.createElement("option");
el[11].setAttribute("value", "51");
el[11].innerHTML = "&nbsp;&nbsp;|---- Zmajev šupak";
el[12] = document.createElement("option");
el[12].setAttribute("value", "5");
el[12].innerHTML = "&nbsp;&nbsp;|-- Železnina";
el[13] = document.createElement("option");
el[13].setAttribute("value", "42");
el[13].innerHTML = "&nbsp;&nbsp;|---- Frizeraj v Las Vegasu";
el[14] = document.createElement("option");
el[14].setAttribute("value", "52");
el[14].innerHTML = "&nbsp;&nbsp;|---- Čiparna";
el[15] = document.createElement("option");
el[15].setAttribute("value", "54");
el[15].innerHTML = "&nbsp;&nbsp;|---- Camera obscura";
el[16] = document.createElement("option");
el[16].setAttribute("value", "8");
el[16].innerHTML = "&nbsp;&nbsp;|-- Konzolec";
el[17] = document.createElement("option");
el[17].setAttribute("value", "60");
el[17].innerHTML = "&nbsp;&nbsp;|---- Zdej";
el[18] = document.createElement("option");
el[18].setAttribute("value", "59");
el[18].innerHTML = "&nbsp;&nbsp;|---- Retro friki";
el[19] = document.createElement("option");
el[19].setAttribute("value", "21");
el[19].innerHTML = "&nbsp;&nbsp;|---- Drkamož";
el[20] = document.createElement("option");
el[20].setAttribute("value", "6");
el[20].innerHTML = "&nbsp;&nbsp;|-- Programje in ok(n)ovje";
el[21] = document.createElement("option");
el[21].setAttribute("value", "18");
el[21].innerHTML = "&nbsp;&nbsp;|---- Šoferje";
el[22] = document.createElement("option");
el[22].setAttribute("value", "19");
el[22].innerHTML = "&nbsp;&nbsp;|---- DV kotič";
el[23] = document.createElement("option");
el[23].setAttribute("value", "20");
el[23].innerHTML = "&nbsp;&nbsp;|---- Neznančev čošak";
el[24] = document.createElement("option");
el[24].setAttribute("value", "35");
el[24].innerHTML = "&nbsp;&nbsp;|---- Karantena";
el[25] = document.createElement("option");
el[25].setAttribute("value", "57");
el[25].innerHTML = "&nbsp;&nbsp;|---- 7edem";
el[26] = document.createElement("option");
el[26].setAttribute("value", "7");
el[26].innerHTML = "&nbsp;&nbsp;|-- Netki";
el[27] = document.createElement("option");
el[27].setAttribute("value", "41");
el[27].innerHTML = "&nbsp;&nbsp;|-- Mobidik";
el[28] = document.createElement("option");
el[28].setAttribute("value", "30");
el[28].innerHTML = "Umetnost, (fiz)kultura in fekalije";
el[29] = document.createElement("option");
el[29].setAttribute("value", "9");
el[29].innerHTML = "&nbsp;&nbsp;|-- Slikosuk";
el[30] = document.createElement("option");
el[30].setAttribute("value", "24");
el[30].innerHTML = "&nbsp;&nbsp;|---- Japanka";
el[31] = document.createElement("option");
el[31].setAttribute("value", "55");
el[31].innerHTML = "&nbsp;&nbsp;|---- Nizike";
el[32] = document.createElement("option");
el[32].setAttribute("value", "10");
el[32].innerHTML = "&nbsp;&nbsp;|-- Cigu migu";
el[33] = document.createElement("option");
el[33].setAttribute("value", "11");
el[33].innerHTML = "&nbsp;&nbsp;|-- Črkožer";
el[34] = document.createElement("option");
el[34].setAttribute("value", "38");
el[34].innerHTML = "&nbsp;&nbsp;|-- Namiznik";
el[35] = document.createElement("option");
el[35].setAttribute("value", "13");
el[35].innerHTML = "&nbsp;&nbsp;|-- Telovadba";
el[36] = document.createElement("option");
el[36].setAttribute("value", "22");
el[36].innerHTML = "&nbsp;&nbsp;|---- Formulce";
el[37] = document.createElement("option");
el[37].setAttribute("value", "23");
el[37].innerHTML = "&nbsp;&nbsp;|---- Metnoge";
el[38] = document.createElement("option");
el[38].setAttribute("value", "58");
el[38].innerHTML = "&nbsp;&nbsp;|---- Gimnazija";
el[39] = document.createElement("option");
el[39].setAttribute("value", "12");
el[39].innerHTML = "&nbsp;&nbsp;|-- Straniščni humor";
el[40] = document.createElement("option");
el[40].setAttribute("value", "33");
el[40].innerHTML = "Zajebani vsakdanjik";
el[41] = document.createElement("option");
el[41].setAttribute("value", "14");
el[41].innerHTML = "&nbsp;&nbsp;|-- Bela tehnika";
el[42] = document.createElement("option");
el[42].setAttribute("value", "48");
el[42].innerHTML = "&nbsp;&nbsp;|---- Forum";
el[43] = document.createElement("option");
el[43].setAttribute("value", "50");
el[43].innerHTML = "&nbsp;&nbsp;|---- Trola";
el[44] = document.createElement("option");
el[44].setAttribute("value", "56");
el[44].innerHTML = "&nbsp;&nbsp;|---- Frotirka";
el[45] = document.createElement("option");
el[45].setAttribute("value", "15");
el[45].innerHTML = "&nbsp;&nbsp;|-- Vseučilišče";
el[46] = document.createElement("option");
el[46].setAttribute("value", "16");
el[46].innerHTML = "&nbsp;&nbsp;|-- Paritveni brlog";
el[47] = document.createElement("option");
el[47].setAttribute("value", "25");
el[47].innerHTML = "&nbsp;&nbsp;|-- Brum Bruuum";
el[48] = document.createElement("option");
el[48].setAttribute("value", "39");
el[48].innerHTML = "&nbsp;&nbsp;|-- Češpljin drevored";
el[49] = document.createElement("option");
el[49].setAttribute("value", "34");
el[49].innerHTML = "Ustvarjalnost";
el[50] = document.createElement("option");
el[50].setAttribute("value", "26");
el[50].innerHTML = "&nbsp;&nbsp;|-- Rokodelstvo";
el[51] = document.createElement("option");
el[51].setAttribute("value", "27");
el[51].innerHTML = "&nbsp;&nbsp;|-- Mojstri kode";
el[52] = document.createElement("option");
el[52].setAttribute("value", "28");
el[52].innerHTML = "&nbsp;&nbsp;|-- Knjižnica";
el[53] = document.createElement("option");
el[53].setAttribute("value", "49");
el[53].innerHTML = "&nbsp;&nbsp;|---- Dnevokaz 2006";
select.appendChild(el[3]);
select.appendChild(el[4]);
select.appendChild(el[5]);
select.appendChild(el[6]);
select.appendChild(el[7]);
select.appendChild(el[8]);
select.appendChild(el[9]);
select.appendChild(el[10]);
select.appendChild(el[11]);
select.appendChild(el[12]);
select.appendChild(el[13]);
select.appendChild(el[14]);
select.appendChild(el[15]);
select.appendChild(el[16]);
select.appendChild(el[17]);
select.appendChild(el[18]);
select.appendChild(el[19]);
select.appendChild(el[20]);
select.appendChild(el[21]);
select.appendChild(el[22]);
select.appendChild(el[23]);
select.appendChild(el[24]);
select.appendChild(el[25]);
select.appendChild(el[26]);
select.appendChild(el[27]);
select.appendChild(el[28]);
select.appendChild(el[29]);
select.appendChild(el[30]);
select.appendChild(el[31]);
select.appendChild(el[32]);
select.appendChild(el[33]);
select.appendChild(el[34]);
select.appendChild(el[35]);
select.appendChild(el[36]);
select.appendChild(el[37]);
select.appendChild(el[38]);
select.appendChild(el[39]);
select.appendChild(el[40]);
select.appendChild(el[41]);
select.appendChild(el[42]);
select.appendChild(el[43]);
select.appendChild(el[44]);
select.appendChild(el[45]);
select.appendChild(el[46]);
select.appendChild(el[47]);
select.appendChild(el[48]);
select.appendChild(el[49]);
select.appendChild(el[50]);
select.appendChild(el[51]);
select.appendChild(el[52]);
select.appendChild(el[53]);
form.appendChild(select);


kje = document.location.toString();
if(kje.indexOf("showforum") > 0 ){
	elements = document.getElementById("content").getElementsByClassName("topic_controls");
	ul = elements[1].getElementsByClassName("topic_buttons");
	li = document.createElement("li");
	li.appendChild(form);
	ul[0].appendChild(li);
}
else if(kje.indexOf("showtopic") > 0){
	el = document.getElementsByClassName("topic_controls clear ipsPad_top_bottom_half");
	div = document.createElement("div");
	div.setAttribute("style","float:right; padding-top:7px;margin-right:5px;");
	div.appendChild(form);
	el[0].appendChild(div);
}