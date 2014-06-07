// ==UserScript==
// @name mag
// @description this a small bot.
// @include http://vten.ru/*
// ==/UserScript==
(
function(){
  {//настройки 
                             //true-включено, false-отключено
  var setGromImolniya=true; //гром и молния
  var setVoskresnut=false; //восскреснуть
  var setVostZdor=false;  //восстановить здоровье после смерти
  var setAttackAll=false; //атаковать любого постоянно
  var setPochin=false;  //починиться после смерти
  var setNext=false;    //продолжить бой
  var setPolNag=false;//получить награду
  var setZadaniya=true; //другие задания
  var CoolDownTime=Math.random()*(4000 - 3000)+3000; //время между ударами/кастами
  }
  { // переменные
  var attack='';
  var attackAll='';
  var attackArchers='';
  var attackDobivat='';
  var gromImolniya='';
  var vzrivEfira='';
  var tenSmerti='';
  var pritokSili='';
  var voskresnut='';
  var vernutsakigre='';
  var vostZdor='';
  var pochin='';
  var next='';
  var polNag='';
  var zadaniya='';
  }
  { // вызов функций
	zapolneniePeremennih();
	select_event();
	}
	
function zapolneniePeremennih()
{
for (var i=0;i<document.links.length;i++)
    {	
		if (document.links[i].text.match("Воскреснуть"))
		{
			voskresnut=document.links[i].href;
		}
		if (document.links[i].text.match("Восстановить здоровье"))
		{
			vostZdor=document.links[i].href;
		}
		if (document.links[i].text.match("Починиться"))
		{
			pochin=document.links[i].href;
		}
		if (document.links[i].text.match("Продолжить бой"))
		{
			next=document.links[i].href;
		}
		if (document.links[i].text.match("Вернуться к игре"))
		{
			vernutsakigre=document.links[i].href;
		}
		if (document.links[i].text.match("Бить Хранителя"))
		{
			attackArchers=document.links[i].href;
		}
		if (document.links[i].text.match("Бить "))
		{
			attack=document.links[i].href;
		}
		if (document.links[i].text.match("Бить любого"))
		{
			attackAll=document.links[i].href;
		}
		if (document.links[i].text.match("Добивать "))
		{
			attackDobivat=document.links[i].href;
		}
		if ((document.links[i].text.match("Гром и Молния"))&&(document.links[i].className!='minor'))
		{
			gromImolniya=document.links[i].href;
		}
		if ((document.links[i].text.match("Взрыв Эфира"))&&(document.links[i].className!='minor'))
		{
			vzrivEfira=document.links[i].href;
		}
		if ((document.links[i].text.match("Приток Силы"))&&(document.links[i].className!='minor'))
		{
			pritokSili=document.links[i].href;
		}
		if ((document.links[i].text.match("Тень Смерти"))&&(document.links[i].className!='minor'))
		{
			tenSmerti=document.links[i].href;
		}
		if (document.links[i].text.match("Получить награду"))
		{
			polNag=document.links[i].href;
		}

		if (document.links[i].text.match("Другие задания"))
		{
			zadaniya=document.links[i].href;
		}
	}
}
function select_event()
{
	if ((pritokSili!='')&&(location.href!='http://vten.ru/user'))
  {
	setTimeout(function(){location.href=pritokSili},500);
	return;
  }
  else if ((tenSmerti!='')&&(location.href!='http://vten.ru/user'))
  {
	setTimeout(function(){location.href=tenSmerti},500);
	return;
  }
  else if ((gromImolniya!='')&&(location.href!='http://vten.ru/user'))
  {
	setTimeout(function(){location.href=gromImolniya},2500);
	return;
  }
  else if ((vzrivEfira!='')&&(location.href!='http://vten.ru/user'))
  {
	setTimeout(function(){location.href=vzrivEfira},2500);
	return;
  }
	else if ((attackArchers!='')&&(SetAttackArcher))
  {
    setTimeout(function(){location.href=attackArchers},CoolDownTime);
	return;
  }
	else if ((attackAll!='')&&(setAttackAll))
  {
    setTimeout(function(){location.href=attackAll},CoolDownTime);
	return;
  }
  else if (attackDobivat!='')
  {
    setTimeout(function(){location.href=attackDobivat},CoolDownTime);
	return;
  }
  else if (attack!='')
  {
	setTimeout(function(){location.href=attack},CoolDownTime);
	return;
  }
  else if ((voskresnut!='')&&(setVoskresnut))
  {
	setTimeout(function(){location.href=voskresnut},1500);
	return;
  }
  else if ((vostZdor!='')&&(setVostZdor))
  {
	setTimeout(function(){location.href=vostZdor},1000);
	return;
  }
  else if ((pochin!='')&&(setPochin))
  {
	setTimeout(function(){location.href=pochin},1500);
	return;
  }
  else if ((next!='')&&(setNext))
  {
	setTimeout(function(){location.href=next},1500);
	return;
  }
  else if (vernutsakigre!='')
  {
	setTimeout(function(){location.href=vernutsakigre},CoolDownTime);
	return;
  }
  else if ((polNag!='')&&(setPolNag))
  {
	setTimeout(function(){location.href=polNag},1000);
	return;
  }
  else if ((zadaniya!='')&&(setZadaniya))
  {
	setTimeout(function(){location.href=zadaniya},1500);
	return;
  }
}
}
)();