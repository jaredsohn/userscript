// ==UserScript==
// @name			Betamax-Filter
// @namespace		http://backsla.sh/betamax
// @description		Фильтрует список провайдеров VOIP по странам и оптимальной цене
// @author			cwamm
// @version			0.0.3
// @include			http://backsla.sh/betamax
// @grant			none
// ==/UserScript==

/*
  This code is free to use and change for all
*/

// Список стран
var land=new Array("Russia (landline)", "Russia (mobile)", "Germany (mobile)", "Belarus (landline)", "Belarus (mobile)");
// НДС (пока не используется)
var vat=0.19;


var provAnzahl=0;
var provList=new Array();

var preise=new Array();
var gesPreis=new Array();
var minPreis=0;

var menu = '';
//alert('Скрипт запущен!!!');


var table = document.getElementsByTagName('table');
//Поиск поставщиков воип
var tr=table[0].getElementsByTagName('tr');
for (i=0; i<tr.length; i++)
{
	var td = tr[i].getElementsByTagName('td');
	if (td.length==2)
	{
		provAnzahl++;
		provList[provAnzahl-1]=new Array();
		provList[provAnzahl-1][0]=td[0].innerHTML;
		provList[provAnzahl-1][1]=td[1].getElementsByTagName('a')[0];
	}
}
//Поиск стран
var tr=table[1].getElementsByTagName('tr');
for (i=0; i<tr.length; i++)
{
	var td = tr[i].getElementsByTagName('td');
	if (td.length==provAnzahl+1)
	{
		for (j=0; j<land.length; j++)
			if (td[0].innerHTML==land[j])
			{
				preise[j]=new Array();
				for (k=0; k<td.length; k++)
					preise[j][k]=td[k].innerHTML;
			}
	}
}
//Вырешивание цены
for (i=1; i<preise[0].length; i++)
{
	gesPreis[i-1]=0;
	for (j=0; j<preise.length; j++)
		gesPreis[i-1]+=parseFloat(preise[j][i]);
		gesPreis[i-1]=Math.round(gesPreis[i-1]*10)/10;
}	
//Нахождение минимальной цены
minPreis=gesPreis[0];
for (i=1; i<gesPreis.length; i++)
	if (gesPreis[i]<minPreis)
		minPreis=gesPreis[i];
//Подготовка таблицы
menu+='<table border="1"';
//dir=[ltr|rtl]
menu+='<tr>';
menu+='<td>'+'Anbieter'+'</td>';
for (i=0; i<provList.length; i++)
//	menu+='<td style="-moz-transform:rotate(-90deg); max-width:25px; overflow:visible; width:25px; height:50px;">'+provList[i][0]+'</td>';
	menu+='<td style="width:25px; text-align:center;"><a href="'+provList[i][1]+'">'+provList[i][0]+'</a></td>';
menu+='</tr>';

for (i=0; i<preise.length; i++)
{
	menu+='<tr>';
	for (j=0; j<preise[i].length; j++)
		menu+='<td>'+preise[i][j]+'</td>';
	menu+='</tr>';
}

menu+='<tr>';
menu+='<td>'+'Gesamtpreis'+'</td>';
for (i=0; i<gesPreis.length; i++)
	if (gesPreis[i]<=minPreis*1.5)
		menu+='<td bgcolor="#FFFF00">'+gesPreis[i]+'</td>';
	else
		menu+='<td>'+gesPreis[i]+'</td>';
menu+='</tr>';

menu+='</table>';
//Вывод таблицы на экран
if (menu != '')
{
	menuobj = document.createElement('ul');
	menuobj.style.position = 'fixed';
	menuobj.style.top = '160px';
	menuobj.style.left = '0px';
	menuobj.style.padding = '10px';
	menuobj.style.backgroundColor = '#fff';
	menuobj.innerHTML = menu;
	body = document.getElementsByTagName('body')[0];
	body.appendChild(menuobj);
}