// ==UserScript==







// @name           Spekunauten Erweiterung







// @namespace      Spekunauten Erweiterung







// @description    FÃ¼gt Links in Spekunauten hinzu um schneller an Informationen zu kommen







// @include        http://www.spekunauten.de/aktie/*





// @include        http://www.spekunauten.de/mitglied/*/depot





// @include        http://spekunauten.de/aktie/*







// ==/UserScript==















function $$(expr,node){







var result = document.evaluate(expr,node,null,0,null);















var found = [];







    var res;







    while (res = result.iterateNext())







        found.push(res);















    return found;















}







function $(expr){







return $$(expr,document);







}







function $link(text,href,style){







var link = document.createElement("A");







link.appendChild(document.createTextNode(text));







link.href = href;







link.setAttribute("style","padding: 5px;");







link.setAttribute("target","_blank");







return link;







}







function before(item,element)







{







element.parentNode.insertBefore(item,element);







}







function br(){







return document.createElement("BR");







}











if(document.location.href.search("depot") > -1){



var depotwert = $("//table[@class='depotTable']/tbody/tr[last()]/th[last()]")[0];



var aktien = $("//div[@class='formBox' and child::div[@class='spiffyOptions']]//table[@class='depotTable']/tbody/tr/td[last()]");



var calc = 0;



for (var i=0; i < aktien.length;i++){



calc += aktien[i].textContent.match(/[0-9\-,]+/)[0].replace(",",".") * 1;

}



var tr = document.createElement("TR");
tr.appendChild(document.createElement("TH"));
tr.firstChild.appendChild(document.createTextNode("reeller"))
tr.appendChild(document.createElement("TH"));
tr.lastChild.setAttribute("colspan","5");
tr.lastChild.setAttribute("style","text-align: right;");

tr.lastChild.appendChild(document.createTextNode(Math.round(calc *100) / 100 + " EUR | "+ Math.round(((100000 - calc) / -100) * 100) / 1000 +"%"));


depotwert.parentNode.parentNode.appendChild(tr);



depotwert.setAttribute("colspan","3");


depotwert.parentNode.removeChild(depotwert.parentNode.cells[1]);


var zahl = depotwert.textContent.match(/[0-9,]+/)[0].replace(",",".");



depotwert.textContent += " | "+Math.round(((100000 - zahl) / -100) * 100) / 1000 +"%";



}else{





var id = $("//h1")[0].textContent.match(/\((.+)\)/)[1];







var table = $("id('contentTable')//table[@class='linedTable']")[0];







table.lastChild.appendChild(document.createElement("TR"));







table.lastChild.lastChild.setAttribute("class","lt2");







var td = document.createElement("TD");







td.setAttribute("colspan","2");















td.appendChild($link("Finanznachrichten","http://www.finanznachrichten.de/suche/suchergebnis.asp?words="+id,""));







td.appendChild(br());







td.appendChild($link("onVista","http://www.onvista.de/suche.html?TARGET=snapshot&ID_TOOL=STO&SEARCH_VALUE="+id+"&SELECTED_ID=NSIN",""));







td.appendChild(br());







td.appendChild($link("happyYuppie","http://www.happyyuppie.com/cgi-bin/de/search.pl?isin="+id+"&typnr=3",""));







td.appendChild(br());







td.appendChild($link("n-TV","http://www.aktien.n-tv.de/aktie_suche.asp?stSuchText="+id,""));







td.appendChild(br());







td.appendChild($link("Godmode Trader","http://www.godmode-trader.de/search/?search="+id,""));







td.appendChild(br());





td.appendChild($link("newRatings","http://www.newratings.de/main/search_result.m?q="+id,""));









table.lastChild.lastChild.appendChild(td);















var br = $("//div[@class='leftBox']/br")[0];







br.parentNode.removeChild(br);







}