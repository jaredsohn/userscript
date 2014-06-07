// ==UserScript==
// @name           Autominer
// @namespace      Ryuzaki
// @description    All your dark monk healer/demon needs.
// @include        http://vten.ru*
// ==/UserScript==
// перед крафтом ресурсов проверьте наличие ингридиентов, необходимых для создания
// также можно добавить себя в закрытую банду, чтобы вас не добавляли в банды
(
function(){
{
  // переменные(ничего прописывать не надо, используется динамическое автозаполнение)
  var nachat='';                //Начать добычу
  var podtverjdenie='';         //Да, начать работу
  var get='';                   //Положить в рюкзак
  var resurs='';                //Что добываем
  var vozvrat='';               //Возврат при обновлении
  var otmena_event='';          //Отказ от боя со смотрителями
  var oes='';                   //Отказ от боя со смотрителями подтверждение
  var hide='';                  //Скрытие объявлений, выползающих вверху
  var hide_krit='';             //Если не активирован крит, скрывает табличку с предложением активации
  var noob='';                  //Для игроков не достигших 30-го лвла, отказ от ивентов
  var cancel='';                //Отказ от добавления в друзья, местами скрипт из-за этого лагает)
  
  var CoolDownTime=Math.random()*(5000 - 2500)+2500;  //Добавим немного правдоподобности щелчкам XD
}
{ //вызов функций
  zapolneniePeremennih();
  select_event();
}

function zapolneniePeremennih()
{
for (var i=0;i<document.links.length;i++)
    {	
		if ((document.links[i].text.match("Начать добычу"))||(document.links[i].text.match("Начать выплавку"))||(document.links[i].text.match("Начать производство"))||(document.links[i].text.match("Начать изготовление")))
		{
			nachat=document.links[i].href;
		}
		if (document.links[i].text.match("Да, начать работу"))
		{
			podtverjdenie=document.links[i].href;
		}
		if (document.links[i].text.match("Положить в рюкзак"))
		{
			get=document.links[i].href;
		}				
		if (document.links[i].text.match("Сырая Руда")) //Сюда пихнуть ресурс, который надо крафтить
		{
			resurs=document.links[i].href;
		}
		if (document.links[i].text.match("Вернуться в игру"))
		{
			vozvrat=document.links[i].href;
		}
		if (document.links[i].text.match("Остаться за стенами города"))
		{
			otmena_event=document.links[i].href;
		}
		if (document.links[i].text.match("Нет, я останусь в городе"))
		{
			oes=document.links[i].href;
		}
		if (document.links[i].text.match("Скрыть"))
		{
			hide=document.links[i].href;
		}
		if (document.links[i].text.match("Нет, изучу позже"))
		{
			hide_krit=document.links[i].href;
		}
		if (document.links[i].text.match("Вернуться в город"))
		{
			noob=document.links[i].href;
		}
		if (document.links[i].text.match("Отказаться"))
		{
			cancel=document.links[i].href;
		}
	}
}
function select_event()
{
	var crap=document.evaluate("//span[contains(.,'У тебя не хватает')]", document, null, 9, null).singleNodeValue;
	if (crap)
	{
		alert('Out of mats!!');
		return;
	}
	if (vozvrat!='')
	{
		setTimeout(function(){location.href=vozvrat},CoolDownTime);
		return;
	}
	if (noob!='')
	{
		setTimeout(function(){location.href=noob},CoolDownTime);
		return;
	}
	if (get!='')
	{
		setTimeout(function(){location.href=get},CoolDownTime);
		return;
	}
	if (hide!='')
	{
		setTimeout(function(){location.href=hide},CoolDownTime);
		return;
	}
	if (hide_krit!='')
	{
		setTimeout(function(){location.href=hide_krit},CoolDownTime);
		return;
	}
	if (otmena_event!='')
	{
		setTimeout(function(){location.href=otmena_event},CoolDownTime);
		return;
	}
	if (oes!='')
	{
		setTimeout(function(){location.href=oes},CoolDownTime);
		return;
	}
	if (nachat!='')
	{
		setTimeout(function(){location.href=nachat},CoolDownTime);
		return;
	}
	if (podtverjdenie!='')
	{
		setTimeout(function(){location.href=podtverjdenie},CoolDownTime);
		return;
	}
	if (resurs!='')
	{
		setTimeout(function(){location.href=resurs},CoolDownTime);
		return;
	}
}
}
)();