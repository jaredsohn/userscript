// ==UserScript==
// @name White chat
// @include http://2ch.hk/chat/*
// @include http://www.2ch.hk/chat/*
// @include https://2ch.hk/chat/*
// @include https://www.2ch.hk/chat/*
// ==/UserScript==

//Получаем указатель на head
var getHead = document.getElementsByTagName("HEAD")[0]; 

///------------------[Меняем стиль чата на светлый]--------------------
if(getHead)
{
	//Создаем тег стиля
	var cssNode = window.document.createElement('style'); 
	
	//Пихаем его в тег head
	var elementStyle= getHead.appendChild(cssNode); 
	
	//Заполняем его светлым стилем
	elementStyle.innerHTML = 'body,html{background:#EEE;color:#333}#chat_window{background:#DDD;border-color:#CCC}#roster{background:#DDD;border-color:#DDD}#message_window a:first-child{background-color:#BBB;color:#F0F0F0}#roster p{background-image:0 50in 50% 50%}#roster p:last-child{border:0}#roster p.admin{color:#FFF}#message_window{background-image:none}.nick{color:#F0F0F0}.status{color:#729FCF}form input[type=text]{background:#FFF;color:#777;text-shadow:0 2px 2px rgba(0,0,0,0.3);-webkit-box-shadow:0 1px 0 rgba(255,255,255,0.1),0 1px 3px rgba(0,0,0,0.2) inset;-moz-box-shadow:0 1px 0 rgba(255,255,255,0.1),0 1px 3px rgba(0,0,0,0.2) inset;box-shadow:0 1px 0 rgba(255,255,255,0.1),0 1px 3px rgba(0,0,0,0.2) inset}form button[type=submit]{color:#777;text-shadow:0 2px 2px rgba(0,0,0,0.4);background:0;box-shadow:1px 1px 1px rgba(0,0,0,0.2);-moz-box-shadow:1px 1px 1px rgba(0,0,0,0.2);-webkit-box-shadow:1px 1px 1px rgba(0,0,0,0.2);border-color:#CCC}form button[type=submit]:hover{color:#999;background:0}form button[type=submit]:active{color:#48B0FD;background:0;-moz-box-shadow:1px 1px 1px rgba(255,255,255,0.1);-webkit-box-shadow:1px 1px 1px rgba(255,255,255,0.1);box-shadow:1px 1px 1px rgba(255,255,255,0.1)}.quote:hover{color:#ff8}.link1 a:hover{color:#F60;text-shadow:0 0 .2em #38B0DE}.reply{background:#2C2C2C;border-color:#575757}hr{background-image:url(http://2ch.hk/icons/line.png)}#pop_up_window{color:#FFF;text-shadow:1px 0 .15em black, 0 1px .15em black, -1px 0 .15em black, 0 -1px .15em #000;background:rgba(0,0,0,.3);border-color:grey}#roster p:nth-child(2n+1),#roster p:nth-child(2n){background:#DDD}#roster p.admin:before,form input[type=text]:hover,form input[type=text]:focus{color:#48B0FD}.link1 a:link,.link1 a:active,.link1 a:visited,a:link,a:active,a:visited,a:hover{color:#F60}';
}
///------------------[/Меняем стиль чата на светлый]--------------------



///------------------[Удаляем ебучую кошку]--------------------
//Ищем ебучую кошку
var catCanvas = document.getElementById("CatCanvas");

//Удаляем ебучую кошку
if(catCanvas) catCanvas.parentNode.removeChild(catCanvas);
///------------------[/Удаляем ебучую кошку]--------------------


///------------------[Фиксим подсветку при наведении на номер]--------------------
//Указатель на глобальный window
var win = window.wrappedJSObject || unsafeWindow || window;

//Удаляем багованную функцию подсветки при наведении указателя на пост
win.Highlight = null;

//Переопределяем ее
win.Highlight = function(id, flag) {
	var e = document.getElementById('post_' + id);
	if(e)
	{
		e.style.backgroundColor = (flag?'#BBBBBB':'');
		if(flag) setTimeout(function () { e.style.backgroundColor=''; }, 2000); //нахуя?
	}
}
///------------------[/Фиксим подсветку при наведении на номер]--------------------