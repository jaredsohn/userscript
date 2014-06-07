// ==UserScript==
// @id             notabenoid.ru-1745cedb-a93e-4972-a54e-cec8969b70af@scriptish
// @name           notabenoid rows colorer
// @version        1.2.1.1
// @history        1.2.1.1 Упс, неверный regexp :)
// @history        1.2.1 Добавил прозрачность и к месяцем.
// @history        1.2.0 Добавил прозрачность "протухших"(нективных) глав, у которых сколько-то дней небыло активности.
// @history        1.1.2 Устранён затык скрипта при не нахождении id элемента
// @history        1.1.1 Добавил кнопку для подсветки.
// @history        1.1.0 Добавил подсветку строк при сравнении строк на голосовании значение которых везде равно 0.
// @history        1.0.4 Проверка на оригинал и проверка на null
// @history        1.0.3 Теперь убран фон только у ячеек
// @history        1.0.2 добавлена поддержка .com домена
// @history        1.0.1 Добавлен статус переводится при 100%
// @history        1.0 Релиз
// @namespace      http://userscripts.org/scripts/show/174416
// @author         Black_Sunlight
// @icon           http://notabenoid.ru/i/logo-v3.gif
// @include        http://notabenoid.ru/*/*
// @include        http://notabenoid.com/*/*
// @run-at         document-end
// ==/UserScript==

(function(){
var elem=document.querySelectorAll('tr[id^="c_"]'),
	css='',
	head = document.getElementsByTagName('head')[0],
       style = document.createElement('style'),
       cmpelem=document.querySelectorAll('tr[id^="o"]');
       
       var btn=document.createElement('button')
       btn.setAttribute('class','btn')
       btn.setAttribute('style','margin:0 5px')
       btn.setAttribute('title','Выделить элементы где нет голосов вообще')
       btn.innerHTML="Сравнить"
       btn.addEventListener('click',function(){cmpr()},false)
       if(document.querySelector('#tb-main')!=null){document.querySelector('#tb-main>div').appendChild(btn)}
       

for (var i=0;i<elem.length;i++)
{
  var data=elem[i].querySelector('.r')
if(data!=null){
  var state=elem[i].querySelectorAll('td')
  if(state[1].getAttribute('class')=='t'){
var st=state[2].innerHTML,
ss=state[3].innerHTML;
}else{
var st=state[1].innerHTML,
ss=state[2].innerHTML;
}
  
   if(data.innerHTML.search(/100\%/ig)!=-1 && (st=="редактируется")){
    var id=elem[i].getAttribute('id');
    css += '#'+id+'{background:rgba(18, 90, 199, 0.15)}'+'#'+id+' td{background:none!important}';
  }
   if(data.innerHTML.search(/100\%/ig)!=-1 && st=="готово"){
    var id=elem[i].getAttribute('id');
    css += '#'+id+'{background:rgba(0, 204, 0, 0.10)}'+'#'+id+' td{background:none!important}';
  }
   if(data.innerHTML.search(/100\%/ig)!=-1 && st=="переводится"){
    var id=elem[i].getAttribute('id');
    css += '#'+id+'{background:rgba(204, 0, 0, 0.10)}'+'#'+id+' td{background:none!important}';
  }
if(data.innerHTML.search(/100\%/ig)!=-1 && ss.search(/(дн(ей|я)|мес)/ig)!=-1){
    var id=elem[i].getAttribute('id');
    css += '#'+id+'{opacity:0.5}'+'#'+id+':hover{opacity:1.0}';
}
}
}
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);



function cmpr(){
for (var i=0;i<cmpelem.length;i++) {
  var rstr=cmpelem[i].querySelectorAll('.rating');
  var strcmp=[];
   for (var j=0;j<rstr.length;j++) {
   if(rstr[j].querySelectorAll('.current')[0].innerHTML.match(/^0{1}/ig)!=null){
   strcmp.push(rstr[j].querySelectorAll('.current')[0].innerHTML.match(/^0{1}/ig))
	if(strcmp.length==rstr.length){
         cmpelem[i].setAttribute('style','background:rgba(204, 0, 0, 0.10)')
       }}
   }
}
}

}())