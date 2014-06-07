// ==UserScript==
// @name WOT sistestat enchancer
// @namespace http://challenge.worldoftanks.ru/uc/accounts/*
// @description Includes weborama inline player
// @author VkV
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// ==/UserScript==

opera.addEventListener('AfterEvent.DOMContentLoaded',function(e) {

	var yd = document.getElementsByTagName('td');
	for (i=0; i<yd.length; i++) 	

		{ 
		if( yd[i].className.indexOf("td-armory-icon")>1)
			{  
//win%
			var a =(toFl(yd[i+3].innerText)/toFl(yd[i+2].innerText)*100); 
			yd[i+3].innerHTML =yd[i+3].innerHTML+ "( "+a.toFixed(2)+"%)";
//
			}
		if(yd[i].innerText.indexOf(" Проведено боёв: ")==0)
			{
			var battle = toFl(yd[i+1].innerText);
			}
		if(yd[i].innerText.indexOf(" Уничтожено: ")==0)
			{
			var frags = toFl(yd[i+1].innerText);
			}
		if(yd[i].innerText.indexOf(" Обнаружено: ")==0)
			{
			var spotted = toFl(yd[i+1].innerText);
			}

		if(yd[i].innerText.indexOf(" Нанесенные повреждения: ")==0)
			{
			var damag = toFl(yd[i+1].innerText);
			}
		if(yd[i].innerText.indexOf(" Очки защиты базы: ")==0)
			{
			var NewtrParent = yd[i].parentNode;
			}

		}
insertNewTr(NewtrParent," Фрагов за бой",(frags/battle).toFixed(2));
insertNewTr(NewtrParent," Обнаруженно за бой", (spotted/battle).toFixed(2));
insertNewTr(NewtrParent," Повреждений за бой", (damag/battle).toFixed(0));

}, false); 

function toFl(s)
{                 
var a =""+s;
return (parseFloat(a.replace(/\s/g,"")));
}

function insertNewTr(NewTrParent,text,val)
{

var trNew = document.createElement('tr');
var tdNewName = document.createElement('td');
tdNewName.innerText = text;
var tdNew = document.createElement('td');
tdNew.innerText = val;
tdNew.className = "td-number";
NewTrParent.parentNode.appendChild(trNew);
trNew.appendChild(tdNewName);
trNew.appendChild(tdNew);

}