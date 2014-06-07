// ==UserScript==
// @name           TM_Close
// @namespace      *www.tmgame.ru*
// @include        http://*tmgame.ru/closed.html*
// ==/UserScript==

var divPr,divTitle;

var onlineCnt;
var offlineCnt;
(function(){
	divTitle=document.getElementsByTagName('div')[0];
	divTitle.setAttribute("style",'color:green;font-size:15px;');
	divTitle.innerHTML = 'Техномагия закрыта на перерыв, админы ушли за пивом когда врубят игру неизвестно!<br/><br/> Теперь вы можете поковыряться на <a href="http://forum.tmgame.ru/" style="font-size:15px">форуме</a> или пойти и занятся домашними делами.<br/>В ближайшее время данный плагин будет доработан до возможности оповещения включения игры!';
	divTitle.innerHTML +='<br/><br/>Или вновь попробовать <a href="http://www.tmgame.ru/" style="font-size:15px">зайти.</a>';
	document.title='Админы ушли за пивом!';
	
	setInterval(getGame,40000);
})();

function getGame(){
	document.location.href = "http://www.tmgame.ru/";
};