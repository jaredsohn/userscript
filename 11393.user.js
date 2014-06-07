// ==UserScript==
// @name           ilosc lecacych surowcow(0.77mod)
// @namespace      ilosc lecacych surowcow(0.77mod)
// @description    Skrypt oblicza ilosc lecacych surowcow
// @include        http://*/game/index.php?page=overview&*
// ==/UserScript==

function kropka(wart){
// author: Li-on
	var wynik="";
	wynik+=(wart%1000);
	wart=Math.floor(wart/1000);
	while(wart>=1){
		if(wynik<100) wynik='0'+wynik;
		if(wynik<10) wynik='0'+wynik;
		wynik=(wart%1000)+'.'+wynik;
		wart=Math.floor(wart/1000);
	}
	return wynik;
	
}

var alinks=document.getElementsByTagName("a");
var metal = 0;
var krysztal = 0;
var deuter = 0;
for(i=0;i<alinks.length;i++){
	if(alinks[i].title.indexOf('Transportuj:')!=-1)
	{
		var s_data = alinks[i].title;
		metal+=parseFloat((s_data.substring(20, s_data.search("Krysz")-1)).replace('.','').replace('.','').replace('.','').replace('.',''));
		krysztal += parseFloat((s_data.substring(s_data.search("Krysz")+10, s_data.search("Deut"))).replace('.','').replace('.','').replace('.','').replace('.',''));
		deuter += parseFloat((s_data.substring(s_data.search("Deut")+8)).replace('.','').replace('.','').replace('.','').replace('.',''));
	}
}

var td=document.getElementsByTagName("td");
for(i=0;i<td.length;i++){
	if (td[i].innerHTML.indexOf('Wydarzenia') != -1)
	{
	td[i].innerHTML +=' | Surowce w locie: Metal: '+kropka(metal)+' Krysztal: '+kropka(krysztal)+' Deuter: '+kropka(deuter);
	break;
	}
}