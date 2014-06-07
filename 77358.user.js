// ==UserScript==
// @name           lwgame delete all comments in news and show all span blocks in news
// @namespace      interface upgrade
// @version        1.2
// @history        1.2 Пофиксена позиция, изменён дизайн окна, изменены функции окна.
// @history        1.1 Изменено под новый дизайн.
// @history        1.0 Релиз
// @include        http://*lwgame.net/news/*
// ==/UserScript==
var status=GM_getValue('status')
if(status==undefined){var status="show";act(status);} else{act(status);}
function options() 
{ 
if(status=="show"){var sett='Только показать'} else if(status=="show_and_del"){var sett='Показать и удалить'} else if(status=="del"){var sett='Только Удалить'}
var box=document.createElement('div')
box.setAttribute('id','optionsbox')
box.setAttribute('style','position:fixed; top:30%; left:40%; background:rgba(100,100,100,0.9);width:270px;')
box.innerHTML=<![CDATA[<br /><br /><center style="color:white">Ваша текущая настройка</center>
<select id="whatz">
<option value="show">Только показать</option>
<option value="del">Только удалить</option>
<option value="show_and_del">Показать и удалить</option>
</select><br /><br />
<div align="center">
<dl>
<dt><input type="button" id="save" onclick='this.disabled="disabled"' value="Применить" /></dt>
<dd style="color:#ffffff;margin:0 auto;">Применить настройку и занести в память</dd>
</dl>
<dl>
<dt><input type="button" id="apply" onclick='this.disabled="disabled"' value="Применить не сохраняя" /></dt>
<dd style="color:#ffffff;margin:0 auto;">Применить настройку, но не запоминая её.</dd>
</dl>
<dl>
<dt><input type="button" id="close" onclick='this.disabled="disabled"' value="Закрыть" /></dt>
<dd style="color:#ffffff;margin:0 auto;">Закрыть это окно</dd>
</dl></div><br />
]]>.toString();
document.body.appendChild(box)
setTimeout(function(){
document.getElementById('save').addEventListener('click', save, true);
document.getElementById('apply').addEventListener('click', apply, true);
document.getElementById('close').addEventListener('click', close, true);
if(status=="show"){document.getElementById('whatz').options[0].setAttribute('selected','selected')}
else if(status=="show_and_del"){document.getElementById('whatz').options[2].setAttribute('selected','selected');}
else if(status=="del"){document.getElementById('whatz').options[1].setAttribute('selected','selected');}
},1000)
}
var settings=document.createElement('a')
settings.href="javascript: void(0);"
settings.innerHTML="Настройки скрипта lwgame comments"
settings.addEventListener('click', options, true)

document.getElementById('mess_color').parentNode.insertBefore(settings,document.getElementById('mess_color').nextSibling)
function save() 
{ 
var box=document.getElementById('optionsbox')
   var status=document.getElementById('whatz').value
   GM_setValue('status', status)
   box.parentNode.removeChild(box);
   act(status);
}
function close() 
{ 
var box=document.getElementById('optionsbox')
    box.parentNode.removeChild(box);
}
function apply() 
{ 
var box=document.getElementById('optionsbox')
   var status=document.getElementById('whatz').value
   box.parentNode.removeChild(box);
   act(status);
}
function act(status) 
{ 
//--------------------------------------//
//        Раскрытие всех span           //
//--------------------------------------//
if(status=='show' || status=='show_and_del'){
var spn = document.createElement('script');
spn.setAttribute('type', 'text/javascript');
spn.innerHTML='$(function(){$(\'span[id^="mnc"]\').show();});'
document.getElementsByTagName('head')[0].appendChild(spn);
}
//--------------------------------------//
//	Удаление всех комментов		//
//--------------------------------------//
if(status=='del' || status=='show_and_del'){
var dcm = document.createElement('script');
dcm.setAttribute('type', 'text/javascript');
dcm.innerHTML='$(function(){$(\'a[onclick^="del_item"]\').click();});'
document.getElementsByTagName('head')[0].appendChild(dcm);
}
//--------------------------------------//
//--------------------------------------//

}