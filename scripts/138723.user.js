// ==UserScript==
// @name bobobobo
// @description bobo for
// @author lol 
// @include http://g.time2play.mobi/*
// ==/UserScript==

(
function(){
{  
  var nachat='';                //Начать добычу
  var ok='';                    //Да, начать работу
  var zanovo='';                  //Снова начать добычу
  var resurs='1';                //Автообновление, пока не начнем добычу
  var vozvrat='';              //Возврат при обновлении
  var hide='';                  //Скрытие объявлений, выползающих вверху
  var otmena_event='';          //Отказ от боя со смотрителями
  var fight='';                  //Отказ от боя со смотрителями подтверждение
  var wait_timer='';            //Если не активирован крит, скрывает табличку с предложением активации
  var goto_naem='';                  //Для игроков не достигших 30-го лвла, отказ от ивентов
  var goto_duel='';                //Добавление в друзья 
  var CoolDownTime=Math.random()*(6000 - 1500)+3100;  //настраиваем время под себя
 var CoolDownTime1=Math.random()*(6000 - 1500)+300000; //5мин задержка перед следующим началом добычи
 var RabNach=document.getElementsByTagName('span')[3].textContent;
 var setAdres="../../profs/receipt/rawOre";  //Адрес добываемого ресурса, сюда вставить ссылку на тот предмет, который добываем. ССЫЛКА ДОЛЖНА БЫТЬ ТОЛЬКО В ФОРМАТЕ ../../profs/receipt/Предмет  
 //var setAdres="../../profs/receipt/iron"; //на добычу железа
}
{ //вызов функций 
  zapolneniePeremennih();
  select_event();
}

function zapolneniePeremennih()
{
alert('aaa');
for (var i=0;i<document.links.length;i++)
    {
  if (document.links[i].text.match("Сражаться"))
  {
  fight=document.links[i].href;
  }
  if (document.links[i].text.match("Возможно, зелья смогут тебе помочь."))
  {
  wait_timer='http://g.time2play.mobi';
  }
  if (document.links[i].text.match("Наёмники"))
  {
  goto_naem=document.links[i].href;
  }
  if (document.links[i].text.match("Дуэль"))
  {
  goto_duel=document.links[i].href;
  }
 }
}
function select_event()
{
 if (fight!='')
 {
  setTimeout(function(){location.href=fight},CoolDownTime);
  return;
 }
 else if (goto_naem!='')
 {
  setTimeout(function(){location.href=goto_naem},CoolDownTime);
  return;
 }
 else if (goto_duel!='')
 {
  setTimeout(function(){location.href=goto_duel},CoolDownTime);
  return;
 }
 else if (wait_timer!='')
 {
  setTimeout(function(){location.href=wait_timer},CoolDownTime1);
  return;
 }
}
}
)();