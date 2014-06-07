// ==UserScript==
// @name           Wykop poleca
// @namespace      Wykop
// @include        *wykop.pl/
// @include        *wykop.pl/wykopalisko/
// @include        *wykop.pl/wykopalisko/strona/*
// @exclude	*wykop.pl/polecamy/
// ==/UserScript==
maxIloscWykopow=55; //ilosc wykopow ponizej ktorej wykopy rekomendowane na stronie glownej beda ukrywane
maxValue=0; //ilosc wykopow ponizej ktorej wykopy rekomendowane w wykopalisku beda ukrywane
if(document.getElementsByClassName("selected")[0].title=="Strona główna") 
{
maxValue=maxIloscWykopow; 
}
wykopy=document.getElementsByClassName("options");

for(x in wykopy)
{
if(wykopy[x].getElementsByClassName("recommends").length==1)
{
if(wykopy[x].getElementsByClassName("votecount")[0].innerHTML<maxValue || wykopy[x].getElementsByClassName("votecount")[0].innerHTML=="+")
{
wykopy[x].parentNode.parentNode.parentNode.style.display='none';
}
}
}


