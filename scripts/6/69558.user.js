// ==UserScript==
// @name           rutracker_logo
// @namespace      rutracker logo changer
// @author         Black_Sun
// @include        http://rutracker.org/*
// @include        http://*rutracker.org/*
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.09
// @history	1.09 Добавил новых фишек в виде возврата стандартного логотипа, сообщению если путь логотипа сменится, возможность всегда посмотреть ссылку на стандартный логотип, и возможность пока не менять логотип.
// @history	1.08 Изменил определение местоположения изображения
// @history	1.07 Изменена кнопка для проверки обновлений
// @history	1.06 Изменена структура автообновлений
// @history	1.05 Теперь будет вестись история версий
// @history	1.04 Пока что автоапдейтер выведен и стадии бета
// @history	1.03 Добавлена кнопка для проверка обновлений
// @history	1.02 Добавлен автоапдейтер бета
// @history	1.01 Изменёна ссылка на лого
// @history	1.00 Первая версия
// ==/UserScript==
  var logodef=document.getElementById('logo').getElementsByTagName('img')[0]
if(logodef)deflogo(logodef.src);
if(!logodef)var logodef1=document.getElementById('logo').getElementsByTagName('img')[1]
if(!logodef&&logodef1)deflogo(logodef1.src);
if(!logodef&&!logodef1)prompt('ВНИМАНИЕ!!!','Путь логотипа изменился, сообщите автору скрипта сюда http://userscripts.org/topics/51873');
try {
	ScriptUpdater.check(69558);
} catch(e) { };
GM_registerMenuCommand("Изменить логотип на rutracker.org", set_info);
GM_registerMenuCommand("Проверить на обновления сейчас", updt);
GM_registerMenuCommand("Показать ссылку на логотип по умолчанию", show)
function updt(){try{ScriptUpdater.forceCheck(69558);}catch(e){};}
function deflogo(img) {
GM_setValue('default_logo',img)
}
function show() {
var showlogo = GM_getValue('default_logo');
prompt('Логотип сервера, который был по умолчанию',showlogo);
}
function set_info() {
  var url = prompt(
    "Введите ссылку на желаемый Логотип (gif,jpg или gif)\nили введите 'no' без кавычек если не хотите пока менять логотип\nили хотите вернуть стандартный",
    GM_getValue('rutracker.org Логотип', "http://dl.dropbox.com/u/3053245/rutracker.org.png")
  );

  GM_setValue('rutracker.org Логотип', url);
  alert("Успешно! Обновите страницу чтобы увидеть изменения.");
}

var url = GM_getValue('rutracker.org Логотип');
var logodiv=document.getElementById('logo')
var logo=logodiv.getElementsByTagName('img')
if (url == null || url == '') {
  set_info();
} else if(url=="no"){
var no = GM_getValue('default_logo');
for (var j=0;j<logo.length;j++)
{
  if(logo[j].alt=='logo')
	{
	 logo[j].setAttribute('src', no);
	}
}
} else {
for (var i=0;i<logo.length;i++)
{
  if(logo[i].alt=='logo')
	{
	 logo[i].setAttribute('src', url);
	}
}
  //old - var logo = document.evaluate("//img[@src='http://static.rutracker.org/images/logo/logo_rto.gif']", document, null, 0, null).iterateNext();
}


