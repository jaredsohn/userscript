// ==UserScript==
// @name        Ranking Strona 1 SORTUJ DOSTEPNOSCIA ATAKU
// @namespace   http://mega.szajb.us/juenizer/
// @description Pierwsza strona rankingu jest sortowana wedlug czasu do ataku, od mozliwego do najdluzszego czasu czekania
// @include     http://*.bloodwars.*/?a=rank&page=1
// @include     http://*.bloodwars.*/?a=rank
// @version     1
// ==/UserScript==


table = document.getElementsByClassName('rank')[0];
poz = table.getElementsByTagName('tr');
nowe = new Array();
for (x=1; x<poz.length; x++) {
	nowe[x-1]=new Array(10);
	td = poz[x].getElementsByTagName('td');
	yes = td[4].getElementsByTagName('img')[0].alt;
	if (yes<0 || yes>8) yes=9;
	nowe[x-1][0]=yes;
	nowe[x-1][9]=td[0].innerHTML;
	if (td[0].innerHTML.length==3) nowe[x-1][1]=td[0].innerHTML; else nowe[x-1][1]='0'+td[0].innerHTML; 
	nowe[x-1][2]=td[1].innerHTML;
	nowe[x-1][3]=td[2].innerHTML;
	if (td[3].innerHTML=="M") nowe[x-1][4]='<span style="color: #006BAD;">'+td[3].innerHTML+'</span>';
	else nowe[x-1][4]='<span style="color: #AD00A5;">'+td[3].innerHTML+'</span>';
	nowe[x-1][5]=td[4].innerHTML;
	nowe[x-1][6]=td[5].innerHTML;
	nowe[x-1][7]=td[6].innerHTML;
	nowe[x-1][8]=td[7].innerHTML;
}
nowe.sort();
table.innerHTML='<tr class="tblheader"><td width="60">MIEJSCE</td><td width="160">NICK</td><td width="120">RASA</td><td width="50">SEX</td><td><img src="http://r12.bloodwars.interia.pl/gfx/msg3.gif" alt="NAPADNIJ"></td><td width="80">ADRES</td><td width="90">KLAN</td><td width="70">PUNKTY</td></tr>';
for (x=0; x<nowe.length; x++) {
	if (x%2==0) even="even"; else even="";
	table.innerHTML+='<tr class="'+even+'" onmouseover="this.className=\'selectedItem\';" onmouseout="this.className=\''+even+'\';" align="center"><td class="townview" style="text-align: center;">'+nowe[x][9]+'</td><td>'+nowe[x][2]+'</td><td>'+nowe[x][3]+'</td><td>'+nowe[x][4]+'</td><td>'+nowe[x][5]+'</td><td>'+nowe[x][6]+'</td><td>'+nowe[x][7]+'</td><td>'+nowe[x][8]+'</td></tr>';
}
