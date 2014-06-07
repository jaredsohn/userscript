// ==UserScript==
// @name           Buendniss Verwaltungs-Verlinker pennergame 4.0 by basti1012
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012 
// @description    Unter bande und dann buendnisse sieht man seine verbuendete Banen leider immer un verlinkt . Dieses Script verlinkt die banden und erspart so mit der gang in der Highscore
// @include */gang/pact/*
// ==/UserScript==

var host = window.location.hostname;
for(x=1; x<=100; x++){
try{
var pkt = document.getElementsByName('form1')[1];
var id = pkt.innerHTML.split('<option value="')[x].split('"')[0];
eins(id,x);
}catch(err){
//alert(err)
break;}
}

function eins(id,x){
y=x+Number(2);
var my_td1 = document.getElementsByClassName("tieritemA")[0];
var my_td33 = my_td1.getElementsByTagName("tr")[y];
var name = my_td33.innerHTML.split('<td>')[1].split('</td>')[0];
var my_1 = document.getElementsByClassName("tieritemA")[0];
var my_2 = my_1.getElementsByTagName("tr")[y];
var my_3 = my_2.getElementsByTagName("td")[0];
my_3.innerHTML = '<a href="http://'+host+'/profil/bande:'+id+'/">'+name+'</a>';

}
