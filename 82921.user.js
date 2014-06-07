// ==UserScript==
// @name           vkontakte video mover
// @namespace      script
// @version        1.0.4
// @history        1.0.4 Изменены названия скриптов для совместимости с другими скриптами
// @history        1.0.3 Добавлен новый порог начала движения вы можете установить его переменной thr
// @history        1.0.2 Обновлён код под другой драггер и создал несколько запасных репозиториев, для активации уберите // вначале строчки или напишите // для деактивации. Но только один репозиторий может быть активен, к остальным поставьте // Редактировать только в обозначенном районе и НЕ редактируйте ничего ниже.
// @history        1.0.1 Обновлён автоапдейтер и добавлена история скрипта
// @require        http://userscripts.org/scripts/source/74144.user.js
// @include        http://vkontakte.ru/video*
// ==/UserScript==
/*###################################################################
==============Change repository here if one don't work==============
==============For activation remove // below and add // to other====
--------------------------------------------------------------------*/
var drag_url="http://dl.dropbox.com/u/3053245/drag/" //Main repository 1
//var drag_url="http://tests.do.am/drag/"  //Backup repository 1
//var drag_url="http://gendalf30.narod.ru/drag/" //Backup repository 2
var thr="125" //Set your Threshold of move, default is 125
/*------------------------------------------------------------------
===================DON'T EDIT ANYTHING BELOW========================
####################################################################*/
function updt()
{
  try {
	ScriptUpdater.forceCheck(82921);
       }
  catch(e) { };
}
updt();
function ntc()
{
  try {
	ScriptUpdater.forceNotice(82921);
       }
  catch(e) { };
}
GM_registerMenuCommand("Check for updates now", updt);
GM_registerMenuCommand("Show history of updates", ntc);
function Js2Doc(jsrc){
    for (var i=0;i<arguments.length;i++){  
    var jsdrag = document.createElement('script');
    jsdrag.type = 'text/javascript';
    jsdrag.src = drag_url+arguments[i];
    document.getElementsByTagName('head')[0].appendChild(jsdrag);
  }
}
var vid=document.getElementById('bigResult')
if(vid)vid.setAttribute("style","cursor: move!important;position: relative!important;")
var jsdrag2 = document.createElement('script');
jsdrag2.setAttribute('type', 'text/javascript');
jsdrag2.innerHTML=js;
document.getElementsByTagName('head')[0].appendChild(jsdrag2);
var js='\n<!--\nwindow.onload=function(){\nvar group\nvar coordinates=ToolMan.coordinates()\nvar drag=ToolMan.drag()\nvar boxDrag=document.getElementById("bigResult")\ngroup = drag.createSimpleGroup(boxDrag)\ngroup.setThreshold('+thr+')}\n//-->\n'
if(vid){
var jsdrag = document.createElement('script');
jsdrag.setAttribute('type', 'text/javascript');
jsdrag.innerHTML=js;
document.getElementsByTagName('head')[0].appendChild(jsdrag);
       }
function dragscripts(){
     Js2Doc(
       "corez.js",
       "eventsz.js",
       "cssz.js",
       "coordinatesz.js",
       "dragz.js"      
       );
}
dragscripts();